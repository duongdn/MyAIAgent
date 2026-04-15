"""Temp script to check daily task logs for 2026-04-14."""
import json, sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = goog_create('sheets', 'v4', credentials=creds).spreadsheets()

TARGET_DATE = '14/04'  # Yesterday
TARGET_DATE_ALT = '14/4'

# All sheets to check with their developers
SHEETS = [
    ('LongVV_Maddy', '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I', 'LongVV'),
    ('PhucVT', '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'PhucVT'),
    ('TuanNT_JohnYi', '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', 'TuanNT'),
    ('TuanNT_Rebecca', '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', 'TuanNT'),
    ('VietPH', '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', 'VietPH'),
    ('KhanhHH', '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', 'KhanhHH'),
    ('LeNH_Rory', '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', 'LeNH'),
    ('LeNH_Franc', '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', 'LeNH'),
    ('LeNH_Aysar', '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', 'LeNH'),
]

# First, find which W-sheet contains April 14
# April 14, 2026 is in ISO week 16
# Try W15 and W16 on first sheet to determine mapping
def find_week_sheet(svc, sid):
    """Find which W-sheet contains April 14."""
    for w in ['W21', 'W20', 'W22', 'W19', 'W23']:
        try:
            r = svc.values().get(spreadsheetId=sid, range=f'{w}!A1:A60').execute()
            rows = r.get('values', [])
            for row in rows:
                if row and (TARGET_DATE in row[0] or TARGET_DATE_ALT in row[0]):
                    return w
        except:
            continue
    return None

# Find the week sheet from PhucVT (standard template)
ws = find_week_sheet(svc, '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI')
print(f"Week sheet for {TARGET_DATE}: {ws}")

if not ws:
    # Try reading W16 raw to debug
    r = svc.values().get(spreadsheetId='1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', range='W16!A1:A50').execute()
    rows = r.get('values', [])
    for i, row in enumerate(rows):
        if row:
            print(f"  W16 row {i}: {row[0][:80]}")
    sys.exit(1)

def check_daily_hours(svc, label, sid, dev, ws, target_date, target_date_alt):
    """Check hours for a specific date in a W-sheet."""
    try:
        r = svc.values().get(spreadsheetId=sid, range=f'{ws}!A1:P200').execute()
        rows = r.get('values', [])
    except Exception as e:
        return {'label': label, 'dev': dev, 'hours': 0, 'status': f'ERROR: {str(e)[:80]}', 'leave': '', 'rows_found': 0}

    hours = 0.0
    rows_found = 0
    in_target = False
    leave_note = ''
    first_row_skipped = False

    # Special handling for Rebecca - check col P for "Chưa"
    is_rebecca = 'Rebecca' in label
    rebecca_status = None

    for i, row in enumerate(rows):
        if not row:
            continue
        cell_a = row[0].strip() if row else ''

        # Check if this row starts target date
        if target_date in cell_a or target_date_alt in cell_a:
            in_target = True
            first_row_skipped = False
            # Check for leave notes in the date row itself
            row_str = ' '.join(str(c) for c in row)
            if 'Nghỉ cả ngày' in row_str:
                leave_note = 'full_day_off'
            if 'Nghỉ nửa ngày' in row_str:
                leave_note = 'half_day'
            continue

        # Check if we've moved past target date
        if in_target and cell_a:
            # Day headers typically contain day abbreviations with dates
            day_markers = ['Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,',
                          'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ', 'Sun ',
                          'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
            # Check if cell_a contains a date like DD/MM that's NOT our target
            import re
            date_match = re.search(r'\d{1,2}/\d{1,2}', cell_a)
            if date_match:
                found_date = date_match.group()
                if found_date != target_date and found_date != target_date_alt:
                    in_target = False
                    continue

        if in_target:
            # Check for leave notes
            row_str = ' '.join(str(c) for c in row)
            if 'Nghỉ cả ngày' in row_str:
                leave_note = 'full_day_off'
            if 'Nghỉ nửa ngày' in row_str:
                leave_note = 'half_day'

            if cell_a == 'Task dự án':
                # Skip first empty row of a day
                if not first_row_skipped:
                    # Check if this row has meaningful data
                    has_data = False
                    for c in row[1:8]:
                        if c and c.strip():
                            has_data = True
                            break
                    if not has_data:
                        first_row_skipped = True
                        continue
                    first_row_skipped = True

                # Filter by Owner column (G = index 6)
                owner = row[6].strip() if len(row) > 6 else ''
                hours_str = row[7].strip() if len(row) > 7 else '0'

                if owner == dev:
                    try:
                        h = float(hours_str.replace(',', '.'))
                        hours += h
                        rows_found += 1
                    except:
                        pass

            # Rebecca: check col P
            if is_rebecca and len(row) > 15:
                p_val = row[15].strip() if row[15] else ''
                if p_val:
                    rebecca_status = p_val

    # Determine status
    if leave_note == 'full_day_off':
        status = 'OFF (full day)'
    elif leave_note == 'half_day':
        status = 'OK (half-day)' if hours >= 4 else f'LOW ({hours}h, half-day)'
    elif hours >= 8:
        status = 'OK'
    elif hours > 0:
        status = f'LOW ({hours}h)'
    else:
        status = 'NO_DATA'

    result = {
        'label': label, 'dev': dev, 'hours': hours,
        'status': status, 'leave': leave_note, 'rows_found': rows_found
    }
    if is_rebecca:
        result['rebecca_status'] = rebecca_status
    return result

# Check all sheets
results = []
for label, sid, dev in SHEETS:
    # For LongVV Maddy, the week sheet might be different
    ws_to_use = ws
    if 'Maddy' in label:
        ws_maddy = find_week_sheet(svc, sid)
        if ws_maddy:
            ws_to_use = ws_maddy
        else:
            ws_to_use = ws  # fallback

    r = check_daily_hours(svc, label, sid, dev, ws_to_use, TARGET_DATE, TARGET_DATE_ALT)
    results.append(r)
    print(f"{r['label']:20s} | {r['dev']:8s} | {r['hours']:5.1f}h | rows:{r['rows_found']} | {r['status']} | leave:{r['leave']}")

# Aggregate
print("\n--- AGGREGATED ---")
tuannt_hours = sum(r['hours'] for r in results if r['dev'] == 'TuanNT' and 'Rebecca' not in r['label'])
lenh_hours = sum(r['hours'] for r in results if r['dev'] == 'LeNH')
print(f"TuanNT (JohnYi): {tuannt_hours}h")
print(f"LeNH (Rory+Franc+Aysar): {lenh_hours}h")

# Rebecca status
rebecca_r = [r for r in results if 'Rebecca' in r['label']]
if rebecca_r:
    print(f"Rebecca status: {rebecca_r[0].get('rebecca_status', 'N/A')}")

# Output JSON for further processing
print("\n--- JSON ---")
print(json.dumps(results, ensure_ascii=False))
