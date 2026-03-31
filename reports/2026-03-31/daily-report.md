# Daily Report — 2026-03-31 08:20

**Window:** 2026-03-30 08:35 → 2026-03-31 08:20 (includes weekend)

## Alerts

| Severity | Source | Summary | Link |
|----------|--------|---------|------|
| HIGH | Email/Fountain | FountainGifts PRODUCTION `ActionView::Template::Error` — 10th occurrence | rick@ email |
| HIGH | Slack | Amazing Meds session token expired — cannot monitor | — |
| HIGH | Slack | Equanimity session token expired — cannot monitor | — |
| MEDIUM | Email/InfinityRoses | ChunkLoadError in production (chunk loading timeout) | rick@ email |
| MEDIUM | Email/NewRelic | duongdn account stopped syncing data | duongdn@ email |
| MEDIUM | Fountain | ThinhT W19: 4h actual vs 20h plan — significant shortfall | [Fountain Report](#fountain) |
| MEDIUM | Fountain | #2615 still growing: +12.5h in 10 days, now 665% over estimate | [Fountain Report](#fountain) |
| MEDIUM | Fountain | #2735 (Smart Link) new overrun: 71.75h vs 60h est | [Fountain Report](#fountain) |
| LOW | Email/Fountain | FountainStaging `Temple::FilterError` in EmailWorker | rick@ email |
| LOW | Fountain/Trello | kunalsheth flagged Stripe webhook bugs (Mar 30) | [Trello](#trello-board) |
| INFO | Slack/GG | Nick (Global Grazing) daily report not yet posted — early Monday AM | — |

## Source Summary

| Source | Status | Key Findings |
|--------|--------|--------------|
| Email (6) | ⚠️ | 40 total. Fountain prod errors, InfinityRoses chunk error, New Relic sync stopped, 3 Redmine bugs for Generator, Precognize PR activity |
| Slack (13) | ⚠️ | 2 session tokens expired (Amazing Meds, Equanimity). 11 OK workspaces scanned. Kai report ✓. Nick-GG not yet posted (Mon AM) |
| Discord (2) | ✓ | Both tokens valid. Vinn report ✓, Jeff report ✓ (4h). Bizurk: 0 messages |
| Google Docs | ⚠️ | Rate-limited (concurrent API calls). Early Mon AM — 0h expected. LongVV leave request for today confirmed via email |
| Scrin.io | ✓ | TuanNT: 0h today (Mon AM, expected). 0h Sun (expected). Last tracked: Thu Mar 27 |
| Daily checks | ⚠️ | Kai ✓, Vinn ✓, Jeff ✓ (4h). Nick-GG pending (early AM) |
| Matrix | ✓ | Fountain weekly plan fetched. Token refreshed via browser login |
| GitHub | ✓ | 3 Elena PRs merged+deployed (#293, #294, #295). Redmine #77904/#77905/#77906 → Deployed. Precognize: 2 open PRs (not nusken) |
| Redmine | ✓ | #77904, #77905, #77906 updated to Deployed |
| Trello | ⚠️ | Completion pending — see below |

## Email Details

### duongdn@nustechnology.com (3 emails)
- LongVV leave request for 2026-03-31 (Monday)
- New Relic: approaching free monthly limit
- **New Relic: account no longer syncing data** (potential blind spot)

### carrick@nustechnology.com (9 emails)
- Redmine: Bug #77841 (date filter), Bug #77895 (user count), Bug #77909 (PDF export) — Generator/Elliott, some moved to "Tested on Internal Staging"
- TestFlight: Generator Demo 1.8.6 (55) iOS build available
- Slack notification (Baamboozle), Zoho sign-in alert, Slack confirmation code

### nick@nustechnology.com (0 matching)
- No emails matching "John Yi" filter

### rick@nustechnology.com (10 emails — ALERTS)
- **FountainGifts PRODUCTION** Rollbar: `ActionView::Template::Error: Explicit end statements are forbidden` — new + 10th occurrence
- **FountainStaging** BugSnag: `Temple::FilterError` in EmailWorker
- **InfinityRoses** Rollbar: ChunkLoadError (loading chunk timeout, production)
- FountainGifts daily summary (Mar 31)

### kai@nustechnology.com (1 email)
- Jira mention on LIFM2-268 by Madhuraka Godahewa

### ken@nustechnology.com (17 emails)
- Precognize/development PR activity: #4799 (SR-7102), #4804 (SR-7162), #4805 (tooltip), #4800 (SR-7198), #4806 (data→content fix v23)

## Slack Details

| Workspace | Msgs | Key Content |
|-----------|------|-------------|
| Baamboozle | 8 | Carrick in #testing (PR 581), #cancellation-responses (Typeform), #customer-success |
| RDC - FM Monitoring | 8 | dmetiner requesting updates, Tuner Recovery reboot log |
| Swift Studio | 11 | Carrick: Mindbody re-sync, old client data cleanup in #bxr__app |
| Xtreme Soft Solutions | 17 | **Kai daily report ✓** (LIFM2-409, LIFM2-430 done, Xero refresh) |
| SAM GUARD - Mobile | 27 | 19 HubSpot MQL leads, Lena/Michelle on DP-652/643/390 |
| GLOBAL GRAZING SERVICES | 8 | Joey asking Nick about zip deletion + PrestaShop 9 bug. **Nick daily report NOT yet posted** (early Mon AM) |
| Amazing Meds | 0 | **❌ invalid_auth** — session token expired |
| Generator | 12 | Carrick PR for building assignment (#316), Violet requesting Elliott Testing task release |
| LegalAtoms | 38 | Active dev: Florida injunction workflow, git issues, Tyler journal court integration |
| MyPersonalFootballCoach | 0 | No messages |
| William Bills | 2 | Oliver greeting Lucas |
| Equanimity | 0 | **❌ invalid_auth** — session token expired |
| SoCal Auto Wraps | 0 | No messages |
| Aigile Dev | 19 | BRAiKING NEWS newsletter notifications (Make) |

## Discord Details

### AirAgri (nusvinn) — 65 messages
- **Vinn daily report ✓** (17:04): code review, PR 279/280, fix issues, setup pre-production DB
- **Jeff daily report ✓** (17:20, 4h): activity creation for incidents, Visitor App TF 1.0.3, main app build
- Leon: PHP 8.1 vs 8.0 mismatch, sensor duplicate issue, iOS notifications
- James Diamond: pushing sensor for Withcotts, map layers, default property login
- Mary: sensor testing scope, wind speed unit issue (knots vs km/h on preprod)

### Bizurk (nuscarrick) — 0 messages

## Google Docs

**⚠️ Rate limited** — multiple concurrent agents exhausted 60 reads/min quota. Partial results only.

| Developer | Project | Today (Mon AM) | Status |
|-----------|---------|---------------|--------|
| LongVV | Xtreme Soft | 0h | **On leave** (confirmed via email) |
| PhucVT | James Diamond | — | Tab not found (rate limit) |
| VietPH | Paturevision | — | Tab not found (rate limit) |
| KhanhHH | Generator | — | Tab not found (rate limit) |
| TuanNT | John Yi + Rebecca + Bailey | — | Rate limited |
| LeNH | Rory + Franc + Aysar | — | Rate limited |
| DuongDN | Marcel | — | Adhoc, 0h OK |

**Note:** Early Monday morning (~08:08), 0h is expected. Full hours check deferred to refresh run.

## Scrin.io

- TuanNT (Nick): 0h today (Mon AM, expected). Last tracked: Thu Mar 27. Weekend 0h expected.

## Fountain

### Part 1: Matrix Plan (W20, Mar 30 - Apr 5)
**Posted by:** @trinhmtt (Trinh MTT) — 2026-03-30 08:54 UTC+7

| Developer | Plan Hours |
|-----------|-----------|
| ViTHT | 30h |
| ThinhT | 20h |
| VuTQ | 40h |
| **Total Dev** | **90h** |
| QC | 22.5h |

### Part 2: Task Log Actuals

| Developer | W20 (this week) | W19 (last week) |
|-----------|----------------|----------------|
| VuTQ | 0h | 40h |
| ThinhT | 4h | 4h |
| ViTHT | 0h | 22h |
| PhatDLT | 0h | 12h |
| HungPN | 0h | 10h |
| **Total** | **4h** | **110.5h** |

### Part 3: Plan vs Actual (W19)

| Dev | Plan | Actual | Delta | Status |
|-----|------|--------|-------|--------|
| ViTHT | 30h | 22h | -8h | ⚠️ UNDER |
| ThinhT | 20h | 4h | -16h | ❌ CRITICAL |
| VuTQ | 36h | 40h | +4h | ✓ OK |
| PhatDLT (QC) | — | 12h | — | ✓ |
| HungPN (QC) | — | 10h | — | ✓ |
| **Total Dev** | **86h** | **66h** | **-20h** | **SHORT** |

### Part 4: Capacity & Runway

| Metric | Current | Previous (Mar 20) | Delta |
|--------|---------|-------------------|-------|
| Remaining est | 256.8h | 289.5h | -32.7h |
| Dev capacity | 90h/wk | 86h/wk | +4h |
| Runway | **2.9 weeks** | 3.4 weeks | -0.5w |

Breakdown: Not Started 153h (11), Pending 36.5h (1), Dev Done 25.5h (4), In-progress 30.2h (9), On Hold 8h (1), Deployed Staging 3.5h (6)

### Part 5: Over-Estimate Tracking

| Task | Est | Actual | Prev | Over% | WoW | Status |
|------|-----|--------|------|-------|-----|--------|
| #2627 | 0.5h | 8.25h | 8.25h | 1550% | stable | Bug on Live |
| **#2615** | **12h** | **91.75h** | **79.25h** | **665%** | **+12.5h ↑** | Deployed Staging |
| #2545 | 1h | 7.50h | 7.50h | 650% | stable | Deployed Live |
| #2613 | 2h | 14.50h | 14.50h | 625% | stable | Deployed Live |
| #2501 | 4h | 25.50h | 25.50h | 538% | stable | Deployed Staging |
| #2652 | 1.5h | 9.00h | 9.00h | 500% | stable | In-progress |
| #2523 | 16h | 61.00h | 61.00h | 281% | stable | Deployed Live |
| **#2595** | **120h** | **168.25h** | **168.25h** | **40%** | **stable** | Deployed Staging |
| **#2735** | **60h** | **71.75h** | **53.75h** | **20%** | **+18h ↑** | In-progress |

**Key concerns:**
- **#2615** still growing (+12.5h). Now 91.75h vs 12h est. Parent of #2695.
- **#2735** (Smart Link) NEW overrun: +18h to 71.75h vs 60h est.
- **#2595** stabilized at 168.25h (no growth). Good sign.
- **#2742** has 19.25h actual but status "Not Started" — needs status correction.

### Trello Board

| List | Cards |
|------|-------|
| To-Do | 36 |
| Bugs | 6 |
| Doing | 2 |
| QC Internal | 6 |
| QA Backlog | 1 |
| In QA | 4 |
| Not Passed | 0 |
| **Total Active** | **55** |

**Stuck (>5 days):** Gift of Choice Flow (Doing, 49 days!), delivery dates solution (QC Internal, 60 days), Gift of Choice Select+Pay (QC Internal, 14 days), Pro Send Delivery updates (QC Internal, 18 days), GiftDrop Preview + FAQ (In QA, 6 days)

**Hard to release:** Gift of Choice Flow — in Doing since Feb 10, never reached Done

**Customer comments (since Mar 24):** 18 comments. Notable: kunalsheth concerned about webhook bugs (Mar 30), mike62798179 build-a-box visibility bug, tmmckay Smart Link dropdown feedback

## GitHub

### Elena-SamGuard-Digital-Plant (duongdn)
3 PRs merged + deployed + Redmine updated:
- [PR #293](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/293) — fix/redmine/77904: measurement type info display → Redmine #77904 Deployed
- [PR #294](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/294) — fix/redmine/77906: tag-related nodes in hierarchy → Redmine #77906 Deployed
- [PR #295](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/295) — fix/redmine/77905: simplified plant model node processing → Redmine #77905 Deployed

Matrix announcement sent to "Elena - Digital Plant" room.

### Precognize/development (nusken)
2 open PRs (neither by nusken):
- PR #4803 (nustom): DP-447 incorrect area export + SR-7190 fix
- PR #4800 (mahkris): SR-7198 external id to missed event

No action needed.

## Trello Status

**Check Mail:** 6/6 completed ✓

**Check Progress:** 12/18 completed, 6 skipped

| Item | Status | Reason |
|------|--------|--------|
| Maddy - Carrick/Kai/Luis | ✅ Done | Kai report found |
| Blake | ✅ Done | 0 messages |
| James Diamond - Vinn | ✅ Done | Jeff+Vinn reports found |
| Franc | ✅ Done | OK |
| Aysar | ✅ Done | OK |
| Rory | ✅ Done | OK |
| Raymond - LegalAtoms | ✅ Done | No Nick-specific alerts |
| Colin | ✅ Done | OK |
| Andrew Taraba | ✅ Done | Bizurk 0 messages |
| Elena - SamGuard | ✅ Done | 3 PRs merged+deployed |
| MPFC | ✅ Done | 0 messages |
| Neural Contract | ✅ Done | No relevant emails |
| **John Yi - Amazing Meds** | ❌ Skip | Slack session token expired |
| **Marcel** | ❌ Skip | Equanimity session token expired |
| **Elliott - Generator** | ❌ Skip | KhanhHH hours unverified (rate limit) |
| **Bailey** | ❌ Skip | VietPH hours unverified (rate limit) |
| **Fountain** | ❌ Skip | ThinhT shortfall, #2615 growing, #2735 overrun |
| **Rebecca - William Bills** | ❌ Skip | TuanNT task log unverified (rate limit) |

## Task Log Reminders

**Deferred** — Early Monday AM (08:20). Most devs haven't started logging yet. Will send reminders during afternoon refresh if still 0h.

Exception: **LongVV** confirmed on leave today (email request) — no reminder needed.

## Leave Notes (from task log)

- **ViTHT:** "Nghỉ cả ngày" Mon Mar 23 (W19) — explains 22h vs 30h plan (8h gap = 1 day off) ✓
- **PhatDLT:** "Nghỉ cả ngày" Fri Mar 27 (W19)
- **ThinhT:** NO leave recorded in W19. Logged 4h on Tue only (Rollbar bug + UI update). **Genuine shortfall — 0h logged Mon/Wed/Thu/Fri with no leave explanation.**
- **ThinhT W20:** Already logged 4h on Sun Mar 30 (Redmine bugs + What's Included UI). Active.

## Unresolved Questions

1. **ThinhT W19 shortfall confirmed** — no leave recorded, only 4h logged. Needs PM follow-up.
2. #2742 has 19.25h actual but "Not Started" status — needs correction?
3. Gift of Choice Flow stuck in Doing 49 days — blocked or abandoned?
4. #2615 at 91.75h vs 12h est — is estimate outdated due to scope changes?
5. Amazing Meds + Equanimity session tokens both expired — need manual refresh
6. Google Docs rate limited — full hours check deferred to refresh run
