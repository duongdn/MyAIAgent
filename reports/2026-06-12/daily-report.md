# Daily Report — 2026-06-12

*Generated: 2026-06-12 05:00 (+07:00) | Corrected: 09:06 (+07:00)*
*Window: 2026-06-11T08:34:39+07:00 → 2026-06-12T05:50:00+07:00*

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email carrick@ | Generator CI/CD pipelines FAILING — staging/stagingPhase2/release-be-jun-2026-batch-2 |
| 2 | Email rick@ | FirstProject production Rollbar errors #425/#423/#418 (Minified React); InfinityRoses prod ActiveRecord error |
| 3 | Email nick@ | AuShare Sentry Net::SMTPSyntaxError (2x); Xero limit warning |
| 4 | Email vuongtrancr@ | Atlassian Confluence subscription deactivating soon |
| 5 | OhCleo | Link branding broken (ohcleo.com/app); SendGrid password change not working |
| 6 | Fountain | trinhmtt W30 weekly plan NOT posted. #2615 still growing (106.75h / 12h est = 789%) |
| 7 | BXR | Mindbody v5→v6 migration blocking membership signup; hours running high |
| 8 | Maddy JIRA | LIFM2-439 over-budget 9h30m 🔴; LIFM2-443 no estimate |

**Today (Jun 12):** TuanNT on leave. PhucVT WFH (sick). Multiple staff leave Jun 12-15.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 5 | — | no events |
| carrick@nustechnology.com | 35 | Generator pipelines failing (many), SoCal Rollbar, Snyk (Marcel org) | no events |
| nick@nustechnology.com | 36 | AuShare Sentry SMTPSyntaxError (2x), Xero limit warning (2x) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 50 | ⚠️ Rollbar FirstProject prod errors (React #425/#423/#418), Fountain staging (FK violation, null violation), InfinityRoses prod (ActiveRecord::StatementInvalid), Tom Figma Fountain mentions | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 10 | — | no events |
| ken@nustechnology.com | 50 | — (GitHub PR review notifications for Precognize) | 08:30 DE Daily Standup, 09:00 DE Bi-weekly retrospective, 09:30 Martin & Ken |

**Alerts:**
- carrick@: Generator API pipelines repeatedly failing on staging/stagingPhase2 (multiple branches incl. 361-rsvp-cut-off-date-time, release-be-jun-2026-batch-2). Snyk vulnerability in Marcel org.
- rick@: FirstProject (Fountain?) production Rollbar errors — Minified React errors #425, #423, #418; also FountainStaging FK violations + PG::NotNullViolation in admin/gifts#import_csv; InfinityRoses production ActiveRecord::StatementInvalid.
- nick@: AuShare ClickUp — Sentry Net::SMTPSyntaxError issue (no John Yi emails found)
- duongdn@: HaoNV leave request email (06-09); NUS World Cup 2026 event emails

Trello: All 6 Check mail items ✓ complete.

## Slack — all — 05:18 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 | Aysar ✓ daily report in MPDM 10:29 (fix Change Team Owner, Profanity Filter #600); Ronan archived "music" channel; Jamie+Carrick discussing team owner bug |
| RDC - FM Monitoring | 6 | Carrick pushed Turkiye tuner improvements (CSV parsing, API updates to Bursa+İzmir); tuner access logs; tuner recovery alert. No dmetiner activity |
| Swift Studio | 20 | Carrick active (DM with Jeff on region/site_id sync feature) |
| Xtreme Soft Solutions | 20 | Kai ✓ progress: LIFM2-436 Done, LIFM2-444 (Async Queue for Bulk Listing) In progress |
| SAM GUARD - Mobile | 20 | HubSpot MQL alerts (automated); no Elena-specific activity |
| Global Grazing Services | 20 | Amy + Joey active (picking guns scanner working) |
| Amazing Meds | 2 | Nick asking John Yi about NitroPack (2026-06-10); quiet otherwise |
| Generator | 20 | Rudi asking Carrick to review MR for batch 2 release; Ryan coordinating FE batch 2 |
| LegalAtoms | 20 | Raymond: doc list/workflow/EFSPS outage (~18:53 UTC Jun 11) → "should be ok now" (05:56 UTC); Maryland live! No Nick-specific alerts |
| MyPersonalFootballCoach | 0 | — quiet |
| William Bills | 0 | — quiet |
| Equanimity | 8 | Carrick + Komal discussing UAT dataset — no alerts |
| SoCal Auto Wraps | 0 | — quiet |
| Aigile Dev | 3 | Automated alerts + Make warning (blog draft not published) |

## OhCleo Slack — 05:19 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 11 | Active |
| #events-code | 0 | — |

Tony daily report: ✓ present at 10:25 (+07:00):
- [Mobile] Subscription Page Redesign
- fix: iOS subscription payment succeeds but validation error is still shown
- [Mobile - BE] fix: Android subscription payment fails
- fix: app login session (auto-refreshing expired access tokens)

Customer messages (Celine):
- "Regarding this card: https://trello.com/c/awYi27Ue/117 (Offer 1 month free premium to legacy web subscribers) — Did you already give all web users one month free?"
- Asked about ohcleo.com/app link branding (Cloudflare redirect to App Store/Play Store)
- Noted change password not working (SendGrid issue)

⚠️ **OhCleo alerts:**
- Link Branding broken: ohcleo.com/app not working → Tony disabled as quick fix, will investigate
- Password change (SendGrid): Tony: "change password is not working, that's a sendgrid issue"

## Discord — all — 05:24 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 40+ | nusvinn ✓ daily report Jun 11 17:29 UTC+7 (#airagri_webapp). Jeff ✓ daily report Jun 11 17:22 (deep link, training session QR). |
| Bizurk (nuscarrick) | 0 | Quiet — normal |

**AirAgri details:**
- Vinn (nusvinn) ✓ daily report 17:29 +07:00 in #airagri_webapp — cron missed it, found in recheck
- Jeff (jeff_trinh) ✓ daily report 17:22 +07:00: Check deep link, build Main app, implement API integration for training session registration (4h)
- nusvinn active in airagri_webapp + airagri-testing (technical discussion on SOS alarms, SafeFarm zoom issue moved to Analysis)
- dapackage (dev) merged to prod (SOS/alarm changes), waiting for bellatric02 (QA) check
- bellatric02 confirmed Corporate Group Sensor Linking + Door Contact Sensor Water Readings verified in Production ✓
- .jdiamond (client): noted SafeFarm map zoom not resetting; commented on SOS alarm phone+app notification

**Bizurk:** animeworld DM 0 new messages — OK (silence is normal).

Trello: James Diamond - Vinn ✓ complete (daily report found 17:29 UTC+7); Andrew Taraba ✓ complete (silence = OK)

## Scrin.io — 05:26 (+07:00)

**Scrin.io (Nick / John Yi — 2026-06-11):** 0h — no sessions recorded.

## Sheets — all — 05:29 (+07:00)

| Developer | Jun 11 (Thu) | Status | Notes |
|-----------|-------------|--------|-------|
| LongVV | 0h Maddy | ✓ active | Matrix confirms active on Maddy + OhCleo Jun 11. Workstream unverifiable (token expired). |
| PhucVT | 8h (own) | ✓ | 12h total incl. AnhNH2 4h |
| TuanNT | 0h total | ✓ leave | Off Jun 11 (user confirmed). All 4 sheets 0h: Paturevision: 0h \| JohnYi: 0h \| Rebecca: 0h \| Neural: 0h |
| VietPH | 8h | ✓ | |
| KhanhHH | 8h total | ✓ | Aysar: 0.5h + Generator: 7.5h |
| LeNH | 8.17h total | ✓ | Rory: 7.17h + Franc: 1h (ad hoc, no target) + Rebecca(Q-T): 0h |
| Elena | 11h | ✓ | TriNM: 3h + KietNHT: 8h |

**TuanNT gate: PASSED** — leave day (0h OK per user). John Yi + Rebecca + Bailey gates pass.

**LeNH:** Franc is ad hoc (no hours expectation) — 1h is fine. Rory 7.17h ✓.

## Sheets — Maddy JIRA — W10 — 05:30 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-439 | Listed-Cons tab changes | To Do | 12h | 21h 30m | 4h | 🔴 over 9h 30m |
| LIFM2-443 | Order Fulfilment | Ready to deploy | 0h | 14h | 4h | ⚠️ no est |
| LIFM2-436 | Returns | Review | 15h | 12h 45m | 4h | ✅ |
| LIFM2-444 | Async Queue for Bulk Listing Price Updates | In Progress | 15h | 4h | 4h | ✅ |

**Over-budget (1):** LIFM2-439 est=12h actual=21h 30m **over 9h 30m** 🔴
**No estimate (1):** LIFM2-443 — dev must set est before logging more

## Elena — 05:40 (+07:00)

**Open PRs (duongdn):** 0 — no PRs to merge
**Precognize (nusken) PRs:** 0 — no nusken PRs open

**samguard.co WordPress:** 0 page errors, 0 JS errors ✓ (2 CSP violations from Google Analytics = false positives, filtered)

**SAM GUARD Slack:** HubSpot MQL alerts only (automated), no Elena-specific activity

Trello: Elena - SamGuard → depends on Slack (no Elena alert) → ✓ complete

## Fountain — 05:42 (+07:00)

**Part 1 — Matrix Plan:** ⚠️ trinhmtt did not post W30 weekly plan. Searched 300+ messages back to Jun 9 — no plan message found. Plan absent = alert condition.

**Part 2 — Task Log Actuals:** Week tab discovery returned W52 (mismatch — likely script error). Actual Fountain week tab is different; hours likely accumulated from prior days this week. Data unreliable from cron.

**Part 3 — Plan vs Actual:** Cannot compare (plan absent)

**Part 4 — Capacity & Runway:**
- Total est: 2953.5h, Total charged: 3114.5h
- Remaining est: 0h, Runway: 0 weeks
- Note: total_charged > total_est = entire backlog over-budget

**Part 5 — Over-Estimate Tracking:**
- #2615: est=12h, charged=106.75h — **789.6% over** 🔴 (still growing)
- #2595: est=120h, charged=168.25h — 40.2% over
- #2735: est=130h, charged=136h — within threshold ✓
- **Total 37 tasks over-estimate** (threshold >20%)
- Notable: #2627 1550% over (0.5h est, 8.25h actual), #2639 725% over, #2613 625% over

Fountain Trello: ○ skip — trinhmtt W30 plan not posted.

## Trello — progress — all — 05:47 (+07:00)

| Item | Checklist | Result | Reason |
|------|-----------|--------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ✓ complete | Kai progress in Xtreme Slack |
| John Yi - Amazing Meds | Normal | ✓ complete | TuanNT leave (0h OK) + Amazing Meds active |
| James Diamond - Vinn | Should do | ✓ complete | Vinn daily report found 17:29 UTC+7 Jun 11 (cron missed, found in recheck) |
| Rory | Closely monitor | ✓ complete | Swift Slack active + LeNH 7.17h |
| Aysar | Closely monitor | ✓ complete | Daily report in MPDM C07SQ4HAUHZ |
| Franc | Closely monitor | ✓ complete | Ad hoc project — any activity OK. 1h logged. |
| Elliott | Closely monitor | ✓ complete | Generator Slack active (Rudi, Violet), KhanhHH 7.5h |
| MPFC | Work | ✓ complete | Quiet = OK |
| Marcel | Work | ✓ complete | Equanimity active, no alert |
| Elena - SamGuard | Work | ✓ complete | No Elena alert, WordPress clean |
| Raymond - LegalAtoms | Work | ✓ complete | Issue fixed, no Nick-specific alert |
| Neural Contract | Work | ✓ complete | Silence = never alert |
| Bailey | Work | ✓ complete | TuanNT leave (0h OK) + GGS active (Amy/Joey) |
| Andrew Taraba | Work | ✓ complete | Bizurk silence = OK |
| Rebecca - William Bills | Work | ✓ complete | TuanNT leave (0h OK) + W.Bills quiet |
| Colin | Work | ✓ complete | Aigile Dev no significant alert |
| Fountain | Work | ○ skip | trinhmtt W30 plan not posted this week |
| Philip | Work | ✓ complete | MS Teams: Philip Briggs chat found, no customer alerts |
| OhCleo | Work | ○ skip | Customer alerts: Link Branding broken + SendGrid |
| Elena - WordPress | Pending | ✓ complete | 0 JS errors |

## Reminders — 05:48 (+07:00)

Devs with 0h or shortfall on Jun 11 (no leave note):

| Developer | Status | Hours | Action |
|-----------|--------|-------|--------|
| LongVV | ✓ active | 0h Maddy sheet — Matrix confirms active on Maddy + OhCleo Jun 11 | Workstream unverifiable (token expired). No reminder. |
| PhucVT | ✓ OK | 8h | — |
| TuanNT | ✓ leave | 0h (off Jun 11, user confirmed) | No reminder needed |
| VietPH | ✓ OK | 8h | — |
| KhanhHH | ✓ OK | 8h | — |
| LeNH | ✓ OK | 8.17h combined (Rory 7.17h + Franc 1h ad hoc) | — |

Note: `--send-reminder` not passed → printing to report only, no Matrix messages sent.

## Matrix — 05:49 (+07:00)

Matrix SSO expired during cron (05:49). Re-authenticated manually at 08:22 — full scan completed. See Matrix — 08:22 section below.

---

## Matrix — 08:22 (+07:00) *(recheck)*

**Active rooms: 19 / 125 | Messages: 579** *(since 2026-06-11 08:00 +07:00)*
Full details: reports/2026-06-12/matrix-rooms-0822.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| Direct Manager | 09:21 | anhnvn: "Này nhớ trước discuss theo plan là sẽ đưa vào dạng gắn tag rồi thống kê, filter theo tag... Dùng cũng dc nhiều use case... Mà ko biết có plan khi nào làm chưa ta." — Asking for timeline on workstream task-tagging feature |

### Key updates

**OhCleo — Android payment fixed, link branding still broken:**
- HiepNT + LongVV resolved Android subscription package name issue (com.ohcelo.ohcleoapp). PR #15 merged, payment now succeeds.
- ohcleo.com/app link branding disabled as quick fix. David Nguyen not yet responded.
- SendGrid password change issue still unresolved.

**Elena - Active Alerts — Server back up after power cut:**
- nusdev went down overnight (power cut). KietNHT restarted manually. Team discussing automation.
- TuanNTG onboarding on Elena project. Sam Ha (new FE dev) joined.
- Multiple Redmine bugs in progress (#79227, #79228, #79237).

**Kunal - Fountain — Bug sprint active:**
- State names fix (#2854) live. Cart cache bug (#2865) in progress. Snooze/reminder icon bug still open.
- ViTHT: large feature changes → BETA only, small → direct Live.

**Rory/BXR — Mindbody API migration discussion:**
- LeNH + KhoaTD investigating v5→v6 migration. v6 dropped username/password login. Proposal to remove signup form.
- Hours running high — minhtv flagged to report blockers immediately.

**Maddy/Xtreme — LIFM2-409 over-estimate flagged:**
- LongVV over by 17h (latest Anoma feedback phase not reported to client). duongdn instructed to resume est→approve flow.

**Bailey/Paturevision — Live deploy confirmed:**
- Console Order Verification & Force Scanning feature went live.

**Other:**
- BDD Delivery: Multiple leave notices Jun 12-15 (PhucNH, ThangN, TaiTM, DaiDV).
- NUS Technology: World Cup 2026 starts tomorrow.

---

## Re-check — 08:30 (+07:00)

*Re-checked all ○ incomplete items from cron run. Matrix token refreshed (SSO captured at 08:22).*

| Item | Result | Details |
|------|--------|---------|
| James Diamond - Vinn | ✓ completed | Vinn daily report found: 10:29 UTC (17:29 UTC+7) Jun 11 in #airagri_webapp — cron missed it |
| Franc | ✓ completed | Ad hoc project (like Marcel) — no hours expectation. 1h logged is fine. |
| Fountain | ○ skip | trinhmtt W30 plan NOT posted in Kunal-Fountain Matrix room (searched 300+ msgs back to Jun 9) |
| Philip | ✓ completed | MS Teams ran at 09:03 — Philip Briggs chat found, no alerts |
| OhCleo | ○ still incomplete | Customer alerts active: link branding broken + SendGrid issue (intentional hold) |

**Cleared:** James Diamond - Vinn ✓, Franc ✓, Philip ✓
**Still open:** Fountain (trinhmtt plan absent), OhCleo (customer alerts)

### Fountain Part 1 note
trinhmtt did not post the weekly plan message ("Em update plan tuần này ạ\nViTHT: Xh...") in the Fountain Matrix room for W30 (Jun 9-13). All trinhmtt messages this week are task-level coordination only. Plan absent = alert condition; Fountain item stays ○ incomplete.

### Today's context (Jun 12)
- TuanNT on leave today (confirmed in Matrix: "Tuấn nay nghĩ :))")
- PhucVT working remotely (sick, but logged 8h yesterday)

---

## Email — 3 missing accounts — 09:06 (+07:00)

*Window: 2026-06-11T08:34:39+07:00 → 2026-06-12T05:50:00+07:00*

| Account | Emails | Key content |
|---------|--------|-------------|
| vuongtrancr@gmail.com | 35 | Atlassian Confluence subscription deactivating soon (Jun 11). 20+ Swish EV charging system support emails (French client, automated). Personal notifications. |
| dnduongus@gmail.com | 16 | Personal/financial (Vietcombank, UOB, ContentStudio, promotions) — no alerts. |
| freelancer@mypersonalfootballcoach.com | 2 | MPFC Daily Summary Jun 11: 1 existing `Google_AuthException` (not new). New Relic marketing. |

**Alert:**
- ⚠️ vuongtrancr: Atlassian Confluence "Your subscription will be deactivated soon" (from Atlassian, Jun 11 09:17). Action: confirm if NUS Confluence subscription needs renewal.
- freelancer: MPFC 1 existing `Google_AuthException` — same as yesterday, no new errors.

---

## Philip MS Teams — 09:03 (+07:00)

Ran `fetch-msteams-customer-messages.js will "Philip Briggs"` — chat found, 1 message in window, no customer alerts. Trello: Philip ✓ complete.

---

## Yesterday's Alerts — Status vs Jun 11 Report

| Alert (Jun 11) | Today's status |
|----------------|---------------|
| Generator CI/CD pipeline failures (carrick@) | 🔴 Still failing — same branches today |
| FirstProject production Rollbar errors #425/#423/#418 (rick@) | 🔴 Still present today |
| John Yi Xero limit warning (nick@) | ✅ No new warning email today |
| OhCleo PR #14 needs review | Status unknown — PR #15 merged Jun 11; PR #14 not mentioned in today's Matrix |
| BXR estimate risk (177.5h/189h; Mindbody out-of-office Jun 22) | 🔴 Still blocked — Mindbody v5→v6 migration being investigated. Hours still running high. |
| Elena AA2/AA3 issues | 🟡 In progress — new devs onboarding, bug fixes #79227-#79237 in progress |
| Elena Digital Plant servers | ✅ Back online — nusdev restarted after power cut |
| Fountain #2615 over-estimate (GROWING) | 🔴 Still growing — now 106.75h charged (was ~90h yesterday) |


