# Daily Report — 2026-10-16 (Friday)

**Run:** 2026-10-16T05:00+07:00 (cron, mpfc host), corrected 08:25–09:35 (+07:00) local recheck
**Window:** 2026-10-15 05:09 → 2026-10-16 05:20 (+07:00). Task-log date: Thu 2026-10-15.
**Leave plan:** Leave parser refreshed: no approved leave on record. From Matrix Delivery-Resource: TamVT off 15/10. Off 16/10: PhongTB (doctor), ThinhLD, TaiTM (morning), HiepNT + HauTT (LuHX covers), ThamTTH (through 16/10). DanhTD off 19/10 and 23/10.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email rick@ / Performance | **Fountain production errors after the V2 go-live (10:19).** Rollbar [FountainGifts] #372 `NameError: uninitialized constant OrderItemGiftVariantSerializer::GiftVariant` hit its 10th occurrence at 15:41 (New Relic: 12x in window). This looks like a V2 regression. Also new: #373 Twilio 21610 "unsubscribed recipient" (12x, mostly benign) and ArgumentError wrong-args (12x). Kunal is testing V2 and is happy so far on Trello. Separately, the team found live UI bugs (#81460, #81464, #81475). ~~Fountain ○~~ **08:50 recheck 🟢:** New Relic shows NameError last fired once between 16:00–19:00 yesterday and **0 times in the 13h since (67k requests)**. No new Kunal comments on the board since the cron. Fountain ✓ completed. Whether a hotfix was actually deployed isn't confirmed |
| 2 | Slack OhCleo (DM Celine) | **Celine asked at 17:31 "How much until app is done?" and followed up at 17:45: "Can you please let me know regarding the app so I can plan?" No reply.** Internally, LuHX can't take the mobile work tomorrow (Matrix 18:29). New at 02:47: Celine asks whether the new design broke free listens ("I had 3 free listenings and now I got this e-mail"). Also unanswered. Re-verified 08:30: still no Tony reply to either ask. Ohcleo ○ |
| 3 | Slack GGS #presta-9-update | Joey 14:15 set a go-live goal of **next Wednesday**. Joey 15:27 asked Amy: "As long as we use same server and make it work exactly the same as current live we shouldn't have any issues though?" No reply. Re-verified 08:40: the thread still has no reply and there's no new GGS message since 05:00 ([link](https://globalgrazingservices.slack.com/archives/C0A9HSU29DL/p1792052876181139)). Yesterday's 9 UAT issues got a holding reply from Amy at 09:14 ✅. DB Schenker staging still needs an IP whitelist. Bailey ○ |
| 4 | Slack Xtreme (Maddy) | **Madhuraka offered Kai (LongVV) a new Magento/Adobe Commerce project, 16h/week from next week, on top of Luxe It Fwd.** His conditions: commit using Madhuraka's GitHub account, work only via an Australian VPN, use his Teams/Slack identity, and "I do not want them to know we are using an offshore development team as that affects our contract" ([link](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1792051900594099)). **Kai already agreed** ("Sure, that all good with me"). This is a contract and impersonation risk that DuongDN needs to decide on. Also "Proceed with 470 asap" (17:01): [PR #558](https://bitbucket.org/xtreme-web/rms/pull-requests/558) is open, but LIFM2-470 has no estimate and 0h logged. Yesterday's 468 alert is resolved (Anoma: "Testing ok"). Maddy ○ |
| 5 | Slack Baamboozle #testing | Jamie 15:51: "please revert study mode back to dark mode", with more colour changes to come. ~~No ack from Carrick yet~~ **08:40 recheck ✅:** Carrick reacted 👀 (it's a thread reply, which the cron missed), and that is the #testing ack convention ([link](https://baamboozle.slack.com/archives/C06CMTX025R/p1792054297842209)). ~~Aysar ○~~ Aysar ✓ completed. Still track until the revert is done |
| 6 | Workstream (provisional) | **0h on Thu 10-15 for LeNH, TuanNT, LongVV and PhucVT at 05:00.** This is probably logging lag (same pattern as yesterday's false TuanNT 0h). The Matrix room shows TuanNT working 10-15 (Andrew Taraba fix done 11:11, Bailey tasks), and LeNH is a strict-gate dev. **Re-check after 09:30 before any reminder.** KhanhHH 6.33h so far. James Diamond ○ (LeNH gate), Bailey ○ |
| 7 | Email vuongtrancr@ | New client Traslochi-Online **production** Rollbar errors started 09:18: #2–#7 new, #3 reached 100 occurrences at 14:24, plus #4 NoMethodError. The Swish New Relic "Signal lost / Low Application Throughput" alert is flapping (chronic) |
| 8 | Matrix Bailey | duongdn asked TuanNT 3 times for the final estimate of [99][Console][Automatic Stock Refill]. That task is already out of hours and has new bugs. Still no number (last ask 10:25) |
| 9 | Performance | MPFC apdex 0.42 (poor, chronic): `continue` E_WARNING 1714x, WP_Error::get_method() 16x, mysqli timeouts 6x, author-sitemap 35.4s, MemberMouse processOrder.php 23.9s. GGS #maintenance: PrestaShop storage at 72% WARNING (staging copies) |

**Today (Oct 16):** PhongTB, ThinhLD, HiepNT, HauTT, ThamTTH off; TaiTM off in the morning. LuHX is full-time on another project. Everyone else present as far as known.

---

## Email — all — 05:01 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@ | 0 | — | no events |
| carrick@ | 10 | DG `upgrade/phase4-es8` failed pipelines x5 (in-progress upgrade branch, INFO). GitLab PAT GeneratorFetchCode expires in ≤30d. Upwork msg from Maya D. Slack confirmation codes x2 | no events |
| nick@ | 0 | — | no events |
| rick@ | 30 | ⚠️ FountainGifts prod #372 NameError (10x) + #373 Twilio (Alert #1). FirstProject prod #904 + #905 ChunkLoadError (project still unidentified). Staging FountainStagingBE #140 / InfinityStagingBE #116 (1000th) = INFO. Upwork msg from Ray Y. Heroku backup-MFA reminder. InfinityRoses credit-payment logs (normal) | 10:30 OmniGPT Daily Sync; 11:00 + 12:30 HEAL Meeting |
| kai@ | 4 | LIFM2-468 Anoma "Testing ok" ✅. LIFM2-470 Madhuraka: "@Kai Proceed" (Alert #4). Bitbucket SSH hostname change by 11-12 (action: update ssh config) | no events |
| ken@ | 80 | Welligence GitHub PR/CI/release noise = INFO | (see calendar script) |
| vuongtrancr@gmail.com | 20 | ⚠️ Traslochi-Online prod Rollbar #2–#7 (Alert #7). Swish NR signal-lost flapping. Swish cybersecurity-training nag | — |
| dnduongus@gmail.com | 21 | No security alerts. Google data-share with Strava = user OAuth | — |
| davidztv19@gmail.com | 1 | Basecamp ResidentRadius digest (INFO) | — |
| freelancer@mpfc | 1 | Rollbar daily: 1 existing, 0 new | — |

Trello: Check mail — all 6 items ✓ complete, card done.

---

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 6 | **MPDM Carrick "Some reports for today" 17:14** (#728 proofread punctuation, PR #61). Carrick deployed a fix on nusdev and Noah acked. ~~⚠️ Jamie's revert-dark-mode ask is unacked (Alert #5).~~ Carrick reacted 👀 to Jamie's revert-dark-mode ask (acked, Alert #5). Carrick sent the quarterly-feedback nudge |
| RDC - FM Monitoring | 55 | ✅ Yesterday's alert is resolved. Carrick acked dmetiner (branch found on francesca-fmscan staging) and agreed the 36-column CSV mapping. dmetiner: "all seem fine", backend integration in progress. Quarterly-feedback email question: namtv resent it to Doruk. RPi bot: MPX Recovery Failed 10:08 → recovered 10:39. Failed again 14:45 with no recovery msg in window (FYI). 40+ tuner access logs |
| Swift Studio | 16 | Rory: only an estimate is needed for Superchat/HubSpot, Carrick to give an indicative estimate ✅. Rory asked Jeff for Henry's time/cost; Henry needs Rory to mark Figma features first ✅ |
| Xtreme Soft Solutions | 32 | ⚠️ Madhuraka's new offshore-concealed project + 470 "proceed asap" (Alert #4) |
| SAM GUARD - Mobile | 0 | quiet |
| Global Grazing Services | 13 | Nick's daily report 17:14 (#général) ✅. Nick #maintenance 02:10: PrestaShop storage 72% WARNING, Console OK. ⚠️ Joey's server question unanswered (Alert #3) |
| Amazing Meds | — | Ignore List (cancelled). Not refreshed |
| LegalAtoms / Generator / William Bills / SoCal / SAM GUARD | 0 | quiet |
| MyPersonalFootballCoach | 2 | freelancer asked tien271 to verify the release for all memberships. tien271: "will check soon" (client's side) |
| Equanimity | 1 | Carrick's quarterly-feedback nudge |
| Aigile Dev | 1 | gaige alerts bot (Colin = Ignore List) |

Aysar pre-check: KhanhHH has 1.5h on Workstream Baamboozle for 10-15, and the MPDM report is present → OK on the gate. ~~Held only for Jamie's ask (Alert #5).~~ Jamie's ask was 👀-acked, so Aysar is completed.

Trello: Rory ✓, Franc ✓, Raymond ✓, Marcel ✓, MPFC ✓, ~~⚠️ Aysar (Alert #5)~~ Aysar ✓ (08:40) / ⚠️ Bailey (Alerts #3, #6) / ⚠️ Maddy (Alert #4).

---

## Discord — all — 05:01 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 36 | **Vinn "Just report my process today"** (Divisions Management fixes, deployed staging + prod, contractor sign-in flow). Mary (bellatric02) tested the contractor flow and it passed. James: "Well done". **Jeff daily report (4h)**: training session registration, assessment rendering. Mary confirmed the SOS location fix. Jeff asks James whether to submit to the stores. James: "Really need this pushed for review tomorrow" (Team App, Jeff working on it) |
| Bizurk (nuscarrick) | 0 + DM | Carrick delivered the forked YITH plugin and install steps. animeworld will test on staging. Asked snippet vs plugin; Carrick answered ✅ |

Trello: Andrew Taraba ✓. James Diamond ○, but only for the provisional LeNH 0h (Alert #6). Vinn + Jeff reports are present.

---

## Scrin.io — 05:01 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-10-15):** 0h, no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — Thu 2026-10-15 — 05:01 (+07:00)

Source: `workstream-fetch-project-week.js 2026-10-15` (token refreshed via the Keycloak API). Combined per-dev across all projects.

| Developer | Mon 10-12 | Tue 10-13 | Wed 10-14 | Thu 10-15 | Per-project (10-15) | Status |
|-----------|-----------|-----------|-----------|-----------|---------------------|--------|
| KhanhHH | 8.17h | 8.0h | 8.0h | 6.33h | RDC 4 + Baamboozle 1.5 + BXR App 0.83 | partial so far, recheck |
| LeNH | 8.0h | 8.0h | 8.0h | 0h* | — | ⚠️ provisional (Alert #6) |
| LongVV | 8.0h | 6.0h | 6.0h | 0h* | — | informational (ad-hoc). Active in OhCleo room + sent Tony report 10-15 |
| TuanNT | 0h (sick) | 8.0h | 6.5h | 0h* | — | ⚠️ provisional. Active in Matrix 10-15 |
| PhucVT | — | 8.0h | 8.0h | 0h* | — | ignore (ad-hoc/Arthur) |

*05:00 snapshot. 10-15 rows are typically added during the morning (yesterday the TuanNT 0h turned into 6.5h at 09:32).

**Workstream review status (week, reviewer charged / status):**

| Project | Dev hours (wk) | Reviewer charged | Review status |
|---------|----------------|------------------|---------------|
| Baamboozle | KhanhHH 11.83h | — | need_review = false |
| Radio Data Center | KhanhHH 17.83h | LeNH 0h | NotRequired |
| BXR App | KhanhHH 0.83h | — | need_review = false |
| Portfolio - James Diamond | LeNH 24h, AnhNH2 16h | PhucVT/LeNH (LeNH 24h dev) | NotRequired |
| Speedventory (Bailey) | VyNL 26.5h, TuanNT 13.83h, TrinhMTT 9.5h, VuTQ 4.5h, DatNC 4h | — | need_review = false |
| Andrew Taraba | TuanNT 0.67h | — | need_review = false |
| OhCleo | LongVV 6h, LuHX 8.5h | DuongDN/MinhTV 0h | **Pending** (4 rows): LongVV 10-12 2:00 + 4:00, LuHX 10-13 4:30, **LuHX 10-15 4:00 (new)** |
| Crystal lang | PhucVT 5h | TienND 0h | **Pending**: PhucVT 10-13 2:00 + 3:00 (unchanged) |
| Definitive Guide | LongVV 14h, PhucVT 11h | — | need_review = false |
| Family App | LuHX 7.5h | — | need_review = false |
| Samguard | TienND2 32h, KietNHT 32h, TriNM 24h, DuyVNA 23h, PhongTB 16h, VyTTH 6.5h, AnhTTL 2.75h | — | need_review = false |
| Marcel | DuongDN 0.5h | — | need_review = false |
| Fountain | excluded from review check | | |

Workstream needs review: LongVV, visual direction cover arts (2:00, 10-12) + streamline visual identity (4:00, 10-12); LuHX, Update design home page and track detail (4:30, 10-13) + Update design creators profile and creators list (4:00, 10-15). Reviewer(s): DuongDN, MinhTV (OhCleo).
Workstream needs review: PhucVT, Clarify new requirements/estimate & fix (2:00, 10-13) + Add many existing pockets to a catalog (3:00, 10-13). Reviewer(s): TienND (Crystal lang).

## Maddy — W(10-12) — 05:12 (+07:00)

### 1. Task Log Hours (Thu 10-15)
| Developer | Thu | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV (Maddy) | 0h | 0h | informational only, ad-hoc |
| Kai role | 0h | 0h | conditional gate not triggered |

### 2. Slack / Kai Daily Report Check
- Workstream Maddy hours = 0h, so the Kai report check doesn't apply.
- ✅ Yesterday's "checking 468?" was answered (Kai 09:06/09:13), and Anoma: "Testing ok".
- ⚠️ New project offer with conditions to conceal the offshore team, which Kai accepted. Plus "Proceed with 470 asap" (Alert #4).

### 3. JIRA
- `maddy-jira-tasklog-check.js --week 2026-10-15`: "No Workstream entries this week".
- Live JQL (`updated >= 2026-10-15 05:00`): [LIFM2-470](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-470) "Custom percentage updates" (Kai): **To Do, no estimate, 0h logged**. Madhuraka updated the description and said "@Kai Proceed".

### 4. Bitbucket PR Status (`xtreme-web/rms`, 7 open)
| PR | Last update | Comments | Title |
|----|-------------|----------|-------|
| [#558](https://bitbucket.org/xtreme-web/rms/pull-requests/558) | 10-15 | 0 | **NEW** LIFM2-470 Restrict and flag custom payout percentages |
| [#548](https://bitbucket.org/xtreme-web/rms/pull-requests/548) | 10-12 | 1 | LIFM2-468 (customer tested OK) |
| [#540](https://bitbucket.org/xtreme-web/rms/pull-requests/540) | 10-06 | 0 | LIFM2-450 |
| [#481](https://bitbucket.org/xtreme-web/rms/pull-requests/481) | 09-25 | 2 | LIFM2-409 (waiting on customer, not our blocker) |
| [#544](https://bitbucket.org/xtreme-web/rms/pull-requests/544) | 09-21 | 0 | LIFM2-465 |
| [#534](https://bitbucket.org/xtreme-web/rms/pull-requests/534) | 08-26 | 1 | cron quote-assembling fix |
| [#509](https://bitbucket.org/xtreme-web/rms/pull-requests/509) | 08-14 | 4 | LIFM2-428 |

Trello: ⚠️ Maddy skipped (Alert #4).

---

## Fountain — 05:13 (+07:00)

**Part 1 — Matrix plan** (@trinhmtt, Mon 10-12 08:44): DatNT 8h+ · ViTHT 40h · VuTQ 20h · ThinhT 12h → QC 20h.

**Part 2 — Workstream actuals (Mon–Thu, 05:00 snapshot):** DatNT 20.58h · ViTHT 3h · VuTQ 12h · ThinhT 8h · QC PhatDLT 4h (TrinhMTT 6.5h excluded, not QC). 10-15 V2 go-live day rows are mostly not logged yet.

**Part 3 — Plan vs Actual (4/5 of week):**
| Dev | Plan | Actual | Note |
|-----|------|--------|------|
| DatNT | 8h+ | 20.58h | well ahead (V2 merge/deploy) |
| ViTHT | 40h | 3h | far behind (~32h expected). Active all day 10-15 in Matrix (V2 live testing), so likely a logging lag. Informational |
| VuTQ | 20h | 12h | plus 4.5h on Bailey |
| ThinhT | 12h | 8h | on track. Tested V2 live 10-15 |
| QC | 20h | 4h | behind. PhatDLT + HungPN tested V2 live 10-15 (not logged yet) |

**Part 4 — Capacity & Runway:** re-fetched live (Est vs Charged, A13:L118, 106 rows): Narrow **229.00h / 28 tasks** · Broad **328.50h / 63 tasks**. Unchanged (frozen since August).
**Part 5 — Over-estimate:** **37 items >120%**, unchanged.

**Trello board (Web Development):** Rick pushed V2 to LIVE (03:21 UTC). Kunal 04:41: "so far everything looks good", "You guys dont need to do any QC for now", next steps tomorrow, planning a v2.1. Rick acked ✅ ([card](https://trello.com/c/TdvfIo08)). Rick posted the mobile UI bug list on [Post V2-Release](https://trello.com/c/MlCuwNVJ). Lists: To-Do 15 · Bugs 31 · Doing 4 · QC Internal 4 · QA Backlog 6 · In QA 1. Stuck >5d: Doing "Performance of website" (16d), "Pro CSV template download link" (21d). QC Internal "Digital Proof Generator" (14d), "Template::Error admin/gifts#show" (17d), "Infinity mail chimp" (22d), "Recipient privacy" (14d). In QA "separate test environment" (14d).

Trello: ~~⚠️ Fountain - DOCUMENT skipped (Alert #1: production NameError after V2).~~ Fountain - DOCUMENT ✓ (08:50). The NameError stopped (0 in the 13h since ~16:00–19:00, 67k req) and there are no new customer comments.

---

## Elena — 05:12 (+07:00)

- Elena - SamGuard Digital Plant: Ignore List (paused). FYI: the Optimization team is on OP-52; OP-14/15/18/20 are dev done.
- **WordPress samguard.co:** HTTP 200, 0 jsErrors / 0 pageErrors / 0 cspViolations. 8 GA/ads `failedRequests` (noise). Clean. Trello: Elena - WordPress SamGuard ✓.

---

## Trello — Check progress — 05:18 (+07:00)

[Check progress](https://trello.com/c/ULk881xz) · [Check mail](https://trello.com/c/rnhe9i1C) (all done)

- Rory ✓ · Franc ✓ · MPFC ✓ · Marcel ✓ · Raymond ✓ · Neural Contract ✓ (~~session unavailable on this host~~ re-checked locally 09:00: clean, last client msg 09-28) · Andrew Taraba ✓ · Elena - WordPress SamGuard ✓
- ⚠️ Maddy: skipped (Alert #4)
- ⚠️ James Diamond: skipped (provisional LeNH 0h, Alert #6). Vinn + Jeff reports OK
- ~~⚠️ Aysar: skipped (Alert #5)~~ Aysar ✓ (08:40, Carrick 👀 ack)
- ⚠️ Bailey: skipped (Alerts #3, #6)
- ~~⚠️ Fountain - DOCUMENT: skipped (Alert #1)~~ Fountain - DOCUMENT ✓ (08:50, error stopped)
- ⚠️ Ohcleo: skipped (Alert #2)

## Ignore List — 05:18 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills), Elliott

---

## Reminders — 05:18 (+07:00)
- LeNH, TuanNT: 0h on 10-15 (provisional, 05:00 snapshot, before 10 AM). Not sent. Re-check after 09:30.
- KhanhHH: 6.33h so far. LongVV: no target. PhucVT: ignored.

---

## Matrix — 05:01 (+07:00)

**Active rooms: 25 / 151 | Messages: 491** *(since 10-15 05:09)*
Full details: reports/2026-10-16/matrix-rooms-0500.md

No pending action items for DuongDN. His own asks were answered: TrinhMTT sent Kunal's feedback ✅, namtv sent the RDC/Brad feedback ✅, and duongdn acked the halt DG-bill question. Still open: duongdn's own est question to TuanNT (Alert #8).

### Key updates

**Fountain: V2 live 10:19 ✅, bugs surfacing**:
- Team tested on live. Kunal asked not to checkout. UI bugs logged (filter modal, checkout total change, recipient CSV upload). Prod Rollbar #372 (Alert #1).
- duongdn still receives an Infinity notification email. VuTQ to fix.

**Bailey: hours overruns**:
- [99] Automatic Stock Refill and [101] Advanced Split Order are out of hours. [101] CR is pending approval. TuanNT hasn't given a total est yet (Alert #8). Grazing Desktop CR2 approved (9h), keep fixing bugs.

**OhCleo: new design web done (staging), mobile pending**:
- LongVV fixed all Redmine bugs. Celine wants the app ETA. LuHX is unavailable tomorrow (Alert #2).

**Other:**
- Lyf: ForYou estimate (iOS/Android 13–26d options, backend 75h AI-est to be trimmed). Sandor feedback 10/10.
- Andrew Taraba: customer fix done + informed 11:11 ✅.
- Arthur: Chris payment msg answered (namtv). Training addendum = fixed-cost CR.
- Elena-OP: license-service docs on Confluence.
- Resource: 16/10 off list (see Leave plan).

**Recheck 08:29 (since 05:00):** 1 msg. Arthur: phucvt relays that Chris messaged about payment (Ignore List). No new Resource-Arrangement leave notes. Details: reports/2026-10-16/matrix-rooms-0829.md

---

## OhCleo Slack — 05:01 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 20 | 13:33 Celine: like/save missing on new homepage. Tony: only on track page. 17:22 **Tony daily report** (web fixes done, mobile creators profile/list). Tony: web done, new design on [staging](https://staging.ohcleo.com/). Celine will review. ⚠️ 17:31 "How much until app is done?" + 17:45 "Can you please let me know regarding the app so I can plan?" unanswered. ⚠️ 02:47 "Did you do something when implementing the new design? … I had 3 free listenings and now I got this e-mail" (+ attachment) |
| #events-code | — | channel_not_found (known; needs admin re-invite) |

Times converted UTC→+07. Tony daily report present at 17:22. Trello: ⚠️ Ohcleo skipped (Alert #2).

---

## Performance — all — 05:12 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.98 | 150ms | 3.0% (727/24264), ~96% benign NotAuthenticated/InvalidToken | 16.9/min |
| mpfc | **0.42** | 1605ms | 4.6% (1762/38697), 97% `continue` E_WARNING | 27.0/min |
| fountain | 0.98 | 192ms | 0.02% (24/102870) | 71.7/min |
| infinity | 0.97 | 151ms | 0.01% (2/15615) | 10.9/min |

**OhCleo topErrors:** NotAuthenticated 670 · InvalidToken 27 · ValidationError username exists 10 · ValidationError email exists 8 · AuthenticationFailed "User does not exist" 3 · ValidationError invalid email 2 · ValidationError user not found 2 · ValidationError email+username exists 2 · ValueError Invalid bcrypt hash 1 · IntegrityError null user_id app_playhistory 1 (chronic).
**OhCleo slowest:** AdminPayoutsView.get 4886ms/1 · UpdateMeView.put 3281ms/6 · ai_chat ChatSendView.post 3085ms/21 · GetBookMarkDetailsView.get 1182ms/728 · ValidatePurchaseView.post 1054ms/3.

**MPFC topErrors:** `continue` targeting switch E_WARNING 1714 · WP_Error::get_method() 16 · mkdir name too long 7 · count() non-countable 6 · require legacy-widget.php 4 · mysqli connection timed out 4 · mysqli no such file 2 · undefined get_header() 2+1 · undefined add_action() 1.
**MPFC slowest:** author-sitemap.xml 35397ms/1 · SQLi-probe search feed 24022ms/1 · membermouse processOrder.php 23898ms/1 · SQLi-probe search feeds 23825ms/1, 23396ms/1.

**Fountain topErrors:** ArgumentError wrong number of arguments (3 for 2) 12 · **NameError uninitialized constant OrderItemGiftVariantSerializer::GiftVariant 12 (new, V2)** · Twilio RestError 21610 unsubscribed recipient 12 (new).
**Fountain slowest:** ActiveStorage::AnalyzeJob 1,359,727ms/3 (background) · SitePicksWorker 591,425ms/1 (background) · gifts/build_a_box_gift_variants 20483ms/19 (worse, was 9.5s) · AssistantCheckWorker 19822ms/55 · admin/gifts/import_csv 17992ms/1.

**Infinity topErrors:** UnknownFormat 2 · ArgumentError wrong args 2.
**Infinity slowest:** paypals/authorize_order 2890ms/2 · search 2116ms/33 · payment_intents/create 1485ms/15 · SmsWorker 1417ms/3 · orders/create 1347ms/1.

---

## Arthur — Ignore List
Paused per user. Not run, Trello auto-completed.

---

## Upwork Memo — 2026-10-15 — 05:16 (+07:00)

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | ~~—~~ 1 | ~~—~~ 0 | "Superchat–HubSpot lead integration: requirements review, planning and local validation" ✅ |
| Aysar | ~~—~~ 1 | ~~—~~ 0 | "Fixed missing apostrophe and question-mark suggestions in the AI toolbar (#728)" ✅ |
| Tokenlite | ~~—~~ 0 | ~~—~~ 0 | no segments |

~~Upwork memo: data unavailable. This cron host has no carrick Chrome profile…~~ Re-run locally at 08:35 (headless): all memos valid. Rory's segment shows LeNH did track Upwork time on 10-15.
~~Neural Contract: the local run also hit a login redirect on all 4 attempts. The carrick Profile 1 cookie DB has `master_refresh_token` (valid until 10-28) but no current `user_oauth2_slave_access_token`, so the access token needs a live upwork.com page load in carrick's Chrome. Not opened (per your rule against opening tabs). Messages weren't read this run.~~ **09:00:** DuongDN re-logged carrick into Upwork. Neural re-run OK: newest client msg is 09-28. Nothing new or unanswered, so Neural ✓.

---

## Recheck 08:58 — 4 Trello items still open

- **Ohcleo ○**: Tony replied to the 02:47 free-listen question at 08:43 with just "No, I don't" (short, no investigation). Celine's app ETA asks (17:31, 17:45) are still unanswered.
- **Bailey ○**: Joey 15:27 in the issue-3 thread (#presta-9-update) is still unanswered (checked via conversations.replies). TuanNT 10-15 = 8h (Speedventory 4.5 + Andrew Taraba 3.5), so the #6 part is resolved.
- **James Diamond ○**: LeNH 10-15 is still 0h on Workstream at 08:58 (Mon–Wed 8h each). Recheck again after 09:30 before any reminder.
- **Maddy ○**: no new messages since 17:01. The concealed-offshore offer is still waiting on DuongDN's decision. Maddy Workstream has 0 rows this week (LongVV logs LIFM under OhCleo/DG?), and LIFM2-470 has no estimate.

## Unresolved Questions
- LeNH / TuanNT 10-15 0h: real gap or logging lag? Re-check Workstream after 09:30 before any reminder.
- Madhuraka's concealed-offshore new project (commit as him, AU VPN): accept, refuse, or set terms? Kai already said yes.
- ~~Fountain prod #372 NameError (GiftVariant serializer): is a V2 hotfix in progress?~~ It stopped firing after ~16:00–19:00 yesterday. Was a hotfix deployed, or does it just need traffic on that path?
- Who answers Celine's mobile-app ETA, given LuHX is unavailable tomorrow?
- Traslochi-Online prod errors (#2–#7): who owns monitoring for this new client?
- FirstProject production Rollbar (#904/#905): which client project is this? (Still unknown.)
- ~~Upwork memo + Neural need a run on the local machine.~~ Done locally: memo all valid, Neural clean (09:00).
