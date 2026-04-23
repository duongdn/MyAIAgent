# Piece 6 — Fountain (Daily Report 2026-04-23 Thursday)

**Window:** since 2026-04-21 08:40 +07. Matrix token refreshed via `scripts/matrix-token-refresh.js` (prior 401 M_UNKNOWN_TOKEN; SSO refresh succeeded — @duongdn verified).

Current week = **W23 (2026-04-20 → 2026-04-26)**, Thu = day 4. W23 plan (edited) posted by @trinhmtt on 2026-04-20.

---

## Part 1 — Matrix Weekly Plan (Fountain room `!EWnVDAxbTGsBxPkaaI`)

**Latest W23 plan** — @trinhmtt:nustechnology.com, 2026-04-20T01:48:46Z (08:48 +07), edited version of 01:44 message:

> Em gửi plan tuần này ạ
> ViTHT: 40h | ThinhT: 12h | VuTQ: 40h | LamLQ: 10h | DatNT: 40h | => QC: 30.5h

Dev total plan: 40+12+40+10+40 = **142h/wk**. QC plan 30.5h. HaVS not on plan.

No new plan message since 04-20. Same plan used for today's comparison.

---

## Part 2 — Task Log Weekly Actuals (Summary tab W23 = row 28, Apr 20–26)

| Dev | Actual W23 (4 days) | Role |
|-----|---------------------|------|
| VuTQ | **16.00h** | dev |
| ThinhT | **12.00h** | dev |
| ViTHT | **16.00h** | dev |
| HaVS | **0.00h** | dev (not on plan) |
| LamLQ | **0.00h** | dev |
| DatNT | **24.00h** | dev |
| PhatDLT | **7.50h** | QC |
| HungPN | **0.00h** | QC |

Dev total W23: **68.00h / 142h plan (47.9%)**. QC total: **7.50h / 30.5h plan (24.6%)**. Grand total row 28: **75.50h**. TrinhMTT excluded per memory.

---

## Part 3 — Plan vs Actual (W23 partial, 4 of 5 working days = 80% expected pace)

| Dev | Plan | Actual | Expected (80%) | Verdict |
|-----|------|--------|----------------|---------|
| VuTQ | 40h | 16.00h | 32h | BEHIND (–16h) |
| ThinhT | 12h | 12.00h | 9.6h | ON TRACK (+2.4h) |
| ViTHT | 40h | 16.00h | 32h | BEHIND (–16h) |
| LamLQ | 10h | 0.00h | 8h | BEHIND (no log yet, check) |
| DatNT | 40h | 24.00h | 32h | BEHIND (–8h) |
| HaVS | — | 0.00h | — | Not on plan |
| PhatDLT | (QC 30.5h) | 7.50h | 24.4h | BEHIND on QC |
| HungPN | (QC 30.5h) | 0.00h | — | 0h — per memory, OK if PhatDLT covers |

Dev 68h actual vs 113.6h expected → **45.6h short** (-40% of expected pace). Big gaps: VuTQ, ViTHT, LamLQ. Task logs usually flush Fri; watch for tomorrow's catch-up.

---

## Part 4 — Capacity & Runway (Est vs Charged, excl. Deployed on Live + Cancelled)

- **Remaining est (Not Started + In-progress only):** **150.75h**
- Remaining est (broader, incl. Staging/Dev Done/Bugs/Hold): **230.50h**
- **Runway @ 90h/wk (NS+IP):** **1.68 weeks**
- Runway @ 142h/wk W23 plan (NS+IP): **1.06 weeks**
- Runway @ 90h/wk broader: 2.56 weeks

| Metric | 04-21 | 04-23 | Δ |
|--------|-------|-------|---|
| Remaining est (NS+IP) | 158.25h | 150.75h | **–7.50h** (consumed by actuals this week) |
| Remaining est (broader) | 238.00h | 230.50h | –7.50h |
| Runway @ 90h/wk | 1.76 wk | 1.68 wk | –0.08 wk |

Backlog shrinking at ~7.5h/2days = plan rate ~26h/wk, far under 90h/wk burn. **Need Kunal to feed Todo→Dev urgently or runway will collapse.**

---

## Part 5 — Over-Estimate Tracking (actual > est × 1.2)

24 tasks flagged. Top offenders + key watch:

| Task | Est | Actual 04-21 | Actual 04-23 | Over% | Status | Delta |
|------|-----|-------------|-------------|-------|--------|-------|
| #2627 | 0.5h | 8.25h | **8.25h** | +1550% | Has Bug on Live | stable |
| #2615 Gift of Choice | 12h | 102.75h | **106.75h** | +790% | Deployed on Staging | **OVER + STILL GROWING (+4.00h)** |
| #2639 Active/Inactive cats | 2h | 16.50h | **16.50h** | +725% | Staging | stable |
| #2501 | 4h | 25.50h | **25.50h** | +538% | Staging | stable |
| #2380 checkout date | 4h | 25.25h | **25.25h** | +531% | Staging | stable |
| #2702 accessibility | 8h | 16.00h | **21.50h** | +169% | In-progress (>50%) | **OVER + STILL GROWING (+5.50h)** |
| #2624 order complete | 12h | 31.25h | **31.25h** | +160% | Dev Done | stable |
| #2742 GoC select/payment | 12h | 20.25h | **20.25h** | +69% | Not Started | stable (status anomaly persists) |
| #2595 GiftDrop Redemption | 120h | 168.25h | **168.25h** | +40% | Staging | stable |
| #2735 Pro Send Smart Link | 90h | 111.50h | **117.50h** | +31% | In-progress (>50%) | **OVER + STILL GROWING (+6.00h)** |
| #2791 | 8h | 10.50h | **11.00h** | +38% | Staging | +0.50h |
| #2821 | 1h | — | **2.00h** | +100% | Dev Done | new entry |

**Key watch:**
- **#2595** — +40%, stable at 168.25h. No new burn.
- **#2615** — +790%, **still growing** (+4h since 04-21). Staging but absorbing rework.
- **#2735** — +31%, **still growing** (+6h since 04-21). In-progress. Was growth-paused on 04-21; now resumed.
- **#2702** — new grower, +5.5h since 04-21.

---

## Trello Board Check — [Web Development (Fountain)](https://trello.com/b/UDrSWage) (board `5475eaf923a9a1309357eb51`, @rick570)

**New customer comments since 2026-04-21 08:40 +07 (17 total)** from kunalsheth, tmmckay, mike62798179:

Hotspots:
- **[Mother's Day orders not syncing (y8lM8Alq)](https://trello.com/c/y8lM8Alq)** — @kunalsheth 5 comments 04-22 (7 orders, shipstation date bug, ground shipping field 3 wrong).
- **[Infinity roses orders not syncing (y8lM8Alq)](https://trello.com/c/y8lM8Alq)** — @kunalsheth 3 comments 04-21 (holiday-delivery triggers bug, affects Fountain too).
- **[Shipstation creating 2nd/3rd shipment (BYu5iwQM)](https://trello.com/c/BYu5iwQM)** — @mike62798179 3 comments 04-21, list of bad orders.
- **[Order confirmation email (Zh47TgEt)](https://trello.com/c/Zh47TgEt)** — @kunalsheth: fix applied Infinity only, not Fountain.
- **[Update to breakpoints (0xVWmSqK)](https://trello.com/c/0xVWmSqK)** + **[Infinity Product page update (rRU4Qk4n)](https://trello.com/c/rRU4Qk4n)** — @tmmckay ready to pick up.
- **[Pro/Send Smart Link (yrbbFhf9)](https://trello.com/c/yrbbFhf9)** — @kunalsheth: edge case, can ignore.

**Active list counts:** Todo 33 | Bugs 7 | Doing 6 | QC Internal 7 | QA Backlog 2 | In QA 2 | Not Passed 0.
Deltas vs 04-21: Todo -1, Bugs **-5** (12→7, good), Doing +1, QC Internal +3.

**Stuck cards (>5d, active lists):** 41 total (vs 40 on 04-21, +1). Worst: 184d Platform switcher fix, 147d PayPalHttp::HttpError, 140d Fountain Pro Backend Updates.

**Hard-to-release (Doing 14d+):** 1 card — [Fountain States/scrolling login (clSdoRlL)](https://trello.com/c/clSdoRlL) 19d.

---

## Recommended Trello "Fountain" item verdict: **COMPLETE (with alerts logged)**

All 5 parts produced real numbers + Trello board. W23 plan confirmed. W23 actuals at 47.9% of plan on day-4 (80% expected) — behind but recoverable if Fri flush happens.

## Alerts Summary

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Plan vs Actual | Dev pace 47.9% vs 80% expected day-4 — 45.6h short; VuTQ/ViTHT/LamLQ biggest gaps | MEDIUM |
| 2 | Over-est | #2615 +4h growing (staging), #2735 +6h growing (IP), #2702 +5.5h growing (IP) since 04-21 | MEDIUM |
| 3 | Trello | Mother's Day orders not syncing + shipstation double-shipment — hot customer bugs escalating | HIGH |
| 4 | Capacity | NS+IP runway 1.68 wk @ 90h/wk; 1.06 wk @ 142h W23 plan — replenishment urgent | MEDIUM |
| 5 | Over-est | #2742 Not Started w/ 20.25h actual — status anomaly unresolved | LOW |
| 6 | Trello | @tmmckay ready tickets 0xVWmSqK + rRU4Qk4n — needs Rick pickup | LOW |
| 7 | Matrix | Token expired on open; auto-refresh succeeded (silent handle) | INFO |

## Unresolved Questions

1. LamLQ showing 0h on day-4 despite 10h plan — on leave or tasklog delay?
2. HungPN 0h QC — PhatDLT covering 7.5h alone; is that enough for 30.5h QC plan?
3. #2615 and #2735 both growing post-Staging/IP — new rework scope or original underestimate?
4. Hot shipstation / Mother's Day sync bug — does this need Elena-style auto-escalation?
