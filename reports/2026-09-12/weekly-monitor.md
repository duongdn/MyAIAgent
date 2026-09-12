# Weekly Monitor — Week of 2026-09-07 → 2026-09-11 (W43)

**Run at:** 2026-09-12 ~00:16 +07 (Saturday)
**Compared to:** 2026-09-05 report (covering Aug 31–Sep 4, W42) — that report was also Workstream-blocked, so this is the **3rd consecutive week** the James Diamond/Marcel/Blair Brown Matrix report cannot be drafted.

---

## 🔴 BLOCKER: Workstream Unavailable This Run (continuing outage pattern)

No stale Chrome process was holding `tmp/workstream-browser-profile` this time (checked before starting — clean). Ran 2 clean attempts of `node scripts/workstream-login.js` (110s timeout each):

- **Attempt 1:** Hung to full timeout with zero output/signature (matches the 09-03/09-05 "no partial log" hang variant).
- **Attempt 2:** Produced the older signature — `SSO redirect detected — Keycloak cookies alive` → `Browser attempt 1: no token captured (SSO redirected but API never fired)` → retried internally as `Attempt 2` → same SSO-redirect-no-token result, then hit the outer timeout.

Per standing rule (stop after 2–3 clean attempts, don't blind-retry), stopped here. This is now confirmed across **both known hang signatures in the same session** — root cause still unresolved, needs interactive VNC re-login rather than further automated attempts.

**Impact this run:**
- All 11 Google Sheets task-log sources return **0.00h for the current week (W43, Sep 7 row)** across every Workstream-migrated project (James Diamond, Paturevision, John Yi, William Bills, BXR App, Radio Data Center, Baamboozle, Marcel, Fountain) — consistent with the established finding that these teams have fully migrated logging to Workstream and Sheets are structurally stale post-migration (not a live-data gap). Xtreme Soft (Maddy) and Generator App errored with "no matching week row found" (same as last 2 runs).
- **Team Hours check (#1) cannot be computed from Sheets this week.** Only the JIRA cross-check (independent of Workstream) was recoverable.
- **Fountain Parts 2/3 (task-log actuals, Plan vs Actual) cannot be computed** — Summary!W-row for this week is also all 0.00h.
- **James Diamond + Marcel + Blair Brown Matrix report: BLOCKED — 3rd consecutive week** (24/08, 31/08, 07/09 all now undrafted/unsent since the last actual send, W41/17-08).
- **Fountain Parts 1, 4, 5 ARE independent of Workstream and were fetched live successfully** — see below.

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **Workstream unavailable — both known hang signatures hit in one session** (zero-output hang on attempt 1, SSO-redirect-no-token on attempt 2) | Needs interactive VNC re-login; automated retries not converging |
| **James Diamond + Marcel + Blair Brown Matrix report BLOCKED 3 weeks running** (24/08, 31/08, 07/09 all undrafted) | Backlog now spans 3 weeks — recommend escalating to user for interactive pull or explicit backfill decision |
| **All Google Sheets task logs show 0.00h for current week across every migrated project** | Confirms full migration to Workstream tracking; not a live-data gap |
| **Fountain Est vs Charged Narrow bucket: 229.00h / 28 tasks — byte-identical to last 2 reports** | **11th consecutive week frozen** |
| **Fountain "Broad" bucket this run: 76 tasks / 544.75h**, vs last report's 85 tasks / 608.75h (itself flagged unverified vs the report before that, 63/328.50h) | Broad-bucket count/total continues to drift week to week under the current ad-hoc script — **still unreconciled**, do not treat any Broad figure across the last 3 reports as comparable until the exact prior filter logic is recovered |
| **Fountain weekly plan (Matrix) restored ThinhT this week** — ViTHT 40h, ThinhT 20h, DatNT 40h ⇒ QC 25h | Reverses last week's ThinhT-drop anomaly noted 2026-08-31; there was also an intermediate 40/20/40/QC25 post on 2026-08-24 and 2026-08-26, so this looks like the team's steady-state pattern resuming |
| **LongVV/Kai JIRA (Maddy) — 1h logged through query time (2× 30m on LIFM2-455/452, both 2026-09-10)** | Informational only; 16h/wk floor retired 2026-08-24 |
| **LeNH/Carrick JIRA (BXR, swiftstudio) — 0 worklogs found this week** | Consistent with LeNH being full-time on James Diamond/Blair Brown this cycle, not BXR — not itself an alert |

---

## #1 — Team Hours

**Status: Largely BLOCKED this run**, same pattern as the prior 2 reports. Every Google Sheets task log returned 0.00h for the current week, and Workstream itself failed both clean login attempts. The only independently-verifiable data points this run are the JIRA cross-checks.

| Developer | Source | Result | Status |
|-----------|--------|--------|--------|
| LongVV/Kai | JIRA (madhuraka, `worklogAuthor=5b1ed0bcc175e5207bf80b77`, `worklogDate >= 2026-09-07`) | **1h** (30m LIFM2-455 + 30m LIFM2-452, both Thu 09-10) | Informational only — 16h/wk floor retired 2026-08-24; cannot cross-check vs Sheets (Xtreme Soft sheet week-tab not found for this week) |
| LeNH/Carrick | JIRA (swiftstudio, `project = BXR`, `worklogDate >= 2026-09-07`) | **0 worklogs** | Not an alert — LeNH understood to be on James Diamond/Blair Brown this cycle, not BXR |
| TuanNT, KhanhHH, PhucVT, VietPH, Fountain team (ViTHT/ThinhT/VuTQ/PhatDLT/HungPN) | Google Sheets (all projects) | **0.00h in every current-week cell** | **Not usable** — reflects Workstream migration, not actual hours. Cannot flag <40h/day or leave-row checks this run without Workstream. |

**No <40h/day flags issued this run** — not because hours are confirmed fine, but because no live per-day breakdown was reachable (would require Workstream `/review/week`, which is down).

---

## #2 — Fountain (Kunal) 5-Part Check

### Part 1 — Matrix Weekly Plan ✅ (independent of Workstream — fetched live)

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), paginated ~950 messages back to cover the full week.

**Latest plan for this week** (trinhmtt, 2026-09-07 01:50:53 UTC, an edited/final version of a 01:50:38 UTC post the same minute):
`ViTHT: 40h | ThinhT: 20h | DatNT: 40h => QC: 25h`

Note: this restores ThinhT to the plan after last week's (08-31) plan omitted him — the 40/20/40⇒QC25 shape matches the 08-24 and 08-26 posts, suggesting 08-31's ThinhT-drop was the anomaly, not this week's inclusion.

### Part 2 — Task Log Actuals — ❌ BLOCKED

Source would be Workstream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`) per-dev actuals — Workstream login failed both attempts this run. Fallback Google Sheets Summary!W-row for this week is all 0.00h across every dev (ViTHT, ThinhT, VuTQ, DatNT, PhatDLT, HungPN, TriNM, HaVS, ThienVN, DuongDN, LamLQ) — reflects the Workstream migration, not real zero hours. No actuals available this run.

### Part 3 — Plan vs Actual — ❌ BLOCKED (depends on Part 2)

Cannot compute without task-log actuals. Plan is known (Part 1); actuals are not.

### Part 4 — Capacity & Runway ✅ (independent of Workstream — fetched live via service-account Sheets read)

Source: "Est vs Charged" tab, `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, range A13:L118. Est = col I (Raw), Actual = col K (this run did not find a populated CR/col-J value in the sampled rows, consistent with prior runs).

| Bucket | Tasks | Remaining | vs last report (09-05) |
|--------|-------|-----------|-------------------------|
| Narrow (Not Started + In-progress) | 28 | **229.00h** | **Byte-identical — 11th consecutive week frozen** |
| Broad (excl. Deployed on Live/Cancelled) | 76 | **544.75h** (unverified) | Last report showed 85 tasks/608.75h, itself flagged unverified against the 63/328.50h reported the week before — **Broad bucket has now produced 3 different totals in 3 consecutive weeks** under the same ad-hoc script; treat as unreliable until the exact prior-week filter/dedup logic is recovered and reapplied consistently |

**Runway:** at the standing 86h/week dev capacity assumption, the Narrow bucket (229.00h) implies **~2.7 weeks of remaining scope** — unchanged from last week given the frozen total.

**Narrow bucket confirmed frozen an 11th consecutive week** — same underlying finding as the last 2 reports; the tracked portion of this sheet appears to have stopped receiving new est/actual entries.

### Part 5 — Over-Estimate Tracking ✅ (same source, independent of Workstream)

37 items >20% over (est+CR) this run by raw threshold count (was 26 last week) — the count difference tracks the same Broad-bucket methodology drift noted in Part 4, not independently reconciled this run. The top-of-list items by absolute numbers, however, are unchanged:

| Task | Est+CR | Actual | Over% | Status | vs last week |
|------|--------|--------|-------|--------|--------------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live | STILL GROWING (same numbers as last week, unresolved) |
| #2615 | 12h | 106.75h | +790% | Deployed on Staging | STILL GROWING (same numbers as last week) |
| #2639 (Infinity active/inactive) | 2h | 16.5h | +725% | Deployed on Staging | Same as last week |
| #2630 | 0.5h | 3.75h | +650% | N/A | Same as last week |
| #2501 | 4h | 25.5h | +538% | Deployed on Staging | Same as last week |
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging | **Unresolved 10+ weeks now** |
| #2604 | 1h | 3.5h | +250% | Deployed on Staging | Same as last week |
| #2702 (Infinity accessibility) | 8h | 25.5h | +219% | In-progress (>50%) | Same as last week |
| #2624 (order complete update) | 12h | 31.25h | +160% | Dev Done | Same as last week |
| #2595 (Giftdrop Redemption) | 120h | 168.25h | +40% | Deployed on Staging | Not in this run's top-10 by %, still the largest absolute est/overrun item, unchanged |

Every top-of-list item is byte-identical in absolute Est/Actual numbers to last week — **confirms these are STILL GROWING / stalled with zero burn-down activity**, consistent with the frozen Narrow/Broad totals in Part 4. Watched tasks #2595 and #2615 both remain unchanged and still flagged.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: CANNOT DRAFT this week — Workstream unavailable (both attempts failed), and the Google Sheets fallback for James Diamond/Marcel/Blair Brown all show 0.00h for the current week (confirms tracking has moved to Workstream, not real zero hours).**

**This is the 3rd consecutive week this report could not be drafted** (24/08 and 31/08 also blocked; last actual send was W41, 17/08, confirmed and sent 2026-08-22 10:59, event `$rs1IYZJ-RuLzzYJdwHIuVD_Fd39ypBCxvRzI91O-wyk`, per `config/.weekly-report-send-flags.json`). No new draft was written to that file this run — there are no real numbers to draft, and writing a placeholder with fabricated/zero numbers would risk exactly the kind of wrong-send the file's gate mechanism exists to prevent.

**No message text drafted this run — nothing to confirm.**

**Recommend to user:** three open weeks (24/08, 31/08, 07/09) now need a decision — wait for Workstream to be fixed and attempt a bulk backfill of all three, or escalate for an interactive VNC login to pull the missing weeks directly. The backlog is growing weekly and risks becoming unreconcilable if Workstream's own historical week views also expire/roll off.

---

## #4 — Unresolved Questions / Blockers

1. **Workstream outage — both known hang signatures observed in one session** (zero-output full-timeout hang, and the older SSO-redirect-no-token pattern) — strongly suggests an underlying auth/session problem rather than a transient network blip. Needs interactive VNC session to diagnose properly; continuing to blind-retry via cron is not converging.
2. **James Diamond/Marcel/Blair Brown Matrix report now 3 weeks backlogged** (24/08, 31/08, 07/09) — needs an explicit user decision: wait-and-backfill-all vs. interactive-pull-now vs. accept-gap-and-resume-forward.
3. **Fountain Broad-bucket total has produced 3 different numbers in 3 consecutive weekly runs** (328.50h → 608.75h → 544.75h) under an ad-hoc, non-versioned counting script — needs a single canonical script checked into the repo so the Broad figure becomes comparable week over week. Not chased further this run.
4. **Over-estimate item count also swings with the Broad-bucket methodology** (26 → 37 this run) — same root cause as #3, not independently traced.
5. **Xtreme Soft (Maddy) and Generator App Sheets continue to return "no matching week row found"** for the current Monday, 3rd run in a row — worth checking whether their Summary tabs' week-list has simply not been extended, independent of the Workstream blocker.
6. **Team Hours check (#1) has zero live per-day/leave visibility this week**, 3rd consecutive week — cannot confirm or deny any <40h/wk or <8h/day condition for TuanNT, KhanhHH, PhucVT, VietPH, or the Fountain team (ViTHT/ThinhT/VuTQ/PhatDLT/HungPN). This is a full visibility gap, not a clean bill of health.

---

*Data sources: Google Sheets Summary/Est-vs-Charged tabs (service-account read, `config/daily-agent-490610-7eb7985b33e3.json`) — succeeded for Fountain Parts 4/5, returned stale 0.00h for all current-week task-log cells elsewhere, and "no matching week row found" for Maddy/Generator; Matrix Fountain room transcript (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`, ~950 messages paginated back) — succeeded for Part 1; JIRA `madhuraka`/`swiftstudio` instances (`config/.jira-config.json`) — succeeded for LongVV/LeNH cross-check; `scripts/workstream-login.js` — failed 2× this run (both known hang signatures hit) after confirming no stale Chrome process was holding the browser-profile lock beforehand; `config/.weekly-report-send-flags.json` — not updated this run (no new draft, nothing to confirm).*
