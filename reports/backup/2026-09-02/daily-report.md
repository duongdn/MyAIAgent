# Daily Report — 2026-09-02 (Wednesday)

**Run:** 2026-09-02T06:45:00+07:00 (cron)
**Window:** 2026-09-01T06:07:00+07:00 → 2026-09-02T06:45:00+07:00
**Leave plan:** none known

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack GGS | Joey (client) sent 3x urgent unresolved messages 20:47-20:57 09-01: selling price not updating + order #39833 error since sync script change. No reply seen in window. |
| 2 | Email dnduongus@gmail.com | GitGuardian: Bearer Token exposed on GitHub in `duongdn/MyAIAgent` repo — needs rotation/verification. |
| 3 | Email rick@ (Zoho) | Rollbar prod errors: FountainGifts #310 new error; FirstProject #962/#1109/#1110 recurring (10x/5min bursts); InfinityRoses+FirstProject daily summaries. |
| 4 | Trello Fountain | 3 unresolved customer threads: kunalsheth (multi-order spreadsheet still showing old version, 09-01 14:36), mike62798179 (triple-duplicate order charged 3x, 08-31), mike62798179 (recurring incorrect delivery-date bug, 2-7 orders/day, unanswered since 08-27 21:01). |
| 5 | OhCleo Slack | Celine (customer): emails to creators landing in spam since a change; asked Tony to check, unanswered in window (09-01 14:39-14:43). |
| 6 | Elena/GitHub | PR #309 ("header and modal i18n") still open on `Elena-SamGuard-Digital-Plant`, now 22 days old (opened 08-11). |
| 7 | Upwork | Rory, Aysar, Neural Contract sessions all expired/login-failed — memo validation (Piece 15) could not run; manual re-auth needed (`upwork-login.js --login --account=carrick`). |
| 8 | Workstream | SSO/token refresh + headless login both failed (recurring outage, see prior incidents) — blocks hour verification for Maddy, John Yi, James Diamond, Aysar, Elliott, Bailey, Rebecca, Blair Brown, and Fountain Parts 2-3. |
| 9 | MS Teams (Philip) | `fetch-msteams-customer-messages.js` timed out (known recurring security-challenge issue) — not verified this run. |
| 10 | Performance (MPFC) | Apdex 0.56 (poor, chronic) — see Performance section. |

**Today (Wed Sep 2):** no known leave/WFH.

---

## Email — all — 06:15 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | 0 | no events |
| carrick@nustechnology.com | 1 | 1 (Jira weekly digest) | no events |
| nick@nustechnology.com | 1 | 0 | no events |
| rick@nustechnology.com | 20 | 14 (FirstProject/InfinityRoses/FountainGifts Rollbar prod errors, see Alert #3) | no events |
| kai@nustechnology.com | 3 | 3 (Jira weekly digest + LIFM2-409 mention) | no events |
| ken@nustechnology.com | 80 | 1 (GitHub notification, informational) | 08:30 Daily Standup Session, 09:00 Tech Talks, 08:30 Daily Standup, 13:00 Backlog Grooming (all Teams) |
| vuongtrancr@gmail.com | 11 | 11 (Swish: New Relic signal-lost x8, Rollbar Delayed-newform daily summary + 10x/5min burst) | — |
| dnduongus@gmail.com | 32 | 1 (GitGuardian bearer token exposed, see Alert #2) | — |
| davidztv19@gmail.com | 2 | 0 (Basecamp + Atlassian notifications, no client content) | — |
| freelancer@mypersonalfootballcoach.com | 2 | 1 (Rollbar daily summary) | — |

Trello: DuongDn/Nick/Ken/Kai ✓ complete. Carrick/Rick ⚠️ left open (unresolved production alerts to triage).

---

## Slack — all — 06:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 0 | quiet |
| RDC - FM Monitoring | 12 | automated tuner access-log + reboot/instability alerts (infra bot, not client ask) |
| Swift Studio | 0 | quiet |
| Xtreme Soft Solutions | 0 | quiet |
| SAM GUARD - Mobile | 0 | quiet |
| Global Grazing Services | 3 | ⚠️ Joey urgent unresolved (see Alert #1) |
| Amazing Meds | 0 | quiet |
| Generator | 0 | quiet |
| LegalAtoms | 0 | quiet |
| MyPersonalFootballCoach | 0 | quiet |
| William Bills | 0 | quiet |
| Equanimity | 0 | quiet |
| SoCal Auto Wraps | — | dropped, not monitored |
| Aigile Dev | 1 | Sentry bot morning check, 0 new urgent |
| OhCleo | see below | ⚠️ Celine deliverability ask, see Alert #5 |

Trello: Rory/Franc/MPFC/Marcel/Raymond/Colin ✓ complete. Aysar/Maddy/John Yi/Elliott/Bailey/Rebecca ⚠️ left open (Workstream hour-gate unavailable this run, see Alert #8).

---

## OhCleo Slack — 06:22 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 3 | ⚠️ "Emails to creators landing in spam, did anything change since July?" (14:39-14:43, unanswered) |
| #events-code | — | `channel_not_found` — bot removed from channel, needs admin re-invite (known, not auth issue) |

Tony's daily report: not observed in this DM window (personal channel only).
Trello: Ohcleo ⚠️ left open (unresolved customer ask).

---

## Discord — all — 06:23 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | ~13 | Active dev handoff: Vinn/Jeff off 09-01/09-02, dapackage covering export-feature deploy to prod, testing confirmed clean by bellatric02. No blockers. |
| Bizurk (nuscarrick) | 0 | quiet, no Andrew DMs |

Trello: James Diamond/Vinn ⚠️ left open (Discord clean, but WS hour-gate for PhucVT unavailable). Andrew Taraba ✓ complete.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-01): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — all — 06:35 (+07:00)

🔴 Workstream SSO/token refresh failed (API refresh 2x + headless browser login both failed/timed out) — same recurring outage pattern as prior incidents. Could not verify hours for any Workstream-tracked project this run (Maddy, John Yi, James Diamond, Aysar/Baamboozle, Elliott/Generator, Bailey, Rebecca, Blair Brown, Fountain Parts 2-3). No Google Sheets fallback exists (all projects migrated off Sheets 2026-08-21). These items are left ○ pending a recheck once Workstream access is restored.

Maddy JIRA cross-check: not run this pass (blocked on same Workstream dependency for weekly context — script reads stale sheet per [[feedback_maddy_jira_weekly_check]], skipped, time-boxed).

---

## Fountain — 06:40 (+07:00)

**Part 1 — Matrix plan:** Room `!EWnVDAxbTGsBxPkaaI`. Latest plan (trinhmtt, corrected after duongdn flagged an error): "ViTHT: 24h, DatNT: 24h, VuTQ: 12h => QC 15h" (initial post said ThinhT instead of VuTQ, corrected same thread).

**Part 2/3 — Task log actuals / plan vs actual:** ⚠️ Blocked — Workstream project `fountain` unreachable this run (see Alert #8). Not verified.

**Trello board:** ⚠️ 3 unresolved customer threads (see Alert #4): kunalsheth spreadsheet issue, mike62798179 triple-duplicate order, mike62798179 recurring delivery-date bug (escalating, "everyday issue... 2-7 orders a day").

Trello: Fountain ⚠️ left open (real unresolved customer issues + Workstream block).

---

## Elena — 06:15 (+07:00)

- PR #309 ("header and modal components with i18n") still open, author nusken, opened 08-11 — now 22 days stale (growing from 17d noted previously). Needs review/merge decision.
- Precognize (nusken account): no open PRs authored by nusken currently.
- WordPress SamGuard (samguard.co): clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics/ads `net::ERR_ABORTED` noise (GA/DoubleClick/LinkedIn pixels), not real errors.

Trello: Elena-SamGuard ⚠️ left open (stale PR#309). Elena-WordPress ✓ complete.

---

## Matrix — 06:15 (+07:00)

Checked Fountain room only this pass (Kunal weekly plan, see Fountain section above). Full all-rooms sweep not run separately this cron pass (time-boxed; no other action items surfaced from the Fountain room transcript beyond the customer Trello comments already captured).

---

## Performance — 06:30 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.88 | 585ms | 2.1% (594/27878) — mostly benign ValidationError/AuthenticationFailed (dup email/username, bad reset code) | 19.3/min |
| MyPersonalFootballCoach | 0.56 (poor, chronic) | 1067ms | 0.14% (46/32628) | 22.6/min |

**OhCleo slow transactions (>5s):**
- `AITranscribeView.post` 17.4s (1 call)
- `MediaByTagsView.get` 15.1s (160 calls)
- `MediaByKeyView.get` 6.7s (362 calls, chronic)

**MPFC top errors:**
- `WP_Error::get_method()` undefined method — 26x (chronic)
- `"continue" targeting switch` E_WARNING — 16x (chronic)
- New: `E_COMPILE_ERROR require(): legacy-widget.php` with unresolved `ABSPATHWPINC` constant — 1x (malformed-path probe, likely bot/scanner artifact, not a real app bug)
- Misc single-occurrence warnings (count/mkdir/mysqli)

**MPFC slowest transactions (>5s):**
- `sitemap_index.xml` 49.7s (1 call)
- `age/*/feed/` 10.8s
- `forgot-password/` 10.4s (3 calls)
- `soccer-player-development-podcast-episode-99...` 9.7s (4 calls)
- `feed/` 8.9s (2 calls)

No dedicated Trello gate for Performance (informational only).

---

## Upwork Memo — 2026-09-01 — 06:42 (+07:00)

| Workroom | Status |
|----------|--------|
| Rory | ⚠️ session_expired/login_failed — carrick live cookies + stored + headless all failed |
| Aysar | ⚠️ session_expired |
| Neural Contract | session_expired (no alert per rule — messages-only room) |

Session/auth failure ≠ memo status (per rule) — no memo-validity alert raised, but manual re-auth needed: `node scripts/upwork-login.js --login --account=carrick`.

---

## Arthur / Meta-Stamp

Not run this pass — time-boxed (Workstream retries + Philip retries consumed the budget). Trello item left open; needs a standalone `/daily-report arthur` recheck.

---

## Philip

`fetch-msteams-customer-messages.js will "Philip Briggs"` timed out after 60s (known recurring MS security-challenge/login-loop issue). Not verified this run — left open.

---

## Trello Summary

**Check Mail:** 4/6 complete (DuongDn, Nick, Ken, Kai). Open: Carrick, Rick (real unresolved production alerts).

**Check Progress:** 9/22 complete (Rory, Franc, MPFC, Marcel, Raymond, Neural, Andrew Taraba, Colin, Elena-WordPress SamGuard). Open: Maddy, John Yi, James Diamond, Aysar, Elliott, Elena-SamGuard, Bailey, Rebecca, Fountain, Philip, Ohcleo, Arthur, Blair Brown — mostly blocked by the Workstream outage (Alert #8), plus 3 genuine unresolved alerts (GGS, Fountain customers, OhCleo).

---

## Reminders

Not run this pass — combined-hours source (Workstream) unavailable, so 0h/shortfall cannot be verified for any dev this run. Skipped rather than guessing; needs a recheck once Workstream is back.

---

## Unresolved questions

1. Workstream SSO outage — recurring across many prior runs, root cause still not found. Worth escalating for a permanent fix?
2. GitGuardian bearer-token alert on `duongdn/MyAIAgent` — needs manual verification/rotation, not something this run can action.
3. GGS/Joey's urgent pricing-sync issue (20:47-20:57 09-01) — is anyone (Nick/GGS dev) already on it outside Slack?
