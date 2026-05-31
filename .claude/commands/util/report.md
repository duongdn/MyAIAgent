---
description: "UTIL — Report file output conventions for all monitoring skills"
---

# Util: Report Output

## File Location

All report files go to: `reports/{YYYY-MM-DD}/`  
Never use `plans/reports/` for monitoring output.

## Naming Pattern

| Type | Filename |
|------|----------|
| Daily report | `daily-report.md` (single file per day, append sections) |
| Refresh / on-demand | `{HHMM}-update.md` (timestamped, never overwrite daily) |
| Alert scan | `{HHMM}-alert.md` |
| Server monitor | `{HHMM}-server-monitor.md` |
| Bailey monitor | `{HHMM}-bailey-monitor.md` |
| Money report | `{HHMM}-money-{type}.md` |
| Tax check | `tax-check.md` |
| CDF monitor | `{HHMM}-cdf-monitor.md` |

## Append Pattern (daily-report, update files)

Each new piece appends a timestamped section — never overwrites prior sections:

```markdown
## {Piece Name} [{scope}] — {HH:MM} (+07:00)
{content}
```

Example: `## Slack [baamboozle] — 09:14 (+07:00)`

## Rules

- Create the `reports/{YYYY-MM-DD}/` directory if it doesn't exist
- Timestamps always use `+07:00` (Vietnam ICT, UTC+7)
- Unfilled hours → show as `—`, not `0h`
- Always include clickable URLs for alerts and Trello cards
