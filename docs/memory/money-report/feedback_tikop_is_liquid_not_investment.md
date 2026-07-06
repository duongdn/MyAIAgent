---
name: feedback_tikop_is_liquid_not_investment
description: "money-report — Tikop wallet is a robo-savings/cash-parking product and must be categorized as Liquid, not Investment"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 040507ea-9dd2-4276-9187-4991241ed16e
---

Categorize the `Tikop` account (walletType 3 in MISA's API, so it looks like an investment wallet by type) as 💵 **Liquid**, not 📈 Investment, in every money-report output (Portfolio By Account/By Category, Allocation excl-home and full-view tables, dashboard KPIs/charts/account table).

**Why:** User corrected this 2026-07-06 ("cái tikcop là tiền mặt, ko phải đầu tư đâu") — Tikop is a robo-savings/cash-parking app, functionally closer to a bank balance than to VCBS/VCBF/FPTS/Finhay (which are genuine ETF/fund/dividend-stock positions with cost-basis tracking). Don't rely on MISA's raw `walletType` field to bucket accounts; it groups Tikop with the real investment wallets even though it isn't one economically.

**How to apply:** Only VCBS, VCBF, FPTS, Finhay, and Larion cổ phần (private equity) count as 📈 Investment. Tikop's `currentAmount` goes straight into 💵 Liquid alongside vcb/Paypal/Ví/Momo — no cost-basis-remaining formula needed for it (that formula is only for VCBS/VCBF/FPTS/Finhay, see [[feedback_misa_money_report_net_worth_bugs]]). This shifts roughly 195M ₫ (as of 2026-07-06) from Investment into Liquid — recompute all category totals/percentages/benchmark-comparison rows accordingly, don't just relabel the one row. Note in reports if historical/trend data predates this correction, since older snapshots may still have Tikop bundled into Investment (schema wasn't split out before) — don't compare investment/liquid deltas across that boundary 1-for-1. See [[feedback_money_report_html_dashboard]] for where category subtotals appear across outputs.
