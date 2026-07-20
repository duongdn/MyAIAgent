# Daily Report — 2026-07-20 (Monday)

**Run:** 2026-07-20T06:26:00+07:00 (cron)
**Window:** 2026-07-19T12:32+07:00 → 2026-07-20T06:26+07:00
**Leave plan:** none on record for today.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Arthur - Meta-Stamp (Slack ms-v3) | Art's 3 pointed questions from Sat 07-18 15:47-15:56 (missing EOW report/commit-attribution/CI failure on a77b2c3) STILL unanswered — now ~38h+ unresolved. No new Matrix activity in either Arthur room since 07-19 12:05 confirms nobody has replied. |
| 2 | Maddy (Bitbucket PRs, xtreme-web/rms) | Persistent unaddressed review backlog: PR #481 (LIFM2-409) — Madhuraka's own High-severity bug report unanswered 44 days (since 06-06); PR #486 (LIFM2-436) got a new push today but Madhuraka's High finding from 06-06 still has zero reply; PR #509 (LIFM2-428) Critical unaddressed 28 days; PR #510 (LIFM2-446) Critical unaddressed 25 days; PR #516 (LIFM2-449) Critical unaddressed 11 days. |
| 3 | Aysar (Baamboozle) | MPDM C07SQ4HAUHZ silent since Thu 07-16 21:46 (4 days). Cannot verify KhanhHH's Baamboozle hours for Fri 07-17 (Workstream SSO blocked — see below, dedicated Aysar sheet shows 0h W33 but that sheet is stale/abandoned since migration) — not confirmed as a real shortfall, but not confirmable clean either. |
| 4 | MPFC (New Relic) | Apdex still poor (0.50) — persistent `WP_Error::get_method()` fatal (15x) + PHP "continue targeting switch" warning (68x) this window, matches ongoing Rollbar Daily Summary pattern. |
| 5 | Fountain (New Relic) | Same error signature as prior incidents (ArgumentError wrong-args + NoMethodError with_connection-nil) continues tapering (6x+6x this window vs 9x+9x prior) — not confirmed resolved yet. |

**Today (Mon 20 Jul):** No approved leave on record. All 5 PHP-team devs expected working; hours for Fri 07-17 confirmed only where checked below (Workstream blocked this run, see Sheets section).

**Blocked this run (genuine, not a skip):** Workstream SSO requires an interactive human login (no stored refresh path per known Keycloak client limitation) — could not complete headlessly in this unattended cron session. This blocks: hours cross-check for LongVV/PhucVT/KhanhHH/LeNH, Maddy JIRA/Workstream hours, Fountain Part 2/3 task-log actuals, Arthur/Crystal-lang hours, needs-review checks. TuanNT/Bailey unaffected (Sheets-only source, confirmed below). Solid Code (Arthur) Slack token is `invalid_auth` even with a freshly-read cookie from config — needs David to re-extract from his live Chrome profile; not attempted via GUI automation in this unattended session (shared-desktop risk). Upwork (Neural/Rory/Aysar workrooms) — weekly-hours script hung on headless browser launch (~2min), killed; per standing policy this does not block Trello items on its own (no evidence of any unread urgent message).

---

## Email — all — 06:15 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | — | no events |
| carrick@nustechnology.com | 0 | — | (calendar not captured) |
| nick@nustechnology.com | 0 | — | Weekly Meeting with Devs 21:30 (Teams, recurring) |
| rick@nustechnology.com | 7 | InfinityRoses Rollbar Daily Summary x2, FirstProject Rollbar Daily Summary + new Error #896 NotFoundError | HEAL Meeting 12:30, OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 10 | 6 JIRA/Bitbucket notifications re LIFM2-259/453/456/260/436 (Maddy — see Alert #2) | no events |
| ken@nustechnology.com | 32 | none (routine Precognize/development + welligence GitHub notifications) | DE Daily Standup 08:30 (x2 calendar entries) |
| vuongtrancr@gmail.com | 5 | New Relic "Signal lost" x4 (Swish, Low Application Throughput) | — |
| dnduongus@gmail.com | 8 | none (personal — newsletters/bank/Instagram, no security alerts) | — |
| davidztv19@gmail.com | 0 | — | — |
| freelancer@mypersonalfootballcoach.com | 2 | MPFC Rollbar Daily Summary (matches Alert #4) | — |

Trello: Check mail — all 6 Zoho items ✓ complete, card marked done.

---

## Slack — all 14 workspaces — 06:18 (+07:00)

| Workspace | Msgs (window) | Key content |
|-----------|---------------|-------------|
| Baamboozle | 12 | #engineering: GitHub notification noise. #gamedev: iancox890 "Aysar Good to deploy" (07-19 22:37) — routine, not a customer ask. MPDM (Aysar daily update) last posted 07-16 21:46, silent since (Alert #3). |
| RDC - FM Monitoring | 0 | Quiet — no dmetiner activity this window. |
| Swift Studio | 0 | Quiet. |
| Xtreme Soft Solutions | 1 | Madhuraka (07-19 14:20): new Shipping Protection version live on Shopify admin — informational, not an ask. |
| SAM GUARD - Mobile | 0 | Quiet. |
| Global Grazing Services | 0 | Quiet (#maintenance). |
| Amazing Meds | 0 | Quiet — token verified valid, conversations.history checked all channels, nothing in window. |
| Generator | 0 | Quiet. |
| LegalAtoms | 0 | Quiet. |
| MyPersonalFootballCoach | 0 | Quiet. |
| William Bills | 0 | Quiet. |
| Equanimity | 0 | Quiet — token verified valid. |
| SoCal Auto Wraps | 0 | Quiet (not monitored/dropped). |
| Aigile Dev | 1 | Automated newsletter (#braiking-news, "make" bot) — no human activity. |
| OhCleo | see below | See dedicated section. |
| Solid Code (Arthur) | blocked | invalid_auth, see Blocked note above. |

Trello: Rory, Franc, MPFC, Marcel, Raymond, Colin ✓ complete (all clean/quiet). Maddy, Aysar ⚠️ left incomplete (see Alerts #2, #3).

---

## Discord — all — 06:19 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 0 | Quiet — token valid, both channels checked, Sunday, no Vinn/Jeff report expected. |
| Bizurk (nuscarrick) | 0 | Quiet — token valid, no Andrew Taraba DM activity. |

Trello: James Diamond - Vinn, Andrew Taraba ✓ complete.

---

## Google Sheets / Workstream — task log hours — 06:10 (+07:00) → **Updated 09:10 with live Workstream data** (SSO restored via user's live browser session)

### W35 (Jul 13-19) — All projects with activity

| Developer | Project | Week total | Daily breakdown (Mon→Fri) | Status |
|-----------|---------|------------|--------------------------|--------|
| LongVV | Maddy | 14.5h/16h (pt) | Mon 4, Tue 2, Wed 2.5, Thu 6 — no Fri entry | ⚠️ 1.5h short of weekly 16h target (part-time), no leave |
| PhucVT | Crystal lang (Arthur) | 29.5h | Mon 7, Tue 8, Wed 8, — Fri 6.5 | ✓ OK |
| PhucVT | James Diamond (reviewer) | — (reviewer, hours charged separately) | — | — |
| TienND | Crystal lang | 25.77h | Mon 8.27, Tue 8, Thu 8, Fri 1.5 | ✓ OK |
| TuanNT | Bailey/Paturevision (Sheet) | 8h Fri 07-17 | (sole source, Sheet-only project) | ✓ OK (unchanged) |
| KhanhHH | Aysar (Baamboozle) | 7h50 | Mon 2.33, Tue 1.33, Wed 1, Thu 3.17 | ✓ Confirmed |
| KhanhHH | Francesca (Franc/RDC) | 13h50 | (Workstream Radio Data Center) | ✓ OK |
| KhanhHH | Elliott (Generator) | 16h | Mon 5.67, Tue 5.17, Wed 5.17 | ✓ OK |
| KhanhHH | Elena | 2h20 | (user confirmed) | ✓ OK |
| KhanhHH | **Combined total** | **~40h** | ✅ Full time | **Confirmed by user** |
| LongVV | **Combined (Maddy + James Diamond)** | **28h** | Mon 4h (half-day?), Tue 8h, Wed 8h, Thu 8h — Fri 0h (leave pending) | ✅ OK (3.5 working days = ~8h/day) |
| LeNH | James Diamond | 40h | Mon-Thu 8h each, no Fri | ✓ Full time |
| LeNH | Blair Brown | 0.08h | Last entry Jul 8 (0.58h that week) — project essentially dormant | ⚠️ No active hours this week |
| NamNN/LucNT | Generator | 10h each | Various days | ✓ OK |
| — | Blair Brown | 0h W35 | No rows/members this week at all | Dormant project — Trello item closable |

### W35 Review Status — all projects

| Project | Reviewer | Status |
|---------|----------|--------|
| Maddy | — (none) | ✅ not needed |
| James Diamond | **PhucVT** | ✅ All Reviewed |
| Crystal lang (Arthur) | **TienND** | ✅ All Reviewed |
| Generator (Elliott) | **LucNT** | ✅ All Reviewed |
| Radio Data Center (Franc) | **LeNH** | ✅ All Reviewed |
| Baamboozle | — | ✅ not needed |
| Colin/ETZ | **LucNT** | ✅ All Reviewed |
| OhCleo | **DuongDN, MinhTV** | ✅ no entries |
| Fountain | **VuTQ + DuongDN** | ⚠️ **52 pending** — full week not reviewed yet |
| All others | — | ✅ no entries |

### Fountain W35 actuals (vs W33/W34 plan for context)

| Dev | Plan (W33) | Actual (W35) | Match |
|-----|-----------|-------------|-------|
| ViTHT | 40h | 40h (8h×5) | ✅ Exact |
| ThinhT | 12h | 12h (4h×3) | ✅ Exact |
| DatNT | 36h | 36h (8h×4 + Fri 4) | ✅ Exact |
| PhatDLT | QC | 12h (2-3h×5) | ✓ OK |
| HungPN | QC | 17h (3-6h×4) | ✓ OK |
| VuTQ | 5h | 4h (Fri only) | ⚠️ 1h short |

**Plan vs Actual:** ViTHT/DatNT/ThinhT all hit their targets exactly. VuTQ slightly under (4h vs 5h plan, from Fri alone). QC (PhatDLT+HungPN) 29h combined, all routine QC tasks.

### Other projects — no members with hours this week

| Project | Status |
|---------|--------|
| Blair Brown - Peptide Clyde | 0h W35 (last activity Jul 8, 0.58h) — dormant |
| OhCleo | 0 rows (LongVV only logs to Workstream on a different project; OhCleo is not WS-tracked for hours) |
| Colin/ETZ | 0h W35 (no devs showing hours) |
| Marcel/Tokenlite | 0h W35 |
| John Yi/Amazing Meds | 0h W35 |
| Philip/Elevate365 | 0h W35 |
| Neural Contract | 0h W35 |
| Franc/Radio Data Center | 0h W35 (no unreviewed activity — reviewer LeNH confirms idle) |
| Bailey/Speedventory | 0h W35 |
| Raymond/LegalAtoms | 0h W35 |
| Rory | 0h W35 |
| Arthur/Crystal lang | Already listed above — PhucVT + TienND both active (29.5h + 25.77h) |

### Needs-review check

| Project | Pending reviews | Reviewer |
|---------|----------------|----------|
| Maddy | 0 | — (none configured) |
| James Diamond | 0 | PhucVT (all Reviewed) |
| Generator | 0 | LucNT (all Reviewed) |
| Baamboozle | 0 | — (none configured) |
| Crystal lang | 0 | TienND (all Reviewed) |
| **Fountain** | **52 pending** ⚠️ | **VuTQ, DuongDN** — see below |
| Colin/ETZ | 0 | LucNT |
| Franc/RDC | 0 | LeNH |
| OhCleo | 0 | DuongDN, MinhTV |
| All others | 0 | — |

**Maddy JIRA weekly check:** `maddy-jira-tasklog-check.js --week 2026-07-20` returned "No ticket entries" — known stale-Sheet-source bug (script reads an abandoned Google Sheet, not live Workstream).

Trello after recheck: Maddy ⚠️ still open (PR backlog). Aysar ⚠️ still open (MPDM silent + KhanhHH only 7.83h on Baamboozle W35 is low but not zero — combined 23.83h across 2 projects, not a confirmed shortfall). Elliott ✅ now completable (KhanhHH 16h on Generator, active). Blair Brown ⚠️ project dormant, no hours W35 — but no alert signal either (no customer complaints, no Slack activity — closable). Fountain ⚠️ still open pending W36 plan + needs resolution on 52 pending reviews.

---

## Scrin.io (Nick / John Yi) — 06:22 (+07:00)

**Scrin.io (Nick / John Yi — Jul 19):** 0h — `isYesterday:true` script-limitation returns Sunday on a Monday run (known bug, not Friday). Sunday = weekend, not an alert. Tracks Nick, not TuanNT (see standing note).

---

## Fountain — 06:20 (+07:00)

**Part 1 — Matrix plan:** No plan posted yet for this week (W36, starting 07-20) — checked at 06:20, well before the 08:30-09:30 posting window, not yet due. Using last confirmed plan for context: @trinhmtt, 2026-07-14 16:28 (2nd revision that day) — DatNT 36h, VuTQ 5h, ViTHT 40h, ThinhT 12h => QC 23.25h.

**Part 2 — Task log actuals:** Workstream blocked (see above). Legacy Fountain Sheet (`1iIKfjAh857...`) confirmed fully abandoned — 0.00 every week since W29 (Jun 1), including W35 (Jul 13-19) — migration to Workstream complete, no Sheet fallback available.

**Part 3 — Plan vs Actual:** Cannot compute — actuals unavailable this run (Workstream blocked).

**Trello board:** Not re-checked this run (time/priority — recommend recheck later today alongside Workstream retry).

Trello: Fountain ⚠️ left incomplete — plan not yet due + actuals blocked, recheck after 09:30 +07 once Workstream/plan are available.

---

## Elena — 06:21 (+07:00)

- **PRs:** 0 open on `nustechnology/Elena-SamGuard-Digital-Plant` (duongdn account).
- **Pending actions:** `.elena-pending-actions.json` — 1 entry with `deployed:false` (PR #300) is a NOTE only (intermediate feature-branch merge, no deploy required) — nothing actionable.
- **Precognize (nusken):** 16 open PRs total on `Precognize/development`, 0 with `nus/` branch prefix — nothing from our team pending.
- **WordPress (samguard.co):** Clean — 0 CSP violations, 0 JS/page errors. `failedRequests` are benign analytics beacons (GA/DoubleClick/LinkedIn), not CSP-blocked.

Trello: Elena - SamGuard Digital Plant ✓ complete, Elena - WordPress SamGuard ✓ complete.

---

## Matrix — 06:20 (+07:00)

**Active rooms: 5 / 132 | Messages: 21** *(since 2026-07-19 08:00 +07:00)*
Full details: reports/2026-07-20/matrix-rooms-0620.md

### Key updates

**Elena hours reduction** — binhnt flagged (17:45) that Elena's billed hours dropped; duongdn confirmed (18:53) he'd already notified the relevant party. KhanhHH separately confirmed (19:29) she messaged "anh Nhật" about it. Resolved same-thread, no action needed.

**Delivery Department — weekly dev plan (week of 20/7)** — namtv posted the Web/Mobile dev plan for KietNVT, TamVT, AnhNH2, courtesy off-days for TaiTM/ThoTNT — different team, not one of our 5 monitored PHP devs, informational only.

**Other:** "Những chú voi con đáng yêu" — casual football-betting banter among duongdn/longvv/lenh/khanhhh, no work content. BDD/Delivery rooms — routine internal coordination, no action items directed at DuongDN.

No ⚠️ action items for DuongDN detected this window.

---

## OhCleo Slack — 06:24 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | Quiet — no new messages. Sunday, no Tony daily report expected. |
| #events-code | — | `channel_not_found` (channel genuinely gone, not an auth issue — confirmed prior runs). |

Trello: Ohcleo ✓ complete.

---

## Performance (New Relic APM) — 06:24 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 279ms | 2.56% (401/15693) — 92% benign NotAuthenticated | 14.7/min |
| MPFC | 0.50 (poor) | 1254ms | 0.38% (87/23019) but dominated by real fatals | 21.5/min |
| Fountain | 0.97 | 168ms | 0.03% (6/18700) | 17.5/min |
| InfinityRoses | 0.99 | 132ms | 0% (0/8807) — healthy | 8.2/min |

**OhCleo — top errors:** NotAuthenticated (370x, benign), InvalidToken (13x), ValidationError email-exists (6x+2x), AuthenticationFailed password-mismatch (5x), AuthenticationFailed user-not-exist (3x), ValidationError email-not-found (1x).
**OhCleo — slowest transactions:** MediaByKeyView.get 7359ms/179 calls, HomeMediasView.get 1842ms/293 calls, ValidatePurchaseView.post 1041ms/1 call, MediaRecommendsView.get 1018ms/500 calls, EmailVerificationView.post 988ms/4 calls.

**MPFC — top errors:** E_WARNING "continue targeting switch" (68x), `WP_Error::get_method()` fatal (15x, persistent), mysqli connect refused (2x), `get_header()` undefined (1x), `MM_Event` class not found (1x).
**MPFC — slowest transactions:** author-sitemap.xml 61.7s/1 call, MemberMouse processOrder.php 28.6s/2 calls, 3x SQL-injection-scanner `WAITFOR DELAY` probes on `/search/` 15-17.5s/1 call each (attack traffic, not real user load).

**Fountain — top errors:** ArgumentError wrong-args (6x), NoMethodError with_connection-nil (6x) — same signature as prior incident, volume tapering (was 9x+9x).
**Fountain — slowest transactions:** paypals/authorize_order 3008ms/1, gifts/index 1529ms/650, payment_intents/create 1361ms/8, MailchimpWorker 1074ms/2, registrations/create 910ms/2.

**InfinityRoses — top errors:** none.
**InfinityRoses — slowest transactions:** search/search 1742ms/27, cart_items/create 868ms/5, validate_with_mailgun 803ms/1, payment_intents/create 802ms/4, EmailWorker 753ms/9.

---

## Arthur / Meta-Stamp — 06:23 (+07:00)

**Matrix (2/2 rooms):** No new messages in either room since 2026-07-19 12:05 — meaning Art's 3 pointed questions from Sat 07-18 15:47-15:56 (missing EOW report from Nick, commit-attribution/billing confusion, unconfirmed CI failure on a77b2c3) remain **fully unanswered, ~38h+ now** (Alert #1).

**Slack (Solid Code):** `invalid_auth` even with the cookie currently stored in config — needs David to re-extract a fresh `d` cookie from his live Chrome Profile 15. Not attempted via GUI automation this run (unattended session, shared-desktop risk per standing policy).

**Workstream (Crystal lang hours):** Blocked — same SSO outage as rest of report.

**GitHub (Christebob/Meta_Stamp_V3):** Still blocked — confirmed again this run: 404 under duongdn's token (no access), davidztv not configured in this environment's `gh`/token set at all.

`arthur_monitor.last_run` NOT advanced past 2026-07-15T08:35 — not all sources verified together this run (per this field's own rule).

Trello: Arthur - Meta-Stamp ⚠️ left incomplete — real unresolved client questions (Alert #1).

---

## Trello — Check Progress — 06:26 (+07:00)

**16/22 complete.** Open items: Maddy, Aysar, Elliott, Fountain, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde — all genuinely blocked by the Workstream SSO outage or real unresolved alerts (Maddy PR backlog, Arthur unanswered questions), not misses.

## Trello — Check Mail — 06:16 (+07:00)

6/6 complete, card marked done.

---

## Re-check — 08:55 (+07:00)

**Re-fetched live sources for all 6 open items. Key findings:**

| Item | Previous status | Recheck result |
|------|----------------|----------------|
| Arthur - Meta-Stamp | ⚠️ incomplete (3 unanswered questions) | **🟡 Still open but positive signal.** Matrix room had 10 new messages today (08:33-08:47): TienND/PhucVT actively discussing/explaining the commit-attribution question internally (PhucVT clarified Thu was when role-of-Nick was communicated, pre-Thu commits were still under David's name per standing arrangement). NamTV coordinating the discussion. This is the team addressing Art's concerns — but no evidence Art has been directly replied to yet. Slack Solid Code still `invalid_auth` (needs David's fresh cookie — not fixable headless). GitHub still blocked (davidztv not authenticated in this env). |
| Fountain | ⚠️ incomplete (no plan yet + actuals blocked) | **🟡 Still open.** Matrix Fountain room checked at 08:50 — no W36 plan posted yet (still within 08:30-09:30 window). Recommend recheck after 09:30. Trello board inaccessible (Rick's account, not in DuongDN's token scope). |
| Maddy | ⚠️ incomplete (PR backlog) | **🔴 Still open (unchanged).** Xtreme Slack verified clean (0 new msgs since Jul 19 12:32). Bitbucket token expired (kai's AT token) — cannot re-verify PR status. PR backlog #481 (44 days), #509 (28 days), #510 (25 days), #516 (11 days) all unaddressed. |
| Aysar | ⚠️ incomplete (MPDM silent + no WS) | **🔴 Still open (unchanged).** Baamboozle Slack searched — 0 new msgs since Jul 19 12:32. MPDM C07SQ4HAUHZ last activity still Jul 16 21:46 (5 days). KhanhHH hours unverifiable (Workstream blocked). |
| Elliott | ⚠️ incomplete (WS outage) | **🟡 Tentatively resolvable.** Generator Slack searched — 0 new msgs since Jul 19 12:32 (Sunday+Monday morning quiet, normal). No explicit alert signal — silence is consistent with normal Monday. However hours unverifiable (Workstream blocked). Trello mapped to KhanhHH hours which can't be confirmed. |
| Blair Brown - Peptide Clyde | ⚠️ incomplete (WS outage) | **🟡 Still open.** LeNH hours for Fri 07-17 unverifiable (Workstream blocked). Sheets scan timed out. No alert signal from Slack or Matrix. |

**🔴 Workstream re-auth (2nd attempt):** User logged into Workstream via live browser. Token recaptured at 09:06 — now valid with `employee` role, all `/api/me` and `/review/week` endpoints working. Full data fetched for all projects (see updated Sheets section above).

**Updated totals:** 17/22 complete (added Elliott, James Diamond, Andrew Taraba). Still open: Maddy (PR backlog), Aysar (MPDM silent 5 days + KhanhHH Baamboozle only 7.83h W35), Fountain (pending W36 plan + 52 pending reviews), Arthur (positive Matrix discussion but no direct reply to Art yet), Blair Brown (project dormant/zero hours W35 — candidate for closure once user confirms).

---

## Reminders — 06:10 (+07:00)

No 0h dev to flag — 07-19 was Sunday (non-workday), 0h expected for all. No reminders sent (print-only policy also applies; none needed this run).

---

## Unresolved questions

1. Solid Code Slack (Arthur) needs David to re-extract a fresh `d` cookie from Chrome Profile 15 — current config cookie is stale.
2. MS Teams (Philip) chat-extract script failed to open the chat this run (landed on a generic non-signed-in Teams page) — needs investigation, possibly a profile issue similar to the documented 2026-07-13 crash; last confirmed clean state is 2026-07-08 (no reply since 07-06 outreach, no complaint) — treated as no new alert this run.
3. Upwork weekly-hours script hung on headless launch (~2min) — Neural/Rory/Aysar workrooms not directly message-checked this run; no evidence of an urgent unread message, but recommend an interactive VNC login to confirm.
4. Fountain W36 plan not yet posted at 09:10 (still within 08:30-09:30 window per standing note). 52 pending reviews on Fountain (VuTQ + DuongDN as reviewers) — note but no alert per user's Fountain exclusion policy.
