"""Pull weekly summary hours for week of Apr 20, 2026 (W23)."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

CHECKS = [
    ('maddy_new',          '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I', 'LongVV'),
    ('james_diamond_phuc', '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'PhucVT'),
    ('james_diamond_anh',  '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'AnhNH2'),
    ('james_diamond_long', '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'LongVV'),
    ('generator',          '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', 'KhanhHH'),
    ('paturevision_viet',  '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', 'VietPH'),
    ('paturevision_tuan',  '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', 'TuanNT'),
    ('rory',               '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', 'LeNH'),
    ('franc',              '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', 'LeNH'),
    ('aysar',              '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', 'LeNH'),
    ('rebecca_lenh',       '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', 'LeNH'),
    ('rebecca_tuan',       '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', 'TuanNT'),
    ('john_yi_tuan',       '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', 'TuanNT'),
    ('marcel_duong',       '1W3sYJkfRdqa6nHkr9pnFdXfjiGuGjzRqCcCgOBzl3WI', 'DuongDN'),
    ('fountain_vuTQ',      '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', 'VuTQ'),
    ('fountain_thinhT',    '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', 'ThinhT'),
    ('fountain_viTHT',     '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', 'ViTHT'),
    ('fountain_phatDLT',   '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', 'PhatDLT'),
    ('fountain_hungPN',    '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', 'HungPN'),
    ('fountain_haVS',      '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o', 'HaVS'),
]

WEEK_MATCH = 'April 20'
results = {}

for label, sid, dev in CHECKS:
    try:
        r = svc.values().get(spreadsheetId=sid, range='Summary!A4:AZ60').execute()
        rows = r.get('values', [])
        if len(rows) < 2:
            print(f'{label:25s} | {dev:10s} | NO DATA')
            continue

        header_row = rows[0]
        name_row = rows[1]

        # Find column index for dev's Actual hours (first match where header is 'Actual')
        dev_col = None
        for i, cell in enumerate(name_row):
            if cell.strip() == dev and i >= 8:
                h = header_row[i] if i < len(header_row) else ''
                if h == 'Actual':
                    dev_col = i
                    break

        if dev_col is None:
            for i, cell in enumerate(name_row):
                if cell.strip() == dev:
                    dev_col = i
                    break

        if dev_col is None:
            print(f'{label:25s} | {dev:10s} | DEV NOT FOUND')
            results[f'{dev}_{label}'] = None
            continue

        # Find week row
        found = False
        for row in rows[2:]:
            if len(row) > 1 and WEEK_MATCH in row[1]:
                week = row[0]
                hours = row[dev_col] if dev_col < len(row) else '0'
                try:
                    h = float(hours.replace(',', '.'))
                except:
                    h = 0.0
                key = f'{dev}_{label}'
                results[key] = h
                print(f'{label:25s} | {dev:10s} | {week} | col {dev_col} | {h}h')
                found = True
                break
        if not found:
            print(f'{label:25s} | {dev:10s} | WEEK NOT FOUND')
            results[f'{dev}_{label}'] = None
    except Exception as e:
        print(f'{label:25s} | {dev:10s} | ERROR: {str(e)[:120]}')

# Aggregate multi-project devs
tuannt_total = sum(v for k, v in results.items() if k.startswith('TuanNT_') and v)
lenh_total = sum(v for k, v in results.items() if k.startswith('LeNH_') and v)
longvv_total = sum(v for k, v in results.items() if k.startswith('LongVV_') and v)

print(f'\n--- AGGREGATED ---')
print(f'LongVV total (maddy_new + james_diamond_long): {longvv_total}h')
print(f'TuanNT total (john_yi + rebecca + paturevision): {tuannt_total}h')
print(f'LeNH total (rory + franc + aysar + rebecca): {lenh_total}h')
