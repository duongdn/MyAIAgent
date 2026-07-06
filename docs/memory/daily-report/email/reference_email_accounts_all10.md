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
- davidztv19@gmail.com — added 2026-07-06 for **Arthur - Meta-Stamp** project (Workstream "Crystal lang", roster DuongDN/PhucVT/TienND — see [[feedback_workstream_vs_sheets_migration_gaps]]). No filter, flag all mail. **CONFIRMED BROKEN as of 2026-07-06:** live IMAP login test returned `Application-specific password required` — the stored value is the regular Google account password, not an App Password. Google won't show the App Passwords option until 2-Step Verification is enabled on that account (user checked, not enabled yet — "ko thấy app"). **This is a known pending setup gap, not a monitoring bug — do NOT flag it as invalid_auth needing investigation each run; just skip/note "pending App Password setup" until the user provides one.** Once user enables 2FA + generates an App Password, swap it into `config/.email-accounts.json` and re-test with a plain `imaplib.IMAP4_SSL` login before trusting the account is live.

**Group C — Gmail API (1):**
- freelancer@mypersonalfootballcoach.com — requires `config/.gmail-service-account.json` service account key. Key was NOT FOUND as of 2026-06-13 — report as "key missing / unavailable". Do NOT say "blocked" or "token expired".

**How to apply:** Email scan script handles all 10 accounts automatically (Gmail IMAP accounts identified by `imap_server: imap.gmail.com`, no special-casing needed per-account). Returns `error: no_gmail_sa_key` for mpfc when key absent. Gmail IMAP needs `rejectUnauthorized: false` TLS option. Note: this project has accumulated many dated `daily-email-scan-YYMMDD.js` copies — check `docs/memory/daily-report/email/feedback_email_scan_stale_window_bug.md` for which logic is current before picking one.
