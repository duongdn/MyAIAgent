# Bailey Monitor — 2026-04-10 (09:57 +07:00)

---

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms
No alarms currently in ALARM or INSUFFICIENT_DATA state. All OK.

### Recent Alarm History (14d)

| Alarm | Pattern | Occurrences | Note |
|-------|---------|-------------|------|
| Server Memory | Nightly ~22:00-01:00 UTC ALARM→OK cycle | 14 cycles (daily) | Recurring pattern — likely nightly batch/cron causing memory pressure |
| Server Disk Available | Apr 8 04:13→04:23 UTC | 1 event | Brief disk space dip, auto-recovered in 10 min |
| Server Swap Usaged | Mar 31 22:36→Apr 1 01:03 | 1 event | Coincided with memory alarm |
| Server CPU | Mar 30 13:41→13:42 UTC | 1 event | 1 min spike, auto-recovered |

**Pattern:** Server Memory alarm triggers every night around 22:00 UTC and recovers by ~01:00 UTC. This is a consistent daily pattern (14 consecutive days). Likely a scheduled job (Sidekiq, cron) consuming memory overnight.

### Dashboard Widgets
Widgets: RDS Storage, Server CPU, Server Disk Available, Server Memory, Server Swap Usage (x2 for both servers), Server CPU 2, Server Memory 2, Storage Staging Server, Storage Staging Pre.

---

## 2. AWS Health & Events

### EC2 Scheduled Events
- **eu-west-3:** No scheduled events
- **eu-west-2:** No scheduled events

### EC2 Instance Inventory (eu-west-3)

| Instance | State | Name |
|----------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging pretashop |

### RDS Events (14d)
56 events — all routine automated daily backups at ~13:00 UTC. No errors or anomalies.

### RDS Pending Maintenance

| Resource | Action | Description | Effect | Recommendation | Action needed? |
|----------|--------|-------------|--------|----------------|----------------|
| speedventory | system-update | New OS update available | Minor downtime during maintenance window. Patches OS-level vulnerabilities. | Schedule during low-traffic hours. Not urgent but recommended within 30 days. | Yes — plan maintenance window |
| speedventory | db-upgrade | Engine patch 17.5.R2 | Upgrades from 17.5 to 17.5.R2. Brief restart required. Bug fixes and security patches. | Can be combined with OS update in same window. | Yes — plan with OS update |

**eu-west-2:** No pending maintenance.

---

## 3. Billing Review

### Monthly Comparison (Apr 1-10 vs Mar full month)

| Service | Mar (full) | Mar (prorated 9d) | Apr 1-10 | MoM % | Flag |
|---------|---:|---:|---:|---:|---|
| EC2 - Other | $70.44 | $20.44 | $18.91 | -7.5% | OK |
| Amazon VPC | $14.88 | $4.32 | $4.16 | -3.7% | OK |
| Amazon S3 | $6.83 | $1.98 | $1.67 | -15.7% | OK |
| Amazon RDS | $5.38 | $1.56 | $1.51 | -3.5% | OK |
| CloudWatch | $2.40 | $0.70 | $0.00 | -100% | OK (cost down) |
| Cost Explorer | $0.08 | $0.02 | $0.03 | +30% | OK (negligible) |
| **Tax** | $20.00 | $5.81 | $5.25 | | Normal accrual |
| **Total** | **$120.01** | **$34.84** | **$31.53** | **-9.5%** | **OK** |

### Daily Trend (Apr 1-9)

| Date | Cost | Note |
|---|---:|---|
| Apr 1 | $8.41 | Tax accrual (normal) |
| Apr 2-3 | ~$3.22 | Baseline |
| Apr 4-8 | ~$3.05-3.32 | Baseline |
| Apr 9 | $1.05 | Partial day |

**No anomalies.** All services tracking at or below March pace. Projected full-month (excl tax): ~$87.60 vs March $100.01.

---

## 4. RDS Monitoring — speedventory

### Instance Config

| Property | Value | Assessment |
|----------|-------|------------|
| Engine | PostgreSQL 17.5 | Current |
| Class | db.t4g.small | OK |
| Storage | 20 GB gp3 | OK |
| MultiAZ | **false** | ⚠️ WARNING — no failover |
| PubliclyAccessible | **true** | ⚠️ WARNING — exposed to internet |
| AutoMinorVersionUpgrade | **false** | ⚠️ WARNING — manual patching needed |
| Status | available | OK |
| CA Cert | rds-ca-rsa2048-g1 | OK |

### Metrics (24h)

| Metric | Avg | Max | Assessment |
|--------|-----|-----|------------|
| CPU Utilization | 5.8% | 93.3% | ⚠️ Max spike to 93% |
| Freeable Memory | 642 MB | 677 MB | OK (of ~2GB for t4g.small) |
| Free Storage | 15.95 GB | 15.96 GB | OK (79.8% of 20GB used) |
| DB Connections | 3.5 | 12 | OK |
| Read IOPS | 0.6 | 150 | OK |
| Write IOPS | 3.3 | 44 | OK |
| Swap Usage | 16 MB | 19 MB | OK (minimal) |
| Disk Queue Depth | 0.01 | 0.65 | OK |

**Issues:**
1. **CPU spike to 93%** — likely coincides with purchase_orders/create (maxDB 17.4s) or products/create batch
2. **PubliclyAccessible=true** — security risk, should restrict to VPC/specific IPs
3. **MultiAZ=false** — no automatic failover for production DB
4. **AutoMinorVersionUpgrade=false** — must manually apply patches

---

## 5. New Relic APM — Console LIVE

### Top Slow DB Transactions (>1s DB time, 24h)

| Transaction | Avg DB | Max DB | Count |
|-------------|--------|--------|-------|
| purchase_orders/create | 6.87s | **17.42s** | 3 |
| purchase_orders/notes | 4.47s | 4.80s | 2 |
| orders/show | 3.37s | 4.09s | 5 |
| api/v1/order_events/create | 2.96s | 3.79s | 4 |
| purchase_orders/index | 2.89s | **8.67s** | 60 |
| api/v1/products/create | 2.68s | **10.45s** | 46 |
| palette_product_events/index | 2.50s | **9.97s** | 13 |
| palettes/index | 2.47s | **6.59s** | 14 |
| sales_analytics/show | 2.24s | 3.27s | 6 |

### Errors (24h)

| Error Class | Count | Message |
|-------------|-------|---------|
| ActiveRecord::RecordNotUnique | 13 | PG::UniqueViolation: duplicate key value violates unique constraint |
| ActiveJob::DeserializationError | 11 | Couldn't find ShippingLabel |
| ActionController::BadRequest | 4 | Invalid query parameters: invalid byte sequence in UTF-8 |
| NoMethodError | 2 | undefined method 'orders' for nil:NilClass |

**Total: 30 errors in 24h.** Error rate generally <1% except one spike to 12.5% during low-traffic hour (only 8 requests).

### Key Issues
1. **purchase_orders/create** — max 17.4s DB time, needs query optimization
2. **RecordNotUnique (13)** — race condition in concurrent inserts, needs upsert or advisory lock
3. **DeserializationError (11)** — ShippingLabel records being deleted while jobs reference them

---

## 6. Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats

| Date | Sent | Delivered | Failed | Rate |
|------|------|-----------|--------|------|
| Mar 28 (Sat) | 32 | 32 | 1 temp | 100% |
| Mar 29 (Sun) | 55 | 55 | 7 temp | 100% |
| Mar 30 (Mon) | 290 | 287 | 8t + 3p | 99.0% |
| Mar 31 (Tue) | 303 | 303 | 1 temp | 100% |
| Apr 1 (Wed) | 292 | 292 | 1 temp | 100% |
| Apr 2 (Thu) | 247 | 247 | 0 | 100% |
| Apr 3 (Fri) | 166 | 166 | 0 | 100% |
| Apr 4-5 (Sat-Sun) | 59 | 59 | 0 | 100% |
| Apr 6 (Mon) | 29 | 29 | 0 | 100% |
| Apr 7 (Tue) | 274 | 272 | 15t + 2p | 99.3% |
| Apr 8 (Wed) | 237 | 236 | 4t + 1p | 99.6% |
| Apr 9 (Thu) | 232 | 232 | 2 temp | 100% |
| Apr 10 (Fri) | 2 | 2 | 2 temp | 100% |

**Overall: 2,218 sent → 2,212 delivered = 99.7% delivery rate. OK.**

### Failed Events (24h)
20 events — mostly temporary failures to internal @paturevision.fr addresses (joey, karine, info, corinne, y.jourdain@gmx.fr). 3 permanent failures to quentin.niedercorn@gmail.com (likely invalid/bounced).

### Apr 6 Drop
Volume dropped to 29 emails (Mon) vs 290+ typical Monday. Could be holiday or system change. Recovered Apr 7.

---

## 7. Siteground Statistics

### Session
Siteground dashboard session expired. Stats from SSH only.

### Disk Usage (SSH)

| Directory | Size |
|-----------|------|
| pre9.paturevision.fr/ | 19 GB |
| staging-sg.paturevision.fr/ | 7.2 GB |
| je-pature.paturevision.fr/ | 6.3 GB |
| queue7.paturevision.fr/ | 5.3 GB |
| paturevision.fr/ | 2.2 GB |
| staging-je-pature.paturevision.fr/ | 386 MB |
| Other (mail, outils, console, etc.) | < 1 MB each |
| **Total ~/www** | **40 GB** |

### Filesystem

| | Value |
|--|-------|
| Total | 164 GB |
| Used | 123 GB |
| Available | 42 GB |
| **Usage** | **75%** |

**⚠️ WARNING: Storage at 75% threshold.**
- ~/www = 40 GB (32% of total used)
- Remaining 83 GB used by system + other data outside ~/www
- **pre9.paturevision.fr (19 GB)** is the largest consumer — likely old Prestashop version with accumulated images/cache
- **queue7.paturevision.fr (5.3 GB)** may have stale queue data
- No zip/backup files found in ~/www

**Recommended actions (requires confirmation):**
1. Investigate pre9.paturevision.fr — check if still needed, clean old cache/images
2. Check queue7.paturevision.fr for stale data
3. Check outside ~/www: `du -sh /home/customer/* | sort -rh`

---

## 8. SSL Certificates

| Domain | Expiry | Days Left | Status |
|--------|--------|-----------|--------|
| console.paturevision.fr | Jul 1, 2026 08:34 UTC | ~82 days | OK |
| paturevision.fr | Jun 22, 2026 15:03 UTC | ~73 days | OK |

---

## Summary

| Check | Status |
|-------|--------|
| CloudWatch Alarms | OK (all clear now) |
| Server Memory | ⚠️ Nightly alarm pattern (14 consecutive days) |
| EC2 Events | OK (no scheduled events) |
| RDS Pending | ⚠️ OS update + engine patch 17.5.R2 available |
| Billing | OK ($31.53 MTD, tracking -9.5% vs March) |
| RDS Performance | ⚠️ CPU spike 93%, PubliclyAccessible=true, no MultiAZ |
| New Relic APM | ⚠️ purchase_orders/create 17.4s max, 30 errors/24h |
| Mailgun | OK (99.7% delivery) |
| Siteground Storage | ⚠️ 75% used |
| SSL | OK (73+ days remaining) |
| DB Backup | OK (daily automated) |

### Action Items
1. **Schedule RDS maintenance** — apply OS update + 17.5.R2 patch during low-traffic window
2. **Investigate nightly memory alarm** — check cron/Sidekiq jobs running ~22:00 UTC
3. **Optimize purchase_orders queries** — max 17.4s DB time is excessive
4. **Fix RecordNotUnique errors** — 13 occurrences suggest race condition
5. **Review PubliclyAccessible=true** — restrict RDS access to VPC
6. **Monitor storage** — at 75% threshold, investigate pre9 (19GB) and queue7 (5.3GB)
