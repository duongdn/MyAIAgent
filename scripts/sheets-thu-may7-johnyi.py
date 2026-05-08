#!/usr/bin/env python3
"""John Yi-only task-log scan for Thu 2026-05-07 (TuanNT focus).

Reads ONLY the John Yi sheet, finds the current week tab via Summary,
then sums hours owned by TuanNT on Thu 07/05/26 (col A = 'Task dự án',
col G = owner, col H = hours).
"""
import json
import time
from collections import defaultdict
from datetime import date
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
TARGET_DATE = date(2026, 5, 7)  # Thursday
TARGET_DAY_TOKEN = "07/05/26"
JOHN_YI_SID = "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ"

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


def scan_thu_block(sheet_id, week):
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

    thu_start = None
    next_idx = None
    for j, (i, a) in enumerate(header_indices):
        if TARGET_DAY_TOKEN in a and a.startswith("Thu,"):
            thu_start = i
            next_idx = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
            break
    if thu_start is None:
        return [], f"Thu {TARGET_DAY_TOKEN} header not found in {week}", []

    rows_out = []
    raw_rows = []
    for i in range(thu_start, next_idx):
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
        rows_out.append((owner, hours, str(c)[:80]))

    return rows_out, None, raw_rows


def main():
    print("=== John Yi project — Thu 07/05/26 ===", flush=True)
    wk = find_current_week_tab(JOHN_YI_SID)
    if not wk:
        print("Week tab not found via Summary")
        return
    print(f"Week tab: {wk}")

    rows, err, raw = scan_thu_block(JOHN_YI_SID, wk)
    if err:
        print(f"WARN: {err}")

    per_owner = defaultdict(float)
    tuannt_rows = []
    for owner, hours, desc in rows:
        per_owner[owner] += hours
        print(f"  [G] {owner:14s} {hours:>5.2f}h | {desc}")
        if owner.lower().startswith("tuannt") or owner == "TuanNT":
            tuannt_rows.append({"owner": owner, "hours": hours, "desc": desc})

    print(f"\n=== Per owner totals (John Yi, Thu 07/05/26) ===")
    for o in sorted(per_owner.keys()):
        print(f"  {o:14s} {per_owner[o]:>5.2f}h")

    tuannt_total = per_owner.get("TuanNT", 0.0)
    print(f"\n>>> TuanNT John Yi hours Thu 07/05/26: {tuannt_total:.2f}h")
    print(f">>> TuanNT John Yi rows: {len(tuannt_rows)}")
    for r in tuannt_rows:
        print(f"     - {r['hours']:.2f}h | {r['desc']}")

    out = {
        "target_date": str(TARGET_DATE),
        "week_tab": wk,
        "per_owner": dict(per_owner),
        "tuannt_total": tuannt_total,
        "tuannt_rows": tuannt_rows,
        "raw": raw,
    }
    with open("/tmp/sheets_thu_may7_johnyi.json", "w") as fh:
        json.dump(out, fh, indent=2, default=str)
    print("\nWrote /tmp/sheets_thu_may7_johnyi.json")
    return out


if __name__ == "__main__":
    main()
