# Daily Report — Mon 2026-05-04 (+07:00)

Window: **2026-04-24 08:50 → 2026-05-04 08:09** (+07:00) — 10-day catch-up since last daily report.
Holidays in window: **2026-04-30 (Reunification)**, **2026-05-01 (Labour)**.
Workdays scanned: Apr 24 (Fri), Apr 27 (Mon), Apr 28 (Tue), Apr 29 (Wed), May 4 (Mon, today partial).
Weekends: Apr 25-26, May 2-3.

---

## Executive Summary

| Source | Status | Headline |
|---|---|---|
| Email | ⚠️ HIGH | Fountain Gifts production error spike Apr 28-30 (TypeError "amount" #877/#878 100th + bursts; Stripe.js #883 fail). InfinityRoses prod ReadTimeout x2 (#414, 27 Apr). 2 new Generator/Elliott Redmine bugs. |
| Slack (14 ws) | ✓ | 626 msgs. All key daily reports posted. Generator API revert resolved. Swift trainer-filter bug being fixed by Jeff. FB crawler 403 acknowledged. |
| Discord (AirAgri/Bizurk) | ✓ | Vinn reports posted Apr 24/28/29 (Apr 27 leave). Jeff reports Apr 24/28/29 (Apr 27 partial PR review only). Bizurk silence normal. |
| Sheets (task logs) | ⚠️ HIGH | **Apr 27 universal 0h, no leave notes** across 6 devs — likely substitute holiday, needs verification. LeNH 4/29 0h. LeNH 4/28 only 4.17h. |
| Scrin.io | ✓ | TuanNT/John Yi matches task log. Apr 29 task log 8h vs Scrin 7.73h (+16 min rounding). |
| Fountain | ⚠️ WARNING | W24 plan met (48.5/48h dev). Backlog **+30.5h NS+IP**. Bugs +6, Stuck cards +10 (47), Doing 14+d cards +1 (2). 30 customer comments (+9 vs 04-24). NEW prod bug from kunalsheth today (Build-a-Box NoMethodError). #2816 Infinity homepage **+100% over** est. **W25 plan not yet posted.** |
| Elena | ✓ | 0 open PRs. WordPress samguard.co clean (0 errors). No pending deploys. |
| Upwork (Neural) | ✓ | Apr 23 Compare-module bug fixed + acknowledged. 10-day silence (expected with VN holidays). |

**Trello:** Check Mail 6/6 ✓. Check Progress 18/19 ✓ (skipped: Fountain — DOCUMENT due to alerts above).

---

## Email — 08:09 (+07:00)

| Account | Count | Summary |
|---------|------:|---------|
| duongdn@ | 4 | HR salary notice + Apr/2026 payslip; Infisical new-device login. No leave requests. No New Relic. |
| carrick@ | 31 | **2 NEW Redmine bugs Elliott/Generator (28 Apr): #78373 iOS Booking Requests "No items found"; #78417 Maintenance create fails (609).** 11 BXR Jira tickets from Rory (27 Apr). 3 Rollbar Socalautowraps daily summaries (info). |
| nick@ | 60 | No mail from John Yi. Bulk = Azure DevOps PRs (Emir LLaneza, ~15 PRs). Christina Keefe scheduled & cancelled "Weekly Meeting with Devs" 28-29 Apr. Heroku data-deletion notice 2 May. |
| rick@ | 141 | **43 PROD Rollbar errors.** Hot: FirstProject #877/#878 TypeError "amount" 100th + 10-in-5min Apr 28-30; #883 Stripe.js load fail 29 Apr 21:50; React #423 #850 1,000th 25 Apr; ChunkLoadErrors #993/#996 infinityroses.com. **InfinityRoses prod #414 ReadTimeout x2 27 Apr 13:32.** |
| kai@ | 33 | LIFM2-* mentions (259/260/430-432, 436). New LIFM2-437 "Date based filtering" assigned 29 Apr. FW "RMS missing order #2522" from madhuraka (28 Apr). |
| ken@ | 235 | NewsLetter folder. 22 Precognize PR threads (mahkris on #4841 SR-6290, #4860 SR-7198, #4862 SR-6529 Netty leak, #4868 SR-7231 mongo). nusdavid opened PR #4867 (3 May). |

### Alerts
- **HIGH — rick / Fountain Gifts production:** TypeError "amount" #877/#878 hit 100th + multiple 10-in-5min spikes Apr 28-30. Stripe.js #883 load fail 29 Apr. Recurring ChunkLoadErrors infinityroses.com. **Needs Rick/Kunal review.**
- **MEDIUM — rick / InfinityRoses prod:** RestClient ReadTimeout x2 (#414) at 27 Apr 13:32. Single burst — monitor.
- **MEDIUM — carrick / Generator:** New Redmine #78373 + #78417 (28 Apr). Need triage.
- **LOW — kai:** RMS missing order #2522 forwarded — operational follow-up.

---

## Slack — 08:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|-----:|-------------|
| Baamboozle | 64 | Aysar fixed session-query bug Apr 27, role-check & upgrade fix May 4. Carrick worked Change Owner Team prototype. |
| RDC - FM Monitoring | 171 | dmetiner ack-ed Carrick's domain + plugin updates Apr 24. Mostly automated tuner logs. |
| Swift Studio | 20 | bxr__app: Rory flagged trainer filter "totally broken" May 1 → Jeff fixing. Carrick coordinating UAE region authorization keys with Rory May 3. |
| Xtreme | 66 | Kai posted progress Apr 28 (LIFM2-431/432 done) + Apr 29 (432/436 done, 434 Quote Tool MVP IP). Anomawasala off 3d from Apr 30. (Kai 16h/wk exempt.) |
| SamGuard | 37 | Tom+Kfir on DP-654 / SR-7282 ticket coord Apr 29-30. 23 HubSpot MQL auto-notifications. No Elena/DP-NUS escalations. |
| GGS | 28 | **Nick daily report posted Apr 24** in #maintenance. Nick+Joey/Amy on Prestashop total bug (Apr 28). Nick provided Ubuntu/Ruby/Rails upgrade estimate Apr 29. |
| Amazing Meds | 54 | **Nick "Report today" posted 3x (Apr 24/28/29)** in #it-dept-all. John Yi requested FB crawler 403 fix May 2 — Nick "Yes ok" May 4. |
| Generator | 100+ | Heavy. Mobile OTP-verification fix debate Apr 28 (Jeff/Elliott/Violet). Triage: Rudi reverted API change Apr 30 (broke iOS+Android temporarily — resolved). Release Apr 29: B-292 timezone/DST + F-831 vehicle defect. Violet daily updates 28+29. |
| LegalAtoms | 21 | hashimzahid235 / talha.naeem coord on Tyler registration CHRO LA blocker May 1; court mapping prod issue Apr 28. Raymond: "release again this thursday" Apr 28. |
| MPFC | 2 | tien271 + freelancer on last_sync API Apr 28. Typical low activity. |
| William Bills | 62 | Lucas completed separate Stripe test mode setup for staging Apr 29; regression tested payment + Stripe webhooks. Stripe API key mismatch debugged staging Apr 28. |
| Equanimity | 14 | Carrick + Komal Bailur + Mani on xid-technologies data validation Apr 24-26 (SGBuildEx cross-midnight, person_trade_values). |
| SoCal | 0 | No messages. Low-activity workspace, normal. |
| Aigile | 27 | #braiking-news 7 automated blog drafts (May 1) + newsletter ready. Routine alerts. No Colin direct activity. |

**Total: 626 msgs.** No blocking alerts (project dev discussions ≠ alerts).

---

## Discord — 08:15 (+07:00)

| Server | Msgs | Key content |
|--------|-----:|-------------|
| AirAgri | 451 (webapp 327 + flutter 78 + testing 46) | **Vinn daily reports:** Apr 24 ✓ / Apr 27 leave (back Apr 28 "I just back today") / Apr 28 ✓ / Apr 29 ✓. **Jeff reports:** Apr 24 ✓ (4h) / Apr 27 ✗ (PR-review only at 10:15-10:22) / Apr 28 ✓ (8h) / Apr 29 ✓ (8h) / May 2 ✓ (Sat 4h extra). PR work continuous (#346, 351-356, 360-362). May 4 Vinn back today 08:12. |
| Bizurk | 0 server channels (sampled fwf-frontend, wooha-frontend, otto-general, wooha-fwf-onboarding) + 46 in animeworld DM | Andrew Taraba active in animeworld DM: Angular feedback Apr 24-26, design/gradient Apr 28-May 1, **NEW WordPress + Elementor side-job inquiry May 2-4** (~8h estimate). Bizurk channel silence is normal per memory. |

Notes: Jeff Apr 27 missing EOD post is a minor info — was active reviewing Leon's PR briefly. Could be partial day. Otherwise consistent.

---

## Sheets — 08:21 (+07:00)

| Developer | 4/24 (Fri) | 4/27 (Mon) | 4/28 (Tue) | 4/29 (Wed) | 5/4 (today) | Status |
|---|---|---|---|---|---|---|
| LongVV (Maddy 16h+JD 24h /wk) | 0h *Nghỉ cả ngày* | **0h** | 8h | 8h | — | OK except 4/27 mass alert |
| PhucVT (8h) | 8h | **0h** | 8h | 8h | — | OK except 4/27 mass alert |
| KhanhHH (8h) | 8h | **0h** | 8h | 8h | — | OK except 4/27 mass alert |
| VietPH (8h) | 8h | **0h** | 8h | 8h | — | OK except 4/27 mass alert |
| TuanNT (split) | 8h (1.25 JY + 6.75 Reb) | **0h** | 8h JY | 8h JY | — | OK except 4/27 mass alert |
| LeNH (split) | 7.33h (Franc 5.83 + Aysar 1.5) | 0h (Aysar Nghỉ) | 4.17h Aysar | **0h** all sheets | — | **4/29 ALERT** + 4/28 short |

### Alerts
- **HIGH — Apr 27 universal 0h, no leave note** across LongVV / PhucVT / KhanhHH / VietPH / TuanNT / LeNH (Franc/Rory/Rebecca). Strongly suspected substitute-holiday for the Apr 30/May 1 break (very common in Vietnam). **Needs PM verification** — if confirmed, devs should add `Nghỉ cả ngày` retroactively. If not a holiday → mass backfill required.
- **HIGH — LeNH Apr 29 = 0h all 4 sheets**, no leave note. Real missing log day.
- **MEDIUM — LeNH Apr 28 = 4.17h** (Aysar only) vs 8h target. Half-day note missing.

---

## Scrin.io — 08:13 (+07:00)

TuanNT/Nick @ John Yi (266977 / emp 453601). Window: workdays only.

| Date | Scrin | Task log | Match |
|---|---:|---:|---|
| 4/24 | 1.28h | 1.25h | OK |
| 4/27 | 0.00h | 0.00h | OK |
| 4/28 | 8.00h | 8.00h | OK |
| 4/29 | 7.73h | 8.00h | OVER +0.27h (16 min rounding) |
| 5/4 | 0.37h | — | OK (today partial) |

Scrin week 4/27–5/03: 16h. Apr month-to-date: 86h 43m. **No alerts** (4/29 +16 min is within rounding tolerance).

---

## Fountain — 08:13 (+07:00) — ⚠️ WARNING

W25 active (May 4-10). Just finished W24 (Apr 27 - May 3).

### Part 1 — Matrix Plan
W24 plan posted by **@trinhmtt 2026-04-28 08:20**:
> VuTQ 16h, ViTHT 16h, DatNT 16h → QC 10.5h

Dev plan = 48h (rightsized for 3-day work week). ThinhT/LamLQ/HaVS off-plan.
**W25 plan: NOT yet posted at 08:13 today.** Flag if missing by EOD.
(Matrix token expired → refreshed via `scripts/matrix-token-refresh.js` and saved.)

### Part 2 — Actuals (W24 row 29)

| Dev | Actual | Charged | Role |
|---|---:|---:|---|
| VuTQ | 16.50h | 16.50h | dev |
| ViTHT | 16.00h | 0h | dev |
| DatNT | 16.00h | 11.00h | dev |
| ThinhT | 6.00h | 0h | dev (off-plan but logged) |
| LamLQ / HaVS | 0h / 0h | — | dev (off-plan) |
| PhatDLT | 3.50h | — | QC |
| HungPN | 11.00h | — | QC |

Dev on-plan W24 = 48.5h. QC = 14.5h.

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Δ | Verdict |
|---|---:|---:|---:|---|
| VuTQ | 16h | 16.50h | +0.50 | MET |
| ViTHT | 16h | 16.00h | 0 | MET |
| DatNT | 16h | 16.00h | 0 | MET |
| QC | 10.5h | 14.50h | +4.00 | OVER (good — staging burndown) |

W24 plan met cleanly. Dev 101%, QC 138%.

### Part 4 — Capacity & Runway

| Metric | 04-24 | 05-04 | Δ |
|---|---:|---:|---:|
| Remaining NS+IP | 150.75h | **181.25h** | **+30.50h** |
| Remaining broader | 250.50h | 255.25h | +4.75h |
| Runway @ 90h/wk (NS+IP) | 1.68 wk | **2.01 wk** | +0.33 |
| Runway @ 90h/wk (broader) | 2.78 wk | 2.84 wk | +0.06 |

**Backlog +30.5h** since 04-24. New tasks: #2854 (35.5h rem), #1178 reviews (40h NS), #2775 navigation refactor (43h rem).

### Part 5 — Over-Estimate

| Task | Est | Apr 24 | May 4 | Over% | Status | Growing? |
|---|---:|---:|---:|---:|---|---|
| #2595 GiftDrop | 120h | 168.25 | 168.25 | +40% | Staging | stable |
| #2615 Gift of Choice | 12h | 106.75 | 106.75 | +790% | Staging | stable |
| #2735 Pro Send Smart Link | 90h | 125.00 | 126.00 | +40% | IP >50% | **+1h in 10d (cooled)** |

#2735 cooled significantly (+1h vs +7.5h/day previously). No longer "STILL GROWING".

**NEW big over-est entries (vs 04-24):**
- **#2816 Infinity — Update homepage: 20h → 40.0h (+100%)** Staging.
- #2837: 16h → 23.5h (+47%) Staging.
- #2815: 6h → 10.25h (+71%) Staging.

### Fountain Trello Board ([Web Development](https://trello.com/b/UDrSWage))

**Customer comments: 30 in 10d** (kunalsheth 16, tmmckay 12, mike62798179 2). Vs 04-24 = +9.

Hotspot: [kunalsheth flagged Build-a-Box NoMethodError prod bug](https://trello.com/c/) **today 00:18** ("customer complained — bug").

**Active cards:**

| List | 04-24 | 05-04 | Δ |
|---|---:|---:|---:|
| To-Do | 32 | 34 | +2 |
| Bugs | 8 | 14 | **+6** |
| Doing | 6 | 7 | +1 |
| QC Internal | 6 | 5 | -1 |
| QA Backlog | 3 | 4 | +1 |
| In QA | 2 | 3 | +1 |
| Not Passed | 0 | 2 | **+2** |
| **Total** | **57** | **69** | **+12** |

Stuck cards (>5d): **47** (vs 37, +10). Worst: 195.9d Platform switcher fix; 158.7d PayPalHttp::HttpError generate_order; 152.0d Fountain Pro Backend Updates.

Hard-to-release (Doing 14+ d): **2** (vs 1, +1):
- **30.7d** [Fountain — States/scrolling login](https://trello.com/c/clSdoRlL) (was 20d, +10.7d)
- **18.9d** [Fountain — Business (Homepage) Updates](https://trello.com/c/WGsYqu5h) NEW

### Fountain — Net Verdict
**⚠️ WARNING — Fountain Check Progress item NOT marked complete.** Reasons:
1. Backlog NS+IP +30.5h
2. Bugs +6, Not Passed +2
3. Stuck cards +10
4. Hard-to-release +1 (clSdoRlL still 30.7d Doing)
5. NEW prod bug from kunalsheth today (Build-a-Box NoMethodError)
6. #2816 Infinity homepage +100% over est
7. W25 plan not yet posted

Clean signals: W24 plan met, #2735/#2595/#2615 stable.

---

## Elena — 08:14 (+07:00)

- **PRs (duongdn):** 0 open. 0 merged in window. PR #300 (intermediate feature-branch merge) logged in `.elena-pending-actions.json` as no-deploy.
- **MayBanServer:** HEAD = `9274db918c` (PR #299 from 04-07). `git pull` "Already up to date".
- **Precognize (nusken):** 0 open PRs (filtered).
- **WordPress samguard.co:** clean (0 console errors, 0 CSP, 0 page errors).
- **Pending deploys:** none.
- **Branch in progress:** `SR-6921-active-alerts-...` not yet merged to deploy branch — work will deploy when promoted.

---

## Upwork — Neural Contract — 08:30 (+07:00)

- 9 stories captured (Apr 22 → Apr 29). Apr 23 Compare-module bug + live.pl arg-ordering bug **resolved** — Carrick pushed code Apr 24, Michael acknowledged "Enjoy your holiday".
- 10-day silence Apr 25 → May 4 (expected with VN holidays).
- Hours: this week 0:00, last week 0:00, since start 97:30. Neural is `messages_only` workroom → no internal task log expected.
- **No escalations** awaiting reply.

---

## Trello updates

### Check Mail (`O83pAyqb`)
| Item | Status |
|------|--------|
| DuongDn / Carrick / Nick / Rick / Kai / Ken | ✓ all 6 complete |

### Check Progress
| Item | Status |
|------|--------|
| Maddy - Carrick/Kai/Luis | ✓ |
| Blake | ✓ |
| John Yi - Amazing Meds | ✓ |
| James Diamond - Vinn task | ✓ |
| Rory | ✓ |
| Aysar | ✓ |
| Franc | ✓ |
| Elliott | ✓ |
| MPFC | ✓ |
| Marcel | ✓ |
| Elena - SamGuard | ✓ |
| Raymond - LegalAtoms | ✓ |
| Neural Contract | ✓ |
| Bailey | ✓ |
| Andrew Taraba | ✓ |
| Rebecca - William Will | ✓ |
| Colin | ✓ |
| **Fountain - DOCUMENT** | **⚠️ skipped** (backlog +30.5h, Bugs +6, Stuck +10, Doing 14+d +1, NEW prod bug, #2816 +100% over, W25 plan absent) |
| Elena - WordPress SamGuard | ✓ |

---

## Reminders

**Skipped this run.**
Reasons:
- Today is 5/4 08:30 — within early-morning skip window for same-day reminders.
- 4/27 0h is **universal across 6 devs** — almost certainly a substitute holiday (Vietnam often shifts the 30/4–1/5 break). Mass-spamming reminders without confirmation is noise. Awaiting PM verification.
- LeNH 4/29 0h alert is real (single dev, single day, week-old) — held pending PM decision on whether to ping LeNH directly.

---

## Unresolved Questions

1. **Apr 27 (Mon)** — was this declared a substitute holiday for 4/30 + 5/1? If yes, devs need to backfill `Nghỉ cả ngày` retroactively. If no, full backfill of hours required for 6 devs.
2. **LeNH 4/29 0h** + 4/28 short (4.17h) — should we send Matrix reminder, or is this addressed offline?
3. **Fountain W25 plan** — still missing at 08:13. Ping @trinhmtt by EOD?
4. **Fountain #2816 Infinity homepage** doubled estimate (20h → 40h) while in Staging — accept or scope-review?
5. **Fountain hard-to-release cards** growing ([clSdoRlL](https://trello.com/c/clSdoRlL) 30.7d Doing) — escalate to Vu Tat?
6. **Jeff Apr 27** missing EOD report (only PR review activity 10:15-10:22) — info only or follow-up?
7. **Michael (Neural)** — Apr 24 Compare-module fix not explicitly verified; recommend Carrick follow-up next week.
8. **TuanNT Paturevision** — sheet shows 0h all week but JY+Rebecca = 8h. Still on Paturevision?
9. **LongVV James Diamond** — sheet 0h every workday; project active on his side or all time captured under Maddy this week?
