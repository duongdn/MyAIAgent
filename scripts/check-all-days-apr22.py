#!/usr/bin/env python3
"""Check all days in current W-sheets to understand what data exists.
Also check the KhanhHH sheet ID correctly."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

DAY_PREFIXES = ('Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,')

def scan_days(rows, dev):
    """Show hours per day for this dev."""
    current_day = None
    day_hours = {}
    for row in rows:
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        if cell_a and any(cell_a.startswith(p) for p in DAY_PREFIXES):
            current_day = cell_a
            day_hours.setdefault(current_day, 0.0)
            continue
        if current_day and cell_a == "Task dự án":
            owner = row[6].strip() if len(row) > 6 else ""
            hstr = row[7].strip() if len(row) > 7 else "0"
            if owner == dev:
                try:
                    day_hours[current_day] += float(hstr.replace(',', '.'))
                except:
                    pass
    return day_hours

# Check KhanhHH - the correct sheet ID has a different character
# The task briefing says: 1LVj66VKCe8ShqR9YNAet-d3EgEBIUGYaY0ooYSdHkeEM
# The apr20 script used: 1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM  (different char: G vs W)
print("KhanhHH sheet check:")
for sid_variant in [
    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUGYaY0ooYSdHkeEM",  # from task briefing (G)
    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",   # from apr20 script (W)
]:
    try:
        meta = sheets_api.get(spreadsheetId=sid_variant, fields='sheets.properties.title').execute()
        sheets = [s['properties']['title'] for s in meta['sheets']]
        print(f"  {sid_variant[-10:]}: OK - {len(sheets)} sheets")
    except Exception as e:
        print(f"  {sid_variant[-10:]}: ERROR - {str(e)[:80]}")
    time.sleep(0.3)

# Check maddy W3 all days for LongVV
print("\n=== maddy W3 - LongVV per-day hours ===")
res = sheets_api.values().get(
    spreadsheetId="1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    range="'W3'!A1:T200"
).execute()
rows = res.get('values', [])
day_hrs = scan_days(rows, "LongVV")
for day, h in day_hrs.items():
    print(f"  {day}: {h:.2f}h")

time.sleep(0.5)

# Check james_diamond W22 for PhucVT
print("\n=== james_diamond W22 - PhucVT per-day hours ===")
res = sheets_api.values().get(
    spreadsheetId="1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    range="'W22'!A1:T200"
).execute()
rows = res.get('values', [])
day_hrs = scan_days(rows, "PhucVT")
for day, h in day_hrs.items():
    print(f"  {day}: {h:.2f}h")

time.sleep(0.5)

# Check john_yi W20 for TuanNT
print("\n=== john_yi W20 - TuanNT per-day hours ===")
res = sheets_api.values().get(
    spreadsheetId="1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    range="'W20'!A1:T200"
).execute()
rows = res.get('values', [])
day_hrs = scan_days(rows, "TuanNT")
for day, h in day_hrs.items():
    print(f"  {day}: {h:.2f}h")

time.sleep(0.5)

# Check paturevision W24 for VietPH
print("\n=== paturevision W24 - VietPH per-day hours ===")
res = sheets_api.values().get(
    spreadsheetId="1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    range="'W24'!A1:T200"
).execute()
rows = res.get('values', [])
day_hrs = scan_days(rows, "VietPH")
for day, h in day_hrs.items():
    print(f"  {day}: {h:.2f}h")

time.sleep(0.5)

# Check rory W8 for LeNH
print("\n=== rory W8 - LeNH per-day hours ===")
res = sheets_api.values().get(
    spreadsheetId="1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    range="'W8'!A1:T200"
).execute()
rows = res.get('values', [])
day_hrs = scan_days(rows, "LeNH")
for day, h in day_hrs.items():
    print(f"  {day}: {h:.2f}h")

time.sleep(0.5)

# Check franc W21 for LeNH
print("\n=== franc W21 - LeNH per-day hours ===")
res = sheets_api.values().get(
    spreadsheetId="1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    range="'W21'!A1:T200"
).execute()
rows = res.get('values', [])
day_hrs = scan_days(rows, "LeNH")
for day, h in day_hrs.items():
    print(f"  {day}: {h:.2f}h")

time.sleep(0.5)

# Check aysar W21 for LeNH
print("\n=== aysar W21 - LeNH per-day hours ===")
res = sheets_api.values().get(
    spreadsheetId="1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    range="'W21'!A1:T200"
).execute()
rows = res.get('values', [])
day_hrs = scan_days(rows, "LeNH")
for day, h in day_hrs.items():
    print(f"  {day}: {h:.2f}h")
