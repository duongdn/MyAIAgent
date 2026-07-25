# Daily Report — 2026-07-26 (Sunday)

**Run:** 2026-07-26T06:05+07:00 (cron)
**Window:** 2026-07-25T06:05:37+07:00 → 2026-07-26T06:05+07:00
**Leave plan:** none logged for the weekend.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Workstream (all projects) | SSO login failed after 4 genuine attempts (visible-browser `DISPLAY=:1 workstream-login.js`, twice standalone + twice via dependent scripts) — "Failed to capture token" every time. Blocks: Sheets/Workstream hours cross-check, Fountain Parts 2-3, Maddy JIRA↔Workstream cross-check, Arthur est/actual. Needs a human SSO click on this server's desktop. |
| 2 | Email — rick@ (Fountain/InfinityRoses/FirstProject) | Real production Rollbar alerts: FirstProject 10-occurrence spike #1084; FountainGifts + InfinityRoses + FirstProject daily summaries. |
| 3 | Email — vuongtrancr@ (Swish/Delayed-newform) | "Signal lost for 10 minutes on 'Low Application Throughput'" recurring 6x in window + daily summary — same ongoing APM signal-loss pattern as prior days. |
| 4 | Email/New Relic — freelancer@mpfc (MPFC) | `WP_Error::get_method()` undefined-method fatal recurring 82x this window (known unresolved bug, unchanged root cause) + apdex 0.64 (poor, <0.7 threshold) + SQLi `WAITFOR DELAY` probes still hitting `/search/` (3x) + `sitemap_index.xml` 51.1s. |
| 5 | New Relic — OhCleo | `MediaByKeyView.get` avg 9,443ms/250 calls — slower than the last 2 days (8.6s→9.4s), worsening trend, not agent-fixable (no server access, see [[reference_ohcleo_no_server_access]]). |
| 6 | Discord — nusvinn (AirAgri) | Token returns genuine 401 on direct `curl /users/@me` (not a script bug — verified independent of `discord-monitor.js`). Blocks Vinn/Jeff daily-report check and James Diamond Trello gate. Needs DevTools token re-extraction (GUI automation unavailable this session). |
| 7 | GitHub accounts — nusken / nuscarrick / davidztv | None of these 3 accounts are registered in this server's `gh` (`~/.config/gh/hosts.yml` only has `duongdn` + `mypersonalfootballcoach`) — confirmed by reading the file directly, not just `gh auth status`. Blocks: Precognize PR check (nusken), Baamboozle/Bizurk issue checks (nuscarrick), Arthur commit/PR check (davidztv). |
| 8 | Slack — Solid Code (Arthur workspace) | Account entry still missing from `config/.slack-accounts.json` on this server (same gap flagged 2026-07-13, never re-extracted). Blocks 3 of 4 Arthur Slack channels. |
| 9 | Upwork — Rory / Neural Contract / Aysar workrooms | All 3 blocked: live cookie extraction script points at a different machine's Chrome profile path (`/home/nus/.config/google-chrome/Profile 1`, this server only has `Profile 19`), stored session cookies rejected (nav timeout), headless re-login failed at username selector. Environment/script-path gap, not a real session expiry — needs the script's hardcoded path fixed for this server, or a human login here. |
| 10 | Slack — Equanimity (#xid-technologies, Marcel) | Marcel Füssinger: "i paused the contract again" / "we ended up at 17 hours now fuckin helll" — direct customer frustration about contract hours. Carrick's reply in the same window addressed an unrelated import-performance question, not Marcel's contract complaint. Unresolved. |
| 11 | Slack — Xtreme (Madhuraka/Maddy) | Madhuraka: "Please give me an update on all tasks under 'Review Code' column next week. Some tasks have been sitting in this column for a long time" — naming LIFM2-409/450/449/446 (open since 14 Jul). No reply visible in window. |
| 12 | Trello — "Check progress" / "Check mail" cards | Neither recurring card exists yet for 2026-07-26 as of 06:38+07 check (only historical closed instances found). Per rule, not creating them — will complete items once the Power-Up creates today's cards (recheck needed later). |

**Today (Sun Jul 26):** Weekend — no leave plan entries, 0h task-log across all 5 devs is expected (non-workday), not flagged.

---

## Email — all — 06:15 (+07:00)

Window: IMAP SINCE 2026-07-24, filtered ≥ 2026-07-25T06:05:37+07:00.

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | 0 | no events |
| carrick@nustechnology.com | 2 | 0 | no events |
| nick@nustechnology.com | 7 | 0 | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 6 | 6 (Alert #2 — Fountain/InfinityRoses/FirstProject Rollbar) | 12:30 HEAL Meetign, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 3 | 0 (JIRA notifications, LIFM2-447/453 — routine) | no events |
| ken@nustechnology.com | 42 | 0 (GitHub PR notifications, routine dev activity) | 08:30 DE Daily Standup (x2), 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 7 | 7 (Alert #3 — Swish Signal-lost recurring) | — |
| dnduongus@gmail.com | 10 | 0 (Claude "new trusted device" is this session itself, not a real breach; rest is newsletter/LinkedIn/Netflix noise) | — |
| davidztv19@gmail.com | 2 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 2 | 2 (Alert #4 — MPFC WP_Error::get_method()) | — |

Trello: Check Mail card not yet created today (see Alert #12) — cannot mark items complete this run.

---

## Slack — all — 06:45 (+07:00)

Xtreme Meds/Equanimity xoxc tokens verified valid via `auth.test` before scanning (no refresh needed).

| Workspace | Msgs (window) | Key content |
|-----------|---------------|-------------|
| Baamboozle | 8 | Only automated GitHub bot posts in #engineering. Aysar MPDM (`C07SQ4HAUHZ`) — 0 messages this window. |
| RDC - FM Monitoring | 6 | Only automated "Tuner Access Log" bot posts in #user-access-logs — no dmetiner activity. |
| Swift Studio | 0 | Quiet. |
| Xtreme Soft Solutions | 1 | Madhuraka: aging "Review Code" column tickets (LIFM2-409/450/449/446, sitting since 14 Jul) — see Alert #11. |
| SAM GUARD - Mobile | 0 | Quiet. |
| Global Grazing Services | 0 | Quiet (#maintenance). |
| Amazing Meds | 0 (14 channels scanned via `users.conversations`, none active) | Quiet — normal, John Yi gate not blocked by Slack silence alone. |
| Generator | 0 | Quiet. |
| LegalAtoms | 0 | Quiet. |
| MyPersonalFootballCoach | 0 | Quiet. |
| William Bills | 0 | Quiet. |
| Equanimity | 5 (#xid-technologies) | Marcel/Carrick exchange — see Alert #10. |
| SoCal Auto Wraps | 0 | Quiet (not monitored via Trello, dropped 2026-05-11). |
| Aigile Dev | 1 | Automated "make" bot post to #braiking-news, no human content. |

Trello: Check Progress card not yet created today (see Alert #12) — cannot mark items complete this run.

---

## Discord — all — 06:50 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | — | Token invalid (see Alert #6) — could not scan. |
| Bizurk (nuscarrick) | 0 | Token valid, no messages, Andrew Taraba DM ("animeworld") also empty — normal, low-communication client. |

Trello: Andrew Taraba item would complete (no alert) once card exists; James Diamond - Vinn task blocked by Alert #6.

---

## Scrin.io (Nick @ John Yi company account — 2026-07-25): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — all 5 devs — 07:05 (+07:00)

2026-07-25 was a **Saturday** (non-workday) — 0h across all sheets for all 5 devs (LongVV, PhucVT, TuanNT, KhanhHH, LeNH) is expected, not an alert.

Workstream could not be cross-checked this run (Alert #1, 4 failed SSO attempts) — Sheets-only result, noted as `workstreamUnavailable: true` for all 5 devs rather than treated as a confirmed 0h/shortfall claim.

Maddy JIRA cross-check: `maddy-jira-tasklog-check.js --week 2026-07-20` returned "No ticket entries" — per known issue ([[feedback_maddy_jira_weekly_check]]) this script still reads the abandoned Google Sheet, not live Workstream; could not cross-verify against Workstream `task` field text this run because Workstream itself is down (Alert #1).

---

## Fountain (Kunal) — 3-part check — 07:10 (+07:00)

**Part 1 — Matrix Plan:** Room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. No new message since last run (0 activity in the 24h window, consistent with weekend). Carrying forward current week's plan, posted Mon 2026-07-21 10:47 by @trinhmtt (still valid until next Monday 07/27): ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h, QC 25h.

**Part 2 — Task Log Actuals:** Unavailable — Workstream down (Alert #1), legacy Sheet remains abandoned/deprecated since 2026-07-13 migration.

**Part 3 — Plan vs Actual:** Cannot compute — Part 2 blocked.

**Trello board** (Web Development, board `5475eaf923a9a1309357eb51`): 0 new customer comments (kunalsheth/tmmckay/mike62798179/iris63293413) in window. Active counts — Todo 25, Bugs 9, Doing 9, QC-internal 5, QA-backlog 6. Stuck cards (≥5 days, unchanged from prior reports): "Fountain pro pending bug" (65d), "NoMethodError in pro_cart_items#destroy" (79d), "Infinity Order - 6358531LG" (79d), "Giftdrop Links Not Sending" (103d), "Stripe::InvalidRequestError in orders#download_receipt" (5d), "[infinity Roses] Apple Pay User Activation Error" (11d), "Fountain Pro- not uploading to shipstation" (109d), "build a box/product catalog modal issue" (82d), "order did not upload all recipients" (36d). No hard-to-release (14+ days in Doing) cards.

**Verdict:** Parts 2-3 blocked by Workstream outage; Trello board clean (no new customer asks, no new stuck cards). Trello: Fountain ○ (Parts 2-3 incomplete once card exists).

---

## Elena (SamGuard Digital Plant) — 07:15 (+07:00)

- **Internal PRs** (`nustechnology/Elena-SamGuard-Digital-Plant`, duongdn account): 0 open PRs.
- **Precognize** (`Precognize/development`, nusken account): unavailable — nusken not configured on this server (Alert #7).
- **WordPress SamGuard** (`https://www.samguard.co/`): 0 JS errors, 0 page errors, 0 CSP violations. Only expected GA/ads analytics `net::ERR_ABORTED` noise. Clean.

**Verdict:** Clean (internal + WordPress). Precognize check blocked. Trello: Elena - SamGuard would complete once card exists.

---

## Matrix — 07:20 (+07:00)

**Active rooms: 2 / 136 | Messages: 4** *(since 2026-07-25 06:05 +07:00)*
Full details: reports/2026-07-26/matrix-rooms-0617.md

### Key updates

**Hours-review room (`!oofREYAXHsvPWEOJev`)** — 3 messages:
- duongdn posted Week 20/07 charged-hours summary: James Diamond Web 40h/40h, PhucVT 0h/0h (still on Crystal lang/Arthur this week), LeNH 40h/40h.
- thuyltt followed up on Marcel 16h/21h, DuongDN 3h/3h, LongVV 13h/18h — asking why LongVV didn't charge full hours, and whether a delivery note/approval exists for her own charged time. No reply yet in window — informational, not a customer-facing alert.

**Marcel - XID room** — 1 message: duongdn "OK e" (acknowledgement, no new content).

No Fountain, Arthur, or other project-room activity in this window (both scanned as part of the 136 joined rooms, 0 new messages — consistent with the weekend).

---

## OhCleo Slack — 07:25 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | Quiet. |
| #events-code | — | `channel_not_found` (channel appears inaccessible/renamed — minor, not investigated further this run). |

Tony daily report: none expected/found (quiet weekend). No customer messages, no alerts.

Trello: Ohcleo item would complete once card exists.

---

## Performance — all 4 projects — 07:30 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 279ms | 3.47% (836/24,104) — mostly `NotAuthenticated` (791, benign) | 16.6/min |
| MPFC | 0.64 | 883ms | 0.19% (92/48,765) | 33.5/min |
| Fountain Gifts | 0.99 | 94ms | 0.004% (1/26,818) | 18.4/min |
| InfinityRoses | 0.99 | 131ms | 0% (0/12,561) | 8.6/min |

**OhCleo top errors:** `NotAuthenticated` 791 (benign), `InvalidToken` 17, `AuthenticationFailed: User does not exist` 15, `ValidationError: email exists` 7, `ValueError: Invalid bcrypt hash format` 2, `AuthenticationFailed: Passwords don't match` 2, `ValidationError: username exists` 2.

**OhCleo slowest transactions:** `MediaByKeyView.get` 9,443ms/250 calls (Alert #5, worsening); `MediaListView.get` 2,675ms/4; `HomeMediasView.get` 2,055ms/561; `ValidatePurchaseView.post` 1,009ms/4; `MediaRecommendsView.get` 973ms/670.

**MPFC top errors:** `WP_Error::get_method()` undefined method 82x (Alert #4); `E_WARNING "continue" targeting switch` 3x; `mysqli_real_connect` DNS/socket error 2x; `get_header()` undefined (404.php, twentytwenty theme) 2x; `get_header()` undefined (404.php, twentynineteen theme) 1x; `settings_errors()` undefined 1x; `Class 'MM_Event' not found` 1x.

**MPFC slowest transactions:** `sitemap_index.xml` 51,068ms/1 (Alert #4); SQLi `WAITFOR DELAY` probe on `/search/.../feed/rss2/` 12,980ms/1; same probe variant 12,796ms/1; same probe variant 12,161ms/1; `/videocat/coachs-corner/feed/` 12,102ms/1.

**Fountain top errors:** `ActionController::UnknownFormat` 1x; `ArgumentError` wrong number of arguments 1x. **Slowest:** `payment_intents/create` 1,656ms/19; `users/passwords/forgot` 1,512ms/1; `MailchimpWorker` 1,084ms/2; `order_items/swappable_products` 976ms/3; `EmailWorker` 817ms/25.

**InfinityRoses:** 0 errors. **Slowest:** `search/search` 1,549ms/31; `payment_intents/create` 1,502ms/4; `MailchimpWorker` 1,124ms/1; `users/registrations/create` 952ms/1; `EmailWorker` 937ms/9.

---

## Arthur / Meta-Stamp — 07:35 (+07:00)

Mandatory 4-part check, mostly blocked this run:
1. **Communication** — Matrix: both Arthur rooms (`!BEXEdVUmvWclPLELFf`, `!QEbdvaMJkTurMpRPIX`) had 0 new messages (part of the 136-room scan, weekend). Slack (Solid Code, 4 channels): unavailable — account config missing on this server (Alert #8).
2. **Task tracking** — Workstream "Crystal lang" `additionalInfo`: unavailable, Workstream down (Alert #1).
3. **Est/actual hours** — Workstream: unavailable, same outage.
4. **Code/PR status** — `Christebob/Meta_Stamp_V3`: unavailable, `davidztv` GitHub account not registered on this server (Alert #7).

**Verdict:** No new client-facing issues surfaced (nothing to report from the 2 Matrix rooms), but 3 of 4 parts are structurally blocked by this server's config/auth gaps, not by an absence of activity. Trello: Arthur - Meta-Stamp ○ (blocked parts).

---

## Upwork — 07:40 (+07:00)

Rory, Neural Contract, and Aysar workrooms all blocked this run — see Alert #9 (Chrome profile path mismatch specific to this server, not a real session expiry). `upwork-weekly-hours.js` output:
```
Rory: login_failed (live extraction + stored cookies + headless re-login all failed)
Neural Contract: session_expired
Aysar: session_expired
```
Per standing rule, session/auth failures on Neural/Rory/Aysar do not themselves block their Trello items (once cards exist) — but the underlying script path issue should be fixed for this server (`get-carrick-upwork-cookies.py` hardcodes `/home/nus/.config/google-chrome/Profile 1`, this server only has `Profile 19`).

---

## Trello — 07:42 (+07:00)

Neither "Check progress" nor "Check mail" recurring card exists yet for 2026-07-26 (checked at 06:38+07 and again at 07:42+07, only historical closed instances found on the board). Per standing rule, not creating them manually — no checklist items could be marked complete/incomplete this run. **Recheck later today once the Power-Up creates today's cards**, at which point all items above with no alert (Bizurk/Andrew Taraba, Elena, John Yi/Amazing Meds, OhCleo, MPFC, LegalAtoms, William Bills, Colin/Aigile, Marcel — pending Alert #10 resolution, Raymond, Rory/Swift, Franc, SAM GUARD, GGS/Bailey) should complete, and Fountain/Arthur/James-Diamond/Maddy stay incomplete per the alerts above.

---

## Reminders — 07:43 (+07:00)

No reminders — 2026-07-25 was a Saturday (non-workday) for all 5 devs, 0h across the board is expected. Nothing printed, nothing sent.

---

## Unresolved questions

1. Workstream SSO has now failed 4 consecutive attempts across 2 script variants — is there a session/2FA issue specific to this server's browser profile that needs a one-time manual fix?
2. Discord nusvinn token is genuinely dead (confirmed via direct curl) — needs a DevTools-extracted token from the user, GUI automation unavailable this session.
3. Three account-config gaps found to be specific to this server (mpfc.mpfc.live), not the local machine: GitHub `nusken`/`nuscarrick`/`davidztv` not registered, Slack "Solid Code" workspace missing from `.slack-accounts.json`, Upwork cookie-extraction script pointing at the wrong Chrome profile path. Worth deciding whether to sync these configs/scripts to this server permanently, since it runs the daily cron independently of the local session.
4. Marcel/Equanimity (Alert #10) and Madhuraka/Xtreme (Alert #11) both look like genuine unresolved customer-facing items — flagging for follow-up since neither had a substantive reply in this window.
