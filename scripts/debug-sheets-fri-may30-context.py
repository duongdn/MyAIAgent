#!/usr/bin/env python3
"""Show full rows around the Fri 29/05 and Sat 30/05 blocks in JohnYi and Paturevision sheets."""
import json
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "JohnYi":       ("1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "W25"),
    "Rebecca":      ("1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "W26"),
    "JamesDiamond": ("1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "W27"),
    "Paturevision": ("1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "W29"),
    "Generator":    ("1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooOOsdHkeEM", "W42"),
    "Maddy":        ("1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "W8"),
}

# Correct Generator sheet ID
SHEETS["Generator"] = ("1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "W42")

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)


def fetch(sheet_id, rng):
    try:
        resp = svc.spreadsheets().values().get(
            spreadsheetId=sheet_id, range=rng
        ).execute()
        return resp.get("values", [])
    except Exception as e:
        return [["ERROR: " + str(e)]]


results = {}
for name, (sid, tab) in SHEETS.items():
    rows = fetch(sid, f"{tab}!A:I")
    # Show rows 60-90 (where Fri/Sat blocks should be)
    slice_rows = []
    for i, row in enumerate(rows[59:95], start=60):
        col_a = str(row[0]).strip() if row else ""
        # Show full row only for interesting rows
        slice_rows.append({
            "row": i,
            "colA": col_a,
            "colH": str(row[7]).strip() if len(row) > 7 else "",
            "colG": str(row[6]).strip() if len(row) > 6 else "",
            "full": [str(c) for c in row[:9]],
        })
    results[name] = slice_rows

print(json.dumps(results, indent=2, ensure_ascii=False))
