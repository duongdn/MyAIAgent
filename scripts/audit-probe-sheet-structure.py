#!/usr/bin/env python3
"""Probe the structure of task log sheets to understand column layout."""
import json
import re
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

def probe_tab(sheet_id, tab, label):
    print(f"\n{'='*60}")
    print(f"  {label} - Tab: {tab}")
    print(f"{'='*60}")
    try:
        res = svc.values().get(spreadsheetId=sheet_id, range=f"'{tab}'!A1:T60").execute()
        rows = res.get('values', [])
    except Exception as e:
        print(f"  ERROR: {e}")
        return

    for i, row in enumerate(rows[:60]):
        if row:
            print(f"  Row {i+1:3d}: {row}")

# Probe KhanhHH W10
probe_tab('1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', 'W10', 'KhanhHH')

# Probe LeNH Rory W10
probe_tab('1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', 'W10', 'LeNH_Rory')

# Probe Paturevision (VietPH/DuongDN) W10
probe_tab('1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', 'W10', 'Paturevision')
