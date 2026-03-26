---
name: feedback_ignore_checklist_item_name
description: Never interpret Trello checklist item text/name as status — completion based only on monitoring alerts found
type: feedback
---

Never consider Trello checklist item name/text when deciding whether to complete it. The item name is just a label (e.g., "performance issue (pending)" is a description, not a blocker).

**Why:** User corrected multiple times — item names like "pending" or "performance issue" are not indicators of status. Only actual alerts found during monitoring determine completion.

**How to apply:** When processing Trello checklist items, ignore the text content entirely for completion decisions. Only check: did monitoring find a real alert for this project/person in the current window? If no alert → complete. If alert found → don't complete.
