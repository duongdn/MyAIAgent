#!/usr/bin/env python3
"""Debug: find which W-sheet contains Wed 22/04 data and examine structure."""
import time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

TODAY_TOKS = ['22/04', '22/4']

# Sample a few sheets to understand structure
SAMPLE_SHEETS = [
    ("maddy_longvv",  "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I"),
    ("james_diamond_phucvt", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI"),
    ("john_yi_tuannt", "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ"),
    ("rory_lenh", "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8"),
    ("paturevision_vietph", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg"),
]

for label, sid in SAMPLE_SHEETS:
    print(f"\n{'='*60}")
    print(f"Sheet: {label} ({sid[:20]}...)")
    try:
        meta = sheets_api.get(spreadsheetId=sid, fields='sheets.properties.title').execute()
        all_sheets = [s['properties']['title'] for s in meta['sheets']]
        w_sheets = sorted(
            [s for s in all_sheets if s.startswith('W') and s[1:].isdigit()],
            key=lambda x: int(x[1:])
        )
        print(f"  All sheets ({len(all_sheets)}): {all_sheets}")
        print(f"  W-sheets: {w_sheets[-10:]}")
        time.sleep(0.5)

        # Check the last 5 W-sheets for today's date
        for ws in reversed(w_sheets[-5:]):
            r = sheets_api.values().get(spreadsheetId=sid, range=f"'{ws}'!A1:A100").execute()
            vals = r.get('values', [])
            flat = ' '.join(str(v[0]) for v in vals if v)
            has_today = any(t in flat for t in TODAY_TOKS)
            # Show first few rows too
            first_rows = [v[0] for v in vals[:10] if v]
            print(f"  {ws}: has_today={has_today} | first rows: {first_rows}")
            time.sleep(0.3)
    except Exception as e:
        print(f"  ERROR: {e}")
    time.sleep(0.5)
