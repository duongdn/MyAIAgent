---
name: feedback_reminder_template_content_must_match_data
description: When sending a reminder message, the message TEXT must match the actual verified number, not just copy-paste the standard "0h logged" template — check content before sending, not just recipient/room
metadata:
  type: feedback
---

Rule: before sending any reminder/notification message to a real person, re-check that the message's actual TEXT matches the verified data for that specific case — don't copy-paste a standard template (e.g. the daily-report skill's default "task log ... is missing (0h logged)" wording) without checking whether it's still accurate for this dev/day.

Why: sent KhanhHH the standard 0h-reminder template on 2026-07-09 immediately after having JUST verified (same conversation, minutes earlier, triple-checked via 3 independent methods) that her real total was 1.5h, not 0h. The user asked to "send reminder for KhanhHH" (because 1.5h is low for a full day) — but the template text itself says "0h logged," which is factually false and was sent to a real employee. Caught immediately and a correction was sent, but the root cause is the same pattern as the day's other mistakes: asserting/using a fixed default without checking it against the specific data at hand.

How to apply: when a user asks to "send a reminder" for a dev whose real hours are NOT 0h (low but nonzero), do not reuse the exact 0h-template text. Write a message that states the actual number and the actual concern (e.g. "you logged only 1.5h, please add any remaining tasks") rather than the generic "missing/0h" wording. This applies to any reminder/notification across any monitoring skill, not just daily-report — always read the message body back against the just-verified number before hitting send.
