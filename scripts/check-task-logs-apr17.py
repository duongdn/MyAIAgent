#!/usr/bin/env python3
"""Refresh: check Fri 2026-04-17 task log hours + W-current totals per dev.
YAGNI: one-shot for daily-report-refresh at 16:48 +07:00."""
import time, sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

# (name, sheet_id, dev_name, current_W_sheet)
#  W-sheet determined by probe: Mon 13/04/26 present in A1:D6
checks = [
    ("maddy",        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W2"),
    ("james_diamond","1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  "W21"),
    ("generator",    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W36"),
    ("paturevision", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH",  "W23"),
    ("rory",         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",    "W7"),
    ("franc",        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",    "W20"),
    ("aysar",        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",    "W20"),
    ("john_yi",      "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT",  "W19"),
    ("rebecca_tuan", "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT",  "W20"),
    ("rebecca_lenh", "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "LeNH",    "W20"),
]

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,')
TODAY_TOK = ['17/04', '17/4']

def day_hours(rows, target_day_tokens, target_day_prefix, dev):
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        if not in_day and target_day_prefix in cell_a and any(t in cell_a for t in target_day_tokens):
            in_day = True
            continue
        if in_day and cell_a and any(cell_a.startswith(d) for d in DAY_MARK):
            break
        if in_day:
            row_str = ' | '.join(row)
            if "Nghỉ cả ngày" in row_str:
                leave = "full_day_off"
            elif "Nghỉ nửa ngày" in row_str and leave != "full_day_off":
                leave = "half_day"
            if cell_a == "Task dự án":
                owner = row[6].strip() if len(row) > 6 else ""
                hstr = row[7].strip() if len(row) > 7 else "0"
                if owner == dev:
                    try:
                        hours += float(hstr.replace(',', '.'))
                        rows_found += 1
                    except:
                        pass
    return hours, leave, rows_found


def week_sum(rows, dev):
    """Sum all 'Task dự án' rows for dev across the sheet (the whole week)."""
    total = 0.0
    for row in rows:
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        if cell_a == "Task dự án":
            owner = row[6].strip() if len(row) > 6 else ""
            hstr = row[7].strip() if len(row) > 7 else "0"
            if owner == dev:
                try:
                    total += float(hstr.replace(',', '.'))
                except:
                    pass
    return total


print(f"=== Task log refresh — Fri 17/04/2026 ===\n")

results = []
for name, sid, dev, ws in checks:
    try:
        res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:K500").execute()
        rows = res.get('values', [])
        fri_h, leave, nrows = day_hours(rows, TODAY_TOK, 'Fri', dev)
        wk_h = week_sum(rows, dev)
        results.append({
            'name': name, 'dev': dev, 'ws': ws,
            'fri': fri_h, 'leave': leave, 'fri_rows': nrows,
            'week_total': wk_h,
        })
        if leave == "full_day_off":
            status = "OFF (full day)"
        elif leave == "half_day" and fri_h >= 4:
            status = "OK (half-day)"
        elif fri_h >= 8:
            status = "OK"
        elif fri_h > 0:
            status = "LOW"
        else:
            status = "ZERO"
        print(f"{name:15s} | {dev:8s} | {ws:4s} | Fri: {fri_h:5.2f}h rows={nrows} | wk={wk_h:5.2f}h | leave={leave or '-':12s} | {status}")
        time.sleep(0.5)  # Rate-limit safety
    except Exception as e:
        print(f"{name:15s} | {dev:8s} | ERROR: {str(e)[:140]}")
        time.sleep(1.0)

print("\n=== Aggregate totals ===\n")

# Aggregate per dev
devs = {}
for r in results:
    key = r['dev']
    devs.setdefault(key, {'fri': 0.0, 'week': 0.0, 'leave_any': False, 'leave_all': True, 'sheets': []})
    devs[key]['fri'] += r['fri']
    devs[key]['week'] += r['week_total']
    devs[key]['sheets'].append(f"{r['name']}({r['fri']:.1f}h/{r['week_total']:.1f}h {r['leave'] or '-'})")
    if r['leave'] == 'full_day_off':
        devs[key]['leave_any'] = True
    else:
        devs[key]['leave_all'] = False

for dev, d in devs.items():
    print(f"{dev:8s} | Fri total: {d['fri']:5.2f}h | W-total: {d['week']:6.2f}h | leave_any={d['leave_any']} | {' '.join(d['sheets'])}")
