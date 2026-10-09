# Server Monitor — 2026-06-12 08:52 +07

## Summary Table

| Project | Server | Disk | Mem Avail | Swap Used | Load/Core | Status |
|---------|--------|------|-----------|-----------|-----------|--------|
| Bailey | Console (speedventory) | 51% | 86% | 1.3% | 0.00 | ✅ OK |
| Bailey | Redis | 85MB / 7.7GB sys | — | — | — | ✅ OK |
| Bailey | Staging | 53% | 60% | 4.0% | 0.04 | ✅ OK |
| Bailey | Siteground | — | — | — | — | ⚠️ Session expired |
| Elena | SamGuard | 44% | 58% | 20.6% | 0.20 | ✅ OK |
| Neural | Staging (nc_staging) | 27% | 74% | N/A | 0.00 | ⚠️ No swap |
| Fountain | Staging | **76%** | 59% | 15.9% | 0.02 | ⚠️ Disk WARNING |
| Fountain | Production | 41% | 47% | 13.8% | 0.09 | ✅ OK |
| Marcel | xid_sync_console | 58% | 87% | 0.8% | 0.02 | ✅ OK |
| Marcel | xid_app_backend | 30% | 58% | 3.3% | 0.00 | ✅ OK |
| Marcel | xid_saas_backend | 65% | 53% | 2.8% | 0.08 | ✅ OK |
| Marcel | xid_app_frontend | 56% | 64% | 1.3% | 0.00 | ✅ OK |
| Marcel | xid_saas_frontend | 38% | 61% | 2.3% | 0.00 | ✅ OK |
| Marcel | xid_app_backend.dev | 33% | 59% | 12% | 0.08 | ✅ OK |
| Marcel | xid_sync_console.dev | 68% | 32% | 6.7% | 0.08 | ✅ OK |
| Marcel | xid_sass_backend.dev | 42% | 46% | 5% | 0.00 | ✅ OK |
| Marcel | xid_saas_backend.dev | 42% | 52% | 5.1% | 0.08 | ✅ OK |
| Rory | cPanel (GoDaddy) | 13G/50GB (26%) | — | — | — | ✅ OK (logs bloat noted) |

---

## Bailey

### Console (speedventory) — ip-172-31-28-245
- Uptime: 876 days
- Disk: 59G/117G = **51%** ✅ (+1% vs last week)
- Mem: 742M/7.7G used, 6.7G available ✅
- Swap: 200M/14.9G = 1.3% ✅
- Load: 0.00, 0.00, 0.00 / 2 cores ✅
- Docker: `wms-nov_app_1` Up 52min, `wms-nov_sidekiq_1` Up 52min, `wms-nov_redis_1` Up 3 months ✅

### Redis (via Docker on Console)
- Used: **85.24M** (11.43% of peak 745MB)
- System: 7.67G
- Redis % of system: 1.1% ✅
- Keys: db0=1,762 | db1=8,584 | db2=8 | db3=6 | db5=70 | db6=1,613

### Staging — ip-172-31-45-118
- Uptime: 785 days
- Disk: 51G/97G = **53%** ✅ (stable)
- Mem: 1.1G/3.8G used, 2.3G available (60%) ✅
- Swap: 323M/8G = 4% ✅
- Load: 0.08, 0.02, 0.01 / 2 cores ✅
- Docker: console_new_app, console_new_sidekiq, console2_app, console2_sidekiq all Up ✅

### Siteground (Prestashop)
- **⚠️ Session expired** — needs `node scripts/siteground-storage.js --login` for manual re-auth

---

## Elena — WordPress SamGuard — landing-page

- Uptime: 25 days
- Disk: 21G/48G = **44%** ✅ (stable)
- Mem: 866Mi/1.9Gi used, 1.1Gi available (58%) ✅
- Swap: 411Mi/2.0Gi = **20.6%** ⚠️ (10-30% range, same as last week)
- Load: 0.20, 0.14, 0.10 / 1 core ✅
- MySQL (193MB RSS) + Apache workers running ✅

---

## Neural Contract — Staging — ip-172-31-29-53

- Uptime: 16 days
- Disk: 13G/49G = **27%** ✅ (+1% vs last week)
- Mem: 656Mi/3.8Gi used, 2.8Gi available (74%) ✅
- Swap: **None configured** ⚠️ (persistent — no change)
- Load: 0.00, 0.00, 0.00 / 2 cores ✅
- PHP-FPM + MySQL running ✅

---

## Fountain

### Staging — Staging2

- Uptime: 175 days
- Disk: 37G/49G = **76%** ⚠️ **WARNING** (stable vs last week, 75% threshold)
  - /var/www apps: 4.5G (FountainBE) + 3.9G (InfinityRosesBE) + 3.6G (InfinityRosesFE) + 2.6G (FountainFE) + 670M (blogs) = ~15.3G
  - /var/log: **3.4G** — log rotation likely needed
- Mem: 2.7Gi/7.8Gi used, 4.6Gi available (59%) ✅
- Swap: 636Mi/4.0Gi = **15.9%** ⚠️ (10-30% range)
- Load: 0.08, 0.04, 0.03 / 4 cores ✅
- Puma + Sidekiq + Next.js all running ✅

**Recommendation:** `/var/log` at 3.4G — run `logrotate` or purge old compressed logs. Disk stuck at 76% for 2+ weeks.

### Production — live-20240319

- Uptime: 814 days
- Disk: 64G/155G = **41%** ✅ (-1% vs last week)
- Mem: 3.6Gi/7.8Gi used, 3.7Gi available (47%) ✅
- Swap: 1.1Gi/8.0Gi = **13.8%** ⚠️ (10-30% range)
- Load: 0.34, 0.54, 0.37 / 4 cores ✅ (per-core max 0.135)
- Puma + Sidekiq + Next.js all running ✅

---

## Marcel (XID)

All 9 hosts connected — no failures.

| Host | IP | Disk | Mem Avail | Swap | Load/Core |
|------|----|------|-----------|------|-----------|
| xid_sync_console | 172-31-1-62 | 58% | 87% | 0.8% | 0.02 |
| xid_app_backend | 172-31-27-33 | 30% | 58% | 3.3% | 0.00 |
| xid_saas_backend | 172-31-24-231 | 65% | 53% | 2.8% | 0.08 |
| xid_app_frontend | 172-31-24-157 | 56% | 64% | 1.3% | 0.00 |
| xid_saas_frontend | 172-31-31-173 | 38% | 61% | 2.3% | 0.00 |
| xid_app_backend.dev | 172-31-1-202 | 33% | 59% | 12% | 0.08 |
| xid_sync_console.dev | 172-31-5-80 | 68% | 32% | 6.7% | 0.10 |
| xid_sass_backend.dev | 172-31-6-207 | 42% | 46% | 5% | 0.00 |
| xid_saas_backend.dev | 172-31-6-207 | 42% | 52% | 5.1% | 0.08 |

Notes:
- xid_sass_backend.dev and xid_saas_backend.dev share same IP (172-31-6-207) — same machine
- xid_sync_console.dev at **68%** disk (approaching 70% WARNING threshold)
- All containers/services running normally

---

## Rory (cPanel GoDaddy)

- Total disk: 13G / 50GB limit = **26%** ✅ (+1G vs last week)
- File count: 98,203 / 250,000 limit = 39% ✅
- Large items consuming disk:
  - `booking/error_log`: **1.2G** (active, growing)
  - `booking/error_log.bk`: 879M (old backup)
  - `dev/error_log.bak.20251811`: 589M (from Nov 2025, safe to delete)
  - `dev/error_log`: 134M
  - `booking.20251003.zip`: **1.5G** (backup from Oct 2025, safe to delete)
  - `booking.zip`: **1.4G** (safe to delete if confirmed stale)
  - Total freeable: ~4.4G (if old backups+bak removed)

**Recommendation:** Confirm with user before deleting backups. `error_log.bak.20251811` and `booking.20251003.zip` are clearly old.

---

## Trello

All 6 checklist items marked **complete** on "Check server status" card (board O83pAyqb).

---

## Disk Trend (vs 2026-06-05)

| Server | Last Week | This Week | Trend |
|--------|-----------|-----------|-------|
| Bailey Console | 50% | 51% | +1% |
| Bailey Staging | 53% | 53% | stable |
| Elena SamGuard | 44% | 44% | stable |
| Neural Staging | 26% | 27% | +1% |
| Fountain Staging | **76%** | **76%** | stable (2+ wks at WARNING) |
| Fountain Production | 42% | 41% | -1% |
| xid_sync_console | 56% | 58% | +2% |
| xid_saas_backend | 65% | 65% | stable |
| xid_sync_console.dev | 68% | 68% | stable |
| Rory | 12G | 13G | +1G |

---

## Alerts

1. **⚠️ Fountain Staging disk 76%** — stable at WARNING for 2+ weeks. `/var/log` 3.4G is primary candidate for cleanup. Recommend running `logrotate` on staging.
2. **⚠️ Bailey Siteground session expired** — manual re-auth needed (`--login` flag).
3. **⚠️ Neural Contract staging — no swap** — persistent, low risk given 74% free mem.
4. **ℹ️ Rory error logs** — 2.8G in old logs + 2.9G in old zips; no action needed now (disk at 26%), but confirm deletion when convenient.
