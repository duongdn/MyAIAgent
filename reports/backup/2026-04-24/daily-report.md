# Daily Report — 2026-04-24 (Fri) 08:50 (+07:00)

Window: 2026-04-23T09:13 → 2026-04-24T08:37 (Asia/Saigon).

## Critical Alerts

| # | Source | Alert | Severity | Action |
|---|--------|-------|----------|--------|
| 1 | Trello (Fountain) | [Shipstation 2nd/3rd shipment duplication](https://trello.com/c/BYu5iwQM) — kunalsheth + mike62798179 still adding affected orders | HIGH | Escalate / ETA |
| 2 | Fountain over-est | #2735 Pro Send Smart Link grew **+7.5h in 24h** → 125h vs 90h est (+39%) **STILL GROWING** | MEDIUM | Scope review |
| 3 | Fountain plan vs actual | Day-5 pace 58.8% of 142h plan (58.5h short); VuTQ -24h, ViTHT -16.5h, LamLQ -10h, DatNT -8h | MEDIUM | EOD flush |
| 4 | Fountain capacity | NS+IP runway 1.68 wk (flat); broader backlog **+20h** (Staging items not releasing) | MEDIUM | Replenish |
| 5 | Upwork (Neural) | Michael bug report (Compare module file-address passing) unanswered ~23h | MEDIUM | Carrick follow-up |
| 6 | Task log (TuanNT) | 0h on Thu 23/04 across John Yi/Rebecca/Bailey — Scrin.io shows 4h21m actual work → backfill | MEDIUM | Matrix reminder sent ✓ |
| 7 | Task log (LeNH) | 0h on Aysar sheet Thu 23/04 but Upwork Aysar shows 6.0h tracked | MEDIUM | Matrix reminder sent ✓ |
| 8 | Email (Fountain PROD) | Rollbar: [FountainGifts #263/#264 NoMethodError `title` for nil](https://rollbar.com) (10th+ occurrence), #262 Invalid gift params | MEDIUM | Fountain dev |
| 9 | Email (InfinityRoses PROD) | Rollbar #413 RestClient::ReadTimeout | LOW | Fountain dev |
| 10 | Email (Socalautowraps PROD) | Rollbar #52 Can't find variable turnstile | LOW | Dev |
| 11 | Email (Elliott Redmine) | Bug #78274 duplicate push notifications on multi-timeslot events (tested internal staging) | LOW | Elliott/KhanhHH |

## Email — 08:45 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 0 | No emails in window |
| carrick@ | 7 | Redmine Elliott #78274 dupe notifications (staging), JIRA BXR-164 Klaviyo estimate ×2, Upwork Neural Contract ×2, Rollbar Socalautowraps prod + daily summary |
| nick@ | 0 | No John Yi emails |
| rick@ | 17 | Fountain/InfinityRoses Rollbar PROD: InfinityRoses #413 RestClient ReadTimeout ×2, FountainGifts #262 Invalid gift params ×2, #263/#264 NoMethodError `title` ×6 (10th-occurrence escalations), BugSnag FountainStaging PendingMigrationError (staging=INFO), daily summaries |
| kai@ | 9 | Madhuraka/LIFM2 Jira activity by Anoma Wasala: LIFM2-260 Shopify S3, LIFM2-259 S3 bulk upload, LIFM2-432 Listed-Buy tab (@mention Kai), LIFM2-435 total current price display |
| ken@ | 8 | Precognize PRs: #4838 (Sr 6236), #4850 (Sr 7264 ori filter), #4847 (Sr 7071 notes→forwarded), #4841 (Sr 6290 alert mail), #4849 (SR-7222/7224 nested equipments) |

Trello Check Mail: all 6 items ✓ complete.

## Slack — 08:43 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 8 | Carrick pinging Aysar (GitHub issue); Jamie confirmed session management tests pass ([PR #554 ready](https://github.com)) |
| RDC - FM Monitoring | 72 | dmetiner ↔ Carrick on #all-rdc-fm (Spectrum/Metrics plugin translations, v1.3.0); heavy bot logs |
| Swift Studio | 4 | Jeff updated Jira (BXR-164/167); Rory asked to clear sprint before adding more |
| Xtreme Soft Solutions | 10 | Kai DM with Madhuraka — LIFM2-435/259/260 Done + "I'm back" (16h exempt anyway) |
| SAM GUARD - Mobile | 22 | #new-studio-developers: Tom/Lena/Kfir on DEL-7105 v9.2 upgrade (resolved); HubSpot MQLs |
| GLOBAL GRAZING | 25 | Nick posted daily report in #maintenance (Prestashop Q&A deployed, order bug, mobile fixes); Joey frustrated re module cost; Amy responsive |
| Amazing Meds | 13 | John Yi + Nick #web-dev-with-nick — homepage launch approval, 1056px display fix; Gil masterclass update |
| Generator | 100 | Rudi fixed CPU (missing index user_news_reads, 99.5%→23%); Carrick MR #402 fix; Violet daily; Jeff mobile release (Kado/Aura Hub failing) |
| LegalAtoms | 3 | Mirat/Hamid re GitHub issue #19361 blocked (no Nick mentions) |
| MyPersonalFootballCoach | 0 | No messages |
| William Bills | 61 | Lucas ↔ Oliver DM — MWMX giveaways redirect/Facebook issue, subscription complaint (Matthew McNamara), CloudFlare cache purge |
| Equanimity | 8 | Carrick ↔ Komal #xid-technologies — API payload/3-day historical events sgbuildex |
| SoCal Auto Wraps | 0 | No messages (Blake silent) |
| Aigile Dev | 8 | Only bot alerts (Attio, GAiGE, MailerLite); no Colin activity |

No person-status alerts. Amazing Meds + Equanimity xoxc tokens verified via `scripts/slack-verify-tokens.js`.

## Discord — 08:37 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri #airagri_webapp | 42 | Active spray calc/permissions/tasks; Vinn reviewed Leon PR343/346, hotfixed hazard/task; HMD "Bush Beacon" ID integration needed for SafeFarm FE |
| AirAgri #airagri-flutter | 18 | James: Bullitt satellite module review; Jeff integration brief (native code needed); Leon/James hazard→task logic (cases 2&3 merged) |
| AirAgri #safefarm, #general | 0 | Silent |
| Bizurk DM animeworld | 0 | No messages (last: 2026-04-22) — normal low-activity |

- **Vinn daily report:** ✓ posted 2026-04-23T10:30:20 in `airagri_webapp` ("Just report my process today: Update background shadow, Fix input restriction, Check hazard issue, Support testing stop alarm, Change Resolve→Rectified close-on-rectify hazard staging")
- **Jeff daily report:** ✓ posted 2026-04-23T10:40:47 in `airagri-flutter` (jeff_trinh, 4h: Bullitt doc check, configurable interval, background data handling IP)
- **Andrew Taraba:** animeworld DM silent — normal

Tokens valid (nusvinn + nuscarrick).

## Google Sheets — 08:45 (+07:00)

| Developer | Thu 23/04 Hours | Leave | Status |
|-----------|-----------------|-------|--------|
| LongVV (Maddy) | 8.00h | — | OK |
| LongVV (James Diamond) | 0.00h | — | (worked on Maddy) |
| PhucVT (James Diamond) | 8.00h | — | OK |
| KhanhHH (Generator) | 8.00h | — | OK |
| VietPH (Paturevision) | 8.00h | — | OK |
| TuanNT (John Yi / Rebecca / Bailey) | 0.00h | — | **ALERT** (Scrin 4h21m actual, no log) |
| LeNH (Rory / Franc / Aysar / Rebecca) | 0.00h | — | **ALERT** (Upwork Aysar 6.0h Thu, sheet 0h) |

- Rory W8 Thu: KhoaTD (5h+3h) only, no LeNH
- Paturevision Thu: VietPH 8h, HaVS 2.25h, NamNN 6.5h (total 16.75h)

## Scrin.io — 08:45 (+07:00)

- Nick/TuanNT Thu 23/04: **4.35h (4h 21m)**
  - Handle production homepage Elementor AM: 3h 22m
  - Fix screen error 1056px AM: 0h 59m
- John Yi task log W20 Thu: **0h** (seed row present but empty)
- Inflation rule: OK (Scrin ≥ task log). But task log backfill needed.

## Fountain (5-part) — 08:48 (+07:00)

### Part 1 — Matrix Plan (W23, Apr 20–26)

Matrix token expired at subagent time (now refreshed). Used yesterday's captured plan (same week, plan posted Monday only).
Sender @trinhmtt, 2026-04-20T08:48 (+07), edited:

- ViTHT: 40h | ThinhT: 12h | VuTQ: 40h | LamLQ: 10h | DatNT: 40h | HaVS: not on plan | QC total: 30.5h
- Dev plan total: **142h**

### Part 2 — Task Log Actuals (W23, Summary row 28)

| Dev | Actual | Role | Δ vs 04-23 |
|-----|-------:|------|----------:|
| VuTQ | 16.00h | dev | +0 |
| ThinhT | 12.00h | dev | +0 |
| ViTHT | 23.50h | dev | +7.50h |
| HaVS | 0.00h | dev (off-plan) | +0 |
| LamLQ | 0.00h | dev | +0 |
| DatNT | 32.00h | dev | +8.00h |
| PhatDLT | 8.50h | QC | +1.00h |
| HungPN | 7.00h | QC | +7.00h |

Dev total W23: **83.50h / 142h plan (58.8%)**. QC: **15.50h / 30.5h (50.8%)**. TrinhMTT excluded (not QC).

### Part 3 — Plan vs Actual (Day-5 of 5, EOD expected)

| Dev | Plan | Actual | Δ | Verdict |
|-----|-----:|-------:|--:|---------|
| ViTHT | 40h | 23.50h | **-16.50h** | BEHIND |
| ThinhT | 12h | 12.00h | 0 | MET |
| VuTQ | 40h | 16.00h | **-24.00h** | BEHIND |
| LamLQ | 10h | 0.00h | **-10.00h** | NO LOG |
| DatNT | 40h | 32.00h | -8.00h | BEHIND |
| PhatDLT+HungPN QC | 30.5h | 15.50h | -15.00h | BEHIND (HungPN now logging; not alert) |

**Gap: 58.5h short** vs 142h plan on Friday.

### Part 4 — Capacity & Runway

| Metric | 04-23 | 04-24 | Δ |
|--------|------:|------:|--:|
| Remaining NS+IP | 150.75h | 150.75h | 0 |
| Remaining broader (excl. Live+Cancelled) | 230.50h | 250.50h | **+20.00h** |
| Runway @ 90h/wk (NS+IP) | 1.68 wk | 1.68 wk | 0 |
| Runway @ 90h/wk (broader) | 2.56 wk | 2.78 wk | +0.22 |

NS+IP flat — no Todo→Dev feed this week. Broader +20h = Staging/Dev Done accumulating unreleased.

### Part 5 — Over-Estimate Tracking (actual > est × 1.2)

| Task# | Est | Actual 04-23 | Actual 04-24 | Over% | Status | Growing? |
|-------|---:|---:|---:|---:|--------|----------|
| #2627 | 0.5h | 8.25h | 8.25h | +1550% | Has Bug Live | stable |
| **#2615 Gift of Choice** | 12h | 106.75h | 106.75h | +790% | Staging | stable (was growing) |
| #2639 Active/Inactive cats | 2h | 16.50h | 16.50h | +725% | Staging | stable |
| #2501 | 4h | 25.50h | 25.50h | +538% | Staging | stable |
| #2380 checkout date | 4h | 25.25h | 25.25h | +531% | Staging | stable |
| #2702 accessibility | 8h | 21.50h | 21.50h | +169% | IP >50% | stable |
| #2624 order complete | 12h | 31.25h | 31.25h | +160% | Dev Done | stable |
| #2742 GoC select/payment | 12h | 20.25h | 20.25h | +69% | Not Started | stable (status anomaly) |
| **#2595 GiftDrop** | 120h | 168.25h | 168.25h | +40% | Staging | stable |
| **#2735 Pro Send Smart Link** | 90h | 117.50h | **125.00h** | **+39%** | IP >50% | **STILL GROWING +7.5h** |
| #2821 | 1h | 2.00h | 2.00h | +100% | Dev Done | stable |

### Part 6 — Trello Board ([Web Development](https://trello.com/b/UDrSWage))

**Customer comments (21):** kunalsheth 7, tmmckay 4, mike62798179 1.

Hotspots:
- [Shipstation 2nd/3rd shipment](https://trello.com/c/BYu5iwQM) — customers still adding affected orders (#2766949BC)
- [Infinity Product page update](https://trello.com/c/rRU4Qk4n) — dropbox assets delivered
- [Infinity Update homepage](https://trello.com/c/S0M1pEOs) — new assets delivered
- [Infinity Custom Roses page](https://trello.com/c/ElD5EOmr) — dropbox link delivered
- [Infinity Cart/Checkout](https://trello.com/c/TAopocTs) — tmmckay: "ready to pick up"
- [Update breakpoints](https://trello.com/c/0xVWmSqK) — tmmckay desc saved
- [Fountain Product page / Free branded pickup](https://trello.com/c/ixGA5FuX) — kunalsheth: "push live"

**Active:** Todo 32 | Bugs 8 (+1) | Doing 6 | QC Internal 6 (-1) | QA Backlog 3 (+1) | In QA 2 | Not Passed 0 | Total 57 (-2).
**Stuck (>5d):** 37 (-4 vs 04-23). Worst: 185d Platform switcher, 148d PayPalHttp, 141d Fountain Pro Backend.
**Doing 14+d:** 1 — [Fountain States/scrolling login](https://trello.com/c/clSdoRlL) **20d** (+1).

## Elena — 08:41 (+07:00)

### Internal Elena PRs
No open PRs in `nustechnology/Elena-SamGuard-Digital-Plant`.

### Precognize (nusken) PRs
No open PRs authored by `nusken`.

### samguard.co WordPress
- HTTP 200, no console errors, no CSP violations.
- Failed network requests: analytics/ads blocked (ERR_ABORTED — headless/no-cookie artifact) + 4 hero MP4 aborts (likely headless teardown, worth manual re-check).

`.elena-pending-actions.json` — all `merged[]` items DONE; `deployed_no_status_update` retains DP-648/DP-650 (no Redmine for DP tickets); `pending_deploy`/`blocked` empty.

## Upwork — 08:44 (+07:00)

| Workroom | Client | Dev | This Week | Status |
|----------|--------|-----|----------:|--------|
| Rory | Rory Hackett | LeNH | 0:00 | Ad-hoc (expected) |
| Aysar | Aysar K | LeNH | **24:50** | Active (Mon 2.17 / Tue 8.17 / Wed 8.5 / Thu 6.0) |
| Bailey DEV1 | Bailey Joey | VietPH | 25:00 | Active (Mon 7.5 / Tue 8.0 / Wed 7.0 / Thu 2.5) |
| Bailey DEV3 | Bailey Joey | DuongDN | 0:00 | Inactive (expected) |
| Neural Contract | Neural Contract | external | 0:00 | Messages-only |

### Neural Contract Messages (since 04-22)

- **Apr 23 09:53 UTC — Michael (client):** Bug report: Compare module passes address of FIRST file instead of SECOND (ReportController.php ~line 1066). Attached Mutual Confidentiality Deed.docx + ACME Services Agreement.docx. **No reply from Carrick ~23h.**
- Apr 23 07:41 UTC — Carrick: "Updated and pushed code, include analyze risk. Let check"
- Apr 23 07:03 UTC — Carrick: "Let me check"
- Apr 23 06:53 UTC — Michael: bug report on live.pl argument order
- Apr 22 07:02 UTC — Carrick: pushed fix, reduce-risk option position issue
- Apr 22 06:29 UTC — Carrick: "I noted. Let me arrange for this"
- Apr 22 03:05 UTC — Michael: non-urgent change request (Compare: pass both file names `=`-separated as 5th arg)
- Apr 21 09:19 UTC — Carrick: holiday notice (team off Apr 27 Hung Kings Day)

## Trello Updates — 08:50 (+07:00)

**[Check Mail](https://trello.com/c/2GJbWxrv) (6/6 ✓):** DuongDn, Carrick, Rick, Kai, Ken, Nick — all complete.

**[Check Progress](https://trello.com/c/BVnpY6pi) (14/19 ✓ / 5 skipped):**

✓ Complete: Maddy, Blake, James Diamond, Rory, Franc, Elliott, MPFC, Marcel, Elena SamGuard DP, Raymond, Bailey, Andrew Taraba, Colin, Elena WordPress SamGuard.

⚠️ Skipped (alerts):
- John Yi - Amazing Meds → TuanNT 0h task log (Scrin 4h21m unlogged)
- Aysar → LeNH Aysar sheet 0h vs Upwork 6.0h Thu
- Neural Contract → Michael bug unanswered ~23h
- Rebecca - William Will → TuanNT 0h task log
- Fountain - DOCUMENT → #2735 still growing + Plan vs Actual 58.5h short + Shipstation HIGH + broader backlog +20h

## Reminders — 08:50 (+07:00)

- TuanNT: ✓ Matrix reminder sent to `!knbJbIKzXRJNGVFQNg:nustechnology.com` (event $3_11sZkh5WXdlSXryLCER3yt984aX6yB1Tszul-O3I4)
- LeNH: ✓ Matrix reminder sent to `!OIrgPraJWrcDTnRVLQ:nustechnology.com` (event $HGAhAiXwyWyVyOQKk-5DW3NXOAu9BsjRnkqy6Fhm4FY)
- LongVV: no reminder (8h Maddy logged)
- PhucVT/VietPH/KhanhHH: no reminder (8h OK)

## Unresolved Questions

1. Matrix token auto-refresh script needs longer SSO wait — script landed on chat.nustechnology.com but didn't capture Bearer in 150s timeout. Manual refresh worked.
2. LamLQ 0h all W23 — leave, absent, or tasklog never filled?
3. Broader backlog +20h growth — which Staging items didn't release this week?
4. #2735 Pro Send Smart Link burning +7.5h/day on IP — new scope or underestimate?
5. Shipstation double-shipment HIGH — escalation plan or ETA?
6. samguard.co hero MP4 aborts — manual browser re-check needed to confirm if real issue or headless teardown.
