---
name: feedback_workstream_needs_review_check
description: "Workstream 'needs review' feature (260708) — charged hours flagged Pending must alert the project's REAL isReviewer-flagged member(s), not the Manager/Tech Lead role holder, not the dev. Fountain excluded."
metadata:
  type: feedback
---

Workstream has a per-project review flag on charged hours. Row field `reviewStatus` on `/review/week` API: `NotRequired` (no review needed), `Pending` (flagged, unresolved), `Reviewed` (resolved).

🔴 **CORRECTED same day — first version of this memory was wrong.** Reviewer is NOT derivable from `/review/week`'s roster role text (Manager/Tech Lead). Confirmed live via the actual Workstream UI (project "Info" ⓘ icon → "Review Charged Hours" section) and its backing endpoint `GET {api_base}/pinfo/projects/{id}?date={date}`: each project member has an explicit `isReviewer` boolean, independent of their `roles`. User corrected: "James thì PhucVT là reviewer... Radio thì LeNH là reviewer" — both are plain Developers, not the project Manager (DuongDN). Confirmed via `/pinfo/projects/`: Radio Data Center → LeNH `isReviewer:true` (DuongDN/Manager is `isReviewer:false`); James Diamond → PhucVT `isReviewer:true`; Crystal lang → DuongDN `isReviewer:true` (via `isTechLead:true` — Tech Lead is *always* auto-reviewer per the UI's own legend: "Needs review = pending reviewer approval · Is reviewer = can approve · Tech Lead is always a reviewer"); Fountain → BOTH VuTQ and DuongDN(Tech Lead) are `isReviewer:true` — a project can have more than one reviewer.

`scripts/workstream-fetch-project-week.js` now fetches `/pinfo/projects/{id}` alongside `/review/week` and surfaces per project:
- `reviewers` — array of displayNames where `isReviewer === true` (can be 0, 1, or multiple)
- `needsReview` — array of `{employeeName, date, task, charged}` for `/review/week` rows still `reviewStatus: Pending`

**Why:** User (DuongDN) asked 260708 to have `/me:daily-report` flag unresolved "need review" charged-hour items as an ALERT, addressed to the actual reviewer — since the dev isn't the one who needs to act, and (as this correction shows) neither is the project Manager by default.

**How to apply:** In `/me:daily-report` Piece 4, for every project except Fountain (see below) + every dev, check `needsReview`. Non-empty → ALERT addressed to that project's `reviewers` array (join with comma if multiple). `Reviewed` rows are resolved, don't alert even if `Pending` in a prior report. Never assume reviewer = Manager or Tech Lead by role label alone — always trust the `isReviewer` field from `/pinfo/projects/{id}`.

**Fountain excluded:** User instruction 260708: "Fountain: càng sai, có vẻ ko cần reviewer, check kĩ lại" → clarified as "ignore, ko cần check Fountain". Do not run/alert this check for Fountain even though the data is technically available (Fountain has its own internal QC process via HungPN/PhatDLT that this check would otherwise double-flag).

See [[reference_workstream]] for the `/pinfo/projects/{id}` endpoint reference.
