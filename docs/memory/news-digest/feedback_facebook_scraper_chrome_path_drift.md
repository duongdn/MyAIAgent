---
name: feedback_facebook_scraper_chrome_path_drift
description: "facebook-page-scraper.js and upwork-xvfb-fetch.js hardcoded Chrome at /opt/google/chrome/chrome which no longer exists — actual binary lives at /usr/bin/google-chrome (symlink to puppeteer cache); fixed with existsSync fallback 2026-07-11"
metadata:
  node_type: memory
  type: feedback
  originSessionId: ac62f709-c23f-49ac-bedf-9510dabe3b76
---

Both `scripts/facebook-page-scraper.js` and `scripts/upwork-xvfb-fetch.js` hardcoded `executablePath: '/opt/google/chrome/chrome'` in their `puppeteer.launch()` calls. That path no longer exists on this host — Chrome now lives at `/usr/bin/google-chrome` (a symlink to `/home/mpfc/.cache/puppeteer/chrome/linux-146.0.7680.76/chrome-linux64/chrome`). All 3 Facebook AI sources in news-digest's `ai` topic (Thiệu Nguyễn, Duy Nguyen/mrgoonie, Nghiện AI group) failed with `Fatal: Browser was not found at the configured executablePath` — a different failure mode than the earlier missing-Xvfb bug in [[feedback_facebook_scraper_missing_x_display]].

**Why:** Puppeteer's managed Chrome install path changes when the cached browser version updates (path embeds the version number, e.g. `linux-146.0.7680.76`). A hardcoded absolute path silently breaks every time this happens — this is the second distinct root cause (after Xvfb) for the recurring "no Facebook posts" symptom in daily digests.

**Fix applied (2026-07-11):** Changed both scripts to `executablePath: fs.existsSync('/opt/google/chrome/chrome') ? '/opt/google/chrome/chrome' : '/usr/bin/google-chrome'`. `/usr/bin/google-chrome` is a stable OS-level symlink that survives puppeteer cache version bumps, so prefer it over hardcoding the versioned cache path directly.

**How to apply:** If Facebook AI sources or Upwork fetch report "Browser was not found at the configured executablePath" again, check `which google-chrome` / `readlink -f /usr/bin/google-chrome` first — the symlink target changes on Chrome updates but the `/usr/bin/google-chrome` path itself should remain stable. After this fix, `mrgoonie` and `groups/nghienai` still returned `not_logged_in` (separate, unrelated auth/session issue — needs manual re-login via `node scripts/facebook-page-scraper.js --login`, not something to auto-fix).

See also [[feedback_facebook_scraper_missing_x_display]] (the earlier, different Xvfb-related crash).
