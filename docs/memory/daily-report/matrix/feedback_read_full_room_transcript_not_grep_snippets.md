---
name: feedback_read_full_room_transcript_not_grep_snippets
description: When a Matrix room has real activity (e.g. Arthur-Meta-Stamp 79 msgs), read the FULL transcript before summarizing — a keyword grep of 2-3 lines misses real signals (financial risk, unresolved client questions)
metadata:
  type: feedback
---

Grabbing 2-3 lines via keyword grep (e.g. searching for the project name) from a large active room and calling it "clean, no action needed" is not sufficient — it misses real content sitting a few lines away.

**Why:** 2026-07-07, "Arthur - Meta-Stamp" room had 79 messages. A quick grep pulled only "namtv: asking about >40h/week policy... client budget concerns" and this was filed as "informational, internal team discussion, no action needed." Reading the FULL 79-message transcript revealed: (1) a real unresolved client question about metadata/attribution requirements nobody had answered yet, (2) a demo pushed to Production for client testing the next day, (3) and — the actually important part — the team lead (Nam Tran) explicitly saying **"lately several clients have been difficult about overtime pay, one even refused to pay"** — a real pattern of client payment disputes, not routine internal chatter. User: "Sao ko thấy report của Arthur mà lại mark done, thấy quá trời info kìa!!!" (why wasn't there a report when there's clearly tons of info).

**How to apply:**
- For any room with double-digit+ message counts in a monitoring window, or any room tied to an active/named client project, read the room's FULL transcript (not just a grep hit) before writing the daily-report summary or deciding a Trello item is "clean."
- Watch specifically for: unanswered client questions, financial/payment friction phrases (unpaid overtime, budget complaints, "khó", "không thanh toán"), and deliverable deadlines (production pushes, demo dates) — these get missed by narrow keyword searches because they don't contain the searched keyword itself.
- See [[feedback_matrix_daily_summary]] for the report FORMAT (bullets not raw dump) — this memory is about READ DEPTH before summarizing, a different failure mode than formatting.
