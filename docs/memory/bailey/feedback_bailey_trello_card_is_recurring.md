---
name: feedback_bailey_trello_card_is_recurring
description: Bailey monitor Trello card is recurring (new card each period) like Check progress/Check mail — never hardcode the card ID from the skill file
metadata:
  type: feedback
---

The `me:bailey-monitor` skill file hardcodes card ID `6a221fe400d53ea9a87d45e5` — this card was archived (`closed: true`) since 2026-06-05. It is a STALE past instance. Bailey monitor cards are recurring (same as "Check progress"/"Check mail"): a new card named "Bailey monitor" is created each period on the same list (`idList: 686b1f67e6b82c615ce4762c`, board `600f70357e50d95baba326b7` "My Task").

**Why:** Multiple weekly runs (05/06 through 03/07) kept writing checklists into the archived stale card, invisible to the user on the board. User had to point out "not that card" before the real, currently-open card (`dueComplete:false`, no checklist) was found via board search.

**How to apply:**
- Before completing the Bailey monitor Trello checklist, search for the card by name and open state, do NOT use the hardcoded ID:
  `GET /1/search?query=Bailey&idBoards=mine&modelTypes=cards&card_fields=name,closed,dueComplete` — pick the one with `closed:false`.
  Or restrict to the known list: `GET /1/lists/686b1f67e6b82c615ce4762c/cards?fields=name,closed,dueComplete`.
- If accidentally acting on a closed/archived card, don't "fix" it by unarchiving — that's the wrong card, just find the right one and leave the stale one as-is.

[[feedback_trello_find_by_name]]
