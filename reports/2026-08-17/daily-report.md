# Daily Report — 2026-08-17 (Monday)

**Run:** 2026-08-17T07:05:00+07:00 (cron)
**Window:** 2026-08-14T07:35:00+07:00 → 2026-08-17T07:05:00+07:00 (~3 days, spans weekend)
**Leave plan (today, from Delivery - Resource Arrangement):** SangNV (giải quyết việc cá nhân), ThuongNL (về quê), ThuongNTN (giải quyết việc cá nhân). No other confirmed leave for 17/08.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack Xtreme (Maddy) | Madhuraka: "I cannot see a ticket for the email I sent to you on 24 Jul. They urgently need that live." — unanswered since 2026-08-15 11:07, urgent client ask |
| 2 | Slack RDC (Franc) | dmetiner asked to deploy favorites-bar feature to turkiye@ domain — unanswered since 2026-08-14 12:23 (~3 days) |
| 3 | Slack Equanimity (Marcel) | komal.bailur asked whether RealTimeLogs/attendance logs exist for the 13–14 Aug Kenpal device-scan failure — unanswered since 2026-08-14 10:28 |
| 4 | Slack Swift Studio (Rory) | roryh asked about MindBody API waiver-integration endpoint — unanswered since 2026-08-14 10:37 |
| 5 | GitHub Elena-SamGuard | PR #309 "Implement header and modal components with i18n support" — mergeable=CONFLICTING, 28 files/+1227/-587, open since 08-11, no formal reviews — needs manual conflict resolution, cannot auto-merge |
| 6 | Matrix NUS-Bailey-Paturevision | RDS upgrade broke staging login (14/08 14:03) — tuannt/havs investigating, no resolution confirmed in window |
| 7 | Slack OhCleo (Celine DM) | Celine asked (Fri 11:57) whether dev-done items can be cleared "on Monday" (=today) for a new version submission — needs response today |
| 8 | Workstream | Session-wide outage this run — SSO cookies alive, 2 full login attempts (4 browser sub-attempts), token never captured. Blocks task-log actuals for LongVV/PhucVT/KhanhHH/LeNH-tracked projects (Maddy, James Diamond, Aysar, Elliott, Blair Brown, Fountain Parts 2-3) |
| 9 | Trello (Philip) | MS Teams login stuck in Microsoft security-challenge loop ("Help us protect your account") — chronic, known recurring issue, not fixed this run |
| 10 | New Relic MPFC | Apdex 0.57 (poor). `WP_Error::get_method()` fatal 308x (chronic). SQLi `WAITFOR DELAY` probe active on `/search/`. `checkout/klarna-confirmation` avg 29.1s (1 call) — payment-flow slowness |
| 11 | New Relic OhCleo | `MediaByKeyView.get` avg 12.8s/1050 calls — growing (was 7.7s/237 calls in prior report) |
| 12 | Slack Solid Code (Arthur) | Still missing from `.slack-accounts.json` on this server — known recurring gap, David's Chrome Profile 15 absent |
| 13 | Upwork (Rory/Aysar/Neural) | carrick session expired, headless re-login timed out (30-60s nav timeout) — manual re-auth needed, not alert-gated per policy |

**Today (Mon 17):** SangNV, ThuongNL, ThuongNTN on personal leave. All other staff present.

---

## Email — all 10 accounts — 07:20 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | Zoho sign-in security alert (routine, own login) | no events |
| carrick@nustechnology.com | 6 | [Elliott - Generator Lifestyle - Bug #80310] Tested on Staging | no events |
| nick@nustechnology.com | 23 | none (Azure DevOps PR noise, CNA.Operations.App — unrelated project) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 33 | Fountain/InfinityRoses/FirstProject Rollbar+BugSnag production alerts (routine monitoring noise, already tracked in Fountain piece) | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting (Google Meet) |
| kai@nustechnology.com | 14 | Madhuraka/Anoma JIRA mentions on LIFM2-455/449/436/454/434/459 | no events |
| ken@nustechnology.com | 80 | Precognize SR-7641 "bondalti no tag alerts since v9.2" bug thread | 3 Teams standups (DE Daily Standup x2, Tech Talks) |
| vuongtrancr@gmail.com | 18 | "Signal lost for 10 minutes on 'Low Application Throughput'" (Swish APM) — matches HIGH filter | — |
| dnduongus@gmail.com | 45 | none (no breach/unauthorized-login alerts; rest is newsletters/LinkedIn/bank, ignored per filter) | — |
| davidztv19@gmail.com | 6 | none (SaaS notification noise — MongoDB/Railway/Basecamp/Atlassian, not client mail) | — |
| freelancer@mypersonalfootballcoach.com | 1 | none (ChatGPT notification, not client mail) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete. **Check mail card marked done (6/6).**

---

## Slack — all 14 workspaces — 07:35 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 68 (1 in Aysar MPDM) | Carrick's Fri 08-14 update: outdated game count fixed+deployed, Aysar review PR merged, localization font-switch in progress. No update yet today (not due until later per pattern). |
| RDC - FM Monitoring | 67 | Mostly tuner access-logs/rpi-reboot automated logs. Human channel: dmetiner unanswered deploy ask (see Alert #2). |
| Swift Studio | 1 | roryh unanswered MindBody API question (see Alert #4) |
| Xtreme Soft Solutions | 2 | Madhuraka unanswered urgent ticket ask (see Alert #1) |
| SAM GUARD - Mobile | 0 | quiet |
| GLOBAL GRAZING SERVICES | 0 | quiet (auth verified valid — genuine 0, not auth failure) |
| Amazing Meds | 0 | quiet (auth verified valid) |
| Generator | 0 | quiet (auth verified valid) |
| LegalAtoms | 0 | quiet |
| MyPersonalFootballCoach | 0 | quiet |
| William Bills | 0 | quiet |
| Equanimity | 46 | Carrick/komal.bailur resolved most of a device-scan + SGBuildIndex data-push issue Fri; 1 question left unanswered (see Alert #3) |
| SoCal Auto Wraps | 0 | quiet (no longer monitored per project drop) |
| Aigile Dev | 2 | automated newsletter bot + empty alert-channel post, no signal |

Trello: MPFC, Raymond-LegalAtoms, Andrew Taraba, Rebecca, Colin ✓ complete. Maddy, Rory, Aysar, Franc, Elliott, Marcel ⚠️ skipped (see alerts / Workstream outage).

---

## Discord — AirAgri + Bizurk — 07:42 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 21 | Vinn's daily report present. Jeff's daily report present ("4 hours" — Google Play permission fix, GPS timeout handling). Active back-and-forth with James Diamond on hazard-zone UI, no blockers. |
| Bizurk (nuscarrick) | 0 | quiet, no Andrew DMs |

Trello: James Diamond item — Discord clean but ⚠️ skipped (sheets phucvt unverifiable, Workstream outage). Andrew Taraba ✓ complete.

---

## Sheets — all developers — 07:50 (+07:00)

🔴 **Workstream unavailable this entire run** — SSO cookies alive, browser flow completed 2 full login attempts (4 sub-attempts total), token never captured ("SSO redirected but API never fired"). This blocks live task-log data for LongVV/PhucVT/KhanhHH/LeNH (all projects except Bailey are Workstream-primary). Google Sheets fallback returned 0h across all 13 sheets for all 5 devs on 2026-08-14 — consistent with the documented full migration off Sheets (not a real 0h finding, non-diagnostic).

| Developer | 08-14 (Fri) | Status |
|-----------|-------------|--------|
| LongVV | unverifiable | Weekly target — not alertable on single day regardless |
| PhucVT | unverifiable | Workstream down; Sheets 0h is non-diagnostic (project migrated off Sheets) |
| TuanNT | 0h, **confirmed leave** | Child hospitalized overnight 08-13→14 ("con em nhập viện đêm qua") — confirmed via own Matrix room + Delivery-Resource-Arrangement note ("Bên Bailey ko bù"). Not an alert. |
| KhanhHH | unverifiable | Workstream down |
| LeNH | unverifiable | Workstream down |

**Maddy JIRA weekly cross-check:** could not run — script requires Workstream task-log data to cross-reference JIRA tickets, same outage (`Workstream auth failed: spawnSync /bin/sh ETIMEDOUT`).

Trello: John Yi, Rebecca ✓ complete (TuanNT leave-confirmed, Slack clean — these gates don't depend on the down Workstream data). Maddy, James Diamond, Aysar, Elliott, Blair Brown ⚠️ held (Workstream-dependent, unverifiable this run).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-16) — 07:52 (+07:00)

0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — full 3-part check — 08:05 (+07:00)

**Part 1 — Matrix Plan:** Last posted plan (Mon 08-10, 16:30, trinhmtt): ThinhT 4h, ViTHT 40h, DatNT 40h, LamLQ 16h => QC 25h. **This week's plan (08-17) not yet posted** — normal, expected ~08:30-09:30, checked at 07:05. Note: current active dev roster is ThinhT/ViTHT/DatNT/LamLQ (not the skill's static ViTHT/ThinhT/VuTQ list — VuTQ still active but not in latest plan line).

**Part 2 — Task Log Actuals:** 🔴 Unverifiable — Workstream (primary source, project `fountain`) down this run; Sheet fallback (`1iIKfjAh...`) also returned 0h for all of ThinhT/ViTHT/DatNT/LamLQ/HungPN/PhatDLT on 08-14, consistent with full migration off Sheets. Per [[feedback_fountain_tasklog_not_monitored]] individual 0h is never alert-gated anyway, but the WEEK total can't be verified this run.

**Part 3 — Plan vs Actual:** Cannot compute — actuals unavailable (see above).

**Trello Board (Web Development — Fountain):**
- 0 new customer comments (kunalsheth/tmmckay/mike62798179/iris63293413) since window start
- Active work cards: 14 (doing:5 qc_internal:8 in_qa:1)
- Stuck (>5d no activity, active lists only): 10 — oldest is "Infinity - GiftDrop Recipient flow" (19d, in qc_internal)
- Hard-to-release (doing 14+d): 0

Context from Matrix "Kunal - Fountain" room: beta-site login issue reported Fri (resolved same day per PR #470 merge by vutq), checkout-review-page redirect bug still open (pre-existing, not new), timezone cutoff edge case deferred ("ổn định mấy ngày trong tuần đã"). hungpn off today (personal, announced Fri 23:15).

Trello: Fountain ⚠️ held (actuals unverifiable this run, per prior-outage precedent).

---

## Elena — 08:10 (+07:00)

**PRs (duongdn):** 1 open — PR #309 "Implement header and modal components with i18n support", mergeable=**CONFLICTING**, 28 files changed (+1227/-587), open since 08-11, CodeRabbit passed but no formal reviews. Cannot auto-merge — needs manual conflict resolution. No new PRs this window.

**Precognize (nusken):** 0 open PRs — clean.

**WordPress SamGuard (samguard.co):** 0 CSP violations, 0 JS errors, 0 page errors. `failedRequests` are only GA/ads analytics noise (filtered). Clean.

Trello: Elena-SamGuard ⚠️ skipped (PR #309 conflict). Elena-WordPress-SamGuard ✓ complete.

---

## Matrix — 07:15 (+07:00)

**Active rooms: 22 / 139 | Messages: 474** *(since 2026-08-14 07:35)*
Full details: reports/2026-08-17/matrix-rooms-0715.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| (unnamed, resource room) | 17:03 | thuyltt: "khi nào có info bên Lễ thì báo t nha Dương" — asking for holiday/event info once available |
| Celine - OhCleo | 09:14 | longvv: "e nhớ đợt a Dương có setup con rollbar gì đó thì phải, để e xem thử" — asking to confirm Rollbar setup for OhCleo subscription-check issue |

### Key updates

**OhCleo (Celine - OhCleo, 201 msgs):** Heavy internal dev triage all Fri (longvv/luhx/hungpn/minhtv) — subscription check flow, content-preference tag/keyword search UX, "show anyway" filter toggle. hungpn off today (personal). No customer messages in this room (Slack DM has the Celine ask, see Piece 12).

**Bailey (NUS - Bailey - Paturevision 2026):** RDS upgrade broke staging login Fri 14:03 ("login nó toang gòi") — tuannt/havs investigating, no confirmed fix in window (see Alert #6).

**Leave plan (Delivery - Resource Arrangement):** TuanNT (14/08, child hospitalized, Bailey not made up), ViTHT (14/08 sick, Kunal not made up), ThinhLD (14/08 sick), VinhNT (18-19/08 upcoming), SangNV/ThuongNL/ThuongNTN (17/08 = today, personal).

**Delivery Department (week 17/8 plan):** LongVV → Maddy + Brad (Auction Warehouse, replacing PhucVT), off Celine/OhCleo this week. PhucVT → switching project (per duongdn 05:43 note).

**Arthur - Meta-Stamp:** namtv/phucvt handling client PII-estimate + urgent item request (TienND off that day) — addressed same day, see Piece 13.

**PHP Projects:** duongdn personally engaged in ongoing tenant power-outage/device-resync investigation (recurring issue, not newly escalated).

**Other:** Brad Ballantine approved Auction Warehouse limit increase to 25h/week (good news). Elena - Active Alerts room = internal infra chatter (Maven artifactory IP/download issue, Java upgrade) — unrelated to Elena-SamGuard client gate.

---

## OhCleo Slack — 08:15 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 2 | Tony's daily report present (11:30 Fri — Mobile-BE content preference API, email flow branch update, tag selection). Celine asked 11:57 (see Alert #7). |
| #events-code | error | `channel_not_found` — could not verify this run |

Trello: Ohcleo ⚠️ skipped (Celine's Monday question unanswered as of report time).

---

## Performance — all 4 projects — 08:20 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| OhCleo (prod) | 0.93 | 413ms | 2.69% (1889/70255) — 1750 NotAuthenticated (benign) | 16.3/min |
| MPFC | 0.57 (poor) | 1016ms | 0.43% (414/96710) | 22.5/min |
| Fountain Gifts | 0.99 | 109ms | 0.01% (6/82931) | 19.3/min |
| InfinityRoses | 0.96 | 216ms | 0.01% (4/42859) | 10.0/min |

**OhCleo topErrors:** NotAuthenticated 1750, InvalidToken 46, ValidationError (email exists) 23, ValidationError (username exists) 19, AuthenticationFailed "User does not exist" 16, combined email+username exists 9, "Passwords don't match" 7, InternalError read-only-transaction UPDATE 4, SSL connection closed unexpectedly 4, invalid email format 4.
**OhCleo slowestTransactions:** MediaByKeyView.get 12758ms/1050 calls (⚠️ growing, was 7.7s/237 in prior report), HomeMediasView.get 2188ms/1727, MediaListView.get 2121ms/16, CreatorPayoutHistoryView.get 1505ms/3, MediaRecommendsView.get 1168ms/2432.

**MPFC topErrors:** `WP_Error::get_method()` fatal 308, "continue targeting switch" warning 76, Countable warning 4, mysqli getaddrinfo failure 4, legacy-widget.php require failure 3, version.php require failure 3, mkdir filename-too-long 3, mysqli no-such-file 3, add_action() undefined 2, get_header() undefined 2.
**MPFC slowestTransactions:** sitemap_index.xml 36559ms/3, author-sitemap.xml 35060ms/3, checkout/klarna-confirmation 29130ms/1 (⚠️ payment flow), admin-ajax heartbeat 15910ms/78, SQLi WAITFOR-DELAY probe on /search/ 13878ms/1 (⚠️ active attack pattern, chronic).

**Fountain topErrors:** ArgumentError wrong-args 6 (chronic), BadRequest EOFError 2, InvalidAuthenticityToken 2.
**Fountain slowestTransactions:** gifts/all 6465ms/1, paypals/authorize_order 3043ms/5, payment_intents/create 1757ms/61, build_a_box_gift_variants 1351ms/286, registrations/create 981ms/17.

**Infinity topErrors:** ArgumentError wrong-args 4 (chronic), InvalidAuthenticityToken 1.
**Infinity slowestTransactions:** admin/gift_variants/update 5501ms/371, paypals/authorize_order 2887ms/2, SmsWorker 2024ms/1, payment_intents/create 1453ms/14, search/search 1404ms/88.

---

## Arthur / Meta-Stamp — 08:30 (+07:00)

**Sources checked:** Matrix (2/2 rooms — Arthur-Meta-Stamp + technical setup), GitHub (davidztv, 0 open PRs, 3 commits).
**Sources unavailable:** Slack Solid Code (still missing from `.slack-accounts.json`, David's Chrome Profile 15 absent on this server — known recurring gap), Workstream Crystal lang (same session-wide outage as Sheets piece).

**Matrix — Arthur-Meta-Stamp (7 msgs):** Client asked (via namtv relay) to estimate+handle 2 items: (1) PII stripping — urgent, (2) another update item. TienND was off that day so phucvt picked it up. namtv directed to prioritize the PII item then return to the Brad Ballantine work.

**GitHub (Christebob/Meta_Stamp_V3):** 0 open PRs (last was #13, merged 07-13, all recent work lands direct-to-main). 3 commits 08-14 06:19-06:57 UTC by davidztv: `fix(mcp): strip contact PII from pull_content and pocket listings`, `fix(mcp): drop internal s3_key/s3_bucket from agent-facing payload`, merge commit. **This directly resolves the PII item the client flagged that same morning** — same-day turnaround, no unresolved item.

No unresolved client question found in available sources. Following the established 2/4-source partial-verification precedent (Slack Solid Code + Workstream both down, same as multiple prior runs).

Trello: Arthur-Meta-Stamp ✓ complete.

---

## Upwork Memo Validation — 2026-08-14 — 08:35 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | session_login_failed — carrick live-cookie + stored + headless re-login all failed (30s nav timeout) |
| Aysar | error — 60s nav timeout |
| Neural Contract | error — 60s nav timeout |

Session/Cloudflare-type failure across the board this run — per policy this is not memo-invalid, no alert. Manual re-auth recommended: `DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick`.

---

## Trello — Check Progress + Check Mail — 08:40 (+07:00)

**Check Mail:** DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete (6/6). **Card marked done.**

**Check Progress (9/23 complete):**
- ✓ complete: John Yi, MPFC, Raymond-LegalAtoms, Neural Contract, Andrew Taraba, Rebecca, Colin, Arthur-Meta-Stamp, Elena-WordPress-SamGuard
- ⚠️ skipped: Maddy (customer complaint unanswered), James Diamond (Workstream outage), Rory (client question unanswered), Aysar (Workstream outage), Franc (client deploy request unanswered), Elliott (Workstream outage), Marcel (client question unanswered), Elena-SamGuard-DigitalPlant (PR #309 conflict), Bailey (RDS/login issue unresolved), Fountain (actuals unverifiable), Philip (chronic MS Teams login loop), Ohcleo (Celine's Monday question unanswered), Blair Brown (Workstream outage)

Card not fully complete — held open pending the items above.

---

## Reminders — 08:42 (+07:00)

Cannot reliably identify 0h devs this run — the only hours data available (Sheets fallback) returned 0h across the board for all 5 tracked devs, which is non-diagnostic given the confirmed full migration to Workstream (currently down). TuanNT's 08-14 0h is separately confirmed as leave (child hospitalized). No reminder candidates identified with confidence this run; none sent (no `--send-reminder` flag present regardless).

---

## Unresolved questions

1. Should the Trello "Check Progress" gate mapping be updated to reflect Fountain's actual current dev roster (ThinhT/ViTHT/DatNT/LamLQ) instead of the stale ViTHT/ThinhT/VuTQ list?
2. Workstream SSO captured cookies but never returned a token across 2 full attempts (4 sub-attempts) — worth escalating to check if the `workstream` Keycloak client changed behavior, since this is now a multi-day recurring pattern per timeline history.
3. OhCleo `#events-code` channel returned `channel_not_found` — bot may have been removed or channel ID changed; needs one-time verification outside this run.
