#!/usr/bin/env python3
"""
Scan all weekly tabs in each sheet and find which tabs cover Mar 1 - May 28, 2026.
Reads the first day-header row in each tab to determine the date range.
"""
import json
import re
from datetime import date, datetime
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

AUDIT_START = date(2026, 3, 1)
AUDIT_END   = date(2026, 5, 28)

DAY_PREFIXES = ('Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,')

DATE_PATTERNS = [
    # DD/MM/YY  or DD/MM/YYYY
    re.compile(r'(\d{1,2})/(\d{1,2})/(\d{2,4})'),
    # DD/MM (no year - need to infer)
    re.compile(r'(\d{1,2})/(\d{1,2})$'),
]

def parse_row_date(row_text):
    """Parse a day-header like 'Mon, 04/05/26' -> date(2026,5,4)"""
    m = re.search(r'(\d{1,2})/(\d{1,2})/(\d{2,4})', row_text)
    if m:
        d, mo, yr = int(m.group(1)), int(m.group(2)), int(m.group(3))
        if yr < 100:
            yr += 2000
        try:
            return date(yr, mo, d)
        except ValueError:
            return None
    return None

SHEETS = {
    'LeNH_Rory':  '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8',
    'LeNH_Aysar': '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8',
    'KhanhHH':    '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM',
    'Paturevision': '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg',
}

results = {}

for sheet_name, sheet_id in SHEETS.items():
    print(f"\n{'='*60}")
    print(f"  {sheet_name}")
    print(f"{'='*60}")

    # Get list of weekly tabs
    meta = svc.get(spreadsheetId=sheet_id).execute()
    weekly_tabs = [s['properties']['title'] for s in meta.get('sheets', [])
                   if re.match(r'^W\d+$', s['properties']['title'])]

    tab_dates = {}

    for tab in weekly_tabs:
        try:
            # Just read first 10 rows to find date
            res = svc.values().get(
                spreadsheetId=sheet_id,
                range=f"'{tab}'!A1:A15"
            ).execute()
            rows = res.get('values', [])
        except Exception as e:
            continue

        first_date = None
        for row in rows:
            if row and any(str(row[0]).startswith(p) for p in DAY_PREFIXES):
                first_date = parse_row_date(str(row[0]))
                if first_date:
                    break

        if first_date:
            tab_dates[tab] = first_date

    # Find tabs overlapping the audit period
    relevant_tabs = []
    for tab, first_date in sorted(tab_dates.items(), key=lambda x: x[1]):
        # A weekly tab covers ~7 days from its first_date
        tab_end = date(first_date.year, first_date.month, min(first_date.day + 6, 31)) if first_date else None
        try:
            from datetime import timedelta
            tab_end = first_date + timedelta(days=6)
        except:
            tab_end = first_date

        # Overlap check
        if first_date <= AUDIT_END and tab_end >= AUDIT_START:
            relevant_tabs.append((tab, first_date, tab_end))
            print(f"  {tab}: {first_date} to {tab_end}  *** IN RANGE ***")
        else:
            print(f"  {tab}: {first_date} to {tab_end}")

    results[sheet_name] = {
        'sheet_id': sheet_id,
        'relevant_tabs': [(t, str(s), str(e)) for t, s, e in relevant_tabs]
    }

with open('/tmp/tasklog-relevant-tabs.json', 'w') as f:
    json.dump(results, f, indent=2)

print("\n\nSaved to /tmp/tasklog-relevant-tabs.json")
