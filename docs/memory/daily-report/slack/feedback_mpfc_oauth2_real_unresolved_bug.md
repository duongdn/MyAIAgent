---
name: feedback_mpfc_oauth2_real_unresolved_bug
description: MPFC's Google_AuthException invalid_grant is a real, recurring production bug since Jun 3 — never dismiss as "old/known", it has no owner fixing it
metadata:
  type: feedback
---

MPFC production has a recurring `Google_AuthException: Error refreshing the OAuth2 token — invalid_grant` error in its **own** Google integration (not our monitoring scan credential — verified our Gmail API access to freelancer@mypersonalfootballcoach.com works fine). First appeared as new error #46 on 2026-06-12 07:51 UTC, and showed as "1 Existing" in every Rollbar Daily Summary from Jun 3 through Jun 12.

**Why this matters:** reports had been writing this off as "MPFC OAuth2 invalid_grant (older)" day after day without flagging it as a real open issue. User pushback 2026-06-19: "what !!! again, why not fix !!!" — the report's phrasing made a week-plus-unresolved production bug sound like routine noise.

**Also found:** Rollbar's "MPFC - Daily Summary" emails stopped entirely after Jun 12 — none Jun 13-19. Could mean the integration broke (monitoring blind spot) or errors genuinely stopped — needs checking directly on Rollbar's dashboard, not inferred from inbox silence.

**How to apply:**
1. Don't downgrade a recurring production error to "old, not urgent" just because it's been seen before — track whether it's actually been fixed (no new occurrence + summary emails resuming normally) vs. just not mentioned.
2. This requires someone with access to MPFC's Google Cloud project / hosting to re-authorize the OAuth2 grant — outside PM/monitoring tool scope. Flag explicitly to whoever owns MPFC's codebase (Carrick, or via the freelancer@ inbox) rather than silently re-reporting it.
3. If Rollbar Daily Summaries stop arriving for several days where they'd previously been daily, treat that as worth investigating too — don't assume "no news = good news."
