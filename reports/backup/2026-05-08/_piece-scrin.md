# Scrin.io — Thu 2026-05-07

## Source
- API: `POST https://scrin.io/api/v2/GetReport` with `isYesterday: true`
- Auth: `__RequestVerificationToken` from login page → POST /login → extract `apiToken` (`var apiToken = "..."`)
- Company: john yi (266977) | Employee: TuanNT/Nick (453601)
- Script: `scripts/scrin-fetch-yesterday.js`

## Scrin tracked time (Thu 07/05/26)

| Block | From | To | Duration | Project | Note |
|-------|------|------|----------|---------|------|
| 1 | 08:31 AM | 12:32 PM | 241 min (4h 01m) | No project | payment process Authorize.net |
| 2 | 01:18 PM | 02:07 PM | 49 min | No project | payment process Authorize.net |
| 3 | 02:43 PM | 05:27 PM | 164 min (2h 44m) | No project | payment process Authorize.net |
| **Total** | | | **454 min (7h 34m / 7.57h)** | No project | payment process Authorize.net |

- Project tag: "No project" (untagged, same pattern flagged yesterday)
- Single client/note: "payment process Authorize.net"

## TuanNT John Yi task log (sheet 1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ, W22, Thu 07/05/26)

| Owner | Hours | Description |
|-------|------:|-------------|
| TuanNT | 7.50h | payment Authorize.net plugin production site / Update code logic payment thank you |

- Total John Yi sheet hours for TuanNT Thu: **7.50h** (single row)
- Description matches Scrin note ("payment process Authorize.net" ↔ "payment Authorize.net plugin production site")

## Cross-check

| Source | Hours | Notes |
|--------|------:|-------|
| Scrin (Authorize.net work, "No project") | 7.57h | 454 min |
| John Yi sheet (TuanNT Thu) | 7.50h | 1 row, Authorize.net plugin |
| Δ | +0.07h (~4 min) | within rounding tolerance |

## Findings

- Scrin tracking 7h 34m on Authorize.net matches John Yi task-log entry of 7.50h within ~4 min (rounding).
- Same pattern as yesterday: Scrin labels Authorize.net work as "No project". Cross-reference with John Yi sheet confirms the work IS John Yi project content (Authorize.net plugin on production site).
- No discrepancy beyond known untagged-project quirk; hours reconcile.

## Status

OK (with known issue: Scrin "No project" tag persists for Authorize.net work — same as yesterday's flag). Hours reconcile across both sources.

## Unresolved questions

- Should Scrin "No project" → John Yi project tagging be fixed at the timer-config level (one-time setup) so future days don't need cross-reference? Same flag raised yesterday.
