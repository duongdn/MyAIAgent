---
name: feedback_matrix_tomorrow_is_message_date_plus_one
description: "Leave dates must be verified from email leave requests or sheets leave notes — NEVER infer from 'tomorrow/mai' in Matrix/Slack messages."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

**NEVER determine a dev's leave date by parsing relative words ("tomorrow", "ngày mai", "mai") from Matrix or Slack messages.**

The correct sources for leave dates, in order of authority:
1. **Email leave request** — subject contains "nghỉ phép", "xin nghỉ", "leave request" — contains exact date
2. **Sheets leave note** — col A "Nghỉ cả ngày" or "Nghỉ nửa ngày" under the day header — ground truth

**Why:** On 2026-06-09, a Matrix message from Jun 8 mentioned having PhucVT take a day off. Instead of checking the email, leave date was inferred as "Jun 10" (wrong) by adding 1 to session date. Sheets confirmed actual leave = Jun 9. The email leave request would have contained the exact date.

**How to apply:**
- When Matrix/Slack says a dev will take leave → check email scan for "xin nghỉ"/"nghỉ phép" from that dev
- Cross-verify with sheets col A leave note — if it says "Nghỉ cả ngày" on Jun 9, leave is Jun 9
- Report the date from the source, not from parsing chat language
