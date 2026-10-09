# Server Monitor — 2026-06-19 08:54 +07

## Summary

| Project | Status | Trello |
|---|---|---|
| Bailey | ⚠️ Partial (Siteground blocked, manual CAPTCHA needed) | NOT completed |
| Elena - WordPress SamGuard | OK | Completed |
| Neural Contract - Contract Probe | OK (no swap — info) | Completed |
| Fountain | OK | Completed |
| Marcel (XID) | OK (all 9 hosts reachable) | Completed |
| Rory | OK | Completed |

---

## Bailey

### 1. Siteground (Prestashop) — BLOCKED
Session expired. Ran `--login` to re-auth: script opened a visible browser on `:1`, autofilled credentials, but timed out after 120s waiting for manual CAPTCHA solve/click. **Action needed:** run `node scripts/siteground-storage.js --login` while at the desktop and solve the CAPTCHA manually within 2 min.

### 2. Console (speedventory) — OK
| Metric | Value | Status |
|---|---|---|
| Disk | 52% (60G/117G) | OK |
| Memory available | 6.6G/7.7G (86%) | OK |
| Swap used | 211M/14G (1.5%) | OK |
| Load (2 cores) | 0.06 | OK |
| Docker | wms-nov_sidekiq_1, wms-nov_app_1, wms-nov_redis_1 — all Up | OK |

### 3. Redis (speedventory) — OK
Used memory 89M, peak 746M (12% of peak). Keys: db0=1776, db1=8739, db6=1613. dbsize=1776. No memory pressure.

### 4. Staging (staging.console.speedventory) — OK
| Metric | Value | Status |
|---|---|---|
| Disk | 53% (51G/97G) | OK |
| Memory available | 2.2G/3.8G (58%) | OK |
| Swap used | 325M/8G (4%) | OK |
| Load (2 cores) | 0.00 | OK |
| Docker | console_new_app_1, console_new_sidekiq_1, console2_app_1, console2_sidekiq_1, console_new_redis_1, console_new_mailcatcher_1, console_new_db_1 — all Up | OK |

**Bailey Trello item:** left incomplete — Siteground sub-check blocked on manual CAPTCHA.

---

## Elena — WordPress SamGuard (samguard.co)

| Metric | Value | Status |
|---|---|---|
| Disk | 44% (21G/48G) | OK |
| Memory available | 1.1Gi/1.9Gi (58%) | OK |
| Swap used | 366Mi/2.0Gi (18%) | WARNING (10-30% band) |
| Load (1 core) | 0.14 | OK |
| MySQL + Apache | mysqld + apache2 workers running normally | OK |

---

## Neural Contract — Contract Probe (nc_staging)

| Metric | Value | Status |
|---|---|---|
| Disk | 27% (13G/49G) | OK |
| Memory available | 2.8Gi/3.8Gi (74%) | OK |
| Swap | **none configured** | FLAG — no swap |
| Load (2 cores) | 0.00 | OK |
| PHP-FPM + MySQL | mysqld + php-fpm pool running | OK |

---

## Fountain

### Staging (staging.fountaingifts.com)
| Metric | Value | Status |
|---|---|---|
| Disk | 77% (37G/49G) | WARNING (70-85% band) |
| Memory available | 4.7Gi/7.8Gi (60%) | OK |
| Swap used | 1.0Gi/4.0Gi (25%) | WARNING |
| Load (4 cores) | 0.02 | OK |
| Puma + Sidekiq + Next.js | fountain_gifts_BE, infinity_roses_BE puma/sidekiq + next-server running | OK |

### Production (fountaingifts.com)
| Metric | Value | Status |
|---|---|---|
| Disk | 42% (65G/155G) | OK |
| Memory available | 3.1Gi/7.8Gi (40%) | OK |
| Swap used | 1.7Gi/8.0Gi (21%) | WARNING |
| Load (4 cores) | 0.18 | OK |
| Puma + Sidekiq + Next.js | fountain_gifts_BE, infinity_roses_BE puma/sidekiq + 2× next-server running | OK |

Staging disk at 77% is the only metric crossing the 75% investigate threshold this run — not yet investigated (storage-explain rule applies to disk only, both staging and prod are well within memory/swap operational limits despite WARNING band). Recommend follow-up `du -sh` breakdown on staging if it keeps climbing.

---

## Marcel (XID) — all 9 hosts reachable

| Host | Disk | Mem used/total | Swap used/total | Load |
|---|---|---|---|---|
| xid_sync_console | 59% (29G/49G) | 991Mi/15Gi | 46Mi/6.0Gi | 0.10 |
| xid_app_backend | 30% (5.8G/20G) | 228M/949M | 65M/2.0G | 0.00 |
| xid_saas_backend | 65% (13G/20G) | 264M/949M | 55M/2.0G | 0.08 |
| xid_app_frontend | 56% (11G/20G) | 164M/953M | 26M/2.0G | 0.16 |
| xid_saas_frontend | 38% (7.2G/20G) | 197M/949M | 47M/2.0G | 0.00 |
| xid_app_backend.dev | 33% (5.0G/16G) | 177M/453M | 113M/1.0G | 0.00 |
| xid_sync_console.dev | 68% (20G/29G) | 391Mi/937Mi | 332Mi/6.0Gi | 0.00 |
| xid_sass_backend.dev | 43% (6.5G/16G) | 228M/453M | 52M/1.0G | 0.08 |
| xid_saas_backend.dev | 43% (6.5G/16G) | 216M/453M | 53M/1.0G | 0.08 |

All within OK bands. `xid_sass_backend.dev` and `xid_saas_backend.dev` resolve to the same IP (172-31-6-207) — likely a duplicate SSH config alias, not two distinct servers.

---

## Rory (cPanel shared hosting)

| Metric | Value | Limit | Status |
|---|---|---|---|
| Disk (home dir) | 13G | 50G | OK (26%) |
| File count | 99,949 | 250,000 | OK (40%) |

**Cleanable space identified (not deleted — needs confirmation):**
| Item | Size |
|---|---|
| `public_html/booking/error_log` | 1.2G |
| `public_html/booking/error_log.bk` | 879M |
| `public_html/dev/error_log.bak.20251811` | 589M |
| `public_html/dev/error_log` | 135M |
| `public_html/booking.20251003.zip` | 1.5G |
| `public_html/booking.zip` | 1.4G |

Total reclaimable ≈ 5.7G (44% of current 13G usage). Well under both limits so no urgency, but flagging since these are old logs/backups that could be safely archived off-server or deleted. **Will not delete without explicit approval.**

---

## Unresolved Questions
1. Siteground CAPTCHA — needs a human at the desktop to run `node scripts/siteground-storage.js --login` and solve it manually; couldn't complete in this automated run.
2. Fountain staging disk (77%) — crossed 70% WARNING band; no `du` breakdown done yet, recommend a dedicated investigation if it keeps growing.
3. Rory cleanup (error logs + old zip backups, ~5.7G) — awaiting user go-ahead before any deletion.
