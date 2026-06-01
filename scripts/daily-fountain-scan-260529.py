#!/usr/bin/env python3
"""Fountain check for 2026-05-29 (Thursday).

Parts 2+3: Task log actuals (Summary tab) + plan vs actual table.
Part 4: Capacity & runway (Est vs Charged tab).
Part 5: Over-estimate tracking (tasks #2595, #2615, #2735).
Part 1 (Matrix plan) handled separately via Node.js matrix script.
VuTQ moved to Bailey — 0h in Fountain is expected.
TrinhMTT is NOT QC — exclude from QC alerts.
HaVS only flagged if named in that week's Matrix plan.
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

# ---- Part 2+3: Summary tab — current week actuals ----
print("Fetching Fountain Summary tab...", file=sys.stderr)
summary_rows = fetch(FOUNTAIN_ID, "Summary!A:AH")

names_row_data = None
names_row_idx = None
curr_week_row = None
prev_week_row = None
curr_week_label = None
prev_week_label = None

# Find the latest week row (highest W number)
week_rows = {}
for i, row in enumerate(summary_rows):
    row_str = " ".join(str(c) for c in row)
    if any(name in row_str for name in ["ViTHT", "ThinhT", "VuTQ", "PhatDLT", "HungPN"]):
        names_row_idx = i
        names_row_data = row
    if row and str(row[0]).strip().startswith("W") and str(row[0]).strip()[1:].isdigit():
        wnum = int(str(row[0]).strip()[1:])
        week_rows[wnum] = (str(row[0]).strip(), row)

if week_rows:
    max_w = max(week_rows.keys())
    curr_week_label, curr_week_row = week_rows[max_w]
    if max_w - 1 in week_rows:
        prev_week_label, prev_week_row = week_rows[max_w - 1]
    print(f"Current week: {curr_week_label}, prev: {prev_week_label}", file=sys.stderr)

# Build column map from names row
col_map = {}
if names_row_data:
    for ci, cell in enumerate(names_row_data):
        name = str(cell).strip()
        if name in ("ViTHT", "ThinhT", "VuTQ", "PhatDLT", "HungPN", "HaVS", "TrinhMTT"):
            if name not in col_map:
                col_map[name] = ci

print(f"Column map: {col_map}", file=sys.stderr)

curr_actuals = {}
prev_actuals = {}

if curr_week_row and col_map:
    for dev, col in col_map.items():
        val = curr_week_row[col] if col < len(curr_week_row) else ""
        curr_actuals[dev] = parse_hours(val)

if prev_week_row and col_map:
    for dev, col in col_map.items():
        val = prev_week_row[col] if col < len(prev_week_row) else ""
        prev_actuals[dev] = parse_hours(val)

results["parts"]["2_actuals"] = {
    "week": curr_week_label,
    "curr_actuals": curr_actuals,
    "prev_actuals_for_comparison": prev_actuals,
    "prev_week": prev_week_label,
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

for row in est_rows[1:]:
    if not row or len(row) < 2:
        continue
    task_id = str(row[0]).strip()
    task_name = str(row[1]).strip() if len(row) > 1 else ""
    status = str(row[2]).strip() if len(row) > 2 else ""

    est_i = parse_hours(row[8]) if len(row) > 8 else 0.0
    est_j = parse_hours(row[9]) if len(row) > 9 else 0.0   # CR column
    est_total = est_i + est_j
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

dev_capacity_per_week = 90.0
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
