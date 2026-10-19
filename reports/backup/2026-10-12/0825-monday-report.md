# Monday Report — Week 2026-10-05–2026-10-11

**Submitted:** 2026-10-12 08:25 +07 | **Mode:** LIVE | **Form submissions:** 8/8 ✓ | **Trello:** 8/8 marked complete

---

## Submitted Data

| Project | Dev Hours | Internal Bugs | External Bugs | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 6.5 | 0 | 3 | Logout not working after app relaunch; RMS5 error on Enable+Listed; Xero payout batch failed (retried) |
| Aysar Khalid - Baamboozle | 17.5 | 0 | 0 | No client-reported bug; sign-in issue was cache, dark-mode spec = design request |
| James Diamond - Portfolio | 60 | 0 | 1 | UI contrast wrong (dark text on dark bg) |
| Bailey Joey - Speedventory | 71.25 | 22 | 0 | All internal QC (Advanced Split Order, Auto Stock Refill) |
| Marcel Fuessinger - Tokenlite | 1 | 0 | 1 | FIN/NRIC duplicate validation not working |
| Neural Contract - Neural Contract - Test Job | 0 | 0 | 0 | No activity this week |
| Raymond Huang - LegalAtoms | 0 | 0 | 0 | Tracking discontinued |
| Andrew Taraba - Portfolio | 9 | 0 | 0 | TuanNT 9h (Workstream) |

---

## Data Sources

- **Dev hours:** All Summary sheets stale 0.00 → Workstream weekTotal (workstream-fetch-project-week.js 2026-10-05, now incl. andrew_taraba). Maddy = LongVV only (6.5; LuHX 1 excluded). JD = LeNH 40 + AnhNH2 20. Bailey = Speedventory 6 members. Marcel = DuongDN 1. Neural no WS members. LegalAtoms policy 0.
- **Internal bugs:** Redmine tracker_id=1, created 10-05..10-11: maddy 0, james-bonsey-jaden 0, bailey-paturevision 22 (none "external").
- **External bugs:** Slack Xtreme (129 msgs), Baamboozle (89), Equanimity (41); Discord AirAgri nusvinn (132 msgs), Bizurk nuscarrick 0 msgs.

## Caveats

- Maddy: LIFM2-468 quote-tool "not fixed" rows = continuation of prior-week bug (merged); Xero connection expiry resolved 10-05, excluded.
- JD: induction-check question treated as feature ask.
- Marcel: Bangladesh nationality value merged into last week's nationality bug; trailing-space nationality excluded (normalizer already handles).
- Data confirmed by user re-running with --live.
