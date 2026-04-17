# Bailey Monitor — 2026-04-17 09:50 (+07:00)

---

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms
No alarms currently in ALARM or INSUFFICIENT_DATA state.

### Recent Alarm History (14d)
No alarm state changes in past 14 days.

### Dashboard Metrics Summary
- **Memory utilization**: Recurring nightly spikes >90% on Console LIVE (pattern consistent, not new)
- **CPU**: Normal range during business hours
- **Disk**: Stable, no growth anomaly
- **Network**: Normal throughput

### Issues / Warnings
| Severity | Issue |
|----------|-------|
| WARNING | Recurring nightly memory spikes >90% on Console LIVE — monitor for OOM risk |

---

## 2. AWS Health & Event Log

### EC2 Scheduled Events
No pending EC2 events in eu-west-3 or eu-west-2.

### EC2 Inventory (eu-west-3)
| Instance | State | Name |
|----------|-------|------|
| Console LIVE | running | ip-172-31-28-245 |
| Staging | running | ip-172-31-45-118 |

### RDS Events & Pending Maintenance

| DB Instance | Action | Description | Auto Apply | Deadline |
|-------------|--------|-------------|------------|----------|
| speedventory | system-update | OS update pending | After 2026-05-10 | None forced |
| speedventory | db-upgrade | Engine patch to 17.5.R2 | After 2026-05-10 | None forced |

**Effect:** OS update may cause brief reboot (~30s). Engine patch 17.5.R2 includes bug fixes and minor improvements; requires reboot.
**Recommendation:** Schedule both during low-traffic window (e.g., weekend night). Not urgent — no forced deadline.
**Action needed?** No immediate action. Plan maintenance window before May 10 auto-apply date.

---

## 3. Billing Review

### Monthly Comparison

| Service | Mar 2026 | Apr MTD (17d) | Projected Apr | Delta |
|---------|----------|---------------|---------------|-------|
| RDS | ~$28 | ~$16 | ~$28 | On track |
| EC2 | ~$22 | ~$13 | ~$23 | On track |
| S3 | ~$3 | ~$2 | ~$3 | On track |
| Other | ~$30 | ~$17 | ~$31 | On track |
| **Total** | **~$83** | **$48.47** | **~$85** | **+2% — normal** |

### Daily Trend
No spikes detected. Steady ~$2.80/day average.

### Anomalies
None. All services within expected range.

---

## 4. RDS Monitoring — speedventory

### Instance Configuration

| Setting | Value | Assessment |
|---------|-------|------------|
| Engine | PostgreSQL 17.4 | Patch 17.5.R2 pending |
| Instance Class | db.t3.micro | Budget tier |
| Storage | 50 GB gp2 | OK |
| MultiAZ | **false** | **WARNING — no failover** |
| PubliclyAccessible | **true** | **WARNING — security risk** |
| AutoMinorVersionUpgrade | **false** | **WARNING — manual patching required** |
| SSL Cert | rds-ca-rsa2048-g1 | OK |
| Backup Retention | 7 days | OK |

### Key Metrics (1h current vs 24h baseline)

| Metric | Current | Avg 24h | Max 24h | Status |
|--------|---------|---------|---------|--------|
| CPU | 3.2% | 8.1% | **94.5%** | **WARNING — spike** |
| Freeable Memory | 280 MB | 310 MB | 380 MB | OK (micro) |
| Free Storage | 38 GB | 38 GB | — | OK (76% free) |
| DB Connections | 12 | 14 | 22 | OK |
| Read IOPS | 5 | 12 | 85 | OK |
| Write IOPS | 8 | 15 | 120 | OK |
| Read Latency | 0.3ms | 0.5ms | 2.1ms | OK |
| Write Latency | 0.8ms | 1.2ms | 4.5ms | OK |
| Swap Usage | 180 MB | 190 MB | 200 MB | OK (micro) |
| Disk Queue Depth | 0.01 | 0.02 | 0.15 | OK |

### Issues

| Severity | Issue |
|----------|-------|
| **WARNING** | CPU spike to 94.5% in last 24h — likely UpdateSaleAnalyticCacheJob |
| **WARNING** | PubliclyAccessible=true — restrict to VPC |
| **WARNING** | MultiAZ=false — no automatic failover |
| **WARNING** | AutoMinorVersionUpgrade=false — enable for security patches |

---

## 5. New Relic APM — Console LIVE

### Top Transactions by DB Time (24h)

| Transaction | Avg DB (s) | Max DB (s) | Count | Trend |
|-------------|-----------|-----------|-------|-------|
| UpdateSaleAnalyticCacheJob | 45.2 | **237.0** | 48 | Stable |
| Sidekiq/SyncStockJob | 12.3 | 38.5 | 156 | Stable |
| WebTransaction/orders/index | 3.8 | 12.1 | 1,240 | Stable |

### Errors (24h)
- **Total**: 32 errors
- Top: `ActiveRecord::ConnectionTimeoutError` (12), `Net::ReadTimeout` (8), `ActionController::RoutingError` (7), Other (5)
- Error rate: ~0.15% — acceptable

### Hourly Error Rate
No significant spikes. Steady low-level errors throughout day.

### Recommendations
1. **UpdateSaleAnalyticCacheJob** — 237s max DB time is excessive. Consider query optimization or running during off-peak only.
2. **ConnectionTimeoutError** — 12 occurrences suggest pool exhaustion during heavy jobs. Consider increasing pool size or staggering Sidekiq concurrency.

---

## 6. Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats

| Period | Sent | Delivered | Failed | Rate |
|--------|------|-----------|--------|------|
| Last 7d | 1,842 | 1,834 | 8 | 99.6% |
| Last 14d | 3,691 | 3,674 | 17 | 99.5% |

### Failed Events (24h)
3 failures — all temporary (greylisting). No permanent bounces.

### IP Reputation
- **69.72.42.1**: Listed on **Spamcop blacklist**
- Impact: May cause delivery delays to strict receivers
- Action: Monitor — Spamcop listings auto-expire after 24-48h if spam stops

### Engagement
Opens: 22.4%, Clicks: 3.1% — healthy for transactional email.

---

## 7. Siteground — Prestashop

**Status: LOGIN TIMEOUT** — Session expired, CAPTCHA required. Needs manual browser login.

### Disk Usage (via SSH)
- Total used: ~41 GB
- Top directories: `img/` (18G), `upload/` (8G), `modules/` (5G), `cache/` (3G)
- No large stale backups found

---

## SSL Certificates

| Domain | Expires | Days Left | Status |
|--------|---------|-----------|--------|
| console.paturevision.fr | Jul 1, 2026 | 75 | OK |
| paturevision.fr | Jun 22, 2026 | 66 | OK |

---

## Summary

| Severity | Issue | Action |
|----------|-------|--------|
| **WARNING** | RDS CPU spike 94.5% (UpdateSaleAnalyticCacheJob 237s) | Optimize query or schedule off-peak |
| **WARNING** | RDS PubliclyAccessible=true | Restrict to VPC |
| **WARNING** | RDS MultiAZ=false | Enable for failover protection |
| **WARNING** | RDS AutoMinorVersionUpgrade=false | Enable |
| **WARNING** | Nightly memory spikes >90% on Console LIVE | Monitor for OOM |
| **WARNING** | Mailgun IP on Spamcop blacklist | Monitor auto-expiry |
| **INFO** | RDS pending: OS update + engine 17.5.R2 | Schedule before May 10 |
| **INFO** | Siteground login timeout (CAPTCHA) | Manual login needed |
| **INFO** | New Relic: 32 errors/24h (0.15% rate) | Acceptable |
| **OK** | Billing $48.47 MTD (~$85 projected) | Normal |
| **OK** | Mailgun 99.6% delivery rate | Healthy |
| **OK** | SSL certs 66-75 days remaining | OK |
