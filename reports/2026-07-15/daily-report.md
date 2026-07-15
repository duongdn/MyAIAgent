# Daily Report — 2026-07-15 (Wednesday)

**Run:** 2026-07-15 08:32 (+07:00) (interactive)
**Window:** 2026-07-14 08:50 → 2026-07-15 08:32
**Leave plan:** None on record

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets — KhanhHH | 1.5h Jul 14 (Elena only), well below 8h target, no leave note |
| 2 | Sheets — LeNH | ~~0h~~ **8h** — CORRECTED: Workstream re-scan found 8h (Portfolio - James Diamond). Initial scan had same transient per-project fetch bug as 260706/260707. |
| 3 | Matrix — Risk report | binhnt Maddy risk report (3/7) — DuongDN confirmed "no new info", cus not raising it |
| 4 | Slack — Baamboozle | Site 504 Gateway Timeout at 7AM EST, Jamieson reporting emails coming in — resolved via hotfix |
| 5 | Slack — Baamboozle | skjamie25 asked Carrick to revert game selection screen layout (full-width on mobile) — Carrick responded with padding fix approach |
| 6 | Matrix — Elena SamGuard | anhnvn asked DuongDN to confirm CSP fix approach — DuongDN confirmed, anhttl reported, DuongDN marked fixed |
| 7 | Performance — MPFC | Apdex 0.51 (POOR), avg 1114ms — dominated by vulnerability scanner probes (200+ slow endpoints) |
| 8 | Performance — OhCleo | MediaByKeyView 5.8s avg (233 calls) — persists across multiple runs, real bottleneck |

**Today (Wed Jul 15):** Nick (Arthur) sick — asked Art if urgent, may take day off. All other staff present.

---

## Email — all — 08:32 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 0 | — | no events |
| carrick@nustechnology.com | 6 | 4 Redmine bugs (Generator: Invoice/News/Search/Amount) | no events |
| nick@nustechnology.com | 2 | — | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 26 | FountainStaging ArgumentError, Rollbar error #90, InfinityRoses #436 NoMethodError, Chagil task updates | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 1 (Google data + Anthropic security) | Salesforce MFA enforcement notice, Anthropic new device alert | no events |
| ken@nustechnology.com | — (waiting on scan) | — | 08:30 DE Daily Standup (Teams) |
| vuongtrancr@gmail.com | — | — | — |
| dnduongus@gmail.com | — | — | — |
| davidztv19@gmail.com | 3 | Google security alert (2x), Basecamp notification | — |
| freelancer@mpfc.com | 9 | — (TestFlight builds 4.2.0→4.2.3, Firebase collab, Mindbody update) | — |

**carrick@ highlights:** Pipeline fix, Bug #79769 (Invoice), #79723 (News), #79477 (Invoice Amount), #79705 (Event search) — all Generator. Laravel Forge GitLab source action required.

**rick@ highlights:** FountainStaging ArgumentError on `pro_orders#download_receipt`, Rollbar #90 same cause, InfinityRoses #436 NoMethodError, FirstProject daily summary, Chagil tasks active (payment errors, checkout UI, unverified cards).

**mpfc@:** 4 TestFlight builds pushed (4.2.0→4.2.3), Tien Nguyen added to Firebase MPFC project.

Trello: Check Mail 6/6 ✓ complete — card auto-closed.

---

## Slack — all — 08:33 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 18 | Site 504 resolved (hotfix). Carrick Vietnamese font bold fix deployed. skjamie25 requested revert of game selection screen (full-width mobile cards). Carrick responded with padding fix approach. Snakes&ladders card size issue discussed. Ronan on vacation till Jul 26. |
| RDC - FM Monitoring | 37 | Mostly `user-access-logs` (tuner access). 4 RPI reboot alerts (instability→recovery at 12:00+07). Carrick asked dmetiner "Did you look at my msg?" (unanswered). |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 3 | Kai/Madhuraka DM: email filtering bug reported, caching/refresh issue with REF link at quote email bottom. Kai replied "ok". |
| SAM GUARD - Mobile | 9 | All HubSpot MQL leads (7 new MQLs Jul 14-15). No dev activity/Elena messages. |
| Global Grazing Services | 1 | Amy rejected proposed split-order ID format (would break PrestaShop sync). |
| Amazing Meds | 0 | — |
| Generator | 7 | Carrick reported staging 503 errors → Rudi confirmed nightly scale-down schedule (8PM AU~, scaled up 6AM). MR #546 review requested from Rudi. Violet asked for comment review. |
| LegalAtoms | 0 | — |
| MyPersonalFootball Coach | 10 | Tien271/freelancer: push notification rebuild needed (old technique removed). Firebase token issue — not receiving notifications despite 200 API. Freelancer needs Firebase access. Tien withheld deleting/recreating. |
| William Bills | 0 | — |
| Equanimity | 0 | — |
| Aigile Dev | 2 | Slack 2FA mandatory activation notification (starting Jul 15 10AM +07). |
| OhCleo | 0 | DM:Celine: 0. #events-code: channel_not_found (archived). |
| **Solid Code** | **100+** | See Arthur section below |

---

## Discord — all — 08:32 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 40+ | **Vinn daily report (14:37):** Reviewed PRs #572-579, resolved conflicts, deployed Form Library + admin forms to staging, created testing guide. **James Diamond** active: asked about form style, recurrence features, planner items. Reported H&S icon visibility bug. **Jeff daily report:** 4h — forgot password, contractor location tracking, auto check-in/out (WIP). **dapackage:** Pushing operations/UI overhaul to prod. |
| Bizurk (nuscarrick) | 0 | Andrew Taraba DMs: 0. |

Trello: James Diamond - Vinn ✓ (Vinn active, daily report present).

---

## Scrin.io (Nick / John Yi) — 08:32 (+07:00)

**Scrin.io (TuanNT / John Yi — Jul 14):** 8h02m logged (2 sessions: 08:22-12:34, 13:13-17:03).

Note: Scrin tracks Nick (TuanNT), not TuanNT the developer. 8h logged confirms Nick worked.

---

## Sheets + Workstream — Jul 14 — 08:52 (+07:00)

| Developer | Today | Sources | Status |
|-----------|-------|---------|--------|
| LongVV | 6h | WS Portfolio-James Diamond (6h) | ⚠️ Under 8h, no leave note, but part-time (40h/week) — single-day under is normal unless weekly < 40h |
| PhucVT | 8h | WS Crystal lang (8h) | ✅ OK |
| TuanNT | 16h | Sheet Paturevision (8h) + Elena (8h) | ✅ OK (exceeds target) |
| KhanhHH | 1.5h | Sheet Elena (1.5h) only | 🔴 1.5h well below 8h, no leave. No Workstream hours found (verified ALL 20 projects — 0 rows for KhanhHH). Aysar gate affected. |
| LeNH | ~~0h~~ **8h** | WS Portfolio - James Diamond (8h) | ~~🔴 0h~~ ✅ **CORRECTED:** LeNH logged 8h on James Diamond via Workstream. Initial scan missed it (same transient per-project fetch bug from 260706/260707). Report updated. |

### Workstream needsReview

| Project | Pending rows | Reviewer |
|---------|-------------|----------|
| Portfolio - James Diamond | LongVV: 3 tasks (6h, Jul 14) — KMZ export, sensor assignment, machinery asset list | PhucVT |
| Crystal lang (Arthur) | PhucVT: 8h Jul 14 (Metastamp tasks) + 7h Jul 13 | TienND |
| Fountain | 17 pending rows (DatNT/PhatDLT/HungPN, Jul 13-14) | VuTQ, DuongDN (excluded from alert per rule) |

### Maddy JIRA Cross-check — W15
No ticket entries in week — LongVV hasn't logged any Maddy-specific JIRA entries this week (only James Diamond WS hours logged Jul 14).

---

## Fountain — 08:55 (+07:00)

**Part 1 — Matrix Plan** (08:53, trinhmtt):
> W15 plan: DatNT 40h, ViTHT 40h, ThinhT 12h → QC 23h
> Updated 16:24: DatNT 36h, ViTHT 40h, ThinhT 12h, VuTQ 5h → QC 23.25h
> Updated 16:28: DatNT 36h, ViTHT 40h, ThinhT 12h, VuTQ 4h

**Part 2 — Task Log Actuals (Workstream W15, as of Jul 14):**
| Dev | Planned | Actual (Mon+Tue) | Status |
|-----|---------|-----------------|--------|
| DatNT | 36h | 8h (Mon only) | On track |
| ViTHT | 40h | 1h (Tue only) | ⚠️ Only 1h logged |
| ThinhT | 12h | 8h (4+4) | On track |
| VuTQ | 4h | 0h | Not yet logged this week |
| PhatDLT (QC) | part of 23h | 4h (2+2) | OK |
| HungPN (QC) | part of 23h | 4h (Tue only) | OK |

**Part 3 — Dev activity:** Heavy. DatNT active on Fountain Pro giftdrop link feature (PR #445, going LIVE today). ThinHT upgraded Infinity Beta to Next.js 16. VuTQ reviewing PRs. ViTHT coordinating. HungPN QC active.

**Fountain Trello Board:** 0 new customer comments from kunalsheth/tmmckay (within window).

---

## Elena — 08:56 (+07:00)

**Internal PRs (nustechnology):** 0 open PRs.
**Precognize (nusken):** No nus/ PRs open.

**SamGuard WordPress (samguard.co):** ✅ CLEAN — 0 CSP violations, 0 JS errors, 0 page errors. Failed requests are analytics-only (Google/DoubleClick/LinkedIn blocked by adblock) — not real errors. CSP fix from Jul 14 holding.

**Matrix — Elena rooms:**
- **Elena - Digital Plant** (10 msgs): TienND/AnhTrinh discussing user asset auto-select on new user creation.
- **Elena - Active Alerts** (83 msgs): Heavy dev activity — bulk forward, bulk note, flag/unflag features. KietNHT/AnhTrinh/SamHa/TuanNTG discussing feature behavior. KhanhHH reported fixing 2 issues (AA-57).
- **Elena - SamGuard WordPress** (7 msgs): DuongDN confirmed CSP fix approach, marked done at 17:18. AnhnVN confirmed approach.

---

## Trello — 09:10 (+07:00)

**Check Progress: 22/22 ✅ — Card auto-closed**

**Check Mail: 6/6 ✅ — Card auto-closed**

---

## Reminders — 08:58 (+07:00)

(Print only — no --send-reminder flag)

- **LeNH**: ~~0h~~ **8h** — CORRECTED: has hours on WS. No reminder needed.
- **KhanhHH**: 1.5h Jul 14 — reminder sent (custom message: "chỉ có 1.5h (Elena), update thêm nếu thiếu")

---

## Matrix — 08:33 (+07:00)

**Active rooms: 23 / 132 | Messages: 308** *(since Jul 14 08:00 +07)*
Full details: reports/2026-07-15/matrix-rooms-0833.md

### ⚠️ Action items for DuongDN (3)

| Room | Time | Message |
|------|------|---------|
| Direct Manager | 16:59 | binhnt: confirmation request for customer complain/risk list (DuongDN confirmed at 17:04) ✅ |
| Elena - SamGuard WordPress | 15:54 | anhnvn: "A Dương confirm phát để LA báo họ nha" — DuongDN confirmed at 15:59 ✅ |
| Project Wrap Up - Preventive Actions | 08:32 | binhnt: daily risk list (Maddy complaint/jul 3 still stale) ⚠️ |

### Key updates

**Maddy — LongVV resolved some tasks, 1 remaining** (08:47):
- DuongDN asked why no action on issues → LongVV said several resolved, 1 waiting. Left for further check.

**Arthur — Demo day critical, payout issue unresolved** (09:27-15:58):
- Nick (TienND) recorded demo videos but payout shows "Payout Failed" error — Stripe funds pending till Jul 20. Art trying to work around.
- Nam created snapshot/cleanup scripts, sent Chris live URL + login for Ownership/Provenance modal.
- PhucVT doing snapshot data script + testing. TienND recording support videos per Arthur's request.
- Business room: Nam/Phuc discussing communication issues with Arthur (msg 12:00).
- **⚠️ Nick sick today** (ms-v3 07:36): told Art "not feeling well, if nothing urgent take day off". Art replied wait for Chris's needs, Nam can cover half.

**Elena - Active Alerts — Heavy feature development** (83 msgs):
- Bulk forward, bulk note, bulk add, flag/unflag, audit log all in dev.
- KietNHT/AnhTrinh discussed behavior inconsistencies (forward differs from note differs from status). anhnvn said if too inconsistent, discuss with Lena.
- KhanhHH reassigned to Elliott (Matrix 11:28-11:29, DuongDN approved).
- anhnvn CSP fix confirmed: DuongDN fixed 17:18, charged 1h to Elena task log.
- New branch SR-6925-6926-6932-active-alert-fe working.

**Fountain — Heavy dev push for giftdrop LIVE** (107 msgs):
- Plan posted 08:53 (DatNT 40h/ViTHT 40h/ThinhT 12h).
- DatNT PR #445 (Fountain Pro giftdrop link) — priority for LIVE. VuTQ approved 16:13.
- ThinHT upgraded Infinity Beta to Next.js 16 (16:49).
- ViTHT coordinating giftdrop link email flow (recipient notification on admin approve).
- Updated plan 16:28: DatNT 36h, ViTHT 40h, ThinhT 12h, VuTQ 4h.

**James Diamond — LeNH deployed dynamic forms to staging** (13:32):
- LeNH asking PhucVT about prod deploy process. LongVV guiding LeNH on sensor assignment task.
- DuongDN added LeNH to Redmine per request.

**Delivery — Resource arrangement** (5 msgs):
- ThanhVM off Jul 15-16 (foot blister).
- PhucNH off Jul 17 (rest). DatNT half-day Fri Jul 17 (exam prep, VuTQ covers).
- halt: all leave processed, notes updated.

**PHP Projects — namtv**: Asked if Philip responded. DuongDN: "im re" (still silent).

**OhCleo — LongVV** (08:39): Asked which project. DuongDN said Maddy + James Diamond.

**Technology — namtv** (10:11): AI coding agents usage announcement. Company LLM VPN issue resolved. DuongDN shared Claude Command Guide notion page.

---

## OhCleo Slack — 08:33 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | — |
| #events-code | N/A | channel_not_found (archived) |

Tony daily report: N/A (0 messages in window, no report expected — LongVV redirected to Maddy/James Diamond, not OhCleo today).

---

## Arthur / Meta-Stamp V3 — 08:35 (+07:00) *(cập nhật từ 2026-07-09 10:10 đến 2026-07-15 08:35)*

## Tóm tắt nhanh
Ngày quan trọng cho dự án — Chris chạy demo với investor 1:30 PT (≈ 03:30 VN 15/07). Art gửi 4 video demo (creator workflow, Stripe, CLI repo), Chris phản hồi "good", Casey xem video. Tuy nhiên Nick bị ốm sáng nay (15/07), xin nghỉ nếu không có urgent. Payout Stripe bị lỗi do pending funds đến Jul 20 — Art đang tìm cách giải quyết. Nam đã gửi URL live + login cho Chris để demo Ownership/Provenance modal.

## Chi tiết mới

### Slack Solid Code — ms-v3 (channel chính, hoạt động cao điểm)
- **13/07 19:33-23:45 (giờ VN):** Art & Nick gấp rút quay video demo cho Chris. Stripe Production balance $22.75 đang pending (available Jul 20) → payout creator $10 bị failed. Art: "Today is a very key moment for the project. If Chris gets funding then we could be building this for a while." Nick đề xuất load trước tài khoản Stripe để bypass lỗi.
- **14/07 01:40-04:07:** Nick hỏi Art cho phép upload audio files lên account test. Art confirm Chris đã load card $50. Các vấn đề đã unblock: (1) demo scripts, (2) Stripe connection user account done, (3) $50 loaded, (4) provenance resolved. Art: "I think we are fully unblocked now by Chris."
- **14/07 04:56-06:50:** Nick giải thích chi tiết vấn đề Stripe cho Art — card Chris đưa đã charge $22.75 nhưng pending. Art: "Explain it to me because I'm getting only pieces of it." Nick gửi report cuối ngày 14/07: discussion feedbacks, tested all production, recorded videos, check Stripe issue.
- **14/07 14:28-15:15:** Nam gửi report: clarified P0-2, created internal Trello board, tested project, created snapshot/cleanup scripts. Art hỏi Nam có available để hỗ trợ nếu Chris có urgent questions.
- **15/07 05:22-05:44:** Chris gửi urgent request cho Nam (slack DM): cần URL + login để show Ownership & Provenance modal live lúc 1:15pm PT (demo 1:30pm). Nam đã reply trễ (do đang ngủ) và gửi URL + login + screenshots cho Chris lúc 07:39.
- **15/07 06:22:** Chris xác nhận demo với Dave (investor) chạy trên production frontend. Requirement: dashboard clean, 15 Pelman tracks registered, funded test key.
- **15/07 07:36:** Nick báo ốm, xin nghỉ nếu không urgent. Art bảo chờ xem Chris có urgent không, Nam có thể cover.
- **15/07 07:48:** Art hỏi Nick có available để hỗ trợ Chris tối nay không.

### Slack Solid Code — msv3-official (channel Chris)
- **14/07 08:24-08:41:** Art gửi 4 video demo cho Chris & Casey kèm subtitle files + TOC. Videos: creator workflow, Stripe Connect + YouTube cloning + MCP + payout, CLI demo, Casey's repo.
- **14/07 08:42:** Chris: "watching them now" → "thanks" → asked about video audio, negative balance loophole discussion.
- **14/07 08:51:** Art phát hiện major issue: payout $10 trigger ngay khi customer payment clear → potential fraud loophole, recommend skip payout portion in live demo.
- **14/07 22:44:** Chris urgent request cho Nam (đã cover ở trên).
- **15/07 06:15:** Chris yêu cầu Art confirm pre-demo checklist: (1) dashboard loads clean, (2) 15 Pelman tracks registered & visible, (3) funded test key.

### Slack Solid Code — DM Art (D0B0HSZ7XSN)
- Không có tin nhắn mới trong window.

### Matrix — Arthur business room (6 msgs)
- **09:27:** tienND: "Phuc Vo: anh Năm có trao đổi trên group. em xem lại nội dung nh aem"
- **15:34-15:58** Nam hỏi task status — PhucVT làm snapshot script + testing, TienND quay video demo theo yêu cầu Arthur.

### GitHub — Christebob/Meta_Stamp_V3
- 0 commits since Jul 14. 0 open PRs.

### Workstream — Crystal lang (W15: Jul 13-19)
- PhucVT: 15h (7h Mon + 8h Tue) — logged as "Metastamp V3 project tasks"
- needsReview: 4 rows pending TienND review (PhucVT's hours Jul 13-14)

### BẢNG THEO DÕI (cập nhật 15/07)

| # | Mục | Trạng thái | Ghi chú | Link Slack |
|---|-----|-----------|---------|------------|
| 1 | P0-1: Provenance/Ownership modal live demo | ✅ Client-confirmed shipped | Chris xem demo videos & Nam gửi URL/login cho Ownership modal. "provenance shipped" confirmed. | [Nam→Chris](https://solid-code-team.slack.com/archives/D0BFFTVU65N/p1784078499887639) |
| 2 | P0-2: Chris investor demo (1:30pm PT 14/07) | 🟢 Đã chạy, cần follow-up kết quả | Videos sent, Chris xem, chưa có kết quả funding confirmation. Nam gửi live URL login. | [Chris checklist](https://solid-code-team.slack.com/archives/C0BEPFBLGJV/p1784057056417259) |
| 3 | Stripe payout bug (pending funds) | 🔴 Unresolved | $22.75 pending till Jul 20, payout tests fail. Art đề xuất cần delay/anti-fraud. | [Nick→Art](https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1784020874105329) |
| 4 | Nick sick 15/07 | 🟡 Chờ xác nhận | Nick xin nghỉ nếu không urgent. Art bảo chờ xem Chris cần gì. | [Nick→Art](https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1784077365021539) |
| 5 | PhucVT snapshot script | ✅ Done | Script tạo snapshot data + cleanup, đã test. | [Nam report](https://solid-code-team.slack.com/archives/C0B4G8USU3D/p1784025018211749) |

### Câu hỏi cần anh xác nhận/quyết định
- Kết quả demo của Chris với investor? Có funding không?
- Nick nghỉ hôm nay có OK không? Cần ai cover?
- Stripe payout cần thiết kế delay/anti-fraud — Art đã recommend skip phần này trong demo, OK không?

---

## Performance — 08:57 (+07:00)

### OhCleo (prod) — 24h window
| Apdex | Avg response | Error rate | Throughput |
|-------|-------------|------------|------------|
| 0.96 | 232ms | 2.4% (609/24903) — mostly NotAuthenticated (563) — benign | 17.4/min |

**Top errors >5% — not present** (error rate is 2.4%, NotAuthenticated 563 dominates — benign).

**Slowest transactions:**
| Endpoint | Avg | Calls | Status |
|----------|-----|-------|--------|
| MediaByKeyView.get | **5,867ms** | 233 | 🔴 Still above 5s — 3rd consecutive run flagged |
| HomeMediasView.get | 1,855ms | 474 | Below threshold |
| MediaListView.get | 1,723ms | 4 | Not significant |
| EmailVerificationView.post | 1,024ms | 8 | Not significant |
| MediaRecommendsView.get | 971ms | 771 | OK |

### MPFC (prod) — 24h window
| Apdex | Avg response | Error rate | Throughput |
|-------|-------------|------------|------------|
| **0.51 (POOR)** | 1,115ms | 0.05% (21/44226) | 30.9/min |

**Top errors:**
| Error | Count | Detail |
|-------|-------|--------|
| E_WARNING | 16 | `"continue" targeting switch` — PHP version warning |
| Error | 2 | `Call to undefined method JSON_API_Auth_Controller::error()` — JSON API plugin |
| E_COMPILE_ERROR | 1+1 | `require(): Failed opening 'ABSPATHWPINC/...'` — PHP path issue |
| E_WARNING | 1 | `mysqli_real_connect(): No such file or directory` — transient DB issue |

**Slowest transactions (5s+):** None in this window (previously seen vulnerability-scanner probes may have subsided). Apdex still poor at 0.51 — same root cause: vulnerability scanners hitting non-existent PHP paths.

### Fountain (prod) — 24h window
| Apdex | Avg response | Error rate | Throughput |
|-------|-------------|------------|------------|
| 0.98 | 151ms | 0/48037 | — |

Clean. No issues.

