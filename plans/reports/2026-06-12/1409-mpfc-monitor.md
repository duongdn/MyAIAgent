## MPFC Monitor — 2026-06-12 14:09 (+07:00)

---

### Server

| Metric | Value | Status |
|--------|-------|--------|
| Uptime | 611 days, 23:25 | ✅ |
| Load avg (1/5/15m) | 1.50 / 0.73 / 0.53 (4 cores) | ⚠️ current load elevated (0.375/core) |
| Memory available | 5.7Gi / 7.8Gi (73%) | ✅ |
| Swap used | 732Mi / 8Gi | ✅ |
| Disk (/) | 44G / 155G (29%) | ✅ |
| Apache | Running since May 30, 1.5GB RAM | ✅ |
| Top process | claude 4.3% mem, Apache workers 2-3% | — |

---

### WordPress

**Error Logs:** No fatal errors in Apache error.log. Debug log shows recurring known issues:
- `get_magic_quotes_gpc() is deprecated` — json-api plugin, harmless deprecation
- `Undefined index: HTTP_HOST` — wp-config.php line 161, known recurring issue
- `Use of undefined constant type` — dynamicballmastery.php line 500
- `Undefined index: _wpnonce` — database-browser plugin, cosmetic

**Cron:** All events running normally. `mm_resque_jobs_worker` ✅ running. Action Scheduler all on schedule.

**Action Scheduler failed (24h):** 0 ✅

---

### MemberMouse

| Type | Count | Details |
|------|-------|---------|
| New members (24h) | 0 | — |
| Cancellations (24h) | 0 | — |
| Failed payments (24h) | 0 | ✅ |

---

### Slack (MyPersonalFootballCoach)

Auth: ✅ connected. 3 channels. **No messages in last 24h** — no activity to report.

---

### GitHub (mypersonalfootballcoach/wp)

Open PRs: **0** ✅ (open_issues_count = 0)
Last commit: 2026-05-01 — `docs(claude): add live deployment steps for 121 checkout`
Last push: 2026-06-12 06:42 UTC (branch push, not main)

---

### New Relic APM (MPFC-live2)

| Metric | Value | Status |
|--------|-------|--------|
| Transactions (24h) | 35,472 | — |
| Avg duration | 1.53s | ⚠️ |
| Apdex (T=0.5s) | 0.50 | ⚠️ WARNING |
| Error rate | 0.28% | ✅ |
| P50 | 1.16s | ✅ |
| P75 | 1.53s | ✅ |
| P90 | 1.84s | ✅ |
| P95 | 2.31s | ✅ |
| P99 | 17.5s | 🔴 CRITICAL (>10s) |
| Avg DB calls/txn | 189.8 | ✅ |
| Max DB calls (single txn) | 7,965 | 🔴 CRITICAL (>2000) |
| Avg DB duration | 0.615s | ⚠️ WARNING |

**HTTP Status Codes:**
- 200: 25,879 | 302: 6,217 | 301: 1,718 | 404: 1,479 | 401: 102 | 500: 24

**500 errors: 24** — needs investigation.

**Slowest Transactions (top 5):**
All appear to be attack probe traffic timing out at ~40-60s (config file scans, credential probes):
1. `author-sitemap.xml` — 59.4s (1 hit) — sitemap timeout (previously known)
2. `sitemap_index.xml` — 59.3s (1 hit)
3. `config/credentials.json` — 43.2s (1 hit) — attacker probe
4. `config/parameters.yaml` — 42.5s (1 hit) — attacker probe
5. `debug.log` — 41.3s (1 hit) — attacker probe

**Attack Traffic:** SQL injection timing attacks via search (`waitfor delay`) still active — ~800-828 hits per variant, 5+ encoded variants. xmlrpc.php: 2,516 hits (ongoing brute force).

**Errors breakdown:** heartbeat=43 (false positives), admin.php=5, module-handle=4, team-manager/=4.

---

### Rollbar

| Level | Item | Count | Last |
|-------|------|-------|------|
| ERROR | Google_AuthException: Error refreshing OAuth2 token | 781 | 06-12 06:51 UTC ⚠️ ACTIVE TODAY |
| ERROR | `_get_option()` on null (MemberMouse) | 2-3 | 06-08 |
| ERROR | `MM_Member` not found | 1 | 06-04 |
| ERROR | `MM_MemberSearch` not found | 1 | 06-04 |
| ERROR | `MM_Product::findAll()` undefined method | 1 | 05-28 |
| CRITICAL | Memory exhausted (1GB limit) | 9 | 05-20 (not recent) |

**⚠️ Google_AuthException still firing today (06-12 06:51 UTC)** — Google OAuth token needs re-authorization in WP admin. 781 total occurrences.

---

### Cloudflare

| Date | Requests | Cached | Cache% | Threats | Bandwidth | PageViews | Uniques |
|------|----------|--------|--------|---------|-----------|-----------|---------|
| 2026-06-11 | 181,079 | 129,253 | 71% | 1 | 13.2 GB | 27,715 | 9,348 |
| 2026-06-12 (partial) | 55,819 | 40,120 | 72% | 9 | 2.8 GB | 7,446 | 2,774 |

**Firewall Events (23h):** 10 blocks — 9 from Israel (IL), 1 from Netherlands (NL), all via `bic` source.
**SSL:** universal, active ✅
**Security level:** medium ✅

⚠️ 9 threats today vs 1 yesterday — minor spike, likely related to the security scanning probes visible in New Relic.

---

### Summary

⚠️ **3 warnings / 1 active issue needing attention:**

1. **🔴 Google OAuth expired (Rollbar)** — `Google_AuthException` fired again at 06:51 UTC today (781 total). Re-authorize Google integration in WP admin → Settings → [Google plugin]. Recurring known issue but still unresolved.

2. **🔴 P99 response time: 17.5s** — Above 10s critical threshold. Driven by attack probe traffic timing out (40-60s slowest txns). Legitimate apdex likely higher than 0.50 but attack volume is inflating metrics.

3. **🔴 Max DB calls: 7,965 in single txn** — Critical threshold (>2000). Down from previous 19,592 high but still elevated. N+1 query problem persists.

4. **⚠️ 24× HTTP 500 errors** — small volume but worth checking Apache logs for patterns.

**No MemberMouse issues, no failed payments, server healthy, no open PRs, cron running normally.**
