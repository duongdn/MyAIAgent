# Bailey Monitor — 2026-07-10 02:05 (UTC+7)

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms (current)
| Alarm | State |
|-------|-------|
| All 10 alarms | OK |

No alarm currently in ALARM or INSUFFICIENT_DATA.

### Recent Alarm History (14d)
Only "Server Memory" (Console LIVE, i-097f6eee5762c82f3) flapped — nightly ALARM→OK cycle every day from 2026-06-25 through 2026-07-09, always resolving within ~30-90 min (typically ~22:00-01:00 UTC window). Recurring pattern, consistent with prior reports — no other alarm touched ALARM state in the window.

### Dashboard Metrics Summary (cur / avg24h / max24h)
| Metric | Instance | Current | Avg24h | Max24h | Threshold |
|---|---|---|---|---|---|
| RDS FreeStorageSpace | speedventory | 15.8GB | 15.8GB | 15.8GB | <5GB |
| Server CPU | Console LIVE | 1.7% | 7.6% | 98.4% | >70% |
| Server CPU 2 | staging pretashop | 3.2% | 3.3% | 12.5% | >70% |
| Server Disk Available | Console LIVE | 56.2% | 56.4% | 56.5% | <5% |
| Server Memory | Console LIVE | 52.5% | 44.5% | 97.8% | >90% |
| Server Memory 2 | staging pretashop | 52.0% | 52.6% | 56.1% | >90% |
| Server Swap | Console LIVE | 210MB | 381MB | 2384MB | >5000MB |
| Server Swap 2 | staging pretashop | 436MB | 436MB | 436MB | >2000MB |
| Storage Staging Server | staging console | 45.3% | 45.3% | 45.3% | <5% |
| Storage staging server Pre | staging pretashop | **9.6%** | 9.6% | 9.6% | <=5% |

### Issues / Warnings
- **Server Memory nightly spike** (Console LIVE): recurring 14+ days, self-resolving, matches known pattern — likely scheduled batch job around 22:00-01:00 UTC. Not customer-impacting (auto-resolves).
- **Server CPU max24 hit 98.4%** on Console LIVE — transient spike, likely correlated with same nightly job. Currently 1.7%.
- **Storage staging server Pre at 9.6% available** — approaching the 5% ALARM threshold (LessThanOrEqualToThreshold). Not in ALARM yet but worth monitoring — staging environment only, not production.

## 2. AWS Health & Events

- EC2 scheduled events: none in eu-west-2 or eu-west-3.
- EC2 inventory (eu-west-3): Console LIVE, staging console, staging pretashop, new staging console — all `running`.
- RDS events (14d, eu-west-3): only routine daily automated backups on `speedventory`, all completed successfully (13:00 UTC daily). eu-west-2: no events.
- RDS pending maintenance (speedventory, eu-west-3):
  - **system-update**: OS update available. Effect: brief reboot during maintenance window. Not urgent — routine OS patch.
  - **db-upgrade**: engine patch 17.5.R2 available. Effect: minor version bump, brief downtime during apply. Not urgent — routine patch, no CVE noted.
  - Recommendation: schedule both during next maintenance window (low urgency, no forcing function).
  - No pending maintenance in eu-west-2.

## 3. Billing Review

| Period | Total |
|---|---|
| June 2026 (full month) | $171.35 |
| July 2026 (MTD, 9 days) | $54.26 |

By service (July MTD): EC2-Other $20.86, EC2-Compute $17.18, Tax $9.04, VPC $4.92, RDS $1.37, S3 $0.80, Cost Explorer $0.08.

Daily trend (Jul 1-9): $13.68, $5.74, $5.74, $5.68, $5.63, $5.69, $5.66, $5.76, $0.67(partial day, billing lag).

No service exceeds 50% growth — July is tracking well below June's pace across every line item. No anomalies. Jul 1 tax bump is normal accrual.

## 4. RDS Monitoring (speedventory, eu-west-3)

### Instance Config
| Field | Value | Assessment |
|---|---|---|
| Class | db.t4g.small | — |
| Engine | postgres 17.5 | — |
| MultiAZ | **False** | Single-AZ — flag for internal review (not customer-facing) |
| PubliclyAccessible | **True** | Flag for internal review (not customer-facing) |
| AutoMinorVersionUpgrade | **False** | Manual patching required — see pending maintenance above |
| Storage | 20GB gp3, encrypted | OK |
| Backup retention | 7 days | OK |
| Cert expiry | 2027-06-08 | OK, >6mo out |

### Metrics (cur / avg24h / max24h)
| Metric | Current | Avg24h | Max24h |
|---|---|---|---|
| CPUUtilization | 3.4% | 7.1% | 93.2% |
| FreeableMemory | 692MB | 672MB | 709MB |
| FreeStorageSpace | 15.8GB (79% free) | — | — |
| DatabaseConnections | 1.2 | 3.6 | 10 |
| ReadIOPS / WriteIOPS | 0.3 / 2.4 | 0.5 / 3.5 | 113 / 45 |
| Read/Write Latency | ~0ms | ~0ms | 10ms / 14ms |
| SwapUsage | 15.6MB | 16.3MB | 17.4MB |
| DiskQueueDepth | 0.01 | 0.01 | 0.11 |

CPU max24 spike (93%) correlates with the same nightly batch window seen in CloudWatch alarms. No sustained pressure, connections/latency all nominal.

## 5. New Relic APM — Console LIVE (24h)

- Error rate: mostly 0-0.4%, one early-window blip to 5.2% on low traffic (77 reqs). No sustained elevation.
- Top DB-time consumers: Sidekiq jobs — `UpdateProductSoldInMonthsJob` (1.58s db, 1 run), `UpdateOverallRankingJob` (526ms avg, 3 runs), `SaveCurrencyRateJob` (370ms avg, 4 runs). All single/low-frequency, not a trend.
- Errors by class (24h): `ActiveRecord::RecordNotFound` (61, stale order IDs), `InvalidAuthenticityToken` (7), `ActiveJob::DeserializationError` (5), `BadRequest` (4, bad UTF-8), `NotNullViolation` (3, null currency rate insert — worth a look at `SaveCurrencyRateJob` upstream source), 1 each of `TypeError`/`NoMethodError`/`Date::Error`. All low-volume, app-level, no new pattern.
- Slowest DB span (24h): all under 1s; heaviest by volume is an `order_lines` join at 0.12s avg / 6321 calls. No query needs indexing attention right now.

## 6. Mailgun — mail.paturevision.fr

14-day delivery: 1908 accepted, 1897 delivered → **99.4%** delivery rate.
Failed events (24h): all `temporary`/`generic`, to internal `@paturevision.fr` recipients (karine, laura, sarah) — no permanent bounces, no reputation signal.
Bounces/complaints endpoints: `unauthorized` (API key lacks scope) — not blocking, no evidence of delivery issue from stats.

## 7. Siteground Storage

**Not obtained this run.** Puppeteer login hit a CAPTCHA challenge (visible-browser retry via DISPLAY=:1 confirmed CAPTCHA present, not solvable headlessly). SSH fallback (`Bailey.cpanel`) has no host entry configured in this environment's `~/.ssh/config` — no alternate path available this run. No alarms exist elsewhere suggesting a storage problem; defaulting Prestashop/storage status to OK per safe-default rule.

## 8. SSL

- console.paturevision.fr: expires 2026-08-30 (>30d out, OK)
- paturevision.fr: expires 2026-08-21 (>30d out, OK)

## Slack Summary Posted

See #maintenance (GGS workspace) — condensed customer-safe version.

## Unresolved Questions
- Siteground storage/CPU/RAM not verified this run (CAPTCHA-gated, no SSH fallback configured) — recommend setting up `Bailey.cpanel` SSH alias for a data-based fallback next time.
- S3 backup / AWS CloudTrail / "recalculate stock" lines in the Slack template have no corresponding data-gathering subtask in the skill file — reported OK by default (no negative evidence), not independently verified this run.
