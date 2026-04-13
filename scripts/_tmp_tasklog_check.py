#!/usr/bin/env python3
"""Temporary script: check task logs for all developers.
Focus on Friday Apr 10 + weekend Apr 11-12. Today is Monday Apr 13, 2026."""

import json, sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_mk

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_mk('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

SHEETS = [
    {"label": "LongVV (Maddy)", "sid": "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "dev": "LongVV"},
    {"label": "PhucVT", "sid": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "dev": "PhucVT"},
    {"label": "TuanNT (John Yi)", "sid": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "dev": "TuanNT"},
    {"label": "TuanNT (Rebecca)", "sid": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "dev": "TuanNT"},
    {"label": "VietPH", "sid": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "dev": "VietPH"},
    {"label": "KhanhHH", "sid": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "dev": "KhanhHH"},
    {"label": "LeNH (Rory)", "sid": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "dev": "LeNH"},
    {"label": "LeNH (Franc)", "sid": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "dev": "LeNH"},
    {"label": "LeNH (Aysar)", "sid": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "dev": "LeNH"},
]

# Step 1: Get tabs for each sheet
print("=" * 80)
print("STEP 1: Discovering sheet tabs")
print("=" * 80)
for s in SHEETS:
    try:
        meta = sheets_api.get(spreadsheetId=s['sid'], fields='sheets.properties.title').execute()
        tabs = [sh['properties']['title'] for sh in meta['sheets']]
        s['tabs'] = tabs
        print(f"  {s['label']:25s} tabs: {tabs[:15]}")
    except Exception as e:
        s['tabs'] = []
        print(f"  {s['label']:25s} ERROR: {e}")

# Step 2: For each sheet, find the W-sheet that contains April 10
# April 10 = Friday, week 15 of 2026 (ISO). But sheet naming might differ.
# We look for Summary tab first, then fall back to W-tabs.
print()
print("=" * 80)
print("STEP 2: Reading data - checking W-sheets for April 6-12 week")
print("=" * 80)

# Date patterns we're looking for
FRI_PATTERNS = ['10/04', '10/4']
SAT_PATTERNS = ['11/04', '11/4']
SUN_PATTERNS = ['12/04', '12/4']

results = []

for s in SHEETS:
    label = s['label']
    sid = s['sid']
    dev = s['dev']
    tabs = s.get('tabs', [])

    # Find the right W-tab: look for ones containing Apr 6 or Apr 10
    # Try Summary first
    has_summary = 'Summary' in tabs

    # Find W-tabs sorted by number
    w_tabs = sorted([t for t in tabs if t.startswith('W') and t[1:].isdigit()],
                    key=lambda x: int(x[1:]))

    # Try the last few W-tabs to find the one with April 6-12
    target_ws = None
    for ws in reversed(w_tabs[-5:] if len(w_tabs) >= 5 else w_tabs):
        try:
            r = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:A10").execute()
            vals = r.get('values', [])
            text = ' '.join([v[0] for v in vals if v])
            # Look for April 6 (Monday of that week) or April 10
            if any(p in text for p in ['06/04', '6/04', '06/4', '6/4', '10/04', '10/4', '07/04', '7/04']):
                target_ws = ws
                break
        except:
            continue

    if not target_ws and w_tabs:
        # Just use the last W-tab
        target_ws = w_tabs[-1]

    print(f"\n  {label}: using tab '{target_ws}' (has Summary: {has_summary})")

    if not target_ws:
        results.append({"label": label, "dev": dev, "fri_hours": 0, "weekly": 0,
                        "status": "ERROR", "notes": "No W-tab found"})
        continue

    # Read the full W-sheet
    try:
        r = sheets_api.values().get(spreadsheetId=sid, range=f"'{target_ws}'!A1:R200").execute()
        rows = r.get('values', [])
    except Exception as e:
        results.append({"label": label, "dev": dev, "fri_hours": 0, "weekly": 0,
                        "status": "ERROR", "notes": str(e)[:80]})
        continue

    # Parse rows: find Friday Apr 10 section
    fri_hours = 0.0
    weekly_hours = 0.0
    leave_note = ""
    in_friday = False
    in_week = True  # assume whole sheet is the week
    fri_rows = 0
    week_rows = 0
    rebecca_chua = []

    for i, row in enumerate(rows):
        if not row:
            continue
        cell_a = row[0].strip() if row[0] else ""
        row_str = ' '.join([str(c) for c in row])

        # Detect day headers (e.g., "Fri, 10/04/2026" or "Thứ Sáu, 10/04")
        is_day_header = any(d in cell_a for d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
                                                    'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm',
                                                    'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'])

        is_friday = is_day_header and any(p in cell_a for p in FRI_PATTERNS)
        is_next_day = is_day_header and not is_friday and any(
            p in cell_a for p in SAT_PATTERNS + SUN_PATTERNS + ['13/04', '13/4'])

        if is_friday:
            in_friday = True
            # Check for leave in header
            if 'Nghỉ cả ngày' in row_str:
                leave_note = "full_day_off"
            if 'Nghỉ nửa ngày' in row_str:
                leave_note = "half_day"
            continue

        if in_friday and is_day_header:
            in_friday = False

        # Count hours for "Task dự án" rows, filtered by Owner (col G = index 6)
        if cell_a == "Task dự án":
            owner = row[6].strip() if len(row) > 6 else ""
            hours_col = 7  # col H
            hours_str = row[hours_col].strip() if len(row) > hours_col else "0"

            if owner == dev or (not owner and dev in label):
                try:
                    h = float(hours_str.replace(',', '.'))
                except:
                    h = 0.0

                weekly_hours += h
                week_rows += 1

                if in_friday:
                    fri_hours += h
                    fri_rows += 1

        # Check for leave notes in any row
        if in_friday:
            if 'Nghỉ cả ngày' in row_str:
                leave_note = "full_day_off"
            if 'Nghỉ nửa ngày' in row_str:
                leave_note = "half_day"

        # Rebecca: check col P (index 15)
        if 'Rebecca' in label and len(row) > 15:
            p_val = row[15].strip() if row[15] else ""
            if 'Chưa' in p_val:
                rebecca_chua.append(f"row {i+1}")

    notes_parts = []
    if leave_note == "full_day_off":
        notes_parts.append("LEAVE (full day)")
    elif leave_note == "half_day":
        notes_parts.append("half day leave")
    if rebecca_chua:
        notes_parts.append(f"Col P 'Chưa': {len(rebecca_chua)} rows")
    if s.get('notes'):
        notes_parts.append(s.get('notes', ''))

    results.append({
        "label": label, "dev": dev,
        "fri_hours": fri_hours, "fri_rows": fri_rows,
        "weekly": weekly_hours, "week_rows": week_rows,
        "leave": leave_note,
        "status": "pending",
        "notes": "; ".join(notes_parts),
        "ws": target_ws
    })

# Step 3: Also try Summary tab approach
print()
print("=" * 80)
print("STEP 3: Checking Summary tabs")
print("=" * 80)

for s in SHEETS:
    if 'Summary' in s.get('tabs', []):
        try:
            r = sheets_api.values().get(spreadsheetId=s['sid'], range="'Summary'!A1:Z50").execute()
            rows = r.get('values', [])
            print(f"\n  {s['label']} Summary ({len(rows)} rows):")
            for i, row in enumerate(rows[:20]):
                print(f"    row {i}: {row[:8]}")
        except Exception as e:
            print(f"\n  {s['label']} Summary ERROR: {e}")

# Step 4: Print results table
print()
print("=" * 80)
print("RESULTS: Task Log Check — Fri Apr 10, 2026")
print("=" * 80)
print(f"{'Developer':25s} | {'Fri Apr10':>9s} | {'Wk Total':>8s} | {'Status':8s} | Notes")
print("-" * 100)

for r in results:
    label = r['label']
    fri = r['fri_hours']
    wk = r['weekly']
    leave = r.get('leave', '')

    # Determine status
    if r.get('status') == 'ERROR':
        status = 'ERROR'
    elif leave == 'full_day_off':
        status = 'OFF'
    elif leave == 'half_day':
        status = 'OK' if fri >= 4 else 'LOW'
    elif 'Rebecca' in label:
        status = 'OK'  # Rebecca has no min hours requirement
    elif 'Franc' in label or 'Aysar' in label:
        status = 'OK'  # Sub-sheets for LeNH, no independent min
    elif 'Maddy' in label:
        status = 'OK' if wk >= 16 else ('LOW' if wk >= 12 else 'ALERT')
    else:
        if fri >= 8:
            status = 'OK'
        elif fri >= 6:
            status = 'LOW'
        elif fri == 0 and r.get('fri_rows', 0) == 0:
            status = 'ALERT'
        else:
            status = 'LOW'

    r['status'] = status
    print(f"{label:25s} | {fri:8.1f}h | {wk:7.1f}h | {status:8s} | {r.get('notes','')}")

# LeNH combined
lenh_fri = sum(r['fri_hours'] for r in results if r['dev'] == 'LeNH')
lenh_wk = sum(r['weekly'] for r in results if r['dev'] == 'LeNH')
lenh_status = 'OK' if lenh_fri >= 8 else ('LOW' if lenh_fri >= 6 else 'ALERT')
print("-" * 100)
print(f"{'LeNH (COMBINED)':25s} | {lenh_fri:8.1f}h | {lenh_wk:7.1f}h | {lenh_status:8s} | Sum of Rory+Franc+Aysar")

# TuanNT combined (John Yi + Rebecca)
tuan_fri = sum(r['fri_hours'] for r in results if r['dev'] == 'TuanNT')
tuan_wk = sum(r['weekly'] for r in results if r['dev'] == 'TuanNT')
tuan_status = 'OK' if tuan_fri >= 8 else ('LOW' if tuan_fri >= 6 else 'ALERT')
print(f"{'TuanNT (COMBINED)':25s} | {tuan_fri:8.1f}h | {tuan_wk:7.1f}h | {tuan_status:8s} | John Yi + Rebecca")
