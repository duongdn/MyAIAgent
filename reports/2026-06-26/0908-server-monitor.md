# Server Monitor — 26/06/2026 09:08

**Overall Status: WARNING** — Fountain staging disk 77% + swap critical; swap warnings on Elena/Fountain prod; NC has no swap; Rory has large cleanup candidates

---

## Bailey

### 1. Siteground (Prestashop) — via SSH (dashboard session expired)

| Metric | Value | Status |
|--------|-------|--------|
| Disk total | ~29GB www usage | From bailey-monitor (08:47) |
| Storage alarms | 5.4GB / 5.5GB free (threshold 5GB) | ⚠️ WARNING — near threshold |
| Session | Expired | OK in Slack (no alarms) |

Top dirs: pre9.paturevision.fr (13G), staging-sg (7G), je-pature (7G), paturevision.fr (2.2G). No zip backups found.

### 2. Console LIVE (speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 890 days | OK |
| Load (2 cores) | 0.06 / 0.05 / 0.00 | ✅ OK |
| Memory | 948M used / 7.7G total (6.5G avail) | ✅ OK |
| Swap | 214.5M / 14.9G (1.4%) | ✅ OK |
| Disk / | 60G used / 117G (52%) | ✅ OK |

**Docker containers:**
| Container | Status |
|-----------|--------|
| wms-nov_app_1 | Up ~1h, port 3000 |
| wms-nov_sidekiq_1 | Up ~1h |
| wms-nov_redis_1 | Up 3 months |

**Redis:** used_memory=94.62MB, peak=745.93MB (now at 12.7% of peak — memory freed after nightly jobs), keys=1791

### 3. Staging Console (staging.console.speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 800 days | OK |
| Load (2 cores) | 0.00 / 0.03 / 0.04 | ✅ OK |
| Memory | 1.1G used / 3.8G (2.2G avail, 58%) | ✅ OK |
| Swap | 313.2M / 8.0G (3.9%) | ✅ OK |
| Disk / | 51G used / 97G (53%) | ✅ OK |

**Docker containers:** console_new_app_1, console_new_sidekiq_1, console2_app_1, console2_sidekiq_1, redis, mailcatcher, db — all Up ✅

**Bailey: ✅ All clear**

---

## Elena — WordPress SamGuard

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 39 days | OK |
| Load (1 core) | 0.27 / 0.12 / 0.22 | ✅ OK |
| Memory | 834M used / 1.9G (1.1G avail, 58%) | ✅ OK |
| Swap | 366.1M / 2.0G (18.3%) | ⚠️ WARNING |
| Disk / | 21G used / 48G (44%) | ✅ OK |
| MySQL | Running | ✅ OK |
| Apache | Running (6 workers) | ✅ OK |

Swap at 18.3% — acceptable but elevated. Monitor trend; no immediate action needed.

**Elena: ⚠️ Swap WARNING (18.3%)**

---

## Neural Contract — Contract Probe

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 30 days | OK |
| Load (2 cores) | 0.00 / 0.00 / 0.00 | ✅ OK |
| Memory | 643M used / 3.8G (2.8G avail, 74%) | ✅ OK |
| Swap | **None configured** | ⚠️ WARNING |
| Disk / | 13G used / 49G (27%) | ✅ OK |
| PHP-FPM | Running (3 workers + master) | ✅ OK |
| MySQL | Running | ✅ OK |

No swap is configured — if a spike pushes memory to limit, OOM killer will terminate processes. Low-risk given current memory headroom (74% available) but worth adding swap for safety.

**Neural Contract: ⚠️ No swap configured**

---

## Fountain

### 1. Staging (staging.fountaingifts.com)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 189 days | OK |
| Load (4 cores) | 0.00 / 0.37 / 0.39 (0.10/core) | ✅ OK |
| Memory | 3.1G used / 7.8G (4.2G avail, 54%) | ✅ OK |
| Swap | **2.7G / 4.0G (67.5%)** | 🔴 CRITICAL |
| Disk / | **37G used / 49G (77%)** | ⚠️ WARNING |

**Disk breakdown (77% — threshold 75%):**
| Path | Size | Note |
|------|------|------|
| /var/www | 20G | App data (4 apps) |
| /var/log/journal | 3.5G | 🗑️ Cleanable: `journalctl --vacuum-size=500M` |
| /var/log (total) | 3.6G | Includes btmp.1 (28M), btmp (26M), nginx (9M) |
| /snap | 1.4G | Snap packages |
| /usr | 2.4G | System packages |

**Recommended cleanup (requires confirmation):**
- `journalctl --vacuum-size=500M` → frees ~3GB
- `/var/log/btmp.1` + old auth logs → frees ~50MB

**Apps running:**
- staging_fountain_gifts_BE (puma + sidekiq) — Up
- staging_infinity_roses_BE (puma + sidekiq) — Up
- staging_fountain_gifts_FE (next-server v16.2.4) — Up

### 2. Production (fountaingifts.com)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 828 days | OK |
| Load (4 cores) | 0.22 / 0.47 / 0.43 (0.11/core) | ✅ OK |
| Memory | 4.5G used / 7.8G (2.9G avail, 37%) | ✅ OK |
| Swap | **2.3G / 8.0G (28.8%)** | ⚠️ WARNING |
| Disk / | 66G used / 155G (43%) | ✅ OK |

**Apps running:**
- fountain_gifts_BE: 2x puma workers + sidekiq — Up
- infinity_roses_BE: puma + sidekiq — Up
- next-server (v16.2.7 + v14.2.27) — 2 Next.js instances Up

Note: 2 Next.js versions running simultaneously (v14 and v16) — likely intentional for 2 different apps.

**Fountain: 🔴 Staging disk 77% + swap critical; ⚠️ Prod swap warning**

---

## Marcel (XID)

### Production Servers
| Host | Uptime | Load/core | Memory avail | Swap | Disk | Status |
|------|--------|-----------|--------------|------|------|--------|
| xid_sync_console | 73d | 0.28 (4c) | 13G / 15G (87%) | 46M/6G (0.8%) | 29G/49G (59%) | ✅ OK |
| xid_app_backend | 550d | 0.08 (2c) | 540M / 949M (57%) | 65M/2G (3.3%) | 5.9G/20G (31%) | ✅ OK |
| xid_saas_backend | 930d | 0.005 (2c) | 519M / 949M (55%) | 58M/2G (2.9%) | 13G/20G (65%) | ✅ OK |
| xid_app_frontend | 1142d | 0.00 (2c) | 609M / 953M (64%) | 26M/2G (1.3%) | 11G/20G (56%) | ✅ OK |
| xid_saas_frontend | 883d | 0.00 (2c) | 586M / 949M (62%) | 51M/2G (2.6%) | 7.2G/20G (38%) | ✅ OK |

### Dev / Staging Servers
| Host | Uptime | Load/core | Memory avail | Swap | Disk | Status |
|------|--------|-----------|--------------|------|------|--------|
| xid_app_backend.dev | 265d | 0.00 (2c) | 266M / 453M (59%) | 114M/1G (11.4%) | 5.1G/16G (33%) | ⚠️ Swap |
| xid_sync_console.dev | 262d | 0.04 (2c) | 306M / 937M (33%) | 407M/6G (6.8%) | 20G/29G (69%) | ✅ OK |
| xid_sass_backend.dev | 265d | 0.00 (2c) | 193M / 453M (43%) | 63M/1G (6.3%) | 6.5G/16G (43%) | ✅ OK |
| xid_saas_backend.dev | — | same as xid_sass_backend.dev | (same IP: ip-172-31-6-207) | — | — | — |

**Skipped (known dead):** xidsg.com, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev

Notes:
- xid_app_backend.dev swap at 11.4% — minor warning, 1G total is small
- xid_sync_console.dev disk at 69% — approaching 75% threshold, monitor
- xid_saas_backend.dev resolves to same host as xid_sass_backend.dev (both 172-31-6-207)

**Marcel: ✅ All production OK; minor swap warning on dev**

---

## Rory (cPanel — GoDaddy)

| Metric | Value | Status |
|--------|-------|--------|
| Total home | 14G / 50GB limit (28%) | ✅ OK |
| File count | 104,201 / 250,000 limit | ✅ OK |

**Large cleanup candidates (action needed — await confirmation):**
| Item | Size | Action |
|------|------|--------|
| booking/error_log | 1.2G | Truncate: `> ~/public_html/booking/error_log` |
| booking/error_log.bk | 879M | Delete |
| dev/error_log.bak.20251811 | 589M | Delete (dated backup) |
| dev/error_log | 137M | Truncate or rotate |
| booking.20251003.zip | 1.5G | Delete if backup no longer needed |
| booking.zip | 1.4G | Delete if backup no longer needed |
| **Total recoverable** | **~5.7GB** | — |

**Note:** Do NOT run cleanup commands without explicit user confirmation (per memory rule).

**Rory: ✅ Disk OK (28%) — ~5.7GB cleanup available**

---

## Summary

| Project | Host | Disk | Memory | Swap | Status |
|---------|------|------|--------|------|--------|
| Bailey Console | speedventory | 52% ✅ | OK ✅ | 1.4% ✅ | ✅ OK |
| Bailey Staging | staging.console.speedventory | 53% ✅ | OK ✅ | 3.9% ✅ | ✅ OK |
| Bailey Siteground | SSH | ~29G ✅ | N/A | N/A | ✅ OK |
| Elena SamGuard | samguard.co | 44% ✅ | OK ✅ | 18.3% ⚠️ | ⚠️ Swap |
| Neural Contract | nc_staging | 27% ✅ | OK ✅ | **None** ⚠️ | ⚠️ No swap |
| Fountain Staging | staging.fountaingifts.com | **77% ⚠️** | OK ✅ | **67.5% 🔴** | 🔴 WARNING |
| Fountain Prod | fountaingifts.com | 43% ✅ | OK ✅ | 28.8% ⚠️ | ⚠️ Swap |
| Marcel (prod x5) | xid_* | <65% ✅ | OK ✅ | <3% ✅ | ✅ OK |
| Marcel (dev x3) | xid_*.dev | <69% ✅ | OK ✅ | <11% ⚠️ | ✅ OK |
| Rory | rory.cpanel | 14G/50G ✅ | N/A | N/A | ✅ OK |

### Action Items (await confirmation before executing)
1. **Fountain Staging disk cleanup:** `journalctl --vacuum-size=500M` → frees ~3GB (disk 77→71%)
2. **Rory log cleanup:** Delete old error logs + backup zips → frees ~5.7GB
3. **NC Staging swap:** Add swap file (`fallocate -l 2G /swapfile && mkswap /swapfile && swapon /swapfile`)
