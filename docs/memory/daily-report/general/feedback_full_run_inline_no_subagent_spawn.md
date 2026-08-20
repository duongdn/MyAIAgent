---
name: feedback_full_run_inline_no_subagent_spawn
description: Full daily-report runs must execute all pieces inline in one session, never spawn a subagent per piece — user runs full report daily, rarely individual pieces
metadata:
  type: feedback
---

Full `/daily-report` (no piece arg) must run ALL pieces sequentially inline in the current session — never spawn a subagent/Task per piece, `--cron` or not.

**Why:** User confirmed 2026-08-20 the full report is run daily and individual pieces are rarely invoked standalone. The command file (`.claude/commands/me/daily-report.md`) is 1250+ lines (~65K tokens); every subagent spawned per piece re-loads the entire file plus all matched memory from a cold context. That reload — not the API scans themselves — was the dominant token cost of a full run.

**How to apply:** Treat full-run inline execution as the default, not an opt-in via `--cron`. Only spawn a subagent for a piece when the user explicitly runs that single piece standalone and it's genuinely long-running/needs isolation — never as the default pattern for the full 10-piece run. See the 🔴 note added directly in the command file's header (Cron flag section).
