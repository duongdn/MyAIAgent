---
name: feedback_warning_needs_explanation
description: Every non-OK status in the Bailey #maintenance Slack post needs an inline plain-language explanation (cause, recurring/new, action) — a bare "WARNING" word is not actionable and drew a customer question
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f774f62e-62fb-4070-971a-f02db9f44072
---

Every non-OK status line in the Bailey #maintenance Slack post must carry an inline italic explanation (cause + known-recurring vs new + action needed), not a bare "WARNING" word.

**Why:** On 03/07/2026 the report posted "Performance status: WARNING", "Memory: WARNING", "AWS RDS: WARNING" with zero context (regression from the 26/06/2026 format which did include explanations). Customer replied on 06/07/2026 asking "What is the performance status warning here?" — had to be answered after the fact. A bare label on a customer-visible channel is not actionable and reads as an unexplained problem.

**How to apply:** [[reference_bailey_monitor_skill_file]] Subtask 8 message format now has a MANDATORY section requiring this. When drafting the Slack message, for every field that isn't OK, add `_(plain-language cause, recurring/new, action needed)_` — still following the existing customer-facing redaction rules (no internal errors/stack traces/config flags, see same file).
