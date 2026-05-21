#!/usr/bin/env python3
"""Fountain 5-part check — 2026-05-21 (Thu)
Parts 2,3,4,5: Task log actuals W27 + Est vs Charged analysis.
"""
import json, time
from collections import defaultdict
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
SHEET_ID = '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o'

creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

FOUNTAIN_DEVS = ['ViTHT', 'ThinhT', 'VuTQ', 'HaVS', 'DatNT', 'LamLQ']
QC_DEVS = ['PhatDLT', 'HungPN', 'TrinhMTT']

def fetch(rng, retries=3):
    for i in range(retries):
        try:
            return svc.values().get(spreadsheetId=SHEET_ID, range=rng).execute().get('values', [])
        except Exception as e:
            if '429' in str(e) and i < retries - 1:
                print(f'  Rate limit, sleeping 45s...')
                time.sleep(45)
                continue
            print(f'  Fetch error: {e}')
            return []
    return []

def to_float(s):
    if s is None or s == '': return 0.0
    try: return float(str(s).replace(',', '.').replace(' ', ''))
    except: return 0.0

# ---- PART 2: Task log actuals W27 (May 18-22) ----
print('=== PART 2: Task Log Actuals W27 (May 18-22) ===')

# First, find what tabs exist
meta = svc.get(spreadsheetId=SHEET_ID).execute()
tabs = [s['properties']['title'] for s in meta.get('sheets', [])]
print(f'Available tabs: {tabs}')

# Find W27 tab
w27_tab = None
for t in tabs:
    if 'W27' in t or 'w27' in t:
        w27_tab = t
        break

# Also check Summary to find W27
summary_rows = fetch("'Summary'!A1:F100")
print('\nSummary tab rows:')
for r in summary_rows[:30]:
    if any(str(c).strip() for c in r):
        print(f'  {r}')

print(f'\nW27 tab found: {w27_tab}')

if w27_tab:
    # Scan full W27 tab
    w27_data = fetch(f"'{w27_tab}'!A1:T500")
    print(f'\nW27 data rows: {len(w27_data)}')

    # Find day headers
    day_rows = []
    for i, row in enumerate(w27_data):
        a = (row[0] if row else '') or ''
        if any(a.startswith(d) for d in ('Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,')):
            day_rows.append((i, a))
    print(f'Day headers: {[(i, a) for i, a in day_rows]}')

    # Per-dev accumulation
    per_dev = defaultdict(float)
    per_dev_per_day = defaultdict(lambda: defaultdict(float))

    for day_idx, (start, day_label) in enumerate(day_rows):
        end = day_rows[day_idx + 1][0] if day_idx + 1 < len(day_rows) else len(w27_data)
        for i in range(start, end):
            row = w27_data[i] if i < len(w27_data) else []
            a = (row[0] if len(row) > 0 else '') or ''
            g = (row[6] if len(row) > 6 else '') or ''
            h = (row[7] if len(row) > 7 else '') or ''
            if str(a) == 'Task dự án' and str(g).strip():
                owner = str(g).strip()
                hrs = to_float(h)
                per_dev[owner] += hrs
                per_dev_per_day[owner][day_label[:3]] += hrs

    print('\nPer-dev totals W27 so far:')
    all_devs = FOUNTAIN_DEVS + QC_DEVS
    for dev in all_devs:
        h = per_dev.get(dev, 0.0)
        days = per_dev_per_day.get(dev, {})
        days_str = ', '.join(f"{d}={v:.1f}" for d, v in sorted(days.items()))
        print(f'  {dev}: {h:.2f}h [{days_str}]')

    # Any extra devs
    for dev, h in sorted(per_dev.items()):
        if dev not in all_devs:
            print(f'  {dev}: {h:.2f}h [OTHER]')
else:
    print('W27 tab not found! Checking alternative tab names...')
    for t in tabs:
        print(f'  Tab: {t}')

time.sleep(1)

# ---- PART 4 & 5: Est vs Charged ----
print('\n\n=== PART 4 & 5: Est vs Charged ===')
rows = fetch('Est vs Charged!A1:N500')
print(f'Est vs Charged rows: {len(rows)}')

# Print first 10 rows to understand structure
print('First 15 rows:')
for i, row in enumerate(rows[:15]):
    print(f'  R{i+1}: {row}')

# Known column mapping from fountain-est-vs-charged.py:
# Col A(0)=Task, Col F(5)=Note, Col G(6)=Status, Col H(7)=Dev
# Col I(8)=Est, Col J(9)=CR, Col K(10)=Actual, Col L(11)=Charged
TASK_COL = 0
STATUS_COL = 6
DEV_COL = 7
EST_COL = 8
CR_COL = 9
ACTUAL_COL = 10
CHARGED_COL = 11

active = []
done_deployed = []
cancelled = []

for i, row in enumerate(rows[5:], start=6):
    name = (row[TASK_COL] if len(row) > TASK_COL else '').strip()
    if not name or name in ('Total', 'Task', ''):
        continue
    status = (row[STATUS_COL] if len(row) > STATUS_COL else '').strip()
    if not status:
        continue
    est = to_float(row[EST_COL] if len(row) > EST_COL else 0)
    cr = to_float(row[CR_COL] if len(row) > CR_COL else 0)
    actual = to_float(row[ACTUAL_COL] if len(row) > ACTUAL_COL else 0)
    charged = to_float(row[CHARGED_COL] if len(row) > CHARGED_COL else 0)
    total_est = est + cr
    rec = {
        'row': i, 'name': name, 'status': status,
        'est': est, 'cr': cr, 'total_est': total_est,
        'actual': actual, 'charged': charged,
        'remaining': max(0.0, total_est - actual),
        'over_pct': ((actual - total_est) / total_est * 100) if total_est > 0 else 0,
    }
    s_lower = status.lower()
    if 'deployed' in s_lower or 'live' in s_lower or 'done' in s_lower:
        done_deployed.append(rec)
    elif 'cancel' in s_lower:
        cancelled.append(rec)
    else:
        active.append(rec)

print(f'\nActive (Not Started + In Progress): {len(active)}')
print(f'Done/Deployed/Live: {len(done_deployed)}')
print(f'Cancelled: {len(cancelled)}')

total_est_active = sum(t['total_est'] for t in active)
total_actual_active = sum(t['actual'] for t in active)
total_remaining = sum(t['remaining'] for t in active)
print(f'\nActive totals: est+CR={total_est_active:.1f}h  actual={total_actual_active:.1f}h  remaining={total_remaining:.1f}h')

# Runway @ 90h/week dev capacity
runway_weeks = total_remaining / 90.0
print(f'Runway: {total_remaining:.1f}h / 90h/week = {runway_weeks:.2f} weeks')

print('\nTop 10 remaining (active):')
for t in sorted(active, key=lambda x: -x['remaining'])[:10]:
    print(f"  [{t['status'][:20]}] {t['name'][:55]:55s} | est={t['est']:.1f} CR={t['cr']:.1f} actual={t['actual']:.1f} remaining={t['remaining']:.1f}")

# Over-estimate tracking
print('\nOver-estimate (actual > total_est * 1.2):')
over = [t for t in active + done_deployed if t['total_est'] > 0 and t['actual'] > t['total_est'] * 1.2]
over.sort(key=lambda x: -x['over_pct'])
for t in over[:20]:
    print(f"  [{t['status'][:15]}] {t['name'][:50]:50s} | est={t['est']:.1f} CR={t['cr']:.1f} actual={t['actual']:.1f} over%={t['over_pct']:.0f}%")

# Key tasks check
KEY_TASKS = ['2595', '2615', '2735']
print(f'\nKey task check ({", ".join(KEY_TASKS)}):')
all_tasks = active + done_deployed + cancelled
for kt in KEY_TASKS:
    matches = [t for t in all_tasks if kt in t['name']]
    if matches:
        for t in matches:
            print(f"  #{kt}: [{t['status']}] est={t['est']:.1f} CR={t['cr']:.1f} actual={t['actual']:.1f} remaining={t['remaining']:.1f} over%={t['over_pct']:.0f}%")
    else:
        print(f"  #{kt}: not found")

# Save snapshot
snapshot = {
    'active': active, 'done_deployed': done_deployed, 'cancelled': cancelled,
    'total_est_active': total_est_active, 'total_actual_active': total_actual_active,
    'total_remaining': total_remaining, 'runway_weeks': runway_weeks,
}
with open('/tmp/fountain-may21.json', 'w') as fh:
    json.dump(snapshot, fh, indent=2, default=str)
print('\nWrote /tmp/fountain-may21.json')
