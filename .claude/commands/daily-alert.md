---
description: Automated alert monitoring — runs on cron, collects HIGH severity alerts, sends desktop notifications
---

# Daily Alert Monitor

Automated background alert scanner. Runs on a schedule (cron), checks all monitoring sources for **high severity issues only**, generates a brief alert report, and sends desktop notifications for critical findings.

## Output File

`./reports/{YYYY-MM-DD}/{HHMM}-alert.md`

Use current date and time (24h format, local timezone).

## Timeline

Uses the **`alert`** timeline in `config/.monitoring-timelines.json` — completely independent from `daily_report` and `refresh` timelines. Only update `alert.last_run` after completing. **Never touch** `daily_report` or `refresh` timelines.

## Instructions

1. Read `config/.monitoring-timelines.json` — use `alert.last_run` as start of monitoring window
2. Read all config files: `.slack-accounts.json`, `.discord-accounts.json`, `.email-accounts.json`, `.matrix-config.json`, `.google-docs.json`, `.scrin-config.json`, `.redmine-config.json`
3. Read memory files for rules (Slack threads, GitHub account mapping, Discord token validation, etc.)
4. Read today's daily report and any previous alert files to avoid duplicate alerts
5. For each source, fetch **new activity since `alert.last_run`** — **STRICT timestamp filtering required**:
   - **Slack**: All workspaces using `search.messages` API — look for: escalations, urgent keywords, customer complaints, failed deployments, production issues. Filter by `ts >= cutoff_epoch`.
   - **Discord**: Both accounts — look for: urgent messages, incident reports. Filter by message snowflake >= cutoff.
   - **Email**: All accounts — look for: alert subjects, server notifications, client escalations. Filter by Date header >= cutoff.
   - **Matrix**: Fountain room — look for: blocker reports, plan changes. Filter by `origin_server_ts >= cutoff_ms`.
   - **GitHub**: Elena (duongdn) + Precognize (nusken) — look for: failed CI, security alerts, rejected PRs. Filter by `created_at >= cutoff_iso`.
   - **Google Sheets**: Check for 0h logged on workdays (developer missing) — only on first scan of the day.
   - **Scrin.io**: Check Nick's hours if workday — only on first scan of the day.
   - **Redmine**: Overdue tickets, priority changes. Filter by `updated_on >= cutoff_iso`.
   - **Trello**: Customer comments, missed deadlines. **MUST filter by comment `date` >= `alert.last_run` ISO timestamp.** Use `actions` API with `since={cutoff_iso}` parameter. Stuck cards only flagged on first scan of the day.
6. Classify each finding by severity:

### Severity Classification

| Level | Criteria | Notify? |
|-------|----------|---------|
| **CRITICAL** | Production down, security breach, client escalation, data loss | YES — urgency: critical |
| **HIGH** | Failed deploy, CI broken, developer absent unannounced, blocker reported, SLA risk, **monitoring source auth failure (blind spot)** | YES — urgency: critical |
| **MEDIUM** | Customer comment, stuck card >7 days, plan mismatch, over-estimate growing | NO (report only) |
| **LOW** | Info, FYI, minor updates | NO (report only) |

7. Generate the alert report (all severities)
8. For HIGH and CRITICAL alerts, send desktop notification:

```bash
node scripts/desktop-notify.js --title "ALERT: {source}" --body "{summary}" --urgency critical
```

9. If **no** HIGH/CRITICAL alerts found, send a quiet confirmation:

```bash
node scripts/desktop-notify.js --title "Alert Scan OK" --body "No high-severity alerts ({N} sources checked)" --urgency low
```

10. Update `config/.monitoring-timelines.json` — set `alert.last_run` to current time, `alert.output_file` to the report path. **Do NOT touch** `daily_report` or `refresh` timelines.

## Alert Report Format

```markdown
# Alert Scan — {YYYY-MM-DD HH:MM}

**Window:** {last_run} → {now}
**Sources checked:** {count}
**Alerts:** {critical_count} CRITICAL, {high_count} HIGH, {medium_count} MEDIUM, {low_count} LOW

## CRITICAL / HIGH Alerts (notified)

| # | Severity | Source | Summary | Link |
|---|----------|--------|---------|------|
| 1 | CRITICAL | Slack/AirAgri | Production server 500 errors | https://... |

## MEDIUM / LOW (report only)

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | MEDIUM | Trello/Fountain | Card stuck 14 days |

## Sources Status

| Source | Status | Items |
|--------|--------|-------|
| Slack (13 ws) | OK | 2 alerts |
| Discord | OK | 0 |
| Email | OK | 1 alert |
```

## Key Rules

- Uses **`alert` timeline** — independent from daily_report and refresh
- Only HIGH/CRITICAL trigger desktop notifications
- Use `search.messages` for Slack (NOT `conversations.history`)
- **Slack session tokens (xoxc):** Amazing Meds and Equanimity use `auth_type: "session"`. These REQUIRE BOTH headers: `Authorization: Bearer {token}` AND `Cookie: d={cookie}`. If you get `invalid_auth`, check you're sending BOTH headers before flagging as expired. Verify with `auth.test` API first.
- GitHub: `duongdn` for Elena, `nusken` for Precognize (never default nuscarrick)
- Discord: ALWAYS verify tokens with `curl -H "Authorization: {token}" https://discord.com/api/v10/users/@me` before flagging expired. If 200 OK, the token works — the issue is in how you're calling the API, not the token itself. Do NOT report false auth failures.
- Matrix: Token expires every 5 min. Run `scripts/matrix-login.js --login` to get fresh token before each scan. If refresh_token also fails, do browser login.
- Always include clickable URLs for alerts
- If a source fails (auth error, timeout), log it but don't block other sources
- Keep it fast — this runs every 5-10min, optimize for speed over completeness
- Skip sources that had 0 new messages in last 3 consecutive runs (backoff)
- **STRICT TIMESTAMP RULE:** Every item MUST have its timestamp verified against `alert.last_run`. If the item's timestamp (comment date, message ts, email Date header, etc.) is BEFORE `alert.last_run`, discard it. Do NOT report stale items just because the API returned them. This is the #1 source of false alerts.

## Arguments

`$ARGUMENTS` can override behavior:
- `/daily-alert` — full scan (default)
- `/daily-alert slack` — only scan Slack
- `/daily-alert quick` — skip slow sources (email IMAP, Google Sheets), only check Slack + Discord + GitHub
