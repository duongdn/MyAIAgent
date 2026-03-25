---
description: Morning daily report — full automated scan of all monitoring sources
---

# Daily Report

Full morning scan across all monitoring sources. Generates the main daily report for today. Run once per morning.

## Output File

`./reports/{YYYY-MM-DD}/daily-report.md`

Use today's date. If the file already exists, append a new section with the current timestamp rather than overwriting.

## Instructions

1. Read workflow from `./docs/daily-report-workflow.md`
2. Read all config files: `config/.slack-accounts.json`, `config/.discord-accounts.json`, `config/.email-accounts.json`, `config/.matrix-config.json`, `config/.google-docs.json`, `config/.scrin-config.json`, `config/.redmine-config.json`, `config/.trello-config.json`, `config/.elena-pending-actions.json`
3. Read memory files for rules (Slack threads, GitHub account mapping, Discord token validation, Nick disambiguation, etc.)
4. Read `config/.monitoring-timelines.json` — use `daily_report.last_run` as the start of the monitoring window

## Sources to Check

Run all sources. Do NOT ask the user for input on any source.

5. **Email** — All 6 accounts in `.email-accounts.json`. IMAP `SINCE {previous_day}`, filter by Date header >= `daily_report.last_run`. Complete Trello "Check Mail" card items after each account.

6. **Slack** — All 13 workspaces via `search.messages` with `after:{day_before_cutoff}` + epoch filter. For Amazing Meds and Equanimity (xoxc/xoxd tokens), refresh session before fetching. See Trello "Check Progress" mappings in workflow for per-workspace completion rules.

7. **Discord** — nusvinn (AirAgri, HOMIEAPP) + nuscarrick (Bizurk). Verify tokens with curl before reporting expired. If 200 OK, token works.

8. **Google Docs** — All 10 spreadsheets. Use Summary tab W{n} to find correct week tab. Check per-developer daily hours. See workflow for full developer/project/rule list. Flag 0h on workdays unless confirmed leave ("Nghỉ cả ngày" = OK, "Nghỉ nửa ngày" = 4h min OK).

9. **Scrin.io** — Login + v2 API (john yi, ID 266977, employee 453601). Compare with TuanNT Google Docs task log. Hours OK if task log <= Scrin.io.

10. **Daily Report Checks** — Kai in Xtreme Soft DM, Nick (Global Grazing) in #maintenance channel (NOT TuanNT), Jeff & Vinn in AirAgri Discord.

11. **Matrix/Element** — Fetch Fountain room latest weekly plan message. Extract per-dev plan hours. Compare with Fountain Summary tab W{n} actuals. Output plan vs actual table. Refresh token if expired (`scripts/matrix-login.js --login` if refresh also fails).

12. **GitHub PRs** — Elena-SamGuard (duongdn account): review + merge + deploy + Redmine update. Precognize/development (nusken account): check nusken PRs. Never use nuscarrick for these repos.

13. **Redmine** — Update ticket status after any deploys. Config in `.redmine-config.json`.

14. **Trello** — Find "Check Progress" and "Check Mail" cards by NAME (not ID, they change daily). Complete checklist items where no alerts found. For Fountain: mandatory 5-part check (Matrix plan, task log actuals, plan vs actual table, capacity & runway, over-estimate tracking) — complete only if all 5 clean.

## Post-Report Actions

15. **Task log reminders** — For any developer with 0h logged on a workday and NOT on confirmed leave, send Matrix reminder:
    `"Hi {name}, task log for {date} is missing (0h logged). Please update when you can. Thanks!"`
    Send to their Matrix room (see Developer Matrix Rooms table in workflow).

16. **Update timelines** — After completing ALL sources, update `config/.monitoring-timelines.json`:
    - Set `daily_report.last_run` to current time, `daily_report.output_file` to the report path
    - Also advance `alert.last_run` to the same time (prevents re-scanning on next alert cron)
    - Do NOT touch `refresh` timeline

## Report Format

```markdown
# Daily Report — {YYYY-MM-DD HH:MM}

**Window:** {daily_report.last_run} → {now}

## Alerts

| Severity | Source | Summary | Link |
|----------|--------|---------|------|
| HIGH | Slack/Generator | KhanhHH absent unannounced | — |

## Source Summary

| Source | Status | Key Findings |
|--------|--------|--------------|
| Email (6) | OK | 2 new, nothing notable |
| Slack (13) | OK | 5 messages across 3 ws |
| Discord | OK | Vinn daily report received |
| Google Docs | ⚠️ | LongVV 6h (expected 8h) |
| Scrin.io | OK | TuanNT 8h ✓ |
| Daily checks | OK | Kai ✓, Nick-GG ✓, Vinn ✓ |
| Matrix | OK | Fountain plan fetched |
| GitHub | OK | 1 PR merged (Elena) |
| Redmine | OK | DP-123 → Deployed |
| Trello | ✓ | 14/15 items completed |

## Fountain

**Week plan vs actual:**

| Dev | Plan | Actual | Status |
|-----|------|--------|--------|
| ViTHT | 40h | 38h | ✓ |
| ThinhT | 40h | 42h | ⚠️ over |
| VuTQ | 32h | 30h | ✓ |
| PhatDLT (QC) | 16h | 14h | ✓ |
| HungPN (QC) | 8h | 8h | ✓ |

**Capacity & runway:** ...
**Over-estimate tasks:** ...

## Trello Status

Items NOT completed (with reason):
- Fountain → over-estimate task #2595 still growing

## Task Log Reminders Sent

- PhucVT: 0h on 2026-03-25 (no leave record) → reminder sent
```

## Key Rules

- No manual input — run all checks automatically
- Use `search.messages` for Slack (NOT `conversations.history`)
- GitHub: `duongdn` for Elena, `nusken` for Precognize (never nuscarrick)
- Discord: verify tokens with curl before flagging expired
- Matrix token expires every 5 min — refresh before calling
- Alert found = do NOT complete Trello item, flag in report
- Always include clickable URLs for alerts
- Never conflate Nick (Global Grazing) with Nick/TuanNT (Amazing Meds)
- **STRICT TIMESTAMP RULE:** Discard any item with timestamp before `daily_report.last_run`

## Arguments

`$ARGUMENTS` filters sources:
- `/daily-report` — full scan (default)
- `/daily-report slack` — only Slack
- `/daily-report fountain` — only Fountain (Matrix + Google Sheet + Trello)
- `/daily-report elena` — only Elena GitHub + Redmine
