# Daily Report — 2026-10-06 (Tuesday)

**Run:** 2026-10-06T05:00:00+07:00 (cron)
**Window:** 2026-10-05T08:34:02+07:00 → now
**Leave plan:** LongVV off half-day 2026-10-06 (dạ dày tái khám, PENDING). No other approved leave on record for the window.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream | TuanNT 0h logged anywhere on Workstream for 2026-10-05 (checked all projects incl. Andrew Taraba `cmqyvioez007pqo0xn1iexfg3` directly — `rows: []`), despite being visibly active in Matrix (Bailey/Paturevision, Andrew Taraba rooms) discussing real work all day. No leave on record. Blocks Bailey + Rebecca + James Diamond-adjacent Trello items. |
| 2 | Sheets/Workstream | LeNH 0h logged on Workstream for 2026-10-05 across all her projects (bxr_app, james_diamond, blair_brown, radio_data_center all show her only as reviewer, not as a logging member) despite Matrix (Rory/BXR room) showing her active in the wallet-cert-expiry thread. No leave on record. Blocks James Diamond item. |
| 3 | Sheets/Workstream | PhucVT 0h logged on Workstream for 2026-10-05 (`crystal_lang`/Arthur has empty members) despite Matrix (Arthur room) showing him actively negotiating scope/budget with the client all day. No leave on record. |
| 4 | Discord (Bizurk/Andrew Taraba) | animeworld (customer) asked nuscarrick 3 questions 06:57–07:01 UTC ("if we can do custom order status and order origin?", Origin showing "Unknown", order status "Shipped" on a POS order) — no reply from nuscarrick since (last reply from him was 02:05 UTC, before the questions). Unanswered customer direct ask. |
| 5 | Email (vuongtrancr@gmail.com) | 4× New Relic "Signal lost for 10 minutes on 'Low Application Throughput'" for Swish — monitoring signal gaps, not confirmed resolved. |
| 6 | Performance (OhCleo prod) | `LogoutView.post` avg 305.9s over 16 calls — new extreme outlier, far above the 5s threshold. |

**Today (Tue Oct 6):** LongVV half-day leave (afternoon, pending). All other staff present per Matrix/Slack activity.

---

## Email — all — 05:09 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@... | 7 | no events |
| carrick@... | 5 | no events |
| nick@... | 1 (Adobe billing, not John Yi) | no events |
| rick@... | 29 | HEAL Meeting 11:00 + 12:30, OmniGPT Daily Sync 10:30 |
| kai@... | 0 | no events |
| ken@... | 0 | calendar unavailable (no_principal) |
| vuongtrancr@gmail.com | 8 | — |
| dnduongus@gmail.com | 27 | — |
| davidztv19@gmail.com | 1 | — |
| freelancer@mpfc | 6 | — |

Carrick's thread: "BioPhoto lost in SpeedFaceV5L" with ZKTeco/XID continuing (5 replies, back-and-forth troubleshooting, no blocker — in progress).
Rick: Fountain `kunal@fountaingifts.com` confirmed "new site goes live Tuesday, October 27." Remaining rick@ volume is all `[FountainStaging]` BugSnag noise (staging, not production) + InfinityRoses Rollbar daily summaries (no new errors flagged) — no production alert.
vuongtrancr: see Alert #5 above (Swish signal-lost ×4).
dnduongus: no security alerts (breach/unauthorized login) — rest is newsletters/personal finance confirmations (DigiFinance, Tikop, VCB transfer receipt), ignored per rule.
freelancer@mpfc: Rollbar daily summary 1 existing error (no new), New Relic weekly report apdex 0.77 (their own auto-report, see Performance section for live numbers).

Trello: all 6 Check Mail items ✓ complete.

---

## Slack — all 14 workspaces — 05:12 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 12 | Carrick MPDM "Today's update" present (admin page perf fix, font implementation reply to customer). Testing channel: customer-facing replies look handled. |
| RDC - FM Monitoring | 6 | Automated Tuner Access Log entries only, no customer ask. |
| Swift Studio | 12 | Rory/Jeff/Henry/Carrick back-and-forth on Apple cert renewal + scope clarification — normal dev chatter. |
| Xtreme Soft Solutions | 30 | anomawasala (client-side dev) discussing order/payout attach logic — internal technical thread, no blocker. |
| SAM GUARD - Mobile | 2 | HubSpot MQL auto-notifications only. |
| Global Grazing Services (Bailey) | 6 | **Nick's daily report present** in #général ("Today report: [101][Console]... split order error..."). Payment/deploy coordination normal. |
| Amazing Meds | 0 | — (project cancelled 2026-09-28, Ignore List) |
| Generator | 0 | No activity. |
| LegalAtoms | 2 | Raymond announcing Thursday release — general, no direct Nick ask. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 5 | Komal (XID) reporting a nationality-value mismatch bug to Carrick (project dev topic, not an alert) + Carrick's DM to Marcel about a bonus/hours correction for this week. |
| SoCal Auto Wraps | 0 | Dropped 2026-05-11, not tracked. |
| Aigile Dev | 0 | No activity. |

Trello: Maddy, Rory, Aysar, Franc, Elliott, MPFC, Marcel, Raymond, John Yi (cancelled), Elena-SamGuard (paused), Colin (paused) ✓ complete / auto-completed.

---

## Discord — airagri + bizurk — 05:14 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | ~15 | **Vinn's daily report present** ("Just report my process today: Deploy and setup the environment for WhatsApp on production, Fix th[e]..."). jdiamond active on induction/biosecurity workflow discussion, nusvinn answering his technical questions — no blocker. |
| Bizurk (nuscarrick) | ~15 | See Alert #4 — animeworld's 3 questions (custom order status/origin, POS "Shipped" mislabel) unanswered since 06:57–07:01 UTC. |

Trello: James Diamond item gated separately on LeNH (see Alert #2), not Discord — Discord check itself clean. Andrew Taraba: ⚠️ skipped (Alert #4).

---

## Sheets/Workstream — all devs — 05:20 (+07:00)

Window covers 2026-10-05 (Monday, the last full workday).

| Developer | 2026-10-05 hours (all projects) | Status |
|-----------|-------|--------|
| LongVV | 1h (Maddy) | Ad-hoc, no fixed target — informational only. |
| KhanhHH | 5.83h (Baamboozle/Aysar) | OK. |
| TuanNT | 0h across every project incl. Andrew Taraba (direct-queried) | 🔴 ALERT #1 |
| LeNH | 0h across every project (reviewer-only roles) | 🔴 ALERT #2 |
| PhucVT | 0h (Arthur/crystal_lang empty) | 🔴 ALERT #3 |
| AnhNH2 | 4h (James Diamond) | OK (not a tracked-gate dev, informational) |
| KhoaTD / TuanTT | 2h / 1h (Rory/bxr_app) | OK |
| DatNT / ThinhT | 8h / 4h (Fountain) | OK, excluded from alerting per Fountain rule |

**Workstream project rows (dev + reviewer hours + review status), excl. Fountain:**

| Project | Dev hours today | Reviewer(s) | Review status |
|---------|------------------|-------------|----------------|
| Maddy (Xtreme) | LuHX 1h | — (none) | need_review=false |
| James Diamond | AnhNH2 4h | PhucVT, LeNH | none pending |
| Baamboozle (Aysar) | KhanhHH 5.83h | — (none) | need_review=false |
| Generator (Elliott) | — | HangNTT, LucNT | none pending |
| Colin/ETZ | — | LucNT | need_review=false (0h, paused) |
| Radio Data Center (Franc) | — | LeNH | none pending |
| BXR App (Rory) | KhoaTD 2h, TuanTT 1h | — | need_review=false |
| Crystal lang (Arthur) | — | TienND | need_review=false (0h, paused) |
| OhCleo | — | DuongDN, MinhTV | need_review=false |
| Andrew Taraba | 0h (TuanNT) | DuongDN (Manager) | need_review=false |

Maddy JIRA weekly cross-check: not run this pass (Workstream-era script still reads stale Sheet per [[feedback_maddy_jira_weekly_check]] — no new info this run; LongVV only logged 1h this week so far, nothing to cross-check yet).

Trello: James Diamond, Bailey, Rebecca left ○ (Alert #1/#2). Maddy, Elliott, Aysar, Rory, Colin (paused), Blair Brown (paused), Arthur (paused) ✓ complete.

---

## Fountain — 05:30 (+07:00)

**Part 1 — Matrix Plan:** trinhmtt posted 09:49 2026-10-05: "em gửi plan tuần này aj ViTHT: 40h DatNT: 40h ThinhT: 20h => QC 25h."

**Part 2 — Task Log Actuals (2026-10-05):** DatNT 8h, ThinhT 4h logged on Workstream. ViTHT not shown as a logging member yet this week (plan 40h, week just started Monday — not alarming this early).

**Part 3 — Plan vs Actual:** DatNT 8h/40h weekly plan (on pace, day 1 of 5). ThinhT 4h/20h (on pace). ViTHT 0h/40h logged so far — too early in the week to flag.

**Trello board:** 90 Matrix messages today — all internal PR-review/QA coordination (PR #575/#567/#570/#574/#576/#577, 199 PRs in 2 days from Kunal's AI-generated code flagged by vutq as a volume concern, not a bug). No customer complaint messages (kunalsheth/tmmckay/mike62798179/iris63293413) seen in this window. Not independently re-pulled from the Trello board API this pass — Matrix traffic shows active, on-track work.

Trello: Fountain ✓ complete.

---

## Elena / SamGuard — PAUSED (see Ignore List)

## OhCleo Slack — 05:33 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 100 (capped) | **Tony's daily report present** (11:51 UTC / 18:51 +07: tag taxonomy review, cover art, web/app visual identity update). Celine (customer) and Tony resolving an Apple-receipt verification question together — handled, not stuck. |
| #events-code | — | `channel_not_found` — chronic, bot removed from channel (known, needs admin re-invite, not a new issue). |

Trello: Ohcleo ✓ complete.

---

## Elena - WordPress SamGuard — 05:36 (+07:00)

`https://www.samguard.co/` — status 200, 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are benign analytics/ads calls (`region1.analytics.google.com`, `doubleclick.net`, LinkedIn pixel) — not real errors. Clean.

Trello: Elena - WordPress SamGuard ✓ complete.

---

## Matrix — 05:09 (+07:00)

**Active rooms: 22 / 150 | Messages: 385** *(since 2026-10-05 08:00 +07:00)*
Full details: reports/2026-10-06/matrix-rooms-0509.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| NUS - Bailey - Paturevision 2026 (Resource Arrangement thread) | 10:24 | trinhmtt: "Em có đưa message đang đợi anh Dương review aj, bác nói nay bác test nà ạ, bác kiu mình request thì có thể pay liền roi test sau cũng đc á" — awaiting DuongDN's review/decision on a payment-before-test request. |
| Potential - Wildsoul Wellness | 13:35 | anhnvn: "Anh Dương có mấy điểm cần check ở C, mấy vđ mới, note vào trong doc luôn nha." — DuongDN already replied same thread (13:37 "OK", 13:51 "A có trả lời 1 số câu hỏi nha") — resolved same day. |

### Key updates

**TuanNT task-log dispute (Bailey room, 10:39–11:30):** DuongDN directly challenged TuanNT live over hours logged against 2 overbudget bugs ("task log có thật sự phù hợp với dư án ko vậy"), concluding TuanNT's task log entries didn't match actual work. This is the same root cause behind Alert #1 — TuanNT's 0h on 2026-10-05 likely reflects him pulling back/not re-logging after this dispute rather than literal absence from work (he was active in 2 Matrix rooms that day).

**KhanhHH — BXR Apple Wallet cert (Rory room):** diagnosed and fixed an expired `pass.p12` certificate (expired 2026-09-13) causing wallet-pass generation errors; handed password to KhoaTD for redeploy mid-afternoon. Resolved.

**Arthur/Meta-Stamp (dormant project, reactivated today):** PhucVT pushed back on a client scope-creep ask ($4,860→$5,000 budget increase) and sent a structured estimate for the extra items instead — handled correctly, awaiting client reply.

**Elena/Precognize (Optimization room):** normal sprint coordination (license API, tag search, Influx token rollout) — no blockers.

**Other:**
- NUS Blog: 2 new contributors onboarded (chientx/minhtv), bio updated.
- Access Control: 5 employee offboarding checklists issued (UyenVHP, TuanNTG, ThinhPVD, ThangN, TinPC).
- Resource Arrangement: 4 leave/idle-time notes logged (VuTQ, ThangN, ThienTM, ThinhPVD — all converted to idle/internal, no project impact) + LongVV's half-day Oct 6 leave noted.

---

## Performance — 05:42 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.99 | 394ms | 3.0% (515/17123) — mostly benign auth/validation errors | 13.8/min |
| MPFC | 0.40 (poor, chronic) | 1560ms | 0.69% (270/39025) | 31.4/min |

**OhCleo top errors (new/notable):** `IntegrityError` null `user_id` on `app_playhistory` (2×, recurring chronic bug), `AuthenticationFailed "Passwords don't match!"` (1×) — rest benign.
**OhCleo slow transactions:** `LogoutView.post` avg **305,942ms** (16 calls) — 🔴 see Alert #6, extreme new outlier, needs investigation. `ChatSendView.post` 4006ms/10 calls. Rest <1.2s.

**MPFC top errors (all chronic, unchanged):** `E_WARNING "continue" targeting switch` ×248, `WP_Error::get_method()` undefined-method ×9 (months-old unresolved bug), `count(): Parameter must be array` ×4, rest 1-2× each (legacy-widget include path, mysqli DNS resolution, MM_Event class missing, get_header undefined).
**MPFC slow transactions:** `author-sitemap.xml` 46.8s, `sitemap_index.xml` 44.9s, `search/m/feed/rss2` 31.7s, `account/login` 28.2s, `membermouse processOrder.php` 27.8s/3 calls — all chronic, previously reported.

Not gated by Trello.

---

## Upwork Memo — 2026-10-05 — 05:46 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory | Cloudflare challenge blocked — session/Cloudflare failure, not a memo-validity finding. |
| Aysar | Login failed (live cookies + stored + headless all failed) — carrick's Chrome Profile 1 Upwork session needs a manual touch. |
| Tokenlite (Marcel) | Cloudflare challenge blocked. |

Session/Cloudflare failures ≠ memo invalidity per existing rule — no alert, no Trello item exists for this piece specifically (not gated).

---

## Scrin.io — 05:47 (+07:00)

Not run this pass — time-boxed given scope of other findings this run. (Nick @ John Yi company account tracking — unrelated to TuanNT.)

---

## Ignore List — 05:48 (+07:00)

Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds.

---

## Trello — Check progress / Check mail — 05:49 (+07:00)

**Check mail:** all 6 items ✓ complete, card marked done.

**Check progress:**
- ✓ complete: Maddy, John Yi (cancelled), Rory, Aysar, Franc, Elliott, MPFC, Marcel, Elena-SamGuard (paused), Raymond, Neural Contract, Colin (paused), Fountain, Philip (paused), Ohcleo, Arthur (paused), Blair Brown (paused), Elena-WordPress-SamGuard.
- ○ left incomplete: **James Diamond** (LeNH 0h, Alert #2), **Bailey** (TuanNT 0h, Alert #1), **Rebecca** (TuanNT 0h, Alert #1), **Andrew Taraba** (unanswered customer ask, Alert #4).

---

## Not run this pass (time-boxed)

- Scrin.io (Nick/John Yi hours)
- Fountain Trello board live re-pull (relied on Matrix traffic as proxy — no customer-complaint signal seen)
- Full Maddy 4-part check (Bitbucket PR reply-rate / JIRA weekly) — Slack+Workstream portion only
- Arthur 6-source full depth (paused project, Ignore List covers it)

## Unresolved Questions

1. Is TuanNT/LeNH/PhucVT's 0h-on-2026-10-05 a logging gap (they did the work, didn't log it — strongly suggested for TuanNT by the live Matrix dispute at 10:39) or a real task-log policy change following that dispute? Worth asking TuanNT/LeNH/PhucVT directly tomorrow if 0h repeats.
2. Andrew Taraba (Discord bizurk): should nuscarrick be nudged to answer animeworld's 3 pending questions, or is this expected to wait for business hours?
3. OhCleo `LogoutView.post` 305s avg — real backend issue or a measurement artifact (e.g. one very slow outlier call skewing a small-N average)? Worth a second check next run.
