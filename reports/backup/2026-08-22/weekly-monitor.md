# Weekly Monitor — Week of 2026-08-17 → 2026-08-21 (data through Thu 08-20 for most sources; Fri 08-21 unconfirmed)

**Run at:** 2026-08-22 ~00:50 +07 (Saturday)
**Compared to:** W39 (Aug 10–14, report dated 2026-08-15)

---

## 🔴 BLOCKER: Workstream Unavailable This Run (5th occurrence of the same failure pattern)

Live Workstream fetch (`workstream-fetch-project-week.js 2026-08-17`) failed after 3 full attempts (~20 min), all with the identical signature: `SSO redirect detected — Keycloak cookies alive` → `no token captured (SSO redirected but API never fired)`. Killed two accidentally-concurrent login processes mid-run (browser profile lock contention), retried clean twice more — same result both times, final attempt exhausted both API-refresh and browser-login retries (`spawnSync /bin/sh ETIMEDOUT` ×2).

**This is now the 5th dated occurrence of this exact symptom**: 07-26, 07-31, 08-01, 08-15, and today 08-22. Per standing guidance not to keep blind-retrying a repeating failure, I stopped after ~20 min rather than burning a 4th+ full attempt — this needs an interactive VNC re-login (port 5900) to actually diagnose, not another automated retry.

**Mitigation used:** Reconstructed most of the week from this week's own **daily-report** runs (08-18 through 08-21), each of which did its own live Workstream pull (some via recheck) before today's outage. This recovers real Mon/Wed/Thu per-dev numbers and the Fountain week-to-date actuals, but:
- **Tuesday 08-18 is a genuine gap** — that day's daily-report also hit the WS outage and Sheets fallback was structurally empty (team fully migrated off Sheets).
- **Friday 08-21 is unconfirmed** — no daily-report has run for it yet, and today's WS outage blocks fetching it now.
- **James Diamond + Marcel + Blair Brown Matrix report cannot be drafted this week** (needs full-week WS data for JD Web/Mobile + AnhNH2, who has zero visibility all week).

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **Workstream unavailable for this run** — 5th occurrence of identical SSO-capture failure in 4 weeks | Needs interactive VNC re-login; blind automated retry isn't fixing it |
| **TuanNT/LeNH numbers corrected mid-week** — earlier daily-reports (Mon) checked the wrong source (stale Paturevision Sheet / Blair Brown) and showed false 0h; Thursday's recheck against the *correct* projects (Speedventory, James Diamond) found real 8h/8h/8h Mon–Wed for both, then a genuine 0h Thursday | Both got Thu reminders sent already (daily-report, not this run) |
| **LongVV Maddy-specific hours: only 2h confirmed all week** (16h/wk target) | Client (binhnt) already pushed back mid-week on LongVV's low hours; DuongDN personally raised it with LongVV Monday |
| **KhanhHH: Monday leave still `status: pending`**, never formally approved in `leave-plan.json` | Treated as leave in daily-reports all week; flagging the approval gap since it's now 5+ days stale |
| **AnhNH2 (James Diamond Mobile): zero visibility all week** | Not mentioned in any of this week's 4 daily-reports — can't confirm any hours |
| **Fountain "Est vs Charged" tab: Narrow 229.00h / Broad 328.50h — byte-identical to last week (W39)** | Now frozen a **7th consecutive week** (was 6th last week); same 37-item over-estimate list, same top offenders |
| **`feedback_fountain_kunal_checklist.md` still claims Parts 4/5 are "dropped"** — factually wrong, tab is live and readable (confirmed again this run) | Flagged 3 weeks running now — correcting this memory as part of this run |

---

## #1 — Team Hours (Mon 08-17 → Thu 08-20 confirmed; Tue 08-18 gap; Fri 08-21 unconfirmed)

Reconstructed from this week's daily-report runs (08-18, 08-20, 08-21 — each did a live Workstream pull), since today's own fetch failed. Tuesday 08-18's daily-report also hit the WS outage that day, so **Tuesday is a real data gap for LongVV/KhanhHH/PhucVT** (Sheets fallback is structurally empty, not usable as a substitute).

### Summary Table

| Developer | Mon 08-17 | Tue 08-18 | Wed 08-19 | Thu 08-20 | Fri 08-21 | Known total | Target | Status |
|-----------|-----------|-----------|-----------|-----------|-----------|--------------|--------|--------|
| TuanNT | 8h (Speedventory) | 8h¹ | 8h | **0h** ⚠️ | ? | **24h** (Mon–Thu) | 40h | ⚠️ -16h+ through Thu, reminder already sent |
| LeNH | 8h (James Diamond)¹ | 8h¹ | 8h | **0h** ⚠️ | ? | **24h** (Mon–Thu) | 40h | ⚠️ -16h+ through Thu, reminder already sent |
| KhanhHH | 0h (full-day leave, pending approval) | ? | 8h (RDC 7 + Generator 1) | 7.5h (RDC 5.5 + SamGuard 1 + Generator 1) | ? | **15.5h** (Mon/Wed/Thu, Tue unknown) | 40h | ⚠️ well short even allowing for Monday leave |
| LongVV | 3.17h (Maddy 2h + Auction Warehouse 1.17h) | ? | 8h (OhCleo) | 5.5h (Auction Warehouse) | ? | **16.67h** (Mon/Wed/Thu) — Maddy-specific only **2h** | 16h Maddy-specific | ⚠️ Maddy target -14h; combined hours look OK but almost none of it is Maddy |
| PhucVT | 0h | ? | 0h | 10h (OhCleo) | ? | **10h** (Mon/Wed/Thu) | — (adhoc/external, never alerted per standing rule) | note only |
| AnhNH2 | ? | ? | ? | ? | ? | **no data all week** | — (no fixed plan) | ⚠️ zero visibility, not mentioned once in 4 daily-reports |

¹ TuanNT's and LeNH's Mon/Tue numbers come from Thursday's daily-report explicitly citing the week's daily breakdown ("8h/8h/8h Mon-Wed, 0h Thu") when it queried the *correct* Workstream project — Speedventory for TuanNT, James Diamond for LeNH. Monday's own daily-report had checked the *wrong* source for both (stale Paturevision Sheet for TuanNT, Blair Brown instead of James Diamond for LeNH) and wrongly reported 0h/no-leave that day — treat Thursday's corrected figures as authoritative, not Monday's.

**JIRA cross-check:**
- LongVV/Maddy (madhuraka): 2.00h logged ≥08-17 (LIFM2-459, 08-17 only) — consistent with only 2h Maddy-specific hours found in Workstream all week.
- LeNH/BXR (swiftstudio): 0 worklogs ≥08-17 — same long-stale JIRA pattern as every prior week, not a discrepancy (JIRA simply isn't used there).

**Leave:** Only entry on file for this week is KhanhHH's full-day 08-17 ("nghỉ ngơi"), **still `status: pending`** in `leave-plan.json` — never formally approved despite being treated as valid all week. No other leave entries for the 5 core devs.

**Workstream project note:** LongVV logged hours against "Auction Warehouse" this week (Mon 1.17h, Thu 5.5h) — this project doesn't appear in the tracked project-ID table (`reference_workstream`). Worth confirming whether this is a newly assigned client project that needs adding to the tracked list, or a mislabeled existing one.

---

## #2 — Fountain Weekly Check

### Part 1 — Matrix Weekly Plan

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), full transcript read 08-16→08-21 (210 messages).

**Two plan revisions posted this week:**
- Mon 08-17 10:19 by @trinhmtt (posted twice, corrected in place): `ThinhT: 20h | ViTHT: 40h | DatNT: 36h => QC: 24h`
- Thu 08-20 16:14 by @trinhmtt (revision): `ViTHT: 40h | ThinhT: 20h | VuTQ: 4h | DatNT: 36h => QC 25h`

Net change: VuTQ added at 4h (previously not planned), QC bucket +1h. ViTHT/ThinhT/DatNT unchanged.

### Part 2 — Task Log Actuals

Source: WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`), week-to-date through Thu 08-20 (from 08-21 daily-report; today's own fetch failed — see Blocker).

| Dev | Week actual (through Thu) | Week charged |
|-----|---------------------------|--------------|
| ViTHT | 23h | 23h |
| ThinhT | 16h | 16h |
| DatNT | 28h | 25h |
| VuTQ | 0h | — |
| PhatDLT (QC) | 9h | 9h |
| HungPN (QC) | 7h | 7h |
| TrinhMTT (lead) | 14.5h | 0h |

Friday 08-21 hours not yet captured (WS outage today) — final week totals will run higher once Friday is confirmed.

### Part 3 — Plan vs Actual (through Thu, latest plan)

| Dev | Plan | Actual (Mon–Thu) | Δ | Note |
|-----|------|-------------------|---|------|
| ViTHT | 40h | 23h | -17h | On pace (Fri remaining) |
| ThinhT | 20h | 16h | -4h | On pace |
| DatNT | 36h | 28h | -8h | On pace |
| VuTQ | 4h (new this week) | 0h | -4h | No hours logged yet against the new plan line — Matrix shows him active as PR reviewer only, not task-log work |
| QC (PhatDLT+HungPN) | 25h | 16h | -9h | On pace |

### Part 4 — Capacity & Runway

Source: "Est vs Charged" tab (sheetId 920993260), range A13:L118, live read this run. Status col G, Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | vs W39 |
|--------|-------|-----------|--------|
| Narrow (Not Started + In-progress >50% + In-progress <50%) | 28 | **229.00h** | byte-identical |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | byte-identical |

**7th consecutive week the tracked portion is frozen** (was 6th last week, 08-15).

### Part 5 — Over-Estimate Tracking

37 items >20% over est+CR — same count as last week.

| Task | Est+CR | Actual | Over% | Status |
|------|--------|--------|-------|--------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | Deployed on Staging |
| #2639 (Infinity active/inactive) | 2h | 16.5h | +725% | Deployed on Staging |
| #2545 (Build a box service modal) | 1h | 7.5h | +650% | Deployed on Live |
| #2630 | 0.5h | 3.75h | +650% | N/A |
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging — unresolved 7+ weeks |
| #2523 | 16h | 61h | +281% | Deployed on Live |
| #2595 (Giftdrop Redemption) | 120h | 168.25h | +40% | (largest est item, unchanged) |

**Correction applied this run:** `docs/memory/daily-report/fountain/feedback_fountain_kunal_checklist.md` claimed Parts 4/5 were "dropped, tab no longer used" — confirmed wrong again (3rd week flagging this); memory corrected as part of this report (see below).

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: CANNOT DRAFT this week — Workstream unavailable for JD Web/Mobile hours, and AnhNH2 (Mobile) has zero visibility all week even from the daily-report reconstructions.**

Partial numbers available (LeNH only, from the daily-report reconstruction): 8h/8h/8h Mon–Wed, 0h Thu on James Diamond — but PhucVT, AnhNH2, and Friday are all unknown, so a full draft isn't possible without another Workstream pull.

**No backlog carried into this week** — W39 (10/08) was confirmed and sent 2026-08-15 15:57 (event `$5rZzTiD0vwRoqp-cnI-EKexZ5_FmHNyMdbSE5sDPS2k`), W37/W38 explicitly superseded. This week (W41, 17/08) simply can't be computed yet; recommend drafting once Workstream is confirmed reachable, ideally after confirming Friday's hours.

---

## #4 — Unresolved Questions

1. **Workstream 5th outage in 4 weeks** — needs interactive VNC re-login (port 5900) to diagnose properly; automated retries aren't resolving it. Once reachable, re-run this week's fetch to fill Tuesday + Friday gaps and draft the JD/Marcel/Blair Brown report.
2. **AnhNH2 zero visibility all week** — worth a direct check-in; not flagged as an alert since he has no fixed plan, but a full week with no data at all is unusual.
3. **LongVV Maddy-specific hours: only 2h vs 16h/wk target** — client already pushed back mid-week; worth a direct follow-up given the pattern has repeated for several weeks now.
4. **KhanhHH's 08-17 leave still `pending`, never formally approved** — 5+ days stale in `leave-plan.json` despite being treated as approved leave all week.
5. **LongVV logged hours against "Auction Warehouse"** this week — not in the tracked Workstream project table. New client, or existing project under an unfamiliar label?
6. **Fountain Est vs Charged tab frozen 7th consecutive week** — still needs the direct ask to Kunal's team.
7. **VuTQ new 4h plan line, 0h actual through Thursday** — worth confirming whether this is expected (reviewer-only work not logged as task hours) or a real gap.
8. **#2380 (checkout date display)** — unresolved 7+ weeks now.

---

*Data sources: this week's daily-report runs 08-18/08-20/08-21 (each did a live Workstream pull), `workstream-fetch-project-week.js 2026-08-17` (failed 3× this run), Paturevision Sheet W41 (structurally empty — team fully on Workstream now), JIRA `/rest/api/3/search/jql` (madhuraka + swiftstudio), Matrix `/messages` (Fountain room, full transcript 08-16→08-21), Fountain "Est vs Charged" tab (live Sheets API read), `config/leave-plan.json`, `config/.weekly-report-send-flags.json`.*
