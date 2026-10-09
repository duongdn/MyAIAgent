# Server Monitor — 2026-09-04 08:39 (+07:00)

## Bailey

Siteground step skipped permanently (memory: CAPTCHA unautomatable, user opted out 2026-08-28).

| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| Console (speedventory) | 52% | 6.6/7.7G (86%) | 246M/14G (2%) | 0.00/2 | OK |
| Staging (staging.console) | 56% | 2.3/3.8G (61%) | 306M/8G (4%) | 0.07/2 | OK |

Docker (Console): wms-nov_app, sidekiq, redis all Up.
Docker (Staging): console_new_app/sidekiq, console2_app/sidekiq, redis, mailcatcher, db — all Up.
Redis (Console): 123.75M used, peak 94.5%, 1931 keys db0 (+ misc dbs) — healthy.

**Trello: Bailey → complete**

## Elena — WordPress SamGuard

| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| samguard.co | 46% | 1.1/1.9G (58%... low buff/cache) | 12M/2G (1%) | 0.08/1 | OK |

MySQL + Apache running normally. Noted: `check-new-release` process spiked 80% CPU momentarily (Ubuntu release-upgrade checker, harmless).

**Trello: Elena → complete**

## Neural Contract — Contract Probe

| Server | Status |
|---|---|
| nc_staging (52.65.197.217) | **UNREACHABLE — SSH connection timed out** |

**ALERT:** Could not connect to Neural Contract staging within 10s timeout. Needs investigation (server down, SG/firewall change, or IP change).

**Trello: Neural Contract → left incomplete (alert)**

## Fountain

| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| Staging2 | 83% | 4.1/7.8G (53%) | 1.1G/4G (28%) | 0.11/4 | ⚠️ disk WARNING (70-85%) |
| Production | 45% | 2.5/7.8G (32%) | 2.5G/8G (31%) | 0.20/4 | ⚠️ swap WARNING (>10%, borderline 31%>30%→CRITICAL) |

Puma, Sidekiq, Next.js all running on both. Staging disk at 83% — approaching CRITICAL (85%); swap usage on both boxes elevated (staging 28%, prod 31% = CRITICAL per threshold table) but no OOM/crash signs, load avg low. Per server-safety memory: flagging only, no cleanup run — investigate disk breakdown before next report if trend continues.

**Trello: Fountain → complete** (no outage/crash, but flagging disk/swap trend below)

## Marcel (XID)

| Host | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| xid_sync_console | 66% | 13/15G | 22M/6G | 0.02/4 | OK |
| xid_app_backend | 32% | 548M/949M (58%) | 53M/2G | 0.00/2 | OK |
| xid_saas_backend | 66% | 519M/949M (55%) | 53M/2G | 0.16/2 | OK |
| xid_app_frontend | 56% | 604M/953M (63%) | 26M/2G | 0.00/2 | OK |
| xid_saas_frontend | 39% | 561M/949M (59%) | 50M/2G | 0.00/2 | OK |
| xid_app_backend.dev | — | — | — | — | unreachable (known dead, skip) |
| xid_sync_console.dev | — | — | — | — | unreachable (known dead, skip) |
| xid_sass_backend.dev / xid_saas_backend.dev | — | — | — | — | unreachable (known dead, skip) |

All 5 reachable production servers healthy. Dev boxes unreachable — consistent with prior known-dead status (not re-flagging, per skill note); if user wants these formally decommissioned from the check list, confirm.

**Trello: Marcel → complete**

## Rory (cPanel — GoDaddy shared hosting)

| Metric | Value | Limit | Status |
|---|---|---|---|
| Disk (du -sh ~) | 13G | 50G | OK (26%) |
| File count | 105,976 | 250,000 | OK (42%) |

Deletable cruft found (not removed — reporting only per safety rule):
- `public_html/booking/error_log.bk` — 879M
- `public_html/dev/error_log.bak.20251811` — 589M
- `public_html/booking.20251003.zip` — 1.5G
- `public_html/booking.zip` — 1.4G
- Total reclaimable: ~4.4G

**Trello: Rory → complete**

---

## Summary

| Project | Status |
|---|---|
| Bailey | OK |
| Elena | OK |
| Neural Contract | 🔴 ALERT — SSH unreachable |
| Fountain | ⚠️ Disk 83% (staging), swap 31% (prod) — watch |
| Marcel | OK |
| Rory | OK, ~4.4G reclaimable (needs approval to delete) |

## Unresolved Questions
1. Neural Contract staging (52.65.197.217) unreachable — is this an intentional teardown, IP change, or an actual outage needing attention?
2. Fountain production swap at 31% (CRITICAL threshold >30%) — approve investigating top swap consumers, or is this normal steady-state for that box?
3. Rory has ~4.4G of stale logs/zip backups — approve cleanup, or leave as-is?
