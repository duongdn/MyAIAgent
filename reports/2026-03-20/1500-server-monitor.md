# Server Monitor — 2026-03-20

## Bailey

### Siteground (Prestashop)

| Metric | Value | Status |
|--------|-------|--------|
| SSD Space | 167.23 GB total | |
| Used | 135.97 GB (81.3%) | WARNING |
| Free | 31.27 GB (18.7%) | |
| paturevision.fr | 125.5 GB | |
| System | 10.47 GB | |
| CPU | 23 Cores | OK |
| RAM | 20 GB | OK |
| Plan expires | Apr 22, 2026 | |

**Status: WARNING** — Storage at 81.3%, approaching 85% threshold

### Console (ssh speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-28-245 | |
| Uptime | 792 days | WARNING (kernel) |
| CPU | 2 cores | |
| Load avg | 0.24, 0.16, 0.18 | OK |
| RAM | 7.7G total, 5.8G available (75%) | OK |
| Swap | 14G total, 146M used (1%) | OK |
| Disk (/) | 117G total, 74G used (64%) | OK |

Docker: app (Up 4h), sidekiq (Up 4h), redis (Up 9d) — all healthy
Top: puma 840MB/20%CPU, sidekiq 512MB/1.5%CPU

**Status: OK**

### Redis (Docker on Console)

| Metric | Value | Status |
|--------|-------|--------|
| Memory used | 41.53 MB | OK |
| Peak memory | 745.93 MB (5.57% of peak) | OK |
| DB0 keys | 1,594 (1,587 with TTL) | OK |
| DB1 keys | 7,869 (no TTL) | OK |

**Status: OK**

### Staging (ssh staging.console.speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-45-118 | |
| Uptime | 702 days | WARNING (kernel) |
| CPU | 2 cores | |
| Load avg | 0.13, 0.14, 0.07 | OK |
| RAM | 3.8G total, 2.2G available (58%) | OK |
| Swap | 8G total, 296M used (3.6%) | OK |
| Disk (/) | 97G total, 49G used (51%) | OK |

Docker: 2 app instances (console_new + console2), 2 sidekiq, redis, mailcatcher, db — all healthy

**Status: OK**

### Bailey Summary

| Server | Disk | Memory | Swap | Load | Overall |
|--------|------|--------|------|------|---------|
| Siteground | WARNING (81%) | OK | N/A | OK | **WARNING** |
| Console | OK (64%) | OK (75% avail) | OK (1%) | OK | OK |
| Redis | N/A | OK (42MB) | N/A | N/A | OK |
| Staging | OK (51%) | OK (58% avail) | OK (4%) | OK | OK |

Trello: Bailey ✓

---

## Elena — WordPress SamGuard

### SamGuard (ssh samguard.co)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | landing-page | |
| Uptime | 46 days | OK |
| CPU | 1 core | |
| Load avg | 0.09, 0.07, 0.03 | OK |
| RAM | 1.9G total, 948M available (49%) | OK |
| Swap | 2G total, 196M used (10%) | OK (borderline) |
| Disk (/) | 48G total, 21G used (44%) | OK |

Stack: Apache + MySQL (bare-metal WordPress, no Docker)
Top: MySQL 344MB (17%), Apache 6 workers ~165MB each (8%)

**Status: OK**

### Elena Summary

| Server | Disk | Memory | Swap | Load | Overall |
|--------|------|--------|------|------|---------|
| SamGuard | OK (44%) | OK (49% avail) | OK (10%) | OK | OK |

Trello: Elena - WordPress SamGuard ✓

---

## Neural Contract — Contract Probe

### Staging (ssh nc_staging)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-29-53 | |
| Uptime | 18 days | OK |
| CPU | 2 cores | |
| Load avg | 0.01, 0.00, 0.00 | OK |
| RAM | 3.8G total, 2.8G available (74%) | OK |
| Swap | None configured | WARNING |
| Disk (/) | 49G total, 12G used (24%) | OK |

Stack: PHP-FPM 8.2 + MySQL (bare-metal, no Docker)
Top: MySQL 428MB (10.8%), PHP-FPM 2 workers ~66MB each

**Status: OK** — Very light usage. No swap configured (risk if memory spikes).

### Neural Contract Summary

| Server | Disk | Memory | Swap | Load | Overall |
|--------|------|--------|------|------|---------|
| nc_staging | OK (24%) | OK (74% avail) | WARNING (none) | OK | OK |

Trello: Neural Contract - Contract Probe ✓

---

## Fountain

### Staging (ssh staging.fountaingifts.com)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | Staging2 | |
| Uptime | 92 days | OK |
| CPU | 4 cores | |
| Load avg | 0.02, 0.08, 0.17 | OK |
| RAM | 7.8G total, 4.7G available (60%) | OK |
| Swap | 4G total, 858M used (21%) | WARNING |
| Disk (/) | 49G total, 38G used (79%) | WARNING |

Stack: Puma + Sidekiq (Fountain + Infinity Roses) + Next.js, no Docker
Top: sidekiq 486MB, puma workers ~460MB each, next-server 218MB

**Status: WARNING** — Disk at 79%, swap at 21%

### Production (ssh fountaingifts.com)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | live-20240319 | |
| Uptime | 731 days | WARNING (kernel) |
| CPU | 4 cores | |
| Load avg | 0.41, 0.33, 0.33 | OK |
| RAM | 7.8G total, 3.5G available (45%) | OK |
| Swap | 4G total, 1.3G used (33%) | WARNING |
| Disk (/) | 155G total, 97G used (62%) | OK |

Stack: Puma + Sidekiq (Fountain + Infinity Roses) + Next.js x2, no Docker
Top: puma worker 823MB (10%), next-server 438MB, sidekiq 401MB

**Status: WARNING** — Swap at 33%, uptime 731 days (kernel updates needed)

### Fountain Summary

| Server | Disk | Memory | Swap | Load | Overall |
|--------|------|--------|------|------|---------|
| Staging | WARNING (79%) | OK (60% avail) | WARNING (21%) | OK | **WARNING** |
| Production | OK (62%) | OK (45% avail) | WARNING (33%) | OK | **WARNING** |

Trello: Fountain ✓

---

## Marcel (XID)

### Production Servers

| Host | Hostname | Uptime | CPU | Load | RAM (avail) | Swap | Disk | Status |
|------|----------|--------|-----|------|-------------|------|------|--------|
| xid_sync_console | ip-172-31-1-62 | 146d | 1 | 0.14 | 1.9G (1.2G/63%) | 6G/356M (6%) | 49G/34G (70%) | OK |
| xid_app_backend | ip-172-31-27-33 | 452d | 2 | 0.08 | 949M (581M/61%) | 2G/67M (3%) | 20G/15G (74%) | WARNING (uptime+disk) |
| xid_saas_backend | ip-172-31-24-231 | **833d** | 2 | 0.00 | 949M (495M/52%) | 2G/39M (2%) | 20G/13G (64%) | WARNING (uptime) |
| xidsg.com | — | — | — | — | — | — | — | **UNREACHABLE** |
| xid_app_frontend | — | — | — | — | — | — | — | **HOST KEY FAIL** |
| xid_saas_frontend | — | — | — | — | — | — | — | **HOST KEY FAIL** |
| xid.stlodge | — | — | — | — | — | — | — | **UNREACHABLE** |

### Dev/Staging Servers

| Host | Hostname | Uptime | CPU | Load | RAM (avail) | Swap | Disk | Status |
|------|----------|--------|-----|------|-------------|------|------|--------|
| xid_app_backend.dev | ip-172-31-1-202 | 168d | 2 | 0.00 | 453M (199M/44%) | None | 16G/14G (**86%**) | **CRITICAL (disk)** |
| xid_sync_console.dev | ip-172-31-5-80 | 164d | 2 | 0.16 | 937M (248M/26%) | 6G/375M (6%) | 29G/19G (65%) | WARNING (low RAM) |
| xid_sass_backend.dev | ip-172-31-6-207 | 168d | 2 | 0.16 | 453M (213M/47%) | 1G/48M (5%) | 16G/12G (74%) | OK |
| xid_sass_frontend.dev | — | — | — | — | — | — | — | **UNREACHABLE** |
| xid_app_frontend.dev | — | — | — | — | — | — | — | **UNREACHABLE** |
| xid_saas_backend.dev | ip-172-31-6-207 | 168d | 2 | 0.13 | 453M (239M/53%) | 1G/49M (5%) | 16G/12G (74%) | OK |

Note: xid_sass_backend.dev and xid_saas_backend.dev resolve to same host (ip-172-31-6-207)

### Issues

1. **xid_app_backend.dev**: Disk at 86% — CRITICAL, no swap configured
2. **xid_saas_backend (prod)**: Uptime 833 days — needs kernel update
3. **xid_app_backend (prod)**: Uptime 452 days + disk 74%
4. **4 servers unreachable**: xidsg.com, xid.stlodge (timeout), xid_app_frontend, xid_saas_frontend (host key verification failed)
5. **xid_sync_console.dev**: Only 248M RAM available (26%) — low

Trello: Marcel ✓

---

## Rory (cPanel shared hosting)

### Server: rory.cpanel (92.205.13.202)

Host: sxb1plzcpnl487276.prod.sxb1.secureserver.net (GoDaddy shared)

| Metric | cPanel Value | SSH Verified | Status |
|--------|-------------|--------------|--------|
| Disk Usage | 11.13 GB / 50 GB (22.25%) | 11 GB | OK |
| File Usage | 107,567 / 250,000 (43.03%) | 95,312 files | OK |

### Disk Breakdown (11 GB total)

| Path | Size | Notes |
|------|------|-------|
| public_html/booking/ | 2.9 GB | Main app |
| public_html/bxrlondon.com/ | 2.4 GB | 41,554 files |
| public_html/dev/ | 2.1 GB | Dev environment |
| **booking.20251003.zip** | **1.5 GB** | Deletable backup |
| **booking.zip** | **1.4 GB** | Deletable backup |
| **error_log.bk (booking)** | **879 MB** | Deletable |
| **error_log.bak (dev)** | **589 MB** | Deletable |
| error_log (booking) | 124 MB | Active, should rotate |
| error_log (dev) | 66 MB | Active, should rotate |
| tmp/ (webalizer+awstats) | 474 MB | Stats cache |
| access-logs/ | 232 MB | |
| logs/ | 146 MB | |
| .cache/composer/ | 102 MB | |
| selfridges/ | 95 MB | |
| .mysql_backup/ | 16 MB | Auto backup (3 DBs) |
| mail/ | 5.7 MB | |

### Deletable (4.4 GB — 40% of total)

| File | Size |
|------|------|
| booking.20251003.zip | 1.5 GB |
| booking.zip | 1.4 GB |
| booking/error_log.bk | 879 MB |
| dev/error_log.bak.20251811 | 589 MB |
| **Total** | **4.4 GB** |

### File Count by Site

| Site | Files |
|------|-------|
| bxrlondon.com | 41,554 |
| booking | 32,337 |
| dev | 15,716 |
| selfridges | 1,810 |
| Other | ~1,895 |
| **Total** | **~95,312** |

Note: cPanel reports 107,567 files vs SSH 95,312 — difference likely from mail, tmp, hidden dirs, and database file counts.

### How to Monitor Without cPanel

SSH command to replicate cPanel dashboard data:
```bash
ssh -i /tmp/rory_key bql6w65kif0q@92.205.13.202 "du -sh ~ 2>/dev/null; find ~ -type f 2>/dev/null | wc -l"
```
Note: SSH key requires passphrase `45tgbhu89` — must decrypt key first or add to ssh-agent.

**Status: OK** — Disk at 22%, files at 43%. 4.4 GB of deletable backups/logs.

Trello: Rory ✓
