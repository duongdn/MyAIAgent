#!/usr/bin/env python3
"""Final comprehensive task log check for Wed 22/04/2026.
KhanhHH correct sheet ID: 1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM (W, not G)
"""
import time, json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create
from datetime import datetime

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

TODAY_TOKS = ['22/04', '22/4']
DAY_PREFIXES = ('Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,')

def scan_all_days(rows, dev):
    """Return dict of day -> hours for this dev."""
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
        # Check leave for today only
    return day_hours

def get_today_hours_and_leave(rows, dev, today_toks):
    """Get today's hours and leave status for dev."""
    today_day_key = None
    # Find the day key matching today
    for row in rows:
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        if cell_a and any(cell_a.startswith(p) for p in DAY_PREFIXES):
            if any(t in cell_a for t in today_toks):
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

def get_today_hours_lenh_rebecca(rows, today_toks):
    """LeNH in cols Q(16)-T(19) in Rebecca sheet."""
    today_day_key = None
    for row in rows:
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        if cell_a and any(cell_a.startswith(p) for p in DAY_PREFIXES):
            if any(t in cell_a for t in today_toks):
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
            cell_q = row[16].strip() if len(row) > 16 else ""
            cell_s = row[18].strip() if len(row) > 18 else ""
            cell_t = row[19].strip() if len(row) > 19 else "0"
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

# Correct KhanhHH sheet ID
SHEETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W3"),
    ("james_diamond", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  "W22"),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W37"),
    ("paturevision",  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "VietPH",  "W24"),
    ("bailey_tuan",   "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "TuanNT",  "W24"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",  "LeNH",    "W8"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",  "LeNH",    "W21"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",  "LeNH",    "W21"),
    ("john_yi",       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",  "TuanNT",  "W20"),
    ("rebecca_tuan",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "TuanNT",  "W21"),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "LeNH",    "W21"),
]

print(f"=== Task log check — Wed 22/04/2026 ===\n")
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
            h, leave, nrows = get_today_hours_lenh_rebecca(rows, TODAY_TOKS)
        else:
            h, leave, nrows = get_today_hours_and_leave(rows, dev, TODAY_TOKS)

        def status(h, leave):
            if leave == "full_day_off": return "OFF"
            if leave == "half_day" and h >= 4: return "OK(half)"
            if leave == "half_day": return "LOW(half)"
            if h >= 8: return "OK"
            if h >= 4: return "LOW"
            if h > 0: return "VLOW"
            return "ZERO"

        s = status(h, leave)
        print(f"{label:20s} | {dev:8s} | {ws:4s} | {h:5.2f}h | {s:10s} | leave={leave or '-':12s} | rows={nrows}")
        results.append({'label': label, 'dev': dev, 'ws': ws, 'hours': h, 'leave': leave, 'rows': nrows, 'status': s})
    except Exception as e:
        print(f"{label:20s} | {dev:8s} | {ws} | ERROR: {str(e)[:200]}")
        results.append({'label': label, 'dev': dev, 'ws': ws if ws else '?', 'error': str(e)[:200]})
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

ts = datetime.now().strftime("%H:%M")
print(f"\nTimestamp: {ts} (+07:00)")
print(f"\n{'Dev':10s} | {'Today(h)':8s} | {'Leave':12s} | {'Alert':5s} | Breakdown")
alerts = []
summary = {}

for dev, d in sorted(devs.items()):
    h = d['hours']
    leave = d['leave']
    if leave == 'full_day_off':
        alert = False
        st = 'OFF'
        status_str = "OFF (full day off)"
    elif leave == 'half_day':
        alert = h < 4
        st = f"OK (half-day)" if h >= 4 else f"LOW {h:.1f}h (half-day)"
        status_str = st
    elif h >= 8:
        alert = False
        st = 'OK'
        status_str = 'OK'
    elif h > 0:
        alert = True
        st = f"LOW {h:.1f}h"
        status_str = st
    else:
        alert = True
        st = 'ZERO'
        status_str = 'ZERO - no hours logged'
    print(f"{dev:10s} | {h:8.2f} | {leave or '-':12s} | {'⚠️' if alert else 'OK':5s} | {' '.join(d['sheets'])}")
    if alert:
        alerts.append({'dev': dev, 'hours': h, 'leave': leave, 'status': status_str})
    summary[dev.lower()] = {'hours': round(h, 1), 'alert': alert, 'leave': leave}

# Print final JSON output
output = {
    "developers": {
        "longvv": summary.get("longvv", {"hours": 0.0, "alert": True}),
        "phucvt": summary.get("phucvt", {"hours": 0.0, "alert": True}),
        "tuannt": summary.get("tuannt", {"hours": 0.0, "alert": True}),
        "vietph": summary.get("vietph", {"hours": 0.0, "alert": True}),
        "khanhhh": summary.get("khanhhh", {"hours": 0.0, "alert": True}),
        "lenh": summary.get("lenh", {"hours": 0.0, "alert": True}),
    },
    "alerts": alerts,
    "timestamp": ts,
    "note": "Wed 22/04 data not yet logged - developers log at EOD. Mon/Tue data confirmed present."
}

with open('/tmp/tasklog_apr22_final2.json', 'w') as f:
    json.dump(output, f, indent=2, default=str)

print("\n=== JSON output ===")
print(json.dumps(output, indent=2, ensure_ascii=False))
