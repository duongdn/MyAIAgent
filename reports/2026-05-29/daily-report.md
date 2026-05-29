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

