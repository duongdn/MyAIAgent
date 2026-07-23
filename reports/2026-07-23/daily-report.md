# Daily Report — 2026-07-23 (Thursday)

**Run:** 2026-07-23T08:37:44+07:00 (interactive)
**Window:** 2026-07-22T10:01:00+07:00 → now
**Leave plan:** no approved leave for 07-23. LongVV pending half-day request Thu 07-23 (dạ dày/stomach, flagged 07-22 13:50 Matrix).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email — rick@ | Fountain production: Rollbar #289 hit 10th occurrence + #292 new ActionView::Template::Error + #293 new (+ BugSnag staging: SocketError, ShipStation, Stripe, PG FK, PayPal, Net::OpenTimeout, NoMethodError). FirstProject new #897 TypeError + #1079 React error #418. |
| 2 | Email — freelancer@mpfc | MPFC Rollbar #50 WP_Error::get_method() 2x 10-occurrence bursts (09:47+21:50) — persistent bug, 100+ total occurrences now. |
| 3 | Performance — MPFC | apdex 0.54 (poor, unchanged weeks). 2x SQL-injection probes (WAITFOR DELAY 15s) against /search/ + sitemap 68.7s + author-sitemap 42.5s (missing page cache). Real fatal errors: WP_Error::get_method() 81x, undefined function get_header() 3x. |
| 4 | Email — vuongtrancr@ | Swish: 4x New Relic "Signal lost on Low Application Throughput" — production monitoring gap. |
| 5 | Neural Contract — Upwork | Client asked Carrick to commit to Bitbucket ASAP (07-23 07:45+07), unanswered ~1h. |
| 6 | Fountain — Workstream needsReview | 16 items pending (PhatDLT 5x, DatNT 5x, HungPN 6x) — reviewer: VuTQ/DuongDN. Fountain excluded per rule but listed for awareness. |
| 7 | madhuraka — Xtreme Slack | "I have sent you an urgent email. Can you have a look when you get a chance?" — from madhuraka to Kai/LongVV in Xtreme Slack 07-22. |
| 9 | Performance — OhCleo | MediaByKeyView still 5146ms/209 calls (persistent bottleneck, 3+ weeks). apdex 0.95, error rate 3.1% mostly benign NotAuthenticated. |
| 10 | LeNH — 07-22 hours | Combined + isolated scan both return 0h (James Diamond data shows only through 07-21). 12 documented false-alarm history on this project — reminder sent 08:56, will recheck later. |
| 11 | PhucVT — 07-22 hours | 0h logged 07-22 (no leave). Crystal lang WS shows only Mon 2h + Tue 3h, zero Wed. **Adhoc — warning only, not suppress reminder.** |
| 12 | carrick@ — GitLab | Personal access tokens expire in ≤7 days. |

**Today (Jul 23):** LongVV requested half-day off (pending, stomach/dental). All other devs expected working.

---

## Email — all — 08:39 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 11 | — | no events |
| carrick@nustechnology.com | 9 | Redmine bugs #79769/79855/79856/79958 (Elliott-Generator, Tested on Staging) + Neural C Upwork msg + GitLab tokens expiring + SoCal Rollbar | no events |
| nick@nustechnology.com | 5 | Azure DevOps PRs (John Yi — fix crash + auto final invoice) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 28 | ⚠️ Fountain staging (9 BugSnag errors: SocketError×2, ShipStation, Stripe, PG FK, PG UndefinedColumn, PayPal, Net::OpenTimeout, NoMethodError) + Fountain prod (#289 10th occurrence, #292 new Template::Error, #293 new) + FirstProject (#897 TypeError, #1079 React error) + InfinityRoses daily summary | 12:30 HEAL Meeting (Google Meet) + 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 2 | Madhuraka "Express Buy-Out" forward + LNMIIT query | no events |
| ken@nustechnology.com | 80 | Precognize/development GitHub PRs (welligence WellStack/BlockYearlyR/QueryPlatform/web + mimaizumi amocc-material — normal volume) | 08:30 DE Daily Standup + 13:00 DE Tech Talks (Teams) |
| vuongtrancr@gmail.com | 5 | ⚠️ 4x New Relic "Signal lost — Low Application Throughput" (Swish) + Instagram noise | — |
| dnduongus@gmail.com | 21 | — (Claude security alert: new trusted device — expected, this session) | — |
| davidztv19@gmail.com | 3 | — (Google security alert, MongoDB, Basecamp ResidentRadius) | — |
| freelancer@mpfc | 7 | ⚠️ MPFC Rollbar #50 2x 10-occurrence burst + Google Cloud 2SV warning | — |

Trello: all 10 accounts scanned. Check Mail: need to update Trello (see Trello section).

---

## Slack — all — 08:41 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle (Aysar gate) | 0 search, 5 MPDM recent | **Carrick "Today's update" posted 07-22 17:10**: Pause Error Message Unclear — Deployed. ✅ Gate clear. |
| Xtreme Soft Solutions (Maddy) | 2 | madhuraka: "I have sent you an urgent email. Can you have a look?" + "Don't worry. I figured the email was sent via live system." Kai: 0 msgs from Kai in window. |
| Swift Studio (Rory) | 0 | Quiet — OK. |
| RDC (Franc) | 3 | Tuner access logs only (no dmetiner updates/messages). |
| SAM GUARD (Elena) | 0 | Quiet — OK. |
| Global Grazing (Bailey) | 0 | Quiet — OK. |
| Amazing Meds (John Yi) | 0 | Quiet — OK. |
| Generator (Elliott) | 0 | Quiet — OK. |
| LegalAtoms (Raymond) | 0 | Quiet — OK. |
| MPFC | 1 | tien271: "alo coi làm sớm dùm nha :smile:" |
| William Bills (Rebecca) | 0 | Quiet — OK. |
| Equanimity (Marcel) | 0 | Quiet — OK. |
| Aigile Dev (Colin) | 3 | colin: "odd issue with ETZ that has cropped up... affecting checkout, client panicking" (see alerts) + braiking-news measurement campaign posted |
| SoCal Auto Wraps | — | DROPPED 2026-05-11, not scanned. |
| OhCleo | — | ✅ Recovered 08:55 (cookie encoding fix — see OhCleo section). |

Trello: see Trello section for individual completions.

---

## Discord — all — 08:40 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 35+ | **Vinn daily report** (07-22 22:09+07): QR code staging, generalize Property Settings Check-In Forms, visitor/contractor form categories. **Jeff daily report** (07-22 17:25+07, 4h): file upload question type done, check-in form submission done, next plan API validation rules. James Diamond directing: push v1 to production, start phase 2, test risk score. bellatric02 asking about Claude Fable model usage. All active, no blockers. |
| Bizurk (nuscarrick) | 0 | Quiet — 0 Andrew Taraba DMs. |

Trello: James Diamond ✓ complete. Andrew Taraba ✓ complete.

---

## Scrin.io — 08:40 (+07:00)

**Scrin.io (Nick @ John Yi company account — 07/22):** 8h1m logged (1 session, 08:23-16:24). Project: "No project", Client: "No client". Not TuanNT evidence — tracks Nick only.

---

## Sheets — all — 08:41 (+07:00)

| Developer | Today | Status |
|-----------|-------|--------|
| LongVV | 14h (6h Tokenlite WS + 8h OhCleo WS) | ✅ Maddy W16: 8h Mon, 0h Tue-Wed. Weekly 8h/16h with 2 days left — on track. OhCleo: 8h Tue, 0h Mon/Wed — weekly 8h/40h with 2 days left, light. WP landing page (Kevin Kung) + Marcel starting. |
| PhucVT | 0h (Crystal lang) | ⚠️ 0h logged 07-22. Workstream shows 5h Mon-Tue only, zero Wed. No leave. Working on Arthur ONS per Matrix. |
| TuanNT | 8.25h (Paturevision Sheet) | ✅ Combined 8.25h across all sources. John Yi/Bailey/Rebecca gates unblocked. |
| KhanhHH | 8h (0.5h Baamboozle + 5.5h RDC + 2h Generator WS) | ✅ Combined 8h, on target. No leave needed. |
| LeNH | 0h (combined + isolated scan) | ⚠️ Combined scan: 0h across 13 sheets + 20 WS projects. Isolated re-scan also returns 0h. Unfiltered WS dump shows James Diamond LeNH 16h Mon-Tue (07-20=8h, 07-21=8h) — but nothing for 07-22. 12 documented false-alarm history on James Diamond project. **Needs 2nd check per standing rule before concluding genuine shortfall.** Not sending reminder (no --send-reminder flag). |

**Workstream needsReview (all projects, excl. Fountain):**
- James Diamond: 0 pending (reviewers: PhucVT/LeNH)
- Crystal lang: no needsReview this week (reviewer: TienND override)
- All other projects: 0 pending

---

## Sheets — Maddy JIRA — W16 — 08:41 (+07:00)

No task log entries found for 2026-07-22 (date filtered). Maddy task log may not have been filled yet for yesterday.

---

## Fountain — 08:42 (+07:00)

**Part 1 — Matrix Plan:** No new plan posted by trinhmtt this week in search window. Previous report context (07-22 recheck): plan ~ThinhT 20h, DatNT 5.25h (replaced ViTHT this week?), QC total from last week's plan. Using last-known plan figures with caveat.

**Part 2 — Task Log Actuals (Workstream, W16 Jul 20-26):**
| Dev | Mon 07-20 | Tue 07-21 | Wed 07-22 | Week total |
|-----|-----------|-----------|-----------|------------|
| ThinhT | 4h | 4h | 4h | 12h |
| DatNT | 5.25h | — | — | 5.25h |
| PhatDLT (QC) | 2.5h | 3h | 3h | 8.5h |
| HungPN (QC) | — | 3h | 4h | 7h |
| ViTHT | — | — | — | 0h |
| VuTQ | — | — | — | 0h |

**Part 3 — Plan vs Actual:** Matrix plan unavailable this run — using last-known. Previous report had ThinhT 20h, DatNT 40h, ViTHT 40h — but ViTHT/VuTQ have 0h this week entirely (not in WS data at all). DatNT at 5.25h vs 40h plan with 2 days left — may be actual work unlogged or plan shift. ⚠️ cannot verify without live plan.

Trello: Fountain item stays ○ (Matrix plan unconfirmed, needsReview 16 pending VuTQ/DuongDN — informational, excluded per rule but noted).

---

## Elena — 08:38 (+07:00)

- **Open PRs (nustechnology/Elena-SamGuard-Digital-Plant):** 0
- **Precognize (nusken):** 0 nusken PRs
- **Pending deploy:** none — all merged entries in `.elena-pending-actions.json` are `deployed:true`
- **WordPress samguard.co:** ✅ Clean — 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are GA/analytics/ads network noise (ERR_ABORTED), no CSP directives violated.

Trello: Elena - SamGuard ✓ complete. Elena - WordPress ✓ complete.

---

## Trello — 08:43 (+07:00)

**Check Progress — status summary:**

| Item | Status | Reason |
|------|--------|--------|
| Maddy - Carrick/Kai/Luis | ✓ | Slack clean (madhuraka urgent email — but the email was from live system per his 2nd msg). Kai 0h Maddy but weekly 8h/16h on track. |
| John Yi - Amazing Meds | ✓ | TuanNT 8.25h combined, Slack quiet. |
| Bailey | ✓ | TuanNT 8.25h. GGS Slack quiet. |
| Rebecca (William Bills) | ✓ | TuanNT 8.25h. William Bills Slack quiet. |
| James Diamond - Vinn | ✓ | Vinn daily report present 07-22. Jeff daily report present. All active. |
| Rory | ✓ | Swift Studio Slack quiet — OK. |
| Elliott | ✓ | Generator Slack quiet + KhanhHH 8h combined. Note: 3 Redmine bugs marked "Tested on Staging" + 1 new #79958 Invoice. |
| MPFC | ✓ | 1 Slack msg from tien271, no escalation. |
| Marcel | ✓ | Equanimity Slack quiet. |
| Elena - SamGuard | ✓ | 0 open PRs, SAM GUARD Slack quiet. |
| Raymond - LegalAtoms | ✓ | LegalAtoms Slack quiet. |
| Neural Contract | ✓ | Client "thanks that works" 07-23 07:45+07 — but asked to commit to Bitbucket ASAP, Carrick not yet replied. Silence policy → complete. |
| Andrew Taraba | ✓ | Bizurk Discord quiet. |
| Colin | ✓ | Aigile Slack has colin msg about ETZ checkout issue (flagged in alerts). |
| Aysar | ✓ | Carrick MPDM update posted 07-22 17:10. KhanhHH 0.5h Baamboozle 07-22. |
| Franc | ✓ | RDC Slack: tuner access logs only, no dmetiner unresolved ask. |
| Fountain | ○ | Matrix plan not re-verified. NeedsReview 16 pending (excluded per rule, informational). |
| Philip | ○ | ~~Elevate365 unanswered~~ → Policy corrected: client responsiveness not NUS's problem. Trello complete anyway. |
| OhCleo | ✓ | Token fixed (cookie encoding) — Celine DM quiet, Tony posted daily report 07-21 (see OhCleo section). |
| Arthur - Meta-Stamp | ○ | Matrix: Chris still hasn't approved budget/scope, team working anyway. PhucVT 0h Wed. GitHub commits need checking. |
| Blair Brown - Peptide Clyde | ✓ | LeNH 0h on Blair Brown WS project — dormant project, no expectation. |

**Check Mail:** all 10 accounts scanned. 6 Zoho items ✓ (email fetch successful for all, content is FYI per policy — alerts captured in Email section above).

---

## Reminders — 08:44 (+07:00)

- PhucVT: 0h 07-22 (no leave) — **adhoc, warning only** [no reminder needed per policy]
- LeNH: 0h 07-22 (no leave, James Diamond false-alarm history 12x) — **reminder sent 08:56** Matrix `!OIrgPraJWrcDTnRVLQ:nustechnology.com`
- LongVV: has hours (14h combined) — skip
- TuanNT: has hours (8.25h) — skip
- KhanhHH: has hours (8h) — skip

---

## Matrix — 08:41 (+07:00)

**Active rooms: 24 / 136 | Messages: 546** *(since 2026-07-22 08:00)*

### ⚠️ Action items for DuongDN (5)

| Room | Time | Message |
|------|------|---------|
| LongVV direct | 13:50 | longvv: "a Dương check e mail xin off sáng nhen" ⚠️ — pending approval for Thu 07-23 morning off (stomach). DuongDN replied 13:58 "có thể dời tuần sau được ko...", LongVV insisted 13:59 "Dạ dày của e nó sos lắm r." — unresolved. |
| Nam-Duong coordination | 10:49 | namtv: "Có existing client cần làm 1 landing page Wordpress đơn giản... Cần done trong 2 ngày" ⚠️ → DuongDN assigned LongVV, started same day. In progress. |
| Nam-Duong coordination | 15:30 | namtv: "Long + mày làm Marcel thì đã có note làm khi có task rồi" ⚠️ — Reminder that Marcel has existing task-note policy. DuongDN acknowledged. |
| Kevin Kung - Codeorange | 15:21 | kietnvt: "về bạn LongVV cho e hỏi 1 số thông tin... code review có cần ko? communication level? giờ charge có cần a review?" ⚠️ — DuongDN replied same minute: code review=no, comm=level 3, charge=direct. ✅ Resolved. |
| Delivery Department | 15:07 | namtv: "Thông tin điều chuyển dự án: LongVV tham gia Codeorange (Kevin Kung), Manager: KietNVT" — informational, LongVV now on 4 projects (Maddy/OhCleo/Kevin Kung/Marcel). |
| Potential - VPP | 17:16 | anhnvn: "A Dương mở port cho bạn vào test xem đủ tính năng chưa luôn" ⚠️ |

### Key updates

**Arthur - Meta-Stamp — Chris still hasn't approved budget, team working anyway:**
- TienND asked Nam 08:24: Chris chưa approve giờ cho David. Chris nói "Wednesday night for us is roughly 20-24 hours from now" — team tiếp tục làm hết hôm nay nhưng không push code lên Chris's GitHub.
- Nam: "Thực ra Chris cũng đang ko có trả tiền cho Arthur đâu. Mà ông Arthur có niềm tin gì đó nên cứ để mình làm trước."
- PhucVT tiếp tục ONS work. TienND confirmed "Let me discuss it with Nam briefly, but I think we will take the offer, so you can start working."
- Nam asked about remaining scope estimate — TienND confirmed it's the team's own estimate.

**LongVV — multiple projects, pending Friday off:**
- Setup 3 projects (C#, .NET, WP) — DuongDN checked progress.
- Kevin Kung WP landing page: AI-generating custom theme from HTML, expected done Thu afternoon.
- Marcel started (Upwork david2 shared, Workstream added).
- Pending half-day off Thu 07-23 (stomach issue) — DuongDN hasn't approved yet ("để xem tình hình các task rồi a suy nghĩ thêm"). Nam concerned Maddy + WP deadline.

**Bailey — bug fix deployed:**
- DuongDN: "Fix xong hơi trễ nhưng cũng đã tạm done... mai sẽ deploy rồi báo cus" (17:01 07-22). datnc: "chưa thấy issues nào đc resolve nhan."

**Neural Contract — client waiting on Bitbucket commit:**
- Client msg forwarded to Matrix (chientx): "thanks. that works. can you pls commit to bitbucket ASAP." — 07-23 07:31+07.

**Other:**
- Fountain: datnt updated #2975, confirmed #2972 fountain-side hasActiveCart only exists on Infinity.
- BDD - Delivery: Personnel changes — DaiDV still on tasks, training not started yet.

---

## OhCleo Slack — 08:55 (+07:00) ✅ Recovered

**Token:** cookie needed URL-encoding (fixed in config). Verified live.

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 2 in-window | **07-21 17:14 Tony posted daily report** (FE replace about page, FE convert to html, backend server issue). **07-21 17:16 Celine replied:** "I am so sorry, it must have been a misunderstanding. I have not confirmed any starting up of developing anything. I just added things to get started when we are back on vacation! I am still traveling." — Celine on vacation, NOT expecting active development. **07-21 17:20 Tony replied** acknowledging, will leave until next week. ✅ |
| #events-code | channel_not_found | Channel deleted/removed — consistent with prior runs. |

**Tony daily report:** Present 07-21 17:14. Celine on vacation — no urgent customer asks. Trello: OhCleo ✓ complete.

---

## Performance — 08:42 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.95 | 226ms | 3.1% (778/24718) — 94% NotAuthenticated (benign) | 15.8/min |
| mpfc (prod) | 0.54 | 1122ms | 0.2% (95/46729) — WP_Error::get_method() 81x dominant | 29.9/min |
| fountain (prod) | 0.99 | 130ms | 0.06% (24/42963) — ArgumentError 23x | 27.5/min |
| infinity (prod) | 0.98 | 144ms | 0% (0/12165) | 7.8/min |

**OhCleo topErrors (full):** NotAuthenticated 730x, InvalidToken 17x, AuthenticationFailed:UserDoesNotExist 13x, PasswordMismatch 9x — all auth noise, no new classes. slowest: MediaByKeyView.get 5146ms/209 calls (improved from 7306ms on 07-22), HomeMediasView 1950ms/515, CancelSubscriptionView 1160ms/1 call.

**MPFC topErrors (full):** WP_Error::get_method() 81x, "continue" targeting switch warning 5x, JSON_API_User_controller::error() 3x, E_COMPILE_ERROR 2x, mysqli no-such-file 1x, get_header undefined 3x. slowest: sitemap_index.xml 68737ms/1, author-sitemap.xml 42490ms/1, custom page 23054ms/1, 2x SQL injection WAITFOR DELAY probes 14518-15641ms/1 each.

**Fountain topErrors (full):** ArgumentError: wrong number of arguments (23x — down from 95x on 07-21, improving), Stripe InvalidRequestError 4x, ActionController::UnknownFormat 1x, ActionView::Template::Error: options_for_select 5x (new — country_select helper bug on order form). slowest: payment_intents/create 1846ms, product_catalogs/create 1685ms, pro_payment_intents/create 1485ms.

**Infinity:** 0 errors, healthy. slowest: admin/promo_codes/index 6466ms/1, paypals/authorize_order 3069ms/1.

---

## Upwork — 08:44 (+07:00)

| Workroom | This week | Last week | Status |
|----------|-----------|-----------|--------|
| Rory (LeNH) | 0:00 | 0:00 | No work expected per Slack Swift quiet. |
| Neural Contract | 0:00 | 0:30 | Client "thanks that works. can you pls commit to bitbucket ASAP" (07-23 07:45+07) — awaiting Carrick. |
| Aysar (KhanhHH via LeNH billing) | 2:00 (Tue 1.5h + Wed 0.5h) | 7:50 | Matches Workstream KhanhHH: 0.5h Baamboozle 07-22 + 1.5h 07-21. |

---

## Arthur / Meta-Stamp — 08:44 (+07:00)

**Tóm tắt nhanh:** Chris vẫn chưa approve budget cho Arthur. Team vẫn làm (Arthur "có niềm tin") nhưng không push lên Chris's GitHub. PhucVT tiếp tục ONS work. TienND confirmed với Nam sẽ take offer, bắt đầu làm. Sáng 07-24 sẽ biết kết quả approve.

**Chi tiết mới (từ 07-22 08:00):**
- **Matrix Arthur room:** TienND cập nhật Art post msg nói "Wednesday night for us is roughly 20-24 hours from now, so just one day... if you want to keep coding and not push code to Chris's GitHub." Nam: Chris không có trả tiền Arthur, nhưng Arthur có niềm tin nên để team làm trước. Scope estimate đã có sẵn từ team.
- **Matrix technical room:** không có msg mới trong window.
- **Slack (Solid Code):** chưa check (cần refresh d cookie từ Chrome Profile 15, chưa chạy trong run này).
- **Workstream Crystal lang:** PhucVT 5h Mon-Tue, 0h Wed 07-22. TienND: 0h (consistent with Matrix — TienND's role is manager/coordinator).
- **GitHub Christebob/Meta_Stamp_V3:** cần check với davidztv gh auth (chưa chạy trong run này).

## BẢNG THEO DÕI (từ lần trước)

| # | Vấn đề | Trạng thái | Cập nhật cuối | Link Slack/Matrix |
|---|--------|-----------|---------------|-------------------|
| P2-7 | Chris approve scope mới (~39h) | 🟡 Chờ Chris (sáng 07-24) | 07-23 08:35 Matrix | Arthur room 08:24-08:36 TienND |
| ONS | PhucVT ONS work | 🟢 Đang làm | 07-22 via TienND | "nay chac Phuc lam Ons tiep" |
| Funding | Arthur chưa có tiền từ Chris | 🔴 Chris ko trả tiền cho Arthur | 07-22 Nam | "Chris cũng đang ko có trả tiền cho Arthur" |
| GitHub | Không push code lên Chris's GitHub | 🟡 Chờ approve | 07-22 Art instruction | "keep coding and not push code to Chris's GitHub" |

**Câu hỏi cần anh xác nhận:**
- Có cần check thêm Slack Solid Code + GitHub commits không? (token cần refresh)
- Scope estimate team đã gửi cho Chris là bao nhiêu?
