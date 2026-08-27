# Daily Report — 2026-08-28 (Friday)

**Run:** 2026-08-28T06:09:00+07:00 (cron)
**Window:** 2026-08-27T08:56:00+07:00 → now
**Leave plan:** none flagged this window (see HRP room notes below)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | OhCleo Slack (Celine DM) | Celine reported audio bug (male/female voice tag flipping on web vs app) 17:44 08-27, asked "check first thing and let me know how much time to fix it" — unanswered as of this run |
| 2 | Matrix (Celine - OhCleo room) | phucvt flagged staging RAM at 94% / gunicorn worker-count issue, ⚠️-tagged directly at DuongDN, 15:57 08-27 — action item |
| 3 | Elena PR #309 | `nustechnology/Elena-SamGuard-Digital-Plant` PR #309 still `mergeable_state: dirty` (open 17 days, since 08-11) |
| 4 | Fountain Trello (customer comment) | mike62798179 08-27 21:01: "Finding solution to customers receiving incorrect delivery dates... any update on this? This has become an everyday issue with range of 2-7 orders" — unanswered |
| 5 | rick@ email | 3 Rollbar Daily Summary alerts (InfinityRoses x2, FirstProject x1) — routine digest, not verified as new production errors |
| 6 | carrick@ email | 1 Rollbar "Test message" (Baamboozle) — looks like a test, not a real error |
| 7 | vuongtrancr@gmail.com | 8x New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" — Swish project monitoring |
| 8 | freelancer@mpfc email | Rollbar MPFC Daily Summary — routine digest |
| 9 | Workstream | SSO login failed 3 genuine attempts this run (browser opens, SSO cookie alive, but access token never captured) — blocks hour-gated Trello items: Maddy, John Yi, Elliott, Bailey, Rebecca, Blair Brown |
| 10 | MPFC Performance | apdex still poor 0.52 — chronic WP_Error::get_method() (53x) + "continue targeting switch" E_WARNING (90x) + very slow sitemap/RSS feed endpoints (23-43s) |

**Today (Fri 28 Aug):** No leave requests surfaced this window. HRP room: PhongTH family matter (27/08, already handled by HaVS backup), SamHT back pain (idle/internal), KhanhPQ family (idle/internal), ToanNT NVQS paperwork trip 28/08 (idle/internal), James Diamond off confirmed 31/8.

---

## Email — all — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 3 | 0 | no events |
| carrick@nustechnology.com | 2 | 1 (Rollbar test msg) | no events |
| nick@nustechnology.com | 3 | 0 | no events |
| rick@nustechnology.com | 8 | 3 (Rollbar digests) | no events |
| kai@nustechnology.com | 1 | 0 | no events |
| ken@nustechnology.com | 80 | 0 | DE Daily Standup 08:30, DE Tech Talks 09:00, DE Daily Standup (dup) 08:30 |
| vuongtrancr@gmail.com | 11 | 8 (New Relic signal-lost) | — |
| dnduongus@gmail.com | 33 | 1 (Careerviet spam, ignorable) | — |
| davidztv19@gmail.com | 0 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 2 | 1 (Rollbar digest) | — |

Trello: DuongDn, Kai, Ken, Nick ✓ complete. Carrick, Rick ⚠️ left open (Rollbar alerts present, not yet triaged as benign).

---

## Slack — all 14 workspaces — 06:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 8 | Carrick's MPDM "Today's update" present (Stripe subscription auto-cancel fix); github build/PR/issue noise; testing-channel deploys |
| RDC - FM Monitoring | 18 | Routine tuner reboot/access logs, no alert |
| Swift Studio | 38 | Rory/Jeff dev discussion re: liability waiver flow, membership T&Cs button — project dev topic, not alert |
| Xtreme Soft Solutions | 8 | Kai daily progress present (LIFM2-449/461 updates); madhuraka conversation, Kai responsive |
| SAM GUARD - Mobile | 0 | — |
| GLOBAL GRAZING SERVICES | 1 | Nick's daily report present (#maintenance) — all OK |
| Amazing Meds | 0 | — |
| Generator | 0 | — |
| LegalAtoms | 0 | — |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 48 | Marcel/Carrick data-sync discussion (Gyre/SGBuildex record count mismatch, being resolved) — project topic, not alert |
| SoCal Auto Wraps | dropped | not monitored |
| Aigile Dev | 1 | Sentry morning check: 0 urgent new, 4 standing unresolved (routine) |

Trello: James Diamond, Rory, Aysar, Franc, MPFC, Marcel, Raymond, Andrew Taraba, Colin ✓ complete (per gate mapping). Maddy, John Yi, Elliott, Bailey, Rebecca ⚠️ left open — Workstream hours check blocked this run (see Alert #9).

---

## OhCleo Slack — 06:16 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 15 | Tony's daily report present 14:16 (Series feature dev-done + AWS SES tracking check + staging server weak). Celine reported audio male/female-voice-tag bug 17:44, asked for fix ETA — **unanswered** |
| #events-code | 0 | `channel_not_found` — bot removed from channel again (known recurring gap, not auth) |

Trello: Ohcleo ⚠️ left open — real unanswered customer bug report + fix-time ask.

---

## Discord — AirAgri + Bizurk — 06:11 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 9 | Vinn's daily report present (form config support); Jeff's daily report present (4h, file upload); Contractor App approved note |
| Bizurk (nuscarrick) | 0 (0 Andrew DMs) | — |

Trello: James Diamond ✓ (already completed above), Andrew Taraba ✓ complete.

---

## Sheets/Workstream — 06:20 (+07:00)

**Workstream SSO login failed 3 genuine attempts this run** (browser opens, "Sign in with SSO" clicked, Keycloak redirect/cookies confirmed alive both times, but the access-token API call never fires — same signature as the recurring 5+ week outage pattern, see `feedback_workstream_display_outage_pattern`). No dev-hour data available this run for LongVV/TuanNT/PhucVT/KhanhHH/LeNH across any Workstream project.

Blocked Trello items (hour-gated): Maddy, John Yi, Elliott, Bailey, Rebecca, Blair Brown. Needs interactive recheck once SSO is available.

Maddy JIRA weekly cross-check: not run this pass (time-boxed pending Workstream outage — script itself depends on a stale sheet per memory, low priority this run).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-27): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 06:25 (+07:00)

**Part 1 — Matrix plan:** Kunal - Fountain room active (33 msgs) — dev/QA coordination (Trello #3035 smart hybrid search, #2735 Fountain Pro send link, #2913 Infinity custom print item, CLAUDE.md code-quality feedback loop with VuTQ/DatNT). No explicit new weekly plan message found in this window (Monday-posted plan still governs, not yet due for a new post).

**Part 2/3 — Task log actuals vs plan:** Not verified this run (blocked by Workstream outage, same as above — `fountain` project id `cmpqcjojh00q2tk1v2qi7gs0j`).

**Trello board:** 1082 cards total. 1 new customer comment this window:
> mike62798179 (08-27 21:01): "Finding solution to customers receiving incorrect delivery dates in the delivery tab of checkout - @kunalsheth @rick570 Any update on this? This has become an everyday issue with range of 2-7 orders"

**Unanswered as of this run — real customer-facing alert.**

Trello: Fountain ⚠️ left open (unanswered customer complaint + Parts 2/3 unverified).

---

## Elena — 06:28 (+07:00)

- PR #309 (`Elena-SamGuard-Digital-Plant`, "Implement header and modal components with i18n support") re-verified live via `gh api` — still `mergeable_state: dirty`, unchanged since 08-11 (17 days open).
- Precognize (nusken): 0 open PRs — clean.
- WordPress SamGuard (`https://www.samguard.co/`): 0 jsErrors, 0 pageErrors, 0 cspViolations. Only benign GA/ads analytics `net::ERR_ABORTED` noise (ad-blocker-style browser behavior, not a real issue).

Trello: Elena - SamGuard ⚠️ left open (PR #309 conflict). Elena - WordPress SamGuard ✓ complete (clean).

---

## Matrix — 06:09 (+07:00)

**Active rooms: 22 / 144 | Messages: 591** *(since 2026-08-27 08:56)*
Full details: reports/2026-08-28/matrix-rooms-0609.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| Celine - OhCleo | 15:57 | phucvt: "Em điều tra thì thấy lúc có lúc RAM nó lên 94%, khả năng do server yếu. Em check thì mình đang chạy mặc định 4 gunicorn workers trên staging, em research thì thấy chắc phải down xuống 2 workers..." — staging perf issue, needs a decision ⚠️ |

### Key updates

**OhCleo — Series feature demo day, staging kept crashing** (267 msgs, all day):
- Team pushed Series feature to staging then production; staging server (1 CPU/1GB RAM) repeatedly died under test load, blocking Minh's client demo prep.
- phucvt traced it to RAM spiking to 94% / 4 gunicorn workers — recommended dropping to 2 workers (unresolved decision, see action item above).
- Series shipped to production 17:10, QC'd live, told Celine not to test until team does a final pass tomorrow morning.
- Unrelated NewRelic-flagged slow endpoint (MediaAddTrackAPIView.post 86.6s/5calls on staging) — team confirmed pre-existing/upload feature, not from today's work; reported as bug only, not blocking demo.

**Elena — DM/BA role clarity + ongoing estimate work:**
- anhnvn clarified DM vs BA role split for the team (LA still doubling as BA for now).
- Client-facing estimate work in progress for a new FE "occurrence" scope; internal miscommunication about when backend work starts, resolved among the team.
- Elena Active Alerts room also touched API-guide questions from anhttl to tuanntg — routine technical support.

**Rory / BXR App — payment dispute still open:**
- Khoa/Lữ logging hours; Rory ("lão") sent an Upwork bonus despite his account balance showing $0 — team still hasn't been paid in "hơn 1 tháng" (over a month). Known/ongoing issue, not new.

**Project Wrap Up - Preventive Actions (OhCleo QC complaint follow-up):**
- Team drafted and sent the lesson-learned report to chị Bình + Chiến per the defined template; root cause traced partly to PhucVT's earlier miss. Discussing adding a PM-level touchpoint so Celine feels more supported without losing her direct dev access. Being actively managed, no new unresolved ask surfaced this window.

**Other:**
- Delivery - Resource Arrangement: routine leave/idle-time bookkeeping (PhongTH, SamHT, KhanhPQ, ToanNT), James Diamond off confirmed 31/8, QC hour-limit increase (10h→20h/week) for a Leo Schaller-approved project queried by chientx, answered by anhnvn.
- Holiday Resource Plan: ThiHV idle (Nestor project paused) being reassigned toward Rory's backlog; Rory has a "payment problem" noted separately (matches BXR room above).
- Sandor Antal - Lyf Support: minor approved-partial-hours PR flow, routine.
- Thông báo KH nghỉ Lễ/Tết: holiday notice broadcast to clients, confirmed sent by 3 team members.

---

## Performance — both — 06:35 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.92 | 649ms | 2.9% (726/24835) — mostly NotAuthenticated/InvalidToken (benign) | 17.1/min |
| mpfc (prod) | 0.52 (poor) | 1100ms | 0.7% (160/23334) | 16.1/min |

**OhCleo top errors:**
| Error | Count |
|-------|-------|
| rest_framework.exceptions:NotAuthenticated | 679 |
| rest_framework_simplejwt.exceptions:InvalidToken | 19 |
| django.db.utils:ProgrammingError — column app_media.series_id does not exist | 11 |
| AuthenticationFailed — Passwords don't match! | 4 |
| AuthenticationFailed — User does not exist! | 4 |
| ValidationError — email already exists | 4 |
| ValidationError — username already exists | 4 |

⚠️ **NEW error class:** `column app_media.series_id does not exist` (11x) — likely a missing prod DB migration for the new Series feature shipped today (see Matrix section). Real bug, not benign noise.

**OhCleo slowest transactions:**
| Endpoint | Avg | Calls |
|----------|-----|-------|
| MediaAddTrackAPIView.post | 23.9s | 9 |
| MediaByKeyView.get | 19.7s | 386 |
| MediaByTagsView.get | 14.8s | 84 |
| HomeMediasView.get | 3.0s | 681 |
| RequestPayoutView.post | 2.4s | 1 |

**MPFC top errors:**
| Error | Count |
|-------|-------|
| E_WARNING — "continue" targeting switch equivalent to "break" | 90 |
| Error — Call to undefined method WP_Error::get_method() | 53 |
| E_COMPILE_ERROR — legacy-widget.php not found | 3 |
| E_WARNING — count(): Parameter must be array/Countable | 3 |
| E_WARNING — mysqli_real_connect getaddrinfo failed | 3 |
| E_WARNING — Invalid argument for foreach() | 2 |
| E_WARNING — mysqli_real_connect no such file | 2 |
| Error — Class 'MM_Event' not found | (see raw) |

**MPFC slowest transactions:**
| Endpoint | Avg | Calls |
|----------|-----|-------|
| author-sitemap.xml | 43.3s | 1 |
| sitemap_index.xml | 42.5s | 1 |
| search/de/feed/rss2/ | 23.7s | 1 |
| search/c/feed/rss2/ | 22.2s | 1 |
| search/from+first+to+last/feed/rss2/ | 14.2s | 1 |

All chronic/unresolved issues, consistent with prior weeks — no SQLi/malware-scan probes dominating this window (unlike some prior runs).

---

## Trello Progress — final state — 06:40 (+07:00)

✓ Completed: James Diamond, Rory, Aysar, Franc, MPFC, Marcel, Raymond, Neural Contract, Andrew Taraba, Colin, Elena - WordPress SamGuard (11 items)
⚠️ Left open: Maddy, John Yi, Elliott, Bailey, Rebecca, Blair Brown (Workstream SSO blocked), Elena - SamGuard (PR #309 conflict), Fountain (customer complaint unanswered), Ohcleo (customer bug unanswered), Philip (not yet checked — MS Teams fetch still running at report-write time), Arthur (not run this pass — time-boxed)

## Trello Mail — final state

✓ Completed: DuongDn, Kai, Ken, Nick
⚠️ Left open: Carrick, Rick (Rollbar alerts present, unverified severity)

---

## Unresolved / needs recheck

1. Workstream SSO — 3 failed attempts, blocks Maddy/John Yi/Elliott/Bailey/Rebecca/Blair Brown/Fountain Parts 2-3.
2. Philip (MS Teams) — script still running at write time, needs recheck.
3. Arthur/Meta-Stamp (Piece 13) — not run this pass, time-boxed given Workstream outage ate the run's time budget. Needs standalone recheck.
4. Upwork Memo (Piece 15) — not run this pass, needs recheck.
5. OhCleo `app_media.series_id does not exist` DB error (11x) — looks like a missed migration for today's Series feature ship, needs dev follow-up.
