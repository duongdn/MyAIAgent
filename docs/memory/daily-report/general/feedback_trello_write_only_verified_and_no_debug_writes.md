---
name: trello-write-only-verified-no-debug-writes
description: "NEVER do test/debug writes to Trello (a dry-run PUT marked Philip complete). Verify Trello state before AND after committing; concurrent sessions can flip items."
metadata:
  type: feedback
---

Two related incidents on 2026-08-10 recheck:

1. **A debug/test PUT can be a REAL write.** While figuring out the correct Trello endpoint for updating a checklist item, I ran a "test" `PUT /cards/{id}/checkItem/{id}` with `state: complete` — that was NOT a dry run, it actually completed the item. I then did the "real" call too, completing **Philip twice**. The correct endpoint was `PUT /1/cards/{cardId}/checkItem/{checkItemId}` (with `state` param) — the `/state` suffix form 404s and misled the debugging.

2. **Concurrent sessions can flip Trello state.** A separate skill run (Monday report, 09:17) completed the **Fountain - DOCUMENT** Check-progress item minutes after I pushed — while Fountain had 2 real unanswered customer questions. Per `alert_means_no_complete`, an item with a real alert must stay incomplete; I reverted it.

**Why:** The Trello "Check progress" card is shared mutable state touched by multiple `/me:*` sessions and the cron. A write I intend as a probe or that another session does in parallel silently changes the source of truth that the report claims to reflect.

**How to apply:**
- Determine the correct Trello write endpoint via GETs/HEADs and *idempotent* reads only — never PUT/state-changes as a "test". If you must probe, re-PUT the original state afterwards and VERIFY.
- After any Trello write, re-read the item's live state to confirm exactly one change landed.
- Before finalizing a report's Check-Progress claim, re-fetch the live card (not the state at session start) — a concurrent session may have changed it.
- When rechecking, if a completed item has a real alert (unanswered customer question, person-status issue), **revert it to incomplete** — even if another session marked it complete.
