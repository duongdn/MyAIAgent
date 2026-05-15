#!/usr/bin/env python3
"""W26 (Mon 2026-05-11 .. Fri 2026-05-15) cross-project task-log scan.

Reads ALL configured task-log sheets, finds current-week W{n} via Summary,
then per-day Mon..Fri scans Task dự án rows by Owner col G. Aggregates
per-owner per-project per-day. Aysar uses non-calendar W{n}.
"""
import json
import time
from collections import defaultdict
from datetime import date
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json"

DAYS = [
    ("Mon", "11/05/26", date(2026, 5, 11)),
    ("Tue", "12/05/26", date(2026, 5, 12)),
    ("Wed", "13/05/26", date(2026, 5, 13)),
    ("Thu", "14/05/26", date(2026, 5, 14)),
    ("Fri", "15/05/26", date(2026, 5, 15)),
]

SHEETS = {
    "MaddyNEW": "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "JohnYi": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
    "Generator": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Rory": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    "Fountain": "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
    "Marcel": "1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI",
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


def list_tab_names(sheet_id):
    try:
        meta = svc.spreadsheets().get(spreadsheetId=sheet_id).execute()
        return [s['properties']['title'] for s in meta.get('sheets', [])]
    except Exception:
        return []


def find_week_tab_via_summary(sheet_id, target_phrases=("May 11, 2026", "May 11 2026", "5/11/2026")):
    rows = fetch(sheet_id, "'Summary'!A4:D80")
    for r in rows:
        if len(r) < 3:
            continue
        start_str = str(r[1])
        for p in target_phrases:
            if p in start_str:
                return r[0]
    return None


def find_week_tab_by_first_date(sheet_id, target_tokens=("11/05/26", "09/05/26", "10/05/26", "15/05/26")):
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


def scan_week_owner_g(sheet_id, week, project_label):
    data = fetch(sheet_id, f"'{week}'!A1:T260")
    if not data or (len(data) > 0 and data[0] and data[0][0] == "ERR"):
        return {}, {}, [], f"fetch error: {data[:1]}"
    header_indices = find_header_indices(data)

    per_day = defaultdict(lambda: defaultdict(float))   # day -> owner -> hours
    leave_per_day = defaultdict(list)                    # day -> [(row, A_cell)]
    raw_dump = []

    for day_label, token, _d in DAYS:
        start = None
        end = None
        for j, (i, a) in enumerate(header_indices):
            if token in a and a.startswith(f"{day_label},"):
                start = i
                end = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
                break
        if start is None:
            continue

        paturevision_skipped_first = False
        for i in range(start, end):
            row = data[i] if i < len(data) else []
            a = (row[0] if len(row) > 0 else '') or ''
            c = (row[2] if len(row) > 2 else '') or ''
            g = (row[6] if len(row) > 6 else '') or ''
            h = (row[7] if len(row) > 7 else '') or ''
            raw_dump.append({"day": day_label, "row": i + 1, "A": str(a)[:30], "C": str(c)[:50], "G": str(g)[:20], "H": str(h)[:10]})
            if "Nghỉ" in str(a):
                leave_per_day[day_label].append({"row": i + 1, "A": str(a), "G": str(g), "H": str(h)})
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
            per_day[day_label][owner] += parse_hours(h)

    return dict(per_day), dict(leave_per_day), raw_dump, None


def scan_rebecca_qt_week(week):
    data = fetch(REBECCA_SID, f"'{week}'!A1:T260")
    if not data or (data[0] and data[0][0] == "ERR"):
        return {}, []
    header_indices = find_header_indices(data)
    per_day_lenh = defaultdict(float)
    hits = []
    for day_label, token, _d in DAYS:
        start = None
        end = None
        for j, (i, a) in enumerate(header_indices):
            if token in a and a.startswith(f"{day_label},"):
                start = i
                end = header_indices[j + 1][0] if j + 1 < len(header_indices) else len(data)
                break
        if start is None:
            continue
        for i in range(start, end):
            row = data[i] if i < len(data) else []
            a = (row[0] if len(row) > 0 else '') or ''
            if str(a) != "Task dự án":
                continue
            for ci in (16, 17, 18, 19):
                if len(row) > ci:
                    v = parse_hours(row[ci])
                    if v:
                        per_day_lenh[day_label] += v
                        hits.append({"day": day_label, "row": i + 1, "col": ci, "val": v})
    return dict(per_day_lenh), hits


def main():
    out = {
        "week_label": "W26 (Mon 2026-05-11 .. Fri 2026-05-15)",
        "week_tab_used": {},
        "per_project_per_day": {},
        "leave": {},
        "rebecca_qt": None,
        "raw": {},
    }

    for project, sid in SHEETS.items():
        print(f"\n=== {project} ===", flush=True)
        if project == "Aysar":
            wk = find_week_tab_by_first_date(sid)
        else:
            wk = find_week_tab_via_summary(sid)
            if not wk:
                wk = find_week_tab_by_first_date(sid)
        if not wk:
            print(f"  No W{{n}} found for week of 2026-05-11")
            out["week_tab_used"][project] = None
            continue
        out["week_tab_used"][project] = wk
        print(f"  Week tab: {wk}")

        per_day, leave_per_day, raw, err = scan_week_owner_g(sid, wk, project)
        if err:
            print(f"  ERR: {err}")
            continue
        out["per_project_per_day"][project] = per_day
        out["leave"][project] = leave_per_day
        out["raw"][project] = raw

        for day_label, _t, _d in DAYS:
            d = per_day.get(day_label, {})
            if d:
                line = ", ".join(f"{o}={v:.2f}" for o, v in sorted(d.items()))
                print(f"   {day_label}: {line}")
            else:
                print(f"   {day_label}: -")
        if leave_per_day:
            for day, entries in leave_per_day.items():
                for e in entries:
                    print(f"   LEAVE {day} row{e['row']} G={e['G']!r}: {e['A']!r}")

        if project == "Rebecca":
            per_day_qt, hits = scan_rebecca_qt_week(wk)
            out["rebecca_qt"] = {"per_day_lenh": per_day_qt, "hits": hits}
            if per_day_qt:
                line = ", ".join(f"{k}={v:.2f}" for k, v in sorted(per_day_qt.items()))
                print(f"   [Rebecca Q-T LeNH] {line}")
            else:
                print(f"   [Rebecca Q-T LeNH] 0h all days")

        time.sleep(0.7)

    # Aggregate per owner per day across projects
    per_owner_per_day = defaultdict(lambda: defaultdict(float))
    per_owner_per_project = defaultdict(lambda: defaultdict(float))
    for project, day_map in out["per_project_per_day"].items():
        for day_label, owner_map in day_map.items():
            for owner, h in owner_map.items():
                per_owner_per_day[owner][day_label] += h
                per_owner_per_project[owner][project] += h
    # Add Rebecca Q-T LeNH
    if out["rebecca_qt"]:
        for day, h in out["rebecca_qt"]["per_day_lenh"].items():
            per_owner_per_day["LeNH"][day] += h
            per_owner_per_project["LeNH"]["Rebecca(Q-T)"] += h

    print("\n\n=== AGGREGATE per-owner per-day ===")
    print(f"{'Owner':14s} {'Mon':>6s} {'Tue':>6s} {'Wed':>6s} {'Thu':>6s} {'Fri':>6s} {'Total':>7s}  Projects")
    for o in sorted(per_owner_per_day.keys()):
        d = per_owner_per_day[o]
        mon = d.get("Mon", 0)
        tue = d.get("Tue", 0)
        wed = d.get("Wed", 0)
        thu = d.get("Thu", 0)
        fri = d.get("Fri", 0)
        tot = mon + tue + wed + thu + fri
        proj = ", ".join(f"{p}={v:.2f}" for p, v in per_owner_per_project[o].items())
        print(f"{o:14s} {mon:>6.2f} {tue:>6.2f} {wed:>6.2f} {thu:>6.2f} {fri:>6.2f} {tot:>7.2f}  {proj}")

    out["per_owner_per_day"] = {o: dict(per_owner_per_day[o]) for o in per_owner_per_day}
    out["per_owner_per_project"] = {o: dict(per_owner_per_project[o]) for o in per_owner_per_project}

    with open("/tmp/sheets_week_may11_15.json", "w") as fh:
        json.dump(out, fh, indent=2, default=str)
    print("\nWrote /tmp/sheets_week_may11_15.json")


if __name__ == "__main__":
    main()
