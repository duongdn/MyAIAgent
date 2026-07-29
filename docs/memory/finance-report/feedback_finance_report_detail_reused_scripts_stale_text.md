---
name: feedback_finance_report_detail_reused_scripts_stale_text
description: Reusing VEA/FPT-hardcoded build scripts for a new ticker in /me:finance-report-detail leaves stale narrative text and truncated percent formats unless checked line-by-line
metadata:
  type: feedback
---

When building a new ticker with `/me:finance-report-detail`, the per-ticker build scripts (`finance-report-detail-build-dinh-luong.js`, `finance-report-detail-build-dinh-gia.js`) are edited in place each run — only a `MARKET` config object is "meant" to change, but several rows also contain **hardcoded narrative strings** written for the previous ticker (e.g. VEA's stock-split note "GẤP ĐÔI số CP IPO 2016..." baked into the BVPS/shares-outstanding row). Editing only `MARKET` and running the script silently carries that stale prose into the new ticker's sheet with wrong/nonsensical claims.

Found building FOX (29/7/2026): after updating `MARKET.price/peTTM/pb/sharesNow`, row "Số CP lưu hành hiện tại" still said "GẤP ĐÔI số CP IPO 2016 (738.76 triệu...)" comparing 738.76tr against itself — a leftover from VEA's real 1:1-split case that made no sense for FOX (no split in its audited data).

Second bug, same build: the THANH KHOẢN turnover row (GTGD÷vốn hóa %) uses a shared `0.0%` (1-decimal) number format tuned for FPT/VEA's larger turnover values (0.26-0.88%). FOX's turnover is ~100x smaller (0.0018-0.0547%), so all but the largest column silently rendered as "0.0%" — looked like a data-entry error, not a formatting truncation, until checked against the underlying `numberValue` via `includeGridData`.

**Why:** these build scripts aren't generic templates — they're literally last-ticker's script with a few numbers swapped, kept in git as the historical record. Nothing forces a re-read of every string literal.

**How to apply:** after editing `MARKET` and running a `-build-dinh-luong`/`-build-dinh-gia` script for a new ticker, grep the freshly written sheet for the *other* ticker's name/number patterns (old share count, old price) before moving on. For any THANH KHOẢN/percent block, pull `userEnteredValue.numberValue` + `numberFormat.pattern` via `spreadsheets.get({includeGridData:true})` and confirm the smallest nonzero value doesn't round to "0.0%" under the applied pattern — widen to `0.0000%` if the ticker's turnover/vốn hóa is much smaller than the ticker the format was copied from. This is exactly the kind of QA the skill's Step 6 asks for ("grep toàn sheet check #REF!...") but needs extending to "grep for the previous ticker's numbers" and "check percent-format precision," not just formula errors.
