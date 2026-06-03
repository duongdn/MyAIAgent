#!/usr/bin/env python3
"""Probe raw rows around Friday May 30 in each sheet to understand what's there."""
import json
import re
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "JohnYi":        ("1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "W25"),
    "Rebecca":       ("1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "W26"),
    "JamesDiamond":  ("1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "W27"),
    "Rory":          ("1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "W13"),
    "Franc":         ("1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "W26"),
    "Aysar":         ("1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "W26"),
    "Generator":     ("1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "W42"),
    "Paturevision":  ("1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "W29"),
    "Maddy":         ("1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "W8"),
}

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


# Tokens to search for (various formats for May 30)
SEARCH_TOKENS = ["30/05", "30/5", "Fri", "May 30", "T6"]

results = {}
for name, (sid, tab) in SHEETS.items():
    rows = fetch(sid, f"{tab}!A:I")
    # Find rows that have "30" or "Fri" in col A, or in last few rows
    matching = []
    for i, row in enumerate(rows):
        col_a = str(row[0]).strip() if row else ""
        if any(tok in col_a for tok in SEARCH_TOKENS):
            matching.append({"rowNum": i+1, "rowA": col_a, "row": [str(c) for c in row[:9]]})
    results[name] = matching[-8:] if len(matching) > 8 else matching

    # Also show last 10 rows to see what's at the end
    last_rows = []
    for i, row in enumerate(rows[-10:]):
        col_a = str(row[0]).strip() if row else ""
        last_rows.append({"rowNum": len(rows)-10+i+1, "colA": col_a, "row": [str(c) for c in row[:9]]})
    results[f"{name}_last10"] = last_rows

print(json.dumps(results, indent=2, ensure_ascii=False))
