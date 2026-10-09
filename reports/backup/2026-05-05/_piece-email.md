## Email — 09:11 (+07:00)

Window: 2026-05-04 08:30 → 2026-05-05 09:11 (+07:00). 6 Zoho IMAP accounts authenticated successfully.

| Account | Count | Summary |
|---------|------:|---------|
| duongdn@ | 2 | HR new-staff announcement (Tran Thi Ha Vy, 4 May) + OA medical-checkup notice (4 May). No leave requests. No New Relic alerts. |
| carrick@ | 9 | Redmine Bug #78232 Elliott/Generator Lifestyle "[Event] Attendees shows incorrect count" (4 May 16:53). Rory FW "Twilio account suspended" (4 May 20:35) — operational. Snyk vuln alert for marcel org (4 May 20:52). Kinsta Motto vulnerability digest 11 plugins (5 May 07:23). 4× TestFlight builds (Generator Demo 1.9.0 #74/#75, Brookland Dev 1.9.0 #6/#7). 1 Slack notif. |
| nick@ | 6 | No John Yi mail. 4× candasurveyors daily task-completion digests (Operations/2D/3D/Registered Surveyors). 2 Azure DevOps PRs CNA.Operations.App #1467 + #1475 (Emir LLaneza, 4 May 20:30). |
| rick@ | 19 | 5 PRODUCTION Rollbar FirstProject errors: #1000 ChunkLoadError chunk 8511 infinityroses.com (4 May 02:24am AEST equiv); #875 "Cannot read property credit" 10-in-5min (5 May 04:19am); #857 React #418 + #856 React #425 + #858 React #423 each 10-in-5min (5 May 08:53am). 6 Daily Summaries (InfinityRoses ×2, FirstProject ×2, FountainGifts ×2). 4 BugSnag staging/development (FountainStaging — ignored per filter). 1 BugSnag rate-limit warning. Upwork identity-verification reply. |
| kai@ | 1 | Madhuraka FW: Shopify "Apps require updating before July 1, 2026" notice (5 May 07:18). No new Jira tickets. No blockers. |
| ken@ | 283 | NewsLetter folder. 21 Precognize/development PR threads — nusdavid PRs #4869/#4870 (SR-7277 fix double header on /report API), majdhajjo08 PR #4873 (SR-7065 optimize influx query), Vladimir-precog PR #4872 (DP-653 measurement type), DanielGavrilkin PR #4871 (DP-377 canvas tags coords). Bulk noise: welligence/web 104, mimaizumi/amocc-material 62, welligence/QueryPlatform 25. |

### Alerts

- **rick — Fountain Gifts (FirstProject) PRODUCTION error spike (HIGH).** 5 May 08:53 saw simultaneous 10-in-5min React error bursts: #857 (React #418 hydration), #856 (React #425 hydration), #858 (React #423 hydration). Plus #875 "Cannot read property credit" 10-in-5min at 04:19. Likely deploy-related hydration regression on infinityroses.com. Needs Rick/Kunal review. ChunkLoadError #1000 (chunk 8511) on infinityroses.com — recurring stale-build symptom.
- **carrick — Twilio account suspension forward (MEDIUM).** Rory forwarded "Your Twilio account is suspended and will continue to be charged" 4 May 20:35 — operational, needs reply/action.
- **carrick — Snyk vulnerability alert marcel org (LOW).** 4 May 20:52, requires triage.
- **carrick — Redmine Bug #78232 Generator Lifestyle (LOW).** New Event Attendees count bug, triage.
- **kai — Shopify-app deadline July 1 (INFO).** Madhuraka forwarded Shopify update notice — non-urgent.

No leave requests, no auth failures, no New Relic alerts, no John Yi mail. All 6 accounts authenticated successfully.

### Trello

Card: https://trello.com/c/GL3zuDCi (Check mail, list "Daily", created 2026-05-05). Items marked complete: DuongDn, Carrick, Nick, Kai, Ken. **Rick skipped** — PRODUCTION Rollbar error spike on FirstProject is a client-blocking alert per feedback_alert_means_no_complete.
