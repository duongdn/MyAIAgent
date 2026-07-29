---
name: feedback_finance_report_detail_new_ticker_qa_checklist
description: Concrete QA checklist gaps found building a new ticker (FOX) for /me:finance-report-detail — reused-script stale text, percent-format truncation, and missing row-groups/collapse step
metadata:
  type: feedback
---

Building FOX (29/7/2026) surfaced 3 real defects that the skill's stated QA step ("grep toàn sheet check #REF!/#NAME?/#N/A") did NOT catch, because none of them are formula errors — they're silent content/formatting carryovers from copying the previous ticker's (VEA's) workflow. User caught #3 by inspection after I reported the build "done"; I only found #1/#2 myself by re-reading cell values, not by running any scripted check. All 3 need to become an explicit checklist, not something re-derived from scratch each time:

**1. Stale ticker-specific narrative text in reused build scripts** — `finance-report-detail-build-dinh-luong.js` / `-build-dinh-gia.js` are edited in place per ticker (only the `MARKET` object is "meant" to change), but several rows also carry hardcoded prose written for the previous ticker (e.g. VEA's stock-split note "GẤP ĐÔI số CP IPO 2016..." baked into the BVPS row). Editing only `MARKET` silently carries wrong claims into the new sheet.
→ Fix: after running the build script, grep the new sheet's text cells for the *previous* ticker's numbers/name before moving on.

**2. Percent-format precision inherited from the wrong scale** — the THANH KHOẢN turnover row (GTGD÷vốn hóa %) uses a copied `0.0%` (1-decimal) format tuned for FPT/VEA's larger turnover (0.26-0.88%). A low-liquidity ticker's turnover (FOX: 0.0018-0.0547%) rounds to "0.0%" for 3 of 4 columns — reads as a data error, not truncation.
→ Fix: pull `userEnteredValue.numberValue` + `numberFormat.pattern` via `spreadsheets.get({includeGridData:true})` for that row; widen to `0.0000%` if the smallest nonzero value would display as 0.

**3. Missing row-groups/collapse step on "Định lượng - <TICKER>"** — across ALL 3 reference workbooks (FPT, VEA, SAB), the pattern is: raw `<TICKER>` sheet AND `Định lượng - <TICKER>` BOTH get `finance-report-detail-apply-row-groups.js` run on them (29 rowGroups + 1 columnGroup each, collapsed by default) — never the other 4 sheets (Định tính/Định giá/Benjamin Graham/Báo cáo 2, which consistently have 0 groups across all 3 references). I ran the row-groups script only on the raw sheet for FOX and forgot the `Định lượng` copy — the two sheets share the exact same first-202-rows layout, so the same script/args apply to both, just with a different sheet-name argument.
→ Fix: `finance-report-detail-apply-row-groups.js` must run TWICE per new ticker — once for `<TICKER>` and once for `Định lượng - <TICKER>` — verify with `spreadsheets.get({includeGridData:false})` reading `.rowGroups.length` on both sheets before calling the build done. This is now step-6-QA-worthy: compare `rowGroups.length`/`columnGroups.length`/`merges.length` across all 6 new sheets against the equivalent counts on the most recent reference ticker (e.g. SAB) — any sheet-for-sheet mismatch in those 3 numbers is the fast, generic way to catch this whole class of bug without knowing in advance what the diff will be.

**Why this matters generally:** none of these are "new" mistakes requiring new judgment — they're mechanical copy-paste omissions from treating a per-ticker script/process as fully generic when it's actually "last ticker's file with some numbers swapped." A single generic check (row/column/merge-group count diff against the reference ticker, per sheet) would have caught #3 immediately and is cheap to run every time.
