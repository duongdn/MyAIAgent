"""Gather dev hours from Summary sheets for all Monday report projects."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

PROJECTS = [
    ("Maddy", "1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58"),
    ("Baamboozle", "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8"),
    ("James Diamond", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI"),
    ("Bailey", "1p4smFj2fwSbrIJbYhvLM_IKFYOdq0fNJRqQv0BgQ4U4"),
    ("Marcel", "1z5sNg59eLKpnyGOGM3Eo0n6xfGKEZjhK8CWT1Ja2zRs"),
    ("Neural Contract", "1EE9fKmp5iKCqUQ1LqEqvhMKMB6J3mZEjRc5ejJXfs3Q"),
    ("LegalAtoms", "1D7K6NWzBb3kJ0m1m5lOlsXkqe2YRLF80hrfNzQQfb1U"),
    ("Andrew Taraba", "1KqNkS51c1MJivOXGNOFei3nQN_JVcWmfCMAzwlFJdn8"),
]

WEEK_MATCH = "March 23"

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
            print(f"{name:20s} | WEEK NOT FOUND (searched for '{WEEK_MATCH}')")
    except Exception as e:
        print(f"{name:20s} | ERROR: {str(e)[:100]}")
