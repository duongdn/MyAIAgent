#!/usr/bin/env python3
"""Sum task-log hours for the current Upwork week (Mon 05/04 - Sun 05/10) for Upwork workrooms.

Sums column H (hours) across day headers for each target sheet.
"""
import re
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

# Week: Mon 04/05 .. Sun 10/05 (DD/MM format used in sheets)
WEEK_DAYS = [
    ('Mon', '04/05'),
    ('Tue', '05/05'),
    ('Wed', '06/05'),
    ('Thu', '07/05'),
    ('Fri', '08/05'),
    ('Sat', '09/05'),
    ('Sun', '10/05'),
]

TARGETS = [
    # label, sheetId, worksheet, dev_filter (None = all rows in day; or substring required in column A or B)
    ('Rory (LeNH)',  '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', 'W10', None),
    ('Aysar (LeNH)', '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', 'W23', None),
    # Paturevision sheet has both VietPH and DuongDN (and others). We must filter by owner column.
    # Bailey-VietPH: filter rows where owner/dev column contains "Viet" (B may be task name; owner is somewhere)
    # Bailey-DuongDN: filter rows where owner contains "Duong"
    ('Bailey-VietPH','1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg','W26','VietPH'),
    ('Bailey-DuongDN','1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg','W26','DuongDN'),
]

DAY_PREFIXES = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

def parse_hours(val):
    if not val:
        return 0.0
    s = str(val).strip()
    if not s:
        return 0.0
    # try direct float
    try:
        return float(s)
    except ValueError:
        pass
    # H:MM
    m = re.match(r'^(\d+):(\d{2})$', s)
    if m:
        return int(m.group(1)) + int(m.group(2)) / 60.0
    return 0.0

for label, sid, ws, owner_filter in TARGETS:
    try:
        res = svc.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T300").execute()
        rows = res.get('values', [])
    except Exception as e:
        print(f"{label}: ERROR {e}")
        continue
    # Find header rows for each target day
    headers_idx = []  # list of (row_idx, day_label)
    for idx, r in enumerate(rows):
        if r and r[0]:
            a = r[0].strip()
            if any(a.startswith(d) for d in DAY_PREFIXES):
                headers_idx.append((idx, a))
    # Map by date string
    print(f"\n=== {label} ({ws}) ===")
    week_total = 0.0
    daily = {}
    for day_short, mmdd in WEEK_DAYS:
        # find header that startswith day_short and contains mmdd
        match = None
        for ridx, hdr in headers_idx:
            if hdr.startswith(day_short + ',') and mmdd in hdr:
                match = ridx
                break
        if match is None:
            daily[mmdd] = None
            continue
        # find next day header to bound
        next_idx = None
        for ridx, hdr in headers_idx:
            if ridx > match:
                next_idx = ridx
                break
        end = next_idx if next_idx else len(rows)
        # Sum column H (index 7) for rows in [match+1, end). Filter by owner if given.
        day_sum = 0.0
        for i in range(match + 1, end):
            r = rows[i]
            if not r:
                continue
            # Need to know which column has owner. Try to find a column with the filter substring across full row
            row_text = ' | '.join((c or '') for c in r)
            if owner_filter and owner_filter not in row_text:
                continue
            h_val = r[7] if len(r) > 7 else ''
            day_sum += parse_hours(h_val)
        daily[mmdd] = day_sum
        week_total += day_sum
    for day_short, mmdd in WEEK_DAYS:
        v = daily[mmdd]
        if v is None:
            print(f"  {day_short} {mmdd}: (no header)")
        else:
            print(f"  {day_short} {mmdd}: {v:.2f}h")
    print(f"  WEEK TOTAL: {week_total:.2f}h")
