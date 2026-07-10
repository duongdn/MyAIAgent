import sys
import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    'config/daily-agent-490610-7eb7985b33e3.json',
    scopes=['https://www.googleapis.com/auth/spreadsheets.readonly']
)
svc = build('sheets', 'v4', credentials=creds)

SHEETS = {
    "Maddy": "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
    "JohnYi": "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
    "Rebecca": "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
    "TuanNT_Neural": "1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg",
    "CharlesChang": "19gsF1hFLeuTUZMj2JIrFsRMBvs5pLE7a7j3Q4NalITc",
    "JamesDiamond": "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
    "Rory": "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
    "Franc": "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
    "Aysar": "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
    "Generator": "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
    "Paturevision": "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
}

target = sys.argv[1]  # YYYY-MM-DD
y, m, d = map(int, target.split("-"))
dt = datetime.date(y, m, d)
day_tokens = [
    dt.strftime("%a, %d/%m/%y"),
    dt.strftime("%d/%m/%y"),
]

for name, sid in SHEETS.items():
    try:
        summary = svc.spreadsheets().values().get(spreadsheetId=sid, range="Summary!A1:D80").execute().get('values', [])
    except Exception as e:
        print(f"{name}: SUMMARY ERROR {e}")
        continue
    tab = None
    for row in summary:
        if len(row) >= 3:
            try:
                # try to match date within range by substring on start/end date text
                pass
            except Exception:
                pass
    # find week row containing this date by parsing start/end
    for row in summary:
        if len(row) < 3:
            continue
        try:
            start = datetime.datetime.strptime(row[1], "%B %d, %Y").date()
            end = datetime.datetime.strptime(row[2], "%B %d, %Y").date()
            if start <= dt <= end:
                tab = row[0]
                break
        except Exception:
            continue
    if not tab:
        print(f"{name}: no week tab found")
        continue
    try:
        rows = svc.spreadsheets().values().get(spreadsheetId=sid, range=f"{tab}!A1:I200").execute().get('values', [])
    except Exception as e:
        print(f"{name} ({tab}): ROWS ERROR {e}")
        continue
    # find day header row
    found = False
    for i, row in enumerate(rows):
        if row and any(tok in row[0] for tok in day_tokens if row):
            found = True
            print(f"=== {name} ({tab}) day header: {row} ===")
            for j in range(i+1, min(i+20, len(rows))):
                r = rows[j]
                if r and r[0] == "Please insert above this line":
                    break
                if len(r) >= 7 and r[6]:
                    print("   ", r)
            break
    if not found:
        print(f"{name} ({tab}): day row not found for {day_tokens}")
