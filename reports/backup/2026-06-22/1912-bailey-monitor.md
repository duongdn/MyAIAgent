# Bailey Monitor — 2026-06-22 19:12 UTC+7

**Run time:** 2026-06-22T12:12:00Z (19:12 UTC+7)
**Region primary:** eu-west-3 (Paris)
**Overall status:** ⚠️ WARNING — Recurring nightly memory pressure on Console LIVE; New Relic off-peak error spikes; RDS pending patches

---

## Subtask 1: CloudWatch Dashboard & Alarms (eu-west-3)

**Dashboard:** Monitor (10 widgets — CPU, Memory, Disk, Swap, RDS Storage; LIVE + staging)

### All Alarms State (current)

| Alarm | State | Threshold | Last Value |
|-------|-------|-----------|------------|
| Server CPU | ✅ OK | >70% | 43.9% |
| Server CPU 2 | ✅ OK | >70% | 67.5% |
| Server Memory | ✅ OK | >90% | 74.9% (as of 01:02 UTC) |
| Server Memory 2 | ✅ OK | >90% | 14.6% |
| Server Swap Usaged | ✅ OK | >5000 MB | 3748.7 MB |
| Server Swap Usaged 2 | ✅ OK | >2000 MB | 0 MB |
| Server Disk Available | ✅ OK | <5 GB | 9.2 GB free |
| Storage Staging Server | ✅ OK | <5 GB | 5.4 GB free |
| Storage staging server Pre | ✅ OK | <=5 GB | 5.5 GB free |
| RDS Storage | ✅ OK | <5 GB | 20.1 GB free |

**No alarms in ALARM or INSUFFICIENT_DATA state at time of run.**

### Alarm History (14 days) — State Changes

**Server Memory — Recurring midnight spikes on Console LIVE (i-097f6eee5762c82f3):**

| Timestamp (UTC) | Event |
|-----------------|-------|
| 2026-06-22 00:17 | OK → ALARM (90.06%) — SNS fired |
| 2026-06-22 01:02 | ALARM → OK (74.9%) |
| 2026-06-20 00:07 | OK → ALARM (90.05%) — SNS fired |
| 2026-06-20 00:06 | ALARM → OK |
| 2026-06-19 22:xx | Additional brief ALARM episodes |

**Pattern:** Memory on Console LIVE regularly brushes 90% threshold ~midnight UTC, self-resolves within ~45 min. Recurring issue — needs process audit or instance upsize.

---

## Subtask 2: AWS Health & Event Log (eu-west-2 + eu-west-3)

### EC2 Instance Inventory (eu-west-3)

| Instance ID | State | Name |
|-------------|-------|------|
| i-097f6eee5762c82f3 | running | Console LIVE |
| i-01a7339df8c663ed6 | running | staging console |
| i-0f82e81d2a07a28b9 | running | staging pretashop |
| i-0c3044928d3a31ef8 | running | new staging console |

All 4 instances running. No scheduled maintenance events on any EC2 instance.
eu-west-2: No active instances or events.

### RDS Events (eu-west-3 — last 14d)

- Automated daily backups running successfully Jun 9–22
- Backup window: ~13:00 UTC, completing in 4–6 min
- No errors or failures
- eu-west-2: No events

### Pending Maintenance Actions

| Region | Resource | Action | Description | Effect | Urgency |
|--------|----------|--------|-------------|--------|---------|
| eu-west-3 | speedventory | system-update | OS update available | Potential brief maintenance window, usually no downtime | Low |
| eu-west-3 | speedventory | db-upgrade | Engine patch 17.5.R2 | Security/stability patch; minor restart possible | Medium — schedule soon |

No `AutoAppliedAfterDate` set — AWS will not force-apply. Schedule during Mon 03:00–03:30 UTC maintenance window.

---

## Subtask 3: Billing Review

### Monthly Comparison — By Service

| Service | May 2026 (full) | Jun 2026 MTD (21d) | Assessment |
|---------|----------------|---------------------|------------|
| EC2 - Other | $78.25 | $56.26 | On-pace |
| EC2 Compute | $22.64 | $23.77 | +5% (on-track) |
| Amazon VPC | $17.39 | $12.60 | On-pace |
| Tax | $25.74 | $19.86 | Normal monthly accrual |
| Amazon RDS | $5.29 | $3.67 | On-pace |
| Amazon S3 | $2.51 | $1.74 | On-pace |
| CloudWatch | $2.40 | $0.78 | -67.5% (metrics rolloff) |
| AWS Cost Explorer | $0.19 | $0.19 | OK |
| **TOTAL** | **$154.41** | **$118.87** | — |

### Daily Spend Trend (Jun 2026)

Daily run rate: **~$4.71/day** (flat and stable Jun 2–21). No anomalous spikes.
Jun 1: $24.70 (tax accrual day — normal).

**Billing assessment: NORMAL.** No service >50% increase. Projected ~$141 ex-tax for full month vs May $128 ex-tax (~+10% — within normal fluctuation).

---

## Subtask 4: RDS Monitoring — speedventory (eu-west-3)

### Instance Configuration

| Parameter | Value | Assessment |
|-----------|-------|------------|
| Status | available | ✅ OK |
| Instance Class | db.t4g.small | OK |
| Engine | PostgreSQL 17.5 | OK |
| MultiAZ | False | ⚠️ No failover (internal note) |
| PubliclyAccessible | True | ⚠️ Check security group rules (internal note) |
| Storage | 20 GB gp3, auto-scale to 100 GB | OK |
| Backup Retention | 7 days | OK |
| Deletion Protection | True | ✅ OK |
| Auto Minor Upgrade | False | ⚠️ Manual upgrade needed |
| CA Cert | rds-ca-rsa2048-g1 | Expires 2027-06-08 (~12 months) |
| Maintenance Window | Mon 03:00–03:30 UTC | OK |

### Key Metrics (last 24h)

| Metric | Avg (24h) | Max (24h) | Assessment |
|--------|-----------|-----------|------------|
| CPUUtilization | 6.97% | **93.8%** | ⚠️ Brief spike — monitor |
| FreeableMemory | 657 MB | 806 MB | OK |
| FreeStorageSpace | 15.87 GB | 15.87 GB | ✅ 79% free |
| DatabaseConnections | 2.6 | 11 | ✅ OK |
| ReadIOPS | 0.61 /s | 113.7 /s | OK |
| WriteIOPS | 3.61 /s | 90.7 /s | OK |
| ReadLatency | 0.2 ms | 10 ms | OK |
| WriteLatency | 0.8 ms | 35.6 ms | OK |

**Issues:** CPU spiked to 93.8% briefly (likely batch job/vacuum). Average healthy at 6.97%. db.t4g.small has 2 vCPUs. Monitor for recurrence.

---

## Subtask 5: New Relic APM — Console LIVE (last 24h)

### Hourly Error Rate (selected hours)

| Hour (UTC+7) | Tx Count | Error Rate | Flag |
|--------------|----------|------------|------|
| ~06:00 | 32 | **75.0%** | 🔴 CRITICAL spike (low vol, likely cron failure) |
| ~07:00 | 88 | **27.3%** | 🔴 Elevated (cascading from 06:00) |
| ~12:00 | 53,902 | 0.14% | ✅ Peak traffic healthy |
| ~23:00 | 39 | **23.1%** | ⚠️ Late-night spike |

Peak traffic window (11:00–19:00 UTC+7): healthy, normal error rates (<0.5%).

### Error Breakdown (24h)

| Error Class | Count |
|-------------|-------|
| ActiveRecord::RecordNotFound | **85** |
| ActiveJob::DeserializationError | 14 |
| NoMethodError | 12 |
| ArgumentError | 10 |
| ActionController::InvalidAuthenticityToken | 8 |
| NameError (uninitialized ActionMailer::MailDeliveryJob) | 7 |
| Other | 6 |
| **Total** | **142** |

### Top Transactions by DB Time

| Transaction | Avg DB (s) | Count | Note |
|-------------|-----------|-------|------|
| SaveCurrencyRateJob | 1440.5 | 1 | 24-min DB time |
| UpdateProductSoldInMonthsJob | 1288.6 | 1 | 21-min DB time |
| UpdateOverallRankingJob | 725.9 | 2 | Batch |
| purchase_orders/index | 1.9 avg / 18.1 max | 173 | Highest-vol heavy controller |

### Recommendations

1. **P1** — Investigate 06:00 UTC+7 cron failures (75% error rate) — likely `SaveCurrencyRateJob` / `UpdateProductSoldInMonthsJob` timing
2. **P2** — Fix `ActiveRecord::RecordNotFound` (85x) — add nil-safe lookups for Order/ShippingLabel
3. **P3** — Fix `NameError: uninitialized ActionMailer::MailDeliveryJob` — Rails version mismatch
4. **P4** — Optimize `purchase_orders/index` (173 req, max 18s DB) — paginate or cache counts
5. **P5** — Optimize heavy Sidekiq batch jobs (chunk bulk updates, add indexes)

---

## Subtask 6: Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats (Jun 9–22)

| Date | Sent | Delivered | Failed | Rate |
|------|------|-----------|--------|------|
| Jun 9 | 213 | 212 | 1 perm | 99.5% |
| Jun 10–12 | 639 | 639 | 0 | 100% |
| Jun 13–18 | 901 | 901 | 0 | 100% |
| Jun 19 | 170 | 170 | 1 delayed | 99.4% |
| Jun 20–21 | 38 | 38 | 0 | 100% |
| Jun 22 | 155 | 155 | 0 perm | 100% |
| **Total** | **2,166** | **2,164** | **2 perm** | **99.9%** |

### Failed Events (24h)

~19 temporary 421 failures today:
- Recipient: `sarah@paturevision.fr`, `laura@paturevision.fr`
- MX: `mx10.antispam.mailspamprotection.com` (anti-spam filter deferral)
- Severity: temporary — auto-retrying
- Sender IP: 143.55.232.16 — no reputation flag, DKIM valid

No permanent bounces today. No complaints in 14-day window.

**Mailgun status: OK (99.9% delivery rate)**

---

## Subtask 7: Siteground Storage

- Siteground session expired — manual re-login needed (`node scripts/siteground-storage.js --login`)
- SSH `Bailey.cpanel` alias not configured in `~/.ssh/config` — disk check unavailable
- No storage alarms active → **Safe default: OK**
- Last known storage data: May 30, 2026 (stale)

**Action needed:** Re-authenticate Siteground session for next run.

---

## Subtask 8: Slack #maintenance — see below (posted after report)

---

## SSL Certificate Expiry

| Domain | Expires | Days Left | Status |
|--------|---------|-----------|--------|
| console.paturevision.fr | Aug 30 08:31:10 2026 GMT | ~69 days | OK (>30d) |
| paturevision.fr | Aug 21 14:12:39 2026 GMT | ~60 days | OK (>30d) |

---

## CloudTrail (eu-west-3, last 24h)

Only monitoring API calls from `nus-dev` user (our own queries). One `AssumeRole` at 18:21 UTC.
**CloudTrail: OK — no suspicious activity.**

---

## Issues Summary

| Severity | Issue | Action |
|----------|-------|--------|
| ⚠️ WARNING | Server Memory recurring spikes to 90%+ ~midnight UTC on Console LIVE | Process audit or upsize |
| ⚠️ WARNING | New Relic: 75% error rate at 06:00 UTC+7 (cron window) | Investigate failing jobs |
| ⚠️ WARNING | RDS CPU spike to 93.8% max (avg 6.97%) | Monitor, likely batch job |
| 📋 INFO | RDS pending maintenance: OS update + engine patch 17.5.R2 | Schedule during Mon 03:00 UTC window |
| 📋 INFO | Siteground session expired | Manual re-login required |
| 📋 INFO | SSL certs expire Aug 2026 (~60-69d) | Plan renewal |
| 📋 INFO | AutoMinorVersionUpgrade=False on speedventory | Manual upgrade cycle |

---

## Unresolved Questions

- What process causes the midnight memory spike on Console LIVE? (Rails workers? Sidekiq?) — needs server-side investigation
- Is `SaveCurrencyRateJob` (24-min DB time at 06:00 UTC+7) the root cause of the error spike?
- `Bailey.cpanel` SSH not configured — was this always missing or recently removed?
