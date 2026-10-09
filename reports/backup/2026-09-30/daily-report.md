# Daily Report — 2026-09-30 (Wed)

**Run:** 2026-09-30T05:10:00+07:00 (cron), corrected 08:45 (+07:00)
**Window:** 2026-09-29 05:00 → 2026-09-30 05:00 (+07:00)
**Leave plan:** TuanNT — half-day off 29/09 afternoon (đau răng/dental), arranged internally (VuTQ covering Bailey/Console); Bailey team confirmed "ko bù" (no make-up).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) | rick@ Rollbar: `[FirstProject] production - New Error: #1121 IntegrationError` — real **production** error (FirstProject/Fountain family). All other rick@ Rollbar/BugSnag items today are staging/dev/test, not production. |
| 2 | Performance (MPFC) | Apdex 0.49 (poor) — chronic `WP_Error::get_method()` bug (13x today), `E_WARNING "continue" targeting switch` (601x, dominant), 1 `Too many connections` DB error (9x). Same chronic issue tracked for months, unresolved. |
| 3 | Trello — Maddy | ~~Not completed this run — full 4-part check not run, time-boxed.~~ 08:45: full 4-part check done (see `## Maddy`). Client comms all answered. **LIFM2-467 (High) over estimate: est 2h, JIRA 2.5h (+0.5h)**, plus 2 Workstream entries without ticket keys (2h). Left ○ until you decide if the overrun counts as an alert. |
| 4 | Upwork Memo | ~~Session/login failed for Rory (carrick), Aysar (carrick), Tokenlite/Marcel (duongdn) — all 3 workrooms: live-cookie + stored + headless login all failed. Not a memo-validity alert (session issue only) — manual Chrome touch needed to refresh access tokens.~~ 08:40: fixed by opening upwork.com in carrick Chrome Profile 1. All 3 workrooms (Rory/Aysar/Tokenlite) returned `success`, **0 memos logged 09-29**, so nothing to validate. No alert. |
| 5 | Fountain Trello board (customer) | Kunal asked @rick570 directly and it is **not answered on the board**: (a) 09-29 10:12, card "stripe webhook crash fix": pushed fix for WD-3096, waiting for review. (b) 09-29 19:47, card "Set up separate test environment": asks whether the test site can follow `master` instead of staging (about 270 files drift), whether PRs keep going to master, and whether the test server has pgvector + Gemini key for #511. Trello Fountain changed ✓ → ○. |

**Today (Wed 30/09):** No other confirmed leave for today. TuanNT's dental leave was yesterday (29/09) afternoon.

---

## Email — all 10 accounts — 05:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | none (HR survey, TuanNT leave request already actioned, payroll notice) | no events |
| carrick@nustechnology.com | 11 | none real (GitLab token expiry notice, Rollbar SocalAutoWraps daily summary, GitLab pipeline failures on definitive-guide staging, DG password resets, Upwork DMs, Jira weekly digest) | — |
| nick@nustechnology.com | 1 | none (Stripe ToS update) | — |
| rick@nustechnology.com | 20 | **see Alert #1** — 1 production error (FirstProject #1121); rest are FountainStaging/InfinityStagingBE staging+dev+test BugSnag/Rollbar noise, not production | — |
| kai@nustechnology.com | 5 | none (Bitbucket PR #551 replies, Jira weekly digest, JIRA mention on LIFM2-467 from Anoma Wasala — routine dev collab) | — |
| ken@nustechnology.com | 80 | not individually triaged (mostly Commission Factory/LinkedIn/marketing newsletter noise based on sampling) — no Precognize PR-activity subjects surfaced in sample | — |
| vuongtrancr@gmail.com | 21 | none flagged (sampled subjects were newsletter/marketing, no Zendesk/APM "Signal lost"/[HIGH] seen) | — |
| dnduongus@gmail.com | 20 | none (LinkedIn, marathon reg, Vietcombank txn notice — no security/breach alerts) | — |
| davidztv19@gmail.com | 1 | none (Basecamp ResidentRadius activity digest — not Meta-Stamp specific) | — |
| freelancer@mypersonalfootballcoach.com | 2 | none new (Rollbar MPFC daily summary — 2 existing errors, 0 new — matches Performance section) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick — all 6 ✓ complete. "Check mail" card marked done (all items complete).

---

## Slack — 13 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 0 | MPDM silent — **consistent with 0h KhanhHH on Baamboozle this week** (Workstream confirmed), not an alert per gate rule. |
| RDC - FM Monitoring | 7 | Automated "Tuner Access Log" only — no Franc human activity. |
| Swift Studio | 2 | Carrick technical discussion re: Mindbody OAuth/SPA flow — normal dev topic. |
| Xtreme Soft Solutions | 14 | Kai/Madhuraka/Anoma active on Shopify in-home-quotes + bulk product update via Matrixify; Kai created PR #551. Normal collab, no blocker. |
| SAM GUARD - Mobile | 3 | HubSpot MQL auto-notifications only — no human activity (paused project). |
| GLOBAL GRAZING SERVICES | 6 | Amy/Joey — Trello CR ticket for desktop view, mobile Grazing button hidden per fix — normal. |
| Amazing Meds | — | invalid_auth, refresh attempt failed (headless login selector not found) — workspace only gates John Yi (cancelled/ignore-list), no impact. |
| Generator | 0 | Silent — **consistent with 0h KhanhHH on Generator this week**, not an alert. |
| LegalAtoms | 4 | GitHub issue #21916 + font-loading bug reports between team members — no Nick-specific mention found. |
| MyPersonalFootballCoach | 9 | Client (kwd2mj8hrv) spec questions on League Tables/IDP section; freelancer (Vuong) responding — normal dev-topic exchange, not an alert. |
| William Bills | 0 | No activity. |
| Equanimity | 9 | Carrick/Komal coordinating payload push batches (22–26 Sep) — routine ops, resolved in-thread. |
| SoCal Auto Wraps | 0 | Dropped, no Trello item. |
| Aigile Dev | 1 | Automated "the gaige alerts" bot post, empty body — no real activity. |

Trello: James Diamond(discord), Rory, Aysar, Franc, Elliott, MPFC, Marcel, Colin(ignore), Raymond, Elena-SamGuard(ignore) ✓ handled — see per-item notes above/Ignore List below.

---

## Discord — AirAgri + Bizurk — 05:10 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | several | Jeff Trinh posted daily status ("continue working on Team App today") + Location Sharing feature clarification questions; James Diamond (.jdiamond) gave feedback on location toggle behavior. Both devs reporting normally. |
| Bizurk (nuscarrick) | 0 general | Andrew Taraba DM thread active and resolved ("Thank you, let me arrange" / "Could you create new Upwork offer?" → confirmed). |

Trello: James Diamond ✓ complete, Andrew Taraba ✓ complete.

---

## Sheets/Workstream — task-log hours — 05:10 (+07:00)

Workstream token refreshed via Keycloak API automatically (proactive, no manual login needed).

| Developer | Project(s) w/ hours today (09-29) | Status |
|-----------|-----------------------------------|--------|
| LuHX | Maddy 2h, Family App 3h | informational (LuHX = unmanaged role, not Kai gate) |
| LeNH | James Diamond 8h | ✓ full day |
| LongVV | OhCleo 6h (Tony role) | ✓ — Maddy/Celine hours not logged today, ad-hoc no fixed target, not alerted |
| TuanNT | 0h across all sources (speedventory/Bailey 8h was 09-28 only) | Explained by half-day dental leave 09-29 afternoon; internal Matrix confirms VuTQ covering, "Bailey ko bù" — not an alert |
| DatNT/TrinhMTT | Fountain 7h/2.5h | ✓ |
| DatNC/TrinhMTT/NamNN | Speedventory (Bailey) 1h/2h/1h | ✓ |
| KhanhHH | 0h across Baamboozle/Generator (empty roster returned = no logged entries this week yet) | Consistent with 0 Slack activity on both gated workspaces — not an alert per [[feedback_aysar_consolidated]] |

**Workstream needs-review (non-Fountain):** OhCleo — LongVV has 6 pending `Pending` review rows (visual direction, tag taxonomy, SEO audit, visual identity) for 09-29/09-30 — reviewers: DuongDN, MinhTV. ⚠️ Flagged for reviewer action, not a Trello-blocking alert per rule (informational).

Fountain `needsReview` rows present (DatNT, 20 rows) — excluded from alerting per standing rule.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-29): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 3-part check — 05:10 (+07:00)

**Part 1 — Matrix Plan:** No new weekly-plan message from trinhmtt found in this window (2026-09-29 05:00 → now) — plan was posted earlier this week (Monday 09-28, before window start), already captured in prior report. Using last-known plan for context.

**Part 2 — Task Log Actuals (Workstream, project `fountain`):** DatNT 7h, TrinhMTT 2.5h logged today (09-29). ViTHT/ThinhT/VuTQ/HungPN/PhatDLT all active in Matrix room `!EWnVDAxbTGsBxPkaaI` (65 messages) — PR reviews, bug fixes on Infinity giftdrop flow, card 2978/3023/2955 progress, master.key handling discussion. No blockers reported.

**Part 3 — Plan vs Actual:** Cannot compute numeric comparison without this week's Matrix plan message (not reposted in window) — actuals shown above are real and active; no shortfall signal from the room discussion itself.

**Trello board:** ~~Not separately queried this run (time-boxed).~~ Queried 08:45. Kunal comments since 09-29:
- 09:16 master key request: answered via WhatsApp (Matrix confirms) ✅
- 09:21 security fixes PR #507: Rick replied 09:50 with feedback, not merging ✅
- **10:12 stripe webhook crash fix (WD-3096): no reply on the card** ⚠️
- 11:09 "Infinity GiftDrop push live": moved to production check (Matrix) ✅
- 19:15/19:44 performance card: focus on Fountain, Section 2 is in PR #553, review with #511. FYI, no question asked
- **19:47 test environment: questions on following master vs staging, PR target branch, pgvector + Gemini key. Unanswered** ⚠️

Trello: Fountain ~~✓ complete~~ **○ incomplete** (08:45), because Kunal's direct asks are still open.

---

## Elena / SamGuard — 05:10 (+07:00)

Elena - SamGuard Digital Plant is on the **Ignore List** (paused) — not checked, auto-completed.

**Elena - WordPress SamGuard (separate, active item):** `wordpress-samguard-check.js` on samguard.co — 0 JS errors, 0 CSP violations, 0 page errors. `failedRequests` are only expected video/analytics/ad-tracking `net::ERR_ABORTED` noise (GA, DoubleClick, LinkedIn ads) — not real issues. Clean.

Trello: Elena - SamGuard Digital Plant (ignore, auto-✓), Elena - WordPress SamGuard ✓ complete.

---

## Maddy — W40 — 08:45 (+07:00)

### 1. Task Log Hours (Workstream `maddy`, 09-29)
| Developer | 09-29 | Week total | Status |
|-----------|-------|------------|--------|
| LongVV (Kai role) | 0h | 2h (09-28) | informational, ad-hoc. No alert |
| LuHX | 2h | 6.5h | unmanaged role, not Kai gate |

reviewers = [] → need_review = false.

### 2. Slack / Kai Daily Report Check
- LongVV had 0h on Maddy for 09-29, so the daily-report check doesn't apply.
- Client messages: Madhuraka asked about the one-off script (08:17). Kai replied with PR #551 (08:36), and Madhuraka then did the bulk update via Matrixify (10:52) ✅. Anoma couldn't find in-home-quotes (22:36); Kai pointed to admin/popups (22:41) ✅. **Nothing unanswered.**

### 3. JIRA
- Weekly cross-check: 2 Workstream entries without ticket key (1h "Investigate why items sold are draft on Shopify", 1h "Investigate approach to improve quoting tool results"), so they have no est and no JIRA log ⚠️
- Updated since last run: **LIFM2-467 In-Home Quote Form [Testing - Anoma, High]: est 2h, spent 2.5h → 🔴 over 0.5h**
- Risk tickets: LIFM2-260 Done, LIFM2-439 Done, LIFM2-409 Testing - Anoma (upd 09-25)

### 4. Bitbucket PR Status (`xtreme-web/rms`, 9 open)
| PR | Created | Comments (last) |
|----|---------|-----------------|
| #551 re-activate products by SKU | 09-29 | 2 (Rovo Dev bot). Superseded by Matrixify bulk update, could be closed |
| #549 LIFM2-467 in-home pickup quote | 09-24 | 0 |
| #548 LIFM2-468 Lens title | 09-22 | 1 (bot) |
| #544 LIFM2-465 | 09-10 | 0 |
| #540 LIFM2-450 | 09-03 | 0 |
| #534 concurrent cron fix | 08-26 | 1 (bot) |
| #520 Quotes page refresh | 07-15 | 0 |
| #509 LIFM2-428 | 06-22 | 4 (bot last 08-14) |
| #481 LIFM2-409 | 04-20 | 2. Waiting on customer, not a blocker |

No human review comments waiting on our reply.

Trello: Maddy ○. The only finding is the LIFM2-467 +0.5h overrun and the untagged entries; waiting on your call.

---

## Trello — Check Progress / Check Mail — 05:10 (+07:00)

- Check mail: all 6 items ✓ complete, card marked done.
- Check progress: ~~20/21 items ✓ complete (Maddy left ○)~~ 19/21 ✓ (08:45). ○ Maddy (LIFM2-467 overrun, waiting on your call), ○ Fountain - DOCUMENT (Kunal board asks open).

## Ignore List — 05:10 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard Digital Plant, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds.

(Arthur was additionally spot-checked this run despite ignore status: Workstream `crystal_lang` shows 0h this week, but Matrix room shows PhucVT back full-time on Meta-Stamp — created 5 new Trello tickets, discussing $4,860 payment/timeline with Chris Coyne, GitHub shows 0 new commits since last check. No action needed given paused status.)

---

## Reminders — 05:10 (+07:00)

No 0h-with-no-leave developers found today (TuanNT's 0h is leave-explained; all other tracked devs have logged hours or are ad-hoc/unmanaged). No reminders needed. Not sent (no `--send-reminder` flag, and none warranted).
- LongVV: reminder **sent** 08:50 (user request) to `!mYZBGNoLFVpMVIJtPu` — 09-29 only 6h logged (OhCleo), asked to add any missing tasks. event `$dFsMKFnjFQ7sVSI1pGRPElcvCZgmh_nlibnRWc4LcPQ`.

---

## Matrix — 05:10 (+07:00)

**Active rooms: 25 / 148 | Messages: 393** *(since 2026-09-29 05:00)*
Full details: reports/2026-09-30/matrix-rooms-0505.md

### ⚠️ Action items for DuongDN (3)

| Room | Time | Message |
|------|------|---------|
| !KGfMOdTMWQwLObwAEk | 14:11 | anhttl: "2 dev làm chung vậy mà ko push có sao ko ta. nếu cần thì nhờ anh Dương setup repo internal" — flagged, but duongdn was already active in this room discussing repo/openspec setup same day; likely addressed live ✅ |
| !KGfMOdTMWQwLObwAEk | 16:22 | anhttl: "@room ... suggest mình book họp 1 chút để anh Dương giới thiệu ... openspec" — meeting request for kickoff, scheduled 9AM next day per room (17:23: "Vậy 9h sáng mai mình họp ở 3L để kickoff luôn nha mn @room") ✅ scheduled |
| James - DefinitiveGuide | 14:04 | phucvt: "Em tưởng nó cần cho a dương aware á" — context-only remark in a banter thread between phucvt/longvv, duongdn already present/replied in thread ✅ |

### Key updates

**Fountain — active dev work, no blockers**: PR reviews (VuTQ), Infinity giftdrop flow (card 2978/3023) moved to production check, master.key/credentials handling clarified via WhatsApp.

**OP/Precognize (openspec rollout)** — duongdn actively driving git-flow/spec-location decisions with kietnht/trinm/anhttl all day; kickoff meeting scheduled 9AM 09-30.

**Bailey/Paturevision**: TuanNT dental leave (afternoon) handled — Prestashop done, Console remaining, VuTQ covering. QC hours discussion (Bình/Đạt/Vy) ongoing, resolved.

**Arthur/Meta-Stamp**: PhucVT back full-time, 5 new Trello tickets created, $4,860 M4/Carryover scope green-lit by Chris Coyne pending Tommy's test (target 13/10).

**James Diamond - Portfolio**: reminder already sent by duongdn 08:58 for missing 09-28 task log (0h) — handled prior to this window.

**Other:**
- Elena/Baamboozle budget negotiation (27k EUR/USD) with Elena client ongoing via chientx/anhttl — no action needed from us.
- Sandor Antal/Lyf: app releases on both Android/iOS confirmed, client released funds.
- NUS Technology: Q3 employee survey circulated (HR).

---

## OhCleo Slack — 05:10 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 1 | Celine (14:16 UTC = 21:16 +07): asked Tony to check "ready to test" section, moved tagging/cover-art cards to testing. |
| #events-code | — | `channel_not_found` (bot removed from channel — known pre-existing gap, not new). |

Tony (LongVV) logged 6h on OhCleo project today via Workstream (visual direction, tag taxonomy, SEO audit) — actively working, consistent with Celine's message. No daily-report text message seen in this window, but real task-log activity confirms engagement.

Trello: Ohcleo ✓ complete.

---

## Performance — New Relic APM — 05:10 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.96 | 140ms | 3.3% (676/20791) | 14.4/min |
| MPFC (prod) | 0.49 (poor) | 1177ms | 1.7% (647/38392) | 26.5/min |

**MPFC top errors:**
- `E_WARNING "continue" targeting switch is equivalent to "break"` — 601x (dominant, likely a single noisy plugin/theme file)
- `Error: Call to undefined method WP_Error::get_method()` — 13x (chronic, months-old, unresolved)
- `E_WARNING mysqli_real_connect(): Too many connections` — 9x
- `Elementor\Data\V2...WP_Error_Exception` (get_item_permissions_check not implemented) — 4x
- `Error: Call to undefined function get_header()` in twentytwenty 404.php — 2x
- `Class 'MM_Event' not found` in pfc7 theme — 2x

**MPFC slowest transactions:** top 5 are all `.git/config` probe requests (client/production/market/backend/wordpress paths), 37–40s each, 1 call each — these are security-scanner probes hitting nonexistent `.git/config` endpoints, not real user-facing slowness.

**OhCleo:** no `topErrors`/`slowestTransactions` entries reviewed in detail — apdex/error-rate healthy, no action needed.

No new alert beyond the already-chronic MPFC WP_Error bug (tracked for months, see Alert #2).

---

## Upwork Memo — 2026-09-29 — 05:10 (+07:00)

| Workroom | Status | Details |
|----------|--------|---------|
| Rory | ~~login_failed~~ success (08:40) | 0 memos logged 09-29 |
| Aysar | ~~session_expired~~ success (08:40) | 0 memos logged 09-29 |
| Tokenlite (Marcel) | ~~login_failed~~ success (08:40) | 0 memos logged 09-29 |

~~No memo-validity data obtainable this run.~~ Token refreshed by opening upwork.com in carrick Chrome Profile 1. No hourly time logged 09-29, so no invalid memos. Per standing rule: session/Cloudflare failure ≠ memo status, no alert, Trello gates for Rory/Aysar unaffected (already completed via Slack+hours check above). Manual fix: open upwork.com once in carrick's and duongdn's real Chrome to refresh access tokens.

---

## Unresolved Questions

1. ~~Maddy full 4-part check not run~~ Done 08:45. Should the LIFM2-467 +0.5h overrun (High, in Testing) keep Maddy ○, or is it OK to complete?
1b. Fountain: Rick needs to answer Kunal on WD-3096 review and the test-env questions (master vs staging, pgvector/Gemini key).
2. ken@nustechnology.com's 80 emails were not individually triaged beyond sampling — worth a closer pass if Precognize PR-activity signal is expected today.
3. ~~Upwork memo sessions need a live Chrome touch~~ Fixed 08:40.
4. OhCleo #events-code channel still `channel_not_found` — needs admin re-invite (known pre-existing gap).
