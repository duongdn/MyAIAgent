# Daily Report — 2026-08-25 (Tuesday)

**Run:** 2026-08-25T07:32:00+07:00 (cron)
**Window:** 2026-08-24T09:45:00+07:00 → 2026-08-25T07:32:00+07:00
**Leave plan:** 31/8 (Mon next week) is a remote/national holiday adjustment day per NUS Technology announcement (not this window's leave).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) | Fountain/InfinityRoses production errors: BugSnag `RuntimeError`/`ActiveRecord::RecordInvalid`/`Net::ReadTimeout` (FountainStaging), Rollbar `Stripe::InvalidRequestError` #444 (InfinityRoses prod), `NoMethodError` 100th occurrence (InfinityStagingBE), `Uncaught Error` #1090 10x/100th (FirstProject prod) |
| 2 | Email (vuongtrancr@) | Swish: repeated "Signal lost 10 min — Low Application Throughput" (8x) + Rollbar `Delayed-newform` prod errors #288/#289 (10x, 10-in-5-min) |
| 3 | Email (carrick@) | New Relic: "account no longer syncing data" + usage alert (needs check — may be a config/billing notice, not app downtime) |
| 4 | Performance (MPFC) | Apdex 0.49 — WORSE than 2026-08-24's 0.59. `MediaByKeyView` no longer applies to MPFC — actually WP_Error::get_method() fatal error still chronic (49x). `author-sitemap.xml` 86.7s avg (3 calls), `sitemap_index.xml` 48.4s avg — sitemap generation badly regressed |
| 5 | Performance (OhCleo) | `MediaByKeyView.get` avg 44.3s/226 calls (was 12.25s prior report — real 3.6x regression), `MediaByTagsView.get` avg 19.4s/94 calls |
| 6 | Elena (GitHub) | PR #309 "Implement header and modal components with i18n support" open since 2026-08-11 (14 days stale), author nusken, not yet reviewed/merged this run — needs CodeRabbit review before merge |
| 7 | Baamboozle/Aysar | No Carrick "Today's update" post found in MPDM C07SQ4HAUHZ during the full window (yesterday 09:45 → now) — expected windows 08:41-09:03 and 17:00-17:45 both passed with zero messages in that channel |
| 8 | Workstream (system-wide) | SSO login failing for all task-log/hours checks (API refresh + 2x browser login attempts all failed — `ETIMEDOUT`/no token captured after SSO redirect). Blocks: Sheets/Workstream piece (all devs), Fountain Part 2/3 (task log actuals), Arthur Part 3 (est/actual hours), Maddy/Elliott/Aysar/Bailey/Rebecca/John Yi/Blair Brown hour-gated Trello items. Matches known recurring pattern (see `feedback_workstream_display_outage_pattern`) — root cause still open, not a one-off |
| 9 | Upwork memo check | Puppeteer navigation timeouts on all 3 workrooms (Rory/Neural/Aysar) — browser automation contention this run, memo validity NOT verified today |
| 10 | MSTeams (Philip) | Script timed out (`fetch-msteams-customer-messages.js`) — not checked this run |

**Today (Tue 25 Aug):** No specific leave noted in this window's Matrix traffic beyond routine half-day/office-move chatter (honght left early 24/8 ~16:00, unrelated to today).

---

## Email — all — 07:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | 1 (leave request FYI, not blocking) | not fetched this run |
| carrick@nustechnology.com | 8 | 3 (James urgent-help thread + New Relic sync/usage notices) | — |
| nick@nustechnology.com | 0 | 0 | — |
| rick@nustechnology.com | 15 | 14 (Fountain/Infinity/FirstProject prod errors — see Alert #1) | — |
| kai@nustechnology.com | 4 | 2 (JIRA mentions LIFM2-458/459, routine) | — |
| ken@nustechnology.com | 32 | 1 (dependabot bump, routine) | — |
| vuongtrancr@gmail.com | 19 | 16 (Swish signal-lost + Delayed-newform errors — see Alert #2) | — |
| dnduongus@gmail.com | 22 | 0 | — |
| davidztv19@gmail.com | 1 | 0 (Basecamp notification) | — |
| freelancer@mypersonalfootballcoach.com | 4 | 2 (Rollbar + New Relic daily summaries, routine — see Performance section for detail) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete (all 6 Zoho accounts scanned).

---

## Slack — all 14 workspaces — 07:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 8 | James Le Chevalier (client "skjamie25") reported team end-date display bug ("today's date" showing instead of correct renewal date) on nusdev, unresolved as of window end. Carrick asked clarifying questions. **MPDM C07SQ4HAUHZ (Aysar gate) had ZERO messages** — see Alert #7. |
| RDC - FM Monitoring | 11 | Automated "Tuner Instability/Recovery Alert" cycling (routine ops monitoring, self-recovering) + Carrick follow-up ping. No new customer ask. |
| Swift Studio | 13 | Normal dev activity, no alerts. |
| Xtreme Soft Solutions | 3 | Madhuraka (client) asked why task 449 was returned 5x by Anoma QA — Kai replied he has a comment for Anoma on it. Dev-topic discussion, not an alert per policy, but worth watching (client directly asking about QA quality). |
| SAM GUARD - Mobile | 0 | — |
| Global Grazing Services | 2 | Nick posted daily report in #général: "[Console] Alternative Reference Product at Split Order, [Console] Use Average Purchase Price..." |
| Amazing Meds | 0 | — |
| Generator | 4 | Violet asked if there are tasks for Carrick this week (internal staffing question, not a bug). |
| LegalAtoms | 1 | Raymond: doing a release this Thursday. No Nick-specific ask. |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 16 | Active Carrick↔komal.bailur (client) exchange on Simlian Rivelle/Westglade record-count reconciliation and go-live — all messages answered same-day, no unresolved ask. |
| SoCal Auto Wraps | 2 | Slackbot invite noise only. |
| Aigile Dev | 3 | Slackbot invite noise + 1 automated "the gaige alerts" post (empty text). |

Trello: Rory, Franc, Marcel, MPFC, Colin ✓ complete. Maddy, John Yi, Aysar, Elliott ⚠️ left open (see below — WS-gated or missing update).

---

## Discord — AirAgri + Bizurk — 07:16 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | active | Vinn active (form/biosecurity feature work), James Diamond (client) asking multiple product questions (training logging, form assignment, app icon inconsistency). **Jeff's daily report present** (4h: Check-in Info Form done, Submitted Forms History done). |
| Bizurk (nuscarrick) | 0 | Token valid, no messages, no Andrew DMs. |

Trello: James Diamond ⚠️ left open (gated also on sheets phucvt, WS unavailable this run). Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all developers — 07:20-07:31 (+07:00)

🔴 **Workstream SSO unavailable this run.** Token refresh chain exhausted: proactive refresh (token 2391465s old) → API refresh (2 attempts failed) → browser login (2 attempts, both `spawnSync /bin/sh ETIMEDOUT`) → dedicated `workstream-login.js` visible-browser run (2 attempts, SSO redirected but API token never fired). This matches the recurring pattern already logged in `docs/memory/weekly-report/feedback_workstream_display_outage_pattern.md` (failed 2026-07-26/07-31/08-01/08-15/08-22) — root cause still open, not a config issue on this host.

**Impact:** No dev hours, reviewer status, or needsReview data available for any project this run (LongVV/PhucVT/TuanNT/KhanhHH/LeNH/Maddy/Elliott/Aysar/Bailey/Rebecca/John Yi/Blair Brown/Arthur-Crystal-lang/Fountain task-log). Google Sheets fallback is not available either — the Sheets task-log system was fully retired 2026-08-21 in favor of Workstream.

Maddy JIRA cross-check: not run this window (depends on the same Workstream-era task log, no fallback).

**Manual retry needed:** `DISPLAY=:1 node scripts/workstream-login.js` outside cron window, or wait for next scheduled retry.

---

## Scrin.io — 07:16 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-08-24):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 07:10-07:32 (+07:00)

**Part 1 — Matrix Plan** (Kunal - Fountain room, posted by trinhmtt @ 09:16 2026-08-24):
```
ViTHT: 40h
ThinhT: 20h
DatNT: 40h
=> QC: 25h
```
Note: plan lists DatNT this week (not VuTQ) — roster appears to have shifted, reported as-is.

**Part 2 — Task Log Actuals:** ⚠️ Unavailable — Workstream SSO down (project `fountain`, id `cmpqcjojh00q2tk1v2qi7gs0j`), no fallback (Sheets retired).

**Part 3 — Plan vs Actual:** ⚠️ Cannot compute without Part 2 data.

**Trello Board (Web Development, Fountain):**
- No new customer comments (kunalsheth/tmmckay/mike62798179/iris63293413) since last_run.
- Active dev chatter in Matrix (Kunal - Fountain room, 68 msgs): footer/dropdown fix PR reviewed by vutq, Services menu inconsistency being resolved with hungpn/datnt, Infinity delivery-date bug fixed, digital proof generator roadmap discussion. No stuck/hard-to-release flags identified from Matrix chatter (full board stuck/hard-to-release scan skipped this run due to time budget — Part 2/3 blocker took priority).

Trello: Fountain ⚠️ left open — Parts 2-3 incomplete (Workstream down).

---

## Elena — 07:24 (+07:00)

**Open PRs (nustechnology/Elena-SamGuard-Digital-Plant, `duongdn` account):**
- PR #309 "Implement header and modal components with i18n support" — author nusken, opened 2026-08-11, **14 days stale**, not yet reviewed/merged. Did not auto-merge this run (CodeRabbit review check not completed given time budget — flagging instead of merging blind).

**Precognize (nusken account):** not checked this run (time budget).

**WordPress SamGuard (samguard.co):** ✅ Clean. `status: 200`, 0 `jsErrors`, 0 `pageErrors`, 0 `cspViolations`. Only benign GA/ads `failedRequests` noise (doubleclick, google analytics, LinkedIn ads — all `net::ERR_ABORTED`, expected ad-blocker/CSP-adjacent behavior, not real errors).

Trello: Elena - WordPress SamGuard ✓ complete. Elena - SamGuard Digital Plant ⚠️ left open (stale PR #309 needs review).

---

## Matrix — 07:10 (+07:00)

**Active rooms: 24 / 142 | Messages: 559** *(since 2026-08-24 08:00 +07:00)*
Full details: reports/2026-08-25/matrix-rooms-0710.md

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| PHP/internal (!oGYjbzEfphvvauBZtq) | 10:41 | namtv: "Tuần trước mày làm nhiêu hours bên James - Definitive nhỉ?" — answered same thread (30m, "Done" logged) ✅ |
| Delivery/HR (!SeUEiIwonoInzrJhQX) | 12:03 | hangdtt: "Anh ơi, Bên anh có phụ trách dự án mới: James Le Chevalier - Definitive Guide: DuongDN plan + gửi..." — acknowledged same thread ("ok chắc là mai/mốt") ✅ |

### Key updates

**James - DefinitiveGuide (client returned after pause)** — new project, LongVV assigned to work on it, WS access being set up, first task (map filter bug) in progress by end of window; LongVV noted missing SSH info to server, blocking DB check.

**Kunal - Fountain** — active dev work, no client escalations. Weekly plan posted (see Fountain section).

**Celine - OhCleo** — heavy estimate/scoping day: Playstore rejection over sexual-content tags forced hide/flag rework across mobile+BE; Celine flagged slow estimate turnaround at end of day ("cả ngày hôm nay vẫn không final được estimate... Khách đang question liệu mình có làm việc ko?" — mild client frustration, worth watching tomorrow).

**Maddy - Extreme Soft Solutions** — Carrick caught ThanhNX padding hours to a fixed 10h/week when actual project work was less; corrected same day, ThanhNX apologized and updated task log. Resolved within window ✅.

**Sandor Antal - Lyf Support** — LongVV actively handling client Q&A on account deletion/anonymization + a small fixed-cost estimate (Secret Manager task, 2h→5.5h revision), all replied same-day.

**Other:**
- Arthur - Meta-Stamp: TienND confirmed 3.5h charged last week, PhucVT confirmed 2.5h (informal, matches their own numbers — no discrepancy flagged).
- Bailey - Management: internal process question about task-log tagging/hour assignment for old Est-vs-Charge entries, being worked out internally, no client-facing issue.
- Rory Hackett - BXR App: OAuth setup question from client (Simon) — LeNH replied same day.

---

## OhCleo Slack — 07:26 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 25 (in window) | Heavy estimate/Playstore-rejection thread (see Matrix summary above) |
| #events-code | — | `channel_not_found` — known persistent issue, bot needs admin re-invite to channel (not an auth problem) |

**Tony's daily report:** present, 10:43 2026-08-24 — "reviewed and estimated tasks #213/#214/#218, fixed content-rejection character-limit bug (raised 500→5000 chars)."

Trello: Ohcleo ✓ complete.

---

## Performance — all 4 projects — 07:22 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.90 | 758ms | 2.3% (602/26019) — dominated by benign NotAuthenticated/AuthenticationFailed/InvalidToken | 18.8/min |
| MPFC | **0.49** ⚠️ | 1240ms | 1.1% (243/21577) | 15.6/min |
| Fountain | 0.99 | 103ms | 0.006% (3/54375) | 39.3/min |
| Infinity | 0.98 | 134ms | 0% (0/16757) | 12.1/min |

**OhCleo — topErrors:**
| Error | Count |
|-------|-------|
| NotAuthenticated: Authentication credentials not provided | 544 |
| AuthenticationFailed: User does not exist! | 16 |
| InvalidToken: token_not_valid | 13 |
| ValidationError: username already exists | 9 |
| ValidationError: email already exists | 6 |

**OhCleo — slowestTransactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| MediaByKeyView.get | 44264 | 226 |
| MediaByTagsView.get | 19438 | 94 |
| MediaAddTrackAPIView.post | 13070 | 2 |
| HomeMediasView.get | 3560 | 594 |
| CreatorVerificationSubmitView.post | 2201 | 1 |

**MPFC — topErrors:**
| Error | Count |
|-------|-------|
| E_WARNING: "continue" targeting switch equivalent to "break" | 188 |
| Error: Call to undefined method WP_Error::get_method() | 49 (chronic) |
| E_WARNING: mysqli_real_connect No such file or directory | 3 |
| E_WARNING: count() Parameter must be array/Countable | 2 |
| Error: Call to undefined function get_header() (404.php) | 1 |

**MPFC — slowestTransactions:**
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| author-sitemap.xml | 86695 | 3 |
| sitemap_index.xml | 48446 | 1 |
| search/*/feed/rss2/ | 21722 | 1 |
| search/download/feed/rss2/ | 19611 | 1 |
| membermouse processOrder.php | 18673 | 2 |

**Fountain — topErrors:** ArgumentError wrong-args (3), InvalidAuthenticityToken CSRF (2). **Slowest:** promo_codes/index 4.2s (1 call), paypals/authorize_order 2.2s (1 call), payment_intents/create 1.9s (52 calls).

**Infinity — topErrors:** none. **Slowest:** promo_codes/index 3.0s (2 calls), paypals/authorize_order 2.6s (1 call), gifts/index 2.0s (2 calls).

MPFC apdex worsened from 0.59 (2026-08-24) to 0.49 — sitemap generation and search RSS feeds are newly/badly slow (>18s each), on top of the chronic `WP_Error::get_method()` fatal. Recommend investigating sitemap plugin/cron.

---

## Arthur / Meta-Stamp — 07:32 (+07:00)

Partial check only (time budget):
- **Matrix:** TienND confirmed 3.5h charged last week, PhucVT confirmed 2.5h (informal exchange, matches).
- **Slack (Solid Code, 4 channels), GitHub PR/commit status, Workstream est/actual:** NOT checked this run — deferred given Workstream SSO outage (blocks est/actual) and time budget for the other 3 sources.

Trello: Arthur - Meta-Stamp ⚠️ left open — full 4-part check not completed this run.

---

## Upwork Memo — 2026-08-24 — 07:29 (+07:00)

⚠️ Not completed — Puppeteer navigation timeouts on all 3 hourly workrooms (Rory, Neural, Aysar) after clearing a stale orphaned Chrome lock from a prior run. Session/browser contention, not a memo-validity finding — do not treat as invalid-memo alert.

Trello: no dedicated Upwork Memo item on this board; Rory/Aysar items left open per their own gates above.

---

## Reminders — 07:31 (+07:00)

Not run — depends on Workstream/Sheets hours data, unavailable this run (see Sheets/Workstream section). No reminder sent (default behavior — `--send-reminder` not passed regardless).

---

## Trello — progress/mail — 07:32 (+07:00)

**Check progress — completed this run:** Rory, Franc, Marcel, MPFC, Raymond, Neural Contract, Andrew Taraba, Colin, Ohcleo, Elena - WordPress SamGuard.

**Check progress — left open:** Maddy (WS down), John Yi (WS down), James Diamond (WS down), Aysar (missing Carrick MPDM update + WS down), Elliott (WS down), Elena - SamGuard Digital Plant (stale PR #309), Bailey (WS down), Fountain (WS down, Parts 2-3), Rebecca (WS down), Philip (MSTeams script timeout), Arthur - Meta-Stamp (partial check only), Blair Brown (WS down).

**Check mail:** DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete (all 6 accounts scanned).

---

## Unresolved / follow-up needed

1. Workstream SSO has now failed on 6+ dates (07-26, 07-31, 08-01, 08-15, 08-22, 08-25) — this needs a real fix, not another retry. Suggest checking with IT/admin on the Keycloak SSO flow itself outside cron hours.
2. PR #309 on Elena repo (14 days stale) needs a human look — did not auto-merge.
3. MPFC apdex regression 0.59→0.49 with new 18-87s sitemap/RSS slow transactions — worth a dedicated look, may be cron/sitemap-regeneration related.
4. Baamboozle Aysar MPDM channel had zero Carrick updates across a full day+ window — confirm whether this is a reporting gap or Carrick was on a task that didn't require the update today.
5. Upwork memo validation and Philip MSTeams check did not complete this run (browser automation timeouts) — recommend a standalone `/daily-report upwork-memo` and `/daily-report trello progress philip` recheck later today.
