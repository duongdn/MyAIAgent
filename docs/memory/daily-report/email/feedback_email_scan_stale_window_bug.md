---
name: feedback_email_scan_stale_window_bug
description: daily-email-scan-260610.js has a hardcoded stale window + truncation bug, silently returns wrong data
metadata:
  type: feedback
---

`scripts/daily-email-scan-260610.js` has a hardcoded `WINDOW_START=2026-06-09` plus a `subjects.slice(0,20)` truncation-after-ascending-UID bug — running it as the skill instructs silently returned June data for 7/9 accounts (0 results in the real window) on 2026-07-03.

**Why:** discovered via raw JSON inspection — dates capped ~June 24-30 despite `count:50` requested. `daily-email-scan-260622.js` already has both fixes (dynamic window + Gmail TLS `rejectUnauthorized:false`) but wasn't made canonical.

**How to apply:** before trusting `daily-email-scan-260610.js` output, verify returned dates actually fall in the requested window. Prefer building/using a corrected script based on `260622.js`'s logic (or the newest dated variant) with today's window computed dynamically. Long-term fix: consolidate to one canonical non-dated `email-scan.js`, same pattern as [[feedback_no_dated_scan_scripts]] for sheets.
