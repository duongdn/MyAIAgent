# Daily Report — 2026-04-02 (Thursday)

**Period:** 2026-03-31 08:20 → 2026-04-02 08:45 (+07:00)

---

## Email — 08:27 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 10 | 5 Redmine Bailey-Paturevision bugs (all Closed). HR: leave survey, salary transfer, payslip 03/2026, part-time info, public holiday notice. No New Relic alerts. |
| carrick@ | 12 | 2 Redmine Generator bugs (#77954 Leads, #77945 Report Error). 2 Jira BXR-178 from Rory Hackett. Rollbar daily summaries (SoCal). Snyk weekly (Marcel). Stripe backup notice. |
| nick@ | 0 | No emails from John Yi. |
| rick@ | 15 | Rollbar daily: InfinityRoses, FountainGifts. BugSnag **staging** errors: FountainStaging (NoMethodError stripe_webhooks, order:check_succeed_payments, admin/cards#show, ActiveStorage gifts#index). All staging = INFO. |
| kai@ | 16 | Active Jira/Bitbucket: LIFM2-429, 395, 394, 427, 268, 409, 430, XS-17. PR #471 resale price. FW: RMS missing order #2522. |
| ken@ | 48 | Precognize PRs: SR-6940 password, SR-7198 external id, DP-447 area export, versions 25-26, SR-6981 GPU check, SR-7164 Agent Availability. Hierarchy tag-of-tag PR. |

**Alerts:** None
**Trello:** All 6 Check Mail items ✓ complete

---

## Slack — 08:29 (+07:00)

| Workspace | Msgs | Key content | Alert? |
|-----------|------|-------------|--------|
| Baamboozle | 31 | Noah customer praise. Jamie: Quizlet imports failing, invitation emails queue issue (prod). Carrick tech stack upgrade proposal. | No |
| RDC - FM Monitoring | 34 | Carrick: plugin updates, maps deployed to fmscan.com, admin user mgmt, cron proposal. Dmetiner requesting updates. | No |
| Swift Studio | 8 | Rory: time estimates, Jira tasks. Carrick resolved ticket. | No |
| Xtreme Soft | 38 | **Kai daily report Apr 1:** LIFM2-268 done, XS-17 setup, LIFM2-409 Xero, LIFM2-430 in progress. Kai day off Mar 31. | No |
| SAM GUARD | 42 | ~30 HubSpot MQL notifs. Lena/Tony test account access. DP-643 reopened (700 API calls). | No |
| Global Grazing | 57 | **Nick daily report Apr 1:** Cart loading done, Subseller in progress, UI mobile fontsize, Page editor. Bug fixes active. | No |
| Amazing Meds | 75 | John/Gil/Nick: PayPal integration, care plan, webinar updates. **Nick report Apr 1:** AM Method, care plan widget, PayPal plugin. | No |
| Generator | 47 | Violet daily Mar 31 & Apr 1. Release deployed w/ regression (nav label). Rudi urgent fix request. | No |
| LegalAtoms | 58 | Tyler journal: integration testing, document mapping. Texas cert page 3-6 missing. Raymond planning release. User signup Auth0 issues. | No |
| MPFC | 0 | No messages. | No |
| William Bills | 28 | Oliver/Lucas: MWMX text/plugin updates, header nav, auto-logout request, Stripe logo removal. | No |
| Equanimity | 207 | **Server incident:** DB connection refused → Carrick upgraded t2.small→t3.medium, recovered data, fixed nginx. Marcel/Mani tenant issues. DigitalOcean migration discussion. | No (ops work) |
| SoCal Auto Wraps | 0 | No messages. | No |
| Aigile Dev | 15 | Automated Make.com notifs: blog drafts, newsletters ready. | No |

**Alerts:** None

---

## Discord — 08:30 (+07:00)

| Server | Account | Msgs | Key content | Alert? |
|--------|---------|------|-------------|--------|
| AirAgri | nusvinn | 200 | **Vinn:** spray calculator, asset categories. **Jeff daily report Apr 2:** deploy check-in app, contractor screens, notification. **Vinn daily report Mar 31:** deploy visitor, fix device map, firebase. | ⚠️ YES |
| Bizurk (DM) | nuscarrick | 100 | Active Apr 1-2: WordPress coupon plugin — all caps, space prevention, staging tests. Andrew responsive. | No |

**Alerts:**
- ⚠️ **Vinn missing daily report Apr 1 & Apr 2** — last formal report was Mar 31
- Jeff: report Apr 2 present, Apr 1 missing (late response noted)

---

## Google Sheets — 08:35 (+07:00)

| Developer | Mon 30 | Tue 31 | Wed Apr 1 | Week | Status |
|-----------|--------|--------|-----------|------|--------|
| LongVV | 8h | 0h (leave) | 8h | 16h | ✓ OK |
| PhucVT | 8h | 12h | 0h (leave) | 24h | ✓ OK |
| TuanNT (JohnYi) | 0h (leave) | 5.5h | 0h | 5.5h | ⚠️ Apr 1 = 0h |
| TuanNT (Rebecca) | 0h (leave) | 2.5h | 0h | 3h | ⚠️ Apr 1 = 0h |
| **TuanNT combined** | **0h** | **8h** | **0h** | **8.5h** | **⚠️ Apr 1 = 0h, no leave** |
| VietPH | 8h | 8h | 8h | 24h | ✓ OK |
| KhanhHH | active | active | 16h (team) | 64h (team) | ✓ OK |
| LeNH (Rory) | 8.17h | 5.5h | 0h | 13.67h | ⚠️ |
| LeNH (Franc) | 2h | 2h | 0h | 4h | ⚠️ |
| LeNH (Aysar) | 2.33h | 0.5h | 0h | 2.83h | ⚠️ |
| **LeNH combined** | **12.5h** | **8h** | **0h** | **20.5h** | **⚠️ Apr 1 = 0h, no leave** |

TuanNT-Rebecca col P: "Chưa" = normal default (not alert).

**Alerts:**
- ⚠️ **TuanNT:** Apr 1 = 0h across both sheets, no leave note. Scrin.io shows 3.03h tracked → task log not updated.
- ⚠️ **LeNH:** Apr 1 = 0h across all 3 sheets (Rory+Franc+Aysar), no leave note.

---

## Scrin.io — 08:36 (+07:00)

| Metric | Value |
|--------|-------|
| Scrin hours (Apr 1) | 3.03h (182 min) |
| Task log John Yi (Apr 1) | 0h |
| Status | ⚠️ Task log not updated — Scrin shows TuanNT was working |

Activity: "handle feedback update website" — 08:36-10:25, 13:46-14:25, 14:27-15:01.

---

## Upwork — 08:31 (+07:00)

| Workroom | Hours (W) | Daily (Mon/Tue/Wed) | Notes |
|----------|-----------|---------------------|-------|
| Rory (41069448) | 15:30 | 4.67/5.5/5.33 | Normal pace |
| Neural Contract (38901192) | 0:00 | — | Messages only, no task log |
| Aysar (35642393) | 2:50 | 2.33/0.5/0 | Winding down as expected |
| Bailey-VietPH (42545630) | 24:20 | 8/8/8 | Strong |
| Bailey-DuongDN (43093775) | 0:00 | — | Inactive (same as last week) |

**Alerts:** None (Bailey-DuongDN 0h is ongoing, may need follow-up)

---

## Fountain — 08:38 (+07:00)

### Part 1 — Matrix Plan
**Sender:** @trinhmtt:nustechnology.com | **Date:** 2026-03-30 (Sun)

> ViTHT: 30h | ThinhT: 20h | VuTQ: 40h | QC: 22.5h

### Part 2 — Task Log Actuals (W20: Mar 30–Apr 5, in progress)

| Dev | W20 Hours |
|-----|-----------|
| VuTQ | 16.00h |
| ThinhT | 12.00h |
| ViTHT | 24.00h |
| PhatDLT (QC) | 6.00h |
| HungPN (QC) | 0.00h |
| HaVS | 0.00h |
| **Total** | **58.00h** |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Delta | On Track? |
|-----|------|--------|-------|-----------|
| ViTHT | 30h | 24.00h | -6.00h | ✓ Yes (3 days left) |
| ThinhT | 20h | 12.00h | -8.00h | ✓ Yes (3 days left) |
| VuTQ | 40h | 16.00h | -24.00h | ⚠️ Behind — needs ~8h/day |
| QC | 22.5h | 6.00h | -16.50h | ⚠️ Behind pace |

### Part 4 — Capacity & Runway
- **Remaining est (Not Started + In-progress + Pending):** 212.8h
- **Capacity:** 90h/week
- **Runway:** 2.4 weeks

Largest chunks: #2775 Navigation refactor (60h), #1178 reviews (40h), #2587 giftdrop redemption (36.5h), #2524 Duplicate Charge (24h).

### Part 5 — Over-Estimate Tracking

| Task | Est | Actual | % Over | Growing? |
|------|-----|--------|--------|----------|
| #2595 GiftDrop Redemption | 120h | 168.25h | 140% | In QA — likely still growing |
| #2615 Gift of Choice | 12h | 97.25h | **810%** | In QC Internal |
| #2735 Pro/Send Smart Link | 60h | 76.75h | 128% | **YES still growing, <50% done** |

Other overruns: #2523 (381%), #2639 (700%), #2613 (725%), #2624 (260%), #2501 (638%), #2380 (538%).

**⚠️ WARNING:** #2735 at 128% over with <50% completion — could easily double.

### Trello Board (Fountain)
- **Customer comments (24h):** 24 from Kunal Sheth — #2775 Navigation (8), #2624 Order complete (8), #2812, #2810, #2811, #2793, #2640. Mike (#2793), Thomas McKay (#2735).
- **Card counts:** Todo 15 | Bugs 5 | Doing 2 | QC Internal 9 | QA Backlog 1 | In QA 3 | Not Passed 0
- **Stuck (>5 days):** #2599 PayPal (126d), #2788 modal (7d), #2380 checkout (61d), #2742 Gift of Choice payment (15d), #2666 Pro Send (19d), #2615 (5d), #2595 (5d), #2744 FAQ (7d)
- **Hard-to-release (Doing 14+ days):** None

---

## Elena — 08:32 (+07:00)

### PRs (Elena-SamGuard-Digital-Plant)
No open PRs.

### Deploy
Nothing to deploy. All pending actions already DONE (last batch 2026-03-31).

### Precognize (nusken)
| PR | Title | Created |
|---|---|---|
| [#4807](https://github.com/Precognize/development/pull/4807) | Add hierarchy tag-of-tag support and fix asset fetching | 2026-03-31 |

1 open PR from nusken — pending Precognize maintainer review.

### WordPress SamGuard
- Site UP (HTTP 200, 1.8s). CSP header present.
- No CSP violations. Video loading aborts (lazy-load in headless) — monitor.
- **Status:** Clean ✓

**Alerts:** None

---

## Trello — 08:47 (+07:00)

### Check Progress (5 checklists, 22 items)

| Item | Checklist | Status |
|------|-----------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ✓ complete |
| Blake | Normal | ✓ complete |
| John Yi - Amazing Meds | Normal | ✓ complete |
| James Diamond - Vinn | Should do | ⚠️ skipped (Vinn missing daily report) |
| Rory | Closely monitor | ✓ complete |
| Aysar | Closely monitor | ✓ complete |
| Franc | Closely monitor | ✓ complete |
| Elliott | Closely monitor | ✓ complete |
| MPFC | Work | ✓ complete |
| Marcel | Work | ✓ complete |
| Elena - SamGuard | Work | ✓ complete |
| Raymond - LegalAtoms | Work | ✓ complete |
| Neural Contract | Work | ✓ complete |
| Bailey | Work | ✓ complete |
| Andrew Taraba | Work | ✓ complete |
| Rebecca - William Bills | Work | ✓ complete |
| Colin | Work | ✓ complete |
| Fountain | Work | ⚠️ skipped (VuTQ pacing, #2735/#2615 overruns) |

**Result:** 16/18 completed, 2 skipped (alerts).

### Check Mail (6 items)
All ✓ complete: DuongDn, Carrick, Nick, Rick, Kai, Ken

---

## Summary of Alerts

| # | Severity | Source | Detail |
|---|----------|--------|--------|
| 1 | HIGH | Discord/AirAgri | Vinn missing daily report Apr 1 & Apr 2 |
| 2 | MEDIUM | Sheets | TuanNT Apr 1 = 0h, no leave (Scrin shows 3h — task log not updated) |
| 3 | MEDIUM | Sheets | LeNH Apr 1 = 0h on all 3 sheets, no leave note |
| 4 | INFO | Fountain | VuTQ pacing concern: 16h/40h plan, needs ~8h/day remaining |
| 5 | INFO | Fountain | #2735 at 128% over estimate, <50% done, still growing |
| 6 | INFO | Fountain | #2615 at 810% overrun (12h→97.25h) |
| 7 | INFO | Discord/AirAgri | Jeff missing Apr 1 daily report (Apr 2 present) |
| 8 | INFO | Upwork | Bailey-DuongDN 0h two consecutive weeks |

---

## Reminders — 08:42 (+07:00)

- **TuanNT:** Reminder sent to Matrix room → Apr 1 task log missing (0h, no leave)
- **LeNH:** Reminder sent to Matrix room → Apr 1 task log missing (0h across all 3 sheets, no leave)
- LongVV: skipped (Tue leave, Wed 8h — OK)
- PhucVT: skipped (Wed leave — OK)
