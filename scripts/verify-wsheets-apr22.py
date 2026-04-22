#!/usr/bin/env python3
"""Verify W-sheet selection for Wed 22/04/2026.
Based on Apr-20 script: current W-sheets should be W3, W22, W37, W24, W8, W21, W21, W20, W21
Now probe each to find Wed 22/04 row."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

WED_TOKS = ['22/04', '22/4']

# Based on apr20 script "ws_cur" column
CANDIDATES = [
    ("maddy",        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "W3"),
    ("james_diamond","1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "W22"),
    ("generator",    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "W37"),
    ("paturevision", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",  "W24"),
    ("rory",         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",  "W8"),
    ("franc",        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",  "W21"),
    ("aysar",        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",  "W21"),
    ("john_yi",      "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",  "W20"),
    ("rebecca",      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",  "W21"),
]

for label, sid, ws in CANDIDATES:
    try:
        res = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T200").execute()
        rows = res.get('values', [])
        # Find all "Wed" rows and check for 22/04
        wed_rows = [(i, r) for i, r in enumerate(rows) if r and r[0].strip().startswith('Wed,')]
        has_today = any(any(t in str(r) for t in WED_TOKS) for _, r in wed_rows)
        if wed_rows:
            print(f"{label:18s} | {ws} | Wed rows found: {[(i, r[0]) for i, r in wed_rows[:3]]} | has_today={has_today}")
        else:
            # Show first few row A values
            first = [r[0] if r else '' for r in rows[:6]]
            print(f"{label:18s} | {ws} | NO Wed rows | first A values: {first}")

        # Also show a sample of task rows with hours if any
        task_rows = [(i, r) for i, r in enumerate(rows) if r and r[0].strip() == 'Task dự án' and len(r) > 7 and r[7].strip() not in ('', '0')]
        if task_rows:
            print(f"  Sample task rows (first 5): {[(r[0], r[6] if len(r)>6 else '', r[7] if len(r)>7 else '') for _, r in task_rows[:5]]}")
        time.sleep(0.5)
    except Exception as e:
        print(f"{label:18s} | {ws} | ERROR: {e}")
        time.sleep(1.0)
