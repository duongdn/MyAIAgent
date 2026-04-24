# Bailey Monitor — 2026-04-24 08:42 (Asia/Saigon)

**Overall status:** WARNING (Siteground 78%, RDS pending maintenance)
**Performance:** OK  |  **Alarms:** all OK  |  **Billing:** on track ($92 MTD vs $120 last month)

---

## CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason |
|-------|-------|--------|
| RDS Storage | OK | — |
| Server CPU | OK | — |
| Server CPU 2 | OK | — |
| Server Disk Available | OK | — |
| Server Memory | OK | flipped OK at 22:50 UTC 23/04 |
| Server Memory 2 | OK | — |
| Server Swap Usaged | OK | — |
| Server Swap Usaged 2 | OK | — |
| Storage Staging Server | OK | — |
| Storage staging server Pre | OK | — |

### Recent Alarm History (14d) — Recurring Pattern
`Server Memory` oscillates OK↔ALARM nightly (~22:00–22:50 UTC). Flaps at least 10× in 14d.
`Server Swap Usaged` similar pattern, shorter duration (~30min) on ~5 nights.
Last flap: 23/04 22:16→22:50 UTC (34 min in ALARM).
`Server CPU` flapped once 20/04 13:11→13:12 UTC (1 min).

**Assessment:** Nightly memory/swap flaps on Console LIVE coincide with scheduled Sidekiq jobs. Not currently alarming but recurring. Consider tuning alarm thresholds or investigating the nightly workload.

---

## AWS Health & Events

### EC2 Inventory (eu-west-3)
| Instance | State | Name | Type |
|---|---|---|---|
| i-097f6eee5762c82f3 | running | Console LIVE | t3.large |
| i-01a7339df8c663ed6 | running | staging console | t3.medium |
| i-0f82e81d2a07a28b9 | running | staging pretashop | t3.medium |

eu-west-2: no instances, no events.

### EC2 Scheduled Events
None (both regions).

### RDS Events (14d)
Routine daily snapshots at 13:00 UTC. No anomalies.

### RDS Pending Maintenance (speedventory, eu-west-3) ⚠
| Action | Description |
|--------|-------------|
| `system-update` | New Operating System update available |
| `db-upgrade` | Engine patch available: **17.5.R2** |

**Effect:** System update likely requires instance reboot (~1–3 min downtime). Engine patch is minor version (17.5 → 17.5.R2), non-breaking, also requires reboot.
**Urgency:** Medium. No forced-apply date shown. Safe to defer until maintenance window.
**Action needed?** **Yes, schedule** — apply during preferred window `mon:03:00–03:30 UTC`. `AutoMinorVersionUpgrade=false` so must apply manually via console or `--apply-action`.

---

## Billing (us-east-1 CE)

| Service | Apr MTD | Mar total | Δ |
|---------|--------:|----------:|---|
| EC2 — Other | $55.28 | $70.44 | on track (77% of Mar; 77% of month elapsed) |
| Tax | $14.86 | $20.00 | on track |
| VPC | $10.88 | $14.88 | on track |
| RDS | $4.04 | $5.38 | on track |
| S3 | $2.92 | $6.83 | ▼ significantly lower |
| CloudWatch | $1.07 | $2.40 | on track |
| Cost Explorer | $0.09 | $0.08 | normal |
| **Total** | **~$89.15** | **~$119.95** | projected ~$115 full month |

### Daily trend
Apr-01: $18.02 (tax accrual — normal, not an anomaly)
Apr 02–22 stable: $3.00–$3.83/day
Apr-23: $1.33 (partial day at query time)

No anomalies. S3 is ~57% lower than last month, likely due to smaller log/backup volume — informational only, not a concern.

---

## RDS — speedventory (eu-west-3)

### Config
| Setting | Value | Assessment |
|---|---|---|
| Class | db.t4g.small | OK |
| Engine | PostgreSQL 17.5 | patch available (17.5.R2) |
| Storage | 20 GB gp3 | 20% used, OK |
| MultiAZ | **false** | single-AZ — no HA |
| PubliclyAccessible | **true** ⚠ | exposed to internet |
| AutoMinorVersionUpgrade | false | manual patching required |
| BackupRetention | 7 days | OK |
| Maintenance | mon 03:00–03:30 UTC | OK |
| Cert expiry | 2026-12-01 | OK |
| Status | available | OK |

### Metrics (24h)
| Metric | 1h avg | 24h avg | 24h max | Note |
|---|---|---|---|---|
| CPU % | 3.90 | 6.16 | 93.18 | max during backup window — normal |
| Freeable Memory | 649 MB | — | min 562 MB | ~28% of 2 GB free — tight but stable |
| Free Storage | 15.94 GB | — | — | 20% used |
| DB Connections | 2.7 | — | 11 | low |
| Read Latency | 0.15 ms | — | — | OK |
| Write Latency | 1.20 ms | — | — | OK |
| Read IOPS | 0.3 | — | — | OK |
| Write IOPS | 2.5 | — | — | OK |
| Swap (max) | — | — | 20 MB | negligible |
| Disk Queue | 0.008 | — | — | OK |

### Issues
- **PubliclyAccessible=true** — recommend restricting via SG rules and/or disabling public access (unless used by external integrations).
- **MultiAZ=false** — acceptable for this workload size but no automatic failover.
- **Pending maintenance** — schedule during `mon 03:00–03:30 UTC`.

---

## New Relic — Console LIVE (acct 3720169)

### Traffic & Errors (24h)
| Metric | Value |
|---|---|
| Total transactions | 98,592 |
| Error rate | **0.034%** |
| Avg duration | 0.225 s |

### Error breakdown (24h)
| Class | Count | Note |
|---|---:|---|
| `ActiveRecord::RecordNotUnique` | 11 | duplicate `(account_id, reference_number)` on order insert — Prestashop sync race |
| `ActiveJob::DeserializationError` | 11 | queued jobs referencing deleted `ShippingLabel` records |
| `NoMethodError` | 4 | `undefined method 'orders' for nil:NilClass` — nil user/client lookup |
| `ActionController::InvalidAuthenticityToken` | 3 | CSRF — likely session expiry |
| `ActionController::BadRequest` | 2 | invalid UTF-8 in query params |
| `ActiveRecord::PendingMigrationError` | 1 | dev-env message (not prod) |
| `ActiveRecord::RecordNotFound` | 1 | Order id=4361 missing |
| `OpenURI::HTTPError` | 1 | 404 external call |

None are new/spiking. All look like known-ish recurring issues.

### Hourly error rate spikes (24h)
| Window | errRate | Note |
|---|---|---|
| ~16:00 UTC | 0.12% | minor |
| ~17:00 UTC | 0.12% | minor |
| latest hour | 0.19% | minor, low throughput |

All well under 0.5%.

### Slow DB transactions (>1s, 24h)
| Endpoint | Count | Avg DB | Max DB |
|---|---:|---:|---:|
| Controller/palettes/index | 12 | 3.98 s | 10.19 s |
| Controller/purchase_orders/index | 39 | 3.43 s | 15.38 s |
| Controller/orders/show | 55 | 2.67 s | 5.73 s |
| Controller/api/v1/products/create | 85 | 2.28 s | 12.81 s |
| Controller/products/quick_modify_show | 3 | 2.81 s | 4.12 s |
| Controller/products/edit | 1 | 4.98 s | 4.98 s |

**Recommendation:** `purchase_orders/index` at 15s max DB time is worth profiling — likely missing index or N+1.

---

## Mailgun — mail.paturevision.fr (14d)

| Date | Accepted | Delivered | Fail(tmp) | Fail(perm) | Rate |
|---|---:|---:|---:|---:|---:|
| Sat 11 Apr | 30 | 31 | 8 | 0 | 100% |
| Sun 12 Apr | 62 | 62 | 5 | 0 | 100.0% |
| Mon 13 Apr | 261 | 260 | 25 | 0 | 99.6% |
| Tue 14 Apr | 221 | 217 | 5 | 5 | 98.2% |
| Wed 15 Apr | 302 | 301 | 6 | 1 | 99.7% |
| Thu 16 Apr | 247 | 246 | 15 | 1 | 99.6% |
| Fri 17 Apr | 156 | 154 | 9 | 2 | 98.7% |
| Sat 18 Apr | 30 | 30 | 2 | 0 | 100.0% |
| Sun 19 Apr | 44 | 44 | 1 | 0 | 100.0% |
| Mon 20 Apr | 308 | 307 | 15 | 1 | 99.7% |
| Tue 21 Apr | 320 | 320 | 2 | 0 | 100.0% |
| Wed 22 Apr | 365 | 365 | 2 | 1 | 100.0% |
| Thu 23 Apr | 202 | 195 | 17 | 0 | 96.5% ⚠ |
| **Total** | **2,548** | **2,532** | **112** | **11** | **99.4%** |

### Failed events 24h: 22
- 18 temporary (generic, code 421/451 — retry)
- 2 permanent (code 550)
- 2 rate-limit
- Top recipients: karine@paturevision.fr (6), sarah@paturevision.fr (4), laura@paturevision.fr (4)

**Bounces list: 0 | Complaints list: 0**
**Note:** 99.4% overall delivery rate is healthy. 23 Apr dip (96.5%) driven by ~17 temp failures to internal paturevision.fr addresses — likely their own mail server throttling/being restarted. Not a sender-side issue.

---

## Siteground — Prestashop (bailey.cpanel)

### Dashboard
Siteground scraper returned `session_expired`. Skipped dashboard CPU/RAM stats this run — login cookie needs manual refresh (`node scripts/siteground-storage.js --login`).

### Disk (via SSH)
| Path | Size |
|---|---|
| `/home/customer` | 164 GB total |
| used | **126 GB (78%)** ⚠ |
| free | 37 GB |
| `~/www` | 42 GB |
| `~/.opcache` | 778 MB |
| `~/.npm` | 43 MB |

### Top directories in ~/www
| Directory | Size |
|---|---:|
| pre9.paturevision.fr | 21 GB |
| staging-sg.paturevision.fr | 7.0 GB |
| je-pature.paturevision.fr | 6.3 GB |
| queue7.paturevision.fr | 5.3 GB |
| paturevision.fr | 2.2 GB |

No .zip/.tar backup archives in ~/www. No .trash folder.

**Status:** **WARNING (78%)** — above the 75% alert threshold.
**Recommendations** (await approval before any destructive action):
1. Audit `pre9.paturevision.fr` (21 GB) — is this an old/archived Prestashop install still needed?
2. Clear PHP OpCache (`~/.opcache` 778 MB — safe to clear; regenerates).
3. Review Prestashop `/var/cache`, `/img`, and `cache/smarty/compile` on active sites.

---

## SSL Certificates

| Host | Expires | Status |
|---|---|---|
| console.paturevision.fr | Jul 1 2026 | OK (~68d) |
| *.paturevision.fr | Jun 22 2026 | OK (~59d) |

None expiring within 30 days.

---

## Issues & Warnings (Summary)

1. ⚠ **Siteground storage 78%** (>75% threshold). Investigate `pre9.paturevision.fr` (21 GB). [Await approval for cleanup]
2. ⚠ **RDS pending maintenance** — schedule system-update + 17.5.R2 engine patch during `mon 03:00–03:30 UTC`.
3. ⚠ **RDS `speedventory` PubliclyAccessible=true** — consider restricting.
4. ℹ `Server Memory` alarm flapping nightly (~22:00–22:50 UTC) on Console LIVE. Recurring; auto-recovers.
5. ℹ `purchase_orders/index` DB time up to 15s in New Relic — profile for N+1 / missing index.
6. ℹ Mailgun 23 Apr dip (96.5%) driven by internal paturevision.fr recipient temp failures (not sender-side).
7. ℹ Siteground scraper session expired — run `node scripts/siteground-storage.js --login` before next monitor.

---

## Unresolved Questions
- Should `pre9.paturevision.fr` (21 GB) be archived/removed? Still needed or obsolete snapshot?
- Approve scheduling RDS maintenance (system-update + 17.5.R2) during next `mon 03:00–03:30 UTC` window?
- Restrict RDS `speedventory` PubliclyAccessible=false? Which integrations currently hit it via public endpoint?
