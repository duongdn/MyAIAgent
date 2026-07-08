---
name: feedback_workstream_needs_review_check
description: "Workstream 'needs review' feature (260708) — charged hours flagged Pending must alert the project reviewer, not the dev"
metadata:
  type: feedback
---

Workstream is rolling out a per-task-log review flag on charged hours. Row field `reviewStatus` on `/review/week` API: `NotRequired` (no review needed), `Pending` (flagged, unresolved), `Reviewed` (resolved). Also `memberNeedsReview` (bool, per-row) and `lockReason` (e.g. `TARGET_NOT_NEEDS_REVIEW`).

`scripts/workstream-fetch-project-week.js` now surfaces this per project in its summary output:
- `reviewer` — roster member with role `Manager` (fallback `Tech Lead`) for that project
- `needsReview` — array of `{employeeName, date, task, charged}` for rows still `Pending`

**Why:** User (DuongDN) asked 260708 to have `/me:daily-report` flag any unresolved "need review" charged-hour item as an ALERT, addressed to the **reviewer** (project manager), not the developer who logged the hours — since the dev isn't the one who needs to act.

**How to apply:** In `/me:daily-report` Piece 4 (Sheets/Workstream), for every project + every dev, check the `needsReview` array from the fetch script. Non-empty → ALERT in the summary table, addressed to that project's `reviewer`. `Reviewed` rows are resolved, don't alert even if `Pending` in a prior day's report. A dev can have a pending review on a project even when their hours otherwise look fine — this is a separate check from the 0h/shortfall checks, run it across ALL Workstream projects same as [[feedback_check_workstream_before_flagging_shortfall]].

Confirmed live 260708 via direct API query: Fountain project had 3 Pending rows for PhatDLT (reviewer=TrinhMTT/Manager); Radio Data Center had 1 Pending for KhanhHH + 4 Reviewed (reviewer=DuongDN/Manager); Crystal lang had 1 Pending + 1 Reviewed for PhucVT (reviewer=TienND/Manager, note: DuongDN is Tech Lead there, not Manager, so DuongDN is NOT the reviewer for that project).
