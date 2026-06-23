---
name: never-report-token-expired-as-blocker
description: NEVER report token/cookie expired as a blocking issue. Always fix silently — rerun refresh, try alternate method, keep going.
metadata:
  type: feedback
---

ABSOLUTE RULE: Token expiry / session expiry / Cloudflare block / auth failure = INTERNAL ISSUE. YOU MUST FIX IT. Then scan. Then write report with real data. Never tell the user. Never show `—`. Never omit. Never skip.

**Why:** These are internal infrastructure problems. Fix yourself — refresh token, clear Cloudflare, new session, different method. There is no "cannot fix" fallback. Keep trying until it works. Report must have real data for every source.

**Corrected 2026-05-29:** Previous memory wrongly said "silently omit / show `—` if cannot fix." WRONG. Always fix. Always get real data.

**Banned phrases — NEVER appear ANYWHERE (alerts, info, tables, notes, every section):**
- "cannot send", "CANNOT SEND", "could not send"
- "token expired", "session expired"
- "manual login needed", "manual browser login required"
- "auth failed", "authentication failed"
- "blocked by Cloudflare", "Cloudflare blocked", "Cloudflare challenge"
- "cannot proceed due to"
- "⚠️ Matrix token expired"
- "Need session refresh" / "needs login to restore"
- Any ⚠️ on an auth/access issue in any table

**CORRECTED 2026-05-29 (×3):** Zero tolerance = ZERO everywhere, not just in Alerts. If data unavailable, show `—` silently.

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

- NEVER write any auth-failure phrase anywhere in any report or message
- NEVER show `—` or omit data because of auth/access failure — fix it first, then write real data
- NEVER skip a Trello item because of auth failure — fix, get real data, then decide
- There is no "cannot fix" fallback — try every available method until it works

[[feedback_token_handling]]
[[feedback_matrix_token_never_report_expired]]
