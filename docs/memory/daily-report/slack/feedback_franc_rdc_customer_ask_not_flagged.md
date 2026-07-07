---
name: feedback_franc_rdc_customer_ask_not_flagged
description: Franc/RDC Slack gate wrongly marked complete on a real unaddressed customer ask — presence of a dmetiner message was treated as "clean" without reading content
metadata:
  type: feedback
---

Franc (RDC - FM Monitoring) was marked complete in the 2026-07-07 report on "dmetiner update ✓" — but dmetiner had posted 3 concrete action requests (MPX failing on Istanbul+Munich devices, plugin repo reorg, tied to an upcoming Turkey export shipment) directly @-mentioning Carrick, with only a "Thanks, let me check" reply and no follow-up 25+ hours later. User caught this: "Franc side is not ok, customer clearly mentioned/tagged asking me to check, but there was no warning at all."

**Why:** the Franc gate logic treated "customer posted in the channel" as equivalent to "routine update, mark clean" — never actually read the message content to check whether it was a direct, unaddressed action request. This is different from [[feedback_project_topics_not_alerts]] (dev-topic chatter ≠ alert) — that rule is about generic internal dev discussion; this was a customer directly asking the team to investigate/deliver something, with no real response, ahead of a deadline.

**How to apply:**
1. For any Slack gate where the customer posts directly (Franc/dmetiner, and similarly any client-facing channel), don't just count messages or check "did X post something" — read the actual message text.
2. Ask: is this a direct ask/question/request for action from the customer, still unanswered or only acknowledged ("let me check") with no substantive follow-up? → flag as a warning, do not complete the Trello item.
3. Generic project chatter, status updates, or fully-resolved threads → clean, complete as normal.
4. Same principle as [[feedback_read_full_room_transcript_not_grep_snippets]] (Matrix) — applies to Slack too: grep/keyword-count summaries miss the actual signal.
