#!/usr/bin/env python3
"""Extract Fountain W27 actuals from Summary tab.
Col mapping: VuTQ(H-K=8-11), ThinhT(L-O=12-15), ViTHT(P-S=16-19), PhatDLT(T-W=20-23), HungPN(X-Y=24-25).
Also check HaVS — scan header rows for name.
"""
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

SVC = "/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json"
FOUNTAIN_ID = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o"

creds = service_account.Credentials.from_service_account_file(
    SVC, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
)
svc = build("sheets", "v4", credentials=creds, cache_discovery=False)

def fetch(sheet_id, rng):
    try:
        resp = svc.spreadsheets().values().get(
            spreadsheetId=sheet_id, range=rng
        ).execute()
        return resp.get("values", [])
    except Exception as e:
        return [["ERROR: " + str(e)]]

def parse_hours(val):
    if not val or str(val).strip() in ("", "-", "—", "#DIV/0!"):
        return 0.0
    s = str(val).strip().replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return 0.0

# Fetch Summary tab wide enough to catch all devs
rows = fetch(FOUNTAIN_ID, "Summary!A:AH")

# Find header rows (row with dev names) and W27 data row
header_row = None
names_row = None
w27_row = None

for i, row in enumerate(rows):
    row_str = str(row)
    if "VuTQ" in row_str or "ThinhT" in row_str or "ViTHT" in row_str:
        names_row = (i, row)
    if "Week" in row_str and "Actual" in row_str:
        header_row = (i, row)
    if row and str(row[0]).strip() == "W27":
        w27_row = (i, row)

print("=== Header row (labels) ===")
if header_row:
    print(f"  row {header_row[0]}: {header_row[1]}")

print("\n=== Names row ===")
if names_row:
    print(f"  row {names_row[0]}: {names_row[1]}")

print("\n=== W27 row ===")
if w27_row:
    print(f"  row {w27_row[0]}: {w27_row[1]}")

# Also check W26 for comparison
w26_row = None
for i, row in enumerate(rows):
    if row and str(row[0]).strip() == "W26":
        w26_row = (i, row)

print("\n=== W26 row (for comparison) ===")
if w26_row:
    print(f"  row {w26_row[0]}: {w26_row[1]}")

# Build col index map from names row
col_map = {}
if names_row:
    for ci, cell in enumerate(names_row[1]):
        name = str(cell).strip()
        if name and name not in ("", "VuTQ", "ThinhT", "ViTHT", "PhatDLT", "HungPN"):
            # New name
            pass
        if name in ("VuTQ", "ThinhT", "ViTHT", "PhatDLT", "HungPN", "HaVS", "TrinhMTT"):
            if name not in col_map:
                col_map[name] = []
            col_map[name].append(ci)

print("\n=== Col map (name → col indices) ===")
print(json.dumps(col_map, indent=2))

# Extract W27 actuals per dev (first col = Actual)
if w27_row and names_row:
    w27_data = w27_row[1]
    print("\n=== W27 Actuals per dev ===")
    for dev, cols in col_map.items():
        actual_col = cols[0]  # First col per dev group = Actual
        val = w27_data[actual_col] if actual_col < len(w27_data) else "N/A"
        hrs = parse_hours(val)
        print(f"  {dev}: {hrs}h (raw={val!r}, col={actual_col})")

    # Also show full W27 row with col labels
    print("\n=== W27 full row with col index ===")
    for ci, val in enumerate(w27_data):
        if val and val not in ("", "0", "0.00", "#DIV/0!", "0.00%"):
            print(f"  col {ci}: {val!r}")
