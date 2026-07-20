# Weekly Monitor — W35 (2026-07-13 → 2026-07-19)

**Run at:** 2026-07-20 09:45 +07 (catch-up run — no report was generated Fri 07-17/Sat 07-18)
**Report for:** Week of Jul 13 – Jul 19, 2026 (W35)
**Compared to:** W34 (Jul 6–10)

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **LongVV — OhCleo shows 0h this week** | Confirmed via raw `/review/week` API (not just the fetch script): OhCleo roster includes LongVV but **zero task-log rows** for the whole week. Combined with Maddy 14.5h + JD flex 13.5h = **28h total**, no leave recorded in `leave-plan.json`. Two weeks ago he was declared full-time (40h/wk) on OhCleo — this week he did none of it. Biggest gap of the week; needs a direct answer, not just a note (see Unresolved Questions). |
| **PhucVT — down to 29.5h, still off James Diamond** | 0h JD (2nd straight week), 29.5h on Crystal lang (Arthur) — down from 41h logged there last week. No leave recorded. Last week's OT was explicitly approved by Nam Trần for a "demo crunch" — unclear if that crunch is over or if this is now an unapproved shortfall. Needs confirmation. |
| **Blair Brown — 0h for 2nd consecutive week** | Raw API confirms 0 task-log rows for both LeNH and KhanhHH this week (roster: DuongDN, KhanhHH, LeNH). Last week was already near-zero (0.58h) due to the billing-dispute reconciliation; this week is fully zero with no stated reason. Given last week's live billing dispute with the customer, worth checking whether the project has gone quiet or whether hours are being logged somewhere else. |
| **Fountain "Est vs Charged" tab appears frozen since W34** | Spot-checked 4 tasks cited in last week's report (#2870, #2872, #2912, #2735) — **all four show byte-identical actual-hours values to last week**, despite the team logging 121h of real Workstream time this week. Narrow-scope remaining (229.00h) and task count (28) are also exactly unchanged to the decimal. Capacity/Runway and Over-estimate sections below are reported as-is but flagged as **stale, not verified fresh this week** — do not read "no change" as "no progress." |
| **Fountain plan posted a day late** | No Matrix message in the Fountain room at all on Monday 07-13. First plan came Tuesday 07-14 08:53, then was revised twice same day (16:24, 16:28) before settling. Final numbers used below. |
| **TuanNT clean 40h week** | Paturevision 39.5h (sheet) + Neural Contract 0.5h (WS) = exactly 40h. VietPH no longer checked (resigned, per team roster). |
| **KhanhHH essentially exact** | Baamboozle 7.83 + Generator 16 + Radio Data Center 13.83 + Elena (sheet) 2.33 = 39.99h ≈ 40h target. Colin/ETZ WS: 0h this week. |
| **LeNH essentially exact** | James Diamond 40h + Radio Data Center 0.25h = 40.25h, clears target — but see Blair Brown note above. |
| **BXR App — nobody logged time** | WS `bxr_app` and JIRA (swiftstudio, `project=BXR`) both show 0h for everyone this week, including KhoaTD (who took over from LeNH). Likely just no BXR work needed, not a gap — noting for completeness. |
| **James Diamond + Marcel + Blair Brown Matrix report** | **DRAFTED, NOT SENT** — awaiting your explicit confirmation per the mandatory send-gate. See #3. |

---

## #1 — Team Hours (W35)

### Summary Table

| Developer | Sources | W35 Hours | Target | Status |
|-----------|---------|-----------|--------|--------|
| LongVV | WS: Maddy 14.5h + JD flex 13.5h + OhCleo 0h | **28h** | 40h (ambiguous — see Critical Notes) | ⚠️ SHORTFALL, OhCleo fully 0h |
| PhucVT | WS: Crystal lang (Arthur) 29.5h + JD 0h | **29.5h** | 40h | ⚠️ SHORTFALL, down from 41h last week |
| TuanNT | Sheets: Paturevision 39.5h + WS: Neural Contract 0.5h | **40h** | 40h | ✓ exact match |
| KhanhHH | WS: Baamboozle 7.83 + Generator 16 + Radio Data Center 13.83 + Colin/ETZ 0 + Sheets: Elena 2.33 | **39.99h** | 40h | ✓ essentially exact |
| LeNH | WS: James Diamond 40h + Radio Data Center 0.25h + Blair Brown 0h + Sheets: Paturevision 0h | **40.25h** | 40h | ✓ OK (Blair Brown 0h — see Critical Notes) |
| AnhNH2 | WS: James Diamond Mobile 19h | **19h** | — (no fixed plan) | note only |
| Marcel/DuongDN | WS + Sheets: Tokenlite 0h | **0h** | — (adhoc) | note only — no work logged |
| Fountain: DatNT | WS: Fountain | **36h** | 36h (revised plan) | ✓ exact match |
| Fountain: VuTQ | WS: Fountain | **4h** | 4h (plan corrected same-day 5→4) | ✓ exact match |
| Fountain: ViTHT | WS: Fountain | **40h** | 40h (plan) | ✓ exact match |
| Fountain: ThinhT | WS: Fountain | **12h** | 12h (plan) | ✓ exact match |
| Fountain: HungPN (QC) | WS: Fountain | **17h** | — (QC pool 23.25h combined) | QC combined 29h vs 23.25h plan, +5.75h over |
| Fountain: PhatDLT (QC) | WS: Fountain | **12h** | — (QC pool, see above) | — |
| Family App: LuHX | WS: Family App | **5h** | — (not in tracked roster) | note only |
| Generator: NamNN | WS: Generator | **10h** | — (not in tracked roster) | note only |
| Generator: LucNT | WS: Generator | **10h** | — (not in tracked roster) | note only |
| Crystal lang: TienND | WS: Crystal lang | **25.77h** | — (not in tracked roster) | note only |

**JIRA cross-check:**
- LongVV (madhuraka): `worklogAuthor="5b1ed0bcc175e5207bf80b77" AND worklogDate>="2026-07-13"` → **13.5h** (LIFM2-456 1.5h, LIFM2-455 1h, LIFM2-451 1h, LIFM2-450 4h, LIFM2-449 1h, LIFM2-428 5h). WS Maddy shows 14.5h — 1h gap traced to a WS entry for **LIFM2-409 "Fix bug"** (1h, Jul 14) with no matching JIRA worklog. Under the 2h flag threshold, noting only.
- LeNH/Carrick (swiftstudio BXR): `project=BXR AND worklogDate>="2026-07-13"` → **0h for everyone**. Matches WS `bxr_app` (also 0h). Confirms no BXR work this week, not a data gap.

### Developer Notes

**LongVV:** The most concerning line this week. Maddy (14.5h) and James Diamond flex (13.5h) both look normal on their own, but **OhCleo — the project he was declared full-time on just two weeks ago — shows literally zero task-log rows** for the entire week (verified via raw API against the OhCleo project roster, which does list him). No leave recorded. Total across all three projects is 28h, well short of any plausible 40h target. This needs a direct check — did he actually work OhCleo this week and just not log it, or did priorities shift back to Maddy/JD without anyone updating the plan?

**PhucVT:** Second straight week at 0h on James Diamond, continuing the Crystal lang (Arthur) reassignment. But the hours there dropped from 41h (last week, sanctioned crunch-week OT) to 29.5h this week, with no leave on file. Worth confirming whether the crunch is over (in which case 29.5h might just be a normal week) or whether this is an unflagged shortfall.

**TuanNT:** Clean 40h week — Paturevision 39.5h (sheet, TuanNT column) + Neural Contract 0.5h (WS Friday). No discrepancy to flag.

**KhanhHH:** Spread across 4 real sources this week (Baamboozle/Generator/Radio Data Center/Elena) totaling 39.99h — effectively exact. Notably, the **Elena sheet permission error that's been open since W31 appears resolved** — it returned real data (2.33h for KhanhHH) instead of a 403 this time.

**LeNH:** James Diamond (40h) plus a small Radio Data Center entry (0.25h) clears the 40h target. But Blair Brown — his primary "second project" historically — is at 0h for a second consecutive week, following last week's billing-dispute reconciliation. Given there was an active customer dispute as of last week, worth a quick check that the project hasn't gone dark on the client side.

**Fountain:** Dev-side plan-vs-actual is clean (DatNT/ViTHT/ThinhT/VuTQ all exact once the same-day VuTQ correction is applied), but the plan itself came a day late (Tuesday instead of Monday) and was revised twice before settling. QC (HungPN+PhatDLT) logged 29h against a 23.25h plan, +5.75h over — not flagged as a problem given the dev-side accuracy. See #2 for the capacity/over-estimate staleness issue.

---

## #2 — Fountain Weekly Check (W35)

### Part 1 — Matrix Weekly Plan

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), fetched directly this run (no Monday post existed to cite from a daily report).

**No plan posted Monday 07-13** — room had zero messages that day. @trinhmtt posted the first plan **Tuesday 2026-07-14 08:53:50 +07**: *"Em gửi plan tuần này ạ"* — Dat NT: 40h | ViTHT: 40h | ThinhT: 12h | QC: 23h. This was revised twice the same afternoon:
- 16:24 — DatNT: 32h, VuTQ: 9h, ViTHT: 40h, ThinhT: 12h ⇒ QC: 23.25
- 16:28 (final) — DatNT: 36h, VuTQ: 5h → corrected immediately after ("sorry anh, 4h thoi nha anh, em nhầm á") to **VuTQ: 4h**, ViTHT: 40h, ThinhT: 12h ⇒ QC: 23.25

**Final plan used for comparison:** DatNT 36h | VuTQ 4h | ViTHT 40h | ThinhT 12h | QC 23.25h. Capacity = **92h/week** (dev-only, excl. QC) — down from 100h/wk last week (VuTQ back in the roster at reduced hours instead of DatNT covering solo).

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`).

| Dev | W35 Hours |
|-----|-----------|
| DatNT | 36h |
| VuTQ | 4h |
| ViTHT | 40h |
| ThinhT | 12h |
| HungPN (QC) | 17h |
| PhatDLT (QC) | 12h |
| **Total (dev + QC)** | **121h** |

GSheets `Summary!W35`: still 0.00h — 7th consecutive week (W29–W35) at 0h in Sheets; WorkStream remains the sole real source.

### Part 3 — Plan vs Actual

| Dev | Plan | Actual (WS) | Delta | Status |
|-----|------|-------------|-------|--------|
| DatNT | 36h | 36h | 0h | ✓ exact match |
| VuTQ | 4h | 4h | 0h | ✓ exact match |
| ViTHT | 40h | 40h | 0h | ✓ exact match |
| ThinhT | 12h | 12h | 0h | ✓ exact match |
| QC (HungPN+PhatDLT) | 23.25h | 29h | +5.75h | ⚠️ over plan |

**All 4 dev-side numbers exact again** — third clean week in a row on the dev side. QC ran over plan this time (prior weeks ran slightly under).

### Part 4 — Capacity & Runway ⚠️ STALE DATA

Source: "Est vs Charged" tab, Status col G, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | Runway @ 92h/wk (plan) |
|--------|-------|-----------|--------------------------|
| Narrow (Not Started + In-progress >50% + In-progress <50%) | 28 | **229.00h** | 2.49wk |
| Broad (excl. Deployed on Live/Cancelled) | 83 | **604.75h** | 6.57wk |

**⚠️ Data freshness concern:** Spot-checked 4 tasks explicitly cited in last week's (W34) report — #2870 (63.25h), #2872 (46.25h), #2912 (2h), #2735 (136h actual) — **all four are byte-identical to last week's figures**, despite the Fountain team logging 121h of real work in Workstream this week. The narrow bucket's task count (28) and remaining hours (229.00h) also match W34 exactly, to the decimal. This strongly suggests the "Est vs Charged" tab itself has not been updated since last week, even though other parts of the same spreadsheet were edited (file `modifiedTime` shows 2026-07-16). Broad-scope numbers did shift (+1 task, +49.95h), so *something* changed, but the narrow/actual-hours columns look frozen. Treating this section as **unverified for W35** rather than a real "no change" week.

### Part 5 — Over-Estimate Tracking ⚠️ SAME STALE-DATA CAVEAT

37 items >20% over est+CR — same count as W34. Per the freshness concern above, do not read the table below as confirmation of "no growth" — it may simply be unedited.

| Task | Est+CR | Actual | Over% | vs W34 |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | unchanged value |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | unchanged value |
| #2595 (Giftdrop Redemption Flow) | 120h | 168.25h | +40% | unchanged value |
| #2735 (Pro Send Smart Link) | 130h | 136h | +5% | unchanged value |
| #2702 (Infinity Accessibility) | 8h | 25.5h | +219% | unchanged value |
| #2816 (Infinity Homepage) | 20h | 44.25h | +121% | unchanged value |
| #2380 (duplicate row, still unresolved) | 4h/20h (two rows) | 25.25h | +531%/+26% | unchanged value, duplicate-row issue from W33 still not cleaned up |

**New/still-active entrants in the narrow scope:** #2870 (80h est, 63.25h actual, 79% used), #2872 (32h est, 46.25h actual, +45% over — same as W34), #2912 (40h est, 2h actual — unchanged since first appearing "just started" last week, worth checking if it's stalled).

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: DRAFTED, NOT SENT — awaiting your explicit confirmation** (per the mandatory send-gate — nothing goes to Thuy Le's room until you confirm the exact text below).

Raw data:

| Dev | Project | Charge | Actual | Source |
|-----|---------|--------|--------|--------|
| PhucVT | JD Web | 0h | 0h | WorkStream — 0h all week, still on Crystal lang/Arthur |
| LeNH | JD Web (extra) | 40h | 40h | WorkStream — fully charged, no pending review this week |
| LongVV | JD Web (flex) | 13h 30m | 13h 30m | WorkStream — all charged as normal work, no makeup annotation found in the data |
| AnhNH2 | JD Mobile | 19h | 19h | WorkStream, no fixed plan |
| DuongDN | Marcel (Tokenlite) | 0h | 0h | WorkStream + Sheets — no entries this week |
| LeNH | Blair Brown | 0h | 0h | WorkStream — 0 rows this week |
| KhanhHH | Blair Brown | 0h | 0h | WorkStream — 0 rows this week |

Web total: charge = 0+40+13.5 = **53.5h** / actual = 0+40+13.5 = **53.5h** (per the corrected sum rule — not the fixed 40h contract number).

Draft message:
```
Report week 13/07

James Diamond

Web: 53h 30m/53h 30m
PhucVT: 0h/0h (vẫn đang chuyển sang Crystal lang/Arthur tuần này)
LeNH: 40h/40h
LongVV: 13h 30m/13h 30m

Mobile: 19h/19h
AnhNH2: 19h/19h

---

Marcel
DuongDN: 0h

---

Blair Brown - Peptide Clyde
LeNH: 0h
KhanhHH: 0h
```

Note: Blair Brown shows 0h for both LeNH and KhanhHH — this is the second straight week near/at zero. Worth confirming with the user whether this is expected before sending, given last week's active billing dispute on this project.

**Awaiting explicit confirmation of this exact text before sending.**

---

## #4 — Unresolved Questions

1. **LongVV's OhCleo 0h this week** — is this a real gap (he didn't work it), a logging miss, or has his priority shifted back to Maddy/JD without the plan being updated? Also still open from last week: is his target 40h combined across all projects, or 40h OhCleo on top of Maddy/JD?
2. **PhucVT's Crystal lang hours dropped 41h → 29.5h** — is the "demo crunch" over, making this a normal week, or is this an unflagged shortfall?
3. **Blair Brown at 0h for 2 straight weeks** — is the project paused, or is work happening somewhere not being tracked? Given last week's live billing dispute, worth a direct check before assuming it's just quiet.
4. **Fountain "Est vs Charged" tab appears frozen since W34** — worth asking Kunal's team (or trinhmtt) whether that tab is still being maintained weekly, since Capacity/Runway and Over-estimate tracking are currently unverifiable for real week-over-week change.
5. **Fountain plan posted a day late (Tuesday instead of Monday), revised twice** — one-off or should Monday-morning cadence be checked going forward?
6. **#2912 stuck at 2h actual since first appearing "just started" in W34** — worth a quick look if it's stalled.

---

*Data sources: `scripts/workstream-fetch-project-week.js 2026-07-13` (all tracked projects), `scripts/sheets-summary-week-fetch.js` + `scripts/sheets-summary-employee-fetch.js` (Paturevision, Elena, Marcel, William Bills, John Yi, BXR App, Fountain Summary tabs, service account), raw Workstream `/review/week` API (Blair Brown, OhCleo cross-check), JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio), Fountain "Est vs Charged" tab + Drive `modifiedTime`, Matrix `/search` + `/messages` (Fountain room), `config/leave-plan.json` (no leave entries this week).*
