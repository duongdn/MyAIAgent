---
name: feedback_news_digest_duplicate_source_name_collision
description: "Google News – Tài chính VN" source name exists in BOTH vn-stocks and finance topics — keying articles by source name alone mixes up links
metadata:
  type: feedback
---
2026-10-27: building the digest from a dict keyed by source name silently overwrote vn-stocks' "Google News – Tài chính VN" with finance's same-named source → wrong links in the VN stocks section (caught before commit).

**Why:** fetch-news.py reuses the same display name across topics.
**How to apply:** key sources by (topic, name) when mapping JSON → markdown. Also: when all links are taken straight from JSON and none are bare-domain, skip fix-links.py — it "fixed" 66 correct links into wrong ones again (see [[fix-links-positional-corrupts-curated-links]]).
