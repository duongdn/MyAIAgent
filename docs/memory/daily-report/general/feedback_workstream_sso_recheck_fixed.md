---
name: feedback_workstream_sso_recheck_fixed
description: "Workstream SSO login succeeded on recheck — token capture works with DISPLAY=:1 headless, previous timeout failures were transient SSO response timing"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 19379dbd-2cde-48be-8f3e-3148e41aa1b9
  modified: 2026-07-21T01:29:53.758Z
---

Recheck on 2026-07-21 at ~08:00 successfully captured Workstream token after the morning cron's two attempts both timed out at 90s/150s ("stuck at Clicked Sign in with SSO"). On recheck the same `DISPLAY=:1 node scripts/workstream-login.js` command completed in ~10s. Root cause: the SSO Keycloak redirect can sometimes stall on the consent page if the browser user-data dir is stale or another browser session is interfering — the failure is transient, not a permanent 2FA block as previously suspected.

**Why:** Multiple consecutive cron runs (07-15, 07-17, 07-20, 07-21 morning) all reported Workstream SSO as "needs interactive 2FA" and treated it as an unresolvable human-in-the-loop gate. This caused 5+ Trello items to stay incomplete and blocked Fountain Parts 2-3.

**How to apply:**
- Always retry Workstream login at least once at recheck time before concluding it needs human interaction
- If it fails again, wait 5 min and retry (the stale-profile theory suggests a cleanup window helps)
- NEVER write "needs interactive 2FA" in the report after only 2 failures — the morning cron has limited time, so its "stuck at SSO" assessment is provisional, not authoritative
- The token save is to `config/.workstream-config.json` — check this file's `access_token` field to confirm
