---
name: Complete Trello Check Mail after email check
description: After checking all email accounts, MUST complete all 6 "Check mail" Trello checklist items before finishing
type: feedback
---

After checking all 6 email accounts, always complete the Trello "Check mail" card checklist items — one item per account.

**Why:** The email check is not considered done until the Trello items are ticked off. This was missed.

**How to apply:**
- Find "Check mail" card by name on board `O83pAyqb`
- Get its checklist items
- Mark ALL items complete: `PUT /cards/{card_id}/checkItem/{item_id}?state=complete&key=...&token=...`
- Do this at the end of the email piece, before moving on
