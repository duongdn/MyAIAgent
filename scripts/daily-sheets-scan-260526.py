#!/usr/bin/env python3
"""Daily sheets scan for 2026-05-26 (Tuesday).

Checks Monday 2026-05-25 hours (W28 day 1).
W28: May 25–29, 2026.
Rules:
- "Nghỉ cả ngày" = full day off → 0h OK
- "Nghỉ nửa ngày" = half day → ≥4h OK
- Only "Task dự án" rows count as official
- Summary col D = grand total (never double-sum per-employee cols)
- LongVV: 16h/wk target on Maddy ONLY; 0h days are normal
- VuTQ: moved to Bailey (Paturevision) — 0h in Fountain is expected
"""
import json
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",   # LongVV (16h/wk, part-time)
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",   # TuanNT
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",   # TuanNT + LeNH(Q-T cols)
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",   # VietPH + VuTQ(Bailey)
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",   # KhanhHH
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",   # LeNH
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",   # LeNH
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",   # LeNH
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",   # PhucVT
}

# W28: Mon 25/05/26 → Fri 29/05/26
W28_MON_TOKEN = "25/05/26"
MON_DATE_TOKEN = "25/05/26"

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)


def fetch(sheet_id, rng, retries=3):
    for i in range(retries):
        try:
            resp = svc.spreadsheets().values().get(
                spreadsheetId=sheet_id, range=rng
            ).execute()
            return resp.get("values", [])
        except Exception as e:
            if i == retries - 1:
                return [["ERROR: " + str(e)]]
    return []


def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def find_day_block(rows, date_token):
    for i, row in enumerate(rows):
        if row and date_token in str(row[0]):
            return i
    return -1


def extract_daily_hours(rows, date_token, owner_col=6, hours_col=7, type_col=0):
    """Extract hours for a date from a task log sheet.

    Returns dict: { owner -> (official_hours, leave_note) }
    Only 'Task dự án' rows count as official.
    Checks for leave notes in the date-header row.
    """
    start_idx = find_day_block(rows, date_token)
    if start_idx == -1:
        return {}, "DATE_NOT_FOUND"

    date_row = rows[start_idx]
    leave_note = None
    date_str = str(date_row[0]) if date_row else ""
    if "Nghỉ cả ngày" in date_str:
        leave_note = "Nghỉ cả ngày"
    elif "Nghỉ nửa ngày" in date_str:
        leave_note = "Nghỉ nửa ngày"

    owner_hours = {}
    # Scan from day_start+1 until next day block or end
    for i in range(start_idx + 1, len(rows)):
        row = rows[i]
        if not row:
            continue
        cell0 = str(row[0]).strip() if row else ""
        # Stop at next date block (contains "/" date token format)
        if len(cell0) >= 6 and "/" in cell0 and any(c.isdigit() for c in cell0) and cell0 != date_str:
            # check if it looks like a date token
            if cell0.count("/") >= 2 or (cell0.count("/") == 1 and len(cell0) < 15):
                break

        row_type = str(row[type_col]).strip() if len(row) > type_col else ""
        if row_type not in ("Task dự án",):
            continue

        owner = str(row[owner_col]).strip() if len(row) > owner_col else ""
        hours_raw = str(row[hours_col]).strip() if len(row) > hours_col else ""
        hrs = parse_hours(hours_raw)
        if owner:
            owner_hours[owner] = owner_hours.get(owner, 0.0) + hrs

    return owner_hours, leave_note


def get_w28_summary(sheet_id, sheet_name="Summary"):
    """Get W28 total from Summary col D."""
    rows = fetch(sheet_id, f"{sheet_name}!A1:D60")
    for row in rows:
        if row and str(row[0]).strip() == "W28":
            return parse_hours(row[3]) if len(row) > 3 else None
    return None


results = {}

# ---- Maddy (LongVV: 16h/wk part-time, 0h days normal) ----
print("Checking Maddy (LongVV)...", file=sys.stderr)
try:
    # Try W28 tab first, fall back to scanning for date
    rows_maddy = fetch(SHEETS["Maddy"], "W28!A:K")
    if not rows_maddy or (len(rows_maddy) == 1 and "ERROR" in str(rows_maddy[0])):
        rows_maddy = fetch(SHEETS["Maddy"], "A:K")
    hours_maddy, leave_maddy = extract_daily_hours(rows_maddy, MON_DATE_TOKEN)
    w28_summary_maddy = get_w28_summary(SHEETS["Maddy"])
    results["LongVV"] = {
        "sheet": "Maddy",
        "monday_hours": hours_maddy,
        "leave_note": leave_maddy,
        "w28_summary_total": w28_summary_maddy,
        "target_weekly": 16,
        "rule": "part-time 16h/wk; 0h days are normal — check weekly total only",
    }
except Exception as e:
    results["LongVV"] = {"error": str(e)}

# ---- JamesDiamond (PhucVT: 8h/day) ----
print("Checking JamesDiamond (PhucVT)...", file=sys.stderr)
try:
    rows_jd = fetch(SHEETS["JamesDiamond"], "W28!A:K")
    if not rows_jd or (len(rows_jd) == 1 and "ERROR" in str(rows_jd[0])):
        rows_jd = fetch(SHEETS["JamesDiamond"], "A:K")
    hours_jd, leave_jd = extract_daily_hours(rows_jd, MON_DATE_TOKEN)
    results["PhucVT"] = {
        "sheet": "JamesDiamond",
        "monday_hours": hours_jd,
        "leave_note": leave_jd,
        "target_daily": 8,
    }
except Exception as e:
    results["PhucVT"] = {"error": str(e)}

# ---- JohnYi (TuanNT: 8h/day combined across projects) ----
print("Checking JohnYi (TuanNT)...", file=sys.stderr)
try:
    rows_jy = fetch(SHEETS["JohnYi"], "W28!A:K")
    if not rows_jy or (len(rows_jy) == 1 and "ERROR" in str(rows_jy[0])):
        rows_jy = fetch(SHEETS["JohnYi"], "A:K")
    hours_jy, leave_jy = extract_daily_hours(rows_jy, MON_DATE_TOKEN)
    results["TuanNT_JohnYi"] = {
        "sheet": "JohnYi",
        "monday_hours": hours_jy,
        "leave_note": leave_jy,
        "target_daily": 8,
    }
except Exception as e:
    results["TuanNT_JohnYi"] = {"error": str(e)}

# ---- Rebecca (TuanNT + LeNH col Q-T, check col P for "Chưa") ----
print("Checking Rebecca (TuanNT/LeNH)...", file=sys.stderr)
try:
    rows_rb = fetch(SHEETS["Rebecca"], "W28!A:T")
    if not rows_rb or (len(rows_rb) == 1 and "ERROR" in str(rows_rb[0])):
        rows_rb = fetch(SHEETS["Rebecca"], "A:T")
    hours_rb, leave_rb = extract_daily_hours(rows_rb, MON_DATE_TOKEN)
    # Check col P for "Chưa" (index 15)
    colP_values = [str(r[15]).strip() if len(r) > 15 else "" for r in rows_rb if r]
    has_chua = any("Chưa" in v for v in colP_values)
    results["TuanNT_Rebecca"] = {
        "sheet": "Rebecca",
        "monday_hours": hours_rb,
        "leave_note": leave_rb,
        "colP_chua": has_chua,
        "note": '"Chưa" in col P = default template state, NOT an alert',
    }
except Exception as e:
    results["TuanNT_Rebecca"] = {"error": str(e)}

# ---- Paturevision (VietPH: 8h/day; VuTQ: now on Bailey, check here) ----
print("Checking Paturevision (VietPH/VuTQ)...", file=sys.stderr)
try:
    rows_pat = fetch(SHEETS["Paturevision"], "W28!A:K")
    if not rows_pat or (len(rows_pat) == 1 and "ERROR" in str(rows_pat[0])):
        rows_pat = fetch(SHEETS["Paturevision"], "A:K")
    hours_pat, leave_pat = extract_daily_hours(rows_pat, MON_DATE_TOKEN)
    results["VietPH"] = {
        "sheet": "Paturevision",
        "monday_hours": hours_pat,
        "leave_note": leave_pat,
        "target_daily": 8,
    }
except Exception as e:
    results["VietPH"] = {"error": str(e)}

# ---- Generator (KhanhHH: 8h/day) ----
print("Checking Generator (KhanhHH)...", file=sys.stderr)
try:
    rows_gen = fetch(SHEETS["Generator"], "W28!A:K")
    if not rows_gen or (len(rows_gen) == 1 and "ERROR" in str(rows_gen[0])):
        rows_gen = fetch(SHEETS["Generator"], "A:K")
    hours_gen, leave_gen = extract_daily_hours(rows_gen, MON_DATE_TOKEN)
    results["KhanhHH"] = {
        "sheet": "Generator",
        "monday_hours": hours_gen,
        "leave_note": leave_gen,
        "target_daily": 8,
    }
except Exception as e:
    results["KhanhHH"] = {"error": str(e)}

# ---- LeNH (Rory + Franc + Aysar + Rebecca cols Q-T: 8h/day combined) ----
print("Checking LeNH sheets (Rory/Franc/Aysar)...", file=sys.stderr)
lenh_combined = {}
lenh_leave_notes = {}

for sheet_name, sheet_id in [("Rory", SHEETS["Rory"]), ("Franc", SHEETS["Franc"]), ("Aysar", SHEETS["Aysar"])]:
    try:
        rows_l = fetch(sheet_id, "W28!A:K")
        if not rows_l or (len(rows_l) == 1 and "ERROR" in str(rows_l[0])):
            rows_l = fetch(sheet_id, "A:K")
        hours_l, leave_l = extract_daily_hours(rows_l, MON_DATE_TOKEN)
        lenh_leave_notes[sheet_name] = leave_l
        for owner, hrs in hours_l.items():
            lenh_combined[owner] = lenh_combined.get(owner, 0.0) + hrs
    except Exception as e:
        lenh_leave_notes[sheet_name] = f"ERROR: {e}"

results["LeNH"] = {
    "sheets": ["Rory", "Franc", "Aysar"],
    "monday_hours_combined": lenh_combined,
    "leave_notes": lenh_leave_notes,
    "target_daily": 8,
    "note": "0h in one sheet ≠ alert if working another sheet that day",
}

print(json.dumps(results, indent=2, ensure_ascii=False))
