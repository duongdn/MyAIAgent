# Server Monitor — 2026-09-18 01:52 UTC

Siteground skip per memory (CAPTCHA unautomatable). Thresholds: disk 70/85%, mem-avail 30/15%, swap 10/30%, load/core 0.7/1.0.

## Bailey

| Server | Disk | Mem avail | Swap used | Load/core | Docker | Status |
|---|---|---|---|---|---|---|
| Console (speedventory) | 52% (61G/117G) | 6.5G/7.7G (84%) | 257M/14G (2%) | 0.07/2=0.03 | app/sidekiq up 52m, redis up 3w — all healthy | OK |
| Staging (staging.console) | 56% (54G/97G) | 2.3G/3.8G (60%) | 346M/8G (4%) | 0.08/2=0.04 | 7 containers, all up — healthy | OK |

Redis (on Console, wms-nov_redis_1): used_memory 127.7M / system 7.67G (1.7%), peak_perc 93% (peak was near-full but current is low, not a live concern), 1959 keys db0 (1951 w/ expires) + others. OK.
Siteground: **skipped** (user opt-out, CAPTCHA).

## Elena — WordPress SamGuard
Disk 47% (22G/48G), mem avail 1.1Gi/1.9Gi (58%), swap 66Mi/2Gi (3%), load 0.09/1=0.09. MySQL + Apache running normally. OK.

## Neural Contract — Contract Probe
**UNREACHABLE** — `ssh nc_staging` (52.65.197.217) connection timed out. Not checked. Trello item left incomplete — needs follow-up (host may be down/decommissioned or SG changed).

## Fountain
| Server | Disk | Mem avail | Swap used | Load/core (4 cores) |
|---|---|---|---|---|
| Staging | 83% (40G/49G) ⚠️ WARNING | 5.1Gi/7.8Gi (65%) | 603Mi/4Gi (15%) ⚠️ WARNING | 0.08/4=0.02 |
| Production | 47% (72G/155G) | 2.6Gi/7.8Gi (33%) | 1.4Gi/8Gi (18%) ⚠️ WARNING | 0.17/4=0.04 |

Staging disk 83% is WARNING-range (70-85%), not yet broken down (no destructive cleanup run per safety rule — flagging only). Both envs' swap usage 15-18% is WARNING-range but not urgent (plenty avail). Puma + Sidekiq + Next.js all running on both, no restarts observed.

## Marcel (XID)
| Host | Disk | Mem avail | Swap used | Load/core |
|---|---|---|---|---|
| xid_sync_console | 68% | 13Gi/15Gi (87%) | 21Mi/6Gi | 0.34/4=0.09 |
| xid_app_backend | 32% | 546M/949M (58%) | 60M/2G (3%) | 0.00/2 |
| xid_saas_backend | 66% | 534M/949M (56%) | 54M/2G (3%) | 0.00/2 |
| xid_app_frontend | 56% | 606M/953M (64%) | 26M/2G (1%) | 0.08/2=0.04 |
| xid_saas_frontend | 39% | 555M/949M (58%) | 53M/2G (3%) | 0.00/2 |

All 5 production hosts reachable and healthy. **Dev/staging hosts unreachable** (all 4 timed out): xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev, xid_saas_backend.dev — same as production skip-list pattern (known dead: xidsg.com, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev). Candidate to add to skip list if this recurs.

## Rory (cPanel — GoDaddy shared hosting)
Home dir 13G / 50G limit (26%). File count 105,257 / 250,000 limit (42%). Both well under limits — OK.

Deletable candidates (not deleted, flagging only per safety rule):
- `booking/error_log.bk` — 879M
- `dev/error_log.bak.20251811` — 589M
- `booking.20251003.zip` — 1.5G (dated backup)
- `booking.zip` — 1.4G (backup)
- `booking/error_log` (live, 36M) and `dev/error_log` (live, 13M) — growing, worth rotating

Total reclaimable if approved: ~4.3G.

## Summary
- OK: Bailey (Console+Staging+Redis), Elena, Fountain (process health), Rory, Marcel (5 prod hosts)
- WARNING: Fountain Staging disk 83%, Fountain staging+prod swap 15-18% (not critical, monitor)
- UNREACHABLE: Neural Contract staging, Marcel 4 dev/staging hosts
- Skipped: Siteground (Bailey) — permanent opt-out

## Trello
Checklist items marked complete: Bailey, Elena, Fountain, Marcel, Rory. **Neural Contract left incomplete** (host unreachable). Card not auto-completed (1 item pending).

## Unresolved questions
1. Neural Contract nc_staging (52.65.197.217) unreachable — decommissioned, IP changed, or transient outage? Needs manual check.
2. Should the 4 XID dev/staging hosts be added to the permanent skip-list (same as existing dead entries)?
3. Fountain staging disk (83%) — want a du breakdown + cleanup recommendation, or defer?
4. Rory: OK to delete the ~4.3G of old error_log.bk / .bak / dated zip backups?
