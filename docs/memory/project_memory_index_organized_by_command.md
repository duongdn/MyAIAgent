---
name: project_memory_index_organized_by_command
description: docs/memory/MEMORY.md is organized by command/piece (## daily-report:sheets, ## money-report, etc.), not by topic — /util:read-memory <command> [piece] reads Global + the matching section only
metadata:
  type: project
---

`docs/memory/MEMORY.md` (and its Claude-memory mirror) is grouped by which command consumes each memory file, not by topic. Sections: `## Global` (read always) + one `## daily-report:{piece}` per daily-report piece (email/slack/discord/sheets/scrin/fountain/elena/trello/reminders/matrix/upwork) + one section per other command (weekly-report, monday-report, money-report, news-digest, server-monitor, bailey-*, mpfc-monitor). Commands with no matching section (trello-monitor, cdf-monitor, tax-check, vn-bank-rates) read Global only.

**Why:** Before 2026-06-23 the index was grouped by topic and `me:daily-report`'s mandatory-first-step said "read EVERY feedback file" (121 files) — every single command invocation, even `/daily-report sheets khanhhh`, loaded the full index. User asked to reorganize so each command stops reading excess memory.

**How to apply:** `.claude/commands/util/read-memory.md` now takes `<command> [piece]` and reads only Global + the matching section(s). When adding a NEW memory file going forward, file it under the command-specific section in MEMORY.md that actually consumes it (not a topic-named section) — keep the per-command read scope intact. The underlying 121 memory content files were NOT changed/retagged, only the index's grouping — content edits still go through the normal save-memory flow.
