---
name: Alert found = do NOT complete Trello item
description: If ANY alert is found during monitoring (including failed daily reports), do NOT mark the Trello checklist item as complete
type: feedback
---

Alerts include but are not limited to:
- Failed daily report check for the person responsible for that project
- Redmine bugs flagged on the checklist item itself
- Task log hours missing or under minimum
- Any monitoring source showing issues

**Critical rule:** "Check progress" checklist items are tied to people. If a person's daily report is FAILED, their project checklist item CANNOT be completed. E.g., "James Diamond - Vinn task" stays incomplete if Vinn's daily report is FAILED.

**Why:** User corrected multiple times.
**How to apply:** Before marking ANY checklist item complete: (1) check ALL alert sources, (2) check if the person named in the item has a passing daily report, (3) read the checklist item name for embedded warnings. If ANY alert → leave incomplete.
