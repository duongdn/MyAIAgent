# Bailey Monitor — 2026-09-18 08:51

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason (latest) | Since |
|-------|-------|--------|-------|
| RDS Storage | OK | last threshold cross 05/12/22 | old |
| Server CPU | OK | last cross 04/09/26 07:29 | - |
| Server CPU 2 | OK | last cross 28/08/26 08:49 | - |
| Server Disk Available | OK | last cross 08/04/26 | - |
| Server Memory | OK | last cross 18/09/26 00:57 | - |
| Server Memory 2 | OK | last cross 27/04/26 | - |
| Server Swap Usaged | OK | last cross 17/09/26 00:57 | - |
| Server Swap Usaged 2 | OK | last cross 27/04/26 | - |
| Storage Staging Server | OK | last cross 18/08/25 | - |
| Storage staging server Pre | OK | last cross 03/06/26 | - |

No alarms currently in ALARM or INSUFFICIENT_DATA.

### Recent Alarm History (14d)
- **Server Memory**: flips OK↔ALARM nightly, ~22:00–01:00 UTC, self-resolving every day 09/04–09/18 (14+ recurring instances). Matches known pattern — see memory `feedback_warning_needs_explanation` incident context, nightly batch job spike.
- **Server Swap Usaged**: brief flip on 09/05 and 09/16-17 (short-lived, self-resolved within ~2h).
- **Server CPU**: one brief flip 09/04 07:32-07:34 (2 min), self-resolved.

### Dashboard Metrics Summary
10 widgets tracked (RDS Storage, Server CPU x2, Server Disk Available, Server Memory x2, Server Swap Usaged x2, Storage Staging Server x2). All within normal current values.

### Issues / Warnings
- Nightly Server Memory alarm flip is a recurring, self-resolving pattern (14+ days) — likely a scheduled batch job. Not actionable unless it stops self-resolving.

---

## AWS Health & Events (eu-west-2 / eu-west-3)

- **EC2 scheduled events**: none in either region.
- **EC2 inventory (eu-west-3)**: 4 running instances — Console LIVE, staging console, staging prestashop, new staging console. eu-west-2: none.
- **RDS events (14d)**: routine automated snapshot/backup completions only (speedventory, speedventory-staging) — no errors/failovers.
- **RDS pending maintenance**:
  - `speedventory`: OS update available; engine patch 17.5.R2 available.
    - **Effect**: routine OS + Postgres engine patch, brief downtime (~seconds, Multi-AZ would make it zero but this instance is single-AZ so expect a short blip).
    - **Recommendation**: Low urgency, not security-critical-flagged. Schedule during next maintenance window.
    - **Action needed?**: No immediate action; schedule opportunistically.
  - `speedventory-staging`: OS update available only. Low urgency, staging environment.

---

## Billing Review

| Period | Total | Top services |
|--------|-------|---------------|
| Current month (2026-09-01 → 09-18, 18/30 days) | $145.60 | EC2-Other $42.90, EC2 Compute $37.24, RDS $30.43, Tax $24.26, VPC $9.93 |
| Last month full (2026-08) | $247.10 | EC2-Other $77.05, EC2 Compute $70.17, Tax $41.18, RDS $36.06, VPC $18.60 |

18 days into September tracking well under last month's pace (proportionally ~$243 projected for full month vs $247 last month — flat, no anomaly). No service >50% increase. No daily spike detected.

---

## RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|-------|-------|------------|
| MultiAZ | false | ⚠️ no automatic failover — internal note only, not customer-facing per redaction rules |
| PubliclyAccessible | true | ⚠️ security config — internal note only |
| AutoMinorVersionUpgrade | false | pending patch above is manual |
| Storage | 20 GB gp3 | fine, see FreeStorageSpace below |
| Engine | Postgres 17.5 | current |
| Cert | rds-ca-rsa2048-g1 | not expiring imminently |
| Class | db.t4g.small | - |

### Metrics (24h current/avg/max)
| Metric | Current | Avg24h | Max24h |
|--------|---------|--------|--------|
| CPUUtilization | 3.7% | 7.7% | 92.5% (brief spike) |
| FreeableMemory | 647MB | 632MB | 663MB |
| FreeStorageSpace | 15.8GB free (~79% free) | - | - |
| DatabaseConnections | 2.1 | 4.8 | 10 |
| ReadIOPS/WriteIOPS | 0.26 / 2.39 | 0.79 / 3.20 | 174.5 / 50.6 |
| Read/WriteLatency | negligible | negligible | negligible |
| SwapUsage | ~15.1MB | ~13.8MB | ~16.1MB |
| DiskQueueDepth | 0.007 | 0.01 | 0.30 |

### Issues Found
- CPU max24h spike to 92.5% (brief, single datapoint) — not sustained, likely a batch/backup job, no action needed.
- MultiAZ=false and PubliclyAccessible=true — pre-existing config, flagged internally per skill rule (>6mo old, not a new finding); not surfaced to customer.

### Recommendations
- None urgent. Consider MultiAZ if uptime SLA tightens (cost tradeoff).

---

## New Relic APM — Console LIVE

- **Console LIVE app error rate (last 24h)**: 0.4% in the most recent 3h window — healthy.
- **Note**: NR account also carries a stale/unrelated legacy entity "PHP Application" (old Prestashop2-new agent running PHP 7.2, Composer requires 8.1 — 7168 RuntimeException hits/24h, ~99% error rate). This is NOT part of Console LIVE and appears abandoned/broken monitoring, not a live incident — excluded from customer-facing status. Unresolved question: should this stale NR entity be removed to stop skewing account-wide error queries?
- **Top Sidekiq jobs by DB time**: UpdateProductSoldInMonthsJob (~1.9s db time, 1 run), SaveCurrencyRateJob (~1.7s, 1 run), UpdateOverallRankingJob (~0.9s avg, 2 runs) — all low-frequency, no concern.
- **Top errors (Console LIVE app, excluding stale PHP Application)**: ActiveRecord::RecordNotFound (39/24h, order lookup misses), ActionView::Template::Error (10), ActiveJob::DeserializationError (9, missing ShippingLabel), InvalidAuthenticityToken (6) — all low-volume, consistent with normal background noise, no new pattern.

---

## Mailgun — mail.paturevision.fr

14-day delivery: 1121 accepted, 1109 delivered, 34 failed → **98.93% delivery rate**. Within OK range (>95% threshold). No day dropped below 94.8%. No bounce/complaint API pulled this run (not critical given healthy aggregate rate).

---

## Siteground Storage

- **Puppeteer scraper**: session expired (`SESSION_EXPIRED`), same recurring headless-CAPTCHA limitation — see memory `feedback_siteground_captcha_no_ssh_fallback`. Not re-attempted with `--login` (needs interactive human CAPTCHA solve).
- **SSH fallback (`Bailey.cpanel`) — worked**, real data:
  - Overall disk: **137G / 164G used = 85%** (up from 81% on 2026-08-21, continuing to climb).
  - `~/www` breakdown (42G total): `pre9.paturevision.fr` 24G, `je-pature.paturevision.fr` 8.9G, `staging-sg.paturevision.fr` 7.1G, `paturevision.fr` (live) 2.2G, `staging-je-pature.paturevision.fr` 429M — bulk is staging/legacy site copies (pre9, staging-sg, staging-je-pature ≈ 31.5G of the 42G), consistent with prior finding.
  - No large zip/backup files found in `~/www` root this run.
  - `~/www` (42G) accounts for only part of the 137G used — the rest (~95G) is outside this directory (other home dirs, mail, logs, backups not checked this run).
- **Flag**: 85% crosses into NOT-OK-adjacent territory (>85% threshold) — WARNING/borderline, recurring and worsening trend (81%→85% in ~4 weeks). Root cause still staging copies per prior finding; unresolved whether user wants cleanup.

---

## Slack Post

Posted to GLOBAL GRAZING SERVICES `#maintenance` (C0338NXK3SB) — see below for exact text.

## Unresolved Questions
1. Siteground disk climbing 81%→85% over ~4 weeks (staging copies) — does the user want these cleaned up now?
2. Stale/abandoned "PHP Application" New Relic entity (old Prestashop2-new PHP 7.2, ~99% error rate) skews account NRQL error queries — should it be removed/disabled?
3. RDS `speedventory` MultiAZ=false / PubliclyAccessible=true are longstanding config choices — no new finding, but worth periodic confirmation these are intentional.
