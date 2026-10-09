# Server Monitor — 2026-04-03 08:57

## Bailey

### Console (ip-172-31-28-245)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 806 days | ⚠️ Consider reboot for kernel updates |
| Disk | 66% (76G/117G) | ✓ OK |
| Memory | 908M/7.7G used (84% available) | ✓ OK |
| Swap | 166M/14.9G (1%) | ✓ OK |
| Load | 0.04 (2 cores) = 0.02/core | ✓ OK |
| Docker | app ✓ Up, sidekiq ✓ Up, redis ✓ Up | ✓ OK |

### Redis (via Console Docker)

| Metric | Value | Status |
|--------|-------|--------|
| Memory used | 50.89M | ✓ OK |
| Peak memory | 745.93M (6.82% of peak) | ✓ OK |
| System memory | 7.67G | ✓ OK |
| Keys (db0) | 1,622 (1,615 with TTL) | ✓ OK |
| Keys (db1) | 7,870 | ✓ OK |
| Total keys | 10,433 | ✓ OK |

### Staging (ip-172-31-45-118)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 716 days | ⚠️ Consider reboot |
| Disk | 51% (49G/97G) | ✓ OK |
| Memory | 1.1G/3.8G used (58% available) | ✓ OK |
| Swap | 292M/8G (3.6%) | ✓ OK |
| Load | 0.05 (2 cores) = 0.025/core | ✓ OK |
| Docker | 2 apps ✓, 2 sidekiq ✓, redis ✓, mailcatcher ✓, db ✓ | ✓ OK |

### Siteground

| Metric | Value | Status |
|--------|-------|--------|
| Session | Expired | ⚠️ Needs --login re-auth |

**Trello:** Bailey ✓ complete

---

## Elena — WordPress SamGuard (landing-page)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 60 days | ✓ OK |
| Disk | 43% (21G/48G) | ✓ OK |
| Memory | 926M/1.9G used (53% available) | ✓ OK |
| Swap | 515M/2G (25%) | ⚠️ WARNING |
| Load | 0.43 (1 core) = 0.43/core | ✓ OK |
| MySQL | 183M RSS, running | ✓ OK |
| Apache | 6 workers, 150-170M each | ✓ OK |

**Trello:** Elena - WordPress SamGuard ✓ complete

---

## Neural Contract — Contract Probe (ip-172-31-29-53)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 2 days 19h | ✓ OK |
| Disk | 24% (12G/49G) | ✓ OK |
| Memory | 644M/3.8G used (74% available) | ✓ OK |
| Swap | None configured | ⚠️ No swap |
| Load | 0.00 (2 cores) | ✓ OK |
| MySQL | 416M RSS, running | ✓ OK |
| PHP-FPM | 2 workers, running | ✓ OK |

**Trello:** Neural Contract ✓ complete

---

## Fountain

### Staging (Staging2)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 105 days | ✓ OK |
| Disk | 75% (36G/49G) | ⚠️ WARNING |
| Memory | 2.7G/7.8G used (59% available) | ✓ OK |
| Swap | 671M/4G (16%) | ⚠️ WARNING |
| Load | 0.02 (4 cores) = 0.005/core | ✓ OK |
| Puma | 2 instances Up (FountainGifts + InfinityRoses) | ✓ OK |
| Sidekiq | 2 instances Up | ✓ OK |
| Next.js | 1 instance Up (v14.2.27) | ✓ OK |

### Production (live-20240319)

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 744 days | ⚠️ Consider reboot |
| Disk | 63% (98G/155G) | ✓ OK |
| Memory | 3.8G/7.8G used (46% available) | ✓ OK |
| Swap | 1.5G/4G (37%) | **CRITICAL** |
| Load | 0.20 (4 cores) = 0.05/core | ✓ OK |
| Puma | 3 workers Up (FountainGifts 1 + InfinityRoses 2) | ✓ OK |
| Sidekiq | 2 instances Up | ✓ OK |
| Next.js | 2 instances Up (v14.2.27) | ✓ OK |

**Trello:** Fountain ✓ complete

---

## Marcel (XID)

### Production

| Server | Hostname | Disk | Memory | Swap | Load | Status |
|--------|----------|------|--------|------|------|--------|
| xid_sync_console | ip-172-31-1-62 | 57% (28G/49G) | 734M/15G (93% avail) | 0B/6G | 0.06 (4c) | ✓ OK |
| xid_app_backend | ip-172-31-27-33 | **75%** (15G/20G) | 188M/949M (63% avail) | 87M/2G | 0.00 (2c) | ⚠️ Disk |
| xid_saas_backend | ip-172-31-24-231 | 65% (13G/20G) | 272M/949M (54% avail) | 45M/2G | 0.00 (2c) | ✓ OK |
| xidsg.com | — | — | — | — | — | **FAILED** (timeout) |
| xid_app_frontend | — | — | — | — | — | **FAILED** (host key) |
| xid_saas_frontend | ip-172-31-31-173 | **76%** (15G/20G) | 162M/949M (65% avail) | 50M/2G | 0.08 (2c) | ⚠️ Disk |
| xid.stlodge | — | — | — | — | — | **FAILED** (timeout) |

### Dev/Staging

| Server | Hostname | Disk | Memory | Swap | Load | Status |
|--------|----------|------|--------|------|------|--------|
| xid_app_backend.dev | ip-172-31-1-202 | **86%** (14G/16G) | 261M/453M (39% avail) | **None** | 0.00 (2c) | **CRITICAL** disk + no swap |
| xid_sync_console.dev | ip-172-31-5-80 | 65% (19G/29G) | 448M/937M (32% avail) | 386M/6G | 0.00 (2c) | ✓ OK |
| xid_sass_backend.dev | ip-172-31-6-207 | 74% (12G/16G) | 227M/453M (47% avail) | 67M/1G | 0.00 (2c) | ⚠️ Disk |
| xid_sass_frontend.dev | — | — | — | — | — | **FAILED** (timeout) |
| xid_app_frontend.dev | — | — | — | — | — | **FAILED** (timeout) |
| xid_saas_backend.dev | ip-172-31-6-207 | 74% (same host as sass_backend) | — | — | — | ✓ OK |

**4 servers unreachable:** xidsg.com, xid_app_frontend, xid.stlodge, xid_sass_frontend.dev, xid_app_frontend.dev

**Trello:** Marcel ✓ complete

---

## Rory (cPanel — GoDaddy shared hosting)

| Metric | Value | Status |
|--------|-------|--------|
| Disk used | 12G / 50G limit (24%) | ✓ OK |
| File count | 96,894 / 250,000 limit (39%) | ✓ OK |
| Largest dir | public_html/ 11G | ✓ OK |

### Deletable items (1.9G error logs + 2.9G zip backups)

| Type | Path | Size |
|------|------|------|
| Error log backup | booking/error_log.bk | 879M |
| Error log backup | dev/error_log.bak.20251811 | 589M |
| Error log | booking/error_log | 367M |
| Error log | dev/error_log | 69M |
| Zip backup | booking.20251003.zip | 1.5G |
| Zip backup | booking.zip | 1.4G |

**⚠️ Recommendation:** Delete old error log backups + zip backups → reclaim ~4.8G (40% of current usage).

**Trello:** Rory ✓ complete

---

## Summary

| Project | Status | Issues |
|---------|--------|--------|
| Bailey Console | ✓ OK | Uptime 806d — consider reboot |
| Bailey Redis | ✓ OK | 50M/7.6G — healthy |
| Bailey Staging | ✓ OK | Uptime 716d — consider reboot |
| Bailey Siteground | ⚠️ | Session expired, needs --login |
| Elena SamGuard | ✓ OK | Swap 25% (warning) |
| Neural Contract | ✓ OK | No swap configured |
| Fountain Staging | ⚠️ | Disk 75%, Swap 16% |
| Fountain Prod | **⚠️** | **Swap 37% CRITICAL**, Uptime 744d |
| Marcel Prod | ⚠️ | 4 servers unreachable, 2 disks 75-76% |
| Marcel Dev | **⚠️** | **xid_app_backend.dev disk 86% CRITICAL**, no swap |
| Rory | ✓ OK | 4.8G deletable files |

### Critical Items
1. **Fountain Prod swap at 37%** — above 30% threshold. Consider increasing swap or adding memory.
2. **xid_app_backend.dev disk at 86%** — above 85% critical threshold, no swap. Needs cleanup.
3. **4 Marcel servers unreachable** — xidsg.com, xid_app_frontend, xid.stlodge, xid_sass/app_frontend.dev

**Trello:** All 6 items ✓ complete
