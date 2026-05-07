#!/usr/bin/env python3
"""Scan all known task log sheets for KhanhHH presence on Tue 2026-05-05 (W25)."""
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
TARGET_DATE = "05/05/26"  # Tue 2026-05-05
DEV = "khanhhh"

# All known task log sheets
SHEETS = {
    "Maddy": "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "JohnYi": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    "Generator": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Rory": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    "Fountain": "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
}

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds)


def list_tabs(sheet_id):
    meta = svc.spreadsheets().get(spreadsheetId=sheet_id, fields="sheets(properties(title))").execute()
    return [s["properties"]["title"] for s in meta.get("sheets", [])]


def find_dev_in_tab(sheet_id, tab):
    """Return list of (row_num, row_data) where KhanhHH appears in any cell."""
    try:
        data = svc.spreadsheets().values().get(
            spreadsheetId=sheet_id,
            range=f"'{tab}'!A1:T800",
        ).execute().get("values", [])
    except Exception as e:
        return [(0, [f"ERR: {e}"])]
    hits = []
    for ridx, row in enumerate(data):
        cells = " | ".join(str(c) for c in row)
        if DEV in cells.lower():
            hits.append((ridx + 1, row))
    return hits


def main():
    results = {}
    for project, sid in SHEETS.items():
        try:
            tabs = list_tabs(sid)
        except Exception as e:
            results[project] = {"error": str(e)}
            continue

        # Look for tab matching W25 / W?
        target_tabs = [t for t in tabs if t.lower().startswith("w") and len(t) <= 5]
        # Also try common ones
        candidates = []
        for t in tabs:
            if t.lower() in ("w25", "w24", "w22", "w23", "w26", "w39", "w10"):
                candidates.append(t)

        khanh_per_tab = {}
        for tab in candidates if candidates else target_tabs[:3]:
            hits = find_dev_in_tab(sid, tab)
            if hits:
                khanh_per_tab[tab] = [(r, c) for r, c in hits[:5]]

        results[project] = {
            "tabs": tabs[:8],
            "khanhhh_hits": khanh_per_tab,
        }

    print(json.dumps(results, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
