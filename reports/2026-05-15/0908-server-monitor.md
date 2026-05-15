# Server Monitor — 2026-05-15 09:08

## 🚨 CRITICAL — Elena SamGuard

| Metric | Value | Status |
|--------|-------|--------|
| Load avg (1m/5m/15m) | **111.27 / 36.49 / 13.72** | 🔴 CRITICAL (1 core) |
| Memory available | 76Mi / 1.9Gi (4%) | 🔴 CRITICAL |
| Swap used | 1.2G / 2.0G (60%) | 🔴 CRITICAL |
| Disk | 21G / 48G (44%) | ✅ OK |
| Uptime | 102 days | OK |

Top processes: mysql (5.6%), apache2 workers (multiple at ~3.8% MEM each).

**Server is under severe load — load average of 111 means ~111 tasks queued per second for a single core. Memory is 96% consumed, swap at 60%. Action needed immediately.**

Possible causes: traffic spike, runaway query, log flood, crawler, or misconfigured cron job.

---

## Bailey

### Console LIVE (speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Disk | 87G / 117G (75%) | ⚠️ WARNING |
| Memory available | 6.7G / 7.7G | ✅ OK |
| Swap used | 186M / 14.9G (1.2%) | ✅ OK |
| Load avg | 0.00 / 0.00 / 0.00 | ✅ OK |
| Uptime | 848 days | ⚠️ Consider reboot |

**Disk breakdown (75% — at threshold):**
- /home/ubuntu: 18G
- Docker images: 19.93GB (2.2GB reclaimable from unused)
- Docker containers (stopped): 511.9MB reclaimable
- Docker volumes (unused): 357.2MB reclaimable
- /var/log: 1.4GB (journal: 1.2GB)
- /var/lib/snapd: 1.2GB

Reclaimable via `docker system prune`: ~3.1GB. Journal pruning could free ~600MB+.

**Docker containers:** All up ✅
| Container | Status |
|-----------|--------|
| wms-nov_app_1 | Up ~1h |
| wms-nov_sidekiq_1 | Up ~1h |
| wms-nov_redis_1 | Up 2 months |

**Redis:**
- Used: 66.63MB (current), peak 745.93MB
- Keys: 11,383 across 6 DBs
- Status: ✅ OK

### Staging Console (staging.console.speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Disk | 50G / 97G (52%) | ✅ OK |
| Memory available | 2.2G / 3.8G | ✅ OK |
| Swap used | 301M / 8.0G (3.7%) | ✅ OK |
| Load avg | 0.04 / 0.12 / 0.09 | ✅ OK |
| Uptime | 758 days | ⚠️ Consider reboot |

**Docker containers:** All 6 up ✅
| Container | Status |
|-----------|--------|
| console_new_app_1 | Up ~1h |
| console_new_sidekiq_1 | Up ~1h |
| console2_app_1 | Up ~1h |
| console2_sidekiq_1 | Up ~1h |
| console_new_redis_1 | Up 2 months |
| console_new_mailcatcher_1 | Up 2 months |
| console_new_db_1 | Up 2 months |

### Siteground (Prestashop)
Session requires re-authentication — skipped. Run `node scripts/siteground-storage.js --login` to restore.

---

## Neural Contract — Staging

| Metric | Value | Status |
|--------|-------|--------|
| Disk | 13G / 49G (26%) | ✅ OK |
| Memory available | 2.8G / 3.8G | ✅ OK |
| Swap | **None configured** | ⚠️ WARNING |
| Load avg | 0.00 / 0.00 / 0.00 | ✅ OK |
| Uptime | 44 days | OK |

Note: ubuntu-release-upgrader ran briefly during check (34% CPU — transient, not a concern).

---

## Fountain

### Staging (Staging2)

| Metric | Value | Status |
|--------|-------|--------|
| Disk | 37G / 49G (76%) | ⚠️ WARNING |
| Memory available | 3.9G / 7.8G | ✅ OK |
| Swap used | 1.9G / 4.0G (47.5%) | ⚠️ WARNING |
| Load avg | 0.00 / 0.27 / 0.27 | ✅ OK |
| Uptime | 147 days | OK |

Processes: 2x puma + 2x sidekiq + 2x next-server running — multi-app staging (fountain_gifts + infinity_roses).

### Production (live-20240319)

| Metric | Value | Status |
|--------|-------|--------|
| Disk | 57G / 155G (37%) | ✅ OK |
| Memory available | 2.7G / 7.8G | ✅ OK |
| Swap used | 2.5G / 4.0G (62.5%) | ⚠️ WARNING |
| Load avg | 0.14 / 0.38 / 0.40 | ✅ OK |
| Uptime | 786 days | ⚠️ Consider reboot |

Processes: 2x puma workers, 2x next-server (v16 + v14), 2x sidekiq — all healthy.

---

## Marcel (XID)

### Production Servers

| Host | Disk | Mem Avail | Swap | Load/core | Uptime | Status |
|------|------|-----------|------|-----------|--------|--------|
| xid_sync_console | 54% | 13Gi/15Gi | OK | 0.35 | 31d | ✅ OK |
| xid_app_backend | 30% | 539M/949M | OK | 0.04 | **508d** | ⚠️ Reboot |
| xid_saas_backend | 65% | 506M/949M | OK | 0.00 | **888d** | ⚠️ Reboot |
| xid_app_frontend | 56% | 609M/953M | OK | 0.00 | **1100d** | ⚠️ Reboot |
| xid_saas_frontend | 37% | 586M/949M | OK | 0.04 | **841d** | ⚠️ Reboot |
| xidsg.com | — | — | — | — | — | ❌ DNS fail |
| xid.stlodge | — | — | — | — | — | ❌ DNS fail |

### Dev/Staging Servers

| Host | Disk | Mem Avail | Swap | Load/core | Status |
|------|------|-----------|------|-----------|--------|
| xid_app_backend.dev | 26% | 172M/453M | **None** | 0.00 | ⚠️ No swap |
| xid_sync_console.dev | 67% | 340Mi/937Mi | OK | 0.19 | ✅ OK |
| xid_sass_backend.dev | 42% | 210M/453M | OK | 0.00 | ✅ OK |
| xid_saas_backend.dev | 42% | 235M/453M | OK | 0.00 | ✅ OK |
| xid_sass_frontend.dev | — | — | — | — | ❌ Timeout |
| xid_app_frontend.dev | — | — | — | — | ❌ Timeout |

**xidsg.com** and **xid.stlodge** failed DNS — may be decommissioned or require SSH config update.  
**xid_sass_frontend.dev** and **xid_app_frontend.dev** timed out — check if stopped.

---

## Rory (cPanel GoDaddy)

| Metric | Value | Limit | Status |
|--------|-------|-------|--------|
| Disk | 12GB | 50GB (24%) | ✅ OK |
| Files | 96,646 | 250,000 (38%) | ✅ OK |

**Notable files:**
- `booking.zip`: 1.4GB (unknown age — check if needed)
- `booking.20251003.zip`: 1.5GB (Oct 2025 backup — can delete)
- `public_html/dev/error_log.bak.20251811` + `error_log`: large error logs
- `public_html/booking/error_log` + `error_log.bk`: large error logs

Cleanup: deleting Oct 2025 backup zip frees ~1.5GB. Error log `.bak` files can also be removed.

---

## Summary

| Project | Status | Key Issues |
|---------|--------|-----------|
| **Elena SamGuard** | 🔴 CRITICAL | Load 111, mem 96% used, swap 60% |
| Bailey Console | ⚠️ WARNING | Disk 75% (3.1GB reclaimable via docker prune) |
| Bailey Staging | ✅ OK | Uptime 758d |
| Neural Contract | ⚠️ WARNING | No swap configured |
| Fountain Staging | ⚠️ WARNING | Disk 76%, swap 47% |
| Fountain Prod | ⚠️ WARNING | Swap 62%, uptime 786d |
| Marcel XID Prod | ⚠️ WARNING | 4 servers >500d uptime; 2 DNS unreachable |
| Marcel XID Dev | ⚠️ WARNING | 2 hosts timeout; xid_app_backend.dev no swap |
| Rory | ✅ OK | 1.5GB old backup zip can be deleted |

## Uptime Flags (>365 days — consider kernel reboot)
- xid_app_frontend: **1100 days**
- xid_saas_backend: **888 days**
- xid_saas_frontend: **841 days**
- Bailey Console LIVE: **848 days**
- Fountain Prod: **786 days**
- Bailey Staging: **758 days**
- xid_app_backend: **508 days**

## Recommended Actions
1. 🔴 **SamGuard** — investigate load spike immediately (check Apache/MySQL logs, active connections)
2. ⚠️ **Bailey Console disk** — run `docker system prune` to reclaim ~3.1GB; prune journal logs
3. ⚠️ **Fountain Staging disk 76%** — check what's filling /dev/vda1
4. ⚠️ **Fountain Prod swap 62%** — monitor; add swap or upgrade if trend continues
5. ℹ️ **Rory** — delete `booking.20251003.zip` (1.5GB, Oct 2025 backup)
6. ℹ️ **Long uptimes** — schedule kernel reboots for XID prod servers + Bailey Console during low-traffic window
