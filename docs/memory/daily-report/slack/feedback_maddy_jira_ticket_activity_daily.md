---
name: feedback_maddy_jira_ticket_activity_daily
description: Maddy JIRA ticket activity (comments, updates) MUST be checked daily — not just the weekly cross-check
metadata:
  type: feedback
---

Maddy JIRA has 20 active non-closed tickets (project LIFM2). In addition to the weekly Maddy JIRA × Workstream cross-check (`maddy-jira-tasklog-check.js`), every daily report MUST also check for **new JIRA ticket activity since last run**:

1. Query JIRA API: `POST /rest/api/3/search/jql` with `jql=project = LIFM2 AND status not in (Done, Closed, Resolved) ORDER BY updated DESC`
2. Filter tickets updated since `daily_report.last_run`
3. For each ticket with recent activity: show summary, status, assignee, updated time, and any new comments (with parsed ADF doc text)

**Why:** User explicitly asked 2026-07-29: "lưu memory, tôi cần info này daily". Maddy is the largest client project and JIRA ticket comments (from Anoma, Madhuraka, etc.) are direct customer feedback that needs daily visibility.

**How to apply:**
- Run in every daily report (full run + recheck)
- JIRA config: `config/.jira-config.json` → `instances.madhuraka` (url: madhuraka-godahewa.atlassian.net, email: kai@nustechnology.com)
- Include in `## Maddy` section under a "JIRA Ticket Activity" subsection
- Bitbucket PR comments should also be checked daily (separate API: `config/.bitbucket-config.json` → `instances.kai`, workspace `xtreme-web`, repo `rms`)

[[feedback_maddy_4part_check_mandatory_in_every_report]]
[[feedback_maddy_jira_weekly_check]]
