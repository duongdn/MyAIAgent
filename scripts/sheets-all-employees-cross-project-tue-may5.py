#!/usr/bin/env python3
"""Cross-project task-log scan for Tue 2026-05-05.

Reads ALL configured task-log sheets, finds the current week tab via Summary,
then sums per-employee hours on Tue 05/05/26 (col A = 'Task dự án'). Aggregates
across projects per owner so flexible dev-project assignments are captured.
"""
import time
from collections import defaultdict
from datetime import date
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
TARGET_DATE = date(2026, 5, 5)  # Tuesday
TARGET_LABEL = "Tue, 05/05/26"  # day-header text
TARGET_DAY_TOKEN = "05/05/26"

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
    """Fetch a range with retry on 429 rate limit."""
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
    """Use Summary sheet to find the W{n} tab whose date range contains May 4-10."""
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) < 3:
            continue
        # Look for "May 4, 2026" in the start-date column
        start_str = str(r[1])
        if "May 4, 2026" in start_str or "May 4 2026" in start_str or "5/4/2026" in start_str:
            return r[0]  # e.g. "W23"
        # Also accept "April" with end date in May 4-10 (some sheets shift)
    return None


def parse_hours(cell):
    try:
        return float(str(cell).replace(",", "."))
    except Exception:
        return 0.0


def scan_week_tab_owner_g(sheet_id, week):
    """Return list of (owner, hours, desc) for Task dự án rows on TARGET_DATE.

    Strategy:
    1. Read full week tab (A1:T200).
    2. Find day-header rows (col A like 'Mon, 04/05/26').
    3. The Tue date-row's index marks start of Tue block; next Wed date-row marks end.
    4. Within Tue block, accumulate rows where col A == 'Task dự án' and col G has owner name.
    """
    data = fetch(sheet_id, f"'{week}'!A1:T200")
    if not data or (len(data) > 0 and data[0] and data[0][0] == "ERR"):
        return [], f"fetch error: {data}"

    # find day header rows (col A starts with weekday like 'Mon,', 'Tue,', etc.)
    header_indices = []
    for i, row in enumerate(data):
        if not row:
            continue
        a = str(row[0]) if row else ""
        if any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
            header_indices.append((i, a))

    # find Tue index for TARGET
    tue_start = None
    next_idx = None
    for j, (i, a) in enumerate(header_indices):
        if TARGET_DAY_TOKEN in a and a.startswith("Tue,"):
            tue_start = i
            if j + 1 < len(header_indices):
                next_idx = header_indices[j + 1][0]
            else:
                next_idx = len(data)
            break
    if tue_start is None:
        return [], f"Tue {TARGET_DAY_TOKEN} header not found in {week}"

    rows_out = []
    for i in range(tue_start + 1, next_idx):
        row = data[i] if i < len(data) else []
        if not row:
            continue
        if str(row[0]) != "Task dự án":
            continue
        owner = str(row[6]) if len(row) > 6 else ""
        if not owner:
            continue
        hours = parse_hours(row[7] if len(row) > 7 else "")
        desc = str(row[2]) if len(row) > 2 else ""
        rows_out.append((owner.strip(), hours, desc[:60]))
    # Also collect any "Nghỉ" markers in col A (not used here, but useful)
    leave_markers = []
    for i in range(tue_start, next_idx):
        row = data[i] if i < len(data) else []
        if row and ("Nghỉ" in str(row[0]) if row else False):
            leave_markers.append((i + 1, row[:3]))
    return rows_out, leave_markers


def scan_rebecca_qt_lenh(week):
    """Rebecca sheet has LeNH hours in columns Q-T per memory.

    Read the same Tue block range and check col Q (idx 16), R (17), S (18), T (19)
    for any non-empty hour entries; treat as LeNH.
    """
    data = fetch(REBECCA_SID, f"'{week}'!A1:T200")
    if not data or (data[0] and data[0][0] == "ERR"):
        return [], "fetch error"
    header_indices = []
    for i, row in enumerate(data):
        if not row:
            continue
        a = str(row[0])
        if any(a.startswith(d) for d in ("Mon,", "Tue,", "Wed,", "Thu,", "Fri,", "Sat,", "Sun,")):
            header_indices.append((i, a))
    tue_start = None
    next_idx = None
    for j, (i, a) in enumerate(header_indices):
        if TARGET_DAY_TOKEN in a and a.startswith("Tue,"):
            tue_start = i
            next_idx = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break
    if tue_start is None:
        return [], "no Tue header"

    lenh_total = 0.0
    rows_out = []
    for i in range(tue_start + 1, next_idx):
        row = data[i] if i < len(data) else []
        if not row or str(row[0]) != "Task dự án":
            continue
        # Q-T = idx 16,17,18,19 — sum any numeric
        for col_idx in (16, 17, 18, 19):
            if len(row) > col_idx:
                v = parse_hours(row[col_idx])
                if v:
                    lenh_total += v
                    rows_out.append((row[col_idx], col_idx))
    return lenh_total, rows_out


def main():
    per_owner = defaultdict(lambda: defaultdict(float))  # owner -> project -> hours
    leave_summary = defaultdict(list)  # project -> [leave info]
    week_tab_used = {}

    for project, sid in SHEETS.items():
        print(f"\n=== {project} ===", flush=True)
        wk = find_current_week_tab(sid)
        if not wk:
            print(f"  Current-week tab not found via Summary")
            week_tab_used[project] = None
            continue
        week_tab_used[project] = wk
        print(f"  Week tab: {wk}")

        rows, leave = scan_week_tab_owner_g(sid, wk)
        if isinstance(leave, str):
            print(f"  WARN: {leave}")
            leave = []

        for owner, hours, desc in rows:
            per_owner[owner][project] += hours
            print(f"    [G] {owner:12s} {hours:>5.2f}h | {desc}")

        if leave:
            for li, ldata in leave:
                leave_summary[project].append((li, ldata))
                print(f"  LEAVE row {li}: {ldata}")

        # Rebecca extra: scan Q-T for LeNH
        if project == "Rebecca":
            lenh_h, hits = scan_rebecca_qt_lenh(wk)
            if isinstance(lenh_h, float) and lenh_h > 0:
                per_owner["LeNH"][project + "(Q-T)"] += lenh_h
                print(f"    [Q-T] LeNH       {lenh_h:>5.2f}h via Rebecca cols Q-T ({len(hits)} cells)")

        time.sleep(1.5)

    # Aggregate
    print("\n\n=== AGGREGATE per dev (Tue 05/05/26) ===")
    print(f"{'Owner':14s} {'Total':>6s}  Breakdown")
    devs_to_check = sorted(per_owner.keys())
    for o in devs_to_check:
        total = sum(per_owner[o].values())
        breakdown = ", ".join(f"{p}={h:.2f}" for p, h in per_owner[o].items())
        print(f"{o:14s} {total:>5.2f}h  {breakdown}")

    print("\nWeek-tab map:", week_tab_used)
    return per_owner


if __name__ == "__main__":
    main()
