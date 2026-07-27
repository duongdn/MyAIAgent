---
name: feedback_facebook_not_logged_in_is_false_failure
description: "news-digest 0405 cron run reported not_logged_in for all 3 Facebook AI sources, but the FB session was fully alive — re-running fetch-news.py under the venv python returned real posts; 5th distinct root cause for 'no Facebook posts'"
metadata:
  type: feedback
  modified: 2026-07-27T09:10:00.000Z
---

On 2026-07-27, the 0405 cron news-digest wrote `_(Lỗi: not_logged_in — cần chạy node scripts/facebook-page-scraper.js --login)_` into all 3 Facebook AI sections. This was a **false failure**. Running `node scripts/facebook-page-scraper.js shinantori --limit=3` directly immediately returned 3 real authenticated wall posts ("Loaded 8 cookies", "shinantori: 3 posts"), and re-running `fetch-news.py ai --limit=100` under `.claude/skills/.venv/bin/python3` returned 6 articles each for shinantori and mrgoonie with `error: None`.

**Why:** `not_logged_in` is the scraper's generic bail-out status and gets emitted for transient conditions (slow feed render, cookie refresh not yet applied), not only for a genuinely dead session. Same trap as [[feedback_news_digest_thieu_nguyen_rss_timeout]] incident #4, where a "dead session" conclusion was wrong and the real cause was the wrong Python interpreter silently no-op'ing `_refresh_fb_cookies()`. This is the 5th distinct root cause behind the recurring "no Facebook posts" symptom, after [[feedback_facebook_scraper_missing_x_display]], [[feedback_facebook_scraper_chrome_path_drift]], [[feedback_facebook_scraper_deleted_by_cleanup_commit]], and [[feedback_facebook_scraper_char_scramble]].

**How to apply:** NEVER report `not_logged_in` to the user or tell them to re-login without first re-running the scraper directly (`node scripts/facebook-page-scraper.js shinantori --limit=3`). If that returns posts, the session is alive — just re-fetch the `ai` topic under `.claude/skills/.venv/bin/python3` and patch the report. Treat `not_logged_in` as a re-fetchable technical error in recheck mode, not a manual-intervention blocker. Only conclude a real login is needed if the direct scraper call ALSO fails with a visible login wall.
