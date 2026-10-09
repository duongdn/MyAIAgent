# Server Monitor — 2026-08-07 08:46 (+07)

Prior run: 2026-07-24 08:44 (14-day gap). Trello card "Check server status" — 5/6 items complete (Elena, Neural Contract, Fountain, Marcel, Rory); Bailey left incomplete (Siteground session expired / CAPTCHA-blocked, same as 07-24 precedent). Card not marked done.

## Summary

| Project | Server | Disk | Mem avail | Swap | Load | Status |
|---|---|---|---|---|---|---|
| Bailey | Siteground | — | — | — | — | ⚠️ UNAVAILABLE (session_expired, known CAPTCHA issue) |
| Bailey | Console (speedventory) | 52% | 86% | 1.6% | ~0 | OK |
| Bailey | Redis | dataset 115M/7.67G | — | — | — | OK |
| Bailey | Staging | 54% | 60% | 3.8% | ~0 | OK |
| Elena | SamGuard | 45% | 58% | **1.6%** | 0.08 | ✅ OK (swap FIXED from 27.8%) |
| Neural Contract | nc_staging | 27% | 71% | no swap | ~0 | OK (no swap, known) |
| Fountain | Staging | **90%** | 56% | 25% | ~0 | 🔴 CRITICAL (disk) |
| Fountain | Production | 43% | 33% | **31%** | ~0.12 | ⚠️ WARNING (swap 31%, mem 33%) |
| Marcel | 5 prod XID hosts | 31-66% | 56-86% | <2.7% | ~0 | OK |
| Marcel | 4 dev/staging XID hosts | — | — | — | — | 🔴 ALL UNREACHABLE (persistent) |
| Rory | cPanel shared | 13G/50G (26%) | — | — | — | OK |

## Details

### Bailey
- **Siteground**: `siteground-storage.js` returned `session_expired`. Re-login (`--login`) is known to hit an unsolvable CAPTCHA in this environment (confirmed prior runs); no SSH fallback host configured. Not retried — same persistent issue since 07-10. Today's bailey-monitor (0205) applied safe default: no actual storage evidence of a problem, RDS/EC2 storage fine.
- **Console** (speedventory): disk 60G/117G=52%, mem 6.6G avail/7.7G=86%, swap 232M/14.9G=1.6%, load 0.00. Docker: `wms-nov_sidekiq_1`/`wms-nov_app_1` up 46min (recent restart, same pattern as 07-24, not concerning), `wms-nov_redis_1` up 9 days. All healthy.
- **Redis**: used_memory 115.6M, dataset 98.1% of used (normal), peak 125.5M — negligible vs 7.67G system. Keys: db0=1874 (main), db1=10504, + 5 small dbs; dbsize 1874 (db0 selected). OK.
- **Staging**: disk 52G/97G=54%, mem 2.3G avail/3.8G=60%, swap 306M/8G=3.8%, load 0.00. Docker: console_new/console2 app+sidekiq up 46min (same restart pattern), redis/mailcatcher up 10 days, db up 5 months. All healthy.

### Elena — SamGuard
- disk 22G/48G=45%, mem 1.1G avail/1.9G=58%, **swap 32.5M/2G=1.6% — FIXED** (was 27.8% WARNING on 07-24, trending up for 2 runs; now near zero). load 0.08/1core OK. MySQL + Apache processes healthy. No concern.

### Neural Contract — nc_staging
- disk 14G/49G=27%, mem 2.7G avail/3.8G=71%, **no swap configured** (persistent, known), load 0.00. PHP-FPM + MySQL healthy.

### Fountain
- **Staging**: disk **43G/49G=90% CRITICAL** — climbing every check (81%→86%→89%→90%). Breakdown:
  - `/var/www` = 25G (staging_fountain_gifts_BE 7.0G, staging_infinity_roses_FE 5.0G, staging_infinity_roses_BE 4.2G, staging_fountain_gifts_FE 3.2G, blogs 670M)
  - `/var/log` = 4.0G, `/var/lib` = 1.2G
  - Reclaimable candidates (~4.2G): `20_April_2026_Fountain.dump` (727M), `dumpfile_infinity.sql` (662M), `.pm2/logs/infinity-roses-FE-error.log` (560M, active 01:24 today), `cron.log.1` (410M), `fountain-gifts-FE-error.log` (336M, active), `sidekiq.log.1` (331M), `cron.log` (298M, active), `sidekiq.log.1` (222M), `sidekiq.log` (187M, active) + smaller sidekiq/cron logs.
  - **Not deleted — awaiting explicit confirmation** per safety rule. Recommended: `rm` the two old SQL dumps (1.4G) + rotate/truncate the `.log.1` files and oversized active logs (`> file` to truncate safely).
  - Mem 4.4G avail/7.8G=56% OK, swap 1.0G/4G=25% WARNING, load ~0. Puma/Sidekiq/Next.js all running.
- **Production**: disk 66G/155G=43%, mem 2.6G avail/7.8G=33% (borderline), **swap 2.5G/8G=31% WARNING** (up from 13.75% on 07-24 — more than doubled). load 0.11-0.15/4core≈0.12 OK. Puma/Sidekiq/Next.js all healthy, no restart flapping.

### Marcel — XID
- **Production (5/5 reachable)**: xid_sync_console (52% disk, 86% mem avail), xid_app_backend (31% disk, 57% mem avail), xid_saas_backend (66% disk, 56% mem avail), xid_app_frontend (56% disk, 64% mem avail), xid_saas_frontend (38% disk, 58% mem avail). All swap <2.7%, load ~0. All OK.
- **Dev/staging (0/4 reachable) — 🔴 persistent**: `xid_app_backend.dev` (47.129.188.113), `xid_sync_console.dev` (47.129.215.159), `xid_sass_backend.dev` (13.214.204.112), `xid_saas_backend.dev` (13.214.204.112) — all connection timeouts. Same as 07-24. Likely dev environment decommission or security-group change. Needs decision: add to known-dead list or investigate AWS.

### Rory — cPanel
- Home 13G / 50GB limit = 26%. File count 105,678 / 250,000 limit = 42.3%. Both within limits.
- Deletable (not removed, awaiting confirmation): `booking/error_log.bk` (879M), `dev/error_log.bak.20251811` (589M), `booking.20251003.zip` (1.5G), `booking.zip` (1.4G) + `booking/error_log` (52M), `booking.bxrlondon.com-ssl_log-Jul-2026.gz` (sizeable) — ~4.4G+ reclaimable, unchanged since prior runs.

## Alerts requiring attention
1. 🔴 **Fountain staging disk 90% CRITICAL** — climbing 4 consecutive checks (81→86→89→90). Breakdown done (~4.2G reclaimable). Needs go-ahead to clean.
2. 🔴 **Marcel: all 4 XID dev/staging hosts unreachable** (persistent since 07-24) — decision needed: known-dead list vs investigation.
3. ⚠️ **Fountain production swap 31%** (up from 13.75% on 07-24 — doubled) + mem avail 33% borderline.
4. ⚠️ Fountain staging swap 25% WARNING.
5. ⚠️ Bailey Siteground unreachable (session_expired / CAPTCHA, known/persistent).
6. Neural Contract nc_staging still has no swap configured (persistent, known).
7. ✅ **Elena SamGuard swap fixed** — was 27.8% WARNING, now 1.6%. Resolved.

## Unresolved questions
- Fountain staging cleanup: confirm deletion of 2 old SQL dumps + log rotation/truncation (~4.2G)? CRITICAL at 90% and still climbing.
- Fountain production: why did swap usage more than double (13.75%→31%) since 07-24? Worth checking for a memory leak / added workload.
- Rory cleanup: confirm deletion of old error logs + zip backups (~4.4G)?
- Marcel dev/staging: add the 4 hosts to the skill's known-dead list, or investigate (AWS console instance state / security group)?
- Siteground: still no automated fix (SSH fallback, captcha-solving, or manual VNC login) — same as prior runs.
