# Bailey Monitor — 2026-06-20 02:05 (+07)

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms (current state)
No alarms in ALARM or INSUFFICIENT_DATA state. All clear.

### Recent Alarm History (14d) — ⚠️ WARNING (recurring pattern)
- Server Memory alarm continues daily flapping pattern:
  - Jun 17: ALARM 00:08 UTC → OK 01:02 UTC
  - Jun 18: ALARM 22:33 UTC → OK 00:06 UTC Jun 19, then ALARM 00:09 UTC → OK 01:02 UTC
  - Pattern: daily spike ~22:30–00:09 UTC, resolves within ~1h
- This is the same recurring nightly pattern documented since Jun 13 (27+ flap events over 14 days). Memory climbs through the day, spikes >90% around 22:30–01:00 UTC, then clears. Suspected nightly scheduled job on top of an elevated baseline.
- No other alarms triggered (CPU, Disk, Swap all quiet).

### Dashboard
All widgets within normal bounds at time of check.

---

## 2. AWS Health & EC2 Events

- EC2 scheduled events: **none** (eu-west-2 + eu-west-3)
- EC2 inventory (eu-west-3): 4 running instances — Console LIVE (t3.large), staging console (t3.medium), staging pretashop (t3.medium), new staging console (t3.medium)
- RDS events (5 days): routine automated backups daily 13:00 UTC — all successful. Latest: Jun 19 13:03 UTC. ✓
- **RDS pending maintenance (speedventory):**
  - `system-update` — OS update available (low urgency)
  - `db-upgrade` — Postgres 17.5 → 17.5.R2 (minor patch, low urgency; apply next maintenance window)
- No pending maintenance in eu-west-2.

---

## 3. Billing Review

| Service | May 2026 (full) | Jun 2026 (Jun 1–19) | Jun projected |
|---|---|---|---|
| EC2 - Other | $78.25 | $48.42 | ~$76.5 |
| EC2 Compute | $22.64 | $20.37 | ~$32.2 |
| RDS | $5.29 | $3.15 | ~$4.97 |
| S3 | $2.51 | $1.63 | ~$2.57 |
| VPC | $17.39 | $10.80 | ~$17.0 |
| CloudWatch | $2.40 | $0.24 | ~$0.38 |
| Tax | $25.74 | $17.01 | ~$26.9 |
| **Total** | **$154.22** | **$101.62** | **~$160** |

- No service with >50% increase vs May. EC2 Compute slightly elevated but within normal variance.
- All trends normal — no anomalies, no investigation needed.

---

## 4. RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|---|---|---|
| Status | available | OK |
| Engine | Postgres 17.5 | pending minor patch 17.5.R2 |
| Class | db.t4g.small | OK |
| MultiAZ | false | ⚠️ pre-existing (no HA failover) |
| PubliclyAccessible | true | ⚠️ pre-existing (security flag) |
| AutoMinorVersionUpgrade | false | ⚠️ pre-existing (manual patches needed) |
| DeletionProtection | true | OK |
| StorageEncrypted | true | OK |
| Storage | 20GB alloc / 100GB max autoscale | OK |
| CA cert | rds-ca-rsa2048-g1 (valid to 2027-06-08) | OK |

### Metrics (current 1h vs 24h)
| Metric | 1h avg | 24h avg | 24h max | Assessment |
|---|---|---|---|---|
| CPUUtilization | 3.4% | 7.8% | 96.4%* | OK (spike is brief) |
| FreeableMemory | 689 MB | 670 MB | 699 MB | OK |
| FreeStorageSpace | 17.04 GB | 17.04 GB | 17.04 GB | OK (85% free) |
| DatabaseConnections | 0.08 | 2.6 | 10 | OK |
| ReadIOPS | 0.26 | 1.23 | 194* | OK (brief backup spike) |
| WriteIOPS | 2.5 | 3.3 | 57.6 | OK |
| ReadLatency | <0.1ms | <0.1ms | 78ms | OK |
| WriteLatency | 1ms | 1ms | 15ms | OK |
| SwapUsage | 16.8 MB | 16.1 MB | 17.1 MB | OK (minimal) |
| DiskQueueDepth | 0.006 | 0.006 | 0.064 | OK |

*CPU 96.4% and ReadIOPS 194 are brief spikes during backup window (13:00 UTC daily) — not sustained.

### Issues
Pre-existing config flags (MultiAZ/PubliclyAccessible/AutoMinorVersionUpgrade) — unchanged. No urgent action required.

---

## 5. New Relic APM — Console LIVE

### Errors (24h)
| Error class | Count | Note |
|---|---|---|
| ActiveRecord::RecordNotFound | 69 | "Couldn't find Order id=42888" — deleted before job ran |
| NameError | 28 | "uninitialized constant ActionMailer::MailDeliveryJob" — recurring Rails bug ⚠️ |
| ActiveJob::DeserializationError | 15 | "Couldn't find ShippingLabel id=9154" — deleted record |
| ArgumentError | 11 | "wrong number of arguments (given 5, expected 4)" |
| ActionController::BadRequest | 6 | Invalid UTF-8 query params |
| SocketError | 2 | DNS resolution failure (transient) |

⚠️ NameError (ActionMailer::MailDeliveryJob) recurring 28× — same bug reported this morning (39×). Trending down slightly but persists. Dev ticket recommended.

### Error rate / throughput (24h, hourly)
Mostly <1% error rate. Two elevated periods (low-traffic hours, likely batch/Sidekiq):
- ~32.75s avg duration, 96 txns, 8.3% error rate
- ~21.26s avg duration, 158 txns, 5.7% error rate

Not user-facing at those volumes; consistent with batch jobs running at night.

### Slow DB Transactions (>1s avg)
| Transaction | Avg DB time | Count | Max |
|---|---|---|---|
| Controller/purchase_orders/update_additional_fee | 7.3s | 1 | 6.3s |
| Controller/products/quick_modify_update | 4.2s | 62 | 10.9s |
| Controller/orders/show | 4.2s | 26 | 6.0s |

quick_modify_update (62 calls, 4.2s avg) is notable — moderate volume with slow DB. Worth optimizing if frequency grows.

---

## 6. Mailgun — mail.paturevision.fr

### 14-day Delivery Stats (Jun 6–19)

| Date | Accepted | Delivered | Perm failed | Rate |
|---|---|---|---|---|
| Jun 6 | 21 | 21 | 0 | 100% |
| Jun 7 | 35 | 35 | 0 | 100% |
| Jun 8 | 214 | 212 | 2 | 99.1% |
| Jun 9 | 213 | 212 | 1 | 99.5% |
| Jun 10 | 194 | 194 | 0 | 100% |
| Jun 11 | 274 | 274 | 0 | 100% |
| Jun 12 | 171 | 171 | 0 | 100% |
| Jun 13 | 13 | 13 | 0 | 100% |
| Jun 14 | 26 | 26 | 0 | 100% |
| Jun 15 | 324 | 324 | 0 | 100% |
| Jun 16 | 224 | 224 | 0 | 100% |

Overall 14-day delivery rate: **~99.8%** — above 99% threshold. ✓

Temporary failures are recipient-side antispam rejections (421 from mailspamprotection.com) — not a sender reputation issue.

Note: Bounces/complaints API endpoint returned `unauthorized` — API key lacks that scope. No action needed on our side.

---

## 7. Siteground Statistics

- Puppeteer session expired (Chrome singleton lock). Browser profile still not re-authenticated.
- Previous run (morning) noted CAPTCHA is required for re-auth — needs human to run: `DISPLAY=:1 node scripts/siteground-storage.js --login`
- SSH to Bailey.cpanel: hostname not resolving (`Name or service not known`) — SSH config may need updating.
- **Disk data unavailable this run.** Using Jun 19 morning disk data for reference:
  | Dir | Size |
  |---|---|
  | pre9.paturevision.fr | 20G |
  | staging-sg.paturevision.fr | 7.0G |
  | je-pature.paturevision.fr | 6.8G |
  | paturevision.fr (prod) | 2.2G |
  | staging-je-pature.paturevision.fr | 404M |
- Total ~36G in www root. Staging dirs dominate.

---

## 8. SSL Certificates

| Domain | Expires | Days left |
|---|---|---|
| console.paturevision.fr | Aug 30 08:31 UTC 2026 | ~71 days |
| paturevision.fr | Aug 21 14:12 UTC 2026 | ~62 days |

Both well above 30-day threshold. OK.

---

## Summary

- **Performance: WARNING** — No active alarms, but Server Memory continues daily flapping pattern (~22:30–01:00 UTC, 90%+ threshold). Pattern unchanged from previous weeks.
- **Resource: OK** — Disk (est. OK from prior run), Swap minimal, Memory within bounds.
- **DB backup: OK** — Daily automated snapshots running successfully.
- **S3 backup: OK** — Costs stable, no anomalies.
- **AWS backup: OK** — RDS backups clean, 2 pending minor maintenance items (low urgency).
- **Billing: OK** — $101.62 MTD (Jun 1–19), on pace for ~$160/month vs $154 May.
- **Mailgun: OK (99.8%)** — Excellent delivery rate.
- **Siteground: Unavailable** — session expired, needs CAPTCHA re-auth.
- **App errors: ⚠️** — NameError (ActionMailer::MailDeliveryJob) recurring 28×/24h — dev-side bug, not infra.

## Unresolved Questions
1. Memory flap pattern (nightly ~22:30–01:00 UTC) still recurring daily — has this been investigated? Should a fix be scheduled?
2. Siteground browser session needs manual CAPTCHA re-auth — when can a human run `DISPLAY=:1 node scripts/siteground-storage.js --login`?
3. `Bailey.cpanel` SSH hostname not resolving — has the server been moved/renamed?
4. `Controller/products/quick_modify_update` averaging 4.2s DB time (62 calls/24h) — worth a query optimization?
5. NameError `ActionMailer::MailDeliveryJob` still unresolved after multiple runs — dev ticket filed?
