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

🔴🔴 **RECURRED A THIRD TIME 2026-06-25 — and this time a false reminder was actually SENT to the dev.** LeNH was reported "0h, unlogged" during a recheck even though "Peptide Clyde" WAS in that run's live-queried accessible-projects list (10 projects, including Peptide Clyde) — the canonical `sheets-tasklog-scan.js` script ran clean with no errors but still returned empty for this one dev+project combo. A Matrix reminder was sent based on this. LeNH replied "ủa, em có log lên workstream rồi mà ta" (I already logged it though) — re-query moments later found 10.67h real logged work (3:10 + 3:30 + a 4:00 half-day-off credit) on that exact project. Had to send a follow-up Matrix message apologizing and correcting the report. Root cause unconfirmed (no creation-timestamp on Workstream task-log rows to tell if the entries existed yet at the time of the failed query) — could be a transient per-project API failure silently swallowed as empty, or a timing gap. Either way: **the live project list being present is not proof the per-project data fetch actually succeeded.**
- **Concrete rule going forward:** before *sending* anything to a human (Matrix reminder, Trello block, etc.) based on a 0h/shortfall finding — not just before writing a report line — re-run the query for that exact dev+project ONE more time, isolated, immediately before sending. The cost of being wrong after a message is sent (wasted dev time, eroded trust) is categorically higher than being wrong in a report draft that hasn't gone out yet.
- If a dev pushes back on a reminder/alert, treat that as a strong signal to re-verify immediately, not to explain the rule to them — they have ground truth, the script does not.
