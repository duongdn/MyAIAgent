---
name: feedback_facebook_scraper_char_scramble
description: "facebook-page-scraper.js (2026-07-23) returned articles with titles scrambled at character level for Thiệu Nguyễn + Duy Nguyen FB sources — new distinct bug, not Xvfb/deletion/notif-link issues already fixed"
metadata:
  type: feedback
  originSessionId: 29ad2457-3f66-4a81-b23e-9bac691e5ac7
  modified: 2026-07-23T02:01:25.646Z
---

On 2026-07-23's news-digest run, `Thiệu Nguyễn (Facebook AI)` and `Duy Nguyen / mrgoonie (Facebook AI)` both returned 5 articles each (script ran fine, no crash), but every `title` field was character-level scrambled garbage, e.g. `"npseSrdoto07026qtú00ahuôic7H60f c0almmulma101a3a:306u7c8m..."` — unreadable, not a translation issue, not empty/missing. `link` fields were still valid Facebook post URLs. `summary` was `null` for all of these.

**Why:** Pattern looks like interleaved DOM text extraction — likely multiple overlapping/absolutely-positioned sibling elements (timestamp, reaction count, "online status" badge, post body) getting their text nodes read in DOM order and concatenated character-by-character instead of the scraper isolating just the post-body element. This is a NEW failure mode, distinct from the three already-fixed root causes in [[feedback_facebook_scraper_missing_x_display]] (Xvfb/DISPLAY), [[feedback_facebook_scraper_deleted_by_cleanup_commit]] (script wiped by cleanup commit), and the chrome-path-drift issue — the script executes and returns data, it's just corrupted.

**How to apply:** Per the anti-hallucination rule in the news-digest skill, garbled/unreadable titles must NOT be summarized or guessed at — treat as a technical error and write `_(Lỗi kỹ thuật: tiêu đề bị xáo trộn ký tự, không đọc được)_` for that section, same as a crash. Do NOT attempt to re-fetch in recheck mode assuming it'll self-resolve — this needs an actual fix to `scripts/facebook-page-scraper.js`'s DOM text extraction (likely `extractPostsFromDom()` — check whether it isolates the post-content element specifically, e.g. via `[data-ad-preview="message"]` or similar, rather than reading `.textContent` off a parent container that also holds timestamp/reaction/status-badge siblings). Verify fix by running `node scripts/facebook-page-scraper.js shinantori --limit=3` directly and confirming titles read as coherent Vietnamese/English sentences, not scrambled characters.
