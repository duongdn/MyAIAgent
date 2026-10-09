## Scrin.io — 09:19 (+07:00)
- Yesterday (Mon 04/05): TuanNT/John Yi Scrin.io = 4.03h (4h 02m, 242m: 75+20+147) | Task log John Yi = 4.00h (W22 Mon row5, owner=TuanNT) | Status: OK

### Method
- API: POST https://scrin.io/api/v2/GetReport with X-SSM-Token, body `{"isYesterday": true}` — returned 3 segments for Nick @ John Yi (only active company).
- Task log: sheet `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ` W22, Mon 04/05/26, single Task dự án row owner=TuanNT, 4h.

### Tasks logged in Scrin (Mon 04/05)
- 07:52–09:07 (1h 15m) checking issue facebook
- 09:11–09:31 (0h 20m) checking issue facebook
- 09:33–12:00 (2h 27m) checking issue facebook

### Notes
- Rule (`feedback_upwork_match_not_alert`): task log h <= Scrin h = OK. 4.00 <= 4.03 → OK.
- Previous-day report on 05-04 showed only 0h 22m because Scrin was queried mid-morning before TuanNT finished tracking. Today's GetReport (after EOD) returned the full 4h 02m.
- All 3 Scrin segments have Project="No project" / Note="checking issue facebook" — Scrin.io account configured without per-project tagging, so all hours implicitly belong to the only active company (266977 john yi).
