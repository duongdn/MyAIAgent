---
name: Alert cron system setup and gotchas
description: Daily alert cron runs every 30 min via system crontab, with rate-limit detection, Matrix refresh, and env requirements
type: project
---

Alert cron system: `*/30 * * * 1-5` in system crontab runs `scripts/daily-alert-cron.sh`.

**Why:** Automated monitoring for HIGH/CRITICAL issues across all sources (Slack, Discord, Email, GitHub, Matrix, Redmine).

**How to apply:**
- Cron script requires these env exports: `PATH` (with nvm node + ~/.local/bin), `DISPLAY=:1`, `DBUS_SESSION_BUS_ADDRESS`, `XDG_RUNTIME_DIR`
- `claude -p "/daily-alert"` is non-interactive mode — needs `.claude/settings.local.json` with pre-approved permissions for all tools (Bash, Read, Write, Edit, Glob, Grep)
- Rate-limit detection: if output contains "hit your limit", notifies once then silently skips subsequent runs until quota resets
- Lock file `/tmp/daily-alert.lock` prevents concurrent runs (1800s timeout)
- Matrix token refresh runs before each scan
- 30 min interval (was 10 min, too short for a full scan cycle + API quota)
- Each `claude -p` run consumes significant API quota — be aware of daily limits
