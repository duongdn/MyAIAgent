---
name: feedback_bailey_matrix_daily_report_gate
description: "Bailey Trello item ALSO gated on Nick's daily report to customer in Matrix room 'NUS - Bailey - Paturevision 2026', same pattern as Aysar's Baamboozle MPDM check — check presence, never auto-send reminder"
metadata:
  type: feedback
---

**Added 2026-09-08 per user request** (after the user spotted a live incident: datnc noticed no daily report from Nick to the customer since start of September in this room, duongdn had to remind the team live that daily-report discipline is mandatory — "bảo hiểm communication khi mình làm việc với cus").

**Room:** "NUS - Bailey - Paturevision 2026", `!MaisjkNOhxoXkhCxqa:nustechnology.com` — this is the customer-facing project room (not the internal GGS Slack #maintenance channel, which is a separate existing Bailey gate).

**How to check:** fetch room message history since `daily_report.last_run`, look for a daily-report-shaped message from Nick (task/status summary addressed to the customer) — not just dev-to-dev chat about bugs/tasks. Same shape as the Aysar MPDM check: presence/absence, not content depth.

**Gate condition:** only an alert if Nick had Workstream/Sheets hours logged on Bailey/Paturevision for that day (mirrors the Aysar rule — "silence is only an alert if hours were logged that day," see [[feedback_aysar_consolidated]]). 0h day = no task = no report expected = not an alert.

**🔴 Reminder rule — same as every other reminder in this skill:** if missing, surface it in the report as an alert/incomplete item. **Do NOT auto-send a reminder into the room.** Ask the user for explicit confirmation first (same as [[feedback_never_send_messages_without_permission]] and the `--send-reminder` gate in Piece 9) — checking/scanning is never permission to send.

**How to apply:** add this room to the Bailey gate check alongside `slack ggs` + `sheets tuannt` every daily-report run (full run and recheck). See [[reference_matrix_rooms]] for the room ID.
