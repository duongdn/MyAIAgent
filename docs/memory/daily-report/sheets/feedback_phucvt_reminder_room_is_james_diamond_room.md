---
name: feedback_phucvt_reminder_room_is_james_diamond_room
description: Skill's PhucVT reminder room !kzyLVmJxcRESoTkfnY is actually "James Diamond - Portfolio" (shared room), not his DM — 10-27 reminder landed there
metadata:
  type: feedback
---
2026-10-27 09:24: the 0h reminder for PhucVT was sent to `!kzyLVmJxcRESoTkfnY`, which the daily-report Piece 9 table lists as PhucVT's room — but it is the shared **James Diamond - Portfolio** room. LeNH noticed ("con AI của anh có hành xử lạ lạ").

**Why:** reminder room table in `.claude/commands/me/daily-report.md` is stale for PhucVT.
**How to apply:** before any `--send-reminder` to PhucVT, resolve his real DM room (check room name via Matrix API = not a project room). Ask user for the correct room ID if unknown; never reuse `!kzyLVmJxcRESoTkfnY` for personal reminders.
