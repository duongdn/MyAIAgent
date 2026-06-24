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

🔴 **RECURRED 2026-06-24** — same KhanhHH/Generator gap, one day after this memory was written. Root cause: the script doing the check (`daily-sheets-scan-260623-tue.js`) hardcoded 3 WS projects and never got the fix applied, because each day's check was a fresh dated script copy, not an edit of one canonical file. This memory's *rule* was correct; the *executable tool* didn't implement it. See [[feedback_no_dated_scan_scripts]] for the structural fix.

**How to apply:**
- Use the canonical script: `node scripts/sheets-tasklog-scan.js <YYYY-MM-DD> <dev1> [dev2 ...]` — it always scans ALL sheets + the FULL live Workstream project list, no per-dev subset to go stale. Do NOT write a new dated script (see [[feedback_no_dated_scan_scripts]]).
- A 0h/shortfall number is the TRIGGER to re-verify via Workstream directly, not something to write down as-is.
- If sheets=0h but Workstream>0h → use Workstream figure, note the discrepancy.
- New WS project found via live query but missing from [[reference_workstream]]'s table → add it immediately.
- `weekTotal`=hours worked, `weekCharged`=billed. Login: `DISPLAY=:1 node scripts/workstream-login.js` (auto-refresh on 401, never report 401 as "unavailable" — fix and retry). `missingReportDays`>0 on past workdays = flag.
