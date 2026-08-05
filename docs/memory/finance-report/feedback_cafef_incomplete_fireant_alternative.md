---
name: feedback_cafef_incomplete_fireant_alternative
description: cafef.vn missing data for many tickers (e.g. BVH) — user confirmed with Quyền; investigate FireAnt (fireant.vn) as alternative BCTC source
metadata:
  type: feedback
  modified: 2026-08-05T15:44:00Z
---

User (DuongDN) feedback 2026-08-05: cafef.vn has incomplete data for many companies — BVH (Bảo Việt Holdings) and others return gaps/empty fields on the cafef site. User asked Quyền, who confirmed the site is missing information for these companies. User asks whether data can be pulled from **FireAnt** (fireant.vn) instead.

**Why:** cafef is the current primary source for `/me:finance-report-detail`, `/me:finance-quantification`, and the web quantification tool (`scripts/finance-quantification-build.js`). If cafef's source itself is incomplete for a ticker (not a fetch bug on our side — the API returns `type K`/`HK` data but the underlying numbers are missing), no amount of client-side fixing recovers the data. BVH is a real example: BCTC rows come back blank.

**How to apply:** When a ticker yields `NO_DATA` / `0 năm` or visibly empty BCTC rows on cafef AND the ticker genuinely has published statements, do NOT immediately report "no data" — check FireAnt as a fallback source before concluding. FireAnt (fireant.vn) exposes BCTC via its own API (`https://api.fireant.vn/...`, requires a token/authed headers — research the current endpoint + auth method before using). Verify FireAnt data reconciles (balance sheet Σassets == Σliabilities+equity) before trusting it, same QA as cafef. Add FireAnt as a secondary fetcher in the build script behind a cafef-fallback, and document the endpoint in [[reference_cafef_data_source]]. Open question: FireAnt data licensing/rate limits + whether it covers audited (type HK) annual series as completely as cafef does for the common tickers.
