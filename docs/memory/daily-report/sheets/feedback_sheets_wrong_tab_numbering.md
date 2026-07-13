---
name: feedback_sheets_wrong_tab_numbering
description: "Tab W{n} ≠ calendar week n. ALWAYS use the Summary tab to find the correct week tab — never scan individual W tabs or hardcode tab names."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c5a8413a-3fa2-4280-8d09-e11f71ae470d
---

# Sheet Tab Numbering ≠ Calendar Week — USE SUMMARY TAB

## Rule (repeated correction — failed multiple times)

**ALWAYS read the Summary tab first** to find which W{n} tab corresponds to the target week. Never scan individual tabs. Never hardcode a tab name.

## Correct method

```python
# Step 1: Read Summary tab → find row where start date matches target week
summary = sheets.values().get(spreadsheetId=sid, range="'Summary'!A1:D60").execute().get('values', [])
for row in summary:
    if len(row) >= 2 and '01/06' in str(row[1]):  # col B = start date
        tab = row[0]  # e.g. "W14"
        break

# Step 2: Read that tab for the dev's hours
```

Summary tab structure: Col A = week label | Col B = start date | Col C = end date | Col D = total hours

## Why this fails without Summary tab

Each project started its own W1 counter independently — W29 means different real-world weeks in different sheets. Only the Summary tab gives the authoritative mapping.

## Incident 2026-06-02

Used W29 for all sheets → false 0h for LeNH + KhanhHH → almost sent false reminders.
Correct: LeNH 7.67h (Rory W14), KhanhHH 4.83h (Generator W43).
User correction (3rd+ time): "Check lại, thấy có task log LeNH và KhanhHH"

Related: [[feedback_tasklog_summary_sheet]]
