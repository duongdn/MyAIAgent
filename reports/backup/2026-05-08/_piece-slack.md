# Slack — Thu 2026-05-07 (window 08:37 → next 08:30 +07)

## Token health
14/14 OK on first verify. No refresh needed.
- xoxp (12): Baamboozle, RDC, Swift, Xtreme, SamGuard, GGS, Generator, LegalAtoms, MPFC, William Bills, SoCal, Aigile
- xoxc (2): Amazing Meds (cookie OK), Equanimity (cookie OK)

## Per-workspace
| Workspace | Msgs | Channels | Key |
|---|---|---|---|
| Baamboozle | 7 | engineering(4 github bot), DM-Jamie(1), testing(1), cancellation(1) | Carrick deployed task to nusdev, asked Jamie to test. Jamie (skjamie25) DM 06:44 today: doctor appointments this morning, will test waiting PRs this afternoon. **Aysar: 0 Slack msgs** but **edited GH issue #533 (Change Team Ownership) at 15:05 +07** — not idle, just silent on Slack. |
| RDC | 14 | user-access-logs(9 bot), rpi-reboot-logs(5 bot) | Pure system noise — tuner access logs + 3 instability alerts (10:40-10:42) auto-recovered (recovery alert 10:45 + 19:13). dmetiner/Franc: 0 human msgs. |
| Swift Studio | 7 | DM-RoryH(5), bxr__app(2) | Twilio access handoff continuing: Carrick asked Rory for Twilio invite at 09:14, Rory confirmed access granted at 22:32-22:47 ("direct from Twilio"). Carrick clarified bad-phone accounts are NOT from his web/mobile flow (came from staff/Waiver Master). Jeff pinged on BXR-216 ticket comment. **Twilio mitigation still pre-implementation** (access just established). |
| Xtreme | 72 | DM-anomawasala(70), DM-madhuraka(2) | **Kai very active today**: heavy back-and-forth with anomawasala on LIFM2-432 (discount price update timeout fix, removed max execution time), LIFM2-438 (consign offer email template), discount-rule logic for ineligible products. Kai posted progress update to madhuraka 17:10 listing 5 tickets (259, 260, 432, 438, 439-style). Kai REPLIED to madhuraka's status request. 16h/wk role — no daily report needed. |
| SamGuard | 2 | mql-leads(1 bot), process-digital-plant(1) | Lena: "Waiting for answer..". Single hubspot MQL bot msg. Elena/DP: 0 activity in window. |
| GGS | 12 | maintenance(10), barcode(2) | Joey reported product ratings disappearing on categories front office since this morning's update. Amy: investigating, found rating still works on staging — escalating to Nick. Joey approved barcode dev to proceed. **Nick: 0 msgs (no daily report posted, but absence ≠ alert per memory)**. Joey: "i havent been in all week". |
| Amazing Meds | 23 | web-dev-with-nick(22), it-dept-all(1) | Nick posted daily report 08:22 today (Authorize.net plugin prod, payment redirect, wp form updates). Nick advising John Yi heavily on Authorize.net live key, payment flow. John Yi: "lets hold on work today" 04:26 (decision to delay live changes), wants content updates before going live. Gil deployed live 00:16. |
| Generator | 9 | triage(6), business-analysts(3) | Rudi flagged production Laravel error in prod logs `Attempt to read property "datetime_start" on null` (UserId 26, MobileEventResource:38) — same error as yesterday, **still unfixed**. Rudi requested MR !421 + !430 reviews from Carrick/Ryan. Ryan reviewed and left comments. Violet replied to Rudi on team hours allocation question. Carrick: minimal — Violet noted he's "on other project, will return". |
| LegalAtoms | 1 | general(1) | hashimzahid235 pinged Nick on juristium-clone issue #19610 (single ping, no Nick reply yet in window). |
| MPFC | 1 | DM(1) | Vietnamese: tien271/freelancer confirms "last sync done for player_of_the_week + GetAllTeamLibVideos". |
| William Bills | 50 | mx(33), DM-Oliver(17) | **Oliver still scrutinizing Lucas**: at 09:21-09:32 demanded task list breakdown, again called out Lucas's privateer screen 16h log vs Quan's 6h estimate ("you didn't even finish the Mobile screen, Quan did after hours"). Lucas pushed back at 14:52 with 6-component review arguing 6h not realistic. **Production giveaway emergency mid-day**: API `/page/giveaways` returned 404 1h before 7pm Melbourne giveaway start — Quan diagnosed null-slug bug at line 123 of `11-give-aways-api.php`, server-side fix applied (no commit), live test successful. Oliver also announced **new ecommerce module starting Monday, due next Friday**. Oliver DM 08:25-08:29 today: asking about staging server, requesting last month's task breakdown. |
| Equanimity | 3 | DM-Marcel(3) | Marcel asked Carrick which CloudWatch metrics needed; Carrick replied just needs login access to monitor as before. Light, normal. |
| SoCal | 0 | — | Silent (normal — Blake quiet). |
| Aigile Dev | 14 | etz-nus(12), the-gaige-alerts(1 bot), braiking-news(1 bot) | Colin shared Greg's SSH key 13:26 — Carrick added to all servers, asked Colin for static public IP for SG whitelist. Colin provided IP 14:06, Carrick added. **Colin scoped NEW MySQL upgrade work today 05:12**: prod/staging/testing MySQL upgrade to latest stable, EOL approaching, wants done in 4-5 weeks. Hendrix tagged. **No documentation friction today** — Colin friendly tone. |

## ALERTS

### HIGH
- **William Bills — Oliver/Lucas friction continues**: Oliver demanding monthly task breakdown, repeating privateer 16h-vs-6h challenge, escalation pattern from yesterday persists. Trust signal still degrading. New scope: ecommerce module Monday — risk of more invoice scrutiny.
- **Generator production error UNFIXED**: `MobileEventResource:38` null property error — Rudi reposted today with full stacktrace, still assigned to Carrick. Two MRs (!421, !430) pending Carrick review for >24h. Violet acknowledged Carrick on other project.

### MEDIUM
- **GGS production regression**: Product ratings missing on category pages after yesterday's deploy. Amy investigating, escalated to Nick. **Nick: no daily report (absence noted, not alerting per memory)**.
- **Twilio (Swift) — access ONLY just granted**: Mitigation work still has not started. Rory finally provided direct Twilio invite at ~22:47 today. Implementation expected to start tomorrow.
- **LegalAtoms #19610**: Nick pinged but no reply in window.

### INFO / Resolved
- **William Bills giveaway 404**: Production payment fixed mid-day, live test OK.
- **Aysar Slack-silent but GH-active**: edited issue #533 at 15:05 +07. Pattern: Aysar commits/edits issues but rarely posts to Slack. Not a true idle.
- **Xtreme/Kai**: Highly active, replied to madhuraka's pending status query — pattern resolved from yesterday.
- **RDC tuner alerts**: 3 instability alerts auto-recovered, no human intervention needed.

### DAILY-REPORT MISSING (HIGH only if accountable)
- **Aysar (Baamboozle)**: No daily report on Slack. GH activity confirms working. ⚠️ Should still post written daily.
- **Nick (GGS)**: No daily report. Per memory: GGS dev discussions ≠ alerts; Nick pattern noted.
- **Kai (Xtreme)**: 16h/wk — no daily report required.
- **Marcel (Equanimity)**: adhoc role — no daily report required.
- All other accountable people posted updates or had clear activity.

## WordPress samguard.co
Not scanned in this window (delegated to other piece).

## Baamboozle GH (open issues)
- baamboozle/baamboozle-web-app: **49 open issues** (PRs filtered out). New in window: 0. Updated in window: 1 (#533 by aysark at 2026-05-07 08:05Z = 15:05 +07).
- baamboozle/bbzl-web-client: **0 open issues**. New in window: 0. Updated in window: 0.
- Top recent: #533 (Change Team Ownership, aysark), #596 (Tech stack LTS upgrade, nuscarrick 2026-05-04), #600 (Profanity Filter, BBZL-Jamie 2026-04-22).

## Trello recommendations
- ✅ COMPLETE: Slack scan all 14 workspaces (no token errors)
- ✅ COMPLETE: Baamboozle GH open issues check
- ✅ COMPLETE: Generator alert tracking (re-flagged unfixed prod error)
- ✅ COMPLETE: Swift Twilio status (access granted late, mitigation pending tomorrow)
- ✅ COMPLETE: William Bills client friction tracker (escalating)
- ✅ COMPLETE: Aigile/ETZ status (improved — no docs friction today, new MySQL scope)
- ✅ COMPLETE: Xtreme/Kai status (active, replied — yesterday's concern resolved)
- ⚠️ SKIP/NOT-APPLICABLE: HOMIEAPP discord (not monitored per memory)
- ⚠️ FLAG ON BOARD: Oliver/Lucas friction (HIGH alert — weekly pattern), Generator prod-error reposted, GGS rating regression

## Unresolved questions
- Twilio mitigation: now that access is granted, when will rate-limit + country whitelist actually deploy? (target: today)
- William Bills: should we proactively prepare last-month task log audit before Oliver's next scrutiny round? Oliver explicitly asked for it 08:26 today.
- Generator: who escalates the unfixed production null-property error? Rudi has flagged it 2 days running.
- GGS rating regression: caused by yesterday's Q&A/customer-dashboard update? Awaiting Nick.
- Aysar: Slack-silent pattern — is GH-only activity acceptable to leadership, or should daily-report-on-Slack be enforced?
