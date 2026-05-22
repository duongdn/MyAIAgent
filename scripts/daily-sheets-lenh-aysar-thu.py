#!/usr/bin/env python3
"""Check LeNH hours specifically in Aysar W25 on Thu 21/05/26.
Also recheck Rory W12 Thu rows with full detail.
Also get KhanhHH total from Aysar (separate from Generator).
"""
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

AYSAR_ID  = "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8"
RORY_ID   = "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8"
FRANC_ID  = "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ"

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)

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
    try:
        return float(str(val).strip().replace(",", "."))
    except ValueError:
        return 0.0

THU = "21/05/26"

def extract_thu_by_owner(rows, date_token):
    """Extract Thu entries, grouped by owner (col G = index 6)."""
    in_block = False
    owner_hours = {}
    all_entries = []

    for i, row in enumerate(rows):
        cell_a = str(row[0]).strip() if row else ""

        if date_token in cell_a:
            in_block = True
            day_total = parse_hours(row[7]) if len(row) > 7 else 0.0
            print(f"  Found Thu block at row {i}: day_total={day_total}h")
            continue

        if not in_block:
            continue

        import re
        if cell_a and re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s*\d{1,2}/\d{2}/\d{2}", cell_a) and date_token not in cell_a:
            break  # Next day

        task_type = cell_a
        owner = row[6].strip() if len(row) > 6 else ""
        hrs = parse_hours(row[7]) if len(row) > 7 else 0.0

        if hrs > 0:
            all_entries.append({"type": task_type, "owner": owner, "hours": hrs, "row": i})
            if owner not in owner_hours:
                owner_hours[owner] = 0.0
            if "task dự án" in task_type.lower() or "task du an" in task_type.lower():
                owner_hours[owner] += hrs

    return owner_hours, all_entries


print("=" * 60)
print("AYSAR W25 — Thu 21/05/26 entries by owner")
print("=" * 60)
rows_a = fetch_tab(AYSAR_ID, "W25")
owner_hrs_a, entries_a = extract_thu_by_owner(rows_a, THU)
print(f"  Owner hours: {owner_hrs_a}")
print(f"  All entries: {entries_a}")

print("\n" + "=" * 60)
print("RORY W12 — Thu 21/05/26 entries by owner")
print("=" * 60)
rows_r = fetch_tab(RORY_ID, "W12")
owner_hrs_r, entries_r = extract_thu_by_owner(rows_r, THU)
print(f"  Owner hours: {owner_hrs_r}")
print(f"  All entries: {entries_r}")

print("\n" + "=" * 60)
print("FRANC W25 — Thu 21/05/26 entries by owner")
print("=" * 60)
rows_f = fetch_tab(FRANC_ID, "W25")
owner_hrs_f, entries_f = extract_thu_by_owner(rows_f, THU)
print(f"  Owner hours: {owner_hrs_f}")
print(f"  All entries: {entries_f}")

# LeNH summary
print("\n" + "=" * 60)
print("LeNH TOTAL Thu 21/05/26")
print("=" * 60)
lenh_total = (owner_hrs_r.get("LeNH", 0) + owner_hrs_f.get("LeNH", 0) + owner_hrs_a.get("LeNH", 0))
print(f"  Rory: {owner_hrs_r.get('LeNH', 0)}h")
print(f"  Franc: {owner_hrs_f.get('LeNH', 0)}h")
print(f"  Aysar: {owner_hrs_a.get('LeNH', 0)}h")
print(f"  TOTAL: {lenh_total}h")
print(f"  ALERT: {lenh_total == 0}")

# KhanhHH summary (Generator + Aysar)
print("\n" + "=" * 60)
print("KhanhHH TOTAL Thu 21/05/26 (Generator + Aysar)")
print("=" * 60)
khanh_aysar = owner_hrs_a.get("KhanhHH", 0)
khanh_gen = 0.0  # Already confirmed 0h from Generator W41
print(f"  Generator W41: {khanh_gen}h")
print(f"  Aysar W25: {khanh_aysar}h")
print(f"  TOTAL: {khanh_gen + khanh_aysar}h")
alert_khanh = (khanh_gen + khanh_aysar) == 0
print(f"  ALERT: {alert_khanh}")
