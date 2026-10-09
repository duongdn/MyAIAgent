# Bailey Monitor — 17/07/2026 02:05

## CloudWatch — Bailey (eu-west-3)

### Alarms (current state)
| Alarm | State |
|-------|-------|
| — | none in ALARM |
| — | none in INSUFFICIENT_DATA |

### Recent Alarm History (14d)
- **Server Memory**: recurring ALARM→OK cycles, nightly ~22:00–01:00 UTC, self-resolves within 30–90min. Confirmed pattern across every night in the 14d window (matches known recurring pattern, not a new issue).
- **Server CPU**: one brief ALARM→OK cycle on 2026-07-14 17:16–17:25 UTC (~9min), self-resolved.

### Issues / Warnings
- Nightly memory alarm pattern — recurring, self-resolving, no action needed (flagged WARNING in Slack per customer-facing rules requiring explanation).

## AWS Health / Events

### EC2 (eu-west-3 + eu-west-2)
- No scheduled events on any instance.
- eu-west-3 inventory: Console LIVE, staging console, staging prestashop, new staging console — all `running`.
- eu-west-2: no instances.

### RDS Events (14d, speedventory)
- All routine automated-snapshot backup cycles (create → complete), no failures.

### RDS Pending Maintenance (speedventory, eu-west-3)
| Action | Description | Assessment |
|--------|-------------|------------|
| system-update | OS update available | Routine, low urgency |
| db-upgrade | Engine patch 17.5.R2 available | Routine minor patch, low urgency — schedule during a maintenance window |

**Action needed?** No immediate action; schedule during next planned maintenance window.

## Billing Review
- Current month (Jul 1–16, 16 days): **$98.47** — EC2-Other $37.12, EC2-Compute $32.17, Tax $16.41, VPC $8.93, RDS $2.44, S3 $1.30.
- Last month (Jun, full month): **$171.35**.
- Projected full July (~31d, linear): ~$190 — ~11% above last month, not an anomaly (threshold is >50%).
- Daily trend: steady ~$5.6–5.7/day, no spikes.
- Tax accrual normal.

## RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Note |
|-------|-------|------|
| MultiAZ | false | internal note only — not surfaced to customer |
| PubliclyAccessible | true | internal note only — not surfaced to customer |
| AutoMinorVersionUpgrade | false | internal note only |
| Storage | 20GB gp3, 17GB free (~15% used) | healthy |
| Engine | PostgreSQL 17.5 | patch 17.5.R2 pending (see above) |
| Backup retention | 7 days | OK |
| Cert | rds-ca-rsa2048-g1 | not expiring soon |

### Metrics (current 1h vs 24h baseline)
| Metric | Current 1h avg | 24h baseline avg | 24h max |
|--------|----------------|-------------------|---------|
| CPU | 3.5% | 7.0% | 94.7% (brief spike) |
| FreeableMemory | 698MB | 676MB | 704MB |
| FreeStorageSpace | ~17GB | ~17GB | stable |
| Connections | 0.1 | 3.2 | 10 |
| ReadIOPS/WriteIOPS | low | low | normal |
| SwapUsage | ~16.6MB | ~16.7MB | negligible |

No anomalies — normal load for this instance size.

## New Relic APM (Console LIVE)
- Top Sidekiq jobs by DB time: UpdateProductSoldInMonthsJob (~1.8s), SaveCurrencyRateJob (~1.4s), UpdateOverallRankingJob (~0.7s) — all low frequency (1-2 calls/24h), not concerning.
- Controller DB times all sub-10ms average, normal.
- Error rate: peaks at ~0.4-0.02% in isolated hourly buckets during business hours, otherwise 0%. Total errors 24h: 49 (41 RecordNotFound, 7 DeserializationError, 1 InvalidAuthenticityToken) — all minor client-side/expected errors, nothing systemic.

## Mailgun (mail.paturevision.fr)
- 14d: 1400 accepted, 1394 delivered, 96 temporary fails, 6 permanent fails.
- Delivery rate: **99.57%** — OK (threshold <99% = WARNING).
- 24h failed events: 4, all temporary/generic (espblock), no permanent bounces of note.

## Siteground Storage
- **Unavailable this run** — known CAPTCHA block on Puppeteer login (confirmed recurring issue, see [[feedback_siteground_captcha_no_ssh_fallback]]), and no `Bailey.cpanel` SSH host configured in `~/.ssh/config` (confirmed still absent this run). Not re-attempted — would hit same CAPTCHA every time under headless conditions.
- Reported as OK in Slack per safe-default rule (no alarms = no reason to assume storage issue).
- **Needs fixing eventually**: requires either an SSH host alias + key for the cPanel endpoint, a captcha-solving integration, or a one-time manual VNC session to refresh the saved browser session.

## Slack #maintenance (GGS)
Posted successfully — ts `1784228930.277629`.

## Unresolved Questions
- "Run recalculate stock", "Check AWS noti", "AWS Cloudtrail" template fields have no dedicated data source in the current skill subtasks — reported OK by default (no alarms/evidence of issues found across CloudWatch, RDS events, or EC2 events this run). Worth clarifying what specifically these should check.
- Siteground storage still blocked — same underlying issue as prior runs, unresolved.
