---
name: feedback_news_digest_45day_window_let_old_gnews_through
description: 2026-10-19 old articles in digest = fetch-news.py MAX_ARTICLE_AGE_DAYS was 45; Google News feeds return 11-23 day old items; Tuoi Tre dates unparsed → unfiltered. Now 7d (php 45d).
metadata:
  type: feedback
---

User reported news-digest pulling old articles again (2026-10-19). Not the /tmp stale-file bug this time: fetch-news.py `MAX_ARTICLE_AGE_DAYS = 45` (set 2026-08-27 for php.net) let Google News search items 11–23 days old through (AI Model Releases 23d, Tech 17d, VinFast 13d). Tuổi Trẻ pubDate `10/18/2026 2:07:00 PM` was unparseable → skipped the filter entirely.

**Fix:** default 7 days, `MAX_ARTICLE_AGE_DAYS_BY_TOPIC = {"php": 45}`, parser handles Tuổi Trẻ format (UTC+7).

**How to apply:** when old articles reported, run fetch-news.py and compute per-source ages first; check for sources with unparseable dates (None age = no filtering). Server cron pulls master, so fix needs push.

[[feedback_news_digest_stale_tmp_section_files]] [[feedback_news_digest_no_recency_filter_fixed]]
