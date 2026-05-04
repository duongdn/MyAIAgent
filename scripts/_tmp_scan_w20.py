import re
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gbuild

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = gbuild('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

sid = '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'

result = sheets_api.values().get(spreadsheetId=sid, range='W20!A1:K200').execute()
rows = result.get('values', [])
print(f"Header: {rows[3] if len(rows)>3 else 'NA'}")

current_date = None
for i, row in enumerate(rows):
    if not row:
        continue
    cell_a = row[0].strip() if row else ""
    if re.match(r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun),', cell_a):
        current_date = cell_a
        actual = row[7] if len(row) > 7 else ""
        if '24/04' in cell_a:
            print(f"\n  >>> {cell_a} day-total='{actual}'")
        continue
    if current_date and '24/04' in current_date:
        if cell_a == 'Task dự án':
            owner = row[6].strip() if len(row) > 6 else ""
            actual = row[7].strip() if len(row) > 7 else "0"
            desc = row[2].strip() if len(row) > 2 else ""
            if owner == 'TuanNT':
                print(f"     row {i+1}: TuanNT {actual}h - {desc[:80]}")
        if 'Nghỉ' in cell_a:
            print(f"     row {i+1}: LEAVE: {cell_a}")
