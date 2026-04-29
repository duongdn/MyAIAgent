#!/usr/bin/env python3
"""Inspect Rebecca sheet W22 for Mon 27/04 LeNH section structure (cols Q-T)."""
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

# Rebecca sheet, W22
sid = "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4"
res = sheets_api.values().get(spreadsheetId=sid, range="'W22'!A1:T200").execute()
rows = res.get('values', [])

# Print first 20 rows fully
print("=== Header rows (1-20) ===")
for i, r in enumerate(rows[:20]):
    cells = [(r[j].strip() if j < len(r) and r[j] else '') for j in range(20)]
    print(f"row {i+1}: A={cells[0]!r} G={cells[6]!r} H={cells[7]!r} | "
          f"Q={cells[16]!r} R={cells[17]!r} S={cells[18]!r} T={cells[19]!r}")

print("\n=== All days ===")
for i, r in enumerate(rows):
    if not r:
        continue
    a = (r[0].strip() if r[0] else "")
    if a and any(a.startswith(d) for d in DAY_MARK):
        print(f"row {i+1}: {a!r}")

# Now scan Mon 27/04 fully
print("\n=== Mon 27/04 rows ===")
in_day = False
for i, r in enumerate(rows):
    if not r:
        continue
    a = (r[0].strip() if r[0] else "")
    if not in_day:
        if a.startswith('Mon,') and ('27/04' in a or '27/4' in a):
            in_day = True
            print(f"  Marker @ row {i+1}: {a!r}")
            continue
    else:
        if a and any(a.startswith(d) for d in DAY_MARK):
            print(f"  Stop @ row {i+1}: {a!r}")
            break
        cells = [(r[j].strip() if j < len(r) and r[j] else '') for j in range(20)]
        if any(c for c in cells):
            print(f"  row {i+1}: A={cells[0]!r} G={cells[6]!r} H={cells[7]!r} | "
                  f"Q={cells[16]!r} R={cells[17]!r} S={cells[18]!r} T={cells[19]!r}")
