---
name: Trello checklist items are tied to responsible people
description: Check progress checklist items name the responsible person — their daily report status determines if the item can be completed
type: feedback
---

"Check progress" Trello checklist items follow the pattern: "Project Name - Person task - notes". The person named is responsible for that project.

Daily report check results directly gate checklist completion:
- "James Diamond - Vinn task" → Vinn's daily report must PASS to complete
- If person's daily report FAILED → project item stays incomplete

**Why:** User corrected when James Diamond was marked complete despite Vinn having a FAILED daily report.
**How to apply:** Parse the person's name from the checklist item. Cross-reference with daily report check results.
