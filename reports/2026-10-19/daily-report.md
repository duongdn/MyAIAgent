# Daily Report — 2026-10-19 (Monday)

**Run:** 2026-10-19T05:00+07:00 (cron, mpfc host), corrected 08:35 + 08:55 (+07:00) (recheck, local)
**Window:** 2026-10-16 05:09 → 2026-10-19 05:13 (+07:00). Task-log date: **Friday 2026-10-16 (last workday)**.
**Leave plan:** Leave parser refreshed 05:05: no approved leave on record. From Matrix (10-16): DanhTD off 19/10 and 23/10. Week 19/10 dev plan: ThamTTH idle/small jobs.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack Xtreme (Maddy) | **Madhuraka asked Kai a direct question Sat 21:56, still unanswered (re-checked 08:30):** "If I send [468] live and a user tries it before updating their extension… would it completely fail or… handle absence of the additional information gracefully?" ([link](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1792249003369239)). Madhuraka also commented on [PR #548](https://bitbucket.org/xtreme-web/rms/pull-requests/548) and updated LIFM2-468 on 10-18. Still open from Friday: his offer of a new project with conditions to hide the offshore team (Kai agreed) needs DuongDN's decision. LIFM2-470 is in Testing with **no estimate and no JIRA log** (WS 0.02h). Maddy ○ |
| 2 | Discord Bizurk (Andrew Taraba) | ~~**animeworld DMs unanswered:** "update??? / what this?" Fri 08:53. Then on Sat 07:41–15:28 he sent **3 new POS feature requests**: admin menu shortcut to the POS; search input auto-focused so it accepts barcode UPCs; handle fast scans, which type digit by digit. He also shared a Drive "POS" folder for plugin uploads. No nuscarrick reply in the window (re-checked 08:30: no new DMs either way). Andrew Taraba ○~~ → **Resolved 08:39:** nuscarrick replied "Let me check" (a holding reply, counts as answered). Andrew Taraba ✓ |
| 10 | **Slack Meta-Stamp (Arthur), customer** | **Chris Coyne sent 2 direct asks today, both unanswered** ([#msv3-official](https://meta-stamp.slack.com/archives/C0BM37DJDD2)):<br>**05:33** "I need your **honest answer on the money before anything starts**". He wants all of R1 ($1,701) + B1 ($81), no backfill. Payment: the $1,701 held on M4 releases when Tommy confirms (a)/(b) + R6 this week. **Today** $931.50 (½ R1 + B1). **The other ½ R1 ($850.50) is paid only "the day the AllVerified deal closes"**, i.e. contingent on his deal, which is a payment risk. If OK: start **Mon 10-19**, staging **Fri 10-23**. Plus: quote the cost of making the 85/15 split a per-partner setting (R1-e reads STRIPE_PLATFORM_FEE_PERCENT), and a question: "how will rows written before R1 show in the new views?" (spec v5 attached).<br>**05:59** wants the per-caller **rate limit** quoted *now* and built in the same pass if small.<br>Needs a decision from DuongDN/namtv on the payment terms before PhucVT starts. ~~Arthur on Ignore List, auto-completed~~ → Arthur ○ |
| 3 | Fountain Trello board | **New 06:56 today:** Kunal asked @rick570 "can you push this live tonight?" for the **Oct 19 release (backend #747, then website #912)**, to go right after the Oct 16 release. So Rick now has 2 releases queued for tonight. Earlier: **Kunal (via his AI) asked @rick570 Fri 21:04 UTC to deploy backend #731 (6 additive migrations) first, then website #901** ([card](https://trello.com/c/bF2JzKzp)). This replaces the 10-16 04:46 "4 PRs for tonight" list. No Rick reply yet (re-checked 08:30). Kunal also restructured the board: archived most cards and created new lists (Next rollout / In progress / Bugs / Ideas and later) and an "Accessibility check on V2" card. Fountain - DOCUMENT ○ |
| 4 | Slack OhCleo (DM Celine) | ~~Celine Fri 17:16: "can you please let me know status - how much is left approximately?" after Tony's daily report + progress video. Tony's only follow-up is an empty-text post (attachment). **No ETA has been given yet.** Celine has been asking since 10-15. Internal plan (Matrix 17:19): tell her QC found bugs (9 on the new mobile build), fix Monday, then send. Tony's 08:43 reply on the free-listens question was "No, I don't, but let me check", with no follow-up. Ohcleo ○~~ → **Resolved (recheck 08:35):** the cron missed a thread reply. Tony answered in-thread Fri 17:20: "I find a few bugs, I'll fix them on Monday and send it to you then". Celine 17:23: "Ok awesome! … I have a few observations on the new creator page I will share". The 'let me check' on free listens is a holding reply (counts as answered). Ohcleo ✓ |
| 5 | Slack GGS #presta-9-update | Joey's 10-15 15:27 question to Amy is **still unanswered after 3+ days** (re-checked 08:30: still no thread reply): "As long as we use same server and make it work exactly the same as current live we shouldn't have any issues though?" Go-live target is this Wednesday ([thread](https://globalgrazingservices.slack.com/archives/C0A9HSU29DL/p1792052876181139)). Nick's daily report 10-16 17:16 is present ✅. Amy's onboarding/translation update was acked by Joey ✅. Bailey ○ |
| 6 | Slack Baamboozle #testing | Jamie Sat 08:01 sent new colour changes (button active #2D4766 / hover #3B678B, folder inactive…). Carrick has no ack yet (weekend; re-checked 08:30, still no reply or reaction). Friday's revert-dark-mode ask was done 14:53 ✅. Aysar ○ until acked |
| 7 | Workstream review | **Crystal lang (Arthur): 4 rows Pending**, reviewer TienND: PhucVT 10-13 2:00 + 3:00, 10-15 2:00, 10-16 5:00. ~~Arthur itself is on the Ignore List~~ (Arthur active again, see Alert #10). OhCleo pending rows from last week are now resolved ✅ |
| 8 | Email rick@ / vuongtrancr@ | New **production** Rollbar errors: InfinityRoses #458 (10-16 15:39). FirstProject #1130 RangeError max call stack + #906 TypeError (project still unidentified). Traslochi-Online #26, #27 (10-18). The Swish New Relic "Signal lost / Low Throughput" alert is still flapping (chronic). Staging noise (FountainStaging/BE) is INFO |
| 9 | Performance | MPFC apdex **0.40** (poor, chronic): `continue` E_WARNING 2605x, WP_Error::get_method() 124x (also Rollbar #50, 10 occurrences in 5 min), new `Class 'MM_Event' not found` 3x, DNS mysqli failures 4x. Infinity ArgumentError 37x + UnknownFormat 34x. Fountain import_csv 96s/1. The Fountain V2 NameError (#372) has **not recurred** ✅ |

**Today (Oct 19):** DanhTD off. Everyone else present as far as known. The Fountain Monday plan from @trinhmtt is not posted yet (still absent at 08:29, expected by 09:30).

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 0 | — | no events |
| carrick@ | 39 | Mailjet compliance replied on the account-suspension review (#4279499), action for Carrick. GitLab SSH key expired. Andrew shared "POS" Drive folder (Alert #2). Upwork msg from Rory H. SoCal Jetpack offline/online flapping x17 (Blake dropped, FYI) | no events |
| nick@ | 0 | — | no events |
| rick@ | 53 | ⚠️ InfinityRoses prod #458. FirstProject prod #1130, #906, #1121 (Alert #8). FountainStaging/BE staging noise (#140/#142/#126/#134 100th) = INFO. Infinity credit-payment logs (normal) | 10:30 OmniGPT Daily Sync; 11:00 + 12:30 HEAL Meeting |
| kai@ | 4 | Madhuraka: PR #548 comment + LIFM2-468 update 10-18 (Alert #1). Rovo Dev on PR #558 | 08:30 DE - Daily Standup |
| ken@ | 80 | Precognize/development PR activity (none from nusken). Welligence dependabot = INFO | 08:30 DE - Daily Standup Session |
| vuongtrancr@gmail.com | 80 | ⚠️ Traslochi-Online prod #26/#27. Swish NR signal-lost x4 (chronic). Mirko Bitbucket PR/commit flood (helpdone #40–#52, delayedflight #831/#832 security fixes) = INFO | — |
| dnduongus@gmail.com | 52 | No security alerts (newsletters, bank receipts, Teams msg from Thủy Hoàng) | — |
| davidztv19@gmail.com | 4 | Slack confirmation code (duongdn logging in 16:02, expected). Basecamp ResidentRadius digest | — |
| freelancer@mpfc | 7 | Rollbar #50 WP_Error 10/5min (chronic). DO db-mysql CPU high triggered 10:06 and resolved 10:24 (10-16). Mentoring Report form receipt | — |

Trello: Check mail — all 6 items ✓ complete, card done.

---

## Slack — all — 05:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 50 | **MPDM Carrick "Some reports for today" 10-16 16:48** ✅ (#744 verification email branding). Revert dark mode done ✅. Carrick resolved Aysar's comments on #698/#718, which go out for release this weekend; Aysar merged several PRs 10-19 02:09–03:52. ⚠️ Jamie's Sat colour changes are unacked (Alert #6). Aysar posted dev API keys in DM to Carrick (redacted, dev use only) |
| RDC - FM Monitoring | 41 | dmetiner pushed admin-panel preset logic + logout button + a security-check webhook to staging "for next week". Carrick: back Monday ✅. Quarterly feedback form received ✅. Carrick weekly progress report Oct 12–16 posted. Tuner logs |
| Swift Studio | 6 | Henry/Rory agreed the design estimate split ✅. Jeff 13:23: "Upwork contracts paused again", asked Rory to resume (our ask to the client) |
| Xtreme Soft Solutions | 1 | ⚠️ Madhuraka's 468 question unanswered (Alert #1) |
| SAM GUARD - Mobile | 2 | #optimization: Michelle asked about OP-54/55. Lena: "all addressed" ✅ |
| Global Grazing Services | 3 | Nick's daily report 10-16 17:16 ✅. Amy's onboarding updates. Joey will check ✅. ⚠️ Joey's 10-15 thread still open (Alert #5) |
| LegalAtoms | 35 | Production Florida-divorce filing bug (filed without notarization). Handled and hotfixed by Talha (not Nick). No Nick mentions |
| Amazing Meds | — | Ignore List (cancelled). Not refreshed |
| Generator / MPFC / William Bills / Equanimity / SoCal | 0 | quiet |
| Aigile Dev | 2 | bot alerts + newsletter (Colin = Ignore List) |

Aysar pre-check: KhanhHH has 2.5h on WS Baamboozle for 10-16, and the MPDM report is present → the gate is OK. Held only for Jamie's ask (Alert #6).

Trello: Rory ✓, Franc ✓, Raymond ✓, Marcel ✓, MPFC ✓ / ⚠️ Aysar (#6) / ⚠️ Bailey (#5) / ⚠️ Maddy (#1).

---

## Discord — all — 05:02 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 39 | **Vinn "Just report my process today"** ✅: PR reviews #777–780, SOS device investigation (Huntly/Carrs) with a report. Conclusion: SMS/email are sent, but alert config and no-signal delays cause the lag. James: no device→server issue. dapackage: onboarding plans/Silver tier copy, live-map + kinetic-limit PRs for re-review. James asks for a 4-digit email code at signup. **Jeff daily report (4h)** ✅ + TestFlight build. Jeff asked James questions on SOS/hazard alerts |
| Bizurk (nuscarrick) | 0 + DM 15 | ⚠️ animeworld "update???" plus 3 new POS features, all unanswered (Alert #2) |

Trello: James Diamond ✓ (Vinn + Jeff reports present, LeNH 8h Fri). ~~⚠️ Andrew Taraba (Alert #2)~~ → ✓ (nuscarrick 08:39 "Let me check").

---

## Scrin.io — 05:02 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-10-16):** 0h, no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — Fri 2026-10-16 (last workday) — 05:10 (+07:00)

Source: `workstream-fetch-project-week.js 2026-10-16` (token refreshed via the Keycloak API). Combined per-dev across all projects.

| Developer | Mon 10-12 | Tue 10-13 | Wed 10-14 | Thu 10-15 | Fri 10-16 | Per-project (Fri) | Status |
|-----------|-----------|-----------|-----------|-----------|-----------|-------------------|--------|
| KhanhHH | 8.0h | 8.0h | 8.0h | 8.0h | 8.0h | RDC (Franc) 5.5 + Baamboozle 2.5 | ✅ |
| LeNH | 8.0h | 8.0h | 8.0h | 8.0h | 8.0h | James Diamond 8 | ✅ (10-15 backfilled after Friday's reminder) |
| LongVV | 8.0h | 6.0h | 6.0h | 8.0h | 6.02h | OhCleo 6 + Maddy 0.02 | informational (ad-hoc) |
| TuanNT | 0h (sick) | 8.0h | 6.5h | 8.5h | 9.0h | Bailey 9 | ✅ |
| PhucVT | — | 8.0h | 8.0h | 8.0h | 8.0h | Arthur 5 + DefinitiveGuide 3 | ignore (ad-hoc/Arthur) |

**Workstream review status (week):**

| Project | Dev hours (wk) | Reviewer charged | Review status |
|---------|----------------|------------------|---------------|
| Maddy | LongVV 0.02h, ThanhNX 1h | — | need_review = false |
| Baamboozle | KhanhHH 14.33h | — | need_review = false |
| Franc (Radio Data Center) | KhanhHH 24.67h | LeNH 0h | NotRequired |
| Rory (BXR) | KhanhHH 1h, TuanTT 0.5h | — | need_review = false |
| James Diamond (Portfolio) | LeNH 40h, AnhNH2 20h | PhucVT/LeNH (LeNH 40h dev) | NotRequired |
| Definitive Guide | PhucVT 20h, LongVV 14h | — | need_review = false |
| Bailey (Speedventory) | TuanNT 27.83h, VyNL 26.5h, TrinhMTT 18h, VuTQ 4.5h, DatNC 4h, DuongDN 1h, NamNN 0.5h | — | need_review = false |
| Andrew Taraba | TuanNT 4.17h | — | need_review = false |
| OhCleo | LongVV 20h, LuHX 8.5h, HungPN 7h, ThienVN 3h | DuongDN/MinhTV 0h | Reviewed (no Pending left) ✅ |
| Crystal lang (Arthur) | PhucVT 12h | TienND 0h | **Pending** (4 rows, Alert #7) |
| Charles Chang (Family App) | LuHX 7.5h | — | need_review = false |
| Elena (Samguard) | 10 devs, ~280h | — | need_review = false |
| Marcel | DuongDN 0.5h | — | need_review = false |
| Fountain | excluded from review check | | |

Workstream needs review: PhucVT, Clarify new requirements/estimate & fix (2:00, 10-13) + Add many existing pockets to a catalog (3:00, 10-13) + Clarify customer feedback on M4 scope (2:00, 10-15) + Fix bugs/clarify/investigate+estimate (5:00, 10-16). Reviewer(s): TienND (Crystal lang).

---

## Maddy — W(10-12) — 05:20 (+07:00)

### 1. Task Log Hours (Fri 10-16)
| Developer | Fri | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV (Maddy) | 0.02h | 0.02h | informational only, ad-hoc |
| ThanhNX (testing) | 1h | 1h | — |

### 2. Slack / Kai Daily Report Check
- Maddy WS hours are only 0.02h (470 note), so the Kai report check doesn't apply.
- ⚠️ Madhuraka's 468 live-rollout compatibility question (Sat 21:56) is unanswered (Alert #1).
- ⚠️ Carried over: the concealed-offshore new-project offer still needs DuongDN's decision.
- Matrix (Xtreme room 08:59): duongdn questioned starting 470 without an approved estimate. LongVV: do first, report later. duongdn: note it clearly in the task log.

### 3. JIRA (`maddy-jira-tasklog-check.js --week 2026-10-16`)
| Ticket | Summary | Status | Est | Actual (JIRA) | WS Log | Check |
|--------|---------|--------|-----|---------------|--------|-------|
| [LIFM2-470](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-470) | Custom percentage updates | Testing - Anoma | 0h | 0h | 0.02h | ⚠️ no est ⚠️ no JIRA log |

### 4. Bitbucket PR Status (`xtreme-web/rms`, 7 open)
| PR | Last update | Comments | Title |
|----|-------------|----------|-------|
| [#548](https://bitbucket.org/xtreme-web/rms/pull-requests/548) | 10-18 | 1 | LIFM2-468 Lens title selection (Madhuraka commented 10-18) |
| [#558](https://bitbucket.org/xtreme-web/rms/pull-requests/558) | 10-16 | 2 | LIFM2-470 Restrict/flag custom payout percentages |
| [#540](https://bitbucket.org/xtreme-web/rms/pull-requests/540) | 10-06 | 0 | LIFM2-450 |
| [#481](https://bitbucket.org/xtreme-web/rms/pull-requests/481) | 09-25 | 2 | LIFM2-409 (waiting on customer, not our blocker) |
| [#544](https://bitbucket.org/xtreme-web/rms/pull-requests/544) | 09-21 | 0 | LIFM2-465 |
| [#534](https://bitbucket.org/xtreme-web/rms/pull-requests/534) | 08-26 | 1 | cron quote-assembling fix |
| [#509](https://bitbucket.org/xtreme-web/rms/pull-requests/509) | 08-14 | 4 | LIFM2-428 |

Trello: ⚠️ Maddy skipped (Alert #1).

---

## Fountain — 05:20 (+07:00)

**Part 1 — Matrix plan:** this week's plan isn't posted yet (Monday, expected 08:30–09:30). Using last week's (@trinhmtt, Mon 10-12 08:44) for context: DatNT 8h+ · ViTHT 40h · VuTQ 20h · ThinhT 12h → QC 20h.

**Part 2 — Workstream actuals (full week 10-12 → 10-16):** DatNT 20.58h · ViTHT 40h · VuTQ 20h · ThinhT 12h · QC PhatDLT 12h + HungPN 7.5h = 19.5h (TrinhMTT 11h excluded, not QC).

**Part 3 — Plan vs Actual (W 10-12, final):**
| Dev | Plan | Actual | Note |
|-----|------|--------|------|
| DatNT | 8h+ | 20.58h | over plan (V2 merge/deploy) |
| ViTHT | 40h | 40h | ✅ met (Thursday's logging lag caught up) |
| VuTQ | 20h | 20h | ✅ met (+4.5h Bailey) |
| ThinhT | 12h | 12h | ✅ met |
| QC | 20h | 19.5h | ✅ ~met |

**Part 4 — Capacity & Runway:** re-fetched live (Est vs Charged, A13:L118, 106 rows). Unchanged/frozen: Narrow 229.00h / 28 tasks · Broad 328.50h / 63 tasks.
**Part 5 — Over-estimate:** **37 items >120%**, unchanged.

**Trello board (Web Development):** ⚠️ Kunal deploy request #731 → #901, plus **new 06:56: Oct 19 release #747 → #912, "push this live tonight?"** (Alert #3). Kunal reorganized the board on 10-16 20:44–21:58 UTC (mass archive/moves). Open lists now: Next rollout 6 · In progress 3 · Bugs 4 · Ideas and later 9 · Notes 5 · Yearly reminders 1. Rick created the "RestClient ReadTimeout" bug card (15:39). Matrix: live sign-up shows a generic error when Mailgun rejects an email (TrinhMTT logging it as a bug).

Trello: ⚠️ Fountain - DOCUMENT skipped (Alert #3).

---

## Elena — 05:10 (+07:00)

- Elena - SamGuard Digital Plant: Ignore List (paused). FYI: the Optimization team is on M2 (header, highlight API, model steps). Michelle's OP-54/55 questions were answered.
- **WordPress samguard.co:** HTTP 200, 0 jsErrors / 0 pageErrors / 0 cspViolations. 7 GA/ads/LinkedIn `failedRequests` (noise). Clean. Trello: Elena - WordPress SamGuard ✓.

---

## Trello — Check progress — 05:30 (+07:00)

[Check progress](https://trello.com/c/eReZd0ub) · [Check mail](https://trello.com/c/qr858jZP) (all done)

- Rory ✓ · Franc ✓ · James Diamond ✓ · Raymond ✓ · Marcel ✓ · MPFC ✓ · Elena - WordPress SamGuard ✓
- Neural Contract ✓: ~~Upwork is Cloudflare-blocked on this host… Last verified clean 10-16 09:00~~ → re-verified live 08:27 (local): newest msg is ours 10-16 (quarterly feedback form). Newest client msg 09-28. Nothing unanswered.
- ⚠️ Maddy: skipped (Alert #1)
- ⚠️ Aysar: skipped (Alert #6)
- ⚠️ Bailey: skipped (Alert #5)
- ~~⚠️ Andrew Taraba: skipped (Alert #2)~~ → Andrew Taraba ✓ (08:55, nuscarrick replied 08:39)
- ⚠️ Arthur - Meta-Stamp: ~~Ignore List, auto-completed~~ → reopened ○ 08:55 (Alert #10, Chris's payment-terms ask unanswered)
- ⚠️ Fountain - DOCUMENT: skipped (Alert #3)
- ~~⚠️ Ohcleo: skipped (Alert #4)~~ → Ohcleo ✓ (recheck 08:35, answered in-thread)

## Ignore List — 05:30 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, ~~Arthur - Meta-Stamp~~ (removed 08:55, active again), Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:30 (+07:00)
- No dev at 0h on Fri 10-16: KhanhHH 8h, LeNH 8h, TuanNT 9h, LongVV 6.02h (no target), PhucVT 8h (ignored). Nothing to send.

---

## Matrix — 05:03 (+07:00)

**Active rooms: 21 / 151 | Messages: 471** *(since 10-16 05:09)*
Full details: reports/2026-10-19/matrix-rooms-0503.md

No pending action items for DuongDN. Both script-flagged items were already answered: namtv on TienND's focus (duongdn: "OK để sync lại info"), and the Arthur R1 estimate review (done 15:56–17:14).

### Key updates

**OhCleo: mobile new design, 9 QC bugs** (~~ETA pending~~ Tony told Celine fix Monday then send ✅):
- Thien replaced Khoa on mobile. HungPN found 9 bugs on the 16:56 build. Plan: fix Monday, video sent to Celine first.

**Arthur: R1 estimate sent** 21:41:
- R1 is new work outside fixed cost. R2–R5 are recommended for later. duongdn reviewed the wording (no "ours", answer 6.5.1 explicitly).

**Bailey: prod deploys + translations**:
- TuanNT restored missing translations from backup after deploy. TrinhMTT 15:10 flagged [#81496](https://redmine.nustechnology.com/issues/81496) / [#81483](https://redmine.nustechnology.com/issues/81483) as urgent, with no visible reply.

**Other:**
- Lyf: Demo→prod merged. Google-signup forgot-password flow fails login (raised to customer).
- Xtreme: duongdn asked LongVV to note 470 clearly in the task log.
- DefinitiveGuide: customer issuing payment for the outstanding bill.
- Fountain: live sign-up error message UX bug.
- Training: vinhnt + duongdn to split sessions Monday.

---

## OhCleo Slack — 05:05 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 6 | 08:43 Tony: "No, I don't, but let me check" (free listens, no follow-up). **17:15 Tony daily report** (mobile streamline visual identity, transcript reading page) + progress video note. 17:16 Celine: "ok, where can I see the video?" / ⚠️ "can you please let me know status - how much is left approximately?" Tony 17:16 posted the progress video (mp4). ~~with no ETA in text~~ → thread: Tony 17:20 "I find a few bugs, I'll fix them on Monday and send it to you then", Celine 17:23 "Ok awesome!" ✅ |
| #events-code | — | channel_not_found (known; needs admin re-invite) |

Times converted UTC→+07. Tony daily report present at 17:15. Trello: ~~⚠️ Ohcleo skipped (Alert #4)~~ → Ohcleo ✓ (08:35, Celine's ask answered in-thread).

---

## Performance — all — 05:12 (+07:00)

Window 10-16 05:09 → now (~72h, includes the weekend).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.98 | 166ms | 2.3% (1588/69622), ~97% benign NotAuthenticated/InvalidToken | 16.1/min |
| mpfc | **0.40** | 2165ms | 2.5% (2776/110111), 94% `continue` E_WARNING | 25.5/min |
| fountain | 0.99 | 118ms | 0.006% (10/179331) | 41.6/min |
| infinity | 0.97 | 154ms | 0.08% (39/47788) | 11.1/min |

**OhCleo topErrors:** NotAuthenticated 1477 · InvalidToken ~50 · ValidationError username exists 19 · email exists 16 · AuthenticationFailed "Passwords don't match" 7 · "User does not exist" 4 · email+username exists · invalid email 2 · ValueError Invalid bcrypt hash 1 · IntegrityError null user_id app_playhistory 1 (chronic).
**OhCleo slowest:** ai_chat ChatSendView.post 3058ms/45 · GetBookMarkDetailsView.get 1667ms/2191 · CreatorVerificationSubmitView.post 1655ms/3 · CancelSubscriptionView.post 1274ms/1 · EmailVerificationView.post 982ms/38.

**MPFC topErrors:** `continue` targeting switch E_WARNING 2605 · WP_Error::get_method() 124 · mkdir name too long 14 · count() non-countable 8 · mysqli getaddrinfo failed 4 · require legacy-widget.php 3 · mysqli no such file 3 · **Class 'MM_Event' not found (pfc7 functions.php:3834) 3 (new)** · undefined get_header() 2+2.
**MPFC slowest:** jquery-ui `*.min.js.map` requests ~49–52s/3 each (selectable, dialog, datepicker, droppable, progressbar). Looks like scanner/sourcemap probes hitting an uncached WP path.

**Fountain topErrors:** Twilio 21610 unsubscribed recipient 6 · ArgumentError wrong args (3 for 2) 4. NameError GiftVariant (#372): 0 ✅.
**Fountain slowest:** admin/product_catalogs/import_csv 96380ms/1 · ActiveStorage::AnalyzeJob 58960ms/3 (bg) · staff/assistants/ask 6640ms/10 · AssistantCheckWorker 6282ms/213 · staff/customer_service/search 5065ms/4.

**Infinity topErrors:** ArgumentError wrong args 37 · UnknownFormat 34 · RestClient ReadTimeout 2.
**Infinity slowest:** ShipStationShipmentWorker 11043ms/5 (bg) · paypals/authorize_order 2938ms/3 · registrations/create 1630ms/2 · payment_intents/create 1580ms/14 · search 1408ms/93.

---

## Arthur / Meta-Stamp — 08:55 (+07:00)
~~Paused per user. Not run, Trello auto-completed.~~ → Active again. Full detail (Vietnamese): `reports/2026-10-19/0855-arthur-monitor.md`

- **Customer Slack Meta-Stamp (new source, wasn't monitored before):** Chris Fri 08:05 gave go-ahead for R6 + bulk add/move/delete on production. David deployed 11:29 ✅. Gate payment part 2: $1,388 sent (total $3,330), $1,701 held until R2–R6 pass on production. The R1 estimate was sent Fri 21:36 (21h, $90/h −10% → $1,701; backfill 5.5h separate). **Today 05:33 + 05:59, Chris's answer: Alert #10, unanswered.**
- **Matrix Arthur (internal, Fri):** PhucVT split the issues into 3 groups. namtv: "Ưu tiên wrap up trước". DuongDN reviewed the R1 wording (no "ours", answer 6.5.1 explicitly). Price $90/h, 10% discount confirmed with namtv. Nothing after Fri 21:41.
- **Workstream:** Crystal lang still has 4 rows Pending → TienND (Alert #7).
- **Not checked this pass:** Solid Code Slack (the token in Profile 15 is dead, invalid_auth; the project has moved to Meta-Stamp) and GitHub `Christebob/Meta_Stamp_V3`. `arthur_monitor.last_run` was left as is.

---

## Upwork Memo — 2026-10-16 — 05:08 (+07:00), re-run 08:27 locally

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | ~~—~~ 0 | 0 | ~~Cloudflare Turnstile not passed~~ → fetched OK locally: no segments on 10-16 |
| Aysar | ~~—~~ 0 | 0 | ~~carrick session not accepted~~ → fetched OK locally: no segments on 10-16 (WS shows KhanhHH 2.5h on Baamboozle that day, so that time was not tracked on Upwork) |
| Tokenlite | — | — | duongdn's Upwork not logged in on the local machine either (live cookies + stored + headless all failed). Needs the user to log in once (Profile 9), then re-run headless |

No invalid memos. ~~Upwork memo: data unavailable on the mpfc host…~~ Rory/Aysar verified at 08:27.

---

## Unresolved Questions
- **Arthur: do we accept Chris's payment terms?** The second ½ of R1 ($850.50) depends on the AllVerified deal closing. Start today or not? Who replies to Chris (PhucVT/namtv), and do we send the rate-limit + per-partner split quote?
- Madhuraka's concealed-offshore new-project offer (commit as him, AU VPN): accept, refuse, or set terms? Kai already agreed (open since 10-15).
- Who answers Madhuraka's 468 backward-compat question? LongVV/Kai should reply today.
- Rick: deploy Kunal's #731 + #901, and now also #747 + #912, tonight?
- ~~Who gives Celine the mobile-app ETA, given the 9 QC bugs?~~ Tony told her: fix Monday, then send.
- Joey's server question (GGS): does Amy/Nick owe the answer before Wednesday's go-live?
- Andrew Taraba's 3 new POS features: quote first, or start as-is? (Carrick has acked with "Let me check")
- FirstProject production Rollbar (#1130/#906): which client project is this? Traslochi-Online: who owns monitoring?
- ~~Upwork memos for 10-16 need a run on the local machine after 08:00.~~ Done 08:27: Rory/Aysar 0 memos. Tokenlite needs duongdn to log in to Upwork (Profile 9).
- Aysar: KhanhHH logged 2.5h Baamboozle on 10-16, but Upwork has 0 tracked segments. Intended, or missed tracking?
