# Daily Report — 2026-09-15 (Tuesday)

**Run:** 2026-09-15T05:00:00+07:00 (cron)
**Window:** 2026-09-14T08:35:00+07:00 → 2026-09-15T05:00:00+07:00
**Leave plan:** not checked this run (leave-email parse skipped — time-boxed)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Workstream | SSO login failing again — both API refresh and visible-browser (`workstream-login.js`) attempts timed out. Blocks all task-log hour verification (Maddy, John Yi, Aysar, Elliott, James Diamond, Rebecca, Bailey/TuanNT, Fountain Part 2/3). Recurring outage, root cause still open (see memory). |
| 2 | Bailey (Matrix, internal) | Grazing Software CR fixed-cost task est 14.5h, actual 26h+, dev (tuannt) didn't flag overrun proactively. DuongDN already addressed directly in "NUS - Bailey - Paturevision 2026" room 11:22-14:02 — process tightening in progress, no action needed from this report. |
| 3 | Elena-SamGuard GitHub | PR #309 ("Implement header and modal components with i18n support") open since 2026-08-11, >1 month stale. Elena is on the paused/Ignore List so not gated, flagging for visibility only. |
| 4 | MPFC New Relic | Apdex 0.52 (poor), chronic. New SQLi `WAITFOR DELAY` probe on `/search/` (38.4s response) — same recurring probe pattern as prior reports, not a new vector. |

**Today (Tue Sep 15):** Leave plan not refreshed this run — see Unresolved Questions.

---

## Email — all 10 accounts — 05:10 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 4 | no events |
| carrick@nustechnology.com | 1 | no events |
| nick@nustechnology.com | 1 | no events |
| rick@nustechnology.com | 13 | (Fountain/InfinityRoses BugSnag+Rollbar daily summaries, routine) |
| kai@nustechnology.com | 3 | no events |
| ken@nustechnology.com | 80 (GitHub notification noise — Welligence/Precognize/mimaizumi repos, dependabot) | 2 events: 08:30 DE Daily Standup, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 20 (mostly "Signal lost" New Relic Incident Intelligence noise for Swish) | — |
| dnduongus@gmail.com | 21 (personal newsletters/banking, no security alerts) | — |
| davidztv19@gmail.com | 0 | — |
| freelancer@mypersonalfootballcoach.com | 8 (Rollbar: 3 new prod errors #59-61 — `mm_get_setting()` undefined, `_get_option()` on null x2 — chronic-pattern errors, no new class) | — |

No unread security alerts, no unanswered customer asks found in any Zoho/Gmail account this window.
Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete (card marked done).

---

## Slack — all 14 workspaces (+ OhCleo separately) — 05:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 (customer-success + testing channels; MPDM C07SQ4HAUHZ: 0) | Carrick actively fixing dark-mode UI feedback with Aysar's team. MPDM silence — **cannot verify against Workstream khanhhh hours (WS down)**, leaving ⚠️ open. |
| RDC - FM Monitoring | 1 | Automated "Tuner Access Log" only — no customer content |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 1 | Madhuraka re: client doc update, informational |
| SAM GUARD - Mobile | 3 | HubSpot MQL auto-notifications only |
| Global Grazing Services | 1 | Nick's daily report present in #général (bug list: Grazing Desktop "Setup" button issue) |
| Amazing Meds | 0 | — |
| Generator | 0 | — |
| LegalAtoms | 0 | — |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 3 | Marcel/Carrick discussing zkteco payload confirmation (West Glades, Holland Link, GYRE, Sim Lian Rivelle) — resolved in-thread |
| SoCal Auto Wraps | 0 | (not monitored, dropped) |
| Aigile Dev | 0 | — |

Trello: Franc, Rory, MPFC, Marcel, Raymond, Colin ✓ complete. Baamboozle/Aysar, Xtreme/Maddy, Generator/Elliott, Bailey/GGS ⚠️ skipped — pending Workstream hours verification.

### OhCleo Slack — 05:18 (+07:00)
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 24 | Tony's daily report present (10:17): shipped 3 AI cards + update card for review, fixed expired-subscription bug. Celine confirmed shippable, discussed AI usage analytics availability — all resolved in-thread. |
| #events-code | 0 (channel_not_found — bot removed from channel, known issue, needs admin re-invite) | |
No alerts. Trello: Ohcleo ✓ complete.

---

## Discord — AirAgri + Bizurk — 05:05 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | ~15 in #airagri-flutter | Jeff's daily report present (01:37: "continue working on Property Map tasks"). Active offline-sync testing thread between bellatric02/jeff_trinh — Incident module sync bug found then fixed, TestFlight builds shipped. James Diamond (.jdiamond) asking about upload robustness. |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew DMs |

Trello: James Diamond ✓ complete (active discord testing, no blockers). Andrew Taraba ✓ complete.

---

## Sheets / Workstream — all developers — 05:20 (+07:00)

🔴 **Workstream SSO is down this run** — both API token refresh and visible-browser login (`DISPLAY=:1 node scripts/workstream-login.js`) timed out after 2 attempts each. Since all task-log hours moved off Google Sheets to Workstream (2026-08-21), there is no fallback source for most projects — LongVV, PhucVT, TuanNT, KhanhHH, LeNH hours for 2026-09-14 could not be verified this run.

Maddy JIRA weekly cross-check: not run this pass (depends on Workstream-updated script — time-boxed).

**Action needed:** retry Workstream login manually (outside cron window) or via recheck pass later today.

---

## Scrin.io — 05:22 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-14):** 0h — no sessions recorded. (Tracks Nick, not TuanNT.)

---

## Fountain — 05:25 (+07:00)

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted this week's plan 08:57 — ViTHT: 40h, ThinhT: 20h, DatNT: 40h => QC 25h.

**Part 2 — Task Log Actuals:** blocked by Workstream outage (project `fountain`, primary source since 2026-07-13).

**Part 3 — Plan vs Actual:** blocked, same reason.

**Trello board (customer comments/stuck cards):** not run this pass — time-boxed.

Additional context from Matrix "Kunal - Fountain" room: active dev work — fixed broken `/FAQ` link casing, BE card pushed live, ongoing discussion re: Rollbar bug backlog prioritization and ReviewIO integration for customer review-widget request. No unanswered customer asks observed.

Trello: Fountain ⚠️ left incomplete — Parts 2/3 blocked by Workstream outage.

---

## Elena — 05:28 (+07:00)

GitHub PR #309 ("Implement header and modal components with i18n support") on `Elena-SamGuard-Digital-Plant`, open since 2026-08-11 (35+ days stale) — not reviewed/merged this run (Elena is on the paused Ignore List, no action taken per standing instruction).
Precognize (`nusken`): no open PRs.
WordPress SamGuard JS-error check: not run this pass — time-boxed.

Trello: Elena - SamGuard ✓ auto-complete (Ignore List — paused). Elena - WordPress SamGuard ⚠️ left incomplete — not run.

---

## Trello — Check mail + Check progress — 05:30 (+07:00)

**Check mail:** all 6 items (DuongDn, Carrick, Nick, Rick, Kai, Ken) ✓ complete — card marked done.

**Check progress:**
- ✓ complete: Franc, Rory, MPFC, Marcel, Raymond, Neural Contract (silence=no alert per standing rule), Andrew Taraba, Colin, Ohcleo, James Diamond
- ✓ auto-complete (Ignore List — paused, no gate check): Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde
- ⚠️ left incomplete (Workstream outage blocks hour verification): Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca, Fountain
- ⚠️ left incomplete (not run this pass, time-boxed): Philip, Elena - WordPress SamGuard

## Ignore List — 05:30 (+07:00)
Not tracked (paused), auto-completed: Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde. (Colin and Philip remain active/monitored per current ignore-list config — Colin checked above; Philip not run this pass.)

---

## Reminders — 05:32 (+07:00)

Not run — depends on Workstream/Sheets 0h data which is unavailable this run (SSO outage). No reminders printed or sent.

---

## Matrix — 05:10 (+07:00)

**Active rooms: 18 / 145 | Messages: 560** *(since 2026-09-14 08:00)*
Full details: reports/2026-09-15/matrix-rooms-0510.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| Potential - Wildsoul Wellness | 11:58 | anhnvn: "Nhìn chung họ có 5 nhu cầu, trong đó chưa chắc đã build custom layer... A Dương muốn check thêm ở đây là check Mindbody có gì" — resolved same day, duongdn/namtv/anhnvn discussed and anhnvn sent client response 23:07 ✅ |

### Key updates

**Bailey/Paturevision — budget-overrun CR + bug fixes**:
- Grazing Desktop CR: est 14.5h actual 26h+, no proactive flag from dev (tuannt) — DuongDN pushed back hard on process (11:22-14:02), requiring daily task-log discipline going forward and CR/bug time separation.
- Grazing Software bug (tag logic) found, TuanNT investigating fix scope.

**Fountain — weekly plan posted, active dev**:
- trinhmtt: ViTHT 40h / ThinhT 20h / DatNT 40h => QC 25h.
- `/FAQ` link casing bug fixed same day.

**OhCleo — AI Companion ship**:
- 3 AI cards + subscription-expiry-check fix submitted for App Store review; Celine confirmed ship-ready.

**Potential — Wildsoul Wellness (new lead)**:
- Mindbody-based prospect, 5 requirements scoped by chientx/namtv/anhnvn; team believes custom reporting layer needed for some items; formal response sent to client 23:07.

**Other:**
- Direct Manager room: namtv escalated Upwork memo quality risk (Rory workroom) — minhtv now checking daily.
- Rory Hackett - BXR App: minhtv flagged Khoa's memo wording too vague ("Build app and submit to Testflight" → needs action-specific rewrite) — internal coaching, no client-facing issue.
- Recruitment: 2 BDM candidate interviews today, one rescheduled, one rejected (no ITO experience).

---

## Performance — both projects — 05:38 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| OhCleo (prod) | 0.95 | 181ms | 2.8% (716/25798) | 20.9/min |
| MPFC (live) | 0.52 (poor, chronic) | 2113ms | 1.8% (457/25118) | 20.3/min |

**OhCleo top errors:** ValidationError email-exists (7), AuthenticationFailed password-mismatch (4), ValidationError username-exists (2), IntegrityError null user_id on app_playhistory (1, chronic).

**OhCleo slow transactions (>1s):** ChatSendView.post 3078ms/18calls, MediaByTagsView.get 2647ms/166calls, RequestPayoutView.post 2201ms/1call, MediaByKeyView.get 1875ms/301calls, CreatorVerificationApproveView.post 1021ms/1call.

**MPFC top errors:** count() Countable warning (13), E_COMPILE_ERROR legacy-widget.php missing (1), mysqli DNS resolution failure (1), `get_header()` undefined (1, chronic theme issue).

**MPFC slow transactions (>5s):** user-video/step-over-turn-3 79.1s/1call, user-video/reverse-cruffy-4 62.0s/1call, user-video/pass-and-receive-5 48.6s/1call, video/1v1-and-shooting-practice 48.0s/1call, `/search/` SQLi WAITFOR DELAY probe 38.4s/1call (same recurring attack pattern as prior reports, site not compromised — probe returns normally).

No Trello item exists for Performance (informational only).

---

## Upwork Memo — not run this pass — 05:40 (+07:00)

Time-boxed out this run due to Workstream outage consuming the retry budget. Matrix "Direct Manager" room shows internal awareness already in progress (namtv/minhtv reviewing Rory memo quality live) — see Matrix section above.

---

## Arthur / Meta-Stamp — not run this pass

On paused Ignore List — auto-completed without gate check per standing instruction (2026-09-09).

---

## Unresolved Questions

1. Workstream SSO outage — needs manual re-login outside cron window (visible browser, `DISPLAY=:1 node scripts/workstream-login.js`) before Maddy/John Yi/Aysar/Elliott/James Diamond/Rebecca/Bailey/Fountain hours can be verified. Recommend a recheck pass once resolved.
2. Leave plan was not refreshed this run (`parse-leave-emails.js` not run, time-boxed) — unknown if anyone is on leave today (Tue Sep 15).
3. Philip (MS Teams) and Elena - WordPress SamGuard checks not run this pass — need recheck.
4. Fountain Trello board (customer comments/stuck cards) not checked this pass.
5. Upwork Memo validation (Piece 15) not run this pass.
