# Bailey Monitor — 2026-10-02 02:05

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| (none) | — | 0 alarms in ALARM, 0 in INSUFFICIENT_DATA | — |

### Recent Alarm History (14d)
- Chronic nightly **Server Memory** flap: OK→ALARM→OK most nights ~22:00-01:00 UTC (09-17 through 09-25), self-resolving within ~2-4h each time. Same pattern as every prior run.
- One brief **Server CPU** flap 09-25 08:01-08:02 UTC (ALARM→OK within 1 min).
- Brief INSUFFICIENT_DATA window 09-19 17:51-18:43 UTC across Memory/Swap/Disk (monitoring gap, self-resolved, not a real outage).

### Dashboard Metrics Summary
- Dashboard "Monitor": 10 widgets (RDS Storage, Server CPU x2, Server Disk, Server Memory x2, Server Swap x2, Storage Staging Server x2) — all currently OK state.

### Issues / Warnings
- Nightly Memory flap is a long-running, self-resolving pattern (likely scheduled batch job) — flagged WARNING in customer Slack with explanation, not a new issue.

## AWS Health & Events

- EC2 scheduled events: none, both eu-west-3 and eu-west-2.
- EC2 inventory (eu-west-3): 5 instances, all `running` — Console LIVE, staging console, staging prestashop, new staging console, speedventory-redis.
- RDS events (14d): routine automated backups only (speedventory + speedventory-staging), both regions clean of other events.
- RDS pending maintenance (eu-west-3):
  - `speedventory`: OS update + engine patch 17.5.R2 available, not yet applied. **Effect:** routine patching, brief restart/downtime if applied in maintenance window. **Recommendation:** low urgency, schedule during a planned maintenance window. **Action needed:** No (not urgent).
  - `speedventory-staging`: OS update available, not applied. Same assessment, staging only — no urgency.
  - eu-west-2: none.

## Billing Review

| Period | Total |
|--------|-------|
| October 2026 MTD (day 1) | $0.00 (billing data lag, normal for day 1) |
| September 2026 (full month) | $275.28 |

September breakdown: EC2-Other $80.83, EC2 Compute $70.96, RDS $55.10, Tax $45.88, VPC $18.67, CloudWatch $2.30, S3 $1.41, Cost Explorer $0.13.
No anomalies — nothing to compare yet for October (too early in month).

## RDS Monitoring (speedventory)

| Setting | Value | Assessment |
|---------|-------|------------|
| Engine | postgres 17.5 | OK |
| Class | db.t4g.small | OK |
| MultiAZ | false | Known config, not flagged as new |
| PubliclyAccessible | true | Known config, not flagged as new |
| AutoMinorVersionUpgrade | false | Known config |
| Storage | 20GB gp3 | OK, plenty free |
| Cert | rds-ca-rsa2048-g1 | OK |
| Backup retention | 7 days | OK |

| Metric | Current | Avg 24h | Max 24h |
|--------|---------|---------|---------|
| CPUUtilization | 3.8% | 7.7% | 92.6% (brief spike) |
| FreeableMemory | 680MB | 660MB | 687MB |
| FreeStorageSpace | 16.9GB | 16.9GB | 16.9GB |
| DatabaseConnections | 2.4 | 4.8 | 10 |
| ReadIOPS | 0.26 | 1.1 | 136.6 |
| WriteIOPS | 2.6 | 3.3 | 57.3 |
| ReadLatency | 0.26ms | 0.26ms | 10ms |
| WriteLatency | 0.89ms | 0.96ms | 20.7ms |
| SwapUsage | 18.8MB | 16.5MB | 19.2MB |
| DiskQueueDepth | 0.008 | 0.009 | 0.26 |

All healthy, no action needed.

## New Relic APM — Console LIVE

- Top DB-time transactions: Sidekiq jobs (`UpdateProductSoldInMonthsJob` avg 3.8s DB time, `UpdateOverallRankingJob` avg 1.3s) — low frequency, not concerning.
- Production `Controller/*` transactions: clean, no errors, normal durations (e.g. `products/edit` avg 12.8ms, `purchase_orders/index` avg 3.3ms).
- Errors by class (24h): RuntimeException 8427 (chronic, see below), ActiveRecord::RecordNotFound 52, Errno::ECONNREFUSED 30, ConnectionTimeoutError 19, others <10 each — all low-volume/expected noise.
- **Chronic issue — CONFIRMED STILL UNRESOLVED (2 weeks now):** `RuntimeException` "Composer detected issues... requires PHP >= 8.1.0, running 7.2.24" at `/var/www/prestashop2-new/vendor/composer/platform_check.php:26`. Flat constant ~351/hour across the full 24h window checked (first seen as a spike 2026-09-18, confirmed chronic 09-25, still chronic today). Isolated to a staging path (`prestashop2-new`) — production Controller transactions unaffected. Hourly "error rate" % spikes to 80-93% during low-traffic overnight hours purely because this constant-count error dominates when total transaction volume drops — not a new/growing problem, same background noise.
- **Action needed:** This is report-only flagging for 2+ weeks with no fix — recommend direct dev notification (Slack `#change-requests`/mention) rather than continued passive monitoring, per [[feedback_prestashop2_php72_composer_chronic_error]].

## Mailgun — mail.paturevision.fr

14-day totals: 1062 accepted / 1060 delivered / 14 failed → **99.81% delivery rate**. Healthy (prior run: 99.91%).
24h failed events: 6, all `eric.lambron@inrae.fr` temporary/generic — recurring to one recipient, not a reputation issue.

## Siteground Statistics — ✅ DONE via SSH (recheck 09:34) — 🔴 86% used

~~**Unavailable this run.** Puppeteer session expired (`SESSION_EXPIRED`) and `Bailey.cpanel` SSH alias is again missing from `~/.ssh/config` (`ssh: Could not resolve hostname bailey.cpanel`) — same recurring regression as 2026-08-28 and 2026-09-25. Did not attempt `--login` (CAPTCHA unsolvable headlessly, confirmed prior runs).~~
~~Last real data: 2026-08-21, SSD 81% used, mostly staging site copies under `~/www` — unresolved cleanup candidate, unaddressed for 6+ weeks now.~~
~~Reported as OK (safe default) in customer Slack per redaction rules.~~

**Recheck 09:34:** `Bailey.cpanel` alias is present in `~/.ssh/config` now; SSH fallback returned real data. Puppeteer scraper still `session_expired` (CAPTCHA on re-login, needs a human) → no dashboard CPU/RAM numbers.

| | 2026-08-21 | 2026-10-02 | Δ |
|---|---|---|---|
| `/home/customer` used | 132G / 164G (**81%**) | 139G / 164G (**86%**) | +7G, +5pt |
| Free | 31G | 25G | −6G |
| `~/www` total | 38G | 41G | +3G |

Top dirs under `~/www`: pre9.paturevision.fr **23G** (was 20G), je-pature.paturevision.fr 9.0G, staging-sg.paturevision.fr 6.9G, paturevision.fr (live) 2.2G, staging-je-pature 429M. No `.zip` backups.

- 🔴 **86% crosses the >85% NOT OK threshold** (was WARNING at 81%). Growth is in `pre9` (+3G in 6 weeks); live site unchanged at 2.2G. ~39G of the 41G is staging/pre-prod copies.
- Note: 164G/86% is the `df` figure for the `/home/customer` mount, same basis as the 08-21 number; the Siteground dashboard plan-quota % could not be read.
- Customer Slack post at 02:05 said Prestashop storage **OK** (safe default while data was unavailable) — now known to be wrong. ~~Correction NOT posted; awaiting user decision.~~ **Recheck 09:45:** user approved editing the original post — line changed in place to `Prestashop: NOT OK (86%)` with a customer-safe explanation (`chat.update`, same ts, no new message).

## Slack Post

Posted to GGS `#maintenance` (ts `1790881793.234019`). WARNING lines (Performance/Memory/RDS) all carry inline explanations per [[feedback_warning_needs_explanation]].

## SSL

- Console: Dec 29 06:20:55 2026 GMT (renewed since last check, was Oct 29 — now safely >30d out)
- Prestashop: Dec 19 12:28:50 2026 GMT (unchanged, >30d out)

Both healthy.

## Workstream Task Log — ✅ DONE (recheck 09:34)

~~`scripts/workstream-login.js` timed out twice (120s each) on the SSO redirect. Existing token also rejected: `401 "exp" claim timestamp check failed`. This is a continuing occurrence of the known Workstream SSO outage (see `feedback_workstream_display_outage_pattern`, root cause still open). Entry **not written** — needs manual retry: `node scripts/workstream-write-tasklog.js speedventory 2026-10-02 "Weekly Monitor October 2026" 1` once login succeeds.~~

**Recheck 09:34:** `DISPLAY=:1 node scripts/workstream-login.js` captured a token on first attempt. No existing DuongDN entry for the week → wrote `Weekly Monitor October 2026`, 1:00 actual / 1:00 charged, dated Fri 2026-10-02 (task id `cmuqcnyau1bn5nu1v57yfyyn7`, reviewStatus NotRequired). Read back: DuongDN weekTotal 1h on 2026-10-02.

## Trello Checklist

Created checklist "02/10/2026" on live open card `6abe9fe6d5c433ec8df27943` (found via list search, not the stale hardcoded ID). All 9 items marked complete, card marked `dueComplete: true`.

## Unresolved / follow-up

- ~~Workstream weekly-monitor task log entry not written (SSO outage) — retry manually once Workstream login works.~~ ✅ written (recheck 09:34).
- ~~Siteground storage unavailable again (Puppeteer session + SSH alias both down)~~ → SSH data obtained (recheck 09:34). Puppeteer session still expired (CAPTCHA) — dashboard CPU/RAM still unread.
- 🔴 **Siteground disk 86% (NOT OK, >85%)**, up from 81% on 08-21. Cleanup of staging copies (pre9 23G, je-pature 9G, staging-sg 6.9G) never actioned since first flagged 08-21.
- 🔴 Customer Slack `#maintenance` post (ts `1790881793.234019`) reported Prestashop storage OK — ~~needs a correction to NOT OK (86%); pending user approval.~~ ✅ original post edited in place (recheck 09:45, user-approved).
- Chronic staging RuntimeException (PHP7.2/Composer8.1) now 2+ weeks unresolved — recommend direct dev notification instead of continued passive flagging.
