#!/usr/bin/env python3
"""Daily report task-log scan for Tue 2026-05-19 and W27 weekly totals.

Checks:
  - Tue 2026-05-19 (yesterday)
  - W27: May 18-22, 2026
"""
import json
import time
from collections import defaultdict
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",   # LongVV Maddy
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",   # PhucVT
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",   # TuanNT
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",   # TuanNT + LeNH Q-T
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",   # VietPH + VuTQ
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",   # KhanhHH
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",   # LeNH
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",   # LeNH
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",   # LeNH
}

REBECCA_SID = SHEETS["Rebecca"]

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
            print(f"  fetch error: {e}")
            return [["ERR", str(e)[:120]]]
    return []


def list_tab_names(sheet_id):
    try:
        meta = svc.spreadsheets().get(spreadsheetId=sheet_id).execute()
        return [s['properties']['title'] for s in meta.get('sheets', [])]
    except Exception as e:
        print(f"  list_tab_names error: {e}")
        return []


def find_week_tab_by_first_date(sheet_id, target_tokens):
    """Scan recent W-tabs for one containing target_tokens in a day header."""
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
                if token in a and any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,")):
                    return tab
        time.sleep(0.3)
    return None


def find_week_tab_via_summary(sheet_id, target_monday_str):
    """Find W-tab in Summary by matching the week-start date string."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) < 2:
            continue
        start_str = str(r[1])
        date_parts = target_monday_str.split(", ")
        if len(date_parts) == 2:
            month_day, year = date_parts
            checks = [target_monday_str, f"{month_day} {year}"]
            for c in checks:
                if c in start_str:
                    return r[0]
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
    """Scan one specific day within a week tab. Returns (owner->hours, leave_markers, err)."""
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


def scan_paturevision_upwork_vietph(sheet_id, week_tab, day_prefix, day_token):
    """Scan Paturevision for VietPH rows where col E = '[Maintenance] Update PHP version on Prestashop'."""
    data = fetch(sheet_id, f"'{week_tab}'!A1:T280")
    if not data:
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
        e = (row[4] if len(row) > 4 else '') or ''
        g = (row[6] if len(row) > 6 else '') or ''
        h = (row[7] if len(row) > 7 else '') or ''
        if str(a) == "Task dự án" and "VietPH" in str(g) and "PHP" in str(e):
            total += parse_hours(h)
    return total


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


def fetch_all_summary_rows(sheet_id):
    """Fetch all Summary rows."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    out = []
    for r in rows:
        if any(str(c).strip() for c in r):
            out.append(r)
    return out


def main():
    # ---- STEP 1: Find W27 tabs for each sheet ----
    week_tabs = {}
    print("=== Finding W27 tabs ===")
    for project, sid in SHEETS.items():
        print(f"\n-- {project} --")
        w27 = find_week_tab_via_summary(sid, W27_MONDAY)
        if not w27:
            w27 = find_week_tab_by_first_date(sid, [W27_MON_TOKEN, "19/05/26", "22/05/26"])
        print(f"  W27 tab: {w27}")
        week_tabs[project] = {"w27": w27}
        time.sleep(0.3)

    # ---- STEP 2: Scan Tue 19/05/26 across all sheets (W27) ----
    print("\n\n=== Scanning Tue 2026-05-19 (W27) ===")
    tue_per_owner = defaultdict(float)
    tue_per_project = defaultdict(lambda: defaultdict(float))
    tue_leave = defaultdict(list)
    tue_errors = {}

    for project, sid in SHEETS.items():
        w27 = week_tabs[project]["w27"]
        if not w27:
            print(f"  {project}: No W27 tab found, skipping")
            tue_errors[project] = "W27 tab not found"
            continue

        print(f"\n  {project} (W27={w27})", flush=True)
        per_owner, leave, err = scan_day_in_tab(sid, w27, "Tue,", "19/05/26", project_label=project)
        if err:
            print(f"    ERR: {err}")
            tue_errors[project] = str(err)
            per_owner = {}
            leave = []

        for o, h in per_owner.items():
            tue_per_owner[o] += h
            tue_per_project[o][project] += h
            print(f"    {o}: {h:.2f}h")

        for lv in leave:
            owner_hint = lv.get("G", "")
            tue_leave[owner_hint].append({"project": project, "A": lv["A"], "row": lv["row"]})
            print(f"    LEAVE row{lv['row']}: {lv['A']!r} G={lv['G']!r}")

        time.sleep(0.5)

    # Rebecca Q-T for LeNH (Tue)
    w27_rebecca = week_tabs["Rebecca"]["w27"]
    if w27_rebecca:
        lenh_qt_tue = scan_rebecca_qt_day(w27_rebecca, "Tue,", "19/05/26")
        print(f"\n  Rebecca Q-T LeNH Tue: {lenh_qt_tue:.2f}h")
        if lenh_qt_tue:
            tue_per_owner["LeNH"] += lenh_qt_tue
            tue_per_project["LeNH"]["Rebecca(Q-T)"] += lenh_qt_tue

    # VietPH Upwork (Maintenance PHP task) for Tue
    patu_w27 = week_tabs["Paturevision"]["w27"]
    if patu_w27:
        vietph_php_tue = scan_paturevision_upwork_vietph(
            SHEETS["Paturevision"], patu_w27, "Tue,", "19/05/26"
        )
        print(f"\n  VietPH PHP maintenance (Tue): {vietph_php_tue:.2f}h")

    # ---- STEP 3: Fetch W27 weekly totals from Summary ----
    print("\n\n=== Fetching W27 weekly totals from Summary tabs ===")
    weekly_totals = {}

    for project, sid in SHEETS.items():
        w27 = week_tabs[project]["w27"]
        if not w27:
            continue
        summary_rows = fetch_all_summary_rows(sid)
        print(f"\n  {project} Summary rows:")
        matched_row = None
        for r in summary_rows:
            print(f"    {r}")
            r0 = str(r[0]).strip() if r else ""
            r1 = str(r[1]).strip() if len(r) > 1 else ""
            is_w27 = (
                str(r0) == str(w27) or
                "May 18" in r1 or "May 19" in r1 or "May 22" in r1 or
                "18/05" in r1 or "22/05" in r1
            )
            if is_w27 and len(r) >= 4:
                matched_row = r
        if matched_row:
            total = parse_hours(matched_row[3]) if len(matched_row) > 3 else 0.0
            weekly_totals[project] = {"label": matched_row[0], "start": matched_row[1] if len(matched_row) > 1 else "", "total": total}
            print(f"  -> W27 total: {total:.2f}h (label={matched_row[0]})")
        else:
            # Try by week label directly from W tab contents
            weekly_totals[project] = {"label": w27, "start": "", "total": None}
            print(f"  -> W27 total: not found in Summary")
        time.sleep(0.4)

    # ---- STEP 4: Per-dev weekly totals by scanning Mon-Tue W27 ----
    # Also sum by owner for Mon+Tue to estimate weekly so far
    print("\n\n=== Scanning Mon 2026-05-18 (W27) for per-owner weekly accumulation ===")
    mon_per_owner = defaultdict(float)
    mon_per_project = defaultdict(lambda: defaultdict(float))
    mon_leave = defaultdict(list)

    for project, sid in SHEETS.items():
        w27 = week_tabs[project]["w27"]
        if not w27:
            continue
        print(f"\n  {project} (W27={w27})", flush=True)
        per_owner, leave, err = scan_day_in_tab(sid, w27, "Mon,", "18/05/26", project_label=project)
        if err:
            print(f"    ERR: {err}")
            per_owner = {}
            leave = []
        for o, h in per_owner.items():
            mon_per_owner[o] += h
            mon_per_project[o][project] += h
            print(f"    {o}: {h:.2f}h")
        for lv in leave:
            owner_hint = lv.get("G", "")
            mon_leave[owner_hint].append({"project": project, "A": lv["A"], "row": lv["row"]})
        time.sleep(0.4)

    # Rebecca Q-T for LeNH Mon
    if w27_rebecca:
        lenh_qt_mon = scan_rebecca_qt_day(w27_rebecca, "Mon,", "18/05/26")
        if lenh_qt_mon:
            mon_per_owner["LeNH"] += lenh_qt_mon
            mon_per_project["LeNH"]["Rebecca(Q-T)"] += lenh_qt_mon

    # ---- STEP 5: Compute Mon+Tue subtotals per owner ----
    all_owners = set(list(tue_per_owner.keys()) + list(mon_per_owner.keys()))
    w27_mon_tue = {}
    for o in all_owners:
        w27_mon_tue[o] = mon_per_owner.get(o, 0.0) + tue_per_owner.get(o, 0.0)

    # ---- Output ----
    out = {
        "week_tabs": week_tabs,
        "tue_2026_05_19": {
            "per_owner": dict(tue_per_owner),
            "per_project": {o: dict(p) for o, p in tue_per_project.items()},
            "leave": dict(tue_leave),
            "errors": tue_errors,
        },
        "mon_2026_05_18": {
            "per_owner": dict(mon_per_owner),
            "per_project": {o: dict(p) for o, p in mon_per_project.items()},
            "leave": dict(mon_leave),
        },
        "w27_mon_tue_subtotal": w27_mon_tue,
        "w27_summary_totals": weekly_totals,
    }

    outfile = "/tmp/sheets_tue_may19.json"
    with open(outfile, "w") as fh:
        json.dump(out, fh, indent=2, default=str)
    print(f"\n\nWrote {outfile}")

    # ---- Print summary table ----
    print("\n\n=== SUMMARY TABLE ===")
    print(f"\nTue 2026-05-19 hours by owner:")
    for o in sorted(tue_per_owner.keys()):
        proj_str = ", ".join(f"{p}={v:.2f}" for p, v in sorted(tue_per_project[o].items()))
        print(f"  {o:14s}: {tue_per_owner[o]:.2f}h   [{proj_str}]")

    if tue_leave:
        print("\nTue 2026-05-19 LEAVE markers:")
        for g, entries in tue_leave.items():
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

    print(f"\nW27 Mon+Tue subtotals per owner:")
    for o in sorted(w27_mon_tue.keys()):
        print(f"  {o:14s}: {w27_mon_tue[o]:.2f}h")

    print(f"\nW27 Summary tab totals:")
    for project, info in weekly_totals.items():
        total_str = f"{info['total']:.2f}h" if info['total'] is not None else "N/A"
        print(f"  {project:14s}: {total_str} (label={info['label']})")

    return out


if __name__ == "__main__":
    main()
