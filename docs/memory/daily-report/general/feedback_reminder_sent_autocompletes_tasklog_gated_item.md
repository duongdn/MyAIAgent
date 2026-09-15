---
name: feedback_reminder_sent_autocompletes_tasklog_gated_item
description: "When a Trello checklist item is left incomplete ONLY because a dev has 0h/missing task-log (no leave), sending the Matrix reminder to that dev IS the action — mark the item complete right after sending, don't leave it open waiting for the dev to actually log hours"
metadata:
  type: feedback
---

User directive 2026-09-15 (re: KhanhHH and LeNH both showing genuine 0h 2026-09-14, no leave): "nếu ko có task log nữa thì gởi reminder và complete các item, lưu ý các checklist chưa check từ này về sau vì lí do task log mà đã được yêu cầu send reminder thì tự complete" — if there's still no task log, send reminder and complete the item(s); going forward, ANY checklist item left un-checked purely because of a task-log/0h reason, once the reminder has been sent, auto-completes.

**How to apply:**
1. Before sending, re-verify the 0h is still current (re-query Workstream/Sheets fresh — don't reuse a stale earlier-run number), and re-confirm no leave was filed since.
2. Send the reminder (Piece 9 template, to the dev's Matrix room per [[reference_matrix_rooms]]) — this requires no extra confirmation once the finding is genuinely a task-log/0h gate (distinguish from other alert types — a customer complaint, a real bug, a quality escalation — which still need explicit user confirmation before any action per [[feedback_never_send_messages_without_permission]]; this exception is specifically for the routine 0h-reminder case already covered by Piece 9's own `--send-reminder` semantics).
3. Immediately after a successful send, mark EVERY Trello item gated on that dev's task-log for that day complete (e.g. KhanhHH's 0h blocked both Aysar and Elliott; LeNH's 0h blocked James Diamond) — don't wait for the dev to actually respond/backfill hours.
4. Log the reminder (room ID, message text, event_id) in the report/section that reported the 0h, using strikethrough-correction style if it supersedes an earlier "left incomplete" note.

This complements (does not replace) the existing low-but-nonzero rule in Piece 9 — a genuine 0h/no-leave case gets this template+auto-complete treatment; a low-but-nonzero case still needs the real-number wording, not this template, but likely still auto-completes once sent (apply same logic unless the user says otherwise for that case).
