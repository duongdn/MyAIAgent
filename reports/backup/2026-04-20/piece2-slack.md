# Piece 2 — Slack Monitoring — 2026-04-20 Daily Report

**Window:** 2026-04-17 08:50 +07 (last Friday) → 2026-04-20 08:22 +07 (now). Covers Fri + Sat + Sun + Mon morning.
**Cutoff epoch:** 1776390600
**Query:** `after:2026-04-16` (Slack `after:` excludes named date) + post-filter `ts > cutoff`.

## Token Verification

All 14/14 workspaces OK after `node scripts/slack-verify-tokens.js`:

| Workspace | Token | User |
|---|---|---|
| Baamboozle | xoxp | carrick |
| RDC - FM Monitoring | xoxp | carrick |
| Swift Studio | xoxp | carrick |
| Xtreme Soft Solutions | xoxp | kai |
| SAM GUARD - Mobile | xoxp | ken |
| GLOBAL GRAZING SERVICES | xoxp | nick |
| Amazing Meds | xoxc | nick |
| Generator | xoxp | carrick |
| LegalAtoms | xoxp | david |
| MyPersonalFootballCoach | xoxp | freelancer |
| William Bills | xoxp | lucas |
| Equanimity | xoxc | carrick |
| SoCal Auto Wraps | xoxp | carrick |
| Aigile Dev | xoxp | carrick |

Note: initial search.messages run for Amazing Meds + Equanimity returned invalid_auth due to local script appending `d=` to a cookie already prefixed with `d=`. Fix applied; xoxc session tokens are **valid**, no refresh needed.

## Per-Workspace Summary

### Baamboozle — 16 msgs
- **#random** (6) — audrey/skjamie/noah discussing "student data not required" social post idea (product marketing topic).
- **#gamedev** (5) — Martin Biruk OK'd deploy for Aysar 04-20 00:40; GitHub bot notifications.
- **#cancellation-responses** (4) — typeform cancellation webhooks (automated, not alerts).
- **#engineering** (1) — Carrick nudged Aysar for progress on suggestion (04-17 15:00).
- **Status:** Aysar active through Sun night. No person-status alert.

### RDC - FM Monitoring — 50 msgs
- **#rpi-reboot-logs** (32) — automated tuner alerts (rotating red-light / recovery) — infra noise, not our issue.
- **#user-access-logs** (14) — automated access logs.
- **#all-rdc-fm-monitoring** (4) — Carrick posted branch strategy discussion 04-17 10:31-14:59, awaits client reply.
- **Status:** Carrick active. No alerts.

### Swift Studio — 2 msgs
- **#bxr__app** (2) — Rory asked for breakdown of BXR app approach 04-18 16:47; says ready to go once Jira sprint built. Awaits us.
- **Status:** No alerts. Client-side.

### Xtreme Soft Solutions — 4 msgs
- **DM U05PM34HQ4F (anomawasala)** (2) — Kai asked about yes/no dropdown in email templates 04-17 08:56; client replied YES.
- **DM U021Q9A8FG9 (Madhuraka)** (2) — Kai asked about his suggestion 04-17 14:58; client: "no budget at the moment".
- **Kai daily report/progress:** NOT REQUIRED (Kai 16h/wk part-time — per feedback).
- **LongVV / VietPH activity:** none in Slack scan window (they likely communicate via task log / other channels — not a Slack alert).
- **Status:** No Slack-side alerts. Kai activity visible via DMs.

### SAM GUARD - Mobile — 19 msgs
- **#mql-leads** (19) — all automated HubSpot MQL leads. No human discussion.
- **Elena / DP activity:** no Slack activity in window — Elena works over GitHub PRs (per feedback: auto-deploy Elena PRs). Not an alert.
- **Status:** No alerts.

### GLOBAL GRAZING SERVICES — 11 msgs
- **#maintenance** (8) — Nick explaining Android stack upgrade scope (recommends phased upgrade after 3 yrs) on 04-17 16:15-18:27; Joey asking cost. Mon 04-20 08:09 Nick pinged dev. Nick actively engaged.
- **#change-requests** (3) — Amy asking Nick about Android version on picking device; Joey replying Friday 04-17.
- **Nick daily report:** not flagged (per feedback, absence of Nick daily report in #maintenance is NOT an alert).
- **Status:** No alerts. Upgrade/cost discussion is dev topic, not person-status issue.

### Amazing Meds — 6 msgs
- **#email-marketing-dept** (4) — celeenerae / John Yi on blog access/content (04-17 10:30-10:47, 04-18 18:22 Week 6 blog recap).
- **#web-dev-with-nick** (2) — John Yi 04-20 03:49: Vercel security breach, theamazingmethod.com env vars exposed, asks Nick to check. Nick 04-20 08:15 replied "Let me check now!". Active, appropriate response.
- **Status:** Vercel breach is a real production issue but Nick is already handling it. NOT an alert (already owned).

### Generator — 18 msgs
- **#business-analysts** (8) — Violet + Elliott release discussion Fri 04-17: merge + bug fixes done; agreed to delay release to Tue so apps can be submitted Monday. Timezone fix coordination.
- **#release** (7) — Rudi + Elliott + Violet pre-release review discussion (backwards-compat, mobile first).
- **#triage** (2) — Rudi requesting MR reviews from Carrick/Ryan; Ryan approved.
- **#weekly-timesheet** (1) — Violet posted timesheet Mar 30 - Apr 06 04-17 19:55.
- **Status:** Elliott + Violet + Rudi + Carrick active, coordinated. No alerts.

### LegalAtoms — 5 msgs
- **#general** (5) — Raymond (client) + miratariq design discussion (green vs purple branding) 04-18/04-19. Non-Nick discussion.
- **Nick-specific activity:** none in window. No alert needed (client-side design discussion).
- **Status:** No alerts.

### MyPersonalFootballCoach — 0 msgs
- **Status:** Silent. No alerts.

### William Bills — 70 msgs
- **DM U051TSQ6SHX (Oliver)** (65) — Lucas ↔ Oliver burst of deploy activity Fri 04-17: "Privateer fund is now live", deploy-to-live confirmations. Heavy active collab.
- **#mx** (5) — Oliver asked Lucas 04-17 09:32 about security/malware scan, backup frequency. Lucas arranging.
- **Status:** Lucas fully active. No alerts.

### Equanimity — 4 msgs
- **#xid-technologies** (4) — Marcel 04-17 17:03 asking Carrick about push-without-validation; Komal.bailur 04-17 17:51-18:04 updating client data validation, trade "Other" not allowed.
- **Carrick:** was pinged but no recorded Slack reply in window (may have replied via Matrix / Trello).
- **Marcel:** adhoc project — 0h is expected per feedback. Asking questions is normal engagement.
- **Status:** Informational only. Not an alert.

### SoCal Auto Wraps — 0 msgs
- **Status:** Silent. No alerts.

### Aigile Dev — 0 msgs
- **Status:** Silent. No alerts.

## Alerts → Trello Blocks

**No Slack-sourced person-status alerts requiring Trello checklist blocks.**

Rationale:
- All dev discussions (Generator release, William Bills deploy, GGS upgrade scope, Vercel/Amazing Meds breach, LegalAtoms design, Swift BXR plan) are project dev topics, not person-status issues (per `feedback_project_topics_not_alerts.md`).
- Kai has Xtreme DM activity; no Kai daily-report requirement (16h/wk).
- Nick has heavy GGS + Amazing Meds activity; absence of formal #maintenance daily report in GGS is not an alert per feedback.
- All xoxc / xoxp auth OK — no auth-failure blocker.

## Notable Observations (Informational, not Alerts)

1. **Amazing Meds Vercel breach (04-20 03:49):** John Yi reported theamazingmethod.com env vars exposed after Vercel security incident. Nick acknowledged 04-20 08:15. This is real production risk — Piece-parent should consider flagging to user for visibility even though Nick is owning it.
2. **Xtreme:** Kai's "my suggestion" pitch turned down by Madhuraka ("no budget"). Sales/scope, not monitoring alert.
3. **Generator release:** Shifted to Tuesday submission to align with qualified release. Coordinated, healthy.
4. **William Bills 70 msgs:** Highest volume; Lucas/Oliver heavy deploy day on Fri 04-17.

## Unresolved Questions

- Should the Amazing Meds Vercel breach be surfaced to the daily report even though Nick owns it? (Flagging as informational in section above; parent to decide.)
- Equanimity: Carrick was tagged 04-17 17:03 by Marcel with a direct question — no Slack reply logged in window. Unclear whether he replied via Matrix/Trello; not flagging as alert, but parent may want to cross-check.
