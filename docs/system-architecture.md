# System Architecture — My AI Agent

## Overview

Node.js monorepo running Claude Code CLI for automated daily monitoring across 10+ client projects.
Web dashboard + deployed services on mpfc server (Apache2 reverse-proxy, systemd).

## Services deployed on mpfc (142.93.46.109)

| Service | Port | Domain | Auth | systemd unit |
|---------|------|--------|------|-------------|
| Main dashboard | 3334 | dailyagent.mypersonalfootballcoach.com | Basic Auth (.htpasswd) | mydailyagent-web |
| Quantification | 3335 | quantification.youragentstore.net | Basic Auth (.htpasswd-quantification) | quantification-web |
| Other app | 3333 | — | — | — |

## Key directories

```
/var/www/MyDailyAgent/
├── web/                    # Main dashboard (Express, SSE streaming of claude -p)
├── web-quantification/     # Finance quantification (direct script, no agent)
├── scripts/                # Shared utility scripts
├── .claude/commands/me/    # Slash command definitions
├── config/                 # Encrypted configs + tracked state files
└── reports/                # Generated daily/weekly reports
```

## Key dependencies

- Node.js v22.20.0
- Express (already in shared node_modules)
- googleapis (Google Sheets API via service account)
- Apache2 (reverse proxy with Let's Encrypt SSL)
- certbot (SSL certificate renewal)

## Cron jobs (mpfc, UTC)

- 23:05 — daily-report
- 21:05 — news-digest  
- 19:05 Thu — bailey-monitor
- 17:30 — session-health
- */2h — matrix-token-refresh

## Data sources

| Source | Type | Auth |
|--------|------|------|
| Slack (13 workspaces) | search.messages API | config/.slack-accounts.json |
| Discord (2 servers) | Gateway/API | config/.discord-accounts.json |
| Email (10 accounts) | IMAP | config/.email-accounts.json |
| Google Sheets | Sheets API | config/daily-agent-490610-*.json |
| Trello | REST API | config/.trello-config.json |
| GitHub | gh CLI (SSH) | ~/.ssh/ keys |
| Matrix/Element | REST API | config/.matrix-config.json |
| Scrin.io | REST API | config/.scrin-config.json |
| Redmine | REST API | config/.redmine-config.json |
| JIRA | REST API | config/.jira-config.json |
| cafef.vn | Public JSON API | none |
| vietstock.vn | Public POST API | none |
