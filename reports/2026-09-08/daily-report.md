# Daily Report — 2026-09-08 (Tuesday)

**Run:** 2026-09-08T06:00+07:00 (cron)
**Window:** 2026-09-07 08:35 → 2026-09-08 06:00 (+07:00)
**Leave plan:** none known for today

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Workstream (all projects) | SSO/browser-login outage again — token refresh + 2x headless browser login attempts all failed (recurring pattern, root cause still open per prior reports). No dev-hours data available this run for Maddy/John Yi/Aysar/Elliott/Bailey/Rebecca/Fountain/Blair Brown. |
| 2 | Elena - SamGuard Digital Plant | PR #309 "Implement header and modal components with i18n support" is `mergeable_state: dirty` (conflicts) — not auto-merged. |
| 3 | Fountain (rick@) | 4 new production errors on FountainGifts: #312 Invalid price gift, #313 NoMethodError, #314 Gibbon::MailChimpError (reactivated + 10th occurrence), #315 ArgumentError 'express_3_days' |
| 4 | OhCleo — Celine DM | Celine asked Tony (12:55) "AI companionship cards still in Dev Done, when can I test it?" — unanswered as of window end |
| 5 | MS Teams (Philip Briggs, `will` account) | Login stuck on Microsoft "Help us protect your account" verification challenge for 20+ redirect loops — could not check for new customer messages this run, needs manual verification |
| 6 | Upwork (Rory / Aysar workrooms) | Memo check: `carrick` session expired, live-cookie + headless re-login both failed — memo validity not checked this run |
| 7 | Upwork Neural Contract | `carrick` Chrome Profile 1 session appears logged out — all 4 auto-retry attempts hit login redirect |
| 8 | New Relic — MPFC | Apdex 0.52 (poor). 2 more SQLi `WAITFOR DELAY` probes hit `/search/.../feed/rss2/` (12.8s, 15.6s) — reconnaissance traffic, chronic `WP_Error::get_method()` fatal (27x) still unresolved |
| 9 | New Relic — OhCleo | `MediaByTagsView.get` avg 17.9s/223 calls — worse outlier than prior runs |

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
Maddy, John Yi, Aysar, Elliott, Bailey, Rebecca ⚠️ left incomplete — gated on Workstream dev-hours which is down this run (see Alert #1).

---

## Discord — AirAgri + Bizurk — 06:00 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | ~14 | Active dev work on #airagri_webapp (env var migration, RealPTT/Ceres staging deploys, notification testing). Jeff Trinh posted his daily report (4h) in #airagri-flutter. |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs |

Both Discord tokens verified valid (no 403s).
Trello: James Diamond ✓ complete.

---

## Sheets/Workstream — all developers — 06:00 (+07:00)

🔴 **Workstream unavailable this run** — token refresh + 2x proactive browser-login (headless and DISPLAY=:1) all failed with SSO/timeout errors. This matches the recurring Workstream SSO outage pattern documented in prior weekly/daily reports (root cause still open on the vendor/infra side). Since Google Sheets task-log was fully retired 2026-08-21 (all projects moved to Workstream), there is no fallback source this run — dev-hours data for LongVV/PhucVT/TuanNT/KhanhHH/LeNH/Bailey is **unavailable**, not 0h. Do not treat as a shortfall.

Scrin.io (Nick @ John Yi company account — 2026-09-07): 0h — no sessions recorded. (Not TuanNT evidence.)

Trello: John Yi, Bailey, Rebecca, Maddy, Aysar, Elliott, Blair Brown ⚠️ left incomplete pending Workstream recovery.

---

## Fountain — 06:00 (+07:00)

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted at 08:50: ViTHT 40h, ThinhT 20h, DatNT 40h => QC 25h.

**Part 2 — Task Log Actuals:** unavailable — Workstream project `fountain` down this run (Alert #1); Sheet fallback also retired.

**Part 3 — Plan vs Actual:** cannot compute without actuals — skipped this run, will recheck once Workstream recovers.

**Trello board (customer comments / stuck cards):** not checked this run due to time budget — carry to recheck.

Notable from Matrix room activity: production bug reported by ViTHT (search shows 3 items but total 146 — confirmed a counter bug, not a feature, per VuTQ); DatNT fixed a $74 price bug and pushed to BETA; team moved Kunal's spammy "Log credit payment" emails off duongdn@ onto rick@ (both envs).

Trello: Fountain ⚠️ left incomplete (Parts 2/3 + Trello board not done).

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

## Upwork — 06:00 (+07:00)

**Memo check (Rory/Aysar, `carrick` session):** session expired; live-cookie extraction + headless re-login both failed (`input[name="login[username]"]` selector not found). Memo validity not verified this run (Alert #6).

**Neural Contract:** `upwork-neural-check.js` ran all 4 built-in retries — every attempt hit a login redirect despite fresh cookie extraction from carrick's real Chrome. Real Chrome Profile 1 session likely logged out (Alert #7). Per rule, session/Cloudflare failure ≠ alert on hours — but memo validity genuinely unchecked.

Trello: Neural Contract ✓ complete (silence/session failure is not an alert per rule). Rory/Aysar memo status: not gating those items further beyond their existing Slack/hours gates (still incomplete on Workstream grounds above).

---

## Arthur / Meta-Stamp — 06:00 (+07:00)

Not completed this run — "Solid Code" Slack workspace remains unwired in `config/.slack-accounts.json` (known gap, see prior memory), and Matrix/GitHub/Workstream checks for this project were not reached given the very large scope of this run. Carry to recheck.

Trello: Arthur - Meta-Stamp ⚠️ left incomplete.

---

## Philip (MS Teams) — 06:00 (+07:00)

`fetch-msteams-customer-messages.js will "Philip Briggs"` — login stuck on Microsoft's "Help us protect your account" verification challenge for 20+ redirect loops before erroring on a detached frame. This is a genuine external MFA/verification block, not an internal token issue — needs a manual interactive login on the `will` Teams account outside of cron.

Trello: Philip ⚠️ left incomplete (Alert #5).

---

## Reminders — 06:00 (+07:00)

Not run this cycle — gated on Workstream/Sheets dev-hours data which is unavailable this run (see Alert #1). No reminders printed or sent.

---

## Unresolved / carry to recheck
1. Workstream SSO outage — recheck once recovered; then complete Maddy/John Yi/Aysar/Elliott/Bailey/Rebecca/Blair Brown Trello items and run Reminders.
2. Fountain Parts 2/3 + Trello board — needs Workstream.
3. Elena PR #309 merge conflict — needs manual resolution before merge/deploy.
4. OhCleo: Tony needs to answer Celine's AI-companionship testing question.
5. MS Teams Philip check — needs manual interactive login on `will` account (MFA challenge).
6. Upwork carrick session (Rory/Aysar memo, Neural) — needs a real interactive login in carrick's Chrome Profile 1.
7. Arthur/Meta-Stamp full 6-source check — not reached this run, "Solid Code" Slack still unwired.

---

## Re-check — 08:29 (+07:00)

Workstream SSO recovered this pass (proactive refresh → API refresh → headless browser login all chained successfully on first attempt). Re-ran all gated Workstream projects for 2026-09-07 (week just started Monday, so weekTotal = day total).

| Item | Result | Details |
|------|--------|---------|
| Maddy | ✓ completed | Maddy/Xtreme project: 0h logged (informational only, no shortfall rule for LongVV/ad-hoc). Kai-role report gate: 0h → skip check per rule. Slack Xtreme already clean (Kai posted PR + responded to Madhuraka). |
| Aysar | ✓ completed | Baamboozle project: KhanhHH 0h → MPDM silence NOT an alert (gate condition). KhanhHH logged hours elsewhere (Generator 3h, Radio Data Center 5h) — not idle, just not on Baamboozle today. |
| Elliott | ✓ completed | Generator project: KhanhHH 3h logged. Reviewers LucNT/HangNTT, needsReview empty. Slack Generator already clean. |
| Blair Brown | ✓ completed | 0h logged, but per [[feedback_lenh_james_diamond_blair_brown_deprioritized]] Blair Brown 0h is explicitly deprioritized (LeNH full-time on James Diamond) — not an alert. |
| John Yi | ○ still incomplete | TuanNT: 0h across ALL sources today (amazing_meds, rebecca, speedventory, family_app, neural_contract all show 0h/no TuanNT entries). No leave note found in mail/Matrix. Genuine 0h alert — blocks John Yi + Rebecca + Bailey per TuanNT gate rule. |
| Rebecca | ○ still incomplete | Same TuanNT 0h gate as John Yi (see above). |
| Bailey | ○ still incomplete | Same TuanNT 0h gate (speedventory itself has hours from TrinhMTT 1h + VyNL 3h, but TuanNT's own 0h blocks this item per rule). |
| Fountain | ✓ completed | **Part 2 (actuals, Workstream `fountain` project, 2026-09-07):** DatNT 8h (weekCharged 8.42), ThinhT 4h, HungPN 0.5h. needsReview has 8 pending rows but Fountain is excluded from the needsReview alert rule — not flagged. **Part 3 (plan vs actual):** weekly plan (ViTHT 40h/ThinhT 20h/DatNT 40h) vs day-1 actuals (ThinhT 4/20=20% pace, DatNT 8/40=20% pace, ViTHT 0h so far) — normal pace, 1 day into the week. **Trello board:** checked Todo/Doing/In QA/Not Passed/Bugs/QC Internal (59 active cards) — 0 customer comments in last 30h (kunalsheth/tmmckay/mike62798179/iris63293413 all silent). 2 cards in Doing >5 days ("Fountain Pro error" 19.8d — past the 14d hard-to-release threshold; "CSV template download link" 11.7d) — noted, not a new alert (no customer pressure on them). |
| Elena - SamGuard Digital Plant | ○ still incomplete | Re-checked live: PR #309 still `mergeable_state: dirty` — conflict unresolved, needs manual merge. |
| OhCleo | ○ still incomplete | Re-ran `slack-fetch-ohcleo.js` since 06:00 — 0 new messages in Celine DM. Celine's 12:55 question ("AI companionship... when can I test it?") still unanswered by Tony. |
| Philip (MS Teams) | ✓ completed | MFA challenge cleared this attempt (no redirect loop) — fetched thread successfully. Script's `[freshness]` check found no date separator confirming a new message; per rule (2026-09-04 false-alert incident) these are already-seen history, not a new alert. |
| Arthur - Meta-Stamp | ○ still incomplete | "Solid Code" Slack workspace still absent from `config/.slack-accounts.json` (checked directly — genuinely still unwired, not a token issue). Cannot complete the mandatory 4-source-minimum check without it. |

**Cross-report scan (Step 5.5):** grepped whole report for Maddy/Xtreme/Kai/Aysar/Baamboozle/Elliott/Generator/Fountain/Kunal/Philip/Blair Brown aliases — only pre-existing items found: (a) Xtreme "Madhuraka asked about ticket 455 (no update since Aug 14)" — long-standing/recurring client question, not new today, not blocking (consistent with original report treating it as informational, not an Alert Summary item); (b) Fountain production Rollbar errors (Alert #3) — separate from the Trello gate (dev-facing bug tracking, already captured as its own alert, doesn't block the Trello checklist item which is about customer comments/task tracking). No new blocking mentions found outside the mapped gate sources.

**Cleared:** Maddy, Aysar, Elliott, Blair Brown, Fountain, Philip
**Still open:** John Yi, Rebecca, Bailey (TuanNT 0h, no leave note), Elena - SamGuard Digital Plant (PR conflict), OhCleo (unanswered customer question), Arthur - Meta-Stamp (Solid Code Slack still unwired)
