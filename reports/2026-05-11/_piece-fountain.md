# Fountain (5-part) — Mon 2026-05-11 08:22 +07

Window: Fri 2026-05-08 (last workday) → Mon 2026-05-11 morning.
Previous: `reports/2026-05-08/_piece-fountain.md`.
Active week shifting: **W25 (May 4–10) closed**, **W26 (May 11–17) starts today** but plan & logs not yet posted.

> **Matrix token:** Expired. Refreshed via `node scripts/matrix-token-refresh.js` — verified `whoami` = `@duongdn:nustechnology.com` (status 200). New token saved to `config/.matrix-config.json`.

---

## Part 1 — Matrix W26 Plan (NOT YET POSTED)

Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. Back-paged 800 messages.

**No W26 plan posted yet** as of 08:22 +07. Pattern: @trinhmtt typically posts plan Mon morning ~09:00–11:00. Expected within 1–3 hours. Last 10 plan-relevant messages (newest first):
- 2026-05-08 09:35 +07 @vitht — QC ping (not a plan)
- **2026-05-04 11:56 +07 @trinhmtt** — last W25 plan (revised from 09:09 same day)
- 2026-04-28 08:20 +07 @trinhmtt — W22 plan
- (older history confirms weekly cadence)

**Latest valid plan = W25 (UNCHANGED 7 days):**
> ViTHT 40h / VuTQ 8h / ThinhT 20h / DatNT 40h / => QC: 27h

Plan total = **135h** (108h dev + 27h QC). HaVS / LamLQ / HungPN / TriNM: not in W25 plan.

---

## Part 2 — Task Log Actuals

Source: Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`.

### W25 FINAL (May 4–8, full 5 days)

| Dev    | Mon | Tue | Wed | Thu | Fri | **W25 Total** | Role |
|--------|----:|----:|----:|----:|----:|--------------:|------|
| ViTHT  | 8.0 | 8.0 | 8.0 | 4.0 | 8.0 | **36.0h**     | dev  |
| ThinhT | 4.0 | 4.0 | 4.0 | 4.0 | 4.0 | **20.0h**     | dev  |
| VuTQ   | 2.5 | 0   | 0   | 1.5 | 4.0 | **8.0h**      | dev  |
| HaVS   | 0   | 0   | 0   | 0   | 0   | **0.0h**      | dev  |
| DatNT  | 8.0 | 8.0 | 8.0 | 8.0 | 8.0 | **40.0h**     | dev  |
| LamLQ  | 0   | 0   | 8.0 | 8.0 | 8.0 | **24.0h**     | dev (off-plan) |
| PhatDLT| 2.0 | 2.0 | 2.0 | 2.0 | 2.0 | **10.0h**     | QC   |
| HungPN | 4.0 | 4.0 | 4.0 | 2.0 | 4.0 | **18.0h**     | QC   |
| TriNM  | 0   | 0   | 0   | 0   | 0   | **0.0h**      | (excl, not QC) |

W25 plan-tracked devs+QC = 36+20+8+40+10+18 = **132h** (vs 135h plan = **−3h, ≈98%**).

### W26 (May 11 partial — Mon morning 08:22)

All devs **0h** logged so far — normal at start of day. W26 tab structure already created (Mon→Sun rows in place).

---

## Part 3 — Plan vs Actual (W25 Final)

| Dev       | W25 Plan | W25 Actual | Δ         | Result |
|-----------|---------:|-----------:|----------:|--------|
| ViTHT     | 40h      | 36.0h      | **−4.0h** | mild under (90%) — Thu only 4h, rest steady 8h/day |
| ThinhT    | 20h      | 20.0h      | **±0**    | **exactly on plan** |
| VuTQ      | 8h       | 8.0h       | **±0**    | **exactly on plan** (small-plan rule applies) |
| DatNT     | 40h      | 40.0h      | **±0**    | **exactly on plan** |
| QC        | 27h      | 28.0h      | **+1.0h** | over plan (PhatDLT 10 + HungPN 18) — HungPN recovered after slow Mon-Wed |
| **Total** | **135h** | **132.0h** | **−3.0h** | **97.8% met** |

**LamLQ 24h** (off-plan) — Wed-Fri, contributed real W25 dev capacity. Not counted vs plan.

W25 result: **strong delivery** — only ViTHT mildly under (−4h). QC actually over plan (HungPN W25 totals show recovery to 18h from 0.5h flagged Thu). No dev 0h-week. No "still behind" alerts carry into W26.

W26 plan vs actual: **N/A** (no plan yet, no logs yet).

---

## Part 4 — Capacity & Runway (Est vs Charged) — Tab snapshot

Filter: NS+IP only excludes `Deployed on Live`, `Cancelled`, `Has Bug on Live`, `Tested on Live`. Total est = Col I (Est) + Col J (CR). Remaining = `max((I+J) − K, 0)`.

| Metric                                    | 05-07   | 05-08   | **05-11 (now)** | Δ vs 05-08 |
|-------------------------------------------|--------:|--------:|----------------:|-----------:|
| Remaining NS+IP (strict)                  | 237.25h | 224.75h | **252.50h**     | **+27.75h** ⚠ |
|   – Not Started only                      | 207.50h | 203.00h | **239.25h**     | +36.25h |
|   – In-progress only                      |  29.75h |  21.75h | **13.25h**      | −8.50h |
| Remaining Pending                         |  36.50h |  36.50h | **36.50h**      | 0 (#2587) |
| Remaining broader (excl Live/Cancelled)   | 437.00h | 424.50h | **446.50h**     | **+22.00h** ⚠ |
| Runway @48h/wk (NS+IP strict)             | 4.94 wk | 4.68 wk | **5.26 wk**     | **+0.58 wk** |

**SCOPE GREW over weekend.** Not Started bucket +36.25h (203→239.25). New NS tasks added: **#2883 (24h), #2885 (20h), #2884 (12h)** = 56h fresh estimate. Offset by IP→Done movements (−8.5h IP). Net broader +22h confirms real scope addition not just status churn.

**CR contributors (Col J)** — Total CR = **43.5h** (UNCHANGED): #2735 +30h, #2837 +10.5h, #2815 +3h.

**Top NS+IP backlog (largest remaining):**
| Task | Status | Est+CR | Actual | Remaining |
|------|--------|-------:|-------:|----------:|
| #2775 navigation refactor | Not Started | 60h | 19.25h | 40.75h |
| #1178 fountain/infinity reviews | Not Started | 40h | 0h | 40.00h |
| #2854 cart/checkout | Not Started | 60h | 26.25h | 33.75h |
| #2524 duplicate charge | Not Started | 24h | 0h | 24.00h |
| **#2883 (NEW)** | Not Started | 24h | 0h | **24.00h** |
| **#2885 (NEW)** | Not Started | 20h | 0h | **20.00h** |
| #2871 build-a-box | Not Started | 32h | 13.0h | 19.00h |
| **#2884 (NEW)** | Not Started | 12h | 1.75h | 10.25h |
| #2590 fountain pro backend | Not Started | 8h | 0h | 8.00h |
| #2500 | Not Started | 8h | 0h | 8.00h |
| #2554 platform-switcher | Not Started | 6h | 0h | 6.00h |
| #2872 browse mobile | IP >50% | 32h | 30.0h | 2.00h |

**Status-empty (UNCHANGED 4 — stuck since Wed 05-06):**
- #2869 (80h est, 0h actual) — **5+ days status-empty**
- #2870 (40h est, 0h actual) — **5+ days status-empty**
- #2853 (20h est, 29.75h actual — already over budget)
- #2813 (0h est, 3.5h actual — track-only)

---

## Part 5 — Over-Estimate Tracking (actual > (Est+CR) × 1.2)

Always-tracked (per memory rules):

| Task | Est+CR | Actual 05-08 | **Actual 05-11** | Over% | Status | Δ vs Fri |
|------|------:|------:|------:|---:|--------|---|
| **#2595 GiftDrop**            | 120h | 168.25h | **168.25h** |  +40% | Staging | **stable** |
| **#2615 Gift of Choice**      |  12h | 106.75h | **106.75h** | +790% | Staging | **stable** |
| **#2735 Pro Send Smart Link** | 120h (90+30) | 129.00h | **129.00h** |  +7.5% | IP >50% | **stable** |
| **#2816 Infinity homepage**   |  20h |  43.75h | **44.25h**  | +121% | Staging | **+0.50h** (minor cleanup) |
| **#2501**                     |   4h |  25.50h | **25.50h**  | +538% | Staging | stable |
| **#2380 checkout date**       |   4h |  25.25h | **25.25h**  | +531% | Staging | stable |
| **#2639 active/inactive**     |   2h |  16.50h | **16.50h**  | +725% | Staging | stable |
| **#2624 order-complete**      |  12h |  31.25h | **31.25h**  | +160% | Dev Done | stable |
| **#2702**                     |   8h |  25.00h | **25.00h**  | +213% | IP >50% | stable |
| **#2837**                     |  26.5h (16+10.5) |  26.50h | **26.50h**  |   0% | Staging | stable |
| **#2815**                     |   9h (6+3) |  10.75h | **10.75h**  |  +19% | Staging | stable |

**No "STILL GROWING" red flags.** Only #2816 +0.5h (Staging cleanup, ratio shifted +119%→+121% — within trim band).

**Top other +20% over-estimate tasks (entire backlog):**
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
| #2380 | 4h | 25.25h | +531% | Staging |
| #2691 | 1h | 6.0h | +500% | Live |
| #2523 | 16h | 61.0h | +281% | Live |
| #2702 | 8h | 25.0h | +213% | IP >50% |
| #2624 | 12h | 31.25h | +160% | Dev Done |
| #2816 | 20h | 44.25h | +121% | Staging |

---

## Trello Board ([Web Development](https://trello.com/b/UDrSWage), `5475eaf923a9a1309357eb51`)

### Customer comments since Fri 2026-05-08 08:32 +07

**Total: 0** (kunalsheth 0, tmmckay 0, mike62798179 0, iris63293413 0). **Weekend silence — all customer pings ceased after Thu 05-07 evening.** Only 3 commentCards on board total in window — all from `rick570/nusrick` (internal).

### Active card counts per list

| List | 05-11 | 05-08 | Δ |
|------|------:|------:|--:|
| To-Do          | 29 | 29 | 0 |
| Bugs           | 17 | 17 | 0 |
| Doing          |  9 |  9 | 0 |
| QC Internal Backlog | 4 | 4 | 0 |
| QA Backlog     |  6 |  6 | 0 |
| In QA          |  3 |  3 | 0 |
| Not passed     |  1 |  2 | **−1** |
| **Total active** | **69** | **70** | **−1** |

Quiet weekend — only 1 card moved out of "Not passed". All other lists held flat. No cards entered/exited Bugs.

### Stuck cards (dateLastActivity > 5 days, active lists only)

**52 stuck** (vs 47 on 05-08, **+5**). Natural growth — no movement of older cards over weekend means more cross the 5d threshold each day. Top 10 worst:
- 165.7d — [PayPalHttp::HttpError generate_order](https://trello.com/c/6MTnv0Cc) (Bugs) — same #1
- 159.0d — [Fountain Pro Backend Updates](https://trello.com/c/kUkibmUS) (To-Do)
- 136.9d — [Suggestion: Unit Test](https://trello.com/c/0jFodYfi) (To-Do)
- 136.7d — [URL is case sensitive](https://trello.com/c/NDZTWQ3a) (To-Do)
- 126.2d — [Update search](https://trello.com/c/1zWeXmlT) (To-Do)
- 126.2d — [Automate card printing](https://trello.com/c/aWLxiSK9) (To-Do)
- 126.2d — [Automate card printing extra](https://trello.com/c/xr8Q0N3G) (To-Do)
- 126.2d — [Integrate infinity roses](https://trello.com/c/7UCszbbS) (To-Do)
- 126.2d — [Creating warning USPS Packages](https://trello.com/c/6x6twDXc) (To-Do)
- 126.2d — [Ai powered message screen](https://trello.com/c/KNq08ij5) (To-Do)

All ages tracking +3 days (weekend pass). Pool +5 reflects 5 cards crossing 5d threshold over weekend — none of the new entrants are critical.

### Hard-to-release (Doing 14+ days)

**4 cards** (same as 05-08, **+0**, all aged +3 days):
- **37.7d** — [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) (was 34.7d) — **NOW APPROACHING 38d, escalation overdue**
- **25.9d** — [Fountain — Business Homepage Updates](https://trello.com/c/WGsYqu5h) (was 22.9d)
- **19.5d** — [Fountain & Infinity — Subtle Scroll Animations](https://trello.com/c/g5SK007L) (was 16.5d)
- **18.7d** — [ActiveRecord::RecordNotFound admin/users#show](https://trello.com/c/tRyNrE2x) (was 15.7d)

Pool size stable at 4. clSdoRlL nearing 38d with no movement — needs immediate unblock.

---

## Recommendation for Trello "Fountain" Check Progress item

**Status: WARNING — keep unchecked**

Justification (alerts):
1. **W26 plan not posted** — expected by ~10:00 +07. Without plan, W26 capacity allocation unknown.
2. **NS+IP scope GREW +27.75h over weekend** — 3 new NS tasks (#2883 24h, #2885 20h, #2884 12h = 56h fresh est). Runway extended to 5.26wk despite scope growth (good IP→Done conversion).
3. **#2869 (80h) + #2870 (40h) status STILL EMPTY 5+ days** — triage stuck since Wed 05-06. Plus #2853 (29.75h actual vs 20h est, no status). 140h+ untriaged.
4. **clSdoRlL Fountain States 37.7d in Doing** — escalation overdue, no movement over weekend.
5. **Stuck cards +5** (47→52) — natural weekend creep, but 10 cards in To-Do at 126+ days indicates frozen backlog.

Clean signals:
- **W25 closed at 132/135h = 97.8% delivery.** ViTHT mild −4h, all others on/over plan.
- **Customer comments = 0** since Fri 08:32 — full weekend silence (best in 7+ days).
- **No STILL GROWING over-estimate flags** — only #2816 +0.5h trim cleanup.
- Active card count flat (−1, Not Passed cleared one).
- LamLQ 24h off-plan contribution boosted real W25 capacity.
- HungPN QC recovered to 18h W25 total (vs 0.5h flagged Thu) — full QC bench restored.
- Pending=Pending unchanged (#2587 36.5h, no growth).

**Net: WARNING — keep Fountain checklist item unchecked.** Primary concerns = W26 plan absent, NS scope +27.75h with 3 new tasks, status-empty backlog (#2869+#2870+#2853 = 140h+) untriaged 5+ days, clSdoRlL 37.7d in Doing.

---

## ALERTS / Concerns

- **HOT:** W26 plan absent (08:22 — expected by 10:00); NS+IP scope grew +27.75h with 3 fresh tasks weekend; clSdoRlL 37.7d in Doing.
- **MEDIUM:** Status-empty backlog (#2869 80h + #2870 40h + #2853 29.75h actual) untriaged 5+ days; stuck pool +5.
- **POSITIVE:** W25 closed 97.8% to plan; customer comments 0 over weekend; no over-estimate STILL GROWING; HungPN QC recovered.

## Unresolved Questions

1. **W26 plan ETA** — @trinhmtt usually posts 09:00–11:00 Mon. Watch for revision (W25 had 2 versions on 05-04).
2. **#2869 (80h) + #2870 (40h)** — what tasks are these? 5 days status-empty. Triage owner?
3. **#2883 / #2884 / #2885 (NEW NS, 56h total)** — who is the dev assignment? Affects W26 plan capacity.
4. **clSdoRlL Fountain States/scrolling** — 37.7d Doing, no movement over weekend. Escalate?
5. **HaVS 0h W25** — full week off-plan with no log. Off / leave / another project?
