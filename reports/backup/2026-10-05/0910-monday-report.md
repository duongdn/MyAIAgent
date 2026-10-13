# Monday Report — Week 2026-09-28–2026-10-04

**Submitted:** 2026-10-05 09:10 +07 | **Mode:** LIVE | **Form submissions:** 8/8 ✓ | **Trello:** 8/8 marked complete

---

## Submitted Data

| Project | Dev Hours | Internal Bugs | External Bugs | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 3.25 | 0 | 3 | Sold items wrongly set to draft; payout-bracket override ignored in payout calc (urgent prod fix); quote tool not returning results |
| Aysar Khalid - Baamboozle | 13.33 | 0 | 2 | DynaPuff font broken in Baseball mode after font link removed; Dynamic Seating error on existing teams |
| James Diamond - Portfolio | 60.33 | 0 | 0 | Staging QC passes; no new client-reported production bug |
| Bailey Joey - Speedventory | 98.92 | 18 | 0 | All internal QC findings, no client-reported bug |
| Marcel Fuessinger - Tokenlite | 2.67 | 0 | 2 | Ken-Pal devices missing check-ins (~200 vs 400); null nationality in SGBuildex payload (PIN 2408) |
| Neural Contract - Neural Contract - Test Job | 0 | 0 | 0 | No activity this week |
| Raymond Huang - LegalAtoms | 0 | 0 | 0 | Tracking discontinued |
| Andrew Taraba - Portfolio | 1 | 0 | 0 | POS payment modal (TuanNT, 1h) |

---

## Data Sources

- **Dev hours:** All Summary sheets stale 0.00 → Workstream weekTotal (workstream-fetch-project-week.js 2026-09-28). Maddy = LongVV only (3.25; LuHX 8.25 excluded). JD = LeNH 37 + AnhNH2 20 + TuanNT 3.33. Bailey = 7 Speedventory members. Marcel = DuongDN 2.67. Taraba = raw /review/week on WS project cmqyvioez007pqo0xn1iexfg3 (not in script; sheet never filled). Neural no WS members. LegalAtoms policy 0.
- **Internal bugs:** Redmine tracker_id=1, created 09-28..10-04: maddy 0, james-bonsey-jaden 0, bailey-paturevision 18.
- **External bugs:** Slack Xtreme (madhuraka/anomawasala), Baamboozle (skjamie25/iancox890/notmedesign), Equanimity (komal.bailur/marcel); Discord AirAgri (nusvinn, 110 msgs); Bizurk (nuscarrick) 0 msgs. Bailey Redmine "client" hits = client table/Console wording, not external.

## Caveats

- Taraba initially reported 0h; user flagged → found WS project, memory saved.
- Maddy: custom-payout complaint merged into override bug; Anoma ticket-409 QA + Shopify upload error excluded.
- Baamboozle: dark-mode nav/tile changes = design requests, excluded.
- JD: JBS_P_06 no Alert History data (investigated 09-28, likely prior-week report) + fuel-movement staging glitch excluded.
- Marcel: tenant146 log gap excluded (device relocation).
- Redmine curl needs URL-encoded `><` / `|` in created_on — unencoded returns empty.

## Unresolved Questions

- Add Taraba project to workstream-fetch-project-week.js?
