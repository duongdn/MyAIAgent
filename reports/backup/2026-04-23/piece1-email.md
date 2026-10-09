# Piece 1 — Email
## Window: 2026-04-21 08:27 → 2026-04-23 08:55 (+07:00)

| Account | Count | Summary |
|---|---:|---|
| duongdn@nustechnology.com | 6 | 1 remote request (NamTV 22/04), 1 LongVV leave request (24/04), Public Holidays follow-up, 3 Football Club threads |
| carrick@nustechnology.com | 16 | 8 Redmine (Elliott/Generator Lifestyle — 2 new bugs #78312/#78314), 2 TestFlight builds, 1 Jira weekly, 1 Rollbar Socalautowraps summary, 1 Marcel AWS cost, 1 Snyk report, 1 TEST invoice |
| nick@nustechnology.com | 18 | 8 Azure DevOps PRs (CNA.Operations.App 1438-1443 — Emir LLaneza), 8 CandaSurveyors daily completions, 1 Odysseus share, 1 Slack code. No John Yi |
| rick@nustechnology.com | 39 | 9 production Rollbar errors (FirstProject + InfinityRoses), 6 staging BugSnag (INFO), 8 daily summaries, 1 Kunal email (design focus), 1 Thomas M Upwork, 1 Zoho new sign-in, 4 Figma/invoice threads |
| kai@nustechnology.com | 7 | 6 Jira LIFM2 mentions/assigns (LIFM2-260/430/434/436 + weekly), no Bitbucket |
| ken@nustechnology.com | 341 | 11 Precognize/development PRs (5 PRs: #4847, #4848, #4849, #4831, #4838); remainder Welligence/Mimaizumi repos (out-of-scope) |

## Alerts

Production errors (rick@, FirstProject/InfinityRoses — needs dev action):
1. [FirstProject] production New Error #984 ChunkLoadError chunk 3148 (infinityroses.com) — 2026-04-21 23:46 +07
2. [FirstProject] production 100th Error occurrence #854 Minified React error #422 — 2026-04-22 00:34 +07
3. [InfinityRoses] production 100th Error occurrence #398 NoMethodError `strftime` for nil (order_item.dispatch_date nil) — 2026-04-22 05:53 +07 (x2)
4. [FirstProject] production New Error #985 UnavailableError — 2026-04-22 10:53 +07
5. [FirstProject] production New Error #986 ChunkLoadError chunk 8658 — 2026-04-23 01:02 +07
6. [FirstProject] production New Errors #987/#988/#989 Minified React errors #422/#425 — 2026-04-23 01:09 +07

Client/PM follow-ups:
7. rick@ — Kunal Sheth "Design focus for this week" (2026-04-22 06:33 +07) — needs response/ack
8. duongdn@ — LongVV leave request 24/04/2026 (2026-04-22 09:26 +07) — approve/forward HR

Info-only (NOT alerts, per rules):
- 6 BugSnag [FountainStaging] (staging = INFO): NoMethodError ShipStationOrderWorker, ArgumentError EmailWorker, ActiveRecord::RecordNotFound admin/orders, NoMethodError holiday_deliveries, ActiveStorage::InvariableError gifts
- 1 Rollbar [InfinityStagingBE] staging ArgumentError SMTP To blank
- 8 Rollbar daily summaries (FirstProject, FountainGifts, InfinityRoses, Socalautowraps)

## Details by account

### duongdn@nustechnology.com (6 msgs)
- 14:25 — NamTV: remote request 22/04/2026 (Re:)
- 14:37 — HangDTT: Re: Public Holidays notice
- 09:26 (22/04) — LongVV: đơn xin nghỉ phép 24/04/2026 (leave request — needs HR action)
- 09:52 / 10:00 / 11:59 (22/04) — Football Club (LuHX, ViTHT, ThuyLTT) — internal social

### carrick@nustechnology.com (16 msgs)
- 11:34 — Generator Demo 1.8.6 (70) iOS TestFlight
- 14:02 — Marcel fwd AWS Cost anomaly (Equanimity AG)
- 15:05 / 15:05 — Redmine Bug #78312 (New) [Forms] Image Upload Not Displaying in Form Response Modal (Elliott)
- 15:08 — Redmine Bug #78314 (New) [IOS][Form] Multiple Image Upload Only Attaches One Image in Email
- 15:11 — Redmine Bug #78185 (Tested on Internal Staging) [Form image] Requestor email
- 15:54 — Redmine Bug #78183 [Android/IOS][Form] Unable to create multiple requests
- 16:23 — Redmine Bug #78312 (Deployed on Staging)
- 17:16 — TEST invoice from NUS Technology (Stripe test)
- 17:20 — Redmine Bug #78312 (Tested on Internal Staging)
- 22:06 — Jira weekly update for Carrick Tran (SwiftStudio)
- 14:20 (22/04) — Redmine Bug #78232 [Event] Attendees shows incorrect count
- 14:26 (22/04) — Redmine Bug #78273 [IOS/Android][Notifications][Event] Incorrect event time slot
- 16:30 (22/04) — TestFlight Generator Demo 1.8.6 (71)
- 00:09 (23/04) — Snyk marcel weekly report
- 08:08 (23/04) — Rollbar Socalautowraps Daily Summary Thursday Apr 23

Noteworthy: Two new Elliott bugs (#78312, #78314) and #78312 reached "Tested on Internal Staging" same day — healthy bug cycle. No New Relic sync issues repeating.

### nick@nustechnology.com (18 msgs)
- 08 Azure DevOps PR notifications (CNA.Operations.App PRs 1438/1439/1440/1441/1442/1443 — all Emir LLaneza updates)
- 08 CandaSurveyors daily task completions (Operations, 2D/3D Drafting, Registered Surveyors for 21-22 Apr)
- 08:43 (21/04) — Christina Keefe (Odysseus) "Fw: Christina, share your signup link"
- 14:30 (21/04) — Slack confirmation code

No John Yi in window.

### rick@nustechnology.com (39 msgs)

Production errors (ALERTS, see Alerts section): 9 msgs — FirstProject/InfinityRoses Rollbar.

Staging (INFO, excluded):
- 6 BugSnag [FountainStaging] worker errors
- 1 Rollbar [InfinityStagingBE] SMTP ArgumentError

Daily summaries (informational): 8 msgs — FountainGifts (2 days x2), InfinityRoses (2 days x2), FirstProject (2 days).

Client / other:
- Kunal Sheth (fountaingifts.com) "Design focus for this week" — 2026-04-22 06:33 +07
- Tom via Figma: comment on Fountain
- Thomas M. via Upwork — 2 messages (21/04)
- Chagil Marketing / Danilo raonic — "creating invoice with Client API" thread (4 msgs, digitalinvoice.co.il integration)
- OmniGPT Daily Sync reminders (Zoho Calendar, x2)
- Zoho "New sign-in to your Zoho account" (22/04 — review for unauthorized)
- InfinityRoses order confirmation #71959

### kai@nustechnology.com (7 msgs)
- 15:50 (21/04) — Jira weekly update for Kai
- 16:26 (21/04) — Madhuraka mentioned Kai on LIFM2-434
- 01:40 (22/04) — Anoma Wasala mentioned Kai on LIFM2-430
- 01:51 (22/04) — LIFM2-430 "Mark Order as fulfilled when send email"
- 09:08 (22/04) — Madhuraka mentioned Kai on LIFM2-260
- 09:12 (22/04) — LIFM2-260 "Update Shopify products with images uploaded on to S3 bucket"
- 20:26 (22/04) — Madhuraka assigned LIFM2-436 to Kai

Noteworthy: New assignment LIFM2-436, two new mentions (LIFM2-430/434) Kai needs to action.

### ken@nustechnology.com (341 msgs, 11 Precognize/development)

Precognize/development activity (5 PRs):
- PR #4847 "Sr 7071 add notes to forwarded email" — 3 msgs (nusdavid, windsurf-bot)
- PR #4848 "Sr 6921 active alerts header tabs filter and sort options fe" — 3 msgs (nus-aron, windsurf-bot)
- PR #4849 "SR-7222 & SR-7224 fix move nested equipments logic & validation" — 2 msgs (nustom, windsurf-bot)
- PR #4831 "SR-6921 active alerts header tabs filter and sort options" — 2 msgs (briannus)
- PR #4838 "Sr 6236 add report to part monitoring email" — 1 msg (nusdavid)

Other 330 msgs = Welligence + Mimaizumi repos (out-of-scope per rule).

Noteworthy: Healthy PR cadence on Precognize. No escalations or stuck reviews.

## Unresolved questions
- InfinityRoses production `NoMethodError strftime for nil:NilClass` (#398) reached 100th occurrence — is ticket filed for nil dispatch_date?
- FirstProject ChunkLoadError recurring (#984, #986) across two days — CDN/deploy cache issue or stale client chunks?
- Zoho "New sign-in" on rick@ 22/04 — verify this was user's own sign-in, not compromise?
- TEST invoice on carrick@ (Stripe test mode) — intentional test, nothing to action?
