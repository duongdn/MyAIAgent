---
name: Fountain Monday plan check must wait until after 09:30 +07
description: @trinhmtt typically posts W{n} plan Mon 08:30-09:30 +07. Daily report runs ~08:42 Mon — if Fountain agent fetches before plan posts, it sees old W{n-1} plan and falsely flags "W{n} plan absent". Must wait/re-check.
type: feedback
---

@trinhmtt posts the weekly Fountain plan in `!EWnVDAxbTGsBxPkaaI:nustechnology.com` Monday morning between **08:30 and 09:30 +07** (verified: W26 posted Mon 2026-05-11 09:03:24).

The Monday daily report typically runs **08:42–09:00 +07**. If the Fountain agent fetches Matrix history at this window, it may see only the previous week's plan (W{n-1}) and falsely report "W{n} plan NOT yet posted".

**Why:** User corrected on 2026-05-12. The 2026-05-11 report flagged "W26 plan absent" as a MED alert and SKIPPED the Fountain Trello item. Direct re-fetch on 2026-05-12 confirmed @trinhmtt posted W26 plan Mon 09:03:24 — just minutes after yesterday's report likely finalized.

**How to apply:**
1. On Monday daily report runs (before ~10:00 +07), the Fountain agent MUST either:
   - **Wait** until 09:30 +07 before fetching Matrix plan history, OR
   - **Re-check** Matrix plan history just before report finalize if the first scan found no W{n} plan
2. Never finalize "W{n} plan absent" alert on Monday before 09:30 +07. If still absent at 09:30+, flag as legitimate concern.
3. Tue-Fri runs are unaffected — by then plan has been posted for ≥24h.
4. Recovery (when missed): re-run `/daily-report fountain matrix` later in the morning to update; mark Fountain Trello complete if plan is found.

**Anti-pattern observed:** Yesterday's report ran the Fountain piece in a subagent that scanned Matrix once at ~08:50 (before plan posted) and never refreshed. The MED alert + Trello skip cascaded from that single stale read.
