---
name: feedback_philip_msteams_must_run
description: Philip MS Teams check MUST run script fetch-msteams-customer-messages.js — never skip as "not implemented"
metadata:
  type: feedback
---

Philip (Six Star Rentals — pbriggs@sixstarrentals.com.au) is monitored via MS Teams using `will@nustechnology.com` account.

**Rule:** ALWAYS run `node scripts/fetch-msteams-customer-messages.js` for Philip's check. Never mark as "Not checked" or "not implemented" — the script exists and works.

**Why:** 2026-06-04 daily report subagent skipped it with "MS Teams check not implemented — item left incomplete." Script was working fine when run manually.

**How to apply:**
1. Run `node scripts/fetch-msteams-customer-messages.js`
2. Check screenshot `tmp/msteams-post-*.png` for latest message content and date
3. Alert only if new unresolved customer complaint or request since last check
4. No new message = complete Trello item
5. Last known message: 2026-05-27 — "I have to uninstall my latest version and install again" (Microsoft Store native app issue)
