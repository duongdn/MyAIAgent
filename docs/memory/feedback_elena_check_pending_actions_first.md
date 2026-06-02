---
name: feedback_elena_check_pending_actions_first
description: Elena piece MUST check config/.elena-pending-actions.json for deployed:false entries BEFORE checking GitHub open PRs — missed deploys won't show as open PRs on GitHub.
metadata:
  type: feedback
---

# Elena: check pending-actions.json FIRST

## Rule

At the START of every Elena monitoring run, read `config/.elena-pending-actions.json` and scan the `merged` array for any entry where:
- `"deployed": false` AND
- `"pending_action"` does NOT start with "DONE" AND "NOTE"

If any such entry exists → **send a Matrix alert to the Elena Digital Plant room AND deploy immediately**, before checking GitHub for new open PRs.

**Matrix room:** `!kyArBadvcbfPIpIxpD:nustechnology.com`

**Matrix message format:**
```
⚠️ Pending deploy detected: PR #NNN (branch-name, merged YYYY-MM-DD) was not deployed. Deploying now...
```

Then follow up with the deploy result in the same room.

## Why

PR #303 (redmine-78803) was merged 2026-05-29 but MayBanServer was unreachable. The deploy failed silently and the entry sat as `deployed: false` in the JSON for 4 days (May 29 → Jun 2). Because the Elena piece only queries GitHub for OPEN PRs (already merged = no longer open), this was invisible to daily monitoring. No alert was raised on Mon Jun 1 despite the pending deploy.

User feedback 2026-06-02: "sao ko có alert?" (why no alert?)

## How to apply

1. Read `.elena-pending-actions.json`
2. Filter: `merged[]` where `deployed == false` and `pending_action` not starting with "DONE" or "NOTE"
3. For each hit → send Matrix alert to `!kyArBadvcbfPIpIxpD:nustechnology.com` + deploy immediately
4. Then continue to check GitHub open PRs as normal
5. After deploying pending entries → update their `deployed: true` in the JSON

Related: [[feedback_elena_auto_deploy]]
