# Daily Report — 2026-08-14 (Friday)

**Run:** 2026-08-14T07:35:00+07:00 (cron)
**Window:** 2026-08-13 08:49 +07:00 → now
**Leave plan:** No upcoming approved leaves on record (parse-leave-emails.js). Matrix Resource Arrangement room notes: TienND2 out 08-14 (not PHP team), VinhNT hospital trip 08-19.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Matrix — Equanimity/XID (Marcel) | Ken-Pal go-live is TODAY (08-14); komal.bailur reported required UAT fields still missing/not populating at 21:58 last night, asked Carrick to fix before sending data — unresolved. Carrick told the team he'd be on leave today. |
| 2 | Slack — Baamboozle #testing (Aysar) | skjamie25 reported a landing-page mismatch (Nusdev vs production images) at 20:58 — unanswered as of report time (~10h, overnight). |
| 3 | Environment | Workstream SSO login failed 5/5 attempts this run (browser opens, SSO redirect completes, but the app API token never fires) — task-log hours below are Sheets-only. Upwork (Rory/Aysar/Neural) and MS Teams (Philip) checks also failed for the same reason (no working browser session in this execution context). Will retry next run. |
| 4 | Sheets — all 5 PHP devs | 0h logged for Thu 2026-08-13 across all checked sheets as of 07:35 AM — Matrix shows real work by LongVV, TuanNT, KhanhHH, PhucVT on 08-13, so this looks like same-morning logging lag (well-documented pattern), not a real gap. Not sending reminders; recheck later today. |
| 5 | Bitbucket — Maddy (Kai/Xtreme) | 5 open PRs, 2 long-aging with real unaddressed client-reported bugs: #481 (LIFM2-409, 115 days) and #509 (LIFM2-428, 52 days — Anoma Wasala commented again 08-13 16:48-17:02). #485 (107d) appears abandoned. |

**Today (Fri 08-14):** No confirmed staff leave among the PHP team. TienND2 (not PHP team) out today per Resource Arrangement room.

---

## Email — all — 07:20 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 0 | 0 | no events |
| carrick@nustechnology.com | 5 | 1 (GitLab `generator-api` pipeline failed) | no events |
| nick@nustechnology.com | 0 | 0 | no events |
| rick@nustechnology.com | 21 | 17 (all FountainStaging/InfinityStagingBE — staging = INFO only) | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 4 | 3 (JIRA: Anoma Wasala commented on LIFM2-428 x3) | no events |
| ken@nustechnology.com | 80 | 11 (welligence/web GitHub PR activity — external org, not one of our monitored client projects) | 08:30 DE Daily Standup, 09:00 DE Tech Talks, 08:30 DE Daily Standup (dup) |
| vuongtrancr@gmail.com | 19 | 17 (New Relic "Signal lost"/baseline-deviation on Swish — recurring pattern, informational) | — |
| dnduongus@gmail.com | 17 | 0 (personal Gmail — newsletters/bank notices filtered, no security alerts) | — |
| davidztv19@gmail.com | 2 | 0 (Dropbox + Basecamp notifications) | — |
| freelancer@mypersonalfootballcoach.com | 1 | 0 (TestFlight build notice) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ all 6 complete.

---

## Slack — all 14 workspaces — 07:22 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 | Carrick posted both Wed (11:31) and Today's (17:27) updates in MPDM — gate satisfied. Active #testing thread with skjamie25 (see Alert #2). |
| RDC - FM Monitoring | 13 | Automated tuner reboot/access-log bot messages only — no dmetiner customer message this window. |
| Swift Studio | 0 | Quiet — normal. |
| Xtreme Soft Solutions | 10 | Kai progress report present (LIFM2-436/449 update, LIFM2-458 estimate). Anoma Wasala asked 2 Shopify stock-sync questions (unanswered as of window end, but low-urgency ops questions, not blocking). See Maddy section below for full 4-part check. |
| SAM GUARD - Mobile | 9 | Elena/DP team routine PR review + upgrade discussion in #process-digital-plant. No client complaint. |
| GLOBAL GRAZING SERVICES | 2 | Nick's daily report (#général) + full server status report (#maintenance, 02:10) — WARNING notes are the same recurring/self-resolving memory-spike pattern (20+ days) + one routine RDS patch pending, not new. |
| Amazing Meds | 0 | Quiet — normal. |
| Generator | 0 | Quiet — normal. |
| LegalAtoms | 0 | Quiet — normal. |
| MyPersonalFootballCoach | 0 | Quiet — normal. |
| William Bills | 0 | Quiet — normal. |
| Equanimity | 36 | Very active — Ken-Pal go-live prep for XID Technologies. See Alert #1. |
| SoCal Auto Wraps | 0 | Not monitored (dropped 2026-05-11). |
| Aigile Dev | 1 | Automated alert-bot message only, no content. |

Trello: Rory, Franc, Elliott, MPFC, Raymond, Colin ✓ complete. John Yi — see Sheets section (○ incomplete, pending task-log verification). Marcel, Aysar — ○ incomplete (see Alerts #1, #2). Maddy — see dedicated section below (✓ complete).

---

## Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis) — 07:40 (+07:00)

### 1. Slack (Kai↔Madhuraka + team)
Kai's progress report present 08-13: LIFM2-436 feedback update done, LIFM2-449 feedback update done, LIFM2-458 estimate commented. No unanswered direct client ask found in this window (Anoma Wasala's Shopify stock-sync questions are internal/ops, not a formal client escalation).

### 2. JIRA ticket activity (since last run)
Anoma Wasala (client) commented 3x on **LIFM2-428** ("[Shopify] Product Authenticity Certificate") between 16:48-17:02 on 08-13 — same ticket behind long-aging PR #509 below. Content not yet reviewed line-by-line this run; flagged for follow-up.

### 3. Task log hours
LongVV (Kai persona) — Sheets shows 0h for 08-13 as of this AM check (not yet logged); Workstream unavailable this run (see Alert #3). Matrix (`!MFDrNaMDioeefgJXJk`) shows LongVV actively engaged with Xtreme project admin today (asked to be switched from "Needs Review" to "Reviewer" on Maddy so he can edit his own charged hours — DuongDN approved). No evidence of absence.

### 4. Bitbucket PR status (`xtreme-web/rms`)
5 open PRs, all authored by Kai:
| PR | Ticket | Age | Status |
|----|--------|-----|--------|
| #481 | LIFM2-409 | 115d | Chronic — Madhuraka's own bug report, still open (see [[feedback_maddy_kai_longvv_identity_and_quality_escalation]] history) |
| #485 | — | 107d | Appears abandoned |
| #509 | LIFM2-428 | 52d | Client (Anoma) commented again 08-13 — active client attention on an aging PR |
| #516 | LIFM2-449 | 35d | — |
| #520 | — | 29d | — |

**Verdict:** No new client escalation this window; existing PR-aging pattern (esp. #481/#509) continues and deserves eventual resolution but is not new. Trello: Maddy ✓ complete (no unaddressed customer ask found).

---

## Discord — all — 07:26 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 20 | Vinn's daily report present ("Just report my process today") in #airagri_webapp. Jeff Trinh's daily report present (4h) + new Contractor App build shared for testing in #airagri-flutter. James Diamond raised a "locate me" error — resolved same thread ("Finally works"). |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew Taraba DMs — normal (low-activity). |

Trello: James Diamond - Vinn ✓ complete, Andrew Taraba ✓ complete.

---

## Sheets/Workstream — Task Log Hours — 07:35 (+07:00)

🔴 **Workstream unavailable this entire run** — SSO login attempted 5x (2 automatic + 3 manual retries), browser reaches Keycloak/SSO redirect successfully each time but the app's own API token never fires; existing cached token also returned 403. This matches a known pattern where this execution environment lacks a fully working browser session (same root cause affected Upwork and MS Teams checks below). Will retry on next run.

Sheets-only results for Thu 2026-08-13 (all 13 sheets scanned, CharlesChang + Generator sheets have no week tab past early August — moved to Workstream, no fallback data available):

| Developer | Sheets total (08-13) | Status |
|-----------|----------------------|--------|
| LongVV | 0h | Not yet logged as of 07:35 AM. Matrix confirms real Celine/OhCleo + Maddy work on 08-13 (content-preference filter fixes, mobile release shipped). Not treated as a shortfall — same-morning logging lag. |
| PhucVT | 0h | Not yet logged. Matrix confirms Brad Ballantine work on 08-13 (hit 14h/week budget cap). Adhoc/external project — per standing rule, PhucVT 0h is never an alert regardless. |
| TuanNT | 0h | Not yet logged. Matrix confirms real, substantial Bailey/Paturevision work on 08-13 (RDS upgrade — caught and corrected a live-DB near-miss — plus PR #293 + mailcatcher fixes). |
| KhanhHH | 0h | Not yet logged. Matrix confirms Elena-SamGuard WordPress work on 08-13 (social-icon footer fixes). Generator sheet has no current-week tab (moved to WS, unreachable this run). |
| LeNH | 0h | Not yet logged. No direct Matrix evidence of 08-13-specific work found this pass. DuongDN's 08-12 follow-up message to LeNH (0h that day too) has no reply yet in this window. |

**Maddy JIRA weekly cross-check:** could not run — `maddy-jira-tasklog-check.js` also depends on Workstream, failed with the same SSO error.

**No reminders sent** — none of the above are confirmed genuine 0h (real work evidenced via Matrix for 4/5 devs); this is a data-availability gap, not a person-status gap. Recommend a recheck later today once Workstream access is restored.

Trello: John Yi ○ incomplete (pending), Rebecca ○ incomplete (pending), Bailey ✓ complete (direct Matrix evidence of substantial Bailey-specific work today), Blair Brown - Peptide Clyde ○ incomplete (Workstream-only project, no data this run).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-13): 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 07:45 (+07:00)

**Part 1 — Matrix plan:** Posted by @trinhmtt Tue 2026-08-11 16:30 (`!EWnVDAxbTGsBxPkaaI`): ThinhT 4h, ViTHT 40h, DatNT 40h, LamLQ 16h, QC 25h.

**Part 2 — Task log actuals:** Unavailable this run — Workstream is the sole authoritative source (project `fountain`) and login failed (see Alert #3); the fallback Google Sheet (`1iIKfjAh...`) has been abandoned (Summary tab shows 0.00 for all weeks including far-future ones — no real data to fall back to).

**Part 3 — Plan vs actual:** Cannot compute without Part 2 data.

**Trello board (customer comments, stuck cards):** Not checked this run due to time — carrying forward, will run on next check.

**Matrix activity (informational):** Team fixed a `/admin/order_items` regression on staging (Rails gem issue post-upgrade, same root cause hit on Infinity separately) and shipped PR #494 (Fountain) / #495 (Infinity) for bottle-engraving + URL/nuqs improvements — both marked done same day.

Trello: Fountain - DOCUMENT ○ incomplete (Parts 2/3 unverified, Trello board not checked).

---

## Elena — 07:50 (+07:00)

**PRs (`nustechnology/Elena-SamGuard-Digital-Plant`, duongdn account):** 1 open — #309 "Implement header and modal components with i18n support". CodeRabbit: SUCCESS (no high-risk findings). **Not mergeable — has merge conflicts (DIRTY/CONFLICTING)**, needs the dev to rebase before it can be merged; not auto-merged this run.

**Pending actions (`.elena-pending-actions.json`):** No undeployed merged PRs — the only `deployed:false` entry (#300) is a NOTE-prefixed intermediate branch merge, correctly excluded.

**Precognize (`Precognize/development`, nusken account):** 12 open PRs total, 0 authored by nusken — nothing to review/push.

**WordPress SamGuard (samguard.co):** Clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign GA/ads analytics `failedRequests` noise (excluded per standing rule).

Trello: Elena - SamGuard Digital Plant ✓ complete (PR conflict is a dev-action item, not a client-facing alert). Elena - WordPress SamGuard ✓ complete.

---

## OhCleo Slack — 07:15 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 5 | Tony's daily report present (11:08): content-preference filter API + automation email media pictures. Celine asked about a private-email sender at 08:52 — Tony resolved same session by 08:55 ("100%, reply to that private email, forwards automatically"). |
| #events-code | — | `channel_not_found` this run (channel access issue, not a session/auth failure — dormant channel per standing note). |

Tony daily report: present 11:08. No unresolved customer question.

Trello: Ohcleo ✓ complete.

---

## Performance — all 4 projects — 07:30 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| ohcleo (prod) | 0.93 | 376ms | 2.78% (549/19773) — mostly NotAuthenticated/InvalidToken (benign) | 14.1/min |
| mpfc | 0.57 (poor) | 1000ms | 0.37% (138/37442) | 26.7/min |
| fountain | 0.99 | 115ms | 0% (0/43262) | 30.8/min |
| infinity | 0.96 | 182ms | 0.02% (3/17313) | 12.3/min |

**OhCleo top errors:** NotAuthenticated (501), InvalidToken (21), username/email-exists validation (8/7), password mismatch (5), invalid bcrypt hash (3), User does not exist (2), `IntegrityError null user_id app_playhistory` (2x — chronic, weeks-old).
**OhCleo slowest transactions:** `MediaAddTrackAPIView.post` 17.2s/1 call, `MediaByKeyView.get` 7.7s/237 calls (chronic), `GetBookMarkDetailsView.get` 2.3s/484, `HomeMediasView.get` 2.0s/499, `MediaRecommendsView.get` 1.2s/790.

**MPFC top errors:** `WP_Error::get_method()` fatal (133x, chronic/unresolved), `continue targeting switch` E_WARNING (2x), 1x each of `ABSPATH` include failure, mysqli connect failure, `get_header()` fatal.
**MPFC slowest transactions:** `sitemap_index.xml` 35.7s/1, MemberMouse `processOrder.php` 20.0s/1, 3x `/search/` SQLi `WAITFOR DELAY` probe requests 12.0s/11.9s/11.8s (active scanner, not real slowness).

**Infinity:** 1 new error class — `ArgumentError: wrong number of arguments (given 3, expected 2)` (3x). Slowest: `admin/gift_variants/update` 4.8s/20 calls.

**Fountain:** clean, no errors.

No new/unusual top error classes vs prior reports — all chronic/known issues (MPFC WP_Error + SQLi probes, OhCleo MediaByKeyView slowness + app_playhistory IntegrityError).

---

## Arthur / Meta-Stamp — 07:55 (+07:00)

**1. Matrix — business room (`!BEXEdVUmvWclPLELFf`):** PhucVT relayed client (Chris)'s DM questions to TienND for follow-up; TienND handling a wallet-insufficient-funds payment bug plus a new (unscoped, "thinking/planning only — not charged") feature request from the client — 4 tasks identified, awaiting client confirmation on scope.

**2. Matrix — technical setup room (`!QEbdvaMJkTurMpRPIX`):** No new activity this window.

**3-5. Slack "Solid Code" (4 channels):** ⚠️ Workspace config currently absent from `config/.slack-accounts.json` entirely (not a token-expiry — the account entry itself is missing, matching a previously-documented clobber pattern). Cannot check this run; needs re-extraction from David's Chrome profile on the interactive desktop (GUI action, not available in this execution context).

**6. GitHub (`Christebob/Meta_Stamp_V3`, davidztv account):** 2 commits since last run (`bedcb28` cap resumable uploads at 500MB, `30ebc50` show Stripe error detail). 0 open PRs (direct-to-main workflow, as usual).

**Workstream (Crystal lang, est/actual):** Unavailable this run (same SSO failure as Alert #3).

**Verdict:** No client-facing issues found in the sources actually reachable this run. Solid Code Slack gap is a real blind spot — flagging for the user to re-extract the token via David's Chrome profile when at the desktop.

Trello: Arthur - Meta-Stamp ✓ complete (no negative signal in reachable sources; gap noted above).

---

## Upwork Memo — 2026-08-13 — 07:33 (+07:00)

Unavailable this run — same root cause as Alert #3 (no working browser session in this execution context): live-cookie extraction failed (no DBUS session / Chrome profile reachable), headless re-login failed, and stored sessions are expired for both Rory and Aysar workrooms. Neural Contract also came back `session_expired` (never an alert per standing rule). Per existing session-failure rules, this is not a memo-validity finding — no Trello item exists yet for Upwork Memo specifically, and existing Rory/Aysar gates are unaffected (already resolved above via Slack).

---

## Trello — Check Progress / Check Mail — 08:05 (+07:00)

**Check Mail:** 6/6 items complete (DuongDn, Carrick, Rick, Kai, Ken, Nick).

**Check Progress:**
- ✓ Complete (16): Maddy, James Diamond - Vinn, Rory, Franc, Elliott, MPFC, Elena - SamGuard Digital Plant, Raymond - LegalAtoms, Neural Contract, Bailey, Andrew Taraba, Colin, Ohcleo, Arthur - Meta-Stamp, Elena - WordPress SamGuard.
- ○ Incomplete (7): John Yi (task-log unverified, Workstream down), Aysar (unanswered customer question, see Alert #2), Marcel (unresolved Ken-Pal go-live blocker, see Alert #1), Rebecca (task-log unverified), Fountain - DOCUMENT (Parts 2/3 + Trello board not checked), Philip (MS Teams check timed out — same browser-session issue), Blair Brown - Peptide Clyde (Workstream-only project, no data this run).

Card not auto-completed (7 items still open).

---

## Reminders — 08:07 (+07:00)

No reminders sent. All 5 PHP devs show 0h in Sheets for 08-13, but Matrix confirms real work for 4 of 5 (LongVV, PhucVT, TuanNT, KhanhHH) — this is a same-morning logging-lag pattern, not a genuine gap, per documented history of this exact false-positive (see `feedback_check_workstream_before_flagging_shortfall`). LeNH has no direct 08-13 evidence either way; DuongDN's 08-12 follow-up to her (also 0h that day) is still unanswered in Matrix. Recommend a recheck later today (afternoon) once actual hours have had time to be logged and Workstream access is restored.

---

## Matrix — 07:21 (+07:00)

**Active rooms: 34 / 139 | Messages: 786** *(since 2026-08-13 08:00)*
Full details: reports/2026-08-14/matrix-rooms-0721.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| `!oGYjbzEfphvvauBZtq` (internal ops) | 16:49 | namtv: "Chắc LongVV ko phù hợp hiện tại đâu, bên Maddy đang có nhiều task lên, cus về rồi, sợ làm Maddy/Celine thì ko đủ time — ủa, mày có đọc kỹ ko" — discussion about reassigning LongVV off Celine given Maddy workload; resolved same thread (PhucVT to take Celine primary). |

### Key updates

**Bailey/Paturevision — near-miss caught**: TuanNT attempted an RDS upgrade directly against the LIVE database; DuongDN caught it immediately and TuanNT switched to the safe clone-and-test approach. Real, substantial work done 08-13 (PR #293, mailcatcher fixes) not yet in the task-log sheet.

**Equanimity/XID — Ken-Pal go-live today**: see Alert #1.

**Celine/OhCleo**: very active content-preference filter QC cycle; both iOS/Android builds approved and released 08-13 15:15.

**LongVV/Maddy reallocation discussion**: team debating shifting LongVV off Celine (OhCleo) given rising Maddy ticket volume; PhucVT likely to take Celine primary, TuanNT to help cover Brad Ballantine.

**Other:**
- Fountain: `/admin/order_items` regression fixed same-day (Rails 8 gem issue).
- Arthur: wallet payment bug + new unscoped feature request being clarified with client.
- Delivery-Resource Arrangement: all pending leave notes processed and confirmed (halt, 17:24).

---

## Unresolved questions
1. LeNH — no reply yet to DuongDN's 08-12 task-log follow-up (0h that day); worth a direct check next run.
2. Solid Code Slack workspace token needs re-extraction on the interactive desktop (David's Chrome Profile 15) — this environment cannot do it headlessly.
3. Workstream/Upwork/MS Teams browser-based logins all failed uniformly this run — worth confirming whether this execution environment has a working virtual display, since prior sessions relied on `DISPLAY=:1` + a real desktop/VNC that doesn't appear reachable here (`xdotool` itself is not installed).
