---
name: feedback_news_digest_dedup_rule
description: news-digest must cap each article at 2 total appearances (across reports + within-report cross-source dups) and backfill to 5/source
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a409e960-91d5-4934-afeb-88d76a5d32e1
---

Each article (by URL) may appear at most 2 times total, counting occurrences across all previous `*-news-digest.md` reports plus the current one being built — including duplicates across different source feeds within the same run (e.g. the same Google News item syndicated to two different topic sections like "Chứng khoán VN" and "Cổ phiếu", or the same TechCrunch article appearing under both the IT topic's TechCrunch source and the AI topic's TechCrunch AI source). If an article would exceed the cap or duplicate another slot in the same report, skip it and pull the next eligible (non-duplicate, non-overused) article from that source's fetched pool so every source section still reaches its target of 5 articles.

**Why:** User caught (2026-07-03) that the same Google News article appeared twice in one digest under two source headers, and that most sources were only showing 2-3 items instead of the required 5. Root cause: dedup was done per-topic-file in isolation, missing cross-topic duplicates, and the fetch→condense pipeline wasn't backfilling replacements when items got filtered.

**How to apply:** When building a digest (topic=all or single topic), before finalizing:
1. Build a URL→occurrence-count map from all prior `reports/*/*-news-digest.md` files (regex `\[title\](url)`).
2. Process topics/sources in the report's final display order (not per-file in isolation), maintaining ONE running `seen_urls` set across the whole report.
3. For each source, sort fetched candidates by recency, skip any whose running total (history + already-placed-this-run) would exceed 2, and take the next 5 eligible ones — increase the fetch/candidate pool size (e.g. `--limit` or condense `n`) if fewer than 5 eligible remain after filtering.
4. Sources with genuinely fewer than 5 total articles available (e.g. Laravel News with only 5 items total, Reuters Finance with 0) are exempt — note the shortfall inline (`_(Chỉ N/5 — ...)_`) instead of padding with irrelevant content.
5. Re-verify after writing: grep the URL list for internal duplicates (should be 0) and spot-check a few against history counts.

See also [[feedback_news_digest_thieu_nguyen_rss_timeout]] for the related Facebook-scraper garbling issue in the AI topic's mandatory sections, which is a separate unresolved problem (not a dedup issue).
