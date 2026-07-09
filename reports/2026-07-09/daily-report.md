# Daily Report — 2026-07-09 (Thu)

**Scan window:** 2026-07-08T14:03+07 → 2026-07-09T06:55+07
**Generated:** 2026-07-09T06:55:00+07 (cron)

---

## ⚠️ ALERTS SUMMARY

| Priority | Item | Detail |
|----------|------|--------|
| ~~🔴 HIGH~~ | ~~**Maddy — Kai no daily report**~~ | ~~0 Slack messages in Xtreme workspace all day Jul 8~~ → **WRONG, struck (09:15 recheck): Kai simply didn't work Jul 8, no report was ever expected. Retired this check entirely per user feedback, see memory.** |
| 🔴 HIGH | **Maddy — 4 PRs unaddressed** | PR #509 CRITICAL (17d), #510 CRITICAL (14d), #507 CRITICAL (21d), #481 HIGH (32d) |
| ~~🔴 HIGH~~ | ~~**Aysar — MPDM empty**~~ | ~~No Carrick "Today's update" in C07SQ4HAUHZ on Jul 8~~ → **WRONG, struck (09:15 recheck): Workstream+Sheets+Upwork all show 0h Baamboozle work Jul 7-8 (only Jul 6: 4h) — no update was expected, not a miss.** |
| 🟡 MED | **Aysar — customer bug 06:48** | skjamie25→Carrick: Vietnamese chars display broken in Baamboozle game (production) |
| 🟡 MED | **GGS/Bailey — no maintenance report** | Nick active in #général but no formal #maintenance report; Amy follow-up questions unanswered |
| 🟡 MED | **PhucVT — 0h Jul 8** | No leave on record; real, confirmed via isolated single-dev rescan too. Blocks James Diamond/Vinn. Reminder sent. |
| ~~🟡 MED~~ | ~~**TuanNT — 0h Jul 8**~~ | ~~No leave on record; real (confirmed across all 5 sheets + Workstream). Blocks John Yi + Rebecca items.~~ → **WRONG, struck (09:20 recheck): isolated single-dev scan found 8h on the Paturevision/Bailey sheet — combined multi-dev scan silently missed it (known recurring bug). John Yi + Rebecca re-completed.** |
| ~~🟡 MED~~ | ~~**LeNH — 0h Jul 8**~~ | ~~No leave on record; real. Reminder queued (print-only, not sent).~~ → **WRONG, struck. CORRECTED AGAIN 10:15 (user: "LeNH: wrong, check again") — real total is 8.58h across TWO projects: Portfolio-James Diamond 8h + Peptide Clyde 0.58h (my first correction mislabeled it as "8h on Peptide Clyde" — wrong project attribution). Verified via isolated rescan + full unfiltered all-20-project dump, both agree. No reminder sent.** |
| 🔴 HIGH | **rick@ — Fountain production alerts missed** | Email scan ran a stale dated script, reported false "0 new". Real: BugSnag SocketError/RuntimeError/ActiveStorage errors (FountainStaging), Rollbar RoutingError #80/#81 (FountainStagingBE), FirstProject production error #1054 (10x/5min). See Email section. |
| 🟡 MED | **vuongtrancr@ — Swish "Signal lost" alerts missed** | Same stale-script bug. 4x New Relic "Signal lost 10 min" (Low App Throughput) Jul 8 13:53-21:02 + Rollbar daily summary. |
| 🔴 HIGH | **MPFC — SQL injection probe on /search/** | Slowest transactions (12-14s) are `WAITFOR DELAY '0:0:15'` payloads on `/search/` — automated SQLi scanner. Apdex dropped to 0.54 (poor, <0.7 threshold). |

---

## Email [all] — 01:00 (+07:00)

~~All 10 accounts showed "0 new" below.~~ → **🔴🔴 WRONG, struck (09:40 recheck, user caught: "vô lý, check thì thấy 1 mớ email mới"). Root cause: the cron ran a dated/hardcoded-window script (`daily-email-scan-260703.js`, window frozen at `2026-07-04T05:22`) instead of using the live `daily_report.last_run` timestamp — same "no dated scan scripts" bug already documented for Sheets, now confirmed on Email too. Re-ran live IMAP against the real window (2026-07-08 14:03 → now) — real counts below, several genuine misses.**

| Account | Emails | Real findings | Calendar today |
|---------|--------|----------------|----------------|
| duongdn@nustechnology.com | ~~0 new~~ → 1 | OA timesheet report — informational | no events |
| carrick@nustechnology.com | ~~0 new~~ → 2 | Bitbucket billing notice, Snyk weekly report — informational | no events |
| nick@nustechnology.com | ~~0 new~~ → 4 | Azure DevOps PR notifications (CNA.Operations.App) — no John Yi mentions | no events |
| rick@nustechnology.com | ~~0 new, no Rollbar/BugSnag alerts~~ → **27, 🔴 REAL PRODUCTION ALERTS MISSED** | See below | no events |
| kai@nustechnology.com | ~~0 new~~ → 5 | JIRA auto-assign notices for LIFM2-450/451 — already known, no new info | no events |
| ken@nustechnology.com | ~~0 new~~ → 80 | Normal high-volume Precognize GitHub PR/Sentry noise — informational, not urgent | no events |
| vuongtrancr@gmail.com | ~~0 new~~ → 5, 🔴 **REAL ALERTS MISSED** | 4x New Relic "Signal lost for 10 minutes" (Swish, Jul 8 13:53-21:02) + Rollbar "Delayed-newform" daily summary | — |
| dnduongus@gmail.com | ~~0 new~~ → 17 | Personal newsletters/bank notices only, no security alerts | — |
| davidztv19@gmail.com (Arthur) | ~~0 new~~ → 4 | Basecamp/MongoDB/Trello notifications — informational | — |
| freelancer@mpfc.com | 0 new | (confirmed correct on recheck) | — |

**🔴 rick@ — real Fountain production alerts missed:**
- BugSnag `[FountainStaging]`: SocketError in admin/gifts#update, RuntimeError, ActiveStorage::FileNotFoundError (Jul 8, 3 separate errors)
- Rollbar `[FountainStagingBE]`: new RoutingError #80/#81, 10 occurrences in 5 min on #80
- Rollbar `[FirstProject]` **production**: 10 occurrences in 5 min, error #1054 "Minified..." (Jul 8 19:02)
- 2x Rollbar daily summaries (InfinityRoses, FountainGifts) — routine

**Trello:** Check Mail items were already marked complete based on the false "0 new" claim. Per standing policy (email content is FYI-only, only fetch failure blocks Check Mail) the Trello items themselves don't need reverting — but the missed rick@ Fountain alerts are added to ALERTS SUMMARY above and should be manually verified against current Fountain staging/production status. Check Mail card stays ✓ complete.

---

## Slack [all] — 06:55 (+07:00)

| Workspace | Msgs (since 14:03 Jul 8) | Key content |
|-----------|--------------------------|-------------|
| Baamboozle | 3 | ⚠️ skjamie25→Carrick 06:48 Jul 9: Vietnamese chars broken in game (production bug) |
| RDC - FM Monitoring | 0 | Clean |
| Swift Studio | 1 | Rory→Jeff FYI: new bug in BXR App (internal, non-critical) |
| Xtreme Soft Solutions | 0 | ~~⚠️ No Kai daily report posted on Jul 8~~ → **WRONG, struck: Kai did not work Jul 8 (confirmed by user), no report expected. Clean.** |
| SAM GUARD - Mobile | 0 | Clean |
| GLOBAL GRAZING SERVICES | 6 | ⚠️ Amy follow-up questions unanswered; Nick in #général (not #maintenance) |
| Amazing Meds | 0 | Clean |
| Generator | 0 | Clean |
| LegalAtoms | 0 | Clean |
| MyPersonalFootballCoach | 0 | Clean |
| William Bills | 0 | Clean |
| Equanimity | 0 | Clean |
| SoCal Auto Wraps | — | Dropped (Blake) |
| Aigile Dev | 0 | Clean |

**GGS detail:** Nick posted in #général at 14:54 ("Sorry I missed this, using different database and url"). Amy posted questions in #split-and-ship at 16:06 (clarification on Automated Manufacture palette) and 17:16 ("just checking if you have any updates"). Joey active at 17:36, 22:09. No #maintenance report from Nick.

**Baamboozle detail:** skjamie25 (customer) at 06:48 Jul 9: "@Carrick Good Morning, Can you check (on production) if the Vietnamese characters..." — some letters bold, some not. Production bug report, Carrick not yet seen to respond.

Trello: All alertless items ✓ complete. ~~Skipped: Aysar (MPDM empty + bug report), Bailey (no maintenance report + Amy questions), Maddy (no Kai report).~~ → **CORRECTED: Skipped: Aysar (customer bug report ONLY — MPDM empty struck, not an alert), Bailey (no maintenance report + Amy questions), Maddy (PR backlog ONLY — Kai's report struck, not an alert).**

---

## Maddy (Xtreme/Carrick-Kai-Luis) — 06:55 (+07:00)

### 1. Slack — Xtreme Soft Solutions
~~⚠️ **0 messages** from Kai in Xtreme workspace on Jul 8 (full day). No daily progress report posted.~~ → **WRONG, struck: Kai did not work that day (confirmed by user), no report was ever expected. This check is retired — see memory, 3rd repeat of this exact false positive.**

### 2. JIRA tickets (recently updated)
| Ticket | Status | Assignee | Est | Spent | Note |
|--------|--------|----------|-----|-------|------|
| LIFM2-447 | In Progress | Kai | 4.0h | 4.0h | Still in progress = over-running estimate |
| LIFM2-428 | Testing - Anoma | Kai | 44.0h | 40.8h | PR #509 has CRITICAL bug (17d unaddressed) |
| LIFM2-446 | Review | Kai | 12.0h | 12.0h | PR #510 has CRITICAL bug (14d unaddressed) |
| LIFM2-409 | Review | Kai | 113.3h | 108.3h | PR #481 has HIGH bug (32d unaddressed) |
| LIFM2-449 | To Do | Kai | — | 0h | New: Changes to Listed - Consign tab |
| LIFM2-450 | To Do | Kai | — | 0h | New: Buy offer update change |
| LIFM2-451 | To Do | Kai | — | 0h | New: Grid changes in Con-Listing |
| LIFM2-448 | Ready to deploy | Madhuraka | — | 0.5h | Change product link on email |

### 3. Est/Actual — JIRA tasklog
- W14 Google Sheet: 0 entries (no hours logged this week)
- LIFM2-447: spent=estimate (4h) while still In Progress → overrun
- LIFM2-428: 40.8h/44.0h spent (92.7%) — now in Testing with CRITICAL PR bug

### 4. Bitbucket PRs — xtreme-web/rms
9 open PRs. **Critical unaddressed review findings:**

| PR | Ticket | Age | Finding | Replies |
|----|--------|-----|---------|---------|
| #481 | LIFM2-409 | 81d | HIGH — Xero refund double-posting (Madhuraka manual) | 0 |
| #507 | LIFM2-444 | 21d | CRITICAL — ListingPriceUpdate model (Codex Review) | 0 |
| #509 | LIFM2-428 | 17d | CRITICAL — Product.php:44 cert-template selection (Codex Review) | 0 |
| #510 | LIFM2-446 | 14d | CRITICAL — ProductQuo model (Codex Review) | 0 |
| #513 | hotfix/payout | 9d | No critical issues (Codex Review) | 0 |
| #193 | LIFM2-259 | 483d | Very old (2025-03-13), still open | — |

Also open: #485 (71d), #486 (71d), #235 on hold (1y+).

**Comment check (09:35 recheck, user asked "no new comments at all?"):** confirmed via Bitbucket API — the 4 PRs above have genuinely **zero developer replies to the Codex Review bot's findings** (only the bot's original comment exists: #509 posted Jun 22, #510 Jun 25, #507 Jun 18, #481's client comment Jun 6). But this is NOT the same as Kai being totally silent — his JIRA ticket **LIFM2-428 got a real new comment Jul 7 14:29+07** (test instructions for RMS gift-card-style flow), so he is actively working that ticket. The alert is specifically "PR review findings unaddressed," not "Kai unresponsive" — LIFM2-447/446 have zero ticket comments ever (never discussed), LIFM2-409 last commented Jun 26 (Madhuraka "Proceed", 13d silence).

**Verdict: ⚠️ ALERT**
- ~~Kai posted NO daily report on Jul 8 (full day silence)~~ → **WRONG, struck: he didn't work that day, no report expected.**
- 4 PRs with Critical/High unresolved findings (oldest 32+ days) — confirmed zero dev replies to the automated review comments, this part stands
- LIFM2-447 at estimate while still In Progress (overrun)
- 3 new tickets (449/450/451) with no estimates

Trello: Maddy item ⚠️ SKIPPED — for the PR backlog only (Kai's report struck above, was never a valid reason).

---

## OhCleo Slack — 06:55 (+07:00)

Last message in OhCleo DM: **2026-06-26T11:22** (LongVV/"Tony" daily report, Jun 26). No new messages since then (12+ days quiet). LongVV is full-time on OhCleo per arrangement from 2026-07-07.

Trello: OhCleo ✓ complete (no new alerts, quiet is expected).

---

## Discord [all] — 01:30 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | found | ✓ Vinn daily report + Jeff daily report found |
| Bizurk | nuscarrick | 0 | Silent (normal) |

Trello: James Diamond (Vinn) ✓ complete. Andrew Taraba ✓ complete.

---

## Scrin.io — 01:30 (+07:00)

~~Nick: **8h 18m** on Jul 8 ✓ (Normal).~~ → **CORRECTED (09:25, user feedback): raw Project/Client tag = "No project"/"No client" for all 498 min — this is generic tracked time, NOT attributed to John Yi. We haven't done John Yi work in a long time; do not imply this figure validates any John Yi activity. Scrin.io tracks Nick (Global Grazing), not tied to a specific client project on this data.

---

## Sheets — All devs — 01:30 (+07:00) — SUPERSEDED, see "Re-check" section below for real numbers

~~⚠️ **Workstream SSO unavailable in cron mode** — all devs show 0h. This is the recurring cron login failure pattern (seen Jul 1-8). Sheets-only view, may be false alert. Recheck needed with interactive Workstream login.~~

~~| Dev | Sheets | Workstream | Notes |~~
~~|-----|--------|------------|-------|~~
~~| LongVV | 0h | unavailable | Full-time OhCleo — likely logged in WS |~~
~~| PhucVT | 0h | unavailable | Check WS manually |~~
~~| TuanNT | 0h | unavailable | Check WS manually |~~
~~| KhanhHH | 0h | unavailable | Leave request pending (unapproved) |~~
~~| LeNH | 0h | unavailable | Check WS manually |~~

→ **This whole table was a placeholder (Workstream login just failed in cron, not actually unavailable). Real, verified numbers — after fixing login AND after catching a 2nd combined-scan bug that missed TuanNT/LeNH's actual hours — are in the "Re-check" section further down: LongVV 4h (leave), PhucVT 0h (real, reminder sent), TuanNT 8h (Paturevision), KhanhHH 1.5h (2 projects: Peptide Clyde + ETZ-Wathaga), LeNH 8.58h (2 projects: Portfolio-James Diamond 8h + Peptide Clyde 0.58h). Do not read this table as current.**

**VietPH**: Resigned 2026-06-30 — not scanned.

~~Trello: All developer gate items cannot be confirmed. Recommend interactive recheck.~~ → **Resolved in "Re-check" section: James Diamond/Vinn stays incomplete (PhucVT real 0h); John Yi + Rebecca re-completed (TuanNT's 0h was a scan bug, real=8h).**

---

## Upwork — 01:30 (+07:00)

| Workroom | Status |
|----------|--------|
| ~~Rory (carrick)~~ | ~~Session expired — headless re-login failed (CAPTCHA/2FA)~~ → **WRONG, struck (09:45, user caught): stale claim, never rechecked. carrick's session was refreshed successfully at 08:37 via visible-browser login (`DISPLAY=:1 upwork-login.js --login`) — already authenticated, no CAPTCHA hit this time.** |
| ~~Neural Contract (carrick)~~ | ~~Session expired~~ → **Same correction — carrick session is valid.** |
| ~~Aysar (david2)~~ | ~~No saved session~~ → **WRONG, struck: checked live via visible browser, david2 already authenticated, session valid.** |

**🔴 Standing rule going forward (user, 09:45): when an Upwork/any-login session is actually expired, do NOT just print "session expired, headless re-login failed" as passive status text. Open a VISIBLE browser (DISPLAY=:1, same pattern as Matrix) so the user can log in directly, and if that still doesn't resolve it, the item goes in ALERTS SUMMARY as a real alert — not a quiet table row.**

---

## Fountain (5-part check) — 01:30 (+07:00)

### Part 1 — Matrix weekly plan
~~⚠️ **UNAVAILABLE** — Matrix token expired (`M_UNKNOWN_TOKEN`). Browser SSO required for refresh (unavailable in cron).~~

→ **SUPERSEDED (09:05 recheck): Matrix fixed via visible-browser SSO. Re-fetched Kunal-Fountain room — no new plan posted since Jul 6 (weekly plan, not daily), so the last known plan below stands, now confirmed current: ViTHT 40h + ThinhT 20h + DatNT 40h = 100h/wk capacity.**

### Part 2 — Task log actuals (W34: Jul 6-12)
- W34 actuals: **0h** (no time logged yet this week as of Jul 8 14:03 — normal for mid-week check)

### Part 3 — Plan vs Actual
| Task | Planned | Actual | Status |
|------|---------|--------|--------|
| W34 total | ~100h planned | 0h logged | Too early to flag |

### Part 4 — Capacity & Runway
- Active NS+IP tasks: **40 tasks**, **365.3h remaining**
- Weekly capacity: 100h (3 devs, last known plan)
- Runway: **~3.65 weeks**

### Part 5 — Over-estimate tracking
| Ticket | % over | Note |
|--------|--------|------|
| #2615 | +790% | Critical overrun |
| #2595 | +40% | Watch |
| #2735 | +5% | Minor |

Trello: Fountain ✓ complete (5-part check done, Part 1 blocked by Matrix token).

---

## Elena — 02:00 (+07:00)

### Open PRs
`nustechnology/Elena-SamGuard-Digital-Plant`: **0 open PRs** ✓

### Precognize PRs
`nustechnology/Precognize`: **0 open PRs** ✓

### WordPress SamGuard Check
`https://www.samguard.co/`: Status 200 ✓
- JS errors: **0** ✓
- Page errors: **0** ✓
- CSP violations: 2 (Google Analytics blocked by CSP policy — 3rd-party, not app errors)
- Failed requests: 5 (Google/LinkedIn ads) — 3rd-party analytics, not app errors

**Verdict: Clean** — no actionable JS errors.

Trello: Elena-SamGuard ✓ complete. Elena-WordPress ✓ complete.

---

## Matrix [all rooms] — 06:55 (+07:00) — SUPERSEDED, see "Re-check" section below

~~**UNAVAILABLE** — Token expired (`M_UNKNOWN_TOKEN`). Browser SSO required.~~
~~No room data available for this run.~~

→ **Fixed 09:05 via visible-browser SSO. Full 19-room/448-message scan done — see "Re-check" section below for the real summary (OhCleo email-deliverability incident, Bailey go-live, Arthur demo, etc.). No unresolved action items found.**

---

## Reminders — 06:55 (+07:00) — SUPERSEDED, see "Re-check" section below

~~⚠️ Devs with 0h in sheets today (recheck recommended before sending):~~
~~- **LongVV** — 0h (OhCleo, expected in Workstream but unavailable)~~
~~- **PhucVT** — 0h (Workstream unavailable)~~
~~- **TuanNT** — 0h (Workstream unavailable)~~
~~- **KhanhHH** — 0h (leave request pending — unapproved, counted as working)~~
~~- **LeNH** — 0h (Workstream unavailable)~~
~~**No reminders sent** (no `--send-reminder` flag; Workstream unavailable = likely false alerts).~~

→ **Real outcome after 3 rounds of recheck: LongVV OK (leave), PhucVT genuinely 0h (reminder SENT via Matrix), TuanNT 8h (no reminder, combined-scan bug), KhanhHH 1.5h across 2 projects (no reminder), LeNH 8.58h across 2 projects (no reminder, combined-scan bug + a project-attribution error on my first correction, both now fixed). Only PhucVT got a message.**

---

## Trello — Summary (updated after 2nd recheck) — 09:25 (+07:00)

### Check Mail ✅ (card auto-completed)
All 6 items completed: DuongDn, Carrick, Rick, Kai, Ken, Nick.

### Check Progress ⚠️ (4 items pending)
**Completed (17 items):** Rory, Franc, Elliott, MPFC, Marcel, Elena-SamGuard, Raymond, Neural Contract, Andrew Taraba, Colin, Fountain, Philip, OhCleo, Arthur, Elena-WordPress, ~~John Yi~~→**re-completed**, ~~Rebecca~~→**re-completed** (both were wrongly reverted on TuanNT's false 0h, now fixed — see Re-check section).

**Skipped — alerts (4 items):**
- ⚠️ **Maddy** — ~~Kai no report +~~ 4 critical/high PR bugs unaddressed (Kai's report struck — he didn't work Jul 8, no report expected)
- ⚠️ **Aysar** — ~~MPDM empty +~~ customer production bug report (Vietnamese chars) unaddressed (MPDM-empty struck — 0h Baamboozle work Jul 7-8 confirmed via Workstream/Sheets/Upwork, no update was expected)
- ⚠️ **Bailey** — No #maintenance report from Nick + Amy unanswered questions
- ⚠️ **James Diamond - Vinn task** — PhucVT 0h Jul 8, no leave (confirmed genuine via 2 independent scans)

---

---

## Re-check — 08:37 (+07:00)

**Decrypted secrets, refreshed Workstream login (success), retried Matrix (refresh_token expired → browser SSO timed out → device-code auth in progress, awaiting user approval), retried Upwork carrick login (session refreshed, already authenticated).**

### Sheets — real data (Workstream was just unavailable in cron, not empty)

Ran `sheets-tasklog-scan.js 2026-07-08` (full 13-sheet + live 20-project Workstream scan) for all 5 devs:

| Dev | Sheets | Workstream (2026-07-08) | Total | Leave? | Verdict |
|-----|--------|--------------------------|-------|--------|---------|
| LongVV | 0h | OhCleo 4h | 4h | **Half-day AM leave (father's surgery, pending approval)** | ✓ OK — leave covers AM, PM logged |
| PhucVT | 0h | 0h (Crystal lang last logged Jul 7: 9h) | **0h** | None found | ⚠️ **ALERT — 0h, no leave** (confirmed twice: combined scan + isolated single-dev rescan, both 0h) |
| ~~TuanNT~~ | ~~0h (all 5 sheets)~~ | ~~0h~~ | ~~**0h**~~ | ~~None found~~ | ~~⚠️ **ALERT — 0h, no leave**~~ → **WRONG, struck (09:20, user caught): isolated single-dev rescan found 8h on the Paturevision/Bailey sheet — the combined 5-dev scan silently missed it. Real total = 8h. Not an alert.** (Scrin.io's 8h18m is separately unrelated — belongs to Nick/Global Grazing with no project tag, never conflate with TuanNT) |
| KhanhHH | 0h | Peptide Clyde 0.25h + ETZ-Wathaga 1.25h | **1.5h across 2 projects** | Pending leave is for **Jul 9** (today), not Jul 8 | Confirmed 3x: combined scan, isolated rescan, AND full unfiltered 20-project dump — all agree on 1.5h. Working multiple small-allocation projects that day, correctly reflects a busy-but-fragmented day, not a shortfall. One project bucket ("Others") returns HTTP 403 for everyone, can't rule out hours there but that's a platform-wide gap, not KhanhHH-specific. |
| ~~LeNH~~ | ~~0h~~ | ~~0h (James Diamond last logged Jul 7: 8h)~~ | ~~**0h**~~ | ~~None found~~ | ~~⚠️ **ALERT — 0h, no leave**~~ → **WRONG, struck TWICE now. 1st correction (09:20) said "8h on Peptide Clyde" — also wrong, mislabeled the project. 2nd correction (10:15, user: "LeNH: wrong, check again"): real total is 8.58h across TWO projects — Portfolio-James Diamond 8h + Peptide Clyde 0.58h. Verified via isolated rescan + full unfiltered 20-project dump, both agree. Not an alert.** |

**🔴 Root cause note:** the 5-dev combined `sheets-tasklog-scan.js` call silently dropped TuanNT's Paturevision entry and LeNH's Peptide Clyde entry — both only surfaced when each dev was rescanned alone. This is the same "multi-dev combined scan misses hours" bug already documented in memory (feedback_check_workstream_before_flagging_shortfall) — from now on, ANY dev showing 0h in a combined scan must get an isolated single-dev rescan before being written into the report as an alert.

**Trello correction (revised):** James Diamond/Vinn (gated by PhucVT, genuinely 0h) stays incomplete. John Yi and Rebecca (gated by TuanNT) — **re-completed**, TuanNT's 0h was wrong.
- ⚠️ James Diamond - Vinn task (real alert)
- ✓ John Yi - Amazing Meds (re-completed)
- ✓ Rebecca - William Bills (re-completed)

**Reminders (print-only unless noted):**
- PhucVT — needs reminder (0h, no leave, confirmed twice) — **sent per user request**
- ~~TuanNT — needs reminder (0h, no leave)~~ → struck, TuanNT has 8h, no reminder needed
- ~~LeNH — needs reminder (0h, no leave)~~ → struck, LeNH has 8.58h (2 projects), no reminder needed/sent
- LongVV — skip (leave covers it)
- KhanhHH — **user requested reminder sent 10:21** despite 1.5h>0 (low, not 0h) — 🔴 **sent the wrong template first** ("0h logged" text, factually wrong — she logged 1.5h), caught immediately, sent a correction message right after with the real number. Both messages are now in the Matrix room `!rwLbvLBnrRAYMaOPaD:nustechnology.com`.

### Maddy / Aysar / Bailey — re-verified, still genuinely open
Re-ran `search.messages` on Baamboozle, Xtreme, GGS since the cron's 06:55 cutoff (window: 06:55→08:37, ~1h40m) — **0 new messages** in all three (not stale data, no auth issue). Maddy stays open for the PR backlog (unrelated to Kai's absence). Aysar stays open for the unanswered customer bug report only — the MPDM "no update" is not a real gap (checked Workstream baamboozle project + dedicated Aysar sheet: 0h Jul 7-8, only Jul 6 had KhanhHH 4h; Upwork Aysar workroom has no task log, messages only — no evidence of any Aysar work happening those 2 days, so nothing for Carrick to report). Bailey stays open for Nick's #maintenance report.

### Upwork
Carrick session refreshed successfully (`upwork-login.js --login`, already authenticated, cookies re-saved). Rory/Neural/Aysar workroom hour-fetch scripts (`upwork-graphql-direct.js`) returned stale March-May monthly buckets — script needs a date-range fix, not usable for a July check this run. Session itself is no longer expired; Trello items already complete per session-failure≠alert policy regardless.

### Matrix — RESOLVED via visible-browser SSO (`matrix-token-refresh.js`, DISPLAY=:1) — verified as `@duongdn:nustechnology.com`

**Fountain Part 1 recheck:** No new weekly plan message since Jul 6 (Monday plan is weekly, not daily) — last known plan stands: ViTHT 40h + ThinhT 20h + DatNT 40h => QC 24h, capacity 100h/wk. Fountain room activity in window: PR review pings, a card scoping question ("Fountain gifting tab"), Trello card links shared — no blockers, no capacity change. Fountain 5-part check unaffected, item stays complete.

**Matrix — all rooms, since 06-07-08 14:03 → 08:59 Jul-9:** 19/132 active rooms, 448 messages. No unresolved action items for DuongDN — the 2 auto-flagged lines (both in Celine-OhCleo) were minhtv asking "a Dương" a technical question about email verification, which DuongDN already answered live in the same window (15:17-15:22).

**Key updates:**

**Celine - OhCleo (124 msgs)** — email deliverability incident, resolved same-window: `notify.ohcleo.com` domains lost DNS verification (LongVV accidentally re-triggered a failed re-verify check), causing customer-facing send failures. Root cause found + workaround applied: switched sender to `no_reply@notify.ohcleo.com` (still verified) — test sends confirmed delivered. 142 emails failed on Jul 6, need resend once CNAME records for the 3 `notify` subdomains are fixed at the DNS level (LongVV to configure, don't hit "Verify" button again — it breaks the still-working ones). minhtv wants a full incident report to Celine (status, root cause, short/long-term fix).

**NUS - Bailey - Paturevision (22 msgs)** — Console CR2/CR3 (Picking & Stock Location) shipped to Live Jul 9 08:51 (HaVS). This actually corroborates TuanNT's real 8h on Paturevision Jul 8 (see Re-check correction above) — he was "kẹt task" (stuck/blocked) per namtv Jul 9 08:25, consistent with being loaded on this project, not idle. PhucVT's 0h remains unexplained by anything in this room.

**Arthur - Meta-Stamp (10 msgs)** — Chris (client) ran a demo Jul 9 AM, mostly OK; 1 real bug (#3) being checked by team + TienND, rest are new asks not bugs. AI-usage-disclosure question with Chris/Nam resolved — no issue using AI internally as long as output is verified.

**Potential - Blair Brown / Peptide Clyde (28 msgs)** — LeNH needed DNS access for peptideclyde.com; resolved — site is on Hostinger (not MyKinsta as first assumed), DuongDN pointed to the right DNS panel, LeNH confirmed update done 15:38.

**Bailey - BA/QC (19 msgs)** — TuanNT near capacity; DuongDN redirected an upgrade-Rails task to HaVS/others rather than TuanNT — consistent with TuanNT's real 8h Paturevision load that day (not the wrongly-struck 0h).

**Other (brief):** James Diamond/Portfolio — client mobile team has no bug-tracking tool, Sentry suggested (informational, not urgent). Elena - Active Alerts (163 msgs) — internal dev/QA back-and-forth on a sub-alert table bug + a Wayland drag-drop Chrome quirk, shipped same day, no client-facing issue. NUS-Colin/ETZ — Stripe test-key verification in progress with client (Luc), no blocker. Radio Data Center — DuongDN asked LeNH for status (Khanh off that day).

---

## Performance (New Relic APM) — 09:40 (+07:00)

**User asked "where's the performance report I added yesterday?"** — this piece isn't part of the automated Full Run yet (informational-only, no Trello gate), so it doesn't auto-appear unless run explicitly. Running it now since asked.

| Project | Apdex | Avg response | Errors | Throughput |
|---------|-------|--------------|--------|------------|
| OhCleo (prod) | 0.93 ✓ | 972ms | 393/24645 (1.6%) — mostly `NotAuthenticated` (349, benign public-endpoint noise) | 21.4/min |

**OhCleo:** Yesterday's `password_reset_code_expires_at` DB migration error (ALERT from Jul 8 report) is **GONE today — fixed**. But the 3 slow endpoints flagged Jul 8 are **still slow, unaddressed**: MediaRecommendsView 20.0s (506 calls), HomeMediasView 18.0s (376 calls), MediaByKeyView 11.3s (292 calls) — same backend bottleneck, 2nd day running.

| MPFC | 🔴 **0.54 (poor, <0.7)** | 1214ms | 18/29977 (0.06%, low) | 26.1/min |

**🔴 MPFC — real issues found:**
1. **SQL injection probe on `/search/`** — top 3 slowest transactions (12-14s) are heavily URL-encoded `WAITFOR DELAY '0:0:15'` payloads — a classic time-based blind SQLi scanner hitting the search endpoint. Response times suggest requests are hanging near the injected delay. Needs WAF/input-sanitization check on the search route.
2. **JSON API plugin broken**: `Call to undefined method JSON_API_User_controller::error()` (9x) in `wp-content/plugins/json-api/singletons/api.php:59` — real code error, not user-caused.
3. **DB connection resolution failures**: `mysqli_real_connect(): getaddrinfo failed` (3x) — transient infra DNS issue, worth monitoring if it recurs.
4. Apdex 0.54 is driven by the above slow transactions dragging response-time distribution into "tolerating," not by error volume (errors are low).

**Not yet added to Trello** — no checklist item exists for Performance yet (per skill, ask user whether to add one once stable). Recommend adding "MPFC — investigate SQLi probe + JSON API error" as an action item regardless of Trello wiring.

---

*End of daily report — 2026-07-09T09:40:00+07 (2nd recheck + Performance added)*
