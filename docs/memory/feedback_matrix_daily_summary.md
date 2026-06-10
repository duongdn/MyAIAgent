---
name: feedback-matrix-daily-summary
description: Matrix daily scan must be summarized per room, not raw message dump
metadata:
  type: feedback
---

Matrix room scan in the daily report MUST be a summarized table — one row per active room with message count and 1-line key content. NEVER dump raw messages.

**Why:** User corrected multiple times. Raw message dumps (matrix-rooms-*.md referenced in report body) are not acceptable as the report section.

**How to apply:** After scanning Matrix rooms, write a `## Matrix — HH:MM (+07:00)` section with a table:
| Room | Msgs | Summary |
Each summary = 1 line, key actors + key events. Action items listed separately below table.
