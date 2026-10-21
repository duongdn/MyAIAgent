# Weekly Monitor — Week of 2026-10-05 → 2026-10-09 (W47)

**Run at:** 2026-10-09 ~21:55 +07 (Friday night, week closed through today). Workstream token was warm (no fresh login needed) — all project data live-pulled this run, full Mon–Fri coverage for every dev.

**Compared to:** 2026-10-02 report (W46) — that week's James Diamond+Marcel report was never drafted/sent (Friday data was missing at the time). Last actually-sent Matrix report remains week 14/09.

---

## #1 — Team Hours (Workstream, live pull 2026-10-09 ~21:55, full Mon–Fri)

| Developer | Project(s) | Hours (Mon–Fri) | Target | Status |
|-----------|-----------|------------------|--------|--------|
| LongVV | Maddy 6.5 + OhCleo 21.5 + Definitive Guide 3 = **31h** | No fixed target (ad-hoc, see [[feedback_longvv_consolidated]]) | OK |
| TuanNT | James Diamond 2 + Speedventory 18.5 + Definitive Guide 12.5 + Andrew Taraba 7 = **40h** | 40h/wk | OK, hits target exactly |
| KhanhHH | Baamboozle 17.5 + Radio Data Center 18.33 + BXR 4.17 = **40h** | 40h/wk | OK, hits target exactly |
| LeNH | Portfolio - James Diamond = **40h** | 40h/wk (James Diamond Web, sole core dev) | OK |
| PhucVT | Crystal lang/Arthur 19 + Definitive Guide 13 = **32h** | Not gated (moved off James Diamond, works Arthur per [[feedback_phucvt_adhoc_external_ignore]]) | Not alerted |
| VietPH | — | Resigned 2026-06-30, excluded from all checks |
| AnhNH2 | Portfolio - James Diamond (Mobile) = **20h** | No fixed plan (actual = plan) | Informational |
| ThangN | **Absent from James Diamond member list entirely** (4th consecutive week — also gone 09-21, 09-28, 10-02) | No fixed plan | ⚠️ See Unresolved Questions |
| DuongDN | Marcel 1h + Speedventory 1h = **2h** | Ad-hoc | Informational |

**JIRA cross-check (LongVV/Kai + LeNH/Carrick):** Both instances returned **0 worklogs** for `worklogDate >= 2026-10-05` — consistent with known informational-only status (LongVV's Maddy track ad-hoc; LeNH full-time James Diamond, not logging to BXR). No discrepancy.

**Review queue (dev + reviewer + status):**
- James Diamond — reviewers: PhucVT, LeNH. No pending review items.
- Radio Data Center — reviewer: LeNH. No pending review items.
- Crystal lang — reviewer: TienND (override). **PhucVT has 4 Pending review rows (10-05 to 10-08, 19h charged)** — awaiting TienND's review.
- OhCleo — reviewers: DuongDN, MinhTV. **LongVV has 3 Pending review rows (10-08/10-09, 6.5h charged)** — awaiting review.
- Fountain — reviewers: VuTQ, DuongDN. No pending review items.
- Maddy, Baamboozle, Marcel, Speedventory, BXR, Definitive Guide, Andrew Taraba — no reviewer configured (`need_review=false`).

---

## #2 — Fountain (Kunal) 5-Part Check

### Part 1 — Matrix Weekly Plan ✅
Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), `@trinhmtt` 2026-10-05 09:49 (+07):
**ViTHT: 40h | DatNT: 40h | ThinhT: 20h => QC: 25h**

### Part 2 — Task Log Actuals ✅ (Workstream, live pull, full Mon–Fri)

| Dev | Mon | Tue | Wed | Thu | Fri | Week total |
|-----|-----|-----|-----|-----|-----|------------|
| ViTHT | 8 | 8 | 8 | 8 | 8 | **40h** |
| DatNT | 8 | 8 | 8 | 8 | 8 | **40h** |
| ThinhT | 4 | 4 | 4 | 4 | 4 | **20h** |
| VuTQ | 2 | 4 | 4 | 4 | 4 | 18h (not on this week's plan, floats per [[project_vutq_moved_to_bailey]]) |
| PhatDLT (QC) | 3 | 3 | 2 | 2.5 | 3 | 13.5h |
| HungPN (QC) | 6 | 5 | 5 | 5 | 4.5 | 25.5h |
| TrinhMTT (PM) | 3.25 | 2.25 | 2 | 3 | 3 | 13.5h |

### Part 3 — Plan vs Actual ✅ (week closed)

| Dev | Plan | Actual | Match |
|-----|------|--------|-------|
| ViTHT | 40h | 40h | ✅ Exact match |
| DatNT | 40h | 40h | ✅ Exact match |
| ThinhT | 20h | 20h | ✅ Exact match |
| QC (PhatDLT+HungPN) | 25h | 39h | Over plan (more testing logged than planned — not a shortfall) |

Best plan-vs-actual match in recent weeks — all 3 dev lines hit exactly.

### Part 4 — Capacity & Runway ✅ (Sheets, service-account read, "Est vs Charged" A13:L118, 106 rows fetched live)

| Bucket | Tasks | Remaining | vs last report (10-02) |
|--------|-------|-----------|--------------------------|
| Narrow (Not Started + In-progress, excl. live/N/A) | 28 | **229.00h** | Byte-identical — **15th consecutive week frozen** |
| Broad (excl. blank/Deployed on Live) | 63 | **328.50h** | Byte-identical to last report |

Runway at 86h/week dev capacity: Narrow 229h ≈ **2.66 weeks remaining**, unchanged.

### Part 5 — Over-Estimate Tracking ✅ (same source, live)
37 items >20% over (est+CR) — same count as last report, list unchanged:

| Task | Est+CR | Actual | Over% | Status |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live |
| #2615 | 12h | 106.75h | +790% | Deployed on Staging |
| #2639 (Infinity active/inactive) | 2h | 16.5h | +725% | Deployed on Staging |
| #2545 (Box service modal) | 1h | 7.5h | +650% | Deployed on Live |
| #2630 | 0.5h | 3.75h | +650% | N/A |
| #2613 | 2h | 14.5h | +625% | Deployed on Live |
| #2652 | 1.5h | 10.5h | +600% | Deployed on Live |
| #2501 | 4h | 25.5h | +538% | Deployed on Staging |
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging — unresolved 14+ weeks |
| #2691 | 1h | 6h | +500% | Deployed on Live |

Frozen for the 15th week straight — same standing over-estimate list, no new movement in either direction.

---

## #3 — James Diamond + Marcel Matrix Report

**Week fully closed (Mon–Fri all captured) — drafted and ready to send pending explicit confirmation.**

Computed numbers (Workstream's own `charged` field is authoritative post-migration — no manual 40h-cap/banking recomputation; TuanNT's 2h is a real charged James Diamond task, not banked):

```
Report week 05/10

James Diamond

Web: 42h/42h
LeNH: 40h/40h
TuanNT: 2h/2h

Mobile: 20h/20h
AnhNH2: 20h/20h

---

Marcel
DuongDN: 1h/1h
```

Notes:
- ThangN line omitted — absent from the James Diamond Workstream roster entirely for the 4th consecutive week (see Unresolved Questions).
- Blair Brown section omitted — discontinued per 2026-09-12 confirmed message, no WS members returned this week either, consistent.
- No leave this week for LeNH/AnhNH2/TuanNT — no `(off X day dùng paid leave)` annotations needed.

**Draft written to `config/.weekly-report-send-flags.json` with `confirmed: false`. Not sending until the user explicitly confirms this exact text.**

---

## #4 — Unresolved Questions / Blockers

1. **ThangN (James Diamond Mobile) absent from the Workstream member list entirely for the 4th consecutive week** (09-21, 09-28, 10-02, and now 10-05 weeks) — was active (14h) only his first week (09-17). This has been flagged 3 times already without new information; recommend asking the user directly whether he's been rolled off the project so future reports can stop carrying/checking his line, rather than re-flagging weekly.
2. **PhucVT has 4 pending review items on Crystal lang (19h charged, 10-05 to 10-08)** awaiting TienND's review — informational, not gated, but aging.
3. **LongVV has 3 pending review items on OhCleo (6.5h charged, 10-08/10-09)** awaiting DuongDN/MinhTV review — informational.
4. JIRA cross-check for LongVV/LeNH both came back 0 worklogs — consistent with known informational-only status, not re-flagging.
