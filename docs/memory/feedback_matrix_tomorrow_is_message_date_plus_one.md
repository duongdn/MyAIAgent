---
name: feedback_matrix_tomorrow_is_message_date_plus_one
description: "'Tomorrow' in Matrix/Slack messages = message_date + 1 day, NOT today + 1 day. Always compute from message timestamp."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

When a Matrix or Slack message says "tomorrow" (or "ngày mai", "mai"), compute the actual date from the **message's timestamp**, not from today's date.

**Why:** On 2026-06-09, Matrix message from Jun 8 16:11 said "kêu PhucVT off 1 ngày" (have PhucVT take a day off) — context implied "tomorrow". Report wrote "Jun 10" because it added 1 to today (Jun 9). The actual day off was Jun 9 (Jun 8 + 1 = Jun 9). PhucVT's leave note in sheets confirmed "Nghỉ cả ngày" on Jun 9.

**How to apply:** Parse relative time words from message date, not session date. Verify by checking sheets for actual leave notes — that's the ground truth.
