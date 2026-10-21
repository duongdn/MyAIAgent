---
name: feedback_workstream_charged_field_is_authoritative_no_manual_cap_bank
description: The pre-Workstream-migration "cap Web at 40h and bank the overflow dev's hours" rule is obsolete — Workstream's own `charged` field per task-log row already is the authoritative charge amount, don't recompute/cap/bank it manually
metadata:
  type: feedback
---

**Rule:** For the James Diamond + Marcel Matrix report, use each dev's Workstream `charged` value directly (sum per dev across the week). Do NOT re-apply the old [[feedback_matrix_report_format]] "cap Web at 40h in dev-priority order, bank the overflow as `0h/{actual}` with a 'làm trước report sau' annotation" rule — that rule was designed for the pre-Workstream era when charge/actual was computed manually from GSheets and there was no system-level charge field to trust.

**Why (2026-10-09, W47 report):** Drafted `TuanNT: 0h/2h (làm trước report sau)` because LeNH alone (40h) filled what I assumed was a hard 40h Web cap, banking TuanNT's 2h. User immediately questioned it ("ủa đâu ra 2h làm trước report sau vậy?"). Checked the raw Workstream row: `{task: "YITH POS - Custom Order Status & Register Origin", actual: "2:00", charged: "2:00", reviewStatus: "NotRequired"}` — Workstream itself already charged TuanNT's 2h, no banking flag, no review pending. The 40h "cap" I assumed doesn't exist as a hard constraint in the current system; Web total that week was genuinely 42h charged (LeNH 40 + TuanNT 2), and that's what should be reported.

**How to apply:** When drafting the Web/Mobile/Marcel lines, pull `weekCharged` directly per dev from `workstream-fetch-project-week.js` output and sum for the section total — do not clamp to 40h or invent a banking annotation unless the raw WS row itself shows evidence of an actual cap/review mechanism (e.g. a `reviewStatus: Pending` note or an explicit user instruction that week). If total charged exceeds 40h, just report it as-is (e.g. `Web: 42h/42h`) — that's real data, not an error to "fix" by capping.
