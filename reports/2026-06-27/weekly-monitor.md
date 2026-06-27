# Weekly Monitor — W32 (2026-06-23 → 2026-06-27)

**Run at:** 2026-06-27 09:20 +07
**Report for:** Week of Jun 23–27, 2026 (W32) — Mon Jun 23 → Fri Jun 26 (work days)
**Compared to:** W31 (Jun 15–21)

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| PhucVT W32 HOURS | ✅ RESOLVED — **32h** via WorkStream (Mon/Tue/Thu/Fri 8h). Off Wed Jun 24 (paid leave). LongVV covered 8h. GSheets only captured 8h (Mon only). |
| LeNH W32 HOURS | ✅ RESOLVED — **36h 40m** on Blair Brown WorkStream. GSheets 0h because LeNH moved off Rory/Franc to Blair Brown project this week. |
| KhanhHH W32 HOURS | ⚠️ ALERT — Only 4h confirmed via Workstream (Baamboozle 2.5h + Colin 1.5h). Generator shows SamHT (not KhanhHH). Elena sheet 403 error. |
| Elena sheet (KhanhHH) | ⚠️ 403 Permission denied — service account lacks access to Elena sheet `1dH14D_...`. Cannot fetch Elena hours. Needs manual check. |
| CharlesChang sheet (TuanNT) | ⚠️ 404 Not found — sheet ID `1RGBUq6...` appears invalid or deleted. TuanNT CharlesChang hours unavailable. |
| VietPH FINAL WEEK | ✅ Last day was Fri Jun 26. Logged 40h (full final week). |
| Fountain task log (W32) | ⚠️ 4th consecutive week of 0h in GSheets. Team on Workstream since W29. |
| Upwork | 🔴 BLOCKED — Cloudflare challenge. Cannot fetch Rory, Neural, Aysar hours. Run `node scripts/upwork-weekly-hours.js --login` to refresh. |
| Fountain W32 Matrix plan | ⚠️ NOT FOUND — No formal W32 weekly plan message found from @trinhmtt (fetched since Jun 23 08:00 +07). trinhmtt active but posting task-specific items only. |
| ViTHT leave (Fountain) | Thu Jun 26 off (confirmed from Fountain Matrix: "nay Vi off nguyên ngày"). |

---

## #1 — Team Hours (W32)

### Summary Table

| Developer | Sources | W32 Hours | Target | Adj Target | Status |
|-----------|---------|-----------|--------|------------|--------|
| LongVV | Maddy GSheets W12 | **16h** | 16h | 16h | ✓ OK |
| PhucVT | JD WorkStream | **32h** | 40h | 32h (Wed off) | ✓ OK |
| AnhNH2 | JD WorkStream | **20h** | — | — | ✓ (no plan) |
| VietPH | PAT GSheets W33 | **40h** | 40h | 40h | ✓ OK — FINAL WEEK |
| TuanNT | PAT W33 (38.6h) + others 0h | **38.6h** | 40h | 40h | ⚠️ −1.4h (possible rounding / CC unavailable) |
| KhanhHH | Baamboozle WS 2.5h + Colin WS 1.5h | **4h+** | 40h | 40h | ⚠️ ALERT — data gaps |
| LeNH | Blair Brown WorkStream | **36h 40m** | 40h | 40h | ✓ OK (on Blair Brown project) |
| Marcel | Marcel GSheets W15 | **0h** | — | — | ✓ adhoc |
| DuongDN | PAT 1h + Blair Brown WS 0h | **1h** | — | — | ✓ (Colin/ETZ handoff week) |

### Sheet Tab Reference (W32)

| Sheet | W32 tab | Notes |
|-------|---------|-------|
| Maddy (Xtreme Soft) | W12 | LongVV 16h ✓ |
| JohnYi/Amazing Meds | W29 | TuanNT 0h |
| Rebecca (William Bills) | W30 | TuanNT 0h, LeNH Q-T 0h |
| JamesDiamond | W31 | PhucVT 8h, AnhNH2 4h |
| Rory (BXR) | W17 | LeNH 0h (MinhTV 0.25h found, not LeNH) |
| Franc (RDC) | W30 | LeNH 0h |
| Aysar (Baamboozle) | W30 | 0h (using WS only) |
| Generator (Elliott) | W46 | SamHT 10h — KhanhHH NOT found |
| Paturevision | W33 | VietPH 40h, TuanNT 38.6h |
| Elena | **null (403)** | KhanhHH hours UNKNOWN |
| Marcel | W15 | 0h |
| Neural | W26 | TuanNT 0h |
| Fountain | W32 | All devs 0h (Workstream) |
| CharlesChang | **null (404)** | TuanNT hours UNKNOWN |

### Developer Notes

**LongVV W32:**
- Maddy GSheets W12: **16h** (target 16h) ✓
- JD GSheets W31: 0h — Maddy-only week
- Workstream Maddy: 8h (Jun 25 only: 1 day logged) — discrepancy vs GSheets 16h. GSheets authoritative.
- JIRA madhuraka: 0h (no JIRA worklogs found for W32 in madhuraka)
- Note: JIRA mismatch vs GSheets (+16h GSheets, 0h JIRA). Monitor: team may not be logging to madhuraka JIRA regularly.
- **Status: 16h = target MET ✓**

**PhucVT W32:**
- JD GSheets W31: **8h**
- JD owners full breakdown: `{PhucVT: 8.0, AnhNH2: 4.0}`
- No leave detected from task log scan
- W31 was 40h, so 8h is an 80% drop — very unusual
- Possible explanations: (a) hours logged late (unlikely — VietPH shows 40h same week), (b) unrecorded leave, (c) data issue in JD W31 tab scan
- **Status: ⚠️ ALERT — 8h vs 40h target. Needs verification.**

**AnhNH2 W32:**
- JD GSheets W31: **4h**
- No fixed plan — charge=actual
- W31 was 20h. Sharp drop (same as PhucVT drop — possibly related to same JD sheet issue)
- **Status: 4h — no target, noting as data point**

**VietPH W32:**
- PAT GSheets W33: **40h**
- No leave detected
- **FINAL WEEK**: Last day was Friday Jun 26, 2026
- Full 40h for final week ✓
- Task transfers confirmed (from W31): JohnYi/Amazing Meds + Marcel Fussinger → DuongDN
- **Status: 40h = target MET ✓ FINAL WEEK**

**TuanNT W32:**
- Paturevision (W33): **38.6h**
- JohnYi (W29): 0h
- Rebecca (W30): 0h
- Neural (W26): 0h
- CharlesChang: 0h (**404 sheet not found** — data gap)
- Total confirmed: **38.6h**
- W31 had CharlesChang contributing 25.92h. If CharlesChang hours exist this week but are inaccessible, real total could be higher.
- No leave detected from Paturevision tab
- Gap to target: −1.4h. With CharlesChang unavailable, cannot confirm if on target.
- **Status: ⚠️ 38.6h confirmed (+CC unknown). Likely OK if CC sheet accessible.**

**KhanhHH W32:**
- Generator (W46): SamHT 10h found — KhanhHH NOT found → GSheets shows 0h for KhanhHH in Generator
- Elena: **403 permission error** — hours unknown
- Aysar GSheets (W30): 0h
- Baamboozle Workstream: **2.5h** (Mon Jun 22: 2.5h)
- Colin/ETZ Workstream: **1.5h** (Wed Jun 24: 1.5h)
- Confirmed total: **4h** (WS only)
- W31 was 40h (Gen 20h + Elena 5.5h + Baamboozle 11.83h + Colin 2.67h)
- Massive drop from W31. Either: (a) Elena/Generator hours exist but inaccessible, (b) KhanhHH not on Generator this week, (c) significant unlogged hours
- Baamboozle WS missing report for Jun 22 flagged (`missingReportDays: ["2026-06-22"]`)
- **Status: ⚠️ ALERT — 4h confirmed vs 40h target. Needs manual verification of Elena and Generator hours.**

**LeNH W32:**
- Rory GSheets (W17): MinhTV 0.25h only — LeNH NOT found (0h)
- Franc GSheets (W30): 0h (no owners found)
- Rebecca Q-T cols: 0h
- JIRA swiftstudio BXR: 0h
- Total: **0h**
- W31 was 32h (with Wed leave). This week: complete absence.
- No leave found in GSheets. No JIRA activity.
- **Status: 🔴 CRITICAL — 0h vs 40h target. No explanation found. Needs urgent verification.**

**Marcel W32:**
- Marcel GSheets W15: **0h** (adhoc, expected) ✓

**DuongDN W32:**
- Paturevision (W33): **1h**
- Blair Brown Workstream: **0h** (no hours this week)
- Total: **1h**
- W31 was 9h (Blair Brown 8h + PAT 1h). Blair Brown work completed or paused.
- Colin/ETZ context: DuongDN mentioned in Colin/ETZ Workstream room (Matrix Jun 26: "Task upgrade SQL và các xử lý liên quan anh Dương đã làm") — suggests DuongDN may have Colin/ETZ work not captured in Workstream manager view.
- **Status: 1h — noting for reference (adhoc scope)**

---

## #2 — Fountain Weekly Check (W32)

### Part 1 — Matrix Weekly Plan

**Source: Fountain Matrix room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`, fetched since Jun 23 08:00 +07**

⚠️ **W32 PLAN NOT FOUND** — No formal weekly plan message from @trinhmtt detected in W32 fetch (147 messages, Jun 23–Jun 26). trinhmtt was active (08:38 Monday) but posting task-specific items, not a weekly capacity plan.

Notable activity context from Matrix:
- ViTHT off **Thu Jun 26** (full day — confirmed: @thinht "nay Vi off nguyên ngày hã", @trinhmtt "dạ")
- PRs merged to Live this week: #431, #440 (#2911 cocktail kit page), #468
- Active Fountain devs observed: trinhmtt, vitht, hungpn, thinht, vutq, datnt
- New ticket assigned: #2956 (browse summer shipping banner, est 2h, ThinhT)
- Card #2913 (custom printed gift item) under active discussion

| Dev | W32 Plan | Confirmed Active in Matrix |
|-----|----------|--------------------------|
| ThinhT | Not in plan msg | ✓ (PRs, tickets assigned) |
| ViTHT | Not in plan msg | ✓ Mon-Wed + Fri (off Thu) |
| VuTQ | Not in plan msg | ✓ (PR reviews) |
| DatNT | Not in plan msg | ✓ (bug discussion) |
| HungPN | Not in plan msg | ✓ (QA testing) |
| PhatDLT | Not in plan msg | Not observed |

**Capacity assumption W32:** Cannot confirm from plan. Using W31 capacity (60h/wk) as baseline — ThinhT 20h + ViTHT 40h. ViTHT off 1 day → adjusted: 40−8=32h. W32 capacity = ~52h.

### Part 2 — Task Log Actuals (W32)

**⚠️ UNAVAILABLE (4th consecutive week)** — Fountain team on Workstream since W29. GSheets tab W32 shows 0h for all devs.

| Dev | W32 GSheets | Notes |
|-----|-------------|-------|
| ViTHT | 0h | Off Thu Jun 26 (Matrix confirmed) |
| ThinhT | 0h | Active in Matrix |
| VuTQ | 0h | Active in Matrix |
| DatNT | 0h | Active in Matrix |
| HaVS | 0h | Not observed in Matrix this week |
| LamLQ | 0h | Not in scope (left team) |
| PhatDLT | 0h | Not observed |
| HungPN | 0h | Active in Matrix (QA) |

Last filled week = W28 (May 25–31). 4 consecutive weeks (W29–W32) with 0h GSheets.

### Part 3 — Plan vs Actual

**CANNOT COMPUTE** — No GSheets data (Workstream) + no formal plan message found.

### Part 4 — Capacity & Runway

| Bucket | Tasks | Remaining | Runway @ 100h/wk | Runway @ 60h/wk |
|--------|-------|-----------|------------------|-----------------|
| NS+IP narrow | 0 | **0h** | 0wk | 0wk |
| All active (broad) | **95** | **543.0h** | **5.43wk** | **9.05wk** |

**Note on narrow=0:** The fountain scan script filters narrow by status labels `"Not Started"` or `"In-progress"`. W32 scan found 0 tasks matching these exact labels — this is likely a **status detection issue** (statuses may be stored as Trello URLs in some rows), NOT a real change. Broad count (95 tasks, 543h) is more reliable.

W31 → W32 delta:
| Metric | W31 | W32 | Change |
|--------|-----|-----|--------|
| Active narrow tasks | 28 | 0 | ⚠️ status detection issue |
| NS+IP remaining | 255.5h | 0h | ⚠️ detection issue |
| Active broad tasks | 71 | **95** | +24 new tasks |
| Broad remaining | 422.8h | **543.0h** | **+120.2h** ↑ |
| Broad runway (@ 60h/wk) | 7.05wk | 9.05wk | ↑ more scope added |

⚠️ Broad remaining increased +120.2h week-over-week. Significant new scope added (24 more active tasks) despite ongoing development work. Review with Kunal.

### Part 5 — Over-Estimate Tracking

**Actively tracked from W31:**

| Task | Status in scan | Est | CR | Total Est | Actual | Over% | vs W31 |
|------|---------------|-----|----|---------:|-------:|------:|--------|
| #2702 (Infinity Accessibility) | In-progress | 8h | 0h | 8h | 25.5h | +219% | STABLE (same as W31) |
| #2816 (Infinity Update Homepage) | In-progress | 20h | 0h | 20h | 44.25h | +121% | STABLE (same as W31) |
| #2735 (Pro Send Smart Link) | — (in key_tasks) | 90h | 40h | 130h | 136h | +5% (4.6%) | STABLE (was +5% W31) |

No growth observed in any of the three tracked tasks. Actuals unchanged from W31 (consistent with 0h in GSheets and Workstream not reflecting these task IDs).

**Other over-estimate items observed (>100% over, from Est vs Charged tab):**

| Task | Est+CR | Actual | Over% | Status |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | Deployed on Staging |
| #2639 | 2h | 16.5h | +725% | — |
| #2545 (Build-a-Box) | 1h | 7.5h | +650% | — |
| #2630 | 0.5h | 3.75h | +650% | — |
| #2613 | 2h | 14.5h | +625% | — |
| #2652 | 1.5h | 10.5h | +600% | — |
| #2501 (Product Catalog) | 4h | 25.5h | +538% | — |
| #2380 (Checkout Date Display) | 4h | 25.25h | +531% | Deployed on Staging |
| #2691 | 1h | 6h | +500% | — |
| #2523 | 16h | 61h | +281% | — |
| #2624 (Order Complete Update) | 12h | 31.25h | +160% | — |
| #2837 (Custom Roses Page) | 16h+10.5h=26.5h | 39.75h | +50% | — |
| #2872 (Infinity Browse) | 32h | 46.25h | +44% | — |

Key tasks status (W32):
| Task | Total Est | Actual | Charged | Notes |
|------|-----------|--------|---------|-------|
| #2615 | 12h | 106.75h | 30.5h | Gift of Choice (major over-run) |
| #2640 | 12h | 16.75h | 16h | — |
| #2695 (New Redemption Flow) | 20h | 26h | 26h | fully charged |
| #2702 (Accessibility) | 8h | 25.5h | 12h | under-charged by 13.5h |
| #2716 (Dead Pages) | 2h | 4.5h | 0h | over-run, uncharged |
| #2735 (Pro Smart Link) | 130h | 136h | 1.5h | massively under-charged |
| #2742 (Gift of Choice payment) | 12h | 20.25h | 1h | uncharged |
| #2816 (Homepage) | 20h | 44.25h | 14h | under-charged by 30.25h |
| #2837 (Custom Roses) | 26.5h | 39.75h | 4h | under-charged |
| #2872 (Infinity Browse) | 32h | 46.25h | 33h | reasonably charged |

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: NOT YET SENT — awaiting confirmation**

### Data for this week (corrected — source: WorkStream):

| Dev | Project | Charge | Actual | Source | Notes |
|-----|---------|--------|--------|--------|-------|
| PhucVT | JD Web | 32h | 32h | WorkStream | Off Wed Jun 24 |
| LongVV | JD Web | 8h | 8h | WorkStream | Wed only (cover PhucVT) |
| AnhNH2 | JD Mobile | 20h | 20h | WorkStream | Mon–Fri 4h/day |
| DuongDN | Marcel | 0h | 0h | GSheets | adhoc |
| LeNH | Blair Brown | 36h 40m | 36h 40m | WorkStream | Mon–Fri |

**Why GSheets showed wrong numbers:** JD and Blair Brown teams migrated to WorkStream logging. GSheets only captured partial hours (PhucVT 8h Mon in GSheets, rest in WorkStream; LeNH hours entirely in WorkStream Blair Brown project).

Web total: charge=40h (contract), actual=32h (PhucVT) + 8h (LongVV) = 40h
Mobile total: charge=20h, actual=20h (AnhNH2)
Note: PhucVT off 1 day Wed Jun 24 — LongVV covered with 8h JD.

**Prepared message (NOT YET SENT — awaiting send confirmation):**

```
Report week 23/06

James Diamond

Web: 40h/40h (off 1 day dùng paid leave)
PhucVT: 32h/32h (off 1 day dùng paid leave)
LongVV: 8h/8h

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel
DuongDN: 0h

---

Blair Brown - Peptide Clyde
LeNH: 36h 40m
```

---

## #4 — JIRA Cross-check

### LongVV (madhuraka — Maddy project)

| Result | Detail |
|--------|--------|
| Query | `worklogAuthor = "5b1ed0bcc175e5207bf80b77" AND worklogDate >= "2026-06-23"` |
| JIRA total | **0h** |
| GSheets total | **16h** |
| Δ | 16h gap |

JIRA shows 0h vs GSheets 16h. This is a new discrepancy (W31 matched exactly: JIRA=16h = GSheets=16h). Could mean: (a) LongVV has not submitted JIRA logs this week yet, (b) JIRA is being deprioritized. Not blocking — GSheets is primary source.

### LeNH (swiftstudio BXR)

| Result | Detail |
|--------|--------|
| Query | `project = BXR AND worklogAuthor = "5a9390547a13c34d34cef5bd" AND worklogDate >= "2026-06-23"` |
| JIRA total | **0h** |
| GSheets total | **0h** |

Both sources confirm 0h. Consistent with critical alert above.

---

## #5 — Upwork Status

**🔴 BLOCKED — Cloudflare challenge not resolved.**

All three workrooms (Rory, Neural Contract, Aysar) returned `cloudflare_blocked` error. Run `node scripts/upwork-weekly-hours.js --login` to refresh Upwork session before next report.

Cannot cross-check:
- Rory Upwork hours vs LeNH GSheets
- Neural Contract hours
- Aysar hours vs KhanhHH

---

## W32 vs W31 Comparison

| Metric | W31 | W32 | Change |
|--------|-----|-----|--------|
| LongVV (Maddy) | 16h ✓ | 16h ✓ | Stable |
| LongVV JIRA Δ | 0h (exact match) | 16h gap | ⚠️ New gap |
| PhucVT (JD) | 40h ✓ | **8h** ⚠️ | −32h |
| AnhNH2 (JD) | 20h | **4h** | −16h |
| VietPH (PAT) | 32h (Mon leave) ✓ | **40h ✓ FINAL** | +8h |
| TuanNT | 36h (adj) ✓ | **38.6h** (CC unavail) | ~On target |
| KhanhHH | 40h ✓ | **4h+** ⚠️ | −36h (data gaps) |
| LeNH | 32h (Wed leave) ✓ | **0h** 🔴 | −32h CRITICAL |
| Marcel | 0h ✓ | 0h ✓ | Stable |
| DuongDN | 9h (BB 8h + PAT 1h) | **1h** (PAT only) | BB work complete |
| Fountain broad remaining | 422.8h | **543h** | +120.2h new scope |
| Fountain broad tasks | 71 | **95** | +24 tasks |
| Over-est #2702 | +219% | +219% | Stable |
| Over-est #2816 | +121% | +121% | Stable |
| Over-est #2735 | +5% | +4.6% | Stable |

---

## Action Items

| Priority | Item | Owner |
|----------|------|-------|
| 🔴 URGENT | **LeNH 0h W32** — Verify: was LeNH on leave? Hours not logged? Illness? JIRA also 0h. | PM today |
| 🔴 URGENT | **PhucVT 8h W32** — Verify reason for 8h vs 40h target (unrecorded leave? task log delay?). Compare with AnhNH2 drop (20h→4h). | PM today |
| 🔴 URGENT | **KhanhHH hours verification** — Manually check: (a) Did KhanhHH log Generator hours this week? (b) What are Elena hours? Fix Elena sheet 403 (grant service account access). | PM + Tech |
| 🔴 URGENT | **VietPH offboarding** — Final day was Jun 26. Confirm: (a) JohnYi/Amazing Meds handoff to DuongDN done? (b) Marcel Fussinger handoff done? (c) Paturevision handoff? | PM |
| 🟡 MED | **Upwork blocked** — Refresh Cloudflare session for Rory, Neural, Aysar workrooms. | PM |
| 🟡 MED | **JD+Marcel Matrix message** — HOLD: verify PhucVT hours before sending. Target: today/tomorrow. | PM |
| 🟡 MED | **CharlesChang sheet 404** — Sheet ID `1RGBUq6iJP0VGlGDAX_9B4lMJFpNAY3e2J0MOXJ_Lyeo` not found. Update sheet ID in weekly-sheets-scan script if new sheet exists. | Tech |
| 🟡 MED | **Elena sheet 403** — Service account needs read access to Elena sheet `1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ`. | Tech |
| 🟡 MED | **Fountain W32 plan missing** — Follow up with @trinhmtt: was a W32 plan posted elsewhere? Should plan be posted to Matrix Fountain room regularly? | PM |
| 🟡 MED | **Fountain scope +120.2h** — Broad remaining went from 422.8h → 543h (+120.2h). 24 new tasks added. Review new scope with Kunal. | PM/Kunal |
| 🟡 LOW | **Fountain task log** — 4th consecutive week (W29–W32) with 0h in GSheets. Confirm if Workstream is permanent, or if GSheets should resume. | PM/Kunal |
| 🟡 LOW | **Fountain #2735 (Pro Smart Link)** — actual 136h vs total_est 130h (+4.6%), charged only 1.5h. Need to update charged hours or revisit CR. | PM |

---

## Unresolved Questions

1. **LeNH**: 0h with no leave record — what happened this week? Last week was 32h (adj OK with leave).
2. **PhucVT**: 8h vs 40h — unrecorded leave, or data lag? AnhNH2 also dropped 20h→4h simultaneously (same JD sheet).
3. **KhanhHH Generator**: SamHT appears in Generator W46 (not KhanhHH). Is SamHT a new team member? Did KhanhHH stop working on Generator?
4. **Fountain W32 plan**: Why was no formal plan posted? Is capacity still 60h (ThinhT 20 + ViTHT 40) or has it changed?
5. **TuanNT JohnYi**: Still shows 0h week after week (W29→W32). Confirm JohnYi de-allocated.
6. **DuongDN Blair Brown**: 0h this week (vs 8h W31). Task complete? Or transition to Colin/ETZ?
7. **LongVV JIRA**: W31 matched exactly, W32 shows 0h JIRA. Are JIRA logs delayed or stopped?
8. **Fountain #2702**: actual 25.5h vs charged 12h — 13.5h uncharged. When will this be invoiced?
9. **ViTHT leave Thu Jun 26**: Was this a planned or unplanned day off? How does it affect W32 capacity?

---

*Raw data source files: `reports/2026-06-27/sheets-raw.json` (not written separately — data included above). Workstream: `scripts/workstream-fetch-project-week.js` run 2026-06-27. Fountain: `/tmp/fountain-scan-w32.py` output. Matrix: `reports/2026-06-27/matrix-rooms-0919.md`.*
