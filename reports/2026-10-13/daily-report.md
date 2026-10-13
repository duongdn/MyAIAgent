# Daily Report — 2026-10-13 (Tuesday)

**Run:** 2026-10-13T08:23 (+07:00) (interactive)
**Window:** 2026-10-12T05:10:09+07:00 → 2026-10-13 ~08:30 (+07:00). Task-log pieces use **Monday 2026-10-12**.
**Leave plan:** parse-leave-emails refreshed 08:24. Mon 10-12: **TuanNT** off sick (email 06:57) and **PhucVT** off sick (email 09:00, PENDING in leave-plan). Resource Arrangement confirms both, no make-up. TrinhMTT off Thu–Fri Oct 29–30 (binhnt approved). DuongDN left early 10-12 15:15 (will make up).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack GGS (Bailey) | **Client Joey is escalating.** 10-12 15:36 he rejected the 79h CR2 desktop-view estimate: "takes too long and cost too much for such small feature… lets not do this". 16:01: "need to know cost for each item and time, and not just time but **when it will be delivered**". 16:02: "if its going to take another 8 months, im seriously going to start plugging AI into the system and putting you in constant competition with other developers on upwork and freelance". Amy replied 16:32 (explained the delays and offered Select Paddock alone at 6.5h), but the **per-item cost + delivery dates he asked for haven't been sent**. Also a new thread, "issue 1 live" (15:54). Amy asked a clarifying question 17:13 (Available = Cover × total Surface?), awaiting Joey. Related (Matrix): tasks 103/104 are over budget with open bugs, and you ruled the dev fixes them on their own time. → Bailey ○ |
| 2 | Slack Xtreme / JIRA (Maddy) | Anoma, 10-13 02:25 (+07), on [LIFM2-468](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-468): "@Kai Can you check this again? There are exact matching result we can find, when searching the live site. But RMS gives different items." She moved 468 **Testing → To Do**. Unanswered (posted overnight). 468 still has **no estimate and no JIRA log**. Context: you capped LongVV at 15–30 min, unpaid ("làm kiểu cá nhân"). → Maddy ○ |
| 3 | Performance (MPFC) | Apdex **0.44** (0.32 yesterday), avg 2.55s / 52,090 req. `continue` E_WARNING ×1803, WP_Error::get_method ×62, mysqli socket ×6, ABSPATH compile errors. Rollbar #50 "10 occurrences in 5 minutes" (10-12 19:23 +07). SQLi-style `/search/-1%25…` probes at 110–121s. MySQL 8.0 managed DB EOL **Oct 30** (from 10-12). |
| 4 | Workstream needs review | OhCleo: LongVV 10-12 2h (cover-art visual direction) + 4h (web/app visual identity) are Pending. Reviewers: **DuongDN, MinhTV**. (The 10-08/10-09 Pending rows from yesterday are resolved ✅. Crystal lang Pending is cleared too.) |
| 5 | Email (carrick@) | James Le Chevalier (Whyte Homes, Definitive Guide) **forwarded a Stripe alert with no comment**: "webhook delivery issues [test mode] for staging.definitiveguide.co.uk" (10-12 16:17 +07). This is an implicit ask to check the staging webhook endpoint. No reply seen. GitLab XiD SaaS Backend **failed pipelines** on `main` (b967f0ec) and `fix/nric-unique-validation` (10-12 08:25). |
| 6 | Performance (OhCleo) | New error class `MultipleObjectsReturned: get() returned 2 Users` ×3. IntegrityError app_playhistory user_id null ×2 (chronic). Apdex 0.99, healthy. |
| 7 | Email (vuongtrancr@) | Swish New Relic "Signal lost… Low Application Throughput" ×4 (10-12 22:27 → 10-13 00:57). Chronic since 10-06. |

**Resolved since 10-12 report:** #1a Madhuraka's 468 questions: Kai replied 10-12 (Lens extension V3 sent, feedback 2 & 3 updated). #2 Franc: Carrick answered dmetiner 08:35, then fixed and deployed the preset fix on all 11 devices ✅. #4 OhCleo 10-08/09 + Crystal lang reviews done. Marcel Upwork bonus sent (15:45).

**Today (Tue Oct 13):** No leave on file for today. All present as far as known.

---

## Email — all — 08:24 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@... | 5 | Leave: TuanNT 10-12 (sick), PhucVT 10-12 (sick), TrinhMTT Oct 29–30 (binhnt OK'd). OA timesheet report Sept. | no events |
| carrick@... | 3 | #5 Stripe webhook forward (James/DG). GitLab XiD failed pipelines ×2 | no events |
| nick@... | 0 | — | no events |
| rick@... | 21 | **Kunal 10-12 11:00: "push v2 live basically this week"**, release PRs BE [#705](https://github.com/iamksheth/FountainGreetings/pull/705) / FE [#860](https://github.com/iamksheth/FountainNewUI/pull/860), and asks Rick to run the launch checklists and pick a night. Followed up on the Trello board, where Kunal's latest is "wait a couple days, I need new photos" ✅ (see Fountain). BugSnag rate-limit notice. Jennifer S. Upwork message (no content in the email, not a tracked client). Rollbar daily summaries. The rest is FountainStaging BugSnag (staging). | 10:30 OmniGPT Daily Sync, 11:00 + 12:30 HEAL |
| kai@... | 2 | Anoma mention on LIFM2-468 → #2 | no events |
| ken@... | 80 | Precognize/development PR traffic (SR-7813/7709/7886/7890/7481, PR #5495/#5498, none by nusken). SamHT on Elena OP-16. The rest is welligence/playwright GitHub noise. | 08:30 DE Daily Standup |
| vuongtrancr@gmail.com | 11 | #7 Swish signal lost ×4. Delayed-newform daily summaries. NR weekly reports. | — |
| dnduongus@gmail.com | 23 | none (VCB/Tikop receipts, Shopee, newsletters, MxToolbox) | — |
| davidztv19@gmail.com | 1 | Basecamp ResidentRadius digest | — |
| freelancer@mpfc | 4 | Rollbar #50 burst (#3). Google Workspace "mark agentic OAuth clients" notice. NR weekly. | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete. Check mail card done.

---

## Slack — all 14 workspaces — 08:28 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 15 | **Carrick MPDM report 10-12 17:23** ✅ (#718 PR #727 bulk-revoke limit, in progress). Aysar merged #699 and left comments. Carrick fixed his #698 comments (PRs web-client #56 / web-app #703) and #727. Aysar opened GitHub issue #743 "Harden GitHub Actions". |
| RDC - FM Monitoring | 11 | Carrick replied to dmetiner 08:35, then fixed the preset issue and deployed it to all 11 devices (13:28). Found an MPX capture problem on fmistanbul (USB audio hardware, needs an on-site check, which is our ask to the client). MPX SOS ×2 / tuner instability alerts (bots). |
| Swift Studio | 0 | Quiet (auth OK). Klaviyo estimate still on hold per minhtv (10-09). |
| Xtreme Soft Solutions | 18 | Kai↔Madhuraka 09:18–10:07: extension version confusion resolved (V3 sent, client calls it V4). Anoma asked what to retest on 468, and Kai sent the extension. Then Anoma's 02:25 JIRA reopen → #2. |
| SAM GUARD - Mobile | 16 | HubSpot MQL bot only. |
| Global Grazing Services (Bailey) | 7 | **Joey's escalation → #1.** #maintenance had no Nick report 10-12, but there are no Speedventory hours logged 10-12 (TuanNT off), so no report was due. |
| Amazing Meds | — | Cancelled (Ignore List). |
| Generator | 0 | Paused (Ignore List). |
| LegalAtoms | 0 | — |
| MyPersonalFootballCoach | 5 | freelancer↔client MPDM: freelancer asked kwd2mj8hrv for the full skill-area taxonomy (Physical/Psychological/…). That's between the freelancer and the client, not an ask to us. |
| William Bills | 0 | Paused. |
| Equanimity | 6 | Carrick added FIN/NRIC unique validation (Komal's 10-09 report) ✅. Marcel sent the Upwork bonus ("all good right?") ✅. |
| SoCal Auto Wraps | 0 | Dropped. |
| Aigile Dev | 0 | Paused. |

Aysar GitHub: 1 new open issue (#743 Harden GitHub Actions, by Aysar). Not blocking.

Trello: Rory, Aysar, Franc, MPFC, Marcel, Raymond ✓. Maddy ○ (#2), Bailey ○ (#1).

---

## OhCleo Slack — 08:27 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 25 | **Tony daily report present 10-12 17:57** ✅ (cover-art visual direction, web+app visual identity 80%). Celine replied to the SEO-audit task. Tony committed to cover art + tagging this week and the new web/app design for review by end of week. Cover-art batch of 2,071 tracks done; fal credits 216 left. Celine will create a group with the designer for the missing creators page. |
| #events-code | — | `channel_not_found` (chronic, bot removed from channel) |

Trello: Ohcleo ✓.

---

## Discord — airagri + bizurk — 08:25 (+07:00)

Tokens valid on both accounts.

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 17 | **Vinn daily report present** ("Just report my process today": contractor demo support, Training Competency/Scale deployed to staging, Admin Portal user/property mgmt, security fix). **Jeff daily report present** (4h, Contractor App universal links, PR feedback, Property QR check-in). dapackage: onboarding merged to prod for testing, PR745 ready, awaiting approval on the Kinetic API approach. jdiamond reviewing, call 16:30. |
| Bizurk (nuscarrick) | 0 + 0 DMs | Quiet (animeworld last said "it works" 10-10). |

Trello: James Diamond ✓ (Vinn OK + LeNH 8h). Andrew Taraba ✓.

---

## Sheets/Workstream — all devs — 08:33 (+07:00)

Reporting day: **Monday 2026-10-12**. Raw `/review/week` rows for all 21 visible projects (Lyf Support + Others 403). Fetched 08:30. Some devs log the morning after, so these numbers may still grow.

| Developer | Mon 10-12 (all WS projects) | Status |
|-----------|------|--------|
| LeNH | **8h** James Diamond (Admin Portal, security fix, demo support) | ✓ OK |
| KhanhHH | **8.17h** (Baamboozle 3.67 + RDC 4.5) | ✓ → Aysar ✓ |
| TuanNT | 0h | **Off sick** (email + Resource Arrangement, no make-up) → Bailey task-log gate OK |
| PhucVT | 0h | Off sick (Arthur, fixed cost). Not gated. |
| LongVV | 8h (OhCleo 6 + Definitive Guide 2) | Ad-hoc, informational. 0h Maddy → no Kai report due |
| DuongDN | 0.5h Tokenlite | — |

**Workstream project rows (excl. Fountain), Mon 10-12:**

| Project | Dev hours | Reviewer(s) | Reviewer's charged hours | Review status |
|---------|-----------|-------------|------------|----------------|
| Maddy (Xtreme) | — | — | — | need_review=false |
| James Diamond | LeNH 8h | PhucVT, LeNH | LeNH 8h | NotRequired |
| Baamboozle (Aysar) | KhanhHH 3.67h | — | — | need_review=false |
| Radio Data Center (Franc) | KhanhHH 4.5h | LeNH | 0h | NotRequired |
| Definitive Guide | LongVV 2h | — | — | need_review=false |
| OhCleo | LongVV 6h | DuongDN, MinhTV | 0h | **Pending** → #4 |
| Tokenlite (Marcel) | DuongDN 0.5h | — | — | need_review=false |
| Samguard | TienND2 0.5h, VyTTH 0h | — | — | need_review=false |
| Speedventory (Bailey), BXR, Crystal lang, Generator, ETZ, Family App, MissSwimwear, Neural, Auction Warehouse | — | per project | 0h | none pending |

---

## Maddy — W42 — 08:33 (+07:00)

### 1. Task Log Hours (Mon 10-12)
| Developer | Mon | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV | 0h | 0h | Ad-hoc, informational. The 468 check is personal/unpaid per your instruction. |
| LuHX | 0h | 0h | informational (not managed) |

### 2. Slack / Kai Daily Report Check
- WS Maddy hours on Mon: 0h, so the report check doesn't apply.
- Kai↔Madhuraka DM 10-12 09:18–10:07: the extension-version confusion was resolved (Kai sent V3, which Madhuraka calls V4). Madhuraka's Sunday 468 questions were answered 10-12 02:20–02:39 (JIRA: V3 extension, feedback 2 & 3 updated) ✅.
- Anoma DM 15:48–16:02: Anoma asked what to retest, and Kai sent the extension.
- **Anoma JIRA 10-13 02:25: "check this again… RMS gives different items", 468 back to To Do, unanswered → #2.**

### 3. JIRA (LIFM2, updated since window)
| Ticket | Summary | Status | Est | JIRA logged | Note |
|--------|---------|--------|-----|-------------|------|
| [LIFM2-468](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-468) | Quoting Tool Issue | **To Do** (from Testing) | — | — | ⚠️ no est / no log. Reopened by Anoma |

LIFM2-469/470 (estimates only in comments, 3h/1.5h) are unchanged since 10-12. `maddy-jira-tasklog-check.js` was not run because its sheet source is stale (memory). The live JIRA check above replaces it.

### 4. Bitbucket PR Status (`xtreme-web/rms`, 6 open)
#548 LIFM2-468 (1 comment, upd 10-12). #540 LIFM2-450 (0). #481 LIFM2-409 (2, waiting on customer, not our blocker). #544 LIFM2-465 (0). #534 (1). #509 LIFM2-428 (4). No new comments.

Trello: Maddy ⚠️ skipped (#2).

---

## Fountain — 08:33 (+07:00)

**Part 1 — Matrix Plan:** trinhmtt 10-12 08:44: "DatNT: 8h+ (tùy tình hình task) ViTHT: 40h VuTQ: 20h ThinhT: 12h => QC 20h". VuTQ 11:03: the plan changes again because Kunal moved everything into 2 release PRs (BE #705, FE #860). Review split: DatNT on the Staff app, ViTHT and ThinhT on the customer side. namtv 10-13 07:34 notes the client is reducing hours (Dev 25 → 15, QC 15 → 10). The project isn't named in the message, so this needs confirming.

**Part 2 — Task Log Actuals (Workstream, Mon 10-12, partial morning read):** DatNT 8.33h (all Pending review, Fountain excluded from the review check). ViTHT 3h so far. VuTQ / ThinhT / QC not logged yet.

**Part 3 — Plan vs Actual:** day 1 of the week. Too early to compare (DatNT on track, others not logged yet).

| Dev | Plan | Actual (Mon) |
|-----|------|--------|
| DatNT | 8h+ | 8.33h |
| ViTHT | 40h | 3h |
| VuTQ | 20h | — |
| ThinhT | 12h | — |
| QC | 20h | — |

**Part 4 — Capacity & Runway** (Est vs Charged, 100 rows, re-read live): Est 1529.25 / CR 133.5 / Actual 1557.25. Narrow **229.0h**, broad **328.5h**. Unchanged.

**Part 5 — Over-estimate:** 37 rows over 120%, unchanged. Top: #2627 0.5→8.25h (+1550%), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2630 0.5→3.75h, #2545 1→7.5h, #2613 2→14.5h.

**Trello board (comments since 10-12 05:10):** rick570 10-12 10:58 explained that the Staff app + V2 are now in 2 big PRs and asked about cleanup and pushing live. Kunal: "could try October 16th, may be missing photos". Rick: tidy folders after launch, push live at your midnight? **Kunal 11:34: "lets wait a couple days I need new photos"** ✅. No open question from us. Counts: To-Do 15, Bugs 27, Doing 3, QC Internal 5, QA Backlog 7, In QA 1, Done v2 36.

**Perf:** `build_a_box_gift_variants` 9.8s avg over 93 calls (improving). 0 errors.

Trello: Fountain ✓ (all 5 parts checked, no unanswered customer comment).

---

## Elena - WordPress SamGuard — 08:31 (+07:00)

`https://www.samguard.co/`: 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics/ads and mp4 `failedRequests` (ERR_ABORTED). Clean.

Trello: Elena - WordPress SamGuard ✓.

---

## Matrix — 08:24 (+07:00)

**Active rooms: 21 / 150 | Messages: 189** *(since 2026-10-12 05:10)*
Full details: reports/2026-10-13/matrix-rooms-0824.md

The script flagged no new action items. Asks addressed to you were all answered: halt about TuanNT's 2.5h setup charge ✅, Marcel bonus ✅, binhnt about the WS client-report checkbox ✅, vynl about Bailey 103/104 overtime ✅, PhucVT's leave ✅.

### Key updates

**Fountain, release PRs reshuffle:** Kunal merged ~200 PRs into BE #705 / FE #860, so the team re-split the review (DatNT Staff app, ViTHT/ThinhT customer side). FE #864 is live ✅.

**Maddy, 468 recheck:** you capped LongVV at 15–30 min, unpaid, because of client charge sensitivity. Real issue found, a 15-min fix applying the client's AI review comments.

**Bailey, budget pressure:** tasks 103/104 are over budget with bugs. The dev fixes them on their own time (your call). The payment reminder is out (trinhmtt). See Slack #1 for Joey's escalation.

**Resource:** TuanNT and PhucVT off sick 10-12 (no make-up). namtv 10-13: the client is cutting hours (Dev 25→15, QC 15→10, project unnamed).

**Other:**
- Arthur (paused): namtv flagged an unanswered client message. PhucVT told the client it will be checked later.
- Lyf: client login broken (forgot-password email not working). Estimate pending.
- Elena OP: M1 handover Wed. CRs collected (config fields). No new role.
- James DG: PhucVT handed off to LongVV.

---

## Performance — 08:31 (+07:00)

Window: since 2026-10-12 05:10 (+07:00).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.99 | 129ms | 2.3% (737/31429), ~94% benign NotAuthenticated/InvalidToken/dup-validation | 19.2/min |
| MPFC | **0.44** 🔴 | 2553ms | 3.7% (1919/52090) | 31.8/min |
| Fountain | 0.99 | 108ms | 0% (0/73656) | 45.0/min |
| InfinityRoses | 0.98 | 130ms | 0.08% (14/17090) | 10.4/min |

**OhCleo errors:** NotAuthenticated 650, ValidationError dup email 26 / email+username 10 / username 8, InvalidToken 17, AuthFailed "User does not exist" 11, "Passwords don't match" 7, **MultipleObjectsReturned (2 Users) 3, new**, IntegrityError app_playhistory user_id null 2.
**OhCleo slow:** ChatSendView.post 3.18s/3, GetBookMarkDetailsView.get 1.12s/870, ValidatePurchaseView.post 1.04s/4, EmailVerificationView.post 0.96s/22, AnonymousEmailCollectView.post 0.87s/1.

**MPFC errors:** `continue` E_WARNING 1803, WP_Error::get_method() 62, foreach invalid arg 8, count() non-countable 8, ABSPATH legacy-widget require 7, mysqli no socket 6, mkdir name too long 4, ABSPATH version.php require 3, undefined add_action() 3+3.
**MPFC slow:** five `search/-1%25…` scanner URLs at 121.3s / 116.4s / 115.9s / 110.7s / 109.9s (1 call each) → #3.

**Fountain errors:** none. **Slow:** build_a_box_gift_variants 9.8s/93, paypals/authorize_order 2.7s/5, registrations/create 1.7s/8, payment_intents/create 1.6s/55, card_artworks/create 1.1s/3.

**Infinity errors:** ArgumentError wrong args 14, BadRequest EOFError 8, UnknownFormat 4, InvalidForeignKey extra_items 2. **Slow:** payment_intents/create 1.5s/11, registrations/create 1.5s/3, cart_items/update 1.0s/1, search 0.95s/82, cart_items/create 0.78s/16. Healthy.

Not gated by Trello.

---

## Upwork Memo — 2026-10-12 — 08:33 (+07:00)

Run headless (`env -u DISPLAY`).

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | 0 | 0 | No segments (LeNH on James Diamond) |
| Aysar | 2 | 0 | Both valid. "Updated subscription date data and limited bulk revokes… (#718)" ✓. The script flagged "Preserved admin verification tokens and aligned CI checks for email verification (#698)" as having no action verb. That's a rubric false negative ("Preserved", "aligned" are action verbs + specific object + ticket), so I'm counting it valid. |
| Tokenlite (duongdn) | — | — | Not verified: the duongdn Upwork login didn't take in headless mode. Needs you to log in to Upwork once in your browser, then I re-run headless (`env -u DISPLAY node scripts/upwork-memo-check.js --date=2026-10-12 --workroom=Tokenlite`). |

Neural Contract (messages): no new messages. Latest is the client's 2026-09-28. Neural ✓.

---

## Scrin.io — 08:24 (+07:00)

**Scrin.io (Nick @ John Yi company account, Mon 2026-10-12):** 0h, no sessions recorded. Expected, since John Yi was cancelled 09-28. Not TuanNT evidence.

---

## Reminders — 08:33 (+07:00)

- No reminders needed. LeNH 8h, KhanhHH 8.17h on Mon 10-12. TuanNT and PhucVT were on sick leave. LongVV is ad-hoc. Nothing sent.

---

## Ignore List — 08:33 (+07:00)

Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Trello — Check progress / Check mail — 08:33 (+07:00)

**Check mail:** 6/6 ✓, [card](https://trello.com/c/xvMlVqDn) done.

**Check progress: 20/22** ([card](https://trello.com/c/JLgYYc18), today's)
- ✓ complete: John Yi (ignore), James Diamond, Rory, Aysar, Franc, Elliott (ignore), MPFC, Marcel, Elena-SamGuard (ignore), Raymond, Neural Contract, Andrew Taraba, Rebecca (ignore), Colin (ignore), Fountain, Philip (ignore), Ohcleo, Arthur (ignore), Blair Brown (ignore), Elena-WordPress-SamGuard.
- ○ incomplete: **Maddy** (#2), **Bailey** (#1).

Live card re-fetched after writes.

---

## Not run this pass

- Arthur 6-source check, Elena PRs/deploy/Precognize, Philip MS Teams: paused (Ignore List).
- WhatsApp/Zalo: excluded by default.

## Unresolved Questions

1. Bailey: who sends Joey the per-item cost + delivery-date breakdown he asked for, and do we propose a reduced CR2 scope? He is openly threatening to bring in competing developers.
2. Maddy: does Kai answer Anoma's 468 reopen (still unpaid/personal per your cap), and does 468 get an estimate?
3. Definitive Guide: who checks the staging Stripe webhook James forwarded (Carrick/LongVV)?
4. MPFC apdex is still poor (0.44) and the MySQL 8.0 EOL is Oct 30. Who owns the server check and the DB upgrade?
5. namtv 07:34, "giảm cả dev 25→15, QC 15→10": which project? (If it's Fountain, the W42 plan needs updating.)
6. Tokenlite Upwork memo: please log in to Upwork (duongdn) once so the memo check can run headless.
