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

**08-07 case — EXPIRED TOKEN, not a stall:** the morning cron reported a "session-wide outage" (3 attempts failed "no token captured", config token unchanged since 07-28). An interactive `timeout 180 env DISPLAY=:1 node scripts/workstream-login.js` at recheck 08:45 succeeded instantly and unlocked all 08-06 hours. Root cause was an expired short-lived JWT (~15 min), not an outage. The failure signature (Keycloak redirect → "no token captured") is identical whether the cause is a stall or an expired token — so an interactive re-login is the discriminator.

**Why:** Multiple consecutive cron runs (07-15, 07-17, 07-20, 07-21 morning) all reported Workstream SSO as "needs interactive 2FA" and treated it as an unresolvable human-in-the-loop gate. This caused 5+ Trello items to stay incomplete and blocked Fountain Parts 2-3. On 08-07, reporting it as an "outage" would have left all 08-06 dev hours unverified + created a false shortfall caveat.

**How to apply:**
- ALWAYS retry Workstream login at least once at recheck time before concluding it needs human interaction or reporting an "outage"
- If it fails again, wait 5 min and retry (the stale-profile theory suggests a cleanup window helps)
- NEVER write "needs interactive 2FA" or "session-wide outage" in the report after only cron failures — the morning cron has limited time, so its assessment is provisional, not authoritative. An interactive re-login succeeding = transient/expired-token, and all hours should be verified from the fresh dump and the report corrected (see 08-07 recheck).
- The token save is to `config/.workstream-config.json` — check this file's `access_token` field to confirm
