#!/usr/bin/env python3
"""Fountain scan for W33 (Jun 29 - Jul 5, 2026). Parts 2+3 actuals, 4 capacity, 5 over-estimate."""
import json, re, sys
from googleapiclient.discovery import build
from google.oauth2 import service_account
from datetime import date

SVC = "/var/www/MyDailyAgent/config/daily-agent-490610-7eb7985b33e3.json"
FOUNTAIN_SHEET = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o"
TARGET_MONDAY = date(2026, 6, 29)
TARGET_FRIDAY = date(2026, 7, 4)

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"])
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)

def fetch(rng, sheet_id=FOUNTAIN_SHEET):
    try:
        resp = svc.spreadsheets().values().get(spreadsheetId=sheet_id, range=rng).execute()
        return resp.get("values", [])
    except Exception as e:
        print(f"  ERROR fetching {rng}: {e}", file=sys.stderr)
        return []

def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!", "N/A"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try: return float(s)
    except: return 0.0

def parse_date_cell(val):
    s = str(val).strip()
    s = re.sub(r"^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*", "", s)
    try:
        parts = s.split("/")
        if len(parts) == 3:
            d, m, y = int(parts[0]), int(parts[1]), int(parts[2])
            y += 2000 if y < 100 else 0
            return date(y, m, d)
    except: pass
    try:
        from datetime import datetime
        return datetime.strptime(s, "%B %d, %Y").date()
    except: pass
    return None

# Find W33 tab via Summary
print("Finding W33 tab...", file=sys.stderr)
summary_rows = fetch("Summary!A:D")
fountain_tab = None
for row in summary_rows:
    if len(row) < 3: continue
    tab = str(row[0]).strip()
    if not re.match(r"W\d+", tab): continue
    start_d = parse_date_cell(str(row[1]))
    end_d = parse_date_cell(str(row[2]))
    if start_d and end_d and start_d <= TARGET_MONDAY <= end_d:
        fountain_tab = tab
        print(f"  W33 = {tab} ({start_d}→{end_d})", file=sys.stderr)
        break

if not fountain_tab:
    print("  ERROR: Could not find W33 tab", file=sys.stderr)
    sys.exit(1)

# Part 2: Summary tab for per-dev W33 totals
print(f"Getting {fountain_tab} totals from Summary...", file=sys.stderr)
smry_rows = fetch("Summary!A:AM")
smry_dev_hours = {}
ALL_DEVS = ["ViTHT", "ThinhT", "VuTQ", "HaVS", "DatNT", "LamLQ", "PhatDLT", "HungPN"]

for i, row in enumerate(smry_rows):
    if not row: continue
    if str(row[0]).strip() == fountain_tab:
        header_row = None
        for j in range(max(0, i-5), i):
            r = smry_rows[j] if j < len(smry_rows) else []
            row_text = " ".join(str(c) for c in r)
            if any(n in row_text for n in ["ViTHT", "ThinhT", "VuTQ", "PhatDLT"]):
                header_row = r
                break
        if header_row:
            for ci, col_name in enumerate(header_row):
                name = str(col_name).strip()
                for dev in ALL_DEVS:
                    if dev in name and dev not in smry_dev_hours:
                        val = row[ci] if ci < len(row) else ""
                        smry_dev_hours[dev] = parse_hours(val)
        break

print(f"  Summary dev hours: {smry_dev_hours}", file=sys.stderr)

# Parts 4+5: Est vs Charged tab
print("\nFetching Est vs Charged...", file=sys.stderr)
est_rows = fetch("Est vs Charged!A:M")

DONE_STATUSES = {"Deployed on Live", "Cancelled", "Has Bug on Live", "Tested on Live"}
tasks = []
header = None

for i, row in enumerate(est_rows):
    if not row: continue
    if header is None:
        row_text = " ".join(str(c) for c in row).lower()
        if "task" in row_text or "estimated" in row_text or "actual" in row_text:
            header = row
            print(f"  Header row {i}: {row[:12]}", file=sys.stderr)
            continue
        continue
    if len(row) < 9: continue
    task_id_raw = str(row[0]).strip()
    if not task_id_raw or task_id_raw.startswith("Task") or task_id_raw == "#": continue
    status = str(row[2]).strip() if len(row) > 2 else ""
    est_raw = parse_hours(row[8]) if len(row) > 8 else 0.0
    cr = parse_hours(row[9]) if len(row) > 9 else 0.0
    actual = parse_hours(row[10]) if len(row) > 10 else 0.0
    total_est = est_raw + cr
    if total_est == 0 and actual == 0: continue
    tasks.append({"id": task_id_raw, "name": str(row[1]).strip()[:60] if len(row)>1 else "",
                  "status": status, "est": est_raw, "cr": cr, "total_est": total_est, "actual": actual})

print(f"  Total tasks with data: {len(tasks)}", file=sys.stderr)

active_narrow = [t for t in tasks if t["status"] not in DONE_STATUSES and
                 (t["status"] in {"Not Started"} or "In-progress" in t["status"])]
active_broad = [t for t in tasks if t["status"] not in DONE_STATUSES]

remaining_narrow = sum(max(0, t["total_est"] - t["actual"]) for t in active_narrow)

# W33 capacity: ViTHT:36+ThinhT:20+DatNT:24+VuTQ:8 = 88h/wk
dev_capacity_wk = 88
runway_narrow = remaining_narrow / dev_capacity_wk

print(f"  NS+IP remaining: {remaining_narrow:.1f}h across {len(active_narrow)} tasks", file=sys.stderr)
print(f"  Runway NS+IP: {runway_narrow:.2f} wk", file=sys.stderr)

print("\n  Active NS+IP tasks:", file=sys.stderr)
for t in active_narrow:
    print(f"    #{t['id']}: est={t['total_est']}h actual={t['actual']}h remain={max(0,t['total_est']-t['actual']):.1f}h | {t['status']}", file=sys.stderr)

over_est = []
for t in tasks:
    if t["total_est"] > 0 and t["actual"] > t["total_est"] * 1.2:
        over_pct = round((t["actual"] / t["total_est"] - 1) * 100, 1)
        over_est.append({**t, "over_pct": over_pct})

over_est.sort(key=lambda x: x["over_pct"], reverse=True)
print(f"\n  Over-estimate (>20%): {len(over_est)}", file=sys.stderr)
for t in over_est[:15]:
    print(f"    #{t['id']}: {t['over_pct']}% | actual={t['actual']}h | est+cr={t['total_est']}h | {t['status']}", file=sys.stderr)

print("\n" + "="*60, file=sys.stderr)
result = {
    "tab": fountain_tab,
    "dev_hours_weekly": smry_dev_hours,
    "capacity": {
        "wk_capacity_h": dev_capacity_wk,
        "ns_ip_tasks": len(active_narrow),
        "ns_ip_remaining": round(remaining_narrow, 1),
        "ns_ip_runway_wk": round(runway_narrow, 2),
        "ns_ip_task_list": [{"id":t["id"],"total_est":t["total_est"],"actual":t["actual"],
                              "remain":round(max(0,t["total_est"]-t["actual"]),1),"status":t["status"]}
                             for t in active_narrow],
    },
    "over_estimate": over_est[:20],
    "total_tasks": len(tasks),
}
print(json.dumps(result, indent=2))
