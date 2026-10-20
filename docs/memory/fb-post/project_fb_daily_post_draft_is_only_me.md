---
name: project_fb_daily_post_draft_is_only_me
description: FB daily post (Trello task) — personal profile has no drafts, so "draft" = post with audience "Chỉ mình tôi"; user submits by changing audience
metadata:
  type: project
---

2026-10-20: user wants 1 FB post/day (Zalo later), default draft, user reviews then submits. Target = personal profile facebook.com/dnduong.us (logged in via shared `tmp/facebook-profile`, same as news-digest scraper).

User approved: draft = post with audience **"Chỉ mình tôi"**; `/me:fb-post --submit` changes it to Public/Friends. User has no prior posts → no style samples; write Vietnamese, ngôi "mình", 150–300 chữ, sources = news-digest, finance (market view only), `docs/fb-post-ideas/`, work lessons (sanitized), own research.

**Why:** profiles have no Graph API / real drafts feature.
**How to apply:** never post non-Only-me in draft mode; always untick "Đặt làm đối tượng mặc định" (it is ticked by default — selecting Only me without unticking would change the profile default). Cron 07:00 `scripts/autorun-fb-post.sh`, history `docs/fb-post/post-history.json`.
