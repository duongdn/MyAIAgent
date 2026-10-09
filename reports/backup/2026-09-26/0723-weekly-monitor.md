# Weekly Monitor — Week of 2026-09-21 → 2026-09-25 (W45)

**Run at:** 2026-09-26 ~07:23 +07 (Saturday)
**Compared to:** 2026-09-19 report (covering Sep 14–18, W44) — that report was the 4th consecutive Workstream-blocked week. This is now the **5th consecutive week** the James Diamond/Marcel/Blair Brown Matrix report cannot be drafted, and the 5th consecutive week Team Hours (#1) and Fountain Parts 2/3 are Workstream-blocked.

---

## 🔴 Workstream Status This Run

Killed a stale/orphaned `workstream-login.js --help` process plus its Chrome tree (found running concurrently, unrelated to this run — likely leftover from a prior session) before starting, per the standing "concurrent runs actively cause failures" guidance. Ran 2 clean attempts of `node scripts/workstream-login.js`:

- **Attempt 1:** SSO redirect detected, Keycloak cookies alive, "Sign in with SSO" clicked — but no Bearer token ever captured ("SSO redirected but API never fired"), on both browser sub-attempts.
- **Attempt 2 (after killing the leftover process tree again):** Identical signature — SSO redirect + live cookies, no token captured.

Per standing rule (stop after 2–3 clean attempts), stopped here. Same exact failure signature as the last 5+ reports (09-03, 09-05, 09-12, 09-19, now 09-26) — root cause remains unresolved, needs interactive VNC re-login rather than further automated retries.

**Impact this run:**
- Team Hours (#1): all 11 Google Sheets Summary rows for the current week (Sep 21, 2026) return **0.00h across every dev/project** — same as last 5 runs, confirms these teams have fully migrated logging to Workstream and Sheets are structurally stale post-migration, not a live-data gap. Only JIRA (independent of Workstream) is recoverable.
- **Xtreme Soft (Maddy) and Generator App Sheets again return "no matching week row found"** for Sep 21 — 5th consecutive run.
- Fountain Parts 2/3 (task-log actuals, Plan vs Actual) — **not computable**, Summary row also 0.00h.
- James Diamond + Marcel + Blair Brown Matrix report — **BLOCKED, 5th consecutive week** (24/08, 31/08, 07/09, 14/09, and now 21/09).
- **Fountain Parts 1, 4, 5 fetched live and complete regardless** (Matrix API + Sheets API, both independent of Workstream — see below).

---

## #1 — Team Hours

**Status: Largely BLOCKED this run**, identical pattern to the last 5 reports.

| Developer | Source | Result | Status |
|-----------|--------|--------|--------|
| LongVV/Kai | JIRA (madhuraka, `worklogAuthor=5b1ed0bcc175e5207bf80b77`, `worklogDate 2026-09-21..09-25`) | **2.5h** (LIFM2-467, Thu 09-24) | Informational only — 16h/wk floor retired 2026-08-24; cannot cross-check vs Sheets (Xtreme Soft sheet week-tab not found for this week, 5th run in a row) |
| LeNH/Carrick | JIRA (swiftstudio, `project = BXR`, `worklogDate 2026-09-21..09-25`) | **0 worklogs** | Not an alert — LeNH understood to be on James Diamond/Blair Brown this cycle, not BXR |
| TuanNT, KhanhHH, PhucVT, VietPH, Fountain team (ViTHT/ThinhT/VuTQ/PhatDLT/HungPN), Marcel (DuongDN) | Google Sheets (all 11 projects incl. Marcel) | **0.00h in every current-week cell** | **Not usable** — reflects Workstream migration, not actual hours. Cannot flag <40h/day or leave-row checks this run without Workstream. |

**No <40h/day flags issued this run** — not a clean bill of health, just zero live per-day visibility (Workstream down, Sheets stale).

---

## #2 — Fountain (Kunal) 5-Part Check

### Part 1 — Matrix Weekly Plan ✅ (independent of Workstream — fetched live)

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), fetched back to Monday 2026-09-21 (391 messages).

Two plan messages posted same morning by trinhmtt:
- `09:19` — "em gửi plan tuần này": ViTHT 40h, DatNT 40h, ThinhT 20h => QC 25h
- `11:29` (latest/updated) — "em update plan tuần này": **ViTHT: 40h, DatNT: 32h, ThinhT: 20h, VuTQ: 8h => QC 25h**

Using the latest (11:29) version as this week's plan of record.

### Part 2 — Task Log Actuals — ❌ BLOCKED

Source would be Workstream Fountain (`cmpqcjojh00q2tk1v2qi7gs0j`) per-dev actuals — Workstream failed both clean attempts this run. Fallback Google Sheets Summary!W45 row for this week is 0.00h across the board (reflects the Workstream migration, not real zero hours). No actuals available.

### Part 3 — Plan vs Actual — ❌ BLOCKED (depends on Part 2)

Cannot compute without task-log actuals. Plan is known (Part 1); actuals are not.

### Part 4 — Capacity & Runway ✅ (independent of Workstream — fetched live via service-account Sheets read)

Source: "Est vs Charged" tab, `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, range A13:L118. Est = col I (Raw) + col J (CR), Actual = col K. Remaining = `max(0, Est − Actual)` per task, summed.

| Bucket | Tasks | Remaining | vs last report (09-19) |
|--------|-------|-----------|-------------------------|
| Narrow (Not Started + In-progress) | 28 | **229.00h** | **Byte-identical — 13th consecutive week frozen** |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | **Byte-identical — confirms Broad bucket is also fully frozen now, matching Narrow** |

**Runway:** at the standing 86h/week dev capacity assumption, Narrow (229.00h) implies **~2.7 weeks of remaining scope** — unchanged.

### Part 5 — Over-Estimate Tracking ✅ (same source, independent of Workstream)

**37** items >20% over (est+CR) this run (was 36 last week — one new item entered the list, no items resolved). Top-of-list items are byte-identical in absolute numbers to last week — confirms STILL GROWING / stalled with zero burn-down.

| Task | Est+CR | Actual | Over% | Status | vs last week |
|------|--------|--------|-------|--------|--------------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live | Same as last week |
| #2615 | 12h | 106.75h | +790% | Deployed on Staging | Same as last week |
| #2639 (Infinity active/inactive) | 2h | 16.5h | +725% | Deployed on Staging | Same as last week |
| #2545 (Build a Box service modal) | 1h | 7.5h | +650% | Deployed on Live | Same as last week |
| #2630 | 0.5h | 3.75h | +650% | N/A | Same as last week |
| #2613 | 2h | 14.5h | +625% | Deployed on Live | Same as last week |
| #2652 | 1.5h | 10.5h | +600% | Deployed on Live | Same as last week |
| #2501 | 4h | 25.5h | +538% | Deployed on Staging | Same as last week |
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging | **Unresolved 12+ weeks now** |
| #2691 | 1h | 6h | +500% | Deployed on Live | Same as last week |
| #2523 | 16h | 61h | +281% | Deployed on Live | New to top-11 this run |
| #2603 | 4h | 14.5h | +263% | Deployed on Live | New to top-11 this run |
| #2604 | 1h | 3.5h | +250% | Deployed on Staging | New to top-11 this run |
| #2702 | 8h | 25.5h | +219% | In-progress (>50%) | New to top-11 this run |

**Watched tasks:** #2595 (Giftdrop Redemption) — 120h est/168.25h actual, +40%, Deployed on Staging — unchanged. #2615 — 12h est/106.75h actual, +790%, Deployed on Staging — unchanged (also in top-2 above).

Every listed item is unchanged from last week's absolute numbers — the Fountain Est-vs-Charged sheet is fully frozen (Narrow, Broad, and the over-estimate list all byte-identical or near-identical), consistent with 5+ consecutive weeks of no burn-down activity being reflected in this tracker.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: CANNOT DRAFT this week — Workstream unavailable (both clean attempts failed), and the Google Sheets fallback for James Diamond/Marcel/Blair Brown all show 0.00h for the current week (confirms tracking has moved to Workstream, not real zero hours).**

**This is the 5th consecutive week this report could not be drafted** (24/08, 31/08, 07/09, 14/09, and now 21/09; last actual send was W33/17-08, confirmed and sent 2026-08-22 10:59, event `$rs1IYZJ-RuLzzYJdwHIuVD_Fd39ypBCxvRzI91O-wyk`, per `config/.weekly-report-send-flags.json`). No new draft was written to that file this run — there are no real numbers to draft, and writing a placeholder with fabricated/zero numbers would risk exactly the kind of wrong-send the file's gate mechanism exists to prevent.

**No message text drafted this run — nothing to confirm or send.**

**Recommend to user:** five open weeks (24/08, 31/08, 07/09, 14/09, 21/09) now need a decision — wait for Workstream to be fixed and attempt a bulk backfill of all five, or escalate for an interactive VNC login to pull the missing weeks directly. The backlog is growing weekly.

---

## #4 — Unresolved Questions / Blockers

1. **Workstream outage — identical "SSO redirected but API never fired" signature**, 2 clean attempts this run (after killing a leftover concurrent process tree first). Now 5+ consecutive weekly-report runs affected with the same signature — strongly suggests an auth/session-flow problem, not transient. Needs interactive VNC session to diagnose; continuing automated retries is not converging.
2. **James Diamond/Marcel/Blair Brown Matrix report now 5 weeks backlogged** (24/08, 31/08, 07/09, 14/09, 21/09) — needs an explicit user decision: wait-and-backfill-all vs. interactive-pull-now vs. accept-gap-and-resume-forward.
3. **Fountain Broad bucket is now confirmed frozen for a 2nd consecutive week** (328.50h/63 tasks, byte-identical to 09-19) — same underlying finding as Narrow's 13-week freeze. Recommend checking the `max(0, Est-Actual)` formula into a versioned script (still not done).
4. **Xtreme Soft (Maddy) and Generator App Sheets continue "no matching week row found"** for the current Monday — 5th run in a row, independent of the Workstream blocker, worth checking whether their Summary tabs' week-list has simply not been extended.
5. **Team Hours check (#1) has zero live per-day/leave visibility this week**, 5th consecutive week — cannot confirm or deny any <40h/wk or <8h/day condition for TuanNT, KhanhHH, PhucVT, VietPH, or the Fountain team. This is a full visibility gap, not a clean bill of health.
6. **A stray/leftover `workstream-login.js --help` process with its own Chrome tree** was found running concurrently at the start of this run, unrelated to this session — origin unknown (possibly an interrupted prior cron/manual run). Killed before proceeding; worth checking for a stuck cron job leaving processes behind.

---

## James Diamond + Marcel + Blair Brown Matrix Message — DRAFT STATUS

**NOT DRAFTED.** No usable hours data was recoverable this run for James Diamond (Web/Mobile), Marcel, or Blair Brown from either Workstream (2 clean login attempts failed, identical "SSO redirected but API never fired" signature) or the Google Sheets fallback (all 0.00h — reflects migration to Workstream tracking, not real zero hours).

Per the mandatory no-fabrication rule, no draft message text is produced this run. `config/.weekly-report-send-flags.json` was **not modified** — no new `message_text`, `confirmed` remains as previously set. **Nothing to confirm or send.**

This is the 5th consecutive week (24/08, 31/08, 07/09, 14/09, 21/09) this report is undrafted since the last confirmed send (W33, 17/08, sent 2026-08-22).

---

*Data sources: Google Sheets Summary/Est-vs-Charged tabs (service-account read, `config/daily-agent-490610-7eb7985b33e3.json`) — succeeded for Fountain Parts 4/5, returned stale 0.00h for all current-week task-log cells elsewhere (all 11 sheets + Marcel), "no matching week row found" for Maddy/Generator; Matrix Fountain room transcript (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`, fetched from Monday 2026-09-21, 391 messages) — succeeded for Part 1; JIRA `madhuraka`/`swiftstudio` instances (`config/.jira-config.json`) — succeeded for LongVV/LeNH cross-check; `scripts/workstream-login.js` — failed 2× this run (both identical "SSO redirected but API never fired" signature) after killing a stale/concurrent leftover process tree beforehand; `config/.weekly-report-send-flags.json` — not updated this run (no new draft, nothing to confirm).*
