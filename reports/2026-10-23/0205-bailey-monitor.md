# Bailey Monitor — 23/10/2026 02:05

## CloudWatch — Bailey (eu-west-3)
- Alarms: 10 configured. 0 in ALARM, 0 in INSUFFICIENT_DATA.
- Alarm history (14d): no state changes.
- **All clear.**

## AWS Health & Events
- EC2 scheduled events: none in eu-west-3 or eu-west-2.
- Instances (eu-west-3, all running): Console LIVE (t3.large), Console Production, staging console, new staging console, staging pretashop (t3.medium), speedventory-redis (t3.small). There are no instances in eu-west-2.
- RDS events (14d): routine daily automated snapshots only (speedventory 13:00 UTC, staging 12:36 UTC). There are no failures.
- Pending maintenance (unchanged from previous weeks):
  - speedventory: OS system-update + engine patch 17.5.R2. No forced or auto-apply date is set.
  - speedventory-staging: OS system-update + engine patch 18.4.R2.
  - **Effect:** a short reboot of a Single-AZ instance, about 5–10 min of downtime. **Recommendation:** apply in the Mon 03:00–03:30 UTC window, staging first. **Action needed:** yes, but not urgent.

## Billing
| Service | Oct MTD (to 21/10) | Sep full |
|---|---|---|
| EC2 - Other | $62.71 | $82.41 |
| EC2 Compute | $60.24 | $71.31 |
| RDS | $37.97 | $55.18 |
| Tax (1st-of-month accrual) | $35.80 | $46.29 |
| VPC | $15.20 | $18.70 |
| S3 / CloudWatch / CE | $1.15 / $0.66 / $0.15 | $1.41 / $2.31 / $0.13 |
| **Total** | **$213.88** | **$277.74** |

- Daily spend is flat at about $8.3–8.6/day. The 01/10 figure of $44.24 is the tax accrual, which is normal. 21/10 was $9.73, a small bump to watch. No service is up more than 50%, so there are no anomalies.

## RDS — speedventory
| Config | Value | Assessment |
|---|---|---|
| Class / engine | db.t4g.small / PG 17.5 | ok |
| MultiAZ | false | ⚠️ no failover (internal only) |
| PubliclyAccessible | true | ⚠️ internal only, not posted to Slack |
| AutoMinorVersionUpgrade | false | ⚠️ the patch must be applied manually |
| Storage | 20GB alloc (max 100), 16.9GB free | ok |
| Cert | valid until 2027-06-08 | ok |
| Pending modifications | none | ok |

| Metric | 1h | avg24h | max24h | max14d |
|---|---|---|---|---|
| CPU % | 3.8 | 7.8 | 94.2 | 95.0 |
| FreeableMemory | 568MB | 559MB | 622MB | 713MB |
| Swap | 43MB | 42MB | 44MB | 67MB |
| Connections | 8.5 | 9.1 | 20 | 20 |
| Read/Write IOPS | 0.3/2.5 | 2.7/3.9 | 915/132 | 915/132 |
| Read/Write latency | 0.2/1.1ms | 0.3/1.0ms | 10/27ms | 20/27ms |
| DiskQueueDepth | 0.01 | 0.01 | 2.36 | 2.36 |

- The CPU max of 94% was a short burst lining up with the nightly Sidekiq batch jobs (UpdateProductSoldInMonthsJob / UpdateOverallRankingJob). It is in line with the 14-day max and the average stays below 8%. This is not an issue.
- Swap went up to 43MB from 29MB last week. It is slowly creeping up, so keep watching it.

## New Relic APM — Console LIVE
- 24h: 161,156 transactions, 5.4% flagged as errors. Almost all of that is the staging RuntimeException below.
- 🔴 **RuntimeException** (staging `prestashop2-new`, PHP 7.2 vs Composer >=8.1): 8,431 in 24h, a flat ~1,054 per 3h (about 351/h). It has been **unresolved for 5 weeks** since 18/09 and does not affect production.
- Production error classes (24h): RecordNotFound 80, **Errno::ECONNREFUSED port 25 (78 — an SMTP connect to localhost was refused, so some mail sent from the app may not go out; check the mailer config)**, StandardError 30, NotNullViolation `currency_rate_histories.rates` 25 (SaveCurrencyRateJob got an empty rate), WiceGrid `html_columns` template error 22, NoMethodError `orders` for nil 13, DeserializationError ShippingLabel 7, Redis::CannotConnectError 5 (DNS `redis:6379` — leftover config pointing at the old docker host?).

| Sidekiq job | count | avg DB | max DB |
|---|---|---|---|
| UpdateProductSoldInMonthsJob | 2 | 4731 | 8126 |
| UpdateOverallRankingJob | 3 | 1991 | 4241 (last week 7.8k) |
| SaveCurrencyRateJob | 27 | 82 | 2134 |
| ImportRoutingPlanJob | 3 | 320 | 580 |
- Heavy DB time is limited to the nightly window (~22:00–02:00 UTC). Controllers stay fast (avg DB under 5).

## Mailgun — mail.paturevision.fr
- 14d: 1,214 accepted, 1,205 delivered, 9 permanent fails. **99.26%** delivery.
- Failed in the last 24h:
  - laposte.net: 2 for l.aymeric0, 1 for verdiervivian. All were permanent `5.7.1 Suspicion de contenu non sollicité`, meaning La Poste flagged them as spam. This is a new pattern to watch.
  - laura@paturevision.fr: 3 temporary local fails, the same internal soft-fail as before.

## Siteground (SSH)
- `df` /home/customer: 175.3GB total, 138.7GB used. Dashboard % = (138.66−10.61)/175.27 = **73.1% → WARNING** (was 71.8% last week).
- ~/www: pre9 15G (was 14G), je-pature 9.0G, staging-sg 3.9G, live paturevision.fr 2.2G, staging-je-pature 429M. There are no zip files.
- The scraper was skipped because of the known CAPTCHA.

## SSL
- Console: Dec 29 06:20:55 2026 GMT (about 67 days left)
- Prestashop: Dec 19 12:28:50 2026 GMT (about 57 days left)

## Slack Post
- Posted to GGS `#maintenance`, ts `1792696052.953949`. Prestashop storage WARNING (73%) and RDS WARNING were both posted with explanations. Billing $213.88 MTD, Mailgun 99.3%, SSL dates included. Everything else OK.
- Note: the customer is active in the channel, reporting go-live stock/picking bugs (21–22/10). Amy said she'll handle them. These are dev topics, not monitoring items.

## Workstream Task Log — ✅ DONE
- speedventory 2026-10-23 (Fri) "Weekly Monitor October 2026" 1:00, id `cmvjwy9ur03q6lp1yk41n4hdq`. SSO login OK on the first try.

## Trello Checklist — ✅ DONE
- Open card `6ada4f3d932249ea87716469` on list 686b1f67…: checklist "23/10/2026" with 9/9 complete, card `dueComplete: true`.

## Unresolved / follow-up
- ⚠️ Siteground storage is at 73.1% and still growing (pre9 +1G/week). The staging cleanup is still pending.
- 🔴 Staging RuntimeException (PHP 7.2/Composer) has been flat at ~351/h for 5 weeks. It needs direct dev action.
- 🟡 New this week: production ECONNREFUSED on port 25 (78/24h, possibly lost app mail), Redis DNS errors (5), currency rate NotNullViolation (25), La Poste spam rejections.
- RDS pending patch on speedventory. A restart window needs to be scheduled.
