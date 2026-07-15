---
name: feedback_workstream_report_needs_dev_reviewer_hours_and_status
description: "Workstream project report rows must show actual dev-logged hours + reviewer's charged hours + review status (need_review=false OR live reviewStatus) — gap found 260714 08:52"
metadata:
  type: feedback
---

User (DuongDN) flagged 260714 08:52 (Sheets+Workstream context): reports were missing a required breakdown for each Workstream-logged project. Every project entry must show THREE things, not just actual dev hours:
1. **Actual dev hours logged** (task-log actual, e.g. `weekTotal`/daily actual from `/review/week`)
2. **Reviewer's charged hours** (hours the reviewer logged against the review — separate figure from the dev's own hours)
3. **Review requirement/status** — if the project doesn't require review, write `need_review = false`; otherwise report the live `reviewStatus` (`Pending`/`Reviewed`) for that project/dev/date.

**Why:** prior reports showed actual dev hours and separately ALERTED only when a review was `Pending` (per [[feedback_workstream_needs_review_check]]) — but didn't consistently print the reviewer's own charged hours, and didn't explicitly state `need_review=false` for projects with no review requirement. This left a silent gap: a reader couldn't tell "no review needed here" apart from "review status just wasn't checked".

**How to apply:** In any report (daily/weekly/Monday) with Workstream project rows, augment each project line with:
- Actual dev hours (existing, already scanned)
- Reviewer charged hours — from `/review/week?projectId={id}&date={date}` rows for the reviewer's own `employeeName` (a reviewer can also log dev/review hours directly)
- Review status field — determine if a project requires review at all (per [[feedback_workstream_needs_review_check]]'s `isReviewer`/`REVIEWER_OVERRIDES` logic via `/pinfo/projects/{id}`); if no reviewer is configured for the project → `need_review = false`; if a reviewer IS configured → print the actual `reviewStatus` (`NotRequired`/`Pending`/`Reviewed`) for that charged-hour row, not just an alert when Pending.
- Fountain is still excluded from the review-status check per existing rule (has its own internal QC).

See [[reference_workstream]] for the API endpoints and [[feedback_workstream_needs_review_check]] for reviewer-determination logic — this memory adds the REPORTING FORMAT requirement on top of that existing alerting logic.
