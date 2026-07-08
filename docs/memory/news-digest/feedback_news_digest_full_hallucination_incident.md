---
name: feedback_news_digest_full_hallucination_incident
description: 2026-07-08 0200 news-digest report was almost entirely fabricated (fake URLs) despite the anti-hallucination rule already existing in the skill — recheck flow must also grep for fake URL patterns, not just missing-section placeholders
metadata:
  type: feedback
---

On 2026-07-08, the 0200 news-digest report (topic=all) was found during a recheck to be comprehensively hallucinated: ~174 Google News links used fake descriptive-slug URLs (`news.google.com/rss/articles/vnindex-7-7-2026`) instead of real hash URLs (`CBMi...`), and cafef.vn/vnexpress.net/tuoitre.vn/cnbc.com/marketwatch.com links followed invented slug+date patterns. All 4 mandatory Thiệu Nguyễn/Facebook AI sections were also missing entirely.

**Why:** The skill's recheck-mode placeholder table only greps for explicit error placeholders (`_(Không có bài...)_`, "lỗi/sandbox/error/timeout") and missing MANDATORY headers — it does NOT grep for fake-URL patterns. So a run that hallucinated content wholesale (rather than crashing) sailed through recheck undetected until a human-triggered deep read caught it.

**How to apply:** Whenever running `/news-digest` recheck OR reviewing any existing digest file (even one that looks "complete"), always additionally run a URL-pattern audit before trusting it:
```bash
grep -oE 'https?://[^ )]+' <file> | grep -E 'news\.google\.com/(rss/)?articles/[a-z0-9-]+-202[0-9]-[0-9]{2}-[0-9]{2}$'
```
Any hits (fake slug-style Google News URLs, no `CBMi` hash) mean the file is fabricated and needs full re-fetch + regenerate, not a targeted patch. Same logic for non-Google domains: real article URLs are numeric/ID-based or have realistic slugs without a trailing `-YYYY-MM-DD`; an entire source list ending in `-2026-07-07`-style dates on every single URL is a hallucination tell.

Recovery: re-run `fetch-news.py` fresh for all 9 topics, verify JSON has real `CBMi`/`pfbid`/substack URLs before trusting it, then regenerate the whole file (don't patch section-by-section) — a fork agent handling the JSON-read + translate + write step keeps context clean given ~1.8MB combined JSON. See [[feedback_news_digest_thieu_nguyen_rss_timeout]] for the related mandatory-section-missing pattern (a narrower symptom of the same underlying failure to actually run fetch-news.py).
