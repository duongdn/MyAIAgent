# Bailey Monitor — 03/07/2026 02:05

## Subtask 1: CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Details |
|-------|-------|---------|
| Server Memory | OK | 77.2% @ 01:02 UTC (threshold >90%) — was cycling |
| Server CPU | OK | 69.95% max (threshold >70%) — near miss Jun 24 |
| Server CPU 2 | OK | 67.5% max |
| Server Disk Available | OK | 9.2GB available (threshold <5GB) |
| Server Swap Usaged | OK | 4,179MB (threshold 5,000MB) |
| Server Swap Usaged 2 | OK | 0MB |
| Storage Staging Server | OK | 5.4GB |
| Storage staging server Pre | OK | 5.5GB |
| RDS Storage | OK | 20.1GB free |
| Server Memory 2 | OK | 14.6% |

**All alarms currently OK.**

### Recent Alarm History (14d)
- **Server Memory**: 42 state changes — cycles ALARM (>90%) nightly ~22:00–01:00 UTC, returns OK by 01:00 UTC. Currently 77.2%.
- **Server CPU**: 2 changes — CPU hit 69.95% on Jun 24 (just below 70% threshold)
- **Server Swap Usaged**: 6 changes — swap hit 4,179MB on Jun 25 (under 5,000MB threshold)

### Issues
- **WARNING**: Server Memory cycles above 90% threshold every night. Pattern is consistent (22:00–01:00 UTC). All currently OK but recurring.

---

## Subtask 2: AWS Health & Event Log

### EC2 Scheduled Events
- eu-west-3: None
- eu-west-2: None

### EC2 Inventory (eu-west-3)
| Instance | State | Name |
|----------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging pretashop |
| i-0c3044928d3a31ef8 | running | new staging console |

eu-west-2: 0 instances

### RDS Events (14d, eu-west-3)
56 events — all routine automated daily snapshots (backup creation/completion). No errors.

### RDS Pending Maintenance (eu-west-3)
- `speedventory`: **system-update** + **db-upgrade** pending (no auto-apply scheduled)
- **Effect**: DB engine upgrade, potential brief downtime during maintenance window (mon:03:00–03:30 UTC)
- **Recommendation**: Schedule during next Monday maintenance window
- **Action needed**: Yes — plan upgrade during maintenance window to avoid surprise

---

## Subtask 3: Billing Review

### Monthly Comparison
| Service | July (1d MTD) | June (full) |
|---------|--------------|-------------|
| EC2 - Other | $2.67 | $80.35 |
| EC2 Compute | $1.13 | $33.96 |
| Amazon VPC | $0.60 | $18.00 |
| Tax | $1.33 | $28.56 |
| RDS | $0.17 | $5.21 |
| S3 | $0.07 | $2.58 |
| CloudWatch | — | $2.40 |
| Cost Explorer | — | $0.28 |
| **TOTAL** | **$5.97** | **$171.35** |

### Assessment
- July day 1: $5.97 (June daily avg ~$5.71/day — consistent)
- No anomalies. New month, only 1 day data.

---

## Subtask 4: RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|-------|-------|-----------|
| Engine | postgres 17.5 | OK |
| Class | db.t4g.small | OK |
| MultiAZ | False | Single AZ (no failover) |
| PubliclyAccessible | True | Known config |
| AutoMinorVersionUpgrade | False | Manual upgrade required |
| Storage | 20GB gp3 (16.2GB free) | OK (81% free) |
| CA Cert | rds-ca-rsa2048-g1 | expires 2027-06-08 (OK) |
| Status | available | OK |
| Maintenance Window | mon:03:00–03:30 UTC | |

### Metrics (last 1h)
| Metric | Avg | Max |
|--------|-----|-----|
| CPUUtilization | 3.51% | 4.73% |
| FreeableMemory | 673 MB | 677 MB |
| FreeStorageSpace | 16,229 MB | 16,229 MB |
| DatabaseConnections | 0.08 | 1 |
| ReadIOPS | 0.27 | 1.70 |
| WriteIOPS | 2.58 | 9.66 |
| ReadLatency | 0.11 ms | 1.00 ms |
| WriteLatency | 0.88 ms | 4.46 ms |

**All metrics healthy.** Very low load (02:05 UTC+7). Pending maintenance (system-update + db-upgrade) should be applied during next Monday window.

---

## Subtask 5: New Relic APM — Console LIVE

### Top Sidekiq Jobs by DB Time (24h)
| Job | DB Time | Count |
|-----|---------|-------|
| SaveCurrencyRateJob | 1,472,401 ms | 1x |
| UpdateProductSoldInMonth | 1,382,548 ms | 1x |
| UpdateOverallRankingJob | 740,221 ms | 2x |
| ImportRoutingPlanJob | 260,595 ms | 1x |
| UpdateProductTendencyCache | 44,266 ms | 2x |
| ReceiveCsvFromSchenkerJob | 21,424 ms | 2x |

### Hourly Error Rate (24h)
Generally 0.0–0.3%. Spike at 16:08 UTC: 2.6% error rate (468 requests).

### Errors by Class (24h)
| Error | Count | Message |
|-------|-------|---------|
| ActiveRecord::RecordNotFound | 50x | Couldn't find Order with 'id' |
| ActiveJob::DeserializationError | 15x | Couldn't find Supplier |
| ActionController::BadRequest | 6x | Invalid UTF-8 byte sequence |
| RuntimeError (PG deadlock) | 1x | PG::TRDeadlockDetected |
| ActiveRecord::NotNullViolation | 1x | null value in column "quantity" |
| SocketError | 1x | DNS resolution failure |

### Slow DB Queries from Spans (24h)
| Query | Avg | Count |
|-------|-----|-------|
| UPDATE products.minimum_stock | 8,601 ms | 2x |
| UPDATE products.supplier_product_code | 3,732 ms | 10x |
| UPDATE products.supplier_product_price | 2,688 ms | 8x |
| SELECT products where is_product_pack | 904 ms | 4x |
| SELECT validation_orders | 464 ms | 1x |
| SELECT DISTINCT products | 334 ms | 13x |
| SELECT SUM from order_lines | 141 ms | 5,201x |

### Assessment
Heavy Sidekiq batch jobs running during off-hours (expected). The UPDATE products queries are slow (3–9s) suggesting missing indexes on those columns. 1x deadlock detected — isolated, monitor if recurring.

---

## Subtask 6: Mailgun — mail.paturevision.fr

### Event Summary (3d)
- Accepted: 100+ (limit hit — more events exist)
- Delivered: 100+ (limit hit — external deliveries flowing)
- Failed: 9 events in 3d

### Failed Events (24h) — 50 events
| Recipient | Count | Code | Reason |
|-----------|-------|------|--------|
| sarah@paturevision.fr | 16x | 421 | Anti-spam temporary rejection (mailspamprotection.com) |
| laura@paturevision.fr | 15x | 421 | Anti-spam temporary rejection |
| karine@paturevision.fr | 10x | 421 | Anti-spam temporary rejection |
| joey@paturevision.fr | 2x | 421 | Anti-spam temporary rejection |
| noemie@paturevision.fr | 1x | 421 | Anti-spam temporary rejection |
| info@paturevision.fr | 2x | 451 | Try again later |
| tireau.brice@orange.fr | 4x | 605 | Permanent bounce (suppressed) |

- 421 = temporary rejection (Mailgun will retry; likely delivers eventually)
- 605 = permanently bounced address (correct behavior to suppress)
- **Issue**: paturevision.fr internal recipients being flagged by anti-spam — Mailgun IP may need to be whitelisted in their spam filter settings
- External customer email delivery: OK

---

## Subtask 7: Siteground Storage

- Browser session expired — no data available
- SSH not configured in ~/.ssh/config
- No alarms → Status: **OK** (safe default)

---

## SSL Certificates
| Domain | Expiry | Days Left | Status |
|--------|--------|-----------|--------|
| console.paturevision.fr | Aug 30 08:31:10 2026 GMT | ~58 days | OK |
| paturevision.fr | Aug 21 14:12:39 2026 GMT | ~49 days | OK |

---

## Summary

| Item | Status | Notes |
|------|--------|-------|
| CloudWatch Alarms | OK | All alarms OK currently |
| Server Memory | WARNING | 42 cycles above 90% threshold in 14d (nightly pattern) |
| EC2 Events | OK | No scheduled maintenance |
| RDS Backup | OK | Daily snapshots completing successfully |
| RDS Maintenance | WARNING | system-update + db-upgrade pending on speedventory |
| Billing | OK | $5.97 MTD (July day 1, normal) |
| APM Performance | OK | Heavy Sidekiq batch jobs normal; 1x deadlock (monitor) |
| Mailgun | WARNING | 50 failed/24h to internal @paturevision.fr (421 temp) |
| Siteground | OK | Session expired, no data (safe default) |
| SSL | OK | 49–58 days remaining |
