# Weekly Monitor — W34 (2026-07-06 → 2026-07-10)

**Run at:** 2026-07-10 22:xx +07
**Report for:** Week of Jul 6 – Jul 10, 2026 (W34)
**Compared to:** W33 (Jun 29–Jul 3)

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **LongVV role change** | User confirmed 2026-07-07: LongVV is now **full-time (40h/wk) on OhCleo** ("Tony" in OhCleo Slack) — the old 16h/wk Maddy-only part-time policy no longer applies. He still logged Maddy 16h + James Diamond flex 8h this week alongside OhCleo 12h. **Open question: is 40h/wk now his combined target across all projects, or is OhCleo 40h on top of Maddy?** Memory needs updating either way — see Unresolved Questions. |
| **PhucVT off James Diamond all week** | 0h on JD — fully reassigned to **Crystal lang (Arthur/Meta-Stamp)**, 41h logged (38h charged), OT >40h approved live by Nam Trần ("crunch week due to the demos"). Real, sanctioned — not an alert, but changes who "Web" is on the JD Matrix report this week (see #3). |
| **Blair Brown billing dispute (last week)** | Customer disputed 68h50m charged for the prior week; LeNH + DuongDN reconciled overnight (Jul9 09:19–Jul10 02:37) to 28h10m, itemized breakdown sent to customer ~02:26. This is about **W33's** charge, not W34's — doesn't change this week's numbers, but explains why LeNH logged almost no *new* Blair Brown work this week (0.58h) — he was heads-down on the reconciliation + James Diamond instead. |
| **KhanhHH — 2 leave days this week** | Full-day leave Jul 9 (dental/wisdom-tooth) + full-day leave Jul 10 (recovery), both still "pending" in `leave-plan.json` but confirmed live in Matrix by namtv + duongdn. Adjusted target = 40h − 16h = 24h; actual on file = 23.99h ≈ **exact match**, not a shortfall. |
| **TuanNT** | Paturevision daily-tab total (38h, Mon–Fri) does **not** match the Summary tab's W35 cell (36h — that row also has a `#REF!`/`#DIV/0!` column nearby, likely a broken formula). Used the daily-tab sum as source of truth; combined with Neural Contract (WS) 2h = **40h exactly**, matching target. Flagging the Summary-tab discrepancy for awareness, not treating 36h as authoritative. |
| **Fountain — clean plan-vs-actual week again** | ViTHT, ThinhT, DatNT all landed exactly on trinhmtt's Monday plan (40h/20h/40h). Second clean week in a row. |
| **TrinhMTT logged 16h in Fountain WS this week** | Not part of the posted dev plan (plan poster/PM role historically). Worth a quick check on what this represents — see Unresolved Questions. |
| **Elena sheet (KhanhHH 4th source)** | Still returns "caller does not have permission" — same unresolved 403 open since W31+. |
| **Fountain Est vs Charged — over-estimate tracking** | 37 items >20% over (same count as W33). All previously-tracked repeat offenders (#2595, #2615, #2702, #2816, #2735 etc.) are numerically **identical** to last week — no growth. Narrow-scope (NS+In-progress) remaining dropped 446h→229h at the same 28-task count — this reflects real churn (several W33 narrow tasks completed/moved out, several new ones like #2870/#2885/#2912 entered), not a data error. |
| **James Diamond + Marcel + Blair Brown Matrix report** | **NOT sent yet** — drafted below, needs your explicit confirmation given how unusual this week's roster is (PhucVT 0h, LeNH doing most of Web). See #3. |

---

## #1 — Team Hours (W34)

### Summary Table

| Developer | Sources | W34 Hours | Target | Status |
|-----------|---------|-----------|--------|--------|
| LongVV | WS: Maddy 16h + JD flex 8h + OhCleo 12h | **36h** | 40h (new, OhCleo-primary) − 4h half-day leave Jul8 = 36h adj. | ✓ matches adj. target |
| PhucVT | WS: Crystal lang (Arthur) 41h (38h charged) | **41h** | — (crunch-week OT, approved, no fixed cap) | ✓ sanctioned OT |
| TuanNT | Sheets: Paturevision 38h (Mon-Fri 8/8/8/8/6) + WS: Neural Contract 2h | **40h** | 40h | ✓ exact match |
| KhanhHH | WS: Baamboozle 4.83h + Colin/ETZ 1.5h + Generator 4h + Blair Brown 0.08h + Radio Data Center 13.58h (all through Wed only) | **23.99h** | 40h − 16h (2 full-day leaves Jul9+10) = 24h adj. | ✓ matches adj. target |
| LeNH | WS: James Diamond 40h (34h charged) + Blair Brown 0.58h | **40.58h** | 40h | ✓ OK (Blair Brown low — see Critical Notes) |
| AnhNH2 | WS: James Diamond Mobile 19h | **19h** | — (no fixed plan) | note only |
| Marcel/DuongDN | WS: Tokenlite (Marcel) 0h | **0h** | — (adhoc) | note only — no Marcel work logged this week |
| Fountain: ViTHT | WS: Fountain | **40h** | 40h (plan) | ✓ exact match |
| Fountain: ThinhT | WS: Fountain | **20h** | 20h (plan) | ✓ exact match |
| Fountain: DatNT | WS: Fountain | **40h** | 40h (plan) | ✓ exact match |
| Fountain: TrinhMTT | WS: Fountain | **16h** | — (not in posted plan) | note — see Unresolved Questions |
| Fountain: HungPN (QC) | WS: Fountain | **7.5h** | — (QC pool 24h combined) | — |
| Fountain: PhatDLT (QC) | WS: Fountain | **13h** | — (QC pool 24h combined) | QC combined 20.5h vs 24h plan, −3.5h |
| Fountain: VuTQ | — | **0h** | — | Expected — DatNT replacing him as dev this week; VuTQ reviewing DatNT's work instead (per Jul6 daily report) |

**JIRA cross-check:**
- LongVV (madhuraka): `worklogAuthor="5b1ed0bcc175e5207bf80b77" AND worklogDate>="2026-07-06"` → **16.0h** (LIFM2-450 2h, LIFM2-449 7h, LIFM2-448 0.5h, LIFM2-447 4h, LIFM2-446 1h, LIFM2-428 1.5h). **Matches WS Maddy 16h exactly.**
- LeNH/Rory (swiftstudio BXR): `project=BXR AND worklogDate>="2026-07-06"` → **0h for LeNH**; all 4.5h logged by "Jeff Nguyen" = **KhoaTD**, matching WS `bxr_app` exactly. Confirms LeNH has fully handed off BXR to KhoaTD.

### Developer Notes

**LongVV:** Genuinely full week once the new 40h target (OhCleo-primary, confirmed by user 2026-07-07) and the Jul8 half-day leave (father's surgery, pending in `leave-plan.json`) are applied: 36h adj. target, 36h actual. But the underlying policy is still ambiguous — is Maddy (16h) additive on top of OhCleo 40h, or does OhCleo now subsume the old Maddy-only target? Needs a direct answer to set next week's target correctly.

**PhucVT:** 0h on James Diamond all 5 days — this is a sanctioned full-week reassignment to Crystal lang (Arthur/Meta-Stamp) for the pre-demo crunch, OT >40h explicitly approved by Nam Trần on Slack. Not a gap, but it means this week's JD "Web" line is carried entirely by LeNH + LongVV's flex hours (see #3).

**TuanNT:** Clean 40h week (38h Paturevision Mon–Fri + 2h Neural Contract Friday). Daily-tab sum (38h) conflicts with the Summary!W35 cell (36h, which sits next to a `#REF!` cell) — used the daily-tab figure as it matches the isolated per-day checks already confirmed in this week's daily reports (8h Jul6/7/9 individually verified).

**KhanhHH:** Fragmented across 5 small WS projects (Baamboozle/Colin/Generator/Blair Brown/Radio Data Center) but data only goes through Wed Jul 8 — consistent with the dental leave Thu+Fri. 23.99h vs 24h adjusted target is effectively exact. Elena sheet (her 4th/5th source historically) still returns a permission error, unresolved since W31+.

**LeNH:** James Diamond dominant this week (40h logged, 34h charged — 6h still pending review). Blair Brown crashed to 0.58h, but context explains it: he spent Jul9 night into Jul10 early morning reconciling last week's disputed Blair Brown invoice (68h50m → 28h10m) instead of logging new work. Total across both projects (40.58h) clears the 40h target regardless.

**Fountain:** Cleanest back-to-back weeks on record — ViTHT/ThinhT/DatNT all landed exactly on trinhmtt's Monday plan (posted 08:40 Jul 6, replacing VuTQ with DatNT as this week's junior dev). QC (HungPN+PhatDLT) came in at 20.5h vs 24h planned, a small −3.5h gap, not flagged as an issue given the dev-side accuracy. TrinhMTT logging 16h in Workstream is new and outside the plan roster — worth a quick check on what he worked on.

---

## #2 — Fountain Weekly Check (W34)

### Part 1 — Matrix Weekly Plan

Source: daily reports already captured this live (Fountain room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`) — not re-pulled this run since the daily-report record is a direct citation, not a summary.

@trinhmtt posted **2026-07-06 08:40:22 +07** (Monday): *"em gui plan tuan nay a"* — **ViTHT: 40h | ThinhT: 20h | DatNT: 40h ⇒ QC: 24h.** No VuTQ or HaVS this week (DatNT replaces VuTQ as the junior dev; VuTQ reviews DatNT's work instead). Capacity = **100h/week** (dev-only, excl. QC) — up from 92h/wk last week.

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`).

| Dev | W34 Hours |
|-----|-----------|
| ViTHT | 40h |
| ThinhT | 20h |
| DatNT | 40h |
| TrinhMTT | 16h (not in plan) |
| HungPN (QC) | 7.5h |
| PhatDLT (QC) | 13h |
| **Total (dev + QC)** | **136.5h** |

GSheets `Summary!W34`: still 0h across all columns — 6th consecutive week (W29–W34) at 0h in Sheets; WorkStream remains the sole real source.

### Part 3 — Plan vs Actual

| Dev | Plan | Actual (WS) | Delta | Status |
|-----|------|-------------|-------|--------|
| ViTHT | 40h | 40h | 0h | ✓ exact match |
| ThinhT | 20h | 20h | 0h | ✓ exact match |
| DatNT | 40h | 40h | 0h | ✓ exact match |
| QC (HungPN+PhatDLT) | 24h | 20.5h | −3.5h | ⚠️ small shortfall |

**Second cleanest plan-vs-actual week on record** — all 3 dev-side numbers exact, only QC slightly under plan.

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab, Status col idx6/col G, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | Runway @ 100h/wk (plan) | Runway @ actual dev pace (100h/wk) |
|--------|-------|-----------|--------------------------|--------------------------------------|
| Narrow (Not Started + In-progress) | 28 | **229.0h** | 2.29wk | 2.29wk |
| Broad (excl. Deployed on Live/Cancelled) | 82 | **554.8h** | 5.55wk | 5.55wk |

W33 → W34 delta:

| Metric | W33 | W34 | Change |
|--------|-----|-----|--------|
| Narrow tasks / remaining | 28 / 446.0h | 28 / 229.0h | same count, **−217h** (real churn — several W33 narrow tasks completed/downgraded, several new ones like #2870/#2885/#2912 entered scope) |
| Broad tasks / remaining | 74 / 534.8h | 82 / 554.8h | **+8 tasks, +20.0h** |

Broad scope grew again this week (+8 tasks, +20h) after last week's small shrink — net backlog trend is flat-to-growing.

### Part 5 — Over-Estimate Tracking

37 items >20% over est+CR — **same count as W33**. All numerically-checked repeat offenders are **unchanged**:

| Task | Est+CR | Actual | Over% | vs W33 |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | STABLE |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | STABLE |
| #2595 (Giftdrop Redemption Flow) | 120h | 168.25h | +40% | STABLE (unchanged since first populated W33) |
| #2735 (Pro Send Smart Link) | 130h | 136h | +5% | STABLE |
| #2702 (Infinity Accessibility) | 8h | 25.5h | +219% | STABLE |
| #2816 (Infinity Homepage) | 20h | 44.25h | +121% | STABLE |
| #2380 (duplicate row, still unresolved) | 4h | 25.25h | +531% | STABLE — duplicate-row data-quality issue from W33 still not cleaned up |

**New entrants approaching/over threshold in the narrow (active) scope:** #2870 (80h est, 63.25h actual, 79% used — not yet over), #2872 (32h est, 46.25h actual, +44% over), #2912 (40h est, 2h actual — just started). None of these were in W33's tracked list; worth a first look now that they're active.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: DRAFTED, NOT SENT — awaiting your explicit confirmation** (per the mandatory send-gate: nothing goes to Thuy Le's room until you confirm the exact text below, since this week's roster is unusual).

Raw data:

| Dev | Project | Charge | Actual | Source |
|-----|---------|--------|--------|--------|
| PhucVT | JD Web | 0h | 0h | WorkStream — 0h all week, reassigned to Crystal lang/Arthur (sanctioned OT there instead) |
| LeNH | JD Web (extra) | 34h | 40h | WorkStream — 6h still pending review |
| LongVV | JD Web (flex) | 3h | 8h | User correction: of the 8h logged, 5h is makeup for a prior week's undercharge (non-chargeable) + 3h is chargeable work covering LeNH's performance |
| AnhNH2 | JD Mobile | 19h | 19h | WorkStream, no fixed plan |
| DuongDN | Marcel (Tokenlite) | 0h | 0h | WorkStream — no entries this week |
| LeNH | Blair Brown | 0h 35m | 0h 35m | WorkStream |
| KhanhHH | Blair Brown | 0h 5m | 0h 5m | WorkStream — missed in the first draft, added per user correction |

Web total: charge = 0+34+3 = **37h** / actual = 0+40+8 = **48h**.

Draft message (v2, per user correction):
```
Report week 06/07

James Diamond

Web: 37h/48h
PhucVT: 0h/0h (chuyển sang Crystal lang/Arthur tuần này, OT được duyệt)
LeNH: 34h/40h
LongVV: 3h/8h (5h trả nợ giờ thiếu tuần trước không charge thêm, 3h charge làm bù performance cho LeNH)

Mobile: 19h/19h
AnhNH2: 19h/19h

---

Marcel
DuongDN: 0h

---

Blair Brown - Peptide Clyde
LeNH: 0h 35m
KhanhHH: 0h 5m
```

Awaiting explicit confirmation of this exact text before sending.

---

## #4 — Unresolved Questions

1. **LongVV's real target now that he's confirmed full-time OhCleo (40h/wk)** — is that 40h combined across all his projects (Maddy+JD+OhCleo), or is OhCleo 40h on top of whatever else he does? Affects how next week's shortfall/OK calls get made.
2. **TrinhMTT's 16h in Fountain Workstream this week** — he's historically the plan-poster/PM, not a listed dev in the Monday plan. What is this time for?
3. **Paturevision Summary!W35 tab shows 36h for TuanNT vs the daily-tab sum of 38h**, with a `#REF!`/`#DIV/0!` cell nearby — looks like a broken formula in that sheet, not just a one-off. Worth a look if the Summary tab is used for other things.
4. **Elena sheet permission (403)** — still open since W31+, KhanhHH's 4th/5th tracked source stays unverifiable via Sheets.
5. **Blair Brown billing dispute** — review requested (namtv, Jul9 17:44) on whether the overnight 28h10m reconciliation for last week is reasonable before it's fully closed out with the customer.

---

*Data sources: `scripts/workstream-fetch-project-week.js 2026-07-10` (all projects), Google Sheets Paturevision W35 (daily-tab direct read) + Summary tabs (service account), JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio), Fountain "Est vs Charged" tab, `config/leave-plan.json`, this week's daily reports (2026-07-06 → 2026-07-10) for Matrix-plan citations and context already established.*
