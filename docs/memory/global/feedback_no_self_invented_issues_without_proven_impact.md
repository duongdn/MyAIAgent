---
name: feedback_no_self_invented_issues_without_proven_impact
description: Don't list issues nobody reported (missing SPF, www DNS) unless real impact is proven
metadata:
  type: feedback
---
2026-10-28 MPFC: I listed "domain no SPF" and "www has no DNS record" as issues. User: "issue ai gởi, có chắc là có ảnh hưởng?" / "www bỏ qua, cus có nói gì đâu". Headers showed alerts dkim=pass → INBOX, no impact.

**Why:** self-found config nits with no customer report or observed failure = noise that costs the user time.
**How to apply:** only report an issue if a customer/team raised it OR there's an observed failure (error, bounce, outage). Otherwise drop it, or at most one "FYI" line, never in alerts/unresolved questions. Verify impact (headers, logs) before claiming one.
