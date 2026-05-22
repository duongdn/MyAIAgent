#!/usr/bin/env python3
"""Verify gaps: Paturevision, Aysar, KhanhHH (Generator W41 Thu details), LeNH Rory/Franc Thu details.
- Paturevision: date may be in different format or different tab
- Aysar: same issue
- Generator W41: show all days present, entries around Thu 21/05/26
- Rory W12, Franc W25: show all days and entries around Thu 21/05/26
"""
import json
import re
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
}

# Also check VuTQ in Paturevision
THU_TOKEN = "21/05/26"
MAY_TOKENS = ["21/05", "05/21", "May 21", "21 May", "T5"]

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)


def get_tab_names(sheet_id):
    try:
        meta = svc.spreadsheets().get(spreadsheetId=sheet_id).execute()
        return [s["properties"]["title"] for s in meta.get("sheets", [])]
    except Exception as e:
        return []


def fetch_tab(sheet_id, tab, rng="A:H"):
    try:
        resp = svc.spreadsheets().values().get(
            spreadsheetId=sheet_id, range=f"'{tab}'!{rng}"
        ).execute()
        return resp.get("values", [])
    except Exception as e:
        return [["ERROR: " + str(e)]]


def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def search_all_tabs_for_may21(sheet_name, sheet_id):
    """Search every tab for any May 21 related date string."""
    tabs = get_tab_names(sheet_id)
    w_tabs = [t for t in tabs if t.startswith("W") and t[1:].isdigit()]

    # Search each tab
    for tab in w_tabs:
        rows = fetch_tab(sheet_id, tab, "A:H")
        for i, row in enumerate(rows):
            cell_a = str(row[0]).strip() if row else ""
            # Check any May-21 variant
            if "21/05" in cell_a or "05/21" in cell_a:
                print(f"\n  [{sheet_name}] Found in tab {tab}, row {i}: {row[:8]}")
                # Print surrounding rows
                start = max(0, i-1)
                end = min(len(rows), i+20)
                for j in range(start, end):
                    r = rows[j]
                    if r:
                        print(f"    row {j:3d}: {r[:8]}")
                return tab, rows, i

    # Also try non-W tabs
    non_w = [t for t in tabs if not (t.startswith("W") and t[1:].isdigit())]
    for tab in non_w:
        rows = fetch_tab(sheet_id, tab, "A:H")
        for i, row in enumerate(rows):
            cell_a = str(row[0]).strip() if row else ""
            if "21/05" in cell_a or "05/21" in cell_a:
                print(f"\n  [{sheet_name}] Found in NON-W tab {tab}, row {i}: {row[:8]}")
                return tab, rows, i

    print(f"\n  [{sheet_name}] NOT FOUND in any tab")
    return None, None, None


def show_tab_dates(sheet_name, sheet_id, tab):
    """Show all date rows in a specific tab to understand coverage."""
    rows = fetch_tab(sheet_id, tab, "A:H")
    print(f"\n  [{sheet_name}] Tab {tab} — date rows and entries:")
    for i, row in enumerate(rows):
        if not row:
            continue
        cell_a = str(row[0]).strip()
        # Date rows
        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s*\d{1,2}/\d{2}/\d{2}", cell_a):
            print(f"    row {i:3d}: DATE = {cell_a!r} | hours_col8 = {row[7] if len(row)>7 else 'N/A'}")
        elif len(row) > 7 and parse_hours(row[7]) > 0:
            # Entry with hours
            owner = row[6] if len(row) > 6 else ""
            print(f"    row {i:3d}: entry type={cell_a!r} owner={owner!r} hrs={row[7]}")


# Main investigation
print("=" * 60)
print("PATUREVISION — searching all tabs for 21/05/26")
print("=" * 60)
pv_tab, pv_rows, pv_idx = search_all_tabs_for_may21("Paturevision", SHEETS["Paturevision"])
# Also show what the most recent W-tabs look like
tabs = get_tab_names(SHEETS["Paturevision"])
w_tabs = sorted([t for t in tabs if t.startswith("W") and t[1:].isdigit()], key=lambda x: int(x[1:]))
# Show last 3 W-tabs date rows
print("\nPaturevision recent W-tabs date coverage:")
for tab in w_tabs[-4:]:
    rows = fetch_tab(SHEETS["Paturevision"], tab, "A:H")
    date_rows = [str(r[0]).strip() for r in rows if r and re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun)", str(r[0]))]
    hrs_header = rows[1][7] if len(rows) > 1 and len(rows[1]) > 7 else "?"
    print(f"  {tab}: total_hrs={hrs_header!r} | dates: {date_rows}")

print("\n" + "=" * 60)
print("AYSAR — searching all tabs for 21/05/26")
print("=" * 60)
aysar_tab, aysar_rows, aysar_idx = search_all_tabs_for_may21("Aysar", SHEETS["Aysar"])
tabs_a = get_tab_names(SHEETS["Aysar"])
w_tabs_a = sorted([t for t in tabs_a if t.startswith("W") and t[1:].isdigit()], key=lambda x: int(x[1:]))
print("\nAysar recent W-tabs date coverage:")
for tab in w_tabs_a[-4:]:
    rows = fetch_tab(SHEETS["Aysar"], tab, "A:H")
    date_rows = [str(r[0]).strip() for r in rows if r and re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun)", str(r[0]))]
    hrs_header = rows[1][7] if len(rows) > 1 and len(rows[1]) > 7 else "?"
    print(f"  {tab}: total_hrs={hrs_header!r} | dates: {date_rows}")

print("\n" + "=" * 60)
print("GENERATOR W41 — all days + Thu entries")
print("=" * 60)
show_tab_dates("Generator", SHEETS["Generator"], "W41")

print("\n" + "=" * 60)
print("RORY W12 — all days + Thu entries")
print("=" * 60)
show_tab_dates("Rory", SHEETS["Rory"], "W12")

print("\n" + "=" * 60)
print("FRANC W25 — all days + Thu entries")
print("=" * 60)
show_tab_dates("Franc", SHEETS["Franc"], "W25")
