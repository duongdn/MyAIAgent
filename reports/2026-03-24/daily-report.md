# Daily Report — Tue 24 Mar 2026

**Period:** Mon 23 Mar 08:30 → Tue 24 Mar 08:49 (Saigon)
**Generated:** 2026-03-24 08:49

---

## Checklist

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Monitor Email | done | 6 accounts, 249 emails total |
| 2 | Monitor Slack | done | 14 workspaces, 6 active, 8 quiet |
| 3 | Monitor Discord | done | AirAgri active, HOMIEAPP quiet, Bizurk no access |
| 4 | Monitor Web | done | samguard.co UP, SSL 80 days |
| 5 | Google Docs | done | 11 spreadsheets (W13/W19). PhucVT 0h, LeNH 0h, TuanNT 0h |
| 6 | Daily Report Checks | done | Kai PASS, Nick OFF, Jeff OFF→back, Vinn PASS |
| 7 | Scrin.io | done | Nick 0h (matches task log 0h) |
| 8 | Matrix | done | Fountain plan confirmed W19, #2789 revert request |
| 9 | GitHub | done | Elena PR #290 open, Precognize 4 active PRs |
| 10 | Redmine | done | #77734 Tested on Staging |
| 11 | Trello | done | Check Progress/Mail fetched, Fountain board scanned |
| 12 | Upwork | done | 5 workrooms. LeNH 8h Upwork vs 0h task log mismatch |

---

## 1. Email

### duongdn@nustechnology.com — 3 emails
- Training session invite: Advanced Caching Strategies with Redis
- Leave requests (Thanh Nguyen, Viet Pham)

### carrick@nustechnology.com — 4 emails
- Redmine: Elliott bug #77761
- Stripe: Baamboozle account invite + Smart Disputes June
- **ALERT:** GitLab personal access tokens expiring in ≤7 days

### nick@nustechnology.com — 20 emails
- 7x ClickUp (Operations, Company Assets, Quote Details, 3D Admin Role)
- 4x Azure DevOps PRs (booking on sent jobs, 2d draft flagging, 3d admin role)
- 1x Upwork message from Intelli M.
- 1x Daily Task Completions (Canda Surveyors)

### rick@nustechnology.com — 9 emails
- 2x InfinityRoses + 1x FirstProject Rollbar summaries
- 2x FountainGifts Rollbar summaries
- **ALERT:** 2x [FountainGifts] production — ActiveRecord::RecordInvalid #252 (NEW)
- 1x Upwork message from Sheh A.

### kai@nustechnology.com — 1 email
- JIRA LIFM2-409 Import Shopify payouts (Anoma)

### ken@nustechnology.com (NewsLetter) — 212 emails
- GitHub: Precognize PRs (SR-7105, SR-7191, SR-7165) — reviews from KfirBernstein, majdhajjo08, mahkris, nusdavid
- mimaizumi/amocc-material: WhO wallpaper, Salesforce departure roadmap
- welligence/WellStack: WDE fixes, rate limiting
- Linear: 3x WYA tasks (Knowledge APIs, Campaign Analytics, Add-ons)

---

## 2. Slack

### Baamboozle — 14 msgs
- Carrick fixed explicit keyword detection for gif/image search, PR [#581](https://github.com/baamboozle/baamboozle-web-app/pull/581). Investigating prorated invoice Stripe issue.

### RDC - FM Monitoring — 0 msgs

### Swift Studio (BXR) — 9 msgs
- Carrick working on Gift Card: updated UI, checkout fields, dummy Mindbody account. Rory wants sprint closed tomorrow.

### Xtreme Soft Solutions — 15 msgs
- Kai discussed TuffPoly changes with Madhuraka, focused on LIF
- **ALERT:** Anoma reporting return ticket issue + YTD showing 0
- **DAILY REPORT CHECK — Kai: PASSED** ("LIFM2-268: Update feedback → Done, moved to QA")

### SAM GUARD — 21 msgs
- 14 HubSpot MQL leads (Brazil). Michelle: DP 638/637/635 cannot reproduce. Yuval → talk to Eleonora.
- **ALERT:** App store inactivity warning — need to show activity (Lena asking about app size)

### GLOBAL GRAZING SERVICES — 15 msgs
- Joey requesting focus on mapping + grazing front office bugs (#30,31,33,34,38,39,40,41)
- Amy confirmed Nick off today, back tomorrow
- **ALERT:** Joey pressing for maps + grazing bugs go-live (3 bugs left: popup, duplicates)
- **ALERT:** Bug 55 (accessories) + bug 56 on live, potentially major
- **DAILY REPORT CHECK — Nick: OFF** (confirmed by Amy)

### Amazing Meds — 3 msgs
- Gil asked Nick NUS to remove tab on Amazing Method page. Gil generating new images.

### Generator — 16 msgs
- Rudi pushed CMS bugfix to prod (MR !319). Requested Carrick review MR !296 (firebase notifications).
- **Carrick deployed ShouldQueue to production** — resolved SMTP 451 timeout (was MEDIUM alert yesterday, now RESOLVED)
- Violet: release could be tomorrow, pulling together ticket list

### LegalAtoms — 6 msgs
- Tyler-journal: mtejeda ETA Maryland 03/24, Texas 03/25→03/27. Mira urging Texas priority.
- No Nick-specific alerts.

### MyPersonalFootballCoach — 0 msgs
### William Bills — 3 msgs
- Duong asked Ollie about issues (Lucas off). Oliver asking about Maxwell WP admin URL.

### Equanimity — 0 msgs
### SoCal Auto Wraps — 0 msgs
### Aigile Dev — 0 msgs

---

## 3. Discord

### AirAgri (nusvinn) — ~50 msgs
- **ALERT:** James getting endless "stop alarm" SMS — group sending not grouping properly. Vinn deployed alarm update to production.
- dapackage: hazard map branch rebase issues, PHP version compatibility on prod, missing service-account.json
- James wants layers/training module/ICAM investigation workflows next
- **DAILY REPORT CHECK — Vinn: PASSED** ("alarm logic updates, deployed to production")
- **DAILY REPORT CHECK — Jeff: OFF** Mar 23 (personal). Back Mar 24, continuing Corrective Actions.

### HOMIEAPP — 0 msgs
### Bizurk — Missing Access (known issue, user communicates directly)

---

## 4. Web Monitor

| Site | Status | SSL Expires | Response |
|------|--------|-------------|----------|
| samguard.co | 301 (redirect OK) | 2026-06-12 (80d) | 1.13s |

---

## 5. Google Docs — Task Logs (Monday Mar 23)

| # | Project | Person | Mon 23 | Status |
|---|---------|--------|--------|--------|
| 1 | Xtreme Soft | LongVV | 8h | OK |
| 2 | James Diamond | PhucVT | **0h** | **ALERT** — no hours logged |
| 3 | Fountain | (see below) | 3h total | See Fountain section |
| 4 | Paturevision | VietPH | 0h | OK — on leave |
| 5 | Generator | KhanhHH | 8h | OK |
| 5 | Generator | NamNN | **6h** | **ALERT** — below 8h min |
| 5 | Generator | NghiepNQ | 8h | OK |
| 5 | Generator | ToanNT | 8h | OK |
| 6 | Marcel | DuongDN | 0h | OK — adhoc |
| 7 | Rory/BXR | LeNH | 0h | — |
| 8 | Francesca/RDC | LeNH | 0h | — |
| 9 | Aysar/Baamboozle | LeNH | 0h | — |
| — | *LeNH combined* | LeNH | **0h** | **ALERT** — 0h task log but 8h Upwork (task log delay) |
| 10 | John Yi | TuanNT | 0h | — |
| 11 | William Bills | TuanNT | 0h | — |
| — | *TuanNT combined* | TuanNT | **0h** | **ALERT** — 0h all projects |
| 11 | William Bills | DuongDN | 2h | Fix backdoor issue |

### William Bills — Task Log Status
- Column P = "Chua" (not written) for TuanNT on W17

### Fountain 5-Part Check (W19: Mar 23-29)

**1. Matrix Plan** — @trinhmtt 2026-03-23 08:32:
- ViTHT: 22h | ThinhT: 4h | HaVS: 24h | VuQT: 40h | QC: 22.5h

**2. Task Log Actuals (Mon 23)**

| Developer | Role | Mon 23 |
|-----------|------|--------|
| ViTHT | Dev | 0h |
| ThinhT | Dev | 0h |
| HaVS | Dev | 0h |
| VuTQ | Dev | 0h |
| PhatDLT | QC | 3h |
| HungPN | QC | 0h |
| **Total** | | **3h** |

**3. Plan vs Actual**

| Developer | Weekly Plan | Mon Actual | Expected (~1/5) | Status |
|-----------|-----------|------------|-----------------|--------|
| ViTHT | 22h | 0h | ~4.4h | **0h** |
| ThinhT | 4h | 0h | ~0.8h | — |
| HaVS | 24h | 0h | ~4.8h | **0h** |
| VuQT | 40h | 0h | ~8h | **0h** |
| QC | 22.5h | 3h | ~4.5h | Below pace |

All devs 0h on Monday — likely task log delay (first day of week). Trinhmtt reminded team to fill task logs. VuTQ was dealing with urgent #2789 catalog revert.

**4. Capacity & Runway**
- Total estimated: 764.25h
- Total actual: 825.00h
- **Over budget: 60.75h (8%)** — was ~60h yesterday, stable
- Weekly capacity: 90h dev + 22.5h QC = 112.5h total

**5. Over-estimate Tracking**

| Task | Est | Actual | Over% | vs Yesterday |
|------|-----|--------|-------|-------------|
| #2595 GiftDrop Redemption | 120h | 168.25h | +40% | **stable** |
| #2615 Gift of Choice | 12h | 79.25h | +560% | **stable** |
| #2742 GoC Payment | 12h | 19.25h | +60% | **stable** |

No growth in over-estimate tasks (W19 day 1). Continue monitoring.

---

## 6. Daily Report Checks

| Person | Where | Status | Detail |
|--------|-------|--------|--------|
| Kai | Xtreme Soft Slack | **PASSED** | LIFM2-268 done, moved to QA |
| Nick | Global Grazing #maintenance | **OFF** | Amy confirmed off today, back tomorrow |
| Jeff | AirAgri Discord | **OFF** | Personal matters Mon 23, back Tue 24 |
| Vinn | AirAgri Discord | **PASSED** | Alarm logic updates, deployed to prod |

---

## 7. Scrin.io

| Employee | Mon 23 | Task Log (John Yi) | Match |
|----------|--------|-------------------|-------|
| Nick (TuanNT) | 0h | 0h | OK (both 0h) |

**Note:** TuanNT 0h on both Scrin and task log. Could be task log delay or absence — needs follow-up.

---

## 8. Upwork (This week: Mar 23-29)

| Workroom | Developer | Mon 23 | Week Total | Task Log Mon | Match |
|----------|-----------|--------|------------|-------------|-------|
| Rory | LeNH | 4h | 4:20h | 0h | **MISMATCH** — Upwork 4h, task log 0h |
| Aysar | LeNH | 4h | 4:00h | 0h | **MISMATCH** — Upwork 4h, task log 0h |
| **LeNH total** | | **8h** | **8:20h** | **0h** | **Task log NOT filled** |
| Bailey DEV1 | VietPH | 0h | 0:00h | 0h | OK — on leave |
| Bailey DEV3 | DuongDN | 0h | 0:00h | 0h | OK — adhoc |
| Neural Contract | external | 0h | 0:00h | — | 0h this week (client msg Mar 16 still unanswered) |

**Key finding:** LeNH worked 8h Monday per Upwork (4h Rory + 4h Aysar) but logged 0h in all 3 task logs. **Task log delay confirmed, not absence.**

### Upwork Messages
- **Neural Contract:** 0h tracked. Client's Mar 16 bug report (file upload error) still has no visible response from our side — now 8 days.

---

## 9. GitHub

### Elena-SamGuard (duongdn)
- **PR #290** (DP-648 async external tag search) — OPEN, awaiting review. Created Mar 23 11:57. [Link](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/290)
- PR #289 (fix/redmine/77734): DONE
- PR #288 (DP-650): deployed, no ticket status update

### Precognize (nusken) — 4 active PRs
- [#4793](https://github.com/Precognize/development/pull/4793) SR-7105 investigation close API (mahkris) — NEW
- [#4792](https://github.com/Precognize/development/pull/4792) SR-7165 server adjustments rest→socket (majdhajjo08)
- [#4791](https://github.com/Precognize/development/pull/4791) SR-7102 hybrid time config API (nusdavid)
- [#4785](https://github.com/Precognize/development/pull/4785) SR-7191 unit test fix (nusdavid)

---

## 9. Redmine

- **#77734** "[Canvas] Canvas Turns Blank" — Status: Tested on Staging (High). Assigned: Tung Dong-Viet. PR #289 merged+deployed, ticket in QA.
- No other tickets updated in window.

---

## 10. Matrix (Fountain Room)

- **08:25 @trinhmtt:** Urgent revert request for #2789 (catalog accidentally uploaded to gifts) → VuTQ
- **08:32 @trinhmtt:** Posted W19 plan (ViTHT 22h, ThinhT 4h, HaVS 24h, VuQT 40h, QC 22.5h)
- **08:41 @vutq:** Acknowledged

---

## 11. Trello

### Fountain Board — Key Findings
- **Customer bugs:** Kunal + Mike reported build-a-box OOS display issues (card [#2793](https://trello.com/c/D759SFBu)). Iris flagged single rose box OOS ([#2790](https://trello.com/c/ownkMNdg)).
- **Auto OOS disabled on LIVE** — Rick confirmed auto-marking stopped ([#2786](https://trello.com/c/v5cmhOKG))
- **Active cards:** 59 total (38 To-Do, 11 Bugs, 3 Doing, 5 QC Internal, 1 QA Backlog, 1 Not Passed)
- **Hard to release (Doing 14+d):** [#2595](https://trello.com/c/m4aJ98Up) (124d), [#2695](https://trello.com/c/DfP5ExzX) (53d, 41d inactive), [#2640](https://trello.com/c/poDqYoiE) (75d, 46d inactive)
- **Stuck QC:** [#2380](https://trello.com/c/oHJ5YO8y) (52d), [#2666](https://trello.com/c/EoG6XcQe) (10d), [#2742](https://trello.com/c/mVKP9Y1z) (6d), [#2615](https://trello.com/c/NBzXZigw) (7d)

### Check Progress — Completion Decisions

| Checklist | Item | Decision | Reason |
|-----------|------|----------|--------|
| Normal | Maddy - Carrick/Kai/Luis | **ALERT** | Anoma reporting return ticket + YTD=0 issues |
| Normal | Blake | **COMPLETE** | SoCal 0 msgs |
| Normal | John Yi - Amazing Meds | **ALERT** | TuanNT 0h, Scrin 0h |
| Should do | James Diamond - Vinn task | **ALERT** | PhucVT 0h, Jeff off |
| Closely monitor | Rory | **COMPLETE** | Swift Studio active, no alerts |
| Closely monitor | Aysar | **COMPLETE** | Baamboozle GitHub bot only |
| Closely monitor | Franc | **COMPLETE** | RDC 0 msgs |
| Closely monitor | Elliott | **ALERT** | NamNN 6h (below 8h min) |
| Work | MPFC | **COMPLETE** | 0 msgs |
| Work | Marcel | **COMPLETE** | 0 msgs, adhoc 0h OK |
| Work | Elena - SamGuard | **ACTION** | PR #290 needs review |
| Work | Raymond - LegalAtoms | **COMPLETE** | No Nick-specific alerts |
| Work | Neural Contract | **COMPLETE** | No emails |
| Work | Bailey | **ALERT** | Bug 55+56 on live potentially major |
| Work | Andrew Taraba | **COMPLETE** | Bizurk access known issue |
| Work | Rebecca - William Bills | **ALERT** | TuanNT "Chua", 0h |
| Work | Colin | **COMPLETE** | Aigile 0 msgs |
| Work | Fountain | **ALERT** | Customer bugs #2793/#2790, all devs 0h, FountainGifts prod error |
| Pending | Elena WordPress | — | Separate from SamGuard |

### Check Mail — All 6 accounts checked → COMPLETE all

---

## Critical Alerts Summary

| # | Severity | Area | Issue |
|---|----------|------|-------|
| 1 | **HIGH** | Fountain | Build-a-box OOS bugs — 2 customer reports (Kunal, Mike) [#2793](https://trello.com/c/D759SFBu) |
| 2 | **HIGH** | Fountain | FountainGifts production ActiveRecord::RecordInvalid #252 (NEW) |
| 3 | **HIGH** | Global Grazing | Bug 55+56 on live potentially major. Joey pressing for go-live |
| 4 | **HIGH** | AirAgri | Endless "stop alarm" SMS — Vinn deploying fix |
| 5 | MEDIUM | SAM GUARD | App store inactivity warning |
| 6 | MEDIUM | Xtreme Soft | Anoma: return ticket + YTD=0 issues |
| 7 | MEDIUM | GitLab | carrick tokens expiring ≤7 days |
| 8 | MEDIUM | Fountain | All devs 0h Mon task log (likely delay) |
| 9 | MEDIUM | Task Logs | PhucVT 0h, LeNH 0h (all 3), TuanNT 0h (all), NamNN 6h |
| 10 | INFO | Generator | SMTP 451 fix deployed to prod — **RESOLVED** |
| 11 | INFO | Elena | PR #290 (DP-648) open, needs review |
| 12 | — | Various | VietPH on leave, Nick (GG) off, Jeff off Mon, Marcel adhoc 0h OK |

---

## Unresolved Questions

1. **PhucVT (James Diamond)** — 0h Mon. Absent or task log delay?
2. **LeNH** — 0h task log but 8h Upwork (4h Rory + 4h Aysar). **Task log delay confirmed.** Needs to fill task logs.
3. **TuanNT** — 0h Scrin + task log + "Chua" on William Bills. Absent or not filled?
4. **Fountain devs all 0h** — Task log delay (Trinhmtt reminded team) or actual absence?
5. **Fountain build-a-box #2793** — OOS display bugs, multiple customer reports. Who is investigating?
6. **FountainGifts prod error #252** — ActiveRecord::RecordInvalid. New error, who handles?
7. **Global Grazing bug 55+56** — Joey says potentially major on live. What's the remediation plan?
8. **Elena PR #290** — DP-648 async tag search. Auto-review+merge+deploy per workflow?
