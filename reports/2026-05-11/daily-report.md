# Daily Report — Mon 2026-05-11 08:42 (+07:00)

**Window:** Fri 2026-05-08 08:42 → Mon 2026-05-11 08:42 (+07:00). Spans Fri workday + weekend + Mon morning.
**Previous run:** [reports/2026-05-08/daily-report.md](../2026-05-08/daily-report.md)

---

## Alerts Summary

| Sev | Source | Item | Action |
|---|---|---|---|
| MED | Email/Rick | [FirstProject] (Fountain) PROD recurring React #418/#423/#425 (10occ/5min @ 2026-05-11 01:10 UTC) + ChunkLoadError #882 + RangeError #1007/#1008 + nil gift_main #1006 | Triage sourcemap; flag to Kunal. Trello "Rick" mail item left UNCHECKED |
| MED | Email/Rick | [InfinityRoses] PROD nil price #421 + nil gift #419 (10th occ) + ReadTimeout #413 + FacebookAds Invalid Contents #417/#418 | Add nil-safe guards on `gift_variant.gift&.item_sku` + `object.price ‖ object.gift.price` |
| MED | Email/Carrick | [Socalautowraps] Rollbar #35 jQuery missing 10occ/5min @ 2026-05-11 01:12 UTC | Confirm asset pipeline / CDN regression. Trello "Blake" UNCHECKED |
| MED | Scrin.io | TuanNT John Yi log 6.00h vs Scrin tracked 1h 23m on Fri (over-inflated 4h 37m) | Trello "John Yi - Amazing Meds" UNCHECKED. Confirm with TuanNT |
| MED | Sheets | KhanhHH Fri aggregate 7.83h vs 8h target (Generator 0 + Aysar 7.83h, no leave) | Matrix reminder SENT to `!rwLbvLBnrRAYMaOPaD` (event $vSU-IWdvg2EZR2g34zXAxOLruFLhElk41At6_8H36G4). Trello "Elliott" UNCHECKED |
| MED | Upwork | Bailey-VietPH last week Upwork 21.5h vs task log 40h (-18.5h gap) | Trello "Bailey" UNCHECKED. Confirm tracker time with VietPH |
| MED | Upwork | Rory (LeNH) last week Upwork 16.67h vs task log 31.67h (-15h gap) | Investigate w/ LeNH |
| MED | Upwork | Neural Contract silent 25 days (since Apr 16) | Trello "Neural Contract" UNCHECKED. Confirm contract status |
| MED | Fountain | W26 plan NOT yet posted (08:22, expected by 10:00 from @trinhmtt); NS+IP scope grew +27.75h over weekend (+3 new tasks #2883/#2884/#2885 = 56h); clSdoRlL Fountain States 37.7d in Doing | Trello "Fountain" UNCHECKED — keep until W26 plan posted |
| INFO | Email/Nick | No mail from John Yi in window | Confirm if expected |
| INFO | Email/Duongdn | HungPN on leave Mon 2026-05-11; TrinhMTT was on leave Fri 2026-05-08 | Capacity note |
| INFO | Email/Rick | FountainStaging BugSnag NoMethodError/NameError/PG::UndefinedTable in search#search | Staging only, INFO not alert |

**Net:** 9 MEDIUM alerts, 0 HIGH, 3 INFO. No tokens broken (Matrix refreshed mid-run).

---

## Email — 6 accounts

| Account | Count | Summary |
|---|---|---|
| duongdn | 7 | NUS HR/leave (HungPN 11/5, TrinhMTT 8/5), internship mtg, finance Apr part-time, ThinhLD birthday. No New Relic. |
| carrick | 2 | **PROD Socalautowraps Rollbar #35 jQuery missing 10occ/5min**; SoCal daily summary 10/5. No Generator/Elliott Redmine. |
| nick | 25 | Azure DevOps PRs CNA.Operations.App by Emir LLaneza (#1492-1497); CandaSurveyors daily 8/5; Stripe nags; ClickUp invoice. **No mail from John Yi.** |
| rick | 60 | **PROD FirstProject** React minified #418/#423/#425 + ChunkLoadError #882 + RangeError #1007/#1008 + nil gift_main #1006 + TypeError #878 amount. **PROD InfinityRoses** nil price #421 + nil gift #419 + ReadTimeout #413 + FacebookAds Invalid #417/#418. FountainStaging BugSnag (INFO). No Kunal mail. |
| kai | 13 | Madhuraka/Jira: Bitbucket PR #481/#489; Jira LIFM2-260/259/435/438/434; Anoma mentions on LIFM2-409/434. |
| ken | 254 | NewsLetter folder. Precognize PRs (5 unique): #4885 SR-7279, #4868 DP-177, #4884 SR-7300, #4886 SR-7255, #4887 sr-7252. Bulk = mimaizumi/welligence noise. |

---

## Slack — 14 workspaces (195 msgs)

All 14 tokens verified OK (xoxc Amazing Meds + Equanimity refreshed via POST per slack-verify-tokens pattern).

| Workspace | Msgs | Key content |
|---|---|---|
| Baamboozle | 21 | Aysar+Ian gamedev "Good to deploy" Mon 06:52; phaser layout updated; Carrick added Upwork tracker entries Sat |
| RDC - FM Monitoring | 20 | Tuner access logs + Sun reboot service alerts (auto-recovered). No human Franc/dmetiner msgs |
| Swift Studio | 16 | Rory+Carrick on Twilio SMS rate-limiting (1/min/account) on BXR app; MINDBODY-imported accts bypass Twilio |
| Xtreme Soft Solutions | 31 | Kai DM with Anoma — wrap-up Fri "see u Monday". Kai 16h/wk, no daily report req |
| SAM GUARD - Mobile | 2 | Michelle to Ken: estimation delayed (spec change); HubSpot MQL |
| GLOBAL GRAZING SERVICES | 2 | Bailey daily Fri OK (Prestashop storage WARN 72%); Nick task plan for Ruby/Rails upgrade next week |
| Amazing Meds | 9 | Nick Fri report (revert wp form, upgrade plugins + malware scan); Mon 08:03 Nick proactive ping to John Yi for priorities |
| Generator | 12 | Violet+Rudi release ticket coord; Parker testing complete on internal #609; Carrick+Ryan MR review reqs |
| LegalAtoms | 11 | Raymond + team discussing small claims rollout LA, GH issue #19621. No Nick mentions in 11 msgs |
| MyPersonalFootballCoach | 0 | Quiet |
| William Bills | 31 | Lucas-Oliver task list back-and-forth; Quan+Lucas dev server config (nginx, RDS, Amplify). Lucas Fri 17:01 daily 2h |
| Equanimity | 0 | Quiet (adhoc) |
| SoCal Auto Wraps | 0 | Quiet |
| Aigile Dev | 5 | Carrick to ETZ: RDS extended-support upgrade scoping; gaige alerts |

**Aysar GitHub issues** (carrick token):
- baamboozle/baamboozle-web-app: 16 open. Active in window: [#596 Upgrading tech stack LTS](https://github.com/baamboozle/baamboozle-web-app/issues/596) (nuscarrick 5-08), [#533 Change Team Ownership](https://github.com/baamboozle/baamboozle-web-app/issues/533) (aysark 5-07; deployed Nusdev Fri).
- baamboozle/bbzl-web-client: 0 open issues (13 open are all PRs).

**Person-status alerts:** none. Dev topics (Twilio, RDS, dev server) classified INFO per memory.

---

## Discord — AirAgri + Bizurk

Both tokens verified (3-step curl).

| Server | Channel | Msgs | Key content |
|---|---|---|---|
| AirAgri | airagri_webapp | 2 | James Diamond pinged Vinn 2026-05-09 13:01 + TikTok link |
| AirAgri | airagri-flutter | 0 | Silent. Last Jeff report 2026-05-08 18:20 (8min before window) |
| Bizurk | DM animeworld (Andrew) | 0 | Silent. Last reply 2026-05-08 08:02 (40min before window). Normal for low-activity client |

**Daily reports outside window (Fri-eve, just before window opens, listed for visibility):**
- Vinn 2026-05-08 17:11 — Supported Leon, SDS for corporate properties (prod), reviewed PRs #386-#388, fixed SDS loading; WIP corporate groups admin
- Jeff 2026-05-08 18:20 — Set up app links Android/iOS done; deep-link nav Task+Hazard done; next: Sensors/Safe Farm Alarms/Visitor Records deep links

**Alerts:** none. Sat/Sun silence expected; Mon reports typically arrive ~17:00 (Vinn) / ~18:00 (Jeff). Bizurk silence normal.

---

## Sheets — task logs (Fri 2026-05-08 only workday in window)

Scanned all 9 sheets, aggregated by Owner col G across projects (per `feedback_dev_project_mapping_flexible`).

| Developer | Fri Total | Per-sheet | Status |
|---|---|---|---|
| LongVV | 0.00h | Maddy=0 + JD=0 | OK (W25 partial-schedule per memory; W25 ends 5-10 — covers Fri) |
| PhucVT | 8.00h | JD=8.00 | OK |
| TuanNT | 8.00h | JohnYi=6.00 + Rebecca=2.00 + Bailey=0 | OK aggregate (BUT see Scrin.io flag) |
| VietPH | 8.00h | Paturevision=8.00 (1.25+2.75+4.00) | OK |
| KhanhHH | 7.83h | Generator=0 + Aysar=7.83 (1.0+0.5+6.33) | ⚠️ -0.17h shortfall, no leave note |
| LeNH | 8.00h | Rory=4.50 + Franc=3.50 + Aysar=0 + Rebecca(Q-T)=0 | OK |

Other owners on Paturevision (info): DuongDN=1.00h (adhoc OK), NamNN=8.00h, LuHX=8.00h. KhoaTD=3.00h on Rory.
Week tabs used: Maddy=W5, JD=W24, JohnYi=W22, Rebecca=W23, Paturevision=W26, Generator=W39, Rory=W10, Franc=W23, Aysar=W23. Aysar W23 = May 4-10 (Mon-start calendar verified).

**Reminders sent:** KhanhHH (see below).
**Alerts:** KhanhHH 0.17h shortfall; TuanNT see Scrin.io.

---

## Scrin.io — TuanNT vs John Yi log

| Metric | Value |
|---|---|
| Fri Scrin.io tracked (Nick/TuanNT, john yi) | **1h 23m** (1.38h) — "check plugins & security AM" 1h13m + "payment process Authorize.net" 0h10m |
| Fri John Yi sheet logged (TuanNT col G, W22 R68) | **6.00h** — "revert payment wp form / upgrade plugins wp & scan mal" |
| Delta | **+4h 37m** logged > tracked (~334%) |

Scrin week-to-date (W22 thru Fri): 25h 02m.

⚠️ **Over-inflated.** Trello "John Yi - Amazing Meds" left UNCHECKED. Confirm with TuanNT.

---

## Upwork — 5 workrooms

This week (May 11-17) all workrooms 0:00 — Mon morning expected. Comparison vs **last week (May 4-10)**:

| Workroom | Developer | Upwork Last Wk | Task Log | Delta | Note |
|---|---|---|---|---|---|
| Rory (41069448) | LeNH | 16.67h | 31.67h | **-15.00h** ⚠️ | Investigate untracked time vs non-Upwork PT |
| Aysar (35642393) | LeNH (KhanhHH actual) | 23.83h | 23.83h | OK match | Sub-contract pattern OK |
| Bailey-VietPH | VietPH | 21.50h | 40.00h | **-18.50h** ⚠️ | Largest gap. Trello "Bailey" UNCHECKED |
| Bailey-DuongDN | DuongDN | 0:00 | 1.00h | OK | INACTIVE per memory |
| Neural Contract (38901192) | Carrick | 0:00 (msgs only) | n/a | — | Silent 25 days |

**Neural Contract messages:** Last activity 2026-04-15/16 — Carrick resolved spinner bug same-day, Michael left 3 non-urgent tasks. **No messages last 7 days.** Since-start total 97h 30m unchanged. Trello "Neural Contract" UNCHECKED — confirm if active.

---

## Fountain — 5-part check

> Matrix token expired → refreshed via `matrix-token-refresh.js` (whoami `@duongdn:nustechnology.com` 200 OK). New token saved.

### Part 1 — Matrix W26 Plan
**NOT yet posted** at 08:22 (@trinhmtt typically posts Mon 09:00-11:00). Expected 1-3 hours.
Latest valid plan = **W25 (2026-05-04 11:56 @trinhmtt):** ViTHT 40h / VuTQ 8h / ThinhT 20h / DatNT 40h / => QC 27h. **Total 135h.**

### Part 2 — Task Log Actuals (W25 FINAL)
| Dev | Mon | Tue | Wed | Thu | Fri | **W25 Total** | Role |
|---|---:|---:|---:|---:|---:|---:|---|
| ViTHT | 8.0 | 8.0 | 8.0 | 4.0 | 8.0 | **36.0h** | dev |
| ThinhT | 4.0 | 4.0 | 4.0 | 4.0 | 4.0 | **20.0h** | dev |
| VuTQ | 2.5 | 0 | 0 | 1.5 | 4.0 | **8.0h** | dev |
| HaVS | 0 | 0 | 0 | 0 | 0 | **0.0h** | dev (off-plan) |
| DatNT | 8.0 | 8.0 | 8.0 | 8.0 | 8.0 | **40.0h** | dev |
| LamLQ | 0 | 0 | 8.0 | 8.0 | 8.0 | **24.0h** | dev (off-plan bonus) |
| PhatDLT | 2.0 | 2.0 | 2.0 | 2.0 | 2.0 | **10.0h** | QC |
| HungPN | 4.0 | 4.0 | 4.0 | 2.0 | 4.0 | **18.0h** | QC |

W25 plan-tracked total = 132h vs 135h plan = **−3h (97.8%)**. W26 logs not yet started.

### Part 3 — Plan vs Actual (W25)
| Dev | Plan | Actual | Δ | Result |
|---|---:|---:|---:|---|
| ViTHT | 40h | 36.0h | −4.0h | mild under (Thu only 4h) |
| ThinhT | 20h | 20.0h | ±0 | exact |
| VuTQ | 8h | 8.0h | ±0 | exact |
| DatNT | 40h | 40.0h | ±0 | exact |
| QC | 27h | 28.0h | +1h | over (HungPN recovered) |
| **Total** | **135h** | **132h** | **−3h** | **97.8% met** |

LamLQ 24h off-plan = real W25 capacity bonus.

### Part 4 — Capacity & Runway (Est+CR)
| Metric | 05-08 | **05-11** | Δ |
|---|---:|---:|---:|
| Remaining NS+IP strict | 224.75h | **252.50h** | **+27.75h** ⚠️ |
| – Not Started only | 203.00h | 239.25h | +36.25h |
| – In-progress only | 21.75h | 13.25h | −8.50h |
| Remaining Pending (#2587) | 36.50h | 36.50h | 0 |
| Remaining broader | 424.50h | 446.50h | **+22.00h** ⚠️ |
| Runway @48h/wk (NS+IP) | 4.68 wk | **5.26 wk** | +0.58 wk |

**Scope GREW** — 3 new NS tasks added: **#2883 (24h) + #2885 (20h) + #2884 (12h) = 56h fresh est.** Offset by IP→Done conversion (−8.5h). CR total 43.5h unchanged (#2735 +30, #2837 +10.5, #2815 +3).

**Status-empty stuck 5+ days (UNCHANGED 4):**
- #2869 (80h est, 0h actual) — 5+ days
- #2870 (40h est, 0h actual) — 5+ days
- #2853 (20h est, 29.75h actual)
- #2813 (track-only)

### Part 5 — Over-Estimate (actual > (Est+CR) × 1.2)
**No STILL GROWING flags.** Only #2816 +0.5h trim.

| Task | Est+CR | Actual | Over% | Status | Trend |
|---|---:|---:|---:|---|---|
| #2595 GiftDrop | 120h | 168.25h | +40% | Staging | stable |
| #2615 Gift of Choice | 12h | 106.75h | +790% | Staging | stable |
| #2735 Pro Send Smart Link | 120h (90+30CR) | 129.00h | +7.5% | IP>50 | stable |
| #2816 Infinity homepage | 20h | 44.25h | +121% | Staging | +0.5h |
| #2501 | 4h | 25.50h | +538% | Staging | stable |
| #2380 checkout date | 4h | 25.25h | +531% | Staging | stable |
| #2639 active/inactive | 2h | 16.50h | +725% | Staging | stable |
| #2624 order-complete | 12h | 31.25h | +160% | Dev Done | stable |
| #2702 | 8h | 25.00h | +213% | IP>50 | stable |
| #2837 | 26.5h (16+10.5CR) | 26.50h | 0% | Staging | stable |
| #2815 | 9h (6+3CR) | 10.75h | +19% | Staging | stable |

### Trello Board (Web Development) — Fri 08:32 → now
- **0 customer comments** (kunalsheth/tmmckay/mike62798179/iris63293413) — full weekend silence ✓
- Active 69 (−1, Not Passed cleared 1)
- Stuck cards 52 (+5 from 47 — natural weekend creep)
- Doing 14+: 4 cards stable, **clSdoRlL Fountain States 37.7d** approaching 38d, escalation overdue ([trello.com/c/clSdoRlL](https://trello.com/c/clSdoRlL))

**Recommendation:** Trello "Fountain" Check Progress UNCHECKED — W26 plan absent + scope +27.75h + #2869/#2870/#2853 = 140h+ untriaged 5+ days + clSdoRlL 37.7d.

---

## Elena — PRs + WordPress

| Item | Result |
|---|---|
| [Elena-SamGuard-Digital-Plant PRs](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pulls) | **0 open** (duongdn token) |
| [Precognize/development nusken PRs](https://github.com/Precognize/development/pulls) | **0 nusken-authored** open (6 from others — out of scope) |
| [samguard.co](https://www.samguard.co/) | HTTP 200, 0 JS errors, 0 page errors, 0 CSP violations. 16 failed reqs all benign (tracking pixels blocked + WP video lazy-load aborts) |

**Alerts:** none. No deploys queued.

---

## Trello Updates

**Cards (today, identified by latest dateLastActivity):**
- [Check mail #790](https://trello.com/c/xhYZ4zyF/790-check-mail) — 5/6 complete
- [Check progress #789](https://trello.com/c/Rsesv5I0/789-check-progress) — 13/19 complete (iterated all 5 checklists)

**Check mail:** ✓ DuongDn, Carrick, Nick, Kai, Ken | ⚠️ Skipped Rick (FirstProject + InfinityRoses recurring PROD Rollbar)

**Check progress:** ✓ Maddy, James Diamond, Rory, Aysar, Franc, MPFC, Marcel, Elena SamGuard, Raymond, Andrew Taraba, Rebecca, Colin, Elena WordPress (Pending) | ⚠️ Skipped Blake (Socalautowraps Rollbar), John Yi (Scrin over-inflation), Elliott (KhanhHH 0.17h short), Neural Contract (Upwork silent 25d), Bailey (Upwork -18.5h gap), Fountain (W26 plan absent + NS scope +27.75h)

---

## Reminders Sent

| Dev | Room | Reason | Result |
|---|---|---|---|
| KhanhHH | `!rwLbvLBnrRAYMaOPaD:nustechnology.com` | Fri 7.83h vs 8h target (Generator 0h + Aysar 7.83h, no leave) | ✓ HTTP 200, event_id `$vSU-IWdvg2EZR2g34zXAxOLruFLhElk41At6_8H36G4` |

LongVV W25 partial-schedule exempt for Fri 5-08 (W25 ended Sun 5-10). **Note:** memory `feedback_longvv_partial_week_may` expires after 2026-05-10 — confirm with user before extending into W26.

---

## Unresolved Questions

1. **LongVV W25 partial-schedule rule expired 2026-05-10.** Going forward (W26 starting today), should standard 8h/day apply, or is partial schedule extended? Friday's 0h was within W25 so still exempt; Mon onward needs confirmation.
2. **TuanNT Scrin.io over-inflation** — sheet 6h vs Scrin 1h23m on John Yi Fri. Wait for explanation before completing John Yi Trello item.
3. **Rory (-15h) and Bailey-VietPH (-18.5h) Upwork gaps** — under-tracked Upwork or off-Upwork part-time? Memory says SUM ALL rows; confirm with devs.
4. **Neural Contract** — silent 25 days since Apr 16. Active or paused? Should daily report keep tracking?
5. **Fountain W26 plan ETA** — @trinhmtt usually 09:00-11:00 Mon. Watch for revision.
6. **Fountain #2869 (80h) + #2870 (40h) + #2853 (29.75h actual)** — 5+ days status-empty. Triage owner?
7. **Fountain #2883/#2884/#2885 (NEW NS, 56h)** — dev assignment? Affects W26 capacity.
8. **clSdoRlL Fountain States 37.7d in Doing** — escalation overdue, no movement over weekend.
9. **HaVS 0h W25** — full week off-plan with no log. Off / leave / another project?
10. **Nick mailbox** — no John Yi email in window. Expected?
11. **Older duplicate "Check mail"/"Check Progress" cards** on board O83pAyqb — archive to prevent ambiguity?
