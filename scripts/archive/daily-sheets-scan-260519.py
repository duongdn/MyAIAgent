#!/usr/bin/env python3
"""Daily sheets scan for 2026-05-19 (Tuesday).

Checks Mon 2026-05-18 hours (W27 day 1, yesterday).
W27: May 18–22, 2026.
Developers: LongVV, PhucVT, TuanNT, VietPH, KhanhHH, LeNH, VuTQ(Bailey).

Rules:
- 0h on workday with no leave note → alert + reminder needed
- "Nghỉ cả ngày" = full leave, 0h OK
- "Nghỉ nửa ngày" = half day, 4h OK
- Only "Task dự án" rows (exclude "Part-time")
- LongVV: part-time 16h/wk — 0h/day is NOT alert, check weekly total only
- VuTQ: moved to Bailey (Paturevision), NOT Fountain
- Summary col D = grand total, never double-sum per-employee cols
"""
import json
import re
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",   # LongVV
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",   # PhucVT + LongVV(JD)
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",   # TuanNT
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",   # TuanNT + LeNH(Q-T)
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",   # VietPH + VuTQ(Bailey)
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",   # KhanhHH
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",   # LeNH
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",   # LeNH
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",   # LeNH
}

# W27: Mon 18/05/26 → Fri 22/05/26
W27_MON_TOKEN = "18/05/26"
W27_MON_DATE  = "May 18, 2026"
W27_MONDAY    = "18/05/26"

# Dates to check (Mon = yesterday in W27)
CHECK_DATE_TOKEN = W27_MON_TOKEN  # "18/05/26"

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
    """Parse hour value from cell (handles float strings, fractions, empty)."""
    if not val or str(val).strip() in ("", "-", "—"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def find_day_block(rows, date_token):
    """Find the row index where a day block starts (contains date_token in col A)."""
    for i, row in enumerate(rows):
        if row and date_token in str(row[0]):
            return i
    return -1


def extract_daily_hours(rows, date_token, owner_col=6, hours_col=8, type_col=0):
    """Extract hours logged for a specific date, filtering by owner if needed.
    Skips first empty row of a day block (Paturevision write convention).
    Only counts 'Task dự án' rows.
    Returns (total_hours, leave_note, entries[]).
    """
    start_idx = find_day_block(rows, date_token)
    if start_idx == -1:
        return 0.0, None, []

    # Skip the header/first row of the block
    total = 0.0
    leave_note = None
    entries = []
    in_block = False
    skip_first = True

    for i, row in enumerate(rows[start_idx:], start=start_idx):
        if i == start_idx:
            # This is the date row — check for leave note
            cell_a = str(row[0]) if row else ""
            for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày", "nghỉ"]:
                if kw.lower() in cell_a.lower():
                    leave_note = kw
                    break
            in_block = True
            skip_first = False
            continue

        if not row or not str(row[0]).strip():
            # Next date block separator or end
            if in_block and any(str(r[0]).strip() for r in rows[i:i+1] if r):
                continue
            # Check if next non-empty row is a new date
            break

        row_a = str(row[0]).strip()
        # New date block starts with a date-like token
        if re.match(r"\d{1,2}/\d{2}/\d{2}", row_a) and row_a != date_token:
            break
        if in_block and row_a in ("Nghỉ cả ngày", "Nghỉ nửa ngày"):
            leave_note = row_a
            continue

        # Get task type (col A) and hours (col H = index 8 or as specified)
        task_type = str(row[0]).strip() if row else ""
        # Hours may be in different columns; try col H (index 8)
        hours_val = ""
        if len(row) > hours_col:
            hours_val = str(row[hours_col]).strip()
        elif len(row) > 7:
            hours_val = str(row[7]).strip()

        hrs = parse_hours(hours_val)
        if hrs > 0:
            entries.append({"type": task_type, "hours": hrs})
            # Only count "Task dự án" rows as official
            if "task dự án" in task_type.lower() or "task du an" in task_type.lower():
                total += hrs
            elif not task_type or task_type == "—":
                total += hrs  # unlabeled rows count

    return total, leave_note, entries


def check_sheet_day(sheet_name, sheet_id, date_token, w27_monday_token):
    """Check a sheet for the given date's hours and W27 weekly total."""
    # Fetch a wide range to capture all data (A:K typically)
    rows = fetch(sheet_id, "A:L")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return {"sheet": sheet_name, "error": str(rows[0]) if rows else "empty"}

    # Find W27 block
    total_mon, leave_note, entries = extract_daily_hours(rows, date_token)

    # Also get weekly total from Summary tab col D
    summary = fetch(sheet_id, "Summary!A:D")
    w27_total = None
    for row in summary:
        if len(row) >= 2 and w27_monday_token in str(row[1]):
            w27_total = parse_hours(row[3]) if len(row) > 3 else None
            break

    return {
        "sheet": sheet_name,
        "sheet_id": sheet_id,
        "mon_may18_hours": total_mon,
        "leave_note": leave_note,
        "entries": entries[:5],  # first 5 entries
        "w27_total_so_far": w27_total,
        "zero_hour_alert": total_mon == 0 and not leave_note
    }


def main():
    results = {}
    for name, sid in SHEETS.items():
        r = check_sheet_day(name, sid, CHECK_DATE_TOKEN, W27_MON_TOKEN)
        results[name] = r

    # Per-developer summary
    devs = {
        "LongVV": {
            "sheets": ["Maddy", "JamesDiamond"],
            "type": "part_time_16h_wk",
            "note": "0h/day NOT alert — check weekly total only (16h/wk target)"
        },
        "PhucVT": {
            "sheets": ["JamesDiamond"],
            "type": "full_time_8h_day",
            "note": "8h/day target"
        },
        "TuanNT": {
            "sheets": ["JohnYi", "Rebecca"],
            "type": "full_time_8h_day",
            "note": "splits across 3 projects; check combined"
        },
        "VietPH": {
            "sheets": ["Paturevision"],
            "type": "full_time_8h_day",
            "note": "8h/day target"
        },
        "VuTQ": {
            "sheets": ["Paturevision"],
            "type": "full_time_8h_day",
            "note": "moved from Fountain to Bailey 2026-05-13; check Paturevision"
        },
        "KhanhHH": {
            "sheets": ["Generator"],
            "type": "full_time_8h_day",
            "note": "Elliott project; 8h/day target"
        },
        "LeNH": {
            "sheets": ["Rory", "Franc", "Aysar"],
            "type": "full_time_8h_day",
            "note": "4 sheets combined (Rory+Franc+Aysar+Rebecca cols Q-T); 8h/day"
        },
    }

    dev_summary = {}
    for dev, info in devs.items():
        total_hrs = 0.0
        leave = None
        sheet_breakdown = {}
        for s in info["sheets"]:
            r = results.get(s, {})
            hrs = r.get("mon_may18_hours", 0.0)
            lv = r.get("leave_note")
            sheet_breakdown[s] = {"hours": hrs, "leave": lv}
            total_hrs += hrs
            if lv:
                leave = lv

        alert = False
        if info["type"] == "full_time_8h_day" and total_hrs == 0 and not leave:
            alert = True
        elif info["type"] == "part_time_16h_wk":
            alert = False  # never alert on 0h/day for part-time

        dev_summary[dev] = {
            "mon_may18_total": total_hrs,
            "leave": leave,
            "alert": alert,
            "sheets": sheet_breakdown,
            "note": info["note"]
        }

    output = {
        "date_checked": "2026-05-18 (Mon, W27 day 1)",
        "sheet_results": results,
        "dev_summary": dev_summary
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
