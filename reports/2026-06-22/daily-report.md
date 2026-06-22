# Daily Report — 2026-06-22 (Monday)

**Run:** 2026-06-22 08:49 (+07:00), interactive — **corrected 09:38** (KhanhHH false alert fixed, see correction note)
**Window:** 2026-06-19 08:00 +07:00 (Friday) → 2026-06-22 08:49 +07:00 (Monday window rule applied)

> **Correction (09:38):** Initial KhanhHH alert was WRONG — missed a 4th task-log source (dedicated Elena sheet). KhanhHH's real Fri Jun19 total is 8.0h, not 2.5h. Elliott Trello item completed retroactively. See Sheets section + memory updates below.
**Leave plan:** No approved leave for any of the 6 monitored PHP devs (LongVV, PhucVT, TuanNT, KhanhHH, LeNH, VietPH) in this window. Cross-checked against Matrix "Delivery - Resource Arrangement" room — also clean (namtv's leave notes this window cover ThienVN/ThiHV/AnhNH2 only, none of the 6).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | ~~Sheets — KhanhHH~~ | **RETRACTED** — KhanhHH's real Fri Jun19 total is 8.0h (Generator 0h, Baamboozle-WS 2.5h, Colin/ETZ-WS 0h, **Elena sheet 5.5h** — AA-48/51/52 Active Alerts tickets, missed in initial check). No shortfall. **Elliott** now ✓ complete. |
| 2 | Sheets — LeNH | Fri Jun19 combined 7.33h vs 8h target (Rory 7.33h, Franc 0h, Rebecca Q-T 0h), 0.67h short, no leave note. |
| 3 | ~~Trello — Aysar~~ | **RETRACTED (10:10)** — the formatted "Today's update:" MPDM message was missing for Fri Jun19, but raw Slack history confirms Carrick was actively working on Aysar all day: deployed a fix 09:59, got PR #638 reviewed same time, responded to Jamie's live bug report at 17:15, fixed it at 21:15. Real work happened — just the end-of-day report ritual was skipped (likely because Carrick was still firefighting the client bug at that hour). **Aysar ✓ now complete.** |
| 4 | Trello — Fountain | This week's (W32) Matrix plan not yet posted as of 08:49 — expected window 08:30-09:30 +07. **Recheck after 09:30.** |
| 5 | Sheets — Maddy/JIRA | LIFM2-439 over-budget: est 12h, actual 21h30m (+9h30m). |
| 6 | Sheets — Maddy/JIRA | LIFM2-260 has no original estimate set despite 38h30m logged actual. |
| 7 | Email — rick@ | FirstProject production errors: #1037/#1038 IntegrationError (Jun19), #1039 ChunkLoadError (Jun20). |
| 8 | Email — vuongtrancr@gmail.com | Repeated New Relic "Signal lost for 10 minutes" (Swish, 14+ occurrences Fri-Mon) — recurring monitoring gap pattern. |
| 9 | Fountain — over-estimate | #2615 still +789.6% over (106.75h vs 12h est), plateaued since Jun19/21. #2595 +40.2% over (168.25h vs 120h), stable. Several previously-unflagged tasks newly surfaced this run (full list in Fountain section) — likely a previous report's parsing gap, not a sudden spike. |
| 10 | Email — carrick@ | Generator/Elliott: GitLab pipeline failure (stagingPhase2) + 3 Redmine bugs (#79164, #79370, #79283) — informational only, not a blocker (Elliott resolved per #1). |

**Today (Mon Jun22):** All 6 monitored devs present, no leave/WFH notes found.

---

## Email — all 9 accounts — 08:49 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 1 | N | none |
| carrick@nustechnology.com | 9 | Y — Redmine/GitLab (Generator) | none |
| nick@nustechnology.com | 22 | N | 21:30 Weekly Meeting w/ Devs |
| rick@nustechnology.com | 36 | Y — Rollbar production errors | 12:30 HEAL Meeting; 10:30 OmniGPT Daily Sync |
| kai@nustechnology.com | 13 | Y — JIRA mentions (informational) | none |
| ken@nustechnology.com | 80 | N — routine Precognize PR activity | 09:30 Martin<>Ken; 09:00 DE Retro; 08:30 DE Standup; 09:00 DE Tech Talks |
| vuongtrancr@gmail.com | 39 | Y — New Relic Signal lost (repeated) | n/a |
| dnduongus@gmail.com | 50 | N — noise only (1 security alert was for a different account, vansuongcr@gmail.com) | n/a |
| freelancer@mypersonalfootballcoach.com | 0 | N | n/a |

Gmail service-account key present and working (no OAuth2 invalid_grant reproduced today).

**rick@ alerts:** FirstProject prod errors #1037 (IntegrationError, Jun19 13:35 UTC), #1038 (IntegrationError, Jun19 19:12 UTC), #1039 (ChunkLoadError, Jun20 01:47 UTC). Also Stripe "unrecognised device" notice Jun19 12:59 UTC (out of normal filter scope, FYI only).

**carrick@ alerts:** GitLab `generator-api` failed pipeline (stagingPhase2, Jun19 04:18 UTC); Redmine Bug #79164/#79370/#79283 (Elliott - Generator Lifestyle).

**vuongtrancr@ alert:** New Relic "Signal lost for 10 minutes on Low Application Throughput" — 14+ times Fri19→Mon22.

Trello: Check Mail — DuongDn, Carrick, Rick, Kai, Ken, Nick — all ✓ complete. Card marked done (all items complete).

---

## Slack — 13 workspaces + OhCleo — 08:49 (+07:00)

| Workspace | Msgs | Key content | Alert |
|-----------|------|--------------|-------|
| Baamboozle | 19 | Routine PR/dev bot chatter; Carrick worked Aysar all day Fri19 (deploy 09:59, PR #638, client bug fixed 21:15) — formatted update just wasn't posted, see #3 | N (corrected) |
| RDC | 5 | Automated access logs only | N |
| Swift Studio | 0 | No activity | N |
| Xtreme Soft Solutions | 8 | Kai's Fri report present; internal thread resolved amicably | N |
| SAM GUARD - Mobile | 8 | Routine MQL leads + PR coordination | N |
| Global Grazing Services | 21 | Nick's Fri/Sat/Sun reports all present, routine WARNING flags resolved each cycle | N |
| Amazing Meds | 0 (refreshed token first) | Quiet, verified real (not a token bug) | N |
| Generator | 10 | Rudi/Violet release coordination (Elliott named, releasing tonight) | N |
| LegalAtoms | 1 | No Nick-specific content | N |
| MyPersonalFootballCoach | 0 | Quiet | N |
| William Bills | 0 | Quiet | N |
| Equanimity | 0 (refreshed token first) | Quiet, normal (Marcel adhoc) | N |
| Aigile Dev | 1 (bot) | Standing Sentry issue, unchanged | N |
| OhCleo | 6 | Tony's Fri report present 10:22; 4 routine Celine messages | N |

**OhCleo — Tony's Fri report:** onboarding API, CORS, sitemap, mobile replay-track fix; moved "Completion Rate & Relevance Score" back to In Progress after finding FE/mobile issues.
**OhCleo — Celine (verbatim):** refund processed notice; SEO priority request for this week; invoice clearing delayed (Swedish bank holiday).

Trello: Maddy ✓, John Yi (Slack side) ✓, Rory ✓, Franc ✓, Elliott ✓ (corrected — KhanhHH hours confirmed clean), Aysar ✓ (corrected — Carrick's real activity confirmed despite missing formatted update), Elena-SamGuard (Slack side) ✓, MPFC ✓, Marcel ✓, Raymond ✓, Rebecca (Slack side) ✓, Colin ✓, Ohcleo ✓ — all complete.

---

## Discord — 08:49 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri | — | Vinn's Fri report found in **#airagri_webapp** 17:35: deactivate-user (deployed to prod), contractor login discussion. Jeff's Fri report found in #airagri-flutter 19:14. |
| Bizurk | 0 + DM check | No "animeworld" DM activity (normal silence for Andrew Taraba) |

Trello: James Diamond - Vinn task ✓, Andrew Taraba ✓ — both complete.

---

## MS Teams — Philip — 08:49 (+07:00)

Chat matched "Philip Briggs (External) — Six Star Rentals" successfully. No new content beyond known baseline (last message 2026-05-27). Clean.

Trello: Philip ✓ complete.

---

## Upwork — Neural Contract — 08:49 (+07:00)

Active thread. Last exchange Fri Jun19 13:23 — our reply ("I've updated it. Please check!"), awaiting client (Michael) response. No new inbound message, not an alert.

Trello: Neural Contract ✓ complete.

---

## Sheets — 08:49 (+07:00)

Checked **Friday 2026-06-19** (last workday — Monday's "yesterday" is Sunday, a non-workday).

| Developer | Fri Jun19 hours | Status | Notes |
|-----------|----------------|--------|-------|
| LongVV (Maddy) | 8h (week total 16h) | OK | Hit 16h/wk Maddy target exactly. Workstream confirms (no discrepancy). |
| PhucVT | 8h | OK | Full day |
| VietPH | 8h | OK | Full day |
| TuanNT | JohnYi 0h \| Rebecca 0h ("Chưa", normal) \| Paturevision 0h \| Neural 0.25h \| CharlesChang 7.75h = **8.0h combined** | OK | Not a 0h day — John Yi/Bailey/Rebecca gates unblocked by this source |
| KhanhHH | Generator 0h \| Baamboozle-WS 2.5h \| Colin/ETZ-WS 0h \| **Elena sheet 5.5h** (AA-51 1.5h, AA-52 3h, AA-48 1h) = **8.0h combined** | **OK (corrected)** | Initial check missed the Elena sheet (`1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ`, tab W13) — KhanhHH is a 4th-source dev, see [[feedback_khanhhh_aysar_second_project]] update. Target met exactly, no alert. |
| LeNH | Rory 7.33h \| Franc 0h \| Rebecca(Q-T) 0h = **7.33h combined** | **ALERT (marginal)** | 0.67h short of 8h target, no leave. (Checked Elena sheet W13 too — LeNH has no rows there.) |

No leave notes found covering Fri Jun19 for any of the above (KhanhHH's approved leave is Jun25-26, future; LeNH's Jun17 request is unapproved/different date).

### Sheets — Maddy JIRA — W11 — 08:49 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-444 | Async Queue Processing for Bulk Listing Price Updates | Testing - Anoma | 15h | 12h | 8h | ✅ OK |
| LIFM2-439 | Listed-Cons tab changes | Testing - Anoma | 12h | 21h30m | 3h | 🔴 over 9h30m |
| LIFM2-434 | Quote Tool - AI MVP | Review | 32h | 25h30m | 4.5h | ✅ OK |
| LIFM2-260 | Update Shopify products with images uploaded to S3 | Review | 0h | 38h30m | 0.5h | ⚠️ no estimate set |

Trello: Maddy ✓ complete (gate is Xtreme Slack + LongVV hours, both clean; JIRA over-budget items are dev-process issues, not blockers).

---

## Fountain — Full 5-Part Check — 08:49 (+07:00)

**Part 1 — Matrix plan:** This week's (W32, Jun22-28) plan **not yet posted** as of 08:49 (expected 08:30-09:30 window — too early). Using last week's (W31, Jun15-21) plan for context, posted by @trinhmtt 2026-06-15 09:16:25: ThinhT 20h, ViTHT 40h, QC 15h (VuTQ not named that week).

**Part 2 — Task log actuals (W32, current week):** ViTHT 0h, ThinhT 0h, VuTQ 0h, PhatDLT 0h, HungPN 0h — expected, week just started Monday morning.

**Part 3 — Plan vs Actual:** N/A yet (0h logged this early Monday); using W31 closing figures matched plan per last week's report.

**Part 4 — Capacity & Runway:** Dev capacity (from last posted plan) 60h/wk. NS+IP narrow: 27 tasks, remaining 219.0h → runway 3.65 weeks. Broader bucket: 69 tasks, remaining 417.0h → runway 6.95 weeks. **Discrepancy vs Jun21 report** (which showed 42h/4 tasks, runway 0.9wk) — investigation shows Jun21's report likely used a regex that only matched dash/underscore-named tasks and silently dropped bare-numeric task rows (23 of today's 27 narrow tasks are bare-numeric). Today's 219h figure is the more complete one — flagging as a likely prior-report parsing bug, not a real capacity spike.

**Part 5 — Over-estimate tracking (Actual > (Est+CR)×1.2):** 37 tasks over threshold.
- **#2595**: +40.2% over (168.25h vs 120h total est) — stable, unchanged since Jun21.
- **#2615**: +789.6% over (106.75h vs 12h est) — plateaued, same actual as Jun19/21, status "Deployed on Staging".
- **#2735**: 136h actual vs 130h total est (90h+40h CR) — only +4.6%, **below 20% threshold, correctly not flagged**.
- Top others: #2627 +1550% (0.5h est, Has Bug on Live), #2639 +725%, #2545 +650%, #2630 +650%, #2613 +625%, #2652 +600%, #2501 +537.5%, #2380 +up to 531% (duplicate sheet row, data-quality issue), #2691 +500%, #2523 +281.2%, #2603 +262.5%, #2624 +160.4%, #2629 +128.1%, #2816 +121.2%, #2546 +75%, #2837 +50%, #2872 +44.5%.

**Fountain Trello board** (customer comments since Jun19): 6 comments, all from kunalsheth/tmmckay, latest Jun19 21:55 — no new comments after that. Active counts: todo 26, bugs 14, doing 9, qc_internal 7, qa_backlog 5, in_qa 1. Stuck cards: 50 (mostly long-stale backlog). Hard-to-release (14+ days in doing): 5 cards, oldest 61.9 days ("Add Subtle Scroll Animations").

Trello: Fountain ⚠️ **left incomplete** — plan not yet posted (Part 1 incomplete). Recheck after 09:30.

---

## Elena — 08:49 (+07:00)

**Pending actions check:** Re-verified all 18 entries in `.elena-pending-actions.json` — all `deployed:true` except PR #300 (intentional NOTE, no deploy needed by design). No true pending deploy. No Matrix alert needed.

**Internal PRs** (nustechnology/Elena-SamGuard-Digital-Plant): 0 open — nothing to merge/deploy.

**Precognize** (nusken's own PRs): 1 open — PR #5014 "DP: Add autoscan canvas, tag measurement type modal..." (branch nus/dp-20260619, Jun19) — awaiting review, no action needed.

**WordPress (samguard.co):** Clean — no real JS/page errors (only GA/ads tracking noise filtered out).

Trello: Elena - SamGuard Digital Plant ✓, Elena - WordPress SamGuard ✓ — both complete.

---

## Matrix — 08:49 (+07:00)

**Active rooms: 26 / 126 | Messages: 581** *(since 2026-06-19 08:00 +07:00)*
Full details: reports/2026-06-22/matrix-rooms-0841.md

### ⚠️ Action items for DuongDN (4 open/resolved today)

| Room | Time | Message |
|------|------|---------|
| Celine - OhCleo | Jun19 14:10 | tiennd: "em chưa có kinh nghiệm làm SEO, anh Dương cứu em nha" — already replied same day ✅ |
| Elena - Digital Plant | Jun19 14:11-14:32 | anhttl: client wants Import/Autoscan enabled on test server — PR #5014 already created same day ✅ |
| PHP Projects | Jun19 09:56/14:56 | chientx: issue list duongdn sent lacks root-cause explanation — acknowledged same day, no follow-up doc yet — **open** |
| Potential - Blair Brown - WooCommerce | Jun19 11:50 | anhnvn: client asking about mobile-version screenshot — low priority — **open** |

### Key updates

**PHP Projects — customer escalation on LongVV's delayed tickets (root cause still open):**
- chientx relayed client complaint re: QA rework cycles, est overruns, slow comms
- duongdn set 4 new process rules (QC approval pre-release, QC test-round monitoring, est-compliance escalation, no blind AI-result trust)
- LIFM2-439 (over budget, see Maddy/JIRA table above) pushed to finish same day, tested by Thanh Nguyen QC
- chientx still wants root-cause docs on the issue list sent — not yet delivered

**Elena — Digital Plant active dev:**
- AA-48/51/52/28 tickets merged into SR-6923-6924-active-alerts-fe; AA3 scope kickoff Monday
- PR #307 (www text bug) merged+deployed; PR #5014 created for client's Import/Autoscan request

**Celine - OhCleo — full day dev/QA (154 msgs):**
- Staging deploys for token refresh + onboarding-track removal
- Real bug found: completion-rate always shows 100%, no `finished_play` API wired — new task needed
- iOS build blocked by Apple License Agreement (not "membership expired" as client was mistakenly told)

**Rory Hackett - BXR App:**
- Pixel 8-specific stuck-on-home-after-login bug (2 months old), isolated to that device; try/catch+logging added for next round

**Other:**
- Kunal/Fountain: several tickets shipped to staging/live; large 52-file PR deliberately deferred to Monday
- NUS - Colin/ETZ: 2 issues logged+closed same day; task-log reminder already sent to khanhhh
- Delivery/BDD: routine week-of-22/6 allocation, no alerts

**Leave/resource cross-check:** "Delivery - Resource Arrangement" room shows leave/idle notes only for ThienVN, ThiHV, AnhNH2 — none of the 6 monitored PHP devs. Matches `leave-plan.json`.

---

## Scrin.io — 08:49 (+07:00)

**Scrin.io (TuanNT / John Yi):** Script limitation — `scrin-fetch-yesterday.js` returns **Sunday's** data on Monday runs (isYesterday calendar-day bug), not Friday's. Result was 0 sessions (expected, Sunday). **Not usable for Fri Jun19 comparison this run** — script needs a `--date` param extension to fetch Friday retroactively. No Scrin-based alert raised.

---

## Reminders — 08:49 (+07:00) — print only, not sent (no --send-reminder flag)

- **LeNH**: needs reminder — Fri Jun19 combined 7.33h, 0.67h short, no leave. Room: `!OIrgPraJWrcDTnRVLQ:nustechnology.com`
- LongVV, PhucVT, VietPH, TuanNT, KhanhHH: no reminder needed (hours met — KhanhHH corrected to 8.0h, see Sheets section).

---

## Trello — 08:49 (+07:00)

**Check Mail:** DuongDn, Carrick, Rick, Kai, Ken, Nick — all ✓ complete. Card marked done.

**Check Progress:** 19 of 20 items ✓ complete (Elliott corrected 09:38 — KhanhHH hours confirmed clean; Aysar corrected 10:10 — Carrick's real Aysar activity confirmed via raw Slack history despite the missing formatted update). Left incomplete (○):
- **Fountain** — Matrix plan not yet posted. Recheck after 09:30.

Card not marked done (1 item remains open).

---

## Unresolved Questions

0. **Root cause of the KhanhHH false alert:** `feedback_dev_project_mapping_flexible.md` already stated "ALL devs scan ALL 11 sheets by owner col G" (including the dedicated Elena sheet) — this was in the 🔴 CRITICAL section of memory but wasn't fully applied when briefing the Sheets-check this run (used the narrower per-dev mapping instead). Memory updated (`feedback_khanhhh_aysar_second_project.md` now lists Elena sheet as a confirmed 4th source; `feedback_aysar_carrick_post_timing.md` corrected to the real ~17:00-17:45 post time). Should future sheets checks always cross every dev against the full 11-sheet list rather than a per-dev shortlist, to prevent this recurring?
1. Carrick appears to be "out this week" per a Generator Slack message (violet: "Carrick need to review... He's out of our this week") — this may also explain the missing Fri Jun19 Aysar update. Worth confirming if this affects Swift Studio (Rory gate) responsiveness going forward.
2. Fountain Part 4 capacity figure jumped from 42h (Jun21 report) to 219h (today) — strongly suspected to be a parsing bug in the Jun21 script (missed bare-numeric task names), not a real spike. Should the Jun21 historical report be corrected?
3. Fountain #2380 has a duplicate row in the Est vs Charged sheet (20h vs 4h est, same actual) — sheet data-quality issue, needs Kunal/Fountain team to fix at the source.
4. `wordpress-samguard-check.js` has a hardcoded TMPDIR path (`/var/www/MyDailyAgent/...`) that doesn't match this machine's project root — worked around via env override this run, should be fixed in the script for future unattended runs.
5. rick@'s Stripe "unrecognised device signed in" notice (Jun19) is outside the current email filter scope (Kunal/Fountain/InfinityRose only) — should it be added as a standing filter?
6. vuongtrancr@'s repeated New Relic "Signal lost" (14+ times over 3 days) — known existing monitoring gap, or new/escalating issue worth raising with the Swish team?
