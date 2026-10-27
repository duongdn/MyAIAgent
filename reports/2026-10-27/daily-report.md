# Daily Report — 2026-10-27 (Tuesday)

**Run:** 2026-10-27T05:00+07:00 → 05:40 (cron, mpfc server), corrected 08:45 (+07:00) (recheck)
**Window:** 2026-10-26 08:40 → 2026-10-27 05:00 (+07:00). Task-log date: **Mon 2026-10-26**
**Leave plan:** `parse-leave-emails.js` refreshed 05:00: no upcoming approved leave. Resource Arrangement (Matrix) for 10-26: MinhTC sick, TienND sick, TrungDT sick, KietNHT off AM, VuTQ off AM. Coming up: ThanhVM off 10-27, LamLQ off 10-29/30, KhangNHH off PM 10-30. Company holiday Tue 24/11 (Vietnamese Culture Day).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Fountain prod (Rollbar + NR) | 🔴 **`LoadError: Could not open library 'vips.so.42'` ×190** on FountainGifts **production** (Rollbar #393, first seen Mon 20:55 VN, hit 100+ occurrences within minutes). `ActiveStorage::AnalyzeJob` ran 450× in the window, so image processing on prod is likely broken. This came right after Mon's release went live (#782/#941, Rick "Pushed to LIVE" 15:21; ViTHT also moved 382 BE + 390 FE file changes to BETA). libvips is probably missing on the prod host. Also new: #390 NoMethodError (16:45), #391 Template::Error no route `admin/product_catalogs#edit` id nil (20:38), and `import_csv` at 190.7s. ([Rollbar](https://rollbar.com) · [NR](https://one.newrelic.com)). Fountain ○. (08:40 NR: **0 errors since 05:00**, vips error not recurring so far; AnalyzeJob ran 1× at 23.2s. Kunal ask still open.) |
| 2 | Fountain (Trello + email) | Kunal 20:24 on [Gift emails card](https://trello.com/c/EOllFmAz): "#773 went live with today's release, so all of this can happen now, steps 1 to 8. **Ideally this week** so the gift emails warm up before November". No reply yet (overnight, <24h). Kunal's email cuts QC hours; TrinhMTT replied 17:18 ("the reduction in QC hours is a little sudden for us…"). New site goes live **today 10-27**. Kunal travels to India 10-29 → 11-11. |
| 3 | Slack GGS (Bailey) | Go-live done Mon (domain switch done in the morning, new mobile build sent 13:40, Nick daily report 17:21 ✅). Joey then reported **live issues 1–4**: PO price wrong after split, order cancelled→shipped by itself, quantity edits not updating movement stock, and intermittent server errors when moving products/pallets. (08:40 recheck: no new GGS messages since 05:00, Joey's 16:04/18:25 asks still unanswered.) 17:52: "**quite major issues with suppliers page calculation**… wrong price". Amy/Nick replied "Checking" and Nick scaled Resque to 8 workers. **Unanswered:** Joey 16:04 + 18:25 in [#strainrite-duplication](https://globalgrazingservices.slack.com/archives/C0338NXK3SB) (resend the estimate; how long to copy his brother's PrestaShop onto the StrainRite console). Bailey ○ |
| 4 | MPFC (billing monitor + NR + Rollbar) | 🔴 Our own `[MPFC] ALERT billing integrity: 1 issue(s)` (Mon 14:42 VN): **35 failed rebills not retried by dunning for 30+ days, so those members keep access unbilled** (e.g. 14735/11348 since 2025-07-17). New Rollbar **#75 ParseError: syntax error, unexpected variable "$ok"** (Mon 15:38 VN, env unknown) and NR `E_COMPILE_ERROR` curly-brace offset ×1. NR apdex **0.38** (chronic poor). `Undefined array key "HTTP_HOST"` still dominant (664). The billing-monitor TEST alerts (×3 Slack, ×2 email) are setup noise ([Rollbar](https://rollbar.com) · [NR](https://one.newrelic.com)). MPFC ○ |
| 5 | OhCleo (Slack + Workstream) | (08:40 recheck incl. thread replies: **still no reply**.) Celine Mon 19:33 VN: "**I noticed, all audios looks like this when you click on them**" (screenshot, [DM](https://ohcleo.slack.com/archives/D0B6846UN8K)). No reply visible in the DM (the script skips threads). LongVV in Matrix 19:57 asked LuHX to check tomorrow, so the team knows. Workstream **needs review: LuHX — Paywall screen redesign (1:30, 10-26) — reviewer(s): DuongDN, MinhTV (OhCleo)**. Ohcleo ○ |
| 6 | Neural Contract | ~~[Upwork room](https://www.upwork.com/ab/messages/) not readable at 05:00 (company PC/cookie vault only available from 08:00). Matrix shows TuanNT updated the 500/501/404 error pages and replied to the customer 13:44, and DuongDN added the explanation on the document-upload workaround (no sudo, so app.php is hardcoded for now). Customer reply not verified yet. Neural ○ (re-run after 08:00)~~ ✅ **08:40 resolved:** Upwork room read live. Last customer msg 06:33 VN today: "i have lodged a support ticket with Help to restart the contract" (statement, no question for us). Our 14:31 VN reply on the error pages stands. Neural ✓ |

**Today (Oct 27):** ThanhVM off. Fountain new site goes live. ✅ Resolved since last report: Maddy PR #534 removed by Kai + LIFM2-473 estimate sent. Aysar "platform repo" ask handled (Carrick shipped the Node 22.23.4 upgrade, PR #751). Neural customer answered (13:44). Rick answered Kunal's release ("Pushed to LIVE" 15:21) and test.infinityroses.com ("All set", 14:56). Chris Coyne confirmed the Railway rotation and Tommy is testing R1 on staging.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 6 | HR: performance evaluations due for ThuongNL / ThanhNX / **LongVV** (deadline 17:30 Fri 10-30). OA: holiday Tue 24/11. Football club sponsorship | no events |
| carrick@ | 2 | ClickUp Swift "T&Cs + Forms". Cloudflare: **upgrade Cloudflare Tunnel to ≥2026.10.2** (action required) | no events |
| nick@ | 0 | — | no events |
| rick@ | 31 | 🔴 FountainGifts prod Rollbar #390/#391/**#393 vips LoadError 100+** (Alert #1). TrinhMTT reply to Kunal on QC hours (Alert #2). FountainStaging BugSnag + InfinityStagingBE #126/#127 (staging only). Rollbar FirstProject (not ours) | 10:30 OmniGPT Daily Sync · 11:00 + 12:30 HEAL Meeting |
| kai@ | 5 | Atlassian "Verifying it's you" + **4× "Your new API token"** Mon 09:02–09:24 VN. Probably our own token rotation (Bitbucket/JIRA check works), but verify | no events |
| ken@ | 80 | GitHub welligence/mimaizumi only. Nothing for nusken | 08:30 DE - Daily Standup (Teams) |
| vuongtrancr@gmail.com | 80 | Swish paused (New Relic Signal lost, Delayed-newform #349–352 counted only). Mirko Bitbucket pushes (info) | — |
| dnduongus@gmail.com | 18 | No breach alerts. AWS Free Tier >85% usage (acct 357066053630). Bank/shop/newsletters | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mpfc | 31 | 🔴 Billing integrity alert (Alert #4). Rollbar #75 ParseError. DigitalOcean **MySQL 8.0 End of Life** notice. iOS 4.3.24 TestFlight. "Stale stuck rebills" repeats | — |

Calendar: ~~not run this pass~~ fetched 08:35 recheck.
Trello: Check mail 6/6 ✓, [card](https://trello.com/c/C2UIwIX7) done.

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 7 | Carrick 09:03 "Let me check" on Aysar's platform-repo ask, then **PR #751 Node 22.23.4 upgrade merged/deployed** 15:30 ✅. MPDM report 10-26 at 17:30 ✅. Jamie asks Aysar (not us) to review PR #748 |
| RDC - FM Monitoring | 5 | Carrick: Node 22.23.4 deployed on Power Group İstanbul ✅. Istanbul fix: all 4 frequencies scanning, asked dmetiner to retest (ball with customer) |
| Swift Studio | 11 | Jeff: unreleased build (Liability Waiver/Onboarding/Klaviyo). Rory 13:58 "Please release them all", Jeff submitting. Carrick scoped QR-code embedding + T&Cs/Forms. Rory 21:41 clarified the rotating QR (member ID only) |
| Xtreme Soft Solutions | 2 | Kai 09:26 "I removed" (PR #534) ✅. 09:32 "I estimated on 473" ✅ |
| SAM GUARD - Mobile | 100 | Elena OP team (Elena DP on Ignore List), not reviewed |
| Global Grazing Services | 43 | Go-live + live issues 1–4 + supplier price issue (Alert #3). Nick "Today report" 17:21 ✅ |
| Amazing Meds | — | invalid_auth (Ignore List, not needed) |
| LegalAtoms | 2 | Raymond/Armaghan UI discussion (not to Nick) |
| MyPersonalFootballCoach | 4 | 3× billing-monitor TEST alerts (setup). 16:46 freelancer posted an unrelated mangadex.org link in DM `U03G7B08D24` (looks like a mis-paste into a work DM) |
| Generator / William Bills / Equanimity / SoCal / Aigile | 0 | — |
| Meta-Stamp | 2 | David 08:52: R1+B1+rate limiting on staging, Railway rotation done. Chris 23:22: "Rotations done… Tommy started on staging Friday. I'll post his results" |

Trello: Rory ✓ · Franc ✓ · Marcel ✓ · Raymond ✓ · Aysar ✓ · Maddy ✓ · ⚠️ Bailey (Alert #3) · ⚠️ MPFC (Alert #4)

---

## Discord — all — 05:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 29 | Vinn daily report ✅ (review PRs #784/#804, multi-property user assign/invite). Jeff daily report ✅ (4h, Team App QR access-request flow). James clarifying plan gating (Weather silver+gold, Safety Docs gold). PR #784 approved, waiting on staging test |
| Bizurk (nuscarrick) | 1 | animeworld DM, no new ask |

Trello: James Diamond ✓ · Andrew Taraba ✓

---

## Scrin.io — 05:12 (+07:00)
**Scrin.io (Nick @ John Yi company account — Mon 10-26):** 0h, no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — Mon 10-26 — 05:15 (+07:00)

Raw `/review/week` rows checked (not just the aggregate).

| Developer | Mon 10-26 | Breakdown | Status |
|-----------|-----------|-----------|--------|
| PhucVT | 0h | — | ⏳ not logged yet. Active Mon in Matrix (Bailey sync investigation, James DefinitiveGuide handover) |
| TuanNT | 0h | — | ⏳ not logged yet. Active all day in Matrix (Bailey go-live, Neural error pages) |
| KhanhHH | 3.67h | Baamboozle 2.5 · BXR 1.17 | ⏳ partial |
| LeNH | 8h | James Diamond 8 | ✅ |
| LongVV | 0h | — | informational (active in OhCleo/James rooms) |

The Monday 0h pattern is team-wide (ViTHT, HungPN, PhatDLT, VyNL also 0h so far). This looks like normal Tuesday-morning logging lag, not absence. Re-check after 10:00 before any reminder.

**Workstream per project (dev hours · reviewer charged · review status):**
| Project | Dev hours Mon (week) | Reviewer charged | Review status |
|---------|----------------------|------------------|---------------|
| Baamboozle | KhanhHH 2.5h | — | need_review = false |
| James Diamond | LeNH 8h | PhucVT 0h, LeNH 8h | NotRequired (0 Pending) |
| Fountain | ThinhT 4h, VuTQ 4h | VuTQ 4h, DuongDN 0h | excluded (Fountain) |
| Speedventory (Bailey) | DatNC 0h (row 0:00), NamNN 1.75h | — | need_review = false |
| Rory (BXR) | KhoaTD 1.33h, KhanhHH 1.17h | — | need_review = false |
| OhCleo | LuHX 1.5h | DuongDN 0h, MinhTV 0h | ⚠️ **Pending** (LuHX Paywall redesign 1:30), Alert #5 |
| Maddy / Rebecca / Colin / Generator / Marcel / Neural / RDC / Crystal lang / Meta-Stamp / Definitive Guide / Andrew / Auction Warehouse / SamGuard | 0h so far | — | no rows |

---

## Maddy — W 10-26 — 05:15 (+07:00)

### 1. Task Log Hours
| Developer | Mon 10-26 | Weekly Maddy total | Status |
|-----------|-----------|--------------------|--------|
| LongVV | 0h | 0h | ad-hoc, informational |

DuongDN (Celine room 08:53): LongVV covers Maddy + Celine this week. If Maddy needs more than 10h, flag it, because it breaks Celine's 30h plan.

### 2. Slack / Kai Daily Report Check
- WS Maddy 10-26 = 0h, so no Kai report was expected.
- Kai 09:26 "I removed" (PR #534) ✅. 09:32 "I estimated on 473" ✅. Both of yesterday's open asks are closed.

### 3. JIRA (weekly cross-check)
`maddy-jira-tasklog-check.js --week 2026-10-26`: no Workstream entries this week yet.

### 4. Bitbucket PR Status
Live 05:15: 4 open Kai PRs (`xtreme-web/rms`): [#560](https://bitbucket.org/xtreme-web/rms/pull-requests/560) LIFM2-471 (10-21) · #540 LIFM2-450 (0 comments) · #509 LIFM2-428 · #481 (waiting on the customer, not a blocker). **#534 is gone (removed)** ✅.

Trello: Maddy ✓

---

## Fountain — 05:20 (+07:00)

**Part 1 — Matrix plan:** @trinhmtt Mon 10-26 09:29 ("Em gửi plan tuần này"): **VuTQ 20h · ThinhT 20h · ViTHT 40h → QC 20h**.

**Part 2 — Workstream actuals (W 10-26, Mon only so far):** ThinhT 4h · VuTQ 4h (VuTQ off Mon morning) · ViTHT 0h (active in room, likely not logged yet) · PhatDLT 0h · HungPN 0h.

**Part 3 — Plan vs Actual (W 10-26, day 1 of 5):**
| Dev | Plan | Actual (Mon) | Note |
|-----|------|--------------|------|
| ViTHT | 40h | 0h | not logged yet |
| ThinhT | 20h | 4h | on pace |
| VuTQ | 20h | 4h | on pace (half day) |
| QC (PhatDLT + HungPN) | 20h | 0h | Kunal is cutting QC hours (email, Alert #2) |

**Part 4 — Capacity & Runway:** not re-fetched (sheet frozen). Last value (10-22): Narrow 229.00h / 28 tasks · Broad 328.50h / 63 tasks.
**Part 5 — Over-estimate:** last value (10-22): 36 items actual > (Est+CR)×1.2. Frozen.

**Trello board ([Web Development](https://trello.com/b/UDrSWage)):** Rick 09:00 asked Kunal to invite rick@/trinhmtt@/parker@ to the Fountain Blog org. Rick 14:56 test.infinityroses.com "All set" (branch `infinity_test`). Rick 15:21 Monday Oct 26 release "Pushed to LIVE" ✅. ⚠️ Kunal 20:24 gift-email subdomain steps 1–8 "ideally this week" (Alert #2). Matrix: card 3117 Infinity gift-variant export goes live together with the XML/JSON export fix. Redmine #81525 bug being re-tested by HungPN.

Trello: ⚠️ Fountain - DOCUMENT skipped (Alerts #1, #2)

---

## Elena — 05:22 (+07:00)
Elena DP on the Ignore List (PRs/deploy not run). **WordPress samguard.co:** status 200, 0 jsErrors, 0 pageErrors, 0 cspViolations, 7 failed requests (GA/ads beacon noise). Clean.

Trello: Elena - WordPress SamGuard ✓

---

## Trello — Check progress — 05:35 (+07:00)

~~17/22~~ **18/22 complete** (live 08:43). [Card](https://trello.com/c/0yqnYznV)
- ✓ Maddy · James Diamond · Rory · Aysar · Franc · Marcel · Raymond · Andrew Taraba · Arthur - Meta-Stamp · Elena - WordPress SamGuard
- ⚠️ MPFC: skipped (Alert #4)
- ~~⚠️ Neural Contract: skipped~~ ✓ completed 08:43 (Upwork read, no open ask)
- ⚠️ Bailey: skipped (Alert #3)
- ⚠️ Fountain - DOCUMENT: skipped (Alerts #1, #2)
- ⚠️ Ohcleo: skipped (Alert #5)

Check mail: 6/6 ✓, [card](https://trello.com/c/C2UIwIX7) done.

## Ignore List — 05:35 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard Digital Plant, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:35 (+07:00)
- PhucVT, TuanNT: 0h for Mon 10-26 so far, but both were visibly working all day in Matrix and the whole team shows Monday lag. Before 10:00, so skipped. Re-check after 10:00 (not sent; `--send-reminder` not passed).
- KhanhHH: 3.67h so far, partial. Re-check after 10:00.
- LeNH: 8h ✅. LongVV: ad-hoc, no reminder.

---

## Matrix — 05:03 (+07:00)

**Active rooms: 22 / 152 | Messages: 435** *(since 10-26 08:40)*
Full details: reports/2026-10-27/matrix-rooms-0503.md

### Key updates

**Bailey — go-live day:**
- The customer asked to go live Mon morning. TuanNT moved the domain to the prelive stack, NamNN built the live mobile app, and DatNC tested orders (40771/40772 sync was slow at first, then went through).
- PhucVT joined to investigate the sync. Failed jobs were calling `prelive2`, a config left over from the domain switch. TuanNT fixed it. PhucVT asked for timeouts on console calls and for CURLOPT_VERBOSE to be turned off.
- VuTQ/NamNN listed the upgrade details for Joey (Ruby 2.7.4→3.1.2, Gradle/AGP/Java). VyNL: Redmine #80599 postal-code sync (pre-existing bug).
- halt asked whether any Bailey milestone is billable. DuongDN: "chưa, đang làm để release" (not yet, still working toward release).

**Neural — customer complaint:**
- DuongDN 09:13: the customer is complaining about leftover bugs, handle it today (after Bailey). TuanNT: the fix needs sudo, which we don't have, so config is hardcoded temporarily. DuongDN: "vụ ko test kĩ thật sự ko ổn" (not testing properly really isn't OK). 13:44 error pages updated and the customer was answered.
- namtv: the Neural contract has been paused for a long time. Asked to resolve so last week's hours can be reported. Done.

**OhCleo — release prep:**
- Celine plan this week is 30h. LongVV does Maddy + Celine. PhucVT takes James.
- LuHX: Paywall redesign (~2h) and a staging build. HungPN found a Samsung payment-screen issue (needs internal testing track). The search fix is OK (17:21). Celine wants to submit the new app (covers + new design + search) for review.
- LongVV 19:57 asked LuHX to check Celine's issue tomorrow (Alert #5).

**Fountain:** weekly plan posted 09:29. ViTHT moved 382 BE + 390 FE file changes to BETA. Release 26 went live (VuTQ). ThinhT PR #810 Infinity export. Redmine 81404/81405/81525 testing.

**Other:**
- Rory/BXR: Upwork tracking resumed (minhtv: use the tracker). KhoaTD/KhanhHH estimating a new ClickUp scope (BE + mobile, ~1 week+).
- Resource Arrangement: leave list (see header).
- Tech/security: MinhTV asked DuongDN to run the PolinRider malware scanner. DuongDN scanned 111 repos, clean. MinhTV's team found 2 infected machines.
- Kunal-room side chat: DuongDN shared Claude magic-login links in-room for the Rick account, which ran out of tokens (sensitive, links not copied here).
- HR: week 19–25/10 hours summary posted. Staff evaluations due Oct 30.
- Recruitment: BDM interviews ongoing.

---

## OhCleo Slack — 05:12 (+07:00)
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 13 | Tony estimated ~8h per remaining To Do card. GA access granted. Celine: anything left before submitting the new app for review? Tony: nothing, ready. **Tony report 17:17 VN** (Analytics tracking deployed on prod, Story Companion planning). ⚠️ Celine 19:33 VN audio-click issue (screenshot), no visible reply. 21:58 VN Celine created an OpenRouter account ($10) + org invite |
| #events-code | — | channel_not_found (bot removed, needs admin re-invite) |

Tony daily report: present (Mon 17:17 VN). Times above converted from UTC (+7h).

Trello: ⚠️ Ohcleo skipped (Alert #5)

---

## Performance — 05:25 (+07:00)
Window since 10-26 05:20 (~24h).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.99 | 121ms | 1.2% (616/49496), ~85% benign NotAuthenticated | 34.7/min |
| mpfc (prod) | **0.38** | 2399ms | 6.5% (927/14179) | 10.0/min |
| fountain | 0.98 | 158ms | 9 / 106312 (+190 vips LoadError) | 74.6/min |
| infinity | 0.98 | 139ms | 4 / 18559 | 13.0/min |

**OhCleo top errors:** NotAuthenticated 524 · InvalidToken 25 · AuthFailed "User does not exist" 17 · ValidationError email exists 17 · invalid verification code 16 · username exists 8 · "Passwords don't match" 4 · no user with email 2 · email exists (variant) 2 · invalid reset code 1. `cover_by_creator` error gone ✅.
**OhCleo slowest:** ChatSendView.post 3528ms/15 · ValidatePurchaseView.post 1206ms/8 · CreatorVerificationSubmitView.post 1198ms/2 · GetBookMarkDetailsView.get 1172ms/942 · CancelSubscription 1033ms/1.

**MPFC top errors:** Undefined array key "HTTP_HOST" 664 · read property "ID" on null 174 · Increment on bool 79 · `continue` targeting switch 2 · Array to string 2 · Undefined key "path" 2 · **E_COMPILE_ERROR curly-brace offset 1 (new)** · Undefined key 1 1 · stdClass::$user_email 1 · wpo cache log write 1.
**MPFC slowest:** wp-admin/post.php 19.5s/3 · cron script 11.9s/1 · wp-admin/edit.php 11.6s/1 · wp-admin/index.php 7.2s/9 · 404 handler 6.3s/267.

**Fountain top errors:** 🔴 **LoadError vips.so.42 190 (NEW)** · ArgumentError wrong args 9 · NoMethodError `price` for nil 5 · Template::Error product_catalogs edit no route 1.
**Fountain slowest:** admin/product_catalogs/import_csv 190.7s/1 · AssistantCheckWorker 19.7s/69 · staff/assistants/ask 9.3s/1 · ActiveStorage AnalyzeJob 5.4s/450 · gifts/swappable_gifts 5.3s/4.
**Infinity:** UnknownFormat 4 · ArgumentError 4. Slowest: paypals/authorize_order 2.9s/2 · registrations/create 2.4s/2 · payment_intents/create 2.1s/7 · ShipStationShipmentWorker 1.7s/8 · search 1.5s/43.

---

## Arthur / Meta-Stamp — 05:25 (+07:00)
Sources: Matrix Arthur room (2 msgs: PhucVT confirms the customer paid $1,701), Matrix tech room (0), Meta-Stamp Slack #msv3-official (2: David staging deploy + rotation, Chris 23:22 ack, Tommy testing), GitHub `Christebob/Meta_Stamp_V3` (0 commits since 10-26, PR #29 open since 10-21), Workstream Meta-Stamp + Crystal lang (0h Mon so far). Solid Code Slack token dead (known). No open customer asks. Tracker file not regenerated (nothing new).

Trello: Arthur - Meta-Stamp ✓

---

## Upwork / Upwork Memo — 2026-10-26 — 05:30 (+07:00)
| Workroom | Memos (Mon 10-26) | Invalid | Details |
|----------|-------------------|---------|---------|
| Neural (messages) | n/a | n/a | ~~not readable 05:00~~ read 08:40 ✅ (see Alert #6) |
| Rory (LeNH) | 3 | 0 | ✅ all valid (08:42) |
| Aysar (KhanhHH) | 1 | 0 | ✅ "Upgrade platform Node.js to 22.23.4 to address security vulnerabilities" |
| Tokenlite (Marcel) | — | — | live-cookie login failed (known, carrick Profile 1 Tokenlite session). No memo status claimed |

No invalid memos.

---

## Unresolved Questions
- Fountain: who installs libvips (`vips.so.42`) on the prod host? Is the #393 LoadError still firing after 20:55? Who answers Kunal's gift-email setup (steps 1–8 this week)?
- Bailey: who sends Joey the StrainRite duplication estimate and answers the "copy brother's PrestaShop" question? Status of live issues 1–4 + supplier price calculation?
- MPFC: 35 failed rebills not retried for 30+ days. Who decides (retry / revoke access)? Where does Rollbar #75 ParseError `$ok` come from (new billing-monitor script?)? DigitalOcean MySQL 8.0 EOL plan?
- OhCleo: reply to Celine's audio-click issue. DuongDN/MinhTV review LuHX's Pending 1.5h.
- After 10:00: re-check Mon task logs (PhucVT/TuanNT/KhanhHH/ViTHT).
- kai@: confirm the 4 new Atlassian API tokens (Mon 09:02–09:24) were created by us.
- carrick@: Cloudflare Tunnel upgrade to ≥2026.10.2 (which tunnel/server?).
