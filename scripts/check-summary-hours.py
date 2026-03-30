"""Check weekly hours from Summary sheets for all developers."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

CHECKS = [
    ('xtreme', '1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58', 'LongVV'),
    ('james_diamond', '1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI', 'PhucVT'),
    ('generator', '1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM', 'KhanhHH'),
    ('paturevision', '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', 'VietPH'),
    ('rory', '1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8', 'LeNH'),
    ('franc', '1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ', 'LeNH'),
    ('aysar', '1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8', 'LeNH'),
    ('john_yi', '1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ', 'TuanNT'),
    ('rebecca', '1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4', 'TuanNT'),
    ('paturevision_tuannt', '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg', 'TuanNT'),
]

WEEK_MATCH = 'March 23'
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

        # Find column index for dev's Actual hours
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
            print(f'{label:25s} | {dev:10s} | DEV NOT FOUND in row 5')
            continue

        # Find week row
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
                break
        else:
            print(f'{label:25s} | {dev:10s} | WEEK NOT FOUND')
    except Exception as e:
        print(f'{label:25s} | {dev:10s} | ERROR: {str(e)[:80]}')

# Aggregate multi-project devs
tuannt_total = sum(v for k, v in results.items() if k.startswith('TuanNT'))
lenh_total = sum(v for k, v in results.items() if k.startswith('LeNH'))

print(f'\n--- AGGREGATED ---')
print(f'TuanNT total (john_yi + rebecca + paturevision): {tuannt_total}h')
print(f'LeNH total (rory + franc + aysar): {lenh_total}h')

print(f'\n--- PER-DEVELOPER WEEKLY STATUS ---')
devs = {
    'LongVV': {'min': 40, 'total': results.get('LongVV_xtreme', 0)},
    'PhucVT': {'min': 40, 'total': results.get('PhucVT_james_diamond', 0)},
    'KhanhHH': {'min': 40, 'total': results.get('KhanhHH_generator', 0)},
    'VietPH': {'min': 40, 'total': results.get('VietPH_paturevision', 0)},
    'LeNH': {'min': 40, 'total': lenh_total},
    'TuanNT': {'min': 40, 'total': tuannt_total},
}

for name, info in devs.items():
    status = 'OK' if info['total'] >= info['min'] else f"LOW ({info['total']}h < {info['min']}h)"
    print(f"  {name:10s}: {info['total']:6.1f}h / {info['min']}h min | {status}")
