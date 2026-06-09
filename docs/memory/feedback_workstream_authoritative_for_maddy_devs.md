---
name: feedback_workstream_authoritative_for_maddy_devs
description: "Workstream (workstream.nustechnology.com) is the authoritative source for Maddy/Xtreme devs (LongVV, LuHX). Always check when sheets shows 0h."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

For **Maddy/Xtreme Soft Solutions** devs (LongVV, LuHX), **Workstream is authoritative**. Google Sheets may lag or be unfilled even when hours were worked.

**Why:** On 2026-06-09, Google Sheets showed LongVV 0h for W30. Workstream showed LongVV 8h on Jun 8. User asked "Did you check Workstream???" — report had wrong data until Workstream was checked.

**How to apply:**
- Run `node scripts/workstream-fetch-project-week.js YYYY-MM-DD maddy` every daily report
- If sheets=0h but Workstream>0h → use Workstream, note the discrepancy
- `weekTotal` = actual hours worked; `weekCharged` = billed to client
- `missingReportDays` = days without client report submitted → flag if any past days
- Login: `DISPLAY=:1 node scripts/workstream-login.js` (token auto-refresh on 401)

See [[reference_workstream]].
