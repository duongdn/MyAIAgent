"""Bailey Task Monitor — Check 'Est vs Charged' sheet for:
1. Tasks released but not paid
2. Tasks with bugs — hourly vs fixed cost, overbudget check for fixed cost
Spreadsheet: 1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg
Sheet: Est vs Charged (gid=920993260)
"""
import json
import sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build as gc

SA_KEY = 'config/daily-agent-490610-7eb7985b33e3.json'
SPREADSHEET_ID = '1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg'
SHEET_NAME = 'Est vs Charged'

# Column mapping (0-indexed from sheet data, data rows start at row 5)
COL_NAME = 0       # A: Work Package / Activity Name
COL_PAY_STATUS = 1 # B: Payment status (PAID, empty, or notes)
COL_LINK = 5       # F: Trello/Slack link
COL_DEV_STATUS = 6 # G: Dev status (Tested on Live, Has Bug, etc.)
COL_DEV = 7        # H: Developer name
COL_TYPE = 8       # I: "Hourly"/"hourly" or estimated raw hours (number)
COL_EST_BUFFER = 9 # J: Estimated for Dev (with buffer)
COL_ACTUAL = 10    # K: Actual hours
COL_CHARGED = 11   # L: Charged hours

# Statuses that mean "released/done"
RELEASED_STATUSES = ['Tested on Live', 'Deployed on Live', 'Dev Done']
BUG_STATUSES = ['Has Bug on Staging', 'Has Bug on Live', 'Has Bug']


def safe_float(val):
    """Parse float from cell value, return 0.0 on failure."""
    if not val:
        return 0.0
    try:
        return float(str(val).replace(',', '.').strip())
    except (ValueError, TypeError):
        return 0.0


def get_cell(row, idx):
    """Safely get cell value from row."""
    return row[idx].strip() if idx < len(row) and row[idx] else ''


def is_hourly(type_val):
    """Check if task type is hourly."""
    return type_val.lower() in ('hourly', 'hourly')


def main():
    creds = Credentials.from_service_account_file(SA_KEY, scopes=['https://www.googleapis.com/auth/spreadsheets.readonly'])
    svc = gc('sheets', 'v4', credentials=creds).spreadsheets()

    result = svc.values().get(
        spreadsheetId=SPREADSHEET_ID,
        range=f"'{SHEET_NAME}'!A1:Z500"
    ).execute()
    rows = result.get('values', [])

    if not rows:
        print("ERROR: No data found")
        sys.exit(1)

    # Skip header rows (0-4), process data rows from row 5+
    data_rows = rows[5:]

    released_not_paid = []
    has_bugs = []
    all_tasks = []

    for i, row in enumerate(data_rows):
        row_num = i + 6  # 1-indexed sheet row
        name = get_cell(row, COL_NAME)
        if not name:
            continue

        pay_status = get_cell(row, COL_PAY_STATUS)
        dev_status = get_cell(row, COL_DEV_STATUS)
        dev = get_cell(row, COL_DEV)
        task_type = get_cell(row, COL_TYPE)
        est_buffer = safe_float(get_cell(row, COL_EST_BUFFER))
        actual = safe_float(get_cell(row, COL_ACTUAL))
        charged = safe_float(get_cell(row, COL_CHARGED))
        link = get_cell(row, COL_LINK)

        is_paid = 'PAID' in pay_status.upper() if pay_status else False
        hourly = is_hourly(task_type)

        task_info = {
            'row': row_num,
            'name': name,
            'pay_status': pay_status,
            'dev_status': dev_status,
            'dev': dev,
            'type': 'hourly' if hourly else 'fixed',
            'est_buffer': est_buffer,
            'actual': actual,
            'charged': charged,
            'link': link,
        }

        # Check 1: Released but not paid
        if dev_status in RELEASED_STATUSES and not is_paid:
            task_info['alert'] = 'RELEASED_NOT_PAID'
            released_not_paid.append(task_info)

        # Check 2: Has bug
        if any(bug in dev_status for bug in BUG_STATUSES):
            task_info['alert'] = 'HAS_BUG'
            if not hourly and est_buffer > 0:
                overbudget = actual > est_buffer
                task_info['overbudget'] = overbudget
                task_info['over_pct'] = ((actual / est_buffer) * 100 - 100) if est_buffer > 0 else 0
            has_bugs.append(task_info)

        if name and dev_status:
            all_tasks.append(task_info)

    # Output report
    print("=" * 70)
    print("BAILEY TASK MONITOR — Est vs Charged")
    print("=" * 70)

    # Section 1: Released but not paid
    print(f"\n## RELEASED BUT NOT PAID ({len(released_not_paid)} tasks)")
    print("-" * 50)
    if released_not_paid:
        for t in released_not_paid:
            print(f"  Row {t['row']}: {t['name']}")
            print(f"    Status: {t['dev_status']} | Dev: {t['dev'] or 'N/A'}")
            print(f"    Type: {t['type']} | Actual: {t['actual']}h | Charged: {t['charged']}h")
            if t['pay_status']:
                print(f"    Pay note: {t['pay_status']}")
            if t['link']:
                print(f"    Link: {t['link'][:80]}")
            print()
    else:
        print("  None found.")

    # Section 2: Tasks with bugs
    print(f"\n## TASKS WITH BUGS ({len(has_bugs)} tasks)")
    print("-" * 50)
    if has_bugs:
        for t in has_bugs:
            print(f"  Row {t['row']}: {t['name']}")
            print(f"    Status: {t['dev_status']} | Dev: {t['dev'] or 'N/A'}")
            print(f"    Type: {t['type']} | Actual: {t['actual']}h | Charged: {t['charged']}h")
            if t['type'] == 'fixed':
                print(f"    Estimate (buffered): {t['est_buffer']}h")
                if t.get('overbudget'):
                    print(f"    ⚠️  OVERBUDGET: +{t['over_pct']:.1f}% ({t['actual'] - t['est_buffer']:.2f}h over)")
                else:
                    remaining = t['est_buffer'] - t['actual']
                    print(f"    Within budget: {remaining:.2f}h remaining")
            if t['link']:
                print(f"    Link: {t['link'][:80]}")
            print()
    else:
        print("  None found.")

    # Summary
    print(f"\n## SUMMARY")
    print(f"  Total tasks: {len(all_tasks)}")
    print(f"  Released not paid: {len(released_not_paid)}")
    print(f"  Has bugs: {len(has_bugs)}")


if __name__ == '__main__':
    main()
