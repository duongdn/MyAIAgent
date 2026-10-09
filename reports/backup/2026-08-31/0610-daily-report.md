# Daily Report — 2026-08-31 (Monday)

**Run:** 2026-08-31T06:10:00+07:00 (cron)
**Window:** 2026-08-28T08:30:00+07:00 → now (~3 day gap — daily-report cron did not produce output on 08-29/08-30, only news-digest ran those days)
**Leave plan:** not checked this pass

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (carrick@) | "URGENT HELP PLEASE" thread recurring 3x (Fri 09:23, 09:33, Sun 21:56) — appears unresolved as of window end |
| 2 | Email (rick@) | Fountain/InfinityRoses production error volume — InfinityRoses #446-449 (ArgumentError/TypeError/NoMethodError), FountainStaging ShipStation ReadTimeout |
| 3 | Email (freelancer@mpfc) | MPFC production Rollbar: `WP_Error::get_method()` fatal recurring (10-occurrence bursts Fri/Sun) — matches chronic Performance finding below |
| 4 | Email (vuongtrancr@) | Swish "Signal lost" noise (chronic) + Delayed-newform 10-occurrence error burst 08-28 15:32 |
| 5 | Matrix (Celine - OhCleo / Project Wrap Up) | Direct asks to DuongDN: PhucVT left early asking DuongDN/LongVV to monitor OhCleo; namtv relaying Celine/Minh complaint about slow homepage load — unresolved as of window end |
| 6 | Performance (OhCleo) | MediaByKeyView.get avg 20.8s/823 calls, MediaByTagsView.get 16.9s/485 calls — chronic, worsened. Matches Matrix slow-homepage complaint (#5) |
| 7 | Performance (MPFC) | Apdex 0.57 (poor, chronic). `WP_Error::get_method()` fatal 135x this window, sitemap endpoints 43-52s |
| 8 | Elena (GitHub) | PR #309 still open, last updated 2026-08-11 — now 20 days stale |

**Today (Mon Aug 31):** leave plan not checked this pass.

🔴 **Scope note:** This run covers Email, Discord, Scrin.io, Matrix, New Relic Performance (OhCleo+MPFC), and Elena PR check with real live data. Slack (14 workspaces), Google Sheets/Workstream hours, Fountain 3-part check, Trello reconciliation, Reminders, OhCleo dedicated Slack, Arthur/Meta-Stamp, and Upwork Memo were **not run this pass** — the 3-day backlog (no daily-report since 08-28) made a full 15-piece run infeasible in one sitting. These need an interactive recheck pass. No Trello items touched this run (avoiding false completions on unverified sources).

---

## Email — all 10 accounts — 06:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | 0 | not checked |
| carrick@nustechnology.com | 8 | 6 | not checked |
| nick@nustechnology.com | 0 | 0 | not checked |
| rick@nustechnology.com | 65 | 50 | not checked |
| kai@nustechnology.com | 6 | 3 (JIRA LIFM2-449/428 mentions) | not checked |
| ken@nustechnology.com | 80 | 4 (Sentry, Precognize PR #7617) | 2 recurring Teams standups today |
| vuongtrancr@gmail.com | 39 | 37 (mostly chronic "Signal lost" Swish noise) | — |
| dnduongus@gmail.com | 67 | 4 (AWS Free Tier notice, domain-expiry notice — not security breaches, not flagged further) | — |
| davidztv19@gmail.com | 4 | 0 (Railway/Loom/Basecamp newsletters + Basecamp verification code) | — |
| freelancer@mypersonalfootballcoach.com | 7 | 5 (Rollbar production, see alert #3) | — |

**carrick@ detail:** "URGENT HELP PLEASE" thread recurring — Fri 09:23/09:33 +0100 and again Sun 21:56 +0100. Also: GitLab pipeline failure (definitive-guide staging), SoCal Auto Wraps production error burst 08-28.

**rick@ detail:** Heavy Fountain/InfinityRoses Rollbar/BugSnag volume — InfinityRoses #446 ArgumentError, #447/#448 TypeError can't-cast, #449 NoMethodError; FountainStaging ShipStation Net::ReadTimeout; Fountain event rate-limiting notice.

Trello: mail items not updated this run (see scope note).

---

## Discord — AirAgri + Bizurk — 06:05 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 19 | Vinn + Jeff both posted daily reports; James Diamond active coordinating WhatsApp check-in URL + Visitor app invites; Mary tested Hazard Zone Alert/Check-in features |
| Bizurk (nuscarrick) | 0 | no activity |

No alerts — Vinn and Jeff both reported.

---

## Scrin.io (Nick @ John Yi company account — 2026-08-30) — 06:05 (+07:00)

0h — no sessions recorded. Not TuanNT evidence.

---

## Matrix — 06:01 (+07:00)

**Active rooms: 24 / 144 | Messages: 656** *(since 2026-08-28 08:30)*
Full details: reports/2026-08-31/matrix-rooms-0601.md (raw dump — not yet summarized per-room, time-boxed this pass)

### ⚠️ Action items for DuongDN (4)

| Room | Time | Message |
|------|------|---------|
| Celine - OhCleo | 10:57 | minhtv: "Plan tuần lễ nha mọi người: PhucVT 24h, LuHX có task tính. Note: nếu khách cần tăng tốc, nội bộ team có thể cần hỗ trợ thêm từ anh DuongDN hoặc LongVV" — capacity heads-up, no immediate action |
| Celine - OhCleo | 16:24 | phucvt: "Em thấy nó ổn hơn rồi á. Mà đừng có nhảy vô check một lượt nha, nó treo nữa á. Em có việc về sớm nên nhờ a Dương với Long monitor xem giùm em nha." — asked DuongDN/LongVV to cover monitoring while he left early ⚠️ |
| Celine - OhCleo | 16:26 | minhtv: "Phúc về rồi, cần có gì đó report lại khách a Dương ơi" — asked DuongDN to report to client if anything comes up ⚠️ |
| Project Wrap Up - Preventive Actions | 16:17 | namtv: "Bên Celine, Minh nó phàn nàn BE quá. Cái web homepage load gì mấy phút... Cần xử lý chứ load vậy user nào chờ nổi" — relaying client complaint about slow homepage load ⚠️ (matches Performance alert #6 — MediaByKeyView 20.8s avg) |

**656 messages across 24 rooms not yet summarized per-project this pass** — see raw file for full detail. Recommend interactive recheck to complete room-by-room summaries and Trello gating.

---

## Performance — OhCleo + MPFC — 06:08 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| OhCleo (prod) | 0.89 | 1193ms | 2.8% (2156/76555) — top classes: password mismatch (8x), duplicate email/username on signup (11x), invalid verification code (3x) — all benign user-input errors | 17.9/min |
| MPFC | 0.57 (poor, chronic) | 1045ms | 0.6% (366/64030) but dominated by fatal `WP_Error::get_method()` | 14.9/min |

**OhCleo slow transactions (>5s):**
- MediaByKeyView.get — 20.8s avg / 823 calls (worsened, chronic — see Matrix alert #5/#6)
- MediaByTagsView.get — 16.9s avg / 485 calls
- MediaAddTrackAPIView.post — 10.5s avg / 7 calls

**MPFC top errors:**
- E_WARNING "continue targeting switch" — 184x (chronic)
- Fatal `WP_Error::get_method()` — 135x (chronic, matches Rollbar emails)
- mysqli_real_connect DNS failures — 10x + 6x
- Fatal `MM_Event not found` (MemberMouse) — 10x

**MPFC slow transactions (>5s):**
- sitemap_index.xml — 52.2s / 2 calls
- author-sitemap.xml — 43.1s / 2 calls
- search RSS feeds — 24-27s
- MemberMouse processOrder.php — 16.4s / 4 calls

Fountain/InfinityRoses New Relic not queried this pass (time-boxed) — email alerts (#2 above) already surface their production errors from Rollbar/BugSnag directly.

---

## Elena — GitHub PR check — 06:09 (+07:00)

Repo `nustechnology/Elena-SamGuard-Digital-Plant`: PR #309 ("Implement header and modal components with i18n support") still open, last updated 2026-08-11 — now 20 days stale, unmerged. No deploy/WordPress check run this pass (time-boxed).

---

## Not run this pass (needs interactive recheck)

Slack (14 workspaces), Sheets/Workstream (LongVV/PhucVT/TuanNT/KhanhHH/LeNH hours + needsReview), Fountain 3-part check, Elena WordPress CSP check, Trello (Check Mail + Check Progress, all items), Reminders, OhCleo dedicated Slack, Arthur/Meta-Stamp, Upwork Memo.

## Unresolved questions
- Why did the daily-report cron not produce output on 08-29/08-30 (only news-digest ran)? Worth checking cron scheduler/logs.
- carrick@ "URGENT HELP PLEASE" thread — who is this from and is it resolved? Needs manual read.
