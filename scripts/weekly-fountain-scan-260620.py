#!/usr/bin/env python3
"""Weekly Fountain scan for W31 (June 15-19, 2026).
Parts 2-5 of the mandatory Fountain 5-part check.
"""
import json
import re
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account
from datetime import date

SVC = "/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json"
FOUNTAIN_SHEET = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o"

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)

TARGET_MONDAY = date(2026, 6, 15)
TARGET_FRIDAY = date(2026, 6, 19)


def fetch(rng, sheet_id=FOUNTAIN_SHEET):
    try:
        resp = svc.spreadsheets().values().get(
            spreadsheetId=sheet_id, range=rng
        ).execute()
        return resp.get("values", [])
    except Exception as e:
        print(f"  ERROR fetching {rng}: {e}", file=sys.stderr)
        return []


def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!", "N/A"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def parse_date_cell(val):
    s = str(val).strip()
    s = re.sub(r"^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*", "", s)
    try:
        parts = s.split("/")
        if len(parts) == 3:
            d, m, y = int(parts[0]), int(parts[1]), int(parts[2])
            y += 2000 if y < 100 else 0
            return date(y, m, d)
    except Exception:
        pass
    try:
        from datetime import datetime
        return datetime.strptime(s, "%B %d, %Y").date()
    except Exception:
        pass
    return None


# ── Find W31 tab via Summary ───────────────────────────────────────────────────
print("Finding W31 tab...", file=sys.stderr)
summary_rows = fetch("Summary!A:D")
fountain_tab = None
for row in summary_rows:
    if len(row) < 3:
        continue
    tab = str(row[0]).strip()
    if not re.match(r"W\d+", tab):
        continue
    start_d = parse_date_cell(str(row[1]))
    end_d = parse_date_cell(str(row[2]))
    if start_d and end_d and start_d <= TARGET_MONDAY <= end_d:
        fountain_tab = tab
        print(f"  W31 = {tab} ({start_d}→{end_d})", file=sys.stderr)
        break

if not fountain_tab:
    print("  ERROR: Could not find W31 tab", file=sys.stderr)
    print(json.dumps({"error": "tab_not_found"}))
    sys.exit(1)

# ── Part 2: Per-dev weekly totals from W-tab ───────────────────────────────────
FOUNTAIN_DEVS = ["ViTHT", "ThinhT", "VuTQ", "HaVS", "DatNT", "LamLQ"]
FOUNTAIN_QC = ["PhatDLT", "HungPN"]

print(f"Scanning {fountain_tab} for weekly totals...", file=sys.stderr)
wtab_rows = fetch(f"{fountain_tab}!A:J")

owner_totals = {}
leave_info = {}
current_dt = None

for row in wtab_rows:
    if not row:
        continue
    cell_a = str(row[0]).strip()
    d = parse_date_cell(cell_a)
    if d and TARGET_MONDAY <= d <= TARGET_FRIDAY:
        current_dt = d
        if "Nghỉ cả ngày" in cell_a:
            leave_info.setdefault("ALL", []).append(f"{d.strftime('%a')} Nghỉ cả ngày")
        elif "Nghỉ nửa ngày" in cell_a:
            leave_info.setdefault("ALL", []).append(f"{d.strftime('%a')} Nghỉ nửa ngày")
        continue
    if current_dt is None:
        continue
    if d and d > TARGET_FRIDAY:
        break
    if any(kw in cell_a for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
        owner = str(row[6]).strip() if len(row) > 6 else "ALL"
        leave_info.setdefault(owner, []).append(f"{current_dt.strftime('%a')} {cell_a}")
        continue
    is_task_row = "task dự án" in cell_a.lower() or "task du an" in cell_a.lower()
    owner = str(row[6]).strip() if len(row) > 6 else ""
    if not is_task_row and not (cell_a == "" and owner):
        continue
    hrs = parse_hours(str(row[7]).strip() if len(row) > 7 else "")
    if owner and hrs > 0:
        owner_totals[owner] = owner_totals.get(owner, 0.0) + hrs

print(f"  Owner totals: {owner_totals}", file=sys.stderr)

# Also try Summary tab for per-dev breakdown
smry_rows = fetch("Summary!A:AM")
smry_dev_hours = {}
header_row = None

for i, row in enumerate(smry_rows):
    if not row:
        continue
    if str(row[0]).strip() == fountain_tab:
        for j in range(max(0, i-5), i):
            r = smry_rows[j] if j < len(smry_rows) else []
            row_text = " ".join(str(c) for c in r)
            if any(n in row_text for n in ["ViTHT", "ThinhT", "VuTQ", "PhatDLT"]):
                header_row = r
                break
        if header_row:
            for ci, col_name in enumerate(header_row):
                name = str(col_name).strip()
                for dev in FOUNTAIN_DEVS + FOUNTAIN_QC + ["HaVS"]:
                    if dev in name and dev not in smry_dev_hours:
                        val = row[ci] if ci < len(row) else ""
                        smry_dev_hours[dev] = parse_hours(val)
        break

print(f"  Summary dev hours: {smry_dev_hours}", file=sys.stderr)

dev_hours = {}
all_tracked = FOUNTAIN_DEVS + FOUNTAIN_QC + ["HaVS"]
for dev in all_tracked:
    if dev in smry_dev_hours and smry_dev_hours[dev] > 0:
        dev_hours[dev] = smry_dev_hours[dev]
    elif dev in owner_totals:
        dev_hours[dev] = owner_totals[dev]
    else:
        dev_hours[dev] = 0.0

for k, v in owner_totals.items():
    if k not in dev_hours:
        dev_hours[k] = v

# ── Parts 4+5: Est vs Charged tab ─────────────────────────────────────────────
print("\nFetching Est vs Charged...", file=sys.stderr)
est_rows = fetch("Est vs Charged!A:M")

DONE_STATUSES = {"Deployed on Live", "Cancelled", "Has Bug on Live", "Tested on Live"}

tasks = []
header = None

for i, row in enumerate(est_rows):
    if not row:
        continue
    if header is None:
        row_text = " ".join(str(c) for c in row).lower()
        if "task" in row_text or "estimated" in row_text or "actual" in row_text:
            header = row
            print(f"  Header row {i}: {row[:12]}", file=sys.stderr)
            continue
        continue

    if len(row) < 9:
        continue

    task_id_raw = str(row[0]).strip()
    if not task_id_raw or task_id_raw.startswith("Task") or task_id_raw == "#":
        continue

    task_name = str(row[1]).strip() if len(row) > 1 else ""
    status = str(row[2]).strip() if len(row) > 2 else ""
    est_raw = parse_hours(row[8]) if len(row) > 8 else 0.0   # Col I
    cr = parse_hours(row[9]) if len(row) > 9 else 0.0        # Col J (CR)
    actual = parse_hours(row[10]) if len(row) > 10 else 0.0  # Col K
    charged = parse_hours(row[11]) if len(row) > 11 else 0.0 # Col L

    total_est = est_raw + cr
    if total_est == 0 and actual == 0:
        continue

    tasks.append({
        "id": task_id_raw,
        "name": task_name[:60],
        "status": status,
        "est": est_raw,
        "cr": cr,
        "total_est": total_est,
        "actual": actual,
        "charged": charged,
    })

print(f"  Total tasks: {len(tasks)}", file=sys.stderr)

active_narrow = [t for t in tasks if (
    t["status"] not in DONE_STATUSES and
    (t["status"] in {"Not Started"} or "In-progress" in t["status"])
)]
active_broad = [t for t in tasks if t["status"] not in DONE_STATUSES]

remaining_narrow = sum(max(0, t["total_est"] - t["actual"]) for t in active_narrow)
remaining_broad = sum(max(0, t["total_est"] - t["actual"]) for t in active_broad)

# W30 capacity was 100h/wk (ViTHT:40+ThinhT:20+DatNT:40); update when W31 plan fetched
dev_capacity_wk = 100
runway_narrow = remaining_narrow / dev_capacity_wk if dev_capacity_wk > 0 else 0
runway_broad = remaining_broad / dev_capacity_wk if dev_capacity_wk > 0 else 0

print(f"  Active narrow: {len(active_narrow)}, remaining: {remaining_narrow:.1f}h", file=sys.stderr)
print(f"  Active broad: {len(active_broad)}, remaining: {remaining_broad:.1f}h", file=sys.stderr)

# Over-estimate: actual > (est + cr) * 1.2
over_est = []
for t in tasks:
    if t["total_est"] > 0 and t["actual"] > t["total_est"] * 1.2:
        over_pct = round((t["actual"] / t["total_est"] - 1) * 100, 1)
        over_est.append({
            "id": t["id"],
            "name": t["name"],
            "status": t["status"],
            "est": t["est"],
            "cr": t["cr"],
            "total_est": t["total_est"],
            "actual": t["actual"],
            "over_pct": over_pct,
        })

over_est.sort(key=lambda x: x["over_pct"], reverse=True)
print(f"  Over-estimate tasks (>20%): {len(over_est)}", file=sys.stderr)
for t in over_est[:10]:
    print(f"    #{t['id']}: {t['over_pct']}% over | actual={t['actual']}h | est+cr={t['total_est']}h | {t['status']}", file=sys.stderr)

# Key tracked tasks
KEY_TASKS = {"2595", "2615", "2702", "2716", "2742", "2816", "2837", "2872", "2695", "2640", "2735"}
key_task_data = {t["id"]: t for t in tasks if t["id"] in KEY_TASKS}

result = {
    "tab": fountain_tab,
    "dev_hours": dev_hours,
    "owner_totals_raw": owner_totals,
    "leave": leave_info,
    "capacity": {
        "dev_capacity_wk": dev_capacity_wk,
        "active_narrow_count": len(active_narrow),
        "remaining_narrow": round(remaining_narrow, 1),
        "runway_narrow_wk": round(runway_narrow, 2),
        "active_broad_count": len(active_broad),
        "remaining_broad": round(remaining_broad, 1),
        "runway_broad_wk": round(runway_broad, 2),
        "active_narrow_tasks": [{"id": t["id"], "name": t["name"][:40], "status": t["status"],
                                  "total_est": t["total_est"], "actual": t["actual"],
                                  "remaining": round(max(0, t["total_est"]-t["actual"]), 1)}
                                 for t in active_narrow[:20]],
    },
    "over_estimate": over_est[:20],
    "key_tasks": key_task_data,
    "total_tasks": len(tasks),
}

print("\n" + "="*60, file=sys.stderr)
print(json.dumps(result, indent=2, ensure_ascii=False))
