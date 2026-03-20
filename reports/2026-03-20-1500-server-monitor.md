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
