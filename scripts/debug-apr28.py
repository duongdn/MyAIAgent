#!/usr/bin/env python3
"""Debug: dump Tue 28/04 rows for problematic sheets."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(
    SA_KEY,
    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'],
)
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

# (label, sid, ws)
TARGETS = [
    ("maddy_W4",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "W4"),
    ("james_W23",        "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "W23"),
    ("generator_W38",    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "W38"),
    ("paturevision_W25", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "W25"),
    ("rory_W9",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "W9"),
    ("franc_W22",        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "W22"),
    ("aysar_W22",        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "W22"),
    ("john_yi_W21",      "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "W21"),
    ("rebecca_W22",      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "W22"),
]

for label, sid, ws in TARGETS:
    try:
        res = sheets_api.values().get(
            spreadsheetId=sid, range=f"'{ws}'!A1:T500"
        ).execute()
        rows = res.get('values', [])
        print(f"\n=== {label} | {ws} | {len(rows)} rows ===")
        in_day = False
        printed = 0
        for i, r in enumerate(rows):
            if not r:
                continue
            a = (r[0].strip() if r[0] else "")
            if not in_day:
                if a.startswith('Tue,') and ('28/04' in a or '28/4' in a):
                    in_day = True
                    print(f"  [Tue 28/04 marker @ row {i+1}]: {a!r}")
                    continue
            else:
                if a and any(a.startswith(d) for d in DAY_MARK):
                    print(f"  [next day marker @ row {i+1}]: {a!r} -> stop")
                    break
                # print full row content (cols A-T)
                cells = [(r[j].strip() if j < len(r) and r[j] else '') for j in range(20)]
                # only print if there's *some* content
                if any(c for c in cells):
                    print(f"  row {i+1}: A={cells[0]!r} G={cells[6]!r} H={cells[7]!r} | "
                          f"Q={cells[16]!r} R={cells[17]!r} S={cells[18]!r} T={cells[19]!r}")
                    printed += 1
                if printed > 30:
                    print("  ... (truncated)")
                    break
        time.sleep(0.4)
    except Exception as e:
        print(f"{label}: ERROR {e}")
        time.sleep(1.0)
