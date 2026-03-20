# Server Monitor — Bailey (2026-03-20)

## Siteground (Prestashop)

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

---

## Console (ssh speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-28-245 | |
| Uptime | 792 days | OK |
| CPU | 2 cores | |
| Load avg | 0.24, 0.16, 0.18 | OK |
| RAM | 7.7G total, 1.6G used, 5.8G available | OK |
| Swap | 14G total, 146M used (1%) | OK |
| Disk (/) | 117G total, 74G used (64%) | OK |

### Docker Containers
| Container | Status |
|-----------|--------|
| wms-nov_app_1 | Up 4 hours |
| wms-nov_sidekiq_1 | Up 4 hours |
| wms-nov_redis_1 | Up 9 days |

### Top Processes
- puma (app): 10.4% RAM (840MB), 20% CPU
- sidekiq: 6.3% RAM (512MB), 1.5% CPU

**Status: OK** — All metrics normal, load low

---

## Redis (on Console via Docker)

| Metric | Value | Status |
|--------|-------|--------|
| Memory used | 41.53 MB | OK |
| Memory RSS | 6.41 MB | OK |
| Peak memory | 745.93 MB | |
| Peak usage % | 5.57% of peak | OK |
| System memory | 7.67 GB | |
| DB0 keys | 1,594 (1,587 with TTL) | OK |
| DB1 keys | 7,869 (no TTL) | OK |
| Total DBs active | 6 | |

**Status: OK** — Low memory usage, well below peak

---

## Staging (ssh staging.console.speedventory)

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | ip-172-31-45-118 | |
| Uptime | 702 days | OK |
| CPU | 2 cores | |
| Load avg | 0.13, 0.14, 0.07 | OK |
| RAM | 3.8G total, 1.2G used, 2.2G available | OK |
| Swap | 8G total, 296M used (3.6%) | OK |
| Disk (/) | 97G total, 49G used (51%) | OK |

### Docker Containers
| Container | Status |
|-----------|--------|
| console_new_app_1 | Up 58 min |
| console_new_sidekiq_1 | Up 58 min |
| console2_app_1 | Up 4 hours |
| console2_sidekiq_1 | Up 4 hours |
| console_new_redis_1 | Up 3 weeks |
| console_new_mailcatcher_1 | Up 3 weeks |
| console_new_db_1 | Up 3 weeks |

### Top Processes
- sidekiq x2: 6.8% + 6.4% RAM
- puma x2: 5.8% + 5.3% RAM
- postgres: 3.2% RAM (checkpointer)

**Status: OK** — All metrics normal. Note: 2 app instances running (console_new + console2)

---

## Summary

| Server | Disk | Memory | Swap | CPU/Load | Overall |
|--------|------|--------|------|----------|---------|
| Siteground | WARNING (81%) | OK | N/A | OK | WARNING |
| Console | OK (64%) | OK | OK (1%) | OK | OK |
| Redis | N/A | OK (42MB) | N/A | N/A | OK |
| Staging | OK (51%) | OK | OK (4%) | OK | OK |
