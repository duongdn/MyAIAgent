---
name: feedback_bailey_vinn_david2_accounts_removed
description: "Bailey Upwork accounts vinn/david2 (and workrooms Bailey-VietPH/Bailey-DuongDN) no longer exist — user confirmed 2026-08-10. Never report 'no saved session' for them; Bailey is tracked via Paturevision sheet + TuanNT task log only."
metadata:
  node_type: memory
  type: feedback
---

The Upwork accounts `vinn` and `david2` (used for the Bailey DEV1/DEV3 workrooms) **no longer exist** — user confirmed 2026-08-10 ("false alarm, ko còn 2 nick này nữa" — those 2 accounts are gone). They were removed from `config/.upwork-config.json`, `scripts/upwork-login.js`, `scripts/upwork-memo-check.js`, and `.claude/commands/me/daily-report.md` (Piece 15 + bailey gate).

**Why:** Every daily-report run was flagging "Bailey workrooms (vinn/david2) have no saved session — first-time login needs a human, out of automated scope" as a recurring false alarm, since the dead accounts were still enumerated in config/scripts/memory. The user repeatedly saw "a ton of alerts" that weren't real. Removing the dead accounts at the source kills the whole false-alarm class.

**How to apply:**
1. NEVER report "no saved session for vinn/david2", "first-time login needed for Bailey DEV1/DEV3", or any Bailey Upwork session issue — those accounts are gone.
2. **Bailey as a project is still live** — it's tracked via the Paturevision Google Sheet + TuanNT task log (see [[feedback_bailey_paturevision_billing]]), Slack GGS (Nick), and its Trello gate. Only the **Upwork** workrooms were removed.
3. `upwork-weekly-hours.js`, `upwork-memo-check.js` now only enumerate carrick workrooms (Rory, Aysar, Neural Contract) — if a report ever shows a `vinn`/`david2` account or Bailey Upwork workroom again, it's a stale config/script regression, not a real session problem. Fix the source, don't report it.
4. The AirAgri Discord dev is a DIFFERENT `vinn` (nusvinn, James Diamond task) — never confuse or remove him. See [[feedback_vinn_daily_report_format]].
