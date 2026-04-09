---
name: Three-timeline monitoring system — update rules
description: daily_report, refresh, alert have independent timelines in .monitoring-timelines.json. MUST update at end of EVERY run. Daily report also advances alert timeline.
type: feedback
originSessionId: 85e129a4-19bd-49e1-b39d-0b3c5a2cb7a7
---
Three timelines in `config/.monitoring-timelines.json`, each with `last_run` and `output_file`:
- **daily_report** — updated on morning daily report
- **refresh** — updated only on daily-report-refresh
- **alert** — updated on alert cron scan

**Rules:**
1. After daily report: update BOTH `daily_report.last_run` AND `alert.last_run` (daily report already scanned everything)
2. After alert scan: update only `alert.last_run`
3. After refresh: update only `refresh.last_run`
4. VERIFY by reading file back after write
5. If run fails partway, still update timeline to prevent stale windows

**Why:** Stale timestamps = next run re-scans huge windows (e.g., 47h instead of 24h). User flagged this as recurring "silly mistake" multiple times. Timeline update is NON-NEGOTIABLE last step.

**Pattern to watch:** When spawning subagents, timeline update gets lost in handoff. MAIN agent must always do the final update.
