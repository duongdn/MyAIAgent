"""Fetch Fountain Est vs Charged tab snapshot for end-of-W25 (Sat 2026-05-09)."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gcl
creds = Credentials.from_service_account_file('config/daily-agent-490610-7eb7985b33e3.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gcl('sheets', 'v4', credentials=creds).spreadsheets()
sid = '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o'

r = svc.values().get(spreadsheetId=sid, range='Est vs Charged!A1:N400').execute()
rows = r.get('values', [])

def f(s):
    if not s: return 0.0
    try: return float(str(s).replace(',', '.'))
    except: return 0.0

print(f'Total rows: {len(rows)}')
header = rows[0] if rows else []
for i, h in enumerate(header):
    print(f'  Col {chr(65+i)}: {h}')

# Status filter logic
EXCL_STRICT = {'Deployed on Live', 'Cancelled', 'Has Bug on Live', 'Tested on Live'}
EXCL_BROADER = {'Deployed on Live', 'Cancelled'}
NS_IP = {'Not Started', 'In-progress (<50%)', 'In-progress (>50%)'}
PENDING = 'Pending'

ns_ip_strict = 0.0
ns_only = 0.0
ip_only = 0.0
pending_rem = 0.0
broader = 0.0
overest_rows = []
total_cr = 0.0

for r_ in rows[1:]:
    if len(r_) < 8: continue
    title = (r_[0] if len(r_)>0 else '').strip()
    status = (r_[6] if len(r_)>6 else '').strip()
    est_raw = f(r_[8]) if len(r_)>8 else 0
    cr = f(r_[9]) if len(r_)>9 else 0
    actual = f(r_[10]) if len(r_)>10 else 0
    est_total = est_raw + cr
    rem = max(est_total - actual, 0)
    if status in NS_IP:
        ns_ip_strict += rem
        if status == 'Not Started':
            ns_only += rem
        else:
            ip_only += rem
    if status == PENDING:
        pending_rem += rem
    if status not in EXCL_BROADER and status != '':
        broader += rem
    if cr > 0:
        total_cr += cr
    if est_total > 0 and actual > est_total * 1.2:
        overest_rows.append((title, est_raw, cr, actual, est_total, status, (actual/est_total - 1) * 100 if est_total else 0))

print(f'\nRemaining NS+IP strict: {ns_ip_strict:.2f}h')
print(f'  – Not Started only: {ns_only:.2f}h')
print(f'  – In-progress only: {ip_only:.2f}h')
print(f'Pending: {pending_rem:.2f}h')
print(f'Broader (excl Live/Cancelled): {broader:.2f}h')
print(f'Total CR: {total_cr:.2f}h')

print(f'\nOver-estimate (actual > 1.2x est+CR):')
overest_rows.sort(key=lambda x: -x[6])
for title, est_raw, cr, actual, est_total, status, pct in overest_rows[:25]:
    print(f'  {title[:35]:35} est={est_raw:6.1f}+CR{cr:5.1f} act={actual:6.2f} ({pct:+6.1f}%) [{status}]')
