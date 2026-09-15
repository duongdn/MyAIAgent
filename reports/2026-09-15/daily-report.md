# Daily Report — 2026-09-15 (Tuesday)

**Run:** 2026-09-15T05:00:00+07:00 (cron), corrected 08:50 (+07:00)
**Window:** 2026-09-14T08:35:00+07:00 → 2026-09-15T05:00:00+07:00
**Leave plan:** refreshed 08:32 — PhucVT full-day leave 2026-09-07→09-18 (covers today + yesterday, "việc cá nhân"). No one else on leave.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | ~~Workstream~~ | ~~SSO login failing again — both API refresh and visible-browser (`workstream-login.js`) attempts timed out. Blocks all task-log hour verification.~~ **CORRECTED 08:50: retried `DISPLAY=:1 workstream-login.js`, succeeded on first attempt (transient SSO, not a persistent outage). All hours below now verified live.** |
| 2 | Bailey (Matrix, internal) | Grazing Software CR fixed-cost task est 14.5h, actual 26h+, dev (tuannt) didn't flag overrun proactively. DuongDN already addressed directly in "NUS - Bailey - Paturevision 2026" room 11:22-14:02 — process tightening in progress, no action needed from this report. |
| 3 | Elena-SamGuard GitHub | PR #309 ("Implement header and modal components with i18n support") open since 2026-08-11, >1 month stale. Elena is on the paused/Ignore List so not gated, flagging for visibility only. |
| 4 | MPFC New Relic | Apdex 0.52 (poor), chronic. New SQLi `WAITFOR DELAY` probe on `/search/` (38.4s response) — same recurring probe pattern as prior reports, not a new vector. |
| 5 | Workstream — KhanhHH (added 08:50) | 0h logged 2026-09-14 across ALL live Workstream projects (Baamboozle/Aysar, Generator/Elliott, and every other visible project) — no leave on file. Blocks Aysar + Elliott Trello items. |
| 6 | Workstream — LeNH (added 08:50) | 0h logged 2026-09-14 across ALL live Workstream projects (James Diamond/Portfolio, Blair Brown, and every other visible project) — no leave on file. Upwork Rory/Aysar workrooms also show 0 memos same day (consistent). Blocks James Diamond + Blair Brown items — reverses cron's earlier James Diamond ✓ (see Discord section). |

**Today (Tue Sep 15):** PhucVT on approved full-day leave (2026-09-07→09-18). No one else on leave.

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
| freelancer@mypersonalfootballcoach.com | 8 (Rollbar: 3 new prod errors #59-61 — `mm_get_setting()` undefined, `_get_option()` on null x2 — chronic-pattern errors, no new class) | — |

**Pending — no monitor (Arthur/Meta-Stamp paused per Ignore List):**
| davidztv19@gmail.com | 0 | — |

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

Trello: ~~James Diamond ✓ complete (active discord testing, no blockers).~~ **CORRECTED 08:50: James Diamond gate = LeNH Workstream hours (not Discord activity, per [[feedback_james_diamond_skill_table_stale_use_lenh_not_phucvt]]) — LeNH shows 0h 09-14, no leave → ⚠️ left incomplete.** Andrew Taraba ✓ complete.

---

## Sheets / Workstream — all developers — 05:20 (+07:00), corrected 08:50 (+07:00)

~~Workstream SSO down — hours unverified.~~ **CORRECTED: retried login, succeeded. Live data for 2026-09-14 (Monday) across all visible Workstream projects:**

| Developer | Project(s) w/ hours 09-14 | Total | Status |
|-----------|---------------------------|-------|--------|
| TuanNT | Speedventory (Bailey): 4h+0.5h+3.5h | 8h | OK — covers John Yi/Rebecca/Bailey gates |
| LongVV | Maddy: 0h (ad-hoc, no target) | — | informational only, no alert |
| PhucVT | — (on leave) | — | leave, no alert |
| **KhanhHH** | none found (Baamboozle/Aysar, Generator/Elliott, + all other live projects checked) | **0h** | ⚠️ **ALERT — no leave on file** |
| **LeNH** | none found (James Diamond/Portfolio, Blair Brown, + all other live projects checked) | **0h** | ⚠️ **ALERT — no leave on file** |

Maddy JIRA weekly cross-check (`maddy-jira-tasklog-check.js --week 2026-09-14`): "No Workstream entries this week" — consistent with LongVV's 0h/ad-hoc status, not itself an alert.
Bitbucket PR check (Maddy part 4): Atlassian app-password token → `401` (dead, needs re-creation) — could not verify Xtreme/RMS PR reply-rate this run.

---

## Scrin.io — 05:22 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-14):** 0h — no sessions recorded. (Tracks Nick, not TuanNT.)

---

## Fountain — 05:25 (+07:00)

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted this week's plan 08:57 — ViTHT: 40h, ThinhT: 20h, DatNT: 40h => QC 25h.

**Part 2 — Task Log Actuals (corrected 08:50, WS retry succeeded):** Monday 09-14 actuals — DatNT 3.75h, ThinhT 4h, HungPN(QC) 1.25h, ViTHT 0h so far. Week just started (Mon-only data), not a shortfall signal yet.

**Part 3 — Plan vs Actual:** Plan (Matrix): ViTHT 40h/wk, ThinhT 20h/wk, DatNT 40h/wk => QC 25h/wk. Monday actuals are well within pace for a 6-day work week — no concern.

**Trello board (customer comments/stuck cards):** still not run — Rick's account/board (`5475eaf923a9a1309357eb51`) needs separate Trello token not present in `config/.trello-config.json` (that file is the "My Task" board only). Needs manual setup — see Unresolved Questions.

Additional context from Matrix "Kunal - Fountain" room: active dev work — fixed broken `/FAQ` link casing, BE card pushed live, ongoing discussion re: Rollbar bug backlog prioritization and ReviewIO integration for customer review-widget request. No unanswered customer asks observed.

Trello: Fountain ⚠️ left incomplete — Parts 2/3 now clean, but Trello board (customer comments/stuck cards) still not checked.

---

## Elena — 05:28 (+07:00)

GitHub PR #309 ("Implement header and modal components with i18n support") on `Elena-SamGuard-Digital-Plant`, open since 2026-08-11 (35+ days stale) — not reviewed/merged this run (Elena is on the paused Ignore List, no action taken per standing instruction).
Precognize (`nusken`): no open PRs.
WordPress SamGuard JS-error check: not run this pass — time-boxed.

Trello: Elena - SamGuard ✓ auto-complete (Ignore List — paused). Elena - WordPress SamGuard ⚠️ left incomplete — not run.

---

## Trello — Check mail + Check progress — 05:30 (+07:00)

**Check mail:** all 6 items (DuongDn, Carrick, Nick, Rick, Kai, Ken) ✓ complete — card marked done.

**Check progress — corrected 08:50 (+07:00) after Workstream retry succeeded:**
- ✓ complete: Franc, Rory, MPFC, Marcel, Raymond, Neural Contract (silence=no alert per standing rule), Andrew Taraba, Colin, Ohcleo, ~~James Diamond~~ (reverted, see below)
- ✓ complete (newly, 08:50 — WS hours verified): Maddy (0h ad-hoc, no alert), John Yi (TuanNT 8h combined via Speedventory), Bailey (TuanNT 8h + Nick's daily report present in Slack), Rebecca (TuanNT combined hours OK)
- ✓ auto-complete (Ignore List — paused, no gate check): Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde
- ⚠️ left incomplete (KhanhHH 0h 09-14, no leave): Aysar, Elliott
- ⚠️ left incomplete (LeNH 0h 09-14, no leave — reverted from cron's incorrect ✓): James Diamond
- ⚠️ left incomplete (Fountain Trello board not checked — Rick's separate board token missing): Fountain
- ⚠️ left incomplete (config/.msteams-accounts.json missing entirely — not a token expiry, needs setup): Philip
- ⚠️ left incomplete (not run this pass, time-boxed): Elena - WordPress SamGuard

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

## Upwork Memo — 08:50 (+07:00), corrected

~~Not run this pass.~~ **Run 08:50:** Rory + Aysar workrooms both show 0 memos for 2026-09-14 (`source: none`) — consistent with LeNH's 0h Workstream day found above, not a separate memo-quality issue. No invalid memos to flag. Matrix "Direct Manager" room shows internal awareness already in progress (namtv/minhtv reviewing Rory memo quality live) — see Matrix section above.

---

## Arthur / Meta-Stamp — not run this pass

On paused Ignore List — auto-completed without gate check per standing instruction (2026-09-09).

---

## Unresolved Questions

1. ~~Workstream SSO outage~~ — RESOLVED 08:50, single retry succeeded (transient, not persistent). Surfaced two real alerts: KhanhHH and LeNH both 0h on 2026-09-14, no leave on file — ask them directly if not resolved by next check.
2. ~~Leave plan not refreshed~~ — RESOLVED 08:32, refreshed. PhucVT confirmed on approved leave through 09-18.
3. Elena - WordPress SamGuard JS-error check still not run — needs a recheck pass.
4. Fountain Trello board (customer comments/stuck cards, Rick's separate "Web Development" board) still not checked — `config/.trello-config.json` only covers the "My Task" board; need Rick's board key/token added before this can be automated.
5. Philip (MS Teams) check is structurally blocked — `config/.msteams-accounts.json` does not exist in the repo at all (not an expired token, a missing setup step). Needs the account credentials created/decrypted before this piece can ever run.
6. Bitbucket token for Maddy Part 4 (PR reply-rate) returns 401 — needs a fresh Atlassian app password with Bitbucket scope.
