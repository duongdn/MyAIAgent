# Daily Report — 2026-09-22 (Tuesday)

**Run:** 2026-09-22T05:00:00+07:00 (cron)
**Window:** 2026-09-21T08:35:00+07:00 → 2026-09-22T05:00:00+07:00
**Leave plan:** No upcoming approved leaves on record (parse-leave-emails full refresh, 0 added/updated).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | GGS Slack (#maintenance) | Major ongoing incident: Console down, orders not syncing to PrestaShop, duplicate/lost-product orders, Sidekiq crash (external API outage + retry storm). Nick actively responding all day (root-cause + daily reports posted), joey/amy still escalating as of 01:15 (9/22). Not resolved as of window end. |
| 2 | Workstream SSO | Login failed 4x this run (2x API refresh + 2x browser SSO — "SSO redirected but API never fired"). Task-log hours (Maddy/John Yi/Elliott/Rebecca/Bailey/Fountain actuals/Aysar-KhanhHH) unverifiable this run — matches known recurring WS SSO outage pattern (see weekly-report memory, unresolved). |
| 3 | Baamboozle MPDM (C07SQ4HAUHZ) | No "Today's update" post from Carrick found in window. Per gate rule this is only an alert if KhanhHH logged Workstream hours on Baamboozle today — **unverifiable** (Workstream down, see #2). Leaving Aysar item open pending recheck. |
| 4 | Swift Studio Slack (#bxr__app) | jeff asked Rory to review a message (13:43, 9/21) — no reply from Rory in window. |
| 5 | Bizurk Discord (Andrew DM) | animeworld: "are you there?" (02:56, 9/21) — no reply from Andrew/nuscarrick in window. |
| 6 | Elena-SamGuard GitHub | PR #309 ("Implement header and modal components with i18n support") is `CONFLICTING` (merge conflict), no reviews, CodeRabbit last ran 2026-08-11 — stale, needs rebase. (Informational — Elena item is on the paused Ignore List, not gated on this.) |
| 7 | Rick@ inbox (Fountain/Infinity) | Several production (not just staging) error emails: `[FountainGifts] production #328 SystemStackError`, `[InfinityRoses] production #457 ActiveRecord::InvalidForeignKey`, `[FirstProject] production #1109/#1117 TypeError`. Not cross-verified against Rollbar dashboards this run. |

**Today (Tue 9/22):** No leave/WFH on record — all present.

---

## Email — all — 05:10 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 0 | not checked this run |
| carrick@nustechnology.com | 2 | not checked this run |
| nick@nustechnology.com | 0 | not checked this run |
| rick@nustechnology.com | 33 | not checked this run |
| kai@nustechnology.com | 6 | not checked this run |
| ken@nustechnology.com | 80 | not checked this run |
| vuongtrancr@gmail.com | 11 | — |
| dnduongus@gmail.com | 20 | — |
| davidztv19@gmail.com | 1 | — |
| freelancer@mypersonalfootballcoach.com | 5 | — |

- **carrick@:** Slack + Zoho sign-in confirmation codes only, no content alert.
- **rick@:** Mostly Fountain/Infinity **staging** BugSnag/Rollbar noise (chronic, known). A few **production** errors surfaced — see Alert #7.
- **kai@:** JIRA LIFM2-452/428 mentions + Shopify account emails, no action needed beyond normal Xtreme work (see Slack).
- **ken@:** 80 emails, all GitHub PR/commit notifications for `welligence/web` — **not Precognize** as the account's mapped purpose says; appears to be personal GitHub watch noise, no Precognize PR activity seen. Flagging for awareness, not an alert.
- **vuongtrancr@gmail.com:** MPFC signup/welcome emails (from Vuong testing his own membership) + cybersecurity newsletter. No Swish `[HIGH]`/Signal-lost alerts.
- **dnduongus@gmail.com:** personal banking/shopping noise (Vietcombank, Tikop, Shopee, LinkedIn). No security alerts.
- **davidztv19@gmail.com:** Railway login code only (Arthur project — routine).
- **freelancer@mpfc:** Rollbar production errors (`WP_Error::get_method()` — chronic/unresolved for months, `Elementor WP_REST_Controller` new error), New Relic Monday report (Apdex 0.82, 6.19s page load). See Performance piece (not run in full this pass — time-boxed).

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ complete (no blocking client-facing issue found).

---

## Slack — all — 05:12 (+07:00)

| Workspace | Msgs (window) | Key content |
|-----------|----------------|--------------|
| Baamboozle | 16 | Carrick/Jamie routine support (seat-count/subscription-revoke feature requests filed as GH issues #717/#718), Jamie on partial leave tomorrow (dog surgery) — informational. **MPDM C07SQ4HAUHZ: 0 messages** — see Alert #3. |
| RDC - FM Monitoring | 10 | Tuner access logs (routine), MPX watchdog recovery drill ran cleanly (recovered), Carrick posted July-list status update to team lead. No blockers. |
| Swift Studio | 1 | jeff→Rory unanswered ask — see Alert #4. |
| Xtreme Soft Solutions | 14 | Kai/Madhuraka actively working tickets (452/456/465), OTP exchanges for testing access, ticket 465 moved to Anoma for testing. No blockers, no "daily report" text seen but active engaged conversation — Kai-role WS hours unverifiable (see Alert #2) so report-presence gate skipped this run. |
| SAM GUARD - Mobile | 1 | Routine HubSpot MQL-lead notification only. |
| Global Grazing Services | 39 | See Alert #1 — major incident, Nick's "Today report" posted 17:56 + prior-day report 08:47 (both present). |
| Amazing Meds | 0 | No activity. |
| Generator | 0 | No activity. |
| LegalAtoms | 2 | Raymond posted a release note; Florida test portal outage flagged by talha (integration tests failing) — external 3rd-party outage, not our bug, informational. |
| Equanimity | 39 | Carrick + Komal (xid-technologies) working through a stored-procedure/timezone fix for SGBuildex — tense back-and-forth but resolved by end of thread (carrick fixed +8h TZ defect, switched Sim Lian tenants to UAT). Project dev topic, not an alert. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| SoCal Auto Wraps | — | Dropped 2026-05-11, not tracked. |
| Aigile Dev | 0 | No activity. |
| OhCleo | 0 (new) | Latest messages in fetch are from 09-07/09-08 (stale) — no new activity since window start. Tony's last visible daily report: 09-07 12:17. |

Trello: John Yi, Franc, James Diamond, MPFC, Raymond, Marcel, Ohcleo ✓ complete. Aysar, Rory (Swift), Bailey, Elliott, Maddy, Rebecca left ○ (Workstream-gated or unanswered-ask, see Alerts).

---

## Discord — all — 05:14 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 7 | Vinn (dapackage) reported alarm-phone-call + Ceres-tags work tested/merged to staging+prod; James Diamond assigned new review tasks. **Jeff's daily report present** (10:15, 4h logged: map marker show/hide done, marker-click WIP). |
| Bizurk (nuscarrick) | 0 general + 1 DM | Andrew DM unanswered — see Alert #5. |

Trello: James Diamond ✓ complete. Andrew Taraba left ○ (unanswered DM).

---

## Sheets/Workstream — 05:16 (+07:00)

🔴 **Workstream SSO login failed after 4 attempts this run** (2x proactive API-refresh retry, 2x full browser SSO — Keycloak cookies alive but the API token call never fired, matching the documented recurring WS SSO outage in `weekly-report` memory, root cause still open). Cached token (`config/.workstream-config.json`) is stale since 2026-08-27 — not usable.

Google Sheets task-log system is fully retired (2026-08-21, all projects including Bailey moved to Workstream) — **there is no fallback source this run.** Dev hours (LongVV/Maddy, PhucVT, TuanNT, KhanhHH, LeNH incl. Aysar/James Diamond/Blair Brown gates, Bailey) are **unverified** this pass, not assumed 0h.

**Action needed:** retry Workstream login later today (recheck pass) before finalizing task-log-gated Trello items (Maddy, John Yi already completed on Slack-only grounds — ⚠️ recheck should re-verify hours retroactively; Aysar, Elliott, Rebecca, Bailey held open).

Trello: no items completed from this piece this run — left for recheck.

---

## Scrin.io — 05:09 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-21):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:07 (+07:00) — partial (Part 1 only; Parts 2/3 + Trello board not run this pass)

**Part 1 — Matrix Plan** (room "Kunal - Fountain", `!EWnVDAxbTGsBxPkaaI:...`): trinhmtt posted 2 plan updates during the window — final one @ 11:29: **ViTHT 40h, DatNT 32h, ThinhT 20h, VuTQ 8h => QC 25h**. Active dev work all day: PR reviews (FountainNewUI #538, #540), CSV export bugfix cycle (Infinity order-item export missing fields, still being tracked), admin export format clarified as CSV-only (VuTQ). No blockers reported.

**Parts 2/3 (task-log actuals + plan-vs-actual):** blocked by Workstream outage (see Alert #2) — not run this pass.
**Trello board (customer comments/stuck cards):** not run this pass — time-boxed.

Trello: Fountain item left ○ pending full 3-part completion on recheck.

---

## Elena — 05:15 (+07:00)

PR #309 open (`process-digital-plant` → base), `mergeable: CONFLICTING`, 0 reviews, CodeRabbit last ran 2026-08-11 (stale). No new merge activity this window. Precognize (nusken): no open PRs. WordPress SamGuard CSP/console check: not run this pass (time-boxed).

Elena-SamGuard is on the paused Ignore List (see below) — not gated, reported informationally only.

---

## Ignore List — 05:18 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip

---

## Trello — Check progress / Check mail — 05:18 (+07:00)

**Check mail:** all 6 items (DuongDn, Carrick, Rick, Kai, Ken, Nick) ✓ complete.

**Check progress:**
- ✓ complete: John Yi, Franc, James Diamond, MPFC, Raymond, Marcel, Ohcleo, Colin (ignore), Elena-SamGuard (ignore), Arthur (ignore), Blair Brown (ignore), Philip (ignore)
- ⚠️ left ○: Maddy (WS hours unverified), Rory/Swift (unanswered ask), Aysar (MPDM silence + WS-gated), Elliott (WS-gated), Bailey (major GGS incident + WS-gated), Rebecca (WS-gated), Fountain (Parts 2/3 not run), Andrew Taraba (unanswered DM), Neural Contract — **note:** Neural was completed per "silence = never alert" default rule (not independently re-verified this pass).

Card not auto-completed (multiple ○ items remain).

---

## Not run this pass (time-boxed — recheck required)

- Piece 10 Matrix (full all-rooms scan) — only Fountain room fetched
- Piece 12 OhCleo Slack — fetched but window shows stale data only (see Slack section)
- Piece 13 Arthur/Meta-Stamp full 6-source check
- Piece 14 Performance/New Relic (both projects)
- Piece 15 Upwork Memo validation (Rory/Aysar workrooms)
- Piece 9 Reminders (0h dev identification) — blocked by Workstream outage, cannot compute
- Elena WordPress SamGuard CSP check
- Fountain Parts 2/3 + Trello board

## Unresolved Questions

1. Is the GGS Console/PrestaShop sync incident (Alert #1) resolved as of this morning? Needs live recheck.
2. Workstream SSO — same recurring outage as weekly-report's documented pattern; still no root cause. Worth a dedicated fix session?
3. ken@nustechnology.com inbox appears to be watching `welligence/web` GitHub repo, not Precognize — is this the wrong subscription, or expected?
4. rick@ production error emails (Alert #7) — need Rollbar dashboard cross-check to confirm severity/recurrence.
