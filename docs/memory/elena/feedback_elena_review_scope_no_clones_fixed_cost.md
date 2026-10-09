---
name: feedback_elena_review_scope_no_clones_fixed_cost
description: Elena OP code review — clones (Cloned components convention) are NOT duplicate code; fixed-cost project, only review our OP code, never suggest changes to other parts of the repo
metadata:
  type: feedback
---

2026-10-09, user: "Vụ clone ko tính vô duplicate code nha, đã có status rõ với cus, mình làm fixed-cost, ko care các chỗ khác được".

**Why:** the clone approach (optimization-ui copies components instead of editing `projects/shared`/other apps, listed in `precognize-workspace/ai_docs/CONVENTIONS.md` "Cloned components") is agreed with the customer. The project is fixed-cost, so refactoring outside OP scope is unpaid work.

**How to apply:** in `/me:elena-monitor` and in the docs/elena reviews, do not count clones or repo-wide copied scaffolding (e.g. per-service DaeRSocketClient) as duplicates. Do not propose moving code to `projects/shared`/`libraries/`, regression work on portal/admin, or CI for clone drift. Only flag duplication or structure inside OP-owned code (optimization-ui features/shared, microservices-optimization, OP gateway, OP PRs). Related: [[feedback_elena_report_detailed_for_general_reviewer]], [[project_elena_op_restart_duongdn_code_reviewer]].
