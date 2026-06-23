---
name: feedback_maddy_jira_weekly_check
description: Maddy JIRA cross-check runs EVERY day with --week flag, shown in Sheets section — never skip
metadata:
  type: feedback
---

Run `node scripts/maddy-jira-tasklog-check.js --week [YYYY-MM-DD]` as part of **every** daily report Sheets piece. Never skip because LongVV has 0h today or Maddy logs are empty — the weekly check covers all logged tickets that week.

**Why:** User added this Jun 11 to catch tickets missing estimates, no JIRA log, or over-budget. Was originally gated on "LongVV > 0h" — wrong; check must always run.

**How to apply:**
- Script: `node scripts/maddy-jira-tasklog-check.js --week [YYYY-MM-DD]`
- Output: markdown table, append to daily report Sheets section under heading `## Sheets — Maddy JIRA — W{n} — {HH:MM} (+07:00)`
- Checks per ticket: (1) est set, (2) actual logged on JIRA, (3) est >= actual
- If any ticket fails → raise as alert in the daily report
- JIRA instance: `madhuraka-godahewa.atlassian.net`, auth via `kai@nustechnology.com` (config/.jira-config.json)
- Sheet: `1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I` (Maddy task log)
