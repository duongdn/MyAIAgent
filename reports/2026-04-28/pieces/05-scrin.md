## Scrin.io — 08:20 (+07:00)

**Employee:** TuanNT (Scrin display name "Nick", ID 453601)
**Company:** john yi (ID 266977)
**Window:** 2026-04-22 (Wed) → 2026-04-28 (Tue, today)
**Method:** API v2 `POST /api/v2/GetReport` with `X-SSM-Token` header (token from `config/.scrin-config.json`); `body[]` per-task entries filtered by Date locally. No browser/login needed — token still valid.

| Date | Scrin.io hours | John Yi sheet hours | Status |
|------|----------------|---------------------|--------|
| 2026-04-22 (Wed) | 4.07h | 4.00h | OK |
| 2026-04-23 (Thu) | 4.35h | 4.33h | OK |
| 2026-04-24 (Fri) | 1.28h | 1.25h | OK |
| 2026-04-25 (Sat) | 0.00h | 0.00h | OK (weekend) |
| 2026-04-26 (Sun) | 0.00h | 0.00h | OK (weekend) |
| 2026-04-27 (Mon) | 0.00h | 0.00h | OK (no work logged) |
| 2026-04-28 (Tue) | 0.32h | 0.00h | OK (early morning) |

**Week total:** Scrin.io **10.02h** vs Sheet **9.58h** — **OK** (sheet ≤ scrin every day, no over-inflation)

**Alerts:**
- None.

### Detail
- Sheet rows pulled from `1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ` tabs `W20` (covers 20-26/04) and `W21` (covers 27/04-03/05). Filter: col A == "Task dự án", col G owner == "TuanNT", col H = hours.
- Sheet entries Wed-Fri all have a single "Task dự án" row each:
  - 22/04: 4.00h — handle staging homepage Elementor AM
  - 23/04: 4.33h — production homepage Elementor + Fix screen 1056px
  - 24/04: 1.25h — production homepage Elementor AM
- Scrin entries match the same tasks, all online (no offline blocks):
  - 22/04: 244min (220+24) staging homepage Elementor AM
  - 23/04: 261min (59+182+20) Elementor + screen fix
  - 24/04: 77min (70+7) production homepage Elementor AM
  - 28/04: 19min (08:04-08:23) "feeback home page" — earliest entry of today; not yet posted to W21 sheet.
- W21 sheet row for TuanNT/Mon 27/04 is empty — TuanNT did not log time there. Need to confirm with Slack/Trello whether 27/04 was a leave day or simply unrecorded; this is a separate issue (Piece 4 task-log scope), not a Scrin alert.

### Auth
- API token `35592lf5e30c8242a597ca57d97ba9e9d84991` valid; no refresh required.
- Note: `dateFrom`/`dateTo` filter is ignored by `/api/v2/GetReport` — body returns full history; per-day totals derived by filtering `Date` field client-side.

### Comparison rule
TuanNT John Yi sheet hours ≤ Scrin.io hours = OK (rule satisfied every day).
Compare ONLY John Yi sheet, not TuanNT combined total — confirmed.
