# Update — 2026-03-20 08:30 (Thu)

Monitoring period: Mar 19 08:00 → Mar 20 09:00 (UTC+7)
Note: Previous refresh (Mar 19 16:16) only checked email. Slack/Discord/etc last checked at daily report time (Mar 19 08:00).

## Email (6 accounts)

Monitoring window: Mar 19 08:00 → Mar 20 08:43 (UTC+7)

| Account | Total | Filtered | Highlights |
|---------|-------|----------|------------|
| duongdn@ | 0 | — | — |
| carrick@ | 2 | — | Stripe health alerts ON, Socalautowraps Rollbar daily summary |
| nick@ | 6 | 0 (John Yi) | 6 misc emails, none matching John Yi filter |
| rick@ | 6 | — | InfinityRoses Rollbar x2, Heroku MFA reminder, FirstProject Rollbar, FountainGifts Rollbar x2 |
| kai@ | 5 | 2 (Madhuraka) | **LIFM2-429 assigned by Madhuraka** — "Discount Price - Changes" |
| ken@ (NewsLetter) | 165 | 14 (Precognize) | Vladimir: SR-7074 part type columns (PR #4789/#4790), nusdavid: SR-7102 hybrid time API, majdhajjo: SR-7165 rest-to-socket, SR-7191 unit tests |

## Slack Summary (14 workspaces)

Monitoring window: Mar 19 08:00 → Mar 20 09:00 (UTC+7) — 394 msgs total

| Workspace | New | Highlights |
|-----------|-----|------------|
| Generator | 58 | **#triage (42)**: Heavy PR review — Carrick, Ryan, Rudi, Elliott. **#mpdm (16)**: Morning standup, prod bug discussion. |
| Amazing Meds | 32 | **#web-dev-with-nick (29)**: Supabase data mgmt, form builder, step-by-step model. Nick requesting **3 days off next week** (Mon-Wed). Nick daily report: AM Method feedback, get started page. |
| Global Grazing | 24 | **#maintenance (24)**: GLS bug in PrestaShop console. Nick debugging with latest version locally. |
| Swift Studio | 24 | **#bxr__app (13)**: Klaviyo verification, dev env questions. **DM Carrick/Rory (11)**: Dev2 login, push to dev request. |
| SAM GUARD | 18 | **#mql-leads (17)**: HubSpot MQL leads. **#process-digital-plant (1)**: Yuval status — DP-142/DP-580 fixed, SR-7074 needs fix, DP-643 remaining. |
| Baamboozle | 15 | #engineering (9): GitHub notifications. #cancellation-responses (4): Typeform surveys. #customer-success (1). |
| RDC - FM Monitoring | 13 | **#rpi-reboot-logs (4)**: Tuner Instability + Recovery Alerts. #user-access-logs (9): Tuner Access Logs. |
| William Bills | 9 | **#mx (8)**: Ticket loading perf issue (loads all to server memory), architecture discussion — Oliver, QuanLM, Lucas. **DM Ollie (1)**: Lucas requesting 3 days off Mon-Wed. |
| Xtreme Soft | 6 | **Kai off today+tomorrow** — Madhuraka checking availability. Inventory/accounting sync workflow, ticket return discussion with Anoma. |
| MPFC | 2 | #mpdm (2): Feature change discussion — freelancer, tien271. |
| Equanimity | 1 | #xid-technologies (1): komal.bailur requesting Simlian info from NUS Carrick. |
| SoCal Auto Wraps | 0 | — |
| Aigile Dev | 0 | — |
| LegalAtoms | 192 | (conversations.history fallback, see below) |

### LegalAtoms Detail (192 msgs, conversations.history fallback)
- **#labot-accounts-production (67)**: Account registration notifications
- **#api-alerts-prod (38)**: Production error alerts (Rollbar)
- **#labot-important-notifications-production (26)**: .gov emails in global unsubscribe, duplicate filing blocks
- **#labot-filings-production (15)**: Filing notifications, check-in reminders
- **#standup (14)**: Lautaro, M Adnan, Matias, Joaquin, Alirio — in-progress issues, overdue review reminders
- **#tyler-journal (10)**: Texas issue ETA, page 7+ deadline discussion
- **#labot-professional-actions-alpha (7)**: Test actions (okanogan district)
- **#labot-filings-alpha (5)**: Alpha filing
- **#workflows (4)**: Config issue affecting `ahpo_wa` workflow — Raymond, Mir, Alirio
- **#general (3)**: Google Doc shared by Mir
- **#labot-professional-actions-production (2)**: Professional actions
- **#labot-important-notifications-alpha (1)**: Alpha notification

### Session Token Issues
- **Equanimity**: xoxc token expired, 0 msgs. Manual browser re-auth needed.

## Discord

### AirAgri (nusvinn) — 337 msgs

**#airagri_webapp (328 msgs):**
- **CRITICAL P1: Stop Alarm Bug** — James Diamond reported Stop Alarm not triggering for JBS Pork customer (~15:00). Vinn investigated, root cause: group feature conflicted with stop alarm logic.
  - **Hotfix #1 deployed** (17:45) — fixed stop alarm
  - **SOS alarm broke** after fix (18:24) — no SOS notifications
  - James stayed up until 1am AUS time waiting
  - **Hotfix #2 deployed** (22:38) — SOS restored
  - Paul confirmed (03:02 Mar 20): "Looks like it's fixed in time for clients"
  - James confirmed (06:58 Mar 20): "SOS Working, Stop Working, Group Alarm Logic — All working"
- Data-point logic concern: 50s window too narrow (only last 5 data points at 10s intervals)
- GPS tolerance discussion: 0.00004 threshold for stop alarm detection
- Leon: hazard area selection, composer install on dev
- Mary: setting up test devices in AUS, creating Planner tickets
- James requesting device testing daily going forward
- James noted missing production features: file upload, user/expiry against assets

**#airagri-flutter (9 msgs):**
- Jeff: Notify MD feature implemented, button color updated to brand green
- James: flagged incorrect button color (should be green not blue)
- Safety roles access discussion

**Daily Reports:**
- **Vinn** ✓ — Morning (08:31): alarm ability, support Jeff & Leon. Evening (08:45 Mar 20): Stop Alarm P1 fix, SOS fix, Group Escalation logic, hotfix deployed
- **Jeff** ✓ — Morning (08:42): Notify MD, Classify & Assign. Evening (17:29): 4 hours, Notify MD done, iOS TF

### Bizurk (nuscarrick)
- 0 messages (15/16 channels inaccessible — only #welcome readable)

## Matrix/Element — Fountain Weekly Plan vs Actual

Plan posted by **@trinhmtt** on **Mar 19 09:35** (edited from 08:52):

| Dev | Plan (week) | Mon | Tue | Wed | Thu | Actual | Remaining | On Track? |
|-----|------------|-----|-----|-----|-----|--------|-----------|-----------|
| ViTHT | 30h | 8h | 8h | 8h | — | 24h | 6h (Thu+Fri) | ✓ Yes |
| ThinhT | 20h | 4h | 4h | 4h | 4h | 16h | 4h (Fri) | ✓ Yes |
| VuTQ | 36h | 4h | 8h | 8h | — | 20h | 16h (Thu+Fri = 8h/day) | ⚠️ Tight |
| QC (PhatDLT+HungPN) | 21.5h | 3h+— | 3h+2h | 3h+— | — | 11h | 10.5h (Thu+Fri) | ❌ Behind |

**QC pool behind:** 11h done vs 21.5h plan. Need 10.5h in 2 days — unlikely at current PhatDLT 3h/day + HungPN near-zero pace.

### Capacity & Runway (Est vs Charged sheet)

| Metric | Value |
|--------|-------|
| Dev capacity | 86h/week (ViTHT 30 + ThinhT 20 + VuTQ 36) |
| **Active scope** (Not Started + In-progress) | **184.8h** |
| **Runway** | **~2.1 weeks** |
| Buffer (Dev Done + Deployed on Staging) | 51.3h (if tasks extend) |

**Remaining scope breakdown (active dev work only):**

| Status | Remaining (est - actual) |
|--------|------------------------|
| Not Started | 94.0h |
| In-progress (<50%) | 81.3h |
| In-progress (>50%) | 9.5h |
| **Active scope** | **184.8h** |

Excluded: On Hold (8.5h), Pending (36.5h), Blank status (73.0h), Dev Done (26.8h), Deployed on Staging (24.5h)

New tasks added this week: #2775 Navigation Refactor 60h, #2783 1h, #2742 12h.

### Over-Estimate Tasks (growing)

| Task | Est | Actual | Over% | Status |
|------|-----|--------|-------|--------|
| #2595 GiftDrop Redemption | 120h | **168.25h** | 40% | Deployed on Staging — **still growing** |
| #2615 Gift of Choice Gift Cards | 12h | **79.25h** | 560% | Deployed on Staging |
| #2624 | 12h | 31.25h | 160% | Dev Done |
| #2501 | 4h | 25.50h | 538% | Deployed on Staging |
| #2523 | 16h | 61.00h | 281% | Deployed on Live |

**#2595 watch:** 168.25h actual vs 120h est, still growing. Was 168h yesterday — minimal change but trend needs monitoring.

### Big Upcoming (est > 30h)

| Task | Est | Actual | Status |
|------|-----|--------|--------|
| #2775 Navigation Refactor | 60h | 0h | New, blank status |
| #2735 Smart Link | 60h | 53.75h | In-progress (<50%) |
| #2587 GiftDrop Redemption | 40h | 3.5h | Pending |
| #1178 Implement Reviews | 40h | 0h | Not Started |

### Untracked Scope
- 12 Trello cards in active lists have no Est vs Charged entry (mostly bugs + old To-Do)
- 3 tasks have blank status in sheet (#2775 60h, #2783 1h, #2742 12h)

## GitHub PRs

### Elena-SamGuard-Digital-Plant (duongdn)
- **No open PRs.** PR #288 (DP-650, was blocked) now resolved/closed.
- Change from yesterday: PR #288 no longer open.

### Precognize/development (nusken)
- PR #4750 (WIP DPP upgrade) still open 24 days. No new nusken PRs.

## Web — samguard.co
- HTTP 200, 152KB, no JS errors. OK.

## Redmine
- #77734: **Deployed** confirmed.
- 0 tickets updated today.

## Google Sheets — Employee Task Log Hours (Mon 16 → Thu 20)

### Single-Project Employees

| Employee | Project | Mon | Tue | Wed | Thu | Status |
|----------|---------|-----|-----|-----|-----|--------|
| LongVV | Xtreme Soft | 8h | 8h | 8h | — | Thu not filled yet |
| PhucVT | James Diamond | 8h | 8h | 4h | — | Wed: half-day off (paid leave), OK. Thu not filled. |
| VietPH | Paturevision | — | 8h | 8h | 8h | Mon: full-day off (paid leave), OK. ALL OK. |
| KhanhHH | Generator App | 8h | 8h | 8h | 8h | **ALL OK** |
### Multi-Project Employees

**TuanNT** (3 projects combined):

| Project | Mon | Tue | Wed | Thu |
|---------|-----|-----|-----|-----|
| Paturevision | 3h | — | — | — |
| William Bills | 2h | 3.5h | 7.5h | — |
| John Yi | 3h | 4h | 1h | — |
| **TOTAL** | **8h** | **7.5h** | **8.5h** | **—** |

Tue 7.5h slightly low (-0.5h). Thu not filled yet.

**LeNH** (3 projects combined):

| Project | Mon | Tue | Wed | Thu |
|---------|-----|-----|-----|-----|
| BXR App | 9.3h | 8.7h | 8.7h | 9.8h |
| Radio Data Center | — | — | — | — |
| Baamboozle | — | — | — | — |
| **TOTAL** | **9.3h** | **8.7h** | **8.7h** | **9.8h** |

All hours under BXR App. **Hours OK.**

### Fountain Team

| Employee | Role | Plan | Mon | Tue | Wed | Thu | Status |
|----------|------|------|-----|-----|-----|-----|--------|
| ViTHT | Dev | 30h (6h/day) | 8h | 8h | 8h | — | Thu not filled yet |
| ThinhT | Dev | 20h (4h/day) | 4h | 4h | 4h | 4h | **OK** — matches plan |
| VuTQ | Dev | 36h (7.2h/day) | 4h | 8h | 8h | — | Mon 4h **LOW** vs 7.2h plan. Thu not filled. |
| PhatDLT | QC | 21.5h QC pool | 3h | 3h | 3h | — | **LOW** (3h/day). Thu not filled. |
| HungPN | QC | 21.5h QC pool | — | 2h | — | — | **CRITICAL LOW** — Mon/Wed/Thu not filled |

## Scrin.io — TuanNT/Nick Cross-Reference (John Yi project only)

| Day | John Yi GSheets | Scrin.io | Docs <= Scrin? |
|-----|----------------|----------|----------------|
| Mon 16 | 3h | 3.0h | ✓ OK |
| Tue 17 | 4h | 4.0h | ✓ OK |
| Wed 18 | 1h | 1.1h | ✓ OK |
| Thu 19 | — | 7.5h | Not filled yet |
| Fri 20 | — | — | Today |

**All OK.** John Yi task log hours match Scrin.io tracking Mon-Wed.

## Trello

### Check Progress
**18/19 complete** — Only **Fountain** left incomplete (HungPN/PhatDLT low hours)

### Check Mail
**6/6 complete** ✓

### Fountain Board
- Doing: 3 cards | Bugs: 15 | To-Do: 38 | Not passed: 2
- **Hard to release:**
  - [#2695 Gift of Choice Flow](https://trello.com/c/DfP5ExzX) — 37 days in Doing
  - [#2640 GiftDrop Preview](https://trello.com/c/poDqYoiE) — 42 days in Doing
- No new customer comments

## Alerts

| Priority | Alert |
|----------|-------|
| **HIGH** | HungPN (Fountain QC): Only 2h logged all week (Mon/Wed/Thu not filled) |
| **HIGH** | PhatDLT (Fountain QC): 3h/day consistently, low vs 21.5h QC pool |
| ~~HIGH~~ | ~~TuanNT Scrin.io~~ — **RESOLVED**: John Yi hours match Scrin.io (was incorrectly comparing total across 3 projects) |
| **HIGH** | AirAgri P1: Stop Alarm + SOS Alarm bugs — 2 hotfixes deployed (17:45 + 22:38 Mar 19). Confirmed working Mar 20 morning. |
| **HIGH** | Nick (Amazing Meds) + Lucas (William Bills): Both requesting 3 days off next week (Mon-Wed) |
| **MEDIUM** | VuTQ Mon: 4h (below 8h) |
| **MEDIUM** | TuanNT Tue: 7.5h (slightly below 8h) |
| **MEDIUM** | Generator: Very active PR review day (58 msgs) — heavy #triage activity, Carrick/Ryan/Rudi |
| **MEDIUM** | William Bills: Ticket loading perf issue — loads all to server memory, architecture discussion in #mx |
| **MEDIUM** | James Diamond: data-point logic concern (50s window too narrow) |
| **MEDIUM** | LegalAtoms: 38 api-alerts-prod, workflow config issue affecting `ahpo_wa` |
| **MEDIUM** | Equanimity: komal.bailur requesting Simlian info from NUS Carrick |
| **MEDIUM** | SAM GUARD: SR-7074 still needs fix (Yuval status update) |
| **INFO** | Kai off today+tomorrow (Xtreme Soft) — Madhuraka aware |
| **INFO** | Jeff & Vinn daily reports ✓ posted (Vinn 08:31/08:45, Jeff 08:42/17:29) |
| **INFO** | Fountain cards #2695 (37d) and #2640 (42d) stuck in Doing |
| **INFO** | RDC FM: 3 Tuner Instability Alerts + 1 Recovery Alert in #rpi-reboot-logs |

## Unresolved Questions

1. PhatDLT/HungPN low hours — part-time schedule or genuinely underlogged? (ThinhT OK per 20h/week plan)
2. ~~TuanNT Scrin.io~~ — RESOLVED: compare John Yi sheet only, not total. All OK.
