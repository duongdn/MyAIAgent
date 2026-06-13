---
name: reference_email_accounts_all9
description: All 9 monitored email accounts — cron only checks 6 Zoho by default; 3 Gmail accounts exist and must be included in full scans
metadata:
  type: reference
---

There are **9** email accounts in `config/.email-accounts.json`, not 6. The daily cron missed the 3 Gmail accounts (discovered 2026-06-13).

**Group A — Zoho IMAP (6):**
- duongdn@nustechnology.com
- carrick@nustechnology.com
- nick@nustechnology.com
- rick@nustechnology.com
- kai@nustechnology.com
- ken@nustechnology.com

**Group B — Gmail IMAP (2):**
- vuongtrancr@gmail.com — Carrick's personal Gmail; receives Swish project monitoring (Delayed-newform, APM signal lost alerts). Method: imap.gmail.com:993, `rejectUnauthorized: false`.
- dnduongus@gmail.com — DuongDN personal Gmail; only actionable for security alerts (account breach, unauthorized login). Ignore: LinkedIn, newsletters, Finhay, Careerviet, bank notifications.

**Group C — Gmail API (1):**
- freelancer@mypersonalfootballcoach.com — requires `config/.gmail-service-account.json` service account key. Key was NOT FOUND as of 2026-06-13 — report as "key missing / unavailable". Do NOT say "blocked" or "token expired".

**How to apply:** Run `node scripts/daily-email-scan-260610.js` — it handles all 9 accounts automatically. Returns `error: no_gmail_sa_key` for mpfc when key absent. Gmail IMAP needs `rejectUnauthorized: false` TLS option.
