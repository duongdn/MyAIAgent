---
name: feedback_phucvt_adhoc_external_ignore
description: PhucVT works adhoc/external projects — 0h on WS/Sheets is normal, not an alert
metadata:
  type: feedback
---

PhucVT works on adhoc and external projects, not tracked via Workstream or Google Sheets task log.

**Why:** User confirmed 2026-07-29: "PhucVT is adhoc and external project, temporarily ignore." Flagging 0h on WS/Sheets for PhucVT produces false alerts.

**How to apply:**
- Do NOT flag PhucVT 0h as an alert (even if WS + Sheets both return 0h)
- Do NOT send reminders to PhucVT for 0h
- Do NOT let PhucVT 0h gate any Trello items (James Diamond/Vinn uses Discord, not task log hours)
- Still monitor PhucVT's Workstream "needsReview" for Crystal lang (Arthur) — that's a separate cross-check
- This is temporary per user wording ("temporarily ignore") — may change in future
