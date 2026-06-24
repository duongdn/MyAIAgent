#!/usr/bin/env python3
"""Daily sheets scan for 2026-05-30 (Friday) + current week W totals.
Week May 25-31:
  Maddy:        W8  (May 25-31)
  JohnYi:       W25 (May 25-31)
  Rebecca:      W26 (May 25-31)
  JamesDiamond: W27 (May 25-31) → PhucVT sheet
  Rory:         W13 (May 25-31)
  Franc:        W26 (May 25-31)
  Aysar:        W26 (May 25-31)
  Generator:    W42 (May 25-31) → KhanhHH sheet
  Paturevision: W29 (May 25-31) → VietPH + VuTQ
"""
import json
import re
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/var/www/MyDailyAgent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":         "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JohnYi":        "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca":       "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "JamesDiamond":  "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "Rory":          "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc":         "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar":         "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    "Generator":     "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Paturevision":  "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
}

# Week tabs for May 25-31 (same as Thu scan)
CURR_TABS = {
    "Maddy":         "W8",
    "JohnYi":        "W25",
    "Rebecca":       "W26",
    "JamesDiamond":  "W27",
    "Rory":          "W13",
    "Franc":         "W26",
    "Aysar":         "W26",
    "Generator":     "W42",
    "Paturevision":  "W29",
}

# Date tokens for Fri May 30 2026
FRI_MAY30_TOKENS = ["Fri, 30/05/26", "30/05/26", "Fri, 30/5/26"]

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
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!", "N/A"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def find_day_block(rows, date_tokens):
    for i, row in enumerate(rows):
        cell = str(row[0]).strip() if row else ""
        for tok in date_tokens:
            if tok in cell:
                return i
    return -1


def extract_daily_hours_by_owner(rows, date_tokens, hours_col=7):
    """Extract hours grouped by owner for a specific date block.
    Only 'Task dự án' rows count. Returns: owner_hours, leave_notes, error.
    """
    start_idx = find_day_block(rows, date_tokens)
    if start_idx == -1:
        return {}, {}, "DATE_NOT_FOUND"

    owner_hours = {}
    leave_notes = {}
    global_leave = None

    header_row = rows[start_idx]
    header_str = str(header_row[0]).strip() if header_row else ""
    if "Nghỉ cả ngày" in header_str:
        global_leave = "Nghỉ cả ngày"
    elif "Nghỉ nửa ngày" in header_str:
        global_leave = "Nghỉ nửa ngày"

    for row in rows[start_idx + 1:]:
        if not row:
            continue
        row_a = str(row[0]).strip()

        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}/\d{2}/\d{2}", row_a):
            break
        if re.match(r"\d{1,2}/\d{2}/\d{2}", row_a) and not any(tok in row_a for tok in date_tokens):
            break

        if any(kw in row_a for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            owner = str(row[6]).strip() if len(row) > 6 and row[6] else "ALL"
            leave_notes[owner] = row_a
            if owner == "ALL":
                global_leave = row_a
            continue

        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue

        owner = str(row[6]).strip() if len(row) > 6 else ""
        if not owner:
            continue

        hrs_val = str(row[hours_col]).strip() if len(row) > hours_col else ""
        hrs = parse_hours(hrs_val)
        owner_hours[owner] = owner_hours.get(owner, 0.0) + hrs

    if global_leave and not leave_notes:
        leave_notes["ALL"] = global_leave

    return owner_hours, leave_notes, None


def check_rebecca_lenh(sheet_id, week_tab, date_tokens):
    """Rebecca sheet: LeNH hours in cols Q-T (index 16-19)."""
    rows = fetch(sheet_id, f"{week_tab}!A:T")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return 0.0, {}, {}, str(rows[0]) if rows else "empty"

    start_idx = find_day_block(rows, date_tokens)
    if start_idx == -1:
        return 0.0, {}, {}, "DATE_NOT_FOUND"

    lenh_hours = 0.0
    owner_hours = {}
    leave_notes = {}

    for row in rows[start_idx + 1:]:
        if not row:
            continue
        row_a = str(row[0]).strip()
        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}/\d{2}/\d{2}", row_a):
            break
        if re.match(r"\d{1,2}/\d{2}/\d{2}", row_a) and not any(tok in row_a for tok in date_tokens):
            break
        if any(kw in row_a for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            owner = str(row[6]).strip() if len(row) > 6 else ""
            if owner:
                leave_notes[owner] = row_a
            continue
        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue

        owner = str(row[6]).strip() if len(row) > 6 else ""
        hrs_h = parse_hours(str(row[7]).strip() if len(row) > 7 else "")
        if owner and hrs_h > 0:
            owner_hours[owner] = owner_hours.get(owner, 0.0) + hrs_h

        for ci in range(16, 20):
            v = parse_hours(str(row[ci]).strip() if len(row) > ci else "")
            lenh_hours += v

    return lenh_hours, owner_hours, leave_notes, None


def get_weekly_summary_from_tab(sheet_id, week_tab):
    """Try to find weekly total from the week tab itself (sum all task rows hours)."""
    rows = fetch(sheet_id, f"{week_tab}!A:I")
    total = 0.0
    for row in rows:
        if not row:
            continue
        row_a = str(row[0]).strip()
        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue
        hrs_val = str(row[7]).strip() if len(row) > 7 else ""
        total += parse_hours(hrs_val)
    return total


def get_weekly_summary(sheet_id, week_tab, owner_filter=None):
    """Read Summary tab to find weekly total for a given week tab.
    Returns the total hours from col D row matching week_tab in col A.
    """
    rows = fetch(sheet_id, "Summary!A1:E100")
    for row in rows:
        if row and str(row[0]).strip() == week_tab:
            val = str(row[3]).strip() if len(row) > 3 else ""
            return parse_hours(val)
    return None


def get_weekly_hours_from_tab_by_owner(sheet_id, week_tab, owner_filter=None):
    """Sum all 'Task dự án' rows in week tab, optionally filtering by owner (col G)."""
    rows = fetch(sheet_id, f"{week_tab}!A:I")
    total = 0.0
    for row in rows:
        if not row:
            continue
        row_a = str(row[0]).strip()
        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue
        owner = str(row[6]).strip() if len(row) > 6 else ""
        if owner_filter and owner_filter not in owner:
            continue
        hrs_val = str(row[7]).strip() if len(row) > 7 else ""
        total += parse_hours(hrs_val)
    return total


results = {}
date_tokens = FRI_MAY30_TOKENS

# --- TuanNT: JohnYi sheet ---
print("Checking TuanNT (JohnYi)...", file=sys.stderr)
rows_jy = fetch(SHEETS["JohnYi"], f"{CURR_TABS['JohnYi']}!A:I")
tuannt_jy, jy_leave, jy_err = extract_daily_hours_by_owner(rows_jy, date_tokens)
jy_weekly = get_weekly_summary(SHEETS["JohnYi"], CURR_TABS["JohnYi"])

# --- TuanNT: Rebecca sheet ---
print("Checking TuanNT (Rebecca)...", file=sys.stderr)
rows_rb = fetch(SHEETS["Rebecca"], f"{CURR_TABS['Rebecca']}!A:I")
tuannt_rb, rb_leave_tuannt, rb_err_tuannt = extract_daily_hours_by_owner(rows_rb, date_tokens)
rb_weekly = get_weekly_summary(SHEETS["Rebecca"], CURR_TABS["Rebecca"])

results["TuanNT"] = {
    "johnyiFriHours": sum(tuannt_jy.values()),
    "rebeccaFriHours": sum(tuannt_rb.values()),
    "totalFriHours": sum(tuannt_jy.values()) + sum(tuannt_rb.values()),
    "johnyiWeekly": jy_weekly,
    "rebeccaWeekly": rb_weekly,
    "johnyiLeave": jy_leave,
    "rebeccaLeave": rb_leave_tuannt,
    "johnyiErr": jy_err,
    "rebeccaErr": rb_err_tuannt,
    "johnyiOwners": tuannt_jy,
    "rebeccaOwners": tuannt_rb,
}

# --- PhucVT: JamesDiamond sheet ---
print("Checking PhucVT (JamesDiamond)...", file=sys.stderr)
rows_jd = fetch(SHEETS["JamesDiamond"], f"{CURR_TABS['JamesDiamond']}!A:I")
phucvt_hours, jd_leave, jd_err = extract_daily_hours_by_owner(rows_jd, date_tokens)
jd_weekly = get_weekly_summary(SHEETS["JamesDiamond"], CURR_TABS["JamesDiamond"])
results["PhucVT"] = {
    "friHours": sum(phucvt_hours.values()),
    "weeklyTotal": jd_weekly,
    "leave": jd_leave,
    "err": jd_err,
    "owners": phucvt_hours,
}

# --- VietPH: Paturevision sheet ---
print("Checking VietPH (Paturevision)...", file=sys.stderr)
rows_pat = fetch(SHEETS["Paturevision"], f"{CURR_TABS['Paturevision']}!A:I")
pat_all_hours, pat_leave, pat_err = extract_daily_hours_by_owner(rows_pat, date_tokens)
pat_weekly = get_weekly_summary(SHEETS["Paturevision"], CURR_TABS["Paturevision"])
# VietPH and VuTQ both on Paturevision — separate by owner
vietph_fri = sum(v for k, v in pat_all_hours.items() if "VietPH" in k or "Viet" in k)
vutq_fri = sum(v for k, v in pat_all_hours.items() if "VuTQ" in k or "Vu" in k)
# If can't separate, show all
if vietph_fri == 0 and vutq_fri == 0:
    vietph_fri = sum(pat_all_hours.values())
results["VietPH"] = {
    "friHours": vietph_fri,
    "weeklyTotal": pat_weekly,
    "leave": pat_leave,
    "err": pat_err,
    "allOwners": pat_all_hours,
}
results["VuTQ"] = {
    "friHours": vutq_fri,
    "weeklyTotal": pat_weekly,
    "leave": pat_leave,
    "err": pat_err,
    "allOwners": pat_all_hours,
    "note": "Paturevision sheet shared with VietPH",
}

# --- KhanhHH: Generator sheet ---
print("Checking KhanhHH (Generator)...", file=sys.stderr)
rows_gen = fetch(SHEETS["Generator"], f"{CURR_TABS['Generator']}!A:I")
khanhhh_hours, gen_leave, gen_err = extract_daily_hours_by_owner(rows_gen, date_tokens)
gen_weekly = get_weekly_summary(SHEETS["Generator"], CURR_TABS["Generator"])
results["KhanhHH"] = {
    "friHours": sum(khanhhh_hours.values()),
    "weeklyTotal": gen_weekly,
    "leave": gen_leave,
    "err": gen_err,
    "owners": khanhhh_hours,
}

# --- LeNH: Rory + Franc + Aysar + Rebecca sheets ---
print("Checking LeNH (Rory+Franc+Aysar+Rebecca)...", file=sys.stderr)
rows_rory = fetch(SHEETS["Rory"], f"{CURR_TABS['Rory']}!A:I")
lenh_rory, rory_leave, rory_err = extract_daily_hours_by_owner(rows_rory, date_tokens)
rory_weekly = get_weekly_summary(SHEETS["Rory"], CURR_TABS["Rory"])

rows_franc = fetch(SHEETS["Franc"], f"{CURR_TABS['Franc']}!A:I")
lenh_franc, franc_leave, franc_err = extract_daily_hours_by_owner(rows_franc, date_tokens)
franc_weekly = get_weekly_summary(SHEETS["Franc"], CURR_TABS["Franc"])

rows_aysar = fetch(SHEETS["Aysar"], f"{CURR_TABS['Aysar']}!A:I")
lenh_aysar, aysar_leave, aysar_err = extract_daily_hours_by_owner(rows_aysar, date_tokens)
aysar_weekly = get_weekly_summary(SHEETS["Aysar"], CURR_TABS["Aysar"])

# Rebecca LeNH cols Q-T
rebecca_lenh_hrs, rb_owners, rb_leave_lenh, rb_lenh_err = check_rebecca_lenh(
    SHEETS["Rebecca"], CURR_TABS["Rebecca"], date_tokens
)
lenh_fri_total = (
    sum(lenh_rory.values())
    + sum(lenh_franc.values())
    + sum(lenh_aysar.values())
    + rebecca_lenh_hrs
)
lenh_weekly_total = (
    (rory_weekly or 0) + (franc_weekly or 0) + (aysar_weekly or 0)
)
results["LeNH"] = {
    "roryFriHours": sum(lenh_rory.values()),
    "francFriHours": sum(lenh_franc.values()),
    "aysarFriHours": sum(lenh_aysar.values()),
    "rebeccaLeNHFriHours": rebecca_lenh_hrs,
    "totalFriHours": lenh_fri_total,
    "roryWeekly": rory_weekly,
    "francWeekly": franc_weekly,
    "aysarWeekly": aysar_weekly,
    "weeklyTotal": lenh_weekly_total,
    "leave": {**rory_leave, **franc_leave, **aysar_leave},
    "errors": {"rory": rory_err, "franc": franc_err, "aysar": aysar_err, "rebecca": rb_lenh_err},
}

# --- LongVV: Maddy sheet (part-time 16h/wk) ---
print("Checking LongVV (Maddy)...", file=sys.stderr)
rows_maddy = fetch(SHEETS["Maddy"], f"{CURR_TABS['Maddy']}!A:I")
longvv_today, maddy_leave, maddy_err = extract_daily_hours_by_owner(rows_maddy, date_tokens)
longvv_weekly = get_weekly_summary(SHEETS["Maddy"], CURR_TABS["Maddy"])
results["LongVV"] = {
    "friHours": sum(longvv_today.values()),
    "weeklyTotal": longvv_weekly,
    "weeklyTarget": 16,
    "leave": maddy_leave,
    "err": maddy_err,
    "owners": longvv_today,
    "note": "Part-time 16h/wk — 0h days normal; only weekly total matters",
}

print(json.dumps(results, indent=2, ensure_ascii=False))
