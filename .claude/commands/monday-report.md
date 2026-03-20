---
description: Monday project status report — gather metrics per project and submit to Google Form
---

# Monday Report

Gather project metrics (bugs, dev hours) and submit to the Google Form for each project in the Trello checklist.

## Trello Integration

- Config: `.trello-config.json` (api_key, token)
- Board: `O83pAyqb` (My Task)
- Card: Find by name "Report project status" (recurring card, find by name not hardcoded ID)
- After submitting each project's form, mark its checklist item as complete

## Google Form

- URL: `https://forms.gle/xyn8tjg5KZDbNQcu7`
- Submit endpoint: `https://docs.google.com/forms/d/e/1FAIpQLSc89q0aoNHP1__my0yCH3xsjnAu6Li438WEwno-bpuZ-rr2Dg/formResponse`

### Form Fields

| Field | Entry ID | Type |
|-------|----------|------|
| Project | entry.668110456 | Dropdown |
| Internal Bugs (e.g: 10) | entry.1023919065 | Short answer |
| External Bugs (e.g: 1) | entry.1445788968 | Short answer |
| Total Dev Hours (e.g: 80) | entry.713237695 | Short answer |
| Note (optional) | entry.1598310231 | Paragraph |

### Submit via curl

```bash
curl -s -X POST "https://docs.google.com/forms/d/e/1FAIpQLSc89q0aoNHP1__my0yCH3xsjnAu6Li438WEwno-bpuZ-rr2Dg/formResponse" \
  --data-urlencode "entry.668110456={project_name}" \
  --data-urlencode "entry.1023919065={internal_bugs}" \
  --data-urlencode "entry.1445788968={external_bugs}" \
  --data-urlencode "entry.713237695={total_dev_hours}" \
  --data-urlencode "entry.1598310231={note}" \
  -o /dev/null -w "%{http_code}"
```

HTTP 200 = success.

### Project Name Mapping

The dropdown value must match exactly. Use these values for each checklist project:

| Checklist Item | Form Dropdown Value |
|----------------|-------------------|
| Maddy | Maddy - Xtreme Soft Solutions |
| (add more as checklist items are defined) |

## Workflow

For each project in the checklist:

1. **Gather data** — collect internal bugs, external bugs, total dev hours from project-specific sources (JIRA, Trello, Google Sheets task logs, etc.)
2. **Confirm with user** — show gathered data, ask user to confirm or adjust before submitting
3. **Submit form** — POST to Google Form endpoint
4. **Mark Trello checklist** — mark item complete after successful submission

## Data Sources

(To be configured per project — user will provide guidance on where to get bugs/hours data)

## Rules

- Always confirm data with user before submitting to the live form
- Project name in form must match dropdown value exactly
- Submit one form per project
- Mark Trello checklist item after each successful submission
