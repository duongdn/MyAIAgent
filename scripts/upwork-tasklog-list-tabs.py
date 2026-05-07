#!/usr/bin/env python3
"""List worksheet tabs for the 4 Upwork-related sheets to find Mon 05/04 tab."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

SHEETS = [
    ('Rory',          '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8'),
    ('Aysar',         '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8'),
    ('Paturevision',  '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg'),
]

for label, sid in SHEETS:
    try:
        meta = svc.get(spreadsheetId=sid).execute()
        tabs = [s['properties']['title'] for s in meta.get('sheets', [])]
        print(f"{label}: {tabs[-8:]}")  # last 8 tabs
    except Exception as e:
        print(f"{label}: ERROR {e}")
