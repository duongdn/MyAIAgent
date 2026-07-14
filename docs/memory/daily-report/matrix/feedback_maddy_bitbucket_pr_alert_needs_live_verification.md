---
name: feedback_maddy_bitbucket_pr_alert_needs_live_verification
description: "Maddy Bitbucket-PR-backlog alerts must be re-verified live against Bitbucket+Jira every time, not carried forward from a previously-posted claim — count/severity/age can all be wrong."
metadata:
  node_type: memory
  type: feedback
---

**2026-07-14 incident:** A prior report's Alert #3 claimed "3 PR Bitbucket Critical/High tồn đọng 18-37 ngày (Kai chưa fix)" — this text had itself been copy-pasted into the Maddy Matrix room (`!bvdwOOxprsKJBTjSeQ:nustechnology.com`) by DuongDN on 2026-07-13, then carried forward into the next day's report unverified. User flagged it: "Check Matrix Maddy room, có info sai lệch" (there's incorrect info).

**Live re-verification found the claim was wrong on every axis:**
- Bitbucket (`xtreme-web/rms` repo, via `config/.bitbucket-config.json` kai instance): 8 open PRs, all authored by Kai, ages 4–410 days.
- Jira priority cross-check (linked LIFM2-xxx tickets): only **1** PR is genuinely Highest priority — LIFM2-409 (PR #481, "Import Shopify payouts") — and it's **84 days old**, far worse than "18-37 days."
- The PRs actually in the 18-37-day range (#509/21d LIFM2-428, #510/18d LIFM2-446) are **Medium** priority, not Critical/High.
- Two more Medium-priority PRs are even older (75-76 days, #485/#486) and were never flagged at all under the "3 PRs" framing.
- One PR (#235/LIFM2-285) is 410 days old but explicitly marked [ON HOLD] in its title — correctly excluded from urgency, not evidence the "3" count was otherwise right.

**Why this matters:** the original alert undercounted severity in one direction (called Medium-priority PRs "Critical/High") and completely missed the actual worst offender (84-day Highest-priority PR wasn't mentioned at all). A stale/inflated-but-also-incomplete alert is arguably worse than no alert — it misdirects urgency to the wrong tickets.

**How to apply:** Any Maddy/Bitbucket-PR-age alert — whether freshly generated or carried forward from a previous report/chat message — must be re-verified live before repeating it:
```bash
# open PRs, all ages
node -e "... GET /repositories/{workspace}/{repo_slug}/pullrequests?state=OPEN ..." # config/.bitbucket-config.json → instances.kai, repos.maddy
# cross-check Jira priority for each linked LIFM2-xxx ticket
POST {jira_url}/rest/api/3/search/jql  # config/.jira-config.json → instances.madhuraka
```
Compute actual age from `created_on`, pull real `priority.name` per ticket, and state the true worst offender by age × priority — never restate a previously-quoted count/severity/age without recomputing it from Bitbucket+Jira directly. See [[feedback_report_internal_consistency_and_always_reverify]] for the general "always re-verify, don't trust prior report text" principle this is an instance of.
