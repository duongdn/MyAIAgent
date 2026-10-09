# Fountain (5-part) — Thu 2026-05-07 → Fri 2026-05-08 08:32 (+07)

Active week = **W25** (May 4–10). Reporting day = Thu 2026-05-07 (Day 4 of 5).
Previous: `reports/2026-05-07/_piece-fountain.md`.
Window start: 2026-05-07T08:37:42 +07.

> **Matrix token:** Expired this morning. Refreshed via `node scripts/matrix-token-refresh.js` — verified `whoami` = `@duongdn:nustechnology.com`, status 200. New token saved to `config/.matrix-config.json`.

---

## Part 1 — Matrix W25 Plan (UNCHANGED since 05-04)

Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. Verified 640 messages back-paged.

**Latest plan posted by @trinhmtt at 2026-05-04 11:56:52 +07 — UNCHANGED:**
> Em update plan tuần này ạ
> ViTHT 40h
> VuTQ 8h
> ThinhT 20h
> DatNT 40h
> => QC: 27h

No revision posted overnight (last 4 days back-paged, no new "plan tuần" message after 05-04 11:56). Plan total = **135h** (108h dev + 27h QC). HaVS / LamLQ / HungPN: NOT in plan (off-plan).

---

## Part 2 — Task Log Actuals (W25 D1+D2+D3+D4 = Mon Tue Wed Thu)

Source: Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` — W25 tab.

| Dev    | Mon 04/05 | Tue 05/05 | Wed 06/05 | **Thu 07/05** | **W25 total D1-D4** | Role | Notes |
|--------|----------:|----------:|----------:|--------------:|--------------------:|------|-------|
| ViTHT  | 8.00h     | 6.50h     | 8.00h     | **0.00h**     | **22.50h**          | dev  | **NO THU LOG** (Wed log appeared, Thu now zero) |
| DatNT  | 8.00h     | 8.00h     | 8.00h     | **8.00h**     | **32.00h**          | dev  | on plan, steady |
| ThinhT | 4.00h     | 4.00h     | 4.00h     | **0.00h**     | **12.00h**          | dev  | **NO THU LOG** |
| VuTQ   | 5.00h     | 0.00h     | 0.00h     | **0.00h**     | **5.00h**           | dev  | front-loaded; 5/8h plan = 62.5% met |
| HaVS   | 0.00h     | 0.00h     | 0.00h     | 0.00h         | 0.00h               | dev  | off-plan (silent) |
| LamLQ  | 0.00h     | 0.00h     | 8.00h     | **8.00h**     | **16.00h**          | dev  | off-plan, jumped in Wed+Thu |
| PhatDLT| 2.00h     | 2.00h     | 2.00h     | **2.00h**     | **8.00h**           | QC   | on plan, steady |
| HungPN | 0.50h     | 0.00h     | 0.00h     | **0.00h**     | **0.50h**           | QC   | only 0.5h W25 — full QC load on PhatDLT |

Sheet day totals: Mon 55.0h, Tue 41.0h, Wed 60.0h, Thu 36.0h → **W25 D1-D4 = 192.0h** (incl ViLP and other team members not in plan).
Plan-tracked (4 devs + 2 QC) D1-D4 = 22.5+32+12+5+8+0.5 = **80.0h** (LamLQ excluded as off-plan).

(TriNM excluded — NOT QC; not in W25 sheet.)

---

## Part 3 — Plan vs Actual (W25, end of Day 4)

Day-4 target = plan × 4/5 (80% mark).

| Dev       | Plan W25 | Actual D1-D4 | Day-4 target | Delta    | Pace |
|-----------|---------:|-------------:|-------------:|---------:|------|
| ViTHT     | 40h      | 22.50h       | 32.0h        | **−9.5h** | **BEHIND** (no Thu log; same gap as yesterday's Day-3 −9.5h) |
| DatNT     | 40h      | 32.00h       | 32.0h        | **+0.0h** | **ON pace** |
| ThinhT    | 20h      | 12.00h       | 16.0h        | **−4.0h** | **BEHIND** (no Thu log) |
| VuTQ      | 8h       | 5.00h        | 6.4h         | **−1.4h** | mild behind, but 62.5% plan met w/ 1 day remaining |
| QC        | 27h      | 8.50h        | 21.6h        | **−13.1h** | **BEHIND** |
| **Total** | **135h** | **80.00h**   | **108.0h**   | **−28.0h** | behind ~26% |

**Watch / alerts:**
- **ViTHT 0h Thursday** — pattern repeats (Wed 0h reported yesterday, then logged after fact; today Thu shows 0h). Behind by −9.5h (unchanged delta vs yesterday — no progress).
- **ThinhT 0h Thursday** — first day with no log; previously perfectly steady at 4h/day. Could be delayed entry.
- **VuTQ small plan (8h)** — front-loaded 5h Mon. With Thu still zero, only 1 day left; risk of −3h shortfall but plan was small to start.
- **QC −13.1h behind pace** — only 8.5h vs 21.6h target Day 4. PhatDLT carries 8h of 8.5h. HungPN essentially silent (0.5h all week).

**Per memory rules:** VuTQ 8h plan ≥60% met → 0h subsequent days normal; do NOT flag VuTQ. ViTHT major dev with significant behind → flag. Individual 0h days NOT raised as unresolved questions (PM tracks via Matrix).

---

## Part 4 — Capacity & Runway (Est vs Charged)

Filter (per spec): NS+IP only excludes Deployed on Live, Cancelled, Has Bug on Live, Tested on Live. Strict NS+IP = `Not Started` + `In-progress (<50%)` + `In-progress (>50%)`. Total est = Col I (Est Dev Raw) + Col J (CR). Remaining = `max((est+CR) − actual, 0)`.

| Metric                                       | 05-06   | 05-07   | **05-08 (now)** | Δ vs 05-07 |
|----------------------------------------------|--------:|--------:|----------------:|-----------:|
| Remaining NS+IP (strict)                     | 250.75h | 237.25h | **224.75h**     | **−12.50h** |
|   – Not Started only                         | 219.00h | 207.50h | **203.00h**     | −4.50h |
|   – In-progress only                         |  31.75h |  29.75h | **21.75h**      | −8.00h |
| Remaining Pending                            |  36.50h |  36.50h | **36.50h**      | 0 (#2587 unchanged) |
| Remaining broader (excl Live/Cancelled)      | 450.50h | 437.00h | **424.50h**     | **−12.50h** |
| Runway @48h/wk (NS+IP strict)                | 5.22 wk | 4.94 wk | **4.68 wk**     | **−0.26 wk** |

**Continued backlog progress** — NS+IP −12.5h, broader −12.5h (matched, no new scope). Reflects ~12.5h of completed work moving NS/IP into Dev Done/Staging without overnight scope additions.

**CR contributors (Col J)** — Total CR = **43.5h** across 3 tasks (UNCHANGED):
- #2735 +30h (90+30=120h total)
- #2837 +10.5h (16+10.5=26.5h total)
- #2815 +3h (6+3=9h total)

**Top NS+IP backlog (largest remaining):**
| Task | Status | Est | CR | Actual | Remaining |
|------|--------|----:|---:|-------:|----------:|
| #2854 cart/checkout | Not Started | 60h | 0 | 16.5h | 43.5h |
| #2775 navigation refactor | Not Started | 60h | 0 | 19.0h | 41.0h |
| #1178 fountain/infinity reviews | Not Started | 40h | 0 | 0.0h | 40.0h |
| #2871 build-a-box | Not Started | 32h | 0 | 5.0h | 27.0h |
| #2524 duplicate charge | Not Started | 24h | 0 | 0.0h | 24.0h |
| #2872 browse mobile | IP >50% | 32h | 0 | 21.5h | 10.5h |
| #2590 fountain pro backend | Not Started | 8h | 0 | 0.0h | 8.0h |
| #2500 | Not Started | 8h | 0 | 0.0h | 8.0h |
| #2554 platform-switcher-fix | Not Started | 6h | 0 | 0.0h | 6.0h |
| #2633 pro template zip-code | IP >50% | 8h | 0 | 4.0h | 4.0h |

**Empty status (still status-empty, NEED TRIAGE):**
- #2869 (80h est, 0h actual) — same as 2 days ago
- #2870 (40h est, 0h actual) — same as 2 days ago
- #2853 (20h est, 29.75h actual) — already over budget but no status set
- #2813 (0h est, 3.5h actual) — track-only

#2854 (cart/checkout) advanced from 12h actual yesterday → 16.5h today (+4.5h work logged). #2872 (browse mobile) +8h work logged (13.5h → 21.5h).

---

## Part 5 — Over-Estimate Tracking (actual > (est+CR) × 1.2)

Always-tracked tasks (per memory rules):

| Task | Est+CR | Actual 05-07 | **Actual 05-08** | Over% | Status | Δ vs Yest |
|------|------:|------:|------:|---:|--------|---|
| **#2595 GiftDrop**            | 120h | 168.25h | **168.25h** |  +40% | Staging | **stable** (Δ 0h) |
| **#2615 Gift of Choice**      |  12h | 106.75h | **106.75h** | +790% | Staging | **stable** (Δ 0h) |
| **#2735 Pro Send Smart Link** | 120h (90+30) | 127.50h | **129.00h** |   +7.5% | IP >50% | **+1.50h** (minor cleanup) |
| **#2816 Infinity homepage**   |  20h |  43.75h | **43.75h**  | +119% | Staging | **stable** (Δ 0h) |
| **#2501**                     |   4h |  25.50h | **25.50h**  | +538% | Staging | **stable** |
| **#2380 checkout date**       |   4h |  25.25h | **25.25h**  | +531% | Staging | **stable** |
| **#2639 active/inactive**     |   2h |  16.50h | **16.50h**  | +725% | Staging | **stable** |
| **#2624 order-complete**      |  12h |  31.25h | **31.25h**  | +160% | Dev Done | **stable** |
| **#2702**                     |   8h |  25.00h | **25.00h**  | +213% | IP >50% | **stable** |
| **#2837**                     |  26.5h (16+10.5) |  26.50h | **26.50h**  |   0% | Staging | **stable** |
| **#2815**                     |   9h (6+3) |  10.25h | **10.75h**  |  +19% | Staging | **+0.50h** (minor) |

**No "STILL GROWING" red flags.** All movement within minor cleanup band (≤1.5h). #2735 received +1.5h actual (continued IP work; ratio still only +7.5% under est+CR=120h). #2815 +0.5h, ratio stable at +19% under est+CR=9h.

**Top other +20% over-estimate (entire backlog):**
| Task | Est+CR | Actual | Over% | Status |
|------|------:|------:|---:|--------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug Live |
| #2615 | 12h | 106.75h | +790% | Staging |
| #2639 | 2h | 16.50h | +725% | Staging |
| #2545 build-a-box modal | 1h | 7.50h | +650% | Live |
| #2630 | 0.5h | 3.75h | +650% | N/A |
| #2613 | 2h | 14.50h | +625% | Live |
| #2652 | 1.5h | 10.50h | +600% | Live |
| #2501 | 4h | 25.50h | +538% | Staging |
| #2380 checkout date | 4h | 25.25h | +531% | Staging |
| #2691 | 1h | 6.0h | +500% | Live |
| #2523 | 16h | 61.0h | +281% | Live |
| #2603 | 4h | 14.50h | +263% | Live |
| #2702 | 8h | 25.0h | +213% | IP >50% |
| #2624 order-complete | 12h | 31.25h | +160% | Dev Done |
| #2816 Infinity homepage | 20h | 43.75h | +119% | Staging |

---

## Trello Board ([Web Development](https://trello.com/b/UDrSWage), board `5475eaf923a9a1309357eb51`)

### Customer comments since window start (2026-05-07 08:37 +07)

**Total: 4** (kunalsheth 3, tmmckay 1, mike62798179 0, iris63293413 0). Significant DROP from yesterday's 12.

**All 4 (newest first):**
- 05-07 18:53 tmmckay — [Infinity - Update homepage](https://trello.com/c/S0M1pEOs)
- 05-07 14:46 kunalsheth — [Infinity - Product page update](https://trello.com/c/rRU4Qk4n)
- 05-07 14:42 kunalsheth — [Infinity - Product page update](https://trello.com/c/rRU4Qk4n) (same card 2nd ping within minutes)
- 05-07 14:42 kunalsheth — [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr)

### Active card counts per list

| List | 05-08 | 05-07 | Δ |
|------|------:|------:|--:|
| To-Do          | 29 | 30 | **−1** |
| Bugs           | 17 | 20 | **−3** |
| Doing          |  9 |  8 | **+1** |
| QC Internal    |  4 |  6 | **−2** |
| QA Backlog     |  6 |  5 | **+1** |
| In QA          |  3 |  3 | 0 |
| Not Passed     |  2 |  2 | 0 |
| **Total active** | **70** | **74** | **−4** |

**Bugs −3** is the standout positive (some closed/moved). To-Do −1 (mild triage). QC Internal −2 (cards moved to QA Backlog +1, In QA flat). Doing +1 (one card escalated).

### Stuck cards (dateLastActivity > 5 days)

**47 stuck** (vs 49 on 05-07, **−2**). Top 10 worst:
- 162.7d — [PayPalHttp::HttpError generate_order](https://trello.com/c/6MTnv0Cc) (Bugs)
- 156.0d — [Fountain Pro Backend Updates](https://trello.com/c/kUkibmUS) (To-Do)
- 133.9d — [Suggestion: Unit Test](https://trello.com/c/0jFodYfi) (To-Do)
- 133.7d — [URL is case sensitive](https://trello.com/c/NDZTWQ3a) (To-Do)
- 123.2d — [Update search](https://trello.com/c/1zWeXmlT) (To-Do)
- 123.2d — [Automate card printing](https://trello.com/c/aWLxiSK9) (To-Do)
- 123.2d — [Automate card printing extra](https://trello.com/c/xr8Q0N3G) (To-Do)
- 123.2d — [Integrate infinity roses](https://trello.com/c/7UCszbbS) (To-Do)
- 123.2d — [Creating warning USPS Packages](https://trello.com/c/6x6twDXc) (To-Do)
- 123.2d — [Ai powered message screen](https://trello.com/c/KNq08ij5) (To-Do)

All top ages tracking +1 day naturally (no movement of oldest items, but pool count shrinking).

### Hard-to-release (Doing 14+ days)

**4 cards** (same as 05-07, **+0**):
- **34.7d** — [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) (was 33.7d, +1.0d)
- **22.9d** — [Fountain — Business Homepage Updates](https://trello.com/c/WGsYqu5h) (was 21.9d, +1.0d)
- **16.5d** — [Fountain & Infinity — Subtle Scroll Animations](https://trello.com/c/g5SK007L) (was 15.5d, +1.0d)
- **15.7d** — [ActiveRecord::RecordNotFound admin/users#show](https://trello.com/c/tRyNrE2x) (was 14.7d, +1.0d)

Pool size stable at 4. clSdoRlL approaching 35d — overdue critical, no movement.

---

## Recommendation for Trello Check Progress "Fountain" item

**Status: WARNING — keep unchecked**

Justification (alerts):
1. **ViTHT 0h Thursday** — pattern repeats from yesterday's Wed gap; same −9.5h gap vs Day-4 plan target. No catch-up.
2. **ThinhT 0h Thursday** — first day without log, previously steady. −4h pace gap.
3. **QC −13.1h behind pace** (8.5h vs 21.6h target Day 4); HungPN essentially silent (0.5h all week).
4. **#2869 (80h) + #2870 (40h) status STILL EMPTY** — 3 days now without triage. Plus #2853 (20h est, 29.75h actual already over budget) status-empty.
5. **Hard-to-release pool unchanged at 4 cards** — clSdoRlL now 34.7d (no progress); admin/users#show 15.7d (still climbing).
6. **kunalsheth 3 pings on Infinity Product page (rRU4Qk4n)** within 4 minutes — escalating customer frustration.

Clean signals:
- Backlog **continuing to shrink**: NS+IP −12.5h (now 224.75h), broader −12.5h (424.5h), runway 4.68 wk (−0.26 wk).
- All 11 tracked over-est tasks **stable** (≤1.5h cleanup deltas, NO STILL GROWING flags).
- Customer comments **−8** vs yesterday (12 → 4) — kunalsheth heavy ping wave from Wed evening subsided.
- Bugs list **−3**, To-Do **−1**, QC Internal **−2** — total active −4 (good cleanup progress).
- Stuck cards **−2** (49 → 47).
- Hard-to-release count flat at 4 (no new entries).
- DatNT on plan, all tracked tasks stable, no scope additions.
- W25 Matrix plan unchanged.

**Net: WARNING — keep Fountain checklist item unchecked.** Primary concerns = ViTHT/ThinhT Thu log gaps (−9.5h, −4h pace), QC −13.1h behind, status-empty backlog (#2869 80h + #2870 40h, 3 days unchecked).

---

## ALERTS / Concerns

- **HOT:** ViTHT consecutive 0h Thu (no catch-up from Wed gap), ThinhT first 0h Thu, QC pace −13.1h behind plan.
- **MEDIUM:** #2869 (80h) + #2870 (40h) + #2853 (29.75h actual, no est) — 3 status-empty tasks needing triage. clSdoRlL 34.7d in Doing (no movement).
- **POSITIVE:** Customer comment activity −8 vs yesterday, total active cards −4, NS+IP backlog −12.5h, no STILL GROWING tracked tasks.

## Unresolved Questions

1. **ViTHT 0h Thu (consecutive after Wed pattern)** — delayed log, sick day, or off-plan? Same −9.5h delta as yesterday; needs PM ping.
2. **ThinhT 0h Thu** — first day without log after perfect 4h/day streak. Delayed entry or actual gap?
3. **#2869 / #2870 / #2853** — 3 status-empty tasks (140h+ est total). Triage owner needed.
4. **clSdoRlL Fountain States/scrolling** — 34.7d in Doing with no activity. Needs unblock or escalation.
5. **kunalsheth Infinity Product page (rRU4Qk4n)** — 3 pings in 4 minutes (14:42-14:46) — what specific issue?
