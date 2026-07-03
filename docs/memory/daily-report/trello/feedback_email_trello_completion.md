---
name: feedback_email_trello_completion
description: Complete all Check Mail Trello items once the inbox is read — content found (Rollbar/GitLab/pipeline alerts) never blocks completion, only a real fetch failure does
metadata:
  type: feedback
---

After checking all 6 email accounts, always complete the Trello "Check mail" card checklist items — one item per account.

**Why:** The email check is not considered done until the Trello items are ticked off. This was missed.

**IMPORTANT — repeated violation, read carefully:** Check Mail items = "did we check this inbox?" — ALWAYS complete them once the inbox is read, regardless of what was found inside. Finding a Redmine bug, Rollbar alert, failed GitLab pipeline, Snyk vuln, or any other content does NOT block completion. The "alert found = don't complete" rule applies to Check **Progress** items (person/dev monitoring), NOT Check Mail items. Confirmed violated again 2026-07-03 (Carrick's GitLab pipeline FAILED + Snyk, Rick's heavy Rollbar volume were left incomplete — wrong, both fetches succeeded). Still surface the content in the report's `⚠️ ALERTS SUMMARY` for visibility — just don't gate the checklist item on it.

**How to apply:**
- Find "Check mail" card by name on board `O83pAyqb`
- Get its checklist items
- Mark ALL items complete once the fetch succeeded (even 0 results): `PUT /cards/{card_id}/checkItem/{item_id}?state=complete&key=...&token=...`
- Do this at the end of the email piece, before moving on
- Only exception: could not connect to IMAP / auth failure (inbox literally not checked) — try to fix silently first (see [[feedback_never_report_token_expired]]) before leaving it open
