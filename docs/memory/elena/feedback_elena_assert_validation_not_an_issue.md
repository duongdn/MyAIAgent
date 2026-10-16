---
name: elena_assert_validation_not_an_issue
description: Elena OP review - assert-as-validation is customer codebase pattern, run with -ea, team declared it kept in release note; do not flag
metadata:
  type: feedback
---
Do not flag `assert` used for input validation in Elena OP BE code.

**Why:** User 2026-10-16: release note sent to customer lists issues the team keeps for dev convenience, fix later. Verified: Precognize develop has ~732 asserts; every service Dockerfile (incl. microservices-optimization) runs `java -ea`, so the "asserts disabled" risk does not apply.

**How to apply:** Before flagging a pattern in OP review, check if it is a customer-wide pattern or a known issue in the release note (release note lives in customer Slack, not accessible; ask user if needed). Related: [[elena_review_scope_no_clones_fixed_cost]]
