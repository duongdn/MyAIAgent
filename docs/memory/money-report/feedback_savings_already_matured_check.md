---
name: feedback_savings_already_matured_check
description: "money-report — a savings book with currentAmount>0 AND endDate<today is a MISA ghost-balance bug, not a real idle deposit; filter by endDate to catch it"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 040507ea-9dd2-4276-9187-4991241ed16e
---

When computing savings totals, exclude (and flag) any book where `endDate < today` AND `currentAmount != 0` — this is NOT a real matured-but-idle deposit, it's stale ghost data from MISA's `/wallets/savings` API. The reliable filter is simply: only trust `currentAmount` for savings where `endDate >= today`; anything else with a nonzero balance is suspect.

**Why (revised after user follow-up 2026-07-06):** Initially I treated "nam á 6m" (endDate 2024-06-01, balance 2,005,479 ₫) as a real matured-but-unclosed deposit needing "close and redeposit" action. User pushed back — it was fully withdrawn and no longer exists in the MISA app at all ("nam á đã rút hết rồi, trong app ko còn nữa"), then asked to check whether it structurally differs from other closed books or whether a simple maturity-date filter would catch it. Investigation: this user has ~40 other "nam á 6m"-named closed books (renewal history) — every single one of them correctly shows `currentAmount: 0`; only this one wallet ID (`9f37c5f5-...`, term 2023-12-01→2024-06-01, 8%) is stuck nonzero, identical schema otherwise (`inActive: false`, `savingIsFinalize: true` on both the broken one and all its zeroed siblings — inActive/finalize flags do NOT distinguish it). Checking all 83 savings entries confirms: every single nonzero-balance entry has `endDate >= today` except this one — it is the ONLY exception. So `endDate < today` is a clean, sufficient signal on its own; no per-instance user confirmation needed going forward.

**How to apply:** In Portfolio/Allocation reports and the dashboard, when listing savings: (1) `endDate >= today` + balance>0 → Upcoming Maturities (real, trustworthy), (2) `endDate < today` + balance>0 → exclude from all totals (Savings category, Gross, Net) and instead surface once as a "🐛 confirmed data bug: stale ghost balance excluded" alert line, noting the official dashboard Net Worth (`trueTotalBalance`) likely still includes it since it aggregates the same savings API. (3) zero balance → ignore entirely regardless of dates. This supersedes the original version of this memory, which incorrectly told future runs to flag past-endDate nonzero books as an action item ("needs closing") — don't do that, just exclude + flag as data bug. See [[feedback_money_report_html_dashboard]] and [[feedback_misa_money_report_net_worth_bugs]] for related conventions (the latter documents the mirror-image bug: an active book stuck at 0 instead of stuck nonzero).
