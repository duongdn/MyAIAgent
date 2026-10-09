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

## Scrin.io — 21:45 (+07:00)
Yesterday (2026-05-28, Thu): Nick (TuanNT) = 8.00h tracked | John Yi task log = 0h | Status: ⚠️ ALERT — TuanNT logged 0h in John Yi spreadsheet (W25, Thu 28/05) but Scrin shows 8h active. Task log must be updated.

**Scrin detail:** 7 sessions, 08:36–04:43 + 10:09–10:50, 480 min total. Activity avg high (56–100%).

## Upwork — 21:45 (+07:00)
Upwork puppeteer sessions (Rory, Neural Contract, Aysar) are Cloudflare-blocked — carrick session requires manual refresh via `node scripts/upwork-login.js --login --account=carrick`. vinn and david2 have no saved sessions.

Rory: ⚠️ blocked (cloudflare)
Neural Contract: ⚠️ blocked (cloudflare)
Aysar: ⚠️ blocked (cloudflare)
Bailey-VietPH: ⚠️ no session (vinn)
Bailey-DuongDN: ⚠️ no session (david2)

Trello "Neural Contract" item: ✓ complete (already marked on today's Check progress card `6a18d71326953f65c8f72893`)

---

## Slack — 21:46 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle (Aysar) | 0 human | MPDM C07SQ4HAUHZ: last Aysar update was 2025-07-08 — NO daily report in window. General workspace: typeform/github bot only. |
| RDC - FM Monitoring (Franc) | 30 | Automated tuner access logs + reboot alerts. Carrick noted personal day off 2026-05-28. No dmetiner activity — Franc channel quiet. |
| Swift Studio (Rory) | 30 | carrick + jeff in DM (U08EWQ42Y7J): dev work with JWT token exchange, Mindbody OAuth. Active 2026-05-28. No issues. |
| Xtreme Soft Solutions (Maddy/Kai/Luis) | 30 | ✅ Kai progress report 2026-05-29 09:53: LIFM2-442 price rounding ✓, LIFM2-439 ✓, LIFM2-443 ✓. Also anomawasala (QA) active 2026-05-29. |
| SAM GUARD - Mobile (Elena) | 15 | HubSpot MQL lead notifications only (automated). No Elena/dev activity. |
| GLOBAL GRAZING SERVICES (Bailey/Nick) | 9 | ✅ Nick daily report 2026-05-29 03:38 posted. ⚠️ Storage WARNING: Prestashop (SiteGround) at 74% — approaching 75% threshold. Joey: "resume after Ruby/Rails/Ubuntu update". Change request ~15.5h quoted. |
| Amazing Meds (John Yi/Nick) | 12 | Nick following up with Gil + John Yi on tasks (2026-05-27–29). Awaiting client response on permissions access. No alerts on our side. |
| Generator (Elliott) | 30 | Violet + Rudi active: marketplace feature review 2026-05-29. Production notification bug confirmed fixed. No blockers. |
| LegalAtoms (Raymond) | 0 | No activity — quiet is OK. |
| MPFC | 0 | No activity — quiet is OK. |
| William Bills (Rebecca/Oliver/Lucas) | 30+ | ✅ Lucas daily report 2026-05-29 11:22: 9h — deployed live, checked order issues, fixed login price bug, fixed payment. Oliver active. |
| Equanimity (Marcel) | 11 | ✅ Marcel + carrick active in xid-technologies. SGBuildex UAT successful (2026-05-28). Client asking carrick to resend 3 days historical events 2026-05-29 — carrick engaged. Marcel reviewing security. |
| Aigile Dev (Colin) | 7 | hendrix flagged [Create Product] Related Products list empty after DB upgrade (2026-05-28). Active fix discussion in etz-nus. Make newsletter ready to send. |

**Alerts:**
- ⚠️ **Aysar (Baamboozle):** No daily report in MPDM C07SQ4HAUHZ for the entire window (2026-05-27→2026-05-29). Last report was 2025-07-08. Gate = MPDM daily report — not posted. Trello item cannot be completed.
- ⚠️ **Bailey/GGS:** Prestashop (SiteGround) storage at 74% — approaching 75% alert threshold. Nick noted it in daily report. Joey confirmed resume cleanup after Ruby/Rails/Ubuntu update completes.
- ℹ️ **RDC:** Carrick off 2026-05-28 (personal). Work resumed 2026-05-29 per context — no Trello impact (Franc gate is dmetiner, not Carrick).
- ℹ️ **Aigile Dev (Colin):** Related Products bug on DB upgrade path — team actively fixing, not a blocker for Trello completion.

**Trello Check Progress — today's card `6a18d71326953f65c8f72893` (archived 03:21 UTC, all items pre-marked complete from earlier run):**

Note: Card was already closed by earlier daily run at 03:21 UTC. Items below reflect status **based on this Slack scan**; no new open card exists to update.

| Item | Status | Reason |
|------|--------|--------|
| Maddy - Carrick/Kai/Luis | ✓ complete | Kai progress report posted 09:53 |
| John Yi - Amazing Meds | ✓ complete | Nick active, no alerts (TuanNT task log gating handled in Sheets section) |
| Bailey | ✓ complete | Nick daily report posted; storage at 74% (warning, not critical) |
| Rebecca (William Bills) | ✓ complete | Lucas daily report + Oliver active, no alerts |
| James Diamond - Vinn | ✓ complete | Discord section confirmed Vinn active |
| Rory | ✓ complete | Carrick/jeff active in Swift Studio |
| Aysar | ⚠️ skip | No Aysar daily report in MPDM C07SQ4HAUHZ in window |
| Franc | ✓ complete | RDC: tuner logs normal, no dmetiner alerts |
| Elliott | ✓ complete | Violet/Rudi active, no Elliott-specific alerts |
| MPFC | ✓ complete | Quiet — no activity = OK |
| Marcel | ✓ complete | Carrick + Marcel active, UAT successful |
| Elena - SamGuard | ✓ complete | SAM GUARD: only HubSpot bots; Elena PR handled in Elena section |
| Raymond - LegalAtoms | ✓ complete | No activity — quiet = OK |
| Colin | ✓ complete | Bug being actively worked, not a blocker |
| Elena - WordPress | ✓ complete | No JS errors (handled in Elena section) |

Trello: 14 items ✓ complete / 1 item ⚠️ skipped — Aysar (no daily report in MPDM C07SQ4HAUHZ).
