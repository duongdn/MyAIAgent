#!/usr/bin/env python3
"""Check Maddy W8 summary + LongVV-specific weekly hours."""
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
MADDY = "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I"

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)

def fetch(sheet_id, rng):
    try:
        resp = svc.spreadsheets().values().get(spreadsheetId=sheet_id, range=rng).execute()
        return resp.get("values", [])
    except Exception as e:
        return [["ERROR: " + str(e)]]

def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!", "N/A"):
        return 0.0
    try:
        return float(str(val).strip().replace(",", "."))
    except:
        return 0.0

# Summary tab
summary = fetch(MADDY, "Summary!A1:E20")
print("Summary tab:")
for r in summary:
    print(" ", r)

# W8 tab - all rows, sum by owner
w8_rows = fetch(MADDY, "W8!A:I")
by_owner = {}
total = 0.0
for row in w8_rows:
    if not row: continue
    a = str(row[0]).strip()
    if "task dự án" not in a.lower(): continue
    owner = str(row[6]).strip() if len(row) > 6 else ""
    h = parse_hours(str(row[7]).strip() if len(row) > 7 else "")
    by_owner[owner] = by_owner.get(owner, 0.0) + h
    total += h

print(f"\nW8 Task dự án hours by owner: {json.dumps(by_owner, ensure_ascii=False)}")
print(f"W8 grand total: {total}h")
