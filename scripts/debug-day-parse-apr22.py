#!/usr/bin/env python3
"""Debug why day_hours returns 0 for maddy/LongVV on W3."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

# Fetch maddy W3 rows
res = sheets_api.values().get(
    spreadsheetId="1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    range="'W3'!A1:T200"
).execute()
rows = res.get('values', [])

print(f"Total rows: {len(rows)}")
print("\n--- First 50 rows (col A, col G, col H) ---")
for i, row in enumerate(rows[:80]):
    if not row:
        print(f"  [{i:3d}] (empty)")
        continue
    cell_a = row[0].strip() if row[0] else ""
    cell_g = row[6].strip() if len(row) > 6 else ""
    cell_h = row[7].strip() if len(row) > 7 else ""
    if cell_a or cell_g or cell_h:
        print(f"  [{i:3d}] A={repr(cell_a):40s} G={repr(cell_g):12s} H={repr(cell_h)}")

print("\n--- Checking for 'Wed' in col A ---")
for i, row in enumerate(rows):
    if row and 'Wed' in str(row[0]):
        print(f"  [{i:3d}] A={repr(row[0])}")

print("\n--- All 'Task dự án' rows with owner=LongVV ---")
in_wed = False
for i, row in enumerate(rows):
    if not row:
        continue
    cell_a = row[0].strip() if row[0] else ""
    if 'Wed,' in cell_a:
        print(f"  [{i:3d}] Day header: {repr(cell_a)} in_wed={in_wed}")
        if '22/04' in cell_a or '22/4' in cell_a:
            in_wed = True
        else:
            if in_wed:
                in_wed = False
    if cell_a == 'Task dự án':
        owner = row[6].strip() if len(row) > 6 else ""
        hours = row[7].strip() if len(row) > 7 else ""
        if owner == 'LongVV':
            print(f"  [{i:3d}] Task dự án | owner={owner} | hours={hours} | in_wed={in_wed}")
