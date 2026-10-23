# Daily Report — 2026-10-23 (Friday)

**Run:** 2026-10-23T05:00+07:00 → 05:40 (cron, mpfc server), corrected 08:40 (+07:00) recheck
**Window:** 2026-10-22 08:30 → 2026-10-23 05:30 (+07:00). Task-log date: **Thu 2026-10-22**
**Leave plan:** `parse-leave-emails.js` refreshed 05:00: no upcoming approved leave on record. Resource Arrangement (Matrix): HauTT on trip 23/10–26/10 (SamHT covers Scott). DatNT off PM 10-23 (from yesterday's report).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack RDC (Franc) | dmetiner 17:35: "this seems to be not working! Scanner must've added the frequencies to the logs, but there's nothing on my panel. Can you please test exactly like I did?" ([msg](https://rdc-fmmonitoring.slack.com/archives/C09L6PH5NUU/p1792665332552659?thread_ts=1792140646.155719)). Not addressed in Carrick's 19:37 EOD update (PHP/Node only). Also open: florenz mobile-app brief with questions + PR #34 to review (Carrick "will review soon"). ~~Franc ○~~ → 08:55: duongdn raised it in the Franc room. Franc ✓ |
| 2 | Slack Baamboozle (Aysar) + task log | Aysar 10:18 to Carrick on the PHP PR #750: "spend more time and effort on code quality rather than PR count" (Carrick apologised, closed #750). Jamie 15:16 asked for a dark-mode/free-user popup change, then 03:46: "we could potentially release this on Sunday if we can get everything finished today" ([msg](https://baamboozle.slack.com/archives/C06CMTX025R/p1792701991700109?thread_ts=1789081986.639859)). No reply to the 15:16 request yet. **New 06:46:** Jamie retested multi-word image search: "it's not working any longer. Searching hotel + guest doesn't reveal any images" ([msg](https://baamboozle.slack.com/archives/C06CMTX025R/p1792712787406749?thread_ts=1792548821.830359)), plus 06:48 "We should be good to release this to Aysar for him to check, correct?" ([msg](https://baamboozle.slack.com/archives/C06CMTX025R/p1792712891431829?thread_ts=1789981725.264639)). Both unanswered. ~~**KhanhHH 10-21 = 0.5h logged** (Baamboozle only, no leave on record, see Sheets)~~ → 08:35: raw WS rows confirm 0.5h, but Upwork Aysar shows **30 cells (≈5h) on 10-21** and ≈1h40m on 10-22 (WS has 0h Baamboozle 10-22). She did the work but under-logged it in Workstream. This is a task-log gap, not an absence. Aysar ○ |
| 3 | Slack GGS (Bailey) | Pre-live test day: Joey hit repeated Console sync outages (14:40–17:19, also hit prod per datnc 16:42) and listed major bugs 18:57 (adding a product to an existing order breaks stock; deleting picking doesn't update stock) ([msg](https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1792670240582619)). Amy acknowledged 21:41 ([msg](https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1792680082360119)), fixes come in the morning. Joey hopes to go live today. **No Nick "Today report" for 10-22 in #maintenance** (only the 02:07 resource status). The team had hours on Speedventory 10-22 (VyNL 7.5h, NamNN 1h, VuTQ 0.5h). ~~Bailey ○~~ → 08:52: reminder sent to the Matrix room "NUS - Bailey - Paturevision 2026" (backfill the 10-22 report + send today's on time), event `$2hVYAGzz75bTJ5CLhxSgQS9nQBThS53L78BEP3weaJ4`. Bailey ✓ |
| 4 | MPFC | ~~Yesterday's open items still unanswered: Saul's "Potentially vulnerable server at admin.mypersonalfootballcoach.com:80" (10-21).~~ → 08:58 user: already reported to Saul via WhatsApp ✅. New Rollbar **#71 ArgumentCountError `MM_Response::isSuccess()`** (prod, 07:30). 🔴 **A secret token (Telegram-bot format) was pasted in plain text into a Slack DM by `freelancer` at 16:53** (redacted here). It should be revoked/rotated. NR apdex 0.45 (chronic). MPFC ○ |
| 5 | OhCleo Slack (Celine) | ✅ Yesterday's urgent cover ask was resolved: Tony replied 13:41 VN, all person covers were swapped, Celine "Amazing!". New, unanswered (evening/overnight): 19:07 "can you let me know if you will be working tomorrow and if you have anything left this week", 00:09 "can a subscriber that logs in to the web listen unlimited?", 01:46 new cards (>2h items must be flagged first). Matrix: LongVV is not sure he can work full time on OhCleo today (busy with James's upgrade). Ohcleo ○ |
| 6 | Workstream review | OhCleo: **1 row Pending**: LongVV 10-21 "Update cover art to remove duplicates, faces (in progress)" 2:30 → reviewers DuongDN, MinhTV. (Yesterday's 6 Pending rows are cleared ✅.) |
| 7 | Maddy (Kai report gate) | LongVV logged **0.5h on Maddy 10-22** ("Check & resolve PHP security", Kai role, non-WordPress). **No Kai daily report** found in Xtreme Slack. That 0.5h entry has **no JIRA ticket key**: Madhuraka requires JIRA-logged hours to match billed hours. Madhuraka 15:03 asked for "an update on 465 asap": Kai deployed and moved it to testing 15:13 ✅, and Anoma "Testing ok" 18:22. ~~Maddy ○~~ → 08:47: reminder sent to the Matrix room "Maddy - Extreme Soft Solutions" (@longvv: Kai report + JIRA log for the 0.5h), event `$7LOCCBpEiXpHTT5NPEEfnlyJKCYHQ3qLSMKfdaFDLxQ`. Maddy ✓ |
| 8 | PHP2Shell CVE + Node.js CVE (company-wide) | All-hands response 10-22. Status per project: Baamboozle ✅ (Aysar's own patch). RDC PHP ✅ all 3 envs + compromise scan clean, Node PRs pending. BXR/Rory: GoDaddy booking+dev on PHP 7.4.33, backport unconfirmed, only partial mitigation (session.upload_progress off), PHP 8.3 upgrade window needed. AirAgri ✅ PHP 8.4.27 (system was down ~02:41–05:30 VN). Fountain/Infinity blog → redirect, Node 24.22.1 ✅. Maddy ✅ 7.4 backport. GGS ✅ (SiteGround). Generator ✅ (customer AMI). William Bills: customer handling. **Sandor Antal/Lyf PHP admin: location unknown, no access** (duongdn: ask the customer). **Andrew Taraba** ✅ told to install the plugin 09:46. Tracking sheet: "NUS - PHP CVE 20261022 Response" |
| 9 | Email carrick@ (James Le Chevalier) | James 12:21: "@Carrick Nguyen – is this below sorted yet?" (Upgrade Framework [URGENT], patch + backups OK'd 09:22/12:10). Carrick's reply isn't visible (Sent folder not scanned). AirAgri (LeNH) upgraded PHP 12:38. Please confirm the reply went out |
| 11 | 🔴 Upwork Neural Contract (added 09:25) | Michael (customer) 07:47 VN, after his own `apt upgrade` to PHP 8.2.35 on dev: **the site gives a 500 error**. Asks, **urgently** ("Given the security risk"): (1) BEFORE fixing the 500, build detection that shows a ContractProbe-branded error page with code `internalserver` (he has asked this "several times"); (2) screenshot of that page while the 500 is still present; (3) then fix the 500 and record every change; (4) push to Bitbucket; (5) send exact upgrade steps, since **he will patch production himself this weekend**. Carrick only replied "Let me check" at 09:20. Neural ○ |
| 10 | Performance | MPFC apdex **0.45** (chronic `continue` E_WARNING 1619x). **New:** E_COMPILE_ERROR `ABSPATHwp-includes/version.php` 2x + `mysqli_real_connect` No such file 2x (likely during patching). OhCleo `ChatSendView.post` 3.7s avg / 28 calls. Fountain new Rollbar #386 "'parker' is not a valid courier" (prod, 1x) |

**Today (Oct 23):** HauTT away 23–26/10. ✅ Resolved since last report: Celine covers (OhCleo #1). Andrew Taraba plugin question answered 09:46. Arthur R1 code pushed to staging (16:25/16:57). Baamboozle PHP CVE question handled. RDC customer told about PHP (dmetiner "thank you" 14:25). OhCleo 6 Pending reviews cleared.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 2 | namtv shared "NUS - PHP CVE 20261022 Response" sheet. NUS Logbook Vol.05 (info) | no events |
| carrick@ | 9 | ⚠️ James Le Chevalier "Upgrade Framework [URGENT]" ×3 (Alert #9). Hendrix → Colin PHP notice (sent). DigitalOcean droplet password reset (02:55). Kinsta PHP2Shell note. Stripe verification link, Slack code | no events |
| nick@ | 3 | Heroku Redis maintenance ×2 (hpd-vendor, hpd-merchant). Christina Keefe (Odysseus) FW Hostinger "Using Node.js on your VPS? Time to update", asks if it relates to yesterday's updates (info, not a monitored client) | no events |
| rick@ | 32 | Rollbar **FountainGifts #386 ArgumentError 'parker' is not a valid courier** (prod, new). FirstProject #1131/#1132 (not ours to gate). BugSnag rate-limit notice. Infinity credit logs + daily summaries (normal). Phishing "Review Required: Invoice NTR-257468" (ignore) | 10:30 OmniGPT Daily Sync · 11:00 + 12:30 HEAL Meeting |
| kai@ | 1 | JIRA LIFM2-465: Anoma "Testing ok" 18:22 | no events |
| ken@ | 80 | GitHub notifications only. Nothing for nusken | no events |
| vuongtrancr@gmail.com | 80 | (Swish paused, not monitored: New Relic Signal lost ×N.) Bitbucket delayedflight PRs #964–#974 by Mirko Baraldo (self-merged, info) | — |
| dnduongus@gmail.com | 19 | No breach alerts. Ubuntu One registration + Telegram code (self-initiated, likely). Bank/IBKR/newsletters | — |
| davidztv19@gmail.com | 4 | Google "Cảnh báo bảo mật" 08:24 (likely the Slack/Railway work; verify it was us). Stripe Meta-Stamp OTP 02:48 | — |
| freelancer@mpfc | 6 | ⚠️ Rollbar **#71 ArgumentCountError MM_Response::isSuccess()** new (Alert #4). Daily summary: 3 existing, 1 new. Google Workspace "possible unresolved security risks" notice. "Team Managers update" newsletter | — |

Trello: Check mail 6/6 ✓, [card](https://trello.com/c/JGv6bU13) done.

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 15 | Carrick PHP notice 08:36, PR #750 09:12. ⚠️ Aysar 10:16: PR not correct, '8.5' auto-picks 8.5.x. 10:18 "code quality rather than PR count". Carrick apologised and closed it 10:33. Jamie feedback deployed to Nusdev 14:39 ✅. Carrick Node.js notice 14:51. ⚠️ Jamie 15:16 dark-mode popup change + 03:46 Sunday release push (Alert #2). MPDM C07SQ4HAUHZ: no update 10-22, but KhanhHH has **0h Baamboozle 10-22**, so not an alert |
| RDC - FM Monitoring | 22 | Carrick PHP notice 08:35/08:41. Fixes deployed on all 3 envs 11:17. Compromise review: 452 files, no evidence 11:58. dmetiner thanks 14:25. florenz started the iOS/Android app: brief + PR #34 (Carrick "let me check"/"will review soon"). Carrick Node.js notice 15:17. dmetiner 16:45: per-device runtime upgrade order. ⚠️ 17:35 logging "not working" (Alert #1). Carrick EOD 19:37 ([msg](https://rdc-fmmonitoring.slack.com/archives/C09L6PH5NUU/p1792672650151289)) |
| Swift Studio | 34 | Carrick PHP notice. jeff → roryh: "serious security issue… please make decision soon". Rory 15:18: "Please go ahead". GoDaddy OTP shared. Simon (me1): www patched, but booking/dev on 7.4.33 can only switch the whole server. Carrick asked to hold the server-wide switch, disable `session.upload_progress`, and wait on GoDaddy for backport confirmation (21:01). Rory: "I will sort out the Upwork issue… today". No unanswered ask to us |
| Xtreme Soft Solutions | 9 | Madhuraka: 7.4 backport patch for prod (he applies). Kai patched staging 11:31. Madhuraka 15:03 "update on 465 asap" → Kai deployed + moved to Anoma testing 15:13 ✅. ⚠️ No Kai daily report (Alert #7) |
| SAM GUARD - Mobile | 1 | kfir 17:56 asks about SR-7898 (Elena DP is on the Ignore List; Elena OP team handles it) |
| Global Grazing Services | 64 | Nick PHP notice 08:53 → SiteGround patched 09:57 ✅. Pre-live testing by Joey all afternoon: sync outages, stock bugs, Schenker whitelist, APK sent 16:12. Amy holding reply 21:41. Nick weekly resource status 02:07 (Prestashop storage 73% WARNING). ⚠️ No Nick "Today report" 10-22 (Alert #3) |
| Amazing Meds | — | Ignore List (invalid_auth, not refreshed, not needed) |
| Generator | 3 | Carrick PHP notice, Violet Node notice. Rudi: "already patched the servers by creating a new AMI" ✅. Elliott on Ignore List |
| LegalAtoms | 2 | Raymond: timezone reminder for devs, "release today" tag (not a direct ask to Nick) |
| MyPersonalFootballCoach | 7 | freelancer answered tien271's IDP/League Tables questions (API docs updated). ⚠️ 16:53 plaintext secret pasted in DM (Alert #4) |
| William Bills | 15 | Lucas PHP + Node notices. Oliver: "all over it… Quan is sorting it out". Ignore List |
| Equanimity | 0 | (XiD security plan from 10-21 still open, holding reply sent) |
| SoCal Auto Wraps | 0 | — |
| Aigile Dev | 0 | Colin on Ignore List. PHP notice went by email (LucNT, Colin blocked Slack) |
| Meta-Stamp | 9 | See Arthur section |

Trello: Rory ✓ · Raymond ✓ · Marcel ✓ (no new msg, holding reply stands) · ⚠️ Maddy skipped (Alert #7) · ⚠️ Aysar skipped (Alert #2) · ⚠️ Franc skipped (Alert #1) · ⚠️ Bailey skipped (Alert #3) · ⚠️ MPFC skipped (Alert #4).

---

## Discord — all — 05:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 24 | Vinn stopped AirAgri (dangerous CVE) and upgraded PHP 8.0.30 → 8.4.27 on staging + prod. bellatric02 ran the regression on prod: Login/Incident/Hazard PASS. Brett hit the downtime, informed. Vinn found the cause of the David/Amaroo duplicate-properties issue. **Vinn "Just report my process today"** ✅. **Jeff daily report (4h)** ✅ (Team App location-sharing improvements). Jeff will apply the client's Safety Walk suggestions |
| Bizurk / animeworld DM (nuscarrick) | 2 | ✅ nuscarrick 09:45–09:46: PHP2Shell heads-up + "You just need to install the plugin" (answers 10-21's question) |

Trello: James Diamond ✓ (Vinn + Jeff reports, LeNH 8h 10-22) · Andrew Taraba ✓ (answered).

---

## Scrin.io — 05:12 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-10-22):** 0h, no sessions recorded.

---

## Sheets / Workstream — Thu 10-22 — 05:15 (+07:00)

Raw `/review/week` rows (week 10-19), read 05:15. Devs usually log the same day or next morning (~09:00), so missing 10-22 rows are not alerts yet.

| Developer | Wed 10-21 | Thu 10-22 (so far) | Status |
|-----------|-----------|--------------------|--------|
| LeNH | 8h | **8h** (James Diamond) | ✓ |
| TuanNT | 9.5h (Speedventory) ✅ | 0h so far | Very active in the Bailey room 10-22 (pre-live, sync). Expect hours after 09:30 |
| KhanhHH | ⚠️ **0.5h** (Baamboozle) | 2h (BXR App) | ~~10-21 shortfall 7.5h, no leave on record. Re-verify after 09:30 before any reminder~~ → 08:35: raw `/review/week` across all accessible projects re-checked: 10-21 = 0.5h, 10-22 = 2h. Lyf/Others are 403 (not visible). Leave refreshed 08:23: none. Upwork Aysar: 10-21 ≈5h (30 cells, memos #730 spelling + multi-word image search), 10-22 ≈1h40m (PHP patch + #705). **Real under-logging in WS** (≥4.5h on 10-21, ≥1.7h on 10-22 missing). 10-19/10-20 8h each |
| LongVV | 8h (DG 1.25 + OhCleo 5.25 + Maddy 1 + AW 0.5) | 7.75h (DG 6.75 + Maddy 0.5 + AW 0.5) | ad-hoc, informational |
| PhucVT | 8h Meta-Stamp | 0h so far | on Arthur (pushed staging 17:04) |

**Per-project (dev / reviewer charged / review status):**
| Project | Dev hours (week so far) | Reviewer charged | Review status |
|---------|-------------------------|------------------|---------------|
| Portfolio - James Diamond | LeNH 32h (8/8/8/8), AnhNH2 16h | PhucVT/LeNH: LeNH 32h as dev | NotRequired |
| OhCleo | LuHX 6.75h, LongVV 6.25h, HungPN 4h (0 charged), PhuongPVT 1h (0 charged) | DuongDN/MinhTV: 0h | ⚠️ **Pending ×1** (Alert #6) |
| Definitive Guide | LongVV 23h | — | need_review = false |
| Maddy | LongVV 1.5h (10-21 1h OpenSpec, 10-22 0.5h PHP) | — | need_review = false |
| Auction Warehouse | LongVV 1h | — | need_review = false |
| Baamboozle | KhanhHH 7.33h | — | need_review = false |
| Radio Data Center | KhanhHH 9.17h | LeNH: 0h | NotRequired |
| BXR App | KhanhHH 2h, TuanTT 3.5h (0 charged) | — | need_review = false |
| Meta-Stamp | PhucVT 24h | none set | need_review = false |
| Speedventory (Bailey) | TuanNT 13.5h, VyNL 19.5h (0 charged), VuTQ 7h, NamNN 4h, DatNC 4.5h (0 ch), TrinhMTT 5h (0 ch), DuongDN 1h | — | need_review = false |
| Andrew Taraba | TuanNT 5h (10-19) | — | need_review = false |
| Family App | LuHX 1h | — | need_review = false |
| Samguard (Elena OP) | DuyVNA 26h (0 ch), TriNM 23h, TienND2 16h, PhongTB 16h, SamHT 5.5h, HanDN 2.5h, DuongDN 0.42h | — | need_review = false |
| Fountain Greetings | see Fountain | VuTQ/DuongDN | excluded |
| Marcel | DuongDN 0.17h | — | need_review = false |
| Crystal lang / Rebecca / Blair Brown / Colin ETZ / Generator | no rows | — | — |

Trello: Aysar ⚠️ (KhanhHH 10-21 shortfall, plus Slack). No other task-log gate blocked.

## Maddy — W 10-19 — 05:16 (+07:00)

### 1. Task Log Hours
| Developer | Thu 10-22 | Weekly Maddy total | Status |
|-----------|-----------|--------------------|--------|
| LongVV | 0.5h ("Check & resolve PHP security") | 1.5h | ad-hoc, informational |
| LuHX | — | — | different role, not managed by us |

### 2. Slack / Kai Daily Report Check
- WS Maddy hours 10-22 = 0.5h of Kai-role (non-WordPress) work, so a daily report is expected. **None found** in Xtreme Slack → Alert #7.
- Madhuraka handled the prod PHP 7.4 backport himself. Kai patched staging 11:31.
- LIFM2-465: Madhuraka 15:03 "asap" → Kai deployed 15:13, Anoma "Testing ok" 18:22 ✅.
- Matrix: LongVV 11:12 confirmed the Maddy 7.4 patch to duongdn.

### 3. JIRA (weekly cross-check)
`maddy-jira-tasklog-check.js --week 2026-10-22`:
| Ticket | Summary | Status | Est | Actual (JIRA) | WS Log | Check |
|--------|---------|--------|-----|---------------|--------|-------|
| LIFM2-471 | Set up OpenSpec | Review | 1h | 1h | 1h | ✅ |
| (untagged) | Check & resolve PHP security | — | — | — | 0.5h | ⚠️ no ticket key, no est, no JIRA log |

### 4. Bitbucket PR Status
Live 08:38: 6 open Kai PRs (`xtreme-web/rms`): #560 LIFM2-471 (Rovo 1 minor, 10-21) · #544 LIFM2-465 (4 comments, Kai replied last 10-21 ✅) · #540 LIFM2-450 (0 comments) · #534 cron concurrency (Rovo only, 08-26) · #509 LIFM2-428 (Rovo only, 08-14) · #481 (waiting on the customer, not our blocker). No new client/human comments, no unanswered human review.

Trello: ~~⚠️ Maddy skipped (Alert #7)~~ → ✓ 08:47 (user: notify the room + complete, reminder sent).

---

## Fountain — 05:18 (+07:00)

**Part 1 — Matrix plan** (@trinhmtt, Mon 10-19 08:57, no mid-week change): **VuTQ 20h · ThinhT 20h · ViTHT 40h → QC 20h**.

**Part 2 — Workstream actuals (week 10-19, through Thu 10-22 as of 05:15):** ViTHT 3h · ThinhT 16h (4/4/4/4) · VuTQ 14h (4/4/2/4) · PhatDLT 8.5h · HungPN 4h. (TrinhMTT 8.75h, not QC, excluded.)

**Part 3 — Plan vs Actual (W 10-19, day 4):**
| Dev | Plan | Actual so far | Note |
|-----|------|---------------|------|
| ViTHT | 40h | **3h** | Only 10-20 logged. Very active in Matrix 10-22 (Backstage business guides ×6 PDFs, payment bug #81588). Logging lag; the per-dev 0h alert is off for Fountain |
| ThinhT | 20h | 16h | on track (reviewing PR #782 → staging) |
| VuTQ | 20h | 14h | Also 7h Speedventory (Bailey pre-live) this week |
| QC (PhatDLT + HungPN) | 20h | 12.5h | PhatDLT 10-22 not logged yet |

**Part 4 — Capacity & Runway:** not re-fetched this run. Last live value (10-22): **Narrow 229.00h / 28 tasks · Broad 328.50h / 63 tasks** (sheet frozen since the move to Workstream).
**Part 5 — Over-estimate:** last value (10-22): 36 items with actual > (Est+CR)×1.2. Top ratios 1650%, 890%, 825%. Frozen.

**Trello board (Web Development):** Rick 08:59 asked Kunal to push the new Sanity /blog live (WP being removed after the CVE; /blog on LIVE now redirects to the landing page). Kunal will invite Rick to his Sanity org. Kunal created "Gift emails: set up gifts.fountaingifts.com" (steps for Rick, ships with gift links BE #773/FE #940) and **"Rollout: Oct 22 release (backend #782, then website…)"**: our release task, ThinhT is merging #782 to staging. TrinhMTT 13:45 asked Kunal for repo access for QC/BA (waiting on Kunal). Rick created a "Node.js Security Release" card: Fountain + Infinity LIVE on Node 24.22.1 ✅. 4 new bug cards from QC. Lists: Ideas 8 · Next rollout 6 · In progress 2 · Bugs 11 · Done 6 · Notes 5 · Yearly 1.

Trello: Fountain - DOCUMENT ✓ (no unanswered Kunal ask to us. The Oct 22 rollout is in progress).

---

## Elena — 05:19 (+07:00)

- Elena - SamGuard Digital Plant: Ignore List (paused). PR/deploy flow not run.
- **WordPress samguard.co:** HTTP 200. jsErrors 0 · pageErrors 0 · **cspViolations 0** ✅. failedRequests 7 (GA/ads/LinkedIn, noise).

Trello: Elena - WordPress SamGuard ✓.

---

## Trello — Check progress — 05:30 (+07:00)

~~**16/22 complete**~~ **20/22** live 09:25 (Maddy ✓ 08:47, Bailey ✓ 08:52, Franc ✓ 08:55, Aysar ✓ 09:20 after the team was told, MPFC ✓ (done outside this session); ~~Neural ✓~~ reopened ○ 09:25 for Alert #11) (live 05:30, re-fetched live 08:25: same 6 ○ and all re-verified at 08:40. Franc/MPFC/Bailey/OhCleo got no new reply, Maddy still has no Kai report, Aysar has a new 06:46 bug report). [Card](https://trello.com/c/HZFqiS0e)
- ✓ James Diamond · Rory · Marcel · Raymond · Neural Contract · Andrew Taraba · Fountain - DOCUMENT · Arthur - Meta-Stamp · Elena - WordPress SamGuard
- ~~⚠️ Maddy: skipped (Alert #7)~~ → ✓ 08:47, Matrix room reminder sent
- ~~⚠️ Aysar: skipped (Alert #2)~~ → ✓ 09:20, team told by duongdn
- ⚠️ Neural Contract: ~~✓~~ reopened (Alert #11)
- ~~⚠️ Franc: skipped (Alert #1)~~ → ✓ 08:55, raised in the Franc room by duongdn
- ⚠️ MPFC: skipped (Alert #4)
- ~~⚠️ Bailey: skipped (Alert #3)~~ → ✓ 08:52, team reminder sent
- ⚠️ Ohcleo: skipped (Alert #5)

Check mail: 6/6 ✓, [card](https://trello.com/c/JGv6bU13) done.

## Ignore List — 05:30 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard Digital Plant, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:30 (+07:00)
- None sent (before 10:00, and no `--send-reminder`).
- KhanhHH: ~~candidate after 09:30 re-check~~ → 08:35 verified: WS 10-21 = 0.5h, 10-22 = 2h vs Upwork Aysar ≈5h / ≈1h40m. Reminder **not sent** (before 10:00, no `--send-reminder`). Suggested text: "Hi KhanhHH, Workstream shows only 0.5h on 10-21 and 2h on 10-22, but Upwork Aysar has ~5h (10-21) and ~1h40m (10-22). Please add the missing Baamboozle rows. Thanks!"
- LeNH 8h (10-22): skipped (has hours). TuanNT, PhucVT: 10-21 complete, 10-22 not logged yet. LongVV 7.75h.

---

## Matrix — 05:00 (+07:00)

**Active rooms: 28 / 151 | Messages: 676** *(since 10-22 08:00)*
Full details: reports/2026-10-23/matrix-rooms-0500.md

*(Script flagged 5 items. All were answered by duongdn the same day: LongVV auctionwarehouse patch (duongdn 09:20–09:34 "confirmed, báo cus"), Maddy 7.4 patch (info), LeNH chat (not an ask), Lyf/Sandor PHP ×2 (duongdn 08:53 + 13:46–14:06: no access, ask the customer for the location). One open thread: **Lyf PHP admin location still unknown** (Alert #8).)*

### Key updates

**PHP2Shell + Node.js CVE — company-wide response:**
- namtv all-hands 08:43: critical. Patch now, suggest shutdown when we can't patch. Tracking sheet created. Company Wiki and Quiz were shut down temporarily.
- duongdn 08:34/08:38: "làm ngay lập tức", tell each customer and suggest a server shutdown. Every team reported status (see Alert #8).
- Afternoon: Node.js CVE-2026-111497 round. Most projects are unaffected (no server-side Node). Fountain/Infinity were upgraded to 24.22.1. Also a Railway env-var leak (Arthur) and a LiteLLM supply-chain hack (namtv 16:20).

**Bailey — pre-live + prod sync:**
- TuanNT: PHP is already 8.4.27. Pre-live (prelive2) testing with the customer.
- Prestashop→Console sync stalled repeatedly (10:45, 14:17, 16:42, also on prod). datnc pushed hard ("này prod mà"). TuanNT fixed the Rails 6 syntax/tenant check. Mobile build couldn't fetch orders at first.
- Schenker IP: move the live EIP to prelive at swap. duongdn 16:23: the project needs real documentation ("dự án hiện rất lớn để dùng trí nhớ quản lí").

**Arthur — Railway key rotation + R1 staging:** PhucVT rotated keys and pushed R1+B1+rate limit to staging 17:07 (Railway queue). duongdn: Arthur release has priority ("có hứa release, ko vi phạm được").

**Rory/BXR (KhanhHH):** customer paused the contract. KhanhHH suggested the fix, minhtv: 8h manual task approved. KhanhHH found the Apple Wallet `.p12` key was **publicly downloadable** on production. Direct download is blocked now, and the mobile team will generate a new key tomorrow (needs the customer to resume the contract).

**OhCleo:** minhtv asks for LongVV full-time tomorrow. duongdn: James/DG upgrade comes first, so "report first, work later".

**Other:**
- Fountain: blog redirected on LIVE, Sanity go-live ASAP. Process meeting, moving PM to GitHub. ViTHT wrote Backstage business guides.
- Elena OP: AA-122..125 bugs estimated/fixed (PR #5558), new API for investigation history (+1h BE/FE). Release Wed next week.
- LeNH/AirAgri: PHP 8.4.27 done 12:38. duongdn: keep customer chat in the room, not DMs.
- RDC: KhanhHH PHP done + compromise scan clean. Node PRs not yet merged.
- James Diamond (halt): customer hasn't replied to the payment chase, duongdn to follow up with a tag.
- Colin ETZ: notice sent by email (Colin blocked Slack).

---

## OhCleo Slack — 05:20 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 7 | ✅ Tony 13:41 VN: person covers removed from the library, live covers swapped to generic. Celine 13:44 "Amazing! thank you so much!". Celine 18:59 reprioritised cards. ⚠️ 19:07 asks if Tony works tomorrow and what's left this week. ⚠️ 00:09 subscriber unlimited-listening question. 01:46 new cards (flag >2h items first) (Alert #5) |
| #events-code | — | `channel_not_found` (account not a member, needs admin re-invite, known) |

Tony daily report 10-22: not found in DM (thread replies not fetched by the script). WS shows LongVV **0h OhCleo on 10-22**, so a missing report is not an alert.

Trello: ⚠️ Ohcleo skipped (Alert #5).

---

## Performance — 05:22 (+07:00)

Window: since 10-22 05:15 (~24h).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.98 | 119ms | 2.2% (512/23474), ~92% benign NotAuthenticated | 16.5/min |
| mpfc | **0.45** ⚠️ | 1417ms | 4.5% (1647/36489), 98% `continue` E_WARNING | 25.6/min |
| fountain | 0.99 | 120ms | 0.002% (2/86250) | 60.5/min |
| infinity | 0.98 | 136ms | 0.01% (2/15919) | 11.2/min |

**OhCleo topErrors:** NotAuthenticated 470 · InvalidToken 13 · ValidationError email exists 9 · AuthenticationFailed "User does not exist" 5 · ValidationError username exists 5 · "Passwords don't match" 4 · No user with this email 2 · email+username exists 2.
**OhCleo slowest:** ChatSendView.post 3.7s/28 · CreatorVerificationSubmitView.post 2.5s/1 · CreatorPayoutHistoryView 1.5s/2 · ValidatePurchaseView 1.3s/4 · CategoryMediaView 1.1s/383.

**MPFC topErrors:** `continue` targeting switch 1619 · WP_Error::get_method() 7 · mkdir() name too long 6 · **E_COMPILE_ERROR ABSPATHwp-includes/version.php 2 (new)** · count() non-Countable 2 · **mysqli_real_connect No such file 2 (new)** · JSON_API_Auth_Controller::error() 2 · E_COMPILE_ERROR legacy-widget.php 1 · foreach invalid arg 1 · hasTrialPeriod() on null 1 (#70).
**MPFC slowest:** sitemap_index.xml 41.5s/2 · membermouse processOrder.php 27.5s/1 · /search/-5%25… 23.7s/1 · /search/-1%25… 23.5s/1 · /search/-1%25…%29 23.4s/1 (SQLi-style probe URLs).

**Fountain topErrors:** ArgumentError wrong args (3 for 2) 2 · ArgumentError 'parker' not a valid courier 1 (Rollbar #386).
**Fountain slowest:** ActiveStorage AnalyzeJob 72.0s/1 (bg) · AssistantCheckWorker 14.4s/70 (bg) · staff/assistants/ask 4.7s/1 · staff/relationships/index 4.2s/4 · gifts/swappable_gifts 3.6s/7.

**Infinity topErrors:** UnknownFormat 2 · ArgumentError wrong args (3 for 2) 2.
**Infinity slowest:** paypals/authorize_order 3.0s/1 · registrations/create 2.1s/3 · payment_intents/create 1.8s/6 · search 1.6s/47 · card_artworks/create 1.3s/1.

---

## Arthur / Meta-Stamp — 05:25 (+07:00)

Full Vietnamese tracker: `reports/2026-10-23/0530-arthur-monitor.md`
- GitHub Meta_Stamp_V3: ✅ **`staging` pushed 10-22 16:25 + 16:57** (davidztv). `main` unchanged since 10-15. Railway deploy queue blocked by their incident.
- Meta-Stamp Slack: Railway credential rotation done (Stripe/Auth0/SECRET_KEY, public proxies closed). Waiting on Chris for AWS (S3) + GCP (YouTube key) access ([msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792641131857099)). $1,701 not received, David nudged 14:49 ([msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792655361792659)). Staging push announced 17:04 ([msg](https://meta-stamp.slack.com/archives/C0BM37DJDD2/p1792663456323109)).
- Workstream: Meta-Stamp PhucVT 24h (10-19..21). Crystal lang 0 rows.

Trello: Arthur - Meta-Stamp ✓ (no unanswered customer ask, all open items wait on Chris).

---

## Upwork Memo — 2026-10-22 — ~~05:28~~ re-run 08:30 (+07:00)

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | 0 | 0 | No time logged 10-22 (contract paused by the customer) |
| Aysar | 2 | 0 | ✅ "Fix the Critical PHP Security Patch Required" · "Verify and fix requirements for the navbar dark mode toggle, free-user preview, and upgrade popup (#705)" |
| Tokenlite | — | — | login_failed (known open Tokenlite login issue, not a memo status) |

~~Cloudflare challenge not resolved ×3. Memo validity for 10-22 not retrieved yet.~~ → resolved by the 08:30 re-run (company PC up). No invalid memos.
~~Neural Contract (38901192): 4/4 login redirects, vault marked stale. Per the standing rule this is not an alert → Neural Contract ✓.~~ → **WRONG**: the login failure meant the messages were never read, and the 08:40 recheck didn't re-run it either. Re-run at 09:22 found Michael's urgent 07:47 ask (Alert #11). Neural ○.

---

## Unresolved Questions
- RDC: who answers dmetiner's 17:35 "logging not working, test exactly like I did", plus florenz's mobile brief + PR #34?
- Baamboozle: Jamie wants the dark-mode popup change today for a Sunday release. Aysar is criticising PR quality. Does Carrick need a review step before opening PRs?
- ~~KhanhHH 10-21 0.5h: real gap or missing project?~~ → real WS under-logging (Upwork proves ~5h Aysar work). Send the reminder? (needs `--send-reminder` / your OK)
- Baamboozle: Jamie 06:46 says multi-word image search (hotel + guest) is broken again. Who replies?
- Bailey: no Nick "Today report" 10-22. Who fixes Joey's two major stock bugs before today's hoped-for go-live? Find the sync root cause.
- MPFC: rotate the token pasted in Slack DM 16:53. ~~Saul's "vulnerable server" notice is still unanswered~~ (answered via WhatsApp ✅). Rollbar #71 is new.
- OhCleo: answer Celine (Tony's availability today and this week, subscriber web listening). Review LongVV's 10-21 Pending 2.5h row.
- ~~Maddy: Kai daily report + JIRA ticket~~ → reminder sent in the Maddy room 08:47, waiting on LongVV.
- carrick@: confirm James Le Chevalier's 12:21 "is this sorted yet?" got a reply.
- BXR: GoDaddy backport unconfirmed. Plan the PHP 8.3 window. `.p12` key rotation needs the contract resumed.
- Lyf (Sandor Antal): where does the PHP admin API live? Ask the customer.
- davidztv19@ Google security alert 08:24: confirm it was our own activity.
- ~~After 08:00: Upwork memo re-run~~ ✅ done 08:30, clean. After 09:30: 10-22 hours for TuanNT, PhucVT, ViTHT, PhatDLT (still 0 rows at 08:35).
