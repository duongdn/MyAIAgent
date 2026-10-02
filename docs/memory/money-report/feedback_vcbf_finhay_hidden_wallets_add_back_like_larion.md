---
name: feedback_vcbf_finhay_hidden_wallets_add_back_like_larion
description: "money-report — since 2026-10-02 VCBF and Finhay wallets are inactive (API returns 0); add back VCBF 525,063,000 + Finhay 67,404,069 to investment and Net Worth like Larion; reconcile via apiData.ledgerRecords"
metadata:
  type: feedback
---

From 2026-10-02 ~10:40 the user closed the Cho vay ledgers (Thu nợ) of VCBF, Finhay and FPTS, booked the fund losses as "Linh tinh" rows flagged `excludeReport` (VCBF −69,000,000 "lỗ quỹ năm nay", Finhay −7,000,000 "lỗ ck"), then set VCBF + Finhay `inActive`. MISA zeroes inactive walletType-3 wallets, so `trueTotalBalance` dropped 599.5M with no money leaving. User confirmed: both are still investment — VCBF **525,063,000**, Finhay **67,404,069** (74,404,069 − 7M; user corrected the first number offered).

**Why:** A 600M Net Worth "drop" was about to be reported; `/transactions/day` (excludeReport:false) does not return the loss rows, so the wallet balances could not be explained from `apiData.transactions` alone.

**How to apply:**
- Net Worth = `trueTotalBalance` + Larion 800,000,000 + VCBF 525,063,000 + Finhay 67,404,069 while those wallets stay inactive with currentAmount 0. If a wallet is active again, use its live `currentAmount` and drop the manual add-back (check the ~70.3M gross-vs-headline gap still holds).
- FPTS/VCBS are active: value = wallet `currentAmount` + remaining basis (now ∓400,000, offsetting each other).
- When totaldashboard moves by hundreds of M, read `apiData.ledgerRecords` (added to `scripts/misa-money-report.js` 2026-10-02: every "Ghi chép" row prev month → today incl. excluded rows and transfers, with `lastUpdationTime`) before asking the user or reporting a loss. The user may be editing MISA live — re-fetch if rows are minutes old.
- Related: [[feedback_larion_valuation_confirmed_by_user]], [[feedback_all_money_in_investment_wallets_is_investment]].
