---
name: feedback-elena-consolidated
description: "Elena-SamGuard: auto review+merge+deploy mergeable PRs without asking; ALSO check .elena-pending-actions.json deployed:false FIRST (merged PRs invisible to open-PR check)"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Auto-deploy:** When an Elena-SamGuard-Digital-Plant PR becomes mergeable, execute the full flow automatically — review diff, check CodeRabbit, merge, SSH pull, build, update Redmine/tracking. Don't ask "shall I proceed?" — it's a defined process. Only pause if CodeRabbit flags high-risk issues. *Why: user said "this is the project flow, no need to ask again."*

**Check pending-actions FIRST:** At the START of every Elena run, read `config/.elena-pending-actions.json` and scan `merged[]` for entries where `deployed:false` AND `pending_action` doesn't start with "DONE"/"NOTE". If found → send Matrix alert to Elena Digital Plant room (`!kyArBadvcbfPIpIxpD:nustechnology.com`) and deploy immediately, BEFORE checking GitHub open PRs. Then update `deployed: true`.

**Why:** PR #303 merged 2026-05-29, deploy failed silently (MayBanServer unreachable), sat undeployed 4 days with zero alert — because the Elena piece only checks GitHub OPEN PRs, and merged PRs are invisible there. User caught it 2026-06-02.
