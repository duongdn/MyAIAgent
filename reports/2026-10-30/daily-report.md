# Daily Report — 2026-10-30 (Friday)

**Run:** 2026-10-30T05:00+07:00 → 05:45 (cron, mpfc server)
**Window:** 2026-10-29 08:45 → 2026-10-30 05:00 (+07:00). Task-log date: **Thu 2026-10-29**
**Leave plan:** `parse-leave-emails.js` refreshed 05:00: no upcoming approved leave on record. Email/Matrix: **HungPN off Fri 10-30** (approved by BinhNT). namtv off afternoon 10-29 (sick). DuongDN left 4h early 10-29 (will make it up this week). LuHX, TienT, TamLH, PhongTH off 10-29 (family). AnhTTL off 10-30.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | OhCleo (Workstream + Slack) | ([DM](https://ohcleo.slack.com/archives/D0B6846UN8K), [Workstream](https://workstream.nustechnology.com)) **Workstream needs review ×19 (reviewers DuongDN, MinhTV):** LuHX ×6 (10-26 → 10-28), LongVV ×10 (10-26 → 10-29, incl. Story Companion 8:00 on 10-27), HungPN ×2 (0:00), PhuongPVT ×1 (0:00). MinhTV said in Matrix the week's hours are over budget ("tuần này ảo quá"). Celine DM: no new customer message. Tony asked "what's picture?" (08:59) on the newsletter ask. Celine's "400+ creators" and "free trials?" asks from 10-28 have no visible DM reply (MinhTV/PhuongPVT confirm free trial was never discussed before). Google **rejected Android** for adult content. Tracks 18+ are now hidden, resubmitted 14:19. Tony report 17:19 ✅. Ohcleo ○ |
| 2 | Bailey (Workstream) | ([#maintenance](https://globalgrazingservices.slack.com/archives/C0338NXK3SB)) Speedventory still **Pending review**: PhucVT Check queue issue 1:00 (10-26), and the project has no reviewer configured (3rd day). ~~Joey "any update?"~~ answered: Amy fixed the PO data 11:45 and is drafting the weight-precision requirement (Joey: keep full gram precision). Nick daily report 02:06 ✅ (Prestashop storage 75% WARNING, staging copies). Bailey ○ |
| 3 | Neural Contract | ([workroom](https://www.upwork.com/ab/workroom/38901192)) Upwork Cloudflare/cookie vault stale at 05:00 (company PC off before 08:00). Room not read, vault marked STALE. Neural ○, re-check after 08:00 |
| 4 | Maddy | Madhuraka emailed kai@ 21:58: "FW: Website update — **Can you give me an estimate for this?**" (new ask, <24h). The Bitbucket PR check can't run on mpfc (no Bitbucket credentials). Kai 10:25: PR [#563](https://bitbucket.org/xtreme-web/rms/pull-requests/563) created, LIFM2-473 done and tested. The 10-28 access key pasted in the Matrix room: no confirmation it was rotated. Maddy ○ |
| 5 | Task log — KhanhHH (info) | ([Workstream](https://workstream.nustechnology.com)) Thu 10-29 = 4.5h so far (Baamboozle/BXR). Tue 10-27 = 0.17h is still unchanged. KhanhHH told DuongDN (Matrix 15:34) that no tasks are urgent and estimates are waiting on customer confirmation. namtv suggests moving KhanhHH to Elena full-time. Low hours are explained by idle capacity, not missing logs. Aysar ✓ |
| 6 | InfinityRoses (Rollbar, info) | ([Rollbar](https://app.rollbar.com), [Fountain board](https://trello.com/b/UDrSWage)) New prod **#460 `StandardError: Gift variant not…`** (17:16) and #459 MailChimp "Member Exists" (benign). FountainStaging BugSnag ×2 (staging only). Fountain Oct 29 rollout **held 1 day** by Rick (16:57), with possible issues raised to Kunal. ThinhT found a Wave payment auto-"paid" bug in PR 3180 |

**Today (Oct 30):** HungPN off, AnhTTL off. Rick: OmniGPT 10:30, HEAL 11:00/12:30. Ken: DE standup 08:30. Arthur: Chris + Tommy demo test 04:00 VN today, with a report expected Friday. ✅ Resolved since last report: Bailey split PO fixed. RDC `/mapviewer/` block confirmed by dmetiner. BXR/Rory PHP 8.3.36 live on Booking+Dev. Meta-Stamp R1 retest all-pass and Chris's 2 follow-ups done on staging. James DG platform upgrade went live (PhucVT 11:15).

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 5 | namtv off afternoon 10-29. HungPN off 10-30 (approved). Salary transfer notice. Salesforce cert | no events |
| carrick@ | 9 | James Le Chevalier (DG): "summarise briefly all the upgrades done in this now-live cutover" (07:41 + 18:49 thread). DG reset-password ×4 (testing). ClickUp Swift "Update email in app". Mindbody account created | no events |
| nick@ | 1 | Shopify offline-access migration notice | no events |
| rick@ | 18 | Infinity prod Rollbar **#460** + #459 (Alert #6). FirstProject #1120 10th occurrence. FountainStaging BugSnag ×2. Rollbar summary. Infinity credit-payment logs (normal) | 10:30 OmniGPT Daily Sync · 11:00 + 12:30 HEAL Meeting |
| kai@ | 3 | **Madhuraka "FW: Website update", estimate request** (Alert #4). Confluence digests ×2 | no events |
| ken@ | 80 | GitHub notifications (actions bot, welligence, Precognize). Nothing for nusken | 08:30 DE - Daily Standup |
| vuongtrancr@gmail.com | 62 | Swish paused (counted only). Mirko Bitbucket ×55, New Relic ×5 | — |
| dnduongus@gmail.com | 30 | Bank/newsletters/LinkedIn, no security alerts | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mpfc | 1 | TestFlight MPFC iOS 4.3 (4.3.26) ready to test | — |

Trello: Check mail 6/6 ✓, [card](https://trello.com/c/opM4hrxx) done.

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 11 | Carrick deployed feedback fixes to nusdev (10:45). Jamie reported a folder-creation bug for plus users (15:37), fixed 19:22. notmedesign asked for the dark-mode toggle per mockup → Carrick "let me check". **Carrick report 19:25 in [MPDM](https://baamboozle.slack.com/archives/C07SQ4HAUHZ/p1793276744135629)** ✅ |
| RDC - FM Monitoring | 4 | Carrick 13:26: `/mapviewer/` direct access blocked on powergroup. **dmetiner 16:53 "tested, everything looks good"** ✅ |
| Swift Studio | 33 | Carrick moved Booking + Dev to **PHP 8.3.36** (GoDaddy dashboard), Selfridges backed up/removed, Jeff retested mobile ✅. Rory asked for sprint 9 estimates and a quote for the client today; Jeff added his, Carrick's pending. Rotating door QR via Mindbody API: Carrick is checking the partner API (21:35) |
| Xtreme Soft Solutions | 4 | Kai 10:25: PR #563, LIFM2-473 done + tested. anomawasala 18:05 "Is there any ticket to check?" |
| SAM GUARD - Mobile | 6 | Elena OP: Kfir 17:44 build fails after the merge to feature/optimization (missing optimization-api dependency), needed today. lena 21:15 asks about data-exclusion performance. (Elena DP itself is on the Ignore List) |
| Global Grazing Services | 10 | See Alert #2. StrainRite duplication: current estimate 65h. Joey will give back-office access (SiteGround, same account as Paturevision). Nick report 02:06 ✅ |
| Meta-Stamp | 3 | Chris 10:03: Tommy retest, **every test passes on staging** (T1–T10, B1, B2), plus 3 follow-ups. David 10:10 ack → 11:39 "both done on staging" ✅ |
| Amazing Meds | — | invalid_auth (Ignore List) |
| Generator / LegalAtoms / MPFC / William Bills / Equanimity / SoCal / Aigile | 0 | — |

Trello: Rory ✓ · Franc ✓ · Aysar ✓ · Marcel ✓ · Raymond ✓ · MPFC ✓ (no new alerts) · ⚠️ Bailey (Alert #2) · ⚠️ Maddy (Alert #4)

---

## Discord — all — 05:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 28 | **Vinn daily report** ✅ (PR reviews #818/819/812/813, reusable contractor/visitor check-in forms across Select Harvest properties). James: high priority on Mary's check-in forms + QR per property → Vinn guided. Leon (dapackage) asked for a review of the safefarm UI/onboarding rework. **Jeff daily report** ✅ (4h, location reporting before check-in). Jeff: Apple Developer agreement needs acceptance by account holder |
| Bizurk (nuscarrick) | 0 | — |

Trello: James Diamond ✓ · Andrew Taraba ✓

---

## Scrin.io — 05:15 (+07:00)
**Scrin.io (Nick @ John Yi company account — Thu 10-29):** 0h, no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — Thu 10-29 — 05:15 (+07:00)

Raw per-project rows summed per dev across all 24 WS projects.

| Developer | Thu 10-29 | Week so far (Mon–Wed) | Status |
|-----------|-----------|-----------------------|--------|
| PhucVT | 0h (05:00 lag) | 10-26 8h · 10-27 leave · 10-28 8h | ⏳ worked DG go-live 10-29 (Matrix 11:15). Re-check after 10:00 |
| TuanNT | 0h (05:00 lag) | 7.33h · 8h · 8h (Speedventory) | ⏳ active in Bailey room all day 10-29. Re-check after 10:00 |
| KhanhHH | 4.5h | 8h · **0.17h** · 3.67h | info (Alert #5): idle capacity, no urgent tasks |
| LeNH | 8h (James Diamond) | 8h · 8h · 8h | ✅ |
| LongVV | 8h (OhCleo) | 8h · 8h · 8h (6h Maddy 10-28 now logged) | informational |

**Workstream per project (dev hours week · reviewer charged · review status):**
| Project | Dev hours (week so far) | Reviewer charged | Review status |
|---------|-------------------------|------------------|---------------|
| Maddy | LongVV 6h, ThanhNX 3h | — | need_review = false |
| Baamboozle | KhanhHH 8.83h | — | need_review = false |
| James Diamond | LeNH 32h, AnhNH2 12h | LeNH 32h, PhucVT 0h | 0 Pending |
| Fountain | ThinhT 16h, VuTQ 12h, TrinhMTT 9.25h, PhatDLT 6h, ViTHT 3h, HungPN 2h | VuTQ 12h, DuongDN 0h | excluded (Fountain) |
| Marcel | DuongDN 0.67h | — | need_review = false |
| RDC | KhanhHH 4.33h | LeNH 0h | 0 Pending |
| Speedventory (Bailey) | TuanNT 23.33h, VyNL 23h, DatNC 5h, TrinhMTT 4.75h, NamNN 3.25h, PhucVT 1h, DuongDN 1h | — (no reviewer) | ⚠️ **Pending** PhucVT 1:00 (Alert #2) |
| BXR (Rory) | KhanhHH 3.17h, KhoaTD 1.33h, TuanTT 1h | — | need_review = false |
| Meta-Stamp | PhucVT 1.5h | — | need_review = false |
| OhCleo | LongVV 22h, LuHX 14.5h, HungPN 3.25h, PhuongPVT 0.5h | DuongDN 0h, MinhTV 0h | ⚠️ **Pending ×19** (Alert #1) |
| Definitive Guide | PhucVT 13.5h, LongVV 4h | — | need_review = false |
| SamGuard | TriNM 24h, PhongTB 24h, TienND2 16h, VyTTH 7h, AnhTTL 2.5h | — | need_review = false |
| Crystal lang (reviewer TienND) / Colin (LucNT) / Generator (HangNTT, LucNT) / Rebecca / Blair Brown / Family App / Amazing Meds / Elevate365 / Neural / LegalAtoms / Andrew / Auction Warehouse | 0h | 0h | no rows |

---

## Maddy — W 10-26 — 05:15 (+07:00)

### 1. Task Log Hours
| Developer | Thu 10-29 | Weekly Maddy total | Status |
|-----------|-----------|--------------------|--------|
| LongVV | 0h | 6h (10-28) | ad-hoc, informational |
| ThanhNX | 1h | 3h | (QC: "anh check ok rồi nha" ("I've checked it, it's OK") in the Xtreme room 10:24) |

### 2. Slack / Kai Daily Report Check
- 10-28: 6h Kai-role (LIFM2-473). Kai's update to Madhuraka 10-29 10:25 ("PR #563 created, LIFM2-473 done and tested") covers it ✅. Yesterday's Alert #5 is cleared.
- 10-29: 0h LongVV Maddy, so no report was expected.
- New: Madhuraka estimate request by email 21:58 (Alert #4). anomawasala asked "any ticket to check?" 18:05.

### 3. JIRA (weekly cross-check)
`maddy-jira-tasklog-check.js --week 2026-10-29`: LIFM2-473 Product Update Endpoint, Review, est 6h / JIRA 6h / WS 6h ✅. All 1 tickets OK.

### 4. Bitbucket PR Status
Not run on mpfc (no Bitbucket credentials on this host). Last known (10-29): #560, #540, #509, #481 (waiting on customer). New #563 (LIFM2-473). Manual check: run on the local PC after 08:00.

Trello: ⚠️ Maddy skipped (Alert #4)

---

## Fountain — 05:20 (+07:00)

**Part 1 — Matrix plan:** @trinhmtt Mon 10-26 09:29: **VuTQ 20h · ThinhT 20h · ViTHT 40h → QC 20h**. Updated 10-27 13:39: QC **10h/week**, PhatDLT only. No new plan this window.

**Part 2 — Workstream actuals (W 10-26, Mon–Thu):** ThinhT 16h · VuTQ 12h · ViTHT 3h · PhatDLT 6h · HungPN 2h (TrinhMTT 9.25h, not QC).

**Part 3 — Plan vs Actual (day 4 of 5):**
| Dev | Plan | Actual | Note |
|-----|------|--------|------|
| ViTHT | 40h | 3h | far behind on logging (active: Backstage order-page test summaries, Redmine #81502/81503) |
| ThinhT | 20h | 16h | on pace (PR 3180 review, Wave payment bug) |
| VuTQ | 20h | 12h | behind, needs 8h Fri |
| QC (PhatDLT + HungPN) | 10h | 8h | on pace (HungPN off Fri) |

**Part 4 — Capacity & Runway:** not re-fetched (sheet frozen). Last value (10-22): Narrow 229.00h / 28 tasks · Broad 328.50h / 63 tasks.
**Part 5 — Over-estimate:** last value (10-22): 36 items actual > (Est+CR)×1.2. Frozen.

**Trello board ([Web Development](https://trello.com/b/UDrSWage)):** Kunal 11:33 created "Rollout: Oct 29 (ShipStation fix, Projects steps, customer service…)" and asked Rick to push tonight. **Rick 16:57: hold 1 day, will prioritise tomorrow, with a list of possible issues** → In progress (answered). Rick created bug cards: Gibbon::MailChimpError in MailchimpWorker (20:18), StandardError in cart_items#create (00:16). Lists: Next rollout 1 · In progress 2 · Bugs 6 · Done 12.

Trello: Fountain - DOCUMENT ✓

---

## Elena — 05:22 (+07:00)
Elena DP on the Ignore List (PRs/deploy not run). **WordPress samguard.co:** status 200, 0 jsErrors, 0 pageErrors, 0 cspViolations, 7 failed requests (GA/ads beacon noise). Clean.

Trello: Elena - WordPress SamGuard ✓

---

## Trello — Check progress — 05:40 (+07:00)

**18/22 complete.** [Card](https://trello.com/c/fToAr2lS)
- ✓ James Diamond · Rory · Aysar · Franc · MPFC · Marcel · Raymond · Andrew Taraba · Fountain - DOCUMENT · Arthur - Meta-Stamp · Elena - WordPress SamGuard
- ⚠️ Ohcleo: skipped (Alert #1)
- ⚠️ Bailey: skipped (Alert #2)
- ⚠️ Neural Contract: skipped (Alert #3, not read)
- ⚠️ Maddy: skipped (Alert #4)

Check mail: 6/6 ✓, [card](https://trello.com/c/opM4hrxx) done.

## Ignore List — 05:40 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard Digital Plant, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:40 (+07:00)
- PhucVT, TuanNT: 0h for 10-29 at 05:00. Both clearly worked (Matrix), so this is logging lag. Re-check after 10:00. Not sent.
- KhanhHH: 10-27 0.17h, 10-29 4.5h. Idle capacity was discussed directly with DuongDN, so no "0h" reminder. Not sent (no `--send-reminder`).
- LeNH: 8h ✅. LongVV: ad-hoc, no reminder.

---

## Matrix — 05:07 (+07:00)

**Active rooms: 20 / 153 | Messages: 336** *(since 10-29 08:45)*
Full details: reports/2026-10-30/matrix-rooms-0507.md

(Script flagged namtv 10:54 "Cái cuối mày làm là -4 à?" ("Was the last one you did -4?"). DuongDN already replied and namtv resolved the 2FA issue by 11:39, so this is not an action item. ⚠️ A UAT login password was pasted in plain text in that DM 10:52 (redacted), so rotate it.)

### Key updates

**James Definitive Guide — platform upgrade LIVE** (11:15):
- PhucVT went live and is doing extra testing, plus fixing older log bugs. DuongDN asked BinhNT for QC: HungPN 15h/w (Vy is full on Bailey). LongVV transferred to HungPN 16:06. Staging page renders white for Hung (unresolved at 17:16).
- Customer email (carrick@): James asks for a brief summary of all upgrades in the cutover. Plan: email the customer about cleaning up test users on prod. Customer says his Slack is broken.

**OhCleo — Android rejected (adult content):**
- LongVV hid 18+ tracks (homepage + Continue section), HungPN tested, MinhTV resubmitted 14:19.
- MinhTV: week's hours are over budget, so Long should keep extra hours minimal. 19 Pending reviews (Alert #1).

**Bailey / Paturevision:**
- TuanNT fixed PO 2606 reception data (7.7% → 100%). The weight-rounding bug is waiting on the customer. Priority 94 > 104 > 103. Advanced split migration to Rails 6 needs re-test.
- DuongDN: 3 upgrades live yesterday still have bugs, so request payment once fixed. Extra time over budget can't be charged.

**Resource / staffing:**
- DuongDN → namtv: PhucVT idle after DG. KhanhHH has no urgent tasks (Aysar/Franc ad hoc). namtv: "move them all over, KhanhHH full-time on Elena".
- Leave notes: TienT, LuHX, TamLH, PhongTH off 10-29 (covered).

**Other:**
- Elena OP: SR-7935 root cause found (parent alert close doesn't propagate), Run APIs up. AnhTTL off 10-30.
- Fountain: Backstage order page tested, Redmine bugs → VuTQ reports to Kunal. Wave payment auto-paid bug in PR 3180.
- James Diamond: invoice still unpaid. halt is escalating to Chiến ("maybe really pause").
- KhanhHH: moving tracker/work across Rory/Aysar/Franc machines, OK'd by DuongDN.

---

## OhCleo Slack — 05:12 (+07:00)
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 3 | Tony 08:59 "what's picture? the new app screens?" (re newsletter ask). Tony 11:58: Google rejected the app, hiding all track content. **Tony report 17:19 VN** ✅ (Android SFW-only content for Play review, done; "in full" wording, dev done). No new Celine messages |
| #events-code | — | channel_not_found (bot removed, needs admin re-invite) |

Tony daily report: present (Thu 17:19 VN). Times converted from UTC (+7h). The thread replies from Celine aren't covered by the script.

Trello: ⚠️ Ohcleo skipped (Alert #1)

---

## Performance — 05:25 (+07:00)
Window since 10-29 05:12 (~24h).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.99 | 123ms | 2.1% (917/42802), ~90% benign NotAuthenticated | 29.8/min |
| mpfc (prod) | n/a | — | 0 sampled req | NR disabled per-request since PHP 8.3 upgrade |
| fountain | 0.98 | 143ms | 0 / 105751 | 73.6/min |
| infinity | 0.98 | 172ms | 9 / 14260 (MailChimp Member Exists ×7, ArgumentError ×1) | 9.9/min |

**OhCleo top errors:** NotAuthenticated 828 · InvalidToken 23 · AuthFailed "User does not exist" 22 · ValidationError email exists 14 · ValueError Invalid bcrypt hash 5 · email+username exists 5 · AuthFailed "Passwords don't match" 4 · username exists 3. (redis ConnectionError from 10-29 didn't recur.)
**OhCleo slowest:** CreatorPayoutHistoryView.get 1397ms/1 · CreatorVerificationApproveView.post 1125ms/2 · GetBookMarkDetailsView.get 1122ms/516 · CategoryMediaView.get 1083ms/530 · EmailVerificationView.post 952ms/22.
**Fountain:** 0 errors. Slowest: ActiveStorage::AnalyzeJob 99.0s/3 (was 51.8s) · AssistantCheckWorker 16.1s/69 · ServiceRedraftWorker 15.4s/4 · staff/assistants/ask 7.4s/1 · gifts/swappable_gifts 5.0s/7.
**Infinity slowest:** paypals/authorize_order 3.0s/1 · registrations/create 2.1s/3 · search 1.4s/36 · payment_intents/create 1.4s/11 · paypals/generate_order 1.0s/2. (Rollbar #460 "Gift variant not…" is in email, Alert #6.)

---

## Arthur / Meta-Stamp — 05:30 (+07:00)
Sources: Matrix Arthur room + tech room (no new msgs in window). Meta-Stamp Slack #msv3-official (3: Chris 10:03 Tommy retest **all pass** T1–T10/B1/B2 plus 3 follow-ups → David 10:10 ack, 11:39 split back to 15% + terms read-back done on staging ✅). GitHub `Christebob/Meta_Stamp_V3` (0 commits since 10-29). Workstream Meta-Stamp PhucVT 1.5h this week, Crystal lang 0h. Solid Code Slack token dead (known). Still open from 10-29 deep check: Chris hasn't answered the 4h Railway hourly charge. Demo test Fri 04:00 VN, report expected today. Nothing unanswered from us.

Trello: Arthur - Meta-Stamp ✓

---

## Upwork / Upwork Memo — 2026-10-29 — 05:35 (+07:00)
| Workroom | Memos (Thu 10-29) | Invalid | Details |
|----------|-------------------|---------|---------|
| Neural (messages) | n/a | n/a | not read (Alert #3) |
| Rory (LeNH) | — | — | Cloudflare (Turnstile not resolved) |
| Aysar (KhanhHH) | — | — | Cloudflare |
| Tokenlite (Marcel) | — | — | Cloudflare |

No memo status this run. The cookie vault (pushed 10-29 01:30) is stale and now marked STALE, so the company PC will re-push after 08:00. Manual: `node scripts/upwork-memo-check.js --date=2026-10-29` + `node scripts/upwork-neural-check.js`.

---

## Unresolved Questions
- OhCleo: DuongDN/MinhTV clear 19 Pending reviews (week over budget). Who answers Celine's 10-28 "400+ creators" + "free trials" asks? Android resubmission result?
- Bailey: who reviews Speedventory Pending (no reviewer configured)?
- Maddy: Kai to send the estimate Madhuraka asked for (21:58). Confirm the access key from 10-28 was rotated. Bitbucket PR check on the local PC.
- DG: reply to James's "summarise all upgrades" email. HungPN staging white-page issue. Rotate the UAT password pasted in Matrix DM.
- Re-check PhucVT + TuanNT 10-29 hours after 10:00. Re-run Neural + Upwork memos after 08:00 (vault STALE).
- InfinityRoses Rollbar #460 "Gift variant not…": who owns it?
