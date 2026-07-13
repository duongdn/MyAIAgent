---
name: feedback_no_dated_scan_scripts
description: "Never write a new dated copy of a monitoring script (daily-sheets-scan-YYMMDD-*.js) — use the one canonical script so fixes can't get lost on the next day's copy"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

NEVER create a new dated copy of a monitoring script (e.g. `scripts/daily-sheets-scan-260623-tue.js`, then `-260624-wed.js`, etc). Edit/extend the ONE canonical script for that data source instead.

**Why:** Each dated copy hardcoded a per-dev subset of sheets/Workstream projects. 2026-06-23: KhanhHH false "0h/shortfall" traced to a script only checking Baamboozle Workstream, missing Generator (8h were there). The lesson was written to memory ([[feedback_check_workstream_before_flagging_shortfall]]) the same day. On 2026-06-24, the EXACT same false alert recurred for KhanhHH — the day's script (`daily-sheets-scan-260623-tue.js`, reused/copied forward) still only checked 3 hardcoded Workstream projects (Baamboozle, Colin/ETZ, Blair Brown) and again excluded Generator, where the real 8h was. Same day, LeNH's check in that same script only scanned 3 of 13 known sheets (Rory/Franc/Rebecca) instead of all of them.

**Root cause:** a textual memory rule describing correct behavior does not enforce anything if the executable script used to do the check doesn't implement it. Writing a fresh dated script file each day means a fix applied to one day's copy never propagates — there is no single file to have "remembered" the fix.

**Fix applied 2026-06-24:**
- Built `scripts/sheets-tasklog-scan.js` — takes `<date> <devNameSubstr>...` as args, always scans ALL known sheets (currently 13, see file's `SHEETS` map) AND the full live Workstream project list (`GET /time/projects?date=`, not a hardcoded per-dev subset). No per-dev subset to go stale.
- Archived the 29 old dated `daily-sheets-scan-*.{js,py}` files to `scripts/archive/` so there's nothing to copy-paste from.

**Merged incident (2026-06-19, previously a separate memory file):** even the DATE ITSELF, not just the project subset, went stale via this same anti-pattern. `daily-sheets-scan-{date}-{day}.js` scripts hardcoded `PREV_TOKENS` (e.g. `["Wed, 17/06/26", "17/06/26"]`) for the specific date they were written for. On 2026-06-19, no fresh script existed for that morning — cron silently executed the previous day's script (tokens hardcoded to Jun 17), returning Jun 17's numbers mislabeled as Jun 18's for EVERY dev row (TuanNT, Elena, KhanhHH, PhucVT, VietPH all affected). This is uniquely dangerous because unlike a missing-script error, it fails silently with plausible-looking wrong numbers — went undetected through a cron run AND an initial recheck, caught only because the user spotted TuanNT's hours matching a Wednesday-shaped task description. Consequence: TuanNT's real 0h that day was masked as "4h, no alert," wrongly auto-completing 3 gated Trello items (John Yi, Bailey, Rebecca). **This is the same root cause as the project-subset bug above — one more reason the canonical non-dated script (`sheets-tasklog-scan.js`, which derives dates from its `<date>` arg, never hardcodes them per-file) is the fix, not a separate lesson.**

**How to apply:**
1. For any Sheets/Workstream shortfall check, run `node scripts/sheets-tasklog-scan.js <YYYY-MM-DD> <dev1> [dev2 ...]` — never write a new dated script.
2. If a new sheet or Workstream project is discovered, add it to the `SHEETS` map / let the live `/time/projects` call pick it up — edit this one file, don't fork it.
3. **General principle beyond Sheets:** before trusting any "the check was done" memory note, verify the actual script/tool that ran the check matches what the rule says — not just that the rule exists in text. If a recurring monitoring task is implemented as a series of dated one-off files, that pattern itself is the bug; consolidate to one parametrized script before trusting its output again.
4. When checking whether a script is current, prefer `git log --follow` / `ls -t` on the canonical file's own history — there should be no "latest dated copy" to look for anymore.

See [[feedback_check_workstream_before_flagging_shortfall]], [[reference_workstream]], [[feedback_khanhhh_aysar_consolidated]].
