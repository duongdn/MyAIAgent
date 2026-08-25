---
name: feedback_vea_kqkd_code24_27_swap
description: cafef KQKD chain-shift bug (codes 21→22→23→24→27) affects 21+ tickers incl. VEA, MWG — general per-ticker-gated chain-shift fix, not a one-off VEA swap
metadata:
  type: feedback
  modified: 2026-08-25T13:35:00Z
---

User (DuongDN) 2026-08-20: "review lại VEA, sao info nó khác hẳn so với [sheet cũ]... dòng 'Phần lãi/lỗ trong công ty liên doanh, liên kết' sao biến mất rồi"
User (DuongDN) 2026-08-25 (via screenshots, mã MWG): "tool của mình bị lệch dòng"

**Superseded finding:** the 2026-08-20 fix (`KQKD_CODE_SWAPS`, a VEA-only 24↔27 pairwise swap) was **incomplete** — it fixed only the last link of a longer chain and left VEA's "Doanh thu hoạt động tài chính" / "Chi phí tài chính" / "Trong đó CP lãi vay" rows still wrong. Discovered when user reported MWG showing the same symptom.

**Root cause (general, confirmed across VEA + MWG + ~19 others):** cafef added a "- Phần lãi/lỗ trong công ty liên doanh, liên kết" row (code 27) to the KQKD template starting ~Q1/2026. For periods before that cutover, the API keeps returning data on the OLD code layout, shifted one slot lower than the current template: raw code21 holds true code22's value ("Doanh thu HĐTC"), code22 holds code23's ("Chi phí tài chính"), code23 holds code24's ("Trong đó CP lãi vay"), code24 holds code27's ("Phần lãi/lỗ LDLK") — leaving code27 itself at 0. Verified via magnitude continuity across the Q4/2025→Q1/2026 boundary (e.g. VEA: raw24 pre-cutover ~1500-2400B ≈ raw27 post-cutover ~1500-1990B; MWG same pattern for all 4 codes).

**Scan result:** of tickers with any code27 data at all, ~21 affected (PLX, MCH, AIG, GEX, DPM, VCG, HPG, IDC, HVN, BMP, SIP, POW, FPT, SAB, VNM, GMD, VEA, ACV, REE, MWG, VIC, KBC) — essentially all non-bank tickers using this KQKD template shape.

**Fix implemented in `scripts/finance-quantification-build.js`:** replaced the old per-ticker `KQKD_CODE_SWAPS`/`applyKqkdCodeSwaps` with a general `KQKD_CHAIN = ["21","22","23","24","27"]` + `applyKqkdChainShift(kqkdY)`, called unconditionally for every cafef-sourced ticker in `main()`. Per period: only shifts if (a) the ticker's data uses code27 at all in some period (guards tickers with a different/no such template), and (b) that specific period is pre-cutover (code27 === 0). Post-2026 periods and unaffected tickers are untouched.

**Verification:** rebuilt all 55 built tickers (2026-08-25); spot-checked MWG and VEA rows against cafef's own displayed KQKD tab — exact match after fix. Committed `8333cc2`, pushed, deployed to mpfc (`quantification-web` restarted).

**How to apply:** if a ticker's KQKD numbers look implausible for their label again, first check whether this chain-shift already covers it (it's now automatic/general, not per-ticker). If a *new*, different code-misalignment pattern shows up (different code range), extend `KQKD_CHAIN` or add a second general chain rather than a one-off per-ticker patch — the per-ticker approach proved to hide the true scope of this bug for 5 days.
