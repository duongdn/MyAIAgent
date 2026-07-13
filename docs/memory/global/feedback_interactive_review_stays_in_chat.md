---
name: feedback_interactive_review_stays_in_chat
description: "Ad-hoc reviews the user will read and react to right now go DIRECTLY in the chat message, not written to a tmp file with \"see tmp/x.md\" — file-and-pointer is for permanent/scheduled reports only, see [[feedback_report_location]]"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

For interactive back-and-forth reviews (e.g. "review memory, tell me what's wrong", decision-needed summaries the user will respond to in the next message), paste the actual content directly in the chat response. Do NOT write it to a file (even in `tmp/`) and say "see tmp/memory-review.md".

**Why:** User corrected repeatedly in the same session (2026-07-13), 3+ times: "trời ạ, lại nữa, file report để tôi review đâu !!!, mấy info này để trong chát được rồi" (oh god, again — this info could've just stayed in chat). Each time, writing to `tmp/memory-review.md` and pointing the user to it added a pointless extra file-open step for content meant to drive immediate back-and-forth, not to be archived.

**How to apply:**
- Interactive review/audit/decision content → answer in chat text, no file, even if long.
- Permanent/scheduled outputs (daily/weekly monitoring reports, anything meant to be archived) → file in `reports/{date}/` per [[feedback_report_location]], or `plans/`/`docs/` if explicitly requested.
- If genuinely unsure, ask the user whether they want a file — don't default to file-and-pointer for review content.
