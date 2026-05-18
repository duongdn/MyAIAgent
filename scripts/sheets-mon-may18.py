#!/usr/bin/env python3
"""Daily report task-log scan for Mon 2026-05-18.

Checks:
  - Fri 2026-05-16 (last workday, in W26: May 11-16)
  - Mon 2026-05-18 (today, in W27: May 18-22 — devs may not have logged yet)

Also fetches W26 weekly totals from Summary tab.
"""
import json
import time
from collections import defaultdict
from datetime import date
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",   # LongVV Maddy
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",   # PhucVT + LongVV(JD)
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",   # TuanNT
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",   # TuanNT + LeNH Q-T
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",   # VietPH + VuTQ
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",   # KhanhHH
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",   # LeNH
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",   # LeNH
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",   # LeNH
}

REBECCA_SID = SHEETS["Rebecca"]

# W26: Mon 11/05/26 → Fri 16/05/26
W26_MONDAY = "May 11, 2026"
W26_MON_TOKEN = "11/05/26"

# W27: Mon 18/05/26 → Fri 22/05/26
W27_MONDAY = "May 18, 2026"
W27_MON_TOKEN = "18/05/26"

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds)


def fetch(sheet_id, rng, retries=3):
    for i in range(retries):
        try:
            return svc.spreadsheets().values().get(
                spreadsheetId=sheet_id, range=rng
            ).execute().get("values", [])
        except Exception as e:
            if "429" in str(e) and i < retries - 1:
                print(f"  Rate limit, sleeping 45s...")
                time.sleep(45)
                continue
            return [["ERR", str(e)[:120]]]
    return []


def list_tab_names(sheet_id):
    try:
        meta = svc.spreadsheets().get(spreadsheetId=sheet_id).execute()
        return [s['properties']['title'] for s in meta.get('sheets', [])]
    except Exception as e:
        print(f"  list_tab_names error: {e}")
        return []


def find_week_tab_via_summary(sheet_id, target_monday_str):
    """Find W-tab in Summary by matching the week-start date string."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) < 2:
            continue
        start_str = str(r[1])
        # Check multiple formats of the date
        date_parts = target_monday_str.split(", ")  # e.g. "May 11" and "2026"
        if len(date_parts) == 2:
            month_day, year = date_parts
            short_year = year[2:]
            # Try various formats
            checks = [
                target_monday_str,
                f"{month_day} {year}",
            ]
            for c in checks:
                if c in start_str:
                    return r[0]
    return None


def find_week_tab_by_first_date(sheet_id, target_tokens):
    """Scan recent W-tabs for one that contains target_tokens in a day header."""
    tabs = list_tab_names(sheet_id)
    candidates = [t for t in tabs if t.startswith("W")]
    def num(t):
        try:
            return int(t[1:])
        except Exception:
            return -1
    candidates.sort(key=num, reverse=True)
    for tab in candidates[:8]:
        rows = fetch(sheet_id, f"'{tab}'!A1:A80")
        for r in rows:
            if not r:
                continue
            a = str(r[0])
            for token in target_tokens:
                if token in a and any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
                    return tab
        time.sleep(0.3)
    return None


def parse_hours(cell):
    try:
        return float(str(cell).replace(",", "."))
    except Exception:
        return 0.0


def find_header_indices(data):
    out = []
    for i, row in enumerate(data):
        if not row:
            continue
        a = str(row[0]) if row else ""
        if any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
            out.append((i, a))
    return out


def scan_day_in_tab(sheet_id, week_tab, day_prefix, day_token, project_label=""):
    """Scan one specific day within a week tab. Returns (owner->hours, leave_markers, raw)."""
    data = fetch(sheet_id, f"'{week_tab}'!A1:T280")
    if not data or (len(data) > 0 and data[0] and data[0][0] == "ERR"):
        return {}, [], f"fetch error: {data[:1]}"

    header_indices = find_header_indices(data)
    day_start = None
    day_end = None
    for j, (i, a) in enumerate(header_indices):
        if day_token in a and a.startswith(day_prefix):
            day_start = i
            day_end = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break

    if day_start is None:
        return {}, [], f"Day header {day_prefix} {day_token} not found in {week_tab}"

    per_owner = defaultdict(float)
    leave_markers = []
    raw = []

    paturevision_skipped_first = False
    for i in range(day_start, day_end):
        row = data[i] if i < len(data) else []
        a = (row[0] if len(row) > 0 else '') or ''
        c = (row[2] if len(row) > 2 else '') or ''
        g = (row[6] if len(row) > 6 else '') or ''
        h = (row[7] if len(row) > 7 else '') or ''
        raw.append({"row": i + 1, "A": str(a)[:40], "C": str(c)[:50], "G": str(g)[:20], "H": str(h)[:10]})

        if "Nghỉ" in str(a):
            leave_markers.append({"row": i + 1, "A": str(a), "G": str(g)})
            continue
        if str(a) != "Task dự án":
            continue
        owner = str(g).strip()
        if project_label == "Paturevision" and not paturevision_skipped_first:
            if not owner and not str(c).strip() and not str(h).strip():
                paturevision_skipped_first = True
                continue
            paturevision_skipped_first = True
        if not owner:
            continue
        per_owner[owner] += parse_hours(h)

    return dict(per_owner), leave_markers, None


def scan_rebecca_qt_day(week_tab, day_prefix, day_token):
    """Scan Rebecca cols Q-T for LeNH hours on a specific day."""
    data = fetch(REBECCA_SID, f"'{week_tab}'!A1:T280")
    if not data or (data[0] and data[0][0] == "ERR"):
        return 0.0

    header_indices = find_header_indices(data)
    day_start = None
    day_end = None
    for j, (i, a) in enumerate(header_indices):
        if day_token in a and a.startswith(day_prefix):
            day_start = i
            day_end = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break

    if day_start is None:
        return 0.0

    total = 0.0
    for i in range(day_start, day_end):
        row = data[i] if i < len(data) else []
        a = (row[0] if len(row) > 0 else '') or ''
        if str(a) != "Task dự án":
            continue
        for ci in (16, 17, 18, 19):
            if len(row) > ci:
                total += parse_hours(row[ci])
    return total


def fetch_summary_weekly_total(sheet_id, week_label):
    """Fetch col D (grand total hours) from Summary tab for a given W-label."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) >= 4 and str(r[0]).strip() == week_label:
            return parse_hours(r[3])
    # Also try matching without exact label — find latest entry whose date range includes May 16
    for r in rows:
        if len(r) >= 4 and week_label[:2] in str(r[0]):  # "W2" prefix
            return parse_hours(r[3])
    return None


def fetch_all_summary_rows(sheet_id):
    """Fetch all Summary rows for debugging."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    out = []
    for r in rows:
        if any(str(c).strip() for c in r):
            out.append(r)
    return out


def main():
    results = {}

    # ---- STEP 1: Find W26 and W27 tabs for each sheet ----
    week_tabs = {}  # sheet -> {w26: tab, w27: tab}
    print("=== Finding week tabs ===")
    for project, sid in SHEETS.items():
        print(f"\n-- {project} --")
        # W26 (contains Fri May 16)
        w26 = find_week_tab_via_summary(sid, W26_MONDAY)
        if not w26:
            w26 = find_week_tab_by_first_date(sid, [W26_MON_TOKEN, "15/05/26", "16/05/26"])
        # W27 (contains Mon May 18)
        w27 = find_week_tab_via_summary(sid, W27_MONDAY)
        if not w27:
            w27 = find_week_tab_by_first_date(sid, [W27_MON_TOKEN, "22/05/26"])
        print(f"  W26 tab: {w26}, W27 tab: {w27}")
        week_tabs[project] = {"w26": w26, "w27": w27}
        time.sleep(0.3)

    # ---- STEP 2: Scan Fri 16/05/26 across all sheets (W26) ----
    print("\n\n=== Scanning Fri 2026-05-16 (W26) ===")
    fri_per_owner = defaultdict(float)      # owner -> total hours
    fri_per_project = defaultdict(lambda: defaultdict(float))  # owner -> project -> hours
    fri_leave = defaultdict(list)           # owner -> [{project, A, row}]
    fri_errors = {}

    for project, sid in SHEETS.items():
        w26 = week_tabs[project]["w26"]
        if not w26:
            print(f"  {project}: No W26 tab found, skipping")
            fri_errors[project] = "W26 tab not found"
            continue

        print(f"\n  {project} (W26={w26})", flush=True)
        per_owner, leave, err = scan_day_in_tab(sid, w26, "Fri,", "16/05/26", project_label=project)
        if err:
            print(f"    ERR: {err}")
            fri_errors[project] = str(err)
            if not isinstance(err, str) or "not found" not in err:
                continue
            per_owner = {}
            leave = []

        for o, h in per_owner.items():
            fri_per_owner[o] += h
            fri_per_project[o][project] += h
            print(f"    {o}: {h:.2f}h")

        for lv in leave:
            owner_hint = lv.get("G", "")
            fri_leave[owner_hint].append({"project": project, "A": lv["A"], "row": lv["row"]})
            print(f"    LEAVE row{lv['row']}: {lv['A']!r} G={lv['G']!r}")

        time.sleep(0.5)

    # Rebecca Q-T for LeNH (Fri)
    w26_rebecca = week_tabs["Rebecca"]["w26"]
    if w26_rebecca:
        lenh_qt_fri = scan_rebecca_qt_day(w26_rebecca, "Fri,", "16/05/26")
        print(f"\n  Rebecca Q-T LeNH Fri: {lenh_qt_fri:.2f}h")
        if lenh_qt_fri:
            fri_per_owner["LeNH"] += lenh_qt_fri
            fri_per_project["LeNH"]["Rebecca(Q-T)"] += lenh_qt_fri

    # ---- STEP 3: Scan Mon 18/05/26 across all sheets (W27) ----
    print("\n\n=== Scanning Mon 2026-05-18 (W27) ===")
    mon_per_owner = defaultdict(float)
    mon_per_project = defaultdict(lambda: defaultdict(float))
    mon_leave = defaultdict(list)
    mon_errors = {}

    for project, sid in SHEETS.items():
        w27 = week_tabs[project]["w27"]
        if not w27:
            print(f"  {project}: No W27 tab found (may not exist yet)")
            mon_errors[project] = "W27 tab not found"
            continue

        print(f"\n  {project} (W27={w27})", flush=True)
        per_owner, leave, err = scan_day_in_tab(sid, w27, "Mon,", "18/05/26", project_label=project)
        if err:
            print(f"    ERR: {err}")
            mon_errors[project] = str(err)
            per_owner = {}
            leave = []

        for o, h in per_owner.items():
            mon_per_owner[o] += h
            mon_per_project[o][project] += h
            print(f"    {o}: {h:.2f}h")

        for lv in leave:
            owner_hint = lv.get("G", "")
            mon_leave[owner_hint].append({"project": project, "A": lv["A"], "row": lv["row"]})
            print(f"    LEAVE row{lv['row']}: {lv['A']!r} G={lv['G']!r}")

        time.sleep(0.5)

    # Rebecca Q-T for LeNH (Mon)
    w27_rebecca = week_tabs["Rebecca"]["w27"]
    if w27_rebecca:
        lenh_qt_mon = scan_rebecca_qt_day(w27_rebecca, "Mon,", "18/05/26")
        print(f"\n  Rebecca Q-T LeNH Mon: {lenh_qt_mon:.2f}h")
        if lenh_qt_mon:
            mon_per_owner["LeNH"] += lenh_qt_mon
            mon_per_project["LeNH"]["Rebecca(Q-T)"] += lenh_qt_mon

    # ---- STEP 4: Fetch W26 weekly totals from Summary ----
    print("\n\n=== Fetching W26 weekly totals from Summary tabs ===")
    weekly_totals = {}  # project -> {w26_label: str, w26_total: float}

    for project, sid in SHEETS.items():
        w26 = week_tabs[project]["w26"]
        if not w26:
            continue
        # Fetch all summary rows to find the right one
        summary_rows = fetch_all_summary_rows(sid)
        print(f"\n  {project} Summary rows:")
        matched_row = None
        for r in summary_rows:
            print(f"    {r}")
            # Match W26 by week label or date range containing May 11/16
            r0 = str(r[0]).strip() if r else ""
            r1 = str(r[1]).strip() if len(r) > 1 else ""
            is_w26 = (
                str(r0) == str(w26) or
                "May 11" in r1 or "May 12" in r1 or "May 16" in r1 or
                "11/05" in r1 or "16/05" in r1
            )
            if is_w26 and len(r) >= 4:
                matched_row = r
        if matched_row:
            total = parse_hours(matched_row[3]) if len(matched_row) > 3 else 0.0
            weekly_totals[project] = {"label": matched_row[0], "start": matched_row[1] if len(matched_row) > 1 else "", "total": total}
            print(f"  -> W26 total: {total:.2f}h (label={matched_row[0]})")
        else:
            weekly_totals[project] = {"label": w26, "start": "", "total": None}
            print(f"  -> W26 total: not found in Summary")
        time.sleep(0.4)

    # ---- STEP 5: Output structured results ----
    out = {
        "week_tabs": week_tabs,
        "fri_2026_05_16": {
            "per_owner": dict(fri_per_owner),
            "per_project": {o: dict(p) for o, p in fri_per_project.items()},
            "leave": dict(fri_leave),
            "errors": fri_errors,
        },
        "mon_2026_05_18": {
            "per_owner": dict(mon_per_owner),
            "per_project": {o: dict(p) for o, p in mon_per_project.items()},
            "leave": dict(mon_leave),
            "errors": mon_errors,
        },
        "w26_weekly_totals": weekly_totals,
    }

    outfile = "/tmp/sheets_mon_may18.json"
    with open(outfile, "w") as fh:
        json.dump(out, fh, indent=2, default=str)
    print(f"\n\nWrote {outfile}")

    # ---- STEP 6: Print summary table ----
    print("\n\n=== SUMMARY ===")
    print(f"\nFri 2026-05-16 hours by owner:")
    for o in sorted(fri_per_owner.keys()):
        proj_str = ", ".join(f"{p}={v:.2f}" for p, v in sorted(fri_per_project[o].items()))
        print(f"  {o:14s}: {fri_per_owner[o]:.2f}h   [{proj_str}]")
    if fri_leave:
        print("\nFri 2026-05-16 LEAVE markers:")
        for g, entries in fri_leave.items():
            for e in entries:
                print(f"  G={g!r} {e['A']!r} (proj={e['project']} row={e['row']})")

    print(f"\nMon 2026-05-18 hours by owner:")
    for o in sorted(mon_per_owner.keys()):
        proj_str = ", ".join(f"{p}={v:.2f}" for p, v in sorted(mon_per_project[o].items()))
        print(f"  {o:14s}: {mon_per_owner[o]:.2f}h   [{proj_str}]")
    if mon_leave:
        print("\nMon 2026-05-18 LEAVE markers:")
        for g, entries in mon_leave.items():
            for e in entries:
                print(f"  G={g!r} {e['A']!r} (proj={e['project']} row={e['row']})")

    print(f"\nW26 weekly totals from Summary:")
    for project, info in weekly_totals.items():
        total_str = f"{info['total']:.2f}h" if info['total'] is not None else "N/A"
        print(f"  {project:14s}: {total_str} (label={info['label']})")

    return out


if __name__ == "__main__":
    main()
