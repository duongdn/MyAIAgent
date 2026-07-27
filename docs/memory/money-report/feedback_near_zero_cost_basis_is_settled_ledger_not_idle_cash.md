---
name: feedback_near_zero_cost_basis_is_settled_ledger_not_idle_cash
description: "money-report — a near-zero cost basis on an investment wallet means its Cho vay/Thu nợ ledger is settled, NOT that the capital is uninvested; never flag such a wallet as idle cash"
metadata:
  node_type: memory
  type: feedback
---

Never interpret an investment wallet's `currentAmount` as **idle/uninvested cash** just because its cost-basis-remaining (Σ Cho vay − Σ Thu nợ) is near zero. A near-zero basis means the Cho vay/Thu nợ ledger for that wallet has been **settled/closed out**, and the position is now carried directly as `currentAmount` at **market value**. The money is invested.

**Why:** User corrected this 2026-07-27 ("sai, đã đầu tư hết, trong tài khoản đó là để đầu tư"). In the 2026-07-27 run, VCBS showed cost basis 400,000 ₫ and `currentAmount` 600,055,620 ₫. The report concluded 600M was cash sitting idle since the June ETF redemption, and built a cascade of wrong output on it: a 🔴 "idle capital" alert claiming ~4.1M/month foregone yield, a fabricated "nominal vs effective allocation" table asserting real cash was 17.04% (vs 5.46% reported) and real equity only 31.28%, a red dashboard card, the #1 short-term recommendation, and a blocking open question. None of it was real — all five benchmark groups were in range and the allocation had no structural problem. The skill file's own wording feeds this error: it says `currentAmount` is "stale/near-zero most of the time" and describes it as "cash sitting, not yet swept" after a Thu nợ, which is true *immediately* after a redemption but not weeks later once the position is re-established.

**How to apply:**
- The formula `value = cost_basis_remaining + currentAmount` stays correct — this changes *interpretation*, never the arithmetic. No figures moved when this was corrected on 2026-07-27, only the narrative.
- A wallet with basis ≈ 0 and a large `currentAmount` is the **most accurately valued** of the four fund wallets (mark-to-market, not cost basis). Say that, don't alarm about it.
- Because such a wallet is mark-to-market, a period-over-period move in it **cannot be split** between transferred-in capital and price appreciation. State both possibilities; don't assert one. (2026-07-27: VCBS +6.3M was reported as a transfer purely because `vcb`'s unexplained residual happened to match.)
- Do NOT invent a "nominal vs effective allocation" comparison. If tempted to claim a reported allocation % is inflated, that claim needs evidence beyond a low cost basis — and ask the user before publishing it.
- Only flag idle capital when a redemption (`Thu nợ`) is recent AND no re-entry followed, and even then frame it as a question, not a 🔴 alert.
- Blast radius when this is wrong: portfolio (account note, alerts, liquidity), allocation (wallet table, nhận xét, review risk table, benchmark section, recommendations, open questions), debt (coverage line), dashboard (highlights, a whole card, table badge, 90-day action table), and the `money-history.json` note. Fix all of them together.

See [[feedback_tikop_is_liquid_not_investment]] — same class of error: trusting a raw MISA field over what the account economically is. See [[feedback_misa_money_report_net_worth_bugs]] for the valuation formula itself.
