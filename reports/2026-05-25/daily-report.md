# Daily Report — Monday 2026-05-25

**Window:** 2026-05-23 08:00 +07:00 → 2026-05-25 08:38 +07:00 (Fri 8AM–Mon 8:38AM)
**Coverage:** Email · Slack · Discord · Scrin.io · Sheets · Fountain · Elena · Trello · Reminders

---

<!-- Sections appended below as each piece completes -->

## Email all — 08:38 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 0 | No significant emails |
| carrick | 1 | BXR Catch-Up invite (Rory Hackett) — Mon May 25 3–4pm +07 |
| nick | 0 | No emails from John Yi |
| rick | 20 | Rollbar daily digests (FountainGifts/InfinityRoses/FirstProject Sat+Sun+Mon) + FountainStaging BugSnag burst |
| kai | 11 | Madhuraka: Bitbucket PRs #475/#476/#490, Jira LIFM2-430/432/437/438 (Fri 05-23 evening) |
| ken | 43 | GitHub: Precognize/development activity, welligence/web, mimaizumi/amocc-material PRs |

**Alerts:**
- **rick — FountainStaging (BugSnag, 05-24 21:57–23:26 +07):** Cluster of 6 staging errors — `PendingMigrationError` (migration not run after deploy), `ECONNREFUSED` (service down), `ArgumentError` (auth endpoints), `NoMethodError`. **Staging only, not production.** Info-level but worth flagging to Fountain team.
- **carrick — Meeting:** BXR Catch-Up with Rory Hackett today 3–4pm +07

---

## Slack all — 08:38 (+07:00)

| Workspace | Msgs since Fri 8AM | Key content |
|-----------|-------------------|-------------|
| baamboozle | 7 | Aysar: "Good to deploy" in #gamedev (May 24). Jamie on public holiday today. |
| rdc | 16 | Automated: Tuner Access Logs + 1 Tuner Recovery Alert May 24 (auto-reboot, INFO). No dmetiner/Franc human messages. |
| swift | 1 | Jeff: "yes, sure" in #bxr__app (May 25). No Carrick/Rory visible. |
| xtreme | 0 | No messages returned. |
| samguard | 5 | HubSpot MQL leads only. No Elena/DP activity. |
| ggs | 0 | No messages returned. |
| amazingmeds | 3 | Nick active: greeted John Yi, created `am-analytics-tracker.php` (May 25 ~08:36 +07). Normal dev work. |
| generator | 0 | No activity. Elliott/Violet: none. |
| legalatoms | 3 | Raymond: form designer spec update (May 23). Arslan reporting issue. No Nick-specific content. |
| mpfc | 0 | No activity. |
| williambills | 25 | Lucas+Oliver active. Discussing design consistency (desktop vs mobile product cards). No blockers. |
| equanimity | 0 | 0 msgs (possible stale xoxc session — no invalid_auth error). |
| aigile | 1 | Automated "Gaige Alerts" bot only. No Colin activity. |

**Notes (per memory rules):**
- **Kai-Xtreme 0 msgs:** Kai is 16h/wk — daily report in Xtreme NOT required (feedback_kai_16h_no_daily_report). Not an alert.
- **Nick-GGS 0 msgs:** GGS Nick daily report absence is NOT an alert (feedback_ggs_nick_daily_report). Not an alert.
- **Equanimity:** 0 results with no error — possible stale xoxc session. Carrick/Marcel status unconfirmed.
- **Generator 0:** Elliott/Violet no messages — check sheets for KhanhHH hours before Trello decision.
- **RDC Tuner Recovery Alert:** Automated reboot only — INFO, not blocking.

---

## Elena — 08:38 (+07:00)

### PRs (nustechnology/Elena-SamGuard-Digital-Plant)
None — no open PRs. Nothing to merge or deploy.

### Precognize PRs (nusken)
5 open PRs on Precognize/development — none authored by nusken. No action required.

### WordPress SamGuard
✓ Clean — 0 JS errors, 0 CSP violations.

**Alerts:** None.

---

## Scrin.io — 08:38 (+07:00)

**Date checked:** Friday 2026-05-23 (Mon bug bypassed — fetched Fri directly)

| Day | Scrin hours (TuanNT / John Yi) |
|-----|-------------------------------|
| Mon 05-19 | 0h |
| Tue 05-20 | 0h |
| Wed 05-21 | 0h |
| Thu 05-22 | 2h 00m ("Data tracking Form") |
| Fri 05-23 | 0h |
| **W20 total** | **2h** |
| May total | 34h 03m |

**⚠️ Concern:** Only 2h tracked in Scrin for the full week of May 19–23 (John Yi company). Compare against TuanNT's John Yi task log — if significantly higher, flag as over-inflation.

---

## Discord all — 08:38 (+07:00)

| Server | Account | Msgs since Fri 8AM | Key content |
|--------|---------|-------------------|-------------|
| AirAgri | nusvinn | 7 | Vinn: "Approved" only (no formal report). Jeff: responded to jdiamond question about user roles (no formal report). |
| Bizurk | nuscarrick | 0 | Silent — normal. |

**Alerts:**
- **⚠️ Vinn (AirAgri):** No formal daily report since Fri May 23 or Mon May 25 (format: "Just report my process today:"). Last report was before window. 
- **⚠️ Jeff (AirAgri):** No formal daily report Fri May 23 or Mon May 25. Active (responded to jdiamond question May 24–25) but no structured report.
- **Note:** May 24 = Saturday. May 25 = Monday 08:38 — still early; reports may come later today.

---

## Fountain — 08:38 (+07:00)

### Part 1 — Matrix Plan (W28)
**Not posted yet** — room silent since Fri May 22 16:08 +07. Expected by 09:30 (per Monday timing rule). W27 plan for reference: ViTHT 40h / ThinhT 4h / DatNT 40h / LamLQ 20h / QC 22h (posted by @trinhmtt Mon 2026-05-18 11:10 +07).

### Part 2 — Task Log Actuals
W28 (May 25–31): all 0h (expected — Monday 08:38). W27 final actuals:

| Dev | Role | W27 Actual |
|-----|------|-----------|
| ViTHT | Dev | 32.0h |
| ThinhT | Dev | 4.0h |
| VuTQ | Dev | 0.0h (expected — moved to Bailey) |
| HaVS | Dev | 0.0h (not in W27 plan — OK) |
| PhatDLT | QC | 10.0h |
| HungPN | QC | 18.0h |
| TrinhMTT | PM (not QC) | 0.0h |

QC combined W27: 28h vs plan 22h (+6h over). DatNT/LamLQ not in Summary tab col map — cannot verify directly.

### Part 3 — Plan vs Actual (W27)
| Dev | Plan | Actual | Delta |
|-----|------|--------|-------|
| ViTHT | 40h | 32.0h | −8h |
| ThinhT | 4h | 4.0h | ✓ |
| PhatDLT+HungPN (QC) | 22h | 28.0h | +6h |
W28: cannot compare — plan not yet posted.

### Part 4 — Capacity & Runway
| Metric | Value |
|--------|-------|
| Remaining (Not Started + In Progress) | 409.8h |
| Dev capacity | ~90h/week |
| Runway | **~4.6 weeks** |

### Part 5 — Over-Estimate Tracking
| Task | Est (I+J) | Actual | Over% | Status |
|------|-----------|--------|-------|--------|
| #2595 | 120h | 168.25h | **+40%** ⚠️ | Deployed on Staging |
| #2615 | 12h | 106.75h | **+790%** 🔴 | Deployed on Staging — CRITICAL |
| #2735 | 120h | 133.0h | +11% | In-progress (within threshold) |
| #2627 | 0.5h | 8.2h | +1550% | Has Bug on Live |
| #2639 | 2h | 16.5h | +725% | Deployed on Staging |

**Alerts:**
- 🔴 **#2615:** 106.75h actual vs 12h est (+790%) — critically over, still on staging, no CR applied
- ⚠️ **#2595:** 168.25h vs 120h (+40%) — over threshold, still on staging
- **W28 plan:** not yet posted (08:38) — re-check after 09:30
- **ViTHT W27:** 32h vs 40h plan (−8h under)

**Aysar Matrix room (Jamie, Ronan):** Last message May 21 — room silent since then. Will check if Aysar hours logged on Fri May 23 once Sheets data arrives (to determine if reminder needed).
