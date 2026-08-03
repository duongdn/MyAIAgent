# Daily Report — 2026-08-03 (Monday)

**Run:** 2026-08-03T07:05–07:33 +07:00 (cron)
**Window:** 2026-07-31T07:31 +07:00 → now (spans Fri 07-31, Sat 08-01, Sun 08-02, Mon 08-03 morning)
**Leave plan:** No approved leave on file for LongVV/PhucVT/TuanNT/KhanhHH/LeNH covering this window.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Elena — WordPress SamGuard | **samguard.co returning HTTP 500 (Internal Server Error)** on every request, confirmed via 2 separate curls at 07:20 UTC. No SSH key available from this environment to pull server logs — needs manual investigation/fix. |
| 2 | Slack — RDC/Franc | dmetiner (customer) reported an MPX display bug + intermittent error (screenshots attached) and asked "Can you please check why it is happening?" at 08-02 15:12-15:15 — unanswered as of run time (~16h). |
| 3 | Slack — Swift Studio/Rory | henry asked 07-31 13:34 "our contract and Jeff's have been paused, could you help check on them?" — unanswered as of run time (~42h). |
| 4 | Slack — Xtreme/Maddy | anomawasala (customer side) posted "It's unable to find the quote RMS-66045 / can u plz check" 08-01 19:47 — unanswered as of run time (~35h). Heavy repeat JIRA @-mentions on LIFM2-449 same period. |
| 5 | Slack — Baamboozle/Aysar | No Carrick "Today's update" posted in the Aysar MPDM channel since Thu 07-30 19:03 — Friday 07-31 has no update (gap on a workday, no leave on file). |
| 6 | Discord — AirAgri/James Diamond | Brett reported (via bellatric02, 07-31 00:31) that Corporate Reporting shows all hazards as overdue including resolved ones — not explicitly confirmed fixed in Vinn's 12:43 report same day. |
| 7 | rick@ email | 24 production Rollbar/BugSnag alerts this window across Fountain/InfinityRoses/FirstProject — ongoing known issue pattern, see Fountain/Performance sections. |
| 8 | vuongtrancr@ email (Swish) | 12x "Signal lost — Low Application Throughput" + daily summaries — recurring known pattern. |
| 9 | freelancer@ MPFC email | `WP_Error::get_method()` fatal hit 1000th occurrence this window (11 alert emails) — long-standing unresolved bug, see Performance section. |
| 10 | Trello — Fountain | Weekly plan still not posted in Matrix room (gap now spans multiple weeks per prior weekly report); Workstream (task-log actuals, primary source) unreachable this run; the old Google Sheet fallback is confirmed stale/abandoned (0.00h logged since W29). Part 2/3 unverifiable. |
| 11 | Trello — Philip (MS Teams) | `fetch-msteams-customer-messages.js will "Philip Briggs"` timed out twice (incl. once with a cleared browser profile per the known fix) — could not check for unanswered customer messages this run. |

**Today (Mon Aug 3):** No staff leave on file. All present.

**Environment note:** Workstream (workstream.nustechnology.com) SSO login hung with no completion across 3 separate attempts this run (direct login, via `workstream-fetch-project-week.js`, via `sheets-tasklog-scan.js`'s internal call) — no interactive human/DISPLAY session available to complete the browser SSO flow in this cron context. This is a recurring, well-documented environment limitation on this server (same failure on 07-24, 07-26, 07-27, 07-29, 07-31 cron runs), not a new credential issue. Sheets-only fallback used where available; hours for LongVV/PhucVT/KhanhHH/LeNH could not be hard-verified this run — **no reminders sent** (unreliable 0h readings are not valid evidence, would risk a false-positive send per established policy).

---

## Email — all 10 accounts — 07:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | 0 | no events |
| carrick@nustechnology.com | 5 | 1 (Socalautowraps daily summary — informational, not action-required) | no events |
| nick@nustechnology.com | 11 | 1 (PR merge notification — informational) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 47 | 24 (production Rollbar/BugSnag — Fountain/InfinityRoses/FirstProject, see Alert #7) | 12:30 HEAL Meeting, 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 9 | 9 (JIRA mentions/comments on LIFM2-449/450/454, Madhuraka project — matches Alert #4) | no events |
| ken@nustechnology.com | 80 | 1 (GitHub PR notif, unrelated repo — informational) | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 21 | 19 (Swish Signal-lost + daily summaries — see Alert #8) | — |
| dnduongus@gmail.com | 54 | 0 | — |
| davidztv19@gmail.com | 12 | 1 (Slack security code — routine 2FA, not a real alert) | — |
| freelancer@mypersonalfootballcoach.com | 13 | 12 (MPFC production WP_Error::get_method() — see Alert #9) | — |

Trello: DuongDn, Carrick, Rick, Kai, Ken, Nick items ✓ complete. Card auto-closed (6/6).

---

## Slack — all 14 workspaces — 07:20 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 32 | #engineering/#gamedev mostly GitHub bot + QA chatter (skjamie25 cross-browser testing). Aysar MPDM channel: **no update since Thu 07-30 19:03** — see Alert #5. |
| RDC - FM Monitoring | 66 | Mostly automated "Tuner Access Log" noise. dmetiner customer ask unanswered — see Alert #2. Carrick otherwise very responsive on powergroup-istanbul/izmir device rollout through 07-31. |
| Swift Studio | 1 | henry's contract-pause ask, unanswered — see Alert #3. |
| Xtreme Soft Solutions | 5 | anomawasala unanswered ask — see Alert #4. Madhuraka/Kai exchange (done) also present. |
| SAM GUARD - Mobile | 0 | Clean. |
| Global Grazing Services | 3 | Nick posted daily report (bug list) in #général 17:15 + "will check it" in #maintenance. AWS RDS PostgreSQL EOL notice (Oct 2026, informational, no action needed now). |
| Amazing Meds | 0 | Clean (auth verified live via auth.test, genuinely quiet). |
| Generator | 19 | Normal dev/BA collaboration (Elliott/Violet, Figma access, Trello task hand-off). No unaddressed customer ask. |
| LegalAtoms | 9 | Raymond/team release chatter, no Nick-specific mentions. |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 0 | Clean. |
| Equanimity | 6 | komal.bailur ↔ marcel on a manpower-report estimate — normal project chatter, not a customer complaint. |
| SoCal Auto Wraps | 0 | Clean (not gated — no Trello item). |
| Aigile Dev | 21 | Bot noise (Amazon Q dev, newsletter) — no human activity of note. |

Trello: John Yi, Elliott, MPFC, Marcel, Raymond ✓ complete. Rory, Aysar, Franc ⚠️ skipped (alerts #2/#3/#5).

---

## Discord — AirAgri + Bizurk — 07:24 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 14 | Vinn posted daily report 07-31 12:43 (employee accounts, KMZ export fix, sensor assignment fix). Brett's hazard-overdue bug report (00:31) — see Alert #6. James Diamond (.jdiamond) active on visitor-app testing coordination. No Jeff Trinh activity this window. |
| Bizurk (nuscarrick) | 0 | Clean, token valid, no Andrew DMs. |

Trello: Andrew Taraba ✓ complete. James Diamond - Vinn task ⚠️ skipped (Alert #6, hours unverifiable — Workstream down).

---

## Scrin.io (Nick @ John Yi company account — 2026-08-02) — 07:26 (+07:00)

0h — no sessions recorded (Sunday, non-workday, expected). Not TuanNT evidence.

---

## Sheets/Workstream — task-log hours — 07:30 (+07:00)

🔴 **Workstream unreachable this entire run** (3 attempts, all hung on SSO with no interactive session — see Environment note above). Google Sheets fallback for 2026-07-31 (Friday):

| Developer | Sheets-only (07-31) | Status |
|-----------|---------------------|--------|
| LongVV | 0h (no week tab found for CharlesChang; other sheets 0) | **Unverified** — Workstream down, not evidence of shortfall |
| PhucVT | 0h | **Unverified** — Workstream down (Portfolio-James Diamond hours live there) |
| TuanNT | 8h (Paturevision/Bailey) | OK — combined >0h, no alert |
| KhanhHH | 0h | **Unverified** — Workstream down |
| LeNH | 0h | **Unverified** — Workstream down |

Sat 08-01 / Sun 08-02: non-workdays, 0h expected/normal for all 5.

**Maddy JIRA cross-check:** could not complete this run — `maddy-jira-tasklog-check.js` reads a known-stale abandoned Google Sheet (see [[feedback_maddy_jira_weekly_check]]) and the live Workstream cross-check was unreachable. Substituted signal: kai@ email showed 9 JIRA mention notifications on LIFM2-449/450/454 this window, and Xtreme Slack shows an unanswered customer ask (Alert #4) — treat Maddy as needing follow-up, not clean.

No reminders sent (0h readings this run are not reliable evidence per Workstream-down policy).

---

## Fountain — 3-part check — 07:32 (+07:00)

**Part 1 — Matrix plan:** Checked room `!EWnVDAxbTGsBxPkaaI` (aka "Kunal - Fountain") back through 07-27 — no "Em update plan tuần này ạ" message found from @trinhmtt. Today is Monday before 09:30 so this week's plan may not have posted yet; but last week's (W of 07-27) plan also never appeared, consistent with weekly report's note that Fountain plan-posting has lapsed multiple weeks running.

**Part 2 — Task log actuals:** Workstream (primary source, project `fountain`) unreachable this run. Fallback Sheet (`1iIKfjAh...`) confirmed abandoned — Summary tab shows 0.00h for every week from W29 (Jun 1) through W38 (this week), consistent with the team having fully moved to Workstream with no equivalent replacement for this sheet. **Actuals could not be verified this run.**

**Part 3 — Plan vs actual:** Cannot compute — no plan (Part 1) and no actuals (Part 2) this run.

**Qualitative signal (Matrix room, real activity observed):** ViTHT, ThinhT (vitht/thinht), datnt, hungpn, vutq actively working PRs/bugs 07-31 (button double-add-to-cart fix, blank-page Infinity fix, PR #463 rollbar fix merged). Devs are clearly active even though hour totals can't be confirmed.

**Trello board (customer comments / stuck cards):** 0 new customer comments (kunalsheth/tmmckay/mike62798179/iris63293413) in window. Active counts: todo=24, bugs=15, doing=7, qc_internal=5, qa_backlog=6, in_qa=3, not_passed=0. No "doing" cards ≥14 days (max is 19 days for one Rollbar investigation card... actually max in doing is 19d — flagging: `[infinity Roses] [Rollbar] Investigate Apple Pay U...` at 19 days is past the 14-day hard-to-release threshold). Large pre-existing "todo"/"bugs" backlog (chronic, unchanged pattern, some cards 200-485 days stale) — not new this run.

Trello: Fountain ⚠️ skipped (Part 1 + Part 2 unverifiable this run).

---

## Elena — PRs / Deploy / Precognize / WordPress — 07:15-07:20 (+07:00)

- **Internal repo** (`nustechnology/Elena-SamGuard-Digital-Plant`, duongdn account): 0 open PRs. Nothing to merge/deploy.
- **Precognize** (`Precognize/development`, nusken account): 8 open PRs, all from other contributors (Vladimir-precog, majdhajjo08, nustom, briannus, nus-aron) — 0 open PRs from nusken. Nothing to push.
- **WordPress SamGuard:** 🔴 **https://www.samguard.co/ returns HTTP 500 Internal Server Error** — confirmed via `wordpress-samguard-check.js` (jsErrors: 2x "500 Internal Server Error") and independently via `curl -I` twice 3 seconds apart, same result both times. No SSH key configured in this environment to pull Apache/PHP error logs for root-causing (password-only creds in config, no `sshpass` installed, key-based auth rejected). **This needs manual investigation** — see Alert #1.

Trello: Elena - SamGuard Digital Plant ✓ complete (dev/PR side clean). Elena - WordPress SamGuard ⚠️ skipped (Alert #1, site down).

---

## Matrix — 07:14 (+07:00)

**Active rooms: 19 / 138 | Messages: 514** *(since 2026-07-31 07:31)*
Full details: `reports/2026-08-03/matrix-rooms-0714.md`

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| Delivery - Resource Arrangement | 07-31 23:50 | namtv: "Chắc confirm Chiến, nhưng anh nghĩ chắc ráng nói ổng move ra ngoài, nói rõ rate thấp, thêm phí Upwork nữa thì khó cho tao, mày cũng sẽ tiết kiệm được một khoản phí Upwork charge phía client." — internal negotiation re: moving a contractor off Upwork, resolved same thread by 08-01 14:15 (anhnvn confirmed messaged the contractor). |
| Delivery Department | 07-31 21:46 | namtv: weekly dev plan for week of 3/8 (Aug 3) — SamHT 10h Unito + AI showcase; TienND/PhucVT some hours on Arthur, Brad, Celine (OhCleo) — informational, resourcing plan for this week. |

### Key updates

**Celine/OhCleo** (111 msgs, most active room): LongVV forgot end-of-day report once (07-31, addressed same day, apologized/fixed). Celine wants the email-automation flow released by **Monday (today)** — blocked on an "Anonymous user (email captured via popup)" feature not yet built as of 07-31 17:35; LongVV flagged this may slip the Monday deadline. Watch for today.

**Elena - Active Alerts** (96 msgs): normal dev/QA back-and-forth on socket/audit-log bugs (kietnht/duyvna/trinm/anhttl/tuanntg) — no client-facing issue, all resolved or handed to FE for follow-up by EOD 07-31.

**Arthur - Meta-Stamp** (18 msgs): TienND shared an IP-agreement doc from Chris in a new Slack channel; namtv confirmed M3 was deployed per scope; PhucVT deployed P2-7 to staging and re-tested, notified the client. No open client question.

**Kunal - Fountain** (28 msgs): see Fountain section above.

**Other:**
- Bailey - BA/QC / Management: routine payment/billing note reconciliation, no issues.
- Brad Ballantine - Auction Warehouse: PhucVT flagged client slow to respond, duongdn confirmed a new Upwork task exists — informational.
- NUS Technology (173 msgs): internal trivia/team-building event, not work-relevant.
- Đội 2 / Những chú voi con đáng yêu: social chatter, not work-relevant.

---

## OhCleo Slack — 07:26 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 10 | Celine (08-02 19:12): "for tomorrow, you can start working on the things in the priority, I will set my head into the e-mail automations." Tony's daily report present 07-31 12:00 (support ticket, UI update, automations flow check). |
| #events-code | — | `channel_not_found` — channel may have been renamed/removed; historically dormant since 2023, not treated as blocking. |

Tony daily report: present 07-31 12:00. No customer complaint unanswered (Celine's message is a same-day handoff, not yet due).

Trello: Ohcleo ✓ complete.

---

## Arthur / Meta-Stamp — 07:20-07:25 (+07:00)

Partial verification this run: **Matrix (2/2 rooms) + GitHub (davidztv, 0 open PRs / 0 commits since window start)** verified clean. Slack "Solid Code" workspace still absent from `config/.slack-accounts.json` (same longstanding gap). Workstream Crystal-lang hours unreachable (session-wide outage this run, see Environment note).

Content (Matrix): TienND shared an AI-IP-agreement doc from Chris for review in a new channel; namtv confirmed M3 deployed per scope; PhucVT deployed P2-7 to staging, re-tested, notified client. No unresolved client-facing question found in the 2 verified rooms.

Trello: Arthur - Meta-Stamp ✓ complete (per established 2/4-source partial-verification precedent — no new unresolved issue found in verified sources).

---

## Performance / New Relic APM — 07:28 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.93 | 345ms | 2.4% (1625/67183) — ~90% benign NotAuthenticated/InvalidToken | 15.6/min |
| MPFC | 0.57 (poor) | 1084ms | 0.24% (276/116071) | 26.9/min |
| Fountain Gifts | 0.99 | 101ms | 0.002% (2/97053) | 22.5/min |
| InfinityRoses | 0.98 | 145ms | 0.003% (1/35591) | 8.3/min |

**OhCleo top errors:** NotAuthenticated (1467), InvalidToken (41), AuthenticationFailed "User does not exist" (27), ValidationError duplicate email/username (20+19+13), "Passwords don't match" (9), invalid bcrypt hash (8) — all known/benign classes, no new signature.
**OhCleo slow transactions:** `MediaByKeyView.get` 8263ms/865 calls (chronic, unresolved for weeks), `HomeMediasView.get` 2218ms/1581, `GetBookMarkDetailsView.get` 1484ms/1729, `CreatorPayoutHistoryView.get` 1295ms/1 call, `ValidatePurchaseView.post` 1168ms/9.

**MPFC top errors:** `WP_Error::get_method()` fatal — 218x this window (long-standing unresolved bug, hit 1000th total occurrence per rick@ email alert), `"continue" targeting switch` warning 30x, `count(): Parameter must be array` 7x, `mysqli_real_connect` DNS failures 10x (transient), 1 new: `Class 'MM_Event' not found` 2x (functions.php:3739), 1 `E_COMPILE_ERROR` missing legacy-widget.php 1x.
**MPFC slow transactions:** `author-sitemap.xml` 53.8s/1 call, `sitemap_index.xml` 42.4s/2 calls, 3 podcast pages 31-32s each — no SQLi WAITFOR DELAY probes observed this window (improvement vs recent history).

**Fountain top errors:** same `ArgumentError wrong number of arguments` 2x (known, tapering). Slow: `admin/product_catalogs/import_csv` 101s/1 call (likely a real one-off bulk import, not a bug), `gifts/all` 6.5s/1.
**Infinity top errors:** 1 `NoMethodError` (nil.id) in paypal authorize flow, 1x. Slow: `paypals/authorize_order` 2.8s/5, `payment_intents/create` 1.5s/6.

No new alarming error classes this window; MPFC `WP_Error::get_method()` remains the dominant unresolved issue.

---

## Trello — 07:33 (+07:00)

**Check mail:** 6/6 complete, card auto-closed.

**Check progress:** 14/22 complete.
- ✓ Complete: John Yi, Elliott, MPFC, Marcel, Elena-SamGuard Digital Plant, Raymond-LegalAtoms, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Ohcleo, Arthur-Meta-Stamp, Blair Brown-Peptide Clyde.
- ⚠️ Skipped (real findings): Maddy (Alert #4), James Diamond-Vinn (Alert #6, hours unverifiable), Rory (Alert #3), Aysar (Alert #5), Franc (Alert #2), Fountain (Alert #10), Philip (Alert #11, MS Teams check failed twice), Elena-WordPress SamGuard (Alert #1, site down).

Neural Contract completed per "access-block ≠ alert" policy: carrick's Upwork Chrome-profile cookie extraction returned 0 cookies across 4 retries (session logged out on that profile), no prior known issue existed, so treated as access-block not a real alert.

---

## Reminders — 07:30 (+07:00)

No reminders sent. 0h readings this run for LongVV/PhucVT/KhanhHH/LeNH are a byproduct of Workstream being fully unreachable, not verified shortfalls — sending a reminder on this basis risks a false accusation (documented past incident: KhanhHH 2026-07-09). TuanNT confirmed 8h (Paturevision), no reminder needed.

---

## Unresolved questions

1. samguard.co 500 error (Alert #1) — needs a human with SSH key access or web-host control-panel access to investigate; this environment has no working credential for that server.
2. Fountain weekly plan has now been missing multiple weeks running — worth confirming with @trinhmtt directly whether this is intentional (process changed) or an oversight.
3. Workstream SSO has now failed 6+ consecutive cron runs over the past 10 days — may be worth a one-time interactive re-auth outside of cron hours to refresh whatever session/cookie state the headless flow depends on.
