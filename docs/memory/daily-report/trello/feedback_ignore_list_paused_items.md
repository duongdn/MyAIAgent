---
name: feedback_ignore_list_paused_items
description: Colin, Elena-SamGuard, Arthur, Blair Brown, Philip are paused — auto-complete Trello items, don't run their gate check, report under separate Ignore List section
metadata:
  type: feedback
---

2026-09-09: user said these 5 Trello "Check progress" items are paused/inactive customers — stop tracking them: Colin, Element/Elena SamGuard, Arthur, Blair Brown, Philip.

**Why:** customer engagements paused, no point running their gate sources (Slack/sheets/Matrix) daily.

**How to apply:** In `/daily-report trello progress`, skip running the mapped source piece for these 5 items — auto-complete their Trello checklist item unconditionally, and list them under a dedicated "## Ignore List" section in the daily report output (not mixed into normal ✓/⚠️ item lines). Wired into `.claude/commands/me/daily-report.md` Piece 8 and `docs/memory/daily-report/trello/reference_trello_gate_mapping.md`.

If user un-pauses one later, remove it from the ignore list and restore its normal gate check ([[feedback_arthur_blair_brown_gate_added]], [[feedback_philip_msteams_consolidated]], [[feedback_solid_code_new_workspace_unwired]]).
