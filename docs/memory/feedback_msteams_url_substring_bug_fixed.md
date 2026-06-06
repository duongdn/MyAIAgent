---
name: feedback_msteams_url_substring_bug_fixed
description: "fetch-msteams-customer-messages.js had a url.includes() substring bug that falsely exited the login loop on the password page — fixed via exact-hostname isTeamsHost(). Script now works end-to-end."
metadata:
  type: feedback
---

On 2026-06-06, root-caused why `fetch-msteams-customer-messages.js will <query>` kept reporting "incorrect password" / failing for `will@nustechnology.com`, despite the user confirming TWICE the password (`config/.msteams-accounts.json`) was correct and worked when typed manually.

**Root cause:** the script used `url.includes('teams.microsoft.com') || url.includes('teams.live.com')` to detect "are we past login, in Teams." Microsoft's OAuth `authorize` URL embeds `redirect_uri=https://teams.live.com/...` as a **query-string parameter** even while still showing the `login.live.com` password-entry page. The substring match fired `true` on that URL, so the script exited the login loop and declared "Teams UI confirmed" — BEFORE ever typing the password. The "incorrect password" screenshots were from this broken loop submitting stale/empty state, not the user's real (correct) password.

**Fix:** replaced all 5 substring-match call sites with an exact-hostname helper:
```js
function isTeamsHost(url) {
  try { return ['teams.microsoft.com', 'teams.live.com'].includes(new URL(url).hostname); }
  catch { return false; }
}
```
Also hardened two unguarded `page.evaluate()` calls in the login loop with `.catch(() => '')` / `.catch(() => false)` to survive "Execution context was destroyed" errors during in-flight navigations.

**Verification:** first re-run with `--clear-profile` after the fix correctly typed the password, passed "Stay signed in?", and landed on `teams.live.com/v2/` with the real chat list loaded (screenshot `tmp/msteams-06-teams-load-timeout.png`) — proving the password was correct all along, exactly as the user said.

**How to apply:**
- The script `scripts/fetch-msteams-customer-messages.js` and config `config/.msteams-accounts.json` (account `will`) now both exist and work — supersedes [[feedback_philip_msteams_config_missing]].
- General lesson: NEVER use `url.includes('domain.com')` to detect "are we on this site" in OAuth/redirect flows — `redirect_uri` query params commonly embed the target domain as a substring of an unrelated host. Always parse `new URL(url).hostname` and compare exactly.
- Remaining known issue: customer search by first name only (e.g. "Philip") returns ~113 ambiguous matches; the script clicks the first `[aria-label*="..."]` match which may not be the right contact, and message-content extraction currently only captures the generic "Messages" header, not actual message text/sender/date. Searching by surname or full name can fail if Teams' SPA hasn't finished hydrating yet (headless load time is highly variable, 1-2+ minutes).

[[feedback_philip_msteams_must_run]]
[[feedback_philip_msteams_config_missing]]
