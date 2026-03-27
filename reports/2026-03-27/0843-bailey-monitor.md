# Bailey Monitor Report — 2026-03-27 08:43

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Note |
|-------|-------|------|
| All 10 alarms | **OK** | No active alarms at scan time |

### Recent Alarm History (14d)
| Date (UTC) | Alarm | Event |
|------------|-------|-------|
| Mar 26, 22:27 | **Server Memory** | OK → ALARM (90.1% > 90%, Console LIVE i-097f6eee5762c82f3) |
| Mar 27, 01:02 | Server Memory | ALARM → OK (78.4%) |
| Mar 25, 22:25 | Server Memory | OK → ALARM (91.5% > 90%) |
| Mar 26, 01:02 | Server Memory | ALARM → OK (78.9%) |

**⚠️ RECURRING:** Server Memory alarm fires nightly ~22:20-22:30 UTC, resolves ~01:00 UTC. Observed Mar 25 + Mar 26 consecutively. Likely scheduled job causing memory pressure around 05:00-06:00 Saigon time.

### Dashboard Widgets (10)
Server CPU, Server Memory, Server Swap, Server Disk (Console LIVE + staging console), Storage staging Pre, RDS Storage (speedventory)

---

## AWS Health & Events

### EC2 Scheduled Events
- eu-west-3: None
- eu-west-2: None

### EC2 Instances (eu-west-3)
| Name | ID | Type | State |
|------|----|------|-------|
| Console LIVE | i-097f6eee5762c82f3 | t3.large | running |
| staging console | i-01a7339df8c663ed6 | t3.medium | running |
| staging pretashop | i-0f82e81d2a07a28b9 | t3.medium | running |

### RDS Events (14d)
- eu-west-3: Daily automated backups only (speedventory, ~13:00 UTC, 4-6 min). All successful.
- eu-west-2: None

### RDS Pending Maintenance
| Resource | Action | Description |
|----------|--------|-------------|
| speedventory | **system-update** | New OS update available |
| speedventory | **db-upgrade** | Engine patch 17.5.R2 available |

**Recommendation:** No forced deadline. Schedule during next maintenance window (Mon 03:00-03:30 UTC).

---

## Billing Review

### March 2026 MTD (through Mar 26) vs February
| Service | Mar MTD | Feb Full | Trend |
|---------|---------|----------|-------|
| EC2 - Other | $56.97 | $67.61 | -16% (partial month, on track) |
| Amazon VPC | $12.08 | $13.44 | -10% |
| **Amazon S3** | **$5.74** | **$1.78** | **+222% ⚠️** |
| Amazon RDS | $4.35 | $5.30 | -18% (partial) |
| Tax | $16.11 | $18.11 | — |
| CloudWatch | $1.38 | $2.40 | -43% |
| Cost Explorer | $0.05 | $0.00 | new |
| **Total** | **$96.67** | **$108.64** | Projecting ~$110-115 |

### Daily Highlights
- Mar 1: $19.03 (monthly billing rollover, normal)
- Mar 2-25: $2.85-$3.33 typical
- Mar 14: $4.17, Mar 16: $4.40 (minor spikes)

**⚠️ S3 cost up 222%** ($1.78 → $5.74 MTD, projecting ~$6.60/mo). Investigate increased storage or request volume.

---

## RDS Monitoring — speedventory (eu-west-3)

### Instance Config
| Property | Value | Assessment |
|----------|-------|------------|
| Class | db.t4g.small (2 vCPU, 2 GB) | OK |
| Engine | PostgreSQL 17.5 | OK |
| Storage | 20 GB gp3 (autoscale to 100 GB) | OK |
| Multi-AZ | **No** | ⚠️ |
| **Publicly accessible** | **Yes** | ⚠️ |
| Encryption | Yes (KMS) | OK |
| Backup retention | 7 days | OK |
| Deletion protection | Yes | OK |
| Certificate expires | 2026-12-01 (8 months) | OK |

### Metrics (Last 1h)
| Metric | Avg | Max | Status |
|--------|-----|-----|--------|
| CPU | 3.4% | 5.4% | OK |
| Freeable Memory | ~682 MB (34%) | ~686 MB | OK |
| Free Storage | 15.98 GB (79.9%) | — | OK |
| DB Connections | 0.2 | 2 | OK |
| Read IOPS | 0.3/s | 2.0/s | OK |
| Write IOPS | 2.4/s | 9.3/s | OK |
| Read Latency | 0.2 ms | 2.0 ms | OK |
| Write Latency | 1.1 ms | 7.6 ms | OK |
| Swap | ~13.3 MB | ~13.5 MB | OK |
| Disk Queue | 0.009 | 0.07 | OK |

### 24h Notable
- **CPU spike to 44.5% at 22:41 UTC Mar 26** — correlates with Server Memory alarm. Likely batch job hitting DB.

---

## New Relic APM — Console LIVE

### Top DB-Heavy Transactions (24h)
| Transaction | Avg DB (ms) | Count |
|---|---|---|
| UpdateProductTendencyCacheJob | 1,855 | 2 |
| SaveCurrencyRateJob | 1,250 | 1 |
| UpdateProductSoldInMonthsJob | 1,188 | 1 |
| UpdateOverallRankingJob | 869 | 2 |
| ImportRoutingPlanJob | 258 | 1 |

### Error Summary (24h): 80 total
| Error Class | Count |
|---|---|
| ActiveJob::DeserializationError | 36 |
| NoMethodError | 21 |
| ActiveRecord::RecordNotUnique | 13 |
| ActionController::BadRequest | 8 |
| ActionView::Template::Error | 1 |
| OpenURI::HTTPError | 1 |

### Throughput & Error Rate
- Peak: ~540 rpm (07:00-08:00 UTC)
- Business hours: 120-185 rpm, error rate 0.02%-0.16% (healthy)
- Overnight spikes up to 36% error rate at very low volume (~0.4 rpm) — not actionable

### Slow DB Queries (N+1 pattern)
- `SELECT order_lines WHERE order_id IN (subquery)` — **3,743 executions**, avg 171ms, max 482ms
- `SELECT SUM(selling_price * items_count) order_lines...` — **3,742 executions**, avg 171ms, max 537ms
- `SELECT products.* WHERE is_product_pack...` — 7 calls, max 1,221ms

**⚠️ UpdateProductTendencyCacheJob has N+1 pattern with ~3,743 repeated subqueries on order_lines.**

---

## Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats
| Period | Sent | Delivered | Failed | Rate |
|--------|------|-----------|--------|------|
| Mar 14-27 | 2,230 | 2,219 | 85 (74 temp, 11 perm) | **99.5%** |

### Failed Events (24h): 21 total
| Type | Count | Details |
|------|-------|---------|
| Temporary (451) | 18 | Internal MX (antispam.mailspamprotection.com) rate-limiting @paturevision.fr recipients |
| Temporary (421) | 1 | gmx.net timeout |
| Permanent (550) | 2 | alexispicarougne@orange.fr — invalid recipient |

**⚠️ Internal MX throttling:** SiteGround mail server returning 451 on 18/21 failures — all internal recipients (laura@, sarah@, joey@, karine@, etc.)

---

## Siteground Statistics

### Disk Usage (SSH)
| Directory | Size |
|---|---|
| pre9.paturevision.fr/ | 13G |
| staging-sg.paturevision.fr/ | 7.2G |
| je-pature.paturevision.fr/ | 6.1G |
| queue7.paturevision.fr/ | 5.3G |
| paturevision.fr/ | 2.2G |
| staging-je-pature/ | 386M |
| **Total ~/www** | **45G** |

### ZIP Backups (cleanable)
| File | Size |
|---|---|
| update.paturevision.fr.zip | 6.1G |
| pre9.paturevision.fr.zip | 5.2G |
| **Total ZIPs** | **11.3G** |

**Dashboard scraper:** Session expired — needs manual `--login` re-auth.

---

## SSL Certificates
| Domain | Expiry | Days Left |
|--------|--------|-----------|
| console.paturevision.fr | May 2, 2026 | ~36 days |
| paturevision.fr | Jun 22, 2026 | ~87 days |

---

## Issues Summary

| Severity | Item |
|----------|------|
| **MEDIUM** | Server Memory alarm recurring nightly on Console LIVE (~22:20 UTC). Investigate scheduled jobs. |
| **MEDIUM** | S3 costs up 222% vs last month ($1.78 → $5.74). Investigate usage increase. |
| **MEDIUM** | ActiveJob::DeserializationError (36) + NoMethodError (21) — top NR error sources |
| **MEDIUM** | UpdateProductTendencyCacheJob N+1 pattern: 3,743 repeated order_lines queries |
| **MEDIUM** | Internal MX throttling: 18 temp failures on @paturevision.fr recipients |
| **LOW** | RDS speedventory publicly accessible. Verify intentional. |
| **LOW** | RDS pending OS update + engine patch 17.5.R2. Schedule maintenance. |
| **LOW** | 45G disk, 11.3G in removable ZIP backups |
| **INFO** | RDS CPU spike 44.5% at 22:41 UTC Mar 26 (correlated with memory event) |
| **INFO** | Siteground scraper session expired |
| **INFO** | Mailgun bounces/complaints API unauthorized — check API key permissions |
| **INFO** | SSL certs OK (36d + 87d) |
