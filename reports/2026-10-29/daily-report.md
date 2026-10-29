# Daily Report — 2026-10-29 (Thursday)

**Run:** 2026-10-29T05:00+07:00 → 05:40 (cron, mpfc server), corrected 08:45 (+07:00) recheck
**Window:** 2026-10-28 05:40 → 2026-10-29 05:00 (+07:00). Task-log date: **Wed 2026-10-28**
**Leave plan:** `parse-leave-emails.js` refreshed 05:00: no upcoming approved leave on record. Matrix: TuanNT left early 10-28 (family). TienT 10-29 (family, plan TBD). HungTK 09/11 + 20/11, DatNT AM 02/11.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | OhCleo (Slack DM) | (08:40 recheck: still 0 replies in DM) Celine has 3 unanswered asks overnight: 20:25 VN "write **400+ creators** rather than 200" on the new payment screen; 22:27 VN "do we support **free trials**?"; 03:01 VN "**urgent**: add this picture to the newsletter (template `Newsletter_Oct_Nov_2026`)". [DM](https://ohcleo.slack.com/archives/D0B6846UN8K). iOS 4.2.2 live ✅; Android resubmitted, approval pending. **Workstream needs review ×13 (reviewers DuongDN, MinhTV):** LuHX ×6 (10-26 → 10-28), LongVV ×6 (10-26/27, incl. Story Companion 8:00), HungPN 0:00 (10-27). Ohcleo ○ |
| 2 | Slack GGS (Bailey) | [#maintenance](https://globalgrazingservices.slack.com/archives/C0338NXK3SB) Joey 14:30: split PO "% of reception still wrong, only order amount fixed". Amy "Checking" 14:34, then Joey 20:58 "**any update?**" ×2, no reply (08:40 recheck: still unanswered, ~12h). StrainRite: Amy will send the estimate, and Nick will review the brother's PrestaShop (Joey meets his brother Thursday = today). Nick daily report 21:36 ✅. Speedventory Pending review: PhucVT Check queue issue 1:00 (10-26), still no reviewer configured. Bailey ○ |
| 3 | MPFC | New prod [Rollbar](https://app.rollbar.com) **#76: `Call to undefined function mpfc_saved_videos()`** (freelancer@, 14:37 VN). The billing monitor still fires "**App subscription expired but access still active**" at 19:08 VN, **after** the 13:37 fix commit `18ae3fab` that excluded Saul's friend receipts. Check whether it's another member or the fix isn't deployed. Tien (IDP): Raya's account isn't a club → 403 is expected, explained 14:13, waiting on Adam. MPFC ○ |
| 4 | Task log — KhanhHH | ([Workstream](https://workstream.nustechnology.com)) **Tue 10-27 = 0.17h total** (Baamboozle only), no leave on record. Yesterday's cron said "re-check after 10:00" and it is still 0.17h a day later. Wed 10-28 = 3.67h so far (05:00 lag). Verify raw `/review/week` rows before any reminder. Aysar ○ |
| 5 | Maddy | ([PR #560](https://bitbucket.org/xtreme-web/rms/pull-requests/560)) LongVV said (Matrix 08:41) "6h Maddy today" and Kai was active all day (staging SSH, LIFM2-473, asked Madhuraka 14:33 to merge PR #560). WS Maddy still 0h and **no Kai daily report** found in Slack 10-28. 08:40 recheck: WS Maddy LongVV 10-28 still 0h, Kai report check n/a until logged. ⚠️ LongVV pasted an access key in plain text in the Maddy Matrix room (14:05, redacted), so rotate it. Maddy ○ |
| 6 | Neural Contract | ~~Upwork Cloudflare/cookie-vault stale at 05:00, room not read. Neural ○~~ ✅ 08:40 recheck: room read live — last msg is ours 10-28 10:34 "I noted" after customer's "add the hours to this week". No new customer msg. Neural ✓ |
| 7 | AirAgri / Jeff GitHub (security, info) | ([example commit](https://github.com/airagri/AirAgri_Team_MobileApp/commit/33fb6e2c2811c78c4afc660d694794e6d3e08b46)) **PolinRider supply-chain malware** force-pushed malicious code to AirAgri Team App, SprayApp and Flutter_Contractor (Jeff Trinh found it). Cleaned, rulesets set on all repos, AirAgri main repo scanned clean. James asked "who committed that" and wants an AI scan on every PR. Internally, dozens of repos on the "Jeff" GitHub account were hit. namtv removed members, changed the password and disabled Copilot. MinhTV asked DuongDN to scan his machine (done, screenshot sent). |

**Today (Oct 29):** TienT off (family). Kunal travels to India. Rick: HEAL 11:00/12:30, OmniGPT 10:30. Ken: DE standup 08:30. ✅ Resolved since last report: OhCleo iOS 4.2.2 live, `/post/…` ask picked up by PhuongPVT. Fountain: Oct 27 night + Oct 28 rollouts LIVE, Rollbar #403 tracked on a [bug card](https://trello.com/b/UDrSWage). Neural bonus answered. RDC PHP security patch deployed. Elena OP M2 released.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 1 | Wildsoul cancelled the 10-28 meeting | no events |
| carrick@ | 6 | Kinsta error montreall (Motto). DO droplet `dg-prod-web-2026` password reset (08:44 VN, DG). DG reset password. ClickUp Swift "clear Mindbody balance". Upwork Neural msg notice | no events |
| nick@ | 7 | Heroku Redis maintenance required (hpd-vendor, hpd-merchant) ×6. Asana trial | no events |
| rick@ | 16 | Fountain prod Rollbar **#403 NoMethodError** (`shipstation:recover_labels`, Rick made a bug card). Rollbar daily summary. BugSnag rate-limit. Infinity credit-payment logs (normal) | 10:30 OmniGPT Daily Sync · 11:00 + 12:30 HEAL Meeting |
| kai@ | 2 | Madhuraka on Bitbucket PR #560 | no events |
| ken@ | 80 | GitHub welligence/mimaizumi + Precognize M2 PRs. Nothing for nusken | 08:30 DE - Daily Standup |
| vuongtrancr@gmail.com | 80 | Swish paused (counted only). Mirko Bitbucket pushes | — |
| dnduongus@gmail.com | 27 | AWS MFA support case reply (follow-up of yesterday's). Bank/newsletters | — |
| davidztv19@gmail.com | 2 | Dropbox ToS, Basecamp digest | — |
| freelancer@mpfc | 4 | **Rollbar #76** + billing monitor ×2 (Alert #3). Test mail | — |

Trello: Check mail 6/6 ✓, [card](https://trello.com/c/dZZZGBTK) done.

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 14 | Carrick deployed a fix on nusdev and asked Jamie whether Noah tests the AI-toolbar tasks (Jamie will help). **Carrick report 17:22 in MPDM** ✅. notmedesign 21:23: dark-mode tweaks for Sunday's release (overnight). Issue #752 Romanian translate |
| RDC - FM Monitoring | 9 | Carrick: Scanner CSV daily update + PHP security patch deployed to Powergroup. dmetiner 16:49: `/mapviewer/` still reachable manually. 16:52 asked for a short note on open tasks + 17:39 banner branch review → Carrick "Let me check it" 17:01 (holding) |
| Swift Studio | 3 | Rory: Selfridges can be backed up/removed. Track time on the bug task and mark complete |
| Xtreme Soft Solutions | 19 | Kai ↔ Madhuraka: staging SSH access OK (3.128.0.29). No MCP setup needed, test with QA then PR. Kai 14:33 "Can I merge #560 to develop?" no reply yet |
| SAM GUARD - Mobile | 15 | Elena OP: customer asks for Run contract docs (80% by 3/11). PR #5567 comment discussion. M2 release notes 17:35 |
| Global Grazing Services | 15 | See Alert #2. Amy posted the Console Ruby 3.1.2 / Rails 6.1 upgrade summary. Nick report 21:36 ✅ |
| Amazing Meds | — | invalid_auth (Ignore List) |
| MyPersonalFootballCoach | 5 | Billing monitor ×2 (Alert #3). Tien IDP 403 question answered |
| Aigile Dev | 1 | Blog posts on staging, push to prod when happy |
| Meta-Stamp | 5 | Chris 09:30: Tommy's R1+B1 staging rundown, mostly passing. David 09:47 on fixes → **17:04 "1–4 are on staging, all pass"** ✅ |
| Generator / LegalAtoms / William Bills / Equanimity / SoCal | 0 | — |

Trello: Rory ✓ · Franc ✓ (holding reply) · Marcel ✓ · Raymond ✓ · ⚠️ Aysar (Alert #4) · ⚠️ Maddy (Alert #5) · ⚠️ Bailey (Alert #2) · ⚠️ MPFC (Alert #3)

---

## Discord — all — 05:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 41 | **Vinn daily report** ✅ (PR reviews, active-training endpoint to prod, multi-property invite on staging, pre-commit hook on staging/master, preprod AWS docs). Leon (dapackage) report ✅. **Jeff daily report** ✅ (4h, search on attendee/assignee). **Malware incident** (Alert #7). James asked for a team status round-up to prioritise with Mary |
| Bizurk (nuscarrick) | 0 | — |

Trello: James Diamond ✓ · Andrew Taraba ✓

---

## Scrin.io — 05:12 (+07:00)
**Scrin.io (Nick @ John Yi company account — Wed 10-28):** 0h, no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — Wed 10-28 — 05:15 (+07:00)

Raw per-project rows summed per dev across all WS projects.

| Developer | Wed 10-28 | Tue 10-27 (final) | Status |
|-----------|-----------|-------------------|--------|
| PhucVT | 0h (08:40 still 0h) | 0h (leave) | ⏳ not logged yet (active in Arthur/DG rooms 10-28). Re-check after 10:00 |
| TuanNT | ~~0h~~ **8h** (Speedventory, 08:40) | 8h (Speedventory) | ✅ |
| KhanhHH | 3.67h (Baamboozle) | **0.17h** (08:40 raw re-scan all 22 projects: still 0.17h, no leave) | ⚠️ 10-27 shortfall (Alert #4) |
| LeNH | 8h (James Diamond) | 8h | ✅ |
| LongVV | 0h | 8h (OhCleo) | informational (said 6h Maddy + 2h OhCleo 10-28) |

**Workstream per project (dev hours week · reviewer charged · review status):**
| Project | Dev hours (week so far) | Reviewer charged | Review status |
|---------|-------------------------|------------------|---------------|
| Baamboozle | KhanhHH 6.33h | — | need_review = false |
| James Diamond | LeNH 24h, AnhNH2 8h | LeNH 24h, PhucVT 0h | 0 Pending |
| Fountain | ThinhT 12h, TrinhMTT 9.25h, VuTQ 8h, PhatDLT 6h, ViTHT 3h, HungPN 2h | VuTQ 8h, DuongDN 0h | excluded (Fountain) |
| RDC | KhanhHH 4.33h | LeNH 0h | 0 Pending |
| Speedventory (Bailey) | TuanNT 15.33h, DatNC 5h, TrinhMTT 4.75h, NamNN 3.25h, PhucVT 1h | — (no reviewer) | ⚠️ **Pending** PhucVT Check queue issue 1:00 (Alert #2) |
| Rory (BXR) | KhoaTD 1.33h, KhanhHH 1.17h, TuanTT 1h | — | need_review = false |
| OhCleo | LongVV 16h, LuHX 14.5h, HungPN 3h | DuongDN 0h, MinhTV 0h | ⚠️ **Pending ×13** (Alert #1) |
| Definitive Guide | PhucVT 7h | — | need_review = false |
| SamGuard | TriNM 24h, TienND2 16h, VyTTH 7h, AnhTTL 2.5h | — | need_review = false |
| Maddy / Rebecca / Colin / Generator / Marcel / Neural / Crystal lang / Meta-Stamp / Andrew / Auction Warehouse / LegalAtoms / Blair Brown / Charles Chang / Amazing Meds / Elevate365 | 0h | — | no rows |

---

## Maddy — W 10-26 — 05:15 (+07:00)

### 1. Task Log Hours
| Developer | Wed 10-28 | Weekly Maddy total | Status |
|-----------|-----------|--------------------|--------|
| LongVV | 0h (said 6h) | 0h | ad-hoc, informational |

### 2. Slack / Kai Daily Report Check
- WS Maddy 10-28 = 0h (not logged yet), but Kai clearly worked (LIFM2-473 + staging access). No Kai daily report found → Alert #5, re-check once hours are logged.
- Kai 14:33 asked Madhuraka "Can I merge #560 to develop?" (OpenSpec setup), no reply in window.

### 3. JIRA (weekly cross-check)
`maddy-jira-tasklog-check.js --week 2026-10-28`: no Workstream entries this week yet.

### 4. Bitbucket PR Status
Live 05:15: 4 open Kai PRs (`xtreme-web/rms`): [#560](https://bitbucket.org/xtreme-web/rms/pull-requests/560) LIFM2-471 (upd 10-28, 2 cmts, merge question pending) · [#540](https://bitbucket.org/xtreme-web/rms/pull-requests/540) LIFM2-450 · [#509](https://bitbucket.org/xtreme-web/rms/pull-requests/509) LIFM2-428 · [#481](https://bitbucket.org/xtreme-web/rms/pull-requests/481) (waiting on customer, not a blocker).

Trello: ⚠️ Maddy skipped (Alert #5)

---

## Fountain — 05:20 (+07:00)

**Part 1 — Matrix plan:** @trinhmtt Mon 10-26 09:29: **VuTQ 20h · ThinhT 20h · ViTHT 40h → QC 20h**. Updated 10-27 13:39: QC **10h/week**, PhatDLT only.

**Part 2 — Workstream actuals (W 10-26, Mon–Wed):** ThinhT 12h · VuTQ 8h · ViTHT 3h · PhatDLT 6h · HungPN 2h (TrinhMTT 9.25h, not QC).

**Part 3 — Plan vs Actual (day 3 of 5):**
| Dev | Plan | Actual | Note |
|-----|------|--------|------|
| ViTHT | 40h | 3h | far behind on logging (very active in room: PR test summaries 826/830/835/979/981/985) |
| ThinhT | 20h | 12h | on pace |
| VuTQ | 20h | 8h | slightly behind (0h 10-28 so far) |
| QC (PhatDLT + HungPN) | 10h | 8h | on pace |

**Part 4 — Capacity & Runway:** not re-fetched (sheet frozen). Last value (10-22): Narrow 229.00h / 28 tasks · Broad 328.50h / 63 tasks.
**Part 5 — Over-estimate:** last value (10-22): 36 items actual > (Est+CR)×1.2. Frozen.

**Trello board ([Web Development](https://trello.com/b/UDrSWage)):** Kunal 10:38 VN created the Oct 28 rollout card ("push after 3176, backend first"). Rick 16:45 pushed Oct 27 night LIVE → Done. 17:13 Oct 28 rollout LIVE + ShipStation label recovery scripts run → Done. Rick created a bug card "NoMethodError in shipstation:recover_labels" (= Rollbar #403). Rick 11:17 asked Kunal about a searchable dropdown for the Linkable Product Catalog (waiting on customer). Lists: Next rollout 1 · In progress 1 · Bugs 4 · Done 12. Matrix: QC/BA struggling with Kunal's git-only workflow (no GitHub access for Parker).

Trello: Fountain - DOCUMENT ✓

---

## Elena — 05:22 (+07:00)
Elena DP on the Ignore List (PRs/deploy not run). **WordPress samguard.co:** status 200, 0 jsErrors, 0 pageErrors, 0 cspViolations, 7 failed requests (GA/ads beacon noise). Clean.

Trello: Elena - WordPress SamGuard ✓

---

## Trello — Check progress — 05:35 (+07:00)

~~16/22~~ **17/22 complete** (08:40: Neural ✓). [Card](https://trello.com/c/005d5phw)
- ✓ James Diamond · Rory · Franc · Marcel · Raymond · Andrew Taraba · Arthur - Meta-Stamp · Fountain - DOCUMENT · Elena - WordPress SamGuard
- ⚠️ Ohcleo: skipped (Alert #1)
- ⚠️ Bailey: skipped (Alert #2)
- ⚠️ MPFC: skipped (Alert #3)
- ⚠️ Aysar: skipped (Alert #4)
- ⚠️ Maddy: skipped (Alert #5)
- ~~⚠️ Neural Contract: skipped (Alert #6, not read)~~ ✓ Neural Contract (08:40, read live, no new customer msg)

Check mail: 6/6 ✓, [card](https://trello.com/c/dZZZGBTK) done.

## Ignore List — 05:35 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard Digital Plant, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:35 (+07:00)
- KhanhHH: 10-27 only 0.17h (not 0h). Verify raw rows first. If confirmed, the message must state the real number, not "0h". Not sent (no `--send-reminder`).
- PhucVT: 0h for 10-28 at 08:40 (lag). Re-check after 10:00. Not sent. ~~TuanNT 0h~~ TuanNT 8h ✅ (08:40).
- LeNH: 8h ✅. LongVV: ad-hoc, no reminder.

---

## Matrix — 05:00 (+07:00)

**Active rooms: 22 / 153 | Messages: 470** *(since 10-28 05:40)*
Full details: reports/2026-10-29/matrix-rooms-0500.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| (DM minhtv) | 15:55 | minhtv: "nó tấn công mấy chục repo bên account Jeff luôn, nên a clone gì về cẩn thận vs nó nhé" ("it hit dozens of repos on the Jeff account, so be careful with anything you clone") — new scan script coming via namtv. Re-scan when it lands |

(The James Diamond payment chase 15:02 was already handled by DuongDN at 15:08.)

### Key updates

**Security — Jeff GitHub account / PolinRider malware** (Alert #7):
- Dozens of repos attacked. namtv removed unneeded members, changed the password and disabled Copilot. MinhTV revoked access and is writing a new scan script.
- AirAgri repos cleaned by Jeff/Vinn, rulesets enforced.

**OhCleo — 4.2.2 rollout:**
- iOS live 08:33, Android fix resubmitted. PhuongPVT took Celine's `/post/…` redirect ask.
- LuHX new staging build (onboarding #273). HungPN found an Android notification bottom-sheet bug at signup. New App Store screenshots (#274).

**Fountain:** Two rollouts LIVE. Linkable Product Catalog dropdown proposal sent. QC/BA can't access Kunal's git, so test summaries are written per PR.

**Bailey:** TuanNT daily post 08:49. Trello 103/104 → staging2 for QC. PrestaShop duplication estimate in progress.

**Other:**
- Elena OP: M2 released (FE #5581 / BE #5580).
- Arthur: Chris's small bugs/requests ~1-2h (PhucVT).
- James DG: PhucVT to tell the customer about no work on 10-27.
- James Diamond: unpaid invoice, DuongDN threatened to pause.
- Neural: customer says add the 4.5h to this week. Marcel limit 1→2 h/week.
- Wildsoul cancelled the 10-28 meeting. TienT off 10-29.

---

## OhCleo Slack — 05:12 (+07:00)
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 16 | 09:37 VN Tony asked Celine to email users about the forced update to 4.2.2 (key rotated) → Celine will. App Store screenshots clarified (for the store, not onboarding). **Tony report 17:19 VN** ✅ (onboarding fixes #273, new app screens #274, Story Companion testing). **Unanswered:** 20:25 "400+ creators", 22:27 free trials?, 03:01 urgent newsletter picture (Alert #1) |
| #events-code | — | channel_not_found (bot removed, needs admin re-invite) |

Tony daily report: present (Wed 17:19 VN). Times converted from UTC (+7h).

Trello: ⚠️ Ohcleo skipped (Alert #1)

---

## Performance — 05:25 (+07:00)
Window since 10-28 05:25 (~24h).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.98 | 125ms | 2.1% (863/40522), ~93% benign NotAuthenticated | 28.6/min |
| mpfc (prod) | n/a | — | 0 sampled req | **NR disabled per-request since PHP 8.3 upgrade** (use the apache_logs dashboard) |
| fountain | 0.98 | 144ms | 0 / 101136 | 71.3/min |
| infinity | 0.97 | 150ms | 0 / 14338 | 10.1/min |

**OhCleo top errors:** NotAuthenticated 801 · InvalidToken 21 · AuthFailed "User does not exist" 18 · ValueError Invalid bcrypt hash 7 · ValidationError email exists 6 · username exists 4 · **redis ConnectionError "Connection closed by server" 2** (new, watch) · email+username exists 2.
**OhCleo slowest:** MediaCoverUploadView.post 3029ms/7 · UpdateMeView.put 1301ms/8 · MediaListView.get 1014ms/711 · CancelSubscriptionView.post 1011ms/4 · CategoryMediaView.get 985ms/481.

**Fountain:** 0 errors in NR. Slowest: ActiveStorage::AnalyzeJob 51.8s/3 · admin/gifts/import_csv 19.0s/1 · ServiceRedraftWorker 14.0s/4 · AssistantCheckWorker 13.6s/68 · gifts/swappable_gifts 6.0s/5.
**Infinity:** 0 errors. Slowest: admin/orders/edit 5.8s/1 · paypals/authorize_order 2.7s/3 · registrations/create 1.7s/1 · payment_intents/create 1.7s/4 · search 1.6s/43.

---

## Arthur / Meta-Stamp — 05:25 (+07:00)
Sources: Matrix Arthur room (6: PhucVT confirms Chris was informed on Railway hours, small bugs ~1-2h), Matrix tech room (no new), Meta-Stamp Slack #msv3-official (5: Chris 09:30 R1+B1 staging rundown "almost everything passes" → David 17:04 fixes 1–4 on staging, all checks pass ✅), GitHub `Christebob/Meta_Stamp_V3` (0 commits since 10-28), Workstream Meta-Stamp + Crystal lang (0h this week so far). Solid Code Slack token dead (known). ~~Nothing unanswered.~~ 08:50 deep re-check (since 10-21, [file](0850-arthur-monitor.md)): Chris hasn't answered the 4h Railway hourly charge (sent 10-27, nudged 10-29 07:18). PhucVT has no Meta-Stamp hours logged for week 10-26, though he worked 10-26 + 10-28. Chris + Tommy demo test Fri 10-30 04:00 VN, report Friday. $1,701 received ✅. Project WS Meta-Stamp still has no reviewer.

Trello: Arthur - Meta-Stamp ✓

---

## Upwork / Upwork Memo — 2026-10-28 — 05:30 (+07:00)
| Workroom | Memos (Wed 10-28) | Invalid | Details |
|----------|-------------------|---------|---------|
| Neural (messages) | n/a | n/a | ✅ 08:40 read live, no new customer msg |
| Rory (LeNH) | 0 | 0 | 08:40: 0 day cells (no tracked time 10-28) |
| Aysar (KhanhHH) | 0 | 0 | 08:40: 0 day cells |
| Tokenlite (Marcel) | 0 | 0 | 08:40: 0 day cells |

~~No memo status this run (Cloudflare at 05:00).~~ 08:40 recheck: all workrooms fetched OK, no invalid memos.

---

## Unresolved Questions
- OhCleo: who answers Celine's 3 overnight asks (400+ creators text, free trials, urgent newsletter picture)? DuongDN/MinhTV: clear 13 Pending reviews.
- Bailey: Joey's split-PO reception % fix (asked "any update?" ×2). StrainRite estimate before Joey's meeting today. Who reviews Speedventory Pending (no reviewer)?
- MPFC: Rollbar #76 `mpfc_saved_videos()` undefined, from which deploy? Billing monitor still firing after fix `18ae3fab`: other member, or the fix isn't deployed to the cron server?
- KhanhHH: confirm 10-27 0.17h with raw rows / leave email before any reminder.
- Maddy: Kai daily report for 10-28? LongVV to log 6h Maddy. Rotate the access key pasted in the Maddy room.
- Security: re-scan with MinhTV's new script. Any NUS machine source of the Jeff-account infection?
- Re-check PhucVT 10-28 + LongVV Maddy hours after 10:00.
