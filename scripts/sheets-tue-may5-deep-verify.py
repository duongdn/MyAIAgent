#!/usr/bin/env python3
"""Deeper verification of Tue 05/05 0h findings — show day header context."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

# Sheets to deep-verify (those with 0h on Tue 05/05)
TARGETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV", "W5"),
    ("paturevision_t","1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "TuanNT", "W26"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",   "W10"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",   "W23"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",   "W23"),
    ("rebecca_lenh",  "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "LeNH",   "W23"),
    # Also check generator (KhanhHH 6.5h) to confirm 1.5h short is real
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH","W39"),
    # And james_long (LongVV 4h) to confirm 4h short
    ("james_long",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "LongVV", "W24"),
]

DAYS = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

for label, sid, dev, ws in TARGETS:
    print(f"\n=== {label} ({dev}) — {ws} ===")
    try:
        res = svc.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T200").execute()
        rows = res.get('values', [])
    except Exception as e:
        print(f"  ERROR: {e}")
        continue
    # Find day header rows
    headers = []
    for idx, r in enumerate(rows):
        if r and r[0]:
            a = r[0].strip()
            if any(a.startswith(d) for d in DAYS):
                headers.append((idx + 1, a))
    print(f"  Day headers found: {headers}")
    # Find Tue 05/05 specifically
    tue_idx = None
    for idx, h in headers:
        if h.startswith('Tue,') and '05/05' in h:
            tue_idx = idx
            break
    if not tue_idx:
        print(f"  No Tue 05/05 header found! Headers: {[h for _, h in headers]}")
        continue
    print(f"  Tue 05/05 found at row {tue_idx}: {[h for r, h in headers if r == tue_idx][0]}")
    # Print rows from Tue header until next day header
    next_idx = None
    for idx, h in headers:
        if idx > tue_idx:
            next_idx = idx
            break
    end = next_idx or (tue_idx + 20)
    for i in range(tue_idx - 1, min(end, len(rows))):
        r = rows[i] if i < len(rows) else []
        a = (r[0] if len(r) > 0 else '') or ''
        b = (r[1] if len(r) > 1 else '') or ''
        g = (r[6] if len(r) > 6 else '') or ''
        h = (r[7] if len(r) > 7 else '') or ''
        # Also print Q/S/T for rebecca_lenh
        q = (r[16] if len(r) > 16 else '') or ''
        s = (r[18] if len(r) > 18 else '') or ''
        t = (r[19] if len(r) > 19 else '') or ''
        if label == "rebecca_lenh":
            print(f"    r{i+1:>3} | A={a[:18]:<18} | Q={q[:18]:<18} | S={s:<10} | T={t}")
        else:
            print(f"    r{i+1:>3} | A={a[:18]:<18} | G={g:<10} | H={h:<5} | B={b[:50]}")
    time.sleep(0.6)
