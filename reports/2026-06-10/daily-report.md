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

## Matrix — 09:02 (+07:00) [29 rooms active, 631 msgs, window: Jun 9 08:00+07]

| Room | Msgs | Summary |
|------|------|---------|
| **Celine - OhCleo** | 164 | ⚠️ Prod API `/api/medias/suggest-medias/` broken → DuongDN fixed + deployed 17:25. LongVV: free-listens feature done (PR #11). LongVV left early 16:42 (father stroke emergency). FE iOS build bug (reload loop on Hiệp's build, not LuHX's). |
| **Elena - Active Alerts** | 249 | ⚠️ AA3 est dispute: Lena questioned BE effort (API + unit tests already exist). Team explained effort = verify+update APIs. Multiple bugs: socket reminder timezone wrong, sub-investigation STT not updating. DuongVN ran migration. LA sent explanation to Lena. AA2 restore complete (ES reindexed 10:31). |
| **Delivery - Resource Arrangement** | 17 | ThoTNT sick Jun 9 → TamVT bù Zeke. ViTHT sick Jun 9 → no backup Kunal. LeNH vacation Jun 12 → KhanhHH bù Rory (TuanNT also off Jun 11-12). ThanhVM sick Jun 9 PM → PL. KhanhHH vacation Jun 25-26 (pending approval). |
| **Kunal - Fountain** | 28 | Task log reminder sent. #2918 gift swap bug raised. #2865 address edit fix live. #2881 images fix live. VuTQ pushed to live without QC (corrected). |
| **NUS Technology** | 19 | World Cup prediction app fun activity. Admin: use annual leave reminder. namtv: CDF evidence reminder to team. |
| **Rory Hackett - BXR App** | 11 | Tin Pham (client) requested call tomorrow 11AM UK. LeNH off Jun 12 → KhanhHH covers. Meeting today 15:00+07 (carrick + Jeff + Tin). Task status update requested. |
| **Delivery Department** | 6 | HiepNT joining OhCleo Mobile. LongVV transferred to WyAsk. ⚠️ OhCleo checklist run report sent by Minh Trinh. |
| **!oGYjbzEfphvvauBZtq** (internal) | 13 | Scrin.io Art project confusion (TienND logged wrong project, not TuanNT). TuanNT to cover Rory → later swapped to KhanhHH (TuanNT off Jun 11-12). |
| **!mYZBGNoLFVpMVIJtPu** (LongVV DM) | 9 | LongVV got Cloudflare API link (OhCleo). Evening: emergency leave request Jun 10 (father). |
| **!aaumKvfltGlhqcQjJP** (binhnt DM) | 21 | Sheet 31 formula bug (VietPH task log) → binhnt advised copy from old sheet. binhnt sent technical article project list for DuongDN to confirm. |
| **Maddy - Extreme Soft Solutions** | 10 | Case study request. LongVV submitted 2 ideas (Google Cloud Vision product photo; auto-pricing second-hand from image). |
| **Direct Manager** | 8 | Meeting 11:45 room 3L. chientx: collect case studies from ONE person per project (not blast whole team). |
| **BDD - Delivery** | 2 | Elena new scope est: BE 55.2h + FE 71.4h = 126.6h total (revised from 49.5+74.2). |
| **Aysar Khalid - Baamboozle** | 8 | Case study request → KhanhHH sent 2 case studies doc. |
| **NUS - Elliott - New GreenFort Capital** | 6 | Case study request (needs ≥2 articles). KhanhHH to report later. |
| **Rebecca - William Bills** | 8 | Case study request. Project paused — no client contact recently. |
| **Rory / Franc reminder** | 1 | LeNH reminder sent (Jun 8 task log, Franc sheet 0h). |
| **Bailey - Management** | 4 | Bailey paid $727.50. |
| **Cameron Batty - Appetise** | 4 | Cameron returning next week (Thu+Fri Jun 18-19). |
| **Elena - Digital Plant** | 3 | PR #305 (DP-666) deployed to MayBanServer. studio-03 slow → switch to studio-02. |
| **John Yi - Amazing Meds** | 4 | Case study request → TuanNT found no interesting cases for this project. |
| **Tech Lead** | 7 | Meeting 11:45 room 3L (some remote). |
| **NUS - Bailey - Paturevision 2026** | 4 | Case study request → HaVS thinking, will review. |
| **Technology Department** | 4 | Claude Fable 5 released (chientx shared). DuongDN: for free users, check "token" before using. |
| **Growth Mentor Program** | 11 | hangdtt collecting pilot feedback. DuongDN: program should continue, 1 session/month. |
| **!QEbdvaMJkTurMpRPIX** (James DM) | 2 | Case study request sent to James team. |
| **!RlDBmHJkbksrxefMGn** | 4 | datnt: InfinityRoses email alias in DNS → referred to customer. |
| **Những chú voi con** | 1 | DuongDN shared Zed IDE (lightweight AI IDE). |
| **!OIrgPraJWrcDTnRVLQ** (LeNH DM) | 1 | Reminder: LeNH fill task log Jun 8. |

**Action items from Matrix:**
- ⚠️ **LongVV leave Jun 10** — father stroke. OhCleo needs coverage (free-listens FE PR #11 to review).
- ⚠️ **Elena AA3 scope dispute** — Lena questioning BE effort, LA sent explanation.
- ⚠️ **Rory Jun 12** — LeNH off, KhanhHH covering (TuanNT also off).
- ℹ️ **Rory meeting TODAY 15:00+07** — Tin Pham client call, carrick+Jeff attending.
- ℹ️ **OhCleo Delivery checklist** — run by Minh Trinh, details in room.
- ℹ️ **Technical articles collection** — ongoing across 6+ projects.

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
| Xtreme Soft Solutions | 0 | No Kai daily report found |
| SAM GUARD - Mobile | 11 | Elena active — process-digital-plant server rebuild coordination (studio servers) |
| Global Grazing Services | some | Activity detected; Nick/Bailey daily report status unclear |
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

## Trello — 09:02 (+07:00) [updated]

**Check Mail:** All 6 items ✓ complete (DuongDn, Carrick, Rick, Kai, Ken, Nick)

**Check Progress ✓ complete (final):**
- Maddy, John Yi, Aysar, Elliott, MPFC, Marcel, Elena-SamGuard, Elena-WordPress
- Raymond, Bailey, Andrew Taraba, Colin
- **Rebecca (William Bills)** ← newly completed (TuanNT 8h confirmed)
- **Neural Contract** ← newly completed (silence = never alert)

**Check Progress ○ incomplete (final after 09:36 recheck):**
| Item | Reason |
|------|--------|
| Rory | LeNH 0h Jun 9 real alert — run `reminders lenh --send-reminder` to clear |
| Franc | LeNH 0h Jun 9 real alert — same as Rory |
| Fountain | #2615 890% STILL GROWING |

**Check Progress ✓ newly completed (09:36):**
- Philip — no messages in window (last msg May 27)
- James Diamond - Vinn — Vinn on leave Jun 9, no report expected

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

