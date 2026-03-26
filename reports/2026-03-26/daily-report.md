# Daily Report — 2026-03-26 08:21

**Window:** 2026-03-24T08:49 → 2026-03-26T08:21 (+07:00)

## Alerts

| Severity | Source | Summary | Link |
|----------|--------|---------|------|
| CRITICAL | Email/rick | **FountainGifts prod DB connection refused** (143.198.176.126:25060) — active since 07:15 today | Rollbar alert |
| HIGH | Slack/Equanimity | Face scan "Failed to verify" on 2 production tenants (unitedtecobr, unitedtecnew). Carrick + Will tagged Mar 25 07:02 UTC | https://equanimity-talk.slack.com/ #xid-technologies |
| HIGH | Slack/Generator | Post-release bug: Incident Management feature not visible for serenitypines tenant. Carrick + Violet tagged | https://generatortalk.slack.com/ #triage |
| HIGH | Email/rick | InfinityRoses prod NoMethodError #408: nil user on @order.user_id — 06:16 today | Rollbar alert |
| HIGH | Google Sheets | **KhanhHH 0h** on Mar 25 — no leave note (Generator/Elliott) | |
| HIGH | Google Sheets | **LeNH 0h** on Mar 25 across all 3 projects — no leave note | |
| MEDIUM | Slack/GGS | Prestashop stock sync broken — POs not updating since Mar 13. Nick + Amy investigating | https://globalgrazingservices.slack.com/ #maintenance |
| MEDIUM | Slack/WilliamBills | MWMX subscription upgrade/downgrade creating duplicate subs. DuongDN + QuanLM investigating | https://williambills.slack.com/ #mx |
| MEDIUM | Email/carrick | Snyk vulnerability alert for marcel organization | |
| MEDIUM | Email/rick | FountainGifts ChunkLoadError #857 (Mar 24), FountainStaging shipstation NameError (repeated) | Rollbar/BugSnag |
| MEDIUM | Fountain | ThinhT only 4h this week (Tue only), ViTHT 0h (Mon leave + Wed unfilled), HungPN 0h all week | |
| MEDIUM | Redmine | Paturevision #77819 — expired promo codes accepted at checkout (High priority, New) | https://redmine.nustechnology.com/issues/77819 |

## Source Summary

| Source | Status | Key Findings |
|--------|--------|--------------|
| Email (6) | OK | 103 total; rick@ has Fountain/InfinityRose prod errors; ken@ has 70 Precognize PR notifications; duongdn@ has leave requests |
| Slack (14 ws) | OK (all tokens valid) | 302 msgs; Equanimity face scan failure; Generator post-release bug; GGS stock sync broken; WilliamBills duplicate subs |
| Discord (2 acct) | OK (tokens valid) | Jeff reports PRESENT all 3 days; Vinn sick Mar 24, no formal report Mar 25, posted Mar 26 |
| Google Sheets | OK | LongVV 8h, PhucVT 8h, VietPH 8h, KhanhHH **0h**, LeNH **0h**, TuanNT on leave, DuongDN Marcel 0h (adhoc OK) |
| Scrin.io | OK | TuanNT 0h (consistent with leave). Monthly total: 51h 04m |
| Daily checks | Kai PRESENT, Nick-GG PRESENT, Jeff PRESENT, Vinn PARTIAL | Vinn missed formal report Mar 25 |
| Matrix/Fountain | Token OK, **0 messages returned** | Weekly plan data unavailable — room may be inactive or access issue |
| GitHub | Elena: PRs #291 + #292 open mergeable; Precognize: nusken PR #4750 WIP | Auto-deploy in progress |
| Redmine | OK (13 issues updated) | Fountain Card #2595 bugs (5); Paturevision grazing issues on staging (3); expired promo codes HIGH |
| Trello | Pending | Completion in progress |

## Email Details

### duongdn@nustechnology.com (8 emails)
- VietPH half-day leave Mar 24 morning (approved)
- HaoNV leave Mar 30-31 (approved)
- BinhLQ resignation checklist shared
- LongVV remote today Mar 26
- Finance: tax settlement 2025

### carrick@nustechnology.com (9 emails)
- Elliott Redmine bugs #77838, #77841 (Evacuation Report)
- **Snyk vulnerability alert — marcel org** (Mar 24 20:51)
- BXR London gift card notification

### nick@nustechnology.com (0 filtered)
No John Yi related emails.

### rick@nustechnology.com (15 emails)
- **[CRITICAL] FountainGifts prod DB connection refused** (Mar 26 07:15) — ActiveRecord::ConnectionNotEstablished to 143.198.176.126:25060
- **[HIGH] InfinityRoses prod NoMethodError** (Mar 26 06:16) — nil user on @order.user_id
- FountainGifts ChunkLoadError #857 (Mar 24)
- FountainStaging shipstation:reconcile_shipments NameError (repeated Mar 24)
- Rollbar daily summaries for Fountain + InfinityRoses

### kai@nustechnology.com (1 filtered)
- Jira weekly update for Mar 24 from Madhuraka

### ken@nustechnology.com (70 filtered)
- Active Precognize/development PR review traffic
- PRs: #4791 (hybrid time config), #4792 (rest-to-socket), #4793 (investigation close API), #4794 (part-type migration), #4795/#4797 (dateRange chaining), #4796 (missed event fix), #4750 (WIP DPP upgrade)

## Slack Details

### Baamboozle (16 msgs)
- #testing: Carrick & skjamie25 coordinating word-filter fix (PR #581 "Titus" search) — confirmed good Mar 25
- Stripe seat-billing under test
- skjamie25 unavailable Tue (ER visit), resumed Wed

### RDC FM Monitoring (30 msgs)
- #all-rdc-fm-monitoring: Carrick fixed SSL on turkiye.fmscan.com; set up waqdiiqo.fmscan.com subdomain (weak signal/connection instability)
- Client requesting: Turkish label fix, dark-blue color scheme, cosmetic changes
- fmscan.com restructuring deferred to today

### Swift Studio (17 msgs — #bxr__app)
- Jeff: 2FA ready, needs backend deploy for full release
- Carrick: Gift card system pushed to dev today. Internal API next task
- Roryh: Asked if Jeff released updated app to Google Play (pending)

### Xtreme Soft Solutions (42 msgs)
- **Kai daily reports: PRESENT Mar 24 + Mar 25**
- Mar 24: LIFM2-268 QA Feedback Done, TP-15 feedback Done
- Mar 25: TP-15 Done, LIFM2-429 Discount Price Done (→QA), LIFM2-268 In Progress
- Globo Smart Product Filter pricing discussion (25k+ products)
- Kai accidentally submitted live quote on test email (alerted Madhuraka)

### SAM GUARD (43 msgs)
- #mql-leads: 17 HubSpot MQL lead notifications
- #dp-code-review: PR #4750 date format review (Ken NUS)
- #mobile-project: Android 16KB page size compliance — Tony fixing within 5h budget
- #process-digital-plant: DP-654 assigned to Kfir

### Global Grazing Services (100 msgs)
- **Nick daily reports: PRESENT Mar 24 (late post) + Mar 25**
- Mar 24: Grazing Issues 38/39 → staging, Issue 40 In Progress, Issues 57/58 In Progress
- Mar 25: Fix mapquote + grazing deployed live, Issue 40 → staging, mobile map scroll fixed
- **Stock sync bug:** Console POs not updating Prestashop (PO-570600, PO-679765, PO-110800, PO-509304). Active investigation since Mar 13.
- Joey unavailable Mar 25; print button deferred to today
- Issues 57 & 58 deployed live Mar 25

### Amazing Meds (8 msgs)
- #web-dev-with-nick: John asked Nick to update theamazingmethod.com/about page (Deborah bio) — Mar 26 00:23
- #email-marketing-dept: New blog published (Ozempic prior auth guide)
- #it-dept-all: parvsaini031 completed Deals pipeline, Fulfillment stage, Shipment module updates

### Generator (36 msgs)
- **Production release Mar 25:** tickets 435, 634, 715 and others deployed live
- **POST-RELEASE BUG:** Rudi unable to view Incident Management after enabling it (serenitypines tenant). Tagged Carrick + Violet for Mar 26 investigation
- Carrick: Reviewed PRs API #293 + CMS #320; Laravel 10 upgrade post-release fixes; working on 630 (Calendar View)
- stagingPhase2 branch deviation discussed
- Jeff running low on tasks — Elliott/Rudi to provide more

### LegalAtoms (8 msgs)
- Release delayed 1 week (holidays), targeting this Thursday
- Manual test cases created post-release
- Florida divorce/indigent document county mappings (GitHub issue #18524)

### MyPersonalFootballCoach (8 msgs)
- tien271 requested Vimeo ID in dashboard/weekly_plan API — freelancer confirmed added. Resolved.

### William Bills (19 msgs)
- **Bug:** Upgrade/downgrade plan creating duplicate subscriptions. DuongDN + QuanLM + Lucas investigating
- Giveaway API fix: QuanLM fixed /wp-json/headless/v1/page/giveaways
- DuongDN updated giveaway page content; Oliver requested copy changes

### Equanimity (5 msgs)
- **[HIGH] Face verification failure** on 2 production tenants (unitedtecobr.xidtech.com, unitedtecnew.xidtech.com). After uploading face template + syncing to device successfully, device users unable to scan — "Failed to verify." Client mani.annadurai tagged Carrick + Will Nguyen Mar 25 07:02 UTC.

### SoCal Auto Wraps — 0 msgs
### Aigile Dev — 0 msgs

## Discord Details

### AirAgri (nusvinn)

**Jeff (airagri-flutter):**
- Mar 24: Fix signature form, Toolbox Talk UI + Forms, deployed Visitor App to store
- Mar 25: Custom forms update, Hazard + Near Miss UI, Hazard Form API integration. iOS Check-in App approved on App Store. Firebase mobile notifications setup complete (waiting on Vinn for backend)
- Mar 26: Fix Android Check-in deployment, Contractor App SAR screen UI + API, Insurances Owner screen UI. Check-in app live on Google Play. 1h FlutterFlow per James request.

**Vinn (airagri_webapp):**
- Mar 24: **Sick, absent** (Jeff & James noted)
- Mar 25: No formal daily report. Active in chat re: visitor DB refactor (est 16-20h, James pushed to finish by tomorrow night). James flagged Vinn missing Discord messages at night.
- Mar 26: "Handle API HMD device, Refactor Visitor feature (Testing)". Delivered HMD device staging API endpoint.

### Bizurk (nuscarrick)
No readable channels with activity (Missing Access — known limitation).

## Developer Hours — Mar 25 (Wednesday)

| Developer | Project | Hours | Status | Notes |
|-----------|---------|-------|--------|-------|
| LongVV | Xtreme Soft | 8h | OK | TP-15 1h + LIFM2-429 4h + LIFM2-268 3h |
| PhucVT | James Diamond | 8h | OK | |
| VietPH | Paturevision | 8h | OK | PHP maintenance + mapquote fixes |
| KhanhHH | Generator/Elliott | **0h** | **ALERT** | No hours logged, no leave note |
| DuongDN | Marcel | 0h | OK | Adhoc project, 0h expected |
| LeNH | BXR+RDC+Baamboozle | **0h** | **ALERT** | 0h all 3 projects, no leave note |
| TuanNT | AmazingMeds+Rebecca+Bailey | 0h | OK (leave) | "Nghỉ cả ngày" Mon-Wed confirmed |

### TuanNT vs Scrin.io (Mar 25)
- Task log total: 0h | Scrin.io: 0h → **Match** (on leave)
- Monthly Scrin total: 51h 04m

### Rebecca/WilliamBills Task Log Status
- Mon-Wed: "Nghỉ cả ngày" (full day off) — task log "Chưa" but leave days exempt

## Fountain

### Weekly Totals — W19 (Mar 23-29)

| Dev | Role | W19 Actual (partial) | Mar 25 | Status |
|-----|------|---------------------|--------|--------|
| VuTQ | Dev | 24h | 8h | OK |
| ThinhT | Dev | 4h | 0h | LOW — only logged Tue 4h |
| ViTHT | Dev | 0h | 0h | LOW — Mon leave, Wed rows unfilled |
| PhatDLT | QC | 9h | 3h | OK |
| HungPN | QC | 0h | 0h | LOW — no entries this week |
| HaVS | Dev | 0h | 0h | No entries |

**Matrix weekly plan:** Unavailable — Fountain room returned 0 messages. Cannot compare plan vs actual.

**Capacity & runway:** Data pending — requires Matrix plan + "Est vs Charged" tab.

**Over-estimate tracking:** Redmine shows Card #2595 has 5 active bugs (2 Resolved, 3 New). Active development ongoing.

### Fountain Redmine Activity
- #77865: [Card 2595] "What include" not shown on swap page → **Resolved** (VuTQ)
- #77831: [Card 2595] "What include" section not displayed → **Resolved** (VuTQ)
- #77868: [Card 2595] Shows old gift instead of swapped gift → New
- #77827: [Card 2595] Error message shows raw code → New
- #77832: [Card 2595] "Build a box" gift shows insufficient items → New

### Paturevision Redmine Activity
- #77854: Grazing Issue #40 → **Deployed on Staging** (High)
- #77853: Grazing Issue #39 → **Deployed on Staging** (High)
- #77843: Grazing Issue #38 → **Deployed on Staging** (High)
- #77819: **Expired promo codes accepted at checkout** → New (High) — revenue impact
- #77844: Quote detail/PDF 404 → New (Low)
- #77839: Product accessories toggle missing → New
- #77836: Block selection not highlighting paddocks → New
- #77818: Expand button on short descriptions → New

## GitHub

### Elena-SamGuard (duongdn)
- **PR #292** (fix/redmine/77793): Open, mergeable → auto-deploy in progress
- **PR #291** (DP-648): Open, mergeable → auto-deploy in progress
- PR #290 (DP-648): Closed (superseded by #291)

### Precognize (nusken)
- **PR #4750** (WIP DPP upgrade): Open, still WIP
- PR #4794 (SR-7196): Closed/merged
- PR #4796 (SR-7184): Closed/merged
- PR #4797 (dateRange chaining): Closed/merged
- PR #4793 (SR-7105): Still open

## Trello Status

*(Completion in progress — results pending)*

## Task Log Reminders

| Developer | Mar 25 Status | Reminder |
|-----------|--------------|----------|
| KhanhHH | 0h, no leave | No Matrix room configured — manual follow-up needed |
| LeNH | 0h, no leave | Reminder sent to Matrix room |

## Unresolved Questions

1. **FountainGifts DB connection refused** — is this ongoing or recovered? Needs immediate check.
2. **KhanhHH 0h Mar 25** — was he on leave or forgot to log?
3. **LeNH 0h Mar 25** — confirm if on leave.
4. **Matrix Fountain room 0 messages** — room inactive or access issue? Weekly plan comparison incomplete.
5. **Equanimity face scan failure** — Carrick + Will tagged since Mar 25. What's the status?
6. **Generator serenitypines bug** — Carrick + Violet to investigate today.
7. **TuanNT leave** — confirmed Mon-Wed. Returning Thu 26?
8. **Vinn** — missing formal daily report Mar 25. James flagged communication gaps.
