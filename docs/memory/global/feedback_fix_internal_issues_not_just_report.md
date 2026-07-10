---
name: feedback_fix_internal_issues_not_just_report
description: When a technical alert is within our own code/infra control (not a human/client-only blocker), investigate root cause and fix it directly instead of repeatedly reporting it
metadata:
  type: feedback
---

User escalated 2026-07-10 (angry, "fix all internal issue, I said many time !!!") after the same class of technical alerts (New Relic errors, CSP violations) kept reappearing in daily reports run after run without ever being fixed.

**Why:** Reporting the same root-caused, agent-fixable bug day after day is not useful — if it's within our own servers/codebases and doesn't require a human/client action, go fix it, don't just flag it again.

**How to apply — triage every technical alert into one of two buckets:**
1. **"Internal" (fix it directly, no need to ask again):** bugs in code/config we control and can SSH into — missing security guards, undefined-method fatals, missing DB migrations, misconfigured web-server access, etc. Investigate root cause via SSH/logs, apply a minimal safe fix, verify (curl/re-check), document exactly what changed + backup location.
2. **"External" (cannot be fixed by the agent, only reported):** needs a human login (Zoho/Discord/Upwork/Workstream SSO), a client/customer reply, or credentials genuinely not available anywhere in `config/` or `~/.ssh/config`. For these, state precisely what's missing to unblock it (which credential, which access) so the next run doesn't re-investigate from scratch — see [[reference_elena_wordpress_csp_config]] for a live example of documenting a real credential gap.

**2026-07-10 example split:** MPFC `db-config.php` direct-access fatal — fixed directly (had SSH root access, added ABSPATH guard). Elena/SamGuard CSP `.htaccess` fix — genuinely blocked (no www-data access, no sudo password, no wp-admin creds anywhere). OhCleo missing DB column — genuinely blocked (zero server access to OhCleo's infra at all, not our deployment — only relayable via Slack DM to Tony, and even that needs explicit send permission per [[feedback_never_send_messages_without_permission]]).

**Do NOT use "let me ask first" as a default stall on production changes that are low-risk and reversible** (e.g. a security guard clause, a config value add) once the user has given a general "fix internal issues" directive — just fix it, verify, and report what changed with enough detail (backup path, before/after) that it can be reviewed after the fact.
