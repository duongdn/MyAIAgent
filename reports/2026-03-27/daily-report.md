# Daily Report — 2026-03-27 08:07

**Window:** 2026-03-26T08:21 → 2026-03-27T08:07 (+07:00)

## Alerts

| Severity | Source | Summary | Link |
|----------|--------|---------|------|
| HIGH | Google Sheets | **LongVV 0h** Thu — no leave, task log not written | |
| HIGH | Google Sheets | **TuanNT 0h** Thu ALL projects despite Scrin 4h53m — task log not written post-leave | |
| HIGH | Google Sheets | **LeNH 0h** Wed+Thu all 3 projects — Upwork shows 9.5h tracked (4.17h+5.33h Rory). Discrepancy | |
| HIGH | Google Sheets | Fountain **ViTHT 0h entire week**, HungPN 0h entire week | |
| MEDIUM | Google Sheets | Fountain **VuTQ 0h Thu** after consistent 8h Mon-Wed. No leave | |
| MEDIUM | Google Sheets | Fountain **ThinhT 4h Tue only**, 0h rest of week | |
| MEDIUM | Email/rick | Fountain prod **ChunkLoadError #858** on fountaingifts.com | Rollbar |
| MEDIUM | Slack/WilliamBills | **Maxwell site malware** — spam injection (lacult.org, docslid.org) since 2024. Oliver planning full rebuild | |
| INFO | Email/rick | FountainStaging 3 BugSnag errors (staging, not prod) | |
| INFO | Slack/SwiftStudio | BXR app 2FA bug — phone number already exists on verify popup | |
| INFO | Slack/AmazingMeds | Mobile questionnaire form missing button (Gil flagged) | |

## Source Summary

| Source | Status | Key Findings |
|--------|--------|--------------|
| Email (6) | OK | rick@: Fountain prod+staging errors; ken@: 13 Precognize PR notifications; kai@: Jira notifications; duongdn@: DatNC leave request |
| Slack (14 ws) | OK | 11/14 active; WilliamBills Maxwell malware; Swift Studio 2FA bug; Generator active (Carrick fixes); RDC tuner issues |
| Discord (2 acct) | OK | Jeff ✓ (4h), Vinn ✓. AirAgri very active (Lora fix, incident hotfix, weather conversion) |
| Google Sheets | ⚠️ | LongVV 0h Thu; TuanNT 0h Thu; LeNH 0h Wed+Thu; Fountain team mostly 0h |
| Scrin.io | ⚠️ | TuanNT 4h53m Thu vs 0h task log — compliance issue |
| Upwork (5) | OK | Rory/LeNH 21:20h, Bailey-VietPH 20:10h, Aysar 4h, others 0h |
| Daily checks | Kai ✓, Nick-GG ✓, Jeff ✓, Vinn ✓ | All posted |
| Matrix/Fountain | OK | Weekly plan: ViTHT 22h, ThinhT 4h, HaVS 22.5h, VuQT 40h, QC 22h |
| GitHub | OK | Elena: 0 open PRs (deployed yesterday). Precognize: 6 open, 4 new (SR-7204, SR-7198, SR-7102, nusken) |
| Redmine | OK | 7 updated: #77836 + #77839 deployed live; #77818 deployed staging; #77876 + #77874 new |
| Trello | pending | See below |

## Email Details

### rick@nustechnology.com
- Fountain prod ChunkLoadError #858 (loading chunk 7781 on fountaingifts.com)
- FountainStaging: 3 BugSnag errors (NameError shipstation, ArgumentError EmailWorker, NoMethodError holiday_deliveries) — staging, INFO
- InfinityRoses Rollbar daily summaries x2

### ken@nustechnology.com
- 13 GitHub notifications: PR #4798 (process digital plant), #4799 (SR-7102), #4800 (SR-7198), #4801 (SR-7202), #4802 (SR-7204)

### kai@nustechnology.com
- Jira: LIFM2-268 (email templates), LIFM2-425 (shipping manifest)

### duongdn@nustechnology.com
- DatNC leave request Fri 27/03, BinhNT approved

### nick@, carrick@
- No notable items

## Slack Details

**William Bills** (61 msgs) — Oliver reported urgent: MWMX upsell can't edit during live giveaway (Lucas fixed), users can't see tickets (investigating), **Maxwell site malware** (spam injection since 2024, rebuild planned ~24-30h)

**Xtreme Soft** (32 msgs) — Kai working on LIFM2-268 (done), LIFM2-425 (shipping manifest 0KB files), LIFM2-429 (done), LIFM2-428 (in progress). Anoma raised padding/gap issue. **Kai daily report 17:18 ✓**

**Generator** (25 msgs) — Rudi hit doctrine/dbal error on prod (missing --no-dev). Carrick approved fix PR #307, fixed CMS seeder PR #309, deployed demo/staging. OTP code length 5→7. Rudi asking about home-settings bug.

**Swift Studio** (25 msgs) — Roryh reported 2FA verify phone bug (number already exists). Jeff + Carrick fixing. Bug persists after initial fix.

**RDC-FM** (15+ msgs) — Carrick restructured tuners, disabled old fmscan.com users. Dmetiner requested redirect fixes + new subdomain waqdiiqo.fmscan.com. Kocaeli tuner down.

**Equanimity** (15 msgs) — Face scan fix pushed by Carrick after client complaint. Marcel asked for AI investigation summary.

**Amazing Meds** (14 msgs) — Nick back at work. Gil requested tab/button color changes (completed). **Gil flagged mobile questionnaire form missing button at 06:41 today.**

**Global Grazing** (13 msgs) — Amy deployed stock corrections + CSS + print button + permission fixes. Joey confirmed working. **Nick-GG daily report 17:32 ✓**

**SAM GUARD** (6 msgs) — 5 HubSpot MQL leads, Kfir approved Precognize PR #4798, Kfir asking Michelle about PR merge delay

**LegalAtoms** — Raymond planning release tonight (after 9pm Seattle). Tyler-journal: duplicate case filing issue flagged.

**Baamboozle** — 2 Typeform cancellation responses

**Aigile Dev** — Automated blog draft notifications, 1 Attio alert

**No activity:** MPFC, SoCal Auto Wraps

## Discord Details

**AirAgri** — Very active: Lora sensor fix deployed, incident reporting hotfix, weather knots→km/h conversion (staging done, prod PR pending), Android app rebuilt + submitted, PHP upgrade in progress
- Jeff daily report: ✓ (4h — Lessons Learned APIs, Android build, Incident Approval)
- Vinn daily report: ✓ (Lora fix, code review, PHP upgrade)

**HOMIEAPP** — No activity

**Bizurk** — No new messages (token verified OK)

## Developer Hours — Thu Mar 26

| Developer | Project | Thu Hours | Weekly Total | Status |
|-----------|---------|-----------|-------------|--------|
| LongVV | Xtreme Soft | **0h** | 24h (Mon-Wed) | ⚠️ 0h Thu, no leave |
| PhucVT | James Diamond | 8h | 32h | ✓ |
| KhanhHH | Generator | 8h | 32h | ✓ Fri on leave |
| VietPH | Paturevision | 8h | 20h | ✓ (Mon leave, Tue half-day) |
| TuanNT | All projects | **0h** | 0h | ⚠️ Scrin 4h53m, task log blank |
| LeNH | Rory+Franc+Aysar | **0h** | 15.83h | ⚠️ Upwork 5.33h Thu, task log 0h |
| DuongDN | Marcel | 0.83h | 0.83h | OK (adhoc) |

### Fountain Team — Thu Mar 26

| Dev | Plan (week) | Mon | Tue | Wed | Thu | Weekly Actual | Status |
|-----|-------------|-----|-----|-----|-----|---------------|--------|
| ViTHT | 22h | 0 | 0 | 0 | 0 | **0h** | ⚠️ 0h entire week |
| ThinhT | 4h | 0 | 4h | 0 | 0 | 4h | On target but only Tue |
| VuTQ | 40h | 8h | 8h | 8h | **0h** | 24h | ⚠️ 0h Thu |
| HaVS | 22.5h | 0 | 0 | 0 | 0 | **0h** | ⚠️ 0h (1h on Paturevision) |
| PhatDLT (QC) | 22h | 3h | 3h | 3h | 3h | 12h | Consistent |
| HungPN (QC) | — | 0 | 0 | 0 | 0 | **0h** | ⚠️ 0h entire week |

### Scrin.io vs Task Log (TuanNT/John Yi)

| Day | Scrin.io | Task Log | Status |
|-----|----------|----------|--------|
| Mon-Wed | 0h | 0h | Leave ✓ |
| Thu 26 | 4h 53m | 0h | ⚠️ Task log not written |

## Upwork Weekly Hours (Mar 23–29)

| Workroom | Developer | This Week | Daily (Mon-Fri) |
|----------|-----------|-----------|-----------------|
| Rory | LeNH | 21:20 | 4h, 7.83h, 4.17h, 5.33h, 0h |
| Aysar | LeNH | 4:00 | 4h, 0, 0, 0, 0 |
| Bailey DEV1 | VietPH | 20:10 | 0, 4h, 8h, 8h, 0.17h |
| Bailey DEV3 | DuongDN | 0:00 | 0, 0, 0, 0, 0 |
| Neural Contract | external | 0:00 | — |

**LeNH discrepancy:** Upwork Rory 21:20h vs task log 15.83h (Mon-Wed only). Wed+Thu Upwork tracked but task log blank.

## GitHub

**Elena-SamGuard** — 0 open PRs. PRs #291 + #292 merged & deployed yesterday.

**Precognize** — 6 open PRs, 4 new/updated:
- PR #4802: SR-7204 fix user's table edit/delete (Vladimir)
- PR #4801: SR-7202 select all for permissions (Vladimir)
- PR #4800: SR-7198 external id to missed event (mahkris)
- PR #4799: SR-7102 evaluation method APIs (nusdavid)

## Redmine

| # | Project | Status | Summary |
|---|---------|--------|---------|
| 77876 | New | New | New ticket |
| 77874 | Maddy | New | Bulk update price button click blocking |
| 77839 | Elena | Deployed Live | |
| 77836 | Elena | Deployed Live | |
| 77819 | Paturevision | In Progress | Expired promo codes accepted at checkout |
| 77818 | Elena | Deployed Staging | |
| 77793 | Elena | Deployed | Settings save fix |

## Trello Status

**Check Progress:** 14/18 completed, 4 skipped
**Check Mail:** 6/6 completed

**Completed:** Maddy, Blake, James Diamond/Vinn, Franc, Aysar, Elliott, Raymond/LegalAtoms, Colin/Aigile, Andrew/Bizurk, Elena/SamGuard, MPFC, Neural Contract, Marcel, Bailey

**Not completed (alerts):**
- **John Yi / Amazing Meds** — TuanNT 0h Thu, Scrin shows 4h53m
- **Rory** — LeNH 0h Wed+Thu (Upwork discrepancy)
- **Rebecca / William Bills** — TuanNT 0h Thu
- **Fountain** — ViTHT 0h entire week, VuTQ 0h Thu, HungPN 0h

## Task Log Reminders

| Developer | Status | Action |
|-----------|--------|--------|
| LongVV | 0h Thu, no leave | ✓ Matrix reminder sent |
| LeNH | 0h Wed+Thu | ✓ Matrix reminder sent |
| TuanNT | 0h Thu (Scrin 4h53m) | ✓ Matrix reminder sent (event: $7uJGERkECKbXrjMsZ-1PzgRFdXls2i7_PRSByTZEm3A) |

## Unresolved Questions

1. **LongVV 0h Thu** — late logging (it's Fri morning) or missed day?
2. **TuanNT 0h Thu** — was leave supposed to extend through Thu? Rebecca shows Mon-Wed leave only.
3. **LeNH Upwork vs task log** — 9.5h tracked Wed+Thu on Upwork Rory but task log is 0h. Logging compliance issue?
4. **Fountain ViTHT/HungPN 0h all week** — different logging system? Or genuinely no work?
5. **VuTQ 0h Thu** — after consistent 8h Mon-Wed, sudden drop. Leave or forgot to log?
6. **Maxwell malware** — Oliver planning rebuild. Do we need to act or is it client-handled?
7. **Fountain ChunkLoadError #858** — new prod error, needs investigation.
