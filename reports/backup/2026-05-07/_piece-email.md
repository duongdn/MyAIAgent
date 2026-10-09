# Email — Wed 2026-05-06 (window 08:30 +07 → next 08:22 +07)

**Method:** imap.zoho.com:993 SSL, SEARCH SINCE 6-May-2026, filtered by Date header against window. All 6 accounts authenticated successfully.

## ALERTS

| Sev | Account | Item | Notes |
|---|---|---|---|
| **HIGH** | rick | **NEW: FountainGifts production Redis::TimeoutError burst** | #32 Redis::TimeoutError 10-in-5min burst at 07:05 (×2 dup), #265 NEW error 07:08 (×2 dup). Redis connectivity issue — could indicate cache/queue infra problem. Needs immediate triage. |
| **HIGH** | rick | FirstProject production #875 Cannot read property of undefined `e?.credit` | 10-in-5min bursts at 00:46 and 07:20 (~6.5h apart) — recurring null-deref in credit lookup. NEW error not seen yesterday. |
| MEDIUM | rick | FirstProject #878 `'amount'` TypeError | Only ONE 10-in-5min burst (04:38 +07) vs **5 bursts yesterday** — significant decrease. Possibly partially mitigated; still active but lower frequency. |
| MEDIUM | rick | FirstProject #805 React #425 Minified React error | 10th occurrence at 01:37 — hydration error continues from yesterday's #418/#425 cluster. |
| LOW | rick | InfinityRoses #415 ActionController::InvalidAuthenticityToken (CSRF) | 2 NEW errors at 20:51 — CSRF token mismatch on production. Could be bot/scanner traffic; verify. |
| LOW | rick | 2× BugSnag FountainStaging InvalidAuthenticityToken | Staging only — non-blocking per filter rules. |
| LOW | carrick | 2 new Redmine bugs Generator Lifestyle / Elliott | #78232 Event Attendee + #78143 Leads Eng — both "Tested on Internal Staging". Triage needed. |
| LOW | kai | LIFM2-434 Quote Tool - AI MVP (NEW ticket + mention) | Anoma Wasala mentioned Kai 02:01, ticket created 02:11, follow-up 07:17. |
| INFO | kai | LIFM2-409 Import Shopify payouts | Anoma Wasala mentioned Kai 18:59 + ticket update 19:10. |
| INFO | carrick | Snyk weekly report (marcel) | Routine. |

## Summary

| Account | Count | Filtered | Key |
|---|---:|---:|---|
| duongdn@ | 0 | 0 | No mail in window. No leave requests, no New Relic alerts. |
| carrick@ | 3 | 2 | 2× Redmine Generator Lifestyle / Elliott (Internal Staging). 1 Snyk weekly. |
| nick@ | 19 | 0 | **0 John Yi mail.** 13× candasurveyors daily-task digests, 2× Shopify POS PIN, 1 Slack code, 1 Foundbase invite, 1 Substack newsletter. |
| rick@ | 23 | 10 | **10 PRODUCTION Rollbar alerts** — NEW Redis::TimeoutError burst on FountainGifts (#32, #265), recurring `e?.credit` null #875 (×2 bursts), `#878 amount` ×1 (down from 5), React #425 #805, InfinityRoses CSRF #415 ×2. 2 BugSnag staging. 6 Daily Summaries. 3 Figma comments. |
| kai@ | 13 | 4 | 4× Madhuraka/Jira (LIFM2-409 + LIFM2-434 mentions/tickets). 8× TRN "Officer Test Reset Required" spam-burst. 1 LIFM2-434 follow-up. |
| ken@ | 211 | 24 | **24 Precognize/development** msgs across 6 PRs. Bulk: mimaizumi/amocc-material 68, welligence/WellStack 38, country-manager 24, web 24, QueryPlatform 16. |

**Total in-window:** 269 messages across 6 accounts.

## Per-account details

### duongdn@nustechnology.com — 0 msgs
No mail in window. No leave requests, no New Relic alerts. (Possible: low-traffic day, or all mail outside window.)

### carrick@nustechnology.com — 3 msgs
**Filtered (Redmine Generator/Elliott): 2**
- 15:37 NUS Redmine — `[Elliott - Generator Lifestyle - Bug #78232] (Tested on Internal Staging) [Event] Attendee`
- 15:38 NUS Redmine — `[Elliott - Generator Lifestyle - Bug #78143] (Tested on Internal Staging) [636] [Leads Eng…]`

Other:
- 07-May 03:34 Snyk — `marcel's weekly report`

### nick@nustechnology.com — 19 msgs
**0 John Yi mail.**
- 13× candasurveyors `Daily Task Completions` digests at 04:00 +07 (Operations 5×, 2D Drafting 6×, Registered Surveyors 3× wait actually 3, 3D Drafting 1×) — Wednesday May 6 batch
- 2× Shopify POS PIN (nick-touch-card-5-local, nick-test-staging) at 20:32
- 1× Slack confirmation code DMN-QJX (15:20)
- 1× Foundbase — invitation to easyrate (17:30)
- 1× Substack — Matt from Jam newsletter (07-May 00:54)

### rick@nustechnology.com — 23 msgs (HIGH ATTENTION)

**10 PRODUCTION Rollbar alerts:**

| Time +07 | Project | ID | Type |
|---|---|---|---|
| 05-06 20:51 | InfinityRoses | #415 | New — InvalidAuthenticityToken CSRF |
| 05-06 20:51 | InfinityRoses | #415 | New — InvalidAuthenticityToken CSRF (dup) |
| 05-07 00:46 | FirstProject | #875 | 10-in-5min — `e?.credit` null |
| 05-07 01:37 | FirstProject | #805 | 10th occurrence — React #425 hydration |
| 05-07 04:38 | FirstProject | #878 | 10-in-5min — TypeError `'amount'` |
| 05-07 07:05 | FountainGifts | #32 | 10th occurrence — Redis::TimeoutError |
| 05-07 07:05 | FountainGifts | #32 | 10th occurrence — Redis::TimeoutError (dup) |
| 05-07 07:08 | FountainGifts | #265 | New — Redis::TimeoutError |
| 05-07 07:08 | FountainGifts | #265 | New — Redis::TimeoutError (dup) |
| 05-07 07:20 | FirstProject | #875 | 10-in-5min — `e?.credit` null (RECURRING) |

**Trend vs yesterday:**
- `#878 'amount'` fired 5× yesterday → **only 1× today** (significant improvement, possible partial fix or traffic shift)
- NEW: FountainGifts Redis timeouts (#32, #265) — Redis infra/connection issue
- NEW: FirstProject `e?.credit` #875 — null-deref on credit field, two bursts ~6.5h apart
- React hydration #805 (React #425) continues — same family as yesterday's #848/#857 (#418/#425)
- InfinityRoses CSRF #415 — new, possibly bot scanning

**BugSnag staging (FountainStaging) — INFO only:**
- 04:11 ActionController::InvalidAuthenticityToken in active_admin/devise/registrations
- 07:44 ActionController::InvalidAuthenticityToken in active_admin/devise/registrations

**Daily Summaries (informational, ×2 dups each):** InfinityRoses 15:07, FirstProject 22:08, FountainGifts 07-May 08:07.

**Other:**
- 15:54, 21:48, 21:49 — 3× Tom via Figma (1 comment + 2 mentions in Fountain)
- 17:10 office@kesherhk.co.il — Hebrew newsletter (likely irrelevant)
- 19:43 refael jerbi — `Re: creating invoice with Client API` (client question)

### kai@nustechnology.com — 13 msgs
**Filtered (Madhuraka/Jira): 4**
- 18:59 Anoma Wasala (Jira) — `[JIRA] Anoma Wasala mentioned you on LIFM2-409`
- 19:10 Anoma Wasala (Jira) — `[JIRA] (LIFM2-409) Import Shopify payouts`
- 02:01 Anoma Wasala (Jira) — `[JIRA] Anoma Wasala mentioned you on LIFM2-434`
- 02:11 Anoma Wasala (Jira) — `[JIRA] (LIFM2-434) Quote Tool - AI MVP`
- 07:17 Anoma Wasala (Jira) — `[JIRA] (LIFM2-434) Quote Tool - AI MVP` (follow-up update)

Other (8× TRN burst — likely automation/scanner spam):
- 01:21–02:21 Training Response Network — 8× `Important: Officer Test Reset Required` (rapid-fire, suggests automated retry or bulk operation)

### ken@nustechnology.com — 211 msgs (NewsLetter)
**Filtered (Precognize/development): 24 msgs across 6 PRs**

| PR # | Count | Title |
|---|---:|---|
| 4879 | 7 | sr-7254 new lib version |
| 4881 | 4 | DP-628 manage tag dialog (NEW PR) |
| 4882 | 4 | DP-624 validate name uniqueness in create section modal (NEW PR) |
| 4883 | 4 | SR-7293 UI changes for Simulation (NEW PR) |
| 4876 | 3 | Merge develop 9.3 with ramzor |
| 4859 | 2 | DEL-7109, edit agent's host ip |

Active contributors: Vladimir-precog, DanielGavrilkin, majdhajjo08, KfirBernstein, nustom, windsurf-bot.

**Bulk noise (lower priority):**
- mimaizumi/amocc-material: 68 (Hideki Ohkubo Phase 0 migrations + Partner Portal multi-edit + My Page Hub PR #7497 + acquisition type PR #7494, runbook PR #7496)
- welligence/WellStack: 38 (WDE-8200 Timor-Leste, WDE-8204 avatar PR #10400, WDE-8222 QC screenshots PR #10399, WDE-fix infinite alert loop, Chandler code-reviewer agent PR #10402)
- welligence/country-manager: 24 (WDE-8092 delete pipeline assets PR #416, WDE-8204 #419, WDE-8222 #418, Chandler agent PR #420)
- welligence/web: 24 (XWWP-4544 well info panel PR #4448, XWWP-4381 wells cluster PR #4445, XWWP-2901 M&A details, XWWP-3039 smart reports, fix(clm) PR #4447, STG nginx PR #4446)
- welligence/QueryPlatform: 16 (DP for properties PR #497, hsm countries PR #496, zmap PR #493, asset-level well count PR #461, 2026/2027 filter PR #465)
- welligence/NorML: 5, welligence/ShinyWell: 4 (Sample wp PR #894, Rename GoM→GoA PR #895), consolidated-cashflow-infra: 2 (Gas price exception PR #9), BlockYearlyR: 2, ColombiaML: 1, web-infrastructure: 1
- 2 non-GH: Stack Overflow newsletter (Issue 328), Cursor Team — `Introducing Cursor Security Review`

## Unresolved Questions

- **FountainGifts Redis::TimeoutError** — is Redis cluster healthy? `#32` (existing) hit 10-in-5min and `#265` is brand new — same root cause likely (Redis connectivity); needs ops check.
- **FirstProject #875 `e?.credit`** — first appearance? Optional chaining on `e?.credit` suggests defensive code already in place but still failing — what is `e`? Possibly response shape changed.
- **TRN 8× `Officer Test Reset Required` burst on kai@** — is this expected (Kai's project), automated retry storm, or scanner abuse?
- **InfinityRoses CSRF #415 ×2** — bot/scraper hitting forms, or legitimate session expiration? Check IPs.
- **duongdn@ 0 msgs** — unusually quiet day; verify mailbox not silently broken (last login OK, search returned 0 in window).
- **#878 'amount' decline** — was a fix shipped 05-06? If yes, confirm only the residual 04:38 burst before declaring resolved.
