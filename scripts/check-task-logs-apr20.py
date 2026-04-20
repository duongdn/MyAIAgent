#!/usr/bin/env python3
"""Piece 4: Fri 17/04 + Mon 20/04 task log hours per dev + weekly totals.

Week of Mon 20/04/26 is the start of a new week (likely W-current).
Fri 17/04 is the last day of PREVIOUS week.

For Monday-morning report, Mon hours are expected to be low/0 (EOD logging).
Focus on Fri hours (alert if 0 without leave)."""
import time, sys, json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

# (name, sheet_id, dev_name, prev_W_sheet [Fri 17 is in], cur_W_sheet [Mon 20 is in])
# PrevW was determined by check-task-logs-apr17.py previous runs.
# Mon 20 is likely next W (W+1).
checks = [
    ("maddy",        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W2",  "W3"),
    ("james_diamond","1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  "W21", "W22"),
    ("generator",    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W36", "W37"),
    ("paturevision", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH",  "W23", "W24"),
    ("rory",         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",    "W7",  "W8"),
    ("franc",        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",    "W20", "W21"),
    ("aysar",        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",    "W20", "W21"),
    ("john_yi",      "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT",  "W19", "W20"),
    ("rebecca_tuan", "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT",  "W20", "W21"),
    ("rebecca_lenh_QT", "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "LeNH",  "W20", "W21"),
]

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')


def day_hours(rows, day_prefix, day_tok_list, dev, col_offset=0):
    """Find day section starting with `day_prefix` (e.g. 'Fri') where col A contains one of day_tok_list.
    Sum 'Task dự án' rows owner==dev. col_offset shifts all column refs (0=A-K; 16=Q-AA for Rebecca-LeNH)."""
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        # Pad row to safe length
        if len(row) <= col_offset:
            continue
        cell_a = row[col_offset].strip() if row[col_offset] else ""
        if not in_day:
            if cell_a.startswith(day_prefix + ',') and any(t in cell_a for t in day_tok_list):
                in_day = True
                continue
        else:
            # Detect next day
            if cell_a and any(cell_a.startswith(d) for d in DAY_MARK):
                break
            row_str = ' | '.join(row)
            if "Nghỉ cả ngày" in row_str:
                leave = "full_day_off"
            elif "Nghỉ nửa ngày" in row_str and leave != "full_day_off":
                leave = "half_day"
            if cell_a == "Task dự án":
                owner_idx = col_offset + 6
                hour_idx = col_offset + 7
                owner = row[owner_idx].strip() if len(row) > owner_idx else ""
                hstr = row[hour_idx].strip() if len(row) > hour_idx else "0"
                if owner == dev:
                    try:
                        hours += float(hstr.replace(',', '.'))
                        rows_found += 1
                    except:
                        pass
    return hours, leave, rows_found


def week_sum(rows, dev, col_offset=0):
    """Sum all 'Task dự án' rows for dev across the whole sheet."""
    total = 0.0
    for row in rows:
        if len(row) <= col_offset:
            continue
        cell_a = row[col_offset].strip() if row[col_offset] else ""
        if cell_a == "Task dự án":
            owner_idx = col_offset + 6
            hour_idx = col_offset + 7
            owner = row[owner_idx].strip() if len(row) > owner_idx else ""
            hstr = row[hour_idx].strip() if len(row) > hour_idx else "0"
            if owner == dev:
                try:
                    total += float(hstr.replace(',', '.'))
                except:
                    pass
    return total


FRI_TOK = ['17/04', '17/4']
MON_TOK = ['20/04', '20/4']

print(f"=== Task log check — Fri 17/04 + Mon 20/04/2026 ===\n")

results = []
for name, sid, dev, ws_prev, ws_cur in checks:
    col_off = 16 if name == "rebecca_lenh_QT" else 0  # Q=index 16
    rng_suffix = "!A1:AA500" if col_off else "!A1:K500"
    try:
        # Fri from prev W-sheet
        res_prev = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws_prev}'{rng_suffix}").execute()
        rows_prev = res_prev.get('values', [])
        fri_h, fri_leave, fri_nrows = day_hours(rows_prev, 'Fri', FRI_TOK, dev, col_off)
        prev_week_total = week_sum(rows_prev, dev, col_off)
        time.sleep(0.6)

        # Mon from current W-sheet (try)
        mon_h, mon_leave, mon_nrows = 0.0, "", 0
        cur_week_total = 0.0
        cur_err = ""
        try:
            res_cur = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws_cur}'{rng_suffix}").execute()
            rows_cur = res_cur.get('values', [])
            mon_h, mon_leave, mon_nrows = day_hours(rows_cur, 'Mon', MON_TOK, dev, col_off)
            cur_week_total = week_sum(rows_cur, dev, col_off)
        except Exception as e:
            cur_err = str(e)[:100]
        time.sleep(0.6)

        results.append({
            'name': name, 'dev': dev, 'ws_prev': ws_prev, 'ws_cur': ws_cur,
            'fri': fri_h, 'fri_leave': fri_leave, 'fri_rows': fri_nrows,
            'prev_week_total': prev_week_total,
            'mon': mon_h, 'mon_leave': mon_leave, 'mon_rows': mon_nrows,
            'cur_week_total': cur_week_total,
            'cur_err': cur_err,
        })
        def status(h, leave):
            if leave == "full_day_off": return "OFF"
            if leave == "half_day" and h >= 4: return "OK(half)"
            if h >= 8: return "OK"
            if h >= 4: return "LOW"
            if h > 0: return "VLOW"
            return "ZERO"
        print(f"{name:18s} | {dev:8s} | Fri({ws_prev}): {fri_h:5.2f}h {status(fri_h, fri_leave):8s} leave={fri_leave or '-':12s} | Mon({ws_cur}): {mon_h:5.2f}h {status(mon_h, mon_leave):8s} | prev_wk={prev_week_total:5.2f}h cur_wk={cur_week_total:5.2f}h {('ERR:'+cur_err) if cur_err else ''}")
    except Exception as e:
        print(f"{name:18s} | {dev:8s} | ERROR: {str(e)[:180]}")
        results.append({'name': name, 'dev': dev, 'error': str(e)[:180]})
        time.sleep(1.0)

print("\n=== Aggregate per-dev ===\n")

devs = {}
for r in results:
    if 'error' in r: continue
    key = r['dev']
    devs.setdefault(key, {'fri': 0.0, 'mon': 0.0, 'prev_wk': 0.0, 'cur_wk': 0.0,
                         'fri_leave_any': False, 'mon_leave_any': False, 'sheets': []})
    devs[key]['fri'] += r['fri']
    devs[key]['mon'] += r['mon']
    devs[key]['prev_wk'] += r['prev_week_total']
    devs[key]['cur_wk'] += r['cur_week_total']
    if r['fri_leave'] == 'full_day_off':
        devs[key]['fri_leave_any'] = True
    if r['mon_leave'] == 'full_day_off':
        devs[key]['mon_leave_any'] = True
    devs[key]['sheets'].append(f"{r['name']}(Fri:{r['fri']:.1f}/Mon:{r['mon']:.1f})")

for dev, d in sorted(devs.items()):
    print(f"{dev:8s} | Fri={d['fri']:5.2f}h fri_leave={d['fri_leave_any']} | Mon={d['mon']:5.2f}h mon_leave={d['mon_leave_any']} | prev_wk={d['prev_wk']:6.2f}h cur_wk={d['cur_wk']:6.2f}h | {' '.join(d['sheets'])}")

# Export JSON for easy parsing
with open('/tmp/piece4_tasklog_20.json', 'w') as f:
    json.dump({'per_sheet': results, 'per_dev': devs}, f, indent=2, default=str)
print("\nJSON saved to /tmp/piece4_tasklog_20.json")
