"""Fountain Est vs Charged — W28 (2026-05-25). Capacity & runway + over-estimate tracking.
Includes CR column (col J) in all estimate calculations per memory rule.
"""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc
import json

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
SHEET_ID = '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o'
TARGET_MONDAY_PATTERNS = ['May 25, 2026', 'May 25', '25/05']

creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()


def to_float(s):
    if s is None or s == '':
        return 0.0
    try:
        return float(str(s).replace(',', '.').replace(' ', ''))
    except Exception:
        return 0.0


# --- Part 2: Task log actuals from Summary tab ---
print('=== Part 2: Fountain Task Log Actuals (W28) ===')
try:
    r = svc.values().get(spreadsheetId=SHEET_ID, range='Summary!A4:BZ300').execute()
    sum_rows = r.get('values', [])
    week_label = None
    for row in sum_rows:
        if len(row) >= 2:
            b = (row[1] or '').strip()
            if any(p in b for p in TARGET_MONDAY_PATTERNS):
                week_label = (row[0] or '').strip()
                print(f'Found week tab: {week_label} (start: {b})')
                break
    if not week_label:
        print('ERROR: Could not find May 25 week in Fountain Summary tab.')
        # Print last 10 rows to diagnose
        for row in sum_rows[-10:]:
            if len(row) >= 2:
                print(f'  {row[0]} | {row[1]}')
    else:
        FOUNTAIN_DEVS = ['ViTHT', 'ThinhT', 'VuTQ', 'PhatDLT', 'HungPN', 'HaVS', 'DatNT', 'LamLQ']
        header_row = sum_rows[0]
        name_row = sum_rows[1]
        actuals = {}
        for emp in FOUNTAIN_DEVS:
            cands = []
            for i, cell in enumerate(name_row):
                if i < 8:
                    continue
                if (cell or '').strip() == emp:
                    h = (header_row[i] if i < len(header_row) else '') or ''
                    if h.strip() == 'Actual':
                        cands.append(i)
            if not cands:
                for i, cell in enumerate(name_row):
                    if (cell or '').strip() == emp:
                        cands.append(i)
                        break
            if cands:
                col = cands[0]
                for row in sum_rows[2:]:
                    if len(row) > 0 and (row[0] or '').strip() == week_label:
                        v = row[col] if col < len(row) else '0'
                        actuals[emp] = to_float(v)
                        break
        print('Per-dev actuals:')
        for emp, h in actuals.items():
            print(f'  {emp}: {h}h')
except Exception as e:
    print(f'ERROR fetching Summary: {e}')
    actuals = {}
    week_label = None

# --- Parts 4 & 5: Est vs Charged tab ---
print('\n=== Parts 4+5: Est vs Charged tab ===')
try:
    r = svc.values().get(spreadsheetId=SHEET_ID, range='Est vs Charged!A1:N400').execute()
    rows = r.get('values', [])
except Exception as e:
    print(f'ERROR fetching Est vs Charged: {e}')
    rows = []

# Col indices (0-based): A=0, Task#=0, Status=6, Dev=7, EstRaw=8, CR=9, Actual=10, Charged=11
TASK_COL = 0
STATUS_COL = 6
DEV_COL = 7
EST_COL = 8
CR_COL = 9
ACTUAL_COL = 10
CHARGED_COL = 11

EXCLUDE_STATUSES = {'deployed on live', 'cancelled', 'tested on live', 'has bug on live'}
NS_IP_STATUSES = {'not started', 'in-progress (>50%)', 'in-progress (<50%)'}

active = []
ns_ip = []
broader = []
for i, row in enumerate(rows[5:], start=6):
    name = (row[TASK_COL] if len(row) > TASK_COL else '').strip()
    if not name or name in ('Total', 'TOTAL'):
        continue
    status = (row[STATUS_COL] if len(row) > STATUS_COL else '').strip()
    est = to_float(row[EST_COL] if len(row) > EST_COL else 0)
    cr = to_float(row[CR_COL] if len(row) > CR_COL else 0)
    actual = to_float(row[ACTUAL_COL] if len(row) > ACTUAL_COL else 0)
    charged = to_float(row[CHARGED_COL] if len(row) > CHARGED_COL else 0)
    total_est = est + cr
    s_lower = status.lower()
    if s_lower in EXCLUDE_STATUSES or 'live' in s_lower:
        continue
    rec = {
        'row': i, 'name': name, 'status': status,
        'est': est, 'cr': cr, 'total_est': total_est,
        'actual': actual, 'charged': charged,
        'remaining': max(0.0, total_est - actual),
        'over_pct': ((actual - total_est) / total_est * 100) if total_est > 0 else 0,
    }
    active.append(rec)
    if any(s_lower.startswith(x) for x in ('not started', 'in-progress')):
        ns_ip.append(rec)
    elif s_lower not in ('', 'n/a'):
        broader.append(rec)

print(f'Active tasks (excl Deployed/Cancelled): {len(active)}')
ns_ip_remaining = sum(t['remaining'] for t in ns_ip)
broader_remaining = sum(t['remaining'] for t in active)
DEV_HW = 90  # h/week from W27 plan
print(f'NS+IP tasks: {len(ns_ip)}  remaining={ns_ip_remaining:.1f}h  runway={ns_ip_remaining/DEV_HW:.2f}wk @ {DEV_HW}h/wk')
print(f'All active:  {len(active)}  remaining={broader_remaining:.1f}h  runway={broader_remaining/DEV_HW:.2f}wk @ {DEV_HW}h/wk')

# W27 comparison values
W27_NS_IP_REMAINING = 327.5
W27_RUNWAY = 3.64
delta_remaining = ns_ip_remaining - W27_NS_IP_REMAINING
delta_runway = ns_ip_remaining / DEV_HW - W27_RUNWAY
print(f'vs W27: remaining delta={delta_remaining:+.1f}h  runway delta={delta_runway:+.2f}wk')

print('\n=== Over-estimate tasks (actual > total_est * 1.2) ===')
over = sorted([t for t in active if t['total_est'] > 0 and t['actual'] > t['total_est'] * 1.2],
              key=lambda x: -x['over_pct'])
# W27 actuals for key tasks (for STILL GROWING check)
W27_ACTUALS = {
    '#2595': 168.25, '#2615': 106.75, '#2735': 133.0,
    '#2627': None, '#2639': None,
    '#2837': None, '#2853': None,
}
for t in over[:20]:
    task_id = t['name'].split()[0] if t['name'].startswith('#') else t['name'][:10]
    w27 = W27_ACTUALS.get(task_id)
    trend = ''
    if w27 is not None:
        delta = t['actual'] - w27
        trend = f'  vs W27: {delta:+.1f}h ({"STILL GROWING" if delta > 0 else "STABLE"})'
    print(f"  {t['name'][:55]:55s} | {t['status']:20s} | est+cr={t['total_est']:5.1f} act={t['actual']:6.1f} over%={t['over_pct']:.0f}%{trend}")

# Save results
out = {
    'week': 'W28', 'actuals': actuals, 'week_label': week_label,
    'ns_ip_remaining': ns_ip_remaining, 'broader_remaining': broader_remaining,
    'runway_ns_ip': ns_ip_remaining / DEV_HW,
    'over_tasks': [{k: v for k, v in t.items()} for t in over[:20]],
}
with open('/tmp/fountain-w28.json', 'w') as fh:
    json.dump(out, fh, indent=2, default=str)
print('\nWrote /tmp/fountain-w28.json')
