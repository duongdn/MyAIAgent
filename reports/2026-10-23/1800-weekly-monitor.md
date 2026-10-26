# Weekly Monitor — Week 2026-10-19 → 10-23

**Run:** 2026-10-23 18:00 (+07) cron · **Compared to:** 2026-10-16 report (+ 21:06 recheck)
**Workstream: LIVE** (all projects via `/review/week`, token refreshed via Keycloak API). Run at Fri 18:00 → some Fri 10-23 logs may still land tonight.

---

## #1 — Team Hours

| Dev | Projects (WS) | Mon | Tue | Wed | Thu | Fri | Total | Status |
|-----|---------------|-----|-----|-----|-----|-----|-------|--------|
| KhanhHH | Radio Data Center 19.5 + Baamboozle 15 + BXR 5.5 | 8 | 8 | 7.5 | 8 | 8.5 | **40h** | ✅ (Wed 7.5h offset by Fri) |
| TuanNT | Speedventory 25 + Andrew Taraba 5 + Neural Contract 4.5 | 9 | sick | 9.5 | 8 | 8 | **34.5h** | ✅ 40 − 1 day sick leave (10-20, approved) = 32h target, exceeded |
| LeNH | James Diamond | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ |
| PhucVT | Meta-Stamp 36 + Definitive Guide 4 | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ (no longer on JD Web; not gated) |
| LongVV | Definitive Guide 23 + OhCleo 13.25 + Maddy 1.5 + Auction Warehouse 1 | 8 | 8 | 8 | 7.75 | 7 | **38.75h** | ℹ️ informational (16h Maddy target n/a, flex) |
| VietPH | — | | | | | | — | Resigned 2026-06-30 |

Leave (leave-plan.json): TuanNT 10-20 full (sick, approved, "Bên Bailey ko bù"). Off reason = sick (non-default, noted). No other PHP-team leave.

**JIRA cross-check:** LongVV/Kai Maddy — WS 1.5h (10-21 LIFM2-471 1h, 10-22 "Check & resolve PHP security" 0.5h untagged) vs JIRA 1h → gap 0.5h ≤ 2h ✅. LIFM2-471 est 1h / actual 1h OK.
**Sheets:** no task-log hours (all on Workstream).

---

## #2 — Fountain (Kunal) 5-Part Check

### 1. Matrix plan ✅
@trinhmtt Mon 10-19 08:57, room `!EWnVDAxbTGsBxPkaaI`: **VuTQ 20h · ThinhT 20h · ViTHT 40h → QC 20h**. No mid-week change.

### 2. Task log actuals ✅ (WS Fountain `cmpqcjojh00q2tk1v2qi7gs0j`)
ViTHT 40 · ThinhT 20 · VuTQ 18 (+8h Speedventory) · QC: PhatDLT 13 + HungPN 18 = 31 · TrinhMTT 8.75 (PM, uncharged). DatNT: no log this week (not in plan).

### 3. Plan vs Actual
| Dev | Plan | Actual | Δ |
|-----|------|--------|---|
| ViTHT | 40h | 40h | ✅ (back-filled Mon–Thu; daily reports showed lag) |
| ThinhT | 20h | 20h | ✅ |
| VuTQ | 20h | 18h | 🟡 −2h (Wed 2h; 10-19 morning off per Resource Arrangement, +6h Wed on Speedventory) |
| QC (PhatDLT+HungPN) | 20h | 31h | 🔴 **+11h over plan** — HungPN 18h (4h/day) + PhatDLT 13h |

### 4. Capacity & Runway (Est vs Charged A13:L, live, method: remaining = max(Est+CR − Actual, 0))
| Bucket | Tasks | Remaining | vs 10-16 |
|--------|-------|-----------|----------|
| Narrow (Not Started + In-progress) | 28 | 229.00h | 219.00h (diff method) — identical to 10-10 |
| Broad (excl. Live/Cancelled) | 63 | 328.50h | 306.00h (diff method) — identical to 10-10 |
| Blank status (untriaged) | 17 | 280.25h | same as 10-10 |

Runway @86h/wk: Narrow ≈ 2.7 wk; Narrow + blank ≈ 6 wk. **Sheet still frozen** (numbers byte-identical to 10-10 under same method) despite V2 launch week.

### 5. Over-estimate tracking
37 items >20% over (same count as 10-10 under same method). Top unchanged, not growing: #2627 +1550% (Has Bug on Live) · #2615 12h→106.75h +790% · #2639 +725% · #2545 +650% · #2630 +650% · #2613 +625% · #2652 +600% · #2501 +538% · #2380 +531% · #2691 +500% · #2523 +281% · #2603 +263% · #2604 +250% · #2702 +219% (In-progress) · #2624 +160% (Dev Done). #2595 not over.

---

## #3 — Weekly Report Finalization (Workstream) — week 2026-10-19

Source: cron log `tmp/weekly-report-cron-logs/finalization-20261023-1800.log` (not re-submitted).

| Project | Status | Reason |
|---------|--------|--------|
| Baamboozle | ✅ submitted (cron) | no active dev in rule window (KhanhHH 15h logged) |
| MissSwimwear | ✅ submitted (cron) | 0 logs |
| Radio Data Center | ✅ submitted (cron) | KhanhHH 5/5 |
| Tokenlite | ✅ submitted (cron) | no active dev |
| BXR App | ✅ finalized by MinhTV 10-23 10:04Z | |
| ETZ - Wathaga | ✅ finalized by KietNVT 10-23 10:24Z | |
| Family App | ✅ finalized by MinhTV 10-23 09:47Z | |
| Fountain Greetings | ✅ finalized by TrinhMTT 10-23 10:57Z | |
| OhCleo | ✅ finalized by MinhTV 10-23 09:59Z | |
| Auction Warehouse | 🔴 | LongVV missing 19, 20, 23 (2/5) |
| Crystal lang | 🔴 | PhucVT 0/5 (moved to Meta-Stamp this week) |
| Definitive Guide | 🔴 | LongVV missing 23 · PhucVT missing 19–22 |
| Neural Contract | 🔴 | TuanNT missing 19–22 (1/5; 20 = sick leave) |
| Portfolio (Andrew Taraba) | 🔴 | TuanNT missing 20 (sick), 21, 22, 23 (1/5) |
| Portfolio - James Diamond | 🔴 | AnhNH2 missing 20 only (LeNH 5/5) |
| Samguard (Elena) | 🔴 | DongNV 0/5 · DuongDN missing 19, 20, 21, 23 · SamHT missing 19, 23 |
| Speedventory (Bailey) | 🔴 | DatNC missing 21–23 · NamNN missing 20, 21 · TrinhMTT missing 22, 23 · TuanNT missing 20 (sick leave, not in WS leaveEntries) · VuTQ missing 19 (½ leave) |
| Xtreme Soft Solutions (Maddy) | 🔴 | LongVV missing 19, 20, 23 (2/5) |
| Generator | ❌ HTTP 403 | "Only the project Manager can finalize" — DuongDN not Manager |
| Meta-Stamp | ❌ HTTP 403 | "Only the project Manager can finalize" — DuongDN not Manager |

Summary: 9 finalized, 9 blocked, 2 API error (11 not finalized). No Pending-review blockers this week.

**Notes:** Most 🔴 are the per-project rule hitting multi-project devs (LongVV, PhucVT, TuanNT all logged ~full weeks elsewhere). TuanNT 10-20 sick leave again not in WS `leaveEntries`. DuongDN on Samguard is DM/reviewer-side, probably shouldn't count as active dev.

---

## #4 — James Diamond + Marcel Matrix Report

Source: WS James Diamond — LeNH 40h (8×5), AnhNH2 20h (8/0/4/4/4, no log 10-20, total matches usual 20h). Marcel: DuongDN 0.17h (10m). Blair Brown closed, omitted.

Draft in `config/.weekly-report-send-flags.json` (`confirmed: false`), **NOT SENT**. Old 12/10 draft moved to `unsent_draft_10_12`.
```
Report week 19/10

James Diamond

Web: 40h/40h
LeNH: 40h/40h

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel
DuongDN: 10m/10m
```

---

## Unresolved
1. Confirm exact JD text above to send to ThuyLTT room. 12/10 and 05/10 drafts also never sent — send or skip?
2. Fountain QC 31h vs 20h plan (+11h) — expected for V2 launch, or flag to TrinhMTT?
3. Generator + Meta-Stamp: DuongDN not Manager on WS → can't finalize. Request role or leave to their managers?
4. Per-project finalization rule blocks 9 projects mostly due to multi-project devs. Rerun `--submit` Sat/Mon, or relax rule?
5. TuanNT sick leave 10-20 missing from WS leaveEntries (blocks Speedventory/Andrew Taraba/Neural).
6. Fountain Est vs Charged frozen ≥3 weeks, 17 untriaged rows — ask PM to update.

---

## Recheck 2026-10-24 07:15 (+07): finalization + JD/Marcel refresh

Live WS dry-run `--week=2026-10-19` (nothing submitted):
- ✅ **Finalized since 18:00 by DuongDN (~20:33):** Auction Warehouse, Definitive Guide, Neural Contract, Portfolio (Andrew Taraba), Portfolio - James Diamond, Speedventory, Xtreme Soft Solutions (Maddy). 16/20 projects are now finalized.
- ⏳ **Generator:** eligible now (0 logs, no active dev). It was a 403 "not Manager" at 18:00 and has not been submitted.
- ⏳ **Meta-Stamp:** eligible now (PhucVT 5/5). It was a 403 at 18:00 and has not been submitted.
- 🔴 **Crystal lang:** PhucVT 0/5 (moved to Meta-Stamp). The per-project rule blocks it.
- 🔴 **Samguard:** DuongDN 1/5 (DM/reviewer role) and SamHT missing 19 and 23. DongNV is now 5/5.

JD/Marcel are unchanged after the lock: LeNH 40/40, AnhNH2 20/20, DuongDN 0.17h. The 19/10 draft is still valid, still `confirmed: false`, and **NOT SENT**.

---

## Recheck 2026-10-26 08:58 (+07): finalization status week 2026-10-19 (dry-run, nothing submitted)
- ✅ **Samguard** now finalized by AnhTTL 10-24 10:12Z.
- ⚠️ **Fountain Greetings + Speedventory: no longer finalized.** Both were ✅ at the 10-24 recheck. They look reopened. Speedventory DatNC went 2/5 → 3/5, so a log landed after the lock. Fountain now fails only on DatNT 0/5 (not in plan, ½ leave 10-23).
- ⏳ Generator + Meta-Stamp are eligible but still unsubmitted. Earlier: 403 "not Manager".
- 🔴 Crystal lang: PhucVT 0/5 (moved to Meta-Stamp).
- JD/Marcel 19/10 draft is still `confirmed: false`, NOT SENT.
- Week 2026-10-26 just started, so there is no data yet.
