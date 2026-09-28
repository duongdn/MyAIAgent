---
name: spending_breakdown_by_category_group
description: money-report must show spending split by MISA parent group (Ăn uống, Con cái, Xe cộ, Đầu tư…) with ₫ and %
metadata:
  type: feedback
---
User (2026-09-28): transactions report must break down money used like the MISA app, per group with amount + %, including investment (Cho vay) separately.
**Why:** a single Thu/Chi total + top sub-categories wasn't detailed enough.
**How to apply:** run `node scripts/misa-expense-category-breakdown.js {this-month} {last-month}` in Piece 5 (spec now in .claude/commands/me/money-report.md). Transfers into broker wallets aren't "Cho vay" → note them separately.

**Correction 2026-09-28:** ALL money transferred into FPTS/VCBS/VCBF/Finhay/etc. = Đầu tư (not just "Cho vay" rows). Transfers only come from `/transactions/pagingdashboard` (`apiData.transfers`), not `/transactions/day`. Also: a drop in an investment wallet may be a withdrawal transfer (e.g. VCBS→vcb 69.9M 09-22), not a price move — check transfers before blaming price.
