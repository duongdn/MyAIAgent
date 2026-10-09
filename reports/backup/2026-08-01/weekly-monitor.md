# Weekly Monitor — W37/W38 (2026-07-27 → 2026-08-02, data through Fri 07-31)

**Run at:** 2026-08-01 08:xx +07 (Saturday, normal cadence)
**Compared to:** W36 (Jul 20–26)

**Note on this run:** Week numbering differs per sheet as usual — Paturevision tab is `W38` for this calendar week (James Diamond/WorkStream projects use calendar dates directly, no W-numbering mismatch there). User supplied a manual billing override for James Diamond Web this week (see #3) and two live data corrections during the run (LongVV Maddy charge 10h→9h; LeNH James Diamond actual 40h→32h, WorkStream auto-logs an off day as worked hours) — both applied below and are the user's own accounting call, not independently re-derived from WorkStream.

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **Fountain: no weekly plan posted at all this week** | Searched the Fountain Matrix room from Fri 07-24 through Sat 08-01 (190 messages) — no plan message from @trinhmtt this week, not even a late/revised one. Different from the last 4 weeks' pattern of "posted Monday, revised Tuesday." Part 1/Part 3 below have no plan to compare actuals against. |
| **Fountain "Est vs Charged" tab appears fully frozen this week, not just narrow-scope** | Narrow scope: 229.00h/28 tasks — byte-identical to W36 (4th straight week). New this week: **broad scope is also byte-identical to W36** (328.50h/63 tasks, same status distribution, same over-est table incl. the #2380 duplicate row). Last 3 weeks broad scope was clearly moving while narrow was stuck; this week nothing moved at all — escalates the finding from "WIP actual-hours tracking stuck" to "the tab may not have been touched since last week's read." Recommend a direct, specific ask to Kunal's team now rather than another week of noting it. |
| **TuanNT: 32h this week (was exact 40h last week), no leave on file** | Paturevision GSheets W38 = 32h, all rows filtered by Owner=TuanNT confirmed, no "Nghỉ" row found in the tab and no entry in `leave-plan.json` for this week. Unexplained 8h shortfall — needs a direct check. |
| **PhucVT: still declining on Crystal lang, still 0h James Diamond** | 41h → 29.5h → 16h → **15.5h** over 4 consecutive weeks, JD Web at 0h the whole time. Flat vs last week (basically bottomed out), but the JD-side gap hasn't been addressed. |
| **Blair Brown — 0h for a 4th consecutive week** | Both LeNH and KhanhHH still at 0 task-log rows. Flagged 3 weeks running already; recommend direct resolution with client/PM this time. |
| **LeNH — James Diamond WorkStream shows 40h raw, but includes 8h auto-logged for an off day (per user, "đó là cách workstream ghi")** | Real actual = 32h. This is a WorkStream logging quirk, not a `leave-plan.json` entry — no leave request found on file for LeNH this week. Applied as told; not independently re-derived. |
| **James Diamond Web — manual billing override this week** | User: "James Diamond tuần này charge 36h, dùng 4h LongVV làm dư." Applied as Web charge=36h/actual=32h, with 4h of that charge covered by LongVV's banked surplus capacity (charged now, his own actual hours to be logged/reported in a future week). See #3 for full breakdown and required send confirmation. |

---

## #1 — Team Hours (through Fri 07-31)

### Summary Table

| Developer | Sources | Week Hours (actual) | Target | Status |
|-----------|---------|----------------------|--------|--------|
| LongVV | WS: Maddy 10h (9h charged, corrected) + Marcel 10h (9h charged) + OhCleo 9h + JD flex 0h logged (4h charge allocated, banked) | **29h logged** (31h charged across projects) | flexible, no fixed 40h | note — well under 40h combined, but flex bucket, not itself an alert |
| TuanNT | Sheets: Paturevision 32h + WS: Neural Contract 0h | **32h** | 40h | ⚠️ SHORTFALL 8h, no leave on file |
| KhanhHH | WS: Generator 10h + Baamboozle 12.5h + Colin/ETZ 0h + Radio Data Center 17.5h + Sheets: Elena 0h | **40h** | 40h | ✓ exact match |
| LeNH | WS: James Diamond 32h (real, see Critical Notes) + Blair Brown 0h + Sheets: Paturevision 0h | **32h** | 40h | ⚠️ 8h short — WS off-day logging quirk, not a leave-plan entry |
| PhucVT | WS: Crystal lang 15.5h + JD Web 0h | **15.5h** | 40h | ⚠️ SHORTFALL, 4th straight week declining, now flat/bottomed |
| AnhNH2 | WS: James Diamond Mobile 19h | **19h** | — (no fixed plan) | note only |
| Marcel/DuongDN | WS: Tokenlite 0h + Sheets: Marcel 0h | **0h** | — (adhoc) | note only |
| Fountain: DatNT | WS: Fountain | **36h** (34h charged) | — (no plan posted this week) | note only |
| Fountain: ViTHT | WS: Fountain | **40h** | — (no plan posted this week) | note only |
| Fountain: ThinhT | WS: Fountain | **21h** | — (no plan posted this week) | note only |
| Fountain: HungPN (QC) | WS: Fountain | **14.5h** | — (QC pool, no plan) | note only |
| Fountain: PhatDLT (QC) | WS: Fountain | **13h** | — (QC pool, no plan) | note only |
| Maddy: LuHX | WS: Maddy | **2h** | — (not in tracked roster) | note only |
| Generator: NamNN | WS: Generator | **10h** | — (not in tracked roster) | note only |
| Generator: LucNT | WS: Generator (reviewer) | **10h** | — (not in tracked roster) | note only |
| BXR App: HauDC | WS: BXR App | **12h** | — (not in tracked roster) | note only |
| Crystal lang: TienND | WS: Crystal lang | **23h** (19h charged) | — (not in tracked roster) | note only |

**JIRA cross-check:**
- LongVV (madhuraka): `worklogAuthor="5b1ed0bcc175e5207bf80b77" AND worklogDate>="2026-07-27"` → **10h** (LIFM2-457 4h, LIFM2-454 4h, LIFM2-452 2h) — matches WS Maddy 10h actual exactly. Charge is 9h per user's correction (WS/script showed 10h charged, corrected to 9h this run) — JIRA only cross-checks actual hours logged, not the charge figure.
- LeNH/Carrick (swiftstudio BXR): `project=BXR AND worklogDate>="2026-07-27"` → **0h**. No longer a meaningful cross-check — she's off BXR (HauDC is the current dev).

**Workstream `needsReview` flags this run:** Fountain 38 unreviewed entries, Crystal lang 3 (PhucVT, awaiting TienND), OhCleo 5 (LongVV, awaiting DuongDN/MinhTV) — not hours issues, flagging for the reviewer-gate check only.

### Developer Notes

**LongVV:** Combined logged total across Maddy/Marcel/OhCleo is 29h, well under a hypothetical 40h — but he has no fixed weekly target (flex bucket), so this isn't itself an alert. This week he also has a 4h charge allocated to James Diamond Web from his banked surplus capacity, per user instruction — see #3.

**TuanNT:** First shortfall in several weeks (32h vs 40h target) with no leave-plan entry or "Nghỉ" row found in the sheet — needs a direct check on the missing 8h.

**KhanhHH:** Exact 40h again across 4 sources, same clean pattern as the last 2 weeks.

**LeNH:** Nominally 40h on WorkStream JD but real actual is 32h once the auto-logged off day is excluded (per user). Blair Brown still 0h for a 4th week.

**PhucVT:** Decline appears to have bottomed out (16h→15.5h, nearly flat) after 3 straight weeks of steep drops, but James Diamond Web involvement is still 0h — worth a decision on whether he's off JD for good or coming back.

---

## #2 — Fountain Weekly Check (W37)

### Part 1 — Matrix Weekly Plan

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), searched Fri 07-24 07:00 → Sat 08-01, 190 messages.

**No plan message found from @trinhmtt this week.** All messages in range are task/bug discussion (PR reviews, Trello card updates, QC back-and-forth) — no "Em gui plan tuần này" or equivalent post, initial or revised. This breaks the last-4-week pattern of at least an initial Monday post.

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`).

| Dev | W37 Hours |
|-----|-----------|
| DatNT | 36h (34h charged) |
| ViTHT | 40h |
| ThinhT | 21h |
| HungPN (QC) | 14.5h |
| PhatDLT (QC) | 13h |
| **Total (dev + QC)** | **124.5h** |

VuTQ absent from this week's WorkStream entries entirely (was 8h last week).

### Part 3 — Plan vs Actual

**No comparison possible — no plan was posted this week (see Part 1).** Actuals only, shown above. Down from 130.5h combined last week to 124.5h.

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab, Status col G, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | Runway @ prior week's 100h/wk (no plan this week to use) |
|--------|-------|-----------|--------------------------------------|
| Narrow (Not Started + In-progress >50% + In-progress <50%) | 28 | **229.00h** | 2.29wk |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | 3.29wk |

**Both narrow AND broad scope are byte-identical to W36's numbers this week** — same task counts, same remaining hours, same status distribution (21 "Deployed on Live"). This is new: the last 3 weeks showed narrow frozen while broad clearly moved; this week neither moved at all, suggesting the tab may not have been edited since last week's read rather than just the WIP actual-hours tracking being stuck.

### Part 5 — Over-Estimate Tracking

37 items >20% over est+CR — same count and same values as W36's 36-37 item table (cross-checked #2615, #2380 duplicate row, #2872, #2595 — all unchanged), consistent with the frozen-tab finding above.

| Task | Est+CR | Actual | Over% |
|------|--------|--------|-------|
| #2627 | 0.5h | 8.25h | +1550% |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% (unchanged) |
| #2380 (duplicate row, still unresolved) | 4h/20h (two rows) | 25.25h | +531%/+26% (unchanged) |
| #2523 | 16h | 61h | +281% |
| #2702 (Infinity Accessibility) | 8h | 25.5h | +219% |
| #2624 (Fountain order complete update) | 12h | 31.25h | +160% |
| #2629 | 8h | 18.25h | +128% |
| #2816 (Infinity Homepage) | 20h | 44.25h | +121% |
| #2872 | 32h | 46.25h | +45% (unchanged, narrow scope, frozen) |
| #2595 (Giftdrop Redemption Flow) | 120h | 168.25h | +40% (unchanged) |
| #2640 | 12h | 16.75h | +40% |
| #2695 | 20h | 26h | +30% |

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: DRAFTED, NOT YET SENT — awaiting explicit confirmation of the exact text below** per the mandatory send-gate (`config/.weekly-report-send-flags.json`, `confirmed: false`).

Raw data + how the user's override was applied:

| Dev | Project | Raw WS actual | Adjustment | Final actual | Final charge | Note |
|-----|---------|---------------|-----------|---------------|---------------|------|
| PhucVT | JD Web | 0h | — | 0h | 0h | Still on Crystal lang (15.5h there this week) |
| LeNH | JD Web | 40h | −8h (WS auto-logs an off day as worked, per user) | 32h | 32h | Real actual charged in full |
| LongVV | JD Web (flex) | 0h (nothing logged under JD project) | User: charge 4h from his banked surplus capacity | 0h | 4h | "Làm trước, report sau" — actual hours to appear in a future week's log |
| AnhNH2 | JD Mobile | 19h | — | 19h | 19h | No fixed plan |
| DuongDN | Marcel (Tokenlite) | 0h | — | 0h | 0h | — |
| LongVV | Marcel (Tokenlite) | 10h actual / 9h charged (WS) | — | 10h | 9h | — |
| LeNH | Blair Brown | 0h | — | 0h | 0h | 4th straight week at 0 |
| KhanhHH | Blair Brown | 0h | — | 0h | 0h | 4th straight week at 0 |

Web total: charge = 0+32+4 = **36h** / actual = 0+32+0 = **32h** — matches the user's stated "James Diamond charges 36h this week, using 4h of LongVV's surplus."
Marcel total: charge = 0+9 = **9h** / actual = 0+10 = **10h**.

**Exact draft text (from `config/.weekly-report-send-flags.json`):**
```
Report week 27/07

James Diamond

Web: 36h/32h
PhucVT: 0h/0h (vẫn đang ở Crystal lang/Arthur tuần này)
LeNH: 32h/32h
LongVV: 4h/0h (làm trước, report sau)

Mobile: 19h/19h
AnhNH2: 19h/19h

---

Marcel

Marcel: 9h/10h
DuongDN: 0h/0h
LongVV: 9h/10h

---

Blair Brown - Peptide Clyde
LeNH: 0h
KhanhHH: 0h
```

**Action needed:** confirm this exact text (or provide corrections) before it gets sent to Thuy Le's room (`!oofREYAXHsvPWEOJev:nustechnology.com`).

---

## #4 — Unresolved Questions

1. **TuanNT's 8h shortfall this week (32h vs 40h)** — no leave-plan entry, no "Nghỉ" row in the Paturevision sheet. Needs a direct check.
2. **Fountain: no weekly plan posted at all** — first time in the tracked period; is @trinhmtt's plan just late, or should this be escalated?
3. **Fountain "Est vs Charged" tab: both narrow and broad scope byte-identical to last week** — stronger version of the recurring frozen-data issue; worth a direct, specific ask to Kunal's team about whether the tab was edited at all this week.
4. **Blair Brown at 0h for a 4th consecutive week** — needs a direct resolution, not another week of noting it.
5. **PhucVT's Crystal lang hours flattened at ~15.5–16h after 3 weeks of steep decline, still 0h JD** — is this the new steady state, or still winding down further?
6. **#2380 duplicate-row issue** — still not cleaned up after 4+ weeks.

---

*Data sources: `scripts/workstream-fetch-project-week.js 2026-07-27` (all tracked projects, live), `scripts/sheets-summary-employee-fetch.js` (Paturevision, Elena, Marcel Summary tabs, service account), direct W38 tab read (Paturevision, TuanNT daily rows + leave-row scan), direct "Est vs Charged" tab read (Fountain sheet, service account), JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio), Matrix `/messages` (Fountain room, static `mct_` compat token), `config/leave-plan.json`. James Diamond Web charge split (36h/32h, LongVV 4h banked) is a manual billing override supplied directly by the user, applied as instructed rather than independently re-derived from WorkStream.*
