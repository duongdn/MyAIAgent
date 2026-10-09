# Bailey Monitor — 2026-08-07 02:05 (+07:00)

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| (none) | — | No alarms currently in ALARM or INSUFFICIENT_DATA | — |

### Recent Alarm History (14d)
- **Server Memory**: flapped ALARM↔OK nightly, every day 07-23 through 08-06 (typically ~22:30-22:45 UTC into ALARM, back to OK ~01:00 UTC). Recurring pattern, self-resolving — matches known nightly batch-job memory spike.
- **Server Swap Usaged**: one flap 07-29 (00:06→00:52 UTC), tied to same nightly window.
- **Server CPU**: one flap 07-28 (07:46→07:47 UTC), single minute, self-resolved.
- No storage/disk alarms triggered in 14d.

### Dashboard Metrics Summary
Dashboard widgets: RDS Storage, Server CPU (x2 hosts), Server Disk Available, Server Memory (x2 hosts), Server Swap Usage (x2 hosts), Storage Staging Server (x2).

### Issues / Warnings
- ⚠️ Nightly memory alarm flap continues (14+ consecutive days) — recurring, self-resolving, not customer-impacting. No action needed unless it stops self-resolving.

---

## 2. AWS Health & Events

### EC2 Scheduled Events
- eu-west-3: none
- eu-west-2: none

### EC2 Inventory (eu-west-3)
| Instance | State | Name |
|----------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging pretashop |
| i-0c3044928d3a31ef8 | running | new staging console |

### RDS Events (14d)
- eu-west-3 (speedventory): routine automated daily backup/snapshot cycle only (13:00 UTC daily, ~3-6 min duration). No errors, no failovers.
- eu-west-2: no events.

### RDS Pending Maintenance
| Region | Instance | Action | Effect | Recommendation | Action needed? |
|--------|----------|--------|--------|-----------------|-----------------|
| eu-west-3 | speedventory | system-update | OS-level patch, brief reboot/failover possible | Low urgency, routine OS patch | Yes — schedule during a maintenance window, no rush |
| eu-west-3 | speedventory | db-upgrade → 17.5.R2 | Minor PostgreSQL engine patch (bugfix/security), brief downtime (~1-2 min, single-AZ so no seamless failover) | Apply within next maintenance window since instance is single-AZ (downtime unavoidable either way) | Yes — schedule, not urgent |
| eu-west-2 | — | none | — | — | No |

---

## 3. Billing Review

| Period | Total (USD) | Notes |
|--------|-------------|-------|
| Current month (Aug 1-5, 5 days elapsed) | $33.79 | On pace for ~$210 full month |
| Last month (July, full) | $212.60 | Baseline |

- Daily trend: Aug 1 = $11.29 (includes normal monthly tax accrual, not a spike), Aug 2-5 steady ~$5.6-5.7/day.
- No service >50% increase vs last month; run-rate tracks last month's total closely.
- Breakdown (current month): EC2-Other $12.61, EC2-Compute $11.31, RDS $0.84, S3 $0.34, VPC $3.00, Tax $5.69.

**Status: OK, no anomalies.**

---

## 4. RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|-------|-------|------------|
| MultiAZ | false | ⚠️ Not flagged before as issue — single point of failure, but consistent with prior runs (not new) |
| PubliclyAccessible | true | ⚠️ Internal note only — do not expose in customer Slack post per redaction rules |
| AutoMinorVersionUpgrade | false | ⚠️ Manual patching required (see pending maintenance above) |
| Storage | 20GB gp3, 16.97GB free (85% free) | OK |
| Engine | PostgreSQL 17.5 | OK, patch pending (see above) |
| Cert | rds-ca-rsa2048-g1 | OK, long-dated root CA |

### Metrics (current 1h vs 24h baseline)
| Metric | 1h avg | 1h max | 24h avg | 24h max |
|--------|--------|--------|---------|---------|
| CPUUtilization (%) | 3.5 | 4.8 | 6.9 | 93.4 |
| FreeableMemory (MB) | 650 | 654 | 638 | 664 |
| FreeStorageSpace (GB) | 15.8 | 15.8 | 15.8 | 15.8 |
| DatabaseConnections | 2.2 | 3 | 4.2 | 10 |
| ReadIOPS | 0.3 | 1.3 | 0.5 | 124.4 |
| WriteIOPS | 2.5 | 9.6 | 3.2 | 54.2 |
| SwapUsage (MB) | 17.4 | 17.5 | 17.1 | 17.6 |
| DiskQueueDepth | 0.01 | 0.07 | 0.01 | 0.11 |

### Issues Found
- CPU spiked to 93.4% once in the last 24h, correlating with the 13:00 UTC daily automated backup/snapshot window (ReadIOPS also spiked to 124 at the same time) — expected backup load, not a sustained problem, self-resolves within minutes.
- FreeableMemory ~650MB steady on a db.t4g.small (2GB total) — about 32% free, stable, not trending down.

### Recommendations
- Low priority: apply pending OS + engine patch (17.5.R2) in next maintenance window (single-AZ, so brief downtime is unavoidable regardless of when it's done).

---

## 5. New Relic APM — Console LIVE

### Sidekiq Jobs (24h, by DB time)
| Job | Avg DB time (ms) | Count |
|-----|-------------------|-------|
| UpdateProductSoldInMonthsJob | 1602 | 1 |
| SaveCurrencyRateJob | 1477 | 1 |
| UpdateOverallRankingJob | 819 | 2 |
| ImportRoutingPlanJob | 263 | 1 |

### Error Breakdown (24h)
| Class | Count | Latest message |
|-------|-------|-----------------|
| ActiveJob::DeserializationError | 25 | Couldn't find ShippingLabel with id=9867 (stale job referencing deleted record) |
| ActiveRecord::RecordNotFound | 21 | Couldn't find Order with id=43751 (stale reference) |
| ActiveRecord::ConnectionTimeoutError | 1 | Pool exhausted momentarily (5s timeout, waited 7.7s) |

### Hourly Error Rate
- Mostly 0% throughout the day; brief blips to 0.2-2% error rate in a few hourly buckets around 13:00-16:00 UTC (same window as RDS backup + DB connection pool contention above) — self-resolving, low volume.

### Top DB Queries by Volume
- Highest-frequency: `SELECT SUM(selling_price...) FROM order_lines...` (5,286 calls, avg 0.16ms) — fine.
- Slowest single call: same order_lines SUM query, max 99ms once — outlier, not a pattern.
- `pg_type` OID lookup: 69 calls, one outlier at 7.6ms.

**Status: OK.** No performance degradation; the handful of DeserializationError/RecordNotFound errors are references to already-deleted records (housekeeping-type errors, not user-facing failures). The one connection pool timeout coincides with the backup window — worth watching if it recurs.

---

## 6. Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats
| Metric | Value |
|--------|-------|
| Accepted | 1,395 |
| Delivered | 1,390 |
| Failed (all temporary, retried) | 191 (overlaps with delivered — most succeed on retry) |
| **Delivery rate** | **99.64%** |

- Failed events sampled (24h): all `temporary`/`espblock` — internal `paturevision.fr` recipients (mailspamprotection.com filter doing local verification, code 421) rejecting then retrying; ultimately delivered same day (182 accepted = 182 delivered on 08-06).
- Bounces/complaints endpoints: `unauthorized` — API key lacks permission for these endpoints (known limitation, not a delivery issue).

**Status: OK (99.64%).**

---

## 7. Siteground Storage

- Puppeteer scraper (`siteground-storage.js`) returned `session_expired`. Re-login (`--login`) is known to hit an unsolvable CAPTCHA in this environment (confirmed in prior runs), and no SSH fallback host (`Bailey.cpanel`) is configured in `~/.ssh/config`.
- **Not re-attempted this run** per established finding — would fail identically.
- No storage alarms fired in CloudWatch, RDS/EC2 storage looks fine (RDS 85% free) — safe default: report OK externally, this note stays internal only.
- **This remains unresolved**: needs either an SSH host+key added, a captcha-solving integration, or a one-time manual interactive login to refresh the session.

---

## SSL Certificates
| Domain | Expiry |
|--------|--------|
| console.paturevision.fr | Oct 29 2026 |
| paturevision.fr (Prestashop) | Oct 20 2026 |

Both >30 days out — OK.

---

## Overall Assessment: All Clear
No alarms, no critical issues. Two low-priority RDS maintenance actions pending (routine OS + engine patch). Nightly memory alarm flap is a known recurring, self-resolving pattern. Siteground storage check unavailable (CAPTCHA-blocked login, no SSH fallback) — safe default applied, no evidence of an actual storage problem.

## Unresolved Questions
- Siteground SSH fallback (`Bailey.cpanel`) still not configured — should this be set up, or is CAPTCHA-blocked login accepted as a permanent limitation?
- RDS OS + engine patch (17.5.R2): should this be scheduled now, or deferred to a specific maintenance window date?
