#!/usr/bin/env python3
"""Cross-project task-log scan for Wed 2026-05-06.

Reads ALL configured task-log sheets, finds the current week tab via Summary,
then sums per-employee hours on Wed 06/05/26 (col A = 'Task dự án'). Aggregates
across projects per owner so flexible dev-project assignments are captured.
"""
import json
import time
from collections import defaultdict
from datetime import date
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
TARGET_DATE = date(2026, 5, 6)  # Wednesday
TARGET_DAY_TOKEN = "06/05/26"

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
    "Fountain": "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
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
                time.sleep(45)
                continue
            return [["ERR", str(e)[:120]]]
    return []


def find_current_week_tab(sheet_id):
    """Use Summary sheet to find the W{n} tab whose start date is May 4, 2026."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) < 3:
            continue
        start_str = str(r[1])
        if "May 4, 2026" in start_str or "May 4 2026" in start_str or "5/4/2026" in start_str:
            return r[0]
    return None


def parse_hours(cell):
    try:
        return float(str(cell).replace(",", "."))
    except Exception:
        return 0.0


def scan_week_tab_owner_g(sheet_id, week):
    """Return (rows_out, leave_markers, raw_rows) for Wed block."""
    data = fetch(sheet_id, f"'{week}'!A1:T200")
    if not data or (len(data) > 0 and data[0] and data[0][0] == "ERR"):
        return [], f"fetch error: {data}", []

    header_indices = []
    for i, row in enumerate(data):
        if not row:
            continue
        a = str(row[0]) if row else ""
        if any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
            header_indices.append((i, a))

    wed_start = None
    next_idx = None
    for j, (i, a) in enumerate(header_indices):
        if TARGET_DAY_TOKEN in a and a.startswith("Wed,"):
            wed_start = i
            next_idx = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break
    if wed_start is None:
        return [], f"Wed {TARGET_DAY_TOKEN} header not found in {week}", []

    rows_out = []
    raw_rows = []
    for i in range(wed_start, next_idx):
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
        if not owner:
            continue
        hours = parse_hours(h)
        rows_out.append((owner, hours, str(c)[:60]))

    leave_markers = []
    for i in range(wed_start, next_idx):
        row = data[i] if i < len(data) else []
        if row and "Nghỉ" in str(row[0] if row else ""):
            leave_markers.append((i + 1, row[:3]))
    return rows_out, leave_markers, raw_rows


def scan_rebecca_qt_lenh(week):
    """Rebecca sheet: LeNH lives in cols Q-T (idx 16-19)."""
    data = fetch(REBECCA_SID, f"'{week}'!A1:T200")
    if not data or (data[0] and data[0][0] == "ERR"):
        return 0.0, [], []
    header_indices = []
    for i, row in enumerate(data):
        if not row:
            continue
        a = str(row[0])
        if any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
            header_indices.append((i, a))
    wed_start = None
    next_idx = None
    for j, (i, a) in enumerate(header_indices):
        if TARGET_DAY_TOKEN in a and a.startswith("Wed,"):
            wed_start = i
            next_idx = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break
    if wed_start is None:
        return 0.0, [], []

    lenh_total = 0.0
    rows_out = []
    raw = []
    for i in range(wed_start, next_idx):
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


def main():
    per_owner = defaultdict(lambda: defaultdict(float))
    leave_summary = defaultdict(list)
    week_tab_used = {}
    raw_dump = {}
    rebecca_qt = None

    for project, sid in SHEETS.items():
        print(f"\n=== {project} ===", flush=True)
        wk = find_current_week_tab(sid)
        if not wk:
            print(f"  Current-week tab not found via Summary")
            week_tab_used[project] = None
            continue
        week_tab_used[project] = wk
        print(f"  Week tab: {wk}")

        rows, leave, raw_rows = scan_week_tab_owner_g(sid, wk)
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
                per_owner["LeNH"][project + "(Q-T)"] += lenh_h
                print(f"    [Q-T] LeNH       {lenh_h:>5.2f}h via Rebecca cols Q-T ({len(hits)} cells)")
            else:
                print(f"    [Q-T] LeNH 0h via Rebecca Q-T")

        time.sleep(1.2)

    print("\n\n=== AGGREGATE per dev (Wed 06/05/26) ===")
    print(f"{'Owner':14s} {'Total':>6s}  Breakdown")
    for o in sorted(per_owner.keys()):
        total = sum(per_owner[o].values())
        breakdown = ", ".join(f"{p}={h:.2f}" for p, h in per_owner[o].items())
        print(f"{o:14s} {total:>5.2f}h  {breakdown}")

    print("\nWeek-tab map:", week_tab_used)

    out = {
        "target_date": str(TARGET_DATE),
        "week_tab_used": week_tab_used,
        "per_owner": {o: dict(per_owner[o]) for o in per_owner},
        "leave": {p: leave_summary[p] for p in leave_summary},
        "raw": raw_dump,
        "rebecca_qt": rebecca_qt,
    }
    with open("/tmp/sheets_wed_may6.json", "w") as fh:
        json.dump(out, fh, indent=2, default=str)
    print("\nWrote /tmp/sheets_wed_may6.json")
    return out


if __name__ == "__main__":
    main()
