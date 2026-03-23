---
description: Generate daily report checklist with status tracking
---

# Daily Report Checklist

Generate a daily report checklist for today's date. Read the checklist config from `./daily-checklist.md` to get the checklist items.

## Instructions

1. Read the checklist items from `./daily-checklist.md`
2. Create a daily report file at `./reports/{YYYY-MM-DD}/daily-report.md` (use today's date)
3. For each checklist item, ask the user for status and notes using `AskUserQuestion`
4. Write the report with:
   - Date and timestamp
   - Each checklist item with status (done/pending/skipped) and notes
   - Summary section at the bottom

## Report Format

```markdown
# Daily Report - {date}

## Checklist

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Item name | done/pending/skipped | User notes |

## Summary
- Completed: X/Y items
- Pending items and next steps
```

## Behavior
- If today's report already exists, read it and ask user if they want to update it
- Keep reports concise and actionable
- If user provides arguments like `$ARGUMENTS`, use them as additional context
