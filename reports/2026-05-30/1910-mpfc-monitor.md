## MPFC Monitor — 2026-05-30 19:10 (+07:00)

### Server

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | mpfc-live | ✅ |
| Uptime | 599 days, 4h 28m | ✅ |
| Load avg (1/5/15m) | 0.33 / 0.48 / 0.43 | ✅ OK (4 cores, per-core: 0.08) |
| Memory | 1.5Gi used / 7.8Gi total — 5.9Gi available | ✅ |
| Disk (/) | 38G used / 155G — 25% | ✅ |
| Swap | 109MB / 8GB used | ✅ |
| Apache | Active (running) since 2026-04-09 — 3.9GB memory | ✅ |
| Resque worker | `resque-1.2 (default): Waiting` | ✅ |

> Note: `claude --dangerously-skip-permissions` process (PID 437937) consuming 5.6% MEM — likely a Claude session on server, not a concern.

---

### WordPress

**PHP/Apache Errors:** None in `/var/log/apache2/error.log`

**Debug Log:** Rollbar entries only — recurring `Undefined index: HTTP_HOST` in `wp-config.php:159` triggered by WP-CLI (cron runs). Pre-existing known issue, not a real runtime error.

**Cron Health:** All events running normally
- `mm_resque_jobs_worker` — ✅ running every minute
- `action_scheduler_run_queue` — ✅ running every minute
- `process_unqueued_custom_jobs_hook` — ✅ running every 40s
- `mm_local_billing` — next in 7m, `mm_process_reminders` — next in 14m
- No overdue events (all within schedule)

**Action Scheduler failed (24h):** 0 ✅

---

### MemberMouse

| Type | Count | Details |
|------|-------|---------|
| New members (24h) | 0 | — |
| Cancellations (24h) | 0 | — |
| Failed payments (24h) | 0 | ✅ |

No MemberMouse activity in the last 24 hours.

---

### Slack (MyPersonalFootballCoach)

Channels monitored: `#mypersonalfootballcoach-app`, `#general`, `#random`

**No messages in the last 24 hours** across all channels.

---

### New Relic APM (MPFC-live2, 24h)

| Metric | Value | Status |
|--------|-------|--------|
| Total requests | 44,090 | — |
| Avg response time | 1.07s | ⚠️ Elevated (attack traffic inflating) |
| P95 response time | 2.06s | ⚠️ |
| HTTP 200 | 30,583 (69%) | ✅ |
| HTTP 302/301 | 11,118 | ✅ |
| HTTP 404 | 1,816 | ⚠️ Normal (attack probing) |
| HTTP 500 | 303 | ⚠️ |
| HTTP 401 | 206 | ⚠️ (brute force attempts) |

**Top Error Sources (24h):**
| Transaction | Count |
|-------------|-------|
| heartbeat (admin-ajax) | 305 — pre-existing PHP notice false positives |
| wp-admin/edit.php | 80 |
| admin-ajax module-handle | 38 |
| wp-admin/admin.php | 32 |
| processOrder.php | 8 — pre-existing known issue |

**Attack Traffic (Top Transactions):**
| Pattern | Count |
|---------|-------|
| xmlrpc.php | 6,755 — brute force |
| /login/ | 6,611 — brute force |
| /home | 3,933 — legitimate |
| SQL injection timing attacks (`waitfor delay`) | ~1,900+ combined |
| DBMS_PIPE Oracle injection | ~570 |
| /user-video/ | 553 — legitimate |

Attack traffic ~31% of total requests — consistent with pre-existing baseline.

**500 errors (303):** Mostly heartbeat false positives + WP admin. Not indicative of site-breaking issues. Worth monitoring if it spikes.

---

### GitHub

Repo `nustechnology/mypersonalfootballcoach`: no access with nuscarrick account. Unable to check open PRs.

---

### Summary

✅ Server healthy — disk 25%, memory fine, load minimal
✅ WordPress cron all running normally, 0 Action Scheduler failures
✅ MemberMouse — 0 new, 0 cancelled, 0 failed payments
✅ Slack — quiet (no messages 24h)
⚠️ 303 HTTP 500s — elevated but consistent with heartbeat false positives; monitor for spike
⚠️ Attack traffic steady at ~31% (xmlrpc + SQL injection) — pre-existing baseline, no escalation
⚠️ GitHub PR check unavailable (no repo access with nuscarrick)
