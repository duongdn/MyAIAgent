## MPFC Monitor — 2026-07-14 15:08 (+07:00)

### Server

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 644 days | ✅ |
| Load (per core) | 3.24 / 4 = 0.81 | ⚠️ WARNING |
| Memory available | 4.2Gi / 7.8Gi = 54% | ✅ OK |
| Disk | 49G / 155G = 32% | ✅ OK |
| Swap | 678Mi / 8Gi = 8% | ✅ OK |
| Apache | active (since May 30), 43 tasks, 3.4G mem | ✅ OK |

**Details:** Server `mpfc-live` has been up 644 days. Load per core at 0.81 is at the WARNING boundary (0.7–1.0). Swap usage minor at 678Mi. Apache running 43 child processes consuming 3.4G total. WP-CLI functional though with persistent `Undefined index: HTTP_HOST` notice and `Module 'newrelic' already loaded` warning — cosmetic, non-blocking.

---

### WordPress

- **Debug log:** Present at `wp-content/debug.log`. Recent entries: `Undefined index: HTTP_HOST` in wp-config.php:161 (PHP Notice, low severity). No PHP Fatal errors.
- **Apache error log:** `/var/log/apache2/` exists but permission denied for reading — cannot inspect live PHP errors at edge.
- **Cron:** All events executing normally. Key events running: `action_scheduler_run_queue` (1min), `mm_resque_jobs_worker` (1min), `check_missing_user_courses_hook` (40s), `process_unqueued_custom_jobs_hook` (40s). No events overdue.
- **Action Scheduler failed (24h):** 0
- **Rollbar noise in debug.log:** ~15 "Rollbar: Initial stack trace captured" entries from cron/WP-CLI runs — these are Rollbar's own internal notes, not app errors.

**Status: ✅ No critical issues**

---

### MemberMouse

| Type | Count | Details |
|------|-------|---------|
| New members | 0 | No new signups in 24h |
| Cancellations | 0 | No cancellations |
| Failed payments | 0 | No failed payments |

**Status: ✅ Steady state**

---

### New Relic APM

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| Requests (24h) | 37,491 | — | — |
| Avg response | 1.29s | — | — |
| Apdex (T=0.5s) | **0.49** | >0.7 OK / 0.5–0.7 WARN / <0.5 CRIT | 🔴 CRITICAL |
| Error rate | 0.02% (7 errors) | <1% OK | ✅ |
| P50 / P75 / P90 | 0.89s / 1.47s / 2.31s | — | — |
| P95 / P99 | 3.56s / **6.88s** | P95 <2s OK / 2–5s WARN | ⚠️ P95 WARN / P99 OK |
| Avg DB calls/txn | 145 | <500 OK | ✅ |
| Max DB calls/txn | **4,767** | <500 OK / 500–2000 WARN | 🔴 CRITICAL |
| Avg DB duration | 0.56s | <0.5s OK / 0.5–1s WARN | ⚠️ WARNING |

**Slowest transactions (non-attack):**
- `sitemap_index.xml` — avg 56.55s, count 1 (known: large sitemap regeneration)
- `author-sitemap.xml` — avg 43.38s, count 1
- `processOrder.php` — avg 16.33s, max 24.54s, count 3 (known: MemberMouse payment API)
- Various `/feed/` endpoints — avg 10–13s each, low count
- `position/universal/feed/` — 12.99s
- `age/*/feed/` — 12.03s

**Top transactions by count:**
- `home` — 12,020 (32%)
- `xmlrpc.php` — 5,414 (14%) ← attack traffic (brute force)
- `login/` — 5,242 (14%) ← attack traffic
- `wp-json/oembed/*/embed` — 1,280
- SQL injection attempts in `/search/` paths — ~700 total

**HTTP status codes:**
- 200: 25,571 | 302: 7,728 | 404: 2,001 | 301: 1,934 | 401: 89 | **500: 81**

**Flags:**
- 🔴 **Apdex 0.49** — below CRITICAL threshold of 0.5, degraded from 0.53 baseline. Likely due to attack traffic inflating slow transaction denominator.
- 🔴 **Max DB calls 4,767** — above CRITICAL threshold of 2,000, down from 19,592 previously but still elevated. Possible N+1 query.
- ⚠️ **P95 at 3.56s** — WARNING zone (2–5s)
- ⚠️ **Avg DB duration 0.56s** — above OK threshold
- **500 errors:** 81 in 24h — needs investigation of source transactions
- Known slow paths (`processOrder.php`, sitemaps, feeds) consistent with prior baseline

---

### Rollbar

| Level | Item | Count | Last |
|-------|------|-------|------|
| ERROR | `Call to a member function _get_option() on null` | 4 | Jul-09 07:02 |
| ERROR | `Call to a member function _get_option() on null` | 10 | Jul-09 07:01 |
| ERROR | `Call to undefined function mm_member_url()` | 1 | Jul-06 09:45 |
| ERROR | `ParseError: syntax error, unexpected '\'` | 2 | Jun-29 08:24 |
| ERROR | `Call to undefined method MM_PaymentServiceFactory::getService()` | 2 | Jun-29 08:08 |
| ERROR | `Class 'MM_CoreMembershipUtils' not found` | 1 | Jun-29 07:53 |

**Status: ⚠️ 6 active items, all known.** The `_get_option()` on null items have 14 total occurrences with last activity Jul-09 — still recurring weekly. MemberMouse class/method errors (items 4–6) all from Jun-29, low frequency, likely related to MemberMouse version mismatch noted in prior runs.

---

### Slack (MyPersonalFootballCoach)

- **Messages in 24h:** 1 — `freelancer: để xem nha` (08:35 UTC) in a DM
- Channels: 32 total including `#mypersonalfootballcoach-app` (10 members), `#general`, `#random`, and 29 MP DMs
- No client messages, no error reports, no deployment notifications
- No d cookie configured — token-only auth may limit some API access

**Status: ✅ Quiet**

---

### Cloudflare

| Date | Requests | Cached | Threats | BW | Pageviews | Uniques |
|------|----------|--------|---------|----|-----------|--------|
| 2026-07-14 (partial) | 36,038 | 60% | **7** | 1,866MB | 7,203 | 5,032 |
| 2026-07-13 | 151,745 | 75% | 1 | 9,525MB | 16,788 | 10,720 |

**Firewall events (23h):** 8 blocks from Browser Integrity Check (7 US, 1 T1)
**SSL:** Active — universal cert for `mypersonalfootballcoach.com`, `*.mypersonalfootballcoach.com`
**Security level:** Medium | **SSL:** Full

**Status: ⚠️** Threats increased from 1 to 7 today. All blocked by BIC. No rate-limit or WAF blocks, meaning attack traffic still mostly bypasses CF edge to origin.

---

### GitHub

Repository `mypersonalfootballcoach/wp` returned 404 with current gh credentials. Cannot check open PRs.

**Status: ⚠️ Unable to verify — auth/permission issue**

---

### Summary

| Component | Status |
|-----------|--------|
| Server | ⚠️ Load per core at warning boundary (0.81) |
| WordPress | ✅ Cron healthy, no PHP Fatals |
| MemberMouse | ✅ No activity (quiet day) |
| New Relic | 🔴 Apdex 0.49 (critical), Max DB calls 4,767 (critical), P95 3.56s (warning) |
| Rollbar | ⚠️ 6 active items, all known/monitoring |
| Slack | ✅ Quiet |
| Cloudflare | ⚠️ 7 threats today (up from 1) |
| GitHub | ⚠️ Cannot access repo |

**🔴 2 critical | ⚠️ 4 warnings | ✅ 3 healthy**

**Recommended follow-ups:**
1. Investigate 81 HTTP 500 errors — identify which transactions return them
2. Max DB calls at 4,767 — potential N+1 query, check if the 19,592 peak from prior run recurred
3. Apdex at 0.49 — attack traffic inflates the denominator; consider CF WAF rate limiting on `/xmlrpc.php` and `/login/`
4. GitHub access — reconfigure gh auth or verify repo visibility
5. Apache error.log — request read access to `/var/log/apache2/error.log` on remote for PHP Fatal detection
