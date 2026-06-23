---
name: Per-client Trello items gate on the lead dev's status, not on every contributor
description: "Check Progress" items named "Project - Lead dev" are gated on the lead dev (the one running the client comms / responsible for the project), not on every supporting developer. Issues with supporting devs go in the report alerts but do not block the per-client item.
type: feedback
---

"Check Progress" Trello items follow the pattern "Project Name - Lead Dev - notes" (sometimes "- Lead Dev / Backend Dev"). The item is gated on the **lead dev's** status (the one running client comms / project ownership), not on every contributing developer working under them.

**Why:** User corrected on 2026-05-11. The 2026-05-11 daily report skipped:
- "John Yi - Amazing Meds" because TuanNT (back-end dev) had Scrin.io over-inflation 6h sheet vs 1h23m tracked. But the item is **Nick's** (Nick runs John Yi comms; TuanNT only contributes via task log). Nick had Fri 16:54 daily report in #it-dept-all + Mon 08:03 proactive priority ask in #web-dev-with-nick + clean DM with John Yi — all green. **Should have been completed.**
- "Elliott" because KhanhHH had Fri 7.83h vs 8h target (0.17h shortfall). But per `feedback_lenh_partial_hour_alert`, "the Trello checklist completion can stay (don't un-complete for tiny gaps), but the report must mark Status as ⚠️ and include the reminder line." Reminder was sent → Trello should have been completed.

**How to apply:**
1. **John Yi - Amazing Meds:** gate on Nick (Slack #it-dept-all daily report, DM with John Yi, proactive Mon ping). TuanNT log accuracy issues go in the report's alerts section, NOT as a Trello block.
2. **Elliott:** gate on Elliott + Carrick + Violet on Generator Slack. KhanhHH back-end hour shortfall in Generator sheet → reminder + report ⚠️, NOT Trello block.
3. **General rule:** the named person on the Trello item is the gate. Other devs surfaced through sheet/Upwork/Scrin checks may produce report alerts but do NOT block per-client items unless the named lead dev's status itself fails.
4. Pair with `feedback_blake_rollbar_not_person_alert` and `feedback_neural_silence_not_alert` — same principle: the per-client item gates on the named owner's reachability/comms, not on every operational signal in the project's blast radius.
5. Tiny daily shortfalls (<1h) that already trigger a Matrix reminder do NOT block Trello (per `feedback_lenh_partial_hour_alert` last sentence — "checklist completion can stay").
