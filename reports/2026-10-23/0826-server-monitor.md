# Server Monitor — 2026-10-23 08:26

Siteground skipped (memory). Thresholds: disk 70/85% (75% = explain), mem-avail 30/15%, swap 10/30%, load/core 0.7/1.0. Prev: reports/2026-10-16/0929-server-monitor.md.
Trello: https://trello.com/c/XMDbW9WP — all 6 items complete, card done.

## Bailey
| Server | Disk | Mem avail | Swap | Load/core | Docker | Status |
|---|---|---|---|---|---|---|
| Console | 51% (59G/117G) = | 6.8G/7.7G (88%) | 111M/14.9G (1%) | 0.00 | app, sidekiq Up 26m; redis Exited(0) since 10-14; 3 old exited (13mo) | INFO |
| Staging | 56% (54G/97G) = | 2.3G/3.8G (61%) | 391M/8G (5%) | 0.00 | console_new/console2 app+sidekiq Up 26m; redis/mailcatcher Up 7w; db Up 7mo | OK |
| Redis | — | — | — | — | local container stopped (clean SIGTERM 10-14 03:52 UTC); sidekiq uses external Redis 172.31.9.90 | INFO (skipped metrics) |

## Elena — SamGuard
| Disk | Mem avail | Swap | Load/core | Procs | Status |
|---|---|---|---|---|---|
| 48% (23G/48G) | 1.1G/1.9G (58%) | 12M/2G (1%) | 0.26/1 | mysqld + apache2 workers running | OK |

## Neural Contract — nc_staging
| Disk | Mem avail | Swap | Load/core | Procs | Status |
|---|---|---|---|---|---|
| 28% (14G/49G) | 2.9G/3.8G (76%) | **none** | 0.00 | mysqld, php-fpm 8.2 OK (up 1h16m — rebooted recently) | WARNING (no swap) |

## Fountain
| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| Staging | **75% (36G/49G)** ≈ prev | 4.8G/7.8G (62%) | **2.1G/4G (52%)** = prev | 0.15/4 | WARNING |
| Prod | 50% (78G/155G) | 2.6G/7.8G (33%) | 2.3G/8G (29%) | 0.19/4 | OK (swap near 30%) |

Puma/Sidekiq/Next.js up on both. Staging disk why (unchanged from prev breakdown): /var/www ~18G, BE shared/log ~1.3G, /var/log ~4.4G, swapfile 4G. Cleanup candidates (need approval): rotate `staging_fountain_gifts_BE/shared/log/*.log`, `journalctl --vacuum-size=500M`.

## Marcel (XID)
| Host | Disk | Mem avail | Swap | Status |
|---|---|---|---|---|
| xid_sync_console | **73%** (35G/49G) ↑ from 71% | 13G/15G | 21M/6G | WARNING |
| xid_app_backend | 32% | 565M/949M | 57M/2G | OK |
| xid_saas_backend | 67% | 552M/949M | 53M/2G | OK |
| xid_app_frontend | 56% | 620M/953M | 26M/2G | OK |
| xid_saas_frontend | 39% | 579M/949M | 50M/2G | OK |
Dev hosts timeout (same as prev weeks): xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev, xid_saas_backend.dev.

## Rory (cPanel)
| Disk | Files | Status |
|---|---|---|
| 13G / 50G (26%) | 108,510 / 250,000 (43%) | OK |
Deletable (needs approval): booking.20251003.zip 1.5G, booking.zip 1.4G, booking/error_log.bk 879M, dev/error_log.bak.20251811 589M (~4.4G total).

## Summary
- WARNING: Fountain staging disk 75% + swap 52% (flat); xid_sync_console disk 73% (↑2pt); nc_staging no swap
- INFO: Bailey local redis container retired (external Redis); Fountain prod swap 29%
- No down containers in use; all reachable servers healthy load

## Unresolved
1. Bailey local redis retired on purpose? If yes drop Redis step from skill.
2. Approve Fountain staging log cleanup / Rory zip+log deletion?
3. XID .dev hosts — decommissioned? add to skip list?

## Follow-up: xid_sync_console 73% — root cause
- /var/log 18G of 35G used: `syslog` 7.3G (since 10-18) + `syslog.1` 8.5G (uncompressed, delaycompress)
- ~100% of syslog lines = `dotnet-xid-webapp` (xid-webapp.service, XID.Sync.API) logging every EF Core SQL (`Executed DbCommand ... UPDATE tenantX.Devices SET SyncTime...`) at Information level → ~1.2G/day
- Cause: /home/ubuntu/deploy/appsettings.json `Default: Information`, no `Microsoft.EntityFrameworkCore` override, no appsettings.Production.json
- Other: journal 985M, snapd 1.8G (9 disabled snap revisions), swapfile 6G
- Fix (needs approval): add `"Microsoft.EntityFrameworkCore": "Warning"` to LogLevel + restart xid-webapp; `truncate -s 0 /var/log/syslog.1` (frees 8.5G); optional: logrotate syslog daily + maxsize 1G
- **08:34 action (user approved option 2):** truncated /var/log/syslog.1 → disk 73% → **55%** (27G/49G). Log level kept (user: logs need detail).
