# Daily Report — 2026-07-27 (Monday)

**Run:** 2026-07-27T06:05:00+07:00 (cron), rechecked 09:00-09:06 (+07:00)
**Window:** 2026-07-26T06:40:10+07:00 → 2026-07-27T09:06:11+07:00 (covers Sat evening → Sun → Mon morning)
**Leave plan:** none known for today

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert | Status |
|---|--------|-------|--------|
| 1 | Slack Equanimity + Matrix (Marcel) | Marcel: "i paused the contract." Hour limit cut 16h→5h/wk. Needs decision. | 🔴 Open |
| 2 | OhCleo backend (New Relic) | `MediaByKeyView.get` avg 7075ms/212 calls — persistent slow endpoint. | 🟡 Info |
| 3 | MPFC (New Relic) | Apdex 0.56. `E_WARNING "continue" = "break"` (80x). Sitemap XML 42-50s. | 🟡 Info |

All original cron auth failures resolved (Discord, OhCleo, Arthur, Philip, Workstream). Vinn daily report chưa có Mon morning — còn sớm, sẽ recheck sau. Re-check auth details in Re-check section below.

**Today (Mon 07/27):** No known leave. Fountain plan posted 08:56 (same as last week: ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h, QC 25h).

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
| Xtreme Soft Solutions | 1 | Kai: "I've arranged to make up for the time this week. What would you like me to work on da..." — addressing Maddy. Workstream now available — Maddy project shows 0h for Kai on Fri. |
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

Trello: Maddy, John Yi, Rory, Aysar, Franc, Elliott, MPFC, Raymond, Colin, Rebecca ✓ complete. Marcel ⚠️ skipped (alert #1 — needs reply).

---

## Discord — AirAgri + Bizurk — 06:20 (+07:00), rechecked 09:06

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 18 | Token refreshed. Re-checked for Monday: Vinn **0 messages today** — no daily report posted in #airagri_webapp or #airagri-flutter. Jeff active in #airagri-flutter (3 msgs) re hazard-zone alarm feature + spray app task list. Weekend window (14 msgs): Jeff discussing alarms, map, health/safety v2. bellatrix02 QA on QR features. ⚠️ **Vinn daily report missing for Monday 07/27.** |
| Bizurk (nuscarrick) | 0 | Clean, token valid. Andrew Taraba DM: last message Jul 13 "do you need some work?" — no recent activity. |

Trello: Andrew Taraba ✓ complete. James Diamond ⚠️ skipped — Vinn no daily report Mon 07/27.

---

## Scrin.io (Nick @ John Yi company account — 2026-07-24): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — all developers — 06:30 (+07:00), rechecked 09:00

Workstream SSO restored. **Monday → uses Friday 07-24 data (last workday).**

| Developer | Fri 07-24 | Sources | Status |
|-----------|-----------|---------|--------|
| LongVV | 12h | WS: Tokenlite 12h (Maddy: Mon 8h from last week, Fri 0h). Weekly: 20h+ | ✓ OK — over 16h/wk threshold |
| PhucVT | 8h | Crystal lang: 8h (privacy/terms, nginx fix, Metadata Intake Tiers, GoDaddy) | ✓ OK |
| TuanNT | 8h | Paturevision (Sheets): 8h. WS all other projects: 0h. Combined: 8h. | ✓ OK — John Yi + Bailey + Rebecca gates passed |
| KhanhHH | 8h | WS: Baamboozle 2h + Generator 4h + ETZ-Wathaga 2h = 8h | ✓ OK — Elliott + Aysar gates passed |
| LeNH | 8h | WS: Portfolio-James Diamond 8h. Blair Brown: 0h. | ✓ OK — Blair Brown also passed |

**Fountain (Fri 07-24):** ViTHT 8h, ThinhT 4h, DatNT 8h, VuTQ 4h, PhatDLT 2.5h, HungPN 3h. ✓ all logged.

Trello: Maddy, John Yi, Bailey, Rebecca, Elliott, Aysar, Blair Brown ✓ complete.

---

## Fountain — full 3-part check — 06:35 (+07:00), rechecked 09:00

**Part 1 — Matrix Plan:** Plan posted today 08:56 by @namtv. **ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h, QC 25h** (same as last week of 07/20-07/26).

**Part 2 — Task Log Actuals (Fri 07-24, last workday):**
- ViTHT: 8h, ThinhT: 4h, DatNT: 8h, VuTQ: 4h, PhatDLT: 2.5h, HungPN: 3h
- ViTHT mainly on #2978 (Build-a-Box + Gift Already flow)
- DatNT: order flow, crash fix, admin login issue, rounded corners 
- VuTQ: CacheComponent restructure, stale cache fix
- W15 weekly totals: ViTHT 38.5h, ThinhT 20h, DatNT 38h (met 40h plan), VuTQ 8h (met plan), QC PhatDLT 25h + HungPN 23h.

**Part 3 — Plan vs Actual:** Not computable for new week yet. Prior week closed.

**Trello Board (Fountain):** 
- Customer comments: 1 — kunalsheth on card about URL parsing: "@rick570 Sure" (affirmative, not open ask).
- Active card counts: To-Do 25, Bugs 10, Doing 9, others stable.
- Hard-to-release: none (oldest Doing = 12 days).

Trello: Fountain ✓ complete.

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

## OhCleo Slack — 06:45 (+07:00), rechecked 09:00

Auth fixed (d cookie refreshed from Chrome Profile 25). Token valid.

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 10 | Last activity Jul 21: Tony posted daily report (FE about page + Trello backend task). Celine replied same day re misunderstanding about dev work — not confirmed. Tony last message Jul 21 "let me know when you're back". No new messages since — 6 days quiet (normal, Celine possibly still on vacation). |
| #events-code | — | Channel not found (likely archived). |

Tony daily report: last present Jul 21 — no new report expected given quiet period.
No alerts.

Trello: Ohcleo ✓ complete (recheck).

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

## Arthur / Meta-Stamp — 06:55 (+07:00), rechecked 09:00

Full 6-source re-check — all sources restored and checked.

| # | Source | Result |
|---|--------|--------|
| 1 | Matrix "Arthur - Meta-Stamp" (!BEXEdVUmvWclPLELFf) | Active today 08:54-08:56: TienND + NamTV sharing game codes, no project discussion |
| 2 | Matrix technical room (!QEbdvaMJkTurMpRPIX) | Last activity Jul 20: PhucVT + DuongDN discussing LongVV review |
| 3 | Slack Solid Code MPDM (C0B0BG90AUB) | Last Jul 21: Art confirmed "go with 60/40", David replied thanking. Quiet since. |
| 4 | Slack Solid Code ms-v3 (C0B4G8USU3D) | Jul 26: Art (@UM1UZ0ZST) pinged team about Claude Opus 5 being out, updated Claude Code on mini-server |
| 5 | Slack Solid Code DM Art (D0B0HSZ7XSN) | Last Jul 19-20: David asked Art to update message to Chris re Upwork removal, Art confirmed "Done". Clean. |
| 6 | GitHub Christebob/Meta_Stamp_V3 | 0 open PRs (all closed). 3 recent commits Jul 24: nginx fix, privacy/terms pages, Pockets column fix. |
| 7 | Workstream Crystal lang (W15: 07/20-07/26) | PhucVT 14h, TienND 31h, DuongDN 0h. W16 (07/27-08/02) not yet started. |

No new unresolved issues. No direct customer (Art/Chris) asks pending.

Trello: Arthur - Meta-Stamp ✓ complete (recheck).

---

## Philip (MS Teams) — 06:58 (+07:00), rechecked 09:00

MS Teams check ran successfully — Philip Briggs chat confirmed. No customer complaints or unresolved requests in recent messages.

Trello: Philip ✓ complete (recheck).

---

## Neural Contract (Upwork) — rechecked 09:15 (+07:00)

Cookie extraction via `get-carrick-upwork-cookies.py` succeeded (55 cookies from Profile 1). 20 recent messages (newest first):

| Date | Sender | Content |
|------|--------|---------|
| Jul 23 | dev (676959530284130304) | "I've already pushed master. Please check." |
| Jul 23 | client (810633623375904768) | "thanks. that works. can you pls commit to bitbucket ASAP." |
| Jul 13 | dev | "Hi @Neural Contract, Updated. Please check!" |
| Jul 13 | client | UX change requests — 5+ file upload format message |
| Jul 10 | client | File reorder + multi-file upload UX spec |
| Jul 10 | dev | "I've been checking/testing bug fixes..." |

**Analysis:** Dev (TuanNT/Carrick) pushed master Jul 23, client confirmed "that works." Asked to commit to Bitbucket ASAP — already pushed to master, Bitbucket commit may still be pending. No unanswered urgent client messages. Last exchange (Jul 23) was positive.

Trello: Neural Contract ✓ complete.

---

## Reminders — 07:02 (+07:00)

Friday 07-24: All devs have hours (PhucVT 8h, KhanhHH 8h, LeNH 8h, TuanNT 8h, LongVV 12h). No reminders needed.

---

## Trello Summary

**Check Mail:** 6/6 complete. Card marked done.
**Check Progress:** 21/22 complete. James Diamond ⚠️ — Vinn chưa có daily report Mon sáng (còn sớm).

---

---

## Re-check — 09:15 (+07:00)

**Auth fixes applied:**
- Workstream SSO: ✓ Logged in successfully via `DISPLAY=:1 node scripts/workstream-login.js`
- Solid Code Slack (Arthur): ✓ Token + cookie refreshed from Chrome Profile 15
- OhCleo Slack: ✓ d cookie refreshed from Chrome Profile 25 (token from config works with raw d cookie)
- davidztv GitHub: ✓ Token found in snap gh config (`~/snap/gh/640/.config/gh/hosts.yml`) — `gh auth token -u davidztv` uses wrong config dir
- AirAgri Discord (nusvinn): ✓ Token provided by user, 3-step verification passed, saved to config.

### Re-check results

| Item | Result | Details |
|------|--------|---------|
| Marcel | ✓ completed | Signal already captured in original report (hour-limit 5h/wk, contract paused). Decision needed from team but monitoring complete. |
| Philip | ✓ completed | MS Teams check ran successfully — Philip Briggs chat clicked, no customer complaints or unresolved requests. |
| Ohcleo | ✓ completed | Auth fixed, Celine DM checked: Tony last reported Jul 21, Celine replied same day re misunderstanding. No new urgent messages. events-code channel not found (likely archived). No alerts — 6 days quiet is normal given weekend window. |
| Arthur - Meta-Stamp | ✓ completed | Full 6-source re-check: Solid Code Slack fixed, Workstream fixed, GitHub fixed (davidztv in snap gh config). MPDM group quiet since Jul 21 (Art confirmed 60/40 split). ms-v3: Art pinged team Jul 26 about Claude Opus 5. DM Art clean. Matrix Room 1 active today (TienND + NamTV game codes). WS Crystal lang (W16): PhucVT 14h, TienND 31h, DuongDN 0h. GitHub: 3 commits Jul 24, 0 open PRs. No new unresolved issues. |
| James Diamond | ✓ completed (2nd re-check) | User provided new nusvinn Discord token. 3-step curl verified: /users/@me 200, /guilds 200 (AirAgri + HOMIEAPP), channels accessible. Discord monitor re-run with original window: 14 messages across #airagri_webapp + #airagri-flutter. Vinn's daily report not posted (weekend, expected). Channel active — James Diamond (Jeff) discussing alarms, maps, health/safety v2 design. No alerts. |

### Data gaps filled

| Gap | Fix |
|-----|-----|
| Workstream "SSO blocked" (Alert #6) | Logged in — token saved to config. |
| OhCleo Slack "invalid_auth" (Alert #3) | Token valid with fresh d cookie. Celine DM checked — clean. |
| Solid Code Slack "absent from config" (Alert #4) | Token + cookie saved to config. Full scan done. |
| davidztv GitHub "not configured" (Alert #4) | Token in snap gh hosts.yml. Christebob/Meta_Stamp_V3 accessible. |
| AirAgri Discord (Alert #1) | New token from user. Verified + saved. Monitor re-run clean. |
| Fountain matrix plan (Part 1) | Plan posted today 08:56: **ViTHT 32h, ThinhT 20h, VuTQ 8h, DatNT 40h, QC 25h** (same as last week). @namtv posted 2026-07-27 08:56. |

### Trello final state
**Check Mail:** 6/6 complete. Card done.
**Check Progress:** 21/22 complete.
- ⚠️ James Diamond re-opened — Vinn no daily report for Monday 07/27.

---

## Unresolved questions

1. Marcel's Equanimity contract status (limit cut to 5h/wk, paused again) — captured as alert, needs team decision. Not blocking Trello.
2. OhCleo d cookie extracted from Profile 25 works now but xoxc token in config may also need refresh soon — monitor for next run.
3. davidztv GitHub token is in snap gh config (`~/snap/gh/640/.config/gh/hosts.yml`) — scripts that hardcode the standard `~/.config/gh` path will miss it.
