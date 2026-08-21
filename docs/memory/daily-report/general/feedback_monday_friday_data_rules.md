---
name: feedback_monday_friday_data_rules
description: "🔴🔴🔴 On Monday: task-log pieces (Sheets/Workstream/Scrin/Fountain/Reminders) MUST use PREVIOUS FRIDAY's date, not last_run/weekend. Activity-monitoring pieces (Slack/Discord/Email) correctly use last_run — do not hardcode those. #1 most-repeated bug in project history."
metadata:
  type: feedback
---

# 🔴 MONDAY = FRIDAY DATA for task-log pieces — NON-NEGOTIABLE

Single most-repeated bug in this project's history, corrected dozens of times. Two distinct mechanisms apply to two distinct piece categories — do not conflate them.

## Rule

| Piece | Monday uses |
|-------|------------|
| Sheets/Workstream (Piece 4) | **PREVIOUS FRIDAY** date |
| Scrin.io (Piece 5) | **PREVIOUS FRIDAY** date |
| Fountain task log (Piece 6 Part 2) | **PREVIOUS FRIDAY** data |
| Reminders (Piece 9) | Check **PREVIOUS FRIDAY** hours |
| Discord (Piece 3) | Window from `last_run` — fine as-is, do not hardcode |
| Slack (Piece 2) | Window from `last_run` — fine as-is |
| Email (Piece 1) | Window from `last_run` — fine as-is |

**The window for activity monitoring (Slack, Discord, Email) is different from the date for task-log data (Workstream, Sheets, Scrin, Fountain).** Activity pieces read window start from `last_run` in `config/.monitoring-timelines.json` — this is universal and correct, not source-specific, and needs NO special Monday case: if `last_run` is updated correctly at the end of every run (per [[feedback_timeline_system]]), it already points to Friday's timestamp on Monday morning. Only fall back to a calculated "previous business day" for activity pieces if `last_run` is provably missing/corrupted/implausibly stale — and even then, fix why it went stale rather than relying on day-of-week guessing.

Task-log pieces are different: they need an explicit computed `TASK_LOG_DATE`, not `last_run`, because `last_run` (Friday evening/Saturday morning) makes the naive window cover Sat-Sun, which the report logic then mislabels as "weekend — 0h expected."

## Why this keeps happening

Original 2026-06-08 incident: a hardcoded Discord scan script date literal used Saturday instead of Friday — root cause was the script not reading `last_run` correctly, but the fix documented at the time ("Monday → go back to Friday") treated the symptom, not the root cause. That's why activity pieces must NOT hardcode day-of-week logic — trust `last_run`. Separately, task-log pieces have the opposite problem: the Monday recheck's existing report text ("weekend, expected") gets propagated instead of replaced with real Friday actuals.

## How to apply — mandatory checklist before every Monday report

1. **BEFORE touching any data**, run: `TZ='Asia/Ho_Chi_Minh' date '+%A %Y-%m-%d'`
2. **If output starts with "Monday"** → set `TASK_LOG_DATE = previous Friday` (3 days ago), used ONLY for Sheets/Workstream/Scrin/Fountain Part 2/Reminders
3. **Activity pieces (Slack/Discord/Email):** keep reading window from `last_run` as normal — do not touch/override for Monday
4. **In report text:** explicitly state "Friday YYYY-MM-DD (last workday)" for task-log sections — never say "weekend" or "Sat-Sun"
5. **Recheck mode:** if existing report says "weekend"/"Sat-Sun" in any task-log section → overwrite with Friday data immediately, do not keep old text
6. Never silently accept a `last_run` that's obviously wrong (too old/in the future) without flagging it — but also never override a plausible `last_run` just because "today is Monday."

## Anti-patterns

| Wrong | Right |
|-------|-------|
| "Window: Sat evening → Sun (weekend)" for Sheets section | "Friday 07-24 (last workday)" |
| "0h across all Sheets for every dev is expected" | Actual Friday hours from WS + Sheets |
| Using `last_run` date for `sheets-tasklog-scan.js` | Using computed Friday date |
| Keeping "weekend 0h OK" text from cron report in recheck | Replacing with real Friday data |
| Hardcoding "if Monday, window starts Friday" in an activity-piece script | Trust `last_run`, fix the script if it's not reading it correctly |

**If this bug happens again, the fix is NOT to write another memory — it's to check this memory BEFORE every report run.**

Related: [[feedback_timeline_system]], [[feedback_vinn_daily_report_format]]
