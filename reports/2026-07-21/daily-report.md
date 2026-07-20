# Daily Report — 2026-07-21 (Tuesday)

**Run:** 2026-07-21T06:05:00+07:00 (cron)
**Window:** 2026-07-20T06:26:00+07:00 → 2026-07-21T07:55:00+07:00
**Leave plan:** 07-20 (prior day): LuHX, ThangN, KhoaTD, PhongTB, NamNN — all processed. No new leave notes surfaced for 07-21 as of 07:55.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Fountain production (Performance + rick@ email) | Error volume REACTIVATED/worsened, not tapering — ArgumentError 95x + NoMethodError 90x today vs 9x+9x on 07-19, same signature as 07-18's incident. Plus 3 new distinct errors (#288 Stripe::InvalidRequestError, #289 ActionView::Template::Error, #290 Net::ReadTimeout) and #284 hit 100 occurrences. `[Overdue] Bug: duplicate error message on capture payment` still open. |
| 2 | MPFC (Performance) | 🔒 Security: 2 of 5 slowest transactions are time-based blind SQL-injection probes (`WAITFOR DELAY '0:0:15'`) against `/search/` — response time matches injected delay, meaning the payload reached a query-executing code path. |
| 3 | MPFC (Performance) | Apdex still poor at 0.50, unchanged for multiple days — WP_Error::get_method() (45x) + JSON_API_User_controller::error() (34x) persist unresolved. |
| 4 | Sheets/Workstream (all devs) | Workstream SSO login failed twice (90s + 150s timeouts, stuck at "Clicked Sign in with SSO") — needs interactive 2FA unavailable in this session. Google Sheets fallback confirmed genuinely empty for 07-20 across all 13 sheets (verified raw cells directly, not just script output) — daily hour totals for LongVV/PhucVT/TuanNT/KhanhHH/LeNH cannot be verified this run. Blocks Maddy/John Yi/Bailey/Rebecca/Aysar/Elliott/Blair Brown Trello items + Fountain Parts 2-3 + Maddy JIRA cross-check. |
| 5 | Arthur/Meta-Stamp | Slack "Solid Code" + Workstream (Crystal lang) + GitHub all unavailable — 3rd consecutive run (07-15, 07-17, 07-21). Diagnosed root causes: Slack cookie-extraction script has no DBUS/keyring access in this sandbox (0 cookies extracted); Workstream same SSO issue as #4; GitHub `davidztv` account not configured anywhere in this environment. Matrix-only coverage this run, and only for the last 24h (gap 07-15→07-20 not caught up). |
| 6 | Arthur/Meta-Stamp | NEW: P2-7 (Metadata Intake Tiers) blocked — Phúc messaged Arthur for Chris confirmation, no reply yet. Investor demo funding result (from 07-14) still unknown after 1+ week. |
| 7 | OhCleo Slack | `invalid_auth`. Restored deleted `get-slack-all-cookies.py` from git history, but its Chrome-Profile-25 dependency doesn't exist in this environment (no keyring/DBUS access) — needs manual cookie re-extraction from Tony's live session elsewhere. |
| 8 | GGS/Bailey (Slack + Matrix) | Customer (Joey) escalated multiple stock bugs "100% only happens since update" — Amy actively triaging, audit promised "tomorrow morning". Dev/bug discussion, does not block Trello per policy, but a real customer-visible issue worth watching. |
| 9 | Swish (vuongtrancr email) | Recurring "Signal lost for 10 minutes on Low Application Throughput" (8x) + "Metric query deviated from baseline" (4x) spread across the day — chronic APM pattern, no single confirmed outage. |
| 10 | Aysar (Baamboozle) | MPDM channel `C07SQ4HAUHZ` silent since before window start (continuing from prior days) — cannot confirm Carrick's daily "Today's update" was posted. Cross-check with KhanhHH hours also blocked (#4). |
| 11 | Upwork (Neural Contract) | Cloudflare challenge blocks the workroom check. Fixed a real script bug along the way (`upwork-neural-check.js` used an invalid Playwright-only `:has-text()` selector in Puppeteer, causing a hard crash pre-Cloudflare) — now fails cleanly at the Cloudflare wall instead. Per policy, silence/session-failure ≠ alert; Trello item still completed. |

**Today (Tue 21 Jul):** No leave-plan messages surfaced this window beyond 07-20's absences (LuHX, ThangN, KhoaTD, PhongTB, NamNN — all already processed and closed out per Matrix leave tracker). No new leave notes for today as of 07:45.

---

## Email — all — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | 0 | no events |
| carrick@nustechnology.com | 8 | 4 (Redmine Elliott bugs x3, Snyk vuln alert — routine, matches account purpose) | no events |
| nick@nustechnology.com | 3 | 1 (Azure DevOps PR notif — not John Yi related, noise) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 28 | 27 — see below | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 7 | 3 (JIRA Madhuraka mentions — routine) | no events |
| ken@nustechnology.com | 80 | 14 (GitHub PR activity — routine, matches account purpose) | 08:30 DE - Daily Standup (x2 dup) |
| vuongtrancr@gmail.com | 18 | 17 — see below | — |
| dnduongus@gmail.com | 21 | 0 (personal, no security alerts) | — |
| davidztv19@gmail.com | 4 | 1 (MongoDB "complete security setup" — routine nag, not urgent) | — |
| freelancer@mypersonalfootballcoach.com | 2 | 2 (Rollbar Daily Summary + New Relic report — routine, see Performance section) | — |

**Rick@ (Fountain/InfinityRoses production) — notable:**
- FountainGifts production: 3 distinct **new** errors today — #288 `Stripe::InvalidRequestError`, #289 `ActionView::Template::Error`, #290 `Net::ReadTimeout`; also #284 `NoMethodError` crossed 100 occurrences.
- `[Overdue] Bug: investigate 'duplicate error message' on capture payment` — flagged overdue in Rollbar.
- FountainStaging: repeated `SocketError`, `NoMethodError in orders#download_receipt`, `ArgumentError in bin/rails:8` — staging noise, matches known tapering incident from Performance piece.
- FirstProject production: new `TypeError` errors #1077/#1078, `IntegrationError` hit 10th occurrence (#1074).
- InfinityStagingBE: `NoMethodError` hit 10th occurrence (staging, not urgent).

**vuongtrancr@gmail.com (Swish) — notable:**
- 8x "Signal lost for 10 minutes on 'Low Application Throughput'" + 4x "Metric query deviated from baseline" spread across the day — recurring APM noise pattern (matches account's known "Signal lost" gate condition), no single catastrophic outage confirmed.

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete. Check mail card marked done.

---

## Slack — all (13 of 14, SoCal Auto Wraps dropped 2026-05-11) — 06:25 (+07:00)

| Workspace | Msgs in window | Key content |
|-----------|-----------------|--------------|
| Baamboozle | 0 | No activity since 2026-07-20 01:05 (before window). MPDM C07SQ4HAUHZ (Aysar gate) checked directly via conversations.history — empty since window start. Silence continues (was already silent since 07-16 per prior report). Deferred to Sheets khanhhh cross-check before flagging. |
| RDC - FM Monitoring | 9 | dmetiner/carrick/bkovacs discussing LiveMap build unification (Munich vs Türkiye tuners), tuner access logs. Normal Franc activity, no alert. |
| Swift Studio | 1 | Henry: Booking Flow (BXR Member Classes) 60% done, rest tomorrow. Normal, no alert. |
| Xtreme Soft Solutions | 18 | Kai posted progress report at 17:44 (LIFM2-428 Done, LIFM2-436 In progress). Madhuraka/Anoma Q&A on Shipping Protection naming + Open/Spam rate meaning — resolved same-thread. No blocker. |
| SAM GUARD - Mobile | 0 | No activity. See Elena piece for PR/deploy status. |
| Global Grazing Services (Bailey) | 33 | Heavy activity in #barcode-stock-and-picking-location, #purchase-reception-stocks, #split-and-ship, #payment. Joey (customer) escalated multiple stock bugs "100% only happens since update", "really really really needs to be looked into asap" — Amy actively triaging, promised audit "tomorrow morning". Nick present in #maintenance (16:07 "Thanks, wait for you") — engaged, not absent. Dev/bug discussion per policy does NOT block Trello, but flagging as real customer escalation worth watching. |
| Amazing Meds | 0 | Workspace essentially silent since ~07-07 (1 total match since Jul 1). No new activity. |
| Generator | 0 | No activity. |
| LegalAtoms | 0 | No Nick-specific activity. |
| MyPersonalFootballCoach | 0 | No activity. See Elena/Performance/Trello MPFC. |
| William Bills | 0 | No activity. |
| Equanimity | 28 | Active xid-technologies dev thread: Carrick/Komal/Marcel working CPD trade-list mapping for Ken-Pal client, approvals for hour allocation. Normal project work, no blocker. |
| Aigile Dev | 2 | Automated bot posts only (the-gaige-alerts, TikTok campaign notice). No human activity. |

Trello: Franc, Rory (Swift), Maddy (pending Workstream Maddy-hours + sheets longvv), Marcel, Colin ✓ complete. Aysar, Bailey, John Yi, Elena, MPFC ⚠️ deferred to Sheets/Elena cross-check.

---

## Discord — all (AirAgri + Bizurk) — 06:30 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 32 | Vinn daily report present ("Just report my process today: Review PR #591, #600, #601..."). Jeff daily report present ("Here is my daily report for today (4 hours): Implemented auto check-in/check-out..."). James Diamond active reviewing operations module, contractor roles discussion. dapackage merged operations module to staging. No blockers. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs. Silence, no alert (low-activity workspace). |

Trello: James Diamond - Vinn, Andrew Taraba ✓ complete.

---

## Scrin.io (TuanNT / John Yi — 2026-07-20) — 06:32 (+07:00)

**Scrin.io (TuanNT / John Yi — 2026-07-20):** 8h 31m logged (2 sessions: 08:22-12:16, 12:42-17:19).

---

## Matrix — 06:40 (+07:00)

**Active rooms: 26 / 132 | Messages: 279** *(since 2026-07-20 06:26)*
Full details: reports/2026-07-21/matrix-rooms-0618.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Project-info-gathering room | 10:11 | anhnvn: "À, với a Dương cho e thêm vài info về project nếu có nha: Partnership duration, bối cảnh khi team mình join..." — needs project background info for a client proposal/doc draft |
| Bailey - BA/QC | 11:05 | datnc: "Với tasklog của a Tuấn chung chung quá, e có bảo ảnh update lại tasklog cho rõ ra... e báo bên a Dương 1 tí" — FYI Tuan's tasklog flagged too vague, review-relevant |

### Key updates

**Fountain — W plan posted 11:37 by trinhmtt:**
- ViTHT 40h, ThinhT 20h, DatNT 40h => QC 25h (DatNT in for VuTQ's usual slot this week)
- DatNT fixed 2 Redmine bugs (#79835, #79886) on Infinity Beta; ViTHT fixed hover bug card #2895; VuTQ closed a logo-only draft PR for card #2990

**Maddy (Xtreme Soft) — QC hours + AI-review follow-up:**
- Chị Bình questioned QC 20h vs dev 16h; ThanhNX found a duplicate task-log entry, corrected
- Madhuraka flagged an AI-review miss on LIFM2-436 — discussed, non-blocking
- LongVV shared latest client feedback with ThanhNguyen (check items #1, #3)

**LongVV — hours reconciliation:**
- Confirmed last week short 1.5h of 16h target; catching up this week
- 10h OT logged for James Diamond this week, decided to stop further OT, back to Maddy + Django/FastAPI training (hours now under Workstream "other")
- Review assignment: DuongDN/PhucVT agreed to stop reviewing LeNH/James hours (quality consistently fine); LongVV's review reassigned to LeNH

**Bailey — customer escalation (matches GGS Slack):**
- trinhmtt: new stock bugs reported, "100% only happens since update" — same incident as Joey's Slack complaints in #barcode-stock-and-picking-location
- Rail 6 staging test this week, Rail 7 in progress, new client tasks blocked pending client approval (unresponsive since last Monday)
- datnc flagged Tuan's tasklog too vague, asked for detail (relevant to Workstream review)

**KhanhHH — task pipeline:**
- Aysar: 1 new TODO task; Franc: still plenty of backlog; Elena: new work now going to Sâm instead — KhanhHH may run low on Elena tasks

**Other:**
- Blair Brown: still silent, team continuing to ping
- ThuyLTT posted official W13-19/7 hours summary (Mobile 19h/19h, AnhNH2 19h/19h) — DuongDN reviewed, confirmed OK
- Leave/absence 07-20: LuHX, ThangN, KhoaTD, PhongTB (PhucVT covering), NamNN — all processed and noted by 18:12
- Elena: bug found on need_review status change, QC (Đạt) to log it, QC hours to be reduced
- Workstream: new "pin project" feature released (Summary > Reorder/Pin)
- Celine/OhCleo: customer pulled tasks without Slack notice — Tony to check tomorrow
- BDD - Delivery: Paul Jones pushing back on ~1.5-week estimate, wants delivery by weekend — unresolved

---

## Performance — all — 06:55 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.95 | 291ms | 2.7% (1174/42755) — 94.6% benign NotAuthenticated | 16.8/min |
| mpfc | 0.50 | 1300ms | 0.25% (173/70007) but severity high — see below | 27.6/min |
| fountain (prod) | 0.97 | 163ms | 0.16% (96/60683) — see below, volume UP not tapering | 23.9/min |
| infinity (prod) | 0.99 | 128ms | 0% (0/35099) — healthy | 13.8/min |

**OhCleo — topErrors (full):**
| Error class | Message | Count |
|---|---|---|
| NotAuthenticated | Authentication credentials were not provided | 1111 |
| InvalidToken | Token is invalid or expired | 24 |
| ValidationError | user with this email already exists | 9 |
| AuthenticationFailed | Passwords don't match! | 8 |
| ValidationError | user with this username already exists | 8 |
| AuthenticationFailed | User does not exist! | 7 |
| ValidationError | Enter a valid email address | 2 |
| ValidationError | email+username already exist (combined) | 2 |
| ValueError | Invalid bcrypt hash format | 1 |
| ValidationError | No user found with this email address | 1 |

**OhCleo — slowestTransactions (full):**
| Endpoint | Avg ms | Calls |
|---|---|---|
| MediaByKeyView.get | 8545 | 498 |
| HomeMediasView.get | 1885 | 784 |
| ValidatePurchaseView.post | 1057 | 4 |
| MediaRecommendsView.get | 962 | 1344 |
| EmailVerificationView.post | 928 | 11 |

⚠️ MediaByKeyView.get still severely slow (8.5s avg, 498 calls) — persistent known issue.

**MPFC — topErrors (full):**
| Error class | Message | Count |
|---|---|---|
| E_WARNING | "continue" targeting switch equivalent to "break" | 71 |
| Error | WP_Error::get_method() undefined method | 45 |
| Error | JSON_API_User_controller::error() undefined method | 34 |
| E_WARNING | count(): Parameter must be array/Countable | 9 |
| E_WARNING | mysqli_real_connect(): No such file or directory | 5 |
| E_COMPILE_ERROR | legacy-widget.php include path failure | 3 |
| Error | get_header() undefined (twentytwenty 404) | 3 |
| Error | get_header() undefined (twentynineteen 404) | 1 |
| Error | get_header() undefined (twentytwenty index) | 1 |
| Error | MM_Event class not found (pfc7 theme) | 1 |

**MPFC — slowestTransactions (full):**
| Endpoint | Avg ms | Calls |
|---|---|---|
| author-sitemap.xml | 61,741 | 1 |
| sitemap_index.xml | 42,140 | 1 |
| /search/-1%2525...waitfor delay '0:0:15'--/page/370/ | 20,284 | 1 |
| membermouse/api/processOrder.php | 19,527 | 3 |
| /search/-1%2525...waitfor delay '0:0:15'--/page/288/ | 17,805 | 1 |

⚠️ **Security note:** 2 of the 5 slowest transactions are time-based blind SQL-injection probes against the `/search/` endpoint (`WAITFOR DELAY '0:0:15'` payload, response time ≈ delay = injection landed on a code path that executes the query, even if not exploitable). Same known WP_Error/JSON_API bugs persist unresolved (45x/34x, unchanged for multiple days). mysqli_real_connect no-socket errors (5x) suggest transient local DB connectivity hiccups.

**Fountain — topErrors (full):**
| Error class | Message | Count |
|---|---|---|
| ArgumentError | wrong number of arguments (given 3, expected 2) | 95 |
| NoMethodError | undefined method `with_connection' for nil:NilClass | 90 |
| ArgumentError | logo_full.png not found (release 430) | 2 |
| Stripe::InvalidRequestError | PaymentMethod instance has invalid ID: nil | 2 |
| ActionView::Template::Error | options_for_select undefined (CountrySelect) | 1 |
| Net::ReadTimeout | Net::ReadTimeout | 1 |

**Fountain — slowestTransactions (full):**
| Endpoint | Avg ms | Calls |
|---|---|---|
| paypals/authorize_order | 2946 | 2 |
| payment_intents/create | 1737 | 37 |
| users/passwords/forgot | 1388 | 1 |
| gifts/index | 1378 | 1820 |
| MailchimpWorker/perform (Sidekiq) | 1099 | 4 |

⚠️ **Fountain ArgumentError/NoMethodError volume is UP, not tapering** — 95+90 today vs 9+9 reported 07-19. This is the SAME error signature flagged as an active production incident 07-18 (Rollbar #276-287); it reactivated/worsened rather than resolving. Matches rick@ email alerts (new errors #288/#289/#290 today, #284 hit 100 occurrences).

**Infinity — slowestTransactions (full):**
| Endpoint | Avg ms | Calls |
|---|---|---|
| paypals/authorize_order | 2917 | 2 |
| search/search | 1597 | 80 |
| payment_intents/create | 1375 | 11 |
| users/registrations/create | 1027 | 2 |
| users/sessions/destroy | 859 | 1 |

No errors, apdex 0.99 — healthy.

---

## Elena — 07:05 (+07:00)

- **Elena-SamGuard-Digital-Plant (duongdn):** 0 open PRs. Nothing to merge/deploy.
- **Precognize (nusken):** 0 open PRs by nusken (15 open total from other contributors). Note: `gh` CLI has no `nusken` account configured in this environment — used stored token from `config/.github-config.json` directly via curl instead.
- **WordPress samguard.co:** clean. 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are all benign analytics/ads noise (Google Tag Manager, DoubleClick, GA4 collect calls) + one aborted `.mp4` load — no CSP directive violations among them.

Trello: Elena - SamGuard ✓ complete (pending Slack samguard cross-check — 0 activity, no alert).

---

## Sheets/Workstream — LongVV, PhucVT, TuanNT, KhanhHH, LeNH — 07:35 (+07:00)

**Data gap this run — documented, not glossed over:**
- Workstream SSO login attempted twice (`DISPLAY=:1 node scripts/workstream-login.js`), each run allowed to reach "Clicked Sign in with SSO" and then time out (90s, then 150s) without capturing a token — consistent with 2026-07-20's same failure. This needs interactive human 2FA/consent that isn't completable headless in this session.
- Fell back to Google Sheets per the documented fallback rule. Ran `sheets-tasklog-scan.js` for all 5 devs against all 13 sheets for 2026-07-20. Result: **every sheet's W-tab day-block for 2026-07-20 is a bare unfilled template** (`Task dự án` rows present but no owner/hours in any column) — verified directly against raw cell data for Maddy (W16) and Paturevision (W37), not just trusting the script. This is NOT a per-dev 0h finding — it's the underlying data source itself being empty for this date, consistent with the team having fully moved daily logging to Workstream (confirmed 2026-07-13, apparently now including Paturevision/Bailey too, which the skill doc still lists as Sheets-only — that exception may now be stale).
- **Result: cannot produce verified hour totals for LongVV/PhucVT/TuanNT/KhanhHH/LeNH today.** Not treating this as a 0h/shortfall alert for any of them — that would be a false alarm given real Matrix/Slack evidence of active work (below). No reminders sent (Piece 9) based on this gap.

**Best-available qualitative signal (Matrix + Slack, cross-referenced above):**
| Dev | Evidence of activity 07-20 |
|-----|------------------------------|
| LongVV | Active on Maddy (17:44 progress report), catching up a confirmed 1.5h shortfall from last week, did 10h OT on James Diamond this week (deciding to stop further OT) |
| PhucVT | Covering PhongTB's leave day, active in Arthur/Meta-Stamp Matrix room (P2-7 blocker follow-up) |
| TuanNT | Scrin.io confirms 8h31m logged (John Yi company); Matrix Bailey-BA/QC room shows active engagement; own tasklog flagged by datnc as "too vague," needs more detail |
| KhanhHH | Matrix confirms active: 1 new Aysar TODO, ongoing Franc backlog, Elena tasks now reassigned to Sâm (may run low soon). Baamboozle MPDM (Aysar gate channel) itself silent since before window — see Slack section |
| LeNH | No direct Matrix/Slack evidence this window; review room confirms LeNH's ongoing James Diamond work trusted enough that DuongDN/PhucVT just stopped actively reviewing it (quality has been consistently fine) |

**Maddy JIRA cross-check + Workstream needsReview check: skipped this run** (both require live Workstream access, same blocker as above).

Trello: Maddy, John Yi, Bailey, Rebecca, Aysar, Elliott ⚠️ left incomplete — genuine data-source outage (Workstream SSO + stale Sheets), not a confirmed shortfall. Will retry Workstream login on next run/recheck.

---

## Fountain (3-part check) — 07:40 (+07:00)

**Part 1 — Matrix Plan:** ✅ Posted by trinhmtt at 11:37 (`Kunal - Fountain` Matrix room): **ViTHT 40h, ThinhT 20h, DatNT 40h => QC 25h** (DatNT covering VuTQ's usual dev slot this week). Cited above in Matrix section.

**Part 2 — Task Log Actuals:** ⚠️ Unavailable this run. Workstream project `fountain` (id `cmpqcjojh00q2tk1v2qi7gs0j`) requires the same SSO login that failed twice (see Sheets/Workstream section above). Fallback Sheet (`1iIKfjAh...`, tab W36) verified directly — day-block for 07-20 is a bare unfilled template, same as all other sheets, confirming the project has moved fully to Workstream logging.

**Part 3 — Plan vs Actual:** ⚠️ Cannot compute without Part 2 actuals — deferred to next successful Workstream run.

**Trello Board (Fountain):**
- Customer comments (kunalsheth, tmmckay, mike62798179, iris63293413) in window: **0** — checked via `commentCard` actions since window start, none from the 4 tracked customer accounts.
- List counts: To-Do 26, Bugs 16, Doing 7, QC Internal Backlog 8, QA Backlog 1, In QA 0, Not Passed 0, Done 977, Seasonal 6, Notes 7, Shelf 11.
- **Stuck cards (5+ days, Doing/Bugs/QC lists):** long-standing backlog, oldest first: "Fountain Pro- not uploading to shipstation" (104d), "Giftdrop Links Not Sending" (98d), "Fountain - build a box/product catalog modal issue" (77d), "Infinity Order - 6358531LG" (74d), "NoMethodError in pro_cart_items#destroy" (74d), "Fountain pro pending bug" (60d), "Fountain Pro- order did not upload all recipients" (31d), plus 6 more in the 5-20 day range (auth token, mailgun, receipt download, PayPal, ShipStation, rose swatches, Next.js 16 upgrade, Bottle engraving, Smart Link, delivery-date bug).
- **Hard-to-release (Doing 14+ days):** "Infinity Blog" (19 days in Doing, no Done yet).

Trello: Fountain ⚠️ left incomplete — Parts 2-3 blocked by Workstream outage (real alert candidates: 2 items past 14-day hard-to-release threshold, error-volume spike noted in Performance section, but no NEW customer comment this window).

---

## OhCleo Slack — 07:15 (+07:00)

⚠️ **Unavailable this run — diagnosed, not just reported.** `auth.test` returns `invalid_auth` for the stored OhCleo xoxc token. Attempted fix: `node scripts/slack-extract-ohcleo-token.js` → fails because `scripts/get-slack-all-cookies.py` was deleted in the same bulk-cleanup commit (`d0d3fd5`, 2026-07-15) that deleted `facebook-page-scraper.js` (see memory `feedback_facebook_scraper_file_deleted`). **Restored the script from git history** (`git show 32093d4:scripts/get-slack-all-cookies.py`), but its underlying dependency — `/home/nus/.config/google-chrome/Profile 25/Cookies` (Tony's Chrome profile) — does not exist in this environment (this session runs as user `mpfc`, home dir has only `Profile 19`, no `Profile 25` anywhere). This is a genuine environment gap: OhCleo's only prior extraction path required a specific Chrome profile that isn't present here, not an auth/token problem.
- New Relic performance data for OhCleo IS available and included in the Performance section above.
- Manual fix needed: re-extract OhCleo's `d` cookie from Tony's live Chrome session on a host where Profile 25 exists, then update `config/.slack-accounts.json` → re-encrypt.

Trello: Ohcleo item ⚠️ left incomplete — genuine tooling/environment gap, not an alert.

---

## Philip — MS Teams — 07:50 (+07:00)

⚠️ Unavailable this run. `fetch-msteams-customer-messages.js will "Philip Briggs"` hit a Microsoft account security challenge ("Help us protect your account — we've detected some [unusual activity]") on the `will@nustechnology.com` login flow, looping for 150s without resolving — needs interactive verification (SMS/authenticator), same class of blocker as Workstream SSO. Not a script bug this time (script ran correctly, got stuck at a genuine MS security gate). Deferred to a session with interactive access.

Trello: Philip ⚠️ left incomplete — genuine auth/environment gap, not an alert.

---

## Trello Check Progress — 07:55 (+07:00)

12/22 items complete: John Yi, James Diamond, Rory, Franc, MPFC, Marcel, Elena-SamGuard, Raymond, Neural Contract, Andrew Taraba, Colin, Elena-WordPress ✓.

10 left incomplete (all data-gap or real-alert, not misses):
- **Maddy** — Workstream/Sheets gap (#4 above), Kai's report itself was fine
- **Aysar** — MPDM silence (#10) + Workstream/Sheets gap
- **Elliott** — Workstream/Sheets gap (KhanhHH hours)
- **Bailey** — Workstream/Sheets gap (Paturevision sheet, sole source, empty for 07-20)
- **Rebecca** — Workstream/Sheets gap (TuanNT hours)
- **Fountain** — Parts 2-3 blocked (#4)
- **Philip** — MS account security challenge, needs interactive verification
- **Ohcleo** — Chrome-profile environment gap (#7)
- **Arthur** — 3-source outage + new blocker (#5, #6)
- **Blair Brown** — Workstream/Sheets gap (LeNH's scan)

Card not marked done (10 items still open).

---

## Reminders — 07:45 (+07:00)

No reminders identified/sent this run. Reason: the Sheets/Workstream data gap above means there is no verified 0h finding for any dev today — Matrix/Slack evidence shows LongVV, PhucVT, TuanNT, KhanhHH all had real activity 07-20, so a "0h logged" reminder message would very likely be false (same failure mode flagged in memory `feedback_tasklog_0h_reminder_complete`: never send a 0h reminder without a verified real number). Deferred to next successful Workstream/Sheets run.

---
