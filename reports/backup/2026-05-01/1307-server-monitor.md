# Server Monitor — 2026-05-01 13:07 +07

## TL;DR — Critical / Warning Findings

| # | Sev | Server | Issue |
|---|---|---|---|
| 1 | **CRIT** | Fountain PROD (live-20240319) | **Swap 2.2 GiB / 4 GiB used (55%)** — over 30% threshold. Memory headroom 33% available, OK for now, but swap usage indicates sustained memory pressure. |
| 2 | **CRIT** | Fountain Staging (Staging2) | **Swap 1.5 GiB / 4 GiB used (38%)** — over 30% threshold. Combined with disk 75% — borderline. |
| 3 | **WARN** | Fountain Staging | **Disk 75% (37/49 GB)** — at memory's investigate-at-75% threshold. Audit `/var/log`, `/tmp`, deploy artifacts. |
| 4 | **WARN** | Elena samguard.co | Swap 442 MiB / 2 GiB used (~22%) — within 10–30% WARNING range. |
| 5 | **WARN** | nc_staging | **No swap configured** (0B). System memory is fine (2.8 Gi available) but no fallback under load. Investigate adding swap. |
| 6 | **WARN** | Marcel/XID | **3 hosts unreachable** (xidsg.com, xid.stlodge, xid_app_backend.dev — TCP timeout). Plus **xid_app_frontend.dev: HOST KEY CHANGED** ⚠ security alert — investigate before connecting. Plus 2 hosts not in ssh config (`xid_sass_backend.dev`, `xid_sass_frontend.dev` — likely typo: `sass`→`saas`). |
| 7 | **WARN** | Rory | **Cannot check** — no Rory SSH Host entry in `~/.ssh/config`, no `~/.ssh/rory/` key directory on this machine. cPanel host (92.205.13.202 / `bql6w65kif0q`) seen in `~/.ssh/known_hosts` from a prior connection but no working SSH config exists locally. Needs interactive setup or use of the machine where the key originally lived. |
| 8 | **INFO** | Many servers | Long uptimes ⇒ pending kernel/security patches: Bailey console **834d**, Bailey staging **744d**, Fountain prod **773d**, xid_app_frontend **1086d (≈3 yr)**, xid_saas_backend **875d**, xid_saas_frontend **827d**, xid_app_backend **494d**. Schedule reboot windows. |

---

## Bailey — ✓ Trello complete

### Bailey Console (`speedventory` → ip-172-31-28-245)

| Metric | Value | Status |
|---|---|---|
| Uptime | 834 days | ⚠ stale kernel |
| Cores | 2 | |
| Load avg (1/5/15 min) | 0.02 / 0.03 / 0.00 | ✅ idle |
| Memory | 995M / 7.7G used (~13%) — 6.4G available | ✅ |
| Swap | 183M / 14G (1.2%) | ✅ |
| Disk `/` | **79G / 117G (68%)** | ✅ under 70% |
| Docker | wms-nov_app_1 (Up 5h), wms-nov_sidekiq_1 (Up 5h), wms-nov_redis_1 (Up 7w) | ✅ |

### Bailey Redis (wms-nov_redis_1)

| Metric | Value | Status |
|---|---|---|
| used_memory | 58.32 MB | ✅ |
| used_memory_peak | 745.93 MB | (historical) |
| used / total system mem | 0.76% | ✅ well under 50% threshold |
| Keyspace | db0=1679, db1=7870, db2=8, db3=2, db5=59, db6=1451 | ✅ |
| dbsize (db0) | 1679 keys | ✅ |

### Bailey Staging (`staging.console.speedventory` → ip-172-31-45-118)

| Metric | Value | Status |
|---|---|---|
| Uptime | 744 days | ⚠ stale kernel |
| Cores | 2 | |
| Load avg | 0.06 / 0.06 / 0.01 | ✅ idle |
| Memory | 1.2G / 3.8G used (~32%) — 2.2G available | ✅ |
| Swap | 291M / 8G (~3.6%) | ✅ |
| Disk `/` | **50G / 97G (51%)** | ✅ |
| Docker | console_new_app/sidekiq/redis/db/mailcatcher + console2_app/sidekiq — all Up | ✅ |

### Siteground (Prestashop)
Already covered in `1257-bailey-monitor.md` — session expired (`session_expired`), needs `node scripts/siteground-storage.js --login`. SSH-side disk on Bailey.cpanel was 72% (116/164 GB), under threshold.

---

## Elena — WordPress SamGuard — ✓ Trello complete

### samguard.co → landing-page

| Metric | Value | Status |
|---|---|---|
| Uptime | 88 days | ✅ |
| Cores | 1 | |
| Load avg | 0.09 / 0.10 / 0.09 | ✅ |
| Memory | 815 Mi / 1.9 Gi used (~43%) — 1.1 Gi available | ✅ (>30% available) |
| Swap | **442 Mi / 2 Gi (~22%)** | ⚠ WARNING |
| Disk `/` | **21G / 48G (44%)** | ✅ |
| Apache | running (multiple workers, top RSS 117 MB each) | ✅ |
| MySQL | mysqld pid 3637357 running (188 MB RSS) | ✅ |

Swap usage at 22% suggests intermittent memory pressure on this 1-core / 2 GiB box. Not actionable today (1.1 Gi memory available right now).

---

## Neural Contract — Contract Probe — ✓ Trello complete

### nc_staging → ip-172-31-29-53

| Metric | Value | Status |
|---|---|---|
| Uptime | 30 days | ✅ |
| Cores | 2 | |
| Load avg | 0.00 / 0.00 / 0.00 | ✅ idle |
| Memory | 685 Mi / 3.8 Gi used (~18%) — 2.8 Gi available | ✅ |
| Swap | **0 B (none configured)** | ⚠ FLAG |
| Disk `/` | **13G / 49G (26%)** | ✅ |
| PHP-FPM | master pid 417 + pool workers running (PHP 8.2) | ✅ |
| MySQL | mysqld pid 586 running (421 MB RSS) | ✅ |

**Action recommendation:** No swap configured. Memory is fine but a single bad query / fork-bomb could OOM-kill PHP-FPM or MySQL. Consider `fallocate -l 1G /swapfile` + `swapon` for safety. (Check with team before changing prod-adjacent infra.)

---

## Fountain — ⚠ Trello SKIPPED (swap critical)

### Fountain PROD (`fountaingifts.com.root` → live-20240319)

| Metric | Value | Status |
|---|---|---|
| Uptime | 773 days | ⚠ very stale |
| Cores | 4 | |
| Load avg | 0.26 / 0.72 / 0.50 | ✅ per-core 0.07/0.18/0.13 OK |
| Memory | **4.8 Gi / 7.8 Gi used (~62%)** — 2.6 Gi available | ⚠ headroom 33% available, near WARNING boundary |
| Swap | **2.2 GiB / 4 GiB used (~55%)** | 🚨 **CRITICAL** (>30%) |
| Disk `/` | 54G / 155G (35%) | ✅ |
| Puma | fountain_gifts_BE (cluster, 5.6.8) + infinity_roses_BE (3.12.6) — running | ✅ |
| Sidekiq | fountain_gifts_BE + infinity_roses_BE — `0 of 2 busy` each | ✅ |
| Next.js | v16.2.4 + v14.2.27 — running | ✅ |

**Top 3 RSS consumers:** next-server v16.2.4 (1.0 GB), puma fountain_gifts_BE worker 1 (861 MB), puma cluster worker 0 (697 MB). Memory genuinely tight on a 7.8 GiB box running two Rails apps + two Next.js builds.

### Fountain Staging (`fountaingifts.com.root-staging` → Staging2)

| Metric | Value | Status |
|---|---|---|
| Uptime | 134 days | ✅ |
| Cores | 4 | |
| Load avg | 0.04 / 0.52 / 0.34 | ✅ |
| Memory | 2.5 Gi / 7.8 Gi used (~32%) — 4.8 Gi available | ✅ |
| Swap | **1.5 GiB / 4 GiB used (~38%)** | 🚨 **CRITICAL** (>30%) |
| Disk `/` | **37G / 49G (75%)** | ⚠ at investigate-threshold |
| Puma | staging_fountain_gifts_BE (5.6.8) + staging_infinity_roses_BE (5.6.8) | ✅ |
| Sidekiq | staging_fountain_gifts_BE + staging_infinity_roses_BE — `0 of 2 busy` | ✅ |
| Next.js | v16.2.4 + v14.2.27 | ✅ |

**Why swap is high but memory is OK:** Linux can leave pages in swap after a memory pressure event without proactively reclaiming them once memory frees up. The 38–55% used likely reflects past peak load (deploys, asset compilation, batch jobs), not current state. Still — sustained swap usage of this size means the kernel was paging actively at some point in the recent past, so the headroom is thinner than `free -h` makes it look.

**Why Fountain Trello is NOT being marked complete:** swap >30% on prod is the skill's CRITICAL threshold; staging swap also CRITICAL; staging disk at 75% (memory's investigate-at-75% storage rule). Need investigation: `swapoff -a && swapon -a` to clear stale pages, or sustained pressure ⇒ scale RAM.

---

## Marcel (XID) — ✓ Trello complete (with caveats)

### Reachable (7 hosts)

| Host | Uptime | Cores | Load | Memory | Swap | Disk |
|---|---|---|---|---|---|---|
| xid_sync_console | 18d | 4 | **1.78 / 0.92 / 0.41** ⚠ 1m spike | 1.7G/15G (~11%) | 78M/6G (1.3%) | 17G/49G (35%) |
| xid_app_backend | 494d ⚠ | 2 | 0.08 | 227M/949M (~24%) | 67M/2G | 5.7G/20G (30%) |
| xid_saas_backend | 875d ⚠ | 2 | 0.00 | 260M/949M (~27%) | 50M/2G | 13G/20G (65%) |
| xid_app_frontend | **1086d** ⚠⚠ | 2 | 0.00 | 163M/953M (~17%) | 25M/2G | 11G/20G (56%) |
| xid_saas_frontend | 827d ⚠ | 2 | 0.00 | 193M/949M (~20%) | 48M/2G | 7.1G/20G (37%) |
| xid_sync_console.dev | 206d | 2 | 0.00 | 399M/937M (~43%) | 342M/6G (~6%) | 19G/29G (66%) |
| xid_saas_backend.dev | 210d | 2 | 0.00 | 232M/453M (~51%) | 68M/1G (~7%) | 6.5G/16G (42%) |

`xid_sync_console` 1m load 1.78 on 4 cores is fine (per-core 0.45) but worth a glance — the 5/15-min averages dropped to 0.92/0.41, so it was a transient spike.

### Unreachable (6 hosts)

| Host | Reason |
|---|---|
| xidsg.com | TCP timeout to 43.229.84.24:8288 |
| xid.stlodge | TCP timeout to 175.41.165.215:22 |
| xid_app_backend.dev | TCP timeout to 18.142.107.80:22 |
| `xid_app_frontend.dev` | 🚨 **HOST KEY CHANGED** at 54.169.217.146 (offending key in `~/.ssh/known_hosts:210`). Strict checking refused. **Do not blindly accept** — investigate (legit rebuild vs MitM). New ED25519 key fingerprint: `SHA256:BWQLl5ThALm9h4OYZUXefqgU1GMw2FOmM6L8rSG9poY` |
| xid_sass_backend.dev | not in `~/.ssh/config` (typo in skill — should be `xid_saas_backend.dev`, which IS reachable) |
| xid_sass_frontend.dev | not in `~/.ssh/config` (no `xid_saas_frontend.dev` in config either) |

---

## Rory — ⚠ Trello SKIPPED

**Cannot check.** No `Host rory*` entry in `~/.ssh/config`. No `~/.ssh/rory/` directory. The skill instructs `cp ~/.ssh/rory/id_rsa /tmp/rory_key` but the key is not present on this machine.

`~/.ssh/known_hosts` does contain `92.205.13.202` (the GoDaddy cPanel IP), so this machine has connected before — but the keypair is gone.

**To unblock:** restore the key to `~/.ssh/rory/id_rsa` (with passphrase comment in `~/.ssh/config` per the project convention), or run the check from the host machine that has it. Then `du -sh ~`, `find ~ -type f | wc -l`, and the existing log/zip cleanup audit can run.

---

## Trello — Check server status (https://trello.com/c/uKCNe2wJ)

✓ **Completed (4):** Bailey, Elena - WordPress SamGuard, Neural Contract - Contract Probe, Marcel.

⚠ **Skipped (2):**
- **Fountain** — PROD swap 55% (CRITICAL), Staging swap 38% (CRITICAL), Staging disk 75% (at investigate threshold).
- **Rory** — Rory SSH key + Host entry not present on this machine; check is blocked until key is restored.

---

## Recommendations

1. **Fountain prod**: investigate sustained memory pressure. Quick win: schedule a maintenance-window restart of Puma workers + Next.js (swap-cleared restart). Longer-term: RAM upgrade (currently 7.8 GiB on 4 cores running 2 Rails apps + 2 Next.js builds is tight).
2. **Fountain staging**: free disk on `/` (audit `/var/log`, old deploys, asset compilation cache). Cap log rotation. Same swap/restart hygiene.
3. **Marcel/XID**: investigate `xid_app_frontend.dev` host-key change before connecting (security event). Confirm whether `xidsg.com`, `xid.stlodge`, `xid_app_backend.dev` are intended to be down or recently moved IPs.
4. **Reboot windows**: Bailey console 834d, Fountain prod 773d, xid_app_frontend 1086d — all overdue for kernel/glibc patching. Coordinate with team.
5. **nc_staging**: add a 1 GB swapfile as a safety net (no urgency).
6. **Rory**: restore SSH key + Host config so this check can run autonomously next time.
