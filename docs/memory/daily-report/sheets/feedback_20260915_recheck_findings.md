---
name: feedback_20260915_recheck_findings
description: "2026-09-15 recheck: real KhanhHH+LeNH 0h alerts found after WS retry; 3 structural gaps discovered (Philip config missing entirely, Fountain customer Trello board has no token, Bitbucket Maddy token dead)"
metadata:
  type: feedback
---

**Workstream retry (08:50):** single `DISPLAY=:1 workstream-login.js` call succeeded immediately after cron's 05:00 outage — confirms [[feedback_recheck_must_always_retry_workstream_first]] pattern again (Nth recurrence of "transient, not persistent").

**Real findings, not false positives:** KhanhHH and LeNH both showed genuine 0h on 2026-09-14 (Monday) across EVERY live Workstream project (checked all ~19 project IDs, not just their mapped gate project), with no leave on file. Upwork Rory/Aysar memo check also showed 0 memos same day for LeNH — cross-system consistent, strengthens the finding rather than contradicting it. Left Aysar/Elliott/James Diamond Trello items incomplete.

**3 structural (not transient) gaps found — worth fixing, not just re-noting each run:**
1. `config/.msteams-accounts.json` does not exist at all (no `.enc` either) — Philip check has been silently unrunnable, distinct from every other "token expired" case in this codebase.
2. Fountain's customer Trello board (Rick's account, board `5475eaf923a9a1309357eb51`, "Web Development") has no API key/token anywhere in config — `config/.trello-config.json` only covers the internal "My Task" board. This piece of the 3-part Fountain check has probably never actually run via automation.
3. Bitbucket token for Maddy Part 4 (PR reply-rate, `xtreme-web/rms`) returns `401` — dead, needs a freshly-created Atlassian app password with Bitbucket scope (per [[feedback_maddy_consolidated]] token-gotcha note).

**How to apply:** next recheck touching Maddy/Philip/Fountain, check whether these 3 have been fixed before re-diagnosing from scratch — if still broken, they're not new info, just confirm and move on.
