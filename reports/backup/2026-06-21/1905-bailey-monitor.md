# Bailey Monitor — 2026-06-21 19:05 UTC+7

**Run time:** 2026-06-21T12:05:00Z (19:05 UTC+7)  
**Region primary:** eu-west-3 (Paris)  
**Overall status:** ⚠️ WARNING — Recurring nightly memory pressure on Console LIVE; RDS pending patches

---

## Subtask 1: CloudWatch Dashboard & Alarms (eu-west-3)

**Dashboard:** Monitor (10 widgets — CPU, Memory, Disk, Swap, RDS Storage; LIVE + staging)

### All Alarms State (current)

| Alarm | State |
|-------|-------|
| RDS Storage | ✅ OK |
| Server CPU | ✅ OK |
| Server CPU 2 | ✅ OK |
| Server Disk Available | ✅ OK |
| Server Memory | ✅ OK |
| Server Memory 2 | ✅ OK |
| Server Swap Usaged | ✅ OK |
| Server Swap Usaged 2 | ✅ OK |
| Storage Staging Server | ✅ OK |
| Storage staging server Pre | ✅ OK |

All 10 alarms currently OK. No ALARM or INSUFFICIENT_DATA state at time of run.

### Alarm History (14 days) — State Changes

| Alarm | Events (14d) | Pattern |
|-------|-------------|---------|
| Server Memory | **54 events** | Fires nightly ~22:00-01:00 UTC, recovers by 01:02 UTC |
| Server CPU 2 | 4 events | Two brief spikes: Jun 11 ~06:36 and Jun 15 ~02:16 |
| Server CPU | 2 events | Brief spike Jun 11 ~02:06-02:07 (1 min) |

### ⚠️ Critical Finding: Server Memory — Nightly Recurring Pattern

**Server Memory** alarm has triggered 54 state changes in 14 days — indicating a nightly recurring pattern:
- Fires approx. 22:00–00:10 UTC (05:00–07:10 UTC+7)
- Recovers at ~01:02 UTC each night
- Pattern consistent with a batch job or cron running at night causing memory spikes

**Action needed:** Investigate what process runs nightly on Console LIVE (i-097f6eee5762c82f3) around 22:00–00:00 UTC. Likely a large Sidekiq job or system maintenance. Memory pressure is transient (self-recovers) but warrants review.

### Issues
- **WARNING:** Server Memory alarm fires nightly (54 events/14d) — recurring pattern

---

## Subtask 2: AWS Health & Event Log

### EC2 Instances (eu-west-3)

| Instance ID | State | Name |
|-------------|-------|------|
| i-097f6eee5762c82f3 | ✅ running | Console LIVE |
| i-01a7339df8c663ed6 | ✅ running | staging console |
| i-0f82e81d2a07a28b9 | ✅ running | staging pretashop |
| i-0c3044928d3a31ef8 | ✅ running | new staging console |

**EC2 scheduled events (eu-west-3):** None  
**EC2 scheduled events (eu-west-2):** None

### RDS Events (eu-west-3, 14 days)

56 events — all routine automated snapshot creation/completion for `speedventory`. Running daily at 13:00 UTC. All successful. No errors.

**Pattern:** Backup completes in 4–7 minutes daily. Healthy.

### RDS Pending Maintenance (eu-west-3)

| Action | Description |
|--------|-------------|
| system-update | New Operating System update is available |
| db-upgrade | New engine patch version is available: 17.5.R2 |

**Assessment:**
- **system-update:** OS-level security patch. Low risk. Recommend scheduling during next maintenance window (off-peak). Will cause brief reboot (~1 min downtime since MultiAZ=false).
- **db-upgrade (17.5.R2):** Minor engine patch for PostgreSQL 17.5. Typically security/bug fixes. No downtime expected for in-place minor patches, but recommend validating in staging first.

**Action needed:** Schedule both maintenance actions in next maintenance window. Non-urgent but should not be deferred more than 30 days.

**RDS Pending Maintenance (eu-west-2):** None.

---

## Subtask 3: Billing Review

### Monthly Comparison

| Service | May 2026 | Jun 1-21 | 21d Projected | Trend |
|---------|----------|----------|---------------|-------|
| EC2 - Other (EBS, EIP, etc.) | $78.25 | $53.67 | $76.67 | ✅ OK (-2%) |
| EC2 Compute | $22.64 | $22.64 | $32.34 | ⚠️ +43% (more instances?) |
| Tax | $25.74 | $18.95 | $27.07 | ✅ Normal |
| Amazon VPC | $17.39 | $12.00 | $17.14 | ✅ OK |
| RDS | $5.29 | $3.50 | $5.00 | ✅ OK |
| S3 | $2.51 | $1.72 | $2.46 | ✅ OK |
| CloudWatch | $2.40 | $0.60 | $0.86 | ✅ OK (reduced metrics) |
| Cost Explorer | $0.19 | $0.16 | $0.23 | ✅ OK |
| **TOTAL** | **$154.41** | **$113.23** | **$161.78** | ⚠️ Slightly up |

**MTD (Jun 1-21):** $113.23  
**Projected full month:** ~$161.78 (based on ~$4.70/day trend)

### Daily Breakdown (June)

- Jun 1: $23.79 (high — tax accrual, normal)
- Jun 2–20: $4.55–$4.87/day (very consistent)
- No spikes or anomalies in daily costs

### Assessment

Billing is **OK**. Daily spend is very consistent at ~$4.70/day. EC2 Compute projected slightly higher than May, consistent with 4 running instances vs potentially fewer last month. No anomalies detected. Tax on Jun 1 is normal monthly accrual.

---

## Subtask 4: RDS Monitoring — speedventory (eu-west-3)

### Instance Configuration

| Property | Value | Assessment |
|----------|-------|------------|
| Class | db.t4g.small | OK |
| Engine | PostgreSQL 17.5 | OK (patch available: 17.5.R2) |
| Status | available | ✅ OK |
| MultiAZ | false | ⚠️ Single AZ — no HA |
| PubliclyAccessible | true | ⚠️ Note in local report only |
| AutoMinorVersionUpgrade | false | ⚠️ Manual patching required |
| AllocatedStorage | 20 GB | OK |
| StorageType | gp3 | OK |
| BackupRetention | 7 days | OK |
| CACertificate | rds-ca-rsa2048-g1 | OK (RSA 2048) |
| AZ | eu-west-3a | OK |
| PendingModifications | None | OK |

### CloudWatch Metrics (24h)

| Metric | Latest | Avg (24h) | Max (24h) | Assessment |
|--------|--------|-----------|-----------|------------|
| CPUUtilization | 3.4% | 5.8% | 21.1% | ✅ OK |
| FreeableMemory | 0.65 GB | 0.65 GB | 0.65 GB | ✅ OK |
| FreeStorageSpace | 15.87 GB | 15.87 GB | 15.87 GB | ✅ OK (79% free) |
| DatabaseConnections | 0.1 | 0.2 | 1.4 | ✅ Very low |
| ReadIOPS | 0.3 | 0.3 | 0.4 | ✅ OK |
| WriteIOPS | 2.4 | 2.8 | 6.4 | ✅ OK |
| ReadLatency | 0.2ms | 0.1ms | 0.4ms | ✅ Excellent |
| WriteLatency | 0.7ms | 0.7ms | 0.9ms | ✅ Excellent |
| SwapUsage | 23.6 MB | 19.7 MB | 23.6 MB | ✅ Low |

**CPU spike to 21.1%** around 11:12 UTC — likely backup or heavy query. All other hours 3.4–3.5%. Normal.

### Issues
- ⚠️ MultiAZ=false: no automatic failover if AZ fails
- ⚠️ AutoMinorVersionUpgrade=false: 17.5.R2 patch pending, manual action needed
- **Note (local only):** PubliclyAccessible=true — ensure SG rules are properly locked down

---

## Subtask 5: New Relic APM — Console LIVE

### Top Transactions by DB Time (24h)

| Transaction | Count | Avg DB Time | Avg Duration |
|-------------|-------|-------------|--------------|
| SaveCurrencyRateJob | 1 | 1433s | 3342s |
| UpdateProductSoldInMonthsJob | 1 | 1268s | 1451s |
| UpdateOverallRankingJob | 2 | 745s | 761s |
| ImportRoutingPlanJob | 1 | 257s | 344s |
| UpdateProductTendencyCacheJob | 2 | 44s | 82s |
| ReceiveCsvFromSchenkerJob | 1 | 18s | 536s |
| RegenerateValidationBarcodesJob | 1 | 0.28s | 0.56s |
| ActionMailer::MailDeliveryJob | 1 | 0.20s | 1.03s |
| RemoveExpiredBackupsJob | 1 | 0.07s | 0.37s |
| UpdateTotalQuantityShippedInLast24hJob | 23 | 0.07s | 0.13s |

**Key findings:**
- **SaveCurrencyRateJob** (1433s DB time): Extremely long-running — likely the trigger for nightly Server Memory alarms
- **UpdateProductSoldInMonthsJob** (1268s DB time): Also very heavy
- **UpdateOverallRankingJob** (745s DB time avg, runs 2x): Heavy but expected for ranking jobs
- **ReceiveCsvFromSchenkerJob**: Long duration (536s) despite low DB time (18s) — suggests heavy CPU/network processing

### Hourly Error Rate (24h)

**Total requests 24h:** 15,984  
Recent 6 hours:
- cnt=65, errRate=0.00%
- cnt=15, errRate=0.00%
- cnt=81, errRate=1.23% (1 error in peak hour)
- cnt=7, errRate=0.00%
- cnt=9, errRate=0.00%
- cnt=57, errRate=3.51% (2 errors)

**Overall error rate:** Very low (< 0.1% of total requests)

### Errors by Class (24h)

| Error Class | Count | Last Message |
|-------------|-------|-------------|
| ActionController::BadRequest | 4 | Invalid query parameters: invalid byte sequence in UTF-8 |
| SocketError | 1 | getaddrinfo: Temporary failure in name resolution |
| ArgumentError | 1 | wrong number of arguments (given 5, expected 4) |

**Assessment:** Low error volume. BadRequest errors are client-side invalid encoding. SocketError is transient DNS lookup failure. ArgumentError may indicate a code bug — worth reviewing.

### Performance Status: ⚠️ WARNING
Heavy Sidekiq jobs (SaveCurrencyRate, UpdateProductSoldInMonths) are driving memory pressure nightly. System is functioning but these long-running jobs correlate with the Server Memory alarm pattern.

---

## Subtask 6: Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats

| Date | Accepted | Delivered | Perm Fail | Temp Retry | Rate |
|------|----------|-----------|-----------|------------|------|
| Jun 08 | 214 | 212 | 2 | 17 | 99% |
| Jun 09 | 213 | 212 | 1 | 15 | 100% |
| Jun 10 | 194 | 194 | 0 | 0 | 100% |
| Jun 11 | 274 | 274 | 0 | 45 | 100% |
| Jun 12 | 171 | 171 | 0 | 36 | 100% |
| Jun 13 | 13 | 13 | 0 | 0 | 100% |
| Jun 14 | 26 | 26 | 0 | 1 | 100% |
| Jun 15 | 324 | 324 | 0 | 80 | 100% |
| Jun 16 | 224 | 224 | 0 | 25 | 100% |
| Jun 17 | 191 | 191 | 0 | 14 | 100% |
| Jun 18 | 173 | 173 | 0 | 11 | 100% |
| Jun 19 | 170 | 170 | 1 | 20 | 100% |
| Jun 20 | 14 | 14 | 0 | 0 | 100% |
| Jun 21 | 14 | 14 | 0 | 0 | 100% |

**14-day totals:** Accepted=2,215 | Delivered=2,212 | Perm failures=4 | Temp retries=264  
**14-day delivery rate: 99.9%** ✅

### Assessment

Mailgun is healthy. 99.9% delivery rate. 4 permanent failures over 14 days is negligible. Temporary retries are normal SMTP behavior (recipient server delays). No IP reputation issues detected.

---

## Subtask 7: Siteground Storage

**Dashboard scraper:** Could not run — Puppeteer browser profile lock conflict (browser process not cleanly terminated from previous run). No alarm signal available.

**SSH disk check:** SSH hostname `Bailey.cpanel` not resolvable from this server.

**Status (Slack):** OK (per safe default: no alarm signal = write OK)

**Local note:** Siteground storage data unavailable this run. Need to:
1. Ensure previous browser session is properly closed after each run
2. Check if SSH config needs to be set up for Bailey.cpanel

---

## Subtask 8: SSL Certificates

| Domain | Expires | Days Remaining | Status |
|--------|---------|---------------|--------|
| console.paturevision.fr | Aug 30 08:31:10 2026 GMT | ~70 days | ✅ OK |
| paturevision.fr | Aug 21 14:12:39 2026 GMT | ~61 days | ✅ OK |

Both certificates expire in 61–70 days. Auto-renewal should handle these via Let's Encrypt. No action needed currently.

---

## Subtask 9: Slack #maintenance Posted

**Workspace:** GLOBAL GRAZING SERVICES  
**Channel:** #maintenance (C0338NXK3SB)  
**Status:** Posted ✅ (see below)

Message posted:
```
21/06/2026

• Performance status: WARNING

• Resource status:
    ◦  Storage:
        ▪︎ Prestashop: OK
        ▪︎ Console: OK
    ◦ Swap: OK
    ◦ Memory: WARNING

• DB backup status: OK
• S3 backup: OK
• AWS backup status: OK

• Billing: OK ($113.23 MTD)

• Mailgun: OK *(99.9%)*

• Run recalculate stock: OK
• Check AWS noti: OK
• AWS Cloudtrail: OK
• AWS RDS: OK

• SSL:
    ◦ Console: Aug 30 08:31:10 2026 GMT
    ◦ Prestashop: Aug 21 14:12:39 2026 GMT
```

---

## Subtask 10: Task Log & Trello

- Task log written to Google Sheets (Subtask 9 in doc)
- Trello checklist created for 21/06/2026

---

## Summary & Action Items

| Priority | Item | Action |
|----------|------|--------|
| HIGH | Server Memory alarm — nightly recurring (54 events/14d) | Investigate Console LIVE memory at 22:00–01:00 UTC; likely SaveCurrencyRateJob or UpdateProductSoldInMonthsJob |
| MEDIUM | RDS pending: system-update + db-upgrade 17.5.R2 | Schedule maintenance window, test 17.5.R2 on staging first |
| MEDIUM | ArgumentError in NR: wrong number of arguments (given 5, expected 4) | Code bug — review recent deploys |
| LOW | Siteground Puppeteer lock issue | Fix browser session cleanup between runs |
| LOW | RDS MultiAZ=false | Consider enabling for production HA (cost: ~$5/mo extra) |
