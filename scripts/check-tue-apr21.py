#!/usr/bin/env python3
"""Check Tuesday 21/04 data to see if any alerts carry over."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

TUE_TOKS = ['21/04', '21/4']
DAY_PREFIXES = ('Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,')

def get_day_hours(rows, dev, toks):
    today_day_key = None
    for row in rows:
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        if cell_a and any(cell_a.startswith(p) for p in DAY_PREFIXES):
            if any(t in cell_a for t in toks):
                today_day_key = cell_a
                break
    hours = 0.0
    leave = ""
    in_day = False
    rows_found = 0
    for row in rows:
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        if not in_day:
            if today_day_key and cell_a == today_day_key:
                in_day = True
                continue
        else:
            if cell_a and any(cell_a.startswith(p) for p in DAY_PREFIXES) and cell_a != today_day_key:
                break
            owner = row[6].strip() if len(row) > 6 else ""
            if cell_a == "Nghỉ cả ngày" and owner == dev:
                leave = "full_day_off"
            elif cell_a == "Nghỉ nửa ngày" and owner == dev and leave != "full_day_off":
                leave = "half_day"
            if cell_a == "Task dự án" and owner == dev:
                hstr = row[7].strip() if len(row) > 7 else "0"
                try:
                    hours += float(hstr.replace(',', '.'))
                    rows_found += 1
                except:
                    pass
    return hours, leave, rows_found

checks = [
    ("maddy_longvv",  "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W3"),
    ("paturevision_vietph", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH", "W24"),
    ("rory_lenh",     "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",  "LeNH",    "W8"),
    ("generator_khanhhh", "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W37"),
]

print("=== Tuesday 21/04 check ===")
for label, sid, dev, ws in checks:
    try:
        res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T200").execute()
        rows = res.get('values', [])
        h, leave, nrows = get_day_hours(rows, dev, TUE_TOKS)
        print(f"{label:25s} | {dev:8s} | Tue: {h:.2f}h | leave={leave or '-'} | rows={nrows}")
        time.sleep(0.4)
    except Exception as e:
        print(f"{label:25s} | {dev:8s} | ERROR: {e}")
        time.sleep(0.5)
