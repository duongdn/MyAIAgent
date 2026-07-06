"""Gather dev hours from Summary sheets for Monday report 2026-07-06 (week 2026-06-29 to 2026-07-05)."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

PROJECTS = [
    ("Maddy", "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I"),
    ("Baamboozle", "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8"),
    ("James Diamond", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI"),
    ("Bailey", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg"),
    ("Marcel", "1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI"),
    ("Neural Contract", "1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg"),
    ("LegalAtoms", "1Q9qB-Bz4lRqSIjqNbLszFOtokm4X_fUe4KqiTXIQ9_c"),
    ("Andrew Taraba", "11iOnN6sCEK_5pcoeFs8tm42GZRZ719rTDlAeAYQIOGI"),
]

WEEK_MATCH = "June 29, 2026"

for name, sid in PROJECTS:
    try:
        r = svc.values().get(spreadsheetId=sid, range='Summary!A6:D60').execute()
        rows = r.get('values', [])
        found = False
        for row in rows:
            if len(row) > 1 and WEEK_MATCH in str(row[1]):
                hours = row[3] if len(row) > 3 else '0'
                print(f"{name:20s} | Week: {row[0]} | Start: {row[1]} | Hours: {hours}")
                found = True
                break
        if not found:
            print(f"{name:20s} | WEEK NOT FOUND (searched for '{WEEK_MATCH}') | rows sample: {rows[-3:] if rows else 'none'}")
    except Exception as e:
        print(f"{name:20s} | ERROR: {str(e)[:150]}")
