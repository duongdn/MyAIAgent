#!/usr/bin/env python3
"""Re-check Mon 20/04 task logs for LeNH + TuanNT only (alerts from morning run)."""
import sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = build('sheets', 'v4', credentials=creds)
api = service.spreadsheets()

checks = [
    ("rory",         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",    "W8"),
    ("franc",        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",    "W21"),
    ("aysar",        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",    "W21"),
    ("john_yi",      "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT",  "W20"),
    ("rebecca_tuan", "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT",  "W21"),
    ("rebecca_lenh", "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "LeNH",    "W21"),
]

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')
MON_TOK = ['20/04', '20/4']


def day_hours(rows, dev):
    in_day = False
    hours = 0.0
    leave = ""
    for row in rows:
        if not row:
            continue
        a = row[0].strip() if row[0] else ""
        if not in_day:
            if a.startswith('Mon,') and any(t in a for t in MON_TOK):
                in_day = True
                continue
        else:
            if a and any(a.startswith(d) for d in DAY_MARK):
                break
            owner = row[6].strip() if len(row) > 6 else ""
            if a == "Nghỉ cả ngày" and (owner == dev or owner == ""):
                if owner == dev:
                    leave = "full_day_off"
            elif a == "Nghỉ nửa ngày" and owner == dev and leave != "full_day_off":
                leave = "half_day"
            if a == "Task dự án" and owner == dev:
                hstr = row[7].strip() if len(row) > 7 else "0"
                try:
                    hours += float(hstr.replace(',', '.'))
                except:
                    pass
    return hours, leave


print(f"{'proj':<15} {'dev':<8} {'week':<4} {'mon_h':>6} {'leave':<15}")
print("-" * 55)

for name, sid, dev, ws in checks:
    try:
        res = api.values().get(spreadsheetId=sid, range=f"{ws}!A1:K500").execute()
        rows = res.get('values', [])
        h, lv = day_hours(rows, dev)
        print(f"{name:<15} {dev:<8} {ws:<4} {h:>6.2f} {lv:<15}")
    except Exception as e:
        print(f"{name:<15} {dev:<8} {ws:<4} ERROR: {e}")
