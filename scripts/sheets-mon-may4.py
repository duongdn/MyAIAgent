#!/usr/bin/env python3
"""Sheets check — Mon 04/05/2026 (yesterday).

Fetches Task dự án rows for Mon 04/05/26 from each developer's sheet.
"""
import time, json, sys, re
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')
DAY_PREFIX = 'Mon'
DAY_TOKS = ['04/05']

# (label, sheet_id, dev, worksheet for week containing Mon 04/05/26)
SHEETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W5"),
    ("james_long",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "LongVV",  "W24"),
    ("james_phuc",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  "W24"),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W39"),
    ("paturevision",  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH",  "W26"),
    ("pv_tuan",       "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "TuanNT",  "W26"),
    ("john_yi",       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT",  "W22"),
    ("rebecca_tuan",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT",  "W23"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",    "W10"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",    "W23"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",    "W23"),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "LeNH",    "W23"),
]


def day_hours(rows, dev):
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "")
        if not in_day:
            if cell_a.startswith(DAY_PREFIX + ',') and any(t in cell_a for t in DAY_TOKS):
                in_day = True
                continue
        else:
            if cell_a and any(cell_a.startswith(d) for d in DAY_MARK):
                break
            owner = (row[6].strip() if len(row) > 6 else "")
            if cell_a == "Nghỉ cả ngày" and (owner == dev or owner == ""):
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


def day_hours_lenh_rebecca(rows):
    """LeNH in Rebecca sheet uses cols Q-T (16-19)."""
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "")
        if not in_day:
            if cell_a.startswith(DAY_PREFIX + ',') and any(t in cell_a for t in DAY_TOKS):
                in_day = True
                continue
        else:
            if cell_a and any(cell_a.startswith(d) for d in DAY_MARK):
                break
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


# Cache per (sid,ws)
data_cache = {}
results = []

for label, sid, dev, ws in SHEETS:
    cache_key = (sid, ws)
    try:
        if cache_key not in data_cache:
            # Retry on rate limit
            for attempt in range(4):
                try:
                    res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T500").execute()
                    data_cache[cache_key] = res.get('values', [])
                    break
                except Exception as e:
                    if '429' in str(e) and attempt < 3:
                        wait = 30 * (attempt + 1)
                        print(f"  [{label}] rate limit, sleeping {wait}s...")
                        time.sleep(wait)
                    else:
                        raise
            time.sleep(1.2)
        rows = data_cache[cache_key]
        if label == "rebecca_lenh":
            h, leave, nrows = day_hours_lenh_rebecca(rows)
        else:
            h, leave, nrows = day_hours(rows, dev)
        print(f"{label:15s} | {dev:8s} | {ws:4s} | {h:5.2f}h | leave={leave or '-'} | rows={nrows}")
        results.append({'label': label, 'dev': dev, 'ws': ws, 'hours': h, 'leave': leave, 'rows': nrows})
    except Exception as e:
        print(f"{label:15s} | {dev:8s} | ERROR: {str(e)[:200]}")
        results.append({'label': label, 'dev': dev, 'ws': ws, 'error': str(e)[:200]})
        time.sleep(2)

# Aggregate per dev
print("\n--- Aggregate per dev (Mon 04/05) ---")
devs = {}
for r in results:
    key = r['dev']
    devs.setdefault(key, {'hours': 0.0, 'leave': '', 'sheets': []})
    if 'error' in r:
        devs[key]['sheets'].append(f"{r['label']}:ERR")
        continue
    devs[key]['hours'] += r['hours']
    if r['leave'] == 'full_day_off':
        devs[key]['leave'] = 'full_day_off'
    elif r['leave'] == 'half_day' and devs[key]['leave'] != 'full_day_off':
        devs[key]['leave'] = 'half_day'
    devs[key]['sheets'].append(f"{r['label']}:{r['hours']:.2f}h")

for dev, d in sorted(devs.items()):
    print(f"  {dev:10s} | {d['hours']:5.2f}h | leave={d['leave'] or '-'} | {' '.join(d['sheets'])}")

with open('/tmp/sheets_mon_may4.json', 'w') as f:
    json.dump({'per_sheet': results, 'per_dev': devs}, f, indent=2, default=str)
print("\nSaved /tmp/sheets_mon_may4.json")
