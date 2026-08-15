# Weekly Monitor — Week of 2026-08-10 → 2026-08-14 (W39/data through Fri 08-14)

**Run at:** 2026-08-15 ~15:55 +07 (Saturday — Friday run was skipped, catching up 1 day late)
**Compared to:** W38 (Aug 3–7, report dated 2026-08-07). No weekly report ran 2026-08-08 → 2026-08-14, so this is the first check-in in 8 days.

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **TuanNT: 16h vs 40h target — 24h short**, Bailey/Paturevision only source (WS doesn't cover Bailey) | New this week — no leave on file. Two work-blocks (Wed 5.5h, Thu 4.75h) marked "Overbudget" in sheet Notes and **charged at 0h despite hours logged** — worth a direct check on why hours dropped so sharply and why those blocks are unbillable. |
| **LongVV short on both tracks**: Maddy 3.25h/16h target (-12.75h), OhCleo 28.42h actual/25.42h charged vs full-time 40h expectation (-11.6h actual) | Half-day leave on 08-10 (pending approval, "tái khám") only explains ~4h of the gap — real shortfall on both Maddy and OhCleo beyond the leave day. |
| **LeNH fully recovered** — 40.0h exact (JD Web 39.5h + BXR 0.5h) | Last week he was 0h across every source with no explanation; this week back to full contribution, mostly on James Diamond Web (see #3). |
| **ViTHT (Fountain) — silent Friday 08-14**, both Workstream (no entry) and Matrix (zero messages) | Differs from last week's DatNT/VuTQ pattern which was "active in Matrix but no task log" — this looks like genuine absence, not just a logging gap. Worth a direct check-in. |
| **Fountain "Est vs Charged" tab frozen a 6th consecutive week** — byte-identical Narrow (229.00h/28 tasks) and Broad (328.50h/63 tasks) buckets, same 37-item over-estimate list | Flagged 08-07 as needing a direct ask to Kunal's team; still no movement. |
| **James Diamond + Marcel + Blair Brown Matrix report: 3 weeks of backlog** (W37 27/07, W38 03/08, W39 10/08 — this week) all unconfirmed/unsent | See #3 — need your call on how to handle the backlog before sending anything. |
| **Fountain plan posted mid-week (Tue), not Monday**, and only covered 5 people (ThinhT 4h/ViTHT 40h/DatNT 40h/LamLQ 16h + QC 25h) | LamLQ's 16h was reassigned mid-week to another project ("OnS") with lead's sign-off — not a gap, a real reallocation. |

---

## #1 — Team Hours (through Fri 08-14)

### Summary Table

| Developer | Sources | Week Hours (actual/charged) | Target | Status |
|-----------|---------|------------------------------|--------|--------|
| LongVV | WS: Maddy 3.25h + Marcel 1.00h + OhCleo 28.42h/25.42h charged | **32.67h / 29.67h** | 16h Maddy-specific + informal ~40h combined | ⚠️ short on both Maddy (-12.75h) and OhCleo (-11.6h) tracks; half-day leave 08-10 explains only ~4h |
| TuanNT | Sheets: Paturevision W40 | **16.00h** | 40h | ⚠️⚠️ -24h, no leave on file, 2 blocks marked "Overbudget" (charged 0) |
| KhanhHH | WS: Baamboozle 17h + Generator 10h + Radio Data Center 9h/8.5h charged | **36.00h / 35.50h** | 40h | ⚠️ -4h |
| LeNH | WS: James Diamond 39.5h + BXR 0.5h | **40.00h** | 40h | ✓ exact match — full recovery from last week's 0h |
| PhucVT | WS: Crystal lang 12.5h + OhCleo 2.5h/0h charged | **15.00h / 12.50h** | — (no fixed target, reviewer-only on JD) | note — down from 24.5h last week, all Crystal lang entries pending review |
| AnhNH2 | WS: James Diamond Mobile | **20.00h** | — (no fixed plan) | note only, exact 4h/day Mon–Fri |
| Marcel: DuongDN | WS: Tokenlite | **0.50h** | — (adhoc) | note only |
| Marcel: LongVV | WS: Tokenlite (rolled into LongVV total above) | 1.00h | — | note only |
| Fountain: ThinhT | WS: Fountain | **4h** | plan 4h | ✓ exact match |
| Fountain: ViTHT | WS: Fountain | **32h** | plan 40h | ⚠️ -8h, no Friday entry, zero Matrix activity Friday — see Critical Notes |
| Fountain: DatNT | WS: Fountain | **40h** | plan 40h | ✓ exact match — resolves last week's -24h gap |
| Fountain: LamLQ | WS: Fountain | **0h** | plan 16h | reassigned mid-week to "OnS" project by lead, not a gap |
| Fountain: VuTQ | WS: Fountain | **0h** | not on this week's plan | reviewer-only role, consistent with plan omission |
| Fountain: PhatDLT (QC) | WS: Fountain | **10.5h** | plan (QC pool 25h combined) | note only |
| Fountain: HungPN (QC) | WS: Fountain | **14h** | plan (QC pool 25h combined) | note only — QC pool total 24.5h vs 25h planned, essentially on target |
| Fountain: TrinhMTT (lead/planner) | WS: Fountain | 16h actual / 8h charged | — (not QC per roster rule) | note only |

**JIRA cross-check:**
- LongVV/Maddy (madhuraka): 1.75h logged ≥08-10 vs 3.25h Workstream — 1.5h diff, under the 2h flag threshold, JIRA has recent entries (LIFM2-458/450/449/436/428).
- LeNH/BXR (swiftstudio): 0 worklogs ≥08-10, last real entry 2026-05-12 (~3 months stale) — confirmed known stale-JIRA pattern, not treated as a discrepancy since JIRA has no recent activity to compare against.

**Leave:** Only entry in `leave-plan.json` for this week is LongVV half-day 08-10 ("Em đi tái khám ạ", status: pending). His 08-10 Workstream total was 4h (OhCleo only), consistent with a half day. No other leave entries for the 5 core devs this week.

**Workstream `needsReview`/`missingReportDays` flags this run:** James Diamond, BXR App, Baamboozle, Crystal lang all show project-wide `missingReportDays` for all 5 days this week (client report missing — project-level, not a specific dev's hours issue). Crystal lang: all of PhucVT's entries this week are pending review. LongVV: one Marcel entry (08-13) pending review. Fountain: `needsReview` empty this run (down from 33 last week).

### Developer Notes

**LongVV:** Short on both Maddy (3.25h vs 16h) and OhCleo (28.42h vs ~40h full-time expectation) tracks. Half-day pending leave (08-10) only explains part of it.

**TuanNT:** Biggest concern this week — 16h vs 40h, no leave on file, two Overbudget blocks charged at 0 despite hours logged. Needs a direct check.

**KhanhHH:** Modest -4h shortfall, no leave on file.

**LeNH:** Full recovery — back to exact 40h after a total 0h week last week, mostly via James Diamond Web (39.5h).

**PhucVT:** Hours down again (24.5h→15h), still fully off James Diamond, all Crystal lang work pending review.

---

## #2 — Fountain Weekly Check (W39)

### Part 1 — Matrix Weekly Plan

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), full transcript read Fri 08-07 → 08-15, 284 messages.

**Plan posted mid-week (Tue 08-11, 16:30 +07) by @trinhmtt, no Monday plan and no later revision:**
"Em gửi plan tuần này ạ  ThinhT: 4h  ViTHT: 40h  DatNT: 40h  LamLQ: 16h  => QC 25h"

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`). `needsReview` empty (vs 33 unreviewed last week).

| Dev | W39 Hours | Note |
|-----|-----------|------|
| DatNT | 40h | Mon–Fri, 8h/day, full week |
| ViTHT | 32h | Mon–Thu, 8h/day — no Friday entry |
| HungPN (QC) | 14h | daily 2–4h |
| TrinhMTT (lead) | 16h actual / 8h charged | Mon–Thu only |
| PhatDLT (QC) | 10.5h | Mon–Thu only |
| ThinhT | 4h | Monday only |
| VuTQ | 0h | no entries, reviewer-only this week |
| LamLQ | 0h | reassigned mid-week, see Part 3 |
| **Dev+QC total (excl. VuTQ, excl. TrinhMTT)** | **100.5h** | up from 96.5h last week |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Δ | Note |
|-----|------|--------|---|------|
| ThinhT | 4h | 4h | ✓ match | |
| ViTHT | 40h | 32h | -8h | No Friday Matrix activity either — genuine absence, not just a log gap |
| DatNT | 40h | 40h | ✓ match | Resolves last week's -24h gap |
| LamLQ | 16h | 0h | -16h | Not a gap — Matrix 08-13 09:07 @trinhmtt asked if he'd started; LamLQ: "anh Năm kêu là làm Ons nốt á" (told to finish OnS project first); trinhmtt approved the reassignment |
| QC (PhatDLT+HungPN) | 25h | 24.5h | -0.5h | essentially on target |
| VuTQ | not on plan | 0h | — | consistent, reviewer-only |

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab (sheetId 920993260), range A13:L118, 100 named task rows (16 blank-status rows excluded as untriaged backlog, same as prior weeks). Status col G, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | vs W38 |
|--------|-------|-----------|--------|
| Narrow (Not Started + In-progress >50% + In-progress <50%) | 28 | **229.00h** | byte-identical |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | byte-identical |

**6th consecutive week the tracked portion is frozen** (was 5 weeks as of 08-07 report).

### Part 5 — Over-Estimate Tracking

37 items >20% over est+CR — same count, same values as last week (frozen).

| Task | Est+CR | Actual | Over% | vs W38 |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | unchanged |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | unchanged |
| #2380 (duplicate row) | 4h/20h | 25.25h both | +531%/+26% | unresolved, now 6+ weeks |
| #2523 | 16h | 61h | +281% | unchanged |
| #2872 | 32h | 46.25h | +45% | unchanged |
| #2595 (Giftdrop Redemption) | 120h | 168.25h | +40% | unchanged |

**Correction still pending:** `docs/memory/daily-report/fountain/feedback_fountain_kunal_checklist.md` still claims Parts 4/5 were "dropped, tab no longer used" — factually wrong (tab live, readable, frozen but real), flagged for 2 weeks running now.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**⚠️ Send-gate backlog: 3 weeks unconfirmed/unsent.** Per `config/.weekly-report-send-flags.json`, the W37 (27/07) draft is still sitting at `confirmed: false` (now 19 days stale). The W38 (03/08) draft from last week's report was never saved to the flag file or confirmed either — it was presented pending your call on the "Web=0h/0h" anomaly and never resolved. This week adds a W39 draft on top. **Need your instruction: send any of the backlog late, or supersede all of it with this week's draft (same as the W35 precedent, which was superseded rather than sent late)?**

Raw numbers for this week (W39, 10/08):

| Dev | Project | Actual | Charge | Note |
|-----|---------|--------|--------|------|
| LeNH | JD Web | 39.5h | 39.5h | full recovery, only Web contributor this week |
| PhucVT | JD Web | 0h | 0h | still fully on Crystal lang (12.5h, all pending review) |
| LongVV | JD Web (flex) | 0h | 0h | no JD allocation this week — hours went to Maddy/Marcel/OhCleo |
| AnhNH2 | JD Mobile | 20h | 20h | no fixed plan |
| DuongDN | Marcel | 0.5h (30m) | 0.5h | — |
| LongVV | Marcel | 1.0h | 1.0h | — |
| LeNH | Blair Brown | 0h | 0h | 6th straight week at 0 |
| KhanhHH | Blair Brown | 0h | 0h | 6th straight week at 0 |

Web total: charge=actual=**39h30m** (under the 40h cap, no banking needed since LeNH's hours alone don't exceed it). Mobile: **20h/20h**. Marcel total: charge=actual **1h30m**.

Draft text (pending your explicit confirmation per the mandatory send-gate — this exact text, not a summary):
```
Report week 10/08

James Diamond

Web: 39h30m/39h30m
PhucVT: 0h/0h (vẫn đang ở Crystal lang tuần này, chờ review)
LeNH: 39h30m/39h30m

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel

Marcel: 1h30m/1h30m
DuongDN: 30m/30m
LongVV: 1h/1h

---

Blair Brown - Peptide Clyde
LeNH: 0h
KhanhHH: 0h
```

---

## #4 — Unresolved Questions

1. **3-week Matrix report backlog (W37 27/07, W38 03/08, W39 10/08)** — send any late, or supersede all with this week's draft?
2. **TuanNT -24h with no leave on file** — needs a direct check on the cause; also why were the two "Overbudget" Wed/Thu blocks charged 0 despite hours logged?
3. **LongVV short on both Maddy and OhCleo tracks** beyond what the half-day leave explains — needs follow-up?
4. **ViTHT silent Friday 08-14** (Workstream + Matrix both empty) — direct check-in?
5. **Fountain Est vs Charged tab frozen 6th consecutive week** — still needs the direct ask to Kunal's team flagged last week.
6. **`feedback_fountain_kunal_checklist.md` correction** — still not applied (flagged 2 weeks running), factually wrong claim about Parts 4/5 being dropped.
7. **#2380 duplicate-row issue** — unresolved 6+ weeks.

---

*Data sources: `scripts/workstream-fetch-project-week.js 2026-08-10` (all projects, single clean fetch, no re-login needed), Bailey Paturevision Sheet W40 tab, JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio), Matrix `/messages` (Fountain room, full transcript 08-07→08-15), Fountain "Est vs Charged" tab (live Sheets API read), `config/leave-plan.json`.*
