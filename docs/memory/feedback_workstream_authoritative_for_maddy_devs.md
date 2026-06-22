---
name: feedback_workstream_authoritative_for_maddy_devs
description: "Workstream is authoritative for all devs who have Workstream projects. Always check Workstream alongside Google Sheets — sheets may lag or be empty even when hours were worked."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

**Workstream (workstream.nustechnology.com) is the authoritative source when Google Sheets shows 0h.** Sheets may lag or be unfilled even when hours were worked. This applies to any dev who has a Workstream project, not just specific devs.

**Why:** On 2026-06-09, Google Sheets showed LongVV 0h for W30. Workstream showed LongVV 8h on Jun 8. User asked "Did you check Workstream???" — report had wrong data until Workstream was checked.

**How to apply:**
- Scan ALL Workstream projects (see [[reference_workstream]] for all known project IDs) for each dev alongside the Google Sheets scan.
- If sheets=0h but Workstream>0h → use Workstream figure, note the discrepancy.
- Run `node scripts/workstream-fetch-project-week.js YYYY-MM-DD [project-key]` for each project.
- `weekTotal` = actual hours worked; `weekCharged` = billed to client.
- Login: `DISPLAY=:1 node scripts/workstream-login.js` (token auto-refreshed on 401).
- `missingReportDays` = days without client report submitted → flag if any past workdays.
