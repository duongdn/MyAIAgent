---
name: feedback_nc_staging_unreachable_is_intentional_ignore
description: Neural Contract nc_staging SSH timeout = instance stopped on purpose; ignore, no alert, still tick Trello item
metadata:
  type: feedback
---

User confirmed 2026-10-30: nc_staging (52.65.197.217) is turned off intentionally. "ko được thì ignore".

**Why:** Staging stopped by choice; timeout is not an incident.

**How to apply:** In server-monitor, try nc_staging once; if unreachable, note "stopped (intentional)" — no WARNING/question, and still mark "Neural Contract - Contract Probe" complete on Trello.
