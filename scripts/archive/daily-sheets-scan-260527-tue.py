#!/usr/bin/env python3
"""Daily sheets scan for 2026-05-27 (Tuesday).
Checks Monday 2026-05-26 hours (W21 day 1 of current week May 25-29).

Based on 260525 script week tabs:
  Maddy:        W8  (May 25-31)
  JohnYi:       W25 (May 25-31)
  Rebecca:      W26 (May 25-31)
  JamesDiamond: W27 (May 25-31)
  Rory:         W13 (May 25-31)
  Franc:        W26 (May 25-31)
  Aysar:        W26 (May 25-31)
  Generator:    W42 (May 25-31)
  Paturevision: W29 (May 25-31)
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
}

# Current week tab names (from 260525 script + 1)
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

# Date tokens for Mon May 26 2026
MON_MAY26_TOKENS = ["Mon, 26/05/26", "26/05/26"]

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
    Returns: {owner: hours, ...}, leave_notes: {owner: note}
    Only 'Task dự án' rows count as official.
    """
    start_idx = find_day_block(rows, date_tokens)
    if start_idx == -1:
        return {}, {}, "DATE_NOT_FOUND"

    owner_hours = {}
    leave_notes = {}
    global_leave = None

    # Check date header row itself for leave note
    header_row = rows[start_idx]
    header_str = str(header_row[0]).strip() if header_row else ""
    if "Nghỉ cả ngày" in header_str:
        global_leave = "Nghỉ cả ngày"
    elif "Nghỉ nửa ngày" in header_str:
        global_leave = "Nghỉ nửa ngày"

    for i, row in enumerate(rows[start_idx + 1:], start=start_idx + 1):
        if not row:
            continue
        row_a = str(row[0]).strip() if row else ""

        # New date block detected
        if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}/\d{2}/\d{2}", row_a):
            break
        if re.match(r"\d{1,2}/\d{2}/\d{2}", row_a) and not any(tok in row_a for tok in date_tokens):
            break

        # Leave note row
        if any(kw in row_a for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            owner = str(row[6]).strip() if len(row) > 6 and row[6] else "ALL"
            leave_notes[owner] = row_a
            if owner == "ALL":
                global_leave = row_a
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

        owner_hours[owner] = owner_hours.get(owner, 0.0) + hrs

    if global_leave and not leave_notes:
        leave_notes["ALL"] = global_leave

    return owner_hours, leave_notes, None


def check_rebecca_lenh(sheet_id, week_tab, date_tokens):
    """Rebecca sheet: LeNH hours in cols Q-T (index 16-19), TuanNT col G."""
    rows = fetch(sheet_id, f"{week_tab}!A:T")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return 0.0, {}, {}, str(rows[0]) if rows else "empty"

    start_idx = find_day_block(rows, date_tokens)
    if start_idx == -1:
        return 0.0, {}, {}, "DATE_NOT_FOUND"

    lenh_hours = 0.0
    owner_hours = {}
    leave_notes = {}

    for i, row in enumerate(rows[start_idx + 1:], start=start_idx + 1):
        if not row:
            continue
        row_a = str(row[0]).strip() if row else ""

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
    """Try to get weekly total from Summary sheet."""
    rows = fetch(sheet_id, "Summary!A1:E80")
    for row in rows:
        if row and week_tab in str(row[0]):
            return parse_hours(row[3]) if len(row) > 3 else 0.0
    return 0.0


def check_sheet_day(sheet_name, sheet_id, week_tab, date_tokens, wide=False):
    """Return (owner_hours_dict, leave_notes_dict, error)."""
    col_range = "A:T" if wide else "A:L"
    rows = fetch(sheet_id, f"{week_tab}!{col_range}")
    if not rows or (rows and "ERROR" in str(rows[0])):
        # Try without tab
        rows = fetch(sheet_id, col_range)
        if not rows or (rows and "ERROR" in str(rows[0])):
            return {}, {}, str(rows[0]) if rows else "empty"
    owner_hrs, leave_notes, err = extract_daily_hours_by_owner(rows, date_tokens)
    return owner_hrs, leave_notes, err


def main():
    print("Fetching May 26 (Monday) data from all sheets...", file=sys.stderr)

    results = {}

    # --- Maddy (LongVV) ---
    print("  Maddy...", file=sys.stderr)
    tab = CURR_TABS["Maddy"]
    rows = fetch(SHEETS["Maddy"], f"{tab}!A:L")
    if not rows or "ERROR" in str(rows[0] if rows else ""):
        rows = fetch(SHEETS["Maddy"], "A:L")
    maddy_mon_owners, maddy_mon_leave, maddy_err = extract_daily_hours_by_owner(rows, MON_MAY26_TOKENS)
    maddy_weekly = get_weekly_summary(SHEETS["Maddy"], tab)
    results["Maddy"] = {
        "tab": tab,
        "mon_owners": maddy_mon_owners,
        "mon_leave": maddy_mon_leave,
        "mon_err": maddy_err,
        "weekly_total": maddy_weekly,
    }

    # --- JamesDiamond (PhucVT) ---
    print("  JamesDiamond...", file=sys.stderr)
    tab = CURR_TABS["JamesDiamond"]
    rows = fetch(SHEETS["JamesDiamond"], f"{tab}!A:L")
    if not rows or "ERROR" in str(rows[0] if rows else ""):
        rows = fetch(SHEETS["JamesDiamond"], "A:L")
    jd_mon_owners, jd_mon_leave, jd_err = extract_daily_hours_by_owner(rows, MON_MAY26_TOKENS)
    jd_weekly = get_weekly_summary(SHEETS["JamesDiamond"], tab)
    results["JamesDiamond"] = {
        "tab": tab,
        "mon_owners": jd_mon_owners,
        "mon_leave": jd_mon_leave,
        "mon_err": jd_err,
        "weekly_total": jd_weekly,
    }

    # --- JohnYi (TuanNT) ---
    print("  JohnYi...", file=sys.stderr)
    tab = CURR_TABS["JohnYi"]
    rows = fetch(SHEETS["JohnYi"], f"{tab}!A:L")
    if not rows or "ERROR" in str(rows[0] if rows else ""):
        rows = fetch(SHEETS["JohnYi"], "A:L")
    jy_mon_owners, jy_mon_leave, jy_err = extract_daily_hours_by_owner(rows, MON_MAY26_TOKENS)
    jy_weekly = get_weekly_summary(SHEETS["JohnYi"], tab)
    results["JohnYi"] = {
        "tab": tab,
        "mon_owners": jy_mon_owners,
        "mon_leave": jy_mon_leave,
        "mon_err": jy_err,
        "weekly_total": jy_weekly,
    }

    # --- Rebecca (TuanNT + LeNH Q-T) ---
    print("  Rebecca...", file=sys.stderr)
    tab = CURR_TABS["Rebecca"]
    reb_lenh, reb_owners, reb_leave, reb_err = check_rebecca_lenh(SHEETS["Rebecca"], tab, MON_MAY26_TOKENS)
    reb_weekly = get_weekly_summary(SHEETS["Rebecca"], tab)
    results["Rebecca"] = {
        "tab": tab,
        "mon_lenh": reb_lenh,
        "mon_owners": reb_owners,
        "mon_leave": reb_leave,
        "mon_err": reb_err,
        "weekly_total": reb_weekly,
    }

    # --- Paturevision (VietPH + VuTQ) ---
    print("  Paturevision...", file=sys.stderr)
    tab = CURR_TABS["Paturevision"]
    rows = fetch(SHEETS["Paturevision"], f"{tab}!A:L")
    if not rows or "ERROR" in str(rows[0] if rows else ""):
        rows = fetch(SHEETS["Paturevision"], "A:L")
    pat_mon_owners, pat_mon_leave, pat_err = extract_daily_hours_by_owner(rows, MON_MAY26_TOKENS)
    pat_weekly = get_weekly_summary(SHEETS["Paturevision"], tab)
    results["Paturevision"] = {
        "tab": tab,
        "mon_owners": pat_mon_owners,
        "mon_leave": pat_mon_leave,
        "mon_err": pat_err,
        "weekly_total": pat_weekly,
    }

    # --- Generator (KhanhHH) ---
    print("  Generator...", file=sys.stderr)
    tab = CURR_TABS["Generator"]
    rows = fetch(SHEETS["Generator"], f"{tab}!A:L")
    if not rows or "ERROR" in str(rows[0] if rows else ""):
        rows = fetch(SHEETS["Generator"], "A:L")
    gen_mon_owners, gen_mon_leave, gen_err = extract_daily_hours_by_owner(rows, MON_MAY26_TOKENS)
    gen_weekly = get_weekly_summary(SHEETS["Generator"], tab)
    results["Generator"] = {
        "tab": tab,
        "mon_owners": gen_mon_owners,
        "mon_leave": gen_mon_leave,
        "mon_err": gen_err,
        "weekly_total": gen_weekly,
    }

    # --- Rory, Franc, Aysar (LeNH) ---
    lenh_per_sheet = {}
    for sh in ["Rory", "Franc", "Aysar"]:
        print(f"  {sh}...", file=sys.stderr)
        tab = CURR_TABS[sh]
        rows = fetch(SHEETS[sh], f"{tab}!A:L")
        if not rows or "ERROR" in str(rows[0] if rows else ""):
            rows = fetch(SHEETS[sh], "A:L")
        owners, leave, err = extract_daily_hours_by_owner(rows, MON_MAY26_TOKENS)
        weekly = get_weekly_summary(SHEETS[sh], tab)
        lenh_per_sheet[sh] = {
            "tab": tab,
            "mon_owners": owners,
            "mon_leave": leave,
            "mon_err": err,
            "weekly_total": weekly,
        }
    results["LeNH_sheets"] = lenh_per_sheet

    # ===== Aggregation =====
    print("\n## Sheets scan — Mon 2026-05-26 (W21, day 1)", file=sys.stderr)

    # LongVV
    longvv_mon = results["Maddy"]["mon_owners"].get("LongVV", 0.0)
    longvv_leave = results["Maddy"]["mon_leave"]
    longvv_weekly = results["Maddy"]["weekly_total"]

    # PhucVT
    jd_all_owners = results["JamesDiamond"]["mon_owners"]
    phucvt_mon = jd_all_owners.get("PhucVT", 0.0)
    phucvt_leave = results["JamesDiamond"]["mon_leave"].get("PhucVT")
    phucvt_weekly = results["JamesDiamond"]["weekly_total"]

    # TuanNT (JohnYi + Rebecca)
    jy_all_owners = results["JohnYi"]["mon_owners"]
    reb_all_owners = results["Rebecca"]["mon_owners"]
    tuanNT_jy = jy_all_owners.get("TuanNT", 0.0)
    tuanNT_reb = reb_all_owners.get("TuanNT", 0.0)
    tuanNT_mon = tuanNT_jy + tuanNT_reb
    tuanNT_leave = (results["JohnYi"]["mon_leave"].get("TuanNT")
                    or results["Rebecca"]["mon_leave"].get("TuanNT"))
    tuanNT_weekly = results["JohnYi"]["weekly_total"] + results["Rebecca"]["weekly_total"]

    # VietPH (Paturevision)
    pat_all_owners = results["Paturevision"]["mon_owners"]
    vietph_mon = pat_all_owners.get("VietPH", 0.0)
    vietph_leave = results["Paturevision"]["mon_leave"].get("VietPH")
    vietph_weekly = results["Paturevision"]["weekly_total"]

    # VuTQ (Paturevision)
    vutq_mon = pat_all_owners.get("VuTQ", 0.0)
    vutq_leave = results["Paturevision"]["mon_leave"].get("VuTQ")

    # KhanhHH (Generator + Aysar)
    gen_all = results["Generator"]["mon_owners"]
    ays_all = results["LeNH_sheets"]["Aysar"]["mon_owners"]
    khanhhh_gen = gen_all.get("KhanhHH", 0.0)
    khanhhh_ays = ays_all.get("KhanhHH", 0.0)
    khanhhh_mon = khanhhh_gen + khanhhh_ays
    khanhhh_leave = (results["Generator"]["mon_leave"].get("KhanhHH")
                     or results["LeNH_sheets"]["Aysar"]["mon_leave"].get("KhanhHH"))
    khanhhh_weekly = results["Generator"]["weekly_total"]

    # LeNH (Rory + Franc + Aysar + Rebecca Q-T)
    rory_all = results["LeNH_sheets"]["Rory"]["mon_owners"]
    franc_all = results["LeNH_sheets"]["Franc"]["mon_owners"]
    lenh_rory = rory_all.get("LeNH", 0.0)
    lenh_franc = franc_all.get("LeNH", 0.0)
    lenh_aysar = ays_all.get("LeNH", 0.0)
    lenh_reb_qt = results["Rebecca"]["mon_lenh"]
    lenh_mon = lenh_rory + lenh_franc + lenh_aysar + lenh_reb_qt
    lenh_leave = (results["LeNH_sheets"]["Rory"]["mon_leave"].get("LeNH")
                  or results["LeNH_sheets"]["Franc"]["mon_leave"].get("LeNH")
                  or results["LeNH_sheets"]["Aysar"]["mon_leave"].get("LeNH"))
    lenh_weekly = (
        results["LeNH_sheets"]["Rory"]["weekly_total"]
        + results["LeNH_sheets"]["Franc"]["weekly_total"]
        + results["LeNH_sheets"]["Aysar"]["weekly_total"]
    )

    # ===== Print results =====
    print()
    print("## Sheets — 08:37 +07:00")
    print()
    print("**Date checked:** Monday 2026-05-26 | Week: W21 (May 25–29)")
    print()
    print("| Developer | Mon 5/26 | Leave? | Status | W21 so far |")
    print("|-----------|----------|--------|--------|-----------|")

    alerts = []
    reminders = []

    def status_row(dev, mon_h, leave, weekly, target_day=8.0, is_weekly=False, weekly_target=None):
        leave_str = leave if leave else "No"
        w_str = f"{weekly:.1f}h"
        if is_weekly:
            w_target = weekly_target or 16.0
            if weekly >= w_target:
                st = "✓"
            elif weekly > 0:
                st = f"⚠️ {weekly:.1f}/{w_target}h"
            else:
                st = f"— {weekly:.1f}/{w_target}h"
            return f"{mon_h:.1f}h", leave_str, st, w_str
        else:
            full_day_leave = leave and "cả ngày" in str(leave).lower()
            half_day_leave = leave and "nửa ngày" in str(leave).lower()
            if full_day_leave:
                st = "✓ (leave)"
            elif half_day_leave:
                ok = mon_h >= 4.0
                st = "✓ (half)" if ok else f"⚠️ {mon_h:.1f}h (half day)"
            elif mon_h >= target_day:
                st = "✓"
            elif mon_h >= target_day * 0.5:
                st = f"⚠️ {mon_h:.1f}h"
            else:
                st = f"⚠️ 0h" if mon_h == 0 else f"⚠️ {mon_h:.1f}h"
            return f"{mon_h:.1f}h", leave_str, st, w_str

    rows_out = {}

    # TuanNT
    m, l, s, w = status_row("TuanNT", tuanNT_mon, tuanNT_leave, tuanNT_weekly)
    rows_out["TuanNT"] = (m, l, s, w)
    print(f"| TuanNT | {m} | {l} | {s} | {w} |")
    if "⚠️" in s and not tuanNT_leave:
        alerts.append(f"TuanNT: {tuanNT_mon:.1f}h on Mon 5/26 — GATES John Yi + Bailey + Rebecca")
        reminders.append(("TuanNT", "!knbJbIKzXRJNGVFQNg:nustechnology.com", tuanNT_mon))

    # PhucVT
    m, l, s, w = status_row("PhucVT", phucvt_mon, phucvt_leave, phucvt_weekly)
    rows_out["PhucVT"] = (m, l, s, w)
    print(f"| PhucVT | {m} | {l} | {s} | {w} |")
    if "⚠️" in s and not phucvt_leave:
        alerts.append(f"PhucVT: {phucvt_mon:.1f}h on Mon 5/26 — James Diamond gate")
        reminders.append(("PhucVT", "!kzyLVmJxcRESoTkfnY:nustechnology.com", phucvt_mon))

    # VietPH
    m, l, s, w = status_row("VietPH", vietph_mon, vietph_leave, vietph_weekly)
    rows_out["VietPH"] = (m, l, s, w)
    print(f"| VietPH | {m} | {l} | {s} | {w} |")
    if "⚠️" in s and not vietph_leave:
        alerts.append(f"VietPH: {vietph_mon:.1f}h on Mon 5/26 — Bailey gate")
        reminders.append(("VietPH", None, vietph_mon))

    # KhanhHH
    m, l, s, w = status_row("KhanhHH", khanhhh_mon, khanhhh_leave, khanhhh_weekly)
    rows_out["KhanhHH"] = (m, l, s, w)
    print(f"| KhanhHH | {m} | {l} | {s} | {w} |")
    if "⚠️" in s and not khanhhh_leave:
        alerts.append(f"KhanhHH: {khanhhh_mon:.1f}h on Mon 5/26 — Elliott gate")
        reminders.append(("KhanhHH", None, khanhhh_mon))

    # LeNH
    m, l, s, w = status_row("LeNH", lenh_mon, lenh_leave, lenh_weekly)
    rows_out["LeNH"] = (m, l, s, w)
    print(f"| LeNH | {m} | {l} | {s} | {w} |")
    if "⚠️" in s and not lenh_leave:
        alerts.append(f"LeNH: {lenh_mon:.1f}h on Mon 5/26 — Rory/Franc/Aysar gates")
        reminders.append(("LeNH", "!OIrgPraJWrcDTnRVLQ:nustechnology.com", lenh_mon))

    # LongVV (weekly only)
    wt = longvv_weekly
    lv_leave = longvv_leave
    if wt >= 16:
        wst = "✓"
    elif wt > 0:
        wst = f"⚠️ {wt:.1f}/16h"
        alerts.append(f"LongVV: W21 total only {wt:.1f}h (target 16h) — but only 1 day logged so far")
    else:
        wst = f"— {wt:.1f}/16h (week just started)"
    print(f"| LongVV | {longvv_mon:.1f}h | — | weekly only | {wt:.1f}h (target 16h) |")

    print()

    # Alerts
    print("**Alerts:**")
    if alerts:
        for a in alerts:
            print(f"  - {a}")
    else:
        print("  None")

    print()
    print("**Trello gates:**")
    tuanNT_ok = tuanNT_mon >= 8.0 or (tuanNT_leave and "cả ngày" in str(tuanNT_leave).lower())
    phucvt_ok = phucvt_mon >= 8.0 or (phucvt_leave and "cả ngày" in str(phucvt_leave).lower())
    vietph_ok = vietph_mon >= 8.0 or (vietph_leave and "cả ngày" in str(vietph_leave).lower())
    khanhhh_ok = khanhhh_mon >= 8.0 or (khanhhh_leave and "cả ngày" in str(khanhhh_leave).lower())
    lenh_ok = lenh_mon >= 8.0 or (lenh_leave and "cả ngày" in str(lenh_leave).lower())
    print(f"  - TuanNT: {'OK' if tuanNT_ok else 'ALERT'} (gates John Yi, Bailey, Rebecca)")
    print(f"  - PhucVT: {'OK' if phucvt_ok else 'ALERT'} (James Diamond gate)")
    print(f"  - VietPH: {'OK' if vietph_ok else 'ALERT'} (Bailey gate)")
    print(f"  - KhanhHH: {'OK' if khanhhh_ok else 'ALERT'} (Elliott gate)")
    print(f"  - LeNH: {'OK' if lenh_ok else 'ALERT'} (Rory/Franc/Aysar gates)")

    print()
    print("**Reminders needed:**")
    if reminders:
        for dev, room, hrs in reminders:
            room_str = room or "(no room ID — check matrix config)"
            print(f"  - {dev} ({hrs:.1f}h): {room_str}")
    else:
        print("  None")

    print()
    print("## Raw data (for verification)")
    print()
    print(f"JamesDiamond all owners Mon: {jd_all_owners}")
    print(f"JohnYi all owners Mon: {jy_all_owners}")
    print(f"Rebecca all owners Mon: {reb_all_owners} | LeNH Q-T: {results['Rebecca']['mon_lenh']:.1f}h")
    print(f"Paturevision all owners Mon: {pat_all_owners}")
    print(f"Generator all owners Mon: {gen_all}")
    print(f"Rory all owners Mon: {rory_all}")
    print(f"Franc all owners Mon: {franc_all}")
    print(f"Aysar all owners Mon: {ays_all}")
    print(f"Maddy all owners Mon: {results['Maddy']['mon_owners']}")
    print()
    print(f"TuanNT breakdown: JohnYi={tuanNT_jy:.1f}h + Rebecca={tuanNT_reb:.1f}h = {tuanNT_mon:.1f}h")
    print(f"KhanhHH breakdown: Generator={khanhhh_gen:.1f}h + Aysar={khanhhh_ays:.1f}h = {khanhhh_mon:.1f}h")
    print(f"LeNH breakdown: Rory={lenh_rory:.1f}h + Franc={lenh_franc:.1f}h + Aysar={lenh_aysar:.1f}h + Rebecca(Q-T)={lenh_reb_qt:.1f}h = {lenh_mon:.1f}h")
    print()
    print(f"Errors: Maddy={results['Maddy']['mon_err']}, JD={jd_err}, JY={jy_err}, Reb={reb_err}, Pat={pat_err}, Gen={gen_err}")
    print(f"  Rory={lenh_per_sheet['Rory']['mon_err']}, Franc={lenh_per_sheet['Franc']['mon_err']}, Aysar={lenh_per_sheet['Aysar']['mon_err']}")
    print()
    print(f"VuTQ Mon (Paturevision): {vutq_mon:.1f}h | leave: {vutq_leave}")
    print(f"LongVV weekly so far (W8): {longvv_weekly:.1f}h")


if __name__ == "__main__":
    main()
