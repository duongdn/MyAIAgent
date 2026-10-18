# Weekly Monitor — Week 2026-10-05 → 10-09

**Run:** 2026-10-10 07:30 (+07) · **Compared to:** 2026-10-03 report
**Workstream: LIVE this run** (first live weekly pull since 08-22). All 21 projects fetched via `/review/week`.

---

## #1 — Team Hours

| Dev | Projects (WS) | Mon | Tue | Wed | Thu | Fri | Total | Status |
|-----|---------------|-----|-----|-----|-----|-----|-------|--------|
| LeNH | James Diamond | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ |
| PhucVT | Crystal lang 21 + Definitive Guide 19 | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ |
| KhanhHH | Baamboozle 17.5 + Radio Data Center 18.33 + BXR 4.17 | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ |
| TuanNT | Speedventory 18.5 + Definitive Guide 12.5 + Andrew Taraba (Portfolio) 9 | 8 | 8 | 8 | 7.5 | 8.5 | **40h** | ✅ weekly OK; Thu 7.5h marginal, offset Fri |
| LongVV | OhCleo 21.5 + Maddy 6.5 + Definitive Guide 3 | 8 | 3 | 6 | 7 | 7 | **31h** | ℹ️ informational (16h floor retired 08-24); Tue/Wed/Thu/Fri <8h |
| VietPH | — | — | — | — | — | — | — | Resigned 2026-06-30, not tracked |

Fountain team → see #2.

**JIRA cross-check:** LongVV/Kai (madhuraka) 0 worklogs / 0h vs WS Maddy 6.5h → **gap 6.5h > 2h** (Kai logs Maddy in WS, not JIRA — same as prior weeks). LeNH (swiftstudio BXR) 0h — not on BXR, OK.

**Sheets:** no hours in any sheet task log for these devs (all logging moved to Workstream). No leave rows.

---

## #2 — Fountain (Kunal) 5-Part Check

### 1. Matrix plan ✅
@trinhmtt, 2026-10-05 09:49 (+07), room `!EWnVDAxbTGsBxPkaaI`: "ViTHT: 40h / DatNT: 40h / ThinhT: 20h / => QC 25h"

### 2. Task log actuals ✅ (WS Fountain `cmpqcjojh00q2tk1v2qi7gs0j`)
ViTHT 40 · DatNT 40 · ThinhT 20 · VuTQ 18 (+2h Speedventory) · QC: HungPN 25.5 + PhatDLT 13.5 = 39 · TrinhMTT 13.5 (PM, uncharged)

### 3. Plan vs Actual
| Dev | Plan | Actual | Δ |
|-----|------|--------|---|
| ViTHT | 40h | 40h | ✅ |
| DatNT | 40h | 40h | ✅ |
| ThinhT | 20h | 20h | ✅ |
| QC (HungPN+PhatDLT) | 25h | 39h | ⚠️ **+14h** (PhatDLT 13.5h not in plan) |
| VuTQ | — | 18h | not in plan (lead/review) |

Dev total 100h (ViTHT+DatNT+ThinhT) = plan.

### 4. Capacity & Runway ✅ (Est vs Charged A13:L, live)
| Bucket | Tasks | Remaining | vs 10-03 |
|--------|-------|-----------|----------|
| Narrow (Not Started + In-progress) | 28 | 229.00h | unchanged — 15th week frozen |
| Broad (excl. Live/Cancelled) | 63 | 328.50h | unchanged |
| Blank status (untriaged) | 17 | 280.25h | **+1 row** vs 16 last week (~280h) |

Runway @86h/wk: Narrow ≈ 2.7 wk; Narrow+blank ≈ 6.0 wk. Sheet still frozen despite 100h dev burn this week → sheet not being updated; WS is real tracker.

Context (Matrix, @vutq 10-09 11:05): client wants ~200 PRs live 21 Oct (original 28 Oct); team estimates ~70% ready; V2 review not guaranteed.

### 5. Over-estimate tracking ✅
37 items >20% over — same as last week, all top items identical:
#2627 +1550% (Has Bug on Live) · #2615 12h→106.75h +790% · #2639 +725% · #2545 +650% · #2630 +650% · #2613 +625% · #2652 +600% · #2501 +538% · #2380 +531% (unresolved 14+ wks) · #2691 +500% · #2523 +281% · #2603 +263% · #2604 +250% · #2702 +219% (In-progress) · #2624 +160% (Dev Done).
No growth (frozen sheet). #2595 not in over list.

---

## #3 — James Diamond + Marcel Matrix Report

Source: WS James Diamond — LeNH 40h/ch 40h, AnhNH2 20h/ch 20h. ThangN absent 3rd week. TuanNT not on JD this week. Marcel: DuongDN 1h.

Draft (in `config/.weekly-report-send-flags.json`, `confirmed: false`) — **NOT SENT, awaiting explicit confirmation**:
```
Report week 05/10

James Diamond

Web: 40h/40h
LeNH: 40h/40h

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel
DuongDN: 1h/1h
```

---

## Unresolved
1. Confirm exact text above before sending to ThuyLTT.
2. Week 28/09 draft (Web 40h/40h20m, LeNH 37h, TuanNT 3h/3h20m, AnhNH2 20h, DuongDN 2h40m) was never confirmed/sent — send too, or skip? Moved to `unsent_draft_09_28` in flag file.
3. Weeks 24/08–21/09 still never sent.
4. ThangN missing from JD 3 weeks — rolled off? Drop Mobile line permanently?
5. Fountain QC 39h vs 25h plan — PhatDLT added mid-week?
6. Fountain Est vs Charged frozen 15 wks + 17 untriaged rows — ask PM to update.
