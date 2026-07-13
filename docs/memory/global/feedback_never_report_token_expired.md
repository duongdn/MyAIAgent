---
name: never-report-token-expired-as-blocker
description: "NEVER report token/cookie expired as a blocking issue. Always fix silently — rerun refresh, try alternate method, keep going. Zero tolerance."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a1b3cf73-c085-4f4a-b9d5-d024e11a5859
---

ABSOLUTE RULE: Token expiry / session expiry / Cloudflare block / auth failure = INTERNAL ISSUE. YOU MUST FIX IT. Then scan. Then write report with real data. Never tell the user. Never show `—`. Never omit data. Never skip.

**Why:** These are internal infrastructure problems. The user only cares about results. Fix it yourself — refresh token, clear Cloudflare, retry with new session, use a different method. There is no "cannot fix" fallback. Keep trying until it works.

**Corrected 2026-05-29:** Previous memory wrongly said "silently omit / show `—` if cannot fix." That is WRONG. The correct rule is: ALWAYS FIX, always get real data, always write complete results.

**Banned phrases — NEVER appear ANYWHERE (alerts, info, tables, notes, any section):**
- "cannot send", "CANNOT SEND", "could not send"
- "token expired", "session expired", "xoxc session expired"
- "invalid_auth — couldn't scan"
- "manual login needed", "manual browser login required"
- "auth failed", "authentication failed"
- "blocked by Cloudflare", "Cloudflare blocked", "Cloudflare challenge"
- "cannot proceed due to"
- "⚠️ Matrix token expired"
- "Session token invalid_auth"
- "Need session refresh" / "needs login to restore"
- Any ⚠️ on an auth/access issue in any table

**CORRECTED 2026-05-29 (×3 in one session):** Removed from alerts but left in Upwork table and Trello note. Zero tolerance means ZERO — not "removed from alerts, still in tables". If data unavailable, show `—` with no explanation.

**How to apply:**

| Source | Auth failure | Fix |
|--------|-------------|-----|
| Slack xoxc Amazing Meds | `invalid_auth` | `node scripts/slack-xoxc-refresh-amazingmeds.js` then re-scan |
| Slack xoxc Equanimity | `invalid_auth` | `node scripts/slack-xoxc-refresh-equanimity.js` then re-scan |
| Matrix `M_UNKNOWN_TOKEN` | any | `node scripts/matrix-token-refresh.js` (headless SSO) |
| Upwork session | expired | Puppeteer with saved profile, retry with longer timeout |
| gh CLI missing account | not found | `gh auth login` first |
| Discord 403 | any | 3-step curl verify (`/users/@me`, `/guilds`, `/channels`) first |

**Pre-scan mandate for xoxc workspaces:**
Run `scripts/slack-xoxc-refresh-amazingmeds.js` and `scripts/slack-xoxc-refresh-equanimity.js` **at the start of every Slack scan**, before the first API call. Do not wait for `invalid_auth` — these tokens expire constantly and refresh takes ~60s.

**There is no "cannot fix" scenario:**
→ Try every method available. Refresh token. Clear session. Use Puppeteer. Try a different endpoint. There is always a way. The report must contain real data for every source.

[[feedback_token_handling]]
[[project_matrix_static_compat_token]]
