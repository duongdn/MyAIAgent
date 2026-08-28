---
name: feedback_larion_valuation_confirmed_by_user
description: "Larion cổ phần AND VCBS are normally-inactive wallets whose API currentAmount resets to 0 while inactive — MUST carry forward last known active value, never treat 0/inactive as real value or a loss"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T02:35:20.106Z
---

Both "Larion cổ phần" and "VCBS" are wallets the user keeps `inActive` most of the time by design. While inactive, MISA's API returns `currentAmount: 0` for them (and the cost-basis-from-transactions formula also nets to ~0 for VCBS since no new Cho vay/Thu nợ transactions occur while dormant) — this 0 is NOT their real value, it's just what the API shows for an inactive wallet.

**Confirmed history:**
- Larion cổ phần: 600M → 800M (2026-08-25/26, confirmed real sale-price valuation) → user briefly reactivated 2026-08-28, bumped +200M to 1,000,000,000, then deactivated again.
- VCBS: last known real value 612,855,620 (as of 2026-08-26 report), wallet has been inactive both before and after — value has NOT changed, user confirmed nothing happened to it ("trước giờ vẫn vậy").

**Why this matters:** On 2026-08-28, a report run zeroed both wallets out because it read the API's inactive-state `currentAmount`/recomputed cost-basis literally, producing a false "Net Worth dropped 1.43B / −17.8%" alarm. User caught this twice — first clarifying Larion's toggle behavior, then pointing out VCBS should also just carry forward like before ("sao lại lỗi, sao không tự cộng lại như trước giờ"). This is a recurring pattern, not a one-off — expect other manually-tracked investment wallets (private equity, broker holdings) to behave the same way.

**How to apply — MANDATORY going forward:**
1. When a wallet in `apiData.accounts` shows `inActive: true` AND `currentAmount: 0`, do NOT use 0 as its value. Look up its last known non-zero value from the most recent prior `reports/{date}/{time}-money-portfolio.md` or `reports/money-history.json` snapshot and carry it forward unchanged.
2. Only update a carried-forward wallet's value when the user explicitly states a change (e.g., "tăng lên 200tr").
3. `trueTotalBalance.amount` (`/wallets/totaldashboard`) excludes inactive wallets entirely — it is NOT sufficient alone as Net Worth when such wallets exist. Corrected Net Worth = `trueTotalBalance.amount` + Σ(carried-forward inactive wallet values).
4. Never report a Net Worth drop as real/alarming without first checking whether it's explained by a wallet going inactive. If gross drop ≈ Σ(newly-inactive wallets' last known values), it's a reporting artifact, not a loss — do not alarm the user, just carry the values forward silently and note it factually.
5. As of 2026-08-28: Larion cổ phần = 1,000,000,000 (carry forward), VCBS = 612,855,620 (carry forward). True Net Worth that day = 8,238,410,329, not the raw 6,625,554,709 API figure.
