---
name: project_memory_index_organized_by_command
description: docs/memory/MEMORY.md is organized by command/piece (## daily-report:sheets, ## money-report, etc.), not by topic — /util:read-memory <command> [piece] reads Global + the matching section only
metadata:
  type: project
---

`docs/memory/MEMORY.md` (and its Claude-memory mirror) is grouped by which command consumes each memory file, not by topic — and as of 2026-06-23 the files themselves are physically moved into matching subfolders, not just indexed: `global/`, `daily-report/{email,slack,discord,sheets,scrin,fountain,elena,trello,reminders,matrix,upwork,general}/`, `weekly-report/`, `monday-report/`, `money-report/`, `news-digest/`, `server-monitor/`, `bailey/`, `mpfc-monitor/`. Commands with no matching folder (trello-monitor, cdf-monitor, tax-check, vn-bank-rates) read `global/` only.

**Why:** Before 2026-06-23 the index was grouped by topic and `me:daily-report`'s mandatory-first-step said "read EVERY feedback file" (121 files, all flat in one directory) — every single command invocation, even `/daily-report sheets khanhhh`, loaded the full index. User asked first to reorganize the index by command, then to physically move the files into matching folders for easier tracing.

**How to apply:**
- `.claude/commands/util/read-memory.md` takes `<command> [piece]` and reads only `global/` + the matching folder's files.
- A file used by 2+ commands lives in ONE primary folder only (first-section-wins from when the index was built) — other sections link to that same physical file across folders rather than duplicating content. E.g. `feedback_token_handling.md` physically lives in `daily-report/slack/` but is also linked from the `## daily-report:matrix` section.
- When adding a NEW memory file, create it directly inside the command-specific subfolder it belongs to (e.g. `docs/memory/daily-report/fountain/feedback_xxx.md`), not the root, and mirror the same subfolder path in the Claude-memory copy.
- `docs/memory/MEMORY.md` itself stays at the root — it is the index, not content.
- `reference_trello_gate_mapping.md` moved to `daily-report/trello/` — `.claude/commands/me/daily-report.md` was updated at its 2 hardcoded references to this file's old flat path.
