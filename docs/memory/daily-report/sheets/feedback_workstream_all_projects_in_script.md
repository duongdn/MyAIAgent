---
name: feedback_workstream_all_projects_in_script
description: workstream-fetch-project-week.js must include ALL projects (james_diamond, blair_brown manager:true, etc.) — missing entries cause false 0h alerts
metadata:
  type: feedback
---

`scripts/workstream-fetch-project-week.js` MUST include ALL 9 Workstream projects from [[reference_workstream]]. Missing projects cause false 0h alerts on devs who ARE working.

**Why:** 2026-06-29 — PhucVT had 8h on James Diamond Jun 26 and LeNH had 7h on Blair Brown Jun 26. Both were false-alerted as 0h because: (1) `james_diamond` project was not in the PROJECTS list at all; (2) `blair_brown` was set to `manager: false` (self-view only), hiding all team members except DuongDN. A false reminder was erroneously sent to LeNH as a result.

**How to apply:**
- PROJECTS must include: maddy, rebecca, blair_brown (manager:true), baamboozle, colin_etz, james_diamond, family_app, generator, fountain
- `blair_brown` MUST be `manager: true` — DuongDN has manager access, LeNH (main dev) logs hours there
- If adding a new Workstream project to reference_workstream, ALSO add it to the script immediately
- Before flagging any dev as 0h, verify script PROJECTS list matches [[reference_workstream]] project table
