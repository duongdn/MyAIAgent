## Fountain — 08:45 (+07:00)

### Part 1 — Matrix Plan (W29)

**Sender:** @trinhmtt:nustechnology.com  
**Posted:** 2026-06-01 14:01 +07:00  
**Message:**
```
Em gửi plan tuần này ạ
ViTHT: 16h
VuTQ 40h
DatNT: 40H
-> QC: 25h
```

**Notes:**
- ThinhT NOT in W29 plan
- HaVS NOT in W29 plan — do not flag 0h for HaVS this week
- VuTQ included at 40h despite Bailey move (still in Fountain plan)

---

### Part 2 — Task Log Actuals (W29: Jun 1–7)

W29 sheet has no logged entries yet. Summary sheet row confirms 0h across all devs.

| Dev | W29 Actual | W28 Actual (ref) |
|-----|-----------|-----------------|
| ViTHT | 0h | 40h |
| VuTQ | 0h | 0h |
| DatNT | 0h | (not in summary cols) |
| ThinhT | 0h | 16h |
| PhatDLT | 0h | 13h |
| HungPN | 0h | 16h |
| TrinhMTT | 0h | 0h |
| HaVS | 0h | (not in plan — no alert) |

> Week is Thu Jun 4; task log is filled end-of-day/end-of-week. 0h mid-week is expected. No alerts.

---

### Part 3 — Plan vs Actual (W29)

| Dev | Plan (h) | Actual (h) | Delta | Note |
|-----|---------|-----------|-------|------|
| ViTHT | 16 | 0 | -16 | Week in progress (Thu) — expected |
| VuTQ | 40 | 0 | -40 | Week in progress (Thu) — expected |
| DatNT | 40 | 0 | -40 | Week in progress (Thu) — expected |
| QC (PhatDLT+HungPN) | 25 | 0 | -25 | Week in progress (Thu) — expected |
| ThinhT | not planned | 0 | — | Not in W29 plan |

> All zeros are expected at this point in the week. No shortfall alerts at Thursday mid-week.

---

### Part 4 — Capacity & Runway

- **Remaining estimate (Not Started + In-progress tasks):** 651h (Col I: 601h + Col J CR: 50h)
- **Dev capacity:** 90h/week
- **Runway:** 651 / 90 = **7.23 weeks** (~7 weeks 2 days)
- **Delta vs yesterday:** Previous report showed 0h due to column mapping bug (status cells contained URLs). Today's run correctly reads status text. Effective delta: N/A (first valid reading).

**Active task breakdown:**
- Not Started: 11 tasks — 243h est (incl. #2775: 60h, #2854: 80h, #1178: 40h, #2524: 24h)
- In-progress: 18 tasks — 408h est (incl. #2735: 120h, #2870: 80h, #2869: 40h, #2912: 40h, #2872: 32h)

---

### Part 5 — Over-Estimate Tracking

Key tasks (always monitored):

| Task | Est (I+J) | Actual | Over% | Status | Growing? |
|------|----------|--------|-------|--------|---------|
| #2595 (giftdrop redemption) | 120h | 168.25h | +40.2% | Deployed on Staging | Same as yesterday — NOT growing |
| #2615 | 12h | 106.75h | +789.6% | Deployed on Staging | Same as yesterday — NOT growing |
| #2735 (send-smart-link) | 120h | 136h | +13.3% | In-progress (>50%) | Within 20% threshold; actively worked |

Other active tasks already over 20% threshold:

| Task | Est | Actual | Over% | Status |
|------|-----|--------|-------|--------|
| #2702 | 8h | 25.5h | +219% | In-progress (>50%) |
| #2872 | 32h | 46.25h | +45% | In-progress (>50%) |
| #2695 | 20h | 26h | +30% | In-progress (<50%) |
| #2640 | 12h | 16.75h | +40% | In-progress (<50%) |
| #2854 | 80h | 81.5h | +1.9% | Not Started (approaching cap) |
| #2742 | 12h | 20.25h | +69% | Not Started (status may need update) |
| #2716 | 2h | 4.5h | +125% | Not Started (status may need update) |
| #2783 | 1h | 2h | +100% | Not Started (status may need update) |

> #2702 at +219% over estimate is a new concern — was 25.5h actual on an 8h est task, still In-progress.
> #2742, #2716, #2783 marked "Not Started" but have actual hours — status may be stale.

---

### Alerts

- **NONE** — No person-status alerts (0h expected mid-week Thursday)
- **NOTE:** #2702 over +200% estimate while In-progress — flag for PM review
- **NOTE:** Several "Not Started" tasks already have actuals — status labels may be stale

---

### Trello gate
- Fountain: **CLEAN** (no blocking alerts; over-estimates are ongoing tracking items, not new escalations)
