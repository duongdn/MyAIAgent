# Bailey Monitor Report — 2026-06-05 08:53

## Summary

| Area | Status | Note |
|------|--------|------|
| CloudWatch Alarms | OK | All clear currently; recurring memory spikes resolved |
| Server Memory | ⚠️ WARNING | Multiple >90% spikes last 48h (now 77%) |
| Server CPU | OK | Brief spike to 75% Jun 4, recovered |
| Server Swap | OK | Exceeded 5000MB Jun 3-4, recovered |
| RDS (speedventory) | OK | Backups OK; pending maintenance available |
| AWS EBS Backup | OK | Daily backups running, no failures |
| S3 DB Backup | N/A | Old data (2024_11); app using RDS snapshots |
| Billing | OK | $19.13 MTD, ~$118/mo projected |
| Mailgun | OK | 100% delivery rate 14d |
| SSL Console | OK | Expires Aug 30 2026 (86d) |
| SSL Prestashop | OK | Expires Aug 21 2026 (77d) |
| Siteground Storage | N/A | Session expired; SSH: 37GB total |
| New Relic | ⚠️ WARNING | 86x Redis::TimeoutError, heavy Sidekiq jobs |

---

## CloudWatch — Bailey (eu-west-3)

### Alarms (current state — ALL OK)

| Alarm | Threshold | Current State |
|-------|-----------|---------------|
| Server Memory | >90% | OK |
| Server Memory 2 | >90% | OK |
| Server CPU | >70% | OK |
| Server CPU 2 | >70% | OK |
| Server Swap Usaged | >5000MB | OK |
| Server Swap Usaged 2 | >2000MB | OK |
| Server Disk Available | <5GB | OK |
| Storage Staging Server | <5GB | OK |
| Storage staging server Pre | <5GB | OK |
| RDS Storage | <5GB | OK |

### Alarm History (recent events, all resolved)

| Time (UTC) | Alarm | Event | Peak Value |
|-----------|-------|-------|-----------|
| 2026-06-05 01:02 | Server Memory | ALARM→OK | — |
| 2026-06-05 00:07 | Server Memory | OK→ALARM | 90.45% |
| 2026-06-05 00:06 | Server Memory | ALARM→OK | — |
| 2026-06-04 22:25 | Server Memory | OK→ALARM | 91.41% |
| 2026-06-04 06:02 | Server CPU | ALARM→OK | — |
| 2026-06-04 06:01 | Server CPU | OK→ALARM | 75.19% |
| 2026-06-04 01:04 | Server Swap | ALARM→OK | — |
| 2026-06-04 00:11 | Server Memory | OK→ALARM | 90.22% |
| 2026-06-03 22:25 | Server Swap | OK→ALARM | 5079MB |
| 2026-06-03 22:17 | Server Memory | OK→ALARM | 91.50% |

**Pattern:** Server Memory repeatedly crosses 90% during low-traffic hours (~22:00-00:30 UTC, i.e., ~05:00-07:30 +07). Likely Sidekiq background jobs consuming memory. Redis timeouts may be related.

---

## EC2 Inventory (eu-west-3)

| Instance ID | State | Name |
|------------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging pretashop |
| i-0c3044928d3a31ef8 | running | new staging console |

No scheduled events or maintenance windows on any instance.

---

## RDS — speedventory (eu-west-3)

| Setting | Value | Assessment |
|---------|-------|-----------|
| Class | db.t4g.small | OK |
| Engine | PostgreSQL 17.5 | OK |
| Status | available | ✅ |
| MultiAZ | False | ⚠️ No HA |
| PubliclyAccessible | True | ⚠️ Security risk |
| AutoMinorVersionUpgrade | False | ⚠️ Manual upgrades |
| Allocated Storage | 20GB | OK |
| Backup Retention | 7 days | OK |
| CA Cert | rds-ca-rsa2048-g1 | Expires Dec 1 2026 |

### RDS Metrics (1h current)

| Metric | Avg | Max |
|--------|-----|-----|
| CPU | 3.9% | 6.3% |
| Freeable Memory | 655 MB | 664 MB |
| Free Storage | 15.9 GB | 15.9 GB |
| Connections | 3.7 | 5 |
| Read Latency | 0.15ms | 4.2ms |
| Write Latency | 0.82ms | 5.3ms |
| Read IOPS | 0.27 | 1.57 |
| Write IOPS | 2.5 | 10.7 |
| Swap Usage | 16.6 MB | 17 MB |

**24h context:** CPU avg 7.9%, max spike to **95.9%** — one heavy computation period.

### RDS Events (14d)
Daily automated snapshots running successfully (backup completes ~5min daily at 13:00 UTC). No issues.

### Pending Maintenance Actions
1. **system-update** — New OS update available
   - Effect: OS-level patch, brief reboot may be required
   - Urgency: Low — apply during next maintenance window
2. **db-upgrade** — PostgreSQL 17.5.R2 patch available
   - Effect: Minor patch with bug fixes, typically <2min downtime
   - Urgency: Low — auto-update disabled; schedule manually

---

## Billing

### Monthly Comparison

| Service | May 2026 | Jun 2026 (4d) | Jun Projected |
|---------|----------|----------------|--------------|
| EC2 - Other | $78.25 | $8.92 | $68.87 |
| EC2 Compute | $22.64 | $3.90 | $30.12 |
| RDS | $5.29 | $0.57 | $4.41 |
| S3 | $2.51 | $0.43 | $3.32 |
| VPC | $17.39 | $2.13 | $16.45 |
| CloudWatch | $2.40 | $0 | ~$2.50 |
| Tax | $25.74 | $3.19 | ~$25 |
| **Total** | **$154.22** | **$19.13** | **~$150** |

Daily trend: $8.03 (Jun 1 incl. tax accrual) → $4.66 → $4.83 → $1.62
No anomalies. Jun 4 lower due to partial day data.

---

## New Relic APM

### Top Sidekiq Jobs (24h, by DB time)

| Job | Avg DB Time | Count | Avg Total |
|-----|-------------|-------|-----------|
| UpdateProductSoldInMonthsJob | **2746s** | 1 | 2919s |
| SaveCurrencyRateJob | **1405s** | 1 | 3296s |
| UpdateOverallRankingJob | **747s** | 2 | 762s |
| ImportRoutingPlanJob | **263s** | 4 | 189s |
| UpdateProductTendencyCacheJob | 76s | 2 | 83s |
| ReceiveCsvFromSchenkerJob | 24s | 3 | 325s |
| UpdateSaleAnalyticCacheJob | 8s | 1 | 12s |

### Web Traffic (24h)
- Total requests: 130,384
- Max error rate: **0.7%** (acceptable)
- Peak: ~20,699 req/h during business hours

### Top Errors (24h)

| Error | Count | Note |
|-------|-------|------|
| ActiveRecord::RecordNotFound (Order 42561) | 97 | Stale order ID in job |
| **Redis::TimeoutError** | **86** | ⚠️ Connection timeouts |
| ActiveJob::DeserializationError (ShippingLabel 8861) | 11 | Stale ID |
| ArgumentError: wrong arg count (5 vs 4) | 8 | Code mismatch |
| Errno::ETIMEDOUT (52.28.36.155:21 FTP) | 5 | FTP connection issue |
| ActionController::BadRequest (UTF-8) | 4 | Bad input |
| Errno::ECONNREFUSED (localhost:8010) | 3 | Internal service down |
| ActionView::Template::Error (locales path) | 3 | Dev path in production |
| PG::TRDeadlockDetected | 2 | DB deadlock |
| SocketError | 1 | DNS failure |

**Concerns:**
- Redis timeouts (86x) correlate with memory pressure — when server RAM spikes, Redis gets starved
- `localhost:8010` connection refused — check if a sidecar service is supposed to be running
- `locales/en.yml` from `/Users/macbook/nus-projects/...` — dev machine path in production config

---

## Mailgun (mail.paturevision.fr)

### 14-day Delivery Stats

All 14 days: **100% delivery rate**. Total: 1,964 accepted / 1,964 delivered / 0 permanent failures.

### Failed Events (24h)
50 temporary failures from `antispam.mailspamprotection.com` (code 421 — connection throttling). These are transient and auto-retried by Mailgun. One permanent 550 for `clement@paturevision.fr` — likely invalid/deleted address.

No IP reputation issues. No permanent bounces in bounce list. No complaints.

**Status: OK**

---

## Siteground (paturevision.fr hosting)

Session expired — dashboard storage % unavailable. SSH disk usage:

| Directory | Size |
|-----------|------|
| pre9.paturevision.fr/ | 16G |
| staging-sg.paturevision.fr/ | 7.0G |
| je-pature.paturevision.fr/ | 6.5G |
| queue7.paturevision.fr/ | 4.9G |
| paturevision.fr/ | 2.2G |
| Other sites | <1G each |
| **Total ~/www** | **37G** |

`pre9.paturevision.fr` (16GB) is the largest directory — likely an old Prestashop version. Consider archiving/removing if no longer needed.

---

## SSL Certificates

| Domain | Expiry | Days Left |
|--------|--------|-----------|
| console.paturevision.fr | Aug 30 08:31:10 2026 GMT | 86d |
| paturevision.fr | Aug 21 14:12:39 2026 GMT | 77d |

Both OK. Monitor for renewal in ~45 days.

---

## Recommendations

1. **[HIGH] Memory pressure on Console LIVE**: Server memory repeatedly hitting >90% during overnight Sidekiq runs. Consider: (a) optimizing UpdateProductSoldInMonthsJob / SaveCurrencyRateJob which use 1400-2750s DB time each, (b) adding more RAM to instance, or (c) staggering heavy jobs.

2. **[HIGH] Redis::TimeoutError (86x/24h)**: Likely caused by memory pressure. Fix memory issue first. If persists, increase Redis max memory limit or move to dedicated Redis instance.

3. **[MED] RDS PubliclyAccessible=True**: Security risk. Should be disabled — app should connect via private subnet. Requires VPC config review.

4. **[MED] localhost:8010 connection refused (3x)**: A sidecar service isn't running. Identify and fix.

5. **[LOW] Schedule RDS maintenance**: Apply OS update + PostgreSQL 17.5.R2 during a maintenance window.

6. **[LOW] RDS AutoMinorVersionUpgrade=False**: Enable to avoid manual tracking of minor patches.

7. **[LOW] clement@paturevision.fr**: Permanent 550 bounce — remove from mailing lists.

8. **[LOW] Dev path in production**: ActionView error referencing `/Users/macbook/nus-projects/...` — stale locale config in production.
