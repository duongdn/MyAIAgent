# Server Monitor — 2026-04-24 08:51 (Asia/Saigon)

Trello card: [Check server status](https://trello.com/c/IwSSbKAI/747-check-server-status)

## Summary

| Project | Status | Trello | Key Issue |
|---|---|---|---|
| Bailey | ⚠️ PARTIAL | INCOMPLETE | Siteground session expired (needs re-auth); servers OK but old uptime |
| Elena SamGuard | ✅ OK | ✅ complete | Minor swap 24% |
| Neural Contract | ⚠️ FLAG | ✅ complete | No swap configured |
| Fountain | 🔴 ALERT | INCOMPLETE | Staging disk 75% (threshold), swap 35% critical; Prod swap 52% critical, uptime 765d |
| Marcel (XID) | 🔴 UNREACHABLE | INCOMPLETE | 5/13 hosts unreachable; multiple uptime >800d |
| Rory cPanel | ✅ OK | ✅ complete | Disk 24%, files 39% of limits |

---

## Bailey

### Siteground (Prestashop)
🔴 **session_expired** — cannot fetch storage stats. Run `node scripts/siteground-storage.js --login` to re-auth.

### Console (speedventory) ip-172-31-28-245
| Metric | Value | Status |
|---|---|---|
| Uptime | 827 days | ⚠️ consider reboot (kernel updates) |
| Disk | 78G/117G = 67% | ✅ OK |
| Memory available | 6.3G/7.7G (82%) | ✅ OK |
| Swap used | 176M/14.9G (1.2%) | ✅ OK |
| Load (2 cores) | 0.05 0.04 0.07 | ✅ OK |
| Docker | wms-nov_app, sidekiq, redis — all Up | ✅ OK |

### Redis (Docker on Console)
- Memory used: 57.86M / peak 745.93M (peak_perc 7.76%) — ✅ healthy
- Total keys: 10,909 across 6 DBs (db0=1665, db1=7870, db2=8, db3=2, db5=58, db6=1306)
- No memory pressure

### Staging (staging.console.speedventory) ip-172-31-45-118
| Metric | Value | Status |
|---|---|---|
| Uptime | 736 days | ⚠️ consider reboot |
| Disk | 49G/97G = 51% | ✅ OK |
| Memory available | 2.3G/3.8G (60%) | ✅ OK |
| Swap used | 288M/8G (3.5%) | ✅ OK |
| Load (2 cores) | 0.07 0.08 0.03 | ✅ OK |
| Docker | console_new + console2 (app/sidekiq/redis/db/mail) — all Up | ✅ OK |

**Trello: Bailey INCOMPLETE** — Siteground sub-check failed due to session expiry. Other 3 servers healthy aside from high uptime.

---

## Elena — WordPress SamGuard (samguard.co)

| Metric | Value | Status |
|---|---|---|
| Hostname | landing-page | — |
| Uptime | 81 days | ✅ OK |
| Disk | 21G/48G = 44% | ✅ OK |
| Memory available | 1.1G/1.9G (58%) | ✅ OK |
| Swap used | 495M/2G (24.5%) | ⚠️ WARNING (10-30% band) |
| Load (1 core) | 0.22 0.08 0.10 | ✅ OK |
| MySQL | running | ✅ |
| Apache | 6+ workers running | ✅ |

**Trello: Elena ✅ marked complete**

---

## Neural Contract — Contract Probe (nc_staging)

| Metric | Value | Status |
|---|---|---|
| Hostname | ip-172-31-29-53 | — |
| Uptime | 23d 19h | ✅ OK |
| Disk | 13G/49G = 26% | ✅ OK |
| Memory available | 2.8G/3.8G (74%) | ✅ OK |
| Swap | **NONE configured** | ⚠️ flag |
| Load (2 cores) | 0.02 0.01 0.00 | ✅ OK |
| MySQL | running (10.6% mem) | ✅ |
| PHP-FPM | master + 3+ workers running | ✅ |

**Trello: Neural Contract ✅ marked complete**. No swap is flagged for future consideration.

---

## Fountain

### Staging (Staging2) — staging.fountaingifts.com
| Metric | Value | Status |
|---|---|---|
| Uptime | 126 days | ✅ OK |
| Disk | **37G/49G = 75%** | 🔴 ALERT (threshold) |
| Memory available | 4.5G/7.8G (58%) | ✅ OK |
| Swap used | 1.4G/4G (35%) | 🔴 CRITICAL (>30%) |
| Load (4 cores) | 0.09 0.03 0.01 | ✅ OK |
| Puma/Sidekiq/Next.js | all running | ✅ |

**Disk breakdown (75% = 37G/49G):**

| Path | Size | Notes |
|---|---|---|
| /var/www | 20G | 4 app deployments (fountain_BE 4.5G, infinity_roses_BE 3.8G, infinity_roses_FE 3.5G, fountain_FE 3.2G, blogs 670M) |
| /var/log | 2.7G | log rotation likely needs trimming |
| /usr | 2.4G | kernel headers 5.15.0-164 + 5.15.0-176 (~284M) |
| /var/lib | 1.1G | — |
| /var/cache | 142M | — |

**Recommended cleanup** (do NOT run without confirmation):
- `sudo journalctl --vacuum-time=7d` (trim /var/log)
- `sudo apt-get autoremove` (old kernel headers)
- Review `/var/www/*` old release directories (Capistrano may keep many)

### Production (live-20240319) — fountaingifts.com
| Metric | Value | Status |
|---|---|---|
| Uptime | 765 days | ⚠️ consider reboot |
| Disk | 100G/155G = 65% | ✅ OK |
| Memory available | 2.8G/7.8G (36%) | ✅ OK |
| Swap used | 2.1G/4G (52.5%) | 🔴 CRITICAL (>30%) |
| Load (4 cores) | 0.20 0.45 0.50 | ✅ OK |
| Next.js/Puma/Sidekiq | running; next-server using 13.2% mem, 23% CPU | ✅ |

**Trello: Fountain INCOMPLETE** — storage threshold + critical swap on both.

---

## Marcel (XID)

| Host | Uptime | Disk | Mem avail | Swap | Status |
|---|---|---|---|---|---|
| xid_sync_console | 10d | 17G/49G 34% | 11G/15G | 160M | ✅ OK |
| xid_app_backend | 487d | 5.7G/20G 30% | 557M/949M | 67M | ⚠️ uptime |
| xid_saas_backend | 867d | 13G/20G 64% | 531M/949M | 47M | ⚠️ uptime |
| xidsg.com | — | — | — | — | 🔴 DNS fail |
| xid_app_frontend | — | — | — | — | 🔴 Host key verification failed |
| xid_saas_frontend | 820d | 7.1G/20G 37% | 592M/949M | 53M | ⚠️ uptime |
| xid.stlodge | — | — | — | — | 🔴 DNS fail |
| xid_app_backend.dev | 202d | 3.9G/16G 25% | 174M/453M | **none** | ⚠️ no swap |
| xid_sync_console.dev | 199d | 19G/29G 66% | 318M/937M | 189M | ✅ OK |
| xid_sass_backend.dev | 202d | 6.5G/16G 42% | 214M/453M | 74M | ✅ OK |
| xid_sass_frontend.dev | — | — | — | — | 🔴 Connection timeout (18.142.105.78) |
| xid_app_frontend.dev | — | — | — | — | 🔴 Host key verification failed |
| xid_saas_backend.dev | 202d | duplicates xid_sass_backend.dev IP 172-31-6-207 | | | ⚠️ alias duplicate |

**Trello: Marcel INCOMPLETE** — 5 hosts unreachable (DNS/host-key/timeout), 3 production hosts uptime >800d, 1 dev host no swap. Recommend host-key refresh + DNS cleanup.

---

## Rory (cPanel shared hosting — GoDaddy)

Server: `bql6w65kif0q@92.205.13.202`

| Metric | Value | Limit | Status |
|---|---|---|---|
| Home dir size | 12G | 50G | ✅ 24% |
| File count | 97,686 | 250,000 | ✅ 39% |

**Top consumers:**
| Path | Size |
|---|---|
| public_html | 12G |
| logs | 164M |
| access-logs | 159M |
| tmp | 121M |
| mail | 6.4M |

**Deletable cleanup candidates (~5.2G potential):**
- `public_html/booking/error_log.bk` — 879M
- `public_html/booking/error_log` — 753M
- `public_html/dev/error_log.bak.20251811` — 589M
- `public_html/dev/error_log` — 98M
- `public_html/booking.20251003.zip` — 1.5G
- `public_html/booking.zip` — 1.4G

Under limits but cleaning these would free headroom. Do NOT delete without confirmation.

**Trello: Rory ✅ marked complete**

---

## Actions Required (user)

1. **Siteground re-auth:** run `node scripts/siteground-storage.js --login` to restore Bailey storage checks.
2. **Fountain staging disk (75%):** approve cleanup of /var/log journal and old kernel headers, review Capistrano release retention.
3. **Fountain prod + staging swap:** both >30% swap used; investigate memory leaks / consider increasing RAM.
4. **Marcel unreachable hosts:** xidsg.com and xid.stlodge have no DNS; xid_app_frontend and xid_app_frontend.dev have stale SSH host keys; xid_sass_frontend.dev timing out on port 22.
5. **High uptime servers (>365d):** Bailey Console (827d), Bailey Staging (736d), Fountain prod (765d), xid_saas_backend (867d), xid_saas_frontend (820d), xid_app_backend (487d). Consider scheduled maintenance reboots for kernel updates.
6. **Rory cleanups:** ~5.2G of old error logs + booking zip backups — confirm deletion.

## Trello Checklist State

| Item | Final State |
|---|---|
| Bailey | incomplete (siteground not checked) |
| Elena - WordPress SamGuard | ✅ complete |
| Neural Contract - Contract Probe | ✅ complete |
| Fountain | incomplete (75% disk + critical swap) |
| Marcel | incomplete (5 unreachable hosts) |
| Rory | ✅ complete |
