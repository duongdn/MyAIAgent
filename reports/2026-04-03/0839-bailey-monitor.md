# Bailey Monitor — 2026-04-03 08:39

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Notes |
|-------|-------|-------|
| Server Memory | OK | Was in ALARM 22:16→01:02 UTC (Apr 2-3), peaked at 90.7% > 90% threshold |
| Server Swap Usaged | OK | Last triggered Mar 31 22:36→Apr 1 01:03 |
| Server CPU | OK | Brief spike Mar 30 13:41→13:42 |
| All others | OK | Server CPU 2, Memory 2, Swap 2, RDS Storage, Storage Staging, Storage Staging Pre — no triggers |

### Recent Alarm History (14d)
- **Server Memory**: Recurring nightly pattern — enters ALARM ~22:00-22:45 UTC, recovers ~01:00 UTC. Triggered 8 nights in the 14d window. Peak observed: 90.7%.
- **Server Swap Usaged**: Single trigger Mar 31 22:36 → Apr 1 01:03.
- **Server CPU**: Single brief spike Mar 30 13:41→13:42, auto-recovered.
- **36 state changes** total across 14 days, all auto-resolved.

### Dashboard Metrics Tracked
Server Swap, CPU, Memory, Disk (LIVE + staging), RDS Storage — all via alarm-linked widgets.

### Issues / Warnings
- **WARNING**: Nightly memory pressure pattern on Console LIVE server. Memory hits >90% threshold around 22:00 UTC (05:00 ICT) every night, likely Sidekiq batch jobs. Self-resolves but worth investigating to prevent OOM.

---

## AWS Health & Events

### EC2 Instances (eu-west-3)
| Instance | State | Name |
|----------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging pretashop |

- No EC2 scheduled events (eu-west-3 or eu-west-2)

### RDS Events (14d)
- **speedventory**: Daily automated backups running successfully. Last backup Apr 2 13:00→13:05 UTC. All 14 backups completed without issues.
- **eu-west-2**: No events.

### RDS Pending Maintenance — speedventory
| Action | Description | Effect | Recommendation | Action Needed? |
|--------|-------------|--------|----------------|----------------|
| system-update | New OS update available | Brief reboot during maintenance window, ~30s downtime | Schedule during low-traffic hours. No deadline set — optional but recommended. | Yes — schedule within 2 weeks |
| db-upgrade | Patch 17.5.R2 available | Minor version patch, brief reboot, ~1-2 min downtime | Bug/security fixes. Schedule in maintenance window. | Yes — schedule within 2 weeks |

---

## Billing Review

### Monthly Comparison
| Service | March 2026 | April MTD (2d) | Apr Projected (30d) | Change |
|---------|-----------|----------------|---------------------|--------|
| EC2 - Other | $70.44 | $0.23 | ~$3.52 | TBD* |
| Amazon VPC | $14.88 | $0.16 | ~$2.40 | TBD* |
| Amazon S3 | $6.83 | $0.17 | ~$2.55 | TBD* |
| Amazon RDS | $5.38 | $0.03 | ~$0.39 | TBD* |
| CloudWatch | $2.40 | $0.00 | ~$0.00 | TBD* |
| Tax | $20.00 | $0.12 | — | Normal accrual |
| **Total** | **$120.01** | **$0.71** | — | — |

*Note: Only 2 days into April — projections unreliable. EC2 Other and VPC charges often back-load. Cost Explorer charges ($0.08 Mar) not yet appearing.

### Daily Breakdown
| Date | Total |
|------|-------|
| Apr 1 | Billing data processing |
| Apr 2 | Billing data processing |

### Assessment
- April MTD $0.71 — too early for meaningful comparison. No anomalies detected.
- March total $120.01 — in line with prior months.

---

## RDS Monitoring — speedventory

### Instance Configuration
| Setting | Value | Assessment |
|---------|-------|------------|
| Engine | PostgreSQL 17.5 | Current |
| Class | db.t4g.small | OK |
| Storage | 20 GB gp3 | OK |
| MultiAZ | false | **WARNING** — no failover |
| PubliclyAccessible | true | **WARNING** — restrict to VPC |
| AutoMinorVersionUpgrade | false | **WARNING** — enable for security patches |
| BackupRetention | 7 days | OK |
| CA Certificate | rds-ca-rsa2048-g1 | OK |
| Status | available | OK |

### Metrics (Last 1h)
| Metric | Avg | Max | Assessment |
|--------|-----|-----|------------|
| CPUUtilization | 3.5% | 3.7% | OK |
| FreeableMemory | 654 MB | 660 MB | OK |
| FreeStorageSpace | 15.96 GB | 15.96 GB | OK (80% of 20GB free) |
| DatabaseConnections | 3.6 | 4 | OK |
| SwapUsage | 12.3 MB | 12.3 MB | OK (minimal) |
| ReadIOPS | 0.26 | 1.3 | OK |
| WriteIOPS | 2.4 | 10.0 | OK |
| ReadLatency | 0.2 ms | 1.0 ms | OK |
| WriteLatency | 0.9 ms | 4.2 ms | OK |
| DiskQueueDepth | 0.009 | 0.04 | OK |

### Issues
- **WARNING**: PubliclyAccessible=true — should be restricted to VPC security groups only
- **WARNING**: MultiAZ=false — no automatic failover on failure
- **WARNING**: AutoMinorVersionUpgrade=false — missing security patches

---

## New Relic APM — Console LIVE

### Top Transactions by DB Time (24h)
| Transaction | Avg DB (s) | Max DB (s) | Count | Assessment |
|-------------|-----------|-----------|-------|------------|
| UpdateProductSoldInMonthsJob | 1424.1 | 1424.1 | 1 | **Heavy** — 24 min DB time |
| SaveCurrencyRateJob | 1205.5 | 1205.5 | 1 | **Heavy** — 20 min DB time |
| UpdateOverallRankingJob | 648.3 | 653.7 | 2 | **Heavy** — 11 min DB time |
| ImportRoutingPlanJob | 261.3 | 261.3 | 1 | Heavy |
| UpdateProductTendencyCacheJob | 41.0 | 41.0 | 2 | Moderate |
| ReceiveCsvFromSchenkerJob | 36.7 | 36.7 | 1 | Moderate |
| Controller/sales_analytics/show | 2.9 | 6.3 | 72 | User-facing, slow |
| Controller/palettes/index | 2.8 | 11.4 | 25 | User-facing, slow |
| Controller/purchase_orders/index | 2.4 | 15.2 | 124 | User-facing, slow |

### Error Breakdown (24h)
| Error Class | Count | Latest Message |
|-------------|-------|----------------|
| ActiveJob::DeserializationError | 26 | Couldn't find ShippingLabel with 'id'... |
| NoMethodError | 18 | undefined method 'orders' for nil:NilClass |
| ActiveRecord::RecordNotUnique | 11 | PG::UniqueViolation: duplicate key... |
| ActionController::BadRequest | 2 | Invalid query parameters: invalid byte sequence in UTF-8 |

### Hourly Error Rate (last 6h)
- Error rate: 0.00%–0.18% — **OK**
- Throughput: 1,079–2,052 rpm
- Avg duration: 0.23–3.91s (spike in one hour likely from heavy Sidekiq jobs)

### Top DB Queries
| Query | Avg (s) | Max (s) | Count |
|-------|---------|---------|-------|
| UPDATE products SET supplier_product_price | 7.0 | 13.6 | 3 |
| UPDATE products SET minimum_stock | 6.9 | 6.9 | 1 |
| SELECT products (is_product_pack) | 0.3 | 1.3 | 6 |

### Assessment
- Error rate very low (<0.2%), no error spikes
- DeserializationError (26) suggests orphaned ShippingLabel records — recurring, investigate
- Heavy Sidekiq jobs (UpdateProductSoldInMonths, SaveCurrencyRate, UpdateOverallRanking) dominate DB time — likely cause of nightly memory pressure

---

## Mailgun — mail.paturevision.fr

### 7-Day Delivery Stats
| Date | Sent | Delivered | Failed | Rate |
|------|------|-----------|--------|------|
| Mar 28 | 32 | 32 | 1 | 100.0% |
| Mar 29 | 55 | 55 | 7 | 100.0% |
| Mar 30 | 290 | 287 | 11 | 99.0% |
| Mar 31 | 303 | 303 | 1 | 100.0% |
| Apr 1 | 292 | 292 | 1 | 100.0% |
| Apr 2 | 247 | 247 | 0 | 100.0% |
| **7d Total** | **1,219** | **1,216** | **21** | **99.8%** |

### Failed Events (24h)
- **info@paturevision.fr**: 3 temporary failures ("Try again later") — auto-retries, OK
- **ferme@gaecdesaintpierre.fr**: Permanent failure — no MX record for domain. Should stop sending to this address.

### Assessment
- Delivery rate 99.8% — **OK**
- No IP reputation issues, no complaints
- Recommend removing ferme@gaecdesaintpierre.fr from mailing list (no MX record = permanently undeliverable)

---

## Siteground — paturevision.fr

### Disk Usage (via SSH)
| Directory | Size |
|-----------|------|
| pre9.paturevision.fr/ | 16 GB |
| staging-sg.paturevision.fr/ | 7.1 GB |
| je-pature.paturevision.fr/ | 6.3 GB |
| queue7.paturevision.fr/ | 5.3 GB |
| paturevision.fr/ | 2.2 GB |
| staging-je-pature.paturevision.fr/ | 386 MB |
| Others | < 1 MB each |
| **Total** | **37 GB** |

*Siteground dashboard script failed (config path issue) — using SSH data only.*

### Assessment
- No zip/backup files found to clean
- pre9 (Prestashop) is largest at 16GB — check if old images/logs can be purged

---

## SSL Certificates

| Domain | Expiry | Days Left | Status |
|--------|--------|-----------|--------|
| console.paturevision.fr | Jul 1, 2026 | 89 days | OK |
| paturevision.fr | Jun 22, 2026 | 80 days | OK |

---

## Summary

| Check | Status |
|-------|--------|
| CloudWatch Alarms | OK (nightly memory pressure, auto-resolves) |
| EC2 Instances | OK (3 running, no events) |
| RDS Backup | OK (daily backups successful) |
| RDS Pending Maintenance | WARNING (OS update + patch 17.5.R2 available) |
| Billing | OK ($0.71 MTD, in line) |
| RDS Metrics | OK (all normal) |
| New Relic APM | OK (low error rate, heavy batch jobs normal) |
| Mailgun | OK (99.8% delivery) |
| Siteground Storage | OK (37 GB) |
| SSL | OK (80+ days remaining) |

### Recommendations (prioritized)
1. **Schedule RDS maintenance** — OS update + PostgreSQL 17.5.R2 patch during weekend maintenance window
2. **Investigate nightly memory pressure** — Server Memory alarm triggered 8/14 nights. Likely caused by heavy Sidekiq jobs (UpdateProductSoldInMonths, SaveCurrencyRate) running ~22:00 UTC
3. **RDS security** — Disable PubliclyAccessible, enable MultiAZ for failover, enable AutoMinorVersionUpgrade
4. **Fix DeserializationError** — 26 errors from orphaned ShippingLabel records in 24h
5. **Remove ferme@gaecdesaintpierre.fr** — permanently undeliverable (no MX record)
