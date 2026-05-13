#!/usr/bin/env python3
"""Cross-project task-log scan for Mon 2026-05-12."""
import json
import time
from collections import defaultdict
from datetime import date
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
TARGET_DATE = date(2026, 5, 12)  # Monday
TARGET_DAY_TOKEN = "12/05/26"
DAY_PREFIX = "Mon,"

SHEETS = {
    "Maddy": "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "JohnYi": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    "Generator": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Rory": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
}

REBECCA_SID = SHEETS["Rebecca"]

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
                print(f"  Rate limit hit, sleeping 45s...")
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


def find_current_week_tab_by_summary(sheet_id, target_monday="May 11, 2026"):
    """Find week tab by looking for target Monday in Summary tab."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) < 3:
            continue
        start_str = str(r[1])
        # Check various date formats for May 11, 2026
        if ("May 11, 2026" in start_str or "May 11 2026" in start_str or
                "5/11/2026" in start_str or "11/05/2026" in start_str or
                "11/05/26" in start_str):
            return r[0] if r else None
    return None


def find_week_tab_by_first_date(sheet_id, target_token="11/05/26"):
    """Scan W-tabs for one that starts with this week's Monday."""
    tabs = list_tab_names(sheet_id)
    candidates = [t for t in tabs if t.startswith("W")]
    def num(t):
        try:
            return int(t[1:])
        except Exception:
            return -1
    candidates.sort(key=num, reverse=True)
    for tab in candidates[:6]:
        rows = fetch(sheet_id, f"'{tab}'!A1:A60")
        for r in rows:
            if not r:
                continue
            a = str(r[0])
            if target_token in a and any(a.startswith(d) for d in ("Mon,", "Sun,")):
                return tab
        time.sleep(0.5)
    return None


def find_week_tab_for_sheet(sheet_id, project_label):
    """Try Summary first, then fall back to scanning W-tabs."""
    # Try Summary tab approach
    wk = find_current_week_tab_by_summary(sheet_id)
    if wk:
        return wk
    # Try direct scan for Mon 11/05/26 (week starting Mon May 11)
    wk = find_week_tab_by_first_date(sheet_id, target_token="11/05/26")
    if wk:
        return wk
    # Aysar may use different week numbering
    wk = find_week_tab_by_first_date(sheet_id, target_token="10/05/26")
    if wk:
        return wk
    return None


def parse_hours(cell):
    try:
        return float(str(cell).replace(",", "."))
    except Exception:
        return 0.0


def scan_week_tab_owner_g(sheet_id, week, project_label=""):
    data = fetch(sheet_id, f"'{week}'!A1:T220")
    if not data or (len(data) > 0 and data[0] and data[0][0] == "ERR"):
        return [], f"fetch error: {data}", []

    header_indices = []
    for i, row in enumerate(data):
        if not row:
            continue
        a = str(row[0]) if row else ""
        if any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
            header_indices.append((i, a))

    day_start = None
    next_idx = None
    for j, (i, a) in enumerate(header_indices):
        if TARGET_DAY_TOKEN in a and a.startswith(DAY_PREFIX):
            day_start = i
            next_idx = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break
    if day_start is None:
        return [], f"{DAY_PREFIX} {TARGET_DAY_TOKEN} header not found in {week}", []

    rows_out = []
    raw_rows = []
    paturevision_skipped_first = False
    for i in range(day_start, next_idx):
        row = data[i] if i < len(data) else []
        a = (row[0] if len(row) > 0 else '') or ''
        b = (row[1] if len(row) > 1 else '') or ''
        c = (row[2] if len(row) > 2 else '') or ''
        g = (row[6] if len(row) > 6 else '') or ''
        h = (row[7] if len(row) > 7 else '') or ''
        raw_rows.append({"row": i + 1, "A": a, "B": b, "C": c, "G": g, "H": h})
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
        hours = parse_hours(h)
        rows_out.append((owner, hours, str(c)[:60]))

    leave_markers = []
    for i in range(day_start, next_idx):
        row = data[i] if i < len(data) else []
        if row:
            cell_a = str(row[0] if row else "")
            if "Nghỉ" in cell_a:
                leave_markers.append((i + 1, row[:4]))
    return rows_out, leave_markers, raw_rows


def scan_rebecca_qt_lenh(week):
    """Scan Rebecca sheet cols Q-T for LeNH hours."""
    data = fetch(REBECCA_SID, f"'{week}'!A1:T220")
    if not data or (data[0] and data[0][0] == "ERR"):
        return 0.0, [], []
    header_indices = []
    for i, row in enumerate(data):
        if not row:
            continue
        a = str(row[0])
        if any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
            header_indices.append((i, a))
    day_start = None
    next_idx = None
    for j, (i, a) in enumerate(header_indices):
        if TARGET_DAY_TOKEN in a and a.startswith(DAY_PREFIX):
            day_start = i
            next_idx = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break
    if day_start is None:
        return 0.0, [], []

    lenh_total = 0.0
    rows_out = []
    raw = []
    for i in range(day_start, next_idx):
        row = data[i] if i < len(data) else []
        a = (row[0] if len(row) > 0 else '') or ''
        q = (row[16] if len(row) > 16 else '') or ''
        r_ = (row[17] if len(row) > 17 else '') or ''
        s = (row[18] if len(row) > 18 else '') or ''
        t_ = (row[19] if len(row) > 19 else '') or ''
        raw.append({"row": i + 1, "A": a, "Q": q, "R": r_, "S": s, "T": t_})
        if str(a) != "Task dự án":
            continue
        for col_idx in (16, 17, 18, 19):
            if len(row) > col_idx:
                v = parse_hours(row[col_idx])
                if v:
                    lenh_total += v
                    rows_out.append((row[col_idx], col_idx, i + 1))
    return lenh_total, rows_out, raw


def fetch_summary_weekly_totals(sheet_id, week_label):
    """Fetch col D (grand total) from Summary tab for the given week label."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) >= 4 and str(r[0]).strip() == week_label:
            return parse_hours(r[3])
    return None


def main():
    per_owner = defaultdict(lambda: defaultdict(float))
    leave_summary = defaultdict(list)
    week_tab_used = {}
    raw_dump = {}
    rebecca_qt = None
    week_labels = {}

    for project, sid in SHEETS.items():
        print(f"\n=== {project} ===", flush=True)
        if project == "Aysar":
            wk = find_week_tab_by_first_date(sid, target_token="11/05/26")
            if not wk:
                wk = find_week_tab_by_first_date(sid, target_token="10/05/26")
            if not wk:
                wk = find_week_tab_by_first_date(sid, target_token="12/05/26")
        else:
            wk = find_week_tab_for_sheet(sid, project)
        if not wk:
            print(f"  Current-week tab not found")
            week_tab_used[project] = None
            continue
        week_tab_used[project] = wk
        week_labels[project] = wk
        print(f"  Week tab: {wk}")

        rows, leave, raw_rows = scan_week_tab_owner_g(sid, wk, project_label=project)
        if isinstance(leave, str):
            print(f"  WARN: {leave}")
            leave = []

        raw_dump[project] = {"week": wk, "rows": raw_rows}

        for owner, hours, desc in rows:
            per_owner[owner][project] += hours
            print(f"    [G] {owner:14s} {hours:>5.2f}h | {desc}")

        if leave:
            for li, ldata in leave:
                leave_summary[project].append((li, ldata))
                print(f"  LEAVE row {li}: {ldata}")

        if project == "Rebecca":
            lenh_h, hits, raw_qt = scan_rebecca_qt_lenh(wk)
            rebecca_qt = {"week": wk, "rows": raw_qt, "hits": hits, "total": lenh_h}
            if lenh_h > 0:
                per_owner["LeNH"]["Rebecca(Q-T)"] += lenh_h
                print(f"    [Q-T] LeNH       {lenh_h:>5.2f}h via Rebecca cols Q-T ({len(hits)} cells)")
            else:
                print(f"    [Q-T] LeNH 0h via Rebecca Q-T")

        time.sleep(1.0)

    # Fetch weekly summaries from Summary tabs
    print("\n\n=== Weekly Summary (col D from Summary tabs) ===")
    weekly_totals = {}
    for project, sid in SHEETS.items():
        wk = week_tab_used.get(project)
        if not wk:
            continue
        total = fetch_summary_weekly_totals(sid, wk)
        if total is not None:
            weekly_totals[project] = total
            print(f"  {project} {wk}: {total:.2f}h (week total)")
        else:
            print(f"  {project} {wk}: Summary col D not found for {wk}")
        time.sleep(0.5)

    print("\n\n=== AGGREGATE per dev (Mon 12/05/26) ===")
    print(f"{'Owner':14s} {'Total':>6s}  Breakdown")
    for o in sorted(per_owner.keys()):
        total = sum(per_owner[o].values())
        breakdown = ", ".join(f"{p}={h:.2f}" for p, h in per_owner[o].items())
        print(f"{o:14s} {total:>5.2f}h  {breakdown}")

    print("\nWeek-tab map:", week_tab_used)
    print("\nLeave markers:")
    for p, lv in leave_summary.items():
        for li, ldata in lv:
            print(f"  {p} row{li}: {ldata}")

    out = {
        "target_date": str(TARGET_DATE),
        "week_tab_used": week_tab_used,
        "per_owner": {o: dict(per_owner[o]) for o in per_owner},
        "leave": {p: [(li, str(ldata)) for li, ldata in leave_summary[p]] for p in leave_summary},
        "weekly_totals": weekly_totals,
        "rebecca_qt": rebecca_qt,
    }
    with open("/tmp/sheets_mon_may12.json", "w") as fh:
        json.dump(out, fh, indent=2, default=str)
    print("\nWrote /tmp/sheets_mon_may12.json")
    return out


if __name__ == "__main__":
    main()
