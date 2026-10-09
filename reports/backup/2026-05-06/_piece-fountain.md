# Fountain 5-Part Check — 2026-05-06 (Wed) 08:36 (+07:00)

Active week = **W25** (May 4 – May 10). Reporting day = Tue 2026-05-05 (Day 2 of W25).
Previous: `reports/2026-05-05/_piece-fountain.md`.

> **Matrix token:** Expired this morning. Refreshed via `node scripts/matrix-token-refresh.js` — captured automatically (browser SSO profile worked, no manual login). `whoami` = `@duongdn:nustechnology.com`. New token saved to `config/.matrix-config.json`.

---

## Part 1 — Matrix Plan (W25 — UNCHANGED since 05-04)

Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`.

**W25 plan still posted by @trinhmtt 2026-05-04 11:56:52 (+07):**
> Em update plan tuần này ạ
> ViTHT 40h
> VuTQ 8h
> ThinhT 20h
> DatNT 40h
> => QC: 27h

No revision/new plan posted overnight. Plan total = **135h** (108h dev + 27h QC).
HaVS / LamLQ / HungPN / TriNM: NOT in plan (off-plan).

---

## Part 2 — Actuals (W25, through Tue 05/05 = Day 2 of 5)

Source: Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` — W25 tab.
Filter: `Task dự án` rows, sum col H (Actual) by owner across Mon (R4–R31) + Tue (R33–R51).

| Dev    | Mon (Day 1) | Tue (Day 2) | **W25 cum** | Role | Notes |
|--------|------------:|------------:|------------:|------|-------|
| ViTHT  | 8.00h       | 0.00h       | **8.00h**   | dev  | **NO TUE LOG** |
| DatNT  | 7.50h       | 7.00h       | **14.50h**  | dev  | on plan, +7h Tue |
| ThinhT | 4.00h       | 4.00h       | **8.00h**   | dev  | on plan |
| VuTQ   | 0.00h       | 0.00h       | **0.00h**   | dev  | **STILL ZERO Day 2** |
| HaVS   | 0.00h       | 0.00h       | **0.00h**   | dev  | off-plan |
| PhatDLT| 2.00h       | 2.00h       | **4.00h**   | QC   | on plan |
| HungPN | 0.50h       | 0.00h       | **0.50h**   | QC   | low (PhatDLT covers) |

**Sheet totals:** Mon 22.5h, Tue 14.0h → **W25 D1+D2 = 36.5h Task dự án** (+1.5h non-task = 38h).
- Dev on-plan (ViTHT+VuTQ+ThinhT+DatNT) = **30.50h** of 108h plan target (28.2%)
- QC (PhatDLT+HungPN) = **4.50h** of 27h plan target (16.7%)

(TriNM excluded per memory: NOT QC.)

---

## Part 3 — Plan vs Actual (W25, Day 2 of 5)

Day-2 target = plan × 2/5 (40% mark).

| Dev    | Plan W25 | Actual D1+D2 | Day-2 target | Pace        |
|--------|---------:|-------------:|-------------:|-------------|
| ViTHT  | 40h      | 8.00h        | 16.0h        | **BEHIND −8h** (no Tue log) |
| DatNT  | 40h      | 14.50h       | 16.0h        | slightly behind (−1.5h) |
| ThinhT | 20h      | 8.00h        | 8.0h         | ON pace |
| VuTQ   | 8h       | 0.00h        | 3.2h         | **BEHIND −3.2h** (still no log) |
| QC     | 27h      | 4.50h        | 10.8h        | **BEHIND −6.3h** |

**Watch / alerts:**
- **ViTHT 0h Tuesday** — 8h Mon then nothing logged Tue. Either delayed log entry or off-day. Tue total only 14h vs Mon 22.5h confirms team-wide slowdown Tue.
- **VuTQ still 0h Day 2** — plan only 8h so 3.2h target is small. If still 0h by Wed close = alert.
- **QC −6.3h behind pace** — only 4.5h vs 10.8h target. Need PhatDLT/HungPN ramp Wed–Fri.

---

## Part 4 — Capacity & Runway (Est vs Charged)

Filter: exclude `Deployed on Live` + `Cancelled` + `N/A`. Remaining = `max(est − actual, 0)`.

| Metric                                       | 05-04   | 05-05   | **05-06 (now)** | Δ vs 05-05 |
|----------------------------------------------|--------:|--------:|----------------:|-----------:|
| Remaining NS+IP                              | 181.25h | 180.25h | **250.75h**     | **+70.50h** |
|   – NS only                                  | —       | 169.0h  | **219.00h**     | +50.00h |
|   – IP only                                  | —       | 11.25h  | **31.75h**      | +20.50h |
| Remaining broader (excl Live+Cancelled+N/A)  | 255.25h | 260.00h | **450.50h**     | **+190.50h** |
| Runway @48h/wk dev capacity (NS+IP)          | 3.78 wk | 3.76 wk | **5.22 wk**     | +1.46 wk |

### Backlog jump explained — NEW tasks added overnight

Three sizeable new entries detected (not present yest):
- **#2869** est 80h, actual 0h, status empty → newly added, ~80h of fresh scope
- **#2870** est 40h, actual 0h, status empty → newly added, ~40h fresh scope
- **#2854** est jumped from 40h → 60h (now 54.5h remaining)
- **#2587 GiftDrop Redemption** est 40h, status `Pending`, 36.5h remaining
- **#2871** est 32h, actual 2h (NS) → 30h remaining; was lower est yest

**Top NS+IP backlog (largest remaining):**
| Task | Rem | Est | Actual | Status |
|------|----:|----:|-------:|--------|
| #2854 cart/checkout update | 54.5h | 60h | 5.5h | Not Started |
| #2775 navigation refactor  | 43.0h | 60h | 17.0h | Not Started |
| #1178 fountain/infinity reviews | 40.0h | 40h | 0.0h | Not Started |
| #2871 build-a-box          | 30.0h | 32h | 2.0h | Not Started |
| #2524 duplicate charge     | 24.0h | 24h | 0.0h | Not Started |
| #2872 browse mobile        | 20.5h | 32h | 11.5h | IP <50% |
| #2590 fountain pro backend | 8.0h  | 8h  | 0.0h | Not Started |
| #2500                      | 8.0h  | 8h  | 0.0h | Not Started |
| #2554 platform-switcher    | 6.0h  | 6h  | 0.0h | Not Started |
| #2633 zip-code update      | 4.0h  | 8h  | 4.0h | IP >50% |

Backlog **expanded substantially** (broader +190h, NS+IP +70h) due to scope additions, not delivery slip. Runway technically 5.22 wk but reflects new work, not progress regression.

---

## Part 5 — Over-Estimate Tracking (actual > est × 1.2)

Always-tracked (per memory):

| Task | Est | Actual 05-05 | **Actual 05-06** | Over% | Status | Growing? |
|------|---:|---:|---:|---:|--------|---|
| **#2595 GiftDrop**           | 120h | 168.25h | **168.25h** |  +40% | Staging | **stable** |
| **#2615 Gift of Choice**     |  12h | 106.75h | **106.75h** | +790% | Staging | **stable** |
| **#2735 Pro Send Smart Link**|  90h | 126.00h | **126.00h** |  +40% | IP >50% | **stable** |
| **#2816 Infinity homepage**  |  20h |  40.25h | **41.75h**  | +109% | Staging | **+1.5h Tue** (minor) |
| **#2837**                    |  16h |  23.50h | **25.50h**  |  +59% | Staging | **+2.0h Tue** (minor) |
| **#2815**                    |   6h |  10.25h | **10.25h**  |  +71% | Staging | **stable** |

**No major new growth.** #2816 +1.5h (DatNT 1h + ViTHT 0.25h Mon + extra), #2837 +2h (ThinhT Tue work). Both within acceptable cleanup-day delta.

**Top other +20% over (no new entries vs yest):**
| Task | Est | Actual | Over% | Status |
|------|---:|---:|---:|--------|
| #2627                   | 0.5h |   8.25h | +1550% | Has Bug Live |
| #2615 (above)           | 12h  | 106.75h |  +790% | Staging |
| #2639 active/inactive   | 2h   |  16.50h |  +725% | Staging |
| #2501                   | 4h   |  25.50h |  +537% | Staging |
| #2380 checkout date     | 4h   |  25.25h |  +531% | Staging |
| #2604                   | 1h   |   3.50h |  +250% | Staging |
| #2702                   | 8h   |  25.00h |  +213% | IP >50% |
| #2624                   | 12h  |  31.25h |  +160% | Dev Done |

**No "STILL GROWING" red flags** — all major over-est tasks effectively stable or +1–2h cleanup only.

---

## Fountain Trello Board ([Web Development](https://trello.com/b/UDrSWage), board `5475eaf923a9a1309357eb51`)

### Customer comments (since 2026-04-24)
**Total: 38** (kunalsheth 20, tmmckay 14, mike62798179 4, iris63293413 0).
vs 05-05: **+8 new** (kunal +4, tmmckay +2, mike +2). **Customers active again Tuesday.**

**Latest pings (since 05-05):**
- 05-05 18:10 tmmckay — [Infinity Update homepage](https://trello.com/c/S0M1pEOs)
- 05-05 17:44 tmmckay — [Fountain Pro/Send Smart Link](https://trello.com/c/yrbbFhf9)
- 05-05 16:42 mike62798179 — [Shipstation 2nd/3rd shipment](https://trello.com/c/BYu5iwQM) **NEW**
- 05-05 14:19 kunalsheth — [Navigation refactor](https://trello.com/c/Tq5nQQQr)
- 05-05 14:18 kunalsheth — [Infinity Custom Roses page](https://trello.com/c/ElD5EOmr)
- 05-05 14:18 kunalsheth — [Infinity Product page update](https://trello.com/c/rRU4Qk4n) **NEW thread**

**Stale unresolved:** [NoMethodError pro_cart_items#destroy](https://trello.com/c/aVOTR4WR) — kunalsheth 05-04 00:18, **now ~57h old**, ViTHT logged 1.5h Mon (Dev Done per W25 row) → status now Dev Done, awaiting QC. Fix landed but not yet released — should report to customer.

### Active card counts per list
| List | 05-06 | 05-05 | Δ |
|------|------:|------:|--:|
| To-Do          | 32 | 33 | **−1** |
| Bugs           | 15 | 14 | **+1** |
| Doing          |  8 |  7 | **+1** |
| QC Internal    |  6 |  7 | **−1** |
| QA Backlog     |  5 |  5 | 0 |
| In QA          |  3 |  3 | 0 |
| Not Passed     |  2 |  1 | **+1** |
| **Total active** | **71** | **70** | **+1** |

Bugs +1, Doing +1, Not Passed +1 — bug load increasing slightly. QC Internal −1 (one moved out). Net mild churn.

### Stuck cards (dateLastActivity > 5 days)
**50 stuck** (vs 52 on 05-05, **−2**). Worst:
- 197.9d — [Platform switcher fix](https://trello.com/c/JVLMbyYO) (To-Do)
- 160.7d — [PayPalHttp::HttpError generate_order](https://trello.com/c/6MTnv0Cc) (Bugs)
- 154.0d — [Fountain Pro Backend Updates](https://trello.com/c/kUkibmUS) (To-Do)
- 131.9d — [Fountain Pro roles](https://trello.com/c/q3rvudcU) (To-Do)
- 131.9d — [Duplicate Charge](https://trello.com/c/VXxyO8IW) (To-Do)
- 131.9d — [Suggestion: Unit Test](https://trello.com/c/0jFodYfi) (To-Do)
- 131.7d — [URL is case sensitive](https://trello.com/c/NDZTWQ3a) (To-Do)
- 121.2d — [Update search](https://trello.com/c/1zWeXmlT) (To-Do)
- 121.2d — [Automate card printing](https://trello.com/c/aWLxiSK9) (To-Do)
- 121.2d — [Automate card printing extra](https://trello.com/c/xr8Q0N3G) (To-Do)

Stuck **−2** vs yesterday — slight improvement. Top 10 ages all unchanged (all in To-Do, no recent activity).

### Hard-to-release (Doing 14+ days)
**3 cards** (vs 2 on 05-05, **+1**):
- **32.7d** — [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) (was 31.8d, +0.9d)
- **20.9d** — [Fountain — Business (Homepage) Updates](https://trello.com/c/WGsYqu5h) (was 20.0d, +0.9d)
- **14.5d** — [Fountain & Infinity — Add Subtle Scroll Animations](https://trello.com/c/g5SK007L) — **NEW (just crossed 14d threshold)**

Hard-to-release pool growing. clSdoRlL approaching 33d, WGsYqu5h 21d, g5SK007L just crossed.

---

## Recommendation for Trello Check Progress "Fountain" item

**Status: WARNING — keep unchecked**

Justification (alerts):
1. **VuTQ 0h Day 2** — still no log (plan 8h W25); single zero is OK, two-day zero needs check by Wed close
2. **ViTHT 0h Tuesday** — 8h Mon then nothing Tue, may be delayed log; pace target 16h vs 8h actual = −8h behind
3. **QC −6.3h behind pace** (4.5h vs 10.8h target Day 2)
4. **Customer comments +8** (kunal +4, tmmckay +2, mike +2 NEW Shipstation issue)
5. **Backlog jump +190h broader / +70h NS+IP** — new tasks #2869 (80h), #2870 (40h), #2871 (30h), #2587 Pending (36.5h), #2854 expanded
6. **Hard-to-release +1** ([g5SK007L](https://trello.com/c/g5SK007L) just crossed 14d), clSdoRlL 32.7d, WGsYqu5h 20.9d
7. **Bugs +1**, **Not Passed +1** — quality regression signal mild
8. **NoMethodError pro_cart_items** — ViTHT fixed (Dev Done), but customer still awaiting confirmation ~57h old

Clean signals:
- All 6 tracked over-est tasks **stable** vs yest (#2816 +1.5h, #2837 +2h are within minor cleanup band)
- Stuck cards **−2** (52 → 50)
- DatNT (+7h Tue) and ThinhT (+4h Tue) on solid pace
- Total active +1 (small churn)
- W25 Matrix plan unchanged, no escalations

**Net: WARNING — keep Fountain checklist item unchecked.** Primary concerns = ViTHT/VuTQ logging gap Day 2, QC pace lagging, +8 new customer comments overnight (customers re-engaging), backlog +190h from new scope (#2869, #2870, #2871), hard-to-release pool growing. Over-est tracking otherwise quiet.

---

## Unresolved Questions

1. **VuTQ Day 2 still 0h** — was small plan (8h) so no alert yet. Re-check Wed close; if still 0h → escalate.
2. **ViTHT 0h Tuesday** — delayed log entry, sick day, or genuine off-day? Worth pinging team-coord to confirm.
3. **#2869 (80h) and #2870 (40h)** — newly added but status empty. Need triage to NS or scope confirmation.
4. **NoMethodError pro_cart_items#destroy** — ViTHT fix Dev Done; should QC fast-track and notify kunalsheth.
