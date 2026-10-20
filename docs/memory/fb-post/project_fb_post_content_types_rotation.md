---
name: project_fb_post_content_types_rotation
description: FB post content types user chose 2026-10-20 — stock humor, NUS blog share, trend/meme, tech/finance article share, running-milestone reminder
metadata:
  type: project
---

On 2026-10-20 the user listed these FB post ideas. The rotation lives in `.claude/commands/me/fb-post.md`, step 3. Each history entry records its `type`.
- `stock-humor`: the type the first post used.
- `nus-blog`: share a post from https://www.nustechnology.com/blog.
- `trend`: share/review a trending topic or meme.
- `share-article`: share a tech, finance or stock article.
- `running`: remind the user to share running posts and milestones.

**Why:** the user wants daily posting to vary, with a personal brand mixing work (NUS), investing and running.
**Running data:** Strava's API is subscriber-only (2026-10-20), so `scripts/strava-running-stats.py` reads the web JSON endpoint `/athlete/training_activities` with cookies exported from Chrome Profile 9 (`scripts/get-duongdn-strava-cookies.py`). It returns totals and milestones. A milestone on the latest run makes `running` the type for that day. Runs on Strava start 2026-05-19.
**How to apply:** only use numbers from the script, never invent them. For trends, keep to harmless content and share the original link instead of reposting other people's images. Related: [[feedback_fb_post_write_for_general_public_no_jargon]]
