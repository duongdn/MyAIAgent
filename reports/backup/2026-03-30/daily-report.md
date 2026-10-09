# Daily Report — 2026-03-30 08:35

**Window:** 2026-03-27 08:23 → 2026-03-30 08:35 (Fri morning → Mon morning)

## Alerts

| Severity | Source | Summary |
|----------|--------|---------|
| LOW | Slack/Equanimity | XID face verification issue — Carrick posted fix, awaiting customer recheck |
| MEDIUM | Slack/Xtreme Soft | Kai sick leave Tuesday (viral fever); took Fri afternoon off |
| MEDIUM | Slack/GGS | Nick-GG did not post Friday daily report in #maintenance |
| MEDIUM | Email/rick@ | FountainGifts 2 new production errors (#255 NoMethodError, #256 RecordInvalid) hitting 10+ occurrences since Sat |
| LOW | Slack/William Bills | Lucas AWS password invalid again (recurring) |

## Source Summary

| Source | Status | Key Findings |
|--------|--------|--------------|
| Email (6) | OK | duongdn: LongVV leave req, TuanNT leave+remote req, 20 Infinity Roses logs. rick: Rollbar alerts (Fountain new errors). carrick: Generator TestFlight. nick: ClickUp, Canda. kai: Jira/Bitbucket PR reviews. ken: GitHub PRs (Precognize, Welligence) |
| Slack (14) | ⚠️ | Equanimity XID fix posted, awaiting recheck. Kai sick Tue. Nick-GG no Fri report. Active dev on Baamboozle, Swift Studio, SAM GUARD, LegalAtoms. |
| Discord (2) | OK | AirAgri: Vinn active Fri production deploys, Jeff 4h report posted. Jeff requested Vinn weekly update (Sun). Bizurk: no activity. |
| Google Docs | OK | All devs OK. TuanNT 7.2h + VietPH 28h = approved leave. LongVV 36h (half-day Fri). |
| Scrin.io | OK | TuanNT Fri: 2.8h Scrin vs 2.75h task log = OK (no inflation) |
| Daily checks | OK | Kai ✓ (sick Tue noted). Nick-GG: Fri report NOT FOUND. Jeff ✓. Vinn: active. |
| Matrix/Fountain | ✓ | 5-part check complete. See below. |
| GitHub | OK | Elena: 0 open PRs, no new merges since Mar 26. Precognize: 0 nusken PRs. |
| Redmine | OK | 10 open duongdn issues (Prestashop 9), no new deploys needed |
| Upwork | OK | New week (Mar 30-Apr 5), all 0h expected. Last week: Rory 27:40, Bailey-VietPH 28:00, Aysar 4:00 |

## Developer Hours — Friday 27/03/26

| Developer | Project(s) | Fri Hours | Weekly | Min | Status |
|-----------|-----------|-----------|--------|-----|--------|
| LongVV | Xtreme Soft | 4.0h | 36.0h | 40h | OK (Nghỉ nửa ngày Fri) |
| PhucVT | James Diamond | — | 40.0h | 40h | OK |
| KhanhHH | Generator | 0h | — | 40h | OK (Nghỉ cả ngày Fri) |
| VietPH | Paturevision | 8.0h | 28.0h | 40h | OK (approved leave) |
| LeNH | Rory+Franc+Aysar | — | 40.3h | 40h | OK (27.7+8.7+4.0) |
| TuanNT | JohnYi+Rebecca+Paturevision | 4.0h | 7.2h | 40h | OK (approved leave) |

### TuanNT Detail
- John Yi: 2.75h Fri, 7.58h week
- Rebecca: 1.25h Fri, 4.42h week
- Paturevision: 0h Fri, 0h week (allocated but not logged)
- **Scrin.io cross-check (John Yi only):** 2.75h task log <= 2.8h Scrin = OK

### Notes
- TuanNT on approved leave — 7.2h weekly confirmed correct
- LongVV requested leave (per email) — half-day Fri confirmed
- VietPH 28h weekly — approved leave, confirmed correct

## Fountain (5-Part Mandatory Check)

### Part 1: Matrix Plan (W19, posted by @trinhmtt 2026-03-26 09:31)
| Dev | Plan |
|-----|------|
| ViTHT | 22h |
| ThinhT | 4h |
| HaVS | 22.5h |
| VuTQ | 40h |
| QC Total | 22h |

### Part 2: Task Log Actuals (Summary W19)
| Dev | Actual | Charged |
|-----|--------|---------|
| VuTQ | 40.0h | 40.0h |
| ThinhT | 4.0h | 0.0h |
| ViTHT | 22.0h | 0.0h |
| PhatDLT (QC) | 12.0h | 0.0h |
| HungPN (QC) | 10.0h | 0.0h |
| HaVS | 22.5h | — |

### Part 3: Plan vs Actual
| Dev | Plan | Actual | Delta | Status |
|-----|------|--------|-------|--------|
| VuTQ | 40h | 40.0h | 0 | ✓ |
| ViTHT | 22h | 22.0h | 0 | ✓ |
| ThinhT | 4h | 4.0h | 0 | ✓ |
| HaVS | 22.5h | 22.5h | 0 | ✓ |
| QC (PhatDLT+HungPN) | 22h | 22.0h | 0 | ✓ |

### Part 4: Capacity & Runway (Est vs Charged)
- Total Estimated: 764.25h
- Total Actual: 862.0h (112.8% — project over budget)
- Total Charged: 174.25h (20.3% charge rate)
- Unstarted estimate: ~86h (#2524 24h, #2590 8h, #2554 6h, #1178 40h, #2240 8h)

### Part 5: Over-estimate Tracking
| Task | Est | Actual | % | W-o-W Growth | Status |
|------|-----|--------|---|-------------|--------|
| #2595 Giftdrop Redemption | 120h | ~170h | 142% | +~2h (slowing) | Deployed staging, mostly QC |
| #2615 Gift of Choice | 12h | 91.75h | 765% | +~7.75h | **STILL GROWING** — VuTQ active |
| #2624 Order Complete | 12h | 31.25h | 260% | — | Dev Done, stable |
| #2639 Active/Inactive | 2h | 6.0h | 300% | — | In progress |

### Fountain Trello Board
- **Active:** To-Do 36, Bugs 6, Doing 3, QC Internal 5, QA Backlog 1, In QA 4, Not Passed 0
- **Stuck:** #2695 Fountain New Redemption flow — [47 days no activity](https://trello.com/c/DfP5ExzX/2695)
- **Customer comments:** mike62798179 (2 comments — missing orders #6028153BR, #5717281JL, #1524456RT), kunalsheth (2 — testing through weekend, GiftDrop admin artwork)
- **New bugs:** #2802 InvalidAuthenticityToken (Mar 27), #2803 NoMethodError stripe_webhooks (Mar 28)

## Slack Channel Detail

| Workspace | Msgs | Key Activity |
|-----------|------|-------------|
| Baamboozle | 17 | PR #581 review, 5 cancellation responses |
| RDC - FM Monitoring | 6 | Tuner access logs, recovery alert (OK) |
| Swift Studio | 8 | Rory error fix, internal API request for Mon, Gift Card done |
| Xtreme Soft | 9 | Kai sick Tue, LIFM2-428 in progress, PR #468 review |
| SAM GUARD | 28 | DP-390 unhold, MQL leads, bug fixes merged to 9.1 |
| GGS | 2 | Nick PS9 promo code analysis, server report posted |
| Amazing Meds | 8 | CTA change ("See if you qualify"), button style update |
| Generator | 7 | Error card triage, Carrick off Fri, demo tested OK |
| LegalAtoms | 34 | Texas/Maryland handoff (Matias→Talha), UX discussion |
| MPFC | 0 | No activity |
| William Bills | 9 | Missing WP upsell deploy, Lucas AWS password issue |
| Equanimity | 18 | XID face verification — Carrick posted fix, awaiting customer recheck |
| SoCal Auto | 0 | No activity |
| Aigile Dev | 1 | Newsletter ready to review |

## Upwork (Week Mar 30 - Apr 5)

| Workroom | Developer | This Week | Last Week |
|----------|-----------|-----------|-----------|
| Rory | LeNH | 0:00 | 27:40 |
| Neural Contract | external | 0:00 | 0:00 |
| Aysar | LeNH | 0:00 | 4:00 |
| Bailey-VietPH | VietPH | 0:00 | 28:00 |
| Bailey-DuongDN | DuongDN | 0:00 | 0:00 |

New week start — all 0h expected.

## Trello Status

### Check Progress — Items NOT completed (alerts found):
- **Rebecca - William Bills** — Lucas AWS password issue, missing WP deploy

### Items to complete (no alerts):
- Fountain ✓ (HaVS 22.5h matches plan, #2615/#2802/#2803 are dev topics not person alerts)
- John Yi - Amazing Meds ✓ (TuanNT confirmed approved leave)
- Rory ✓ (LeNH 40.3h meets 40h minimum)
- Maddy/Carrick/Kai/Luis ✓
- Blake ✓
- James Diamond - Vinn ✓ (Jeff 4h report OK)
- Franc ✓
- Aysar ✓
- Elliott ✓ (KhanhHH on leave Fri, no Slack alerts)
- Raymond - LegalAtoms ✓
- Marcel ✓
- Colin - Aigile ✓
- Andrew - Bizurk ✓
- Elena - SamGuard Digital Plant ✓
- Elena - WordPress SamGuard ✓
- MPFC ✓
- Neural Contract ✓
- Bailey ✓

## Task Log Reminders

No reminders needed — TuanNT and VietPH confirmed on approved leave.

## Unresolved Questions

1. **XID face verification** — Carrick posted fix. Waiting for customer recheck.
2. **Nick-GG missing Fri report** — was he on leave?
3. **Fountain #2803 stripe_webhooks error** — appeared same week as webhook deploy. Related?
4. ~~HaVS under-delivered~~ — RESOLVED: actual 22.5h matches plan exactly
7. **Matrix refresh_token expired** — stored token is placeholder. Automated cron needs real token.
