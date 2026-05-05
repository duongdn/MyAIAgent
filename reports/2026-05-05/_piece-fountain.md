# Fountain 5-Part Check — 2026-05-05 (Tue) 09:25 (+07:00)

Active week now = **W25** (May 4 – May 10). Just-completed week = W24 (Apr 27 – May 3).
Previous report compared against: `reports/2026-05-04/_piece-fountain.md`.

> **Matrix token status: RECOVERED.** Re-attempt 2026-05-05 ~10:10 — running `node scripts/matrix-token-refresh.js` succeeded automatically; new token `mat_Jd3Fn…NOH6Z5_aV4l11` written to `config/.matrix-config.json`. `whoami` returns `@duongdn:nustechnology.com`. Recovery path = step 3 (script auto-captured token via existing browser profile SSO; no manual login needed).

---

## Fountain — Part 1: Matrix Plan (UPDATED — W25 plan FOUND)

Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`.

**W25 plan POSTED — latest version by @trinhmtt on 2026-05-04 11:56:52 (+07):**
> Em update plan tuần này ạ
> ViTHT 40h
> VuTQ 8h
> ThinhT 20h
> DatNT 40h
> => QC: 27h

(Earlier same-day post 09:09:54 had VuTQ 40h; revised down to 8h in the 11:56 update. ViTHT/ThinhT/DatNT unchanged.)

**HaVS / LamLQ / HungPN: NOT in plan** (consistent with prior weeks — they are off-plan / shared-QC).

**Comparison vs W25 actuals already logged (Day 1 of week, Mon 05-04):**
| Dev | W25 plan | Day-1 actual | Day-1 target (plan/5) | Pace |
|-----|---------:|-------------:|---------------------:|------|
| ViTHT  | 40h | 8.0h  | 8.0h | ON pace |
| VuTQ   |  8h | 0.0h  | 1.6h | behind day-1, but plan small |
| ThinhT | 20h | 4.0h  | 4.0h | ON pace |
| DatNT  | 40h | 7.5h  | 8.0h | ON pace |
| QC (PhatDLT+HungPN) | 27h | 2.5h | 5.4h | slightly behind day-1 (single day) |

Plan **substantially larger than W24** (was VuTQ 16+ViTHT 16+DatNT 16+QC 10.5 = 58.5h; now ViTHT 40+VuTQ 8+ThinhT 20+DatNT 40+QC 27 = **135h**). ThinhT now officially on plan (was off-plan in W24). VuTQ scaled down (16h → 8h). Big push week.

---

## Part 2: Actuals (W25, current)

Source: Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` — Summary tab, **row 30 (W25, May 4 – May 10)**.

| Dev | W24 Actual | **W25 Actual (so far)** | Charged W25 | Role | Notes |
|-----|----------:|-------------:|------------:|------|-------|
| VuTQ    | 16.50h |  **0.00h** | 0.00h | dev | on plan — no Mon log yet |
| ViTHT   | 16.00h |  **8.00h** | 0.00h | dev | on plan |
| DatNT   | 16.00h |  **7.50h** | 0.00h | dev | on plan |
| ThinhT  |  6.00h |  **4.00h** | 0.00h | dev | off-plan but logging |
| HaVS    |  0.00h |  **0.00h** | 0.00h | dev | off-plan |
| LamLQ   |  0.00h |  **0.00h** | 0.00h | dev | off-plan |
| PhatDLT |  3.50h |  **2.00h** | 0.00h | QC  | on plan |
| HungPN  | 11.00h |  **0.50h** | 0.00h | QC  | on plan |
| TriNM   |  0.00h |  **0.00h** | 0.00h | (excluded — not QC per memory) |

**W25 totals so far (Day 1 of week, Tue morning):**
- Dev (VuTQ+ViTHT+DatNT) on-plan: **15.50h** logged
- Including ThinhT off-plan: 19.50h dev total
- QC (PhatDLT+HungPN): **2.50h**
- Sheet D30 total = **22.00h** (matches: 15.5 + 4 + 2.5 = 22.0h)

---

## Part 3: Plan vs Actual (W25, in progress)

Plan vs actual is **early-week** — Day 2 of 5. Comparing Day-1 progress.

| Dev | W24 plan→actual | W25 plan (assumed) | W25 actual day-1 | Pace |
|-----|---------:|---------:|---------:|--|
| VuTQ  | 16h→16.5 | 16h | **0.0h**  | BEHIND (0/3.2 day pace) |
| ViTHT | 16h→16.0 | 16h | **8.0h**  | AHEAD (Day1 ~3.2h target → 8h logged) |
| DatNT | 16h→16.0 | 16h | **7.5h**  | AHEAD (target 3.2h → 7.5h logged) |
| ThinhT (off-plan) | -→6.0 | - | 4.0h | logging consistent |
| QC (PhatDLT+HungPN) | 10.5h→14.5 | 10.5h | **2.5h** | ON pace (target 2.1h day-1 → 2.5 logged) |

**Watch:**
- **VuTQ 0.0h on Tuesday morning** — expected ~3-4h logged from Mon. Could be holiday, leave, or delayed log entry. Single data point — not yet alert.
- HungPN 0.5h alone is NOT alert if PhatDLT covers (PhatDLT 2.0h ✓ — feedback_hungpn_not_sole_qc).

No clear behind-plan alerts at this stage. Will firm up by mid-week.

---

## Part 4: Capacity & Runway (Est vs Charged tab)

Filtered: NS+IP statuses sum of `max(est − actual, 0)`. Excluded: Deployed on Live + Cancelled + N/A.

| Metric | 04-24 | 05-04 (yest) | **05-05 (now)** | Δ vs 05-04 |
|--------|------:|------:|------:|--:|
| Remaining NS+IP                              | 150.75h | 181.25h | **180.25h** | **−1.00h** |
| Remaining broader (excl Live+Cancelled+N/A)  | 250.50h | 255.25h | **260.00h** | **+4.75h** |
| Runway @ ~48h/wk dev capacity (NS+IP)        | 3.14 wk | 3.78 wk | **3.76 wk** | −0.02 |

**NS-only**: 169.0h. **IP-only**: 11.25h.

**Top NS+IP backlog (largest remaining):**
| Task | Rem | Est | Actual | Status |
|------|----:|----:|-------:|--------|
| #2775 navigation refactor | 43.0h | 60h | 17.0h | Not Started |
| #1178 fountain/infinity reviews | 40.0h | 40h | 0.0h | Not Started |
| #2854 | 34.5h | 40h | 5.5h | Not Started |
| #2524 duplicate charge | 24.0h | 24h | 0.0h | Not Started |
| #2590 fountain pro backend | 8.0h | 8h | 0.0h | Not Started |
| #2500 | 8.0h | 8h | 0.0h | Not Started |
| #2554 platform-switcher fix | 6.0h | 6h | 0.0h | Not Started |
| #2633 zip-code update | 4.0h | 8h | 4.0h | IP >50% |

NS+IP backlog **stable** since yest (−1h). Broader pool **+4.75h** indicates new tasks added or Dev-Done items growing. Runway flat (~3.76 weeks @ ~48h/wk plan).

---

## Part 5: Over-Estimate Tracking (actual > est × 1.2)

Always-tracked tasks per memory:

| Task | Est | Actual 05-04 | **Actual 05-05** | Over% | Status | Growing? |
|------|---:|---:|---:|---:|--------|---|
| **#2595 GiftDrop**          | 120h | 168.25h | **168.25h** | +40%   | Staging        | **stable** (no change) |
| **#2615 Gift of Choice**    |  12h | 106.75h | **106.75h** | +790%  | Staging        | **stable** |
| **#2735 Pro Send Smart Link** | 90h | 126.00h | **126.00h** | +40%   | IP >50%       | **stable** (no change since yest) |
| **#2816 Infinity homepage** |  20h |  40.00h | **40.25h**  | +101%  | Staging        | **+0.25h overnight** — minor |
| **#2837**                   |  16h |  23.50h | **23.50h**  | +47%   | Staging        | **stable** |
| **#2815**                   |   6h |  10.25h | **10.25h**  | +71%   | Staging        | **stable** |

All major over-est tasks **stable** vs yest. **#2735 confirmed cooled-off** (no change overnight, vs +7.5h/day previously per 04-24).

**Top other +20% over (no change vs yesterday — top by over%):**
| Task | Est | Actual | Over% | Status |
|------|---:|---:|---:|--------|
| #2627                   | 0.5h |  8.25h | +1550% | Has Bug Live |
| #2615 (above)           | 12h  |106.75h |  +790% | Staging |
| #2639 active/inactive   | 2h   | 16.50h |  +725% | Staging |
| #2545 build-a-box modal | 1h   |  7.50h |  +650% | Live |
| #2613                   | 2h   | 14.50h |  +625% | Live |
| #2652                   | 1.5h | 10.50h |  +600% | Live |
| #2501                   | 4h   | 25.50h |  +538% | Staging |
| #2380 checkout date     | 4h   | 25.25h |  +531% | Staging |
| #2691                   | 1h   |  6.00h |  +500% | Live |
| #2523                   | 16h  | 61.00h |  +281% | Live |

No NEW entries vs yest. **No "STILL GROWING" red flags** — all tracked tasks stable in 24h window.

---

## Fountain Trello Board ([Web Development](https://trello.com/b/UDrSWage), board `5475eaf923a9a1309357eb51`)

### Customer comments (since 2026-04-24)
**Total: 30 customer comments** (kunalsheth 16 + tmmckay 12 + mike62798179 2 + iris63293413 0).

vs 05-04 report: **same 30** (no new customer comments overnight Mon → Tue 09:25). Latest pings still Mon 04:18 (kunalsheth Build-a-Box NoMethodError) — that bug is now ~33h old without resolution comment.

**Hotspots (latest customer pings — no new since yesterday):**
- [NoMethodError pro_cart_items#destroy](https://trello.com/c/aVOTR4WR) — kunalsheth 2026-05-04 00:18 customer-reported bug
- [Fountain — Navigation refactor](https://trello.com/c/Tq5nQQQr) — kunalsheth 2026-05-04 00:10 mobile/desktop tab Q
- [Infinity — Order 4390256BM](https://trello.com/c/xWIwIlMy) — kunalsheth 05-01 wrong shipping date
- [Infinity Order 6358531LG](https://trello.com/c/HmXH3XIu) — kunalsheth 05-01
- [Update field for Holiday Delivery Email](https://trello.com/c/NN2ALtVP) — kunalsheth 05-01
- [Order flow: Message/Recipient/Delivery](https://trello.com/c/BSrIHSmc) — tmmckay 05-01 ready-to-pick-up
- [Fountain — Pro/Send Smart Link](https://trello.com/c/yrbbFhf9) — tmmckay 05-01 detailed scope reply
- [Infinity — Build a box](https://trello.com/c/9qY6OlON) — tmmckay 05-01 ready-to-pick-up
- [Infinity — Browse](https://trello.com/c/MS5UzAPy) — tmmckay 05-01 ready-to-pick-up
- [Infinity — Update homepage](https://trello.com/c/S0M1pEOs) — tmmckay 05-01 final feedback
- [Scheduled Order → next-day delivery $8](https://trello.com/c/MgBGamAN) — mike62798179 04-30

### Active card counts per list
| List | 05-05 | 05-04 | Δ |
|------|------:|------:|--:|
| To-Do          | 33 | 34 | **−1** |
| Bugs           | 14 | 14 | 0 |
| Doing          |  7 |  7 | 0 |
| QC Internal    |  7 |  5 | **+2** |
| QA Backlog     |  5 |  4 | +1 |
| In QA          |  3 |  3 | 0 |
| Not Passed     |  1 |  2 | **−1** |
| **Total active** | **70** | **69** | **+1** |

To-Do down 1, but QC Internal +2 and QA Backlog +1 → flow moving rightward toward release. Bugs flat at 14.

### Stuck cards (dateLastActivity > 5 days)
**52 stuck** (vs 47 on 05-04, **+5**). Worst:
- 196.9d — [Platform switcher fix](https://trello.com/c/JVLMbyYO) (To-Do)
- 159.7d — [PayPalHttp::HttpError generate_order](https://trello.com/c/6MTnv0Cc) (Bugs)
- 153.0d — [Fountain Pro Backend Updates](https://trello.com/c/kUkibmUS) (To-Do)
- 130.9d — [Fountain Pro roles](https://trello.com/c/q3rvudcU) (To-Do)
- 130.9d — [Duplicate Charge](https://trello.com/c/VXxyO8IW) (To-Do)
- 130.9d — [Suggestion: Unit Test](https://trello.com/c/0jFodYfi) (To-Do)
- 130.7d — [URL is case sensitive](https://trello.com/c/NDZTWQ3a) (To-Do)
- 120.2d — [Update search](https://trello.com/c/1zWeXmlT) (To-Do)
- 120.2d — [Automate card printing](https://trello.com/c/aWLxiSK9) (To-Do)
- 120.2d — [Automate card printing extra](https://trello.com/c/xr8Q0N3G) (To-Do)

Stuck +5 in one day — likely cards aging past 5d threshold (no activity over weekend rolled in).

### Hard-to-release (Doing 14+ days)
**2 cards** (same as 05-04, both still in Doing):
- **31.8d** — [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) (was 30.7d yest, **+1.1d**)
- **20.0d** — [Fountain — Business (Homepage) Updates](https://trello.com/c/WGsYqu5h) (was 18.9d yest, **+1.1d**)

Both still Doing, ages climbing 1d/day.

---

## Recommendation for Trello Check Progress "Fountain" item

**Status: WARNING — keep unchecked** (do not mark complete)

Justification (alerts found):
1. ~~**Matrix token expired** — W25 plan **NOT yet verified**.~~ **RESOLVED 2026-05-05 ~10:10:** token refreshed via `scripts/matrix-token-refresh.js`; W25 plan confirmed posted by @trinhmtt 05-04 11:56 (ViTHT 40h, VuTQ 8h, ThinhT 20h, DatNT 40h, QC 27h).
2. **VuTQ 0.0h on Mon** — plan only 8h this week (small), so day-1 zero is less concerning than thought. Watch but not alert.
3. **Stuck cards +5** vs 05-04 (now 52)
4. **Hard-to-release climbing** ([clSdoRlL](https://trello.com/c/clSdoRlL) 31.8d, [WGsYqu5h](https://trello.com/c/WGsYqu5h) 20.0d) — both +1d
5. **Customer Build-a-Box NoMethodError** still no resolution comment ~33h after kunalsheth's report
6. **Backlog broader +4.75h** since yest

**Clean signals:**
- No new customer comments since 05-04 (Mon evening through Tue 09:25)
- All over-est tasks **stable** vs yest (no STILL GROWING flags)
- W25 dev pace day-1 OK for ViTHT + DatNT + ThinhT (15.5h dev + 2.5h QC by Tue 09:25)
- To-Do −1, flow moving rightward (QC+2, QA+1)
- #2735 confirmed cooled

**Net: WARNING — keep Fountain checklist item unchecked.** Primary remaining concerns = stuck cards aging, hard-to-release climbing, kunalsheth Build-a-Box bug ~33h without resolution, broader backlog +4.75h. Matrix plan now verified, VuTQ low-plan reduces that concern.

---

## Unresolved Questions

1. ~~Matrix token expiry handling.~~ **Resolved 2026-05-05 10:10** — `scripts/matrix-token-refresh.js` succeeded; saved profile worked, no manual login required.
2. ~~Was W25 plan posted by trinhmtt?~~ **Resolved** — yes, posted 2026-05-04 11:56 (revision of 09:09 post).
3. **VuTQ Mon zero log** — plan is only 8h this week so 0h Mon is fine if any logging happens by Wed/Thu. Monitor.
4. **HungPN 0.5h alone is not alert** if PhatDLT covers (PhatDLT 2h Mon ✓).
