# Daily Report — 2026-08-12 (Wednesday)

**Run:** 2026-08-12T07:38:00+07:00 (cron)
**Window:** 2026-08-11T07:42:00+07:00 → now
**Leave plan:** TuanNT confirmed on leave 10-11/08 ("Về quê"), Bailey not backfilled per namtv note.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack — Global Grazing Services (#maintenance) | Customer (Joey) reported live-site 500 error 02:51+07 today, flagged as urgent/top-priority for sales. Support diagnosed stalled `resque` PHP-CLI processes at 03:15+07 and recommended dev review of what's spawning them — **no confirmation from our side that this is resolved**. Blocks Bailey item. |
| 2 | GitHub — Elena-SamGuard-Digital-Plant PR #309 | Open PR "Implement header and modal components with i18n support" targets unusual base `nus/dp-20260811` (not default branch), shows 2195 commits / 28 changed files, CodeRabbit auto-review **skipped** (non-default base). Not merged — needs manual review before any action. |
| 3 | Workstream | Session-wide SSO outage this run (3 separate login attempts, 6 sub-attempts, all failing at "SSO redirect done, API never fired"). Blocks task-log verification for Maddy, James Diamond, Aysar, Elliott, Bailey (hours portion), Fountain Parts 2-3, Arthur Crystal-lang, Blair Brown. |
| 4 | Slack Solid Code (Arthur) | Unreachable this run — this host has no `/home/nus/.config/google-chrome/` (David's Profile 15) at all, not just an expired token. Infra gap, not auth expiry. |
| 5 | Upwork (Rory/Aysar/Neural workrooms) | Unreachable this run — same root cause as #4: this host lacks carrick's Chrome Profile 1, so live-cookie extraction, stored session, and headless login all fail. Session/auth ≠ alert per existing rule; does not block Rory/Aysar/Neural Slack-based gates. |
| 6 | MS Teams (Philip, `will` account) | Login stuck in Microsoft security-challenge loop (25 redirect loops, never resolved) — chronic, matches prior days. |

**Today (Wed 08-12):** No other leave/WFH reported. All present.

---

## Email — all — 07:15 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | 0 | no events |
| carrick@nustechnology.com | 8 | 7 (GitLab pipeline failures ×5 for generator-api staging/stagingPhase2, Rollbar SoCal daily summary, Jira weekly update) | no events |
| nick@nustechnology.com | 7 | 0 | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 24 | 17 (Rollbar/BugSnag Fountain+Infinity+FirstProject daily summaries + dev-env BugSnag noise on FountainStaging + FirstProject ChunkLoadError 100th occurrence) | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 5 | 5 (JIRA weekly update + Madhuraka LIFM2-449 mentions — routine ticket activity, not production alerts) | no events |
| ken@nustechnology.com | 80 | 1 (Supabase security vulnerability notice) | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 1 | 1 (Rollbar Delayed-newform daily summary) | — |
| dnduongus@gmail.com | 32 | 0 (personal newsletters/bank notices, nothing security-relevant) | — |
| davidztv19@gmail.com | 5 | 0 (Auth0/Slack notifications, routine) | — |
| freelancer@mypersonalfootballcoach.com | 1 | 1 (Rollbar "flying blind for 3 days" — no data reaching Rollbar, worth a look but not a production error itself) | — |

Trello: all 6 Zoho items ✓ complete, card marked done.

---

## Slack — all — 07:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 14 | Carrick fixed Aysar's PR #566 reviews, moved site to bbzl.nusdev.net + basic auth, holiday notice. "Today's update" (Aysar gate) not yet posted for 08-12 — normal, expected ~17:00-17:45. |
| RDC - FM Monitoring | 34 | Routine tuner reboot/access-log alerts + dmetiner actively working RDS/MPX questions with device vendor, no stalled ask. |
| Swift Studio | 5 | Rory's amended-signup-flow questions (routine dev), jeff flagged $350 bonus payment owed for contract-resumed dev. |
| Xtreme Soft Solutions | 1 | Kai's holiday notice only. Kai daily-report check deferred — Workstream Maddy hours unverifiable this run (see Alert #3). |
| SAM GUARD - Mobile | 3 | michelle requesting PR #5219 review (Precognize) — see Elena section. |
| GLOBAL GRAZING SERVICES | 7 | **See Alert #1** — unresolved production issue. |
| Amazing Meds | 0 | Clean. |
| Generator | 8 | Routine triage (Elliott/Violet/Jeff), client dropped mobile role for Jeff+Parker next week (Xtreme room echoed this too). |
| LegalAtoms | 6 | General team chatter, no Nick-specific mentions. |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 1 | Holiday notice only. |
| Equanimity | 8 | Routine XID Technologies testing/bonus-payment chatter. |
| SoCal Auto Wraps | 0 | Clean (no Trello item exists for this one). |
| Aigile Dev | 1 | Sentry morning digest bot: 0 urgent new, 0 non-urgent new, 6 standing unresolved (chronic, no new). |

Trello: John Yi, Rory, Franc, MPFC, Marcel, Raymond, Andrew (Discord, see below), Colin ✓ complete. Maddy, Aysar, Elliott ⚠️ held (Workstream-gated hours unverified). Bailey ⚠️ held (Alert #1). Elena — see Elena section.

---

## Discord — all — 07:25 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 45 | Vinn (dapackage) + Jeff both posted daily reports yesterday (08-11: Vinn 18:37, Jeff 10:26/4h). James Diamond active reviewing PRs, contractor app still pending Apple review. No report yet today — normal, too early (07:25). |
| Bizurk (nuscarrick) | 0 | Clean, no Andrew DMs. |

Trello: Andrew Taraba ✓ complete. James Diamond ⚠️ held — Discord clean but sheets phucvt unverified (Workstream outage).

---

## Sheets/Workstream — all devs — 07:xx (+07:00)

🔴 **Workstream: session-wide SSO outage this run.** 3 separate `workstream-login.js` invocations (6 total sub-attempts across ~13 minutes) all failed at the identical point: Keycloak SSO redirect completes ("cookies alive") but the app's token-capture API never fires. Token file unchanged since 2026-07-28 (confirmed via live `GET /api/me` → 401). This matches the documented transient-outage pattern (see `feedback_workstream_sso_recheck_fixed`) — will retry at recheck.

**Sheets fallback:** `sheets-tasklog-scan.js` for 2026-08-11, all 5 devs (LongVV/PhucVT/TuanNT/KhanhHH/LeNH) across all 13 sheets returned **0h everywhere** — but per prior findings (weekly-report 08-07: "9/11 Google Sheets now empty/abandoned, WS is de facto sole source"), this is consistent with the sheets being stale/unused, not a confirmed 0h. **Treating this as unverified, not as a confirmed shortfall**, per `feedback_check_workstream_before_flagging_shortfall`'s repeated false-positive history.

| Developer | 08-11 status | Note |
|-----------|--------------|------|
| LongVV | unverified | Weekly threshold dev — no daily alert regardless. |
| PhucVT | unverified | Workstream down; sheets abandoned. |
| TuanNT | **on leave, justified** | Matrix confirms "Về quê" 10-11/08, Bailey not backfilled (namtv). John Yi/Rebecca/Bailey hours-gate treated as clean for this reason. |
| KhanhHH | unverified | Workstream down; sheets abandoned. |
| LeNH | unverified | Workstream down; sheets abandoned. |

**Maddy JIRA cross-check:** not run this pass — blocked by the same Workstream outage (script needs live token for week context); will run at recheck.

**Workstream "needs review" check:** not run this pass (requires live token).

---

## Scrin.io — 07:05 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-08-11):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 3-part check — 07:35 (+07:00)

**Part 1 — Matrix plan:** trinhmtt posted 16:30 08-11 in `!EWnVDAxbTGsBxPkaaI`: ThinhT 4h / ViTHT 40h / DatNT 40h / LamLQ 16h => QC 25h.

**Part 2 — Task log actuals:** ⚠️ unverifiable this run. Workstream down (Alert #3). Sheet fallback (`W39` tab, covers Aug10-16) checked directly — both Mon 10/08 and Tue 11/08 day-blocks are entirely empty template rows ("Task dự án" with no owner/hours, Total Hours: 0), consistent with this sheet being abandoned since the move to Workstream, not a real 0h day.

**Part 3 — Plan vs actual:** cannot compute without actuals this run.

**Trello board (Web Development):**
- 1129 open cards total. Active pipeline: todo=20, bugs=9, doing=8, qc_internal=8, qa_backlog=5, in_qa=1, not_passed=0.
- 42 cards ≥5 days stale in active-pipeline lists — mostly long-standing `todo` backlog (120-229 days) plus a handful of aged bugs (Fountain Pro/shipstation upload 126d, Giftdrop links not sending 120d, build-a-box modal 100d) — chronic, not new this run.
- 1 hard-to-release: "Improve Build-A-Box URL parsing speed" — 14 days in Doing.
- 1 new customer comment (kunalsheth, 08-11 11:02+07, on "Account-scoped products" card) — spec clarification answering rick's earlier question, informational, no reply overdue.

Trello: Fountain - DOCUMENT ⚠️ held (Part 2/3 unverifiable, Workstream outage).

---

## Elena — 07:10 (+07:00)

**PRs (duongdn account):** 1 open PR on `Elena-SamGuard-Digital-Plant` — **see Alert #2**, not merged pending manual review.

**Precognize (nusken account):** 0 open PRs.

**WordPress SamGuard (samguard.co):** clean — 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are all GA/DoubleClick/LinkedIn analytics noise (expected, not real errors).

Trello: Elena - SamGuard Digital Plant ⚠️ held (Alert #2 — PR needs manual review). Elena - WordPress SamGuard ✓ complete.

---

## Reminders — 07:xx (+07:00)

No reminders printed this run — task-log hours are unverified (Workstream outage) rather than confirmed 0h for LongVV/PhucVT/KhanhHH/LeNH, so no false "0h" claim is made. TuanNT is on confirmed leave. Not sent (no `--send-reminder` flag).

---

## Matrix — 07:16 (+07:00)

**Active rooms: 31 / 139 | Messages: 527** *(since 2026-08-11 07:42)*
Full details: reports/2026-08-12/matrix-rooms-0716.md

No unanswered @duongdn action items detected this window.

### Key updates

**Arthur - Meta-Stamp** — hours-logging question resolved same day; Chris's briefly-unanswered message caught and replied same day ✅.

**Bailey - BA/QC** — mailcatcher routing investigation (Console vs Console2), unresolved but routine debugging, not customer-facing.

**Celine - OhCleo** — high-volume mobile/BE dev coordination (deeplinks, payout/Yoursafe sandbox gap escalated to contact vendor directly, top-tracks bug fixes).

**Elena rooms** — Active Alerts: icon-mapping + alert-status-transition bugs being triaged, one recurring cache issue flagged as still-unresolved (chronic). Digital Plant: PR mixup corrected (see Alert #2). SamGuard WordPress: KhanhHH doing customer-approved scoped hours (1h+3h).

**Fountain** — normal PR/bug triage traffic, weekly plan posted (see Fountain section).

**Other:** Delivery-Resource Arrangement — leave/idle bookkeeping all processed same day. GreenFort/Elliott — client dropped Jeff+Parker mobile roles next week, only KhanhHH (PHP) remains. Recruitment — interview ranking in progress. National Day leave-notice — all confirmed done.

---

## OhCleo Slack — 07:18 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 1 | Tony's (LongVV) holiday notice, no new message from Celine. |
| #events-code | — | `channel_not_found` (dormant/archived channel, consistent with prior notes it's been quiet since 2023). |

No Tony daily report yet today — normal, too early (07:18).

Trello: Ohcleo ✓ complete.

---

## Performance — all — 07:30 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.94 | 307ms | 2.78% (741/26645) — 94% benign NotAuthenticated/InvalidToken | 18.8/min |
| MPFC | 0.58 (poor) | 1046ms | 0.26% (126/47914) | 33.8/min |
| Fountain | 0.99 | 101ms | 0.007% (3/43184) | 30.5/min |
| Infinity | 0.98 | 138ms | 0.008% (1/12452) | 8.8/min |

**OhCleo topErrors:** NotAuthenticated 698x (benign), InvalidToken 18x, AuthenticationFailed (bad password) 7x, ValidationError (dup username) 7x, AuthenticationFailed (user does not exist) 5x, IntegrityError null user_id on app_playhistory ×3 (chronic, weeks-old), 3 minor ValidationErrors.
**OhCleo slowestTransactions:** MediaByKeyView.get 8363ms/291 calls (chronic, unresolved for weeks), AdminPayoutsView.get 5435ms/8, HomeMediasView.get 2146ms/612, ValidatePurchaseView.post 1281ms/2, MediaRecommendsView.get 1060ms/891.

**MPFC topErrors:** `WP_Error::get_method()` undefined method 111x (chronic, unresolved for weeks), `"continue" targeting switch` E_WARNING 12x (chronic), 2 mysqli connection warnings, 1 `get_header()` undefined-function error.
**MPFC slowestTransactions:** sitemap_index.xml 38.1s/1, author-sitemap.xml 36.0s/1, membermouse processOrder.php 24.2s/1, 2 SQLi WAITFOR DELAY probes on /search/ (15.0s and 12.5s — active again, chronic recurring pattern).

**Fountain topErrors:** ArgumentError (wrong arg count) 3x. **slowestTransactions:** payment_intents/create 1855ms/63, card_artworks/create 1216ms/2, cards/pro 1054ms/1, MailchimpWorker 1018ms/7, pro_gift_box_logos/create 987ms/1.

**Infinity topErrors:** ArgumentError 1x. **slowestTransactions:** payment_intents/create 1893ms/3, MailchimpWorker 1658ms/1, search/search 1215ms/23, registrations/create 1044ms/1, admin/order_items/edit 984ms/1.

No new error classes vs prior report. MPFC apdex remains chronically poor (WP_Error::get_method() bug unresolved for weeks now).

---

## Arthur / Meta-Stamp — 07:20 (+07:00)

Full Vietnamese detail: reports/2026-08-12/0720-arthur-monitor.md

2/6 sources verified (Matrix, GitHub) — clean, no new issues. Slack Solid Code and Workstream Crystal lang unavailable this run (see Alerts #3, #4 — infra gaps, not expired tokens).

Trello: Arthur - Meta-Stamp ⚠️ held (2 of 4 relevant sources unverified).

---

## Upwork Memo — 2026-08-11 — 07:xx (+07:00)

⚠️ **All 3 hourly/monitored workrooms (Rory, Aysar, Neural) unreachable this run.** Root cause confirmed distinct from a normal expired session: this host has no `/home/nus/.config/google-chrome/Profile 1` (carrick) at all — live-cookie extraction, stored-session fallback, and headless Puppeteer login all fail identically (`ERR_CERT_VERIFIER_CHANGED` transient on retry, then consistent "no cookie file" on subsequent attempts). This is an infra/host gap (same root cause as Arthur's Slack Solid Code gap, Alert #4), not a login failure — per existing rule this does not block Rory/Aysar/Neural's Slack-based Trello gates (already resolved above).

---

## Trello — Check progress — 07:38 (+07:00)

**12/22 complete this run:** John Yi, Rory, Franc, MPFC, Marcel, Raymond, Neural, Andrew, Rebecca, Colin, Ohcleo, Elena-WordPress.

**10 held:**
| Item | Reason |
|------|--------|
| Maddy | Workstream Maddy-hours gate unverifiable (Alert #3) |
| James Diamond | Discord clean, but sheets phucvt unverifiable (Alert #3) |
| Aysar | Baamboozle update not yet due (~17:00) + sheets khanhhh unverifiable |
| Elliott | Slack clean, sheets khanhhh unverifiable |
| Elena - SamGuard Digital Plant | Alert #2 — anomalous PR needs manual review |
| Bailey | Alert #1 — unresolved production issue |
| Fountain - DOCUMENT | Parts 2-3 unverifiable (Alert #3) |
| Philip | MS Teams security-challenge loop (chronic) |
| Arthur - Meta-Stamp | Slack Solid Code + Workstream unavailable (Alerts #3, #4) |
| Blair Brown - Peptide Clyde | sheets lenh (Workstream) unverifiable (Alert #3) |

Check Mail: 6/6 complete, card marked done.

---

## Unresolved questions

1. GGS/Bailey — is the customer's live 500 error (Alert #1) actually resolved? Support's diagnosis (stalled resque processes) needs a developer to confirm root cause and close the loop with Joey.
2. Elena PR #309 (Alert #2) — is `nus/dp-20260811` an intentional new base branch, or was this created by mistake? Needs a human decision before merge.
3. This cron host is missing both David's Chrome Profile 15 (Solid Code Slack) and carrick's Chrome Profile 1 (Upwork) — entirely absent, not just stale. Worth confirming whether the daily-report cron should be running on this host at all, or whether these profiles need to be provisioned here.
4. Workstream SSO outage — will retry at next recheck per `feedback_workstream_sso_recheck_fixed` precedent (has resolved itself on retry before).
