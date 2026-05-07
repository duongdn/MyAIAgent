# Email Piece — 2026-05-06

**Window:** 2026-05-05T09:30:00+07 → 2026-05-06T08:28:55+07 (~23h)
**Method:** imap.zoho.com:993 SSL, SEARCH SINCE 4-May-2026, filtered by Date header against window. All 6 accounts authenticated successfully.

## Summary

| Account | Count (in window) | Folder | Filtered count | Key/Alerts |
|---|---:|---|---:|---|
| duongdn@ | 5 | INBOX | 0 | No leave requests, no New Relic. HR internship eval + 4× Football Club thread. |
| carrick@ | 6 | INBOX | 4 | 4 Redmine bugs (Generator Lifestyle / Elliott — all "Tested on Internal Staging"). No Snyk, no Twilio. |
| nick@ | 23 | INBOX | 0 | 0 John Yi mail. 5× Azure DevOps PRs (Emir LLaneza), 14× candasurveyors daily-task digests, 2× Slack invites. |
| rick@ | 22 | INBOX | 11 | **11 PRODUCTION Rollbar (FirstProject/Fountain Gifts)** — recurring `#878 TypeError`. 2 BugSnag staging (FountainStaging). 6 Daily Summaries. 1 Figma comment. |
| kai@ | 3 | INBOX | 3 | All 3 Madhuraka — new JIRA ticket LIFM2-431 + LIFM2-438 assigned + Jira weekly digest. |
| ken@ | 201 | NewsLetter | 29 | 29 Precognize/development PR threads. Bulk: welligence 110, mimaizumi 55. |

**Total in-window:** 260 messages across 6 accounts.

## Per-account details

### duongdn@nustechnology.com — 5 msgs
No leave requests, no New Relic alerts. All internal/social.
- 02:36 Hong Ho — `[NUS - HR] Request to Give Evaluation of Internship Period - Le Quang Lam`
- 06:36–08:11 Chien Tran / Lu Ho / Nam Tran / Binh Nguyen — Football Club "22nd WARRIORS OF GLORY 2026" thread (4 msgs, scheduling)

### carrick@nustechnology.com — 6 msgs
4× Redmine Generator Lifestyle / Elliott, all `(Tested on Internal Staging)`:
- 08:08 Bug #78314 `[IOS] [Form] Multiple Image Upload Only Attach`
- 08:45 Bug #78417 `[609] [Maintenance] Cannot create new maintena…`
- 08:46 Bug #78372 `[Booking Requests] Property column is empty for…`
- 08:47 Bug #78281 `[Maintenance Overview Report] Maintenance Over…`

Other:
- 15:09 Jira swiftstudio — weekly update digest
- 06-May 01:00 GitLab — `Your SSH key expires soon` (housekeeping)

### nick@nustechnology.com — 23 msgs
**0 John Yi mail.**
- 5× Azure DevOps PRs CNA.Operations.App (#1481, #1481-resub, #1475, #1482, #1480, #1486) — all Emir LLaneza
- 14× candasurveyors `Daily Task Completions` digests (Operations / 2D / 3D / Registered Surveyors) at 21:00
- 2× Slack invite from Mikkel Routhe
- 1× Microsoft account OTP (`Mã dùng một lần`) at 06-May 01:14
- 1× Azure DevOps "view time spent" PR

### rick@nustechnology.com — 22 msgs (HIGH ATTENTION)

**11 PRODUCTION Rollbar (FirstProject = Fountain Gifts):**

| Time | ID | Type |
|---|---|---|
| 02:52 | #878 | 10-in-5min — TypeError `'amount'` |
| 04:54 | #1001 | New — TypeError null `'gift_main'` |
| 04:54 | #1002 | New — TypeError null `'gift_main'` |
| 07:54 | #857 | 10-in-5min — React #418 hydration |
| 14:32 | #878 | 10-in-5min — TypeError `'amount'` (RECURRING) |
| 16:04 | #1003 | New — `can't access property "title", o is null` |
| 16:04 | #1004 | New — `can't access property "title", o is null` |
| 17:14 | #878 | 10-in-5min — TypeError `'amount'` (RECURRING) |
| 19:26 | #848 | 10-in-5min — React #418 |
| 21:15 | #878 | 10-in-5min — TypeError `'amount'` (RECURRING) |
| 22:10 | #878 | 10-in-5min — TypeError `'amount'` (RECURRING) |

**Pattern:** `#878 'amount'` fires 5× through the day (02:52 / 14:32 / 17:14 / 21:15 / 22:10) — same root cause, persistent client-side null-deref in Fountain Gifts cart/order code (`amount` field). Two new gift_main null errors at 04:54 and two new title null errors at 16:04 indicate a regression touching multiple object lookups. React #418/#425 hydration burst from 5 May (carryover from yesterday) continued at 07:54 + 19:26.

**BugSnag staging (FountainStaging) — INFO only, per filter:**
- 07:55 ArgumentError in `EmailWorker@default`
- 08:10 NoMethodError in `holiday_deliveries#index`

**Daily Summaries (informational):** InfinityRoses ×2 (08:08), FirstProject ×2 (15:09), FountainGifts ×2 (06-May 01:07).

**Other:**
- 03:15 Zoho Calendar reminder OmniGPT Daily Sync
- 04:54 Upwork — `Re: Upwork Identity Verification Request`
- 18:18 Figma — `2 new comments in Fountain`

### kai@nustechnology.com — 3 msgs (all Madhuraka-related)
- 03:42 Anoma Wasala (Jira) — `[JIRA] (LIFM2-431) Improve performance for bulk update listing price request` (ticket created)
- 08:44 Jira — Kai weekly update digest
- 13:00 Madhuraka Godahewa (Jira) — `Madhuraka Godahewa assigned LIFM2-438 to you` (NEW assignment)

### ken@nustechnology.com — 201 msgs (NewsLetter)
**29 Precognize/development PR threads:**
- nusdavid: SR-7277 fix double header on /report API (#4870 follow-ups), SR-7231 migration tag alerts in Mongo (#4868 follow-up)
- majdhajjo08: SR-7277 review (#4870), DEL-7109 edit agent host IP (#4859), Dp 177 cannot duplicate canvas (#4867 review), Merge develop 9.3 with ramzor (#4876 review)
- Vladimir-precog: dp-656 fix action for last node in list (NEW PR #4874), Dp 638 migration menu issues right-clicking internal tag in left panel (NEW PR #4875), Sr 7254 align agent message flow with new socket contract (NEW PR #4877)
- DanielGavrilkin: dp-656 review (#4874)
- mahkris: Dp 177 cannot duplicate canvas (#4867 follow-ups, multi-thread), Merge develop 9.3 with ramzor (NEW PR #4876)
- nus-aron: Sr 6921 active alerts header tabs filter/sort FE (#4848)

**Bulk noise (lower priority):**
- welligence/web 38, welligence/country-manager 23, welligence/QueryPlatform 14, welligence/WellStack 13, welligence/consolidated-cashflow-infra 2, welligence/ShinyWell 1 (= 110 welligence threads, mostly XWWP-/WDE- routine)
- mimaizumi/amocc-material 55 (Hideki Ohkubo migration runbook PR #7488 active review thread, Project naming PR #7481)
- 6 newsletter / non-PR (Archbee, Sentry learn, Vercel, Datadog, WyAsk, Linear assignment, Accounting Seed, dependabot bumps)

## Alerts

| Sev | Account | Item | Notes |
|---|---|---|---|
| HIGH | rick | **Fountain Gifts (FirstProject) production error #878 recurrence** | TypeError `Cannot read properties of undefined (reading 'amount')` triggered 5 separate 10-in-5min bursts across 02:52 / 14:32 / 17:14 / 21:15 / 22:10 (~5h+, ~3h, then twice in evening). Persistent null-deref in cart/checkout code path. Active production regression — needs Rick/Kunal triage. |
| HIGH | rick | **4 new production Rollbar errors on FirstProject** | #1001/#1002 (null gift_main), #1003/#1004 (null title) — pattern suggests a single deploy or data-shape change broke multiple object lookups. |
| MEDIUM | rick | React hydration burst #857/#848 (React #418) | 10-in-5min at 07:54 (#857) + 19:26 (#848). Carryover/repeat of yesterday's hydration spike on infinityroses.com. |
| LOW | carrick | 4 new Redmine bugs Generator Lifestyle / Elliott | All "Tested on Internal Staging" — staging-blocked, normal QA flow. Triage needed. |
| LOW | kai | LIFM2-438 newly assigned to Kai | Madhuraka Godahewa direct assignment (13:00) — Kai needs to acknowledge. |
| INFO | kai | LIFM2-431 new bulk-update perf ticket | Created by Anoma Wasala. |
| INFO | rick | 2 BugSnag FountainStaging errors | Staging only — non-blocking per filter rules. |
| INFO | carrick | GitLab SSH key expiry warning | Housekeeping — rotate before expiry. |

No leave requests, no New Relic alerts, no Twilio/Snyk, no John Yi mail. All 6 accounts authenticated successfully.

## Unresolved Questions

- `#878 'amount'` recurrence pattern matches yesterday's reported spike — was a fix deployed yesterday? If yes, regression. If no, this is now Day 2 of the same client-blocking issue.
- 06-May 01:00 GitLab SSH key expiry on carrick — exact key + days remaining not in subject; needs body-fetch follow-up if action required.
- Microsoft account OTP to nick@ at 06-May 01:14 — unsolicited? Possible login attempt to verify with Nick.
