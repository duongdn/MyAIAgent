#!/usr/bin/env python3
"""Direct sheet verification for 2026-04-29 (Wed), 2026-04-30 (Thu), 2026-05-01 (Fri).
Dumps raw rows + Owner G + Hours H so we can verify the sheets-subagent.

Rules:
- Only "Task dự án" (col A) for official hours; "Part-time" excluded
- Filter Owner col G; "Nghỉ cả ngày" full day, "Nghỉ nửa ngày" half day
- 4/30 + 5/1 are VN public holidays (Reunification Day, Labor Day) — 0h OK
"""
import json, time
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA_KEY = '/Users/duongdn/projects/MyAIAgent/config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = build('sheets', 'v4', credentials=creds).spreadsheets()

# Target Monday is 2026-04-27 (W24 of fiscal year, but each sheet has its own W{n})
TARGET_MONDAY_PATTERNS = ['April 27, 2026', 'Apr 27, 2026', 'April 27', 'Apr 27']
TARGET_DATES = ['29/04', '29/4', '30/04', '30/4', '01/05', '1/05', '01/5', '1/5']
DATE_KEYS = {'29/04': 'Wed 29/04', '30/04': 'Thu 30/04', '01/05': 'Fri 01/05'}

SHEETS = [
    ('LongVV-Maddy',   '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I', ['LongVV']),
    ('LongVV-JamesD',  '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', ['LongVV']),  # James Diamond is on this sheet ID per CLAUDE memory
    ('PhucVT-JamesD',  '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', ['PhucVT']),
    ('TuanNT-JohnYi',  '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', ['TuanNT']),
    ('TuanNT-Rebecca', '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', ['TuanNT']),
    ('TuanNT-Bailey',  '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', ['TuanNT']),
    ('VietPH-Bailey',  '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', ['VietPH']),
    ('KhanhHH-Gen',    '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', ['KhanhHH']),
    ('LeNH-Rory',      '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', ['LeNH']),
    ('LeNH-Franc',     '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', ['LeNH']),
    ('LeNH-Aysar',     '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', ['LeNH']),
    ('LeNH-Rebecca',   '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', ['LeNH']),
]


def to_float(s):
    if s is None or s == '':
        return 0.0
    try:
        return float(str(s).replace(',', '.'))
    except Exception:
        return 0.0


def find_week_label(sid):
    try:
        r = svc.values().get(spreadsheetId=sid, range='Summary!A4:F100').execute()
    except Exception as e:
        return None, f'Summary fetch failed: {e}'
    rows = r.get('values', [])
    for row in rows:
        if len(row) < 2:
            continue
        b = (row[1] or '').strip()
        if any(p in b for p in TARGET_MONDAY_PATTERNS):
            return (row[0] or '').strip(), None
    return None, 'No week with Apr 27 found'


def normalize_date(s):
    """Map any of '29/04','29/4','29/04/26' -> '29/04'. Same for 30/04, 01/05."""
    s = (s or '').strip()
    for d in ['29/04', '29/4', '30/04', '30/4', '01/05', '1/05', '01/5', '1/5']:
        if d in s:
            # Normalize to canonical
            if d in ('29/04', '29/4'):
                return '29/04'
            if d in ('30/04', '30/4'):
                return '30/04'
            return '01/05'
    return None


def dump_week(label, sid, employees, week):
    rng = f"'{week}'!A1:O300"
    try:
        r = svc.values().get(spreadsheetId=sid, range=rng).execute()
    except Exception as e:
        print(f'  ERROR fetching {rng}: {e}')
        return {}
    rows = r.get('values', [])
    cur_day = None
    by_emp = {emp: {'29/04': {'official': 0.0, 'part_time': 0.0, 'leave': None, 'rows': []},
                    '30/04': {'official': 0.0, 'part_time': 0.0, 'leave': None, 'rows': []},
                    '01/05': {'official': 0.0, 'part_time': 0.0, 'leave': None, 'rows': []}}
              for emp in employees}
    # Track raw row dump per day for verification
    day_dump = {'29/04': [], '30/04': [], '01/05': []}
    for idx, row in enumerate(rows):
        a = (row[0] if len(row) > 0 else '') or ''
        b = (row[1] if len(row) > 1 else '') or ''
        g = (row[6] if len(row) > 6 else '') or ''
        h = (row[7] if len(row) > 7 else '') or ''
        # Day header detection
        day_match = normalize_date(a) or normalize_date(b)
        a_lower = a.strip().lower()
        is_day_header = day_match and (
            a_lower.startswith('mon') or a_lower.startswith('tue') or
            a_lower.startswith('wed') or a_lower.startswith('thu') or
            a_lower.startswith('fri') or a_lower.startswith('sat') or
            a_lower.startswith('sun') or 'thứ' in a_lower or a.strip() == ''
        )
        if is_day_header:
            cur_day = day_match
            continue
        if cur_day is None or cur_day not in by_emp[employees[0]]:
            continue
        owner = g.strip()
        # Capture raw rows for the 3 target days for ALL relevant employees
        if cur_day in day_dump:
            day_dump[cur_day].append({'row_idx': idx + 1, 'A': a, 'B': b[:60], 'G': owner, 'H': h})
        if owner not in employees:
            continue
        kind = a.strip()
        if 'Nghỉ cả ngày' in kind or 'Nghỉ cả ngày' in (b or ''):
            by_emp[owner][cur_day]['leave'] = 'full_day'
            by_emp[owner][cur_day]['rows'].append({'A': a, 'B': b[:60], 'H': h, 'note': 'leave'})
            continue
        if 'Nghỉ nửa ngày' in kind or 'Nghỉ nửa ngày' in (b or ''):
            by_emp[owner][cur_day]['leave'] = 'half_day'
            by_emp[owner][cur_day]['rows'].append({'A': a, 'B': b[:60], 'H': h, 'note': 'half'})
            # Half day still has hours; do not skip hours
        hv = to_float(h)
        if kind == 'Task dự án':
            by_emp[owner][cur_day]['official'] += hv
            by_emp[owner][cur_day]['rows'].append({'A': a, 'B': b[:60], 'H': hv, 'kind': 'official'})
        elif kind == 'Part-time':
            by_emp[owner][cur_day]['part_time'] += hv
            by_emp[owner][cur_day]['rows'].append({'A': a, 'B': b[:60], 'H': hv, 'kind': 'pt'})
    return by_emp, day_dump


print(f'=== Direct verification: 2026-04-29 (Wed), 04-30 (Thu Holiday), 05-01 (Fri Holiday) ===\n')

aggregate = {}  # emp -> day -> {official, part_time, leave_per_sheet}

for label, sid, employees in SHEETS:
    week, err = find_week_label(sid)
    print(f'### {label} ({sid[:12]}…) ###')
    if err:
        print(f'  Week lookup error: {err}')
        # Try common W tabs as fallback
        for guess in ['W24', 'W23', 'W25', 'W4', 'W22', 'W38', 'W9', 'W21']:
            try:
                t = svc.values().get(spreadsheetId=sid, range=f"'{guess}'!A1:B5").execute()
                if t.get('values'):
                    print(f'    Found tab {guess}, will probe.')
                    week = guess
                    break
            except Exception:
                continue
        if not week:
            print()
            continue
    print(f'  Using week tab: {week}')
    by_emp, day_dump = dump_week(label, sid, employees, week)
    for emp in employees:
        for d in ['29/04', '30/04', '01/05']:
            info = by_emp[emp][d]
            agg = aggregate.setdefault(emp, {}).setdefault(d, {'official': 0.0, 'part_time': 0.0, 'leaves': [], 'sources': []})
            agg['official'] += info['official']
            agg['part_time'] += info['part_time']
            if info['leave']:
                agg['leaves'].append(f"{label}:{info['leave']}")
            if info['official'] or info['part_time'] or info['leave']:
                agg['sources'].append(f"{label}={info['official']:.2f}h" + (f"({info['leave']})" if info['leave'] else ''))
    # Print raw dump for verification
    for d in ['29/04', '30/04', '01/05']:
        rows_for_day = day_dump.get(d, [])
        if not rows_for_day:
            print(f'  [{d}] (no rows under day header)')
            continue
        print(f'  [{d}] {len(rows_for_day)} rows under day header (first 25):')
        for rr in rows_for_day[:25]:
            print(f"    r{rr['row_idx']:>4} | A={rr['A'][:18]:<18} | G={rr['G']:<10} | H={rr['H']:<6} | B={rr['B']}")
    print()
    time.sleep(0.4)

print('\n=== AGGREGATED PER DEV ===')
for emp in sorted(aggregate.keys()):
    days = aggregate[emp]
    print(f'\n{emp}:')
    for d in ['29/04', '30/04', '01/05']:
        info = days.get(d, {})
        off = info.get('official', 0)
        pt = info.get('part_time', 0)
        leaves = info.get('leaves', [])
        srcs = info.get('sources', [])
        line = f'  {d}: official={off:.2f}h'
        if pt > 0:
            line += f' pt={pt:.2f}h'
        if leaves:
            line += f' leave={leaves}'
        if srcs:
            line += f' | sources: {srcs}'
        print(line)

with open('/tmp/sheets-2026-04-29.json', 'w') as fh:
    json.dump(aggregate, fh, indent=2, default=str)
print('\nWrote /tmp/sheets-2026-04-29.json')
