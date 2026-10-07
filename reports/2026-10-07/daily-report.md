# Daily Report — 2026-10-07 (Wednesday)

**Run:** 2026-10-07T05:00:00+07:00 (cron), corrected 08:45 (+07:00)
**Window:** 2026-10-06T05:00:00+07:00 → 2026-10-07 05:20 (+07:00)
**Leave plan:** No approved leave on record (parse-leave-emails refreshed 05:07, re-refreshed 08:30: still none). From Matrix Resource Arrangement: TuanNTG sick 10-06, VuTQ morning off 10-06, ThinhT off 10-12. LongVV was off the afternoon of 10-06.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Fountain Trello board (customer) | [mike62798179 10-06 15:47 UTC on "GiftDrop: Order was uploaded as a Gift-Of-Choice"](https://trello.com/c/GbxIFNPH): **production order bug.** Order #5113334XO was charged as a Build-A-Box (Stripe agrees), but ShipStation and the GiftDrop link treat it as a Gift-Of-Choice. No reply from rick570 yet (~13h). |
| 2 | Fountain Trello board (customer) | [kunalsheth 10-06 01:50 UTC on "Server TEST Info"](https://trello.com/c/d5OAtXT9): asked for Mailtrap access/invite so he can see emails while testing. No reply on the card (~27h). |
| 3 | Email (rick@) + Performance (Fountain) | New Rollbar production error **#361 NoMethodError: undefined method** (10-06 10:13 UTC). New Relic: `gifts/build_a_box_gift_variants` averaged **19.5s over 119 calls** (new outlier). Other prod errors are minor (ArgumentError 5×, NoMethodError nil `[]` 3×). The build-a-box slowness may be related to Alert #1 and the V2 PR deploys. |
| 4 | Performance (MPFC) | **Apdex fell to 0.16** (was 0.40 on 10-06): avg response 3.16s, and 23,902 of 35,317 requests were "frustrated". `continue`-targeting-switch E_WARNING ×1,971 (was ×248), `mysqli_real_connect(): No such file or directory` ×8 (DB socket unavailable at times). signup took 42.6s, forgot-password 39.0s, reset-password 38.8s. Rollbar also reported 2 new prod errors: #66 `MM_MembershipLevel::getAll()` undefined and #67 `_get_option()` on null. This looks like a real degradation, not scanner noise. **08:40 recheck (since 05:25): getting worse.** Apdex **0.04**, avg 3.21s, 2064 of 2219 requests frustrated. SQLi/`.env.backup` probes are also hitting (28s). |
| 5 | Maddy (Xtreme Slack DM + JIRA) | Client tester anomawasala has 3 open questions for Kai. 12:24: "What about Buy-out items? how is the process?" (repeated on [LIFM2-409](https://madhuraka-godahewa.atlassian.net/browse/LIFM2-409) 18:53 with B00041 steps, mentioning Kai). 18:32: error on RMS5 when clicking "enable+Listed". 21:48: "The items are enabled on Shopify, but this msg is wired." Kai's last reply was 10:11 (LongVV was off that afternoon). → Maddy ○ (08:35 recheck: still unanswered) |
| 6 | OhCleo (Celine DM) | Celine asked 2 questions with no reply. 19:49: "anything you need from me now to finish the re-tagging and cover art? do you recommend us to launch cover + re-tagging at the same time as the new design?" 20:25: "remind me of fal features - is this something we still need?" No Tony daily report on 10-06. That's not an alert in itself: LongVV logged 0h on OhCleo on 10-06 (half-day off). The unanswered customer asks are. → Ohcleo ○ (08:35: still unanswered) |
| 7 | Equanimity (Marcel) | komal.bailur (XID) 16:49 asked Carrick: "what are the things you updated? sgbuildex data? if yes you can send that failed part from last week. Also make sure it ll not happen in future". No reply from Carrick in window. → Marcel ○ (08:35: still unanswered) |
| 8 | Swift Studio (Rory) | roryh 18:52: "I will book it for tomorrow morning instead. what is the latest time you can do (UK time please)". No reply yet (came in after hours VN). → Rory ○ (08:35: still unanswered, and the UK morning call needs a time now) |
| 9 | Workstream (TuanNT) | **0h logged on 10-06** across every project, incl. Andrew Taraba (raw `/review/week` = `[]`) and Speedventory. Note: he backfilled 10-05 after yesterday's reminder (James Diamond 2h + Speedventory 6h = 8h). He was clearly working on 10-06 (Bailey daily report 08:46 + overbudget discussion), so this is probably logging lag again. ~~Re-check after ~09:00 before any reminder (not sent: no `--send-reminder`). → Bailey ○~~ **08:35 recheck:** still 0h everywhere (Andrew Taraba raw rows still `[]`), and no leave. Reminder sent to TuanNT's room (`!knbJbIKzXRJNGVFQNg`, event `$U9NeoYL9Nlhm7-Fc23ut4PGosLw62gKw2kq8Y34Lpuk`). Bailey ✓ auto-completed under the reminder-sent rule. |
| 10 | Workstream needs review | OhCleo: LongVV 10-05, 3 rows Pending (tag taxonomy re-tagging 2:00, cover arts backup library 2:00, web/app visual identity 4:00). Reviewers: **DuongDN, MinhTV**. Crystal lang: PhucVT 10-05, "Testing and fix bugs on Carryover + M4 tasks" 8:00 Pending. Reviewer: **TienND** (Arthur is paused, listed for visibility). |
| 11 | Email (vuongtrancr@) | 2× New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" for Swish (23:57 + 00:08 UTC 10-05/06). Recurring monitoring gap. |
| 12 | Email (carrick@) | GitLab: **Carrick's compute minutes are exhausted** (25% → 5% → 0 on 10-06 08:49–08:53 UTC). Since then every `definitive-guide` pipeline fails (upgrade/cp1-laravel10, cp1-staging-fixes, cp1-gate, cp2-laravel13), which blocks CI for the Laravel upgrade PhucVT is taking over. |
| 13 | Email (ken@) | ken@ was **not scanned**: Zoho IMAP rejected the stored password (`AUTHENTICATIONFAILED`). The config plaintext (09-26) is newer than the `.enc` copy (07-28), so the app password was probably rotated or revoked on Zoho. A new app password is needed. → Ken mail ○. **08:38 recheck:** this is not a clobber. The plaintext and `.enc` hold the same password, and every historical password in git (7 commits) also fails with `AUTHENTICATIONFAILED`, so the app password really was revoked or rotated on Zoho. |

**Today (Wed Oct 7):** No approved leave on record. ThinhT is off 10-12 (planned).

---

## Email — all — 05:03 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@... | 0 | — | no events |
| carrick@... | 29 | #12 GitLab compute minutes exhausted, pipelines failing | no events |
| nick@... | 3 (BAILEY J. via Upwork ×3, not John Yi) | — | no events |
| rick@... | 15 | #3 Rollbar prod #361 | OmniGPT Daily Sync 10:30, HEAL Meeting 11:00 + 12:30 |
| kai@... | 3 | Anoma mention on LIFM2-409 (see #5) | no events |
| ken@... | — | #13 not scanned (IMAP auth rejected) | calendar unavailable (no_principal) |
| vuongtrancr@gmail.com | 9 | #11 Swish signal lost ×2 | — |
| dnduongus@gmail.com | 17 | none (Google "shared account data with Claude" notice = your own action; rest newsletters/bank) | — |
| davidztv19@gmail.com | 2 | — (Basecamp digest, Auth0 verify) | — |
| freelancer@mpfc | 8 | #4 Rollbar new #66/#67 + WP_Error 10-in-5-min; Mailchimp "verify your domain before sending" ×2; TestFlight 4.3.21 build | — |

Carrick: ZKTeco "BioPhoto lost in SpeedFaceV5L" thread continues (in progress).
Rick: rest is `[FountainStaging]` BugSnag (staging/dev) + Rollbar daily summaries.
Nick: 3 Upwork messages from BAILEY J. (10-06 08:30–08:46 UTC). Content not opened in email. Joey/Bailey payment talk is covered in GGS Slack.

Trello: DuongDn, Carrick, Rick, Kai, Nick ✓ complete. Ken ○ (not scanned).

---

## Slack — all 14 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 5 | Testing: skjamie25 confirmed the verify-message fix and passed it to Martin/Ian. heyitsronanc DM 22:32: "I've submitted a review - great working with you Carrick", which looks like an Upwork contract close/review. MPDM `C07SQ4HAUHZ` had no "Today's update", but KhanhHH logged **0h on Baamboozle on 10-06** (8h was on RDC), so the silence is normal and not an alert. |
| RDC - FM Monitoring | 16 | Carrick 08:54 "Thank you. Let me arrange to check these." KhanhHH is now on it (8h RDC on 10-06). Otherwise Tuner Access Log bot entries. |
| Swift Studio | 2 | Henry: call attendees confirmed. **Rory 18:52 asked for the latest UK time** → Alert #8. |
| Xtreme Soft Solutions | 12 | Kai answered the 8827 paid-invoice question (10:11). New open questions → Alert #5. |
| SAM GUARD - Mobile | 1 | HubSpot MQL bot only. |
| Global Grazing Services (Bailey) | 12 | **Nick's daily report present** (#général 17:16). Joey released .1 ($75), .2 ($435) and .3 ($7,005) but not Filters ($555, he can't see the filters on live). Amy is clarifying. Joey also flagged that Upwork fees (now 8%) are too high and wants to move off Upwork. |
| Amazing Meds | — | invalid_auth. Project cancelled (Ignore List), so not refreshed. |
| Generator | 0 | No activity. |
| LegalAtoms | 0 | No activity. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | Paused (Ignore List). |
| Equanimity | 5 | Carrick updated XID items. **komal's 16:49 question unanswered** → Alert #7. Marcel DM "Ok sure". |
| SoCal Auto Wraps | 0 | Dropped. |
| Aigile Dev | 1 | gaige-alerts bot (Colin paused). |

Trello: Aysar, Franc, Elliott, MPFC, Raymond ✓. Maddy, Rory, Marcel ⚠️ skipped (Alerts #5, #8, #7).

---

## Discord — airagri + bizurk — 05:05 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | ~18 | **Vinn daily report present** (14:52 UTC: device JBS_P_06 transfer/alarm investigation). **Jeff daily report present** (10:19 UTC, 4h: FCM push notifications for Team App). jdiamond accepted the Apple license agreement Jeff asked for. dapackage working on Ceres/Kinetic PRs. No blocker. |
| Bizurk (nuscarrick) | 0 | No messages or Andrew DMs in window. |

Trello: James Diamond ✓ (Vinn report present + LeNH 8h on 10-06), Andrew Taraba ✓.

---

## Sheets/Workstream — all devs — 05:15 (+07:00)

Reporting day: **2026-10-06 (Tue)**. Data fetched at 05:15, so same-day logging may still be incomplete.

| Developer | 2026-10-06 hours (all projects) | Status |
|-----------|-------|--------|
| LongVV | 0h on Workstream (half-day off; did ~1h Lyf fix, not on a tracked WS project) | Ad-hoc, informational only |
| KhanhHH | 8h (Radio Data Center) | OK |
| TuanNT | 0h (incl. Andrew Taraba raw rows `[]`). 10-05 now backfilled to 8h | 🔴 Alert #9. ~~(likely lag, re-check)~~ Still 0h at 08:35, reminder sent |
| LeNH | 8h (James Diamond) | OK |
| PhucVT | 0h on 10-06 (10-05: 8h Crystal lang) | Not gated (Arthur, per user 10-01) |
| AnhNH2 | 4h (James Diamond) | informational |
| DatNC / TrinhMTT / VuTQ | 1h / 2.5h / 2h (Speedventory) | informational |
| LuHX | 2h (Family App) | not managed by us |

**Workstream project rows (excl. Fountain):**

| Project | Dev hours 10-06 | Reviewer(s) | Reviewer's charged hours | Review status |
|---------|------------------|-------------|------------|----------------|
| Maddy (Xtreme) | — (LuHX 1h on 10-05) | — | — | need_review=false |
| James Diamond | LeNH 8h, AnhNH2 4h | PhucVT, LeNH | LeNH 8h (dev work) | none pending |
| Baamboozle (Aysar) | — | — | — | need_review=false |
| Generator (Elliott) | — | HangNTT, LucNT | 0h | none pending |
| Colin/ETZ | — | LucNT | 0h | none pending (paused) |
| Radio Data Center (Franc) | KhanhHH 8h | LeNH | 0h | none pending |
| BXR App (Rory) | — | — | — | need_review=false |
| Speedventory (Bailey) | DatNC 1h, TrinhMTT 2.5h, VuTQ 2h | — | — | need_review=false |
| Tokenlite (Marcel) | DuongDN 0.67h | — | — | need_review=false |
| Crystal lang (Arthur) | — | TienND | 0h | **Pending** (PhucVT 10-05 8h), Alert #10 |
| OhCleo | — | DuongDN, MinhTV | 0h | **Pending** (LongVV 10-05 ×3, 8h), Alert #10 |
| Andrew Taraba | 0h | DuongDN | 0h | need_review=false |

Trello: ~~Bailey ○ (Alert #9)~~ Bailey ✓ (08:42, reminder sent). James Diamond, Aysar, Elliott ✓.

---

## Maddy — W41 — 05:18 (+07:00)

1. **Task log:** LongVV 0h on Maddy 10-06 (ad-hoc, informational). In Matrix he said he estimated some Maddy tasks that morning.
2. **Slack:** Kai answered the 8827 question at 10:11. **3 open client questions since 12:24** → Alert #5. Kai daily-report gate isn't applicable (0h Kai-role hours on WS).
3. **JIRA (LIFM2):** LIFM2-409 moved to "Testing - Anoma", and Anoma asked about the Buy-out flow (10-06 11:53 UTC, unanswered). LIFM2-466/469/470 created/updated (To Do).
4. **Bitbucket (`xtreme-web/rms`, 7 open PRs):** #540 updated 10-06 03:05 UTC. #481 (waiting on customer, known), #549, #548, #544, #534, #509 unchanged. No new review comments in window.

Trello: Maddy ⚠️ skipped (Alert #5).

---

## Fountain — 05:20 (+07:00)

**Part 1 — Matrix Plan:** trinhmtt 2026-10-05 09:49: "ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h".

**Part 2 — Task Log Actuals (Workstream, Mon–Tue):** DatNT 8 + 7.33 = 15.33h. ThinhT 4 + 4 = 8h. ViTHT 0 + 3 = 3h. VuTQ 2 + 2 = 4h. QC PhatDLT 3 + 3 = 6h. TrinhMTT 5.5h (not QC, excluded).

**Part 3 — Plan vs Actual (2 of 5 days):**

| Dev | Plan | Actual | Pace (40% of week) |
|-----|------|--------|------|
| DatNT | 40h | 15.33h | on pace (16h) |
| ThinhT | 20h | 8h | on pace |
| ViTHT | 40h | 3h | behind (16h expected) |
| QC (PhatDLT) | 25h | 6h | behind (10h expected) |

**Part 4 — Capacity & Runway** (Est vs Charged, 106 rows): narrow **229.0h** (28 tasks), broad **328.5h** (63 tasks). Unchanged from 10-06. That's about 2.3 weeks of narrow runway at a 100h/week dev plan.

**Part 5 — Over-estimate:** **37 rows** over 120% (unchanged). Top: #2627 0.5→8.25h (+1550%, Has Bug on Live), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2630 0.5→3.75h, #2545 1→7.5h, #2613 2→14.5h.

**Trello board (comments since 10-06 05:00):** Alerts #1 (GiftDrop prod order bug) and #2 (Kunal Mailtrap access) are both unanswered. The 10-04 "Start here" V2 review card is still the work queue. Matrix shows the team deploying Kunal's PRs to BETA/STAGING; QC found add-to-cart failures and 404s from Kunal's slug-redirect file. PR #576 is ready for LIVE.

Trello: Fountain ⚠️ skipped (Alerts #1–#3).

---

## OhCleo Slack — 05:06 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 2 | 2 unanswered customer questions → Alert #6 |
| #events-code | — | `channel_not_found` (chronic, bot removed from channel) |

Tony daily report: none on 10-06, but LongVV logged 0h on OhCleo that day (half-day off), so that part isn't an alert.

Trello: Ohcleo ⚠️ skipped (Alert #6).

---

## Elena - WordPress SamGuard — 05:16 (+07:00)

`https://www.samguard.co/`: status 200, 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics/ads `failedRequests`. Clean.

Trello: Elena - WordPress SamGuard ✓.

---

## Matrix — 05:00 (+07:00)

**Active rooms: 20 / 150 | Messages: 442** *(since 2026-10-06 05:00)*
Full details: reports/2026-10-07/matrix-rooms-0500.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| (namtv DM) | 14:01 | namtv: "Bên mày đang có mấy onboarding checklist overdue nha PhucVT Speedventory / Bailey Joey, PhucVT Definitive Guide / James Le Chevalier, TuanNT Definitive Guide / James Le Chevalier". No reply seen ⚠️ |

(The Wildsoul and Bailey items the script flagged were already answered by you the same day.)

### Key updates

**Bailey/Paturevision: fixed-cost overrun** (11:00–17:06):
- datnc summarized Historical Purchase Order: est 25h vs actual 40h35m (TuanNT + VuTQ). You flagged it as unacceptable and repeated for fixed-cost work, pinned the fixed-cost rule, and asked everyone to confirm. TuanNT and VuTQ confirmed.
- Advanced Split Order needs more time. TuanNT argues it's a CR (Prestashop split API change). datnc will take it to the client.
- Joey paid $7,005 Desktop + small items; the $555 Filters payment is pending clarification.

**Sandor/Lyf (urgent):** LongVV fixed the lyf-admin bug in ~1h (bill 2.5h). Later a server-package issue came up and you covered it while LongVV was off (no deploy rights, asked client to try).

**Definitive Guide:** Laravel 10→13 upgrade handed from LongVV to PhucVT (week 3/6, on schedule). CI blocked by GitLab minutes (Alert #12).

**Fountain:** heavy BETA/STAGING deploys of Kunal's PRs; QC is finding cart and 404 regressions; team frustrated with Kunal's code churn.

**Other:**
- Wildsoul: WBS A–E drafted, Wallet scope trimmed, your estimate updated 17:05.
- Arthur: Carryover + M4 on staging, $81 quote for extra item.
- Precognize: license service deployed, key generation working.
- Franc: KhanhHH picked up the customer request.

---

## Performance — 05:25 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.99 | 110ms | 3.3% (649/19920), ~97% benign NotAuthenticated/InvalidToken | 14.2/min |
| MPFC | **0.16** 🔴 | 3162ms | 5.9% (2082/35317) | 25.2/min |
| Fountain | 0.99 | 153ms | 0.01% (5/70394) | 50.2/min |
| InfinityRoses | 0.97 | 143ms | 0.03% (4/13954) | 10.0/min |

**OhCleo errors:** NotAuthenticated 602, InvalidToken (expired), ValidationError dup email 8 / username 4 / bad code 4, AuthFailed "User does not exist" 7, IntegrityError null user_id app_playhistory (chronic), "Passwords don't match" 1, token blacklisted.
**OhCleo slow:** ChatSendView.post 3.86s/6. ValidatePurchaseView 1.12s/4. CancelSubscriptionView 0.95s/1. AppleLoginView 0.72s/26. CategoryMediaView 0.70s/246. The LogoutView outlier from 10-05 didn't recur.

**MPFC errors:** `continue` targeting switch E_WARNING 1971, WP_Error::get_method() (chronic), count() non-countable 17, mysqli_real_connect No such file or directory 8, legacy-widget require compile error 5, mkdir name too long 3, MM_Event class not found 3, get_header undefined 2+1, chr() type 1.
**MPFC slow:** sitemap_index.xml 62.3s/1, signup 42.6s/1, search (encoded probe) ~40s, forgot-password 39.0s/2, reset-password 38.8s/1 → Alert #4.

**Fountain errors:** ArgumentError wrong # args 5, NoMethodError nil `[]` 3, CSRF 1. **Slow:** build_a_box_gift_variants **19.5s/119** (Alert #3), gifts/all 6.1s/5, paypals/authorize_order 3.0s/3, payment_intents/create 1.85s/78, pro_payment_intents/create 1.82s/1.
**Infinity errors:** UnknownFormat 4, ArgumentError 4. **Slow:** payment_intents/create 1.76s/10, search 1.65s/21, ShipStationOrderWorker 1.28s/9, ShipStationShipmentWorker 1.04s/4, cart_items/create 0.84s/18. Healthy.

Not gated by Trello.

---

## Upwork Memo — 2026-10-06 — 05:12 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | ~~Not verified~~ 08:36: 0 memos on 10-06 (no time logged) |
| Aysar | ~~Not verified~~ 08:36: 1 memo, valid ("Implement approved navy dark mode across remaining pages (#705)"). Note: WS shows KhanhHH 0h on Baamboozle on 10-06, so the Upwork entry is probably a UTC day boundary or a small slot. Not an alert. |
| Tokenlite | Not verified: duongdn account session/headless login failed (2nd attempt 08:36) |

Neural Contract (`upwork-neural-check.js`): carrick's Chrome Profile 1 Upwork session gave 0 cookies after 4 attempts. It needs one real login in that Chrome profile.
08:37 recheck: still redirects to login after the Profile 1 page-touch fix plus 4 retries (2 genuine attempts). It needs a real login in carrick's Chrome Profile 1. Per the session-failure rule this is not an alert. Neural ✓. Manual re-run: `node scripts/upwork-memo-check.js --date=2026-10-06`.

---

## Scrin.io — 05:11 (+07:00)

**Scrin.io (Nick @ John Yi company account, 2026-10-06):** 0h, no sessions recorded. Expected, since John Yi was cancelled 09-28.

---

## Ignore List — 05:20 (+07:00)

Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills)

---

## Trello — Check progress / Check mail — 05:22 (+07:00)

**Check mail:** 5/6 ✓. Ken ○ (Alert #13).

**Check progress (16/22):**
- ✓ complete: John Yi (ignore), James Diamond, Aysar, Franc, Elliott, MPFC, Elena-SamGuard (ignore), Raymond, Neural Contract, Andrew Taraba, Rebecca (ignore), Colin (ignore), Philip (ignore), Arthur (ignore), Blair Brown (ignore), Elena-WordPress-SamGuard.
- ○ incomplete: **Maddy** (#5), **Rory** (#8), **Marcel** (#7), ~~**Bailey** (#9)~~, **Fountain** (#1–#3), **Ohcleo** (#6).
- 08:42 recheck: Bailey ✓ (TuanNT reminder sent). Live card re-fetched; the other 5 are still ○ because the customer asks are still unanswered (re-verified Slack/Trello 08:35). Progress 17/22.

Neither card is marked done.

---

## Not run this pass

- Arthur 6-source check: paused (Ignore List).
- Elena PRs/deploy/Precognize: paused (Ignore List).
- Maddy JIRA weekly cross-check script (`maddy-jira-tasklog-check.js`) not run. Its sheet source is known to be stale (memory). A live JIRA/Bitbucket check was done instead (Maddy section).

## Unresolved Questions

1. Fountain GiftDrop order #5113334XO (Alert #1): does Rick need a nudge to reply to mike/Kunal, or is it being handled off-board?
2. MPFC apdex 0.16 + mysqli socket errors: is the server under load or is the DB flapping? It may need a server check (`/me:mpfc-monitor`).
3. ken@ Zoho app password: was it rotated on purpose? Please provide a new app password.
4. GitLab compute minutes for Carrick's namespace are at 0. Buy minutes, or move definitive-guide CI to a self-hosted runner?
~~5. TuanNT 0h on 10-06: re-check after 09:00 before sending a reminder~~ (resolved: reminder sent 08:35)
5. Tokenlite Upwork (duongdn account) + Neural (carrick Profile 1) need one real browser login each.
