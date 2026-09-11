---
name: feedback_recheck_must_always_retry_workstream_first
description: "Recheck (Piece 11) must ALWAYS retry Workstream login as its first action when the cron report shows an SSO outage — never carry the cron's 'outage' alert forward unretried"
metadata:
  type: feedback
---

User confirmed 2026-09-11: cron reporting a Workstream SSO outage is acceptable (cron has a hard time budget, limited retries). But a **recheck** run on the same day is NOT allowed to just repeat/carry forward that outage note — it must actually retry the login first, every time, before touching any Trello item gated by Workstream hours.

**What happened 2026-09-11:** 06:00 cron failed Workstream SSO (2 browser + 2 API attempts) and left Maddy/John Yi/Aysar/Elliott/Rebecca/James Diamond/Blair Brown all unverified. At 08:52 recheck, a single `DISPLAY=:1 node scripts/workstream-login.js` attempt succeeded immediately, unlocking real hours for all of the above. This matches the existing precedent in [[feedback_workstream_sso_recheck_fixed]] (SSO failures are often transient/expired-token, not permanent) — the fix already existed as guidance but the user's reaction shows it needs to be treated as a **hard, unskippable first step** of Piece 11, not a "try if you remember."

**Why:** If recheck ever skips the retry and just repeats the cron's outage language, every Workstream-gated Trello item stays wrongly incomplete and the report looks stale/broken to the user, even though the fix is usually a single ~10s login call.

**How to apply:**
- Piece 11 (recheck) step order: (1) retry `DISPLAY=:1 node scripts/workstream-login.js` FIRST, unconditionally, before reading Trello's ○ item list or deciding what's blocked — not conditionally "if a Workstream item is open."
- Only after a genuine retry failure (not just "cron said it failed") is it acceptable to carry an outage note forward.
- Never paste/repeat the cron run's exact outage wording in a recheck's own alert text as if it were freshly verified — if retried and still failing, say so explicitly as a NEW verified failure, not a copy of the old one.
