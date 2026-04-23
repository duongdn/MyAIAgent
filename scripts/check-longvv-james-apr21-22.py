#!/usr/bin/env python3
"""Check LongVV hours in James Diamond sheet (W22) for Tue 21/04 + Wed 22/04."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

# James Diamond sheet - LongVV contract starting W23 (2026-04-20 wk)
JAMES_SID = '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI'
MADDY_SID = '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I'

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

def scan(rows, dev, day_prefix, day_toks):
    in_day = False
    hours = 0.0
    leave = ''
    details = []
    for row in rows:
        if not row: continue
        a = (row[0].strip() if row[0] else '')
        if not in_day:
            if a.startswith(day_prefix + ',') and any(t in a for t in day_toks):
                in_day = True
            continue
        if a and any(a.startswith(d) for d in DAY_MARK):
            break
        owner = (row[6].strip() if len(row) > 6 else '')
        if a == 'Nghỉ cả ngày' and owner == dev:
            leave = 'full_day_off'
        elif a == 'Nghỉ nửa ngày' and owner == dev and leave != 'full_day_off':
            leave = 'half_day'
        if a == 'Task dự án' and owner == dev:
            h = (row[7].strip() if len(row) > 7 else '0')
            try:
                v = float(h.replace(',', '.'))
                hours += v
                details.append({'task': row[1] if len(row)>1 else '', 'hours': v})
            except:
                pass
    return hours, leave, details

# Try multiple W-sheets for James Diamond (we know PhucVT uses W22; LongVV may be in same)
for ws in ['W22', 'W23', 'W3']:
    try:
        res = svc.values().get(spreadsheetId=JAMES_SID, range=f"'{ws}'!A1:K500").execute()
        rows = res.get('values', [])
        if not rows:
            print(f"  [James D] {ws}: empty or no access")
            continue
        print(f"\n=== James Diamond sheet, {ws} ({len(rows)} rows) ===")
        for day_p, day_t, lbl in [('Tue',['21/04','21/4'],'Tue 21/04'), ('Wed',['22/04','22/4'],'Wed 22/04')]:
            h, lv, det = scan(rows, 'LongVV', day_p, day_t)
            print(f"  LongVV {lbl}: {h:.2f}h leave={lv or '-'} rows={len(det)}")
            for d in det:
                print(f"     - {d['hours']:.2f}h: {d['task'][:80]}")
    except Exception as e:
        print(f"  [James D] {ws}: ERROR {str(e)[:180]}")

# Also confirm Maddy/W3 for LongVV
print()
try:
    res = svc.values().get(spreadsheetId=MADDY_SID, range="'W3'!A1:K500").execute()
    rows = res.get('values', [])
    print(f"=== Maddy sheet, W3 ({len(rows)} rows) ===")
    for day_p, day_t, lbl in [('Tue',['21/04','21/4'],'Tue 21/04'), ('Wed',['22/04','22/4'],'Wed 22/04')]:
        h, lv, det = scan(rows, 'LongVV', day_p, day_t)
        print(f"  LongVV {lbl}: {h:.2f}h leave={lv or '-'} rows={len(det)}")
        for d in det:
            print(f"     - {d['hours']:.2f}h: {d['task'][:80]}")
except Exception as e:
    print(f"  [Maddy] ERROR: {str(e)[:180]}")
