#!/usr/bin/env python3
"""Deep investigation for unmatched invoice items."""

import json
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = "config/daily-agent-490610-7eb7985b33e3.json"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
WBS_BILLING_ID = "1rp0URMjhaOnEe3T_M0o6JbC2av1hno_rdkLIEdWeP4U"
EST_CHARGED_ID = "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg"

def get_service():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    return build("sheets", "v4", credentials=creds)

def get_range(service, sheet_id, range_name):
    result = service.spreadsheets().values().get(
        spreadsheetId=sheet_id, range=range_name
    ).execute()
    return result.get("values", [])

def search_rows(rows, keywords, col=None):
    """Search rows for any keyword match."""
    results = []
    for i, row in enumerate(rows):
        text = " ".join(row).lower() if col is None else (row[col].lower() if len(row) > col else "")
        if any(kw.lower() in text for kw in keywords):
            results.append((i, row))
    return results

def main():
    service = get_service()

    print("="*80)
    print("1. SEARCH MAIN TASKS for 'transport', 'GLS', 'monitor', 'weekly'")
    print("="*80)
    main_rows = get_range(service, WBS_BILLING_ID, "Main Tasks - Payment!A:L")
    print(f"Total main rows: {len(main_rows)}")
    hits = search_rows(main_rows, ["transport", "GLS", "monitor", "weekly", "gls", "scanning"])
    for i, row in hits:
        print(f"  Row {i+1}: {row}")

    print("\n" + "="*80)
    print("2. SEARCH MISC TASKS for 'transport', 'GLS', 'monitor', 'weekly'")
    print("="*80)
    misc_rows = get_range(service, WBS_BILLING_ID, "Miscellaneous Tasks - Payment!A:L")
    print(f"Total misc rows: {len(misc_rows)}")
    hits = search_rows(misc_rows, ["transport", "GLS", "monitor", "weekly", "gls", "scanning"])
    for i, row in hits:
        print(f"  Row {i+1}: {row}")

    print("\n" + "="*80)
    print("3. SEARCH MAINTENANCE TASKS for all items")
    print("="*80)
    maint_rows = get_range(service, WBS_BILLING_ID, "Maintenance Tasks - Payment!A:L")
    print(f"Total maintenance rows: {len(maint_rows)}")
    for i, row in enumerate(maint_rows[:10]):
        print(f"  Row {i+1}: {row}")
    hits = search_rows(maint_rows, ["transport", "GLS", "monitor", "weekly", "gls", "scanning"])
    for i, row in hits:
        print(f"  Row {i+1}: {row}")

    print("\n" + "="*80)
    print("4. ALL MISC TASKS rows (for context on Task 65-70)")
    print("="*80)
    for i, row in enumerate(misc_rows):
        if any(x in str(row) for x in ["Task 6", "Task 7", "transport", "Transport", "GLS", "Monitor", "monitor"]):
            print(f"  Row {i+1}: {row}")

    print("\n" + "="*80)
    print("5. EST VS CHARGED - full scan for invoice items")
    print("="*80)
    est_rows = get_range(service, EST_CHARGED_ID, "Est vs Charged!A:L")
    print(f"Total est rows: {len(est_rows)}")
    hits = search_rows(est_rows, ["transport", "GLS", "monitor", "weekly", "scanning", "mobile"])
    for i, row in hits:
        print(f"  Row {i+1}: {row}")

    print("\n" + "="*80)
    print("6. ALL MISC TASKS rows full list (last 30 rows)")
    print("="*80)
    for i, row in enumerate(misc_rows[-30:]):
        actual_idx = len(misc_rows) - 30 + i
        if row:  # skip empty
            print(f"  Row {actual_idx+1}: {row}")

if __name__ == "__main__":
    main()
