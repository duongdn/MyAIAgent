# Bailey Monitor — 24/07/2026 02:05 (UTC+7)

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| — | none in ALARM | — | — |
| — | none in INSUFFICIENT_DATA | — | — |

### Recent Alarm History (14d)
- **Server Memory**: repeated ALARM↔OK flap, nightly ~22:00–01:00 UTC, resolves within ~30–90 min each time. 20+ consecutive days now, same recurring pattern as prior weekly runs. No user action taken historically, self-resolving.
- No other alarms triggered in 14d window.

### Dashboard Metrics Summary (Monitor dashboard widgets)
RDS Storage, Server CPU, Server Disk Available, Server Memory, Server Swap Usage, Storage Staging Server, Server Swap Usage 2, Server CPU 2, Server Memory 2, Storage staging server Pre — all nominal, no flatlines/anomalies beyond the known nightly memory flap.

### Issues / Warnings
- Nightly Server Memory alarm flap — WARNING (recurring, self-resolving, no action needed).

---

## AWS Health & EC2/RDS Events

### EC2
- No scheduled events in eu-west-2 or eu-west-3.
- eu-west-3 inventory: Console LIVE (running), staging console (running), staging pretashop (running), new staging console (running).
- eu-west-2: no instances.

### RDS Events (14d)
- speedventory: daily automated snapshot backup completes successfully every day (07-20 through 07-23 confirmed), no failures.
- eu-west-2: no RDS events (no instances).

### RDS Pending Maintenance
| Resource | Action | Description | Effect | Urgency | Action needed? |
|---|---|---|---|---|---|
| speedventory | system-update | New OS update available | Routine OS patch, brief reboot possible | Low | Schedule during a maintenance window, not urgent |
| speedventory | db-upgrade | Engine patch 17.5.R2 available | Minor PostgreSQL patch version bump | Low | Schedule during a maintenance window, not urgent |

Same two pending actions as previous weekly runs — still not applied, still low urgency.

---

## Billing Review

| Period | Total | Notes |
|---|---|---|
| Current month (Jul 1–23) | $149.86 | Projected full month ≈ $202 |
| Last month (Jun) | $171.34 | — |

By service (current vs last month): EC2-Other $56.68 (was $80.35, down), EC2-Compute $48.48 (was $33.96, +42.7%, under 50% flag threshold), RDS $3.72 (was $5.21), S3 $1.74 (was $2.58), VPC $13.20 (was $18.00), CloudWatch $0.83 (was $2.40), Tax $25.07 (was $28.56). No service exceeds the 50% anomaly threshold. Daily spend steady ~$5.7–5.9/day aside from Jul 1 tax accrual ($29.71).

---

## RDS Monitoring (speedventory)

| Config | Value | Assessment |
|---|---|---|
| MultiAZ | false | Single-AZ, as before |
| PubliclyAccessible | true | Known/persistent config, not flagged externally |
| AutoMinorVersionUpgrade | false | Manual patching (explains pending db-upgrade above) |
| Storage | 20 GB gp3, ~16.9 GB free (~84%) | Healthy |
| Engine | PostgreSQL 17.5 | — |
| Cert expiry | 2027-06-08 | Fine, >6mo out |
| Backup retention | 7 days | — |

### Metrics (1h current vs 24h baseline)
| Metric | 1h avg | 24h avg | 24h max | Note |
|---|---|---|---|---|
| CPUUtilization | 3.4% | 6.9% | 92.9% | Brief spike coincides with daily 13:00 UTC snapshot window, not sustained |
| FreeableMemory | 695 MB | 674 MB | 700 MB | Stable |
| FreeStorageSpace | 16.9 GB | 17.0 GB | 17.0 GB | Stable, ~84% free |
| DatabaseConnections | 2.1 | 4.0 | 10 | Normal |
| ReadIOPS / WriteIOPS | 0.3 / 2.4 | 0.6 / 3.1 | 121.5 / 46.0 | Spike aligns with snapshot |
| Read/Write Latency | <1ms / <1ms | <1ms / <1ms | 60ms / 38ms | Normal |
| SwapUsage | 17.2 MB | 17.5 MB | 20.3 MB | Low, stable |
| Network Rx/Tx | 1.2 / 12.8 KB/s | 7.6 / 72.7 KB/s | 96.7 / 3181 KB/s | Tx spike aligns with snapshot |
| DiskQueueDepth | 0.007 | 0.008 | 0.22 | Negligible |

No issues found beyond the known pending maintenance.

---

## New Relic APM — Console LIVE

- Hourly error rate: mostly 0%, brief spikes to ~2.6% and ~0.45% during the 24h window, no sustained degradation.
- Errors by class (24h): `ActiveRecord::RecordNotFound` (37, stale order ID references), `ActionController::BadRequest` (6, invalid UTF-8 query params), `ActiveJob::DeserializationError` (6, missing ShippingLabel record), `ActionView::Template::Error` (1, nil email). All minor/expected application-level errors, no systemic issue.
- Top DB time consumers are Sidekiq background jobs (UpdateProductSoldInMonthsJob ~2.0s, SaveCurrencyRateJob ~1.4s, UpdateOverallRankingJob ~0.7s) — low frequency (1–2 calls/24h), not a concern.
- No slow controller/web transactions of note.

---

## Mailgun — mail.paturevision.fr

| Metric | 14d |
|---|---|
| Sent | 1,540 |
| Delivered | 1,540 |
| Delivery rate | 100.0% |

- 43 "failed" events in 24h, all temporary — `local verification problem - closing connection` against internal @paturevision.fr addresses (laura, karine, sarah) hitting an antispam appliance (mailspamprotection.com) — same recurring greylist-style pattern as before, all ultimately delivered on retry.
- No permanent bounces/complaints (endpoint returned unauthorized for this API key — not queried this run, key lacks that scope).

---

## Siteground Storage

- Puppeteer login hit the known CAPTCHA block again (`session_expired` → CAPTCHA, confirmed unsolvable headlessly). No `Bailey.cpanel` SSH host configured in `~/.ssh/config` (confirmed still absent). Per memory, not re-attempting — same unresolved limitation as prior runs. Reported as OK in the customer-facing Slack post (safe default, no known alarms).

## Additional check: S3 / AWS Backup
- AWS Backup (EBS): 7/7 days completed successfully in the last week.
- RDS native snapshots: daily, all succeeded.
- S3 bucket `paturevision-db-backups`: only 2 objects, most recent dated 2024-11-22 — appears unused/deprecated in favor of the native RDS snapshot + AWS Backup mechanisms above (both confirmed active). Not surfaced as a customer alarm since the actual backup mechanisms are healthy; worth a one-time confirmation with the user whether this bucket should still be receiving backups.

## SSL
- console.paturevision.fr: expires Aug 30 08:31:10 2026 GMT
- paturevision.fr: expires Oct 20 13:21:16 2026 GMT

---

## Slack Post
Posted to GGS #maintenance (`C0338NXK3SB`), ts `1784833806.225979`.

## Trello
Card: [Bailey monitor](https://trello.com/c/2lDTWqn3) (`6a6256fb221c6fa8f7530add`) — found via live search, not the stale hardcoded ID. Checklist "24/07/2026" created, all 9 items marked complete, card marked `dueComplete: true`.

## Task Log
Paturevision sheet `W37!A69` — `Weekly Monitor Jul 2026`, DuongDN, 1h.

---

## Unresolved Questions
- Confirm with user whether S3 bucket `paturevision-db-backups` (last write 2024-11-22) is intentionally deprecated, or should be receiving backups — RDS-native + AWS Backup are both healthy so no data-loss risk currently, just a stale/possibly-orphaned bucket.
