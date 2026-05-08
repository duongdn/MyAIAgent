#!/usr/bin/env python3
"""Debug: list all tabs on Aysar sheet + dump Franc W23 + Rory W10 raw rows for Thu 07/05/26."""
import time
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds)

AYSAR_SID = "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8"
FRANC_SID = "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ"
RORY_SID = "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8"
REBECCA_SID = "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4"


def list_tabs(sid):
    meta = svc.spreadsheets().get(spreadsheetId=sid).execute()
    return [s['properties']['title'] for s in meta.get('sheets', [])]


def dump_thu_block(sid, tab, label):
    print(f"\n--- {label} :: tab '{tab}' ---")
    rows = svc.spreadsheets().values().get(
        spreadsheetId=sid, range=f"'{tab}'!A1:T220"
    ).execute().get('values', [])
    DAYS = ('Sat,', 'Sun,', 'Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')
    headers = []
    for i, r in enumerate(rows):
        if r and r[0]:
            a = r[0].strip()
            if any(a.startswith(d) for d in DAYS):
                headers.append((i + 1, a))
    print(f"  Headers in tab: {[h for _, h in headers]}")
    thu_idx = None
    for idx, h in headers:
        if h.startswith('Thu,') and '07/05' in h:
            thu_idx = idx
            break
    if not thu_idx:
        print(f"  NO Thu 07/05 header in {tab}")
        return
    next_idx = None
    for idx, h in headers:
        if idx > thu_idx:
            next_idx = idx
            break
    end = next_idx or (thu_idx + 25)
    for i in range(thu_idx - 1, min(end, len(rows))):
        r = rows[i] if i < len(rows) else []
        a = (r[0] if len(r) > 0 else '') or ''
        c = (r[2] if len(r) > 2 else '') or ''
        g = (r[6] if len(r) > 6 else '') or ''
        h = (r[7] if len(r) > 7 else '') or ''
        q = (r[16] if len(r) > 16 else '') or ''
        s = (r[18] if len(r) > 18 else '') or ''
        t_ = (r[19] if len(r) > 19 else '') or ''
        print(f"    r{i+1:>3} | A={a[:18]:<18} | G={g[:12]:<12} | H={h:<6} | Q={q[:12]:<12} | S={s[:10]:<10} | T={t_:<6} | C={c[:50]}")


print("== AYSAR tabs ==")
tabs = list_tabs(AYSAR_SID)
print(tabs)

# Try W23 explicitly
for trial in ('W23', 'W22', 'W24', 'W21'):
    if trial in tabs:
        dump_thu_block(AYSAR_SID, trial, f"Aysar {trial}")
        time.sleep(0.6)

# Also dump first day-header row of recent tabs to detect which tab covers May 4-10
for trial in tabs[-8:]:
    if trial.startswith('W'):
        try:
            rows = svc.spreadsheets().values().get(
                spreadsheetId=AYSAR_SID, range=f"'{trial}'!A1:A60"
            ).execute().get('values', [])
            firsts = [r[0] for r in rows[:50] if r and r[0]]
            day_lines = [x for x in firsts if any(x.startswith(d) for d in ('Sat,','Sun,','Mon,','Tue,','Wed,','Thu,','Fri,'))]
            print(f"\nAysar tab {trial} day-headers: {day_lines[:7]}")
        except Exception as e:
            print(f"Aysar {trial} fetch err: {e}")
        time.sleep(0.6)

print("\n\n== FRANC W23 ==")
dump_thu_block(FRANC_SID, "W23", "Franc W23")

print("\n== RORY W10 ==")
dump_thu_block(RORY_SID, "W10", "Rory W10")

print("\n== REBECCA W23 (LeNH Q-T) ==")
dump_thu_block(REBECCA_SID, "W23", "Rebecca W23")
