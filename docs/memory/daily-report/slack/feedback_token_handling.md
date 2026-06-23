---
name: xoxc-token-refresh-mandatory-before-scan
description: Amazing Meds + Equanimity xoxc tokens expire regularly — MUST run refresh scripts BEFORE scanning, never report invalid_auth. Matrix token also requires refresh before reporting expired.
metadata:
  type: feedback
---

# MANDATORY: Fix tokens BEFORE scanning, NEVER report them as expired

## Rule (no exceptions)

**Amazing Meds and Equanimity xoxc tokens expire constantly.**
The ONLY acceptable workflow:

1. Run refresh script → then scan → then write results
2. NEVER write `invalid_auth`, `session expired`, or `couldn't scan` for these workspaces

**If the report contains "invalid_auth" or "couldn't scan" for Amazing Meds or Equanimity → that is a BUG. Fix it.**

**Why:** User has corrected this MULTIPLE times across many sessions (2026-04-17, 2026-05-19, 2026-05-28, and more). Every single time, the token was fixable in under 2 minutes with the refresh scripts. There is zero excuse for reporting the failure instead of fixing it.

---

## How to refresh (takes ~60 seconds each)

```bash
# Amazing Meds
node scripts/slack-xoxc-refresh-amazingmeds.js

# Equanimity
node scripts/slack-xoxc-refresh-equanimity.js
```

Both scripts:
- Log in via Puppeteer (email/password from config)
- Capture xoxc token from network intercept
- Validate via `auth.test`
- Save to `config/.slack-accounts.json` automatically

**Only escalate if the script itself errors AND login page is unreachable.** Never escalate just because the token was expired — that's normal, that's why the scripts exist.

---

## Proactive check at start of every Slack scan

Before scanning ANY xoxc workspace, verify token with `auth.test`:
```js
const check = await apiGet('https://slack.com/api/auth.test', { Authorization: 'Bearer ' + token, Cookie: 'd=' + cookie });
if (!check.ok) { /* run refresh script, then re-scan */ }
```

Do NOT attempt `search.messages` with a token you haven't verified. If `auth.test` fails → refresh → re-scan → THEN write results.

---

## Slack scan scripts must handle refresh inline

The daily Slack scan scripts (`scripts/daily-slack-scan-*.js`) must:
1. Check `auth.test` for xoxc accounts before scanning
2. If invalid → call `require('child_process').execSync('node scripts/slack-xoxc-refresh-amazingmeds.js')` or equanimity equivalent
3. Re-read config after refresh
4. Then scan with new token

**Why this matters:** A scan script that just reports `invalid_auth` and moves on leaves a blind spot in the daily report. The user cannot see Slack data that DOES exist.

---

## After refresh: what to scan

**Amazing Meds** (`amazingmeds.slack.com`, account: nick@nustechnology.com):
- Use `search.messages?query=after:{yesterday}&count=20`
- Look for: John Yi messages, Nick complaints, payment/deployment questions
- Gate: TuanNT task log >0h AND no client complaints

**Equanimity** (`equanimity-talk.slack.com`, account: carrick@nustechnology.com):
- Use `search.messages?query=after:{yesterday}&count=20`
- Marcel is adhoc, 0h expected — quiet = OK
- Gate: no Carrick/Marcel alerts

---

## Other tokens — same principle

| Token type | Fix method | When |
|-----------|-----------|------|
| Matrix M_UNKNOWN_TOKEN | `node scripts/matrix-token-refresh.js` | Before reporting expired |
| Discord 403 | 3-step curl verify first (`/users/@me`, `/guilds`, `/channels`) | Before reporting invalid |
| Slack xoxp | `node scripts/slack-verify-tokens.js` | Before reporting expired |
| Slack xoxc (Amazing Meds) | `node scripts/slack-xoxc-refresh-amazingmeds.js` | **PROACTIVELY before every scan** |
| Slack xoxc (Equanimity) | `node scripts/slack-xoxc-refresh-equanimity.js` | **PROACTIVELY before every scan** |

**How to apply:** The word "PROACTIVELY" above means: do not wait for `invalid_auth`. Run the refresh at the start of the Slack scan step, before the first API call to that workspace.
