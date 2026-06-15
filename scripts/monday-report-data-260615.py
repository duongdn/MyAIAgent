#!/usr/bin/env python3
"""Monday report data gatherer for week 2026-06-09 to 2026-06-14.
Returns hours from all 8 project sheets + Redmine bug counts.
Does NOT submit any forms or modify Trello.
"""
import json, urllib.request, urllib.parse
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds, cache_discovery=False).spreadsheets()

WEEK_START = "June 9"  # match text in Summary col B
WEEK_MATCH_ALT = "09/06"  # alt format

# Sheet IDs from memory (corrected)
PROJECTS = [
    ("Maddy",          "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I"),
    ("Baamboozle",     "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8"),
    ("James Diamond",  "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI"),
    ("Bailey",         "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg"),
    ("Marcel",         "1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI"),
    ("Neural Contract","1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg"),
    ("LegalAtoms",     "1Q9qB-Bz4lRqSIjqNbLszFOtokm4X_fUe4KqiTXIQ9_c"),
    ("Andrew Taraba",  "11iOnN6sCEK_5pcoeFs8tm42GZRZ719rTDlAeAYQIOGI"),
]

REDMINE_URL = 'https://redmine.nustechnology.com'
REDMINE_KEY = json.load(open('config/.redmine-config.json'))['api_key']
REDMINE_PROJECTS = {
    "Maddy": "maddy-extreme-soft-solutions",
    "James Diamond": "james-bonsey-jaden",
    "Bailey": "bailey-paturevision",
}

def fetch_hours(sid):
    """Get actual hours from Summary!A6:D60, match June 9 week."""
    try:
        r = svc.values().get(spreadsheetId=sid, range='Summary!A6:D60').execute()
        rows = r.get('values', [])
        # Dump rows for debugging
        for row in rows:
            b = str(row[1]).strip() if len(row) > 1 else ''
            if '09' in b or 'Jun' in b or 'June' in b or '9' in b:
                print(f"  CANDIDATE: {row[:4]}", flush=True)
        for row in rows:
            b = str(row[1]).strip() if len(row) > 1 else ''
            if WEEK_START in b or WEEK_MATCH_ALT in b or '2026-06-09' in b or 'Jun 9' in b or 'June 9' in b:
                h = row[3] if len(row) > 3 else '0'
                try:
                    return float(str(h).replace(',','.'))
                except:
                    return str(h)
        # If not found by date, show first 6 rows for debug
        print(f"  NOT FOUND - first 6 rows:", flush=True)
        for row in rows[:6]:
            print(f"    {row[:4]}", flush=True)
        return 'NOT_FOUND'
    except Exception as e:
        return f'ERROR: {str(e)[:80]}'

def fetch_redmine_bugs(project_id):
    """Count bugs created in reporting week."""
    url = (f"{REDMINE_URL}/issues.json?project_id={project_id}"
           f"&created_on=%3E%3C2026-06-09T00%3A00%3A00%7C2026-06-14T23%3A59%3A59"
           f"&tracker_id=1&limit=100&key={REDMINE_KEY}")
    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            d = json.loads(resp.read())
            issues = d.get('issues', [])
            return len(issues), [f"#{i['id']} {i['subject'][:60]}" for i in issues]
    except Exception as e:
        return f'ERROR:{str(e)[:60]}', []

# ── Gather hours ──────────────────────────────────────────────────────────────
print("\n=== HOURS (Summary sheets) ===")
hours = {}
for name, sid in PROJECTS:
    h = fetch_hours(sid)
    hours[name] = h
    print(f"  {name:20s}: {h}")

# ── Gather Redmine bugs ───────────────────────────────────────────────────────
print("\n=== REDMINE BUGS (week Jun 9-14) ===")
bugs = {}
for name, proj_id in REDMINE_PROJECTS.items():
    count, titles = fetch_redmine_bugs(proj_id)
    bugs[name] = {'count': count, 'titles': titles}
    print(f"  {name:20s}: {count} bug(s)")
    for t in titles:
        print(f"    - {t}")

print("\n=== SUMMARY JSON ===")
print(json.dumps({'hours': hours, 'redmine_bugs': bugs}, indent=2, ensure_ascii=False))
