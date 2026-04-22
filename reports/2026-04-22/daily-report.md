# Daily Report — 2026-04-22 (Wednesday)
**Period:** 2026-04-21 08:27 → 2026-04-22 08:40 (+07:00)

---

## 🚨 Critical Alerts

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Fountain/Trello | **ShipStation duplicate shipments** — @mike62798179 manually cancelling duplicate shipments (orders 6463844QN, 6819370EU, 1632502YI). Active bug, URGENT. [Card](https://trello.com/c/BYu5iwQM) | HIGH |
| 2 | Fountain/Trello | **Infinity+Fountain orders not syncing to ShipStation** when holiday delivery selected. @kunalsheth confirmed affects both sites. [Card](https://trello.com/c/y8lM8Alq) | HIGH |
| 3 | Email/rick@ | **[InfinityRoses] PRODUCTION** — NoMethodError: `strftime` on nil `order_item.dispatch_date` — 100th occurrence (#398) | HIGH |
| 4 | Email/rick@ | **[InfinityRoses] PRODUCTION** — New ChunkLoadError chunk 3148 (#984) | MEDIUM |
| 5 | Email/rick@ | **[InfinityRoses] PRODUCTION** — Minified React error #422 — 100th occurrence (#854) | MEDIUM |
| 6 | Slack/William Bills | Oliver flagged **urgent payout update** on MWMX screen. Lucas confirmed deploying — **verify completion** | MEDIUM |
| 7 | Fountain | #2735 Pro Send Smart Link **still growing**: 111.5h → 115h (+3.5h), est 90h (+28%) | MEDIUM |
| 8 | Fountain | #2615 Gift of Choice **still growing**: 102.75h → 106.75h (+4h), est 12h (+790%) | MEDIUM |
| 9 | Fountain | #2702 Accessibility **still growing**: 16h → 20.5h (+4.5h), est 8h (+156%) | MEDIUM |

## ℹ️ Action Items
- **Precognize PRs**: nusken GitHub token missing — check manually or re-auth `nusken` account
- **Upwork Bailey**: Sessions expired for `vinn`+`david2` — run `node scripts/upwork-login.js --login --account=vinn/david2`
- **Neural Contract**: Michael's 3 non-urgent tasks (Apr 15) — confirm actioned: (1) Compare tab export filename, (2) rename Departures→Output tables, (3) Analyse button fix
- **Email/duongdn**: Nam Tran leave/remote request for 22/04 — confirm approved
- **LongVV**: 0h logged Tue 21/04 — verify late filing or follow up
- **VietPH**: 0h logged Tue 21/04 — verify late filing or follow up
- **Fountain**: @kunalsheth asking Rick about pushing Infinity to new ShipStation tonight — confirm timing

---

## Scrin.io — 08:31 (+07:00)
TuanNT (John Yi): 7h 21m tracked yesterday (2026-04-21)

Sessions:
- 09:34AM - 12:21PM: 2h 47m — handle homepage Elementor AM
- 12:36PM - 01:17PM: 0h 41m — handle homepage Elementor AM
- 01:34PM - 05:27PM: 3h 53m — handle homepage Elementor AM

Note: 7h 21m tracked vs 8h minimum threshold. Compare with John Yi task log to verify.

## Elena — 08:32 (+07:00)

### PRs
No open PRs on nustechnology/Elena-SamGuard-Digital-Plant. Nothing to merge or deploy.

### Precognize (nusken)
nusken account not available (no oauth token found). nuscarrick also returned 404 for Precognize/development — repo access unavailable with current tokens.

### WordPress SamGuard
https://www.samguard.co/ loaded with HTTP 200. No JS errors, no CSP violations, no console warnings. Clean.

### Pending Actions
No pending deploys in config/.elena-pending-actions.json. Last merged PR was #299 (DP-652) on 2026-04-07 — all actions marked DONE.

## Slack — 08:32 (+07:00)

### Baamboozle
| Channel | Msgs | Key content |
|---------|------|-------------|
| #random | 2 | International pet day chat; discussion about Gather Classic vs 2.0 |
| #testing | 7 | Carrick acknowledged issue; Stripe test mode behavior discussion |
| #customer-success | 4 | Partnership discussions; positive traction on candidate |
| #engineering | 3 | Dev activity (no text previewed — normal work) |
| #cancellation-responses | 1 | Template/automated message |
| #mpdm (DM group) | 1 | Holiday reminder for April 27 |

No alerts.

---

### RDC - FM Monitoring
| Channel | Msgs | Key content |
|---------|------|-------------|
| #rpi-reboot-logs | 2 | ✅ Tuner Recovery Alerts (automated — recovered successfully) |
| #user-access-logs | 2 | Tuner Access Logs (automated) |
| #all-rdc-fm-monitoring | 1 | Holiday reminder for April 27 |

No alerts. dmetiner activity: tuner recovery automated logs only — no manual issues from dmetiner.

---

### Swift Studio
| Channel | Msgs | Key content |
|---------|------|-------------|
| #bxr__app | 1 | "Let me try that!" — dev test activity |

No alerts. Carrick activity: 1 message in app channel — normal dev work.

---

### Xtreme Soft Solutions
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM (Kai ↔ Madhuraka) | 3 | Holiday reminder Apr 27; Kai confirming will work 2 days that week |

No alerts. Kai confirming part-time schedule for holiday week — normal. Daily report not required (part-time 16h/wk).

---

### SAM GUARD - Mobile
| Channel | Msgs | Key content |
|---------|------|-------------|
| #mql-leads | 5 | HubSpot automated MQL notifications (new leads Apr 21–22) |
| #new-studio-developers | 2 | CSV/autoscan deployment blocker resolved; build & deploy starting |

No alerts. CSV/autoscan blocker was **resolved** (Tom confirmed to Lena). Elena activity: Lena acknowledged update — normal.

---

### Global Grazing Services
| Channel | Msgs | Key content |
|---------|------|-------------|
| #maintenance | 12 | Nick daily report posted; GLS module work, Prestashop 9 upgrade in progress |
| #change-requests | 10 | Amy and Joey coordinating fixes; minor UI issues being resolved |
| #double-scan-option | 7 | Joey reported testing blocked (no buttons); Amy confirmed dev fix in progress |
| #barcode-stock-and-picking-location | 7 | Joey reporting multiple scanning/palette issues to Amy |
| DM (Nick ↔ client) | 1 | Holiday reminder for April 27 |

No alerts. Joey reported testing blocked in #double-scan-option, but Amy confirmed fix being made — active bug resolution, not a stalled situation. Nick active and posted daily report.

---

### Amazing Meds
| Channel | Msgs | Key content |
|---------|------|-------------|
| #blog-marketing-dept (renamed) | 5 | Channel renamed; marketing direction update |
| #web-dev-with-nick | 3 | Nick set up homepage staging on WP Engine; demo site link shared |
| #it-dept-all | 1 | Nick's daily report: mobile design homepage, new key setup |
| DM (Nick ↔ John Yi) | 1 | Holiday reminder for April 27 |

No alerts. Nick active with daily report and staging setup.

---

### Generator
| Channel | Msgs | Key content |
|---------|------|-------------|
| #triage | 7 | Carrick requesting MR reviews; data migration task handled |
| #release | 21 | Active release cycle; image layout fixes, thank-you confirmations |
| #mobile | 20 | Elliott/Violet testing coordination; final testing to be confirmed |
| #business-analysts | 5 | Rudi following up with Violet on update; Trello card created |

No alerts. Elliott/Violet active — release and mobile testing in progress, normal dev cycle.

---

### LegalAtoms
| Channel | Msgs | Key content |
|---------|------|-------------|
| #general | 2 | Raymond: release planned Thursday; border color bug discussed |

No alerts. No Nick-specific mentions or DMs flagged.

---

### MyPersonalFootballCoach
| Channel | Msgs | Key content |
|---------|------|-------------|
| (none) | 0 | No messages in monitoring window |

No alerts. No activity since cutoff — no issues flagged.

---

### William Bills
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM (Lucas ↔ Oliver) | 13 | Oliver flagged urgent payout amount update on MWMX screen; Lucas confirmed deploying; Oliver requesting checks |

⚠️ **William Bills:** Oliver marked task "Super urgent to do ASAP" — payout amounts on new MWMX screen need update (Club Days payouts: $80/$65/$50/$40/$30). Lucas confirmed done and deploying. **Resolved in-thread — monitor for confirmation.**

---

### Equanimity
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM (Carrick ↔ Marcel) | 6 | DigitalOcean migration scoped at 20–30h; Marcel handling DevOps; Carrick noted; holiday reminder Apr 27 |
| #xid-technologies | 39 | Komal updating procedure schema scripts; Carrick reviewing demo before live migration |

No alerts. Carrick and Marcel actively coordinating DO migration — large scoped work (20–30h), normal planning conversation. No blocked or urgent issues.

---

### SoCal Auto Wraps
| Channel | Msgs | Key content |
|---------|------|-------------|
| (none) | 0 | No messages in monitoring window |

No alerts. No activity.

---

### Aigile Dev
| Channel | Msgs | Key content |
|---------|------|-------------|
| #braiking-news | 2 | Automated blog post notifications: draft ready + reminder not published yet |

No alerts. Automated blog pipeline notifications — normal.

---

### Slack Summary
- **Total workspaces checked:** 14 (including Aigile Dev)
- **Workspaces with activity:** 12
- **Workspaces silent:** MyPersonalFootballCoach, SoCal Auto Wraps


## Upwork — 08:33 (+07:00)
| Workroom | This Week | Daily breakdown |
|---------|-----------|-----------------|
| Rory (LeNH) | 0:00 | No hours logged (Mon-Sun: 0) |
| Aysar (LeNH) | 10:20 | Mon: 2h10m, Tue: 8h10m, Wed-Sun: 0 |
| Bailey-VietPH | N/A | Session expired — `vinn` needs re-login |
| Bailey-DuongDN (DEV3) | N/A | Session expired — `david2` needs re-login |
| Neural Contract | 0:00 (messages_only) | No hours tracked; see messages below |

> Bailey sessions expired: run `node scripts/upwork-login.js --login --account=vinn` and `--account=david2`

### Neural Contract Messages (workroom 38901192)
Most recent 8 messages (most recent first):

| Date (UTC) | Sender | Message |
|-----------|--------|---------|
| 2026-04-21 09:18 | Carrick/NUS | Holiday notice: team off Mon Apr 27 (Hung Kings'), resume Tue Apr 28. |
| 2026-04-16 10:12 | Carrick/NUS | "I did and pushed code, let check" |
| 2026-04-16 08:24 | Carrick/NUS | "Let me check" |
| 2026-04-15 07:06 | **Michael (client)** | **3 non-urgent tasks:** (1) filename for Compare tab exports = "ContractProbe Comparison [name1] vs [name2]"; (2) rename "Departures table" → "Output tables"; (3) Manager Analyse button should go to Upload screen (not login page) |
| 2026-04-15 04:18 | Carrick/NUS | Explained report generation code was intercepting response before reaching browser |
| 2026-04-15 03:54 | **Michael (client)** | "Thanks for quick response! Tell me, at a high level, what was the issue?" |
| 2026-04-15 03:41 | Carrick/NUS | "Hi Michael, I fixed the issue, could you please check? I pushed code also" |
| 2026-04-15 02:58 | **Michael (client)** | **URGENT (historical, now resolved):** generate reports button perpetual spinner. |

**Status:** Last client message (Apr 15) contained 3 non-urgent tasks. Carrick sent holiday notice Apr 21. No outstanding unanswered client messages as of today. Tasks from Apr 15 may need follow-up confirmation of completion.

## Email — 08:33 (+07:00)
| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 2 | Leave/remote request from Nam Tran ("Xin làm remote - 22/04/2026"); public holidays notice reply from Hang Dang |
| carrick | 10 | Redmine: 4 Elliott/Generator Lifestyle bugs (#78312 image upload not displaying, #78314 iOS multiple image upload, #78185 requestor email image attachments, #78183 multiple submission error); forwarded AWS cost anomaly for Equanimity AG; TEST Stripe invoice #ENCDU9ZT-0002; Jira weekly digest |
| nick | 6 | No emails from John Yi. Automated only: 4x Canda Surveyors daily task completions; 1 Azure DevOps PR (fix for add info drafting); 1 Slack confirmation code |
| rick | 17 | PRODUCTION alerts: InfinityRoses daily summary; [InfinityRoses] NoMethodError #398 (strftime on nil dispatch_date — 100th occurrence); [FirstProject/InfinityRoses] ChunkLoadError chunk 3148 (new error #984); [FirstProject] Minified React error #422 (100th occurrence, #854); FountainGifts daily summary. Also: Kunal Sheth email "Design focus for this week". Staging BugSnag alerts (FountainStaging) — INFO only, ignored |
| kai | 4 | Jira weekly update; Madhuraka Godahewa mentioned kai on LIFM2-434; Anoma Wasala mentioned kai on LIFM2-430 (2 notifications) |
| ken | 165 | 2 Precognize/development emails: PR #4849 SR-7222 & SR-7224 fix move nested equipments logic + validation (by nustom). Remaining 163 = Welligence/amocc-material GitHub notifications |

⚠️ rick@: [InfinityRoses] PRODUCTION — NoMethodError: undefined method `strftime' for nil:NilClass on `order_item.dispatch_date` — 100th occurrence (#398). dispatch_date is nil for some order items.
⚠️ rick@: [FirstProject/InfinityRoses] PRODUCTION — New ChunkLoadError on infinityroses.com chunk 3148 (#984) — JS chunk loading failure in production.
⚠️ rick@: [FirstProject/InfinityRoses] PRODUCTION — Minified React error #422 reached 100th occurrence (#854) — possible hydration/rendering issue in production.

## Discord — 08:34 (+07:00)
### AirAgri

| Channel | Msgs | Key content |
|---------|------|-------------|
| airagri_webapp | 10+ | Vinn daily report (Apr 21): almost done with multiple chemicals, pushing to staging tomorrow; active discussion Apr 22 about spray job scope with James Diamond |
| airagri-flutter | 2 | Jeff daily report (Apr 21 + Apr 22): spray module UI, API integration |

**Vinn daily report (2025-04-21 17:10 +07):**
> Hi @James Diamond @Royden. Just a report for today, I almost done with multiple chemicals. I will push it to staging tomorrow. The UI will be same like zones. After done, I will move to spray jobs actions on spray dashboard.

**Jeff daily report (2025-04-21 19:03 +07):**
> Here is my report for today:
> - Implement UI for the Spray module
> - Integrate APIs for Spray History and Spray Job
> - Implement UI for the Create Spray Job screen

**Jeff daily report (2025-04-22 17:27 +07):**
> Here is my report for today:
> - Handle adding chemicals and zones when creating Spray Job
> - Integrate API for creating new Spray Job
> - Fix issues related to asset creation

Vinn daily report: **found** ✓ (Apr 21)
Jeff daily report: **found** ✓ (Apr 21 + Apr 22)

### Bizurk

| Channel | Msgs | Key content |
|---------|------|-------------|
| welcome | 0 | No messages |
| All other channels | N/A | Missing Access (nuscarrick not a member of project channels) |
| DM: nuscarrick ↔ animeworld (Andrew Taraba) | 0 | No messages in monitoring window |

Bizurk is a **low-activity client** — silence is normal. No action required.

No alerts.

## Fountain — 08:35 (+07:00)

Matrix token refreshed via `scripts/matrix-token-refresh.js` at report start (prior token M_UNKNOWN_TOKEN — SSO profile auto-refresh succeeded, @duongdn verified).

Current week = **W23 (2026-04-20 → 2026-04-26)**, Wed = day 3.

---

### Part 1 — Matrix Weekly Plan

**Latest W23 plan** — @trinhmtt, 2026-04-20T01:48:46Z (2026-04-20 08:48 +07) — edited version:

> Em gửi plan tuần này ạ
> ViTHT: 40h | ThinhT: 12h | VuTQ: 40h | LamLQ: 10h | DatNT: 40h | => QC: 30.5h

Notes:
- Dev total plan: 40+12+40+10+40 = **142h/wk**; QC plan: **30.5h/wk**
- HaVS still not on plan (absent 4+ consecutive weeks)
- Plan unchanged from W23 — no new Matrix message since Apr 20

---

### Part 2 — Task Log Actuals (W23 — Apr 20–26, 3 days in)

Source: Google Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`, Summary + W23 tabs.

| Dev | Weekly Hours W23 | Role | vs Yesterday |
|-----|-----------------|------|--------------|
| VuTQ | **8.00h** | Dev | +8.00h (logged Mon) |
| ThinhT | **8.00h** | Dev | +8.00h (logged Mon) |
| ViTHT | **8.00h** | Dev | +8.00h (logged Mon) |
| DatNT | **8.00h** | Dev (not in Summary yet) | 0.00h (stable — logged Mon already) |
| LamLQ | **0.00h** | Dev | 0.00h |
| HaVS | **0.00h** | Dev (not on plan) | 0.00h |
| PhatDLT | **4.50h** | QC | +1.00h |
| HungPN | **0.00h** | QC | 0.00h |

Dev total W23 (VuTQ+ThinhT+ViTHT+DatNT+LamLQ): **24.00h** / plan 142h (16.9%).
QC total W23 (PhatDLT+HungPN): **4.50h** / plan 30.5h (14.8%).
Grand total W23: **36.50h** (from Summary row 28 total column).

**Update vs Apr 21:** VuTQ, ThinhT, ViTHT all logged Monday hours (+8h each). Pattern: devs filling Mon log on Tue/Wed morning — consistent with prior weeks.

---

### Part 3 — Plan vs Actual

| Dev | Plan W23 | Actual W23 (3 days) | Expected pace (60%) | Delta |
|-----|----------|---------------------|---------------------|-------|
| VuTQ | 40h | 8.00h | ~24h | -16h (behind, only Mon logged) |
| ThinhT | 12h | 8.00h | ~7.2h | +0.8h (on track) |
| ViTHT | 40h | 8.00h | ~24h | -16h (behind, only Mon logged) |
| DatNT | 40h | 8.00h | ~24h | -16h (behind, only Mon logged) |
| LamLQ | 10h | 0.00h | ~6h | -6h (no log yet) |
| HaVS | — | 0.00h | — | Not on plan |
| PhatDLT | (QC 30.5h) | 4.50h | ~18.3h | -13.8h (behind) |
| HungPN | (QC 30.5h) | 0.00h | — | No log (OK if PhatDLT covering) |

**Note:** Tue+Wed hours not yet logged for most devs. Re-check Thu/Fri when week completes.

---

### Part 4 — Capacity & Runway

Source: Est vs Charged tab, excluding "Deployed on Live" and "Cancelled" statuses.

| Metric | 04-21 | 04-22 | Δ |
|--------|-------|-------|---|
| Remaining est (NS+IP only) | 158.25h | **351.00h** | +192.75h |
| Remaining est (all active excl. Live/Cancelled) | 238.00h | **742.00h** | +504.00h |
| Runway @ 90h/wk (NS+IP) | 1.76 wk | **3.90 wk** | +2.14 wk |
| Runway @ 142h/wk (NS+IP) | 1.11 wk | **2.47 wk** | +1.36 wk |

**⚠️ SIGNIFICANT CHANGE:** Runway jumped from 1.76 → 3.90 weeks (NS+IP). New tasks added to Est vs Charged since yesterday:
- **#2775** (Not Started, est 60h) — newly listed
- **#2837** (In-progress >50%, est 16h) — newly listed
- **#2836** (In-progress >50%, est 0h — no est yet)
- **#2761** (In-progress <50%, est 0h)
- Other NS/IP tasks may have had status changes

This represents new work in the pipeline — backlog replenishment is positive but unestimated tasks (#2836, #2697) need estimates assigned.

---

### Part 5 — Over-estimate Tracking

Mandatory check: #2595, #2615, #2735.

| Task | Est | Actual 04-21 | Actual 04-22 | Over% | Status | Trend |
|------|-----|-------------|-------------|-------|--------|-------|
| #2735 Pro Send Smart Link | 90h | 111.50h | **115.00h** | +28% | In-progress (>50%) | ⚠️ STILL GROWING (+3.5h) |
| #2615 Gift of Choice | 12h | 102.75h | **106.75h** | +790% | Deployed on Staging | ⚠️ STILL GROWING (+4.0h) |
| #2595 GiftDrop Redemption | 120h | 168.25h | **168.25h** | +40% | Deployed on Staging | Stable |
| #2702 Accessibility | 8h | 16.00h | **20.50h** | +156% | In-progress (>50%) | ⚠️ STILL GROWING (+4.5h) |
| #2742 GoC select/payment | 12h | 20.25h | **20.25h** | +69% | Not Started | Stable (status mismatch persists) |
| #2640 | 12h | 16.75h | **16.75h** | +40% | In-progress (<50%) | Stable |
| #2695 | 20h | 26.00h | **26.00h** | +30% | In-progress (<50%) | Stable |
| #2639 Active/Inactive cats | 2h | 16.50h | **16.50h** | +725% | Deployed on Staging | Stable |
| #2501 | 4h | 25.50h | **25.50h** | +538% | Deployed on Staging | Stable |
| #2380 checkout date | 4h | 25.25h | **25.25h** | +531% | Deployed on Staging | Stable |
| #2627 | 0.5h | 8.25h | **8.25h** | +1550% | Has Bug on Live | Stable |
| #2624 order complete | 12h | 31.25h | **31.25h** | +160% | Dev Done | Stable |
| #2604 | 1h | 3.50h | **3.50h** | +250% | Deployed on Staging | Stable |
| #2666 | 2h | 5.00h | **5.00h** | +150% | Deployed on Staging | Stable |
| #2629 | 8h | 18.25h | **18.25h** | +128% | Dev Done | Stable |
| #2816 | 20h | 24.50h | **24.50h** | +22% | Deployed on Staging | Stable |
| #2815 | 6h | 9.00h | **9.00h** | +50% | Not Started | Stable |

**Active growing tasks:** #2735 (+3.5h today), #2615 (+4h today), #2702 (+4.5h today). All three were tasks where devs logged Monday hours. Watch again Thursday.

**#2742 status anomaly** still unresolved ("Not Started" with 20.25h actual) — needs lead update.

**New over-est tasks noted today (not in prior report):** #2837 est 16h, actual 17.5h → +9% (just under threshold — watch).

---

### Trello

Board: [Web Development (Fountain)](https://trello.com/b/UDrSWage) — id `5475eaf923a9a1309357eb51`, auth as @rick570.

**Customer comments since 2026-04-21 08:40 +07** (kunalsheth, tmmckay, mike62798179, iris63293413) — **9 comments** (all from Apr 21):

1. **2026-04-21T03:40Z** — @kunalsheth on [Fountain - Pro/Send - Smart Link](https://trello.com/c/yrbbFhf9) (#2735): "this is a rare edge case, user can just delete other items if needed." (followup to yesterday's question)
2. **2026-04-21T13:32Z** — @kunalsheth on [Fountain & Infinity - Add Subtle Scroll Animations](https://trello.com/c/g5SK007L): "for this I like how apple does it — [apple.com/education](https://www.apple.com/education/). However this is low priority."
3. **2026-04-21T13:32Z** — @mike62798179 on [Shipstation creating a 2nd or even a 3rd shipment](https://trello.com/c/BYu5iwQM): "Order # 6463844QN was 2 shipments and slipped by me." (bug report, order numbers listed)
4. **2026-04-21T13:34Z** — @mike62798179 on [Shipstation 2nd/3rd shipment](https://trello.com/c/BYu5iwQM): "I am going to cancel the 2nd and 3rd shipments for now. List of order numbers: 6819370EU..." (**URGENT BUG — multiple duplicate shipments**)
5. **2026-04-21T15:48Z** — @mike62798179 on [Shipstation 2nd/3rd shipment](https://trello.com/c/BYu5iwQM): "Another one: 1632502YI"
6. **2026-04-21T15:51Z** — @kunalsheth on [Fountain & Infinity - Update order routing to new shipstation](https://trello.com/c/dCuIyKDd): "I am ready to push infinity to new shipstation account tonight if you are" (prod deployment coordination)
7. **2026-04-21T18:27Z** — @kunalsheth on [Infinity roses - orders not syncing](https://trello.com/c/y8lM8Alq): "Just placed two test orders on infinity and both not syncing to shipstation. Orders earlier are syncing." (**NEW BUG — shipstation sync failure**)
8. **2026-04-21T18:33Z** — @kunalsheth on [Infinity roses - orders not syncing](https://trello.com/c/y8lM8Alq): "This bug seems caused by user selecting holiday delivery at checkout." (root cause finding)
9. **2026-04-21T18:40Z** — @kunalsheth on [Infinity roses - orders not syncing](https://trello.com/c/y8lM8Alq): "@rick570 This bug is also affecting fountain. We need to fix this." (**URGENT — affects both Fountain & Infinity**)

**No new comments on Apr 22 yet** (as of 08:35 +07).

**Active per-list counts (today vs yesterday):**

| List | Today | Yesterday | Δ |
|------|-------|-----------|---|
| Todo | 32 | 34 | -2 |
| Bugs | 12 | 12 | 0 |
| Doing | 7 | 5 | +2 |
| QC Internal | 6 | 4 | +2 |
| QA Backlog | 2 | 2 | 0 |
| In QA | 2 | 2 | 0 |
| Not Passed | 0 | 0 | 0 |

**Stuck cards (>5 days, active lists): 44 total** (vs 40 yesterday, +4). Top offenders:
- 420d [todo] Fountain & Infinity — Make sites accessible (QHVN496O)
- 420d [todo] Fountain & Infinity — Make page title dynamic (GwCJSlvl)
- 183d [todo] Platform switcher fix (JVLMbyYO)
- 146d [bugs] PayPalHttp::HttpError in paypals#generate_order (6MTnv0Cc)
- 139d [todo] Fountain Pro - Backend Updates (kUkibmUS)
- 117d × 4 [todo] old backlog items (Duplicate Charge, Pro roles, Unit Test, URL case sensitive)

---

## Alerts

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Trello/Shipstation | **Duplicate shipment bug** — @mike62798179 reporting multiple shipments created for single orders (6463844QN, 6819370EU, 1632502YI). Mike is manually cancelling. **URGENT.** | HIGH |
| 2 | Trello/Shipstation | **Infinity orders not syncing to ShipStation** when holiday delivery selected. @kunalsheth: also affects Fountain. Needs fix before new shipstation migration. | HIGH |
| 3 | Over-est | #2735 still growing: 111.5h → 115.0h (+3.5h today) at 28% over 90h est | MEDIUM |
| 4 | Over-est | #2615 still growing: 102.75h → 106.75h (+4h today) at +790% over 12h est | MEDIUM |
| 5 | Over-est | #2702 still growing: 16h → 20.5h (+4.5h today) at +156% over 8h est | MEDIUM |
| 6 | Est vs Charged | **Runway jumped** from 1.76 → 3.90 wk (NS+IP) due to new tasks (#2775 60h, #2837 16h) added | INFO |
| 7 | Task log | LamLQ 0h W23 (on 10h plan) — no logging or no work started | LOW |
| 8 | Task log | HungPN 0h W23 — no alerts if PhatDLT is covering QC | INFO |
| 9 | Trello | Stuck cards +4 (40→44); Doing +2, QC Internal +2 (progress movement positive) | INFO |
| 10 | Trello | @kunalsheth asking Rick about pushing Infinity to new ShipStation tonight — action needed | LOW |
| 11 | Matrix | Token expired at start; auto-refresh succeeded | INFO |

## Google Sheets — 08:39 (+07:00)
| Developer | Today (h) | Status |
|-----------|-----------|--------|
| LongVV | 0.0 | ⚠️ 0h — not logged yet (EOD logging expected) |
| PhucVT | 0.0 | ⚠️ 0h — not logged yet (EOD logging expected) |
| TuanNT | 0.0 | ⚠️ 0h — not logged yet (EOD logging expected) |
| VietPH | 0.0 | ⚠️ 0h — not logged yet (EOD logging expected) |
| KhanhHH | 0.0 | ⚠️ 0h — not logged yet (EOD logging expected) |
| LeNH | 0.0 | ⚠️ 0h — not logged yet (EOD logging expected) |

**Note:** Check run at 08:39 +07:00. All developers show 0h for Wed 22/04 — this is expected at this time of day as task logs are typically filled at end of day. Previous days confirmed present: Mon 20/04 logged by all; Tue 21/04 logged by PhucVT (8h), TuanNT (7.33h), KhanhHH (8h); LongVV and VietPH show 0h Tue (possible missed log or late filing).

**W-sheets used:** LongVV=W3, PhucVT=W22, KhanhHH=W37, VietPH=W24, TuanNT=W20+W21+W24, LeNH=W8+W21+W21+W21

⚠️ **Alerts (pending EOD):** All 6 developers — 0h logged as of 08:39. Re-check recommended at EOD (17:00+).
