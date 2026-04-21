# Piece 6 — Fountain (Daily Report 2026-04-21 Tuesday)

**Window:** since 2026-04-20 08:40 +07. Matrix token refreshed via `scripts/matrix-token-refresh.js` (prior token 401 M_UNKNOWN_TOKEN, SSO profile refresh succeeded — @duongdn verified).

Current week = **W23 (2026-04-20 → 2026-04-26)**, Tue = day 2. New W23 plan posted by TrinhMTT on Apr 20 (edited). Plan-vs-actual reviewed as **W23 partial** (2 days in).

---

## Part 1 — Matrix Weekly Plan (Fountain room `!EWnVDAxbTGsBxPkaaI`)

**Latest W23 plan** — @trinhmtt, 2026-04-20T01:48:46Z (2026-04-20 08:48 +07) — edited version of 01:44 message:

> Em gửi plan tuần này ạ
> ViTHT: 40h | ThinhT: 12h | VuTQ: 40h | LamLQ: 10h | DatNT: 40h | => QC: 30.5h

Previous (W22) plan — @trinhmtt, 2026-04-17T09:08:40Z:
> ViTHT: 38h | ThinhT: 20h | VuTQ: 32h | => QC: 22.5h

Notes:
- **Plan shape changed for W23:** LamLQ back (10h), DatNT added (40h), HaVS still not listed.
- W23 dev total plan: 40+12+40+10+40 = **142h/wk** (vs W22 90h). QC 30.5h (vs W22 22.5h).
- Latest message at 01:48Z is the edit (VuTQ moved 32→40, QC 28.5→30.5). Use edited numbers as authoritative.

---

## Part 2 — Task Log Weekly Actuals (Summary tab, W23 = row 28, Apr 20–26)

| Dev | Actual W23 (2 days) | Role |
|-----|---------------------|------|
| VuTQ | **0.00h** | dev |
| ThinhT | **0.00h** | dev |
| ViTHT | **0.00h** | dev |
| HaVS | **0.00h** | dev (not on plan) |
| LamLQ | **0.00h** | dev |
| DatNT | **8.00h** | dev |
| PhatDLT | **3.50h** | QC |
| HungPN | **0.00h** | QC |

Dev total W23 so far: **8.00h** / plan 142h (5.6%). QC total: **3.50h** / plan 30.5h (11.5%). Team grand total row 28: 11.50h.
TrinhMTT excluded from QC tracking per memory. W22 (prior week row 27) closed at Dev 90h, QC 25.5h — exact match to prior plan.

**Logging gap:** Only DatNT + PhatDLT have logged through Tue AM. Other 5 devs (VuTQ, ThinhT, ViTHT, LamLQ, HaVS) show 0h despite being on plan — likely task log not yet updated for Mon + Tue AM.

---

## Part 3 — Plan vs Actual (W23 partial — 2 of 5 working days)

| Dev | Plan W23 | Actual so far | Expected pace (40%) | Verdict |
|-----|----------|---------------|---------------------|---------|
| VuTQ | 40h | 0.00h | ~16h | BEHIND (likely tasklog delay, Matrix activity on 2811/2702 confirms working) |
| ThinhT | 12h | 0.00h | ~4.8h | BEHIND (tasklog delay) |
| ViTHT | 40h | 0.00h | ~16h | BEHIND (Matrix: PR review on #2702, assigning 2813/2821 — working) |
| LamLQ | 10h | 0.00h | ~4h | BEHIND (no Matrix signal) |
| DatNT | 40h | 8.00h | ~16h | On track for Mon (~4h/day pace) |
| HaVS | — | 0.00h | — | Not on plan, no alert |
| PhatDLT | (part of 30.5 QC) | 3.50h | ~12.2h | Behind QC pace but ON TRACK for day-1 |
| HungPN | (part of 30.5 QC) | 0.00h | — | No log yet |

**Interpretation:** W23 just 2 days in. Zero hours for 5 devs = most likely end-of-week tasklog habit (devs often fill Thu/Fri). Matrix activity on Apr 20 confirms VuTQ, ViTHT, PhatDLT, TrinhMTT actively working. Re-check Thu.

---

## Part 4 — Capacity & Runway (Est vs Charged, excl. Deployed on Live & Cancelled)

- **Remaining est (Not Started + In-progress only):** **158.25h**
- Remaining est (any non-live/cancelled, incl. Staging/Dev Done/Bugs/Hold): **238.00h**
- **Runway @ 90h/wk dev plan (NS+IP basis):** **1.76 weeks**
- Runway @ 90h/wk (broader basis): **2.64 weeks**
- **Runway @ 142h/wk W23 plan (NS+IP):** **1.11 weeks**

Delta vs 2026-04-20 report:
| Metric | 04-20 | 04-21 | Δ |
|--------|-------|-------|---|
| Remaining est (NS+IP) | 158.25h | 158.25h | 0.00h (no movement — consistent with ~0 new work logged day-1) |
| Runway @ 90h/wk | 1.76 wk | 1.76 wk | 0.00 wk |

Backlog flat. New W23 plan at 142h/wk would compress runway to ~1.1 weeks — team needs Kunal to replenish NS+IP backlog urgently.

---

## Part 5 — Over-Estimate Tracking (actual > est +20%)

| Task | Est | Actual 04-20 | Actual 04-21 | Over% | Status | Trend |
|------|-----|-------------|-------------|-------|--------|-------|
| #2595 GiftDrop Redemption | 120h | 168.25h | **168.25h** | +40% | Deployed on Staging | Stable |
| #2615 Gift of Choice | 12h | 102.75h | **102.75h** | +756% | Deployed on Staging | Stable |
| #2735 Pro Send Smart Link | 90h | 111.50h | **111.50h** | +24% | In-progress (>50%) | **Stable now** (was growing +5.25h last week) |
| #2742 GoC select/payment | 12h | 20.25h | **20.25h** | +69% | Not Started | Status mismatch persists |
| #2639 Active/Inactive cats | 2h | 16.50h | **16.50h** | +725% | Deployed on Staging | Stable |
| #2501 | 4h | 25.50h | **25.50h** | +538% | Deployed on Staging | Stable |
| #2380 checkout date | 4h | 25.25h | **25.25h** | +531% | Deployed on Staging | Stable (dup row also shows 20h est) |
| #2627 | 0.5h | 8.25h | **8.25h** | +1550% | Has Bug on Live | Stable |
| #2624 order complete | 12h | 31.25h | **31.25h** | +160% | Dev Done | Stable |
| #2604 | 1h | 3.50h | **3.50h** | +250% | Deployed on Staging | Stable |
| #2666 | 2h | 5.00h | **5.00h** | +150% | Deployed on Staging | Stable |
| #2629 | 8h | 18.25h | **18.25h** | +128% | Dev Done | Stable |
| #2702 accessibility | 8h | 16.00h | **16.00h** | +100% | In-progress (>50%) | Stable |
| #2783 | 1h | 2.00h | **2.00h** | +100% | Not Started | Stable |
| #2546 corporate order | 4h | 7.00h | **7.00h** | +75% | Deployed on Staging | Stable |
| #2815 | 6h | 9.00h | **9.00h** | +50% | Not Started | Stable |
| #2640 | 12h | 16.75h | **16.75h** | +40% | In-progress (<50%) | Stable |
| #2695 | 20h | 26.00h | **26.00h** | +30% | In-progress (<50%) | Stable |
| #2791 | 8h | 10.50h | **10.50h** | +31% | Deployed on Staging | Stable |
| #2665 | 4h | 5.50h | **5.50h** | +38% | Dev Done | Stable |
| #2816 | 20h | 24.50h | **24.50h** | +22% | Deployed on Staging | Stable |

22 over-est tasks total. **All stable day-over-day** (consistent with 0h new logging from devs). #2735 growth paused; re-verify Thu when week's logs arrive.

**#2742 status anomaly** still unresolved ("Not Started" with 20.25h actual) — needs lead update.

---

## Trello Board Check (supplementary)

Board: [Web Development (Fountain)](https://trello.com/b/UDrSWage) — id `5475eaf923a9a1309357eb51`, auth as @rick570.

**New customer comments since 2026-04-20 08:40** (kunalsheth, tmmckay, mike62798179, iris63293413) — **1 comment**:

1. 2026-04-20T13:50Z — [Fountain - Pro/Send - Smart Link (#2735)](https://trello.com/c/yrbbFhf9): @kunalsheth — "This select another gift would only be useful if they have multiple items in the cart?" (question for @rick570).

**Active per-list counts:** Todo 34 | Bugs 12 | Doing 5 | QC Internal 4 | QA Backlog 2 | In QA 2 | Not Passed 0.
Deltas vs 04-20: Bugs +5, Doing -1, QC Internal +1. Bugs growing — watch.

**Stuck cards (>5 days, active lists):** 40 total (vs 41 yesterday, -1). Worst offenders:
- 419d [todo] Fountain & Infinity — Make page title dynamic (GwCJSlvl)
- 419d [todo] Fountain & Infinity — Make sites accessible (QHVN496O)
- 182d [todo] Platform switcher fix (JVLMbyYO)
- 145d [bugs] PayPalHttp::HttpError in paypals#generate_order (6MTnv0Cc)
- 138d [todo] Fountain Pro - Backend Updates (kUkibmUS)
- 116d × 5 cards (old Todo backlog)

---

## Recommended Trello "Fountain" item verdict: **COMPLETE (with alerts logged)**

All 5 parts produced real numbers. New W23 plan fetched from Matrix (Apr 20). W22 closed cleanly. W23 is day-2 with expected low activity. Backlog runway pressure medium. Alerts below are informational/medium, not completion-blockers.

## Alerts Summary

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Task log | 5 of 7 planned devs show 0h W23 (likely end-of-week logging habit — Matrix confirms work) | LOW |
| 2 | Fountain/runway | Runway 1.11 wk @ new 142h/wk W23 plan (1.76 wk @ 90h baseline) — replenishment urgent | MEDIUM |
| 3 | Bugs list | Bugs list +5 day-over-day (7→12) | MEDIUM |
| 4 | Over-est | #2742 status mismatch persists ("Not Started" with 20.25h) | LOW |
| 5 | Trello | New @kunalsheth question on #2735 Smart Link — needs Rick reply | LOW |
| 6 | Trello | 40 stuck cards (>5d) in active lists — 2 cards 419d old | INFO |
| 7 | Matrix | Token expired at start; auto-refresh succeeded (handled silently) | INFO |

## Unresolved Questions

1. W23 plan total (142h) is **+58% vs W22 (90h)** — is this a genuine ramp-up (DatNT added full-time) or lead over-stating? Validate with actuals by Thu.
2. HaVS still missing from plan for 4+ weeks, 0h W22/W23 — off Fountain permanently? Confirm with TrinhMTT.
3. DatNT — new-joiner on Fountain? 8h day-1 is healthy; verify onboarding not blocking.
