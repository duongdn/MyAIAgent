#!/usr/bin/env python3
"""Task log check for Tue 21/04 and Wed 22/04/2026.
W-sheet mapping verified: maddy=W3, james=W22, gen=W37, pv=W24, rory=W8, franc=W21, aysar=W21, john_yi=W20, rebecca=W21
"""
import time, json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

# (label, sheet_id, dev_name, ws)
# W-sheet mappings verified by debug-sheets-apr22.py
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

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

# Days to scan: (prefix, toks, label)
DAYS = [
    ('Tue', ['21/04', '21/4'], 'Tue 21/04'),
    ('Wed', ['22/04', '22/4'], 'Wed 22/04'),
]

# Week days Mon-Fri for weekly total (all days in W-sheet week)
WEEK_DAYS = [
    ('Mon', ['14/04', '14/4']),
    ('Tue', ['15/04', '15/4']),
    ('Wed', ['16/04', '16/4']),
    ('Thu', ['17/04', '17/4']),
    ('Fri', ['18/04', '18/4']),
    ('Mon', ['21/04', '21/4']),
    ('Tue', ['22/04', '22/4']),
]
# Actually W-week starts on Mon 21/04 based on the W3/W22/etc sheets
# Let's figure out from the data; check the whole W-sheet for all "Task dự án" rows for dev


def day_hours(rows, dev, day_prefix, day_toks):
    """Sum 'Task dự án' rows for dev on the given day.
    Filter by col G (index 6) == dev, hours in col H (index 7)."""
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
            if cell_a == "Nghỉ cả ngày" and owner == dev:
                leave = "full_day_off"
            elif cell_a == "Nghỉ nửa ngày" and owner == dev and leave != "full_day_off":
                leave = "half_day"
            if cell_a == "Task dự án" and owner == dev:
                hstr = (row[7].strip() if len(row) > 7 else "0")
                try:
                    hours += float(hstr.replace(',', '.'))
                    rows_found += 1
                except:
                    pass
    return hours, leave, rows_found


def day_hours_lenh_rebecca(rows, day_prefix, day_toks):
    """LeNH in Rebecca sheet: cols Q-T (indices 16-19).
    Col Q (16) = task type, Col S (18) = owner, Col T (19) = hours."""
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
            if cell_q == "Nghỉ cả ngày" and cell_s == "LeNH":
                leave = "full_day_off"
            elif cell_q == "Nghỉ nửa ngày" and cell_s == "LeNH" and leave != "full_day_off":
                leave = "half_day"
    return hours, leave, rows_found


def all_dev_hours(rows, dev):
    """Sum all 'Task dự án' rows for dev across the entire sheet (weekly total)."""
    total = 0.0
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "")
        if cell_a == "Task dự án":
            owner = (row[6].strip() if len(row) > 6 else "")
            if owner == dev:
                hstr = (row[7].strip() if len(row) > 7 else "0")
                try:
                    total += float(hstr.replace(',', '.'))
                except:
                    pass
    return total


def all_lenh_rebecca_hours(rows):
    """Sum all LeNH 'Task dự án' hours from Rebecca sheet cols Q-T."""
    total = 0.0
    for row in rows:
        if not row:
            continue
        cell_q = (row[16].strip() if len(row) > 16 else "")
        cell_s = (row[18].strip() if len(row) > 18 else "")
        cell_t = (row[19].strip() if len(row) > 19 else "0")
        if cell_q == "Task dự án" and cell_s == "LeNH":
            try:
                total += float(cell_t.replace(',', '.'))
            except:
                pass
    return total


print("=== Fetching Google Sheets data... ===\n")

# Cache rows per (sid, ws)
cache = {}

# Collect per-day, per-sheet results
# results[label][day_label] = {hours, leave, rows}
sheet_data = {}

for label, sid, dev, ws in SHEETS:
    cache_key = (sid, ws)
    print(f"  Loading {label} ({ws})...", end=" ", flush=True)
    try:
        if cache_key not in cache:
            res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T600").execute()
            cache[cache_key] = res.get('values', [])
            time.sleep(0.4)
        rows = cache[cache_key]
        print(f"OK ({len(rows)} rows)")
    except Exception as e:
        print(f"ERROR: {e}")
        cache[cache_key] = []
    sheet_data[label] = {'sid': sid, 'dev': dev, 'ws': ws, 'rows': cache.get(cache_key, [])}

print()

# Per-day aggregation: {dev: {day_label: {hours, leave}}}
dev_days = {}  # dev -> day_label -> {hours, leave}
dev_weekly = {}  # dev -> weekly hours

# Process each sheet
for label, sid, dev, ws in SHEETS:
    rows = sheet_data[label]['rows']
    if not rows:
        continue

    for day_prefix, day_toks, day_label in DAYS:
        if label == "rebecca_lenh":
            h, leave, nrows = day_hours_lenh_rebecca(rows, day_prefix, day_toks)
        else:
            h, leave, nrows = day_hours(rows, dev, day_prefix, day_toks)

        if dev not in dev_days:
            dev_days[dev] = {}
        if day_label not in dev_days[dev]:
            dev_days[dev][day_label] = {'hours': 0.0, 'leave': ''}
        dev_days[dev][day_label]['hours'] += h
        if leave == 'full_day_off':
            dev_days[dev][day_label]['leave'] = 'full_day_off'
        elif leave == 'half_day' and dev_days[dev][day_label]['leave'] != 'full_day_off':
            dev_days[dev][day_label]['leave'] = 'half_day'

    # Weekly total
    if label == "rebecca_lenh":
        wh = all_lenh_rebecca_hours(rows)
    else:
        wh = all_dev_hours(rows, dev)
    dev_weekly[dev] = dev_weekly.get(dev, 0.0) + wh

# Format output
def fmt_day(h, leave):
    if leave == 'full_day_off':
        return "OFF"
    if leave == 'half_day':
        if h >= 4:
            return f"{h:.1f}h (half)"
        return f"{h:.1f}h LOW(half)"
    if h >= 8:
        return f"{h:.1f}h"
    if h > 0:
        return f"{h:.1f}h LOW"
    return "0h"

def status_icon(h, leave, day_label):
    """Return status icon. Wed 22 at 08:45 — 0h is expected (early morning)."""
    if leave == 'full_day_off':
        return "OFF"
    if leave == 'half_day':
        return "OK(half)" if h >= 4 else "WARN"
    if 'Wed 22' in day_label:
        # Early morning, 0h is OK
        if h == 0:
            return "(early)"
        return "OK" if h >= 4 else "WARN"
    # Tue 21 — full day should have been filed
    if h >= 8:
        return "OK"
    if h > 0:
        return "LOW"
    return "ALERT"

# Weekly targets
# LongVV: 16h/wk (Mon-Fri Maddy), PhucVT: 8h/day (40h/wk), TuanNT: multi-client
# Week runs Mon 21/04 to Fri 25/04 (this is week W3/W22/W37...)
# Actually from context, these W-sheets cover the current week
# Working days this week so far: Mon 21/04, Tue 21/04... wait, Mon=21/04? Let me check
# 2026-04-21 = Tuesday actually. So Mon=20/04, Tue=21/04, Wed=22/04
# Weekly targets per dev
WEEKLY_TARGETS = {
    'LongVV':  16,   # 16h/wk Maddy contract
    'PhucVT':  40,   # 8h/day * 5 days
    'TuanNT':  40,   # 8h/day
    'VietPH':  40,
    'KhanhHH': 40,
    'LeNH':    40,
}

DEV_ORDER = ['LongVV', 'PhucVT', 'TuanNT', 'VietPH', 'KhanhHH', 'LeNH']
DAY_LABELS = ['Tue 21/04', 'Wed 22/04']

print("=" * 90)
print(f"{'Developer':<10} | {'Tue 21/04':^20} | {'Wed 22/04':^20} | {'Weekly(W)':^12} | Status")
print("-" * 90)

summary = {}
for dev in DEV_ORDER:
    days_data = dev_days.get(dev, {})
    weekly_h = dev_weekly.get(dev, 0.0)
    target = WEEKLY_TARGETS.get(dev, 40)

    row = {'dev': dev, 'days': {}, 'weekly': weekly_h, 'target': target}
    cols = []
    overall_status = "OK"

    for day_label in DAY_LABELS:
        dd = days_data.get(day_label, {'hours': 0.0, 'leave': ''})
        h = dd['hours']
        leave = dd['leave']
        icon = status_icon(h, leave, day_label)
        txt = fmt_day(h, leave)
        cols.append(f"{txt} {icon}")
        row['days'][day_label] = {'hours': h, 'leave': leave, 'icon': icon}
        if icon in ('ALERT', 'LOW', 'WARN'):
            if overall_status not in ('ALERT',):
                overall_status = icon

    # Weekly pace: assume 5 working days, Mon-Fri; we're on Wed morning
    # Days elapsed: Mon, Tue (2 full days), Wed partial
    pace_target_so_far = target * 2 / 5  # 2 days done
    if dev == 'LongVV':
        pace_target_so_far = target * 2 / 5  # part-time, 16h/wk = 3.2h/day

    weekly_str = f"{weekly_h:.1f}h/{target}h"
    if weekly_h >= pace_target_so_far:
        pace_icon = "on-pace"
    else:
        pace_icon = f"behind({pace_target_so_far:.0f}h exp)"

    print(f"{dev:<10} | {cols[0]:^20} | {cols[1]:^20} | {weekly_str:^12} | {overall_status} ({pace_icon})")
    summary[dev] = row

print("=" * 90)

# Detailed breakdown for context
print("\n--- Detail breakdown ---")
for label, sid, dev, ws in SHEETS:
    rows = sheet_data[label]['rows']
    for day_prefix, day_toks, day_label in DAYS:
        if label == "rebecca_lenh":
            h, leave, nrows = day_hours_lenh_rebecca(rows, day_prefix, day_toks)
        else:
            h, leave, nrows = day_hours(rows, dev, day_prefix, day_toks)
        if h > 0 or leave:
            print(f"  {label:20s} | {dev:8s} | {day_label} | {h:.2f}h | leave={leave or '-'} | rows={nrows}")

# Save JSON
out = {
    'checked_at': '2026-04-22 08:45 +07:00',
    'per_dev': {dev: {
        'days': summary[dev]['days'],
        'weekly': summary[dev]['weekly'],
        'target': summary[dev]['target']
    } for dev in DEV_ORDER if dev in summary}
}
with open('/tmp/tasklog_apr21_22.json', 'w') as f:
    json.dump(out, f, indent=2, default=str)
print("\nJSON saved to /tmp/tasklog_apr21_22.json")
