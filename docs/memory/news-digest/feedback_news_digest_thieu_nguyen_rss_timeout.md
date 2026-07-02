---
name: feedback_news_digest_thieu_nguyen_rss_timeout
description: "Thiệu Nguyễn source(s) repeatedly show empty/missing in news-digest AI section — 3 separate root causes found so far, fix each incident, don't assume same cause twice"
metadata:
  node_type: memory
  type: feedback
  originSessionId: efa6becf-d110-4d65-baf1-63ee4f6b601e
---

The dedicated `### 📱 Thiệu Nguyễn — Facebook AI` section (added 2026-06-23, see [[feedback_news_digest_ai_underused_sources]]) showed `_(Không có bài mới từ Facebook)_` in the 2026-06-24 02:00 cron report. User flagged this as wrong ("vô lí !!!") — manually re-fetching the same rss.app feed (`https://rss.app/feeds/Xdp23RDcoTT7qZHa.xml`) immediately after returned 9 fresh posts.

**Why (incident 1, 2026-06-24):** `fetch_rss()` in `fetch-news.py` had a hardcoded `timeout=10` on `urllib.request.urlopen`. rss.app feeds are dynamically rendered, so response time is inconsistent — a cold-cache render can exceed 10s. On timeout/any exception, `fetch_rss` sets `result["error"]` and returns `articles=[]`, which combined with the MANDATORY "always show this section, write empty-placeholder if 0 articles" rule produced a confident-looking but factually wrong "no posts" line instead of surfacing the error.

**Fix 1:** `fetch-news.py` `fetch_rss()` — timeout raised to 20s, plus one retry with a 2s pause before giving up (commit `87b8c90`). 2026-06-24 0200 report backfilled with the real 9 posts (commit `2c0fd47`).

**UPDATE 2026-07-01 — rss.app replaced with puppeteer scraper:**
All 3 rss.app feeds (shinantori, mrgoonie, Nghiện AI) returned HTTP 402 Payment Required — free tier quota exhausted. Replaced with `scripts/facebook-page-scraper.js` (puppeteer persistent-profile approach). One-time login: `node scripts/facebook-page-scraper.js --login`. `fetch-news.py` now dispatches sources with `fb_id` field to `fetch_facebook_page()` instead of `fetch_rss()`. FB profile stored at `tmp/facebook-profile/`. Same commit also added a 4th, independent source: `Thiệu Nguyễn (Substack)` (`https://thieunv.substack.com/feed`, plain RSS, no login needed) — a more reliable channel than the FB scraper.

**UPDATE 2026-07-02 — Substack section dropped from output despite fetch succeeding (incident 3):**
2026-07-02 02:00 cron report showed ALL 4 Thiệu-Nguyễn-related sections as empty/missing: the 3 FB placeholders said "no posts", and the new Substack section didn't appear in the AI topic list at all. User flagged again ("lại ko có feed thieu nguyen !!!!"). Manual re-fetch (`fetch-news.py ai --limit=10`) immediately after showed all 4 sources actually had data: Substack 10 articles (error=None), 3 FB sources 1 article each (error=None). Root cause was NOT a fetch failure this time — it was a **spec gap**: the `.claude/commands/me/news-digest.md` MANDATORY section list only named the 3 FB sections; Substack (added 2026-07-01) was just a plain `url` source with no special "always render" enforcement, so the agent generating the 0200 report silently dropped it (and apparently the 3 FB ones too, despite them being marked mandatory).

**Fix 3:** Added `### 📰 Thiệu Nguyễn — Substack` as a 4th explicit MANDATORY section (now 4 total, in fixed order: Substack → Thiệu Nguyễn FB → Duy Nguyen FB → Nghiện AI FB) in the command spec, plus a hard post-save verification step: after Write, grep the 4 required headers in the saved file — if count < 4, fix before proceeding to Trello/git. 2026-07-02 0200 report backfilled manually with real Substack posts + the 1 real FB post found for shinantori.

**Separate unresolved issue found during backfill:** the FB scraper's "articles" for `mrgoonie` and `groups/nghienai` are low quality — `mrgoonie` returned the profile "Intro"/bio panel text, not an actual post; `groups/nghienai` returned a pinned/featured post dated 16 Sep 2025 (stale), not the live feed. Both were excluded from the backfill rather than presented as real new posts. `facebook-page-scraper.js` likely needs a scrape-target fix (target the main feed/timeline DOM, not intro/pinned panels) — not yet investigated.

**How to apply:** If any Thiệu Nguyễn section shows empty/missing again, don't assume it's the same root cause as before — check in order: (1) does a direct `fetch-news.py ai` call actually return 0 articles + a real `error` for that source (transient fetch failure), or (2) does it return articles but the saved report file is missing the section header (synthesis/spec-adherence failure — check the MANDATORY list in the command file is being followed), or (3) are the "articles" garbage/stale content from a scraper bug (data-quality failure, not emptiness). Three different incidents, three different causes, don't rubber-stamp with the old timeout explanation.

See [[feedback_news_digest_ai_underused_sources]].
