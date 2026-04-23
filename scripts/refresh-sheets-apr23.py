#!/usr/bin/env python3
"""Sheets refresh — Thu 23/04/2026 progress at 14:42.
Also revisit Wed 22/04 LeNH-Aysar (pending since morning).
"""
import time, json, sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

# (label, sheet_id, dev, worksheet)
SHEETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W3"),
    ("james_long",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "LongVV",  "W22"),
    ("james_phuc",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  "W22"),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W37"),
    ("paturevision",  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "VietPH",  "W24"),
    ("pv_tuan",       "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "TuanNT",  "W24"),
    ("john_yi",       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",  "TuanNT",  "W20"),
    ("rebecca_tuan",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "TuanNT",  "W21"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",  "LeNH",    "W8"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",  "LeNH",    "W21"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",  "LeNH",    "W21"),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "LeNH",    "W21"),
]


def day_hours(rows, dev, day_prefix, day_toks):
    """Sum 'Task dự án' rows for dev on the given day (cols A/G/H)."""
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
                if owner == dev or owner == "":
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
    """LeNH in Rebecca sheet: cols Q-T (16-19)."""
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


def run_for_day(day_prefix, day_toks, label):
    print(f"\n====== {label} ({day_prefix}, {day_toks}) ======\n")
    cache = {}
    results = []
    for lbl, sid, dev, ws in SHEETS:
        cache_key = (sid, ws)
        try:
            if cache_key not in cache:
                res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T500").execute()
                cache[cache_key] = res.get('values', [])
                time.sleep(0.4)
            rows = cache[cache_key]
            if lbl == "rebecca_lenh":
                h, leave, nrows = day_hours_lenh_rebecca(rows, day_prefix, day_toks)
            else:
                h, leave, nrows = day_hours(rows, dev, day_prefix, day_toks)
            print(f"{lbl:15s} | {dev:8s} | {ws:4s} | {h:5.2f}h | leave={leave or '-'} | rows={nrows}")
            results.append({'label': lbl, 'dev': dev, 'ws': ws, 'hours': h, 'leave': leave, 'rows': nrows})
        except Exception as e:
            print(f"{lbl:15s} | {dev:8s} | ERROR: {str(e)[:200]}")
            results.append({'label': lbl, 'dev': dev, 'ws': ws, 'error': str(e)[:200]})
            time.sleep(1.0)

    # Aggregate per dev
    print(f"\n  -- Aggregate --")
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

    print(f"  {'Dev':10s} | {'Total(h)':8s} | Breakdown")
    for dev, d in sorted(devs.items()):
        print(f"  {dev:10s} | {d['hours']:8.2f} | leave={d['leave'] or '-'} | {' '.join(d['sheets'])}")
    return {'per_sheet': results, 'per_dev': {k: v for k,v in devs.items()}}


out = {}
# Thursday 23/04 — refresh focus
out['thu_23_04'] = run_for_day('Thu', ['23/04', '23/4'], 'Thursday 23/04 progress at 14:42')

# Wed 22/04 — re-check LeNH Aysar for backfill
out['wed_22_04'] = run_for_day('Wed', ['22/04', '22/4'], 'Wed 22/04 backfill check')

with open('/tmp/refresh_sheets_apr23.json', 'w') as f:
    json.dump(out, f, indent=2, default=str)
print("\nJSON saved to /tmp/refresh_sheets_apr23.json")
