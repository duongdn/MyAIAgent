# Fountain 5-Part Check — 2026-05-04 (Mon) 08:13 (+07:00)

Window: 2026-04-24 → 2026-05-04 (10-day catch-up). Holidays in window: Apr 30 (Reunification Day) + May 1 (Labour Day).
Active week now = **W25** (May 4 – May 10). Just-completed week = **W24** (Apr 27 – May 3).
Previous report compared against: `reports/2026-04-24/daily-report.md`.

Matrix token expired → refreshed via `scripts/matrix-token-refresh.js` (saved `mat_EZ39hE2y8wnR24Q9Wkoa0XcTYbCKhv_AQwCf2`).

---

## Fountain — Part 1: Matrix Plan

Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`.

**W24 plan** posted by **@trinhmtt** on **2026-04-28 08:20 (+07)** (raw quote, edited form):

> Em gui plan tuan nay ạ
> VuTQ 16h
> ViTHY 16h ← (typo for ViTHT)
> DatNT 16h
> => QC 10,5h

- Devs on plan: VuTQ 16h, ViTHT 16h, DatNT 16h. **Dev plan total = 48h** (reduced for Apr 30 + May 1 holidays — 3-day work week).
- QC plan: 10.5h.
- ThinhT, LamLQ, HaVS not on plan this week (off-plan).
- ThinhT asked the same morning "tuần này a có bn time bên này vậy" → trinhmtt: "Dạ đúng roi" (confirmed not on Fountain plan).

**W25 plan**: NOT YET POSTED at 08:13 today. The W24 plan above is the latest available. Expected today (Mon morning) per pattern — flag if missing by EOD.

---

## Part 2: Actuals (W24 Summary, row 29)

Source: Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` — Summary tab, W24 row.

| Dev | W24 Actual | Charged | Role | Notes |
|-----|----------:|--------:|------|-------|
| VuTQ    | 16.50h | 16.50h | dev | on plan |
| ViTHT   | 16.00h |  0.00h | dev | on plan |
| DatNT   | 16.00h | 11.00h | dev | on plan |
| ThinhT  |  6.00h |  0.00h | dev | off-plan but logged |
| LamLQ   |  0.00h |  0.00h | dev | off-plan |
| HaVS    |  0.00h |  0.00h | dev | off-plan |
| PhatDLT |  3.50h |  0.00h | QC  | |
| HungPN  | 11.00h |  0.00h | QC  | |
| TriNM   |  0.00h |  0.00h | (excluded — not QC per memory `feedback_trinhmtt_not_qc`) |

- **Dev total (on-plan) W24: 48.50h / 48h plan = 101.0%**
- Including off-plan ThinhT: 54.50h dev total
- **QC total W24: 14.50h / 10.5h plan = 138.1%** (PhatDLT 3.5 + HungPN 11.0)
- HungPN now consistently logging — no longer an alert (`feedback_hungpn_not_sole_qc`)

W24 Summary total row D29 = 69.00h actual. Charged D29 = 27.50h (40% rate).

---

## Part 3: Plan vs Actual (W24, completed)

| Dev | Plan | Actual | Δ | Verdict |
|-----|-----:|-------:|--:|---------|
| VuTQ  | 16h | 16.50h | **+0.50h** | MET |
| ViTHT | 16h | 16.00h |  0      | MET |
| DatNT | 16h | 16.00h |  0      | MET |
| QC (PhatDLT+HungPN) | 10.5h | 14.50h | **+4.00h** | OVER (good — staging burndown) |

**Summary: W24 plan met cleanly. Dev 48.5h / 48h plan (101%). QC 14.5h / 10.5h plan (138%).** No behind-plan alerts.

Compare vs W23 (last week reported 04-24): W23 ended **83.5h / 142h plan (58.8%)** — W23 finished significantly behind plan even though plan included LamLQ (0h actual). W24 came in at 100% because plan was rightsized for the 3-day holiday week.

---

## Part 4: Capacity & Runway (Est vs Charged tab)

Sum of `Est − Actual` (clamped ≥0) for filtered statuses.

| Metric | 04-23 (prev) | 04-24 (prev) | 05-04 (now) | Δ vs 04-24 |
|--------|------:|------:|------:|--:|
| Remaining NS+IP                          | 150.75h | 150.75h | **181.25h** | **+30.50h** |
| Remaining broader (excl. Live+Cancelled+N/A) | 230.50h | 250.50h | **255.25h** | +4.75h |
| Runway @ 90h/wk (NS+IP)                  | 1.68 wk | 1.68 wk | **2.01 wk** | +0.33 |
| Runway @ 90h/wk (broader)                | 2.56 wk | 2.78 wk | **2.84 wk** | +0.06 |

NS+IP backlog **+30.5h** since 04-24 — new tasks (#2854 +35.5h rem, #1178 reviews 40h still NS, #2775 navigation refactor 43h rem) added to the pipeline. Largest untouched NS items:
- #1178 fountain/infinity reviews — 40h NS, 0h actual
- #2775 navigation refactor — 60h est, 17h actual, **43h rem** (NS)
- #2854 — 40h est, 4.5h actual, **35.5h rem** (NS)
- #2524 duplicate charge — 24h NS

Runway grew ~2 days (0.33wk) since 04-24 → backlog feeding faster than burn.

---

## Part 5: Over-Estimate Tracking (actual > est × 1.2)

Always-tracked tasks per memory `feedback_over_estimate_tracking`:

| Task | Est | Actual 04-24 | Actual 05-04 | Over% | Status | Growing? |
|------|---:|---:|---:|---:|--------|---|
| **#2595 GiftDrop**          | 120h | 168.25h | **168.25h** | +40%   | Staging        | **stable** (no change in 10 days) |
| **#2615 Gift of Choice**    |  12h | 106.75h | **106.75h** | +790%  | Staging        | **stable** |
| **#2735 Pro Send Smart Link** | 90h | 125.00h | **126.00h** | **+40%** | IP >50%       | **+1.0h in 10d** — basically halted (was +7.5h/day on 04-24) |

**#2735 cooled off significantly** — only +1h since 04-24 vs +7.5h/day previously. No longer a "STILL GROWING" red flag. Likely scope settled.

Other notable +20% over (top 5 by absolute over):
| Task | Est | Actual | Over% | Status |
|------|---:|---:|---:|--------|
| #2627                   | 0.5h |  8.25h | +1550% | Has Bug Live |
| #2615 (above)           | 12h  |106.75h |  +790% | Staging |
| #2639 active/inactive   | 2h   | 16.50h |  +725% | Staging |
| #2630                   | 0.5h |  3.75h |  +650% | N/A |
| #2545 build-a-box modal | 1h   |  7.50h |  +650% | Live |

New entries since 04-24:
- **#2816 (Infinity — Update homepage)**: 20h est → **40.0h actual (+100%)** — Staging. Watch.
- **#2837**: 16h est → 23.5h (+47%) — Staging. Watch.
- **#2815**: 6h est → 10.25h (+71%) — Staging.

---

## Fountain Trello Board ([Web Development](https://trello.com/b/UDrSWage), board `5475eaf923a9a1309357eb51`)

### Customer comments (since 2026-04-24)
**Total: 30 customer comments** (kunalsheth 16 + tmmckay 12 + mike62798179 2 + iris63293413 0).

vs 04-24 report: 21 (kunalsheth 7, tmmckay 4, mike62798179 1) → **+9 customer comments in 10d**, with kunalsheth load most heaviest.

**Hotspots (latest customer pings):**
- [Fountain Pro Build-a-Box NoMethodError pro_cart_items#destroy](https://trello.com/c/) — kunalsheth 2026-05-04 00:18 (today) "customer complained — bug"
- [Fountain — Navigation refactor](https://trello.com/c/Tq5nQQQr) — kunalsheth 2026-05-04 00:10 mobile/desktop tab visibility Q's
- [Infinity — Order 4390256BM](https://trello.com/c/) — kunalsheth 05-01 wrong shipping date
- [Infinity Order — 6358531LG](https://trello.com/c/) — kunalsheth 05-01 May 11 date no extra shipping paid
- [Update field for Holiday Delivery Email](https://trello.com/c/) — kunalsheth 05-01 confirmation email field issue
- [Scheduled Order chose next-day delivery but paid $8](https://trello.com/c/) — mike62798179 04-30
- [Editing Address during checkout not saving](https://trello.com/c/) — mike62798179 04-28 with screen recording
- [Infinity — Build a box](https://trello.com/c/) — tmmckay 05-01 "ready to pick up"
- [Infinity — Browse](https://trello.com/c/) — tmmckay 05-01 "ready to pick up"
- [Infinity — Update homepage](https://trello.com/c/S0M1pEOs) — tmmckay 05-01 final feedback round
- [Fountain — Pro/Send Smart Link](https://trello.com/c/) — tmmckay 05-01 detailed scope reply
- [Fountain — Order flow: Message/Recipient/Delivery](https://trello.com/c/) — tmmckay 05-01 "ready to pick up"

### Active card counts per list
| List | 05-04 | 04-24 | Δ |
|------|------:|------:|--:|
| To-Do          | 34 | 32 | **+2** |
| Bugs           | 14 |  8 | **+6** |
| Doing          |  7 |  6 | +1 |
| QC Internal    |  5 |  6 | -1 |
| QA Backlog     |  4 |  3 | +1 |
| In QA          |  3 |  2 | +1 |
| Not Passed     |  2 |  0 | **+2** |
| **Total active** | **69** | **57** | **+12** |

**Bugs +6** is the biggest single jump. Not Passed +2 means QA bouncing things back.

### Stuck cards (dateLastActivity > 5 days)
**47 stuck** (vs 37 on 04-24, **+10**). Worst:
- 195.9d — [Platform switcher fix](https://trello.com/c/JVLMbyYO) (To-Do)
- 158.7d — [PayPalHttp::HttpError generate_order](https://trello.com/c/6MTnv0Cc) (Bugs)
- 152.0d — [Fountain Pro Backend Updates](https://trello.com/c/kUkibmUS) (To-Do)
- 129.9d — [Fountain Pro roles](https://trello.com/c/q3rvudcU) (To-Do)
- 129.9d — [Duplicate Charge](https://trello.com/c/VXxyO8IW) (To-Do)
- 129.9d — [Suggestion: Unit Test](https://trello.com/c/0jFodYfi) (To-Do)
- 129.7d — [URL is case sensitive](https://trello.com/c/NDZTWQ3a) (To-Do)

### Hard-to-release (Doing 14+ days)
**2 cards** (vs 1 on 04-24, **+1**):
- **30.7d** — [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) (was 20d on 04-24, **+10.7d still Doing**)
- **18.9d** — [Fountain — Business (Homepage) Updates](https://trello.com/c/WGsYqu5h) **NEW Doing 14+**

---

## Recommendation for Trello Check Progress "Fountain" item

**Status: WARNING — keep unchecked** (do not mark complete)

Justification (alerts found):
1. **Backlog growth**: NS+IP +30.5h, broader +24.75h, total active cards +12 (especially Bugs +6, Not Passed +2)
2. **Stuck cards +10** vs 04-24 (now 47)
3. **Hard-to-release +1** ([clSdoRlL](https://trello.com/c/clSdoRlL) 30.7d in Doing, [WGsYqu5h](https://trello.com/c/WGsYqu5h) 18.9d new entry)
4. **W25 plan not yet posted** by trinhmtt as of 08:13 — potential alert if missing by EOD
5. **Customer pressure**: 30 comments in 10d (+9), kunalsheth flagged a NEW production bug today (Build-a-Box NoMethodError)
6. **#2816 Infinity homepage** went +100% over estimate (20h→40h)

**Clean signals:**
- W24 plan vs actual met (48.5h / 48h dev = 101%)
- #2735 cooled off (+1h vs +7.5h/day previously)
- #2595, #2615 stable

**Net: WARNING — alerts present, do not mark Fountain checklist item complete.**
