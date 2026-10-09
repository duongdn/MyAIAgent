## Email — 08:09 (+07:00)

Window: 2026-04-24 08:50 → 2026-05-04 08:09 (+07:00) — 10-day catch-up. Workdays scanned: Apr 24/27/28/29 + May 4 partial. Public holidays: Apr 30 (Reunification), May 1 (Labour). Weekends: Apr 25-26, May 2-3.

| Account | Count | Summary |
|---------|------:|---------|
| duongdn@ | 4 | No leave requests. HR salary notice (Binh, 28 Apr) + Apr/2026 payslip (Thuy, 29 Apr). Infisical new-device login (28 Apr). No New Relic alerts. |
| carrick@ | 31 | 2 NUS Redmine bugs for Elliott/Generator Lifestyle on 28 Apr — Bug #78373 (iOS Booking Requests shows "No items found" after success) tested on internal staging; Bug #78417 NEW — Maintenance request creation fails (609). 11 Jira BXR tickets from Rory (27 Apr batch). 3 Rollbar Socalautowraps daily summaries (informational). 1 Upwork msg from Neural C. (24 Apr). Forge reboot reminder (1 May). |
| nick@ | 60 | No mail from John Yi in window. Bulk = Azure DevOps PR notifications for CNA.Operations.App (Emir LLaneza, ~15 PRs Apr 27 → May 3) + daily candasurveyors task-completion digests. Christina Keefe scheduled & cancelled "Weekly Meeting with Devs" (28-29 Apr). Heroku data-deletion notice (2 May) for review. |
| rick@ | 141 | 43 PRODUCTION Rollbar errors for Fountain/InfinityRoses/FirstProject. Hot items: FirstProject prod errors #877/#878 TypeError "amount" 100th+10-in-5min spikes Apr 28-30; #883 Stripe.js failed-to-load (29 Apr); 1,000th occurrence #850 React #423 (25 Apr); ChunkLoadErrors #993/#996 on infinityroses.com. InfinityRoses prod #414 RestClient::ReadTimeout x2 (27 Apr 13:32). Kunal forwarded fountaingifts.com sitemap-indexing notice (30 Apr). Staging/development BugSnag entries ignored per filter. |
| kai@ | 33 | 33 Jira/Bitbucket items on Madhuraka Xtreme project (LIFM2-*). Mentions: LIFM2-259/260/430/431/432/436. New ticket LIFM2-437 "Date based filtering" assigned to Kai (29 Apr). FW from madhuraka@xtremeweb.com.au "RMS missing order — Order #2522" (28 Apr). PRs #483 reviewed. No blockers escalated. |
| ken@ | 235 | NewsLetter folder. 22 Precognize/development PR threads (mostly mahkris on PR #4841 SR-6290 unconnected-tag mail, PR #4860 SR-7198 missed-event id, PR #4862 SR-6529 Netty ByteBuffer leak fix, PR #4868 SR-7231 mongo migration). nusdavid opened PR #4867 "Dp 177 cannot duplicate canvas" (3 May 12:20). Bulk noise: welligence/web 81 + amocc-material 99. |

### Alerts

- **rick — Fountain Gifts (FirstProject) PRODUCTION error spike (HIGH).** TypeError "amount" errors #877/#878 hit 100th + multiple 10-in-5-min bursts Apr 28-30. Also #883 Stripe.js load failure 29 Apr 21:50. Recurring chunk-load errors on infinityroses.com (#993, #996). Likely needs Rick/Kunal review.
- **rick — InfinityRoses PRODUCTION ReadTimeout (MEDIUM).** Error #414 RestClient::Exceptions::ReadTimeout x2 at 27 Apr 13:32 — single timestamp burst, monitor for recurrence.
- **carrick — Elliott/Generator new bugs (MEDIUM).** Redmine #78373 (iOS Booking Requests) + #78417 (Maintenance create fails) on 28 Apr. Need triage in next standup.
- **kai — RMS missing order #2522 (LOW).** Forwarded by madhuraka@xtremeweb on 28 Apr — operational follow-up, not a system alert.
- **ken — Precognize PR backlog (INFO).** PR #4841 (SR-6290) had 9 review iterations May 3 — long-running; check if blocked.

No leave requests, no auth failures, no New Relic alerts, no John Yi mail. All 6 accounts authenticated successfully.
