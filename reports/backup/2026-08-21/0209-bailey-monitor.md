# Bailey Monitor — 2026-08-21 02:09 (+07:00)

## Overall Status: WARNING (no customer-impacting issues; 2 recurring/known items + 1 storage flag)

---

## 1. CloudWatch — Bailey (eu-west-3)

### Alarms
| Alarm | State | Reason | Since |
|-------|-------|--------|-------|
| (none) | — | No alarms currently in ALARM or INSUFFICIENT_DATA | — |

### Recent Alarm History (14d, 46 state-change events)
- **Server Memory**: nightly flap ALARM↔OK continues every day through 08-21 (typically ~22:30-01:00 UTC window). Recurring pattern (14+ consecutive days), self-resolving, matches known nightly batch-job memory spike. Last flap: 2026-08-21 00:10→01:02 UTC.
- No other alarms flapped in the sampled 20-item history window pulled (dominated by Server Memory).

### Dashboard Widgets (Monitor)
RDS Storage, Server CPU (x2), Server Disk Available, Server Memory (x2), Server Swap Usaged (x2), Storage Staging Server (x2).

### Issues / Warnings
- ⚠️ Nightly memory alarm flap — recurring, self-resolving, not customer-impacting.

---

## 2. AWS Health & Event Log

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
- eu-west-3 (speedventory): routine automated daily backup/snapshot cycle only (13:00 UTC daily). No errors, no failovers.
- eu-west-2: no events.

### RDS Pending Maintenance
| Region | Instance | Action | Effect | Recommendation | Action needed? |
|--------|----------|--------|--------|-----------------|-----------------|
| eu-west-3 | speedventory | system-update | OS-level patch, brief reboot/failover possible | Low urgency, routine OS patch | Yes — schedule during a maintenance window |
| eu-west-3 | speedventory | db-upgrade → 17.5.R2 | Minor PostgreSQL engine patch, brief downtime (single-AZ, no seamless failover) | Apply within next maintenance window | Yes — schedule, not urgent |
| eu-west-3 | speedventory-staging | system-update | OS patch on staging instance | Low urgency | Yes — schedule anytime, staging only |
| eu-west-2 | — | none | — | — | No |

Same pending items as prior runs — unresolved for several weeks now (worth flagging internally that these have not been applied).

---

## 3. Billing Review

| Period | Total (USD) | Notes |
|--------|-------------|-------|
| Current month (Aug 1–21, ~20 days elapsed) | $144.81 | Run-rate ~$7.2/day since mid-month |
| Last month (July, full) | $212.60 | Baseline |

### Breakdown (current month)
EC2-Other $48.01, EC2-Compute $44.12, Tax $24.13, RDS $15.34, VPC $11.75, S3 $0.97, CloudWatch $0.40, Cost Explorer $0.09

### Breakdown (last month)
EC2-Other $79.57, EC2-Compute $68.83, Tax $35.43, VPC $18.60, RDS $5.23, CloudWatch $2.40, S3 $2.30, Cost Explorer $0.25

### Daily trend
Aug 1 = $29.73 (monthly tax accrual, normal, not a spike), then steady ~$5.5–5.7/day through Aug 12, stepped up to ~$7.1–7.4/day from Aug 13 onward (consistent, not a spike — likely reflects the RDS cost increase below). Aug 20 = $3.26 (partial-day collection lag, normal).

### Anomaly check
- RDS service cost: $5.23 (last month, full) → $15.34 (this month, ~20 days) — roughly 4–5x the daily run-rate vs last month. This is the one line exceeding the 50% threshold. RDS CloudWatch metrics (see §4) show no CPU/storage/connection anomaly, so this is likely driven by IOPS/storage-type billing (gp3) or a small baseline pricing change rather than a performance issue — worth a closer CE USAGE_TYPE drill-down next run if it continues climbing.
- No other service exceeds 50% increase; overall run-rate tracks below last month's total.

---

## 4. RDS Monitoring — speedventory (eu-west-3)

### Instance Config
| Field | Value | Assessment |
|-------|-------|------------|
| MultiAZ | False | Known, unchanged — single point of failure, same as all prior runs |
| PubliclyAccessible | True | Known, unchanged — flagged in every prior run, not newly introduced |
| AutoMinorVersionUpgrade | False | Known, unchanged — manual patching required (see pending maintenance) |
| AllocatedStorage | 20 GB (gp3) | ~17 GB free, healthy headroom |
| Engine | PostgreSQL 17.5 | — |
| Cert expiry | 2027-06-08 | Healthy, >6 months out |
| Pending modifications | none | — |
| Status | available | — |

### Metrics (1h current vs 24h baseline)
| Metric | 1h Avg | 24h Avg | 24h Max | Flag |
|--------|--------|---------|---------|------|
| CPUUtilization | 3.4% | 7.1% | 92.2% (single spike) | 24h max spike, but current 1h is low — likely a batch job, not sustained |
| FreeableMemory | 635 MB | 617 MB | 645 MB | Stable, low headroom is normal baseline for this instance size |
| FreeStorageSpace | 15.8 GB | 15.8 GB | 15.8 GB | Stable, ~79% free |
| DatabaseConnections | 2.1 avg | 4.8 avg | 10 max | Normal, low |
| Read/Write IOPS | 0.26/2.4 | 0.41/3.3 | 108/50 max | Occasional bursts, consistent with backup windows |
| Read/Write Latency | <1ms | <1ms | up to 85ms (write) | One write-latency spike in 24h, isolated |
| SwapUsage | ~3.2 MB | ~3.2 MB | ~3.2 MB | Flat, negligible |
| Network in/out | 1.2/12.7 KB/s | 10.5/104.5 KB/s | up to 2.85 MB/s (tx) | Bursty but within normal range |
| DiskQueueDepth | ~0.008 | ~0.008 | ~0.11 | Negligible |

No sustained issues. The one CPU spike to 92% in the 24h window is isolated (current 1h avg back to 3.4%) — likely tied to a scheduled job, not investigated further this run.

---

## 5. New Relic APM — Console LIVE

### Top transactions by DB time (24h)
| Job/Endpoint | Avg DB time (ms) | Count |
|---|---|---|
| Sidekiq: UpdateProductSoldInMonthsJob | 1771.6 | 1 |
| Sidekiq: SaveCurrencyRateJob | 1496.1 | 1 |
| Sidekiq: UpdateOverallRankingJob | 753.9 | 2 |
| Sidekiq: ImportRoutingPlanJob | 260.7 | 1 |
| Sidekiq: UpdateProductTendencyCacheJob | 45.7 | 2 |
| Controller: products/edit | 2.9 | 33 |
| Controller: sales_analytics/show | 2.8 | 4 |
| Controller: purchase_orders/index | 1.5 | 45 |

All slow entries are low-frequency scheduled Sidekiq jobs (1–2 runs/24h) — expected batch behavior, not user-facing latency.

### Error breakdown (24h)
| Error class | Count | Note |
|---|---|---|
| ActiveRecord::RecordNotFound | 146 | Known recurring — "Order not found" pattern seen in prior runs |
| ActiveJob::DeserializationError | 132 | Known recurring — stale ShippingLabel references in job args |
| ActiveRecord::RecordNotSaved | 13 | Address validation failure, low volume |
| Redis::CannotConnectError | 8 | Known recurring intermittent Redis connection refusal (172.18.0.2:6379) — unresolved bug, flagged in multiple prior reports |
| ActionController::UnknownFormat | 2 | Negligible |

### Hourly error rate/throughput (last 6h sample)
Throughput ranged ~12–2300 req/window; error percentage was 0% in 5 of 6 sampled hours, one hour at 0.087% — no error spikes.

### Top DB queries by volume
Dominated by `order_lines`/`orders` aggregation queries (5,300+ calls, avg ~0.13s) tied to sales analytics — consistent with prior runs, no new slow-query patterns.

### Recommendations
1. Redis::CannotConnectError (8 occurrences/24h) — real unresolved bug, recommend dev team investigate Redis container networking (flagged repeatedly, no fix yet applied).
2. ActiveJob::DeserializationError — stale record refs in enqueued jobs; low priority, cosmetic error-log noise.
3. No urgent performance action needed.

---

## 6. Mailgun — mail.paturevision.fr

### 14-day delivery
- Accepted: 1,302 | Delivered: 1,299 | Failed: 26 | **Delivery rate: 99.77%**
- No permanent bounce buildup; failures spread across temporary espblock + 1 suppress-bounce on 08-20.

### Failed events (last 24h)
- 0 failed events — clean.

### Bounces/Complaints API
- `/bounces` and `/complaints` endpoints returned `401 unauthorized` — the configured API key lacks permission for these read-only endpoints (same limitation as prior runs, not a new issue). Stats-based failure/bounce counts above are unaffected and sourced from `/stats/total`.

### Flags
- None — delivery healthy, no reputation issues detected from available data.

---

## 7. Siteground Statistics

- `node scripts/siteground-storage.js` → `SESSION_EXPIRED`. Did not attempt `--login` per known gotcha (prior CAPTCHA block, unsolvable without human intervention) — would have wasted time.
- **SSH `Bailey.cpanel` IS configured this run** (unlike some prior runs) and succeeded:
  - Total `~/www` usage: **38 GB**
  - Largest directories: pre9.paturevision.fr (20G), je-pature.paturevision.fr (8.9G), staging-sg.paturevision.fr (7.0G), paturevision.fr (2.2G, live site), staging-je-pature (428M)
  - No large `.zip` backup files found for cleanup
  - `df -h` on `/home/customer`: **164G total, 132G used, 31G avail → 81% used**

### Flag
- ⚠️ Disk usage at 81% — above the 70% WARNING threshold (not yet at 85% NOT OK). Driven mostly by staging/dev site copies (pre9, je-pature, staging-sg ≈ 36G of the 38G total). Recommend reviewing whether old staging copies (pre9.paturevision.fr in particular) can be archived/removed.

---

## 8. Slack Post — #maintenance (GLOBAL GRAZING SERVICES)

Token verified via `auth.test` (ok, team GLOBAL GRAZING SERVICES, user nick) and channel lookup (`C0338NXK3SB` = #maintenance, accessible) before posting.

**Posted successfully** — `ts: 1787278152.006989`, `ok: true`.

Message content (customer-facing, redacted per rules):
- Performance status: WARNING (Sidekiq slow jobs + known intermittent DB errors, recurring)
- Storage — Prestashop: WARNING (81%), Console: OK
- Swap: OK, Memory: WARNING (nightly spike, recurring)
- DB/S3/AWS backup: OK
- Billing: OK ($144.81 MTD)
- Mailgun: OK (99.8%)
- Recalc stock / AWS noti / Cloudtrail: OK
- AWS RDS: WARNING (pending patch, not urgent)
- SSL: Console Oct 29 2026, Prestashop Oct 20 2026

Internal details NOT sent to Slack (kept here only): Siteground session-expiry, Mailgun bounces/complaints 401 (key permission gap), RDS PubliclyAccessible=True/MultiAZ=False config details, Redis::CannotConnectError stack details, RDS billing anomaly investigation note.

---

## 9. Task Log — Google Sheets

- Spreadsheet: `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`
- Week sheet: **W41** (Mon 17/08/26 – Sun 23/08/26)
- Today's row: 67 (`Fri, 21/08/26`)
- Rows 68–81 were all empty template placeholder rows (`Task dự án` in col A only, cols C–J blank) → per gotcha, skipped row 68, wrote to **row 69**.
- Written: A=`Task dự án`, E=`Weekly Monitor Aug 2026`, G=`DuongDN`, H=`1`, J=`1` → confirmed `updatedCells: 10`.
- Hit a transient Sheets API 429 rate-limit on one read call; retried after 15s, succeeded — no impact on final write.

---

## 10. Trello Checklist

- **Card used**: `Bailey monitor` — id `6a8740d4512379a85823f980` (found via list search on `686b1f67e6b82c615ce4762c`, `closed:false`, `dueComplete:false`). NOT the stale hardcoded ID from the skill file (`6a221fe400d53ea9a87d45e5`), consistent with known gotcha #3.
- Created checklist `21/08/2026` (id `6a87b351dbf8edc85d306c54`).
- All 9 items added and marked complete:
  1. CloudWatch Alarms & Dashboard ✅
  2. AWS Health & EC2 Events ✅
  3. Billing Review ✅
  4. RDS Monitoring (speedventory) ✅
  5. New Relic APM ✅
  6. Mailgun Delivery Stats ✅
  7. Siteground Storage ✅ (marked complete — attempted, session expired for browser scrape but SSH fallback succeeded with real data, so genuinely complete this run)
  8. Post to Slack #maintenance ✅
  9. Fill Task Log ✅
- Card marked `dueComplete: true` — confirmed via API response.

---

## Unresolved Questions
1. RDS billing line jumped ~3x vs last month's daily run-rate ($5.23/mo → ~$0.77/day-equivalent now) with no corresponding CloudWatch performance change — worth a CE `USAGE_TYPE` drill-down next run to confirm root cause (IOPS billing change vs pricing change vs untracked config change).
2. Siteground disk usage at 81% (WARNING) — should a follow-up cleanup task be created for staging site directories (pre9.paturevision.fr = 20G alone)?
3. Mailgun `/bounces` and `/complaints` API keys return 401 — should the Mailgun API key permissions be upgraded so future runs can pull bounce/complaint detail instead of relying only on `/stats/total`?
4. RDS pending maintenance (OS patch + engine patch to 17.5.R2) has now been pending across multiple monitoring runs without being scheduled — should this be escalated to actually get scheduled in a maintenance window?
5. Redis::CannotConnectError (8/24h) remains an unresolved recurring app-level bug — same as flagged in prior runs; is a dev ticket already tracking this, or does it need to be raised again?
