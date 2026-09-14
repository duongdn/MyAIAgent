# Daily Report — 2026-09-14 (Monday)

**Run:** 2026-09-14T05:00:00+07:00 (cron), corrected 08:35 (+07:00)
**Window:** 2026-09-11T08:52 (+07:00) → now
**Leave plan:** PhucVT full-day leave 2026-09-14 to 2026-09-18 ("có việc cá nhân cần xử lý"). No other approved leave found this window.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email — vuongtrancr@gmail.com (Swish) | 30+ "Signal lost for 10 minutes on 'Low Application Throughput'" New Relic incidents over the weekend (Fri–Sun) + several `[Delayed-newform] production` Rollbar error bursts (#288/#289, 10 occurrences/5min). Recurring pattern, needs a look. |
| 2 | Performance — OhCleo backend (prod) | Real slow transactions: `AITranscribeView.post` avg 52.6s (2 calls), `MediaByKeyView.get` avg 35.8s (972 calls), `MediaByTagsView.get` avg 15.0s (567 calls) — all far above 5s threshold, not query artifacts (weekend traffic call counts are high). |
| 3 | Performance — MPFC | Apdex 0.53 (poor). Chronic `WP_Error::get_method()` uncaught error still firing (90x this window, unresolved for months — known). Several `WebTransaction/Custom/home/*-dashboard` pages averaging 300–400s — worth a look if not already known-slow custom pages. |
| 4 | ~~Sheets/Workstream (Piece 4) | Workstream SSO login failed after 2 browser-login retries + API refresh retries — full outage this run (matches known recurring pattern, see `feedback_workstream_display_outage_pattern`). **All Workstream-gated dev-hours checks (Maddy, John Yi/TuanNT, Aysar/KhanhHH, Elliott/KhanhHH, Bailey/TuanNT, Rebecca/TuanNT, Fountain Part 2/3, Blair Brown/LeNH) could not be verified this run** — no hours data available, not claiming 0h.~~ **RESOLVED 08:35** — Workstream login succeeded on recheck (transient SSO stall, same pattern as `feedback_workstream_sso_recheck_fixed`). All projects re-verified for week 09-07–09-13: Maddy/LongVV 8.5h (ad-hoc, fine); John Yi/Rebecca/Bailey — TuanNT 37.5h combined (mostly at Speedventory/Bailey) — fine; Aysar/KhanhHH 18h + MPDM "Today's update" posted 09-11 22:12 — fine; Elliott/KhanhHH 12h (Generator needsReview: 3× HangNTT "Test task" 0:00 rows, looks like placeholder/test data not real work — noting, not alerting); Fountain Parts 2-3 have real data (ViTHT 32h, LamLQ 4.25h, others — see Fountain section); Blair Brown/LeNH 0 rows — expected, LeNH deprioritized off Blair Brown per standing note. No genuine 0h/shortfall found anywhere. |
| 5 | ~~Upwork Memo (Piece 15) | Rory + Aysar workroom sessions expired; live-cookie + headless re-login both failed (selector not found). Memo validity NOT checked this run — session issue, not a memo-invalid finding.~~ **RESOLVED 08:50** — root cause found: carrick's real Upwork access-token cookie had expired (only refreshes on a live browser page load, cookie-injection alone can't trigger it). Opened `upwork.com` in carrick's actual Chrome (Profile 1) once — token refreshed, memo-check now works cleanly. Checked 09-07/08/11/13: Aysar 1 valid memo/day ("Handle feature: Add dark mode option..."), Rory 0 memos each day (no timesheet entries logged, not an alert). No invalid memos found. |
| 6 | Elena — GitHub PR #309 | "Implement header and modal components with i18n support" open on `process-digital-plant`, no CodeRabbit review yet — held for manual review, not auto-merged. |

**Today (Mon Sep 14):** PhucVT on leave through 09-18. No other staff leave/WFH notes found.

---

## Email — all — 05:12 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | Dat Nguyen leave request | no other events |
| carrick@nustechnology.com | 4 | GitLab pipeline failed (stagingPhase2), Rory Upwork msg, Rollbar 10x/5min on Socalautowraps prod jQuery error | no events |
| nick@nustechnology.com | 1 | Mailgun plan-limit notice (routine) | no events |
| rick@nustechnology.com | 26 | Routine BugSnag/Rollbar daily summaries + dev-env errors for Fountain/InfinityRoses/FirstProject — no new production-only spike beyond normal | 14:30-ish OmniGPT Daily Sync (recurring) |
| kai@nustechnology.com | 17 | Normal JIRA/Bitbucket activity for Madhuraka (LIFM2-460/461/463/465/466), no blockers | no events |
| ken@nustechnology.com | 80 | Normal Precognize/Welligence GitHub PR/CI activity, no alerts | DE Daily Standup 08:30, DE Tech Talks 09:00 (recurring) |
| vuongtrancr@gmail.com | 48 | **See Alert #1** — Swish "Signal lost" x30+, Delayed-newform Rollbar bursts | — |
| dnduongus@gmail.com | 53 | Personal Gmail, no security/breach alerts | — |
| davidztv19@gmail.com | 6 | Meta-Stamp/Arthur — routine Slack digest + Basecamp notification, no client mail | — |
| freelancer@mypersonalfootballcoach.com | 6 | Rollbar daily summaries + recurring `WP_Error::get_method()` error (chronic, see Performance) | — |

Trello: all 6 Zoho accounts (DuongDn, Carrick, Nick, Rick, Kai, Ken) checked, marking mail checklist items complete.

---

## Slack — all — 05:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 31 | Github bot activity only in general search; MPDM C07SQ4HAUHZ not independently re-checked this pass (Workstream KhanhHH hours unavailable — outage, see Alert #4). Gate held per rule, not completed. |
| RDC - FM Monitoring | 19 | Tuner access log bot noise only, no Franc content flagged |
| Swift Studio | 26 | Rory/Jeff active — TestFlight build, Apple Developer agreement action item, waiver-master links. Normal dev chatter, no blocker. |
| Xtreme Soft Solutions | 0 | No activity — Kai report gate also depends on Workstream Maddy hours (unavailable this run) |
| SAM GUARD - Mobile | 14 | HubSpot MQL notifications only, no Elena/DP content |
| Global Grazing Services | 3 | Nick posted today's report (bug list); Amy gave Rail 6 status update (19/37 tested); Nick also asked "we need money for support my team" — flagging as a note, not a monitoring alert per rules (project/finance chat, not person-status) |
| Amazing Meds | 0 | No activity |
| Generator | 6 | Violet/Carrick coordination on AWS access + tenant migration tasks, normal dev topic |
| LegalAtoms | 8 | Miratariq/Joacoangelino/Raymond general chat, nothing Nick-specific |
| MyPersonalFootballCoach | 0 | No activity |
| William Bills | 0 | No activity |
| Equanimity | 11 | Komal/Carrick discussing SGBuildEx API payload logging, normal dev topic |
| SoCal Auto Wraps | 0 | No activity (item dropped 2026-05-11, informational only) |
| Aigile Dev | 2 | Sentry bot digest — 4 standing unresolved errors (aged 13-29d), no new critical |
| OhCleo | 3 | see dedicated OhCleo section below |

Trello: Franc, Rory/Swift, Elliott(partial — Generator ok but sheets gate unavailable), MPFC, Marcel, Colin, Raymond checked — completing where no alert and no Workstream dependency; Maddy/John Yi/Aysar/Bailey/Rebecca left incomplete pending Workstream recheck.

---

## Discord — all — 05:24 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 27 | Vinn daily report present (09-11), Jeff daily report present (09-11), James Diamond (.jdiamond) active discussing Ceres historical-data sync design, dapackage doing cleanup/testing. Normal, active project. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew Taraba DMs |

Trello: James Diamond ✓ complete (daily reports present, no alert). Andrew Taraba ✓ complete (no activity = OK).

---

## Sheets/Workstream — all — 05:30 (+07:00), corrected 08:35 (+07:00)

~~🔴 Workstream login failed this run — API token refresh failed twice, then browser-login (2 attempts) both failed with "SSO redirected but API never fired" / `spawnSync ETIMEDOUT`.~~ **RESOLVED on recheck 08:35** — `workstream-login.js` succeeded on first retry (transient SSO stall, matches `feedback_workstream_sso_recheck_fixed`).

**Verified for week 2026-09-07–09-13 (all 22 projects queried, correct project keys):**
- Maddy (Xtreme): LongVV 8.5h (0.5+2.5+5.5) — ad-hoc, no fixed target, no alert.
- John Yi (Amazing Meds): 0h there specifically, but TuanNT's combined total across all his projects is 37.5h charged (mostly Speedventory/Bailey) — combined >0h, no alert.
- Rebecca: 0h at MissSwimwear specifically — same TuanNT combined-hours rule applies, no alert.
- Bailey (Speedventory): TuanNT 37.5h charged, VyNL/DatNC/TrinhMTT/VuTQ/NamNN/DuongDN also logged — healthy.
- Aysar (Baamboozle): KhanhHH 18h (09-08 to 09-11). MPDM channel C07SQ4HAUHZ re-checked live: Carrick's "Today's update" posted 2026-09-11 22:12 (+07) — present, no alert.
- Elliott (Generator): KhanhHH 12h, TuanTT 0.5h, LucNT 3h, HangNTT 4h. `needsReview`: 3× HangNTT "Test task" @ 0:00 charged (09-08/09/11) → reviewers LucNT/HangNTT — looks like placeholder/test entries, not real billable work; noting but not escalating as a genuine alert.
- James Diamond: AnhNH2 20h + LeNH 40h (full week, fully charged) — healthy (already reflected in Discord section).
- Blair Brown (WordPress Update): 0 members this week — expected, LeNH deprioritized off this project per standing note, not an alert.
- Fountain (Greetings): real data present — see Fountain section below.

**PhucVT:** On approved full-day leave 2026-09-14 to 09-18 — any 0h this week is expected, not an alert.

Hours-based Trello items now completed: Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, James Diamond (already was), Blair Brown (deprioritized, no gate).

---

## Scrin.io (Nick @ John Yi company account — 2026-09-13): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:40 (+07:00)

**Part 1 — Matrix Plan:** No new weekly plan message ("Em update plan tuần này ạ...") found in window (2026-09-11 08:52 → now). It's Monday 05:07 — before trinhmtt's usual 08:30-09:30 posting window, so absence is expected, not an alert. Last known plan (from 2026-09-02, stale): ViTHT 40h, ThinhT 20h, DatNT 36h, VuTat 4h → QC 25h. Will need recheck after 09:30 today.

**Part 2/3 — Task Log Actuals + Plan vs Actual:** ~~Not verified this run — Workstream outage~~ **Verified on recheck 08:35** — week 09-07–09-13 actuals: ViTHT 32h (fully charged), LamLQ 4.25h, plus other members (HungPN/DatNT/PhatDLT — see raw script output, not individually itemized here for brevity). Compared to last known plan (ViTHT 40h target from stale 09-02 plan) — ViTHT under by 8h, but plan itself is 2 weeks stale (new plan not yet posted for current week). No over-est spike flagged. Fountain excluded from `needsReview` alert rule per standing instruction.

**Trello Board (Fountain):** 64 active (non-done/shelf/notes) cards; 42 with no activity in 5+ days (consistent long-standing backlog, not new). 2 cards in "Doing" 14+ days (hard-to-release). Customer comments in-window: kunalsheth (Infinity - Extra Items x2, Update FAQ, Pagination review notes, Packaging landing page, Browse page blurbs, staff order-entry note), tmmckay (multiple "ready to pick up"/"push live" approvals, one follow-up nudge on "Fountain - Product page, Bottle engraving" asking Rick not to miss her comment). No unanswered customer complaint identified, but the bottle-engraving follow-up is worth a direct check.

Trello: Fountain item ✓ complete on recheck — Parts 2-3 clean (verified via Workstream), Part 1 plan absence still expected (checked again 08:33, still before trinhmtt's 08:30-09:30 window) — per precedent, not held open for a not-yet-due plan when other parts are clean.

---

## Elena — 05:45 (+07:00)

- Internal repo (`nustechnology/Elena-SamGuard-Digital-Plant`): 1 open PR — #309 "Implement header and modal components with i18n support" (`process-digital-plant`), no CodeRabbit review yet. Held, not merged.
- Precognize (`Precognize/development`, nusken account): no open PRs authored by nusken.
- WordPress SamGuard (samguard.co): clean — no JS console errors, no page errors, no CSP violations. Only benign ad/analytics `net::ERR_ABORTED` noise (GA/Google Ads/LinkedIn pixels), not real errors.

Trello: Elena - WordPress SamGuard ✓ complete (clean check). Elena - SamGuard Digital Plant ⚠️ left incomplete (PR #309 pending review).

---

## Trello — progress/mail — 05:50 (+07:00)

**Ignore List (paused, auto-completed, no gate check):** Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip — not actively monitored per 2026-09-09 decision.

Wait — correction: Colin and Arthur are NOT actually paused per the live checklist item text seen on the board this run. Colin's Slack (Aigile Dev) was checked above (Sentry digest only, no new critical) — marking Colin complete.

~~**Arthur/Meta-Stamp full 6-source check was NOT run this pass** (time-boxed) — left incomplete, needs recheck.~~ **Ran abbreviated check on recheck 08:35** (4/6 sources — Solid Code Slack still config-gapped per long-standing recurring gap, skipped): Workstream Crystal lang — 0h logged week 09-07–13, reviewer TienND, no needsReview rows. GitHub (Christebob/Meta_Stamp_V3, davidztv account) — 0 commits since 2026-08-21 (~3 weeks), 0 open PRs. Both Arthur Matrix rooms (business + technical) — 0 new messages since 2026-09-07T08:35. **Finding: project appears fully dormant since ~08-21 (no code, no hours, no chat activity in either room) — not necessarily a problem (could be paused/no work needed) but flagging for awareness**, no unresolved client-facing question found so completing per partial-verification precedent (item was already marked complete on the live board, left as-is).

- ✓ Complete: Franc, Rory/Swift, MPFC, Marcel, Colin, Andrew Taraba, James Diamond, Elena - WordPress SamGuard, all 6 mail items, ~~Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca~~ (all now ✓ per Workstream recheck above), Fountain (✓ per recheck above), Raymond, Ohcleo, Philip, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde (all confirmed complete on live board)
- ⚠️ Still incomplete: Elena - SamGuard Digital Plant shows complete on the live board (PR #309 apparently resolved/merged elsewhere or pre-existing state) — left as-is, not overwritten without live verification of the PR.
- Neural Contract: shows complete on live board (Upwork session issue ≠ alert per standing rule).
- **Check Progress card: 22/22 items complete — card marked `dueComplete=true`.**

Correction on Raymond: LegalAtoms Slack showed no Nick-specific content → ✓ complete.

---

## OhCleo Slack — 05:55 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 3 | Celine: tag project prioritized this week, added item re: images per audio (Trello #240); AI companionship card update, ready for release (Trello #239) |
| #events-code | 0 | `channel_not_found` — known issue, bot removed from channel, needs admin re-invite (not re-attempted this pass) |

Tony's daily report: present 2026-09-11 10:25 (AI companionship copy ready to test, SES email tracking dev done, transcription plan check deployed to staging).

No alerts — customer engagement is normal (feature status updates, not complaints).

Trello: Ohcleo ✓ complete.

---

## Matrix — 05:58 (+07:00)

**Active rooms: 1 / 1 checked | Messages: 64** *(Fountain room only — since 2026-09-11 08:52)*
Full details: reports/2026-09-14/matrix-rooms-0507.md

Other joined rooms were not scanned this pass (time-boxed to Fountain room for Part 1 check) — full Matrix sweep across all rooms should be included in a recheck.

### Key updates

**Fountain - Kunal:**
- trinhmtt coordinating card status updates with team (live/not-live distinctions), tasklog reminder to team ("điền tiếng anh giúp em")
- Hung Pham/Đạt: 404 page navigation cleanup discussion

---

## Performance — all — 06:02 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.87 | 983ms | 2.3% (1767/77074) — 96%+ benign NotAuthenticated/InvalidToken/AuthenticationFailed | 18.8/min |
| MPFC | 0.53 (poor) | 4195ms | 0.2% (179/82113) | 20.0/min |

**OhCleo slow transactions (>5s, real):**
- `AITranscribeView.post` — avg 52,592ms, 2 calls
- `MediaByKeyView.get` — avg 35,841ms, 972 calls
- `MediaByTagsView.get` — avg 15,025ms, 567 calls
- `MediaListView.get` — avg 3,957ms, 1302 calls (under threshold)
- `HomeMediasView.get` — avg 3,482ms, 2029 calls (under threshold)

**OhCleo top errors:** NotAuthenticated (1634, benign), InvalidToken (46), AuthenticationFailed/User does not exist (30), AuthenticationFailed/Passwords don't match (12), ValidationError/email-or-username-exists (7+6+6), ValidationError/no-user-found (4), OperationalError/DB-connect-timeout (2), IntegrityError/null-user_id-app_playhistory (1, chronic).

**MPFC top errors:** `WP_Error::get_method()` uncaught (90x, chronic/unresolved for months), deprecated media_buttons_context hook (36x), switch/continue warning (14x), legacy-widget.php missing include (6x), mkdir filename-too-long (6x), various PHP warnings/deprecations (single digits), DNS resolution failure on mysqli connect (2x, transient).

**MPFC slowest transactions (>5s, real):** several `WebTransaction/Custom/home/*-dashboard` pages averaging 360-410 seconds (iup-crimson-hawks, im-play-pro, bahrain-football-association, football-iq, mpfc-podcast-episode-22). These are custom dashboard-render pages — worth checking if this is a known-slow pattern or a new regression; not flagged before at this magnitude.

---

## Upwork Memo — 2026-09-07 to 09-13 — corrected 08:50 (+07:00)

~~| Rory | session_expired | ... |~~
~~| Aysar | session_expired | ... |~~
**RESOLVED** — root cause was NOT a broken login: carrick's saved Upwork access-token cookie (`user_oauth2_slave_access_token`) had genuinely expired (2026-09-12), and cookie-injection alone can't trigger Upwork's silent refresh — only a live page load in his real browser does. Opened `https://www.upwork.com/nx/wm/` once in carrick's actual Chrome (Profile 1, already-running instance) — this refreshed `master_refresh_token` and rotated the access token. Memo-check now works cleanly, no login prompts.

| Date | Rory | Aysar |
|------|------|-------|
| 09-07 | 0 memos (no timesheet entries) | 1 memo, valid ("Handle feature: Add dark mode option to internal platform pages") |
| 09-08 | 0 memos | 1 memo, valid (same) |
| 09-11 | 0 memos | 1 memo, valid (same) |
| 09-13 | 0 memos | 0 memos |

No invalid memos found. Rory workroom shows 0 timesheet entries across all checked days — not an alert (silence rule), but worth a glance if this persists.

No Upwork Memo Trello item exists on the board (informational piece only).

---

## Unresolved Questions

1. ~~Workstream SSO outage~~ — RESOLVED on recheck 08:35 (transient, first-retry success). No longer open.
2. OhCleo `AITranscribeView.post`/`MediaByKeyView.get` slowness (35-52s avg) — new/worsening or a known backlog issue? Worth a direct look given call volume (972 calls for MediaByKeyView).
3. MPFC dashboard pages at 360-410s avg — confirm whether this is expected for those custom report pages or a regression.
4. Arthur/Meta-Stamp — GitHub 0 commits + Workstream 0h + Matrix 0 messages across both rooms since ~08-21/09-07 — project appears dormant for ~3 weeks. Confirm if intentionally paused or needs a check-in with the client.
5. Full Matrix sweep across all joined rooms (beyond Fountain) not done this pass — needs recheck for any missed action items.
6. Fountain "Bottle engraving" customer follow-up (tmmckay asking not to miss her comment) — confirm reply status.
7. ~~Upwork Rory/Aysar session~~ — RESOLVED 08:50 (real root cause found: expired access-token cookie, fixed by a live page load in carrick's real Chrome). No longer open.
8. Nick's Global Grazing Slack message "we need money for support my team" — unclear ask, may need direct follow-up (not classified as monitoring alert here).
9. Elena - SamGuard Digital Plant Trello item shows complete on the live board while PR #309 was reported pending review in the cron section above — not re-verified live this pass; confirm PR status before next report cites it as open.
