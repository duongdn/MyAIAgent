---
name: feedback_matrix_action_item_check_reply_before_flagging
description: Matrix "action items for DuongDN" must be checked for DuongDN reply after the ask before surfacing
metadata:
  type: feedback
---
fetch-matrix-daily.js flags any message addressed to DuongDN as an action item, even if DuongDN answered right after. 2026-09-24: flagged vutq DO-account ask (answered 09:33, same minute) and tiennd Arthur pricing (answered 09:29/09:37) as pending — user: "đưa rồi mà / trả lời rồi mà".
**Why:** regex flagging ignores later replies; repeating answered asks wastes user time.
**How to apply:** before listing any Matrix action item, read the following messages/thread in that room; if duongdn replied after the ask, mark ✅ answered, not pending. Also: Matrix dumps can contain plaintext credentials people paste (DO password 09-23) — redact `reports/*/matrix-rooms-*.md` before commit. See [[feedback_read_full_room_transcript_not_grep_snippets]].
