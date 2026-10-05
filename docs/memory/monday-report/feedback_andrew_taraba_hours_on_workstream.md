---
name: feedback_andrew_taraba_hours_on_workstream
description: Monday report Andrew Taraba hours live on Workstream project "Portfolio" (id cmqyvioez007pqo0xn1iexfg3), not the sheet and not in workstream-fetch-project-week.js
metadata:
  type: feedback
---

Andrew Taraba sheet (11iOnN6s…) is entirely unfilled (all weeks 0.00, W-tabs empty). Real hours are in Workstream project **"Portfolio"** (customerAlias "Andrew Taraba", projectId `cmqyvioez007pqo0xn1iexfg3`), roster DuongDN (Manager) + TuanNT (Developer). `scripts/workstream-fetch-project-week.js` does NOT include it.

**Why:** 2026-10-05 run reported Taraba 0h; user: "Andrew có task mà". Raw `/review/week?projectId=cmqyvioez007pqo0xn1iexfg3&date={monday}` showed TuanNT 1h on 09-30.

**How to apply:** Every Monday report, hit `GET {api_base}/review/week?projectId=cmqyvioez007pqo0xn1iexfg3&date={monday}` and sum `rows[].actual` (H:MM). Never default Taraba to 0 from the sheet.

Related: [[project_monday_report_sheets]], [[feedback_monday_report_hours_and_scope]]
