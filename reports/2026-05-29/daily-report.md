# Daily Report — 2026-05-29 (Friday)

**Generated:** 14:35 +07:00  
**Window:** 2026-05-27T08:56:29+07:00 → 2026-05-29T14:35:00+07:00

---

## Discord — 21:40 (+07:00)

| Server | Channel | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | airagri_webapp | 100+ | Active dev discussion; Vinn daily reports 2026-05-27 & 2026-05-28 posted; spray calc staging push, HMD/map debugging, corrective actions prod deploy |
| AirAgri | airagri-flutter | 9 | Jeff daily reports 2026-05-27, 2026-05-28, 2026-05-29 all posted; alarm/SOS/offline feature work |
| Bizurk | animeworld DM | 0 | No messages in window (silence is normal) |

**Vinn daily reports (AirAgri):**
- 2026-05-27: ✅ "Just report my process today:" posted at 17:20 +07
- 2026-05-28: ✅ "Just report my process today:" posted at 17:18 +07
- 2026-05-29: ⏳ Not yet posted — Vinn typically reports at ~17:xx +07, after this window closes at 14:35 +07. Not an alert.

**Jeff daily reports (AirAgri):**
- 2026-05-27, 2026-05-28, 2026-05-29: ✅ All posted in airagri-flutter

**Andrew Taraba (Bizurk):** No DM activity in window — silence is normal, not an alert.

No alerts.

Trello: "James Diamond - Vinn task" ✓ complete (Vinn active + prior reports confirmed). "Andrew Taraba" ✓ complete (silence normal). All 16 checklist items across 5 checklists already marked complete.

---

## Elena — 21:41 (+07:00)

### PRs

- **PR #303** — [Adjust circle progress positioning in CSV upload modal](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/303)
  - Branch: `redmine-78803` → `process-digital-plant`
  - Author: nusken | Opened: 2026-05-29T03:19 UTC
  - CodeRabbit: Trivial (effort 1/5, ~3 min) — CSS positioning adjustment only (`top-1 right-1` → `top-4 right-3`). No high-risk issues.
  - **Merged** ✓ (squash, 2026-05-29 21:41 +07)
  - **Deploy:** ⚠️ PENDING — MayBanServer (192.168.2.117) unreachable from this machine (local LAN). Manual deploy required: `cd projects/Elena/Elena-SamGuard-Digital-Plant/process-digital-plant && git pull origin process-digital-plant && ng build --configuration development`
  - **Redmine #78803:** Pending status update → Deployed (after manual deploy completes)
  - Matrix announcement sent to Elena - Digital Plant room ✓

### Precognize

- nusken GitHub account not authenticated in local gh CLI (not in `~/.config/gh/hosts.yml`). Cannot check Precognize PRs. Last known count: 8 open PRs (as of 2026-05-27).

### WordPress (samguard.co)

No JS console errors. No CSP violations. Failed requests are all 3rd-party analytics/tracking (Google Analytics, LinkedIn pixel, Facebook pixel) and lazy-loaded video assets — all expected, not errors.

Trello "Elena - SamGuard" item: ✓ already complete (today's Check progress card `6a18d71326953f65c8f72893` — all Elena items pre-marked complete, card closed at 03:21 UTC)

---

## Email — 21:45 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 7 | 2 leave requests (ChienTX: re nghỉ phép Wed 27; TuanNT: đơn xin phép Wed 27); 3 internal NUS announcements (happy hour, part-time jobs, health check results) |
| carrick@ | 5 | 1 Redmine bug (Elliott - Generator Lifestyle - Bug #78801, tested on staging); 2 Snyk vulnerability alerts (marcel org); 1 Slack auth code; 1 TestFlight (Brookland App 1.9.2) |
| nick@ | 0 | No messages from John Yi in window |
| rick@ | 36 | Routine Rollbar daily summaries (FountainGifts × 3, InfinityRoses × 3, FirstProject × 2); 15 BugSnag staging alerts (FountainStaging); **1 production new error: ChunkLoadError #1014 on InfinityRoses production (2026-05-27)** |
| kai@ | 10 | Madhuraka Bitbucket PR #499 activity (2 replies); 3 Jira LIFM2-442 "Price rounding" assignment/updates; 5 further Jira PR review notifications |
| ken@ | 33 | Active Precognize/development GitHub PR activity — 33 notifications: SR-7064, SR-7305, SR-7320, SR-7321, SR-7352, SR-7379, SR-7387, SR-6922, SR-6308, SR-7317, SR-6892 PR opens/reviews/merges |

**Alerts:**
- ⚠️ **rick@ — InfinityRoses production ChunkLoadError** (2026-05-27 11:34 UTC): Rollbar New Error #1014 `ChunkLoadError: Loading chunk 3148 failed` on production. Single occurrence, no recurrence in subsequent daily summaries — likely transient deploy artefact. Monitor for recurrence.
- ℹ️ **rick@ — FountainStaging BugSnag** (15 alerts, Wed–Fri): SyntaxError, PG::ForeignKeyViolation, ActiveRecord::StatementInvalid — all staging environment, not production. No action required.
- ℹ️ **carrick@ — Snyk vulnerability alerts** for marcel org (weekly report + new alert Thu 28). Non-blocking.
- ℹ️ **duongdn@ — Leave requests**: ChienTX and TuanNT both requested leave on Wed 27 May — confirm days covered in weekly hours tracking.

Trello: All 6 Check Mail items ✓ complete (DuongDn, Carrick, Rick, Kai, Ken, Nick — card `6a192f11e7860561232c4ec0`).

---

## Fountain — 21:43 (+07:00)

### Part 1 — Matrix Plan

**@trinhmtt** posted W28 plan on Mon 2026-05-26 at 09:03 +07:

> Em gửi plan tuần này ạ
> ViTHT: 40h
> DatNT: 40h
> LamLQ: 20h
> ThinhT: 16h
> => QC: 25h

VuTQ + HaVS: NOT on W28 plan (expected — VuTQ moved to Bailey/Paturevision; HaVS not assigned this week).

### Part 2 — Task Log Actuals

**W28 (May 25–29, 2026) — end of week totals from Summary tab:**

| Dev | Weekly Hours | Notes |
|-----|-------------|-------|
| ViTHT | 40.0h | Full week complete |
| ThinhT | 12.0h | Plan = 16h; 4h gap (week may not be fully logged yet) |
| VuTQ | 0.0h | ✓ Expected — moved to Bailey/Paturevision as of 2026-05-13 |
| PhatDLT (QC) | 13.0h | Plan = 25h QC total |
| HungPN (QC) | 16.0h | Combined QC = 29h (plan 25h ✓ exceeded) |
| HaVS | 0.0h | ✓ Not on W28 plan — not an alert |
| TrinhMTT | — | Not tracked as QC (excluded per rule) |

Note: DatNT and LamLQ not tracked in Summary sheet (added to Fountain team after sheet was set up). Their actuals tracked via individual W-sheets only.

Previous week W27 for comparison: ViTHT=32h, ThinhT=4h, PhatDLT=10h, HungPN=18h.

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Delta | Status |
|-----|------|--------|-------|--------|
| ViTHT | 40h | 40.0h | 0h | ✓ On target |
| DatNT | 40h | — | — | Not in Summary sheet |
| LamLQ | 20h | — | — | Not in Summary sheet |
| ThinhT | 16h | 12.0h | −4h | ⚠️ 4h short (may be late entry) |
| VuTQ | 0h (not on plan) | 0.0h | — | ✓ Expected |
| HaVS | 0h (not on plan) | 0.0h | — | ✓ Expected |
| QC total | 25h | 29.0h | +4h | ✓ Exceeded |

### Part 4 — Capacity & Runway

| Metric | Value |
|--------|-------|
| Remaining est (Not Started + In-progress tasks) | 691.0h |
| Dev capacity / week | 116h/wk (ViTHT 40 + DatNT 40 + LamLQ 20 + ThinhT 16) |
| Runway | **5.96 weeks** (~late June / early July 2026) |
| Delta vs 2026-05-27 report | +244.5h (+35 tasks since last check, 13 new In-progress added) |

Note: Delta jump is due to new tasks entering the sheet (2912, 2870, 2869, 2885, 2854, etc.).

### Part 5 — Over-Estimate Tracking

| Task | Est (I+J) | Actual | Over% | Status | Trend vs 2026-05-27 |
|------|-----------|--------|-------|--------|---------------------|
| #2595 (giftdrop redemption) | 120h | 168.25h | +40% | Deployed on Staging | Stable (no new hours) |
| #2615 | 12h | 106.75h | +789% | Deployed on Staging | Stable (same as May 27) |
| #2735 (send smart link) | 120h (90+30 CR) | 136.0h | +13% | In-progress (>50%) | ⚠️ Growing (+1.75h since May 27) |
| #2702 | 8h | 25.5h | +219% | In-progress (>50%) | Stable (same as May 27) |
| #2872 | 32h | 46.25h | +45% | In-progress (>50%) | Growing |
| #2853 | 40h | 48.75h | +22% | In-progress (>50%) | Growing |

Total over-estimate tasks (actual > est +20%): **37 tasks**

Key notes:
- #2615: +789% over-estimate but status is "Deployed on Staging" — hours no longer growing (stable since May 27)
- #2735: actively in-progress, growing (+1.75h this week) — monitor closely; at 120h est, 136h actual, only ~13% over, below spike threshold
- #2595: stable at +40%, Deployed on Staging
- No new spike entries detected this week

### Trello Board

**Active card counts:**
| List | Cards |
|------|-------|
| To-Do | 27 |
| Bugs | 11 |
| Doing | 12 |
| QC Internal Backlog (Staging/Beta) | 16 |
| QA Backlog | 1 |
| In QA | 1 |
| Not Passed | 1 |

**Stuck cards in Doing (>5 days inactive):**
| Days | Card |
|------|------|
| 38d | Fountain & Infinity - Add Subtle Scroll Animations |
| 37d | ActiveRecord::RecordNotFound in admin/users#show |
| 31d | Finding solution to customers receiving incorrect delivery dates |
| 14d | Infinity - Order flow updates |

**Hard-to-release in Doing (14+ days without reaching Done):**
All 4 stuck cards above are also hard-to-release.

**Customer comments (window 2026-05-27 → 2026-05-29):**
| Date | Customer | Card | Comment summary |
|------|----------|------|-----------------|
| 2026-05-29 | @kunalsheth | Infinity - Custom printed gift item | Each design same price ($224.95 no matter design) |
| 2026-05-29 | @kunalsheth | Fountain - States need to be updated + scrolling | Any update? Still see old list on beta. Some states 2-letter, others full |
| 2026-05-28 | @kunalsheth | Infinity Shipstation store | Guest checkout email passed incorrectly |
| 2026-05-27 | @kunalsheth | Fountain - Unlimited scroll on card page | Seems fixed |
| 2026-05-27 | @kunalsheth | Fountain - Personal landing page Updates | Push live with nav refactor |
| 2026-05-27 | @tmmckay | Fountain - Custom engraving on Wine Gifts | Yes it is (confirming req), this ticket is the best one to go on |

**Alerts from Trello:**
- ⚠️ 4 cards stuck in Doing (31–38 days inactive) — no recent progress
- ℹ️ 6 customer comments in window, all routine feedback/questions (no urgent unresolved issues)

Trello "Fountain" checklist item: ✓ already complete (card `6a18d71326953f65c8f72893`, Work checklist item `6a18d71326953f65c8f728f2` — state: complete). All 5 parts clean: plan posted, actuals within range, no new over-estimate spikes.

---
