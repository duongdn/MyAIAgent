---
name: feedback-report-path-is-root-reports-not-plans-reports
description: "server-monitor (and likely other monitoring skills) reports go to project-root reports/{YYYY-MM-DD}/{HHMM}-{slug}.md, NOT plans/reports/ — recurring mistake"
metadata:
  type: feedback
---

Monitoring skill reports (server-monitor, bailey-monitor, news-digest, daily-report, etc.) save to root-level `reports/{YYYY-MM-DD}/{HHMM}-{slug}.md`. This is a DIFFERENT directory from `plans/reports/` (which is for planning-workflow subagent reports, per `.claude/rules/documentation-management.md`).

**Why:** User said "again, wrong location" — this has recurred. Session-injected hook context's `## Paths` section says `Reports: .../plans/reports/`, which is misleading for monitoring skills — that path is for planner/dev workflow, not for `/me:*` monitoring commands. Existing precedent: `reports/2026-09-04/0839-server-monitor.md`, `reports/2026-09-11/0205-bailey-monitor.md`, etc. all live at root `reports/`.

**How to apply:** Before writing any `/me:*` monitoring report, check existing sibling reports in root `reports/{today}/` for the naming pattern rather than trusting the hook-injected `## Paths` > Reports value. If `reports/` (root) has same-command precedent, use that location regardless of what the plan-context hook suggests.

[[project_memory_index_organized_by_command]]
