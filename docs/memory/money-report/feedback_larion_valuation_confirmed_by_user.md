---
name: feedback_larion_valuation_confirmed_by_user
description: "Larion cổ phần (fixed 800M, kept inactive) and VCBS are manually-tracked walletType-3 investment wallets — deactivating them can zero currentAmount in the API with NO recoverable history; only fix is reactivating in the app to read the true value"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T02:55:42.814Z
---

**Confirmed final values (2026-08-28, after 4 rounds of correction — see history below):**
- Larion cổ phần = **800,000,000** (confirmed 2026-08-26 real sale-price valuation). User keeps this wallet permanently `inActive`. User explicitly said (2026-08-28): "Larion cứ giữ 800" — do NOT change this number without an explicit new instruction, and do NOT try to "correct" it just because the API shows 0 while inactive.
- VCBS = read live from API when active. On 2026-08-28 after user reactivated it: `currentAmount = 641,255,619.52`. This wallet's true value is NOT reliably computable from transaction cost-basis (Cho vay/Thu nợ nets to ~0 since full redemption in June 2026) — the API's `currentAmount` while ACTIVE is the only correct source.

**Root cause finally identified:** Both wallets are `walletType: 3` (investment) with balances set by manual/UI entry, not by transaction flow. MISA's API zeroes `currentAmount` for this wallet type once deactivated, and **does not log any balance-edit or deactivation history** — no "Điều chỉnh"/"Cân bằng" transaction category exists anywhere in the account's full transaction history. This differs from other `inActive` wallets like "Nhà", "long an res", "vàng" which keep their full `currentAmount` even while inactive (those aren't loan/investment-type manual entries in the same bucket, or simply haven't been freshly toggled — exact mechanism still not fully understood, but empirically confirmed: once VCBS/Larion go inactive, currentAmount reads 0 and stays 0 until reactivated).

**How to apply — MANDATORY:**
1. For Larion cổ phần specifically: always use 800,000,000 as its value regardless of API `inActive`/`currentAmount` state, unless the user gives an explicit new number. Never invent a "bump" from ambiguous phrasing (this happened twice — see history) — ask for the exact number if a change is claimed.
2. For VCBS or any other walletType-3 wallet showing `currentAmount: 0` while `inActive: true`: do NOT guess a carry-forward value. There is no way to reconstruct it from API/transaction data (MISA keeps no audit trail for manual balance edits). Ask the user to briefly reactivate the wallet in the MISA app so the API returns the true `currentAmount`, then use that value directly (no formula needed once active — raw `currentAmount` is correct for VCBS specifically, since its cost-basis-from-transactions is stale/near-zero post-full-redemption).
3. `trueTotalBalance.amount` (`/wallets/totaldashboard`) correctly includes any ACTIVE wallet's value automatically — once VCBS is active, no manual addition is needed; only add Larion cổ phần's fixed 800,000,000 separately since the user keeps it permanently inactive.
4. Net Worth formula going forward: `trueTotalBalance.amount` (as returned live) + 800,000,000 (Larion cổ phần, fixed, always add since it stays inactive by design).
5. Confirmed 2026-08-28 final: trueTotalBalance = 7,252,310,328 (VCBS active) + 800,000,000 (Larion) = **8,052,310,328**.

**History of mistakes on this (for context on why this rule is this explicit):** 4 sequential wrong reports on 2026-08-28 — (1) reported a false 1.43B "loss" alarm when both wallets first zeroed, (2) wrongly assumed Larion was bumped +200M from misread user phrasing, (3) wrongly assumed both wallets should "carry forward" silently without evidence that rule generalizes, (4) discovered other inactive wallets (Nhà, long an res, vàng) keep full value while inactive, invalidating the carry-forward generalization. Final resolution: ask user to reactivate the specific wallet in-app rather than guessing.
