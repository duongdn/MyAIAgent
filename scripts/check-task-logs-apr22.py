#!/usr/bin/env python3
"""Task log check for Wednesday 22/04/2026.

Checks today's (Wed 22/04) hours for all developers.
Auto-discovers the correct W-sheet for each spreadsheet.
"""
import time, sys, json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

TODAY_DATE = '2026-04-22'
TODAY_DAY = 'Wed'
TODAY_TOKS = ['22/04', '22/4']

# (label, sheet_id, dev_name)
# For Rebecca sheet: TuanNT is cols A-P (owner col G), LeNH is cols Q-T (different structure)
SHEETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV"),
    ("james_diamond", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT"),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUGYaY0ooYSdHkeEM", "KhanhHH"),
    ("paturevision",  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "VietPH"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",  "LeNH"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",  "LeNH"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",  "LeNH"),
    ("john_yi",       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",  "TuanNT"),
    ("rebecca_tuan",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "TuanNT"),
    ("bailey_tuan",   "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "TuanNT"),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "LeNH"),
]

DAY_MARK = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')


def find_latest_wsheet(sid):
    """Find the most recent W-sheet containing today's date or the latest one."""
    try:
        meta = sheets_api.get(spreadsheetId=sid, fields='sheets.properties.title').execute()
        all_sheets = [s['properties']['title'] for s in meta['sheets']]
        w_sheets = sorted(
            [s for s in all_sheets if s.startswith('W') and s[1:].isdigit()],
            key=lambda x: int(x[1:])
        )
        if not w_sheets:
            return None, all_sheets
        # Try last few W-sheets to find one with today's date
        for ws in reversed(w_sheets[-5:]):
            try:
                r = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:A50").execute()
                vals = r.get('values', [])
                flat = ' '.join(str(v[0]) for v in vals if v)
                if any(t in flat for t in TODAY_TOKS):
                    return ws, w_sheets
                time.sleep(0.3)
            except:
                pass
        # Fall back to latest W-sheet
        return w_sheets[-1], w_sheets
    except Exception as e:
        return None, []


def day_hours(rows, dev, day_prefix, day_toks):
    """Sum 'Task dự án' rows for dev on the given day."""
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "") if row else ""
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
    """LeNH uses cols Q-T in the Rebecca sheet (cols 16-19, 0-indexed).
    Col Q = row type, col R = ?, col S = owner, col T = hours (approx).
    Actually look for LeNH owner in col S (index 18) and hours in col T (index 19).
    Try different column offsets since Rebecca sheet has LeNH in right side.
    """
    # Rebecca sheet: LeNH tracked in cols Q-T (indices 16-19)
    # Col Q (16): task type like "Task dự án"
    # Col R (17): task description
    # Col S (18): owner
    # Col T (19): hours
    in_day = False
    hours = 0.0
    rows_found = 0
    leave = ""
    for row in rows:
        if not row:
            continue
        cell_a = (row[0].strip() if row[0] else "") if row else ""
        if not in_day:
            if cell_a.startswith(day_prefix + ',') and any(t in cell_a for t in day_toks):
                in_day = True
                continue
        else:
            if cell_a and any(cell_a.startswith(d) for d in DAY_MARK):
                break
            # Check col Q (index 16) for task type
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

results = []
for label, sid, dev in SHEETS:
    try:
        ws, all_ws = find_latest_wsheet(sid)
        time.sleep(0.5)
        if ws is None:
            print(f"{label:20s} | {dev:8s} | ERROR: no W-sheet found. Available: {all_ws[:5]}")
            results.append({'label': label, 'dev': dev, 'error': 'no W-sheet'})
            continue

        res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T500").execute()
        rows = res.get('values', [])
        time.sleep(0.5)

        if label == "rebecca_lenh":
            h, leave, nrows = day_hours_lenh_rebecca(rows, TODAY_DAY, TODAY_TOKS)
        else:
            h, leave, nrows = day_hours(rows, dev, TODAY_DAY, TODAY_TOKS)

        def status(h, leave):
            if leave == "full_day_off": return "OFF"
            if leave == "half_day" and h >= 4: return "OK(half)"
            if h >= 8: return "OK"
            if h >= 4: return "LOW"
            if h > 0: return "VLOW"
            return "ZERO"

        s = status(h, leave)
        print(f"{label:20s} | {dev:8s} | {ws:4s} | {h:5.2f}h | {s:8s} | leave={leave or '-'} | rows={nrows}")
        results.append({'label': label, 'dev': dev, 'ws': ws, 'hours': h, 'leave': leave, 'rows': nrows, 'status': s})
    except Exception as e:
        print(f"{label:20s} | {dev:8s} | ERROR: {str(e)[:200]}")
        results.append({'label': label, 'dev': dev, 'error': str(e)[:200]})
        time.sleep(1.0)

print("\n=== Aggregate per-dev ===\n")

devs = {}
for r in results:
    if 'error' in r:
        devs.setdefault(r['dev'], {}).setdefault('errors', []).append(r['label'])
        continue
    key = r['dev']
    devs.setdefault(key, {'hours': 0.0, 'leave': '', 'sheets': [], 'errors': []})
    devs[key]['hours'] += r['hours']
    if r['leave'] == 'full_day_off':
        devs[key]['leave'] = 'full_day_off'
    elif r['leave'] == 'half_day' and devs[key]['leave'] != 'full_day_off':
        devs[key]['leave'] = 'half_day'
    devs[key]['sheets'].append(f"{r['label']}:{r['hours']:.1f}h")

for dev, d in sorted(devs.items()):
    h = d.get('hours', 0)
    leave = d.get('leave', '')
    if leave == 'full_day_off':
        alert = False
        st = 'OFF (full day)'
    elif leave == 'half_day':
        alert = h < 4
        st = f"OK(half-day)" if h >= 4 else f"LOW {h:.1f}h"
    elif h >= 8:
        alert = False
        st = 'OK'
    elif h > 0:
        alert = True
        st = f"LOW {h:.1f}h"
    else:
        alert = True
        st = 'ZERO (ALERT)'
    print(f"{dev:8s} | {h:5.2f}h | {st:20s} | {' '.join(d.get('sheets', []))}")

with open('/tmp/tasklog_apr22.json', 'w') as f:
    json.dump({'per_sheet': results, 'per_dev': devs}, f, indent=2, default=str)
print("\nJSON saved to /tmp/tasklog_apr22.json")
