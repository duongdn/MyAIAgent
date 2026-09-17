# Daily Report — 2026-09-18 (Friday)

**Run:** 2026-09-18T05:00:00+07:00 (cron)
**Window:** 2026-09-17T08:40:00+07:00 → 2026-09-18T05:00:00+07:00
**Leave plan:** KhanhHH off sick (đau đầu, sổ mũi) chiều 09-17. LongVV "chăm ba" idle 09-17. TriNM off chiều 09-17 (đau đầu). TuanNT off chiều 09-18 (đi ăn cưới, Bailey ko bù). ToanNT off 09-17 (personal). ThinhLD off 09-21.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email — Rick | Fountain BugSnag: recurring `SocketError in admin/product_catalogs#destroy` (staging) + `NoMethodError in GET /gifts/all`. InfinityRoses new prod error #456 `NoMethodError: undefined method`. FirstProject: 10 occurrences/5min #620 TypeError + #127 unknown + 1,000th occurrence milestone. |
| 2 | Elena GitHub | PR #309 (`nustechnology/Elena-SamGuard-Digital-Plant`) open since 2026-08-11, `mergeable: false` (conflict), CodeRabbit review skipped (base branch not default) — stale ~5wk, needs manual conflict resolution. *(Elena is on the paused Ignore List — noted here for visibility, not blocking.)* |
| 3 | Equanimity Slack | Ongoing unresolved technical issue in #xid-technologies: tenant146 timezone/pairing procedure bug, komal.bailur and carrick going back and forth, root cause still unclear as of 17:00 msg ("this is bigger than missing data"). |
| 4 | Workstream | **Full outage this run** — SSO login failed on 3 separate attempts (browser redirect completes, API token never fires, `ETIMEDOUT`). Blocks live dev-hours + reviewer/needsReview checks for ALL projects except Bailey (Sheets-only). |
| 5 | Sheets (all 13, cross-check) | ViTHT/ThinhT/VuTQ/PhatDLT/HungPN/PhucVT/LongVV/TuanNT/KhanhHH/LeNH all show 0h across every sheet for 2026-09-17 — consistent with prior migration of actuals to Workstream (Fountain's Est/Charged tab confirmed stale since 2026-07-13), so this is NOT treated as a real 0h finding. With Workstream also down, **dev-hours cannot be verified this run** — Maddy/John Yi/Aysar/Elliott/Bailey/Rebecca/Fountain/James Diamond Trello items left ○ pending recheck. |
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

Trello: Rory, Franc, MPFC, Raymond, Colin ✓ complete. Maddy, John Yi, Aysar, Elliott, Marcel left ○ (Marcel: real alert #3; others: hours unverifiable, WS down).

---

## Discord — all — 05:14 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | ~15 | jeff_trinh daily report present (4h: local data cleanup, quick action UI, Android permissions fix). dapackage/iamjon7 active on n8n phone-call integration + env deploy coordination. |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew DMs |

Trello: James Diamond ✓ complete (AirAgri active + daily report present). Andrew Taraba ✓ complete.

---

## Sheets / Workstream — all — 05:25 (+07:00)

🔴 **Workstream fully unavailable this run** — 3 separate login attempts (`workstream-fetch-project-week.js`, `workstream-login.js` x2) all completed the SSO/Keycloak browser redirect but the API token never fired (`spawnSync /bin/sh ETIMEDOUT`). This blocks live dev-hours AND the reviewer/needsReview check for every project except Bailey.

Google Sheets fallback: scanned all 13 sheets for 2026-09-17 for PhucVT, LongVV, TuanNT, KhanhHH, LeNH, ViTHT, ThinhT, VuTQ, PhatDLT, HungPN — **all returned 0h across every sheet**. This is consistent with the known migration of actuals to Workstream (confirmed for Fountain 2026-07-13; same pattern here for all devs) rather than a genuine 0h day — Matrix transcripts show TuanNT/VuTQ/KhanhHH/etc. actively working on Bailey/Elena/Fountain on 09-17. **Not treated as a shortfall alert** — treated as "hours unverifiable this run."

Maddy JIRA weekly cross-check: not run this run (Workstream JIRA sub-check depends on task-log data, time-boxed given WS outage — needs recheck).

Trello: Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, Fountain (Part 2/3), James Diamond's hours cross-check **left ○** pending Workstream recovery + recheck.

---

## Scrin.io — 05:27 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-17):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:30 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI`. trinhmtt posted Monday 09-14 08:57: "ViTHT: 40h ThinhT: 20h DatNT: 40h => QC 25h". Current week plan, cited.

**Part 2 — Task Log Actuals:** Unavailable — Workstream down, Fountain Sheet's Est/Charged tab is stale (moved to Workstream 2026-07-13), so Sheets fallback shows 0h across ViTHT/ThinhT/VuTQ/PhatDLT/HungPN (not a real 0h, see Sheets section above).

**Part 3 — Plan vs Actual:** Cannot compute without Part 2 data — deferred to recheck.

**Trello Board:** Not checked this run (time-boxed by WS outage recovery attempts) — needs recheck.

Trello: Fountain **left ○** pending recheck (Parts 2/3 + Trello board unresolved).

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

1. Workstream SSO outage — root cause not diagnosed (browser completes redirect, Keycloak cookies alive, but API token capture never fires across 3 attempts over ~10 min). Needs investigation if it recurs.
2. Elena PR #309 — 5-week-old unmergeable PR on a paused-monitoring project; flagging for awareness even though Elena is on the Ignore List. Does it need to be closed/rebased, or should Elena come off the Ignore List given active open work?
3. Fountain Trello board (customer comments, stuck cards) not checked this run — needs recheck along with Parts 2/3.
4. Maddy full 4-part check (JIRA cross-check + Bitbucket PR reply-rate) not run this run — time-boxed by Workstream outage recovery attempts. Needs recheck given prior history of this shallow-check gap missing real findings.
5. #events-code channel in OhCleo Slack returns `channel_not_found` — bot/token permission issue, non-blocking but should be fixed.
