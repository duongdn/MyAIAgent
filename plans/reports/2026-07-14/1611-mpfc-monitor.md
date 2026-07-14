## MPFC Monitor — 2026-07-14 16:11 (+07:00)

---

### 1. Server

| Metric | Value | Status |
|--------|-------|--------|
| Hostname | mpfc-live | — |
| Uptime | 644 days, 1h 27m | ✅ |
| Load avg (1/5/15m) | 1.04 / 0.67 / 0.83 | ⚠️ (1-min load = 1.04 on 4 cores = 0.26/core) |
| Memory used | 1.6Gi / 7.8Gi (21%) | ✅ |
| Memory available | 5.7Gi (73%) | ✅ |
| Swap used | 684Mi / 8Gi (8.5%) | ✅ |
| Disk / | 49G / 155G (32%) | ✅ |
| Apache | active (running) since 2026-05-30 | ✅ |
| Apache memory | 1.1Gi across 17 workers | ✅ |

**Top processes:** claude CLI (4.4% mem), apache workers (2.3% each, 5 active at ~4% CPU). Normal.

**Load note:** 1-min load spike to 1.04 (likely from claude process); 5/15min at 0.67/0.83 — trending down, no concern.

---

### 2. WordPress

**Debug log:** Only `Rollbar: Initial stack trace captured` entries (normal Rollbar instrumentation) and one benign WP-CLI cron notice (`Undefined index: HTTP_HOST`). No PHP Fatal errors. ✅

**Cron health:** All events running within schedule. Last runs successful:
- `check_missing_user_courses_hook` — 0.5s
- `action_scheduler_run_queue` — 0.052s
- `process_unqueued_custom_jobs_hook` — 0.147s
- `mm_resque_jobs_worker` — 0.023s ✅
- `mpfc_run_manually_process_stuck_events` — 2.153s
- All other events within expected windows

**Action Scheduler failed (24h):** 0 ✅

---

### 3. MemberMouse

| Type | Count | Details |
|------|-------|---------|
| New members (24h) | 0 | No new signups |
| Cancellations (24h) | 0 | None |
| Failed payments (24h) | 0 | None ✅ |

---

### 4. Slack (MyPersonalFootballCoach)

6 messages in last 24h (all from same channel `#U057RAV9C94`, appears to be a direct/group channel):

| Time | User | Message |
|------|------|---------|
| 01:35 | @freelancer | "để xem nha" |
| 08:55 | @freelancer | "I saw that the old push notification technique is removed, I need to rebuild it with new one, wait for me" |
| 09:07 | @freelancer | "Đã làm lại rồi, gởi API thì 200 nhưng vẫn chưa thấy noti AI nói là config gởi noti chưa đúng trên Firebase  Add tôi vào" |
| 09:08 | @tien271 | "rồi á" |
| 09:09 | @tien271 | "config bữa giờ vẫn thế mà" |
| 09:09 | @tien271 | "đừng có xóa đi tạo lại nha, cái app mới đang dùng nó nữa" |

**Notable:** Freelancer is rebuilding push notifications on Firebase — old technique was removed. API returns 200 but notifications not arriving. Tien warned not to delete/recreate Firebase config as the new app is using it. **Monitor if resolved.**

---

### 5. New Relic APM (MPFC-live2, last 24h)

| Metric | Value | Baseline | Status |
|--------|-------|----------|--------|
| Total requests | 39,986 | ~40K/day | ✅ |
| Avg response time | 1.295s | — | ✅ |
| Apdex (T=0.5s) | 0.49 | 0.53 | ⚠️ slight dip |
| Error rate | 2.00% | <1% target | ⚠️ |
| HTTP 500s | 80 | — | ⚠️ |
| HTTP 404s | 2,390 | — | ℹ️ |

**Percentiles:**
| P50 | P75 | P90 | P95 | P99 |
|-----|-----|-----|-----|-----|
| 0.92s | 1.47s | 2.31s | 3.56s | 6.88s |

vs baseline: P50=0.95s P75=1.28s P90=1.66s P99=3.06s — **P90/P95/P99 elevated vs baseline** ⚠️

**Slowest transactions (top 10):**
| Transaction | Avg | Max | Count |
|-------------|-----|-----|-------|
| sitemap_index.xml | 56.6s | 56.6s | 1 |
| author-sitemap.xml | 43.4s | 43.4s | 1 |
| processOrder.php | 16.3s | 24.5s | 3 |
| position/universal/feed/ | 13.0s | 13.0s | 1 |
| age/*/feed/ | 12.0s | 12.0s | 1 |
| attachment-sitemap8.xml | 11.8s | 11.8s | 1 |
| feed/ | 11.8s | 11.8s | 1 |
| team-library/st-mirren-fc/feed/ | 10.4s | 10.4s | 1 |
| home/mpfc-demo-dashboard/ | 9.0s | 9.2s | 2 |
| user-video/cruyff-turn-11 | 9.0s | 9.0s | 1 |

**sitemap_index.xml at 56.6s** — above 30s threshold (known issue, large sitemap). Single occurrence, low priority.
**processOrder.php avg 16.3s, max 24.5s** — within known range (avg 16.9s prev baseline). 3 orders processed. ✅

**DB performance:**
| Metric | Value | Status |
|--------|-------|--------|
| Avg DB calls/txn | 142.9 | ✅ |
| Max DB calls/txn | 7,699 | ⚠️ (high but below 19,592 seen prev) |
| Avg DB duration | 0.564s | ⚠️ just above 0.5s threshold |

Max DB calls at 7,699 — monitor for recurrence above 5,000.

**Error breakdown by transaction:**
- `admin-ajax.php-action=module-handle` — 2 errors
- `twentytwenty/index.php` — 1 (attack probe)
- `wp-admin/setup-config.php` — 1 (attack probe)
- `wp-includes/blocks/index.php` — 1 (attack probe)
- `home` — 1
- `wp-admin/network/` — 1 (attack probe)
- `twentynineteen/.*php` — 1 (attack probe)

Most errors are attack probes hitting non-existent paths. Real errors: module-handle (2) + home (1).

**Attack traffic (top transactions):**
- `home` — 12,833 (32.1% of all requests)
- `xmlrpc.php` — 6,306 (15.8%) — brute force
- `login/` — 6,091 (15.2%) — brute force
- SQL injection timing attacks (waitfor delay patterns) — ~649 combined

Attack traffic ~31% of total, consistent with known baseline.

---

### 6. Rollbar

| Level | Title | Count | Last |
|-------|-------|-------|------|
| ERROR | Call to a member function _get_option() on null | 10 | 07-09 07:01 UTC |
| ERROR | Call to a member function _get_option() on null | 4 | 07-09 07:02 UTC |
| ERROR | Call to undefined function mm_member_url() | 1 | 07-06 09:45 UTC |
| ERROR | ParseError: syntax error, unexpected '\' | 2 | 06-29 08:24 UTC |
| ERROR | Call to undefined method MM_PaymentServiceFactory::getService() | 2 | 06-29 08:08 UTC |
| ERROR | Class 'MM_CoreMembershipUtils' not found | 1 | 06-29 07:53 UTC |

**All errors pre-date last 24h** (latest: 07-09). No new Rollbar errors today. ✅
MemberMouse-related errors (`_get_option()`, `mm_member_url()`, `MM_PaymentServiceFactory`, `MM_CoreMembershipUtils`) are version mismatch issues — pre-existing, low frequency.

---

### 7. Cloudflare

**Traffic (UTC day):**
| Date | Requests | Cached | Cache% | Threats | Bandwidth | Pageviews | Uniques |
|------|----------|--------|--------|---------|-----------|-----------|---------|
| 2026-07-14 (partial) | 44,139 | 25,378 | 57.5% | 7 | 2.2 GB | 8,721 | 5,426 |
| 2026-07-13 | 151,745 | 113,507 | 74.8% | 1 | 9.3 GB | 16,788 | 10,720 |

**Threats today: 7** (vs 1 yesterday) — minor uptick from baseline of 0. ⚠️ minor
**2026-07-13 requests (151,745)** — significantly higher than 2026-05-29 baseline of 218,361; within normal range.

**Firewall events (last 23h):** 8 blocks total
- 7x `block` from US via BIC rule
- 1x `block` from T1 (Tor) via BIC rule

**SSL:** universal cert active ✅  
**Security level:** medium ✅  
**SSL mode:** full ✅

---

### 8. GitHub (mypersonalfootballcoach/wp)

Repository not found via `gh pr list` — repo name may have changed or access revoked. No PRs checked.

---

### Summary

| Check | Status |
|-------|--------|
| Server | ✅ Healthy — load, disk, memory all fine |
| WordPress | ✅ No fatal errors, cron running |
| MemberMouse | ✅ No new members/cancellations/failed payments |
| Slack | ⚠️ Firebase push notification issue being worked on (freelancer + tien271 active) |
| New Relic | ⚠️ Error rate 2% (above 1% threshold); P90/P95/P99 elevated; Apdex 0.49 slight dip |
| Rollbar | ✅ No new errors today (all errors pre 07-09) |
| Cloudflare | ✅ SSL/security OK; 7 threats today (minor); 8 BIC blocks in 23h |
| GitHub | ❓ Repo access issue — could not list PRs |

**Overall: ⚠️ 2 warnings, 1 unknown**

**Action items:**
1. **Firebase push notifications** — freelancer rebuilding; tien271 warned about config deletion. Follow up to confirm resolution.
2. **New Relic error rate 2%** — identify root cause of 80 HTTP 500s; check if `admin-ajax.php-action=module-handle` errors are recurring or one-off.
3. **GitHub repo access** — verify `mypersonalfootballcoach/wp` repo name or check gh auth for nuscarrick account.
4. **Max DB calls 7,699** — keep monitoring; previous spike hit 19,592 (N+1 query risk).
