# Server Monitor — 2026-10-16 09:29 (UTC+7)

Trello: https://trello.com/c/5vYjWm9k — Bailey, Elena, Fountain, Marcel, Rory ✓; Neural Contract ○ (unreachable). Card not auto-completed.
Siteground skipped per memory. Thresholds: disk 70/85% (75% = explain trigger), mem-avail 30/15%, swap 10/30%, load/core 0.7/1.0. Prev report: 2026-10-09 08:32.

## Bailey
| Server | Disk | Mem avail | Swap | Load/core | Docker | Status |
|---|---|---|---|---|---|---|
| Console | 51% (59G/117G) | 6.7G/7.7G (87%) | 111M/14.9G (1%) | 0.16/2=0.08 | app, sidekiq Up ~1h; **redis Exited(0) 47h ago**; 3 old exited (13mo) | INFO |
| Staging | 56% (54G/97G) | 2.3G/3.8G (61%) | 341M/8G (4%) | 0.12/2=0.06 | console_new/console2 app+sidekiq Up ~1h; redis, mailcatcher Up 6w; db Up 7mo | OK |

**Redis (wms-nov_redis_1):** clean SIGTERM shutdown 2026-10-14 03:52 UTC (exit 0, not OOM, no restart policy). Not an outage: sidekiq now boots against external Redis `redis://172.31.9.90:6379/0`, so the local container looks retired (prev week: Up 10d, 129.7M). Redis metrics skipped. Sidekiq log shows app errors (`NoMethodError: undefined method 'orders' for nil` in a Calcu… job), not Redis errors.

## Elena — SamGuard
| Server | Disk | Mem avail | Swap | Load/core | Procs | Status |
|---|---|---|---|---|---|---|
| samguard.co | 48% (23G/48G) | 1.1G/1.9G (58%) | 104M/2G (5%) | 0.23/1 | mysqld + apache2 healthy | OK |

## Neural Contract — nc_staging
Unreachable: SSH timeout to 52.65.197.217:22 (since 08-21).

## Fountain
| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| Staging | **75% (37G/49G)** ⚠️ (≈ prev 75%) | 4.3G/7.8G (55%) | **2.1G/4G (52%)** 🔴 (↑ from 47%) | 0.18/4=0.05 | WARNING |
| Production | 49% (76G/155G) | 2.9G/7.8G (37%) | 2.2G/8G (27%) ⚠️ (↑ from 21%) | 0.36/4=0.09 | WARNING |

Procs: Puma, Sidekiq (fountain + infinity_roses), Next.js all running on both servers. Two Next.js versions run side by side (v16.2.9 + v16.2.10) on both, and staging still has old puma/sidekiq workers from Sep 28. Stale processes are likely why swap keeps growing.
**Staging disk 75% — why:** /var/www ~18G (see prev breakdown), shared/log: fountain_BE **1.3G**, infinity_roses_BE 255M; releases 192M + 181M; /var/log ~4.4G; swapfile 4G. Candidate cleanup (needs approval): truncate/rotate `staging_fountain_gifts_BE/shared/log/*.log`, `journalctl --vacuum-size=500M`.

## Marcel (XID)
| Host | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| xid_sync_console | **71%** (34G/49G) ⚠️ (↓ from 73%) | 13G/15G | 21M/6G | 0.06/4 | WARNING |
| xid_app_backend | 32% | 549M/949M (58%) | 57M/2G | 0.00 | OK |
| xid_saas_backend | 67% | 537M/949M (57%) | 47M/2G | 0.00 | OK |
| xid_app_frontend | 56% | 607M/953M (64%) | 27M/2G | 0.00 | OK |
| xid_saas_frontend | 39% | 554M/949M (58%) | 51M/2G | 0.00 | OK |

Dev hosts unreachable (timeout): xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev, xid_saas_backend.dev. Same as previous weeks.

## Rory (cPanel)
| Metric | Value | Limit | Status |
|---|---|---|---|
| Disk | 13G | 50G (26%) | OK |
| Files | 107,477 | 250,000 (43%) | OK |

Deletable (~4.4G): public_html/booking.20251003.zip 1.5G, booking.zip 1.4G, booking/error_log.bk 879M, dev/error_log.bak.20251811 589M.

## Summary
- WARNING: Fountain staging disk 75% + swap 52% (rising); Fountain prod swap 27% (rising); xid_sync_console disk 71%
- INFO: Bailey Console local redis container stopped 10-14. Sidekiq uses external Redis, so it looks intentional
- Unreachable: nc_staging, 4 XID dev hosts
- No cleanup run (needs approval)

## Unresolved questions
1. Bailey local redis container retired on purpose (migrated to 172.31.9.90)? If so, drop the Redis step from the monitor.
2. nc_staging unreachable since 08-21: remove from monitor + Trello?
3. Approve Fountain staging log cleanup / restart of stale Sep-28 puma/next processes?
4. Rory: delete old booking zips/error_log backups (~4.4G)?
