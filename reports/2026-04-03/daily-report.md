# Daily Report — 2026-04-03 (Thursday)

**Period:** 2026-04-02 08:45 → 2026-04-03 08:37 (+07:00)

---

## Email — 08:30 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 1 | OA leave announcement: Hung Vuong holiday Apr 30 & May 1, 2026. No New Relic alerts. |
| carrick@ | 3 | Generator TestFlight 1.8.6 (56) iOS build. Snyk vulnerability alert for Marcel org. BXR App V5 meeting invite Fri Apr 3 3:30pm. |
| nick@ | 5 | Canda Surveyors daily task report. 4 ClickUp/Sentry issues (RuntimeError, StateMachines, validate surveyor). None from John Yi. |
| rick@ | 15 | Rollbar daily: InfinityRoses (x2), FirstProject (x1), FountainGifts (x2). **Prod errors:** FirstProject #973-#976 TypeError null.title (4x), #859 ChunkLoadError chunk 3730. Figma comments (2). Upwork msgs from Ceyhun/Adil. |
| kai@ | 4 | Jira/Madhuraka: LIFM2-409 import payouts (Anoma updates x2), LIFM2-412 sort collections (Madhuraka mentioned kai). |
| ken@ | 50 | Precognize PRs: SR-6940, SR-7198, DP-447, SR-6981, SR-7164, XWWP-4149 JWT, XWWP-2316 cluster groupings, screenshots runner. Rentle PRs #123-#127. AMOCC #7253-#7254. |

**Alerts:** Fountain prod errors (rick@) — already tracked by team, INFO for monitoring.
**Trello:** All 6 Check Mail items ✓ complete

---

## Slack — 08:32 (+07:00)

| Workspace | Msgs | Key content | Alert? |
|-----------|------|-------------|--------|
| Baamboozle | 3 | Typeform cancellation + Dependabot PR #555 lodash bump (auto). No human dev activity. | No |
| RDC FM Monitoring | 14 | dmetiner assigned Carrick showcase device task list (favicon, logo, RDS Decoder plugin, Turkish version). Carrick pushed Station Logo Plugin v4.0. Tuner disconnect/recovery alerts (auto). | No |
| Swift Studio | 8 | Rory reported AMEX CVV bug (4-digit vs 3), asked Carrick about internal API timeline. BXR meeting held. | No |
| Xtreme Soft | ~95 | **Kai daily report FOUND:** LIFM2-409 support Anoma, LIFM2-431 bulk update perf. Extensive Anoma testing walkthrough (Shopify import, Xero invoices, payout). Madhuraka asked for estimation. | No |
| SAM GUARD | 9 | 9 HubSpot MQL leads (SCADA webinar). Tony asked to retry link. No Elena/DP dev activity. | No |
| Global Grazing | 8 | Joey asked Amy/Nick for backup help. Amy fixing text issue. Nick active on maintenance. No structured Nick daily report. | No |
| Amazing Meds | 30 | **Nick daily report FOUND:** AM Method feedback + mail noti. John asked for SMTP setup, webinar schedule update. Gil fixed DOB issue (human error). Nick updated webinars page. John mentioned 2nd project (payment processor). | No |
| Generator | 7 | Rudi flagged prod errors; **Carrick fixed + MR#332** (EngagementReportService typo). Violet/Elliott discussed Stripe processing fees. | No |
| LegalAtoms | 30 | Mir Tariq driving hearing reminders (promised to clients). Raymond on FL integration tests. Talha/Kafayat on e-filing verification (Osceola/Seminole mapping). No Nick-specific activity. | No |
| MPFC | 0 | No messages. | No |
| William Bills | 66 | Oliver/Lucas active. Deployed: "Entry Numbers" rename (legal), Stripe logo removal, mobile text fixes. Giveaway redirect issue → resolved same-day. Winners boxes staged not deployed. | No |
| Equanimity | ~95 | **Biometric incident discussed:** 36/264 users lost biometric data. Carrick upgraded t2→t3, system restored. Marcel wants device error logging (S3/Cloudflare). Mani reports devices offline. Carrick at 14-15h Upwork limit. | No |
| SoCal Auto Wraps | 0 | No messages. | No |
| Aigile Dev | 2 | CodeDeploy SUCCESS exceltestzone-api prod. BRAiKING NEWS newsletter draft ready. | No |

**Alerts:** None

---

## Discord — 08:33 (+07:00)

| Server | Account | Msgs | Key content | Alert? |
|--------|---------|------|-------------|--------|
| AirAgri | nusvinn | 58 | **Vinn daily report FOUND** (~17:09): support Leon/Jon/Jeff, review PRs, check time/speed limit, fix LoRa SOS alarm. **Jeff daily report FOUND** (~18:25, 8h): door sensor API rename, summary data, timezone, pagination. Leon merged PR#281, opened PR#286 (Incident Investigation). Vinn deployed sensor card to prod. James disappointed with Jon's training/map progress. | No |
| Bizurk (DM) | nuscarrick | 0 | No messages from Andrew Taraba/AnimeWorld in period. | No |

**Alerts:** None

---

## Google Sheets — 08:35 (+07:00)

| Developer | Mon 30 | Tue 31 | Wed 1 | Thu 2 | Week | Status |
|-----------|--------|--------|-------|-------|------|--------|
| LongVV | 8h | 0h (leave) | 8h | 8h | 24h | ✓ OK |
| PhucVT | 8h | 8h | 0h (leave) | 8h | 24h | ✓ OK |
| TuanNT (JohnYi) | 0h (leave) | 5.5h | 0h | 0h | 5.5h | ⚠️ |
| TuanNT (Rebecca) | 0h (leave) | 2.5h | 5h | 0h | 7.5h | ⚠️ |
| **TuanNT combined** | **0h** | **8h** | **5h** | **0h** | **13h** | **⚠️ Thu 2 = 0h** |
| VietPH | 8h | 8h | 8h | 8h | 32h | ✓ OK |
| KhanhHH | 8h | 8h | 8h | 8h | 32h | ✓ OK |
| LeNH (Rory) | 4.67h | 5.5h | 5.33h | 0h | 15.5h | ⚠️ |
| LeNH (Franc) | 2h | 2h | 2.67h | 0h | 6.67h | ⚠️ |
| LeNH (Aysar) | 2.33h | 0.5h | 0h | 0h | 2.83h | ⚠️ |
| **LeNH combined** | **9h** | **8h** | **8h** | **0h** | **25h** | **⚠️ Thu 2 = 0h** |

TuanNT-Rebecca col P: "Chưa" = normal default (not alert).

**Alerts:**
- ⚠️ **TuanNT:** Thu Apr 2 = 0h across both sheets, no leave note. Scrin shows 4.92h → task log not updated.
- ⚠️ **LeNH:** Thu Apr 2 = 0h across all 3 sheets (Rory+Franc+Aysar), no leave note.

---

## Scrin.io — 08:36 (+07:00)

| Metric | Value |
|--------|-------|
| Scrin hours (Apr 2) | 4.92h (295 min) |
| Task log John Yi (Apr 2) | 0h |
| Status | ⚠️ Task log not updated — Scrin shows TuanNT was working |

---

## Upwork — 08:31 (+07:00)

| Workroom | Hours (W) | Daily (Mon/Tue/Wed/Thu) | Notes |
|----------|-----------|------------------------|-------|
| Rory (41069448) | 20:30 | 4.67/5.50/5.33/5.00 | Normal pace |
| Neural Contract (38901192) | 0:00 | — | Inactive 2 consecutive weeks |
| Aysar (35642393) | 2:50 | 2.33/0.50/0/0 | Low, winding down |
| Bailey-VietPH (42545630) | 32:30 | 8/8/8/8 | Strong, consistent |
| Bailey-DuongDN (43093775) | 0:00 | — | Inactive 2 consecutive weeks |

**Alerts:** None (Bailey-DuongDN 0h ongoing, Neural 0h ongoing)

---

## Fountain — 08:38 (+07:00)

### Part 1 — Matrix Plan
**Sender:** @trinhmtt:nustechnology.com | **Date:** 2026-03-30 (Sun)

> ViTHT: 30h | ThinhT: 20h | VuTQ: 40h | QC: 22.5h

### Part 2 — Task Log Actuals (W20: Mar 30–Apr 3, Mon-Thu)

| Dev | W20 Hours |
|-----|-----------|
| ViTHT | 30.00h |
| VuTQ | 24.00h |
| ThinhT | 16.00h |
| PhatDLT (QC) | 9.00h |
| HungPN (QC) | 0.00h |
| HaVS | 0.00h |
| **Total** | **79.00h** |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Delta | On Track? |
|-----|------|--------|-------|-----------|
| ViTHT | 30h | 30.00h | 0h | ✓ Hit plan (1 day left) |
| ThinhT | 20h | 16.00h | -4.00h | ✓ Likely (needs 4h Fri) |
| VuTQ | 40h | 24.00h | -16.00h | ⚠️ AT RISK — needs 16h Fri (impossible) |
| QC | 22.5h | 9.00h | -13.50h | ⚠️ AT RISK — needs 13.5h Fri |

### Part 4 — Capacity & Runway
- **Remaining est (Not Started + In-progress + Pending):** 232.5h
- **Capacity:** 90h/week
- **Runway:** 2.6 weeks
- **Delta vs yesterday:** +19.7h (232.5 vs 212.8 — new tasks added)

### Part 5 — Over-Estimate Tracking

| Task | Est | Actual | % Over | Growing? |
|------|-----|--------|--------|----------|
| #2595 GiftDrop Redemption | 120h | 168.25h | 140% | No — stable this week |
| #2615 Gift of Choice | 12h | 97.25h | **810%** | YES — VuTQ still active |
| #2735 Pro/Send Smart Link | 90h | 77.25h | 86% | Est revised (60h→90h), now under budget |

### Trello Board (Fountain)
- **Customer comments (24h):** 10 from 2 users — Kunal (6: Scroll Animations, ShipStation routing, Navigation, Credit Card, Ground Shipping), Thomas McKay (4: Homepage, Product Page modal, GiftDrop Preview, Smart Link).
- **Card counts:** Todo 195 | Bugs 1268 | Doing 17 | QC Internal 11 | QA Backlog 6 | In QA 4 | Not Passed 1 | Done 957
- **Hard-to-release (Doing 14+ days):** None flagged

---

## Elena — 08:33 (+07:00)

### PRs (Elena-SamGuard-Digital-Plant)
No open PRs.

### Deploy
Nothing to deploy. All pending actions already DONE.

### Precognize (nusken)
| PR | Title | Created |
|---|---|---|
| [#4807](https://github.com/Precognize/development/pull/4807) | Add hierarchy tag-of-tag support and fix asset fetching | 2026-03-31 |

1 open PR from nusken — pending Precognize maintainer review.

### WordPress SamGuard
- **Status:** ⚠️ CSP ERROR
- CSP `connect-src` blocks Google Ads remarketing URL (`https://www.google.com.vn/rmkt/collect/...`)
- **Action needed:** Add `https://www.google.com.vn` to `connect-src` directive

---

## Trello — 08:40 (+07:00)

### Check Progress (5 checklists, 19 items)

| Item | Checklist | Status |
|------|-----------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ✓ complete |
| Blake | Normal | ✓ complete |
| John Yi - Amazing Meds | Normal | ✓ complete |
| James Diamond - Vinn | Should do | ✓ complete |
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
| Fountain | Work | ⚠️ skipped (VuTQ pacing, #2615 overrun, QC behind) |
| Elena - WordPress SamGuard | Pending | ⚠️ skipped (CSP violation found) |

**Result:** 17/19 completed, 2 skipped (Fountain, Elena-WordPress).

### Check Mail (6 items)
All ✓ complete: DuongDn, Carrick, Rick, Kai, Ken, Nick

---

## Summary of Alerts

| # | Severity | Source | Detail |
|---|----------|--------|--------|
| 1 | MEDIUM | Sheets | TuanNT Apr 2 = 0h, no leave (Scrin shows 4.92h — task log not updated). Reminder sent. |
| 2 | MEDIUM | Sheets | LeNH Apr 2 = 0h on all 3 sheets, no leave note. Reminder sent. |
| 3 | MEDIUM | Elena | SamGuard.co CSP violation: connect-src blocks google.com.vn remarketing |
| 4 | INFO | Fountain | VuTQ at risk: 24h/40h plan, needs 16h Fri (impossible) |
| 5 | INFO | Fountain | #2615 at 810% overrun (12h→97.25h), still growing |
| 6 | INFO | Fountain | Runway increased 212.8→232.5h (+19.7h new tasks) |
| 7 | INFO | Upwork | Bailey-DuongDN + Neural Contract both at 0h, 2 consecutive weeks |

---

## Reminders — 08:42 (+07:00)

- **TuanNT:** Reminder sent to Matrix room → Apr 2 task log missing (0h, Scrin shows 4.92h)
- **LeNH:** Reminder sent to Matrix room → Apr 2 task log missing (0h across all 3 sheets)
- LongVV: skipped (Thu 8h — OK)
- PhucVT: skipped (Thu 8h — OK)
</content>
</invoke>