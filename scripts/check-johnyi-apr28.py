#!/usr/bin/env python3
"""John Yi task log: sum Tue 28/04/26 TuanNT 'Task dự án' hours."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = 'config/daily-agent-490610-7eb7985b33e3.json'
SHEET_ID = '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'
DEV = 'TuanNT'

creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds)
sapi = svc.spreadsheets()

# List all sheet tabs
meta = sapi.get(spreadsheetId=SHEET_ID, fields='sheets.properties.title').execute()
titles = [s['properties']['title'] for s in meta['sheets']]
print('Tabs:', titles)

# Try every tab — find one with 28/04
target_ws = None
for ws in titles:
    try:
        r = sapi.values().get(spreadsheetId=SHEET_ID, range=f"'{ws}'!A1:A300").execute()
        vals = r.get('values', [])
        for row in vals:
            if row and ('28/04' in row[0] or '28/4' in row[0]):
                target_ws = ws
                print(f'Found 28/04 in sheet "{ws}"')
                break
        if target_ws:
            break
    except Exception as e:
        print(f'  err {ws}: {e}')

if not target_ws:
    # Print A4 sample of last 8 W tabs to inspect
    print('No 28/04 found. Sampling tabs:')
    for ws in titles[-10:]:
        try:
            r = sapi.values().get(spreadsheetId=SHEET_ID, range=f"'{ws}'!A1:A20").execute()
            vals = r.get('values', [])
            print(f'  {ws}:')
            for v in vals[:15]:
                print('    ', (v[0] if v else '')[:80])
        except Exception as e:
            print(f'    err {e}')
    raise SystemExit(2)

result = sapi.values().get(spreadsheetId=SHEET_ID, range=f"'{target_ws}'!A1:K400").execute()
rows = result.get('values', [])

tue_hours = 0.0
tue_count = 0
in_tue = False
leave_note = ''
debug_rows = []

for i, row in enumerate(rows):
    if not row:
        continue
    cell_a = (row[0] if len(row) > 0 else '').strip()
    if 'Tue' in cell_a and ('28/04' in cell_a or '28/4' in cell_a):
        in_tue = True
        continue
    if in_tue and cell_a and any(d in cell_a for d in ['Sat,', 'Mon,', 'Sun,', 'Wed,', 'Thu,', 'Fri,']):
        in_tue = False
        continue
    if in_tue:
        if cell_a == 'Task dự án':
            owner = (row[6] if len(row) > 6 else '').strip()
            hstr = (row[7] if len(row) > 7 else '0').strip()
            if owner == DEV:
                try:
                    h = float(hstr.replace(',', '.')) if hstr else 0.0
                    tue_hours += h
                    tue_count += 1
                    debug_rows.append((i+1, owner, h, (row[1] if len(row) > 1 else '')[:60]))
                except Exception:
                    pass
        rs = str(row)
        if 'Nghỉ cả ngày' in rs:
            leave_note = 'full_day_off'
        if 'Nghỉ nửa ngày' in rs:
            leave_note = 'half_day'

print(f'\nSheet: {target_ws}')
print(f'TuanNT Tue 28/04 Task dự án rows: {tue_count}')
print(f'Total hours: {tue_hours}')
print(f'Leave: {leave_note or "(none)"}')
print('Detail:')
for r in debug_rows:
    print(' ', r)
