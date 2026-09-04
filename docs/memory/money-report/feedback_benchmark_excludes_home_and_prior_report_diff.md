---
name: feedback_benchmark_excludes_home_and_prior_report_diff
description: "Benchmark % must exclude \"Nhà\" (primary residence) from base; Piece 6 review must read prior allocation report/history.json first to follow up on open plans"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fcb4041-ca5f-470c-a7bc-26d89261e3bc
  modified: 2026-09-04T02:48:58.191Z
---

Two corrections, both now written directly into `.claude/commands/me/money-report.md` (Piece 6) so they survive without relying on memory recall:

1. **Benchmark comparison base excludes "Nhà"**: the primary-residence wallet (~2.5B, non-tradeable) must NOT be in the denominator when computing benchmark %. First cut on 2026-09-04 included it and showed BĐS at 43.1% (looked like a big overweight) — correct number with Nhà excluded was 18.0% (well within 20-30% benchmark). Base = total breakdown minus Nhà. A second real-estate holding like "long an res" (investment property) still counts toward the BĐS row. Net Worth headline still includes Nhà — only the benchmark % denominator excludes it.

2. **Piece 6 (Finance Review) must read the previous run's report first**: before writing a new allocation/review, read the prior allocation report (or `money-history.json`'s second-to-last snapshot) and check whether any previously-proposed "Kế hoạch"/khuyến nghị (e.g. a specific rebalancing plan naming source accounts and amounts) was executed, partially executed, or still pending — state this explicitly rather than silently re-proposing the same plan from scratch each time.

**Why**: user pointed out (2026-09-04) that a rebalancing plan written into one day's report ("chuyển 110M từ sổ tiết kiệm sang cổ phiếu") had no mechanism to be checked against next time — the skill just does static analysis of the current snapshot with no memory of prior recommendations.

**How to apply**: every `/money-report review` or full run — Piece 6 §0 (mandatory, do first) reads the prior report/history and reports plan status; §3 benchmark table always computes on the ex-Nhà base.

See [[reference_misa_money_report_skill_file]] for the skill file path.
