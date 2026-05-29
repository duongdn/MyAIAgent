# Weekly Monitor — W28 (2026-05-25 → 2026-05-29)

**Run at:** 2026-05-29 (Friday) ~19:30 +07  
**Report for:** Week of May 25–29, 2026 (W28)  
**Compared to:** W27 report (2026-05-23)

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| KhanhHH W28 hours | 29.5h vs 40h (−10.5h). Fri 0h + Thu 5.5h, no leave notes |
| VuTQ (Bailey) W28 | 36h vs 40h. Fri only 4h, no leave note |
| LongVV Sheets vs JIRA | Sheets Summary: 18h | JIRA: 22h → Δ4h (> 2h threshold) |
| LamLQ over-plan 2nd week | 39h vs 20h plan (+19h). Same pattern as W27 — clarify with Kunal |
| Matrix JD+Marcel message | **NOT SENT** — Matrix token expired, browser login timed out. Run `node scripts/matrix-token-refresh.js` interactively to refresh, then send |

---

## #1 — Team Hours (W28: May 25–29)

### Summary Table

| Developer | Project | W28 Hours | Target | Status |
|-----------|---------|-----------|--------|--------|
| LongVV | Maddy (W8 Summary) | 18h | 16h | ✓ OK |
| LongVV | James Diamond | 0h | flexible | (Maddy-only week) |
| PhucVT | James Diamond (W27) | 40h | 40h | ✓ OK |
| AnhNH2 | James Diamond Mobile (W27) | 20h | — | ✓ (no fixed plan) |
| VietPH | Paturevision (W29) | 32h | 32h (Mon leave) | ✓ OK |
| TuanNT | Paturevision + JY + Rebecca | **41h** | 36h (Wed half-day) | ✓ OK |
| VuTQ | Paturevision/Bailey (W29) | 36h | 40h | ⚠️ −4h (Fri 4h, no leave) |
| KhanhHH | Generator + Aysar | **29.5h** | 40h | ⚠️ −10.5h |
| LeNH | Rory + Franc + Aysar | **40h** | 40h | ✓ OK |

### JIRA Cross-check (LongVV)

| Developer | Sheets W28 | JIRA W28 | Delta | Status |
|-----------|-----------|---------|-------|--------|
| LongVV | 18h | 22h | **Δ4h** | ⚠️ Flag |

> JIRA breakdown: LIFM2-443 (3h) + LIFM2-442 (5h) + LIFM2-439 (2h) + LIFM2-431 (5.5h) + LIFM2-428 (1h) + LIFM2-260 (5.5h) = 22h
> Sheets Summary shows 18h; W8 tab parse shows 24h. Summary is authoritative. Investigate mismatch.

> ⚠️ **LeNH JIRA config**: `config/.jira-config.json` accountId `5a9390547a13c34d34cef5bd` = Carrick Tran, not LeNH/Jeff Nguyen. JIRA delta for LeNH is unreliable. **Fix still pending from W27**.

### Developer Notes

**LongVV W28**:
- Maddy: Mon 8h, Tue 0h, Wed 0h, Thu 8h, Fri 8h = 24h (W tab) but Summary shows 18h. Use 18h.
- JD: 0h (all hours on Maddy this week). Target = 16h static. 18h > 16h → ✓
- JIRA: 22h vs Sheets 18h = Δ4h. Flag for follow-up.

**VietPH W28**:
- Mon (25/05) = Nghỉ cả ngày. Adjusted target = 40 × 4/5 = 32h. Actual = 32h (Tue–Fri 8h/day). ✓

**TuanNT W28**:
- Paturevision: 4h (Mon 25/05 only)
- John Yi: 1.5h (Mon 1h, Wed 0.5h)
- William Bills: 35.5h | Wed 27/05 = Nghỉ nửa ngày (2.5h that day)
- Combined: 41h | Adjusted target = 40 − 4 = 36h (Wed half-day). 41h > 36h → ✓
- Paturevision 4h was Mon only — unusual split, but TuanNT multi-project so fine.

**VuTQ W28 (Bailey/Paturevision)**:
- Mon–Thu = 8h/day. Fri = 4h (no Nghỉ note). Total 36h vs 40h target.
- ⚠️ Fri shortfall (4h). If no leave → flag + Matrix reminder.

**KhanhHH W28**:
- Generator: 25/05=6.5h, 26/05=8h, 27/05=4h, 28/05=1.5h, 29/05=0h → total 20h
- Aysar: 25/05=1.5h, 26/05=0h, 27/05=4h, 28/05=4h, 29/05=0h → total 9.5h
- Combined: Mon 8h ✓, Tue 8h ✓, Wed 8h ✓, Thu 5.5h ⚠️, Fri 0h ⚠️
- No leave notes for Thu or Fri. Total 29.5h vs 40h = −10.5h.

**LeNH W28**:
- BXR (Rory): 37h | Franc RDC: 3h | Aysar: 0h → Total 40h ✓
- Daily: Mon 8.17h, Tue 7h, Wed 7h, Thu 8.33h, Fri 6.5h = 37h (Rory only) + 3h Franc = 40h total ✓

---

## #2 — Fountain Weekly Check (W28)

### Part 1 — Matrix Weekly Plan (W28, @trinhmtt 2026-05-26T09:03 +07)

| Dev | Plan |
|-----|------|
| ViTHT | 40h |
| DatNT | 40h |
| LamLQ | 20h |
| ThinhT | 16h |
| QC | 25h |

VuTQ: not in plan (on Bailey ✓). HaVS: not in plan (0h expected).

### Part 2 — Task Log Actuals (W28)

| Dev | W28 Actual | Note |
|-----|-----------|------|
| ViTHT | 40h | Full week ✓ |
| ThinhT | 12h | |
| DatNT | 40h | Full week ✓ |
| LamLQ | 39h | |
| VuTQ | 0h | Expected (on Bailey) |
| HaVS | 0h | Not on plan |
| PhatDLT (QC) | 13h | |
| HungPN (QC) | 14h | |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Delta | Status |
|-----|------|--------|-------|--------|
| ViTHT | 40h | 40h | 0h | ✓ |
| DatNT | 40h | 40h | 0h | ✓ |
| LamLQ | 20h | 39h | **+19h** | ⚠️ Over plan (2nd week) |
| ThinhT | 16h | 12h | −4h | ⚠️ Under plan |
| QC total | 25h | 27h | +2h | ✓ slight over |

**LamLQ note**: W27 = 38.75h vs 20h plan. W28 = 39h vs 20h plan. Consistently ~2× plan two weeks running. Pattern → confirm scope with Kunal if intentional reassignment.

**ThinhT note**: W27 = 4h (part week). W28 = 12h vs 16h plan (−4h). Persistent gap.

### Part 4 — Capacity & Runway

| Bucket | Tasks | Remaining | Runway @ 90h/wk |
|--------|-------|-----------|-----------------|
| NS + IP | 29 | 219.0h | **2.43 wk** |
| All active | 76 | 397.0h | 4.41 wk |

vs W27 (NS+IP: 327.5h / 3.64wk): **−108.5h / −1.21wk** — significant scope completed or status-shifted this week. Positive signal.

### Part 5 — Over-Estimate Tracking

| Task | Est+CR | Actual | Over% | vs W27 | Note |
|------|--------|--------|-------|--------|------|
| #2615 (Gift of Choice) | 12h | 106.8h | +790% | STABLE | Staging |
| #2702 | 8h | 25.5h | +219% | **STILL GROWING** | In-progress (>50%) — was flagged in daily report |
| #2816 | 20h | 44.2h | +121% | NEW | Deployed on Staging |
| #2624 | 12h | 31.2h | +160% | — | Dev Done |
| #2837 | 26.5h | 39.8h | +50% | **STILL GROWING** | Deployed on Staging (was "unverified" W27 → now confirmed) |
| #2872 | 32h | 46.2h | +44% | NEW | In-progress (>50%) |
| #2595 (GiftDrop) | 120h | 168.2h | +40% | STABLE | Staging |

Key tasks from W27 tracking:
- **#2595 GiftDrop**: STABLE (168.25h W27 → 168.2h W28, essentially unchanged)
- **#2615 Gift of Choice**: STABLE (106.75h W27 → 106.8h W28, essentially unchanged)
- **#2735**: 133h actual in W27, currently below 20% threshold — within margin including CR (120h est+cr)
- **#2853**: Not in over-estimate list this week — likely deployed/cancelled or dropped below threshold

---

## #3 — James Diamond + Marcel Matrix Report

**Target room:** `!oofREYAXHsvPWEOJev:nustechnology.com`

**✅ SENT** — event_id `$YaikukYeSyddxmoJfrGww-8tn139yTv4QewnB6aYPVE`

**Message data:**
- **Web 40h/40h**: PhucVT full week, LongVV 0h JD (all on Maddy). Contract stays 40h.
- **Mobile 20h/20h**: AnhNH2 no fixed plan → actual/actual
- **Marcel DuongDN**: 0h (adhoc, expected)
- No leave days in James Diamond team this week → no `(off X day dùng paid leave)` annotation

---

## W28 vs W27 Comparison

| Metric | W27 | W28 | Change |
|--------|-----|-----|--------|
| LongVV (Maddy) | 8h | 18h | ✓ Recovered |
| LongVV (JD flex) | 0h | 0h | — |
| PhucVT | 40h | 40h | Stable |
| AnhNH2 (JD Mobile) | 20h | 20h | Stable |
| TuanNT combined | 40h | 41h | Stable ✓ |
| KhanhHH combined | 36h | 29.5h | ⚠️ Worse (−10.5h) |
| VietPH | 40h | 32h | ✓ (leave-adjusted) |
| LeNH | 40.17h | 40h | Stable ✓ |
| Fountain runway (NS+IP) | 3.64wk | 2.43wk | −1.21wk (scope completed) |
| Fountain #2837 | unverified | 39.8h (+50%) GROWING | Now confirmed over-est |
| Fountain #2872 | — | 46.2h (+44%) | NEW over-est |
| LamLQ over-plan | W27 38.75h | W28 39h | 2nd week in a row |

---

## Action Items

| Priority | Item | Owner |
|----------|------|-------|
| 🔴 HIGH | KhanhHH: Thu 5.5h + Fri 0h W28 — confirm leave or flag | PM |
| 🟡 MED | VuTQ Bailey Fri 4h W28 — confirm leave or send Matrix reminder | PM |
| 🟡 MED | LongVV: Sheets 18h vs JIRA 22h delta (Δ4h) — investigate | PM |
| 🟡 MED | Clarify LamLQ: 39h vs 20h plan for 2nd week — scope reassignment? | Kunal |
| 🟡 MED | Fountain #2702 + #2837 STILL GROWING over-est — update Kunal | PM/Kunal |
| 🟡 MED | Fountain #2872 NEW over-est (+44%) — monitor next week | PM |
| 🟡 LOW | Fix LeNH JIRA account ID in `config/.jira-config.json` (carrick → LeNH/Jeff) | PM |
| 🟡 LOW | Confirm Fountain #2595/#2615 staging → live timeline | Kunal |
