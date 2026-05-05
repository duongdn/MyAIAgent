# Daily Report — 2026-05-01 (Fri, VN Labor Day holiday)

**Window:** 2026-04-29 08:30 +07 → 2026-05-01 12:30 +07 (~52h).
**Dates covered:** Wed 29/04 (working), Thu 30/04 (VN Reunification Day — public holiday), Fri 01/05 (VN Labor Day — public holiday).

## Critical Alerts

| # | Severity | Source | Detail |
|---|---|---|---|
| 1 | **HIGH** | Email/Rick | **FirstProject (Fountain) PROD Rollbar regression expanding** — yesterday's #874 family now fans out to **#875 / #876 e?.credit / .amount**, **#877 / #878 'amount' TypeError (10th + 100th occurrence triggered)**, **#996 ChunkLoadError on infinityroses.com**, **#883 Failed to load Stripe.js**, **#857 React error #418 ×3 bursts**, **NEW #997 / #998 'gift_main' TypeError**, **NEW #879 unexpected server response**. Multiple 10-in-5min bursts overnight 04-30. Likely sustained checkout regression — needs Fountain team review urgently. |
| 2 | MED | Email/Rick | **Kunal forwarded Google Search Console** — pages in sitemap not indexable on fountaingifts.com (04-30). |
| 3 | MED | Fountain | **#2816 Infinity homepage +5h STILL GROWING** (35h → 40h actual, +100% over 20h est). Driven by tmmckay/kunalsheth Tue revisions; expect more. |
| 4 | MED | Fountain/Trello | **Hard-to-release in Doing ≥14d: 2 cards** (was 1) — [Fountain States/scrolling on login](https://trello.com/c/clSdoRlL) **27d**, **Fountain Business (Homepage) Updates 16d (NEW)**. |
| 5 | MED | Fountain/Trello | **NEW customer bug 04-30 18:47Z** — [@mike62798179 c/MgBGamAN](https://trello.com/c/MgBGamAN) — Scheduled-order delivery-fee mis-charge ($8 next-day vs $40 overnight). Same family as #2380 / oHJ5YO8y delivery-date cluster. |
| 6 | LOW | Fountain | **Status anomalies on Est vs Charged**: #2742 (NS but 20.25h logged) persists from 04-29; **#2775 NEW** (NS but 17h on 60h task). Lead update needed. |
| 7 | LOW | Email/Nick | Christina forwarded "Your VPS needs attention — Linux kernel CVE" (04-30). |
| 8 | LOW | Email/Ken | [welligence/WellStack] Rubocop CI failed (nusken push); Supabase security vulnerabilities; Michelle Dinh fwd WyAsk security findings. |
| 9 | LOW | Upwork | **Bailey-VietPH (vinn) Upwork session blocker persists** from 04-29 — cannot verify Upwork ↔ task log match (sheet shows 16h logged Tue+Wed). Needs `node scripts/upwork-login.js --login --account=vinn` interactively. |
| 10 | LOW | Elena | **Precognize check still blocked** — `nusken` token not in `gh` keyring on this host (same as 04-29). PR enumeration failed. Needs `gh auth login --hostname github.com --user nusken` interactively. |
| 11 | INFO | Slack/Generator | 04-30 morning mobile bookables outage — Rudi self-resolved by reverting API change. No outstanding action. |
| 12 | RESOLVED | Fountain | ✅ VuTQ recovered (was −5.9h pace gap on 04-29 → +0.5h above plan). #2702 stopped growing (stable 25h). #2815 status anomaly resolved (NS→Deployed Staging). Dev plan met/exceeded (54.5h/48h). Runway 1.68→2.01 wk (+0.33). |

## Trello — Check Progress + Check Mail (12:30 +07:00)

**Check Mail card** (https://trello.com/c/6SUJihR1) — all 6 items ✓ complete (DuongDn, Carrick, Rick, Kai, Ken, Nick).

**Check Progress card** (https://trello.com/c/oYNwybbJ):

✓ **Completed (18)**: Maddy - Carrick/Kai/Luis, Blake, John Yi - Amazing Meds, James Diamond - Vinn task, Rory, Aysar, Franc, Elliott - GreenFort Capital, MPFC, Marcel, Elena - SamGuard Digital Plant, Raymond - LegalAtoms, Neural Contract, Bailey, Andrew Taraba, Rebecca - William Will, Colin, Elena - WordPress SamGuard.

⚠ **Skipped (1)**:
- **Fountain - DOCUMENT** — PROD Rollbar regression expanding (HIGH); #2816 +5h growing; new mike62798179 delivery-fee bug 04-30; hard-to-release Doing 2 cards (clSdoRlL 27d + Business Homepage 16d 18:47Z).

---

## Email — 12:30 (+07:00)

| Account | Count | Summary |
|---|---|---|
| duongdn | 1 | HR Payslip 04/2026. No leave / no New Relic. |
| carrick | 2 | Snyk weekly (Marcel), Rollbar SoCal daily. No Redmine bugs. |
| nick | 17 | No emails from John Yi. Christina cancelled Weekly Meeting w/ Devs (04-29); Christina fwd "Your VPS needs attention — Linux kernel CVE" (04-30). 8 Canda Surveyors auto, 5 ClickUp invoice. |
| rick | 42 | **20 PROD Rollbar alerts on FirstProject (Fountain)** — see Critical #1. Kunal fwd Google Search Console sitemap-index issue. Refael/Danilo thread on Client API invoice (04-29). |
| kai | 6 | Madhuraka assigned LIFM2-437 (Date-based filtering); mentions on -436, -432; Anoma issue "Improve perf for bulk update listing price". |
| ken | 402 (22 INBOX + 380 NewsLetter) | Precognize PRs: #4861 (SR-7122 dashboard), #4865 (DP-177 asset-node deletion), DP-657/658, DP-659, SR-6529 Netty ByteBuffer leak, SR-7198, SR-6921, SR-7071, SR-7231, DP-652. INBOX: Michelle WyAsk security; Supabase security vulnerabilities; [welligence/WellStack] Rubocop CI failed. |

**Alerts:**
- ⚠️ **HIGH rick / FirstProject (Fountain) PROD** — see Critical #1 (sustained checkout regression).
- ⚠️ MED rick / Kunal SEO sitemap-index issue (Critical #2).
- ⚠️ INFO nick / Linux kernel CVE on VPS; ken / WellStack Rubocop failed; ken / Supabase security advisories.

Leave: none flagged (VN holidays 30/4 + 1/5 — absence of VN leave notices is normal).

Trello: all 6 "Check mail" items ✓ complete — https://trello.com/c/6SUJihR1

---

## Slack — 12:30 (+07:00)

**Window:** 2026-04-29 08:30 +07 → 2026-05-01 12:30 +07. All 14 workspaces scanned via `search.messages` API. No auth failures. Both xoxc tokens (Amazing Meds, Equanimity) authenticated cleanly with Bearer + Cookie — no crumb refresh required.

| Workspace | Msgs | Channel breakdown / Key content |
|---|---|---|
| Baamboozle | 6 | **#testing** (2): Jamie 05-01 06:19/06:22 update — regained team-creation, password-edit ability on nusdev; still cannot delete account / close reported games. **DM Carrick** (1): Jamie OOO today + Mon + Tue (Korea holiday). #cancellation-responses (2 typeform auto), mpdm holiday-notice (1). |
| RDC - FM Monitoring | 40 | **#user-access-logs** (37, auto). **#rpi-reboot-logs** (2 auto-recovery alerts 04-29 + 04-30). **#all-rdc-fm-monitoring** (1) Carrick holiday notice. No human dmetiner. |
| Swift Studio | 9 | **#bxr__app**: Rory cancelled meeting 04-30 15:24, rescheduled with Jeff for 05-01. |
| Xtreme Soft Solutions | 2 | **DM Kai → Madhuraka**: Kai daily report 04-29 17:12 — "LIFM2-436 Done; LIFM2-432 Done; LIFM2-434 Quote Tool AI MVP In progress" + holiday notice. |
| SAM GUARD - Mobile | 12 | **#process-digital-plant**: Tom ↔ Kfir on DP-654; Tom opened SR-7282 04-30 13:43; Kfir replied 04-30 16:28. Active client collaboration. |
| GLOBAL GRAZING SERVICES | 6 | **#maintenance** (3): Nick 04-29 09:58–14:43 scoping Ubuntu/Ruby/Rails upgrade — provided estimates, recommended doing for app health. **#change-requests** (2 Joey/Amy UI placement). DM holiday notice (1). |
| Amazing Meds (xoxc) | 17 | **#web-dev-with-nick** (13): Nick set up Google Sheet for webinar data; tagged John Yi + Gil; Gil shared email; access granted 04-29 15:22. **DM John Yi** (2). **#blog-marketing-dept** (1). **#it-dept-all** (1) Nick daily report 04-29 23:37 — "update feedback; upgrade plugins AM & check security website; handle AM method edit data react js with google sheet — done". |
| Generator | 32 | **#business-analysts** (17): Violet ↔ Elliott 04-29 16:29 on Scheduled Maintenance invoices missing Building data; prod migration question. **#release** (8): B-292 (Timezone/DST) + F-831 (Vehicle add error) released 04-29 15:01, deployed 15:31. **#triage** (6): Rudi 04-30 06:38 — "the change from last night on the api broke both mobile apps (ios and android), customers couldn't access bookables. We decided to revert the api change to restore service." Already self-resolved. **#generator-x-nus** (1) Violet daily update 04-29. |
| LegalAtoms | 0 | No Nick-specific mentions or DMs. |
| MyPersonalFootballCoach | 0 | Quiet. |
| William Bills | 11 | **DM Lucas ↔ Oliver**: Lucas confirmed VN Reunification 04-30 + Workers' Day 05-01 OOO (informed Oliver 8d earlier); resuming 05-04. 04-29 19:00 Lucas test summary on Stripe webhook regression. |
| Equanimity (xoxc) | 3 | **#xid-technologies** (2): Komal 04-30 13:36 forwarded sgbuildex msg covering Cross-Midnight handling, person_trade_values OK; 16:35 confirmed Carrick done with point 3, needs work on points 4+5. |
| SoCal Auto Wraps | 0 | Quiet (normal). |
| Aigile Dev | 18 | **#braiking-news** (16) make.com automation drafts; **#the-gaige-alerts** (2 auto). |

**Per-workspace status:** All OK. Kai daily report posted (Xtreme); Nick daily report posted (Amazing Meds); Vinn + Jeff posted (AirAgri). VN holidays 04-30 + 05-01 → no VN reports expected. Generator outage already self-resolved.

**Alerts:** None (person-status). Production discussions are project dev topics per memory — Fountain prod regression alert is reflected in Email/Rick (Critical #1).

---

## Discord — 12:30 (+07:00)

| Server | Msgs | Key content |
|---|---|---|
| AirAgri (nusvinn) | 87 | **airagri_webapp** (73): James 27, Vinn 22, Leon 8, jon 8, Mary 7, Paul 1. **airagri-flutter** (14): James 7, Jeff 3, Mary 2, Leon 2. |
| Bizurk + DMs (nuscarrick) | 11 | Bizurk server 0 msgs (silent, normal). **DM AnimeWorld** 11 msgs — active. |

**Daily reports found (only working day in window = 04-29):**
- ✓ **Vinn (PhucVT) — 04-29 10:47 #airagri_webapp**: "Check and fix the failed deployment / Review Leon & Jon code PR 360, 361, 362 / Check and remove chemical assets for Withcott property / Support Jeff for build file manager and SDS / Working on Select Harvests - Task Tracker"
- ✓ **Jeff — 04-29 11:01 #airagri-flutter (8h)**: "Update Rectify Hazard feature (done) / Hazard Detail: Read-side Changes for Rectification Info (done) / Handle hiding hazards in the map when status is Rectified for both Main App and Contractor App". iOS TF 3.4.2 (8).

No 04-30 or 05-01 daily reports — expected (VN public holidays). Mary posted urgent items 04-30 → 05-01 (Brett 1am alert escalation, photo upload errors, 6 SDS change requests). Leon off 05-01.

**Andrew Taraba check** (DM nuscarrick ↔ AnimeWorld id 1298477844212482059):
- 04-29: Carrick posted detailed page-split design notes
- 04-29 19:28: Andrew feedback — gradients/colors don't match mockup, requested exact-hex color-pick
- 05-01 01:46–01:59: Carrick replied "let me try"; Andrew "can color pick in photoshop"; Carrick: "Let me try"

Andrew responsive and engaged. Bizurk silence is normal per memory.

**Alerts:** None.

---

## Scrin.io — 12:30 (+07:00)

- **Scrin.io 04-30:** 16 min (00:00–00:16, "upgrade plugin & checking security", "No project")
- **TuanNT John Yi sheet W21 04-30:** 0h (empty Task dự án rows)
- **Status:** ✓ OK. John Yi log (0h) ≤ Scrin.io (0.27h). 04-30 = VN public holiday → 0h expected.

---

## Sheets — 12:30 (+07:00)

Verified directly via Google Sheets API (per memory: subagent unreliable on 0h findings).

| Dev | Wed 29/04 | Thu 30/04 | Fri 01/05 | Source |
|---|---|---|---|---|
| LongVV | **8h** | 0h (holiday) | 0h (holiday) | Maddy W4 r37+r38+r39 = 2+1+5. JamesD/W21: empty. |
| PhucVT | **8h** | 0h (holiday) | 0h (holiday) | JD W23 r38=8 |
| TuanNT | **8h** | 0h (holiday) | 0h (holiday) | JohnYi W21 r36=8. Bailey/Rebecca: 0. |
| VietPH | **8h** | 0h (holiday) | 0h (holiday) | Bailey W25 r27=4 + r28=4 |
| KhanhHH | **8h** | 0h (holiday) | 0h (holiday) | Generator W38 r37–41 = 1+2.5+2+1+1.5 |
| LeNH | **8h** | 0h (holiday) | 0h (holiday) | Rebecca W22 r36=8 (Rory/Franc/Aysar empty) |

All 6 devs hit 8h target on Wed 04-29 (only working day in period). 04-30 + 05-01 are VN public holidays — 0h expected, NOT alerts. No "Nghỉ" leave notes needed. **No 0h alerts. No reminders required.**

---

## Fountain — 12:30 (+07:00) — W24 Day 5/5

W24 = Apr 27 → May 3, 2026. Mon 27/04 (Hùng Kings), Thu 30/04 (Reunification), Fri 01/05 (Labor Day) all VN holidays. Working days: Tue 28/04 + Wed 29/04 + Thu 30/04. Matrix token expired at start; refreshed via `scripts/matrix-token-refresh.js` (DISPLAY=:0 browser SSO); saved new token to `config/.matrix-config.json`.

### Part 1 — Matrix Plan (W24)

Source: `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. No new "Em update plan" message since 04-28. Authoritative plan:

@trinhmtt — **2026-04-28 01:20Z (08:20 +07):**
> Em gui plan tuan nay ạ
> VuTQ 16h
> ViTHY 16h  *(typo for ViTHT)*
> DatNT 16h
> => QC 10,5h

Clarification thread 04-28 01:18Z–01:22Z: ThinhT 0h planned. HaVS not on plan.

**Plan totals W24:** VuTQ 16h + ViTHT 16h + DatNT 16h = **48h dev** + **10.5h QC** = 58.5h.

### Part 2 — Task Log Actuals (W24, Summary R29)

Sheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`. R29 col D total = **69.00h**.

| Dev | Role | W24 Actual | Plan | Notes |
|---|---|---|---|---|
| VuTQ | Dev | **16.50h** | 16h | Mon 0.5h hotfix #2861 + Tue Next.js v16 #2697 (8h) + Wed/Thu |
| ViTHT | Dev | **16.00h** | 16h | Tue (#2815, #2702, #2853 ×5, #2380) + Wed |
| DatNT | Dev | **16.00h** | 16h | Tue 6.5h + Wed (#2816 ×2, #2835, #2834, redmine) |
| ThinhT | Dev | 6.00h | 0h | Off-plan extra |
| HaVS / LamLQ | Dev | 0h | 0h | Not on plan |
| **PhatDLT** | QC | **3.50h** | (split) | Tue 1.5h + Wed |
| **HungPN** | QC | **11.00h** | (split) | Tue 6h (incl. #2816 4h) + Wed |
| TrinhMTT | (excluded — not QC) | — | — | per memory |

**Dev W24: 54.50h / 48h plan (113%)**. **QC: 14.50h / 10.5h plan (138%)**.

### Part 3 — Plan vs Actual

| Dev | Plan | Actual W24 | Δ |
|---|---|---|---|
| VuTQ | 16h | **16.50h** | **+0.50h** ✅ recovered from 04-29's −5.9h pace gap |
| ViTHT | 16h | **16.00h** | ±0 |
| DatNT | 16h | **16.00h** | ±0 |
| ThinhT | 0h | 6.00h | +6h off-plan extra |
| **Dev total** | **48h** | **54.50h** | **+6.50h** ✅ |
| QC total | 10.5h | 14.50h | **+4.00h** ✅ |

✅ Plan met / exceeded across the board.

### Part 4 — Capacity & Runway

"Est vs Charged" tab. NS+IP only (excl. Deployed/Cancelled).

| Metric | 04-29 | 05-01 | Δ |
|---|---|---|---|
| Not Started count | 11 | **12** | +1 |
| Not Started remaining | 139.50h | **170.00h** | **+30.5h** ✅ |
| In-progress count | 14 | **12** | −2 |
| In-progress remaining | 11.25h | 11.25h | 0 |
| **NS+IP remaining** | **150.75h** | **181.25h** | **+30.5h** ✅ |
| **Runway @ 90h/wk** | 1.68 wk | **2.01 wk** | **+0.33 wk** ✅ |

Backlog +30.5h (new estimates: #2854 +35.5h, etc.). Runway crossed back above 2 weeks. **Kunal-priority Infinity Cart/Checkout still not sized into pool.**

### Part 5 — Over-Estimate Tracking

Top offenders sorted by over% (active only — excludes Deployed on Live + Cancelled). Mandatory checks **bold**.

| Task# | Est | Actual 05-01 | Over% | Status | vs 04-29 |
|---|---|---|---|---|---|
| 2627 | 0.5h | 8.25h | +1550% | Has Bug on Live | stable |
| **#2615 Gift of Choice** | 12h | 106.75h | +790% | Deployed Staging | stable |
| 2639 active/inactive cats | 2h | 16.5h | +725% | Deployed Staging | stable |
| 2630 | 0.5h | 3.75h | +650% | N/A | stable |
| 2501 | 4h | 25.5h | +538% | Deployed Staging | stable |
| 2380 checkout date | 4h | 25.25h | +531% | Deployed Staging | stable |
| 2604 | 1h | 3.5h | +250% | Deployed Staging | stable |
| **#2702 Accessibility** | 8h | **25.0h** | +212% | In-progress >50% | ✅ stable (stopped growing — was 25h on 04-29) |
| 2624 order complete | 12h | 31.25h | +160% | Dev Done | stable |
| 2666 | 2h | 5.0h | +150% | Deployed Staging | stable |
| 2783 | 1h | 2.0h | +100% | Not Started | stable |
| **#2816 Infinity homepage** | 20h | **40.0h** | **+100%** | Deployed Staging | ⚠ **+5h STILL GROWING** |
| 2821 | 1h | 2.0h | +100% | Dev Done | stable |
| 2664 | 2.5h | 4.5h | +80% | Deployed Live | (excluded) |
| 2546 corp order form | 4h | 7.0h | +75% | Deployed Staging | stable |
| **#2815 Branded packaging** | 6h | **10.25h** | +71% | Deployed Staging | ✅ status anomaly RESOLVED (NS→Staging); hours stable |
| #2742 GoC select/payment | 12h | 20.25h | +69% | **Not Started** | ⚠ status anomaly persists (NS+20.25h logged) |
| **#2735 Pro Send Smart Link** | 90h | 126.0h | +40% | In-progress >50% | stable (paused) |
| **#2595 GiftDrop** | 120h | 168.25h | +40% | Deployed Staging | stable |
| #2775 (NEW concern) | 60h | 17.0h | — | **Not Started** | ⚠ NEW status anomaly (NS but 17h on 60h task) |

**Movement vs 04-29:**
- ⚠ **#2816 +5h STILL GROWING** (35h → 40h, +25 percentage-points) — Infinity homepage continues to absorb effort post-staging-deploy (kunalsheth/tmmckay assets+revisions on 04-28).
- ✅ **#2815 status anomaly RESOLVED** (NS→Deployed Staging; hours stable 10.25h).
- ✅ **#2702 stopped growing** (stable 25h).
- ⚠ **#2742 anomaly persists** — Not Started status with 20.25h actual; lead update still pending from 04-29.
- ⚠ **#2775 NEW anomaly** — Not Started but 17h logged on 60h task; verify status.

### Trello Board — Web Development (`5475eaf923a9a1309357eb51`)

**List counts (vs 04-29):**

| List | 04-29 | 05-01 | Δ |
|---|---|---|---|
| To-Do | 32 | **30** | −2 ✅ |
| Bugs | 11 | **8** | **−3** ✅ |
| Doing | 7 | **7** | 0 |
| QC Internal | 3 | **5** | +2 |
| QA Backlog | 4 | **4** | 0 |
| In QA | 2 | **4** | **+2** ✅ |
| Not Passed | 2 | **1** | −1 ✅ |
| Done (live) | 933 | **933** | 0 |

Strong forward flow — Bugs drained 3, To-Do drained 2, QC Internal + In QA absorbed.

**Customer comments since 04-29 00:00Z (1 new):**
1. **04-30 18:47Z @mike62798179** on [Scheduled Order chose next day delivery but paid $8](https://trello.com/c/MgBGamAN) — "@kunalsheth @rick570 This is a small one and may be a unique incident. Customer placed an order on April 30th before cutoff and was able to choose the next day, May 1st, while only paying $8. As opposed to paying the $40 overnight shipping." Likely delivery-fee logic edge case.

No new comments from kunalsheth, tmmckay, or iris63293413 in 48h since 04-29 report.

**Stuck cards (>5d):** 47 total (+8 from 04-29). Top: Platform switcher fix (193d), PayPalHttp::HttpError (155d), Fountain Pro Backend Updates (149d), Fountain Pro roles (127d), Suggestion Unit Test (127d), Duplicate Charge (127d), URL case sensitive (126d), Make live/staging identical (116d), Corporate Order Form (116d), Account page (116d).

**Hard-to-release (Doing ≥14d): 2 cards** (+1 from 04-29):
- [Fountain — States/scrolling on login](https://trello.com/c/clSdoRlL) — **27d** in Doing (was 25d) ⚠
- **Fountain — Business (Homepage) — Updates** — **16d** in Doing (NEW) ⚠

### Fountain — Alerts summary
- ✅ Plan met/exceeded (VuTQ 16.5h recovered from −5.9h gap; dev 54.5h/48h, QC 14.5h/10.5h)
- ✅ Runway 1.68 wk → **2.01 wk** (+0.33 wk; +30.5h backlog added)
- ✅ #2702 stopped growing (stable 25h); #2815 status anomaly resolved (NS→Staging)
- ⚠ **#2816 Infinity homepage +5h STILL GROWING** (40h, +100%) — driven by tmmckay/kunalsheth Tue revisions
- ⚠ #2742 NS-anomaly persists (20.25h); **#2775 NEW NS-anomaly** (17h on 60h task) — lead update needed
- ⚠ Hard-to-release Doing: 2 cards (clSdoRlL 27d + Business Homepage 16d)
- ⚠ NEW mike62798179 bug 04-30 — delivery-fee mis-charge ($8 vs $40 overnight) on c/MgBGamAN
- ⚠ Backlog still <2.5 wk; Kunal-priority Infinity Cart/Checkout not sized into pool yet
- ⚠ **PROD Rollbar regression expanding** — see Critical #1 (HIGH)

---

## Elena — 12:30 (+07:00)

- **Elena-SamGuard-Digital-Plant:** 0 open PRs. Last deploys 2026-04-07 (#297-#299).
- **Pending deploys:** none. `pending_deploy` empty, `blocked` empty.
- **samguard.co WordPress check:** ✓ Clean (HTTP 200, 0 JS errors, 0 CSP violations). Only benign aborts (third-party analytics blocked by headless heuristics + canceled hero `.mp4` due to `networkidle2`).
- **Precognize/development (nusken):** ⚠ Same blocker as 04-29 — `nusken` token not present in `gh` keyring on this host. Cannot enumerate nusken PRs. Email signal (Ken's mailbox) shows active dev: PRs #4861, #4865, DP-657/658/659, SR-6529, SR-7198, SR-6921, SR-7071, SR-7231, DP-652. Needs `gh auth login --hostname github.com --user nusken` interactively.

---

## Upwork — 12:30 (+07:00) — Week of Apr 27 → May 3

VN holidays Mon 27/4 (Hùng Kings), Thu 30/4, Fri 1/5.

| Workroom | Upwork hrs | Task log | Match |
|---|---|---|---|
| Rory (LeNH) #41069448 | 0:00 | 0h Rory sheet W9 (LeNH consolidated 8h on Rebecca W22 Wed) | ✓ |
| Aysar (LeNH) #35642393 | 4:10 (Tue) | 4.17h Aysar W22 (Tue: "Investigate the issue lost the ability to do anything in admin / Resolve the comment PR Fix issue when importing Quizle game") | ✓ exact |
| Bailey-VietPH (DEV1) | ⚠ session expired (vinn) | 16h Paturevision W25 (Tue 8h: 6.5h PHP upgrade + 1.5h Mobile Menu Modal; Wed 8h: 4h PHP upgrade + 4h Q&A Feature) | UNKNOWN |
| Bailey-DuongDN (DEV3) | n/a (inactive per spec) | 0h | ✓ expected |
| Neural Contract #38901192 | 0:00 (last week 2:00) | n/a (external Carrick) | ✓ messages OK |

**Neural Contract recent messages:**
- 04-29 09:33 ICT — Carrick: "Just remind about our holiday tomorrow / Sorry for your inconvenience" (proactive heads-up about VN holidays)
- 04-24 11:29 — Michael: "Thanks Carrick. Enjoy your holiday on Monday!"
- 04-24 10:19 — Carrick: pushed code update
- 04-23 16:53 — Michael: docx_markup issue ReportController.php (handled by Carrick's 04-24 push)

No URGENT/awaiting-response from client this week.

**Alerts:**
- ⚠ LOW Bailey-VietPH (vinn) Upwork session expired — same blocker as 04-29. Sheet shows 16h logged. Needs `node scripts/upwork-login.js --login --account=vinn` interactively.

---

## Reminders — 12:30 (+07:00)

**No reminders sent.** All 6 monitored devs hit their 8h target on Wed 29/04 (only working day in window). Thu 30/04 + Fri 01/05 are VN public holidays — 0h is expected, not an alert.
