---
name: project_blair_brown_setup
description: Blair Brown - Peptide Clyde new project setup — Workstream config, developer, weekly report inclusion
metadata:
  type: project
---

Blair Brown (client) - Peptide Clyde (WooCommerce site) is a new NUS project starting W31 (Jun 15-19, 2026).

**Developer:** DuongDN (confirmed from Matrix "Potential - Blair Brown - WooCommerce Site" room, Jun 19)
**PM/tracker:** anhnvn (AnhNVN) — tracks tasks, QA, reminders
**Task log:** Workstream "WordPress Update" project (ID: `cmqj4tj6v01gfm81vgx7ipkov`)

**Weekly report:** Included in James Diamond + Marcel Matrix report sent to ThuyLe's room (`!oofREYAXHsvPWEOJev:nustechnology.com`). ThuyLe requested 2026-06-19.

**Format in Matrix message:**
```
---

Blair Brown - Peptide Clyde
DuongDN: Xh
```

**Why:** ThuyLe said "từ tuần này, t có report thêm job Blair Brown - Peptide Clyde → Dương add thêm vào report" (2026-06-19).

**Access:** TechLead role CAN fetch own hours via `/api/time/projects/{id}/week?date={date}` (NOT `/review/week` which is manager-only). Script updated 2026-06-19.

**Script:** `node scripts/workstream-fetch-project-week.js [date] blair_brown` — uses `manager: false` path in `PROJECTS` config.

**W31 result:** DuongDN: 8h (Wed 2h + Thu 4.5h + Fri 1.5h). Script bug (`weekStats.totalActualMinutes` → should be `weekStats.actual`) caused false 0h initially — fixed 2026-06-20.

**How to apply:** In weekly runs: `node scripts/workstream-fetch-project-week.js {friday_date} blair_brown`. Add Blair Brown section after Marcel in Matrix message. [[reference_workstream]]
