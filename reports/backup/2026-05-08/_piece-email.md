# Email — Thu 2026-05-07 (window 08:37 +07 → next 08:30 +07)

**Method:** imap.zoho.com:993 SSL, SEARCH SINCE 7-May-2026, post-filtered by Date header against window. All 6 accounts authenticated successfully.

## ALERTS

| Sev | Account | Item | Notes |
|---|---|---|---|
| **HIGH** | rick | **NEW: FirstProject #881 PayPalButtons undefined** | NEW error 22:22 +07 → 10-in-5min burst at 22:23 + 10th occurrence 22:23 (×3 events). `window.paypal.Buttons is undefined` — PayPal SDK loading race. Affects checkout. |
| **HIGH** | rick | **NEW: InfinityRoses #416 NoMethodError `price` on nil** | 2× NEW error at 07:54 +07 — `object.price \|\| object.gift.price` failing because object is nil. Order/cart code path. NEW today (was not in yesterday's report). |
| MEDIUM | rick | FirstProject #857 React #418 hydration | 2× 10-in-5min bursts (21:29, 23:36 +07) — recurring React hydration error (#418 family, same cluster as #805/#848 yesterday). |
| MEDIUM | rick | FirstProject #858 React #423 hydration | 1× 10-in-5min burst (23:37 +07) — companion React error to #857. |
| LOW | duongdn | NUS HR meeting notice | Hong Ho — Internship Period meeting for Le Quang Lam, Fri 2026-05-08 11:30. Informational. |
| INFO | rick | FountainGifts Redis::TimeoutError | **NOT recurring today** — yesterday's #32/#265 burst (HIGH) absent in window. Daily Summary only. |
| INFO | rick | InfinityRoses & FirstProject Daily Summaries | Routine ×2 each. |
| INFO | kai | Jira LIFM2-439 / LIFM2-440 (Madhuraka, Anoma) | LIFM2-439 "Listed-Cons tab changes" assigned 18:48 +07; LIFM2-440 "Duplicate email triggers — Xero/RMS batch matching" 01:07 +07 (next day). |

**Rick HIGH alerts present → Trello "Rick" mail item BLOCKED.**

## Trend vs yesterday (2026-05-06 window)

- **FountainGifts Redis::TimeoutError** (#32, #265): yesterday HIGH alert (10-in-5min + new) → **today gone** (improvement; verify Redis ops fix held).
- **FirstProject #875 `e?.credit` null**: yesterday HIGH (×2 bursts) → **today absent** (likely shipped fix).
- **FirstProject #878 `'amount'` TypeError**: yesterday MEDIUM → **today absent** (continued decline from 5→1→0).
- **React #418/#423 hydration cluster**: ongoing — #805 yesterday → #857/#858 today (renumbered, same family).
- **NEW today**: FirstProject #881 PayPalButtons (HIGH), InfinityRoses #416 nil price (HIGH).
- **InfinityRoses #415 CSRF** (yesterday LOW): no new occurrences today.
- **carrick@ Redmine Generator/Elliott**: yesterday 2 bugs → **today 0 mail** (carrick inbox empty).
- **John Yi (nick@)**: 0 mail today, 0 yesterday — consistent.

## Summary

| Account | Count | Filtered | Key |
|---|---:|---:|---|
| duongdn@ | 1 | 0 | 1 NUS HR internship-meeting notice. No leave requests, no New Relic alerts. |
| carrick@ | 0 | 0 | **Empty inbox in window.** No Redmine Generator/Elliott mail today. |
| nick@ | 29 | 0 | **0 John Yi mail.** 14× Shopify (1 PIN + 13 store-owner notices for Kinggrap/touchcard test stores at 22:29 +07), 13× candasurveyors Daily Task digests (Thu 5/7), 1 Christina Keefe "Logo" (odysseusllc), 1 Foundbase invite. |
| rick@ | 14 | 8 | **8 PRODUCTION Rollbar alerts.** NEW HIGH: PayPalButtons #881 (×3), InfinityRoses #416 nil price (×2). MEDIUM: React #857/#858 hydration (×3 bursts). 6 Daily Summaries. **Yesterday's FountainGifts Redis & FirstProject #875 #878 GONE.** |
| kai@ | 3 | 3 | 3× Jira/Madhuraka. NEW LIFM2-439 "Listed-Cons tab changes" assigned. NEW LIFM2-440 "Duplicate email triggers — Xero/RMS batch matching." No TRN spam burst today (was 8× yesterday). |
| ken@ | 188 | 6 | **6 Precognize/development msgs across 2 PRs** (down from 24 yesterday). PR #4884 SR-7300 remove raw plugin data tags ×5; PR #4848 SR-6921 active alerts ×1. |

**Total in-window:** 235 messages across 6 accounts (down from 269 yesterday).

## Per-account details

### duongdn@nustechnology.com — 1 msg
- 14:55 +07 Hong Ho — `[NUS - HR] Meeting for Internship Period - Le Quang Lam at 11:30 AM, Friday, May 08, 2026`. Informational. No leave requests, no New Relic alerts.

### carrick@nustechnology.com — 0 msgs
**Inbox empty in window.** No Redmine bug notifications for Generator Lifestyle / Elliott. (Possible quiet day; mailbox accessed OK, search returned 0.)

### nick@nustechnology.com — 29 msgs
**0 John Yi mail.**

- **14× Shopify** at 22:29 +07 (1 POS PIN for `touchcard-nus-test-6` + 13 "You're now the store owner of …" notices: TC_TEST_01/02, king.domer, Kinggrap live ver1-5, Kinggrap Dalv 2, touchcard-king-demo-store, touchcard-dalv-demo-live-29-mar, kinggrrapf, devlop-store) — bulk store-creation/transfer ops.
- **13× candasurveyors** Daily Task Completions digests at 04:00 +07 next day for Thu 7-May (Operations 5×, 2D Drafting 6×, Registered Surveyors 3×, 3D Drafting 1×).
- 22:38 +07 Christina Keefe (odysseusllc) — `Logo`. Likely client design request; review.
- 02:00 +07 Foundbase invitation.

### rick@nustechnology.com — 14 msgs (HIGH ATTENTION)

**8 PRODUCTION Rollbar alerts:**

| Time +07 | Project | ID | Type |
|---|---|---|---|
| 21:29 (5/7) | FirstProject | #857 | 10-in-5min — React #418 hydration |
| 22:22 (5/7) | FirstProject | #881 | NEW — PayPalButtons.window.paypal undefined |
| 22:23 (5/7) | FirstProject | #881 | 10-in-5min — PayPalButtons (escalation) |
| 22:23 (5/7) | FirstProject | #881 | 10th occurrence — PayPalButtons |
| 23:36 (5/7) | FirstProject | #857 | 10-in-5min — React #418 (RECURRING) |
| 23:37 (5/7) | FirstProject | #858 | 10-in-5min — React #423 hydration |
| 07:54 (5/8) | InfinityRoses | #416 | NEW — NoMethodError `price` on nil |
| 07:54 (5/8) | InfinityRoses | #416 | NEW — NoMethodError `price` on nil (dup) |

**Daily Summaries (informational, ×2 dup each):**
- InfinityRoses 15:07 +07
- FirstProject 22:08 +07
- FountainGifts 08:08 +07 (5/8)

**Yesterday's FountainGifts Redis::TimeoutError #32/#265 burst is ABSENT today** — likely fixed/mitigated.

### kai@nustechnology.com — 3 msgs
**All 3 Jira/Madhuraka:**
- 18:48 +07 Madhuraka Godahewa — `[JIRA] Madhuraka Godahewa assigned LIFM2-439 to you`
- 18:52 +07 Madhuraka Godahewa — `[JIRA] (LIFM2-439) Listed-Cons tab changes`
- 01:07 +07 (5/8) Anoma Wasala — `[JIRA] (LIFM2-440) Duplicate email triggers caused by partial Xero-to-RMS batch matching failures.`

No TRN "Officer Test Reset Required" spam burst (8× yesterday → 0 today). LIFM2-409/434 follow-ups absent.

### ken@nustechnology.com — 188 msgs (NewsLetter folder)

**Filtered (Precognize/development): 6 msgs across 2 PRs**

| PR # | Count | Title |
|---|---:|---|
| 4884 | 5 | SR-7300, remove tags that had raw plugin data (NEW PR; majdhajjo08 + windsurf-bot + mahkris) |
| 4848 | 1 | SR-6921 active alerts header tabs filter/sort (nus-aron) |

Active contributors: majdhajjo08, mahkris, nus-aron, windsurf-bot.

**Bulk noise repo distribution (lower priority):**
- mimaizumi/amocc-material: 74 — Phase 0 project intake / managed product attributes / runbook docs / heroku-prod-migrate fixes / Partner Portal CSV / My Page Hub. Heavy churn from Hideki Ohkubo, khangnus, mimaizumi.
- welligence/web: 50 — XWWP-4519 O&G map download fix (#4454), XWWP-4551 wells view (#4451), XWWP-4223 lead-analyst rename (#4456), Block v2 map issues (#4452/#4453), Search Assistant upgrade (#4455), LNG country downloads (#4457), M&A deal failures (#4458), TanStack Router migration (#4343), Portfolio Analysis dropdown (#4425), CLM perf (#4450), Country Overview download (#4459 NEW).
- welligence/WellStack: 30 — WDE-8200 Timor Leste edits (#10404), WDE-7886 Venezuela GHG (#10405/#10409), WDE-8222 QC screenshots (#10399), WDE-7959 EIA prices (#10406), WDE fix import typo (#10408), Timor Leste name handler (#10407).
- welligence/QueryPlatform: 9 — Arena pull / type curves DP (#498 NEW), hsm countries (#496).
- welligence/consolidated-cashflow-infra: 5 — XWWP-4383 CLM gamma (#939), Gas price exception (#940).
- welligence/web-infrastructure: 3 — Juraj's key (#232), CloudFormation Origin (#231).
- welligence/country-manager: 3 — WDE-8222 QC screenshots (#418).
- welligence/BlockYearlyR: 3 — MENA Production Override (#346).
- welligence/Customer_Analytics: 1 — timing/gating optimisation (#34).
- 1× Linear `[WYA-464] Add-ons - New Billing Portal` (michelle assigned).
- 1× Sentry — `Monitors & Alerts is now available`.
- 1× Slack — free workspace 1-year retention notice (delete July 6).
- 1× Acme Hire — `Staff no confirmation - Schedule test schedule - Dishwasher. ID:4297`.

## Unresolved Questions

- **FirstProject #881 PayPalButtons** — `window.paypal.Buttons is undefined` indicates PayPal SDK didn't load before render. Race condition or PayPal CDN failure? Affects checkout — Rick should triage same-day.
- **InfinityRoses #416 `price` on nil** — what code path produces a nil object where `object.price || object.gift.price` is called? New today; likely an order/cart edge case (missing gift association).
- **carrick@ 0 msgs** — unusually empty (yesterday had 3 incl. 2 Redmine). Mailbox responsive on auth/search; verify nothing silently failed.
- **Yesterday's FountainGifts Redis fix** — confirm Redis cluster ops change held; yesterday's #32 was 10-in-5min + #265 NEW, today both gone. Was a deployment/config change made?
- **LIFM2-440 Xero-to-RMS duplicate email triggers** — partial batch matching failure described; needs root cause investigation by Kai (RMS reconciliation logic).
- **Christina Keefe "Logo" (odysseusllc)** on nick@ — likely client deliverable request; confirm action owner.

---

**Status:** DONE
**Summary:** 235 in-window emails across 6 accounts. 2 NEW HIGH Rick alerts (FirstProject #881 PayPal + InfinityRoses #416 nil price); yesterday's HIGH alerts (FountainGifts Redis, FirstProject #875 credit, #878 amount) ALL absent. carrick@ + nick@ John Yi empty. ken@ Precognize down 24→6.
