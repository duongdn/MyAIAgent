---
name: reference_google_drive_service_account_fallback
description: "Fallback method to read Google Docs/Slides/Sheets when the claude.ai Google Drive MCP connector's OAuth token is expired"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 24440950-403f-4475-b4b9-1880f7c02519
---

The `mcp__claude_ai_Google_Drive__*` tools (`read_file_content`, `get_file_metadata`, etc.) depend on a claude.ai-side OAuth session that expires periodically ("MCP server requires re-authorization"). When that happens, do NOT just tell the user to reconnect — try the service account fallback first (project has one, contra what `.claude/commands/util/google-drive.md` implies).

Fallback: service account key `config/daily-agent-490610-7eb7985b33e3.json` (email `daily-agent@daily-agent-490610.iam.gserviceaccount.com`, decrypt via `scripts/decrypt-secrets.sh` if missing). Use Drive API v3 `files().export(fileId=..., mimeType='text/plain')` with scope `https://www.googleapis.com/auth/drive.readonly` — this exports Slides/Docs as plain text and works even though the Slides API (`slides.googleapis.com`) itself is disabled on this GCP project (a direct Slides API call 403s with SERVICE_DISABLED). Python: `google.oauth2.service_account.Credentials` + `googleapiclient.discovery.build('drive','v3',...)`.

**Why:** Hit this 2026-07-08 trying to read a Slides tech-talk draft — MCP connector was expired, but the file was accessible via the service account (must be shared with the service account email, or be in a Drive the SA can see) using Drive export instead of the disabled Slides API.

**How to apply:** Any time an MCP Google Drive call fails with "requires re-authorization" or "token expired", try the service-account Drive-export fallback before asking the user to reconnect OAuth. Works for Docs/Slides (export as text/plain) and native Sheets already had this pattern (see [[project_daily_report_workflow]]-adjacent sheets scripts in `scripts/*.py`).
