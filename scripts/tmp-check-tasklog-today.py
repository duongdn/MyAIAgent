"""Check today's (2026-04-07) task log entries for all developers."""
import json, sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

TODAY = '07/04'  # DD/MM format for 2026-04-07
TODAY_ALT = '7/04'
TODAY_ALT2 = '7/4'
TODAY_ALT3 = '07/4'
TODAY_PATTERNS = [TODAY, TODAY_ALT, TODAY_ALT2, TODAY_ALT3]
DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

SHEETS = [
    ('LongVV (Xtreme)', '1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58', 'LongVV', 8),
    ('PhucVT (James Diamond)', '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'PhucVT', 8),
    ('TuanNT (John Yi)', '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', 'TuanNT', None),
    ('TuanNT (Rebecca)', '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', 'TuanNT', None),
    ('VietPH (Paturevision)', '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', 'VietPH', 8),
    ('KhanhHH (Generator)', '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', 'KhanhHH', 8),
    ('LeNH (Rory)', '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', 'LeNH', None),
    ('LeNH (Franc)', '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', 'LeNH', None),
    ('LeNH (Aysar)', '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', 'LeNH', None),
    ('Maddy (LongVV)', '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I', 'LongVV', None),
]

def find_current_week(sid):
    """Find the current week sheet (W{n}) by looking at Summary or sheet tabs."""
    try:
        meta = svc.get(spreadsheetId=sid, fields='sheets.properties.title').execute()
        titles = [s['properties']['title'] for s in meta['sheets']]
        w_sheets = sorted([t for t in titles if t.startswith('W') and t[1:].isdigit()],
                         key=lambda x: int(x[1:]))
        if not w_sheets:
            return None, titles
        # Check the last few W-sheets to find one containing today's date
        for ws in reversed(w_sheets[-5:]):
            try:
                r = svc.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:A100").execute()
                vals = r.get('values', [])
                for row in vals:
                    if row and any(p in row[0] for p in TODAY_PATTERNS):
                        return ws, titles
            except:
                pass
        # If not found, return the latest W-sheet
        return w_sheets[-1], titles
    except Exception as e:
        return None, [f"ERROR: {e}"]

def check_sheet(label, sid, dev, min_hours):
    """Check a single task log sheet for today's entries."""
    ws, all_titles = find_current_week(sid)
    if ws is None:
        return {'label': label, 'dev': dev, 'hours': 0, 'rows': 0, 'leave': '', 'week': '?', 'error': f'No W-sheet found. Tabs: {all_titles[:5]}'}

    try:
        r = svc.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:R200").execute()
        rows = r.get('values', [])
    except Exception as e:
        return {'label': label, 'dev': dev, 'hours': 0, 'rows': 0, 'leave': '', 'week': ws, 'error': str(e)[:100]}

    total_hours = 0.0
    task_rows = 0
    leave_note = ''
    in_today = False
    today_found = False
    rebecca_status = None

    for i, row in enumerate(rows):
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ''

        # Check if this is a date header row containing today
        if any(p in cell_a for p in TODAY_PATTERNS) and any(d in cell_a for d in DAY_LABELS):
            in_today = True
            today_found = True
            # Check for leave notes in this header row
            row_str = ' '.join(str(c) for c in row)
            if 'Nghỉ cả ngày' in row_str:
                leave_note = 'full_day_off'
            if 'Nghỉ nửa ngày' in row_str:
                leave_note = 'half_day'
            continue

        # If we hit another date header, stop
        if in_today and cell_a and any(d + ',' in cell_a or d + ' ' in cell_a for d in DAY_LABELS):
            if not any(p in cell_a for p in TODAY_PATTERNS):
                in_today = False
                continue

        if in_today:
            # Check for leave notes in task rows too
            row_str = ' '.join(str(c) for c in row)
            if 'Nghỉ cả ngày' in row_str:
                leave_note = 'full_day_off'
            if 'Nghỉ nửa ngày' in row_str:
                leave_note = 'half_day'

            # Only count "Task dự án" rows
            if cell_a == 'Task dự án':
                # Col H (index 7) = hours typically
                hours_str = row[7].strip() if len(row) > 7 and row[7] else '0'
                try:
                    h = float(hours_str.replace(',', '.'))
                    total_hours += h
                    task_rows += 1
                except:
                    pass

            # For Rebecca: check col P (index 15) for "Chưa"
            if 'rebecca' in label.lower():
                if len(row) > 15 and row[15]:
                    rebecca_status = row[15].strip()

    result = {
        'label': label, 'dev': dev, 'hours': total_hours, 'rows': task_rows,
        'leave': leave_note, 'week': ws, 'today_found': today_found, 'error': None,
    }
    if rebecca_status:
        result['rebecca_col_p'] = rebecca_status
    return result

# Run all checks
print("=== TASK LOG CHECK — 2026-04-07 (Monday) ===\n")
results = []
for label, sid, dev, min_h in SHEETS:
    r = check_sheet(label, sid, dev, min_h)
    results.append((r, min_h))
    status = ''
    if r['error']:
        status = f"ERROR: {r['error']}"
    elif not r['today_found']:
        status = 'NOT YET FILLED (no rows for today)'
    elif r['leave'] == 'full_day_off':
        status = 'OFF (full day leave)'
    elif r['leave'] == 'half_day':
        status = f"{r['hours']}h (half-day leave)"
    else:
        status = f"{r['hours']}h ({r['rows']} rows)"

    print(f"  {r['label']:30s} | {r['week']:5s} | {status}")

# Aggregate multi-project devs
print("\n=== AGGREGATED ===")
tuannt_hours = sum(r['hours'] for r, _ in results if 'TuanNT' in r['label'] and 'Rebecca' not in r['label'])
lenh_hours = sum(r['hours'] for r, _ in results if 'LeNH' in r['label'])

tuannt_found = any(r['today_found'] for r, _ in results if 'TuanNT' in r['label'] and 'Rebecca' not in r['label'])
lenh_found = any(r['today_found'] for r, _ in results if 'LeNH' in r['label'])

print(f"  TuanNT (John Yi only): {tuannt_hours}h | found={tuannt_found}")
print(f"  LeNH (Rory+Franc+Aysar): {lenh_hours}h | found={lenh_found}")

# Rebecca special handling
for r, _ in results:
    if 'Rebecca' in r['label']:
        print(f"  TuanNT Rebecca: {r['hours']}h | col_p={r.get('rebecca_col_p', 'N/A')}")

# Output as JSON for downstream
print("\n=== JSON ===")
print(json.dumps([r for r, _ in results], default=str))
