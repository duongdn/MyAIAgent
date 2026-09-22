# Daily Report — 2026-09-22 (Tuesday)

**Run:** 2026-09-22T05:00:00+07:00 (cron), corrected 08:55 (+07:00) — recheck pass
**Window:** 2026-09-21T08:35:00+07:00 → 2026-09-22T05:00:00+07:00
**Leave plan:** No upcoming approved leaves on record (parse-leave-emails full refresh, 0 added/updated).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | GGS Slack (#maintenance) | Major ongoing incident: Console down, orders not syncing to PrestaShop, duplicate/lost-product orders, Sidekiq crash (external API outage + retry storm). Nick actively responding all day (root-cause + daily reports posted), joey/amy still escalating as of 01:15 (9/22). Not resolved as of window end. |
| 2 | ~~Workstream SSO — login failed 4x, task-log hours unverifiable~~ | ✅ **RESOLVED 08:30 recheck** — single `workstream-login.js` retry succeeded immediately (transient, matches known pattern). All task-log hours fetched; see corrected Sheets/Workstream section. |
| 3 | ~~Baamboozle MPDM (C07SQ4HAUHZ) — no "Today's update" from Carrick~~ | ❌ **NOT AN ALERT (08:40 recheck)** — KhanhHH logged 8h on Radio Data Center and **0h on Baamboozle** 09-21. No Aysar work → no update expected. Aysar item ✓ completed. |
| 4 | Swift Studio Slack (#bxr__app) | jeff asked **Rory** (the client contact, not NUS) to review a message (13:43, 9/21) — still no reply at 08:45. Client-internal ask, not directed at us → Rory item ✓ completed (gate = Carrick activity). |
| 5 | Bizurk Discord (Andrew DM) | animeworld: "are you there?" (02:56, 9/21) — no reply from Andrew/nuscarrick in window. |
| 6 | Elena-SamGuard GitHub | PR #309 ("Implement header and modal components with i18n support") is `CONFLICTING` (merge conflict), no reviews, CodeRabbit last ran 2026-08-11 — stale, needs rebase. (Informational — Elena item is on the paused Ignore List, not gated on this.) |
| 7 | Rick@ inbox (Fountain/Infinity) | Several production (not just staging) error emails: `[FountainGifts] production #328 SystemStackError`, `[InfinityRoses] production #457 ActiveRecord::InvalidForeignKey`, `[FirstProject] production #1109/#1117 TypeError`. Not cross-verified against Rollbar dashboards this run. |

| 8 | Workstream task log (09-21) | **TuanNT 0h and LeNH 0h on Mon 09-21, no leave on file** (direct IMAP search confirms only LeNH's 09-18 remote/sick thread exists, nothing for 09-21). Gates John Yi + Rebecca + Bailey (TuanNT) and James Diamond (LeNH). ⚠️ Reminders **not sent** — no `--send-reminder` flag; see Reminders section for the caveat before sending. |
| 9 | Fountain customer Trello board | **3 kunalsheth comments from 09-18 still unanswered 4 days later**: "Infinity - Order items export" (gift/card missing from export), "Implement Smart Hybrid Product Search", "Fountain - Browse page - Product blurbs" (CSV export has no blurb field). Rick answered other cards on 09-21 but not these. |
| 10 | Maddy Bitbucket (xtreme-web/rms) | **PR #481 "LIFM2-409 feedback" — Madhuraka's Codex findings (2 High + 1 Medium) posted 2026-06-06, still the ONLY comment, zero reply after 3.5 months.** Flagged 09-11 and 09-21; this is the 3rd repeat. Needs direct escalation, not another note. |
| 11 | MPFC New Relic (prod) | **Apdex 0.47 (poor, threshold 0.7)** — 27,945 of 32,515 requests in "tolerating", avg 1442ms. Also 5 transactions >27s (sitemap_index.xml 60.3s, author-sitemap 46.1s) and **SQL-injection probe traffic** hitting `/search/` (PG_SLEEP payloads, 49.6s). Chronic: was 0.48 on 09-21. |
| 12 | GGS #maintenance (Alert #1 follow-up) | Incident **not resolved** — joey's 01:15 instruction ("orders 40157/40152/40164/40170 already redone manually, cancel these when you run the script") is the last message and is still unanswered at 08:45. |

**Today (Tue 9/22):** No leave/WFH on record — all present.

---

## Email — all — 05:10 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 0 | not checked this run |
| carrick@nustechnology.com | 2 | not checked this run |
| nick@nustechnology.com | 0 | not checked this run |
| rick@nustechnology.com | 33 | not checked this run |
| kai@nustechnology.com | 6 | not checked this run |
| ken@nustechnology.com | 80 | not checked this run |
| vuongtrancr@gmail.com | 11 | — |
| dnduongus@gmail.com | 20 | — |
| davidztv19@gmail.com | 1 | — |
| freelancer@mypersonalfootballcoach.com | 5 | — |

- **carrick@:** Slack + Zoho sign-in confirmation codes only, no content alert.
- **rick@:** Mostly Fountain/Infinity **staging** BugSnag/Rollbar noise (chronic, known). A few **production** errors surfaced — see Alert #7.
- **kai@:** JIRA LIFM2-452/428 mentions + Shopify account emails, no action needed beyond normal Xtreme work (see Slack).
- **ken@:** 80 emails, all GitHub PR/commit notifications for `welligence/web` — **not Precognize** as the account's mapped purpose says; appears to be personal GitHub watch noise, no Precognize PR activity seen. Flagging for awareness, not an alert.
- **vuongtrancr@gmail.com:** MPFC signup/welcome emails (from Vuong testing his own membership) + cybersecurity newsletter. No Swish `[HIGH]`/Signal-lost alerts.
- **dnduongus@gmail.com:** personal banking/shopping noise (Vietcombank, Tikop, Shopee, LinkedIn). No security alerts.
- **davidztv19@gmail.com:** Railway login code only (Arthur project — routine).
- **freelancer@mpfc:** Rollbar production errors (`WP_Error::get_method()` — chronic/unresolved for months, `Elementor WP_REST_Controller` new error), New Relic Monday report (Apdex 0.82, 6.19s page load). See Performance piece (not run in full this pass — time-boxed).

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete (no blocking client-facing issue found).

---

## Slack — all — 05:12 (+07:00)

| Workspace | Msgs (window) | Key content |
|-----------|----------------|--------------|
| Baamboozle | 16 | Carrick/Jamie routine support (seat-count/subscription-revoke feature requests filed as GH issues #717/#718), Jamie on partial leave tomorrow (dog surgery) — informational. **MPDM C07SQ4HAUHZ: 0 messages** — see Alert #3. |
| RDC - FM Monitoring | 10 | Tuner access logs (routine), MPX watchdog recovery drill ran cleanly (recovered), Carrick posted July-list status update to team lead. No blockers. |
| Swift Studio | 1 | jeff→Rory unanswered ask — see Alert #4. |
| Xtreme Soft Solutions | 14 | Kai/Madhuraka actively working tickets (452/456/465), OTP exchanges for testing access, ticket 465 moved to Anoma for testing. No blockers, no "daily report" text seen but active engaged conversation — Kai-role WS hours unverifiable (see Alert #2) so report-presence gate skipped this run. |
| SAM GUARD - Mobile | 1 | Routine HubSpot MQL-lead notification only. |
| Global Grazing Services | 39 | See Alert #1 — major incident, Nick's "Today report" posted 17:56 + prior-day report 08:47 (both present). |
| Amazing Meds | 0 | No activity. |
| Generator | 0 | No activity. |
| LegalAtoms | 2 | Raymond posted a release note; Florida test portal outage flagged by talha (integration tests failing) — external 3rd-party outage, not our bug, informational. |
| Equanimity | 39 | Carrick + Komal (xid-technologies) working through a stored-procedure/timezone fix for SGBuildex — tense back-and-forth but resolved by end of thread (carrick fixed +8h TZ defect, switched Sim Lian tenants to UAT). Project dev topic, not an alert. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| SoCal Auto Wraps | — | Dropped 2026-05-11, not tracked. |
| Aigile Dev | 0 | No activity. |
| OhCleo | ~~0 (new) — stale data only~~ **14 (corrected 08:48)** | ❌ cron was wrong. Real activity 09-21: Tony↔Celine scheduled + held a full status meeting (09:04→10:24, Google Meet), Tony asked Celine to review his Trello comment on card #240 (cover-art generation investigation), confirmed a release shipped, Celine added $10 credit. No formatted daily report, but effort clearly non-zero → not an alert. #events-code: 0 msgs. |

Trello: John Yi, Franc, James Diamond, MPFC, Raymond, Marcel, Ohcleo ✓ complete. Aysar, Rory (Swift), Bailey, Elliott, Maddy, Rebecca left ○ (Workstream-gated or unanswered-ask, see Alerts).

---

## Discord — all — 05:14 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 7 | Vinn (dapackage) reported alarm-phone-call + Ceres-tags work tested/merged to staging+prod; James Diamond assigned new review tasks. **Jeff's daily report present** (10:15, 4h logged: map marker show/hide done, marker-click WIP). |
| Bizurk (nuscarrick) | 0 general + 1 DM | Andrew DM unanswered — see Alert #5. |

Trello: James Diamond ✓ complete. Andrew Taraba left ○ (unanswered DM).

---

## Sheets/Workstream — 05:16 (+07:00), corrected 08:35 (recheck)

~~🔴 Workstream SSO login failed after 4 attempts this run... Dev hours are **unverified** this pass.~~
✅ **Corrected 08:30** — one `DISPLAY=:1 node scripts/workstream-login.js` retry succeeded immediately. Real data below (week 2026-09-21, reporting day **Mon 09-21**).

**Per-dev totals, Mon 2026-09-21:**

| Dev | Mon 09-21 | Breakdown | Status |
|-----|-----------|-----------|--------|
| KhanhHH | 8h | radio_data_center 8h | ✅ on target. **0h on Baamboozle** → Aysar silence expected (Alert #3 retracted). 0h Generator → Elliott not gated. |
| LongVV | 0h | — | ✅ not an alert — ad-hoc, no fixed target (rule retired 2026-08-24). Also means **no Kai-role hours → Kai daily-report gate skipped**, correctly. |
| PhucVT | 0h | — | ✅ not an alert — adhoc/external, excluded from WS tracking. |
| **TuanNT** | **0h** | none on any project | 🔴 **ALERT** — 8h/day target, no leave on file. Gates John Yi + Rebecca + Bailey. |
| **LeNH** | **0h** | James Diamond 0h | 🔴 **ALERT** — strict gate (any shortfall). No leave on file. Last entries 09-14→09-17 (8h/day), 0h 09-18 (approved sick day) and 0h 09-21. |
| DuongDN | 1h | marcel 1h | — |
| Others logging Mon | — | LuHX 8h (maddy), ThanhNX 1h (maddy), PhatDLT 4h + HungPN 2.25h + TrinhMTT 2.5h + ViTHT 0.5h (fountain), DatNC 2.5h + TrinhMTT 0.75h (speedventory) | — |

**Workstream review status (all projects, 09-21 week):** `needsReview` empty on every project — no pending charged-hour reviews. Reviewers on file: Fountain = VuTQ + DuongDN (excluded from alerting per rule), James Diamond = PhucVT + LeNH, Franc/RDC = LeNH, Elliott/Generator = HangNTT + LucNT, Colin = LucNT. All other projects have **no reviewer configured → `need_review = false`**.

⚠️ **Caveat worth stating plainly:** Monday 09-21 is broadly under-logged across the team — DatNT, ThinhT, VuTQ, VyNL, ThangN, AnhNH2 and others who logged 8h/day all last week also show 0h for Monday, and ViTHT shows 0.5h vs 8h/day prior. The same script returns complete data for the prior week, so this is not a fetch bug, but it does look like **team-wide logging lag on the first day of the week** rather than 10 people simultaneously not working. TuanNT's and LeNH's 0h are real as of now; treat them as "not yet logged" candidates before treating them as "did not work".

Trello: Aysar ✓, Elliott ✓ completed on this data. John Yi, Rebecca, Bailey, Maddy held — see Trello section.

## Scrin.io — 05:09 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-21):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:07 (+07:00), completed 08:50 (recheck)

**Part 1 — Matrix Plan** (room "Kunal - Fountain"): trinhmtt posted 2 plan updates; final @ 11:29 Mon: **ViTHT 40h, DatNT 32h, ThinhT 20h, VuTQ 8h => QC 25h**. Active dev work all day: PR reviews (FountainNewUI #538, #540), CSV export bugfix cycle, admin export CSV-only clarified (VuTQ). No blockers.

**Part 2 — Task log actuals (Workstream `fountain`, Mon 09-21):** ViTHT 0.5h, HungPN 2.25h, PhatDLT 4h, TrinhMTT 2.5h. DatNT, ThinhT, VuTQ: no entries yet.

**Part 3 — Plan vs Actual (week-to-date, 1 of 5 workdays elapsed):**

| Person | Weekly plan | Logged Mon | Pro-rata Mon (plan/5) | Note |
|--------|-------------|------------|------------------------|------|
| ViTHT | 40h | 0.5h | 8h | under — logging lag likely (8h/day every day last week) |
| DatNT | 32h | 0h | 6.4h | not logged |
| ThinhT | 20h | 0h | 4h | not logged |
| VuTQ | 8h | 0h | 1.6h | small plan; per rule, 0h days normal once weekly plan met |
| QC (PhatDLT + HungPN) | 25h | 6.25h | 5h | ✅ ahead of pro-rata |
| TrinhMTT | — | 2.5h | — | posts the plan, not QC — excluded from QC totals |

Per-dev 0h **alerting** is off for Fountain by standing rule; table shown for visibility. Reviewers VuTQ + DuongDN; Fountain excluded from the `needsReview` alert rule.

**Trello board (Web Development, Rick's account)** — ~~not run this pass~~ ✅ run 08:50:
- Rick actively responding on 09-21 (Analytics implementation plan, GiftDrop sync, Cloudflare/Codex, SEO).
- 🔴 **3 kunalsheth comments from 09-18 still unanswered** (see Alert #9): *Infinity - Order items export* (gift + card missing from export), *Implement Smart Hybrid Product Search*, *Fountain - Browse page - Product blurbs* (CSV export lacks a blurb field).

Trello: Fountain item left ○ — unanswered 4-day-old customer comments.

## Elena — 05:15 (+07:00), WordPress check added 08:52

PR #309 open (`process-digital-plant` → base), `mergeable: CONFLICTING`, 0 reviews, CodeRabbit last ran 2026-08-11 (stale). No new merge activity. Precognize (nusken): no open PRs.

**WordPress SamGuard (samguard.co)** — ~~not run this pass (time-boxed)~~ ✅ run 08:52: **clean** — 0 CSP violations, 0 pageErrors, 0 jsErrors. Only benign analytics/video `ERR_ABORTED` network noise (DoubleClick, GA, LinkedIn px, hero .mp4 aborts). Trello "Elena - WordPress SamGuard" ✓ completed.

Elena-SamGuard (the main item) is on the paused Ignore List — reported informationally only.

## Ignore List — 05:18 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip

---

## Trello — Check progress / Check mail — 05:18, updated 08:55 (recheck)

**Check mail:** all 6 items (DuongDn, Carrick, Rick, Kai, Ken, Nick) ✓ complete.

**Check progress — live state after recheck:**

| Item | State | Basis |
|------|-------|-------|
| John Yi | ○ | TuanNT 0h 09-21, no leave (Alert #8). Amazing Meds Slack: 0 activity (not an alert on its own). |
| Maddy | ○ | Bitbucket PR #481 — 3.5-month-unanswered High-severity client findings (Alert #10). Hours/Slack/JIRA all clean. |
| James Diamond | ✓ | Discord AirAgri: Vinn + Jeff daily reports both present. |
| Rory | ✓ | ~~unanswered ask~~ jeff→Rory is client-internal, not an ask to NUS; Carrick gate clean. |
| Aysar | ✓ | ~~MPDM silence~~ KhanhHH 0h on Baamboozle 09-21 → no update expected. Carrick acknowledged both #testing feature requests. |
| Franc | ✓ | RDC Slack routine, no blockers. |
| Elliott | ✓ | ~~WS-gated~~ KhanhHH 8h total (not 0h); Generator Slack 0 activity. |
| MPFC / Marcel / Raymond / Neural / Ohcleo | ✓ | No blocking issue. Ohcleo re-verified on real (not stale) data. |
| Bailey | ○ | GGS incident unresolved, joey's 01:15 instruction unanswered (Alert #12) + TuanNT 0h. |
| Rebecca | ○ | TuanNT 0h 09-21 (Alert #8). William Bills Slack: 0 activity. |
| Fountain | ○ | 3 unanswered 09-18 customer comments (Alert #9). Parts 1–3 now all run. |
| Andrew Taraba | ○ | animeworld DM "are you there?" (09-21 02:56) still unanswered ~30h. |
| Elena - WordPress SamGuard | ✓ | Site check clean — 0 CSP/JS/page errors. |
| Colin, Elena-SamGuard, Arthur, Blair Brown, Philip | ✓ | Ignore List (paused). |

**Completed this recheck:** Rory, Aysar, Elliott, Elena - WordPress SamGuard.
Card not auto-completed — 6 items remain ○.

---

## Performance / New Relic — 08:45 (+07:00) (was not run in cron pass)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.93 ✅ | 255ms | 2.3% (530/23,470) — 493 are `NotAuthenticated` (benign) | 16.4/min |
| MPFC (prod) | **0.47 🔴 poor** | 1442ms | 4.5% (1,473/32,515) | 22.7/min |

**OhCleo — top errors:** `NotAuthenticated` 493 (benign), `InvalidToken` 16, `AuthenticationFailed: User does not exist!` 9, `ValidationError: email already exists` 5, `No user found with this email` 3, `builtins:ValueError: Invalid bcrypt hash format` 2 (worth a look — malformed stored hash).
**OhCleo — slowest:** `ai_chat:ChatSendView.post` 3847ms (1 call); `bookmarks:GetBookMarkDetailsView.get` 2379ms across **1,517 calls** ← the real throughput drag; `users:CreatorPayoutHistoryView.get` 1586ms; `creator_verification:ApproveView.post` 1003ms; `email_verification:EmailVerificationView.post` 981ms (7 calls).

**MPFC — top errors:** `E_WARNING "continue" targeting switch` 1,389 (PHP 7.3+ deprecation noise, dominates count); `Error: Call to undefined method WP_Error::get_method()` in `class-wp-rest-server.php:1091` 66 (chronic, unresolved for months); `non-numeric value` 4; `count(): Parameter must be an array` 3; `E_COMPILE_ERROR require 'ABSPATHWPINC/blocks/legacy-widget.php'` 2 (broken constant concat — real bug); `mkdir(): File name too long` 2; `mysqli_real_connect (HY000/2002) No such file or directory` 1 (DB socket blip).
**MPFC — slowest:** `sitemap_index.xml` 60.3s; `/search/…PG_SLEEP(15)…--/` **49.6s — an active SQL-injection probe**, and the server spent 50s on it; `author-sitemap.xml` 46.1s; `search/m/feed/rss2/` 34.6s; `home/key-biscayne-soccer-club-gu9elite-dashboard/` 27.9s.
🔴 Two things stand out: Apdex 0.47 is chronic (0.48 on 09-21) and the site is being probed for SQLi on an endpoint that takes 50s to respond — that combination is also a cheap DoS vector.

---

## Upwork Memo — 2026-09-21 — 08:42 (+07:00) (was not run in cron pass)

| Workroom | Memos | Invalid | Details |
|----------|-------|---------|---------|
| Rory (LeNH) | 0 | 0 | No hours logged 09-21 — consistent with LeNH's 0h Workstream day. |
| Aysar (KhanhHH) | 0 | 0 | No hours logged — consistent with KhanhHH on Radio Data Center that day. |
| Tokenlite (Marcel) | 1 | 0 | ✓ "Fix wrong time zone issue for SGBuildIndex" — valid (action + specific object). |

No invalid memos. All workrooms fetched successfully (no session/Cloudflare failure).

---

## Maddy — full 4-part check — 08:44 (+07:00)

1. **Task-log hours (Workstream `maddy`, 09-21):** LuHX 8h, ThanhNX 1h. **LongVV 0h** → ad-hoc, not an alert, and no Kai-role hours → Kai daily-report presence gate correctly skipped.
2. **Slack (Xtreme Soft Solutions):** 14 msgs — Kai/Madhuraka working tickets 452/456/465, OTP exchanges for test access, 465 handed to Anoma for testing. No blockers, no unanswered client ask.
3. **JIRA weekly cross-check:** `maddy-jira-tasklog-check.js --week 2026-09-21` → no JIRA-tagged task-log entries this week yet (week is 1 day old). Nothing over-budget / missing-estimate to report.
4. **Bitbucket `xtreme-web/rms` PR reply-rate:** 7 open PRs. 🔴 **PR #481 "LIFM2-409 feedback"** — Madhuraka's Codex review (**2 High** incl. "refund payouts are still double-posted, so Shopify cle…", + 1 Medium) posted **2026-06-06**, still the only comment on the PR, **no reply in 3.5 months**; PR last touched 09-10. PRs #520/#543/#540/#544 have zero comments (awaiting review); #534 and #509 have only Rovo Dev bot comments.

**Escalation recommended, not another note:** #481 has now been flagged on 09-11, 09-21 and today. See Unresolved Questions.

---

## Reminders — 08:56 (+07:00)

| Dev | Mon 09-21 | Leave? | Action |
|-----|-----------|--------|--------|
| TuanNT | 0h (all projects) | none on file (IMAP direct search) | **needs reminder — NOT SENT** (no `--send-reminder` flag) |
| LeNH | 0h (James Diamond) | none on file for 09-21 | **needs reminder — NOT SENT** (no `--send-reminder` flag) |
| PhucVT | 0h | — | skipped — adhoc/external, excluded |
| LongVV | 0h | — | skipped — ad-hoc, no fixed target |
| KhanhHH | 8h | — | skipped — on target |

⚠️ **Read before sending:** the standing rule is that a verified 0h/no-leave day gets the reminder and auto-completes its gated Trello items. I did not send, for one reason worth your judgment: **~8 other devs who logged 8h/day all last week also show 0h for Monday**, which reads more like team-wide first-day-of-week logging lag than 10 simultaneous no-shows. If you want them sent as-is, say so and I'll send to TuanNT (`!knbJbIKzXRJNGVFQNg:...`) and LeNH (`!OIrgPraJWrcDTnRVLQ:...`) and complete John Yi / Rebecca / Bailey / James Diamond accordingly.

---

## Matrix — 08:29 (+07:00) (cron only fetched the Fountain room; full scan run on recheck)

**Active rooms: 28 / 146 | Messages: 465** *(since 2026-09-21 08:00 +07:00)*
Full details: `reports/2026-09-22/matrix-rooms-0829.md`

### ⚠️ Action items for DuongDN (5 substantive; 12 raw regex hits, 7 were tiennd's repeated Arthur scope edits)

| Room | Time | Message |
|------|------|---------|
| Delivery/Clutch (`!DlcbJDCUZaUivhEXSb`) | 10:18 | anhnvn: "A Dương, việc collect review Clutch với KH, bên a có 2 cái này: 1/ Baamboozle Aysar Khalid DuongDN Khách đồng ý 2/ Elevate365.AI Philip Briggs DuongDN Cus đã đồng ý" — needs your go-ahead to send the review requests. |
| `!GXgpgqfNMQJBtSJNua` | 14:36 | lucnt: "em có dự án nội bộ cần fix bug để kịp deadline, anh cho em xin anh Vũ vài giờ qua fix nha anh. Em có báo anh Năm, ảnh có okay rồi á anh" — **resource request for VuTQ, still unanswered.** |
| `!oGYjbzEfphvvauBZtq` | 14:12 | namtv: "Chờ chút tao gửi thêm info 1 cái khác, mày nhét vào giùm tao luôn. Bỏ tên khách hàng ra, chuyển qua tiếng Anh" — pending doc/anonymisation task from Năm. |
| KhanhHH DM (`!rwLbvLBnrRAYMaOPaD`) | 13:06 | khanhhh: "chiều nay a cho e xin vào trễ tí nha a tầm khoảng 14h. Do laptop e hư nên mượn máy… E sẽ làm bù đủ giờ trong ngày" — late-arrival notice (she did log 8h). |
| Arthur - Meta-Stamp | 12:32–16:21 | tiennd posted/edited next-scope estimate 6×, settling at **52h** (carryover: search_pockets no-auth 2h, promote terms v1.1.0 to prod 1h, EU-Directive reservation-of-rights line…). Arthur item is on the Ignore List; recorded for visibility. |

### Key updates

**NUS - Bailey - Paturevision 2026 — busiest room (94 msgs), and it contradicts a task-log alert:**
- TuanNT (08:42) and VuTQ (08:47) both posted Friday task summaries; **TuanNT was active in-room all day** — his Workstream 0h for Mon 09-21 is unlogged hours, not absence.
- PhucVT onboarded onto the project (08:48, by you) — spent the day on Docker/DB setup; Console Dockerfile fails on Mac ARM, worked through with TuanNT.
- Later (16:54, James - DefinitiveGuide) you pulled PhucVT **off** Bailey ("thấy loay hoay bên Bailey quá, thôi chắc dừng đi") onto James/DefinitiveGuide framework upgrade with LongVV.

**James Diamond - Portfolio — real customer-side security signal:**
- LeNH (17:20) relaying the customer: *"it's not one integration polling, it's three separate API keys actively hitting us right now, continuously"* — keys named `WCS-NETMAP-01` and `PowerBi`, source unknown to us. PhucVT: we only ever created one API key; the other two are unaccounted for. Follow-up was still in progress at 17:30. **Worth tracking to closure — unexplained active API keys against a customer system.**
- LeNH was demonstrably working this room 17:14–17:30 Mon → her Workstream 0h is also a logging gap, not absence.

**Bailey - Management:** Rails upgrade done, RDS upgrade in progress (2 devs). namtv pushing for a per-status payment list with amounts; you noted the client wants bugs fixed before further pay. QC backlog flagged (a batch of "#Internal Tested on staging" PrestaShop items awaiting QC).

**Celine - OhCleo:** LongVV/HungPN/MinhTV working AI transcript-link task; Celine requested a meeting (held — see OhCleo Slack section). Trello itself had an outage ~16:57–17:11.

**Maddy - Extreme Soft Solutions:** you raised that last week had **3 external bugs despite few hours**; LongVV replied in-thread that root cause is mostly the Quote Tool and he'd already explained it to the client. Ties to Alert #10 (PR #481 unanswered).

**Delivery - Resource Arrangement (leave that affects our projects):**
- HaVS off 21/09; TamLH 21/09 (family, Shai covers with PL); ThinhPVD 21/09 (wedding policy); ThoTNT 21/09 PM (military pre-screening).
- 🔴 **DatNT off 24/09 (Wed) — VuTQ covers on Kunal/Fountain.** Relevant to Fountain plan-vs-actual later this week.
- Mobile plan wk 21/09: ThangN 20h James Diamond replacing AnhNH2.

**Project Wrap Up - Preventive Actions:** chientx raised **2 client complaints traced to our side** (Pet Printed / Leo Schaller, TuanTT, submitted 09-18) — rough estimate ~20h later grew, plus a deployment-script omission. namtv's and anhnvn's accounts of the estimate history conflict (20h vs 40–50h); chientx asked for a clean reconciliation. Not one of the daily-report gates, but it is an open quality/comms issue with your name adjacent.

**Elena - Active Alerts:** estimate round in progress (BE review by KietNHT), question-list meeting held 16:00, aim to send estimate to customer today (09-22). Test-server shortage flagged (only mobile-test-01 busy / -03 broken / demo-3 faulty) — may need raising to Kfir.

**Other:** James - DefinitiveGuide → framework + PHP upgrade starting, LongVV + PhucVT, repo/DB handed over. Sandor Antal - Lyf: LSA-1514 assigned to LongVV (starts today). Recruitment: BDM 2nd-round reference check requested. NUS Technology: social/admin only.

---

## ~~Not run this pass (time-boxed — recheck required)~~ → all cleared on the 08:25–09:00 recheck

| Piece | Status now |
|-------|-----------|
| Piece 10 Matrix (all rooms) | ✅ run — 28 active rooms, 465 msgs (section above) |
| Piece 12 OhCleo Slack | ✅ re-run — cron's "stale/0 new" was wrong, 14 real messages |
| Piece 13 Arthur full 6-source | ⏭️ skipped — Arthur is on the paused Ignore List; Matrix scope update captured above |
| Piece 14 Performance (both) | ✅ run — MPFC Apdex 0.47 = Alert #11 |
| Piece 15 Upwork Memo | ✅ run — 0 invalid memos |
| Piece 9 Reminders | ✅ computed — TuanNT + LeNH 0h, not sent (see Reminders section) |
| Elena WordPress CSP | ✅ run — clean |
| Fountain Parts 2/3 + Trello board | ✅ run — 3 unanswered customer comments = Alert #9 |
| Maddy full 4-part | ✅ run — PR #481 = Alert #10 |
| Workstream login | ✅ retried, succeeded first attempt |

## Unresolved Questions

1. **Send the 0h reminders?** TuanNT and LeNH both logged 0h on Mon 09-21 with no leave, but Matrix shows both were demonstrably working that day — so this is a task-log hygiene gap, not absence, and ~8 other devs show the same Monday gap. Say the word and I'll send (and complete John Yi / Rebecca / Bailey).
2. **Bitbucket PR #481** — 2 High + 1 Medium client findings unanswered since 2026-06-06, now flagged for the 3rd time. Do you want this escalated directly to Kai/LongVV rather than re-noted next run?
3. **James Diamond: two unexplained API keys** (`WCS-NETMAP-01`, `PowerBi`) actively hitting the customer's system — PhucVT confirmed we only created one. Who owns closing this out?
4. **MPFC** — Apdex 0.47 chronic + SQLi probes served at ~50s on `/search/`. Worth a dedicated fix session (rate-limit + sitemap caching), or leave as-is?
5. **GGS incident** — joey's 01:15 order-cancellation instruction still unanswered; is Nick on it this morning?
6. ken@nustechnology.com is watching `welligence/web` GitHub, not Precognize — wrong subscription, or expected? *(carried from cron run, still unanswered)*
7. Workstream SSO failed 4× in cron and succeeded first try on recheck — recurring transient, root cause still open. *(carried)*
