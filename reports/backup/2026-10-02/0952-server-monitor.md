# Server Monitor — 02/10/2026 09:52 (UTC+7)

Trello: https://trello.com/c/AXhrRnNA — Bailey, Elena, Fountain, Marcel, Rory ✓; Neural Contract ○ (unreachable). Card not auto-completed.
Siteground skipped per memory (CAPTCHA). Thresholds: disk 70/85% (75% = explain trigger), mem-avail 30/15%, swap 10/30%, load/core 0.7/1.0. Prev report: 2026-09-25 09:14.

## Bailey
| Server | Disk | Mem avail | Swap used | Load/core | Docker | Status |
|---|---|---|---|---|---|---|
| Console (speedventory) | 51% (60G/117G) = | 6.7G/7.7G (87%) | 237M/14.9G (2%) | 0.18/2=0.09 | app, sidekiq Up 2h; redis Up 3d | OK |
| Staging console | 55% (54G/97G) = | 2.3G/3.8G (61%) | 343M/8G (4%) | 0.00 | 7 containers Up | OK |

Redis: 129.7M used (= peak) of 7.67G system = 1.7%, no maxmemory. Keys db0 1976, db1 11205, db6 1613, others small. OK.
Notes: app/sidekiq restart ~01:00 server time on both hosts (nightly, same as before) — not flapping. Console uptime 6d 23h → host rebooted ~09-25. 3 old containers Exited (100) 13 months ago on Console (leftovers, harmless).

## Elena — SamGuard
Disk 47% (23G/48G) =, mem avail 1.1G/1.9G (58%), swap 16M/2G (1%, ↓ from 5%), load 0.08/0.07/0.14 on 1 core. MySQL (restarted Sep30) + Apache up. OK.

## Neural Contract
**UNREACHABLE** — nc_staging (52.65.197.217): SSH timeout x2, ports 22 + 443 both closed/timeout. Persistent since 08-21 (6+ runs). Trello item left incomplete.

## Fountain
| Server | Disk | Mem avail | Swap used | Load/core (4) | Status |
|---|---|---|---|---|---|
| Staging | **77% (37G/49G)** ⚠️ (↑ from 73% on 09-25) | 2.7G/7.8G (35%) | 1.2G/4G (30%) ⚠️ (↑ from 15%) | 2.21/4=0.55 (1-min, `next build` running) | WARNING |
| Production | 48% (73G/155G) | 2.6G/7.8G (33%) (↑ from 28%) | 1.3G/8G (16%) ⚠️ (↓ from 21%) | 0.46/4=0.12 | WARNING (swap only) |

Processes healthy (Puma, Sidekiq 0 busy, Next.js). Staging load/mem/swap spike = FE deploy in progress at check time (`next build` 1.4G RSS, started 02:48 server time) — transient.

**Staging disk 77% — why (≥75% trigger):**
| Path | Size | Note |
|---|---|---|
| /var/www/staging_fountain_gifts_BE | 5.0G | shared 3.7G, **29_September_2026_Fountain.dump 750M**, tmp 291M |
| /var/log/journal | 4.3G | systemd journal, never vacuumed |
| /var/www/.npm | 3.4G | npm cache |
| /var/www/staging_infinity_roses_BE | 2.7G | shared 1.7G, **29_September_2026_Infinity.dump 683M** |
| /var/www/staging_fountain_gifts_FE | 2.2G | node_modules 1.6G |
| /var/www/staging_infinity_roses_FE | 2.0G | |
| /usr | 2.5G | |
| /var/lib | 1.3G+ | DB data dirs not readable w/o sudo — part of ~10G unaccounted |
| /var/www/.pm2 | 1.1G | pm2 logs |
| swapfile | 4.0G | |

Growth since 09-25 (+2G) ≈ 2 new DB dumps from 09-29 (1.4G) + build artifacts.
Recommended cleanup (NOT run — needs approval), est. ~8G → ~60%:
- `sudo journalctl --vacuum-size=500M` (~3.8G)
- `npm cache clean --force` as www-data (~3.4G)
- remove 2 dumps of 09-29 if restore done (~1.4G)
- `pm2 flush` (~1G)

**Prod note:** still 2 `next-server` (v16.2.9 since Sep29 1.16G, v16.2.10 since Oct01 458M) + 2 Puma clusters — same pattern as 09-25 (old release not stopped after deploy), ~1.2G+ RAM held. Mem avail now back above 30%.

## Marcel (XID)
| Host | Disk | Mem avail | Swap | Load |
|---|---|---|---|---|
| xid_sync_console | 69% (34G/49G) (↑ from 68%) | 13G/15G | 21M/6G | 0.32/4 |
| xid_app_backend | 32% | 548M/949M (58%) | 56M/2G | 0.00 |
| xid_saas_backend | 66% (13G/20G) | 508M/949M (54%) | 55M/2G | 0.00 |
| xid_app_frontend | 56% | 605M/953M (63%) | 27M/2G | 0.00 |
| xid_saas_frontend | 39% | 555M/949M (58%) | 50M/2G | 0.08 |

5 prod OK. xid_sync_console 69% — 1 point below WARNING, slow growth (+1%/week). Dev hosts unreachable (timeout): xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev, xid_saas_backend.dev — same as 09-18, 09-25.

## Rory (GoDaddy cPanel)
Home 13G/50G (26%) =, files 105,300/250,000 (42%). OK. Deletable (~4.4G, awaiting approval): booking.20251003.zip 1.5G, booking.zip 1.4G, booking/error_log.bk 879M, dev/error_log.bak.20251811 589M.

## Summary
- OK: Bailey, Elena, Marcel prod, Rory
- WARNING: Fountain staging disk 77% (↑4pt/week, journal + npm cache + 09-29 dumps), swap 30% (deploy in progress); Fountain prod swap 16% (duplicate next-server/puma)
- UNREACHABLE: Neural Contract staging (since 08-21), XID 4 dev hosts

## Unresolved Questions
1. Fountain staging: approve cleanup (journal vacuum + npm cache + pm2 flush; 09-29 dumps)?
2. nc_staging unreachable since 08-21 — decommissioned or SG/IP changed? Remove from monitor + Trello?
3. Fountain prod: OK to ask dev to stop old next-server (v16.2.9) + old Puma cluster?
4. Rory: OK to delete ~4.4G old zip/error_log backups?
5. XID 4 dev hosts dead 3 runs in a row — move to "known dead (skip)" list?
