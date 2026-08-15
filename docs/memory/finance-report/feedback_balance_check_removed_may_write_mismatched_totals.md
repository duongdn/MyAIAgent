---
name: feedback_balance_check_removed_may_write_mismatched_totals
description: DuongDN explicitly asked to permanently delete the 270/440 balance-sheet reconciliation check from finance-quantification-build.js — no longer blocks any ticker
metadata:
  type: feedback
  modified: 2026-08-15T12:00:00Z
---

DuongDN (2026-08-15): reported VNM "fetch sai" via shared spreadsheet. Investigation found cafef's annual (`TypeTime=NAM`) NV record for VNM FY2025 is internally understated by ~3.8 nghìn tỷ (300+400=440 math checks out, but the whole NV side doesn't reconcile with Assets/270 or with the correctly-reconciled Q4/2025 quarterly data) — a real cafef data bug, not a script bug. The script's own `checkBalance()` (10M VND tolerance) correctly rejected the write with `ERROR: BALANCE_MISMATCH`, which is why no VNM tab existed yet.

When asked "chỉ VNM lần này (dùng --force có sẵn)" vs "bỏ hẳn balance check trong script", DuongDN chose the latter — **remove the check entirely, for all tickers, going forward.**

**Change made:** deleted `checkBalance()`, its call site, `i270`/`i440` computation, and the `--force` CLI flag from `scripts/finance-quantification-build.js`. Updated `docs/finance-quantification-reference.md` and [[feedback_newly_listed_ticker_thin_cafef_data]] to drop `--force` references.

**Why:** user wants the tool to always write whatever cafef/FireAnt returns rather than block on source-data mismatches — accepts the tradeoff that a ticker's sheet may now silently contain an unreconciled year (assets ≠ liabilities+equity) if the upstream source itself is inconsistent.

**How to apply:** Do NOT re-add a balance-sheet reconciliation gate to this script unless DuongDN asks. If a ticker's totals look internally inconsistent (like VNM FY2025), that's now expected behavior, not a bug to silently "fix" by re-blocking — surface it as an observation/caveat instead, per-ticker, if noticed.
