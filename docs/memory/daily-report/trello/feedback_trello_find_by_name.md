---
name: Trello cards are recurring - find by name not ID
description: Check mail and Check progress Trello cards are recurring (new card daily), must search by name not hardcoded ID
type: feedback
---

Trello "Check mail" and "Check progress" cards are recurring — new card created each day with same name. Never hardcode card IDs. Always search the board for cards by name.
**Why:** User corrected: "this is repeated card, my original requirement is card with name 'Check mail' and 'Check progress', not find by id"
**How to apply:** Before completing Trello checklist items, search board cards by name (`GET /boards/{id}/cards?fields=name,id`) and find the matching card. Then get its checklists dynamically.
