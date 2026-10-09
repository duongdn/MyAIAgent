# Slack — Wed 2026-05-06 (window 08:30 → next 08:22)

## Token health
14/14 OK on first verify. No refresh needed.
- xoxp (12): Baamboozle, RDC, Swift, Xtreme, SamGuard, GGS, Generator, LegalAtoms, MPFC, William Bills, SoCal, Aigile
- xoxc (2): Amazing Meds (cookie OK), Equanimity (cookie OK)

## Per-workspace
| Workspace | Msgs | Channels | Key |
|---|---|---|---|
| Baamboozle | 14 | customer-success(6), mpdm(2), testing(2), engineering(2), cancellation(2) | Carrick: daily update posted (#533, #559). Audrey/Ronan praising IG reel review. Carrick deep on Stripe proration debug (35%/50% discount cases). **Aysar: 0 msgs (idle)**. |
| RDC | 11 | user-access-logs(9), all-rdc-fm-monitoring(1), rpi-reboot-logs(1) | Carrick posted master device update on fmscan.com. dmetiner: no activity. Mostly tuner access logs (system noise). |
| Swift Studio | 20 | bxr__app(20) | Twilio incident continuation: Carrick listed concrete fix plan (rate-limit SMS endpoint, country restrictions UK/US/EU). Investigation: confirmed bad-phone accounts NOT from BXR signup — created via staff/Waiver Master. RoryH coordinating Twilio access for Carrick. Jeff: feature update in flight, suggests new sprint for PT booking flow. **Resolution = mitigation in progress, not closed**. |
| Xtreme | 1 | DM(1) | madhuraka pinged Kai for status on tickets 432/430/260/259. **Kai: 0 reply yet** (16h/wk — not alerting per memory). |
| SamGuard | 3 | mql-leads(1), process-digital-plant(2) | Lena pinged Michelle for FE timing. Tom raised studio server ticket DEL-7150. Michelle import fix: no signal in window. Elena/DP: no activity. |
| GGS | 24 | maintenance(17), change-requests(5), barcode(2) | Amy heavy activity: deployed sync fix on Live, fixed Order 37525, disabled buggy backup script. Joey planning multi-week upgrade. Nick: 3 msgs proposing 2-dev upgrade plan (no daily report posted, but absence ≠ alert per memory). |
| Amazing Meds | 38 | web-dev-with-nick(36), it-dept(1), blog(1) | Nick advising John Yi heavily on payment-redirect/Calendly checkout flow. Nick posted daily report (Authorize.net, woo product setup, payment redirect). John Yi engaged, building payment page. |
| Generator | 24 | triage(22), generator-x-nus(1), business-analysts(1) | Violet posted daily update. Carrick fixed 6 Redmine issues, MR !428 merged staging→production planned. Rudi flagged production Laravel error (MobileEventResource:38 null property) — **assigned to Carrick, open**. Bug 834 deployment in progress. |
| LegalAtoms | 0 | — | Silent. |
| MPFC | 10 | DM(10) | Vietnamese DM tien271/freelancer on pagination + getSkillsLibraryVideos optimization (caching player_of_the_week). |
| William Bills | 39 | mx(11), DM(14+14) | **Oliver escalating concern**: questioning Lucas's invoice descriptions ("vague", "hours are wild"), bug pattern ("Quan fixing after hours"), payment processing failure on production order #355152. Lucas/Quan diagnosing WP timeout. Oliver pushing for proper task log. |
| Equanimity | 7 | xid-technologies(7) | Carrick implementing point 5, validation discussion with Komal on company/subcontractor uniqueness. Marcel: no activity. No alerts. |
| SoCal | 0 | — | Silent (normal). |
| Aigile Dev | 13 | etz-nus(12), DM(1) | **Colin (client) frustrated**: documentation for new dev access "taking a long time", asked to meet to avoid back-and-forth. Hendrix promised docs "by tomorrow". Carrick provided DB access doc. Risk of client friction. |

## ALERTS
- **Aysar idle** (Baamboozle): zero messages in 24h window across all channels. Confirmed pattern.
- **William Bills — Oliver client friction**: questioning Lucas's invoice clarity + repeated bugs needing Quan after-hours fixes + production payment failure (#355152). Lucas to investigate WP server timeout. Trust signal degrading.
- **Aigile/ETZ — Colin client frustration**: documentation handoff to new dev delayed multiple days. Hendrix again promised "tomorrow" — risk if slips again.
- **Generator production error**: Laravel `MobileEventResource:38` null property error in prod logs assigned to Carrick — open, needs follow-up.
- **Twilio (Swift)**: Mitigation plan defined by Carrick (rate-limit SMS, country whitelist) but not yet implemented. Rory escalation continuing into today.
- **Xtreme**: Kai unreplied on madhuraka's status request (4 tickets). Not strict alert (16h/wk role) but visible.

## WordPress samguard.co
ERROR_COUNT: 0  CSP_COUNT: 0 — clean.

## Baamboozle GH (open issues)
- baamboozle/baamboozle-web-app: **49 open issues** (PRs filtered out). New in window: 0. Updated in window: 0.
- baamboozle/bbzl-web-client: **0 open issues**. New in window: 0.
- Latest existing: #600 (Profanity Filter, BBZL-Jamie, 2026-04-22), #599 (Admin Tool Game Cover, BBZL-Jamie, 2026-04-22), #596 (Tech stack LTS upgrade, nuscarrick, last updated 2026-05-04).

## Unresolved questions
- Is Aysar on planned leave or genuine idle? (recommend confirm with Carrick/PM)
- Twilio mitigation: was code change deployed today? (window cutoff at 08:22 — may have happened later)
- William Bills: should we pre-empt Oliver with a proactive task-log audit before next invoice?
