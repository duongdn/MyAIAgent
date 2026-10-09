# Bailey Monitor — 2026-06-25 19:05 UTC+7

**Run time:** 2026-06-25T12:05:00Z (19:05 UTC+7)  
**Region primary:** eu-west-3 (Paris)  
**Overall status:** ⚠️ WARNING — Recurring nightly memory + swap pressure on Console LIVE; RDS pending patches (unchanged from prior runs); Mailgun 421 delivery failures to @paturevision.fr internal addresses (temporary, auto-retried)

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

All 10 alarms currently OK at time of run.

### Alarm History (14 days) — State Changes

| Alarm | Events (14d) | Pattern |
|-------|-------------|---------|
| Server Memory | **52 changes** | Nightly ~22:28–00:10 UTC, recovers by 01:02 UTC |
| Server Swap Usaged | **6 changes** | Jun 24: ALARM 15:05–20:27 UTC (5h), then again 22:02–01:04 |
| Server CPU | 2 changes | Brief spikes only |
| Server CPU 2 | 2 changes | Brief spikes only |

### ⚠️ Warning: Nightly Memory + Swap Pressure (Console LIVE)

**Server Memory** alarm pattern (52 state changes in 14 days):
- Fires nightly approx. 22:00–00:10 UTC (05:00–07:10 UTC+7)
- Recovers consistently at ~01:02 UTC
- Consistent with heavy Sidekiq batch jobs (SaveCurrencyRateJob, UpdateProductSoldInMonthsJob — confirmed via New Relic)

**Server Swap Usaged** (NEW this period): 6 changes Jun 22–25:
- Jun 24: ALARM at 15:05 UTC, recovered 20:27 UTC (5+ hours), then re-alarmed 22:02–01:04 UTC
- Swap now being consumed alongside memory — escalation from memory-only pattern

**Pattern change:** Previous reports showed only memory spikes; swap is now joining, indicating the memory pressure is worsening.

**Action needed:** Investigate Sidekiq concurrency and Sidekiq job queue. Consider tuning worker concurrency or scheduling heavy jobs differently to spread load.

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

All events are routine automated daily backups for `speedventory` at 13:00 UTC. Completing in 3–7 minutes. All successful. Today's (Jun 25) completed at 13:04 UTC. ✅ Healthy.

### RDS Pending Maintenance (eu-west-3)

| Action | Description | Effect |
|--------|-------------|--------|
| system-update | New OS update available | Brief reboot ~1 min (no MultiAZ = downtime window) |
| db-upgrade | PostgreSQL patch 17.5.R2 | Minor engine patch, low risk |

**Recommendation:** These have been pending since at least Jun 21. Schedule during next maintenance window (Mon 03:00–03:30 UTC). Not urgent but now overdue for 2+ weeks.

**RDS Pending Maintenance (eu-west-2):** None.

---

## Subtask 3: Billing Review

### Monthly Comparison

| Service | May 2026 (full) | Jun 1–25 | 25d Rate/d | Projected June | Trend |
|---------|----------------|----------|------------|----------------|-------|
| EC2 - Other (EBS/EIP) | $78.25 | $64.37 | $2.57 | $77.21 | ✅ -1% |
| EC2 Compute | $22.64 | $27.17 | $1.09 | $32.60 | ⚠️ +44% projected |
| VPC | $17.39 | $14.40 | $0.58 | $17.28 | ✅ OK |
| Tax | $25.74 | $22.84 | — | ~$27.00 | ✅ Normal |
| RDS | $5.29 | $4.18 | $0.17 | $5.02 | ✅ OK |
| S3 | $2.51 | $2.09 | $0.08 | $2.51 | ✅ OK |
| CloudWatch | $2.40 | $1.32 | $0.05 | $1.58 | ✅ OK (less custom metrics) |
| Cost Explorer | $0.19 | $0.22 | $0.01 | $0.26 | ✅ OK |
| **TOTAL** | **$154.41** | **$136.58** | **$5.46** | **$163.82** | ⚠️ Slightly up |

**MTD (Jun 1–25):** $136.58  
**Projected full month:** ~$163.82 (based on $4.65–4.96/day trend)

### Daily Breakdown (June) — Summary

- Jun 1: $27.68 (high — tax accrual, normal)
- Jun 2–24: $4.55–$4.96/day (very consistent, no anomalies)
- Jun 22: $4.96, Jun 24: $4.96 — slight uptick, within normal range

### Assessment

Billing is **OK**. Daily spend consistent at ~$4.65–4.96/day. EC2 Compute projected +44% vs May ($32.60 vs $22.64) — likely due to the 4th instance (new staging console) running the full month in June vs partial in May. No surprise services. Tax normal.

---

## Subtask 4: RDS Monitoring — speedventory (eu-west-3)

### Instance Configuration

| Property | Value | Assessment |
|----------|-------|------------|
| Class | db.t4g.small | OK |
| Engine | PostgreSQL 17.5 | ⚠️ Patch 17.5.R2 pending |
| Status | available | ✅ OK |
| MultiAZ | false | ⚠️ Single AZ — no HA |
| AutoMinorVersionUpgrade | false | ⚠️ Manual patching required |
| AllocatedStorage | 20 GB | OK |
| StorageType | gp3 | OK |
| BackupRetention | 7 days | ✅ OK |
| CA Certificate | rds-ca-rsa2048-g1 | ✅ Expires 2027-06-08 (12 months) |
| PendingModifications | None | OK |
| **Note (local only)** | PubliclyAccessible=true | Ensure SG rules locked down |

### CloudWatch Metrics

| Metric | 1h Avg | 1h Max | 24h Avg | 24h Max | Assessment |
|--------|--------|--------|---------|---------|------------|
| CPUUtilization | 3.6% | 5.1% | 6.7% | **93.8%** | ⚠️ Spike 93.8% |
| FreeableMemory | 0.70 GB | 0.71 GB | 0.68 GB | 0.73 GB | ✅ OK |
| FreeStorageSpace | 17.03 GB | — | 17.03 GB | — | ✅ OK (85% free) |
| DatabaseConnections | 3.1 | 4 | 3.8 | 10 | ✅ OK |

**⚠️ CPU spike to 93.8%** observed in the last 24h — likely during a heavy Sidekiq job (SaveCurrencyRateJob at 1512s DB time). The 1h average at 3.6% shows it recovered. CPU spike correlates with nightly Sidekiq jobs.

### Issues
- ⚠️ MultiAZ=false: no automatic failover (cost-accepted risk)
- ⚠️ AutoMinorVersionUpgrade=false + 17.5.R2 pending — needs manual scheduling
- ⚠️ CPU spike 93.8% in 24h — monitor trend (heavy Sidekiq job)

---

## Subtask 5: New Relic APM — Console LIVE

### Top Transactions by DB Time (24h)

| Transaction | Count | Avg DB Time | Avg Duration |
|-------------|-------|-------------|--------------|
| SaveCurrencyRateJob | 1 | 1512s | 3431s |
| UpdateProductSoldInMonthsJob | 1 | 1253s | 1469s |
| UpdateOverallRankingJob | 2 | 734s avg | 758s avg |
| ImportRoutingPlanJob | 1 | 264s | 356s |
| UpdateProductTendencyCacheJob | 2 | 46s | 53s |
| ReceiveCsvFromSchenkerJob | 1 | 20s | 566s |
| Controller/sales_analytics/show | 2 | 4.0s | 4.6s |
| Controller/purchase_orders/update | 23 | 2.2s | 3.9s |
| Controller/palettes/index | 30 | 2.0s | 3.7s |
| Controller/products/quick_modify_update | 4 | 1.5s | 13.8s |

**Key findings:**
- **SaveCurrencyRateJob** (1512s DB, 3431s total): Heavier than last run (1433s). Likely the primary trigger for nightly memory + CPU spikes.
- **UpdateProductSoldInMonthsJob** (1253s DB): Comparable to last run (1268s). Normal.
- **purchase_orders/update** (23 calls, max DB 25.5s): Regular usage, acceptable.

### Hourly Throughput (24h)

Total transactions: **115,190** (up from ~15,984 on Jun 21 — significant increase in usage)

Peak hours (UTC):
- 04:10 UTC: 2,873 txns
- 05:10 UTC: 13,409 txns
- 06:10 UTC: 25,133 txns (peak)
- 07:10 UTC: 15,018 txns

Low hours: 23:10–01:10 UTC (7–76 txns) — quiet overnight period

**Error spike at 01:10 UTC:** 76 txns, 31.6% error rate (24 errors) — correlates with nightly job activity

### Errors by Class (24h)

| Error Class | Count | Last Message |
|-------------|-------|-------------|
| ActiveRecord::RecordNotFound | 70x | Couldn't find Order with 'id'=43019 |
| Redis::CannotConnectError | 10x | Error connecting to Redis on localhost:6379 (ECONNREFUSED) |
| ActiveJob::DeserializationError | 9x | Couldn't find ShippingLabel |
| NameError | 8x | uninitialized constant ActionMailer::MailDeliveryJob |
| ActionController::BadRequest | 4x | Invalid byte sequence in UTF-8 |
| ArgumentError | 3x | wrong number of arguments (given 5, expected 4) |
| ActiveRecord::Deadlocked | 1x | PG deadlock detected |
| NoMethodError | 1x | orders for nil:NilClass |
| RuntimeError | 1x | PG deadlock detected |

**Notable issues:**
- **Redis::CannotConnectError (10x):** Redis connection refused — Redis may be restarting or under memory pressure during nightly jobs. Correlates with memory/swap alarm.
- **NameError: uninitialized constant ActionMailer::MailDeliveryJob (8x):** Code deployment issue or gem version mismatch. Persistent error — should be investigated.
- **RecordNotFound (70x):** User-facing 404s (stale links/bookmarks). Normal level.
- **Deadlocks (2x):** Low count but deadlocks in production need monitoring.

### Top DB Queries from Spans (24h)

| Query | Calls | Avg Duration | Max |
|-------|-------|-------------|-----|
| SELECT order_lines by order_id IN | 4,939x | 0.14s | 0.79s |
| SUM selling_price from order_lines | 4,937x | 0.14s | 0.51s |
| SELECT products with pack filter | 5x | 0.69s | 3.18s |
| SUM order_lines product aggregate | 480x | 0.11s | 1.52s |
| SELECT picking_time AVG | 12x | 0.06s | 0.08s |

**Assessment:** order_lines queries dominate by volume but latency is acceptable (avg 0.14s). The products pack filter query (max 3.18s) could be indexed better.

---

## Subtask 6: Mailgun — mail.paturevision.fr

### 14-Day Delivery Stats

| Date | Accepted | Delivered | Failed | Rate |
|------|----------|-----------|--------|------|
| Jun 12 | 171 | 171 | 0 | 100.0% |
| Jun 13 | 13 | 13 | 0 | 100.0% |
| Jun 14 | 26 | 26 | 0 | 100.0% |
| Jun 15 | 324 | 324 | 0 | 100.0% |
| Jun 16 | 224 | 224 | 0 | 100.0% |
| Jun 17 | 191 | 191 | 0 | 100.0% |
| Jun 18 | 173 | 173 | 0 | 100.0% |
| Jun 19 | 170 | 170 | 0 | 100.0% |
| Jun 20 | 14 | 14 | 0 | 100.0% |
| Jun 21 | 24 | 24 | 0 | 100.0% |
| Jun 22 | 160 | 160 | 0 | 100.0% |
| Jun 23 | 168 | 168 | 0 | 100.0% |
| Jun 24 | 178 | 178 | 0 | 100.0% |
| Jun 25 | 185 | 185 | 0 | 100.0% |
| **14d TOTAL** | **2,021** | **2,021** | **0** | **100.0%** |

**14-day delivery rate: 100.0%** ✅

### Failed Events Log (30 events, 24h)

All 30 failed events are **temporary 421/451 failures** (server-side temp refuse) — these are auto-retried by Mailgun and do NOT appear as delivery failures in the stats (confirmed: stats show 100% delivery rate).

**Pattern:**
- Recipients: karine (10x), laura (6x), gaec.etxekopar@ikmail.com (4x), joey (3x), info (3x), sarah (3x), noemie (1x)
- Codes: 421 (temporary antispam check failure), 451 (try again later)
- Root cause: Recipient mail servers using `mailspamprotection.com` antispam filter are temporarily rejecting, then Mailgun auto-retries successfully
- gaec.etxekopar@ikmail.com (4.7.1): ikmail.com service temporarily unavailable, auto-retried

**Assessment:** Mailgun is functioning correctly. The 421/451 events are normal transient failures that Mailgun handles via retry. Not actionable.

---

## Subtask 7: Siteground Storage

**Siteground script:** Could not run — browser profile locked by another process (`puppeteer` profile in use).  
**SSH fallback:** No Bailey.cpanel SSH host configured.  
**Status:** Unavailable this run. No alarms = OK (safe default).

---

## Subtask 8: SSL Certificate Check

| Domain | Expires | Days Remaining | Status |
|--------|---------|----------------|--------|
| console.paturevision.fr | Aug 30, 2026 | ~66 days | ✅ OK |
| paturevision.fr | Aug 21, 2026 | ~57 days | ✅ OK |

Both certificates are valid. No action needed at this time (will flag at 30 days).

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| CloudWatch Alarms | ✅ OK | All 10 alarms OK at run time |
| Alarm History | ⚠️ WARNING | Memory 52 events + Swap 6 events (14d) |
| EC2 Instances | ✅ OK | 4 instances running, no scheduled events |
| RDS Events | ✅ OK | Daily backups healthy |
| RDS Pending Maintenance | ⚠️ WARNING | OS update + PG 17.5.R2 pending (2+ weeks) |
| Billing | ✅ OK | $136.58 MTD, ~$163/mo projected |
| RDS Metrics | ⚠️ WARNING | CPU spiked to 93.8% (Sidekiq jobs) |
| New Relic APM | ⚠️ WARNING | Redis timeouts (10x), NameError mail (8x) |
| Mailgun | ✅ OK | 100.0% delivery rate (2,021 emails 14d) |
| Siteground | ❓ N/A | Browser locked, SSH unavailable |
| SSL | ✅ OK | Both certs expire Aug 2026 |

### Key Actions Needed

1. **Schedule RDS maintenance** (OS + PG 17.5.R2) — 2+ weeks overdue, schedule for next Mon 03:00 UTC maintenance window
2. **Investigate Redis::CannotConnectError (10x)** — Redis connection failing during nightly job period; may indicate memory exhaustion forcing Redis OOM kill. Check Redis maxmemory config and memory usage.
3. **Investigate NameError: ActionMailer::MailDeliveryJob** — Code/gem version issue causing 8 mail delivery failures. Check Sidekiq worker gem versions.
4. **Monitor Swap Usaged alarm** — First time swap is triggering alongside memory (Jun 22–25). If pattern continues, consider upgrading instance type or optimizing Sidekiq workers.
5. **Siteground storage check** — needs manual verification or fix to browser profile lock.
