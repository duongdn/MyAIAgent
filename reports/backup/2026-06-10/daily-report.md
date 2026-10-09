# Daily Report — Wednesday, June 10, 2026

**Window:** 2026-06-09T09:46+07 → 2026-06-10T05:00+07  
**Generated:** 2026-06-10T05:00+07

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email carrick@ | ⚠️ Generator pipeline FAILED — staging + stagingPhase2 |
| 2 | Email rick@ | ⚠️ FirstProject production errors #1018 (10th) + #1019 (New) + **#1020, #1021, #1022 (3 new React errors 08:50+07)** |
| 3 | Email kai@ | ⚠️ MPFC New Relic — "Signal lost: Low Application Throughput" ×12 |
| 4 | Sheets | ⚠️ LeNH 0h on Jun 9 — all 3 sheets empty (Rory, Franc, Rebecca Q-T) |
| 5 | Fountain | ⚠️ #2615 over-estimate 890% (est=12h, actual=106.75h) STILL GROWING |
| 6 | Email vuongtrancr@ | ⚠️ MPFC Rollbar — [Delayed-newform] production 10 occurrences in 5 min (06:21+07) |
| 7 | Discord | ~~⚠️ Vinn (AirAgri) — no daily report~~ CLEARED — Vinn on leave Jun 9 |
| 8 | Matrix | ℹ️ LongVV left early Jun 9 (father emergency, cấp cứu) — requested leave Jun 10 |

**Cleared from cron:** TuanNT 0h → FALSE ALARM (had 8h in Paturevision Jun 9). Matrix token refreshed.

---

## Email re-check — 09:43 (+07:00) [since 05:00+07]

*Corrects cron errors: kai@ was overcounted (~12+ → 3 total in window), ken@ was not checked (NewsLetter folder). Calendar: all Zoho accounts show 0 events for Jun 10 — **note: Teams meetings are NOT in Zoho CalDAV** and will never appear here.*

| Account | New emails since 05:00 | Calendar Jun 10 |
|---------|------------------------|-----------------|
| duongdn@nustechnology.com | 0 | no events (Zoho only) |
| carrick@nustechnology.com | 1 | no events (Zoho only) |
| nick@nustechnology.com | 0 | no events (Zoho only) |
| rick@nustechnology.com | **3** ⚠️ | no events |
| kai@nustechnology.com | 0 | no events |
| ken@nustechnology.com | 56 (Precognize GitHub PRs) | no events |
| freelancer@mypersonalfootballcoach.com | — (no Gmail SA key) | — |

**carrick@ new:** SoCal Auto Wraps daily summary (08:07) — no alert.

**⚠️ rick@ new alerts (since 05:00):**
- `[FirstProject] production — New Error: #1020 Error: Minified React error #425` — 08:50+07
- `[FirstProject] production — New Error: #1021 Error: Minified React error #418` — 08:50+07
- `[FirstProject] production — New Error: #1022 Error: Minified React error #423` — 08:50+07

**ken@ Precognize PRs (56 since 05:00):** GitHub notifications from Welligence/QueryPlatform + welligence/web — none from nusken directly.

**Calendar note:** `fetch-zoho-calendar.js` reads Zoho CalDAV only. Microsoft Teams / Outlook calendar events (including "Weekly Meeting with Devs") do NOT sync to Zoho and will not appear here. A Teams calendar integration would be needed to see those events.

---

## Email all — 10:10 (+07:00)

**Window:** 2026-06-10T05:00+07 → now

| Account | Emails | Calendar Jun 10 |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 0 | no events |
| carrick@nustechnology.com | 0 | **Swift x NUS** 15:00–16:00+07 (rory@swiftstudio.co, Google Meet) |
| nick@nustechnology.com | 0 | Weekly Meeting with Devs 21:30 (Teams) |
| rick@nustechnology.com | **3** ⚠️ | HEAL Meeting 19:30+07 · OmniGPT Daily Sync 17:30+07 |
| kai@nustechnology.com | 0 | no events |
| ken@nustechnology.com | 62 | Martin <> Ken 16:30+07 · DE Standup 15:30+07 · DE Retro 16:00+07 · DE Tech Talks 16:00+07 |
| vuongtrancr@gmail.com | **4** ⚠️ | — (Gmail, no CalDAV) |
| dnduongus@gmail.com | 2 | — (Gmail, no CalDAV) |
| freelancer@mypersonalfootballcoach.com | 0 | — (Gmail, no CalDAV) |

---

### ⚠️ rick@ (3 production errors since 05:00)
| Time | Subject |
|------|---------|
| 08:50+07 | `[FirstProject] production — New Error: #1020 Error: Minified React error #425` |
| 08:50+07 | `[FirstProject] production — New Error: #1021 Error: Minified React error #418` |
| 08:50+07 | `[FirstProject] production — New Error: #1022 Error: Minified React error #423` |

---

### ⚠️ vuongtrancr@gmail.com (4 emails since 05:00)
| Time | From | Subject |
|------|------|---------|
| 06:21+07 | Rollbar Notification <notifier@mail.rollbar.com> | ⚠️ **[Delayed-newform] production - 10 occurrences in 5 minutes: #277 ActionControl** |
| 08:06+07 | Rollbar Notification <notifier@mail.rollbar.com> | Delayed-newform - Daily Summary - Wednesday, June 10 |
| 08:34+07 | Đoàn trên Facebook <close_friend_updates@facebookmail.com> | 💬 Đoàn Nguyên Dương đã bình luận... (personal, no action) |
| 10:07+07 | Swish's Cybersecurity team <hey@go.tryriot.com> | Cybersecurity doesn't wait ⏰ (marketing, no action) |

---

### dnduongus@gmail.com (2 emails since 05:00)
| Time | From | Subject |
|------|------|---------|
| 08:47+07 | Instagram <follow-suggestions@mail.instagram.com> | Social suggestion (no action) |
| 08:50+07 | UOBAM Vietnam - IR <vn-uobam-ir@uobgroup.com> | Cập nhật hoạt động quỹ / Weekly update 01/06–05/06/2026 (no action) |

---

### freelancer@mypersonalfootballcoach.com
**0 emails** since 05:00+07. Gmail API working (SA key: mpfc-977@mpfc-458507.iam.gserviceaccount.com).

---

## Reminders lenh — 09:43 (+07:00) [--send-reminder]

| Dev | 0h date | Room | Status |
|-----|---------|------|--------|
| LeNH | Jun 9 | `!OIrgPraJWrcDTnRVLQ:nustechnology.com` | ✅ **Sent** (event_id: $y37DD1QGFjgwqkpJCpmpH60sGHYjWv3IaGRKR6yOj4s) |

Message sent: *"Hi LeNH, task log for June 9 is missing (0h logged). Please update when you can. Thanks!"*

Trello: **Rory ✓ complete**, **Franc ✓ complete** (reminder IS the action per rule).

---

## Matrix rooms — 09:02 (+07:00)

**Active rooms: 29 / 125 | Messages: 631**
Full details: `reports/2026-06-10/matrix-rooms-0902.md`

### ⚠️ Action items for DuongDN (5)

| Room | Time | Message |
|------|------|---------|
| Celine - OhCleo | 16:42 | longvv: "nhờ a Duong Doan check giúp em với, em xin về sớm gấp, đưa ba em đi cấp cứu" → DuongDN fixed prod API bug, deployed 17:25 ✅ |
| Celine - OhCleo | 13:55 | longvv: "nhờ a Duong Doan review giúp e PR này https://github.com/OhCleo/ohcleo-backend-api/pull/11" → deployed 14:44 ✅ |
| Rory Hackett - BXR App | 08:55 | minhtv: "a Dương, ổng hẹn giờ họp trên Calendar hôm nay nhé" → meeting 15:00+07 today with Tin Pham (client) |
| binhnt DM | 15:36 | binhnt sent DS dự án technical article project list → DuongDN needs to confirm which projects qualify |
| Delivery - Resource Arr. | 09:18 | namtv: LeNH off Jun 12 → KhanhHH bù Rory (TuanNT also off Jun 11-12) — confirmed |

### Key updates

**🚨 LongVV emergency leave Jun 10** (16:34 Jun 9):
- Father has stroke symptoms (triệu chứng đột quỵ), LongVV going to hospital
- OhCleo free-listens FE implementation done (PR posted at 21:42) — needs review today
- Coverage: minhtv aware, LongVV said "mai làm bên Minh" tentatively

**OhCleo prod API fixed** (17:07–17:26 Jun 9):
- `/api/medias/suggest-medias/` broken in production (missing auth token in code)
- DuongDN: fixed data bug + code bug (2 separate issues), deployed 17:25
- Confirmed working by minhtv + HiepNT

**Elena AA3 scope dispute** (13:00–18:00 Jun 9):
- Lena questioned BE effort: API exists + unit tests exist → why charge more?
- Team: effort = verify APIs against new UI + update/fix bugs found
- AA2 restore complete (ES reindexed, data restored). Still open bugs: socket reminder timezone wrong, sub-investigation STT not updating
- LA sent explanation to Lena evening Jun 9

**Delivery changes Jun 9:**
- ThoTNT sick → TamVT covers Zeke
- ViTHT sick → Fountain no backup
- ThanhVM sick PM → PL
- LeNH vacation Jun 12 → KhanhHH bù Rory (TuanNT also off Jun 11-12)
- KhanhHH vacation Jun 25-26 (pending approval)

**Other:**
- Bailey paid $727.50 (trinhmtt confirmed 08:35)
- Cameron Batty returning next week (Thu-Fri Jun 18-19)
- BDD: Elena new scope est revised to 126.6h (FE 71.4 + BE 55.2)
- Case study collection requested across 6 projects (LongVV submitted 2 for Maddy, KhanhHH submitted 2 for Aysar)

---

## Re-check — 09:36 (+07:00)

### Philip — CLEARED
MS Teams (`will` account) checked for Philip Briggs (External — Six Star Rentals). Last message: **May 27** — no messages in monitoring window Jun 9 09:46 → Jun 10 05:00. No complaint or unresolved request. **Philip ✓ completed.**

### James Diamond — CLEARED (Vinn was off Jun 9)
~~AirAgri Discord re-scan: no Vinn report~~ — **CORRECTION:** Vinn was off (leave day) on Jun 9. No daily report expected. **James Diamond ✓ completed.**

### Rory / Franc — REAL ALERT, NO REMINDER SENT
LeNH 0h Jun 9 is confirmed real alert (no leave note for Jun 9, leave note is Jun 12). Reminder not sent (no `--send-reminder` flag). Rory and Franc remain ○. Run `/daily-report reminders lenh --send-reminder` to send reminder and clear these items.

### Fountain — REAL ALERT
#2615 over-estimate 890% (est=12h, actual=106.75h) is a real ongoing alert. Fountain remains ○.

| Item | Result | Details |
|------|--------|---------|
| Philip | ✓ completed | No messages in window — last msg May 27 |
| James Diamond | ✓ completed | Vinn on leave Jun 9 — no report expected |
| Rory | ○ unchanged | LeNH 0h real alert, reminder not sent |
| Franc | ○ unchanged | LeNH 0h real alert, reminder not sent |
| Fountain | ○ unchanged | #2615 890% over-estimate still growing |

**Cleared this run:** Philip, James Diamond
**Still open:** Rory, Franc, Fountain

---

## Re-check — 09:02 (+07:00)

*Manual re-check of undone items from cron run.*

### Corrections

**TuanNT:** Re-scan confirmed **8h on Jun 9** in Paturevision (patOwners: TuanNT=8h). Cron used wrong date tokens. Alert was false. This clears John Yi (already ✓), Rebecca (now ✓), Bailey (already ✓).

**LongVV:** Workstream shows 8h Jun 8 (Mon), 0h Jun 9 (Tue). Part-time 16h/wk → weekly total 8h, 4 days remaining → no alert. Matrix confirms: LongVV transferred to OhCleo project (Celine) — no longer on WyAsk. Leave Jun 10 (father stroke emergency).

**Matrix:** Token refreshed. 29/125 rooms active, 631 messages. Full details: `reports/2026-06-10/matrix-rooms-0902.md`

### Matrix Action Items (5)
- **[Celine - OhCleo]** 17:07 minhtv: "check kịp ko a Dương ơi?" → ✅ RESOLVED — DuongDN fixed API bug at 17:25, deployed
- **[Delivery Dept]** namtv: LongVV transferred to WyAsk eff Jun 8 (note: Matrix room shows OhCleo is primary)
- **[Delivery Dept]** namtv: ViTHT sick Jun 9 (cough+fever), LeNH vacation Jun 12 → KhanhHH to cover Rory
- **[Delivery Dept]** namtv: ThoTNT sick Jun 9 → TamVT covering on Zeke
- **[binhnt room]** binhnt sent technical article DS dự án (content task for DuongDN to confirm project list)

### Fountain — Part 1 (Matrix Plan) — FOUND
W30 plan posted by @trinhmtt on **2026-06-08 08:59**:
```
ViTHT: 40h
ThinhT: 20h
DatNT: 40h
=> QC: 22.5h
```
Note: VuTQ not in W30 plan. ViTHT sick Jun 9 (fever) — no Fountain replacement per namtv.

### Trello Corrections Made
| Item | Change | Reason |
|------|--------|--------|
| James Diamond - Vinn | ✓→○ INCOMPLETE | Vinn no daily report in window |
| Rebecca (William Bills) | ○→✓ COMPLETE | TuanNT 8h confirmed (false alarm cleared) |
| Neural Contract | ○→✓ COMPLETE | Silence = never alert per rule |

### Still Incomplete
| Item | Reason |
|------|--------|
| Rory ○ | LeNH 0h Jun 9 real alert |
| Franc ○ | LeNH 0h Jun 9 real alert |
| James Diamond ○ | Vinn no daily report |
| Fountain ○ | #2615 over-estimate 890% STILL GROWING |
| Philip ○ | MS Teams: search returned 1 result but content unreadable (UI error) |

---

## Email — 05:00 (+07:00)

| Account | Emails | Calendar Jun 10 |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 3 | no events |
| carrick@nustechnology.com | 9 | no events |
| nick@nustechnology.com | 3 | 21:30 UTC — Weekly Meeting with Devs (Teams, recurring) |
| rick@nustechnology.com | 8 | no events |
| kai@nustechnology.com | ~12+ | no events |
| ken@nustechnology.com | — | no events |
| freelancer@mypersonalfootballcoach.com | error: no_gmail_sa_key | — |

**duongdn@ details:**
- HaoNV — Đơn Xin Nghỉ Phép (leave request) — Jun 9 15:02 +07
- BinhNT reply approving HaoNV leave — Jun 9 15:03 +07
- CDF form verification notice (internal)

**carrick@ details:**
- ⚠️ `generator-api | Failed pipeline for staging | 5cfcb2f5` — Jun 9 08:38 UTC
- ⚠️ `generator-api | Failed pipeline for stagingPhase2 | cc424543` — Jun 9 08:38 UTC
- Redmine Bug #78866 (New, then Tested on Staging) — Generator/Elliott
- Redmine Bug #78871 (New, then updated) — Generator/Elliott
- Redmine Bug #78873 (Tested on Staging) — Generator/Elliott
- SoCal Auto Wraps password reset email
- Jira weekly update (Swift Studio)

**nick@ details:**
- Azure DevOps: PR "Overall Xero integration migration updates — CNA.Operations.App" ×2
- Slack notification: Joe Kazzi mentioned Nick in #operations-app

**rick@ details:**
- ⚠️ `[FirstProject] production — 10th Error occurrence: #1018 Uncaught Error` — Jun 9 12:10 UTC
- ⚠️ `[FirstProject] production — New Error: #1019 Uncaught Error: Minified React` — Jun 9 12:10 UTC
- InfinityRoses Daily Summary ×2 (Jun 9)
- FirstProject Daily Summary (Jun 9)
- Customer email, Fountain Gifts newsletter

**kai@ details:**
- ⚠️ New Relic: "Signal lost for 10 minutes on 'Low Application Throughput'" ×12 — MPFC

Trello: All 6 Check Mail items ✓ complete.

---

## Slack — 05:00 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 2 | Carrick + Jamie (Aysar) discussion re open PRs — normal |
| RDC - FM Monitoring | 2 | Carrick API change reply; tuner recovery alert — normal |
| Swift Studio | 20 | Rory + Carrick + Jeff active on BXR app (region selection UX) |
| Xtreme Soft Solutions | 0 | No messages — quiet ✓ (Kai 16h/wk, daily report NOT required) |
| SAM GUARD - Mobile | 11 | Elena active — process-digital-plant server rebuild coordination (studio servers) |
| Global Grazing Services | 4 | Nick absent from #maintenance (normal — GGS absence ≠ alert per rule); Bailey gate = TuanNT task log, confirmed 8h Paturevision ✓ |
| Amazing Meds | 0 | No activity |
| Generator | 13 | Elliott active (requesting release branches 07:10 UTC), Violet daily update, Rudi deploying Batch 1 |
| LegalAtoms | 18 | Raymond active — document generation performance, filing job improvements |
| MyPersonalFootballCoach | 0 | No Slack activity (see kai@ New Relic alerts above) |
| William Bills | 0 | No activity |
| Equanimity | 0 | No Marcel activity |
| SoCal Auto Wraps | — | Skipped (dropped 2026-05-11) |
| Aigile Dev | 1 | Blog automation reminder — no Colin activity |

**Generator context:** Pipeline failures (staging + stagingPhase2) in email from 08:38 UTC Jun 9. Violet's daily update shows Ryan working on Redmine issues 78944, 78971. Elliott actively coordinating release branches. Pipelines may have been fixed post-failure.

Trello: 13 items marked ✓ (see Trello section for detail).

---

## Discord — 05:00 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 25 | Jeff daily report ✓, James Diamond active, multiple PRs ready for review |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew Taraba DMs |

**AirAgri highlights:**
- Jeff Trinh daily report in #airagri-flutter: 4h — asset summary view + QR code functionality
- James Diamond: Weekly Select Harvests meeting, tasking Vinn + contractors doc
- dapackage: PRs #486–#489 ready for review (spray module, corporate sensor pool)
- Vinn: pinged for PR review but no daily report posted in window
- #airagri-testing: Paul Diamond bug reports (text message link, alert status color)

Trello: James Diamond ✓, Andrew Taraba ✓.

---

## Sheets — 05:00 (+07:00) [re-verified 09:02]

| Developer | Jun 9 Hours | Status |
|-----------|-------------|--------|
| LongVV (Maddy W10) | 0h Sheets / 8h Workstream (Jun 8) | ✓ OK — part-time 16h/wk; transferred to OhCleo, leave Jun 10 |
| PhucVT (JamesDiamond W29) | 0h | ✓ OK — leave day (Nghỉ cả ngày) |
| TuanNT — JohnYi (W27) | 0h | ✓ OK — 8h total via Paturevision (combined clears gate) |
| TuanNT — Paturevision (W31) | **8h** | ✓ CONFIRMED — patOwners TuanNT=8h (cron was wrong) |
| TuanNT — Rebecca (W28) | — | ✓ Normal — Chưa expected |
| TuanNT — Neural (W24) | 0h | ✓ OK — 8h total from Paturevision clears gate |
| VietPH (Paturevision W31) | 0h | ✓ OK — leave day (Nghỉ cả ngày) |
| KhanhHH — Generator (W44) | 4.5h | ✓ OK — partial day, weekly total 12.5h |
| LeNH — Rory (W15) | 0h | ⚠️ ALERT — no LeNH rows (vacation Jun 12, not Jun 9) |
| LeNH — Franc (W28) | 0h | ⚠️ ALERT — Franc sheet empty for Jun 9 |
| LeNH — Rebecca Q-T | 0h | ⚠️ ALERT — no LeNH rows in Rebecca sheet |

**LeNH combined Jun 9:** 0h across all 3 sheets. Leave note Jun 12 (family trip), NOT Jun 9. Real alert.

**Upwork:** All sessions expired this cron run. Not re-checked in manual re-check.

---

## Scrin.io — 05:00 (+07:00)

**Scrin.io (TuanNT / John Yi — Jun 9):** 0h — no sessions recorded.

---

## Fountain — 05:00 (+07:00)

### Part 1 — Matrix Plan
✅ **Found** — @trinhmtt posted W30 plan on 2026-06-08 08:59:
```
ViTHT: 40h
ThinhT: 20h
DatNT: 40h
=> QC: 22.5h
```
Note: VuTQ not in W30 plan (moved to Bailey). ViTHT sick Jun 9 (fever+cough, confirmed by Delivery Dept).

### Part 2/3 — Task Log Actuals + Plan vs Actual
W30 (Jun 8–14) and W29 (Jun 1–7): **0h logged** — Fountain devs have not entered tasks for these weeks.  
Last logged data: **W28 (May 25–31):**

| Dev | W28 Hours |
|-----|-----------|
| ViTHT | 24.00h |
| ThinhT | 8.00h |
| HungPN | 8.00h |
| DatNT | 16.00h |
| LamLQ | 16.00h |
| PhatDLT | 6.00h |
| **Total** | **78.00h** |

**Plan vs Actual W30 (Jun 8-14):** Fountain devs log on Workstream, not Google Sheets (confirmed by @trinhmtt Jun 9 09:02). Sheet W30 shows 0h — expected. Workstream not checked this session. ViTHT sick Jun 9 → 1 day missed expected.

### Part 4 — Capacity & Runway
- **Remaining estimate:** 225.00h (11 active tasks — Not Started + In Progress)
- **Runway:** 2.50 weeks @ 90h/wk

*Note: Previous report showed 355h / 3.94 weeks — decrease of 130h / 1.44 weeks suggests tasks completed/deployed.*

### Part 5 — Over-Estimate Tracking
| Task | Est | Actual | % |
|------|-----|--------|---|
| **#2615** | 12h | 106.75h | **890%** ⚠️ STILL GROWING (was 790% prev run) |
| #2523 | 16h | 61.00h | 381% |
| #2816 | 20h | 44.25h | 221% |
| #2872 | 32h | 46.25h | 145% |
| #2735 | 90h | 136.00h | 151% |
| #2854 | 60h | 81.50h | 136% |
| #2595 | 120h | 168.25h | 140% |
| #2853 | 40h | 48.75h | 122% |

### Trello Board (Fountain)
**Customer comments in window:**
- kunalsheth on "Fountain - Shipping cost not updating" — Jun 9 13:15 UTC: "@rick570 Yesterday I updated the 3-day, 2-day, and overnight [shipping costs]..."

**Active card counts:**
| List | Cards | Stuck >5d |
|------|-------|-----------|
| To-Do | 26 | 26 |
| Bugs | 14 | 9 |
| Doing | 13 | 11 |
| QC Internal Backlog | 13 | 6 |
| QA Backlog | 4 | 1 |
| In QA | 2 | 1 |

**Doing list hard-to-release (14+ days):**
- "Fountain & Infinity - Add Subtle Scroll Animations" — 49 days
- "ActiveRecord::RecordNotFound in admin/users#show" — 48 days

---

## Elena — 05:00 (+07:00)

**PRs:** 0 open PRs in nustechnology/Elena-SamGuard-Digital-Plant  
**Pending deploy:** None  
**Redmine (elena-samguard):** 0 open issues (all closed, most recent from Oct 2025)  
**Precognize (nusken PRs):** 8 open PRs in Precognize/development — none from nusken  
**WordPress (samguard.co):** ✅ Clean — no JS errors, no page errors (CSP violations from Google Analytics are expected)

---

## Upwork — 05:00 (+07:00)

All sessions expired — requires manual browser login (CAPTCHA/2FA):
- Rory (carrick account): session expired
- Neural Contract: session expired
- Aysar: session expired

⚠️ Upwork data unavailable this report. Manual re-login required.

---

## Trello — 09:02 (+07:00) [updated 09:43]

**Check Mail:** All 6 items ✓ complete (DuongDn, Carrick, Rick, Kai, Ken, Nick)

**Check Progress ✓ complete (final):**
- Maddy, John Yi, Aysar, Elliott, MPFC, Marcel, Elena-SamGuard, Elena-WordPress
- Raymond, Bailey, Andrew Taraba, Colin
- **Rebecca (William Bills)** ← newly completed (TuanNT 8h confirmed)
- **Neural Contract** ← newly completed (silence = never alert)

**Check Progress ✓ newly completed (09:36):**
- Philip — no messages in window (last msg May 27)
- James Diamond - Vinn — Vinn on leave Jun 9, no report expected

**Check Progress ✓ newly completed (09:43):**
- Rory — reminder sent to LeNH (0h Jun 9 real alert; reminder IS the action per rule) ✓
- Franc — reminder sent to LeNH ✓
  - ⚠️ Note: cron INCORRECTLY blocked Rory/Franc via LeNH task log. Gate mapping says both are Slack-only items (Rory=Swift Studio Carrick activity ✓; Franc=RDC dmetiner no alert ✓) — task log 0h must NEVER block Slack-only gates.

**Check Progress ○ incomplete (final):**
| Item | Reason |
|------|--------|
| Fountain | #2615 890% STILL GROWING |

**Final: 18/19 ✓ complete. Only Fountain open.**

---

## Reminders — 09:02 (+07:00) [re-verified]

| Dev | Status | Note |
|-----|--------|------|
| TuanNT | ✅ CLEARED | Had 8h in Paturevision — cron used wrong date tokens |
| LeNH | ⚠️ 0h Jun 9 | Rory + Franc + Rebecca Q-T all 0h; leave note is Jun 12 not Jun 9 |
| LongVV | ✓ OK | Part-time (16h/wk); left early Jun 9 (father ER); emergency leave Jun 10 |

*Reminder: LeNH should be notified — 0h Jun 9 with no leave note. Use --send-reminder flag to send.*

---

## Matrix — 09:02 (+07:00) [refreshed]

✅ Token refreshed. 29/125 rooms active, 631 messages.
Full room details: `reports/2026-06-10/matrix-rooms-0902.md`

**Key highlights:**
- **Delivery Dept**: ViTHT sick Jun 9 (fever+cough), ThoTNT sick Jun 9 (TamVT covering). LeNH vacation Jun 12 → KhanhHH to cover Rory.
- **Celine-OhCleo**: LongVV left early (father ER), API bug found → DuongDN fixed + deployed 17:25 ✅. LongVV implemented free-listens FE after hours.
- **Bailey Mgmt**: Bailey client paid $727.50 — follow up on remaining balance.
- **TuanNT room**: Confirmed TuanNT worked Jun 9 (Paturevision). John Yi 0h was a mis-log by another dev (Art project).
- **LeNH room**: 0h task log reminder sent Jun 9 08:41.
- **BDD Delivery**: Elena Java/Angular scope updated (BE 55.2h + FE 71.4h = 126.6h total).

**Action items for DuongDN:**
- ~~OhCleo API bug~~ ✅ RESOLVED
- LongVV leave Jun 10 — confirm with MinhTV on coverage
- Technical article DS dự án — confirm project list with BinhNT

---

## Infrastructure Notes

- **Matrix token**: ✅ Refreshed at 09:02. Valid.
- **Upwork sessions**: All expired during cron run. Requires manual re-login.
- **Gmail SA key**: `config/.gmail-service-account.json` not present for freelancer@mypersonalfootballcoach.com

---

## Key Alerts — Final State (as of 09:43)

| # | Priority | Alert | Status |
|---|----------|-------|--------|
| 1 | ⚠️ | **Fountain #2615** — over-estimate 890% (est=12h, actual=106.75h), STILL GROWING week-over-week | ○ Open — Trello Fountain item open |
| 2 | ⚠️ | **FirstProject production errors #1018–#1022** — 5 new React errors (rick@) | Open — needs dev investigation |
| 3 | ⚠️ | **Generator pipeline FAILED** — staging + stagingPhase2 (carrick@) | Open — Violet: "tested, looks good now" but pipelines not confirmed fixed |
| 4 | ⚠️ | **MPFC New Relic** — "Signal lost: Low Application Throughput" ×12 (kai@) | Open |
| 5 | ⚠️ | **MPFC Rollbar** — [Delayed-newform] production 10 occ/5min at 06:21+07 (vuongtrancr@) | Open |
| 6 | ✅ | **LeNH 0h Jun 9** — reminder sent 09:43, Rory ✓ Franc ✓ | Cleared |
| 7 | ✅ | **TuanNT 0h (false alarm)** — confirmed 8h in Paturevision | Cleared |
| 8 | ✅ | **Vinn no daily report** — Vinn on leave Jun 9 | Cleared |
| 9 | ℹ️ | **LongVV emergency leave Jun 10** — father stroke (cấp cứu), OhCleo API fixed by DuongDN 17:25 ✅ | Monitor coverage |
| 10 | ℹ️ | **TuanNT off Jun 11–12, LeNH off Jun 12** — KhanhHH covers Rory | Plan confirmed |

**Trello final: 18/19 ✓. Only Fountain ○.**

