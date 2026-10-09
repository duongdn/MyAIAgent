---
name: elena_review_results_in_dated_folder
description: Elena OP review results (code/spec/compliance reviews, team action items) go in docs/elena/reviews/YYYY-MM-DD/; reference docs stay flat in docs/elena/
metadata:
  type: feedback
---
Review results (FE/BE code review, OpenSpec review, foundation review, customer-rules compliance, deployed-code review, FE/BE team action items md+html) are saved in `docs/elena/reviews/<YYYY-MM-DD>/`. Reference/explainer docs (test guide, architecture, walkthrough, step status) stay flat in `docs/elena/` with no date folder.

**Why:** user 2026-10-09: "lưu lại review result trong 1 folder theo ngày". Earlier rule "đừng bỏ vô thư mục theo ngày" applies to reference docs only.
**How to apply:** each new review round → new dated folder; fix relative links (`../../` to flat docs). Related: [[elena_report_detailed_for_general_reviewer]].
