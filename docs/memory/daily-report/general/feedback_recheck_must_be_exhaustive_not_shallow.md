---
name: feedback_recheck_must_be_exhaustive_not_shallow
description: "User hard rule 2026-09-11, repeated after a long back-and-forth of real misses: a recheck must cover EVERYTHING (every piece, every gate's full requirement, cross-system day-by-day completeness), not just chase Trello ○ items with the shallowest check that clears them"
metadata:
  type: feedback
---

User's exact words after a single 2026-09-11 recheck session found, one after another: Workstream SSO needing retry, a script bug producing a false LeNH 0h alert, a skipped mandatory Maddy 4-part check (which found a real 3-month-unanswered High-severity PR comment), a skipped Upwork Memo piece, a false-negative Upwork memo check, an unverified Upwork-vs-Workstream weekly total gap, and a genuinely missing Wednesday task-log entry for KhanhHH — "yêu cầu recheck lần sau phải check đầy đủ các thứ" (next time, recheck must check everything fully).

**This is now the operating standard for Piece 11, above and beyond what's written into the skill file's Step 3 gate-mapping table.** The gate-mapping table is a MINIMUM, not a ceiling — see [[feedback_maddy_consolidated]] for how a piece's Trello gate can be shallower than its actual required depth.

**How to apply, every recheck, no exceptions:**
1. **Retry auth/session sources first, unconditionally** — see [[feedback_recheck_must_always_retry_workstream_first]].
2. **For any piece with a documented "full check" requirement beyond its Trello gate** (Maddy's 4-part, Fountain's 5-part, Arthur's 6-source), run the FULL requirement during recheck, not the shortcut gate check — a Trello ✓ from the shallow gate does not mean the piece is actually clean.
3. **Re-run pieces the cron marked "not run / time-boxed / skipped"** even if they have no Trello checklist item at all (Upwork Memo has none) — see [[feedback_recheck_must_be_exhaustive_not_shallow]] companion note in the skill file's Step "ALSO fill in missing data."
4. **Don't trust a script's output at face value when a number looks surprising** (a dev at exactly 0h, a gate that "just barely" clears) — spot-check against a second source or raw API call. A parsing bug (dayStrips shape change) produced a fully-formed but wrong JSON response with no error thrown; only a raw API cross-check caught it.
5. **Cross-check adjacent systems for the SAME entity at day-level, not just weekly-total level** — Upwork vs Workstream day-by-day surfaced a genuinely missing Wednesday task-log entry for KhanhHH that a weekly-total-only comparison would have missed entirely.
6. **Don't assert timezone-sensitive conclusions (which exact day something happened) without confirming both systems' timezone handling** — a day-by-day comparison between two systems can be an artifact of inconsistent UTC/local parsing (see the Upwork `new Date()` host-timezone bug found the same day) even when the weekly total is real. State which part of a finding is solid (the total) vs uncertain (the per-day split) rather than presenting both with equal confidence.
7. **When a discrepancy is found and its cause is knowable in one more step (ask the person, check one more source), take that step before finalizing the report** — don't leave "worth investigating" as the final answer if a quick message or query resolves it. The KhanhHH message is the model: found the gap, identified the specific missing day, sent a message asking her to fix it, recorded the action taken (room ID + event ID) in the report.

See also (same day, same session): [[feedback_recheck_must_always_retry_workstream_first]], [[feedback_maddy_consolidated]].
