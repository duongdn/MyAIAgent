## MPFC Monitor — 2026-06-08 13:30 (+07:00)

### Server

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 607 days, 22h | ✅ |
| Disk (/) | 43G / 155G (28%) | ✅ |
| Memory available | 5.5G / 7.8G (70% free) | ✅ |
| Swap used | 719MB / 8GB | ✅ |
| Load avg (1/5/15m) | 1.26 / 0.70 / 0.45 | ✅ (0.32/core) |
| CPU cores | 4 | — |
| Apache | active, running since 2026-05-30 | ✅ |

Top processes: `claude` (40% CPU — monitoring session), `apache2` workers (~2% CPU each). Normal.

---

### WordPress

**Errors:**
- `Undefined index: HTTP_HOST` — known WP CLI artifact (non-fatal, PHP Notice)
- `get_magic_quotes_gpc() deprecated` — json-api plugin, PHP 7.x compat, low impact
- No PHP Fatal errors in debug log ✅

**Cron:**
| Event | Status |
|-------|--------|
| mm_resque_jobs_worker | ✅ Running (1-min schedule) |
| action_scheduler_run_queue | ✅ Running |
| process_unqueued_custom_jobs_hook | ✅ Running |
| check_missing_user_courses_hook | ✅ Running |
| mm_local_billing | ✅ Next run ~2 min |

Cron log shows clean execution — all events completing in < 1s. ✅

**Action Scheduler:** 0 failed jobs in last 24h ✅

---

### MemberMouse

| Type | Count | Details |
|------|-------|---------|
| New members (24h) | 0 | — |
| Cancellations (24h) | 0 | — |
| Failed payments (24h) | 0 | — |

No member activity in last 24h. ✅

---

### Slack (MyPersonalFootballCoach)

0 messages in the last 24h across #general, #random, #mypersonalfootballcoach-app. ✅

---

### New Relic APM

| Metric | Value | Status |
|--------|-------|--------|
| Transactions (24h) | 26,700 | — |
| Avg duration | 1.58s | — |
| Apdex (T=0.5s) | 0.52 | ⚠️ (baseline 0.53) |
| Error rate | 0.071% | ✅ |
| P50 | 1.16s | ✅ |
| P75 | 1.41s | ✅ |
| P90 | 1.66s | ✅ |
| P95 | 2.06s | ✅ |
| P99 | 24.5s | ⚠️ (attack traffic) |
| Avg DB calls/txn | 186 | ✅ |
| Avg DB duration | 0.54s | ⚠️ (borderline) |
| **Max DB calls/txn** | **7,691** | 🔴 CRITICAL |

**Slowest transactions (attack probes — all 1 occurrence each, ~46-48s):**
- `WebTransaction/Custom/app/config/config.yml` — 48.4s
- `WebTransaction/Custom/.github/workflows/main.yml` — 47.3s
- `WebTransaction/Custom/application/config/database.php` — 46.4s
- `WebTransaction/Custom/settings/production.py` — 46.3s

These are timing-attack probes scanning for config file exposure. Known pattern.

**Error breakdown (24h):**
- `team-manager/` — 6 errors
- `wp-admin/post.php` — 4 errors
- `admin-ajax.php heartbeat` — 2 (false positive, known)

**Note:** Max databaseCallCount = 7,691 in a single transaction (CRITICAL threshold >2000). Previously seen at 19,592. Investigate if this becomes recurring.

---

### Rollbar

| Level | Title | Count | Last seen |
|-------|-------|-------|-----------|
| 🔴 ERROR (NEW) | `Call to a member function _get_option() on null` | 5 | 06-08 04:40 UTC |
| ERROR | `Google_AuthException: Error refreshing OAuth2 token` | 781 | 06-07 06:53 UTC |
| ERROR | `Class 'MM_Member' not found` | 1 | 06-04 07:29 UTC |
| ERROR | `Call to undefined method MM_Product::findAll()` | 1 | 05-28 — |
| CRITICAL | `E_ERROR: Allowed memory size exhausted (1GB)` | 9 | 05-19/20 — |

**⚠️ New today:** `_get_option() on null` — 5 occurrences at 04:40 UTC. Likely a MemberMouse or plugin null-object bug. Low frequency so far but worth monitoring.

**Known issues (not actioned):**
- Google OAuth expired — needs re-authorization in WP Admin > Google integration
- Memory exhaustion — last seen 05-19/20, not recurring recently

---

### Cloudflare

| Date | Requests | Cached | Cache% | Threats | Bandwidth | PageViews | Uniques |
|------|----------|--------|--------|---------|-----------|-----------|---------|
| 2026-06-07 | 130,228 | 91,808 | 70.5% | 0 | 10.71 GB | 20,153 | 6,126 |
| 2026-06-08 (partial) | 34,912 | 24,417 | 69.9% | 8 | 2.90 GB | 5,654 | 2,129 |

**Firewall events (23h):** 8 blocks via Bot Intelligence Cloudflare
- Belgium (BE): 6 blocks
- Australia (AU): 2 blocks

Traffic is normal. 8 threats today vs 0 yesterday — minor, automated BIC blocks. ✅

**SSL:** active/universal ✅ | Security level: medium ✅ | SSL mode: full ✅

---

### GitHub

⚠️ `gh` CLI not authenticated (nuscarrick account) — unable to check open PRs.

---

### Summary

⚠️ 2 warnings / 🔴 1 critical

| Severity | Issue | Action |
|----------|-------|--------|
| 🔴 CRITICAL | Max DB calls 7,691 in one transaction | Monitor; investigate if recurring |
| ⚠️ WARNING | New Rollbar error: `_get_option() on null` (5x today 04:40 UTC) | Watch for increase; investigate plugin/MM source |
| ⚠️ WARNING | Apdex 0.52 (baseline 0.53, affected by attack traffic) | No action needed unless drops further |
| ℹ️ INFO | Google OAuth token still expired (781 total occurrences) | Re-authorize Google in WP Admin |
| ℹ️ INFO | GitHub PRs: gh CLI not authenticated | Manual check if needed |

Overall site health: **STABLE**. No member impact, cron healthy, error rate < 0.1%.
