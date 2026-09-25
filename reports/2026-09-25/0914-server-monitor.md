# Server Monitor — 25/09/2026 09:14 (UTC+7)

Trello: https://trello.com/c/U2Y172rv — Bailey, Elena, Fountain, Marcel, Rory ✓; Neural Contract ○ (unreachable). Card not auto-completed.
Siteground skipped per memory (CAPTCHA). Thresholds: disk 70/85% (75% = explain trigger), mem-avail 30/15%, swap 10/30%, load/core 0.7/1.0. Prev report: 2026-09-18 01:52.

## Bailey
| Server | Disk | Mem avail | Swap used | Load/core | Docker | Status |
|---|---|---|---|---|---|---|
| Console (speedventory) | 51% (60G/117G) | 6.6G/7.7G (86%) | 229M/14.9G (2%) | 0.13/2=0.07 | app, sidekiq Up ~1h; redis Up 3d | OK |
| Staging console | 55% (53G/97G) | 2.3G/3.8G (61%) | 343M/8G (4%) | 0.00 | 7 containers Up | OK |

Redis: 129M used (peak 136M) of 7.67G system = 1.7%, no maxmemory. Keys db0 1971, db1 11209, db6 1613, others small. OK.
Note: Console app/sidekiq restarted ~01:00 (deploy/nightly restart, both same time on staging too) — not flapping.

## Elena — SamGuard
Disk 47% (23G/48G), mem avail 1.1G/1.9G (58%), swap 103M/2G (5%), load 2.58/0.73/0.26 on 1 core — 1-min spike only (Apache workers busy), 15-min 0.26. MySQL + Apache up. OK (watch load).

## Neural Contract
**UNREACHABLE** — nc_staging (52.65.197.217) SSH timeout. persistent since 08-21 (5+ runs). Trello item left incomplete.

## Fountain
| Server | Disk | Mem avail | Swap used | Load/core (4) |
|---|---|---|---|---|
| Staging | 73% (35G/49G) ⚠️ WARNING (↓ from 83% on 09-18) | 4.7G/7.8G (60%) | 606M/4G (15%) ⚠️ | 0.00 |
| Production | 47% (73G/155G) | 2.2G/7.8G (28%) ⚠️ WARNING | 1.7G/8G (21%) ⚠️ (↑ from 18%) | 0.06/4 |

Processes healthy (Puma, Sidekiq 0 busy, Next.js). **Prod note:** 2 `next-server` processes (v16.2.10 since Sep16 584M, v16.2.9 since Sep23 777M) + 2 Puma clusters (Sep23 + Sep24) — likely old releases not stopped after deploy, ~1.3G RAM held → explains mem-avail 28%. Check with dev before killing anything.

## Marcel (XID)
| Host | Disk | Mem avail | Swap | Load |
|---|---|---|---|---|
| xid_sync_console | 68% (33G/49G) | 13G/15G | 21M/6G | 0.06/4 |
| xid_app_backend | 32% | 550M/949M (58%) | 56M/2G | 0.00 |
| xid_saas_backend | 67% (13G/20G) | 541M/949M (57%) | 54M/2G | 0.00 |
| xid_app_frontend | 56% | 608M/953M (64%) | 26M/2G | 0.00 |
| xid_saas_frontend | 39% | 553M/949M (58%) | 49M/2G | 0.00 |

5 prod OK. Dev hosts unreachable (timeout): xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev, xid_saas_backend.dev — same as 09-18.

## Rory (GoDaddy cPanel)
Home 13G/50G (26%), files 105,485/250,000 (42%). OK. Deletable (~4.4G, awaiting approval): booking.20251003.zip 1.5G, booking.zip 1.4G, booking/error_log.bk 879M, dev/error_log.bak.20251811 589M.

## Summary
- OK: Bailey, Elena, Marcel prod, Rory
- WARNING: Fountain prod mem-avail 28% + swap 21% (stale next-server/puma processes likely); Fountain staging disk 73%, swap 15%
- UNREACHABLE: Neural Contract staging (since 08-21), XID 4 dev hosts

## Unresolved Questions
1. nc_staging unreachable since 08-21 — decommissioned or SG/IP changed?
2. Fountain prod: OK to ask dev to stop old next-server (v16.2.10) + old Puma cluster?
3. Rory: OK to delete ~4.4G old zip/error_log backups?
