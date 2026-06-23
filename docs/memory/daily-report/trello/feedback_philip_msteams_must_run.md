---
name: feedback_philip_msteams_must_run
description: Philip MS Teams check MUST run script fetch-msteams-customer-messages.js — never skip as "not implemented"
metadata:
  type: feedback
---

Philip (Six Star Rentals — pbriggs@sixstarrentals.com.au) is monitored via MS Teams using `will@nustechnology.com` account.

**Rule:** ALWAYS run `node scripts/fetch-msteams-customer-messages.js will <query>` for Philip's check. Never mark as "Not checked"/"not implemented"/"config missing" — the script exists, the config exists (`config/.msteams-accounts.json`, account `will`), and login is verified working end-to-end as of 2026-06-06 (see [[feedback_msteams_url_substring_bug_fixed]]).

**Why:** 2026-06-04 a subagent skipped it claiming "not implemented"; 2026-06-06 investigation found it had a real login-loop bug (now fixed) but the password/config were correct all along.

**How to apply:**
1. Run `node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` (use the FULL NAME — plain "Philip" matches ~113 ambiguous Teams contacts and the script blindly clicks the first match)
2. Check screenshot `tmp/msteams-09-chat-open.png` / `tmp/msteams-08-search-results.png` for the matched contact and `tmp/msteams-post-*.png` for message content
3. Alert only if new unresolved customer complaint or request since last check
4. No new message = complete Trello item
5. Last known message (unverified, from pre-fix era): 2026-05-27 — "I have to uninstall my latest version and install again" (Microsoft Store native app issue)

**Known remaining issues (as of 2026-06-06):**
- Search by surname alone ("Briggs") can return 0 results if Teams' SPA hasn't finished hydrating yet (headless load time varies 1-2+ minutes run to run) — full name "Philip Briggs" is more reliable
- Message-content extraction currently only captures the generic "Messages" pane header, not actual message text/sender/timestamp — needs a selector fix in `searchCustomer()` to get real message content
- Until extraction is fixed, treat "chat opened, customer found" as confirmation the channel is reachable, but verify message content via screenshot inspection rather than the script's parsed `messages` output
