# Bailey Monitor — 2026-10-16 02:05

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| (none) | — | 0 in ALARM, 0 in INSUFFICIENT_DATA | — |

### Recent Alarm History (14d)
- **No state changes at all in 14 days.** The nightly Server Memory flap is still gone (last one 09-24).

### Dashboard Metrics Summary
- Monitor dashboard has 10 widgets: RDS Storage, Server CPU/Disk/Memory/Swap (+ "2" variants), Storage Staging Server, Storage staging server Pre. No alarm attached to any of them fired.

### Issues / Warnings
- None. All clear.

## AWS Health & Events

- EC2 scheduled events: none (eu-west-3, eu-west-2). eu-west-2 has no instances.
- EC2 inventory (eu-west-3), all `running`: Console LIVE, staging console, staging pretashop, new staging console, speedventory-redis.
- RDS events (14d): only the daily automated backups (speedventory at 13:00 UTC, staging at 12:36 UTC). Latest restorable time 2026-10-15 19:00 UTC.
- RDS pending maintenance:
  - `speedventory`: OS update + engine patch 17.5.R2. Same as previous weeks. **Effect:** short restart (a few minutes). It is single-AZ, so that means real downtime. **Recommendation:** low urgency, apply in a planned window. **Action needed:** not urgent. Until it is applied, the RDS line stays WARNING every week.
  - `speedventory-staging`: OS update + engine patch **18.4.R2** (new this week; it was OS-only before). Staging only, no action needed.

## Billing Review

| Service | Oct 1–14 MTD | Sep (full) |
|---|---|---|
| EC2-Other | $41.61 | $82.41 |
| EC2 Compute | $39.63 | $71.31 |
| RDS | $25.31 | $55.18 |
| Tax | $23.77 | $46.29 |
| VPC | $10.08 | $18.70 |
| S3 | $0.73 | $1.41 |
| Other | $0.12 | $2.44 |
| **Total** | **$141.25** | **$277.74** |

Daily: 10-01 $32.21 (includes tax accrual, normal). 10-02 to 10-14 flat at $8.31–8.50/day. No anomalies. No service is rising more than 50%. Pace is in line with September.

## RDS Monitoring (speedventory)

| Setting | Value | Assessment |
|---|---|---|
| Engine / class | postgres 17.5 / db.t4g.small | OK |
| MultiAZ | false | known config (flag) |
| PubliclyAccessible | true | known config (flag) |
| AutoMinorVersionUpgrade | false | known config (flag) |
| Storage | 20GB, 16.9GB free | OK |
| CA cert | rds-ca-rsa2048-g1, valid till 2027-06-08 | OK (>6 mo) |
| Backup retention | 7d, no pending modifications | OK |

| Metric | Current | Avg 24h | Max 24h |
|---|---|---|---|
| CPU | 4.0% | 7.5% | 92.0% (brief, nightly job) |
| FreeableMemory | 589MB | 570MB | 617MB (was ~680MB last week, slight drop) |
| FreeStorage | 16.9GB | 16.9GB | 16.9GB |
| Connections | 3 | 4.6 | 10 |
| Read/Write IOPS | 0.26 / 4.0 | 0.66 / 3.3 | 110 / 50 |
| Read/Write latency | 0.2 / 0.6 ms | 0.2 / 0.9 ms | 10 / 7.8 ms |
| Swap | 28.8MB | 26.6MB | 31.8MB (was ~16MB last week) |
| DiskQueueDepth | 0.007 | 0.007 | 0.076 |
| Net Rx/Tx | 1.5 / 18.8 KB/s | 10.4 / 106 KB/s | 121 KB/s / 1.9 MB/s |

Healthy. Minor drift to watch: free memory is down about 100MB and swap is up about 12MB compared with last week. Both are still small.

## New Relic APM — Console LIVE

- 24h: 108,111 transactions, avg 277ms. `Controller/*` had 98,879 transactions with an error rate of **0.006%**, so production is clean. (The overall 7.9% error rate comes almost entirely from the staging RuntimeException.)
- Slow DB (>1s), Sidekiq only: `UpdateOverallRankingJob` 3 runs, avg 3.2s / **max 7.8s** (last week max 0.95s, keep an eye on it). `SaveCurrencyRateJob` max 2.0s, `UpdateProductSoldInMonthsJob` 1.4s. All are background jobs with no user impact.
- Errors by class (24h): RuntimeException 8430, RecordNotFound 53, NoMethodError 17 (`orders` for nil), NotNullViolation 10 (`currency_rate_histories.rates`, recurring, tied to SaveCurrencyRateJob), DeserializationError 5, InvalidAuthenticityToken 4, ENOENT 2 (`/app/tmp/schenker_routing_plan.gz`), UnknownFormat 2, RecordNotUnique 1, ECONNREFUSED 1 (staging2.paturevision.fr).
- 🔴 **Chronic RuntimeException, now 4 weeks unresolved** (first seen 09-18). Composer requires PHP ≥8.1, but staging `/var/www/prestashop2-new` runs 7.2.24. The count is flat at 1053–1054 per 3h block (~351/h), the same as every week. Production is not affected. It still needs direct dev action: upgrade PHP or disable the poller.
- Top DB spans: two `order_lines` queries run about 2.09k times/day each, avg 1.0–1.3ms. Fine.

## Mailgun — mail.paturevision.fr

14d: 1063 accepted / 1054 delivered → **99.15%** (last week 99.32%). OK (≥99%). 9 permanent failures. 10-12 had 20 temporary failures (retried).
24h failed:
- `caillauddidier@yahoo.fr`: 13 temporary failures (Yahoo rate limit) plus 2 permanent ("old" = gave up after retrying). Yahoo is throttling this sender. Watch it; if it repeats, check the volume going to Yahoo.
- `hopenbnum@free.fr`: suppress-bounce x2 (dead address, already suppressed).
- Internal @paturevision.fr temporary/generic failures: laura x6, sarah x4, karine x2, joey x2. The company's own inbound mail is soft-failing. Worth checking the paturevision.fr MX/mailbox side.

## Siteground Statistics — ⚠️ WARNING 71.8%

- SSH `Bailey.cpanel` works on this host (mpfc). Puppeteer was not tried (CAPTCHA, see memory).
- `df -B1`: size 175.27GB, used 136.51GB. Dashboard formula (used − 10.61)/size = **71.8%**. Last week it was 69.0%, so it grew about 4.9GB in one week and has crossed the 70% WARNING line.
- `~/www` = 29G (10-09 recheck: 25G). Breakdown: pre9.paturevision.fr 14G, je-pature 9.0G, staging-sg 3.9G, live paturevision.fr 2.2G, staging-je-pature 429M. There are no zip files in `~/www`. The rest of home is small (.opcache 741M, .claude 230M).
- The growth is in `~/www` staging copies. The pre9 directory has historically been the one that grows.
- 🟡 Customer cleanup request (~04/10: "only need one staging and live") is still open.

## Slack Post

Posted to GGS `#maintenance`, ts `1792091429.753779`. Performance OK, **Prestashop storage WARNING (72%)** with an explanation, RDS WARNING with an explanation, Billing $141.25 MTD, Mailgun 99.2%, SSL dates. Everything else OK.

## SSL

- Console: Dec 29 06:20:55 2026 GMT
- Prestashop: Dec 19 12:28:50 2026 GMT

Both are more than 30 days away. Console expires in about 74 days, so watch for renewal at the start of December.

## Workstream Task Log — ✅ DONE (recheck 08:50)

**Recheck 08:50:** Seeded 7 auth.nustechnology.com SSO cookies from Chrome Profile 9 (`WORKSTREAM_SSO_COOKIES`). Token captured on attempt 1. Wrote speedventory 2026-10-16 "Weekly Monitor October 2026" 1:00 (task id `cmvab7s370xq6o11uxsknocfh`).

~~
`workstream-login.js` was tried twice (normal, then `--force`). Both failed with "SSO redirected but API never fired" (Keycloak cookies alive). The write returned `401 "exp" claim timestamp check failed`. This is the same recurring SSO outage. Retry: `DISPLAY=:1 node scripts/workstream-login.js && node scripts/workstream-write-tasklog.js speedventory 2026-10-16 "Weekly Monitor October 2026" 1` (2026-10-16 is that week's Friday).~~

## Trello Checklist

Open card `6ad114a450fbefa53e864b88`, found on list 686b1f67… rather than via the stale hardcoded ID. Created checklist "16/10/2026" with all 9 items complete. Card `dueComplete: true`.

## Unresolved / follow-up

- ~~❌ Workstream task log not written (SSO outage).~~ ✅ Written on recheck 08:50.
- ⚠️ Siteground 71.8%, above 70%. Growth of +4.9GB/week is in the staging copies. The customer's cleanup request (~04/10) is still pending, and Nick needs to decide which staging copies to delete.
- 🔴 Staging RuntimeException (PHP 7.2 vs Composer 8.1): 4 weeks old, still flat ~351/h, needs direct dev action.
- RDS pending patch on speedventory. Schedule a window so RDS can go back to OK.
- 🟡 Watch: UpdateOverallRankingJob max DB time 7.8s (was <1s), Yahoo rate-limiting caillauddidier@yahoo.fr, internal @paturevision.fr soft fails, RDS free memory −100MB / swap +12MB week over week.
