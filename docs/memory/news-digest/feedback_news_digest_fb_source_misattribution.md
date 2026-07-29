---
name: feedback_news_digest_fb_source_misattribution
description: "fetch-news.py's ai topic JSON put a mrgoonie post under the 'Thiệu Nguyễn (Facebook AI)' source key — content/link clearly belonged to Duy Nguyen, not Thiệu Nguyễn. Caught 2026-07-30 by reading article content before synthesizing, not by trusting the JSON key."
metadata:
  type: feedback
  modified: 2026-07-30T04:05:00.000Z
---

On the 2026-07-30 0405 run, `fetch-news.py ai --limit=100`'s `Thiệu Nguyễn (Facebook AI)` source array contained 2 articles: one genuinely from `facebook.com/shinantori/posts/...` (Thiệu Nguyễn), and a second from `facebook.com/mrgoonie/posts/...` with content clearly starting "ClaudeKit nay đã đổi thành AgentKit... Duy Nguyen" — unambiguously a Duy Nguyen (mrgoonie) post, not Thiệu Nguyễn's.

**Why:** Likely a bug in `scripts/facebook-page-scraper.js` or `fetch-news.py`'s source-merging logic — possibly a shared cookie/session state or an indexing mixup when scraping both `shinantori` and `mrgoonie` in the same run causes one page's post to land in the other's result array. This is a NEW failure mode, distinct from all prior Thiệu-Nguyễn-related incidents in [[feedback_news_digest_thieu_nguyen_rss_timeout]] and [[feedback_facebook_scraper_char_scramble]] — the script runs fine and returns coherent text, just tagged to the wrong source key.

**How to apply:** When synthesizing the 4 mandatory AI/Facebook sections, don't blindly trust which JSON source-array key an article sits under — skim the article's `link` domain path (`facebook.com/<handle>/posts/`) and content author cues against the section header. If a post's link/content clearly belongs to a different configured FB source, move it to the correct section in the output rather than reporting it under the wrong header (this is not a hallucination — the article is real, just relocated to match its actual origin). Flag for a future fix in `scripts/facebook-page-scraper.js` / `fetch-news.py` if it recurs — check whether multiple FB sources scraped in one process share a mutable results array.
