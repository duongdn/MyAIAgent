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
| 5 | Workstream | ~~SSO could not be completed non-interactively... blocks Maddy/Aysar/Elliott/Blair Brown hour verification, Fountain Parts 2-3, Arthur Crystal-lang hours.~~ → **RESOLVED on recheck 08:42** (transient SSO timing issue, retry succeeded) — unblocked all of the above. Only remaining real finding: **LeNH genuinely 0h 2 days running (Blair Brown), no leave note** — see Re-check section. |
| 6 | Upwork | `upwork-weekly-hours.js` hit session-expired + headless re-login hang (needs human CAPTCHA solve) — Rory/Aysar hour context unavailable this run, not confirmed clean or shortfall. |
| 7 | Upwork (Neural) | `upwork-neural-check.js` failed — this sandbox has no `carrick` Chrome profile at `/home/nus/...` for live cookie extraction (environment gap, not a credential/CAPTCHA issue like prior runs). Completed Trello item per silence-never-blocks policy; needs the script's cookie source reconfigured for this environment or a manual session. |
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
| TuanNT | unverifiable via Sheets/WS | **Confirmed genuinely active via direct Matrix transcript** (Bailey - BA/QC room, 08:20-16:28+07): investigating tenant/stock-sync bug, estimated ~8h to resolve, hotfix branch created, review pending. Real work confirmed — unblocks John Yi/Bailey/Rebecca gates below despite Workstream/Sheets both being unavailable. |
| KhanhHH | 1.5h (Baamboozle) + 3h (Generator) = 4.5h | **RECHECK 08:42, Workstream unblocked:** non-zero on both Aysar/Elliott-gating projects, no leave note — gates clear. |
| LeNH | 0h (confirmed, all 20 projects) | **RECHECK 08:42, Workstream unblocked:** genuinely 0h everywhere (unfiltered dump), 2nd consecutive day, no leave note — Blair Brown gate stays open, real alert. |

**Maddy JIRA cross-check:** `maddy-jira-tasklog-check.js --week 2026-07-20` → no ticket entries found this week (task-log source has migrated off the legacy sheet, matches the broader Workstream-migration pattern). Not treated as an alert.

Trello: John Yi, Bailey, Rebecca ✓ complete (TuanNT Matrix evidence). ~~Maddy, Aysar, Elliott, Blair Brown ⚠️ skipped (hours unverifiable).~~ → **RECHECK 08:42: Maddy, Aysar, Elliott ✓ complete. Blair Brown still ○ open (real LeNH 0h alert, not unverifiable).**

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
**1/22 still open: Blair Brown - Peptide Clyde** — real LeNH 0h alert (confirmed via live Workstream, not blocked/unverifiable), see Re-check section below.

---

## Reminders — 06:36 (+07:00)

~~Hours unverifiable this run (Workstream + Sheets both blocked)~~ → **RECHECK 08:42, Workstream unblocked:** LongVV 8h (OhCleo, 0h Maddy — fine), KhanhHH 4.5h (non-zero on both gated projects — fine), LeNH 0h across all 20 projects (2nd consecutive day, no leave) — this IS a real reminder-worthy gap, but per [[feedback_never_send_messages_without_permission]] no reminder is sent without an explicit `--send-reminder` flag or user instruction this turn (a reminder was already sent 07-21 11:52+07 for the prior day's 0h). TuanNT confirmed-genuine activity today via Matrix (not the numeric hours source), no reminder applicable.

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

`upwork-weekly-hours.js`: session expired for carrick, headless re-login hung on Rory fetch (needs interactive CAPTCHA solve) — killed after 55s, no hours data this run.
~~`upwork-neural-check.js`: failed — this sandbox environment has no `/home/nus/.config/google-chrome/Profile 1`~~ → **RECHECK 08:42: worked fine** — the Chrome profile exists in this interactive environment (the cron pass's "sandbox" was a different, more restricted machine). 20 most recent messages fetched, latest still 2026-07-13 (Carrick: "Updated. Please check!") — no new client activity since, silence confirmed clean per policy.

Trello: Neural Contract ✓ complete (confirmed clean, not just silence policy). Rory/Aysar hour context still unavailable after retry (carrick session not saved, needs human CAPTCHA login) — did not block their (already-complete) Slack-gated items.

---

## Re-check — 08:42 (+07:00)

Workstream SSO retry succeeded this time (`DISPLAY=:1 node scripts/workstream-login.js`) — transient failure, consistent with the known SSO-timing pattern, not a real block. This unblocked 4 of the 5 open items; GitHub davidztv and Upwork Neural were also re-verified live.

| Item | Result | Details |
|------|--------|---------|
| Maddy - Carrick/Kai/Luis | ✓ completed | LongVV: 0h Maddy / 8h OhCleo on 07-21 → no daily-report check applicable (Workstream-gated rule), Slack Xtreme already clean. Bitbucket PR backlog (8 open, oldest #481/#486 now 92d/83d) is a **continuing, already-known** watch item, not new this window — not re-blocking on that basis. |
| Aysar | ✓ completed | KhanhHH: 1.5h Baamboozle on 07-21 (non-zero), Slack MPDM already clean (Carrick's update 16:30). |
| Elliott | ✓ completed | KhanhHH: 3h Generator on 07-21 (non-zero), Slack Generator already clean. Combined KhanhHH total 07-21 = 4.5h (< 8h target but skill's alert threshold for this dev is combined-0h, not partial shortfall — no leave note found for KhanhHH specifically; the Matrix "KhangNHH half-day, covers Ray project" note is a different person/project). |
| Fountain | ✓ completed | Parts 2/3 now available (Workstream `fountain` project, week 07-20→07-26 just started): ThinhT 8h/20h plan (on pace), PhatDLT 3h + HungPN 3h QC, ViTHT/DatNT/VuTQ/HaVS 0h logged so far (2 days into week). Per [[feedback_fountain_tasklog_not_monitored]], per-dev 0h does not block this item — Part 1 plan + Trello board already clean. |
| Blair Brown - Peptide Clyde | ○ still incomplete | LeNH confirmed 0h across ALL 20 live Workstream projects for 07-21 via unfiltered dump (not just a filtered query) — 2nd consecutive 0h day (reminder already sent 07-21 11:52+07 for 07-20's gap). No leave-plan.json entry, no Delivery/Resource-Arrangement note for LeNH. Genuine alert, not a false positive. No new reminder sent this run (no `--send-reminder` flag / explicit request). |

**Also filled in this recheck (not Trello-gating, but were missing data):**
- **Arthur GitHub (davidztv):** confirmed working (`gh auth token -h github.com -u davidztv`) — 0 open PRs on `Christebob/Meta_Stamp_V3`, no commits since 2026-07-14. Consistent with Matrix: new ~39h scope approved for TienND but push held pending Chris's approval. All 6 Arthur sources now verified together this run; `arthur_monitor.last_run` advanced.
- **Upwork Neural:** re-ran `upwork-neural-check.js` — carrick's Chrome Profile 1 cookie extraction worked fine in this interactive session (the earlier cron run's "no /home/nus profile" was specific to that headless sandbox). Latest message still 2026-07-13 (Carrick's "Updated, Please check!") — no new activity since, silence confirmed, not an alert.
- **Upwork Rory/Aysar hours:** retried `upwork-weekly-hours.js` — still "No saved session for carrick" (Bailey-VietPH/Bailey-DuongDN workrooms fetched fine via cached sessions, both 0:00 this week — informational only, DEV1/DEV3 inactive). Rory/Aysar tracker hours remain unavailable, needs a human CAPTCHA login. Does not block their (Slack-gated, already-complete) Trello items.
- **MS Teams Philip:** cleared the stale-ish profile and retried — timed out again with no new signal. Same known MS security-challenge wall as prior runs; Trello item already complete per policy (no new customer complaint, last real activity still 07-01).

**Cleared:** Maddy, Aysar, Elliott, Fountain
**Still open:** Blair Brown - Peptide Clyde (real LeNH shortfall)

**Check Progress: 21/22 complete** (was 17/22).

---

## Unresolved questions

- LeNH has now had 2 consecutive 0h days (07-20, 07-21) across every Workstream project — worth a direct check-in beyond the automated Matrix reminder already sent?
- Should `scripts/upwork-neural-check.js` / `get-carrick-upwork-cookies.py` be reconfigured for the cron sandbox specifically (works fine interactively, just not in that headless environment)?
- Workstream SSO blocked the initial cron pass again before clearing on recheck — is a service-account/API-key auth path available instead of interactive SSO, to avoid this recurring pattern?
