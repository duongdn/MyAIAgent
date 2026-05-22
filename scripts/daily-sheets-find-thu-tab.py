#!/usr/bin/env python3
"""Find the correct week tab containing Thu 21/05/26 in each sheet.
Each sheet uses project-relative week numbering, so W27 != calendar W27.
Search all tabs for the one containing 21/05/26 date token.
"""
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"

SHEETS = {
    "Maddy":        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "JohnYi":       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca":      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    "Generator":    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Rory":         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc":        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar":        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
}

# Dates we're looking for
THU_TOKEN = "21/05/26"
MON_TOKEN = "18/05/26"   # W27 Monday (for weekly total context)

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)


def get_tab_names(sheet_id):
    try:
        meta = svc.spreadsheets().get(spreadsheetId=sheet_id).execute()
        return [s["properties"]["title"] for s in meta.get("sheets", [])]
    except Exception as e:
        return []


def fetch_tab(sheet_id, tab, rng="A:H"):
    try:
        resp = svc.spreadsheets().values().get(
            spreadsheetId=sheet_id, range=f"'{tab}'!{rng}"
        ).execute()
        return resp.get("values", [])
    except Exception:
        return []


def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0


def find_and_extract(sheet_name, sheet_id, date_token):
    """Search all W-tabs for the one containing date_token, then extract hours."""
    tabs = get_tab_names(sheet_id)
    w_tabs = [t for t in tabs if t.startswith("W") and t[1:].isdigit()]

    found_tab = None
    found_rows = None

    for tab in w_tabs:
        rows = fetch_tab(sheet_id, tab, "A:H")
        # Check if any row in col A contains date_token
        for row in rows:
            if row and date_token in str(row[0]):
                found_tab = tab
                found_rows = rows
                break
        if found_tab:
            break

    if not found_tab:
        return {
            "sheet": sheet_name,
            "tab": None,
            "found": False,
            "note": f"No tab contains {date_token}"
        }

    # Extract hours for date_token
    total_official = 0.0
    leave_note = None
    entries = []
    in_block = False
    block_started = False

    for i, row in enumerate(found_rows):
        cell_a = str(row[0]).strip() if row else ""

        if date_token in cell_a:
            in_block = True
            block_started = True
            # Check leave note in same cell
            for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]:
                if kw.lower() in cell_a.lower():
                    leave_note = kw
                    break
            # Row-level hours (col H = index 7)
            if len(row) > 7:
                hrs = parse_hours(row[7])
                # This is the day total header, not individual task — skip
            continue

        if not block_started:
            continue

        # End of block: new date or empty sentinel
        if cell_a and cell_a != "Please insert above this line":
            import re
            if re.match(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s*\d{1,2}/\d{2}/\d{2}", cell_a):
                break  # New day

        # Leave note as standalone row
        if any(kw.lower() in cell_a.lower() for kw in ["Nghỉ cả ngày", "Nghỉ nửa ngày"]):
            leave_note = cell_a
            continue

        # Hours in col H (index 7)
        task_type = cell_a
        hrs = 0.0
        if len(row) > 7:
            hrs = parse_hours(row[7])

        if hrs > 0 or task_type:
            entries.append({"type": task_type, "hours": hrs})
            if hrs > 0 and ("task dự án" in task_type.lower() or "task du an" in task_type.lower()):
                total_official += hrs
            elif hrs > 0 and not task_type:
                total_official += hrs

    # Also get week total from tab header (row 1, col H)
    week_total_header = 0.0
    if found_rows and len(found_rows) > 1:
        hrow = found_rows[1]  # "Total Hours:" row
        if len(hrow) > 7:
            week_total_header = parse_hours(hrow[7])

    return {
        "sheet": sheet_name,
        "tab": found_tab,
        "found": True,
        "thu_may21_official_hours": total_official,
        "leave_note": leave_note,
        "week_total_from_header": week_total_header,
        "entries": [e for e in entries if e["hours"] > 0][:10],
        "alert": total_official == 0 and not leave_note
    }


def main():
    results = {}
    for name, sid in SHEETS.items():
        r = find_and_extract(name, sid, THU_TOKEN)
        results[name] = r

    # Dev summaries
    dev_summary = {
        "LongVV": {
            "sheets": ["Maddy"],
            "type": "part_time",
            "thu_total": results.get("Maddy", {}).get("thu_may21_official_hours", 0),
            "leave": results.get("Maddy", {}).get("leave_note"),
            "alert": False,  # Never alert daily for part-time
            "note": "Part-time 16h/wk; daily 0h is NOT alert",
            "tab": results.get("Maddy", {}).get("tab"),
            "week_total": results.get("Maddy", {}).get("week_total_from_header"),
        },
        "PhucVT": {
            "sheets": ["JamesDiamond"],
            "type": "full_time",
            "thu_total": results.get("JamesDiamond", {}).get("thu_may21_official_hours", 0),
            "leave": results.get("JamesDiamond", {}).get("leave_note"),
            "alert": results.get("JamesDiamond", {}).get("alert", False),
            "tab": results.get("JamesDiamond", {}).get("tab"),
            "week_total": results.get("JamesDiamond", {}).get("week_total_from_header"),
        },
        "TuanNT": {
            "sheets": ["JohnYi", "Rebecca"],
            "type": "full_time",
            "thu_total": (results.get("JohnYi", {}).get("thu_may21_official_hours", 0) +
                          results.get("Rebecca", {}).get("thu_may21_official_hours", 0)),
            "leave": results.get("JohnYi", {}).get("leave_note") or results.get("Rebecca", {}).get("leave_note"),
            "alert": False,  # compute below
            "tabs": {
                "JohnYi": results.get("JohnYi", {}).get("tab"),
                "Rebecca": results.get("Rebecca", {}).get("tab"),
            },
            "week_total": {
                "JohnYi": results.get("JohnYi", {}).get("week_total_from_header"),
                "Rebecca": results.get("Rebecca", {}).get("week_total_from_header"),
            }
        },
        "VietPH": {
            "sheets": ["Paturevision"],
            "type": "full_time",
            "thu_total": results.get("Paturevision", {}).get("thu_may21_official_hours", 0),
            "leave": results.get("Paturevision", {}).get("leave_note"),
            "alert": results.get("Paturevision", {}).get("alert", False),
            "tab": results.get("Paturevision", {}).get("tab"),
            "week_total": results.get("Paturevision", {}).get("week_total_from_header"),
        },
        "KhanhHH": {
            "sheets": ["Generator"],
            "type": "full_time",
            "thu_total": results.get("Generator", {}).get("thu_may21_official_hours", 0),
            "leave": results.get("Generator", {}).get("leave_note"),
            "alert": results.get("Generator", {}).get("alert", False),
            "tab": results.get("Generator", {}).get("tab"),
            "week_total": results.get("Generator", {}).get("week_total_from_header"),
        },
        "LeNH": {
            "sheets": ["Rory", "Franc", "Aysar"],
            "type": "full_time",
            "thu_total": (results.get("Rory", {}).get("thu_may21_official_hours", 0) +
                          results.get("Franc", {}).get("thu_may21_official_hours", 0) +
                          results.get("Aysar", {}).get("thu_may21_official_hours", 0)),
            "leave": (results.get("Rory", {}).get("leave_note") or
                      results.get("Franc", {}).get("leave_note") or
                      results.get("Aysar", {}).get("leave_note")),
            "alert": False,  # compute below
            "tabs": {
                "Rory": results.get("Rory", {}).get("tab"),
                "Franc": results.get("Franc", {}).get("tab"),
                "Aysar": results.get("Aysar", {}).get("tab"),
            },
            "week_total": {
                "Rory": results.get("Rory", {}).get("week_total_from_header"),
                "Franc": results.get("Franc", {}).get("week_total_from_header"),
                "Aysar": results.get("Aysar", {}).get("week_total_from_header"),
            },
            "sheet_breakdown": {
                "Rory": results.get("Rory", {}).get("thu_may21_official_hours", 0),
                "Franc": results.get("Franc", {}).get("thu_may21_official_hours", 0),
                "Aysar": results.get("Aysar", {}).get("thu_may21_official_hours", 0),
            }
        },
    }

    # Fix TuanNT and LeNH alerts
    t = dev_summary["TuanNT"]
    t["alert"] = t["thu_total"] == 0 and not t["leave"]

    l = dev_summary["LeNH"]
    l["alert"] = l["thu_total"] == 0 and not l["leave"]

    output = {
        "date_checked": "2026-05-21 (Thu)",
        "dev_summary": dev_summary,
        "raw_sheet_results": results,
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
