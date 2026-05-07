# Fountain (5-part) — Wed 2026-05-06 → Thu 2026-05-07 08:22 (+07)

Active week = **W25** (May 4–10). Reporting day = Wed 2026-05-06 (Day 3 of 5).
Previous: `reports/2026-05-06/_piece-fountain.md`.

> **Matrix token:** Expired this morning. Refreshed via `node scripts/matrix-token-refresh.js` — verified `whoami` = `@duongdn:nustechnology.com`, new token saved to `config/.matrix-config.json`.

---

## Part 1 — Matrix W25 Plan (UNCHANGED since 05-04)

Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`.

**W25 plan posted by @trinhmtt 2026-05-04 11:56:52 (+07) — UNCHANGED:**
> Em update plan tuần này ạ
> ViTHT 40h
> VuTQ 8h
> ThinhT 20h
> DatNT 40h
> => QC: 27h

No revision posted overnight (last 280 messages back-paged, no new "plan tuần" message after 05-04 11:56). Plan total = **135h** (108h dev + 27h QC). HaVS / LamLQ / HungPN / TriNM: NOT in plan (off-plan).

---

## Part 2 — Task Log Actuals (W25 D1+D2+D3 = Mon Tue Wed)

Source: Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o` — W25 tab. Sum col H grouped by owner col G across day blocks.

| Dev    | Mon 04/05 | Tue 05/05 | **Wed 06/05** | **W25 total** | Role | Notes |
|--------|----------:|----------:|--------------:|--------------:|------|-------|
| ViTHT  | 8.00h     | 6.50h     | **0.00h**     | **14.50h**    | dev  | **NO WED LOG** |
| DatNT  | 8.00h     | 8.00h     | **8.00h**     | **24.00h**    | dev  | on plan, steady |
| ThinhT | 4.00h     | 4.00h     | **4.00h**     | **12.00h**    | dev  | on plan, steady |
| VuTQ   | 5.00h     | 0.00h     | **0.00h**     | **5.00h**     | dev  | **STILL ZERO Day 2+3** |
| HaVS   | 0.00h     | 0.00h     | 0.00h         | 0.00h         | dev  | off-plan |
| LamLQ  | 0.00h     | 0.00h     | **8.00h**     | **8.00h**     | dev  | off-plan, jumped in Wed (6h Việc cty + 2h task) |
| PhatDLT| 2.00h     | 2.00h     | **2.00h**     | **6.00h**     | QC   | on plan, steady |
| HungPN | 0.50h     | 0.00h     | **0.00h**     | **0.50h**     | QC   | only 0.5h W25 — QC load on PhatDLT |

Sheet header totals (col H sum): Mon 27.5h, Tue 20.5h, Wed 22.0h → **W25 D1+D2+D3 = 70.0h**.
Yesterday's prior reported D1+D2 = 36.5h "task dự án" → today's D1+D2+D3 task-only ≈ 67.5h (after counting Wed).

(TriNM excluded per memory: NOT QC; not in W25 sheet rows.)

---

## Part 3 — Plan vs Actual (W25, end of Day 3)

Day-3 target = plan × 3/5 (60% mark).

| Dev    | Plan W25 | Actual D1+D2+D3 | Day-3 target | Delta | Pace |
|--------|---------:|----------------:|-------------:|------:|------|
| ViTHT  | 40h      | 14.50h          | 24.0h        | **−9.5h** | **BEHIND** (no Wed log) |
| DatNT  | 40h      | 24.00h          | 24.0h        | **+0.0h** | **ON pace** |
| ThinhT | 20h      | 12.00h          | 12.0h        | **+0.0h** | **ON pace** |
| VuTQ   | 8h       | 5.00h           | 4.8h         | **+0.2h** | **ON pace** (front-loaded Mon) |
| QC     | 27h      | 6.50h           | 16.2h        | **−9.7h** | **BEHIND** |
| Plan total | 135h | 62.00h dev + 6.50h QC = 68.50h | 81.0h | **−12.5h** | behind ~15% |

**Watch / alerts:**
- **ViTHT 0h Wednesday** — 8h Mon, 6.5h Tue, **nothing logged Wed**. Either delayed log or off-day. Same pattern as last week; gap −9.5h vs target.
- **VuTQ stable** — front-loaded 5h Mon (plan 8h) covers Day 3 target; remaining 3h spreadable Thu–Fri. Still no log Tue+Wed but plan ratio OK.
- **QC −9.7h behind pace** — only 6.5h vs 16.2h target Day 3. PhatDLT carries (6h of 6.5h). HungPN essentially silent (0.5h all week).

---

## Part 4 — Capacity & Runway (Est vs Charged)

Filter: exclude `Deployed on Live`, `Cancelled`, `N/A`. Remaining = `max((est+CR) − actual, 0)`.

| Metric                                       | 05-05   | 05-06   | **05-07 (now)** | Δ vs 05-06 |
|----------------------------------------------|--------:|--------:|----------------:|-----------:|
| Remaining NS + IP                            | 180.25h | 250.75h | **237.25h**     | **−13.50h** |
|   – NS only                                  | 169.0h  | 219.00h | **207.50h**     | −11.50h |
|   – IP only                                  | 11.25h  | 31.75h  | **29.75h**      | −2.00h |
| Remaining Pending                            | —       | 36.50h  | **36.50h**      | 0.00h (#2587 unchanged) |
| Remaining broader (excl Live/Cancel/N/A)     | 260.00h | 450.50h | **437.00h**     | **−13.50h** |
| Runway @48h/wk (NS+IP)                       | 3.76 wk | 5.22 wk | **4.94 wk**     | **−0.28 wk** |

**Mild progress on backlog** — NS+IP down −13.5h, broader −13.5h (matched). Reflects ~13.5h of completed work checking out of NS/IP into Dev Done/Staging without new scope additions overnight.

**Top NS+IP backlog (largest remaining):**
| Task | Status | Est | CR | Actual | Remaining |
|------|--------|----:|---:|-------:|----------:|
| #2869 | (empty) | 80h | 0 | 0.0h | **80.0h** |
| #2854 cart/checkout | Not Started | 60h | 0 | 12.0h | 48.0h |
| #2775 navigation refactor | Not Started | 60h | 0 | 19.0h | 41.0h |
| #1178 fountain/infinity reviews | Not Started | 40h | 0 | 0.0h | 40.0h |
| #2870 | (empty) | 40h | 0 | 0.0h | 40.0h |
| #2587 GiftDrop redemption | **Pending** | 40h | 0 | 3.5h | 36.5h |
| #2871 build-a-box | Not Started | 32h | 0 | 5.0h | 27.0h |
| #2524 duplicate charge | Not Started | 24h | 0 | 0.0h | 24.0h |
| #2872 browse mobile | IP >50% | 32h | 0 | 13.5h | 18.5h |
| #2553 create-account-modal | Dev Done | 26h | 0 | 5.5h | 20.5h |

#2869 (80h) and #2870 (40h) **still status-empty** — same as yesterday. Need triage.

---

## Part 5 — Over-Estimate Tracking (actual > (est+CR) × 1.2)

Always-tracked tasks (per memory):

| Task | Est+CR | Actual 05-06 | **Actual 05-07** | Over% | Status | vs Yesterday |
|------|------:|------:|------:|---:|--------|---|
| **#2595 GiftDrop**            | 120h | 168.25h | **168.25h** |  +40% | Staging | **stable** |
| **#2615 Gift of Choice**      |  12h | 106.75h | **106.75h** | +790% | Staging | **stable** |
| **#2735 Pro Send Smart Link** | 120h (90+30) | 126.00h | **127.50h** |   +6% | IP >50% | **+1.50h** (LamLQ Wed task work; minor cleanup) |
| **#2816 Infinity homepage**   |  20h |  41.75h | **43.75h**  | +119% | Staging | **+2.00h** (DatNT/ThinhT cleanup; minor) |
| **#2837**                     |  26.5h (16+10.5) |  25.50h | **26.50h**  |   ~0% | Staging | **+1.00h** — ratio dropped (CR added 10.5h) |
| **#2815**                     |   8h (6+2) |  10.25h | **10.25h**  |  +28% | Staging | **stable** — ratio improved (CR added 2h) |

**No "STILL GROWING" red flags.** All movement within minor cleanup band (≤2h). #2837 and #2815 over% **dropped** vs yesterday because CR scope was added (formal expansion of scope). #2735 received +1.5h actual (LamLQ Wed) but est+CR is 120h so ratio is now only +6% (was +40% under 90h est).

**Top other +20% over (no new high-growth entries):**
| Task | Est+CR | Actual | Over% | Status |
|------|------:|------:|---:|--------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug Live |
| #2615 | 12h | 106.75h | +790% | Staging |
| #2639 active/inactive | 2h | 16.50h | +725% | Staging |
| #2545 build-a-box modal | 1h | 7.50h | +650% | Live |
| #2613 | 2h | 14.50h | +625% | Live |
| #2652 | 1.5h | 10.50h | +600% | Live |
| #2501 | 4h | 25.50h | +538% | Staging |
| #2380 checkout date | 4h | 25.25h | +531% | Staging |
| #2702 | 8h | 25.00h | +212% | IP >50% |
| #2624 order-complete | 12h | 31.25h | +160% | Dev Done |

---

## Trello Board ([Web Development](https://trello.com/b/UDrSWage), board `5475eaf923a9a1309357eb51`)

### Customer comments since 2026-05-06 08:30 (+07)

**Total: 12** (kunalsheth 7, tmmckay 4, mike62798179 1, iris63293413 0). vs 71 active baseline.
Heavy customer activity overnight — kunalsheth pinging multiple infinity/order issues.

**All 12 (newest first):**
- 05-06 22:20 tmmckay — [Fountain - Small updates to product catalog](https://trello.com/c/OtY8gvyO)
- 05-06 22:06 tmmckay — [Fountain - Update cocktail kits page](https://trello.com/c/MCrJnPGx)
- 05-06 22:03 tmmckay — [Infinity - Product page updates](https://trello.com/c/agAB5Wf8)
- 05-06 21:53 mike62798179 — [Customer did not receive confirmation email](https://trello.com/c/iLXAB5cS) **NEW**
- 05-06 20:51 kunalsheth — [Customer did not receive confirmation email](https://trello.com/c/iLXAB5cS) (same card)
- 05-06 19:58 kunalsheth — [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr)
- 05-06 19:58 kunalsheth — [Infinity - Product page update](https://trello.com/c/rRU4Qk4n)
- 05-06 15:42 tmmckay — [Fountain - Free branded packaging](https://trello.com/c/c1uHuBWW) **NEW**
- 05-06 10:49 kunalsheth — [Infinity - Order 4390256BM](https://trello.com/c/xWIwIlMy) **NEW**
- 05-06 10:23 kunalsheth — [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr)
- 05-06 10:20 kunalsheth — [NoMethodError pro_cart_items#destroy](https://trello.com/c/aVOTR4WR) (still alive — pending kunal confirmation)
- 05-06 10:20 kunalsheth — [Infinity - Order 4390256BM](https://trello.com/c/xWIwIlMy)

### Active card counts per list
| List | 05-07 | 05-06 | Δ |
|------|------:|------:|--:|
| To-Do          | 30 | 32 | **−2** |
| Bugs           | 20 | 15 | **+5** |
| Doing          |  8 |  8 | 0 |
| QC Internal    |  6 |  6 | 0 |
| QA Backlog     |  5 |  5 | 0 |
| In QA          |  3 |  3 | 0 |
| Not Passed     |  2 |  2 | 0 |
| **Total active** | **74** | **71** | **+3** |

**Bugs +5** is the standout — significant new bug intake overnight. To-Do −2 (some triaged into Bugs, others closed). Doing flat at 8.

### Stuck cards (dateLastActivity > 5 days)
**49 stuck** (vs 50 on 05-06, **−1**). Worst:
- 161.7d — [PayPalHttp::HttpError generate_order](https://trello.com/c/6MTnv0Cc) (Bugs)
- 155.0d — [Fountain Pro Backend Updates](https://trello.com/c/kUkibmUS) (To-Do)
- 132.9d — [Suggestion: Unit Test](https://trello.com/c/0jFodYfi) (To-Do)
- 132.7d — [URL is case sensitive](https://trello.com/c/NDZTWQ3a) (To-Do)
- 122.2d — [Update search](https://trello.com/c/1zWeXmlT) (To-Do)
- 122.2d — [Automate card printing](https://trello.com/c/aWLxiSK9) (To-Do)
- 122.2d — [Automate card printing extra](https://trello.com/c/xr8Q0N3G) (To-Do)
- 122.2d — [Integrate infinity roses](https://trello.com/c/688f974212c7282246e758bf) (To-Do)
- 122.2d — [USPS Packages warning](https://trello.com/c/6838a8c7280facdce73409cf) (To-Do)
- 120.9d — [fountain/infinity implement reviews](https://trello.com/c/6360ab1103f56e02d8b51474) (To-Do)

Note: yesterday's #1 stuck `Platform switcher fix` (197.9d) — gone from To-Do? Re-check needed (may have been moved or resolved). Top ages all otherwise tracking +1 day naturally.

### Hard-to-release (Doing 14+ days)
**4 cards** (vs 3 on 05-06, **+1**):
- **33.7d** — [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) (was 32.7d, +1.0d)
- **21.9d** — [Fountain — Business (Homepage) Updates](https://trello.com/c/WGsYqu5h) (was 20.9d, +1.0d)
- **15.5d** — [Fountain & Infinity — Subtle Scroll Animations](https://trello.com/c/g5SK007L) (was 14.5d, +1.0d)
- **14.7d** — [ActiveRecord::RecordNotFound admin/users#show](https://trello.com/c/69e85382c9b2c628a0323524) — **NEW (just crossed 14d threshold)**

Hard-to-release pool growing. clSdoRlL approaching 34d — overdue critical.

---

## Recommendation for Trello Check Progress "Fountain" item

**Status: WARNING — keep unchecked**

Justification (alerts):
1. **ViTHT 0h Wednesday** — 8h Mon + 6.5h Tue then nothing Wed (same pattern as last week's Tue gap); pace −9.5h behind plan target.
2. **QC −9.7h behind pace** (6.5h vs 16.2h target Day 3); HungPN essentially silent (0.5h all week).
3. **Customer comments +12** since 05-06 08:30 — kunalsheth heavy (7 pings), 3 NEW threads (mike conf email, tmmckay packaging, kunal Order 4390256BM).
4. **Bugs +5** overnight — significant new bug intake.
5. **Hard-to-release +1** (admin/users#show ActiveRecord just crossed 14d). clSdoRlL now 33.7d.
6. **#2869 (80h) + #2870 (40h)** still status-empty 2 days after addition — triage backlog.
7. **NoMethodError pro_cart_items** — still kunal-pinged (10:20 Wed); customer awaiting confirmation; ViTHT fix Dev Done per yesterday.

Clean signals:
- Backlog **shrinking**: NS+IP −13.5h, broader −13.5h, runway down to 4.94 wk (mild progress).
- All 6 tracked over-est tasks **stable** (≤2h cleanup deltas, no STILL GROWING flags).
- DatNT and ThinhT both **on pace** at 24h/12h respectively.
- VuTQ on pace despite zero Tue+Wed (front-loaded Mon covers 8h plan).
- Stuck cards −1 (50→49), Total active +3 (mild churn).
- W25 Matrix plan unchanged, no escalations.

**Net: WARNING — keep Fountain checklist item unchecked.** Primary concerns = ViTHT Wed gap, QC −9.7h pace, +12 customer pings (3 new threads incl confirmation email bug), Bugs +5 overnight, hard-to-release +1.

---

## ALERTS / Concerns

- **HOT:** Bugs +5 overnight, customer comments +12 (3 new threads incl mike62798179 confirmation email bug), NoMethodError pro_cart_items still pinged.
- **MEDIUM:** ViTHT 0h Wed log gap, QC −9.7h behind pace, Hard-to-release pool 4 cards (clSdoRlL 33.7d).
- **TRIAGE:** #2869 (80h) + #2870 (40h) status-empty 2 days; need triage to NS or scope confirm.

## Unresolved Questions

1. **ViTHT Wed 0h** — delayed log, sick day, or genuine off-day? Consistent pattern with last week's Tue gap; worth direct ping.
2. **HungPN essentially silent W25** (0.5h total) — on leave, off-plan, or low utilization? PhatDLT covering all QC load (6h).
3. **Platform switcher fix** (was 197.9d top stuck) — moved out of stuck list; verify whether resolved or relisted.
4. **#2869 / #2870** — status still empty 2 days after addition. Triage owner needed.
5. **Confirmation email bug** ([iLXAB5cS](https://trello.com/c/iLXAB5cS)) — both kunal and mike pinging within 1h Wed evening; severity check needed (production order flow).
