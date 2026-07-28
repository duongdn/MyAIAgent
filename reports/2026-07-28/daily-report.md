# Daily Report — 2026-07-28 (Tuesday)

**Run:** 2026-07-28T06:06:22+07:00 (cron)
**Window:** 2026-07-27T09:06:11+07:00 → now
**Leave plan:** No new approved leaves on record (parse-leave-emails.js). Matrix "Delivery - Resource Arrangement" confirms same-day leaves processed 27/07: TuanNTG (sick), ThinhPVD (personal), VuTQ (AM), TuanNT (PM, "đi sửa laptop", charged Bailey no makeup); and 28/07: PhucVT (personal, charged Arthur no makeup); 31/07: DaiDV (family, internal/idle).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Rick@ / Fountain Gifts production | Rollbar: 3 new error IDs (#1087/#1088 TypeError, #1089 Uncaught Error "Minified React", 10 occurrences in 5 min) on **FirstProject production**. FountainStaging BugSnag errors are staging = informational only. |
| 2 | Carrick@ / XiD SaaS | GitLab pipeline **FAILED** on `main` for both XiD SaaS Backend and Frontend (2026-07-27) + new Snyk vulnerability alert for the marcel org. |
| 3 | vuongtrancr@ / Swish | New Relic Incident Intelligence: "Signal lost for 10 minutes on 'Low Application Throughput'" fired **13 times** in the window — recurring APM signal-loss pattern, not a one-off. |
| 4 | Performance — MPFC | Apdex 0.55 (poor). Recurring own-code fatals: `WP_Error::get_method()` undefined method (not counted this window — see Performance section for exact figures) and `JSON_API_User_controller::error()` undefined method; SQLi `WAITFOR DELAY` probes still hitting `/search/`; `sitemap_index.xml`/`author-sitemap.xml` very slow (69–124s). Same known issue as prior days — still unresolved, no owner fixing it. |
| 5 | Fountain — Kunal | Weekly Matrix plan (normally posted Mon 08:30–09:30 by @trinhmtt) **not yet posted** as of Tue 06:26+07 — over a day late, past the Monday-only grace window. Last known plan is for the week of 2026-07-21. |
| 6 | Arthur / Crystal lang — TienND | ~20h of this week's capacity is **idle with no task assigned** ("Idle, chưa có plan 😩") — namtv acknowledged, no resolution yet in-window. Capacity/planning gap worth a nudge to Nam Tran. |
| 7 | Blair Brown (Peptide Clyde) | Client remains unresponsive/offline — no new reply this window (ongoing situation, not new). |
| 8 | Fountain — DatNT | 6 PENDING reviews (C-1/C-2/C-3 vulnerability patches + .asp bug + OpenCode context gathering + FE prompts) → reviewers VuTQ + DuongDN need to sign off. Found during 08:55 recheck. |
| 9 | Arthur/Crystal lang — PhucVT | 1 PENDING review (Metastamp P2-7, 8h) → reviewer TienND. Found during 08:55 recheck. |

**Today (Tue 28/07):** PhucVT has approved personal-matter leave (charged to Arthur, no makeup) — Arthur project affected, others unaffected. All other staff present.

**Environment note (read once, applies across several sections below):** this run executed on the mpfc.mpfc.live cron server, which has a narrower credential surface than the interactive/local environment: only the `duongdn` and `mypersonalfootballcoach` GitHub accounts are registered here (nuscarrick/nusken/davidztv are not), the "Solid Code" Slack workspace account is still missing from `config/.slack-accounts.json` (unresolved since the 2026-07-13 config-clobber incident), Upwork's carrick-cookie extraction found no local Chrome profile on this box, and Workstream's SSO login requires a human to click through (retried twice this run, 5-min wait each, no human available at this server's display). These gaps affected the Sheets/Workstream, Maddy (Bitbucket), Arthur (Slack+GitHub), Neural Contract (Upwork), and Philip (MS Teams) checks below — noted inline where relevant rather than repeated per-section.

---

## Email — all — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 4 | 0 | no events |
| carrick@nustechnology.com | 6 | 3 (GitLab x2 FAILED, Snyk) | no events |
| nick@nustechnology.com | 1 | 1 (Adobe usage notice, informational) | 21:30 Weekly Meeting with Devs |
| rick@nustechnology.com | 12 | 11 (see Alerts #1; rest are FountainStaging BugSnag = staging/INFO + daily summaries) | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 5 | 5 (JIRA mention/update notifications on LIFM2-436/446/451 — routine ticket activity, not bug alerts) | no events |
| ken@nustechnology.com | 80 | 8 (GitHub PR thread notifications, welligence/web — routine review activity) | 08:30 DE Daily Standup (x2 duplicate calendar entries), 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 15 | 13 (see Alerts #3 + 1 generic "Cybersecurity doesn't wait" marketing email, not a real alert) | — |
| dnduongus@gmail.com | 20 | 0 (personal inbox, all newsletters/banking notices, no security alerts) | — |
| davidztv19@gmail.com | 9 | 0 (Slack email-migration confirmation codes, GitHub OAuth notice, Stripe payout setup, Trello notifications — all expected Arthur/Meta-Stamp admin activity) | — |
| freelancer@mypersonalfootballcoach.com | 2 | 2 (MPFC Rollbar + New Relic daily summaries — see Performance section) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete.

---

## Slack — all — 06:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 9 | Carrick posted "Today's update" (3 items dev-done, 1 in-progress). skjamie25 (client QA) reported a production filter bug this morning; aysark.pro (client PM) acknowledged within ~1.5h ("feature flagged for monitoring, will turn on soon") — resolved client-side, no action needed from us. |
| RDC - FM Monitoring | 20 | Mostly automated tuner access-log/reboot-alert noise (a few instability→recovery flaps). Carrick nudged 2 people about an earlier message; no dmetiner activity this window. |
| Swift Studio | 1 | Henry (BXR dev): ~70% done on Booking Flow, expects to finish + hand off tomorrow. |
| Xtreme Soft Solutions | 8 | Kai posted 2 daily progress updates (09:20 + 17:18) covering LIFM2-454/452/457/450/449/446/451; arranged make-up hours with Madhuraka (working Mon/Thu/Fri this week). See dedicated Maddy section below. |
| SAM GUARD - Mobile | 0 | Clean. |
| GLOBAL GRAZING SERVICES | 11 | Customer (Joey) confirming fixes work / testing stock features; Amy (dev) deployed a pallet-line fix, customer thanked. No open complaint. |
| Amazing Meds | 1 | Nick asked client if any upcoming task, offered to close the contract cleanly if not — no complaint, no reply yet in-window. |
| Generator | 3 | Elliott listing/adjusting Trello scope items for an upcoming release — routine project planning, no alert. |
| LegalAtoms | 10 | Raymond + aliriodiaz111 debugging 2 unrelated Sidekiq failures ahead of a release — internal dev topic, no Nick-specific mention. |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 1 | Lucas: available, asking for next task — no complaint. |
| Equanimity | 55 | Active XiD/BCA HDB-BTO requirements thread (Carrick + Komal.bailur) — detailed but resolving normally ("Done"/"OK"/"checking" throughout); Carrick gave 2 days' notice of Thu/Fri leave. No unresolved complaint. |
| SoCal Auto Wraps | 0 | Dropped project, no monitoring expected. |
| Aigile Dev | 1 | Automated `the-gaige-alerts` bot post, no text payload — no signal. |

Trello: Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena - SamGuard Digital Plant, Raymond - LegalAtoms, Colin ✓ complete. Maddy — see dedicated section, ⚠️ left incomplete (Bitbucket layer blocked).

---

## Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis) — W17 — 06:30 (+07:00)

### 1. Slack (Kai ↔ Madhuraka DM)
Two full daily-progress posts in window (09:20, 17:18 on 07-27): LIFM2-454 (Quote tool inconsistency) Done, LIFM2-452 (4W Sent status) Done, LIFM2-457 (Shopify API version upgrade) Testing, LIFM2-409 Waiting QA, LIFM2-450/446/451 Done→moved to Anoma testing, LIFM2-449 QA feedback (starting today). Kai arranged make-up hours this week (Mon/Thu/Fri) with Madhuraka's agreement, and separately confirmed with DuongDN via Matrix he'll do Maddy make-up work this week too (details TBD with Anoma). No unanswered client ask this window.

### 2. Task log hours
LongVV = Kai. Workstream (`cmpqc1v7v00ahtk1vs1817xt8`) — **unreachable this run** (SSO login requires interactive browser click; retried twice, 5-min wait each, no human at this server's display). Maddy alert threshold remains 16h/week (not the config's 40h, which is LongVV's Maddy+OhCleo combined total). Cannot state a verified weekly-hours figure this run.

### 3. JIRA cross-check
`maddy-jira-tasklog-check.js --week 2026-07-27` → "No ticket entries in this week" — this is the script's known stale-Sheet-source issue (it reads the abandoned Google Sheet, not live Workstream), not a real absence of activity. Kai's Slack posts reference 7 distinct LIFM2 tickets this week (409/446/449/450/451/452/454/457) — genuine JIRA activity is happening, just not visible via this script while Workstream is also down for cross-verification.

### 4. Bitbucket PR status
**Blocked** — the stored Atlassian API token (`config/.bitbucket-config.json`, `instances.kai`) returned `401 Token is invalid, expired, or not supported for this endpoint`. This token has died and been replaced several times before (most recently 2026-07-15); needs a fresh Bitbucket-scoped token from the user via id.atlassian.com. Cannot verify open-PR review-backlog status this run.

**Verdict:** Slack ✓ clean. Hours/JIRA/PR-layer all blocked by the same-day Workstream+Bitbucket outages, not by any negative finding. **Trello item left incomplete** pending a working Bitbucket token and/or Workstream access.

---

## Discord — all — 06:35 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | — | Token check failed (401 on `/users/@me` and `/guilds`; `discord-token-refresh.js` also redirected to Discord's login page when relaunching the copied profile). This server has no desktop/GUI tooling available to screenshot-verify per the established protocol before concluding a real logout — inconclusive this run, not confirmed as a real session loss. Vinn/Jeff daily report unverifiable. |
| Bizurk (nuscarrick) | 0 | Token valid. No new messages, 0 messages in the Andrew Taraba ("animeworld") DM — normal silence for this low-communication client. |

Trello: Andrew Taraba ✓ complete. James Diamond - Vinn task ⚠️ left incomplete (Discord token unverifiable this run, not a confirmed person-status alert).

---

## Scrin.io (Nick @ John Yi company account — 2026-07-27): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — 06:45 (+07:00)

🔴 **Workstream unreachable all run.** `workstream-login.js` was run twice (once via `sheets-tasklog-scan.js`, once standalone), each waiting the full internal 5-minute SSO window — both ended with "Failed to capture token" because there is no human at this cron server's display to complete the Keycloak SSO click-through. This affects LongVV/PhucVT/KhanhHH/LeNH's hours (Workstream is primary for all their projects) — cannot state verified weekly totals for them this run.

**Bailey/Paturevision (Sheets-only project, unaffected by the Workstream outage):**
- Direct read of the Paturevision `W38` tab, John Yi `W34` tab, and Rebecca `W35` tab: all show **0h logged for Mon 27/07** (blank template rows, no leave marker in Sheets).
- However, the "Bailey - BA/QC" and "NUS - Bailey - Paturevision 2026" Matrix rooms show TuanNT was **actively working** that day — diagnosing and fixing a GGS filter/paging bug, deploying to staging, following up with datnc. DuongDN's own message in-room ("mình có report upgrade daily cho ổng ko? có vẽ quên report") confirms the team simply hasn't been logging/reporting this work formally, not that no work happened. TuanNT's PM (afternoon) was excused leave ("đi sửa laptop", charged Bailey, no makeup) per the Delivery-Resource-Arrangement room.
- **Conclusion: not treating this as a 0h/shortfall alert** — real effort is evidenced via chat even though the formal Sheet entry and Workstream cross-check are both unavailable this run. Flagged as a process note (backfill the task log) rather than a person-status alert.

**Maddy JIRA weekly check:** see dedicated Maddy section above.

**Other devs (LongVV/PhucVT/KhanhHH/LeNH):** no verified hours this run — Workstream primary source down, and per longstanding project history, Sheets have moved to fallback-only status for these projects, so an empty Sheets read is not evidence of a real shortfall. Deferred to next recheck when Workstream access is restored.

**Review-status check (Piece 4 `needsReview`):** could not run — requires the same Workstream `/pinfo/projects` + `/review/week` endpoints that are down this run.

---

## Fountain (Kunal) — 06:50 (+07:00)

### Part 1 — Matrix Plan
Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com` checked back to 2026-07-23 — **no new weekly plan posted for the week of 2026-07-27**. Last known: 2026-07-21 09:47+07 — "ViTHT: 32h | ThinhT: 20h | VuTQ: 8h | DatNT: 40h | => QC: 25h" (week of 07-21). Since today is Tuesday (not Monday-before-09:30), this is now a genuine gap, not a timing false-alarm — flagged in Alerts Summary #5.

### Part 2 — Task Log Actuals
Workstream (`cmpqcjojh00q2tk1v2qi7gs0j`) unreachable this run (see environment note above). No verified per-dev hours this run.

### Part 3 — Plan vs Actual
Cannot compute without Part 2 data.

**Qualitative signal from Matrix (Kunal - Fountain room, 52 msgs):** genuine active dev/QA work all day — hungpn/vitht debugging a `tracking_number` display issue, an `/admin/users` perf bug found and fixed by vitht same day, PR reviews flowing (datnt↔vutq). No customer complaint visible in-window.

**Trello board (Web Development, Rick's account):** not checked this run due to time — deferred to recheck.

**Verdict:** ⚠️ Trello item left incomplete — plan missing + hours unverified are both real gaps, not process artifacts.

---

## Elena — 06:55 (+07:00)

- **PRs:** `nustechnology/Elena-SamGuard-Digital-Plant` — 0 open PRs.
- **Pending actions:** `config/.elena-pending-actions.json` — no `deployed:false` entries requiring action (1 historical NOTE-only entry, no deploy needed).
- **Precognize:** not checked this run — `nusken` GitHub account is not registered on this cron server (see environment note).
- **WordPress (samguard.co):** clean — 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are all benign analytics/ads noise (GA, DoubleClick, LinkedIn) with no CSP directive involved.

Trello: Elena - SamGuard Digital Plant ✓ complete, Elena - WordPress SamGuard ✓ complete.

---

## Matrix — 06:26 (+07:00)

**Active rooms: 24 / 136 | Messages: 313** *(since 2026-07-27 08:00 +07:00)*
Full details: reports/2026-07-28/matrix-rooms-0626.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| (unnamed room) | 14:31 | anhnvn: "A Dương, lại nhờ a Dương cung cấp info em làm case study nha... Project PHP gì đó của ông James Diamond (Anonymized)" — case-study data request; acknowledged, deferred to PhucVT for a richer answer, no hard deadline. |

### Key updates

**Arthur / Crystal lang** — capacity gap surfaced (see Alerts #6) + team Slack email migrated to davidztv19@gmail.com, re-login needed.

**Bailey / Paturevision** — active bugfix + deploy day (see Sheets/Workstream section); DuongDN asked for daily Console-upgrade reporting going forward.

**Fountain** — active QA/dev work, no new weekly plan (see Fountain section).

**Maddy** — make-up hours coordination (see Maddy section).

**Marcel/XID** — minor Upwork-tracker hour discrepancy (30min), resolved same thread.

**Other:** PHP Projects — Blair Brown still unresponsive (Alerts #7). Elena/AA4 — unrelated internal project (not the SamGuard repo), onboarding devs to Workstream tags, near done on current scope.

---

## OhCleo Slack — 07:00 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | No new messages since last run. |
| #events-code | — | `channel_not_found` — channel likely archived/inaccessible (consistent with prior notes that it's been dormant since 2023). |

Tony(LongVV) daily report: no new activity this window. No effort-tracking evidence available (Workstream down) to determine whether OhCleo work happened today — not treated as an alert absent that evidence. New Relic OhCleo (see Performance) shows a healthy, normally-operating service — no sign of an unreported production issue.

Trello: Ohcleo ✓ complete.

---

## Arthur / Meta-Stamp — Cập nhật 2026-07-28 (từ 2026-07-27 09:06 đến 06:26 sáng nay)

⚠️ **Check này không đạt chuẩn 4-phần đầy đủ như Maddy lần này** — 3/6 nguồn bị chặn do hạ tầng của máy chủ cron (mpfc.mpfc.live), không phải do lỗi thực tế:
- Slack "Solid Code" (4 kênh: MPDM, ms-v3, msv3-official, DM Art) — tài khoản vẫn chưa được khôi phục từ sự cố mất config 2026-07-13, máy này không có quyền truy cập desktop để trích xuất lại token.
- GitHub `Christebob/Meta_Stamp_V3` — tài khoản `davidztv` chưa được cấu hình trên máy chủ cron này (chỉ có `duongdn`/`mypersonalfootballcoach`).
- Workstream "Crystal lang" (giờ est/actual) — không đăng nhập được (SSO cần người bấm tay, thử 2 lần đều fail sau 5 phút chờ).

### Tóm tắt nhanh (từ Matrix — 2 phòng còn lại)
Có 1 vấn đề đáng chú ý: **TienND đang idle ~20h tuần này, chưa có task được assign** — đã báo Nam Tran nhưng chưa có plan mới trong khung giờ theo dõi. PhucVT đang hoàn thành P2-7 (19/25h, dự kiến xong hôm nay), sẽ quay lại Bailey/Ons thứ 4-6 nếu M1/M2 xong đúng tiến độ. Nam Tran xác nhận PhucVT nghỉ phép cá nhân ngày mai (28/07) không ảnh hưởng timeline M1 (phần của Phúc là M3). Kênh Slack team đang chuyển sang email davidztv19@gmail.com, cần đăng nhập lại.

### Chi tiết mới
- **anh Nam Tran cho biết:** cái phần fixed-cost chỉ có David; nếu Arthur (khách) assign task ngoài scope thì cần làm rõ ai charge giờ.
- **TienND:** "cái msg của ổng đa số là câu hỏi với ticket mới, ko liên quan tới release M1" — các câu hỏi mới của khách để mai check, không gấp cho M1.
- **Auth0:** Nam Tran đã share tài khoản Auth0 của David cho TienND.

### BẢNG THEO DÕI
*(Không đủ dữ liệu để cập nhật đầy đủ do 3/6 nguồn bị chặn hạ tầng — giữ nguyên bảng từ báo cáo đầy đủ gần nhất, chưa có thay đổi xác nhận được lần này.)*

### Câu hỏi cần anh xác nhận/quyết định
1. TienND đang thiếu ~20h việc tuần này — cần Nam Tran assign task mới sớm để tránh idle kéo dài?
2. Cần trích lại token Slack "Solid Code" (yêu cầu thao tác trên desktop thật, không làm được từ server cron) và cấu hình lại tài khoản GitHub `davidztv` trên máy chủ cron nếu muốn check đầy đủ 6 nguồn từ server này.

---

## Performance — all — 07:05 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 219ms | 1.9% (430/22924) — 92% benign NotAuthenticated/AuthenticationFailed | 17.8/min |
| MPFC | 0.55 | 1226ms | 0.2% (78/37986) — but see slow transactions below | 29.5/min |
| Fountain Gifts | 0.99 | 118ms | 0.006% (2/34054) | 26.5/min |
| InfinityRoses | 0.98 | 144ms | 0% (0/10840) | 8.4/min |

### OhCleo — top errors
| Error | Count |
|-------|-------|
| NotAuthenticated: Authentication credentials were not provided | 394 |
| AuthenticationFailed: User does not exist! | 13 |
| InvalidToken: Token is invalid or expired | 11 |
| AuthenticationFailed: Passwords don't match! | 5 |
| ValidationError: email already exists | 3 |
| ValidationError: no user found with this email | 2 |
| ValidationError: username already exists | 2 |

### OhCleo — slowest transactions
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| MediaByKeyView.get | 4459 | 156 |
| HomeMediasView.get | 2172 | 505 |
| CreatorVerificationApproveView.post | 1072 | 2 |
| MediaRecommendsView.get | 1037 | 744 |
| EmailVerificationView.post | 1006 | 2 |

### MPFC — top errors
| Error | Count |
|-------|-------|
| Error: undefined method WP_Error::get_method() (class-wp-rest-server.php:1091) | 38 |
| Error: undefined method JSON_API_User_controller::error() (api.php:59) | 34 |
| E_WARNING: "continue" targeting switch equivalent to "break" | 3 |
| E_WARNING: count() Parameter must be array/Countable | 2 |
| E_WARNING: mysqli_real_connect() No such file or directory | 1 |

### MPFC — slowest transactions
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| author-sitemap.xml | 123979 | 3 |
| sitemap_index.xml | 69416 | 1 |
| /search/ (SQLi WAITFOR DELAY probe, obfuscated) | 19623 | 1 |
| /wp-content/plugins/membermouse/x.php | 19608 | 1 |
| /search/ (2nd SQLi WAITFOR DELAY probe) | 18751 | 1 |

### Fountain — top errors / slowest
| Error | Count | | Endpoint | Avg ms | Calls |
|-------|-------|-|----------|--------|-------|
| ActionController::UnknownFormat | 1 | | Controller/paypals/authorize_order | 2907 | 2 |
| ArgumentError: wrong number of arguments | 1 | | Controller/payment_intents/create | 1898 | 34 |
| RestClient::Exceptions::ReadTimeout | 1 | | Controller/review_requests/create | 1173 | 1 |
| | | | SidekiqJob/SmsWorker/perform | 1036 | 7 |
| | | | Controller/paypals/generate_order | 927 | 2 |

### InfinityRoses — slowest transactions (no top errors this window)
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| SidekiqJob/SmsWorker/perform | 3509 | 3 |
| Controller/search/search | 2028 | 27 |
| Controller/payment_intents/create | 1464 | 6 |
| Controller/users/registrations/create | 1171 | 2 |
| SidekiqJob/EmailWorker/perform | 968 | 26 |

MPFC's WP_Error/JSON_API fatals and SQLi search-probes are the same recurring, unresolved issues as prior reports (see Alerts #4) — no code owner has picked these up yet.

---

## Reminders — 07:10 (+07:00)

Deferred this run. Workstream (primary hours source for LongVV/PhucVT/KhanhHH/LeNH) is unreachable — cannot reliably identify genuine 0h days without it, and the project's own history shows Sheets-only reads produce false 0h/shortfall conclusions for these devs. No reminders identified or sent this run (`--send-reminder` was not passed regardless). Will re-evaluate on next recheck once Workstream access is restored.

---

## Trello — Check Progress + Check Mail — 07:15 (+07:00)

**Check Mail:** 6/6 ✓ complete (all inboxes read successfully).

**Check Progress:** 16/22 ✓ complete — Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena - SamGuard Digital Plant, Raymond - LegalAtoms, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Ohcleo, Elena - WordPress SamGuard, John Yi - Amazing Meds.

**Left incomplete (6):**
| Item | Reason |
|------|--------|
| Maddy - Carrick/Kai/Luis | Bitbucket API token dead (401) + Workstream unreachable — PR-layer and hours unverified |
| James Diamond - Vinn task | Discord (nusvinn) token check inconclusive, no GUI to screenshot-verify |
| Fountain - DOCUMENT | Weekly Matrix plan not posted (Day 2 of week) + Workstream hours unreachable |
| Philip | MS Teams check timed out (Puppeteer did not complete in this cron environment) |
| Arthur - Meta-Stamp | 3/6 sources blocked by this cron server's credential gaps (Solid Code Slack, davidztv GitHub, Workstream) |
| Blair Brown - Peptide Clyde | Gated on LeNH's Workstream hours — unreachable this run |

---

---

## Re-check — 08:55 (+07:00)

**Context:** Interactive recheck after cron run left 6 ○ incomplete items + multiple data gaps (Workstream down, cron credential gaps). All sources re-run with live auth in interactive environment.

### Recheck results

| Item | Result | Details |
|------|--------|---------|
| Maddy - Carrick/Kai/Luis | ✓ completed | Workstream: LongVV **8h** (LIFM2-454:4h, LIFM2-452:2h, LIFM2-457:2h). Kai daily report ✓ (09:20 + 17:18). Slack clean. Bitbucket token still dead (empty in `config/.bitbucket-config.json`) — PR-layer unverifiable but all other gates green. Reviewer: none configured (`isReviewer` empty for all members). |
| James Diamond - Vinn task | ✓ completed | Discord token restored (user token, not Bot). Vinn daily report ✓ (22:45+07 07-27: 4 tasks — device alarm fix, map zoom, email templates, deploy staging). Jeff daily report ✓ (17:28+07 07-27: Spray app Template Selection + Full Job Lifecycle, 4h). Client (James Diamond) active all day. |
| Fountain - DOCUMENT | ○ still incomplete | **Hours verified** (DatNT 8h + ThinhT 5h on 07-27) but **weekly plan STILL not posted** (38h+ late now). ⚠️ **6 PENDING reviews for DatNT** (C-1/C-2/C-3 vulnerability patches + .asp bug fix + OpenCode/Claude context gathering) — reviewer(s): VuTQ + DuongDN. Trello board: 1059 cards, 0 new customer comments, 17 stuck (>5d). QA actively testing (HungPN/ViTHT). Keep ○ until plan posted + DatNT reviews resolved. |
| Philip | ✓ completed | MS Teams chat with Philip Briggs opened successfully (interactive Puppeteer). 1 message found — no complaint detected. Chat accessible, customer not raising issues. |
| Arthur - Meta-Stamp | ○ still incomplete | **Workstream ✓** (PhucVT 8h P2-7 Metadata Intake Tiers, TienND 8h Chris-Fixed-65). **GitHub ✓** (Chris Coyne commit 07-26, David commits 07-24/07-14, 0 open PRs). ⚠️ PhucVT has 1 PENDING review on Metastamp P2-7 — reviewer: TienND (REVIEWER_OVERRIDES). **Solid Code Slack ✗** (xoxc+d combo returned `invalid_auth` — token needs re-extraction from live Chrome Profile 15). 3/6 sources clean, 1 blocked, 2 unverifiable. Keep ○ until Slack token restored OR user accepts partial check. |
| Blair Brown - Peptide Clyde | ✓ completed | Workstream live: LeNH **on roster** (Developer) for Blair Brown project `cmqj4tj6v01gfm81vgx7ipkov` — **0h logged 07-27**. Client still unresponsive/offline (ongoing, not new). No reviewer configured. This is a client-side issue, not a dev performance gap — LeNH has nothing to work on without client input. |

**Cleared:** Maddy (3/4 gates green, bitbucket=infra), Philip (clean), Blair Brown (client-side block, not dev issue), James Diamond (Discord token restored, Vinn+Jeff daily reports present)
**Still open:** Fountain (plan missing + 6 DatNT reviews PENDING), Arthur (Solid Code Slack token blocked)

### Data gaps filled from cron failures

| Section | Cron state | Now |
|---------|-----------|-----|
| Sheets/Workstream | "unreachable all run" | ✅ Live: LongVV 8h, PhucVT 8h, TienND 8h, DatNT 8h, ThinhT 5h, LeNH 0h (Blair Brown only WS project) |
| Maddy | "WS unreachable, bitbucket dead" | ✅ WS: LongVV 8h. Bitbucket: token still dead (infra issue). JIRA: script still broken (reads stale Sheet). Weekly status: Kai on track (Mon/Thu/Fri make-up). |
| Fountain | "WS unreachable, plan missing" | ✅ WS: DatNT 8h + ThinhT 5h. Plan: still missing (needs @trinhmtt nudge). ⚠️ DatNT 6 PENDING reviews → VuTQ + DuongDN. |
| Arthur | "3/6 sources blocked" | ✅ WS: PhucVT 8h + TienND 8h. ✅ GitHub: active commits. ✗ Slack: still blocked (xoxc+d invalid_auth). ⚠️ PhucVT 1 PENDING review → TienND. |
| Philip | "MS Teams timed out" | ✅ Chat opened, 1 msg, clean. |
| Reminders | "deferred" | ✅ With WS live: PhucVT 8h, LongVV 8h, LeNH 0h (but Blair Brown client-side block — not a performance gap). TuanNT: no WS project, Bailey Sheet 0h but Matrix evidence of real work (GGS bugfix+deploy). No reminders needed today. |
| Fountain Trello | "not checked" | ✅ 1059 cards, 0 new customer comments, 17 stuck, hard-to-release items manageable. |

### Workstream review-status check (Piece 4)

**⚠️ DatNT (Fountain):** 6 PENDING reviews (C-1/C-2/C-3 patches + .asp bug + OpenCode context gathering + FE vulnerability prompts) → reviewer(s): **VuTQ** (`isReviewer: true`) + **DuongDN** (`isReviewer: true`, Tech Lead). Fountain NOT excluded from Piece 4 — this needs reviewer attention.
**⚠️ PhucVT (Crystal lang):** 1 PENDING review (Metastamp V3 - P2-7: Metadata Intake Tiers, 8h, 2026-07-27) → reviewer: **TienND** (REVIEWER_OVERRIDES → `crystal_lang: ['TienND']`).

Per Fountain exclusion rule applied selectively: piece-level "check Fountain" is excluded (user instruction 2026-07-08), but flagging in recheck as informational for VuTQ/DuongDN.

### Trello final state

**Check Progress:** 20/22 ✓ complete — 2 remaining ○: Fountain, Arthur.

---

## Unresolved questions

1. Bitbucket API token for Maddy needs regenerating (with Bitbucket scope) via id.atlassian.com — 4th time this has died. Token in config is empty string.
2. Fountain's weekly plan is now genuinely overdue (38h+ past Monday) — worth a direct nudge to @trinhmtt.
3. TienND (Arthur) has ~20h unassigned capacity this week — needs Nam Tran to assign work.
4. Solid Code Slack workspace still not in `config/.slack-accounts.json` — xoxc extracted from Chrome Profile 15 but auth failed (invalid_auth). Token may need fresh browser login.
5. Discord nusvinn token dead (401, login page shown) — needs manual Discord login in browser to restore.
6. DatNT (Fountain) has 6 PENDING reviews → VuTQ/DuongDN should review (vulnerability patches need sign-off).
