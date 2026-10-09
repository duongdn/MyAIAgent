# Bailey Monitor — 2026-06-19 08:53 (+07)

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms (current state)
| Alarm | State |
|-------|-------|
| RDS Storage | OK |
| Server CPU | OK |
| Server CPU 2 | OK |
| Server Disk Available | OK |
| Server Memory | OK |
| Server Memory 2 | OK |
| Server Swap Usaged | OK |
| Server Swap Usaged 2 | OK |
| Storage Staging Server | OK |
| Storage staging server Pre | OK |

No alarm currently in ALARM/INSUFFICIENT_DATA.

### Recent Alarm History (14d) — ⚠️ WARNING
- 60 state-transition events in 14d (30 OK→ALARM, 30 ALARM→OK).
- **"Server Memory" (Console LIVE, i-097f6eee5762c82f3) flapped 27× in 14 days** — threshold 90%, repeatedly crossed then resolved within ~1h.
- "Server CPU" / "Server CPU 2" flapped 1-2× each — minor, not recurring.
- Pattern (24h MemoryUtilization on i-097f6eee5762c82f3): climbs steadily all day (13%→43% from 01:52 to 20:52 UTC) then spikes sharply 75-98% between 21:52-23:52 UTC, drops back to ~24% by 00:52 UTC. Consistent daily cycle — looks like a memory leak that builds through the day, peaks in the evening (UTC), and gets cleared by a nightly job/restart.
- **Recommendation:** Investigate what process runs ~21:52-23:52 UTC (translate to app/server local time) causing the spike — likely a scheduled job (backup, cache rebuild, report gen) on top of already-elevated baseline memory. Not yet causing downtime, but recurring 90%+ spikes risk OOM. Consider bumping instance memory or fixing the leak source.

### Dashboard Metrics Summary
Widgets: RDS Storage, Server CPU (×2), Server Disk Available, Server Memory (×2), Server Swap Usaged (×2), Storage Staging Server (×2). All within alarm thresholds at time of check.

## 2. AWS Health & EC2 Events

- EC2 scheduled events: none in eu-west-2 or eu-west-3.
- EC2 inventory (eu-west-3): 4 instances running — Console LIVE, staging console, staging prestashop, new staging console. None in eu-west-2.
- RDS events (14d): routine daily automated backups only (speedventory), no errors.
- **RDS pending maintenance (speedventory):**
  - `system-update` — OS update available. Low urgency, schedule during a maintenance window.
  - `db-upgrade` — Postgres engine patch 17.5 → 17.5.R2 available. Minor patch, low risk; recommend applying at next maintenance window (Mon 03:00-03:30 UTC preferred window already configured).
- No pending maintenance in eu-west-2.

## 3. Billing Review

| Service | May 2026 (full) | Jun 2026 (1-19, partial) |
|---|---|---|
| EC2 - Other | $78.25 | $45.83 |
| EC2 Compute | $22.64 | $19.33 |
| RDS | $5.29 | $2.99 |
| S3 | $2.51 | $1.48 |
| VPC | $17.39 | $10.30 |
| CloudWatch | $2.40 | $0.08 |
| Tax | $25.74 | $16.02 |
| **Total** | **~$154.4** | **~$96.5 (partial, 19d)** |

- All services trending down or flat month-over-month — no anomalies, no >50% increases.
- Daily spend steady ~$4.6-4.8/day; Jun 1 shows $20.86 (recurring monthly charges + tax accrual on 1st — normal, not a spike).

## 4. RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|---|---|---|
| Engine | Postgres 17.5 | pending minor patch 17.5.R2 |
| Class | db.t4g.small | OK |
| MultiAZ | **false** | ⚠️ flag — no HA failover |
| PubliclyAccessible | **true** | ⚠️ flag — should be behind VPC/bastion if not required |
| AutoMinorVersionUpgrade | **false** | ⚠️ flag — patches must be applied manually |
| DeletionProtection | true | OK |
| StorageEncrypted | true | OK |
| Cert (CA rds-ca-rsa2048-g1) | valid until 2027-06-08 | OK, not expiring within 6mo |
| Allocated/Max storage | 20GB / 100GB autoscaling | OK |

### Metrics (current 1h vs 24h baseline)
| Metric | Current | 24h avg | 24h max |
|---|---|---|---|
| CPUUtilization | 3.4% | 7.7% | 96.4%* |
| FreeableMemory | 685MB | 669MB | 700MB |
| FreeStorageSpace | 17.0GB free | 17.1GB | 17.1GB |
| DatabaseConnections | 0.08 | 3.1 | 10 |
| ReadIOPS | 0.26 | 0.91 | 188* |
| WriteIOPS | 2.4 | 3.4 | 45 |
| ReadLatency | 0.16ms | 0.24ms | 10ms |
| WriteLatency | 0.8ms | 0.85ms | 7.5ms |
| SwapUsage | 15.8MB | 16.1MB | 17.3MB |
| DiskQueueDepth | 0.006 | 0.006 | 0.07 |

*CPU 96.4% max and ReadIOPS 188 max are brief 24h spikes (likely backup window or batch job) — not sustained, no alarm triggered.

### Issues
- 3 flagged config items above (MultiAZ, PubliclyAccessible, AutoMinorVersionUpgrade) — pre-existing, no change this run. No urgent action required unless HA/security posture needs to change.

## 5. New Relic APM — Console LIVE

### Errors by class (24h)
| Error class | Count | Note |
|---|---|---|
| ActiveRecord::RecordNotFound | 87 | "Couldn't find Order id=42877" — record deleted before job ran |
| NameError | 39 | "uninitialized constant ActionMailer::MailDeliveryJob" — recurring app bug, Rails/ActionMailer version mismatch |
| ActiveJob::DeserializationError | 18 | job referencing deleted ShippingLabel |
| ArgumentError | 9 | "wrong number of arguments (given 5, expected 4)" |
| ActionController::BadRequest | 4 | invalid UTF-8 in query params |
| SocketError | 3 | DNS resolution failure (outbound call) |
| OpenSSL::SSL::SSLError | 2 | TLS handshake failure (outbound call) |
| RuntimeError | 1 | **PG::TRDeadlockDetected** — deadlock on `products` table (concurrent stock qty updates) |

⚠️ NameError (uninitialized ActionMailer::MailDeliveryJob) recurring 39× in 24h — looks like a real app bug worth a dev ticket, not infra-side.

### Error rate / throughput (24h, hourly)
Mostly <1% error rate. Two periods of elevated avg duration: one window ~40.5s avg (160 txns, 5% error) and ~14.5s avg (56 txns, 3.6% error) — low-traffic hours, likely batch/Sidekiq jobs running, not user-facing.

### Slow Sidekiq jobs (by DB time, 24h)
| Job | Avg DB time | Count |
|---|---|---|
| UpdateProductSoldInMonthsJob | 3.19s | 1 |
| SaveCurrencyRateJob | 1.29s | 1 |
| UpdateOverallRankingJob | 0.73s | 2 |
| ImportRoutingPlanJob | 0.25s | 1 |

All low-frequency background jobs, not a performance concern at current volume.

### Top DB queries (by call volume, spans)
Highest-volume queries are `order_lines` SUM/SELECT aggregations (5155-5156 calls, ~0.14s avg) and `products` bulk SELECT (12-21 calls, ~0.13s avg) — both fast individually, no N+1 pattern of concern at current call counts.

## 6. Mailgun — mail.paturevision.fr

- 14d: 2073 accepted, 2070 delivered, 247 failed (retries counted per-attempt) → **99.86% delivery rate**. Above 99% threshold — OK.
- Failed events (24h) are temporary 421s from recipient's antispam gateway (`mailspamprotection.com` — "local verification problem") — this is the **recipient's** spam filter, not a Mailgun/sender reputation issue.
- Bounces/complaints endpoints returned `unauthorized` — API key lacks that scope. Local note only, not a service issue.

## 7. Siteground Statistics

- Puppeteer session expired; attempted `--login` re-auth with visible browser (DISPLAY=:1) but the SiteGround login requires manual CAPTCHA solving — could not complete unattended. **Needs manual re-auth**: run `DISPLAY=:1 node scripts/siteground-storage.js --login` interactively next time a human is available.
- Disk breakdown via SSH (`~/www`, 36G total):
  | Dir | Size |
  |---|---|
  | pre9.paturevision.fr | 20G |
  | staging-sg.paturevision.fr | 7.0G |
  | je-pature.paturevision.fr | 6.8G |
  | **paturevision.fr (production)** | 2.2G |
  | staging-je-pature.paturevision.fr | 404M |
  | (all other dirs) | <500K each |
- No zip/backup files found in www root.
- **Note:** staging dirs (pre9, staging-sg, je-pature) total ~34G vs 2.2G for actual production — worth a cleanup pass if disk quota is tight (couldn't confirm % used since dashboard was unreachable this run).

## 8. SSL Certificates
| Domain | Expires |
|---|---|
| console.paturevision.fr | 2026-08-30 |
| paturevision.fr | 2026-08-21 |

Both >30 days out — OK.

## Summary
- **Performance: OK.** No active alarms. One recurring pattern flagged: Server Memory (Console LIVE) flaps near 90% threshold daily (~22:00-00:00 UTC), 27× in 14d — worth investigating but not yet causing downtime.
- **Billing: OK**, trending down, no anomalies.
- **RDS: OK**, pre-existing config flags (MultiAZ/PubliclyAccessible/AutoMinorVersionUpgrade) unchanged, 2 pending minor maintenance items (low urgency).
- **App-level:** NameError (ActionMailer::MailDeliveryJob) recurring 39×/24h — dev-side bug worth a ticket, not an infra alert.
- **Mailgun: OK** (99.86%).
- **Siteground:** session expired, needs manual CAPTCHA re-auth — disk breakdown obtained via SSH instead.
- **SSL: OK**, both >60 days out.

## Unresolved Questions
1. Is the Console LIVE memory growth (13%→43% intraday, spiking to 90%+ nightly) a known/expected pattern, or should it be treated as a leak to fix?
2. Should Siteground browser profile be re-authenticated manually (CAPTCHA) — when is a human available to do this?
3. Should staging directories (~34G) be cleaned up, or are they intentionally retained?
