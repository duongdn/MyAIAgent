# Daily Report — 2026-04-29 (Wed)

**Window:** 2026-04-28 08:30 +07 → 2026-04-29 08:30 +07 (24h).
**Date covered:** Tue 2026-04-28 (Mon 27 was Hùng Kings holiday).

## Critical Alerts

| # | Severity | Source | Detail |
|---|----------|--------|--------|
| 1 | HIGH | Email/Rick | **FirstProject (Fountain) PROD Rollbar #874** — `Cannot read properties of undefined (reading 'amount')` × 10 occurrences in 5 min @ 28/04 18:02 UTC. Needs investigation. |
| 2 | HIGH | Fountain | **Kunal priority directive 28/04 13:59Z** — "prioritize Infinity Cart/Checkout over anything Fountain related" — confirm work order with team. |
| 3 | MED  | Sheets | **4 devs 0h on Tue 28/04** — LongVV, TuanNT, KhanhHH, LeNH. No leave note. Matrix reminders attempted but token expired (see Reminders). |
| 4 | MED  | Fountain | **VuTQ −5.9h vs pace** (only Mon 0.5h hotfix; nothing logged Tue). |
| 5 | MED  | Fountain | **Over-est still growing**: #2702 +1h (25h, +212%), #2816 +3h (35h, +75%), #2815 +1.25h + status anomaly (10.25h, +71%). |
| 6 | MED  | Fountain | **Runway flat 1.68 wk** (150.75h NS+IP @ 90h/wk) — backlog still thin; new estimates needed. |
| 7 | LOW  | Fountain | **Status anomalies** persist on #2742 (NS but 20.25h logged) and #2815 (NS but 10.25h logged) — needs lead update. |
| 8 | LOW  | Upwork | **vinn / david2 Upwork sessions expired** — Bailey DEV1 hours not verified vs task log; needs `node scripts/upwork-login.js --login --account=vinn` (visible browser + CAPTCHA). DEV3 inactive so 0h is OK. |
| 9 | LOW  | Elena | **Precognize check blocked** — `nusken` GitHub token not in local gh keyring. PR enumeration failed; email signal shows active dev (PRs #4853, #4861, etc.). |
| 10 | LOW | Reminders | **Matrix token fully expired** — OIDC refresh + browser SSO both failed. Reminders to LongVV, TuanNT, LeNH queued for resend after manual login. |

## Trello — Check Progress + Check Mail (08:30 +07:00)

**Check Mail card** (https://trello.com/c/igBF7PUt) — all 6 items ✓ complete.

**Check Progress card** (https://trello.com/c/YpVcsLfw):

✓ **Completed (11)**: Blake, James Diamond - Vinn task, MPFC, Marcel, Elena - SamGuard, Raymond - LegalAtoms, Neural Contract, Bailey, Andrew Taraba, Colin, Elena - WordPress SamGuard.

⚠ **Skipped (8)**:
- Maddy - Carrick/Kai/Luis — LongVV 0h alert
- John Yi - Amazing Meds — TuanNT 0h alert
- Rory — LeNH 0h alert
- Aysar — LeNH 0h alert (Upwork shows 4.17h ↔ sheets 0h discrepancy)
- Franc — LeNH 0h alert
- Elliott - GreenFort Capital — KhanhHH 0h alert
- Rebecca - William Will — TuanNT 0h alert
- Fountain - DOCUMENT — VuTQ behind, over-est growing, Kunal priority directive, Rollbar #874

---

## Email — 08:30 (+07:00)

| Account | Count | Summary |
|---|---|---|
| duongdn | 1 | NUS HR salary notice (Binh Nguyen). No leave requests, no New Relic alerts. |
| carrick | 4 | 2 Redmine bugs for Generator/Elliott (#78373 iOS booking, #78417 maintenance create); Jira weekly update; GitLab sign-in. |
| nick | 7 | No emails from John Yi. (Other: 4x CNA daily task completions, Azure DevOps PR, Christina Keefe weekly meeting invite, calendar reminder.) |
| rick | 10 | **1 PRODUCTION alert:** FirstProject prod TypeError "Cannot read properties of undefined (reading 'amount')" — 10 occurrences/5min Rollbar #874. 2 BugSnag entries are FountainStaging/development (NOT production). Rest are daily summaries. |
| kai | 6 | Madhuraka/Jira: LIFM2-409 (Import Shopify payouts), LIFM2-436 mention by Madhuraka, LIFM2-409 mention by Anoma; FW: RMS missing order #2522 from madhuraka@xtremeweb; Jira weekly update. |
| ken | 16 | Precognize/development PR activity: PR #4853 (sr-386 add asset), PR #4861 (SR-7122 dashboard), Revert business config #6534, dp-650 changes, sr-7257 asset selector, SR-7198 missed event, Sr 7071 email notes. Active reviewers: DanielGavrilkin, Vladimir-precog, mahkris, nusdavid, windsurf-bot. |

**Alerts:**
- ⚠️ **rick / FirstProject PRODUCTION (Fountain)** — Rollbar #874 TypeError `Cannot read properties of undefined (reading 'amount')` — 10 occurrences in 5 minutes (2026-04-28 18:02 UTC). Sent to rick+fountainfe@. Needs investigation.

Trello: all 6 "Check mail" items ✓ complete — https://trello.com/c/igBF7PUt

---

## Slack — 08:30 (+07:00)

**Window:** 2026-04-28 08:30 +07 → 2026-04-29 08:20 +07. All 14 workspaces scanned successfully via `search.messages` API. No auth failures. Both xoxc tokens (AmazingMeds, Equanimity) authenticated cleanly with cookie+bearer.

| Workspace | Msgs | Channel breakdown / Key content |
|---|---|---|
| Baamboozle | 13 | **#testing** (9): Carrick + Aysar/Jamie debugging admin permission regression after weekend updates — Jamie (skjamie25) cannot create/edit teams, remove violations, edit emails, view invoices on prod; Carrick reset nusdev to mirror prod, pushed fix on nusdev for verification, requested admin account on prod to debug. **#cancellation-responses** (3): typeform automated. **#customer-success** (1): Noah quote. |
| RDC - FM Monitoring | 11 | **#user-access-logs** (8): Tuner Access Log automated. **#rpi-reboot-logs** (3): Tuner Instability + Recovery alert (auto self-recovered). No dmetiner human updates this window. |
| Swift Studio | 1 | **#bxr__app** (1): Rory asking Jeff to schedule call to check API connections to new BXR system. No Carrick activity. |
| Xtreme Soft Solutions | 54 | **#DM Anoma** (43): Kai working through gift-card/Xero accounting questions with Anoma — Anoma OOO 3 days from tomorrow. **#DM Madhuraka** (11): Kai posted daily progress 04-28 17:34 ("My progress to now: LIFM2-431 Done, LIFM2-432 Done, LIFM2-436 In progress"); discussed PR #485 + 2-Apr forwarded RMS missing order #2522 feedback. Daily report POSTED. |
| SAM GUARD - Mobile | 2 | **#process-digital-plant** (1): Lena to Michelle — studio updated, asks team to start autoscan/csv work. **#mql-leads** (1): HubSpot automated. No major Elena/DP escalations. |
| GLOBAL GRAZING SERVICES | 12 | **#maintenance** (9): Joey reported important bug on Prestashop total to Amy; Amy attributes to wrong DB data type from migration; Joey questioning urgency of Ubuntu 18.04→22.04 / Ruby 2.7→3.2 / Rails 5.2→6.1 upgrade scope; Nick replied 04-28 08:18 confirming focus is GLS module. **#change-requests** (3): Joey/Amy on cost estimate (Joey self-resolved). Per memory: Nick GGS daily report missing is NOT an alert. |
| Amazing Meds | 21 | **#web-dev-with-nick** (16): Nick (Nick Duong) actively working with John Yi — moving homepage to prod, updating feedback, fixing Real Stories videos, removing 12,450 reviews, legitscript spacing. Nick requested updates needed on care plan page (07:57 today). **#DM John Yi** (4): Nick offering WordPress + Vercel + Elementor team services. **#it-dept-all** (1): Nick daily report 04-28 18:25 — "move homepage prod, update feedback, AM method edit data react js with google sheet". |
| Generator | 47 | **#mobile** (32): Active OTP signup/login bug discussion — Jeff pushed fix to block unverified users; Elliott pushing back about UX impact for already-signed-in users; Violet coordinating release prioritization. **#triage** (12): Email attachment regression on form submissions (Trello yAaaUJbY) — Violet deployed fix to production 04-28 ~15:54; Rudi requested MR review on generator-api MR#413 (escaped JSON values in settings). **#business-analysts** (2): Rudi requested daily team summaries; Violet committed to provide. **#generator-x-nus** (1): Violet posted formal Daily Update 04-28 covering Carrick TKT-794, TKT-609, etc. |
| LegalAtoms | 11 | **#general** (11): Raymond confirmed git outage 04-28 00:58 + plans Thursday release ("i will release again this thursday"); Talha + Hammad + Hashim handling Florida court mapping issue on production (known issue, use test mappings); GitHub issue #19503 assigned, #19361 follow-up. Nick activity minimal. |
| MyPersonalFootballCoach | 2 | **#DM** (2): Vietnamese conversation — tien271 + freelancer discussing API last_sync optimization to speed up app load. Low activity normal. |
| William Bills | 24 | **#DM Oliver** (17): Lucas testing Stripe Woo issue — works locally but failing on cms staging (connected to Stripe test mode of prod); Lucas creating separate test mode setup. Oliver shared multiple 6-digit codes (likely 2FA). **#DM QuânLee** (7): Vietnamese — Lucas debugging Stripe API key mismatch between staging Next website and CMS. |
| Equanimity | 2 | **#DM Marcel** (2): Carrick 04-28 09:19 reported AWS access lost again, requested password reset; Marcel 04-28 16:31 confirmed will reset password. RECURRING password issue but Marcel responsive. |
| SoCal Auto Wraps | 0 | (no new messages) — Blake quiet. Normal low activity. |
| Aigile Dev | 3 | **#braiking-news** (2): Make.com automated. **#the-gaige-alerts** (1): automated alert. |

**Per-workspace status:**

- Baamboozle: OK — Carrick actively engaged on Jamie admin-perm regression. Bug discussion, not alert.
- RDC - FM Monitoring: OK — only automated logs; tuners self-recovered.
- Swift Studio: OK — Rory call request to Jeff. Carrick not yet engaged.
- Xtreme Soft Solutions: OK — Kai daily report posted to Madhuraka DM.
- SAM GUARD - Mobile: OK — Lena handoff to Michelle.
- GLOBAL GRAZING SERVICES: OK — Nick replied in #maintenance 04-28; Prestashop bug being triaged.
- Amazing Meds: OK — Nick very active, daily report posted in #it-dept-all 04-28 18:25.
- Generator: OK — Elliott + Violet + Carrick + Jeff coordinating actively. Bug discussions, not person-status issues.
- LegalAtoms: OK — Raymond engaged (git outage acknowledged, Thursday release planned).
- MyPersonalFootballCoach: OK — low activity normal.
- William Bills: OK — Lucas + Oliver Stripe debugging active.
- Equanimity: OK — AWS password reset recurring; Marcel responsive.
- SoCal Auto Wraps: OK — silence is normal.
- Aigile Dev: OK — only automated noise.

**Alerts:** No alerts.

---

## Discord — 08:30 (+07:00)

| Server | Msgs | Key content |
|---|---|---|
| AirAgri | 82 | Vinn HMD Stop Alarm/Checkin: "Code wise it's done, I'm testing it locally — probably take another morning to get it up on staging." Jeff daily report: "Handle additional permissions; Fix bug Form activity/history missing fields; Implement update assets function." |
| Bizurk | 2 | animeworld DM: Carrick asked AnimeWorld for a near-future task or to close contract. AnimeWorld replied "I'll let you know I been busy this week moving so not much time check stuff." |

### AirAgri channel breakdown

- `airagri_webapp` — 78 msgs
  - **Vinn (verbatim status updates):**
    - "I have solved the above issue [HMD device data 2-format problem], but not sure if we need to move the device to get the latest data from them"
    - On HMD Stop Alarm/Checkin: "Code wise it's done, I'm testing it locally to see if there are any bugs with it. It'll probably take me another morning to get it up on staging."
    - Discussed black-spot scenario, agreed on "Missing Device" alarm after 60min + two-data-points logic for Stop alarm
    - Closed window with: "Ok I will ask them about checkin data" / "Thanks sir"
  - Many design messages from James Diamond on PLD alarm logic, GPS black spots, checkin button data, future monitoring rules.
- `airagri-flutter` — 4 msgs
  - James asked Jeff about spray calculator progress.
  - Jeff: "I have completed the UI for the spray calculator and integrated the APIs for creating spray jobs"
  - Jeff: "I'm currently handling the asset update feature. I'll continue with the spray calculator after Vinn updates additional APIs"
  - **Jeff daily report (verbatim):** "Here is my report for today: - Handle additional permissions and tasks - Fix bug Form activity/history in area missing some fields on form submission - Implement the function to update assets"

### Bizurk channel breakdown

- Bizurk server channels (tyqoon-frontend, dev-coinpricetab, otto-general, wooha-frontend, fwf-frontend) — `Missing Access (50001)` for nuscarrick. Expected per spec; not flagged.
- `animeworld` DM (nuscarrick → AnimeWorld) — 2 msgs (see above).

### Token verification
- nusvinn token: VALID
- nuscarrick token: VALID

### Status
- "James Diamond - Vinn task" — Vinn ACTIVE on HMD SOS/Stop alarm + black-spot logic. Jeff daily report posted.
- "Andrew Taraba" — animeworld DM ACTIVE. Bizurk silence normal (low-activity client).

**Alerts:** No alerts.

---

## Scrin.io — 08:30 (+07:00)

- Scrin.io yesterday (2026-04-28): **8.0h** (480 min, logged as Nick under "No project", notes: "feeback home page", "Issues tracker")
- John Yi task log (TuanNT, Tue 28/04): **0h** (W21 rows empty)
- Status: **OK** (task log ≤ Scrin — not over-inflated)

Note: John Yi project log is empty for 2026-04-28. Whether this is a missing-log alert depends on TuanNT's combined log across all 3 projects (see Sheets section).

---

## Sheets — 08:30 (+07:00)

| Developer | Tue 28/04 | Status | Notes |
|---|---|---|---|
| LongVV | Maddy 0h + JD 0h = 0h | ⚠️ ALERT | No entries in Maddy W4 or James Diamond W23; no leave note |
| PhucVT | 8h | OK | James Diamond W23, 1 row |
| TuanNT | JY 0h + Rebecca 0h + Bailey 0h = 0h | ⚠️ ALERT | All 3 sheets empty for TuanNT; no leave note (Scrin.io shows 8h tracked) |
| VietPH | 8h | OK | Paturevision W25 (6.5h + 1.5h) |
| KhanhHH | 0h | ⚠️ ALERT | Generator W38: 4 rows owned by KhanhHH but hours column empty |
| LeNH | Rory 0h + Franc 0h + Aysar 0h + Rebecca 0h = 0h | ⚠️ ALERT | All 4 sheets empty; no leave note |

### Alerts
- ⚠️ **LongVV** — 0h logged Tue 28/04 across both Maddy + James Diamond.
- ⚠️ **TuanNT** — 0h across all 3 sheets (John Yi W21, Bailey W25, Rebecca W22), but Scrin.io shows 8h tracked → log not filled.
- ⚠️ **KhanhHH** — 4 task rows in Generator W38 but hours column empty (effectively 0h).
- ⚠️ **LeNH** — 0h across all 4 sheets (Rory W9, Franc W22, Aysar W22, Rebecca W22).

→ Matrix reminders should go out to LongVV, TuanNT, LeNH (KhanhHH has no Matrix room mapped — escalate via other channel).

---

## Fountain — 08:30 (+07:00) — W24

Day 3 of W24 (April 27 → May 3, 2026). Mon 27/04 was Hùng Kings holiday. Matrix token expired at start; refreshed via `scripts/matrix-token-refresh.js` (browser SSO).

### Part 1 — Matrix Plan (W24)

Source: room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. No new "Em update plan" message since yesterday — latest:

@trinhmtt — **2026-04-28T01:20Z (08:20 +07)**:
> Em gui plan tuan nay ạ
> VuTQ 16h
> ViTHY 16h  ← typo for ViTHT
> DatNT 16h
> => QC 10,5h

Clarification thread: ThinhT confirmed 0h this week.

**Plan totals W24:** VuTQ 16h + ViTHT 16h + DatNT 16h = **48h dev** + **QC 10.5h** = 58.5h.

### Part 2 — Task Log Actuals (W24, week-to-date)

Source: `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`. Summary R29 col D = **18.00h** (vs 0.50h yesterday — +17.5h logged Tue 28/04).

| Dev | Role | W24 Actual | Plan | Status |
|-----|------|-----------|------|--------|
| VuTQ | Dev | **0.50h** | 16h | Mon hotfix #2861 only; nothing Tue ⚠ |
| ViTHT | Dev | **8.00h** | 16h | Tue full day: #2815, #2702, #2853, #2380 |
| DatNT | Dev | **8.00h** | 16h | Tue full day: 9 bug-fix rows incl #2816, #2835, #2834, #74614 |
| ThinhT | Dev | 0.00h | 0h | Off-plan (confirmed) |
| HaVS | Dev | 0.00h | 0h | Not on plan |
| LamLQ | Dev | 0.00h | 0h | Not on plan |
| PhatDLT | QC | **1.50h** | (split) | Tue: bug check 0.5h + #2816 live test 1.0h |
| HungPN | QC | 0.00h | (split) | No hours yet |

Dev W24 to date: **16.50h / 48h** (34.4%). QC: **1.50h / 10.5h** (14.3%).

### Part 3 — Plan vs Actual

| Dev | Plan | Actual (Day 3) | Expected pace (~40%) | Delta |
|-----|------|----------------|----------------------|-------|
| VuTQ | 16h | 0.50h | ~6.4h | **−5.9h** ⚠ behind |
| ViTHT | 16h | 8.00h | ~6.4h | +1.6h on track |
| DatNT | 16h | 8.00h | ~6.4h | +1.6h on track |
| PhatDLT (QC) | (split 10.5h) | 1.50h | ~2.1h | −0.6h close |
| HungPN (QC) | (split 10.5h) | 0.00h | ~2.1h | −2.1h ⚠ |

⚠ **VuTQ behind by ~6h** — only Mon's 0.5h hotfix; nothing Tue 28/04. Re-check Wed evening.

### Part 4 — Capacity & Runway

| Metric | 04-28 prev | 04-29 today | Δ |
|--------|-----------|-------------|---|
| Not Started count | 12 | 11 | −1 |
| Not Started remaining | 139.50h | 139.50h | 0h |
| In-progress count | 14 | 14 | 0 |
| In-progress remaining | 11.25h | 11.25h | 0h |
| **NS+IP remaining** | **150.75h** | **150.75h** | **0h** |
| **Runway @ 90h/wk** | **1.68 wk** | **1.68 wk** | **flat** |

⚠ Backlog still thin: pipeline at **1.68 weeks** of dev capacity. New estimates urgently needed.

### Part 5 — Over-Estimate Tracking

| Task# | Est | Actual 04-29 | Over% | Status | vs prev |
|-------|-----|--------------|-------|--------|---------|
| [#2595 GiftDrop redemption](https://trello.com/c/) | 120h | 168.25h | +40% | Deployed on Staging | Stable |
| [#2615 Gift of Choice](https://trello.com/c/NBzXZigw) | 12h | 106.75h | +790% | Deployed on Staging | Stable |
| [#2735 Pro Send Smart Link](https://trello.com/c/yrbbFhf9) | 90h | 126.00h | +40% | In-progress (>50%) | Stable (paused) |
| **#2702 Accessibility** | 8h | 25.00h | +212% | In-progress | **+1.0h STILL GROWING** ⚠ |
| **#2816 Infinity homepage** | 20h | 35.00h | +75% | Deployed on Staging | **+3.0h STILL GROWING** ⚠ |
| **#2815 Branded packaging modal** | 6h | 10.25h | +71% | Not Started | **+1.25h GROWING** + status anomaly ⚠ |
| #2742 GoC select/payment | 12h | 20.25h | +69% | Not Started | Stable (status anomaly persists) |
| #2640 | 12h | 16.75h | +40% | In-progress (<50%) | Stable |
| #2695 | 20h | 26.00h | +30% | In-progress (<50%) | Stable |
| #2627 | 0.5h | 8.25h | +1550% | Has Bug on Live | Stable |
| #2639 active/inactive cats | 2h | 16.50h | +725% | Deployed on Staging | Stable |
| #2501 | 4h | 25.50h | +538% | Deployed on Staging | Stable |
| #2380 checkout date | 4h | 25.25h | +531% | Deployed on Staging | Stable |
| #2624 order complete | 12h | 31.25h | +160% | Dev Done | Stable |
| #2629 | 8h | 18.25h | +128% | Dev Done | Stable |
| #2604 | 1h | 3.50h | +250% | Deployed on Staging | Stable |
| #2666 | 2h | 5.00h | +150% | Deployed on Staging | Stable |

**Growing tasks vs 04-28:** #2702 (+1h), #2816 (+3h), #2815 (+1.25h with status anomaly). #2742 anomaly persists (NS but 20.25h logged) — needs lead update.

### Trello Board — Web Development

Board `5475eaf923a9a1309357eb51` (Rick's account).

**List counts (vs 04-28):**

| List | 04-29 | 04-28 | Δ |
|------|-------|-------|---|
| To-Do | 32 | 32 | 0 |
| Bugs | 11 | 10 | +1 |
| Doing | 7 | 6 | +1 |
| QC Internal | 3 | 6 | −3 |
| QA Backlog | 4 | 3 | +1 |
| In QA | 2 | 2 | 0 |
| Not Passed | 2 | 1 | +1 |
| Done (live) | 933 | 932 | +1 |

QC Internal drained 3 cards into next stages.

**Customer comments since 28/04 01:30Z:**

1. 28/04 13:30Z **@mike62798179** on [Editing the Address during checkout is not saving changes](https://trello.com/c/hbDunrDF) — attached screen recording reproducing the bug
2. 28/04 13:49Z **@kunalsheth** on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — list of issues (corporate gifting routing, hover behaviour…)
3. 28/04 13:59Z **@kunalsheth** on [Infinity - Cart, Checkout, Order Received Update](https://trello.com/c/TAopocTs) — ⚠ **"Please prioritize this over anything Fountain related"** (priority directive)
4. 28/04 17:48Z **@tmmckay** on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — Figma comment link + design clarifications
5. 28/04 18:10Z **@tmmckay** on [Infinity - Update homepage](https://trello.com/c/S0M1pEOs) — web-ready assets attached
6. 28/04 18:22Z **@tmmckay** on [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr) — web-ready assets attached
7. 28/04 21:17Z **@tmmckay** on [Infinity - Custom Roses page](https://trello.com/c/ElD5EOmr) — variable rollout plan

**Stuck cards (>5d):** 39 total (−2 from 04-28). Top: Platform switcher fix (190d), PayPalHttp::HttpError (153d), Fountain Pro Backend Updates (146d), 124d×4 cluster, 114d×9 cluster, [Solution to incorrect delivery dates](https://trello.com/c/oHJ5YO8y) (88d).

**Hard-to-release (Doing >=14d):** 1 card unchanged — [Fountain - States/scrolling on login](https://trello.com/c/clSdoRlL) (25d).

### Fountain — Alerts summary
- ⚠ **VuTQ −5.9h vs pace** (only Mon 0.5h hotfix; no Tue log) — recheck Wed evening
- ⚠ **#2702 +1h, #2816 +3h, #2815 +1.25h** STILL GROWING vs 04-28
- ⚠ **#2815, #2742** still "Not Started" but actuals logged — status anomaly
- ⚠ **Runway 1.68 wk** (flat) — backlog still thin
- ⚠ **Kunal priority directive** 28/04 13:59Z: prioritize Infinity Cart/Checkout over Fountain
- ⚠ **Production Rollbar #874** (FirstProject `Cannot read properties of undefined (reading 'amount')`) — see Email section

---

## Elena — 08:30 (+07:00)

### PRs (Elena-SamGuard-Digital-Plant)
- **0 open PRs** on `nustechnology/Elena-SamGuard-Digital-Plant` (verified via duongdn account)
- No deploys needed today.

### Deploys
- None pending in `config/.elena-pending-actions.json` (last action: PR #289 fix/redmine/77734 deployed 2026-03-19, marked DONE).

### Precognize (nusken)
- ⚠ **`nusken` GitHub account is not configured in local `gh` keyring** — only `duongdn` + `nuscarrick` are present. Direct API check via `gh api` cannot run.
- Indirect signal from ken@nustechnology.com email piece: 16 Precognize PR activity notifications today including PRs #4853 (sr-386 add asset), #4861 (SR-7122 dashboard), #6534 (Revert business config), dp-650 changes, sr-7257, SR-7198, Sr 7071 — active development; reviewers DanielGavrilkin, Vladimir-precog, mahkris, nusdavid, windsurf-bot.
- Action: re-add nusken token via `gh auth login --with-token` to enable direct PR enumeration.

### WordPress samguard.co
- HTTP 200, page loads cleanly.
- **JS errors:** none
- **Page errors:** none
- **CSP violations:** none
- **Failed requests** (informational, not application errors):
  - 5× third-party tracking endpoints (Google Tag Manager, GA, LinkedIn) returning `net::ERR_ABORTED` — typical browser ad/tracker blocking, no action needed
  - 6× video preload aborts (`/wp-content/uploads/2025/02/1.mp4`, `/wp-content/uploads/2025/03/3.mp4`, `/wp-content/uploads/2025/03/4.mp4`) — normal lazy-load lifecycle

### Elena — Alerts summary
- ⚠ **Precognize check blocked** — nusken token missing from gh keyring (PR enumeration cannot run; email signal suggests active dev with no obvious blockers).

---

## Upwork — 08:30 (+07:00)

| Workroom | Dev | This week (Mon-Tue) | Task log (matched) | Status |
|---|---|---|---|---|
| Rory (41069448) | LeNH | 0h | 0h | OK |
| Neural Contract (38901192) | Carrick | 0h | (messages_only) | OK — no urgent items |
| Aysar (35642393) | LeNH | 4:10 (4.17h) | 4.17h | OK (match; Upwork Tue ↔ task log Mon — TZ shift) |
| Bailey DEV1 (42545630) | VietPH | BLOCKED — vinn session expired | 6.5h on `[Maintenance] Update PHP version on Prestashop` (Tue) + 1.5h on `[Prestashop] Mobile Menu Modal` (Tue) | ⚠️ BLOCKED — needs `node scripts/upwork-login.js --login --account=vinn` (visible browser + CAPTCHA) |
| Bailey DEV3 (43093775) | DuongDN | BLOCKED — david2 session expired | n/a | OK (inactive contract — 0h expected) |

Note: **Mon 27/04 was Vietnamese holiday** (Nghỉ lễ Hung Kings' Commemoration Day). Team resumed Tue 28/04.

### Neural Contract messages (recent)
- [2026-04-22 → 2026-04-24] Michael ↔ Carrick: pass-5th-argument fix on Compare function, then docx_markup fix around ReportController.php:1066. Carrick pushed all fixes.
- [2026-04-24 04:29Z] Michael: "Thanks Carrick. Enjoy your holiday on Monday!"
- No new messages Mon 27 or Tue 28. No urgent items.

### Alerts
- ⚠️ Upwork sessions for **vinn** (Bailey DEV1) and **david2** (Bailey DEV3) are expired — `upwork-weekly-hours.js` cannot read those workrooms. Bailey DEV3 is inactive so 0h is expected. Bailey DEV1 (VietPH) needs visible-browser re-login + CAPTCHA to verify hours match the task log (8h logged Tue 28).

### Note on Sheets discrepancy
Aysar Upwork shows LeNH 4.17h this week, but Sheets agent reported LeNH 0h across all 4 sheets — possible script miss vs actual missing log. To investigate.

---

## Reminders — 08:30 (+07:00)

⚠ **Matrix reminders BLOCKED — token expired and could not be auto-refreshed.**

Refresh attempts:
- OIDC refresh (token endpoint): FAIL HTTP 400 `invalid_grant` (refresh token revoked/expired)
- Browser SSO refresh (`scripts/matrix-token-refresh.js`): "Failed to capture token. Manual login needed." — saved browser profile session also expired.

Action needed: run `node scripts/matrix-token-refresh.js` interactively (visible browser at the user's desktop) to re-establish the SSO session, then re-run reminders.

Queued reminders (for resend after token refresh):

| Developer | Room | Message |
|---|---|---|
| LongVV | `!bvdwOOxprsKJBTjSeQ:nustechnology.com` | "Hi LongVV, task log for 2026-04-28 is missing (0h logged). Please update when you can. Thanks!" |
| TuanNT | `!knbJbIKzXRJNGVFQNg:nustechnology.com` | "Hi TuanNT, task log for 2026-04-28 is missing (0h logged). Please update when you can. Thanks!" |
| LeNH | `!OIrgPraJWrcDTnRVLQ:nustechnology.com` | "Hi LeNH, task log for 2026-04-28 is missing (0h logged). Please update when you can. Thanks!" |

⚠ **KhanhHH** (Generator/Elliott) also 0h Tue 28/04 — no Matrix room mapped; escalate via Generator Slack DM or in weekly stand-up.

---

