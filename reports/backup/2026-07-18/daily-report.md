# Daily Report — 2026-07-18 (Saturday)

**Run:** 2026-07-18T12:28:00+07:00 (cron)
**Window:** 2026-07-17T06:47:00+07:00 → 2026-07-18T12:28:00+07:00
**Leave plan:** ThiHV sick (17/7), TriNM stomach pain/off Elena (17/7), TienND off Arthur (17/7), TamVT half-day (20/7), KhangNHH (24/7), ThienVN (20/7, 21/7), KhanhPQ (23–24/7), TaiTM half-day (20/7) — routine HR leave notes from Direct Manager/leave-tracking room, not blockers.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) / New Relic (fountain) | **FountainGifts production incident** — 12 distinct new Rollbar errors (#276–#287) since 07-17 06:55, dominant classes: `ArgumentError: wrong number of arguments` (75x in window), `NoMethodError: undefined method 'with_connection' for nil:NilClass` (45x), `RuntimeError: Undeclared attribute type for enum 'status' in Order` (32x — matches the Rollbar emails), plus FountainStaging BugSnag NoMethodError/NameError/SyntaxError (db:test:load_schema broken in both test+dev). Active, ongoing, not self-resolved as of window end. |
| 2 | Slack (Equanimity) | Customer ask unanswered ~23h: komal.bailur (xid-technologies) asked Carrick 07-17 12:53+07 for a list of users with invalid/missing data (kenpal.xidtech.com) — zero reply as of 12:28 07-18. Marcel item left open. |
| 3 | Slack (Baamboozle MPDM) + Matrix | Carrick's "Today's update" post to the Aysar MPDM (C07SQ4HAUHZ) has been silent since 07-16 21:46 (covers all of Friday 07-17 + today) — card itself flags Aysar "đang rất RISK". Could not cross-check KhanhHH's hours (Workstream inaccessible, see #6). Left open pending recheck. |
| 4 | Matrix (Resource Arrangement room) | binhnt 07-17 19:51: Baamboozle invoice shows Carrick logged 7h50m but KhanhHH's Workstream entry shows 6h50m — 1h discrepancy, asked DuongDN to follow up with her. Not yet confirmed resolved. |
| 5 | New Relic (mpfc) | Apdex still poor at 0.50 (was 0.47 on 07-17) — dominant real bug persists: `Call to undefined method JSON_API_User_controller::error()` (6x), plus WordPress fatals (`get_header()`, `get_locale()`, `MM_Event` not found) and 2 very slow custom pages (sitemap_index.xml 49.6s, 4 podcast episode pages 41s each) — same missing-page-cache pattern as prior runs, unresolved. |
| 6 | Workstream (internal) | SSO could not be completed non-interactively this cron run (headless visible-browser login has no human to click through, confirmed after 60s timeout + kill). Workstream is now the PRIMARY hours source for every project except Bailey — this blocked live hour verification for LongVV, PhucVT, KhanhHH, LeNH (Sheets-only fallback shows 0h for all 4, but their current projects have migrated off Sheets, so 0h there is not meaningful evidence of no work). TuanNT unaffected (Bailey/Paturevision is Sheets-only, confirmed 8h 07-17). Maddy JIRA weekly check also returned empty (known stale-sheet bug, compounded by no WS access). Needs a human to run `DISPLAY=:1 node scripts/workstream-login.js` and log in within 5 min. |
| 7 | GitHub (Precognize + Arthur) | `nusken` and `davidztv` GitHub accounts are not authenticated in `gh auth` in this environment (only `duongdn` + `mypersonalfootballcoach` present) — blocked Precognize nusken PR check and Arthur's `Christebob/Meta_Stamp_V3` commit check. Known recurring env gap, not a credential failure. |
| 8 | Elena deploy | PR #308 (flicker fix, `dp-fixbug/redemine-79818`) merged clean (CodeRabbit review clean, checks passing) but could not be deployed — no SSH host for MayBanServer configured in this environment's `~/.ssh/config`. Redmine #79818 NOT marked Deployed (deploy didn't actually happen). Needs manual deploy or SSH host added. |
| 9 | Upwork + MS Teams | Both browser-automation checks (Upwork weekly hours, Philip/MS Teams) hung on headless launch and were killed after ~60s — known human-required limitation (CAPTCHA/security wall), not a new issue. Neural Contract + Philip Trello items completed per standing silence-≠-alert policy. |

**Today (Sat 18/7):** Weekend — reduced Slack activity across most workspaces is expected, not treated as alert on its own.

---

## Email — all — 12:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 4 | 1 (leave-request thread, informational) | no events |
| carrick@nustechnology.com | 3 | 1 (Rollbar Socalautowraps daily summary, routine) | no events |
| nick@nustechnology.com | 5 | 3 (Xero API Limit Failover PR — internal dev thread) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 54 | 47 — see ALERTS #1 (Fountain production incident) | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 6 | 3 (JIRA LIFM2-447 mentions, routine) | no events |
| ken@nustechnology.com | 80 | 7 (welligence/web GitHub notifications — appears to be a personal/other-repo subscription, not Precognize/development; no Precognize activity seen this window) | 08:30 DE Daily Standup ×2 |
| vuongtrancr@gmail.com | 8 | 7 (Swish: 1x Delayed-newform daily summary, 1x cybersecurity marketing, 4x New Relic "Signal lost 10min — Low Application Throughput", 1x Sat summary — recurring known pattern, not new) | — |
| dnduongus@gmail.com | 20 | 0 | — |
| davidztv19@gmail.com | 4 | 0 (Basecamp, Stripe payout notice, Railway newsletter — routine) | — |
| freelancer@mypersonalfootballcoach.com | 2 | 0 | — |

Trello: no "Check mail" card exists for 07-17 or 07-18 (most recent instance is 07-16, already `dueComplete`) — per standing rule, never create cards; skipped, logged here.

---

## Slack — all 14 — 12:15 (+07:00)

| Workspace | Msgs (in window) | Key content |
|-----------|------|--------------|
| Baamboozle | 5 | 1 PR review request to Aysar (#639), rest GitHub bot noise. **MPDM (C07SQ4HAUHZ) checked separately — 0 messages, silent since 07-16 21:46 — see ALERT #3.** |
| RDC - FM Monitoring | 51 | Almost entirely automated Tuner/RPi reboot-service bot noise (reconnects, recoveries). One real message: dmetiner replied to Carrick with version numbers for 6 components (audio recorder, preset buttons, LiveMap, etc.) — informational, no open question. |
| Swift Studio | 0 | No activity. |
| Xtreme Soft Solutions | 0 | No activity — Kai/Maddy gate needs Workstream hours to interpret (unavailable this run, see ALERT #6). |
| SAM GUARD - Mobile | 0 | No activity. |
| GLOBAL GRAZING SERVICES | 0 | No activity. |
| Amazing Meds | 0 | No activity (session refreshed successfully, raw cookie fix confirmed working). |
| Generator | 0 | No activity. |
| LegalAtoms | 0 | No Nick-specific activity. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 1 | **komal.bailur (xid-technologies) unanswered customer ask to Carrick — see ALERT #2.** |
| SoCal Auto Wraps | 0 | No activity (not Trello-gated, dropped 2026-05-11). |
| Aigile Dev | 3 | Automated "Measurement Campaign" bot posts only. |

Trello: John Yi, Rory, Franc, MPFC, Raymond, Colin, Rebecca ✓ complete. Maddy, Aysar, Elliott, Marcel ⚠️ left open (see ALERTS #2, #3, #6).

---

## Discord — all — 12:17 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 35 | Active on both channels. **Vinn posted daily report** (PR #599/#600 review, checkin/checkout automation deployed to staging). **Jeff posted daily report** (4h: check-in/check-out API integration, Contractor App build, TestFlight 1.0.0(9)). James Diamond actively directing feature scope; bellatric02 QA testing in progress, working through Forgot Password + Contractor app flows. No unanswered blockers. |
| Bizurk (nuscarrick) | 0 | Zero messages, zero Andrew Taraba DMs — genuinely quiet, token valid. |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Sheets / Workstream — task logs — 12:20 (+07:00)

🔴 **Workstream inaccessible this run** — see ALERT #6. Sheets-only results for 07-17 (Friday, most recent workday):

| Developer | Sheets-only total | Status |
|-----------|-------------------|--------|
| LongVV | 0h (all 13 sheets) | Unverified — LongVV's current work (OhCleo) is Workstream-tracked, not Sheets. No alert issued. |
| PhucVT | 0h (all 13 sheets) | Unverified — same reason (Crystal lang / James Diamond are WS-tracked). No alert issued. |
| TuanNT | **8h** (Paturevision/Bailey sheet — sole source for this project, unaffected by WS outage) | ✓ OK — gates John Yi/Rebecca/Bailey Trello items, all completed above. |
| KhanhHH | 0h (all 13 sheets) | Unverified — Baamboozle/Generator/Radio Data Center are WS-tracked. No alert issued, but blocks Aysar/Elliott completion (ALERT #3, and Elliott left open pending recheck). |
| LeNH | 0h (all 13 sheets) | Unverified — James Diamond/Peptide Clyde are WS-tracked. Blocks Blair Brown completion, left open. |

**Maddy JIRA weekly check:** returned empty ("no ticket entries" for W15) — known stale-sheet bug (script reads an abandoned Sheet, not live Workstream), compounded by WS being down this run. Could not run the 4-part Maddy check (Slack/JIRA/est-actual/PR) in full — Slack (0 msgs) and this JIRA check are the only 2 of 4 parts available this run.

**Needs-review check:** skipped — requires live Workstream `/review/week` data, unavailable this run.

---

## Scrin.io — 12:21 (+07:00)

**Scrin.io (Nick / John Yi — 2026-07-17):** 1h30m logged (1 session, 07:12–08:42AM, app "windsurf").

---

## Fountain — full 3-part — 12:24 (+07:00)

**Part 1 — Matrix plan:** No new plan posted in this window (Monday-only cadence). Most recent known plan (revised mid-week, posted 07-15 16:28 by @trinhmtt): **DatNT 36h, VuTQ 5h, ViTHT 40h, ThinhT 12h → QC 23.25h**.

**Part 2 — Task log actuals:** 🔴 **Not verifiable this run** — Workstream (primary source, project `fountain`) inaccessible (ALERT #6), and the Sheets fallback for Fountain is known to be fully empty since the migration off Sheets. No actuals data this run.

**Part 3 — Plan vs Actual:** Cannot compare — no actuals available (see above).

**Trello board (Web Development):** 1,127 open cards total (977 in Done, mostly historical backlog). Active lists: To-Do 26, Bugs 17, Doing 7, QC Internal Backlog 7, QA Backlog 1, Seasonal 6, Notes 7, Shelf 11. **Zero new customer comments** from kunalsheth/tmmckay/mike62798179/iris63293413 in this window (17 total comments checked, all internal team). **Hard-to-release (Doing 14+ days): 2 cards** — "Fountain & Infinity - Add Subtle Scroll Animations" (87.7 days, growing from 86 days on 07-17 — persistent, unaddressed) and "Infinity Blog" (16.8 days).

Given Part 2/3 unverifiable + the active Rollbar production incident (ALERT #1) + persistent hard-to-release card, **Fountain Trello item left open.**

---

## Elena — 12:26 (+07:00)

**PRs:** 1 open PR (#308, "Prevent flickering when restoring autoscan graph by preloading SVG background", trinm0701) — CodeRabbit review clean, checks passing (success), no risk keywords flagged. **Merged (squash, branch deleted).**

**Deploy:** ⚠️ **Blocked** — no SSH host configured for MayBanServer in this environment (`~/.ssh/config` has no matching alias). PR is merged to `process-digital-plant` but not built/deployed; Redmine #79818 not updated to Deployed since the deploy itself didn't happen. See ALERT #8.

**Precognize (nusken):** ⚠️ Blocked — `nusken` GitHub account not authenticated in this environment's `gh auth` (only duongdn + mypersonalfootballcoach present). See ALERT #7.

**WordPress (samguard.co):** Clean — HTTP 200, zero JS errors, zero page errors, zero CSP violations. `failedRequests` are all ad/analytics tracking pings (`ERR_ABORTED`), not CSP-related — normal noise, not flagged.

Trello: Elena - SamGuard Digital Plant ✓ complete (PR handled, no blocking issues). Elena - WordPress SamGuard ✓ complete (clean).

---

## Matrix — 12:20 (+07:00)

**Active rooms: 11 / 132 | Messages: 155** *(since 2026-07-17 06:47)*
Full details: reports/2026-07-18/matrix-rooms-1220.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Resource Arrangement | 07-17 19:51 | binhnt: "Baamboozle Inc. Carrick Nguyen 7:50 mà bên WS Khánh log có 6:50 thôi, e xem nhắc bạn nha" — 1h invoice/Workstream discrepancy on KhanhHH's logged hours, asked to follow up ⚠️ open |
| Resource Arrangement | 07-17 11:21 | binhnt: "bên maddy có ổn ổn chưa e? hiện c thấy giờ QC vô bên đó tầm gần 20h/w lận, trong khi có 16h dev thôi hà" — Maddy QC hours (~20h/wk) exceeding dev hours (16h/wk), flagged as a ratio concern ⚠️ open |

### Key updates

**Kunal - Fountain** (60 msgs): Team fixing giftdrop engraving-fee edge cases, staging sidekiq email delivery bug found+diagnosed same day, 3 Redmine bugs closed and deployed to Live same-day (#79075, #79785, #79793). Healthy dev velocity, no blockers.

**Arthur - Meta-Stamp** (16 msgs): TienND/PhucVT discussed a quiet day (Nam off, task volume low) — resolved internally, redirected Nick's spare hours to internal Trello backfill + research. See Piece 13 for full detail.

**Elena - Active Alerts** (19 msgs): Normal internal dev chatter — batch action API work, audit log feature in progress, one dev (Tuan) off for the day covered by teammates. No customer-facing issues.

**Direct Manager** (10 msgs): trinhmtt reported bugs/features released (Attendance status feature), one new bug found on live (staff name displaying incorrectly in attendance records) — internal, being tracked.

**Other:**
- Leave-tracking room (KDTJqGQZgGHaRbQlkw): 8 new leave/PL cases processed normally (see report header).
- Maddy - Xtreme: 1 routine JIRA test-help question (LIFM2-409), no urgency signal.
- NUS Technology (general): Birthday celebration + weekend music requests, no work content.

---

## OhCleo Slack — 12:27 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | Silent since window start. |
| #events-code | — | `channel_not_found` (confirmed archived/deleted upstream, not an auth issue — same as prior runs). |

Tony (LongVV) daily report: not found in DM this window. No corroborating Matrix note this run confirming a known-quiet reason (unlike prior "Celine traveling" precedent). Combined with unverified Workstream hours (see Sheets section), **Ohcleo Trello item left open pending recheck.**

---

## Arthur / Meta-Stamp — 12:26 (+07:00)

Full detail: see Matrix room summary above + Slack detail below (Piece 13 ran inline, not a separate file this run given cron scope).

**1) Matrix (2 rooms):** "Arthur - Meta-Stamp" room active (16 msgs) — Nam off for the day, low task volume, team self-resolved by redirecting spare hours to internal Trello backfill + Spotify/SourceAudio research (with Art's explicit OK). Technical setup room: 0 messages, quiet.

**2) Slack (4 channels, since arthur_monitor.last_run 07-15 08:35):**
- MPDM (Art/Jack/namtv): 0 messages.
- **ms-v3 (main channel): 41 messages** — active daily cadence from David (posting daily reports most days: Mon 7h, Tue, Wed 4h partial "family matter", Thu/Fri reports present) and Nick (report present 07-16). Billing/hours clarified with Art (45h total cap, pause-until-funded model). David flagged the "402 Drill-Down" spec (posted by Chris 07-17 02:39 in msv3-official) and asked Art to relay a few confirming questions to Chris — **no visible Art response to this specific request yet** (~4h old as of window end, not clearly urgent/blocking since David continued other work in parallel).
- msv3-official: 1 message (Chris's raw "402 Drill-Down" spec, informational).
- Art 1:1 DM: 0 messages.

**3) Workstream (Crystal lang):** ⚠️ Unavailable this run (ALERT #6).

**4) GitHub (Christebob/Meta_Stamp_V3):** ⚠️ Unavailable this run — `davidztv` not gh-authenticated (ALERT #7).

**Assessment:** Team activity healthy, billing/scope clarified, no unanswered customer-facing blocker. Workstream/GitHub gaps are known environment limitations, not new issues. Trello item completed.

---

## Performance — all 4 — 12:24 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.95 | 326ms | 5.8% (1475/25631) — 97.5% benign `NotAuthenticated` | 14.4/min |
| mpfc | **0.50 (poor)** | 1206ms | 0.06% (25/44672) but low-volume high-severity — see ALERT #5 | 25.1/min |
| fountain | 0.97 | 188ms | 0.18% (104/56684) — see ALERT #1 for detail | 31.9/min |
| infinity | 0.99 | 141ms | 0.006% (1/15772) | 8.9/min |

### OhCleo — full error/slow-transaction detail
**topErrors:** NotAuthenticated 1438 (benign, public endpoints), InvalidToken 20, AuthenticationFailed "Passwords don't match!" 7, AuthenticationFailed "User does not exist!" 5, ValidationError email-exists 2+1, bcrypt hash format 1, invalid verification code 1.
**slowestTransactions:** `MediaByKeyView.get` 11.1s/291 calls (persistent known slow endpoint, worse than 9.9s/629 on 07-17), `MediaListView.get` 2.8s/28, `HomeMediasView.get` 1.9s/556, `RequestPayoutView.post` 1.3s/1, `ValidatePurchaseView.post` 1.1s/4.

### MPFC — full error/slow-transaction detail
**topErrors:** `"continue" targeting switch` warning 6x, `JSON_API_User_controller::error()` undefined method 6x (real bug, persistent), mysqli connection failures 3x+2x, `legacy-widget.php` include failure 2x, `get_header()` undefined 2x+1x, `version.php` include failure 1x, `get_locale()` undefined 1x, `MM_Event` class not found 1x.
**slowestTransactions:** `sitemap_index.xml` 49.6s/1 call, 4 podcast episode pages 41.3–41.6s/1 call each (episode-107, episode-27, episode-28, episode-105-part-2) — consistent with missing page-cache pattern, not new.

### Fountain — full error/slow-transaction detail
**topErrors:** `ArgumentError: wrong number of arguments` 75x (**new, largest volume this run**), `NoMethodError: with_connection for nil:NilClass` 45x, `RuntimeError: Undeclared attribute type for enum 'status' in Order` 32x (matches Rollbar #276+ series), `RestClient::ReadTimeout` 11x, `ArgumentError: logo_full.png not found` 5x.
**slowestTransactions:** `ShipStationProOrderWorker` (Sidekiq) 15.5s/15 calls, `payment_intents#create` 1.5s/57, `product_catalogs#destroy` 1.4s/1, `gifts#index` 1.2s/1517 calls, `cards#pro` 1.2s/6.

### Infinity — full error/slow-transaction detail
**topErrors:** 1x Mailchimp "Member Exists" (benign, duplicate signup).
**slowestTransactions:** `paypals#authorize_order` 3.4s/1, `search#search` 1.4s/58, `paypals#generate_order` 1.3s/1, `payment_intents#create` 1.3s/2, `registrations#create` 1.0s/2.

---

## Trello — 12:28 (+07:00)

**Check Progress: 15/22 complete.** Completed: John Yi, James Diamond, Rory, Franc, MPFC, Elena-SamGuard, Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Philip, Arthur, Elena-WordPress SamGuard.

**Open (7):**
| Item | Reason |
|------|--------|
| Maddy | LongVV hours unverified (Workstream down); 4-part check incomplete (only Slack+JIRA available, both inconclusive) |
| Aysar | MPDM silent 2 days + KhanhHH hours unverified — see ALERT #3 |
| Elliott | KhanhHH hours unverified — same blocker as Aysar |
| Marcel | Unanswered customer ask ~23h — see ALERT #2 |
| Fountain | Production incident (ALERT #1) + Part 2/3 unverifiable + persistent hard-to-release card |
| Ohcleo | No Tony report + hours unverified, no corroborating context this run |
| Blair Brown | LeNH hours unverified (Workstream down) |

**Check Mail:** No card exists for 07-17/07-18 (skipped per no-create-cards rule, see Email section).

---

## Unresolved questions

1. Workstream SSO needs a human login (`DISPLAY=:1 node scripts/workstream-login.js`, 5-min window) to unblock LongVV/PhucVT/KhanhHH/LeNH hour verification, the Maddy JIRA check, needs-review checks, and Fountain Part 2/3 — recommend running this interactively soon.
2. Elena PR #308 is merged but not deployed — no SSH host for MayBanServer configured here. Needs either the SSH host added or a manual deploy.
3. `nusken` and `davidztv` GitHub accounts are not in this environment's `gh auth` — needed for Precognize PR checks and Arthur's GitHub commit check.
4. Baamboozle invoice/Workstream discrepancy (Carrick 7h50m vs KhanhHH-logged 6h50m) flagged by binhnt 07-17 19:51 — needs your follow-up with KhanhHH.
5. Equanimity customer ask (komal.bailur, user list for kenpal.xidtech.com) has been open ~23h — needs Carrick's reply.
