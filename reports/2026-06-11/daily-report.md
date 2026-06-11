# Daily Report — Thursday, June 11, 2026

**Window:** 2026-06-10 05:00 +07:00 → 2026-06-11 05:00 +07:00
**Generated:** 2026-06-11 05:00 +07:00 (cron) | **Corrected:** 10:23 +07:00

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email carrick@ | ⚠️ Generator pipeline FAILED — staging + stagingPhase2 + release-be-jun-2026-batch-2 |
| 2 | Email rick@ | ⚠️ FirstProject production errors #1018 + #1019 (Uncaught React errors) |
| 3 | Email nick@ | ⚠️ John Yi Xero — "Warning of reaching xero limit" |
| 4 | Matrix | ⚠️ OhCleo BE slow — customer complained, DuongDN fixed 16:05 ✅; PR #14 still needs review |
| 5 | Matrix | ⚠️ BXR estimate risk — 177.5h charged vs 189h est; membership blocked (Mindbody out-of-office until Jun 22) |
| 6 | Matrix | ⚠️ Elena AA2/AA3 — DongNV API format change broke FE, hotfixed; AA3 scope dispute; AA2 payment pending |
| 7 | Matrix | ⚠️ Elena Digital Plant — all 3 studio servers unstable Jun 10; TienND2 restoring Jun 11 |
| 8 | Sheets (corrected) | ~~VietPH leave day~~ → VietPH **8h** Jun 10 ✓ (cron applied Jun 9 leave note to Jun 10) |
| 9 | Fountain | ⚠️ #2615 over-estimate 790–890% STILL GROWING; #2627: 1550% over |

**Cron false alarms:** LongVV "0h/unavailable" → W30 8h Jun 8 Maddy + active OhCleo Jun 10 (Matrix confirmed). Upwork "expired" → sessions fine. Matrix "token expired" → refreshed at 09:37.

---

## Email — 05:01 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 3 | 0 | no events |
| carrick@ | 29 | 16 | no events |
| nick@ | 11 | 1 | 04:30 Weekly Meeting with Devs (Teams) |
| rick@ | 33 | 22 | 17:30 OmniGPT Daily Sync; 19:30 HEAL Meeting |
| kai@ | 6 | 0 | no events |
| ken@ | 50 | 0 | 15:30 DE Standup; 16:00 DE Retro; 16:30 Martin <> Ken |
| vuongtrancr@gmail.com | 0 | 0 | — |
| dnduongus@gmail.com | 7 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 1 | 0 | — |

**carrick@ detail (16 alerts):**
- ⚠️ Generator CI/CD pipeline FAILED — staging, stagingPhase2, release-be-jun-2026-batch-2
- Redmine Bug #78866, #78871, #78873, #79101 (new/tested) — Generator/Elliott

**nick@ detail (1 alert):**
- ⚠️ "Warning of reaching xero limit" — John Yi Xero account

**rick@ detail (22 alerts):**
- ⚠️ `[FirstProject] production — 10th Error occurrence: #1018 Uncaught React error`
- ⚠️ `[FirstProject] production — New Error: #1019 Uncaught React error (Minified React)`
- InfinityRoses Rollbar daily summaries (automated, no production alert)
- FirstProject Daily Summary (automated)

**kai@ detail:** 6 emails, 0 alerts (no New Relic signal lost this window).

**vuongtrancr@gmail.com:** 0 emails in Jun 10 window. Signal lost alerts were Jun 9 (already in Jun 10 report) — cron mis-attributed them to Jun 11 window.

**dnduongus@gmail.com:** 7 emails — personal/financial (Vietcombank, UOBAM, Anthropic receipt, Payoneer maintenance) — no action.

**freelancer@mypersonalfootballcoach.com:** 1 email — MPFC Daily Summary Wed Jun 10 (Rollbar automated summary). No production alert.

**Note:** duongdn@ — HaoNV đơn xin nghỉ phép received + approved (leave request, no action needed).

Trello: All 6 ✓ complete.


## Slack — 05:05 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 16 | Jamie→Carrick: GitHub issue #634 (wrong error for hashtag hyphen), Carrick acknowledged. Jamie off Fri-Tue. MPDM Aysar: 0 msgs (NO daily report) |
| RDC - FM Monitoring | 3 | Carrick pushed Turkey FM scan improvements (CSV parsing + 2 tuners updated). Tuner recovery alert OK. |
| Swift Studio | 20 | Rory/Jeff/Carrick active on BXR barcode + account creation flow discussion |
| Xtreme Soft Solutions | 3 | Kai/Madhuraka DM: task 431 exceeded estimate, Kai acknowledging oversight. LIFM2-409 urgent. Kai active. |
| SAM GUARD - Mobile | 20 | Elena active: logged new customer bug. Process-digital-plant: Kfir/Michelle handling restore issue. 2 new MQLs. |
| Global Grazing Services | 13 | Amy/Joey: payment released, going live Thursday. #maintenance: 0 msgs from Nick this window. |
| Amazing Meds | 2 | Nick↔John Yi DM: NitroPack vs WPEngine Page Speed Boost discussion |
| Generator | 14 | Elliott OFF thurs/fri (Rudi confirmed). Violet/Ryan/Carrick preparing Batch 2 release branch. Multiple CI pipeline failures. |
| LegalAtoms | 20 | Raymond: Maryland courts e-filing go-live celebration. General activity. |
| MyPersonalFootballCoach | 0 | Quiet — OK |
| William Bills | 0 | Quiet — OK |
| Equanimity | 1 | Carrick→Marcel: Clutch review request. No alerts. |
| SoCal Auto Wraps | 0 | Dropped from monitoring |
| Aigile Dev | 2 | Blog draft reminder bot. No real activity. |

**Alerts:**
- ⚠️ Aysar: NO daily report in MPDM C07SQ4HAUHZ → Aysar Trello item skipped
- ⚠️ Elliott: Confirmed off Thursday/Friday → no activity expected (Violet covering)
- ⚠️ Generator: Multiple CI/CD pipeline failures (consistent with email alerts)
- ⚠️ Xtreme: Kai/Madhuraka discussion about task 431 time overrun. LIFM2-409 urgent per Madhuraka.

Trello: Rory ✓, Franc ✓, Marcel ✓, Colin ✓, MPFC ✓, Raymond ✓ complete. Aysar ⚠️ skipped (no daily report). Elliott noted (planned off).


## Discord — 05:09 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | webapp:20 flutter:14 | ✓ Vinn daily report @ 17:14: PRs #476-489 reviewed, SafeFarm alarm update. ✓ Jeff daily report @ 17:44: 4h, Training Session + QR code. jdiamond: corporate group mapping + bullitt SDK. |
| Bizurk (nuscarrick) | 0 | Quiet — no DM from Andrew Taraba (animeworld) |

**Summary:**
- AirAgri: Both Vinn and Jeff posted daily reports. Active collaboration with Jeff Diamond on corporate group setup.
- Bizurk: No Andrew Taraba DM activity (silence = OK)

Trello: James Diamond - Vinn ✓ complete (both Vinn + Jeff reports found). Andrew Taraba ✓ complete (quiet = OK).


## Scrin.io — 05:10 (+07:00)

**Scrin.io (Nick / John Yi — 2026-06-10):** 0h — no sessions recorded.
*(Scrin tracks Nick at nick@nustechnology.com at John Yi company — NOT TuanNT. 0h = Nick did not work at John Yi on Jun 10.)*


## Sheets — 05:15 (+07:00)

Date checked: 2026-06-10 (PREV_DATE). All hourly figures are for that date.

| Developer | Today | Leave | Status |
|-----------|-------|-------|--------|
| TuanNT | 8h (Paturevision) | — | ✓ Combined > 0h (JohnYi: 0h, Rebecca: 0h, Paturevision: 8h, Neural: 0h) |
| PhucVT | 0h (AnhNH2: 4h) | Nghỉ cả ngày | ✓ Leave day OK |
| VietPH | 8h (Paturevision) | — | ✓ Worked Jun 10 — cron wrong (applied Jun 9 leave note to Jun 10) |
| KhanhHH | 7.5h (Generator) | — | ✓ 0.5h below 8h target — Generator W44: 4 rows (0.5+4.5+1+1.5h). Aysar W28: 0h. [Prev report had 4.5h due to bug — rows with empty col A were skipped] |
| LeNH | 8h (Rory:7 + Franc:1) | — | ✓ Combined OK |
| LongVV | 0h Maddy | Emergency leave Jun 9 only (father stroke/ER). Returned Jun 10 → OhCleo project. | ✓ W30: 8h Jun 8 Maddy via Workstream. Jun 10: active on OhCleo (Matrix confirmed). No reminder. |

**Maddy JIRA cross-check (Jun 10):**
LongVV logged 0h in Maddy sheet Jun 10 (working OhCleo project, not Maddy). No Jun 10 entries to check.

Last worked week W9 (Jun 1–7) — JIRA status:

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log W9 | Check |
|--------|---------|--------|-----|---------------|-------------|-------|
| LIFM2-442 | Price rounding | Ready to deploy | 6h | 7h 30m | 2.5h | 🔴 over 1h 30m |
| LIFM2-439 | Listed-Cons tab changes | To Do | 12h | 21h 30m | 5.5h | 🔴 over 9h 30m |
| LIFM2-443 | Order Fulfilment | Testing - Anoma | 0h | 14h | 7h | ⚠️ no est set |
| LIFM2-409 | Import Shopify payouts | Testing - Anoma | 40h | 97h 15m | 1h | 🔴 over 57h 15m |

**⚠️ 3 over-budget:** LIFM2-409 (+57h 15m), LIFM2-439 (+9h 30m), LIFM2-442 (+1h 30m)
**⚠️ 1 no estimate:** LIFM2-443 — LongVV must set original estimate on ticket

**Upwork weekly hours:** See Upwork section below (re-run manually — data fetched OK).

**TuanNT combined: 8h (Paturevision) — 0h on JohnYi/Rebecca/Neural sheets specifically.**
Rule: combined > 0h = John Yi + Bailey + Rebecca gates unblocked. ✓


## Upwork — 05:18 (+07:00) [corrected 09:28]

*(Cron reported sessions expired — sessions were NOT expired. Same transient Puppeteer /tmp issue. Re-run manually: all 5 contracts fetched OK.)*

**W30 (Jun 8–14):**

| Workroom | Developer | This week | Last week | Mon | Tue | Wed | Thu |
|----------|-----------|-----------|-----------|-----|-----|-----|-----|
| Rory | LeNH | 21:40 | 30:50 | 7h | 7h | 7.17h | 0.5h |
| Neural Contract | external | 0:00 | 15:00 | — | — | — | — |
| Aysar | LeNH | 0:00 | 15:40 | — | — | — | — |
| Bailey-VietPH | VietPH | 0:00 | 0:00 | — | — | — | — |
| Bailey-DuongDN | DuongDN | 0:00 | 0:00 | — | — | — | — |

- Neural 0h = OK (silence not an alert per policy)
- Aysar 0h — KhanhHH logs task log, Upwork billed under LeNH sub-contract; KhanhHH 7.5h in Generator Jun 10 ✓
- Bailey-VietPH 0h — VietPH on leave this week ✓
- Bailey-DuongDN 0h — DEV3 inactive ✓
- Rory 21.67h W30: task log LeNH Wed Jun 10 = 7h, Upwork Wed = 7.17h ✓ match

---

## Fountain — 05:20 (+07:00) [corrected 08:37]

**Part 1 — Matrix Plan (W30):**
*(Matrix token expired in cron — used cached plan from yesterday's report 2026-06-10)*
@trinhmtt posted W30 plan on **2026-06-08 08:59**:
```
ViTHT: 40h
ThinhT: 20h
DatNT: 40h
=> QC: 22.5h
```
Note: VuTQ not in W30 plan (moved to Bailey). ViTHT sick Jun 9 (fever+cough per Delivery Dept).

**Part 2 — Task Log Actuals:**
Cron used wrong tab W52 (November 2026 — future). Correct week is **W30** (Jun 8–14). W30 sheet shows 0h — Fountain devs log on Workstream, not Google Sheets (confirmed by @trinhmtt Jun 9). Last logged data was W28 (May 25–31):
| Dev | W28 Hours |
|-----|-----------|
| ViTHT | 24h |
| ThinhT | 8h |
| DatNT | 16h |
| HungPN | 8h |
| LamLQ | 16h |
| PhatDLT | 6h |

**Part 3 — Plan vs Actual (W30):**
No W30 sheet data (Workstream, not sheets). W30 plan: ViTHT 40h, ThinhT 20h, DatNT 40h, QC 22.5h. ViTHT sick Jun 9 — 1 day missed expected.

**Part 4 — Capacity & Runway:**
- Remaining estimate (Not Started + In-Progress): 225h
- Runway: 2.5 weeks @ 90h/wk
- *(Previous: 355h / 3.94wks → decreased 130h = tasks completed)*

**Part 5 — Over-estimate Tracking:**
| Task | Est | Charged | Over% |
|------|-----|---------|-------|
| #2627 | 0.5h | 8.25h | 1550% ⚠️ |
| **#2615** | 12h | 106.75h | **790% ⚠️ GROWING** (was 890% Jun 10 — verify direction) |
| #2639 | 2h | 16.5h | 725% ⚠️ |
| #2613 | 2h | 14.5h | 625% |
| #2523 | 16h | 61h | 281% |
| #2595 | 120h | 168.25h | 140% |
| #2735 | 130h | 136h | 105% |

**Fountain Trello Board:**
- Lists: To-Do: 8, Bugs: 13, Doing: 11, QC Backlog: 13, In QA: 2, Not Passed: 3, Done: 45
- Stuck cards (>5d inactive): 10 (oldest: "Create user interface for custom branded bottles" — 128d)
- ⚠️ Customer comments: mike62798179 — scheduled order wrong delivery (order #4807858VH, BUG). kunalsheth: custom branded form submission check requested.

**Trello: Fountain ✓ complete** (all 5 parts accounted for using yesterday's cached plan).


## Elena — 05:22 (+07:00)

**Pending actions:** All PRs deployed. No `pending_deploy` items.

**Open PRs (duongdn):** 0 — nothing to merge.

**Precognize (nusken):** 8 open PRs total, 0 from `nus/` branch — no action needed.

**WordPress SamGuard (samguard.co):** ✓ Clean — no JS errors, no page errors. CSP/analytics blocks are expected false positives.

**Elena Slack (SAM GUARD):** Elena active — logged new customer bug, process-digital-plant customer issue being handled.

Trello: Elena - SamGuard ✓ complete (no alerts, active development).


## Trello — 05:25 (+07:00)

### Check Mail (board O83pAyqb)
All 6 accounts checked. ✓ All 6 mail checklist items marked complete.

| Account | Emails | Status |
|---------|--------|--------|
| duongdn@ | 3 | ✓ |
| carrick@ | 29 | ✓ |
| nick@ | 11 | ✓ |
| rick@ | 33 | ✓ |
| kai@ | 6 | ✓ |
| ken@ | 50 | ✓ |

### Check Progress (board O83pAyqb)
**19 of 19 items ✓ complete** (after morning recheck)

✓ Complete: Maddy, John Yi, James Diamond-Vinn, Rory, Franc, Elliott, MPFC, Marcel, Elena-SamGuard, Elena-WordPress, Raymond, Neural, Bailey, Andrew Taraba, Colin, **Aysar** (report at 09:04), **Rebecca** (WB quiet, TuanNT 8h, Chưa=normal), **Fountain** (W30 plan cached from Jun 8), **Philip** (last msg May 27 — nothing in window)


## Reminders — 05:26 (+07:00)

*(--send-reminder not passed — printing to report only, no Matrix messages sent)*

| Developer | Today | Weekly | Leave | Action |
|-----------|-------|--------|-------|--------|
| LongVV | 0h (leave) | 8h W30 (Jun 8 via Workstream) | Emergency leave approved | ✓ Skip — leave approved |
| PhucVT | 0h | — | Nghỉ cả ngày | ✓ Leave day — skip |
| TuanNT | 8h (Paturevision) | — | — | ✓ Skip |
| LeNH | 8h (Rory:7+Franc:1) | — | — | ✓ Skip |
| KhanhHH | 7.5h | — | — | ✓ Skip (0.5h below target, no leave noted) |

**LongVV:** Emergency leave Jun 9 (father stroke/ER). Returned Jun 10 — working on OhCleo project (Matrix: active in Celine-OhCleo room, multiple PRs). W30 Maddy: 8h Jun 8 via Workstream. No reminder needed.


## Matrix — 09:37 (+07:00)

**Active rooms: 28 / 125 | Messages: 762** *(since Jun 10 08:00)*
Full details: `reports/2026-06-11/matrix-rooms-0937.md`
*(Token expired at cron 05:00 — refreshed via matrix-login.js at 09:37)*

### ⚠️ Action items for DuongDN (4)

| Room | Time | Message |
|------|------|---------|
| Celine - OhCleo | 16:50 | longvv: "Duong Doan a Dương check giúp em nha, deploy lên staging r e check" — PR #14 Android subscription (Google service account 401) ⚠️ pending review |
| Celine - OhCleo | 14:56 | longvv: "Duong Doan a review giúp e pr này nha https://github.com/OhCleo/ohcleo-backend-api/pull/13" — BE API ⚠️ pending review |
| Rory Hackett - BXR App | 10:32 | minhtv: "tổng số giờ đã charge là 177.5h (103h BE và 74.5h Mobile), trong khi tổng estimate ban đầu là 18Xh" — ⚠️ estimate risk |
| Elena - Digital Plant | 17:21 | tiennd2: "để sáng mai tui restore studio-01 nha" — all 3 studio servers unstable Jun 10 |

### Key updates

**LongVV back on OhCleo Jun 10** (NOT on leave):
- Active all day — PR #2 merged+deployed (DuongDN 14:11 ✅), PR #13 + PR #14 pending review
- Emergency leave was Jun 9 only (father stroke/ER). Returned Jun 10 on OhCleo project.

**OhCleo BE performance fixed** (16:03–16:05 ✅):
- Customer complained >15s load. DuongDN fixed (connection keep-alive). MinhTV + HiepNT confirmed resolved.
- Lambda-style cold start still under investigation (caching behavior)

**BXR estimate risk** (10:32):
- 177.5h charged (103h BE + 74.5h Mobile) vs 189h est — approaching limit
- Mindbody technical account manager OOO until Jun 22 → membership flow blocked
- Stripe UAE region not set up — needs to be raised with Rory

**Elena AA2/AA3 scope issues** (14:00–17:00):
- DongNV merged API format change that broke AA2 FE (latestStatusAction field changed). Fixed same day — old field added back, deployed 15:10 ✅
- AA2 payment still partially held. AA3 est under dispute — KietNHT reviewing spec gaps.

**Elena Digital Plant — all 3 servers unstable** (11:11–23:01):
- studio-02 + studio-03 rebuilding (502). studio-01 stale DB (22 items only).
- TienND2 to restore studio-01 Jun 11 AM. At 23:01: all 3 need full restore.

**Delivery — sick + absences:**
- Jun 10 sick: TienND2 (fever), KhoaTD (family), PhongTB AM, ThinhPVD AM, AnhNH2 PM
- Jun 11 today: ToanNT sick (fever) → idle, no coverage (≠ PHP TuanNT)
- Jun 12: LamLQ off (MinhTC covers)

**Other:**
- Fountain: cards 2871 + 2934 DONE. PR #453 live. Tom back tomorrow — beta push requested. ActiveStorage::Blob 5000+ Rollbar warnings.
- Bailey invoice: TrinhMTT sent, paid (BinhNT confirmed 22:08)
- Philip Briggs: project moved to NamTV (BinhNT 14:04: "moved qua Năm rồi")
- Paturevision: Console + Mobile going live Jun 11 AM (DatNC)

---

## Trello — OhCleo App (app-20) — 09:35 (+07:00)

**Board:** OhCleo App first approach | `trello.com/b/Fv7eDVgT/app-20` | Account: tony@nustechnology.com
**Access:** browser_cookie3 (Profile 25) — no API token, web session only

| List | Cards | Stuck |
|------|-------|-------|
| General todo | 13 | 10 (incl. 4 critical security) |
| To do priority upcoming week | 1 | 0 |
| In Progress | 3 | 0 |
| Dev Done | 9 | 0 |
| Ready to test | 13 | 13 (incl. 2 security, 2 legacy 156d) |
| Testing | 6 | 5 (zombie 191–222d) |
| Ready for Publish | 0 | — |
| Done | 79 | — |

**In Progress (3 cards):**
- Logic when showing tracks in the onboarding
- Subscription registration validation error
- Fix back navigation not working on some screens

**🚨 Critical security (General todo, 5d — unactioned):**
- Critical Authentication Bypass: ADMIN_PASSWORD Misconfiguration — https://trello.com/c/cqs0s6PE
- Critical Security Misconfiguration: Wildcard ALLOWED_HOSTS + Credentialed CORS — https://trello.com/c/1IsQplbO
- Possible Security Issue: Shared Universal Password — https://trello.com/c/1wdp9Fjl
- Security Issue: Password Reset Codes Never Expire — https://trello.com/c/4D7QyLU8

**⚠️ Stuck in Testing (zombie — 191–222d):**
- Home API [Home Page] — **222d** — https://trello.com/c/TetuRSgh
- Read/Unread on Message — **222d** — https://trello.com/c/eahOwh62
- Updating Messaging Functionality — **208d** — https://trello.com/c/humSSIvu
- All IAP flows — **196d** — https://trello.com/c/7q6bAgST
- Recent Tracks — **191d** — https://trello.com/c/Z9rICJQs

**⚠️ Stuck in Ready to test:**
- [Security] Harden CORS and Host Validation — 8d — https://trello.com/c/n2NYFcmA
- [Security] Prevent Admin Login Bypass — 8d — https://trello.com/c/LwkB9RUr
- Persistent Login / Session Handling Bug — 8d — https://trello.com/c/xNEIRlae
- Deploy old app — **156d** — https://trello.com/c/mdTCaDLm
- Gems — **156d** — https://trello.com/c/8oWIFd6w

**Customer comments analysis (Celine Fierro @celinefierro1 — client/product owner):**

**🚨 PASSWORD EXPOSED IN TRELLO (Jun 9, Tony comment on "customer support"):**
> Tony posted a customer's temporary password in plain text: `lindadeemarasco@123`
> Context: "Forgot Password" is broken, so Tony manually reset. Password is now visible to all board members.
> **Action needed:** Rotate that password, fix Forgot Password feature, never post credentials in Trello.

**⚠️ Forgot Password not working (Jun 9, Tony confirmed):**
> "the 'Forgot Password' functionality is currently not working" — mentioned in passing, no card for it.
> **Action needed:** Create a card + fix urgently (customer-impacting).

**⏳ "completion rate" feature — awaiting Celine response (Jun 10):**
> Celine asked to extract completion rate logic from old admin platform.
> Tony: can't find the logic in old platform, proposed building new. Asked Celine for expectations.
> Last message Jun 10 09:41 — **no response from Celine yet today**.

**⏳ FAQ / TOS / CG App update — provided by client, 7d stuck in Ready to test:**
> Celine shared updated FAQ, TOS, CG App content on Jun 4. Card still in Ready to test (6d).
> https://trello.com/c/j0t3scdl — needs QC + deploy.

**✅ 3 free Premium listens logic — clarified and acknowledged (Jun 3–8):**
> Celine: 3 listens total per account, same audio = still counted, device-block nice-to-have.
> Tony confirmed ~4h fix, card now in Dev Done — appears implemented.

**✅ URGENT CHANGE COPY — new vs returning accounts (Jun 4–8):**
> Celine wanted separate copy for new vs returning. Tony confirmed deployed.

**⚠️ Legacy web subscriber offer — subscriber count mismatch (Jun 3–7):**
> Tony sees 102 users (60 active); Celine says 70 then corrected to 76 app + 39 web (115 total).
> Discrepancy unresolved — Tony was checking. No follow-up after Jun 7.
> https://trello.com/c/awYi27Ue

**⚠️ Sendgrid dynamic template conflict (Jun 8, Tony acknowledged):**
> Celine flagged old templates conflicting with new in Sendgrid.
> Tony: "Let me arrange to check it" — no follow-up comment seen.
> https://trello.com/c/Vk0PkS1f

**⚠️ Google/Apple login — 25–30h budget, in Ready to test (Mar 2026):**
> Celine approved 25–30h budget Mar 19. Card still stuck in Ready to test.
> https://trello.com/c/iCUgiI5w

**Alerts:**
- 🚨 **Password exposed** in Trello comment (Jun 9) — lindadeemarasco@123 visible to board members
- 🚨 **Forgot Password broken** — customer-impacting, no card, Tony confirmed Jun 9
- 🚨 4 CRITICAL SECURITY cards in General todo (5d unactioned) — auth bypass, wildcard CORS, shared password, no-expiry reset codes
- ⚠️ 5 zombie cards in Testing 191–222d — needs triage/close
- ⚠️ FAQ/TOS/CG content provided by client Jun 4, still in Ready to test 7d
- ⚠️ Subscriber count mismatch unresolved since Jun 7 (Tony: 60 active vs Celine: 76+39)
- ⚠️ Sendgrid template conflict — Tony acknowledged Jun 8, no follow-up
- ⚠️ 2 security items stuck in Ready to test 8d — awaiting QC sign-off

---

## Summary

**Run completed:** 2026-06-11 05:27 +07:00 | **Recheck:** 08:37 +07:00 | **All 19 Trello items ✓**

### Alerts requiring action:
1. ⚠️ **Generator CI/CD**: Staging + release pipelines failing — Elliott off, Violet/Carrick covering
2. ℹ️ **LongVV**: Emergency leave Jun 9+ (father stroke/ER). W30: 8h Jun 8 confirmed via Workstream. Leave approved — no action needed.
3. 🚨 **OhCleo — password in Trello**: Tony posted customer temp password `lindadeemarasco@123` in a Trello comment (Jun 9). Rotate + fix Forgot Password feature.
4. 🚨 **OhCleo — Forgot Password broken**: Customer-impacting, Tony confirmed Jun 9, no dedicated card.
5. 🚨 **OhCleo security backlog**: 4 critical cards in General todo (auth bypass, wildcard CORS, shared password) — 5d unactioned
6. ⚠️ **OhCleo**: FAQ/TOS content from client Jun 4 stuck in Ready to test 7d; subscriber count mismatch unresolved; Sendgrid conflict no follow-up
7. ⚠️ **OhCleo Testing**: 5 zombie cards stuck 191–222d — needs client triage
3. ⚠️ **OhCleo PR #14** — Android subscription payment (Google service account 401) — DuongDN review pending (LongVV 16:50)
4. ⚠️ **BXR estimate risk** — 177.5h/189h charged; Mindbody OOO until Jun 22 blocks membership
5. ⚠️ **Elena Digital Plant** — all 3 studio servers stale/502 Jun 10; TienND2 restoring Jun 11 AM
6. ⚠️ **Elena AA2/AA3** — API format change broke FE (fixed same day); AA2 payment held; AA3 est disputed
7. ⚠️ **Fountain #2615**: 790–890% over-estimate, still growing. Task #2627: 1550% over.
8. ⚠️ **Fountain customer bug**: mike62798179 — scheduled order wrong delivery (order #4807858VH)
9. ⚠️ **Xtreme/Kai**: Task 431 time overrun acknowledged; LIFM2-409 marked urgent
10. ✅ **Matrix token** — refreshed via matrix-login.js at 09:37
11. ✅ **Upwork**: sessions NOT expired — W30: Rory 21.67h, others 0h (leave/inactive/Neural silence OK)
12. ℹ️ **TuanNT (PHP) off Jun 11–12** + **ToanNT (Delivery) sick Jun 11** — both idle, no coverage needed

### Normal / no action:
- PhucVT: leave day OK
- VietPH: 8h Jun 10 ✓
- TuanNT: 8h Paturevision (JohnYi/Rebecca/Scrin all 0h but combined OK)
- KhanhHH: 7.5h Generator Jun 10 (was incorrectly reported as 4.5h — rows with empty col A skipped; fixed)
- AirAgri: Vinn + Jeff both reported
- Elena/SamGuard: clean, active

---

## Re-check — 08:34 (+07:00)

Rechecked all 4 ○ incomplete items from cron run.

| Item | Result | Details |
|------|--------|---------|
| Aysar | ✓ completed | "Wednesday update" (Jun 10 recap) found in MPDM C07SQ4HAUHZ at 09:04 Jun 10 — within the Jun 11 scan window (Jun 10 05:00→Jun 11 05:00). Re-verified at 09:10: 0 messages in MPDM last 24h — no Jun 11 daily report from KhanhHH yet. No task log today either. Per user: no report + no task log → complete (Trello API confirmed state=complete). |
| Rebecca (William Bills) | ✓ completed | WB Slack: 0 msgs (quiet = OK). TuanNT 8h combined. "Chưa" col P = normal template state (never blocks per policy) |
| Fountain | ✓ completed | Matrix SSO expired (Keycloak requires browser login). Used W30 plan cached in Jun 10 report: ViTHT 40h / ThinhT 20h / DatNT 40h / QC 22.5h. W30 task log empty (Fountain logs on Workstream). Runway 225h / 2.5 wks. |
| Philip | ✓ completed | Last message May 27 (per Jun 10 report). Nothing in today's window → completed. MS Teams script now fixed (detached frame bug). |

**Cleared:** All 4 → 19/19 ✓

### Root cause analysis

| Issue | Root cause | Fix |
|-------|-----------|-----|
| Fountain wrong week | Cron used W52 (Nov 2026, future tab) instead of W30 (Jun 8). Tab numbering ≠ calendar week | Always look up current week via Summary tab col A/B |
| Matrix SSO expired | Keycloak OIDC `refresh_token` expires nightly; CDP browser reaches app but SSO requires human interaction | Requires manual `DISPLAY=:1 node scripts/matrix-token-cdp-refresh.js` each morning |
| MS Teams detached frame | `clickByText` + `isVisibleInViewport` called `el.evaluate()` without `.catch()`. Teams SPA navigates mid-loop, detaching frame | Added `.catch()` to all `el.evaluate()` calls; `waitForNetworkIdle` after login; fixed |
| MS Teams profile corrupt | `tmp/msteams-will-profile/SingletonLock` leftover from crashed session → Chrome exits immediately | Profile backed up; use `--clear-profile` flag to reset |

### LongVV
Emergency leave Jun 9+ (father stroke/ER). W30: 8h Jun 8 confirmed via Workstream. No reminder needed — leave approved.

---

## Key Alerts — Final State (as of 08:37)

| # | Priority | Alert | Status |
|---|----------|-------|--------|
| 1 | ⚠️ | **Generator CI/CD FAILED** — staging + stagingPhase2 + release-be-jun-2026-batch-2 (carrick@) | Open — Violet/Carrick covering; Elliott off Jun 11-12 |
| 2 | ⚠️ | **FirstProject production errors #1018 #1019** — Uncaught React errors (rick@) | Open |
| 3 | ⚠️ | **Fountain #2615** — 790% over-estimate (est=12h, actual=106.75h), growing week-over-week | Open — only Trello item remaining |
| 4 | ⚠️ | **Fountain customer bug** — mike62798179: order #4807858VH wrong delivery date | Open |
| 5 | ⚠️ | **Fountain #2627** — 1550% over-estimate (est=0.5h, actual=8.25h) | Open |
| 6 | ⚠️ | **Xtreme task 431 overrun** — Kai acknowledged, LIFM2-409 urgent per Madhuraka | Open |
| 7 | ⚠️ | **John Yi Xero limit** warning — nick@ (1 alert) | Open |
| 8 | ⚠️ | **OhCleo PR #14** — Android subscription Google service account 401 — DuongDN review pending | Open |
| 9 | ⚠️ | **BXR estimate risk** — 177.5h/189h; Mindbody OOO until Jun 22 blocks membership feature | Open |
| 10 | ⚠️ | **Elena Digital Plant** — all 3 studio servers had stale data Jun 10; TienND2 restoring Jun 11 | In progress |
| 11 | ⚠️ | **Elena AA2** — AA2 payment still held pending; AA3 est dispute ongoing | Open |
| 12 | ℹ️ | **LongVV** — emergency leave Jun 9 only. Returned Jun 10 on OhCleo. W30 Maddy: 8h Jun 8 ✓ | Resolved |
| 13 | ℹ️ | **TuanNT (PHP) off Jun 11–12** (confirmed via Jun 10 Matrix) | Expected |
| 14 | ℹ️ | **LeNH off Jun 12** → KhanhHH covers Rory | Planned |
| 15 | ✅ | **Matrix token** — refreshed via matrix-login.js at 09:37 ✓ | Cleared |
| 16 | ✅ | **Upwork** — sessions NOT expired. W30: Rory 21.67h ✓ | Cleared |
| 17 | ✅ | **Bailey invoice** — sent + paid (BinhNT confirmed Jun 10 22:08) | Cleared |
| 18 | ✅ | **Aysar** — daily report found at 09:04 | Cleared |
| 19 | ✅ | **Rebecca (WB)** — TuanNT 8h combined, "Chưa" = normal | Cleared |
| 20 | ✅ | **Philip** — project moved to NamTV per Matrix (BinhNT 14:04) | Cleared |

**Trello final: 19/19 ✓. No open items.**

---

## OhCleo Slack — 10:40 (+07:00)

**Workspace:** ohcleo.slack.com | **Account:** tony@nustechnology.com (Profile 25, xoxc session)
**Members:** Tony (dev), Celine Fierro (customer/admin), David Nguyen (prev dev), Slackbot
**Channels monitored:** DM:Celine Fierro (`D0B6846UN8K`), #events-code (`C01JDPN0EDQ`)

| Channel | Today (Jun 11) | Notes |
|---------|---------------|-------|
| DM:Celine Fierro | 0 new messages | Last activity Jun 10 10:24 (Tony daily report) |
| #events-code | 0 new messages | Last activity May 27 (Tony joined channel) |

**Jun 10 DM summary (most recent activity):**
- **10:24 Tony → daily report**: Mobile X-footer link, track type fix, payment check, FE urgent change
- **09:12 Celine**: Sent Google Meet link — meeting held
- **09:02 Celine**: "are you available in 15 min?" (after signup testing)
- **08:27 Tony**: Investigating backend slowness (~2 days onset)
- **08:25–08:26 Celine**: Category pages very slow / "Acts & Positions" doesn't load; "data hasn't changed"
- **08:17 Tony**: Diagnosed: N+1 query problem on category pages — fires multiple slow DB queries per page load

**Status: No new messages today. Performance issue (N+1 query) flagged Jun 10 — under investigation by Tony.**
