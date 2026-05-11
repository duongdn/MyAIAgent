---
name: Client website Rollbar errors are not Blake person-status alerts
description: PROD Rollbar/BugSnag errors on a client's WordPress/external site (Socalautowraps jQuery missing, etc.) are NOT person-status alerts that block the Blake (or similar) Trello checklist item — they are operational concerns reported in the daily report only.
type: feedback
---

Production Rollbar/BugSnag errors on a client's external website (e.g. Socalautowraps jQuery missing, third-party CDN regression) are NOT person-status alerts. They do NOT block the Blake (or similar developer-by-client) Trello "Check Progress" checklist item.

**Why:** User corrected on 2026-05-11. The 2026-05-11 daily report skipped Blake citing "Carrick email had Socalautowraps Rollbar #35 jQuery missing 10occ/5min". User asked "Why 'Blake' not check?" — the Rollbar email is a website operational alert (note in report) but Blake's Slack was silent (normal — adhoc client, no required cadence) and there is no missing-daily-report / 0h / auth-failure for Blake. Per `feedback_project_topics_not_alerts` and `feedback_alert_classification`, only person-status issues block Trello completion.

**How to apply:**
1. Trello "Check Progress" items track the PERSON's status (availability, log, comms), not website health.
2. Client website errors → flag in Daily Report Alerts section + email-to-owner action item, but DO NOT skip the Trello checklist item for that.
3. Blocks completion ONLY if: missing daily report (where required), 0h log without leave, auth failure on the workspace, customer-direct complaint about the dev, OR the dev is named in an outage they own.
4. Same logic applies to: Rick mail item (recurring PROD Rollbar in his inbox is a triage queue, not a Rick-completion blocker — the email was checked = Rick item ✓ complete).
5. SoCal Auto Wraps Slack silence is normal (adhoc, no required cadence) — never an alert in itself.

**Scope:** Apply to all "X by client" Trello items (Blake, Marcel, Andrew, Colin, MPFC, etc.) where Slack/Discord silence is normal and the dev does not have a daily-report cadence requirement.
