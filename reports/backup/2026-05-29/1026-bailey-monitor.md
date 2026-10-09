# Bailey Monitor — 2026-05-29

**Run:** 10:26 +07 | Region: eu-west-3 (primary), eu-west-2

---

## CloudWatch — Bailey (eu-west-3)

### Alarms
All 10 alarms currently **OK**.
| Alarm | Metric | State |
|-------|--------|-------|
| RDS Storage | FreeStorageSpace | OK |
| Server CPU | CPUUtilization | OK |
| Server CPU 2 | CPUUtilization | OK |
| Server Disk Available | DiskSpaceAvailable | OK |
| Server Memory | MemoryUtilization | OK |
| Server Memory 2 | MemoryUtilization | OK |
| Server Swap Usaged | SwapUsed | OK |
| Server Swap Usaged 2 | SwapUsed | OK |
| Storage Staging Server | DiskSpaceAvailable | OK |
| Storage staging server Pre | DiskSpaceAvailable | OK |

### Recent Alarm History (14d)
**Pattern: Server Memory + Server Swap fire nightly ~22:00–00:00 UTC, resolve by ~01:00 UTC.**
This is a recurring pattern across all 14 days — consistent with nightly batch job execution (Sidekiq heavy jobs confirmed in New Relic). Not a new incident.

- 2026-05-29: Memory ALARM 00:09 → OK 01:02; Swap ALARM 22:25 (prev night) → OK 01:04
- 2026-05-28: Memory ALARM 11:59; Swap ALARM 22:25
- 2026-05-27: Memory ALARM 22:08; Swap ALARM 23:12
- Pattern same for May 24–26

### EC2 Instances (eu-west-3)
| Instance | State | Name |
|----------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging pretashop |
| i-0c3044928d3a31ef8 | running | new staging console |

No scheduled events.

---

## AWS Health & Event Log

- **eu-west-2**: No RDS events, no scheduled EC2 events
- **eu-west-3**: Only routine daily RDS backups (succeeding daily ~13:00 UTC)
- **No maintenance windows** or AWS-initiated events

---

## Billing Review

### Monthly Comparison
| Service | Apr 2026 | May MTD (28d) | Change |
|---------|----------|---------------|--------|
| EC2 - Other | $75.06 | $68.76 | -8% ✓ |
| EC2 - Compute | $0 | $18.63 | **NEW** ⚠️ |
| Tax | $20.10 | $22.31 | +11% (proportional) |
| VPC | $14.40 | $15.31 | +6% ✓ |
| RDS | $5.43 | $4.67 | -14% ✓ |
| S3 | $3.11 | $2.27 | -27% ✓ |
| CloudWatch | $2.40 | $1.79 | -25% ✓ |
| **TOTAL** | **$120.62** | **$133.88** | **+11%** |

**Projected full month: ~$144**

### Daily Trend
- Pre May-12: ~$3.08/day
- May 12+ : ~$4.65/day (+51%)

**Root cause:** "new staging console" EC2 instance added ~May 12. EC2 Compute line is on-demand compute billing ($1.01–$1.13/day) for this new instance. EC2-Other dropped by ~$0.08/day (probably some previous cost moved categories). **Net new spend: ~$1.60/day ($50/month).**

**Action needed:** Confirm with client that "new staging console" instance is intentional and budgeted.

---

## RDS — speedventory (eu-west-3)

### Instance Config
| Setting | Value | Assessment |
|---------|-------|------------|
| Engine | PostgreSQL 17.5 | OK |
| Class | db.t4g.small | OK |
| Storage | 20GB gp3 | OK |
| MultiAZ | False | ⚠️ Single-AZ (known, cost trade-off) |
| PubliclyAccessible | **True** | ⚠️ Exposed — should be restricted |
| AutoMinorVersionUpgrade | False | ⚠️ Manual upgrade needed |
| Cert (CA) | rds-ca-rsa2048-g1 | OK |
| Cert expiry | 2026-12-01 | OK (6 months) |
| Pending mods | None | OK |
| Daily backups | Succeeding | OK |

### Metrics (avg24h / max24h)
| Metric | Avg 24h | Max 24h | Status |
|--------|---------|---------|--------|
| CPUUtilization | 7.26% | **93.33%** | ⚠️ High max (batch jobs) |
| FreeableMemory | 651 MB | 680 MB | OK |
| FreeStorageSpace | 16.3 GB | 17.1 GB | OK (80% free) |
| DatabaseConnections | 3.3 | 10 | OK |
| ReadIOPS | 1.3 | 908 | OK (burst for backups) |
| WriteIOPS | 3.8 | 195 | OK |
| ReadLatency | <1ms | 10ms | OK |
| WriteLatency | <1ms | 40ms | OK |

### Pending Maintenance
| Action | Description | Urgency |
|--------|-------------|---------|
| system-update | New OS update available | Medium — schedule in next 2 weeks |
| db-upgrade | PostgreSQL 17.5.R2 patch | Low — apply after OS update |

**Recommendation:** Schedule maintenance window to apply both. OS update may require brief reboot (~1-2min). DB patch likely online upgrade.

---

## New Relic APM — Console LIVE

### Top Transactions by DB Time (24h)
| Transaction | Avg DB | Max DB | Calls |
|-------------|--------|--------|-------|
| UpdateProductSoldInMonthsJob | 2381s | 2381s | 1 |
| SaveCurrencyRateJob | 1401s | 1401s | 1 |
| UpdateOverallRankingJob | 713s | 724s | 2 |
| ImportRoutingPlanJob | 259s | 259s | 6 |
| UpdateProductTendencyCacheJob | 50s | 54s | 2 |
| ReceiveCsvFromSchenkerJob | 26s | 26s | 5 |
| purchase_order_disputes/edit | 12.5s | 93s | 9 |
| purchase_drafts/show | 11.4s | 95s | 13 |

*Long-running Sidekiq batch jobs are expected. These correlate with nightly Memory/Swap alarms.*

### Top Transactions by Volume (24h)
| Transaction | Calls | Avg Response |
|-------------|-------|-------------|
| orders/to_be_picked | 36,581 | 54ms |
| api/v1/products/create | 22,416 | 335ms |
| palette_product_events/index | 14,438 | 82ms |
| orders/show | 11,114 | 88ms |
| Middleware/call | 3,451 | 583ms |

### Error Rate (4h buckets, 24h)
| Period (UTC) | Avg Response | Error Rate |
|-------------|-------------|------------|
| 03:24 | 257ms | 0.06% |
| 07:24 | 188ms | 0.07% |
| 11:24 | 161ms | 0.12% |
| 15:24 | 307ms | 0.50% |
| 19:24 | **5885ms** | 0.88% |
| 23:24 | 1086ms | 0.00% |

*19:24 UTC = 02:24 +07 — peak batch job period, high avg is from Sidekiq jobs, not user requests.*

### Errors (24h)
| Class | Count | Sample Message |
|-------|-------|----------------|
| ActiveRecord::RecordNotFound | — | Couldn't find Order with 'id'=42367 |
| ActionView::Template::Error | — | undefined method `field_name' |
| ActiveJob::DeserializationError | — | Couldn't find ShippingLabel |
| Errno::ETIMEDOUT | — | Connection timed out to 52.28.36.155:21 (FTP!) |
| ActionController::BadRequest | — | Invalid UTF-8 query param |
| NoMethodError | — | undefined method `quantity' for nil |

⚠️ **FTP timeout** to 52.28.36.155:21 — investigate if this is a configured FTP destination that's unreachable.

---

## Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats
| Date | Sent | Delivered | Perm Fail | Temp Fail | Rate |
|------|------|-----------|-----------|-----------|------|
| May 16 | 20 | 20 | 0 | 0 | 100.0% |
| May 17 | 22 | 22 | 0 | 0 | 100.0% |
| May 18 | 285 | 285 | 0 | 26 | 100.0% |
| May 19 | 224 | 224 | 0 | 31 | 100.0% |
| May 20 | 241 | 241 | 0 | 23 | 100.0% |
| May 21 | 225 | 225 | 0 | 40 | 100.0% |
| May 22 | 225 | 222 | 3 | 13 | 98.7% |
| May 23 | 16 | 16 | 0 | 0 | 100.0% |
| May 24 | 23 | 23 | 0 | 0 | 100.0% |
| May 25 | 117 | 117 | 0 | 14 | 100.0% |
| May 26 | 150 | 150 | 0 | 7 | 100.0% |
| May 27 | 205 | 205 | 0 | 20 | 100.0% |
| May 28 | 228 | 228 | 0 | 35 | 100.0% |
| **TOTAL** | **1981** | **1978** | **3** | **212** | **99.8%** |

**Status: OK** — 99.8% overall delivery. 3 permanent failures on May 22 (bounce). Temp failures (retry-and-succeed) are normal.

---

## Siteground — paturevision.fr

**Siteground session expired** — could not fetch dashboard stats. Used SSH fallback.

### Disk Usage (SSH)
| Total | Used | Free | Usage% |
|-------|------|------|--------|
| 164 GB | 122 GB | 40 GB | **74%** |

⚠️ **WARNING — 74% used (approaching 75% alert threshold)**

### Top Directories
| Directory | Size |
|-----------|------|
| pre9.paturevision.fr | 15 GB |
| staging-sg.paturevision.fr | 7.0 GB |
| je-pature.paturevision.fr | 6.2 GB |
| queue7.paturevision.fr | 4.9 GB |
| paturevision.fr | 2.1 GB |
| staging-je-pature.paturevision.fr | 405 MB |

No large zip/backup files found. **pre9** (15GB) and staging directories (7+6.2GB) are the main consumers.

**Note:** Siteground login needs refresh — run `node scripts/siteground-storage.js --login` to re-authenticate.

---

## SSL Certificates

| Domain | Expiry | Status |
|--------|--------|--------|
| console.paturevision.fr | **Jul 1, 2026 GMT** | ⚠️ WARNING — 33 days |
| paturevision.fr | Aug 21, 2026 GMT | OK (84 days) |

⚠️ **console.paturevision.fr SSL expires in 33 days** — schedule renewal if auto-renew is not configured.

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| CloudWatch alarms | ✅ OK | All 10 alarms in OK state |
| EC2 scheduled events | ✅ OK | No events |
| RDS backup | ✅ OK | Daily backups succeeding |
| RDS metrics | ⚠️ WARNING | CPU spike 93% (batch), PubliclyAccessible=True |
| RDS pending maintenance | ⚠️ INFO | OS update + DB patch available |
| New Relic APM | ✅ OK | Error rate <1%, heavy Sidekiq expected |
| Mailgun delivery | ✅ OK | 99.8% delivery rate |
| Siteground storage | ⚠️ WARNING | 74% used (122/164 GB) |
| Billing | ⚠️ INFO | +$50/mo new "staging console" instance (May 12+) |
| SSL console | ⚠️ WARNING | Expires Jul 1 (33 days) |
| SSL prestashop | ✅ OK | Expires Aug 21 |

### Action Items
1. **Confirm** "new staging console" EC2 instance is budgeted (+$50/mo ongoing)
2. **Renew** console.paturevision.fr SSL (expires Jul 1 — 33 days)
3. **Schedule** RDS maintenance (OS update + 17.5.R2 patch) — low urgency
4. **Investigate** FTP timeout errors to 52.28.36.155:21 in New Relic
5. **Re-auth** Siteground browser session (`--login` flag)
6. **Monitor** storage growth — 74% is approaching alert threshold (75%)
