---
name: feedback_ctck_build_from_vix_template_cafef_gaps
description: Securities-co (CTCK) finance-report-detail builds — copy VIX sheets as template; cafef CTCK LCTT is empty for all years, years can be missing; service account cannot create spreadsheets
metadata:
  type: feedback
---

Learned building SSI (26/10/2026); TCX (Techcom Securities) showed the same pattern.

- **cafef LCTT for CTCK is EMPTY every year** (SSI, TCX — all HDKD/HDDT/HDTC/HDMG values 0). Use FireAnt aggregate 5 rows (`fetchFireAntBCTC(...).lcttG`), detailed only where a PDF was transcribed. User approved this (SSI).
- **cafef can drop a whole year**: SSI 2023 = type "K" all zeros. Fallback: ssi.com.vn IR pages (`/quan-he-nha-dau-tu/bao-cao-tai-chinh?page=N`, PDF links in raw HTML) → scanned PDF → pdftoppm 170dpi → vision. Validate transcription by the PDF's prior-year column vs cafef (cafef rounds to 10k VND) and FireAnt CF totals.
- **Fast path for CTCK**: `spreadsheets.sheets.copyTo` the 6 VIX sheets (12lzXRnCjOzUAkvn-vpb8LtB3Ohfd0dYoVxc3YWP9kDw) → keeps styling + 25 row groups; raw row layout identical (rows 68 TTS, 112 VCSH, 152 DTHĐ, 198 LNST, 199 LNST mẹ, 115 vốn góp, 130 NCI, ratio block Định lượng 334+). Delete extra columns, rewrite values, rewrite narrative sheets in same row layout.
- `build-raw-sheet.js --data-file=<merged.json>` added for merged (cafef+PDF+FireAnt) input; EPS regex fixed (code 500 "THU NHẬP THUẦN TRÊN CỔ PHIẾU" is VND total, not per-share — VIX sheet row 214 still has the old bug).
- `fetch-cafef.js` keepAudited drops a year filed only as "K" when other years are "HK" (VIX/VND 2025) — for peer comparisons hit the cafef API directly and pick year 2025 any type.
- **Service account cannot create spreadsheets** ("caller does not have permission"), Drive connector lacks write scope → ask user to create an empty sheet and share Editor to daily-agent@daily-agent-490610.iam.gserviceaccount.com.

- **TCX build (26/10/2026):** raw sheet `TCX` row layout identical to VIX → copyTo VIX + delete cols from index 7 (6 years). Gotchas: row 130 NCI is text " - " → wrap `N()` in formulas; cell text starting with "=" becomes #ERROR!. Only 6 cafef years (2020-2025, K).
- 🔴 **Share count for P/E, P/B = CURRENT shares from vietstock (MarketCapital ÷ ClosePrice), NOT vốn góp/10,000 from last BCTC.** TCX had 2 bonus issues in 2026 (2,311→3,329tr) — first build understated P/E 11.8x vs real 17.0x, P/B 1.52 vs 2.19, flipped 2 Graham criteria. Check getpricehistory MarketCapital/ClosePrice history for share-count jumps on every build.
**Why:** these gaps cost several rounds of discovery on SSI.
**How to apply:** for any CTCK ticker, check cafef year types + LCTT emptiness first, ask user about PDF/FireAnt in one question, and ask for the spreadsheet up front. Related: [[project_finance_report_detail_skill]], [[feedback_cafef_incomplete_fireant_alternative]].

**🔴 Stale share count (caught on SSI after user shared a broker-report sheet):** P/E/P/B from FY-end charter capital ÷ 10k missed 2026 rights issue + 5:1 bonus (2,078M → 3,001M shares, mcap off by ~45%). Always value on TTM + current shares: vietstock `MarketCapital` (getpricehistory, Cols VHTT) ÷ cafef last-4-quarter LNST CĐ mẹ (code 201) / latest-quarter VCSH − NCI (400 − 418). Cross-check EPS/BVPS vs a recent broker report (SSI: 1,600/13,525 matched Beta exactly). `build-raw-sheet.js --quarters=N` appends quarter columns so formulas can reference them.
