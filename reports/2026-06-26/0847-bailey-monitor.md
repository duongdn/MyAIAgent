# Bailey Monitor — 26/06/2026

**Run time:** 08:47 VN (01:47 UTC)
**Status: WARNING** — Nightly memory spikes (14-day recurring), Redis connection failures, staging storage near threshold

---

## S1: CloudWatch — Bailey (eu-west-3)

### Alarms (Current State)
| Alarm | State | Threshold | Last Value |
|-------|-------|-----------|------------|
| RDS Storage | OK | <5GB free | 16GB free |
| Server CPU | OK | >70% | 69.95% (24-Jun near-miss) |
| Server CPU 2 | OK | >70% | 67.5% (15-Jun near-miss) |
| Server Disk Available | OK | <5GB | 9.2GB |
| Server Memory | OK | >90% | 79.87% (cleared 01:02 UTC) |
| Server Memory 2 | OK | >90% | 14.6% |
| Server Swap Usaged | OK | >5000MB | 4178.9MB (84% of threshold) |
| Server Swap Usaged 2 | OK | >2000MB | 0MB |
| Storage Staging Server | OK | <5GB | 5.4GB ⚠️ very close |
| Storage staging server Pre | OK | <5GB | 5.5GB ⚠️ very close |

### Recent Alarm History (14d) — Key Events
| Date | Alarm | Event |
|------|-------|-------|
| 2026-06-26 | Server Memory | ALARM 00:07 UTC → OK 01:02 UTC (tonight) |
| 2026-06-25 | Server Memory | ALARM 22:32 UTC → OK 01:02 UTC |
| 2026-06-25 | Server Swap | ALARM 24-Jun 22:16 → OK 25-Jun 01:04 |
| 2026-06-24 | Server CPU | ALARM 12:02 UTC → OK 12:03 UTC (brief) |
| 2026-06-15 | Server CPU 2 | ALARM 02:16 UTC → OK 02:19 UTC |
| 2026-06-12 → 2026-06-26 | Server Memory | **Nightly ALARM every single night** — fires ~22:xx UTC, clears ~01:xx UTC |

### ⚠️ Critical Pattern: Nightly Memory Spikes
Server Memory has fired **every night for 14+ days** (~22:xx UTC → 01:xx UTC pattern). Likely caused by nightly Sidekiq batch jobs (SaveCurrencyRateJob, UpdateProductSoldInMonthsJob, UpdateOverallRankingJob) consuming >90% memory. Not yet an emergency (clears by morning) but needs investigation.

---

## S2: AWS Health & Events

**EC2 Instances (eu-west-3):**
| Instance | State | Name |
|----------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging prestashop |
| i-0c3044928d3a31ef8 | running | new staging console |

- EC2 scheduled events: 0 (eu-west-2 & eu-west-3)
- RDS events (eu-west-3): Daily automated snapshots running normally (all successful)
- RDS events (eu-west-2): None

**RDS Pending Maintenance (speedventory):**
| Action | Description | Effect | Urgency |
|--------|-------------|--------|---------|
| system-update | New OS update available | Reboot required, ~2-3 min downtime | Schedule within 1-2 weeks |
| db-upgrade | Patch 17.5.R2 available | Minor patch, ~5-10 min downtime | Low urgency, schedule at convenience |

---

## S3: Billing Review

### June vs May 2026
| Service | June MTD | May Total | Change |
|---------|----------|-----------|--------|
| EC2 - Other | $65.01 | $78.25 | -17% |
| EC2 - Compute | $27.73 | $22.64 | +22% |
| Tax | $23.10 | $25.74 | -10% |
| VPC | $14.75 | $17.39 | -15% |
| S3 | $2.16 | $2.51 | -14% |
| RDS | $4.23 | $5.29 | -20% |
| CloudWatch | $1.42 | $2.40 | -41% |
| Cost Explorer | $0.22 | $0.19 | +16% |
| **Total** | **$138.62** | **$154.41** | **-10%** |

- June 1st spike ($27.94) = normal tax accrual
- Daily spend: $4.56–$4.96, very consistent
- No anomalies (no service >50% increase)
- **Status: OK**

---

## S4: RDS Monitoring (speedventory)

### Instance Config
| Property | Value | Assessment |
|----------|-------|------------|
| Engine | PostgreSQL 17.5 | Pending patch: 17.5.R2 |
| Class | db.t4g.small (2GB RAM) | Adequate for current load |
| Status | available | OK |
| MultiAZ | False | ⚠️ No HA (single point of failure) |
| PubliclyAccessible | True | ⚠️ Security risk — should be False |
| AutoMinorVersionUpgrade | False | ⚠️ Manual patching required |
| Storage | 20GB gp3 | 15.86GB free (79%) |
| CA Cert expiry | 2027-06-08 | OK (12 months) |
| Pending maintenance | OS + engine patch | Schedule soon |

### Metrics (24h)
| Metric | Latest | Avg 24h | Max 24h |
|--------|--------|---------|---------|
| CPUUtilization | 3.58% | 6.74% | **93.77%** ⚠️ |
| FreeableMemory | 0.65GB | 0.63GB | 0.68GB |
| FreeStorageSpace | 15.86GB | 15.86GB | 15.86GB |
| DatabaseConnections | 2.5 | 4.57 | 10 |
| SwapUsage | 0.01GB | 0.01GB | 0.02GB |
| DiskQueueDepth | 0.01 | 0.01 | 0.10 |

**Issues:**
- CPU spike to 93.77% — likely correlated with heavy Sidekiq jobs (saves currency rates, updates rankings)
- FreeableMemory only 0.63GB avg — tight for db.t4g.small, consider upgrade if load grows
- PubliclyAccessible=True should be remediated (security)

---

## S5: New Relic APM — Console LIVE (24h)

### Top Sidekiq Jobs by DB Time
| Job | Avg DB Time | Calls |
|-----|-------------|-------|
| SaveCurrencyRateJob | 1540s | 1 |
| UpdateProductSoldInMonthsJob | 1301s | 1 |
| UpdateOverallRankingJob | 731s | 2 |
| ImportRoutingPlanJob | 264s | 1 |
| UpdateProductTendencyCacheJob | 44s | 2 |
| ReceiveCsvFromSchenkerJob | 20s | 1 |

### Errors (24h)
| Class | Count | Message |
|-------|-------|---------|
| ActiveRecord::RecordNotFound | 72 | Couldn't find Order id=43021 — stale reference, benign |
| **Redis::CannotConnectError** | **10** | **⚠️ Error connecting to Redis on localhost:6379 (connection refused)** |
| ActiveJob::DeserializationError | 9 | Deserialization error (likely related to RecordNotFound) |
| ActionController::BadRequest | 8 | Invalid UTF-8 byte sequence in params |
| ArgumentError | 2 | wrong number of arguments (5 given, 4 expected) |
| ActiveRecord::Deadlocked | 1 | PG deadlock detected |
| SocketError | 1 | DNS resolution failure (transient) |

### Hourly Error Rate
- Mostly 0% — peaks at 1.06% (1 hour slot)
- ~1100–1230 transactions/hour

### ⚠️ Redis Connection Failures
10x Redis::CannotConnectError in 24h on localhost:6379. Redis is intermittently unavailable — likely during the nightly memory pressure period. This correlates with Server Memory alarm pattern. If Redis OOMs/restarts during heavy jobs, Sidekiq queue processing breaks temporarily.

---

## S6: Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats
| Date | Accepted | Delivered | Failed | Rate |
|------|----------|-----------|--------|------|
| 13-Jun | 13 | 13 | 0 | 100% |
| 14-Jun | 26 | 26 | 0 | 100% |
| 15-Jun | 324 | 324 | 0 | 100% |
| 16-Jun | 224 | 224 | 0 | 100% |
| 17-Jun | 191 | 191 | 0 | 100% |
| 18-Jun | 173 | 173 | 0 | 100% |
| 19-Jun | 170 | 170 | 0 | 100% |
| 20-Jun | 14 | 14 | 0 | 100% |
| 21-Jun | 24 | 24 | 0 | 100% |
| 22-Jun | 160 | 160 | 0 | 100% |
| 23-Jun | 168 | 168 | 0 | 100% |
| 24-Jun | 178 | 178 | 0 | 100% |
| 25-Jun | 189 | 189 | 0 | 100% |
| **Total** | **1854** | **1854** | **0** | **100.0%** |

- 10 generic "failed" events in 24h events API (likely webhook/tracking events, not email delivery)
- No bounces, no complaints
- **Status: OK (100.0%)**

---

## S7: Siteground Storage (via SSH — dashboard session expired)

### Disk Usage (SSH)
| Directory | Size | Note |
|-----------|------|------|
| pre9.paturevision.fr | 13GB | Largest — old staging |
| staging-sg.paturevision.fr | 7GB | Staging |
| je-pature.paturevision.fr | 7GB | Staging |
| paturevision.fr | 2.2GB | Production |
| staging-je-pature.paturevision.fr | 405MB | |
| Others (console, mail, outils, etc.) | <500KB each | |
| **Total www** | **~29GB** | |

- No large .zip files found
- CloudWatch staging storage alarms: 5.4GB and 5.5GB free vs 5GB threshold — very close
- Production disk: OK
- **Status: OK** (no alarms triggered, SSH shows no critical issues)

---

## SSL Certificates
| Domain | Expiry | Days Remaining | Status |
|--------|--------|----------------|--------|
| console.paturevision.fr | Aug 21, 2026 | ~56 days | OK |
| paturevision.fr | Aug 30, 2026 | ~65 days | OK |

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| CloudWatch Alarms | ⚠️ WARNING | Nightly memory spikes 14+ days, swap near-threshold |
| EC2 Health | ✅ OK | 4 instances running, no events |
| RDS Events | ✅ OK | Daily backups running, no failures |
| RDS Pending Maint | ℹ️ INFO | OS update + patch 17.5.R2 pending |
| Billing | ✅ OK | $138.62 MTD, 10% below last month |
| RDS Metrics | ⚠️ WARNING | CPU spike 93.77%, memory tight |
| New Relic | ⚠️ WARNING | 10x Redis connection failures |
| Mailgun | ✅ OK | 100.0% delivery rate |
| Siteground | ✅ OK | SSH shows normal, no zip backups |
| SSL | ✅ OK | Both certs expire Aug 2026 (>30d) |

### Recommended Actions
1. **Investigate nightly memory pattern** — identify which Sidekiq jobs are causing >90% memory at ~22:xx UTC. Consider scheduling heavy jobs during off-peak or adding more RAM.
2. **Redis stability** — 10x connection failures in 24h. Check Redis maxmemory config and logs. May be OOM-killed during heavy batch periods.
3. **RDS PubliclyAccessible=True** — schedule remediation (set to False, update VPC routing).
4. **Staging disk space** — 5.4GB/5.5GB free on staging servers vs 5GB threshold. Clean up pre9 (13GB) if no longer needed.
5. **RDS pending maintenance** — schedule during next maintenance window.
