# Server Monitor — 10:57 (+07:00)

Trello card [Check server status](https://trello.com/c/6a87a37856b84adeeedbd68a) — all items marked complete, card marked done.

## Bailey

| Server | Disk | Mem avail | Swap used | Load/core | Status |
|---|---|---|---|---|---|
| Siteground (Prestashop) | 81% (132G/164G) | — | — | — | 🔴 WARNING |
| Console (speedventory) | 53% | 84% | 1.6% | 0.04 | OK |
| Staging (staging.console) | 55% | 58% | 3.7% | 0.00 | OK |

**Siteground breakdown** (via SSH `Bailey.cpanel` fallback — Puppeteer hits unsolvable CAPTCHA, per memory): `~/www` = 38G. Top consumers: `pre9.paturevision.fr` 20G, `je-pature.paturevision.fr` 8.9G, `staging-sg.paturevision.fr` 7.0G — all staging/dev site copies, not the live site. Same as 2026-08-21 finding, unaddressed. **No cleanup run — flagging only per safety rule.**

**Console docker**: wms-nov_sidekiq_1, wms-nov_app_1 (3h up), wms-nov_redis_1 (3wk up) — all healthy.
**Redis**: 119.57M used (93.53% of peak, 1.5% of 7.67G system mem), 1902 keys db0 — healthy, no eviction risk.
**Staging docker**: all 6 containers up (console_new_app/sidekiq, console2_app/sidekiq, redis, mailcatcher, db 5mo uptime) — healthy.

## Elena — WordPress SamGuard

| Server | Disk | Mem avail | Swap used | Load/core | Status |
|---|---|---|---|---|---|
| samguard.co | 46% | 58% | 5.2% | 0.00/0.01 | OK |

MySQL + Apache processes healthy, uptime 95 days.

## Neural Contract — Contract Probe

| Server | Status |
|---|---|
| nc_staging | 🔴 **UNREACHABLE** — `ssh: connect to host 52.65.197.217 port 22: Connection timed out` |

Could not verify disk/mem/load — flagging connectivity issue.

## Fountain

| Server | Disk | Mem avail | Swap used | Load/core | Status |
|---|---|---|---|---|---|
| Staging2 | **91%** (44G/49G) | 58% | 19.5% | 0.05 | 🔴 CRITICAL |
| Production (live-20240319) | 43% | 22% | 44% | 0.06 | 🟡 WARNING (mem+swap) |

**Staging disk breakdown**: `/var/www`=25G, `/var/log`=4.3G. Top app dirs: `staging_fountain_gifts_BE` 7.3G, `staging_infinity_roses_FE` 5.0G, `staging_infinity_roses_BE` 3.7G, `staging_fountain_gifts_FE` 3.3G, `blogs` 670M. No single obvious deletable candidate (all appear to be active app deploys, not stale backups) — **unresolved question: any old release dirs safe to prune?** No cleanup run.

**Production**: mem available 1.7G/7.8G (22%, WARNING), swap 3.5G/8G used (44%, WARNING) — worth watching, not yet critical. Puma/Next.js/Sidekiq all running normally.

## Marcel (XID)

| Server | Disk | Mem avail | Swap used | Status |
|---|---|---|---|---|
| xid_sync_console (prod) | 64% | 87% (mostly cache) | 0.4% | OK |
| xid_app_backend (prod) | 31% | 57% | 2.3% | OK |
| xid_saas_backend (prod) | 66% | 56% | 2.9% | OK |
| xid_app_frontend (prod) | 56% | 64% | 1.3% | OK |
| xid_saas_frontend (prod) | 38% | 59% | 2.8% | OK |
| xid_app_backend.dev | — | — | — | 🔴 UNREACHABLE (timeout) |
| xid_sync_console.dev | — | — | — | 🔴 UNREACHABLE (timeout) |
| xid_sass_backend.dev | — | — | — | 🔴 UNREACHABLE (timeout) |
| xid_saas_backend.dev | — | — | — | 🔴 UNREACHABLE (timeout) |

All 5 production servers healthy. All 4 dev/staging servers timed out (not in the known-dead skip list — new occurrence, worth checking if dev boxes were stopped).

## Rory (cPanel — GoDaddy shared hosting)

| Metric | Value | Limit | Status |
|---|---|---|---|
| Disk (`du -sh ~`) | 13G | 50G | OK (26%) |
| File count | 104,843 | 250,000 | OK (42%) |

Deletable candidates found (not removed, flagging only): `booking.20251003.zip` 1.5G, `booking.zip` 1.4G, `booking/error_log.bk` 879M, `dev/error_log.bak.20251811` 589M — total ~4.4G reclaimable, but not urgent at current usage.

---

## Summary

| Project | Status |
|---|---|
| Bailey | 🔴 WARNING — Siteground disk 81%, staging copies |
| Elena | OK |
| Neural Contract | 🔴 Server unreachable |
| Fountain | 🔴 CRITICAL — staging disk 91%; prod mem/swap WARNING |
| Marcel | 🟡 4 dev servers unreachable; prod all OK |
| Rory | OK |

## Unresolved Questions
1. Bailey/Siteground: OK to clean up old staging site copies (pre9, je-pature, staging-sg = ~36G)? Same finding as prior run, still unaddressed.
2. Fountain staging (91% disk): any old release/deploy dirs under `/var/www` safe to prune, or is this active data?
3. Neural Contract nc_staging: server unreachable (timeout) — is it down/stopped intentionally, or an actual outage?
4. Marcel dev/staging hosts (4 of them): all timed out today, not on the known-dead list — terminated, or transient network issue?
5. Rory: OK to delete the ~4.4G of old zip backups + `.bk`/`.bak` error logs?
