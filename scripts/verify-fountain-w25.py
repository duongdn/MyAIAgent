"""Quick verification of Fountain W25 raw rows."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gcl
creds = Credentials.from_service_account_file('config/daily-agent-490610-7eb7985b33e3.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gcl('sheets', 'v4', credentials=creds).spreadsheets()
sid = '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o'
r = svc.values().get(spreadsheetId=sid, range='W25!A1:O500').execute()
rows = r.get('values', [])
TARGET_DATES = ['04/05', '05/05', '06/05', '07/05', '08/05']
EMP = ['HungPN', 'PhatDLT', 'ViTHT', 'ThinhT', 'VuTQ', 'DatNT', 'LamLQ', 'HaVS']
cur_day = None
for i, row in enumerate(rows):
    a = (row[0] if len(row) > 0 else '') or ''
    b = (row[1] if len(row) > 1 else '') or ''
    g = (row[6] if len(row) > 6 else '') or ''
    h = (row[7] if len(row) > 7 else '') or ''
    day_match = None
    for d in TARGET_DATES:
        if d in a or d in b:
            day_match = d
            break
    if day_match and (a.lower().startswith(('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')) or a == ''):
        cur_day = day_match
        continue
    if cur_day and g.strip() in EMP:
        print(f'  R{i+1} day={cur_day} A="{a[:25]}" B="{b[:40]}" G={g} H={h}')
