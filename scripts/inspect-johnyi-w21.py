#!/usr/bin/env python3
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = 'config/daily-agent-490610-7eb7985b33e3.json'
SHEET_ID = '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'

creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds)
sapi = svc.spreadsheets()

r = sapi.values().get(spreadsheetId=SHEET_ID, range="'W21'!A1:K400").execute()
rows = r.get('values', [])

# Find the row(s) with "28/04" and dump 30 rows after
for idx, row in enumerate(rows):
    a = row[0] if row else ''
    if '28/04' in a or '28/4' in a:
        print(f'--- Found at row {idx+1}: "{a}" ---')
        for j in range(idx, min(idx+40, len(rows))):
            print(f'{j+1}: {rows[j]}')
        print('---')
