#!/usr/bin/env python3
"""Daily sheets scan for 2026-06-08 (Monday) — checks Friday Jun 6 daily hours + W29 weekly totals."""
import json, re, sys
from datetime import date, timedelta
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/var/www/MyDailyAgent/config/daily-agent-490610-7eb7985b33e3.json"

# Sheets to check (developer → sheet ID)
SHEETS = {
    "LongVV":   {"id": "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I", "weekly_min": 16, "daily_min": 0},
    "PhucVT":   {"id": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "weekly_min": 40, "daily_min": 8},
    "TuanNT_JohnYi":  {"id": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "weekly_min": 40, "daily_min": 8},
    "TuanNT_Rebecca": {"id": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "weekly_min": 0, "daily_min": 0},
    "VietPH":   {"id": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "weekly_min": 40, "daily_min": 8},
    "KhanhHH":  {"id": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "weekly_min": 40, "daily_min": 8},
    "LeNH_Rory": {"id": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "weekly_min": 0, "daily_min": 0},
    "LeNH_Franc": {"id": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "weekly_min": 0, "daily_min": 0},
    "LeNH_Aysar": {"id": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "weekly_min": 0, "daily_min": 0},
}

# W29: Jun 1-7 2026 (Mon-Sun). Today is Jun 8 (Mon = start of W30)
TARGET_WEEK = "W29"
TARGET_FRIDAY = date(2026, 6, 6)  # Last Friday

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc_api = build("sheets", "v4", credentials=creds, cache_discovery=False)


def fetch(sheet_id, rng):
    try:
        resp = svc_api.spreadsheets().values().get(
            spreadsheetId=sheet_id, range=rng
        ).execute()
        return resp.get("values", [])
    except Exception as e:
        print(f"  Error fetching {rng}: {e}", file=sys.stderr)
        return []


def get_summary_tab(sheet_id, target_week):
    """Get weekly total from Summary tab."""
    rows = fetch(sheet_id, "Summary!A:D")
    for row in rows:
        if len(row) >= 1 and str(row[0]).strip() == target_week:
            # Col D is the grand total (already aggregated)
            total = row[3] if len(row) > 3 else "0"
            try:
                return float(str(total).replace(",", "."))
            except:
                return 0.0
    return None  # Week not found


def parse_hours(val):
    """Parse hour value from cell."""
    if not val or str(val).strip() in ("", "-", "—", "nghỉ"):
        return 0.0
    s = str(val).strip()
    # Handle "nghỉ cả ngày" / "nghỉ nửa ngày"
    if "nghi" in s.lower() or "nghỉ" in s:
        return -1  # flag as leave
    try:
        return float(s.replace(",", "."))
    except:
        return 0.0


results = {}

for dev, cfg in SHEETS.items():
    sheet_id = cfg["id"]
    print(f"\nChecking {dev}...", file=sys.stderr)

    # Get W29 weekly total from Summary
    weekly = get_summary_tab(sheet_id, TARGET_WEEK)

    results[dev] = {
        "sheet": sheet_id,
        "weekly_total": weekly,
        "target_week": TARGET_WEEK,
        "daily_min": cfg["daily_min"],
        "weekly_min": cfg["weekly_min"],
    }

    print(f"  W29 total: {weekly}h", file=sys.stderr)

print("\n" + "=" * 50)
print(json.dumps(results, indent=2))
