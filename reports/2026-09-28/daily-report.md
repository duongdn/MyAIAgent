# Daily Report — 2026-09-28 (Monday)

**Run:** 2026-09-28T05:00:00+07:00 (cron), corrected 08:37 (+07:00) (recheck)
**Window:** 2026-09-25 05:00 → 2026-09-28 05:00 (+07:00)
**Leave plan:** KhanhHH approved leave (namtv) 25/09, 28/09, 29/09, 30/09 — "Về quê giải quyết giấy tờ". LiemHTN 28/09 (health check, Resource Arrangement). PhucNH resignation: cuongnh posted (Matrix, NUS Technology) — PhucNH resignation checklist sent by email 2026-09-25/26; check email for details, deadline noted in message.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream — KhanhHH | ~~0h logged across ALL 19 Workstream projects + sheets on Fri 2026-09-25, no leave note. Gates Aysar + Elliott.~~ → **CLEARED 08:37:** approved full-day leave 25/09 (email "KhanhHH - Đơn xin nghỉ phép 04 ngày 25/09, 28/09, 29/09, 30/09/2026", approved by namtv). 0h expected. Aysar + Elliott ✓ completed. |
| 2 | Workstream needsReview — Crystal lang (Arthur) | Still Pending (carried from 2026-09-25 report): PhucVT — "Check/write script for delete data on staging" + "Check report data on production" (09-21, 0:30) + "Staging cleanup" (09-23, 0:30). Reviewer: TienND (override). |
| 3 | Fountain Trello — unanswered customer comments | Re-verified live 08:30: still 4 unanswered, all posted over the weekend (Sat 06:11 → Sun 03:04 VN) — rick570 is online (replied on a different card, [Update multiple order spreadsheet](https://trello.com/c/cirjRR98), 08:31). Cards: [Blurb Bug](https://trello.com/c/67Rrcyf8) (vitht picked it up in Matrix 08:30, no customer reply yet), [Bottle engraving](https://trello.com/c/BAI99Jrx), [Contact form layout](https://trello.com/c/OSbaYhDP), [Infinity gift variant export](https://trello.com/c/z8P7mYj5). Original: 4 kunalsheth comments unanswered since first response gap opened: "Updating Gifts CSV..." chain resolved, but "Blurb Bug" (09-25 23:11), "Fountain - Product page, Bottle engraving" (09-26 05:43), "Fountain - Update static page contact form layout" (09-26 15:47), "Infinity - Update gift variant export" (09-26 20:04) — no rick570 reply as of run time. |
| 4 | OhCleo Slack — Celine Fierro | ~~"Please review my last question!" (09-25 12:02) went unanswered by Tony until a different-topic message on 09-27 17:08 (~53h gap).~~ → **Reframed 08:37:** Slack times are UTC. Celine's nudge came at 19:02 VN Fri (after Tony's end-of-day report). Tony's Sun reply (00:08 VN Mon) *is* the answer to the cover-art question: 4 image models + cost trade-off. Celine picked flux-2-max and asked for more samples (00:43 VN Mon). hungpn saw a Fri-evening estimate request too. **Still open (fresh, weekend):** more samples + estimate → Tony to act this morning. Ohcleo ○ until answered. |
| 5 | ~~Matrix — Bailey/Paturevision customer report~~ | **FALSE ALERT, struck 08:37:** the Matrix room is internal. Bailey's customer-report gate is GGS Slack, where Nick posted his report 09-25 17:19 (#général). Joey's "did you guys take a look?" (09-25 14:23) is answered by the 09-24 16:55 top-level dashboard-fix post, which Joey acked ("will look today or Monday"), so the ball is with the customer. TuanNT 8h. Bailey ✓ completed. ~~No customer-facing daily-report-style message from Nick found in "NUS - Bailey - Paturevision 2026" room this window — only internal dev chat (task log correction, bug triage, server setup). TuanNT/VuTQ logged real hours (8h/day) so this isn't a 0h day, just missing the customer-facing report format. Not auto-reminding — flagging per standing rule.~~ |
| 6 | Elena — open PR | PR #309 "Implement header and modal components with i18n support" (process-digital-plant) open, 0 reviews yet (no CodeRabbit review posted). Not merged this run — Elena is on the paused Ignore List so item was auto-completed per standing instruction, but PR is still open and needs eyes. |
| 7 | Slack Xtreme — Maddy client prod issue (NEW, recheck 08:37) | Madhuraka DM 06:42 today: client reports "all recently sold items are now showing as draft status, rather than active but out of stock… please prioritise". Asks whether it's due to a recent change. No Kai reply yet. [Slack](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1790552571912369). Maddy ○. |
| 8 | Matrix — Mindbody Blog Posts | chientx 09-25 17:01: "a Duong Doan, tìm cách chỉnh lại logo cho giống y chang style mấy hình khác" — DuongDN action, no reply. |

**Today (Mon 09-28):** ~~No confirmed absences found this run~~ → KhanhHH on approved leave (28–30/09, so Aysar/Elliott work pauses this week). LiemHTN off (health check). Carrick (Baamboozle) said he'd be away some days this week. PhucNH resignation processing (HR).

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 2 | no events |
| carrick@nustechnology.com | 2 | no events |
| nick@nustechnology.com | 0 | no events |
| rick@nustechnology.com | 37 | no events |
| kai@nustechnology.com | 9 | no events |
| ken@nustechnology.com | 80 | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks (Teams, recurring) |
| vuongtrancr@gmail.com | 19 | — |
| dnduongus@gmail.com | 51 | — |
| davidztv19@gmail.com | 3 | — |
| freelancer@mypersonalfootballcoach.com | 9 | — |

Notable:
- duongdn@: HR resignation checklist for PhucNH shared (Google Sheets, from Cuong Nguyen) — also posted in Matrix "NUS Technology" 16:08 09-27, deadline noted in email/checklist, check mail directly for date.
- carrick@: Mailjet account suspension review + a password reset — routine.
- freelancer@mpfc: Rollbar daily summaries (25/26/27 Sep) + repeated `WP_Error::get_method()` production error (10x/5min bursts, chronic — see Performance section). No new client emails from Adam Blackford/team.
- kai@: normal Maddy/Xtreme JIRA + Bitbucket activity (LIFM2-450/467/459/428/409).
- dnduongus@ / vuongtrancr@: routine bank/newsletter noise, no security alerts.

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete.

---

## Slack — all 14 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 31 | Aysar MPDM (C07SQ4HAUHZ): Carrick "leaving today + some days next week for personal issue." Engineering channel: 2FA rollout notice, deploy approvals. Customer-success: positive customer feedback thread. |
| RDC - FM Monitoring | 12 | dmetiner-style activity, no alerts. |
| Swift Studio | 1 | Low activity, no alert. |
| Xtreme Soft Solutions | 15 | Maddy/Kai JIRA+Bitbucket flow, normal. |
| SAM GUARD - Mobile | 14 | Elena/DP activity, no alert. |
| Global Grazing Services | 4 | Nick daily report in #général 09-25 17:19: "Update redmine fixes to staging-v2, Setup redis server." #grazing-software: dashboard fix posted 09-24 16:55, Joey acked 09-25 14:23 ("will look today or Monday"). Ball with customer. Joey was frustrated 09-23 ("can't go live, dashboard doesn't work", disputes CR); worth watching. |
| Amazing Meds | 0 | Clean, no invalid_auth. |
| Generator | 0 | Clean. |
| LegalAtoms | 0 | Clean. |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 0 | Clean. |
| Equanimity | 16 | Carrick/Marcel activity, no blocking alert found (deploy/storage related). |
| SoCal Auto Wraps | 0 | Dropped, not monitored. |
| Aigile Dev | 2 | Low activity, no alert. |

Trello: Franc, MPFC, Marcel, Raymond, Rebecca, Andrew Taraba ✓ complete. ~~Aysar/Elliott ⚠️ skipped (KhanhHH 0h, see Alert #1). Bailey ⚠️ skipped (see Alert #5).~~ → Aysar/Elliott/Bailey ✓ complete (recheck 08:37: KhanhHH approved leave; Bailey gate = GGS Nick report present). ~~Maddy ⚠️ skipped (full 4-part not completed this pass — Bitbucket PR reply-rate not run, time-boxed).~~ → Maddy full 4-part done at recheck (see ## Maddy); still ⚠️ because of Alert #7 (new client prod issue, unanswered).

---

## Discord — all — 05:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 25 | Vinn daily report present (Induction workflow fixes, Prevent Zone Stop Alarm deployed). Jeff Trinh daily report present (Team App task screen UI, 4h). QC (bellatric02) PR #727 checks passing. |
| Bizurk (nuscarrick) | 0 | Clean, no Andrew Taraba DM activity. |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all developers — 05:20 (+07:00)

Window days with activity: 2026-09-25 only (09-26/27 weekend, 09-28 too early for today's log).

| Developer | 09-25 | Status |
|-----------|-------|--------|
| PhucVT | 8h (Definitive Guide/Raymond project) | OK |
| TuanNT | 8h (Speedventory/Bailey) | OK — combined >0h, clears John Yi/Rebecca/Bailey gate |
| KhanhHH | ~~0h (all 19 projects + sheets) \| ⚠️ ALERT — no leave noted~~ 0h — **approved leave 25/09** (recheck 08:37) | ✓ OK (leave). Week: Baamboozle 18h (Tue–Thu), Radio Data Center 13.33h, BXR 0.67h |
| LeNH | 8h (Portfolio - James Diamond) | OK |
| LongVV | 4h (Maddy: LIFM2-459 2h + LIFM2-409 2h — Kai-role), 4h (OhCleo) | Informational. Kai-role hours, so a report was due: Kai progress report present 09-25 17:33 ✓ |

**Maddy JIRA × Workstream cross-check (week 09-21→09-27):**

| Ticket | Est | Actual (JIRA) | WS Log | Check |
|--------|-----|---------------|--------|-------|
| LIFM2-467 | 2h | 2h30m | 2.5h | 🔴 over 0h30m |
| LIFM2-468 | 0h | 0h | 1.5h | ⚠️ no est, no JIRA log |
| LIFM2-428 | 53h | 53h3m | 1.5h | 🔴 over 0h3m (trivial) |
| LIFM2-459 | 1h30m | 2h | 2h | 🔴 over 0h30m |
| LIFM2-409 | 113h15m | 111h15m | 2h | ✅ |

Overs are all minor/trivial (≤30m). No severe over-budget this week.

**Workstream needsReview (Fountain excluded):** Only Crystal lang/Arthur's 2 Pending rows carried forward from 2026-09-25 (see Alert #2). All other projects clean.

**Per-project reviewer/hours breakdown (window):** Baamboozle (reviewers: none/need_review=false); Xtreme (none); James Diamond (none); Crystal lang (reviewer TienND, Pending — Alert #2); OhCleo (reviewers DuongDN+MinhTV, reviewStatus clean this window); Speedventory/Bailey (none — Sheets-only project).

Trello: (see per-item notes above.)

---

## Maddy — W39 — 08:30 (+07:00) (recheck, full 4-part)

### 1. Task Log Hours (Fri 09-25)
| Developer | Fri | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV (Kai role) | 4h — LIFM2-459 Check Anoma feedback 2h, LIFM2-409 Check Anoma Scenario 2h | 11.5h (Maddy project, reviewers=[] → need_review=false) | informational, ad-hoc |

### 2. Slack / Kai Daily Report Check
- WS Maddy hours 09-25 = 4h, Kai-role (LIFM2 tickets) → report due → **Kai progress report present 09-25 17:33** ✓ (467 Done → Anoma testing; 459; 409).
- Madhuraka DM 09-25: URL question answered; asked about stale "To Do" tickets; Kai asked for 1–2h to explore improvements → Madhuraka: "I will absorb that cost. You can proceed" ✓. Anoma asked where the new form is → Kai answered 23:55 ✓.
- 🔴 **NEW 09-28 06:42 (Alert #7):** client production issue: recently sold items showing as **draft** instead of active/out-of-stock, "please prioritise"; Madhuraka asks whether a recent change caused it. Unanswered at 08:30. Recent deploys that touch Shopify product state (LIFM2-467 in-home quote form, 409 payouts) are worth checking first. [Slack](https://xtremesoftsolutions.slack.com/archives/D050TGMRFRQ/p1790552571912369)
- Matrix Maddy room 09-25: duongdn relayed Maddy's mild complaint that tasks drag on; told LongVV to speed up in the 3-person room.
- **Conclusion:** ⚠️ alert (fresh client prod issue unanswered).

### 3. JIRA (weekly cross-check)
See Sheets section table (LIFM2-467 +30m, 468 no est/no JIRA log, 459 +30m, 428 +3m, 409 ✅). All overs ≤30m.

### 4. Bitbucket PR Status (`xtreme-web/rms`, 8 open, API 200)
| PR | Age | Last update | Comments | Note |
|----|-----|-------------|----------|------|
| [#549](https://bitbucket.org/xtreme-web/rms/pull-requests/549) LIFM2-467 In-home pickup quote form | 4d | 09-24 | 0 | awaiting review |
| [#548](https://bitbucket.org/xtreme-web/rms/pull-requests/548) LIFM2-468 Lens title selection | 6d | 09-22 | 1 (Rovo Dev bot) | bot review only |
| [#544](https://bitbucket.org/xtreme-web/rms/pull-requests/544) LIFM2-465 | 18d | 09-21 | 0 | — |
| [#540](https://bitbucket.org/xtreme-web/rms/pull-requests/540) LIFM2-450 | 25d | 09-03 | 0 | — |
| [#534](https://bitbucket.org/xtreme-web/rms/pull-requests/534) concurrent cron fix | 33d | 08-26 | 1 (bot) | — |
| [#520](https://bitbucket.org/xtreme-web/rms/pull-requests/520) Refresh issue Quotes page | 75d | 09-09 | 0 | — |
| [#509](https://bitbucket.org/xtreme-web/rms/pull-requests/509) LIFM2-428 | 98d | 08-14 | 4 | — |
| [#481](https://bitbucket.org/xtreme-web/rms/pull-requests/481) LIFM2-409 feedback | 161d | 09-25 | 2 (bot 09-25) | waiting on customer; not a blocker (per memory) |

No unanswered human review comments. PR backlog is aging (5 PRs >2 weeks), but merges depend on the client.

---

## Scrin.io — 05:22 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-27):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:30 (+07:00)

**Part 1 — Matrix Plan:** New week's plan not yet posted (checked 05:10, before the usual 08:30-09:30 Monday window). Using last week's (09-21) plan for context: ViTHT 40h, DatNT 32h, ThinhT 20h, VuTQ ~8h => QC 25h.

**Part 2 — Task Log Actuals (week 09-21→09-27, final):** ViTHT 40h, DatNT 32h, ThinhT 20h, HungPN 12.5h, TrinhMTT 10.75h, PhatDLT 8h, VuTQ 12h.

**Part 3 — Plan vs Actual:** ViTHT 40/40h ✓ met exactly. DatNT 32/32h ✓ met exactly. ThinhT 20/20h ✓ met exactly. VuTQ 12h vs ~8h target — exceeded, fine. QC combined (PhatDLT+TrinhMTT) 18.75h vs 25h target — under, but week closed with plan otherwise fully met; no per-dev shortfall flagged.

**Trello Board:** 4 customer comments unanswered, re-verified live at recheck (weekend-posted; see Alert #3). Also seen in the Matrix room: Kunal pushes big refactors straight to master in his repo ([PR #546](https://github.com/iamksheth/FountainNewUI/pull/546)), breaking merges (the GOC Pro tab vanished on beta). Process risk.

**Part 4 — Capacity & Runway (recheck 08:37, live Sheets read, "Est vs Charged" A13:L118):** Narrow (Not Started + In-progress) 28 tasks / **229.00h** remaining; Broad (excl. Deployed on Live/Cancelled) 63 tasks / **328.50h**. Identical to 09-26 weekly → still frozen (14th week). Runway ≈2.7 weeks @86h/wk.

**Part 5 — Over-estimate (>20% over Est+CR):** **37** items, unchanged vs last week. Top: #2627 0.5→8.25h (+1550%, Has Bug on Live), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2630 0.5→3.75h (+650%), #2545 1→7.5h (+650%), #2613 2→14.5h (+625%), #2652 1.5→10.5h (+600%), #2501 4→25.5h (+538%).

**Part 1 recheck 08:37:** W{n} plan still not posted (normal before 09:30 Mon), so last week's plan is used for context.

Trello: Fountain ⚠️ skipped (Alert #3 — unanswered customer comments).

---

## Elena — 05:35 (+07:00)

*(Item is on the paused Ignore List — auto-completed regardless of findings below.)*

- Open PR: #309 "Implement header and modal components with i18n support" (process-digital-plant branch), 0 reviews posted yet. Not merged/deployed this run.
- Precognize (nusken): no open PRs authored by nusken.
- WordPress SamGuard (`www.samguard.co`): clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics `net::ERR_ABORTED` noise (GA/ads/LinkedIn pixels).

Trello: Elena - SamGuard ✓ complete (Ignore List). Elena - WordPress SamGuard ✓ complete (clean).

---

## Matrix — 05:10 (+07:00)

**Active rooms: 31 / 148 | Messages: 561** *(since 2026-09-25 05:00)*
Full details: reports/2026-09-28/matrix-rooms-0510.md

### ⚠️ Action items for DuongDN (~~9~~ → 1 open after reply check 08:30)

| Room | Time | Message |
|------|------|---------|
| (unnamed room) | 08:43 | anhnvn: "Bên ông Philips và ông Ronan của Bamboozle đều chưa thấy action khi mình request review Clutch. Chắc a Dương xã giao hỏi thăm lại 2 bên đó ah" — ~~needs follow-up~~ ✅ duongdn 10:24 "a remind họ rồi nha" |
| (unnamed room) | 13:26-13:39 | kietnht/anhttl: asking for help navigating a heavy Precognize source checkout (link to github.com/Precognize/development) — ✅ duongdn handled 13:40-13:56 |
| (unnamed room) | 10:27 | anhttl: "anh Dương ơi, anh có đang bận gì ko anh, team Elena cần anh support review lại est" — ✅ duongdn joined review (Nova room), est message sent to customer 21:36 |
| BDD - Delivery | 15:19 | chientx: "có update gì bên team chưa a Dương, NA?" — ✅ duongdn replied 15:23 |
| Elena - Digital Plant | 09:07 | anhttl: relay of customer (Michelle) report re: PR #5219 merge upgrade/scan-mode/csv issue — addressed to trinm (not DuongDN); trinm found env-file cause 13:35 ✅ |
| Mindbody Blog Posts | 17:01 (09-25) | chientx: "a Duong Doan, tìm cách chỉnh lại logo cho giống y chang style mấy hình khác luôn giúp e với ah" — ⚠️ open, no reply (Alert #8) |

### Key updates

**Bailey/Paturevision:** Internal team chat only this window (task-log date correction, redmine bug triage, VuTQ Redis/AWS server setup for new server). ~~No customer-facing daily-report-style message from Nick found — see Alert #5.~~ Customer report lives in GGS Slack (present). duongdn/namtv: nothing gone live to invoice yet, customer hasn't paid in a long time, waiting on Joey to test. Push him.

**Fountain (Kunal room):** 391 messages, mostly dev/QC coordination (redmine bug checks, CSV/import fixes) — consistent with the customer-facing Trello alert (#3), team is actively working the backlog.

**NUS Technology (general):** PhucNH resignation checklist announced by cuongnh (16:08 09-27) — HR admin item, deadline in the linked checklist/email.

**Other:**
- Elena - Digital Plant: customer (Michelle) flagged an issue after merging PR #5219 — needs dev follow-up.
- Fountain: Kunal pushes refactors straight to master in his repo ([PR #546](https://github.com/iamksheth/FountainNewUI/pull/546)), breaking our merges.
- OhCleo: minhtv chased LongVV Fri (no OhCleo task in progress while he was on Maddy issues). Compliance-scan + cover-URL went to prod.
- LeNH: 09-24 task log since backfilled (8h). duongdn warned about chronic late logging.
- Various project rooms: routine coordination. Full per-room summary in matrix-rooms-0510.md (rewritten at recheck).

---

## Performance — all 4 projects — 05:40 (+07:00)

| Project | Apdex | Avg response | Error rate | Notes |
|---------|-------|---------------|------------|-------|
| OhCleo (prod) | 0.97 | 123.7ms | 2.4% (1857/75788) — ~89% benign NotAuthenticated/InvalidToken | Healthy. Slowest: CreatorVerificationSubmitView.post 4.07s (1 call), ChatSendView.post 3.43s (25 calls). |
| MPFC | 0.45 | 1380ms | 1.6% (1832/115698) | 🔴 Poor apdex, chronic. `WP_Error::get_method()` fatal 221x (matches Rollbar alerts). `"continue" targeting switch` E_WARNING 1562x. Slowest: author-sitemap.xml 49.3s/2calls, sitemap_index.xml 33.2s/5calls (chronic, unresolved for months). |
| Fountain Gifts | 0.99 | 160ms | ~0% (4/190281) | Healthy. Slowest: admin/order_items/export 1.9M ms avg?!/6calls (likely a long-running async export skewing avg, not a per-request hang), admin/product_catalogs/import_csv 82.3s/2calls, admin/gifts/import_csv 39.3s/10calls. |
| InfinityRoses | 0.99 | 119.7ms | ~0% (17/56560) | Healthy. Slowest: paypals/authorize_order 2.87s/2calls, users/registrations/create 2.0s/4calls. |

~~**Full topErrors / slowestTransactions:** see raw JSON captured this run (`/tmp/nr-*.json`, not persisted — re-run `newrelic-fetch-performance.js` for live detail if needed for follow-up).~~
**Full detail (recheck 08:37, window since 09-25 05:00):**

*OhCleo topErrors:* NotAuthenticated 1715 · InvalidToken 64 · ValidationError username exists 31 · email exists 29 · AuthenticationFailed "User does not exist" 24 · **ValueError "Invalid bcrypt hash format" 19** · AuthenticationFailed "Passwords don't match" 10 · email+username exists 10 · invalid email 8 · no user with email 5.
*OhCleo slowest:* CreatorVerificationSubmitView.post 4072ms/1 · ChatSendView.post 3431ms/25 · CreatorPayoutHistoryView.get 1452ms/4 · CreatorVerificationApproveView.post 1174ms/1 · ValidatePurchaseView.post 1172ms/15.

*MPFC topErrors:* E_WARNING "continue targeting switch" 1564 · **Error WP_Error::get_method() 223** · count() non-countable 21 · mysqli_real_connect no such file 7 · mkdir name too long 4 · mysqli getaddrinfo failed 4 · undefined get_header() 3 · Class MM_Event not found 3 · undefined get_locale() 2 · deprecated media_buttons_context 1.
*MPFC slowest:* author-sitemap.xml 49348ms/2 · sitemap_index.xml 33167ms/5 · **probe paths /opt/mailcow-dockerized/mailcow.conf 27879ms, /s3.key 27278ms, /server/backend/.env 27086ms** (secret-file scanner being served slowly; the same class as the earlier SQLi probes).

*Fountain topErrors:* ArgumentError wrong # args (3 for 2) 2 · No route admin/gifts edit id=nil 1 · Gibbon MailChimp 400 1 · RestClient ReadTimeout 1.
*Fountain slowest:* admin/order_items/export 1,924,438ms/6 · admin/product_catalogs/import_csv 82252ms/2 · admin/gifts/import_csv 39332ms/10 · admin/credit_histories/index 25983ms/2 · admin/promo_codes/index 7077ms/8.

*InfinityRoses topErrors:* ArgumentError wrong # args (3 for 2) 17 · UnknownFormat 9 · BadRequest EOFError 7.
*InfinityRoses slowest:* paypals/authorize_order 2871ms/2 · users/registrations/create 2014ms/5 · payment_intents/create 1855ms/15 · search/search 1472ms/93 · paypals/generate_order 807ms/2.


---

## Upwork Memo — 2026-09-25 — 05:15 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory (LeNH) | ~~Session failed~~ → recheck 08:37: fetch OK, **0 memos** on 09-25. Consistent: LeNH was full-day on James Diamond, 0h on BXR/Rory |
| Aysar (KhanhHH) | ~~Session failed~~ → **0 memos** (KhanhHH on approved leave 25/09) |
| Tokenlite/Marcel | ~~Session failed~~ → **0 memos** (ad-hoc, no hours) |

~~No memo validity determined this run (session failure, not invalid memo)~~ Recheck: 0 invalid memos (0 memos total) — per standing rule, session failure ≠ alert; Rory/Aysar/Marcel Trello gates unaffected by this (their status is set by Slack/Sheets checks above, not memo validity).

---

## OhCleo Slack — 05:18 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 24 | Cover-art review cycle (Celine: "not happy... doesn't have the sensuality I expect"); Tony iterating. ~~Celine: "Please review my last question!" (09-25 12:02) unanswered until unrelated 09-27 17:08 message~~ → Tony's 09-27 17:08 UTC message answers the cover-art question (model comparison + cost); Celine chose flux-2-max and asked for more samples (09-27 17:43 UTC). Celine also posted detailed tagging feedback (09-25 11:10 UTC, moved to Trello). Tony's daily report present 09-25 12:00 UTC. See Alert #4. |
| #events-code | 0 | Dormant, no errors. |

Trello: Ohcleo ⚠️ skipped (Alert #4, reframed: fresh weekend asks, not a 53h neglect).

---

## Arthur / Blair Brown / Colin / Philip — Ignore List — 05:00 (+07:00)

Not actively monitored (paused per 2026-09-09 standing instruction) — auto-completed without running mapped source checks: **Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Colin, Philip** (Elena - SamGuard also on this list, see Elena section above for informational findings gathered anyway).

---

## Reminders — 05:45 (+07:00)

No `--send-reminder` flag passed — print only, no Matrix sends.

- KhanhHH: not in the Piece 9 reminder roster (PhucVT/LeNH/LongVV/TuanNT only) — ~~her 0h finding is reported via Sheets/Trello alerts instead (#1)~~ → 0h was approved leave (recheck), so no reminder is needed.
- PhucVT / LeNH / TuanNT: have hours logged 09-25, no reminder needed.
- LongVV: ad-hoc, never reminded.

---

## Trello — 05:50 (+07:00)

**Check progress card:** 16 items marked ✓ complete this run (John Yi, James Diamond, Rory, Franc, MPFC, Marcel, Elena-SamGuard, Raymond, Neural Contract, Andrew Taraba, Rebecca, Colin, Philip, Arthur, Blair Brown, Elena-WordPress-SamGuard). ~~4 items left ○ incomplete: **Maddy** (full 4-part not finished — Bitbucket PR reply-rate not checked), **Aysar** + **Elliott** (KhanhHH 0h, Alert #1), **Bailey** (missing customer daily report, Alert #5), **Fountain** (unanswered customer comments, Alert #3), **Ohcleo** (unanswered customer question, Alert #4). Card not auto-marked done (6 items still open).~~

**Recheck 08:37 (live Trello, [card](https://trello.com/c/ZOsVVPCf)): 19/22 ✓.** Completed: Aysar, Elliott (KhanhHH approved leave), Bailey (Alert #5 false). Still ○: **Maddy** (Alert #7 — new client prod issue), **Fountain** (Alert #3 — 4 weekend customer comments), **Ohcleo** (Alert #4 — fresh weekend asks). Note: a stale 09-26 "Check progress" card ([nvRgpXaY](https://trello.com/c/nvRgpXaY)) is still open on the board with 22 ○ items. Left untouched.

**Check mail card:** all 6 items ✓ complete. ~~card auto-marked done~~ → it was actually still `dueComplete=false`, so it was marked done at recheck 08:37.

---

## ~~Not run this pass (time-boxed)~~ → all run at recheck 08:37

- ~~Maddy Bitbucket PR reply-rate check~~ → done, see ## Maddy.
- Philip MS Teams check, WhatsApp, Zalo — excluded (Ignore List / default-excluded flags).
- ~~Deep Fountain Trello stuck-card scan~~ → done. Active cards: To-Do 20, Bugs 22, Doing 7, QC Internal 6, QA Backlog 7, In QA 4. Stuck >5d: [Accessibility](https://trello.com/c/g2xsiaYs) 12d Doing, [Stripe InvalidRequestError download_receipt](https://trello.com/c/vQeo1Zh0) 12d Doing, [Work Gallery](https://trello.com/c/0gB5xjxr) 11d Doing, [Update menu](https://trello.com/c/dFWK4pLu) 10d QC, [Internal Digital Proof Generator](https://trello.com/c/ce8n3niB) 24d QC, [Reviews](https://trello.com/c/AdUlQD3t) 6d QC. None in Doing ≥14d.
- Fountain Parts 4/5 (missing from cron) → added in the Fountain section.

## Unresolved Questions

1. Was PhucNH's resignation checklist deadline already communicated/actioned? (see email/Matrix mention 09-25/09-27)
2. Should Elena PR #309 be reviewed/merged despite Elena being on the paused Ignore List — is the pause still intended given active PR/customer traffic in Elena - Digital Plant room?
3. ~~Rory/Aysar/Marcel Upwork sessions all failed — is carrick's session valid?~~ Resolved: the session works at recheck, 0 memos 09-25.
4. Fountain W{n} plan: not posted as of 08:37. Recheck after 09:30.
5. Stale 09-26 Check progress card (nvRgpXaY, 22 ○): archive it, or leave it?
