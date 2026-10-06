---
name: feedback-news-digest-fix-links-parallel-fetch-corrupts
description: fix-links.py swaps correct Google News links for wrong ones when topics are fetched in parallel or articles are skipped
metadata:
  type: feedback
---
fix-links.py maps links by position using /tmp/news-digest-cache.json, which holds only the LAST fetch-news.py run. On 2026-10-07, after 9 parallel fetches with some articles skipped, it "fixed" 32 links that were already correct, and the wrong links replaced them.

**Why:** the cache and the article positions don't match the report.
**How to apply:** if links are built straight from the per-topic JSON (no bare domains, checked with grep), keep a copy and diff it after fix-links; restore the copy if fix-links changed full article URLs.
