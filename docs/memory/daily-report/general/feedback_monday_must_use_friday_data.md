---
name: feedback_monday_must_use_friday_data
description: "🔴🔴🔴 MONDAY REPORT MUST USE FRIDAY TASK LOG DATA — NOT weekend, NOT last_run. #1 most-repeated bug (dozens of times)."
metadata:
  type: feedback
---

# 🔴 MONDAY = FRIDAY DATA — NON-NEGOTIABLE

This is the single most-repeated bug in the project's history. User has corrected this dozens of times.

## Rule

**On Monday, ALL piece data MUST reference the PREVIOUS FRIDAY (last workday), NOT Saturday/Sunday and NOT `daily_report.last_run`.**

| Piece | Monday uses |
|-------|------------|
| Sheets/Workstream (Piece 4) | **PREVIOUS FRIDAY** date |
| Scrin.io (Piece 5) | **PREVIOUS FRIDAY** date |
| Fountain task log (Piece 6 Part 2) | **PREVIOUS FRIDAY** data |
| Reminders (Piece 9) | Check **PREVIOUS FRIDAY** hours |
| Discord (Piece 3) | Window from `last_run` is fine (activity check) |
| Slack (Piece 2) | Window from `last_run` is fine (activity check) |
| Email (Piece 1) | Window from `last_run` is fine (email timestamp) |

## Why This Keeps Happening

`daily_report.last_run` is typically Friday evening or Saturday morning. The report window "from last_run" naturally covers Sat-Sun, and the cron/report logic uses that window to say "weekend — 0h is expected." Then when the Monday interactive recheck runs, the existing report text with "weekend, expected" gets propagated instead of replaced.

**The window for activity monitoring (Slack, Discord, Email) is different from the date for task-log data (Workstream, Sheets, Scrin).**

## How to Apply — MANDATORY CHECKLIST BEFORE EVERY MONDAY REPORT

1. **BEFORE touching any data**, run: `TZ='Asia/Ho_Chi_Minh' date '+%A %Y-%m-%d'`
2. **If output starts with "Monday"** → set `TASK_LOG_DATE = previous Friday` (3 days ago)
3. **For Sheets/Workstream/Scrin/Fountain Part 2:** ALWAYS pass `TASK_LOG_DATE`, never `last_run` date
4. **In report text:** explicitly state "Friday YYYY-MM-DD (last workday)" — never say "weekend" or "Sat-Sun"
5. **Recheck mode:** if existing report says "weekend" or "Sat-Sun" in any task-log section → overwrite with Friday data immediately, do not keep old text

## Anti-Patterns (DO NOT DO)

| Wrong | Right |
|-------|-------|
| "Window: Sat evening → Sun (weekend)" for Sheets section | "Friday 07-24 (last workday)" |
| "0h across all Sheets for every dev is expected" | Actual Friday hours from WS + Sheets |
| "Window covers Sat-Sun" in Fountain Part 2 | "Friday 07-24 actuals from WS" |
| Using `last_run` date for `sheets-tasklog-scan.js` | Using computed Friday date |
| Keeping "weekend 0h OK" text from cron report in recheck | Replacing with real Friday data |

**If this bug happens again, the fix is NOT to write another memory — it's to check this memory BEFORE every report run.**
