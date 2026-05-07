#!/usr/bin/env python3
"""Sheets check — Tue 05/05/2026 (yesterday) + Wed 06/05 partial.

Direct verification approach: dump rows under each day header, sum 'Task dự án' rows
filtered by Owner col G == target dev.
"""
import time, json, sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

# Two days to check: Tue 05/05 (full check) + Wed 06/05 (partial — early morning, 0h OK)
DAYS = [
    ('Tue', ['05/05'], 'Tue 05/05'),
    ('Wed', ['06/05'], 'Wed 06/05'),
]

# (label, sheet_id, dev, ws). Same week tabs as Mon 04/05 (same week).
SHEETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV",  "W5"),
    ("james_long",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "LongVV",  "W24"),
    ("james_phuc",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT",  "W24"),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W39"),
    ("paturevision_v","1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH",  "W26"),
    ("paturevision_t","1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "TuanNT",  "W26"),
    ("john_yi",       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT",  "W22"),
    ("rebecca_tuan",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT",  "W23"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",    "W10"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",    "W23"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",    "W23"),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "LeNH",    "W23"),
]


def to_float(s):
    if s is None or s == '':
        return 0.0
    try:
        return float(str(s).replace(',', '.'))
    except Exception:
        return 0.0


def parse_day(rows, dev, day_prefix, day_toks, dump_rows=False):
    """Find the day header (e.g., 'Tue, 05/05/26') and sum Task dự án rows
    where col G == dev. Returns (hours, leave, n_task_rows, dump)."""
    in_day = False
    hours = 0.0
    n_rows = 0
    leave = ""
    dump = []
    for idx, row in enumerate(rows):
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
            h_cell = (row[7].strip() if len(row) > 7 else "")
            if dump_rows:
                dump.append({'r': idx + 1, 'A': cell_a[:25], 'G': owner, 'H': h_cell})
            if cell_a == "Nghỉ cả ngày" and (owner == dev or owner == ""):
                leave = "full_day_off"
            elif cell_a == "Nghỉ nửa ngày" and owner == dev and leave != "full_day_off":
                leave = "half_day"
            if cell_a == "Task dự án" and owner == dev:
                hours += to_float(h_cell)
                n_rows += 1
    return hours, leave, n_rows, dump


def parse_day_lenh_rebecca(rows, day_prefix, day_toks, dump_rows=False):
    """LeNH on Rebecca sheet uses cols Q/S/T (16/18/19)."""
    in_day = False
    hours = 0.0
    n_rows = 0
    leave = ""
    dump = []
    for idx, row in enumerate(rows):
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
            cell_t = (row[19].strip() if len(row) > 19 else "")
            if dump_rows:
                dump.append({'r': idx + 1, 'Q': cell_q[:25], 'S': cell_s, 'T': cell_t})
            if cell_q == "Task dự án" and cell_s == "LeNH":
                hours += to_float(cell_t)
                n_rows += 1
            if cell_q == "Nghỉ cả ngày" and (cell_s == "LeNH" or cell_s == ""):
                leave = "full_day_off"
            elif cell_q == "Nghỉ nửa ngày" and cell_s == "LeNH" and leave != "full_day_off":
                leave = "half_day"
    return hours, leave, n_rows, dump


# Cache range across calls
data_cache = {}
results = {day_label: [] for _, _, day_label in DAYS}

print(f"=== Sheets check Tue 05/05 + Wed 06/05 (partial) ===\n")

for label, sid, dev, ws in SHEETS:
    cache_key = (sid, ws, 'AT')
    rows = None
    if cache_key in data_cache:
        rows = data_cache[cache_key]
    else:
        for attempt in range(4):
            try:
                rng = f"'{ws}'!A1:T800"
                res = sheets_api.values().get(spreadsheetId=sid, range=rng).execute()
                rows = res.get('values', [])
                data_cache[cache_key] = rows
                break
            except Exception as e:
                if '429' in str(e) and attempt < 3:
                    wait = 30 * (attempt + 1)
                    print(f"  [{label}] rate limit, sleeping {wait}s...")
                    time.sleep(wait)
                else:
                    print(f"  [{label}] ERROR: {str(e)[:200]}")
                    rows = None
                    break
        time.sleep(1.0)
    if rows is None:
        for _, _, day_label in DAYS:
            results[day_label].append({'label': label, 'dev': dev, 'ws': ws, 'error': 'fetch_failed'})
        continue
    for day_prefix, day_toks, day_label in DAYS:
        if label == "rebecca_lenh":
            h, leave, n, dump = parse_day_lenh_rebecca(rows, day_prefix, day_toks)
        else:
            h, leave, n, dump = parse_day(rows, dev, day_prefix, day_toks)
        results[day_label].append({'label': label, 'dev': dev, 'ws': ws, 'hours': h, 'leave': leave, 'rows': n})
        print(f"{day_label:11s} | {label:15s} | {dev:8s} | {ws:4s} | {h:5.2f}h | leave={leave or '-':12s} | rows={n}")

# Aggregate per dev per day
print("\n--- Aggregate per dev ---")
agg = {}  # day_label -> dev -> {hours, leave, sheets}
for day_label in [d[2] for d in DAYS]:
    agg[day_label] = {}
    for r in results[day_label]:
        key = r['dev']
        agg[day_label].setdefault(key, {'hours': 0.0, 'leave': '', 'sheets': []})
        if 'error' in r:
            agg[day_label][key]['sheets'].append(f"{r['label']}:ERR")
            continue
        agg[day_label][key]['hours'] += r['hours']
        if r['leave'] == 'full_day_off':
            agg[day_label][key]['leave'] = 'full_day_off'
        elif r['leave'] == 'half_day' and agg[day_label][key]['leave'] != 'full_day_off':
            agg[day_label][key]['leave'] = 'half_day'
        agg[day_label][key]['sheets'].append(f"{r['label']}={r['hours']:.2f}h" + (f"({r['leave']})" if r['leave'] else ''))
    print(f"\n{day_label}:")
    for dev, d in sorted(agg[day_label].items()):
        print(f"  {dev:10s} | {d['hours']:5.2f}h | leave={d['leave'] or '-'} | {' '.join(d['sheets'])}")

# Verify: re-dump rows under day header for any dev with 0h on Tue 05/05 (no leave)
print("\n--- VERIFY: Re-dump for any dev with 0h on Tue 05/05 (no leave) ---")
verify_log = []
for r in results['Tue 05/05']:
    if 'error' in r:
        continue
    if r['hours'] == 0.0 and r['leave'] != 'full_day_off':
        # Re-fetch and dump
        cache_key = (r['ws'].split('|')[0] if False else None, 'reverify')
        sid_for = next((sid for (lab, sid, dev, ws) in SHEETS if lab == r['label']), None)
        if not sid_for:
            continue
        try:
            res = sheets_api.values().get(spreadsheetId=sid_for, range=f"'{r['ws']}'!A1:T800").execute()
            rows2 = res.get('values', [])
        except Exception as e:
            verify_log.append(f"{r['label']}/{r['dev']}: refetch failed: {e}")
            continue
        if r['label'] == "rebecca_lenh":
            _, _, _, dump = parse_day_lenh_rebecca(rows2, 'Tue', ['05/05'], dump_rows=True)
            print(f"\n[VERIFY] {r['label']} ({r['dev']}) Tue 05/05 — LeNH-Rebecca block (Q/S/T):")
        else:
            _, _, _, dump = parse_day(rows2, r['dev'], 'Tue', ['05/05'], dump_rows=True)
            print(f"\n[VERIFY] {r['label']} ({r['dev']}) Tue 05/05 — A/G/H rows:")
        for d in dump[:30]:
            print(f"    {d}")
        verify_log.append({'label': r['label'], 'dev': r['dev'], 'ws': r['ws'], 'dump_count': len(dump)})
        time.sleep(0.5)

# Save JSON
out = {
    'per_sheet': {dl: results[dl] for _, _, dl in DAYS},
    'per_dev': agg,
    'verify_log': verify_log,
}
with open('/tmp/sheets_tue_may5.json', 'w') as f:
    json.dump(out, f, indent=2, default=str)
print("\nSaved /tmp/sheets_tue_may5.json")
