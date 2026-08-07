# Weekly Monitor — Week of 2026-08-03 → 2026-08-07 (data through Fri 08-07)

**Run at:** 2026-08-07 ~21:00 +07 (Friday, normal cadence)
**Compared to:** W37 (Jul 27 – Aug 2, report dated 2026-08-01)

**Note on this run:** Google Sheets task-log tracking has largely collapsed this week — 9 of 11 monitored sheets show empty template rows (0.00h for every employee), confirmed by direct W-tab spot-checks (James Diamond, BXR, Radio Data Center, Baamboozle, Fountain — genuinely empty, not a parsing bug). Only Paturevision/Bailey still has real Sheets data. Maddy's Summary tab hasn't had a new week row since ~W52 (late Mar/early Apr 2026). Workstream is now the de facto sole source of truth for nearly every project. JIRA is also stale for both cross-check devs (LongVV/madhuraka, LeNH/swiftstudio) — no worklogs at all since before this week, so the JIRA cross-check itself isn't meaningful this run (not treated as a discrepancy alert, since Workstream has real data for LongVV and LeNH is 0h everywhere anyway).

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **LeNH: 0h across every single source this week** (Workstream, Sheets, JIRA) | Resolved: user confirmed directly with LeNH — reason is dev hasn't written up his task log yet (not leave, not absence). Report as 0h with that reason; no further chasing needed this week. |
| **James Diamond Web = 0h/0h this week** | Both usual Web devs show zero: PhucVT is reviewer-only on JD (0h, fully on Crystal lang instead), LeNH is reviewer-only on JD (0h, see above). No LongVV flex allocation logged under JD this week either (his 40h went to Maddy/Marcel/OhCleo). First week in the tracked period Web has literally 0 actual hours — **flagging for your call before the Matrix draft goes out**, since past weeks always had a manual charge override supplied by you when something like this came up. |
| **Sheets → Workstream migration is now effectively complete** | 9/11 sheets empty this week (Maddy, James Diamond, Amazing Meds, Rebecca, Generator, BXR, Radio Data Center, Baamboozle, Elena). Only Paturevision has real data. Worth deciding whether to formally retire the Sheets scan for the abandoned ones and rely on WS only — the weekly workflow doc still treats Sheets as primary. |
| **Blair Brown — 0h for a 5th consecutive week** | Both LeNH and KhanhHH still at 0 Workstream entries. Flagged 4 weeks running already. |
| **PhucVT — Crystal lang hours up, reversing the 4-week decline** | 41h→29.5h→16h→15.5h→**24.5h**. Still 0h on James Diamond though. |
| **TuanNT back to exact 40h** | Last week's unexplained 8h shortfall (32h, no leave on file) is resolved — 37.75h Paturevision + 2.25h Neural Contract = 40.0h. |
| **Fountain: plan recovered** (see #2 Part 1), but **Est vs Charged tab frozen for a 5th consecutive week** — byte-identical to W36/W37 for both narrow (229.00h/28 tasks) and broad (328.50h/63 tasks) scope. Live-verified this is a real, readable tab (not access-dropped) that the team simply hasn't touched — worth a direct, specific ask to Kunal's team now. | Also: `docs/memory/daily-report/fountain/feedback_fountain_kunal_checklist.md` currently says these parts were "DROPPED 2026-07-13, tab no longer used" — this is factually wrong (tab is live and readable), flagging for correction. |
| **Fountain: DatNT logged only 8h vs 32h planned, despite heavy Matrix activity all week** (Infinity Rails 8 upgrade, multiple PRs/bug fixes) | Task-log/actual-work mismatch, not a "not working" situation — worth a direct nudge to log hours, not a generic reminder. |
| **Fountain: VuTQ logged 0h vs 8h planned, but was visibly active in Matrix** (PR reviews, task assignments, code guidance) all week | Same pattern as DatNT — task-log gap, not absence. |

---

## #1 — Team Hours (through Fri 08-07)

### Summary Table

| Developer | Sources | Week Hours (actual) | Target | Status |
|-----------|---------|----------------------|--------|--------|
| LongVV | WS: Maddy 16.08h + Marcel 1.83h (1.5h charged) + OhCleo 22.08h (20.92h charged) | **40.0h logged** (38.5h charged) | 16h Maddy-specific per workflow doc / 40h per `.jira-config.json` (conflicting definitions, not resolved) | ✓ Maddy-specific target met; total workload 40h |
| TuanNT | Sheets: Paturevision W39 37.75h + WS: Neural Contract 2.25h | **40.0h** | 40h | ✓ exact match — last week's shortfall resolved |
| KhanhHH | WS: Baamboozle 14h + Generator 10h + Radio Data Center 16h | **40.0h** | 40h | ✓ exact match |
| LeNH | WS: 0h (reviewer-only on JD + RDC) + Sheets: 0h (empty tabs) + JIRA: 0h (stale) | **0h** | 40h | ⚠️ 0h everywhere — user-confirmed reason: task log not written up yet |
| PhucVT | WS: Crystal lang 24.5h (reviewer-only on JD, 0h there) | **24.5h** | 40h | ⚠️ shortfall 15.5h, but reversing 4-week decline (was 15.5h last week) |
| AnhNH2 | WS: James Diamond Mobile 20h | **20h** | — (no fixed plan) | note only |
| Marcel: DuongDN | WS: Tokenlite 8.5h | **8.5h** | — (adhoc) | note only |
| Marcel: LongVV | WS: Tokenlite 1.83h (1.5h charged) | (rolled into LongVV total above) | — | note only |
| Fountain: ThinhT | WS: Fountain 20h | plan 20h | ✓ exact match |
| Fountain: ViTHT | WS: Fountain 32h | plan 40h | ⚠️ -8h, no Monday entry |
| Fountain: DatNT | WS: Fountain 8h | plan 32h | ⚠️ -24h despite heavy Matrix activity — see Critical Notes |
| Fountain: VuTQ | WS: 0h (reviewer-only) | plan 8h | ⚠️ missing but visibly active in Matrix — see Critical Notes |
| Fountain: PhatDLT (QC) | WS: Fountain 12.5h | plan (QC pool 25h combined) | note only |
| Fountain: HungPN (QC) | WS: Fountain 16h (+2h OhCleo, unreviewed) | plan (QC pool 25h combined) | note only — QC pool total 28.5h vs 25h planned |
| Fountain: LamLQ | WS: Fountain 8h | — (unplanned, ad-hoc mid-week assignment by DuongDN) | note only |
| Generator: NamNN | WS: Generator 10h | — (not in tracked roster) | note only |
| OhCleo: MinhTV | WS: OhCleo 0.75h | — (not in tracked roster) | note only |
| Family App: LuHX | WS: Family App 5.5h + OhCleo 13h/11h charged | — (not in tracked roster) | note only |
| Crystal lang: TienND | WS: Crystal lang 13h | — (reviewer/override role) | note only |

**JIRA cross-check:** Both madhuraka (LongVV) and swiftstudio/BXR (LeNH) return 0 worklogs for `worklogDate >= "2026-08-03"` — confirmed not a query bug (same JQL works for earlier date ranges). Neither dev has updated JIRA at all this week; not treated as a discrepancy alert since Workstream is the authoritative source per [[feedback_workstream_all_projects]] and has real data for LongVV. For LeNH, JIRA being stale is moot — he's 0h everywhere.

**Workstream `needsReview` flags this run:** Fountain 33 unreviewed (PhatDLT, HungPN), Radio Data Center 14 (KhanhHH), Crystal lang 4 (PhucVT) — not hours issues, reviewer-gate check only.

**Leave:** No entries in `leave-plan.json` for any of the 5 monitored devs this week. Could not cross-check most sheets for "Nghỉ" rows since 9/11 tabs are empty; Bailey W39 (the one live tab) has no leave rows for TuanNT.

### Developer Notes

**LongVV:** Full 40h logged across 3 projects (Maddy 16.08h meets his Maddy-specific target on its own), but 1.5h of Marcel time and 20.92h of OhCleo time is what got charged vs raw actual — routine rounding/review adjustments, not flagged.

**TuanNT:** Back to exact 40h after last week's unexplained 32h. No follow-up needed.

**KhanhHH:** Exact 40h again, 5th+ week running.

**LeNH:** See Critical Notes — this is the standout finding this week.

**PhucVT:** Decline has reversed (15.5h→24.5h), but still fully off James Diamond.

---

## #2 — Fountain Weekly Check (W38)

### Part 1 — Matrix Weekly Plan

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), searched Fri 07-31 07:00 → Fri 08-07 ~15:47, 147 root messages.

**Plan recovered this week** (last week had none at all), posted in two parts:
- **08-03 08:34 @trinhmtt (initial):** ThinhT 20h / DatNT 40h / ViTHT 40h / QC 25h
- **08-03 11:15 @trinhmtt (revised, ~3h later):** ThinhT 20h / DatNT 32h / ViTHT 40h / VuTQ 8h / QC 25h

Final/authoritative plan = the 11:15 revision.

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`).

| Dev | W38 Hours | Note |
|-----|-----------|------|
| ThinhT | 20h | 4h/day Mon–Fri |
| ViTHT | 32h | 8h/day Tue–Fri, no Monday entry |
| DatNT | 8h | single entry Thu 08-06 only |
| LamLQ | 8h | new — ad-hoc mid-week assignment, not in Trinh's plan |
| PhatDLT (QC) | 12.5h | daily 2–3h |
| HungPN (QC) | 16h | daily 2–4h |
| VuTQ | 0h | no Workstream entries at all — but active in Matrix all week |
| **Total (dev+QC)** | **96.5h** | down from 124.5h last week |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Δ |
|-----|------|--------|---|
| ThinhT | 20h | 20h | ✓ match |
| DatNT | 32h | 8h | -24h short (task-log gap, see Critical Notes) |
| ViTHT | 40h | 32h | -8h short |
| VuTQ | 8h | 0h | fully missing on log, but active in Matrix (task-log gap) |
| QC (PhatDLT+HungPN) | 25h | 28.5h | +3.5h over |
| LamLQ | — (unplanned) | 8h | ad-hoc addition |

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab, Status col G, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | vs W37 |
|--------|-------|-----------|--------|
| Narrow (Not Started + In-progress >50% + In-progress <50%) | 28 | **229.00h** | byte-identical |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | byte-identical |

**5th consecutive week the tracked (status-assigned) portion is frozen.** New rows appended at the bottom this week (#2939 20h, #2978 40h, #2823 4h — all DatNT) carry blank status, so they sit outside both buckets as untriaged backlog (16 rows total in this state) and don't move the totals.

### Part 5 — Over-Estimate Tracking

37 items >20% over est+CR — same count, same values as W37 (frozen, consistent with Part 4).

| Task | Est+CR | Actual | Over% | vs W37 |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | unchanged |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | unchanged |
| #2380 (duplicate row) | 4h/20h | 25.25h both | +531%/+26% | still unresolved, 5+ weeks |
| #2523 | 16h | 61h | +281% | unchanged |
| #2872 | 32h | 46.25h | +45% | unchanged |
| #2595 (Giftdrop Redemption) | 120h | 168.25h | +40% | unchanged |

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: NOT YET DRAFTED FOR SEND — needs your call on the Web=0h/0h anomaly first** (see Critical Notes). Also note: **last week's (W37, 27/07) draft was never confirmed/sent** and is now 11 days stale in `config/.weekly-report-send-flags.json` — same situation as the W35 draft that got superseded rather than sent late. Need your instruction: send W37 late, or supersede it with this week's?

Raw numbers if sent as-is (no override applied):

| Dev | Project | Actual | Charge | Note |
|-----|---------|--------|--------|------|
| PhucVT | JD Web | 0h | 0h | reviewer-only on JD, fully on Crystal lang (24.5h) |
| LeNH | JD Web | 0h | 0h | reviewer-only on JD, 0h everywhere this week — user-confirmed reason: task log not written up yet |
| LongVV | JD Web (flex) | 0h | 0h | no JD allocation this week — his 40h went to Maddy/Marcel/OhCleo |
| AnhNH2 | JD Mobile | 20h | 20h | no fixed plan |
| DuongDN | Marcel | 8.5h (8h30m) | 8.5h | — |
| LongVV | Marcel | 1.83h (1h50m) | 1.5h (1h30m) | — |
| LeNH | Blair Brown | 0h | 0h | 5th straight week at 0 |
| KhanhHH | Blair Brown | 0h | 0h | 5th straight week at 0 |

Web total: charge=actual=**0h/0h**. Mobile: **20h/20h**. Marcel total: charge **10h**/actual **10h20m**.

Draft text (pending your confirmation per the mandatory send-gate):
```
Report week 03/08

James Diamond

Web: 0h/0h
PhucVT: 0h/0h (vẫn đang ở Crystal lang/Arthur tuần này)
LeNH: 0h/0h

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel

Marcel: 10h/10h20m
DuongDN: 8h30m/8h30m
LongVV: 1h30m/1h50m

---

Blair Brown - Peptide Clyde
LeNH: 0h
KhanhHH: 0h
```

---

## #4 — Unresolved Questions

1. ~~LeNH 0h across every source~~ — RESOLVED: user confirmed directly with LeNH, reason is task log not written up yet.
2. **James Diamond Web = 0h/0h this week** — send as-is, or is there a manual override (e.g. LongVV backfill) you want applied, like in prior weeks?
3. **W37 (27/07) Matrix draft still unconfirmed/unsent, now 11 days stale** — send late or supersede with this week's (W35 precedent was superseded)?
4. **DatNT (Fountain) -24h vs plan despite heavy Matrix activity** — task-log gap, needs a nudge to log hours?
5. **VuTQ (Fountain) 0h logged despite visible Matrix activity** — same task-log gap.
6. **Fountain Est vs Charged tab frozen 5th straight week** — worth a direct, specific ask to Kunal's team now rather than another week of noting it.
7. **#2380 duplicate-row issue** — unresolved 5+ weeks.
8. **9/11 Google Sheets now empty/abandoned** (Maddy Summary stale since ~W52/late-Mar) — formally retire Sheets scan for these and rely on Workstream only?
9. **`docs/memory/daily-report/fountain/feedback_fountain_kunal_checklist.md`** claims Parts 4/5 were "dropped, tab no longer used" — this is factually wrong (tab live, readable, just unedited by the team). Recommend correcting that memory file.

---

*Data sources: `scripts/workstream-fetch-project-week.js 2026-08-03` (all 19 tracked projects, live, required browser-login fallback), `scripts/sheets-summary-employee-fetch.js` (11 sheets, 9 returned empty), direct Bailey W39 tab read, JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio, both stale for this week), Matrix `/messages` (Fountain room, static `mct_` compat token), `config/leave-plan.json`.*
