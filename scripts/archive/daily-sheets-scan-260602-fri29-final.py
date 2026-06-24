#!/usr/bin/env python3
"""Final sheets scan for 2026-06-02 report.
- Friday check = Fri 29/05/26 (last workday of old week May 25-31)
- W29 new week Jun 1-7 partial totals (Mon Jun 1 only so far)
"""
import json
import re
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
}

OLD_TABS = {
    "Maddy": "W8", "JohnYi": "W25", "Rebecca": "W26", "JamesDiamond": "W27",
    "Rory": "W13", "Franc": "W26", "Aysar": "W26", "Generator": "W42",
    "Paturevision": "W29",
}
NEW_TABS = {
    "Maddy": "W9", "JohnYi": "W26", "Rebecca": "W27", "JamesDiamond": "W28",
    "Rory": "W14", "Franc": "W27", "Aysar": "W27", "Generator": "W43",
    "Paturevision": "W30",
}

FRI_MAY29 = ["Fri, 29/05/26", "29/05/26"]
MON_JUN1  = ["Mon, 01/06/26", "01/06/26", "Mon, 1/06/26"]

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


def find_day_block(rows, tokens):
    for i, row in enumerate(rows):
        cell = str(row[0]).strip() if row else ""
        for tok in tokens:
            if tok in cell:
                return i
    return -1


def extract_by_owner(rows, tokens, hours_col=7):
    """Extract {owner: hours} + leave_notes for a date block. Task dự án only."""
    idx = find_day_block(rows, tokens)
    if idx == -1:
        return {}, {}, "DATE_NOT_FOUND"

    owner_hours, leave_notes = {}, {}
    hdr = str(rows[idx][0]).strip() if rows[idx] else ""
    global_leave = None
    for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]:
        if kw in hdr:
            global_leave = kw

    for row in rows[idx + 1:]:
        if not row:
            continue
        a = str(row[0]).strip()
        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}/\d{2}/\d{2}", a):
            break
        if re.match(r"\d{1,2}/\d{2}/\d{2}", a) and not any(t in a for t in tokens):
            break
        if any(kw in a for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            owner = str(row[6]).strip() if len(row) > 6 and row[6] else "ALL"
            leave_notes[owner] = a
            if owner == "ALL":
                global_leave = a
            continue
        if "task dự án" not in a.lower():
            continue
        owner = str(row[6]).strip() if len(row) > 6 else ""
        if not owner:
            continue
        h = parse_hours(str(row[hours_col]).strip() if len(row) > hours_col else "")
        owner_hours[owner] = owner_hours.get(owner, 0.0) + h

    if global_leave and not leave_notes:
        leave_notes["ALL"] = global_leave
    return owner_hours, leave_notes, None


def rebecca_lenh_hours(tokens):
    """LeNH hours from Rebecca sheet cols Q-T (index 16-19)."""
    rows = fetch(SHEETS["Rebecca"], f"{OLD_TABS['Rebecca']}!A:T")
    if not rows or "ERROR" in str(rows[0]):
        return 0.0, "ERROR"
    idx = find_day_block(rows, tokens)
    if idx == -1:
        return 0.0, "DATE_NOT_FOUND"
    total = 0.0
    for row in rows[idx + 1:]:
        if not row:
            continue
        a = str(row[0]).strip()
        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}/\d{2}/\d{2}", a):
            break
        if re.match(r"\d{1,2}/\d{2}/\d{2}", a) and not any(t in a for t in tokens):
            break
        if "task dự án" not in a.lower():
            continue
        for ci in range(16, 20):
            total += parse_hours(str(row[ci]).strip() if len(row) > ci else "")
    return total, None


def weekly_summary(sheet_id, week_tab):
    rows = fetch(sheet_id, "Summary!A1:E100")
    for row in rows:
        if row and str(row[0]).strip() == week_tab:
            return parse_hours(str(row[3]).strip() if len(row) > 3 else "")
    return None


def partial_week_total(sheet_id, tab):
    rows = fetch(sheet_id, f"{tab}!A:I")
    if not rows or "ERROR" in str(rows[0]):
        return 0.0
    total = 0.0
    for row in rows:
        if not row:
            continue
        a = str(row[0]).strip()
        if "task dự án" not in a.lower():
            continue
        total += parse_hours(str(row[7]).strip() if len(row) > 7 else "")
    return total


# ── FRIDAY MAY 29 checks ──────────────────────────────────────────────────────
print("Scanning Fri 29/05/26 entries...", file=sys.stderr)

fri = {}

# TuanNT: JohnYi
jy_rows = fetch(SHEETS["JohnYi"], f"{OLD_TABS['JohnYi']}!A:I")
jy_owners, jy_leave, jy_err = extract_by_owner(jy_rows, FRI_MAY29)
fri["TuanNT_johnyiH"] = sum(jy_owners.values())
fri["TuanNT_johnyiOwners"] = jy_owners
fri["TuanNT_johnyiLeave"] = jy_leave

# TuanNT: Rebecca
rb_rows = fetch(SHEETS["Rebecca"], f"{OLD_TABS['Rebecca']}!A:I")
rb_owners, rb_leave, rb_err = extract_by_owner(rb_rows, FRI_MAY29)
fri["TuanNT_rebeccaH"] = rb_owners.get("TuanNT", 0.0)
fri["TuanNT_rebeccaOwners"] = rb_owners
fri["TuanNT_rebeccaLeave"] = rb_leave

# TuanNT: Paturevision
pat_rows = fetch(SHEETS["Paturevision"], f"{OLD_TABS['Paturevision']}!A:I")
pat_owners, pat_leave, pat_err = extract_by_owner(pat_rows, FRI_MAY29)
fri["TuanNT_patH"] = pat_owners.get("TuanNT", 0.0)
fri["TuanNT_total"] = fri["TuanNT_johnyiH"] + fri["TuanNT_rebeccaH"] + fri["TuanNT_patH"]

# PhucVT: JamesDiamond
jd_rows = fetch(SHEETS["JamesDiamond"], f"{OLD_TABS['JamesDiamond']}!A:I")
jd_owners, jd_leave, jd_err = extract_by_owner(jd_rows, FRI_MAY29)
fri["PhucVT_H"] = jd_owners.get("PhucVT", 0.0)
fri["JamesDiamond_allOwners"] = jd_owners
fri["JamesDiamond_leave"] = jd_leave

# VietPH + VuTQ: Paturevision (already fetched)
fri["VietPH_H"] = sum(v for k, v in pat_owners.items() if "VietPH" in k)
fri["VuTQ_H"]   = sum(v for k, v in pat_owners.items() if "VuTQ" in k)
fri["Paturevision_allOwners"] = pat_owners
fri["Paturevision_leave"] = pat_leave

# KhanhHH: Generator
gen_rows = fetch(SHEETS["Generator"], f"{OLD_TABS['Generator']}!A:I")
gen_owners, gen_leave, gen_err = extract_by_owner(gen_rows, FRI_MAY29)
fri["KhanhHH_H"] = gen_owners.get("KhanhHH", 0.0)
fri["Generator_allOwners"] = gen_owners
fri["Generator_leave"] = gen_leave

# LeNH: Rory
rory_rows = fetch(SHEETS["Rory"], f"{OLD_TABS['Rory']}!A:I")
rory_owners, rory_leave, rory_err = extract_by_owner(rory_rows, FRI_MAY29)
# Franc
franc_rows = fetch(SHEETS["Franc"], f"{OLD_TABS['Franc']}!A:I")
franc_owners, franc_leave, franc_err = extract_by_owner(franc_rows, FRI_MAY29)
# Aysar
aysar_rows = fetch(SHEETS["Aysar"], f"{OLD_TABS['Aysar']}!A:I")
aysar_owners, aysar_leave, aysar_err = extract_by_owner(aysar_rows, FRI_MAY29)
# Rebecca LeNH cols
rebecca_lenh, rb_lenh_err = rebecca_lenh_hours(FRI_MAY29)

lenh_total_fri = (
    sum(v for k, v in rory_owners.items() if "LeNH" in k)
    + sum(v for k, v in franc_owners.items() if "LeNH" in k)
    + sum(v for k, v in aysar_owners.items() if "LeNH" in k)
    + rebecca_lenh
)
# fallback: if no owner match, sum all (single-owner sheets)
if lenh_total_fri == 0:
    lenh_total_fri = sum(rory_owners.values()) + sum(franc_owners.values()) + sum(aysar_owners.values()) + rebecca_lenh

fri["LeNH_roryH"]    = sum(rory_owners.values())
fri["LeNH_francH"]   = sum(franc_owners.values())
fri["LeNH_aysarH"]   = sum(aysar_owners.values())
fri["LeNH_rebeccaH"] = rebecca_lenh
fri["LeNH_total"]    = lenh_total_fri
fri["LeNH_roryOwners"]  = rory_owners
fri["LeNH_francOwners"] = franc_owners
fri["LeNH_aysarOwners"] = aysar_owners
fri["LeNH_leave"]    = {**rory_leave, **franc_leave, **aysar_leave}

# LongVV: Maddy
maddy_rows = fetch(SHEETS["Maddy"], f"{OLD_TABS['Maddy']}!A:I")
maddy_owners, maddy_leave, maddy_err = extract_by_owner(maddy_rows, FRI_MAY29)
longvv_old_weekly = weekly_summary(SHEETS["Maddy"], OLD_TABS["Maddy"])
fri["LongVV_H"]           = sum(maddy_owners.values())
fri["LongVV_maddy_owners"]= maddy_owners
fri["LongVV_oldWeekTotal"]= longvv_old_weekly

# ── NEW WEEK W29 (Jun 1-7) partial totals ────────────────────────────────────
print("Scanning new week Jun 1-7 partial totals...", file=sys.stderr)

w29 = {}
for sheet_name, new_tab in NEW_TABS.items():
    pt = partial_week_total(SHEETS[sheet_name], new_tab)
    # Also check Mon Jun 1 daily owners
    rows_new = fetch(SHEETS[sheet_name], f"{new_tab}!A:I")
    mon_owners, mon_leave, mon_err = extract_by_owner(rows_new, MON_JUN1)
    w29[sheet_name] = {
        "tab": new_tab,
        "partialTotal": pt,
        "monJun1Owners": mon_owners,
        "monJun1Total": sum(mon_owners.values()),
        "monJun1Leave": mon_leave,
    }

# Specific developer views for W29
new_maddy_rows = fetch(SHEETS["Maddy"], f"{NEW_TABS['Maddy']}!A:I")
longvv_new_weekly = weekly_summary(SHEETS["Maddy"], NEW_TABS["Maddy"])
w29["LongVV_newWeekTotal"] = longvv_new_weekly

print(json.dumps({"friday_may29": fri, "new_week_w29": w29}, indent=2, ensure_ascii=False))
