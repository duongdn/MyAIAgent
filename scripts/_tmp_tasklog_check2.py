#!/usr/bin/env python3
"""Task log check v2: Use Summary tab for weekly totals + W-tab for daily details.
Today: Monday Apr 13, 2026. Check week Apr 6-12 (last full work week)."""

import json, sys, re
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_mk

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_mk('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

SHEETS = [
    {"label": "LongVV (Maddy)", "sid": "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "dev": "LongVV", "min_weekly": 16},
    {"label": "PhucVT", "sid": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "dev": "PhucVT", "min_daily": 8},
    {"label": "TuanNT (John Yi)", "sid": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "dev": "TuanNT", "min_daily": 8},
    {"label": "TuanNT (Rebecca)", "sid": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "dev": "TuanNT", "min_daily": 0},
    {"label": "VietPH", "sid": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "dev": "VietPH", "min_daily": 8},
    {"label": "KhanhHH", "sid": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "dev": "KhanhHH", "min_daily": 8},
    {"label": "LeNH (Rory)", "sid": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "dev": "LeNH", "min_daily": 8},
    {"label": "LeNH (Franc)", "sid": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "dev": "LeNH", "min_daily": 0},
    {"label": "LeNH (Aysar)", "sid": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "dev": "LeNH", "min_daily": 0},
]

results = []

for s in SHEETS:
    label = s['label']
    sid = s['sid']
    dev = s['dev']
    info = {"label": label, "dev": dev, "weekly": 0, "fri_hours": 0, "leave": "", "notes": [], "status": "OK"}

    # Step 1: Get all tabs
    try:
        meta = sheets_api.get(spreadsheetId=sid, fields='sheets.properties.title').execute()
        tabs = [sh['properties']['title'] for sh in meta['sheets']]
    except Exception as e:
        info["status"] = "ERROR"
        info["notes"].append(f"Tab list error: {e}")
        results.append(info)
        continue

    # Step 2: Read Summary tab for weekly total
    if 'Summary' in tabs:
        try:
            r = sheets_api.values().get(spreadsheetId=sid, range="'Summary'!A1:H50").execute()
            rows = r.get('values', [])
            for row in rows:
                if not row or len(row) < 4:
                    continue
                # Find row where date range includes April 6-12
                # Format: W1, April 6, 2026, April 12, 2026, 25.50, ...
                row_text = ' '.join(str(c) for c in row)
                if 'April 6' in row_text or 'April 7' in row_text:
                    try:
                        info["weekly"] = float(row[3].replace(',', '.'))
                        info["summary_week"] = row[0] if row[0] else ""
                    except:
                        pass
                # Also check date format like "06/04" or "6/4"
                if any(p in row_text for p in ['06/04', '6/04']):
                    try:
                        info["weekly"] = float(row[3].replace(',', '.'))
                    except:
                        pass
        except Exception as e:
            info["notes"].append(f"Summary error: {e}")

    # Step 3: Find the W-tab for April 6-12 week and read daily data
    w_tabs = sorted([t for t in tabs if re.match(r'^W\d+$', t)],
                    key=lambda x: int(x[1:]))

    # Find correct W-tab by checking A1:A10 for April dates
    target_ws = None
    for ws in reversed(w_tabs[-8:] if len(w_tabs) >= 8 else w_tabs):
        try:
            r = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:A15").execute()
            vals = r.get('values', [])
            text = ' '.join([v[0] for v in vals if v])
            if any(p in text for p in ['06/04', '6/04', '06/4', '6/4', 'April 6']):
                target_ws = ws
                break
            if any(p in text for p in ['10/04', '10/4', '07/04', '7/04', 'April 10', 'April 7']):
                target_ws = ws
                break
        except:
            continue

    if not target_ws and w_tabs:
        target_ws = w_tabs[-1]  # fallback to last

    if target_ws:
        try:
            r = sheets_api.values().get(spreadsheetId=sid, range=f"'{target_ws}'!A1:R300").execute()
            rows = r.get('values', [])

            # Debug: print first 5 rows to understand format
            print(f"\n--- {label} | tab: {target_ws} | {len(rows)} rows ---")
            for i, row in enumerate(rows[:8]):
                print(f"  row {i}: {row[:10]}")

            # Parse for Friday Apr 10
            in_friday = False
            in_any_day = None

            for i, row in enumerate(rows):
                if not row:
                    continue
                cell_a = str(row[0]).strip() if row[0] else ""
                row_str = ' '.join(str(c) for c in row)

                # Day header detection
                day_markers = ['Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,',
                               'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
                               'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật']
                is_day_header = any(d in cell_a for d in day_markers) or any(d in row_str for d in day_markers)

                if is_day_header:
                    # Check if this is Friday Apr 10
                    if any(p in row_str for p in ['10/04', '10/4', 'April 10']):
                        in_friday = True
                        in_any_day = 'friday'
                        if 'Nghỉ cả ngày' in row_str:
                            info["leave"] = "full_day_off"
                        if 'Nghỉ nửa ngày' in row_str:
                            info["leave"] = "half_day"
                        continue
                    else:
                        in_friday = False
                        in_any_day = 'other'
                        continue

                if in_friday:
                    # Count "Task dự án" rows
                    if 'Task dự án' in cell_a or cell_a == 'Task dự án':
                        # Filter by Owner (col G = index 6)
                        owner = str(row[6]).strip() if len(row) > 6 else ""
                        hours_str = str(row[7]).strip() if len(row) > 7 else "0"

                        if owner == dev or not owner:
                            try:
                                h = float(hours_str.replace(',', '.'))
                                info["fri_hours"] += h
                            except:
                                pass

                    if 'Nghỉ cả ngày' in row_str:
                        info["leave"] = "full_day_off"
                    if 'Nghỉ nửa ngày' in row_str:
                        info["leave"] = "half_day"

        except Exception as e:
            info["notes"].append(f"W-tab read error: {e}")

    # Rebecca: check col P
    if 'Rebecca' in label and target_ws:
        try:
            r = sheets_api.values().get(spreadsheetId=sid, range=f"'{target_ws}'!P1:P300").execute()
            vals = r.get('values', [])
            chua_count = sum(1 for v in vals if v and 'Chưa' in str(v[0]))
            if chua_count:
                info["notes"].append(f"Col P 'Chưa': {chua_count} rows (normal)")
        except:
            pass

    results.append(info)

# Print Summary-based weekly totals
print("\n" + "=" * 100)
print("SUMMARY TAB WEEKLY TOTALS (Week: April 6-12, 2026)")
print("=" * 100)
print(f"{'Developer':25s} | {'Wk Hours':>8s} | {'Fri Apr10':>9s} | {'Status':8s} | Notes")
print("-" * 100)

for r in results:
    label = r['label']
    wk = r['weekly']
    fri = r['fri_hours']
    leave = r.get('leave', '')

    notes = []
    if leave == 'full_day_off':
        notes.append("Fri: full day leave")
    elif leave == 'half_day':
        notes.append("Fri: half day")
    notes.extend(r.get('notes', []))

    # Status
    if r.get('status') == 'ERROR':
        status = 'ERROR'
    elif 'Maddy' in label:
        status = 'OK' if wk >= 16 else ('LOW' if wk >= 12 else 'ALERT')
    elif 'Rebecca' in label or 'Franc' in label or 'Aysar' in label:
        status = 'INFO'  # no independent minimum
    elif leave == 'full_day_off':
        status = 'OFF'
    elif leave == 'half_day':
        status = 'OK' if fri >= 4 else 'LOW'
    else:
        if fri >= 8:
            status = 'OK'
        elif fri >= 6:
            status = 'LOW'
        elif fri > 0:
            status = 'LOW'
        else:
            status = 'CHECK'  # 0h, need to verify

    r['final_status'] = status
    note_str = '; '.join(notes) if notes else ''
    print(f"{label:25s} | {wk:7.1f}h | {fri:8.1f}h | {status:8s} | {note_str}")

# Combined views
print("-" * 100)
lenh_wk = sum(r['weekly'] for r in results if r['dev'] == 'LeNH')
lenh_fri = sum(r['fri_hours'] for r in results if r['dev'] == 'LeNH')
lenh_st = 'OK' if lenh_fri >= 8 else ('LOW' if lenh_fri >= 6 else 'CHECK')
print(f"{'LeNH (COMBINED)':25s} | {lenh_wk:7.1f}h | {lenh_fri:8.1f}h | {lenh_st:8s} | Rory+Franc+Aysar")

tuan_wk = sum(r['weekly'] for r in results if r['dev'] == 'TuanNT')
tuan_fri = sum(r['fri_hours'] for r in results if r['dev'] == 'TuanNT')
tuan_st = 'OK' if tuan_fri >= 8 else ('LOW' if tuan_fri >= 6 else 'CHECK')
print(f"{'TuanNT (COMBINED)':25s} | {tuan_wk:7.1f}h | {tuan_fri:8.1f}h | {tuan_st:8s} | John Yi + Rebecca")
