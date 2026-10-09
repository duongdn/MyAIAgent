# Daily Report — 2026-07-08 (Wednesday)

**Run:** 08:39–09:15 (+07:00), interactive
**Window:** 2026-07-07 10:13 → 2026-07-08 08:39 (+07:00)
**Leave plan:** LongVV pending half-day leave 07-08; KhanhHH pending full-day leave 07-09. Neither applies to yesterday (07-07), the reporting day for task-log checks.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack — RDC/Franc | dmetiner sent 3 direct technical follow-ups to Carrick 20:22-20:26 (07-07), still unanswered ~12h later |
| 2 | Slack/Matrix — OhCleo/Celine | Client asked if creator emails actually sent (13:58 07-07, restated with growing concern through 18:58/20:43) — still unanswered by Tony |
| 3 | Slack/Matrix — Maddy/Xtreme | 5 open Bitbucket PRs (xtreme-web/rms) with unaddressed Critical/High findings, 6-20 days aging, incl. PR #481 where LongVV's committed same-day fix (promised in Matrix 07-07) did not happen; Kai's daily progress report also missing for 07-07 |
| 4 | Elena — WordPress SamGuard | 3 real CSP violations blocking GA4 analytics endpoints (`analytics.google.com`, `stats.g.doubleclick.net`) — needs user decision before DB/wp-admin change |
| 5 | ~~Sheets — KhanhHH~~ | **RETRACTED 09:26** — sheets-only figure (2h) was incomplete; live Workstream shows real total 8h (Radio Data Center 6h + Generator 2h). Normal day. |
| 6 | ~~Sheets — LeNH~~ | **RETRACTED 10:2x** — 8h found in Portfolio - James Diamond (Workstream), missed twice by flaky per-project fetch. Not an alert. |
| 7 | Matrix — Bailey BA/QC | Real overbudget tasks (Nam's task, a ~60h-over "mobile picking" task) not proactively flagged by BA — new expectation set to report overbudget immediately |
| 8 | ~~Slack — Baamboozle/Aysar~~ | **RETRACTED 09:26** — KhanhHH had 0h on Baamboozle 07-07 (worked Radio Data Center + Generator instead), so no update was expected that day. Not a miss. |
| 10 | Performance — OhCleo (New Relic, added 14:29) | `ProgrammingError: column app_user.password_reset_code_expires_at does not exist` × 6 in 24h — likely missing DB migration on prod, breaks password reset |
| 11 | Performance — OhCleo (New Relic, added 14:29) | 3 core endpoints (MediaRecommendsView, HomeMediasView, MediaByKeyView) averaging 15-21s response time over hundreds of calls/day — real backend bottleneck |

**Today (Wed 07-08):** LongVV pending half-day leave; KhanhHH pending full-day leave tomorrow (07-09). No one absent today per current data.

---

## Email — all — 08:39 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | 0 | none |
| carrick@nustechnology.com | 7 | 0 | none |
| nick@nustechnology.com | 2 | 0 | Weekly Meeting with Devs 21:30-22:30 |
| rick@nustechnology.com | 35 | 0 | OmniGPT Daily Sync 10:30, HEAL Meeting 12:30 |
| kai@nustechnology.com | 4 | 0 | none |
| ken@nustechnology.com | 80 | 0 | Daily Standup 08:30, Bi-weekly Retro 09:00, Daily Standup 09:00, Tech Talks 09:00 |
| vuongtrancr@gmail.com | 2 | 0 | — |
| dnduongus@gmail.com | 29 | 0 | — |
| davidztv19@gmail.com | 2 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 1 | 0 | — |

All 10 accounts scanned live, no auth issues. Content is routine engineering traffic (GitHub/Rollbar/Redmine/Jira digests, TestFlight builds) plus 3 LongVV leave requests and personal mail. No unanswered direct customer/client ask found in any account this window.

**Notable:** rick@ FirstProject staging had a burst of errors 03:14-03:15 (known ongoing noise pattern, no full-outage signal). carrick@ Socalautowraps Rollbar had 1 real error occurrence. ken@ received an automated Supabase dependency-scan notice (informational only).

Trello: Check mail — all 6 Zoho items (DuongDn, Carrick, Nick, Rick, Kai, Ken) ✓ complete. Card marked done.

---

## Slack [all except OhCleo] — 08:46 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 9 | QA feedback thread (internal, not alert). No Aysar daily update posted yet for 07-07's work (last one 07-06 17:38). |
| RDC - FM Monitoring | 17 | Mostly automated bot posts. Real thread: dmetiner ↔ Carrick unanswered — see Alert #1. |
| Swift Studio | 0 | No activity. |
| Xtreme Soft Solutions | 3 | Internal QA DM to Kai (unanswered ~19h, informational). Kai's daily progress post missing for 07-07 — see Alert #3. |
| SAM GUARD - Mobile | 12 | Automated HubSpot lead notifications only. |
| Global Grazing Services | 0 | #maintenance silent, normal. |
| Amazing Meds | 0 | Quiet, no complaints. |
| Generator | 0 | Quiet in-window. |
| LegalAtoms | 0 | No Nick-specific mentions. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | Quiet since 06-26. |
| Equanimity | 0 | Quiet in-window. |
| SoCal Auto Wraps | — | Dropped, no Trello item. |
| Aigile Dev | 1 | Automated Sentry "all clear" bot post. |

### ⚠️ Franc/RDC — unanswered (Alert #1)
Channel `all-rdc-fm-monitoring`. dmetiner asked Carrick 3 direct follow-up questions 20:22-20:26 (07-07):
> 20:22 — "[Carrick] thank you for identifying and fixing both problems. For the Munich device, are these folders tracked by Git and can be distributed to any other device if we want?... is Munich device using it's own branch?..."
> 20:23 — "Yes it is also working for me at the moment. Did you change something regarding the plugin?"
> 20:26 — "perfect, thank you! ... Do we need to reboot the whole RPi manually when this happens in Istanbul? Will rebooting fix it?"

No reply from Carrick as of 08:46 (~12h later).

Trello: John Yi, Rory, Elliott, MPFC, Marcel, Raymond-LegalAtoms, Bailey, Rebecca, Colin ✓ complete. **Aysar, Franc ⚠️ left incomplete.**

---

## Discord — 08:39 (+07:00)
| Server | Msgs | Key content |
|---|---|---|
| AirAgri (nusvinn) | 20 | Vinn daily report (18:04 07-07): SDS warnings/expiry fix, PR reviews #556-560, alarm-status bug fixed. Jeff Trinh daily report (17:30, 4h): History Feature done. New: bellatric02 requested a new AirAgri account for Jeremy Wu (jwu@selectharvests.com.au), posted 08:38 today — too fresh to flag, note for next check. |
| Bizurk (nuscarrick) | 0 | Quiet, normal. |

Trello: James Diamond - Vinn task ✓, Andrew Taraba ✓.

## Scrin.io — 08:39 (+07:00)
**Scrin.io (Nick / John Yi company account — 2026-07-07):** 9h53m logged (5 sessions). Project/Client fields show "No project"/"No client" (stale label). Tracks Nick, not TuanNT.

## OhCleo Slack — 08:39 (+07:00)
| Channel | Msgs | Key content |
|---|---|---|
| DM Celine Fierro | 8 | Tony's daily report (10:32 07-07): password-reset security fix, bulk-email bug, sign-up bug fixed. See Alert #2. |
| #events-code | — | Channel renamed/removed, only "features" channel exists now, 0 activity. |

Tony daily report: present (10:32).

**⚠️ Unanswered customer messages (Alert #2), verbatim:**
> 13:58 Celine: "Thanks! And can you confirm if the e-mail to creators I sent on Monday went out or if I need to redo it?"
> 18:57 Celine: "It looks like they all received this e-mail, is this correct:"
> 18:58 Celine: "So they got it when I sent it? It was just a problem in the admin? Its just that, no one has e-mailed me back, they usually do!"

No reply from Tony as of scan (~14h). Corroborated by Matrix (LongVV still clarifying as of 20:43, no reply sent).

Trello: Ohcleo ⚠️ left incomplete.

---

## Sheets [all] — 08:54 (+07:00)

Reporting date: 2026-07-07. No approved leave applicable to that day for any of the 5 devs.

| Developer | 07-07 Actual | Status |
|-----------|---------------|--------|
| LongVV | 8h (OhCleo/"Tony" — now full-time, target changed) | OK |
| PhucVT | 9h (Crystal lang/Meta-Stamp) | OK |
| TuanNT | 8h (Paturevision) | OK |
| KhanhHH | ~~2h (Generator only)~~ **8h** (Radio Data Center 6h + Generator 2h, via Workstream) | ✅ OK — corrected 09:26, see Correction section below |
| LeNH | ~~0h~~ **8h** (Portfolio - James Diamond, via Workstream) | ✅ OK — corrected 10:2x, see below |

**KhanhHH:** Original sheets-only figure (2h, Generator only) was incomplete — missed a 6h Workstream-only entry in Radio Data Center. Real total = 8h. Retracted as alert, see Correction — 09:26 section.

**LeNH — 2nd correction (10:2x), user again said "sai, tôi thấy đã đủ giờ":** The 09:5x deep-dive was itself wrong. It scanned the 4 mapped Google Sheets (Rory/Franc/Aysar/Rebecca, genuinely blank) + Workstream — but the per-project Workstream fetch for **"Portfolio - James Diamond" silently returned empty** despite real data existing, the exact transient per-project-fetch bug already documented 4+ times in memory (feedback_check_workstream_before_flagging_shortfall), now confirmed on this specific project for the first time. Direct unfiltered dump of ALL Workstream projects (bypassing the per-dev substring filter entirely) found it: **LeNH logged 8h on 07-06 AND 8h on 07-07 in James Diamond** (`james_diamond` project, weekTotal 16h). Genuinely no shortfall — retracted as alert for the 2nd time today. Root cause: `sheets-tasklog-scan.js`'s per-project loop has no retry; a single flaky fetch silently zeroes out a real project for a dev. Needs a script fix (query twice, take max) — flagged in memory, not yet patched.

## Maddy (Xtreme/Carrick-Kai-Luis) — consolidated, 08:46-09:26 (+07:00)

**1. Slack (Xtreme Soft Solutions):** 3 msgs — internal QA DM to Kai (unanswered ~19h, informational). Kai's formatted daily progress post missing 07-07 — **not an alert** (corrected 09:26: LongVV logged 0h Maddy 07-07, worked OhCleo instead, so no active dev work that day to report on).

**2. JIRA/task-log (W14, Jul 6-12):** 0h Mon/Tue/Wed, no ticket entries — consistent with #1 (no active work this week so far).

**3. Est/actual cross-check:** `maddy-jira-tasklog-check.js` — nothing to cross-check, no ticket entries this week.

**4. Bitbucket PRs (xtreme-web/rms):** 9 open, **5 with unaddressed Critical/High findings**:
- **#481** — still OPEN, still `changes_requested` (Madhuraka, unresolved refund/Xero double-post finding from 06-06). No commits since 07-02. **LongVV's committed same-day fix (Matrix promise 07-07) did not happen.**
- #509 (LIFM2-428) — Critical, 16 days, 0 replies
- #510 (LIFM2-446) — Critical, 13 days, 0 replies
- #507 (LIFM2-444) — Critical, 20 days, 0 replies
- #486 (LIFM2-436) — Madhuraka directly asked Kai to address, 0 reply since 06-06
- #513 — 1 "Important" issue, lower severity, noting only

**Verdict:** No alert driven by today's hours (nobody worked Maddy 07-07, so Slack/JIRA silence is expected). **Real, standing issue:** 5 open PRs with unaddressed Critical/High code-review findings, some 13-20 days stale, incl. a broken same-day-fix promise on #481. This is a code-quality/delivery backlog problem independent of daily hours — treat as ongoing until PRs get addressed.

Trello: Maddy - Carrick/Kai/Luis ⚠️ left incomplete (PR backlog, not report-missing).

---

## Fountain — 08:54 (+07:00)

### Part 1 — Matrix Plan
@trinhmtt, Mon 07-06 08:40:22: ViTHT 40h, ThinhT 20h, DatNT 40h => QC 24h. (DatNT continues replacing VuTQ.) Capacity 100h/wk (excl. QC).

### Part 2 — Task Log Actuals (W34)
ViTHT/ThinhT/DatNT/PhatDLT/HungPN/HaVS all 0h so far this week (early in week; task log not PM-tracked per policy, not alerted).

### Part 3 — Plan vs Actual
All devs -100% vs plan so far (early week, not flagged per policy).

### Part 4 — Capacity & Runway
NS+IP remaining: **229h across 27 tasks**. Capacity: **100h/wk**. Runway: **2.29 weeks** — unchanged vs 07-07. Broader bucket: 75 tasks, 554.8h, 5.55wk.

### Part 5 — Over-Estimate Tracking
| Task | Status | Est+CR | Actual | Over% | Trend |
|------|--------|--------|--------|-------|-------|
| #2615 | Deployed Staging | 12h | 106.75h | 789.6% | Stable |
| #2595 | Deployed Staging | 120h | 168.25h | 40.2% | Stable |
| #2735 | In-progress | 130h | 136h | 4.6% | Under threshold |
| #2624 | Dev Done | 12h | 31.25h | 160.4% | Stable |
| #2872 | In-progress | 32h | 46.25h | 44.5% | Stable |
| #2702 | In-progress | 8h | 25.5h | 218.8% | Stable |

37 tasks >20% over sheet-wide, all unchanged vs prior reports — Est vs Charged tab appears frozen since ~07-01 (no source updates from Kunal's team).

### Trello (Fountain board)
0 customer comments this window. Doing-list hard-to-release: #2813 (77d), #2921 (39d) — unchanged trend. 50 cards board-wide 5+ days inactive (backlog, not new).

Trello: Fountain ✓ complete.

---

## Elena — 08:39 (+07:00)

**PRs (Elena-SamGuard-Digital-Plant):** 0 open, nothing to merge/deploy. **Precognize (nusken):** 5 open PRs total, 0 by nusken — no action needed.

**WordPress SamGuard:** pageErrors/jsErrors none. **3 real CSP violations** — `connect-src` blocks GA4 endpoints `analytics.google.com` and `stats.g.doubleclick.net` (not in current whitelist). Fix requires SQL/wp-admin change to `wp_options.hsts_csp` — not applied, awaiting user decision (Alert #4).

Trello: Elena - SamGuard, Elena - WordPress SamGuard ⚠️ both left incomplete.

---

## Matrix — 08:52 (+07:00)

**Active rooms: 21 / 131 | Messages: 500** *(since 2026-07-07 10:13)*
Full details: reports/2026-07-08/matrix-rooms-0851.md

### Key updates

**Bailey - BA/QC — overbudget not proactively flagged (Alert #7):**
- DuongDN caught Nam's task (est 11h, actual far more, in-progress) and a "mobile picking" task ~60h over during routine review — neither raised by BA beforehand.
- New expectation: overbudget items must be reported immediately going forward.

**Celine - OhCleo:** Corroborates Alert #2 — client asked if emails sent, LongVV still clarifying as of 20:43, no reply sent yet.

**Maddy - Xtreme:** Corroborates Alert #3 — DuongDN pushed LongVV on stale PR #481, "clean up that evening" commitment — confirmed NOT done (see Bitbucket check above).

**Bailey — dev performance:** DuongDN + minhtv flagged a specific dev's slow ramp-up and repeated est overruns on a Bailey mobile task. Open question on policy — no decision made.

**Francesca - Radio Data Center:** Team assessing client-requested MPX-fail reboot script; findings not yet reported back to client.

**Other:**
- James Diamond: PhucVT's hours review still pending (tiennd to follow up).
- Delivery/Resource Arrangement: 5 same-day leave notes processed normally; LongVV's remote-work request declined (release day).
- Elena Active Alerts: internal bug resolved as "not a bug," no client impact.
- PHP Projects: contract-closure notice from Marcel F., resolved.
- Fountain (Kunal), Arthur-Meta-Stamp: active, covered by dedicated pieces (Arthur not run today — on-demand only).

---

## Upwork — 08:52 (+07:00)

| Workroom | Upwork hours (week) | Task log hours | Match? |
|----------|---------------------|-----------------|--------|
| Rory (LeNH) | 0h | 0h | ✓ |
| Aysar (LeNH tracker) | 4h (Mon only) | 0h (W32 Mon-Wed blank) | ⚠️ logging lag, not flagged — 2.7 days into week |
| Bailey-DuongDN | 0h | 0h expected | ✓ |
| Neural Contract - Test Job | 0h timesheet | messages-only | ✓ resolved thread |

Neural Contract: client (Michael) said "Shall do." to a referral ask, Carrick replied "Thank you so much!" — no unanswered client message.

Trello: Neural Contract ✓ complete.

---

## Philip (MS Teams) — 08:59 (+07:00)
Contact verified: Philip Briggs / (External) Six Star Rentals / pbriggs@sixstarrentals.com.au. Last message still our own Jul 1 outreach — no new customer activity since 07-06. Not a customer-ask gate violation (it's our own unanswered outreach, not an unanswered ask from Philip).

Trello: Philip ✓ complete.

---

## Reminders — 08:39 (+07:00)
- **LeNH:** no reminder needed — 8h confirmed in James Diamond, false alarm cleared (was never sent anyway, print-only).
- KhanhHH: 2h logged (not 0h) — does not trigger reminder threshold, though flagged separately above as a shortfall.
- PhucVT, TuanNT, LongVV: skipped, all have hours.

---

## Trello — Check Progress summary (board O83pAyqb)

21 items total: **14 ✓ complete**, **7 ⚠️ open** (Maddy, Aysar, Franc, Elena-SamGuard, Elena-WordPress SamGuard, Philip→✓ now 6 open, Ohcleo). Corrected count: **15 ✓, 6 ⚠️ open** (Maddy, Aysar, Franc, Elena-SamGuard, Elena-WordPress, Ohcleo). Arthur-Meta-Stamp intentionally untouched (on-demand piece, not part of full run).
Card: https://trello.com/c/iM1Qg7x5/1110-check-progress
Check mail: https://trello.com/c/7mixHtpq/1111-check-mail — 6/6 ✓, card marked done.

---

## Re-check — 09:19 (+07:00)

Re-ran all 6 still-open items (~30min after original report). No resolving activity found — all confirmed still genuinely open, not data gaps.

| Item | Result | Details |
|------|--------|---------|
| Franc | ○ still incomplete | RDC channel: dmetiner's 13:22-13:26 UTC (20:22-20:26+07) 3 questions still have 0 Carrick reply. Re-queried `search.messages` for Carrick + broad channel history, nothing after original scan. |
| Aysar | ○ still incomplete | Baamboozle workspace: 0 new messages workspace-wide since 07-07 (search.messages `after:2026-07-07`). No Aysar daily update posted yet. |
| Maddy | ○ still incomplete | Xtreme Slack: 0 new messages since 07-07 (Kai's report still missing). Bitbucket PR #481: still OPEN, still `changes_requested`, last commit unchanged (07-02) — LongVV's promised same-day fix still not pushed. |
| Elena - SamGuard Digital Plant | ○ still incomplete | GitHub: still 0 open PRs on Elena-SamGuard-Digital-Plant, nothing to merge/deploy. No new build/API/maxGraph review action taken this recheck. |
| Elena - WordPress SamGuard | ○ still incomplete | Live `curl -sI https://www.samguard.co/` — CSP `connect-src` still excludes `analytics.google.com`/`stats.g.doubleclick.net`. Fix requires wp-admin change, awaiting user decision (per feedback_elena_consolidated: DB-only edits get silently overwritten by cached `.htaccess` unless applied via wp-admin). |
| Ohcleo | ○ still incomplete | `slack-fetch-ohcleo.js --since 08:30` — 0 new DM messages from Tony to Celine. Client's creator-email question still unanswered. |

**Cleared:** none.
**Still open:** Franc, Aysar, Maddy, Elena - SamGuard Digital Plant, Elena - WordPress SamGuard, Ohcleo. (Arthur - Meta-Stamp intentionally untouched — on-demand only.)

Trello Check Progress: unchanged, 15/21 complete, 6 open (same as original report).

---

## Correction — 09:26 (+07:00)

User challenged Aysar and Maddy "report missing" framing — correctly, per existing memory ([[feedback_aysar_consolidated]], [[feedback_kai_daily_report_gate]]) that a missing report is only an alert if there was actual work that day. Verified via live Workstream:

**Aysar:** KhanhHH's `2026-07-07` hours = Radio Data Center 6h + Generator 2h = 8h. **Zero hours on Baamboozle/Aysar.** No Aysar work happened yesterday → no update to post → not a miss. Corrected from ⚠️ alert to ✓. **Trello Aysar item marked complete.**

Side-finding: original report's KhanhHH sheets-only figure (2h, Generator only) was incomplete — the real total via Workstream was 8h all along (Radio Data Center 6h missed). The "KhanhHH shortfall" alert in the ALERTS SUMMARY (row 5) is retracted — she had a normal 8h day.

**Maddy:** Workstream shows LongVV logged 7h on Maddy Monday (07-06), **0h Tuesday (07-07)** — he worked OhCleo instead that day. No active Maddy dev work 07-07 → Kai's "report missing" is not a valid alert for that day, same logic as Aysar. **Corrected — dropping "Kai's report missing" as an alert driver.**

However Maddy stays **○ incomplete** on a different basis: the 5 open Bitbucket PRs with unaddressed Critical/High findings (incl. #481, aging since Jun 6, LongVV's Matrix-promised same-day fix not delivered) are a standing code-quality issue independent of any single day's hours — this is an "our team" issue per alert-classification policy, not tied to yesterday's activity.

**Retracted from ALERTS SUMMARY:** #5 (KhanhHH shortfall — false, real total 8h), #8 (Aysar no update — false, zero work that day, not a miss). **Kept:** Franc, Ohcleo, Elena CSP, Maddy PR backlog, Bailey BA/QC.

Memory updated (both locations) to reinforce: always cross-check Workstream/sheet hours for the specific dev before flagging a missing report/update as an alert.

**Final Check Progress state: 16/21 complete, 5 open** (Maddy — PR backlog only, Franc, Elena-SamGuard, Elena-WordPress SamGuard, Ohcleo).

---

## Sheets [all] — re-run for TODAY (07-08) — 14:03 (+07:00)

Leave check re-verified for 07-08 (all 5 devs): only LongVV has a leave entry, status **pending** (not approved) → treated as WORKING, not leave. Reason: "Sáng ba em mổ, nên em cần phải ở lại bệnh viện ạ" (father's surgery this morning).

| Developer | 07-08 so far (14:03) | Status |
|-----------|----------------------|--------|
| LongVV | 0h | Day in progress — not an alert yet. Unapproved half-day leave request pending for this morning (father's surgery); if it gets approved, adjust target to half-day. |
| PhucVT | 0h | Day in progress — not an alert yet. |
| TuanNT | 0h | Day in progress — not an alert yet. |
| KhanhHH | 0h | Day in progress — not an alert yet. |
| LeNH | 0h | Day in progress — not an alert yet. |

All 5 verified via isolated per-dev `sheets-tasklog-scan.js` runs AND a separate unfiltered all-project Workstream dump (cross-check per [[feedback_check_workstream_before_flagging_shortfall]]) — both agree: genuinely 0h logged for 07-08 across all 13 sheets + 19 live Workstream projects (20th, "Others", 403s as usual). Not flagging as shortfall: it's 14:03, workday not over, devs typically log end-of-day.

### ⚠️ NEW — Workstream "needs review" check (first run since feature added today)

**Correction 14:2x:** initial version of this section guessed reviewer = project Manager/Tech Lead role — wrong, per user correction. Real reviewer comes from the `isReviewer` flag on `GET /pinfo/projects/{id}` (the project's "Info" page → "Review Charged Hours" section), which is independently assignable to any Developer, not tied to the Manager/Tech Lead role. Fountain is excluded from this check entirely per user instruction (has its own internal QC flow).

Scanned all live Workstream projects' current week (07-06→07-12) for `reviewStatus: Pending` rows (charged hours flagged for review, unresolved), reviewer sourced from `/pinfo/projects/{id}`:

| Reviewer | Dev | Project | Pending charged hours | Tasks | Dates |
|----------|-----|---------|----------------------|-------|-------|
| **LeNH** | KhanhHH | Radio Data Center | 2:00 | Setup and study project | 07-06 |
| **PhucVT** | LeNH | Portfolio - James Diamond | 16:00 (7 tasks) | Traccar investigation, SDS warnings, CloudWatch disk alarm, PR reviews #556-560, alarm-status fix, Dynamic Property forms | 07-06, 07-07 |
| **TienND** (manual override — Workstream's own `isReviewer` checkbox wrongly flags DuongDN via Tech Lead auto-rule; user confirmed real reviewer is TienND) | PhucVT | Crystal lang | 9:00 | Meta-Stamp project tasks | 07-07 |

Fountain Greetings also had ~15h pending (PhatDLT/HungPN/DatNT) — **excluded per user instruction**, not shown/alerted.

**None of the above are DuongDN's own action items** — LeNH reviews Radio Data Center, PhucVT reviews James Diamond, TienND reviews Crystal lang. Retracting the earlier "18h pending your review" framing — that was based on the wrong reviewer-derivation logic. These are informational (visibility that reviews are backlogged) rather than a personal action item.

**ALERTS SUMMARY #9 retracted/corrected** — see addendum below.

---

## ⚠️ ALERTS SUMMARY — addendum (corrected 14:2x)

| # | Source | Alert |
|---|--------|-------|
| ~~9~~ | ~~Workstream — needs review~~ | **RETRACTED/CORRECTED** — original framing said 18h pending DuongDN's own review; reviewer logic was wrong (guessed Manager/Tech Lead instead of the real `isReviewer` flag). Corrected: Radio Data Center 2h pending LeNH's review, James Diamond 16h pending PhucVT's review, Crystal lang 9h pending TienND's review (manual override, system checkbox wrong). None are DuongDN's own action item. Fountain excluded per user instruction. Not added as a numbered alert — informational only. |

---

## Performance ohcleo — 14:29 (+07:00)

New Relic APM, OhCleo backend API (prod, `ohcleo-backend-api`), window: last 24h (2026-07-07 14:29 → 2026-07-08 14:29).

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.91 | 1373ms | 2.14% (650/30431) — mostly NotAuthenticated (603, benign — public endpoints w/o auth) | 21.1/min |

**⚠️ Real bug found — DB migration issue:** `django.db.utils.ProgrammingError` × 6 — `column app_user.password_reset_code_expires_at does not exist`. This breaks password reset for affected users (500 error). Looks like a missing DB migration on prod. Needs a fix, not informational.

**Slow transactions (>5s avg, high call volume — not one-off):**
| Endpoint | Avg | Calls (24h) |
|----------|-----|--------------|
| `MediaRecommendsView.get` | 21.1s | 766 |
| `HomeMediasView.get` | 20.0s | 678 |
| `MediaByKeyView.get` | 15.7s | 463 |
| `OnboardingMediasView.post` | 6.6s | 4 |
| `MultiCategoryMediaView.get` | 6.1s | 1 |

The first 3 are core browse/home endpoints hit hundreds of times/day at 15-21s avg — likely a real backend bottleneck (N+1 query, missing index, or slow recommendation logic), not an edge case.

**Other errors (minor):** AuthenticationFailed "User does not exist" ×22, InvalidToken ×15, AuthenticationFailed "Passwords don't match" ×4 — all normal client-side auth noise.

No Trello item gates this piece yet (informational-only, Piece 14 first real run).
