---
name: feedback_workstream_dates_can_undercount_ws_vs_manual
description: Monday report — user may quote a different hours number than Workstream/Sheet; verify live before overriding, but don't assume WS is wrong without a concrete alternate source
metadata:
  type: feedback
---

2026-07-20 (week 2026-07-13 to 2026-07-19): user initially said Maddy should be 16h, not the 14.5h I computed from Workstream. I re-verified by hitting the raw `/api/review/week` endpoint directly (bypassing the script) and it matched the script's 14.5h exactly — 4 task-log rows for LongVV summing to 14.5h, no entries 7/17-19, sheet W15 tab genuinely empty (unfilled, confirming staleness in a different way — sheet has nothing, not a stale-but-present number). When asked where the 16h came from, user did not supply an alternate source and ultimately confirmed to use the Workstream-verified 14.5h.

**Why:** A user correction is normally trusted immediately, but hours feed a live financial-adjacent form + Trello completion. Re-verifying via a second independent path (raw API call, not just re-running the same script) before overriding is worth the extra step — it either confirms the user's number quickly (giving them the receipts) or, as here, surfaces that the number needs a source before it can be trusted.

**How to apply:** If user states a different hours figure than computed, do a live raw-API cross-check (not just re-running the same script) and ask what source they're drawing from. If they confirm the computed number after seeing the verification, proceed with that — don't silently keep asking once they've answered.

Related: [[project_monday_report_sheets]], [[feedback_monday_report_hours_and_scope]]
