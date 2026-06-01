# Server Monitor — 2026-05-29 08:29

## Summary

| Project | Status | Key Issues |
|---------|--------|------------|
| Bailey | ⚠️ WARNING | Disk 79% (console), Siteground session expired |
| Elena SamGuard | 🔴 CRITICAL | Load avg 5.55–9.27 on 1-core, swap 24% |
| Neural Contract Staging | ⚠️ WARNING | No swap configured |
| Fountain | 🔴 CRITICAL | Staging swap FULL (4G/4G), disk 75% |
| Marcel XID | ⚠️ WARNING | 4 servers uptime >850d, 2 DNS fails, 2 timeouts |
| Rory | ✅ OK | 13G/50G (26%), ~5.7G deletable logs/zips |

---

## Bailey

### 1. Siteground (Prestashop)
**Status: ⚠️ SESSION EXPIRED** — Run `node scripts/siteground-storage.js --login` for manual re-auth.

### 2. Console (speedventory)
| Metric | Value | Status |
|--------|-------|--------|
| Disk | 92G/117G (79%) | ⚠️ WARNING |
| Memory | 751M/7.7G used | ✅ OK |
| Swap | 188M/14G (1.3%) | ✅ OK |
| Load avg | 0.00 / 0.00 / 0.00 | ✅ OK |
| Uptime | 861 days | ⚠️ Consider reboot |

**Docker containers:** 3 running ✓
- `wms-nov_app_1`: Up 29 min → 0.0.0.0:3000
- `wms-nov_sidekiq_1`: Up 29 min
- `wms-nov_redis_1`: Up 2 months → 0.0.0.0:6379

### 3. Redis
| Metric | Value | Status |
|--------|-------|--------|
| Memory used | 76.74 MB | ✅ OK |
| Peak memory | 745.93 MB (10.29% now) | ✅ OK |
| Keys (db0) | 1,735 | ✅ OK |
| Total keys all DBs | ~11,741 | ✅ OK |

### 4. Staging (staging.console.speedventory)
| Metric | Value | Status |
|--------|-------|--------|
| Disk | 51G/97G (53%) | ✅ OK |
| Memory | 1.1G/3.8G | ✅ OK |
| Swap | 310M/8G (3.9%) | ✅ OK |
| Load avg | 0.10 / 0.09 / 0.11 | ✅ OK |
| Uptime | 771 days | ⚠️ Consider reboot |

**Docker containers:** 6 running ✓ (console_new_app, console_new_sidekiq, console2_app, console2_sidekiq, redis, mailcatcher, db)

---

## Elena — WordPress SamGuard

| Metric | Value | Status |
|--------|-------|--------|
| Disk | 21G/48G (44%) | ✅ OK |
| Memory | 1.0G/1.9G (53% used) | ⚠️ WARNING |
| Swap | 477M/2G (24%) | ⚠️ WARNING |
| Load avg | 5.55 / 3.81 / 9.27 on **1 core** | 🔴 CRITICAL |
| Uptime | 11 days | ✅ OK |

**Processes:** MySQL (8.7% mem, 3.3% CPU) + Apache (multiple workers, each ~5% mem)
**Note:** Load avg 9.27 (15-min) on single-core is extremely high — multiple Apache workers saturating CPU. Investigate if this is sustained or a traffic spike.

---

## Neural Contract — Staging

| Metric | Value | Status |
|--------|-------|--------|
| Disk | 13G/49G (26%) | ✅ OK |
| Memory | 628M/3.8G (16.5%) | ✅ OK |
| Swap | None configured | ⚠️ WARNING |
| Load avg | 0.00 / 0.00 / 0.00 | ✅ OK |
| Uptime | 2 days 16h | ✅ OK |

**Processes:** MySQL (10.5% mem) + PHP-FPM master + 3 workers ✓

---

## Fountain

### 1. Staging (staging.fountaingifts.com)
| Metric | Value | Status |
|--------|-------|--------|
| Disk | 36G/49G (75%) | ⚠️ WARNING |
| Memory | 3.6G/7.8G (46%) | ✅ OK |
| Swap | **4G/4G (100%)** | 🔴 CRITICAL |
| Load avg | 0.39 / 0.08 / 0.04 on 4 cores | ✅ OK |
| Uptime | 161 days | ✅ OK |

**Processes:** Puma (fountain + infinity_roses) + Next.js + Sidekiq ✓
**Note:** Rake job `shipstation:reconcile_shipments` running at 98.3% CPU (transient). Swap full is the critical issue.

### 2. Production (fountaingifts.com)
| Metric | Value | Status |
|--------|-------|--------|
| Disk | 63G/155G (41%) | ✅ OK |
| Memory | 4.4G/7.8G (56%) | ✅ OK |
| Swap | 2G/8G (25%) | ✅ OK |
| Load avg | 0.70 / 0.34 / 0.33 on 4 cores | ✅ OK |
| Uptime | 800 days | ⚠️ Consider reboot |

**Processes:** Puma + Sidekiq (fountain + infinity_roses) + Next.js (x2) ✓

---

## Marcel (XID)

| Server | Disk | Mem Avail | Swap | Load | Uptime | Status |
|--------|------|-----------|------|------|--------|--------|
| xid_sync_console | 61% | 4.3G/15G | 53M/6G | 0.09 | 45d | ✅ OK |
| xid_app_backend | 30% | 156M/949M | 64M/2G | 0.08 | 522d ⚠️ | ✅ OK |
| xid_saas_backend | 65% | 94M/949M | 57M/2G | 0.00 | 902d ⚠️ | ✅ OK |
| xidsg.com | — | — | — | — | — | ❌ DNS FAIL |
| xid_app_frontend | 56% | 75M/953M | 26M/2G | 0.00 | 1114d ⚠️ | ✅ OK |
| xid_saas_frontend | 37% | 82M/949M | 51M/2G | 0.00 | 855d ⚠️ | ✅ OK |
| xid.stlodge | — | — | — | — | — | ❌ DNS FAIL |
| xid_app_backend.dev | 26% | 6.8M/453M | None ⚠️ | 0.00 | 237d | ✅ OK |
| xid_sync_console.dev | 68% | 77M/937M | 302M/6G | 0.01 | 234d | ✅ OK |
| xid_sass_backend.dev | 42% | 11M/453M | 68M/1G | 0.00 | 237d | ✅ OK |
| xid_sass_frontend.dev | — | — | — | — | — | ❌ TIMEOUT |
| xid_app_frontend.dev | — | — | — | — | — | ❌ TIMEOUT |
| xid_saas_backend.dev | 42% | same host | 67M/1G | 0.08 | 237d | ✅ OK |

**Reachable:** 9/13 | **DNS fails:** xidsg.com, xid.stlodge | **Timeouts:** xid_sass_frontend.dev, xid_app_frontend.dev

**Notable:** xid_app_frontend.dev has only 6.8MB free memory — may need investigation.

---

## Rory (cPanel — GoDaddy)

| Metric | Value | Limit | Status |
|--------|-------|-------|--------|
| Disk | 13G | 50G | ✅ OK (26%) |
| Files | 97,014 | 250,000 | ✅ OK |

**Top directories:**
- public_html/: 12G
- logs/: 92M
- tmp/: 79M

**Deletable items (~5.7G):**
| File | Size |
|------|------|
| public_html/booking/error_log | 1.2G |
| public_html/booking/error_log.bk | 879M |
| public_html/dev/error_log.bak.20251811 | 589M |
| public_html/dev/error_log | 131M |
| public_html/booking.20251003.zip | 1.5G (old 2021 backup) |
| public_html/booking.zip | 1.4G |

Recommend cleaning old zip backups + rotating error logs.

---

## Action Items

| Priority | Item | Action |
|----------|------|--------|
| 🔴 | Fountain staging swap 100% | Investigate swap usage; restart services or expand swap |
| 🔴 | Elena SamGuard load 9.27 (1-core) | Investigate traffic spike; check Apache configs |
| ⚠️ | Bailey console disk 79% | Monitor; clean up if approaching 85% |
| ⚠️ | Fountain staging disk 75% | Monitor disk growth |
| ⚠️ | Siteground session expired | `node scripts/siteground-storage.js --login` |
| ⚠️ | Neural Contract staging: no swap | Add swap file |
| ⚠️ | Marcel: xidsg.com, xid.stlodge DNS fail | Verify if these hosts are decommissioned |
| ⚠️ | Marcel: 4 servers uptime >855d | Schedule kernel update reboots |
| ℹ️ | Bailey console uptime 861d | Schedule reboot |
| ℹ️ | Fountain prod uptime 800d | Schedule reboot |
| ℹ️ | Rory: ~5.7G logs/zips | Clean with user confirmation |
