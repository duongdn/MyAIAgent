import json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as goog_create

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = goog_create('sheets', 'v4', credentials=creds)
sheets_api = service.spreadsheets()

# All spreadsheets to check
checks = [
    ("xtreme", "1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58", "LongVV", "W51"),
    ("james_diamond", "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI", "PhucVT", "W51"),
    ("generator", "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM", "KhanhHH", "W51"),
    ("paturevision", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH", None),
    ("rory", "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8", "LeNH", "W51"),
    ("franc", "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ", "LeNH", "W51"),
    ("aysar", "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8", "LeNH", "W51"),
    ("john_yi", "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ", "TuanNT", "W51"),
    ("rebecca", "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4", "TuanNT", "W51"),
]

# Find correct W-sheet for Paturevision
try:
    meta = sheets_api.get(spreadsheetId="1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", fields='sheets.properties.title').execute()
    pv_sheets = [s['properties']['title'] for s in meta['sheets']]
    pv_w = sorted([s for s in pv_sheets if s.startswith('W')], key=lambda x: int(x[1:]) if x[1:].isdigit() else 0)
    for ws in reversed(pv_w[-5:]):
        r = sheets_api.values().get(spreadsheetId="1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", range=f'{ws}!A4').execute()
        v = r.get('values',[['']])[0][0]
        if '23/03' in v or '24/03' in v:
            checks[3] = ("paturevision", "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg", "VietPH", ws)
            break
except Exception as e:
    print(f"Paturevision week lookup error: {e}")

# For each spreadsheet, read Friday 27/03 data
for name, sid, dev, ws in checks:
    if ws is None:
        print(f"{name:20s} | {dev:10s} | ERROR: no week sheet found")
        continue
    try:
        result = sheets_api.values().get(spreadsheetId=sid, range=f'{ws}!A1:K200').execute()
        rows = result.get('values', [])

        fri_hours = 0.0
        fri_rows_found = 0
        in_friday = False
        leave_note = ""

        for i, row in enumerate(rows):
            if not row:
                continue
            cell_a = row[0].strip() if row else ""

            if 'Fri' in cell_a and ('27/03' in cell_a or '27/3' in cell_a):
                in_friday = True
                continue
            if in_friday and cell_a and any(d in cell_a for d in ['Sat,', 'Mon,', 'Sun,', 'Tue,', 'Wed,', 'Thu,']):
                in_friday = False
                continue

            if in_friday:
                if cell_a == "Task dự án":
                    owner = row[6].strip() if len(row) > 6 else ""
                    hours_str = row[7].strip() if len(row) > 7 else "0"

                    if owner == dev:
                        try:
                            h = float(hours_str.replace(',','.'))
                            fri_hours += h
                            fri_rows_found += 1
                        except:
                            pass

                row_str = str(row)
                if "Nghỉ cả ngày" in row_str:
                    leave_note = "full_day_off"
                if "Nghỉ nửa ngày" in row_str:
                    leave_note = "half_day"

        status = "OK" if fri_hours >= 8 else ("LEAVE" if leave_note else f"LOW ({fri_hours}h)")
        if leave_note == "full_day_off" and fri_hours == 0:
            status = "OFF (full day)"
        if leave_note == "half_day" and fri_hours >= 4:
            status = "OK (half-day)"

        print(f"{name:20s} | {dev:10s} | Fri: {fri_hours:5.1f}h | rows: {fri_rows_found} | {status} | leave: {leave_note}")

    except Exception as e:
        print(f"{name:20s} | {dev:10s} | ERROR: {str(e)[:100]}")

# Also check Scrin.io for TuanNT
print("\n--- SCRIN.IO ---")
try:
    scrin = json.load(open('config/.scrin-config.json'))
    import requests
    session = requests.Session()
    # Login
    login_page = session.get('https://scrin.io/login')
    import re
    token_match = re.search(r'name="__RequestVerificationToken".*?value="([^"]+)"', login_page.text)
    if token_match:
        token = token_match.group(1)
        login_resp = session.post('https://scrin.io/login', data={
            '__RequestVerificationToken': token,
            'Email': scrin['email'],
            'Password': scrin['password']
        })
        # Get API token
        api_match = re.search(r'var apiToken\s*=\s*"([^"]+)"', login_resp.text)
        if api_match:
            api_token = api_match.group(1)
            # Get report for Friday
            report_resp = session.post('https://scrin.io/api/v2/GetReport',
                headers={'X-SSM-Token': api_token},
                json={
                    'companyId': scrin.get('company_id', 266977),
                    'employeeId': scrin.get('employee_id', 453601),
                    'date': '2026-03-27',
                    'isYesterday': False
                })
            if report_resp.status_code == 200:
                data = report_resp.json()
                total = data.get('totalTime', data.get('total', 'N/A'))
                print(f"TuanNT Scrin.io Fri 27: {json.dumps(data)[:500]}")
            else:
                print(f"Scrin API error: {report_resp.status_code} {report_resp.text[:200]}")
        else:
            print("Could not extract API token from Scrin.io")
    else:
        print("Could not get CSRF token from Scrin.io login page")
except Exception as e:
    print(f"Scrin.io error: {e}")
