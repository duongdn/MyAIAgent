## MPFC Monitor — 2026-05-30 19:24 (+07:00)

### Server

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 599 days, 4h 40m | ✅ |
| Load avg (1/5/15m) | 1.22 / 0.99 / 0.71 | ⚠️ 1m load elevated (4 cores, per-core: 0.30 → OK trend) |
| Memory | 1.6Gi used / 7.8Gi — 5.7Gi available | ✅ |
| Disk (/) | 39G / 155G — 25% | ✅ |
| Swap | 109MB / 8GB | ✅ |
| Apache | Active (running) since 2026-04-09 | ✅ |

> Load 1.22 on 1m avg — slightly elevated but trending down (5m=0.99, 15m=0.71). Likely transient spike, not sustained.

---

### WordPress

**PHP/Apache Errors:** None — no Fatal/Error in `/var/log/apache2/error.log`

**Debug Log:**
- `get_magic_quotes_gpc() is deprecated` in `json-api` plugin (PHP 8.x deprecation, type 8192 = E_DEPRECATED) — pre-existing, low severity
- `Undefined index: HTTP_HOST` in `wp-config.php:159` via WP-CLI — pre-existing, cron context only

**Cron Health:** All events on schedule ✅
- `mm_resque_jobs_worker` — next in 44s ✅
- `action_scheduler_run_queue` — next in 19s ✅
- `mm_local_billing` — next in ~10m ✅
- No overdue events

**Action Scheduler failed (24h):** 0 ✅

---

### MemberMouse

| Type | Count | Details |
|------|-------|---------|
| New members (24h) | 0 | — |
| Cancellations (24h) | 0 | — |
| Failed payments (24h) | 0 | ✅ |

---

### Slack

Channels: `#mpfc-app`, `#general`, `#random` — **no messages in 24h**

---

### New Relic APM (MPFC-live2, 24h)

| Metric | Value | Status |
|--------|-------|--------|
| Total requests | 43,821 | — |
| Avg response time | 1.07s | ⚠️ (attack traffic inflating) |
| P95 response time | 1.97s | ⚠️ |
| HTTP 200 | 30,463 | ✅ |
| HTTP 302/301 | 10,979 | ✅ |
| HTTP 404 | 1,812 | ⚠️ (attack probing) |
| HTTP 500 | 303 | ⚠️ (heartbeat false positives) |
| HTTP 401 | 205 | ⚠️ (brute force) |

**Attack traffic (top by volume):**
| Pattern | Count |
|---------|-------|
| xmlrpc.php brute force | 6,616 |
| /login/ brute force | 6,471 |
| SQL injection `waitfor delay` variants | ~1,940 combined |
| DBMS_PIPE Oracle injection | ~558 |

Consistent with pre-existing ~31% attack baseline — no escalation.

---

### Rollbar (production)

| Level | Title | Occ | Last |
|-------|-------|-----|------|
| 🔴 ERROR | `Google_AuthException: invalid_grant` (OAuth2 token expired) | 758 | 05-29 08:23 UTC |
| 🔴 ERROR | `Google_AuthException` (second instance) | 6 | 05-27 17:55 UTC |
| ⚠️ ERROR | `MM_Product::findAll()` undefined method | 1 | 05-28 06:48 UTC |
| ⚠️ ERROR | `getName() on string` | 1 | 05-28 06:48 UTC |
| ⚠️ ERROR | `MM_Product::getPaymentType()` undefined method | 1 | 05-26 16:30 UTC |
| ⚠️ ERROR | `_get_option() on null` | 2 | 05-26 09:02 UTC |
| 🔴 CRITICAL | Memory exhausted (1GB) | 1 | 05-20 13:03 UTC |
| 🔴 CRITICAL | Memory exhausted (1GB) | 8 | 05-19 17:37 UTC |
| ⚠️ ERROR | `Essential_Grid::$grid_params` private property | 1+3 | 05-18 |
| ⚠️ ERROR | `Populate_From_Query::m` — too few args | 6 | 05-07 |

**Key concern: Google OAuth (`invalid_grant`) — 758 occurrences, still firing (last 05-29)**
Google integration needs re-authorization in WP admin. This has been accumulating for a while.

Memory exhaustion (CRITICAL) — last occurrence 05-20, not recent. Monitor for recurrence.

---

### GitHub — `mypersonalfootballcoach/wp`

No open PRs ✅

---

### Summary

✅ Server OK — disk 25%, memory healthy, load transient spike
✅ WordPress cron — all events on schedule, 0 Action Scheduler failures
✅ MemberMouse — 0 new, 0 cancelled, 0 failed payments
✅ Slack — quiet (no messages 24h)
✅ GitHub — no open PRs
⚠️ New Relic — 303 HTTP 500s (heartbeat false positives, consistent baseline); attack traffic ~31%
🔴 Rollbar — Google OAuth `invalid_grant` (758 occ, still firing) — **needs WP admin re-auth**
⚠️ Rollbar — MemberMouse `MM_Product` undefined method errors (low freq, version mismatch)
⚠️ Rollbar — Memory exhausted CRITICAL (last 05-20, not recent — monitor)
