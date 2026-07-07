---
name: feedback_davidztv19_new_account_unwired
description: davidztv19@gmail.com (Arthur/Meta-Stamp) added to config 2026-07-06 but never wired into the cron email scan script
metadata:
  type: feedback
---

`davidztv19@gmail.com` is registered in `config/.email-accounts.json` (10 accounts total) but `scripts/daily-email-scan-260703.js` (the script cron actually runs) only checks 9 — this account is silently skipped every cron run.

**Why:** Found 2026-07-07 during a daily-report recheck — the account existed in config since 2026-07-06 but the cron report's Email table never listed it. Direct IMAP check found real project mail (Meta-Stamp POC asset sharing, infra setup) that had never been surfaced. Same class of bug as [[feedback_solid_code_new_workspace_unwired]] (Slack) — adding an account to config alone does not make cron pick it up if the scan script hardcodes its account list.

**How to apply:** When a new email/Slack/Discord account is added to its config file, immediately verify it's also referenced in the actual script cron runs (grep the script for the new account's identifier) — don't assume config presence = coverage. Add `davidztv19@gmail.com` to `daily-email-scan-260703.js`'s account list.
