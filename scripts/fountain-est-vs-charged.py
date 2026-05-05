"""Fountain Est vs Charged analysis — capacity & runway + over-estimate tracking."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc
import json

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()


def to_float(s):
    if s is None or s == '':
        return 0.0
    try:
        return float(str(s).replace(',', '.').replace(' ', ''))
    except Exception:
        return 0.0


r = svc.values().get(spreadsheetId='1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o',
                     range='Est vs Charged!A1:N300').execute()
rows = r.get('values', [])

# Headers known: row 4 = totals; row 5 = headers
# Indexes: 0=Name, 5=Note, 6=Status, 7=Dev, 8=Est Raw, 9=CR, 10=Actual, 11=Charged
TASK_COL = 0
NOTE_COL = 5
STATUS_COL = 6
DEV_COL = 7
EST_COL = 8
CR_COL = 9
ACTUAL_COL = 10
CHARGED_COL = 11

active = []
deployed = []
cancelled = []
for i, row in enumerate(rows[5:], start=6):
    name = (row[TASK_COL] if len(row) > TASK_COL else '').strip()
    if not name or name in ('Total',):
        continue
    status = (row[STATUS_COL] if len(row) > STATUS_COL else '').strip()
    est = to_float(row[EST_COL] if len(row) > EST_COL else 0)
    actual = to_float(row[ACTUAL_COL] if len(row) > ACTUAL_COL else 0)
    cr = to_float(row[CR_COL] if len(row) > CR_COL else 0)
    charged = to_float(row[CHARGED_COL] if len(row) > CHARGED_COL else 0)
    note = (row[NOTE_COL] if len(row) > NOTE_COL else '')
    rec = {
        'row': i,
        'name': name,
        'status': status,
        'est': est,
        'cr': cr,
        'actual': actual,
        'charged': charged,
        'remaining': max(0.0, est - actual),
        'over_pct': ((actual - est) / est * 100) if est > 0 else 0,
    }
    s_lower = status.lower()
    if 'deployed on live' in s_lower or 'live' == s_lower:
        deployed.append(rec)
    elif 'cancel' in s_lower:
        cancelled.append(rec)
    else:
        active.append(rec)

print(f'Active tasks: {len(active)}')
print(f'Deployed on Live: {len(deployed)}')
print(f'Cancelled: {len(cancelled)}')

total_est_active = sum(t['est'] for t in active)
total_actual_active = sum(t['actual'] for t in active)
total_remaining = sum(t['remaining'] for t in active)
print(f'Active total: est={total_est_active:.1f}h actual={total_actual_active:.1f}h remaining={total_remaining:.1f}h')

# Top remaining tasks
print('\n=== Top remaining (active) ===')
for t in sorted(active, key=lambda x: -x['remaining'])[:10]:
    print(f"  {t['name'][:60]:60s} | status={t['status']:25s} | est={t['est']:6.1f} actual={t['actual']:6.1f} remaining={t['remaining']:6.1f}")

# Over-estimate (actual > est * 1.2 and est > 0)
print('\n=== Over-estimate (actual > est * 1.2) ===')
over = sorted([t for t in active + deployed if t['est'] > 0 and t['actual'] > t['est'] * 1.2],
              key=lambda x: -x['over_pct'])
for t in over[:25]:
    print(f"  {t['name'][:60]:60s} | status={t['status']:25s} | est={t['est']:6.1f} actual={t['actual']:6.1f} over%={t['over_pct']:.0f}")

# Save for downstream comparison
with open('/tmp/fountain-est-2026-04-25.json', 'w') as fh:
    json.dump({'active': active, 'deployed': deployed, 'cancelled': cancelled,
               'total_est_active': total_est_active, 'total_actual_active': total_actual_active,
               'total_remaining_active': total_remaining}, fh, indent=2, default=str)
print('\nWrote /tmp/fountain-est-2026-04-25.json')
