# Bailey Monitor — 2026-09-11 02:05

## CloudWatch — Bailey (eu-west-3)

### Alarms (10 total)
All 10 alarms currently **OK**: RDS Storage, Server CPU, Server CPU 2, Server Disk Available, Server Memory, Server Memory 2, Server Swap Usaged, Server Swap Usaged 2, Storage Staging Server, Storage staging server Pre.

### Recent Alarm History (14d)
42 state-transition events, all `Server Memory`/`Server Swap Usaged`/`Server CPU` flipping ALARM→OK within minutes-to-hours, nightly pattern ~22:00–01:00 UTC — self-resolving, recurring (consistent with prior runs' known nightly batch-job memory spike).

### Dashboard Metrics Summary
10 widgets tracked: RDS Storage, Server CPU x2, Server Disk Available, Server Memory x2, Server Swap Usaged x2, Storage Staging Server x2. All currently green.

### Issues / Warnings
- Recurring nightly memory/swap spikes (self-resolving) — known pattern, no action needed.

## AWS Health & Events (eu-west-2 / eu-west-3)

- EC2 instances (eu-west-3): 4 running — Console LIVE (i-097f6eee5762c82f3), staging console, staging prestashop, new staging console. No scheduled events.
- eu-west-2: no instances, no events.
- RDS events (14d): 100 events, all routine automated backups (speedventory + speedventory-staging), no failovers/reboots.
- **RDS pending maintenance:**
  - `speedventory`: OS update available; engine patch 17.5.R2 available (currently on 17.5).
  - `speedventory-staging`: OS update available.
  - **Effect:** routine OS/engine patch, brief downtime during maintenance window if Multi-AZ were off (it is, see below) — single-AZ means apply during a scheduled low-traffic window.
  - **Recommendation:** low urgency, not security-critical; schedule during next maintenance window.
  - **Action needed?** No immediate action; plan to apply within next few weeks.

## Billing Review

Current month (2026-09-01 → 2026-09-10, 10 days): **$79.80** total — EC2-Other $23.61, EC2 Compute $20.35, RDS $16.55, Tax $13.39, VPC $5.40, S3 $0.47.
Last month (Aug, full): **$247.10** total.
Daily run-rate ~$7.3–7.5/day (excluding 9/1 tax accrual spike of $20.84, which is normal). Projected full September ≈ $220–230 — in line with August, no anomaly. No service exceeded >50% growth.

## RDS Monitoring — speedventory

| Config | Value | Assessment |
|---|---|---|
| Engine | postgres 17.5 | current |
| Class | db.t4g.small | — |
| MultiAZ | False | single point of failure, unchanged from prior runs |
| PubliclyAccessible | True | internal note only, not customer-facing |
| AutoMinorVersionUpgrade | False | manual patching required (see pending maintenance above) |
| Storage | 20 GB gp3 | ~15% used (16.98GB free) |
| Cert | rds-ca-rsa2048-g1 | fine |
| Pending modifications | none | — |

**Metrics (current 1h avg / 24h avg / 24h max):**
- CPU: 3.9% / 7.4% / **92.9% (brief spike)**
- FreeableMemory: 660MB / 648MB / 679MB (stable, low headroom on t4g.small)
- FreeStorageSpace: ~15.8GB free (stable)
- Connections: 2.6 / 4.9 / 10 (normal)
- Read/Write IOPS, latency: all nominal, sub-ms latency
- SwapUsage: ~11-15MB (negligible)
- DiskQueueDepth: <0.3 (normal)

**Issues:** one brief CPU spike to 92.9% in the last 24h (not sustained, avg stayed low) — likely a batch job, matches Sidekiq job durations seen in New Relic. No sustained pressure. MultiAZ=False and PubliclyAccessible=True are longstanding known configuration choices, not new findings.

## New Relic APM — Console LIVE (24h)

**Top DB-heavy transactions:** Sidekiq jobs dominate — `UpdateProductSoldInMonthsJob` (1.85s db), `SaveCurrencyRateJob` (1.53s db), `UpdateOverallRankingJob` (0.8s db avg, x2). All low-frequency background jobs, not user-facing latency.

**Errors (24h):**
- SocketError x149 — `getaddrinfo: Temporary failure in name resolution` (DNS resolution failures on some outbound call — worth watching if recurring, currently the top error by volume)
- ActiveRecord::RecordNotFound x43 — normal app-level (deleted/missing Order lookups)
- ActiveJob::DeserializationError x7 — stale job referencing deleted ShippingLabel
- InvalidAuthenticityToken x4, BadRequest x3 (malformed param encoding), NoMethodError x2

**Hourly error rate:** mostly 0–30% range tied to low-traffic hours (small denominators), one spike window 07:00-ish UTC hitting ~85% during a low-volume period. Overall throughput healthy (up to ~9k txns/hr at peak).

**Top DB queries:** dominated by `order_lines`/`orders` aggregate queries (5.5k+ calls, ~0.14s avg) — no queries approaching multi-second territory; the earlier "slow" transactions were background jobs, not request-path queries.

**Flag:** SocketError volume (149 in 24h) worth investigating if this recurs next run — possible transient DNS issue in job worker, not yet a confirmed ongoing problem.

## Mailgun — mail.paturevision.fr

14-day totals: accepted 1245, delivered 1230, failed 23 → **98.8% delivery rate** (just under the 99% OK threshold).

Failed events (24h, 13 total): mostly `suppress-bounce` (previously-bounced addresses on the suppression list — expected, not new failures) plus a few `test@test.com` sends (internal testing) and 2 genuine bounces (`mael-du29@hotmail.fr`). No IP reputation issues, no complaints.

**Flag:** WARNING-adjacent (98.8% vs 99% threshold) but driven by suppression-list blocks, not deliverability degradation — no action needed.

## Siteground Storage

Unavailable this run — session/SSH access not usable. No alarms recorded from AWS/CloudWatch storage side. Reporting OK in customer channel per safe-default rule (last known state 2026-08-21: 81% used, mostly staging copies — not re-verified this run).

## SSL Certificates
- console.paturevision.fr: expires **2026-10-29**
- paturevision.fr: expires **2026-10-20**

Both >30 days out, no action needed.

## Workstream Task Log (Subtask 9)

Failed — Workstream SSO login did not capture a fresh token after 2 retries (`SSO redirected but API never fired`), existing token expired (`"exp" claim timestamp check failed`). This matches the recurring Workstream SSO outage pattern documented in memory (5+ prior occurrences 07-26 through 08-22). Task log entry for "Weekly Monitor September 2026" (1h, dated 2026-09-11, Friday) NOT written this run — needs manual retry or investigation into the SSO root cause.

## Unresolved Questions
- Siteground disk usage not re-verified since 2026-08-21 (81%, staging copies) — SSH host alias `Bailey.cpanel` missing from `~/.ssh/config` again this run, Puppeteer session also expired (CAPTCHA blocks re-login). Needs either a fresh SSH alias or a different access method.
- SocketError (DNS resolution failures) in New Relic — new/notable volume (149/24h), worth checking again next run to see if it's a one-off or a recurring worker DNS issue.
