#!/usr/bin/env python3
"""Monday report data gatherer for week 2026-06-15 to 2026-06-21.
Returns hours from all 8 project sheets. Read-only.
"""
import json, urllib.request, urllib.parse
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds, cache_discovery=False).spreadsheets()

# Week starting Jun 15, 2026 — try multiple date formats
WEEK_TOKENS = ["June 15", "Jun 15", "15/06", "2026-06-15", "Jun 15, 2026", "June 15, 2026"]

# Sheet IDs (from task prompt)
PROJECTS = [
    ("Maddy",          "1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58"),
    ("Baamboozle",     "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8"),
    ("James Diamond",  "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI"),
    ("Bailey",         "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg"),
    ("Marcel",         "1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI"),
    ("Neural Contract","1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg"),
    ("LegalAtoms",     "1Q9qB-Bz4lRqSIjqNbLszFOtokm4X_fUe4KqiTXIQ9_c"),
    ("Andrew Taraba",  "11iOnN6sCEK_5pcoeFs8tm42GZRZ719rTDlAeAYQIOGI"),
]

def fetch_hours(name, sid):
    """Get actual hours from Summary!A6:D60, match June 15 week."""
    try:
        r = svc.values().get(spreadsheetId=sid, range='Summary!A6:D60').execute()
        rows = r.get('values', [])
        # Print all rows with any date-like content for debug
        for row in rows:
            b = str(row[1]).strip() if len(row) > 1 else ''
            if any(t in b for t in WEEK_TOKENS):
                h = row[3] if len(row) > 3 else '0'
                tab = 'Summary'
                print(f"  MATCH row: {row[:4]}")
                try:
                    return float(str(h).replace(',','.')), tab
                except:
                    return str(h), tab
        # Not found — show last 10 rows for debug
        print(f"  [{name}] Jun15 row not found. Last 10 rows of Summary!A6:D60:")
        for row in rows[-10:]:
            print(f"    {row[:4]}")
        return 'NOT_FOUND', 'Summary'
    except Exception as e:
        return f'ERROR: {str(e)[:80]}', '?'

print("\n=== HOURS (Summary sheets, week Jun 15-21) ===")
hours = {}
for name, sid in PROJECTS:
    print(f"  Fetching {name}...")
    h, tab = fetch_hours(name, sid)
    hours[name] = {'hours': h, 'tab': tab}
    print(f"  {name:20s}: {h} (from {tab})")

print("\n=== SUMMARY JSON ===")
print(json.dumps({'hours': hours}, indent=2, ensure_ascii=False))
