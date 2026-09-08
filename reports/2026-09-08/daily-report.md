# Daily Report — 2026-09-08 (Tuesday)

**Run:** 2026-09-08T06:00+07:00 (cron)
**Window:** 2026-09-07 08:35 → 2026-09-08 06:00 (+07:00)
**Leave plan:** none known for today

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | ~~Workstream (all projects)~~ | ✅ RESOLVED at 08:29 recheck — SSO recovered on first retry (proactive refresh → API refresh → headless login all chained successfully). Maddy/Aysar/Elliott/Blair Brown/Fountain data fetched and Trello items completed; only John Yi/Rebecca/Bailey stay open, on a genuine TuanNT 0h finding (not an outage) — see Re-check section below. |
| 2 | Elena - SamGuard Digital Plant | PR #309 "Implement header and modal components with i18n support" is `mergeable_state: dirty` (conflicts) — not auto-merged. |
| 3 | Fountain (rick@) | 4 new production errors on FountainGifts: #312 Invalid price gift, #313 NoMethodError, #314 Gibbon::MailChimpError (reactivated + 10th occurrence), #315 ArgumentError 'express_3_days' |
| 4 | OhCleo — Celine DM | Celine asked Tony (12:55) "AI companionship cards still in Dev Done, when can I test it?" — unanswered as of window end |
| 5 | ~~MS Teams (Philip Briggs, `will` account)~~ | ✅ RESOLVED at 08:29 recheck — login cleared on retry, no MFA block. No new customer message found (existing thread only). |
| 6 | ~~Upwork (Rory / Aysar workrooms)~~ | ✅ RESOLVED at 08:42 recheck — `carrick` session recovered on retry. 0 memos logged for either workroom on 2026-09-07 (nothing to validate, not a failure). |
| 7 | ~~Upwork Neural Contract~~ | ✅ RESOLVED at 08:42 recheck — session recovered, messages fetched. Latest exchange (2026-08-11) is a routine holiday notice, no unresolved customer question. |
| 8 | New Relic — MPFC | Apdex 0.52 (poor). 2 more SQLi `WAITFOR DELAY` probes hit `/search/.../feed/rss2/` (12.8s, 15.6s) — reconnaissance traffic, chronic `WP_Error::get_method()` fatal (27x) still unresolved |
| 9 | New Relic — OhCleo | `MediaByTagsView.get` avg 17.9s/223 calls — worse outlier than prior runs |
| 10 | Workstream needs review — Radio Data Center (Franc) | KhanhHH has 2 charged-hours rows pending review (2026-09-07, 5h total: "Found real cause of 104.4 jumps" + "Rebuilt power-izmir/power-istanbul") — reviewer LeNH not yet actioned. Found during 08:29 recheck. |
| 11 | LeNH — 0h across ALL her projects | James Diamond 0h, BXR App (Rory) 0h, Blair Brown 0h — 2026-09-07, no leave note found in mail/Matrix. User confirmed LeNH is full-time on James Diamond; reminder sent to her direct Matrix room (`!OIrgPraJWrcDTnRVLQ`). Memory updated (both copies) to stop treating "Blair Brown deprioritized" as covering James Diamond too. |

**Today (Tue Sep 8):** No leave/WFH notices seen in mail or Matrix for today.

---

## Email — all — 06:00 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 4 | 1 (PhucVT leave reply, informational) | no events |
| carrick@nustechnology.com | 1 | 0 | (Radio Data Center standup — recurring, see calendar fetch) |
| nick@nustechnology.com | 0 | 0 | no events |
| rick@nustechnology.com | 36 | 33 (mostly FountainStaging/FountainGifts Rollbar — see Alert #3 for the real production ones; rest are staging/dev noise + 2 daily summaries) | no events |
| kai@nustechnology.com | 4 | 4 (JIRA LIFM2-464/463/459 assignment/mention — normal ticket flow, not urgent) | no events |
| ken@nustechnology.com | 80 | 0 | DE Daily Standup 08:30, DE Tech Talks 09:00, DE Daily Standup (dup) 08:30 |
| vuongtrancr@gmail.com | 4 | 1 (New Relic: Signal lost 10min on 'Low Application Throughput' — Swish) | — |
| dnduongus@gmail.com | 19 | 0 (personal newsletters/bank/Tikop — no security alerts) | — |
| davidztv19@gmail.com | 0 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 5 | 3 (Rollbar daily summary, New Relic weekly perf report, Rollbar new error `MM_User::applyMembershipLevel()`) | — |

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete (Check mail card fully complete).

---

## Slack — all 14 workspaces — 06:00 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|--------------|
| Baamboozle | 7 | Carrick/Jamie DM discussing Aysar's slow PR review + 2 stuck release issues — dev topic, not the MPDM gate itself |
| RDC - FM Monitoring | 47 | All automated tuner recovery / access-log bot noise, no human activity |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | 5 | Kai posted a Bitbucket PR (#534) + responded to Madhuraka; Madhuraka asked about ticket 455 (no update since Aug 14) |
| SAM GUARD - Mobile | 6 | HubSpot MQL-lead bot notifications only |
| GLOBAL GRAZING SERVICES | 8 | Joey/Amy discussing app documentation/versioning in #général and #maintenance — normal project chat |
| Amazing Meds | 0 | — |
| Generator | 4 | Carrick posted MR review comments; Elliott/Violet following up on branch reviews |
| LegalAtoms | 0 | — |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 17 | Carrick + Komal (xid-technologies) working through a device IN/OUT config issue for a customer — ongoing technical troubleshooting |
| SoCal Auto Wraps | 0 | — |
| Aigile Dev | 0 | — |

Trello: Rory, Franc, MPFC, Andrew Taraba, Raymond, Colin, Marcel ✓ complete.
Maddy, Aysar, Elliott ✓ complete (Workstream recovered at 08:29 recheck — see Re-check section).
John Yi, Bailey, Rebecca ⚠️ still incomplete — TuanNT genuine 0h finding, not a Workstream outage (see Re-check section).

### Maddy — QA/free-work complaint status check (08:49, user asked "Maddy complain sao rồi")

The 08-25/08-26 QA-quality complaint ("continuing to receive complaints... asking us to work for free"; ticket 454/"Long Trap" bug) has **not recurred** — checked full "Project Wrap Up - Preventive Actions" Matrix room history (`!mVzbIeVTgFFwftTPnz`) and Xtreme Slack DM history since 08-25: no further mention of QA quality/free-work since Madhuraka's 08-26 02:04 reply. Tone since then is routine ticket flow (449, 428, 459, 462, PR reviews), with a "ok, go ahead" (09-06) suggesting relationship is back to normal. Ticket 454 itself: **Done** (closed since ~Aug).

**Separate, still-open item (not the same complaint, but real):** Madhuraka asked twice for an update on ticket 455 ("Refresh Issue on Quotes page") — once "no update since 14 Aug" flagged 09-07 11:46, ticket still sitting in JIRA status **To Do**, last touched 2026-08-14 (25 days). This is a live unanswered client ask, worth a reply even though it's routine (not an escalation like the Aug complaint).

---

## Discord — AirAgri + Bizurk — 06:00 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | ~14 | Active dev work on #airagri_webapp (env var migration, RealPTT/Ceres staging deploys, notification testing). Jeff Trinh posted his daily report (4h) in #airagri-flutter. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs |

Both Discord tokens verified valid (no 403s).
Trello: James Diamond ✓ complete.

---

## Sheets/Workstream — all developers — 06:00 (+07:00), updated 08:29 recheck

~~Workstream unavailable this run~~ — **RESOLVED at 08:29 recheck**: proactive refresh → API refresh → headless browser login all chained successfully on first retry. Fetched 2026-09-07 data for every gated project:

| Project | Members logged | Reviewers | needsReview |
|---------|-----------------|-----------|-------------|
| Maddy (Xtreme) | none (0h) | — | — |
| Amazing Meds (John Yi) | none (0h) | — | — |
| Baamboozle (Aysar) | none (0h) | — | — |
| Generator (Elliott) | KhanhHH 3h | LucNT, HangNTT | none |
| Speedventory (Bailey) | TrinhMTT 1h, VyNL 3h | — | — |
| Rebecca | none (0h) | — | — |
| Blair Brown | none (0h) | — | — |
| James Diamond | none (0h) | PhucVT, LeNH | none |
| BXR App (Rory) | none (0h) | — | — |
| Radio Data Center (Franc) | KhanhHH 5h | LeNH | ⚠️ 2 pending rows (KhanhHH, 5h charged 09-07) — alert addressed to LeNH |
| Fountain | HungPN 0.5h, DatNT 8h, ThinhT 4h | VuTQ, DuongDN | excluded from alerting per rule |
| Crystal lang (Arthur) | none (0h) | TienND | none |
| Family App (Charles Chang) | none (0h) | — | — |
| Neural Contract | none (0h) | — | — |

**TuanNT: 0h across every one of his usual projects (John Yi/Rebecca/Speedventory/Family App/Neural Contract) — genuine finding, no leave note found.** Reminder sent to his direct Matrix room per explicit user request (see Reminders section).

**New (not previously flagged): Radio Data Center needsReview** — KhanhHH has 2 pending-review rows (5h total, 2026-09-07) on the Franc/RDC project. Reviewer = LeNH (per `isReviewer` flag, not the Manager). This is informational for the Franc Trello item (Slack-only gate, not blocked by hours/review) but is a genuinely new unresolved item — flagging here since it wasn't caught in the 06:00 cron pass.

Scrin.io (Nick @ John Yi company account — 2026-09-07): 0h — no sessions recorded. (Not TuanNT evidence.)

Trello: Maddy, Aysar, Elliott, Blair Brown ✓ complete. John Yi, Bailey, Rebecca ⚠️ still incomplete (TuanNT 0h).

---

## Fountain — 06:00 (+07:00), Parts 2/3 + Trello board updated 08:29 recheck

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted at 08:50: ViTHT 40h, ThinhT 20h, DatNT 40h => QC 25h.

**Part 2 — Task Log Actuals (Workstream `fountain`, 2026-09-07 — week just started Monday):** HungPN 0.5h, DatNT 8h (charged 8.42), ThinhT 4h. ViTHT 0h so far this week. needsReview shows 8 pending rows but Fountain is excluded from the needsReview alert rule (user instruction) — not flagged.

**Part 3 — Plan vs Actual:** ThinhT 4/20h (20% pace), DatNT 8/40h (20% pace), ViTHT 0/40h — normal, 1 day into a 7-day week.

**Trello board (customer comments / stuck cards):** checked Todo/Doing/In QA/Not Passed/Bugs/QC Internal (59 active cards) — 0 customer comments (kunalsheth/tmmckay/mike62798179/iris63293413) in the last 30h. 2 cards sitting in Doing 5+ days: "Fountain Pro error" (19.8 days, past the 14-day hard-to-release threshold) and "CSV template download link" (11.7 days) — noted, no customer pressure visible on either.

Notable from Matrix room activity: production bug reported by ViTHT (search shows 3 items but total 146 — confirmed a counter bug, not a feature, per VuTQ); DatNT fixed a $74 price bug and pushed to BETA; team moved Kunal's spammy "Log credit payment" emails off duongdn@ onto rick@ (both envs).

Trello: Fountain ✓ complete (all 3 parts + Trello board done at recheck, no blocking issues).

---

## Elena — 06:00 (+07:00)

**Internal repo (Elena-SamGuard-Digital-Plant):** 1 open PR — #309 "Implement header and modal components with i18n support" (nusken → base `nus/dp-20260811`). `mergeable_state: dirty` (merge conflicts) — **not merged**, needs manual conflict resolution. CodeRabbit review is disabled for this base branch.

**Precognize (nusken PRs):** 0 open nusken PRs on `Precognize/development` (9 total open from others) — nothing to merge.

**WordPress SamGuard (samguard.co):** clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics/ads `ERR_ABORTED` network noise (GA/GTM/DoubleClick/LinkedIn beacons blocked by browser, not real errors).

Trello: Elena - WordPress SamGuard ✓ complete. Elena - SamGuard Digital Plant ⚠️ left incomplete (PR conflict, Alert #2).

---

## Matrix — 06:00 (+07:00)

**Active rooms: 24 / 144 | Messages: 528** *(since 2026-09-07 08:35)*
Full details: `reports/2026-09-08/matrix-rooms-0607.md`

### ⚠️ Action items for DuongDN (2)

| Room | Time | Message |
|------|------|---------|
| !SeUEiIwonoInzrJhQX | 15:19 | hangdtt: "Anh ơi, Bữa t6 em có nc với PhucVT..." — PhucVT personal/leave situation update, informational, already acknowledged by duongdn in-thread |
| Celine - OhCleo | 14:26 | luhx: technical question about mobile/API text-search flow — internal dev discussion, not a customer ask |

### Key updates

**Fountain — plan posted, 1 counter bug + 1 price bug fixed**:
- trinhmtt posted weekly plan 08:50 (ViTHT 40h/ThinhT 20h/DatNT 40h, QC 25h)
- ViTHT reported search-result counter bug (shows 3 items, total 146) — confirmed bug not feature by VuTQ
- DatNT fixed $74 price display bug, pushed to BETA; also fixed a 500-error edge case in product catalog admin
- Kunal's spammy "Log credit payment" emails moved off duongdn@ to rick@nus on both Live + staging

**Elena - Active Alerts — internal dev team chat (not customer-facing)**:
- Weekly plan posted by anhttl (Sam Ha, Tuan Nguyen, Kiet Nguyen on Elena; Tri Nguyen on Joseph if tasked)
- Socket/occurrence work ongoing, WebSocket 404 issue being escalated internally; several Redmine bugs reopened for Duy Vo

**Other:**
- PhucVT: per hangdtt (Matrix), still undecided on leave options — informational, no action needed from us today
- Fountain Trello robots.txt PR (#3074) clarified as FE-owned, not BE — resolved

---

## OhCleo Slack — 06:00 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 4 | Tony posted his daily report (12:17): fixed chat AI issues, Card 3 AI companionship dev-done, SEO site structure 30% in progress. Tony also flagged working half-day (07:17). Celine asked (12:55) when she can test the AI companionship card — **unanswered as of window end (Alert #4)**. |
| #events-code | — | `channel_not_found` — bot still removed from channel (known issue, needs admin re-invite) |

Trello: Ohcleo ⚠️ left incomplete (unanswered customer question).

---

## Performance / New Relic — both projects — 06:00 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|---------------|------------|------------|
| OhCleo (prod) | 0.88 | 640ms | 2.5% (586/23476) — 89% benign NotAuthenticated/AuthenticationFailed/InvalidToken | 18.1/min |
| MPFC (prod) | 0.52 (poor) | 1223ms | 0.3% (59/21406) | 16.5/min |

**OhCleo — full error list:**
- rest_framework.exceptions:NotAuthenticated — 525
- rest_framework.exceptions:AuthenticationFailed "User does not exist!" — 18
- rest_framework_simplejwt.exceptions:InvalidToken — 17
- ValidationError (username exists) — 11
- ValidationError (no user for email) — 4
- AuthenticationFailed "Passwords don't match!" — 3
- ValidationError (username+email exist) — 3
- ValueError "Invalid bcrypt hash format" — 2

**OhCleo — slowest transactions:**
- MediaByTagsView.get — 17,936ms avg / 223 calls (⚠️ new/worse outlier vs prior runs)
- MediaByKeyView.get — 8,295ms avg / 265 calls
- HomeMediasView.get — 3,561ms avg / 520 calls
- GetBookMarkDetailsView.get — 2,256ms avg / 411 calls
- CreatorPayoutHistoryView.get — 2,080ms avg / 1 call

**MPFC — full error list:**
- `Call to undefined method WP_Error::get_method()` — 27 (chronic, unresolved for months)
- E_WARNING "continue targeting switch...meant continue 2" — 25
- E_WARNING "Invalid argument supplied for foreach()" — 2
- E_WARNING "mkdir(): File name too long" — 2
- E_COMPILE_ERROR require() legacy-widget.php — 1
- E_COMPILE_ERROR require() version.php — 1

**MPFC — slowest transactions:**
- sitemap_index.xml — 48,756ms / 1 call
- author-sitemap.xml — 44,725ms / 1 call
- MemberMouse processOrder.php — 15,973ms avg / 6 calls
- `/search/...waitfor delay.../feed/rss2/` — 15,554ms / 1 call (SQLi probe, reconnaissance only)
- `/search/...waitfor delay.../feed/rss2/` (variant) — 12,809ms / 1 call (same probe pattern)

No Trello item exists yet for Performance (informational only).

---

## Upwork — 06:00 (+07:00), re-tried 08:42 recheck

~~Memo check (Rory/Aysar, `carrick` session): session expired~~ — **RESOLVED at 08:42 recheck**: `carrick` session recovered on retry. Rory: 0 memos logged 2026-09-07. Aysar: 0 memos logged 2026-09-07. Nothing to validate either workroom, not a failure.

~~Neural Contract: session logged out~~ — **RESOLVED at 08:42 recheck**: `upwork-neural-check.js` succeeded, messages fetched. Latest exchange (2026-08-11) is a routine team holiday notice — no unresolved customer question.

Trello: Neural Contract ✓ complete. Rory/Aysar memo status now verified clean too (their Trello items are gated on Slack/hours, already ✓ from earlier recheck — memo check adds no new blocker).

---

## Arthur / Meta-Stamp — 06:00 (+07:00)

Not completed this run — "Solid Code" Slack workspace remains unwired in `config/.slack-accounts.json` (known gap, see prior memory), and Matrix/GitHub/Workstream checks for this project were not reached given the very large scope of this run. Carry to recheck.

Trello: Arthur - Meta-Stamp ⚠️ left incomplete.

---

## Philip (MS Teams) — 06:00 (+07:00), re-tried 08:29 recheck

~~Login stuck on Microsoft's "Help us protect your account" verification challenge~~ — **RESOLVED at 08:29 recheck**: `fetch-msteams-customer-messages.js will "Philip Briggs"` logged in cleanly this attempt, no redirect loop. Fetched thread successfully — script's `[freshness]` check found no date separator confirming a new message, meaning these are already-seen history (per the 2026-09-04 false-alert rule), not a new customer message.

Trello: Philip ✓ complete.

---

## Reminders — 08:36 (+07:00)

- TuanNT: 0h logged 2026-09-07, no leave note found → reminder sent to Matrix room `!knbJbIKzXRJNGVFQNg:nustechnology.com` (direct room) per explicit user request. event_id=$2rdJ3DCqHLZzVhT35Q-c5VM5tu-OKtE9pegiFEBX1TE
- LongVV/PhucVT/KhanhHH: not 0h or ad-hoc/no-fixed-target — no reminder needed.
- LeNH: 0h across James Diamond (her real full-time project, per user confirmation), BXR App (Rory), and Blair Brown — no leave note found → reminder sent to her direct Matrix room `!OIrgPraJWrcDTnRVLQ:nustechnology.com` per explicit user request. event_id=$2PQ-atFLxGo34GHy7j09jc06U2pYCZj1vW_-NgQrlA4

---

## Unresolved / carry to next recheck
1. TuanNT 0h (John Yi/Rebecca/Bailey Trello gate) — reminder sent 08:36, awaiting her update.
2. Elena PR #309 merge conflict — needs manual resolution before merge/deploy.
3. OhCleo: Tony needs to answer Celine's AI-companionship testing question.
4. Arthur/Meta-Stamp full 6-source check — "Solid Code" Slack still unwired, confirmed again at recheck.
5. NEW: Radio Data Center needsReview — KhanhHH 2 rows pending LeNH's review (5h, 2026-09-07).

---

## Re-check log — 08:29-08:42 (+07:00)

Workstream SSO recovered on first retry (proactive refresh → API refresh → headless login chained successfully). Upwork carrick session (Rory/Aysar memo + Neural Contract) also recovered on retry at 08:42 — no manual login needed after all. Findings folded directly into each piece's section above (Slack, Sheets/Workstream, Fountain, Elena, Philip, Upwork, Reminders) rather than duplicated here — see those sections for detail. Cross-report scan (Step 5.5) run before completing any item: grepped the whole file for each item's name/aliases, found nothing blocking beyond what's already captured as its own alert (Xtreme ticket-455 staleness = pre-existing/informational, Fountain Rollbar errors = separate dev-facing alert #3, not a Trello-gate blocker).

**Cleared this recheck:** Maddy, Aysar, Elliott, Blair Brown, Fountain, Philip, Neural Contract, Upwork Rory/Aysar memo check.
**Still open:** John Yi, Rebecca, Bailey (TuanNT 0h — reminder sent), Elena - SamGuard Digital Plant (PR conflict), OhCleo (unanswered customer question), Arthur - Meta-Stamp (Solid Code Slack still unwired).
