# Weekly Monitor — Week of 2026-08-24 → 2026-08-28 (data through Wed 08-26 for most sources; Thu 08-27/Fri 08-28 unconfirmed)

**Run at:** 2026-08-29 ~00:35 +07 (Saturday)
**Compared to:** W40 (Aug 17–21, report dated 2026-08-22)

---

## 🔴 BLOCKER: Workstream Unavailable This Run (8th occurrence of the same failure pattern)

Live Workstream fetch (`workstream-fetch-project-week.js 2026-08-24 james_diamond`) and a direct `workstream-login.js` retry both failed after 4 attempts (~15 min total, incl. killing 2 stale/concurrent Chrome processes holding the browser-profile lock), all with the identical signature already logged in `feedback_workstream_display_outage_pattern`: `SSO redirect detected — Keycloak cookies alive` → `no token captured (SSO redirected but API never fired)`. Per standing guidance not to keep blind-retrying an identical failure, stopped after 4 attempts rather than continuing.

**This is now the 8th dated occurrence of this exact symptom**: 07-26, 07-31, 08-01, 08-15, 08-22, and today 08-29 (plus this week's daily-report cron runs on 08-25/08-26/08-27/08-28 also hit it on their first pass). Root cause remains open — worth an interactive VNC re-login rather than another automated attempt.

**Mitigation used:** Reconstructed the week from this week's own **daily-report + interactive recheck** runs (08-25 through 08-28), each of which did a live Workstream pull during its recheck pass. This recovers real Mon–Wed cumulative numbers for most devs, but:
- **Thu 08-27 and Fri 08-28 are unconfirmed** — no recheck captured full-week-through-Friday numbers before this run's own outage.
- **AnhNH2 (James Diamond Mobile) has zero visibility all week** — not mentioned once in any of the 4 daily-reports.
- **James Diamond + Marcel + Blair Brown Matrix report cannot be drafted this week** — missing PhucVT/AnhNH2 Web-Mobile split and Thu/Fri data for LeNH.
- **Fountain "Est vs Charged" tab is a separate Google Sheet (not gated by Workstream login)** — fetched live and successfully this run (see #2 below); only the per-dev task-log actuals (Parts 2/3) are Workstream-gated and thus partial.

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **Workstream unavailable for this run** — 8th occurrence of identical SSO-capture failure | Needs interactive VNC re-login; blind automated retry isn't fixing it |
| **AnhNH2 (James Diamond Mobile): zero visibility all week** | Not mentioned in any of this week's 4 daily-reports — 2nd week running with this gap |
| **LeNH 0h false-alarm caught and retracted mid-week (08-25)** | Cron misread showed 0h; interactive recheck confirmed 8h on James Diamond Monday — corrected same day, no reminder sent on the false alarm |
| **KhanhHH Aysar/Baamboozle "MPDM silence" false alert recurred and was retracted again (08-25)** | Same false alert as before — Baamboozle had 0h/no active task this week (project just started 08-24), so silence is normal, not a gate violation; flagged for a memory fix (see Unresolved #5) |
| **Maddy: real customer QA complaint (chientx, 08-25)**, unrelated to hours — still open as of 08-28's last recheck | Needs an actual review/response, not just hours verification |
| **LongVV Maddy 16h/wk target retired 2026-08-24** — now ad-hoc, no fixed weekly floor | 7.5h logged this week (through Thu) — informational only, not an alert |
| **Fountain "Est vs Charged" tab: Narrow 229.00h / Broad 328.50h — byte-identical to last week (W40) again** | Now frozen a **9th consecutive week** |
| **Ohcleo: Celine's performance/audio-bug complaints still unanswered** as of 08-28 | Carried over from prior week, unrelated to this report's scope but noted since it recurs in the same Matrix rooms used for Fountain/JD context |

---

## #1 — Team Hours (Mon 08-24 → Wed 08-26 confirmed via recheck; Thu 08-27/Fri 08-28 unconfirmed)

Reconstructed from this week's daily-report recheck passes (08-25, 08-26, 08-27, 08-28), since today's own fetch failed outright (no partial data captured this run).

### Summary Table

| Developer | Project(s) | Known total (Mon–Wed) | Thu 08-27 | Fri 08-28 | Target | Status |
|-----------|-----------|------------------------|-----------|-----------|--------|--------|
| TuanNT | speedventory (Bailey) | **24h** (8h/day Mon–Wed, confirmed 08-28 recheck) | ? | ? | 40h/wk | ⚠️ On pace only if Thu/Fri land ~16h combined; can't confirm from here |
| KhanhHH | Generator (Elliott) only visible | **10h** (4h on Wed 08-26) — other KhanhHH projects (Baamboozle, Colin/ETZ, Elena) not captured this run | ? | ? | 40h/wk | Incomplete picture — Generator-only total looks short but KhanhHH splits across ≥3 projects |
| LongVV | Maddy (ad-hoc, target retired 08-24) | **7.5h** (4h on Thu 08-27 per 08-28 recheck — date overlap with table header is from the source report, kept as-is) | — | ? | none (retired) | Informational only, no alert |
| LeNH | James Diamond | **8h confirmed Monday** (corrected from a false 0h cron misread same day); Tue/Wed not independently re-confirmed this run | ? | ? | 40h/wk | Incomplete — only Monday is solid |
| LeNH | Blair Brown | 0h all week | 0h | ? | deprioritized (LeNH = James Diamond full-time, standing rule) | No alert per standing rule |
| PhucVT | Crystal lang (Arthur project, not James Diamond) | **24h/wk logged, "healthy"** per 08-27 recheck | ? | ? | — (adhoc/external, never alerted) | Still not doing James Diamond Web work this cycle — same as prior weeks ("awaiting review") |
| AnhNH2 | James Diamond (Mobile) | **no data all week** | ? | ? | none (no fixed plan) | ⚠️ zero visibility, 2nd consecutive week |
| VietPH | Paturevision | not checked this run (Sheets retired, no WS project ID on file for VietPH specifically) | — | — | 40h/wk | Not verifiable this run |

**JIRA cross-check (LongVV/Maddy, LeNH/BXR):** not run this week — every daily-report cron pass this week hit the same Workstream-dependent blocker before JIRA cross-check could run, and this run's own fetch failed outright.

**Leave:** No new leave-plan entries filed for this week (24–28 Aug) as of this run; three older entries (longvv-2026-08-10, khanhhh-2026-08-17, lenh-2026-07-31) remain `status: pending`, never formally approved, unrelated to this week's period.

---

## #2 — Fountain Weekly Check (5-part, mandatory)

### Part 1 — Matrix Weekly Plan

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), transcripts captured across 08-24–08-27 daily-report runs.

**Latest revision this week** (trinhmtt, 08-26 15:50, superseding the 08-24 09:16 post):
`ViTHT: 40h | ThinhT: 20h | DatNT: 36h | VuTQ: 4h => QC 25h`

(Earlier same-week posts on 08-24 — 10:19 and 16:14 — were both self-corrections before the 08-26 revision; treat 08-26 as current.)

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`), last confirmed via 08-27's daily-report recheck (cumulative through Wed 08-26 EOD). Today's own fetch failed (see Blocker) — Thu/Fri not captured.

| Dev | Week actual (through Wed 08-26) | Note |
|-----|----------------------------------|------|
| ViTHT | 13h | |
| ThinhT | 12h | |
| DatNT | 24h | |
| VuTQ | not separately confirmed this run | new 4h plan line — same gap as last week |
| PhatDLT (QC) | 5.5h (as of Tue 08-25 snapshot; Wed not re-confirmed) | |
| HungPN (QC) | 2.5h (as of Tue 08-25 snapshot; Wed not re-confirmed) | |
| TrinhMTT (lead) | 4.5h (as of Tue 08-25 snapshot) | |

Thu 08-27 and Fri 08-28 hours not captured — final week totals will run higher once confirmed.

### Part 3 — Plan vs Actual (through Wed, latest plan)

| Dev | Plan | Actual (Mon–Wed) | Δ | Note |
|-----|------|-------------------|---|------|
| ViTHT | 40h | 13h | -27h | Behind pace but 2 days remain |
| ThinhT | 20h | 12h | -8h | On pace |
| DatNT | 36h | 24h | -12h | On pace |
| VuTQ | 4h | not confirmed | — | Same visibility gap as prior weeks (reviewer-only work not logged as task hours, per repeat pattern) |
| QC (PhatDLT+HungPN) | 25h | 8h (Tue snapshot) | -17h | Data stale by 1 day, treat as directional only |

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab (Google Sheets, independent of Workstream — fetched live and successfully this run despite the Workstream outage). Range A13:L118, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | vs W40 |
|--------|-------|-----------|--------|
| Narrow (Not Started + In-progress >50% + In-progress <50%) | 28 | **229.00h** | byte-identical |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | byte-identical |

**9th consecutive week the tracked portion is frozen** (was 8th last week, 08-22). The underlying sheet still appears to have stopped receiving new est/actual entries for these buckets.

### Part 5 — Over-Estimate Tracking

36 items >20% over est+CR this run (was 37 last week — one item appears to have dropped off the >20% threshold or been reclassified; not individually re-verified given time-box).

| Task | Est+CR | Actual | Over% | Status |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live |
| #2615 | 12h | 106.75h | +790% | Deployed on Staging — same as last week |
| #2639 (Infinity active/inactive) | 2h | 16.5h | +725% | Deployed on Staging |
| #2545 (Build a box service modal) | 1h | 7.5h | +650% | Deployed on Live |
| #2630 | 0.5h | 3.75h | +650% | N/A |
| #2613 | 2h | 14.5h | +625% | Deployed on Live |
| #2652 | 1.5h | 10.5h | +600% | Deployed on Live |
| #2501 | 4h | 25.5h | +538% | Deployed on Staging |
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging — unresolved 8+ weeks now |
| #2523 | 16h | 61h | +281% | Deployed on Live |
| #2595 (Giftdrop Redemption) | 120h | 168.25h | +40% | (largest est item, unchanged) |

Top-of-list items are identical to last week's — no evidence of active burn-down on the worst offenders.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: CANNOT DRAFT this week — Workstream unavailable for JD Web/Mobile hours, AnhNH2 has zero visibility all week, and Thu/Fri are unconfirmed for LeNH/PhucVT.**

Partial numbers available: LeNH 8h confirmed Monday on James Diamond (corrected from a same-day false 0h cron misread); PhucVT still off James Diamond Web this cycle (24h/wk on Crystal lang instead, per Arthur project tracking); Blair Brown 0h all week (deprioritized per standing rule, no impact). Not enough for a full draft.

**No backlog carried into this week** — W41 (17/08) was confirmed and sent 2026-08-22 10:59 (event `$rs1IYZJ-RuLzzYJdwHIuVD_Fd39ypBCxvRzI91O-wyk`). This week (W42, 24/08) can't be computed yet; recommend drafting once Workstream is confirmed reachable and Thu/Fri hours are in.

---

## #4 — Unresolved Questions

1. **Workstream 8th outage** — needs interactive VNC re-login (port 5900) to diagnose properly; automated retries (4 more this run) aren't resolving it. Once reachable, re-run this week's fetch to fill Thu/Fri gaps and draft the JD/Marcel/Blair Brown report.
2. **AnhNH2 zero visibility, 2nd consecutive week** — worth a direct check-in regardless of the no-fixed-plan status.
3. **KhanhHH's true weekly total is unknown** — only the Generator-project slice (10h) was captured this run; his Baamboozle/Colin-ETZ/Elena hours need a dedicated re-check.
4. **Fountain Est vs Charged tab frozen 9th consecutive week** — still needs a direct ask to Kunal's team about whether this tracking sheet has simply been abandoned in favor of something else.
5. **KhanhHH/Aysar "MPDM silence" false-alert pattern recurred again (08-25)** — same root cause as previously flagged (silence is normal when Baamboozle has 0h/no active task); worth hardening the daily-report gate logic rather than relying on interactive recheck to catch it each time.
6. **Maddy customer QA complaint (chientx, 08-25)** — still open as of the last recheck (08-28); needs an actual management response, not just hours monitoring.
7. **VuTQ's 4h plan line still has no confirmed actual-hours visibility** — 3rd week running with this same gap.
8. **#2380 (checkout date display)** — unresolved 8+ weeks now.
9. **One over-estimate item dropped from 37 to 36 vs last week** — not individually traced this run; worth confirming whether a task was reclassified/closed rather than genuinely improved.

---

*Data sources: this week's daily-report runs 08-25/08-26/08-27/08-28 (each did a live Workstream pull during its interactive recheck pass), `workstream-fetch-project-week.js` + `workstream-login.js` (failed 4× this run, same SSO-capture signature), Fountain "Est vs Charged" Google Sheet (live read via service account, independent of Workstream — succeeded), Matrix Fountain room transcripts (08-24 through 08-27 daily-report captures), `config/leave-plan.json`, `config/.weekly-report-send-flags.json`.*
