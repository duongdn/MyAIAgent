# Piece 6 — Fountain (Daily Report 2026-04-20 Monday)

**Window:** since 2026-04-17 08:50 +07. Matrix token refreshed via `scripts/matrix-token-refresh.js` (prior token 401 M_UNKNOWN_TOKEN, SSO profile refresh succeeded).

Current week = **W23 (2026-04-20 → 2026-04-26)**. W23 just started — actuals 0h as expected. Review reference week for plan-vs-actual = **W22 (Apr 13 → Apr 19)** (just closed).

---

## Part 1 — Matrix Weekly Plan (Fountain room `!EWnVDAxbTGsBxPkaaI`)

**Latest plan message** — @trinhmtt, 2026-04-17T09:08:40Z (Fri of W22, effectively an updated/confirmed W22 plan):

> Em update plan tuần này
> ViTHT: 38h | ThinhT: 20h | VuTQ: 32h | => QC: 22.5h

Previous plan (start of W22) — @trinhmtt, 2026-04-13T03:23:57Z:
> ViTHT: 30h | LamLQ: 10h | ThinhT: 20h | VuTQ: 40h | => QC: 25h

Notes:
- HaVS not in W22 plan (last appeared W17 Mar 23/26 plans at ~22–24h).
- LamLQ dropped from Apr 17 revision (she confirmed not on Fountain this week — see @lamlq 2026-04-17T07:55:48).
- Dev total plan (Apr 17 revision): 38+20+32 = **90h/wk**. QC: 22.5h.

---

## Part 2 — Task Log Weekly Actuals (Summary tab, W22 = row 27, Apr 13–19)

| Dev | Actual W22 | Role |
|-----|-----------|------|
| VuTQ | **32.00h** | dev |
| ThinhT | **20.00h** | dev |
| ViTHT | **38.00h** | dev |
| HaVS | **0.00h** | dev (no plan, no hours) |
| PhatDLT | **17.50h** | QC |
| HungPN | **8.00h** | QC |

Dev total W22: **90.00h**. QC total W22: **25.50h**. Team grand total: 115.50h.
TrinhMTT excluded from QC tracking per feedback.

---

## Part 3 — Plan vs Actual (W22)

| Dev | Plan (Apr 17) | Actual W22 | Delta | Verdict |
|-----|---------------|-----------|-------|---------|
| VuTQ | 32h | 32.00h | 0.00h | ON TARGET |
| ThinhT | 20h | 20.00h | 0.00h | ON TARGET |
| ViTHT | 38h | 38.00h | 0.00h | ON TARGET |
| HaVS | — | 0.00h | — | Not on plan (no alert) |
| QC (PhatDLT+HungPN) | 22.5h combined | 25.50h (17.5 + 8.0) | +3.00h | EXCEEDS plan (OK) |

All devs hit Apr 17 revised plan exactly. QC coverage adequate (HungPN 8h not sole-QC issue — PhatDLT 17.5h covers). No W22 alerts.

---

## Part 4 — Capacity & Runway (Est vs Charged, excl. Deployed on Live & Cancelled)

- **Remaining est (Not Started + In-progress only):** **158.25h**
- Remaining est (any non-live/cancelled, incl. Staging/Dev Done/Bugs/Hold):** 238.00h
- **Runway @ 90h/wk dev plan (NS+IP basis):** **1.76 weeks**
- Runway @ 90h/wk plan (broader basis): 2.64 weeks

Delta vs 2026-04-17 report:
| Metric | 04-17 | 04-20 | Δ |
|--------|-------|-------|---|
| Remaining est (NS+IP) | 167.5h | 158.25h | -9.25h consumed |
| Runway @ 90h/wk | 1.9 wk | 1.76 wk | -0.14 wk |

Runway continues to shrink — team ~1.8 weeks of NS+IP work queued. Backlog needs replenishment from Kunal soon.

---

## Part 5 — Over-Estimate Tracking (actual > est +20%)

Key tracked tasks (week-over-week growth):

| Task | Est | Actual 04-17 | Actual 04-20 | Over% | Status | Trend |
|------|-----|-------------|-------------|-------|--------|-------|
| #2595 GiftDrop Redemption | 120h | 168.25h | **168.25h** | +40% | Deployed on Staging | **Stable** (no growth) |
| #2615 Gift of Choice | 12h | 102.25h | **102.75h** | +756% | Deployed on Staging | +0.5h (marginal) |
| #2735 | 90h | 106.25h | **111.50h** | +24% | In-progress (>50%) | **+5.25h STILL GROWING** |
| #2742 | 12h | 19.25h | **20.25h** | +69% | Not Started | +1.0h (status mismatch persists: "Not Started" with 20.25h actual) |
| #2639 Active/Inactive cats | 2h | ~16.5h | 16.50h | +725% | Deployed on Staging | Stable |
| #2501 | 4h | ~25.5h | 25.50h | +538% | Deployed on Staging | Stable |
| #2380 checkout date | 4h | ~25.25h | 25.25h | +531% | Deployed on Staging | Stable |
| #2627 | 0.5h | — | 8.25h | +1550% | Has Bug on Live | New/elevated |
| #2624 order complete | 12h | — | 31.25h | +160% | Dev Done | Notable |

Additional >20% overflows: #2630, #2604, #2666, #2629, #2702, #2783, #2546, #2815, #2640, #2665, #2791, #2695, #2816.

**Growing watch:** #2735 still climbing (+5.25h this week, in-progress >50%). Will likely breach +30% soon.
**#2742 status anomaly:** still "Not Started" with 20.25h actual — status needs update.

---

## Trello Board Check (supplementary)

Board: [Web Development (Fountain)](https://trello.com/b/UDrSWage) — id `5475eaf923a9a1309357eb51`, auth as @rick570.

**New customer comments since 2026-04-17 08:50** (kunalsheth, tmmckay, mike62798179, iris63293413) — 4 comments, all by @kunalsheth:

1. 2026-04-17T15:03Z — [Fountain - Gift of Choice (Gift cards)](https://trello.com/c/NBzXZigw): 2 issues — (1) secondary photo of GoC never uploaded; (2) custom amount doesn't sort gift boxes high-to-low.
2. 2026-04-17T17:30Z — [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr): FAQ added to description; photos ready, asking transfer method.
3. 2026-04-17T19:27Z — [Fountain - Gift of Choice](https://trello.com/c/NBzXZigw): live test order — GoC image missing on confirmation screen.
4. 2026-04-17T19:28Z — [Fountain - Gift of Choice](https://trello.com/c/NBzXZigw): never received email for order 4106089IL.

**Active per-list counts:** Todo 34 | Bugs 7 | Doing 6 | QC Internal 3 | QA Backlog 2 | In QA 2 | Not Passed 0.

**Stuck cards (>5 days, active lists):** 41 total. Worst offenders:
- 418d [todo] Fountain & Infinity — Make page title dynamic (GwCJSlvl)
- 418d [todo] Fountain & Infinity — Make sites accessible (QHVN496O)
- 181d [todo] Platform switcher fix (JVLMbyYO)
- 144d [bugs] PayPalHttp::HttpError in paypals#generate_order (6MTnv0Cc)
- 137d [todo] Fountain Pro - Backend Updates (kUkibmUS)
- 115d × 5 cards, 105d × 6 cards (old Todo backlog)

---

## Recommended Trello "Fountain" item verdict: **COMPLETE (with alerts logged)**

All 5 parts produced real numbers. W22 plan met exactly. No blocker. Alerts below are informational/medium, not completion-blockers.

## Alerts Summary

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Fountain/runway | Runway 1.76 wk @ 90h/wk — needs backlog replenishment | MEDIUM |
| 2 | Over-est | #2735 still growing (+5.25h this week, +24% over) | MEDIUM |
| 3 | Over-est | #2742 status mismatch persists ("Not Started" with 20.25h) | LOW |
| 4 | Trello | 4 new customer comments on Gift of Choice (#NBzXZigw) need Rick reply | MEDIUM |
| 5 | Trello | 41 stuck cards (>5 days) in active lists — 2 cards 418d old | INFO |
| 6 | Matrix | Token expired at start; auto-refresh succeeded (handled silently) | INFO |

## Unresolved Questions

1. Was Apr 17 plan a **revised W22** plan (fits actuals perfectly) or an advance W23 plan? If W23, then no W23 actuals to compare yet. Most likely W22 backfill given exact match.
2. HaVS status — not in plan for 4+ weeks, 0h W22. Off Fountain?
3. #2627 (Has Bug on Live, 0.5h→8.25h) — is this a new emerging over-run to watch?
