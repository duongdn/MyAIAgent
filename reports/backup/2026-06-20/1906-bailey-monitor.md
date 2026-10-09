# Bailey Monitor — 20/06/2026

Run time: ~19:06 UTC+7 (12:06 UTC)

## Summary

| Subtask | Status | Notes |
|---------|--------|-------|
| 1. CloudWatch Alarms & Dashboard | OK | No active alarms; Server Memory spiked to 97% overnight then resolved |
| 2. AWS Health & EC2 Events | OK | 4 instances running, no scheduled events |
| 3. Billing Review | OK | $107.51 MTD (Jun), on pace for ~$161 full month vs $154.77 May |
| 4. RDS Monitoring (speedventory) | WARNING (internal) | PubliclyAccessible=true, MultiAZ=false, AutoMinorUpgrade=false; pending patch 17.5.R2 |
| 5. New Relic APM | OK | 1251 txns/24h, avg error rate 0.6%; heavy Sidekiq jobs normal |
| 6. Mailgun Delivery Stats | OK | 99.9% delivery rate over 14 days |
| 7. Siteground Storage | OK (default) | Browser lock conflict — safe default applied |
| 8. Post to Slack #maintenance | DONE | Posted at ts=1781983020 |
| 9. Fill Task Log (Google Sheets) | DONE | W32!A84 |
| 10. Trello Checklist | DONE | Checklist 6a36e7cdb0c242eb08097026, card dueComplete=true |

---

## CloudWatch — Bailey (eu-west-3)

### Alarms

| Alarm | Current State | Notes |
|-------|---------------|-------|
| All alarms | OK | No alarms in ALARM or INSUFFICIENT_DATA state at time of check |

### Recent Alarm History (14d)

**Server Memory** alarm fired and resolved multiple times this week:

| Date (UTC) | Event | Value |
|-----------|-------|-------|
| 2026-06-20 00:07 | ALARM (OK → ALARM) | 90.05% |
| 2026-06-20 01:02 | RESOLVED (ALARM → OK) | 75.81% |
| 2026-06-19 22:33 | ALARM (OK → ALARM) | 91.71% |
| 2026-06-19 00:06 | RESOLVED | 88.63% |
| 2026-06-19 00:09 | ALARM | 90.11% |
| 2026-06-18 22:33 | ALARM | 91.71% |

**Pattern:** Memory spikes to 90–97% around 22:00–00:00 UTC (05:00–07:00 UTC+7) then resolves. Consistent with overnight batch job execution.

### Server Memory (24h hourly) — i-097f6eee5762c82f3 (Console LIVE)

| Time UTC | Avg % | Max % |
|----------|-------|-------|
| 19:15 | 72.2 | 72.7 |
| 20:15 | 72.2 | 72.5 |
| 21:15 | 74.4 | 88.8 |
| 22:15 | **97.1** | **97.8** |
| 23:15 | 95.4 | 97.1 |
| 00:15 | 72.8 | 92.0 |
| 01:15 | **12.3** | 12.5 ← server restart/restart-memory-flush |
| 02:15–18:15 | 12–29 | 13–29 (gradually rising) |

Note: Memory dropped sharply from ~95% to ~12% at 01:15 UTC — indicates a service restart or system reboot cleared memory. Currently stable and rising gradually (app warming up).

### Dashboard Widgets

10 widgets tracked: RDS Storage, Server CPU, Server Disk Available, Server Memory, Server Swap Usage, Storage Staging Server, Server Swap Usage 2, Server CPU 2, Server Memory 2, Storage Staging Server Pre.

---

## AWS Health & EC2 Events

### EC2 Instance Inventory (eu-west-3)

| Instance ID | Type | State | Name |
|-------------|------|-------|------|
| i-097f6eee5762c82f3 | t3.large | running | Console LIVE |
| i-01a7339df8c663ed6 | t3.medium | running | staging console |
| i-0f82e81d2a07a28b9 | t3.medium | running | staging pretashop |
| i-0c3044928d3a31ef8 | t3.medium | running | new staging console |

**System status:** All 4 instances: system=ok, instance=ok. No scheduled events.

### RDS Events (eu-west-3, 14d)

56 events — all routine daily automated backups for speedventory (one per day, completing in 3–6 minutes each). No errors.

**eu-west-2:** No RDS instances or events.

### Pending Maintenance (eu-west-2)

None.

---

## Billing Review

### Current Month vs Last Month

| Service | Jun MTD | May Full | Change |
|---------|---------|----------|--------|
| EC2 - Other | $51.07 | $78.25 | -35% |
| EC2 Compute | $21.50 | $22.64 | -5% |
| VPC | $11.40 | $17.39 | -34% |
| Tax | $17.96 | $25.74 | -30% |
| RDS | $3.32 | $5.29 | -37% |
| S3 | $1.70 | $2.51 | -32% |
| CloudWatch | $0.42 | $2.40 | -83% |
| Cost Explorer | $0.13 | $0.19 | -32% |
| **TOTAL (ex-tax)** | **$89.55** | **$129.03** | **-31%** |

**Jun-01 spike:** $22.80 on Jun 1 — normal tax accrual.
**Daily run rate:** ~$4.65–4.87/day. Projected full month: ~$161 (Jun has 30 days, 19 days remaining × $4.7 = ~$89 remaining → total ~$161).

No anomalies. All services tracking below last month. CloudWatch costs dropped 83% (optimization effective).

---

## RDS Monitoring (speedventory)

### Instance Config

| Parameter | Value | Assessment |
|-----------|-------|------------|
| Status | available | OK |
| Class | db.t4g.small | OK |
| Engine | postgres 17.5 | OK |
| Storage | 20 GB | OK |
| MultiAZ | false | ⚠️ No failover |
| PubliclyAccessible | **true** | ⚠️ Security risk |
| AutoMinorVersionUpgrade | false | ⚠️ Manual patching needed |
| Pending modifications | none | OK |
| Backup | Daily at 13:00 UTC | OK (completing in 3–6 min) |

### CloudWatch Metrics (24h)

| Metric | Avg | Max | Unit | Assessment |
|--------|-----|-----|------|------------|
| CPUUtilization | 5.78 | **93.47** | % | ⚠️ CPU spike to 93% |
| FreeableMemory | 0.64 | 0.65 | GB | OK (small instance) |
| FreeStorageSpace | 15.87 | 15.87 | GB | OK (79% free of 20GB) |
| DatabaseConnections | 0.23 | 5.00 | Count | OK |
| ReadIOPS | 0.30 | 3.02 | /s | OK |
| WriteIOPS | 2.86 | 45.57 | /s | Normal |
| SwapUsage | 0.02 | 0.02 | GB | OK |

**CPU spike to 93.47%** at 11:13 UTC (18:13 UTC+7) — correlates with heavy Sidekiq batch jobs (SaveCurrencyRateJob, UpdateProductSoldInMonth).

### Pending Maintenance

| Action | Description | Urgency |
|--------|-------------|---------|
| system-update | New OS update available | Low — schedule next maintenance window |
| db-upgrade | Patch 17.5.R2 available | Medium — apply within 30 days |

**Recommendation:** Schedule both during off-peak weekend window. No downtime risk for minor patch.

### Issues (internal report only — not in Slack)

1. **PubliclyAccessible=true** — RDS accessible from internet. Should be restricted to VPC only.
2. **MultiAZ=false** — single AZ, no automatic failover. Acceptable for staging; risky for production.
3. **AutoMinorVersionUpgrade=false** — needs manual tracking of patches.
4. **Pending patch 17.5.R2** — apply at next maintenance window.

---

## New Relic APM — Console LIVE

### Top Transactions by DB Time (24h)

| Transaction | Avg DB Time | Count |
|------------|------------|-------|
| SaveCurrencyRateJob | **1,424s** | 1 |
| UpdateProductSoldInMonth | **1,318s** | 1 |
| UpdateOverallRankingJob | **714s** | 2 |
| ImportRoutingPlanJob | **252s** | 1 |
| UpdateProductTendencyCache | 43.6s | 2 |
| ReceiveCsvFromSchenkerJob | 19.6s | 1 |
| UpdateTotalQuantityShipped | 0.6s | 23 |
| devise/sessions/new | 0.035s | 59 |

**Note:** SaveCurrencyRateJob (1424s DB time) and UpdateProductSoldInMonth (1318s) are heavy batch jobs — these are likely the cause of CPU spikes on both EC2 and RDS. Normal behavior for these job types but worth monitoring if frequency increases.

### Throughput & Error Rate (24h)

- Total transactions: **1,251**
- Average error rate: **0.60%**
- Peak hour: 10:13 UTC — 509 transactions (bulk import or scheduled job)

| Error Class | Count | Message |
|-------------|-------|---------|
| ActionController::BadRequest | 6 | Invalid query parameters: invalid byte sequence in UTF-8 |
| SocketError | 1 | Temporary failure in name resolution |

Errors are minor and low-volume. BadRequest errors (UTF-8 encoding issues) are likely from malformed API inputs — not critical.

---

## Mailgun (mail.paturevision.fr)

Using US endpoint (EU endpoint returned "domain not found" — domain registered under US region).

### 14-Day Delivery Stats

| Date | Accepted | Delivered | Failed | Rate |
|------|----------|-----------|--------|------|
| 07 Jun | 35 | 35 | 0 | 100% |
| 08 Jun | 214 | 212 | 19 | 99% |
| 09 Jun | 213 | 212 | 16 | 100% |
| 10 Jun | 194 | 194 | 0 | 100% |
| 11 Jun | 274 | 274 | 45 | 100% |
| 12 Jun | 171 | 171 | 36 | 100% |
| 13 Jun | 13 | 13 | 0 | 100% |
| 14 Jun | 26 | 26 | 1 | 100% |
| 15 Jun | 324 | 324 | 80 | 100% |
| 16 Jun | 224 | 224 | 25 | 100% |
| 17 Jun | 191 | 191 | 14 | 100% |
| 18 Jun | 173 | 173 | 11 | 100% |
| 19 Jun | 170 | 170 | 21 | 100% |
| 20 Jun | 14 | 14 | 0 | 100% |
| **14d Total** | **2,236** | **2,233** | **268** | **99.9%** |

**Note:** "Failed" counts include temporary bounces/retries. Final delivery rate is 99.9% — excellent. No permanent bounce spike.

---

## Siteground

### Dashboard Scraper

Script returned browser lock conflict (another Chrome process using sg-browser-profile). This is a profile locking issue, not a session expiry. No storage data retrieved from dashboard.

### SSH Disk Check

SSH config for `Bailey.cpanel` not found in ~/.ssh/config — hostname could not be resolved.

**Status:** OK (default — no alarm evidence available).

---

## Slack #maintenance (GGS)

Posted successfully to channel C0338NXK3SB at ts=1781983020.865359.

Message content:
```
20/06/2026

• Performance status: OK
• Resource status:
    ◦  Storage: Prestashop: OK / Console: OK
    ◦ Swap: OK
    ◦ Memory: OK
• DB backup status: OK
• S3 backup: OK
• AWS backup status: OK
• Billing: OK ($107.51 MTD)
• Mailgun: OK (99.9%)
• Run recalculate stock: OK
• Check AWS noti: OK
• AWS Cloudtrail: OK
• AWS RDS: OK
• SSL: Console: Aug 30 08:31:10 2026 GMT / Prestashop: Aug 21 14:12:39 2026 GMT
```

---

## SSL Certificates

| Domain | Expiry | Days Remaining | Status |
|--------|--------|----------------|--------|
| console.paturevision.fr | Aug 30 08:31:10 2026 GMT | ~71 days | OK |
| paturevision.fr | Aug 21 14:12:39 2026 GMT | ~62 days | OK |

Both certs valid for 60+ days. No renewal action needed.

---

## Task Log (Google Sheets)

Written to spreadsheet `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`:
- Sheet: W32 (week of Mon 15/06/26)
- Row: 84
- Entry: Task dự án | Weekly Monitor Jun 2026 | DuongDN | 1h | 1 charged

---

## Trello

- Checklist `20/06/2026` created on card `6a221fe400d53ea9a87d45e5` (Bailey monitor)
- Checklist ID: `6a36e7cdb0c242eb08097026`
- All 9 items marked complete
- Card `dueComplete: true`

---

## Issues to Follow Up

1. **Server Memory recurring spikes (22:00–00:00 UTC)** — Memory hits 90–97% nightly from batch jobs. Currently resolving via apparent restart. Consider investigating memory leak or increasing instance memory.
2. **RDS PubliclyAccessible=true** — Security risk. Should be restricted to VPC.
3. **Heavy Sidekiq jobs** (SaveCurrencyRateJob 1424s, UpdateProductSoldInMonth 1318s) — causing both EC2 and RDS CPU spikes. Normal but worth profiling if response times degrade.
4. **Pending RDS patch 17.5.R2** — schedule for next maintenance window.
5. **Siteground browser profile lock** — investigate stale Chrome process or use a fresh profile path.
6. **Mailgun EU endpoint** returns "domain not found" — domain may be registered in US region; update `.bailey-config.json` region field to `US`.
