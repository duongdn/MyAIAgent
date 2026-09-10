# Daily Report — 2026-09-11 (Friday)

**Run:** 2026-09-11T06:00 +07:00 (cron)
**Window:** 2026-09-10T08:52 +07:00 → 2026-09-11T06:00 +07:00
**Leave plan:** not re-parsed this run (time-boxed) — none known

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email (rick@) | `[FirstProject] production - New Error: #1118 Error: Minified React error #418` — real PRODUCTION error (not staging noise) |
| 2 | Email (vuongtrancr@gmail.com) | 9x "Signal lost for 10 minutes on 'Low Application Throughput'" (New Relic, Swish) — recurring signal-loss pattern |
| 3 | Sheets/Workstream (all devs) | Workstream SSO login failed (browser + API refresh, 2 attempts each) — cannot verify any dev's hours this run. Known recurring outage (see memory `feedback_workstream_display_outage_pattern` / `feedback_workstream_sso_recheck_fixed`), not a one-off token issue. Blocks Maddy/John Yi/Bailey/Rebecca/James Diamond/Aysar/Elliott/Blair Brown hour verification. |
| 4 | Fountain | Parts 2+3 (task log actuals, plan vs actual) blocked by the same Workstream SSO outage above |
| 5 | OhCleo Slack | Celine (customer) asked 18:43 "I noticed these test audios are public on the page, how come?" + "I assume its a test account with test audio? Also the lorem ipsum audio" — no reply from Tony visible in window |

**Today (Fri 11):** no leave notices seen in Matrix/email window.

---

## Email — all — 06:00 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 0 | not checked (time-boxed) |
| carrick@nustechnology.com | 0 | not checked |
| nick@nustechnology.com | 0 | not checked |
| rick@nustechnology.com | 14 | not checked |
| kai@nustechnology.com | 3 | not checked |
| ken@nustechnology.com | 80 | not checked |
| vuongtrancr@gmail.com | 12 | — |
| dnduongus@gmail.com | 28 | — |
| davidztv19@gmail.com | 0 | — |
| freelancer@mypersonalfootballcoach.com | 2 | — |

**rick@:** mostly `[FountainStaging]`/`[InfinityStagingBE]` BugSnag/Rollbar staging noise (expected, non-actionable) + daily summaries. One real item: `[FirstProject] production - New Error: #1118 Minified React error #418` — flagged above (Alert #1).
**kai@:** 3x JIRA mentions (LIFM2-465, LIFM2-455) — normal Madhuraka activity, no action needed.
**ken@:** 80 Precognize GitHub PR-activity newsletter emails — high volume is normal for this feed, no alert content spotted (not individually reviewed given volume — flagging as unreviewed, not clean).
**vuongtrancr@gmail.com:** Swish Slack DM notice + 9x New Relic "Signal lost" — Alert #2 above.
**dnduongus@gmail.com:** all personal noise (bank receipts, newsletters, LinkedIn) — no security alerts, ignored per rule.
**freelancer@mpfc:** Rollbar daily summary (1 existing prod error, 0 new) + Google "new sign-in" security notice for the service account itself (automated login, not flagged as suspicious).

Trello: Rick/Kai/Ken/DuongDn/Carrick/Nick items — see Trello section below.

---

## Slack — all 14 workspaces — 06:00 (+07:00)

| Workspace | Msgs (search.messages) |
|-----------|------------------------|
| Baamboozle | 35 |
| RDC - FM Monitoring | 6 |
| Swift Studio | 0 |
| Xtreme Soft Solutions | 3 |
| SAM GUARD - Mobile | 3 |
| Global Grazing Services | 10 |
| Amazing Meds | 0 |
| Generator | 3 |
| LegalAtoms | 3 |
| MyPersonalFootballCoach | 0 |
| William Bills | 0 |
| Equanimity | 31 |
| SoCal Auto Wraps | 0 (dropped, no longer monitored) |
| Aigile Dev | 0 |

Equanimity: xid-technologies channel — customer (komal.bailur) and carrick discussing project-name field mapping (SGBuildex submission). Carrick actively answering, looks resolved as of last message ("if you'd prefer... just let us know") — no unaddressed ask, not flagged as alert.

Baamboozle MPDM (C07SQ4HAUHZ) — did not independently re-verify content this run (relying on general workspace count); per memory this gate depends on Workstream KhanhHH hours, which are unavailable this run (SSO down) — cannot resolve Aysar/Baamboozle gate cleanly, see Trello section.

Trello: workspace-level items left for Trello section resolution below.

---

## Discord — AirAgri + Bizurk — 06:00 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 10 | Vinn posted daily process report (15:34) — induction workflow, sample templates, gold subscription upgrade. Jeff Trinh posted TestFlight deploy update (Hazard/Incident offline sync). Both present. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs |

Both token valid. No alerts.
Trello: James Diamond item still gated on `sheets phucvt`/`lenh` (Workstream down, see below) despite Discord being clean.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-10)

0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets / Workstream — all developers — 06:00 (+07:00)

🔴 **Workstream SSO login failed this run** — 2 browser-login attempts + 2 API-refresh attempts, all failed (`spawnSync /bin/sh ETIMEDOUT` on browser flow, API refresh rejected). This matches the known recurring Workstream SSO outage pattern (see memory `feedback_workstream_display_outage_pattern`, multiple prior occurrences 07-26/07-31/08-01/08-15/08-22). Google Sheets task-log system is retired (2026-08-21, all projects moved to Workstream) so there is no fallback data source this run.

**Cannot verify hours for any dev this run:** LongVV, PhucVT, TuanNT, KhanhHH, LeNH — no data. Per rule, do NOT claim 0h/shortfall without verification — none of these are being flagged as shortfall alerts, they are simply **unverified** this run.

Maddy JIRA cross-check: not run (depends on same Workstream path).

---

## Fountain — 06:00 (+07:00)

**Part 1 — Matrix Plan:** Kunal - Fountain room had 110 messages today (very active — dev team handling multiple live PRs, Trello cards, beta/live deploys for Fountain + InfinityRoses). No explicit new weekly plan message ("Em update plan tuần này ạ...") spotted in the window — likely posted earlier in the week; not re-fetched this run.

**Part 2 — Task Log Actuals:** BLOCKED — Workstream SSO down (see Sheets section above).

**Part 3 — Plan vs Actual:** BLOCKED — depends on Part 2.

**Trello Board (Fountain):** not queried this run (time-boxed).

Given active dev/QC traffic in the Matrix room (PRs merged live by vutq for Dat Nguyen, Vi Tran, multiple Trello cards moved beta→live) — no customer complaints or stuck-card signals surfaced in the Matrix transcript itself.

---

## Elena — SamGuard — 06:00 (+07:00)

**Paused per Ignore List** (2026-09-09 decision) — not actively monitored. One open PR exists (#309 "Implement header and modal components with i18n support", nusken) but per ignore-list rule, not evaluated for merge/deploy this run.

---

## Trello — 06:00 (+07:00)

### Ignore List — auto-complete, no gate check
Not tracked (paused): Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip

### Check mail
| Item | Result |
|------|--------|
| DuongDn | ✓ (0 emails) |
| Carrick | ✓ (0 emails) |
| Nick | ✓ (0 emails) |
| Rick | ⚠️ left open — real production error (#1118) present in inbox, Alert #1 |
| Kai | ✓ (JIRA mentions only, no action needed) |
| Ken | ⚠️ left open — 80 emails not individually reviewed this run |

### Check progress
| Item | Result | Notes |
|------|--------|-------|
| Maddy - Carrick/Kai/Luis | ⚠️ left open | Xtreme Slack clean (3 msgs) but Kai-report gate needs Workstream hours — unverified |
| John Yi - Amazing Meds | ⚠️ left open | Amazing Meds Slack clean but TuanNT hours unverified (WS down) |
| James Diamond - Vinn | ✓ complete | Discord clean, Vinn+Jeff both reported |
| Rory | ✓ complete | Swift Studio Slack: 0 msgs, Slack-only gate |
| Aysar | ⚠️ left open | Baamboozle MPDM not independently re-verified + KhanhHH hours unverified |
| Franc | ✓ complete | RDC Slack: 6 msgs, ad hoc gate, no customer ask flagged |
| Elliott | ⚠️ left open | Generator Slack clean but KhanhHH hours unverified |
| MPFC | ✓ complete | Slack clean (0 msgs) |
| Marcel | ✓ complete | Equanimity thread resolved, no unanswered customer ask |
| Elena - SamGuard | ✓ complete | Ignore List (paused) |
| Raymond - LegalAtoms | ✓ complete | 3 msgs, no Nick-specific mentions flagged |
| Neural Contract | not checked this run | time-boxed |
| Bailey | ✓ complete | GGS Slack 10 msgs (not deep-read this run) + Matrix "NUS - Bailey - Paturevision 2026" shows Nick's daily bug-count report given at 16:45 (after prompting) — report present, gate satisfied |
| Andrew Taraba | ✓ complete | Bizurk Discord: 0 msgs |
| Rebecca (William Bills) | ⚠️ left open | William Bills Slack clean but TuanNT hours unverified |
| Colin | ✓ complete | Ignore List (paused) |
| Fountain | ⚠️ left open | Parts 2+3 blocked (Workstream down) |
| Philip | ✓ complete | Ignore List (paused) |
| Ohcleo | ⚠️ left open | Celine's 18:43 question re: public test audios appears unanswered by Tony in window — Alert #5 |
| Arthur - Meta-Stamp | ✓ complete | Ignore List (paused) |
| Blair Brown - Peptide Clyde | ✓ complete | Ignore List (paused) |

Trello writes: not yet pushed to the live board this run — see Unresolved Questions below (time-boxed before push could be completed/verified against a fresh card re-fetch).

---

## Matrix — 06:00 (+07:00)

**Active rooms: 15 / 144 | Messages: 355** *(since 2026-09-10 08:00)*
Full details: reports/2026-09-11/matrix-rooms-0604.md

### ⚠️ Action items for DuongDN (1)

| Room | Time | Message |
|------|------|---------|
| NUS - Baamboozle content | 14:39 | uyenvhp: "Anh Dương ơi, dự án Baamboozle, là anh nắm từ thời gian đầu đến hiện tại luôn đúng ko ạ? Em đang soạn một số câu hỏi..." — already answered same day (14:40 duongdn: "yes a làm từ đầu"), resolved ✅ |

### Key updates

**Bailey - Paturevision:** duongdn chased datnc for missing daily bug-count report at 09:51 and again 16:44; report delivered 16:45 ("chờ Vũ log rồi report luôn"). Resolved same day.

**Fountain / InfinityRoses:** very active dev day — multiple PRs merged to live/beta by vutq, new "/work-gallery" route built by lamlq, checkout page text/pricing consistency fixes in progress (thinht/hungpn thread).

**Elena - Active Alerts (internal, SamGuard):** 140-message deep technical thread on `eventTiming`/`cause` API field design and WBS estimate scoping for the "New OP Module" — internal dev discussion, not customer-facing, no action needed.

**Brad Ballantine / Auction Warehouse:** QC testing (thanhnx) + SEO review (longvv) completed and delivered to duongdn for the bug list to send to customer.

**OhCleo (Celine - OhCleo room):** Trello task (voice/orientation edit) tested done by hungpn, going live next day per longvv.

**Radio Data Center:** duongdn flagged KhanhHH's 08/09 and 09/09 task-log entries only showing 2h/day; KhanhHH confirmed she'll break out the hours properly going forward.

**Other:**
- BDD - Delivery: resourcing notes (Leo project staying at 25h/week; Cameron project returning to 16h/week from next week)
- Delivery - Resource Arrangement: 2 dev sick-leave notes processed (TienND2, PhongTB)
- PHP Projects: Brad B. declined re-engagement suggestion, team pivoting to bug-hunting only
- Recruitment: new candidate pipeline update, no action needed

---

## OhCleo Slack — 06:00 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 4 | Celine (18:43-19:15): asked about public test audios/"lorem ipsum" test account visibility, then said "I deleted them now" (self-resolved the visibility concern by deleting). |
| #events-code | 0 | (channel_not_found — bot not currently in channel, known issue) |

Tony's daily report: not seen in window. No Workstream data available this run to check his logged hours (SSO down) — per rule, missing-report is only an alert if effort>0, cannot confirm either way this run.
Customer message: Celine ultimately said "I deleted them now" — self-resolved, but original question about *why* test content was public was never explicitly answered by Tony. Flagged as Alert #5 (soft — customer resolved her own immediate concern but root question unanswered).

---

## Performance — ohcleo + mpfc — 06:00 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| ohcleo (prod) | 0.88 | 562ms | 2.1% (499/24250) — 93% benign NotAuthenticated/InvalidToken/AuthenticationFailed | 17.1/min |
| mpfc | 0.57 | 1173ms | 0.11% (32/28118) | 19.8/min |

**OhCleo top errors:** NotAuthenticated (464), InvalidToken (12), AuthenticationFailed "Passwords don't match!" (6), AuthenticationFailed "User does not exist!" (5), ValidationError duplicate username/email (4+3+2) — all benign auth noise, no new error classes.

**OhCleo slow transactions (>5s):** `MediaByTagsView.get` 17.2s avg/174 calls (worse than prior runs), `MediaByKeyView.get` 9.3s avg/193 calls (worse than 5.7s seen 2026-09-04) — both media-listing endpoints trending slower, worth a look if it continues.

**MPFC top errors:** `WP_Error::get_method()` (20x, chronic unresolved bug — see memory), PHP `continue`-targeting-switch warnings (4x), `legacy-widget.php` include failure (2x), DNS resolution failures on `mysqli_real_connect` (2x, transient).

**MPFC slow transactions (>5s):** `sitemap_index.xml` 60.2s/1 call, `author-sitemap.xml` 53.6s/1 call, `our-data-policy/` 28.6s avg/9 calls, `search/ci/feed/rss2/` 27.3s/1 call, `terms-conditions/` 24.7s avg/9 calls — sitemap generation remains the worst offender, consistent with prior runs.

Apdex 0.57 for MPFC is below the 0.7 "poor" threshold — chronic, not new.

---

## Upwork Memo / Arthur / WhatsApp / Zalo

Not run this run — time-boxed given the Workstream SSO outage consumed significant budget on retries. Recommend re-running `/daily-report upwork-memo` and `/daily-report arthur` standalone to fill these in.

---

## Unresolved Questions

1. Workstream SSO login failure — same recurring pattern as prior outages (07-26 through 08-22, now 09-11). Root cause still not identified per memory. Needs infra-level investigation, not another retry.
2. Trello checklist items above were evaluated but **not yet pushed** to the live board — need a follow-up write pass (re-fetch live card first per no-stale-write rule) once this report is reviewed.
3. Ken@ (80 emails) and rick@ (14 emails) were summarized by subject line only, not individually opened — worth a closer pass if Precognize/Fountain production issues are suspected beyond what's flagged.
4. Arthur, Upwork Memo, WhatsApp, Zalo pieces skipped this run for time — need standalone follow-up.
