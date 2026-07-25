# Weekly Monitor — W36 (2026-07-20 → 2026-07-26, data through Fri 07-24)

**Run at:** 2026-07-25 09:55 +07 (Saturday, normal cadence)
**Compared to:** W35 (Jul 13–19)

**Note on this run:** Both Workstream and Matrix tokens were dead at start (Workstream since 07-10, Matrix's static compat token had been silently reverted to a stale OIDC pair — not an actual expiry, a config revert). Fixed live during this run: Workstream re-authenticated via visible SSO (existing browser session), Matrix restored to the `mct_` static compat token and both re-encrypted to `.enc` so they persist.

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **LongVV did 0h on James Diamond flex this week** | Down from 13.5h last week — full week's flex time went to Marcel (18h) + OhCleo (8h) + Maddy (8h) instead. Not necessarily a problem (JD Web hit its 40h cap via LeNH alone anyway) but a full reallocation worth confirming is intentional. |
| **LongVV — pending (not approved) half-day leave 07-24, but logged 12h that day** | `leave-plan.json` has a `status: pending` half-day leave request for 07-24 ("đi tái khám nội soi dạ dày"). He logged 12h on Marcel that same day — contradicts a half-day off. Needs a status check: was the leave withdrawn, or is the WS entry wrong? |
| **PhucVT down to 16h total, 3rd straight week off James Diamond** | Crystal lang (Arthur) hours: 41h → 29.5h → **16h** over 3 weeks, still 0h JD. Steep continued decline — worth confirming whether this is an intentional wind-down or an unflagged problem. |
| **Blair Brown — 0h for 3rd consecutive week** | Both LeNH and KhanhHH still at 0 task-log rows. Raised for 2 weeks running already with no resolution — recommend a direct check with the client/PM rather than continuing to note it. |
| **Fountain "Est vs Charged" — narrow-scope (WIP) actual-hours column frozen a 3rd week running** | Spot-checked the same 4 tasks cited in the last two reports (#2870, #2872, #2912, #2735) — all four byte-identical again. BUT broad-scope (completed/deployed tasks) clearly DID move this week — 20 tasks newly marked "Deployed on Live", several new over-estimate entries appeared. So it's not the whole tab frozen — specifically the actual-hours tracking for in-progress/not-started tasks looks stuck. Worth flagging to Kunal's team as a narrower, more specific ask than "is the tab still maintained." |
| **LongVV now logging real hours on Marcel/Tokenlite (18h, 13h charged)** | New this week — Marcel report template has only ever had a single `DuongDN: {hours}` line. Needs a decision on whether/how to add LongVV. See Unresolved Questions. |
| **Prior week's (W35) Matrix report was drafted but never sent** | `config/.weekly-report-send-flags.json` still has `week_start: 2026-07-13`, `confirmed: false`, `sent: false`. Needs a decision: send late, discard, or let this week's report supersede it. |
| **Fountain plan posted on time and cleanly this week** | Monday 07-20 11:37 (initial, missing VuTQ), revised Tue 07-21 10:47 (final, VuTQ added). Better cadence than last week's Tuesday-only post. |

---

## #1 — Team Hours (W36, through Fri 07-24)

### Summary Table

| Developer | Sources | W36 Hours | Target | Status |
|-----------|---------|-----------|--------|--------|
| LongVV | WS: Maddy 8h + Marcel 18h + OhCleo 8h + JD flex 0h | **34h** | 40h (ambiguous, still unresolved) | ⚠️ below combined 40h, but individual pieces plausible — see notes |
| PhucVT | WS: Crystal lang 16h + JD 0h | **16h** | 40h | ⚠️ SHORTFALL, 3rd straight week declining |
| TuanNT | Sheets: Paturevision 39.75h + WS: Neural Contract 0.25h | **40h** | 40h | ✓ exact match |
| KhanhHH | WS: Baamboozle 7.5 + Colin/ETZ 5.5 + Generator 10 + Radio Data Center 17 + Sheets: Elena 0 | **40h** | 40h | ✓ exact match |
| LeNH | WS: James Diamond 40h + Blair Brown 0h + Sheets: Paturevision 0h | **40h** | 40h | ✓ OK (Blair Brown 0h — see Critical Notes) |
| AnhNH2 | WS: James Diamond Mobile 19h | **19h** | — (no fixed plan) | note only |
| Marcel/DuongDN | WS: Tokenlite 3h | **3h** | — (adhoc) | note only |
| Fountain: DatNT | WS: Fountain | **40h** (36h charged) | 40h (plan) | ✓ exact match |
| Fountain: ViTHT | WS: Fountain | **32h** | 32h (revised plan) | ✓ exact match |
| Fountain: ThinhT | WS: Fountain | **20h** | 20h (plan) | ✓ exact match |
| Fountain: VuTQ | WS: Fountain | **8h** | 8h (plan) | ✓ exact match |
| Fountain: PhatDLT (QC) | WS: Fountain | **13.5h** | — (QC pool 25h combined) | QC combined 30.5h vs 25h plan, +5.5h over |
| Fountain: HungPN (QC) | WS: Fountain | **17h** | — (QC pool, see above) | — |
| Maddy: LuHX | WS: Maddy | **2h** | — (not in tracked roster) | note only |
| Generator: NamNN | WS: Generator | **10h** | — (not in tracked roster) | note only |
| Generator: LucNT | WS: Generator (reviewer) | **10h** | — (not in tracked roster) | note only |
| BXR App: HauDC | WS: BXR App | **14h** | — (not in tracked roster) | note only — LeNH no longer on BXR |
| Crystal lang: TienND | WS: Crystal lang | **24h** | — (not in tracked roster) | note only |

**JIRA cross-check:**
- LongVV (madhuraka): `worklogAuthor="5b1ed0bcc175e5207bf80b77" AND worklogDate>="2026-07-20"` → **8h** (LIFM2-436 1h, LIFM2-428 7h) — **matches WS Maddy 8h exactly**, no gap this week.
- LeNH/Carrick (swiftstudio BXR): `project=BXR AND worklogDate>="2026-07-20"` → **0h**. Matches WS `bxr_app` (which no longer lists her as a member — team moved to HauDC). No longer a meaningful cross-check for her; consider dropping until/unless she's back on BXR.

**Workstream `needsReview` flag:** Crystal lang has 5 unreviewed PhucVT entries (07-23, 07-24) awaiting TienND's review — not a hours issue, just flagging for the reviewer-gate check.

### Developer Notes

**LongVV:** Full reallocation away from James Diamond this week — 0h flex there vs 13.5h last week — with all flex time going to Marcel (18h, new) and OhCleo (8h, still well short of the "full-time 40h/wk" declared two weeks ago; W35 was 0h, W36 is 8h — third week the OhCleo commitment hasn't materialized). Combined total across all 4 projects is 34h. Also has a **pending, unapproved** half-day leave request for 07-24 in the leave system, yet logged 12h of real work that exact day — the leave request and the actual work don't line up; needs a direct check on whether it was withdrawn.

**PhucVT:** Continues the decline from the crunch-week high — 41h → 29.5h → 16h over 3 consecutive weeks on Crystal lang, with James Diamond still at 0h. This is the most concerning line this week after LongVV's OhCleo gap; worth a direct check on whether this is planned wind-down or something's actually wrong.

**TuanNT:** Clean 40h week, same pattern as last week (Paturevision + a small Neural Contract entry).

**KhanhHH:** Exact 40h across 4 real sources, same clean pattern as W35. Elena sheet returned 0h this week (down from 2.33h last week) but the 40h target was already met via the other 3 projects, so not a concern.

**LeNH:** James Diamond alone (40h) clears the target for a 2nd straight week; Blair Brown remains at 0h for a 3rd consecutive week — this needs a direct resolution, not another week of just noting it.

**Fountain:** Dev-side plan-vs-actual is clean for a 4th week running (DatNT/ViTHT/ThinhT/VuTQ all exact once the mid-week VuTQ addition is applied). QC ran +5.5h over plan. Plan cadence improved — posted Monday (vs last week's Tuesday), though still revised the next day to add VuTQ.

---

## #2 — Fountain Weekly Check (W36)

### Part 1 — Matrix Weekly Plan

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), fetched directly this run.

**Monday 2026-07-20, 11:37** — @trinhmtt: *"Em gui plan tuan nay ạ  ViTHT: 40h ThinhT: 20h DatNT: 40h => QC: 25h"* (VuTQ not yet included).

**Tuesday 2026-07-21, 10:47** (revised, final) — @trinhmtt: *"Em update plan tuần này ViTHT: 32h ThinhT: 20h VuTQ: 8h DatNT: 40h => QC: 25h"*.

**Final plan used for comparison:** DatNT 40h | ViTHT 32h | ThinhT 20h | VuTQ 8h | QC 25h. Capacity = **100h/week** (dev-only, excl. QC) — up from 92h/wk last week (VuTQ back at 8h vs 4h, ViTHT down from 40h to 32h).

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`).

| Dev | W36 Hours |
|-----|-----------|
| DatNT | 40h (36h charged) |
| ViTHT | 32h |
| ThinhT | 20h |
| VuTQ | 8h |
| HungPN (QC) | 17h |
| PhatDLT (QC) | 13.5h |
| **Total (dev + QC)** | **130.5h** |

GSheets `Summary!W36`: not re-checked this run — confirmed abandoned since the 07-13 Workstream migration per last week's report; WorkStream remains the sole real source.

### Part 3 — Plan vs Actual

| Dev | Plan | Actual (WS) | Delta | Status |
|-----|------|-------------|-------|--------|
| DatNT | 40h | 40h | 0h | ✓ exact match |
| ViTHT | 32h | 32h | 0h | ✓ exact match |
| ThinhT | 20h | 20h | 0h | ✓ exact match |
| VuTQ | 8h | 8h | 0h | ✓ exact match |
| QC (HungPN+PhatDLT) | 25h | 30.5h | +5.5h | ⚠️ over plan |

**4th straight week of exact dev-side matches.** QC ran over plan again (similar magnitude to W35's +5.75h).

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab, Status col G, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | Runway @ 100h/wk (this week's plan) |
|--------|-------|-----------|--------------------------------------|
| Narrow (Not Started + In-progress >50% + In-progress <50%) | 28 | **229.00h** | 2.29wk |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | 3.29wk |

**Narrow scope: 3rd straight week byte-identical** to W34/W35 (229.00h, 28 tasks) — the same 4 spot-checked tasks (#2870 63.25h, #2872 46.25h, #2912 2h, #2735 est 130h/actual 136h) are unchanged again. **Broad scope moved substantially** (83→63 tasks, 604.75h→328.50h remaining) — status distribution shows 21 tasks now "Deployed on Live" (was effectively 1 last week), consistent with a real batch of completions, not a stale re-read. **Conclusion: it's not the whole tab that's frozen — specifically the actual-hours tracking on in-progress/not-started (WIP) tasks looks stuck, while completed/deployed tasks are getting real updates.** Worth raising this more precise framing with Kunal's team.

### Part 5 — Over-Estimate Tracking

36 items >20% over est+CR (similar count to W35's 37). Several new entries appeared this week that weren't in last week's table — further evidence broad-scope data is live, not frozen.

| Task | Est+CR | Actual | Over% | vs W35 |
|------|--------|--------|-------|--------|
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | unchanged value |
| #2501 | 4h | 25.5h | +538% | **new entrant this week** |
| #2380 (duplicate row, still unresolved) | 4h/20h (two rows) | 25.25h | +531%/+26% | unchanged value — dup-row cleanup still not done |
| #2523 | 16h | 61h | +281% | **new entrant this week**, status Deployed on Live |
| #2702 (Infinity Accessibility) | 8h | 25.5h | +219% | unchanged value |
| #2629 | 8h | 18.25h | +128% | **new entrant this week**, status Dev Done |
| #2816 (Infinity Homepage) | 20h | 44.25h | +121% | unchanged value |
| #2624 (Fountain order complete update) | 12h | 31.25h | +160% | **new entrant this week**, status Dev Done |
| #2742 | 12h | 20.25h | +69% | **new entrant this week**, status Not Started |
| #2837 | 26.5h | 39.75h | +50% | **new entrant this week**, status Deployed on Staging |
| #2872 | 32h | 46.25h | +45% | unchanged value (narrow scope, frozen) |
| #2595 (Giftdrop Redemption Flow) | 120h | 168.25h | +40% | unchanged value |
| #2640 | 12h | 16.75h | +40% | **new entrant this week**, status In-progress (<50%) |
| #2695 | 20h | 26h | +30% | **new entrant this week**, status In-progress (<50%) |

**#2735 dropped off this week's list** — est 130h/actual 136h is only +4.6% over, below the 20% threshold (it was borderline-included in last week's report at "+5%" despite not technically qualifying).

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: NOT DRAFTED TO SEND-FLAG FILE YET — raw numbers below, needs your input on the Marcel/LongVV question before I write the exact text for confirmation** (per the mandatory send-gate, nothing goes to Thuy Le's room until you confirm exact text).

Raw data:

| Dev | Project | Charge | Actual | Source |
|-----|---------|--------|--------|--------|
| PhucVT | JD Web | 0h | 0h | WorkStream — still on Crystal lang (only 16h there this week, down from 29.5h) |
| LeNH | JD Web | 40h | 40h | WorkStream — fully charged, alone fills the 40h Web cap |
| LongVV | JD Web (flex) | 0h | 0h | WorkStream — no JD flex logged at all this week (13.5h last week) |
| AnhNH2 | JD Mobile | 19h | 19h | WorkStream, no fixed plan |
| DuongDN | Marcel (Tokenlite) | 0h | 3h | WorkStream |
| LongVV | Marcel (Tokenlite) | ? | 18h (13h charged per WS) | WorkStream — **new this week, not previously part of the Marcel report line** |
| LeNH | Blair Brown | 0h | 0h | WorkStream — 0 rows, 3rd straight week |
| KhanhHH | Blair Brown | 0h | 0h | WorkStream — 0 rows, 3rd straight week |

Web total: charge = 0+40+0 = **40h** / actual = 0+40+0 = **40h** (simple this week — LeNH alone exactly fills the cap, no banking needed).

**Open question before I draft the final message:** LongVV logged real hours on Marcel/Tokenlite this week (18h, WS shows 13h charged). The report template has only ever had a single `DuongDN: {hours}` line under Marcel. Do you want LongVV added to that section, and if so, charge = the WS-reported 13h, or something else?

---

## #4 — Unresolved Questions

1. **LongVV's pending (unapproved) half-day leave on 07-24 vs 12h logged that day** — was the leave request withdrawn, or is there a data error somewhere?
2. **LongVV 0h on James Diamond flex this week** — intentional full reallocation to Marcel/OhCleo, or should JD still get some flex time?
3. **LongVV's OhCleo still only 8h (3rd week: 0h, 0h, 8h) vs the declared full-time 40h/wk** — is that commitment still active?
4. **PhucVT's Crystal lang hours: 3 straight weeks declining (41h→29.5h→16h), still 0h JD** — planned wind-down or a problem?
5. **Blair Brown at 0h for a 3rd consecutive week (both LeNH and KhanhHH)** — needs a direct resolution this time, not another week of noting it.
6. **How should LongVV's new Marcel/Tokenlite hours (18h/13h charged) be reflected in the James Diamond+Marcel+Blair Brown Matrix report?** — see #3 above.
7. **Last week's (W35, week_start 07-13) Matrix report was drafted but never sent** (`confirmed: false`, `sent: false` still in `config/.weekly-report-send-flags.json`) — send it late, discard, or does this week supersede it?
8. **Fountain narrow-scope (WIP) actual-hours column stuck for 3 straight weeks** on the same 4 tasks even as broad-scope data clearly updates — worth a specific ask to Kunal's team about WIP task actual-hours tracking (not "is the tab maintained" generally, since it clearly is for completed tasks).
9. **#2380 duplicate-row issue** (same task, two rows, both stale) still not cleaned up after 3+ weeks.

---

*Data sources: `scripts/workstream-fetch-project-week.js 2026-07-20` (all tracked projects, live SSO re-auth this run), `scripts/sheets-summary-employee-fetch.js` (Paturevision, Elena, Marcel, Fountain Summary tabs, service account), JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio), Fountain "Est vs Charged" tab (direct read + status distribution), Matrix `/messages` (Fountain room, static `mct_` compat token restored this run), `config/leave-plan.json`.*
