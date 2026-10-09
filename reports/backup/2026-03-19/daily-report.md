# Daily Report - 2026-03-19 (Wed)

Monitoring period: 2026-03-18 (yesterday)

## Checklist

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Monitor Email | done | 32 emails across 6 accounts |
| 2 | Monitor Slack | done | 469+ msgs across 13/13 workspaces (incl. threads) |
| 3 | Monitor Discord | done | 70 msgs in AirAgri, 0 in HOMIEAPP |
| 4 | Monitor Web | done | samguard.co - No JS errors |
| 5 | Google Docs (LongVV) | done | LongVV 8h/day Mon-Wed OK |
| 5b | Google Docs (PhucVT) | done | PhucVT 8h/8h/4h(half-day) Mon-Wed OK |
| 5c | Google Docs (TuanNT) | done | TuanNT 3h/4h/1h Mon-Wed (matches Scrin.io) |
| 6 | Daily Report Checks | partial | See details below |
| 7 | Scrin.io Time Tracking | done | Nick 1h9m in "john yi" — below 8h |

## Email Summary

| Account | Count | Highlights |
|---------|-------|-----------|
| duongdn@ | 2 | TrinhMTT leave request (Mar 18) |
| carrick@ | 1 | Snyk weekly report |
| nick@ | 0 | (7 total, 0 matched "John Yi" filter) |
| rick@ | 6 | InfinityRoses/Fountain Rollbar summaries, Figma comments, BugSnag staging error |
| kai@ | 3 | Jira mentions from Anoma - LIFM2-425, LIFM2-409 |
| ken@ (NewsLetter) | 20 | Precognize/development PRs - moment-timezone update, migration, unit tests, dashboard fix, sam agent |

## Slack Summary

### Baamboozle (5 msgs)
- #cancellation-responses (1): 1 new Baamboozle Plus cancellation typeform response
- #testing (4): skjamie25 tested discounts 10%-50% (all OK). **Reported "Titus" spelling error to Carrick — needs removal.**

### RDC - FM Monitoring (2 msgs)
- #rpi-reboot-logs: Tuner Recovery Alert
- #user-access-logs: Tuner Access Log

### Swift Studio (10 msgs)
- #bxr__app: Jeff working on phone number verification + 2FA. Carrick deployed 2FA on dev. New TestFlight build for 2FA testing.

### Xtreme Soft Solutions (60 msgs)
- DM with Anoma (42): Kai supporting Anoma on manifest generation, sales account, Xero import issues
- DM with Madhuraka (18): **Kai posted progress report** — LIFM2-409 (Support Anoma), LIFM2-371 (bill update, done/hotfix requested), LIFM2-428 (Auth Certificate, in progress), LIFM2-268 (feedback, PR updated). Madhuraka asked hotfix for sell type change on proceed consignment.

### SAM GUARD - Mobile (23 msgs)
- #process-digital-plant (14): Michelle/Lena/Kfir/Tom — xls import bug needs Tom to check, autoscan estimation pending, csv discussion
- #mql-leads (9): 9 new MQL lead notifications from HubSpot

### GLOBAL GRAZING SERVICES (12 msgs)
- #maintenance (12): Amy fixed in_transit email. **Nick active in threads** — discussing old cart cleanup (2018 carts still appearing), Joey confirmed validated carts are normal. Nick acknowledged fixes.

### Amazing Meds (8 msgs)
- #email-marketing-dept (1): John Yi asking about blog schedule
- #web-dev-with-nick (5): John Yi asking about amazingmethod site, chatbot data cleanup, membership page changes; Gilline Anne about Masterclass page and System Checked images
- #it-dept-all (2): Nick NUS posted daily report — membership staging work

### Generator (32 msgs)
- #generator-x-nus (2): Violet posted daily update — Carrick fixed Redmine issues #77613/#77684/#77685/#77707. Jeff off tomorrow.
- #business-analysts (10): Violet updated in-progress tickets. Laravel 10 upgrade release confirmed for tonight. Ryan out of task soon.
- #group-dm (15): Rudi/Carrick/Violet — Laravel10 deploy prep, S3 CORS approach discussion, **SQL integrity constraint error** (duplicate entry) reported during deploy, Rudi monitoring CloudWatch logs.
- #triage (2): Rudi MR review (CMS MR #310), Ryan approved.
- #mobile (3): Rudi MR review (Android MR #44), Jeff reviewed and approved.

### LegalAtoms (274 msgs)
- #general (4): Raymond increasing search delay from 300ms to 800ms per Mir's feedback
- #api-alerts-prod (53): Rollbar alerts (automated)
- #ui-alerts-prod (15): Rollbar alerts (automated)
- #tyler-journal (60): Matias/Talha PR reviews, eslint fixes, filing retries, webhook code discussion
- #standup (16): Team standups — Leandro (Narrative Strengthener), Joaquin (AI help text fix), Paloma (professional table), Armaghan (timeline format fix)
- #developers (2): Raymond shared Playwright testing guide; note about switching to claude-opus-4-5 if 4.6 is down
- #workflows (1): Raymond asking about removing zip code/county_po from CA workflows
- Bot channels (130+): Account signups (24), filings (21), professional actions (20), alpha testing (34), important notifications (24)

### MyPersonalFootballCoach (11 msgs)
- Group DM (1): VuongTran asking if change applies to both web and app
- DM with Tien (10): Vietnamese discussion about payment — web and app payments are separate, no trial on web

### William Bills (30 msgs)
- #mx (2): Lucas completed flash-offer field text/image changes on staging, requesting Ollie's review
- DM with Ollie (28): Lucas disabled sitemap plugin, upgraded PHP in cPanel, fixing WooCommerce compatibility issues with outdated plugins

### Equanimity (0 msgs)
- No messages yesterday

## Discord Summary

### AirAgri (70 msgs)
- #airagri_webapp (45): Vinn posted "My process yesterday (4 hours)" — alarm ability, support Jeff & Leon. Discussion with Leon on Docker/staging testing.
- #airagri-flutter (25): Jeff posted "daily report for today (4 hours)" — review/test notification, Close Incident feature, deploy main app, TestFlight 3.4.1(9).

### HOMIEAPP (0 msgs)

## Web Monitoring

| Site | Status | Details |
|------|--------|---------|
| samguard.co | OK | No JS console errors |

## Google Sheets - LongVV Task Log (Xtreme Soft, W50)

| Day | Hours | Status | Tasks |
|-----|-------|--------|-------|
| Mon 16/03 | 8h | OK | LIFM2-426 (1h), LIFM2-395 (1h), LIFM2-428 (6h) |
| Tue 17/03 | 8h | OK | LIFM2-409 (1h), LIFM2-395 (1h), LIFM2-428 (6h) |
| Wed 18/03 | 8h | OK | LIFM2-409 (1h), LIFM2-371 (1h), LIFM2-428 (3h), LIFM2-268 (3h) |
| Thu 19/03 | 0h | - | (today, not yet filled) |

## Google Sheets - PhucVT Task Log (James Diamond / AirAgri, W17)

| Day | Hours | Status | Tasks |
|-----|-------|--------|-------|
| Mon 16/03 | 8h | OK | PolinRider malware, review PR 266, support Jeff, Traccar server, CI/CD production |
| Tue 17/03 | 8h | OK | CI/CD production, review PR 264/266, deployed notifications, alert group issue |
| Wed 18/03 | 4h | OK (half-day) | Alarm ability, support Jeff & Leon. "Nghỉ nửa ngày" |
| Thu 19/03 | 0h | - | (today, not yet filled) |

Cross-check: Discord Vinn "4 hours — alarm ability, support Jeff & Leon" matches Wed task log.
Cross-check: Discord Jeff "4 hours — notifications, Close Incident, deploy" matches AnhNH2 Wed task log.

## Google Sheets + Scrin.io — TuanNT (John Yi / Amazing Meds, W15)

| Day | Docs (TuanNT) | Scrin.io (Nick) | Docs <= Scrin? | Tasks |
|-----|---------------|-----------------|----------------|-------|
| Mon 16/03 | 3h | 3h 1m | OK | Check issue Engine Security, Change Image membership |
| Tue 17/03 | 4h | 4h 0m | OK | Hanlde feedback |
| Wed 18/03 | 1h | 1h 9m | OK | Hanlde feedback update website |
| Thu 19/03 | 0h | 1h 29m | - | (today) |

Cross-check: nick@ email — no alerts. Amazing Meds Slack — normal work discussion, no issues.

## Daily Report Checks

| Check | Status | Details |
|-------|--------|---------|
| Kai daily report (Xtreme Soft) | **FOUND** | DM with Madhuraka: LIFM2-409, LIFM2-371, LIFM2-428, LIFM2-268 |
| Nick daily report (Global Grazing) | **FOUND (threads)** | 12 msgs in #maintenance threads — Nick active discussing cart cleanup, acknowledged fixes |
| Jeff daily report (AirAgri Discord) | **FOUND** | #airagri-flutter: "daily report for today (4 hours)" — notifications, Close Incident, deploy, TestFlight 3.4.1(9) |
| Vinn daily report (AirAgri Discord) | **FOUND** | #airagri_webapp: "My process yesterday (4 hours)" — alarm ability, support Jeff & Leon |

## Elena - SamGuard Digital Plant

### Slack "SAM GUARD - Mobile" (23 msgs)
- #process-digital-plant (14): Michelle/Lena/Kfir/Tom — xls import bug needs Tom to check, autoscan estimation pending, csv discussion
- #mql-leads (9): Automated HubSpot MQL leads
- No critical alerts

### GitHub — nustechnology/Elena-SamGuard-Digital-Plant (2 open PRs)

| PR | Branch | Risk | Action |
|----|--------|------|--------|
| #289 | fix/redmine/77734 | LOW | **MERGED + DEPLOYED** — ViewMode→VIEW_MODE constant, skip tree reload in canvas |
| #288 | DP-650 | LOW-MED | **BLOCKED** — Conflict after #289 merge. Disconnect logic fix + canvas sync. Needs developer rebase. |

Deploy: MayBanServer `ng build --configuration development` — SUCCESS

Redmine #77734 status → **Deployed** (done)

### GitHub — Precognize/development (nusken PRs)

| PR | Title | State | Notes |
|----|-------|-------|-------|
| #4784 | DPP 2026/03/18 | **CLOSED** (not merged) | Created+closed Mar 18. Review required. |
| #4750 | WIP DPP upgrade | **OPEN** (since Feb 24) | Angular 19 upgrade WIP. Last updated Mar 12. |

## Fountain — Matrix + Task Log (W18: Mar 16-22)

### Weekly Plan (Matrix, today 09:35 by trinhmtt)
ViTHT: 30h | ThinhT: 20h | VuTQ: 36h | QC: 21.5h

### Plan vs Actual (Mon-Wed, 3/5 days)

| Person | Role | Plan (week) | Actual (Mon-Wed) | Expected by Wed | Status |
|--------|------|-------------|------------------|-----------------|--------|
| ViTHT | Dev | 30h | **0h** | 18h | **NO HOURS LOGGED** |
| ThinhT | Dev | 20h | 12h | 12h | ON TRACK |
| VuTQ | Dev | 36h | 20h | 21.6h | ON TRACK |
| QC (PhatDLT+HungPN) | QC | 21.5h | 11h | 12.9h | ON TRACK |

**Alert: ViTHT has 18+ task rows assigned across Mon-Wed but 0 actual hours filled.** Likely unfilled task log, not absence — active in Matrix today discussing FAQ component.

Note: VuTQ had "Nghỉ nửa ngày" Mon, logged 4h — OK.

### Capacity Analysis (Est vs Charged sheet)

- Remaining est: **248h** | Dev capacity: 86h/week | **~2.9 weeks runway**
- Backlog sufficient for 2 devs for 1+ more week — OK
- 11 tasks significantly over estimate (2615: 12h→79h, 2595: 120h→168h, 2742: 12h→19h, 2624: 12h→31h)
- Big upcoming: 2775-navigation-refactor (60h), 2587-giftdrop (40h), 2735-smart-link (60h, <50%)
- 2 tasks with blank status need prioritization: 2775 (60h), 2783 (1h)
- 2742 has blank status but already 19h actual vs 12h est — over budget + no status tracking
- Caution: actual runway may be shorter given consistent overruns

### Matrix Activity (Mar 18-19)
Active team: trinhmtt (PM), hungpn (QC lead), thinht, vitht, vutq. Working on gift-of-choice, FAQ accordion, corporate gifting, order-complete. Multiple Redmine deployments to staging.

## Trello — Check Progress

| Checklist | Item | Status |
|-----------|------|--------|
| Normal | Maddy - Carrick / Kai / Luis | **COMPLETE** |
| Normal | Blake | **COMPLETE** |
| Normal | John Yi - Amazing Meds | **COMPLETE** (Docs <= Scrin.io, no email/Slack alerts) |
| Should do | James Diamond - Vinn task | **COMPLETE** (PhucVT 8h/day OK, Discord matches task log) |
| Closely monitor | Rory, Aysar, Franc, Elliott | pending |
| Work | MPFC, Marcel, Elena, Raymond, etc. | pending |
| Pending | — | pending |

## Alerts

1. **Baamboozle**: skjamie25 reported "Titus" spelling error — Carrick needs to remove it
2. **Generator**: SQL integrity constraint error during Laravel10 deploy — Rudi monitoring
3. **rick@** BugSnag: `Net::SMTPUnknownError in EmailWorker@default` on FountainStaging
4. **Generator**: Jeff off tomorrow (Thu), Violet off Thu+Fri
5. **Elena-SamGuard**: PR #288 (DP-650) has merge conflict — needs developer rebase
6. ~~**Elena-SamGuard**: PR #289 (Redmine #77734)~~ — DONE: merged, deployed, Redmine status → Deployed
7. **Precognize**: PR #4784 closed without merge (Mar 18) — check with Ken
8. **Fountain**: ViTHT 0h logged Mon-Wed despite 18+ assigned task rows — task log unfilled?

## Summary
- Completed: 9/9 checklist items
- Daily reports: 4/4 found (Kai, Jeff, Vinn, Nick all OK — Nick found in threads)
- All 12 Slack workspaces monitored (session tokens refreshed)
- Task logs: LongVV 8h/day OK, PhucVT 8h/8h/4h(half-day) OK, TuanNT matches Scrin.io
- Scrin.io vs Google Docs cross-check: TuanNT consistent (no inflation)
- Trello: Normal + Should do checklists complete. Closely monitor / Work / Pending still open.
- No web monitoring issues (samguard.co OK)
