#!/usr/bin/env python3
"""Daily sheets scan for 2026-05-22 (Friday).

Checks Thu 2026-05-21 hours (W27 day 4).
W27: May 18–22, 2026.
"""
import json
import re
import sys
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

# Sheet IDs per task spec
SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",   # LongVV
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",   # TuanNT
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",   # TuanNT + LeNH(Q-T)
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",   # VietPH + VuTQ(Bailey)
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",   # KhanhHH
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",   # LeNH
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",   # LeNH
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",   # LeNH
    # PhucVT uses JamesDiamond sheet (separate from LongVV Maddy)
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",   # PhucVT
    # Fountain
    "Fountain":     "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
}

# W27: Mon 18/05/26 → Fri 22/05/26
W27_MON_TOKEN = "18/05/26"
# Thursday date token
THU_DATE_TOKEN = "21/05/26"

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


def find_day_block(rows, date_token):
    for i, row in enumerate(rows):
        if row and date_token in str(row[0]):
            return i
    return -1


def extract_daily_hours(rows, date_token, hours_col=8):
    """Extract hours for a specific date.
    Returns (total_official_hours, leave_note, all_entries).
    Only 'Task dự án' rows count as official.
    """
    start_idx = find_day_block(rows, date_token)
    if start_idx == -1:
        return 0.0, None, []

    total = 0.0
    leave_note = None
    entries = []
    in_block = True

    for i, row in enumerate(rows[start_idx:], start=start_idx):
        if i == start_idx:
            # Date header row — check for leave note in col A
            cell_a = str(row[0]) if row else ""
            for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]:
                if kw.lower() in cell_a.lower():
                    leave_note = kw
                    break
            continue

        if not row or not str(row[0]).strip():
            continue

        row_a = str(row[0]).strip()

        # New date block
        if re.match(r"\d{1,2}/\d{2}/\d{2}", row_a) and date_token not in row_a:
            break

        # Leave note as standalone row
        if any(kw.lower() in row_a.lower() for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            leave_note = row_a
            continue

        # Get hours
        task_type = row_a
        hours_val = ""
        if len(row) > hours_col:
            hours_val = str(row[hours_col]).strip()
        elif len(row) > 7:
            hours_val = str(row[7]).strip()

        hrs = parse_hours(hours_val)
        entries.append({"type": task_type, "hours": hrs, "raw_row": row[:min(len(row), 12)]})

        if hrs > 0:
            tl = task_type.lower()
            if "task dự án" in tl or "task du an" in tl:
                total += hrs
            elif not task_type:
                total += hrs

    return total, leave_note, entries


def get_w27_summary(sheet_id, mon_token):
    """Get W27 weekly total from Summary tab."""
    summary = fetch(sheet_id, "Summary!A:D")
    for row in summary:
        if len(row) >= 2 and mon_token in str(row[1]):
            return parse_hours(row[3]) if len(row) > 3 else None
    return None


def check_fountain_w27():
    """Check Fountain sheet Summary tab for W27 actuals."""
    sheet_id = SHEETS["Fountain"]
    # Try to get the Summary tab
    rows = fetch(sheet_id, "Summary!A:Z")
    if not rows or (rows and "ERROR" in str(rows[0])):
        return {"error": str(rows[0]) if rows else "empty"}

    # Print first 30 rows to understand structure
    result = {"raw_rows": [r for r in rows[:40]]}
    return result


def main():
    all_rows = {}
    for name, sid in SHEETS.items():
        if name == "Fountain":
            continue
        rows = fetch(sid, "A:L")
        if not rows or (rows and "ERROR" in str(rows[0])):
            all_rows[name] = {"error": str(rows[0]) if rows else "empty", "rows": []}
        else:
            all_rows[name] = {"rows": rows}

    results = {}
    for name in SHEETS:
        if name == "Fountain":
            continue
        data = all_rows.get(name, {})
        if "error" in data:
            results[name] = {"sheet": name, "error": data["error"]}
            continue

        rows = data["rows"]
        total_thu, leave_note, entries = extract_daily_hours(rows, THU_DATE_TOKEN)
        w27_total = get_w27_summary(SHEETS[name], W27_MON_TOKEN)

        results[name] = {
            "sheet": name,
            "thu_may21_hours": total_thu,
            "leave_note": leave_note,
            "entries": entries[:8],
            "w27_total_so_far": w27_total,
            "zero_hour_alert": total_thu == 0 and not leave_note
        }

    # Per-developer summary
    devs = {
        "LongVV": {
            "sheets": ["Maddy"],
            "type": "part_time_16h_wk",
            "note": "Part-time 16h/wk; 0h/day is NOT alert"
        },
        "PhucVT": {
            "sheets": ["JamesDiamond"],
            "type": "full_time_8h_day",
            "note": "8h/day; Nghỉ nửa ngày=4h OK"
        },
        "TuanNT": {
            "sheets": ["JohnYi", "Rebecca"],
            "type": "full_time_8h_day",
            "note": "Combined across JohnYi+Rebecca; col P 'Chưa'=normal"
        },
        "VietPH": {
            "sheets": ["Paturevision"],
            "type": "full_time_8h_day",
            "note": "8h/day; Nghỉ cả ngày=0h OK"
        },
        "KhanhHH": {
            "sheets": ["Generator"],
            "type": "full_time_8h_day",
            "note": "8h/day; Nghỉ cả ngày=0h OK"
        },
        "LeNH": {
            "sheets": ["Rory", "Franc", "Aysar"],
            "type": "full_time_8h_day",
            "note": "Sum Rory+Franc+Aysar; 0h one sheet ≠ alert if working another"
        },
    }

    dev_summary = {}
    for dev, info in devs.items():
        total_hrs = 0.0
        leave = None
        sheet_breakdown = {}
        for s in info["sheets"]:
            r = results.get(s, {})
            hrs = r.get("thu_may21_hours", 0.0)
            lv = r.get("leave_note")
            sheet_breakdown[s] = {"hours": hrs, "leave": lv, "w27_total": r.get("w27_total_so_far")}
            total_hrs += hrs
            if lv:
                leave = lv

        alert = False
        if info["type"] == "full_time_8h_day" and total_hrs == 0 and not leave:
            alert = True
        elif info["type"] == "part_time_16h_wk":
            alert = False

        dev_summary[dev] = {
            "thu_may21_total": total_hrs,
            "leave": leave,
            "alert": alert,
            "sheets": sheet_breakdown,
            "note": info["note"]
        }

    # Fountain check
    fountain_data = check_fountain_w27()

    output = {
        "date_checked": "2026-05-21 (Thu, W27 day 4)",
        "dev_summary": dev_summary,
        "sheet_results": results,
        "fountain_raw": fountain_data,
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
