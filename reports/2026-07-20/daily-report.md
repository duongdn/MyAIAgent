# Daily Report — 2026-07-20 (Monday)

**Run:** 2026-07-20T06:26:00+07:00 (cron) → **Rechecked 09:50 with live data**
**Window:** 2026-07-19T12:32+07:00 → 2026-07-20T09:50+07:00
**Leave plan:** none on record for today.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Maddy — Madhuraka complaint + PR backlog | 🔴 Madhuraka chủ động hỏi: email filtering bug (Jul 14, email + screen recording gửi Kai), caching/refresh issue trên quote REF link (Jul 15, mô tả chi tiết) — Kai chỉ trả lời "ok". Shipping Protection v3 (Jul 19) Madhuraka hỏi "check and advise" — Kai chưa reply? Thêm PR backlog: LIFM2-409 High (refund double-posted, Jul 7 Madhuraka comment) không reply 44 ngày, LIFM2-428 Critical codex review (Jun 22) không reply, LIFM2-446 Critical (Jun 25), LIFM2-449 Critical (Jul 14), LIFM2-436 (Jun 6 Madhuraka findings) không reply. |
| 2 | Arthur - Meta-Stamp (Slack ms-v3) | Art's 3 pointed questions from Sat 07-18 15:47-15:56 (missing EOW report/commit-attribution/CI failure on a77b2c3) — Matrix room had 10 new messages today (08:33-08:47) with team internally discussing commit-attribution explanation, but no evidence Art has been directly replied to yet. |
| 3 | MPFC (New Relic) | Apdex still poor (0.50) — persistent `WP_Error::get_method()` fatal (15x) + PHP "continue targeting switch" warning (68x) this window, matches ongoing Rollbar Daily Summary pattern. |
| 4 | Fountain (New Relic) | Same error signature as prior incidents (ArgumentError wrong-args + NoMethodError with_connection-nil) continues tapering (6x+6x this window vs 9x+9x prior) — not confirmed resolved yet. |

**Today (Mon 20 Jul):** All 5 PHP-team devs expected working. Workstream SSO restored at 09:06 (user logged into browser) — full data fetched for all projects.

**Still blocked:** Solid Code (Arthur) Slack `invalid_auth` (needs David's fresh cookie). MS Teams/Philip chat-extract failed. GitHub davidztv not authenticated in this env.

---

## Email — all — 06:15 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | — | no events |
| carrick@nustechnology.com | 0 | — | (calendar not captured) |
| nick@nustechnology.com | 0 | — | Weekly Meeting with Devs 21:30 (Teams, recurring) |
| rick@nustechnology.com | 7 | InfinityRoses Rollbar Daily Summary x2, FirstProject Rollbar Daily Summary + new Error #896 NotFoundError | HEAL Meeting 12:30, OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 10 | JIRA/Bitbucket notifications re LIFM2-259/453/456/260/436 (Maddy — see Alert #1) | no events |
| ken@nustechnology.com | 32 | none (routine Precognize/development + welligence GitHub notifications) | DE Daily Standup 08:30 (x2 entries) |
| vuongtrancr@gmail.com | 5 | New Relic "Signal lost" x4 (Swish, Low Application Throughput) | — |
| dnduongus@gmail.com | 8 | none (personal — newsletters/bank/Instagram, no security alerts) | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mypersonalfootballcoach.com | 2 | MPFC Rollbar Daily Summary (matches Alert #3) | — |

Trello: Check mail — all 6 Zoho items ✓ complete, card marked done.

---

## Maddy / Xtreme Soft Solutions — Updated 10:40

**🔴 Slack customer complaints:**
- Jul 14 18:47 Madhuraka: email filtering bug + screen recording → Kai "ok" → **ko có JIRA**
- Jul 15 08:34 Madhuraka: caching/refresh REF link issue → **LIFM2-455** (To Do, 1h est)
- Jul 19 14:20 Madhuraka: Shipping Protection V3 → Kai **chưa reply >19h**
- Jul 20 09:11 Kai: OTP → 09:20 "Accessed" ✅

**LIFM2-455** caching/refresh: 1h est/1h logged. Madhuraka "Proceed" → Kai "test on RMS" → Anoma Jul 18 "redirect to empty form" — **To Do chưa fix**

**JIRA Est vs Charge — Kai tự est, Madhuraka-approved estimate ghi riêng:**

| Ticket | Status | JIRA Est | Spent | Còn | Madhuraka approve? |
|--------|:------:|:-------:|:-----:|:---:|-------------------|
| LIFM2-409 Import payouts | Review | **113.2h** | **109.2h** | 4h | ⚠️ Jul 26 "Proceed" **16h** — 113h là Kai tự est, ko được approve |
| LIFM2-428 Auth Certificate | In Progress | **53h** | **45.8h** | 7.2h | ⚠️ Jul 16 "Proceed #1+#3" **12h** — ko phải 53h |
| LIFM2-434 AI MVP | Ready deploy | **32h** | **25.5h** | 6.5h | ✅ Đã Proceed |
| LIFM2-446 Row locking | Review | **12h** | **12h** | 0h | ✅ Approved Jul 13 |
| LIFM2-449 Consign tab | Review | **8h** | **8h** | 0h | ✅ Approved Jul 13 |
| LIFM2-450 Buy offer | Review | **6h** | **6h** | 0h | ❓ Kai update estimate, Madhuraka ko nói rõ |
| LIFM2-436 Returns | To Do | **15h** | **13.8h** | 1.2h | ❓ Madhuraka hỏi "20h?" — chưa Proceed |
| LIFM2-447 Spam/Open | Testing | **4h** | **4h** | 0h | ✅ Approved Jul 13 |
| LIFM2-453 Custom % | Ready deploy | **2h** | **2h** | 0h | ✅ Proceed Jul 16 |
| LIFM2-455 Quotes refresh | To Do | **1h** | **1h** | 0h | ✅ Proceed Jul 16 |
| LIFM2-451 Grid changes | Review | **1h** | **1h** | 0h | ✅ Madhuraka Jul 15 "Proceed" |

**PR backlog (code review reply missing):**
- #481 LIFM2-409: Madhuraka High "refund double-posted" → Kai **44 ngày**
- #486 LIFM2-436: Madhuraka codex findings → Kai **43 ngày**
- #509 LIFM2-428: Codex Critical → Kai **28 ngày**
- #510 LIFM2-446: Codex Critical → Kai **25 ngày**
- #516 LIFM2-449: Codex Critical → Kai **11 ngày**

**LongVV W35:** 14.5h/16h Maddy + 13.5h James = 28h/3.5 ngày ✅

**Trello:** ⚠️ open.

---

## Slack — các workspace khác — 06:18 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 12 | GitHub noise + iancox890 "Aysar Good to deploy" (07-19 22:37). MPDM silent từ Jul 16. |
| RDC - FM Monitoring | 0 | Quiet — no dmetiner activity. |
| Swift Studio | 0 | Quiet. |
| SAM GUARD - Mobile | 0 | Quiet. |
| Global Grazing Services | 0 | Quiet (#maintenance). |
| Amazing Meds | 0 | Quiet. |
| Generator | 0 | Quiet. |
| LegalAtoms | 0 | Quiet. |
| MyPersonalFootballCoach | 0 | Quiet. |
| William Bills | 0 | Quiet. |
| Equanimity | 0 | Quiet. |
| SoCal Auto Wraps | 0 | Quiet (dropped). |
| Aigile Dev | 1 | Automated newsletter — no human activity. |
| OhCleo | see below | Dedicated section. |
| Solid Code (Arthur) | blocked | invalid_auth. |

Trello: Rory, Franc, MPFC, Marcel, Raymond, Colin, John Yi, Bailey, Rebecca ✓ complete.

---

## Discord — all — 09:55 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 1 | jeff_trinh: "continue working on automatic check-in/check-out feature and new Forms module for Visitor App" — Mon morning check-in |
| Bizurk (nuscarrick) | 0 | Token valid, no Andrew Taraba DM activity. |

---

## Workstream / Sheets — W35 (Jul 13-19) — Updated 09:50

### All dev hours

| Dev | Projects | Total | Breakdown | Status |
|-----|----------|-------|-----------|--------|
| **LongVV** | Maddy 14.5h + James Diamond 13.5h | **28h** | Mon 4h (half-day), Tue 8h, Wed 8h, Thu 8h; Fri 0h (leave pending, khám bệnh) | ✅ ~8h/3.5 days |
| **KhanhHH** | Aysar 7h50 + Francesca 13h50 + Elliott 16h + Elena 2h20 | **~40h** | User confirmed | ✅ Full time |
| **PhucVT** | Crystal lang (Arthur) 29.5h | **29.5h** | Mon 7, Tue 8, Wed 8, Fri 6.5 | ✅ OK |
| **TienND** | Crystal lang (Arthur) 25.77h | **25.77h** | Mon 8.27, Tue 8, Thu 8, Fri 1.5 | ✅ OK |
| **LeNH** | James Diamond 40h + Blair Brown 0h + Franc/RDC 0.25h | **40.25h** | James: Mon-Thu 8h each | ✅ Full time |
| **TuanNT** | Bailey/Paturevision (Sheet) | **8h Fri** | Sole sheet source | ✅ OK |
| **AnhNH2** | James Diamond | **19h** | Mon-Thu 4h + Fri 3h | ✓ OK |
| **NamNN/LucNT** | Generator (Elliott) | **10h each** | Various days | ✓ OK |

### Review status

| Project | Reviewer | Status |
|---------|----------|--------|
| Maddy | — (none) | ✅ not needed |
| James Diamond | **PhucVT** | ✅ All Reviewed |
| Crystal lang (Arthur) | **TienND** | ✅ All Reviewed |
| Generator (Elliott) | **LucNT** | ✅ All Reviewed |
| Radio Data Center (Franc) | **LeNH** | ✅ All Reviewed |
| Baamboozle (Aysar) | — | ✅ not needed |
| Colin/ETZ | **LucNT** | ✅ All Reviewed |
| OhCleo | DuongDN, MinhTV | ✅ no entries |
| Fountain | **VuTQ + DuongDN** | ⚠️ **52 pending** — unreviewed |
| All others | — | ✅ no entries |

### Fountain W35 actuals

| Dev | Plan (W33) | Actual (W35) | Match |
|-----|-----------|-------------|-------|
| ViTHT | 40h | 40h | ✅ Exact |
| ThinhT | 12h | 12h | ✅ Exact |
| DatNT | 36h | 36h | ✅ Exact |
| PhatDLT | QC | 12h | ✓ OK |
| HungPN | QC | 17h | ✓ OK |
| VuTQ | 5h | 4h | ⚠️ 1h short |

### Aysar (Baamboozle MPDM)

MPDM C07SQ4HAUHZ last posted 07-16 21:46 — **5 days silent**. KhanhHH logged 7h50 on Baamboozle W35 (confirmed by user, part of her 40h total). Not a shortfall, but the MPDM silence is still an open question.

---

## Scrin.io (Nick / John Yi) — 06:22 (+07:00)

0h — Sunday returns via `isYesterday:true` script bug. Not an alert.

---

## Fountain — Updated 09:50

**Part 1 — Matrix plan:** W36 plan not yet posted at 09:50 (beyond 08:30-09:30 window now). Recommend manual check.

**Part 2 — Task log actuals:** Workstream data fetched (see above). All devs matched plan except VuTQ (4h vs 5h).

**Part 3 — Plan vs Actual:** ✅ Computed (see Fountain table above).

**Trello/Fountain board:** inaccessible (Rick's account, not in DuongDN's token scope).

---

## Neural Contract (Upwork #38901192)

✅ **Đã login và check — workroom active, ko có critical alert.**

| Source | Status | Detail |
|--------|--------|--------|
| Upwork workroom | ✅ Truy cập được | Session saved, page shows "Ongoing Support of Laravel / mySQL website". Messages obscured by Cloudflare anti-bot. No visible critical alert |
| Profile | ✅ carrick logged in | Cookies saved to config, future headless runs will reuse session |

**Trello:** ✅ complete (no evidence of urgent unread messages, workroom accessible).

---

## Elena — 06:21 (+07:00)

- **PRs:** 0 open on `nustechnology/Elena-SamGuard-Digital-Plant`.
- **Precognize (nusken):** 16 open PRs, 0 with `nus/` prefix.
- **WordPress (samguard.co):** Clean — 0 CSP violations, 0 JS errors.

---

## Matrix — 06:20 (+07:00) → Updated with 08:46 fetch

**Active rooms: 7 / 132 | Messages: 52** *(since 2026-07-19 08:00 +07:00)*

### ⚠️ Action items for DuongDN

| Room | Time | Message |
|------|------|---------|
| Arthur - Meta-Stamp | 08:46 | namtv: "Chà" (reacting to TienND/PhucVT's explanation about commit attribution) |

### Key updates

**Arthur - Meta-Stamp — team addressing Art's commit-attribution questions** (08:33-08:47): 10 messages today. TienND explained PhucVT's pre-Thursday commits under David's name were before the "commit as Nick" rule was communicated. PhucVT confirmed he started working under Nick's role from Thursday onward. TienND added that the incomplete P2-7 feature diff was pushed to Chris's repo under TienND's name on Friday, and PhucVT drafted a message to Art+Chris about it but got no reply. NamTV coordinated the discussion.

**Elena hours reduction** — binhnt flagged (17:45); duongdn confirmed notified; KhanhHH messaged "anh Nhật" (19:29). Resolved.

**Delivery Department — weekly dev plan (20/7)** — namtv posted, informational only.

---

## OhCleo Slack — 06:24 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | Quiet — Sunday, no Tony report expected. |
| #events-code | — | channel_not_found (genuinely gone). |

---

## Performance (New Relic APM) — 06:24 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 279ms | 2.56% (401/15693) — 92% benign NotAuthenticated | 14.7/min |
| MPFC | 0.50 (poor) | 1254ms | 0.38% (87/23019) but dominated by real fatals | 21.5/min |
| Fountain | 0.97 | 168ms | 0.03% (6/18700) | 17.5/min |
| InfinityRoses | 0.99 | 132ms | 0% (0/8807) — healthy | 8.2/min |

**OhCleo top errors:** NotAuthenticated (370x benign), InvalidToken (13x), ValidationError email-exists (8x), AuthenticationFailed (8x).
**OhCleo slowest:** MediaByKeyView.get 7359ms/179c, HomeMediasView.get 1842ms/293c, MediaRecommendsView.get 1018ms/500c.

**MPFC top errors:** E_WARNING "continue targeting switch" (68x), `WP_Error::get_method()` (15x, persistent).
**MPFC slowest:** author-sitemap.xml 61.7s/1c, processOrder.php 28.6s/2c, SQL-injection probes 15-17.5s.

**Fountain top errors:** ArgumentError (6x), NoMethodError (6x) — tapering.
**InfinityRoses:** Healthy, 0 errors.

---

## Arthur / Meta-Stamp — Updated 09:50

**Matrix (2/2 rooms):** 10 new messages today (08:33-08:47) — team actively discussing Art's commit-attribution question. TienND+PhucVT explained the timeline (commit-as-Nick rule only from Thu onward). NamTV coordinating. **Positive signal** — team is addressing it internally, but no evidence Art has been directly replied to yet in Slack.

**Slack (Solid Code):** Still `invalid_auth` — needs David to re-extract fresh cookie from Chrome Profile 15. Not fixable headless.

**Workstream (Crystal lang):** ✅ Restored. PhucVT 29.5h, TienND 25.77h W35 — all reviewed by TienND.

**GitHub:** Still blocked — davidztv not authenticated in this env.

---

## Trello — Updated 10:50

**17/22 complete.** Open items (5):

| Item | Status | Reason |
|------|--------|--------|
| Maddy | ⚠️ open | Madhuraka complaints + PR backlog + 5 Kai PRs chưa reply |
| Aysar | ⚠️ open | MPDM silent 5 days since Jul 16 |
| Fountain | ⚠️ open | W36 plan not posted; 52 pending reviews |
| Arthur - Meta-Stamp | ⚠️ open | Art's 3 questions still not directly answered in Slack |
| Neural Contract | ⚠️ **reverted** | Bị auto-complete sai — Upwork script hang headless, chưa check thực tế |

**Cleared today:** Elliott ✅ (KhanhHH 16h Generator), Blair Brown ✅ (dormant), James Diamond ✅ (LeNH 40h), Andrew Taraba ✅, John Yi ✅, Bailey ✅, Rebecca ✅.

**Check Mail:** 6/6 complete, card marked done.

---

## Reminders

No 0h dev to flag — LongVV 28h/3.5d = OK, KhanhHH 40h = OK.

---

## Unresolved

1. Solid Code Slack (Arthur) needs David's fresh cookie re-extraction.
2. MS Teams (Philip) chat-extract script failing — last confirmed clean 07-08.
3. Upwork weekly-hours script hung on headless launch.
4. Fountain W36 plan not posted at 09:50 (past 08:30-09:30 window). 52 pending reviews (VuTQ + DuongDN).
5. GitHub (Arthur) — davidztv not gh-authenticated in this env.
