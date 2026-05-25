#!/usr/bin/env python3
"""Daily sheets scan for 2026-05-25 (Monday).
Window: May 23 (Friday prev week) + May 25 (Monday current week).

Sheet week mapping:
  Maddy:       W7 (May 18-24) + W8 (May 25-31)
  JohnYi:      W24 (May 18-24) + W25 (May 25-31)
  Rebecca:     W25 (May 18-24) + W26 (May 25-31)
  JamesDiamond:W26 (May 18-24) + W27 (May 25-31)
  Rory:        W12 (May 18-24) + W13 (May 25-31)
  Franc:       W25 (May 18-24) + W26 (May 25-31)
  Aysar:       W25 (May 18-24) + W26 (May 25-31)
  Generator:   W41 (May 18-24) + W42 (May 25-31)
  Fountain:    W27 (May 18-24) + W28 (May 25-31)
  Paturevision:W28 (May 18-24 = Mon-Fri May 18-22) + W29 (May 25-31)
               NOTE: W28 has Sat 23/05/26 block at end (no work expected)
"""
import json
import re
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
    "Fountain":      "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
}

# (prev_week_tab, curr_week_tab)
WEEK_TABS = {
    "Maddy":          ("W7",  "W8"),
    "JohnYi":         ("W24", "W25"),
    "Rebecca":        ("W25", "W26"),
    "JamesDiamond":   ("W26", "W27"),
    "Rory":           ("W12", "W13"),
    "Franc":          ("W25", "W26"),
    "Aysar":          ("W25", "W26"),
    "Generator":      ("W41", "W42"),
    "Paturevision":   ("W28", "W29"),
    "Fountain":       ("W27", "W28"),
}

# Date tokens to search in col A
FRI_MAY23_TOKENS = ["Fri, 23/05/26", "23/05/26"]
MON_MAY25_TOKENS = ["Mon, 25/05/26", "25/05/26"]

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
    if not val or str(val).strip() in ("", "-", "—"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def find_day_block(rows, date_tokens):
    """Find row index where date header matches any of date_tokens."""
    for i, row in enumerate(rows):
        cell = str(row[0]).strip() if row else ""
        for tok in date_tokens:
            if tok in cell:
                return i
    return -1


def extract_daily_hours_by_owner(rows, date_tokens, hours_col=7):
    """Extract hours grouped by owner for a specific date block.
    Returns: {owner: hours, ...}, leave_notes: {owner: note}
    Only 'Task dự án' rows count as official.
    """
    start_idx = find_day_block(rows, date_tokens)
    if start_idx == -1:
        return {}, {}

    owner_hours = {}
    leave_notes = {}

    for i, row in enumerate(rows[start_idx + 1:], start=start_idx + 1):
        if not row:
            continue
        row_a = str(row[0]).strip() if row else ""

        # New date block detected
        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}/\d{2}/\d{2}", row_a):
            break
        # Also break on old date format dd/mm/yy
        if re.match(r"\d{1,2}/\d{2}/\d{2}", row_a) and not any(tok in row_a for tok in date_tokens):
            break

        # Leave note row
        if any(kw.lower() in row_a.lower() for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            # Owner may be in col G (index 6)
            owner = str(row[6]).strip() if len(row) > 6 and row[6] else "unknown"
            if owner and owner != "unknown":
                leave_notes[owner] = row_a
            continue

        # Skip non-task rows
        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue

        # Get owner (col G = index 6)
        owner = str(row[6]).strip() if len(row) > 6 else ""
        if not owner:
            continue

        # Get hours (col H = index 7)
        hrs_val = str(row[hours_col]).strip() if len(row) > hours_col else ""
        hrs = parse_hours(hrs_val)

        if hrs > 0:
            owner_hours[owner] = owner_hours.get(owner, 0.0) + hrs

    return owner_hours, leave_notes


def extract_daily_hours_total(rows, date_tokens, hours_col=7):
    """Sum all Task dự án hours for a date block (no owner filter)."""
    owner_hrs, leave = extract_daily_hours_by_owner(rows, date_tokens, hours_col)
    return sum(owner_hrs.values()), leave


def check_sheet_day(sheet_name, sheet_id, week_tab, date_tokens):
    """Return (owner_hours_dict, leave_notes_dict, error)."""
    rows = fetch(sheet_id, f"{week_tab}!A:L")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return {}, {}, str(rows[0]) if rows else "empty"
    owner_hrs, leave_notes = extract_daily_hours_by_owner(rows, date_tokens)
    return owner_hrs, leave_notes, None


def check_rebecca_lenh(sheet_id, week_tab, date_tokens):
    """Rebecca sheet: LeNH hours in cols Q-T (index 16-19).
    Also get col G owners for TuanNT.
    """
    rows = fetch(sheet_id, f"{week_tab}!A:T")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return 0.0, {}, {}, str(rows[0]) if rows else "empty"

    start_idx = find_day_block(rows, date_tokens)
    if start_idx == -1:
        return 0.0, {}, {}, None

    lenh_hours = 0.0
    owner_hours = {}
    leave_notes = {}

    for i, row in enumerate(rows[start_idx + 1:], start=start_idx + 1):
        if not row:
            continue
        row_a = str(row[0]).strip() if row else ""

        # New date block
        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}/\d{2}/\d{2}", row_a):
            break
        if re.match(r"\d{1,2}/\d{2}/\d{2}", row_a) and not any(tok in row_a for tok in date_tokens):
            break

        # Leave note
        if any(kw.lower() in row_a.lower() for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            owner = str(row[6]).strip() if len(row) > 6 else ""
            if owner:
                leave_notes[owner] = row_a
            continue

        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue

        # Col G owner
        owner = str(row[6]).strip() if len(row) > 6 else ""
        # Col H hours (index 7)
        hrs_h = parse_hours(str(row[7]).strip() if len(row) > 7 else "")

        if owner and hrs_h > 0:
            owner_hours[owner] = owner_hours.get(owner, 0.0) + hrs_h

        # LeNH hours: check cols Q-T (indices 16-19)
        for ci in range(16, 20):
            v = parse_hours(str(row[ci]).strip() if len(row) > ci else "")
            lenh_hours += v

    return lenh_hours, owner_hours, leave_notes, None


def check_fountain_week(sheet_id, week_tab):
    """Check Fountain current week tab for devs and hours."""
    rows = fetch(sheet_id, f"{week_tab}!A:L")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return {}, str(rows[0]) if rows else "empty"

    # Fountain has different structure - find all rows with owners
    owner_hours = {}
    for row in rows:
        if not row or len(row) < 2:
            continue
        row_a = str(row[0]).strip()
        if "task dự án" not in row_a.lower() and "task du an" not in row_a.lower():
            continue
        owner = str(row[6]).strip() if len(row) > 6 else ""
        if not owner:
            continue
        hrs = parse_hours(str(row[7]).strip() if len(row) > 7 else "")
        if hrs > 0:
            owner_hours[owner] = owner_hours.get(owner, 0.0) + hrs

    return owner_hours, None


def main():
    print("## Sheets all — 08:38 (+07:00)")
    print()

    # ===== Collect raw data from all sheets =====
    results = {}

    for sheet_name, (prev_tab, curr_tab) in WEEK_TABS.items():
        sheet_id = SHEETS[sheet_name]

        if sheet_name == "Rebecca":
            # Special handling: LeNH cols Q-T, TuanNT col G
            fri_lenh, fri_tuanNT, fri_leave, fri_err = check_rebecca_lenh(sheet_id, prev_tab, FRI_MAY23_TOKENS)
            mon_lenh, mon_tuanNT, mon_leave, mon_err = check_rebecca_lenh(sheet_id, curr_tab, MON_MAY25_TOKENS)
            results[sheet_name] = {
                "fri_lenh": fri_lenh, "fri_owners": fri_tuanNT, "fri_leave": fri_leave, "fri_err": fri_err,
                "mon_lenh": mon_lenh, "mon_owners": mon_tuanNT, "mon_leave": mon_leave, "mon_err": mon_err,
                "prev_tab": prev_tab, "curr_tab": curr_tab,
            }
        elif sheet_name == "Fountain":
            # Fountain: just get weekly totals from summary
            prev_summary = fetch(sheet_id, "Summary!A1:E60")
            curr_summary = fetch(sheet_id, "Summary!A1:E60")
            prev_total = 0.0
            curr_total = 0.0
            for r in prev_summary:
                if prev_tab in str(r) and len(r) > 3:
                    prev_total = parse_hours(r[3])
                if curr_tab in str(r) and len(r) > 3:
                    curr_total = parse_hours(r[3])
            # Also get per-owner data for current week
            curr_owners, curr_err = check_fountain_week(sheet_id, curr_tab)
            prev_owners, prev_err = check_fountain_week(sheet_id, prev_tab)
            results[sheet_name] = {
                "prev_tab": prev_tab, "curr_tab": curr_tab,
                "prev_weekly_total": prev_total,
                "curr_weekly_total": curr_total,
                "prev_owners": prev_owners, "curr_owners": curr_owners,
            }
        elif sheet_name == "Paturevision":
            # Paturevision: May 23 = Sat in W28 (no workday), May 25 = Mon in W29
            # Check W28 for Sat 23/05/26 (expected 0h) and W29 for Mon 25/05/26
            sat_owners, sat_leave, sat_err = check_sheet_day(sheet_name, sheet_id, prev_tab, ["Sat, 23/05/26", "23/05/26"])
            mon_owners, mon_leave, mon_err = check_sheet_day(sheet_name, sheet_id, curr_tab, MON_MAY25_TOKENS)

            # Also get prev week Friday (May 22) data for context
            fri_owners, fri_leave, fri_err = check_sheet_day(sheet_name, sheet_id, prev_tab, ["Fri, 22/05/26", "22/05/26"])

            # Get weekly totals from summary
            summary = fetch(sheet_id, "Summary!A1:E60")
            prev_total = curr_total = 0.0
            for r in summary:
                if prev_tab in str(r) and len(r) > 3:
                    prev_total = parse_hours(r[3])
                if curr_tab in str(r) and len(r) > 3:
                    curr_total = parse_hours(r[3])

            results[sheet_name] = {
                "prev_tab": prev_tab, "curr_tab": curr_tab,
                "fri_may22_owners": fri_owners, "fri_may22_leave": fri_leave,
                "sat_may23_owners": sat_owners, "sat_may23_leave": sat_leave,
                "mon_may25_owners": mon_owners, "mon_may25_leave": mon_leave,
                "prev_weekly_total": prev_total,
                "curr_weekly_total": curr_total,
                "note": "Paturevision week Mon-Sun; May 23=Sat (weekend, 0h expected)"
            }
        else:
            fri_owners, fri_leave, fri_err = check_sheet_day(sheet_name, sheet_id, prev_tab, FRI_MAY23_TOKENS)
            mon_owners, mon_leave, mon_err = check_sheet_day(sheet_name, sheet_id, curr_tab, MON_MAY25_TOKENS)

            # Weekly totals from summary
            summary = fetch(sheet_id, "Summary!A1:E60")
            prev_total = curr_total = 0.0
            for r in summary:
                if prev_tab in str(r) and len(r) > 3:
                    prev_total = parse_hours(r[3])
                if curr_tab in str(r) and len(r) > 3:
                    curr_total = parse_hours(r[3])

            results[sheet_name] = {
                "prev_tab": prev_tab, "curr_tab": curr_tab,
                "fri_owners": fri_owners, "fri_leave": fri_leave, "fri_err": fri_err,
                "mon_owners": mon_owners, "mon_leave": mon_leave, "mon_err": mon_err,
                "prev_weekly_total": prev_total,
                "curr_weekly_total": curr_total,
            }

    # ===== Per-developer aggregation =====
    dev_data = {}

    # --- LongVV: Maddy only ---
    maddy = results["Maddy"]
    dev_data["LongVV"] = {
        "sheets": ["Maddy"],
        "fri_may23": maddy.get("fri_owners", {}).get("LongVV", 0.0),
        "fri_leave": maddy.get("fri_leave", {}).get("LongVV"),
        "mon_may25": maddy.get("mon_owners", {}).get("LongVV", 0.0),
        "mon_leave": maddy.get("mon_leave", {}).get("LongVV"),
        "weekly_prev": maddy.get("prev_weekly_total", 0.0),
        "weekly_curr": maddy.get("curr_weekly_total", 0.0),
        "target": "16h/wk",
        "type": "part_time",
    }

    # --- PhucVT: JamesDiamond ---
    jd = results["JamesDiamond"]
    dev_data["PhucVT"] = {
        "sheets": ["JamesDiamond"],
        "fri_may23": jd.get("fri_owners", {}).get("PhucVT", 0.0),
        "fri_leave": jd.get("fri_leave", {}).get("PhucVT"),
        "mon_may25": jd.get("mon_owners", {}).get("PhucVT", 0.0),
        "mon_leave": jd.get("mon_leave", {}).get("PhucVT"),
        "weekly_prev": jd.get("prev_weekly_total", 0.0),
        "weekly_curr": jd.get("curr_weekly_total", 0.0),
        "raw_jd_fri": jd.get("fri_owners", {}),
        "raw_jd_mon": jd.get("mon_owners", {}),
        "target": "8h/day",
        "type": "full_time",
    }

    # --- TuanNT: JohnYi + Rebecca ---
    jyi = results["JohnYi"]
    reb = results["Rebecca"]
    tuanNT_fri = (
        jyi.get("fri_owners", {}).get("TuanNT", 0.0)
        + reb.get("fri_owners", {}).get("TuanNT", 0.0)
    )
    tuanNT_mon = (
        jyi.get("mon_owners", {}).get("TuanNT", 0.0)
        + reb.get("mon_owners", {}).get("TuanNT", 0.0)
    )
    dev_data["TuanNT"] = {
        "sheets": ["JohnYi", "Rebecca"],
        "fri_may23": tuanNT_fri,
        "fri_leave": jyi.get("fri_leave", {}).get("TuanNT") or reb.get("fri_leave", {}).get("TuanNT"),
        "mon_may25": tuanNT_mon,
        "mon_leave": jyi.get("mon_leave", {}).get("TuanNT") or reb.get("mon_leave", {}).get("TuanNT"),
        "weekly_prev": jyi.get("prev_weekly_total", 0.0) + reb.get("prev_weekly_total", 0.0),
        "weekly_curr": jyi.get("curr_weekly_total", 0.0) + reb.get("curr_weekly_total", 0.0),
        "breakdown_fri": {
            "JohnYi": jyi.get("fri_owners", {}).get("TuanNT", 0.0),
            "Rebecca": reb.get("fri_owners", {}).get("TuanNT", 0.0),
        },
        "breakdown_mon": {
            "JohnYi": jyi.get("mon_owners", {}).get("TuanNT", 0.0),
            "Rebecca": reb.get("mon_owners", {}).get("TuanNT", 0.0),
        },
        "target": "8h/day",
        "type": "full_time",
    }

    # --- VietPH: Paturevision ---
    pat = results["Paturevision"]
    dev_data["VietPH"] = {
        "sheets": ["Paturevision"],
        "fri_may22": pat.get("fri_may22_owners", {}).get("VietPH", 0.0),
        "fri_may22_leave": pat.get("fri_may22_leave", {}).get("VietPH"),
        "sat_may23": pat.get("sat_may23_owners", {}).get("VietPH", 0.0),
        "mon_may25": pat.get("mon_may25_owners", {}).get("VietPH", 0.0),
        "mon_leave": pat.get("mon_may25_leave", {}).get("VietPH"),
        "weekly_prev": pat.get("prev_weekly_total", 0.0),
        "weekly_curr": pat.get("curr_weekly_total", 0.0),
        "target": "8h/day",
        "type": "full_time",
        "note": "May 23 = Saturday (weekend, 0h OK). Last workday = Fri May 22.",
    }

    # --- KhanhHH: Generator + Aysar ---
    gen = results["Generator"]
    ays = results["Aysar"]
    dev_data["KhanhHH"] = {
        "sheets": ["Generator", "Aysar"],
        "fri_may23": (
            gen.get("fri_owners", {}).get("KhanhHH", 0.0)
            + ays.get("fri_owners", {}).get("KhanhHH", 0.0)
        ),
        "fri_leave": gen.get("fri_leave", {}).get("KhanhHH") or ays.get("fri_leave", {}).get("KhanhHH"),
        "mon_may25": (
            gen.get("mon_owners", {}).get("KhanhHH", 0.0)
            + ays.get("mon_owners", {}).get("KhanhHH", 0.0)
        ),
        "mon_leave": gen.get("mon_leave", {}).get("KhanhHH") or ays.get("mon_leave", {}).get("KhanhHH"),
        "weekly_prev": gen.get("prev_weekly_total", 0.0),
        "weekly_curr": gen.get("curr_weekly_total", 0.0),
        "breakdown_fri": {
            "Generator": gen.get("fri_owners", {}).get("KhanhHH", 0.0),
            "Aysar": ays.get("fri_owners", {}).get("KhanhHH", 0.0),
        },
        "target": "8h/day",
        "type": "full_time",
    }

    # --- LeNH: Rory + Franc + Aysar + Rebecca(Q-T) ---
    rory = results["Rory"]
    franc = results["Franc"]
    lenh_fri = (
        rory.get("fri_owners", {}).get("LeNH", 0.0)
        + franc.get("fri_owners", {}).get("LeNH", 0.0)
        + ays.get("fri_owners", {}).get("LeNH", 0.0)
        + reb.get("fri_lenh", 0.0)
    )
    lenh_mon = (
        rory.get("mon_owners", {}).get("LeNH", 0.0)
        + franc.get("mon_owners", {}).get("LeNH", 0.0)
        + ays.get("mon_owners", {}).get("LeNH", 0.0)
        + reb.get("mon_lenh", 0.0)
    )
    dev_data["LeNH"] = {
        "sheets": ["Rory", "Franc", "Aysar", "Rebecca(Q-T)"],
        "fri_may23": lenh_fri,
        "fri_leave": rory.get("fri_leave", {}).get("LeNH") or franc.get("fri_leave", {}).get("LeNH"),
        "mon_may25": lenh_mon,
        "mon_leave": rory.get("mon_leave", {}).get("LeNH") or franc.get("mon_leave", {}).get("LeNH"),
        "weekly_prev": (
            rory.get("prev_weekly_total", 0.0)
            + franc.get("prev_weekly_total", 0.0)
            + ays.get("prev_weekly_total", 0.0)
        ),
        "weekly_curr": (
            rory.get("curr_weekly_total", 0.0)
            + franc.get("curr_weekly_total", 0.0)
            + ays.get("curr_weekly_total", 0.0)
        ),
        "breakdown_fri": {
            "Rory": rory.get("fri_owners", {}).get("LeNH", 0.0),
            "Franc": franc.get("fri_owners", {}).get("LeNH", 0.0),
            "Aysar": ays.get("fri_owners", {}).get("LeNH", 0.0),
            "Rebecca_QT": reb.get("fri_lenh", 0.0),
        },
        "breakdown_mon": {
            "Rory": rory.get("mon_owners", {}).get("LeNH", 0.0),
            "Franc": franc.get("mon_owners", {}).get("LeNH", 0.0),
            "Aysar": ays.get("mon_owners", {}).get("LeNH", 0.0),
            "Rebecca_QT": reb.get("mon_lenh", 0.0),
        },
        "target": "8h/day",
        "type": "full_time",
    }

    # --- VuTQ: Paturevision ---
    dev_data["VuTQ"] = {
        "sheets": ["Paturevision"],
        "fri_may22": pat.get("fri_may22_owners", {}).get("VuTQ", 0.0),
        "fri_may22_leave": pat.get("fri_may22_leave", {}).get("VuTQ"),
        "sat_may23": pat.get("sat_may23_owners", {}).get("VuTQ", 0.0),
        "mon_may25": pat.get("mon_may25_owners", {}).get("VuTQ", 0.0),
        "mon_leave": pat.get("mon_may25_leave", {}).get("VuTQ"),
        "weekly_prev": pat.get("prev_weekly_total", 0.0),
        "weekly_curr": pat.get("curr_weekly_total", 0.0),
        "target": "8h/day",
        "type": "full_time",
        "note": "May 23 = Saturday (weekend, 0h OK). VuTQ also in Fountain (0h OK there).",
    }

    # ===== Build output =====
    print("Current week: W (May 25–31) per each sheet's numbering")
    print("Previous week: W (May 18–24)")
    print()
    print("**Note on dates in window:**")
    print("  - May 23 (Sat): weekend for Paturevision sheet (Mon–Sun week). Last workday = Fri May 22.")
    print("  - May 23 (Fri): workday in all other sheets (Mon–Fri May 18–23).")
    print("  - May 25 (Mon): today, current week W-tab just started, partial hours expected.")
    print()

    # Summary table
    print("| Dev | Sheet(s) | Fri May 23 | Mon May 25 (partial) | Prev week total | Target | Status |")
    print("|-----|----------|-----------|---------------------|-----------------|--------|--------|")

    alerts = []
    zero_devs = []

    for dev, d in dev_data.items():
        sheets_str = "+".join(d["sheets"]) if len(d["sheets"]) > 1 else d["sheets"][0]
        target = d["target"]

        if dev in ("VietPH", "VuTQ"):
            fri_h = d.get("fri_may22", 0.0)
            fri_lv = d.get("fri_may22_leave")
            fri_label = f"{fri_h}h (Fri22)"
        else:
            fri_h = d.get("fri_may23", 0.0)
            fri_lv = d.get("fri_leave")
            fri_label = f"{fri_h}h"

        mon_h = d.get("mon_may25", 0.0)
        mon_lv = d.get("mon_leave")
        prev_total = d.get("weekly_prev", 0.0)

        if fri_lv:
            fri_label += f" ({fri_lv})"
        if mon_lv:
            mon_label = f"{mon_h}h ({mon_lv})"
        else:
            mon_label = f"{mon_h}h"

        # Status logic
        if d["type"] == "part_time":
            status = "✓" if prev_total >= 16.0 else ("⚠️ <16h prev wk" if prev_total > 0 else "—")
        else:
            fri_alert = fri_h == 0 and not fri_lv
            if fri_alert:
                status = "⚠️ 0h Fri"
                zero_devs.append(f"{dev} (Fri)")
                alerts.append(f"{dev}: 0h on Friday May 23 (no leave marker)")
            else:
                status = "✓"

        print(f"| {dev} | {sheets_str} | {fri_label} | {mon_label} | {prev_total}h | {target} | {status} |")

    print()

    # Raw sheet data for context
    print("## Raw sheet breakdown")
    print()

    # JamesDiamond owners
    jd_fri_all = jd.get("fri_owners", {})
    jd_mon_all = jd.get("mon_owners", {})
    print(f"**JamesDiamond (PhucVT)** — Fri owners: {jd_fri_all} | Mon owners: {jd_mon_all}")

    # Generator owners
    gen_fri_all = gen.get("fri_owners", {})
    gen_mon_all = gen.get("mon_owners", {})
    print(f"**Generator (KhanhHH)** — Fri owners: {gen_fri_all} | Mon owners: {gen_mon_all}")

    # Rory owners
    rory_fri_all = rory.get("fri_owners", {})
    rory_mon_all = rory.get("mon_owners", {})
    print(f"**Rory (LeNH)** — Fri owners: {rory_fri_all} | Mon owners: {rory_mon_all}")

    # Franc owners
    franc_fri_all = franc.get("fri_owners", {})
    franc_mon_all = franc.get("mon_owners", {})
    print(f"**Franc (LeNH)** — Fri owners: {franc_fri_all} | Mon owners: {franc_mon_all}")

    # Aysar owners
    ays_fri_all = ays.get("fri_owners", {})
    ays_mon_all = ays.get("mon_owners", {})
    print(f"**Aysar (LeNH+KhanhHH)** — Fri owners: {ays_fri_all} | Mon owners: {ays_mon_all}")

    # Rebecca owners
    reb_fri_all = reb.get("fri_owners", {})
    reb_mon_all = reb.get("mon_owners", {})
    reb_fri_lenh = reb.get("fri_lenh", 0.0)
    reb_mon_lenh = reb.get("mon_lenh", 0.0)
    print(f"**Rebecca** — Fri col G owners: {reb_fri_all} | Mon col G owners: {reb_mon_all}")
    print(f"**Rebecca LeNH (Q-T)** — Fri: {reb_fri_lenh}h | Mon: {reb_mon_lenh}h")

    # JohnYi owners
    jyi_fri_all = jyi.get("fri_owners", {})
    jyi_mon_all = jyi.get("mon_owners", {})
    print(f"**JohnYi (TuanNT)** — Fri owners: {jyi_fri_all} | Mon owners: {jyi_mon_all}")

    # Paturevision
    print(f"**Paturevision** — Fri22 owners: {pat.get('fri_may22_owners',{})} | Sat23 owners: {pat.get('sat_may23_owners',{})}")
    print(f"  Mon25 owners: {pat.get('mon_may25_owners',{})}")

    # Maddy
    maddy_fri_all = maddy.get("fri_owners", {})
    maddy_mon_all = maddy.get("mon_owners", {})
    print(f"**Maddy (LongVV)** — Fri owners: {maddy_fri_all} | Mon owners: {maddy_mon_all}")
    print(f"  Prev week total (W7 May18-24): {maddy.get('prev_weekly_total',0.0)}h | Curr week (W8 May25-31): {maddy.get('curr_weekly_total',0.0)}h")

    # Fountain
    fount = results["Fountain"]
    print(f"**Fountain** — W27 (May18-24) total: {fount.get('prev_weekly_total',0.0)}h | W28 (May25-31) total: {fount.get('curr_weekly_total',0.0)}h")
    print(f"  W27 owners: {fount.get('prev_owners',{})}")

    print()
    print(f"0h_devs_no_leave: {zero_devs if zero_devs else 'none'}")
    print()
    if alerts:
        print("ALERTS:")
        for a in alerts:
            print(f"  - {a}")
    else:
        print("ALERTS: none")

    print()
    print("---")
    print("NOTE: May 23 is NOT a workday in Paturevision (sheet week = Mon-Sun; May 23=Sat).")
    print("NOTE: For all other sheets, week = Mon-Fri May 18-23; May 23 = last workday.")
    print("NOTE: TuanNT JohnYi W24 summary shows only 2.0h for May 18-24 — likely split with Rebecca.")
    print("NOTE: VuTQ in Fountain = 0h is expected (moved to Paturevision/Bailey).")


if __name__ == "__main__":
    main()
