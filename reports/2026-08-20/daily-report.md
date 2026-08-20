# Daily Report — 2026-08-20 (Thursday)

**Run:** 2026-08-20T07:41:15+07:00 (cron)
**Window:** 2026-08-19T07:42:00+07:00 → now
**Leave plan:** No new leave notes for 2026-08-19/20. Resource Arrangement room only shows older (17/08) items, already processed (KhanhHH, SangNV, ThuongNTN — all confirmed/charged).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Workstream (infra) | 🔴 Primary hours source unavailable ALL run — SSO token capture failed on 3 separate attempts (Keycloak session cookies alive, but token-capture API never fired). Blocks: Sheets/task-log hours for LongVV/PhucVT/TuanNT/KhanhHH/LeNH, Maddy weekly hours + JIRA cross-check, Fountain Parts 2-3, Arthur Crystal-lang est/actual, Blair Brown gate. Needs an interactive recheck from the local `nus` session (this run is on the mpfc cron box). |
| 2 | Maddy (Xtreme) | Anoma Wasala reported a new unanswered bug on LIFM2-409 ("Unable to upload new products to Shopify/Xero") 2026-08-19 11:38 — no Kai reply yet as of this report. |
| 3 | Maddy (Xtreme) — Bitbucket | PR #481 (LIFM2-409) still carries Madhuraka's own High-severity finding from 2026-06-06, now 75+ days unaddressed. PR #509 has an unaddressed Rovo Dev null-check finding (6 days). PR #516 has an unaddressed Codex review (42 days). |
| 4 | Aysar (Baamboozle) | MPDM `C07SQ4HAUHZ` has had **no "Today's update" since 2026-08-14** (6 days silent) — longest gap seen. KhanhHH's Baamboozle hours unverifiable this run (Workstream down, see #1). |
| 5 | OhCleo | Celine asked 2026-08-19 19:03 "Can you confirm how open and click tracking is currently set up in Amazon SES?" — unanswered as of this report (last message in window). |
| 6 | InfinityRoses (production) | New Error #443 `ActionController::UnknownFormat`, 2 occurrences, 2026-08-19 15:07 UTC (via rick@ Rollbar). |
| 7 | FirstProject (production) | 10-occurrences-in-5-min spikes: #127 (unknown) 19:10 UTC + #1083 `ChunkLoadError` 23:02 UTC (via rick@ Rollbar). |
| 8 | MPFC (performance) | Apdex 0.64 (poor, <0.7 threshold). `WP_Error::get_method()` fatal — 159 occurrences, chronic/unfixed. |
| 9 | OhCleo (performance) | `MediaByKeyView.get` avg 21.0s / 299 calls — chronic slow endpoint (was 49.4s/539 calls previous report, direction improved but still far over 5s threshold). |
| 10 | OhCleo (performance) | New one-off outlier: `AdminMarketingSendView.post` avg 806.4s / 1 call — needs a look (bulk marketing send or a real hang). |
| 11 | Elena — Digital Plant | PR #309 ("Implement header and modal components with i18n support") stuck in merge-conflict (`dirty`) state, open 9 days, 0 reviews — needs dev rebase before it can auto-merge. |
| 12 | Arthur/Meta-Stamp | Solid Code Slack workspace config entry is missing from `config/.slack-accounts.json` (known gap since 2026-07-13) — blocked 3 of 4 Arthur Slack channels this run; requires David's Chrome profile (interactive session) to re-extract. |
| 13 | Upwork Memo (Piece 15) | Rory/Aysar memo check unavailable — this cron box (`mpfc`) has no access to carrick's Chrome Profile 1 (known architecture limitation, not a real session/auth issue — see [[feedback_neural_consolidated]]). Will resolve on next interactive recheck. |

**Today (Thu 08-20):** No confirmed staff absences reported yet.

---

## Email — all — 07:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | 0 | no events |
| carrick@nustechnology.com | 4 | 0 | no events |
| nick@nustechnology.com | 6 | 0 | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 25 | 22 | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 2 | 2 (JIRA LIFM2-409, see Alert #2) | no events |
| ken@nustechnology.com | 32 | 0 | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 7 | 6 (Swish New Relic "signal lost" ×4 + Rollbar daily summary + cybersecurity newsletter) | — |
| dnduongus@gmail.com | 25 | 0 (personal newsletters/banking, no security alerts) | — |
| davidztv19@gmail.com | 5 | 0 (3× Google security alert — self-triggered from normal login, no breach indicators; Loom/Basecamp notices) | — |
| freelancer@mypersonalfootballcoach.com | 2 | 0 | — |

Rick's 22 alerts break down: 21 are `FountainStaging`/`FountainStagingBE` (staging = INFO only) plus 1 `InfinityRoses` production error (Alert #6) and `FirstProject` production spikes (Alert #7).
Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete (all 6 inboxes fetched successfully — card marked done).

---

## Slack — all 14 workspaces — 07:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 1 (search) / 0 (MPDM this window) | See Alert #4 — MPDM silent since 08-14 |
| RDC - FM Monitoring | 20 | Carrick actively resolving dmetiner's tuner/favorites-bar/LiveMap questions all day — every ask answered same-thread |
| Swift Studio | 9 | Carrick handling BXR-UK dev/production account boundaries, Twilio 2FA setup with jeff — all responsive |
| Xtreme Soft Solutions | 12 | See Maddy section below |
| SAM GUARD - Mobile | 0 | Quiet, no alerts |
| GLOBAL GRAZING SERVICES | 8 | Nick posted daily report (10:26) — Prestashop/Grazing Software items. Joey (client) payment confirmations, all answered by nick/amy |
| Amazing Meds | 0 | Quiet, no alerts |
| Generator | 0 | Quiet, no alerts (Elliott — low-activity normal) |
| LegalAtoms | 0 | Quiet, no Nick-specific mentions |
| MyPersonalFootballCoach | 1 | "Hello" from freelancer, no content |
| William Bills | 0 | Quiet, no alerts |
| Equanimity | 30 | Carrick very engaged with client komal.bailur on BCA SGBuildex data pushes/go-lives (Simlian Rivelle, Sim Lian ST95EC) — all substantive asks answered. One unaddressed internal ping from Marcel to Carrick (13:20, no context/urgency) — informational only |
| SoCal Auto Wraps | — | Dropped 2026-05-11, not monitored |
| Aigile Dev | 2 | Automated blog-post-merged notification only |

### Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis) — 07:35 (+07:00)

**1. Slack:** anomawasala reported "Xero expired?" (10:41) — Kai resolved same-window (10:57, "figured out the reason, don't worry"). Quick response, no lingering issue from Slack alone.

**2. JIRA ticket activity (since last run):** LIFM2-409 got a NEW comment from Anoma Wasala 2026-08-19 11:38: *"@Kai Unable to upload new products to Shopify/Xero. Testing steps: ..."* — **unanswered as of this report** (see Alert #2). This is a different/related issue to the Slack Xero reconnect from earlier that morning. Other active tickets this week: LIFM2-436 (Ready to deploy), LIFM2-428 (Testing - Anoma), LIFM2-450/459/449/455/458 (To Do/Review), LIFM2-452 (Review, since 07-27).

**3. Est/actual hours:** ⚠️ **BLOCKED this run** — Workstream unavailable (Alert #1), and `maddy-jira-tasklog-check.js` (which also depends on Workstream for the est/actual cross-reference) failed identically. Sheets fallback (Maddy sheet) shows 0h but is not trustworthy since Workstream is the actual primary source and is down — treat as unverified, not a real 0h finding.

**4. Bitbucket PR status:** 6 open PRs (`xtreme-web/rms`):
| PR | Ticket | Age | Status |
|----|--------|-----|--------|
| #532 | LIFM2-436 | 1d | new, 0 comments |
| #520 | — | 35d | 0 comments |
| #509 | LIFM2-428 | 58d | Kai approved own review; **Rovo Dev flagged a null-check issue 2026-08-14, unanswered 6 days** |
| #516 | LIFM2-449 | 41d | **Codex review from 2026-07-09, unanswered 42 days** |
| #485 | — | 113d | 0 comments |
| #481 | LIFM2-409 | 121d | **Madhuraka's own High-severity finding (refund payouts double-posted) from 2026-06-06, unanswered 75+ days** — this is the same ticket as the new 08-19 bug report above |

**Conclusion:** Real, ongoing quality-response gap on Maddy — new client bug unanswered + 3 stale PR review findings, one 75+ days old on the same recurring problem ticket (LIFM2-409). Trello: Maddy item ⚠️ **incomplete**.

---

## Discord — AirAgri + Bizurk — 07:05 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 30 | Vinn (dapackage) actively shipping — PR #664 deployed to staging, health & safety fixes, responsive to James Diamond's UI feedback all day. Jeff posted formal daily report (10:26, "Here is my daily report for today (4 hours)") — Contractor App iOS submission fixes. |
| Bizurk (nuscarrick) | 0 | Quiet — normal for this low-communication client, no Andrew Taraba DM activity |

Trello: James Diamond - Vinn ✓ complete, Andrew Taraba ✓ complete.

---

## Sheets/Workstream — 07:15–07:40 (+07:00)

🔴 **Workstream unavailable this entire run** (see Alert #1) — 3 separate SSO login attempts all failed identically ("SSO redirect detected — Keycloak cookies alive" but "no token captured, API never fired"). This is the primary hours source for every project except Bailey/Paturevision.

Sheets-only fallback results for 2026-08-19 (all 13 sheets scanned per dev):

| Developer | Sheets total | Status |
|-----------|--------------|--------|
| LongVV | 0h | Unverified — his projects (Maddy/OhCleo) both live on Workstream now, sheet is dormant by design |
| PhucVT | 0h | Not an alert regardless (adhoc/external, permanently excluded per standing rule) |
| TuanNT | 0h (incl. Paturevision, the one sheet that IS the sole source for Bailey) | See note below — Matrix shows him actively working Bailey/Paturevision same day |
| KhanhHH | 0h | Unverified — Baamboozle/Generator/Elena all live on Workstream, see Alert #4 |
| LeNH | 0h | Unverified — Rory/Franc/Aysar/Blair Brown all live on Workstream |

**TuanNT/Bailey note:** the Matrix "NUS - Bailey - Paturevision 2026" room shows TuanNT actively engaged 10:32–15:47 discussing a real scope gap (grazing-software setup-map feature missing from WBS) and confirming a fix approach — clear evidence of real work that day. The 0h in the Paturevision sheet is most likely not-yet-logged (checked ~07:xx the next morning) rather than a genuine gap — **not treated as a confirmed shortfall**, but the sheet itself should be re-verified once he logs it.

**Maddy JIRA weekly cross-check (`maddy-jira-tasklog-check.js`):** also blocked, same Workstream outage.

No reminders sent (no `--send-reminder` flag; also data is unreliable this run — sending a reminder off an unverified 0h would risk a false alarm, see [[feedback_check_workstream_before_flagging_shortfall]]).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-19): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 07:45 (+07:00)

**Part 1 — Matrix weekly plan:** Found in `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. Posted by @trinhmtt 2026-08-17 10:19 (+07): *"Em gửi plan tuần này ạ — ThinhT: 20h, ViTHT: 40h, DatNT: 36h => QC: 24h"*. (VuTQ/HaVS not named this week.)

**Part 2 — Task log actuals:** 🔴 **BLOCKED** — Workstream unavailable (Alert #1). Sheets fallback checked directly (ViTHT/ThinhT/DatNT) — genuinely empty, consistent with the known migration to Workstream (not itself a red flag, just unverifiable this run).

**Part 3 — Plan vs actual:** Cannot compute without Part 2 data — deferred to recheck.

**Trello board (Kunal - Fountain, board `5475eaf9...`):** 7 new customer comments this window (kunalsheth, tmmckay, mike62798179) — all either already answered (rick570 replied to kunalsheth's ETA ask same morning) or actively being worked by the dev team same-day (confirmed via Matrix: hungpn referencing the delivery-date bug card #2380 and the smart-link empty-gift-item bug at 16:47–16:53). 1 hard-to-release card: "ActionController::BadRequest in GET /admin" — 14 days in Doing.

**Trello: Fountain — DOCUMENT ⚠️ incomplete** (Parts 2-3 unverified this run — not a real over-est/absence finding, just a data gap; Part 1 + Trello board both clean).

---

## Elena — SamGuard Digital Plant — 07:50 (+07:00)

**Pending actions:** `config/.elena-pending-actions.json` — 0 undeployed merged PRs, all 19 historical entries clean.

**Open PRs:** 1 — #309 "Implement header and modal components with i18n support", open 9 days, **`mergeable: false` (dirty/conflicts)**, 0 CodeRabbit reviews yet. Not auto-mergeable — needs a dev to rebase/resolve conflicts before the auto-merge flow can pick it up. (Alert #11.)

**WordPress SamGuard (samguard.co):** Clean — 0 CSP violations, 0 JS errors, 0 page errors. Only benign analytics network calls (GA/ads collect endpoints, non-CSP).

Trello: Elena - SamGuard Digital Plant ✓ complete (no blocking review issues), Elena - WordPress SamGuard ✓ complete.

---

## Matrix — 07:17 (+07:00)

**Active rooms: 22 / 140 | Messages: 604** *(since 2026-08-19 07:42)*
Full details: reports/2026-08-20/matrix-rooms-0717.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Tech Talk coordination | 13:58 | uyenvhp: "Anh Dương ơi, trong email, em thấy hôm nay bên mình có tổ chưc tech talk. Khi nào gần bắt đầu, anh hú em..." — resolved same day (tech talk happened 17:27) ✅ |
| Tech Talk coordination | 10:50 | dongnv: "Anh Dương chiều lỡ em quên join Tech talk thì hú em nha..." — resolved same day ✅ |

### Key updates

**Celine - OhCleo (250 msgs):** Heavy mobile/backend dev activity all day — tag-filtering UX rework, hide-voices filter bugs, email-automation click-tracking questions (unsubscribe → AWS SES). See dedicated OhCleo Slack section for the actual unanswered customer question.

**Kunal - Fountain (74 msgs):** Active QC/dev cycle — several cards moved to beta, tag-logging reminders, mailtrap 2FA hiccup resolved. See Fountain section.

**Equanimity/Bailey QC:** Data-migration/tag-ID char-limit issue logged with WS (Trinh), workstream review discussion (QC charge-by-default policy) between DuongDN and namtv.

**Arthur - Meta-Stamp:** Internal scope discussion — Leo's 9-store→1-source consolidation is urgent (blocking other tasks if delayed); namtv noted the team has "vượt budget quá rồi, ko charge được" (already over budget, can't charge more) — worth watching, not yet a client-facing issue.

**Delivery - Resource Arrangement:** No new leave notes for 08-19/08-20. Prior week's (17/08) KhanhHH/SangNV/ThuongNTN leave notes all confirmed processed by halt.

**Other:**
- Brad Ballantine (Auction Warehouse): 1 forwarded message re: Salvage Solutions text — see Upwork section for full thread status.
- NUS Technology (general): Long Vo's birthday, TuanTT's BA Trainer promotion — social, no action needed.

---

## OhCleo Slack — 07:55 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 8 | Tony's daily report present (12:48). Celine asked about appstore release timing (08:49, answered informally via report), unsubscribe/backend connection (08:59, not explicitly answered), and **SES open/click tracking (19:03, unanswered — last message in window)** |
| #events-code | — | `channel_not_found` — confirmed (again) this is the bot no longer being a member of the channel, not an auth issue. Needs Celine/Tony to re-invite. |

Tony daily report: present at 12:48 (Ready-to-test + Dev-done items listed).
**Alert: Celine's 19:03 SES tracking question is unanswered as of this report.**
Trello: Ohcleo ⚠️ incomplete.

---

## Arthur / Meta-Stamp — 07:58 (+07:00) — partial coverage this run

1. **Matrix (2 rooms):** "Arthur - Meta-Stamp" room — internal discussion of Leo's 9-store consolidation urgency + budget concern (see Matrix section). Technical setup room: no new activity.
2. **Slack (Solid Code):** 🔴 **BLOCKED** — workspace config entry missing from `.slack-accounts.json` (known gap since 2026-07-13, needs David's live Chrome profile to re-extract — cannot be done from this headless cron box).
3. **Workstream (Crystal lang est/actual):** 🔴 BLOCKED (Alert #1).
4. **GitHub (`Christebob/Meta_Stamp_V3`):** 1 new commit since last run — `bcc1d0e` "fix(youtube): limit OAuth to youtube.readonly scope" (davidztv, 2026-08-19 15:43 UTC). 0 open PRs (direct-to-main pattern continues, as expected).

**Coverage this run: 2/4 sources (Matrix + GitHub). Slack + Workstream both blocked by pre-existing infrastructure gaps, not new issues.**
Trello: Arthur - Meta-Stamp ⚠️ incomplete (partial coverage, needs full recheck once Workstream + Solid Code Slack are restored).

---

## Performance — New Relic — 08:05 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| OhCleo (prod) | 0.93 | 452ms | 2.43% (808/33206) — ~94% benign NotAuthenticated/InvalidToken | 23.2/min |
| MPFC (prod) | 0.64 ⚠️ | 855ms | 0.53% (173/32493) | 22.7/min |
| Fountain (prod) | 0.99 | 113ms | 0.002% (1/44871) | 31.4/min |
| InfinityRoses (prod) | 0.98 | 136ms | 0.03% (9/26990) | 18.9/min |

**OhCleo — top errors (full list):**
| Error | Count |
|-------|-------|
| NotAuthenticated (no auth provided) | 758 |
| InvalidToken (token invalid/expired) | 16 |
| AuthenticationFailed (password mismatch) | 13 |
| AuthenticationFailed (user doesn't exist) | 8 |
| ValidationError (email already exists) | 6 |
| ValidationError (no user found for email) | 5 |
| ValidationError (email+username exist) | 1 |
| ValidationError (username exists) | 1 |

**OhCleo — slowest transactions (full list):**
| Endpoint | Avg | Calls |
|----------|-----|-------|
| AdminMarketingSendView.post | 806.4s | 1 (Alert #10) |
| MediaAddTrackAPIView.post | 25.4s | 3 |
| MediaByKeyView.get | 21.0s | 299 (Alert #9, chronic) |
| HomeMediasView.get | 3.1s | 648 |
| RequestPayoutView.post | 2.0s | 1 |

**MPFC — top errors (full list):**
| Error | Count |
|-------|-------|
| WP_Error::get_method() undefined method | 159 (chronic, Alert #8) |
| "continue" targeting switch = "break" warning | 5 |
| require() ABSPATHWPINC/blocks/legacy-widget.php failed | 1 |
| require() ABSPATHwp-includes/version.php failed | 1 |
| mysqli_real_connect connection refused | 1 |
| mysqli_real_connect no such file/dir | 1 |
| mysqli_real_connect DNS resolution failure | 1 |
| get_header() undefined (404.php) | 1 |
| get_header() undefined (twentytwenty index.php) | 1 |
| MM_Event class not found (pfc7 functions.php) | 1 |

**MPFC — slowest transactions (full list):** all one-off sitemap/media-page renders (author-sitemap.xml 44.0s, sitemap_index.xml 43.9s, user-video pages 38.9-42.0s) — same recurring class as prior reports, not new.

**Fountain — top errors:** 1× `RestClient::Exceptions::ReadTimeout`. Slowest: paypals/authorize_order 3.2s/2, payment_intents/create 1.8s/55, gifts/build_a_box_gift_variants 1.2s/103, paypals/generate_order 1.1s/2, registrations/create 0.9s/9. Clean.

**InfinityRoses — top errors:** MultipartPartLimitError ×5 (too many open files), ArgumentError ×4, UnknownFormat ×1. Slowest: paypals/authorize_order 2.9s/1, search/search 2.2s/40, payment_intents/create 1.8s/12, SmsWorker 1.8s/1, admin/gifts/edit 1.6s/9. Minor, consistent with prior reports.

No dedicated Trello item for Performance (informational only).

---

## Upwork Memo — 2026-08-19 — 08:10 (+07:00)

Rory + Aysar workroom memo check unavailable this run — cron box (`mpfc`) has no access to carrick's Chrome Profile 1 (verified: `sqlite3` on `/home/nus/.config/google-chrome/Profile 1/Cookies` doesn't exist on this box — architecture limitation documented in [[project_mpfc_cron_server]], not a real session issue). Neural Contract also unavailable for the same reason (messages-only, no memo needed anyway).

Trello: no dedicated "Upwork Memo" item currently on the board — nothing to gate.

---

## Reminders — 08:12 (+07:00)

No reminders sent (`--send-reminder` not passed). Given Workstream is down all run (Alert #1), 0h readings from Sheets alone are not reliable enough to identify genuine shortfalls today — skipping the reminder check entirely rather than risk a false alarm. Will re-run once Workstream is restored.

---

## Trello — Check Progress + Check Mail — 08:15 (+07:00)

**Check Mail:** 6/6 items ✓ complete (all inboxes fetched successfully). Card marked done.

**Check Progress — completed this run (11):**
- James Diamond - Vinn ✓ (Discord clean)
- Andrew Taraba ✓ (Discord clean, silence normal)
- Rory ✓ (Swift Studio Slack clean)
- Franc ✓ (RDC Slack — Carrick fully responsive)
- MPFC ✓ (quiet, normal)
- Marcel ✓ (Equanimity — Carrick actively handling client, no real alert)
- Elena - SamGuard Digital Plant ✓ (Slack clean, no blocking PR review issues)
- Raymond - LegalAtoms ✓ (no Nick-specific mentions)
- Neural Contract ✓ (standing rule — session/env issues never block this item)
- Colin ✓ (Aigile Dev quiet, normal)
- Elena - WordPress SamGuard ✓ (0 CSP/JS errors)

**Check Progress — left incomplete (8):**
- Maddy - Carrick/Kai/Luis ⚠️ (unanswered client bug + 3 stale PR findings, see Alert #2-3)
- John Yi - Amazing Meds ⚠️ (TuanNT task log unverifiable — Workstream down)
- Aysar ⚠️ (MPDM silent 6 days + KhanhHH hours unverifiable, see Alert #4)
- Elliott - GreenFort Capital ⚠️ (Generator Slack clean, but KhanhHH hours unverifiable — Workstream down)
- Bailey ⚠️ (GGS Slack clean + Nick report present, but TuanNT combined hours unverifiable — Workstream down; Matrix shows real Bailey engagement same day, likely just not logged yet)
- Rebecca - William Bills ⚠️ (Slack clean, TuanNT hours unverifiable — Workstream down)
- Fountain - DOCUMENT ⚠️ (Parts 2-3 blocked — Workstream down; Part 1 + Trello board both clean)
- Philip ⚠️ (MS Teams check still running as of report finalization — see note below)
- Ohcleo ⚠️ (Celine's SES question unanswered, Alert #5)
- Arthur - Meta-Stamp ⚠️ (partial coverage — Slack + Workstream both blocked)
- Blair Brown - Peptide Clyde ⚠️ (LeNH's Workstream scan unavailable)

**Note on Philip:** the MS Teams check (`fetch-msteams-customer-messages.js`) timed out this run (browser flow didn't complete within budget) — will retry via same-day recheck rather than leave unchecked.

---

## Unresolved questions

1. Workstream SSO capture failing identically across 3 attempts on this cron box, despite valid Keycloak session cookies — needs investigation on whether the mpfc box's browser profile itself needs a fresh interactive login, separate from the local `nus` session's working setup.
2. Solid Code Slack workspace token re-extraction needs David's live Chrome Profile 15 — only possible from an interactive local session.
3. Anoma Wasala's new LIFM2-409 bug report and the 75-day-old PR #481 finding are the same recurring "Shopify/Xero payout" ticket — worth raising directly with Kai/team rather than letting it recur a 3rd time.
