# Daily Report — 2026-10-09 (Friday)

**Run:** 2026-10-09T05:00:12+07:00 (cron), corrected 08:35 (+07:00)
**Window:** 2026-10-08T05:30:00+07:00 → 2026-10-09 05:30 (+07:00)
**Leave plan:** parse-leave-emails refreshed 05:00: no upcoming approved leave. From Matrix: TienND sick 10-08. TuanNT left 1h early 10-08 (approved). DaiDV off 10-09 (from 10-08 report).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Performance (MPFC) | **Apdex 0.02**, 4th day critical (0.16 → 0.01 → 0.02). Avg response 3.84s over 35,790 requests. `continue` E_WARNING ×143, WP_Error::get_method ×50, mysqli socket ×2, MM_Event class not found ×2, `get_header()` undefined ×1. Slowest requests are scanner probes (`.ssh/authorized_keys`, `yarn.lock`, `local_settings.py`) at ~72–76s, but real pages are just as slow (`user-video/warm-up-day-5` 73.8s). The site is still badly degraded. Needs `/me:mpfc-monitor` or a server check. |
| 2 | Slack Xtreme / Matrix (Maddy) | (a) Invoice explanation: you rewrote the apology message for Madhuraka at 17:04 (PHP Projects). It's **not confirmed that chientx sent it to the client**, and chientx will handle point 3 separately. (b) Anoma 17:38: "Can u send me the images for these 'Not fixed' issues". No reply from Kai yet. (c) LIFM2-468 (Testing) has no estimate and no JIRA log. → Maddy ○ |
| 3 | Slack RDC (Franc) | dmetiner 04:07–04:11 (today): new bug. Assigning a favorite frequency to a user shifts the preset buttons plugin ("only assigned Power FM… 100.7 also got overridden and all other frequencies shifted"). He also asked: "Can you please take note of this failure and how you solved it in a Markdown file for the future?" Unanswered (fresh). → Franc ○ |
| 4 | Discord Bizurk (Andrew Taraba) | animeworld 05:01–05:54 today, all unanswered as of 08:30: (a) "Add fee or discount" → "Update Total" wrongly opens the collect-payment modal for the original amount; (b) "another major error": closing the mobile browser to open the payment app closes all modals ("this POS plugin is super shitty… can you see if there's a fix"); (c) move "Chip and Pin" to the top of the list, selected by default; (d) rename "Chip and Pin" to "Credit Card". ~~animeworld 05:01 today: "there seems to be a bug here"~~ (plus an attachment). This comes after "ok looks good to me" (13:08) on Carrick's POS/WooCommerce status work. Unanswered. → Andrew Taraba ○ |
| 5 | Workstream needs review | OhCleo: LongVV 10-05 ×3 (8h), 10-06 ×2 (2h), 10-07 ×3 (5h), plus PhuongPVT 10-05 0h, all Pending. Reviewers: **DuongDN, MinhTV** (4th day). Crystal lang: PhucVT 10-05 8h, 10-06 6h, 10-07 3h Pending. Reviewer: **TienND** (Arthur paused, listed for visibility). |
| 10 | Upwork Memo (Aysar) | Re-run 08:30: KhanhHH 10-08, 1 of 3 memos flagged: "Handle feature: Allow free subscriptions given through admin to be revoked #718" (the script reads it as a feature label, not a stated action; borderline because "Handle" is a verb). Rory: 0 memos on 10-08. Tokenlite still not verified. Informational, does not gate Aysar. |
| 6 | Email (ken@) | Still not scanned: Zoho IMAP `AUTHENTICATIONFAILED` (3rd day). Calendar `no_principal`. A new app password is needed. → Ken mail ○ |
| 7 | Email (carrick@) | GitLab definitive-guide pipelines still failing ×11 (cp1-laravel10, cp1-staging-fixes, integration). Compute minutes are still exhausted (4th day). Team is testing on the new `upgrade/cp2-laravel13` branch. Also **Mailjet "Account suspension review request" reply** (Request #4279499). Worth reading, since it's an account suspension. |
| 8 | Email (vuongtrancr@) | Swish New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" ×15 (up from ×8 on 10-07, ×2 on 10-06). Escalating trend. |
| 9 | Fountain (Matrix QA) | ViTHT 13:42: **checkout page layout broken on the Gift-a-Choice flow** (HungPN saw it too); normal gift flow OK. The environment isn't stated, so it's not confirmed live. `build_a_box_gift_variants` is still slow at 15.5s avg over 98 calls (improved from 25.8s). Kunal's board comments are all handled, so Fountain ✓, but watch this. |

**Resolved since 10-08 report:** #3 OhCleo Celine asks (Tony answered 01:54 UTC 10-08). #5 LeNH 10-07 (now 8h James Diamond on WS) and TuanNT date fix. #6 Wildsoul estimate (sent to client 16:25). #2 Fountain Rollbar #363 (not recurring in NR this window).

**Today (Fri Oct 9):** No approved leave on record. All present, as far as known.

---

## Email — all — 05:02 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@... | 0 | — | no events |
| carrick@... | 14 | #7 GitLab failed pipelines ×11. Mailjet suspension-review reply. Sumit B. via Upwork message. Kinsta marketing. | no events |
| nick@... | 0 | — | no events |
| rick@... | 13 | Rollbar daily summaries (FountainGifts, InfinityRoses, FirstProject). FountainStaging BugSnag: SitemapError, ArgumentError smartlink_giftdrop, PG::ConnectionBad ×4. All staging, no prod alert. | OmniGPT Daily Sync 10:30 (recurring) |
| kai@... | 5 | Anoma mentioned Kai on LIFM2-468 ×3 (Quoting Tool Issue). Madhuraka marked LIFM2-466 [NOT PROCEEDING]. | no events |
| ken@... | — | #6 IMAP auth rejected | unavailable (no_principal) |
| vuongtrancr@gmail.com | 18 | #8 Swish signal lost ×15. Delayed-newform Rollbar daily summary. | — |
| dnduongus@gmail.com | 23 | none (bank receipts, Shopee, LinkedIn, newsletters). "You shared some Google Account data with Claude" is your own Drive connector grant, not a breach. | — |
| davidztv19@gmail.com | 2 | Google privacy notice, Basecamp ResidentRadius digest | — |
| freelancer@mpfc | 1 | MPFC Rollbar daily summary | — |

Trello: DuongDn, Carrick, Rick, Kai, Nick ✓ complete. Ken ○ (#6).

---

## Slack — all 14 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 11 | Carrick (#testing): login fix confirmed for skjamie25 (cache clear). Navy dark mode is complete across the remaining pages, so Plus-account testing was requested. Task deployed on nusdev. 16:55 asked the client to retest the assigned bugs. #random banter. |
| RDC - FM Monitoring | 18 | Tuner Instability ×3 at 19:05–19:07, Recovery 19:10. **dmetiner 04:07–04:11: new preset-shift bug + Markdown postmortem ask**, unanswered → #3 |
| Swift Studio | 9 | Rory 15:48: app buttons are not linking correctly (the drop-down shows "sweat classes" but the app opens "gym floor"). Jeff is investigating and asked for clarification. Rory explained at 17:38, and it's now on Jeff (LuHX picked up the ClickUp task per Matrix). Not overdue. |
| Xtreme Soft Solutions | 28 | Kai explained LIFM2-468 / PR #548, size-issue workaround (enter GM/PM in Size box), why most "not fixed" rows aren't faults; confirmed #548 supersedes #534; Anoma to test asap. **Anoma 17:38 asks for images, unanswered** → #2. Kai daily-report gate: LongVV Maddy 1h on 10-08 (Kai-role work); Kai active all day in-thread, no separate "daily report" post found by search. Flagged under #2. |
| SAM GUARD - Mobile | 1 | HubSpot MQL bot only. |
| Global Grazing Services (Bailey) | 3 | **Nick's daily report present** (#maintenance 02:07 10-09): Prestashop storage NOT OK 86%, unchanged. Amy: payment follow-up; Split Order Advanced clarification questions sent to Joey. |
| Amazing Meds | — | invalid_auth. Cancelled (Ignore List), not refreshed. |
| Generator | 0 | No activity. |
| LegalAtoms | 0 | No activity. |
| MyPersonalFootballCoach | 5 | Client 16:56: "test it to make it go live?" (payments/permissions). freelancer 17:05: "working, will tell you soon". In progress, answered. |
| William Bills | 0 | Paused (Ignore List). |
| Equanimity | 18 | Carrick sent payloads for tenants 56/99/133/141/146/150 (all 200, 0 errors) and gave Komal per-tenant counts for today. Answered the trailing-space nationality concern (not a rejection risk with the current mapper). |
| SoCal Auto Wraps | 0 | Dropped. |
| Aigile Dev | 1 | gaige alert bot (Colin paused). |

Trello: Rory, MPFC, Marcel, Raymond ✓. Franc ○ (#3), Maddy ○ (#2). Aysar ○ (see Sheets: KhanhHH 10-08 not yet logged).

---

## Discord — airagri + bizurk — 05:01 (+07:00)

Tokens valid on both accounts.

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 28 | **Vinn daily report present** (review PRs #746/#747, Factual Investigation corrective actions deployed; Mary/bellatric02 tested OK). **Jeff daily report present** (4h, Contractor App check-in form flow). dapackage merging Ceres + onboarding to staging and asking for opinions. jdiamond asked Vinn to start peer-reviewing Jeff's work ("not because i dont trust him"). |
| Bizurk (nuscarrick) | 0 + 9 DMs | Carrick finished the POS/WooCommerce status snippet and the client said "ok looks good to me" (13:08). **animeworld 05:01: "there seems to be a bug here"** → #4 |

Trello: Andrew Taraba ○ (#4, 4 more asks 05:01–05:54). James Diamond ~~○ (Vinn OK, LeNH 10-08 not yet logged)~~ ✓ (LeNH 8h found 08:23).

---

## Sheets/Workstream — all devs — 05:15 (+07:00)

Reporting day: **2026-10-08 (Thu)**. Fetched at 05:15 via a Keycloak API token refresh, with no browser. As on 10-07, same-day logging is mostly not in yet: 10-07 was 0h at 05:15 yesterday and fully filled by 09:00. **No 0h alert raised. Re-check after ~09:00.**

| Developer | 2026-10-08 (all WS projects) | Week to date | Status |
|-----------|------|------|--------|
| LeNH | ~~— (not yet logged)~~ **8h** James Diamond (08:23 re-check) | James Diamond 8/8/8/8 | ✓ OK → James Diamond ✓ |
| TuanNT | — (still not logged at 08:23 re-check; Matrix: DefinitiveGuide testing all day, left 1h early) | 10-05 8h, 10-06 8h, 10-07 8h (Def. Guide 7 + Speedventory 1, **date fixed** ✓) | pending → Bailey ○ |
| KhanhHH | — (still not logged at 08:23; Upwork Aysar shows 3 memos on 10-08, so she did work) | 10-05 8h, 10-06 8h (RDC), 10-07 8h (RDC 6.5 + Baamboozle 1.5) | pending → Aysar ○, Elliott ○ |
| PhucVT | — | Crystal lang 17h + Definitive Guide 7h | Not gated |
| LongVV | 3h (Maddy 1 + Definitive Guide 2) | OhCleo 15h, Maddy 2h, Def. Guide 3h | Ad-hoc, informational |
| LuHX | 0.67h (BXR) | Maddy 1, Family App 3 | informational |
| DuongDN | 0.17h (Tokenlite) | 1.0h | — |

**Workstream project rows (excl. Fountain):**

| Project | Dev hours 10-08 | Reviewer(s) | Reviewer's charged hours | Review status |
|---------|------------------|-------------|------------|----------------|
| Maddy (Xtreme) | LongVV 1h | — | — | need_review=false |
| James Diamond | ~~—~~ LeNH 8h, AnhNH2 4h | PhucVT, LeNH | LeNH 8h (32h wk) | none pending |
| Baamboozle (Aysar) | — | — | — | need_review=false |
| Generator (Elliott) | — | HangNTT, LucNT | 0h | none pending |
| Colin/ETZ | — | LucNT | 0h | none pending (paused) |
| Radio Data Center (Franc) | — | LeNH | 0h | none pending |
| BXR App (Rory) | LuHX 0.67h | — | — | need_review=false |
| Speedventory (Bailey) | — | — | — | need_review=false |
| Tokenlite (Marcel) | DuongDN 0.17h | — | — | need_review=false |
| Crystal lang (Arthur) | — | TienND | 0h | **Pending** (PhucVT 10-05/06/07), #5 |
| OhCleo | — | DuongDN, MinhTV | DuongDN 0h | **Pending** (LongVV 10-05/06/07), #5 |
| Family App | — | — | — | need_review=false |
| Definitive Guide | LongVV 2h | — | — | need_review=false |

Missing-report days flagged by WS: Baamboozle 10-05/10-07, James Diamond 10-05–07, Crystal lang 10-05–07 (informational).

Trello: ~~James Diamond,~~ Bailey, Aysar, Elliott ○, pending a re-check of 10-08 hours after 09:00. James Diamond ✓ (08:35, LeNH 8h + Vinn report OK).

---

## Maddy — W41 — 05:20 (+07:00)

1. **Task log:** LongVV Maddy 1h on 10-08 (2h this week). Ad-hoc, informational.
2. **Slack:** Busy Kai/Madhuraka thread (see Slack). Madhuraka's questions were all answered. **Anoma 17:38 image request unanswered** → #2b.
3. **JIRA (LIFM2, updated since window):** LIFM2-468 "Quoting Tool Issue" is in Testing with Anoma, with **no estimate and no time logged** (#2c). LIFM2-466 To Do, marked [NOT PROCEEDING] by Madhuraka.
4. **Bitbucket (`xtreme-web/rms`, 7 open PRs):** #548 (LIFM2-468) updated 10-08, 1 comment, and supersedes #534 per Kai. #540, #481 (waiting on customer, per memory not our blocker), #549, #544, #534, #509 unchanged.
5. **Invoice reconciliation:** The reply was drafted and revised in PHP Projects at 17:04. Delivery to the client is unconfirmed → #2a.

Trello: Maddy ⚠️ skipped (#2).

---

## Fountain — 05:22 (+07:00)

**Part 1 — Matrix Plan:** trinhmtt 2026-10-05 09:49: "ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h". No new plan.

**Part 2 — Task Log Actuals (Workstream, Mon–Thu):** DatNT 32h (8 on 10-08). ThinhT 16h (4). ViTHT 4h (0 on 10-08 despite Matrix activity). VuTQ 14h (4). QC: PhatDLT 10.5h + HungPN 12.75h = 23.25h. TrinhMTT 5.5h (not QC, excluded).

**Part 3 — Plan vs Actual (4 of 5 days, 80%):**

| Dev | Plan | Actual | Expected at 80% | Pace |
|-----|------|--------|------|------|
| DatNT | 40h | 32h | 32h | on pace |
| ThinhT | 20h | 16h | 16h | on pace |
| ViTHT | 40h | 4h | 32h | 🔴 far behind. She was active in Matrix 10-08 (PR #509 live, GoC fixes), so likely unlogged. Informational (per-dev alerting off). |
| QC (PhatDLT+HungPN) | 25h | 23.25h | 20h | on pace |

**Part 4 — Capacity & Runway** (Est vs Charged, 106 rows, re-read live): row set and totals unchanged (Est 1529.25 / CR 133.5 / Actual 1557.25). Narrow **229.0h**, broad **328.5h**, carried from 10-08 because nothing changed.

**Part 5 — Over-estimate:** 37 rows over 120% using actual ÷ (est + CR). The 10-08 report counted 36; the 1-row difference is a method edge case, not a new task. Top unchanged: #2627 0.5→8.25h (+1550%), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2545 1→7.5h, #2630 0.5→3.75h, #2613 2→14.5h.

**Trello board (comments since 10-08 05:30):** kunalsheth 12:01 on Bottle engraving: "Whats the plan here do we push live or wait?" rick570 14:26: deployed on LIVE and testing ✅. kunalsheth on the GiftDrop GoC order: "Dont worry about this lets mostly focus on making sure v2 is good" ✅. No unanswered customer comment.

**Matrix:** GoC missing-item fix (PR #539) and PR #509 went live. Checkout layout is broken on the GoC flow (#9).

Trello: Fountain ✓ (board clean, no new prod error class). #9 is watch only.

---

## OhCleo Slack — 05:08 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 4 | Tony 01:54 UTC answered all of 10-07's asks: tagging has nothing left and he'll run it once approved; cover is updated per feedback; new design is ~50% on the website. Celine 20:14–20:15 UTC: new design ready "by noon tomorrow… I mean next week!", including the app. Backup tags are almost uploaded (few MLM/WLW). "Either I finish it tomorrow morning or… you can run it without those tags… whatever is easiest for you!" This was posted overnight, so no reply is due yet. |
| #events-code | — | `channel_not_found` (chronic, bot removed from channel) |

Tony daily report for 10-08: none, but LongVV logged **0h on OhCleo on 10-08** (Maddy + Definitive Guide only), so no report was expected and this is not an alert.

Trello: Ohcleo ✓.

---

## Elena - WordPress SamGuard — 05:16 (+07:00)

`https://www.samguard.co/`: status 200, 0 JS errors, 0 page errors, 0 CSP violations, 8 benign analytics `failedRequests`. Clean.

Trello: Elena - WordPress SamGuard ✓.

---

## Matrix — 05:01 (+07:00)

**Active rooms: 23 / 150 | Messages: 534** *(since 2026-10-08 05:30)*
Full details: reports/2026-10-09/matrix-rooms-0501.md

Both script-flagged action items were already handled. Marcel/ZKTeco forward: you replied "ok" at 13:48. Wildsoul "update estimate xong thì báo e": you confirmed done 16:03, and the doc was sent at 16:25.

### Key updates

**Maddy invoice (PHP Projects):** apology and explanation rewritten 17:04 (15.75h not logged in JIRA, "mình quên log"). chientx takes point 3 separately, and sending is unconfirmed (#2).

**Wildsoul:** class over appointment, drop-in/series mapping, signed-QR offline check-in, legacy pricing via promo code. Estimate doc **sent to client 16:25 ✅**.

**James – DefinitiveGuide:** TuanNT moved to the `upgrade/cp2-laravel13` staging build. `.env` path clarified, Stripe test mode set up, free-plan error fixed 15:50 ✅.

**Fountain:** PR #509 and the GoC thank-you fix went live. Checkout layout is broken on the GoC flow (#9). DatNT is staging #600/#553/#601/#603.

**Lyf (Sandor):** LongVV PRs #547/#548 merged, but errors persist. The same error exists on prod, so LongVV will report to the client with an estimate. MinhTV asked you to help.

**Precognize OP:** Data Exclusions time-window requirement needs the client's answer before she's off 10-09.

**Other:**
- Bailey: TuanNT fixed the task-log date ✅. #101 Split Order may overrun ~2h. trinhmtt says the client will pay soon.
- Resource: TienND sick 10-08. TuanNT left 1h early (approved).
- BXR: LuHX picked up Rory's button-link task and is waiting on photos.
- OhCleo/Streamline: mobile home view estimate 6h (LuHX).

---

## Performance — 05:25 (+07:00)

Window: since 2026-10-08 05:30 (+07:00).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.98 | 104ms | 3.0% (569/19037), ~97% benign NotAuthenticated/InvalidToken | 13.5/min |
| MPFC | **0.02** 🔴 | 3837ms | 0.6% (205/35790) | 25.3/min |
| Fountain | 0.99 | 129ms | 0.004% (3/75234) | 53.2/min |
| InfinityRoses | 0.98 | 158ms | 0.01% (2/16225) | 11.5/min |

**OhCleo errors:** NotAuthenticated 531, InvalidToken 23, AuthFailed "User does not exist" 7, ValidationError dup email 4 / dup username 2, ValueError Invalid bcrypt hash 1, AuthFailed "Passwords don't match" 1.
**OhCleo slow:** ChatSendView.post 2.85s/10, ValidatePurchaseView 1.15s/1, CreatorVerificationApproveView 1.10s/2, EmailVerificationView 1.02s/6, CreatorVerificationSubmitView 0.97s/1.

**MPFC errors:** `continue` E_WARNING 143, WP_Error::get_method() 50, mkdir name too long 4, mysqli_real_connect no socket 2, MM_Event class not found 2, legacy-widget require compile error 1, chr() type warning 1, undefined `get_header()` 1.
**MPFC slow:** local_settings.py 76.3s/2, author/ejessonwiwest-com 75.2s/1, .ssh/authorized_keys 74.4s/2, **user-video/warm-up-day-5 73.8s/1**, yarn.lock 72.1s/2. Scanner probes and real pages are equally slow, so the server is saturated → #1.

**Fountain errors:** InvalidAuthenticityToken (CSRF) 3, ArgumentError wrong # args 3. No NameError #363 recurrence.
**Fountain slow:** admin/gifts/import_csv 21.2s/1, **build_a_box_gift_variants 15.5s/98** (was 25.8s/123), admin/promo_codes/index 4.0s/3, custom_box_categories/index 3.8s/36, paypals/authorize_order 2.8s/4.

**Infinity errors:** UnknownFormat 2, ArgumentError 2 (down from 65/62). **Slow:** ShipStationShipmentWorker 1.79s/3, payment_intents/create 1.62s/10, ShipStationOrderWorker 1.35s/8, registrations/create 1.24s/3, search 1.20s/41. Healthy.

Not gated by Trello.

---

## Upwork Memo — 2026-10-08 — 05:25 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | ~~Not verified~~ Re-run 08:30: 0 memos on 10-08 |
| Aysar | ~~Not verified~~ Re-run 08:30: KhanhHH, 3 memos, 2 valid. ⚠️ "Handle feature: Allow free subscriptions given through admin to be revoked #718" is feature-label style (#10) |
| Tokenlite | Not verified locally either (carrick Chrome Profile 1 session). Manual: `node scripts/upwork-memo-check.js --date=2026-10-08 --workroom=Tokenlite` |

Per the session-failure rule this is not an alert and not a memo status. Yesterday the local re-run worked once carrick's real Chrome refreshed the token. Manual re-run from local: `node scripts/upwork-memo-check.js --date=2026-10-08`. Neural messages were not read (same cause), so Neural ✓ per rule.

---

## Scrin.io — 05:01 (+07:00)

**Scrin.io (Nick @ John Yi company account, 2026-10-08):** 0h, no sessions recorded. Expected, since John Yi was cancelled 09-28. Not TuanNT evidence.

---

## Ignore List — 05:30 (+07:00)

Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills)

---

## Trello — Check progress / Check mail — 05:30 (+07:00)

**Check mail:** 5/6 ✓. Ken ○ (#6).

**Check progress: ~~15/22~~ 16/22** (08:35)
- ✓ complete: John Yi (ignore), Rory, MPFC, Marcel, Elena-SamGuard (ignore), Raymond, Neural Contract, Rebecca (ignore), Colin (ignore), Fountain, Philip (ignore), Ohcleo, Arthur (ignore), Blair Brown (ignore), Elena-WordPress-SamGuard.
- ○ incomplete: **Maddy** (#2), **Franc** (#3), **Andrew Taraba** (#4), ~~**James Diamond** (LeNH 10-08 pending)~~ (✓ 08:35), **Bailey** (TuanNT 10-08 pending), **Aysar** + **Elliott** (KhanhHH 10-08 pending).

Live card re-fetched after writes. Neither card is marked done.

---

## Not run this pass

- Arthur 6-source check, Elena PRs/deploy/Precognize, Philip MS Teams: paused (Ignore List).
- `maddy-jira-tasklog-check.js`: its sheet source is stale (memory). A live JIRA/Bitbucket check was done instead.
- WhatsApp/Zalo: excluded by default.
- Reminders (Piece 9): no 0h reminders. 10-08 hours can't be judged at 05:15 because of the logging lag. Nothing sent (no `--send-reminder`).

## Unresolved Questions

1. MPFC apdex ~0.0 for 4 days: who owns the server check today? It isn't recovering on its own.
2. Was the revised Maddy invoice message (17:04) actually sent to Madhuraka?
3. ken@ Zoho app password: please provide a new one (3rd day).
4. GitLab compute minutes for Carrick's namespace: buy more or use a self-hosted runner? (4th day)
5. Mailjet account suspension review (carrick@): what account or project is it for, and does anyone need to act?
6. ViTHT shows 4h of a 40h plan on Fountain by Thursday. Is she on another project, or just not logging?
