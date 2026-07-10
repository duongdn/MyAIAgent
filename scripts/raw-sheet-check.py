import sys
from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    'config/daily-agent-490610-7eb7985b33e3.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
)
svc = build('sheets', 'v4', credentials=creds)

sid = sys.argv[1]
rng = sys.argv[2] if len(sys.argv) > 2 else "Summary!A1:D60"
res = svc.spreadsheets().values().get(spreadsheetId=sid, range=rng).execute().get('values', [])
for row in res:
    print(row)
