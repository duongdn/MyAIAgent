"""Weekly hours fetch for week of 2026-04-20 to 2026-04-24 (W23 reference).

Reads Summary tabs to find the W{n} row matching the target Monday and prints
per-employee weekly totals plus daily breakdowns from W{n} tabs.

Memory rules:
- Filter Owner column G; sum only "Task dự án" rows (col A) for official hours
- Track Part-time separately (col A == "Part-time")
- "Nghỉ cả ngày" = full day off; "Nghỉ nửa ngày" = half day
- LongVV: Maddy (16h target) + James Diamond (since W23/2026-04-20)
- LeNH: 4 sheets (Rory, Franc, Aysar, Rebecca)
- TuanNT: 3 sheets (Paturevision, William Bills, John Yi)
"""

import json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
TARGET_MONDAY_PATTERNS = ['April 20, 2026', 'Apr 20, 2026', 'April 20', 'Apr 20']
TARGET_DATES = ['20/04', '21/04', '22/04', '23/04', '24/04']

creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

SHEETS = {
    'maddy_new':       ('1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I', ['LongVV']),
    'james_diamond':   ('1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', ['PhucVT', 'AnhNH2', 'LongVV']),
    'paturevision':    ('1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', ['VietPH', 'TuanNT', 'DuongDN']),
    'john_yi':         ('1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', ['TuanNT']),
    'william_bills':   ('1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', ['TuanNT', 'LeNH']),
    'generator':       ('1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', ['KhanhHH']),
    'rory_bxr':        ('1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', ['LeNH']),
    'franc_rdc':       ('1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', ['LeNH']),
    'aysar_baamboozle':('1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', ['LeNH']),
    'fountain':        ('1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', ['VuTQ', 'ThinhT', 'ViTHT', 'PhatDLT', 'HungPN', 'HaVS']),
    'marcel':          ('1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI', ['DuongDN']),
}


def to_float(s):
    if s is None or s == '':
        return 0.0
    try:
        return float(str(s).replace(',', '.'))
    except Exception:
        return 0.0


def find_week_tab(sid):
    """Return (week_label, start_date, end_date, summary_rows). week_label like W23."""
    try:
        r = svc.values().get(spreadsheetId=sid, range='Summary!A4:BZ100').execute()
    except Exception as e:
        return None, None, None, [], f'Summary fetch failed: {e}'
    rows = r.get('values', [])
    if not rows:
        return None, None, None, [], 'Summary empty'
    week = None
    start = None
    end = None
    for i, row in enumerate(rows):
        if len(row) < 2:
            continue
        b = (row[1] or '').strip()
        if any(p in b for p in TARGET_MONDAY_PATTERNS):
            week = (row[0] or '').strip()
            start = b
            end = (row[2] if len(row) > 2 else '') or ''
            break
    return week, start, end, rows, None


def get_week_total_from_summary(rows, employee, week_label):
    """Locate employee Actual column in row 5, then read column for given week row."""
    if len(rows) < 2:
        return None
    header_row = rows[0]   # Row 4 of sheet (zero-based after offset)
    name_row = rows[1]     # Row 5
    cands = []
    for i, cell in enumerate(name_row):
        if i < 8:
            continue
        if (cell or '').strip() == employee:
            h = (header_row[i] if i < len(header_row) else '') or ''
            if h.strip() == 'Actual':
                cands.append(i)
    if not cands:
        for i, cell in enumerate(name_row):
            if (cell or '').strip() == employee:
                cands.append(i)
                break
    if not cands:
        return None
    col = cands[0]
    for row in rows[2:]:
        if len(row) > 0 and (row[0] or '').strip() == week_label:
            v = row[col] if col < len(row) else '0'
            return to_float(v)
    return None


def parse_w_tab(sid, week_label, employees):
    """Return per-employee per-day breakdown plus leave info, official vs part-time."""
    try:
        r = svc.values().get(spreadsheetId=sid, range=f'{week_label}!A1:O300').execute()
    except Exception as e:
        return {emp: {'error': f'{week_label} fetch failed: {e}'} for emp in employees}
    rows = r.get('values', [])
    out = {emp: {'days': {d: {'official': 0.0, 'part_time': 0.0, 'leave': None, 'rows': []} for d in TARGET_DATES}} for emp in employees}
    cur_day = None
    for row in rows:
        a = (row[0] if len(row) > 0 else '') or ''
        b = (row[1] if len(row) > 1 else '') or ''
        g = (row[6] if len(row) > 6 else '') or ''
        h = (row[7] if len(row) > 7 else '') or ''
        # Day header rows often have a date in col B like "20/04/26" or "Mon, 20/04/26"
        day_match = None
        for d in TARGET_DATES:
            if d in a or d in b:
                day_match = d
                break
        if day_match and (a.lower().startswith('mon') or a.lower().startswith('tue') or
                          a.lower().startswith('wed') or a.lower().startswith('thu') or
                          a.lower().startswith('fri') or a.lower().startswith('sat') or
                          a.lower().startswith('sun') or a == '' or 'thứ' in a.lower()):
            cur_day = day_match
            continue
        if cur_day is None:
            continue
        owner = g.strip()
        if owner not in employees:
            continue
        kind = a.strip()
        # Detect leave rows
        if 'Nghỉ cả ngày' in kind or 'Nghỉ nửa ngày' in kind or 'Nghỉ cả ngày' in (b or '') or 'Nghỉ nửa ngày' in (b or ''):
            label = 'full_day' if 'Nghỉ cả ngày' in kind or 'Nghỉ cả ngày' in b else 'half_day'
            out[owner]['days'][cur_day]['leave'] = label
            continue
        hours_val = to_float(h)
        if kind == 'Task dự án':
            out[owner]['days'][cur_day]['official'] += hours_val
        elif kind == 'Part-time':
            out[owner]['days'][cur_day]['part_time'] += hours_val
        out[owner]['days'][cur_day]['rows'].append({
            'kind': kind, 'task': b, 'hours': hours_val
        })
    return out


def fmt_day(d):
    o = d.get('official', 0)
    p = d.get('part_time', 0)
    leave = d.get('leave')
    parts = [f"{o:.2f}h"]
    if p > 0:
        parts.append(f"+{p:.2f}h PT")
    if leave:
        parts.append(f"[{leave}]")
    return ' '.join(parts)


print(f'=== Weekly Hours Fetch — W of 2026-04-20 ===\n')

results = {}
for label, (sid, employees) in SHEETS.items():
    week, start, end, rows, err = find_week_tab(sid)
    if err:
        print(f'[{label}] ERROR: {err}\n')
        continue
    if not week:
        print(f'[{label}] Week starting Apr 20 NOT found in Summary\n')
        continue
    print(f'--- {label} ({sid[:10]}…) — {week} | {start} → {end} ---')
    summary_totals = {}
    for emp in employees:
        t = get_week_total_from_summary(rows, emp, week)
        summary_totals[emp] = t
        print(f'  Summary {emp:8s}: {t}')
    daily = parse_w_tab(sid, week, employees)
    for emp in employees:
        days = daily.get(emp, {}).get('days', {})
        official_total = sum(d.get('official', 0) for d in days.values())
        pt_total = sum(d.get('part_time', 0) for d in days.values())
        line = f'  {week} {emp:8s}: official={official_total:.2f}h pt={pt_total:.2f}h'
        leave_days = [d for d, info in days.items() if info.get('leave')]
        if leave_days:
            line += f' leave={leave_days}'
        print(line)
        for d in TARGET_DATES:
            info = days.get(d, {})
            if info.get('official', 0) or info.get('part_time', 0) or info.get('leave'):
                print(f'    {d}: {fmt_day(info)}')
        results.setdefault(emp, {})[label] = {
            'week': week,
            'summary_total': summary_totals.get(emp),
            'official_daily': {d: days.get(d, {}).get('official', 0) for d in TARGET_DATES},
            'part_time_daily': {d: days.get(d, {}).get('part_time', 0) for d in TARGET_DATES},
            'leave': {d: days.get(d, {}).get('leave') for d in TARGET_DATES},
        }
    print()

print('\n=== AGGREGATED PER EMPLOYEE ===')
for emp, projs in results.items():
    total = sum(p['summary_total'] or 0 for p in projs.values())
    daily_total = {d: 0.0 for d in TARGET_DATES}
    for p in projs.values():
        for d in TARGET_DATES:
            daily_total[d] += p['official_daily'].get(d, 0)
    print(f'{emp:8s}: total={total:.2f}h | per-day: ' + ' '.join(f'{d}={daily_total[d]:.2f}h' for d in TARGET_DATES))
    for proj_name, p in projs.items():
        st = p['summary_total']
        print(f'  - {proj_name:18s} ({p["week"]}): {st}h')

# Dump JSON for downstream agent use
with open('/tmp/weekly-2026-04-20.json', 'w') as fh:
    json.dump(results, fh, indent=2, default=str)
print('\nWrote /tmp/weekly-2026-04-20.json')
