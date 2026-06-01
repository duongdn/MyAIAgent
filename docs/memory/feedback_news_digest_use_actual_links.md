---
name: feedback-news-digest-use-actual-links
description: news-digest article links must come from JSON link field, never fabricated — and fetch-news.py must resolve relative URLs
metadata:
  type: feedback
---

ALWAYS use the `link` field from the fetched JSON article data when rendering news digest output. NEVER fabricate, guess, or write placeholder URLs like `https://vnexpress.net/` or `https://laravel-news.com/`.

**Why:** User corrected on 2026-05-29 after digest output had fabricated/placeholder links instead of actual article URLs. Links in the digest must be clickable and point to the real article.

**How to apply:**
- Read from `/tmp/news-*.json` (or re-fetch) and extract exact `link` values per article
- If a source returns relative URLs (e.g. `/2026/05/article-slug`), the fetch-news.py script resolves them to absolute via `urljoin(base_url, link)` — this was fixed 2026-05-29
- Never write markdown links with a guessed or homepage URL — if unsure, omit the hyperlink and just write the title as plain text
