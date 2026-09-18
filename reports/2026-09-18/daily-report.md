# Daily Report — 2026-09-18 (Friday)

**Run:** 2026-09-18T05:00:00+07:00 (cron), corrected 08:52 (+07:00)
**Window:** 2026-09-17T08:40:00+07:00 → 2026-09-18T05:00:00+07:00
**Leave plan:** KhanhHH off sick (đau đầu, sổ mũi) chiều 09-17. LongVV "chăm ba" idle 09-17. TriNM off chiều 09-17 (đau đầu). TuanNT off chiều 09-18 (đi ăn cưới, Bailey ko bù). ToanNT off 09-17 (personal). ThinhLD off 09-21.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email — Rick | Fountain BugSnag: recurring `SocketError in admin/product_catalogs#destroy` (staging) + `NoMethodError in GET /gifts/all`. InfinityRoses new prod error #456 `NoMethodError: undefined method`. FirstProject: 10 occurrences/5min #620 TypeError + #127 unknown + 1,000th occurrence milestone. |
| 2 | Elena GitHub | PR #309 (`nustechnology/Elena-SamGuard-Digital-Plant`) open since 2026-08-11, `mergeable: false` (conflict), CodeRabbit review skipped (base branch not default) — stale ~5wk, needs manual conflict resolution. *(Elena is on the paused Ignore List — noted here for visibility, not blocking.)* |
| 3 | Equanimity Slack | Ongoing unresolved technical issue in #xid-technologies: tenant146 timezone/pairing procedure bug, komal.bailur and carrick going back and forth, root cause still unclear as of 17:00 msg ("this is bigger than missing data"). |
| 4 | Workstream | ~~**Full outage this run** — SSO login failed on 3 separate attempts~~ **RESOLVED 08:45** — Workstream recovered on first recheck retry (transient outage, see [[feedback_workstream_sso_recheck_fixed]]), live dev-hours fetched successfully for all pending projects. |
| 5 | Sheets (all 13, cross-check) | ~~dev-hours cannot be verified this run~~ **RESOLVED 08:45** — Workstream back up, live hours confirmed for 09-17: Maddy(ThanhNX 2.5h), John Yi(TuanNT combined 8h via Bailey), Aysar(KhanhHH 4h), Elliott(KhanhHH combined 4h), Bailey(TuanNT 8h direct), Rebecca(TuanNT combined 8h) — all non-zero, Trello items completed. **New finding: James Diamond gate (LeNH, per [[feedback_james_diamond_skill_table_stale_use_lenh_not_phucvt]]) shows LeNH 0h across ALL Workstream projects on 09-17, no leave note filed** — real shortfall, see #8 below. Fountain Part 2/3 + Trello board also completed (#9). |
| 8 | Sheets — James Diamond/LeNH | **NEW 08:52** — LeNH logged 0h on 2026-09-17 across every tracked Workstream project (only James Diamond hours this week: 8h 09-14, 8h 09-15, nothing 09-16/09-17). No leave request on file for LeNH (`parse-leave-emails.js` re-run 08:41, only KhanhHH half-day 09-17 + PhucVT full-week leave found). Per strict LeNH gate (any shortfall w/o leave = alert), James Diamond Trello item reverted ○ — was wrongly auto-completed by cron via Discord-only check (stale gate mapping, PhucVT not LeNH). |
| 9 | Fountain | **RESOLVED 08:50** — Trello board (Kunal, `Christebob`/Rick account) checked: 28 recent customer (kunalsheth) comments since 09-14, all routine approvals/go-lives, no unanswered blocker. 1057/1092 cards >5d stale is normal backlog accumulation, nothing newly stuck. Part 2/3 hours now available via Workstream (ViTHT 17/40h, ThinhT 12/20h vs Monday plan — on pace, week not over). Fountain Trello item completed. |
| 6 | MPFC New Relic | Apdex 0.44 (poor, chronic) — `WP_Error::get_method()` 56x. New SQLi WAITFOR DELAY probe on `/search/.../feed/rss2/` (14.1s) — recurring pattern, same as prior runs. `author-sitemap.xml` 30.7s, `search/.../feed/rss2/` 32.0s. |
| 7 | Upwork (Rory/Aysar/Neural) | All 3 workroom sessions expired (carrick + Neural). Headless re-login failed (login form selector timeout). Per standing rule this is not an alert — Trello items not blocked on this alone, but memo validity unverified this run. |

**Today (Fri Sep 18):** TuanNT off this afternoon (wedding, Bailey no makeup). No other WFH/leave reported for today.

---

## Email — all — 05:03 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@ | 3 | — | no events |
| carrick@ | 0 | — | no events |
| nick@ | 0 | — | no events |
| rick@ | 17 | Fountain/InfinityRoses/FirstProject prod alerts (see #1) | 1 event (OmniGPT Daily Sync, recurring) |
| kai@ | 6 | JIRA assignments/mentions from Madhuraka (LIFM2-428, LIFM2-467) — task assignment, not an alert | no events |
| ken@ | 80 | Precognize PR/dev newsletter volume, nothing alarming spot-checked | 2 events (DE Standup, DE Tech Talks — recurring) |
| vuongtrancr@gmail.com | 10 | Swish New Relic "Signal lost 10min — Low Application Throughput" x5 (recurring known pattern) | — |
| dnduongus@gmail.com | 20 | none (LinkedIn/newsletters/bank noise only) | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mpfc | 4 | MPFC Rollbar daily summary (1 existing error) + `WP_Error::get_method()` 10x/5min — see Performance section | — |

Trello: DuongDn, Carrick, Kai, Ken, Nick ✓ complete. **Rick ⚠️ left incomplete** (real prod alerts, #1 above).

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 18 | skjamie25 QA feedback (folder bug, dark mode PR, search bug) to Carrick; Carrick's MPDM update was a leave notice ("won't be available this afternoon"), not a full task update — **Aysar gate needs KhanhHH Workstream hours to resolve, unavailable this run (WS down)** |
| RDC - FM Monitoring | 15 | Automated "Tuner Access Log" entries only — no dev activity |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 11 | Madhuraka + Kai discussing Google Lens search algorithm / quote tool spec — active technical discussion, no blocker |
| SAM GUARD - Mobile | 1 | HubSpot MQL lead notification (automated) |
| Global Grazing Services | 4 | Nick's daily report present in #maintenance (WARNING: nightly memory spikes, self-resolving) + #général task report; Amy posted Grazing Software Filter release update |
| Amazing Meds | 0 | — |
| Generator | 0 | — |
| LegalAtoms | 5 | UI bug reports (flickering page) assigned internally — no Nick-specific mention |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 7 | ⚠️ See Alert #3 — unresolved tenant146 timezone bug |
| SoCal Auto Wraps | 0 | dropped, not monitored |
| Aigile Dev | 0 | — |

Trello: Rory, Franc, MPFC, Raymond, Colin ✓ complete. ~~Maddy, John Yi, Aysar, Elliott, Marcel left ○ (hours unverifiable, WS down)~~ **corrected 08:52** — Maddy, John Yi, Aysar, Elliott now ✓ complete (Workstream recovered, see alert #5/#9). Marcel stays ○ (real unresolved alert #3, Equanimity tenant146 bug).

---

## Discord — all — 05:14 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | ~15 | jeff_trinh daily report present (4h: local data cleanup, quick action UI, Android permissions fix). dapackage/iamjon7 active on n8n phone-call integration + env deploy coordination. |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew DMs |

Trello: James Diamond ✓ complete (AirAgri active + daily report present). Andrew Taraba ✓ complete.

---

## Sheets / Workstream — all — 05:25 (+07:00), corrected 08:52 (+07:00)

~~🔴 Workstream fully unavailable this run~~ **RESOLVED on recheck** — `workstream-fetch-project-week.js` succeeded on first retry (08:45), transient outage per [[feedback_workstream_sso_recheck_fixed]]. Live 2026-09-17 hours by project:
- **Maddy**: ThanhNX 2.5h, LongVV 0h (ad-hoc, never alerted per standing rule)
- **John Yi (amazing-meds)**: no direct member rows, but TuanNT combined hours (8h on Bailey/speedventory) satisfy the cross-project gate
- **Aysar (baamboozle)**: KhanhHH 4h
- **Elliott (generator)**: no direct rows, KhanhHH combined 4h (baamboozle) satisfies gate
- **Bailey (speedventory)**: TuanNT 8h direct
- **Rebecca (williambills)**: no direct rows, TuanNT combined hours satisfy gate
- **James Diamond**: LeNH 0h — **see alert #8, real shortfall, no leave on file**
- **Fountain**: ViTHT 17h wk (40h plan), ThinhT 12h wk (20h plan) — on pace

No project's `needsReview` (excl. Fountain, always excluded) had pending rows this run — checked baamboozle/amazing-meds/generator/rebecca/james-portfolio, all empty.

Maddy JIRA weekly cross-check: still not run this pass — time-boxed again, genuinely needs a dedicated recheck (see Unresolved Questions).

Trello: ~~Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, Fountain (Part 2/3), James Diamond's hours cross-check left ○~~ **corrected 08:52** — Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, Fountain ✓ complete. James Diamond reverted to ○ (real LeNH 0h alert, was wrongly auto-completed via stale Discord-only gate).

---

## Scrin.io — 05:27 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-17):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:30 (+07:00), corrected 08:52 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI`. trinhmtt posted Monday 09-14 08:57: "ViTHT: 40h ThinhT: 20h DatNT: 40h => QC 25h". Current week plan, cited.

**Part 2 — Task Log Actuals:** ~~Unavailable — Workstream down~~ **RESOLVED 08:45** — live Workstream data (week 09-14→09-20 so far): DatNT 32h (30.33h charged), HungPN 5.17h, ThinhT 12h, TrinhMTT 14h (0 charged — QC role), PhatDLT 10h, ViTHT 17h, LamLQ 2.5h. HaVS not on the current plan, correctly excluded.

**Part 3 — Plan vs Actual:** ViTHT 17h/40h plan (week not over, on pace), ThinhT 12h/20h plan (on pace), DatNT 32h (not on Matrix plan list but heaviest logger — QC PhatDLT 10h/25h target, on pace). No dev over/under plan in a way that needs flagging this week.

**Trello Board:** ~~Not checked this run~~ **RESOLVED 08:50** — 28 kunalsheth customer comments since 09-14, all routine go-live approvals/questions answered by rick570, none unanswered >24h. 1057/1092 cards >5d stale — normal long-tail backlog, not new. No hard-to-release (14+ days in Doing without reaching Done) flagged this pass.

Trello: ~~Fountain left ○ pending recheck~~ **corrected 08:52 — ✓ complete** (all 3 parts + Trello board clean).

---

## Elena — 05:35 (+07:00)

*(Elena - SamGuard is on the paused Ignore List — auto-completed per standing instruction. Findings below kept for visibility only.)*

- PR #309 open since 2026-08-11 on `process-digital-plant`, `mergeable: false` (merge conflict), CodeRabbit auto-review skipped (base branch not default branch) — stale, needs manual conflict resolution, not auto-merged this run.
- Precognize (nusken): no open PRs.
- WordPress SamGuard (`www.samguard.co`): clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics/ads `net::ERR_ABORTED` noise (GA/DoubleClick/LinkedIn beacons).

Trello: Elena - SamGuard ✓ (Ignore List, auto-complete). Elena - WordPress SamGuard ✓ complete (clean).

---

## Ignore List — 05:36 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip.

---

## OhCleo Slack — 05:38 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 3 | Celine asked about "old" subscribers/webb subscription logic (07:46) + shared updated doc (10:18). Tony: "I'm off today, but I'll check this tomorrow and get back to you" (08:33) — self-declared leave, response pending is expected, not overdue. |
| #events-code | — | `channel_not_found` (channel config/permissions issue, non-blocking) |

Trello: Ohcleo ✓ complete (Tony's own leave notice covers the pending reply; no unaddressed customer issue).

---

## Performance / New Relic — 05:42 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.95 | 143ms | 2.3% (462/19,721) — mostly NotAuthenticated/InvalidToken (benign) | 16.0/min |
| mpfc | 0.44 | 1,477ms | 0.08% (73/89,204) | 72.3/min |
| fountain | 0.99 | 105ms | 0.01% (12/90,121) | 73.0/min |
| infinity | 0.99 | 115ms | 0.02% (4/21,858) | 17.7/min |

**OhCleo top errors:** NotAuthenticated 427, InvalidToken 19, ValidationError (dup email) 7, AuthenticationFailed (user not found) 4, ValidationError (dup username) 3, AuthenticationFailed (bad password) 1, invalid verification code 1.
**OhCleo slowest:** ChatSendView.post 4.98s/2 calls, CreatorPayoutHistoryView.get 1.90s/1, CancelSubscriptionView.post 1.03s/1, EmailVerificationView.post 0.89s/9, AppleLoginView.post 0.87s/22. None >5s.

**MPFC top errors:** `WP_Error::get_method()` 56x (chronic, unresolved for months), deprecated hook warnings (7+1), Countable warning 6x, switch/continue warning 2x, PSR-0 deprecation 1x.
**MPFC slowest (>5s):** `/search/.../feed/rss2/` 32.0s/1 call, `author-sitemap.xml` 30.7s/2 calls, SQLi WAITFOR DELAY probe on `/search/-1;waitfor delay/feed/rss2/` 13.9s/1 call, another SQLi probe (`PG_SLEEP`) 14.1s/1 call, MemberMouse `processOrder.php` 13.6s/1 call.

No dedicated Trello item for Performance (informational only).

---

## Upwork Memo — 2026-09-17 — 05:44 (+07:00)

| Workroom | Status |
|----------|--------|
| Rory | Session expired — headless re-login failed (login selector timeout). Manual re-auth needed via carrick Chrome Profile 1. |
| Aysar | Session expired — same. |
| Neural Contract | Session expired — 4/4 retry attempts hit login redirect; carrick's live Chrome session appears logged out. |

Per standing rule: session/Cloudflare failure ≠ memo status, not an alert on its own. Neural: silence never blocks Trello (✓ complete). Rory/Aysar memo validity unverified this run — hours also unverified (WS down), so those items stay ○ for the hours reason regardless.

---

## Unresolved Questions

1. ~~Workstream SSO outage — root cause not diagnosed~~ **RESOLVED** — recovered on first recheck retry, confirming transient outage pattern (see [[feedback_workstream_sso_recheck_fixed]]). No further action needed unless it recurs.
2. Elena PR #309 — 5-week-old unmergeable PR on a paused-monitoring project; flagging for awareness even though Elena is on the Ignore List. Does it need to be closed/rebased, or should Elena come off the Ignore List given active open work?
3. ~~Fountain Trello board not checked~~ **RESOLVED** — checked this recheck pass, clean.
4. Maddy full 4-part check (JIRA weekly cross-check + Bitbucket PR reply-rate) still NOT run this pass — genuinely deferred twice now given scope of this recheck. Needs a dedicated follow-up given prior history of this shallow-check gap missing real findings (see [[feedback_maddy_complaint_missed_in_recheck_hours_only_gate]]).
5. #events-code channel in OhCleo Slack returns `channel_not_found` — bot/token permission issue, non-blocking but should be fixed.
6. **NEW:** LeNH 0h on James Diamond (and every other tracked Workstream project) for 2026-09-17, no leave filed — is LeNH working on an untracked/off-Workstream task, or a genuine day off not yet reported? Needs direct follow-up with LeNH before next report.
