---
name: feedback_ohcleo_script_misses_thread_replies
description: slack-fetch-ohcleo.js reads conversations.history only, so it never sees thread replies; a Celine ask looked unanswered while Tony had replied in-thread
metadata:
  type: feedback
---
2026-10-19 cron flagged Celine's "how much is left approximately?" (Fri 17:16) as unanswered and left Ohcleo ○. The message had `reply_count: 2`: Tony replied in-thread at 17:20 ("fix them on Monday and send it to you then") and Celine accepted. `scripts/slack-fetch-ohcleo.js` has no `conversations.replies` call, so thread replies are invisible to it.

**Why:** a false "unanswered customer ask" alert kept a Trello item open.
**How to apply:** for any OhCleo message with `reply_count > 0`, fetch `conversations.replies` before calling it unanswered (and ideally add this to the script). Same family as [[feedback_slack_threads]].
