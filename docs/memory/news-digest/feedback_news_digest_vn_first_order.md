---
name: feedback_news_digest_vn_first_order
description: news-digest topic=all order restructured — Vietnam topics first, US stocks last
metadata:
  type: feedback
---

news-digest `topic=all` section order changed to: `vn-stocks` → `vn-business` → `vinfast` → `ai` → `it` → `php` → `finance` → `security` → `stocks` (global/US stocks last). Applies to both fetch command order and output section order in `.claude/commands/me/news-digest.md`.

**Why:** User explicitly said putting US stocks (`stocks`) first is annoying — they prefer Vietnam-related news prioritized.

**How to apply:** Whenever running/editing `/news-digest` (all-topic mode), keep VN-related topics (vn-stocks, vn-business, vinfast) at the top and generic/global `stocks` topic last. Don't revert to alphabetical/original order.
