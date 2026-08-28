# Server Monitor — 2026-08-28 08:37

## Alerts Summary
- 🔴 **Fountain Staging**: disk 91% used (44G/49G avail) — CRITICAL, >85% threshold
- 🔴 **Fountain Production**: swap 42.5% used (3.4G/8G) — CRITICAL, >30% threshold. Mem available 29.5% — borderline WARNING
- 🔴 **Neural Contract Staging**: unreachable, SSH connection timeout (52.65.197.217:22) after 2 retries — not an auth issue, host itself not responding. Trello item left incomplete.
- ⚪ Siteground (Bailey) storage check permanently skipped per user decision 2026-08-28 (CAPTCHA login unautomatable) — see memory `feedback_siteground_skip_permanently`.
- ⚪ Marcel dev/staging boxes (xid_app_backend.dev, xid_sync_console.dev, xid_sass_backend.dev) unreachable — known persistent timeout pattern per prior runs.
- ⚪ Rory: 2.9G deletable zip backups (`booking.zip` 1.4G, `booking.20251003.zip` 1.5G) + 1.4G old error_log backups — not urgent (26% disk used), flagging for future cleanup.

## Bailey
| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| Siteground | — | — | — | — | SKIPPED (permanent, CAPTCHA) |
| Console (speedventory) | 52% | 86% | 1.6% | 0.04 | OK |
| Redis | keys=13852, mem 121.56M (1.6% of 7.67G system) | — | — | — | OK |
| Staging | 55% | 60% | 3.9% | 0.00 | OK |

Docker (Console): wms-nov_app_1, wms-nov_sidekiq_1, wms-nov_redis_1 all Up.
Docker (Staging): 7 containers, all Up (console_new_*, console2_*).

## Elena — WordPress SamGuard
| Server | Disk | Mem avail | Swap | Load/core |
|---|---|---|---|---|
| samguard.co | 46% | 58% | 0.8% | 0.38 |

MySQL + Apache healthy.

## Neural Contract
| Server | Status |
|---|---|
| nc_staging (52.65.197.217) | UNREACHABLE — connection timeout, 2 retries |

## Fountain
| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| Staging | **91%** | 63% | 20.9% | 0.03 | 🔴 CRITICAL disk |
| Production | 44% | 29.5% | **42.5%** | 0.08 | 🔴 CRITICAL swap |

Docker: n/a (Puma/Sidekiq/Next.js processes, not containerized). Puma, Sidekiq (fountain_gifts + infinity_roses), next-server all running on both.

## Marcel (XID)
| Server | Disk | Mem avail | Swap | Load/core | Status |
|---|---|---|---|---|---|
| xid_sync_console | 65% | 87% | 0.4% | 0.05 | OK |
| xid_app_backend | 32% | 57% | 2.6% | 0.00 | OK |
| xid_saas_backend | 66% | 60% | 2.4% | 0.00 | OK |
| xid_app_frontend | 56% | 63% | 1.3% | 0.04 | OK |
| xid_saas_frontend | 39% | 59% | 2.5% | 0.00 | OK |
| xid_app_backend.dev | — | — | — | — | UNREACHABLE (timeout) |
| xid_sync_console.dev | — | — | — | — | UNREACHABLE (timeout) |
| xid_sass_backend.dev / xid_saas_backend.dev | — | — | — | — | UNREACHABLE (timeout) |

## Rory (cPanel shared hosting)
| Metric | Value | Limit | % |
|---|---|---|---|
| Disk usage | 13G | 50G | 26% |
| File count | 105,561 | 250,000 | 42% |

Top dirs: public_html 12G, tmp 71M, logs 47M.
Deletable: booking.zip (1.4G), booking.20251003.zip (1.5G), error_log.bk (879M), error_log.bak.20251811 (589M) — total ~4.4G reclaimable, not urgent.

## Trello Checklist Status
Bailey ✅, Elena ✅, Marcel ✅, Rory ✅, Fountain ✅, Neural Contract ⬜ (unreachable, left open).
Card not auto-completed (1 item still open).
