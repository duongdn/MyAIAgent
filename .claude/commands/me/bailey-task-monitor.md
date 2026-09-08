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

1. Fetch fresh Workstream actual hours first (script report alone often shows "no WS data" — see [[feedback_task_log_fallback_removed]]):
   ```bash
   node scripts/workstream-fetch-speedventory-task-actuals.js
   ```
   Use this actual-hours data to fill in tasks the script report couldn't match.

2. Run the monitoring script:
   ```bash
   python3 scripts/bailey-task-monitor.py
   ```

3. Report auto-saves to `plans/reports/bailey-task-monitor-{YYMMDD-HHMM}.md`

4. If the user references a Matrix room (payment discussion thread), read it for context — team decisions on what to hold back vs request, who said what — before writing the report:
   ```bash
   TOKEN=$(python3 -c "import json;print(json.load(open('config/.matrix-config.json'))['access_token'])")
   curl -s "https://matrix.nustechnology.com/_matrix/client/v3/rooms/<room_id>/messages?dir=b&limit=50" -H "Authorization: Bearer $TOKEN"
   ```
   Read the full thread chronologically (reverse the chunk) — don't rely on truncated previews for the last message.

5. Analyze results and present a concise report with these sections:

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

### Section 3: High-Hour Hourly Tasks In Progress (for partial-payment consideration)
When asked to look at requesting partial payment upfront on hourly work-in-progress:
- List hourly tasks (not yet fully paid) sorted by actual hours descending, using fresh WS actuals from step 1
- Mark each: request now / hold back (not done yet, low priority, or per team decision from Matrix context)
- Cross-check against any draft payment-request list already discussed in the Matrix room — flag items the team said were missing

## Report Format

Present as a clear markdown table or bullet list. Flag critical items:
- ⚠️ Released tasks unpaid for extended periods
- ⚠️ Fixed-cost tasks that are overbudget
- Note hourly bug tasks (no budget concern, but track hours spent)
