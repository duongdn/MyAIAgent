---
name: feedback_all_money_in_investment_wallets_is_investment
description: "money-report — every đồng inside an investment wallet (VCBS/VCBF/FPTS/Finhay) is investment, never cash/idle/'chờ mua'; entries booked inside those wallets are investment P/L, not living income/expense"
metadata:
  type: feedback
---

All balance inside an investment wallet (VCBS, VCBF, FPTS, Finhay) is **đầu tư** — including `currentAmount` left after a Thu nợ / fund redemption (VCBF 525M on 2026-10-02) and money transferred in with no Cho vay yet (FPTS wallet balance). Any transaction booked inside such a wallet (e.g. Linh tinh "lỗ quỹ năm nay" −69M, Tiền lãi) is investment P/L, not living income/expense.

**Why:** User corrected 2026-10-02 ("tất cả tiền trong các tài khoản đầu tư là đầu tư, ko phải tiền") after the report (1) asked whether VCBF's 525M was cash waiting, showed an alternative "effective" allocation and recommended pulling 105M of it to cash, (2) counted the 69M fund loss as October living expense (Linh tinh 82%), (3) kept asking for days whether FPTS wallet balance "đã mua CP chưa". Same class as [[feedback_near_zero_cost_basis_is_settled_ledger_not_idle_cash]].

**How to apply:** Never write "tiền chờ / chờ mua / chờ giải ngân / idle" for these wallets, no open questions or recommendations about deploying their balance, no alternative allocation view. Thu/Chi = living wallets only; `scripts/misa-expense-category-breakdown.js` skips investment-wallet rows (reports them as `investPnl`), so totals may differ from the MISA app "Báo cáo" by exactly that amount — expected. Rule is also in `.claude/commands/me/money-report.md` Key Rules. Tikop stays Liquid ([[feedback_tikop_is_liquid_not_investment]]).
