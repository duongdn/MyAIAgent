---
description: On-demand refresh of all monitoring sources (Slack, Discord, Email, Matrix, GitHub, etc.)
---

# Daily Report Refresh

Run an on-demand monitoring refresh across all channels. This generates a **separate timestamped update file** — it does NOT overwrite the daily report.

## Output File

`./reports/{YYYY-MM-DD}/{HHMM}-update.md`

Use current date and time (24h format, local timezone).

## Instructions

1. Read workflow from `./docs/daily-report-workflow.md`
2. Read all config files listed in the workflow (`.slack-accounts.json`, `.discord-accounts.json`, `.email-accounts.json`, `.matrix-config.json`, `.google-docs.json`, `.scrin-config.json`, `.redmine-config.json`, `.elena-pending-actions.json`)
3. Read memory files for rules: feedback on Slack threads (must use `search.messages`), alerts (don't complete Trello if alert found), over-estimate tracking (compare with previous report)
4. Read today's daily report (`reports/{YYYY-MM-DD}/daily-report.md`) and any previous update files to know what was already reported
5. Read `.monitoring-timelines.json` for the two-timeline system:
   - Use `refresh.last_run` as start of monitoring window
   - BUT check previous refresh report — if it only covered some sources, use `daily_report.last_run` for unchecked sources
   - After completing, update ONLY `refresh.last_run` to current time
6. For each monitoring source, fetch **new activity since last check**:
   - **Slack**: All 13 workspaces using `search.messages` API with `after:{day_before_cutoff}` + epoch ts filter
   - **Discord**: Both accounts (nusvinn, nuscarrick)
   - **Email**: All 6 accounts (IMAP SINCE {previous_day}, filter by Date header)
   - **Matrix**: Fountain room — check for weekly plan updates only
   - **GitHub**: Elena-SamGuard PRs (duongdn account) + Precognize/development (nusken account)
   - **Google Sheets**: Task logs for all monitored spreadsheets
   - **Scrin.io**: Time tracking for John Yi project only (compare with John Yi task log, NOT total)
   - **Web**: samguard.co JS errors
   - **Redmine**: Check status of tracked tickets
   - **Trello**: Check Progress + Check Mail cards, Fountain board (scope, est vs actual, customer msgs)
7. Compare findings with the daily report — highlight only **new/changed** items
8. Complete Trello checklist items where no alerts found
9. Write the update report
10. Update `.monitoring-timelines.json` refresh timeline

## Fountain Scope Monitor

For Fountain, include:
- Weekly plan vs actual hours (from Matrix + Google Sheets)
- Capacity & runway: active scope (Not Started + In-progress only) / 86h per week
- Over-estimate tracking: tasks where actual > est, flag if still growing
- Trello board: customer comments, stuck tasks, hard-to-release cards

## Arguments

If `$ARGUMENTS` is provided, use it to filter which sources to check. Examples:
- `/daily-report-refresh slack` — only check Slack
- `/daily-report-refresh fountain` — only check Fountain (Matrix + Google Sheet + Trello)
- `/daily-report-refresh elena` — only check Elena GitHub + Redmine
- `/daily-report-refresh` (no args) — check everything

## Key Rules

- NEVER overwrite the daily report file
- Use `search.messages` for Slack (NOT `conversations.history`)
- Slack `after:` excludes named date — use `after:{day_before}` + epoch filter
- IMAP `SINCE` uses server dates — search previous day + filter by Date header
- Alert found = do NOT complete Trello item
- Scrin.io compares with John Yi task log ONLY, not TuanNT total
- 0h for unfilled days = show as "—" (not filled), not "0h"
- For over-estimate tasks, compare with previous actuals and flag if STILL GROWING
- Keep output concise — only report what's NEW since last check
