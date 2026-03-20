# Bailey Monitor — 2026-03-20 10:38 (UTC+7)

## CloudWatch — Bailey (eu-west-3)

### Alarms — All OK

| Alarm | State | Current Value | Threshold | Headroom |
|-------|-------|--------------|-----------|----------|
| Server CPU | OK | 1.01% | 70% | ~69% |
| Server CPU 2 | OK | 2.01% | 70% | ~68% |
| Server Memory | OK | 12.78% | 90% | ~77% |
| Server Memory 2 | OK | 42.02% | 90% | ~48% |
| Server Swap Used | OK | 161 MB | 5,000 MB | ~97% free |
| Server Swap Used 2 | OK | 830 MB | 2,000 MB | ~58% free |
| RDS Storage | OK | 17.2 GB free | 5 GB min | ~12 GB buffer |
| Server Disk Available | OK | No data (1h) | 5 GB min | — |
| Storage Staging Server | OK | No data (1h) | 5 GB min | — |
| Storage Staging Server Pre | OK | No data (1h) | 5 GB min | — |

### Recent Alarm Activity (14 days)

| Alarm | State Changes | Last Event | Notes |
|-------|--------------|------------|-------|
| **Server Memory** | **36 flaps** | 20 Mar 01:02 UTC — ALARM->OK | Crossed 90% threshold ~18 times. Last spike: 91.5% on 19 Mar 22:19 UTC, recovered to 79% by 01:02 UTC |
| Server CPU | 14 flaps | 17 Mar 00:03 UTC — ALARM->OK | CPU spikes above 70% mostly on 16-17 Mar |
| Server Swap Used | 2 flaps | 14 Mar 00:38 UTC — ALARM->OK | Single spike on 14 Mar, resolved in 33 min |

### Issues / Warnings

- **Server Memory flapping (36 state changes/14d)**: Memory regularly hits 90%+ threshold, especially during evening hours (UTC 22:00-01:00). Recovers each time but frequency is concerning — may indicate memory leak or undersized instance. Recommend investigation.
- **3 metrics missing data**: Server Disk Available, Storage Staging Server, Storage Staging Server Pre — no datapoints in last 1h. CloudWatch agent may not be reporting disk metrics. Verify agent status on staging servers.

### Summary

All alarms currently OK. No imminent events. Main concern is **Server Memory** flapping ~2.5x/day avg — not critical now but trending toward needing attention.

---

## AWS Health & Event Log

### Infrastructure

| Resource | Region | Type | State |
|----------|--------|------|-------|
| Console LIVE (i-097f6eee5762c82f3) | eu-west-3 | EC2 | running |
| staging console (i-01a7339df8c663ed6) | eu-west-3 | EC2 | running |
| staging pretashop (i-0f82e81d2a07a28b9) | eu-west-3 | EC2 | running |
| speedventory | eu-west-3 | RDS | active |
| eu-west-2 | — | — | No resources |

### EC2 Scheduled Events

None. No pending maintenance, retirement, or reboot events on any instance.

### RDS Events (14 days)

- **speedventory** (eu-west-3): Daily automated snapshots running normally at 13:00 UTC. All 14 days successful, completing in ~3-6 min. No errors, failovers, or configuration changes.

### RDS Pending Maintenance — ACTION NEEDED

| Resource | Action | Description | Deadline |
|----------|--------|-------------|----------|
| **speedventory** | system-update | New OS update available | No forced date |
| **speedventory** | db-upgrade | Engine patch 17.5.R2 available | No forced date |

**Effect**: Both are optional (no auto-apply date set). OS update = security/kernel patches. DB upgrade (17.5.R2) = PostgreSQL patch with bug fixes and security patches.

**Recommendation**: Schedule during low-traffic window. OS update may cause brief reboot (~30s downtime for single-AZ). DB upgrade takes ~5-10 min depending on instance size. Apply OS update first, then db-upgrade in next maintenance window.

**Action needed?** Not urgent (no deadline), but recommended within 2-4 weeks to stay current on security patches. If the instance is single-AZ, plan for brief downtime.

### AWS Health Dashboard

API requires Business/Enterprise Support plan — not available on this account. Checked via service-level APIs instead (EC2 events, RDS events, pending maintenance).

### Summary

No imminent events. 2 optional maintenance actions pending on RDS `speedventory` — recommend scheduling within 2-4 weeks.

---

## AWS Billing — Mar 2026 vs Feb 2026

### Current Bill: $58.75 (excl tax, 20 of 31 days)

| Service | Feb 2026 (full) | Mar 1-20 | Note |
|---------|----------------|----------|------|
| EC2 - Other | $67.61 | $41.84 | On pace, no change |
| **S3** | **$1.78** | **$4.61** | **Already 2.6x Feb total** |
| VPC | $13.44 | $8.92 | On pace |
| RDS | $5.30 | $3.15 | On pace |
| CloudWatch | $2.40 | $0.23 | Down significantly |
| Tax | $18.11 | $11.75 | — |

### Daily Trend

| Date | Cost | Note |
|------|------|------|
| Mar 1 | **$14.67** | **SPIKE — $11.75 is Tax (monthly accrual)** |
| Mar 2-13 | $2.9-3.2/day | Normal baseline |
| Mar 14 | $4.17 | Slightly elevated |
| Mar 16 | $4.40 | Slightly elevated |
| Mar 17-18 | $3.26-3.31/day | Normal |
| Mar 19 | $1.12 | Data still processing |

### Anomaly: S3 Cost +302% ($1.78 -> projected $7.15)

**Breakdown (eu-west-3):**
- `Requests-Tier1` (PUT/POST/LIST): **$3.77** — high request volume, main cost driver
- `Requests-Tier2` (GET): $0.30
- `TimedStorage-SIA`: $0.20 — Standard-IA storage
- `EarlyDelete-SIA`: $0.14 — objects deleted before 30-day minimum, penalty charge
- `Retrieval-SIA`: $0.12 — frequent retrieval from Standard-IA (defeats purpose of IA tier)
- Standard storage: $0.06

**Root cause**: High PUT/LIST request volume ($3.77) in eu-west-3. Also paying early-delete and retrieval penalties on Standard-IA objects — suggests objects are stored in IA but accessed/deleted frequently, which is more expensive than Standard tier.

**Action needed?** Yes, investigate:
1. What's generating high PUT/LIST requests on S3 in eu-west-3? (possible: backup jobs, logging, app uploads)
2. Move frequently accessed objects from Standard-IA to Standard tier — current pattern is costing more, not less
3. Not critical ($5 increase) but trend should be understood before it grows

### Mar 1 Spike Explained

$14.67 on Mar 1 = $11.75 Tax accrual (first of month) + $2.92 normal daily cost. **Not an anomaly.**

### CloudWatch Drop -85% ($2.40 -> $0.36)

Feb had $2.40, Mar projecting $0.36. Likely reduced custom metrics or dashboard usage. No concern — this is savings.

### Overall Assessment

**No strange charges.** Bill pacing similar to Feb. Only anomaly: **S3 already at $4.61 (2.6x all of Feb)** — investigate request volume and IA-tier misuse in eu-west-3.

---

## RDS Monitoring — speedventory (eu-west-3)

### Instance Config

| Property | Value | Assessment |
|----------|-------|------------|
| Engine | PostgreSQL 17.5 | Current |
| Instance | db.t4g.small (2 vCPU, 2 GB RAM) | Small |
| Storage | 20 GB gp3 (auto-scale to 100 GB) | 4 GB used, 16 GB free |
| Multi-AZ | **No** | Single point of failure |
| **Publicly Accessible** | **Yes** | **Security risk** |
| Backup Retention | 7 days | OK |
| Auto Minor Upgrade | **No** | Manual patching required |
| Deletion Protection | Yes | Good |
| Enhanced Monitoring | 60s interval | Good |
| Performance Insights | Enabled (7d retention) | Good |
| SSL Cert Valid | 2026-12-01 | ~8 months remaining |
| Created | 2020-09-01 | ~5.5 years old |

### Current Metrics (last 1h vs 24h baseline)

| Metric | Current | Avg 24h | Max 24h | Status |
|--------|---------|---------|---------|--------|
| **CPU** | 3.3% | 8.0% | **97.8%** | **SPIKE in last 24h** |
| Free Memory | 648 MB | 617 MB | 655 MB | 32% free of 2 GB |
| Free Storage | 16.0 GB | 16.0 GB | 16.0 GB | OK (80% free) |
| Connections | 0 | 3.6 | 11 | Normal |
| Read IOPS | 0.3 | 0.6 | 237 | Burst observed |
| Write IOPS | 2.4 | 3.7 | 53 | Normal |
| Read Latency | 0 ms | 0.3 ms | 10 ms | OK |
| **Write Latency** | 1 ms | 1.7 ms | **71 ms** | **Spike correlates with CPU** |
| Swap | 2.2 MB | 2.2 MB | 2.2 MB | Negligible |
| Network In | 1.1 KB/s | 12.6 KB/s | 107 KB/s | Normal |
| Network Out | 11.9 KB/s | 119 KB/s | 3.7 MB/s | Burst observed |
| Disk Queue | 0.01 | 0.02 | 0.81 | OK |

### Issues Found

1. **CPU spike to 97.8%** — In the last 24h, CPU hit near-100%. Correlates with write latency spike (71ms) and elevated IOPS. Likely a heavy query or batch job. This is a db.t4g.small (burstable) — if CPU credits deplete, performance degrades. Check Performance Insights for the offending query.

2. **Publicly Accessible = Yes** — Database is reachable from the internet. Even with security group restrictions, this is a security risk. Should be set to private and accessed via VPN or bastion host unless there's a specific reason.

3. **Memory tight** — Only 648 MB free (32%) on a 2 GB instance. With connection spikes (up to 11), this could become a bottleneck. Correlates with the Server Memory CloudWatch alarm flapping (36 times/14d on the EC2 host).

4. **Auto Minor Version Upgrade disabled** — Patches require manual action. Two pending (OS update + 17.5.R2) are sitting unapplied.

### Recommendations

| Priority | Action | Effort |
|----------|--------|--------|
| **High** | Investigate CPU 97.8% spike — check Performance Insights for slow queries | Low |
| **High** | Set PubliclyAccessible=No, use VPN/bastion | Medium |
| Medium | Apply pending OS + engine patches in maintenance window | Low |
| Medium | Consider upgrade to db.t4g.medium (4 GB) if memory pressure continues | Low |
| Low | Enable Auto Minor Version Upgrade | Low |

---

## New Relic APM — Console LIVE (Ruby/Docker)

Account: 3720169 | Agent: ruby 9.11.0 | Entity: Console LIVE

### Sidekiq Jobs — DB Heavy (cause of CPU 97.8% spike)

| Job | Avg DB Time | Max DB Time | Runs/24h | Trend (7d) |
|-----|-------------|-------------|----------|------------|
| **UpdateProductTendencyCacheJob** | **30.6 min** | **30.8 min** | 2 | Stable ~30min, spiked to 37min 4 days ago |
| **SaveCurrencyRateJob** | **18.9 min** | **18.9 min** | 1 | — |
| **UpdateProductSoldInMonthsJob** | **18.6 min** | **18.6 min** | 1 | — |
| **UpdateOverallRankingJob** | **14.3 min** | **14.6 min** | 2 | — |
| ImportRoutingPlanJob | 4.3 min | 4.3 min | 1 | — |

These 5 Sidekiq jobs spend **~87 min/day of pure DB time** on a db.t4g.small. This is the root cause of CPU spikes and memory pressure. `UpdateProductTendencyCacheJob` alone hammers the DB for 30 minutes twice daily.

### N+1 Query Pattern Detected

The `order_lines` query (3,846 calls/24h at 0.17s avg) runs once per product in a loop — classic N+1. Combined with the SUM query (3,849 calls), these two queries account for ~7,695 DB calls from `UpdateProductTendencyCacheJob`.

### Application Errors (24h)

| Error | Count | Impact |
|-------|-------|--------|
| **NameError** `json_body` undefined | **178** | `SyncPhysicalQtyToPretashopService` — code bug, likely typo (`json_body` vs `response_body`) |
| **NoMethodError** `orders` on nil | **76** | Nil reference — missing association or deleted record |
| **DeserializationError** ShippingLabel not found | 21 | Job queued for deleted record (id=7074) |
| **RecordNotUnique** duplicate order reference | 17 | Race condition on order import (ref 36172) |
| **BadRequest** invalid UTF-8 | 4 | User input encoding issue |
| **HTTPError** 404 | 1 | External API not found |

Total: **297 errors/24h**. Top two (`NameError` + `NoMethodError`) = 254 errors = **85% of all errors** and are code bugs.

### Error Rate Spikes (hourly)

| Time (UTC) | Requests | Error Rate | Avg Duration | Note |
|------------|----------|------------|--------------|------|
| ~00:30 | 10 | **80%** | 72ms | Low traffic, errors dominate |
| ~08:00 | 57 | 8.8% | 6s | Sidekiq batch starting |
| ~18:30 | 11 | 18% | **246s** | Heavy job running |
| ~19:30 | 7 | **57%** | **186s** | Heavy job + errors |
| ~20:00 | 16 | 37.5% | **185s** | Continued |
| ~22:30 | 6 | **83%** | 136ms | Low traffic, errors dominate |

During off-hours (low traffic), error rate appears high (80%+) but absolute count is low. The 185-246s durations correspond to the heavy Sidekiq jobs running.

### Top DB Queries by Call Volume

| Query | Calls/24h | Avg | Max | Note |
|-------|-----------|-----|-----|------|
| order_lines by product (SELECT) | 3,846 | 170ms | 637ms | N+1 pattern |
| order_lines SUM selling_price | 3,849 | 170ms | 508ms | N+1 pattern |
| orders with users JOIN (eager load) | 30 | 107ms | 980ms | Wide SELECT * |
| order_lines by date range | 22 | 117ms | 173ms | OK |
| orders COUNT by status | 10 | 66ms | 498ms | OK |

### Recommendations

| Priority | Issue | Action |
|----------|-------|--------|
| **Critical** | `UpdateProductTendencyCacheJob` runs 30min of DB queries 2x/day, causing CPU 97.8% | Optimize query: batch the 7,695 N+1 calls into bulk queries. Could reduce to seconds. |
| **High** | 178 NameError in `SyncPhysicalQtyToPretashopService` | Fix typo: `json_body` -> `response_body` |
| **High** | 76 NoMethodError `orders` on nil | Add nil guard or fix missing association |
| Medium | 17 RecordNotUnique on order import | Add upsert or find_or_create_by to prevent race condition |
| Medium | 21 DeserializationError | Clean stale jobs or add guard for missing records |
| Low | Wide SELECT * on orders table (52+ columns) | Select only needed columns |

### Unresolved Questions

1. Is `UpdateProductTendencyCacheJob` running on a schedule or event-triggered? (Runs exactly 2x/day — likely cron)
2. Why is `SyncPhysicalQtyToPretashopService` referencing `json_body`? Is this a recent deploy regression?
3. The 17 duplicate key violations on orders — is Prestashop sending duplicate webhooks?

---

## Mailgun — mail.paturevision.fr (US region)

### 14-Day Delivery Summary

| Date | Sent | Delivered | Temp Fail | Perm Fail | Delivery Rate |
|------|------|-----------|-----------|-----------|---------------|
| Mar 7 (Sat) | 27 | 27 | 2 | 0 | 100% |
| Mar 8 (Sun) | 29 | 29 | 2 | 0 | 100% |
| Mar 9 (Mon) | 242 | 239 | 4 | 3 | 98.8% |
| Mar 10 (Tue) | 260 | 260 | 0 | 0 | 100% |
| Mar 11 (Wed) | 145 | 141 | 0 | 3 | 97.2% |
| Mar 12 (Thu) | 191 | 190 | 2 | 1 | 99.5% |
| Mar 13 (Fri) | 200 | 199 | 11 | 1 | 99.5% |
| Mar 14 (Sat) | 26 | 26 | 0 | 0 | 100% |
| Mar 15 (Sun) | 35 | 35 | 0 | 0 | 100% |
| Mar 16 (Mon) | 198 | 196 | 19 | 2 | 99.0% |
| Mar 17 (Tue) | 264 | 262 | 14 | 2 | 99.2% |
| Mar 18 (Wed) | 260 | 258 | 4 | 2 | 99.2% |
| Mar 19 (Thu) | 197 | 197 | 1 | 0 | 100% |
| Mar 20 (Fri) | 0 | 0 | 0 | 0 | — |
| **Total** | **2,074** | **2,059** | **59** | **14** | **99.3%** |

Pattern: ~200-260 emails/weekday, ~25-35/weekend. All transactional (no incoming).

### Failed Deliveries (24h detail)

**43 failed events** in last 24h:

| Type | Recipient | Issue | Count |
|------|-----------|-------|-------|
| Temporary | hulotadrien@yahoo.fr | **Yahoo throttling** — IP 143.55.232.6 flagged for "unexpected volume or user complaints" | 6 |
| Temporary | mathieu.liaigre@inrae.fr | INRAE throttling (recipient rejected) | 3 |
| Temporary | stephane.clouard@inrae.fr | INRAE throttling | 3 |
| Temporary | joey@paturevision.fr | Internal retry | 2 |
| Temporary | clement@paturevision.fr | Internal retry | 1 |
| Temporary | sarah@paturevision.fr | Internal retry | 1 |
| **Permanent** | **jeroen.verbeke@desutter-naturally.com** | **Suppress-bounce** — previously bounced, won't retry | 2 |
| **Permanent** | **fcharvet@ets-bernard.com** | **Mailbox doesn't exist** (Outlook 550 5.4.1) | 2 |

### Issues Found

1. **Yahoo IP reputation warning** — Mailgun IP 143.55.232.6 is being throttled by Yahoo ("unexpected volume or user complaints"). 6 retries for a single recipient. If this persists, emails to Yahoo/AOL addresses may start bouncing permanently.

2. **INRAE throttling** — French research institute is rejecting due to rate limits. 6 retries across 2 recipients. Likely their mail server is strict — emails will eventually deliver on retry.

3. **2 permanently bounced addresses** sitting in suppression list:
   - `jeroen.verbeke@desutter-naturally.com` — still being sent to despite previous bounce
   - `fcharvet@ets-bernard.com` — mailbox removed from Outlook

4. **0 opens, 0 clicks** (14 days) — either tracking is disabled or all emails are system notifications (order confirmations, invoices) that recipients don't interact with. If marketing emails are expected to show engagement, tracking may be misconfigured.

### Recommendations

| Priority | Action |
|----------|--------|
| **Medium** | Investigate Yahoo IP reputation issue — check if other Mailgun users on shared IP 143.55.232.6 are causing complaints. Consider dedicated IP if volume grows. |
| Medium | Remove `jeroen.verbeke@desutter-naturally.com` and `fcharvet@ets-bernard.com` from active mailing — they're bouncing permanently |
| Low | If open/click tracking is expected, verify Mailgun tracking settings are enabled |

### Unresolved Questions

4. Are these transactional emails only (order confirmations) or also marketing? 0% open rate across 2,074 emails suggests tracking is off.
5. Is the Yahoo throttling new or recurring? Need to check IP reputation at postmaster.yahooinc.com

---

## Siteground Disk Usage (SSH: Bailey.cpanel)

### Total: 41 GB

### Top Directories

| Directory | Size | Note |
|-----------|------|------|
| **update.paturevision.fr.zip** | **6.1 GB** | **Zip file sitting in www root** |
| **pre9.paturevision.fr/** | **10 GB** | Largest site |
| **pre9.paturevision.fr.zip** | **4.3 GB** | **Another zip backup** |
| staging-sg.paturevision.fr/ | 7.1 GB | Staging |
| je-pature.paturevision.fr/ | 5.9 GB | Production |
| queue7.paturevision.fr/ | 5.3 GB | Queue service |
| paturevision.fr/ | 2.2 GB | Main site |
| staging-je-pature.paturevision.fr/ | 386 MB | Staging |
| Everything else | <5 MB | Negligible |

### Issues Found

1. **10.4 GB in zip backups** — `update.paturevision.fr.zip` (6.1 GB) + `pre9.paturevision.fr.zip` (4.3 GB) sitting in the www directory. These are likely old backup/migration files. **Deleting them frees 25% of total disk.**

2. **pre9.paturevision.fr = 10 GB** — largest directory. If this is a legacy/pre-production site, it may be cleanable.

3. **41 GB total** — Siteground GrowBig plan allows 20 GB, GoGeek allows 40 GB. If on GoGeek, you're at capacity. Verify your plan storage limit in Siteground dashboard.

### Recommendations

| Priority | Action | Savings |
|----------|--------|---------|
| **High** | Delete `update.paturevision.fr.zip` and `pre9.paturevision.fr.zip` if no longer needed | **10.4 GB** |
| Medium | Audit `pre9.paturevision.fr/` — is it still used? | Up to 10 GB |
| Medium | Audit `staging-sg.paturevision.fr/` — 7.1 GB for staging seems large | Up to 7 GB |
| Low | PHP error log from 2021 (`staging.paturevision.fr`) — stale, no recent errors | — |

### Unresolved Questions

6. What Siteground plan is this? (GrowBig 20 GB / GoGeek 40 GB / Cloud?) — determines urgency
7. Are `pre9.paturevision.fr.zip` and `update.paturevision.fr.zip` needed? Can they be moved to S3 or deleted?
