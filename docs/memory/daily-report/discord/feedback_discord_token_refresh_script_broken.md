---
name: feedback_discord_token_refresh_script_broken
description: discord-token-refresh.js is broken (stale token regex + puppeteer can't see localStorage in the copied profile) — a 401 does NOT mean the user needs to log in, verify with a screenshot first
metadata:
  type: feedback
---

**2026-07-10:** Reported "Discord session expired, needs human sign-in" for nusvinn (401 on `/users/@me`). User said "Discord login sẵn, chả cần làm gì" (already logged in, nothing to do) — correct. Opened a screenshot of the actual Chrome window (Profile 19 copy) and confirmed: genuinely logged in as Vinn, Friends list loaded fine. The 401 was NOT a login problem — `scripts/discord-token-refresh.js` itself is broken:
1. Its token-matching regex (`^[A-Za-z0-9_\-]{24,}\.[A-Za-z0-9_\-]{6}\.[A-Za-z0-9_\-]{20,}$`) may reject a currently-valid real token.
2. Deeper bug: `page.evaluate(() => localStorage)` throws `ReferenceError: localStorage is not defined` in the copied-profile browser even though `window` exists and `document.location` is correct — something about the profile-copy + launch flow puts the page in a broken execution context. Root cause not fixed yet.

**Working fallback used this time:** asked the user to open DevTools → Network tab on the already-open Discord window, click any request to `discord.com/api/...`, and copy the `authorization` request header directly — that's the raw token, no script needed. Saved straight into `config/.discord-accounts.json`. Verified live (`/users/@me`, `/guilds` both 200).

**How to apply:**
- Before ever telling the user Discord needs a human login, take an actual screenshot of the open browser window (`xdotool search --name Discord`, `import -window <id>`) — don't trust `discord-token-refresh.js`'s "failed to extract" as proof of a real logged-out state, per [[feedback_never_report_token_expired]].
- If extraction keeps failing but the screenshot shows a real logged-in session, ask the user for the token via DevTools Network tab (fast, reliable, no code needed) rather than repeatedly retrying the broken script.
- `discord-token-refresh.js` genuinely needs a proper fix (regex + localStorage context bug) — not done yet, flagged for a real debugging session.
