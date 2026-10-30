---
name: feedback_news_digest_pick_by_importance_not_feed_order
description: 🔴 2026-10-30 user — problem is priority not article count; never take first N per feed. fetch-news ranks by cross-source coverage, returns 3x candidates; synthesis picks best per topic rubric
metadata:
  type: feedback
---

User (2026-10-30), after I added a Linux source: "ko, vấn đề k phải số lượng bài mà là độ ưu tiên, ko thể chỉ đơn giản lấy theo thứ tự được, phải có cách để chọn bài tốt nhất".

**Why:** fetch-news.py took the first `limit` items in feed order, so important stories (Linux kernel exploit, CISA KEV) further down a feed were dropped. Adding sources doesn't fix that.

**How to apply / current design:**
- fetch-news.py `_score_topic_articles`: `coverage` = # other sources in topic with same story (title-token overlap ≥0.5), then HN score, then recency; returns `limit × CANDIDATE_MULT(3)` candidates per source, sorted.
- news-digest.md "Chọn bài" section: synthesis reads all candidates, picks best `limit` per source by topic rubric (security: exploited/KEV/zero-day/CVSS≥9 > popular platforms > breaches > PR).
- fix-links.py no longer position-based (would overwrite correct links once a subset is picked) — keeps cache URLs, repairs only unique prefix match.
- When user says a category is missing: fix ranking/selection first, don't just add sources or raise caps.

[[feedback_news_digest_linux_security_needs_own_source]] [[fix_links_positional_corrupts_curated_links]] [[feedback_article_count_5_per_source]]
