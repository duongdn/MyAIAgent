# Bailey Monitor — 2026-10-09 02:05

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| (none) | — | 0 in ALARM, 0 in INSUFFICIENT_DATA | — |

### Recent Alarm History (14d)
- Only 2 flaps in 14 days: Server Memory OK→ALARM→OK 2026-09-24 22:23 UTC, Server CPU 2026-09-25 08:01–08:02 UTC (1 min).
- ✅ **The chronic nightly Server Memory flap has stopped** — no occurrence since 09-24. Timing matches Redis queue being moved to a standalone server (`speedventory-redis`, announced in #maintenance 09-28).
- Note: last week's Slack post said memory spiked "most days this week" — the 14d history doesn't support that (only 09-24); that wording was overstated.

### Issues / Warnings
- None. All clear.

## AWS Health & Events

- EC2 scheduled events: none (eu-west-3, eu-west-2). eu-west-2 has no instances.
- EC2 inventory (eu-west-3), all `running`: Console LIVE, staging console, staging pretashop, new staging console, speedventory-redis.
- RDS events (14d): automated snapshots/backups only. Latest `speedventory` snapshot 2026-10-08 13:00 UTC (available), latest restorable 2026-10-08 19:00 UTC.
- RDS pending maintenance (unchanged for weeks):
  - `speedventory`: OS update + engine patch 17.5.R2. **Effect:** brief restart (minutes, single-AZ = real downtime). **Recommendation:** low urgency, apply in a planned window. **Action needed:** No (not urgent), but it keeps the RDS line on WARNING weekly — worth scheduling.
  - `speedventory-staging`: OS update. Staging only. No action needed.

## Billing Review

| Service | Oct 1–8 MTD | Sep (full) |
|---|---|---|
| EC2 Compute | $19.35 | $71.31 |
| EC2-Other | $19.25 | $82.41 |
| RDS | $12.43 | $55.18 |
| Tax | $11.27 | $46.29 |
| VPC | $4.98 | $18.70 |
| S3 | $0.32 | $1.41 |
| Other | $0.03 | $2.44 |
| **Total** | **$67.63** | **$277.74** |

Daily: 10-01 $19.71 (incl. tax accrual, normal), 10-02→10-06 ~$8.36–8.41/day, 10-07 $6.05 (partial), 10-08 $0 (data lag). Flat, no anomalies. New Redis instance hasn't visibly raised daily spend.

## RDS Monitoring (speedventory)

| Setting | Value | Assessment |
|---|---|---|
| Engine / class | postgres 17.5 / db.t4g.small | OK |
| MultiAZ | false | known config (flag) |
| PubliclyAccessible | true | known config (flag) |
| AutoMinorVersionUpgrade | false | known config (flag) |
| Storage | 20GB gp3, 16.9GB free | OK |
| CA cert | rds-ca-rsa2048-g1, valid till 2027-06-08 | OK (>6 mo) |
| Backup retention | 7d | OK |

| Metric | Current | Avg 24h | Max 24h |
|---|---|---|---|
| CPU | 4.1% | 7.3% | 92.4% (brief, nightly job) |
| FreeableMemory | 685MB | 679MB | 717MB |
| FreeStorage | 16.9GB | 16.9GB | 16.9GB |
| Connections | 2.8 | 4.5 | 10 |
| Read/Write IOPS | 0.27 / 2.9 | 0.51 / 3.2 | 126.5 / 49.8 |
| Read/Write latency | 0.7 / 0.6 ms | 0.3 / 0.8 ms | 10 / 7.7 ms |
| Swap | 16.3MB | 16.2MB | 18.5MB |
| DiskQueueDepth | 0.006 | 0.007 | 0.078 |
| Net Rx/Tx | 1.4 / 16.7 KB/s | 8.6 / 88.5 KB/s | 113 KB/s / 2.9 MB/s |

Healthy.

## New Relic APM — Console LIVE

- 24h: 84,003 transactions, avg 231ms. `Controller/*` 74,701 txns, error rate **0.005%** — production clean.
- Slow DB (>1s) — Sidekiq only, 1–3 runs each: `SaveCurrencyRateJob` 2.1s, `UpdateProductSoldInMonthsJob` 1.3s, `UpdateOverallRankingJob` avg 0.6s / max 0.95s. Fine.
- Errors by class (24h): RuntimeException **8431**, ActiveRecord::RecordNotFound 75, Errno::ECONNREFUSED 38 (FTP 3.69.58.217:21), RecordNotUnique 11 (`routing_plans_pkey`), NoMethodError 6, NotNullViolation 6 (`currency_rate_histories.rates` — likely ties to SaveCurrencyRateJob), SocketError 5, DeserializationError 3.
- 🔴 **Chronic RuntimeException — 3 weeks unresolved** (first seen 09-18): Composer requires PHP ≥8.1, staging `/var/www/prestashop2-new` runs 7.2.24. Perfectly flat 1053–1054 per 3h block (~351/h) all day. Not production-impacting. Still report-only — recommend direct dev notification / disabling the poller. Possibly resolves itself if the old Prestashop staging copies get deleted (customer request below).

## Mailgun — mail.paturevision.fr

14d: 1035 accepted / 1028 delivered / 27 failed (incl. retries) → **99.32%** (prev 99.81%). OK (≥99%).
24h failed: `hopenbnum@free.fr` permanent bounce + suppress-bounce x2 (dead address, now suppressed); temporary/generic x2 each for arnaud.mazaudon@limousine.org, c.lavalley@west-telecom.com, laura@paturevision.fr. No reputation issue. Dip from last week is small, watch.

## Siteground Statistics — ✅ OK 69% (recheck 08:45, user-confirmed from dashboard)

**Recheck 08:45:** user confirmed Siteground dashboard = **69%** → OK. Prior 86% was WRONG basis: it was `df` on `/home/customer` (164G shared server mount), not the account plan quota shown in dashboard. Today's run just carried that 86% forward. Slack line edited in place to `Prestashop: OK`.


- `Bailey.cpanel` SSH alias absent from `~/.ssh/config` again (`Could not resolve hostname`) — note this run's host user is `mpfc`, the alias may only exist in another user's/host's config.
- Puppeteer: `session_expired` (CAPTCHA on re-login, not retried).
- Per memory, did **not** post the "OK" safe default: carried last known **86% NOT OK** (2026-10-02) into Slack, since no cleanup has happened.
- 🟡 **Customer request open:** in #maintenance (~04/10) the customer asked to *"clean up and delete any old prestashop staging — we only need one staging and live"*; Nick replied he'd double-check whether they're used for testing first. Not yet actioned. Candidates: pre9 23G, je-pature 9.0G, staging-sg 6.9G (keep one staging). This would fix both the disk NOT OK and probably the chronic PHP 7.2 RuntimeException.

## Slack Post

Posted to GGS `#maintenance` (ts `1791486455.295929`). Performance OK, Memory OK (with note that the spikes stopped), ~~Prestashop storage NOT OK (86%)~~ → edited to OK (recheck 08:45), RDS WARNING with explanation.

## SSL

- Console: Dec 29 06:20:55 2026 GMT
- Prestashop: Dec 19 12:28:50 2026 GMT

Both >30d out.

## Workstream Task Log — ✅ DONE (recheck 08:45)

**Recheck 08:45:** login OK, written speedventory 2026-10-09 "Weekly Monitor October 2026" 1:00 (id `cmv0b7m0n00das41v41ehaehq`).


`workstream-login.js` failed: first attempt killed at 200s, retry (400s, 2 browser attempts) → "SSO redirected but API never fired", no token. Write → `401 "exp" claim timestamp check failed`. Known recurring SSO outage. Retry: `DISPLAY=:1 node scripts/workstream-login.js && node scripts/workstream-write-tasklog.js speedventory 2026-10-09 "Weekly Monitor October 2026" 1`.

## Trello Checklist

Open card `6ac7da25e32dde588cdb2995` (found on the list, not the stale hardcoded ID). Created checklist "09/10/2026", all 9 items complete, card `dueComplete: true`.

## Unresolved / follow-up

- ~~❌ Workstream task log not written~~ ✅ written (recheck 08:45)
- ~~⚠️ Siteground 86%~~ ✅ 69% OK per dashboard (user). 86% was `df` of shared mount, not quota. 02/10 Slack post also edited to OK (09:05, user-approved).
- 🟡 Customer cleanup request for old Prestashop staging copies (~04/10) — awaiting Nick's check; nothing deleted yet.
- 🔴 Staging RuntimeException (PHP 7.2 vs Composer 8.1) — 3 weeks, needs direct dev action.
- RDS pending patch on speedventory — schedule a maintenance window so RDS can go back to OK.

**Recheck 09:05 — root cause + formula:** SSH works (alias present). `df -B1`: size 175.27GB, used 131.58GB → raw 75.1%. Dashboard % = (used − 10.61GB system overhead)/size = **69.0%** ✅ matches. Wrong because (1) we used raw df % and (2) the 02:05 run did not re-measure: it said the SSH alias was missing and copied 10-02's 86%. Staging cleanup had already happened by then (~/www 41G→25G). Using that formula on 10-02 df (139GiB used) gives ~79%, which is WARNING, not NOT OK. Skill Subtask 7 updated with the formula.

**Recheck 09:15 — correction:** the alias was not missing at random. The 02:05 run happened on cron server `mpfc.mpfc.live`, which had no `Bailey.cpanel` ssh config or key. Fixed: config block + key added on mpfc and verified there (69.0%).
