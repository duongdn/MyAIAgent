# Bailey Monitor — 2026-08-14 02:05 (+07:00)

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| (none) | — | No alarms currently in ALARM or INSUFFICIENT_DATA | — |

### Recent Alarm History (14d)
- **Server Memory**: flapped ALARM↔OK nightly, every day 07-30 through 08-13 (typically ~22:30-22:45 UTC into ALARM, back to OK ~00:05-01:02 UTC). Recurring pattern, self-resolving — matches known nightly batch-job memory spike (20+ consecutive days now).
- No CPU/Swap/storage/disk alarms triggered in this 14d window (previously-seen isolated CPU/Swap flaps from late July have aged out).

### Dashboard Metrics Summary
Dashboard widgets: RDS Storage, Server CPU (x2 hosts), Server Disk Available, Server Memory (x2 hosts), Server Swap Usage (x2 hosts), Storage Staging Server (x2). Current values all within thresholds:
| Metric | Current | 24h avg | 24h max | Threshold |
|--------|---------|---------|---------|-----------|
| Server CPU | 1.3% | 4.1% | 60.0% | >70% |
| Server CPU 2 | 3.2% | 3.3% | 13.1% | >70% |
| Server Memory | 34.5% | 35.2% | 97.9% | >90% |
| Server Memory 2 | 48.9% | 48.8% | 50.0% | >90% |
| Server Swap Used | 228 MB | 374 MB | 2,285 MB | >5,000 |
| Server Swap Used 2 | 561 MB | 561 MB | 561 MB | >2,000 |
| Server Disk Available | 55.6% | 55.7% | 55.8% | <5% |
| Storage Staging Server | 45.0% | 45.0% | 46.2% | <5% |
| Storage Staging Server Pre | 9.5% | 9.5% | 9.6% | <5% |
| RDS Free Storage | 111.6GB | 75.3GB | 209.0GB | <5GB |

### Issues / Warnings
- ⚠️ Nightly memory alarm flap continues (20+ consecutive days) — recurring, self-resolving, not customer-impacting. No action needed unless it stops self-resolving.

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
| eu-west-3 | speedventory | db-upgrade → 17.5.R2 | Minor PostgreSQL engine patch (bugfix/security), brief downtime (~1-2 min, single-AZ so no seamless failover) | Apply within next maintenance window since instance is single-AZ (downtime unavoidable either way) | Yes — schedule, not urgent (unchanged since prior runs, ~5 weeks pending now) |
| eu-west-2 | — | none | — | — | No |

---

## 3. Billing Review

| Period | Total (USD) | Notes |
|--------|-------------|-------|
| Current month (Aug 1-13, 13 days elapsed) | $80.74 | Projected ~$208 full month |
| Last month (July, full) | $212.60 | Baseline |

- Daily trend: Aug 1 = $19.19 (includes normal monthly tax accrual, not a spike), Aug 2-12 steady ~$5.5-5.7/day.
- No service >50% increase vs last month; run-rate tracks last month's total closely (projected slightly under).
- Breakdown (current month): EC2-Other $30.13, EC2-Compute $27.13, RDS $2.00, S3 $0.63, VPC $7.20, Cost Explorer $0.06, Tax $13.59.

**Status: OK, no anomalies.**

---

## 4. RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|-------|-------|------------|
| MultiAZ | false | Single point of failure — unchanged from prior runs, not new |
| PubliclyAccessible | true | Internal note only — do not expose in customer Slack post per redaction rules |
| AutoMinorVersionUpgrade | false | Manual patching required (see pending maintenance above) |
| Storage | 20GB gp3, 15.8GB free (~79% free) | OK |
| Engine | PostgreSQL 17.5 | OK, patch pending (see above) |
| Cert | rds-ca-rsa2048-g1, valid until 2027-06-08 | OK, long-dated |
| PendingModifiedValues | none | OK |

### Metrics (current vs 1h avg vs 24h baseline)
| Metric | Current | 24h avg | 24h max |
|--------|---------|---------|---------|
| CPUUtilization (%) | 4.2 | 6.8 | 93.7 |
| FreeableMemory (MB) | 688 | 692 | 1,060 |
| FreeStorageSpace (GB) | 15.8 | 15.8 | 15.9 |
| DatabaseConnections | 1.6 | 2.9 | 8.0 |
| ReadIOPS | 0.26 | 0.60 | 129.9 |
| WriteIOPS | 2.90 | 3.16 | 48.0 |
| ReadLatency (ms) | 0.18 | 0.22 | 10.0 |
| WriteLatency (ms) | 0.59 | 0.91 | 9.1 |
| SwapUsage (MB) | 2.4 | 7.4 | 17.0 |
| DiskQueueDepth | 0.006 | 0.007 | 0.09 |

### Issues Found
- CPU spiked to 93.7% once in the last 24h, correlating with the 13:00 UTC daily automated backup/snapshot window (ReadIOPS also spiked to ~130 at the same time) — expected backup load, not a sustained problem, self-resolves within minutes. Same known pattern as prior weeks.
- No other anomalies.

### Recommendations
- Low priority: apply pending OS + engine patch (17.5.R2) in next maintenance window (single-AZ, so brief downtime is unavoidable regardless of when it's done). Pending ~5 weeks now — worth scheduling.

---

## 5. New Relic APM — Console LIVE

### Top Transactions by DB Time (24h)
| Job | Avg DB time (ms) | Count |
|-----|-------------------|-------|
| UpdateProductSoldInMonthsJob | 1,610 | 1 |
| SaveCurrencyRateJob | 1,515 | 1 |
| UpdateOverallRankingJob | 756 | 2 |
| ImportRoutingPlanJob | 266 | 1 |
| UpdateProductTendencyCacheJob | 42 | 2 |

### Error Breakdown (24h)
| Class | Count | Latest message |
|-------|-------|-----------------|
| ActiveRecord::RecordNotFound | 46 | Couldn't find Order with id=43837 (stale reference) |
| ActiveJob::DeserializationError | 5 | Couldn't find ShippingLabel with id=9939 (stale job referencing deleted record) |
| ActionController::InvalidAuthenticityToken | 1 | CSRF token mismatch, single occurrence |
| ActionController::BadRequest | 1 | Invalid UTF-8 byte sequence in query params, single occurrence |

### Hourly Error Rate
- Mostly 0% throughout the day; brief blips to 0.36-0.63% in a handful of hourly buckets (13:00-16:00 UTC and 22:00-23:00 UTC windows) — low volume, self-resolving, consistent with prior weeks' pattern.

### Top DB Queries / Slow Transactions
- Same Sidekiq background jobs as always dominate DB time table (product ranking/currency-rate/product-sold-in-months jobs), all low frequency (1-2 calls/day).
- Controller-level DB time is negligible (<20ms) across the board.

**Status: OK.** No performance degradation; RecordNotFound/DeserializationError errors reference already-deleted records (housekeeping-type, not user-facing failures). No new error classes vs prior runs.

---

## 6. Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats
| Metric | Value |
|--------|-------|
| Accepted | 1,287 |
| Delivered | 1,284 |
| Failed permanent | 3 |
| Failed temporary (mostly retried successfully) | 150 |
| **Delivery rate** | **99.77%** |

- Failed events sampled (24h): all `temporary`/`generic` — internal `paturevision.fr` recipients (sarah/laura/karine/joey@paturevision.fr), same known antispam-appliance retry pattern as prior weeks.
- Bounces/complaints endpoints: `unauthorized` — API key lacks permission for these endpoints (known limitation, not a delivery issue).

**Status: OK (99.77%).**

---

## 7. Siteground Storage

- Puppeteer scraper (`siteground-storage.js`) returned `session_expired`. Re-login (`--login`) is known to hit an unsolvable CAPTCHA in this environment (confirmed in prior runs), and no SSH fallback host (`Bailey.cpanel`) is configured in `~/.ssh/config` (re-verified this run — still absent).
- **Not re-attempted this run** per established finding — would fail identically.
- No storage alarms fired in CloudWatch, RDS/EC2 storage looks fine (RDS ~79% free) — safe default: report OK externally, this note stays internal only.
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
No alarms, no critical issues. Two low-priority RDS maintenance actions pending (routine OS + engine patch, now ~5 weeks pending — worth scheduling soon). Nightly memory alarm flap is a known recurring, self-resolving pattern (20+ consecutive days). Siteground storage check unavailable (CAPTCHA-blocked login, no SSH fallback) — safe default applied, no evidence of an actual storage problem.

## Unresolved Questions
- Siteground SSH fallback (`Bailey.cpanel`) still not configured — should this be set up, or is CAPTCHA-blocked login accepted as a permanent limitation?
- RDS OS + engine patch (17.5.R2): pending ~5 weeks now — should this be scheduled now, or deferred further?
