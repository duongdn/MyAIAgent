# Server Monitor — 2026-06-05 08:33

## Summary

| Project | Server | Disk | Mem | Swap | Load | Status |
|---------|--------|------|-----|------|------|--------|
| Bailey | Console (speedventory) | 50% | 13% | 1.3% | 0.03/core | ✅ OK |
| Bailey | Redis | 81MB / 7.7GB sys | — | — | — | ✅ OK |
| Bailey | Staging | 53% | 29% | 3.9% | 0.01/core | ✅ OK |
| Bailey | Siteground | — | — | — | — | ⚠️ Session expired |
| Elena | SamGuard | 44% | 46% | 18% | 0.18/core | ✅ OK |
| Neural | Staging | 26% | 17% | N/A | 0.00/core | ⚠️ No swap |
| Fountain | Staging | **76%** | 37% | 16% | 0.06/core | ⚠️ Disk WARNING |
| Fountain | Production | 42% | 56% | 29% | 0.07/core | ⚠️ Swap elevated |
| Marcel | xid_sync_console | 56% | 7% | 1% | 0.00/core | ✅ OK |
| Marcel | xid_app_backend | 30% | 24% | 3% | 0.00/core | ✅ OK |
| Marcel | xid_saas_backend | 65% | 28% | 3% | 0.00/core | ✅ OK |
| Marcel | xidsg.com | — | — | — | — | ❌ DNS FAIL |
| Marcel | xid_app_frontend | 56% | 17% | 1% | 0.00/core | ✅ OK |
| Marcel | xid_saas_frontend | 37% | 20% | 2% | 0.00/core | ✅ OK |
| Marcel | xid.stlodge | — | — | — | — | ❌ DNS FAIL |
| Marcel | xid_app_backend.dev | 26% | 59% | N/A | 0.00/core | ⚠️ No swap |
| Marcel | xid_sync_console.dev | 68% | 37% | 6% | 0.00/core | ✅ OK |
| Marcel | xid_sass_backend.dev | 42% | 50% | 5% | 0.00/core | ✅ OK |
| Marcel | xid_sass_frontend.dev | — | — | — | — | ❌ Timeout |
| Marcel | xid_app_frontend.dev | — | — | — | — | ❌ Timeout |
| Rory | cPanel (GoDaddy) | 12G/50GB (24%) | — | — | — | ⚠️ Logs/backups bloat |

---

## Bailey

### Console (speedventory)
- Disk: 58G/117G = **50%** ✅
- Mem: 993M/7.7G available = 6.4G ✅
- Swap: 188M/14G = 1.3% ✅
- Load: 0.05/0.04/0.06 on 2 cores ✅
- Docker: `wms-nov_app_1` Up 33min, `wms-nov_sidekiq_1` Up 33min, `wms-nov_redis_1` Up 2 months ✅
- Uptime: 868 days

### Redis
- Memory: 81MB used / 7.67GB system = ~1% ✅
- Peak: 745MB (10.87% of peak)
- Keys: db0=1749, db1=8420, db2=8, db3=2, db5=65, db6=1613 (11,857 total) ✅

### Staging (staging.console.speedventory)
- Disk: 51G/97G = **53%** ✅
- Mem: 1.1G/3.8G, available 2.3G ✅
- Swap: 308M/8G = 3.9% ✅
- Load: 0.02/0.03/0.00 on 2 cores ✅
- Docker: All containers healthy (console_new_app_1/sidekiq_1, console2_app_1/sidekiq_1 Up ~33min; redis/db/mailcatcher Up 3 months) ✅
- Uptime: 778 days

### Siteground (Prestashop)
- ⚠️ **SESSION_EXPIRED** — run `node scripts/siteground-storage.js --login` to re-auth

---

## Elena — WordPress SamGuard

- Disk: 21G/48G = **44%** ✅
- Mem: 872Mi/1.9Gi, available 1.1Gi ✅
- Swap: 353Mi/2.0Gi = **18%** ⚠️ (approaching 30% threshold)
- Load: 0.13/0.18/0.18 on 1 core ✅
- Uptime: 18 days ✅
- MySQL + Apache workers all running ✅

---

## Neural Contract — Staging

- Disk: 13G/49G = **26%** ✅
- Mem: 646Mi/3.8Gi, available 2.8Gi ✅
- Swap: **None configured** ⚠️ (0B)
- Load: 0.00/0.00/0.00 on 2 cores ✅
- Uptime: 9 days ✅
- MySQL + PHP-FPM running ✅

---

## Fountain

### Staging
- Disk: 37G/49G = **76%** ⚠️ **WARNING** (threshold 75%)
- Mem: 2.9Gi/7.8Gi, available 4.4Gi ✅
- Swap: 627Mi/4.0Gi = **16%** ⚠️
- Load: 0.23/0.16/0.10 on 4 cores ✅
- Uptime: 168 days ✅
- Puma (2× staging apps), Sidekiq (2×), Next.js — all running ✅

### Production
- Disk: 64G/155G = **42%** ✅
- Mem: 4.4Gi/7.8Gi, available 3.0Gi ✅ (56% used, within range)
- Swap: 2.3Gi/8.0Gi = **29%** ⚠️ (near 30% threshold)
- Load: 0.26/0.27/0.23 on 4 cores ✅
- Uptime: 807 days
- Puma (2× workers), Sidekiq (2×), Next.js (2× — v14.2.27 + v16.2.7) ✅

---

## Marcel (XID)

### Production Servers
| Host | Disk | Mem | Swap | Uptime | Status |
|------|------|-----|------|--------|--------|
| xid_sync_console | 56% 28G/49G | 1.1G/15G (7%) | 53M/6G | 52d | ✅ |
| xid_app_backend | 30% 5.8G/20G | 229M/949M (24%) | 64M/2G | 529d | ✅ |
| xid_saas_backend | 65% 13G/20G | 265M/949M (28%) | 58M/2G | 909d | ✅ |
| xidsg.com | DNS FAIL | — | — | — | ❌ dead |
| xid_app_frontend | 56% 11G/20G | 163M/953M (17%) | 26M/2G | 1121d | ✅ |
| xid_saas_frontend | 37% 7.2G/20G | 192M/949M (20%) | 50M/2G | 862d | ✅ |
| xid.stlodge | DNS FAIL | — | — | — | ❌ dead |

### Dev/Staging Servers
| Host | Disk | Mem | Swap | Uptime | Status |
|------|------|-----|------|--------|--------|
| xid_app_backend.dev | 26% 4G/16G | 243M/453M (54%) | 0/1G | 244d | ✅ |
| xid_sync_console.dev | 68% 20G/29G | 345Mi/937Mi (37%) | 389M/6G | 241d | ✅ |
| xid_sass_backend.dev | 42% 6.5G/16G | 228M/453M (50%) | 46M/1G | 244d | ✅ |
| xid_saas_backend.dev | 42% 6.5G/16G | 203M/453M (45%) | 46M/1G | 244d | ✅ |
| xid_sass_frontend.dev | **TIMEOUT** | — | — | — | ❌ |
| xid_app_frontend.dev | **TIMEOUT** | — | — | — | ❌ |

**Known dead**: `xidsg.com`, `xid.stlodge` (DNS fail), `xid_sass_frontend.dev`, `xid_app_frontend.dev` (timeout) — likely decommissioned

---

## Rory — cPanel (GoDaddy)

- Total home: **12GB / 50GB = 24%** ✅
- File count: **97,652 / 250,000** ✅

### ⚠️ Deletable Files (Space Savings)
| File | Size | Action |
|------|------|--------|
| `public_html/booking/error_log` | **1.2GB** | Truncate |
| `public_html/booking/error_log.bk` | **879MB** | Delete |
| `public_html/dev/error_log.bak.20251811` | **589MB** | Delete (old backup) |
| `public_html/dev/error_log` | 132MB | Truncate |
| `public_html/booking.20251003.zip` | **1.5GB** | Delete (Oct 2025 backup, stale) |
| `public_html/booking.zip` | **1.4GB** | Confirm before delete |
| **Total recoverable** | **~5.7GB** | |

> Disk is healthy now (24%), but error logs + old backups are a growing risk. Recommend cleanup on next maintenance window.

---

## Alerts Summary

| Severity | Issue | Action |
|----------|-------|--------|
| ⚠️ WARNING | Fountain Staging disk at **76%** | Monitor; clean old logs/tmp if growing |
| ⚠️ WARNING | Fountain Prod swap at **29%** (near threshold) | Monitor |
| ⚠️ WARNING | Bailey Siteground session expired | Re-auth with `--login` flag |
| ⚠️ INFO | Neural Staging: no swap | Low risk (staging), low load |
| ✅ FIXED | Marcel xid_app_backend.dev: 1G swap added + persisted in /etc/fstab | — |
| ⚠️ INFO | Rory: 5.7GB deletable logs/zips | Recommend cleanup |
| ❌ INFO | Marcel: xidsg.com, xid.stlodge DNS fail; xid_sass_frontend.dev, xid_app_frontend.dev timeout | Likely decommissioned |

---

## Trello
All 6 checklist items marked ✅ complete on "Check server status" card (board O83pAyqb).
