# Weekly Monitor — Week of 2026-09-28 → 2026-10-02 (W46, in progress)

**Run at:** 2026-10-02 ~22:20 +07 (Friday night) — week not fully closed. Workstream fresh login failed twice this run (same "SSO redirected but API never fired" signature as prior weeks, see [[feedback_workstream_display_outage_pattern]]); per standing rule, stopped after 2 attempts. Team-hours/James Diamond numbers below are sourced from this morning's (2026-10-02 08:52) successful live Workstream pull, which covers Mon–Thu (09-28 → 10-01) — Friday's hours are NOT included and may move the totals. Recommend a Saturday re-check before finalizing/sending the Matrix report.

**Compared to:** 2026-09-25 report (W45) — that week's James Diamond+Marcel report was never drafted/sent (data gap too large). Last actually-sent Matrix report remains week 14/09.

---

## #1 — Team Hours (Workstream, live pull 2026-10-02 08:52, covers Mon–Thu)

| Developer | Project(s) | Hours (Mon–Thu) | Target | Status |
|-----------|-----------|------------------|--------|--------|
| LongVV | OhCleo + Maddy + Definitive Guide (combined, multi-project) | 8/8/8/8 = **32h** | No fixed target (ad-hoc, see [[feedback_longvv_consolidated]]) | OK |
| TuanNT | Speedventory (Bailey) | 8/4/8/7.5 = **27.5h** | 40h/wk | 0.5h under on 10-01 (09-29 was a confirmed half-day, dentist, emailed in advance) — not alerted, Friday still to come |
| KhanhHH | Baamboozle/Generator/Elena | leave/leave/leave/0h = **0h** | 40h/wk | ⚠️ Approved leave Mon–Wed (25,28,29,30/09 per email), back 10-01 but still 0h logged at last check (09:36) — Upwork Aysar tracker shows 8h worked 10-01, task log gap. Reminder not sent this run (no `--send-reminder` flag used in today's daily-report pass). |
| LeNH | Portfolio - James Diamond | 8/8/8/8 = **32h** | 40h/wk (James Diamond Web, sole dev) | OK, on track for 40h with Friday |
| PhucVT | Crystal lang / Arthur (not James Diamond anymore) | 8/8/8/— | Not gated (moved off James Diamond 2026-09-18, works Arthur per [[feedback_phucvt_adhoc_external_ignore]]) | Not alerted |
| VietPH | — | — | Resigned 2026-06-30, excluded from all checks |
| AnhNH2 | Portfolio - James Diamond (Mobile) | ~12h (Mon–Wed) + 4h (Thu) = **~16h** | No fixed plan (actual = plan) | Informational |
| ThangN | Portfolio - James Diamond (Mobile) | **0h this week** | No fixed plan | ⚠️ No hours logged Mon–Thu this week — joined 2026-09-17, was active (14h) his first week. Also flagged internally: honght (Matrix, 10-01) said ThangN + 3 others are "working only until 2026-10-09" — needs task-transfer plan, may explain drop-off. |
| DuongDN | Marcel (Tokenlite) | ~1h (thru 09-30) + 1.17h (10-01) = **~2h10m** | Ad-hoc | Informational |

**JIRA cross-check (LongVV/Kai + LeNH/Carrick):** Both instances returned **0 worklogs** for `worklogDate >= 2026-09-28` — consistent with known pattern (LongVV's Maddy track is ad-hoc/informational only since 2026-08-24; LeNH is not logging to BXR this cycle, he's full-time James Diamond). No discrepancy to flag.

**Not independently re-verified this run:** Friday (10-02) hours for everyone — Workstream fresh pull failed, relying on this morning's data only.

---

## #2 — Fountain (Kunal) 5-Part Check

### Part 1 — Matrix Weekly Plan ✅
Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), `@trinhmtt` 2026-09-28 09:02 (+07):
**ViTHT: 40h | ThinhT: 20h | DatNT: 40h => QC: 25h**

### Part 2 — Task Log Actuals ✅ (Workstream, via today's live pull, through Thu)

| Dev | Mon | Tue | Wed | Thu | Week so far |
|-----|-----|-----|-----|-----|-------------|
| ViTHT | 8 | 8 | — | 8 | 24h |
| ThinhT | 4 | 4 | 4 | 4 | 16h |
| DatNT | — | — | — | — | not captured this run, see Part 3 note (32/40h reported this morning) |
| VuTQ | — | 2 | 6 | 3.5 | 11.5h (not on this week's plan, floats per [[project_vutq_moved_to_bailey]]) |
| HungPN (QC) | 3 | — | — | — | 3h |
| PhatDLT (QC) | — | — | — | — | 0h |

### Part 3 — Plan vs Actual (Fri still to come)

| Dev | Plan | Actual (thru Thu) | Match |
|-----|------|--------------------|-------|
| ViTHT | 40h | 24h | Under, 1 day left |
| ThinhT | 20h | 16h | Under, close |
| DatNT | 40h | 32h | Under, 1 day left (per this morning's report) |
| QC (PhatDLT+HungPN) | 25h | 3h | ⚠️ Largely unlogged — this morning's report noted both QC were testing live in the Matrix room on 10-01 but not logging it |

### Part 4 — Capacity & Runway ✅ (Sheets, service-account read, "Est vs Charged" A13:L118, 106 rows fetched live)

| Bucket | Tasks | Remaining | vs last report (09-25) |
|--------|-------|-----------|--------------------------|
| Narrow (Not Started + In-progress, excl. live/cancelled) | 28 | **229.00h** | Byte-identical — **14th consecutive week frozen** |
| Broad (excl. blank/Deployed on Live/Cancelled) | 63 | **328.50h** | Byte-identical to last report |

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
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging — unresolved 13+ weeks |
| #2691 | 1h | 6h | +500% | Deployed on Live |

Frozen for the 14th week straight — same standing over-estimate list, no new movement.

---

## #3 — James Diamond + Marcel Matrix Report

**Status: NOT drafted to send-flags yet.** Friday hours not yet captured (fresh Workstream login failed twice this run) and ThangN showing 0h all week is an open question worth resolving before drafting (vs just omitting silently). Recommend a Saturday morning re-check.

Provisional numbers if nothing changes (Mon–Thu only, Friday will add to all lines):
- Web: LeNH 32h/32h (on track for 40h with Friday)
- Mobile: AnhNH2 ~16h/16h, ThangN 0h/0h (⚠️ needs explanation — see Unresolved Questions)
- Marcel: DuongDN ~2h10m/2h10m

**Not sending.** Per [[feedback_thuyle_report_explicit_send_flag]], will draft exact message text and request explicit confirmation once Friday data is in.

---

## #4 — Unresolved Questions / Blockers

1. **Fresh Workstream login failed twice this run** (2026-10-02 ~22:13 and ~22:20, identical "SSO redirected but API never fired" signature) — relying on this morning's 08:52 live pull (Mon–Thu only). Friday hours entirely missing from this report.
2. **ThangN (James Diamond Mobile) shows 0h this entire week** — was active (14h) his first week (09-17). Matrix note from honght (10-01, internal room) says ThangN is among 4 people "working only until 2026-10-09" — may explain the drop, but not confirmed. Needs direct check before the Matrix report omits/zeroes his line.
3. **KhanhHH 0h on 10-01 despite being back from approved leave**, while Upwork's Aysar tracker shows 8h worked same day — task log gap, not an absence. No reminder sent this run (would need to re-verify Friday status first).
4. **Fountain QC (PhatDLT+HungPN) only 3h logged against 25h plan with 1 day left** — this morning's report noted both were doing live-site testing in the Matrix room on 10-01 without logging it, so likely a logging gap rather than real idle time, but not independently confirmed.
5. JIRA cross-check for LongVV/LeNH both came back 0 worklogs — consistent with known informational-only status, not re-flagging.
