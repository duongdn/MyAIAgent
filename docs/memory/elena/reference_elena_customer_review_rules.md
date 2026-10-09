---
name: reference_elena_customer_review_rules
description: Precognize customer code-review rules (from 811 comments on NUS PRs in Precognize/development) — checklist for every Elena OP PR review
metadata:
  type: reference
---

Full analysis: `docs/elena/elena-op-customer-review-rules-compliance.md`. Re-fetch: `bash scripts/elena-fetch-customer-review-comments.sh` (gh account `nusken` is the only one with access to `Precognize/development`).

Customer rules to check on every OP PR (they will re-review on delivery; fixed-cost, so rework is unpaid):
- BE: no `assert` for validation (throw + log); log `e` not `e.getMessage()`; 1 info log/request; update on DB side, not load-merge-save; migration in BOTH new-customer and existing-customer changelogs; no one-field request classes; enums/constants, not magic strings; no unrelated/formatting changes in a PR; reuse existing RabbitMQ exchange and declare it in docker rabbitConfig; Joda DateTime; newline at EOF.
- FE: every text through translate (incl. aria-label); no mocks in delivered code; date format from configuration; status/type text and icons from API, not hardcoded; one interface per concept (no renamed duplicates); no function calls in templates (functionCallPipe); Enums over raw status strings; no `any`; no duplicate API calls; standalone components; no console.log or commented-out code.

Related: [[feedback_elena_review_scope_no_clones_fixed_cost]], [[project_elena_op_restart_duongdn_code_reviewer]].
