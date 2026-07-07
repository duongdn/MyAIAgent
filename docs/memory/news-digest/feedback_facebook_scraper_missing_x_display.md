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

**Separate flakiness observed (unresolved):** During verification, repeated rapid scrapes (~5 calls to `mrgoonie` within a couple minutes) started returning the FB **notifications flyout** content instead of the page wall (`sk=wall` ignored), consistently, even with the known-good `DISPLAY=:1`. Reproduced independent of the display fix. Likely FB serving a different UI/rate-limiting after burst automated traffic from the same cookie session — do NOT hammer-test this scraper repeatedly in one sitting; space out manual verification calls. See [[feedback_facebook_notifications_overlay_flakiness]] if that gets its own writeup later.
