---
name: feedback_leave_plan_must_refresh_every_run
description: "leave-plan.json goes stale silently if parse-leave-emails.js isn't re-run — a 3-week-stale config caused a real PENDING 2-week leave request (PhucVT) to be missed and reported as an unexplained 0h alert"
metadata:
  type: feedback
---

🔴 2026-09-09: during a daily-report recheck, `parse-leave-emails.js --check PhucVT <date>` returned `WORKING` (no leave) and PhucVT's 0h was reported as a confirmed, unexplained shortfall alert. User corrected live: "PhucVT off 2 tuần ko xem email à" — PhucVT HAD emailed a leave request covering 2026-09-07→09-18, but `leave-plan.json` was last refreshed 2026-08-19 (3+ weeks stale), so the request was never ingested. Running `node scripts/parse-leave-emails.js` (no args, full refresh) immediately surfaced it as PENDING.

**Why:** `--check <dev> <date>` only reads the existing `leave-plan.json` snapshot — it does NOT itself scan email. If the refresh step is skipped, `--check` silently reports stale/wrong data with no error, indistinguishable from "genuinely no leave requested."

**How to apply:** ALWAYS run `node scripts/parse-leave-emails.js` (full refresh, scans duongdn@ inbox) at the start of any daily-report run/recheck — do not rely on a previous session's `leave-plan.json` snapshot, especially in a recheck that happens hours/days after the last full run. Do this BEFORE any `--check` call, not after a 0h finding is already written up as an alert. Also note: PENDING (emailed but not yet manager-approved-by-reply) still counts as a real leave signal worth surfacing — don't wait for approval-reply detection before treating it as a plausible explanation for 0h.

See also [[project_leave_plan_system]].
