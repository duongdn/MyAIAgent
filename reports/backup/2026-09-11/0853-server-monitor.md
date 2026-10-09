# Server Monitor Report — 2026-09-11 08:53

## Summary
5/6 groups checked OK-ish, 1 unreachable (Neural Contract). No destructive actions taken (per safety rule — report only).

| Project | Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|---|
| Bailey | Console (speedventory) | 52% | 85% | 1.7% | 0.00 | OK |
| Bailey | Redis | dbsize 1945, peak 92% of alloc (~137MB, tiny vs 7.7G host) | - | - | - | OK |
| Bailey | Staging | 56% | 61% | 4.3% | 0.08 | OK |
| Elena | SamGuard | 47% | 58% | 5.6% | 0.67/1core | OK (load near threshold, 1-core box) |
| Neural Contract | nc_staging | - | - | - | - | **UNREACHABLE** (SSH timeout, 52.65.197.217) |
| Fountain | Staging | **83%** | 59% | **17%** | 0.03 | WARNING (disk 70-85%, swap 10-30%) |
| Fountain | Production | 46% | 33% | **12.5%** | 0.10 | WARNING (swap 10-30%) |
| Marcel | 5 prod XID hosts | OK, all reachable | - | - | - | OK |
| Marcel | 4 dev/staging XID hosts | - | - | - | - | UNREACHABLE (persistent since 2026-07-24, known) |
| Rory | cPanel | 26% (13G/50G) | - | - | - | OK, 42% of file-count limit (105494/250000) |

## Bailey (Siteground skipped permanently per 2026-08-28 decision)
- Console: docker containers wms-nov_app_1, sidekiq, redis all Up. Top mem: sidekiq 3%, puma 2.7%.
- Redis: 1945 keys db0, dataset ~130MB. Healthy.
- Staging: 2 app stacks (console_new, console2) both Up, db up 6 months. No issues.

## Elena — SamGuard
Disk/mem/swap all comfortable. Load 0.67 on single core is near the 0.7 WARNING line — worth watching but not yet flagged.

## Neural Contract — Contract Probe
`nc_staging` (52.65.197.217) connection timed out on 2 attempts. Same persistent outage as prior runs (unreachable since ~2026-08-21). Trello item left **incomplete**.

## Fountain
- Staging disk 83% (WARNING, 70-85% band) — down from earlier CRITICAL peaks (89-91%) in prior reports, still elevated. Swap 17% WARNING.
- Production swap 12.5% WARNING (down from 42% CRITICAL in 08-28 report — improved). Mem avail 33%, borderline but within OK band (>30%).
- No cleanup run — report only, per safety rule.

## Marcel (XID)
- All 5 production hosts (sync_console, app_backend, saas_backend, app_frontend, saas_frontend): healthy, low load, swap barely used, disk 32-68%.
- 4 dev/staging hosts (app_backend.dev, sync_console.dev, sass_backend.dev, saas_backend.dev) unreachable — persistent, consistent with prior reports since 2026-07-24.

## Rory (cPanel — GoDaddy)
- 13G/50G (26%), 105494/250000 files (42%). Well within limits.
- ~4.4G deletable candidates unchanged (not removed, awaiting approval):
  - `booking/error_log.bk` 879M, `dev/error_log.bak.20251811` 589M
  - `booking.20251003.zip` 1.5G, `booking.zip` 1.4G

## Trello
Card "Check server status" (6aa352d9c117e4a629044b83): marked complete — Bailey, Elena, Fountain, Marcel, Rory. Neural Contract left incomplete (server down). Card not auto-completed (1 item outstanding).

## Unresolved Questions
- Neural Contract nc_staging still unreachable — needs investigation/decision (persistent since 2026-08-21).
- Rory ~4.4G deletable backups: approve cleanup or leave as-is?
- Fountain swap trending down (good) — continue monitoring.
