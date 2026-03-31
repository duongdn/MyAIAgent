---
description: On-demand refresh of all monitoring sources (Slack, Discord, Email, Matrix, GitHub, etc.)
---

# Daily Report Refresh

On-demand re-scan since the last check. Generates a **separate timestamped file** — never overwrites the daily report.

**Output:** `./reports/{YYYY-MM-DD}/{HHMM}-update.md`
**Timeline:** Uses `refresh.last_run` from `config/.monitoring-timelines.json`. If stale (>1 day old), fall back to `daily_report.last_run`. After completing, update ONLY `refresh.last_run`.

---

## Quick Reference — Run by Piece

| Command | What it checks | When to use |
|---------|---------------|-------------|
| `/daily-report-refresh` | Everything since last refresh | Afternoon check, anytime |
| `/daily-report-refresh email` | 6 email accounts | New email suspected |
| `/daily-report-refresh slack` | 13 Slack workspaces | Check Slack updates |
| `/daily-report-refresh discord` | AirAgri + Bizurk | Check Discord updates |
| `/daily-report-refresh sheets` | All Google Sheets task logs | Check developer hours |
| `/daily-report-refresh scrin` | Scrin.io (TuanNT/John Yi) | Check time tracking |
| `/daily-report-refresh fountain` | Fountain 5-part (Matrix + Sheets + Trello) | Check Fountain scope |
| `/daily-report-refresh elena` | Elena GitHub PRs + deploy + Redmine | Handle new Elena PRs |
| `/daily-report-refresh trello` | Update Trello checklist items | Re-run completions |
| `/daily-report-refresh reminders` | Send Matrix task log reminders | Afternoon reminder run |

---

## Piece 1 — Email (`/daily-report-refresh email`)

Same as daily-report but window = `refresh.last_run` → now.

**Method:** IMAP SINCE `{day_before_refresh_last_run}`, filter Date header >= `refresh.last_run`

Report only NEW emails since last refresh. If nothing new → "No new emails."

---

## Piece 2 — Slack (`/daily-report-refresh slack`)

Same as daily-report but window = `refresh.last_run` → now.

**Method:** `search.messages` with `after:{day_before_refresh_cutoff}` + epoch filter for `ts > refresh_epoch`

**Also check:** Nick-GG daily report if not yet confirmed posted. Kai daily report if not yet confirmed.

Report only NEW messages. If nothing new per workspace → skip that workspace in output.

---

## Piece 3 — Discord (`/daily-report-refresh discord`)

Same as daily-report, window = `refresh.last_run` → now.

AirAgri + Bizurk only (NOT HOMIEAPP). Verify tokens before using.

---

## Piece 4 — Google Sheets (`/daily-report-refresh sheets`)

Re-check developer hours. By afternoon (≥ 13:00 local), alert on any developer with 0h and no leave note.

Compare with what the daily report already showed — only flag changes:
- New hours logged (good news)
- Still 0h at afternoon with no leave (escalate)

---

## Piece 5 — Scrin.io (`/daily-report-refresh scrin`)

Re-fetch TuanNT's today tracked hours. Compare with John Yi task log. Show delta vs morning.

---

## Piece 6 — Fountain (`/daily-report-refresh fountain`)

Full 5-part check — same as daily-report. All 5 parts mandatory.

Focus on what changed since last check:
- New W{n} actuals (devs logging hours)
- #2615, #2735, #2595 — are they still growing?
- New customer Trello comments
- Runway delta vs morning

If Matrix token fails → run `scripts/matrix-token-refresh.js` immediately. Never report as expired.

---

## Piece 7 — Elena (`/daily-report-refresh elena`)

Check for new PRs merged or opened in Elena-SamGuard-Digital-Plant since last refresh.

For each undeployed merged PR in `config/.elena-pending-actions.json`:
1. Deploy to MayBanServer
2. Update Redmine if applicable
3. Announce to Matrix "Elena - Digital Plant" room

Check Precognize for nusken PRs.

---

## Piece 8 — Trello (`/daily-report-refresh trello`)

Re-evaluate Trello checklist items based on refresh findings. Complete any items where alerts have been resolved since morning.

Note: Items already completed in morning stay completed — only update incomplete ones.

---

## Piece 9 — Reminders (`/daily-report-refresh reminders`)

Send Matrix reminders to developers still at 0h by afternoon (≥ 13:00) with no leave note.

Same developer rooms as daily-report. Skip devs already reminded today.

---

## Full Refresh (`/daily-report-refresh`)

1. Read configs, timelines, memory
2. Read today's daily report + any previous update files (know what's already reported)
3. Determine monitoring window: `refresh.last_run` → now (fall back to `daily_report.last_run` if stale)
4. Launch parallel agents: Slack + Fountain + Email+Discord+GitHub + Sheets+Scrin
5. Compare all findings with daily report — highlight only NEW/CHANGED items
6. Update Trello items where applicable
7. Write `reports/{YYYY-MM-DD}/{HHMM}-update.md`
8. Update ONLY `refresh.last_run` + `refresh.output_file` in timelines

---

## Key Rules

- NEVER overwrite the daily report file
- Only report NEW items since last check — skip anything already in the daily report
- Slack: `search.messages` only, never `conversations.history`
- Discord: AirAgri + Bizurk only (NOT HOMIEAPP)
- Matrix token fails → fix via `scripts/matrix-token-refresh.js`. Never report as expired.
- Slack session tokens fail → auto-refresh via crumb+POST. Never report as expired.
- Alert found = do NOT complete Trello item
- Scrin.io: compare with John Yi task log ONLY, not TuanNT total
- 0h for unfilled → show as "—" not "0h"
- Over-estimate tasks: flag if STILL GROWING vs previous report, not just over threshold
