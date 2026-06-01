"""Read Django training plan template and dump cells with actual values or non-default formatting."""
import json
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA_FILE = 'config/daily-agent-490610-7eb7985b33e3.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
TEMPLATE_ID = '1lpQx6ETCxDjNj4P5pIMEAaDbd7rYBLPOYqcEUZ82EaM'

creds = Credentials.from_service_account_file(SA_FILE, scopes=SCOPES)
service = build('sheets', 'v4', credentials=creds)

result = service.spreadsheets().get(
    spreadsheetId=TEMPLATE_ID,
    includeGridData=True
).execute()

DEFAULT_BG = {}
DEFAULT_TF_KEYS = {'foregroundColor', 'fontFamily', 'fontSize', 'foregroundColorStyle'}

def is_default(ufmt):
    bg = ufmt.get('backgroundColor', {})
    tf = ufmt.get('textFormat', {})
    ha = ufmt.get('horizontalAlignment', 'LEFT')
    va = ufmt.get('verticalAlignment', 'BOTTOM')
    ws = ufmt.get('wrapStrategy', 'OVERFLOW_CELL')
    # Non-default if bg has color, tf has bold/underline/unusual size, or non-default alignment
    if bg and bg != {} and any(v != 0 for v in bg.values()):
        return False
    if tf.get('bold') or tf.get('italic') or tf.get('underline'):
        return False
    if tf.get('fontSize', 10) not in (10, 0):
        return False
    fg = tf.get('foregroundColor', {})
    if fg and fg != {} and any(v != 0 for v in fg.values()):
        return False
    if ha not in ('LEFT', ''):
        return False
    if va not in ('BOTTOM', 'TOP', 'MIDDLE', ''):
        return False
    return True

for sheet in result['sheets']:
    props = sheet['properties']
    print(f"\n{'='*60}")
    print(f"SHEET: {props['title']} (gid={props['sheetId']})")
    gp = props.get('gridProperties', {})
    if gp.get('frozenRowCount'):
        print(f"  frozenRows: {gp['frozenRowCount']}")
    if gp.get('frozenColumnCount'):
        print(f"  frozenCols: {gp['frozenColumnCount']}")

    merges = sheet.get('merges', [])
    if merges:
        print(f"  Merges: {merges}")

    col_widths = {}
    row_heights = {}
    for band in sheet.get('columnGroups', []) + sheet.get('bandedRanges', []):
        pass
    # Column/row dimensions from sheet
    for cd in sheet.get('columnMetadata', []):
        pass

    data = sheet.get('data', [])
    for grid in data:
        rows = grid.get('rowData', [])
        col_meta = grid.get('columnMetadata', [])
        row_meta = grid.get('rowMetadata', [])
        for ci, cm in enumerate(col_meta):
            px = cm.get('pixelSize', 0)
            if px and px != 100:
                print(f"  Col {ci} width: {px}px")
        for ri, rm in enumerate(row_meta):
            px = rm.get('pixelSize', 0)
            if px and px != 21:
                print(f"  Row {ri} height: {px}px")

        for ri, row in enumerate(rows):
            cells = row.get('values', [])
            for ci, cell in enumerate(cells):
                val = cell.get('formattedValue', '')
                ufmt = cell.get('userEnteredFormat', {})
                # Show if has value OR non-default formatting
                if val or (ufmt and not is_default(ufmt)):
                    bg = ufmt.get('backgroundColor', {})
                    tf = ufmt.get('textFormat', {})
                    ha = ufmt.get('horizontalAlignment', '')
                    va = ufmt.get('verticalAlignment', '')
                    ws = ufmt.get('wrapStrategy', '')
                    fg = tf.get('foregroundColor', {})
                    print(f"  [{ri},{ci}] val={repr(val)}")
                    if bg and bg != {}:
                        r = bg.get('red', 0); g = bg.get('green', 0); b = bg.get('blue', 0)
                        print(f"    bg=({r:.2f},{g:.2f},{b:.2f})")
                    if fg and fg != {}:
                        r = fg.get('red', 0); g = fg.get('green', 0); b = fg.get('blue', 0)
                        print(f"    fg=({r:.2f},{g:.2f},{b:.2f})")
                    attrs = []
                    if tf.get('bold'): attrs.append('BOLD')
                    if tf.get('italic'): attrs.append('italic')
                    if tf.get('fontSize', 10) != 10: attrs.append(f"size={tf['fontSize']}")
                    if ha and ha != 'LEFT': attrs.append(f"ha={ha}")
                    if va and va != 'BOTTOM': attrs.append(f"va={va}")
                    if ws and ws != 'OVERFLOW_CELL': attrs.append(f"wrap={ws}")
                    if attrs:
                        print(f"    {' '.join(attrs)}")
                    # Check merges for this cell
                    for m in merges:
                        if m['startRowIndex'] == ri and m['startColumnIndex'] == ci:
                            print(f"    MERGED: rows {m['startRowIndex']}-{m['endRowIndex']-1} cols {m['startColumnIndex']}-{m['endColumnIndex']-1}")
