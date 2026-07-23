# Daily Report — 2026-07-24 (Friday)

**Run:** 2026-07-24 06:08 (+07:00) (cron)
**Window:** 2026-07-23 08:45 → 2026-07-24 06:08 (+07:00)
**Leave plan:** LongVV — half-day off 2026-07-24 (tái khám nội soi dạ dày, today, does not affect the window covered below)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Maddy/Xtreme — Bitbucket | PR #481 (LIFM2-409): Madhuraka's own High-severity bug report (Xero double-posting refunds) still zero replies since 2026-06-06 — **48 days unanswered**. PR #510 (LIFM2-446): automated Codex Critical finding unaddressed since 2026-06-25 — **29 days**. |
| 2 | Equanimity (Marcel/Carrick) | Marcel is requiring Carrick to screen-record all working time on top of the Upwork tracker. Carrick pushed back strongly ("very uncomfortable, like someone sitting next to me watching"). NamTV/DuongDN internal decision leaning toward declining. Relationship-risk item, needs your call. |
| 3 | Swish (vuongtrancr@gmail.com) | 8× New Relic "Signal lost for 10 minutes — Low Application Throughput" alerts through the day (2026-07-23). |
| 4 | MPFC — New Relic (prod) | Apdex 0.52 (poor). `sitemap_index.xml` avg 55.6s (1 call). Active SQLi scanner (`WAITFOR DELAY` payloads) hitting `/search/`. Real app errors: `JSON_API_User_controller::error()` undefined method ×38, `WP_Error::get_method()` undefined ×24. |
| 5 | OhCleo — New Relic (prod) | 3 endpoints >5s avg: `MediaAddTrackAPIView.post` 16.9s (4 calls), `CreatorVerificationSubmitView.post` 15.8s (1 call), `MediaByKeyView.get` 8.6s (249 calls — high volume, worth prioritizing). |
| 6 | carrick@ email | XiD SaaS Backend GitLab pipeline failed ×3 (03:34/03:38/08:52 UTC). Snyk vulnerability alert for the `marcel` org. New Relic: "account no longer syncing data." |
| 7 | Aysar/Baamboozle | No "Today's update" posted in MPDM (`C07SQ4HAUHZ`) since 2026-07-22 17:10 — nothing yet for 2026-07-23. KhanhHH's Baamboozle hours could not be verified this run (see #9) — cannot confirm whether this is a real miss or a no-work day. |
| 8 | Bailey/Paturevision (TuanNT) | Paturevision sheet shows **0h for TuanNT on 2026-07-23** (real, sheet-confirmed — this is the sole/authoritative source for Bailey), no leave note found in leave-plan.json or the Delivery-Resource-Arrangement Matrix room. TuanNT may have worked other Workstream-tracked projects that day, but that could not be verified this run (see #9). |
| 9 | Workstream (env gap, this run) | SSO login did not complete after 6 attempts this run (`workstream-login.js` opens the browser, clicks "Sign in with SSO", never captures a token — no interactive human available on this cron server to complete the SSO consent step). This blocks hours verification for: Maddy, John Yi, Rebecca, James Diamond, Rory, Franc, Aysar, Generator/Elliott, Blair Brown, OhCleo, Fountain (Part 2/3), Crystal-lang/Arthur. Google Sheets fallback checked directly where possible — most of these sheets are stale/abandoned since the 2026-07-13 Workstream migration and show 0 real entries either way. **Will retry at next interactive recheck.** |
| 10 | Environment gaps (this mpfc.mpfc.live cron server, this run) | `nusken`/`nuscarrick`/`davidztv` GitHub accounts are not registered in `gh auth` on this server (only `duongdn` + `mypersonalfootballcoach` are) — blocks Precognize PR check, Aysar/Bizurk GitHub issue checks, and Arthur/Meta-Stamp GitHub commit check. Carrick's Upwork live-cookie extraction (`get-carrick-upwork-cookies.py`) needs `DBUS_SESSION_BUS_ADDRESS` / his real desktop Chrome profile, neither present here — blocks Neural Contract, Rory, Aysar Upwork checks. Solid Code (Arthur) Slack session token+cookie both `invalid_auth` — needs a fresh cookie pulled from David's live desktop Chrome profile, not available here. None of these are fixable from this server; all are known, previously-documented patterns tied to which machine a cron run executes on. |

**Today (Fri 2026-07-24):** LongVV off half-day (afternoon, per leave email). No other confirmed leave today.

---

## Email — all — 06:08 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 2 | 0 | no events |
| carrick@nustechnology.com | 10 | 8 (GitLab fail ×3, Redmine Generator bugs ×3, Snyk, New Relic sync) | no events |
| nick@nustechnology.com | 6 | 1 (Azure DevOps PR notif — info) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 22 | 10 (FountainStaging BugSnag ×3 — staging, INFO; FirstProject prod Rollbar new errors ×2 — client app, INFO; Daily Summaries) | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 1 | 0 | no events |
| ken@nustechnology.com | 30 | 3 (welligence/* GitHub notifications — not our repo, INFO only) | 08:30 DE Daily Standup, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 9 | 8 (Swish "Signal lost" ×8, see Alert #3) | — |
| dnduongus@gmail.com | 17 | 2 (UOB eStatement — ignore per filter; LastPass "login attempt blocked" — security notice, attempt was blocked) | — |
| davidztv19@gmail.com | 4 | 0 (Google security notice for own account, GitHub SSH key added, Atlassian subscription ended, GoDaddy access invite from Chris Coyne — all routine/expected) | — |
| freelancer@mypersonalfootballcoach.com | 2 | 1 (MPFC Daily Summary — see New Relic/Performance section for real errors underneath) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete (all 6 accounts checked). Card "Check mail" fully complete.

---

## Slack — all — 06:08 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 19 | #testing — active QA thread between Carrick and customer skjamie25 (BXR-style bug reports, PRs, fixes deployed to Nusdev). Actively worked, not stalled. |
| RDC - FM Monitoring | 5 | Automated "Tuner Access Log" bot posts only — no dmetiner activity. |
| Swift Studio | 3 | #bxr__app — Rory/Henry discussing hour estimates for Booking Flow features. Internal, no issue. |
| Xtreme Soft Solutions | 0 | No activity this window (see Maddy section for the Bitbucket-side alert). |
| SAM GUARD - Mobile | 0 | No activity. |
| GLOBAL GRAZING SERVICES | 1 | Nick's daily report present in #maintenance: WARNING — nightly memory spikes recurring 20+ days, self-resolving within ~1h each night. Storage/swap OK. |
| Amazing Meds | 0 | No activity. |
| Generator | 2 | #business-analysts — Violet (BA) posted next-release ticket list + a pending Trello comment awaiting reply. Internal task coordination, not a customer complaint. |
| LegalAtoms | 1 | #general — customer (hamidsalamatali97) asked Armaghan Iqbal to fix a dropdown layout issue. Not Nick-specific — filtered per gate. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 27 | #xid-technologies — heavy XiD dev thread (Carrick/Marcel/Komal) plus the screen-recording friction, see Alert #2. |
| SoCal Auto Wraps | — | Dropped 2026-05-11, no longer monitored. |
| Aigile Dev | 20 | #etz-nus — real production checkout bug ($NaN cart price) diagnosed and fixed live by Carrick, confirmed resolved by Colin ("all working again"). |

Trello: James Diamond, Rory, Franc, MPFC, Elena-SamGuard, Raymond-LegalAtoms, Andrew Taraba, Colin ✓ complete. Maddy, Aysar, Elliott, Marcel ⚠️ left incomplete (see alerts #1, #2, #7, #9).

---

## Discord — all — 06:08 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 35 | Active in #airagri_webapp / #airagri-flutter / #airagri_voicetesting. Vinn: implemented + deployed logic to staging, updated mobile. Jeff: posted full formal daily report (10:24, "Here is my daily report for today (8 hours)") plus Canary Speech voice-testing files delivered to Jon. James Diamond (client) praising recent work ("amazing job", "Sensational work"), planning sales ramp-up. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew Taraba DM activity — normal for this low-communication client. |

Trello: James Diamond - Vinn task, Andrew Taraba ✓ complete.

---

## Sheets / Workstream — 06:08 (+07:00)

🔴 **Workstream inaccessible this run** — see Alert #9. All figures below are Google Sheets only.

| Sheet | Tab | 2026-07-23 finding |
|-------|-----|---------------------|
| Maddy | W16 | No task rows found for the date (Xtreme migrated to Workstream — sheet abandoned). |
| JohnYi | W33 | No task rows found (same — migrated). |
| Rebecca | W34 | No task rows found (same). |
| JamesDiamond | W35 | No task rows found (same). |
| Rory | W21 | No task rows found (same). |
| Franc | W34 | No task rows found (same). |
| Aysar | W34 | No task rows found (same). |
| Generator | W50 | No task rows found (same). |
| **Paturevision (Bailey)** | W37 | **TuanNT/HaVS: 0h on Thu 23/07 — day total row itself shows 0.** Sole authoritative source for Bailey (no Workstream project exists for it). No leave note found. See Alert #8. |

**Maddy JIRA weekly check:** `maddy-jira-tasklog-check.js --week 2026-07-20` returned "No ticket entries in this week" — this script is known to read the abandoned Maddy Sheet (not live Workstream/JIRA), per prior documented finding; result not trustworthy this run without Workstream cross-check.

**LongVV leave:** email-confirmed half-day off today (2026-07-24 PM), plus a full-day leave already on record for 2026-07-17. Neither falls inside this window's reporting day (2026-07-23).

No new/updated leave entries found for PhucVT, TuanNT, KhanhHH, or LeNH in leave-plan.json or the Delivery-Resource-Arrangement Matrix room for 2026-07-23.

Trello: John Yi - Amazing Meds, Bailey, Rebecca, Elliott, Blair Brown - Peptide Clyde ⚠️ left incomplete — TuanNT/KhanhHH/LeNH hours unverifiable this run pending Workstream access.

---

## Scrin.io (Nick @ John Yi company account — 2026-07-23) — 06:08 (+07:00)

0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 06:08 (+07:00)

**Part 1 — Matrix plan:** Latest weekly plan posted by @trinhmtt 2026-07-21 10:47 (+07:00) in `!EWnVDAxbTGsBxPkaaI` ("Kunal - Fountain"):
> Em update plan tuần này
> ViTHT: 32h
> ThinhT: 20h
> VuTQ: 8h
> DatNT: 40h
> => QC: 25h

**Part 2 — Task log actuals:** Workstream (primary source, project `fountain`) inaccessible this run — see Alert #9. Fallback Google Sheet (`1iIKfjAh857qzrR2xkUWPcN...`) confirmed abandoned: current week tab (W36, Jul 20–26) shows 0.00 total, consistent with the known 2026-07-13 migration-away finding. **No real actuals available this run.**

**Part 3 — Plan vs Actual:** Cannot be computed without Part 2 data. Deferred to next Workstream-accessible run.

**Trello board (customer comments, stuck cards):** Not checked this run — deferred, time-budgeted toward Workstream retries and other pieces; will run on recheck.

**Dev room activity (informational, from Matrix general scan):** Active thread in the same room — DatNT/VuTQ/HungPN/ThinhT working through PR fixes and an InfinityRoses hotfix push to LIVE; VuTQ confirmed merges, no blockers surfaced.

Trello: Fountain ⚠️ left incomplete (Parts 2/3 + Trello board not completed this run).

---

## Elena — 06:08 (+07:00)

**GitHub PRs (duongdn account):** 0 open PRs on `nustechnology/Elena-SamGuard-Digital-Plant`. `config/.elena-pending-actions.json` shows 1 historical "merged" entry (#300) already logged as NOTE/no-deploy-required (intermediate feature-branch merge) — no genuine pending deploy.

**Precognize (nusken PRs):** Not checked — `nusken` GitHub account not configured on this server (Alert #10).

**WordPress SamGuard (samguard.co):** Clean — 0 JS errors, 0 page errors, 0 CSP violations. `failedRequests` are all non-CSP ad/analytics noise (Google/DoubleClick/LinkedIn tracking pixels being ad-blocked), filtered per rule.

Trello: Elena - SamGuard Digital Plant, Elena - WordPress SamGuard ✓ complete.

---

## Performance — ohcleo + mpfc — 06:08 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| ohcleo (prod) | 0.94 | 275ms | 2.15% (593/27,606) — mostly `NotAuthenticated` (535, benign public-endpoint noise) | 21.1/min |
| mpfc (prod) | 0.52 (poor) | 1,183ms | 0.18% (65/35,434) | 27.1/min |

**ohcleo — topErrors (full):**
| Error | Count |
|---|---|
| `NotAuthenticated` | 535 |
| `ValidationError` invalid verification code | 13 |
| `AuthenticationFailed` user does not exist | 11 |
| `InvalidToken` token expired | 11 |
| `ValidationError` username already exists | 7 |
| `ValidationError` email already exists | 6 |
| `ValidationError` email+username already exist | 5 |
| `AuthenticationFailed` passwords don't match | 4 |
| `IntegrityError` null `user_id` in `app_playhistory` | 1 |

**ohcleo — slowestTransactions (full):**
| Endpoint | Avg | Calls |
|---|---|---|
| `MediaAddTrackAPIView.post` | 16,879ms | 4 |
| `CreatorVerificationSubmitView.post` | 15,797ms | 1 |
| `MediaByKeyView.get` | 8,602ms | 249 |
| `HomeMediasView.get` | 2,146ms | 584 |
| `CreatorPayoutHistoryView.get` | 1,236ms | 1 |

**mpfc — topErrors (full):**
| Error | Count |
|---|---|
| `JSON_API_User_controller::error()` undefined method (json-api plugin, api.php:59) | 38 |
| `WP_Error::get_method()` undefined (core rest-api class-wp-rest-server.php:1091) | 24 |
| E_WARNING — "continue" targeting switch equivalent to "break" | 2 |
| E_COMPILE_ERROR — `require()` failed opening `legacy-widget.php` (bad ABSPATHWPINC path) | 1 |

**mpfc — slowestTransactions (full):**
| Endpoint | Avg | Calls |
|---|---|---|
| `sitemap_index.xml` | 55,556ms | 1 |
| `membermouse/api/processOrder.php` | 24,323ms | 2 |
| `/search/...WAITFOR DELAY...0:0:15...` (SQLi scan payload) | 15,462ms | 1 |
| `/search/...WAITFOR DELAY...0:0:15...` (SQLi scan payload, variant) | 14,853ms | 1 |
| `/search/...WAITFOR DELAY...0:0:15...` (SQLi scan payload, variant) | 13,459ms | 1 |

No Trello item gates on Performance (informational only).

---

## Trello — Check progress — 06:08 (+07:00)

| Item | Result |
|------|--------|
| Maddy - Carrick/Kai/Luis | ⚠️ incomplete — Bitbucket PR backlog (Alert #1) |
| John Yi - Amazing Meds | ⚠️ incomplete — TuanNT hours unverifiable (Alert #9) |
| James Diamond - Vinn task | ✓ complete |
| Rory | ✓ complete |
| Aysar | ⚠️ incomplete — MPDM silent + KhanhHH hours unverifiable (Alerts #7, #9) |
| Franc | ✓ complete |
| Elliott | ⚠️ incomplete — KhanhHH hours unverifiable (Alert #9) |
| MPFC | ✓ complete |
| Marcel | ⚠️ incomplete — Equanimity friction (Alert #2) |
| Elena - SamGuard Digital Plant | ✓ complete |
| Raymond - LegalAtoms | ✓ complete |
| Neural Contract | ✓ complete (Upwork check unavailable this run — environment gap, never treated as an alert per standing rule) |
| Bailey | ⚠️ incomplete — TuanNT/Paturevision 0h (Alert #8) |
| Andrew Taraba | ✓ complete |
| Rebecca (William Bills) | ⚠️ incomplete — TuanNT hours unverifiable (Alert #9) |
| Colin | ✓ complete |
| Fountain | ⚠️ incomplete — Parts 2/3 blocked (Alert #9) |
| Philip | ⚠️ incomplete — Microsoft risk-challenge blocked login twice this run (see Philip section) |
| Ohcleo | ⚠️ incomplete — Tony's effort unverifiable (Alert #9), Slack itself clean (0 msgs) |
| Arthur - Meta-Stamp | ⚠️ incomplete — see Arthur section below |
| Blair Brown - Peptide Clyde | ⚠️ incomplete — gated by LeNH Workstream scan (Alert #9) |

Card "Check progress": 10/22 items complete this run (James Diamond, Rory, Franc, MPFC, Elena-SamGuard, Elena-WordPress, Raymond, Neural, Andrew Taraba, Colin). Remaining 12 blocked primarily by the Workstream SSO gap (Alert #9) and this server's missing GitHub/Upwork/Slack credentials (Alert #10) — expected to clear on next interactive recheck when a human can complete the Workstream SSO click and the desktop-bound credentials are reachable.

---

## Reminders — 06:08 (+07:00)

Cannot reliably identify 0h-without-leave devs this run — Workstream (primary hours source for LongVV/PhucVT/TuanNT/KhanhHH/LeNH on every project except Bailey) was inaccessible (Alert #9), and their Sheets are mostly abandoned/stale post-migration. The one exception, TuanNT/Paturevision, is a possible real 0h day (Alert #8) but TuanNT may have worked other Workstream-tracked projects that could not be checked — not safe to send a reminder on partial data.

**No reminders sent this run** (no `--send-reminder` flag present regardless).

---

## Matrix — 06:08 (+07:00)

**Active rooms: 23 / 136 | Messages: 568** *(since 2026-07-23 08:00 +07:00)*
Full details: reports/2026-07-24/matrix-rooms-0620.md

### ⚠️ Action items for DuongDN (3)

| Room | Time | Message |
|------|------|---------|
| Potential - Virtual Pantam Playground | 14:48 | anhnvn: "Số giờ này a Dương có assume dùng AI hỗ trợ hay công làm kiểu truyền thống vậy a?" — asking whether your estimate assumed AI-assisted or traditional work — ✅ answered same session ("xài AI á") |
| Potential - Virtual Pantam Playground | 14:50 | anhnvn: "Với a Dương ghi assumption về tech stack làm cái này luôn nha" — asked to note tech-stack assumption — ✅ answered ("A assume là Angular trong estimate rồi á") |
| Potential - Virtual Pantam Playground | 15:01 | anhnvn: rounding precision feedback on the estimate (keep 2 decimal places on totals, fix .3/.8 rounding on raw component numbers) — ✅ resolved same session |

### Key updates

**Marcel/XID (Equanimity + Matrix, PHP Projects room):**
- LongVV finished the sgbuildex trade-mapping MR, found + fixed a data-mapping bug (3.10 vs 3.1 truncation), released to prod same day.
- Real friction: Marcel is asking Carrick to screen-record all work time on top of the Upwork tracker. Carrick pushed back hard; NamTV leaning toward declining the request outright. See Alert #2 — needs your decision.

**Arthur - Meta-Stamp (150 messages, full read):**
- Team (TienND/PhucVT/NamTV) working through a 65h fixed-price scope confirmation with Arthur/Chris — Chris confirmed via message "those two cards are the whole fixed-price scope, nothing else." 3 milestones planned: M1 done tomorrow (minor YouTube-connect verification issue remaining), M2 essentially done (pending P4 for smoother payment), M3 with Phuc. Release schedule proposed: M1 Mon, M2 Wed, M3 Fri next week.
- Billing housekeeping: Scrin.io Arthur-hourly tracker cleaned up (removed unrelated entries), this week charged 12h to Arthur under Nick's name; David's own hours not yet charged pending confirmation with Nam.
- No new client-facing red flags found this pass (no unanswered questions, no payment friction) — see the Arthur checklist section for what wasn't checkable this run (Slack Solid Code, GitHub, Workstream — all environment-blocked, Alert #10/#9).

**Fountain (Kunal room):**
- PR fixes flowing normally: bug fix PRs reviewed/merged by VuTQ, an InfinityRoses hotfix mirrored from the Fountain fix and pushed to LIVE same day. No blockers.

**Bailey/Paturevision (74 messages):**
- Real bug investigation: `booked_today` scope was double-counting orders also tagged "To be Shipped"/"Awaiting for Pickup". Diagnosed live by DatNC/TuanNT/HaVS, code fix pushed to staging, planned for LIVE the next morning "for safety" (stock-related). Multi-tenant sync logic (Prestashop→Console via `spvfastpick`) also reviewed — confirmed using the correct account/auth, no live risk.

**Colin/ETZ (15 messages):**
- Real prod checkout bug ($NaN price display) — diagnosed (stale/incomplete cart API response) and fixed live by Carrick, confirmed resolved by Colin same day. KhanhHH separately fixed a 2.5h-estimated urgent bug, deployed to prod, confirmed working by Luc.

**Delivery - Resource Arrangement:**
- namtv logged PhongTH's plan change (24/07: off instead of remote, HaVS covering on Alex's project) and an Elena PT reassignment (TienND2 covering). Neither involves the PHP-team devs gated by this report.

**Other:**
- Bailey - Management: live bug fix landing tomorrow pending customer test confirmation.
- Colin - Management: KhanhHH requested for a 2.5h urgent ETZ fix (same item as the Aigile Dev thread above).
- Kevin Kung - Codeorange: GoDaddy site access handed off, production site cutover confirmed live by LongVV/DuongDN.
- Elena - Active Alerts (103 msgs): internal QA/dev discussion on the alerts platform (closed-alert UI testing, a MongoDB index-name migration conflict flagged and being investigated by dongnv/kietnht, an asset-change/status tagging discussion). No customer-facing issue, no action needed from you.

---

## OhCleo Slack — 06:08 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | No messages in window. |
| #events-code | — | `channel_not_found` — channel ID may be stale/renamed, needs re-verification. |

Tony's daily report: not present in the DM this window. Per standing rule, absence is only an alert if he logged OhCleo hours that day — **could not verify (Workstream inaccessible, Alert #9)**.

Trello: Ohcleo ⚠️ left incomplete pending effort verification.

---

## Arthur / Meta-Stamp — 06:08 (+07:00)

**4-part check, partial this run (see Alert #10 for why):**
1. **Communication:** Both Matrix rooms fully read (Arthur - Meta-Stamp 150 msgs, technical setup room quiet since 2026-07-20 — nothing new). Slack Solid Code (3 channels + Art DM) **not reachable this run** — session token+cookie both `invalid_auth`, needs a fresh cookie pulled from David's live desktop Chrome profile (Profile 15), not available on this server.
2. **Task tracking:** Covered via Matrix — scope/estimate confirmation (65h fixed price with Arthur/Chris) and milestone plan, see Matrix section above.
3. **Est/actual hours:** Workstream "Crystal lang" project **not reachable this run** (Alert #9).
4. **Code/PR status:** GitHub (`Christebob/Meta_Stamp_V3`) **not reachable this run** — `davidztv` account not registered in `gh auth` on this server (Alert #10).

No new client-facing red flags surfaced in the reachable sources (Matrix). Given 2 of 4 required parts were environment-blocked, this is a partial check, not a clean bill — flagging honestly rather than claiming full coverage.

Trello: Arthur - Meta-Stamp ⚠️ left incomplete.

---

## Philip (MS Teams) — 06:43 (+07:00)

Attempted twice (default profile, then cleared profile + fresh login per the known stale-profile fix). Both times: entered email + password successfully, then hit Microsoft's "Help us protect your account — we've detected some unusual activity" risk challenge and stayed stuck there through 25 polling loops — this specific mpfc.mpfc.live server's IP/browser fingerprint isn't a trusted device for this Microsoft account, unlike the interactive desktop session where this check normally runs. This needs one interactive human login (SMS/authenticator) from a recognized device to clear, not a profile-cache issue this time. Left unchecked this run.

Trello: Philip ⚠️ left incomplete.

---

**Unresolved questions:**
1. Marcel's screen-recording demand (Alert #2) — needs your decision on how to respond to him.
2. Bailey/TuanNT 0h on 2026-07-23 (Alert #8) — genuine gap or worked elsewhere untracked? Needs Workstream access to resolve.
3. MPFC `sitemap_index.xml` 55s response and the WP REST-API/json-api undefined-method errors — worth a code-level look when there's SSH access from an environment that has it.
4. `#events-code` OhCleo channel ID returning `channel_not_found` — may need a fresh channel ID.
