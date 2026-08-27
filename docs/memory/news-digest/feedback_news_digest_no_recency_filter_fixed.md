---
name: feedback_news_digest_no_recency_filter_fixed
description: "news-digest fetch-news.py had no date-cutoff — stale RSS entries (e.g. php.net 2025 posts) leaked into 'latest' digests; fixed 2026-08-27"
metadata:
  type: feedback
---

Root cause of 2025-dated articles showing up in daily news digests: `fetch-news.py`'s `fetch_rss()` had zero recency filtering — it just took the first `limit` (default 100) items in feed order, regardless of pubDate. php.net's `feed.atom` interleaves old release/event posts non-chronologically, so stale 2025 entries passed straight through.

**Fix (2026-08-27):** added `_parse_pub_date()` (RFC822 + ISO8601) and a `MAX_ARTICLE_AGE_DAYS = 45` cutoff in `fetch_rss()` — any article whose parsed pubDate is older than 45 days is dropped before returning. File: `.claude/skills/news-digest/scripts/fetch-news.py`.

**Why:** user caught old 2025 articles in the news-digest output; no memory covered this since it's a script defect, not a source-selection issue.

**How to apply:** if a future digest again shows stale dates, check whether the source's pubDate field is even present/parseable (some feeds omit or malform it) — `_parse_pub_date` returns None for unparseable dates and those articles pass through unfiltered by design (better to show than silently drop on a parse miss).

[[feedback_news_digest_php_events]]
