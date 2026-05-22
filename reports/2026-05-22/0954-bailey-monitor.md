# Bailey Monitor — 2026-05-22 09:54

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Notes |
|-------|-------|-------|
| Server Memory | OK | Fires nightly ~22:00 UTC, clears by 01:00 UTC — recurring pattern |
| Server CPU | OK | 1-min spike at 00:01 UTC today, self-resolved |
| Server Swap Usaged | OK | 1-min spike at 00:02 UTC today (alongside CPU) |
| Server CPU 2 | OK | 1-min spike 2026-05-20 09:21, self-resolved |
| All others | OK | No issues |

### Recent Alarm History (14d)
- **Server Memory**: ALARM every evening ~22:00–01:00 UTC (DAILY pattern for 14 days) — nightly batch jobs consuming memory, returns to normal by ~01:00. Needs investigation.
- **Server CPU**: Brief 1-min spike 2026-05-22 00:01 UTC and 2026-05-21 11:17 UTC — correlated with memory/swap spikes
- **Server CPU 2**: 1-min spike 2026-05-20 09:21 UTC (staging server)

### Dashboard Metrics Monitored
Server CPU, Server CPU 2, Server Memory, Server Memory 2, Server Swap Usaged x2, Server Disk Available, RDS Storage, Storage Staging Server, Storage staging server Pre

### Issues / Warnings
- ⚠️ **Server Memory** fires nightly — consistent pattern for 14+ days. Likely Sidekiq batch jobs (UpdateProductSoldInMonthsJob, UpdateOverallRankingJob, UpdateSaleAnalyticCacheJob run at night). Not critical but should be profiled.

---

## AWS Health & Event Log

### EC2 Instances (eu-west-3)
| Instance | State | Name | Type |
|----------|-------|------|------|
| i-097f6eee5762c82f3 | running | Console LIVE | t3.large |
| i-01a7339df8c663ed6 | running | staging console | t3.medium |
| i-0f82e81d2a07a28b9 | running | staging pretashop | t3.medium |
| i-0c3044928d3a31ef8 | running | new staging console | t3.medium |

- No scheduled EC2 events (eu-west-2 or eu-west-3)
- "new staging console" added ~May 11-12 (reflected in billing jump)

### RDS Events (14d)
- Only automated daily backup events for `speedventory` — all successful (13:00–13:05 UTC daily)

### RDS Pending Maintenance (speedventory)
| Action | Description | Effect | Urgency |
|--------|-------------|--------|---------|
| system-update | New OS update available | OS patches, no downtime expected | Low — schedule next maintenance window |
| db-upgrade | 17.5.R2 available | Minor patch, bug fixes/security | Medium — schedule within 30 days |

---

## Billing Review

### Monthly Comparison (MTD May 21d vs April full month)
| Service | May MTD | April Full | Notes |
|---------|---------|------------|-------|
| EC2 - Other | $50.98 | $75.06 | Down ~32% ✓ |
| EC2 Compute | $10.84 | $0.00 | **New** — 3 new t3.medium instances from May 11-12 |
| VPC | $11.19 | $14.40 | Down 22% ✓ |
| Tax | $15.76 | $20.10 | Down (proportional) |
| RDS | $3.52 | $5.43 | Down ✓ |
| S3 | $1.60 | $3.11 | Down ✓ |
| CloudWatch | $0.59 | $2.40 | Down ✓ |
| **TOTAL MTD** | **$94.57** | **$120.62** | Proj ~$140/mo with new EC2 |

### Daily Trend
- May 1: $18.86 (tax accrual — normal)
- May 2-10: ~$3.0-3.3/day
- May 11-12: jump to ~$3.7-4.65 (new staging EC2s added)
- May 12-21: stable at ~$4.55-4.78/day

**Assessment:** Billing increase due to 3 new staging EC2 t3.medium instances (~$1.13/day). Intentional change. No anomaly.

---

## RDS Monitoring — speedventory

### Instance Config
| Setting | Value | Assessment |
|---------|-------|------------|
| Engine | PostgreSQL 17.5 | OK; 17.5.R2 patch available |
| Class | db.t4g.small | OK |
| MultiAZ | **false** | ⚠️ No HA — single point of failure |
| PubliclyAccessible | **true** | ⚠️ Security risk — DB exposed to internet |
| AutoMinorVersionUpgrade | **false** | ⚠️ Manual updates only |
| Storage | 20GB gp3 | OK |
| Cert expiry | 2026-12-01 | OK (6+ months) |
| Status | available | OK |

### Metrics (last 1h)
| Metric | Current | Assessment |
|--------|---------|------------|
| CPU | ~4% | OK |
| Free Memory | ~667MB | OK (~44% of 1.5GB) |
| Free Storage | ~17GB | OK (85% free) |
| Connections | 5 | OK |

### Issues
1. ⚠️ **PubliclyAccessible=true** — RDS exposed to internet. Recommend restrict to VPC only.
2. ⚠️ **MultiAZ=false** — no failover. Acceptable for staging; check if speedventory is production.
3. ⚠️ **AutoMinorVersionUpgrade=false** — must apply patches manually.
4. 🔧 **Pending maintenance**: system-update + db-upgrade to 17.5.R2 — schedule soon.

---

## New Relic APM — Console LIVE (24h)

### Top Jobs by DB Time
| Job | DB Time | Duration | Count |
|-----|---------|----------|-------|
| UpdateProductSoldInMonthsJob | 2183s | 2396s | 1 |
| SaveCurrencyRateJob | 1492s | 3579s | 1 |
| UpdateOverallRankingJob | 698s | 713s | 2 |
| UpdateSaleAnalyticCacheJob | 300s | 730s | 7 |
| ImportRoutingPlanJob | 268s | 363s | 1 |
| sales_analytics/show (web) | 3.8s | 4.3s | 4 |

### Error Rate (hourly)
- Normal: 0.00–0.46%
- **Spike at ~03:56 UTC: 5.26%** (304 transactions) — notable, isolated spike
- No sustained elevated error rate

### Errors by Class (24h)
| Error | Count | Message |
|-------|-------|---------|
| ActiveRecord::RecordNotFound | 83 | Couldn't find Order id=42228 — normal stale link |
| ActionView::Template::Error | 8 | nil NilClass — code issue |
| ActiveJob::DeserializationError | 7 | **Redis connection pool exhausted** |
| ActionController::BadRequest | 4 | Invalid UTF-8 params |
| **Redis::CannotConnectError** | **3** | **getaddrinfo failure: redis://redis:6379** — DNS resolution failing |
| ActiveRecord::Deadlocked | 2 | PG deadlock detected |
| NoMethodError | 2 | customer_ranking_options undefined |
| RuntimeError (deadlock) | 2 | PG deadlock (duplicate) |
| NameError | 2 | product_packs_products_path undefined |
| Errno::ENOENT | 1 | PDF file missing |

### Issues
1. ⚠️ **Redis::CannotConnectError** (3x): `getaddrinfo: Temporary failure in name resolution (redis://redis:6379)` — Redis hostname "redis" not resolving. Could be intermittent Docker networking issue. If recurring, check Redis container/service status.
2. ⚠️ **DB Deadlocks** (4x): PG deadlock detected — likely contention in batch jobs. Monitor for increase.
3. ℹ️ **03:56 UTC error spike** (5.26%) — isolated, could be related to Redis failures during batch runs.

---

## Mailgun — mail.paturevision.fr (US endpoint)

### 14-Day Delivery Stats
| Date | Sent | Delivered | Failed | Rate |
|------|------|-----------|--------|------|
| May 9 | 14 | 14 | 0 | 100% |
| May 10 | 36 | 36 | 0 | 100% |
| May 11 | 551 | 550 | 43 | 99.8% |
| May 12 | 307 | 305 | 24 | 99.3% |
| May 13 | 88 | 88 | 11 | 100% |
| May 14-17 | ~130 | ~130 | ~4 | 100% |
| May 18 | 285 | 285 | 26 | 100% |
| May 19 | 224 | 224 | 31 | 100% |
| May 20 | 241 | 241 | 23 | 100% |
| May 21 | 225 | 225 | 40 | 100% |
| **Total 14d** | **2103** | **2100** | **202** | **99.9%** |

### Failed Events (48h)
50 failures total (all temporary):
- laura@paturevision.fr: 23x
- karine@paturevision.fr: 14x
- sarah@paturevision.fr: 9x
- joey@paturevision.fr: 3x
- info@paturevision.fr: 1x

**Reason:** "Try again later" — soft bounces from antispam.mailspamprotection.com. All have 99.9%+ delivered rate. Likely anti-spam filtering on paturevision.fr receiving MX. Delivery rate is fine.

---

## Siteground — Paturevision

### Disk Usage (SSH)
| Directory | Size |
|-----------|------|
| pre9.paturevision.fr | 14G |
| staging-sg.paturevision.fr | 7.0G |
| je-pature.paturevision.fr | 6.1G |
| queue7.paturevision.fr | 4.9G |
| paturevision.fr | 2.1G |
| staging-je-pature.paturevision.fr | 386M |
| Other sites | ~1.5M |
| **Total ~/www** | **34G** |

**Disk (/):** 7.1GB used / 9.8GB = **74%** — just below 75% alert threshold

### Assessment
- 74% disk — borderline, 1% below alert. Recommend monitoring.
- `pre9.paturevision.fr` at 14G is largest consumer — old PrestaShop environment likely safe to review for cleanup.
- Siteground dashboard session expired — could not get CPU/RAM stats from dashboard.

### SSL Certificates
| Domain | Expiry | Days Left | Status |
|--------|--------|-----------|--------|
| console.paturevision.fr | Jul 1, 2026 | 40 days | OK |
| paturevision.fr | **Jun 22, 2026** | **31 days** | ⚠️ WARNING |

**Action needed:** Renew `paturevision.fr` SSL within 31 days.

---

## Summary

| Check | Status |
|-------|--------|
| CloudWatch alarms | OK (nightly memory spikes pattern noted) |
| EC2 instances | OK |
| RDS backups | OK |
| RDS config | ⚠️ WARNING (public access, no MultiAZ, pending updates) |
| Billing | OK ($94.57 MTD, +EC2 compute expected) |
| New Relic | ⚠️ WARNING (Redis DNS failures, DB deadlocks, 03:56 spike) |
| Mailgun | OK (99.9% delivery) |
| Siteground disk | ⚠️ WARNING (74%, borderline) |
| SSL - console | OK (40 days) |
| SSL - prestashop | ⚠️ WARNING (31 days) |
