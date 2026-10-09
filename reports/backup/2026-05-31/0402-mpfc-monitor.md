## MPFC Monitor — 2026-05-31 04:02 (+07:00)

### Server
| Metric | Value | Status |
|--------|-------|--------|
| Hostname | mpfc-live | ✅ |
| Uptime | 599 days | ✅ |
| Disk (/) | 39G / 155G (26%) | ✅ |
| Memory available | 5.4Gi / 7.8Gi | ✅ |
| Swap used | 186Mi / 8.0Gi (2.3%) | ✅ |
| Load avg (1/5/15m) | 0.55 / 0.45 / 0.37 | ✅ 0.14/core |
| Apache | active (running) since 2026-05-30 12:31 UTC | ✅ |
| Apache memory | **2.3GB** (was 932MB yesterday) | ⚠️ |
| MySQL | OK (cron log clean) | ✅ |

**⚠️ Apache memory spike:** Top workers at 3.8% MEM (304MB) each vs ~2.3% (184MB) yesterday. Total Apache footprint jumped 2.5×. Available memory still healthy (5.4Gi) but worth monitoring — may indicate memory leak in a module or heavy request load overnight.

---

### WordPress
| Item | Status |
|------|--------|
| PHP Fatal errors | None | ✅ |
| Deprecation notices | `get_magic_quotes_gpc()` in json-api (known) | ℹ️ |
| Cron events | All on schedule, no overdue | ✅ |
| mm_resque_jobs_worker | Running | ✅ |
| automator_report | 3.1s (slightly slow, monitor) | ℹ️ |
| Action Scheduler failed (24h) | 0 | ✅ |

---

### MemberMouse
| Type | Count | Details |
|------|-------|---------|
| New members (24h) | 0 | — |
| Cancellations (24h) | 0 | — |
| Failed payments (24h) | 0 | ✅ |

---

### Slack
- **MPFC workspace:** 0 messages in last 24h. Quiet.

---

### New Relic APM
| Metric | Value | vs Yesterday | Status |
|--------|-------|-------------|--------|
| Total requests (24h) | 41,940 | ↓ 1,261 | ✅ |
| Avg duration | 0.969s | ↓ 0.097s | ✅ |
| Apdex (T=1.0s) | **0.81** | ↑ 0.05 | ✅ |
| Error rate | **0.057%** | ↓ 1.20% | ✅ |
| P50 / P75 / P90 | 0.86s / 1.16s / 1.41s | improved | ✅ |
| P95 / P99 | 1.59s / 2.81s | improved | ✅ |
| Avg DB duration | 0.311s | ↓ 0.049s | ✅ |
| Avg DB calls/txn | 167 | ↓ 17 | ✅ |
| Max DB calls (single txn) | 5,102 | ↓ 14,490 | ⚠️ still high |

**Apdex breakdown:** satisfied=15,097 | tolerating=26,615 | frustrated=227

**Slowest Transactions:**
| Transaction | Avg | Max | Count | Note |
|-------------|-----|-----|-------|------|
| sitemap_index.xml | 44.91s | 48.24s | 3 | ⚠️ Hits from pre-cache period; cache active since 14:00 UTC yesterday |
| checkout/klarna-confirmation/ | 44.23s | 44.23s | 1 | ⚠️ Same hit from yesterday (rolling 24h window) |
| author-sitemap.xml | 37.73s | 37.73s | 1 | ⚠️ NEW — not warmed by cache yet |
| search/*/feed/rss2/ | 25.62s | 27.44s | 2 | attack pattern |
| search/%252...encoded | 20.97s | 20.97s | 1 | attack pattern |

**Error breakdown:**
- wp-config-sample.php attacks: 4 (probing for config — normal bot activity)
- wp-admin/: 2, post.php: 2
- api/auth/refresh: 1 (notable — auth refresh failing)

---

### Rollbar
No new items since yesterday. All same known active issues:
| Level | Item | Count | Last |
|-------|------|-------|------|
| ERROR | Google_AuthException: invalid_grant | 758 | 05-29 08:23 |
| ERROR | MM_Product::findAll() undefined | 1 | 05-28 |
| CRITICAL | Memory exhausted (1GB) | 9 | 05-19/20 |

No new errors in last 24h. ✅

---

### Cloudflare
| Date | Requests | Cached | Threats | Bandwidth | Pageviews | Uniques |
|------|----------|--------|---------|-----------|-----------|---------|
| 2026-05-31 (partial ~04:02 UTC) | 16,436 | 11,065 (67.3%) | 0 | 1.0GB | 3,258 | 1,855 |
| 2026-05-30 (full day) | 145,982 | 95,176 (65.2%) | 0 | 11.9GB | 26,748 | 7,207 |

- **Firewall events (23h):** None
- **SSL:** active (universal) ✅
- **Security level:** medium ✅

---

### GitHub
- ⚠️ N/A — `gh` CLI not authenticated on this server

---

### Summary
✅ **Good day — all key metrics improved vs yesterday**

| # | Level | Item |
|---|-------|------|
| 1 | ⚠️ | Apache memory: 2.3GB (2.5× yesterday's 932MB). Available RAM still healthy. Monitor for leak. |
| 2 | ⚠️ | `author-sitemap.xml` 37.73s — not cached yet. Recommend warming all individual sitemaps. |
| 3 | ⚠️ | `sitemap_index.xml` still in slow list — hits from pre-cache period (before 14:00 UTC May 30). Should clear from next 24h window. |
| 4 | ℹ️ | `checkout/klarna-confirmation/` 44.23s — still in rolling window from yesterday. Investigate if new hits occur. |
| 5 | ℹ️ KNOWN | Google OAuth `invalid_grant` — unchanged, still needs WP Admin re-auth. |

**Improvements since yesterday:**
- Apdex 0.76 → **0.81** ✅
- Error rate 1.26% → **0.057%** ✅
- Avg duration 1.066s → **0.969s** ✅
- P50 0.95s → **0.86s** ✅
- Max DB calls 19,592 → **5,102** ✅
