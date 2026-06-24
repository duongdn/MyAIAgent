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

🔴 **Skipped again 2026-06-24:** the 06:08 run omitted this entirely (no "Maddy JIRA" section in the report) despite "never skip." Ran on recheck when user asked directly "are devs filling Workstream/JIRA correctly" — same class of failure as [[feedback_no_dated_scan_scripts]] (a rule written in memory but not enforced by anything that runs automatically). Treat absence of this section as itself a red flag when reviewing any day's report.

**Workstream cross-check added 2026-06-24:** also diff JIRA worklogs (`GET /rest/api/3/issue/{key}/worklog`, filter `started >= weekStart`) against the Workstream "Xtreme Soft Solutions" project (`cmpqc1v7v00ahtk1vs1817xt8`) for the same week. Confirmed: Workstream `employeeName` is always **"LongVV"**, never literally "Kai" — matches `config/.jira-config.json` team mapping (Kai persona → internal_name LongVV). LongVV logs Workstream in a **Wed/Thu batch**, not daily — 0h Mon-Tue is normal, only flag if still empty by Friday. Each week's batch has hit exactly 16h for the last 3 weeks (consistent with the 16h/week part-time target, see [[feedback_longvv_consolidated]]) — the unresolved 16h-vs-40h question in [[feedback_maddy_kai_longvv_identity_and_quality_escalation]] is NOT resolved by this (still ask user before changing the threshold), this just confirms the LongVV=Kai identity mapping itself.
