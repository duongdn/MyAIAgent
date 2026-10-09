# Bailey Monitor — 2026-09-18 02:05

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| — | none in ALARM/INSUFFICIENT_DATA | — | — |

### Recent Alarm History (14d)
- Recurring **Server Memory Alarm** flapping OK↔ALARM nightly, ~22:00–01:00 UTC, every day 09-04 through 09-17. Self-resolving each time (chronic, long-running pattern, not new).
- **Server Swap Usage Alarm** flapped a handful of times alongside the memory spikes (09-05, 09-16).
- **Server CPU Alarm** brief single spike 09-04 07:32–07:34 UTC, self-resolved.

### Dashboard Metrics Summary
- No alarms currently active. Pattern consistent with prior runs — see [[feedback_warning_needs_explanation]].

### Issues / Warnings
- Nightly memory pressure recurring 14+ days — WARNING (customer-facing), non-critical, self-resolving.

## AWS Health & Event Log

- EC2: no scheduled events in eu-west-3 or eu-west-2.
- RDS events (14d): routine automated backups only (Backing up / Automated snapshot created / Finished DB Instance backup), both instances, no anomalies.
- RDS pending maintenance (eu-west-3):
  - **speedventory**: `system-update` (OS update available), `db-upgrade` (engine patch 17.5.R2 available). Effect: brief downtime during next maintenance window when applied. Low urgency — apply during a scheduled window, not urgent.
  - **speedventory-staging**: `system-update` only. Same low urgency.
- eu-west-2: no RDS events or maintenance items (no resources there).

## Billing Review

| Service | Current MTD (Sep 1–17) | Last month (Aug) |
|---|---|---|
| EC2 - Other | $42.49 | $77.05 |
| EC2 Compute | $36.58 | $70.17 |
| RDS | $29.85 | $36.06 |
| Tax | $23.90 | $41.18 |
| VPC | $9.75 | $18.60 |
| S3 | $0.75 | $1.46 |
| Cost Explorer | $0.05 | $0.17 |
| **Total** | **$143.38** | **$247.10 (full month)** |

Daily run-rate steady ~$7.35/day (Sep 1 $31.35 is tax accrual, normal). Projected full month ≈ $143.38 + 13×$7.35 + tax ≈ in line with last month. No service >50% increase. No anomaly.

## RDS Monitoring (speedventory)

| Field | Value | Assessment |
|---|---|---|
| Status | available | OK |
| Engine | postgres 17.5 | OK |
| Class | db.t4g.small | OK |
| MultiAZ | False | Known config, not re-flagged this run |
| PubliclyAccessible | True | Known config, not re-flagged this run |
| AutoMinorVersionUpgrade | False | Known config, not re-flagged this run |
| Storage | 20GB gp3, max 100GB | OK |
| Backup retention | 7 days | OK |
| Cert | rds-ca-rsa2048-g1 | OK, no near-term expiry |

### Metrics (current vs 24h avg / max)
| Metric | Current | Avg 24h | Max 24h |
|---|---|---|---|
| CPUUtilization | 4.3% | 7.7% | 92.5% (brief spike) |
| FreeableMemory | 670MB | 662MB | 694MB |
| FreeStorageSpace | 16.9GB free | 16.9GB | — |
| DatabaseConnections | 4-5 | 5.0 | 10 |
| ReadIOPS / WriteIOPS | 0.26 / 2.8 | 0.76 / 3.2 | 174 / 58 (brief) |
| Read/Write Latency | ~0ms | ~0ms | ~0.03ms |
| SwapUsage | 13.9MB | 14.2MB | 16.9MB |
| DiskQueueDepth | 0.008 | 0.01 | 0.30 |

No sustained pressure anywhere. One brief 92.5% CPU spike in the 24h window, not sustained, no alarm triggered.

## New Relic APM — Console LIVE

- 24h transaction error rate spiked to **14–16%** during 15:07–18:07 UTC today (ongoing at report time), up from <1% baseline earlier in the window. **NEW finding, not seen in prior runs.**
- Root cause: **4,789x `RuntimeException`** — `"Composer detected issues in your platform: Your Composer dependencies require a PHP version >= 8.1.0. You are running 7.2.24-0ubuntu0.18.04.17."` in `/var/www/prestashop2-new/vendor/composer/platform_check.php:26`. This is an application/dev-environment PHP-version mismatch, not an infra alarm — needs dev team investigation (likely a background PHP process/cron on an old runtime hitting updated Composer deps).
- Other errors are low-volume and pre-existing: `ActiveRecord::RecordNotFound` (39), `ActionView::Template::Error` (10), `ActiveJob::DeserializationError` (9, missing ShippingLabel), `ActiveRecord::NotNullViolation` (1, null quantity on picking_location_products — an app-level data bug worth a dev ticket).
- Slowest Sidekiq jobs (DB time): `UpdateProductSoldInMonthsJob` (2.0s), `SaveCurrencyRateJob` (1.6s), `UpdateOverallRankingJob` (0.8s) — all low frequency, not concerning.
- Controller-level DB times all sub-15ms — no query performance issue.

## Mailgun — mail.paturevision.fr

14-day delivery: 1,234 accepted, 1,218 delivered, 38 failed → **98.7%** delivery rate. Healthy, no bounce/complaint pattern of concern.

## Siteground Statistics

Unavailable this run — Puppeteer session expired (`SESSION_EXPIRED`) and `Bailey.cpanel` SSH host alias is again missing from `~/.ssh/config` (recurring intermittent regression, see [[feedback_siteground_captcha_no_ssh_fallback]]). Reported `OK` in customer Slack per safe-default/redaction rules. Last known real data: 81% disk used (2026-08-21), mostly staging copies — unresolved cleanup candidate, not re-verified this run.

## SSL

- console.paturevision.fr: expires **Oct 29 2026** — healthy, >30d out.
- paturevision.fr: expires **Oct 20 2026** — healthy, >30d out.

## Slack #maintenance Post

Posted successfully to GGS #maintenance (ts `1789672171.019159`).

## Workstream Task Log (Subtask 9)

**FAILED.** Two `workstream-login.js` retries both failed to capture a fresh token — first two attempts got SSO-redirected with live Keycloak cookies but the API token never fired; a second full retry hung indefinitely on the SSO redirect step and was killed after several minutes with no progress. This is the same recurring Workstream SSO outage pattern documented in [[feedback_workstream_display_outage_pattern]] (root cause still open, now an 11th+ occurrence). Task log entry for "Weekly Monitor September 2026" (`speedventory`, date 2026-09-18) was **not written** — needs manual retry later when SSO is responsive.

## Trello Checklist (Subtask 10)

Created checklist "18/09/2026" on live card `6aac2af62792e2b868aa185f` (https://trello.com/c/9JwIbx14/1405-bailey-monitor), all 9 items marked complete, card marked `dueComplete=true`.

## Unresolved Questions

1. New Relic PHP 7.2 vs Composer 8.1 RuntimeException (4,789x/24h, driving today's 14-16% error rate spike) — needs dev team to identify which process/cron runs the old PHP 7.2 binary and either upgrade it or pin Composer deps. Worth raising with the client/dev team directly.
2. Workstream task log entry for 2026-09-18 still not written — retry manually.
3. Siteground SSH alias (`Bailey.cpanel`) keeps disappearing from `~/.ssh/config` between sessions — worth investigating why it's not persistent.
