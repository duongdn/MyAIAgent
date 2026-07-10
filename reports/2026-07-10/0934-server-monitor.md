# Server Monitor — 2026-07-10 09:34 (+07)

## Bailey
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| Siteground (Prestashop) | — | — | — | — | **BLOCKED**: CAPTCHA on login (confirmed via visible DISPLAY=:1 browser retry, `login_timeout`) — known unsolvable headlessly, needs human VNC solve. Recurring, not a fresh auth issue. |
| Console (speedventory) | 52% | 6.5G/7.7G (84%) | 225M/14G (1.6%) | 0.00 (2c) | OK |
| Redis (wms-nov) | — | used 102.56M (~1.3% of 7.67G sys) | — | — | OK, 1819 keys db0, 20916 total |
| Staging (staging.console) | 54% | 2.2G/3.8G (58%) | 299M/8G (3.7%) | 0.01 (2c) | OK |

Docker (Console): sidekiq, app, redis all Up. Docker (Staging): console_new + console2 app/sidekiq, redis, mailcatcher, db all Up.

## Elena — WordPress SamGuard
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| samguard.co | 45% | 1.0G/1.9G (53%) | 459M/2G (22%) WARNING | 0.16 (1c) | MySQL+Apache active, OK |

## Neural Contract — Contract Probe
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| nc_staging | 27% | 2.2G/3.8G (58%) | **none configured** | 0.18 (2c) | OK, flag: no swap (unchanged from prior runs). PHP8.1-fpm + MySQL active. |

## Fountain
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| Staging | **86% CRITICAL** (worse than 81% on 07-03) | 4.5G/7.8G (58%) | 724M/4G (17.7%) WARNING | 0.29 (4c) | Disk cleanup recommended, see breakdown below |
| Production | 45% | 2.9G/7.8G (37%) | 2.0G/8G (25%) WARNING | 0.40 (4c) | Puma/Sidekiq/Next.js all running, OK |

**Fountain staging disk breakdown (42G used of 49G, why 86%):**
- `/var/www` 24G total: `staging_fountain_gifts_BE` 6.7G, `staging_infinity_roses_FE` 4.7G, `staging_infinity_roses_BE` 3.8G, `staging_fountain_gifts_FE` 3.2G, `blogs` 670M
- `/var/log` 3.8G — mostly `/var/log/journal/` 3.7G (vacuum-able)
- `/usr` 2.4G, `/snap` 1.7G
- Deletable candidates (NOT removed — needs confirmation): `.pm2/logs/infinity-roses-FE-error.log` 555M, `staging_infinity_roses_BE/dumpfile_infinity.sql` 662M, `staging_fountain_gifts_BE/20_April_2026_Fountain.dump` 727M, journal logs 3.7G (via `journalctl --vacuum-time`) — total ~5.6G reclaimable, would bring disk to ~74%.

## Marcel (XID) — all 9 hosts reachable
| Host | Disk | Mem avail | Swap | Status |
|---|---|---|---|---|
| xid_sync_console | 57% | 13G/15G (87%) | 40M/6G | OK |
| xid_app_backend | 31% | 539M/949M (57%) | 40M/2G | OK |
| xid_saas_backend | 66% | 532M/949M (56%) | 46M/2G | OK |
| xid_app_frontend | 56% | 603M/953M (63%) | 24M/2G | OK |
| xid_saas_frontend | 38% | 568M/949M (60%) | 54M/2G | OK |
| xid_app_backend.dev | 33% | 268M/453M (59%) | 112M/1G (11%) WARNING | flag swap (borderline, unchanged) |
| xid_sync_console.dev | 68% | 373M/937M (40%) | 348M/6G (5.8%) | OK |
| xid_sass_backend.dev | 43% | 212M/453M (47%) | 63M/1G (6.3%) | OK |
| xid_saas_backend.dev | 43% | 238M/453M (52%) | 64M/1G (6.4%) | OK (same box, IP 172-31-6-207) |

Known dead skipped: xidsg.com, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev.

## Rory (cPanel shared hosting)
- Home dir: 14G (limit 50G, 28%)
- File count: 104,232 (limit 250,000, 42%)
- Deletable candidates (NOT removed — needs confirmation):
  - `public_html/booking/error_log` 1.2G, `error_log.bk` 879M
  - `public_html/dev/error_log.bak.20251811` 589M, `error_log` 139M
  - `public_html/booking.20251003.zip` 1.5G, `booking.zip` 1.4G
  - Total deletable ~5.7G (unchanged from prior run — not yet cleaned up)

## Summary of alerts
1. **Bailey/Siteground**: login CAPTCHA-blocked (confirmed again via visible browser retry) — needs human VNC session to solve once, per prior finding.
2. **Fountain staging**: disk 86% CRITICAL (up from 81% last run) + swap 17.7% WARNING — see breakdown above, ~5.6G reclaimable pending confirmation.
3. **Fountain production**: swap 25% (WARNING, borderline, improved from 29%).
4. **Elena samguard.co**: swap 22% (WARNING, new this run).
5. **Neural Contract nc_staging**: no swap configured (unchanged).
6. **Marcel xid_app_backend.dev**: swap 11% (WARNING, borderline, unchanged).
7. **Rory**: ~5.7G stale error_logs/zip backups still pending cleanup confirmation (unchanged from 07-03).

## Trello ("Check server status")
- Bailey: **incomplete** (Siteground still CAPTCHA-blocked, consistent with 07-03)
- Elena, Neural Contract, Fountain, Marcel, Rory: complete
- Card not auto-completed (Bailey still open)

## Unresolved questions
- Fountain staging disk CRITICAL (86%): approve cleanup of `.pm2` log, 2 SQL dumps, and journal vacuum (~5.6G)?
- Rory cleanup (5.7G stale logs/zips): confirm before deleting?
- Siteground: still needs a human to VNC in and solve the CAPTCHA once to refresh the saved browser session — anyone available?
