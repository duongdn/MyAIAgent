---
name: Update ALL related sections when information changes
description: When new info changes an alert/status, update every section that references it — not just the one being discussed
type: feedback
---

When new information changes the severity or status of an issue, update ALL related sections in the report — not just the section currently being discussed. For example, if a Slack alert gets a partial fix, update BOTH the Slack detail section AND the Critical Alerts Summary severity/description.

**Why:** User had to manually point out that Generator SMTP was still listed as HIGH in Critical Alerts after I already updated the Slack section with Carrick's staging deploy. "After a feedback, you never revert back the relative line... this is terrible behavior."
**How to apply:** After any correction or new info, scan the entire report for all mentions of that issue (detail sections, alert summary, unresolved questions, checklist) and update them all in one pass.
