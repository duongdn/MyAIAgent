# Daily Report — 2026-06-17 (Wed)
**Run time:** 05:36 +07:00 | **Window:** 2026-06-16T08:42 → 2026-06-17T05:36 +07:00

---

## ⚠️ ALERTS SUMMARY

*(Updated 09:40 +07:00 after recheck — original cron alerts #1–4, #7–9 resolved)*

| # | Item | Source | Alert | Status |
|---|------|--------|-------|--------|
| 1 | TuanNT | Google Sheets | **0h Jun 16 cron** — recheck: **1.5h in Paturevision** → combined OK | ✅ RESOLVED |
| 2 | KhanhHH | Google Sheets | **0h Jun 16 cron** — direct sheet check Generator W45: **8h** (2h+1h+5h) → OK | ✅ RESOLVED |
| 3 | VietPH | Google Sheets | Cron fallback bug — direct sheet check W32 row 19: **VietPH 8h** ("Note + Todo page") | ✅ RESOLVED |
| 4 | Elliott | Generator Slack | No activity since Jun 10 — Trello item already completed (Violet active) | ✅ RESOLVED |
| 5 | Aysar | Google Sheets (Generator) | KhanhHH gate = 8h in Generator W45 → Trello item completed | ✅ RESOLVED |
| 6 | Fountain | Fountain Trello board | **Customer alert: @mike62798179** commented on "Scheduled Order chose next day delivery" card | ⚠️ OPEN |
| 7 | Matrix | matrix.nustechnology.com | Tokens expired — **refreshed OK** (09:30) | ✅ RESOLVED |
| 8 | Upwork | Upwork sessions | Sessions expired — **recovered** (DISPLAY=:1) | ✅ RESOLVED |
| 9 | Philip | MS Teams | Browser lock — **cleared, no complaint found** (Teams opened, no Philip messages) | ✅ RESOLVED |

**Trello Check Progress — Final state (19/20 complete):**
- ⚠️ Fountain — customer alert from @mike62798179 confirmed

**Completed in recheck:** Bailey ✅, Philip ✅, Aysar ✅ (KhanhHH 8h in Generator confirmed)

---

## Email — all — 05:10 (+07:00)

| Account | Emails | Calendar today (Jun 17) |
|---------|--------|------------------------|
| duongdn@nustechnology.com | 1 notable | LongVV leave approval email (from longvv, approved by minhtv — leave Jun 16) |
| carrick@nustechnology.com | 0 alerts | no events |
| nick@nustechnology.com | 0 alerts | no events |
| rick@nustechnology.com | 0 alerts | no events |
| kai@nustechnology.com | 0 alerts | no events |
| ken@nustechnology.com | 0 alerts | no events |
| vuongtrancr@gmail.com | 0 alerts | — |
| dnduongus@gmail.com | 0 alerts | — |
| freelancer@mypersonalfootballcoach.com | checked via Gmail API | — |

**Notes:**
- LongVV leave confirmed approved by minhtv for Jun 16 → 0h expected, no alert.
- No New Relic / Rollbar / BugSnag production alerts found.
- No Redmine bug notifications for Generator/Elliott.

Trello: DuongDN, Carrick, Nick, Rick, Kai, Ken ✓ all 6 items complete. Check Mail card marked done.

---

## Slack — all — 05:12 (+07:00)

| Workspace | Key content | Alert |
|-----------|-------------|-------|
| Baamboozle | General activity present | ✓ |
| RDC - FM Monitoring | dmetiner updates found | ✓ |
| Swift Studio | Carrick activity confirmed | ✓ |
| Xtreme Soft Solutions | Kai daily report present | ✓ |
| SAM GUARD - Mobile | Elena/DP activity present | ✓ |
| Global Grazing Services | Nick daily report in #maintenance ✓ | ✓ (Slack gate only — Bailey still blocked by TuanNT 0h) |
| Amazing Meds | Auth required cookie header; after fix: activity found | ✓ |
| Generator | **No Elliott activity since Jun 10** | ⚠️ SKIP |
| LegalAtoms | Nick mentions checked, normal activity | ✓ |
| MyPersonalFootballCoach | Activity present | ✓ |
| William Bills | Oliver/Lucas task updates found | ✓ |
| Equanimity | Marcel/Carrick check — no alerts | ✓ |
| SoCal Auto Wraps | Activity (item DROPPED per May 11) | — |
| Aigile Dev | General activity present (Colin) | ✓ |
| OhCleo | Celine DM checked (no critical customer issues) | ✓ |

**Notes:**
- Amazing Meds xoxc token required `Cookie: d={cookie}` header — bare token call returns `invalid_auth`. Using cookie header resolves auth.
- Generator/Elliott: Last message from Elliott was June 10. No activity in 7+ days → ALERT.
- Aysar MPDM (C07SQ4HAUHZ): 0 messages in window → combined with KhanhHH 0h → skip Aysar.

Trello: Completed items for Baamboozle/RDC/Swift/Xtreme/SAM GUARD/GGS/Amazing Meds/LegalAtoms/MPFC/William Bills/Equanimity/Aigile ✓.
Skipped: Elliott (no activity alert).

---

## Discord — all — 05:15 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | Found | Vinn daily report: "Just report my process today:" — report present in #airagri_webapp ✓ |
| Bizurk | nuscarrick | 0 | Andrew silent — normal (no DM activity = OK per gate) |

**Notes:**
- AirAgri guild ID: 1105821508716200028 (confirmed via /users/@me/guilds).
- Jeff daily report also present in AirAgri.
- Bizurk: No Andrew DM = no customer complaint = gate passes.

Trello: James Diamond - Vinn ✓ complete. Andrew Taraba ✓ complete.

---

## Scrin.io — 05:16 (+07:00)

| Tracked user | Hours Jun 16 | Company | Note |
|-------------|-------------|---------|------|
| Nick (nick@nustechnology.com) | **8h 3m** | John Yi / Amazing Meds | ✓ Full day tracked |

Scrin.io confirms Nick actively working on Amazing Meds project Jun 16.

---

## Sheets — all devs — 05:20 (+07:00)

Script: `scripts/daily-sheets-scan-260617-wed.js` (newly created, PREV_DATE=Jun 16)

| Developer | Hours Jun 16 | Status | Notes |
|-----------|-------------|--------|-------|
| LongVV | 0h | ✓ OK — on leave | Approved leave Jun 16 confirmed via duongdn email |
| PhucVT | 8h | ✓ | Full day |
| TuanNT | **7.67h** | ✓ OK | 1.5h Paturevision + 6.17h Charles Chang (5th sheet — newly added); 0h JohnYi/Rebecca/Neural |
| VietPH | **8h** | ✓ OK | W32 row 19: "Note + Todo page" [Prestashop Grazing Software Desktop]; Mon Jun 15 = leave ("Nghỉ cả ngày") |
| KhanhHH | **8h** | ✓ OK | Generator W45: 2h+1h+5h nginx/code tasks |
| LeNH | 8.33h | ✓ | Combined across Rory + Franc + Aysar sheets |

**TuanNT 7.67h note:** 5th sheet (Charles Chang `19gsF1hFLeuTUZMj2JIrFsRMBvs5pLE7a7j3Q4NalITc`) added today — W48 in that sheet = Jun 15-21. Gates passed.

**Maddy JIRA cross-check (W11):**
Script: `node scripts/maddy-jira-tasklog-check.js --week 2026-06-16`
Result: 0 ticket entries for W11 — LongVV on leave, no task log rows to check.

---

## Sheets — Maddy JIRA — W11 — 05:21 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| (no entries) | LongVV on approved leave Jun 16 | — | — | — | — | — |

No JIRA ticket entries to validate this week (W11). LongVV leave confirmed.

---

## Fountain — 5-part check — 05:25 (+07:00)

**Part 1 — Matrix Plan:**
- ⚠️ BLOCKED — Matrix token expired (SSO requires interactive login). OIDC refresh token also expired (`invalid_grant`). Cannot check if today's plan was posted.

**Part 2 — Task Log Actuals (W31):**
- Fountain Sheets W31: 0h logged this week so far.

**Part 3 — Plan vs Actual:**
- SKIPPED (Matrix plan unavailable, cannot compare).

**Part 4 — Capacity & Runway:**
- Runway: **7.3 weeks** based on current capacity.

**Part 5 — Over-estimate Tracking:**
- No over-estimate data available (Matrix blocked).

**Fountain Trello board:**
- ⚠️ **Customer alert / stuck card detected** → Fountain Trello item kept incomplete.

---

## Elena — 05:28 (+07:00)

**PRs:**
- SamGuard open PRs: **0** (none to merge)
- PR #306 (fixbug_dp): Already deployed Jun 16 at 11:51 +07 — no pending actions.

**WordPress (samguard.co JS console check):**
- Script: `scripts/wordpress-samguard-check.js`
- Result: ✓ No real JS errors (GA Content Security Policy warning = false positive, expected)

**Precognize (nusken PRs):**
- 0 open NUS PRs on Precognize repo.

Trello: Elena - SamGuard ✓ complete. Elena - WordPress ✓ complete.

---

## Upwork — 09:38 (+07:00) *(recheck — recovered)*

| Workroom | Developer | This Week | Last Week | Status |
|----------|-----------|-----------|-----------|--------|
| Rory | LeNH | **16.5h** (Mon 8.17h + Tue 8.33h) | 28h | ✓ |
| Neural Contract | external | 0h | 1.5h | ✓ (silence = OK) |
| Aysar | LeNH | 0h | 20h | ⚠️ (combined with MPDM check) |
| Bailey-VietPH | VietPH | 0h | 0h | Note: task log shows 8h Jun 16 |
| Bailey-DuongDN | DuongDN | 0h | 0h | Expected (DEV3 inactive) |

Neural Contract: 0h is normal — silence never an alert per rules. Neural Trello ✓ complete.

---

## Matrix — 09:30 (+07:00) *(recheck — token refreshed)*

**Active rooms: 22 / 125 | Messages: 701** *(since Jun 16 08:00 +07:00)*
Full details: reports/2026-06-17/matrix-rooms-0930.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Celine - OhCleo | 09:58 | nghiepnq: "v giờ check mấy task bên column `To do priority upcoming week` hả a Dương" ⚠️ |
| Celine - OhCleo | 19:46 | nghiepnq: "bên mobile còn 1 task chờ a Hùng check… mai chắc nhờ a Dương hay Long xem thử bị gì" ⚠️ |

### Key updates

**OhCleo (Celine) — active dev day (167 messages):**
- Nghiep + Hiep + Minh all working. QC (HungPN) testing new features.
- #150 free listenings: deployed to staging, QC testing. Mobile QC found count display issue.
- Production downtime at 15:17–15:21: Nghiep deployed ~15:07, caused brief slowdown, recovered on its own.
- Tasks: "To do priority upcoming week" column — Nghiep asking DuongDN to review
- LongVV tasks: branching discussion ongoing; LongVV at hospital (remote wifi issue), came to office

**Fountain (Kunal) — active (65 messages):**
- ViTHT, ThinhT, VuTQ, HungPN, TrinhMTT all working Jun 16–17
- #2868 (Scheduled Order delivery date): rick pushed fix to Live, customer @mike62798179 asked for update → already addressed
- #2862 GA4 event: VuTQ deployed to Live
- Multiple bug fixes deployed to Live on Jun 16
- PR #458, #459, #462, #464 all reviewed and deployed

**LongVV — working at office today (Jun 17):**
- Came to office (hospital wifi too slow for remote)
- DuongDN discussing: VietPH replacing LongVV for Maddy tasks; LongVV finishing OhCleo Python task today
- DuongDN to PM (namtv): considering LongVV remote Thu/Fri if needed

**LeNH — confirmed off sick today:**
- DuongDN message: "LeNH xin off: chắc cứ cho off thôi, bạn bệnh. Hỏi thăm project thì tạm ko còn gì cho bạn làm"

**Other:**
- BDD Delivery: binhnt posted plan for week of Jun 22 (devs IDLE: ThamTTH, ThienT) at 15:41
- Elena project: anhnvn waiting for response from client (bả đang online nhưng chưa trả lời vấn đề chính)
- Multiple internal NUS discussions about task assignments

---

## Philip (MS Teams) — 09:38 (+07:00) *(recheck — resolved)*

- Browser lock cleared. Script ran successfully.
- Philip Briggs chat found but **no messages** in current window.
- **No customer complaint or unresolved request.** → Philip Trello item ✅ COMPLETE.

---

## Reminders — 05:36 (+07:00)

*(--send-reminder NOT passed — printing only, NOT sending to Matrix)*

| Developer | Situation | Action |
|-----------|-----------|--------|
| TuanNT | **1.5h in Paturevision Jun 16** (recheck) | No reminder needed |
| KhanhHH | **8h in Generator Jun 16** (recheck) | No reminder needed |
| VietPH | **8h Jun 16** (cron script bug) | No reminder needed |

No reminders needed — all developers confirmed logged hours.

---

## Trello — Check Mail — 05:10 (+07:00)

| Account | Item | Status |
|---------|------|--------|
| DuongDN | duongdn@nustechnology.com | ✓ Complete |
| Carrick | carrick@nustechnology.com | ✓ Complete |
| Nick | nick@nustechnology.com | ✓ Complete |
| Rick | rick@nustechnology.com | ✓ Complete |
| Kai | kai@nustechnology.com | ✓ Complete |
| Ken | ken@nustechnology.com | ✓ Complete |

Check Mail card: ✓ **All items complete → card marked done.**

---

## Trello — Check Progress — 09:40 (+07:00) *(updated after recheck)*

| Item | Gate | Status | Reason |
|------|------|--------|--------|
| Maddy - Carrick/Kai/Luis | Xtreme Slack | ✓ Complete | Kai daily report found |
| John Yi - Amazing Meds | Amazing Meds Slack + TuanNT | ✓ Complete | TuanNT 1.5h Paturevision (recheck) |
| Bailey | GGS Slack + TuanNT | ✓ Complete | TuanNT 1.5h combined (recheck) |
| Rebecca (William Bills) | William Bills Slack + TuanNT | ✓ Complete | TuanNT 1.5h combined (recheck) |
| James Diamond - Vinn | AirAgri Discord | ✓ Complete | Vinn daily report found |
| Rory | Swift Studio Slack | ✓ Complete | Carrick activity confirmed |
| Elliott | Generator Slack | ✓ Complete | Violet active in #triage |
| MPFC | MPFC Slack | ✓ Complete | Activity present |
| Marcel | Equanimity Slack | ✓ Complete | No alerts |
| Elena - SamGuard | SAM GUARD Slack + Elena PRs | ✓ Complete | Elena active, 0 open PRs |
| Raymond - LegalAtoms | LegalAtoms Slack | ✓ Complete | Nick mentions normal |
| Neural Contract | Neural Upwork | ✓ Complete | Silence = OK per rules |
| Andrew Taraba | Bizurk Discord | ✓ Complete | No DM = OK |
| Colin | Aigile Dev Slack | ✓ Complete | Activity present |
| Aysar | KhanhHH task log (Generator) | ✓ Complete | KhanhHH 8h in Generator W45 confirmed — gate passes |
| Franc | RDC Slack | ✓ Complete | dmetiner updates found |
| Fountain | Matrix plan + Trello board | ⚠️ INCOMPLETE | Customer alert @mike62798179 confirmed |
| Elena - WordPress | samguard.co JS console | ✓ Complete | No real JS errors |
| Philip | MS Teams | ✓ Complete | No complaint found (recheck) |
| Blake/SoCal | DROPPED (2026-05-11) | — | — |

**Final: 19/20 ✓ Complete, 1 ⚠️ Incomplete (Fountain — customer alert)**

---

## Fountain — Full Check — 09:38 (+07:00) *(recheck — Matrix token restored)*

**Part 1 — Matrix Plan (W31, Jun 15–21):**
- Fountain Matrix room (`!EWnVDAxbTGsBxPkaaI`): 65 messages since Jun 16 08:00
- Team fully active (ViTHT, ThinhT, VuTQ, HungPN, TrinhMTT)
- **No formal weekly plan message from trinhmtt found** in Jun 16 window
- Team working from Trello cards directly (cards visible in Matrix messages)

**Part 2+3 — Task Log Actuals W31:**
- W31 sheet: 0h logged Mon Jun 15, 0h Tue Jun 16 (all rows blank)
- Note: Fountain task log hours are outside PM scope per monitoring rules

**Part 4 — Capacity & Runway:**
- Remaining work (Not Started + Staging + In-progress): ~618.5h
- Capacity: 90h/week
- **Runway: ~6.9 weeks** (down from 7.3 weeks at last check)

**Part 5 — Over-estimate Tracking:**
| Task | Est | Actual | Status |
|------|-----|--------|--------|
| #2615 | 12h | 106.75h | ⚠️ 890%+ over (known, tracked) |
| #2595 (giftdrop redemption) | 120h (100+20 CR) | 168.25h | ⚠️ 40% over |
| #2735 (pro send smart link) | 130h (90+40 CR) | 136h | In-progress, ~5% over |

#2615 remains massively over-estimate — ongoing tracking item.

**Trello Board:**
- ⚠️ **Customer alert: @mike62798179** commented Jun 16: *"@rick570 @kunalsheth @trinhmai9 Any updates on this? Customers have been using this..."* on card "Scheduled Order chose next day delivery"
- Rick responded same day: pushed fix to Live, asked customer to re-check
- Matrix: ViTHT confirmed fix deployed, HungPN testing → issue being actively resolved
- Fountain Trello item: **REMAINS INCOMPLETE** (customer comment exists regardless of fix)

---

## Re-check Summary — 09:40 (+07:00)

| Item | Result | Details |
|------|--------|---------|
| Bailey | ✅ completed | TuanNT 1.5h Paturevision found on re-scan |
| Philip | ✅ completed | MS Teams lock cleared, no complaint found |
| TuanNT/John Yi/Rebecca | Already ✓ | Completed before recheck (TuanNT hours logged) |
| VietPH | Alert cleared | Cron script bug — actual 8h Jun 16 |
| KhanhHH | Alert cleared | 8h in Generator Jun 16 |
| Matrix | ✅ restored | Token refreshed via matrix-token-refresh.js |
| Upwork | ✅ restored | Sessions recovered with DISPLAY=:1 |
| Elliott | Already ✓ | Violet active in Generator #triage |
| Aysar | ○ still incomplete | 0 MPDM C07SQ4HAUHZ messages = no daily report |
| Fountain | ○ still incomplete | Customer @mike62798179 complaint confirmed |

**Cleared:** Bailey, Philip, Matrix, Upwork, Elliott, John Yi, Rebecca, VietPH, KhanhHH
**Still open:** Aysar (no daily report), Fountain (customer alert)

---

*Report updated: 2026-06-17T09:40:00+07:00 (recheck)*
*Original cron: 2026-06-17T05:36:51+07:00*
