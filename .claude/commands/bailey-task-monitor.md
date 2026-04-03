---
description: Bailey task monitor — check Est vs Charged sheet for unpaid released tasks and bug/overbudget issues
---

# Bailey Task Monitor

Monitor Bailey/Paturevision task log for payment and budget issues.

## Data Source

- Spreadsheet: `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`
- Sheet: `Est vs Charged` (gid=920993260)
- Script: `scripts/bailey-task-monitor.py`

## Steps

1. Run the monitoring script:
   ```bash
   python3 scripts/bailey-task-monitor.py
   ```

2. Report auto-saves to `plans/reports/bailey-task-monitor-{YYMMDD-HHMM}.md`

3. Analyze results and present a concise report with two sections:

### Section 1: Released but Not Paid
Tasks where dev status = "Tested on Live" / "Deployed on Live" / "Dev Done" but payment status doesn't contain "PAID".

For each task, note:
- Task name, developer, actual hours, charged hours
- How long it's been since release (if date info available)
- Link to Trello/Slack

### Section 2: Tasks with Bugs
Tasks where dev status contains "Has Bug".

For each task:
- Identify if **hourly** or **fixed cost** (column I)
- If fixed cost: check if **overbudget** (actual hours > estimated with buffer)
- Show overbudget amount and percentage
- Link to Trello/Slack

## Report Format

Present as a clear markdown table or bullet list. Flag critical items:
- ⚠️ Released tasks unpaid for extended periods
- ⚠️ Fixed-cost tasks that are overbudget
- Note hourly bug tasks (no budget concern, but track hours spent)
