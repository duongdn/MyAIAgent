# Daily Report — 2026-10-01 (Thursday)

**Run:** 2026-10-01T05:10:00+07:00 (cron), corrected 08:55 (+07:00)
**Window:** 2026-09-30T05:10:00+07:00 → 2026-10-01T05:10:00+07:00
**Leave plan:** ~~No approved leave on record for 2026-09-30/10-01 (LongVV/PhucVT/TuanNT/KhanhHH/LeNH).~~ Refreshed 08:40 (`parse-leave-emails.js`): **KhanhHH on approved leave 09-25, 09-28, 09-29, 09-30** (về quê giải quyết giấy tờ, idle/internal, no makeup). Back today: she posted in the Aysar Matrix room 08:32 that she is resuming Aysar tasks. Resource Arrangement room 09-30: HaVS full day, SamHT + ThienTM morning. Nothing for TuanNT, LongVV, LeNH.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream | ~~TuanNT 0h across all Workstream projects (Speedventory only source, 8h 09-28 / 4h 09-29 / **0h 09-30**), no leave note — gates Rebecca + Bailey~~ 08:45: raw `/review/week` rows now show **TuanNT 1h on 09-30** ("Add a Modal for POS accepting Payment"). Not 0h, so Rebecca + Bailey gates pass. Still a real shortfall: **1h vs 8h, no leave** (week: 8h / 4h / 1h). Matrix shows him busy 09-30 getting access to a legacy project, so this is probably unlogged time. Reminder not sent. |
| 2 | Sheets/Workstream | ~~KhanhHH 0h across all Workstream projects on 09-30, no leave note — gates Aysar + Elliott~~ **False alert.** KhanhHH was on approved leave 09-25 → 09-30 (leave plan refreshed 08:40). Elliott completed. |
| 3 | Sheets/Workstream | ~~PhucVT 0h across all Workstream projects on 09-30, no leave note~~ **Not an alert.** PhucVT is ad-hoc/external, 0h on Workstream is expected (standing rule since 07-29). He did log 8h on 09-28. |
| 4 | Slack Xtreme (Maddy) | ~~Client (anomawasala) asked "why this error comes for some items, when upload to Shopify?" 09-30 20:16 — still unanswered as of run time (~9h)~~ Answered 10-01 08:41 by Kai: "You don't worry it" / "Just ignore". Maddy completed. The answer is terse and gives no reason; worth a glance if Anoma follows up. |
| 5 | Email vuongtrancr@gmail.com | New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" ×12 for Swish/Delayed-newform — recurring signal-loss pattern |
| 6 | Email rick@ | [FirstProject] production — 2 new Rollbar errors: #1121 IntegrationError, #1122 NotFoundError (production, not staging) |
| 7 | Performance MPFC | Apdex 0.43 (poor), chronic WP_Error::get_method() (20x) + continue-targeting-switch E_WARNING (217x) + NEW `mysqli_real_connect(): Too many connections` (5x) |
| 8 | Matrix (internal) | honght: 4 people (Joey Bailey - PatureVision/Speedventory, DuongDN, ThangN, James Diamond) working only until 2026-10-09 — need task transfer plan |
| 9 | Upwork Memo | ~~Rory/Aysar/Marcel (Tokenlite) sessions all blocked (Cloudflare/login) — memo validity unverified this run, not a memo-invalid finding~~ 08:48: Rory and Aysar read fine, **0 memos on 09-30** (nobody tracked time), nothing to validate. Tokenlite timesheet still not readable; Workstream shows 0h on Tokenlite 09-30, so no memo is due. No alert. |
| 10 | Fountain Trello board (customer) | Kunal asks to @rick570 with **no reply on the board**: (a) 10-01 03:29 **TEST backend returning 502, Puma not running** since ~03:17 ([card](https://trello.com/c/uPcfRWzN)); (b) 09-29 04:27 "whats the status with this?" on [Infinity - Account and Auth](https://trello.com/c/xIukJjhO); (c) 09-29 09:16 asks for the [development master key](https://trello.com/c/tY3yvAti); (d) 09-29 10:12 [stripe webhook crash fix](https://trello.com/c/FxAv6ODy) waiting for review (2 days); (e) 09-29 11:09 "we can push this live" on [GiftDrop Recipient flow](https://trello.com/c/tSuQHKwj); (f) overnight 09-30 21:59 → 10-01 03:00: PRs #512, #513, #514 (privacy fix, must be live before any holiday window), #515 + storefront #556 ready for review. Fountain stays ○. |
| 11 | Sheets/Workstream | **LongVV 2h on 09-30** (OhCleo only) against the 8h/day OhCleo target, no leave. Week so far: 8h / 4h / 2h. You already reminded him 09-30 08:48 about 09-29. Reminder not sent. |
| 12 | Workstream review | OhCleo: 8 LongVV rows `Pending` review (09-28 → 09-30, 12h). Reviewers: **DuongDN, MinhTV**. |

**Today (Thu 10-01):** ~~No staff leave on record; all present.~~ KhanhHH back from leave today. MinhTC off 10-01 → 10-02 (Resource Arrangement). No leave for the 5 PHP-team devs today.

---

## Email — all — 05:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | Payslip 09/2026, HR mentoring session — no alert | no events |
| carrick@nustechnology.com | 15 | Socalautowraps Rollbar daily summary + 9x GitLab "Failed pipeline" (definitive-guide upgrade/phase0-ci, later Fixed) — informational | no events shown |
| nick@nustechnology.com | 1 | Heroku cert renewal failed for hpd-merchant — minor, no John Yi content | no events |
| rick@nustechnology.com | 26 | See Alert #6 (FirstProject prod #1121/#1122). Rest are FountainStaging BugSnag (staging, not prod) + Fountain/Infinity daily Rollbar summaries — matches clean New Relic apdex below | 14:30 "OmniGPT Daily Sync" |
| kai@nustechnology.com | 5 | JIRA LIFM2-469/409 assignments/mentions — routine | no events |
| ken@nustechnology.com | 80 | Mostly newsletters/marketing noise, no Precognize PR alerts found | 08:30 DE Standup, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 14 | See Alert #5 | — |
| dnduongus@gmail.com | 35 | Personal — bank receipts, Tikop, newsletters. No security/breach alerts. | — |
| davidztv19@gmail.com | 1 | Basecamp ResidentRadius activity digest (Arthur team unrelated project) | — |
| freelancer@mypersonalfootballcoach.com | 1 | Rollbar MPFC daily summary: 1 existing prod error, 0 new | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete.

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 3 | #testing channel noise only (skjamie25 unrelated pings). **Aysar MPDM (C07SQ4HAUHZ): 0 new messages this window** — KhanhHH has 0h Workstream on Baamboozle this week → silence is normal, not an alert |
| RDC - FM Monitoring | 0 | none |
| Swift Studio | 0 | none |
| Xtreme Soft Solutions | ~~2~~ 4 | ~~See Alert #4~~ Anoma DM 09-30 20:16 (Shopify upload error, screenshot) → Kai replied 10-01 08:41. See `## Maddy`. |
| SAM GUARD - Mobile | 3 | HubSpot MQL lead notifications only |
| Global Grazing Services | 9 | Nick posted daily report ("Deploy Grazing software desktop/filter production...") ✓. Team thread on hiding menu item until tested — routine |
| Amazing Meds | — | Ignore List (cancelled 2026-09-28) — not checked |
| Generator | 0 | none |
| LegalAtoms | 0 | none |
| MyPersonalFootballCoach | 3 | MPDM freelancer thread — client asked follow-up, kwd2mj8hrv replied same day "I'll come back about all of them" — resolved/in-progress, not stalled |
| William Bills | 0 | none |
| Equanimity | 0 | none |
| SoCal Auto Wraps | — | Dropped 2026-05-11, no item |
| Aigile Dev | 2 | Routine blog-post deploy notice |
| OhCleo | — | See OhCleo section below |

Trello: Baamboozle(Aysar)/RDC(Franc)/Swift(Rory)/SAMGUARD(Elena-paused)/GGS(Bailey)/Generator(Elliott)/LegalAtoms(Raymond)/MPFC/WilliamBills(Rebecca)/Equanimity(Marcel)/Aigile(Colin) — see per-item notes below; ~~Maddy(Xtreme) ⚠️ skipped (Alert #4).~~ Maddy ✓ complete 08:52 (client question answered).

---

## Discord — all — 05:10 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | multiple | bellatric02 QA pass notes; **jeff_trinh daily report present** (4h: Emergency Alert done, Profile Setting done, Location Sharing WIP) ✓ |
| Bizurk (nuscarrick) | 0 channel / 7 DM | Andrew Taraba DM (animeworld) active — routine modal-color feedback, nuscarrick responded same day |

Trello: James Diamond-Vinn ✓ (Jeff report present), Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all — 05:10 (+07:00)

Workstream is primary for all projects except Bailey (Bailey now also on Workstream `speedventory` per 2026-08-21 migration — no separate Sheet needed).

| Project | Client | Dev hours (week, 09-28→09-30) | Reviewer charged | Review status |
|---------|--------|-------------------------------|-------------------|----------------|
| Maddy (Xtreme) | Kai/Carrick/Luis | LongVV 2h (ad-hoc, no target); LuHX 6.75h | need_review=false | — |
| James Diamond | Vinn | LeNH 21h (5h / 8h / 8h on 09-30), AnhNH2 12h | reviewers PhucVT, LeNH; all rows NotRequired | — |
| Family App | Charles Chang | LuHX 6.83h | need_review=false | — |
| Fountain | Kunal | see Fountain section | — | excluded (per instruction) |
| Marcel (Tokenlite) | Marcel | DuongDN 1h | need_review=false | — |
| Radio Data Center | Franc | LeNH 3h | need_review=false | — |
| Speedventory | Bailey | TuanNT ~~12h wk (0h today — **Alert #1**)~~ 13h wk: 8h / 4h / **1h on 09-30** (raw rows, 08:45; the aggregate script still drops the 09-30 row), DatNC 2h, VyNL 2h, TrinhMTT 3.5h, VuTQ 16h, NamNN 1.5h | need_review=false | — |
| OhCleo | OhCleo | LongVV 12h wk: 6h / 4h / **2h on 09-30** (Alert #11) | need_review=false | reviewStatus: **Pending** — 8 rows (visual direction cover arts, AI tag taxonomy, SEO audit, visual identity) — ⚠️ reviewers: DuongDN, MinhTV (Alert #12) |
| Baamboozle, Colin/ETZ, Generator, Amazing Meds, Elevate365, Neural Contract, LegalAtoms, BXR App, Crystal lang, Blair Brown, Rebecca | — | 0h logged, no members this week | — | — |

~~KhanhHH: **not found on any Workstream project this week** → Alert #2. PhucVT: **not found on any Workstream project this week** → Alert #3. Both cross-checked via `workstream-fetch-project-week.js all` (covers all 19 tracked projects) — recommend interactive recheck given prior false-0h history on these two devs.~~

**Recheck 08:45 (raw `/review/week` rows across the 20 live projects, per dev):**

| Dev | 09-28 | 09-29 | 09-30 | Status |
|-----|-------|-------|-------|--------|
| TuanNT | 8h | 4h (PM dental leave) | **1h** | ⚠️ 7h short on 09-30, no leave. Gates pass (combined > 0). |
| KhanhHH | leave | leave | leave | Approved leave 09-25 → 09-30. No alert. |
| PhucVT | 8h | — | — | Ad-hoc/external, hours informational. No alert. |
| LeNH | 8h | 8h | 8h | OK (James Diamond 5+8+8, Radio Data Center 3). |
| LongVV | 8h (OhCleo 6 + Maddy 2) | 4h | **2h** | ⚠️ OhCleo target is 8h/day. |

**Maddy JIRA weekly cross-check:** ~~not run this pass (time-boxed) — recommend recheck.~~ Run 08:50, see `## Maddy` below.

---

## Maddy — W40 — 08:50 (+07:00)

### 1. Task Log Hours (Workstream `maddy`, 09-30)
| Developer | 09-30 | Week total | Status |
|-----------|-------|------------|--------|
| LongVV (Kai role) | 0h | 2h (09-28) | informational, ad-hoc. No alert |
| LuHX | 0.25h | 6.75h | unmanaged role, not Kai gate |

reviewers = [] → need_review = false.

### 2. Slack / Kai Daily Report Check
- LongVV had 0h on Maddy for 09-30, so the daily-report check doesn't apply.
- Client messages: Anoma (DM, 09-30 20:16) "why this error comes for some items, when upload to Shopify?" + screenshot. Kai replied 10-01 08:41 "You don't worry it" / "Just ignore" ✅. **Nothing unanswered.** No Madhuraka messages in the window.

### 3. JIRA
- Weekly cross-check (unchanged from yesterday): 2 Workstream entries without ticket key (1h "Investigate why items sold are draft on Shopify", 1h "Investigate approach to improve quoting tool results"), so no est and no JIRA log ⚠️
- Updated in the last 3 days: LIFM2-409 Import Shopify payouts [To Do, Highest] est 113.25h / spent 111.25h (upd 09-30); **LIFM2-469 International Shipping Labels [To Do, High] new, no estimate yet** (upd 09-30); LIFM2-467 In-Home Quote Form [Testing - Anoma, High] est 2h / spent 2.5h → over 0.5h (unchanged); LIFM2-455, -450 (6h est / 6.2h), -465 no change.
- Risk tickets: LIFM2-260 Done, LIFM2-439 Done, LIFM2-409 moved Testing → To Do on 09-30 (2h of estimate left).

### 4. Bitbucket PR Status (`xtreme-web/rms`, 9 open)
| PR | Created | Comments (last) |
|----|---------|-----------------|
| #551 re-activate products by SKU | 09-29 | 2 (Rovo Dev bot) |
| #549 LIFM2-467 in-home pickup quote | 09-24 | 0 |
| #548 LIFM2-468 Lens title | 09-22 | 1 (bot) |
| #544 LIFM2-465 | 09-10 | 0 |
| #540 LIFM2-450 | 09-03 | 0 |
| #534 concurrent cron fix | 08-26 | 1 (bot) |
| #520 Quotes page refresh | 07-15 | 0 |
| #509 LIFM2-428 | 06-22 | 5 (bot last 08-14) |
| #481 LIFM2-409 | 04-20 | 2 (bot last 09-25). Waiting on customer, not a blocker |

No human review comments waiting on our reply.

Trello: Maddy ✓ complete 08:52. Open notes only: LIFM2-467 +0.5h over estimate, LIFM2-469 has no estimate, 2 untagged Workstream entries.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-30): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:10 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI`. trinhmtt posted this week's plan Mon 2026-09-28 09:02: **ViTHT: 40h, ThinhT: 20h, DatNT: 40h => QC: 25h**.

**Part 2 — Task Log Actuals (Workstream, week 09-28→10-04, through 09-30):**
| Dev | Actual so far |
|-----|----------------|
| DatNT | 24h (8+8+8) |
| ViTHT | 1.5h |
| ThinhT | 12h (4+4+4) |
| VuTQ (QC) | 8h (2+6) |
| HungPN | 3h |
| TrinhMTT | 5h |

**Part 3 — Plan vs Actual (week in progress, Thu/Fri remain):** ViTHT 1.5/40h, ThinhT 12/20h, DatNT 24/40h, QC(VuTQ) 8/25h — all on pace mid-week, not flagged.

**Part 4 — Capacity & Runway ("Est vs Charged" tab, live read 08:50):** Narrow 28 tasks / **229.00h**, Broad 63 tasks / **328.50h**. Identical to 09-28, still frozen. Runway ≈2.7 weeks at 86h/wk.

**Part 5 — Over-estimate (Actual > (Est+CR)×1.2):** **36** items (37 on 09-28). Top: #2627 0.5→8.25h (+1550%, Has Bug on Live), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2545 1→7.5h (+650%), #2630 0.5→3.75h (+650%), #2613 2→14.5h (+625%), #2652 1.5→10.5h (+600%), #2501 4→25.5h (+538%).

**Trello Board (Fountain, [Web Development](https://trello.com/b/5475eaf923a9a1309357eb51)):** ~~not deep-checked this pass (time-boxed) — no new customer comments surfaced via Matrix room content this window. Recommend recheck for stuck-card / hard-to-release scan.~~ Checked 08:47.
- Lists: To-Do 18, Bugs 22, Doing 6, QC Internal Backlog 8, QA Backlog 3, In QA 1.
- **Kunal comments with no board reply** (times +07): see Alert #10. Six items, the urgent one is the TEST backend 502 reported 10-01 03:29. I can only see board comments; anything answered by email or on GitHub would not show here.
- Answered since yesterday: test-environment questions (rick570 09-30 11:09 and 14:49: base branch switched to master, pgvector + Gemini key set on TEST and LIVE) ✅; Performance card (09-29 16:28) ✅.
- Doing 14+ days: [Fountain - Accessibility](https://trello.com/c/g2xsiaYs) 15d, [Fountain - Work Gallery](https://trello.com/c/0gB5xjxr) 14d. Doing 7d: [Fountain Pro CSV template](https://trello.com/c/uRtnp0LH).
- QC Internal Backlog no activity 7–13d: [Update menu](https://trello.com/c/dFWK4pLu) 13d, [reviews](https://trello.com/c/AdUlQD3t) 9d, [Infinity mail chimp](https://trello.com/c/XcjZ6KmH) 8d, [Smart Hybrid Product Search](https://trello.com/c/37XQvT4c) 7d.
- Bugs list: 16 cards with no activity for 5+ days, oldest [Giftdrop Links Not Sending](https://trello.com/c/aQTGei9q) 171d, [Infinity Order 6358531LG](https://trello.com/c/HmXH3XIu) 147d, [Pro order did not upload all recipients](https://trello.com/c/fsBtvRtJ) 104d.

Trello: Fountain ○. Parts 1-5 are clean; held for the unanswered customer comments (Alert #10).

---

## Elena — 05:10 (+07:00)

Paused per Ignore List (2026-09-09) — auto-completed, not actively monitored. Note: 2 open PRs exist (#311 feature/implement-share-component, #309 header/modal i18n) but not acted on per pause. Precognize (nusken): 0 open PRs.

**WordPress SamGuard (samguard.co, 08:46):** HTTP 200, 0 jsErrors, 0 pageErrors, 0 cspViolations. Only GA/Ads/LinkedIn beacon aborts and lazy mp4 aborts (noise). Trello: Elena - WordPress SamGuard ✓ complete.

---

## Trello — 05:10 (+07:00)

**Ignore List — auto-completed (paused/cancelled):** Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds.

| Item | Result |
|------|--------|
| Maddy | ~~⚠️ skipped — Alert #4 (unanswered Shopify question)~~ ✓ complete 08:52 (Kai answered 08:41) |
| James Diamond - Vinn | ✓ complete |
| Franc | ✓ complete (RDC 0 msgs) |
| Rory | ✓ complete (Swift Studio 0 msgs) |
| Aysar | ✓ complete (MPDM silent, KhanhHH 0h Baamboozle this week) |
| Elliott | ~~⚠️ skipped — KhanhHH 0h today (Alert #2), Generator Slack 0 msgs otherwise~~ ✓ complete 08:52 (KhanhHH on approved leave, Generator Slack quiet) |
| Raymond - LegalAtoms | ✓ complete |
| Marcel | ✓ complete (Equanimity 0 msgs) |
| Andrew Taraba | ✓ complete |
| MPFC | ✓ complete |
| Rebecca (William Bills) | ~~⚠️ skipped — TuanNT 0h today (Alert #1)~~ ✓ complete 08:52 (TuanNT 1h logged, William Bills Slack quiet) |
| Neural Contract | ✓ complete (no messages = normal) |
| Bailey | ~~⚠️ skipped — TuanNT 0h today (Alert #1); GGS Slack clean (Nick report present)~~ ✓ complete 08:52 (TuanNT 1h logged; GGS Slack clean, Nick report present) |
| Fountain | ~~⚠️ skipped — Trello board not checked this pass~~ ○ open: Kunal comments unanswered on the customer board (Alert #10) |
| Ohcleo | ✓ complete (Tony daily report present, no Celine message) |
| Elena - WordPress SamGuard | ✓ complete 08:52 (clean) |

**Live card state 08:52:** [Check progress](https://trello.com/c/UTih6xfC) **21/22 ✓**, only Fountain - DOCUMENT open. Check mail 6/6 ✓.

---

## Matrix — 05:10 (+07:00)

**Active rooms: 26/149 | Messages: 371** *(since 2026-09-30 05:10)*
Full details: reports/2026-10-01/matrix-rooms-0505.md

### ⚠️ Action items for DuongDN (6)

| Room | Time | Message |
|------|------|---------|
| (internal, id `!cYxDcwWxBhnuXxpryq`) | 15:07 | honght: "Hi anh, Các bạn sau sẽ làm việc đến hết ngày 09/10/2026. Em thông tin đến anh để anh sắp xếp transfer task nhé." (Joey Bailey-PatureVision/Speedventory, DuongDN, ThangN, James Diamond) — ⚠️ needs task-transfer plan by 10/09, duongdn replied "ok e" |
| Elena - Active Alerts | 09:55 | anhttl: cross-review process discussion — duongdn to think through detailed process |
| Elena - Active Alerts | 10:02 | anhttl: "Anh Dương sẽ là người chịu trách nhiệm đảm bảo có review chéo..." — duongdn assigned as review-process owner |
| Elena - Active Alerts | 15:44 | kietnht: FE/BE review split suggestion, awaiting decision |
| NUS - Access Control | 09:22 | honght: fill out PhucNH's offboarding checklist |
| Sandor Antal - Lyf Support | 11:00 | minhtv: needs host account confirmation |

### Key updates

**Internal ops:** honght flagged 4 people (incl. duongdn himself) rolling off projects by 2026-10-09 — task transfer planning needed. PhucNH offboarding checklist pending action.

**LongVV:** duongdn reminded him 08:48 that only 6h logged for OhCleo on 09-29 — check for missing task-log entries.

**TuanNT:** onboarded/regained access to a legacy project (Atlassian/Discord shared, Trello credentials reset) — namtv + duongdn resolved access issues same-day.

**Since cron (05:00 → 08:44, 4 msgs, reports/2026-10-01/matrix-rooms-0844.md):** KhanhHH (Aysar room, 08:32) is back and resuming Aysar tasks, asks LeNH to hand over anything new. namtv (BDD - Delivery, 08:39): Gil's customer is cutting to 80h/month from next week. Charles - Family: minhtv tells luhx the client messaged last night, luhx has seen it.

**Other:** Fountain team — routine PR review/deploy coordination (ViTHT, DatNT, ThinhT, VuTQ) on card 3035/PR #553/#460, no blockers surfaced.

---

## OhCleo Slack — 05:10 (+07:00)

~~Not separately fetched this pass (time-boxed) — Workstream shows LongVV 12h this week (2h today) with 8 rows pending review (see Sheets section). Recommend recheck to pull Celine DM + #events-code for this window.~~ Fetched 08:46.

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 1 | Tony's daily report, 09-30 18:25 (+07) |
| #events-code | — | Tony's account is not a member of this channel (needs a re-invite from Celine/Tony) |

Tony daily report: **present** 09-30 18:25. Technical SEO Audit of Homepage (dev done), AI tag taxonomy re-tagging (updated feedback), fix languages in some transcriptions (dev done), cover-art visual direction (in progress). No message from Celine in the window.

The report lists 4 items but only 2h is logged on Workstream for 09-30 (Alert #11).

Trello: Ohcleo ✓ complete.

---

## Performance — all — 05:10 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.97 | 126ms | 2.7% (634/23470) — ~95% benign NotAuthenticated/ValidationError | 16.3/min |
| MyPersonalFootballCoach | 0.43 (poor) | 1981ms | 0.52% (255/48851) | 34.0/min |
| Fountain Gifts | 0.99 | — | 0.01% (12/84533) | — |
| InfinityRoses | 0.98 | — | 0.02% (4/19157) | — |

**OhCleo topErrors:** NotAuthenticated (majority, benign), ValidationError (duplicate username/invalid code, benign user input), AuthenticationFailed "Passwords don't match" (3x), `ValueError: Invalid bcrypt hash format` (2x, worth a look), invalid email format (1x).
**OhCleo slowestTransactions:** ChatSendView.post 4124ms/2calls, MediaListView.get 2002ms/64calls, AppleLoginView.post 1225ms/19calls, CategoryMediaView.get 870ms/218calls, EmailVerificationView.post 841ms/21calls.

**MPFC topErrors:** `"continue" targeting switch` E_WARNING (217x, chronic), `WP_Error::get_method()` (20x, chronic), **NEW: `mysqli_real_connect(): Too many connections`** (5x), `JSON_API_Auth_Controller::error()` (5x, chronic), `mkdir(): File name too long` (4x).
**MPFC slowestTransactions (all >50s):** user-video/louka-tsonis-unit-6 55.6s/1call, SQLi WAITFOR DELAY probe on /search/ 54.3s/1call (unsuccessful), user-video/akos_week11_warmup 53.7s/2calls, sitemap_index.xml 52.4s/1call, author-sitemap.xml 51.7s/1call.

**Fountain topErrors:** ArgumentError wrong-args (12x, same chronic signature), Redis::CannotConnectError (2x). **Infinity topErrors:** ArgumentError (4x), Redis (2x), CSRF token (1x). Both healthy.

---

## Upwork Memo — 2026-09-30 — 05:10 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | ~~Cloudflare challenge blocked — session/Cloudflare failure, not a memo-invalid finding. Trello unaffected (Rory gate is Slack-only).~~ 08:48: read OK, 0 memos on 09-30 (no time tracked; BXR App 0h on Workstream). Nothing to validate. |
| Aysar | ~~Live+stored+headless login all failed (carrick Chrome Profile 1 session needs a live touch). Same — not a memo finding.~~ 08:48: read OK, 0 memos on 09-30 (KhanhHH on leave). Nothing to validate. |
| Tokenlite (Marcel) | ~~Same login failure pattern (duongdn account).~~ Timesheet not readable at 08:50 either (2 tries, after opening upwork.com in Chrome Profile 9). The duongdn Upwork login itself is valid until 10-12. Workstream shows 0h on Tokenlite for 09-30, so no memo is due. |

~~Manual fix: open upwork.com once in carrick's/duongdn's real Chrome to refresh session (per `feedback_upwork_access_token_needs_live_browser_touch`).~~ Done for carrick (fixed Rory/Aysar). No invalid memos.

---

## Arthur / Meta-Stamp

Paused per Ignore List (2026-09-09) — auto-completed, not actively monitored this run.

---

## Reminders — 05:10 (+07:00)

- TuanNT: ~~needs reminder (0h today, no leave)~~ low hours, **1h on 09-30**, no leave. The 0h template does not apply; a reminder would need the real number. **Not sent** (no `--send-reminder` flag).
- KhanhHH: ~~needs reminder (0h today, no leave) — **not sent**~~ skipped (approved leave 09-25 → 09-30)
- PhucVT: ~~needs reminder (0h today, no leave) — **not sent**~~ skipped (ad-hoc/external, never reminded)
- LongVV: ~~skipped (has hours, ad-hoc no target)~~ low hours, **2h on 09-30** vs 8h OhCleo target. You reminded him in Matrix 09-30 08:48 about 09-29. **Not sent** for 09-30.
- LeNH: skipped (has 8h via James Diamond)

---

## Unresolved Questions

1. Fountain board: has rick570 answered Kunal outside Trello (email/GitHub) on the master key, the Infinity auth status, and the stripe webhook PR? The board shows no reply. The TEST backend 502 (Puma down since ~03:17) needs someone today.
2. TuanNT (1h) and LongVV (2h) on 09-30: send reminders? Run `/me:daily-report reminders --send-reminder` or say so.
3. OhCleo: 8 rows pending review are addressed to you and MinhTV.
4. Maddy: LIFM2-467 is 0.5h over estimate and LIFM2-469 (High) has no estimate. I completed the Trello item since the client question is answered; say if the overrun should hold it.
5. honght's 2026-10-09 roll-off note: task-transfer plan still needed before that date.
