---
name: feedback_sheets_wrong_tab_numbering
description: Tab W{n} ≠ calendar week n. ALWAYS use the Summary tab to find the correct week tab — never scan individual W tabs or hardcode tab names.
metadata:
  type: feedback
---

# Sheet Tab Numbering ≠ Calendar Week — USE SUMMARY TAB

## Rule (repeated correction — this has failed multiple times)

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

Summary tab structure:
- Col A = week label (W1, W2…)
- Col B = start date
- Col C = end date
- Col D = total actual hours

## Why this keeps failing

Each project started its own W1 counter independently:
- LeNH-Rory W14 = week of Jun 1
- LeNH-Franc W27 = week of Jun 15 (NOT Jun 1!)
- KhanhHH-Generator W43 = week of Jun 1

Using W29 for all sheets returns wrong weeks → false 0h → false reminders.

## Incident 2026-06-02

Agent looked at W29 for all sheets → reported LeNH + KhanhHH as 0h Mon Jun 1.
Correct: LeNH 7.67h (Rory W14), KhanhHH 4.83h (Generator W43).
User: "Check lại, thấy có task log LeNH và KhanhHH" — caught before false reminders sent.

Related: [[feedback_tasklog_summary_sheet]], [[feedback_sheets_subagent_unreliable]]
