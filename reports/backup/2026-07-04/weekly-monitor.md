# Weekly Monitor — W33 (2026-06-29 → 2026-07-03)

**Run at:** 2026-07-04 10:40 +07
**Report for:** Week of Jun 29 – Jul 3, 2026 (W33)
**Compared to:** W32 (Jun 23–27)

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| PhucVT Fri Jul 3 | 🔴 **0h, unexplained** — separate from the known Jul 2 4h redirect (DuongDN moved him to support LeNH + Python training that day, expected). Fri is a new, unexplained gap. |
| TuanNT Jun 30 (Tue) | 🔴 **0h, still unexplained** — persists after excusing the Jul 1–2 hospitalization. Same gap flagged in daily reports all week, never resolved. |
| KhanhHH Friday | ⚠️ −5h shortfall (only 3h combined across 3 WS projects vs 8h/day Mon–Thu). No leave on file. Elena sheet still 403 — may be hiding hours. |
| Elena sheet (KhanhHH 4th source) | ⚠️ Still 403 — recurring, unresolved permission issue (open since W31+). |
| LeNH JD undercharged | ⚠️ 12h logged vs 7h charged on James Diamond side — 5h uncharged, billing-only issue. |
| Matrix token | ✅ RESOLVED — was dead (`M_UNKNOWN_TOKEN`/`invalid_grant`), user completed device-auth re-authorization at 10:53+07. Note: the device-auth-issued token could read but not send messages (500 on all rooms) — sending required falling back to the browser-session capture in `matrix-send-message.js`, which now has a fresh working token saved to config. |
| Fountain GSheets | 5th consecutive week (W29–W33) at 0h — WorkStream is the only real source now. |
| LongVV JIRA | ✅ Matches GSheets exactly (16h) — the 2-week lag pattern did NOT continue. |
| VietPH | Resigned 2026-06-30 — correctly excluded from this week's monitoring. |

---

## #1 — Team Hours (W33)

### Summary Table

| Developer | Sources | W33 Hours | Target | Status |
|-----------|---------|-----------|--------|--------|
| LongVV | WS: Maddy 16h + JD 2h | **18h** | 16h (Maddy) + JD flex | ✓ OK |
| PhucVT | WS: JD 28h (Jun29:8, Jun30:8, Jul1:8, Jul2:4, Jul3:0) | **28h** | 40h | 🔴 −12h (4h explained Jul2, 8h Jul3 unexplained) |
| AnhNH2 | WS: JD 19h (Jun29:8, Jun30:0, Jul1:4, Jul2:4, Jul3:3) | **19h** | — (no plan) | note only |
| TuanNT | GSheets: Paturevision 15.5h + CharlesChang 0.5h | **16h** | 40h (adj 24h — Jul1/2 hospitalized) | 🔴 −8h vs adj target (Jun30 unexplained) |
| KhanhHH | WS: Baamboozle 12h + Colin/ETZ 3h + Generator 20h (Elena 403, unknown) | **35h** | 40h | ⚠️ −5h (Friday), Elena unknown |
| LeNH | WS: Blair Brown 28.17h + JD 12h logged/7h charged | **40.17h** | 40h | ✓ OK (billing flag: 5h uncharged on JD) |
| Marcel/DuongDN | WS Tokenlite (Marcel) 4h 10m + Paturevision 1h | **5h 10m** | — | ✓ normal (adhoc) |
| Fountain: ViTHT | WS: Fountain | **36h** | 40h | ⚠️ −4h |
| Fountain: ThinhT | WS: Fountain | **20h** | 20h | ✓ OK |
| Fountain: DatNT | WS: Fountain | **24h** (23h charged) | — | ✓ |
| Fountain: VuTQ | WS: Fountain | **12h** | — | ⚠️ low (consistent w/ prior weeks) |
| Fountain: HungPN | WS: Fountain | **13.5h** | — (QC) | ✓ |
| Fountain: PhatDLT | WS: Fountain | **10h** | — (QC) | ✓ |

**JIRA cross-check:**
- LongVV (madhuraka): JQL `worklogAuthor="5b1ed0bcc175e5207bf80b77" AND worklogDate>="2026-06-29"` → **16.0h** (LIFM2-409 11h, LIFM2-446 3h, LIFM2-436 1h, LIFM2-259 1h). **Matches GSheets Maddy 16h exactly** — no gap, unlike the last 2 weeks' lag.
- LeNH (swiftstudio BXR): JQL `project=BXR AND worklogAuthor="5a9390547a13c34d34cef5bd" AND worklogDate>="2026-06-29"` → **0h**. Expected — LeNH fully off Rory/BXR, on Blair Brown only.

### Developer Notes

**PhucVT:** Jun29–Jul1 normal (8h/day). Jul2 4h — known, DuongDN personally redirected him mid-day to support LeNH + Python training. **Jul3 (Fri) 0h — new, no explanation on file.** Needs direct follow-up.

**TuanNT:** Mon (Jun29) + Fri (Jul3) fully worked = 16h. Jul1–2 (Wed/Thu) excused — hospitalized/family emergency (per daily-report caveats). **Jun30 (Tue) 0h still unexplained** despite a full week of flagging — this is now 3+ reports old with no resolution. Recommend direct ask.

**KhanhHH:** Mon–Thu solid across Baamboozle/Colin/Generator; Friday drops to 3h combined vs the ~8h/day pattern the rest of the week. No leave filed. Elena sheet 403 unresolved — cannot confirm if Friday hours are sitting there.

**LeNH:** Blair Brown (primary) 28.17h Mon–Thu, no Friday entry on that project. James Diamond side: 12h logged but only 7h charged — 5h uncharged, flag for invoicing, not an hours problem. Combined 40.17h meets target.

**Baamboozle WS quirk:** `missingReportDays` flagged for all 5 days despite valid hour entries — looks like a separate daily-narrative field KhanhHH isn't filling in, not a real hours gap. Worth a sanity check, not blocking.

---

## #2 — Fountain Weekly Check (W33)

### Part 1 — Matrix Weekly Plan

✅ **RESOLVED** (after user re-authorized the Matrix device — token was dead, fixed 10:53+07). Fountain room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`, fetched since Mon 08:00+07.

@trinhmtt posted **two** plan messages this week (revised mid-week):
- **Tue 2026-06-30 17:06+07** (later than the usual Mon 08:30-09:30 window): "em update plan tuần này ạ — ViTHT: 36h | ThinhT: 20h | DatNT: 24h | VuTQ: 8h"
- **Fri 2026-07-03 12:01+07** (revision): "em update plan tuần này ạ — ViTHT: 36h | ThinhT: 20h | DatNT: 24h | VuTQ: 12h | => QC: 22.5"

Using the Friday revision as the authoritative W33 plan (VuTQ raised 8h→12h, QC total 22.5h added).

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`).

| Dev | W33 Hours |
|-----|-----------|
| ViTHT | 36h |
| ThinhT | 20h |
| DatNT | 24h (23h charged) |
| VuTQ | 12h |
| HungPN | 13.5h |
| PhatDLT | 10h |
| **Total** | **115.5h** |

GSheets `Summary!W33`: still 0h across all columns — **5th consecutive week (W29–W33)** with 0h in Sheets. WorkStream is the sole real source.

### Part 3 — Plan vs Actual

| Dev | Plan (Fri revision) | Actual (WS) | Delta | Status |
|-----|---------------------|-------------|-------|--------|
| ViTHT | 36h | 36h | 0h | ✓ exact match |
| ThinhT | 20h | 20h | 0h | ✓ exact match |
| DatNT | 24h | 24h (23h charged) | 0h | ✓ exact match |
| VuTQ | 12h | 12h | 0h | ✓ exact match |
| QC (HungPN+PhatDLT) | 22.5h | 23.5h (13.5+10) | +1h | ✓ close match |

**Cleanest plan-vs-actual week on record for Fountain** — every dev landed within 1h of plan. Big improvement over W32 (no plan retrievable at all).

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab, Status col confirmed at idx6/col G (correct — not the old idx2 bug).

| Bucket | Tasks | Remaining | Runway @ 60h/wk | Runway @ actual pace (115.5h/wk) |
|--------|-------|-----------|------------------|-----------------------------------|
| Narrow (NS + In-progress) | 28 | **446.0h** | 7.4wk | 3.9wk |
| Broad (excl. Deployed on Live/Cancelled) | 74 | **534.8h** | 8.9wk | 4.6wk |

W32 → W33 delta:
| Metric | W32 | W33 | Change |
|--------|-----|-----|--------|
| Narrow tasks/remaining | undetected (script bug) | 28 / 446.0h | first clean read |
| Broad tasks | 95 | 74 | −21 |
| Broad remaining | 543.0h | 534.8h | −8.2h |

Broad scope shrank slightly this week (−21 tasks, −8.2h) — the +120.2h growth from W32 didn't continue; net small progress.

### Part 5 — Over-Estimate Tracking

37 items >20% over est+CR. Previously-tracked items are **all unchanged from W32** except one:

| Task | Est+CR | Actual | Over% | vs W32 |
|------|--------|--------|-------|--------|
| #2595 (Giftdrop Redemption Flow) | 120h | 168.25h | +40% | **NEW** — first week actual populated (was est-only before) |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | STABLE |
| #2735 (Pro Send Smart Link) | 130h | 136h | +5% | STABLE |
| #2702 (Infinity Accessibility) | 8h | 25.5h | +219% | STABLE |
| #2816 (Infinity Homepage) | 20h | 44.25h | +121% | STABLE |
| #2627, #2639, #2545, #2630, #2613, #2652, #2501, #2380, #2691, #2523, #2624, #2837, #2872 | — | — | unchanged | STABLE |

**Data-quality flag:** #2380 has a **duplicate row** (est 20h and est 4h, same actual 25.25h) in the sheet — needs cleanup, don't double-count.

**Note:** The Est vs Charged tab appears frozen/stale — all previously-tracked numbers identical to W32 except the one newly-populated item. Worth confirming with Kunal's team whether this tab is updated live or on a periodic manual cadence.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: ✅ CORRECTED & SENT.** First send (10:56+07, event_id `$-ZwCAk3KXZWCfnvxnMuaQiawMrZu7CvTKGQ0O6zF7cs`) had wrong Web charge — used the old "always 40h contract" shortcut instead of summing per-dev charges. Correction sent 12:47+07, event_id `$nidVkn-lURcvM_b1h4GqHVgBbNpQ6JLZQNzgEBa7uBk`, after explicit confirmation via `config/.weekly-report-send-flags.json` (per new [[feedback_thuyle_report_explicit_send_flag]] gate). Corrected rule: Web charge = SUM of individual charges, and makeup hours for a prior week's undercharge get charge=0 (see [[feedback_matrix_report_format]]).

Raw data:

| Dev | Project | Charge | Actual | Source |
|-----|---------|--------|--------|--------|
| PhucVT | JD Web | 28h | 28h | WorkStream (Jul3 0h unexplained, not padded to contract) |
| LongVV | JD Web (flex) | 0h | 2h | WorkStream — **makeup for prior week's undercharge, not chargeable** (charge=0, not the worked hours) |
| LeNH | JD Web (extra) | 7h | 12h | WorkStream — logged 12h, only 7h charged (5h uncharged) |
| AnhNH2 | JD Mobile | 19h | 19h | WorkStream, no fixed plan |
| DuongDN | Marcel (Tokenlite) | 4h 10m | 4h 10m | WorkStream — missed on first pass, GSheets showed 0h (Tokenlite project not yet in canonical script; added this run) |
| LeNH | Blair Brown | 28h 10m | 28h 10m | WorkStream |

Web total: charge = 28+0+7 = **35h** (sum of dev charges, NOT the fixed 40h contract; LongVV's 2h is non-chargeable makeup) / actual = 28+2+12 = **42h**.

**Correction (Marcel):** Marcel/DuongDN was wrongly shown as 0h initially — GSheets doesn't capture it, but Workstream has a "Tokenlite" project (Marcel Fuessinger) added 2026-07-02 that wasn't yet in the canonical fetch script. Added `marcel` entry to `scripts/workstream-fetch-project-week.js` and re-queried — real total is 4h 10m (Jun30: 2.5h, Jul1: 1h, Jul2: 0.67h).

Sent correction message (12:47+07):
```
Report week 29/06

James Diamond

Web: 35h/42h
PhucVT: 28h/28h
LongVV: 0h/2h (bù charge thiếu tuần trước, không charge thêm)
LeNH: 7h/12h

Mobile: 19h/19h
AnhNH2: 19h/19h

---

Marcel
DuongDN: 4h 10m

---

Blair Brown - Peptide Clyde
LeNH: 28h 10m

(Correction to the earlier message today — Web total was 40h/42h, correct is 35h/42h)
```

PhucVT's Fri Jul3 0h reported as actual (28h), not padded to contract — not a formal leave case, needs separate follow-up (see Unresolved Questions).

---

## #4 — Unresolved Questions

1. **PhucVT Fri Jul 3, 0h** — new gap, distinct from the known Jul 2 redirect. What happened? (Matrix report already sent using actual 28h, not padded to 40h contract — may need a correction message if this gets explained as leave.)
2. **TuanNT Jun 30 (Tue), 0h** — persists across multiple daily reports this week with no explanation, even after excusing the Jul 1–2 hospitalization. Needs direct follow-up.
3. **KhanhHH Friday −5h** — no leave on file; Elena sheet 403 may be hiding hours. Worth fixing Elena access to close this out.
4. **Fountain Est vs Charged tab** — looks frozen since W32 except one item (#2595). Confirm update cadence with Kunal's team.
5. **#2380 duplicate row** in Fountain Est vs Charged sheet — needs cleanup.
6. **LeNH JD 5h uncharged** — logged but not billed; confirm before next invoice cycle.

---

*Data sources: `scripts/workstream-fetch-project-week.js 2026-07-03` (all projects), Google Sheets Summary tabs via service account, JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio), Fountain "Est vs Charged" tab.*
