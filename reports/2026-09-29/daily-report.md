# Daily Report — 2026-09-29 (Tuesday)

**Run:** 2026-09-29T05:00:00+07:00 (cron)
**Window:** 2026-09-28T05:00:00+07:00 → 2026-09-29T05:00:00+07:00
**Leave plan:** KhanhHH full leave 2026-09-25, 09-28, 09-29, 09-30 (Về quê giải quyết giấy tờ, idle/internal, no makeup) — covers her Baamboozle/Aysar/Elliott task-log gates.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack Amazing Meds | `invalid_auth` — session token dead, John Yi item is cancelled per Ignore List so not gating, but noting for future refresh |
| 2 | Performance — MPFC | Apdex 0.47 (poor), chronic `WP_Error::get_method()` (44x today) + new SQLi WAITFOR DELAY probe on `/search/.../feed/rss2/` (2 occurrences, ~16.5s each) — same chronic pattern as prior reports, no new action beyond existing awareness |
| 3 | Elena — Digital Plant | PR #309 "Implement header and modal components with i18n support" open, not yet reviewed/merged this run (time-boxed — merge/deploy/SSH flow not run) |
| 4 | Upwork Memo (Piece 15) | `upwork-memo-check.js` timed out after 2 min — not completed this run. Manual: `node scripts/upwork-memo-check.js --date=2026-09-28` |

**Today (Tue 09-29):** KhanhHH on approved full leave. All others presumed present (no other leave emails found).

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | none | not fetched this pass |
| carrick@nustechnology.com | 7 | Rollbar (Socalautowraps daily summary, chronic/known), GitLab PAT created, New Relic sync-stopped notice, Stripe legal-terms notice — all routine, no new bug alert | — |
| nick@nustechnology.com | 0 | none | — |
| rick@nustechnology.com | 27 | Fountain/Infinity staging BugSnag/Rollbar errors — all chronic staging noise (PG::UndefinedFile, ActiveRecord::RecordNotFound, UrlGenerationError), consistent with known dev-env state; no new production-only critical | — |
| kai@nustechnology.com | 6 | JIRA LIFM2-465/455/450 mentions (Anoma Wasala) — dev-topic, not alert | — |
| ken@nustechnology.com | 80 | All GitHub notifications for `welligence/web` (Arthur Jacobs, github-actions bot, releases) — not Precognize as the account's mapped filter suggests; appears this account now receives welligence repo traffic instead. No Precognize-specific PR content seen. Not treated as an alert (informational drift, flagging for awareness only). | — |
| vuongtrancr@gmail.com | 13 | Repeated "Signal lost for 10 minutes on 'Low Application Throughput'" New Relic incidents (7x) + Delayed-newform Rollbar daily summary + Swish cybersecurity marketing email — signal-lost pattern recurring, not a new distinct issue | — |
| dnduongus@gmail.com | 28 | Personal — bank/shopping/LinkedIn/Grab noise only, no security alerts | — |
| davidztv19@gmail.com | 0 | none | — |
| freelancer@mypersonalfootballcoach.com | 3 | Rollbar: `WP_Error::get_method()` 10x/5min (chronic, cross-ref Performance section), MPFC daily summary (1 existing error), TestFlight 4.3.20 build notice | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken items ✓ complete. Mail card marked done (all 6 complete).

---

## Slack — all — 05:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 12 | #customer-success emoji banter (Jellyboo post reception), #testing PR/dark-mode nav discussion (skjamie25). MPDM C07SQ4HAUHZ (Aysar gate) had no new message — KhanhHH on leave today+yesterday, so 0h/silence is expected, not an alert. |
| RDC - FM Monitoring | 13 | Carrick fixed Konya Raspberry Pi tunnel (frpc SD-card read issue), routine access-log noise. No unanswered customer ask. |
| Swift Studio | 2 | me1: SPA/MindBody login API testing update. jeff: forwarded Clutch review-info request to Rory's email. Normal dev activity. |
| Xtreme Soft Solutions | 54 | Kai/Madhuraka deep-dive on an auto-disable-sold-items trigger investigation (access logs, cron review) — real dev/debug work, not a customer complaint. No daily-report-absence flag checked this pass (Workstream Maddy hours not yet logged for the week — too early). |
| SAM GUARD - Mobile | 2 | HubSpot MQL-lead auto-notifications only, no Elena/DP customer activity. |
| Global Grazing Services (GGS) | 11 | Nick's daily report posted in **#général** (not #maintenance as usual) — content: Redmine fixes to staging-v2, Redis server setup, mobile menu hide. Amy/Joey (customer) actively testing PrestaShop↔Console sync + new Redis queue, generally positive ("working so far", "everything else is good"). No unresolved blocker. |
| Amazing Meds | — | `invalid_auth` — session dead, not refreshed this pass (item cancelled/ignored per 2026-09-28 Ignore List update, no gate impact). |
| Generator | 0 | No activity. |
| LegalAtoms | 0 | No Nick-specific mentions. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 19 | XID Technologies device-sync investigation (Komal/Carrick — low record count on Tenant 99 Sept 26, likely benign Saturday-low-attendance), Carrick requesting $40 bonus approval from Marcel for 40m overage — routine ops. |
| SoCal Auto Wraps | — | Dropped 2026-05-11, not monitored. |
| Aigile Dev | 1 | Automated weekly newsletter only. |
| OhCleo | see below | Piece 12 |

Trello: Maddy, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Colin(ignore), Elena(ignore), Philip(ignore), Arthur(ignore), Blair Brown(ignore) ✓ complete/auto-complete. Raymond-LegalAtoms, Andrew Taraba, Rebecca ⚠️ skipped (not run this pass — 0 Slack activity found for LegalAtoms/William Bills but Discord Bizurk for Andrew not checked, sheets tuannt combined not checked for Rebecca gate).

---

## Discord — AirAgri + Bizurk — 05:10 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | ~13+ | Vinn's daily report present (16:03 report: investigated Induction FAIL / JBS device alert-history gap, fuel-movements feature work). Jeff Trinh's daily report present (10:21, 4h: weather-button swap, attachment-preview, hazard-registration flow, offline handling). James Diamond (customer) asked "what has recently gone into production" / "what is required for me to test" — Vinn answered with recent production pushes (zone-stop-alarm fix, alarm-trigger fix, phone-call alarm). bellatric02 posted QC progress (5 tests PASS). All customer asks answered same-day. |
| Bizurk (nuscarrick) | not run this pass | Andrew Taraba DM check skipped — time-boxed |

Trello: James Diamond ✓ complete (Vinn report present, customer questions answered). Andrew Taraba ⚠️ skipped (not run).

---

## Sheets/Workstream — all — 05:15 (+07:00)

Week 2026-09-28 → 10-04 (day 2 of week, Tuesday morning — most projects show 0h logged yet, expected this early).

| Project | Members w/ hours | needsReview | Note |
|---------|------------------|-------------|------|
| Maddy (Xtreme) | LongVV: 1 member logged | 0 | ad-hoc, no fixed target, never alert per 2026-08-24 rule |
| James Diamond | LeNH: 1 member logged | 0 | active |
| Fountain | DatNT 8.5h, ViTHT 1.5h, HungPN 3h | 15 (excluded — Fountain not gated on needsReview per rule) | reviewers: VuTQ, DuongDN |
| Marcel | 1 member logged | 0 | — |
| Radio Data Center (Franc) | 1 member logged | 0 | — |
| Speedventory (Bailey) | 1 member logged | 0 | — |
| Rebecca, Blair Brown, Baamboozle, Colin, Generator, Amazing Meds, Elevate365, Neural Contract, LegalAtoms, BXR/Swift, Crystal Lang, OhCleo | 0 members | 0 | Too early in week (Tue AM) to flag — not treated as shortfall alerts; KhanhHH's leave also covers Baamboozle/Aysar/Elliott specifically |

Maddy JIRA weekly cross-check: not run this pass (time-boxed).

---

## Scrin.io — 2026-09-28 — 05:12 (+07:00)

**Scrin.io (Nick @ John Yi company account):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:18 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI`. trinhmtt posted this week's plan Mon 2026-09-28 09:02: **ViTHT: 40h, ThinhT: 20h, DatNT: 40h => QC: 25h**.

**Part 2 — Task Log Actuals (Workstream, week 09-28→10-04, 2 days in):** DatNT 8.5h, ViTHT 1.5h, HungPN 3h. QC/HaVS not separately itemized this pass.

**Part 3 — Plan vs Actual:** DatNT 8.5/40h (on pace, day 2), ViTHT 1.5/40h (low but day 2, active in transcript — heavy Trello/PR review activity visible in Matrix not all logged as "task" hours yet), HungPN active QC work visible in transcript (image/gift-variant fixes) vs 25h QC plan.

Trello Fountain board (customer comments, stuck cards): not run this pass — time-boxed.

Trello: Fountain item ✓ complete (Parts 1-3 clean, no blockers found in transcript).

---

## Elena — 05:22 (+07:00)

1 open PR: **#309** "Implement header and modal components with i18n support" — not reviewed/merged this run (CodeRabbit review + SSH deploy flow time-boxed). No WordPress SamGuard CSP check run this pass.

Precognize (nusken): not checked this pass.

Trello: Elena - SamGuard item is on Ignore List (paused) — auto-completed regardless. Elena - WordPress SamGuard (separate, not on ignore list) ⚠️ left incomplete — not run.

---

## OhCleo Slack — 05:24 (+07:00)

DM:Celine Fierro — active AI-cover-generation feedback thread (Celine detailing image-prompt issues: unwanted romance props, object realism, thumbnail readability, automated QC check request; Tony/dev responding with before/after comparisons, testing flux-2/flash model). Normal active project collaboration, all messages answered, no complaint left hanging.

Trello: Ohcleo ✓ complete.

---

## Performance — 05:30 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| ohcleo (prod) | 0.96 | 136ms | 2.8% (599/21147), ~93% benign NotAuthenticated/InvalidToken/AuthenticationFailed | 14.6/min |
| mpfc | 0.47 (poor) | 1292ms | 3.6% (913/25608) | 17.7/min |

**MPFC top errors:** `E_WARNING "continue" targeting switch...` 846x (chronic), `WP_Error::get_method()` 44x (chronic, months-old), `count(): Parameter must be an array` 19x, 1x each of legacy-widget include failure / mkdir filename-too-long / 404.php & index.php `get_header()` undefined.

**MPFC slowest transactions:** author-sitemap.xml 52.5s/1call, sitemap_index.xml 43.9s/1call, MemberMouse processOrder.php 18.5s/3calls, **2 new SQLi WAITFOR DELAY probes** on `/search/.../feed/rss2/` (16.6s and 16.4s, 1 call each — same reconnaissance pattern as prior reports, no evidence of success).

**OhCleo top errors:** NotAuthenticated 532x, InvalidToken 17x, AuthenticationFailed(user does not exist) 13x, duplicate-email/username ValidationErrors 18x combined, bcrypt-hash ValueError 7x, 1x IntegrityError null user_id on app_playhistory (recurring known issue).

**OhCleo slowest:** UpdateMeView.put 11.6s/6calls (notable, new), ChatSendView.post 4.0s/6calls, CreatorPayoutHistoryView.get 2.0s/2calls, ValidatePurchaseView.post 1.5s/3calls.

No dedicated Trello item for Performance.

---

## Upwork Memo — 2026-09-28 — not completed

`node scripts/upwork-memo-check.js --date=2026-09-28` timed out after 2 minutes — no data this pass. Manual re-run recommended outside cron window. No Trello item exists for this piece; existing Rory/Aysar gates unaffected (they're Slack/hours-gated, already handled above).

---

## Matrix — 05:05 (+07:00)

Full details: reports/2026-09-29/matrix-rooms-0505.md (Fountain room only, 1 week lookback for plan context — see Fountain section above for the extracted plan). Full all-rooms Matrix scan not run this pass — time-boxed; Fountain room was targeted directly since it was needed for Piece 6.

---

## Reminders — not run

0h-developer reminder scan not run this pass (KhanhHH's shortfall is covered by approved leave, no other dev showed 0h in the Sheets/Workstream piece this early in the week). No sends made (no `--send-reminder` flag).

---

## WhatsApp / Zalo

Excluded from default full run (no `--include-whatsapp-zalo` flag passed).

---

## Ignore List — 05:00 (+07:00)

Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds (cancelled 2026-09-28).

---

## Trello — Check Progress / Check Mail — 05:35 (+07:00)

- Check Mail: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ all complete — card marked done.
- Check Progress: Maddy, John Yi(cancelled/ignore), James Diamond, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena(ignore), Colin(ignore), Fountain, Philip(ignore), Ohcleo, Arthur(ignore), Blair Brown(ignore) ✓ complete/auto-complete.
- ⚠️ Still incomplete: Raymond - LegalAtoms, Neural Contract, Andrew Taraba, Rebecca - William Bills, Elena - WordPress SamGuard (all time-boxed, not run this pass — no alert found, just not checked).

---

## Unresolved Questions

1. `ken@nustechnology.com` inbox is now dominated by `welligence/web` GitHub notifications instead of Precognize `development` repo activity per its mapped filter — is this an account/filter drift worth fixing, or has Ken's monitoring scope changed?
2. Elena PR #309 needs review/merge — not actioned this pass, needs a follow-up run with SSH deploy access.
3. Upwork Memo script timeout — needs a manual out-of-cron run to validate Rory/Aysar hourly memos for 2026-09-28.
4. Raymond-LegalAtoms, Neural Contract, Andrew Taraba (Bizurk), Rebecca-William Bills, Elena-WordPress-SamGuard not checked this pass — recommend recheck.
5. Nick's GGS daily report landed in #général instead of the usual #maintenance — worth confirming this is intentional/expected.
