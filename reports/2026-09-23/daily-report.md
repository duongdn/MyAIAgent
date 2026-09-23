# Daily Report — 2026-09-23 (Wednesday)

**Run:** 2026-09-23T05:00:00+07:00 (cron)
**Window:** 2026-09-22T09:00:00+07:00 → now
**Leave plan:** ThienVN (idle, unwell 22/09), KhoaTD (half-day 22/09), ThoTNT (off, was remote 22/09), KhanhHH (25/09–30/09, giấy tờ quê — covers Franc + Aysar, PhucVT to be pulled onto James in her place per duongdn's Matrix note 16:34)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Workstream (all task-log-gated items) | SSO login stuck again — Keycloak cookies alive but headless auth never completes (2 retries, 2 login attempts, both hung on "SSO redirect detected" with no token). Matches the documented recurring outage. Google Sheets fallback returns 0 everywhere (Sheets task-log system retired 2026-08-21) — **no fallback data exists**, so Maddy/John Yi/James Diamond/Aysar/Elliott/Bailey/Rebecca/Fountain Parts 2-3 hours are unverified this run and left ○ pending recheck. |
| 2 | Email — rick@ (Fountain) | `[FountainGifts] production - New Error: #332` + `10 occurrences in 5 minutes` (Rollbar, 22 Sep 15:55-15:56). Real production error on Fountain Gifts, not staging noise. |
| 3 | MPFC production (Rollbar, freelancer@) | `Call to undefined method WP_Error::get_method()` — 10 occurrences in 5 min, fired twice (11:06 and 21:30 on 22 Sep). Recurring production error. |

**Today (Wed 23 Sep):** ThienVN/KhoaTD/ThoTNT leave was yesterday (22/09), no new leave notes for today yet. KhanhHH's 25–30/09 leave is upcoming, not today.

---

## Email — all 10 accounts — 05:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 7 | none (leave requests: TrinhMTT, NamTV, KhanhHH) | no events |
| carrick@nustechnology.com | 1 | none (Jira weekly digest) | — |
| nick@nustechnology.com | 0 | none | — |
| rick@nustechnology.com | 29 | ⚠️ #2 above (FountainGifts prod #332); rest is FountainStaging BugSnag noise (staging migrations/dev errors, not production) | 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 8 | none (Shopify OTP exchange with Madhuraka, Bitbucket PR #548, JIRA mentions — routine Xtreme work) | no events |
| ken@nustechnology.com | 80 | none (GitHub notification noise — welligence repos + 2 routine Precognize PR/fix notifications) | 08:30 DE Daily Standup ×2, 09:00 Tech Talks |
| vuongtrancr@gmail.com | 3 | none (marketing emails only) | — |
| dnduongus@gmail.com | 20 | none (bank/newsletter noise, no security alerts) | — |
| davidztv19@gmail.com | 0 | none | — |
| freelancer@mypersonalfootballcoach.com | 6 | ⚠️ #3 above (MPFC WP_Error production bug, recurring) | — |

Trello: DuongDn, Carrick, Kai, Ken, Nick ✓ complete. **Rick ⚠️ left ○** (Fountain production alert #2).

---

## Slack — all 14 workspaces — 05:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 7 | Aysar MPDM (`C07SQ4HAUHZ`) update posted by carrick 17:27 y'day — present. Dev testing back-and-forth w/ skjamie25 (her dog was sick, resumed testing). |
| RDC - FM Monitoring | 6 | Routine "Tuner Access Log" bot posts only. |
| Swift Studio | 0 | Silent — no client ask outstanding. |
| Xtreme Soft Solutions | 22 | Kai actively working w/ madhuraka: PR #548 fixes, Shopify theme download, issue-count spreadsheet updates. Heavy activity, no unanswered asks. |
| SAM GUARD - Mobile | 3 | HubSpot MQL lead bot notifications only. |
| GLOBAL GRAZING SERVICES | 8 | Nick's daily report posted 16:07 in `général` (console/staging upgrade bugs, SiteGround storage). `maintenance`: server-crash/duplicate-order root cause found and 11 affected orders fixed by Nick; Amy/Joey thanked him — **incident resolved**. |
| Amazing Meds | 0 | Silent. |
| Generator | 0 | Silent. |
| LegalAtoms | 1 | Msg to a different user (not Nick-directed) re: Clutch/GoodFirms review ask — per standing rule, ignore unless direct ask to us (duongdn already handled a template reply in Matrix same day). |
| MyPersonalFootballCoach | 0 | Silent. |
| William Bills | 0 | Silent. |
| Equanimity | 15 | Carrick actively resolving an attendance-sync procedure question with komal.bailur (xid-technologies) — technical dev topic, being handled live, not a blocker. |
| SoCal Auto Wraps | 0 | Silent (not monitored per dropped item). |
| Aigile Dev | 0 | Silent. |

Trello: Rory, Franc, MPFC, Marcel, Raymond ✓ complete. **Maddy, Aysar, Elliott ⚠️ left ○** (Workstream hours outage — see Alert #1).

---

## Discord — AirAgri + Bizurk — 05:20 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 30 | jdiamond + nusvinn active in `airagri_trackpac` re: Trackpac API keys for WithCott integration — normal project work, no blocker. |
| Bizurk (nuscarrick) | 0 (+8 Andrew DM) | Andrew Taraba DM thread: WordPress plugin stability discussion, ongoing, not stalled ("messaged plugin devs first, let's see if they respond"). |

Trello: Andrew Taraba ✓ complete. **James Diamond ⚠️ left ○** (LeNH task-log hours gate — Workstream outage).

---

## Sheets/Workstream — all developers — 05:25 (+07:00)

🔴 **Workstream unavailable this run.** `workstream-login.js` run twice (background + foreground), both times: SSO redirect detected, Keycloak cookies alive, but the headless browser never received a token before timing out (~90s+ hang each attempt, processes killed manually). `sheets-tasklog-scan.js` fallback to Google Sheets returned 0 for every dev/sheet — expected, since the Sheets task-log system was fully retired 2026-08-21 in favor of Workstream, so there is no real fallback data source anymore.

| Developer | Today | Status |
|-----------|-------|--------|
| PhucVT | unknown | ⚠️ Workstream outage, no data |
| TuanNT | unknown | ⚠️ Workstream outage, no data |
| KhanhHH | unknown | ⚠️ Workstream outage, no data |
| LeNH | unknown | ⚠️ Workstream outage, no data |
| LongVV | unknown | ⚠️ Workstream outage — not alertable anyway (ad-hoc, no fixed target) |

**Maddy JIRA weekly cross-check: not run this pass** (time-boxed alongside Workstream outage — script reads a stale Sheet per [[feedback_maddy_jira_weekly_check]], needs recheck).

Trello: none completed on hours basis this run — Maddy/John Yi/James Diamond/Aysar/Elliott/Bailey/Rebecca/Fountain Parts2-3 all left ○, see Alert #1.

---

## Scrin.io — 05:27 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-22):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:30 (+07:00)

**Part 1 — Matrix Plan:** No new weekly-plan post this window (mid-week, plan is posted Mondays ~08:30-09:30 by trinhmtt) — using last known plan, no change expected until Monday.
**Part 2/3 — Task Log Actuals + Plan vs Actual:** ⚠️ Blocked by Workstream outage (project `fountain`), see Alert #1. Not fetched this run.
**Trello board:** Not checked this run (time-boxed).

Trello: Fountain ⚠️ left ○ (Parts 2-3 blocked + board not checked).

---

## Elena — 05:32 (+07:00)

1 open PR on `Elena-SamGuard-Digital-Plant`: **#309** "Implement header and modal components with i18n support" (branch `process-digital-plant`) — not reviewed/merged this run.
WordPress SamGuard CSP/console check: not run this pass (time-boxed).

**Note: Elena - SamGuard Digital Plant and Elena - WordPress SamGuard are on the paused Ignore List** (see below) — auto-completed regardless, PR #309 left as an FYI for whenever the item is unpaused.

---

## OhCleo Slack — 05:34 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 3 | Celine asked Tony if he worked today; Tony confirmed he's off today, will work Mon/Wed/Fri. Scheduling exchange, not an absence issue. |
| #events-code | 0 (channel_not_found) | Known issue — bot removed from channel, needs admin re-invite (not an auth problem). |

Trello: Ohcleo ✓ complete.

---

## Matrix — 05:06 (+07:00)

**Active rooms: 19 / 146 | Messages: 440** *(since 2026-09-22 08:00)*
Full details: reports/2026-09-23/matrix-rooms-0506.md

### Key updates

**Bailey - Paturevision** (112 msgs, NUS - Bailey room):
- App-down incident from last Friday: root cause traced to a PrestaShop↔Console ID-mismatch (StockManager.php queue bug) triggering a Redis/Sidekiq queue pile-up that cascaded into PrestaShop crashing. Fix plan: try/catch on the queue path + move the queue to a separate server. TuanNT actively debugging with duongdn, real production RCA in progress, not yet deployed.
- SiteGround storage at 78% — Redmine issue #81077 opened to track cleanup.
- Nick asked customer testing status on released features; datnc confirmed cus tested gz desktop with feedback, Trinh reviewing; staging2 console validation pending today.

**Elena - Active Alerts** (158 msgs): heavy WBS/estimate clarification thread with the customer (operating conditions/limitations semantics, highlight-period BE/FE split, CSV export) — normal project work, no blockers, Kfir's API contract doc still blank (waiting on his side).

**Delivery - Resource Arrangement** (9 msgs): KhanhHH's 25–30/09 leave flagged by chientx — duongdn resolved it same-thread (16:34): she's mainly on Franc + Aysar, both projects can absorb another dev; PhucVT to be pulled onto James in the interim.

**Other:**
- James Diamond - Portfolio: James went quiet mid-day (online but no reply since ~12:00), replied 16:00 — traveling/school holidays, payment already arranged. Resolved same day.
- Kunal - Fountain: routine QC/dev traffic (SEO ticket pushed direct to master by Kunal — flagged for future PR workflow, ticket went live anyway per vutq's call).
- Raymond - LegalAtoms: Clutch/GoodFirms review-request template sent to client, handled same-thread.
- LeNH task-log reminder for 21/09 (0h, no leave note) was sent in Matrix at 09:26 — predates this window's cutoff, superseded by today's Workstream outage (no fresh data to re-verify).

No unresolved ⚠️ action items directed at DuongDN remain open — the one flagged by the script (chientx's KhanhHH-leave question) was answered same-thread.

---

## Ignore List — 05:36 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip.

---

## Not run this pass (time-boxed alongside Workstream outage)

- Full Matrix all-rooms deep read beyond the summary above (127 inactive rooms not reviewed individually)
- Arthur 6-source full check
- Performance / New Relic (all projects)
- Upwork Memo validation (Rory/Aysar workrooms)
- Elena WordPress SamGuard CSP/console check
- Fountain Trello board + Parts 2-3
- Neural Contract Upwork check — attempted 4x, carrick's Chrome session not reachable in this environment (`DBUS_SESSION_BUS_ADDRESS` warnings, 0 cookies extracted each attempt). Per standing rule, session failure ≠ alert → **Trello item completed anyway.**
- Maddy JIRA weekly cross-check

## Unresolved Questions

1. Workstream SSO outage — is this the same root cause as the documented recurring pattern (Keycloak cookies alive, token API never fires), or a new variant? Needs interactive recheck with a human able to complete SSO in a visible browser.
2. Fountain production error #332 (FountainGifts) — needs verification it's been triaged; not cross-checked against Bugsnag/Trello board this run.
3. MPFC `WP_Error::get_method()` production error — recurring (2 fires in 24h) — worth checking if this is a known/tracked bug or new.
