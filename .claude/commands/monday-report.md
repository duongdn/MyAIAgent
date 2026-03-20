---
description: Monday project status report — gather metrics per project and submit to Google Form
allowed-tools: Bash, Read, Grep, Glob, Write, Edit, AskUserQuestion, WebFetch
---

# Monday Report

Gather project metrics (bugs, dev hours) and submit to the Google Form for each project in the Trello checklist.

## Mode

By default, submit to the **TEST** form. User must pass `--live` flag to submit to the real form.

### Test Form (default)
- Submit endpoint: `https://docs.google.com/forms/d/e/1FAIpQLSdy-hZ_i5RI38lHSSBUdtDq_Fo8i4u2g-A2EN1mymLUkhQEkw/formResponse`
- Fields: entry.1071500517 (Project), entry.1372868087 (Internal Bugs), entry.1948246769 (External Bugs), entry.355613380 (Total Dev Hours), entry.1702739410 (Note)

### Live Form (with --live flag)
- Submit endpoint: `https://docs.google.com/forms/d/e/1FAIpQLSc89q0aoNHP1__my0yCH3xsjnAu6Li438WEwno-bpuZ-rr2Dg/formResponse`
- Fields: entry.668110456 (Project), entry.1023919065 (Internal Bugs), entry.1445788968 (External Bugs), entry.713237695 (Total Dev Hours), entry.1598310231 (Note)

## Trello Integration

- Config: `.trello-config.json` (api_key, token)
- Board: `O83pAyqb` (My Task)
- Card: Find by name "Report project status" (recurring card, find by name not hardcoded ID)
- After submitting each project's form, mark its checklist item as complete
- Only mark Trello in `--live` mode

## Workflow

For each project in the checklist:

1. **Gather data** — collect internal bugs, external bugs, total dev hours from project-specific sources
2. **Show data to user** — present gathered data for review
3. **Confirm** — ask user to confirm or adjust before submitting
4. **Submit form** — POST to Google Form (test or live based on flag)
5. **Mark Trello** — mark checklist item complete (only in --live mode)

### Submit via curl

```bash
# Determine form endpoint and entry IDs based on mode
# TEST mode (default):
FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLSdy-hZ_i5RI38lHSSBUdtDq_Fo8i4u2g-A2EN1mymLUkhQEkw/formResponse"
E_PROJECT="entry.1071500517"
E_INTERNAL="entry.1372868087"
E_EXTERNAL="entry.1948246769"
E_HOURS="entry.355613380"
E_NOTE="entry.1702739410"

# LIVE mode (--live flag):
FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLSc89q0aoNHP1__my0yCH3xsjnAu6Li438WEwno-bpuZ-rr2Dg/formResponse"
E_PROJECT="entry.668110456"
E_INTERNAL="entry.1023919065"
E_EXTERNAL="entry.1445788968"
E_HOURS="entry.713237695"
E_NOTE="entry.1598310231"

curl -s -X POST "$FORM_URL" \
  --data-urlencode "${E_PROJECT}={project_name}" \
  --data-urlencode "${E_INTERNAL}={internal_bugs}" \
  --data-urlencode "${E_EXTERNAL}={external_bugs}" \
  --data-urlencode "${E_HOURS}={total_dev_hours}" \
  --data-urlencode "${E_NOTE}={note}" \
  -o /dev/null -w "%{http_code}"
```

HTTP 200 = success.

## Project: Maddy

### Form Dropdown Value
- Live: `Maddy - Xtreme Soft Solutions`
- Test: `Maddy`

### Data Sources

**Internal Bugs**: Redmine
- URL: `https://redmine.nustechnology.com`
- Config: `.redmine-config.json` (url, api_key)
- Project: `maddy-extreme-soft-solutions`
- Query: tracker_id=1 (Bug), created_on = previous Mon-Sun week
- API: `GET /issues.json?project_id=maddy-extreme-soft-solutions&created_on=><{mon}|{sun}&tracker_id=1&limit=100&key={api_key}`

**External Bugs**: Slack analysis
- Workspace: "Xtreme Soft Solutions" (from `.slack-accounts.json`)
- Search messages from previous Mon-Sun week
- API: `search.messages?query=after:{sun_before}+before:{mon_after}`
- Analyze customer messages (madhuraka = client PM, anomawasala = client QA) for bug reports
- Count distinct bugs reported by customer, not internal team discussions

**Total Dev Hours**: Google Sheets task log
- Spreadsheet: `1E3zgSgSMcDWQr3q-aNlu5HuXG5lr8p3yh-Zs-Mowd58`
- Service account key: `daily-agent-490610-7eb7985b33e3.json`
- Find week sheet by checking which W-sheet's Monday date matches the reporting week
- Read row 2 col H for total hours

**Note**: Summarize key bugs/issues from the week

### Date Logic
This runs on Monday. The reporting week = previous Mon-Sun.
Example: run on Mon 2026-03-23 → report week is Mon 2026-03-16 to Sun 2026-03-22.

## Rules

- Default to TEST form — only use LIVE form when user explicitly passes --live
- Always confirm data with user before submitting
- Project name must match form dropdown value exactly
- Submit one form per project
- Only mark Trello checklist in --live mode
- Log each submission: project, values, mode (test/live), HTTP status
