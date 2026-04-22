#!/usr/bin/env python3
"""Task log check for Wednesday 22/04/2026.
W-sheet mapping verified: maddy=W3, james=W22, gen=W37, pv=W24, rory=W8, franc=W21, aysar=W21, john_yi=W20, rebecca=W21
"""
import time, json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

TODAY_DAY = 'Wed'
TODAY_TOKS = ['22/04', '22/4']

# (label, sheet_id, dev_name, ws)
# bailey_tuan: same sheet as paturevision, check TuanNT owner
SHEETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W3"),
    ("james_diamond", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  "W22"),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUGYaY0ooYSdHkeEM", "KhanhHH", "W37"),
    ("paturevision",  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "VietPH",  "W24"),
    ("bailey_tuan",   "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "TuanNT",  "W24"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",  "LeNH",    "W8"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",  "LeNH",    "W21"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",  "LeNH",    "W21"),
    ("john_yi",       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",  "TuanNT",  "W20"),
    ("rebecca_tuan",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "TuanNT",  "W21"),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "LeNH",    "W21"),
]

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')


def day_hours(rows, dev, day_prefix, day_toks):
    """Sum 'Task dự án' rows for dev on the given day.
    Filter by col G (index 6) == dev, hours in col H (index 7).
    Exclude 'Part-time' rows (col A check)."""
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "")
        if not in_day:
            if cell_a.startswith(day_prefix + ',') and any(t in cell_a for t in day_toks):
                in_day = True
                continue
        else:
            if cell_a and any(cell_a.startswith(d) for d in DAY_MARK):
                break
            owner = (row[6].strip() if len(row) > 6 else "")
            if cell_a == "Nghỉ cả ngày" and (owner == dev or owner == ""):
                if owner == dev:
                    leave = "full_day_off"
            elif cell_a == "Nghỉ nửa ngày" and owner == dev and leave != "full_day_off":
                leave = "half_day"
            if cell_a == "Task dự án":
                hstr = (row[7].strip() if len(row) > 7 else "0")
                if owner == dev:
                    try:
                        hours += float(hstr.replace(',', '.'))
                        rows_found += 1
                    except:
                        pass
    return hours, leave, rows_found


def day_hours_lenh_rebecca(rows, day_prefix, day_toks):
    """LeNH in Rebecca sheet: cols Q-T (indices 16-19).
    Col Q (16) = task type, Col R (17) = task description, Col S (18) = owner, Col T (19) = hours.
    But first check actual column layout by scanning the header/day rows."""
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "")
        if not in_day:
            if cell_a.startswith(day_prefix + ',') and any(t in cell_a for t in day_toks):
                in_day = True
                continue
        else:
            if cell_a and any(cell_a.startswith(d) for d in DAY_MARK):
                break
            # LeNH section in cols Q-T (0-indexed: 16-19)
            cell_q = (row[16].strip() if len(row) > 16 else "")
            cell_s = (row[18].strip() if len(row) > 18 else "")
            cell_t = (row[19].strip() if len(row) > 19 else "0")
            if cell_q == "Task dự án" and cell_s == "LeNH":
                try:
                    hours += float(cell_t.replace(',', '.'))
                    rows_found += 1
                except:
                    pass
            if cell_q == "Nghỉ cả ngày" and (cell_s == "LeNH" or cell_s == ""):
                leave = "full_day_off"
            elif cell_q == "Nghỉ nửa ngày" and cell_s == "LeNH" and leave != "full_day_off":
                leave = "half_day"
    return hours, leave, rows_found


print(f"=== Task log check — Wed 22/04/2026 ===\n")

# Cache rows per (sid, ws) to avoid double-fetching
cache = {}
results = []

for label, sid, dev, ws in SHEETS:
    cache_key = (sid, ws)
    try:
        if cache_key not in cache:
            res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T500").execute()
            cache[cache_key] = res.get('values', [])
            time.sleep(0.4)
        rows = cache[cache_key]

        if label == "rebecca_lenh":
            h, leave, nrows = day_hours_lenh_rebecca(rows, TODAY_DAY, TODAY_TOKS)
        else:
            h, leave, nrows = day_hours(rows, dev, TODAY_DAY, TODAY_TOKS)

        def status(h, leave):
            if leave == "full_day_off": return "OFF"
            if leave == "half_day" and h >= 4: return "OK(half)"
            if leave == "half_day": return "LOW(half)"
            if h >= 8: return "OK"
            if h >= 4: return "LOW"
            if h > 0: return "VLOW"
            return "ZERO"

        s = status(h, leave)
        print(f"{label:20s} | {dev:8s} | {ws:4s} | {h:5.2f}h | {s:10s} | leave={leave or '-'} | rows={nrows}")
        results.append({'label': label, 'dev': dev, 'ws': ws, 'hours': h, 'leave': leave, 'rows': nrows, 'status': s})
    except Exception as e:
        print(f"{label:20s} | {dev:8s} | ERROR: {str(e)[:200]}")
        results.append({'label': label, 'dev': dev, 'ws': ws, 'error': str(e)[:200]})
        time.sleep(1.0)

print("\n=== Aggregate per-dev ===\n")

devs = {}
for r in results:
    key = r['dev']
    devs.setdefault(key, {'hours': 0.0, 'leave': '', 'sheets': [], 'has_error': False})
    if 'error' in r:
        devs[key]['has_error'] = True
        devs[key]['sheets'].append(f"{r['label']}:ERR")
        continue
    devs[key]['hours'] += r['hours']
    if r['leave'] == 'full_day_off':
        devs[key]['leave'] = 'full_day_off'
    elif r['leave'] == 'half_day' and devs[key]['leave'] != 'full_day_off':
        devs[key]['leave'] = 'half_day'
    devs[key]['sheets'].append(f"{r['label']}:{r['hours']:.2f}h")

print(f"{'Dev':10s} | {'Today(h)':8s} | {'Leave':12s} | {'Alert':5s} | Breakdown")
for dev, d in sorted(devs.items()):
    h = d['hours']
    leave = d['leave']
    if leave == 'full_day_off':
        alert = False
        st = 'OFF'
    elif leave == 'half_day':
        alert = h < 4
        st = f"OK(half)" if h >= 4 else f"LOW(half) {h:.2f}h"
    elif h >= 8:
        alert = False
        st = 'OK'
    elif h > 0:
        alert = True
        st = f"LOW {h:.2f}h"
    else:
        alert = True
        st = 'ZERO (ALERT)'
    print(f"{dev:10s} | {h:8.2f} | {leave or '-':12s} | {'YES' if alert else 'no':5s} | {' '.join(d['sheets'])}")

with open('/tmp/tasklog_apr22_final.json', 'w') as f:
    json.dump({'per_sheet': results, 'per_dev': devs}, f, indent=2, default=str)
print("\nJSON saved to /tmp/tasklog_apr22_final.json")
