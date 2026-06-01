#!/usr/bin/env python3
"""
Audit task log hours from Google Sheets for Mar-May 2026 (W10-W21).
Handles rate limits with retry, outputs JSON + markdown-ready tables.
"""
import json
import re
import time
from datetime import datetime, date, timedelta
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SA = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

# ISO week 2026 — W10 = Mar 9 (Monday) using %W (Sunday=0) vs ISO
# Use Python's ISOCalendar approach
def iso_week_monday(week_num, year=2026):
    """Return Monday date for given ISO week number (1-based)."""
    jan4 = date(year, 1, 4)  # Jan 4 is always in ISO week 1
    week1_monday = jan4 - timedelta(days=jan4.isoweekday() - 1)
    return week1_monday + timedelta(weeks=week_num - 1)

WEEKS = {}
for w in range(10, 22):  # W10 to W21 (Mar 9 – May 31 2026)
    ws = iso_week_monday(w)
    we = ws + timedelta(days=6)
    WEEKS[w] = {'start': ws, 'end': we}

print("Week ranges (ISO):")
for w, info in WEEKS.items():
    print(f"  W{w}: {info['start']} to {info['end']}")


def api_get_with_retry(fn, max_retries=4):
    for attempt in range(max_retries):
        try:
            return fn()
        except HttpError as e:
            if e.status_code == 429:
                wait = 60 * (attempt + 1)
                print(f"  [rate limit] waiting {wait}s before retry {attempt+1}...")
                time.sleep(wait)
            else:
                raise
    raise RuntimeError("Max retries exceeded")


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


def fetch_sheet_week(sheet_id, tab_name, owner_filter=None):
    """Fetch hours from a weekly tab. Returns total hours."""
    try:
        res = api_get_with_retry(
            lambda: svc.values().get(spreadsheetId=sheet_id, range=f"'{tab_name}'!A1:T500").execute()
        )
        rows = res.get('values', [])
    except Exception as e:
        return 0.0, f"ERROR: {e}"

    if not rows:
        return 0.0, "empty"

    # Find hours column: scan headers
    hours_col = None
    for ridx, row in enumerate(rows[:20]):
        for cidx, cell in enumerate(row):
            if cell and str(cell).strip().lower() in ['hours', 'giờ', 'hour', 'h', 'thực tế']:
                hours_col = cidx
                break
        if hours_col is not None:
            break

    if hours_col is None:
        hours_col = 7  # default col H

    owner_col = 6  # col G

    total = 0.0
    in_day_section = False

    for ridx, row in enumerate(rows):
        if not row:
            continue
        a_val = str(row[0]).strip() if row else ''

        if any(a_val.startswith(d) for d in DAY_PREFIXES):
            in_day_section = True
            continue

        if not in_day_section:
            continue

        hrs_val = row[hours_col] if len(row) > hours_col else ''
        hrs = parse_hours(hrs_val)

        if hrs > 0:
            if owner_filter:
                owner_val = str(row[owner_col]).strip() if len(row) > owner_col else ''
                if owner_filter.lower() not in owner_val.lower():
                    continue
            total += hrs

    return total, "ok"


SHEETS = {
    'LeNH_Rory': {
        'sheet_id': '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8',
        'owner_filter': 'LeNH',
        'display': 'Rory (LeNH)',
        'upwork_workroom': 'Rory',
    },
    'LeNH_Aysar': {
        'sheet_id': '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8',
        'owner_filter': 'LeNH',
        'display': 'Aysar (LeNH/KhanhHH)',
        'upwork_workroom': 'Aysar',
    },
    'VietPH': {
        'sheet_id': '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg',
        'owner_filter': 'VietPH',
        'display': 'Bailey DEV1 (VietPH)',
        'upwork_workroom': 'Bailey-VietPH',
    },
    'DuongDN': {
        'sheet_id': '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg',
        'owner_filter': 'DuongDN',
        'display': 'Bailey DEV3 (DuongDN)',
        'upwork_workroom': 'Bailey-DuongDN',
    },
}

results = {}

for name, cfg in SHEETS.items():
    print(f"\n=== Processing {name} ===")
    results[name] = {}
    for w in range(10, 22):
        tab = f"W{w}"
        hours, status = fetch_sheet_week(
            cfg['sheet_id'], tab,
            owner_filter=cfg.get('owner_filter'),
        )
        week_info = WEEKS[w]
        print(f"  W{w} ({week_info['start']} to {week_info['end']}): {hours:.2f}h [{status}]")
        results[name][w] = hours
        time.sleep(1.2)  # stay under 60 req/min

# Month attribution with proportional split for cross-month weeks
# March: Mar 1 – Mar 31, April: Apr 1 – Apr 30, May: May 1 – May 31
MONTHS = ['March', 'April', 'May']
MONTH_RANGES = {
    'March': (date(2026, 3, 1), date(2026, 3, 31)),
    'April': (date(2026, 4, 1), date(2026, 4, 30)),
    'May':   (date(2026, 5, 1), date(2026, 5, 31)),
}

def days_overlap(ws, we, ms, me):
    start = max(ws, ms)
    end = min(we, me)
    if end < start:
        return 0
    return (end - start).days + 1

monthly = {}
for name, weeks in results.items():
    monthly[name] = {m: 0.0 for m in MONTHS}
    for w, hrs in weeks.items():
        if hrs is None or hrs == 0.0:
            continue
        ws = WEEKS[w]['start']
        we = WEEKS[w]['end']
        week_days = 7
        for mname, (ms, me) in MONTH_RANGES.items():
            overlap = days_overlap(ws, we, ms, me)
            if overlap > 0:
                monthly[name][mname] += round(hrs * overlap / week_days, 2)

print("\n=== Monthly Aggregation ===")
for name, months in monthly.items():
    print(f"\n{name}:")
    for month, hrs in months.items():
        print(f"  {month}: {hrs:.2f}h")

# Save
output = {
    'weekly_by_developer': {k: {str(wk): v for wk, v in wks.items()} for k, wks in results.items()},
    'monthly_by_developer': monthly,
    'week_ranges': {str(w): {'start': str(info['start']), 'end': str(info['end'])} for w, info in WEEKS.items()},
    'sheets_config': {k: {'display': v['display'], 'upwork_workroom': v['upwork_workroom']} for k, v in SHEETS.items()},
}

with open('/tmp/tasklog-audit-results.json', 'w') as f:
    json.dump(output, f, indent=2)

print("\nResults saved to /tmp/tasklog-audit-results.json")
