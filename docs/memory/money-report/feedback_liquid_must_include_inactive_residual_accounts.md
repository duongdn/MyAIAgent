---
name: feedback_liquid_must_include_inactive_residual_accounts
description: "money-report — Liquid category total must include 3 tiny inactive residual accounts (Momo, nam á, Payoneer) or the cost-basis-vs-market gap check silently breaks"
metadata:
  type: feedback
---

When computing the 💵 Liquid category total (Portfolio By Category, Allocation tables, dashboard), include these 3 `inActive:true` accounts alongside Paypal/Tikop/vcb/Ví: **Momo** (900,000 ₫), **nam á** (10,867 ₫), **Payoneer** (−3,689 ₫ converted). Combined ~907,178 ₫ — small in isolation but material for cross-checks.

**Why:** Discovered 2026-08-11 by reconstructing liquid from just the 4 "obvious" active accounts (Paypal/Tikop/vcb/Ví) — undercounted by exactly 907,178 ₫. Caught because the cost-basis-reconstruction-vs-`totaldashboard` gap (normally a stable ~72,900,000 ₫ every single snapshot since 07-24, see [[feedback_misa_money_report_net_worth_bugs]]) came out ~907K short of that pattern. Adding the 3 residual accounts back in restored the gap to exactly 72,900,000 — confirming these accounts were silently included in every prior snapshot's liquid total (verified against 08-10's dashboard account table, which explicitly lists "Momo" and "nam á + Payoneer" rows) even though the skill file's account list only names Paypal/Tikop/vcb/Ví/VCB-visa explicitly.

**How to apply:** When listing "all liquid accounts" for Portfolio/Allocation/Dashboard, don't filter to only `inActive:false` — walk the full `apiData.accounts` array and bucket by wallet identity (Momo/nam á/Payoneer → Liquid) regardless of the `inActive` flag, same as Nhà/long an res/Larion/vàng being `inActive:true` but still counted (that part *was* already documented in the skill file). Use the ~72,900,000 gross-recon-vs-`totaldashboard` gap as a sanity check each run: if it drifts meaningfully off that figure without a plausible explanation (new Cho vay/Thu nợ activity), suspect a missed account before concluding something else changed.
