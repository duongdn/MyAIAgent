#!/usr/bin/env python3
"""Daily sheets scan for 2026-06-02 (Monday).
Tasks:
  1. Check Friday 2026-05-30 hours (last workday) using old week tabs (May 25-31).
  2. Discover new W29 (Jun 1-7) tabs and report partial weekly totals.

Old week tabs (May 25-31):
  Maddy:        W8
  JohnYi:       W25
  Rebecca:      W26
  JamesDiamond: W27 -> PhucVT sheet
  Rory:         W13
  Franc:        W26
  Aysar:        W26
  Generator:    W42 -> KhanhHH sheet
  Paturevision: W29 -> VietPH + VuTQ

New week (Jun 1-7) tabs: discover via Summary sheet or try common patterns.
"""
import json
import re
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

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
    "Elena":         "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
}

# Old week tabs for Friday May 30 check (week May 25-31)
OLD_TABS = {
    "Maddy":         "W8",
    "JohnYi":        "W25",
    "Rebecca":       "W26",
    "JamesDiamond":  "W27",
    "Rory":          "W13",
    "Franc":         "W26",
    "Aysar":         "W26",
    "Generator":     "W42",
    "Paturevision":  "W29",
    "Elena":         None,
}

# Date tokens for Fri May 30 2026
FRI_MAY30_TOKENS = ["Fri, 30/05/26", "30/05/26", "Fri, 30/5/26"]
# Date tokens for Mon Jun 1 2026
MON_JUN1_TOKENS  = ["Mon, 01/06/26", "01/06/26", "Mon, 1/06/26", "1/06/26"]
# Date tokens for Tue Jun 2 2026
TUE_JUN2_TOKENS  = ["Tue, 02/06/26", "02/06/26", "Tue, 2/06/26", "2/06/26"]

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


def fetch_sheet_metadata(sheet_id):
    """Get list of all tab names for a spreadsheet."""
    try:
        resp = svc.spreadsheets().get(spreadsheetId=sheet_id, fields="sheets.properties.title").execute()
        return [s["properties"]["title"] for s in resp.get("sheets", [])]
    except Exception as e:
        return ["ERROR: " + str(e)]


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


def get_weekly_summary(sheet_id, week_tab):
    """Read Summary tab col D for given week tab name."""
    rows = fetch(sheet_id, "Summary!A1:E100")
    for row in rows:
        if row and str(row[0]).strip() == week_tab:
            val = str(row[3]).strip() if len(row) > 3 else ""
            return parse_hours(val)
    return None


def discover_new_week_tab(sheet_id, old_tab, candidates=None):
    """Discover the tab for new week Jun 1-7.
    Strategy: get all tabs, find the one after old_tab.
    """
    tabs = fetch_sheet_metadata(sheet_id)
    if tabs and "ERROR" in str(tabs[0]):
        return None, tabs[0]

    # Filter to W-tabs (W1, W2, ..., W99) only
    w_tabs = [t for t in tabs if re.match(r"^W\d+$", t)]

    if old_tab in w_tabs:
        idx = w_tabs.index(old_tab)
        if idx + 1 < len(w_tabs):
            return w_tabs[idx + 1], None

    # Try Summary sheet to find the row after old_tab
    sum_rows = fetch(sheet_id, "Summary!A1:A100")
    if sum_rows:
        sum_tabs = [str(r[0]).strip() for r in sum_rows if r]
        if old_tab in sum_tabs:
            idx = sum_tabs.index(old_tab)
            if idx + 1 < len(sum_tabs):
                candidate = sum_tabs[idx + 1]
                if re.match(r"^W\d+$", candidate):
                    return candidate, None

    return None, "Could not discover new tab"


def get_weekly_hours_from_tab(sheet_id, week_tab):
    """Sum all Task dự án rows in week tab for partial weekly total."""
    rows = fetch(sheet_id, f"{week_tab}!A:I")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return 0.0, str(rows[0]) if rows else "empty"
    total = 0.0
    for row in rows:
        if not row:
            continue
        row_a = str(row[0]).strip()
        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue
        hrs_val = str(row[7]).strip() if len(row) > 7 else ""
        total += parse_hours(hrs_val)
    return total, None


results = {}

# =========================================================
# PART 1: Friday May 30 — daily hours check
# =========================================================
date_tokens_fri = FRI_MAY30_TOKENS
print("=== PART 1: Friday May 30 daily hours ===", file=sys.stderr)

# --- TuanNT: JohnYi + Rebecca + Paturevision sheets ---
print("Checking TuanNT (JohnYi)...", file=sys.stderr)
rows_jy = fetch(SHEETS["JohnYi"], f"{OLD_TABS['JohnYi']}!A:I")
tuannt_jy, jy_leave, jy_err = extract_daily_hours_by_owner(rows_jy, date_tokens_fri)

print("Checking TuanNT (Rebecca)...", file=sys.stderr)
rows_rb = fetch(SHEETS["Rebecca"], f"{OLD_TABS['Rebecca']}!A:I")
tuannt_rb, rb_leave, rb_err = extract_daily_hours_by_owner(rows_rb, date_tokens_fri)

print("Checking Paturevision (VietPH+VuTQ+TuanNT)...", file=sys.stderr)
rows_pat = fetch(SHEETS["Paturevision"], f"{OLD_TABS['Paturevision']}!A:I")
pat_all, pat_leave, pat_err = extract_daily_hours_by_owner(rows_pat, date_tokens_fri)
tuannt_pat_fri = sum(v for k, v in pat_all.items() if "TuanNT" in k)
vietph_fri = sum(v for k, v in pat_all.items() if "VietPH" in k)
vutq_fri = sum(v for k, v in pat_all.items() if "VuTQ" in k or "Vu" in k.replace("VietPH",""))

results["TuanNT_fri"] = {
    "johnyiHours": sum(tuannt_jy.values()),
    "rebeccaHours": sum(tuannt_rb.values()),
    "paturevisionHours": tuannt_pat_fri,
    "totalHours": sum(tuannt_jy.values()) + sum(tuannt_rb.values()) + tuannt_pat_fri,
    "owners_jy": tuannt_jy,
    "owners_rb": tuannt_rb,
    "owners_pat": {k: v for k, v in pat_all.items() if "TuanNT" in k},
    "leave_jy": jy_leave,
    "leave_rb": rb_leave,
    "leave_pat": pat_leave,
    "err_jy": jy_err,
    "err_rb": rb_err,
    "err_pat": pat_err,
}

# --- PhucVT: JamesDiamond sheet ---
print("Checking PhucVT (JamesDiamond)...", file=sys.stderr)
rows_jd = fetch(SHEETS["JamesDiamond"], f"{OLD_TABS['JamesDiamond']}!A:I")
phucvt_fri, jd_leave, jd_err = extract_daily_hours_by_owner(rows_jd, date_tokens_fri)
results["PhucVT_fri"] = {
    "hours": sum(phucvt_fri.values()),
    "owners": phucvt_fri,
    "leave": jd_leave,
    "err": jd_err,
}

# --- VietPH: from Paturevision (already fetched) ---
results["VietPH_fri"] = {
    "hours": vietph_fri,
    "allOwners": pat_all,
    "leave": pat_leave,
    "err": pat_err,
}
results["VuTQ_fri"] = {
    "hours": vutq_fri,
    "leave": pat_leave,
    "err": pat_err,
    "note": "Paturevision shared with VietPH",
}

# --- KhanhHH: Generator sheet ---
print("Checking KhanhHH (Generator)...", file=sys.stderr)
rows_gen = fetch(SHEETS["Generator"], f"{OLD_TABS['Generator']}!A:I")
khanhhh_fri, gen_leave, gen_err = extract_daily_hours_by_owner(rows_gen, date_tokens_fri)
results["KhanhHH_fri"] = {
    "hours": sum(khanhhh_fri.values()),
    "owners": khanhhh_fri,
    "leave": gen_leave,
    "err": gen_err,
}

# --- LeNH: Rory + Franc + Aysar + Rebecca (Q-T cols) ---
print("Checking LeNH (Rory+Franc+Aysar+Rebecca)...", file=sys.stderr)
rows_rory = fetch(SHEETS["Rory"], f"{OLD_TABS['Rory']}!A:I")
lenh_rory, rory_leave, rory_err = extract_daily_hours_by_owner(rows_rory, date_tokens_fri)

rows_franc = fetch(SHEETS["Franc"], f"{OLD_TABS['Franc']}!A:I")
lenh_franc, franc_leave, franc_err = extract_daily_hours_by_owner(rows_franc, date_tokens_fri)

rows_aysar = fetch(SHEETS["Aysar"], f"{OLD_TABS['Aysar']}!A:I")
lenh_aysar, aysar_leave, aysar_err = extract_daily_hours_by_owner(rows_aysar, date_tokens_fri)

rebecca_lenh_hrs, rb_owners_lenh, rb_leave_lenh, rb_lenh_err = check_rebecca_lenh(
    SHEETS["Rebecca"], OLD_TABS["Rebecca"], date_tokens_fri
)
lenh_fri_total = (
    sum(lenh_rory.values())
    + sum(lenh_franc.values())
    + sum(lenh_aysar.values())
    + rebecca_lenh_hrs
)
results["LeNH_fri"] = {
    "roryHours": sum(lenh_rory.values()),
    "francHours": sum(lenh_franc.values()),
    "aysarHours": sum(lenh_aysar.values()),
    "rebeccaLeNHHours": rebecca_lenh_hrs,
    "totalHours": lenh_fri_total,
    "leave": {**rory_leave, **franc_leave, **aysar_leave},
    "errors": {"rory": rory_err, "franc": franc_err, "aysar": aysar_err, "rebecca": rb_lenh_err},
    "roryOwners": lenh_rory,
    "francOwners": lenh_franc,
    "aysarOwners": lenh_aysar,
}

# --- LongVV: Maddy sheet ---
print("Checking LongVV (Maddy Fri)...", file=sys.stderr)
rows_maddy_old = fetch(SHEETS["Maddy"], f"{OLD_TABS['Maddy']}!A:I")
longvv_fri, maddy_leave_fri, maddy_err_fri = extract_daily_hours_by_owner(rows_maddy_old, date_tokens_fri)
longvv_old_weekly = get_weekly_summary(SHEETS["Maddy"], OLD_TABS["Maddy"])
results["LongVV_fri"] = {
    "friHours": sum(longvv_fri.values()),
    "oldWeeklyTotal": longvv_old_weekly,
    "weeklyTarget": 16,
    "leave": maddy_leave_fri,
    "err": maddy_err_fri,
    "owners": longvv_fri,
}

# --- Elena: discover old tab ---
print("Checking Elena (old week)...", file=sys.stderr)
elena_tabs = fetch_sheet_metadata(SHEETS["Elena"])
print(f"Elena tabs: {elena_tabs}", file=sys.stderr)
# Try to find Friday May 30 in known tabs
elena_fri_hours = 0
elena_fri_err = "not_checked"
for etab in ["W22", "W25", "W26", "W23", "W24", "W21"]:
    test = fetch(SHEETS["Elena"], f"{etab}!A:I")
    if test and "ERROR" not in str(test[0]):
        fh, _, ferr = extract_daily_hours_by_owner(test, date_tokens_fri)
        if ferr != "DATE_NOT_FOUND":
            elena_fri_hours = sum(fh.values())
            elena_fri_err = ferr
            OLD_TABS["Elena"] = etab
            print(f"Elena tab {etab}: found May 30, hours={elena_fri_hours}", file=sys.stderr)
            break
results["Elena_fri"] = {
    "tab": OLD_TABS.get("Elena"),
    "hours": elena_fri_hours,
    "err": elena_fri_err,
}


# =========================================================
# PART 2: New week W29 (Jun 1-7) — discover tabs and partial totals
# =========================================================
print("\n=== PART 2: New week Jun 1-7 tab discovery ===", file=sys.stderr)

new_tabs = {}
new_week_totals = {}

for sheet_name, old_tab in OLD_TABS.items():
    if old_tab is None:
        continue
    print(f"Discovering new tab for {sheet_name} (after {old_tab})...", file=sys.stderr)
    new_tab, err = discover_new_week_tab(SHEETS[sheet_name], old_tab)
    if new_tab:
        new_tabs[sheet_name] = new_tab
        print(f"  -> {new_tab}", file=sys.stderr)
        # Get partial week total
        total, terr = get_weekly_hours_from_tab(SHEETS[sheet_name], new_tab)
        new_week_totals[sheet_name] = {"tab": new_tab, "partialTotal": total, "err": terr}
    else:
        new_tabs[sheet_name] = None
        new_week_totals[sheet_name] = {"tab": None, "partialTotal": 0, "err": err}
        print(f"  -> FAILED: {err}", file=sys.stderr)

# Also check Mon Jun 1 daily for new tabs
print("\nChecking Mon Jun 1 entries in new tabs...", file=sys.stderr)
new_week_mon_check = {}
for sheet_name, tab in new_tabs.items():
    if not tab:
        continue
    rows = fetch(SHEETS[sheet_name], f"{tab}!A:I")
    mon_hours, mon_leave, mon_err = extract_daily_hours_by_owner(rows, MON_JUN1_TOKENS)
    new_week_mon_check[sheet_name] = {
        "tab": tab,
        "monHours": sum(mon_hours.values()),
        "monOwners": mon_hours,
        "monLeave": mon_leave,
        "monErr": mon_err,
    }

results["new_week_tabs"] = new_tabs
results["new_week_W29_totals"] = new_week_totals
results["new_week_mon_jun1_check"] = new_week_mon_check

print(json.dumps(results, indent=2, ensure_ascii=False))
