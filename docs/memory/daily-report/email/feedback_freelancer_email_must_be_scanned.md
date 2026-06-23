---
name: feedback_freelancer_email_must_be_scanned
description: freelancer@mypersonalfootballcoach.com is in .email-accounts.json (gmail_api:true) and MUST be included in every daily email scan.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

`freelancer@mypersonalfootballcoach.com` exists in `config/.email-accounts.json` with `gmail_api: true`. It **must appear in the email scan table** every daily report.

**Why:** On 2026-06-09, this account was omitted from the email section entirely. It contained a critical MPFC production PHP error (#45 `_get_option() on null`) that was missed until user asked "How about freelancer email???"

**How to apply:** After running email scan, verify the table includes all accounts from `.email-accounts.json`. For MPFC: production errors from this account = real alert, block Trello MPFC item. Daily Summary emails = automated, not an alert.
