# Daily Report — 2026-07-25 (Saturday)

**Run:** 2026-07-25T06:05:37+07:00 (cron)
**Window:** 2026-07-24T08:46:47+07:00 → 2026-07-25T06:05:37+07:00
**Leave plan:** No leave for today (Sat). Recent notes from Delivery-Resource-Arrangement (Matrix): TinPC off 30-31/07, TienND off 24/07 (leg pain — Arthur unaffected, fixed-cost billing, PhucVT covering), ThinhPVD off 24/07 (family, unplanned), VinhNT off 29/07.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Workstream (all projects) | Access token + refresh both failed; interactive company SSO login required (no credential auto-fill in `workstream-login.js`, no human present in unattended cron run). Blocks live hours/reviewStatus verification for every Workstream-tracked project except Bailey (Sheets-only) this run. Needs a persistent authenticated session or non-interactive API credential — flagging as infra gap. |
| 2 | Performance — OhCleo (New Relic) | `MediaByKeyView.get` avg 8864ms/242 calls and `MediaAddTrackAPIView.post` avg 16121ms/4 calls — both >5s, 3rd consecutive day worsening (5146→7306→8602→8864ms). Apdex still OK (0.94), error rate 3.23% (~95% benign `NotAuthenticated`). |
| 3 | Performance — MPFC (New Relic) | Apdex 0.53 (poor, persistent). `WP_Error::get_method()` undefined-method error 78x today (up from 24x prior day) + `JSON_API_Auth_Controller::error()` 5x + `JSON_API_User_controller::error()` 4x. Sitemap (`author-sitemap.xml`) 44.0s. Known unresolved bug, worsening. |
| 4 | Email — rick@ (Fountain/InfinityRoses) | Real production errors: `[FirstProject] production` IntegrationError #1082, ChunkLoadError #1083, 10-occurrence spike #1084 (x2 dup); `[FountainGifts] production` 10th-occurrence #288 (x2 dup). Staging/dev BugSnag noise (ArgumentError, LoadError etc.) excluded as non-production. |
| 5 | Email — vuongtrancr@ (Swish) | `[Delayed-newform] production` New Error #286. |
| 6 | GGS/Bailey (Slack #maintenance) | Nick's automated nightly report normally posts ~02:00-02:16+07 covering the prior day; none posted yet for 07-24 as of check time (06:05 07-25) — last post was 07-24 02:10 (covering 07-23). Recurring nightly memory-spike WARNING (self-resolving, 20+ days) still the only open item in that last report — nothing new, but the missing post itself is new. |
| 7 | Arthur — GitHub check | `davidztv` GitHub account not configured (neither `gh auth` nor `config/.github-config.json` has it, despite memory expecting it). Blocked the mandatory 4-part check's commit-status part (repo has 0 open PRs, everything lands direct-to-main, so PR list alone tells nothing). Setup gap, not a data finding. |
| 8 | Fountain — Part 2 (task log actuals) | Unavailable this run: Workstream down (see #1) and the legacy "Est vs Charged" Sheet is confirmed abandoned (0.00 total, no longer populated since the 2026-07-13 Workstream migration). Matrix chat shows ViTHT/ThinhT/VuTQ/DatNT actively shipping PRs/deploys today (Kunal-Fountain room), so work is happening — just not independently quantifiable this run. |
| 9 | Email — carrick@ (XID/Equanimity) | 2x GitLab pipeline failures (`XiD SaaS Backend`, `cpd-company-trade`) — informational; Equanimity Slack shows active engineering on the same repos same day, likely already being worked. |

**Today (Sat Jul 25):** All present, no leave logged for the weekend itself.

---

## Email — all — 06:20 (+07:00)

Window: IMAP SINCE 23-Jul-2026, filtered ≥ 2026-07-24T01:46:47Z.

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | 0 (leave-request reply, informational) | no events |
| carrick@nustechnology.com | 3 | 2 (GitLab pipeline failures, Alert #9) | no events |
| nick@nustechnology.com | 8 | 0 | 21:30 Weekly Meeting with Devs |
| rick@nustechnology.com | 24 | 22 raw / real subset = Alert #4 | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 1 | 0 | no events |
| ken@nustechnology.com | 80 | 5 (GitHub notifications, `welligence` repo — Ken's personal subscriptions, not Precognize-scoped; informational only) | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 5 | 1 real (Alert #5); 1 marketing (Swish cybersecurity promo, ignored) | — |
| dnduongus@gmail.com | 26 | 0 (Careerviet job-alert filtered as noise per standing rule) | — |
| davidztv19@gmail.com | 9 | 0 (GoDaddy/Stripe/Trello/MongoDB notifications re: Meta-Stamp setup — informational, see Arthur section) | — |
| freelancer@mypersonalfootballcoach.com | 1 | 0 (Rollbar Daily Summary — automated, not an alert) | — |

Trello: Check Mail card not found on board today (not yet created by Power-Up recurring automation) — skipped per standing rule (never create cards manually).

---

## Slack — all 14 workspaces — 06:25 (+07:00)

| Workspace | Msgs (window) | Key content |
|-----------|------|-------------|
| Baamboozle | 11 | Aysar gate (MPDM `C07SQ4HAUHZ`): Carrick's 09:14 "Yesterday's update" present (Issue#640 deployed to Nusdev). `#testing`: skjamie25 asked about weekend release of PR #566, Carrick replied listing #638/#661/#658 ready for Aysar to review/release. Clean, no unanswered customer ask. |
| RDC - FM Monitoring | 11 | All 11 messages are automated "Tuner Access Log" bot posts — no human Franc/dmetiner activity, ad hoc project with no expectation. Clean. |
| Swift Studio | 2 | roryh/henry discussing BXR booking-flow UI review — normal project chatter. |
| Xtreme Soft Solutions | 0 | No Kai/Madhuraka activity this window (Sat). Maddy gate held pending Workstream hours check — see Alerts #1/#8 and dedicated Maddy section below. |
| SAM GUARD - Mobile | 0 | Quiet — no messages; cross-ref Elena section (0 open PRs, clean). |
| Global Grazing Services | 2 (+1 pre-window) | `#change-requests`: joey/amy discussing stock-tracking idea + Gross Purchase Price Adjustment formula question — routine client Q&A, no blocking ask. `#maintenance`: see Alert #6 (Bailey). |
| Amazing Meds | 0 | Token re-verified live (auth.test OK after cookie-encoding fix) — genuinely 0 messages this window. |
| Generator | 5 | business-analysts channel: Elliott/Violet discussing Carrick's ticket hours/scope — normal coordination, no complaint. |
| LegalAtoms | 1 | raymond: "releasing today (or tomorrow), checking the 1st column" — general status, not Nick-specific, no action needed. |
| MyPersonalFootballCoach | 3 | DM messages from "freelancer" account — blank/test-like content ("\", "thử xem ok hok nha"), no clear complaint. |
| William Bills | 0 | Quiet. |
| Equanimity | 32 | `xid-technologies` channel: Carrick/Marcel/komal.bailur active on import/export feature + BCA CPD trade dropdown work; Marcel negotiating estimate (~10h) for AI-assisted work. No Carrick/Marcel alert — active engineering, matches carrick@ email GitLab activity (Alert #9). |
| SoCal Auto Wraps | 0 | Dropped project, no Trello item — informational only. |
| Aigile Dev | 11 | `etz-nus`: Carrick deployed a fix, flagged a separate intermittent page-load issue to Colin (dev-topic, not a customer alert); Colin thanked. `devopps`: Amazon Q bot activity (automated). |

---

## Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis) — 06:30 (+07:00)

1. **Slack**: 0 messages in Xtreme Soft Solutions this window (Saturday, no report expected on a non-report day if no hours logged — see below).
2. **JIRA**: not independently re-pulled this run (blocked behind Workstream hours check below — see Note).
3. **Est/actual + hours**: **Workstream unreachable this run** (Alert #1) — cannot confirm whether Kai logged Maddy hours today, so cannot apply the Kai-daily-report gate ([[feedback_kai_daily_report_gate]]) with confidence. Not flagging the Slack silence as an alert (Saturday + unverified hours = no independent evidence of work).
4. **PR status (Bitbucket)**: not re-checked this run (time-boxed; last known state per memory: several Critical/High findings unaddressed as of 2026-07-15).

**Verdict:** Incomplete — Workstream outage blocks the mandatory hours cross-check. Trello left ○.

---

## Discord — all — 06:35 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 32 | **Vinn daily report present** (22:42 +07, `#airagri_webapp`): "Just report my process today: Review the PRs #604, #605, Fixed the required-field bypass..." **Jeff daily report present** (17:36 +07, `#airagri-flutter`, 4h): file-upload API integration + new Android build. James Diamond gave direction on QR/asset-passport feature + voice-testing flow spec in `#airagri_voicetesting`. Clean. |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew Taraba DMs. Quiet. |

Trello: James Diamond ✓ complete. Andrew Taraba ✓ complete.

---

## Scrin.io (Nick @ John Yi company account — 2026-07-24) — 06:40 (+07:00)

**0h** — no sessions recorded for Nick at John Yi company account. Not TuanNT evidence (Scrin tracks Nick only).

---

## Sheets/Workstream — all developers — 06:45 (+07:00)

🔴 **Workstream (primary source for all projects except Bailey) was unreachable this entire run** — `workstream-fetch-project-week.js` attempted token refresh then interactive SSO login; the SSO flow requires a human to type company credentials (no auto-fill exists in `workstream-login.js`) and none was available in this unattended cron context. Confirmed via live screenshot: browser sat on an empty NUS Technology SSO login form for 5+ minutes with no progress. Killed after timeout. **This is a real, actionable infra gap** — recommend a persistent authenticated browser profile or a non-interactive API credential for Workstream so cron runs don't depend on live human SSO.

Sheets-only results (via `sheets-tasklog-scan.js SKIP_WORKSTREAM=1`, date 2026-07-24):

| Developer | Sheets-only total | Note |
|-----------|-------------------|------|
| LongVV | 0h (sheets) | **Not treated as shortfall** — Matrix (Marcel-XID room) shows LongVV shipped multiple real GitLab MRs for XID today (async-api, saas-backend, saas-frontend, import/export split) and confirmed making up a 20min tracker gap. Real work confirmed outside Sheets/Workstream. |
| PhucVT | 0h (sheets) | **Not treated as shortfall** — Matrix (Arthur - Meta-Stamp room) shows PhucVT actively coordinating GoDaddy access + delivering terms/privacy pages for Chris today. Real work confirmed outside Sheets/Workstream. |
| TuanNT | 8h (Paturevision only; other 4 sheets 0h) | Combined >0h → satisfies TuanNT gate for John Yi/Rebecca/Bailey Trello items. Matrix (NUS-Bailey-Paturevision room) confirms PR #290 merged+deployed+customer notified. |
| KhanhHH | 0h (sheets) | **Not treated as shortfall** — Matrix (Colin-Management room) shows KhanhHH assigned a new ~2h ETZ bug and logged 3.5h on the prior day's bug. Real work confirmed outside Sheets/Workstream, though not independently quantified for today specifically. |
| LeNH | 0h (sheets) | **No corroborating evidence found this run** (not mentioned in Matrix or Slack scans). Given the outage is system-wide (not specific to her), NOT flagging as a hard alert — but this is the one dev with zero independent signal either way. Recommend priority recheck once Workstream access is restored. |

**Maddy JIRA weekly cross-check:** not run this pass (blocked behind the same Workstream outage that blocks the Maddy hours gate — see dedicated Maddy section above). Recommend at recheck.

**Workstream needs-review check:** not run this pass (requires live Workstream API access, unavailable — see Alert #1).

---

## Fountain (Kunal) — 3-part check — 06:50 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. Current week's plan (posted Mon 2026-07-21 10:47 by @trinhmtt, still valid — no new plan expected until next Monday 07/27): ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h, QC 25h.

**Part 2 — Task Log Actuals:** **Unavailable this run** — see Alert #8 (Workstream down + legacy Sheet deprecated/abandoned, confirmed 0.00 total for the week, no longer populated since the 2026-07-13 migration). Matrix chat (Kunal-Fountain room, 14 msgs) shows real activity today: PR review requests (#2982 Stripe error), Infinity Trello cards pulled (order flow, rose-color swatches, NextJS 16 upgrade confirmed live), account/auth ticket moved to staging.

**Part 3 — Plan vs Actual:** Cannot compute — actuals unavailable (Part 2).

**Trello board (customer comments / stuck cards):** not re-pulled this run (time-boxed after Workstream outage consumed significant runtime). Email piece already surfaced real production errors for this project — see Alert #4 (FirstProject/FountainGifts production errors from rick@'s Rollbar/BugSnag feed).

**Verdict:** Incomplete — Part 2/3 blocked, plus open production errors from Alert #4. Trello left ○.

---

## Elena (SamGuard Digital Plant) — 06:55 (+07:00)

- **Internal PRs** (`nustechnology/Elena-SamGuard-Digital-Plant`, duongdn account): 0 open PRs.
- **Precognize** (`Precognize/development`, nusken account — used direct config token, `gh auth` for nusken was stale/unconfigured): 0 open nusken PRs.
- **WordPress SamGuard** (`https://www.samguard.co/`): 0 JS errors, 0 page errors, **0 CSP violations**. Only expected GA/ads analytics `net::ERR_ABORTED` noise (filtered per standing rule). Clean.
- Matrix "Elena - Active Alerts" room: team resolved an audit-log file-write-permission bug + FE/BE response-shape mismatch (200 status, empty payload not surfaced as error) — fixed and deployed to staging same day. Team announced switching this project to Workstream tracking from next week.

**Verdict:** Clean. Trello: Elena - SamGuard ✓ complete, Elena - WordPress SamGuard ✓ complete.

---

## Reminders — 07:00 (+07:00)

No `--send-reminder` flag present — print-only per default. Given the Workstream outage means Sheets-only 0h readings for LongVV/PhucVT/KhanhHH are **not reliable** (real work confirmed via Matrix for all three — see Sheets section), **no reminders were queued or sent this run.** LeNH remains the one dev with genuinely no corroborating signal — recommend a targeted recheck once Workstream is back, not a reminder based on today's incomplete data.

---

## Matrix — 06:15 (+07:00)

**Active rooms: 24 / 136 | Messages: 458** *(since 2026-07-24 08:00 +07:00)*
Full details: reports/2026-07-25/matrix-rooms-0615.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| (unnamed, `!oGYjbzEfphvvauBZtq`) | 17:39 | namtv: "John Yi tám đời ko có task, mày hú ổng phát. Nói nếu tương lai gần ko có task thì close contract Upwork, feedback tốt giùm phát" — John Yi has had no task for a long time; ping him, and if nothing comes up soon, close the Upwork contract with good feedback. ⚠️ open |

### Key updates

**Elena - Active Alerts** — audit-log bug fixed + deployed to staging; team moving to Workstream tracking next week (see Elena section).

**NUS - Bailey - Paturevision** — PR #290 merged/deployed, customer notified; reminder sent to log tasklogs fully.

**Kunal - Fountain** — active PR reviews + Infinity Trello card pulls (see Fountain section).

**Marcel - XID** — LongVV shipped 4 GitLab MRs today; tracker-time gap from the prior day made up.

**Arthur - Meta-Stamp** (technical room) — Chris (client) requested 2 new pages (terms/privacy), delivered same day by PhucVT/TienND (see Arthur section).

**Colin - Management** — KhanhHH assigned new ~2h ETZ bug; logged 3.5h on the prior one.

**Rory Hackett - BXR App** — team investigating Mindbody API gap for slot-booking (no committed API found yet) — active, not blocking.

**Philip Briggs - Elevate365.AI** — confirmed via Teams + API fetch: no new messages; Upwork contract paused by client (also independently confirmed in the resource-arrangement room, "Phil Briggs paused the contract, time tracking not permitted").

**Other:** Bailey - BA/QC: customer will review release payment today or Monday. BDD-Delivery: routine weekly plan circulated. NUS Technology/Đội 2: internal trivia event, no work content.

---

## OhCleo Slack — 07:05 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | No customer messages this window. |
| #events-code | — | `channel_not_found` (channel likely renamed/archived — dormant since 2023 per standing note, not investigated further). |

Tony's daily report: absent this window. **Not flagged as alert** — Workstream (the only hours source for the `ohcleo` project) is unreachable this run, so no independent effort evidence either way (per [[feedback_missing_report_requires_effort_check]], absence of evidence ≠ evidence of absence). Recommend recheck once Workstream access restored.

Trello: Ohcleo ✓ complete (no customer complaint, no confirmed no-work day).

---

## Arthur / Meta-Stamp — 07:10 (+07:00)

1. **Communication (Matrix + Slack)**: Matrix technical room — Chris requested 2 new pages (terms/privacy), estimated ≤1h, PhucVT/TienND delivered same day via GoDaddy+David's Google account access. Slack `msv3-official` (Chris's channel): confirmed delivery 10:37 ("I have completed the two pages... you can check and continue with the issue in Google OAuth"), Chris thanked at 09:57 and closed the loop at 13:21 ("the pages worked perfectly — Google verification went in tonight and branding is under review"). New open question from Chris at 00:47 (2026-07-25, very recent, <1h before this check) about the fingerprinting service — informational only ("answers only, nothing to build"), not yet due for response. `mpdm-art_k--jack--namtv-1`, `ms-v3`, and the direct 1:1 DM with Art — 0 messages this window (quiet).
2. **Task tracking**: covered via Matrix daily notes above (no formal ticket system for this project).
3. **Est/actual hours (Workstream "Crystal lang")**: **unavailable this run** — see Alert #1.
4. **Code/PR status (GitHub `Christebob/Meta_Stamp_V3`)**: **blocked** — `davidztv` GitHub account not configured in either `gh auth` or `config/.github-config.json` this environment (see Alert #7); duongdn's token gets 404 (no repo visibility, private repo). Setup gap.

**Verdict:** Communication part clean and substantive; hours + code-status parts blocked by infra gaps (#1, #7). Trello left ○ pending both fixes.

---

## Performance — all projects — 07:15 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.94 | 309ms | 3.23% (625/19,350) — ~95% benign `NotAuthenticated`/`InvalidToken` | 15.0/min |
| MPFC | 0.53 | 1,178ms | 0.26% (93/35,320) but dominated by a real unresolved bug (see Alert #3) | 27.4/min |
| Fountain Gifts | 0.99 | 124ms | 0.003% (1/33,472) | 25.9/min |
| InfinityRoses | 0.99 | 135ms | 0% (0/10,833) | 8.4/min |

**OhCleo top errors:** `NotAuthenticated` 595 (benign), `InvalidToken` 16, `AuthenticationFailed: User does not exist` 4, `ValidationError: email/username already exists` 3+3, `AuthenticationFailed: Passwords don't match` 1, `ValidationError: username exists` 1.

**OhCleo slowest transactions:** `MediaAddTrackAPIView.post` 16,121ms/4 calls; `MediaByKeyView.get` 8,864ms/242 calls; `HomeMediasView.get` 2,131ms/441 calls; `CreatorPayoutHistoryView.get` 1,085ms/1 call; `MediaRecommendsView.get` 1,042ms/579 calls. (See Alert #2 — worsening trend.)

**MPFC top errors:** `WP_Error::get_method()` undefined method 78x; `JSON_API_Auth_Controller::error()` 5x; `JSON_API_User_controller::error()` 4x; `E_WARNING "continue" targeting switch` 2x; `E_COMPILE_ERROR require() ABSPATHwp-includes/version.php` 1x; `mysqli_real_connect` DNS/socket errors 1x each; `Class 'MM_Event' not found` 1x.

**MPFC slowest transactions:** `author-sitemap.xml` 43,993ms/1; `episode-122-ricky-clarke` 36,302ms/1; `episode-142-nathan-cantrill` 35,624ms/1; `episode-139-kylrn-brooks-lynch` 35,234ms/1; `episode-135-eduardo-oliviera` 33,754ms/1.

**Fountain top errors:** `ArgumentError` wrong number of arguments 1x; `Stripe::InvalidRequestError` invalid payment-method ID 1x. **Slowest:** `paypals/authorize_order` 2,857ms/3, `card_artworks/create` 1,847ms/1, `payment_intents/create` 1,549ms/35.

**InfinityRoses:** 0 errors. **Slowest:** `payment_intents/create` 1,806ms/8, `search/search` 1,334ms/27, `paypals/generate_order` 863ms/1.

---

## Trello — Check Progress — 07:20 (+07:00)

Live checklist state pulled before/after updates.

**✓ Completed this run (16):** John Yi - Amazing Meds, James Diamond - Vinn task, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena - SamGuard Digital Plant, Raymond - LegalAtoms, Neural Contract, Andrew Taraba, Rebecca (William Bills), Colin, Ohcleo, Elena - WordPress SamGuard.

**○ Left incomplete (6):**
- **Maddy** — Workstream outage blocks Kai-hours gate (see Maddy section).
- **Bailey** — Nick's automated nightly report missing for 07-24 as of check time (Alert #6).
- **Fountain** — Part 2/3 blocked (Workstream + deprecated Sheet) + real production errors open (Alert #4).
- **Philip** — MS Teams check not re-run this pass (time-boxed after the Workstream outage investigation); Upwork contract confirmed paused by client via Matrix/email.
- **Arthur - Meta-Stamp** — hours + GitHub commit-status parts blocked (Alerts #1, #7); communication part clean.
- **Blair Brown - Peptide Clyde** — covered by LeNH's Workstream scan, which was unreachable this run (Alert #1).

Card not auto-completed (6 items still ○).

**Check Mail card:** not found on board today — not yet created by the recurring Power-Up. Skipped per standing rule (never manually create cards).

---

## Unresolved questions

1. Workstream SSO needs a non-interactive credential (or a way to keep a long-lived authenticated browser session) so future cron runs don't stall on a live human login page — worth a dedicated fix.
2. `davidztv` GitHub account needs to be (re-)configured (`gh auth login` or a PAT in `config/.github-config.json`) so the Arthur GitHub commit check can run.
3. Confirm whether GGS/Bailey's missing 07-24 nightly report (Alert #6) is a monitoring-bot outage or just delayed — recommend a same-day recheck.
4. LeNH has zero independent effort signal this run (no Matrix/Slack mention, Sheets-only 0h) — needs priority recheck once Workstream access is restored, before treating as a real shortfall.
