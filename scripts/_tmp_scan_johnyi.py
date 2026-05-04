import re
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gbuild

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = gbuild('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

sid = '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ'

# Targets
targets = {
    'W20': ['24/04'],
    'W21': ['27/04', '28/04', '29/04'],
    'W22': ['04/05'],
}

totals = {}
for ws, target_dates in targets.items():
    result = sheets_api.values().get(spreadsheetId=sid, range=f'{ws}!A1:K200').execute()
    rows = result.get('values', [])
    print(f"\n=== {ws} Header: {rows[3] if len(rows)>3 else 'NA'} ===")

    current_date = None
    for i, row in enumerate(rows):
        if not row:
            continue
        cell_a = row[0].strip() if row else ""
        if re.match(r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun),', cell_a):
            current_date = cell_a
            actual = row[7] if len(row) > 7 else ""
            for td in target_dates:
                if td in cell_a:
                    print(f"\n  >>> {cell_a} day-total='{actual}'")
                    totals.setdefault(td, {'rows':[], 'sum':0.0, 'leave':None, 'day_total':actual})
            continue
        # Check if current date is one of our targets
        active_td = None
        if current_date:
            for td in target_dates:
                if td in current_date:
                    active_td = td
                    break
        if active_td:
            if cell_a == 'Task dự án':
                owner = row[6].strip() if len(row) > 6 else ""
                actual_str = row[7].strip() if len(row) > 7 else "0"
                desc = row[2].strip() if len(row) > 2 else ""
                if owner == 'TuanNT':
                    try:
                        h = float(actual_str.replace(',', '.'))
                    except:
                        h = 0
                    print(f"     row {i+1}: TuanNT {actual_str}h - {desc[:80]}")
                    totals[active_td]['rows'].append((h, desc))
                    totals[active_td]['sum'] += h
            if 'Nghỉ' in cell_a:
                print(f"     row {i+1}: LEAVE: {cell_a}")
                totals[active_td]['leave'] = cell_a

print("\n=== SUMMARY ===")
for td in ['24/04', '27/04', '28/04', '29/04', '04/05']:
    t = totals.get(td, {})
    print(f"{td}: TuanNT rows={len(t.get('rows',[]))}, sum={t.get('sum',0)}h, leave={t.get('leave')}, day_total={t.get('day_total')}")
