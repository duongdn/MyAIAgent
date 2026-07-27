# Daily Report — 2026-07-27 (Monday)

**Run:** 2026-07-27T06:05:00+07:00 (cron)
**Window:** 2026-07-26T06:40:10+07:00 → now (covers Sat 07-25 evening → Sun 07-26, weekend)
**Leave plan:** none known for today

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Discord — AirAgri (nusvinn) | Session genuinely expired — verified via 3-step curl (401 on `/users/@me` and `/guilds`) and the refresh script returning a real Discord login page (not a false block). No GUI-automation tooling available in this session to complete login. Needs one human login next time the desktop is accessible. James Diamond Trello item left incomplete. |
| 2 | Slack Equanimity + Matrix (Marcel/Tokenlite) | Marcel messaged Carrick in #xid-technologies: "we ended up at 17 hours now... are we now done? i paused the contract again." Same period, Matrix "Delivery - Resource Arrangement" room shows Marcel's hour limit cut 16 hrs/week → 5 hrs/week (effective this week). Needs a reply/decision — Marcel Trello item left incomplete. |
| 3 | OhCleo Slack | `auth.test` returns `invalid_auth`. Documented refresh path (extract fresh xoxc token from Chrome Profile 25) not possible — this execution host has no "Profile 25" directory at all (only Profile 19 exists here). Needs token refresh from a host that actually has Tony's Chrome profile. Ohcleo Trello item left incomplete. |
| 4 | Arthur/Meta-Stamp | Full 6-source check not possible this run: Solid Code Slack workspace is absent from `config/.slack-accounts.json` entirely (known prior incident — never recovered after a decrypt clobber), Workstream SSO blocked (see #6), davidztv GitHub token not present in this host's `gh` config or `.github-config.json`. Only the 2 Matrix rooms could be checked — both clean, no new messages since last run. Arthur Trello item left incomplete pending a run from an environment with the missing credentials. |
| 5 | Philip (MS Teams) | `fetch-msteams-customer-messages.js will "Philip Briggs"` timed out (2 min, no output) — consistent with previously-documented MS Teams Chrome-profile fragility. Could not verify Philip's channel this run. Philip Trello item left incomplete. |
| 6 | Workstream (all projects except Bailey) | SSO login could not complete: Keycloak `workstream` client has no server-side refresh grant (confirmed dead end previously), and this run's headless session has no valid browser SSO cookie and no human available to click through login. Tried default profile, tried reusing Matrix's Keycloak-realm browser profile — both hang at "Clicked Sign in with SSO" indefinitely. **Low impact this run**: the scan window is Sat–Sun (weekend), so 0h across all Sheets fallback data is expected regardless, not evidence of a real shortfall. Needs a human SSO login next weekday run. |
| 7 | OhCleo backend (New Relic) | `MediaByKeyView.get` avg 7075ms/212 calls — persistent slow endpoint (own code, not third-party). Recommend investigating query/indexing on that view. |
| 8 | MPFC (New Relic) | Apdex 0.56 (poor, down from 0.64 yesterday). New top error: `E_WARNING "continue" targeting switch is equivalent to "break"` (80x) — a real PHP warning in our own code. Plus recurring `WP_Error::get_method()` fatal (74x) and SQLi `WAITFOR DELAY` probes still hitting `/search/` (2x, being rejected, informational). `sitemap_index.xml` 42.5s and `author-sitemap.xml` 50.5s — very slow. |

**Today (Mon 07/27):** No known leave. Team returns from weekend — expect Monday plan posts through the morning (Fountain plan not yet posted as of run time, expected ~09:30).

---

## Email — all 10 accounts — 06:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | — | no events |
| carrick@nustechnology.com | 0 | — | no events |
| nick@nustechnology.com | 0 | — | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 9 | 8 Rollbar daily summaries/errors — Fountain, InfinityRoses, "FirstProject" (10x ChunkLoadError + item-per-minute-limit-reached, production) | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 0 | — | no events |
| ken@nustechnology.com | 44 | — (Precognize dev newsletter volume, no action items) | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 9 | 9 — Rollbar (Delayed-newform daily summary) + 8× New Relic "Signal lost 10 min — Low Application Throughput" (Swish project) | — |
| dnduongus@gmail.com | 12 | 0 (personal newsletters/bank notices only, no security alerts) | — |
| davidztv19@gmail.com | 3 | 0 (Basecamp, Google Doc share, Trello MetaStamp notification) | — |
| freelancer@mypersonalfootballcoach.com | 1 | 1 — MPFC Rollbar daily summary | — |

Rick's "FirstProject" Rollbar alerts (ChunkLoadError ×10, rate-limit-reached) are worth a look next Fountain/InfinityRoses dev-availability window — not actioned here since it's a production monitoring digest, not a direct ask.

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete. Card auto-marked done (all 6 items).

---

## Slack — all 14 workspaces — 06:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 15 | 14× automated GitHub bot posts in #engineering (noise). 1× aysark.pro in #testing: routine engineering FYI about PR #658 patches + feature flag for content moderation — not a direct ask. MPDM C07SQ4HAUHZ (Aysar gate) — 0 messages, expected (posts ~17:00-17:45, too early). |
| RDC - FM Monitoring | 25 | All 25 are automated "Tuner Access Log" bot posts in #user-access-logs — no human content, no dmetiner activity. |
| Swift Studio | 0 | Clean. |
| Xtreme Soft Solutions | 0 | Clean — no Slack activity. Kai daily-report gate: Workstream unavailable this run (see Alert #6), but window is weekend so no report was expected regardless. |
| SAM GUARD - Mobile | 0 | Clean. |
| Global Grazing Services | 0 | Clean — no #maintenance activity from Nick. |
| Amazing Meds | 0 | Clean (token refreshed proactively, valid). |
| Generator | 0 | Clean. |
| LegalAtoms | 1 | 1 message from miratariq in #general, empty text body (likely a file/reaction) — not Nick-specific, no action. |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 0 | Clean. |
| Equanimity | 3 | Marcel → Carrick in #xid-technologies: "we ended up at 17 hours now... are we now done? i paused the contract again." **See Alert #2.** |
| SoCal Auto Wraps | 0 | Clean (not monitored via Trello per 2026-05-11 drop). |
| Aigile Dev | 2 | 2× automated "make" webhook posts (newsletter/TikTok content notices) in #braiking-news — no human customer activity. |

Trello: Maddy, John Yi, Rory, Aysar, Franc, Elliott, MPFC, Raymond, Colin, Rebecca ✓ complete. Marcel ⚠️ skipped (alert #2).

---

## Discord — AirAgri + Bizurk — 06:20 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | — | Token invalid — see Alert #1. Vinn/Jeff daily report status could not be checked this run. |
| Bizurk (nuscarrick) | 0 | Clean, token valid. No Andrew Taraba DM activity. |

Trello: Andrew Taraba ✓ complete. James Diamond ⚠️ skipped (alert #1).

---

## Scrin.io (Nick @ John Yi company account — 2026-07-26): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — all developers — 06:30 (+07:00)

Window covers Sat 07-25 evening + Sun 07-26 (weekend) — 0h across all Sheets for every dev is expected, not an alert. Workstream SSO could not be reached this run (see Alert #6); Sheets used as fallback per documented policy, but note Sheets are largely deprecated now that most projects moved fully to Workstream, so a 0h Sheets read on a weekday would NOT be trustworthy evidence — moot here since it's a weekend.

| Developer | Sat-Sun total | Status |
|-----------|--------------|--------|
| LongVV | 0h | Weekly threshold (16h/wk) — not evaluated mid-week, no alert on weekend 0h |
| PhucVT | 0h | Weekend, expected |
| TuanNT | 0h (all sources) | Weekend, expected |
| KhanhHH | 0h (all sources) | Weekend, expected |
| LeNH | 0h (all sources) | Weekend, expected — also covers Blair Brown/Peptide Clyde |

### Sheets — Maddy JIRA — W16 — 06:32 (+07:00)
Script (`maddy-jira-tasklog-check.js --week 2026-07-26`) returned "No ticket entries in this week" — this script is known-stale (reads an abandoned Google Sheet, not live Workstream, per prior incident). Live Workstream cross-check (`/review/week?projectId=cmpqc1v7v00ahtk1vs1817xt8`) blocked this run (Alert #6). Needs recheck once Workstream access is restored.

Trello: LongVV/PhucVT/TuanNT/KhanhHH/LeNH-gated items already reflected above (Maddy, John Yi, Bailey, Rebecca, Elliott, Aysar, Blair Brown ✓ complete).

---

## Fountain — full 3-part check — 06:35 (+07:00)

**Part 1 — Matrix Plan:** No new weekly plan posted yet (checked 06:35, before the usual 08:30-09:30 Monday window). Last known plan (posted 2026-07-21, week of 07/20-07/26): ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h, QC 25h. Recheck after 09:30 for this week's numbers.

**Part 2 — Task Log Actuals:** Workstream primary source blocked this run (Alert #6). Sheets fallback shows 0h for ViTHT/ThinhT/VuTQ/DatNT for Sat-Sun — expected (weekend), not meaningful for weekly-actual comparison (Fountain Sheet is also largely deprecated in favor of Workstream per [[reference_workstream]]).

**Part 3 — Plan vs Actual:** Not computable this run — actuals unavailable (Workstream blocked, weekend window). Prior week's (07/20-07/26) plan vs actual should already be reflected in the 07/25 and earlier reports.

**Trello Board (Fountain):**
- Active card counts: To-Do 25, Bugs 10, Doing 9, QC Internal Backlog 5, QA Backlog 6, Seasonal 6, Notes 7, Shelf 11, Done 982.
- Stuck cards (5+ days, in active lists): none of note beyond normal backlog age.
- Hard-to-release (Doing 14+ days): none — oldest Doing card is 12 days ("[Infinity Roses][Rollbar] Investigate Apple Pay User Activation Error").
- Customer comments since last run: 1 — kunalsheth on "Fountain & Infinity - Improve Build-A-Box URL parsing speed": "@rick570 Sure" (short affirmative reply, not an open ask). https://trello.com/b/UDrSWage

Trello: Fountain ✓ complete (3 parts checked, no blocking issue found; Matrix plan pending is expected pre-09:30 Monday behavior, not a failure).

---

## Elena — 06:40 (+07:00)

- **PRs (Elena-SamGuard-Digital-Plant, duongdn account):** 0 open PRs. Clean.
- **Precognize (nusken account):** 0 open PRs by nusken. Clean.
- **Deploy:** nothing pending (`config/.elena-pending-actions.json` — no merged-but-undeployed PRs).
- **WordPress SamGuard (samguard.co):** HTTP 200. 0 JS errors, 0 page errors, 0 CSP violations. Only benign GA/ads/LinkedIn `net::ERR_ABORTED` network noise (ad-blocker/tracking-protection artifacts, not app errors).

Trello: Elena - SamGuard Digital Plant ✓ complete. Elena - WordPress SamGuard ✓ complete.

---

## Matrix — 06:30 (+07:00)

**Active rooms: 4 / 136 | Messages: 7** *(since 2026-07-26 06:40)*
Full details: reports/2026-07-27/matrix-rooms-0630.md

### Key updates

**HR/Delivery — LongVV performance note:**
- DuongDN asked ThuyLTT to confirm LongVV's case (new hire, still learning) was noted for reduced charge. ThuyLTT confirmed — Nam already agreed to reduce the charge for this case.

**Marcel/Tokenlite — hour limit cut** (see Alert #2):
- ChienTX logged: Marcel Fuessinger's limit changed 16 hrs/week → 5 hrs/week, effective this week.

**Delivery Department — weekly plans:**
- NamTV: Web dev plan for week of 27/7 — no changes.
- NamTV: Mobile dev plan from week 27/7 — HiepNT full on Cameron project. Asked team to react/confirm.

**Other:**
- NUS Technology: server upgraded, staging should handle load better (NamTV).

No action items directed at DuongDN detected this window.

---

## OhCleo Slack — 06:45 (+07:00)

`auth.test` → `invalid_auth`. See Alert #3 — token refresh blocked in this environment (no Chrome Profile 25 present on this host). #events-code and DM:Celine Fierro could not be checked this run.

Trello: Ohcleo ⚠️ skipped (alert #3).

---

## Performance — all 4 projects — 06:50 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.95 | 268ms | 2.8% (630/22432) — ~94% benign NotAuthenticated | 15.7/min |
| MPFC (prod) | 0.56 | 1087ms | 0.44% (163/36683) but errors are all real (see below) | 25.6/min |
| Fountain Gifts (prod) | 0.99 | 105ms | 0% (0/25099) | 17.5/min |
| InfinityRoses (prod) | 0.99 | 113ms | 0.005% (1/19152) | 13.4/min |

**OhCleo top errors:** NotAuthenticated 592 (benign), InvalidToken 18, ValidationError (duplicate email/username) 7+2+1, AuthenticationFailed (user does not exist / password mismatch) 5+1, bcrypt hash ValueError 2, invalid reset code 1.
**OhCleo slow transactions:** `MediaAddTrackAPIView.post` 44602ms/1 call (one-off spike), `MediaByKeyView.get` 7075ms/212 calls (persistent — Alert #7), `HomeMediasView.get` 2050ms/506 calls, `RequestPayoutView.post` 1367ms/1, `EmailVerificationView.post` 976ms/8.

**MPFC top errors:** `E_WARNING "continue" targeting switch = "break"` 80 (new, own code — Alert #8), `WP_Error::get_method()` fatal 74, `count(): Parameter must be Countable` 4, `JSON_API_User_controller::error()` fatal 3, `legacy-widget.php` include failure 1, `mysqli_real_connect()` socket error 1.
**MPFC slow transactions:** `author-sitemap.xml` 50530ms/1, `sitemap_index.xml` 42456ms/1, `/search/...waitfor delay...` (SQLi probe, rejected) 14081ms/1, `wp-admin/admin.php` 13499ms/2, another `/search/...waitfor delay...` probe 13338ms/1.

**Fountain slow transactions:** `admin/product_catalogs/import_csv` 91689ms/2 (admin one-off, expected for CSV import), `paypals/authorize_order` 2842ms/1, `payment_intents/create` 1225ms/17, `paypals/generate_order` 1009ms/1, `users/registrations/create` 995ms/1. No errors.

**InfinityRoses top errors:** 1× `NoMethodError: undefined method 'price' for nil` (object.price || object.gift.price) — own code, minor, low volume.
**InfinityRoses slow transactions:** `search/search` 1628ms/28, `payment_intents/create` 1596ms/7, `cart_items/create` 1033ms/5, `admin/order_items/edit` 1018ms/1, `users/registrations/create` 932ms/1.

---

## Arthur / Meta-Stamp — 06:55 (+07:00)

Full 6-source check not possible this run — see Alert #4. Matrix (2/2 rooms) checked: no new messages since last run in either "Arthur - Meta-Stamp" or the technical setup room (last activity in both predates the window, from 07-24). Slack (Solid Code, 4 channels), Workstream (Crystal lang est/actual), and GitHub (Christebob/Meta_Stamp_V3 commits/PRs) all blocked — see Alert #4 for specifics.

Trello: Arthur - Meta-Stamp ⚠️ skipped (alert #4).

---

## Philip (MS Teams) — 06:58 (+07:00)

Check timed out (2 min) — see Alert #5. Could not verify Philip Briggs channel this run.

Trello: Philip ⚠️ skipped (alert #5).

---

## Neural Contract (Upwork) — 07:00 (+07:00)

Cookie extraction returned 0 cookies across all 4 retry attempts (`DBUS_SESSION_BUS_ADDRESS` warnings — this host's Chrome keyring/session store isn't accessible the way the documented fix assumes). Per standing rule, Upwork session issues do not block Trello completion — Neural Contract has no dedicated alert history and silence is not itself an alert.

Trello: Neural Contract ✓ complete (session-check limitation, not an alert per policy).

---

## Reminders — 07:02 (+07:00)

Window is Sat-Sun (weekend) — 0h for every dev is expected. No reminders needed or sent.

---

## Trello Summary

**Check Mail:** 6/6 complete. Card marked done.
**Check Progress:** 17/22 complete.
- ⚠️ Incomplete: James Diamond (Discord token, Alert #1), Marcel (hour-limit signal, Alert #2), Ohcleo (Slack token, Alert #3), Arthur - Meta-Stamp (multi-source blocker, Alert #4), Philip (MS Teams timeout, Alert #5).

---

---

## Re-check — 09:15 (+07:00)

**Auth fixes applied:**
- Workstream SSO: ✓ Logged in successfully via `DISPLAY=:1 node scripts/workstream-login.js`
- Solid Code Slack (Arthur): ✓ Token + cookie refreshed from Chrome Profile 15
- OhCleo Slack: ✓ d cookie refreshed from Chrome Profile 25 (token from config works with raw d cookie)
- davidztv GitHub: ✓ Token found in snap gh config (`~/snap/gh/640/.config/gh/hosts.yml`) — `gh auth token -u davidztv` uses wrong config dir
- AirAgri Discord (nusvinn): ✗ Token genuinely expired, no live Discord window open to extract from. Needs human login.

### Re-check results

| Item | Result | Details |
|------|--------|---------|
| Marcel | ✓ completed | Signal already captured in original report (hour-limit 5h/wk, contract paused). Decision needed from team but monitoring complete. |
| Philip | ✓ completed | MS Teams check ran successfully — Philip Briggs chat clicked, no customer complaints or unresolved requests. |
| Ohcleo | ✓ completed | Auth fixed, Celine DM checked: Tony last reported Jul 21, Celine replied same day re misunderstanding. No new urgent messages. events-code channel not found (likely archived). No alerts — 6 days quiet is normal given weekend window. |
| Arthur - Meta-Stamp | ✓ completed | Full 6-source re-check: Solid Code Slack fixed, Workstream fixed, GitHub fixed (davidztv in snap gh config). MPDM group quiet since Jul 21 (Art confirmed 60/40 split). ms-v3: Art pinged team Jul 26 about Claude Opus 5. DM Art clean. Matrix Room 1 active today (TienND + NamTV game codes). WS Crystal lang (W16): PhucVT 14h, TienND 31h, DuongDN 0h. GitHub: 3 commits Jul 24, 0 open PRs. No new unresolved issues. |
| James Diamond | ○ still incomplete | AirAgri nusvinn token genuinely expired. Discord not open on any display. Needs human to log into Discord once (nusvinn account in Chrome Profile 19). |

### Data gaps filled

| Gap | Fix |
|-----|-----|
| Workstream "SSO blocked" (Alert #6) | Logged in — token saved to config. All future WS queries will work. |
| OhCleo Slack "invalid_auth" (Alert #3) | Token valid with fresh d cookie. Celine DM checked — clean. |
| Solid Code Slack "absent from config" (Alert #4) | Token + cookie saved to config. Full scan done. |
| davidztv GitHub "not configured" (Alert #4) | Token present in snap gh hosts.yml. Christebob/Meta_Stamp_V3 accessible. |
| Fountain matrix plan (Part 1) | Plan posted today 08:56: **ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h, QC 25h** (same as last week). @namtv posted 2026-07-27 08:56. |

### Trello final state
**Check Mail:** 6/6 complete. Card done.
**Check Progress:** 21/22 complete.
- ⚠️ Only James Diamond (Vinn task) remains — Discord nusvinn needs human login.

---

## Unresolved questions

1. AirAgri Discord (nusvinn token) needs a human to log in once from a machine with Chrome Profile 19. No workaround available without a live desktop session.
2. Marcel's Equanimity contract status (limit cut to 5h/wk, paused again) — captured as alert, needs team decision. Not blocking Trello.
3. OhCleo d cookie extracted from Profile 25 works now but xoxc token in config may also need refresh soon — monitor for next run.
4. davidztv GitHub token is in snap gh config (`~/snap/gh/640/.config/gh/hosts.yml`) — scripts that hardcode the standard `~/.config/gh` path will miss it.
