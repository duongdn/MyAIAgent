# Server Monitor — 2026-10-09 08:32 (UTC+7)
Trello: https://trello.com/c/Nmiku8xV — Bailey, Elena, Fountain, Marcel, Rory ✓; Neural Contract ○ (unreachable). Card not auto-completed.
Siteground skipped per memory. Thresholds: disk 70/85% (75% = explain trigger), mem-avail 30/15%, swap 10/30%, load/core 0.7/1.0. Prev report: 2026-10-02 09:52.

## Bailey
| Server | Disk | Mem avail | Swap used | Load/core | Docker | Status |
|---|---|---|---|---|---|---|
| Console | 51% (59G/117G) | 6.7G/7.7G (87%) | 241M/14.9G (2%) | 0.03/2=0.02 | app, sidekiq Up 32m; redis Up 10d; 3 old exited (13mo) | OK |
| Staging | 56% (54G/97G) | 2.3G/3.8G (61%) | 341M/8G (4%) | 0.00 | 7 Up | OK |

Redis: 129.7M (1.7% of 7.7G system), db0 1976 keys, db1 11205, db6 1613, others small. OK.
App/sidekiq restarted at ~01:00 server time on both (deploy/cron restart) — healthy.

## Elena — SamGuard
| Disk | Mem avail | Swap | Load/core (1) | Status |
|---|---|---|---|---|
| 48% (23G/48G) | 1.1G/1.9G (58%) | 108M/2G (5%) | 0.12 | OK |
MySQL + 5 Apache workers up.

## Neural Contract — nc_staging
**UNREACHABLE** — 52.65.197.217 SSH timeout x2. Persistent since 08-21. Trello item left incomplete.

## Fountain
| Server | Disk | Mem avail | Swap used | Load/core (4) | Status |
|---|---|---|---|---|---|
| Staging | **75% (36G/49G)** ⚠️ (↓ from 77%) | 4.8G/7.8G (62%) | **1.9G/4G (47%)** 🔴 (↑ from 30%) | 0.05/4=0.01 | WARNING |
| Production | 48% (75G/155G) | 2.9G/7.8G (37%) | 1.7G/8G (21%) ⚠️ (↑ from 16%) | 0.22/4=0.06 | WARNING (swap) |

**Staging disk 75% — why:** /var/www 18G (fountain_BE 4.2G, infinity_roses_BE 2.7G, fountain_FE 2.2G, infinity_roses_FE 2.0G, blogs 670M), /var/log 4.4G, swapfile 4G.
**Staging swap 47%:** duplicate processes — 2 Puma clusters (Sep28 + Oct08), 2 next-server (v16.2.10 Sep30 + v16.2.7 Oct08). Old ones not stopped after deploys.
**Prod swap 21%:** same pattern — Puma cluster Oct05 + Oct08, next-server v16.2.10 (Oct01) + v16.2.9 (Oct08).
Sidekiq 0 busy everywhere. Load low.

## Marcel (XID)
| Host | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| xid_sync_console | **73%** ⚠️ (↑ from 69%) | 14G/15G | 21M/6G | 0.00 | WARNING (disk) |
| xid_app_backend | 32% | 538M/949M | 57M/2G | 0.00 | OK |
| xid_saas_backend | 66% | 507M/949M | 55M/2G | 0.08 | OK |
| xid_app_frontend | 56% | 609M/953M | 27M/2G | 0.00 | OK |
| xid_saas_frontend | 39% | 558M/949M | 53M/2G | 0.00 | OK |
Dev hosts unreachable (timeout): xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev, xid_saas_backend.dev — same as previous weeks.
xid_sync_console +4pt/week — 2pt to explain trigger.

## Rory (cPanel)
| Disk | Files | Status |
|---|---|---|
| 13G/50G (26%) | 107,166/250,000 (43%) | OK |
Deletable (≈4.4G): booking.20251003.zip 1.5G, booking.zip 1.4G, booking/error_log.bk 879M, dev/error_log.bak.20251811 589M. booking/error_log live 52M.

## Summary
- WARNING: Fountain staging disk 75% + swap 47%; Fountain prod swap 21%; xid_sync_console disk 73% (growing)
- Unreachable: nc_staging, 4 XID dev hosts
- No cleanup executed.

## Unresolved questions
1. Fountain staging/prod: ask dev to stop old Puma/next-server instances (swap)? Approve staging cleanup (/var/log 4.4G vacuum)?
2. nc_staging unreachable since 08-21 — remove from monitor + Trello?
3. Rory: delete old booking zips/error_log backups (~4.4G)?
