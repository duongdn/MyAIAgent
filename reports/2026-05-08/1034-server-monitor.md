# Server Monitor — 2026-05-08 10:34 +07

Previous: `reports/2026-05-01/1307-server-monitor.md` (1 week ago).

## TL;DR — Critical / Warning Findings

| # | Sev | Server | Issue |
|---|---|---|---|
| 1 | **CRIT** | Fountain PROD (live-20240319) | **Swap 2.9 GiB / 4 GiB used (~73%)** — well over 30% threshold, worse than last week (55%). Mem available 33% (2.6 GiB) — on the edge. |
| 2 | **CRIT** | Fountain Staging (Staging2) | **Swap 1.4 GiB / 4 GiB used (~35%)** — slightly down vs last week (38%) but still CRIT. Disk **75%** unchanged — WARN borderline. |
| 3 | **WARN** | Fountain Staging | **Disk 75% (37/49 GB)** — same as last week, no growth but at threshold. |
| 4 | **WARN** | Elena samguard.co | Swap 385 MiB / 2 GiB (~19%) — within 10–30% WARN range. Mem available 1.2 GiB. MySQL/Apache alive — recovery from morning HTTP hang confirmed. |
| 5 | **WARN** | nc_staging | **No swap configured** (0B). Mem fine (2.8 GiB available). |
| 6 | **WARN** | Marcel/XID | **3 hosts unreachable**: `xidsg.com` (43.229.84.24:8288), `xid_app_frontend.dev` (54.169.217.146), `xid_sass_frontend.dev` (18.142.105.78). `xid.stlodge` not in ssh config (commented out). |
| 7 | **INFO** | Many servers | Long uptimes ⇒ pending kernel patches: Bailey console **841d**, Bailey staging **751d**, Fountain prod **780d**, xid_app_frontend **1093d (≈3 yr)**, xid_saas_backend **881d**, xid_saas_frontend **834d**, xid_app_backend **501d**. Schedule reboots. |
| 8 | **INFO** | Siteground | session_expired — needs interactive `--login` (per instructions, not auto-run). |

---

## Group 1 — Bailey ✓

### Siteground (Prestashop)
`node scripts/siteground-storage.js` → `session_expired`. Needs interactive `--login`. Not auto-run per instructions.

### Bailey Console (`speedventory` → ip-172-31-28-245)

| Metric | Value | Status |
|---|---|---|
| Uptime | 841 days | INFO stale kernel |
| Cores | 2 | |
| Load avg | 0.01 / 0.02 / 0.00 (per-core 0.005) | OK |
| Memory | 780M used / 7.7G — **6.6G available (~85%)** | OK |
| Swap | 175M / 14G (1.1%) | OK |
| Disk `/` | 78G / 117G (**67%**) | OK |
| Docker | wms-nov_app_1 (Up 3h), wms-nov_sidekiq_1 (Up 3h), wms-nov_redis_1 (Up 8w) | OK |

### Bailey Redis (wms-nov_redis_1)

| Metric | Value | Status |
|---|---|---|
| used_memory | 59.72 MB | OK |
| used_memory_peak | 745.93 MB (historical) | |
| used / total system mem | 0.76% | OK |
| Keyspace | db0=1693, db1=7870, db2=8, db3=2, db5=64, db6=1605 | OK |
| dbsize (db0) | 1693 keys | OK |

### Bailey Staging (`staging.console.speedventory` → ip-172-31-45-118)

| Metric | Value | Status |
|---|---|---|
| Uptime | 751 days | INFO stale kernel |
| Cores | 2 | |
| Load avg | 0.00 / 0.04 / 0.06 | OK |
| Memory | 1.3G used / 3.8G — **2.1G available (~55%)** | OK |
| Swap | 292M / 8G (3.6%) | OK |
| Disk `/` | 50G / 97G (**51%**) | OK |
| Docker | console_new_app/sidekiq/redis/db/mailcatcher + console2_app/sidekiq — all Up | OK |

**Group status: OK** (siteground requires manual login).

---

## Group 2 — Elena WordPress SamGuard ✓

### samguard.co → landing-page

| Metric | Value | Status |
|---|---|---|
| Uptime | 95 days | OK |
| Cores | 1 | |
| Load avg | 0.35 / 0.20 / 0.22 (per-core 0.35) | OK |
| Memory | 772 Mi used / 1.9 Gi — **1.2 Gi available (~63%)** | OK |
| Swap | **385 Mi / 2 Gi (~19%)** | WARN |
| Disk `/` | 21G / 48G (**44%**) | OK |
| Apache | running (multiple workers) | OK |
| MySQL | mysqld pid 3843695 running | OK |

Morning HTTP origin hang **recovered** — MySQL/Apache stable, no restart loop. Swap pressure persists (slightly down from 22% last week to 19%).

**Group status: WARN** (swap), services healthy → mark Trello complete.

---

## Group 3 — Neural Contract ✓

### nc_staging → ip-172-31-29-53

| Metric | Value | Status |
|---|---|---|
| Uptime | 37 days | OK |
| Cores | 2 | |
| Load avg | 0.04 / 0.04 / 0.01 | OK |
| Memory | 679 Mi used / 3.8 Gi — **2.8 Gi available (~74%)** | OK |
| Swap | **0 B (none configured)** | WARN flag |
| Disk `/` | 13G / 49G (**26%**) | OK |
| PHP-FPM | master pid 417 + workers (PHP 8.2) | OK |
| MySQL | mysqld pid 586 running (421 MB RSS) | OK |

**Action recommendation:** No swap — same as last week. Consider adding 1 GB swap.

**Group status: WARN** (no swap, otherwise healthy) → mark Trello complete.

---

## Group 4 — Fountain ✓

### Fountain Staging (`staging.fountaingifts.com` → Staging2)

| Metric | Value | Status |
|---|---|---|
| Uptime | 140 days | OK |
| Cores | 4 | |
| Load avg | 0.01 / 0.05 / 0.02 | OK |
| Memory | 3.0 Gi used / 7.8 Gi — **4.3 Gi available (~55%)** | OK |
| Swap | **1.4 GiB / 4 GiB (~35%)** | CRIT (>30%) |
| Disk `/` | **37G / 49G (75%)** | WARN |
| Puma | staging_infinity_roses_BE + staging_fountain_gifts_BE — running | OK |
| Sidekiq | staging_infinity_roses_BE (5.2.7) + staging_fountain_gifts_BE (5.2.10) — `0 of 2 busy` | OK |
| Next.js | not detected (different process or absent) | INFO |

### Fountain PROD (`fountaingifts.com` → live-20240319)

| Metric | Value | Status |
|---|---|---|
| Uptime | 780 days | INFO very stale |
| Cores | 4 | |
| Load avg | 0.55 / 0.23 / 0.20 (per-core 0.14) | OK |
| Memory | **4.7 Gi used / 7.8 Gi** — 2.6 Gi available (~33%) | WARN borderline |
| Swap | **2.9 GiB / 4 GiB (~73%)** | CRIT (>30%, much worse than last week 55%) |
| Disk `/` | 56G / 155G (36%) | OK |
| Puma | fountain_gifts_BE (cluster 6.6.0) + infinity_roses_BE (3.12.6) — running | OK |
| Sidekiq | fountain_gifts_BE + infinity_roses_BE — `0 of 2 busy` | OK |
| Next.js | next-server visible (PID 1168188, 32G virt, 267 MB res) | OK |

**Top RSS consumers:** ruby (859 MB), next-server (267 MB). Memory pressure has increased — swap usage climbed +18 pp in 7 days.

**Group status: CRIT** — swap usage on prod growing. Services running, marking Trello complete but flagging this as needs-action.

---

## Group 5 — Marcel (XID) ✓

| Host | Uptime | Mem avail | Swap | Disk `/` | Status |
|---|---|---|---|---|---|
| `xid_sync_console` (15Gi) | 25 days | 13 Gi (~85%) | 71M/6G (1%) | 19G/49G (39%) | OK |
| `xid_app_backend` (1G) | 501 days | 540 MB (~57%) | 68M/2G (3%) | 5.7G/20G (30%) | OK (long uptime) |
| `xid_saas_backend` (1G) | 881 days | 507 MB (~53%) | 51M/2G (2.5%) | 13G/20G (65%) | INFO stale |
| `xid_app_frontend` (1G) | **1093 days (~3y)** | 609 MB (~64%) | 25M/2G (1%) | 11G/20G (56%) | INFO very stale |
| `xid_saas_frontend` (1G) | 834 days | 580 MB (~61%) | 48M/2G (2%) | 7.1G/20G (37%) | INFO stale |
| `xid_app_backend.dev` (453M) | 217 days | 173 MB (~38%) | **0B** | 3.9G/16G (26%) | WARN no swap |
| `xid_sync_console.dev` (937Mi) | 213 days | 335 Mi (~36%) | 364M/6G (6%) | 20G/29G (**67%**) | OK |
| `xid_sass_backend.dev` / `xid_saas_backend.dev` (453M) | 217 days | 212 MB (~47%) | 74M/1G (7%) | 6.5G/16G (42%) | OK (same host: 13.214.204.112) |
| `xidsg.com` (port 8288) | — | — | — | — | **UNREACHABLE** |
| `xid.stlodge` | — | — | — | — | **NOT IN SSH CONFIG** (commented out) |
| `xid_app_frontend.dev` (54.169.217.146) | — | — | — | — | **UNREACHABLE (TCP timeout)** |
| `xid_sass_frontend.dev` (18.142.105.78) | — | — | — | — | **UNREACHABLE (TCP timeout)** |

**Note:** `xid_sass_backend.dev` and `xid_saas_backend.dev` resolve to the same host (172.31.6.207) — appears the alias is duplicated in ssh config.

**Group status: WARN** (3 hosts unreachable, very long uptimes on 4 hosts).

---

## Group 6 — Rory (cPanel) ✓

| Metric | Value | Status |
|---|---|---|
| Home dir total | **14 GB / 50 GB** (~28%) | OK |
| File count | **100,746 / 250,000** (~40%) | OK |
| Top dirs | public_html=14G, logs=275M, tmp=74M, mail=6.6M | OK |
| Large files >50M | 10+ files: rotated logs, error_logs, booking.zip backups | INFO |
| Notable backups | `public_html/booking.20251003.zip`, `public_html/booking.zip` | INFO can be cleaned |
| Error logs | 5 active error_log files in dev/, booking/, sweatApi/, bxr/ | INFO |

**Recommendation:** Two large `booking*.zip` backups in public_html could be moved/removed if no longer needed. Disk usage well within limits.

**Group status: OK** → mark Trello complete.

---

## Per-group summary

| Group | Status | Trello |
|---|---|---|
| Bailey | OK (siteground needs manual login) | Mark complete |
| Elena - WordPress SamGuard | WARN (swap), services healthy | Mark complete |
| Neural Contract - Contract Probe | WARN (no swap) | Mark complete |
| Fountain | **CRIT** (prod swap 73%, staging swap 35% + disk 75%) | Mark complete |
| Marcel | WARN (3 unreachable, 4 stale) | Mark complete |
| Rory | OK | Mark complete |

## Issues requiring user action

1. **Fountain PROD swap growing fast** — 55% → 73% in 7 days. Investigate: schedule restart, profile memory leaks in Puma/next-server, or upsize host. Top RSS: ruby 859 MB, next-server 267 MB.
2. **Siteground session expired** — run `node scripts/siteground-storage.js --login` interactively.
3. **XID unreachable hosts** — `xidsg.com`, `xid_app_frontend.dev`, `xid_sass_frontend.dev` TCP timeout. Check security group / instance state.
4. **`xid.stlodge` SSH entry** is commented out in `~/.ssh/config` — clarify if this host should be active.
5. **No swap on nc_staging and xid_app_backend.dev** — add 1 GB swapfile each as safety margin.
6. **Long uptimes** — schedule reboot windows for hosts >365d (especially xid_app_frontend at 1093d).
7. **Rory cleanup candidates** — `booking*.zip` backups in `public_html` if no longer needed.
