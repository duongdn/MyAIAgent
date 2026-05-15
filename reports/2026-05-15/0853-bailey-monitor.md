# Bailey Monitor — 2026-05-15 08:53

## CloudWatch — Bailey (eu-west-3)

### Alarms — Current State
All 10 alarms: **OK**

| Alarm | State | Last Change |
|-------|-------|-------------|
| Server CPU | OK | 2026-05-04 |
| Server CPU 2 | OK | 2026-04-27 |
| Server Memory | OK | 2026-05-15 01:02 UTC |
| Server Memory 2 | OK | 2026-04-27 |
| Server Disk Available | OK | 2026-04-08 |
| Server Swap Usaged | OK | 2026-04-22 |
| Server Swap Usaged 2 | OK | 2026-04-27 |
| RDS Storage | OK | 2022-12-05 |
| Storage Staging Server | OK | 2025-08-18 |
| Storage staging server Pre | OK | 2026-04-27 |

### ⚠️ Recurring Memory Pattern (14-day alarm history)
**Server Memory cycles ALARM→OK every single day for 14 days straight.**

| Date | Peak | Trough |
|------|------|--------|
| 2026-05-15 | (recovered this AM) | 76.2% |
| 2026-05-14 | 90.7% ALARM | 77.8% OK |
| 2026-05-13 | 91.5% ALARM | 78.7% OK |
| 2026-05-12 | 91.1% ALARM | 78.6% OK |
| 2026-05-11 | 90.3% ALARM | — |
| 2026-05-10 | 90.1% ALARM | 75.6% OK |
| 2026-05-09 | 91.8% ALARM | 77.0% OK |
| 2026-05-08 | 90.1% ALARM | 75.7% OK |
| 2026-05-07 | 90.9% ALARM | 81.2% OK |
| 2026-05-06 | 90.7% ALARM | 81.1% OK |
| 2026-05-05 | 90.4% ALARM | 81.3% OK |

**Pattern**: Nightly spike to ~90%+ (likely batch job or scheduled task), recovers in early morning. Currently OK at 76.2%. Not an emergency but persistent — worth investigating what's consuming memory nightly.

---

## EC2 — Health & Inventory (eu-west-3)

### Instance Inventory
| Name | Instance ID | Type | Launched | State |
|------|-------------|------|----------|-------|
| Console LIVE | i-097f6eee5762c82f3 | t3.large | 2024-01-18 | running |
| staging console | i-01a7339df8c663ed6 | t3.medium | 2024-04-17 | running |
| staging pretashop | i-0f82e81d2a07a28b9 | t3.medium | 2024-04-12 | running |
| **new staging console** | i-0c3044928d3a31ef8 | t3.medium | **2026-05-12** | running |

- No scheduled maintenance events in eu-west-2 or eu-west-3

---

## RDS — speedventory (eu-west-3)

### Instance Config
| Property | Value | Assessment |
|----------|-------|-----------|
| Engine | postgres 17.5 | OK (17.5.R2 patch available) |
| Class | db.t4g.small | OK |
| Status | available | OK |
| MultiAZ | **False** | ⚠️ No HA — single point of failure |
| PubliclyAccessible | **True** | ⚠️ Security risk |
| AutoMinorVersionUpgrade | **False** | ⚠️ Manual patching required |
| AllocatedStorage | 20GB | OK |
| BackupRetention | 7 days | OK |
| CACertificate | rds-ca-rsa2048-g1 | Monitor (deprecated cert family) |

### Pending Maintenance
1. **system-update**: New OS update available — low urgency, schedule during off-hours
2. **db-upgrade** to 17.5.R2: Minor patch — apply when convenient; no breaking changes expected

### Metrics (current)
| Metric | 1h Avg | Assessment |
|--------|--------|-----------|
| CPU | 3.44% | OK |
| CPU (24h) | 6.24% | OK |
| FreeableMemory | ~658MB | OK |
| FreeStorageSpace | ~17GB (85% free) | OK |
| DatabaseConnections | ~0 | OK (Sidekiq jobs completed) |
| ReadLatency | ~0ms | OK |
| WriteLatency | ~0ms | OK |

### RDS Events (14d)
All automated daily backups completed successfully (10–13 May confirmed). No errors.

---

## Billing

### Monthly Comparison
| Service | Apr (full) | May MTD (14d) | May Projected |
|---------|-----------|--------------|--------------|
| EC2 - Other | $75.06 | $32.23 | ~$69 |
| Tax | $20.10 | $8.91 | ~$19 |
| VPC | $14.40 | $6.74 | ~$14 |
| EC2 Compute | ~$2.44 est | $2.44 | ~$8 |
| RDS | $5.43 | $2.28 | ~$5 |
| S3 | $3.11 | $0.81 | ~$1.7 |
| CloudWatch | $2.40 | $0.06 | ~$0.13 |
| **TOTAL** | **$120.62** | **$53.46** | **~$117** |

### ⚠️ Billing Spike — EC2 Compute May 12-13
EC2 Compute jumped from ~$0.10/day baseline to $1.01-1.13/day on May 12-13.

**Root cause**: New instance "new staging console" (t3.medium, i-0c3044928d3a31ef8) launched 2026-05-12.  
**Impact**: ~$1/day additional cost. Full month projected ~$8 EC2 Compute vs ~$5 in April.  
**Action needed**: Confirm if this instance is intentional/still needed.

### Daily Trend
```
May 01: $12.01 (tax accrual — normal)
May 02-10: $3.01–$3.30/day (baseline)
May 11: $3.70 (+20%)
May 12: $4.65 (+50%) ← new instance started
May 13: $4.69 (+51%)
May 14: $0.59 (incomplete)
```

---

## New Relic APM — Console LIVE

### Heavy Sidekiq Jobs (24h)
| Job | DB Time | Total Time | Count |
|-----|---------|------------|-------|
| UpdateProductSoldInMonthsJob | 1829s | 2007s | 1 |
| SaveCurrencyRateJob | 1357s | 3226s | 1 |
| UpdateOverallRankingJob | 693s | 707s | 2 |
| ImportRoutingPlanJob | 260s | 343s | 1 |
| UpdateProductTendencyCacheJob | 42s | 48s | 2 |
| ReceiveCsvFromSchenkerJob | 27s | 1109s | 1 |

These are batch background jobs — long DB times expected. ReceiveCsvFromSchenkerJob total 1109s vs 27s DB = waiting on external I/O (CSV fetch).

### Error Rate (24h)
| Hour | Requests | Error Rate | Avg Duration |
|------|----------|-----------|-------------|
| 04:56 | 10 | 0.0% | **523s** |
| 06:56 | 7 | 0.0% | **107s** |
| 18:56 | 77 | **3.9%** | **10s** |
| 20:56 | 260 | 3.1% | 0.4s |
| 21:56 | 80 | 2.5% | 0.3s |
| 23:56 | 473 | 5.9% | 0.3s |
| 00:56 | 176 | **9.1%** | 0.1s |
| 12:56 | 20,057 | 0.0% | 0.4s |
| 13:56 | 8,428 | 0.2% | 0.4s |
| Others | <80 | 0.0% | — |

Night-time (23:00–01:00) error spikes (5.9–9.1%) at low traffic — likely Sidekiq jobs producing RecordNotFound errors. Daytime peak (12:56: 20K req) is clean.

### Top Errors (24h)
- **51x** `ActiveRecord::RecordNotFound: Couldn't find Order with 'id'=42076` — likely stale reference in job queue
- **2x** `ActionController::BadRequest: Invalid query parameters: invalid byte sequence in UTF-8`

### Top DB Queries (24h spans)
| Query | Count | Avg | Max |
|-------|-------|-----|-----|
| order_lines SUM(selling_price*items_count) | 5,132 | 0.134s | 0.593s |
| order_lines SELECT WHERE order_id IN (...) | 5,132 | 0.134s | 0.633s |
| order_lines GROUP BY product_id | 500 | 0.094s | 0.312s |

High call count (5132×) on order_lines scans — N+1 pattern or repeated per-order aggregation.

---

## Mailgun — mail.paturevision.fr

14-day delivery rate: **99.7%** ✓

| Period | Accepted | Delivered | Failed | Rate |
|--------|----------|-----------|--------|------|
| May 02-14 (14d) | 1,921 | 1,915 | 131 | 99.7% |

Peak day: Mon May 11 (551 accepted, 550 delivered). Weekday-heavy pattern is normal.

---

## Siteground Storage

### SSH Disk Usage (~/www)
| Directory | Size |
|-----------|------|
| pre9.paturevision.fr | 12G |
| staging-sg.paturevision.fr | 7.0G |
| je-pature.paturevision.fr | 6.1G |
| queue7.paturevision.fr | 4.9G |
| paturevision.fr | 2.1G |
| staging-je-pature.paturevision.fr | 386M |
| Others | ~2M |
| **Total ~/www** | **32G** |

⚠️ **Siteground dashboard session expired** — can't pull total SSD capacity or CPU/RAM stats. Run `node scripts/siteground-storage.js --login` to re-authenticate.

---

## SSL Certificates

| Domain | Expires | Days Left | Status |
|--------|---------|-----------|--------|
| console.paturevision.fr | Jul 1, 2026 | 47 days | OK |
| paturevision.fr | Jun 22, 2026 | **38 days** | ⚠️ Approaching 30-day threshold |

---

## Summary

| Check | Status | Detail |
|-------|--------|--------|
| CloudWatch Alarms | ✅ OK | All 10 alarms OK |
| Memory Pattern | ⚠️ WARNING | Daily nightly spike to 90%+ for 14 days straight |
| EC2 Health | ✅ OK | No scheduled events |
| New Instance | ℹ️ INFO | "new staging console" started 2026-05-12 |
| RDS Backups | ✅ OK | Daily backups all successful |
| RDS Pending Maintenance | ℹ️ INFO | OS update + 17.5.R2 patch available |
| RDS PubliclyAccessible | ⚠️ WARNING | Security risk — should be disabled |
| RDS MultiAZ | ⚠️ WARNING | No HA |
| Billing | ⚠️ NOTICE | May 12-13 spike from new instance — confirm intentional |
| New Relic APM | ✅ OK | Batch jobs normal; night errors from stale job queue |
| Mailgun | ✅ OK | 99.7% delivery |
| SSL | ✅ OK | Both certs valid >30 days |
| Siteground | ❌ N/A | Session expired — needs re-auth |
| Storage | ⚠️ Monitor | 32GB in ~/www — total capacity unknown (dashboard down) |
