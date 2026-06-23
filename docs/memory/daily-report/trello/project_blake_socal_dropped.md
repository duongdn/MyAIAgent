---
name: Blake / SoCal Auto Wraps dropped from monitoring
description: As of 2026-05-11 we no longer work on the SoCal Auto Wraps project. Drop Blake from Trello "Check Progress" checklist, drop SoCal from Slack monitoring, and ignore Socalautowraps Rollbar in Carrick mailbox going forward.
type: project
---

As of **2026-05-11**, NUS no longer works on the SoCal Auto Wraps project. The "Blake" item has been removed from all Trello "Check Progress" cards on board O83pAyqb.

**Why:** User instructed on 2026-05-11 ("Remove Blake, we didn't work on this project anymore") after the daily report skipped Blake citing a Socalautowraps Rollbar #35 jQuery error.

**How to apply:**
1. **Trello:** Do NOT recreate the "Blake" item on Check Progress. If recurring template re-adds it, remove again and update the template.
2. **Slack:** Drop `socal` workspace from the daily report Slack scan rotation. Remove from the Quick Reference table and `/daily-report slack socal` arg. (Configuration cleanup may still be needed in the daily-report skill — track separately.)
3. **Email/Carrick:** Socalautowraps Rollbar/BugSnag emails in carrick@ inbox = INFO/ignore — not our project anymore. Do not flag as alerts. Do not list under "Action items".
4. **`feedback_blake_rollbar_not_person_alert.md`** can stay as a general principle (per-client website errors ≠ person-status alert), but the SoCal-specific example is now moot.
5. If config files (`.slack-accounts.json` socal entry) still reference SoCal, leave decommission to a follow-up cleanup; do not break existing reports during the transition.
