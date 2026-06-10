#!/usr/bin/env python3
"""
Bailey Invoice Verification Script
Compares invoice items against WBS Billing sheet and Est vs Charged task log.
"""

import json
import sys
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = "config/daily-agent-490610-7eb7985b33e3.json"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

WBS_BILLING_ID = "1rp0URMjhaOnEe3T_M0o6JbC2av1hno_rdkLIEdWeP4U"
EST_CHARGED_ID = "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg"
RATE = 30  # $/hour

INVOICE = [
    {"name": "Weekly Monitor May 2026", "hours": 5.0, "amount": 150},
    {"name": "[Prestashop] Mobile Menu Modal", "hours": 13.5, "amount": 405},
    {"name": "[Maintenance] Update GLS on Console", "hours": 10.0, "amount": 300},
    {"name": "[Prestashop] [Grazing Software] Herd Custom Date Selection", "hours": 5.0, "amount": 150},
    {"name": "[Prestashop] [Grazing Software] Setup Map: Unassigned Paddock Deletion Modal", "hours": 8.0, "amount": 240},
    {"name": "[Console] [Mobile] Update on Transport Scanning", "hours": 23.5, "amount": 705},
]

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

def get_sheet_names(service, sheet_id):
    meta = service.spreadsheets().get(spreadsheetId=sheet_id).execute()
    return [(s["properties"]["sheetId"], s["properties"]["title"]) for s in meta["sheets"]]

def normalize(text):
    return text.lower().replace("[", "").replace("]", "").replace("  ", " ").strip()

def find_match(task_name, rows, name_col=1):
    """Fuzzy match task name against sheet rows."""
    norm_task = normalize(task_name)
    best = None
    best_score = 0
    for i, row in enumerate(rows):
        if len(row) <= name_col:
            continue
        cell = normalize(str(row[name_col]))
        # Count matching words
        task_words = set(norm_task.split())
        cell_words = set(cell.split())
        common = task_words & cell_words
        if len(common) > best_score:
            best_score = len(common)
            best = (i, row)
    # Only return if at least 2 words match (avoid false positives)
    if best_score >= 2:
        return best
    return None

def main():
    service = get_service()

    # --- Get WBS Billing sheet names ---
    print("Fetching WBS Billing sheet tabs...")
    wbs_sheets = get_sheet_names(service, WBS_BILLING_ID)
    print(f"  WBS tabs: {[t for _, t in wbs_sheets]}")

    # --- Read Main Tasks - Payment ---
    print("Reading Main Tasks - Payment...")
    main_rows = get_range(service, WBS_BILLING_ID, "Main Tasks - Payment!A:L")
    print(f"  {len(main_rows)} rows")

    # --- Read Miscellaneous Tasks - Payment ---
    print("Reading Miscellaneous Tasks - Payment...")
    misc_rows = get_range(service, WBS_BILLING_ID, "Miscellaneous Tasks - Payment!A:L")
    print(f"  {len(misc_rows)} rows")

    # --- Read Est vs Charged ---
    print("Reading Est vs Charged...")
    est_rows = get_range(service, EST_CHARGED_ID, "Est vs Charged!A:L")
    print(f"  {len(est_rows)} rows")

    # Print headers for debugging
    if main_rows:
        print(f"\nMain Tasks headers: {main_rows[0]}")
    if misc_rows:
        print(f"Misc Tasks headers: {misc_rows[0]}")
    if est_rows:
        print(f"Est vs Charged headers: {est_rows[0]}")

    # --- Match each invoice item ---
    results = []
    for item in INVOICE:
        name = item["name"]
        inv_hrs = item["hours"]
        inv_amt = item["amount"]

        # Search in Main Tasks first, then Misc
        wbs_match = find_match(name, main_rows[1:] if main_rows else [], name_col=1)
        source = "Main Tasks"
        if not wbs_match:
            wbs_match = find_match(name, misc_rows[1:] if misc_rows else [], name_col=1)
            source = "Misc Tasks"

        # Search in Est vs Charged
        est_match = find_match(name, est_rows[1:] if est_rows else [], name_col=0)

        results.append({
            "name": name,
            "inv_hrs": inv_hrs,
            "inv_amt": inv_amt,
            "wbs_row": wbs_match[1] if wbs_match else None,
            "wbs_source": source if wbs_match else "NOT FOUND",
            "wbs_idx": wbs_match[0] if wbs_match else None,
            "est_row": est_match[1] if est_match else None,
        })

    # Print raw matches for inspection
    print("\n" + "="*80)
    print("RAW MATCH RESULTS")
    print("="*80)
    for r in results:
        print(f"\n[{r['name']}]")
        print(f"  Invoice: {r['inv_hrs']}h = ${r['inv_amt']}")
        print(f"  WBS ({r['wbs_source']}): {r['wbs_row']}")
        print(f"  Est vs Charged: {r['est_row']}")

    return results, main_rows, misc_rows, est_rows

if __name__ == "__main__":
    main()
