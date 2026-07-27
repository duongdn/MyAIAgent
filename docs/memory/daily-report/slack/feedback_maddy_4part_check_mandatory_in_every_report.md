---
name: feedback_maddy_4part_check_mandatory_in_every_report
description: "🔴🔴🔴 Maddy 4-part check MUST have its own dedicated section in EVERY daily report — same standard as Arthur. Missing entire section multiple times."
metadata:
  type: feedback
---

# 🔴 Maddy Section REQUIRED in Every Daily Report — NO EXCEPTIONS

Maddy is the LARGEST client project. It requires the SAME 4-part depth as Arthur:
1. Task log hours (Friday on Monday, from WS Maddy project `cmpqc1v7v00ahtk1vs1817xt8`)
2. Kai daily report check (CONDITIONAL on WS Maddy hours)
3. JIRA cross-check (`maddy-jira-tasklog-check.js`)
4. Bitbucket PR status

This section has been **completely missing from reports** multiple times because:
- Cron run treats it as a subsection of "Sheets — Maddy JIRA" (hidden inside Sheets table)
- Recheck overwrites the Sheets section with new data and loses the Maddy subsection
- There's no validation that the section exists before commit/push

## Required Fix — Pre-Commit Validation (MUST RUN BEFORE EVERY COMMIT)

```bash
# Before ANY git commit of a daily report, run:
grep -q "## Maddy" reports/YYYY-MM-DD/daily-report.md || {
  echo "🔴 MISSING: Maddy section not found in report!"
  echo "   Add Maddy 4-part check section before committing."
  exit 1
}

# Also check ALL mandatory sections:
for section in "## Email" "## Slack" "## Discord" "## Sheets/Workstream" "## Fountain" "## Elena" "## Matrix" "## Maddy" "## Arthur" "## Performance" "## Reminders"; do
  grep -q "$section" reports/YYYY-MM-DD/daily-report.md || echo "  MISSING: $section"
done
```

## Section Template

```markdown
## Maddy — W{n} — {HH:MM} (+07:00)

### 1. Task Log Hours (Fri {date}, last workday)
| Developer | Fri | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV | Xh | Yh | OK / ⚠️ under 16h/week |
| Kai | Xh | Yh | Conditional gate |

### 2. Kai Daily Report Check
- WS Maddy hours: {X}h → {check or skip}
- Xtreme Slack: {present/absent}
- **Conclusion:** {alert or OK}

### 3. JIRA Cross-check
```
{script output}
```

### 4. Bitbucket PR Status
{PRs if any}
```

**If any of the 4 parts is missing → the Maddy section is INCOMPLETE. Do NOT commit/push until ALL 4 parts are present.**

[[feedback_monday_must_use_friday_data]]
[[feedback_maddy_four_part_check_mandatory]]
