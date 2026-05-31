---
description: "UTIL — Write a task log entry to the Paturevision Google Sheets weekly task log"
---

# Util: Task Log Write

Write a monitoring task entry into the current week's Google Sheets task log.

## Config

- **Spreadsheet:** `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg` (Paturevision / Est vs Charged)
- **Service account:** `config/daily-agent-490610-7eb7985b33e3.json`

## Steps

### 1 — Find the correct week sheet (W{N})

Iterate sheet tabs. For each W-sheet, read cell A4 (Monday date, e.g. `Mon, 16/03/26`). Find the sheet whose week contains today.

### 2 — Find today's date row

Search column A for today's date string, e.g. `Fri, 30/05/26` (day-of-week + DD/MM/YY).

### 3 — Find first empty row after today

Scan rows after the date row: find the first row where col A = `Task dự án` AND cols C–J are empty.  
**Never overwrite an existing row.**

### 4 — Write the entry

```python
# Column layout (0-indexed: A=0, B=1 ... J=9)
row_values = [
    "Task dự án",  # A — task type
    "",            # B
    "",            # C
    "",            # D
    task_name,     # E — e.g. "Weekly Monitor May 2026" or "Bailey Monitor May 2026"
    "",            # F
    "DuongDN",     # G — owner
    "1",           # H — hours
    "",            # I
    "1",           # J — charged hours
]

# API call
service.spreadsheets().values().update(
    spreadsheetId=SHEET_ID,
    range=f"{sheet_name}!A{row}:J{row}",
    valueInputOption="USER_ENTERED",
    body={"values": [row_values]}
).execute()
```

## Task Name Format

| Skill | Task name |
|-------|-----------|
| `bailey-monitor` | `Weekly Monitor {Month} {Year}` — e.g. `Weekly Monitor May 2026` |
| `server-monitor` | `Server Monitor {Month} {Year}` |

## Reference

See W18 row 70 of the spreadsheet for a live example of the expected format.
