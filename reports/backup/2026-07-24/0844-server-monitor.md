# Server Monitor — 2026-07-24 08:44 (+07)

Prior run: 2026-07-10 09:34 (14-day gap). Trello card "Check server status" — 5/6 items complete (Elena, Neural Contract, Fountain, Marcel, Rory); Bailey left incomplete (Siteground CAPTCHA-blocked, same as 07-10 precedent). Card not marked done.

## Summary

| Project | Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|---|
| Bailey | Siteground | — | — | — | — | ⚠️ UNAVAILABLE (CAPTCHA-blocked, known issue) |
| Bailey | Console (speedventory) | 52% | 86% | 1.5% | ~0 | OK |
| Bailey | Redis | dataset 110M/7.67G | — | — | — | OK |
| Bailey | Staging | 54% | 60% | 3.6% | ~0 | OK |
| Elena | SamGuard | 45% | 63% | 27.8% | 0.5/core | ⚠️ WARNING (swap) |
| Neural Contract | nc_staging | 28% | 74% | no swap | ~0 | OK (no swap, known) |
| Fountain | Staging | **89%** | 59% | 27.5% | ~0 | 🔴 CRITICAL (disk) |
| Fountain | Production | 42% | 35% | 13.75% | ~0.07/core | OK (swap borderline) |
| Marcel | 5 prod XID hosts | 31-66% | 57-87% | <3% | ~0 | OK |
| Marcel | 4 dev/staging XID hosts | — | — | — | — | 🔴 ALL UNREACHABLE (new) |
| Rory | cPanel shared | 13G/50G (26%) | — | — | — | OK |

## Details

### Bailey
- **Siteground**: `--login` hits session_expired → re-auth attempted, blocked by CAPTCHA on Puppeteer login (confirmed unsolvable headlessly per prior investigation). Not retried further — needs human-solved CAPTCHA or SSH fallback (no SSH host configured for this endpoint). Reported as unavailable this run.
- **Console** (speedventory): disk 60G/117G=52%, mem 6.1G free/7.7G, swap 227M/14.9G=1.5%, load ~0. Docker: `wms-nov_app_1`/`sidekiq_1` up 40min (recent restart, not concerning), `redis_1` up 41h.
- **Redis**: used_memory 110M, dataset 98.36% of used (normal), peak 115M — negligible vs 7.67G system mem. Keys: db0=1846 (main), db1=9730, total 1846 reported by dbsize (db0 selected).
- **Staging**: disk 52G/97G=54%, mem 2.3G avail/3.8G=60%, swap 287M/8G=3.6%, load ~0. Docker: console_new/console2 app+sidekiq up 40min, redis up 19h, db up 4mo — all healthy.

### Elena — SamGuard
- disk 22G/48G=45%, mem 1.2G avail/1.9G=63%, swap 557M/2G=**27.8% WARNING** (up from 22% on 07-10, trending up), load 0.49/1core=0.49 OK. MySQL + Apache processes healthy.

### Neural Contract — nc_staging
- disk 14G/49G=28%, mem 2.8G avail/3.8G=74%, **no swap configured** (persistent, known), load ~0. PHP-FPM + MySQL healthy.

### Fountain
- **Staging**: disk **43G/49G=89% CRITICAL** — worsening trend (81%→86%→89% over last 3 checks). Breakdown:
  - `/var/www` = 25G total (staging_fountain_gifts_BE 7.1G, staging_infinity_roses_FE 5.0G, staging_infinity_roses_BE 4.2G, staging_fountain_gifts_FE 3.2G)
  - `/var/log` = 3.9G
  - Reclaimable candidates (~4.3G+): `20_April_2026_Fountain.dump` (727M), `dumpfile_infinity.sql` (662M), `.pm2/logs/infinity-roses-FE-error.log` (558M), `sidekiq.log.1` (541M), `cron.log.1` (410M), `sidekiq.log` (384M), `.pm2/logs/fountain-gifts-FE-error.log` (331M), `cron.log` (298M), `sidekiq.log.1` (251M), `sidekiq.log` (240M)
  - **Not deleted — awaiting explicit confirmation** per safety rule. Recommended: `rm` the two old SQL dumps + rotate/truncate the `.log.1`/error logs (or `> file` to truncate active logs safely).
  - Mem 4.6G avail/7.8G=59% OK, swap 1.1G/4G=27.5% WARNING, load ~0. Puma/Sidekiq/Next.js processes running for fountain_gifts + infinity_roses (both staging + FE/BE).
- **Production**: disk 64G/155G=42%, mem 2.7G avail/7.8G=35% (borderline OK), swap 1.1G/8G=13.75% WARNING, load 0.23-0.29/4core≈0.06-0.07 OK. Puma/Sidekiq/Next.js all healthy, no restart flapping.

### Marcel — XID
- **Production (5/5 reachable)**: xid_sync_console (62% disk, 87% mem avail), xid_app_backend (31% disk, 57% mem avail), xid_saas_backend (66% disk, 59% mem avail), xid_app_frontend (56% disk, 63% mem avail), xid_saas_frontend (38% disk, 61% mem avail). All swap <3%, load ~0. All OK.
- **Dev/staging (0/4 reachable) — 🔴 all connection timeouts**: `xid_app_backend.dev`, `xid_sync_console.dev`, `xid_sass_backend.dev`, `xid_saas_backend.dev`. This is new — previously only `xid_sass_frontend.dev` and `xid_app_frontend.dev` were known-dead; now every dev/staging XID host times out. Possible full dev environment decommission or network/security-group change. Needs user confirmation before marking these permanently dead in the skill's known-dead list.

### Rory — cPanel
- Home dir 13G / 50GB limit = 26%. File count 103,870 / 250,000 limit = 41.5%. Both well within limits.
- Deletable (not removed, awaiting confirmation): `booking/error_log.bk` (879M), `dev/error_log.bak.20251811` (589M), `booking.20251003.zip` (1.5G), `booking.zip` (1.4G) — ~4.4G reclaimable, similar to prior runs, unchanged action needed.

## Alerts requiring attention
1. 🔴 **Fountain staging disk 89% CRITICAL** — climbing 3 consecutive checks, breakdown done, needs go-ahead to clean ~4.3G of old dumps/logs.
2. 🔴 **Marcel: all 4 XID dev/staging hosts now unreachable** (new since 07-10) — needs decision on whether to update known-dead list or investigate network/infra change.
3. ⚠️ Elena SamGuard swap 27.8% (trending up from 22%).
4. ⚠️ Fountain production swap 13.75%, mem avail 35% (borderline, not critical).
5. ⚠️ Bailey Siteground unreachable (CAPTCHA, known/persistent — no action possible without human intervention).
6. Neural Contract nc_staging still has no swap configured (persistent, known).

## Unresolved questions
- Fountain staging cleanup: confirm deletion of 2 old SQL dumps + log rotation/truncation (~4.3G)?
- Rory cleanup: confirm deletion of old error logs + zip backups (~4.4G)?
- Marcel dev/staging: should the 4 newly-unreachable hosts be added to the skill's known-dead list, or investigated further (e.g. check AWS console for instance state)?
- Siteground: still need either an SSH fallback host/key, a captcha-solving integration, or a one-time manual VNC login to refresh the session — no automated fix available this run.
