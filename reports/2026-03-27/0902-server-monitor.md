# Server Monitor — 2026-03-27 09:02

## Bailey

### Siteground (Prestashop) — SSH
| Path | Size |
|------|------|
| pre9.paturevision.fr/ | 13G |
| staging-sg.paturevision.fr/ | 7.2G |
| je-pature.paturevision.fr/ | 6.1G |
| queue7.paturevision.fr/ | 5.3G |
| paturevision.fr/ | 2.2G |
| **Total ~/www** | **45G** |
| ZIPs (cleanable) | 11.3G (update 6.1G + pre9 5.2G) |

Dashboard scraper: SESSION_EXPIRED (needs `--login`)

### Console LIVE (speedventory) — t3.large
| Metric | Value | Status |
|--------|-------|--------|
| Uptime | **799 days** | ⚠️ Consider reboot for kernel updates |
| Disk | 76G/117G (65%) | OK |
| Memory | 750M/7.7G used, 6.6G available (86% avail) | OK |
| Swap | 165M/14.9G (1%) | OK |
| Load | 0.22 (2 cores) = 0.11/core | OK |
| Docker | app ✓, sidekiq ✓, redis ✓ (all Up) | OK |

### Redis (Console LIVE)
| Metric | Value | Status |
|--------|-------|--------|
| Memory used | 45.16M | OK |
| Peak memory | 745.93M (current 6% of peak) | OK |
| System memory | 7.67G | OK (0.6% used) |
| Keys (db0) | 1,608 (1,601 with TTL) | OK |
| Keys (db1) | 7,869 | OK |
| Total keys | ~10,140 | OK |

### Staging (staging.console.speedventory) — t3.medium
| Metric | Value | Status |
|--------|-------|--------|
| Uptime | **709 days** | ⚠️ Consider reboot |
| Disk | 49G/97G (51%) | OK |
| Memory | 1.1G/3.8G used, 2.2G available (58% avail) | OK |
| Swap | 295M/8G (3.7%) | OK |
| Load | 0.00 (2 cores) | OK |
| Docker | 7 containers all Up (2x app, 2x sidekiq, redis, mailcatcher, db) | OK |

---

## Elena — WordPress SamGuard
| Metric | Value | Status |
|--------|-------|--------|
| Hostname | landing-page | |
| Uptime | 53 days | OK |
| Disk | 21G/48G (44%) | OK |
| Memory | 943M/1.9G used, 1.0G available (53% avail) | OK |
| Swap | 344M/2G (17%) | **WARNING** |
| Load | 0.15 (1 core) = 0.15/core | OK |
| MySQL | Running (11% mem) | OK |
| Apache | 6 workers (7-9% mem each) | OK |

---

## Neural Contract — Contract Probe
| Metric | Value | Status |
|--------|-------|--------|
| SSH | **Connection timed out** | **CRITICAL** |

⚠️ nc_staging (52.65.197.217:22) unreachable

---

## Fountain

### Staging (Staging2)
| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 98 days | OK |
| Disk | 37G/49G (**76%**) | **WARNING** |
| Memory | 3.1G/7.8G used, 4.1G available (53% avail) | OK |
| Swap | 604M/4G (15%) | WARNING |
| Load | 0.75 (4 cores) = 0.19/core | OK |
| Processes | Puma ✓, Sidekiq ✓ (fountain + infinity roses), Next.js ✓ | OK |

### Production (live-20240319)
| Metric | Value | Status |
|--------|-------|--------|
| Uptime | **737 days** | ⚠️ Consider reboot |
| Disk | 97G/155G (63%) | OK |
| Memory | 4.2G/7.8G used, 3.2G available (41% avail) | OK |
| Swap | **1.4G/4G (35%)** | **WARNING** |
| Load | 2.86 (4 cores) = 0.72/core | WARNING (near threshold) |
| Processes | Puma ✓ (fountain + infinity roses), Sidekiq ✓, Next.js ✓ | OK |

---

## Marcel (XID)

### Production
| Server | Disk | Memory Avail | Swap | Load (/core) | Status |
|--------|------|-------------|------|-------------|--------|
| xid_sync_console | 33G/49G (68%) | 1.2G/1.9G (63%) | 211M/6G (3%) | 0.12/1 | OK |
| xid_app_backend | 15G/20G (**75%**) | 565M/949M (60%) | 69M/2G (3%) | 0.00/2 | **WARNING disk** |
| xid_saas_backend | 13G/20G (65%) | 480M/949M (51%) | 41M/2G (2%) | 0.00/2 | OK |
| xidsg.com | — | — | — | — | **FAILED** (timeout) |
| xid_app_frontend | — | — | — | — | **FAILED** (host key) |
| xid_saas_frontend | — | — | — | — | **FAILED** (host key) |
| xid.stlodge | — | — | — | — | **FAILED** (refused) |

### Dev/Staging
| Server | Disk | Memory Avail | Swap | Load (/core) | Status |
|--------|------|-------------|------|-------------|--------|
| xid_app_backend.dev | 14G/16G (**86%**) | 183M/453M (40%) | **No swap** | 0.00/2 | **CRITICAL disk** ⚠️ No swap |
| xid_sync_console.dev | 19G/29G (65%) | 197M/937M (21%) | 370M/6G (6%) | 0.08/2 | OK (mem low-ish) |
| xid_sass_backend.dev | 12G/16G (74%) | 215M/453M (47%) | 68M/1G (7%) | 0.00/2 | WARNING disk |
| xid_sass_frontend.dev | — | — | — | — | **FAILED** (timeout) |
| xid_app_frontend.dev | — | — | — | — | **FAILED** (timeout) |
| xid_saas_backend.dev | 12G/16G (74%) | 241M/453M (53%) | 68M/1G (7%) | 0.08/2 | OK |

**Uptime notes:** xid_app_backend 459d, xid_saas_backend 839d — consider reboot

---

## Rory (cPanel — GoDaddy)
| Metric | Value | Limit | Status |
|--------|-------|-------|--------|
| Disk | 12G | 50G | OK (24%) |
| File count | 96,042 | 250,000 | OK (38%) |

### Cleanable Files
| Type | Path | Size |
|------|------|------|
| Error log backup | booking/error_log.bk | **879M** |
| Error log backup | dev/error_log.bak.20251811 | **589M** |
| Error log | booking/error_log | 170M |
| Error log | dev/error_log | 68M |
| ZIP backup | booking.20251003.zip | 1.5G |
| ZIP backup | booking.zip | 1.4G |
| **Total cleanable** | | **~4.6G** |

---

## Summary

| Project | Status | Issues |
|---------|--------|--------|
| **Bailey** | OK | Uptime 799d (console), 709d (staging). Siteground session expired. |
| **Elena WP** | OK | Swap 17% (warning threshold) |
| **Neural Contract** | **CRITICAL** | SSH connection timed out |
| **Fountain Staging** | **WARNING** | Disk 76%, swap 15% |
| **Fountain Prod** | **WARNING** | Swap 35%, load 0.72/core, uptime 737d |
| **Marcel Prod** | **WARNING** | 4/7 servers unreachable. xid_app_backend disk 75% |
| **Marcel Dev** | **CRITICAL** | xid_app_backend.dev disk 86%, no swap. 2/5 servers unreachable |
| **Rory** | OK | 4.6G cleanable (error logs + zips) |

## Unresolved Questions
1. **NC staging** — why is SSH unreachable? Firewall change or instance down?
2. **Marcel** — xidsg.com, xid_app_frontend, xid_saas_frontend, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev all unreachable. Is this expected?
3. **xid_app_backend.dev** at 86% disk with no swap — needs cleanup urgently
4. **Fountain prod** swap at 35% and load 0.72/core — approaching thresholds, monitor closely
