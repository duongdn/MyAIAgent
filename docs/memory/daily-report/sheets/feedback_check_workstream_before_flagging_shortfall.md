---
name: feedback_check_workstream_before_flagging_shortfall
description: Sheets/Fountain pieces must live-query the FULL Workstream project list before flagging any dev shortfall or 0h — static project tables go stale and cause false alerts
metadata:
  node_type: memory
  type: feedback
  originSessionId: 7802f504-a1ff-402a-b985-121eb7c467ce
---

**Workstream is authoritative when Sheets shows 0h/shortfall** — Sheets may lag or sit unfilled even when hours were worked, for ANY dev with a Workstream project (not just specific ones). First caught 2026-06-09: Sheets showed LongVV 0h W30, Workstream showed 8h Jun 8.

**Deeper bug found 2026-06-23 — the project LIST itself goes stale, not just the sheet data:**
1. **KhanhHH false shortfall**: subagent checked only Baamboozle WS, reported "2h, 6h shortfall." Direct re-query of ALL known WS projects found 6h more under **Generator** (Elliott's project — not in the table that subagent used). True total 8h, no shortfall.
2. **Fountain false "0h" for all devs**: subagent only read the genuinely-empty Sheet W{n} tab. Live query of WS project "Fountain Greetings" showed ViTHT 8h, ThinhT 4h, HungPN 3.5h — team had migrated real logging to Workstream while the Sheet sat unused.

**Why:** User caught both same day ("check workstream why you keep wrong for this !!!"). Pattern: any dev/project can silently move Sheets→Workstream, and the WS project list itself grows without notice (was 5 projects in memory, live API showed 10).

**How to apply:**
- Before writing ANY "0h"/"shortfall" line in ANY piece (Sheets, Fountain, per-dev recheck): run `GET {api_base}/time/projects?date={date}` AND iterate `/review/week?projectId={id}&date={date}` for **every** ID — do not stop at projects "known" to belong to that dev/client.
- A 0h/shortfall number is the TRIGGER to re-verify via Workstream directly, not something to write down as-is.
- If sheets=0h but Workstream>0h → use Workstream figure, note the discrepancy.
- New WS project found via live query but missing from [[reference_workstream]]'s table → add it immediately.
- Run `node scripts/workstream-fetch-project-week.js YYYY-MM-DD [project-key]` per project. `weekTotal`=hours worked, `weekCharged`=billed. Login: `DISPLAY=:1 node scripts/workstream-login.js` (auto-refresh on 401). `missingReportDays`>0 on past workdays = flag.
