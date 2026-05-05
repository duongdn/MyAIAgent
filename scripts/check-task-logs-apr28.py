#!/usr/bin/env python3
"""Task log check for Tuesday 28/04/2026.
Probe likely W-sheets per developer to find the one containing Tue 28/04.
"""
import time
import json
import sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(
    SA_KEY,
    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'],
)
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

TARGET_DAY = 'Tue'
TARGET_TOKS = ['28/04', '28/4']
DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

# Sheets to check; for each we'll probe a list of candidate W tabs to find the one
# whose A column has "Tue, 28/04".
SHEETS = [
    # (label, sid, dev_name, candidate_ws_list)
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  ["W4", "W3", "W5"]),
    ("james_diamond", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "LongVV",  ["W23", "W22", "W24"]),
    ("james_phuc",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  ["W23", "W22", "W24"]),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", ["W38", "W37", "W39"]),
    ("paturevision",  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH",  ["W25", "W24", "W26"]),
    ("bailey_tuan",   "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "TuanNT",  ["W25", "W24", "W26"]),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",    ["W9",  "W8",  "W10"]),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",    ["W22", "W21", "W23"]),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",    ["W22", "W21", "W23"]),
    ("john_yi",       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT",  ["W21", "W20", "W22"]),
    ("rebecca_tuan",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT",  ["W22", "W21", "W23"]),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "LeNH",    ["W22", "W21", "W23"]),
]


def find_ws_with_target(sid, ws_candidates):
    """Probe candidate worksheets and return (ws, rows) for the first one
    that contains a 'Tue, 28/04' marker in column A."""
    for ws in ws_candidates:
        try:
            res = sheets_api.values().get(
                spreadsheetId=sid, range=f"'{ws}'!A1:T500"
            ).execute()
            rows = res.get('values', [])
            for r in rows:
                if not r:
                    continue
                a = (r[0].strip() if r[0] else "")
                if a.startswith(TARGET_DAY + ',') and any(t in a for t in TARGET_TOKS):
                    return ws, rows
            time.sleep(0.3)
        except Exception as e:
            # Tab may not exist; try next
            time.sleep(0.3)
            continue
    return None, None


def day_hours(rows, dev):
    """Sum 'Task dự án' rows for dev on Tue 28/04."""
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "")
        if not in_day:
            if cell_a.startswith(TARGET_DAY + ',') and any(t in cell_a for t in TARGET_TOKS):
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
                    except Exception:
                        pass
    return hours, leave, rows_found


def day_hours_lenh_rebecca(rows):
    """LeNH in Rebecca sheet: per actual data inspection, LeNH logs in
    col G (owner) and col H (hours), same layout as everyone else.
    Cols Q-T contain only 'Chưa' placeholders. So we just call day_hours
    with dev='LeNH'."""
    return day_hours(rows, "LeNH")


print(f"=== Task log check — Tue 28/04/2026 ===\n")

cache = {}
results = []

for label, sid, dev, candidates in SHEETS:
    try:
        ck = (sid, tuple(candidates))
        if ck in cache:
            ws, rows = cache[ck]
        else:
            ws, rows = find_ws_with_target(sid, candidates)
            cache[ck] = (ws, rows)
        if ws is None:
            print(f"{label:20s} | {dev:8s} | NO_WS_FOUND (tried {candidates})")
            results.append({'label': label, 'dev': dev, 'ws': None,
                            'error': f'no ws found among {candidates}'})
            continue

        if label == "rebecca_lenh":
            h, leave, nrows = day_hours_lenh_rebecca(rows)
        else:
            h, leave, nrows = day_hours(rows, dev)

        def status(h, leave):
            if leave == "full_day_off":
                return "OFF"
            if leave == "half_day" and h >= 4:
                return "OK(half)"
            if leave == "half_day":
                return "LOW(half)"
            if h >= 8:
                return "OK"
            if h >= 4:
                return "LOW"
            if h > 0:
                return "VLOW"
            return "ZERO"

        s = status(h, leave)
        print(
            f"{label:20s} | {dev:8s} | {ws:4s} | {h:5.2f}h | {s:10s} | "
            f"leave={leave or '-'} | rows={nrows}"
        )
        results.append({
            'label': label, 'dev': dev, 'ws': ws, 'hours': h,
            'leave': leave, 'rows': nrows, 'status': s,
        })
    except Exception as e:
        print(f"{label:20s} | {dev:8s} | ERROR: {str(e)[:200]}")
        results.append({'label': label, 'dev': dev, 'error': str(e)[:200]})
        time.sleep(1.0)

print("\n=== Aggregate per-dev ===\n")

devs = {}
for r in results:
    key = r['dev']
    devs.setdefault(key, {
        'hours': 0.0, 'leave': '', 'sheets': [], 'has_error': False,
    })
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
        st = "OK(half)" if h >= 4 else f"LOW(half) {h:.2f}h"
    elif h >= 8:
        alert = False
        st = 'OK'
    elif h > 0:
        alert = True
        st = f"LOW {h:.2f}h"
    else:
        alert = True
        st = 'ZERO (ALERT)'
    print(
        f"{dev:10s} | {h:8.2f} | {leave or '-':12s} | "
        f"{'YES' if alert else 'no':5s} | {' '.join(d['sheets'])}"
    )

with open('/tmp/tasklog_apr28.json', 'w') as f:
    json.dump({'per_sheet': results, 'per_dev': devs}, f, indent=2, default=str)
print("\nJSON saved to /tmp/tasklog_apr28.json")
