# Bailey Monitor — 2026-05-01 12:57 +07

**Window:** snapshot @ 2026-05-01T05:57Z (12:57 +07).
**Note:** 2026-04-30 (Reunification) + 2026-05-01 (Labor Day) are VN holidays — French ops unaffected; traffic patterns reflect EU business hours only.

## TL;DR — Critical Alerts

| # | Sev | Source | Detail |
|---|---|---|---|
| 1 | MED | RDS speedventory | **2 pending maintenance actions** — OS `system-update` + engine patch `17.5.R2` (db-upgrade). No auto-apply date set; will run in next maintenance window (Mon 03:00–03:30 UTC). |
| 2 | MED | RDS speedventory config | **MultiAZ=False, PubliclyAccessible=True, AutoMinorVersionUpgrade=False** — all three persistent risks (no HA, exposed endpoint, manual patching only). Pre-existing config. |
| 3 | MED | New Relic | **Slow UPDATE products SET weight** avg **16.5s / max 23.3s** (n=2 in 24h). `Controller/api/v1/products/create` avg **10.0s / max 42.2s** (n=30). DB plan/index review needed. |
| 4 | LOW | New Relic | **17× ActiveJob::DeserializationError** in 24h — orphan ShippingLabel `id=8204` keeps re-scheduling. Purge the dead job or recreate the record. |
| 5 | LOW | CloudWatch history | **Recurring nightly memory flap** on `Server Memory` — alarm fires ~22:00–22:25 UTC, auto-recovers ~05:25–05:55 UTC every night for 14d straight. Hits 90–91% then drops to 80–81%. Likely nightly batch — auto-recovers, but should be sized or scheduled. |
| 6 | LOW | Siteground dashboard | **Session expired** — CPU/RAM dashboard not fetched. Storage covered via SSH (72%, see below). Re-login interactively: `node scripts/siteground-storage.js --login`. |
| 7 | INFO | Mailgun | 99.46% delivery rate over 14d (2407/2420). Failures are temporary on internal `@paturevision.fr` recipients (laura/sarah/karine/info). 0 complaints. |
| 8 | INFO | Billing | Today MTD = $0.00 (May 1 — no charges posted). Last month: **$117.69** (EC2-Other $73, Tax $20, VPC $14, RDS $5, S3 $3). Normal. |
| 9 | INFO | SSL | Both certs Let's Encrypt, healthy: console.paturevision.fr exp **2026-07-01** (+61d); `*.paturevision.fr` exp **2026-06-22** (+52d). |

---

## CloudWatch — Bailey (eu-west-3)

### Alarms

| Alarm | State | Metric | Namespace |
|---|---|---|---|
| RDS Storage | OK | FreeStorageSpace | AWS/RDS |
| Server CPU | OK | CPUUtilization | AWS/EC2 |
| Server CPU 2 | OK | CPUUtilization | AWS/EC2 |
| Server Disk Available | OK | DiskSpaceAvailable | System/Linux |
| Server Memory | OK | MemoryUtilization | System/Linux |
| Server Memory 2 | OK | MemoryUtilization | System/Linux |
| Server Swap Usaged | OK | SwapUsed | System/Linux |
| Server Swap Usaged 2 | OK | SwapUsed | System/Linux |
| Storage Staging Server | OK | DiskSpaceAvailable | System/Linux |
| Storage staging server Pre | OK | DiskSpaceAvailable | System/Linux |

**0 ALARM, 0 INSUFFICIENT_DATA. ✅**

### Recent Alarm History (14d)

**Recurring pattern: `Server Memory` nightly flap.** 14 of 14 nights had:
- ~22:00–22:30 UTC: OK→ALARM @ ~90–91% MemoryUtilization
- ~05:20–05:55 UTC (next day): ALARM→OK @ ~80–82%

So memory peaks during the European late-evening / overnight processing window then auto-recovers by morning. Likely nightly cron / queue work. **Not a regression** but should be investigated for sizing or schedule once.

Also notable:
- 2026-04-22 22:52 UTC: `Server Swap Usaged` OK→ALARM @ 5001 MB (1 MB over 5000 threshold), recovered 23:19 UTC.
- 2026-04-27 18:11–18:29 UTC: Console-staging alarms (`Server CPU 2`, `Server Memory 2`, `Server Swap Usaged 2`, `Storage staging server Pre`) went OK→INSUFFICIENT_DATA→OK in ~15 min — likely brief reboot or agent restart.

### Dashboard

`Monitor` dashboard widgets present (10): RDS Storage, Server CPU/2, Server Disk Available, Server Memory/2, Server Swap Usaged/2, Storage Staging Server, Storage staging server Pre — covers all 10 alarms.

---

## AWS Health / EC2 / RDS Events

### EC2 Inventory (eu-west-3)

| InstanceId | State | Type | Name |
|---|---|---|---|
| i-097f6eee5762c82f3 | running | t3.large | Console LIVE |
| i-01a7339df8c663ed6 | running | t3.medium | staging console |
| i-0f82e81d2a07a28b9 | running | t3.medium | staging pretashop |

eu-west-2: 0 EC2 instances. **0 EC2 scheduled events** in either region.

### RDS Events 14d

56 events on speedventory — all routine: daily automated snapshots within the 12:48–13:18 UTC backup window. No errors, no failovers, no parameter changes.

### RDS Pending Maintenance ⚠

**Resource:** `arn:aws:rds:eu-west-3:728698624016:db:speedventory`

| Action | AutoApplyDate | ForcedApply | Description |
|---|---|---|---|
| `system-update` | (none) | (none) | New Operating System update is available |
| `db-upgrade` | (none) | (none) | New engine patch version is available: **17.5.R2** |

**Effect:**
- `system-update`: rolling instance OS patch. RDS handles in-place, but causes brief connection drop / reboot during the maintenance window (Mon 03:00–03:30 UTC). With `MultiAZ=False`, this *is* a few-minute downtime.
- `db-upgrade` to 17.5.R2: minor PostgreSQL patch (security/bugfix). Same maintenance-window mechanic, ~5–10 min unavailability.

**Recommendation:** Both have **no auto-apply date** set, so they will only execute when:
(a) you click "Apply now" / "Apply during next maintenance window", or
(b) the user enables `AutoMinorVersionUpgrade=True` (currently False).

Schedule both for the same Monday 03:00 UTC window to avoid two outages. eu-west-3 = UTC+2 → 05:00 Paris local; very low traffic. Combine into one window to minimize disruption.

**Action needed:** Yes — schedule next Monday's maintenance window. Inform Joey/team beforehand.

---

## Billing (Cost Explorer)

| Service | Last month (Apr) | This MTD (May 1) | Δ | %Δ |
|---|---|---|---|---|
| EC2 - Other | $73.04 | $0.00 | -73.04 | (May 1 only) |
| Tax | $19.61 | $0.00 | -19.61 | (May 1 only) |
| Amazon VPC | $14.20 | $0.00 | -14.20 | (May 1 only) |
| Amazon RDS | $5.30 | $0.00 | -5.30 | (May 1 only) |
| Amazon S3 | $3.11 | $0.00 | -3.11 | (May 1 only) |
| AmazonCloudWatch | $2.32 | $0.00 | -2.32 | (May 1 only) |
| AWS Cost Explorer | $0.12 | $0.00 | -0.12 | (May 1 only) |
| **TOTAL** | **$117.69** | **$0.00** | | |

**Daily MTD:** May 1 = $0.0000. Cost Explorer hasn't posted any charges yet today (normal — billing data lags ~24h; today is the 1st of the month).

**Status:** ✅ No anomaly. April level ($117.69) is consistent with prior months. Will revisit after May has accumulated ≥3 days of data.

---

## RDS speedventory Deep Check (eu-west-3)

### Instance config

| Field | Value | Assessment |
|---|---|---|
| DBInstanceClass | db.t4g.small | OK for current load (low CPU/IOPS avg) |
| Engine | postgres 17.5 | ⚠ patch 17.5.R2 pending — see Subtask 2 |
| DBInstanceStatus | available | ✓ |
| AllocatedStorage / Type | 20 GB gp3 (3000 IOPS provisioned) | OK — current free 15.99 GB (80% free) |
| MultiAZ | **False** | ⚠ Single-AZ — any maintenance = downtime |
| PubliclyAccessible | **True** | ⚠ Endpoint reachable from internet (relies on SG) |
| AutoMinorVersionUpgrade | **False** | ⚠ Manual patching only — see #1 above |
| BackupRetentionPeriod / Window | 7d / 12:48–13:18 UTC | OK |
| MaintenanceWindow | mon:03:00–mon:03:30 UTC | OK |
| CACertificateIdentifier | rds-ca-rsa2048-g1 | OK (no TLS expiry urgency) |
| StorageEncrypted | True | ✓ |
| DeletionProtection | True | ✓ |
| PerformanceInsightsEnabled | True | ✓ |
| EnabledCloudwatchLogsExports | None | ⚠ no DB logs to CloudWatch |
| PendingModifiedValues | {} | ✓ none |

### Metrics — 1h current vs 24h baseline

| Metric | 1h avg | 1h max | 24h avg | 24h max | Note |
|---|---|---|---|---|---|
| CPUUtilization | 3.51% | 5.38% | 5.84% | **93.24%** | ⚠ 24h CPU spike, now recovered |
| FreeableMemory | 649.8 MB | 654.1 MB | 631.3 MB | 661.0 MB | OK |
| FreeStorageSpace | 16.0 GB | 16.0 GB | 16.0 GB | 16.0 GB | ✅ 80% free |
| DatabaseConnections | 3.30 | 4.00 | 4.64 | 11.00 | OK |
| ReadIOPS | 0.26 | 1.32 | 0.62 | **104.87** | spike (max), avg low |
| WriteIOPS | 2.40 | 9.56 | 3.17 | 44.23 | OK |
| ReadLatency | 0.10 ms | 2.00 ms | 0.23 ms | 10.00 ms | OK |
| WriteLatency | 0.93 ms | 8.64 ms | 1.46 ms | **62.38 ms** | spike (max), avg low |
| SwapUsage | 17.7 MB | 17.9 MB | 15.9 MB | 18.9 MB | low, OK |
| DiskQueueDepth | 0.01 | 0.08 | 0.01 | 0.57 | OK |
| Network RX/TX | 3/114 KB/s | 4.5/170 KB/s | 9/220 KB/s | 80/2594 KB/s | TX spike during business hrs |

**Findings:**
- Current 1h state is healthy across the board.
- 24h CPU max 93% + WriteLatency max 62ms + ReadIOPS max 105 → there was a single brief load spike in the past 24h (likely one of the slow `UPDATE products SET weight` queries from NewRelic — 23s queries acquire significant locks/IO). Already self-recovered.
- Storage healthy: 4 GB used / 20 GB allocated.

### Recommendations
1. Schedule both pending maintenance actions for next Mon 03:00 UTC window (single combined outage).
2. **Consider enabling `AutoMinorVersionUpgrade=True`** to avoid stacking pending patches indefinitely.
3. Long-term: enable MultiAZ to remove maintenance-window downtime; close PubliclyAccessible if not strictly needed.
4. Investigate the slow `UPDATE products SET weight` causing the 24h CPU+latency spike (see New Relic section).

---

## New Relic APM — Console LIVE (24h)

### Throughput / error rate

Pattern: ~5500–8300 txns/hr during EU business hours (06:00–13:55 UTC = 08:00–15:55 Paris) then drops to ~360–450/hr off-hours. This is normal.
Error rate hovered between 0.00–0.14% during business hours, with two short blips:
- 04-30 17:55 UTC — 0.48%
- 04-30 21:55 UTC — 0.89%
- 05-01 01:55 UTC — 0.48%

All under 1% — within normal noise.

### TransactionError by class (24h)

| Count | Class | Latest |
|---|---|---|
| 17 | `ActiveJob::DeserializationError` | "Couldn't find ShippingLabel with 'id'=8204" — orphan job re-running |
| 10 | `ActionController::BadRequest` | "Invalid query parameters: invalid byte sequence in UTF-8" — bad client input |
| 7 | `ActiveRecord::RecordNotUnique` | duplicate `(account_id=2, reference_number=37451)` on `index_orders_on_account_id_and_reference_number` — race condition or retry dup |
| 1 | NoMethodError | `undefined method 'orders' for nil:NilClass` |

**Action:** Purge the orphan ShippingLabel job (dequeue or recreate label with id 8204). The dup-key on orders may be a retry race — safe to drop, but worth a 5-min look at order creation flow.

### Top slow DB transactions (>1s, 24h)

| Transaction | avg DB | max DB | n |
|---|---|---|---|
| `Controller/products/quick_modify_update` | **12.36s** | **20.27s** | 5 |
| `Controller/api/v1/products/create` | **10.04s** | **42.24s** | 30 |
| `Controller/purchase_orders/update_in_view` | 8.70s | 8.70s | 1 |
| `Controller/purchase_orders/show` | 5.45s | 5.45s | 1 |
| `Controller/sales_analytics/show` | 4.34s | 4.34s | 1 |
| `Controller/orders/awaiting_for_pickup` | 3.72s | 3.72s | 1 |
| `Controller/palettes/index` | 3.43s | 6.62s | 18 |
| `Controller/purchase_orders/index` | 2.83s | 6.93s | 53 |

### Top DB queries by duration (Span, 24h)

| n | avg | max | statement (truncated) |
|---|---|---|---|
| 2 | **16.54s** | **23.34s** | `UPDATE "products" SET "weight" = $? WHERE "products"."id" = $?` ⚠ |
| 1 | 6.56s | 6.56s | `UPDATE "products" SET "supplier_product_code" = $? WHERE "products"."id" = $?` |
| 26 | 0.117s | 0.781s | `SELECT "purchase_order_products".* FROM ... WHERE "purchase_order_id" IN ($?,...)` |
| 5307 | 0.062s | 0.913s | `SELECT "products".* FROM ... WHERE "id" IN (...)` (high call volume but fast) |

**Action:**
- A single-row `UPDATE products SET weight` taking **16–23s** is anomalous. Single-PK update should be <10ms. Check for: overly broad triggers, excessive after-update callbacks, or the row hitting locks from a long-running batch.
- This 24h DB-time spike is the most likely cause of the 93% CPU max + 62ms WriteLatency max on speedventory.

---

## Mailgun — mail.paturevision.fr (14d)

| Date | Accepted | Delivered | Fail-Perm | Fail-Temp |
|---|---|---|---|---|
| 18 Apr | 30 | 30 | 0 | 2 |
| 19 Apr | 44 | 44 | 0 | 1 |
| 20 Apr | 308 | 307 | 1 | 15 |
| 21 Apr | 320 | 320 | 0 | 2 |
| 22 Apr | 365 | 365 | 1 | 2 |
| 23 Apr | 202 | 195 | 0 | 17 |
| 24 Apr | 239 | 236 | 3 | 28 |
| 25 Apr | 10 | 10 | 0 | 0 |
| 26 Apr | 23 | 23 | 0 | 0 |
| 27 Apr | 208 | 206 | 2 | 8 |
| 28 Apr | 270 | 270 | 0 | 27 |
| 29 Apr | 215 | 215 | 0 | 40 |
| 30 Apr | 184 | 184 | 0 | 8 |
| 1 May | 2 | 2 | 0 | 0 |
| **TOTAL** | **2420** | **2407** | **7** | **150** |

**Delivery rate: 99.46% ✅**

Failed events 24h (50 events): all `temporary` severity, all on internal recipients `laura/sarah/karine/info@paturevision.fr` (and 1 `bdallery@ede63.fr`). Reason: `generic` — typically Mailgun's catch-all for "remote MX returned 4xx temporary, will retry". Pattern looks like the receiving mailserver's greylist/throughput limit, not Bailey-side. Total `temporary` events were 150 over 14d but actual delivery is 99.46% (so retries succeed). Not actionable.

Bounces / complaints API: HTTP 401 — current API key lacks bounce-list permission. Not a blocker (delivery rate alone covers).

---

## Siteground (mail.paturevision.fr hosting)

⚠ **Dashboard scrape: session expired** — CAPTCHA login required. Run `node scripts/siteground-storage.js --login` interactively to re-establish session. CPU/RAM dashboard data NOT fetched this run.

### Disk via SSH (Bailey.cpanel)

```
Filesystem      Size  Used Avail Use%  Mounted on
-               164G  116G   47G  72%  /home/customer
```

**Status: 72% — under 75% alert threshold. ✅** No action needed today.

Top directories under `~/www`:

| Size | Directory |
|---|---|
| 10 GB | pre9.paturevision.fr/ |
| 7.0 GB | staging-sg.paturevision.fr/ |
| 5.9 GB | je-pature.paturevision.fr/ |
| 4.9 GB | queue7.paturevision.fr/ |
| 2.2 GB | paturevision.fr/ |
| 386 MB | staging-je-pature.paturevision.fr/ |

Total ~31 GB in www. No `*.zip` backup files. Other 85 GB sit outside `~/www` (likely `~/mail`, `~/logs`, `~/tmp`, MySQL data dirs).

If/when 75% is breached, investigate `~/mail`, `~/tmp`, `~/.cpanel/logs`, and `~/access-logs` first.

---

## SSL Certs

| Domain | Expires | Days left | Issuer |
|---|---|---|---|
| console.paturevision.fr | **2026-07-01** 08:34 UTC | 61 | Let's Encrypt E8 |
| `*.paturevision.fr` | **2026-06-22** 15:03 UTC | 52 | Let's Encrypt R13 |

Both healthy (>30 days). Let's Encrypt auto-renews ~30 days before expiry; will refresh on its own.

---

## Issues / Warnings Summary

1. **MED — Schedule RDS speedventory maintenance** (OS update + 17.5.R2 patch) for next Monday 03:00 UTC window. Combine into one outage.
2. **MED — Slow `UPDATE products SET weight`** (avg 16.5s, max 23.3s). Investigate triggers/callbacks/lock contention. Likely cause of 24h CPU 93% + WriteLatency 62ms spikes.
3. **MED — RDS posture** — still MultiAZ=False, PubliclyAccessible=True, AutoMinorVersionUpgrade=False (pre-existing).
4. **LOW — 17 ActiveJob orphan ShippingLabel id=8204** — purge or recreate.
5. **LOW — Recurring nightly memory flap** ~22:00–05:30 UTC (auto-recovers). Investigate batch sizing/schedule.
6. **LOW — Siteground session expired** — re-login interactively.
