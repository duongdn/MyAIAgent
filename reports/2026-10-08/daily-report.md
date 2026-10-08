# Daily Report — 2026-10-08 (Thursday)

**Run:** 2026-10-08T05:00:00+07:00 (cron), corrected 08:55 (+07:00) (local recheck)
**Window:** 2026-10-07T08:45:00+07:00 → 2026-10-08 05:30 (+07:00)
**Leave plan:** No approved leave on record (parse-leave-emails refreshed 05:00, re-refreshed 08:42: no new requests; LongVV 10-06 half-day pending). From Matrix: DaiDV off 10-09, ThamTTH off 10-14 to 10-16. TrinhMTT appeared to be off on 10-07 (per halt).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Performance (MPFC) | **Apdex 0.01** (worse than 0.16 on 10-07 and 0.04 at the 08:40 recheck). Avg response 4.35s; 25,744 of 26,086 requests were "frustrated". **New: `Allowed memory size of 1073741824 bytes exhausted` ×2.** Also `mysqli_real_connect` socket missing ×2, `continue` E_WARNING ×986, WP_Error::get_method ×28. Ordinary page URLs (collections, user-video) took 15–17 min each. The site looks badly degraded, not just hit by scanners. Run `/me:mpfc-monitor` or check the server. |
| 2 | Performance + Email (Fountain prod) | New Rollbar prod error **#363 NameError `uninitialized constant OrderItemGiftVariantSerializer::GiftVariant`** (×2, 10-07 04:41 UTC). Probably related to the GiftDrop / build-a-box order bug DatNT is investigating. `gifts/build_a_box_gift_variants` is still slow: **25.8s avg over 123 calls**, up from 19.5s. `Redis::CannotConnectError 127.0.0.1:6379` ×2 in prod, and the same on Infinity. Rollbar #362 Stripe `pi_qc_probe` is a QC probe and benign. → Fountain ○ |
| 3 | OhCleo (Celine DM) | Celine has 3 questions still open. 07:56 UTC: "Can you confirm the code clean-up is fully done across the catalogue?" (retired tags/merges) and "Could you paste the Ramblefap definition you drafted?" 11:11 UTC: "Before logging out today, can you let me know status on tagging - whats left to launch / cover - whats left to finish / New design - how far have you come?" Tony replied only about cover cost (08:05 UTC). His daily report (11:54 UTC) lists tasks but doesn't answer these. The earlier asks from 10-06 were answered at 01:50 UTC. Re-fetched 08:45: no Tony reply since 11:54 UTC. → Ohcleo ○ |
| 4 | Matrix PHP Projects (Maddy invoice) | Carried over from 10-07 #14. Maddy's complaint that invoice hours ≠ JIRA hours is still unanswered to the client. You told chientx 17:03 "Nay chưa review kịp invoice Maddy… để mai tiếp". chientx: "mai cung cấp e info sớm, ko ngâm lâu". You posted a partial trace at 23:45. **Due today.** The Slack client questions (Anoma buy-out / Xero payout) were answered by Kai 10-07 12:46–14:16. 08:43: still no reply to the client. namtv 07:20 asked follow-ups in PHP Projects ("Internal task là gì?…", how the client can know hours beyond the invoice). → Maddy ○ |
| 5 | Workstream (TuanNT, LeNH) | ~~**0h on 10-07 as of 05:15** across all 19 WS projects in the script. Same-day logging lag is likely: TuanNT backfilled 10-06 (Speedventory 14h for the week). **But** TuanNT moved to James–DefinitiveGuide on 10-07 (Matrix: setup + register/plans testing all day), and Definitive Guide is **not one of the projects the fetch script covers**, so his hours may exist and just not be visible. LeNH: 16h James Diamond Mon–Tue, 0h on 10-07. Re-check after ~09:00 before any reminder (not sent: no `--send-reminder`). → Bailey ○ (TuanNT), James Diamond ○ (LeNH)~~ **08:50 recheck:** **TuanNT is not 0h.** He logged 8h for his 10-07 work but dated it **10-08**: Definitive Guide 7h ("setup project, check register/plans/stripe") + Speedventory 1h (#101). His 08:42 Matrix "Task hôm qua" post in the Bailey room matches the same #101 task. Logging-date mistake, not absence → **Bailey ✓**. (Definitive Guide now added to the fetch script.) **LeNH:** still 0h on 10-07 at 08:50 (James Diamond 8h/8h on 10-05/06). No leave or remote-work email, no Resource Arrangement note. Re-querying after 09:30 → James Diamond ○ |
| 6 | Wildsoul (Matrix) | chientx 17:08: "Confirm vụ mai mình cần gửi cho KH nha a Dương, nên ráng xử lý những gì đang ở chân anh". The estimate/doc for C and E (class vs appointment, visit history) **must go to the client today, 10-08**. You were still working on it at 23:24. |
| 7 | Workstream needs review | OhCleo: LongVV 10-05 ×3 (8h), 10-06 ×2 (2h), 10-07 ×3 (5h), plus PhuongPVT 10-05 0h, all Pending. Reviewers: **DuongDN, MinhTV**. Crystal lang: PhucVT 10-05 8h + 10-06 6h Pending. Reviewer: **TienND** (Arthur paused, listed for visibility). |
| 8 | Email (ken@) | Still not scanned: Zoho IMAP `AUTHENTICATIONFAILED` (re-tested 08:50; config unchanged since 07-28 commit, so it's not a local clobber). Same as 10-07 #13: the app password was revoked/rotated and a new one is needed. → Ken mail ○ |
| 9 | Email (carrick@) | GitLab definitive-guide pipelines still failing (cp1-laravel10, cp1-staging-fixes; 10-07 04:01–04:22 UTC). Compute minutes are still exhausted (10-07 #12), and this now blocks TuanNT/PhucVT's upgrade testing. |
| 10 | Email (vuongtrancr@) | Swish New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" ×8 (10-07 08:05–21:08 UTC). Recurring, and more frequent than 10-06 (×2). |

**Today (Thu Oct 8):** No approved leave on record. All present.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@... | 0 | — | no events |
| carrick@... | 15 | #9 GitLab pipelines failing (11×). Rory forwarded "BXR App - Sweat" bug to Jeff (09:49 UTC; create ClickUp bug task). BXR Catch-Up invite (held 15:05). Stripe verification link. | no events |
| nick@... | 1 (Jam newsletter) | — | no events |
| rick@... | 17 | #2 Rollbar prod #363 NameError (#362 = QC probe). Infinity staging Redis, FountainStaging BugSnag ×5 (staging), FirstProject prod #903 ChunkLoadError. Gert C. via Upwork message. | OmniGPT Daily Sync 10:30, HEAL Meeting 11:00 + 12:30 |
| kai@... | 4 | Anoma "Testing ok" on LIFM2-464 and LIFM2-409. Madhuraka answered Kai on LIFM2-469 (total order value) and LIFM2-466 (follow-up email sent). | no events |
| ken@... | — | #8 not scanned (IMAP auth rejected) | calendar unavailable |
| vuongtrancr@gmail.com | 10 | #10 Swish signal lost ×8. Google Search Console indexing notice. | — |
| dnduongus@gmail.com | 22 | none (banks/fund statements/newsletters/LinkedIn) | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mpfc | 3 | MPFC Rollbar daily summary (2 existing, 0 new), TestFlight 4.3.22 build, ChatGPT promo | — |

Trello: DuongDn, Carrick, Rick, Kai, Nick ✓ complete. Ken ○ (#8).

---

## Slack — all 14 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 6 | Ronan: "Thank you for all your great work - 5 stars", and Carrick thanked him. Carrick deployed the updated message to Nusdev for skjamie25. **MPDM `C07SQ4HAUHZ` "Some reports today" posted 21:18** (Dark mode #705 navy styling). KhanhHH logged 1.5h on Baamboozle 10-07, so the report was expected and is present. |
| RDC - FM Monitoring | 3 (+bot logs) | Tuner Instability Alert ×2 at 13:59/14:01, Recovery 14:05. No dmetiner ask. |
| Swift Studio | 5 | BXR call scheduled for 15:00 VN (Rory's 10-06 time question resolved). Henry will estimate the reskin from Figma and asked Rory to invite Ando. Jeff pinged Rory in #bxr_webdev 15:22. MinhTV (Matrix): Rory now wants ClickUp + Upwork time tracking for all tasks. |
| Xtreme Soft Solutions | 26 | Kai answered all of Anoma's buy-out/Xero payout questions (12:46–14:16) and fixed the Shopify config; Anoma "ok" 14:44. No open client ask in Slack. Kai daily-report gate n/a (LongVV 0h Maddy on 10-07). |
| SAM GUARD - Mobile | 2 | HubSpot MQL bot only. |
| Global Grazing Services (Bailey) | 5 | **Nick's daily report present** (#général 17:21, Advanced Split Order bugs 101). Amy: CR2 Desktop view estimate = 79h; Upwork fee alternatives explained. Joey 18:06: will release Filters ($555) without testing yet, and plans to test next week. |
| Amazing Meds | — | invalid_auth. Cancelled (Ignore List), not refreshed. |
| Generator | 0 | No activity. |
| LegalAtoms | 14 | Alpha doc generation down (issue #22078). Raymond: workers busy from backfill, spun up more, "fixed now" 23:12. Yakima PD follow-up handled by Raymond/Matias. No direct ask to Nick. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | Paused (Ignore List). |
| Equanimity | 9 | Carrick resent the failed SGBuildIndex records (komal confirmed 11:21) and prepared the 26 Sep–05 Oct payload ("I did" 20:22). Marcel 03:33: "Will be done tomorrow yes". Yesterday's #7 is resolved. |
| SoCal Auto Wraps | 0 | Dropped. |
| Aigile Dev | 0 | Colin paused. |

Trello: Rory, Aysar, Franc, Elliott, MPFC, Raymond, Marcel ✓. Maddy ⚠️ skipped (#4).

---

## Discord — airagri + bizurk — 05:06 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 11 | **Vinn daily report present** (Contractor Sign-In/Induction flow review, PRs #744–#758 review, deploy to staging). **Jeff daily report present** (4h: FCM push + notification-tap flow; TestFlight build for Mental Health Check offline). dapackage: Ceres PR #758, and asked about Damien's API access to Kinetic sensors (Vinn answered). No blocker. |
| Bizurk (nuscarrick) | 0 | No messages or Andrew DMs. |

Trello: Andrew Taraba ✓. James Diamond ○ (Vinn OK, but LeNH 0h on 10-07 is not yet verified, #5).

---

## Sheets/Workstream — all devs — 05:15 (+07:00)

Reporting day: **2026-10-07 (Wed)**. Fetched at 05:15, so same-day logging may be incomplete. Token refreshed via Keycloak API.

| Developer | 2026-10-07 hours (all WS projects) | Status |
|-----------|-------|--------|
| LongVV | 5h (OhCleo) + 0.5h (Definitive Guide, "Support TuanNT") | Ad-hoc, informational |
| KhanhHH | 8h (RDC 6.5h + Baamboozle 1.5h) | OK |
| TuanNT | ~~0h on all 19 scanned projects. He worked on James–DefinitiveGuide all day per Matrix, and that project is not in the script~~ **8h, misdated 10-08:** Definitive Guide 7h + Speedventory 1h (08:50 raw rows) | ~~🔴 #5, unverified, re-check~~ ✓ worked, wrong date |
| LeNH | 0h (James Diamond: 8h on 10-05 and 8h on 10-06). Still 0h at 08:50 | 🔴 #5, re-query after 09:30 |
| PhucVT | 0h (Arthur $81 addendum + DefinitiveGuide CP1 deploy per Matrix). Week: Crystal lang 14h, Definitive Guide 2h on 10-06 | Not gated |
| AnhNH2 | 4h (James Diamond) | informational |
| VyNL | 7.75h (Speedventory) | informational |
| DuongDN | 0.17h (Tokenlite) | — |

**Workstream project rows (excl. Fountain):**

| Project | Dev hours 10-07 | Reviewer(s) | Reviewer's charged hours | Review status |
|---------|------------------|-------------|------------|----------------|
| Maddy (Xtreme) | — (week: LuHX 1h, LongVV 1h) | — | — | need_review=false |
| James Diamond | AnhNH2 4h | PhucVT, LeNH | LeNH 0h on 10-07 (16h wk) | none pending |
| Baamboozle (Aysar) | KhanhHH 1.5h | — | — | need_review=false |
| Generator (Elliott) | — | HangNTT, LucNT | 0h | none pending |
| Colin/ETZ | — | LucNT | 0h | none pending (paused) |
| Radio Data Center (Franc) | KhanhHH 6.5h | LeNH | 0h | none pending |
| BXR App (Rory) | — (week: KhanhHH 2.17h, KhoaTD 2h, TuanTT 1h) | — | — | need_review=false |
| Speedventory (Bailey) | VyNL 7.75h | — | — | need_review=false |
| Tokenlite (Marcel) | DuongDN 0.17h | — | — | need_review=false |
| Crystal lang (Arthur) | — | TienND | 0h | **Pending** (PhucVT 10-05 8h, 10-06 6h), #7 |
| OhCleo | LongVV 5h | DuongDN, MinhTV | 0h | **Pending** (LongVV 10-05/06/07), #7 |
| Family App | — (week: LuHX 3h) | — | — | need_review=false |
| Definitive Guide (added 08:50) | LongVV 0.5h (TuanNT 7h dated 10-08) | — | — | need_review=false |

Trello: Aysar, Elliott ✓. ~~Bailey ○~~ Bailey ✓ 08:52. James Diamond ○ (#5).

---

## Maddy — W41 — 05:20 (+07:00)

1. **Task log:** LongVV 0h on Maddy 10-07 (1h this week). Ad-hoc, informational.
2. **Slack:** All of Anoma's open questions from 10-06 were answered by Kai (buy-out payout flow, Xero batch retry, Shopify config). No unanswered client ask.
3. **JIRA (LIFM2):** LIFM2-464 and LIFM2-409 "Testing ok" by Anoma. LIFM2-409 est 113.25h / spent 111.25h. LIFM2-459 Ready to deploy (est 1.5 / spent 2.0, 🔴 over 0.5h). LIFM2-466/469 To Do (no estimate). LIFM2-468 Testing (no est/log; LongVV said he missed logging 1h, but you told him not to backfill while the invoice explanation is in progress).
4. **Bitbucket (`xtreme-web/rms`, 7 open PRs):** No updates since 10-06 (#540). #481 (waiting on customer), #549, #548, #544, #534, #509 unchanged.
5. **Invoice reconciliation (Matrix):** LongVV listed the Slack-only investigation hours (draft Shopify items, quoting tool). The quoting-tool bug doc is [here](https://docs.google.com/document/d/1QzmeIuJUxID1rS3ktFyEjX02zpWcHBNeP8gXl89e9-0/edit). You still owe chientx/Maddy an answer today → #4. Analysis: [maddy-invoice-reconciliation.md](../2026-10-07/maddy-invoice-reconciliation.md).

Trello: Maddy ⚠️ skipped (#4).

---

## Fountain — 05:22 (+07:00)

**Part 1 — Matrix Plan:** trinhmtt 2026-10-05 09:49: "ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h". No new plan this week.

**Part 2 — Task Log Actuals (Workstream, Mon–Wed):** DatNT 24h (8 on 10-07). ThinhT 12h (4). ViTHT 4h (1). VuTQ 6h (0). QC: PhatDLT 8h (2) + HungPN 8.75h (4) = 16.75h. TrinhMTT 5.5h (not QC, excluded).

**Part 3 — Plan vs Actual (3 of 5 days, 60%):**

| Dev | Plan | Actual | Expected at 60% | Pace |
|-----|------|--------|------|------|
| DatNT | 40h | 24h | 24h | on pace |
| ThinhT | 20h | 12h | 12h | on pace |
| ViTHT | 40h | 4h | 24h | 🔴 well behind (refactoring recipient-address/GiftDrop bug) |
| QC (PhatDLT+HungPN) | 25h | 16.75h | 15h | on pace |

**Part 4 — Capacity & Runway** (Est vs Charged, 106 rows): narrow **229.0h** (28 tasks), broad **328.5h** (63 tasks). Unchanged from 10-07.

**Part 5 — Over-estimate:** **36 rows** over 120% (down from 37). Top: #2627 0.5→8.25h (+1550%, Has Bug on Live), #2615 12→106.75h (+790%), #2639 2→16.5h (+725%), #2630 0.5→3.75h, #2545 1→7.5h, #2613 2→14.5h.

**Trello board (comments since 10-06):** 10-07 #1 (GiftDrop) → rick570 "ok. Let me check it" 03:45 UTC. DatNT confirmed in Matrix that it's a real app bug ("khong phải do khách không biết xài mà do app lỗi thiệt"). 10-07 #2 (Mailtrap) resolved: set up 04:09 UTC. Kunal 02:49 asked to push Reviews + Engraving live. Rick deployed Reviews PR #554 to Beta and asked whether to go Live. ViTHT is holding Engraving until Kunal replies to the BE feedback. Matrix: Gift-of-Choice on ShipStation shows only "Gift A Choice" on **live** (ViTHT 16:36), and pay-later/pay-now gift info fixes are on BETA waiting for QC.

Trello: Fountain ⚠️ skipped (#2).

---

## OhCleo Slack — 05:08 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 6 | Tony 01:50 UTC answered the 10-06 asks (launch re-tagging now, covers with the new design). Celine 07:56–07:58 UTC: AI should handle subjective tags too; cover cost too high, expected $300–500. Tony 08:05 UTC: cost breakdown and a plan to get back to $350–500. **Celine 07:56 + 11:11 UTC questions unanswered** → #3 |
| #events-code | — | `channel_not_found` (chronic, bot removed from channel) |

Tony daily report: **present** 11:54 UTC (18:54 VN): re-tagging feedback, cover-cost optimization, SEO audit dev done. LongVV 5h on OhCleo 10-07.

Trello: Ohcleo ⚠️ skipped (#3).

---

## Elena - WordPress SamGuard — 05:16 (+07:00)

`https://www.samguard.co/`: status 200, 0 JS errors, 0 page errors, 0 CSP violations, 8 benign analytics `failedRequests`. Clean.

Trello: Elena - WordPress SamGuard ✓.

---

## Matrix — 05:02 (+07:00)

**Active rooms: 23 / 150 | Messages: 730** *(since 2026-10-07 08:45)*
Full details: reports/2026-10-08/matrix-rooms-0502.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Potential - Wildsoul Wellness | 17:08 | chientx: "Giờ nhiệm vụ đang ở a Dương phải ko? Confirm vụ mai mình cần gửi cho KH nha a Dương, nên ráng xử lý những gì đang ở chân anh cho sớm để NA còn update lại nữa". You replied "OK e, tối tiếp tục" and posted class/visit-history findings at 22:33–23:24. **Send to the client today** ⚠️ |
| PHP Projects (Maddy) | 17:10 | chientx: "ok a, mai cung cấp e info sớm, ko ngâm lâu trả lời ổng được". Invoice explanation owed today ⚠️ |

(The other flagged items, Lyf admin PR and Wildsoul offline/WBS questions, were answered by you the same day.)

**08:43 delta (05:00→08:43, 14 msgs / 7 rooms, [matrix-rooms-0843.md](matrix-rooms-0843.md)):** Wildsoul: namtv challenges the visit-history mapping ("history ở đây là họ xem trên Mindbody… ko cook kiểu mapping như Latecancel = No Show được"). You replied 08:17; still being settled before today's send. PHP Projects: namtv 07:20 follow-up on the Maddy invoice (#4). Bailey: TuanNT posted his 10-07 task summary 08:42. Direct Manager: chientx asks everyone to re-check customer replies and submit a status update. Lyf: minhtv asked LongVV for today's status. Elena OP: license view history done (tuanntg).

### Key updates

**Wildsoul (pre-sales):** Ongoing-cost doc sent with hosting options (namtv). Mindbody per-booking fees noted ($1.30/class, $2.50/appointment). Review meeting found WBS gaps (dynamic pricing, off-peak, push pass updates, report data source → CSV export only). Must be sent 10-08.

**Maddy invoice:** Kai's WS vs JIRA gap is being traced task by task. LongVV has a quoting-tool bug-cause doc. Don't backfill JIRA while explaining it to the client.

**Bailey/Paturevision:** TuanNT is idle while the CR is pending approval and has moved to James-DefinitiveGuide. Debate between datnc/vynl and TuanNT over whether bug 81313 belongs to the CR. Joey still thinks Upwork fees are too high (namtv: we've raised it many times). Filters $555 release promised.

**James - DefinitiveGuide:** CP1 deployed to staging-upgrade (PhucVT). TuanNT is setting up and testing register/plans. Blocked on a Stripe test key and an empty `.env` on staging. You: "setup ko có report nha".

**Fountain:** GiftDrop BAB→GOC bug confirmed as an app bug. Gift-of-Choice ShipStation display wrong on live. Several PRs (#569/#572/#579) went live. Engraving card waiting on Kunal.

**Other:**
- Lyf (Sandor): admin PR approved, dev accounts created, PR #102 dev→main pending client test. Staging-only bug, 1h fix.
- Swift/BXR: Rory wants ClickUp + Upwork time tracking for all tasks. KhanhHH onboarded to ClickUp. HubSpot info still waiting on client.
- Precognize/Elena OP: license upload deployed (OP-13 staging), OP-9 done and pending review.
- Charles-Family (Medehealth): no client info yet. MinhTV asked LuHX to post a status on the thread.
- Arthur: PhucVT doing the $81 Training addendum page, then back to DefinitiveGuide.
- Kunal: August bill payment confirmed by Kunal (halt following up). Marcel $30 bonus reminder done.
- LongVV mentorship: scheduled next week, Friday afternoon.

---

## Performance — 05:28 (+07:00)

Window: since 2026-10-07 05:25 (+07:00).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.99 | 109ms | 2.6% (597/23330), ~94% benign NotAuthenticated/InvalidToken | 16.4/min |
| MPFC | **0.01** 🔴 | 4355ms | 3.9% (1025/26086) | 18.4/min |
| Fountain | 0.98 | 185ms | 0.01% (4/69088) | 48.7/min |
| InfinityRoses | 0.96 | 159ms | 0.3% (65/20385) | 14.4/min |

**OhCleo errors:** NotAuthenticated 541, InvalidToken 18, ValidationError dup username 16 / dup email 2 / invalid email 1 / no user 1, AuthFailed "User does not exist" 11, IntegrityError null user_id app_playhistory 1 (chronic), **redis ConnectionError "Connection closed by server" 1 (new)**.
**OhCleo slow:** ChatSendView.post 4.23s/10, CreatorVerificationApproveView 1.12s/1, ValidatePurchaseView 1.02s/8, CreatorVerificationSubmitView 0.93s/3, EmailVerificationView 0.93s/12.

**MPFC errors:** `continue` E_WARNING 986, WP_Error::get_method() 28, mkdir name too long 3, **memory exhausted (1GB) 2 (new)**, count() non-countable 2, mysqli_real_connect no socket 2, legacy-widget require compile error 1, MM_Event class not found 1.
**MPFC slow:** SQLi `search/…PG_SLEEP` probes ~15–19 min each, `collections/…player-of-the-week` 17.5 min/1, `user-video/barrett-unit2-pass-receive` 15.4 min/1, `user-video/deadball-7-10-need-power` 14.6 min/1 → #1.

**Fountain errors:** ArgumentError wrong # args 4, **NameError OrderItemGiftVariantSerializer::GiftVariant 2 (new, #2)**, Redis CannotConnect 2, NoMethodError nil `[]` 1, Stripe pi_qc_probe 1 (QC probe, benign).
**Fountain slow:** build_a_box_gift_variants **25.8s/123** (#2), admin/promo_codes/index 5.0s/3, paypals/authorize_order 3.2s/2, pro_gift_box_logos/create 2.7s/1, pro_card_artworks/create 2.5s/1.
**Infinity errors:** ArgumentError 65 (up from 4), UnknownFormat 62 (up from 4), Redis CannotConnect 2. **Slow:** search 2.0s/22, registrations/create 1.96s/3, payment_intents/create 1.91s/10, paypals/generate_order 0.89s/1, cart_items/create 0.84s/15. Apdex is healthy, but the ArgumentError count jumped.

Not gated by Trello.

---

## Upwork Memo — 2026-10-07 — 05:25 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | ~~Not verified: Cloudflare challenge not resolved~~ 0 memos on 10-07 (no Rory time that day) ✓ |
| Aysar | ~~Not verified~~ 2 memos, both valid: "Implement approved navy dark mode across remaining pages (#705)", "Fix Bug: Verification error shown when clicking verify link on already verified account #698" ✓ |
| Tokenlite | Not verified (08:55 local re-run also `login_failed`). Ad-hoc, DuongDN 0.17h on 10-07 |

~~Neural Contract (`upwork-neural-check.js`): carrick Chrome Profile 1 gave 0 cookies, and all 4 attempts redirected to login. Same as 10-07: it needs one real login in carrick's Chrome Profile 1, and this headless host can't do that.~~ 08:55 local: carrick's Profile 1 session is alive (69 cookies, `master_refresh_token` → 10-21; slave access token refreshed by opening Upwork in his Chrome). The memo check works with it, but the messages pages (`upwork-neural-check.js` and `upwork-room-messages.js`) still redirect to login, so Neural messages were not read this run. Per the session-failure rule this is not an alert. Neural ✓. Manual re-run from local: `node scripts/upwork-memo-check.js --date=2026-10-07`.

---

## Scrin.io — 05:04 (+07:00)

**Scrin.io (Nick @ John Yi company account, 2026-10-07):** 0h, no sessions recorded. Expected, since John Yi was cancelled 09-28. Not TuanNT evidence.

---

## Ignore List — 05:30 (+07:00)

Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds, Rebecca (William Bills)

---

## Trello — Check progress / Check mail — 05:30 (+07:00)

**Check mail:** 5/6 ✓. Ken ○ (#8).

**Check progress (~~17/22~~ 18/22 at 08:52):**
- ✓ complete: John Yi (ignore), Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena-SamGuard (ignore), Raymond, Neural Contract, Andrew Taraba, Rebecca (ignore), Colin (ignore), Philip (ignore), Arthur (ignore), Blair Brown (ignore), Elena-WordPress-SamGuard, **Bailey (08:52)**.
- ○ incomplete: **Maddy** (#4), **James Diamond** (#5 LeNH), ~~**Bailey** (#5 TuanNT)~~, **Fountain** (#2), **Ohcleo** (#3).

Live card re-fetched after writes. Neither card is marked done.

---

## Not run this pass

- Arthur 6-source check and Elena PRs/deploy/Precognize: paused (Ignore List).
- Philip MS Teams: paused (Ignore List).
- `maddy-jira-tasklog-check.js`: its sheet source is stale (memory). A live JIRA/Bitbucket check was done instead (Maddy section).
- WhatsApp/Zalo: excluded by default.

## Unresolved Questions

1. MPFC apdex 0.01 + 1GB memory exhaustion: is the server overloaded, or is a plugin/cron leaking? It needs `/me:mpfc-monitor` or a server check today (third day degrading).
2. ~~Workstream script doesn't include a James–DefinitiveGuide project. Does one exist on WS (TuanNT/PhucVT/LongVV hours)? If so, add it to `workstream-fetch-project-week.js`.~~ Answered: "Definitive Guide" (`cmqyvioiy00adqo0x9zyt66t2`) exists. Added to the script along with Portfolio (Andrew Taraba), Auction Warehouse and Samguard.
3. ken@ Zoho app password: please provide a new one (2nd day).
4. GitLab compute minutes for Carrick's namespace: buy more or use a self-hosted runner? It now blocks the DefinitiveGuide upgrade testing.
5. ~~Upwork (Rory/Aysar/Tokenlite memos + Neural) needs one real browser login in carrick's/duongdn's Chrome from local.~~ Rory/Aysar are now verified locally. Still open: Tokenlite memo + Neural messages redirect to login even though carrick's session is alive. Is Tokenlite on carrick's account or yours?
6. TuanNT dated his 10-07 work as 10-08. Should he move it to 10-07? It also inflates 10-08.
