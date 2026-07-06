---
name: feedback_slack_new_workspace_token_extraction
description: "How to get a working xoxc token for a Slack workspace a Chrome profile has NEVER opened before — cookies alone aren't enough, needs one manual login + Local Storage extraction"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 739060f2-0802-43e2-b6b8-ecd9b413a8e1
---

Adding "Solid Code" Slack workspace (2026-07-06, Chrome Profile 15 = David, davidztv19@gmail.com) revealed the token extraction pattern used for OhCleo ([[reference_email_accounts_all10]] profile pattern) does NOT work for a workspace the profile has never visited:

**Why headless cookie-replay fails for brand-new workspaces:**
- Slack's `d`/`d-s` cookies are shared across ALL workspaces at the `.slack.com` domain level — they identify the Slack *account*, not workspace membership.
- The per-workspace `xoxc-...` token is NOT stored in a cookie at all. It lives in **Local Storage** (`Local Storage/leveldb/*.log|*.ldb` under the Chrome profile dir), inside a JSON blob keyed by team ID with a `"domain":"{workspace-subdomain}"` field.
- If the profile has never opened that specific workspace, there's no Local Storage entry yet, so replaying just the shared Slack cookies always lands on a fresh "Sign in to {workspace}" wall.
- Because there's no existing session, Slack forces a real Google OAuth handshake ("Sign in with Google" → accounts.google.com). Attempting this via Puppeteer (even with puppeteer-extra-plugin-stealth, injecting both Slack AND Google session cookies from the real profile) gets rejected by Google's risk engine: `"Couldn't sign you in — this browser or app may not be secure"`. This happens reliably regardless of stealth tuning — don't waste time retrying automated OAuth, and don't hammer it repeatedly (risks flagging/locking the real Google account).

**Working procedure:**
1. Ask the user to do ONE real, human, interactive login: `DISPLAY=:1 google-chrome --profile-directory="Profile N" "https://{workspace}.slack.com/"` on the actual desktop, completing Google sign-in themselves.
2. Confirm the login actually landed on the Slack client UI (find the window via `DISPLAY=:1 xdotool search --name Chrome` then `xdotool getwindowname` — look for a title like `"{channel} - {Workspace} - Slack - Google Chrome"`; screenshot it with `import -window <id>` to be sure, don't trust cookie-file timestamps alone).
3. Extract the token directly: `strings "<profile>/Local Storage/leveldb/"*.log "<profile>/Local Storage/leveldb/"*.ldb | grep -i '"domain":"{workspace-subdomain}"'` — the `token` field in that JSON blob is the `xoxc-...` token.
4. Still need the `d` cookie (shared, easy to get via the existing `browser_cookie3`-based per-profile cookie script) for the `Cookie: d=...` header on API calls.
5. Verify with `POST /api/auth.test` (token + d cookie) before saving — confirms `ok:true`, team name, user.
6. Save `{workspace, url, token, cookie, auth_type: "session", team_id, user, login: {note}}` to `config/.slack-accounts.json`, matching the OhCleo entry shape, then re-encrypt.

**How to apply:** Next time a new-to-us Slack workspace needs a token and the relevant Chrome profile has never opened it, skip straight to asking for one manual login rather than attempting automated Google OAuth replay — it will not succeed and risks the account. Once that one manual login is done, extraction is fully scriptable (steps 3-6).

Related: [[reference_email_accounts_all10]] (davidztv19@gmail.com / Profile 15 also used for Arthur-Meta-Stamp email monitoring — same person/profile, different purpose).
