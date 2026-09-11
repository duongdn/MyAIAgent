---
name: feedback_cafef_systemic_code_shift_audit
description: cafef has a recurring systemic bug class (found 3x) where inserting a new report line shifts older periods' codes without re-keying — fixed with a reusable applyChainShift mechanism plus a standing self-audit (numbering-gap + contra-sign) that now runs on every build
metadata:
  type: feedback
  modified: 2026-09-11T10:40:00Z
---

User (DuongDN) 2026-09-11: "Anh Dương ơi, tool của mình bị lệch dòng... Mã MWG" (screenshots) then, after the 3rd instance was found: "Vấn đề, case này xảy ra rất nhiều, cần solution giải quyết triệt để" ("this keeps happening, need a definitive/systemic solution").

**Pattern (found 3 separate times, always the same shape):** around a cafef backend change (mostly clustered at Q1/2026), cafef inserted a new line item into a report template. For periods BEFORE that change, the raw API keeps returning data keyed to the OLD code layout — which is shifted N slots relative to the CURRENT template — until the new line's code is finally populated. Confirmed cases:
1. KQKD codes 21→22→23→24→27 ("Doanh thu HĐTC" chain, ending at the new "Phần lãi/lỗ LDLK" line) — ~20/55 tickers, see [[feedback_vea_kqkd_code24_27_swap]].
2. CDKT "Các khoản phải thu ngắn hạn": template itself missing item name "5. Phải thu về cho vay ngắn hạn" (numbering jumped 4→6) — universal, all 55 tickers, pure label bug (values were always on the right code).
3. CDKT "Các khoản phải thu dài hạn" codes 215↔216 — pre-2026 periods put "Phải thu dài hạn khác"'s value at code216 ("Dự phòng phải thu dài hạn khó đòi") instead of 215, leaving 215 at 0 and 216 looking like a giant positive "dự phòng" (impossible for a contra-account) — universal (VNM, FPT, MWG, VEA, HAG, REE all confirmed).

**Root fix — `scripts/finance-quantification-build.js`:**
- `applyChainShift(periods, chain, isPreCutoverFn, direction)` — generalized, reusable chain-shift undo. `direction: "up"` (KQKD: raw[i] holds true[i+1]'s value) vs `"down"` (CDKT receivables: raw[i] holds true[i-1]'s value) — the two confirmed cases shift in OPPOSITE directions, so this is a required parameter, not a constant. Gated on: the ticker's data shows BOTH a pre-cutover and a post-cutover period (skips tickers whose template never had this shape at all).
- `fixCdktTnTemplateGap` — pure label correction for the missing "Phải thu về cho vay" item. Matches by the **exact broken source text**, never blindly by code number — banks/securities/insurers reuse codes 135-137 for entirely different line items (verified: VND/SSI code137 = "Tài sản ngắn hạn khác", not a receivables line at all). Blindly relabeling by code silently corrupted VND/SSI on the first pass — caught only because the new self-audit (below) flagged it.

**Standing self-audit (the "triệt để" part — runs on EVERY build, not just when investigating a report):**
- `auditTemplateNumbering(template, label)` — parses each row's leading integer item-number ("5. Foo", including missing-space cafef quirks like "6.Foo"), skips decimal sub-items ("7.1 Foo"), and WARNs when the sequence isn't 1,2,3... This is what would have caught bug #2 above on day one instead of waiting for a screenshot.
- `auditContraSign(template, yrsData, label)` — WARNs when a row named "Dự phòng"/"hao mòn lũy kế"/"khấu hao lũy kế" is positive in the majority of periods (>1 tỷ magnitude) — contra-assets must be ≤0. This is what would have caught bug #1 and #3.
- **Scope matters — both checks are CDKT-Tài-sản-only** (`cf.tnT`/`cf.tnY`), not NV (liabilities: "Dự phòng phải trả" is a genuine positive liability) and not KQKD (income statement: "chi phí dự phòng" — credit-risk provision for banks, technical provisions for insurers, impairment charges for securities firms — is a genuine positive EXPENSE line, not a balance-sheet deduction). Running the sign-check on NV/KQKD produced ~30 false positives across bank/insurer/securities tickers on the first pass.
- Banks/insurers/securities firms use structurally different CDKT templates (extra decimal sub-items, reinsurer-recoverable "Dự phòng" that's a genuine asset, off-balance-sheet commitment sections) that still trip a few numbering-gap false positives (VPB/VIB/ACB/BID/MBB/CTG/VCB/TCB, BVH) — these are template-shape noise, not bugs; left as known residual since chasing every sector-specific template shape wasn't in scope.

**How to apply:** when a build's stdout shows `WARN: [audit] ...`, that's the audit surfacing a candidate — investigate before assuming it's real (as VND/SSI proved, a naive fix can itself be the bug). Verify via magnitude continuity across the suspected cutover boundary (fetch raw cafef quarterly data directly, compare Q4/2025 vs Q1/2026-ish) before writing a fix; only add to `KQKD_CHAIN`/`CDKT_TN_RECEIVABLE_LT_CHAIN`-style chains (or a new one) once confirmed, and always gate any label fix by exact source text, never by code number alone.
