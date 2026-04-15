"""Debug: dump W21 raw data for PhucVT."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = goog_create('sheets', 'v4', credentials=creds).spreadsheets()

sid = '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI'
r = svc.values().get(spreadsheetId=sid, range='W21!A1:P80').execute()
rows = r.get('values', [])
for i, row in enumerate(rows):
    if row:
        # Show first 10 cols
        print(f"row {i:3d}: {row[:10]}")
