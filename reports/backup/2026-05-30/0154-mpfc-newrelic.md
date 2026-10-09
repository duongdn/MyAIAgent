# MPFC New Relic APM — 2026-05-30 01:54 (+07:00)

**App:** MPFC-live2 | **Account:** 3457746 | **Window:** last 24h

---

## Overview

| Metric | Value | Status |
|--------|-------|--------|
| Total requests (24h) | 44,110 | — |
| Uptime | **98.15%** | ✅ OK |
| Apdex | **0.712** | ⚠️ Below 0.85 target |
| Avg response time (all traffic) | 33.77s | ⚠️ Inflated by attacks |
| P95 response time (all traffic) | 496s | ⚠️ Inflated by attacks |
| Error events (24h) | 817 | ⚠️ See below |

> **Note:** Avg/P95 times are heavily inflated by active SQL-injection timing attacks on the search endpoint (`waitfor delay '0:0:15'`). See attack traffic section.

---

## Attack Traffic

**~13,500 requests (31% of traffic) are bots/attack:**

| Pattern | Hits | Type |
|---------|------|------|
| `/xmlrpc.php` | 6,211 | WordPress XML-RPC brute force |
| `/login/` | 6,040 | Login brute force |
| `search/…waitfor delay '0:0:15'…` | 964 | MSSQL timing SQL injection |
| `search/…DBMS_PIPE.RECEIVE_MESSAGE…` | 860+ | Oracle timing SQL injection |
| `search/…'%22/page/…` | 252+ | Generic SQL injection |

**Impact:** The `waitfor delay` attacks cause 15s+ response times per request, inflating all avg/P95 metrics to unusable levels.

**Recommendation:**
- Block `xmlrpc.php` at Apache if XML-RPC is not needed (likely not used for MPFC)
- Add rate limiting on `/login/` and `/wp-login.php`
- Consider WAF rule to block `waitfor+delay` pattern in URL

---

## Top Legitimate Transactions (excl. attacks)

| Transaction | Hits |
|------------|------|
| `/home` | 3,632 |
| `/user-video/page/*/` | 562 |
| `wp-admin/admin-ajax.php (heartbeat)` | 511 |
| `/wp-json/oembed/*/embed` | 267 |

Legitimate traffic count: **~30,600 requests** with avg **~47.9s** (still inflated by remaining SQL injection patterns not filtered above).

---

## Error Analysis

### Top Error Transactions

| Transaction | Errors | Severity |
|------------|--------|----------|
| `admin-ajax.php (heartbeat)` | 475 | ℹ️ False positives (HTTP 200, no error msg) |
| `admin-ajax.php (module-handle)` | 83 | ⚠️ Investigate |
| `wp-admin/edit.php` | 80 | ⚠️ Investigate |
| `wp-admin/admin.php` | 57 | ⚠️ Investigate |
| `wp-admin/post.php` | 23 | Low |
| `admin-ajax.php (elementor_ajax)` | 20 | Low |
| **`membermouse/api/processOrder.php`** | **14** | ⚠️ See below |
| `admin-ajax.php (wp-remove-post-lock)` | 10 | Low |

**Total tracked errors:** 817

### MemberMouse processOrder.php — 14 errors

```
include_once(): Failed opening
'/Users/duongdn/projects/Saul/mypersonalfootballcoach.com//wp-load.php'
```

- **Root cause:** Stale local dev path hardcoded in a MemberMouse file. The server tries to include `wp-load.php` using a Mac dev machine path instead of the live server path.
- **HTTP status:** Mix of 302 and 200 — requests complete, but PHP throws a notice/warning
- **Impact:** Low. Requests still process. Same pre-existing issue flagged in WP debug log.
- **Fix needed:** Find which MemberMouse file has the hardcoded path and correct it. Likely a cached/compiled file from a dev deployment. Search: `grep -r "duongdn" /var/www/mypersonalfootballcoach.com/wp-content/plugins/membermouse/`

### Heartbeat errors — 475 events

All HTTP 200 with no `errorMessage` or `errorType`. New Relic is flagging PHP notices as "errors". Not actual failures.

---

## HTTP Status Codes (24h)

| Status | Count | Notes |
|--------|-------|-------|
| 404 | 3,865 | Mostly bots probing non-existent paths |
| 500 | 266 | Internal server errors — investigate |
| 401 | 200 | Unauthorized (mostly xmlrpc attacks) |
| 403 | 4 | Blocked requests |

**266 HTTP 500s** is worth monitoring — check Apache error log for details.

---

## Summary

| Check | Status |
|-------|--------|
| Uptime | ✅ 98.15% |
| Error rate | ⚠️ 817 errors (mostly false positives + pre-existing) |
| MemberMouse orders | ⚠️ 14 PHP notices (stale dev path, pre-existing) |
| Attack traffic | 🔴 ~13.5k attack requests (31%) — recommend WAF/rate limiting |
| HTTP 500s | ⚠️ 266 in 24h — monitor |

**Priority actions:**
1. 🔴 Block `xmlrpc.php` at Apache (6,211 bot hits, not needed for public site)
2. ⚠️ Add login rate limiting (6,040 brute force attempts)
3. ⚠️ Fix hardcoded `/Users/duongdn/` path in MemberMouse plugin files
4. ℹ️ Investigate 266 HTTP 500s via Apache error log
