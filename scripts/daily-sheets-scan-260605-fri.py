#!/usr/bin/env python3
"""Daily sheets scan for 2026-06-05 (Friday run).
Checks Thursday 2026-06-04 hours — W29 (June 1-7, 2026).

Notes:
- VuTQ returned to Fountain from W29 (June 1+). Expect 40h/wk in Fountain.
- LongVV: Part-time 16h/wk (Maddy + James Diamond). Check weekly total only.
- TuanNT: JohnYi + Rebecca + Paturevision sheets.
- LeNH: Rory + Franc + Aysar + Rebecca sheets.
"""
import json
import re
import sys
from datetime import date
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
    "Elena":         "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
}

FALLBACK_TABS = {
    "Maddy":         "W9",
    "JohnYi":        "W27",
    "Rebecca":       "W27",
    "JamesDiamond":  "W28",
    "Rory":          "W14",
    "Franc":         "W27",
    "Aysar":         "W27",
    "Generator":     "W43",
    "Paturevision":  "W30",
    "Elena":         None,
}

THU_JUN04_TOKENS = ["Thu, 04/06/26", "04/06/26"]
TARGET_DATE = date(2026, 6, 4)

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
    return None


def discover_week_tab(sheet_id, target_dt, fallback=None):
    rows = fetch(sheet_id, "Summary!A:E")
    for row in rows:
        if len(row) < 3:
            continue
        tab = str(row[0]).strip()
        if not re.match(r"W\d+", tab):
            continue
        start_d = parse_date_cell(str(row[1]).strip() if len(row) > 1 else "")
        end_d = parse_date_cell(str(row[2]).strip() if len(row) > 2 else "")
        if start_d and end_d and start_d <= target_dt <= end_d:
            print(f"  Discovered tab {tab} ({start_d}→{end_d})", file=sys.stderr)
            return tab
    if fallback:
        test = fetch(sheet_id, f"{fallback}!A1:A3")
        if test and "ERROR" not in str(test[0]):
            print(f"  Using fallback {fallback}", file=sys.stderr)
            return fallback
    return None


def find_day_block(rows, date_tokens):
    for i, row in enumerate(rows):
        cell = str(row[0]).strip() if row else ""
        for tok in date_tokens:
            if tok in cell:
                return i
    return -1


def extract_daily_hours_by_owner(rows, date_tokens, hours_col=7):
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
    rows = fetch(sheet_id, "Summary!A:E")
    for row in rows:
        if row and str(row[0]).strip() == week_tab:
            val = str(row[3]).strip() if len(row) > 3 else ""
            return parse_hours(val)
    return None


results = {}
date_tokens = THU_JUN04_TOKENS

print("Discovering week tabs...", file=sys.stderr)
curr_tabs = {}
for sheet_name, sheet_id in SHEETS.items():
    tab = discover_week_tab(sheet_id, TARGET_DATE, FALLBACK_TABS.get(sheet_name))
    curr_tabs[sheet_name] = tab
    print(f"  {sheet_name} → {tab}", file=sys.stderr)

# TuanNT: JohnYi + Rebecca + Paturevision
print("\nChecking TuanNT...", file=sys.stderr)
tuannt_jy = {}; jy_leave = {}; jy_err = None
if curr_tabs.get("JohnYi"):
    rows_jy = fetch(SHEETS["JohnYi"], f"{curr_tabs['JohnYi']}!A:I")
    tuannt_jy, jy_leave, jy_err = extract_daily_hours_by_owner(rows_jy, date_tokens)

tuannt_rb = {}; rb_leave = {}; rb_err = None
if curr_tabs.get("Rebecca"):
    rows_rb = fetch(SHEETS["Rebecca"], f"{curr_tabs['Rebecca']}!A:I")
    tuannt_rb, rb_leave, rb_err = extract_daily_hours_by_owner(rows_rb, date_tokens)

pat_all_owners = {}; pat_leave = {}; pat_err = None
if curr_tabs.get("Paturevision"):
    rows_pat = fetch(SHEETS["Paturevision"], f"{curr_tabs['Paturevision']}!A:I")
    pat_all_owners, pat_leave, pat_err = extract_daily_hours_by_owner(rows_pat, date_tokens)

tuannt_pat = {k: v for k, v in pat_all_owners.items() if "TuanNT" in k}

results["TuanNT"] = {
    "johnyiHours": sum(tuannt_jy.values()),
    "rebeccaHours": sum(tuannt_rb.values()),
    "paturevisionHours": sum(tuannt_pat.values()),
    "totalHours": sum(tuannt_jy.values()) + sum(tuannt_rb.values()) + sum(tuannt_pat.values()),
    "johnyiLeave": jy_leave, "rebeccaLeave": rb_leave,
    "johnyiErr": jy_err, "rebeccaErr": rb_err,
    "johnyiOwners": tuannt_jy, "rebeccaOwners": tuannt_rb, "patOwners": tuannt_pat,
}

# PhucVT: JamesDiamond sheet
print("Checking PhucVT...", file=sys.stderr)
phucvt_hours = {}; jd_leave = {}; jd_err = None
if curr_tabs.get("JamesDiamond"):
    rows_jd = fetch(SHEETS["JamesDiamond"], f"{curr_tabs['JamesDiamond']}!A:I")
    phucvt_hours, jd_leave, jd_err = extract_daily_hours_by_owner(rows_jd, date_tokens)
results["PhucVT"] = {
    "hours": sum(phucvt_hours.values()),
    "leave": jd_leave, "err": jd_err, "owners": phucvt_hours,
}

# VietPH: Paturevision sheet
print("Checking VietPH...", file=sys.stderr)
vietph_hours = {k: v for k, v in pat_all_owners.items() if "VietPH" in k}
results["VietPH"] = {
    "hours": sum(vietph_hours.values()),
    "allOwners": pat_all_owners, "leave": pat_leave, "err": pat_err, "owners": vietph_hours,
}

# KhanhHH: Generator + Elena sheets
print("Checking KhanhHH...", file=sys.stderr)
khanhhh_hours = {}; gen_leave = {}; gen_err = None
if curr_tabs.get("Generator"):
    rows_gen = fetch(SHEETS["Generator"], f"{curr_tabs['Generator']}!A:I")
    khanhhh_hours, gen_leave, gen_err = extract_daily_hours_by_owner(rows_gen, date_tokens)

elena_hours_all = {}; elena_leave = {}; elena_err = None
if curr_tabs.get("Elena"):
    rows_elena = fetch(SHEETS["Elena"], f"{curr_tabs['Elena']}!A:I")
    elena_hours_all, elena_leave, elena_err = extract_daily_hours_by_owner(rows_elena, date_tokens)

khanhhh_gen = {k: v for k, v in khanhhh_hours.items() if "KhanhHH" in k}
khanhhh_elena = {k: v for k, v in elena_hours_all.items() if "KhanhHH" in k}
khanhhh_total = sum(khanhhh_gen.values()) + sum(khanhhh_elena.values())
if khanhhh_total == 0:
    khanhhh_total = sum(khanhhh_hours.values())

results["KhanhHH"] = {
    "generatorHours": sum(khanhhh_gen.values()) if khanhhh_gen else sum(khanhhh_hours.values()),
    "elenaHours": sum(khanhhh_elena.values()),
    "totalHours": khanhhh_total if khanhhh_total > 0 else sum(khanhhh_hours.values()),
    "generatorOwners": khanhhh_hours, "elenaOwners": elena_hours_all,
    "leave": gen_leave, "err": gen_err,
}

# LeNH: Rory + Franc + Aysar + Rebecca sheets
print("Checking LeNH...", file=sys.stderr)
lenh_rory = {}; rory_leave = {}; rory_err = None
if curr_tabs.get("Rory"):
    rows_rory = fetch(SHEETS["Rory"], f"{curr_tabs['Rory']}!A:I")
    lenh_rory, rory_leave, rory_err = extract_daily_hours_by_owner(rows_rory, date_tokens)

lenh_franc = {}; franc_leave = {}; franc_err = None
if curr_tabs.get("Franc"):
    rows_franc = fetch(SHEETS["Franc"], f"{curr_tabs['Franc']}!A:I")
    lenh_franc, franc_leave, franc_err = extract_daily_hours_by_owner(rows_franc, date_tokens)

lenh_aysar = {}; aysar_leave = {}; aysar_err = None
if curr_tabs.get("Aysar"):
    rows_aysar = fetch(SHEETS["Aysar"], f"{curr_tabs['Aysar']}!A:I")
    lenh_aysar, aysar_leave, aysar_err = extract_daily_hours_by_owner(rows_aysar, date_tokens)

rebecca_lenh_hrs = 0.0; rb_lenh_err = None
if curr_tabs.get("Rebecca"):
    rebecca_lenh_hrs, rb_owners, rb_leave_lenh, rb_lenh_err = check_rebecca_lenh(
        SHEETS["Rebecca"], curr_tabs["Rebecca"], date_tokens
    )

lenh_total = (
    sum(v for k, v in lenh_rory.items() if "LeNH" in k or k == "LeNH")
    + sum(v for k, v in lenh_franc.items() if "LeNH" in k or k == "LeNH")
    + sum(v for k, v in lenh_aysar.items() if "LeNH" in k or k == "LeNH")
    + rebecca_lenh_hrs
)
if lenh_total == 0:
    lenh_total = (
        sum(lenh_rory.values()) + sum(lenh_franc.values())
        + sum(lenh_aysar.values()) + rebecca_lenh_hrs
    )
results["LeNH"] = {
    "roryHours": sum(lenh_rory.values()),
    "francHours": sum(lenh_franc.values()),
    "aysarHours": sum(lenh_aysar.values()),
    "rebeccaLeNHHours": rebecca_lenh_hrs,
    "totalHours": lenh_total,
    "leave": {**rory_leave, **franc_leave, **aysar_leave},
    "errors": {"rory": rory_err, "franc": franc_err, "aysar": aysar_err, "rebecca": rb_lenh_err},
    "roryOwners": lenh_rory, "francOwners": lenh_franc, "aysarOwners": lenh_aysar,
}

# LongVV: Maddy sheet — part-time 16h/wk, weekly total only
print("Checking LongVV (Maddy weekly)...", file=sys.stderr)
longvv_today = {}; maddy_leave = {}; maddy_err = None
if curr_tabs.get("Maddy"):
    rows_maddy = fetch(SHEETS["Maddy"], f"{curr_tabs['Maddy']}!A:I")
    longvv_today, maddy_leave, maddy_err = extract_daily_hours_by_owner(rows_maddy, date_tokens)
    longvv_weekly = get_weekly_summary(SHEETS["Maddy"], curr_tabs["Maddy"])
else:
    longvv_weekly = None

results["LongVV"] = {
    "todayHours": sum(longvv_today.values()),
    "weeklyTotal": longvv_weekly,
    "weeklyTarget": 16,
    "leave": maddy_leave, "err": maddy_err,
}

results["Elena"] = {
    "tab": curr_tabs.get("Elena"),
    "hours": sum(elena_hours_all.values()),
    "owners": elena_hours_all, "leave": elena_leave, "err": elena_err,
}

results["_tabs"] = curr_tabs

print(json.dumps(results, indent=2, ensure_ascii=False))
