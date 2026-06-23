---
name: misa-money-report-net-worth-bugs
description: MISA money-report — never reconstruct Net Worth manually; use trueTotalBalance API; FX conversion bug for transaction-level income/expense
metadata:
  type: feedback
---

Never manually reconstruct MISA Net Worth by summing accounts + savings + investment cost-basis. Always use `trueTotalBalance.amount` (script calls `GET /wallets/totaldashboard` directly) as the headline figure.

**Why:** On 2026-06-23, three separate manual-reconstruction attempts each undercounted Net Worth by a different amount (missing accrued "Tiền lãi" interest on loan-tracked investment wallets; missing residual cash sitting in a wallet after a partial redemption; missing a savings book whose `currentAmount` was stuck at 0 due to a confirmed MISA website data bug). This caused the user to see a false "lost ~2 tỷ" alarm that took an entire session to walk back. The wallet-level true-value formula (when a breakdown is needed) is `cost_basis_remaining (Σcho_vay − Σthu_nợ) + currentAmount` — neither half alone is correct.

Also never compute income/expense by summing raw `currentAmount` across transactions when `currencyCode !== 'VND'` (e.g. Paypal/USD). Must use `convertCurrentAmount` instead, or foreign-currency income (e.g. Freelancer payments) gets undercounted by the full USD face-value vs VND-equivalent gap (confirmed: missed ~14.5M in one run by summing "207"+"343" as if they were VND).

Also never trust MISA's own dashboard "Tổng quan" or "Lịch chi tiêu tháng" widgets for income/expense — they each define income/expense differently (one counts loan repayment "Thu nợ" as income, the other counts investment purchase "Cho vay" as expense), giving wildly different and equally wrong numbers for the same month. Compute manually from transactions, excluding `Cho vay/Thu nợ/Đi vay/Trả nợ` entirely, and validate against the app's own "Báo cáo" screen category breakdown.

**How to apply:** Full technical detail, formulas, and the verified script fix all live in [[reference_misa_money_report_skill_file]] (`.claude/commands/me/money-report.md` in this project) and in code comments at the top of `scripts/misa-money-report.js`. Read those before touching MISA money-report logic again — don't re-derive any of this from scratch.
