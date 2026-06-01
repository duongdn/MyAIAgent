"""Completely rebuild FastAPI training plan spreadsheet to exactly match Django template format."""
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SA_FILE = 'config/daily-agent-490610-7eb7985b33e3.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
TARGET_ID = '10zAzDhepucnhAjOCcOMy8jaBt3tKN_e1Qa2KmgGrBlU'

creds = Credentials.from_service_account_file(SA_FILE, scopes=SCOPES)
service = build('sheets', 'v4', credentials=creds)
sheets = service.spreadsheets()

# ── helpers ──────────────────────────────────────────────────────────────────

NAVY  = {'red': 0.20, 'green': 0.20, 'blue': 0.40}
INDIGO= {'red': 0.40, 'green': 0.40, 'blue': 0.60}
WHITE = {'red': 1.0,  'green': 1.0,  'blue': 1.0}

def rgb(r, g, b): return {'red': r, 'green': g, 'blue': b}

def cell_fmt(bg=None, fg=None, bold=False, italic=False, size=10,
             ha='LEFT', va='TOP', wrap='OVERFLOW_CELL', font='Arial'):
    tf = {'fontFamily': font, 'fontSize': size, 'bold': bold, 'italic': italic}
    if fg: tf['foregroundColor'] = fg
    fmt = {'textFormat': tf, 'horizontalAlignment': ha,
           'verticalAlignment': va, 'wrapStrategy': wrap}
    if bg: fmt['backgroundColor'] = bg
    return fmt

def repeat_cell(sheet_id, r1, c1, r2, c2, fmt):
    return {'repeatCell': {
        'range': {'sheetId': sheet_id, 'startRowIndex': r1, 'endRowIndex': r2,
                  'startColumnIndex': c1, 'endColumnIndex': c2},
        'cell': {'userEnteredFormat': fmt},
        'fields': 'userEnteredFormat(textFormat,horizontalAlignment,verticalAlignment,wrapStrategy,backgroundColor)'
    }}

def col_width(sheet_id, ci, px):
    return {'updateDimensionProperties': {
        'range': {'sheetId': sheet_id, 'dimension': 'COLUMNS',
                  'startIndex': ci, 'endIndex': ci+1},
        'properties': {'pixelSize': px},
        'fields': 'pixelSize'
    }}

def row_height(sheet_id, ri, px):
    return {'updateDimensionProperties': {
        'range': {'sheetId': sheet_id, 'dimension': 'ROWS',
                  'startIndex': ri, 'endIndex': ri+1},
        'properties': {'pixelSize': px},
        'fields': 'pixelSize'
    }}

def rows_height(sheet_id, r1, r2, px):
    return {'updateDimensionProperties': {
        'range': {'sheetId': sheet_id, 'dimension': 'ROWS',
                  'startIndex': r1, 'endIndex': r2},
        'properties': {'pixelSize': px},
        'fields': 'pixelSize'
    }}

def unfreeze(sheet_id):
    return {'updateSheetProperties': {
        'properties': {'sheetId': sheet_id,
                       'gridProperties': {'frozenRowCount': 0, 'frozenColumnCount': 0}},
        'fields': 'gridProperties.frozenRowCount,gridProperties.frozenColumnCount'
    }}

# ── get current sheet IDs ─────────────────────────────────────────────────────

meta = sheets.get(spreadsheetId=TARGET_ID).execute()
sid = {}
for s in meta['sheets']:
    sid[s['properties']['title']] = s['properties']['sheetId']

print("Sheets:", sid)

cover_id = sid.get('Cover_Page')
doc_id   = sid.get('Document_Control')
cont_id  = sid.get('Content')

if not all([cover_id is not None, doc_id is not None, cont_id is not None]):
    raise RuntimeError(f"Missing sheets: {sid}")

# ── Step 1: write all VALUES ──────────────────────────────────────────────────

def sv(v): return {'userEnteredValue': {'stringValue': str(v)}}
def nv(v): return {'userEnteredValue': {'numberValue': v}}
def ev():  return {'userEnteredValue': {'stringValue': ''}}

# Cover_Page values (matching template layout)
cover_values = [
    # row 0: NUS Technology
    ['NUS Technology'],
    # rows 1-8: empty
    [], [], [], [], [], [], [], [],
    # row 9: title
    ['FastAPI Training Plan'],
    # row 10: Created by
    ['Created by:', 'NUS Technology'],
    # row 11: Effective date
    ['Effective date:', '2024'],
    # row 12: Version
    ['Version:', '1.0'],
    # rows 13-25: empty
]

# Document_Control values
doc_values = [
    [],  # row 0
    ['Document Control'],  # row 1
    ['Version', 'Change description', 'Changed by', 'Date'],  # row 2
    ['1.0', 'Creation', 'NUS Technology', '2024'],  # row 3
]

# Content values - FastAPI training plan
# Columns: No, Training Contents, Objectives, Method, Trainer/Mentor, Trainee, Required?, Expected Training Period, Duration (h), Reference/Materials, Notes
content_rows = [
    # row 0: empty
    [],
    # row 1: title
    ['FastAPI Training Plan'],
    # row 2: total row
    ['', '', '', '', '', '', '', 'Total (hour)', '61'],
    # row 3: headers
    ['No', 'Training Contents', 'Objectives', 'Method', 'Trainer / Mentor', 'Trainee', 'Required?', 'Expected Training Period', 'Duration (h)', 'Reference / Materials', 'Notes'],
    # row 4: section 1
    ['1', 'Python', '', '', '', '', '', '', '', '', ''],
    # row 5: 1.1
    ['1.1', 'Python version manager with pyenv', '- Commands: pyenv install, pyenv versions, pyenv local\n- Use .python-version to define specific python version', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '4', 'https://github.com/pyenv/pyenv', ''],
    # row 6: 1.2
    ['1.2', 'Python language essentials', '- Data types, control flow, functions\n- List/dict/set comprehensions\n- Decorators, generators, context managers', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '4', 'https://docs.python.org/3/', ''],
    # row 7: 1.3
    ['1.3', 'pip and virtual environments', '- pip install, requirements.txt\n- venv, virtualenv', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '3', 'https://pip.pypa.io/', ''],
    # row 8: section 2
    ['2', 'FastAPI', '', '', '', '', '', '', '', '', ''],
    # row 9: 2.1
    ['2.1', 'Introduction to FastAPI', '- What is FastAPI\n- Installation\n- First application\n- Interactive docs (Swagger UI & ReDoc)', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '4', 'https://fastapi.tiangolo.com/', ''],
    # row 10: 2.2
    ['2.2', 'Path Operations & Routing', '- Path parameters\n- Query parameters\n- Request body\n- Multiple parameters', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '4', 'https://fastapi.tiangolo.com/tutorial/path-params/', ''],
    # row 11: 2.3
    ['2.3', 'Pydantic Models & Data Validation', '- BaseModel\n- Field validation\n- Nested models\n- Custom validators', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '6', 'https://docs.pydantic.dev/', ''],
    # row 12: 2.4
    ['2.4', 'Request Body & Form Data', '- JSON body\n- Form fields\n- File uploads\n- Request object', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '4', 'https://fastapi.tiangolo.com/tutorial/request-forms/', ''],
    # row 13: 2.5
    ['2.5', 'Response Models & Status Codes', '- response_model\n- Status codes\n- Additional responses\n- Response headers', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '4', 'https://fastapi.tiangolo.com/tutorial/response-model/', ''],
    # row 14: 2.6
    ['2.6', 'Dependency Injection', '- Depends()\n- Sub-dependencies\n- Global dependencies\n- Database sessions', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '5', 'https://fastapi.tiangolo.com/tutorial/dependencies/', ''],
    # row 15: 2.7
    ['2.7', 'Database Integration with SQLAlchemy', '- SQLAlchemy setup\n- Models and schemas\n- CRUD operations\n- Migrations with Alembic', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '8', 'https://fastapi.tiangolo.com/tutorial/sql-databases/', ''],
    # row 16: 2.8
    ['2.8', 'Authentication & Security', '- OAuth2 with Password flow\n- JWT tokens\n- Password hashing\n- Scopes', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '6', 'https://fastapi.tiangolo.com/tutorial/security/', ''],
    # row 17: 2.9
    ['2.9', 'Middleware', '- CORS middleware\n- Custom middleware\n- Trusted host middleware', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '3', 'https://fastapi.tiangolo.com/tutorial/middleware/', ''],
    # row 18: 2.10
    ['2.10', 'Async/Await', '- Async path operations\n- Async with databases\n- Concurrency vs parallelism', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '3', 'https://fastapi.tiangolo.com/async/', ''],
    # row 19: 2.11
    ['2.11', 'Background Tasks', '- BackgroundTasks\n- Task queues with Celery', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'Yes', 'N/A', '2', 'https://fastapi.tiangolo.com/tutorial/background-tasks/', ''],
    # row 20: 2.12
    ['2.12', 'Testing', '- TestClient\n- pytest fixtures\n- Testing async endpoints', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'No', 'N/A', '', 'https://fastapi.tiangolo.com/tutorial/testing/', ''],
    # row 21: 2.13
    ['2.13', 'Deployment', '- Uvicorn & Gunicorn\n- Docker\n- Environment variables\n- HTTPS', 'Self-training and Mentoring', 'Technical Advisor', 'New member', 'No', 'N/A', '', 'https://fastapi.tiangolo.com/deployment/', ''],
]

# Write Cover_Page values
cover_body = []
for r in cover_values:
    cover_body.append({'values': [sv(c) if c else ev() for c in r] if r else []})

# Write Document_Control values
doc_body = []
for r in doc_values:
    doc_body.append({'values': [sv(c) if c else ev() for c in r] if r else []})

# Write Content values
cont_body = []
for r in content_rows:
    if not r:
        cont_body.append({'values': []})
    else:
        row_cells = []
        for c in r:
            row_cells.append(sv(c) if c else ev())
        cont_body.append({'values': row_cells})

print("Writing values...")
sheets.values().batchUpdate(
    spreadsheetId=TARGET_ID,
    body={'valueInputOption': 'RAW', 'data': [
        {'range': 'Cover_Page!A1', 'values': [[r[0] if r else ''] for r in cover_values]},
        {'range': 'Cover_Page!B11', 'values': [['NUS Technology']]},
        {'range': 'Cover_Page!B12', 'values': [['2024']]},
        {'range': 'Cover_Page!B13', 'values': [['1.0']]},
        {'range': 'Cover_Page!A11', 'values': [['Created by:']]},
        {'range': 'Cover_Page!A12', 'values': [['Effective date:']]},
        {'range': 'Cover_Page!A13', 'values': [['Version:']]},
    ]}
).execute()

# Write all content values at once using updateCells
requests = []

# Clear all 3 sheets first
requests.append({'updateCells': {
    'range': {'sheetId': cover_id, 'startRowIndex': 0, 'startColumnIndex': 0},
    'fields': 'userEnteredValue'
}})
requests.append({'updateCells': {
    'range': {'sheetId': doc_id, 'startRowIndex': 0, 'startColumnIndex': 0},
    'fields': 'userEnteredValue'
}})
requests.append({'updateCells': {
    'range': {'sheetId': cont_id, 'startRowIndex': 0, 'startColumnIndex': 0},
    'fields': 'userEnteredValue'
}})

# Write Cover_Page cells
cover_data = [
    [sv('NUS Technology')],                    # row 0
    [], [], [], [], [], [], [], [],             # rows 1-8
    [sv('FastAPI Training Plan')],             # row 9
    [sv('Created by:'), sv('NUS Technology')], # row 10
    [sv('Effective date:'), sv('2024')],       # row 11
    [sv('Version:'), sv('1.0')],              # row 12
    [sv('This document contains confidential and proprietary information which may not be disclosed without prior written consent from NUS Technology JSC.')],  # row 13(ish in template at row 26)
]
requests.append({'updateCells': {
    'range': {'sheetId': cover_id, 'startRowIndex': 0, 'startColumnIndex': 0},
    'rows': [{'values': row} if row else {} for row in cover_data],
    'fields': 'userEnteredValue'
}})

# Write Document_Control cells
doc_data = [
    {},                                                           # row 0 empty
    {'values': [sv('Document Control')]},                        # row 1
    {'values': [sv('Version'), sv('Change description'), sv('Changed by'), sv('Date')]},  # row 2
    {'values': [sv('1.0'), sv('Creation'), sv('NUS Technology'), sv('2024')]},             # row 3
]
requests.append({'updateCells': {
    'range': {'sheetId': doc_id, 'startRowIndex': 0, 'startColumnIndex': 0},
    'rows': doc_data,
    'fields': 'userEnteredValue'
}})

# Write Content cells
cont_data = []
for r in content_rows:
    if not r:
        cont_data.append({})
    else:
        cont_data.append({'values': [sv(c) for c in r]})
requests.append({'updateCells': {
    'range': {'sheetId': cont_id, 'startRowIndex': 0, 'startColumnIndex': 0},
    'rows': cont_data,
    'fields': 'userEnteredValue'
}})

print("Writing cells...")
sheets.batchUpdate(spreadsheetId=TARGET_ID, body={'requests': requests}).execute()

# ── Step 2: set column widths ────────────────────────────────────────────────

fmt_reqs = []

# Unfreeze all sheets
fmt_reqs += [unfreeze(cover_id), unfreeze(doc_id), unfreeze(cont_id)]

# Cover_Page column widths (from template)
for ci, px in [(0,117),(1,126),(2,281),(3,169),(4,190),(5,251)]:
    fmt_reqs.append(col_width(cover_id, ci, px))

# Document_Control column widths
for ci, px in [(0,78),(1,687),(2,226),(3,200)]:
    fmt_reqs.append(col_width(doc_id, ci, px))

# Content column widths (from template)
for ci, px in [(0,55),(1,203),(2,347),(3,91),(4,91),(5,91),(6,82),(7,95),(8,91),(9,625),(10,397)]:
    fmt_reqs.append(col_width(cont_id, ci, px))

# ── Step 3: row heights ──────────────────────────────────────────────────────

# Cover_Page: 17px per row (rows 0-30)
fmt_reqs.append(rows_height(cover_id, 0, 30, 17))
# Document_Control: default 21px (no change)
# Content: 16px per row (rows 0-35)
fmt_reqs.append(rows_height(cont_id, 0, 35, 16))

# ── Step 4: apply formatting ──────────────────────────────────────────────────

# --- Cover_Page ---
# Row 0: NUS Technology — size=20, va=MIDDLE, OVERFLOW_CELL
fmt_reqs.append(repeat_cell(cover_id, 0, 0, 1, 26,
    cell_fmt(size=20, va='MIDDLE')))
# Row 9: Title — size=32, fg=NAVY, va=MIDDLE, NOT bold, OVERFLOW_CELL
fmt_reqs.append(repeat_cell(cover_id, 9, 0, 10, 26,
    cell_fmt(fg=NAVY, size=32, va='MIDDLE')))
# Row 10: Created by label — BOLD, size=9, va=TOP
fmt_reqs.append(repeat_cell(cover_id, 10, 0, 11, 1,
    cell_fmt(bold=True, size=9, va='TOP')))
# Row 10: value — va=MIDDLE
fmt_reqs.append(repeat_cell(cover_id, 10, 1, 11, 6,
    cell_fmt(va='MIDDLE')))
# Row 11: Effective date label — BOLD, size=9, va=MIDDLE
fmt_reqs.append(repeat_cell(cover_id, 11, 0, 12, 1,
    cell_fmt(bold=True, size=9, va='MIDDLE')))
# Row 11: value — va=MIDDLE
fmt_reqs.append(repeat_cell(cover_id, 11, 1, 12, 6,
    cell_fmt(va='MIDDLE')))
# Row 12: Version label — BOLD, size=9, va=TOP
fmt_reqs.append(repeat_cell(cover_id, 12, 0, 13, 1,
    cell_fmt(bold=True, size=9, va='TOP')))
# Row 12: value — va=MIDDLE
fmt_reqs.append(repeat_cell(cover_id, 12, 1, 13, 6,
    cell_fmt(va='MIDDLE')))

# --- Document_Control ---
# Row 1: "Document Control" title — fg=NAVY, size=15, va=TOP
fmt_reqs.append(repeat_cell(doc_id, 1, 0, 2, 1,
    cell_fmt(fg=NAVY, size=15, va='TOP')))
# Row 2: header — bg=NAVY, fg=WHITE, BOLD, va=TOP (OVERFLOW_CELL default)
fmt_reqs.append(repeat_cell(doc_id, 2, 0, 3, 4,
    cell_fmt(bg=NAVY, fg=WHITE, bold=True, va='TOP')))
# Row 3: data — size=11, va=TOP, WRAP
fmt_reqs.append(repeat_cell(doc_id, 3, 0, 4, 4,
    cell_fmt(size=11, va='TOP', wrap='WRAP')))

# --- Content ---
# All content cells default: size=10, LEFT, TOP, WRAP
fmt_reqs.append(repeat_cell(cont_id, 0, 0, 35, 11,
    cell_fmt(va='TOP', wrap='WRAP')))

# Row 1: title — size=16, fg=NAVY, va=TOP, NOT bold, OVERFLOW_CELL
fmt_reqs.append(repeat_cell(cont_id, 1, 0, 2, 1,
    cell_fmt(fg=NAVY, size=16, va='TOP', wrap='OVERFLOW_CELL')))

# Row 2 col H(7) & I(8): Total (hour) — bg=NAVY, fg=WHITE, BOLD, va=TOP, WRAP
fmt_reqs.append(repeat_cell(cont_id, 2, 7, 3, 9,
    cell_fmt(bg=NAVY, fg=WHITE, bold=True, va='TOP', wrap='WRAP')))

# Row 3: header — bg=NAVY, fg=WHITE, BOLD, va=TOP, WRAP
fmt_reqs.append(repeat_cell(cont_id, 3, 0, 4, 11,
    cell_fmt(bg=NAVY, fg=WHITE, bold=True, va='TOP', wrap='WRAP')))

# Row 4: section "1 Python" — bg=INDIGO, fg=WHITE, BOLD, va=TOP, WRAP, all cols
fmt_reqs.append(repeat_cell(cont_id, 4, 0, 5, 11,
    cell_fmt(bg=INDIGO, fg=WHITE, bold=True, va='TOP', wrap='WRAP')))
# Row 4 col 0: ha=RIGHT
fmt_reqs.append(repeat_cell(cont_id, 4, 0, 5, 1,
    cell_fmt(bg=INDIGO, fg=WHITE, bold=True, ha='RIGHT', va='TOP', wrap='WRAP')))

# Rows 5-7: data rows col 0 (1.1, 1.2, 1.3) — ha=RIGHT
for ri in [5, 6, 7]:
    fmt_reqs.append(repeat_cell(cont_id, ri, 0, ri+1, 1,
        cell_fmt(ha='RIGHT', va='TOP', wrap='WRAP')))

# Row 8: section "2 FastAPI" — bg=INDIGO, fg=WHITE, BOLD
fmt_reqs.append(repeat_cell(cont_id, 8, 0, 9, 11,
    cell_fmt(bg=INDIGO, fg=WHITE, bold=True, va='TOP', wrap='WRAP')))
fmt_reqs.append(repeat_cell(cont_id, 8, 0, 9, 1,
    cell_fmt(bg=INDIGO, fg=WHITE, bold=True, ha='RIGHT', va='TOP', wrap='WRAP')))

# Rows 9-21: data rows col 0 (2.1-2.13) — ha=RIGHT
for ri in range(9, 22):
    fmt_reqs.append(repeat_cell(cont_id, ri, 0, ri+1, 1,
        cell_fmt(ha='RIGHT', va='TOP', wrap='WRAP')))

print(f"Applying {len(fmt_reqs)} format requests...")
sheets.batchUpdate(spreadsheetId=TARGET_ID, body={'requests': fmt_reqs}).execute()
print("Done! All formatting applied.")
print(f"View at: https://docs.google.com/spreadsheets/d/{TARGET_ID}/edit")
