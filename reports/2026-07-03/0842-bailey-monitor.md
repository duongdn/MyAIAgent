# Bailey Monitor — 03/07/2026 08:42

Note: a partial run already produced `0205-bailey-monitor.md` and posted to Slack #maintenance at 02:17+07 today. This run re-verifies all sources with fresh data and completes remaining subtasks (task log, Trello) that the earlier run left undone.

## Subtask 1: CloudWatch — Bailey (eu-west-3)

### Alarms (current state)
| Alarm | State |
|-------|-------|
| RDS Storage | OK |
| Server CPU | OK |
| Server CPU 2 | OK |
| Server Disk Available | OK |
| Server Memory | OK |
| Server Memory 2 | OK |
| Server Swap Usaged | OK |
| Server Swap Usaged 2 | OK |
| Storage Staging Server | OK |
| Storage staging server Pre | OK |

**All alarms currently OK.** No ALARM / INSUFFICIENT_DATA states.

### Recent Alarm History (14d)
- **Server Memory** (i-097f6eee5762c82f3): recurring nightly cycle ALARM (>90%) ~22:00–01:00 UTC, resolves by ~01:00 UTC every day for the full 14d window. Confirmed via metric trend: 13% baseline climbing to 97% peak around 22:00–00:00 UTC, dropping back to ~13% after. Consistent daily pattern, not worsening.
- **Server Swap Usaged**: occasional flaps late June, resolved.
- **Server CPU**: no alarm this window.

### Issues
- **WARNING (recurring, known)**: Server Memory nightly spike to ~97% (threshold 90%), self-resolves. Same pattern flagged in prior reports — likely a nightly batch/cron job. Not worsening; no action taken beyond monitoring.

---

## Subtask 2: AWS Health & EC2/RDS Events

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

eu-west-2: 0 instances

### RDS Events (14d)
All routine daily automated snapshot create/finish events for `speedventory` (eu-west-3), no failures. eu-west-2: none.

### RDS Pending Maintenance
- `speedventory` (eu-west-3): **system-update** (OS patch) + **db-upgrade** (engine patch 17.5.R2) pending, no auto-apply scheduled.
  - **Effect**: brief downtime during maintenance window when applied.
  - **Recommendation**: schedule in next maintenance window (low urgency, routine patch).
  - **Action needed**: Yes, but not urgent — plan a window.
- eu-west-2: none pending.

---

## Subtask 3: Billing Review

| Service | Jul MTD (2d) | Jun (full month) |
|---------|--------------|-------------------|
| EC2 - Other | $3.30 | $80.35 |
| EC2 Compute | $2.03 | $33.96 |
| Amazon VPC | $0.93 | $18.00 |
| Tax | $1.33 | $28.56 |
| RDS | $0.21 | $5.21 |
| S3 | $0.20 | $2.58 |
| CloudWatch | $0 | $2.40 |
| **Total MTD** | **$7.99** | **$171.35** |

### Daily trend
- Jul 1: $5.97 (includes monthly tax accrual — normal)
- Jul 2: $2.02

### Assessment
No anomalies. Day-2 run-rate (~$2/day) projects well under June's total; no service shows a >50% cost increase. Tax accrual on the 1st is expected, not a spike.

---

## Subtask 4: RDS Monitoring (speedventory)

### Instance Config
| Field | Value | Assessment |
|-------|-------|-----------|
| Engine | PostgreSQL 17.5 | OK |
| Class | db.t4g.small | OK |
| MultiAZ | False | No automatic failover — known standing config |
| PubliclyAccessible | True | Known standing config |
| AutoMinorVersionUpgrade | False | Manual upgrades required — see pending maintenance above |
| Storage | 20GB gp3, ~17GB free (85%) | OK |
| CA Cert | rds-ca-rsa2048-g1 | Valid till 2027-06-08 — OK |

### Metrics (1h current vs 24h baseline)
| Metric | Current (1h avg/max) | 24h avg/max |
|--------|----------------------|-------------|
| CPUUtilization | 3.5% / 5.2% | 6.8% / 92.6% (backup-window spike) |
| FreeableMemory | 701MB / 705MB | 685MB / 717MB |
| FreeStorageSpace | 17.02GB | 17.02GB / 17.02GB |
| DatabaseConnections | 0.03 / 1 | 2.6 / 11 |
| ReadIOPS | 0.27 / 1.6 | 0.79 / 153 (backup spike) |
| WriteIOPS | 2.5 / 10.3 | 3.6 / 96 (backup spike) |
| ReadLatency | 0.17ms / 4ms | 0.24ms / 10ms |
| WriteLatency | 0.78ms / 4.3ms | 0.94ms / 39ms |
| SwapUsage | 16.6MB | 17.0MB / 20.5MB |
| DiskQueueDepth | 0.006 / 0.04 | 0.008 / 1.14 |

**Assessment**: All healthy. The 24h CPU/IOPS max spikes align with the 13:00 UTC daily backup window — expected, not a concern.

---

## Subtask 5: New Relic APM — Console LIVE

### Top transactions by DB time (24h)
Heaviest Sidekiq jobs: `UpdateProductSoldInMonthsJob` (1.46s DB), `SaveCurrencyRateJob` (1.44s DB), `UpdateOverallRankingJob` (0.74s DB x2), `ImportRoutingPlanJob` (0.26s DB) — all single/low-frequency background jobs, not user-facing.

### Errors by class (24h)
| Error | Count | Note |
|-------|-------|------|
| ActiveRecord::RecordNotFound | 52 | Stale order IDs, low severity |
| ActiveJob::DeserializationError | 15 | Missing ShippingLabel record |
| ActionController::BadRequest | 4 | Invalid UTF-8 in query params |
| NoMethodError | 1 | nil.orders |
| OpenURI::HTTPError | 1 | 404 upstream |
| RuntimeError (PG deadlock) | 1 | Deadlock updating `products.booked_qty`/`available_qty` — isolated occurrence |
| ActiveRecord::NotNullViolation | 1 | null `quantity` on picking_location_products |
| OpenSSL::SSL::SSLError | 1 | TLS handshake failure (transient) |

### Hourly error rate / throughput (24h)
Mostly 0–0.2% with the expected small-sample noise at low-traffic hours (e.g., a 4.9–6.3% "spike" at hours with only 8–32 total requests — not meaningful). No sustained elevated error rate during business hours.

### Slow DB queries (spans, 24h)
Top by avg duration: `UPDATE products.minimum_stock` (8.6ms avg, 2x), `UPDATE products.supplier_product_code` (3.7ms avg, 10x), `UPDATE products.supplier_product_price` (2.7ms avg, 8x) — all sub-30ms even at max, no queries exceeding the 1s threshold.

**Assessment**: Healthy. One isolated PG deadlock worth watching if it recurs; no other action needed.

---

## Subtask 6: Mailgun — mail.paturevision.fr

### 14-day delivery stats
Volume ramped from ~14/day (Jun 20) to ~250/day (Jul 1) as usage grew. Delivery rate consistently ~96–100%; Jul 1: 246/250 delivered (98.4%), Jul 2: 191/192 (99.5%).

### Failed events (24h, 50 sampled — limit reached)
All 50 sampled failures are `temporary` / reason `generic`, code 421, addressed to two internal mailboxes: `sarah@paturevision.fr` and `laura@paturevision.fr`. Root cause: recipient's anti-spam gateway (`mailspamprotection.com`) doing local verification rejection — a recipient-side issue, Mailgun auto-retries (retry-seconds: 900). Not a sender reputation or IP block problem.
- Bounces/complaints API endpoints returned `unauthorized` — this API key's scope doesn't include those endpoints (not an auth expiry, a permission-scope limitation).

**Assessment**: OK overall (delivery rate well above 95% threshold). Recurring temporary rejection to 2 internal addresses is a client-side spam-filter tuning item, not our infra fault — noted for awareness only.

---

## Subtask 7: Siteground Storage

- Siteground dashboard browser session expired (`SESSION_EXPIRED`, needs interactive `--login` re-auth — cannot complete headlessly).
- Fallback via SSH `du -sh` on `~/www`: total 31GB used. Largest sites: `pre9.paturevision.fr` (14GB), `je-pature.paturevision.fr` (7.4GB), `staging-sg.paturevision.fr` (7.0GB), `paturevision.fr` (2.2GB). No stray `.zip`/backup files found to clean up.
- `df`/`quota` commands unavailable in the restricted shell — no total quota/percentage available this run.

**Assessment**: No alarms or evidence of an issue; treating as OK per safe-default policy. Dashboard re-auth needed next time an interactive session is available.

---

## SSL Certificates
| Domain | Expiry | Status |
|--------|--------|--------|
| console.paturevision.fr | Aug 30 08:31:10 2026 GMT | OK (~58d) |
| paturevision.fr | Aug 21 14:12:39 2026 GMT | OK (~49d) |

---

## Subtask 8: Slack #maintenance post
Already sent by the earlier partial run today at 02:17+07 (message content matches this run's findings — no discrepancies). Skipped re-posting to avoid duplicate send.

## Subtask 9: Task log
Written to Paturevision sheet, tab `W34`, row 69: `Weekly Monitor Jul 2026`, Owner DuongDN, 1h (Actual + Charged).

## Subtask 10: Trello
Checklist `03/07/2026` created on card "Bailey monitor", all 9 items marked complete, card marked done.

---

## Summary

| Item | Status | Notes |
|------|--------|-------|
| CloudWatch Alarms | OK | All alarms OK now |
| Server Memory | WARNING (recurring) | Nightly spike to ~97%, self-resolving daily — known pattern |
| EC2/RDS Events | OK | No scheduled events; backups all succeeded |
| RDS Maintenance | WARNING (low urgency) | OS + engine patch pending on speedventory — schedule a window |
| Billing | OK | $7.99 MTD, no anomalies |
| RDS speedventory | OK | All metrics healthy |
| New Relic APM | OK | 1x isolated PG deadlock; no slow queries or elevated error rate |
| Mailgun | OK | 98–99% delivery; temp rejections to 2 internal addresses (client-side spam filter) |
| Siteground | OK (no data) | Dashboard session expired; SSH disk check shows no bloat |
| SSL | OK | 49–58 days remaining both domains |

## Unresolved questions
- Siteground dashboard session needs interactive re-login (`node scripts/siteground-storage.js --login`) to restore CPU/RAM/storage % — cannot be done headlessly.
- Mailgun API key lacks scope for `/bounces` and `/complaints` endpoints — confirm if broader key permissions are wanted.
- Nightly Server Memory spike to ~97% has been recurring for 2+ weeks — worth root-causing (likely a cron/batch job) if it should be considered more than cosmetic.
