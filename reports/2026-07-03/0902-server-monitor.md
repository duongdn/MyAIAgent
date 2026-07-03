# Server Monitor — 2026-07-03 09:02 (+07)

## Bailey
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| Siteground (Prestashop) | — | — | — | — | **BLOCKED**: session expired, needs manual `--login` (visible browser). Asked user, no response in time — skipped. |
| Console (speedventory) | 52% | 6.6G/7.7G (86%) | 224M/14G (1.6%) | 0.01 | OK |
| Redis (wms-nov) | — | used 99.71M (~1.3% of 7.67G sys) | — | — | OK, 1805 keys db0 |
| Staging (staging.console) | 53% | 2.3G/3.8G (60%) | 315M/8G (3.9%) | 0.03 | OK |

Docker (Console): sidekiq, app, redis all Up. Docker (Staging): console_new + console2 app/sidekiq, redis, mailcatcher, db all Up.
**Bailey Trello item: NOT completed — Siteground still blocked.**

## Elena — WordPress SamGuard
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| samguard.co | 44% | 1.1G/1.9G (58%) | 358M/2G (18%) | 0.08 | OK, MySQL+Apache healthy |

## Neural Contract — Contract Probe
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| nc_staging | 27% | 2.8G/3.8G (73%) | **none configured** | 0.24 | OK, flag: no swap |

## Fountain
| Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|
| Staging | **81%** WARNING | 4.7G/7.8G (60%) | **1.4G/4G (35%) CRITICAL** | 0.84 (4c) | Check disk cleanup + swap pressure |
| Production | 45% | 3.0G/7.8G (38%) | 2.3G/8G (29%) WARNING | 0.96 (4c) | Puma/Sidekiq/Next.js all running |

## Marcel (XID) — all 9 hosts reachable
| Host | Disk | Mem avail | Swap | Status |
|---|---|---|---|---|
| xid_sync_console | 57% | 13G/15G (87%) | 40M/6G | OK |
| xid_app_backend | 31% | 545M/949M (57%) | 39M/2G | OK |
| xid_saas_backend | 66% | 529M/949M (56%) | 41M/2G | OK |
| xid_app_frontend | 56% | 606M/953M (64%) | 24M/2G | OK |
| xid_saas_frontend | 38% | 581M/949M (61%) | 49M/2G | OK |
| xid_app_backend.dev | 33% | 271M/453M (60%) | 112M/1G (11%) WARNING | flag swap |
| xid_sync_console.dev | 68% | 354M/937M (38%) | 346M/6G (5.7%) | OK |
| xid_sass_backend.dev | 43% | 214M/453M (47%) | 65M/1G (6.5%) | OK |
| xid_saas_backend.dev | 43% | 240M/453M (53%) | 65M/1G (6.5%) | OK (same box as sass_backend.dev, IP 172-31-6-207) |

Known dead skipped: xidsg.com, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev.

## Rory (cPanel shared hosting)
- Home dir: 14G (limit 50G, 28%)
- File count: 104,092 (limit 250,000, 42%)
- Deletable candidates (NOT removed — needs confirmation):
  - `public_html/booking/error_log` 1.2G, `error_log.bk` 879M
  - `public_html/dev/error_log.bak.20251811` 589M, `error_log` 138M
  - `public_html/booking.20251003.zip` 1.5G, `booking.zip` 1.4G
  - Total deletable ~5.7G

## Summary of alerts
1. **Bailey/Siteground**: session expired, needs manual login — recurring task each run until re-authed.
2. **Fountain staging**: disk 81% (WARNING) + swap 35% used (CRITICAL) — recommend investigating swap pressure and disk cleanup.
3. **Fountain production**: swap 29% (WARNING, borderline).
4. **Neural Contract nc_staging**: no swap configured.
5. **Marcel xid_app_backend.dev**: swap 11% (WARNING, borderline).
6. **Rory**: ~5.7G of stale error_logs/zip backups identified, cleanup pending user confirmation (not run per safety rule).

## Trello ("Check server status")
- Bailey: incomplete (blocked)
- Elena, Neural Contract, Fountain, Marcel, Rory: complete
- Card not auto-completed (Bailey still open)

## Unresolved questions
- Siteground re-login: run `node scripts/siteground-storage.js --login` when user available (opens visible browser)?
- Rory cleanup (5.7G stale logs/zips): confirm before deleting?
