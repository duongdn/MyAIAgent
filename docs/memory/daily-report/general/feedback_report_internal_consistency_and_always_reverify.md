---
name: feedback_report_internal_consistency_and_always_reverify
description: Report sections must stay internally consistent after corrections, and "already checked recently" is never a reason to skip a re-verification the user explicitly asked for
metadata:
  type: feedback
---

Two compounding failures, both repeat complaints ("I said many times... you keep wrong", 2026-07-10):

**1. Report sections go stale relative to each other after a correction.** When a fact changes mid-report (e.g. an email auth issue gets fixed at 09:14), EVERY section referencing that fact must be updated, not just the section where the fix happened. Found 2026-07-10: the Email section said "all 5 Zoho accounts fixed, Check Mail card fully done" but the Trello summary section 200 lines later still said "Check Mail: 1/6 complete... Carrick/Nick/Rick/Kai/Ken incomplete" — never touched after the fix. Same for a Trello count (8/22) that didn't reflect an item (Blair Brown) the user had already checked off directly in Trello. **How to apply:** after any correction, grep the CURRENT report file for every other mention of the same item/count/status and update all of them, don't just patch the one paragraph you're editing. Before finishing any recheck, pull the live source of truth (e.g. Trello API) and diff it against what the report claims, rather than trusting the report's own prior counts.

**2. "I already checked that within the last hour" is not an acceptable reason to skip a re-verification when the user asks again.** On 2026-07-10 a recheck pass explicitly said "not re-verified this pass... skipped to stay focused... no reason to assume they've changed in ~1hr" for ~8 items — user immediately pushed back. Even if unlikely to have changed, the user asking again means do the check again for real (fresh API calls, not memory of the last check) and report the actual current state, even if the answer is "unchanged, confirmed live." Silence/deferral reads as laziness, not efficiency.

**Why:** this project runs unattended monitoring the user trusts to catch real problems — a report that contradicts itself or silently skips re-verification erodes that trust exactly the way [[feedback_never_report_token_expired]] describes for auth failures. Same principle, broader scope: don't let "already handled" become an excuse not to actually re-handle it.

**How to apply:** every recheck (Piece 11), no matter how recently a previous pass ran:
1. Pull live ground truth for the gating system itself (Trello checklist state via API) before writing any "X/Y complete" number — don't reuse the last report's count.
2. For every ○ item, actually re-run its check (fresh Slack search, fresh Workstream pull, live curl for CSP headers, etc.) — never write "unchanged since last check" without having actually re-queried this pass.
3. After writing any correction, search the rest of the CURRENT file for other stale references to the same fact and fix them too, using strikethrough+correction per [[feedback_strikethrough_corrections]], not silent edits.
4. If a check is genuinely fragile (e.g. MS Teams Philip UI automation with 8+ duplicate contacts), it's fine to report "tried again, still fails, here's why" — that's real re-verification. It is NOT fine to skip trying at all because it failed before.

See also [[feedback_recheck_must_fill_missing_data]] (recheck must fill missing DATA, not just Trello) — this memory extends that to: recheck must also fix stale CROSS-REFERENCES and must actually re-run checks rather than assume nothing changed.
