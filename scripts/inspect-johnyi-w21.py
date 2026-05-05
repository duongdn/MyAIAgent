#!/usr/bin/env python3
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = 'config/daily-agent-490610-7eb7985b33e3.json'
SHEET_ID = '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'

creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds)
sapi = svc.spreadsheets()

# Use FORMULA to see real cell content; also no truncation
r = sapi.values().get(
    spreadsheetId=SHEET_ID,
    range="'W21'!A19:K34",
    valueRenderOption='FORMATTED_VALUE',
).execute()
rows = r.get('values', [])
print('FORMATTED rows 19-34 (Tue 28/04 + tasks):')
for j, row in enumerate(rows):
    # pad to 11 cols
    row = (row + ['']*(11-len(row)))[:11]
    print(f'  R{j+19}: {row}')

print()
print('--- UNFORMATTED ---')
r2 = sapi.values().get(
    spreadsheetId=SHEET_ID,
    range="'W21'!A19:K34",
    valueRenderOption='UNFORMATTED_VALUE',
).execute()
for j, row in enumerate(r2.get('values', [])):
    row = (row + ['']*(11-len(row)))[:11]
    print(f'  R{j+19}: {row}')
