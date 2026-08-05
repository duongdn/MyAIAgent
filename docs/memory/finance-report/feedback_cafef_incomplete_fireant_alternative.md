---
name: feedback_cafef_incomplete_fireant_alternative
description: FireAnt fallback IMPLEMENTED 2026-08-05 — but cafef BVH verified COMPLETE; FireAnt LCTT is aggregate-only so prefer cafef always
metadata:
  type: feedback
  modified: 2026-08-05T16:20:00Z
---

User (DuongDN) feedback 2026-08-05: cafef.vn seems incomplete for some companies (BVH et al.) — confirmed with Quyền; asked if data can be pulled from FireAnt instead. **Resolved:** FireAnt fallback implemented (2026-08-05) in `scripts/finance-fireant.js`, wired into `scripts/finance-quantification-build.js`.

**Key correction after verification:** BVH is actually **COMPLETE on cafef** — 68-row insurance CDKT + 54-row insurance KQKD (premiums/reinsurance/claims/reserves, all populated) + 37-row detailed LCTT, EPS=3,821, balance reconciles. The "cafef incomplete" report did NOT reproduce for BVH via the API. So **always prefer cafef**; only fall back to FireAnt when cafef genuinely returns <3 audited years or errors.

**FireAnt technicals (for reuse):**
- API base `https://api.fireant.vn` (IIS/.NET), requires `Authorization: Bearer <token>`.
- Anonymous token = public JWT embedded in fireant.vn's web bundle: fetch `https://fireant.vn/` → regex `_next/static/chunks/pages/_app-[a-f0-9]+\.js` → fetch bundle → regex `ANONYMOUS_ACCESS_TOKEN="([^"]+)"`. Auto-refreshes (rotates on redeploy). Cached in `config/.fireant-token.json` (gitignored). No login needed.
- Endpoint: `GET /symbols/{T}/financial-data?type=balanceSheet&count=60` → array of `{year, quarter, companyType, financialValues}`. `quarter===0` = annual, 1–4 = quarterly. `financialValues` = 419-field superset (incl. insurance/securities-specific like `PremiumFromDirectInsurance`, `UnderwritingReserve`). `TotalAsset === TotalCapital` reconciles exactly (verified VEA, MWG, HCM, BVH).
- Rows are English field names, NOT VAS codes — mapped to VN labels in the module's static `TN`/`NV`/`KQKD`/`LCTT_ROWS` tables.
- ⚠️ **LCTT is aggregate-only** (5 rows: op/invest/financing totals + beginning/end cash). FireAnt's API does not expose granular LCTT items. So a FireAnt-built sheet has far fewer LCTT rows than a cafef-built one.
- `financial-reports` and `full-financial-reports` endpoints: `financial-reports` returns only a 5-row summary (ignores type); `full-financial-reports` returns "request is invalid". Not usable for full BCTC.

**How to apply:** Keep cafef primary. FireAnt auto-triggers only when cafef gives <3 audited years (or fetch error); or force per-ticker with `--fireant`. If a user reports a specific ticker as incomplete, verify the actual cafef API rows first (like BVH turned out complete) before switching source. Document FireAnt endpoint in [[reference_cafef_data_source]] for the finance-report-detail skill if that tool ever needs the fallback too.
