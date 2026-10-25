# Weekly Monitor — Week 2026-10-12 → 10-16

**Run:** 2026-10-16 18:00 (+07) cron · **Compared to:** 2026-10-10 report
**Workstream: LIVE** (all projects via `/review/week`). Note: run at Fri 18:00 → several devs haven't logged Fri 10-16 yet; Fri gaps below = "not logged yet", not shortfall.

---

## #1 — Team Hours

| Dev | Projects (WS) | Mon | Tue | Wed | Thu | Fri | Total | Status |
|-----|---------------|-----|-----|-----|-----|-----|-------|--------|
| KhanhHH | Radio Data Center 24.67 + Baamboozle 14.33 + BXR 1 | 8 | 8 | 8 | 8 | 8 | **40h** | ✅ |
| TuanNT | Speedventory 27.83 + Andrew Taraba 4.17 | leave | 8 | 6.5 | 8.5 | 9 | **32h** | ✅ 32h = 40 − 1 day paid leave; Wed 6.5h offset Thu/Fri |
| LeNH | James Diamond | 8 | 8 | 8 | 8 | — | **32h** | ⏳ Fri not logged yet, no leave on record |
| PhucVT | Definitive Guide 17 + Crystal lang 7 | leave | 8 | 8 | 8 | — | **24h** | ⏳ Mon paid leave (sick, approved); Fri not logged yet |
| LongVV | OhCleo 20 + Definitive Guide 14 + Maddy 1.5 | 8 | 6 | 6 | 8 | 7.5 | **35.5h** | ℹ️ informational; Tue/Wed/Fri <8h |
| VietPH | — | | | | | | — | Resigned 2026-06-30 |

Leave (leave-plan.json): PhucVT 10-12 full (approved), TuanNT 10-12 full (approved). Off reason = default paid leave.

**JIRA cross-check:** LongVV/Kai (madhuraka) 0 worklogs vs WS Maddy 1.5h → gap 1.5h ≤ 2h ✅. LeNH not on BXR.
**Sheets:** no task-log hours (all on Workstream).

---

## #2 — Fountain (Kunal) 5-Part Check

### 1. Matrix plan ✅
@trinhmtt 2026-10-12 08:44, room `!EWnVDAxbTGsBxPkaaI`: "DatNT: 8h+ (tùy tình hình task) / ViTHT: 40h / VuTQ: 20h / ThinhT: 12h => QC 20h"

### 2. Task log actuals ✅ (WS Fountain `cmpqcjojh00q2tk1v2qi7gs0j`)
ViTHT 32 · DatNT 20.58 · VuTQ 20 (+4.5h Speedventory) · ThinhT 12 · QC: PhatDLT 12 + HungPN 7.5 = 19.5 · TrinhMTT 11 (PM, uncharged)

### 3. Plan vs Actual
| Dev | Plan | Actual | Δ |
|-----|------|--------|---|
| ViTHT | 40h | 32h | ⏳ Fri not logged yet |
| DatNT | 8h+ | 20h35m | ✅ over min; nothing logged Thu/Fri |
| VuTQ | 20h | 20h | ✅ |
| ThinhT | 12h | 12h | ✅ (Mon off) |
| QC (PhatDLT+HungPN) | 20h | 19h30m | ✅ ~plan |

### 4. Capacity & Runway (Est vs Charged A13:L, live)
| Bucket | Tasks | Remaining | vs 10-10 |
|--------|-------|-----------|----------|
| Narrow (Not Started + In-progress) | 28 | 219.00h | 229.00h before (−10h) |
| Broad (excl. Live/Cancelled) | 63 | 306.00h | 328.50h before (−22.5h) |
| Blank status (untriaged) | 16 | 250.25h | 17 / 280.25h before |

Runway @86h/wk: Narrow ≈ 2.5 wk; Narrow + blank ≈ 5.5 wk. Recomputed ad-hoc (remaining = max(est − actual, 0)), so the comparison with last week is approximate. Over-estimate list is the same as last week, so the sheet still looks mostly frozen. Client target from last week is unchanged: ~200 PRs live on 21 Oct.

### 5. Over-estimate tracking
41 items >20% over (37 last week, probably because of the different method). Top items identical, not growing: #2627 +1550% (Has Bug on Live) · #2615 12h→106.75h +790% · #2639 +725% · #2545 +650% · #2630 +650% · #2613 +625% · #2652 +600% · #2501 +538% · #2380 +531% · #2691 +500% · #2523 +281% · #2603 +263% · #2604 +250% · #2702 +219% (In-progress) · #2624 +160% (Dev Done). #2595 not over.

---

## #3 — Weekly Report Finalization (Workstream) — week 2026-10-12

Source: cron log `tmp/weekly-report-cron-logs/finalization-20261016-1800.log` (not re-submitted). The cron ran at 18:00 Friday, so many "missing 10-16" entries are only same-day lag.

| Project | Status | Reason |
|---------|--------|--------|
| Auction Warehouse | ✅ submitted (cron) | no active dev |
| Baamboozle | ✅ submitted (cron) | no active dev in the rule window (KhanhHH 14.33h logged) |
| MissSwimwear | ✅ submitted (cron) | 0 logs |
| Neural Contract | ✅ submitted (cron) | 0 logs |
| Radio Data Center | ✅ submitted (cron) | KhanhHH 5/5 |
| Tokenlite | ✅ submitted (cron) | no active dev |
| Family App | ✅ finalized by MinhTV 10-16 07:47Z | |
| Generator | ✅ finalized by TuanTT 10-16 07:04Z | |
| BXR App | 🔴 | KhanhHH 1/5 (missing 12,13,14,16) · KhoaTD 0/5 · LuHX 0/5 (leave 12 ½, 14) |
| Crystal lang | 🔴 | PhucVT missing 14, 16 (leave 12) · 3 charged rows Pending review (PhucVT 10-13 ×2, 10-15; reviewer TienND) |
| Definitive Guide | 🔴 | LongVV missing 15, 16 · PhucVT missing 16 · TuanNT 0/5 |
| Fountain Greetings | 🔴 | DatNT missing 15, 16 · ThinhT missing 16 · ViTHT missing 16 |
| OhCleo | 🔴 | LongVV missing 13, 14 · LuHX missing 12, 16 · ThienVN missing 12–15 · 6 rows Pending review (LongVV 10-15, 10-16 ×2; HungPN 10-16 ×2; ThienVN 10-16) |
| Portfolio (Andrew Taraba) | 🔴 | TuanNT missing 12 (leave), 13, 16 |
| Portfolio - James Diamond | 🔴 | LeNH missing 16 only (Fri not logged yet) |
| Samguard (Elena) | 🔴 | KietNHT, SamHT missing 16 · TuanNTG 0/5 |
| Speedventory (Bailey) | 🔴 | DatNC missing 12, 16 · NamNN missing 12–15 · TuanNT missing 12 (full-day leave, see note) · VuTQ missing 12, 13, 16 |
| Xtreme Soft Solutions (Maddy) | 🔴 | LongVV missing 12–15 · LuHX 0/5 (leave 12 ½, 14) |
| ETZ - Wathaga | ❌ HTTP 403 | "Only the project Manager can finalize" — DuongDN not Manager on WS |

Summary: 8 finalized, 10 blocked, 1 API error (11 not finalized).

**Note:** TuanNT 10-12 is approved full-day leave in leave-plan.json, but the script still counts it as a missing day on Speedventory and Andrew Taraba, so the leave isn't recorded in WS `leaveEntries`. Many devs work across several projects, so the per-project "missing day" rule blocks most of them. Example: LongVV on Maddy is "missing" Mon–Thu but logged other projects on those days.

---

## #4 — James Diamond + Marcel Matrix Report

Source: WS James Diamond — LeNH 32h (Mon–Thu, Fri not logged yet), AnhNH2 20h (4×5). Marcel: DuongDN 0.5h. Blair Brown project closed (0 members).

**PROVISIONAL** draft in `config/.weekly-report-send-flags.json` (`confirmed: false`), **NOT SENT**:
```
Report week 12/10

James Diamond

Web: 32h/32h
LeNH: 32h/32h

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel
DuongDN: 30m/30m
```
LeNH has no leave on record. If he logs 8h on Fri, the draft becomes `Web: 40h/40h` / `LeNH: 40h/40h`. Re-fetch before confirming.

---

## Unresolved
1. Re-fetch LeNH's Fri 10-16 hours, then confirm the exact JD text before sending to ThuyLTT.
2. Week 05/10 draft (Web 40h/40h, AnhNH2 20h, DuongDN 1h) was never confirmed. Moved to `unsent_draft_10_05`. Send or skip? Weeks 24/08–28/09 were never sent either.
3. ETZ - Wathaga: DuongDN isn't Manager in WS, so it can't be finalized. Ask for the Manager role, or let LucNT finalize?
4. Finalization rule is per project, and multi-project devs make most projects fail it. Rerun `--submit` on Sat/Mon after Fri logs land?
5. TuanNT's 10-12 approved leave is missing from WS leaveEntries, which blocks Speedventory and Andrew Taraba.
6. Fountain Est vs Charged is still mostly frozen and 16 rows are untriaged. Ask the PM to update it.

---

## Refresh — 2026-10-17 07:15 (+07) manual run

- **JD Matrix draft updated:** LeNH Fri logged, so the totals are now LeNH 40h/40h and AnhNH2 20h/20h (Web 40h/40h). Still `confirmed: false`, **NOT SENT**.
- **Finalization dry-run** (`--week=2026-10-12`, no submit): 9 finalized (+James Diamond, by DuongDN 10-16 14:35Z). Fri logs closed these gaps since 18:00: ViTHT and PhucVT (Definitive Guide). Still 🔴: BXR, Crystal lang (PhucVT missing 10-14, 4 rows Pending), Definitive Guide (LongVV 15–16, TuanNT 0/5), Fountain (DatNT 15–16, ThinhT 16), OhCleo (6 Pending), Andrew Taraba (TuanNT 12 leave, 13, 16), Samguard, Speedventory, Maddy. ETZ - Wathaga is now eligible (0 logs), but DuongDN isn't Manager.
