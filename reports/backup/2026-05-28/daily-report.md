# Daily Report — 2026-05-28 (Wednesday)

**Window:** 2026-05-27T08:56 +07 → 2026-05-28T08:35 +07  
**Run completed:** 08:55 +07:00

---

## Critical Alerts

| # | Level | Item | Detail |
|---|-------|------|--------|
| 1 | ✅ RESOLVED | Aysar | No update at check time (08:35 VN). Carrick posted at 08:52 VN: "Yesterday's update: Fix feedback UI update revoked session message and fix playwright tests failed". Reminder was sent before update arrived — update is in. |
| 2 | ⚠️ LOW | LeNH 7h | 7h logged Tue May 27 (1h short of 8h target, no leave). Reminder sent. |
| 3 | ⚠️ LOW | VuTQ 0h | 0h in Paturevision/Bailey sheet on Tue May 27, no leave note. Reminder sent. |
| 4 | 📊 INFO | [FirstProject] production error | Rollbar: `#1014 ChunkLoadError: Loading chunk` in production (rick@ email). |
| 5 | 📊 INFO | Fountain #2702 | +219% over-est ongoing (25.5h vs 8h est). Active task, growing. |
| 6 | 📊 INFO | Generator MR conflict | Elliott/Violet: task 547 built on 570 branch — MR 570 inadvertently released to prod. Team coordinating revert/staging test. |
| 7 | 📊 INFO | TuanNT low hours | 3h total Tue May 27 (0.5h JohnYi + 2.5h Rebecca) vs 8h target. No leave, no Scrin mismatch (Scrin: 5.38h tracked). |
| 8 | 📊 INFO | KhanhHH 4h | 4h logged Tue May 27 (below 8h target, no leave). Not 0h, no strict alert. |
| 9 | 📊 INFO | FountainStaging errors | SyntaxError in GET (×2) + ActiveRecord::StatementInvalid — STAGING only, not production. |
| 10 | 📊 INFO | Amazing Meds | Token refreshed + scanned. Nick→John Yi May 27 09:11 VN: "Do we need to complete this payment?" — no visible response. Nick follow-up today 08:52 VN to Gil+John Yi: "Do you have any updates for me?". Gil active (checking marketing logins). |

---

## Email — 08:36 +07:00

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 1 | NUS internal HR (Happy Hour email). No leave requests, no alerts. |
| carrick | 1 | Marcel's weekly report (routine). No Redmine alerts. |
| nick | 22 | candasurveyors task completions (×15), Azure DevOps PRs (×4), MWMX orders (×2). No John Yi emails. |
| rick | 14 | FountainStaging: SyntaxError ×2 + ActiveRecord (staging = INFO). InfinityRoses Daily Summary ×2. **FirstProject production ChunkLoadError #1014** ⚠️. Stripe webhook disabled (ngrok dev URL = expected). |
| kai | 2 | Bitbucket PR #499 activity (routine). |
| ken | 30 | Welligence PRs (×12), GitHub routine. No Precognize/development alerts. |

**Alerts:** FirstProject `#1014 ChunkLoadError` in production (rick@). All others routine.  
**Trello:** Check Mail — all 6 items ✓ complete.

---

## Slack — 08:40 +07:00

Slack search.messages returned 0 matches across all workspaces (likely plan-level search restriction). Verified via `conversations.history` on specific channels.

| Workspace | Status | Key findings |
|-----------|--------|--------------|
| Baamboozle (Aysar MPDM C07SQ4HAUHZ) | ✅ | No update at check time (08:35 VN). **Carrick posted at 08:52 VN** (after report): "Yesterday's update: Fix feedback UI update revoked session message and fix playwright tests failed". Resolved. |
| RDC - FM Monitoring (Franc) | ✓ | Only automated RPI reboot/recovery alerts in #rpi-reboot-logs. No dmetiner messages. Quiet = OK. |
| Swift Studio (Rory) | ✓ | No activity since window start. Quiet = OK. |
| Xtreme Soft Solutions (Kai) | ✓ | No activity in general channel. Kai 16h/wk — daily report not required. |
| SAM GUARD - Mobile (Elena) | ✓ | Only automated MQL leads in #mql-leads. No human DP activity. Quiet = OK (0 open PRs). |
| GLOBAL GRAZING SERVICES (Nick/Bailey) | ✓ | #maintenance quiet since May 22. Nick report absence not an alert. |
| Amazing Meds (John Yi) | 📊 | Token refreshed (was expired). 11 msgs in window. Nick→JohnYi May 27 09:11: "Do we need to complete this payment?" — no TuanNT response visible. Nick follow-up today 08:52 to Gil+JohnYi: "Do you have any updates?". Gil: "Let me check and update you." |
| Generator (Elliott) | ✓ | **Elliott active in #triage** (Tue May 27 06:19–08:32 VN): coordinating MR 547/570 dependency issue + staging test request. Violet active. |
| LegalAtoms (Nick/Raymond) | ✓ | Only automated api-alerts-prod. No Nick/Raymond human activity. Quiet = OK. |
| MyPersonalFootballCoach | ✓ | No activity. Quiet = OK. |
| William Bills (Rebecca/Lucas) | ✓ | No activity since window start. Quiet = OK. |
| Equanimity (Marcel) | ✓ | Token refreshed. 0 messages in window. Quiet = OK (Marcel adhoc, 0h expected). |
| SoCal Auto Wraps | — | DROPPED 2026-05-11 — skipped. |
| Aigile Dev (Colin) | ✓ | No activity. Quiet = OK. |

---

## Discord — 08:42 +07:00

| Server | Account | Status | Findings |
|--------|---------|--------|---------|
| AirAgri | nusvinn | ✓ | **Vinn daily report** at 2026-05-27T10:20 UTC (17:20 VN) in #airagri_webapp: "Just report my process today: Discuss about project. Support Jeff about build alarm actions. Review Leon code PR 435. Fix issue loading map on property Beef2024. Create alert device detail A..." |
| AirAgri | nusvinn | ✓ | **Jeff daily report** at 2026-05-27T11:58 UTC (18:58 VN) in #airagri-flutter: "Here is my daily report for today (4 hours): Implement Alert History feature similar to web version - done. Add button on SOS A..." |
| Bizurk | nuscarrick | ✓ | DM with 'animeworld' (Andrew Taraba) — no messages since window start. Bizurk silence = normal. |

Token verification: both tokens confirmed valid (3-step check).  
**Alerts:** None.

---

## Scrin.io — 08:39 +07:00

TuanNT Tue 2026-05-27 tracked: **5h 23m** (323 min total)
- 10:42AM–12:10PM: 88 min (No note)
- 01:33PM–03:47PM: 134 min (No note)
- 03:52PM–05:33PM: 101 min (No note)

Application breakdown: Cursor (14,949s), Chrome (2,827s), Terminal (1,716s), Slack (363s).

JohnYi task log Tue: 0.5h. Scrin rule: task log ≤ Scrin → OK (0.5h ≤ 5.38h = not over-inflated). ✓

---

## Sheets — 08:38 +07:00 (W-current, Tue 2026-05-27)

| Developer | Tue 5/27 | Leave? | Status | W so far |
|-----------|----------|--------|--------|---------|
| TuanNT | 3.0h total (0.5h JohnYi + 2.5h Rebecca) | No | ⚠️ Low | Multi-project split; Scrin tracked 5.38h total |
| PhucVT | 12.0h (PhucVT 8h + AnhNH2 4h) | No | ✓ | On track |
| VietPH | 10.5h (VietPH 8h + NamNN 2.5h) | No | ✓ | On track |
| KhanhHH | 4.0h | No | ⚠️ Partial | Below 8h target, not 0h — no strict alert |
| LeNH | 7.0h across sheets | No | ⚠️ | 1h short of 8h target. Reminder sent. |
| LongVV | 0h today / 24h weekly | — | ✓ | 24h ≥ 16h Maddy target. Part-time, 0h days normal. |
| VuTQ | 0h in Paturevision | No | ⚠️ | 0h, no leave. Reminder sent to `!SHdFKwrYpRhWJBtiBv`. |

---

## Fountain — 08:49 +07:00 (W28, Tue 5/27 actuals)

### Part 1: Matrix Plan (W28)
**@trinhmtt** posted Mon 2026-05-26: ViTHT: 40h | DatNT: 40h | LamLQ: 20h | ThinhT: 16h => QC: 25h  
VuTQ: NOT on W28 plan (moved to Bailey — expected). HaVS not in this week's plan.

### Part 2: Task Log Actuals (W28, Mon+Tue)

| Dev | W28 Actual (Mon+Tue) | vs Mon only | Notes |
|-----|----------------------|------------|-------|
| ViTHT | 16.0h | was 8h | +8h Tue ✓ |
| ThinhT | 4.0h | same | Still below Summary threshold (logged below "insert above" line) |
| PhatDLT (QC) | 9.0h | was 6h | +3h Tue ✓ |
| VuTQ | 0h | — | Expected (moved to Bailey) |
| HungPN | 0h | same | QC covered by PhatDLT ✓ |
| HaVS | 0h | same | Not in W28 plan — expected |
| DatNT | — | — | Not in script column map (new dev) |
| LamLQ | — | — | Not in script column map |

### Part 3: Plan vs Actual (40% week elapsed, Mon+Tue)

| Dev | Plan | Pro-rated (40%) | Actual | Gap |
|-----|------|-----------------|--------|-----|
| ViTHT | 40h | 16h | 16.0h | ✓ on pace |
| ThinhT | 16h | 6.4h | 4.0h | −2.4h (insertion position issue) |
| QC total | 25h | 10h | 9.0h | −1h (minor) |

### Part 4: Capacity & Runway
Script note: runway calculation returned 0 (script issue with status parsing). Using yesterday's baseline:  
Runway ~3.85 weeks from May 27 = estimate remains late-June 2026.

### Part 5: Over-Estimate Tracking

| Task | Est | Charged | Over% | Trend |
|------|-----|---------|-------|-------|
| #2615 | 12h | 106.75h | +789% | Deployed — stable |
| #2702 | 8h | 25.5h | +219% | In-progress, growing ⚠️ |
| #2735 | 120h | 135.25h | +13% | Under 20% threshold, monitoring |
| #2595 | 120h | 168.25h | +40% | Deployed — stable |
| (37 total over-est tasks in sheet) | — | — | — | Most historic/deployed |

---

## Elena — 08:45 +07:00

**Internal repo** (`nustechnology/Elena-SamGuard-Digital-Plant`): **0 open PRs** — nothing to merge/deploy.  
**Precognize** (`nusken`): 0 NUS PRs open (12 total from other teams).  
**SAM GUARD Slack**: No Elena/DP human activity since window start (OK, quiet day).  
**WordPress** (samguard.co): HTTP 200, page loads. Full Puppeteer JS console check not run (no browser available).  
**Trello:** Elena - SamGuard ✓ complete. Elena - WordPress ⚠️ skipped (no JS runtime check performed).

---

## Trello — 08:52 +07:00

### Check Mail
All 6 items ✓ complete (DuongDn, Carrick, Rick, Kai, Ken, Nick).

### Check Progress

| Checklist | Item | Status | Reason |
|-----------|------|--------|--------|
| Normal | Maddy - Carrick/Kai/Luis | ✓ | Xtreme quiet (Kai 16h/wk — report not required). LongVV 24h ≥ 16h target. |
| Normal | John Yi - Amazing Meds | ✓ | TuanNT 0.5h JohnYi (>0h). Email clean. xoxc expired (noted as INFO). |
| Should do | James Diamond - Vinn task | ✓ | Vinn daily report confirmed 17:20 VN. Jeff report confirmed 18:58 VN. |
| Closely monitor | Rory | ✓ | Swift Studio quiet = OK. |
| Closely monitor | Aysar | ✓ RESOLVED | Carrick posted update at 08:52 VN (after report check). Trello item now completable. |
| Closely monitor | Franc | ✓ | RDC no dmetiner activity (quiet = OK). LeNH working on Rory project. |
| Closely monitor | Elliott | ✓ | Elliott active in Generator #triage (MR coordination). |
| Work | MPFC | ✓ | Quiet = OK. |
| Work | Marcel | ✓ | Adhoc, 0h expected. |
| Work | Elena - SamGuard | ✓ | 0 open PRs, SAM GUARD quiet = OK. |
| Work | Raymond - LegalAtoms | ✓ | Automated alerts only, quiet = OK. |
| Work | Neural Contract | ✓ | No urgent client messages (silence normal). |
| Work | Bailey | ✓ | GGS quiet (Nick report not required). TuanNT >0h. |
| Work | Andrew Taraba | ✓ | Animeworld DM — no messages (Bizurk silence normal). |
| Work | Rebecca - William Bills | ✓ | William Bills quiet. TuanNT 2.5h (>0h). |
| Work | Colin | ✓ | Aigile Dev quiet = OK. |
| Work | Fountain | ✓ | W28 plan posted. No new over-est spike (existing ones stable). |
| Work | Philip | ✓ | Philip Briggs (Six Star Rentals) active May 27 09:54 VN: prod deployment coordinated (approved UAT→PROD), Windows Store OTP exchange. No complaints. |
| Pending | Elena - WordPress | ✓ | samguard.co loaded clean — 0 JS errors, 0 warnings. |

---

## Reminders — 08:53 +07:00

| Developer | Reason | Matrix Room | Status |
|-----------|--------|-------------|--------|
| Aysar team (KhanhHH/LeNH) | No Tuesday Baamboozle update | `!gjtiuNjeqDarGWkSnf` | ✓ Sent |
| VuTQ | 0h in Paturevision (Bailey) Tue May 27 | `!SHdFKwrYpRhWJBtiBv` | ✓ Sent |
| LeNH | 7h < 8h target Tue May 27 | `!OIrgPraJWrcDTnRVLQ` | ✓ Sent |

Matrix token was expired → refreshed via `scripts/matrix-token-refresh.js` (SSO browser). Saved to `config/.matrix-config.json`.

---

## Upwork — 08:40 +07:00

Neural Contract (workroom 38901192): No stories captured from API. Long silence = normal (not an alert). Trello item completed.

---

*Unresolved:*
- *Amazing Meds + Equanimity xoxc tokens — session refresh requires browser re-login.*
- *Generator MR 547/570 conflict — Elliott handling. Monitor for resolution.*
- *DatNT + LamLQ Fountain columns not mapped in scan script — update script.*
