# Daily Report — 2026-10-02 (Friday)

**Run:** 2026-10-02T08:34:00+07:00 (interactive, full run)
**Window:** 2026-10-01T05:10:00+07:00 → 2026-10-02T08:55:00+07:00. Task-log date: Thursday 2026-10-01.
**Leave plan:** refreshed 08:35 (`parse-leave-emails.js`). No leave on 10-01 or 10-02 for LongVV, PhucVT, TuanNT, KhanhHH, LeNH. KhanhHH's leave ended 09-30; she was back 10-01. Resource Arrangement room: LamLQ off 10-02, NghiepNQ off 10-05 → 10-06. Email: DatNC off today 10-02 (approved by BinhNT).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Maddy (Slack Xtreme + kai@ email) | Three open customer items. (a) Madhuraka 10-01 16:07: "Have you been able to figure out what was the issue with the quote email? Will the fix you implemented … address this issue?" Kai's only reply is 10-02 08:42 "Sorry, I missed your message. I'll check it today." (b) End customer Luxe.It.Fwd (Amy Ferguson, marked High importance) says the quote tool has returned no results for 2 days and it "is starting to impact our workflow"; after Madhuraka's first fix she replied "We are still having issues". Forwarded to Kai 10-01 11:49. (c) Anoma 10-01 21:51: "Ticket 409 — Can you tell me how to fix this bank account error?" No reply. The urgent production payout-override bug from 11:20 was fixed and deployed the same day (PR [#552](https://bitbucket.org/xtreme-web/rms/pull-requests/552), [#553](https://bitbucket.org/xtreme-web/rms/pull-requests/553)). |
| 2 | Aysar (Slack Baamboozle) | Aysar 10-02 08:33 to Carrick: the DynaPuff font link was removed from the [phaser layout](https://github.com/baamboozle/baamboozle-web-app/blame/main/resources/views/layouts/phaser.blade.php#L24), "is there a reason for that?" iancox890 reported 03:05 that Baseball game mode is broken on the platform. Carrick 08:43: "Let me check and response you soon." Fresh, acknowledged only. |
| 3 | Fountain customer board | Two Kunal asks to @rick570 still have no board reply after 3 days: [development master key](https://trello.com/c/tY3yvAti) (09-29 09:16) and "we can push this live" on [GiftDrop Recipient flow](https://trello.com/c/tSuQHKwj) (09-29 11:09). New review queue from Kunal on 10-01: PRs #512–#516, #556, #557, with [Start here: review order](https://trello.com/c/TdvfIo08) (10-02 07:35). See also Alert #4. |
| 4 | Email rick@ | Kunal "Fountain V2" (10-01 13:05): full redesign prototype built with an AI model in a week. Phase 1 (new public site) and Phase 2 (staff tools) both targeted for end of October. He asks Rick to merge, in order, #507, #508, #510, #512, #513, #514, #556, #515, then #516 with #557, and to set up product photos, the text-message check and smart search on the test site. "I have it running overnight tonight so we may see a bunch of PRs." Scope and workload change for the Fountain team. |
| 5 | Marcel (Slack Equanimity) | komal.bailur 10-01 17:14 in #xid-technologies, to Carrick: check-ins at Ken-Pal dropped from 400+ to about 200 after the new devices were installed, "how can you explain this to client? as they want us explanation through email why device is failing to scan face of user". No reply after 17:14. Carrick answered the earlier points (null nationality root cause, devices online). |
| 6 | MPFC (New Relic + freelancer@ email) | Apdex 0.43, same as yesterday. Chronic `WP_Error::get_method()` ×45, with a Rollbar burst of 10 in 5 minutes at 10-02 07:32. Rollbar's "new error #65" `MM_Product::findById()` (10-01 16:50) is not a site bug: the server log shows it came from a one-off `wp eval` command run on the CLI. |
| 7 | Workstream | KhanhHH has 0h on 10-01 on every project, no leave. Upwork's Aysar tracker shows 8h for the same day with 3 valid memos, and Carrick's MPDM update lists the work, so she worked and the task log is missing. Read at 08:52, before the 09:30 logging cut-off; to be re-read. |
| 8 | Workstream review | Pending review: Crystal lang, PhucVT 9 rows / 16h (09-29, 09-30), reviewer **TienND**. OhCleo, LongVV 10 rows / 18h (09-28 → 09-30), reviewers **DuongDN, MinhTV**. |
| 9 | Email vuongtrancr@ | New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" ×4 for Swish on 10-01 (issue closed after 521 minutes). Same pattern as yesterday. |
| 10 | Email ken@ | Mailbox not read this run. Zoho rejects the stored app password; the same value is in every committed version of the config and worked on 10-01. Needs a new app password for ken@. Check mail → Ken stays open. |

**Today (Fri 10-02):** DatNC and LamLQ off. No leave for the 5 PHP-team devs.

---

## Email — all — 08:40 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | DatNC leave request for 10-02 and BinhNT's approval. No alert. | no events |
| carrick@nustechnology.com | 11 | GitLab definitive-guide pipelines failed/fixed ×5 (last one failed 10-01 17:43, `upgrade/cp1-laravel10`). DigitalOcean password reset on the definitive STAGING droplet (matches LongVV's staging migration). Jetpack: socalautowraps.com offline 10-01 10:58 and 12:02 (dropped project; the site answers HTTP 403 to a plain request now). Info only. | no events |
| nick@nustechnology.com | 1 | Heroku "version approaching end of life". Minor. | no events |
| rick@nustechnology.com | 37 | Alert #4 (Kunal, Fountain V2). 20+ FountainStaging/InfinityStaging BugSnag and Rollbar errors (#126–#131), all staging/test, info. Canny workspace "Wathaga Feature Requests" scheduled for deletion. 4 "Joe O. via Upwork" message notifications (09-30 and 10-01), content not in the email. | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 7 | Alert #1b (FW: Quoting tool issues). PR #552 and #553 approved and merged by Madhuraka. LIFM2-455 "Testing ok". | no events |
| ken@nustechnology.com | — | Alert #10, not read. | — |
| vuongtrancr@gmail.com | 9 | Alert #9. Rest: Rollbar daily summaries, Slack digest, newsletters. | — |
| dnduongus@gmail.com | 35 | Personal: bank receipts, brokers, newsletters, PayPal invoice 0032 paid by MPFC. No security alerts. | — |
| davidztv19@gmail.com | 2 | Basecamp ResidentRadius digests. | — |
| freelancer@mypersonalfootballcoach.com | 3 | Alert #6. Rollbar daily summary: 2 existing, 1 new (#65, from a CLI `wp eval`, benign). | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai ✓ complete. Ken ○ (inbox not read).

---

## Slack — all — 08:45 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 29 | #testing 17: skjamie25 and notmedesign feedback on team seat decrease and dark mode; Carrick deployed fixes through the day, notmedesign 16:22 "looking good on my side now". MPDM `C07SQ4HAUHZ` 2: Carrick back 09:51, **"Today's update" 20:12** (#717 seat count dev done, #699 Complete games page deployed on Nusdev, dark mode). #engineering 4 GitHub bot. #gamedev 3 and Aysar MPDM 2: Alert #2. Aysar also asked skjamie25 to enable GitHub 2FA (done 08:33). |
| RDC - FM Monitoring | 5 | #user-access-logs bot only. No dmetiner message. |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 28 | Madhuraka DM 23, Anoma DM 5. See `## Maddy`. |
| SAM GUARD - Mobile | 3 | #mql-leads HubSpot bot. |
| Global Grazing Services | 2 | Nick "Today report" 10-01 17:23 in #général (Redmine #103, #101 fixes). Nick 10-02 02:09 #maintenance status: performance WARNING (recurring nightly memory spikes, self-resolving), storage OK, DB backup OK. |
| Amazing Meds | — | Cancelled project (Ignore List), not scanned. |
| Generator | 0 | — |
| LegalAtoms | 3 | hamidsalamatali97 pointed Talha Naeem at a GitHub issue; miratariq praised fonts. Nothing addressed to us. |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 20 | #xid-technologies 18: Ken-Pal device and data questions from komal.bailur. Carrick found the null nationality cause (ISO mapper matches "Bangladesh", not the demonym "Bangladeshi") and reported devices online with a higher face-recognition rate. Alert #5 is the open part. Marcel DM 2. |
| SoCal Auto Wraps | 0 | Dropped. |
| Aigile Dev | 2 | #the-gaige-alerts bot. |

Trello: Rory, Franc, Elliott, Raymond, Rebecca, Bailey ✓ complete. Maddy, Aysar, Marcel ○ (Alerts #1, #2, #5). MPFC ✓ complete (Slack quiet; #65 benign, the rest is chronic).

Aysar GitHub: baamboozle-web-app 62 open issues, none updated in the window. bbzl-web-client 0.

---

## Discord — all — 08:40 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 24 | #airagri_webapp 11: James asked where mental-health check results are stored and about a 4-digit phone code per user; Vinn answered 16:04 and 16:49 with a proposal and a follow-up question. Vinn 16:53: six items pushed to production (Alarm Settings, Assessment Form, Biosecurity Form, Contractor Induction, Contractor Workflow, check-in embed); 17:20 fuel movements on staging. #airagri-flutter 13: Jeff daily report 17:26 (4h, Notifications Center done); bellatric02 tested the wellness survey, PASS, with feedback Jeff queued. |
| Bizurk (nuscarrick) | 0 | No DM from animeworld. |

Trello: James Diamond - Vinn ✓ complete. Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all — 08:52 (+07:00)

Raw `/review/week` rows, 20 live projects, summed per person. Thursday 10-01.

| Developer | 10-01 | Week (Mon → Thu) | Status |
|-----------|-------|------------------|--------|
| LongVV | 8h (Definitive Guide) | 8 / 8 / 8 / 8 | OK |
| TuanNT | 7.5h (Speedventory) | 8 / 4 / 8 / 7.5 | 0.5h under, read before 09:30. 09-29 was a half day (dentist, emailed 09-29). To be re-read. |
| KhanhHH | — | leave / leave / leave / — | Alert #7. Upwork Aysar 8h on 10-01. To be re-read. |
| LeNH | 8h (James Diamond) | 8 / 8 / 8 / 8 | OK |
| PhucVT | — | 8 / 8 / 8 / — | On Arthur, not gated. Not alerted. |

| Project | Dev hours 10-01 | Reviewer hours 10-01 | Review status |
|---------|-----------------|----------------------|---------------|
| Xtreme Soft Solutions (Maddy) | LongVV 0h, LuHX 0.5h | — | need_review = false |
| OhCleo | 0h | DuongDN 0h, MinhTV 0h | **Pending** 10 rows (Alert #8) |
| Crystal lang (Arthur) | 0h | TienND 0h | **Pending** 9 rows (Alert #8) |
| Portfolio - James Diamond | LeNH 8h, AnhNH2 4h | PhucVT 0h, LeNH 8h (own dev rows) | NotRequired |
| Speedventory (Bailey) | TuanNT 7.5h, TrinhMTT 1h | — | need_review = false |
| Baamboozle | 0h | — | need_review = false |
| Generator | 0h | HangNTT 0h, LucNT 0h | no rows |
| Radio Data Center | 0h | LeNH 0h | no rows 10-01 |
| Tokenlite (Marcel) | DuongDN 1.17h | — | need_review = false |
| BXR App | TuanTT 0.5h | — | need_review = false |
| Definitive Guide | LongVV 8h | — | NotRequired |
| MissSwimwear (Rebecca), ETZ, Family App (LuHX 5h), Samguard (TriNM 6h, TuanNTG 8h) | as shown | — | NotRequired / no rows |

Workstream needs review: PhucVT — 9 rows (16:00, 09-29 → 09-30) — reviewer(s): TienND (Crystal lang)
Workstream needs review: LongVV — 10 rows (18:00, 09-28 → 09-30) — reviewer(s): DuongDN, MinhTV (OhCleo)

Not readable with this account (HTTP 403): Peptide Clyde, Amazing Meds, Elevate365.AI, LegalAtoms, Others.

---

## Maddy — W40 — 08:50 (+07:00)

### 1. Task Log Hours (Workstream `maddy`, Thu 10-01)
| Developer | Thu | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV (Kai) | 0h | 2h (09-28) | informational only, ad-hoc |
| LuHX | 0.5h | 7.25h | different role, not managed |

Kai fixed two production issues on Maddy on 10-01 (PR #552, #553) but logged his 8h on Definitive Guide. The hotfix time is not on the Maddy task log.

### 2. Slack / Kai Daily Report Check
- WS Maddy hours 10-01: 0h → daily-report check not applicable.
- Madhuraka DM (23 msgs): 11:20 urgent production issue, payout bracket overrides ignored on the quotes page, wrong amounts going out in quote emails. Kai: PR #552 at 11:40, deployed 11:47. 15:15 second case (custom payout percent not reflected), PR #553 at 15:46, tested. 16:07 question on the quote email root cause, acknowledged only at 10-02 08:42.
- Anoma DM (5 msgs): Kai 08:41 "You don't worry it / Just ignore" (yesterday's Shopify question). Anoma 16:57 asked to move ticket 409 to testing and to state it can be ignored. 21:51 bank account error question, no reply.
- **Conclusion:** Alert #1. Maddy Trello ○.

### 3. JIRA
`maddy-jira-tasklog-check.js --week 2026-10-01`: 2 Workstream entries without a ticket key (1h "Investigate why items sold are draft on Shopify", 1h "Investigate approach to improve quoting tool results for client"). No estimate and no JIRA log for either.

Tickets updated since 09-30:
| Ticket | Summary | Status | Est | Spent | Note |
|--------|---------|--------|-----|-------|------|
| LIFM2-455 | Refresh Issue on Quotes page | Testing - Anoma | 1.5h | 1.5h | Anoma 10-01 19:29 "Testing ok" |
| LIFM2-409 | Import Shopify payouts (Highest) | To Do | 113.25h | 111.25h | Anoma 10-01 00:29: RMS5 items not enabled for "online store" on upload. 2h of budget left. |
| LIFM2-469 | International Shipping Labels (High) | To Do | 0h | 0h | No estimate set |

Risk tickets: LIFM2-260 Done (no change since 07-19), LIFM2-439 Done, LIFM2-409 above.

### 4. Bitbucket PR Status (`xtreme-web/rms`, 9 open)
#552 and #553 were approved and merged by Madhuraka on 10-01. Open, all by Kai: #551 (3d), #549 LIFM2-467 (7d, 0 comments), #548 LIFM2-468 (9d), #544 LIFM2-465 (21d), #540 LIFM2-450 (28d), #534 (36d), #520 Refresh Issue (78d), #509 LIFM2-428 (101d), #481 LIFM2-409 feedback (164d, waiting on customer). Last comment on every commented PR is the Rovo Dev bot; no new human review comment in the window.

---

## Scrin.io (Nick @ John Yi company account — 2026-10-01): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 08:50 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI`. @trinhmtt Mon 2026-09-28 09:02: **ViTHT: 40h, ThinhT: 20h, DatNT: 40h => QC: 25h**.

**Part 2 — Task Log Actuals (Workstream, week 09-28 → 10-04, through Thu):**
| Person | Mon | Tue | Wed | Thu | Total |
|--------|-----|-----|-----|-----|-------|
| DatNT | 8 | 8 | 8 | 8 | 32h |
| ViTHT | 8 | 8 | — | 8 | 24h |
| ThinhT | 4 | 4 | 4 | 4 | 16h |
| VuTQ | — | 2 | 6 | 3.5 | 11.5h |
| HungPN (QC) | 3 | — | — | — | 3h |
| PhatDLT (QC) | — | — | — | — | 0h |
| TrinhMTT | 2.5 | 2.5 | 2.5 | 2.5 | 10h |

**Part 3 — Plan vs Actual (Fri remains):** DatNT 32/40h, ThinhT 16/20h, ViTHT 24/40h (no rows Wed), QC 3/25h (HungPN only; both QC were testing in the Matrix room on 10-01, so QC time looks unlogged).

**Part 4 — Capacity & Runway ("Est vs Charged" tab, read 08:50):** Narrow 28 tasks / **229.00h**, Broad 63 tasks / **328.50h**. Unchanged from 10-01.

**Part 5 — Over-estimate (Actual > (Est+CR)×1.2):** **36** items, unchanged. Top: #2627 0.5→8.25h (+1550%), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2545 1→7.5h (+650%), #2630 0.5→3.75h (+650%), #2613 2→14.5h (+625%), #2652 1.5→10.5h (+600%), #2501 4→25.5h (+538%).

**Trello Board ([Web Development](https://trello.com/b/UDrSWage)), 08:50:**
- Lists: To-Do 16, Bugs 22, Doing 3, QC Internal Backlog 8, QA Backlog 5, In QA 1, Shelf 6.
- Answered since yesterday: TEST backend 502 (rick570 10-01 10:37, Puma/systemd config fixed) ✅. [Infinity - Account and Auth](https://trello.com/c/xIukJjhO) pushed LIVE 10:50 ✅. [stripe webhook crash fix](https://trello.com/c/FxAv6ODy) merged and deployed to LIVE 17:11 ✅. [Pro orders "charged" email](https://trello.com/c/m2DgXgHa): rick570 answered in PR #512; Kunal replied 21:02.
- Open, no board reply: Alert #3. Waiting for review: [#513](https://trello.com/c/SZ75pffZ), [#514 recipient privacy](https://trello.com/c/LgiloxcG) (three public endpoints expose other customers' details, per Kunal), [#515 emails and texts](https://trello.com/c/gSidEIr6), [#516 guest accounts](https://trello.com/c/TyldvB7d) (Kunal also asks Rick to check live `log/cron.log` for a ForeignKeyViolation).
- Kunal shelved [Fountain Update menu](https://trello.com/c/dFWK4pLu) and the front end of [AI powered message screen](https://trello.com/c/KNq08ij5): a new design is coming.
- [Server firewall](https://trello.com/c/D2easXtz): rick570 needs a DigitalOcean 2FA code from Kunal.
- Stale: [Finding solution to incorrect delivery dates](https://trello.com/c/oHJ5YO8y) 28d in QA Backlog. [Fountain Pro CSV template](https://trello.com/c/uRtnp0LH) 7d in Doing. QC Internal Backlog: [reviews](https://trello.com/c/AdUlQD3t) 9d, [Infinity mail chimp](https://trello.com/c/XcjZ6KmH) 8d, [Smart Hybrid Product Search](https://trello.com/c/37XQvT4c) 7d. Bugs: 18 of 22 cards untouched for 5+ days.
- Only board comments are visible here; replies given by email or on GitHub would not show.

Trello: Fountain ○. Parts 1–5 clean; held for Alert #3.

---

## Elena — 08:50 (+07:00)

Paused per Ignore List. PR #311 (share component) was merged 10-01 14:14 by nus-aron into `nus-base`, not `process-digital-plant`, so no deploy is due. #309 still open. No undeployed merged PRs in `.elena-pending-actions.json`. Precognize (nusken): 0 open PRs.

**WordPress SamGuard (samguard.co, 08:48):** HTTP 200, 0 jsErrors, 0 pageErrors, 0 cspViolations. 17 failed requests are GA/Ads beacons. Trello: Elena - WordPress SamGuard ✓ complete.

---

## Trello — 08:53 (+07:00)

## Ignore List — 08:53 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds

| Item | Result |
|------|--------|
| Maddy | ○ open — Alert #1 |
| James Diamond - Vinn | ✓ complete (Vinn active with production push summary; LeNH 8h) |
| Rory | ✓ complete (Swift Studio 0 msgs) |
| Aysar | ○ open — Alert #2. MPDM update present 20:12. |
| Franc | ✓ complete (bot logs only) |
| Elliott | ✓ complete (Generator Slack quiet; KhanhHH worked 8h per Upwork, task log gap is Alert #7) |
| Fountain | ○ open — Alert #3 |
| Bailey | ✓ complete (Nick report 17:23; TuanNT 7.5h Speedventory) |
| Marcel | ○ open — Alert #5 |
| MPFC | ✓ complete (Slack 0 msgs; new Rollbar #65 was a CLI `wp eval`, not the site. Chronic errors stay under Alert #6) |
| Neural Contract | ✓ complete (no new messages; latest is 09-28) |
| Raymond - LegalAtoms | ✓ complete (nothing addressed to us) |
| Rebecca (William Bills) | ✓ complete (Slack quiet; TuanNT 7.5h Speedventory, 0h MissSwimwear) |
| Andrew Taraba | ✓ complete |
| Ohcleo | ✓ complete (no Celine message; LongVV 0h on OhCleo 10-01, no report due) |
| Elena - WordPress SamGuard | ✓ complete (clean) |

**Live card state 08:53:** [Check progress](https://trello.com/c/Mr8UaIb7) **18/22 ✓**. Open: Maddy, Aysar, Fountain, Marcel. [Check mail](https://trello.com/c/tv9kqbme) **5/6 ✓**, Ken open.

---

## Matrix — 08:37 (+07:00)

**Active rooms: 23 / 149 | Messages: 346** *(since 2026-10-01 05:10)*
Full details: reports/2026-10-02/matrix-rooms-0837.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| DM with NamTV | 10-01 14:10 | namtv: "KhanhHH dự kiến tuần sau tasks sao nhỉ? Có để đưa bớt sang dev khác nếu dev khác idle, để bạn làm Elena" — no reply in the room ⚠️ |
| DM with ThuyLTT | 10-02 08:31 | thuyltt: "Chốt vầy he! Duong nhan cho ong nam lun. Sorry bao nhầm. $20 dư m sẽ trừ vô tuần này" — she asks you to message Marcel about the $20 overpayment ⚠️ |

Answered already: anhnvn "2 cái link này cần sign in ko xem dc a Dương" (you sent the PDF 13:52) ✅. tuannt "task thì e làm bên này hay bên Bailey" (you replied 19:25) ✅. trinm asking when Elena PR #311 merges (merged 14:14) ✅.

### Key updates

**Fountain — customer is now writing code himself:**
- Kunal changed "several dozen files" and pushed fixes; ViTHT cherry-picked his commits onto BETA for QC on 10-02. ThinhT and DatNT report his changes overlapping their work. HungPN: related areas now need re-checking.
- VuTQ moved onto Fountain full-time until end of week.

**Bailey — out of dev tasks:**
- TuanNT 13:31: nothing left but test and release. You returned VuTQ and moved TuanNT to James Diamond (3h make-up) and Definitive Guide. New bug scope arrived in Redmine 15:19.

**Definitive Guide — staging migration in progress:**
- LongVV is migrating production data to staging; tasks get split after that. TuanNT is setting up.

**Elena — team growing:**
- PhongTB joins full-time as third FE dev. NamTV wants to free KhanhHH for Elena (action item above).

**Other:**
- Wildsoul Wellness (potential): 14:30 meeting on client points C and D; you shared two Mindbody reports and a payment demo.
- OhCleo: cover art and re-tagging close to Celine's expectation, one more round.
- Charles - Family: MinhTV warns the app may fail App Store review with so little native functionality.
- BDD: Gil's client cuts to 80h/month from next week.
- Codeorange: no new tasks for 2 weeks.

---

## OhCleo Slack — 08:45 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 0 | Last messages: Tony's report 09-30 18:25, Celine 09-29 21:16. |
| #events-code | — | Account is not a member of the channel; needs a re-invite from Celine or Tony. |

Tony daily report: not due. LongVV logged 0h on OhCleo on 10-01 (8h Definitive Guide).

---

## Performance — all — 08:48 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.97 | 146ms | 3.7% (733/19872), 97% NotAuthenticated/InvalidToken (benign) | 12.0/min |
| mpfc | **0.43** | 1387ms | 0.9% (422/46098) | 27.8/min |
| fountain | 0.99 | 106ms | 0.004% (4/92902) | 56.0/min |
| infinity | 0.98 | 139ms | 0.01% (2/17514) | 10.6/min |

**ohcleo — topErrors:** NotAuthenticated 694, InvalidToken 17, AuthenticationFailed "User does not exist!" 6, ValidationError username exists 6, ValidationError email exists 5, AuthenticationFailed "Passwords don't match!" 3, ValidationError email+username exists 2.
**ohcleo — slowestTransactions:** CreatorPayoutHistoryView.get 2210ms/1, EmailVerificationView.post 1002ms/10, CategoryMediaView.get 979ms/273, MediaUploadUrlView.post 927ms/2, AnonymousEmailCollectView.post 769ms/1. None over 5s; yesterday's slow media endpoints are gone from the list.

**mpfc — topErrors:** E_WARNING "continue" targeting switch 361, `WP_Error::get_method()` 45, E_WARNING `mkdir(): File name too long` 10 (new), `count()` on non-countable 3, `JSON_API_Auth_Controller::error()` 2, E_COMPILE_ERROR `require(): Failed opening required 'ABSPATHWPINC/blocks/legacy-widget.php'` 1 (new). Yesterday's "Too many connections" did not recur.
**mpfc — slowestTransactions:** sitemap_index.xml 81832ms/2, /search/met/feed/rss2/ 28498ms/1, three SQL-injection probes on /search/…/feed/rss2/ (`waitfor delay`, `PG_SLEEP`) at 21.6–22.5s each.

**fountain — topErrors:** ArgumentError "wrong number of arguments (given 3, expected 2)" 4. **slowestTransactions:** paypals/authorize_order 2801ms/4, payment_intents/create 1758ms/61, users/registrations/create 1706ms/7, gifts/build_a_box_gift_variants 1320ms/80, paypals/generate_order 998ms/4.

**infinity — topErrors:** ArgumentError (same) 2, ActionController::UnknownFormat 1. **slowestTransactions:** admin/promo_codes/index 3152ms/1, users/registrations/create 2317ms/1, payment_intents/create 2054ms/8, search/search 1544ms/44, users/validate_with_mailgun 1275ms/2.

---

## Upwork Memo — 2026-10-01 — 08:50 (+07:00)

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory | 0 | 0 | No time tracked |
| Aysar | 3 | 0 | All valid (#717 seat count, #699 Complete games page, dark mode) |
| Tokenlite | 2 | 0 | "Debug Kenpal issue: certain device not work correctly", "Debug Kenpal issue: FIN not correct" |

Upwork hours this week: Rory 0:00. Aysar 8:00 (Thu 8h; last week 18:00). Neural 0:00, no new messages. Aysar 8h on Upwork vs 0h on Workstream Baamboozle for 10-01: Alert #7.

---

## Reminders — 08:53 (+07:00)

- KhanhHH: Workstream task log for 10-01 missing (Upwork shows 8h). Not sent — before 10:00 and no `--send-reminder`.
- TuanNT: 7.5h on 10-01, to be re-read after 09:30. Not sent.
- LongVV, LeNH: skipped (8h).
- PhucVT: skipped (not gated).

---

## Unresolved Questions

1. ken@ needs a new Zoho app password. Do you want to generate it, or should that mailbox be dropped from the scan?
2. Kunal's Fountain V2 plan targets end of October for Phase 1 and 2 with Rick as reviewer and deployer only. Does that change the Fountain team plan for next week?
3. Kai's Maddy hotfix time on 10-01 is not on the Maddy task log. Should he log it there?
4. "Joe O." on Upwork (rick@ notifications, 4 messages 09-30 → 10-01): which account's inbox is this, and should it be monitored?
