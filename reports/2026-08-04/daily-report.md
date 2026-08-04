# Daily Report — 2026-08-04 (Tuesday)

**Run:** 2026-08-04T07:05:00+07:00 (cron)
**Window:** 2026-08-03T09:07:00+07:00 → 2026-08-04T07:05:00+07:00
**Leave plan:** No new leave notices found for today beyond the standing Matrix "Delivery - Resource Arrangement" log (VuTQ half-day 08-03, TuanNT away 08-10/11, DatNT 08-07, ThoTNT half-day 08-03, KhanhPQ 08-10 — all already processed per halt's confirmation).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack — Baamboozle (Aysar) | Carrick's daily "Today's update" in the Aysar MPDM (`C07SQ4HAUHZ`) has **zero messages since 2026-08-01 00:00** — 3+ days missing, not just today. |
| 2 | Slack — RDC (Franc) | dmetiner (customer) reported a new bug at 17:02 08-03 ("Failed to delete user: Database query failed") — no reply from Carrick found since, ~14h unanswered as of this run. |
| 3 | Email — rick@ / New Relic (Fountain) | Real production errors: Rollbar `[FountainGifts] production #298` (x2, 10-occurrence), `#286 RuntimeError` (x2), `[FirstProject] production #1089`. Cross-confirmed by New Relic: Fountain top errors show `ArgumentError wrong number of arguments` 48x + **new** `ActionController::InvalidAuthenticityToken` (CSRF) 19x this window. |
| 4 | New Relic — MPFC | Apdex still poor at 0.57 (chronic). `WP_Error::get_method()` persists 58x. **Active SQL-injection probing** — 4 of 5 slowest transactions this window are `WAITFOR DELAY` probes against `/search/`. `sitemap_index.xml` 54.8s / `author-sitemap.xml` 44.0s. |
| 5 | Workstream (infra) | Genuine SSO outage this run — 4 separate verified attempts (2x `workstream-fetch-project-week.js`, 2x `workstream-login.js` after clearing stale Chrome profile locks) all failed identically: "SSO redirect detected, Keycloak cookies alive, but API never fired." Blocks Sheets/Workstream verification for **Maddy, John Yi, James Diamond, Elliott, Bailey, Rebecca, Blair Brown**, and Fountain Part 2/3 task-log actuals. Matches the recurring pattern already logged in `weekly_report` (07-26/07-31/08-01). |
| 6 | Upwork — Neural Contract | carrick's real Chrome (Profile 1) Upwork session is logged out — fresh cookie extraction wrote 0 cookies, all 4 automated retry attempts hit the login redirect. Needs one manual login on that machine; not treated as an alert per the Neural silence-is-never-an-alert rule, but flagging since it also blocks Rory/Aysar Upwork checks (not run this pass). |
| 7 | MS Teams — Philip (will@) | Microsoft flagged the sign-in as suspicious ("Help us protect your account") and looped on identity confirmation for 21+ polling cycles — automated login cannot get past it. Needs manual verification on that account once. |
| 8 | Sheets — TuanNT / Bailey-Paturevision | Paturevision sheet (the one project with **no** Workstream equivalent, Sheets-authoritative) shows **0h for TuanNT on 08-03**, vs. a healthy 8h baseline on 07-28. Cannot cross-check via Workstream this run (see #5). Needs recheck once WS is back. |

**Today (Tue Aug 4):** No dev fully out; half-day/travel notices already processed in Matrix resource-arrangement log (see Leave plan above). All present.

---

## Email — all — 07:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | Binh Nguyen relayed TrinhMTT's leave-request thread (routine, no calendar conflict) | no events |
| carrick@nustechnology.com | 9 | GitLab pipeline failed on carrick's own XiD SaaS Backend repo (not Redmine/Generator/Elliott — outside this account's filter scope, noted only) | no events |
| nick@nustechnology.com | 9 | None from John Yi — all Azure DevOps PR notifications for unrelated CNA.Operations.App project | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 40 | **See ALERTS #3** — real Fountain/InfinityRoses/FirstProject production errors | 10:30 OmniGPT Daily Sync; 12:30 HEAL Meeting |
| kai@nustechnology.com | 7 | 7 JIRA mentions from Madhuraka/Anoma re: LIFM2-446/450/455/436/457 — routine ticket assignment, no blocker | no events |
| ken@nustechnology.com | 80 | No Precognize/development traffic found — all noise is unrelated `welligence/*` and `mimaizumi/*` repo notifications landing in the NewsLetter folder | 08:30 DE Daily Standup (x2 dup) / 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 9 | 6x "Signal lost for 10 minutes on Low Application Throughput" (Swish New Relic) + 1x Cybersecurity newsletter — flagged per account's [HIGH]/Signal-lost rule | — |
| dnduongus@gmail.com | 18 | 0 real alerts (all newsletter/bank/LinkedIn noise, correctly excluded per personal-Gmail security-only filter) | — |
| davidztv19@gmail.com | 3 | Stripe "Update your account to receive funds from META-STAMP" — project-relevant (Arthur payout setup); MongoDB/Basecamp noise ignored | — |
| freelancer@mypersonalfootballcoach.com | 3 | Rollbar Daily Summary + New Relic report + Rollbar `#50 WP_Error::get_method()` — matches known chronic MPFC bug, see Performance section | — |

Trello: DuongDn, Carrick, Nick, Kai, Ken items ✓ complete. **Rick item left incomplete** (real unaddressed Fountain/InfinityRoses production alerts, see ALERTS #3).

---

## Slack — all — 07:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 15 (general `testing` channel) | Carrick/skjamie25/notmedesign iterating on moderator-status bug and Vietnamese font rendering. **Aysar MPDM gate separately checked — see ALERTS #1.** |
| RDC - FM Monitoring | 13 | Carrick + dmetiner fixing tuner devices, admin panel functions. **New unanswered bug report — see ALERTS #2.** |
| Swift Studio | 0 | Clean. |
| Xtreme Soft Solutions | 1 | kai: "ok" (09:34+07) — not a full daily report; Workstream Maddy-hours gate unverified this run (see ALERTS #5), so cannot apply the conditional check. |
| SAM GUARD - Mobile | 0 | Clean. |
| Global Grazing Services | 5 | Nick posted his daily report at 17:21+07 (#maintenance) — present, no alert. Joey/Nick discussing RDS db work + Prestashop UI bugs. |
| Amazing Meds | 0 | Clean (xoxc token auto-refreshed successfully). |
| Generator | 13 | rudi/carrick doing normal MR review cycle (Stripe payout logic) — active, healthy. |
| LegalAtoms | 0 | Clean (Nick-specific filter). |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 0 | Clean. |
| Equanimity | 14 | Carrick/Marcel — password reset request, $30 bonus-for-1-extra-hour ask, device troubleshooting. Normal ops. |
| SoCal Auto Wraps | — | Dropped 2026-05-11, not monitored. |
| Aigile Dev | 5 | All bot traffic: Sentry morning check (0 urgent, 6 known standing) + 4x AWS CodeDeploy ✅ success notifications. Clean. |

Trello: Rory, MPFC, Marcel, Elliott(partial-see below), Elena, Raymond, Colin ✓ handled per Trello section. Aysar, Franc ⚠️ skipped (alerts).

---

## OhCleo Slack — 07:22 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 23 | Tony posted his daily report at 12:00+07 (Mobile profile/track-pausing fixes, BE email flow activation, anonymous newsletter popup). Celine had login/free-listens questions — all resolved by Tony same session. |
| #events-code | 0 (channel_not_found) | Known dormant/inaccessible channel — unchanged from prior runs. |

Tony daily report: present at 12:00. No unresolved customer asks. Trello: Ohcleo ✓ complete.

---

## Discord — all — 07:24 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 17 | Vinn posted daily report 16:07+07 (Map orientation/scale feature shipped to staging + tested). Jeff Trinh posted his 4h daily report 17:35+07 (Spray App TestFlight build). James Diamond (client) asked several feature/UX questions 23:41-23:57 UTC (06:41-06:57+07, i.e. within the last ~25 min of this window) — one flagged as "investigating" by bellatric02 at window close; rest too recent to judge as unanswered yet. |
| Bizurk (nuscarrick) | 0 | Clean, no Andrew Taraba DMs. |

Trello: James Diamond ⚠️ left open (see Trello section — sheets gate unverified + very recent client questions). Andrew Taraba ✓ complete.

---

## Google Sheets / Workstream — all — 07:35 (+07:00)

🔴 **Workstream SSO down this entire run** — see ALERTS #5 for the 4 verified failed attempts. Fell back to Google Sheets per the documented fallback rule (`SKIP_WORKSTREAM=1`), scanning all 13 sheets for 2026-08-03:

| Developer | Sheets total (08-03) | Workstream | Status |
|-----------|----------------------|------------|--------|
| LongVV | 0h across all sheets | unavailable | Sheets are known-stale for LongVV (all work moved to Workstream) — **not** treated as a real 0h alert on its own. Cannot verify weekly total (16h/wk threshold) this run. |
| PhucVT | 0h across all sheets | unavailable | Same — Sheets stale for PhucVT's current projects (Arthur/Brad Ballantine, both Workstream/Matrix-tracked). Not a reliable 0h signal. |
| TuanNT | 0h across all sheets, **including Paturevision (0h vs 8h baseline 07-28)** | unavailable | Paturevision is the one project Sheets are still authoritative for (no Workstream project exists). This 0h **is** a real signal worth flagging — see ALERTS #8. |
| KhanhHH | 0h across all sheets | unavailable | Same staleness caveat as LongVV/PhucVT. |
| LeNH | 0h across all sheets | unavailable | Same staleness caveat. |

Maddy JIRA weekly cross-check: **could not run** — `maddy-jira-tasklog-check.js` also depends on live Workstream auth, failed with the same SSO outage.

Trello: Maddy, John Yi, Elliott, Bailey, Rebecca, Blair Brown ⚠️ left incomplete pending Workstream recovery (see Trello section).

---

## Fountain — 07:15 (+07:00)

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted the week's plan at 08:34 (ThinhT 20h / DatNT 40h / ViTHT 40h => QC 25h), then revised at 11:15 (ThinhT 20h / DatNT 32h / ViTHT 40h / **VuTQ 8h** => QC 25h). New team member DatNT is now on the roster. Team actively working PRs (#2994 NoMethodError in orders#status) and bugs (#2380 delivery-date modal, branch `fountain/2380_delivery_date_of_cart_item`).

**Part 2 — Task Log Actuals:** Workstream primary source unavailable (ALERTS #5). Fallback Summary-tab sheet shows `actual: 0.00` for the week of 08-03–08-09 (day 1 of the week, expected to lag — not itself an alert).

**Part 3 — Plan vs Actual:** Cannot be computed this run — no actuals available yet.

**Trello board:** 0 new customer comments (kunalsheth/tmmckay/mike62798179/iris63293413) since last run. "Doing" list: 7 active cards, closest to the 14-day hard-to-release threshold is "Fountain - Gift of Choice (Business tab)" at 13.9 days (not yet over).

Trello: Fountain ⚠️ left incomplete (Parts 2/3 unverifiable this run).

---

## Elena — 07:26 (+07:00)

- **PRs:** 0 open PRs on `nustechnology/Elena-SamGuard-Digital-Plant` (duongdn account). Nothing to merge/deploy.
- **Precognize:** 0 open PRs authored by nusken on `Precognize/development`.
- **WordPress (samguard.co):** Clean — 0 JS errors, 0 page errors, **0 CSP violations**. Only benign GA/ads analytics `failedRequests` (no CSP directive violations). This resolves the prior run's "HTTP 500" note — site healthy now.

Trello: Elena - SamGuard ✓ complete. Elena - WordPress SamGuard ✓ complete.

---

## Trello — progress/mail — 07:40 (+07:00)

- Maddy: ⚠️ skipped — Workstream Maddy-hours gate unverifiable (ALERTS #5)
- John Yi - Amazing Meds: ⚠️ skipped — TuanNT sheets gate unverifiable + 0h Paturevision signal (ALERTS #8)
- James Diamond - Vinn task: ⚠️ skipped — PhucVT sheets gate unverifiable + very recent unanswered client questions
- Franc: ⚠️ skipped — new unanswered customer bug report (ALERTS #2)
- Rory: ✓ complete — Slack swift clean; Upwork session expired (carrick's Chrome logged out) is a session failure, not an alert, per standing rule
- Aysar: ⚠️ skipped — Carrick's daily update missing 3+ days (ALERTS #1)
- Elliott: ⚠️ skipped — KhanhHH sheets gate unverifiable (ALERTS #5)
- Raymond - LegalAtoms: ✓ complete — clean
- Marcel: ✓ complete — clean, normal ops
- Colin: ✓ complete — clean
- Andrew Taraba: ✓ complete — clean
- Elena - SamGuard: ✓ complete
- MPFC: ✓ complete — clean Slack; New Relic issue tracked separately (informational, not Trello-gated)
- Bailey: ⚠️ skipped — TuanNT 0h Paturevision signal unverified (ALERTS #8)
- Fountain: ⚠️ skipped — Parts 2/3 unverifiable (ALERTS #5)
- Rebecca (William Bills): ⚠️ skipped — TuanNT sheets gate unverifiable (ALERTS #5/#8)
- Neural Contract: ✓ complete — silence rule applies regardless of Upwork session state
- Philip: ⚠️ skipped — MS Teams blocked by Microsoft identity-verification challenge (ALERTS #7)
- Ohcleo: ✓ complete
- Arthur - Meta-Stamp: ✓ complete — see Arthur section
- Blair Brown - Peptide Clyde: ⚠️ skipped — covered by LeNH's Workstream scan, unverifiable this run (ALERTS #5)
- Elena - WordPress SamGuard: ✓ complete

**Check Mail:** DuongDn, Carrick, Nick, Kai, Ken ✓ complete. Rick ⚠️ skipped (ALERTS #3).

Card not auto-completed (multiple items still open).

---

## Reminders — 07:42 (+07:00)

**Not run this pass.** The underlying Sheets data for LongVV/PhucVT/KhanhHH/LeNH shows 0h today, but this is confirmed to reflect Workstream-outage staleness (ALERTS #5), not real absence — sending "0h logged" reminders off unverified data risks a false accusation (see prior KhanhHH incident memory). Will re-run once Workstream is back. No sends attempted (no `--send-reminder` flag present regardless).

---

## Matrix — 07:37 (+07:00)

**Active rooms: 20 / 138 | Messages: 614** *(since 2026-08-03 08:00)*
Full details: reports/2026-08-04/matrix-rooms-0734.md

### ⚠️ Action items for DuongDN (1, resolved same day)

| Room | Time | Message |
|------|------|---------|
| Bailey/Paturevision billing room | 10:33 | thuyltt: "T gửi số tiền cần báo Marcel gửi bonus nha Dương: $30/hour x 1 hour over the limit = **$30**" — ✅ confirmed sent by 10:53 ("đã báo nha bạn") |

### Key updates

**Bailey/ZKTeco face-recognition image quality (internal, ongoing)**: 114-message deep technical thread between namtv and duongdn debugging why face-template image quality is poor for some tenants (Nakano/Unitec/Simlian). Root-caused to aggressive JPEG resize-to-100KB logic collapsing pixel dimensions, not just file size. Action: write proper resize logic capping at 800x600 while keeping the raw original — not yet implemented, in-progress.

**Marcel/XID tracker incident**: LongVV accidentally logged 6h "Training Python" against a tracker meant for Marcel work, then misread an instruction to "list" screenshots as "delete" and removed some — duongdn had to explicitly and firmly reiterate the standing rule to never delete tracker screenshots. Resolved same day (18:41), logged as a lesson-learned for LongVV.

**Bailey/Paturevision billing reconciliation (thuyltt ↔ duongdn, 77 messages)**: Extended back-and-forth reconciling LongVV's Workstream-logged hours vs. what was reported/charged for the week of 07/27–08/02 — tracker screenshots trimmed to match the 8h authorized charge, ended at 8:10 total (10 min over, since cleaned up). Both sides now aligned; no outstanding discrepancy.

**Arthur - Meta-Stamp scope clarification**: TienND and PhucVT worked through several client-flagged items (timestamp UTC labeling, pre-checked rights-attestation checkbox) with namtv to classify as in-scope vs. small-effort-but-out-of-scope goodwill fixes — resolved, work started on in-scope items same day. (Cross-checked against GitHub: 2 real commits landed same day implementing exactly the UTC-labeled timestamps + several other client-requested fixes — see Arthur section.)

**Elena - Active Alerts (Precognize, 84 messages)**: Normal active sprint — dynamic alert-type icons, audit-log link/unlink UI, redmine bug fixes, deployed same day. No customer-facing issues.

**Celine - OhCleo (145 messages)**: Team actively shipping (email flow, popup subscribe form, mobile profile fixes); consistent with the OhCleo Slack section above — no new concerns beyond what's already tracked.

**Other:**
- Kunal - Fountain: covered in Fountain section above.
- Brad Ballantine - Auction Warehouse: PhucVT prioritizing Arthur work over this; Insurance Salvage Australia site DNS propagated, still pending logo/WP-user-creation/redirect/launch + a customer message flagged to duongdn at 13:24 (unread content not captured, needs follow-up).
- NUS - Bailey - Paturevision: customer replied on AWS question; new small task (~16-20h estimate) queued pending QC sizing.
- HR/admin: National Day holiday schedule announced; CDF review reminder to vutq; recruitment pipeline update (60 CVs, 8 shortlisted) — no action needed from DuongDN.

---

## Performance — all — 07:45 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.93 | 406ms | 2.96% (769/25956) — 94.8% benign NotAuthenticated/InvalidToken | 19.2/min |
| MPFC | 0.57 (poor) | 1049ms | 0.30% (107/36068) but see slow-transaction detail below | 26.7/min |
| Fountain Gifts | 0.99 | 123ms | 0.15% (54/36144) | 26.8/min |
| InfinityRoses | 0.97 | 152ms | 0.01% (1/10348) | 7.7/min |

**OhCleo — top errors (all benign auth noise):**
| Error | Count |
|---|---|
| NotAuthenticated | 729 |
| InvalidToken | 14 |
| AuthenticationFailed (bad password) | 11 |
| AuthenticationFailed (user not found) | 8 |
| ValidationError (duplicate email/username) | 3+1 |
| ValidationError (email not found) | 2 |

**OhCleo — slowest transactions:**
| Endpoint | Avg ms | Calls |
|---|---|---|
| MediaByKeyView.get | 9717 | 391 |
| MediaListView.get | 2491 | 28 |
| HomeMediasView.get | 2299 | 631 |
| GetBookMarkDetailsView.get | 2239 | 637 |
| MediaRecommendsView.get | 1101 | 898 |

MediaByKeyView worsened again (9717ms vs 8263ms last run) — unresolved for weeks, still the dominant slow endpoint.

**MPFC — top errors:**
| Error | Count |
|---|---|
| `WP_Error::get_method()` undefined method | 58 |
| `"continue" targeting switch is equivalent to "break"` (E_WARNING) | 48 |
| `require(): Failed opening ABSPATHwp-includes/version.php` (E_COMPILE_ERROR) | 1 |

**MPFC — slowest transactions:**
| Endpoint | Avg ms | Calls |
|---|---|---|
| sitemap_index.xml | 54775 | 1 |
| author-sitemap.xml | 43967 | 1 |
| /search/...WAITFOR DELAY... /feed/rss2/ | 13227 | 1 |
| /search/...WAITFOR DELAY... /feed/rss2/ | 12974 | 1 |
| /search/...WAITFOR DELAY '0:0:15'--... /feed/rss2/ | 12550 | 1 |

4 of 5 slowest transactions are active SQL-injection timing probes against `/search/` — see ALERTS #4.

**Fountain — top errors:**
| Error | Count |
|---|---|
| ArgumentError (wrong number of arguments, 3 given/2 expected) | 48 |
| InvalidAuthenticityToken (CSRF) — **new this window** | 19 |

**Fountain — slowest transactions:** all under 2.6s (paypals/authorize_order 2559ms, pro_orders/show 2137ms, payment_intents/create 1910ms) — no real bottleneck.

**InfinityRoses — top errors:** 1x `NoMethodError: undefined method 'id' for nil:NilClass` (order.user_id check) — minor, healthy overall.

---

## Arthur - Meta-Stamp / Crystal lang — 07:50 (+07:00)

**Tóm tắt nhanh:** 2/4 nguồn verify được lần này (Matrix ✓, GitHub ✓) — Slack "Solid Code" vẫn chưa được config trên server này (lặp lại gap cũ nhiều lần), Workstream Crystal lang bị chặn do SSO outage toàn hệ thống (ALERTS #5). Không tìm thấy vấn đề mới của khách hàng chưa giải quyết — thực tế còn có tiến triển tốt (code đã fix đúng cái team đang thảo luận sáng nay).

**Chi tiết mới:**
- Matrix (2 rooms): TienND + PhucVT làm việc với namtv để phân loại các item khách yêu cầu — item A13 (timestamp hiện UTC, không rõ label) được xác nhận là **cần làm** (không phải CR ngoài scope), item #2 (checkbox rights-attestation bị pre-checked từ lần upload trước) và 2 item nhỏ khác được đánh giá là ngoài scope nhưng effort thấp nên vẫn hỗ trợ làm luôn. Không có câu hỏi/complaint nào của khách chưa trả lời.
- GitHub (`Christebob/Meta_Stamp_V3`, davidztv account): 0 PR mở (mọi thứ merge thẳng vào main). **2 commit mới** cùng ngày (14:45-14:46+07 08-03) bởi davidztv, nội dung khớp chính xác với thảo luận trên Matrix: sửa "Fingerprint Verified" claim giả (chặn digest rỗng/placeholder), thêm API `GET /api/v1/stats/creator` làm nguồn dữ liệu thống nhất cho Dashboard/Pockets, hiện split theo creator's share thay vì gross, gắn owner cho mỗi pocket card, **timestamp giờ hiện UTC có label rõ ràng** (đúng item A13 vừa thảo luận), và sửa lỗi login loop do `offline_access` scope không hợp lệ với Auth0.
- Slack "Solid Code": vẫn KHÔNG có trong config server này — chưa verify được lần này.
- Workstream (Crystal lang, roster DuongDN/PhucVT/TienND): bị chặn do outage SSO toàn hệ thống, không lấy được giờ.

**BẢNG THEO DÕI:** không có item mới cần theo dõi lần này — chỉ tiếp tục các mục cũ (không có gì thay đổi trạng thái đáng kể ngoài các fix code kể trên).

**Câu hỏi cần anh xác nhận/quyết định:** Không có.

`arthur_monitor.last_run` advanced to 2026-08-03T09:07:00+07:00 (matching daily_report window) — no unresolved client issue found, consistent with the 2/4-source partial-verification precedent used on 07-29/07-31/08-03.

Trello: Arthur - Meta-Stamp ✓ complete.

---

## Unresolved questions

1. Workstream SSO outage — needs a human session refresh (SSO redirect succeeds, Keycloak cookies alive, but the token API never fires). Blocks 7 Trello gates until fixed.
2. carrick's Upwork Chrome (Profile 1) session is logged out — needs one manual login to restore Neural/Rory/Aysar Upwork checks.
3. Philip's MS Teams (will@) account is being challenged by Microsoft's suspicious-sign-in flow — needs manual verification once, outside the automated headless flow.
4. TuanNT's 0h in Paturevision (08-03) — genuine shortfall or just Workstream-outage noise bleeding into the one Sheets-authoritative project? Needs recheck once WS is back.
5. Brad Ballantine customer message flagged at 13:24 08-03 (Matrix `!zfXpcHSkwqWylFrApi`) — content not captured in this pass, needs follow-up read.
