---
name: report-location-correct-path
description: "Monitor/skill reports go in reports/{YYYY-MM-DD}/{HHMM}-{name}.md — NOT in plans/reports/"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 12cea180-7e67-47f1-aa82-3b675c9e2e9e
  modified: 2026-09-08T02:27:37.887Z
---

Reports from monitoring skills (bailey-monitor, server-monitor, daily-report, etc.) go in:
`reports/{YYYY-MM-DD}/{HHMM}-{name}.md`

Example: `reports/2026-05-15/0853-bailey-monitor.md`

**Why:** User was furious when reports were placed in `plans/reports/`. The `plans/` directory is for implementation plans only. The `reports/` root directory has date-based subdirectories for all monitoring reports.

**How to apply:**
- `reports/` — monitoring/skill output reports (date subdirs, HHMM prefix)
- `plans/` — implementation plans and planning docs only
- The session hook injects `plans/reports/` as Reports path — IGNORE IT for monitoring skills; use `reports/{date}/` instead
- Skill instructions say `reports/{YYYY-MM-DD}/{HHMM}-{name}.md` — follow the skill, not the hook

**Repeat 2026-07-09:** `/me:bailey-invoice-verify`'s own command file ALSO hardcodes a wrong path — its "Save report to" line literally says `plans/reports/bailey-invoice-verify-{YYMMDD-HHMM}.md`. Followed that literal instruction, wrote to `plans/reports/`, user flagged it again ("đã note mấy lần rồi" — already noted several times). The skill file text itself is stale/wrong here, same as the session hook — for ANY monitoring/verify command (not just daily-report family), default to `reports/{YYYY-MM-DD}/{HHMM}-{slug}.md` and only use `plans/reports/` when the task is a genuine implementation-plan artifact.

**Repeat 2026-09-08:** Same command, same mistake AGAIN — dispatched a fresh subagent for `/me:bailey-invoice-verify` without pre-loading this memory into its prompt, agent followed the command file's hardcoded `plans/reports/...` path literally. User very angry ("ngu kinh" — repeated correction). Root cause: subagent prompts for report-producing commands must explicitly state the correct `reports/{date}/{HHMM}-{slug}.md` path and explicitly override the command file's own wrong path — don't just point the subagent at the skill doc and trust it.
