---
name: feedback_larion_valuation_confirmed_by_user
description: "Larion cổ phần AND VCBS are normally-inactive wallets whose API currentAmount resets to 0 while inactive — MUST carry forward last known active value unchanged, never zero it out or invent a new bump without an explicit user-stated number"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T02:39:23.830Z
---

Both "Larion cổ phần" and "VCBS" are wallets the user keeps `inActive` most of the time by design. While inactive, MISA's API returns `currentAmount: 0` for them (and the cost-basis-from-transactions formula also nets to ~0 for VCBS since no new Cho vay/Thu nợ transactions occur while dormant) — this 0 is NOT their real value, it's just what the API shows for an inactive wallet.

**Confirmed values (as of 2026-08-28, corrected after 2 rounds of user correction):**
- Larion cổ phần = **800,000,000** (confirmed 2026-08-26 as real sale-price valuation; user set it inactive again on 2026-08-28 — value itself did NOT change, do not add any bump without an explicit user-given number).
- VCBS = **612,855,620** (last known value as of 2026-08-26, wallet inactive both before and after, unchanged).

**History of the mistake (why this note is this detailed):** On 2026-08-28 a report run zeroed both wallets out (false "Net Worth dropped 1.43B" alarm). First fix wrongly assumed Larion was bumped +200,000,000 based on a misread of the user's own words ("tôi chỉ mở lại để tăng lên 200 tr rồi inactive lại") and produced a second wrong number (8,238,410,329, showing a suspicious +182M jump). User caught THIS too ("vô lí, tự nhiên 1 ngày mà tăng lên 200 tr, tôi có làm gì đâu") and finally clarified: Larion's value was already 800M from before, they only toggled it inactive on 2026-08-28 — no bump happened. **Never infer a new numeric value for a manually-tracked wallet from ambiguous user phrasing — if a change is claimed, ask for the exact resulting number before writing it into any report.**

**How to apply — MANDATORY going forward:**
1. When a wallet in `apiData.accounts` shows `inActive: true` AND `currentAmount: 0`, do NOT use 0 as its value. Look up its last known non-zero value from the most recent prior `reports/{date}/{time}-money-portfolio.md` or `reports/money-history.json` snapshot and carry it forward **unchanged**.
2. Only change a carried-forward wallet's value when the user gives an explicit final number (not a vague "tăng lên X" — confirm the resulting total before writing it anywhere).
3. `trueTotalBalance.amount` (`/wallets/totaldashboard`) excludes inactive wallets entirely — it is NOT sufficient alone as Net Worth when such wallets exist. Corrected Net Worth = `trueTotalBalance.amount` + Σ(carried-forward inactive wallet values).
4. Never report a Net Worth drop (or suspicious jump) as real without first checking whether it's explained by a wallet going inactive/active. If a correction itself produces a surprising delta, treat that as a signal you likely misapplied the carry-forward value — verify with the user before publishing again.
5. Current correct figures (2026-08-28): Larion cổ phần = 800,000,000 (carry forward, unchanged), VCBS = 612,855,620 (carry forward, unchanged). True Net Worth = 6,625,554,709 (raw totaldashboard) + 800,000,000 + 612,855,620 = **8,038,410,329**.
