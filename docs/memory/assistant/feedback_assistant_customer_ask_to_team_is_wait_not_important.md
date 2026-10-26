---
name: assistant-customer-ask-to-team-is-wait-not-important
description: MyDailyAssistant — customer asking devs/team is not important; only surface if unanswered >15 min; dev↔dev Matrix talk never
metadata:
  type: feedback
---
Customer → team/dev questions (Slack/Discord `<@ID>` mentions = our devs/personas, not DuongDN) are NOT important. Only push to "Tin quan trọng" if nobody on our side replied after 15 min (`replyWaitMin: 15`). Dev↔dev Matrix chat not addressed to "Duong Doan/duongdn/a Dương" → drop; any teammate reply in Matrix counts as answered. Pure acknowledgements ("no worries", "have a nice weekend") → drop. Burst from same sender → one notification.

**Why:** 2026-10-26 user: "rất nhiều tin gởi cho team vô mục quan trọng" (AirAgri dapackage, SamGuard OP-60 examples).
**How to apply:** rules live in `scripts/assistant/prompts/relevance-gate-prompt.md` + `oursRepliedSince`/`hasWaitingAsk` in `scripts/assistant/lib/inbox-db.js`. Elena Optimization (#optimization, OP-*) is ACTIVE, not the paused Elena-SamGuard item. Related: [[assistant-notify-only-relevant-no-store-noise]]

**Update 2026-10-26 (user: "cái này chỉ đích danh tôi, cũng lại bỏ — bộ lọc rất tệ"):** anything addressing DuongDN by name ("Duong Doan", "duongdn", "a/anh Dương") or DM = URGENT immediately, never the 15-min queue — forced in code (`event-intake.js`, `meta.mentionsMe`), and only DuongDN's own reply closes such an ask (teammate replies don't).
