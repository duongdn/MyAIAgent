---
name: feedback_head_truncation_missed_tuannt_bailey_hours
description: "2026-09-22: falsely alerted TuanNT 0h because `head -200`/head -N piping cut off a large combined-multi-project Workstream JSON before reaching his entry — always grep/filter the full JSON for a specific employeeName rather than eyeballing a truncated dump"
metadata:
  type: feedback
---

**What happened (2026-09-22 recheck):** Ran `workstream-fetch-project-week.js 2026-09-21` (all 19 projects, one big JSON) and inspected it with `head -200`. TuanNT's entry lived in the `speedventory` (Bailey) project's `members` array, past line 200 — never saw it, concluded "TuanNT 0h everywhere", alerted, and left John Yi + Rebecca + Bailey's task-log gate open. User caught it: "TuanNT có task log Bailey mà???" Direct re-query (`sheets-tasklog-scan.js` and a filtered re-fetch of just `speedventory`) confirmed **TuanNT logged 8.5h on Speedventory that day** — the alert was entirely wrong, not even a real 0h.

**Root cause:** Bailey/Paturevision moved from Google Sheets onto Workstream project key `speedventory` back on 2026-08-21 (see [[feedback_bailey_moved_to_workstream_speedventory]]) — it's now just one more project in the full multi-project JSON dump, not a separately-fetched source anymore. A full-team fetch across 19 projects produces a JSON large enough that `head -N` silently cuts off entries for devs whose relevant project sorts later in the object.

**How to apply, every time a per-dev 0h/shortfall claim comes from a big combined-project JSON:**
1. Never read a multi-project Workstream dump with `head`/eyeballing for a specific dev's total — always programmatically filter/sum across ALL project keys for that `employeeName` (a one-line `node -e` reduce, or grep the saved JSON file with `jq`/regex for the name), same as [[feedback_dev_project_mapping_flexible]] already says for Sheets.
2. TuanNT specifically gates 3 Trello items (John Yi, Rebecca, Bailey) — a wrong 0h on him blocks 3 things at once, so double-check his total is a full-projects sum before alerting, not a partial read.
3. When in doubt, re-fetch just the suspected project by name (`workstream-fetch-project-week.js <date> speedventory`) instead of re-reading the big dump — smaller output, easier to verify by eye.

See also [[feedback_tuannt_consolidated]], [[feedback_check_workstream_before_flagging_shortfall]] (13x prior false-0h history — this is now a 14th, different root cause: truncated read, not stale/wrong query).
