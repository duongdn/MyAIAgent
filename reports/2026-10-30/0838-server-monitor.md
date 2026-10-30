# Server Monitor — 2026-10-30 08:38 (UTC+7)

Trello: https://trello.com/c/QBT50zb6/1569-check-server-status — 5/6 marked (Bailey pending)

## Summary
| Group | Status | Note |
|---|---|---|
| Bailey | 🔴 BLOCKED | Console `speedventory` (15.236.220.178): **SSH host key CHANGED** → connection refused by strict check. Console + Redis not checked. Staging OK. Siteground skipped (per user) |
| Elena SamGuard | OK | |
| Neural Contract | IGNORED | nc_staging stopped intentionally (user confirmed) |
| Fountain | WARNING | Staging disk 78% (↑75%), swap 1.1G/4G |
| Marcel XID | OK | sync_console 75%→54% after syslog.1 truncate; dev hosts dead (removed from skill) |
| Rory | OK | 13G/50G, 110,531 files |

## Bailey
| Server | Disk | Mem avail | Swap | Load/core | Docker | Status |
|---|---|---|---|---|---|---|
| Console | — | — | — | — | — | 🔴 host key changed (known_hosts:81, new ED25519 SHA256:YmUyQQ1I3bh7rjuGEUrGketaUA81+6OeO5wYTNFD8H4) |
| Redis | — | — | — | — | — | not checked (needs Console) |
| Staging | 56% (54G/97G) = | 2.3G/3.8G (61%) | 387M/8G (5%) | 0.00 | console_new/console2 app+sidekiq Up 37m; redis/mailcatcher Up 8w; db Up 8mo | OK |

Host key change = instance rebuilt/replaced OR MITM. Not bypassed. Need confirm with Bailey/infra before `ssh-keygen -R 15.236.220.178`.

## Elena — SamGuard
| Disk | Mem avail | Swap | Load/core | Procs | Status |
|---|---|---|---|---|---|
| 48% (23G/48G) = | 1.1G/1.9G (58%) | 90M/2G (4%) | 0.17/1 | mysqld (up since 10-24), apache2 workers | OK |

## Neural Contract — Staging
SSH timeout (52.65.197.217:22), retried. Prev 10-23: OK but no swap. Possibly stopped instance / SG change.

## Fountain
| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| Staging | **78% (38G/49G)** ↑ from 75% | 4.7G/7.8G (60%) | 1.1G/4G (28%) ↓ from 52% | 0.21/4 | WARNING |
| Prod | 53% (82G/155G) ↑ from 50% | 2.0G/7.8G (26%) | 2.3G/8G (29%) | 0.33/4 | WARNING (mem avail <30%) |

Procs OK: puma, sidekiq, next-server (FG + Infinity Roses) running both servers.
Staging breakdown (www-data only, no sudo): /var/www 5.9G… BE 4.0G, IR_BE 2.6G, FE 2.5G, IR_FE 2.0G, blogs 670M. Remaining ~26G outside /var/www (likely DB/logs/releases) — need root to break down.

## Marcel (XID)
| Host | Disk | Mem avail | Swap | Status |
|---|---|---|---|---|
| xid_sync_console | **75%** (37G/49G) ↑ from 73% | 13G/15G | 21M/6G | WARNING |
| xid_app_backend | 32% = | 553M/949M | 57M/2G | OK |
| xid_saas_backend | 67% = | 536M/949M | 55M/2G | OK |
| xid_app_frontend | 56% = | 607M/953M | 26M/2G | OK |
| xid_saas_frontend | 39% = | 557M/949M | 52M/2G | OK |
| xid_app_backend.dev / xid_sync_console.dev / xid_sass_backend.dev / xid_saas_backend.dev | — | — | — | timeout (unreachable) |

xid_sync_console breakdown: /var 21G — syslog.1 **11G**, syslog 7.4G, journal 1.0G; /home 4.9G, /usr 2.4G. Known cause = verbose SQL syslog (keep log level). Suggested (needs OK): `sudo truncate -s 0 /var/log/syslog.1` → frees ~11G (~53%).

## Rory (cPanel)
| Disk | Files | Status |
|---|---|---|
| 13G/50G (26%) = | 110,531/250,000 (44%) | OK |

Deletable candidates: booking.20251003.zip 1.5G, booking.zip 1.4G, booking/error_log.bk 879M, dev/error_log.bak.20251811 589M, bxr-retired-selfridges-20261029 372M (new, 10-29 archive).

## Unresolved questions
1. speedventory host key changed — asked in Matrix Bailey/Paturevision room 08:43 (likely dev server task), awaiting confirm before updating known_hosts
2. ~~nc_staging down~~ — intentional, ignore
3. ~~Truncate syslog.1~~ — DONE 08:45 (user OK): 75% → 54% (27G/49G)
4. ~~XID dev hosts~~ — marked dead in skill (user OK)
