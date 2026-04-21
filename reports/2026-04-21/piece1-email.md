# Piece 1 — Email (2026-04-21 08:27 +07)
Window: 2026-04-20 08:40 → 2026-04-21 08:27 +07

| Account | Count | Summary |
|---|---:|---|
| duongdn@nustechnology.com | 2 | Google Sheets shares (HR resignation checklists: HaiDX, TuanNT3) |
| carrick@nustechnology.com | 7 | 4 Redmine bugs (Elliott/Generator Lifestyle), 2 New Relic warnings, 1 Rollbar daily summary (Socalautowraps) |
| nick@nustechnology.com | 0 | — (no John Yi) |
| rick@nustechnology.com | 16 | 2 BugSnag FountainStaging (INFO), 3 Rollbar daily summaries, 4 production Rollbar errors (FountainFE ICU, InfinityRoses ReadTimeout/ShipStation, ChunkLoadError) |
| kai@nustechnology.com | 8 | 2 Bitbucket PR #456 replies, 6 Jira LIFM2 notifications (tickets 259/426/432/435) |
| ken@nustechnology.com | 34 | Precognize/development GitHub PR activity (PRs #4813, #4831, #4837, #4838, #4841, #4842, #4843, #4844, #4845, #4846) |

## Details per account

### duongdn@nustechnology.com (2)
- 15:12 — Google Sheets share: `NUS_HR_Checklist_Employee_Resignation_HaiDX_0_1` (from Cuong Nguyen)
- 15:17 — Google Sheets share: `NUS_HR_Checklist_Employee_Resignation_TuanNT3_0_1` (from Cuong Nguyen)

Noteworthy: Two HR resignation checklists shared (HaiDX and TuanNT3).

### carrick@nustechnology.com (7)
- 16:30 — Redmine Bug #78185 (Elliott): Requestor email incorrectly includes image attachments
- 16:31 — Redmine Bug #78274 (Elliott): Duplicate push notifications on new Event with multiple timeslots (Android/iOS)
- 17:30 — Redmine Bug #78302 (New) (Elliott): Custom Hub Tiles not updated after changing building
- 17:40 — Redmine Bug #78302 (Tested on Internal Staging) — follow-up on #78302
- 00:00 — New Relic: "Your New Relic account is no longer syncing data" (carrick+colin)
- 00:07 — New Relic Usage Alerts
- 08:08 — Rollbar daily summary: Socalautowraps — Tuesday, April 21

Noteworthy: New Relic sync broken on carrick+colin alias (requires attention). Redmine bug #78302 moved from New → Tested on Internal Staging same evening.

### nick@nustechnology.com (0)
No John Yi emails in window.

### rick@nustechnology.com (16)
Staging (INFO, not alerts):
- 14:33 x2 — BugSnag [FountainStaging] SocketError redis/connection/ruby.rb:183 (development)

Daily summaries (informational):
- 15:10 x2 — Rollbar InfinityRoses Daily Summary Monday, April 20
- 22:10 — Rollbar FirstProject Daily Summary (rick+infinityfe)
- 22:12 — Rollbar FirstProject Daily Summary (rick+fountainfe)
- 08:08 x2 — Rollbar FountainGifts Daily Summary Tuesday, April 21

Production errors (ALERTS):
- 21:32 — Rollbar [FirstProject] production — New Error #869 TypeError: Failed to initialize NumberFormat (ICU) — Fountain FE
- 21:33 — Rollbar [FirstProject] production — New Error #870 same ICU NumberFormat — Fountain FE
- 00:40 — Rollbar [FirstProject] production — New Error #871 same ICU NumberFormat — Fountain FE
- 03:00 — Rollbar [FirstProject] production — New Error #983 ChunkLoadError loading /_next/static/chunks/3506-151f218dc69dc84a.js — InfinityRoses FE
- 04:28 x2 — Rollbar [InfinityRoses] production — New Error #410 RestClient::Exceptions::ReadTimeout
- 04:39 x2 — Rollbar [InfinityRoses] production — New Error #411 ShipStation::ApiRequestError

### kai@nustechnology.com (8)
- 18:23 x2 — Bitbucket PR #456 (xtreme-web/rms): Update quote form feedback — Madhuraka comments
- 18:27 — Jira LIFM2-426: Quote Form Issues
- 18:49 — Jira: Madhuraka assigned LIFM2-435 to Kai
- 19:04 — Jira: Madhuraka mentioned Kai on LIFM2-432
- 19:08 — Jira LIFM2-432: Listed - Buy tab changes
- 19:37 — Jira: Madhuraka mentioned Kai on LIFM2-259
- 19:48 — Jira LIFM2-259: Bulk upload images to Amazon S3

Noteworthy: New ticket assigned (LIFM2-435), multiple mentions. Kai needs to action tickets 259, 432, 435.

### ken@nustechnology.com (34)
All 34 messages are Precognize/development GitHub PR notifications (normal dev activity). Distinct PRs touched during window:
- #4813 SR-7164 Agent Availability endpoint — review activity (nusdavid, majdhajjo08)
- #4831 SR-6921 active alerts header tabs filter — review (briannus)
- #4837 Merge staging into develop (KfirBernstein)
- #4838 SR-6236 add report to part monitoring email (nusdavid, majdhajjo08)
- #4841 SR-6290 send mail for unconnected tag 2 (majdhajjo08)
- #4842 SR-7210 Reindex asset (majdhajjo08, KfirBernstein)
- #4843 SR-7528 detach ORI level from admin service in investigation api (nusdavid, majdhajjo08)
- #4844 Revert "Dp 386 add asset / download audit report in area menu" (Vladimir-precog, DanielGavrilkin, windsurf-bot)
- #4845 SR-7255 trend view tag confirmation (DanielGavrilkin, Vladimir-precog, windsurf-bot)
- #4846 SR-7226 description column added instead of title (DanielGavrilkin, Vladimir-precog, windsurf-bot, majdhajjo08)

Noteworthy: Healthy PR review cadence; Revert PR #4844 may indicate rollback of DP-386 work.

## Alerts

Production alerts (rick@):
1. FountainFE (FirstProject production) — TypeError: Failed to initialize NumberFormat since used feature is not supported in the linked ICU version (Errors #869, #870, #871 — recurring, 3 occurrences 21:32–00:40). Indicates ICU/Intl API incompatibility in production Node/browser.
2. InfinityRoses FE — ChunkLoadError loading chunk 3506 (#983). Stale deployment or CDN cache issue.
3. InfinityRoses production — RestClient::ReadTimeout (#410) talking to external API.
4. InfinityRoses production — ShipStation::ApiRequestError (#411) — ShipStation API failure.

Account/config alerts (carrick@):
5. New Relic account no longer syncing data (carrick+colin alias) — requires investigation / reconnection.

Info-only (not alerts):
- BugSnag FountainStaging SocketError — staging, per rule = INFO
- Rollbar daily summaries — informational

## Unresolved questions
- Are FountainFE NumberFormat ICU errors (#869/#870/#871) a known issue / needs Node version upgrade on the FE server?
- Is the New Relic carrick+colin sync failure known, or does it need reauth?
- Is Revert PR #4844 (Precognize DP-386) intentional rollback or emergency revert?
