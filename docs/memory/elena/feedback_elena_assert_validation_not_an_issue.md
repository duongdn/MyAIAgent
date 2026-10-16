---
name: elena_assert_validation_not_an_issue
description: Elena OP review - assert-as-validation is customer codebase pattern, run with -ea, team declared it kept in release note; do not flag
metadata:
  type: feedback
---
Do not flag `assert` used for input validation in Elena OP BE code.

**Why:** User 2026-10-16 said not to flag it (deferred, fix later). Note: the M1 release note (Slack SAM GUARD Mobile #optimization C0C0C5A05D5, thread ts 1791972031.920789, readable with Ken token accounts[4]) does NOT mention assert. Its Known Issues are: fixed trend/data-check params, hardcoded usage meter, license upload does not update credits, tooltip has no unit. Verified: Precognize develop has ~732 asserts; every service Dockerfile (incl. microservices-optimization) runs `java -ea`, so the "asserts disabled" risk does not apply.

**How to apply:** Before flagging a pattern in OP review, check if it is a customer-wide pattern or a known issue in the release note (release note: Slack #optimization, readable via Ken token). Related: [[elena_review_scope_no_clones_fixed_cost]]
