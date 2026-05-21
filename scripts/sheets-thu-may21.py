#!/usr/bin/env python3
"""Daily report task-log scan for Thu 2026-05-21 and W27 weekly totals (Mon-Thu).

Checks:
  - Thu 2026-05-21 (today)
  - W27: May 18-22, 2026 (Mon-Thu so far)
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

    paturevision_skipped_first = False
    for i in range(day_start, day_end):
        row = data[i] if i < len(data) else []
        a = (row[0] if len(row) > 0 else '') or ''
        c = (row[2] if len(row) > 2 else '') or ''
        g = (row[6] if len(row) > 6 else '') or ''
        h = (row[7] if len(row) > 7 else '') or ''

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
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    out = []
    for r in rows:
        if any(str(c).strip() for c in r):
            out.append(r)
    return out


def scan_all_days_for_owner(sheet_id, week_tab, day_configs, project_label=""):
    """Scan multiple days and return per-owner totals."""
    per_owner = defaultdict(float)
    leaves = defaultdict(list)
    for day_prefix, day_token in day_configs:
        owners, leave, err = scan_day_in_tab(sheet_id, week_tab, day_prefix, day_token, project_label)
        if err:
            print(f"    ERR scanning {day_prefix} {day_token}: {err}")
        for o, h in owners.items():
            per_owner[o] += h
        for lv in leave:
            leaves[lv.get("G", "")].append(lv)
        time.sleep(0.3)
    return dict(per_owner), dict(leaves)


def main():
    # W27: Mon-Thu
    W27_DAYS = [
        ("Mon,", "18/05/26"),
        ("Tue,", "19/05/26"),
        ("Wed,", "20/05/26"),
        ("Thu,", "21/05/26"),
    ]
    THU_PREFIX = "Thu,"
    THU_TOKEN = "21/05/26"

    # ---- STEP 1: Find W27 tabs ----
    week_tabs = {}
    print("=== Finding W27 tabs ===")
    for project, sid in SHEETS.items():
        print(f"\n-- {project} --")
        w27 = find_week_tab_via_summary(sid, W27_MONDAY)
        if not w27:
            w27 = find_week_tab_by_first_date(sid, [W27_MON_TOKEN, "19/05/26", "21/05/26", "22/05/26"])
        print(f"  W27 tab: {w27}")
        week_tabs[project] = w27
        time.sleep(0.3)

    # ---- STEP 2: Scan Thu 21/05/26 ----
    print("\n\n=== Scanning Thu 2026-05-21 (today) ===")
    thu_per_owner = defaultdict(float)
    thu_per_project = defaultdict(lambda: defaultdict(float))
    thu_leave = defaultdict(list)
    thu_errors = {}

    for project, sid in SHEETS.items():
        w27 = week_tabs[project]
        if not w27:
            print(f"  {project}: No W27 tab, skipping")
            thu_errors[project] = "W27 tab not found"
            continue
        print(f"\n  {project} (W27={w27})", flush=True)
        per_owner, leave, err = scan_day_in_tab(sid, w27, THU_PREFIX, THU_TOKEN, project_label=project)
        if err:
            print(f"    ERR: {err}")
            thu_errors[project] = str(err)
            per_owner = {}
            leave = []
        for o, h in per_owner.items():
            thu_per_owner[o] += h
            thu_per_project[o][project] += h
            print(f"    {o}: {h:.2f}h")
        for lv in leave:
            ow = lv.get("G", "")
            thu_leave[ow].append({"project": project, "A": lv["A"], "row": lv["row"]})
            print(f"    LEAVE row{lv['row']}: {lv['A']!r} G={lv['G']!r}")
        time.sleep(0.5)

    # Rebecca Q-T for LeNH (Thu)
    w27_rebecca = week_tabs.get("Rebecca")
    lenh_qt_thu = 0.0
    if w27_rebecca:
        lenh_qt_thu = scan_rebecca_qt_day(w27_rebecca, THU_PREFIX, THU_TOKEN)
        print(f"\n  Rebecca Q-T LeNH Thu: {lenh_qt_thu:.2f}h")
        if lenh_qt_thu:
            thu_per_owner["LeNH"] += lenh_qt_thu
            thu_per_project["LeNH"]["Rebecca(Q-T)"] += lenh_qt_thu

    # ---- STEP 3: Scan Mon-Thu for weekly totals per owner ----
    print("\n\n=== Scanning Mon-Thu W27 for weekly per-owner totals ===")
    weekly_per_owner = defaultdict(float)
    weekly_per_project = defaultdict(lambda: defaultdict(float))

    for project, sid in SHEETS.items():
        w27 = week_tabs[project]
        if not w27:
            continue
        print(f"\n  {project} (W27={w27})", flush=True)
        per_owner, _ = scan_all_days_for_owner(sid, w27, W27_DAYS, project_label=project)
        for o, h in per_owner.items():
            weekly_per_owner[o] += h
            weekly_per_project[o][project] += h
            print(f"    {o}: {h:.2f}h (Mon-Thu)")

    # Rebecca Q-T for LeNH weekly (Mon-Thu)
    lenh_qt_weekly = 0.0
    if w27_rebecca:
        for day_prefix, day_token in W27_DAYS:
            lenh_qt_weekly += scan_rebecca_qt_day(w27_rebecca, day_prefix, day_token)
            time.sleep(0.3)
        print(f"\n  Rebecca Q-T LeNH Mon-Thu: {lenh_qt_weekly:.2f}h")
        if lenh_qt_weekly:
            weekly_per_owner["LeNH"] += lenh_qt_weekly
            weekly_per_project["LeNH"]["Rebecca(Q-T)"] += lenh_qt_weekly

    # ---- Output ----
    out = {
        "week_tabs": week_tabs,
        "thu_2026_05_21": {
            "per_owner": dict(thu_per_owner),
            "per_project": {o: dict(p) for o, p in thu_per_project.items()},
            "leave": dict(thu_leave),
            "errors": thu_errors,
        },
        "w27_mon_thu_weekly": {
            "per_owner": dict(weekly_per_owner),
            "per_project": {o: dict(p) for o, p in weekly_per_project.items()},
        },
    }

    outfile = "/tmp/sheets_thu_may21.json"
    with open(outfile, "w") as fh:
        json.dump(out, fh, indent=2, default=str)
    print(f"\n\nWrote {outfile}")

    # ---- Print summary table ----
    print("\n\n=== SUMMARY TABLE ===")
    print(f"\nThu 2026-05-21 hours by owner:")
    for o in sorted(set(list(thu_per_owner.keys()) + list(weekly_per_owner.keys()))):
        thu_h = thu_per_owner.get(o, 0.0)
        wk_h = weekly_per_owner.get(o, 0.0)
        leave_info = ""
        if o in thu_leave or "" in thu_leave:
            leave_info = " [leave?]"
        print(f"  {o}: Thu={thu_h:.2f}h  WeekMon-Thu={wk_h:.2f}h{leave_info}")


if __name__ == "__main__":
    main()
