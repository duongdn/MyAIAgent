---
description: "UTIL — Save, read, and search files in Google Drive via MCP tools"
---

# Util: Google Drive

Uses the `mcp__claude_ai_Google_Drive__*` MCP tools. No service account needed — authenticated via Google OAuth session.

## Save a Report to Drive

```
mcp__claude_ai_Google_Drive__create_file
  name: "daily-report-2026-05-31.md"
  content: {file content string}
  mimeType: "text/plain"          # or "text/markdown"
  parentFolderId: "{folder_id}"   # optional — omit to save to root
```

## Read a File

```
mcp__claude_ai_Google_Drive__read_file_content
  fileId: "{file_id}"
```

## Search for a File

```
mcp__claude_ai_Google_Drive__search_files
  query: "name contains 'daily-report' and mimeType = 'text/plain'"
```

## Get File Metadata

```
mcp__claude_ai_Google_Drive__get_file_metadata
  fileId: "{file_id}"
```

## Common Use Cases

| Task | Tool |
|------|------|
| Archive daily/weekly reports to Drive | `create_file` |
| Read a shared config/template from Drive | `read_file_content` |
| Find last week's report for comparison | `search_files` |
| Download a shared spreadsheet template | `download_file_content` |
| Copy a template for a new period | `copy_file` |

## Notes

- MCP tools require the Google Drive MCP server to be connected in the session
- `create_file` always creates a new file — to update, use `copy_file` + delete old, or search first
- For Google Sheets access (task logs, billing), use the service account (`config/daily-agent-490610-7eb7985b33e3.json`) instead — it's more reliable for structured data
