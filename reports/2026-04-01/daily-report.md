# Daily Report — 2026-04-01 (Tuesday)

## Email (all) + Trello Mail — 08:20 (+07:00)

**Period:** 2026-03-31 08:20 → 2026-04-01 08:20 (+07:00)

| Account | Count | Summary | Trello |
|---------|-------|---------|--------|
| duongdn@ | 9 | Redmine Bailey bug closures (routine), HR emails (salary Q1 survey, payslip 03/2026, part-time job info). No leave requests, no New Relic alerts. | ✓ complete |
| carrick@ | 8 | Redmine [Generator Bug #77954](https://redmine.nustechnology.com/issues/77954) NEW — Leads Engagement Dashboard issue. Jira BXR-178 assigned by Rory (Telephone Number not Saving). Rollbar SoCal daily summary. Slack confirmation codes. | ✓ complete |
| nick@ | 8 | ClickUp notifications (3D Admin Role, Jobs on hold). Azure DevOps PRs #1347-1349 from Emir LLaneza (CNA.Operations.App). No John Yi emails. | ✓ complete |
| rick@ | 10 | Rollbar daily summaries: InfinityRoses, FirstProject, FountainGifts. **⚠️ New Rollbar error: [FirstProject] production #972 ChunkLoadError (loading chunk 3148)**. Upwork msg from Gil C. | ✓ complete |
| kai@ | 8 | Xtreme Soft order cancellations (#1205, #1206). Madhuraka Jira: LIFM2-429, 395, 394, 427, 268 (Discount Price, Buy tab, Sell Types, Email templates). Weekly Jira summary. | ✓ complete |
| ken@ | 219 | GitHub notification noise (dependabot, welligence, zeroco84/rentle PRs). No Precognize/development activity found. | ✓ complete |

**Alerts:**
- ⚠️ **rick@**: Rollbar production error #972 ChunkLoadError on FirstProject (Fountain) — chunk 3148 failed to load. May indicate deployment/build issue.

**Trello:** All 6 Check Mail items ✓ complete on card `69cc675bb72f6874eba15e69`.

## Elena WordPress — 08:37 (+07:00)

**Site:** https://www.samguard.co/

**JS Console Errors:** 1
- **⚠️ CSP violation:** `connect-src` blocks `google.com.vn/rmkt/collect` (Google remarketing). Domain not in CSP allowlist — needs CSP update to add `https://www.google.com.vn`.

**Failed Requests:** 15
- **CSP-blocked tracking (4):** `google.com/ccm/collect`, `google-analytics.com/g/collect`, `google.com.vn/rmkt/collect`, `px.ads.linkedin.com` — blocked by current CSP `connect-src` policy. May need CSP update if these are intentional integrations.
- Video assets (11): Multiple `.mp4` files `ERR_ABORTED` — likely headless browser behavior (not playing media), verify in real browser if concerned.

**Action needed:** Update CSP `connect-src` directive to include `https://www.google.com.vn` (and review if other blocked domains also need adding).

## Trello Progress — Maddy — 08:45 (+07:00)

**Sources checked:**

**1. Slack (Xtreme):** ⚠️ Kai daily report missing — no "progress"/"daily report" post found. General chat only (discount pricing, JS).

**2. Sheets (LongVV — W52):**
- Mon 30/03: 8h ✓ (LIFM2-409: Anoma feedback 0.5h, LIFM2-430: Mark Order fulfilled 4h, LIFM2-268: Update feedback 3.5h)
- Tue 31/03: "Nghỉ cả ngày" (full day off) → 0h OK
- Wed 01/04 (today): 0h — early morning, not yet logged (normal)

- Maddy - Carrick/Kai/Luis: ⚠️ skipped — **Kai daily report missing**

## Trello Progress — Maddy (refresh) — 10:00 (+07:00)

**Sources re-checked (--refresh):**

**1. Slack (Xtreme):** 16 msgs since Mar 31. Kai yesterday: "I have take a day off on today, so tomorrow will back". Today: "Okay", "Yes, we can do it with JS" (responding to Madhuraka re discount hotfix + filter feature). Madhuraka: discount override bug + auto-select filter request. **Still no formal daily report** — 0 matches for "progress"/"daily report"/"My progress".

**2. Sheets (LongVV — W52):** Wed 01/04: 0h, all rows "Chưa" (not written). Normal at ~10 AM.

- Maddy - Carrick/Kai/Luis: ✓ **complete** — Tue 31/03 was "Nghỉ cả ngày" (full day off), no daily report needed. Today Wed 01/04 just started, 0h normal at ~10 AM.

## Trello Progress — Blake — 14:44 (+07:00)

**Source: Slack (SoCal Auto Wraps):** 51 msgs since Mar 31. Active #maintenance discussion between joey (Blake), amy, nick. Key activity:
- Nick deployed fixes for Grazing Software, Quote, Accessories, reduction codes to Live
- joey reported cart performance degradation after update → Nick resolved it
- joey testing subsellers, accessories, price range display
- New issue: rating text too large on mobile in cart
- Current focus shifting to subseller module full-time

No blocking alerts — normal active project work.

- Blake: ✓ **complete**

## Trello Progress — John Yi — 14:47 (+07:00)

**1. Slack (Amazing Meds):** 54 msgs. Nick posted daily report in #it-dept-all: "update AM Method feedback, change style widget care plan AM, setup plugin paypal (Paid Membership Subscriptions)". Active #web-dev-with-nick: PayPal subscription setup for care plan page, Gil requesting webinar section updates. John Yi engaged throughout. No alerts.

**2. Sheets (TuanNT — W17, Mar 30 – Apr 5):**
- Mon 30/03: "Nghỉ cả ngày" (full day off) → 0h OK
- Tue 31/03: 5.5h (TuanNT portion for John Yi; splits across 3 projects)
- Wed 01/04: 0h — not yet filled (afternoon, may log later)

No blocking alerts.

- John Yi - Amazing Meds: ✓ **complete**

## Sheets TuanNT — 15:22 (+07:00)

**John Yi (W17, Mar 30 – Apr 5):**

| Day | Hours | Owner | Details | Col A |
|-----|-------|-------|---------|-------|
| Mon 30/03 | — | TuanNT | Nghỉ cả ngày | ✓ leave |
| Tue 31/03 | 5.5h | TuanNT | AM Method feedback, care plan styling, PayPal plugin (Paid Membership Subscriptions) | Task dự án |
| Wed 01/04 | — | — | Not yet filled | — |

**Rebecca / William Bills (W18, Mar 30 – Apr 5):**

| Day | Hours | Owner | Details | Col A |
|-----|-------|-------|---------|-------|
| Mon 30/03 | 0.5h | DuongDN | jersey.com.au is down. TuanNT: Nghỉ cả ngày | TuanNT leave |
| Tue 31/03 | 2.5h | TuanNT | MWMX task update + plugin update | Task dự án |
| Wed 01/04 | — | — | Not yet filled | — |

No alerts. TuanNT was on leave Mon, worked Tue (5.5h JY + 2.5h Rebecca = 8h combined ✓).

## Trello Progress — James Diamond — 15:40 (+07:00)

**1. Discord (AirAgri):** Very active — 50+ msgs in #airagri_webapp, 37 in #airagri-flutter.
- **Vinn (nusvinn):** Daily report Mar 30 posted ✓ (support Leon/Jon, review PRs 279-280, pre-prod DB). Mar 31: active code reviews, PR 281 comments, pre-prod testing with James. Requesting cronjob feature testing confirmation.
- **Jeff (jeff_trinh):** Daily report Mar 30 ✓ (4h: activity creation incidents, visitor/main app builds). Daily report Mar 31 ✓ (4h: Incident Settings UI/API, submitted app to Apple). Today: confirming door sensor feature + asking about 6h day.
- **Leon (dapackage):** PR 281 door sensor UI, PR 283 active properties hotfix, incident investigation. Shared task plan with Jon.
- **James (.jdiamond):** Active — testing active property feature, requesting training session ticket, confirming Leon's approach, asking Jeff for store submission.

**2. Sheets (PhucVT — W19, Mar 30 – Apr 5):**

| Day | Hours | Details |
|-----|-------|---------|
| Mon 30/03 | 12h | PhucVT 8h (support Leon/Jon, review PRs, pre-prod DB) + AnhNH2 4h (incidents, app builds) |
| Tue 31/03 | 12h | PhucVT 8h (active property flow, PR 281 review, stop alarm, movement monitoring) + AnhNH2 4h (Incident Settings, Apple submission) |
| Wed 01/04 | — | Not yet filled |

No alerts.

- James Diamond - Vinn task: ✓ **complete**

## Trello Progress — Rory — 15:48 (+07:00)

**1. Slack (Swift Studio):** 7 msgs in #bxr__app. Rory requesting estimation sheet, flagging testing quality, adding new bug. Carrick resolved ticket + checking estimations. Jeff notifying upcoming holidays (Hung Kings'). Normal project activity.

**2. Sheets (LeNH combined — Rory W5, Franc W18, Aysar W18):**

| Day | Rory | Franc | Aysar | LeNH total |
|-----|------|-------|-------|------------|
| Mon 30/03 | 4.67h (phone number check, internal API) | 2h (Kocaeli tuner, MetricsMonitor, user panel) | 2.33h (PR gif/image keyword detection) | **9h** ✓ |
| Tue 31/03 | 5.5h (internal API) | 2h (deploy user panel, map options, fix delete) | 0.5h (team invitation emails) | **8h** ✓ |
| Wed 01/04 | — | — | — | Not yet filled |

No alerts.

- Rory: ✓ **complete**

## Trello Progress — Franc — 15:51 (+07:00)

**1. Slack (RDC - FM Monitoring):** 24 msgs since Mar 31. #rpi-reboot-logs: 3 instability alerts + 1 recovery (automated tuner monitoring, normal). #user-access-logs: 6 tuner access logs. #all-rdc-fm-monitoring: Carrick updated admin panel users on fmscan.com, fixed delete user FK constraint. dmetiner requested plugin updates from upstream + Slack notifications. Normal project activity.

**2. Sheets (LeNH — Franc W18):** Mon 30/03: 2h (Kocaeli tuner, MetricsMonitor, user panel). Tue 31/03: 2h (deploy user panel, map options, fix delete). Wed 01/04: not yet filled. Combined LeNH totals: Mon 9h ✓, Tue 8h ✓.

No alerts.

- Franc: ✓ **complete**

## Trello Progress — Aysar — 15:55 (+07:00)

**1. Slack (Baamboozle):** 22 msgs since Mar 31. Active #testing: skjamie25 reported 🔥 team invitation emails not received + 🔥 Quizlet imports failing on production. Carrick diagnosed both as queue worker stopped on production — confirmed working on nusdev. Only Aysar has production access to restart. #engineering: Carrick proposed LTS tech stack upgrade to Aysar. skjamie25 also requested removing common English words from blocking list + asked about open PRs status.

**2. Sheets (LeNH — Aysar W18):** Mon 30/03: 2.33h (PR gif/image keyword detection). Tue 31/03: 0.5h (team invitation emails). Wed 01/04: not yet filled. Combined LeNH totals: Mon 9h ✓, Tue 8h ✓.

No person-status alerts. Project issues (queue worker) are dev topics, not monitoring alerts.

- Aysar: ✓ **complete**

## Trello Progress — Elliott — 15:58 (+07:00)

**1. Slack (Generator):** 46 msgs since Mar 31. Very active project:
- **Release completed Tue 31/03** (7pm AEST): 10 tickets including Evacuation Report, User Contact Info, Vehicle Types, Incidents. Violet coordinated. Post-release: Elliott flagged regression — "Operations" nav label reverted to "Operation".
- Rudi: urgent fix for user-profile-requests defect, PR reviews (MR#278, #285, #330), large attachment size concern (proposed 15MB cap). Carrick approved + implementing.
- Elliott: reviewing Events navigation improvements (Jeff completed), planning early/mid April release with "Targetted Next Release" tickets.
- Violet posted daily reports Mar 31 + Apr 1 ✓. Carrick: sub-task date fix, payments investigation, Redmine defects.
- Today: Rudi requesting Carrick pick up new task urgently (end of week target).

**2. Sheets (KhanhHH — W34):**
- Mon 30/03: 8h (review PRs, handle tasks, fix redmine issues, fix production issue, verify bookings API, global search fix) ✓
- Tue 31/03: 8h (sub-task date fix, payments defect, prepare release PRs, review Rudi code, scheduled maintenance defect) ✓
- Wed 01/04: 0h — tasks listed (Rudi task, payments, redmine, PR reviews) but hours not yet filled (afternoon)

No alerts.

- Elliott: ✓ **complete**

## Trello Progress — Colin — 16:00 (+07:00)

**Source: Slack (Aigile Dev):** 14 msgs since Mar 31. All automated — `make` bot in #braiking-news: 4 blog draft notifications (AI workforce planning, shadow AI risk), 9 newsletter ready-to-send alerts, 1 unpublished blog warning. No human activity.

No alerts.

- Colin: ✓ **complete**

## Discord Bizurk (AnimeWorld DM) — 20:55 (+07:00)

**Period:** 2026-03-31 14:09 → 2026-04-01 20:55 (+07:00)
**Account:** nuscarrick | **Check:** DM with animeworld user

| Channel | Messages | Summary |
|---------|----------|---------|
| DM: animeworld | 0 | No messages in window |

No alerts.

## Trello progress andrew — 20:55 (+07:00)

- Andrew Taraba: ✓ **complete**

## Trello progress rebecca — 21:02 (+07:00)

**Sources:** Slack (William Bills) + Sheets (TuanNT/Rebecca)

**Slack William Bills** — 20 msgs since 2026-03-31 14:09:
- Lucas (TuanNT): daily report posted Apr 1 08:35 — "Today I will continue updating yesterday's tasks. I'm currently working on task number 5."
- Active back-and-forth with Oliver on MWMX tasks (new pages, header nav, auto-logout)
- No alerts.

**Sheets TuanNT (Rebecca) — W18 (Mar 30 – Apr 5):**
| Date | Hours | Col P (TuanNT) |
|------|-------|----------------|
| Mon 30/03 | 0.5h | — (Nghỉ cả ngày) |
| Tue 31/03 | 2.5h | Chưa |
| Wed 01/04 | 0h | Chưa |

Yesterday (Mar 31): 2.5h logged. No alerts.

- Rebecca (William Bills): ✓ **complete**

## Trello progress neural — 21:26 (+07:00)

**Source: Upwork (workroom 38901192 — Neural Contract)**

**Period:** 2026-03-31 08:20 → 2026-04-01 21:26 (+07:00)

| Date | Who | Message |
|------|-----|---------|
| Mar 27 9:08 AM | Carrick | "Hi Michael, It seems staging is down by unknown reason. Let check" |
| Mar 27 9:23 AM | NC | "I turned it off, to same money, when nothing is needed to be done. Nothing for you to do." |
| Mar 27 9:31 AM | Carrick | "I noted" |

No messages since March 27. No alerts.

- Neural Contract: ✓ **complete**

## Trello progress raymond — 21:31 (+07:00)

**Source: Slack (LegalAtoms)**

⚠️ **Token invalid** — LegalAtoms xoxp token returned `invalid_auth`. No automated refresh path available (xoxp tokens require manual re-authorization; Slack password for nick@nustechnology.com unknown).

- Raymond - LegalAtoms: ⚠️ **skipped** (LegalAtoms Slack token invalid — manual token refresh needed)
