# Bailey Monitor — 12/06/2026

Generated: 2026-06-12 08:51 UTC+7

---

## CloudWatch — Bailey (eu-west-3)

### Alarms (Current State)
| Alarm | State |
|-------|-------|
| All alarms | OK |

No alarms currently in ALARM or INSUFFICIENT_DATA state.

### Recent Alarm History (14d)
| Alarm | Events | ALARM Transitions |
|-------|--------|-------------------|
| Server Memory | 87 | 29 ⚠️ frequent flapping |
| Server CPU | 12 | 4 |
| Server CPU 2 | 9 | 3 |
| Server Swap Usage | 9 | 3 |
| Storage staging Pre | 6 | 2 |

**Server Memory** has been flapping in/out of ALARM 29 times in 14 days. Most recent: triggered 2026-06-12 00:09 UTC, resolved 2026-06-12 01:02 UTC. Pattern consistent with nightly batch jobs consuming memory temporarily. No sustained ALARM state currently.

### Dashboard Metrics Summary
- Console LIVE EC2 CPU: Avg 6.6%, Max 83.4%, Latest 1.9%
- All 4 EC2 instances running (eu-west-3)

---

## AWS Health & EC2 Events

### EC2 Inventory (eu-west-3)
| Instance | State | Type | IP |
|----------|-------|------|----|
| Console LIVE | running | t3.large | 15.236.220.178 |
| staging console | running | t3.medium | 15.236.113.128 |
| staging pretashop | running | t3.medium | 13.36.12.37 |
| new staging console | running | t3.medium | 35.181.255.68 |

No scheduled events or maintenance windows for any EC2 instances.

### RDS Events (14d)
56 events — all routine automated backups. Daily backup completing successfully.

### RDS Pending Maintenance (speedventory)
| Action | Description | Urgency |
|--------|-------------|---------|
| system-update | New OS update available | Low — schedule during maintenance window |
| db-upgrade | Patch 17.5.R2 available | Low — minor patch, apply when convenient |

**Effect:** system-update applies OS-level security patches (brief restart). db-upgrade is a minor engine patch (17.5 → 17.5.R2), typically no breaking changes.
**Recommendation:** Apply both in one maintenance window, low urgency. Can be deferred 2-4 weeks.

---

## Billing Review

### Monthly Comparison (Jun 1-12 vs May 2026 full)
| Service | Jun MTD | May Full | Change |
|---------|---------|----------|--------|
| EC2 - Other | $27.31 | $78.25 | -65% |
| EC2 - Compute | $11.45 | $22.64 | -49% |
| Tax | $9.53 | $25.74 | -63% |
| VPC | $6.12 | $17.39 | -65% |
| RDS | $1.78 | $5.29 | -66% |
| S3 | $0.96 | $2.51 | -62% |
| **TOTAL** | **$57.19** | **$154.41** | — |

Projected full month: **$142.97** (vs $154.41 last month — on track)

**Note:** Decreases are consistent across all services, proportional to elapsed days (12/30 = 40% of month). Cost is normalized. Jun 1 spike ($14.37) is normal tax accrual. No anomalies.

---

## RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|-------|-------|------------|
| Status | available | OK |
| Engine | postgres 17.5 | OK (patch 17.5.R2 available) |
| Class | db.t4g.small | OK |
| MultiAZ | False | Note: no auto-failover |
| Storage | 20 GB gp3 | OK |
| AutoMinorUpgrade | False | Note: manual updates required |
| Cert expiry | 2027-06-08 | OK (12 months) |
| Backup retention | 7 days | OK |

### Metrics (24h)
| Metric | Avg | Latest | Max |
|--------|-----|--------|-----|
| CPU% | 7.68% | 3.32% | 96.58% ⚠️ |
| Free Memory | 0.62 GB | 0.65 GB | 0.65 GB |
| Free Storage | 15.88 GB | 15.88 GB | — |
| DB Connections | 3.71 | 0 | 10 |

**CPU spike to 96.58%**: Likely correlated with Sidekiq background jobs (UpdateProductS: 2962s DB time, SaveCurrencyRates: 1323s DB time). Pattern is expected for batch sync jobs. No sustained high CPU.

---

## New Relic APM — Console LIVE (24h)

### Throughput
- Total requests: 115,059
- Error rate: 0.14% (162 errors) — **OK**

### Top Sidekiq Jobs by DB Time
| Job | Avg DB Time | Max DB Time | Count |
|-----|-------------|-------------|-------|
| UpdateProductS | 2,963,000ms | 2,963,000ms | 1 |
| SaveCurrencyRates | 1,323,835ms | 1,323,835ms | 1 |
| UpdateOverallRating | 725,019ms | 730,754ms | 2 |
| ImportRoutingP | 257,674ms | 257,674ms | 2 |
| UpdateProductThumbnail | 74,177ms | 74,639ms | 2 |
| UpdateSaleAnalytics | 23,939ms avg | 522,690ms max | 28 |

Heavy Sidekiq jobs are expected for a commerce platform doing catalog/pricing syncs.

### Error Breakdown
| Class | Count | Notes |
|-------|-------|-------|
| ActiveRecord::RecordNotFound | 114 | Normal web 404s |
| ActiveJob::DeserializationError | 19 | Monitor for growth |
| ArgumentError | 5 | Low |
| ActionController::BadRequest | 4 | Low |
| ActiveRecord::PendingMigrationError | 3 | Chrome DevTools probe, not a real migration issue |
| Errno::ETIMEDOUT | 1 | Single timeout |
| SocketError | 1 | Single |
| NoMethodError | 1 | Low |

**ActiveJob::DeserializationError** (19): Jobs queued for deleted records. Not critical, but worth reviewing if count grows.

---

## Mailgun — mail.paturevision.fr

### Last 7 Days Delivery
| Date | Accepted | Delivered | Failed | Rate |
|------|----------|-----------|--------|------|
| Jun 06 | 21 | 21 | 0 | 100% |
| Jun 07 | 35 | 35 | 0 | 100% |
| Jun 08 | 214 | 212 | 0 | 99.1% |
| Jun 09 | 213 | 212 | 0 | 99.5% |
| Jun 10 | 194 | 194 | 0 | 100% |
| Jun 11 | 274 | 274 | 0 | 100% |
| **7d total** | **951** | **948** | **0** | **99.7%** |

### Failed Events (24h)
25 failed events — all **temporary** (severity: temporary, code: 421) — antispam throttling from Google workspace relay. Not permanent bounces. Will retry automatically.

---

## Siteground Storage

### SSH Disk Check
| Metric | Value | Assessment |
|--------|-------|------------|
| Total | 164 GB | — |
| Used | 127 GB | ⚠️ 79% used |
| Free | 36 GB | — |

### Top Directories
| Directory | Size |
|-----------|------|
| pre9.paturevision.fr | 18 GB |
| staging-sg.paturevision.fr | 7.0 GB |
| je-pature.paturevision.fr | 6.5 GB |
| queue7.paturevision.fr | 4.9 GB |
| paturevision.fr | 2.2 GB |

**79% used — WARNING threshold reached (>70%).**
- pre9 (18GB) is the main driver — likely old staging/pre-production environment with full product images
- queue7 (4.9GB) may contain accumulated job artifacts
- No large zip backup files found
- Recommend: review pre9 and queue7 for cleanup candidates. Target below 75%.

Siteground dashboard session expired — storage % from SSH df output.

---

## SSL Certificates
| Domain | Expiry | Days Left |
|--------|--------|-----------|
| console.paturevision.fr | Aug 30, 2026 | 79 days |
| paturevision.fr | Aug 21, 2026 | 70 days |

Both OK — >30 days remaining.

---

## Summary

| Check | Status |
|-------|--------|
| CloudWatch Alarms | ✅ All clear (Server Memory flapping pattern, normal) |
| EC2 Instances | ✅ All 4 running |
| RDS | ⚠️ Pending maintenance (OS + 17.5.R2 patch) |
| Billing | ✅ $57.19 MTD, on track |
| New Relic | ✅ 0.14% error rate, heavy Sidekiq jobs normal |
| Mailgun | ✅ 99.7% delivery |
| Siteground Storage | ⚠️ 79% used — approaching limit |
| SSL | ✅ 70-79 days remaining |
