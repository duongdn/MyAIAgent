#!/usr/bin/env python3
"""Weekly sheets scan for W29 (June 1-7, 2026). Run: 2026-06-06 (Saturday).
Fetches weekly totals from Summary tab for all employees.
Also fetches daily breakdown from W-tab for any shortfalls.
"""
import json
import re
import sys
from datetime import date, timedelta
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json"

# All sheets to scan
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
    "Marcel":        "1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI",
    "Neural":        "1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg",
    "Fountain":      "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
}

# W29 target: June 1 (Mon) - June 7 (Sun) 2026
TARGET_MONDAY = date(2026, 6, 1)
TARGET_FRIDAY = date(2026, 6, 5)

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
                print(f"  ERROR fetching {rng}: {e}", file=sys.stderr)
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
    # Remove day-of-week prefix
    s = re.sub(r"^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*", "", s)
    # Try DD/MM/YY or DD/MM/YYYY
    try:
        parts = s.split("/")
        if len(parts) == 3:
            d, m, y = int(parts[0]), int(parts[1]), int(parts[2])
            y += 2000 if y < 100 else 0
            return date(y, m, d)
    except Exception:
        pass
    # Try "Month DD, YYYY"
    try:
        from datetime import datetime
        return datetime.strptime(s, "%B %d, %Y").date()
    except Exception:
        pass
    return None


def discover_week_tab(sheet_id, target_dt):
    """Find W{n} tab containing target_dt by reading Summary tab."""
    rows = fetch(sheet_id, "Summary!A:D")
    for row in rows:
        if len(row) < 3:
            continue
        tab = str(row[0]).strip()
        if not re.match(r"W\d+", tab):
            continue
        start_d = parse_date_cell(str(row[1]).strip() if len(row) > 1 else "")
        end_d = parse_date_cell(str(row[2]).strip() if len(row) > 2 else "")
        if start_d and end_d and start_d <= target_dt <= end_d:
            return tab, start_d, end_d
    return None, None, None


def get_weekly_totals_from_summary(sheet_id, week_tab):
    """Get weekly totals per employee from Summary tab."""
    rows = fetch(sheet_id, "Summary!A:AM")
    if not rows:
        return None, {}

    # Find header row (row 5 = index 4) for employee names
    # Find data row for this week_tab
    header_row = None
    week_data_row = None

    for i, row in enumerate(rows):
        if row and str(row[0]).strip() == week_tab:
            week_data_row = row
            # Look for header in preceding rows
            for j in range(max(0, i-5), i):
                r = rows[j]
                if len(r) > 8 and any(
                    name in " ".join(str(c) for c in r)
                    for name in ["PhucVT", "VietPH", "LongVV", "TuanNT", "LeNH",
                                 "KhanhHH", "AnhNH2", "ViTHT", "ThinhT", "VuTQ",
                                 "PhatDLT", "HungPN", "DuongDN", "HaVS"]
                ):
                    header_row = r
                    break
            break

    if week_data_row is None:
        return None, {}

    # Total (col D = index 3)
    total = parse_hours(week_data_row[3]) if len(week_data_row) > 3 else 0.0

    # Per-employee from header + data
    employee_hours = {}
    if header_row:
        for ci, col_name in enumerate(header_row):
            name = str(col_name).strip()
            if name and any(n in name for n in [
                "PhucVT", "VietPH", "LongVV", "TuanNT", "LeNH",
                "KhanhHH", "AnhNH2", "ViTHT", "ThinhT", "VuTQ",
                "PhatDLT", "HungPN", "DuongDN", "HaVS", "DatNT", "LamLQ"
            ]):
                if name not in employee_hours:  # first occurrence = actual col
                    val = week_data_row[ci] if ci < len(week_data_row) else ""
                    employee_hours[name] = parse_hours(val)

    return total, employee_hours


def get_wtab_owner_totals(sheet_id, week_tab):
    """Get weekly totals per owner by scanning entire W-tab."""
    rows = fetch(sheet_id, f"{week_tab}!A:J")
    if not rows:
        return {}, {}

    owner_totals = {}
    leave_days = {}  # owner -> list of leave markers

    current_date = None
    for row in rows:
        if not row:
            continue
        cell_a = str(row[0]).strip()

        # Date header row
        d = parse_date_cell(cell_a)
        if d and TARGET_MONDAY <= d <= TARGET_FRIDAY:
            current_date = d
            # Check for leave in date header
            if "Nghỉ cả ngày" in cell_a:
                leave_days.setdefault("ALL", []).append(f"{d.strftime('%a')} Nghỉ cả ngày")
            elif "Nghỉ nửa ngày" in cell_a:
                leave_days.setdefault("ALL", []).append(f"{d.strftime('%a')} Nghỉ nửa ngày")
            continue

        if current_date is None:
            continue

        # Past Friday, stop
        if d and d > TARGET_FRIDAY:
            break

        # Leave row
        if any(kw in cell_a for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            owner = str(row[6]).strip() if len(row) > 6 and row[6] else "ALL"
            leave_days.setdefault(owner, []).append(
                f"{current_date.strftime('%a')} {cell_a}"
            )
            continue

        # Task row
        if "task dự án" not in cell_a.lower() and "task du an" not in cell_a.lower():
            continue

        owner = str(row[6]).strip() if len(row) > 6 else ""
        hrs = parse_hours(str(row[7]).strip() if len(row) > 7 else "")
        if owner and hrs > 0:
            owner_totals[owner] = owner_totals.get(owner, 0.0) + hrs

    return owner_totals, leave_days


def get_rebecca_lenh_weekly(sheet_id, week_tab):
    """Get LeNH's weekly hours from Rebecca sheet (cols Q-T)."""
    rows = fetch(sheet_id, f"{week_tab}!A:T")
    lenh_total = 0.0
    leave_days = {}

    current_date = None
    for row in rows:
        if not row:
            continue
        cell_a = str(row[0]).strip()
        d = parse_date_cell(cell_a)
        if d and TARGET_MONDAY <= d <= TARGET_FRIDAY:
            current_date = d
            continue
        if current_date is None:
            continue
        if d and d > TARGET_FRIDAY:
            break

        if any(kw in cell_a for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            owner = str(row[6]).strip() if len(row) > 6 else "ALL"
            leave_days.setdefault(owner, []).append(f"{current_date.strftime('%a')} {cell_a}")
            continue

        if "task dự án" not in cell_a.lower() and "task du an" not in cell_a.lower():
            continue

        # LeNH cols Q-T = indices 16-19
        for ci in range(16, 20):
            v = parse_hours(str(row[ci]).strip() if len(row) > ci else "")
            lenh_total += v

    return lenh_total, leave_days


# ── Discover tabs ──────────────────────────────────────────────────────────────
print("\n=== Discovering W29 tabs (target: 2026-06-01) ===", file=sys.stderr)
tabs = {}
for sname, sid in SHEETS.items():
    tab, s, e = discover_week_tab(sid, TARGET_MONDAY)
    tabs[sname] = tab
    print(f"  {sname}: {tab} ({s}→{e})", file=sys.stderr)

results = {"tabs": tabs, "week": "W29 (Jun 1-5, 2026)"}

# ── LongVV: Maddy + James Diamond ─────────────────────────────────────────────
print("\n=== LongVV ===", file=sys.stderr)
maddy_tab = tabs.get("Maddy")
jd_tab = tabs.get("JamesDiamond")

longvv_maddy_total = 0.0
longvv_jd_total = 0.0
longvv_maddy_owners = {}
longvv_jd_owners = {}
longvv_leave = {}

if maddy_tab:
    longvv_maddy_owners, maddy_leave = get_wtab_owner_totals(SHEETS["Maddy"], maddy_tab)
    longvv_maddy_total = sum(v for k, v in longvv_maddy_owners.items() if "LongVV" in k or k == "LongVV")
    if longvv_maddy_total == 0:
        longvv_maddy_total = sum(longvv_maddy_owners.values())
    # Also check Summary for total
    smry_total, _ = get_weekly_totals_from_summary(SHEETS["Maddy"], maddy_tab)
    if smry_total:
        longvv_maddy_total = smry_total
    longvv_leave.update(maddy_leave)
    print(f"  Maddy owners: {longvv_maddy_owners}", file=sys.stderr)
    print(f"  Maddy summary total: {smry_total}", file=sys.stderr)

if jd_tab:
    longvv_jd_owners, jd_leave_lv = get_wtab_owner_totals(SHEETS["JamesDiamond"], jd_tab)
    longvv_jd_total = sum(v for k, v in longvv_jd_owners.items() if "LongVV" in k or k == "LongVV")
    longvv_leave.update(jd_leave_lv)
    print(f"  JD owners: {longvv_jd_owners}", file=sys.stderr)

results["LongVV"] = {
    "maddyTotal": longvv_maddy_total,
    "jdTotal": longvv_jd_total,
    "maddyTarget": 16,
    "jdFlexible": True,
    "leave": longvv_leave,
    "maddyOwners": longvv_maddy_owners,
    "jdOwners": longvv_jd_owners,
}

# ── PhucVT + AnhNH2: James Diamond ────────────────────────────────────────────
print("\n=== PhucVT + AnhNH2 ===", file=sys.stderr)
jd_owners, jd_leave = {}, {}
if jd_tab:
    jd_owners, jd_leave = get_wtab_owner_totals(SHEETS["JamesDiamond"], jd_tab)
    print(f"  JD all owners: {jd_owners}", file=sys.stderr)

phucvt_total = sum(v for k, v in jd_owners.items() if "PhucVT" in k or k == "PhucVT")
anhnhh_total = sum(v for k, v in jd_owners.items() if "AnhNH2" in k or k == "AnhNH2")

results["PhucVT"] = {"total": phucvt_total, "target": 40, "leave": jd_leave, "owners": jd_owners}
results["AnhNH2"] = {"total": anhnhh_total, "target": None, "note": "no fixed plan, use actual as plan"}

# ── VietPH + VuTQ: Paturevision ───────────────────────────────────────────────
print("\n=== Paturevision (VietPH, VuTQ, TuanNT) ===", file=sys.stderr)
pat_tab = tabs.get("Paturevision")
pat_owners, pat_leave = {}, {}
if pat_tab:
    pat_owners, pat_leave = get_wtab_owner_totals(SHEETS["Paturevision"], pat_tab)
    print(f"  Pat owners: {pat_owners}", file=sys.stderr)

vietph_total = sum(v for k, v in pat_owners.items() if "VietPH" in k or k == "VietPH")
vutq_pat_total = sum(v for k, v in pat_owners.items() if "VuTQ" in k or k == "VuTQ")
tuannt_pat = sum(v for k, v in pat_owners.items() if "TuanNT" in k or k == "TuanNT")

results["VietPH"] = {"total": vietph_total, "target": 40, "leave": pat_leave}
results["VuTQ_pat"] = {"total": vutq_pat_total}

# ── TuanNT: JohnYi + Rebecca + Paturevision + Neural ─────────────────────────
print("\n=== TuanNT ===", file=sys.stderr)
jy_tab = tabs.get("JohnYi")
rb_tab = tabs.get("Rebecca")
neural_tab = tabs.get("Neural")

tuannt_jy = 0.0; tuannt_rb = 0.0; tuannt_neural = 0.0
jy_owners, jy_leave, rb_owners, rb_leave, neural_owners, neural_leave = {}, {}, {}, {}, {}, {}

if jy_tab:
    jy_owners, jy_leave = get_wtab_owner_totals(SHEETS["JohnYi"], jy_tab)
    tuannt_jy = sum(v for k, v in jy_owners.items() if "TuanNT" in k or k == "TuanNT")
    if tuannt_jy == 0:
        tuannt_jy = sum(jy_owners.values())
    print(f"  JY owners: {jy_owners}", file=sys.stderr)

if rb_tab:
    rb_owners, rb_leave = get_wtab_owner_totals(SHEETS["Rebecca"], rb_tab)
    tuannt_rb = sum(v for k, v in rb_owners.items() if "TuanNT" in k or k == "TuanNT")
    if tuannt_rb == 0:
        tuannt_rb = sum(rb_owners.values())
    print(f"  RB owners: {rb_owners}", file=sys.stderr)

if neural_tab:
    neural_owners, neural_leave = get_wtab_owner_totals(SHEETS["Neural"], neural_tab)
    tuannt_neural = sum(v for k, v in neural_owners.items() if "TuanNT" in k or k == "TuanNT")
    if tuannt_neural == 0:
        tuannt_neural = sum(neural_owners.values())
    print(f"  Neural owners: {neural_owners}", file=sys.stderr)

tuannt_total = tuannt_jy + tuannt_rb + tuannt_pat + tuannt_neural
all_leave = {**jy_leave, **rb_leave, **neural_leave, **pat_leave}

results["TuanNT"] = {
    "johnyiHours": tuannt_jy,
    "rebeccaHours": tuannt_rb,
    "paturevisionHours": tuannt_pat,
    "neuralHours": tuannt_neural,
    "total": tuannt_total,
    "target": 40,
    "leave": all_leave,
    "johnyiOwners": jy_owners,
    "rebeccaOwners": rb_owners,
    "neuralOwners": neural_owners,
}

# ── KhanhHH: Generator + Elena ────────────────────────────────────────────────
print("\n=== KhanhHH ===", file=sys.stderr)
gen_tab = tabs.get("Generator")
elena_tab = tabs.get("Elena")

khanhhh_gen = 0.0; khanhhh_elena = 0.0
gen_owners, gen_leave, elena_owners, elena_leave = {}, {}, {}, {}

if gen_tab:
    gen_owners, gen_leave = get_wtab_owner_totals(SHEETS["Generator"], gen_tab)
    khanhhh_gen = sum(v for k, v in gen_owners.items() if "KhanhHH" in k or k == "KhanhHH")
    if khanhhh_gen == 0:
        khanhhh_gen = sum(gen_owners.values())
    print(f"  Gen owners: {gen_owners}", file=sys.stderr)

if elena_tab:
    elena_owners, elena_leave = get_wtab_owner_totals(SHEETS["Elena"], elena_tab)
    khanhhh_elena = sum(v for k, v in elena_owners.items() if "KhanhHH" in k or k == "KhanhHH")
    print(f"  Elena owners: {elena_owners}", file=sys.stderr)

khanhhh_total = khanhhh_gen + khanhhh_elena
results["KhanhHH"] = {
    "generatorHours": khanhhh_gen,
    "elenaHours": khanhhh_elena,
    "total": khanhhh_total,
    "target": 40,
    "leave": {**gen_leave, **elena_leave},
    "genOwners": gen_owners,
    "elenaOwners": elena_owners,
}

# ── LeNH: Rory + Franc + Aysar + Rebecca ──────────────────────────────────────
print("\n=== LeNH ===", file=sys.stderr)
rory_tab = tabs.get("Rory")
franc_tab = tabs.get("Franc")
aysar_tab = tabs.get("Aysar")

lenh_rory = 0.0; lenh_franc = 0.0; lenh_aysar = 0.0; lenh_rebecca = 0.0
rory_owners, rory_leave, franc_owners, franc_leave2, aysar_owners, aysar_leave = {}, {}, {}, {}, {}, {}

if rory_tab:
    rory_owners, rory_leave = get_wtab_owner_totals(SHEETS["Rory"], rory_tab)
    lenh_rory = sum(v for k, v in rory_owners.items() if "LeNH" in k or k == "LeNH")
    if lenh_rory == 0:
        lenh_rory = sum(rory_owners.values())
    print(f"  Rory owners: {rory_owners}", file=sys.stderr)

if franc_tab:
    franc_owners, franc_leave2 = get_wtab_owner_totals(SHEETS["Franc"], franc_tab)
    lenh_franc = sum(v for k, v in franc_owners.items() if "LeNH" in k or k == "LeNH")
    if lenh_franc == 0:
        lenh_franc = sum(franc_owners.values())
    print(f"  Franc owners: {franc_owners}", file=sys.stderr)

if aysar_tab:
    aysar_owners, aysar_leave = get_wtab_owner_totals(SHEETS["Aysar"], aysar_tab)
    lenh_aysar = sum(v for k, v in aysar_owners.items() if "LeNH" in k or k == "LeNH")
    if lenh_aysar == 0:
        lenh_aysar = sum(aysar_owners.values())
    print(f"  Aysar owners: {aysar_owners}", file=sys.stderr)

if rb_tab:
    lenh_rebecca, rb_lenh_leave = get_rebecca_lenh_weekly(SHEETS["Rebecca"], rb_tab)
    print(f"  Rebecca LeNH hours: {lenh_rebecca}", file=sys.stderr)

lenh_total = lenh_rory + lenh_franc + lenh_aysar + lenh_rebecca
results["LeNH"] = {
    "roryHours": lenh_rory,
    "francHours": lenh_franc,
    "aysarHours": lenh_aysar,
    "rebeccaHours": lenh_rebecca,
    "total": lenh_total,
    "target": 40,
    "leave": {**rory_leave, **franc_leave2, **aysar_leave},
    "roryOwners": rory_owners,
    "francOwners": franc_owners,
    "aysarOwners": aysar_owners,
}

# ── Marcel: DuongDN ────────────────────────────────────────────────────────────
print("\n=== Marcel ===", file=sys.stderr)
marcel_tab = tabs.get("Marcel")
marcel_owners, marcel_leave = {}, {}
if marcel_tab:
    marcel_owners, marcel_leave = get_wtab_owner_totals(SHEETS["Marcel"], marcel_tab)
    print(f"  Marcel owners: {marcel_owners}", file=sys.stderr)
duongdn_total = sum(v for k, v in marcel_owners.items() if "DuongDN" in k or k == "DuongDN")
if duongdn_total == 0:
    duongdn_total = sum(marcel_owners.values())
results["Marcel"] = {"duongdnTotal": duongdn_total, "owners": marcel_owners, "note": "adhoc, 0h expected"}

# ── Fountain Summary ───────────────────────────────────────────────────────────
print("\n=== Fountain ===", file=sys.stderr)
fountain_tab = tabs.get("Fountain")
fountain_owners, fountain_leave = {}, {}
if fountain_tab:
    # Use Summary tab for weekly totals
    _, emp_hours = get_weekly_totals_from_summary(SHEETS["Fountain"], fountain_tab)
    fountain_owners = emp_hours
    # Also scan W-tab directly
    wtab_owners, fountain_leave = get_wtab_owner_totals(SHEETS["Fountain"], fountain_tab)
    for k, v in wtab_owners.items():
        if k not in fountain_owners or fountain_owners[k] == 0:
            fountain_owners[k] = v
    print(f"  Fountain owners: {fountain_owners}", file=sys.stderr)

results["Fountain"] = {
    "tab": fountain_tab,
    "owners": fountain_owners,
    "leave": fountain_leave,
}

print("\n" + "="*60, file=sys.stderr)
print(json.dumps(results, indent=2, ensure_ascii=False))
