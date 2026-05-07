#!/usr/bin/env python3
"""Deeper verification of Wed 06/05 — show day header + every row in the Wed block."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA_KEY = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

# Verify any sheet where a target dev appeared to have 0h (or partial)
TARGETS = [
    ("maddy",         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "LongVV", "W5"),
    ("james_long",    "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "LongVV/PhucVT/TuanNT", "W24"),
    ("johnyi",        "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT", "W22"),
    ("rebecca",       "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT/LeNH(Q-T)", "W23"),
    ("paturevision",  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH/TuanNT", "W26"),
    ("generator",     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH",  "W39"),
    ("rory",          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH",     "W10"),
    ("franc",         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH",     "W23"),
    ("aysar",         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH",     "W23"),
    ("fountain",      "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o", "team",     "W25"),
]

DAYS = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')

for label, sid, dev, ws in TARGETS:
    print(f"\n=== {label} ({dev}) — {ws} ===")
    try:
        res = svc.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:T220").execute()
        rows = res.get('values', [])
    except Exception as e:
        print(f"  ERROR: {e}")
        continue
    headers = []
    for idx, r in enumerate(rows):
        if r and r[0]:
            a = r[0].strip()
            if any(a.startswith(d) for d in DAYS):
                headers.append((idx + 1, a))
    wed_idx = None
    for idx, h in headers:
        if h.startswith('Wed,') and '06/05' in h:
            wed_idx = idx
            break
    if not wed_idx:
        print(f"  No Wed 06/05 header found! Headers: {[h for _, h in headers]}")
        continue
    print(f"  Wed 06/05 found at row {wed_idx}: {[h for r, h in headers if r == wed_idx][0]}")
    next_idx = None
    for idx, h in headers:
        if idx > wed_idx:
            next_idx = idx
            break
    end = next_idx or (wed_idx + 20)
    for i in range(wed_idx - 1, min(end, len(rows))):
        r = rows[i] if i < len(rows) else []
        a = (r[0] if len(r) > 0 else '') or ''
        b = (r[1] if len(r) > 1 else '') or ''
        c = (r[2] if len(r) > 2 else '') or ''
        g = (r[6] if len(r) > 6 else '') or ''
        h = (r[7] if len(r) > 7 else '') or ''
        q = (r[16] if len(r) > 16 else '') or ''
        s = (r[18] if len(r) > 18 else '') or ''
        t_ = (r[19] if len(r) > 19 else '') or ''
        if label == "rebecca":
            print(f"    r{i+1:>3} | A={a[:18]:<18} | G={g:<10} | H={h:<5} | Q={q[:14]:<14} | S={s:<10} | T={t_}")
        else:
            print(f"    r{i+1:>3} | A={a[:18]:<18} | G={g:<10} | H={h:<5} | C={c[:50]}")
    time.sleep(0.7)
