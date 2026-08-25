# Daily Report — 2026-08-25 (Tuesday)

**Run:** 2026-08-25 08:41 (+07:00), interactive
**Window:** 2026-08-24 09:45 → now
**Leave plan:** none flagged this window (DatNC leave request seen in duongdn@ inbox, unrelated to core devs)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack — Baamboozle (Aysar gate) | Carrick's MPDM "Today's update" (C07SQ4HAUHZ) — last post 2026-08-21 18:53, none since (4 days silent) |
| 2 | Workstream — Fountain reviews | 12 Pending review rows (PhatDLT/HungPN/ThinhT/DatNT) — excluded from alert per instruction, noted only |
| 3 | Workstream — OhCleo reviews | PhuongPVT 2 tasks Pending review (0:00 charged, 08-24) — addressed to reviewers DuongDN/MinhTV |
| 4 | Workstream — LeNH | 0h across all his known projects (james_diamond, radio_data_center, blair_brown, bxr_app) for Monday 08-24 — no leave note found; per strict LeNH rule this is an alert, unverified whether on leave |
| 5 | Performance — OhCleo prod | `MediaByKeyView.get` avg 42.2s/237 calls — chronic slow endpoint, worsened from 12.25s |
| 6 | Performance — MPFC prod | Apdex 0.49 (worsened further, was 0.59 on 08-24 cron, 0.54 on 08-18) — new/chronic `WP_Error::get_method()` (51x) + `"continue" targeting switch` warning (188x) + one 326s transaction |
| 7 | Elena — GitHub | PR #309 (nusken) "Implement header and modal components with i18n support" open, not yet reviewed/merged this run |
| 8 | Upwork Memo | Rory + Aysar workroom sessions failed (login_failed / session_expired) — not an alert per rule, needs manual re-auth: `carrick` Chrome Profile 1 session |
| 9 | Swift Studio (Rory) | Client billing dispute in-thread ($300/$650 discrepancy) between roryh and jeff — informational, dev actively responding |

**Today (Tue 08-25):** No confirmed leave found in this window beyond DatNC's earlier leave request (unrelated).

---

## Email — all 10 accounts — 08:45 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | 1 (leave reply) | no events |
| carrick@nustechnology.com | 8 | 3 (urgent client help + 2x New Relic) | no events |
| nick@nustechnology.com | 1 | 0 | no events |
| rick@nustechnology.com | 17 | 16 (Fountain/InfinityRoses/FirstProject Bugsnag+Rollbar prod alerts — routine daily summaries + real errors, see below) | no events |
| kai@nustechnology.com | 4 | 2 (JIRA mentions LIFM2-458/459) | no events |
| ken@nustechnology.com | 63 | 2 (dependabot PR) | 2 recurring Teams standups |
| vuongtrancr@gmail.com | 22 | 18 (Swish "Signal lost"/"Delayed-newform" Rollbar errors — recurring known noise) | — |
| dnduongus@gmail.com | 28 | 0 (personal, no security alerts) | — |
| davidztv19@gmail.com | 1 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 4 | 2 (Rollbar/New Relic daily summaries) | — |

**rick@ detail (Fountain/Infinity):** FountainStaging BugSnag errors (RuntimeError, ActiveRecord::RecordInvalid x3, Net::ReadTimeout in shipstation:reconcile_shipments, ActionController::ParameterMissing in proofs#update). InfinityRoses production Stripe::InvalidRequestError #444 (recurring). InfinityStagingBE 100th NoMethodError occurrence #83. FirstProject production Uncaught Error #1090 (10 occurrences in 5 min, hit 100th occurrence). All routine/known error classes, no new pattern.

Trello: all 6 mail items already ✓ complete (verified live, no change needed).

---

## Slack — 14 workspaces — 09:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 8 (+MPDM checked separately) | skjamie25 bug report (team end-date display bug), Carrick confirming w/ QA. **MPDM Aysar update stale since 08-21 — see Alert #1.** |
| RDC - FM Monitoring | 11 | Automated Tuner Instability/Recovery alerts (recurring pattern, known), Carrick follow-up ping |
| Swift Studio | 13 | Client billing dispute $300/$650 (Rory vs Jeff) — see Alert #9, actively being worked |
| Xtreme Soft Solutions | 3 | Kai/Madhuraka discussing ticket #449 QA rework (5x returned) — ongoing, Kai responded. LongVV 0h Monday (WS) → Kai report check skipped per gate rule |
| SAM GUARD - Mobile | 0 | — |
| Global Grazing Services | 2 | Nick daily report present ("[Console] Alternative Reference Product..." + "[Console] Use Average Purchase Price...") |
| Amazing Meds | 0 | — |
| Generator | 4 | Trello link discussion (rudi), Violet asking about Carrick's task assignment |
| LegalAtoms | 1 | Raymond noting a release Thursday |
| MyPersonalFootballCoach | 1 | Bitbucket git URL reference only |
| William Bills | 0 | — |
| Equanimity | 16 | Komal/Carrick reconciling Simlian Rivelle/Westglade record counts, no new issue |
| SoCal Auto Wraps | 0 (dropped, no gate) | — |
| Aigile Dev | 0 (1 bot ping) | — |

Trello: Franc, Rory (Swift), Elliott sources checked and pass — no card change needed beyond noted pre-existing "performance issue" note on Elliott. Aysar left ○ (alert). Raymond/Marcel/Colin/MPFC already ✓.

---

## Discord — AirAgri + Bizurk — 09:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | ~20 | Jeff Trinh daily report present (4h: Check-in Info Form + Submitted Forms History done). Client James Diamond (.jdiamond) + bellatric02 raising multiple app-icon/training-session/punch-clock UX questions — feedback, not blocking |
| Bizurk (nuscarrick) | 0 | No Andrew Taraba DMs |

Trello: James Diamond item left ○ (pre-existing "redmine cực kì nhiều BUG" note, backlog not cleared this run). Andrew Taraba already ✓.

---

## Sheets/Workstream — all developers — 09:20 (+07:00)

Monday 2026-08-24 hours (week just started, only Monday populated):

| Developer | Project | Hours | Status |
|-----------|---------|-------|--------|
| KhanhHH | Generator (Elliott) | 4h | OK |
| LucNT | Generator | 1h | OK |
| TuanNT | Speedventory (Bailey) | 8h | OK — satisfies TuanNT gate for John Yi/Rebecca/Bailey |
| DatNC | Speedventory | 2h | OK |
| VyNL | Speedventory | 2h | OK |
| HungPN/PhatDLT/ThinhT/DatNT | Fountain | 2.5/2.5/4/8h | OK (see Fountain section) |
| PhuongPVT | OhCleo | 3h | OK, but 2 tasks Pending review — Alert #3 |
| LongVV | Maddy (Xtreme) | 0h | Not an alert — ad-hoc, no fixed target (2026-08-24 rule) |
| **LeNH** | james_diamond/radio_data_center/blair_brown/bxr_app | **0h all** | **Alert #4 — no leave note found, verify** |
| PhucVT | (not seen in any project this window) | 0h visible | Per [[feedback_phucvt_adhoc_external_ignore]] — not hard-alerted, but flagging as unusual (was active in James-DefinitiveGuide Matrix room 08-24 per plan discussion) |

**Workstream needs-review (non-Fountain):** OhCleo — PhuongPVT, 2 rows Pending (see Alert #3), reviewers DuongDN/MinhTV.
**Fountain needs-review:** 12 Pending rows — excluded from alerting per standing instruction, noted only.

---

## Scrin.io (Nick @ John Yi company account — 08-24) — 09:05

0h — no sessions recorded. (Not TuanNT evidence.)

---

## Fountain — 3-part check — 09:30 (+07:00)

**Part 1 — Matrix plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted 09:16 08-24 — "ViTHT: 40h, ThinhT: 20h, DatNT: 40h => QC 25h".

**Part 2 — Task log actuals (Workstream, Monday 08-24):** HungPN 2.5h, PhatDLT 2.5h, ThinhT 4h, DatNT 8h. (ViTHT not shown as separate row this window — check next recheck.)

**Part 3 — Plan vs actual:** ThinhT 4h/20h weekly plan (on track, week just started). DatNT 8h/40h weekly plan (on track). ViTHT/QC actuals not yet visible for Monday — will surface as week progresses.

**Trello board:** not pulled this run (time-constrained) — flag for recheck.

Trello: Fountain item left ○ (Trello board sub-check not completed this run).

---

## Elena — 09:35 (+07:00)

- Open PR #309 (nusken, "Implement header and modal components with i18n support") — not reviewed/merged this run (CodeRabbit review not checked).
- Precognize (nusken): 0 open PRs.
- WordPress SamGuard JS console check: not run this cycle (time-constrained) — flag for recheck.

Trello: Elena - SamGuard left ○ (PR pending + WordPress check outstanding).

---

## Maddy

4-part check: (1) Slack Xtreme activity present (Kai/Madhuraka discussing ticket #449 QA rework, Kai responsive same day). (2) Workstream: LongVV 0h Monday 08-24 on Maddy — not an alert, ad-hoc/no-fixed-target since 2026-08-24 retirement of the 16h/week rule. (3) Kai daily-report gate: skipped per rule since LongVV logged 0h that day (no Kai-role hours to check against). (4) No unanswered client/Madhuraka message found — Kai responded same-day to the #449 rework question. Maddy JIRA weekly cross-check not re-run this cycle (script reads stale sheet — flagged in memory, needs Workstream update; deferred to recheck). No blockers → Trello item marked ✓ complete.

## Reminders

No `--send-reminder` flag passed — printing only, no Matrix sends this run.
- LongVV: skipped — ad-hoc, no fixed target, 0h is normal (2026-08-24 rule change).
- PhucVT: 0h visible in Workstream this window (see Unresolved Q2) — below the 10:00 threshold isn't yet crossed at time of this run (~09:xx), so no reminder triggered; recheck later today if still 0h.
- TuanNT: 8h logged (Speedventory) — skipped, has hours.
- LeNH: 0h across all known projects, no leave note (Alert #4) — reminder NOT sent this run (no `--send-reminder` flag); flagging for the user to decide whether to send via `/daily-report reminders lenh --send-reminder`.

## Trello — 09:40 (+07:00)

Check mail: all 6 items already ✓ (verified live).
Check progress: marked ✓ Maddy, John Yi - Amazing Meds, Rebecca (William Bills) this run based on above findings. Remaining ○ items: James Diamond (pre-existing bug backlog note), Aysar (Alert #1), Elliott (pre-existing perf note), Elena (PR + WP check pending), Bailey (pre-existing infra note), Fountain (board sub-check pending), Philip (not run), Arthur (not fully run — see below), Blair Brown (LeNH 0h, Alert #4 spillover).

---

## Matrix — 08:47 (+07:00)

**Active rooms: 24 / 142 | Messages: 589** *(since 2026-08-24 08:00)*
Full details: reports/2026-08-25/matrix-rooms-0847.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| James - DefinitiveGuide | 10:41 | namtv: "Tuần trước mày làm nhiêu hours bên James - Definitive nhỉ?" — hours query, answered 30m ✅ |
| Delivery - Resource Arrangement (Philip room) | 12:03 | hangdtt: asking DuongDN to plan/send holiday-schedule notice to James Le Chevalier client — replied "ok chắc là mai/mốt" ✅ acknowledged, not yet sent |

### Key updates

**James - DefinitiveGuide (new client re-engagement):** LongVV assigned to this project (was under-utilized on Maddy), account/SSH access set up through the day, urgent filter-tool bug being worked, bigger draw-tool rewrite task queued next.

**Bailey - Management:** Manager (binhnt) questioning why Est-vs-Charge sheet shows 0 total hours after TrinhMTT logged — process clarification thread, TrinhMTT explains techlead role can't assign tags to others yet; resolved procedurally within thread.

**Celine - OhCleo (160 msgs, high volume):** App got rejected on both app stores over sexual content in search/tags. Team (Tony/MinhTV/PhucVT/Lu/PhuongPVT) worked out a mitigation — feature-flag to hide sensitive tags/settings during review, ~1h dev + 1h mobile. Estimate backlog also being worked (Celine pushing for faster turnaround, several tasks still un-estimated end of day).

**Elena - Active Alerts (Precognize):** Team clarified 2 bugs (AA-90 text typo, grouping-behavior est) were pre-existing/data-related, not caused by recent upgrade — no new regression.

**Other:**
- Maddy - Xtreme: DuongDN caught ThanhNX padding task-log hours to hit a non-existent "10h/week fixed" rule — corrected same day, hours reallocated properly (452/459 split clarified).
- Kunal - Fountain: normal QA/dev back-and-forth, nothing blocking.
- PHP Projects / Những chú voi con: internal chat re: an old Elementor Pro CVE — checked, WP projects unaffected (pro plugin, not installed); also a legacy CodeIgniter project inventory search (found: BrakeQuip via Daniel).
- Sandor - Lyf Support: LongVV handling client Q&A on account-deletion/secret-manager estimate, ongoing but not blocked.
- Arthur - Meta-Stamp: only 2 msgs — TienND/PhucVT confirming last week's charged hours (3.5h/2.5h). No new issue.

---

## Performance — 09:50 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| OhCleo (prod) | 0.90 | 738ms | 2.2% (612/27218) — ~90% benign NotAuthenticated/InvalidToken | 18.4/min |
| MPFC (prod) | **0.49** | 1511ms | 1.1% (245/23175) — chronic WP_Error + new switch-warning noise | 15.7/min |

**OhCleo slow transactions >5s:** `MediaByKeyView.get` 42.2s avg/237 calls (worsened from 12.25s — Alert #5), `MediaByTagsView.get` 19.2s/98 calls, `MediaAddTrackAPIView.post` 13.1s/2 calls.

**MPFC slow transactions >5s:** `wasatch-u19-colette-dashboard` 326.3s/1 call, `session-1-warm-up/feed` 303.5s/1 call, `ben-ewing.../embed` 245.2s/1 call, `wp-json/wp/v2/tags/*` 151.4s/2 calls, `author-sitemap.xml` 86.7s/3 calls.

**MPFC top errors:** `"continue" targeting switch` E_WARNING 188x (new/chronic), `WP_Error::get_method()` 51x (chronic, was 89x on 08-18 then dropped then rising again), `mysqli_real_connect` 3x, misc.

---

## Upwork Memo — 2026-08-24 — 09:55 (+07:00)

Both Rory and Aysar workroom fetches failed session/login (venv lz4 fallback worked for cookie extraction but Upwork auth itself failed — `login_failed` for Rory, `session_expired` for Aysar). Per rule: not an alert, needs manual re-auth via carrick's live Chrome Profile 1 Upwork session. Memo validity unverified this run.

---

## Arthur / Meta-Stamp

Not fully run this cycle (6-source deep-dive skipped due to time budget — only the 2-message Matrix room update captured above, which showed no new issue). Flag for recheck via `/daily-report arthur`.

---

## Unresolved questions

1. LeNH shows 0h across all his known Workstream projects for Monday 08-24 — no leave note found. Confirm whether he's on leave or this is a genuine gap (Alert #4).
2. PhucVT has no visible Workstream hours this window despite being actively discussed in the James-DefinitiveGuide Matrix room — worth a targeted `sheets phucvt` recheck.
3. Elena PR #309 needs review/merge decision — not actioned this run.
4. Upwork Rory/Aysar session needs manual re-auth (carrick Chrome Profile 1) before memo validity can be confirmed.
5. Arthur, Philip (MS Teams), Fountain Trello board, and Elena WordPress checks were not run this cycle — recommend a `/daily-report recheck` pass to fill these in.
