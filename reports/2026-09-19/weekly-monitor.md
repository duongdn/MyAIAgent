# Weekly Monitor — Week of 2026-09-14 → 2026-09-18 (W44)

**Run at:** 2026-09-19 ~00:16 +07 (Saturday)
**Compared to:** 2026-09-12 report (covering Sep 7–11, W43) — that report was also Workstream-blocked. This is now the **4th consecutive week** the James Diamond/Marcel/Blair Brown Matrix report cannot be drafted.

---

## 🔴 BLOCKER: Workstream Unavailable This Run (outage pattern continues)

A Sep-17-dated orphaned Chrome process tree (13 procs, `about:blank`, idle since Sep 17) WAS found holding `tmp/workstream-browser-profile` and was killed before the first attempt. Ran 2 clean attempts of `node scripts/workstream-login.js` (110s timeout each), re-checking/killing Chrome processes between attempts:

- **Attempt 1:** Hung to full timeout with zero output/signature (the "no partial log" hang variant, same as 09-03/09-05/09-12).
- **Attempt 2:** Same zero-output full-timeout hang after a clean process kill — no SSO-redirect log line captured this time either.

Per standing rule (stop after 2–3 clean attempts, don't blind-retry), stopped here. Both attempts hit the same hang signature — consistent with the last 3 reports; root cause remains unresolved and needs interactive VNC re-login rather than further automated attempts.

**Impact this run:**
- All Google Sheets task-log Summary rows for the current week (W44, Sep 14 row) return **0.00h across every Workstream-migrated project** (James Diamond, Paturevision, John Yi, William Bills, BXR App, Radio Data Center, Baamboozle, Marcel, Fountain, Elena) — consistent with the established finding that these teams have fully migrated logging to Workstream and Sheets are structurally stale post-migration (not a live-data gap). Xtreme Soft (Maddy) and Generator App again errored with "no matching week row found" (4th run in a row).
- **Team Hours check (#1) cannot be computed from Sheets this week.** Only the JIRA cross-check (independent of Workstream) was recoverable.
- **Fountain Parts 2/3 (task-log actuals, Plan vs Actual) cannot be computed** — Summary!W-row for this week is also all 0.00h.
- **James Diamond + Marcel + Blair Brown Matrix report: BLOCKED — 4th consecutive week** (24/08, 31/08, 07/09, 14/09 all now undrafted/unsent since the last actual send, W33/17-08, confirmed and sent 2026-08-22).
- **Fountain Parts 1, 4, 5 ARE independent of Workstream and were fetched live successfully** — see below.

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **Workstream unavailable — zero-output full-timeout hang on both attempts** | Needs interactive VNC re-login; automated retries not converging (4th consecutive weekly-report run affected) |
| **James Diamond + Marcel + Blair Brown Matrix report BLOCKED 4 weeks running** (24/08, 31/08, 07/09, 14/09) | Backlog now spans 4 weeks — recommend escalating to user for interactive pull or explicit backfill decision |
| **All Google Sheets task logs show 0.00h for current week across every migrated project** | Confirms full migration to Workstream tracking; not a live-data gap |
| **Fountain Est vs Charged Narrow bucket: 229.00h / 28 tasks — byte-identical to last 3 reports** | **12th consecutive week frozen** |
| **Fountain "Broad" bucket this run: 63 tasks / 328.50h, computed with a corrected floor(0) formula** | **Resolves the previously-flagged "3 different numbers in 3 weeks" drift** — see methodology note below; this figure exactly matches the number reported 3 weeks ago (2026-08-29 run), suggesting the earlier "drift" was a measurement-formula inconsistency, not real scope movement. Broad bucket also appears frozen, mirroring Narrow. |
| **Fountain weekly plan (Matrix) — same steady-state pattern as last 2 weeks** — ViTHT 40h, ThinhT 20h, DatNT 40h ⇒ QC 25h | Consistent with 09-07 and prior weeks' post; no change |
| **LongVV/Kai JIRA (Maddy) — 1h logged through query time (1× 1h on LIFM2-465, 2026-09-14)** | Informational only; 16h/wk floor retired 2026-08-24 |
| **LeNH/Carrick JIRA (BXR, swiftstudio) — 0 worklogs found this week** | Consistent with LeNH being full-time on James Diamond/Blair Brown this cycle, not BXR — not itself an alert |

### Methodology note: Fountain "remaining hours" formula corrected this run

Previous reports computed Broad-bucket remaining hours inconsistently and flagged it as "unreliable, 3 different totals in 3 weeks." This run traced the exact formula that reproduces the byte-identical, independently-confirmed Narrow figure (229.00h / 28 tasks):

```
remaining_hours(task) = max(0, (Est_col_I + CR_col_J) − Actual_col_K)
sum over tasks where status matches bucket filter
```

Applying `max(0, ...)` per task (floor at zero — a task that's run over its estimate contributes 0 remaining, not a negative offset) is what reproduces 229.00h for Narrow exactly. Applying the same formula to Broad (all statuses excl. "Deployed on Live"/"Cancelled") gives **63 tasks / 328.50h** — which matches the number from the 2026-08-29 report exactly, strongly suggesting that number was the correct one all along and the two subsequent reports (608.75h, 544.75h) used a different/buggy ad-hoc script. Recommend hard-coding this formula into a checked-in script per the standing unresolved-question #3 from the last 2 reports.

---

## #1 — Team Hours

**Status: Largely BLOCKED this run**, same pattern as the prior 3 reports. Every Google Sheets task log returned 0.00h for the current week, and Workstream itself failed both clean login attempts. The only independently-verifiable data points this run are the JIRA cross-checks.

| Developer | Source | Result | Status |
|-----------|--------|--------|--------|
| LongVV/Kai | JIRA (madhuraka, `worklogAuthor=5b1ed0bcc175e5207bf80b77`, `worklogDate >= 2026-09-14`) | **1h** (LIFM2-465, Mon 09-14) | Informational only — 16h/wk floor retired 2026-08-24; cannot cross-check vs Sheets (Xtreme Soft sheet week-tab not found for this week) |
| LeNH/Carrick | JIRA (swiftstudio, `project = BXR`, `worklogDate >= 2026-09-14`) | **0 worklogs** | Not an alert — LeNH understood to be on James Diamond/Blair Brown this cycle, not BXR |
| TuanNT, KhanhHH, PhucVT, VietPH, Fountain team (ViTHT/ThinhT/VuTQ/PhatDLT/HungPN) | Google Sheets (all 11 projects) | **0.00h in every current-week cell** | **Not usable** — reflects Workstream migration, not actual hours. Cannot flag <40h/day or leave-row checks this run without Workstream. |

**No <40h/day flags issued this run** — not because hours are confirmed fine, but because no live per-day breakdown was reachable (would require Workstream `/review/week`, which is down).

---

## #2 — Fountain (Kunal) 5-Part Check

### Part 1 — Matrix Weekly Plan ✅ (independent of Workstream — fetched live)

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), paginated ~280 messages back to cover the full week.

**Latest plan for this week** (trinhmtt, 2026-09-14 01:57:38 UTC, edited version of a 01:57:30 UTC post the same minute):
`ViTHT: 40h | ThinhT: 20h | DatNT: 40h => QC 25h`

Same shape as the 09-07 plan — steady-state pattern continuing, no anomaly this week.

### Part 2 — Task Log Actuals — ❌ BLOCKED

Source would be Workstream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`) per-dev actuals — Workstream login failed both attempts this run. Fallback Google Sheets Summary!W-row for this week is all 0.00h across every dev (ViTHT, ThinhT, VuTQ, DatNT, PhatDLT, HungPN, TriNM, HaVS, ThienVN, DuongDN, LamLQ, VietPH, NhoNH, ThoTNT, TinPC, DongNV, TamHVH) — reflects the Workstream migration, not real zero hours. No actuals available this run.

### Part 3 — Plan vs Actual — ❌ BLOCKED (depends on Part 2)

Cannot compute without task-log actuals. Plan is known (Part 1); actuals are not.

### Part 4 — Capacity & Runway ✅ (independent of Workstream — fetched live via service-account Sheets read)

Source: "Est vs Charged" tab, `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, range A13:L118. Est = col I (Raw) + col J (CR), Actual = col K. Remaining = `max(0, Est − Actual)` per task, summed (see methodology note above).

| Bucket | Tasks | Remaining | vs last report (09-12) |
|--------|-------|-----------|-------------------------|
| Narrow (Not Started + In-progress) | 28 | **229.00h** | **Byte-identical — 12th consecutive week frozen** |
| Broad (excl. Deployed on Live/Cancelled) | 63 | **328.50h** | Last report showed 76 tasks/544.75h (unverified); with the corrected floor(0) formula this run's 63/328.50h exactly matches the 2026-08-29 report's figure — treat as the reconciled, correct number going forward |

**Runway:** at the standing 86h/week dev capacity assumption, the Narrow bucket (229.00h) implies **~2.7 weeks of remaining scope** — unchanged from last week given the frozen total.

**Narrow bucket confirmed frozen a 12th consecutive week** — same underlying finding as the last 3 reports; the tracked portion of this sheet appears to have stopped receiving new est/actual entries.

### Part 5 — Over-Estimate Tracking ✅ (same source, independent of Workstream)

36 items >20% over (est+CR) this run (was 37 last week — close, within the noise of the same task set). Top-of-list items are unchanged from last week, confirming these are stalled with zero burn-down activity:

| Task | Est+CR | Actual | Over% | Status | vs last week |
|------|--------|--------|-------|--------|--------------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live | STILL GROWING (same numbers as last week, unresolved) |
| #2615 | 12h | 106.75h | +790% | Deployed on Staging | STILL GROWING (same numbers as last week) |
| #2639 (Infinity active/inactive) | 2h | 16.5h | +725% | Deployed on Staging | Same as last week |
| #2545 (Build a Box service modal) | 1h | 7.5h | +650% | Deployed on Live | New to top-10 this run (was below cutoff last week; same absolute numbers) |
| #2630 | 0.5h | 3.75h | +650% | N/A | Same as last week |
| #2613 | 2h | 14.5h | +625% | Deployed on Live | New to top-10 this run; same absolute numbers |
| #2652 | 1.5h | 10.5h | +600% | Deployed on Live | New to top-10 this run; same absolute numbers |
| #2501 | 4h | 25.5h | +538% | Deployed on Staging | Same as last week |
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging | **Unresolved 11+ weeks now** |
| #2691 | 1h | 6h | +500% | Deployed on Live | New to top-10 this run |

Every listed item is byte-identical in absolute Est/Actual numbers to prior weeks where tracked — **confirms these are STILL GROWING / stalled with zero burn-down activity**, consistent with the frozen Narrow/Broad totals in Part 4. Watched tasks #2595 (Giftdrop Redemption, 120h est/168.25h actual, +40%, Deployed on Staging) and #2624 (order complete update, 12h est/31.25h actual, +160%, Dev Done) both remain unchanged and still flagged, same as last week.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: CANNOT DRAFT this week — Workstream unavailable (both attempts failed), and the Google Sheets fallback for James Diamond/Marcel/Blair Brown all show 0.00h for the current week (confirms tracking has moved to Workstream, not real zero hours).**

**This is the 4th consecutive week this report could not be drafted** (24/08, 31/08, and 07/09 also blocked; last actual send was W33, 17/08, confirmed and sent 2026-08-22 10:59, event `$rs1IYZJ-RuLzzYJdwHIuVD_Fd39ypBCxvRzI91O-wyk`, per `config/.weekly-report-send-flags.json`). No new draft was written to that file this run — there are no real numbers to draft, and writing a placeholder with fabricated/zero numbers would risk exactly the kind of wrong-send the file's gate mechanism exists to prevent.

**No message text drafted this run — nothing to confirm.**

**Recommend to user:** four open weeks (24/08, 31/08, 07/09, 14/09) now need a decision — wait for Workstream to be fixed and attempt a bulk backfill of all four, or escalate for an interactive VNC login to pull the missing weeks directly. The backlog is growing weekly and risks becoming unreconcilable if Workstream's own historical week views also expire/roll off.

---

## #4 — Unresolved Questions / Blockers

1. **Workstream outage — zero-output full-timeout hang on both attempts this run**, matching the same signature as the last 2 reports (09-03, 09-12). Strongly suggests an underlying auth/session problem rather than a transient network blip. Needs interactive VNC session to diagnose properly; continuing to blind-retry via cron is not converging. 4th consecutive weekly-report run affected.
2. **James Diamond/Marcel/Blair Brown Matrix report now 4 weeks backlogged** (24/08, 31/08, 07/09, 14/09) — needs an explicit user decision: wait-and-backfill-all vs. interactive-pull-now vs. accept-gap-and-resume-forward.
3. **Fountain Broad-bucket methodology now reconciled this run** — the corrected `max(0, Est-Actual)` floor formula reproduces both the known-good Narrow figure (229.00h) and matches the 2026-08-29 Broad figure (63 tasks/328.50h) exactly. Recommend checking this formula into a versioned script (`scripts/fountain-est-vs-charged.js` or similar) so future runs don't re-derive it ad hoc. Not yet done this run — flagging as a follow-up.
4. **Over-estimate item count (36 this run vs 37 last week)** is now stable/consistent given the reconciled formula — no longer treated as an open drift question.
5. **Xtreme Soft (Maddy) and Generator App Sheets continue to return "no matching week row found"** for the current Monday, 4th run in a row — worth checking whether their Summary tabs' week-list has simply not been extended, independent of the Workstream blocker.
6. **Team Hours check (#1) has zero live per-day/leave visibility this week**, 4th consecutive week — cannot confirm or deny any <40h/wk or <8h/day condition for TuanNT, KhanhHH, PhucVT, VietPH, or the Fountain team (ViTHT/ThinhT/VuTQ/PhatDLT/HungPN). This is a full visibility gap, not a clean bill of health.

---

*Data sources: Google Sheets Summary/Est-vs-Charged tabs (service-account read, `config/daily-agent-490610-7eb7985b33e3.json`) — succeeded for Fountain Parts 4/5, returned stale 0.00h for all current-week task-log cells elsewhere, and "no matching week row found" for Maddy/Generator; Matrix Fountain room transcript (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`, ~280 messages paginated back) — succeeded for Part 1; JIRA `madhuraka`/`swiftstudio` instances (`config/.jira-config.json`) — succeeded for LongVV/LeNH cross-check; `scripts/workstream-login.js` — failed 2× this run (both zero-output full-timeout hangs) after confirming and killing a stale Sep-17 Chrome process tree beforehand, and re-checking/killing between attempts; `config/.weekly-report-send-flags.json` — not updated this run (no new draft, nothing to confirm).*
