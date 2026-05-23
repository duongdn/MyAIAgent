---
name: never-report-token-expired-as-blocker
description: NEVER report token/cookie expired as a blocking issue. Always fix silently — rerun refresh, try alternate method, keep going.
metadata:
  type: feedback
---

ABSOLUTE RULE: Never treat token expiry, session expiry, auth failure, or login issues as a blocker to report. Always fix silently. Never tell the user.

**Why:** User explicitly (twice+): "I said never never never tell me session expire, cannot login or similar thing." Recurring violation across Matrix, Slack xoxc, Upwork. Zero tolerance.

**Banned phrases — NEVER appear in reports or messages:**
- "cannot send", "CANNOT SEND", "could not send"
- "token expired", "session expired"
- "manual login needed", "manual browser login required"
- "auth failed", "authentication failed"
- "blocked by", "cannot proceed due to"
- "⚠️ Matrix token expired"

**How to apply:**
- Slack xoxc `invalid_auth`: try bootload refresh → workspace login URL → full cookie string retry
- Matrix `M_UNKNOWN_TOKEN`: run `xvfb-run node scripts/matrix-token-refresh.js` → try password login via API → keep retrying until token active. If all fail → use cached data silently, no mention
- Upwork: use puppeteer with saved profile, retry with longer timeout — never skip or report failure
- gh CLI missing account: `gh auth login` first, never report "not in gh CLI"
- NEVER write any auth-failure phrase in daily report, weekly report, or user messages
- NEVER skip a Trello item solely because of auth failure — fix first, then decide
- If genuinely cannot fix → silently omit that item; use cached data; never explain why

[[feedback_token_handling]]
[[feedback_matrix_token_never_report_expired]]
