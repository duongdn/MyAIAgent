---
name: feedback_vea_kqkd_code24_27_swap
description: VEA — cafef mislabels "Phần lãi/lỗ LDLK" (code27) as "Trong đó CP lãi vay" (code24) pre-2026Q1; fixed with per-ticker code swap, not a general bug
metadata:
  type: feedback
  modified: 2026-08-20T09:00:00Z
---

User (DuongDN) 2026-08-20: "review lại VEA, sao info nó khác hẳn so với [sheet cũ 17vER...], nhất là dòng '- Phần lãi/lỗ trong công ty liên doanh, liên kết' sao biến mất rồi"

**Root cause:** cafef's KQKD API for VEA stuffed the real "Phần lãi/lỗ trong công ty liên doanh, liên kết" value (VEA's core JV income from Honda VN/Toyota VN, ~1,000-2,000 tỷ/quý) into **code 24** — whose template label is "- Trong đó: Chi phí lãi vay" — for all periods before Q1/2026, while **code 27** (the correct label for that line) held 0. Starting Q1/2026, cafef corrected the mapping: code 27 gets real data and code 24 collapses to ~0. Confirmed via quarterly signature: avg code24 before cutover ~1,748 tỷ → avg after ~0.4 tỷ (dropRatio 0.000) — same field moved, not two coexisting line items.

**Verification method:** scanned all 55 built tickers for the same "code27 turns on in 2026Q1 while code24 was previously substantial" pattern. 14 other tickers (PLX, MCH, GEX, ACV, REE, MWG, VIC, FPT, SAB, VNM, GMD, DPM, HVN, SIP) also gained code27 data in 2026Q1 — but their code24 stayed substantial afterward too (real interest expense continuing alongside a genuinely new disclosure line cafef started reporting). Only VEA shows the "value moved" signature (code24 collapses to near-zero). **Do not swap for those 14 — they are correct as-is.**

**Fix implemented in `scripts/finance-quantification-build.js`:**
- `KQKD_CODE_SWAPS` map (ticker → `[[codeA, codeB]]`) + `applyKqkdCodeSwaps()`, called in `main()` right after cafef fetch (only when `src === "cafef"`).
- Swap only applies per-period where the target code (27) is 0 and the source code (24) is nonzero — so post-2026 periods (already correctly on code27) are untouched even on rebuild.
- Currently: `VEA: [["24", "27"]]`.

**How to apply:** If another ticker's numbers look economically implausible for their label (e.g. huge "chi phí lãi vay" for a low-debt company), check cafef's raw per-period `code` values directly (not just the template label) for a similar cutover pattern before assuming script bug — see [[feedback_newly_listed_ticker_thin_cafef_data]] for the same "verify cafef's own data before trusting labels" principle. Extend `KQKD_CODE_SWAPS` with `[ticker]: [[codeA, codeB]]` for any newly confirmed case.
