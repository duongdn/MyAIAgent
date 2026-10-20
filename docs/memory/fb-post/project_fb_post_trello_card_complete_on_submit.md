---
name: project_fb_post_trello_card_complete_on_submit
description: Trello card "Đăng 1 bài trên zalo/facebook" (list Daily) is re-created daily by Card Repeater; mark it dueComplete only after a FB post is submitted
metadata:
  type: project
---

It is a Trello CARD (not a checklist item). Card Repeater (plugin 57b47fb862d25a30298459b1) copies archived source card 60136ed592338876c5208c15 daily at 08:36 Asia/Saigon (as of 2026-10-20). User wants that time moved to 01:00, then the FB cron scheduled after it. The repeater config is plugin data, so the REST API cannot change it. It has to be changed in the Trello UI.

**How to apply:** `/me:fb-post --submit` → after a successful submit, run `python3 scripts/trello-complete-daily-fb-post-card.py <url>` (finds the newest open card by name, comments the URL, sets dueComplete). Never complete the card at draft time. Related: [[project_fb_daily_post_draft_is_only_me]]
