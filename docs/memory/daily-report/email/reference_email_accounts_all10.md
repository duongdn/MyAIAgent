---
name: reference_email_accounts_all10
description: All 10 monitored email accounts — cron only checks 6 Zoho by default; 4 Gmail accounts exist and must be included in full scans
metadata: 
  node_type: memory
  type: reference
  originSessionId: 739060f2-0802-43e2-b6b8-ecd9b413a8e1
---

There are **10** email accounts in `config/.email-accounts.json`, not 6. The daily cron missed the Gmail accounts (discovered 2026-06-13, expanded 2026-07-06).

**Group A — Zoho IMAP (6):**
- duongdn@nustechnology.com
- carrick@nustechnology.com
- nick@nustechnology.com
- rick@nustechnology.com
- kai@nustechnology.com
- ken@nustechnology.com

**Group B — Gmail IMAP (3):**
- vuongtrancr@gmail.com — Carrick's personal Gmail; receives Swish project monitoring (Delayed-newform, APM signal lost alerts). Method: imap.gmail.com:993, `rejectUnauthorized: false`.
- dnduongus@gmail.com — DuongDN personal Gmail; only actionable for security alerts (account breach, unauthorized login). Ignore: LinkedIn, newsletters, Finhay, Careerviet, bank notifications.
- davidztv19@gmail.com — added 2026-07-06 for **Arthur - Meta-Stamp** project (Workstream "Crystal lang", roster DuongDN/PhucVT/TienND — see [[feedback_workstream_vs_sheets_migration_gaps]]). No filter, flag all mail. **WORKING as of 2026-07-06:** initial regular-password login failed (`Application-specific password required`); user enabled 2-Step Verification, generated an App Password, and login was verified live via `imaplib.IMAP4_SSL` (INBOX selected OK, 710 msgs). Config now stores the 16-char App Password (no spaces), same format as vuongtrancr/dnduongus. **Pattern for any future Gmail IMAP account added to this project:** always live-test login with a throwaway `imaplib` script before declaring the account added — regular passwords silently fail if 2FA is on, and App Passwords only appear in Google Account UI (or via direct link myaccount.google.com/apppasswords) once 2FA is enabled.

**Group C — Gmail API (1):**
- freelancer@mypersonalfootballcoach.com — requires `config/.gmail-service-account.json` service account key. Key was NOT FOUND as of 2026-06-13 — report as "key missing / unavailable". Do NOT say "blocked" or "token expired".

**How to apply:** Email scan script handles all 10 accounts automatically (Gmail IMAP accounts identified by `imap_server: imap.gmail.com`, no special-casing needed per-account). Returns `error: no_gmail_sa_key` for mpfc when key absent. Gmail IMAP needs `rejectUnauthorized: false` TLS option. Note: this project has accumulated many dated `daily-email-scan-YYMMDD.js` copies — check `docs/memory/daily-report/email/feedback_email_scan_stale_window_bug.md` for which logic is current before picking one.
