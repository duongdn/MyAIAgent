# Server Monitor — 2026-04-17 09:40 (+07:00)

---

## Bailey

### Siteground (Prestashop)
**Status: LOGIN TIMEOUT** — Session expired, CAPTCHA required. Needs manual login.

### Console (Production) — ip-172-31-28-245

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 820 days | **WARNING (>365d)** |
| Disk | 67% (78G/117G) | OK |
| Memory | 6.6G avail / 7.7G (86%) | OK |
| Swap | 186M / 14.9G (1.2%) | OK |
| Load | 0.00 (2 cores) | OK |

Docker: wms-nov_app (Up 2h), sidekiq (Up 2h), redis (Up 5wk) — all healthy.

### Redis (Console)
Used: 56.88 MB (0.74% of system). Peak: 745.93 MB. Keys: 10,797. OK.

### Staging — ip-172-31-45-118

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 730 days | **WARNING (>365d)** |
| Disk | 51% (49G/97G) | OK |
| Memory | 2.2G avail / 3.8G (58%) | OK |
| Swap | 293M / 8G (3.6%) | OK |
| Load | 0.04/core (2 cores) | OK |

Docker: 7 containers all UP (app, sidekiq, redis, mailcatcher, db × 2 apps).

---

## Elena — SamGuard

### samguard.co — landing-page

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 74 days | OK |
| Disk | 44% (21G/48G) | OK |
| Memory | 1.1G avail / 1.9G (58%) | OK |
| Swap | 388M / 2G (19%) | **WARNING** |
| Load | 0.08 (1 core) | OK |

MySQL + Apache (6 workers) running. Swap elevated for small box.

---

## Neural Contract — Staging

### nc_staging — ip-172-31-29-53

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 16 days | OK |
| Disk | 26% (13G/49G) | OK |
| Memory | 2.8G avail / 3.8G (74%) | OK |
| Swap | **No swap** | **FLAG** |
| Load | 0.045/core (2 cores) | OK |

PHP-FPM (master + 3 workers) + MySQL running. No swap — add swap file recommended.

---

## Fountain

### Staging — Staging2

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 119 days | OK |
| Disk | **74% (36G/49G)** | **WARNING** |
| Memory | 4.9G avail / 7.8G (63%) | OK |
| Swap | 638M / 4G (16%) | WARNING |
| Load | 0.05/core (4 cores) | OK |

Puma (×2) + Sidekiq (×2) + Next.js running. Disk approaching threshold.

### Production — live-20240319

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | **759 days** | **WARNING (>365d)** |
| Disk | 64% (99G/155G) | OK |
| Memory | 3.5G avail / 7.8G (45%) | OK |
| Swap | **1.6G / 4G (40%)** | **CRITICAL** |
| Load | 0.08/core (4 cores) | OK |

Puma (×2, 3 workers) + Sidekiq (×2) + Next.js (×2) running. High swap from Puma workers (~600-700MB each).

---

## Marcel (XID)

| Server | Uptime | Load/core | Mem Avail | Swap | Disk | Status |
|--------|--------|-----------|-----------|------|------|--------|
| xid_sync_console | 4d | 0.00 | **22%** | 2.8% | 54% | **WARNING: mem** |
| xid_app_backend | **480d** | 0.00 | 58% | 3.4% | 30% | **WARNING: uptime** |
| xid_saas_backend | **860d** | 0.015 | 53% | 1.9% | 65% | **WARNING: uptime** |
| xid_saas_frontend | **813d** | 0.00 | 61% | 2.7% | 37% | **WARNING: uptime** |
| xid_app_backend.dev | 195d | 0.00 | 38% | **No swap** | 25% | **FLAG: no swap** |
| xid_sync_console.dev | 192d | 0.00 | 33% | 6.2% | 64% | OK |
| xid_sass_backend.dev | 195d | 0.04 | 47% | 7.0% | 42% | OK |

**Unreachable (5):** xidsg.com, xid_app_frontend, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev

---

## Rory (cPanel — GoDaddy)

| Metric | Value | Limit | Usage | Status |
|--------|-------|-------|-------|--------|
| Disk | 12 GB | 50 GB | 24% | OK |
| Files | 95,980 | 250,000 | 38% | OK |

Cleanup candidates (~5.1 GB):
- Error logs: booking/error_log.bk (879M), booking/error_log (694M), dev/error_log.bak (589M) = 2.2 GB
- ZIP backups: booking.20251003.zip (1.5G), booking.zip (1.4G) = 2.9 GB

---

## Summary

| Severity | Issue |
|----------|-------|
| **CRITICAL** | Fountain Prod swap 40% — restart workers or add RAM |
| **WARNING** | Fountain Staging disk 74% — cleanup needed |
| **WARNING** | Fountain Prod uptime 759d — schedule reboot |
| **WARNING** | Bailey Console uptime 820d — schedule reboot |
| **WARNING** | Bailey Staging uptime 730d — schedule reboot |
| **WARNING** | Marcel xid_saas_backend uptime 860d |
| **WARNING** | Marcel xid_saas_frontend uptime 813d |
| **WARNING** | Marcel xid_app_backend uptime 480d |
| **WARNING** | Marcel xid_sync_console mem avail 22% |
| **WARNING** | Elena swap 19% (small 1-core box) |
| **FLAG** | Neural Staging — no swap configured |
| **FLAG** | Marcel xid_app_backend.dev — no swap |
| **FLAG** | Marcel 5 servers unreachable |
| **INFO** | Siteground login timeout (CAPTCHA) |
| **INFO** | Rory ~5.1 GB cleanable (logs + backups) |

Trello: all 6 items ✓ complete.
