---
name: reference_workstream
description: Workstream (workstream.nustechnology.com) — internal time tracking for Maddy and Rebecca projects. Scripts, API, project IDs.
metadata:
  type: reference
---

# Workstream — workstream.nustechnology.com

Internal task-log system running parallel to Google Sheets for **Maddy** and **Rebecca** projects.

## Projects

| Key | Workstream name | Client | Main devs | Project ID |
|-----|----------------|--------|-----------|-----------|
| maddy | Xtreme Soft Solutions | Maddy | LongVV (Long Vo), LuHo | `cmpqc1v7v00ahtk1vs1817xt8` |
| rebecca | MissSwimwear | Rebecca Pechey | TuanNT (Tuan Nguyen) | `cmpqcflkx00litk1vic3vki6j` |

## Scripts

```bash
# Login (run once / when token expires)
DISPLAY=:1 node scripts/workstream-login.js

# Fetch week data (both projects)
node scripts/workstream-fetch-project-week.js [YYYY-MM-DD] [maddy|rebecca]
```

## Config

`config/.workstream-config.json` (encrypted, in decrypt-secrets.sh)
- `access_token` — Keycloak Bearer token (auto-refreshed by login script)
- `api_base` — `https://workstream.nustechnology.com/api`
- `projects` — project IDs for maddy/rebecca

## API

Base: `https://workstream.nustechnology.com/api` (this already includes `/api` — do NOT append another `/api/` prefix, it 404s)
- `{api_base}/review/week?projectId={id}&date={YYYY-MM-DD}` → all member task logs for week
- `{api_base}/time/projects?date={date}` → projects for current user
- `{api_base}/me` → current user info

**CORRECTED 2026-06-18:** `workstream-login.js` and `workstream-fetch-project-week.js` both had a double `/api/api/` bug (e.g. called `config.api_base + '/api/me'` when `api_base` already ends in `/api`) — every call 404'd, so `ensureToken()` always thought the token was expired and looped into re-login, which then ALSO verified with the same double-prefixed path and failed. This silently produced false "Workstream unavailable / login failed" in daily reports (e.g. LongVV "0h, Workstream login failed" on 2026-06-18 cron run was actually just this bug — the token was valid the whole time, confirmed by calling `{api_base}/me` directly → 200 OK). Fixed both scripts to use the single-prefix path. If "login failed" or "token expired" shows up for Workstream again, check for re-introduction of a double `/api/` prefix before assuming a real auth issue.

## Auth

Keycloak SSO: `https://auth.nustechnology.com/realms/main`
- Only `authorization_code` flow supported (no password/device grant for `workstream` client)
- Login opens browser on DISPLAY :1, SSO auto-completes (same realm as Matrix)
- Token valid for ~few hours, auto-refreshed on 401

## Integration

Use in daily/weekly/Monday reports alongside Google Sheets:
- `missingReportDays` → alert if weekday with no client report
- `weekTotal` → actual hours (compare with Sheets for consistency)
- `weekCharged` → billed hours (compare with Upwork)
