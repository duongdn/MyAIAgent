# Daily Report — Monday April 13, 2026

**Window:** 2026-04-10 09:15 → 2026-04-13 09:35 (+07:00)
**Last run:** Friday April 10 09:15

---

## Email (all) — 09:40 (+07:00)

| Account | Count | Summary | Alerts |
|---------|------:|---------|--------|
| duongdn@ | 0 | No emails | None |
| carrick@ | 14 | 7 Redmine (Elliott bugs closed), 4 GitLab pipeline (XiD SaaS), Rollbar daily | Rollbar SoCalAutoWraps daily summary (info) |
| nick@ | 20 | 1 Canda Surveyors, 6 ClickUp/Sentry, 12 Azure DevOps PRs (CNA.Operations.App) | None. No John Yi emails |
| rick@ | 25 | Rollbar dailies (InfinityRoses, FountainGifts, FirstProject), BugSnag staging | **PRODUCTION: FountainGifts error #260 (NoMethodError), FirstProject #975/#976 TypeErrors (10th occurrence each)** |
| kai@ | 8 | Jira: LIFM2-432, -430, -409, -259 from Anoma/Madhuraka | None |
| ken@ | 416 | ~39 Precognize/development PRs, welligence/WellStack, mimaizumi/amocc-material | None |

**Production alerts:** FountainGifts new error #260 (NoMethodError, production). FirstProject recurring TypeErrors #975, #976 at 10th occurrence.

Trello: all 6 Check Mail items ✓ complete.

---

## Slack (all) — 09:45 (+07:00)

| Workspace | Msgs | Key Content | Alerts |
|-----------|-----:|-------------|--------|
| Baamboozle | 16 | #gamedev: martin.biruk told Aysar "good to deploy"; #testing: image search bug, Stripe discount fix | None |
| RDC - FM Monitoring | 61 | #user-access-logs routine; 4x tuner instability; dmetiner requested Turkish translations | None |
| Swift Studio | 5 | roryh + jeff discussing HTML tag handling in subscriptions | None |
| Xtreme Soft Solutions | 3 | Kai: "Done, you can test" (Apr 13); anomawasala: urgent RMS upload bug (Apr 10) | **⚠️ No Kai daily report** |
| SAM GUARD - Mobile | 29 | #mql-leads: 27 automated leads; Lena asked Tony re drag-and-drop upload | None |
| Global Grazing Services | 11 | Nick daily report (Apr 10): Prestashop 9 upgrade, Q&A module fix, duplicate records. Amy staging fix ready for Mon deploy | **⚠️ Storage 75%, CPU spike 93%, memory alarm** |
| Amazing Meds | 11 | Nick/John: NetValve WooCommerce plugin, homepage Elementor, care plan math fix | None |
| Generator | 19 | Elliott/Violet: urgent Trello card resolution, logo crop MR, prod deployment | None |
| LegalAtoms | 71 | Payment token debugging, user submission errors. Nick-specific: 0 mentions | None |
| MyPersonalFootballCoach | 4 | tien271/freelancer: GitHub repo collab invite | None |
| William Bills | 17 | Oliver/Lucas: MWMX tasks, subscription work, Jersey logins. Lucas: staging deploy today | None |
| Equanimity | ERROR | **Session token expired (invalid_auth). Auto-refresh failed — needs manual browser login** | **⚠️ Cannot monitor Marcel** |
| SoCal Auto Wraps | 0 | No activity | None |
| Aigile Dev | 0 | No activity | None |

**Alerts:**
1. Xtreme — No Kai daily report in window
2. GGS — Server: Prestashop storage 75%, CPU 93%, nightly memory alarm
3. Equanimity — xoxc token expired, cannot monitor Carrick/Marcel

---

## Discord (all) — 09:42 (+07:00)

| Server | Msgs | Key Content | Alerts |
|--------|-----:|-------------|--------|
| AirAgri (nusvinn) | 43 | Vinn: PR reviews (299,300,302), deployed device alarm to prod. Jeff: contractor app build, incident investigation. Both daily reports found (Apr 10). Mon: Vinn testing pre-prod→prod, Leon PR303 | None |
| Bizurk (nuscarrick) | 0 | No activity. Andrew Taraba DM quiet since Mar 5 | None |

Trello: James Diamond ✓, Andrew Taraba ✓

---

## Google Sheets (all) — 09:48 (+07:00)

| Developer | Mon | Tue | Wed | Thu | Fri 10 | Week Total | Status |
|-----------|----:|----:|----:|----:|-------:|-----------:|--------|
| LongVV (Maddy) | 8.0 | 0.0 | 0.0 | 8.0 | 0.0 | 16.0h | OK (meets 16h/wk min) |
| PhucVT | 8.0 | 8.0 | 8.0 | 8.0 | 8.0 | 40.0h | OK |
| TuanNT (John Yi) | 4.0 | 3.8 | 1.2 | 0.0 | 4.0 | 13.0h | — |
| TuanNT (Rebecca) | 4.0 | 4.2 | 6.2 | 8.0 | 4.0 | 26.3h | — |
| **TuanNT combined** | 8.0 | 8.0 | 7.3 | 8.0 | 8.0 | **39.3h** | **OK** |
| VietPH | 8.0 | 8.0 | 8.0 | 8.0 | 8.0 | 40.0h | OK |
| KhanhHH | 8.0 | 8.0 | 8.0 | 8.0 | 8.0 | 40.0h | OK |
| LeNH (Rory) | 8.0 | 4.5 | 0.0 | 0.0 | 0.0 | 12.5h | — |
| LeNH (Franc) | 0.0 | 3.5 | 1.2 | 1.5 | 1.7 | 7.8h | — |
| LeNH (Aysar) | 0.0 | 0.0 | 6.8 | 6.5 | 6.3 | 19.7h | — |
| **LeNH combined** | 8.0 | 8.0 | 8.0 | 8.0 | 8.0 | **40.0h** | **OK** |

TuanNT Rebecca col P: 7 "Chưa" rows (normal, not alert).
No leave notes. No 0h alerts. All developers meet requirements.

---

## Scrin.io — 09:42 (+07:00)

| Date | Scrin Hours | Notes |
|------|----------:|-------|
| Apr 10 (Thu) | 4h 0m | "handle homepage Elementor AM" |
| Apr 11 (Fri) | 0h 0m | No activity |
| Apr 13 (Mon) | 1h 6m | In progress |
| **Week total** | **~10h 8m** | Apr 7-13 |

TuanNT John Yi task log (Apr 10): 0h vs Scrin 4h — task log has 0h Thursday but 4h Friday. Scrin tracks actual screen time; timing difference is acceptable.

---

## Fountain — 09:44 (+07:00)

### Part 1 — Matrix Plan
**NOT FOUND.** No W22 weekly plan posted yet. Last messages are dev discussions from Apr 10 (VuTQ, ViTHT, PhatDLT). Monday morning — may come later today.
Matrix token refreshed successfully.

### Part 2 — Task Log Actuals (W21: Apr 6-12)

| Dev | W21 Hours |
|-----|----------:|
| VuTQ | 36.0h |
| ThinhT | 20.0h |
| ViTHT | 22.0h |
| PhatDLT (QC) | 12.5h |
| HungPN (QC) | 8.0h |
| HaVS | 0.0h |
| TrinhMTT (QC) | 0.0h |
| **Total** | **98.5h** |

W22 (current): 0h — Monday morning, expected.

### Part 3 — Plan vs Actual
Cannot compare — no weekly plan message found for W21/W22.
W20 had 112h → W21 dropped to 98.5h (-12%).

### Part 4 — Capacity & Runway
**Total remaining (Not Started + In-progress): 212.75h**
**Runway at 90h/week: ~2.4 weeks**

Top items: #2775 (55h), #2587 giftdrop redemption (36.5h), #1178 reviews (40h), #2524 duplicate charge (24h)

### Part 5 — Over-Estimate Tracking

| Task | Est | Actual | Ratio | Status |
|------|----:|-------:|------:|--------|
| **#2595** giftdrop redemption | 120h | 168.25h | **140%** | Staging (stabilized) |
| **#2615** | 12h | 102.25h | **852%** | Staging |
| **#2735** | 90h | 98.75h | **110%** | In-progress (watch) |

Other notable: #2639 (825%), #2523 (381%), #2501 (638%), #2627 (1650%).

### Fountain Trello Board
- **Doing:** 5 cards | **Bugs:** 7 | **Todo:** 41 | **QC Internal:** 3 | **In QA:** 1
- **Stuck (>5 days):** "States need to be updated + scrolling" (Apr 3) — https://trello.com/c/clSdoRlL | QC Internal: delivery dates (Jan 30!) | QA Backlog: Gift of Choice (Apr 3) | In QA: GiftDrop redemption (Apr 6)
- **Customer comments (last 7 days):**
  - kunalsheth (Apr 13): delete dead pages, SEO noindex, FAQ schema, build-a-box, catalog sync, beta indexing, nav refactor approval
  - mike62798179 (Apr 10): GiftDrop links not sending for orders #2757765FH & #2214370IP
  - tmmckay (Apr 9): Smart Link UX, Infinity homepage copy, Gift of Choice wrong item

---

## Elena — 09:44 (+07:00)

- **Elena PRs (duongdn):** No open PRs. Nothing to merge/deploy.
- **Precognize PRs (nusken):** No open PRs from nusken.
- **WordPress SamGuard:** Site UP (200). CSP header present. No JS/CSP errors detected. Rollbar active.

---

## Upwork — 09:50 (+07:00)

Current week (Apr 13-19, just started):

| Workroom | This Week | Last Week | Since Start |
|----------|----------:|----------:|------------:|
| Rory (LeNH) | 0:00 | 12:30 | 478:10 |
| Neural Contract | 0:00 | 0:00 | 94:20 |
| Aysar (LeNH) | 0:30 | 19:40 | — |
| Bailey-VietPH | 0:00 | 34:20 | 519:00 |
| Bailey-DuongDN | 0:00 | 0:00 | 42:40 |

Neural Contract: 0h last week, 0h this week. External messages only — no task log comparison needed.

---

## Trello — 09:52 (+07:00)

### Check Mail
All 6 items ✓ complete (DuongDn, Carrick, Nick, Rick, Kai, Ken)

### Check Progress

| Item | Status | Reason |
|------|--------|--------|
| Blake | ✓ | SoCal quiet, normal |
| John Yi - Amazing Meds | ✓ | Active, TuanNT combined OK |
| James Diamond - Vinn | ✓ | AirAgri active, daily reports found |
| Franc | ✓ | RDC active, LeNH combined OK |
| Rory | ✓ | Swift active, LeNH combined OK |
| Aysar | ✓ | Baamboozle active, LeNH combined OK |
| Elliott | ✓ | Generator active, KhanhHH OK |
| Rory (Swift Studio) | ✓ | Swift active |
| Raymond - LegalAtoms | ✓ | No Nick-specific issues |
| Colin | ✓ | Aigile quiet, normal |
| Andrew Taraba | ✓ | Bizurk quiet, normal |
| Elena - SamGuard | ✓ | No open PRs, site healthy |
| MPFC | ✓ | Active, no issues |
| Bailey | ✓ | Nick daily report found, VietPH OK (note: storage 75%) |
| Maddy - Carrick/Kai/Luis | ⚠️ SKIP | No Kai daily report in Xtreme |
| Marcel | ⚠️ SKIP | Equanimity token expired, cannot verify |
| Fountain | ⚠️ SKIP | No weekly plan posted (Part 1), production errors |
| Rebecca (William Bills) | ⚠️ SKIP | TuanNT col P has "Chưa" |
| Neural Contract | ✓ | Upwork: 0h (external, messages only) |

---

## Reminders — 09:52 (+07:00)

No reminders needed. All developers met their weekly/daily requirements. Today is Monday — new week starting.

---

## Summary of Alerts

| Priority | Source | Issue |
|----------|--------|-------|
| **HIGH** | Email (rick@) | FountainGifts production error #260 (NoMethodError) — NEW |
| **HIGH** | Email (rick@) | FirstProject production TypeErrors #975/#976 (10th occurrence) |
| **MEDIUM** | Slack (Xtreme) | No Kai daily report found in monitoring window |
| **MEDIUM** | Slack (Equanimity) | Session token expired — cannot monitor Marcel. Needs manual browser login |
| **MEDIUM** | Slack (GGS) | Server: Prestashop storage 75%, CPU spike 93%, nightly memory alarm |
| **INFO** | Fountain | No W22 weekly plan posted yet (Monday morning) |
| **INFO** | Fountain | W21 total 98.5h, down 12% from W20 (112h) |
| **INFO** | Fountain | #2735 at 110% est — approaching 120% threshold |
| **INFO** | Fountain Trello | 4 stuck cards including "States need to be updated" (10 days) |
| **INFO** | Fountain Trello | Customer issue: GiftDrop links not sending (mike62798179) |
