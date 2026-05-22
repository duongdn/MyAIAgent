#!/usr/bin/env python3
"""Probe date format in sheets — find the actual token pattern for W27 Thu (May 21, 2026).
Print first 80 rows of each sheet to see date patterns and column layout.
"""
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
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

def get_sheet_names(sheet_id):
    try:
        meta = svc.spreadsheets().get(spreadsheetId=sheet_id).execute()
        return [s["properties"]["title"] for s in meta.get("sheets", [])]
    except Exception as e:
        return ["ERROR: " + str(e)]

# For each sheet, get the tab names first, then show last 30 rows of current week tab
for name, sid in SHEETS.items():
    tabs = get_sheet_names(sid)
    print(f"\n=== {name} ({sid[:20]}...) ===")
    print(f"Tabs: {tabs}")

    # Look for W27 or May tab
    w27_tab = None
    for t in tabs:
        if "W27" in t or "27" in t or "May" in t or "T5" in t.upper() or "week" in t.lower():
            w27_tab = t
            break

    # Also try just reading A:L from default (first sheet or named W27)
    if w27_tab:
        rows = fetch(sid, f"'{w27_tab}'!A:L")
        print(f"  [Tab: {w27_tab}] First 30 rows:")
    else:
        # Try current week tab - check if there's a tab with 18 or 21 in name
        current_tab = None
        for t in tabs:
            if any(kw in t for kw in ["18/05", "21/05", "W27", "current", "Tháng 5"]):
                current_tab = t
                break
        if current_tab:
            rows = fetch(sid, f"'{current_tab}'!A:L")
            print(f"  [Tab: {current_tab}] First 30 rows:")
        else:
            rows = fetch(sid, "A:L")
            print(f"  [Default tab] First 30 rows:")

    for i, row in enumerate(rows[:30]):
        if row:
            print(f"    {i:3d}: {row[:8]}")
