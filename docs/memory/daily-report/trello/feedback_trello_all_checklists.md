---
name: feedback_trello_all_checklists
description: Trello Check Progress card has MULTIPLE checklists (Normal, Should do, closely monitor, Work, Pending) — must iterate ALL, not just known ones
type: feedback
---

The "Check Progress" Trello card has MULTIPLE checklists with different names (Normal, Should do, closely montor, Work, Pending). Each contains different checklist items.

**Why:** Daily report agent only completed items from known checklists and missed "Elena - WordPress SamGuard" in the "Pending" checklist. User very frustrated — "what the hell ??? why you forget how to completed checklist."

**How to apply:** When completing Trello checklist items, ALWAYS:
1. Fetch ALL checklists on the card (not just hardcoded ones)
2. Iterate every checkItem across every checklist
3. For each unchecked item, determine if alerts exist for that person/project
4. If no alerts → complete it
5. Same project can appear in multiple items (e.g. "Elena - SamGuard Digital Plant" in Work AND "Elena - WordPress SamGuard" in Pending)
