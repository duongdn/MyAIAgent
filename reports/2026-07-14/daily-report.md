# Daily Report — 2026-07-14 (Tuesday)

**Run:** 2026-07-14T06:55:00+07:00 (cron)
**Window:** 2026-07-13 09:33 +07:00 → 2026-07-14 06:55 +07:00
**Leave plan:** No approved leave on record for LongVV/PhucVT/KhanhHH/LeNH/TuanNT on 2026-07-13 (checked via parse-leave-emails.js). Resource-arrangement Matrix notes: VuTQ half-day (family), ThienVN afternoon personal, ToanNT sick, TinPC medical checkup 07-15, LongVV afternoon off (father's hospital discharge — changed from remote to full off), ThoTNT wedding leave 07-17 & 07-20.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| ~~1~~ | ~~Slack — Baamboozle (Aysar)~~ | **RESOLVED 09:13.** Customer (skjamie25) reported "game selection screen broken on mobile" 2026-07-13 21:17. Carrick's 08:33 "Let me check it now" was filler (per the Aysar rule, doesn't count) — but at **08:45 he posted the real fix**: "I've already fixed the issue and deployed it to Nusdev in this PR. github.com/baamboozle/baamboozle-web-app/pull/639. Please g[o test it]." Real fix + deploy + PR link + customer asked to test = substantive resolution, closes the loop. |
| 2 | Email — rick@ | Real production error spikes: FountainGifts #274 (RestClient::InternalServerError, 10 occurrences/5min), InfinityRoses #435 (same pattern, 10/5min), FirstProject #893/#894/#1074 new errors. Matches Fountain Matrix thread — actively being triaged by devs. |
| 3 | Matrix — Maddy (Xtreme) | **Corrected 08:56 — the "3 PR Critical/High, 18-37 days" claim (originally pasted into the Matrix room by DuongDN) was itself inaccurate.** Live Bitbucket+Jira check: 8 open PRs, all by Kai. Only **1 is genuinely Highest priority — LIFM2-409 (PR #481), and it's 84 days old**, far worse than "18-37 days." The 18-37-day-old PRs (#509/21d, #510/18d) are actually **Medium** priority (LIFM2-428, LIFM2-446). Two more Medium PRs are 75-76 days old (#485, #486, LIFM2-436). #235/LIFM2-285 is 410 days old but explicitly [ON HOLD]. Real problem: Kai has 1 Highest-priority PR stuck in review 84 days, not "3 Critical/High at 18-37 days" — the count, severity, and age were all off in the original framing. LongVV's 07-14 08:49 reply ("resolved several already, one pending") suggests some progress but doesn't map to a specific PR being closed yet — still 8 open as of this check. |
| ~~4~~ | ~~Sheets — TuanNT~~ | **RESOLVED at 08:50 recheck — false alarm.** TuanNT actually logged 8h (7.5h Paturevision + 0.5h Neural Contract), confirmed twice. Root cause was the same Workstream/Sheets flakiness this project has repeat history of. John Yi/Rebecca/Bailey Trello items completed. |
| 5 | Elena — samguard.co CSP | `connect-src` blocks `region1.analytics.google.com` (GA4 region-routed) — NOT resolved, intermittent. 16:14 recheck showed 0 CSP violations because GA4 happened to route to `www.google-analytics.com` (whitelisted) this time instead of `region1.analytics.google.com` (blocked). Both domains are used interchangeably by GA4 — the violation reappears whenever routing picks the region-routed endpoint. Still not agent-fixable (no wp-admin creds, no sudo for .htaccess). |
| 6 | Performance — MPFC | Apdex **0.49 (POOR)**. `membermouse/api/processOrder.php` avg 16.3s (payment processing). Real PHP fatals: `get_header()` undefined in 404.php, `JSON_API_User_controller::error()` undefined method. |
| 7 | Security — MPFC | Time-based blind SQL-injection probes (`WAITFOR DELAY`) hitting the WordPress search endpoint — not exploited, but active reconnaissance against the site. |
| ~~8~~ | ~~OhCleo~~ | **RESOLVED at 08:50 recheck — false alarm.** "No Tony daily report" was flagged without checking whether Tony actually worked OhCleo that day. Workstream shows LongVV logged 0h on the `ohcleo` project 07-13 but **4h on Xtreme Soft Solutions (Maddy)** the same day — he simply worked a different project, no report expected. `MediaByKeyView.get` avg 14.0s over 264 calls (real backend slowness) still stands as a separate, valid performance finding. |
| ~~9~~ | ~~Fountain~~ | **RESOLVED — @trinhmtt posted the weekly plan at 08:53 today** (2026-07-14): DatNT 40h / ViTHT 40h / ThinhT 12h → QC 23h. Parts 2/3 (Monday actuals: DatNT 8h, ThinhT 4h, PhatDLT/QC 0.5h) track reasonably against this plan for day 1. Trello board: no new customer comments. All 3 parts now clean. |
| 10 | Arthur / Meta-Stamp | **Corrected twice, final version 09:55-10:xx (user asked to read everything carefully — good call, found a timing error).** Full 216-message re-read revealed TWO separate events I'd conflated: (1) an internal Art-Chris-Casey review call ≈ 08:00 VN this morning (Tuesday) — status unknown, Art told Nick "wasn't able to do it, waiting on Chris." (2) **The REAL investor demo — likely TONIGHT ~17:00-19:00 VN**, not tomorrow morning as I'd wrongly said last pass ("shortly after today's VN workday ends," per Art's own words; Chris independently called it "tonight/tomorrow" too). Slack access issue from earlier was resolved (my own testing bug — see other alert). PhucVT has 3 pending-review Workstream rows in Crystal lang for 07-13 (reviewer TienND). |
| 14 | Arthur / Meta-Stamp — process issue | **🔴 Real internal issue, initially under-flagged as "context" — user corrected: "vấn đề là nó là issue, sao ko nhắc tới."** The shared Slack login `U0B1C5QAZA4` (used interchangeably by David/namtv/PhucVT/DuongDN when messaging Art/Chris) is causing genuine client-facing confusion, not just an awkward one-off. Evidence: Art got visibly frustrated in ms-v3 (16:32-16:48 Monday, "I don't understand what you're saying, that's not a sentence") talking to what he believed was one person but was actually a confusing developer answer; the team then had to send a separate apology DM to Art clarifying "the person who discussed [X] was the developer, not me" — i.e. Art cannot tell who he's actually talking to from message to message. This happened during the SAME week as the P0/P1 miscommunication crisis that already nearly derailed the investor demo prep (Art: "I had no idea David is working a half day 1 day before the demo, this is insane"). **Risk: this is a structural/recurring problem (shared login), not a one-time mistake — likely to keep causing friction with this client unless each person gets their own identity or the team explicitly signs messages.** Not something we can fix silently (it's a process/tooling decision on the Solid Code team's side), but worth flagging clearly rather than burying as background context. |
| ~~11~~ | ~~Workstream (internal)~~ | **RESOLVED at 08:50 recheck.** `DISPLAY=:1 node scripts/workstream-login.js` restored the session (was already valid, no manual login actually needed). LongVV 4h/PhucVT 7h/KhanhHH 8h/LeNH **8.25h** (James Diamond 8h + Franc 0.25h) all verified — full team accounted for, no shortfalls. Fountain/Crystal-lang actuals also now readable. |
| 12 | Email — vuongtrancr@ | GitHub notice: Carrick removed from the "Swish" org. |
| ~~13~~ | ~~Sheets — LeNH~~ | **FALSE ALARM — corrected after user pushback ("wrong, I see info on James").** The initial "0h everywhere" finding hit the exact per-dev-filtered-fetch flakiness on the James Diamond project already documented in memory for this dev (recurred a 9th+ time). A fresh unfiltered dump found her real total: **8.25h** — 8h on James Diamond (0:10+7:20+0:30, all pending review by PhucVT) + 0.25h on Radio Data Center (Franc). No shortfall, no alert, Blair Brown - Peptide Clyde Trello item unblocked. |

**Today (Tue 14/7):** Đang chờ đủ hours confirm cho LongVV/PhucVT/KhanhHH/LeNH (Workstream). No other staff absence beyond the above notes. Fountain freeze window (Mon 18:00 PT ≈ Tue 08:00 VN) is in effect per Chris's earlier instruction — no Fountain deploys until after Tuesday's calls.

---

## Email — all — 06:20 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 0 | no events |
| carrick@nustechnology.com | 2 | no events |
| nick@nustechnology.com | 0 | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 31 | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 4 | no events |
| ken@nustechnology.com | 80 | 08:30 DE - Daily Standup |
| vuongtrancr@gmail.com | 12 | — |
| dnduongus@gmail.com | 17 | — |
| davidztv19@gmail.com | 5 | — |
| freelancer@mypersonalfootballcoach.com | 2 | — |

- carrick@: Snyk vulnerability alert (marcel org, low priority), Neural C. Upwork message notice.
- rick@: see Alert #2 above (Fountain/InfinityRoses production spikes). FountainStaging errors = INFO only (staging).
- kai@: 4 JIRA notifications (Madhuraka, LIFM2-452/453/428) — routine ticket activity, no unaddressed ask.
- ken@: 80 msgs but none actually Precognize/development-related this window (WYASK-SENTRY + unrelated welligence/web PR are noise for this account's monitored scope) — 0 relevant.
- vuongtrancr@: Signal-lost/metric-deviation New Relic-style alerts (Swish monitoring, routine) + Alert #12 (Swish GitHub org removal).
- dnduongus@: only non-actionable personal mail (LinkedIn, newsletters, bank notices); one "Security alert" item was for a different address (htt.thuyhoang@gmail.com), not this account — no action needed.
- davidztv19@ (Arthur): Stripe funds-update notice, 2 security alerts (own account, routine 2FA notices), Trello card-moved notice, Trello invite reminder.
- freelancer@mpfc: New Relic weekly report (see Performance section for real detail), Mailchimp deliverability nudge — not alerts.
Trello: all 6 Zoho items ✓ complete. Check Mail card marked done.

## Slack — all — 06:25 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 16 | Aysar MPDM update posted (clean) but #testing has unresolved ASAP bug report — see Alert #1 |
| RDC - FM Monitoring | 14 | Carrick's own Monday action-item summary (Munich MPX, plugin reorg) + automated Tuner Access Log noise |
| Swift Studio | 0 | No activity |
| Xtreme Soft Solutions | 3 | Kai posted progress (LIFM2-450 done, 449 in progress) after Madhuraka asked for 453 estimate — folded into Maddy alert #3 |
| SAM GUARD - Mobile | 6 | All automated HubSpot MQL lead notifications, no human content |
| Global Grazing Services | 1 | Internal dev-topic (stats/tenant logic bug, already being investigated) — not a customer complaint |
| Amazing Meds | 0 | No activity (fixed a real script bug this run — cookie was being double-encoded, breaking auth; verified 0 msgs is a real result) |
| Generator | 3 | Internal security note: Burp Collaborator probe found on staging store_url — team confirming with vendor re: recent pentest |
| LegalAtoms | 2 | Generic user-support chatter, no Nick-specific mention — filtered as noise |
| MyPersonalFootballCoach | 1 | Casual greeting only |
| William Bills | 0 | No activity |
| Equanimity | 0 | No activity (same cookie-encoding fix applied) |
| Aigile Dev | 7 | Automated newsletter/MailerLite bot posts only |
| Solid Code (Arthur) | 100+ | See Arthur section below — real content, folded in there |

Trello: Rory, Franc, Elliott, MPFC, Marcel, Raymond, Colin ✓ complete. Maddy ⚠️ skipped (alert #3, recharacterized). Aysar ✓ completed at 09:13 recheck (Carrick posted real fix + deploy, see Alert #1).

## Discord — all — 06:26 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri | 39 | Both Vinn (23:05) and Jeff (17:20, "4 hours") posted daily reports. James (client) reported an OTP/registration bug — actively resolved by Jeff (forgot-password feature added, API details shared). |
| Bizurk | 0 msgs / 2 DMs | Andrew Taraba (animeworld) DM: casual check-ins only ("do you need some work to do?") — normal for this low-communication client. |

Trello: James Diamond, Andrew Taraba ✓ complete.

## Sheets/Workstream — all — 06:30 (+07:00, superseded by 08:50 recheck below)

| Developer | Today (13/7) | Status |
|-----------|--------------|--------|
| LongVV | **4h (Xtreme Soft Solutions)** | Verified 08:50 — part-time weekly target, no daily alert |
| PhucVT | **7h (Crystal lang/Arthur)** | Verified 08:50 — 1h short of daily 8h but marginal shortfalls checked weekly, no alert |
| KhanhHH | **8h (Baamboozle 2.33h + Generator 5.67h)** | Verified 08:50 — full day, no alert |
| LeNH | **8.25h (James Diamond 8h + Franc 0.25h)** | ✅ Corrected 09:10 — initial "0h" was a false alarm (per-dev-filter flakiness on James Diamond, documented recurring issue for this dev), no shortfall |
| TuanNT | **8h (7.5h Paturevision + 0.5h Neural Contract)** | ✅ Verified 08:50 — Alert #4 was a false alarm, John Yi/Bailey/Rebecca Trello items now complete |

Maddy JIRA weekly cross-check: no ticket entries returned this week (Workstream-dependent, blocked at 06:30 — Workstream restored by the 08:50 recheck, not re-run since Kai's Slack progress post (LIFM2-450/449) is a sufficient signal for this piece).

## Fountain — 06:35 (+07:00, superseded by 08:50 recheck below)

- **Part 1 (Matrix plan):** As of 06:35, not yet posted for the current week (last known was 2026-07-06). **UPDATE 08:53:** @trinhmtt posted this week's plan — DatNT 40h/ViTHT 40h/ThinhT 12h → QC 23h.
- **Part 2/3 (task log actuals + plan vs actual):** As of 06:35, blocked (Workstream inaccessible, Alert #11). **UPDATE 08:50:** Workstream restored — Monday (07-13) actuals: DatNT 8h, ThinhT 4h, PhatDLT(QC) 0.5h, tracking reasonably against the new plan.
- **Trello board:** No new customer comments in-window (last kunalsheth/tmmckay comment was before window start). 1 long-stuck Doing card (83 days, pre-existing, not new).
Trello: Fountain ✅ completed at 08:53 recheck (all 3 parts now clean) — see Re-check section for full detail.

## Elena — 06:38 (+07:00)

- Pending-actions: 0 undeployed merged PRs.
- Elena-SamGuard-Digital-Plant: 0 open PRs.
- Precognize/development: 10 open PRs total, 0 authored by nusken.
- samguard.co: 0 JS/page errors; 3 CSP violations at 06:38 (region1.analytics.google.com) — still intermittent, reappears when GA4 routing picks region-routed endpoint.
Trello: Elena - SamGuard Digital Plant ✓ complete (PR/deploy side clean). Elena - WordPress SamGuard ⚠️ skipped (CSP alert — intermittent, 16:14 recheck: 0 violations but only because GA4 routed to whitelisted domain this time, root issue persists).

## OhCleo Slack — 06:40 (+07:00, superseded by 08:50 recheck below)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | No customer messages; no Tony daily report found for 13/7 |
| #events-code | — | Channel no longer resolvable (likely renamed/removed, dormant since 2023 — not an auth issue, same credentials work fine on the DM channel) |

**UPDATE 08:50:** "No Tony report" was flagged as an alert without first checking if Tony actually worked OhCleo that day (same class of mistake as the already-fixed Kai/Aysar gates). Workstream confirms LongVV logged 0h on `ohcleo` but 4h on Xtreme Soft Solutions (Maddy) that day — he worked a different project, no report was ever due.
Trello: Ohcleo ✅ completed at 08:50 recheck (false alarm resolved).

## Matrix — 06:44 (+07:00)

**Active rooms: 26 / 132 | Messages: 490** *(since 2026-07-13 08:00)*
Full details: reports/2026-07-14/matrix-rooms-0644.md

### Key updates

**Maddy (Xtreme)** — duongdn flagged in-room: "Alert thật — 3 PR Bitbucket Critical/High tồn đọng 18-37 ngày (Kai chưa fix)" (Alert #3). **Corrected 08:5x recheck — this claim was itself wrong** (count/severity/age all off, see Alert #3 above): real issue is 1 Highest-priority PR (#481/LIFM2-409) 84 days old.

**Bailey/Paturevision (Console)** — Extended TuanNT/HaVS/datnc debugging of a stock-quantity/multi-tenant scope bug; root cause found (`ActsAsTenant` scoping), fix pushed but numbers still inconsistent after — flagged for further review. duongdn told the team to proactively notify the customer.

**Fountain** — Routine PR/bugfix traffic; confirmed the FirstProject Rollbar error (#1056, part of Alert #2) is now live and no longer reporting.

**Elena - Active Alerts (Precognize AA4)** — Normal sprint planning/coordination, one Java config bug resolved same day.

**Arthur/Meta-Stamp** — Stripe Connect setup discussion (standard tier doesn't support VN bank payout) — see dedicated Arthur report.

**PHP Projects** — Ongoing Upwork contractor dispute/bonus negotiation ($37.50→$41.67), no reply from the contractor as of 21:32.

**ThuyLTT hours reconciliation** — Flagged a process risk: overwriting "actual" hours to match "charge" amounts on Peptide Clyde — worth a policy fix, not just a one-off correction.

**Direct Manager** — A few remaining jobs (e.g. Speedventory) still not on Workstream; everything else confirmed migrated.

**Other (routine):** Resource-arrangement leave notes processed; Matrix compat token confirmed genuinely non-expiring; SSH-per-repo tooling tip shared in Technology Department.

## Performance — all — 06:47 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 321ms | 1.7% (484/27881) — 91% benign NotAuthenticated | 21.9/min |
| MPFC | **0.49 (POOR)** | 1291ms | 0.02% (6/28606) | 22.5/min |
| Fountain Gifts | 0.98 | 158ms | 0.1% (37/37883) | 29.7/min |
| InfinityRoses | 0.98 | 138ms | 0.11% (15/13217) | 10.4/min |

**Slow transactions >5s:**
- OhCleo: `MediaByKeyView.get` 14.0s avg / 264 calls; `MediaAddTrackAPIView.post` 34.7s avg / 2 calls; `MediaListView.get` 4.5s avg / 8 calls (below threshold, watch)
- MPFC: `author-sitemap.xml` 43.4s / 1 call; `membermouse/api/processOrder.php` 16.3s / 3 calls
- Fountain: `ShipStationProOrderWorker` (Sidekiq) 11.2s / 1 call

**Top errors (full detail):**
- OhCleo: NotAuthenticated (443, benign), AuthenticationFailed "User does not exist" (14), InvalidToken expired (10), email-already-exists validation (6), bcrypt hash format (3), no-user-found (2), token-blacklisted (2), IntegrityError null user_id on app_playhistory (1), "Passwords don't match" (1), no verification code (1)
- MPFC: E_WARNING switch/continue (2), 404.php `get_header()` undefined (1), E_WARNING invalid foreach argument (1), `JSON_API_User_controller::error()` undefined method (1) — plus the SQLi probe pattern in slow-transaction URLs (Alert #7)
- Fountain: RestClient::InternalServerError 500 (36), BadGateway 502 (1)
- InfinityRoses: RestClient::InternalServerError 500 (14), `undefined method 'title' for nil:NilClass` (1)

Not gated by any Trello item (informational).

## Scrin.io (TuanNT / John Yi — 2026-07-13): 8h 16m logged (1 session, 08:31AM–04:47PM).

Note: this activity-time signal is what makes TuanNT's 0h task-log day (Alert #4) a logging gap rather than an absence.

## Arthur / Meta-Stamp — 06:48 (+07:00)

Full report: reports/2026-07-14/0648-arthur-monitor.md (Vietnamese, incremental tracker update). Summary: tense scope/communication clash with Art ahead of Tuesday's investor demo — resolved by end of day 13/07 (all P0 items reported done, catalog export done, daily reports posted) but **no confirmation of the demo's outcome** as of this report (silence since 20:01). Fixed a real bug: the Slack "Solid Code" workspace scan was failing `invalid_auth` because of the same cookie-encoding bug found in Piece 2 — token itself is fine.
Trello: Arthur - Meta-Stamp ⚠️ skipped (Alert #10).

## Trello — Check Progress + Check Mail — 06:52 (+07:00, superseded by 08:50 recheck below)

- Check Mail: 6/6 complete → card marked done.
- Check Progress as of 06:52: 11/22 complete.
  - ✓ Complete: James Diamond, Rory, Franc, Elliott, MPFC, Marcel, Elena - SamGuard Digital Plant, Raymond, Neural Contract (Upwork workroom silent — never an alert), Andrew Taraba, Colin.
  - ⚠️ Skipped: Maddy (#3), John Yi (#4), Aysar (#1), Bailey (#4), Rebecca (#4), Fountain (#9), Ohcleo (#8), Arthur - Meta-Stamp (#10), Blair Brown - Peptide Clyde (Workstream login was down at this point — #11), Philip (automation crashed this run — documented fragile MS Teams/Chrome-profile flow, killed after spawning 40+ zombie processes; not a new finding, just couldn't complete this pass).

**UPDATE 08:50-09:13 recheck — Check Progress now 18/22 complete:**
- Newly completed: John Yi, Bailey, Rebecca (TuanNT 8h confirmed), Ohcleo (false alarm resolved), Fountain (plan posted, all 3 parts clean), Blair Brown - Peptide Clyde (LeNH 8.25h confirmed, false alarm resolved), Aysar (Carrick posted real fix + deploy at 08:45).
- Still incomplete (2): Maddy (recharacterized, real issue is different — 84-day Highest-priority PR, not the original claim), Arthur - Meta-Stamp (re-checked, still genuinely pending, see below). Elena - WordPress SamGuard (intermittent — CSP violations appear when GA4 routes to region1.analytics.google.com). Philip also now completed (09:30) — permanently fixed the duplicate-contact bug in the script itself, see below.

## Reminders — 06:53 (+07:00, superseded by 08:50 recheck below)

- TuanNT: flagged 0h at 06:53 — **UPDATE 08:50: false alarm, real total 8h, no reminder needed.**
- LongVV, PhucVT, KhanhHH: skipped at 06:53 due to Workstream outage — **UPDATE 08:50: verified via Workstream, all have real hours logged (4h/7h/8h respectively), no reminder needed.**
- LeNH: skipped at 06:53 — **UPDATE 09:10: verified 8.25h combined (James Diamond 8h + Franc 0.25h), no shortfall, no reminder needed.** (The 08:50 pass's "0h" finding was itself a false alarm, corrected after user pushback — see recheck section.)

---

## Re-check — 08:50 (+07:00)

Workstream login (Alert #11) fixed this pass (`DISPLAY=:1 node scripts/workstream-login.js` — session was actually valid, no manual login needed this time). All items below re-verified live since this changes the picture significantly.

| Item | Result | Details |
|------|--------|---------|
| John Yi - Amazing Meds | ✓ completed | TuanNT confirmed 8h (7.5h Paturevision sheet + 0.5h Neural Contract Workstream), double-checked twice. Alert #4 was a false alarm caused by the AM cron hitting the Workstream/Sheets flakiness this project has repeat history of (see memory). |
| Bailey | ✓ completed | Same TuanNT 8h finding. |
| Rebecca (William Bills) | ✓ completed | Same TuanNT 8h finding; no pending "Chưa" row for 07-13 in Rebecca sheet for TuanNT. |
| Aysar | ✓ completed | **Final update 09:13:** initial "no reply" finding was wrong (search.messages misses thread replies). Carrick's 08:33 "Let me check it now" was filler (per the Aysar rule, doesn't count on its own) — but re-checking the thread again found he posted the **real fix at 08:45**: "I've already fixed the issue and deployed it to Nusdev in this PR. github.com/baamboozle/baamboozle-web-app/pull/639. Please g[o test it]." Fix + deploy + PR + customer asked to test = substantive resolution. KhanhHH's Baamboozle hours also confirmed fine (2.33h that day). |
| Maddy | ○ still incomplete | **User flagged Alert #3 as inaccurate — re-checked live.** Bitbucket (8 open PRs, all Kai) + Jira priority cross-check: real issue is 1 Highest-priority PR (#481/LIFM2-409, "Import Shopify payouts") stuck in review **84 days**, not "3 Critical/High at 18-37 days" as originally posted into the Matrix room. Corrected in Alert #3 above. Still incomplete — genuine backlog exists, just mischaracterized. |
| Fountain | ✓ completed | **Updated after user asked to recheck Kunal plan:** @trinhmtt posted this week's plan at 08:53 today — DatNT 40h / ViTHT 40h / ThinhT 12h → QC 23h (no VuTQ/HaVS this week). Part 2/3: Monday (07-13) actuals — DatNT 8h (exactly on 8h/day pace for 40h/wk), ThinhT 4h (already 33% of 12h weekly target on day 1), PhatDLT/QC 0.5h (early, fine), ViTHT 0h Monday (needs to pick up over remaining days to hit 40h, not alarming yet on day 1). Trello board: no new customer comments since window start. All 3 parts clean. |
| Blair Brown - Peptide Clyde | ✓ completed | **Corrected 09:10 after user pushback** ("wrong, I see info on James") — gated by LeNH's combined hours, which are actually 8.25h (James Diamond 8h + Franc 0.25h), not 0h. See below. |
| Ohcleo | ✓ completed | **Corrected:** no Tony report / no Celine messages is expected, not an alert — Workstream confirms LongVV logged 0h on `ohcleo` project 07-13 but 4h on Xtreme Soft Solutions (Maddy) that day. He worked a different project, didn't touch OhCleo, so no report was ever due. Same class of mistake as the already-fixed Kai/Aysar gates — now generalized into a global rule (see memory). |
| Arthur - Meta-Stamp | ○ still incomplete | **Full re-read of all 216 ms-v3 messages + 4 msv3-official since 07-13 08:00 (per user's "read everything carefully, something's off").** Found and corrected a timing error from my own earlier estimate: **there are TWO separate events, not one.** (1) An internal Art-Chris-Casey review/test call, Art said "tomorrow at 7pm my time" (Mexico) from a Monday message ≈ **08:00 VN Tuesday (today, this morning)**. (2) **The REAL investor demo** — per Art's own Monday 16:00 message: "I have one [call] with him before the start of your day tomorrow, and he has the real one shortly after the end of that same day" — i.e. shortly after today's (Tuesday) VN workday ends ≈ **17:00-19:00 VN TONIGHT**, not tomorrow morning as I'd wrongly recalculated last pass. Chris himself independently called it "Tuesday's harvester demo tonight/tomorrow" in a separate message, confirming it's imminent/loosely timed from his side too. **Status as of today 08:57-08:58 VN:** Nick asked Art how the (morning) call went; Art: "I'm not sure, I wasn't able to do it, waiting on feedback from Chris" — even the AM call has no confirmed outcome yet. Team is prepping hard for tonight's real demo: Trello tracking overhaul, Nam full hours (Art covering the pay Chris won't), 2 demo videos with a Stripe Connect payout workaround (no real payout account access, will narrate around it), private Trello board for info not meant for Chris. **Conclusion: genuinely still open, real demo most likely THIS EVENING VN time — check again this evening, not tomorrow.** (Slack access issue from earlier was resolved — my own testing bug, see other entry.) Workstream Crystal lang still shows 3 pending-review rows for PhucVT on 07-13 (reviewer TienND). **⚠️ NEW 10:07, missed source found (user asked "why wasn't this message mentioned"):** there's a direct 1:1 Slack DM with Art (`D0B0HSZ7XSN`) that was never part of the monitored source list — only the group MPDM (Art+Jack+Nam) and the 2 channels were checked. **Full message, sent 2026-07-13 17:37 VN (Monday), quoted in full since the first pass only excerpted part of it:**
> "Hi Art, Just to clarify, the person who discussed the music provenance depth clarification with you was the developer, not me. As we mentioned earlier, he was the one working on those tasks, not me. I heavily involved mostly on the first demo only. Sorry if the conversation caused any confusion and unclear things. I checked with him and posted a summary in the conversation, I hope that helps. I also talked with him about the communication issue and the lessons learned from this situation so we can avoid similar case in the future. We had him continue working on the catalog export so it could be completed tonight, our time. However, based on what Chris told me, David paused the project around noon. Thus, I'd like to ask Chris that I need additional hours needed to complete the remaining work. Would that be OK from your side, or would you prefer to handle this situation differently?"

Context for the opening part: this is the sender (via the shared `U0B1C5QAZA4` login — used by multiple people, namtv/PhucVT/DuongDN depending who's typing) apologizing to Art for the confusing ms-v3 exchange the day before (16:32-16:48, where Art got frustrated: "I don't understand what you're saying, that's not a sentence") — clarifying that David (the real developer) was the one who answered confusingly, not whoever is DMing Art now. This is a direct symptom of the known shared-account identity issue: Art sees one Slack identity but it's actually several different people. The apology then leads into the real ask: David paused work around noon (per Chris), threatening the "done tonight" plan, and the sender wants Art's OK to request more hours from Chris. **Still no reply from Art as of now — unanswered ~17 hours.** Also checked Nam's DM (routine P2 future-spec notes, not urgent) and Chris's DM (routine payment/Wise transfer tracking chat, not urgent) — no other misses found. |
| Elena - WordPress SamGuard | ○ still incomplete | Re-verified live 16:14: 0 CSP violations NOW but the root issue persists — GA4 intermittently uses `region1.analytics.google.com` (blocked by CSP) vs `www.google-analytics.com` (whitelisted). Today's 06:38 hit the blocked endpoint; 16:14 check happened to hit the whitelisted one. False negative on my part. CSP fix still blocked on missing wp-admin creds/sudo. |
| Philip | ✓ completed | **Fixed and resolved 09:30.** Root-caused the duplicate-contact ambiguity in `scripts/fetch-msteams-customer-messages.js` — the click selector matched whichever "Philip Briggs" duplicate came first in the DOM instead of the real external contact. Patched the script to disambiguate by preferring a match containing "External" or a `MSTEAMS_DISAMBIGUATE` hint (used "Six Star Rentals"). Re-ran — landed on the correct real chat (confirmed via header: **Philip Briggs, pbriggs@sixstarrentals.com.au**). Last activity in this 1:1 chat is **July 1** (Will asked Philip for referrals, no reply since) — nothing new in this report's window (07-13→now). Item completed: no unanswered customer ask in-window. |

**PHP team hours (07-13), now verified via Workstream:**
| Dev | Hours | Status |
|-----|-------|--------|
| LongVV | 4h (Xtreme Soft Solutions) | Part-time, weekly target — not a daily alert |
| PhucVT | 7h (Crystal lang/Arthur) | 1h short of 8h target but per policy marginal shortfalls are checked weekly, not daily — no alert. See PhucVT needsReview finding above (Arthur row). |
| KhanhHH | 8h (Baamboozle 2.33h + Generator 5.67h) | Full day, no alert |
| LeNH | **8.25h (James Diamond 8h + Franc 0.25h)** | ✅ **Corrected 09:10** — the earlier "0h confirmed via 2 independent methods" claim was itself wrong. User caught it ("wrong, I see info on James"). A fresh unfiltered dump immediately found her real hours on James Diamond — this is the exact per-dev-filtered-fetch flakiness on this specific project already documented multiple times in memory for this dev; the "2 independent methods" I ran earlier both apparently hit the same underlying bug rather than being truly independent. No shortfall, no reminder needed. |

**Cleared:** John Yi, Bailey, Rebecca, Workstream/Alert #11 (login restored), Ohcleo (false alarm — LongVV worked Xtreme not OhCleo that day), Fountain (plan posted 08:53, all 3 parts clean), Blair Brown - Peptide Clyde (LeNH's "0h" was itself a false alarm — real total 8.25h, caught by user).
**New:** PhucVT Crystal lang needsReview pending (3 rows, reviewer TienND). Maddy Alert #3 corrected — real issue is 1 Highest-priority PR 84 days old, not "3 Critical/High at 18-37 days."
**Cleared (cont'd):** Aysar (Carrick's real fix + deploy at 08:45).
**Cleared (cont'd):** Philip (script permanently fixed — auto-disambiguates duplicate contacts via config, no more manual workaround; last real activity July 1, nothing new in-window).
**Still open:** Maddy (recharacterized), Arthur.

---

## Unresolved questions
1. Did the Arthur/Meta-Stamp investor demo happen, and what was the outcome? Final corrected estimate (after full transcript re-read): real demo most likely **tonight ~17:00-19:00 VN**, not tomorrow morning as previously stated (that estimate mixed up an earlier internal prep call with the real one) — check again this evening.
7. ~~Solid Code (Arthur) Slack access needs a one-time human login~~ — FALSE ALARM, RESOLVED. Was my own testing bug (auth.test missing the session `d` cookie) plus a stale cookie value in config; both fixed by re-extracting the current cookie from the live, already-logged-in browser profile. No human login was ever actually needed.
8. Arthur/Meta-Stamp real investor demo most likely tonight ~17:00-19:00 VN (corrected after full transcript re-read — was conflating it with an earlier internal prep call). Even that AM prep call has no confirmed outcome yet as of 08:58 — Art told Nick he's waiting on Chris. Check again this evening.
2. samguard.co CSP fix needs wp-admin credentials or SSH sudo access — neither currently on file.
3. ~~GitHub check for `Christebob/Meta_Stamp_V3` needs the `davidztv` account logged into `gh`~~ — RESOLVED, `davidztv` account works fine (`GH_TOKEN=$(gh auth token -h github.com -u davidztv)`), used successfully at 10:19 to pull PR/commit history.
9. **Arthur/Meta-Stamp — shared Slack login (`U0B1C5QAZA4`) is causing real client confusion**, flagged as Alert #14 above, not just a passing note. Worth deciding whether to give each team member (David/namtv/PhucVT/DuongDN) their own Slack identity when messaging Art/Chris directly, since the current setup already visibly frustrated Art once this week.
4. ~~MS Teams Philip Briggs check remains fragile~~ — FIXED 09:30, script now auto-disambiguates the correct contact via config, no longer fragile.
5. ~~LeNH 0h on 2026-07-13~~ — RESOLVED, was a false alarm (see recheck section). No action needed.
6. Given LeNH's project has now had 9+ documented instances of per-dev-filtered Workstream queries silently missing real hours (specifically on James Diamond and Peptide Clyde), worth escalating to whoever maintains the Workstream API as a real bug report rather than continuing to work around it per-incident.
