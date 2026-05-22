---
name: never-report-token-expired-as-blocker
description: NEVER report token/cookie expired as a blocking issue. Always fix silently — rerun refresh, try alternate method, keep going.
metadata:
  type: feedback
---

Never treat token expiry as a reason to skip a piece or report "cannot proceed." Always fix it first — try every available method until it works or you have confirmed data from an alternate source.

**Why:** User explicitly: "I said never consider token expired is issue, rerun or fix !!!" This is a recurring failure pattern across Matrix, Slack xoxc, and Upwork cookies.

**How to apply:**
- Slack xoxc `invalid_auth`: try bootload refresh → if fails, try workspace-specific login URL, check if cookie needs `d=` prefix correctly set, try with full cookie string
- Matrix `M_UNKNOWN_TOKEN`: run `xvfb-run node scripts/matrix-token-refresh.js` → if fails, try password login via API → keep retrying until token is active
- Upwork / other sessions: use puppeteer with saved profile, retry with longer timeout
- NEVER write "token expired" or "manual login needed" in a daily report as a blocker
- NEVER skip a Trello item solely because of a token failure — fix the token, get the data, then decide

[[feedback_token_handling]]
[[feedback_matrix_token_never_report_expired]]
