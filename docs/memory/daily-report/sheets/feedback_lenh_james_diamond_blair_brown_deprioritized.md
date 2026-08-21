---
name: feedback_lenh_james_diamond_blair_brown_deprioritized
description: "LeNH moved to James Diamond (Workstream project 'Portfolio - James Diamond', id cmqook9vf0kl8m81vusyo8ppt) — Blair Brown cleared, but James Diamond hours become her real 0h/shortfall gate"
metadata:
  type: project
---

🔴 **CORRECTED 2026-08-21 after a real miss — do not just "deprioritize and stop checking".** User confirmed LeNH now works James Diamond, not Blair Brown ("LeNH làm James full"). Initial read was wrong on two counts:
1. First checked the wrong project (Blair Brown/Peptide Clyde) instead of James Diamond.
2. A quick live-API probe across all 21 Workstream projects wrongly showed LeNH as "0h everywhere" — bug: the probe read `response.members`, which doesn't exist on the raw `/review/week` endpoint (that's `rows`/`roster` — the `members` field only exists in `workstream-fetch-project-week.js`'s own transformed wrapper output, and even that script had a `blair-brown` vs `blair_brown` key mismatch bug that silently returned the wrong/empty project). Always use the wrapper script with the EXACT key from its `PROJECTS` map (`blair_brown`, not `blair-brown`), or if querying the raw API directly, read `.rows` filtered by `employeeName`, never assume a `.members` field exists on the raw response.

**Verified correct picture (2026-08-21, week 08-17→08-23):** LeNH logged 8h/8h/8h on James Diamond (project `cmqook9vf0kl8m81vusyo8ppt`) Mon-Wed (08-17/18/19), 0h Thu 08-20 — a genuine gap, reminder sent. Blair Brown (`cmqj4tj6v01gfm81vgx7ipkov`) had 0 members log any hours all week — correctly cleared, not an alert.

**How to apply:** For LeNH's daily-report sheets/gate check, query the **James Diamond** Workstream project (not Blair Brown) as her primary 0h/shortfall source going forward. Blair Brown stays cleared (not an alert) as long as she's reassigned. If a future check needs a project this DuongDN token can't see (e.g. "Others", 403), don't conclude "0h everywhere" — ask the dev directly, same as the LongVV/Codeorange precedent (see [[feedback_dev_project_mapping_flexible]]).

See also [[feedback_lenh_consolidated]].
