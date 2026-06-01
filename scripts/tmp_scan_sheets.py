import json
import sys
from google.oauth2 import service_account
import googleapiclient.discovery as gd

SA_FILE = "/var/www/MyDailyAgent/config/daily-agent-490610-7eb7985b33e3.json"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

creds = service_account.Credentials.from_service_account_file(SA_FILE, scopes=SCOPES)
service = gd.build("sheets", "v4", credentials=creds)

SHEETS = {
    "Maddy":         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JohnYi":        "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca":       "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "JamesDiamond":  "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "Rory":          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc":         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar":         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    "Generator":     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooOsdHkeEM",
    "Paturevision":  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    "Fountain":      "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
    "Elena":         "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
}

def get_sheet_tabs(sheet_id):
    meta = service.spreadsheets().get(spreadsheetId=sheet_id).execute()
    return [s["properties"]["title"] for s in meta["sheets"]]

def get_range(sheet_id, tab, rng):
    result = service.spreadsheets().values().get(
        spreadsheetId=sheet_id,
        range=f"'{tab}'!{rng}"
    ).execute()
    return result.get("values", [])

print("=== Scanning all sheets for Friday 2026-05-29 ===\n", flush=True)

for sheet_name, sheet_id in SHEETS.items():
    print(f"\n{'='*50}", flush=True)
    print(f"Sheet: {sheet_name}", flush=True)
    try:
        tabs = get_sheet_tabs(sheet_id)
        print(f"  Tabs: {tabs}", flush=True)

        for tab in tabs:
            if tab.lower() in ["summary", "tổng", "tong"]:
                continue
            try:
                data = get_range(sheet_id, tab, "A1:V200")
            except Exception as e:
                print(f"    Tab '{tab}' error: {e}", flush=True)
                continue

            if not data:
                continue

            friday_rows = []
            for i, row in enumerate(data):
                if not row:
                    continue
                row_str = "|".join(str(c) for c in row[:6])
                if "29/5" in row_str or "29/05" in row_str:
                    friday_rows.append((i, row))

            if friday_rows:
                print(f"  Tab '{tab}' — {len(friday_rows)} Friday rows:", flush=True)
                for idx, row in friday_rows:
                    print(f"    Row {idx+1}: {row}", flush=True)

    except Exception as e:
        print(f"  ERROR: {e}", flush=True)
