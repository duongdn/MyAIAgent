---
name: feedback_news_digest_thieu_nguyen_rss_timeout
description: "rss.app feed (Thiệu Nguyễn FB source) showed as empty in 0200 report due to 10s timeout, not actually empty — fixed with retry+20s timeout"
metadata:
  node_type: memory
  type: feedback
  originSessionId: efa6becf-d110-4d65-baf1-63ee4f6b601e
---

The dedicated `### 📱 Thiệu Nguyễn — Facebook AI` section (added 2026-06-23, see [[feedback_news_digest_ai_underused_sources]]) showed `_(Không có bài mới từ Facebook)_` in the 2026-06-24 02:00 cron report. User flagged this as wrong ("vô lí !!!") — manually re-fetching the same rss.app feed (`https://rss.app/feeds/Xdp23RDcoTT7qZHa.xml`) immediately after returned 9 fresh posts.

**Why:** `fetch_rss()` in `fetch-news.py` had a hardcoded `timeout=10` on `urllib.request.urlopen`. rss.app feeds are dynamically rendered (scrapes + re-renders the FB page server-side), so response time is inconsistent — a cold-cache render can exceed 10s, especially from the production cron server. On timeout/any exception, `fetch_rss` sets `result["error"]` and returns `articles=[]`, which combined with the MANDATORY "always show this section, write empty-placeholder if 0 articles" rule produced a confident-looking but factually wrong "no posts" line instead of surfacing the error.

**How to apply:** Fixed in `fetch-news.py` `fetch_rss()` — timeout raised to 20s, plus one retry with a 2s pause before giving up (see commit `87b8c90`). If this section (or any RSS source) shows empty again, don't trust it at face value — manually re-fetch the URL directly first to confirm whether the source is actually empty or the fetch failed; check `result["error"]` from a direct `fetch_rss()` call rather than assuming the synthesis output is ground truth. The 2026-06-24 0200 report was also manually backfilled with the real 9 posts (commit `2c0fd47`) once this was confirmed.

See [[feedback_news_digest_ai_underused_sources]].
