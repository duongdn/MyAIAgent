---
name: feedback_maddy_pr481_not_a_blocker_waiting_on_customer
description: "Bitbucket xtreme-web/rms PR #481 unanswered comment was flagged as a blocking alert 3x (09-11, 09-21, 09-22) — user corrected 2026-09-22: this PR is waiting on customer feedback, not on us, not a blocker. Stop re-flagging it."
metadata:
  type: feedback
---

**Corrected 2026-09-22 09:45:** PR #481 ("LIFM2-409 feedback", `xtreme-web/rms`, author Kai) has a single Codex-review comment from Madhuraka (2 High + 1 Medium findings) posted 2026-06-06, with no reply since. This was flagged as a real unresolved alert 3 separate times (09-11, 09-21, and again 09-22) under the assumption that an unanswered high-severity PR comment automatically means our side is dropping it.

**User's correction:** "Maddy PR not answer is not the block, wrong alert, this depend on customer feedback" — the PR's progress is gated on customer feedback, not on our team failing to respond. Reading "no reply to a review comment" as inherently a red flag was wrong here — some PRs sit open by design waiting on the client side, and a stale review thread doesn't mean neglect.

**How to apply going forward:**
- **Do NOT auto-flag PR #481 again** as an unanswered/blocking alert — it's a known, accepted "waiting on customer" state, not a gap on our side.
- More generally: before flagging *any* unanswered PR comment as a blocker, check whether the PR's forward progress actually depends on OUR reply, or is legitimately blocked upstream (customer decision, spec clarification, etc.) — "N days since last comment" alone is not sufficient evidence of neglect, same principle as [[feedback_franc_rdc_customer_ask_not_flagged]] and [[feedback_legalatoms_ray_many_subprojects_ignore_unless_direct_ask]] for Slack asks.
- The Maddy 4-part check ([[feedback_maddy_consolidated]]) should still run the Bitbucket reply-rate scan every time (useful visibility), but stop treating "unanswered PR comment" as automatically blocking without first checking who the ball is actually in.
