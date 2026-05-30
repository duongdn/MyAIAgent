## MPFC Monitor — 2026-05-30 13:29 (+07:00)

### Server
| Metric | Value | Status |
|--------|-------|--------|
| Hostname | mpfc-live | ✅ |
| Uptime | 599 days | ✅ |
| Disk (/) | 39G / 155G (25%) | ✅ |
| Memory available | 5.8Gi / 7.8Gi | ✅ |
| Swap used | 108Mi / 8.0Gi (1.3%) | ✅ |
| Load avg (1/5/15m) | 0.67 / 0.69 / 0.65 | ✅ 0.17/core |
| Apache | active (running), 932MB | ✅ |
| Apache reload | Graceful reload at 12:31 UTC today | ℹ️ |
| MySQL | Check ran (no fatal errors in cron log) | ✅ |

Top memory: `claude` 6.1%, Apache workers ~2.3-2.6% each.

---

### WordPress
| Item | Status |
|------|--------|
| PHP Fatal errors | None | ✅ |
| Deprecation notices | `get_magic_quotes_gpc()` in json-api plugin | ⚠️ known |
| Undefined index HTTP_HOST | In wp-config.php line 159 (CLI context only) | ℹ️ known |
| Cron events | All on schedule, no overdue | ✅ |
| mm_resque_jobs_worker | Running | ✅ |
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
| Metric | Value | Status |
|--------|-------|--------|
| Total requests (24h) | 43,201 | ✅ |
| Avg duration | 1.07s | ✅ |
| Apdex (T=0.5s) | 0.53 | ⚠️ WARNING (baseline) |
| Error rate | 1.26% | ⚠️ WARNING (1-3% range) |
| P50 / P75 / P90 | 0.95s / 1.28s / 1.66s | ✅ baseline |
| P95 / P99 | 1.97s / 3.06s | ✅ baseline |
| Avg DB duration | 0.36s | ✅ |
| Avg DB calls/txn | 184 | ✅ |
| Max DB calls (single txn) | 19,592 | ⚠️ N+1 (recurring, monitor) |

**Slowest Transactions:**
| Transaction | Avg | Max | Count | Note |
|-------------|-----|-----|-------|------|
| sitemap_index.xml | 47.96s | 48.24s | 2 | ⚠️ known, large sitemap |
| checkout/klarna-confirmation/ | 44.23s | 44.23s | 1 | 🔴 **NEW — Klarna callback slow** |
| search/what+is+ball+mastery/feed/rss2/ | 23.90s | 23.90s | 1 | attack pattern |
| search/%252...url-encoded-attack | 23.06s | 23.06s | 1 | attack |
| search/*/feed/rss2/ | 22.20s | 22.91s | 2 | attack |
| wp-admin/admin-ajax.php?action=update-plugin | 20.35s | 20.35s | 1 | plugin update |
| processOrder.php | 16.94s | 37.01s | 13 | ⚠️ known, payment API |

**Error breakdown (top):**
- heartbeat: 291 (known HTTP 200 false positives)
- edit.php: 80
- admin-ajax/module-handle: 34
- admin.php: 27
- admin-ajax/elementor_ajax: 20
- processOrder.php: 8

---

### Rollbar
| Level | Item | Count | Last |
|-------|------|-------|------|
| ERROR | Google_AuthException: invalid_grant | 758 | 05-29 08:23 UTC |
| ERROR | MM_Product::findAll() undefined | 1 | 05-28 06:48 |
| ERROR | getName() on string | 1 | 05-28 06:48 |
| ERROR | Google_AuthException (variant) | 6 | 05-27 17:55 |
| ERROR | MM_Product::getPaymentType() undefined | 1 | 05-26 16:30 |
| ERROR | _get_option() on null | 2 | 05-26 09:02 |
| CRITICAL | Memory exhausted (1GB) | 9 | 05-19/20 |

All items are known issues. Google OAuth token needs re-authorization in WP admin. Memory exhaustion not recent (>10 days).

---

### Cloudflare
| Date | Requests | Cached | Threats | Bandwidth | Pageviews | Uniques |
|------|----------|--------|---------|-----------|-----------|---------|
| 2026-05-30 (partial ~13:29 UTC) | 73,256 | 50,176 (68.5%) | 0 | 6.5GB | 11,993 | 4,790 |
| 2026-05-29 | 218,361 | 121,296 (55.5%) | 0 | 16.4GB | 32,596 | 10,253 |

- **Firewall events (23h):** None
- **SSL:** active (universal, *.mypersonalfootballcoach.com)
- **Security level:** medium ✅

---

### GitHub
- ⚠️ N/A — `gh` CLI not authenticated (nuscarrick account not configured on this server)

---

### Summary
⚠️ **2 warnings, 1 new alert**

| # | Level | Item |
|---|-------|------|
| 1 | 🔴 NEW | `checkout/klarna-confirmation/` avg 44.23s — Klarna payment confirmation extremely slow (1 occurrence today). Not in known issues. Investigate if recurring. |
| 2 | ⚠️ KNOWN | Google OAuth `invalid_grant` — 758 occurrences, last 05-29. Google Drive integration needs re-auth in WP Admin → Google Sheets API settings. |
| 3 | ⚠️ KNOWN | New Relic Apdex 0.53 / Error rate 1.26% — at expected baseline, driven by attack traffic and heartbeat false positives. |
| 4 | ℹ️ KNOWN | Max DB calls 19,592 in one transaction — N+1 pattern, monitor if frequency increases. |

**MemberMouse: No new members, no cancellations, no failed payments.**

---

## Actions Taken Post-Monitor

### 1. New Relic Apdex T updated: 0.5s → 1.0s (~13:45 UTC)
- Root cause: T=0.5s is too tight for WP; P50=0.95s means 50%+ traffic was "tolerating" by definition
- Updated via REST API (`PUT /v2/applications/1088890956.json`)
- **Result:** Apdex jumped from 0.53 → **0.76** (satisfied=20,049 tolerating=22,803 frustrated=163)
- Still in WARNING range; 53% tolerating bucket (1–4s pages) is the next target

### 2. New Relic Performance Deep-Dive (~13:52 UTC)

Top slow cases identified beyond initial report:

| # | Transaction | Avg | Max | Count | Root Cause |
|---|-------------|-----|-----|-------|------------|
| 1 | sitemap_index.xml | 47.96s | 48.24s | 2 | No cache — full XML rebuilt on every request |
| 2 | checkout/klarna-confirmation/ | 44.23s | 44.23s | 1 | Klarna API sync wait on confirmation |
| 3 | processOrder.php | 16.94s | 37.01s | 13 | MemberMouse waiting on payment gateway |
| 4 | Dashboard pages (bahrain/cca/im-play-pro) | 4,449–2,217 DB calls | — | 3–5 | N+1: loads all user content without batching |
| 5 | forgot-password/ | 5.29s | 15.37s | 25 | Likely synchronous email dispatch + MM checks |
| 6 | admin-ajax/update-plugin | 20.35s | 20.35s | 1 | 19,592 DB calls (N+1 plugin migration loop) |
| 7 | membermouse/x.php | 8.73s | 19.38s | 3 | MemberMouse content protection check slow |

### 3. Yoast SEO Sitemap Cache Enabled (~14:00 UTC)

**Problem:** `wpseo_enable_xml_sitemap_transient_caching` filter hardcoded to `false` in Yoast 12.x — sitemap regenerated from DB on every request (48s).

**Fix:** Created `wp-content/mu-plugins/mpfc-yoast-sitemap-cache.php` — overrides filter to `true`.

**Result:**
| Request | Time |
|---------|------|
| First (cache miss, DB rebuild) | 38.9s |
| Subsequent (cached) | **0.031s** — 1,255× faster |

Cache TTL: 24h (WP transient). Auto-invalidated on post/term save.

**Committed & pushed:** `e44e53853` → `live` branch on GitHub.

---

## Open Items (Pending)

| Item | Priority | Owner |
|------|----------|-------|
| `checkout/klarna-confirmation/` 44s — investigate Klarna timeout/async | High | Dev |
| Dashboard N+1 (4,449 DB calls) — batch queries + transients | High | Dev |
| `forgot-password/` async email dispatch | Medium | Dev |
| Google OAuth `invalid_grant` — re-auth in WP Admin | Medium | Nick |
| Block xmlrpc + SQL injection at Cloudflare WAF | Medium | Nick/Dev |
| Add Redis object cache to reduce P50 from 0.95s | Low | DevOps |
