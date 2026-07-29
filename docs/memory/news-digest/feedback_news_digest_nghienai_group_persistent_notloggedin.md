---
name: feedback_news_digest_nghienai_group_persistent_notloggedin
description: "Nghiện AI Facebook group (groups/nghienai) fails not_logged_in even when the FB session is confirmed alive via shinantori/mrgoonie pages — distinct group-level access issue, not a session-wide failure. Confirmed 2026-07-30."
metadata:
  type: feedback
  modified: 2026-07-30T04:05:00.000Z
---

On 2026-07-30, `fetch-news.py ai --limit=100` reported `Nghiện AI (Facebook Group)` as `not_logged_in`. Per [[feedback_facebook_not_logged_in_is_false_failure]], re-ran the scraper directly (`node scripts/facebook-page-scraper.js groups/nghienai --limit=3`) to check for a false failure — it failed again with the same `not_logged_in` / "0 posts" result. Meanwhile `shinantori` and `mrgoonie` (the two FB page sources in the same run) both returned real authenticated posts, proving the underlying FB session/cookies are alive.

**Why:** This is a group-specific access problem, not a session-wide dead-cookie problem — likely the authenticated FB account is not (or no longer) a member of the `nghienai` group, or group post visibility requires a different permission than page visibility. Distinct from the 5 prior root causes catalogued in [[feedback_news_digest_thieu_nguyen_rss_timeout]] and [[feedback_facebook_not_logged_in_is_false_failure]], all of which were session/interpreter/DOM issues affecting all FB sources uniformly.

**How to apply:** If `Nghiện AI (Facebook Group)` keeps failing while the other 2 FB page sources succeed in the same run, don't re-diagnose as a session problem — check group membership/visibility for the scraping account (may need manual re-join or a visibility setting change on the group side, not a code fix). Continue to verify via direct scraper call before reporting as a technical error, per [[feedback_facebook_not_logged_in_is_false_failure]], but if pages succeed and only the group fails, that confirms it's group-specific and not worth repeated re-fetching in recheck mode.
