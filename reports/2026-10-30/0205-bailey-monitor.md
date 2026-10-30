# Bailey Monitor — 30/10/2026 02:05

## CloudWatch — Bailey (eu-west-3)
- 10 alarms. 0 ALARM. 1 INSUFFICIENT_DATA: **Server CPU** (i-097f6eee5762c82f3 = old "Console LIVE").
- History 14d: Server CPU OK→INSUFFICIENT_DATA 10-27 02:11, back OK 10-28 04:33, INSUFFICIENT_DATA 10-28 04:51 → instance stopped (user-initiated 10-28 04:37 UTC). Expected with the Console migration — not an incident.
- ⚠️ Internal: alarms Server CPU / Memory / Swap / Disk Available still point at the stopped old LIVE instance → new "Console Production" (i-05b6a4aba88644660) has **no alarms**. Repoint alarms to new instance.

## AWS Health & Events
- EC2 scheduled events: none (eu-west-3, eu-west-2). eu-west-2 has no instances/RDS.
- Instances: Console LIVE (t3.large) **stopped**; running: Console Production, staging console, new staging console, staging pretashop (t3.medium), speedventory-redis (t3.small).
- RDS events: daily snapshots OK. 10-26 manual snapshot `speedventory-backup-before-update`; 10-27 01:34 manual snapshot `speedventory-backup-2026-10-27` → engine upgrade pre-check → shutdown → **speedventory now PG 18.4** (was 17.5). Planned maintenance.
- Pending maintenance:
  - speedventory: OS system-update only (engine patch done). Effect: short reboot ~5–10 min (Single-AZ). Recommend Mon 03:00–03:30 UTC window. Action: yes, not urgent.
  - speedventory-staging: OS update + engine patch 18.4.R2 — apply anytime.

## Billing
| Service | Oct MTD (to 28/10) | Sep full |
|---|---|---|
| EC2 - Other | $85.58 | $82.41 |
| EC2 Compute | $83.65 | $71.31 |
| RDS | $50.62 | $55.18 |
| Tax | $49.03 | $46.29 |
| VPC | $20.85 | $18.70 |
| CloudWatch / S3 / CE | $1.88 / $1.46 / $0.21 | $2.31 / $1.41 / $0.13 |
| **Total** | **$293.28** | **$277.74** |

- Daily: $8.3–8.6 flat to 20/10; 21–26/10 ~$10.1/day (old LIVE + new Console Production running in parallel during migration); 27–28/10 $7.65–7.86 after old LIVE stopped. 01/10 $57.47 = tax accrual (normal).
- Oct already > Sep total because of migration overlap; no service >50% up. No anomaly. Expect lower Nov run-rate (~$7.7/day).

## RDS — speedventory
| Config | Value | Assessment |
|---|---|---|
| Class / engine | db.t4g.small / PG **18.4** | ok (upgraded 10-27) |
| MultiAZ | false | ⚠️ internal only |
| PubliclyAccessible | true | ⚠️ internal only |
| AutoMinorVersionUpgrade | false | ⚠️ manual patching |
| Storage | 20GB (max 100), 16.9GB free | ok |
| Cert | valid until 2027-06-08 | ok |
| Pending mods | none | ok |

| Metric | 1h avg/max | 24h avg/max | 14d avg/max |
|---|---|---|---|
| CPU % | 3.8/5.1 | 4.8/17.8 | 6.6/94.3 |
| FreeableMemory | 600/612MB | 598/641MB | 583MB/1.1GB |
| Swap | 4MB | 4MB | 36/67MB |
| Connections | 3.8/10 | 4.5/11 | 5.7/20 |
| Read/Write IOPS | 0.3/2.5 | 1.7/2.8 (max 1108/65) | max 1113/140 |
| Read/Write latency | 0.1/1.1ms | 0.2/1.0ms | max 20/47ms |
| DiskQueueDepth | 0.01 | 0.01 (max 5.3) | max 5.3 |

- Healthy post-upgrade. Swap dropped 43MB → 4MB (restart cleared). Nightly CPU burst gone from last 24h (max 17.8%).

## New Relic APM — Console LIVE
- 24h: 99,909 txns, error rate **0.12%** (was 5.4%).
- ✅ **RuntimeException (staging prestashop2-new PHP7.2/Composer): 0 in 24h** — gone after 6 weeks (likely old server stop / staging cleanup).
- Errors 24h: RecordNotFound 61 (Order 45195), ArgumentError 14 ("given 5, expected 4" — new, likely post-upgrade code mismatch), DeserializationError ShippingLabel 6, BadRequest 4, InvalidAuthenticityToken 3, RuntimeError 3 (`movements` undefined on Order), NoMethodError `orders` nil 2. ECONNREFUSED port 25 and Redis DNS errors from last week **no longer present**.
- Slow DB: products/edit max DB 37s (64 calls, avg 2.0s), products/quick_modify_show max 27s (avg 2.3s), api/v1/products/create avg 3.9s. Rest of controllers <0.6s avg.
- Hourly traffic: bursty 14k–36k per 3h during day; error % ≤0.17 except last 3h window 0.93% on low volume (1.8k).

## Mailgun — mail.paturevision.fr
- 14d: 1,430 accepted, 1,419 delivered, 11 permanent fails → **99.23%**.
- Failed 24h: isa.jule@orange.fr ×3 — invalid recipient 5.1.1 then suppressed ("previously bounced"). Bad address, no action. La Poste spam rejections from last week not repeated.

## Siteground (SSH)
- df /home/customer: 175.27GB size, 141.37GB used → (141.37−10.61)/175.27 = **74.6% → WARNING** (73.1% last week, +1.5pt).
- ~/www: pre9 17G (was 15G — still growing ~+2G/wk), je-pature 9.0G, staging-sg 4.1G, live 2.2G, staging-je-pature 429M. No zips.
- Scraper skipped (known CAPTCHA).

## SSL
- Console: Jan 24 01:25:02 2027 GMT (renewed, new server) — 86 days
- Prestashop: Dec 19 12:28:50 2026 GMT — 50 days

## Slack Post — ✅
- GGS #maintenance ts `1793300806.980669`. Prestashop storage WARNING (75%) with explanation; everything else OK; billing $293.28 MTD; Mailgun 99.2%; SSL dates.
- Context: #maintenance 21–22/10 — customer testing prelive2.console (Console migration), domain swap followed; PHP CVE handled by Siteground.

## Workstream Task Log — ✅ DONE
- speedventory 2026-10-30 (Fri) "Weekly Monitor October 2026" 1:00, id `cmvtx094d13g5ru1yrl7a4g1j`.

## Trello Checklist — ✅ DONE
- Card `6ae38a0977e9abd4428a7371`: checklist "30/10/2026" 9/9 complete, dueComplete true.

## Unresolved / follow-up
**Recheck 09:02:** all 10 subtasks already ✅ (Slack, Workstream, Trello done at 02:05) — nothing to re-run. Items below are human follow-ups, not failed subtasks.
- 🟡 CloudWatch alarms still target stopped old Console LIVE; new Console Production unmonitored → repoint alarms. Decide whether to terminate old LIVE instance (EBS still billed under EC2-Other).
- ⚠️ Siteground storage 74.6%, pre9 +2G/week; staging cleanup still pending.
- 🟡 New ArgumentError (14/24h) + RuntimeError `movements` on Order after migration — dev check.
- 🟡 Slow products/edit (max 37s DB) — check after PG18 upgrade (ANALYZE run?).
- RDS: OS update pending speedventory; staging OS + 18.4.R2.
