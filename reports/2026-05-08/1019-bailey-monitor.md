# Bailey Infrastructure Monitor — 2026-05-08

Run: 10:19 UTC | Region: eu-west-3 (primary), eu-west-2 (secondary) | Account: 728698624016 (nus-dev)

---

## 1. CloudWatch (eu-west-3)

### Alarm State Summary

| State | Metric Alarms | Composite |
|---|---|---|
| ALARM | 0 | 0 |
| INSUFFICIENT_DATA | 0 | 0 |
| OK | 10 | 0 |

All 10 alarms in OK state.

### Alarms (all OK)

| Name | Metric | Threshold |
|---|---|---|
| RDS Storage | FreeStorageSpace | < 5 GB |
| Server CPU | CPUUtilization | > 70% |
| Server CPU 2 | CPUUtilization | > 70% |
| Server Disk Available | DiskSpaceAvailable | < 5% |
| Server Memory | MemoryUtilization | > 90% |
| Server Memory 2 | MemoryUtilization | > 90% |
| Server Swap Usaged | SwapUsed | > 5000 |
| Server Swap Usaged 2 | SwapUsed | > 2000 |
| Storage Staging Server | DiskSpaceAvailable | < 5% |
| Storage staging server Pre | DiskSpaceAvailable | < 5% |

### Dashboard "Monitor" — 10 widgets

RDS Storage, Server CPU x2, Disk Available, Memory x2, Swap Used x2, Staging storage x2.

### Alarm History (14d, 38 state transitions)

Recurring nightly pattern on `Server Memory`: ALARM → OK around 22:30-22:50 UTC nightly (5 cycles in last 5 days). Brief CPU spike on 2026-05-04 07:41-07:48 UTC (4 transitions). All resolved automatically. No persistent issues.

---

## 2. AWS Health & Events

### EC2 Inventory (eu-west-3)

| Instance | Name | Type | State |
|---|---|---|---|
| i-097f6eee5762c82f3 | Console LIVE | t3.large | running |
| i-01a7339df8c663ed6 | staging console | t3.medium | running |
| i-0f82e81d2a07a28b9 | staging pretashop | t3.medium | running |

### EC2 Scheduled Events

eu-west-2: 0 events. eu-west-3: 0 events. None pending.

### RDS Events (14d)

eu-west-2: 0 events. eu-west-3: 56 events — all routine automated daily backups for `speedventory` (creation/finished). No errors or failure events.

### RDS Pending Maintenance — eu-west-3

`speedventory` has 2 pending actions:
- `system-update`: New OS update available
- `db-upgrade`: Engine patch 17.5.R2 available

Maintenance window: `mon:03:00-mon:03:30` UTC. AutoMinorVersionUpgrade is **disabled**, so these will not auto-apply. **User decision needed** on when to apply.

---

## 3. AWS Billing

### MTD (2026-05-01 → 2026-05-08, 7 days) vs Last Month (2026-04-01 → 2026-05-01, 30 days)

| Service | MTD | Last Month | Last-month daily avg | MTD daily avg | Delta |
|---|---|---|---|---|---|
| EC2 - Other | $15.10 | $75.06 | $2.50 | $2.16 | -14% |
| Amazon RDS | $1.10 | $5.43 | $0.18 | $0.16 | -13% |
| Amazon VPC | $3.20 | $14.40 | $0.48 | $0.46 | -4% |
| Amazon S3 | $0.31 | $3.11 | $0.10 | $0.04 | -56% |
| AmazonCloudWatch | $0.00 | $2.40 | $0.08 | $0.00 | -100% |
| AWS Cost Explorer | $0.03 | $0.12 | $0.004 | $0.004 | flat |
| Tax | $3.95 | $20.10 | — | — | accrual |
| **TOTAL** | **$23.70** | **$120.62** | **$4.02** | **$3.39** | **-16%** |

### Daily MTD breakdown

| Date | Cost |
|---|---|
| 2026-05-01 | $7.05 (includes tax accrual) |
| 2026-05-02 | $3.08 |
| 2026-05-03 | $3.08 |
| 2026-05-04 | $3.30 |
| 2026-05-05 | $3.08 |
| 2026-05-06 | $3.11 |
| 2026-05-07 | $1.00 |

### Projection

Pace ($3.10/day average ex-tax) → ~$96 + tax for May. Last month $120.62. Projection ~$115 (slight decrease). **No anomalies.** CloudWatch line dropped to $0 (alarm metrics are within free tier this period). 2026-05-07 lower at $1.00 likely partial day reporting.

---

## 4. RDS speedventory (eu-west-3)

### Configuration

| Field | Value |
|---|---|
| Class | db.t4g.small |
| Engine | postgres 17.5 |
| Status | available |
| MultiAZ | **false** (single-AZ) |
| PubliclyAccessible | **true** |
| AutoMinorVersionUpgrade | **false** |
| AllocatedStorage | 20 GB |
| StorageType | gp3 |
| MaxAllocatedStorage | 100 GB |
| CACertificateIdentifier | rds-ca-rsa2048-g1 |
| Cert ValidTill | 2026-12-01 03:00 UTC |
| BackupRetention | 7 days |
| BackupWindow | 12:48-13:18 UTC |
| MaintenanceWindow | mon:03:00-mon:03:30 UTC |
| DeletionProtection | true |
| PendingModifiedValues | (none) |

**Flags:**
- MultiAZ disabled — no automatic failover
- PubliclyAccessible — relies on SG/network ACL for protection
- AutoMinorVersionUpgrade off — pending 17.5.R2 won't auto-apply
- Cert expires 2026-12-01 (~7 months out)

### Metrics (1h current vs 24h baseline)

| Metric | 1h Avg | 1h Max | 24h Avg | 24h Max | Notes |
|---|---|---|---|---|---|
| CPUUtilization (%) | 3.29 | 4.99 | 5.78 | **93.92** | 24h spike, currently calm |
| FreeableMemory (MB) | 651 | 669 | 634 | 669 | healthy |
| FreeStorageSpace (GB) | 15.93 | 15.93 | 15.93 | 15.93 | 80% free of 20GB allocated |
| DatabaseConnections | 0.28 | 1 | 2.61 | 10 | low |
| ReadIOPS | 0.28 | 1.32 | 0.48 | 79.51 | spike in 24h |
| WriteIOPS | 2.42 | 10.07 | 3.15 | 44.51 | normal |
| ReadLatency (ms) | 0.13 | 1.0 | 0.20 | 10.0 | OK |
| WriteLatency (ms) | 0.83 | 5.82 | 1.26 | 43.96 | one max spike, avg fine |
| SwapUsage (MB) | 16.30 | 16.30 | 16.41 | 18.81 | low, stable |
| NetworkRx (KB/s) | 1.16 | 2.39 | 9.12 | 84.38 | |
| NetworkTx (KB/s) | 13.55 | 79.42 | 108.64 | 2852.44 | |
| DiskQueueDepth | 0.007 | 0.05 | 0.011 | 0.44 | healthy |

CPU spike to 93.92% somewhere in 24h window. Currently calm (3.29% avg). Worth monitoring but not alarming.

---

## 5. New Relic APM (24h)

### Top transactions by DB time

| Transaction | avg DB (s) | max DB (s) | avg dur (s) | count |
|---|---|---|---|---|
| products/quick_modify_update | 4.66 | 10.76 | 17.48 | 5 |
| palettes/index | 1.95 | 2.44 | 4.66 | 12 |
| purchase_orders/index | 1.34 | 14.51 | 2.30 | 106 |
| orders/shipped | 1.09 | 2.10 | 7.92 | 7 |
| api/v1/purchase_order_receptions/create | 0.85 | 5.49 | 1.60 | 14 |

### Slow DB transactions (DB > 1s)

| Transaction | avg DB (s) | max DB (s) | count |
|---|---|---|---|
| api/v1/products/create | **12.94** | **16.51** | 4 |
| products/quick_modify_update | 7.22 | 10.76 | 3 |
| stocks/all | 3.42 | 3.42 | 1 |
| api/v1/purchase_order_receptions/create | 3.11 | 5.49 | 3 |
| purchase_orders/index | 3.06 | 14.51 | 45 |

### Errors by class (24h)

| Class | Count | Latest |
|---|---|---|
| ActiveJob::DeserializationError | 9 | Couldn't find ShippingLabel id=8348 |
| ActionController::InvalidAuthenticityToken | 8 | (CSRF) |
| ActiveRecord::PendingMigrationError | 8 | dev-env migration pending |
| ActionController::BadRequest | 1 | invalid UTF-8 byte |

Hourly error %: max 2.27% (low traffic hour, 1/44 reqs); main hours <0.05%. Total volume normal.

### Top slow DB queries (Span)

1. Products COUNT with 4 LEFT OUTER JOINs (palette/supplier) — 327ms
2. Products COUNT with 7 LEFT OUTER JOINs + supplier filter — 257ms
3. Products IN (...) lookup with 286 IDs — avg 191ms, max 1.80s
4. Products full-row select with ~100 columns — avg 128ms
5. Orders COUNT with status_origins join — avg 79ms

---

## 6. Mailgun (paturevision.fr, EU)

### 14-day delivery (2026-04-25 → 2026-05-08)

| Metric | Total |
|---|---|
| Accepted | 1788 |
| Delivered | 1782 |
| Failed (perm+temp) | 138 |
| Opened | 0 |
| Clicked | 0 |
| Complained | 0 |

**Delivery rate: 99.66%** (1782/1788)

### Per-day

| Date | Accepted | Delivered | Failed |
|---|---|---|---|
| 2026-04-25 Sat | 10 | 10 | 0 |
| 2026-04-26 Sun | 23 | 23 | 0 |
| 2026-04-27 Mon | 208 | 206 | 10 |
| 2026-04-28 Tue | 270 | 270 | 27 |
| 2026-04-29 Wed | 215 | 215 | 40 |
| 2026-04-30 Thu | 184 | 184 | 8 |
| 2026-05-01 Fri | 29 | 28 | 2 |
| 2026-05-02 Sat | 21 | 21 | 0 |
| 2026-05-03 Sun | 55 | 55 | 4 |
| 2026-05-04 Mon | 235 | 234 | 14 |
| 2026-05-05 Tue | 191 | 190 | 7 |
| 2026-05-06 Wed | 206 | 206 | 17 |
| 2026-05-07 Thu | 141 | 140 | 9 |
| 2026-05-08 Fri | 0 | 0 | 0 |

### Failed events 24h

20 returned, all `temporary` severity, recipients: karine@, laura@, sarah@ at paturevision.fr (internal addresses, transient delivery delays). Bounces/complaints lists empty.

---

## 7. Siteground (paturevision.fr cpanel)

### Storage breakdown (~/www, SSH du)

| Path | Size |
|---|---|
| pre9.paturevision.fr/ | 11 GB |
| staging-sg.paturevision.fr/ | 7.0 GB |
| je-pature.paturevision.fr/ | 6.1 GB |
| queue7.paturevision.fr/ | 4.9 GB |
| paturevision.fr/ | 2.1 GB |
| staging-je-pature.paturevision.fr/ | 386 MB |
| mail.paturevision.fr/ | 456 KB |
| outils.paturevision.fr/ | 316 KB |
| console.paturevision.fr/ | 280 KB |
| (29 others, all <1 MB) | — |
| **~/www total** | **31 GB** |

### Filesystem

```
Filesystem      Size  Used Avail Use% Mounted on
-               164G  117G   46G  72% /home/customer
```

**~/home/customer at 72% used (117/164 GB)** — WARNING zone.

No `*.zip` archives found in ~/www (the largest disk consumers are presta installs).

**Note:** Siteground browser scraper session expired (`scripts/siteground-storage.js` returned `session_expired`). Browser-based dashboard quota figures unavailable; SSH numbers above are accurate substitute. User must run `--login` interactively to refresh session.

---

## SSL Certificates

| Domain | Expires |
|---|---|
| console.paturevision.fr | 2026-07-01 08:34:37 UTC (54 days) |
| paturevision.fr (*.paturevision.fr) | 2026-06-22 15:03:49 UTC (45 days) |

Both healthy.

---

## Slack Message Draft

```
08/05/2026

• Performance status: OK

• Resource status:
    ◦  Storage:
        ▪︎ Prestashop: WARNING (72%)
        ▪︎ Console: OK
    ◦ Swap: OK
    ◦ Memory: OK

• DB backup status: OK
• S3 backup: OK
• AWS backup status: OK

• Billing: OK ($23.70 MTD)

• Mailgun: OK *(99.7%)*

• Run recalculate stock: OK
• Check AWS noti: WARNING
• AWS Cloudtrail: OK
• AWS RDS: WARNING

• SSL:
    ◦ Console: Jul  1 08:34:37 2026 GMT
    ◦ Prestashop: Jun 22 15:03:49 2026 GMT
```

Notes for Slack rationale:
- Storage Prestashop WARNING: Siteground ~/home/customer at 72% (warning band, not critical)
- AWS noti WARNING: 2 pending RDS maintenance (system-update + 17.5.R2 patch)
- AWS RDS WARNING: same — pending patches awaiting decision; 24h CPU max 93.92% spike (currently calm)
- Memory OK: nightly Server Memory alarm transitions self-resolve within ~17 min, not persistent

---

## Unresolved Questions

1. Siteground browser session expired — ~/home/customer 72% derived from SSH `df`, but Siteground panel quota (which counts mail+db+backups too) not refreshed. Re-login needed for full panel view.
2. RDS 24h CPU spike to 93.92% — single 1h datapoint in 24h window; finer-grained history needed to identify the timestamp/cause.
3. RDS pending patches (system-update + 17.5.R2) — needs user decision on when to apply (next Mon 03:00-03:30 UTC window?).
4. Mailgun temporary failures — clustered on internal addresses (karine/laura/sarah@paturevision.fr); root cause not investigated (mailbox full? alias issue?).
5. New Relic `ActiveRecord::PendingMigrationError` (8 occurrences) appears to be from a dev environment leaking into APM; may want to filter or investigate.
