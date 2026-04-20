# Piece 5 — Scrin.io (Monday 2026-04-20)

**Employee:** Nick (TuanNT) | **Company:** john yi (ID 266977) | **Employee ID:** 453601
**Method:** API login OK (token `35592lf5e30c8242a597ca57d97ba9e9d84991`); per-day data via puppeteer timeline scrape (API v2 GetReport returns monthly aggregates only).

## Fri 2026-04-17 (yesterday / last working day)

| Metric | Value |
|---|---|
| Day total | **0h 00m** |
| Tasks | none |
| Week total (W3: Apr 13–17) | **20h 22m** |
| Month total (Apr) | 45h 46m |

## Week breakdown — Apr 13–17 (last week, W3)

| Date | Day total | Main task(s) |
|---|---|---|
| Mon 04-13 | 4h 03m | handle homepage Elementor AM |
| Tue 04-14 | 4h 17m | handle homepage Elementor AM |
| Wed 04-15 | 8h 01m | Elementor AM 6h54m + Missing times 1h07m |
| Thu 04-16 | 4h 01m | Elementor AM 2h36m + wpengine security 1h25m |
| Fri 04-17 | 0h 00m | (Nghỉ cả ngày) |
| **Week** | **20h 22m** | — |

## This week start — Mon 2026-04-20

| Metric | Value |
|---|---|
| Today day total | 0h 00m (no tracking yet, early morning) |

## Verdict

- Fri 2026-04-17: Scrin 0h 00m. Task log (per 04-17 refresh report) also 0h / "Nghỉ cả ngày". **Match — OK.**
- Week W3 (Apr 13–17): Scrin 20h 22m vs TuanNT John Yi task log 20.3h (from 04-17 daily report). **Match — OK, no over-inflation.**
- Rule check: TuanNT John Yi task log (≤ Scrin) holds. No alert.

## Notes
- API v2 `GetReport` with `isYesterday:true` returns "yesterday = Sunday 04-19" (empty, weekend) — not useful here. Endpoint with `dateFrom/dateTo` returns monthly-aggregated charts, not per-day day totals. Per-day data obtained via puppeteer `timeline` page scrape.
- Known TZ bug in `scripts/scrin-login.js --week` mode (labels shifted by 1 day due to `toISOString` on local date); raw day values still correct — labeled correctly in table above after manual realignment.

## Unresolved Questions
1. Should the week-mode TZ bug in `scripts/scrin-login.js` be fixed (use local date string builder instead of `toISOString().slice(0,10)`)? Low priority — raw per-day totals are correct.
