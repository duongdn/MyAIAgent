"""Check leave rows for short-hour employees AND Fountain Est vs Charged."""
import json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()


def to_float(s):
    if s is None or s == '':
        return 0.0
    try:
        return float(str(s).replace(',', '.'))
    except Exception:
        return 0.0


def dump_rows(label, sid, tab, target_employee=None):
    r = svc.values().get(spreadsheetId=sid, range=f"{tab}!A1:O300").execute()
    rows = r.get('values', [])
    print(f'\n=== {label}: {tab} (focus={target_employee}) ===')
    cur_day = None
    for i, row in enumerate(rows):
        a = row[0] if len(row) > 0 else ''
        b = row[1] if len(row) > 1 else ''
        g = row[6] if len(row) > 6 else ''
        h = row[7] if len(row) > 7 else ''
        line = f'r{i+1:3d} | A={a[:25]:25s} | B={b[:25]:25s} | G={g[:12]:12s} | H={h[:8]:8s}'
        if any(x in (a or '') for x in ['20/04', '21/04', '22/04', '23/04', '24/04']) or \
           any(x in (b or '') for x in ['20/04', '21/04', '22/04', '23/04', '24/04']):
            cur_day = (a + ' ' + b).strip()
            print(line + '   <-- DAY')
            continue
        if target_employee and (g or '').strip() == target_employee:
            print(line)
        elif 'Nghỉ' in (a or '') or 'Nghỉ' in (b or ''):
            print(line + '   <-- LEAVE')


# LongVV Friday check across both sheets
dump_rows('Maddy New W3', '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I', 'W3', 'LongVV')
dump_rows('James Diamond W22', '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'W22', 'LongVV')

# AnhNH2 check
dump_rows('James Diamond W22 — AnhNH2', '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'W22', 'AnhNH2')

# ThinhT check
dump_rows('Fountain W23 — ThinhT', '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', 'W23', 'ThinhT')


# Fountain Est vs Charged
print('\n\n=== Fountain — Est vs Charged ===')
r = svc.values().get(spreadsheetId='1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o',
                     range='Est vs Charged!A1:N300').execute()
rows = r.get('values', [])
print(f'Total rows: {len(rows)}')
print(f'Header: {rows[0] if rows else "(empty)"}')
# Print rows 1..3 to understand structure
for i in range(min(5, len(rows))):
    print(f'r{i+1}: {rows[i]}')

# Locate columns: assume task no col, status, est, actual etc.
# We know: I (idx 8) = Est Raw, K (idx 10) = Actual
print('\n--- Active tasks (status != Deployed on Live, != Cancelled) ---')
total_est = 0.0
total_actual = 0.0
total_remaining = 0.0
active_count = 0
overrun = []
header = rows[0] if rows else []
# Identify status column — try col E or F
for i, h in enumerate(header):
    print(f'  col[{i}]={h}')

# Use columns by index. Check first non-header row for structure
sample = rows[1] if len(rows) > 1 else []
for i, v in enumerate(sample):
    print(f'  sample[{i}]={v}')
