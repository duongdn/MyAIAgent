---
name: feedback_newly_listed_ticker_thin_cafef_data
description: Newly-listed tickers (e.g. HPA) genuinely have <3 audited years on cafef — don't auto-fallback to FireAnt, use --cafef/--force flags instead
metadata:
  type: feedback
  modified: 2026-08-06T12:00:00Z
---

User (DuongDN) 2026-08-06: "HPA mã này ko có info gì vậy ta" — tab HPA only had 90 rows (FireAnt fallback output).

**Root cause:** HPA (CTCP Phát triển Nông nghiệp Hòa Phát) newly listed 2025 — cafef genuinely only has 1 audited year (2025) + 3 recent quarters (Q4/2025–Q2/2026). The old auto-fallback rule (`<3 years → try FireAnt`) treated this as "cafef insufficient" and switched source. But FireAnt's HPA data is **misleading**: it has entries back to 2009-2012 at ~1/50th the 2025 asset scale — almost certainly a **different company that previously held the HPA ticker code before delisting** (VN market reuses ticker codes). Blending that into one sheet would misrepresent HPA's real history.

Also hit `BALANCE_MISMATCH: 2025 chênh=30.000.000đ` (mã 270 vs 440) — a genuine but negligible (0.0000006%) discrepancy in cafef's own published 2025 report, not a script bug.

**Fix implemented in `scripts/finance-quantification-build.js`:**
- New `--cafef` flag: force cafef-only, skip the auto-fallback-to-FireAnt-on-<3-years logic (still falls back on genuine fetch *errors*). Accepts as few as 1 audited year.
- New `--force` flag: skip the 270/440 balance-sheet reconciliation check for tickers with known tiny source-data noise.
- Default behavior (no flags) unchanged: cafef first, auto-fallback to FireAnt on fetch error or <3 years — still correct for tickers where cafef is *actually* missing data (vs. genuinely-thin because newly listed).

**How to apply:** When a ticker looks "empty" or thin, check row count and which source built it (cafef vs FireAnt) before assuming a bug. If FireAnt has a suspicious multi-year gap with a large scale jump (e.g. 50x), that's a strong signal of ticker-code reuse — rebuild `--cafef --force` instead of trusting the FireAnt blend. See [[reference_cafef_incomplete_fireant_alternative]] for the FireAnt LCTT-aggregate-only limitation (same "verify before trusting fallback" principle).
