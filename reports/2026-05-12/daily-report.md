# Daily Report — 2026-05-12 (Tue, +07:00)

**Window:** 2026-05-11T08:42:58+07 → 2026-05-12T08:58+07 (~24h)
**Reporting on:** Mon 2026-05-11 (W26 day 1, calendar W19)
**Sources scanned:** Email, Slack, Discord, Sheets, Scrin.io, Fountain (5-part + Trello board), Elena, Upwork

---

## TL;DR

- **3 task-log alerts (Mon 11/05):** LongVV 0h, LeNH 0h-logged-but-Rory-tracker-5h30m, KhanhHH 5h (-3h). Reminders sent.
- **Trello Check Mail:** all 6 items ✓ ([card](https://trello.com/c/6a0274f34f6b6fd991077d20)).
- **Trello Check Progress:** 17/18 ✓; **Rory** skipped (LeNH Rory tracker 5h30 unlogged) ([card](https://trello.com/c/6a026dcfbb12ca47499bfc8e)). Maddy ✓ (LongVV 0h is supporting-dev, item gates on Carrick/Kai/Luis named leads — all active).
- **Elena queue empty**, samguard.co clean, Precognize no nusken PRs.
- **Fountain W26 plan posted on time** (Mon 09:03 @trinhmtt, 146h total); day 1 actual 30h with 4 plan devs on pace; capacity tightened −16.5h.
- **Neural Contract:** 17.9d client silence — normal per memory, no pending question.

---

## Email — 08:58 (+07:00)

| Account | Count | Summary |
|---|---|---|
| duongdn | 5 | HR leave-request approval, new-staff announcement, health-check guide |
| carrick | 2 | Redmine bug #78065 (Elliott/Generator booking reminder timing); Jira BXR-217 (Twilio fix) |
| nick | 0 | no John Yi emails |
| rick | 13 | FirstProject prod Rollbar (recurring TypeError #878 + #875 + new #883 SyntaxError); FountainStaging timeout; Fountain/InfinityRoses daily summaries |
| kai | 5 | 3× Jira LIFM2-432; Madhuraka SerpApi-exhausted FW; Upwork msg Elena K. |
| ken | 49 | Precognize/development — 8 new PRs (#4889–#4897), reviews on #4831/4868/4885/4888 |

**Details (actionable):**
- duongdn: Phat's advance leave req 22/06/2026 (approved by Binh)
- carrick: [Redmine #78065](https://nusredmine.com/issues/78065) Generator/Elliott booking reminder fires immediately when booking falls within reminder window; BXR-217 reassigned to Carrick by Rory
- rick: FirstProject prod #878 TypeError "Cannot read properties of undefined (reading 'amount')" — 4 recurrences Mon evening (Kunal/Iris); #883 new SyntaxError "undefined" not valid JSON
- ken: Precognize 8 new PRs from DanielGavrilkin/Vladimir-precog/mahkris/majdhajjo08 (SR-7270/7310/7235/dp-643/7300/7314/7306/7143)

**No person-status alerts.** Production Rollbar = website-operational notes for Rick's triage queue; not Trello-blocking.

---

## Slack — 08:58 (+07:00)

| Workspace | Msgs | Key content |
|---|---|---|
| baamboozle | 19 | Carrick deployed Twilio bypass; skjamie25 reported 502/504; Aysar pinged for Guess-eroo deploy |
| rdc | 37 | 100% bot traffic (rpi-reboot/user-access) |
| swift-studio | 14 | Urgent Twilio + Google OAuth WebView on bxr__app; Carrick pushed Twilio bypass; Rory pressing for updates |
| xtreme | 6 | **Kai posted daily progress ✓** (LIFM2-439 QA, LIFM2-409 IP); coordinated staging w/ Madhuraka |
| sam-guard | 1 | Elena: "Ok, please update us asap" 18:55 (project topic, awaiting our side) |
| ggs | 44 | Heavy maint day: GLS update broke shipping → Amy + Nick deployed live fixes; Joey paused/reopened contract; Nick committed 3-week Console upgrade timeline |
| amazing-meds | 1 | Nick (NUS) outbound ping to John Yi — no reply yet |
| generator | 11 | **Violet posted Mon Project Daily Update ✓**; release-list discussion w/ Elliott; Rudi flagged prod errors (MultiBuilding/EventController) — Carrick acknowledged |
| legalatoms | 0 | Silent (Nick-specific filter clean) |
| mpfc | 0 | Silent |
| william-bills | 34 | MWMX Sandy refinement scope discussion; **Lucas IDLE waiting Oliver approval** (Mon 15:33, Tue 08:53); anhnvn invoice ping |
| equanimity | 0 | Silent (Marcel adhoc OK) |
| aigile-dev | 6 | Carrick + Colin Aurora DB upgrade plan + voucher API shutdown |

All 14 tokens verified OK (`slack-verify-tokens.js` 14/14).

**No person-status alerts.** Dev topics (Twilio, GLS, Generator prod errors, Lucas-waiting-Oliver) are project work per memory — not Trello blockers.

---

## Discord — 08:58 (+07:00)

| Server | Msgs | Key content |
|---|---|---|
| airagri | 96 | **Vinn daily report ✓**, **Jeff daily report ✓** (4h half-day) |
| bizurk DM (animeworld) | 1 | Carrick chased Andrew on WP theme — Andrew last replied 2026-05-08 |

**Vinn (airagri_webapp, 17:26 +07):** CVE-2026-31431 security fix, device alarm logic (new req from James — orange→green state machine), reviewed PRs 386/387/389/390/391/392, manage-corporate-groups admin (almost done, push staging Tue).

**Jeff (airagri-flutter, 17:20 +07, 4h):** Built/submitted Main App iOS TF 3.4.2 + Android, submitted Visitor app to App Store, deep links for visitor records/sensors done. Asked James for Visitor Android Keystore. → 4h is half day; no leave note recorded — informational, James Diamond Trello gates on Vinn (active).

Bizurk silence normal per memory (low-activity client).

---

## Sheets — Mon 2026-05-11 hours (W26 day 1)

| Developer | Mon (Task dự án) | Sheets | Status |
|---|---|---|---|
| LongVV  | 0.00h | Maddy:0 + JD:0 | ⚠️ ALERT — reminder sent |
| PhucVT  | 8.00h | JD:8 | ✓ OK |
| TuanNT  | 8.00h | JohnYi:7 + Rebecca:1 + Paturevision:0 | ✓ OK |
| VietPH  | 8.00h | Paturevision:8 (5+3) | ✓ OK |
| KhanhHH | 5.00h | Generator:0.33 + Aysar:4.67 | ⚠️ ALERT (-3h) — reminder sent |
| LeNH    | 0.00h | Rory:0 + Franc:0 + Aysar:0 + Rebecca(Q-T):0 | ⚠️ ALERT — reminder sent (Rory tracker 5h30 unlogged) |
| DuongDN | 0.00h | Paturevision:0 (Bailey DEV3 inactive) | ✓ expected |

Direct row-dump verification done for all 0h findings (no missed entries this run). Aysar uses calendar-aligned W24 this week.

---

## Scrin.io — TuanNT/Nick John Yi

| Metric | Value |
|---|---|
| Date | 2026-05-11 (Mon) |
| Scrin.io tracked | **7.02h** (421 min, 9 sessions 08:40–17:27) |
| Task log John Yi | **7.00h** (single Task dự án row) |
| Verdict | ✓ OK (log ≤ tracker) |

Note: afternoon split into 7 short sessions on "payment process Logic Authorize.net staging" — fragmented but reasonable.

---

## Fountain — 5-part + Trello board

### Part 1 — Matrix W26 Plan (POSTED Mon 09:03 +07)
@trinhmtt: ViTHT 40h, ThinhT 20h, DatNT 40h, LamLQ 20h → QC 26h. **Total 146h.** ([Matrix room](https://chat.nustechnology.com/#/room/!EWnVDAxbTGsBxPkaaI:nustechnology.com))

Notable shifts vs W25:
- **VuTQ dropped** from plan (was 8h W25); still active in chat (#2837 review w/ ThinhT) — unlogged.
- **LamLQ added** at 20h (was off-plan).
- **HaVS absent 2nd week** running.

### Part 2 — Mon Actuals (30h logged, sheet "Total Hours: 30" confirmed)

| Owner | Mon | Plan W26 | Note |
|---|---:|---:|---|
| ViTHT | 8.0h | 40h | 2735 (2.5h) + 2872 review (0.5h) + 2854 (5.0h) |
| DatNT | 8.0h | 40h | 2885 (7.0h) + 2853 (1.0h) |
| LamLQ | 8.0h | 20h | **only 1h on plan task 2884**; 6h "Ons" + 1h Meeting |
| ThinhT | 4.0h | 20h | 2871 (3h) + 2837 (1h) |
| PhatDLT | 2.0h | (QC) | "Check fix bug" — no task ID |
| HungPN | 0.0h | (QC) | no log Mon |
| HaVS / VuTQ | 0.0h | not in plan | no log |

### Part 3 — Plan vs Actual (day 1 of 5)

| Dev | Plan W26 | Mon | Daily target | Status |
|---|---:|---:|---:|---|
| ViTHT | 40h | 8.0h | 8.0h | ON PACE 100% |
| DatNT | 40h | 8.0h | 8.0h | ON PACE 100% |
| LamLQ | 20h | 8.0h (1h on plan) | 4.0h | hrs-met but off-task |
| ThinhT | 20h | 4.0h | 4.0h | ON PACE 100% |
| QC PhatDLT | shared 26h | 2.0h | ~2.6h | mild under |
| QC HungPN | shared 26h | 0.0h | shared | day-1 concern |

Plan-tracked devs **28h vs 24h target = +4h, 117% day 1**.

### Part 4 — Capacity & Runway (Est vs Charged; Total est = I+J)

| Metric | 2026-05-11 | **2026-05-12** | Δ |
|---|---:|---:|---:|
| Remaining NS+IP strict | 252.50h | **236.00h** | **−16.50h** |
| – Not Started | 239.25h | 210.25h | −29.00h |
| – In-progress | 13.25h | 25.75h | +12.50h |
| Remaining Pending | 36.50h | 36.50h | 0 |
| Remaining broader | 446.50h | 430.00h | −16.50h |
| Runway NS+IP @146h/wk plan | — | **1.62 wk** | — |
| Runway NS+IP @48h/wk historic | 5.26 wk | 4.92 wk | −0.34 |
| Runway broader @48h/wk | 9.30 wk | 8.96 wk | −0.34 |

CR (Col J) unchanged: 43.5h total (#2735 +30h, #2837 +10.5h, #2815 +3h).

**Status-empty stuck >6 days (untriaged):** #2869 (80h est, 0h actual), #2870 (40h est, 0h actual) — 120h+ untriaged.

### Part 5 — Over-Estimate (actual > (I+J) × 1.2)

| Task | Est+CR | Actual 05-11 | **Actual 05-12** | Over% | Status | Δ |
|---|---:|---:|---:|---:|---|---|
| **#2595 GiftDrop** | 120h | 168.25h | 168.25h | +40% | Staging | stable |
| **#2615 Gift of Choice** | 12h | 106.75h | 106.75h | +790% | Staging | stable |
| **#2735 Pro Send Smart Link** | 120h (90+30) | 129.00h | **131.50h** | +9.6% | IP >50% | **+2.5h** (under 1.2× threshold, but creeping) |
| **#2815** | 9h (6+3) | 10.75h | 10.75h | +19% | Staging | stable |
| **#2837** | 26.5h (16+10.5) | 26.50h | **27.50h** | +4% | Staging | +1.0h (under threshold) |
| #2816 Infinity homepage | 20h | 44.25h | 44.25h | +121% | Staging | stable |
| #2501 / #2380 / #2639 | (various) | — | — | +500–700% | Staging | stable |
| #2624 / #2702 | (various) | — | — | +160–213% | Dev Done / IP | stable |

**No new STILL-GROWING red flags above 1.2× threshold.** Watch #2735 trend.

### Trello Board (Web Development) — [board](https://trello.com/b/UDrSWage)

- **Customer comments since prev report:** 0 (24h silence from kunalsheth/tmmckay/mike62798179/iris63293413)
- **Active cards:** 69 (unchanged; 1 transitioned To-Do→Doing)
- **Stuck >5 days:** 59 (+7 vs Mon)
- **Hard-to-release (Doing 14+ days):** 4 cards
  - 38.7d — [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) ⚠️ no movement
  - 27.0d — [Fountain — Business Homepage Updates](https://trello.com/c/WGsYqu5h)
  - 20.5d — [Fountain & Infinity — Subtle Scroll Animations](https://trello.com/c/g5SK007L)
  - 19.8d — [ActiveRecord::RecordNotFound admin/users#show](https://trello.com/c/tRyNrE2x)

---

## Elena — 08:58 (+07:00)

- **Elena-SamGuard PRs (duongdn):** 0 open
- **Pending deploy queue:** empty
- **Precognize PRs (nusken):** 0 open authored by nusken; no `nus/20260512` branch yet
- **samguard.co console:** ✓ clean (no JS errors, no CSP violations). Only normal ad-tracker blocks + headless-Chromium video aborts.

---

## Upwork — W26 day 1

| Workroom | Dev | Mon | W26 to-date | Notes |
|---|---|---:|---:|---|
| Rory 41069448 | LeNH | **5.50h** | 5.50h | **⚠️ 0h logged on Rory sheet — reminder sent** |
| Aysar 35642393 | LeNH (bills) / KhanhHH (works) | 4.67h | 5.50h | matches KhanhHH 4.67h on Aysar sheet — OK (sub-contract) |
| Bailey DEV1 42545630 | VietPH | 5.00h | 6.00h | VietPH on Paturevision `[Maintenance] PHP version on Prestashop`: cross-check on Tue |
| Bailey DEV3 43093775 | DuongDN | 0h | 0h | INACTIVE — expected |
| Neural 38901192 | external | 0h | 0h | messages only |

**Neural Contract (latest 6 msgs):** Carrick's last push (04-24 10:19 "I updated and pushed code, please check") still awaiting Michael's verification. Michael's friendly holiday-ack (04-24 11:29) closed thread cleanly. Carrick reminded about holiday (04-29 09:33). **17.9d silence is normal per memory — not an alert; Neural Contract Trello item ✓ complete.**

---

## Trello Updates

### [Check mail](https://trello.com/c/6a0274f34f6b6fd991077d20) — all 6 ✓
DuongDn ✓ | Carrick ✓ | Rick ✓ | Kai ✓ | Ken ✓ | Nick ✓

### [Check progress](https://trello.com/c/6a026dcfbb12ca47499bfc8e) — 17/18 ✓
**Skipped (alerts):**
- ⚠️ **Rory** — LeNH 0h logged but Rory Upwork tracker 5h30m Mon (tracked-but-unlogged). LeNH IS the named dev for this item → blocks. Reminder sent.

**Completed:** Maddy (Carrick/Kai/Luis active — LongVV 0h is supporting-dev, reminder sent + ⚠️ note, not a Maddy gate per per-client-lead-dev rule) ✓ | John Yi ✓ | James Diamond ✓ | Aysar ✓ | Franc ✓ | Elliott (KhanhHH 5h shortfall = reminder + ⚠️ not block) ✓ | MPFC ✓ | Marcel ✓ | Elena SamGuard ✓ | Raymond ✓ | Neural ✓ | Bailey ✓ | Andrew Taraba ✓ | Rebecca ✓ | Colin ✓ | Fountain ✓ | Elena WordPress ✓

---

## Matrix Reminders Sent

| Dev | Reason | Room |
|---|---|---|
| LongVV | 0h Mon on Maddy + JD sheets | `!mYZBGNoLFVpMVIJtPu` (direct) |
| LeNH | 0h logged but Rory tracker 5h30 Mon | `!OIrgPraJWrcDTnRVLQ` |
| KhanhHH | 5h Mon (-3h from 8h target) | `!rwLbvLBnrRAYMaOPaD` |

All 3 sends returned event_id 200.

---

## Alerts Summary

**Person-status (Trello-blocking):**
- LongVV 0h Mon (W25 partial-week memory expired 2026-05-10; W26 = standard 8h/day) — reminder sent
- LeNH tracker-vs-log gap (Rory Upwork 5h30 vs 0h logged) — reminder sent

**Person-status (reminder only, not blocking):**
- KhanhHH 5h Mon (-3h, no leave) — reminder sent, Elliott Trello stays ✓ per gate-on-lead-dev rule

**Observational (non-blocking):**
- Jeff (AirAgri) 4h half-day Mon — no leave note recorded; James Diamond gates on Vinn (✓ active)
- HungPN 0h QC Mon day 1 — pattern from W25 early days (recovered by Thu); watch Tue
- HaVS 0h W26 + W25 — 2nd consecutive week absent from Fountain plan/log
- VuTQ active in #2837 chat review but 0h logged + dropped from W26 plan
- LamLQ 8h Mon but only 1h on plan task #2884 (6h "Ons" + 1h Meeting)
- Status-empty #2869 (80h est) + #2870 (40h est) untriaged 6+ days
- Carrick chasing Andrew Taraba (animeworld) — 3+ days silent (memory: silence normal, low-activity client)

---

## Unresolved Questions

1. **LongVV W26 schedule** — is he back to 40h/wk full this week, or is partial schedule extended past W25? (Memory required explicit confirmation after 2026-05-10.)
2. **Jeff (AirAgri) 4h Mon** — half-day off, public holiday, or just a short day?
3. **VuTQ W26 plan** — dropped from plan but actively reviewing #2837; should his hours be logged or is he genuinely off-project?
4. **HaVS** — 2nd consecutive week zero. On leave / different project / off-payroll?
5. **#2869 (80h) + #2870 (40h)** — what are these tasks? Status-empty + 0h actual 6+ days. Who triages?
6. **LamLQ "Ons" 6h Mon** — onsite client work, onboarding, or other category? Affects W26 plan compliance.
7. **[Fountain States/scrolling login](https://trello.com/c/clSdoRlL)** — 38.7d in Doing, no movement. Owner / blocker?
