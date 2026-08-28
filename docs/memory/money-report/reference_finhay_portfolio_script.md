---
name: reference_finhay_portfolio_script
description: "Finhay (invest.fhsc.com.vn, VinaSecurities API) fund-value auto-fetch is live via scripts/finhay-portfolio-report.js — total NAV + P/L only, no itemized fund-certificate breakdown yet"
metadata: 
  node_type: memory
  type: reference
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T07:22:16.429Z
---

Finhay's wallet in MISA is a FUND holding (VCBF/etc funds distributed via Finhay), not individual stocks — its own stock trading sub-accounts are near-zero. Real web portal: `invest.fhsc.com.vn` (branded "Finhay Securities", backed by `api.vinasecurities.com`).

**Working script:** `scripts/finhay-portfolio-report.js` (headless by default, `--headed` for first manual login — email/password/OTP, no autofill attempted per the VCBS lesson). Profile: `tmp/finhay-chrome-profile/`.

**Key gotcha:** `api.vinasecurities.com` endpoints could NOT be called via manual `page.evaluate(fetch(...))` injection — every attempt returned `"Failed to fetch"`, even with the `access_token` (JWT) from `localStorage.access_token` attached as `Authorization: Bearer`. Almost certainly a CORS preflight rejection (adding a custom header turns a simple GET into a preflighted request the API's CORS policy doesn't allow from an injected context). **Workaround used:** passively intercept the response the SPA's own bundled JS makes on page load via `page.on('response')`, instead of firing our own fetch — same technique as `scripts/broker-portfolio-discover.js`.

**Endpoint captured:** `GET https://api.vinasecurities.com/accounts/v3/users/{userId}/assets/summary` → `{ net_asset_value, products: {fund, stock, bond, ...}, pnl: {fund: {pnl, pnl_rate}} }`. Confirmed 2026-08-28: NAV 68,178,830 ₫, 100% in fund, P/L −1,764,833 (−2.52%) — vs MISA's manual estimate 74,404,069 (≈8.4% off, normal variance).

**Not yet found:** itemized per-fund-certificate holdings (which specific VCBF/other fund, units, NAV/unit). Clicking into fund detail on the web app redirects to an app-store deep link (dead end on web) — no in-browser fund-detail page exists. If this is needed later, try guessing/discovering further `fund/*` endpoints with the bearer token attached via the SAME passive-interception technique (navigate to a URL that triggers the SPA to fetch it) rather than manual injection, since manual injection is blocked by CORS for this API.

See `.claude/commands/me/money-report.md` Piece 8 for the full broker-automation picture (FPTS, VCBS, Finhay all now live; VCBF still pending — depends on which channel the user bought it through).
