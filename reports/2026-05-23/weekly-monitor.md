# Weekly Monitor — W27 (2026-05-18 → 2026-05-22)

**Run at:** 2026-05-23 (Saturday) ~09:15 +07
**Report for:** Week of May 18–22, 2026 (W27)
**Compared to:** W26 report (2026-05-15)

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| LongVV W27 Maddy shortfall | 8h vs 16h target — follow up Monday |

---

## #1 — Team Hours (W27: May 18–22)

### Summary Table

| Developer | Project | W27 Hours | Target | Status |
|-----------|---------|-----------|--------|--------|
| LongVV | Maddy (Xtreme Soft) | 8h | 16h | ⚠️ SHORTFALL −8h |
| LongVV | James Diamond | 0h | flexible | (Maddy-only week) |
| PhucVT | James Diamond | 40h | 40h | ✓ OK |
| AnhNH2 | James Diamond (Mobile) | 20h | — | ✓ (no fixed plan) |
| TuanNT | John Yi (Amazing Meds) | 2h | — | ✓ (part-time) |
| TuanNT | Rebecca (William Bills) | 38h | — | ✓ |
| TuanNT | **Combined** | **40h** | 40h | ✓ OK |
| KhanhHH | Generator | 22h | — | — |
| KhanhHH | Aysar | 14h | — | — |
| KhanhHH | **Combined** | **36h** | 40h | ⚠️ NOTE (−4h, Fri partial) |
| LeNH | Rory (BXR + RDC + Baamboozle) | 40.17h | 40h | ✓ OK |
| VietPH | Paturevision | 40h | 40h | ✓ OK |

### JIRA Cross-check (LongVV)

| Developer | Sheets W27 | JIRA W27 | Delta | Status |
|-----------|-----------|---------|-------|--------|
| LongVV | 8h (Maddy) | 8h | Δ=0 | ✓ MATCH |

> ⚠️ **LeNH JIRA config error**: `config/.jira-config.json` accountId `5a9390547a13c34d34cef5bd` points to **Carrick Tran**, not LeNH/Jeff Nguyen. Correct ID = `70121:a8e215f0-e608-4284-9af3-79297f72549b`. Any LeNH JIRA delta is false — do not treat as real discrepancy. Fix config before next run.

### Developer Notes

**LongVV W27**: Mon 8h, Fri = Nghỉ cả ngày (leave, 0h OK), Tue–Thu = 0h (no leave note in sheets). JIRA confirms 8h total. Maddy target = 16h/week → −8h shortfall. JD flex = 0h this week. Follow up Monday.

**KhanhHH W27**: Gen 22h + Aysar 14h = 36h. Fri = 4h only (no leave note). Supporting dev; Elliott (Generator lead) check governs Trello gate per normal rules. Note-only, no PM block.

**TuanNT W27**: JY task log 2h (Scrin match ✓, no inflation) + Rebecca 38h = 40h combined. ✓

**LeNH W27**: 40.17h across Rory sheet (BXR + RDC + Baamboozle). Franc/Aysar = 0h (no activity this week, normal if Rory covered). ✓

**SoCal / Blake**: DROPPED from monitoring since 2026-05-11. Not checked.

---

## #2 — Fountain Weekly Check (W27)

### Part 1 — Matrix Weekly Plan (W27, @trinhmtt 2026-05-18 11:10 ICT)

| Dev | Plan |
|-----|------|
| ViTHT | 40h |
| ThinhT | 4h |
| DatNT | 40h |
| LamLQ | 20h |
| QC | 22h |

VuTQ: not in plan (on Bailey ✓). HaVS: not in plan (normal). DatNT = new developer appearing in plan this week.

### Part 2 — Task Log Actuals (W27)

| Dev | W27 Actual | Note |
|-----|-----------|------|
| ViTHT | 32h | Thu leave (Nghỉ cả ngày) |
| ThinhT | 4h | |
| DatNT | 40h | New this week |
| LamLQ | 38.75h | |
| VuTQ | 0h | Expected (on Bailey) |
| HaVS | 0h | Not in plan |
| PhatDLT (QC) | 10h | |
| HungPN (QC) | 18h | |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Delta | Status |
|-----|------|--------|-------|--------|
| ViTHT | 40h | 32h | −8h | Thu paid leave |
| ThinhT | 4h | 4h | 0h | ✓ |
| DatNT | 40h | 40h | 0h | ✓ |
| LamLQ | 20h | 38.75h | **+18.75h** | ⚠️ Over plan |
| QC total | 22h | 28h | +6h | ⚠️ Over plan |

**LamLQ note**: W26 = 9.25h/20h (under plan). W27 = 38.75h/20h (+18.75h). Dramatic reversal — intentional scope expansion or task reassignment? Unresolved; confirm with Kunal.

### Part 4 — Capacity & Runway

- Active tasks: 62 | Remaining est (I+J): 1,102h | Actual charged: 1,144.2h
- **Remaining: 327.5h**
- **Runway: 3.64 weeks** @ 90h/wk capacity
- vs W26 (3.41wk / 306.8h): **+0.23wk / +20.7h** — new scope added this week

### Part 5 — Over-Estimate Tracking

| Task | Est+CR | Actual | Over% | vs W26 |
|------|--------|--------|-------|--------|
| #2595 (GiftDrop) | 120h | 168.25h | +40% | STABLE |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | STABLE |
| #2735 | 120h | 133h | +11% | STABLE |
| #2627 | — | — | +1550% | bug on live |
| #2639 | — | — | +725% | staging |

> Note: #2837 and #2853 were **STILL GROWING** in W26. Detailed over-est tab not separately verified this week (daily report data used). Re-check W28.

### Trello Board (Fountain)

- Customer comment: **iris63293413** "Gift drop order — Cannot swap gift" (2026-05-22 13:44 UTC) — unresolved, needs rick/Kunal response
- Cards: To-Do 30 | Bugs 18 | Doing 14 | QC Internal Backlog 9 | QA Backlog 2 | In QA 2 | Not passed 1
- Stuck cards: 59 (most ancient; recent notable: "Doing → Infinity Browse" 05-12, "QC Internal → Update to breakpoints" 04-24)

---

## #3 — James Diamond + Marcel Matrix Report

**Target room:** `!oofREYAXHsvPWEOJev:nustechnology.com`

**Message:**
```
Report week 18/05

James Diamond
Web
PhucVT: 40h/40h
LongVV: 0h/0h

Mobile
AnhNH2: 20h/20h
```

- Web charge = 40h (team contract, always 40h)
- Web actual = PhucVT 40h + LongVV 0h = 40h
- LongVV: 0h JD this week (all 8h Maddy Xtreme); included per W23+ rule
- AnhNH2 Mobile: no fixed plan → actual/actual (20h/20h)

---

## W27 vs W26 Comparison

| Metric | W26 | W27 | Change |
|--------|-----|-----|--------|
| LongVV (Maddy) | 24h | 8h | ⚠️ −16h (shortfall) |
| LongVV (JD flex) | 0h | 0h | — |
| PhucVT | 40h | 40h | Stable |
| AnhNH2 (JD Mobile) | 20h | 20h | Stable |
| TuanNT combined | 40h | 40h | Stable |
| KhanhHH combined | ~40h | 36h | ⚠️ −4h |
| Fountain runway | 3.41wk | 3.64wk | +0.23wk (new scope) |
| Over-est #2837 | STILL GROWING | unverified | Check W28 |
| Over-est #2853 | STILL GROWING | unverified | Check W28 |

---

## Action Items

| Priority | Item | Owner |
|----------|------|-------|
| 🟡 HIGH | LongVV W27: 8h/16h Maddy shortfall — Tue–Thu 0h unexplained — follow up Mon | PM |
| 🟡 MEDIUM | Respond to Fountain Trello iris63293413 "Cannot swap gift" | rick / Kunal |
| 🟡 MEDIUM | Clarify LamLQ: 38.75h vs 20h plan — intentional? | Kunal |
| 🟡 MEDIUM | Confirm #2837 + #2853 over-est status in W28 | PM |
| 🟡 LOW | Fix LeNH JIRA account ID in `config/.jira-config.json` (Carrick → Jeff/LeNH) | PM |
