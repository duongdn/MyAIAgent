---
name: project_performance_piece_added
description: New Relic APM performance monitoring added as Piece 14 to me:daily-report, config already exists for OhCleo + MPFC
metadata:
  type: project
---

Added `/daily-report performance [project]` (Piece 14) to `.claude/commands/me/daily-report.md` on 2026-07-08, per user request to add project performance monitoring, starting with OhCleo. Script: `scripts/newrelic-fetch-performance.js`, queries New Relic NerdGraph (GraphQL/NRQL) for apdex, avg response time, error rate, throughput, top errors, slowest transactions.

**Config already existed** before this build — found in an earlier Cline-OhCleo Claude session (`~/.claude/projects/-home-nus-projects-Cline-OhCleo-code*`), user had already pasted a New Relic User API Key there which got saved into this project's `config/` and pre-wired into `.gitignore` + `scripts/encrypt-secrets.sh` + `scripts/decrypt-secrets.sh`:
- `config/.newrelic-ohcleo-config.json` — OhCleo backend API, account 8174869, app `ohcleo-backend-api` (staging: `ohcleo-backend-api-staging`)
- `config/.newrelic-config.json` — MyPersonalFootballCoach, account 3457746, app `MPFC-live2`

**Why:** User said "tôi có bỏ newrelic key mà ta" (I think I already put a New Relic key) — check session history before asking user to resend credentials that may already be sitting in config.
**How to apply:** Before asking user for API keys/credentials for a new monitoring integration, grep `~/.claude/projects/-home-nus-projects-*` session transcripts (jsonl files) for the service name — user has a pattern of pasting keys directly into other projects' Claude sessions (e.g. Cline-OhCleo) which then get relayed/saved into My-AI-Agent's config. Also always check `config/*.json` in this repo directly first — keys may already be there.

Piece 14 is informational-only (no Trello gate yet), not part of Full Run by default. First live test 2026-07-08 found OhCleo has 2 slow endpoints (MediaRecommendsView.get ~19.8s, HomeMediasView.get ~17.8s, both >>5s threshold) — worth surfacing to user, not yet actioned. MPFC apdex 0.57 (poor, <0.7 threshold) — also worth surfacing.

To add a new project: drop `config/.newrelic-{project}-config.json` (fields: `user_api_key`, `account_id`, `app_name`, optional `app_name_staging`, `license_key`), add to `.gitignore` + encrypt/decrypt scripts, add one line to `PROJECT_CONFIGS` in `scripts/newrelic-fetch-performance.js`.
