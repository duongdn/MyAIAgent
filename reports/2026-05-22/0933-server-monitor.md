# Server Monitor — 2026-05-22 09:33

## Summary

| Project | Status | Key Issues |
|---------|--------|-----------|
| Bailey Console | ⚠️ WARNING | Disk 79%, uptime 855d |
| Bailey Siteground | ❌ BLOCKED | Session expired (manual re-auth needed) |
| Bailey Redis | ✅ OK | 71MB / 7.67GB |
| Bailey Staging | ✅ OK | Disk 52%, uptime 765d |
| Elena SamGuard | ✅ OK | Disk 44%, load 0.42 |
| Neural Contract Staging | ❌ UNREACHABLE | SSH timeout (2 attempts) |
| Fountain Staging | ⚠️ WARNING | Disk 76% |
| Fountain Production | ✅ OK | Disk 40%, swap 32% (watch) |
| Marcel XID Prod | ✅ OK | All reachable servers OK |
| Marcel XID Dev | ⚠️ PARTIAL | 2 servers timeout, 2 DNS fail |
| Rory cPanel | ✅ OK | 12GB/50GB, error logs 2.7GB (review) |

---

## Bailey

### Siteground (Prestashop)
- **Status: ❌ SESSION EXPIRED**
- Action needed: Run `node scripts/siteground-storage.js --login` for manual re-auth

### Console (speedventory) — Production
| Metric | Value | Status |
|--------|-------|--------|
| Disk / | 92G/117G (79%) | ⚠️ WARNING |
| Memory | 1.0G/7.7G | ✅ OK |
| Swap | 190MB/14.9G | ✅ OK |
| Load (1/5/15m) | 0.00/0.05/0.08 | ✅ OK |
| Uptime | 855 days | ⚠️ Reboot for kernel |

**Docker containers:** puma ✅, sidekiq ✅, redis ✅ (all Up)

**Disk breakdown (79% = ~92GB used):**
| Path | Size |
|------|------|
| /home | 23GB |
| /usr | 7.2GB |
| /snap | 3.4GB |
| /var/lib | 1.6GB |
| /var/log | 1.5GB |
| /tmp | 1.2GB |
| Docker images | 19.93GB total |
| Journal logs | 1.3GB |

**Reclaimable (needs approval before cleaning):**
- Docker images (unused): 2.212GB → `docker image prune -a`
- Stopped containers: 511.9MB → `docker container prune`
- Unused volumes: 357.2MB → `docker volume prune`
- Journal logs: 1.3GB → `journalctl --vacuum-size=500M`
- Snap old revisions: ~1-2GB → `snap list --all` then remove old
- **Total potential: ~5–6GB**

### Redis
| Metric | Value | Status |
|--------|-------|--------|
| Memory used | 71.34MB / 7.67GB (0.93%) | ✅ OK |
| Peak memory | 745.93MB | — |
| Total keys (db0) | 1,721 | ✅ OK |

### Staging Console (staging.console.speedventory)
| Metric | Value | Status |
|--------|-------|--------|
| Disk / | 51G/97G (52%) | ✅ OK |
| Memory | 1.1G/3.8G | ✅ OK |
| Swap | 309MB/8G | ✅ OK |
| Load | 0.06/0.06/0.07 | ✅ OK |
| Uptime | 765 days | ⚠️ Reboot for kernel |

**Docker containers:** console_new app+sidekiq ✅, console2 app+sidekiq ✅, redis ✅, mailcatcher ✅, db ✅

---

## Elena — WordPress SamGuard

| Metric | Value | Status |
|--------|-------|--------|
| Disk / | 21G/48G (44%) | ✅ OK |
| Memory | 850MB/1.9GB | ✅ OK |
| Swap | 415MB/2GB | ✅ OK |
| Load (1/5/15m) | 0.42/0.19/0.16 | ✅ OK |
| Uptime | 4 days | ✅ OK (recently rebooted) |

**Processes:** MySQL ✅ (9.8% mem), Apache ✅ (multiple workers 7-8% mem each)

---

## Neural Contract — Contract Probe

| Server | Status |
|--------|--------|
| nc_staging (52.65.197.217) | ❌ SSH CONNECTION TIMEOUT (2 attempts) |

Server is unreachable. Trello item NOT completed.

---

## Fountain

### Staging (staging.fountaingifts.com)

| Metric | Value | Status |
|--------|-------|--------|
| Disk / | 37G/49G (76%) | ⚠️ WARNING |
| Memory | 2.5GB/7.8GB (available 4.8GB) | ✅ OK |
| Swap | 773MB/4GB | ✅ OK |
| Load (1/5/15m) | 0.25/0.19/0.17 | ✅ OK |
| Uptime | 154 days | — |

**Processes:** Puma FountainGifts ✅, Puma InfinityRoses ✅, Sidekiq FountainGifts ✅, Sidekiq InfinityRoses ✅, Next.js ✅

**Disk breakdown (76% = ~37GB used):**
| Path | Size |
|------|------|
| /var/www/staging_fountain_gifts_BE | 4.5GB |
| /var/www/staging_infinity_roses_BE | 3.8GB |
| /var/www/staging_infinity_roses_FE | 3.5GB |
| /var/www/staging_fountain_gifts_FE | 3.2GB |
| /var/www/blogs | 670MB |
| /var/log/journal | 3.0GB |
| /var/lib (snapd+apt) | 1.1GB |
| /snap | 1.4GB |

**Reclaimable (needs approval):**
- Journal logs: 3.0GB → `journalctl --vacuum-size=500M` (saves ~2.5GB)
- Snap old revisions: check with `snap list --all`

### Production (fountaingifts.com)

| Metric | Value | Status |
|--------|-------|--------|
| Disk / | 62G/155G (40%) | ✅ OK |
| Memory | 4.4GB/7.8GB (available 3.0GB) | ✅ OK |
| Swap | 2.6GB/8GB (32%) | ⚠️ WATCH |
| Load (1/5/15m) | 0.02/0.18/0.26 | ✅ OK |
| Uptime | 794 days | ⚠️ Reboot for kernel |

**Processes:** Puma cluster workers x3 ✅, Next.js x2 (v16 + v14) ✅, Sidekiq x2 ✅

---

## Marcel (XID)

### Production Servers

| Host | Disk | Mem Avail | Swap | Load | Uptime | Status |
|------|------|-----------|------|------|--------|--------|
| xid_sync_console | 69% | 1.3G/15G | 71MB | 0.36 | 39d | ✅ OK |
| xid_app_backend | 30% | 169MB/949MB | 67MB | 0.00 | 515d | ⚠️ Reboot |
| xid_saas_backend | 65% | 68MB/949MB | 54MB | 0.00 | 895d | ⚠️ Reboot |
| xid_app_frontend | 56% | 87MB/953MB | 26MB | 0.00 | 1107d | ⚠️ Reboot |
| xid_saas_frontend | 37% | 69MB/949MB | 50MB | 0.00 | 848d | ⚠️ Reboot |
| xidsg.com | — | — | — | — | — | ❌ DNS FAIL |
| xid.stlodge | — | — | — | — | — | ❌ DNS FAIL |

### Dev/Staging Servers

| Host | Disk | Mem Avail | Swap | Uptime | Status |
|------|------|-----------|------|--------|--------|
| xid_app_backend.dev | 26% | 5MB/453MB | None | 230d | ⚠️ No swap |
| xid_sync_console.dev | 68% | 113MB/937MB | 323MB | 227d | ✅ OK |
| xid_sass_backend.dev | 42% | 12MB/453MB | 69MB | 230d | ✅ OK |
| xid_saas_backend.dev | 42% | 31MB/453MB | 69MB | 230d | ✅ OK |
| xid_sass_frontend.dev | — | — | — | — | ❌ Timeout |
| xid_app_frontend.dev | — | — | — | — | ❌ Timeout |

**Notes:**
- xidsg.com + xid.stlodge: DNS resolution failed (may be intentional decommission)
- xid_app_backend.dev: No swap configured
- 4 prod servers with 800+ day uptime → recommend kernel update reboots

---

## Rory (cPanel — GoDaddy)

| Metric | Value | Limit | Status |
|--------|-------|-------|--------|
| Disk usage | 12GB | 50GB (24%) | ✅ OK |
| File count | 97,294 | 250,000 (39%) | ✅ OK |

**Top directories:**
| Path | Size |
|------|------|
| ~/public_html/ | 12GB |
| ~/logs/ | 81MB |
| ~/tmp/ | 77MB |

**Error logs (large — review recommended):**
| File | Size |
|------|------|
| public_html/booking/error_log | 1.1GB |
| public_html/booking/error_log.bk | 879MB |
| public_html/dev/error_log.bak.20251811 | 589MB |
| public_html/dev/error_log | 130MB |
| **Total** | **~2.7GB** |

**ZIP backups (deletable if no longer needed):**
| File | Size |
|------|------|
| public_html/booking.20251003.zip | 1.5GB |
| public_html/booking.zip | 1.4GB |
| **Total** | **~2.9GB** |

Potential cleanup: ~5.6GB — awaiting confirmation before deleting anything.

---

## Action Items (awaiting approval)

| Server | Action | Potential savings |
|--------|--------|-------------------|
| Bailey Console | `docker image prune -a` | 2.2GB |
| Bailey Console | `docker container prune` + `docker volume prune` | 870MB |
| Bailey Console | `journalctl --vacuum-size=500M` | 800MB |
| Bailey Console | Remove old snap revisions | ~1-2GB |
| Fountain Staging | `journalctl --vacuum-size=500M` | ~2.5GB |
| Rory | Delete old error_log.bk + .bak files | ~1.5GB |
| Rory | Confirm booking.zip backups no longer needed | ~2.9GB |

---

## Alerts

1. **Bailey Console disk 79%** — above 75% threshold, ~5-6GB reclaimable
2. **Bailey Siteground** — session expired, manual re-auth required
3. **Neural Contract nc_staging** — SSH timeout (unreachable, 2 attempts)
4. **Fountain Staging disk 76%** — just above threshold, 3GB journal logs
5. **Fountain Production swap 32%** — watch, not critical yet
6. **Marcel xidsg.com + xid.stlodge** — DNS resolution failed
7. **Marcel xid_app_backend.dev** — no swap configured
8. **Multiple servers 800+ day uptime** — Bailey Console (855d), Fountain Prod (794d), xid_saas_backend (895d), xid_app_frontend (1107d), xid_saas_frontend (848d), xid_app_backend (515d), Bailey Staging (765d)

---

## Unresolved Questions

- Neural Contract nc_staging (52.65.197.217) timeout — firewall change or server down?
- xidsg.com + xid.stlodge DNS failures — intentionally decommissioned?
- Rory booking.zip backups (Oct 2025) — safe to delete?
