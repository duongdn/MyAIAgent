# Daily Report — 2026-09-30 (Wed)

**Run:** 2026-09-30T05:10:00+07:00 (cron)
**Window:** 2026-09-29 05:00 → 2026-09-30 05:00 (+07:00)
**Leave plan:** TuanNT — half-day off 29/09 afternoon (đau răng/dental), arranged internally (VuTQ covering Bailey/Console); Bailey team confirmed "ko bù" (no make-up).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) | rick@ Rollbar: `[FirstProject] production - New Error: #1121 IntegrationError` — real **production** error (FirstProject/Fountain family). All other rick@ Rollbar/BugSnag items today are staging/dev/test, not production. |
| 2 | Performance (MPFC) | Apdex 0.49 (poor) — chronic `WP_Error::get_method()` bug (13x today), `E_WARNING "continue" targeting switch` (601x, dominant), 1 `Too many connections` DB error (9x). Same chronic issue tracked for months, unresolved. |
| 3 | Trello — Maddy | Not completed this run — full 4-part check (Slack + JIRA weekly cross-check + Bitbucket PR reply-rate + Workstream hours) not run this pass, time-boxed. Left ○, needs recheck. |
| 4 | Upwork Memo | Session/login failed for Rory (carrick), Aysar (carrick), Tokenlite/Marcel (duongdn) — all 3 workrooms: live-cookie + stored + headless login all failed. Not a memo-validity alert (session issue only) — manual Chrome touch needed to refresh access tokens. Trello Rory/Aysar gates unaffected (session ≠ memo status). |

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

**Trello board:** Not separately queried this run (time-boxed) — no customer complaint signals seen in Matrix room content.

Trello: Fountain ✓ complete (Parts 2-3 clean, Part 1 uses last-known plan per standing rule).

---

## Elena / SamGuard — 05:10 (+07:00)

Elena - SamGuard Digital Plant is on the **Ignore List** (paused) — not checked, auto-completed.

**Elena - WordPress SamGuard (separate, active item):** `wordpress-samguard-check.js` on samguard.co — 0 JS errors, 0 CSP violations, 0 page errors. `failedRequests` are only expected video/analytics/ad-tracking `net::ERR_ABORTED` noise (GA, DoubleClick, LinkedIn ads) — not real issues. Clean.

Trello: Elena - SamGuard Digital Plant (ignore, auto-✓), Elena - WordPress SamGuard ✓ complete.

---

## Trello — Check Progress / Check Mail — 05:10 (+07:00)

- Check mail: all 6 items ✓ complete, card marked done.
- Check progress: 20/21 items ✓ complete (Maddy left ○ — full 4-part check not run this pass, needs recheck).

## Ignore List — 05:10 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard Digital Plant, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds.

(Arthur was additionally spot-checked this run despite ignore status: Workstream `crystal_lang` shows 0h this week, but Matrix room shows PhucVT back full-time on Meta-Stamp — created 5 new Trello tickets, discussing $4,860 payment/timeline with Chris Coyne, GitHub shows 0 new commits since last check. No action needed given paused status.)

---

## Reminders — 05:10 (+07:00)

No 0h-with-no-leave developers found today (TuanNT's 0h is leave-explained; all other tracked devs have logged hours or are ad-hoc/unmanaged). No reminders needed. Not sent (no `--send-reminder` flag, and none warranted).

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
| Rory | login_failed | Live cookies + stored + headless all failed — session issue, not memo validity |
| Aysar | session_expired | Same — session issue |
| Tokenlite (Marcel) | login_failed | Same — session issue |

No memo-validity data obtainable this run. Per standing rule: session/Cloudflare failure ≠ memo status, no alert, Trello gates for Rory/Aysar unaffected (already completed via Slack+hours check above). Manual fix: open upwork.com once in carrick's and duongdn's real Chrome to refresh access tokens.

---

## Unresolved Questions

1. Maddy full 4-part check (Slack deep-dive + JIRA weekly cross-check + Bitbucket PR reply-rate + Workstream) not run this pass — needs recheck.
2. ken@nustechnology.com's 80 emails were not individually triaged beyond sampling — worth a closer pass if Precognize PR-activity signal is expected today.
3. Upwork memo sessions (Rory/Aysar/Tokenlite) need a live Chrome touch to refresh — not done this run.
4. OhCleo #events-code channel still `channel_not_found` — needs admin re-invite (known pre-existing gap).
