---
name: feedback_facebook_scraper_missing_x_display
description: "facebook-page-scraper.js crashed hard with \"Missing X server\" when DISPLAY had no live Xvfb behind it — root cause of repeated \"no Facebook posts\" in news-digest reports (07-05/06/07)"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8d788025-e4a5-44d8-9558-713e0a9876cb
---

`scripts/facebook-page-scraper.js` launches Chrome with `headless: false` (required — headful bypasses FB bot detection) and fell back to `DISPLAY=':99'` when unset, but nothing anywhere actually starts an Xvfb on `:99` — only `:1` (via `autorun-news-digest.sh` et al) or whatever the interactive session's real DISPLAY is. When the caller's env doesn't carry a working DISPLAY, Chrome fails immediately: `Fatal: Missing X server to start the headful browser.` `fetch-news.py`'s `fetch_facebook_page()` catches this as `proc.returncode != 0` → empty articles, no descriptive error surfaced to the digest — this is why reports/2026-07-05, -06, -07 all showed "(Không có bài mới từ Facebook)" for all 3 FB sources with no real explanation after 07-05.

**Why:** Confirmed by reproducing: `env -u DISPLAY node scripts/facebook-page-scraper.js mrgoonie` → immediate fatal crash. With `DISPLAY=:1` (a real/Xvfb-backed session) it works fine and returns real posts. The bug is an environment-inheritance gap, not a Facebook-side or cookie problem.

**Fix applied (2026-07-07):** Added `ensureDisplay()` to `facebook-page-scraper.js` — checks whether the inherited `DISPLAY` has a live socket at `/tmp/.X11-unix/X<n>`; if not, self-starts a local `Xvfb :90` fallback and kills it on exit. Script no longer depends on an external wrapper having correctly exported `DISPLAY`.

**How to apply:** If "no Facebook posts" recurs in news-digest reports, check `reports/{date}/*-news-digest.md` for the FB sections' fallback text first, then re-run `node scripts/facebook-page-scraper.js <fb_id> --limit=3` directly (with and without `DISPLAY` set) to see the real stderr before assuming it's a Facebook-side issue.

**Second bug found + fixed same session:** `extractPostsFromDom()` selected ALL `a[href*="/posts/"]` anywhere in `document` — but Facebook's notifications flyout/toast (always present in the DOM on any logged-in page, independent of which URL was navigated to) also contains `/posts/` links, tagged with `notif_id=`/`ref=notif` params. When that widget renders before the target wall's feed finishes loading, the scraper grabbed notification junk ("Thông báo...", "X đã thích bài viết của bạn...") instead of real posts — happened consistently across ~5 rapid test calls, even with the known-good `DISPLAY=:1`, so it was NOT a display or rate-limit issue, just always-there notification links racing the real feed.

**Fix:** filter out any link containing `notif_id=` or `ref=notif` in `extractPostsFromDom`'s `postLinks` filter (scripts/facebook-page-scraper.js). Verified after fix: `mrgoonie` and `shinantori` both return real wall posts, no notification junk.
