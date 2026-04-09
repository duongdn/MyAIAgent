---
name: Elena PRs - auto review+merge+deploy without asking
description: When Elena-SamGuard PRs become mergeable, automatically review+merge+deploy without asking for confirmation
type: feedback
---

For Elena-SamGuard-Digital-Plant PRs: when a PR is mergeable, proceed with the full flow automatically — review diff, check CodeRabbit, merge, SSH pull, build, update Redmine/tracking. Don't ask "shall I proceed?"
**Why:** User said "This is the project flow, no need to ask again please" — it's a defined process, not a judgment call.
**How to apply:** On refresh or daily report, if Elena PRs are open+mergeable → execute the full deploy flow. Only pause if CodeRabbit flags high-risk issues.
