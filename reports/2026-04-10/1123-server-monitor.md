# Server Monitor — 2026-04-10 (11:23 +07:00)

---

## Bailey

### Console LIVE (speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-28-245 | |
| Uptime | **813 days** | ⚠️ Consider reboot for kernel updates |
| CPU cores | 2 | |
| Load avg | 0.11, 0.04, 0.01 | OK (0.06/core) |
| Memory | 1.0G / 7.7G used (6.3G avail) | OK (82% avail) |
| Swap | 168M / 14.9G | OK (1.1%) |
| Disk | 77G / 117G (66%) | OK |

**Docker containers:** All UP
- wms-nov_app_1 (Puma 6.3.1) — Up 3h
- wms-nov_sidekiq_1 — Up 3h, 0/10 busy
- wms-nov_redis_1 — Up 4 weeks

### Redis (on Console)

| Metric | Value | Status |
|--------|-------|--------|
| Used memory | 55.99 MB | OK (0.7% of 7.67G system) |
| Peak memory | 745.93 MB | |
| Peak ratio | 7.51% of peak | OK (well below peak) |
| Keys (db0) | 1,636 (1,629 with TTL) | OK |
| Keys (db1) | 7,870 | OK |
| Total keys | 10,575 | OK |

### Bailey Staging (staging.console.speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-45-118 | |
| Uptime | **723 days** | ⚠️ Consider reboot for kernel updates |
| CPU cores | 2 | |
| Load avg | 0.03, 0.06, 0.01 | OK |
| Memory | 1.2G / 3.8G used (2.2G avail) | OK (58% avail) |
| Swap | 292M / 8G | OK (3.6%) |
| Disk | 49G / 97G (51%) | OK |

**Docker containers:** All UP (7 containers)
- console_new_app_1, console2_app_1 (2 Puma instances)
- console_new_sidekiq_1, console2_sidekiq_1 (2 Sidekiq workers)
- console_new_redis_1, console_new_mailcatcher_1, console_new_db_1

### Siteground (Prestashop)
Session expired — see Bailey Monitor report for SSH disk data.
- **Storage: 75% (123G/164G)** ⚠️ WARNING

### Bailey Status: ✓ Complete

---

## Elena — WordPress SamGuard

### SamGuard (samguard.co)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | landing-page | |
| Uptime | 67 days | OK |
| CPU cores | 1 | |
| Load avg | 0.13, 0.06, 1.04 | ⚠️ 15min avg 1.04/core — recent spike |
| Memory | 732M / 1.9G used (1.2G avail) | OK (63% avail) |
| Swap | 479M / 2G | ⚠️ WARNING (24%) |
| Disk | 21G / 48G (43%) | OK |

**Processes:** MySQL (8.1% mem), Apache2 workers (~5% each, 6 workers). All healthy.

**Issues:**
- Swap usage 24% — indicates memory pressure at times
- Load 15min avg = 1.04 — was under load recently, now recovered (1min = 0.13)

### Elena Status: ✓ Complete

---

## Neural Contract — Contract Probe

### Staging (nc_staging)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-29-53 | |
| Uptime | 9 days | OK |
| CPU cores | 2 | |
| Load avg | 0.01, 0.01, 0.00 | OK |
| Memory | 697M / 3.8G used (2.8G avail) | OK (74% avail) |
| Swap | **None configured** | ⚠️ No swap |
| Disk | 13G / 49G (25%) | OK |

**Processes:** MySQL (10.6% mem), PHP-FPM pool (3 workers). All healthy.

**Issue:** No swap configured — under memory pressure, OOM killer will terminate processes.

### Neural Contract Status: ✓ Complete

---

## Fountain

### Staging (Staging2)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | Staging2 | |
| Uptime | 112 days | OK |
| CPU cores | 4 | |
| Load avg | 0.03, 0.06, 0.16 | OK |
| Memory | 2.3G / 7.8G used (4.9G avail) | OK (63% avail) |
| Swap | 1.0G / 4G | ⚠️ WARNING (25%) |
| Disk | 36G / 49G (74%) | ⚠️ WARNING (approaching 75%) |

**Processes:** 2 Puma workers (Fountain + InfinityRoses), 2 Sidekiq workers, Next.js server. All healthy.

### Production (live-20240319)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | live-20240319 | |
| Uptime | **752 days** | ⚠️ Consider reboot for kernel updates |
| CPU cores | 4 | |
| Load avg | 0.12, 0.19, 0.30 | OK |
| Memory | 4.3G / 7.8G used (3.1G avail) | OK (40% avail) |
| Swap | **1.7G / 4G** | ⚠️ WARNING (43%) |
| Disk | 98G / 155G (64%) | OK |

**Processes:** 2 Puma clusters (Fountain + InfinityRoses), 2 Sidekiq workers, 2 Next.js servers. All healthy.

**Issues:**
- **Swap 43%** — significant swap usage, indicates memory pressure
- Uptime 752 days — long overdue for kernel update reboot

### Fountain Status: ✓ Complete

---

## Marcel (XID)

### Production Servers

| Server | Hostname | Uptime | Load/core | Mem avail | Swap | Disk | Status |
|--------|----------|--------|-----------|-----------|------|------|--------|
| xid_sync_console | ip-172-31-1-62 | 7d | 0.45 | 12G/15G (80%) | 0/6G | 42% | OK |
| xid_app_backend | ip-172-31-27-33 | 473d | 0.00 | 550M/949M (58%) | 69M/2G | 30% | OK |
| xid_saas_backend | ip-172-31-24-231 | **853d** | 0.00 | 472M/949M (50%) | 47M/2G | **65%** | ⚠️ Uptime, disk |
| xidsg.com | — | — | — | — | — | — | **UNREACHABLE** (DNS) |
| xid_app_frontend | — | — | — | — | — | — | **UNREACHABLE** (host key) |
| xid_saas_frontend | ip-172-31-31-173 | **806d** | 0.00 | 583M/949M (61%) | 55M/2G | 37% | ⚠️ Uptime |
| xid.stlodge | — | — | — | — | — | — | **UNREACHABLE** (DNS) |

### Dev/Staging Servers

| Server | Hostname | Uptime | Load/core | Mem avail | Swap | Disk | Status |
|--------|----------|--------|-----------|-----------|------|------|--------|
| xid_app_backend.dev | ip-172-31-1-202 | 189d | 0.08 | 179M/453M (40%) | **None** | 25% | ⚠️ No swap |
| xid_sync_console.dev | ip-172-31-5-80 | 185d | 0.01 | 420M/937M (45%) | 440M/6G (7%) | **64%** | OK |
| xid_sass_backend.dev | ip-172-31-6-207 | 189d | 0.00 | 218M/453M (48%) | 63M/1G | 42% | OK |
| xid_sass_frontend.dev | — | — | — | — | — | — | **UNREACHABLE** (timeout) |
| xid_app_frontend.dev | — | — | — | — | — | — | **UNREACHABLE** (timeout) |
| xid_saas_backend.dev | ip-172-31-6-207 | 189d | 0.04 | 244M/453M (54%) | 63M/1G | 42% | OK (same host as sass_backend.dev) |

**Unreachable servers (4):** xidsg.com, xid_app_frontend, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev

### Marcel Status: ✓ Complete

---

## Rory (cPanel — GoDaddy)

| Metric | Value | Limit | Status |
|--------|-------|-------|--------|
| Disk usage | 12 GB | 50 GB | OK (24%) |
| File count | 99,511 | 250,000 | OK (40%) |

### Top Directories

| Directory | Size |
|-----------|------|
| public_html/ | 12 GB |
| logs/ | 336 MB |
| access-logs/ | 190 MB |
| tmp/ | 88 MB |

### Deletable Files

| File | Size | Note |
|------|------|------|
| public_html/booking/error_log.bk | **879 MB** | Old error log backup |
| public_html/dev/error_log.bak.20251811 | **589 MB** | Old error log backup |
| public_html/booking/error_log | **536 MB** | Active error log (can truncate) |
| public_html/dev/error_log | 70 MB | Active error log |
| public_html/booking.20251003.zip | **1.5 GB** | Old backup |
| public_html/booking.zip | **1.4 GB** | Old backup |

**Potential cleanup: ~5 GB** from old error logs + zip backups.

### Rory Status: ✓ Complete

---

## Summary

| Project | Server | Disk | Memory | Swap | Load | Status |
|---------|--------|------|--------|------|------|--------|
| **Bailey** | Console LIVE | 66% OK | 82% OK | 1% OK | OK | ⚠️ 813d uptime |
| | Staging | 51% OK | 58% OK | 4% OK | OK | ⚠️ 723d uptime |
| | Siteground | **75% ⚠️** | — | — | — | WARNING |
| | Redis | — | 0.7% OK | — | — | OK |
| **Elena** | SamGuard | 43% OK | 63% OK | **24% ⚠️** | OK | ⚠️ Swap |
| **Neural** | nc_staging | 25% OK | 74% OK | **None ⚠️** | OK | ⚠️ No swap |
| **Fountain** | Staging | **74% ⚠️** | 63% OK | **25% ⚠️** | OK | WARNING |
| | Production | 64% OK | 40% OK | **43% ⚠️** | OK | ⚠️ 752d uptime + swap |
| **Marcel** | 8 reachable | OK | OK | Mixed | OK | 4 unreachable |
| **Rory** | cPanel | 24% OK | — | — | — | OK (5GB cleanable) |

### Trello
All 6 items ✓ complete on "Check server status" card.

### Critical Issues
1. **Fountain Production swap 43%** — memory pressure, may degrade under load
2. **4 Marcel servers unreachable** — xidsg.com, xid_app_frontend, xid.stlodge, xid_sass/app_frontend.dev

### Warnings
3. Bailey Siteground storage at 75% threshold
4. Fountain Staging disk 74% — approaching threshold
5. Elena SamGuard swap 24% — moderate memory pressure
6. Neural Contract no swap configured — OOM risk
7. Long uptimes: Bailey Console 813d, Bailey Staging 723d, Fountain Prod 752d, XID saas_backend 853d, XID saas_frontend 806d

### Recommended Cleanup (requires confirmation)
8. Rory: ~5 GB cleanable (old error logs + zip backups)
9. Bailey Siteground: pre9 (19GB), queue7 (5.3GB) candidates
