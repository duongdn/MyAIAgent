---
name: mpfc-missed-rebills-caught-up-after-server-move
description: 2026-10-23 new server (MM 3.1.1) charged 87 members £1,218.56 for rebills stuck since 2026-05-20 on old server; root cause still open
metadata:
  type: project
---
2026-10-23 03:13-03:17 UTC, right after the move to the new server (live-php83), MemberMouse's first `mm_local_billing_daily_maintenance` (repairCrashedSubscriptions) re-billed 87 real members (+2 test accounts), £1,218.56 total. These were Stripe rebills due between 2026-05-20 and 2026-10-19 that the old server never completed. About 25% of rebills in that window were affected. Each subscription was charged once, with the next charge moved to ~23/11. Saul noticed the Stripe spike; the list was sent to Saul on WhatsApp the same day, and we told him we were investigating.

The billing engine code is identical between `live` and `live-php83`. The likely cause is that the old server's daily-maintenance cron never ran or never repaired the crashed rebills. This is unverified, because SSH to the old server (142.93.46.109) is blocked.

**Why:** a server/plugin migration can trigger a mass catch-up of billing.
**How to apply:** before any MPFC migration or MM upgrade, query `mm_scheduled_events` (event_type=1, status!=1, scheduled_date<NOW()) for stuck or overdue rebills and warn Saul before they get charged.
