#!/usr/bin/env python3
"""Fountain W28 check for 2026-05-26.

Parts 2+3: Task log actuals (Summary tab) + plan vs actual table.
Part 4: Capacity & runway (Est vs Charged tab).
Part 5: Over-estimate tracking (tasks where actual > est +20%).
Part 1 (Matrix plan) handled separately via Node.js matrix script.
VuTQ moved to Bailey — 0h in Fountain is expected.
TrinhMTT is NOT QC — exclude from QC alerts.
"""
import json
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
FOUNTAIN_ID = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o"

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


def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!", "#REF!"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


results = {"parts": {}}

# ---- Part 2+3: Summary tab — W28 actuals ----
print("Fetching Fountain Summary tab...", file=sys.stderr)
summary_rows = fetch(FOUNTAIN_ID, "Summary!A:AH")

# Find header/names row and W28 row
names_row_data = None
names_row_idx = None
w28_row_data = None
w27_row_data = None

for i, row in enumerate(summary_rows):
    row_str = " ".join(str(c) for c in row)
    if any(name in row_str for name in ["ViTHT", "ThinhT", "VuTQ", "PhatDLT", "HungPN"]):
        names_row_idx = i
        names_row_data = row
    if row and str(row[0]).strip() == "W28":
        w28_row_data = row
    if row and str(row[0]).strip() == "W27":
        w27_row_data = row

# Build column map from names row
col_map = {}
if names_row_data:
    for ci, cell in enumerate(names_row_data):
        name = str(cell).strip()
        if name in ("ViTHT", "ThinhT", "VuTQ", "PhatDLT", "HungPN", "HaVS", "TrinhMTT"):
            if name not in col_map:
                col_map[name] = ci

print(f"Column map: {col_map}", file=sys.stderr)
print(f"W28 row found: {w28_row_data is not None}", file=sys.stderr)

w28_actuals = {}
w27_actuals = {}

if w28_row_data and col_map:
    for dev, col in col_map.items():
        val = w28_row_data[col] if col < len(w28_row_data) else ""
        w28_actuals[dev] = parse_hours(val)

if w27_row_data and col_map:
    for dev, col in col_map.items():
        val = w27_row_data[col] if col < len(w27_row_data) else ""
        w27_actuals[dev] = parse_hours(val)

results["parts"]["2_actuals"] = {
    "week": "W28",
    "w28_actuals": w28_actuals,
    "w27_actuals_for_comparison": w27_actuals,
    "note": "VuTQ moved to Bailey — 0h expected. TrinhMTT NOT QC.",
}

# ---- Part 4: Capacity & Runway (Est vs Charged tab) ----
print("Fetching Est vs Charged tab...", file=sys.stderr)
est_rows = fetch(FOUNTAIN_ID, "Est vs Charged!A:L")

remaining_est = 0.0
total_est = 0.0
total_charged = 0.0
key_tasks = {}
KEY_TASK_IDS = {"2595", "2615", "2735"}

# Col layout: A=task_id, B=task_name, C=status, I=est_col, J=CR_col (total = I+J)
for row in est_rows[1:]:  # skip header
    if not row or len(row) < 2:
        continue
    task_id = str(row[0]).strip()
    task_name = str(row[1]).strip() if len(row) > 1 else ""
    status = str(row[2]).strip() if len(row) > 2 else ""

    est_i = parse_hours(row[8]) if len(row) > 8 else 0.0
    est_j = parse_hours(row[9]) if len(row) > 9 else 0.0   # CR column
    est_total = est_i + est_j  # total estimate = col I + col J (CR)
    charged = parse_hours(row[10]) if len(row) > 10 else 0.0

    total_est += est_total
    total_charged += charged

    if status.lower() in ("not started", "in progress", "in-progress"):
        remaining_est += est_total

    if task_id in KEY_TASK_IDS:
        key_tasks[task_id] = {
            "name": task_name,
            "status": status,
            "est_i": est_i,
            "est_j_cr": est_j,
            "est_total": est_total,
            "charged": charged,
            "over_est": charged > est_total * 1.2 if est_total > 0 else False,
        }

dev_capacity_per_week = 90.0  # current Fountain dev capacity
runway_weeks = remaining_est / dev_capacity_per_week if dev_capacity_per_week > 0 else 0

results["parts"]["4_capacity"] = {
    "total_est": round(total_est, 2),
    "total_charged": round(total_charged, 2),
    "remaining_est": round(remaining_est, 2),
    "dev_capacity_per_week_h": dev_capacity_per_week,
    "runway_weeks": round(runway_weeks, 2),
    "note": "remaining = Not Started + In-Progress tasks only; est = col_I + col_J(CR)",
}

# ---- Part 5: Over-estimate tracking ----
over_est_tasks = []
for row in est_rows[1:]:
    if not row or len(row) < 2:
        continue
    task_id = str(row[0]).strip()
    task_name = str(row[1]).strip() if len(row) > 1 else ""
    status = str(row[2]).strip() if len(row) > 2 else ""
    est_i = parse_hours(row[8]) if len(row) > 8 else 0.0
    est_j = parse_hours(row[9]) if len(row) > 9 else 0.0
    est_total = est_i + est_j
    charged = parse_hours(row[10]) if len(row) > 10 else 0.0

    if est_total > 0 and charged > est_total * 1.2:
        over_est_tasks.append({
            "task_id": task_id,
            "name": task_name[:60],
            "est": round(est_total, 2),
            "charged": round(charged, 2),
            "over_by_pct": round((charged - est_total) / est_total * 100, 1),
        })

results["parts"]["5_over_estimate"] = {
    "key_tasks": key_tasks,
    "all_over_est_tasks": over_est_tasks[:15],
    "total_over_est_count": len(over_est_tasks),
}

print(json.dumps(results, indent=2, ensure_ascii=False))
