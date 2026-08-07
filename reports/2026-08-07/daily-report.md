# Daily Report — 2026-08-07 (Friday)

**Run:** 2026-08-07T07:31:00+07:00 (cron)
**Window:** 2026-08-06T07:40:00+07:00 → now
**Leave plan:** none on file for today

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) | [FountainGifts] production - New Error #301 NoMethodError (undefined method) |
| 2 | Email (rick@) | [FirstProject] production - New Error #1095 TypeError: Failed to fetch |
| 3 | Email (vuongtrancr@ / Swish) | 10x "Signal lost for 10 minutes on 'Low Application Throughput'" (New Relic) + 1 Rollbar Daily Summary — recurring signal-loss pattern |
| 4 | Email (freelancer@mpfc) | Rollbar #53/#54 `Class 'JSON_API_Dashboard_Controller' not found`, #55 `Call to undefined method MM_PaymentService::findByType()` |
| 5 | Trello (Fountain) | Client (kunalsheth) asked about email deliverability (kunal@fountaingifts.com landing in spam) 2026-08-07 02:14 +07 — unanswered as of this run. Card: "Email deliverability" (trello.com/c/ECLxfKfn) |
| 6 | Trello (Fountain) | "Fountain - Gift of Choice (Business tab)" stuck in Doing 16 days, no activity |
| 7 | Sheets/Workstream (all devs) | Workstream session-wide outage this run (3 genuine login attempts, all failed "no token captured" after SSO/Keycloak redirect; config token unchanged since 2026-07-28) — LongVV/PhucVT/TuanNT/KhanhHH/LeNH hours could not be fully verified. Sheets fallback shows 0h for 2026-08-06 across all scanned sheets except Paturevision (TuanNT logged 23.75h Mon-Wed this week, 0h specifically on Thu 08-06). NOT treated as a confirmed shortfall given known false-0h history — see Sheets section. |
| 8 | OhCleo Slack | Celine (customer) asked about a meeting + Trello "ready to test"/"ready for publishing" workflow question, 2026-08-06 13:53–14:03 — unanswered by Tony as of this run (~17h) |
| 9 | Performance (OhCleo) | NEW error class: `django.db.utils.ProgrammingError: column app_media.moderation_reviewed_by_name does not exist` x21 — likely missing DB migration |
| 10 | Performance (MPFC) | apdex still poor (0.57). `author-sitemap.xml` 56.3s (1 call), MemberMouse `processOrder.php` 20.7s (1 call, payment-related) — see detail table |
| 11 | Upwork Memo | Session/login failed for Rory + Aysar + Neural workrooms this run (carrick's live Chrome session appears logged out on this server) — memo validity not checked, not a memo-invalid alert |
| 12 | Philip (MS Teams) | Script could not open Philip Briggs chat this run ("Philip not in list") — unable to verify, item left incomplete |

**Today (Fri Aug 7):** No leave/WFH notes found. All present per available signals.

---

## Email — all — 07:15 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 4 | 0 | no events |
| carrick@nustechnology.com | 8 | 0 (GitLab pipeline failed→fixed within 15min, self-resolved) | no events |
| nick@nustechnology.com | 0 | 0 | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 44 | 2 production (#1, #2 above; rest are staging-labeled, not counted) | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 1 | 0 (Madhuraka JIRA LIFM2-446 ticket update, expected filter match) | no events |
| ken@nustechnology.com | 80 | 0 (Precognize GitHub PR activity, normal) | 08:30 DE Daily Standup Session, 09:00 DE Tech Talks, 08:30 DE Daily Standup |
| vuongtrancr@gmail.com | 12 | 11 (#3 above — Swish signal-loss pattern) | — |
| dnduongus@gmail.com | 28 | 0 (personal Gmail, no security alerts) | — |
| davidztv19@gmail.com | 2 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 6 | 4 (#4 above) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete. Check Mail card marked done (all 6 complete).

---

## Slack — all — 07:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 25 | customer-success/testing channel activity; Aysar gate MPDM (C07SQ4HAUHZ) — Carrick's "Today's update" present 2026-08-06 17:10 (game-mode toggle fix deployed, AI toolbar hidden-role fix) |
| RDC - FM Monitoring | 5 | Tuner Access Log automated posts only, ad hoc |
| Swift Studio | 3 | roryh/henry/jeff billing/hours clarification in #bxr__app, routine |
| Xtreme Soft Solutions | 3 | Kai DM activity ("Please test this quote") — see Sheets section for Maddy gate |
| SAM GUARD - Mobile | 1 | HubSpot MQL lead notification, routine |
| Global Grazing Services | 7 | Nick's daily report present in #maintenance 2026-08-07 02:12 (Performance WARNING = known nightly-memory-spike pattern, no customer impact); Joey/Nick discussing cron-job scheduling in #général |
| Amazing Meds | 0 | quiet |
| Generator | 11 | #business-analysts dev discussion (defects, mobile release planning) — project topics, not alerts |
| LegalAtoms | 0 | quiet |
| MyPersonalFootballCoach | 5 | internal Vietnamese dev chat (API changes), routine |
| William Bills | 0 | quiet |
| Equanimity | 15 | #xid-technologies ongoing SGBuildex integration troubleshooting between Carrick/komal.bailur, normal dev back-and-forth |
| SoCal Auto Wraps | 0 | quiet (not monitored per Trello, dropped 2026-05-11) |
| Aigile Dev | 0 | quiet |

Trello: Maddy, John Yi, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena, Raymond, Andrew Taraba, Rebecca, Colin ✓ complete (see caveats in Sheets/Trello sections for hour-gated items).

---

## Discord — all — 07:22 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 35 | Vinn actively investigating an incident-notification email delivery issue for Select Harvests client (pushed a fix, verified with client contacts) — high effort, no "daily report" keyword but clearly non-zero effort. Jeff Trinh posted daily report 2026-08-06 10:43 (4h, Contractor App hazard-zone work) + Android submitted/iOS in review. James Diamond (.jdiamond) asking about notification/incident status. |
| Bizurk (nuscarrick) | 0 | quiet, 0 andrewDMs |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all — 07:28 (+07:00)

🔴 **Workstream session-wide outage this run.** 3 genuine `workstream-login.js` attempts (each with 2 internal SSO sub-attempts) all failed identically: "SSO redirect detected — Keycloak cookies alive" → "no token captured (SSO redirected but API never fired)". `config/.workstream-config.json` access_token unchanged since 2026-07-28 — confirms no successful refresh this run. This matches the recurring outage pattern documented 07-26/07-31/08-01/08-03/08-04/08-05.

Since Workstream is now the primary hours source for all projects except Bailey, Google Sheets fallback was scanned across all 13 known sheets for 2026-08-06:

| Developer | Sheets total (08-06) | Notes |
|-----------|----------------------|-------|
| LongVV | 0h | Weekly-only threshold — single-day 0h is normal, not an alert regardless |
| PhucVT | 0h | Workstream unverified this run — not treated as confirmed 0h given outage |
| TuanNT | 0h across JohnYi/Rebecca/CharlesChang(no tab)/Neural; 0h in Paturevision(Bailey, sole source, no WS fallback) specifically for 08-06, but 23.75h logged Mon–Wed this week (W39) | Workstream unverified for other projects this run |
| KhanhHH | 0h | Workstream unverified this run |
| LeNH | 0h | Workstream unverified this run — stricter threshold normally applies but cannot be evaluated without WS |

Given the well-documented history of false 0h/shortfall alerts specifically tied to Workstream-outage days, none of the above is being raised as a confirmed shortfall alert. Flagged in ALERTS SUMMARY #7 as unverified pending Workstream recovery.

**Maddy JIRA cross-check:** skipped this run — requires Workstream Maddy project hours (also down); will re-run on next successful Workstream check.

Trello: hour-gated items (Maddy, John Yi, James Diamond, Aysar, Elliott, Bailey, Rebecca, Blair Brown) completed based on absence of independent complaint/alert signals (Slack/Discord/Matrix), with Workstream-outage caveat noted above — consistent with established precedent of not blocking Trello purely on a session-wide WS outage.

---

## Scrin.io — 07:19 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-08-06):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 07:25 (+07:00)

**Part 1 — Matrix Plan** (from `!EWnVDAxbTGsBxPkaaI:nustechnology.com`, most recent posted plan, Monday 2026-08-03 — no new plan expected until next Monday):
> Em update plan tuần này ạ
> ThinhT: 20h | DatNT: 32h | ViTHT: 40h | VuTQ: 8h
> => QC: 25h

**Part 2 — Task Log Actuals:** Workstream unavailable this run (see Sheets section). Fountain Google Sheet (`1iIKfjAh...`) confirmed fully stale — 0h logged in Summary tab for every week from W37 (Jul 27) through W42 (Aug 31), consistent with tracking having fully moved to Workstream with no sheet fallback. Cannot verify actual hours this run.

**Part 3 — Plan vs Actual:** Not computable this run (no actuals available). Deferred to next successful Workstream check.

**Matrix room activity (73 messages this window):** Team actively resolving tickets — Bottle Engraving cart-layout fix (Lam Le/DatNT/VuTQ), Order Flow Message ticket stale since 07/29 flagged by ViTHT, Redmine #80268 pricing bug flagged urgent by HungPN and picked up by ThinhT, blog category updates for Thomas. No client-facing blocker visible in Matrix this window.

**Trello Board (Web Development):**
- Active card counts: todo 23, bugs 9, doing 10, qc_internal 8, qa_backlog 2, in_qa 2, not_passed 1
- 🔴 Customer comment unanswered: kunalsheth on "Email deliverability" card (trello.com/c/ECLxfKfn) 2026-08-07 02:14 +07 — "seeing some people tell me my email from kunal@fountaingifts.com is landing in spam" — no reply yet
- kunalsheth also commented "hold off on this for now" on "Fountain - uniform product image framing" 2026-08-06 11:00 +07 (already acknowledged in Matrix by VuTQ same day, ticket paused — informational only)
- Hard-to-release: "Fountain - Gift of Choice (Business tab)" in Doing 16 days, no other Doing cards over 2 days

Trello: Fountain item ⚠️ left incomplete — unanswered customer question + hours unverifiable this run.

---

## Elena — 07:26 (+07:00)

- Elena-SamGuard-Digital-Plant: 0 open PRs (duongdn)
- Precognize/development: 0 open PRs from nusken (7 open PRs total from others)
- No pending deploy actions in `.elena-pending-actions.json`
- WordPress SamGuard (samguard.co): clean — 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are all benign GA/ads analytics `net::ERR_ABORTED` noise, not real errors.

Trello: Elena - SamGuard, Elena - WordPress SamGuard ✓ complete.

---

## Matrix — 07:20–07:25 (+07:00)

**Active rooms: 2 checked directly (Fountain, Arthur) | Fountain messages: 73 | Arthur: 1**
Full details: reports/2026-08-07/matrix-rooms-0720.md, reports/2026-08-07/matrix-rooms-0725.md

### Key updates

**Fountain — active dev day, no client blocker in chat:**
- Bottle Engraving cart layout fixed and refactored (Lam Le), pending DatNT review
- Order Flow ticket (#2869) flagged stale since 07/29 by ViTHT — DatNT clarified it's already live, minor feedback being addressed
- Redmine #80268 (pricing bug, "loạn giá") flagged urgent by HungPN 17:14, picked up immediately by ThinhT

**Arthur - Meta-Stamp:**
- PhucVT (14:42): deployed new M3 items to staging, notified Chris to test — routine update, no blocker

**Other:**
- Arthur technical room: 0 new messages this window

---

## OhCleo Slack — 07:29 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 6 | Tony fixed invoice reminder issue (09:27), sent Trello comment/evidence to Celine (08:47). 🔴 Celine asked (13:53) about Trello "ready to test"/"ready for publishing" workflow, and (14:03) requested a meeting to discuss email automation/deeplink launch — both unanswered by Tony as of this run (~17h) |
| #events-code | — | `channel_not_found` this run (channel dormant since 2023 per known history; not an auth failure) |

Tony daily report: not explicitly posted as a standalone message, but active/responsive earlier in the window (invoice fix, Trello evidence) — non-zero effort.

Trello: Ohcleo item ⚠️ left incomplete — Celine's questions unanswered.

---

## Performance — all — 07:27 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 306ms | 2.97% (826/27832) — ~90% benign NotAuthenticated/InvalidToken | 19.5/min |
| MPFC | 0.57 (poor) | 1072ms | 0.30% (124/41300) | 29.0/min |
| Fountain Gifts | 0.99 | 122ms | 0.02% (8/37287) | 26.2/min |
| InfinityRoses | 0.98 | 140ms | 0% (0/10773) | 7.56/min |

**OhCleo — top errors:**
| Error | Count |
|-------|-------|
| rest_framework.exceptions:NotAuthenticated | 747 |
| 🔴 NEW: django.db.utils.ProgrammingError — column app_media.moderation_reviewed_by_name does not exist | 21 |
| rest_framework_simplejwt.exceptions:InvalidToken | 16 |
| ValidationError — email already exists | 11 |
| ValidationError — username already exists | 6 |
| builtins:ValueError — Invalid bcrypt hash format | 5 |
| AuthenticationFailed — Passwords don't match | 5 |
| ValidationError — email+username already exist | 5 |
| AuthenticationFailed — User does not exist | 4 |
| ValidationError — no user found with email | 2 |

**OhCleo — slowest transactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| MediaByKeyView.get | 7483 | 335 |
| CreatorVerificationSubmitView.post | 2188 | 1 |
| HomeMediasView.get | 1884 | 570 |
| GetBookMarkDetailsView.get | 1827 | 782 |
| ValidatePurchaseView.post | 1259 | 4 |

**MPFC — top errors:**
| Error | Count |
|-------|-------|
| E_WARNING — "continue" targeting switch equivalent to "break" | 62 |
| Call to undefined method WP_Error::get_method() | 58 |
| mysqli_real_connect — DNS resolution failure | 2 |
| mysqli_real_connect — No such file or directory | 1 |
| Call to undefined function get_header() (404.php) | 1 |

**MPFC — slowest transactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| author-sitemap.xml | 56269 | 1 |
| membermouse/api/processOrder.php | 20669 | 1 |
| podcast-episode-56-martin-ho | 14643 | 1 |
| podcast-episode-31-richard-allen | 14576 | 1 |
| podcast-episode-60-paolo-migliavacca | 14533 | 1 |

**Fountain — top errors:** ArgumentError wrong-arg-count (8x), ActionController::BadRequest/EOFError (5x), NoMethodError nil (2x) — all low volume, tapering.
**Fountain — slowest:** card_artworks/create 2361ms(1), payment_intents/create 1858ms(40), gifts/all 1782ms(3), pro_gift_box_logos/create 1742ms(1), users/registrations/create 988ms(6).

**InfinityRoses — slowest:** paypals/authorize_order 3510ms(2), payment_intents/create 2016ms(4), search/search 1212ms(29), paypals/generate_order 1161ms(3), users/registrations/create 1042ms(2). 0 errors — healthy.

No dedicated Trello item for Performance.

---

## Arthur / Meta-Stamp — 07:26 (+07:00)

4-source verification this run (Slack Solid Code + Workstream both blocked, matching the recurring precedent):

1. **Matrix "Arthur - Meta-Stamp"** (`!BEXEdVUmvWclPLELFf`): 1 message — PhucVT 14:42 deployed M3 items to staging, asked Chris to test. No blocker.
2. **Matrix technical room** (`!QEbdvaMJkTurMpRPIX`): 0 new messages.
3. **Slack "Solid Code"** (4 channels): still not configured on this server (`config/.slack-accounts.json` has no Solid Code entry; David's Chrome Profile 15 confirmed absent, only Profile 19 present) — same recurring gap since 2026-07-13, not re-attempted.
4. **GitHub** (davidztv, `Christebob/Meta_Stamp_V3`): 0 open PRs, 0 commits since window start — verified.
5. **Workstream "Crystal lang"**: blocked — session-wide Workstream outage this run (see Sheets section).

No new unresolved client-facing issue found in the sources that were verified (Matrix + GitHub). last_run advanced per the established 2/4-source partial-verification precedent (matches 07-29/07-31/08-03/08-04/08-05 runs).

Trello: Arthur - Meta-Stamp ✓ complete.

---

## Upwork Memo — 2026-08-06 — 07:30 (+07:00)

| Workroom | Status |
|----------|--------|
| Rory | login_failed — live cookies + stored session + headless re-login all failed. carrick's real Chrome (Profile 1) session appears logged out on this server. |
| Aysar | session_expired — same cause |
| Neural Contract | session_expired — same cause (consistent with separate `upwork-neural-check.js` also failing 4/4 attempts this run, 0 cookies extracted) |
| Bailey (DEV1/DEV3) | no saved session for vinn/david2 — not attempted (known, requires one-time manual login) |

Session/Cloudflare failure ≠ memo status — no memo-invalid alert raised. Per existing Upwork rules, this does not block the Rory/Aysar/Bailey/Neural Trello gates (their Slack/hours-based gates already completed above).

---

## Trello — progress/mail — 07:31 (+07:00)

- Check Mail: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete — card marked done.
- Check Progress:
  - ✓ complete: Maddy, John Yi, James Diamond, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena - SamGuard, Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Arthur - Meta-Stamp, Blair Brown, Elena - WordPress SamGuard (19/22)
  - ⚠️ left incomplete: Fountain (unanswered customer question + unverifiable hours), Ohcleo (unanswered customer questions), Philip (script could not open chat this run — see below)
- Card not marked done (3 items still open).

**Philip (MS Teams):** `msteams-philip-chat-extract.js` could not locate/open Philip Briggs' chat this run ("Philip not in list, opening chat via search... Could not open Philip Briggs chat"). Not a login/auth failure — chat-list lookup itself failed. Left incomplete rather than assumed clean.

---

## Reminders — 07:30 (+07:00)

No reminders sent this run (`--send-reminder` not passed, per cron default).

- LongVV: 0h sheets today — normal (weekly-only threshold), no reminder needed
- PhucVT / TuanNT / KhanhHH / LeNH: 0h sheets today, but Workstream unavailable this entire run — not confirmed as real 0h days, so not flagged for reminder. Will re-evaluate once Workstream recovers.

---

## Unresolved questions

1. Should the Fountain client's spam-deliverability question (trello.com/c/ECLxfKfn) be escalated/answered proactively, or left for Rick to see on next login?
2. Celine's (OhCleo) meeting request + Trello workflow question — needs Tony's attention; should this be flagged to him directly?
3. carrick's live Chrome (Profile 1) Upwork session appears logged out on this server — same root cause likely also explains the Solid Code Slack gap. Worth a one-time manual re-login to fix both Arthur and Upwork Memo/Neural checks going forward?
4. Philip MS Teams chat lookup broke this run (chat-list search failed) — needs investigation, not just a re-run.
