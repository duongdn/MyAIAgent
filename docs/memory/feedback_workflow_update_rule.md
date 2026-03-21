---
name: Always update workflow doc with feedback
description: Any user feedback or correction must be saved to both memory AND the workflow doc
type: feedback
---

**Any feedback, correction, or new operational knowledge must be stored in BOTH:**
1. A memory file (for Claude's context)
2. The relevant workflow doc in `docs/` (e.g. `docs/weekly-monitor-workflow.md`)

**Why:** This is a standalone project that can be run on any machine. Storing knowledge only in Claude's memory means it's lost when running on a different PC or in a fresh session. The workflow docs are the portable source of truth.

**How to apply:** After every user correction during a workflow run, immediately update the relevant `docs/` workflow file. Do not defer it. Memory alone is not sufficient.
