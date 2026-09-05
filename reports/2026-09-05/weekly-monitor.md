# Weekly Monitor — Week of 2026-08-31 → 2026-09-04 (W42)

**Run at:** 2026-09-05 ~00:20 +07 (Saturday)
**Compared to:** W41/W42-gap (report dated 2026-08-29, covering Aug 24–28; that report's own JD/Marcel section could not be drafted either — this is now the 2nd consecutive week with a Workstream-blocked JD/Marcel/Blair Brown report)

---

## 🔴 BLOCKER: Workstream Unavailable This Run (12th dated occurrence of the same failure pattern)

Before retrying, killed a stale/concurrent Chrome process chain (pid 819115 and children) holding the `tmp/workstream-browser-profile` lock, per standing guidance. Ran 2 clean attempts of `node scripts/workstream-login.js` (100s timeout each) after the cleanup — both hung to the full timeout with **zero output/signature captured** (not even the usual "SSO redirect detected" partial log), matching the 2026-09-03 occurrence pattern exactly. Per the standing rule (stop after 2-3 clean attempts, don't blind-retry), stopped here rather than burning a 3rd+ attempt.

**Confirmed dated occurrences now:** 07-26, 07-31, 08-01, 08-15, 08-22, 08-28, 08-29, 09-03 (×2), and today 09-05 — **12 occurrences total**, root cause still unresolved. Needs an interactive VNC re-login rather than further automated attempts.

**Impact this run:**
- All 11 Google Sheets task-log sources return **0.00h for the current week (W42, Aug 31 row)** across every project (James Diamond, Paturevision, John Yi, William Bills, BXR App, Radio Data Center, Baamboozle, Fountain, Marcel) — this is *not* a data gap, it confirms these teams have migrated logging fully to Workstream and the Google Sheets are stale for any week after the migration (consistent with `feedback_workstream_all_projects.md`). Xtreme Soft (Maddy) and Generator App sheets errored with "no matching week row found" (Summary tab week-list likely doesn't extend to W42's date yet or uses a different tab-naming scheme — not independently chased further given the Workstream blocker made this moot for a live-hours check anyway).
- **Team Hours check (#1) cannot be computed from Sheets this week.** Only the JIRA cross-check (independent of Workstream) was recoverable — see below.
- **Fountain Parts 2/3 (task-log actuals, Plan vs Actual) cannot be computed** — GSheets Summary!W42 row is also all 0.00 (Fountain has migrated to Workstream too, matching last week's caveat that GSheets 0h ≠ real 0h for this team).
- **James Diamond + Marcel + Blair Brown Matrix report: BLOCKED again — 2nd consecutive week.** No Web/Mobile/Marcel/Blair Brown hours are recoverable from any independent source this run.
- **Fountain Parts 1, 4, 5 ARE independent of Workstream and were fetched live successfully** — see below.

---

## ⚠️ Critical Notes

| Issue | Status |
|-------|--------|
| **Workstream unavailable — 12th occurrence**, now hangs to full timeout with no partial signature (matches 09-03 pattern, not the older "SSO redirect but no token" signature) | Needs interactive VNC re-login; automated retries not resolving it |
| **James Diamond + Marcel + Blair Brown Matrix report BLOCKED 2 weeks running** (24/08 and 31/08 both undrafted) | Backlog is building — recommend flagging to user whether to wait for Workstream fix or attempt a manual/interactive pull |
| **All Google Sheets task logs show 0.00h for current week across every project** | Confirms full migration to Workstream tracking; Sheets are structurally stale post-migration, not a live-data gap to keep re-checking |
| **Fountain Est vs Charged (Narrow bucket) still 229.00h / 28 tasks — byte-identical to last week** | **10th consecutive week frozen** |
| **Fountain "Broad" bucket recount this run: 85 tasks / 608.75h**, vs last week's reported 63 tasks / 328.50h | Discrepancy likely a methodology drift (this run's ad-hoc script may count differently, e.g. duplicate task-ID rows in the sheet, "N/A"/other statuses) — **flagging as unverified, not asserting as a real jump**; needs the exact prior-week script/logic to reconcile before trusting this number |
| **Fountain weekly plan (Matrix) dropped ThinhT from the plan this week** | ViTHT 24h, DatNT 24h, VuTQ 12h ⇒ QC 15h (see Part 1) — first week without a ThinhT line in recent history |
| **LongVV/Kai JIRA (Maddy) — 2.5h logged through query time (Thu 09-03 + Fri 09-04)** | Informational only; 16h/wk floor was retired 2026-08-24, ad-hoc bucket now |
| **LeNH/Carrick JIRA (BXR, swiftstudio) — 0 worklogs found this week** | Consistent with LeNH being full-time on James Diamond/Blair Brown this cycle, not BXR — not itself an alert |

---

## #1 — Team Hours

**Status: Largely BLOCKED this run.** Every Google Sheets task log returned 0.00h for the current week (confirms Workstream-only tracking now, not real zero hours), and Workstream itself failed both clean login attempts. The only independently-verifiable data point this run is the JIRA cross-check.

| Developer | Source | Result | Status |
|-----------|--------|--------|--------|
| LongVV/Kai | JIRA (madhuraka, worklogAuthor filter, `worklogDate >= 2026-08-31`) | **2.5h** (2h on LIFM2-462 Thu 09-03, 0.5h on LIFM2-460 Fri 09-04) | Informational only — 16h/wk floor retired 2026-08-24; can't cross-check vs Sheets (Xtreme Soft sheet W-tab for this week not found) |
| LeNH/Carrick | JIRA (swiftstudio, `project = BXR`, `worklogDate >= 2026-08-31`) | **0 worklogs** | Not an alert — LeNH is understood to be on James Diamond/Blair Brown this cycle, not BXR |
| TuanNT, KhanhHH, PhucVT, VietPH, Fountain team (ViTHT/ThinhT/VuTQ/PhatDLT/HungPN) | Google Sheets (all projects) | **0.00h in every current-week cell** | **Not usable** — reflects Workstream migration, not actual hours. Cannot flag <40h/day or leave-row checks this run without Workstream. |

**No <40h/day flags issued this run** — not because hours are confirmed fine, but because no live per-day breakdown was reachable (would require Workstream `/review/week`, which is down).

---

## #2 — Fountain (Kunal) 5-Part Check

### Part 1 — Matrix Weekly Plan ✅ (independent of Workstream — fetched live)

Source: Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`), scanned 623 messages back to find the plan line.

**Latest revision this week** (trinhmtt, 2026-08-31 01:27:50 UTC, superseding an 01:14:47 UTC self-correction same day):
`ViTHT: 24h | DatNT: 24h | VuTQ: 12h => QC 15h`

Note: this week's plan has **no ThinhT line** — the first time in the recent history reviewed that ThinhT is absent from the weekly plan post. Not flagged as an error (may be intentional reassignment), but worth confirming with the team if ThinhT continues to show 0 plan hours next week.

### Part 2 — Task Log Actuals — ❌ BLOCKED

Source would be WorkStream "Fountain Greetings" (`cmpqcjojh00q2tk1v2qi7gs0j`) per-dev actuals — Workstream login failed both attempts this run. The fallback Google Sheets Summary!W42 row is all 0.00h across every dev (ViTHT, ThinhT, VuTQ, DatNT, PhatDLT, HungPN, TriNM, HaVS, ThienVN, DuongDN, LamLQ) — this reflects the Workstream migration, not real zero hours, per `feedback_workstream_all_projects.md`. No actuals available this run.

### Part 3 — Plan vs Actual — ❌ BLOCKED (depends on Part 2)

Cannot compute without task-log actuals. Plan is known (Part 1); actuals are not.

### Part 4 — Capacity & Runway ✅ (independent of Workstream — fetched live via service-account Sheets read)

Source: "Est vs Charged" tab, `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, range A13:L118. Est = col I (Raw) + col J (CR), Actual = col K.

| Bucket | Tasks | Remaining | vs last report (08-29) |
|--------|-------|-----------|-------------------------|
| Narrow (Not Started + In-progress) | 28 | **229.00h** | **Byte-identical — 10th consecutive week frozen** |
| Broad (excl. Deployed on Live/Cancelled) | 85 | **608.75h** (unverified) | Last report showed 63 tasks/328.50h — this run's recount differs materially; **flagging as a possible methodology drift** (duplicate task-ID rows seen in the raw sheet, e.g. `2380_check_checkout_date_display` appears twice with different Est/Actual pairs) rather than asserting a genuine jump. Needs reconciliation against the exact filter used in prior weeks before trusting the Broad number going forward. |

**Narrow bucket confirmed frozen a 10th consecutive week** — same underlying finding as last week (9th), the tracked portion of this sheet appears to have stopped receiving new est/actual entries.

### Part 5 — Over-Estimate Tracking ✅ (same source, independent of Workstream)

26 items >20% over (est+CR) this run (was 36 last week under the same >20% threshold — count difference likely tied to the same Broad-bucket duplicate/methodology issue noted in Part 4, not independently reconciled this run).

| Task | Est+CR | Actual | Over% | Status | vs last week |
|------|--------|--------|-------|--------|--------------|
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live | STILL GROWING (was +1550% last week too — same absolute numbers, unresolved) |
| #2615 | 12h | 106.75h | +790% | Deployed on Staging | STILL GROWING (was +790% last week, same numbers) |
| #2639 (Infinity active/inactive) | 2h | 16.5h | +725% | Deployed on Staging | Same as last week |
| #2630 | 0.5h | 3.75h | +650% | N/A | Same as last week |
| #2501 | 4h | 25.5h | +538% | Deployed on Staging | Same as last week |
| #2380 (checkout date display) | 4h | 25.25h | +531% | Deployed on Staging | **Unresolved 9+ weeks now** |
| #2604 | 1h | 3.5h | +250% | Deployed on Staging | New to top-of-list view this run |
| #2702 (Infinity accessibility) | 8h | 25.5h | +219% | In-progress (>50%) | New/growing — was not in last week's top list |
| #2624 (order complete update) | 12h | 31.25h | +160% | Dev Done | Same as last week |
| #2595 (Giftdrop Redemption) | 120h | 168.25h | +40% | Deployed on Staging | Largest est item, unchanged — not in top-10 by % this run but still the biggest absolute overrun |

Top-of-list items (#2627, #2615, #2639, #2630, #2501, #2380) are identical in absolute Est/Actual numbers to last week — **confirms these are STILL GROWING / stalled, no burn-down activity**, consistent with the frozen Narrow/Broad totals in Part 4.

---

## #3 — James Diamond + Marcel + Blair Brown Matrix Report

**Status: CANNOT DRAFT this week — Workstream unavailable, and the Google Sheets fallback for James Diamond/Marcel/Blair Brown all show 0.00h for the current week (confirms the tracking has moved to Workstream, not real zero hours).**

**This is the 2nd consecutive week this report could not be drafted** (last week 24/08 also blocked; last actual send was W41, 17/08, confirmed and sent 2026-08-22 10:59, event `$rs1IYZJ-RuLzzYJdwHIuVD_Fd39ypBCxvRzI91O-wyk`). No new draft was written to `config/.weekly-report-send-flags.json` this run since there are no real numbers to draft — writing a placeholder with fabricated/zero numbers would risk exactly the kind of wrong-send this file's gate mechanism exists to prevent.

**Recommend to user:** two open weeks (24/08 and 31/08) now need a decision — wait for Workstream to be fixed and backfill both, or escalate for an interactive VNC login to pull the missing weeks directly.

---

## #4 — Unresolved Questions

1. **Workstream 12th outage, new hang signature (zero partial output vs the older "SSO redirect detected" partial log)** — worth an interactive VNC session; automated retries are not converging on a fix. Two weeks of James Diamond/Marcel/Blair Brown reporting are now backlogged as a direct result.
2. **Fountain Broad-bucket recount (85 tasks/608.75h) vs last week's reported 63/328.50h** — needs the prior week's exact script/filter to reconcile; this run's ad-hoc query may be double-counting duplicate task-ID rows in the raw sheet (at least one duplicate observed: `2380_check_checkout_date_display`). Do not treat 608.75h as authoritative until reconciled.
3. **Over-estimate item count (26 this run vs 36 last week)** — same root cause as #2 above, not independently traced.
4. **Fountain plan dropped ThinhT this week** (ViTHT/DatNT/VuTQ only) — confirm with the team whether this is intentional reassignment or an oversight in the plan post.
5. **Xtreme Soft (Maddy) and Generator App Sheets returned "no matching week row found"** for the Aug 31 Monday — Summary tab's week-list may need checking (possibly still short of W42-equivalent row, or uses a different week-numbering base) — not chased further this run since Workstream being down made a live comparison moot regardless.
6. **Team Hours check (#1) has zero live per-day/leave visibility this week** — cannot confirm or deny any <40h/wk or <8h/day condition for TuanNT, KhanhHH, PhucVT, VietPH, or the Fountain team. This is a full visibility gap, not a clean-bill-of-health.

---

*Data sources: Google Sheets Summary/Est-vs-Charged tabs (service-account read, `config/daily-agent-490610-7eb7985b33e3.json`) — succeeded for Fountain Parts 4/5, returned stale 0.00h for all current-week task-log cells elsewhere; Matrix Fountain room transcript (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`, 623 messages scanned back to 2026-08-17) — succeeded for Part 1; JIRA `madhuraka`/`swiftstudio` instances (`config/.jira-config.json`) — succeeded for LongVV/LeNH cross-check; `scripts/workstream-login.js` — failed 2× this run (12th dated occurrence, new no-output-hang signature) after killing a stale Chrome process chain holding the browser-profile lock; `config/.weekly-report-send-flags.json` — not updated this run (no new draft, nothing to confirm).*
