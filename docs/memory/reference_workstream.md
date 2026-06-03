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

Base: `https://workstream.nustechnology.com/api`
**NOTE:** All endpoints require an extra `/api/` prefix:
- `/api/review/week?projectId={id}&date={YYYY-MM-DD}` → all member task logs for week
- `/api/time/projects?date={date}` → projects for current user
- `/api/me` → current user info

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
