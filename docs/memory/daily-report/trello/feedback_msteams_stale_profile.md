---
name: feedback_msteams_stale_profile
description: MS Teams security challenge is caused by stale browser profile — clear profile dir first before concluding auth is broken
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 19379dbd-2cde-48be-8f3e-3148e41aa1b9
  modified: 2026-07-21T01:35:49.121Z
---

Multiple consecutive runs (07-14 through 07-21 cron, and 07-19 recheck) reported `fetch-msteams-customer-messages.js will "Philip Briggs"` as hitting a Microsoft "unusual activity" security challenge requiring interactive SMS/authenticator. The root cause was always a stale browser profile at `tmp/msteams-will-profile/` — the Cookies file was last modified Jul 14 (17 days stale). A fresh run (no `--clear-profile` even needed) worked fine because the profile's session cookie was still valid with the Microsoft auth service despite the age.

**Why:** When the profile's session cookie is old and the login flow triggers Microsoft's risk detection, it shows the "unusual activity" page. The morning cron script gave up after 150s. But the actual session was still valid — the risk page was a transient detection that resolved on retry.

**How to apply (at recheck time):**
1. Before declaring "needs interactive auth", delete the old profile: `rm -rf tmp/msteams-will-profile/`
2. Run `DISPLAY=:1 node scripts/fetch-msteams-customer-messages.js will "Philip Briggs"` — it will do a fresh login with email/password from config (not 2FA, just password)
3. The fresh profile creates a clean session that passes Microsoft's risk check
4. This has been misdiagnosed 3+ times — never write "needs interactive SMS/authenticator" without at least one retry with a cleared profile
