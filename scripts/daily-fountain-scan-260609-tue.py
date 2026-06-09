#!/usr/bin/env python3
"""Fountain check for 2026-06-09 (Tuesday) — W30 (Jun 8-14, 2026).

Parts 2+3: Task log actuals (Summary tab) + plan vs actual table.
Part 4: Capacity & runway (Est vs Charged tab).
Part 5: Over-estimate tracking (tasks #2595, #2615, #2735).
Part 1 (Matrix plan) handled separately via Node.js matrix script.
VuTQ is back on Fountain from W29 (moved away from Bailey).
TrinhMTT is NOT QC — exclude from QC alerts.
HaVS only flagged if named in that week's Matrix plan.
IMPORTANT: 0h actuals on ANY working day (including first day of week) must be flagged —
  never dismiss as "expected". Devs on 40h/week plan should log 8h/day.
"""
import json
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
FOUNTAIN_ID = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o"

# Devs on 40h/week plan (flag if 0h after first working day)
DEVS_40H = {"ViTHT", "DatNT", "VuTQ"}
# Devs on other schedules
DEVS_20H = {"ThinhT"}
# QC devs (PhatDLT is active QC; HungPN secondary; TrinhMTT is NOT QC)
QC_DEVS = {"PhatDLT", "HungPN"}

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
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!", "#REF!", "Chưa", "0"):
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

# Flag devs with 0h — scan is on Tue Jun 9, Mon Jun 8 was a working day
# 0h weekly total at day 2 = Monday hours not logged = ALERT (never "expected")
zero_h_alerts = []
for dev, hours in curr_actuals.items():
    if dev == "TrinhMTT":
        continue  # TrinhMTT not QC, separate concern
    expected_h = 20.0 if dev in DEVS_20H else (40.0 if dev in DEVS_40H else 8.0)
    if hours == 0.0:
        zero_h_alerts.append({
            "dev": dev,
            "actual": hours,
            "note": f"⚠️ 0h logged in W30 so far — Mon Jun 8 hours not logged (expected ~8h/day for {expected_h}h/week plan)",
        })

results["parts"]["2_actuals"] = {
    "week": curr_week_label,
    "curr_actuals": curr_actuals,
    "prev_actuals_for_comparison": prev_actuals,
    "prev_week": prev_week_label,
    "zero_h_alerts": zero_h_alerts,
    "note": "VuTQ back on Fountain from W29. TrinhMTT NOT QC. 0h on any working day = ALERT, never dismissed.",
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
    task_name = task_id  # ID contains name in this sheet
    # Sheet cols: A=id, G=status, H=dev, I=est, J=CR, K=actual, L=charged
    status = str(row[6]).strip() if len(row) > 6 else ""

    est_i = parse_hours(row[8]) if len(row) > 8 else 0.0
    est_j = parse_hours(row[9]) if len(row) > 9 else 0.0   # CR column
    est_total = est_i + est_j
    charged = parse_hours(row[11]) if len(row) > 11 else 0.0
    actual = parse_hours(row[10]) if len(row) > 10 else 0.0

    total_est += est_total
    total_charged += charged

    # Status matching: "Not Started", "In-progress (<50%)", "In-progress (>50%)"
    sl = status.lower()
    if sl == "not started" or sl.startswith("in-progress") or sl.startswith("in progress"):
        remaining_est += est_total

    # Match key tasks by prefix (task IDs have suffixes like "2595_giftdrop_...")
    for kid in KEY_TASK_IDS:
        if task_id == kid or task_id.startswith(kid + "_") or task_id.startswith(kid + "-"):
            key_tasks[kid] = {
                "name": task_id,
                "status": status,
                "est_i": est_i,
                "est_j_cr": est_j,
                "est_total": est_total,
                "actual": actual,
                "charged": charged,
                "over_est": actual > est_total * 1.2 if est_total > 0 else False,
            }
            break

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
    status = str(row[6]).strip() if len(row) > 6 else ""
    est_i = parse_hours(row[8]) if len(row) > 8 else 0.0
    est_j = parse_hours(row[9]) if len(row) > 9 else 0.0
    est_total = est_i + est_j
    actual = parse_hours(row[10]) if len(row) > 10 else 0.0

    if est_total > 0 and actual > est_total * 1.2:
        over_est_tasks.append({
            "task_id": task_id,
            "name": task_id[:60],
            "est": round(est_total, 2),
            "actual": round(actual, 2),
            "over_by_pct": round((actual - est_total) / est_total * 100, 1),
        })

results["parts"]["5_over_estimate"] = {
    "key_tasks": key_tasks,
    "all_over_est_tasks": over_est_tasks[:15],
    "total_over_est_count": len(over_est_tasks),
}

print(json.dumps(results, indent=2, ensure_ascii=False))
