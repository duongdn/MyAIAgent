#!/usr/bin/env python3
"""
Audit task log hours from Google Sheets for Mar-May 2026.
Fetches all weekly tabs W10-W22 for each developer/project.
Outputs JSON with weekly totals per developer.
"""
import json
import re
from datetime import datetime, date
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

# Week number to date range mapping (ISO week 2026)
# W10 = Feb 23 - Mar 1, W11 = Mar 2-8, W12 = Mar 9-15, ...
# We want W10-W22 (covers Mar-May 2026)
# Week start = Monday of that week (ISO)
def week_start(week_num, year=2026):
    """Return Monday date for given ISO week number"""
    return datetime.strptime(f"{year}-W{week_num:02d}-1", "%Y-W%W-%w").date()

def week_end(week_num, year=2026):
    start = week_start(week_num, year)
    from datetime import timedelta
    return start + timedelta(days=6)

# Build week info
WEEKS = {}
for w in range(10, 23):  # W10 to W22
    ws = week_start(w)
    we = week_end(w)
    month = ws.strftime('%B')
    WEEKS[w] = {'start': ws, 'end': we, 'month': month}

print("Week ranges:")
for w, info in WEEKS.items():
    print(f"  W{w}: {info['start']} to {info['end']} ({info['month']})")

def parse_hours(val):
    if not val:
        return 0.0
    s = str(val).strip()
    if not s:
        return 0.0
    try:
        return float(s)
    except ValueError:
        pass
    m = re.match(r'^(\d+):(\d{2})$', s)
    if m:
        return int(m.group(1)) + int(m.group(2)) / 60.0
    return 0.0

DAY_PREFIXES = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

def fetch_sheet_week(sheet_id, tab_name, owner_filter=None, is_lenh=False):
    """Fetch hours from a weekly tab. Returns total hours."""
    try:
        res = svc.values().get(spreadsheetId=sheet_id, range=f"'{tab_name}'!A1:T500").execute()
        rows = res.get('values', [])
    except Exception as e:
        return None, f"ERROR: {e}"

    if not rows:
        return 0.0, "empty"

    total = 0.0
    in_day_section = False

    # Find hour column index - look for 'Hours' or 'Giờ' header
    hours_col = None

    # Try to detect the structure
    # Look for header row with Hours column
    for ridx, row in enumerate(rows):
        for cidx, cell in enumerate(row):
            if cell and str(cell).strip().lower() in ['hours', 'giờ', 'hour', 'h', 'thực tế']:
                hours_col = cidx
                break
        if hours_col is not None:
            break

    if hours_col is None:
        # Default to column H (index 7) based on existing scripts
        hours_col = 7

    # Owner column - col G (index 6) based on existing scripts
    owner_col = 6

    # Parse rows: sum hours for rows under day headers
    for ridx, row in enumerate(rows):
        if not row:
            continue
        a_val = str(row[0]).strip() if row else ''

        # Check if this is a day header row
        if any(a_val.startswith(d) for d in DAY_PREFIXES):
            in_day_section = True
            continue

        if in_day_section and a_val:
            # Check if we hit another day header or section break
            if any(a_val.startswith(d) for d in DAY_PREFIXES):
                continue

        if in_day_section:
            # Get hours from the hours column
            hrs_val = row[hours_col] if len(row) > hours_col else ''
            hrs = parse_hours(hrs_val)

            if hrs > 0:
                # Apply owner filter if needed
                if owner_filter and is_lenh:
                    # For LeNH sheets: filter by owner col G
                    owner_val = str(row[owner_col]).strip() if len(row) > owner_col else ''
                    if owner_filter.lower() not in owner_val.lower():
                        continue
                elif owner_filter and not is_lenh:
                    # For Paturevision: filter by owner
                    owner_val = str(row[owner_col]).strip() if len(row) > owner_col else ''
                    if owner_filter.lower() not in owner_val.lower():
                        continue

                total += hrs

    return total, "ok"

def fetch_summary_tab(sheet_id, owner_filter=None):
    """Try to read Summary tab for weekly breakdown."""
    try:
        res = svc.values().get(spreadsheetId=sheet_id, range="Summary!A1:Z200").execute()
        rows = res.get('values', [])
        return rows
    except Exception as e:
        return None

# First, check what tabs are available in each sheet
SHEETS = {
    'LeNH_Rory': {
        'sheet_id': '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8',
        'owner_filter': 'LeNH',
        'is_lenh': True,
    },
    'LeNH_Aysar': {
        'sheet_id': '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8',
        'owner_filter': 'LeNH',
        'is_lenh': True,
    },
    'KhanhHH': {
        'sheet_id': '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM',
        'owner_filter': None,
        'is_lenh': False,
    },
    'VietPH': {
        'sheet_id': '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg',
        'owner_filter': 'VietPH',
        'is_lenh': False,
    },
    'DuongDN': {
        'sheet_id': '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg',
        'owner_filter': 'DuongDN',
        'is_lenh': False,
    },
}

# First list available tabs
print("\n=== Checking available tabs ===")
for name, cfg in SHEETS.items():
    try:
        meta = svc.get(spreadsheetId=cfg['sheet_id']).execute()
        sheets = [s['properties']['title'] for s in meta.get('sheets', [])]
        cfg['available_tabs'] = sheets
        print(f"{name}: {sheets}")
    except Exception as e:
        print(f"{name}: ERROR {e}")
        cfg['available_tabs'] = []

results = {}

for name, cfg in SHEETS.items():
    print(f"\n=== Processing {name} ===")
    results[name] = {}

    available = cfg.get('available_tabs', [])

    for w in range(10, 23):
        tab = f"W{w}"
        if tab not in available:
            print(f"  W{w}: tab not found, skipping")
            results[name][w] = None
            continue

        hours, status = fetch_sheet_week(
            cfg['sheet_id'], tab,
            owner_filter=cfg['owner_filter'],
            is_lenh=cfg['is_lenh']
        )

        week_info = WEEKS[w]
        print(f"  W{w} ({week_info['start']} to {week_info['end']}): {hours:.2f}h [{status}]")
        results[name][w] = hours

# Aggregate by month
print("\n=== Monthly Aggregation ===")
monthly = {}

for name, weeks in results.items():
    monthly[name] = {'March': 0.0, 'April': 0.0, 'May': 0.0}
    for w, hrs in weeks.items():
        if hrs is None:
            continue
        week_info = WEEKS[w]
        # Attribute to the month the week ends in (or starts in)
        # Use week end date month for attribution
        end_date = week_info['end']
        start_date = week_info['start']

        # For weeks spanning months, split proportionally
        if start_date.month != end_date.month:
            # Count days in each month
            days_in_start_month = (date(start_date.year, start_date.month + 1 if start_date.month < 12 else 1, 1) - start_date).days
            days_total = 7
            days_start = min(days_in_start_month, 7)
            days_end = 7 - days_start

            start_month = start_date.strftime('%B')
            end_month = end_date.strftime('%B')

            if start_month in monthly[name]:
                monthly[name][start_month] += round(hrs * days_start / days_total, 2)
            if end_month in monthly[name]:
                monthly[name][end_month] += round(hrs * days_end / days_total, 2)
        else:
            month = start_date.strftime('%B')
            if month in monthly[name]:
                monthly[name][month] += hrs

for name, months in monthly.items():
    print(f"\n{name}:")
    for month, hrs in months.items():
        print(f"  {month}: {hrs:.2f}h")

# Save results
output = {
    'weekly_by_developer': {k: {str(wk): v for wk, v in wks.items()} for k, wks in results.items()},
    'monthly_by_developer': monthly,
    'week_ranges': {str(w): {'start': str(info['start']), 'end': str(info['end'])} for w, info in WEEKS.items()}
}

with open('/tmp/tasklog-audit-results.json', 'w') as f:
    json.dump(output, f, indent=2)

print("\n\nResults saved to /tmp/tasklog-audit-results.json")
