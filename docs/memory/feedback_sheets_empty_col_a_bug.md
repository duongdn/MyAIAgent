---
name: feedback_sheets_empty_col_a_bug
description: Task log rows with empty col A are skipped by extractDailyHoursByOwner — must also count rows where col A is blank but col G (owner) has a value
metadata:
  type: feedback
---

In `extractDailyHoursByOwner` (all daily-sheets-scan scripts), the filter `!rowAL.includes("task dự án")` skips rows where col A is empty. Devs sometimes omit "Task dự án" in col A on continuation rows.

**Why:** KhanhHH Jun 9 2026: rows [34] and [35] had empty col A — 0.5h + 3h = 3.5h missed, reported 4.5h instead of 8h.

**How to apply:** When writing or copying daily-sheets-scan scripts, always use this pattern:
```javascript
const isTaskRow = rowAL.includes("task dự án") || rowAL.includes("task du an");
const owner = row[6] ? String(row[6]).trim() : "";
if (!isTaskRow && !(rowA === "" && owner)) continue;
```
Never use the old single-line filter that only checks col A text.
