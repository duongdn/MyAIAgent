---
description: READ-ONLY intraday alert scan for MyDailyAssistant — same sources/rules as daily-report, returns open alerts as JSON (no Trello writes, no messages)
---

# Assistant Alert Scan (read-only)

Called every ~2h by `scripts/assistant/alert-cycle.js` via `claude -p` with a JSON schema. Your final answer IS the JSON.

## 🔴 HARD RULES — READ-ONLY
- NEVER write Trello, NEVER send any message (Matrix/Slack/WhatsApp/Zalo/Email/Telegram), NEVER run `--send-reminder`, NEVER touch `config/.monitoring-timelines.json`, never edit any file except under `tmp/`.
- Skip Piece 8 (Trello writes), Piece 9 (Reminders), Piece 11 write steps, Piece 15.
- Fetch scripts that only READ are fine (`slack-scan.js`, `email-scan.js`, `discord-monitor.js`, `fetch-matrix-daily.js`, `slack-fetch-ohcleo.js`, `workstream-fetch-project-week.js`, `upwork-room-messages.js`, `whatsapp-monitor.js`, `zalo-monitor.js`, `newrelic-fetch-performance.js`, Rollbar/Gmail API readers). Upwork: headless only (`env -u DISPLAY`).

## Steps
1. `/util:read-memory` for `daily-report` (all sections). Apply every rule exactly as daily-report does (ignore list / paused projects, holding reply = answered, project dev topics ≠ alerts, customer direct ask gate, Discord only AirAgri+Bizurk, leave plan before 0h, etc.).
2. Read today's `reports/{YYYY-MM-DD}/daily-report.md` (⚠️ ALERTS SUMMARY + struck-through items = resolved) and any `*-update.md` from today.
3. Window: from `{since}` (given in the prompt) to now. Re-scan per `.claude/commands/me/daily-report.md` Pieces 1, 2, 3, 4, 6, 7, 10, 12, 13, 14, 16, 17 + Upwork rooms — new activity only, plus re-check whether each still-open alert from step 2 / `{open_alerts}` got answered/resolved.
4. Output ALL alerts that are currently OPEN (need DuongDN or the team to act), plus alerts from `{open_alerts}` that are now resolved (status `resolved`, with what resolved them).

## Output (JSON schema enforced)
`alerts[]`: `key` (stable kebab id — REUSE the key from `{open_alerts}` for the same issue), `project`, `source`, `severity` (high|medium|low), `title` (≤90 chars, Vietnamese ok), `detail` (2–4 sentences: who/what/when VN time, what's needed), `link` (direct msg/card URL or ""), `status` (open|resolved), `suggested_action` (1 sentence: what DuongDN should do / reply draft idea).
Not alerts: things only FYI, team chatter, already answered, ignore-list items.
