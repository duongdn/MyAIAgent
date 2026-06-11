---
name: feedback_puppeteer_cron_tmpdir
description: Puppeteer in cron fails silently with /tmp permission errors — fix with TMPDIR=/var/tmp + crash-dumps-dir
metadata:
  type: feedback
---

Puppeteer/Chrome launched from cron (not interactive session) cannot write crash dumps to /tmp — causes silent launch failures, resulting in false "0h" (Workstream) or "sessions expired" (Upwork) in daily reports.

**Why:** Discovered Jun 11 2026. Root cause: Chrome crash-dumps write to /tmp which is restricted in cron context. Two independent failures: workstream-fetch showed LongVV 0h/unavailable; Upwork reported "sessions expired". Both were Puppeteer launch failures, not real data.

**How to apply:**
- ALL Puppeteer scripts that run in cron must include:
  ```javascript
  env: { ...process.env, DISPLAY: process.env.DISPLAY || ':1', TMPDIR: '/var/tmp' },
  args: [
    '--no-sandbox', '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--crash-dumps-dir=/var/tmp',
  ]
  ```
- Applied to: `scripts/workstream-login.js` (fixed Jun 11)
- If Workstream shows 0h/unavailable in cron run → suspect Puppeteer /tmp issue first, not real data
- If Upwork shows "sessions expired" in cron run → same cause; re-run manually to verify
