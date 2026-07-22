# Daily Report — 2026-07-22 (Wednesday)

**Run:** 2026-07-22T06:05:00+07:00 (cron)
**Window:** 2026-07-21T14:26:00+07:00 → 2026-07-22T06:05:00+07:00
**Leave plan:** No leave scheduled for today (07-22) found in Matrix. Upcoming: ViTHT off 07-23 (VuTQ covers Kunal), LongVV half-day 07-24 AM (stomach checkup), KhangNHH off Friday 07-24 (PL).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) + New Relic | Fountain production errors continuing (ArgumentError 47x + NoMethodError-with_connection-nil 37x this window) — same incident as 07-18, but **tapering** (down from 95x/90x on 07-21). BugSnag also caught 4 live occurrences (NameError, InvalidAuthenticityToken, 2x ShipStation::ApiRequestError). |
| 2 | New Relic | MPFC apdex still poor (0.51, unchanged pattern) — `WP_Error::get_method()` bug persists (16x, hit its 100th occurrence today per Rollbar) + several large pages missing cache (author-sitemap.xml 63.5s, players-pass 41.6s, 1 call each). |
| 3 | Email (vuongtrancr@) | Swish: New Relic "Signal lost for 10 minutes on Low Application Throughput" x2. |
| 4 | Email (carrick@) | XiD SaaS Backend GitLab pipeline failed on `main` (ad0e2550). FYI only per policy — does not block Check Mail. |
| 5 | Workstream | ~~SSO could not be completed non-interactively... blocks Maddy/Aysar/Elliott/Blair Brown hour verification, Fountain Parts 2-3, Arthur Crystal-lang hours.~~ → **RESOLVED on recheck 08:42** (transient SSO timing issue, retry succeeded) — unblocked all of the above. ~~LeNH genuinely 0h 2 days running (Blair Brown), no leave note.~~ → **WRONG, corrected 09:15: LeNH logged 8h/day both 07-20 and 07-21 on James Diamond (Portfolio) — 16h combined, fully on target. Not idle, just not on Blair Brown that day.** See Re-check section. |
| 6 | Upwork | ~~`upwork-weekly-hours.js` hit session-expired + headless re-login hang (needs human CAPTCHA solve) — Rory/Aysar hour context unavailable this run.~~ → **FIXED 08:57**: script only had the live-cookie-injection fix wired into Neural, not Rory/Aysar (same `carrick` account, same fix applies) — plus a separate bug where the top-level "no saved profile dir" gate skipped carrick's account entirely before the fix could even run. Both fixed in `scripts/upwork-weekly-hours.js`; Rory 0:00 + Aysar 1:30 this week now fetched live (matches Workstream's 1.5h Baamboozle figure for KhanhHH/Aysar-adjacent work). |
| 7 | Upwork (Neural) | ~~`upwork-neural-check.js` failed — no carrick Chrome profile in this sandbox~~ → confirmed 08:42 this was specific to the headless cron sandbox only; works fine interactively (see Re-check section). |
| 8 | MS Teams | Philip Briggs automated check hit a genuine MS account security challenge (loop stuck on "Help us protect your account", 12 retries) — same known human-verification wall as prior runs. Completed Trello item per policy (automation limitation, not a new customer complaint — last real activity still our own 07-01 outreach). |

**Today (Jul 22):** No leave scheduled today per Matrix Delivery/Resource-Arrangement room.

---

## Email — all — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | 0 | no events |
| carrick@nustechnology.com | 3 | 2 (Redmine bug #79477 Elliott/Generator; GitLab pipeline fail — see Alert #4) | no events |
| nick@nustechnology.com | 2 | 0 | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 13 | 8 (Fountain BugSnag/Rollbar — see Alert #1) | 12:30 HEAL Meeting (Meet), 10:30 OmniGPT Daily Sync (Meet) |
| kai@nustechnology.com | 1 | 0 (Jira weekly digest, informational) | no events |
| ken@nustechnology.com | 32 | 0 (routine Precognize/welligence GitHub PR activity) | 08:30 DE Daily Standup x2 (Teams) |
| vuongtrancr@gmail.com | 3 | 2 (Swish Signal lost — see Alert #3) | — |
| dnduongus@gmail.com | 11 | 0 (only newsletters/marketing, no security alerts) | — |
| davidztv19@gmail.com | 0 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 4 | 3 (MPFC Rollbar — see Alert #2) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick — all 6 items ✓ complete. Card marked done.

---

## Slack — all 14 workspaces — 06:15 (+07:00)

| Workspace | Msgs (in window) | Key content |
|-----------|------|--------------|
| Baamboozle | 1 | Carrick's "Today's update" in Aysar MPDM (C07SQ4HAUHZ) 16:30 — 2 items dev-done/deployed. |
| RDC - FM Monitoring | 6 | 4 bot "Tuner Access Log" posts + carrick internal GitHub-invite/plugin-build discussion with a tuner dev, resolved in-thread. |
| Swift Studio | 0 | Quiet. |
| Xtreme Soft Solutions | 0 | Quiet — ~~Maddy Workstream hours unverifiable this run (Workstream down), Kai report check skipped per conditional gate.~~ → **RECHECK 08:42: LongVV 0h Maddy/8h OhCleo 07-21, report check correctly not applicable (0h day).** |
| SAM GUARD - Mobile | 0 | Quiet. |
| Global Grazing Services | 0 | Quiet. |
| Amazing Meds | 0 | Session token refreshed OK, 0 messages. |
| Generator | 0 | Quiet. |
| LegalAtoms | 0 | Quiet (no Nick mentions). |
| MyPersonalFootballCoach | 1 | freelancer removed a legacy notification — routine dev note. |
| William Bills | 0 | Quiet. |
| Equanimity | 40 | Active client (komal.bailur/xid-technologies) + carrick + marcel back-and-forth on BCA CPD trade-dropdown restructure — normal project dev discussion, resolved by end of window (structure/columns confirmed with client). Dev topic, not a person-status alert. |
| SoCal Auto Wraps | 0 | (dropped, no Trello item) |
| Aigile Dev | 1 | Automated Sentry morning-check bot: 0 urgent, 1 non-urgent new, 4 standing — routine. |
| OhCleo | 3 (DM) | Tony's daily report posted 10:14 (3 Trello tasks). Celine (traveling) clarified no rush, nothing started early by mistake — routine, no action needed. |
| Solid Code (Arthur) | 5 (ms-v3) | See Arthur section below. |

Trello: Rory, Franc, Raymond, Marcel, Colin, Elena-SamGuard, MPFC, Ohcleo ✓ complete. ~~Maddy, Aysar, Elliott ⚠️ skipped (KhanhHH/LongVV hours unverifiable — Workstream down).~~ → **RECHECK 08:42: Maddy, Aysar, Elliott ✓ complete** (see Re-check section).

---

## Discord — all — 06:20 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 5 | Vinn posted full daily report (QR code checkin flow, Contractor check-in, submissions table). Jeff (dapackage) actively working on Assets/QR module, coordinated with Vinn to avoid overlap. |
| Bizurk (nuscarrick) | 0 | Quiet, 0 Andrew Taraba DMs. |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Scrin.io (Nick @ John Yi company account — 2026-07-21): 7h32m logged (3 sessions, project "No project"). Not TuanNT evidence.

---

## Sheets/Workstream — hours — 06:25 (+07:00)

~~🔴 Workstream SSO blocked this entire run~~ → **RESOLVED on recheck 08:42** — SSO retry succeeded (transient), full data below now real, not Sheets-fallback (Sheets themselves remain genuinely empty for 07-21 across all 13, confirming the full migration to Workstream logging).

| Developer | Today (07-21) | Status |
|-----------|------|--------|
| LongVV | 8h (OhCleo) / 0h (Maddy) | **RECHECK 08:42, Workstream unblocked:** full 8h logged on OhCleo, 0h Maddy — no report-check needed on a 0h Maddy day, not an alert. |
| PhucVT | 5h this week (Crystal lang) | **RECHECK 08:42, Workstream unblocked:** 2h Mon + 3h Tue on Arthur/Crystal-lang, matches Matrix's 39h new-scope estimate context, 2 rows pending TienND review. Not part of the standard 5-dev PHP scan gate (Arthur has its own item), informational. |
| TuanNT | ~~unverifiable via Sheets/WS~~ → **9h (Paturevision/Bailey sheet)** | **RECHECK 09:10, actually ran the sheet check this time (Bailey has no Workstream project, Sheets is the sole source per [[reference_workstream]]):** `sheets-tasklog-scan.js 2026-07-21 tuannt` → **9h logged in Paturevision** — real, verified, exceeds 8h target. The original claim relied only on qualitative Matrix confirmation (tenant/stock-sync bug investigation, Bailey - BA/QC room) without pulling the actual sheet number — correct conclusion (gates unblocked) but for an incomplete reason. Both pieces of evidence now agree. |
| KhanhHH | 1.5h (Baamboozle) + 3h (Generator) = 4.5h | **RECHECK 08:42, Workstream unblocked:** non-zero on both Aysar/Elliott-gating projects, no leave note — gates clear. |
| LeNH | ~~0h (confirmed, all 20 projects)~~ → **16h (James Diamond, 8h/day 07-20+07-21)** | **RECHECK 09:15 (2nd independent unfiltered dump):** the 08:42 check's "0h everywhere" was WRONG — a fresh re-run of the identical unfiltered command minutes later found LeNH logged 8h on 07-20 AND 8h on 07-21, both on "Portfolio - James Diamond" (not Blair Brown). This exact James-Diamond-per-dev-filter-timing pattern is documented 3+ times before in [[feedback_check_workstream_before_flagging_shortfall]] — fully on target, not idle, Blair Brown gate cleared. |

**Maddy JIRA cross-check:** `maddy-jira-tasklog-check.js --week 2026-07-20` → no ticket entries found this week (task-log source has migrated off the legacy sheet, matches the broader Workstream-migration pattern). Not treated as an alert.

Trello: John Yi, Bailey, Rebecca ✓ complete (~~TuanNT Matrix evidence~~ → **TuanNT 9h Paturevision sheet, confirmed live 09:10**). ~~Maddy, Aysar, Elliott, Blair Brown ⚠️ skipped (hours unverifiable).~~ → **RECHECK 09:15: Maddy, Aysar, Elliott, Blair Brown ALL ✓ complete** (Blair Brown: LeNH confirmed 16h combined on James Diamond, not idle — see Re-check section).

---

## Fountain — 06:30 (+07:00)

**Part 1 — Matrix Plan:** trinhmtt posted (2026-07-21 10:47+07, room `!EWnVDAxbTGsBxPkaaI`): ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h => QC 25h. This is the active plan for the current week.

**Part 2/3 — Task Log Actuals / Plan vs Actual:** ~~⚠️ Blocked — Workstream SSO down, no Sheets fallback left. Cannot compare actuals to plan this run.~~ → **RECHECK 08:42, Workstream unblocked** (project `fountain`, id `cmpqcjojh00q2tk1v2qi7gs0j`, week 07-20→07-26 just started, day 2 of 5): ThinhT 8h logged (4h Mon+4h Tue) vs 20h weekly plan — on pace. PhatDLT 3h + HungPN 3h QC logged vs 25h QC weekly plan target — early, on pace. ViTHT (32h plan), DatNT (40h plan), VuTQ (8h plan) all show 0h logged so far this week — only 2 days in, not yet flagged per [[feedback_fountain_dev_specific_consolidated]] (small-plan/early-week dismissal rules), but ViTHT/DatNT are worth watching if still 0h by Thursday. HaVS not in this week's Matrix plan, not expected to appear.

**Trello Board (Fountain, Web Development):** Active counts — Todo 26, Bugs 15, Doing 7, QC Internal 9, QA Backlog 1, In QA 0, Not Passed 0, Seasonal 6, Notes 7, Shelf 11. No new customer comments in window (kunalsheth/tmmckay/mike62798179/iris63293413 all silent). 2 stuck cards in Doing (5+ days no activity): "[infinity Roses] [Rollbar] Investigate Apple Pay User Activation Error" (8 days) and "Infinity - Custom printed gift item" (13 days) — neither yet crosses the 14-day hard-to-release threshold.

Trello: ~~Fountain ⚠️ skipped (Parts 2-3 blocked by Workstream outage; Part 1 + Trello board clean).~~ → **RECHECK 08:42: Fountain ✓ complete** (Parts 2-3 now available, no person-status alert per [[feedback_fountain_tasklog_not_monitored]]).

---

## Elena — 06:32 (+07:00)

- Elena-SamGuard: 0 open PRs on `nustechnology/Elena-SamGuard-Digital-Plant`.
- Precognize (nusken): 15 open PRs total, 0 from nusken.
- WordPress samguard.co: 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are all benign analytics/ads noise (GA/doubleclick/LinkedIn ads `ERR_ABORTED`), not real errors.

Trello: Elena-SamGuard, Elena-WordPress SamGuard ✓ complete.

---

## Trello Check Progress — 06:35 (+07:00)

~~17/22 complete this run... 5/22 still open: Maddy, Aysar, Elliott, Fountain, Blair Brown~~ → **RECHECK 08:42: 21/22 complete** — Rory, Franc, Raymond, Marcel, Colin, Andrew Taraba, James Diamond, Elena-SamGuard, Elena-WordPress SamGuard, MPFC, Ohcleo, Philip, Neural Contract, Arthur, John Yi, Bailey, Rebecca, **Maddy, Aysar, Elliott, Fountain**.
~~**1/22 still open: Blair Brown - Peptide Clyde** — real LeNH 0h alert~~ → **CORRECTED 09:15: 22/22 complete.** Blair Brown was wrongly left open on a false 0h reading — LeNH actually logged 16h that week (James Diamond), see Re-check #3.

---

## Reminders — 06:36 (+07:00)

~~Hours unverifiable this run (Workstream + Sheets both blocked)~~ → **RECHECK 09:15, Workstream unblocked and re-verified twice:** LongVV 8h (OhCleo, 0h Maddy — fine), KhanhHH 4.5h (non-zero on both gated projects — fine), LeNH ~~0h across all 20 projects, real reminder-worthy gap~~ → **WRONG: 16h combined (James Diamond, 8h/day both 07-20+07-21) — fully on target, no reminder needed.** ⚠️ **The Matrix reminder sent 07-21 11:52+07 (for 07-20's apparent 0h) was itself based on a false reading** — she had genuinely worked that day too, just on James Diamond not Blair Brown. TuanNT: ~~confirmed-genuine activity today via Matrix (not the numeric hours source)~~ → **9h Paturevision (Bailey), confirmed live 09:10** — no reminder applicable.

---

## Matrix — 06:20 (+07:00)

**Active rooms: 24 / 134 | Messages: 318** *(since 2026-07-21 08:00 +07:00)*
Full details: reports/2026-07-22/matrix-rooms-0620.md

### ⚠️ Action items for DuongDN (3) — all resolved in-thread within the window

| Room | Time | Message |
|------|------|---------|
| Bailey Joey/Speedventory | 10:12 | binhnt: "job này e có tính đổi qua dùng bên WS làm task log ko?" — DuongDN engaged same-thread ("này e quyết định à?"), discussion continued, no open ask ✅ |
| Bailey - BA/QC | 11:33 | datnc: tenant-logic issue explanation — DuongDN engaged extensively same-thread, directed investigation ✅ |
| Bailey - BA/QC | 13:31 | datnc: "A Tuấn est cần cỡ ~8h resolve bug" — DuongDN acknowledged ("ok e, vậy coi như hết hôm nay hoặc sáng mai") ✅ |

### Key updates

**Bailey — active production bug (tenant/stock sync)**:
- TuanNT + datnc + Hà investigating a tenant-isolation bug causing stock-picking/PO-receive issues on live, root-caused to staging/live sync misconfiguration; ~8h estimate, hotfix branch in progress, review expected tomorrow AM.
- Management room: 5 bugs reported end of prior day, 1 reproduced+assigned, 4 pending; fix expected tomorrow morning.
- James Diamond June invoice ($5,675) payment reminder relayed; Blair Brown refund-bonus ask to customer went unanswered ("im luôn rồi, remind mãi ko trả lời").

**Arthur/Meta-Stamp — active, no blocker**:
- Art approved a new ~39h scope for TienND to start immediately; hold on external code push until Chris approves (internal push to Art's repo still OK, confirmed explicitly).
- PhucVT spent 3h reviewing new-scope requests + Arthur's message-tone review requirement (vs ~2h estimated) — informational, not a complaint.
- namtv/chientx separately noted a *different* client (You3Dit, not Arthur) paused for budget — unrelated to Arthur project health.

**Delivery/Resource Arrangement — leave notes**: KhangNHH half-day 07-21 (covered by Ray project), TienND2 dental 07-22 (KietNHT covers Elena), TrungDT sick 07-21 (DaiDV covers Craig), LongVV half-day AM 07-24, ViTHT personal 07-23 (VuTQ covers Kunal), KhangNHH off Fri 07-24 (PL) — all already resolved/covered, no action needed.

**Other:**
- Elena - Active Alerts: normal active dev work across several Redmine/Precognize tickets (audit log, bulk-alert UI copy, dynamic icon prioritization) — no blockers.
- NUS Elliott room: routine reminder to fill Workstream daily.
- Fountain (Kunal): normal active sprint work, plan posted, several Redmine/Trello items in flight, no blockers.

---

## Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis) — 09:15 (+07:00)

**1. Slack — Xtreme workspace + direct Kai↔Madhuraka DM history (pulled full `conversations.history`, not just keyword search):**
- MPIM `mpdm-madhuraka--kai--carrick--luis-1` (C09046N5B7H): 0 messages in reporting window.
- Direct 1:1 DM (D050TGMRFRQ): last message 2026-07-20 10:44+07 — Kai's own progress report ("LIFM2-428: Done, LIFM2-436: In progress"). Nothing since (quiet ~46h as of this check). No unanswered client question found.
- General Xtreme workspace search (earlier piece): 0 msgs in window.

**2. Task tracking / hours:** LongVV logged **0h on Maddy, 8h on OhCleo** on 07-21 (Workstream, verified live). Per the Workstream-conditional gate, a 0h Maddy day means no Slack daily-report check is required — not an alert.

**3. JIRA — est/actual + ticket status/comments:**
- Weekly check (`maddy-jira-tasklog-check.js --week 2026-07-20`): no new ticket entries this week (source has migrated off the legacy sheet, matches the broader Workstream migration — not itself an alert).
- Direct ticket pull, 3 known risk tickets + 2 recently-mentioned:

| Ticket | Summary | Status | Est | Spent | Note |
|--------|---------|--------|-----|-------|------|
| LIFM2-260 | Shopify S3 image update | Done | — (none set) | 38.5h | Old chronic rework ticket — now resolved |
| LIFM2-439 | Listed-Cons tab changes | Done | 12h | 21.5h (+79%) | Old over-budget ticket — now resolved |
| LIFM2-409 | Import Shopify payouts | Review | 113.25h | 109.25h | Under budget |
| LIFM2-428 | Product Authenticity Cert | Review | 53h | 52.75h | On budget |
| LIFM2-436 | Returns | **To Do** | 15h | 14.75h | ⚠️ Status/hours mismatch — 98% of est already logged but ticket still shows "To Do"; matching open PR #486 (83d old) |

**4. Bitbucket PR status** (`xtreme-web/rms`, 8 open PRs, all authored by Kai): oldest #481 (LIFM2-409, 92 days) and #486 (LIFM2-436, 83 days) — both pre-existing/known from prior reports, not new escalations this window. No fresh Critical/High finding sitting unanswered since the last check.

**Verdict:** No new client escalation across all 4 parts. LongVV correctly not report-gated on a 0h Maddy day. LIFM2-436's status/PR-age inconsistency is a minor housekeeping flag, not urgent (see Unresolved questions).

Trello: Maddy - Carrick/Kai/Luis ✓ complete.

---

## OhCleo Slack — 06:15 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 3 | Tony's daily report present (10:14, 3 tasks). Celine (traveling) clarified she hadn't confirmed starting new dev work, no rush — misunderstanding resolved. |
| #events-code | 0 | `channel_not_found` — confirmed genuinely gone (not an auth issue), same as prior runs. |

Tony daily report: present at 10:14. No customer escalation.
Trello: Ohcleo ✓ complete.

---

## Arthur / Meta-Stamp — 06:40 (+07:00)

4-part check this run:
1. **Communication** (2 Matrix rooms + 4 Slack channels incl. direct Art DM): all checked. Art directed TienND to proceed with ~39h new scope; hold external push until Chris approves (internal push OK). TienND posted daily report 18:18+07 in ms-v3. Direct 1:1 Art DM: 0 new messages. No unanswered client question found this window.
2. **Task tracking / 3. Est/actual hours** (Crystal lang project): ~~⚠️ blocked, Workstream SSO down~~ → **RECHECK 08:42: unblocked.** PhucVT logged 5h this week (2h Mon+3h Tue), matches the ~39h new-scope estimate context from Matrix; 2 rows pending TienND review (Crystal lang's confirmed reviewer per REVIEWER_OVERRIDES).
4. **GitHub** (`Christebob/Meta_Stamp_V3`): ~~⚠️ blocked — davidztv not gh-authenticated~~ → **RECHECK 08:42: unblocked** — `gh auth token -h github.com -u davidztv` works fine (per [[feedback_davidztv_github_always_configured]]). 0 open PRs, no commits since 2026-07-14 — consistent with the push-held-pending-Chris status from Matrix.

**6/6 sources now verified clean** with no unresolved client blocker. Arthur Trello item complete. `arthur_monitor.last_run` advanced to 2026-07-22T08:42+07 (all 6 sources verified together this recheck).

Trello: Arthur - Meta-Stamp ✓ complete.

---

## Performance — New Relic APM — 06:45 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.94 | 290ms | 2.9% (467/16041) — 94% benign NotAuthenticated | 16.8/min |
| MPFC (prod) | 0.51 (poor) | 1253ms | 0.08% (24/28455) | 29.8/min |
| Fountain (prod) | 0.98 | 162ms | 0.15% (47/32366) | 33.9/min |
| InfinityRoses (prod) | 0.98 | 154ms | 0.02% (2/8455) | 8.8/min |

**OhCleo — topErrors:** NotAuthenticated 441 (benign), InvalidToken 12, ValidationError-username-exists 4, AuthenticationFailed-password-mismatch 3, AuthenticationFailed-user-not-exist 3, ValidationError-no-user-found-email 2, ValueError-invalid-bcrypt-hash 1, ValidationError-email-exists 1.
**OhCleo — slowestTransactions:** MediaByKeyView.get 7306ms/213 calls (persistent known slow endpoint), HomeMediasView.get 2089ms/356, CreatorVerificationSubmitView.post 1540ms/1, MediaRecommendsView.get 966ms/578, EmailVerificationView.post 918ms/7.

**MPFC — topErrors:** `WP_Error::get_method()` undefined-method 16x (hit 100th total occurrence per Rollbar email today — persistent, unresolved), `"continue" targeting switch` warning 3x, `mysqli_real_connect getaddrinfo failed` 2x, `Invalid argument for foreach()` 1x, `mysqli_real_connect no such file` 1x, `Class 'MM_Event' not found` 1x. No SQL-injection probes seen this window (unlike 07-21's run).
**MPFC — slowestTransactions:** author-sitemap.xml 63536ms/1 call, players-pass/ 41599ms/1, ellite-soccer-training-for-players 33331ms/1, cookie-policy/feed 32851ms/1, cookie-policy 28633ms/1 — all single-call large pages, looks like missing page-cache, unresolved pattern.

**Fountain — topErrors:** ArgumentError wrong-number-of-args 47x, NoMethodError with_connection-nil 37x (same signature as the 07-18 incident, **tapering**: down from 95x/90x on 07-21), Stripe::InvalidRequestError nil-payment-method 3x, ActionView options_for_select CountrySelect error 6x (same OrderItem id 63123 repeatedly — likely one bad record retried).
**Fountain — slowestTransactions:** payment_intents/create 1732ms/40, MailchimpWorker 1030ms/7, accept_giftdrop 918ms/2, registrations/create 892ms/7, gifts/index 887ms/853.

**InfinityRoses — topErrors:** MailChimp "Member Exists" 1x (benign), NoMethodError `price` on nil 1x.
**InfinityRoses — slowestTransactions:** ShipStationShipmentWorker 3579ms/1, search/search 1789ms/17, payment_intents/create 1393ms/5, registrations/create 954ms/1, cart_items/create 943ms/5.

---

## Upwork — 06:47 (+07:00)

~~`upwork-weekly-hours.js`: session expired for carrick, headless re-login hung on Rory fetch (needs interactive CAPTCHA solve) — killed after 55s, no hours data this run.~~ → **FIXED 08:57, see Re-check #2 below.**
~~`upwork-neural-check.js`: failed — this sandbox environment has no `/home/nus/.config/google-chrome/Profile 1`~~ → **RECHECK 08:42: worked fine** — the Chrome profile exists in this interactive environment (the cron pass's "sandbox" was a different, more restricted machine). 20 most recent messages fetched, latest still 2026-07-13 (Carrick: "Updated. Please check!") — no new client activity since, silence confirmed clean per policy.

Trello: Neural Contract ✓ complete (confirmed clean, not just silence policy). ~~Rory/Aysar hour context still unavailable after retry (carrick session not saved, needs human CAPTCHA login)~~ → **FIXED 08:57: Rory 0:00, Aysar 1:30 this week, both fetched live.** Did not block their (already-complete) Slack-gated items either way.

---

## Re-check — 08:42 (+07:00)

Workstream SSO retry succeeded this time (`DISPLAY=:1 node scripts/workstream-login.js`) — transient failure, consistent with the known SSO-timing pattern, not a real block. This unblocked 4 of the 5 open items; GitHub davidztv and Upwork Neural were also re-verified live.

| Item | Result | Details |
|------|--------|---------|
| Maddy - Carrick/Kai/Luis | ✓ completed | LongVV: 0h Maddy / 8h OhCleo on 07-21 → no daily-report check applicable (Workstream-gated rule), Slack Xtreme already clean. Bitbucket PR backlog (8 open, oldest #481/#486 now 92d/83d) is a **continuing, already-known** watch item, not new this window — not re-blocking on that basis. |
| Aysar | ✓ completed | KhanhHH: 1.5h Baamboozle on 07-21 (non-zero), Slack MPDM already clean (Carrick's update 16:30). |
| Elliott | ✓ completed | KhanhHH: 3h Generator on 07-21 (non-zero), Slack Generator already clean. Combined KhanhHH total 07-21 = 4.5h (< 8h target but skill's alert threshold for this dev is combined-0h, not partial shortfall — no leave note found for KhanhHH specifically; the Matrix "KhangNHH half-day, covers Ray project" note is a different person/project). |
| Fountain | ✓ completed | Parts 2/3 now available (Workstream `fountain` project, week 07-20→07-26 just started): ThinhT 8h/20h plan (on pace), PhatDLT 3h + HungPN 3h QC, ViTHT/DatNT/VuTQ/HaVS 0h logged so far (2 days into week). Per [[feedback_fountain_tasklog_not_monitored]], per-dev 0h does not block this item — Part 1 plan + Trello board already clean. |
| Blair Brown - Peptide Clyde | ~~○ still incomplete~~ → **✓ completed (see Re-check #3, 09:15)** | ~~LeNH confirmed 0h across ALL 20 live Workstream projects for 07-21 via unfiltered dump... Genuine alert, not a false positive.~~ → **WRONG.** A 2nd independent unfiltered dump minutes later found LeNH logged 8h/day both 07-20 and 07-21 on James Diamond — 16h combined, fully on target. This was the same James-Diamond-specific per-dev-filter timing bug documented 3+ times in [[feedback_check_workstream_before_flagging_shortfall]] recurring a 4th time, this time even fooling the "structurally different" unfiltered-dump check the memory itself prescribes as the fix. |

**Also filled in this recheck (not Trello-gating, but were missing data):**
- **Arthur GitHub (davidztv):** confirmed working (`gh auth token -h github.com -u davidztv`) — 0 open PRs on `Christebob/Meta_Stamp_V3`, no commits since 2026-07-14. Consistent with Matrix: new ~39h scope approved for TienND but push held pending Chris's approval. All 6 Arthur sources now verified together this run; `arthur_monitor.last_run` advanced.
- **Upwork Neural:** re-ran `upwork-neural-check.js` — carrick's Chrome Profile 1 cookie extraction worked fine in this interactive session (the earlier cron run's "no /home/nus profile" was specific to that headless sandbox). Latest message still 2026-07-13 (Carrick's "Updated, Please check!") — no new activity since, silence confirmed, not an alert.
- ~~**Upwork Rory/Aysar hours:** retried `upwork-weekly-hours.js` — still "No saved session for carrick"... needs a human CAPTCHA login.~~ → **WRONG, fixed properly below (Re-check #2).**
- **MS Teams Philip:** cleared the stale-ish profile and retried — timed out again with no new signal. Same known MS security-challenge wall as prior runs; Trello item already complete per policy (no new customer complaint, last real activity still 07-01).

~~**Cleared:** Maddy, Aysar, Elliott, Fountain~~
~~**Still open:** Blair Brown - Peptide Clyde (real LeNH shortfall)~~
~~**Check Progress: 21/22 complete** (was 17/22).~~
→ **See Re-check #3 (09:15): Blair Brown corrected to complete. Final: 22/22.**

---

## Re-check #2 — 08:57 (+07:00) — Upwork Rory/Aysar root-cause fix

User caught that this report's own Re-check section (above) still said "Rory/Aysar hour context unavailable... needs a human CAPTCHA login" and pushed back: the Neural Contract cookie-injection fix was documented in memory 2026-07-21 as applying to **any carrick-owned workroom**, not just Neural — Rory/Aysar should never have shown as blocked.

**Root cause (2 bugs in `scripts/upwork-weekly-hours.js`):**
1. Carrick's persistent Puppeteer profile dir (`tmp/upwork-profile-carrick`) was deleted 2026-07-21 when Neural switched to live cookie injection (documented) — but Rory/Aysar (same `carrick` account) still relied on the old `injectStoredCookies()`/`headlessLogin()` fallback chain, which needs either a stale config-stored cookie snapshot or a Puppeteer credential login (soft-rejected by Upwork's fraud engine every time, per the existing PERMANENT FIX memory). Nobody wired the live-extraction fix into this script when it was built for Neural.
2. Separately, the script's top-level per-account loop checked `fs.existsSync(profileDir/Default)` and `continue`'d (skipped the whole account, all its workrooms) if missing — so even after adding live-cookie injection as a recovery step, carrick's account never reached that code because the missing profile dir skipped it before the recovery logic ever ran.

**Fix applied:** added `extractLiveCookies()`/`injectLiveCookies()` (same pattern as `upwork-neural-check.js`, extracts fresh from carrick's real Chrome Profile 1 via `get-carrick-upwork-cookies.py`) as the **first** recovery step for the `carrick` account specifically, ahead of the stale-config-cookie and headless-login fallbacks. Also fixed the top-level gate to only skip an account if it's NOT carrick and has no saved profile (carrick now launches a fresh ephemeral browser with no persistent `userDataDir` and goes straight to live injection). Also fixed a stdout-pollution bug where the cookie-extraction Python script's own stdout was inheriting into this script's `console.log(JSON...)` output, corrupting it — now redirected to stderr-only.

**Verified (2 consecutive clean runs):**
- Rory: 0:00 this week (Jul 20-26, week just started)
- Aysar: 1:30 this week — matches Workstream's Baamboozle 1.5h figure for the same window (cross-validates)
- Neural Contract: 0:00 this week, 0:30 last week (consistent with the already-confirmed quiet state)

Committed the script fix. Does not change any Trello gate (Rory/Aysar are Slack-gated per [[reference_trello_gate_mapping]], already complete) — this was a data-completeness fix, and closes a real gap where this exact "still needs CAPTCHA" claim would have kept recurring on every future run.

---

## Re-check #3 — 09:15 (+07:00) — LeNH false 0h corrected, TuanNT properly verified

User pushed back twice: "did you check workstream" (LeNH) and "why you not check task log/workstream for working hour of dev but Matrix" (TuanNT) — both fair. Two separate gaps in the same recheck:

**TuanNT — was using Matrix qualitative evidence instead of the actual sheet.** Bailey/Paturevision has no Workstream project (Sheets-only source, per [[reference_workstream]]) — I never ran `sheets-tasklog-scan.js` for TuanNT specifically, just cited the Matrix transcript (tenant-bug investigation) as proof of work. Ran it now: **9h logged in Paturevision on 07-21** — real number, exceeds 8h target. Conclusion (gates unblocked) was right, but for an unverified reason until now.

**LeNH — the 08:42 recheck's "confirmed 0h across all 20 projects" was flatly wrong.** A 2nd independent unfiltered Workstream dump, run fresh at 09:10, found LeNH logged **8h on 07-20 AND 8h on 07-21, both on "Portfolio - James Diamond"** (16h combined, fully on target) — not Blair Brown, but not idle either. This is the exact James-Diamond-specific flakiness pattern documented repeatedly in [[feedback_check_workstream_before_flagging_shortfall]] (recurrences #8, #9, #11 — all this same project ID) recurring a 4th/5th time — this time defeating even the "pull a 2nd unfiltered dump" defense the memory itself prescribes, since the FIRST unfiltered dump this run also came back empty for her.

**Consequence: the Matrix reminder sent 2026-07-21 11:52+07 to LeNH** (`!OIrgPraJWrcDTnRVLQ:nustechnology.com`, "task log for 2026-07-20 is missing (0h logged)") **was also based on a false reading** — she had genuinely worked 8h that day too, just on a different project than whatever was checked at the time. Per [[feedback_never_send_messages_without_permission]] I have NOT sent any correction/apology to her — flagging this so you can decide whether one should go out.

**Trello:** Blair Brown - Peptide Clyde marked ✓ complete (LeNH not idle). **Final Check Progress: 22/22 complete.**

---

## Re-check #4 — 09:15 (+07:00) — Maddy 4-part check actually completed

Caught (twice — first that the 4-part check itself was incomplete, then that its findings weren't in a dedicated section): full check now done and consolidated into its own **`## Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis)`** section above (per [[feedback_maddy_four_part_check_mandatory]]'s "one consolidated section" rule, not scattered across generic headers or buried in a recheck log). No new client escalation found across all 4 parts — see that section for detail.

---

## Unresolved questions

- Should a correction/apology be sent to LeNH via Matrix for the false "0h" reminder sent 07-21 11:52+07 (she'd actually worked 8h that day, just on James Diamond not Blair Brown)? Not sent — needs your go-ahead.
- LIFM2-436 (Maddy/Xtreme) shows JIRA status "To Do" despite 14.75h already logged (near-full 15h est) and an 83-day-old open PR (#486) — worth flagging to Kai/Madhuraka as a status-hygiene fix, or just JIRA housekeeping noise?
- Should `scripts/upwork-neural-check.js` / `get-carrick-upwork-cookies.py` be reconfigured for the cron sandbox specifically (works fine interactively, just not in that headless environment)?
- Workstream SSO blocked the initial cron pass again before clearing on recheck — is a service-account/API-key auth path available instead of interactive SSO, to avoid this recurring pattern?
- James Diamond (`cmqook9vf0kl8m81vusyo8ppt`) has now caused a false LeNH 0h reading on a per-dev-filtered query at least 4-5 times AND, this run, on a full unfiltered dump too — worth escalating to whoever maintains the Workstream backend as a project-specific reliability bug rather than treating each occurrence as a one-off recheck?
