---
name: feedback_sheets_wrong_tab_numbering
description: Sheet tab W29 does NOT mean calendar week 29 — each project has its own week counter. MUST find the tab containing the actual target date, not assume tab name = calendar week.
metadata:
  type: feedback
---

# Sheet Tab Numbering ≠ Calendar Week

## Rule

**Never assume W29 tab = week of Jun 1–7.** Each project sheet started its own W1 counter independently. W29 in Rory sheet = June 1 week. W27 in Franc sheet = June 15 week. W43 in Generator = June 1 week.

## How to find the correct tab

Scan week tabs (those starting with "W") for the one whose first date row contains the target date:

```python
for tab in week_tabs:
    result = sheets.values().get(spreadsheetId=sid, range=f"'{tab}'!A1:A5").execute()
    for row in result.get('values', []):
        if '01/06' in row[0]:  # target date
            return tab  # this is the right tab
```

**Do NOT use the last tab or a hardcoded tab name like W29.**

## Real example (2026-06-02 incident)

Sheets agent reported LeNH and KhanhHH as 0h Mon Jun 1 because it looked at W29:
- LeNH-Rory W29 = future week (different date), no Jun 1 entries
- KhanhHH W29 = Feb 2026 dates, no Jun 1 entries

Correct tabs:
- LeNH: Rory **W14** contains Mon 01/06/26 → 7.67h ✓
- KhanhHH: Generator **W43** contains Mon 01/06/26 → 4.83h ✓

User caught the false 0h report and false reminders were almost sent.

**Why:** User feedback 2026-06-02: "Check lại, thấy có task log LeNH và KhanhHH"

Related: [[feedback_sheets_subagent_unreliable]]
