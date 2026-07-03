---
name: feedback_fountain_est_vs_charged_status_column_bug
description: "Fountain Est vs Charged tab: Status is Col G (idx6), NOT Col C (idx2). Scripts using row[2] for status silently read empty string for every row, making NS+IP capacity always compute 0 tasks/0h."
metadata:
  type: feedback
---

On 2026-07-03, `scripts/fountain-w33-capacity-scan.js` (and likely `scripts/fountain-w33-scan-260702.py`, same idx2 assumption) returned **NS+IP: 0 tasks, 0.0h remaining** — a false capacity-clear that would have hidden the real 229h/27-task backlog.

**Root cause:** the "Est vs Charged" tab's real column layout (verified via raw `Est vs Charged!A1:M15` fetch) is:
- Col A (idx0) = task slug (e.g. `2502_update_cart_and_checkout_page`, sometimes bare numeric like `2615`)
- Cols B–E (idx1–4) = empty/merged
- Col F (idx5) = Note
- **Col G (idx6) = Status**
- Col H (idx7) = Dev
- Col I (idx8) = Estimated Dev Raw
- Col J (idx9) = CR
- Col K (idx10) = Actual
- Col L (idx11) = Charged

The est/CR/actual/charged indices (8,9,10,11) documented in [[feedback_fountain_cr_column]] are correct and unchanged. But **Status is idx6, not idx2** — task name is NOT in a separate idx1 column, it's baked into idx0 with the task ID.

**Why it went undetected:** the script's `isNSOrIP()` check on `row[2]` (always `""`) evaluates false for every task, so the NS+IP filter silently returns an empty set instead of erroring. No crash, just wrong (dangerously reassuring) output. Over-estimate calc (Part 5) was unaffected since it doesn't depend on status.

**How to apply:**
- Any new/rewritten Fountain "Est vs Charged" script MUST read status from **row[6]**, dev from **row[7]**.
- Verify column layout by fetching `Est vs Charged!A1:M15` raw and checking the header row (contains "Estimated Dev Raw") before trusting any hardcoded index — column layout has drifted at least once already (see [[feedback_fountain_capacity_script_regex_bug]] for the sibling row-matching bug).
- Sanity check: if NS+IP task count/remaining hours comes back as exactly 0 while total_tasks > 0, treat it as a script bug, not a real "capacity clear" — re-verify against previous report's figures before reporting.
- 2026-07-03 corrected figures (idx6 status) matched 2026-07-02 report almost exactly (229h/27 tasks, runway 2.60wk) — confirms no real capacity change, just the broken script masked it.
