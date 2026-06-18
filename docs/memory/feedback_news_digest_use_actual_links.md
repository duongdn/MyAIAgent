---
name: feedback-news-digest-use-actual-links
description: news-digest article links must come from JSON link field, never fabricated — and fetch-news.py must resolve relative URLs
metadata:
  type: feedback
---

ALWAYS use the `link` field from the fetched JSON article data when rendering news digest output. NEVER fabricate, guess, or write placeholder URLs like `https://vnexpress.net/` or `https://laravel-news.com/`.

**Why:** User corrected on 2026-05-29 after digest output had fabricated/placeholder links instead of actual article URLs. Links in the digest must be clickable and point to the real article.

**Root cause confirmed 2026-06-18 (rule kept getting violated despite this memory):** the failure is concentrated on Google News RSS results (`_gnews()` sources), whose real `link` is a ~150-char opaque base64 redirect (`https://news.google.com/rss/articles/CBMi...`). When writing the final markdown, the LLM doesn't faithfully retype that long opaque token. It instead:
1. Fabricates a fake-but-plausible slug in the same URL shape, e.g. `https://news.google.com/rss/articles/stock-vn-index` (not a real link, looks real), or
2. Sees the Google News title suffix "Headline - PublisherName" and silently swaps in that publisher's bare homepage (`https://vneconomy.vn`, `https://cafef.vn`, `https://tapchinhodanhnghiep.vn`) instead of the real redirect link.
Confirmed via grep across `reports/*/*-news-digest.md`: 27 bare-homepage-link occurrences across 2026-06-12, 06-15, 06-17 (0 on 06-08/09/13/14/16/18). Not position-dependent (happened as early as line 28 of a 110-line report) — so it's not pure "long output fatigue", it's specifically triggered by Google News' long-base64 + "- Publisher" title format.

**How to apply:**
- Read from `/tmp/news-*.json` (or re-fetch) and extract exact `link` values per article
- If a source returns relative URLs (e.g. `/2026/05/article-slug`), the fetch-news.py script resolves them to absolute via `urljoin(base_url, link)` — this was fixed 2026-05-29
- Never write markdown links with a guessed or homepage URL — if unsure, omit the hyperlink and just write the title as plain text
- **Extra scrutiny for Google News sources specifically**: before saving, grep the drafted markdown for `](https?://[^)]+)` and flag any link whose path is empty/root (`^https?://[a-z0-9.-]+/?$`) — these are always wrong, go back to JSON and re-copy the real link verbatim (copy-paste the literal string, do not retype from memory)
