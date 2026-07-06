---
name: feedback_workstream_fetch_needs_explicit_date_arg
description: workstream-fetch-project-week.js defaults to current week if no date arg given — must pass PREV_DATE explicitly or it silently returns empty/wrong-week data
metadata:
  type: feedback
---

`node scripts/workstream-fetch-project-week.js` with NO argument defaults to `(Date.now() + 7h).toISOString().slice(0,10)` — i.e. "tomorrow in UTC+7" — which resolves to the CURRENT week, not the week being verified. Every project came back with empty `members: []` on 2026-07-06 recheck because it silently queried this week (just started, no logged hours yet) instead of the prior week containing PREV_DATE (2026-07-03, Friday).

**Why:** Wasted a full call cycle interpreting empty results as "still broken" before noticing the script takes a positional `YYYY-MM-DD` date arg (`args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a))`) to select the target week.

**How to apply:** ALWAYS pass PREV_DATE explicitly: `node scripts/workstream-fetch-project-week.js 2026-07-03`. Never trust a no-arg run's empty `members: []` as "no hours logged" — re-run with the explicit date first. Same applies to the `--project-filter` positional arg (also supported, can combine: `... 2026-07-03 khanhhh`).

Related: [[feedback_workstream_all_projects_in_script]], [[feedback_sheets_scan_prev_date_for_daily_hours]]
