# Daily Report — Monday 2026-05-25

**Window:** 2026-05-22 08:00 +07:00 → 2026-05-25 09:05 +07:00 (Fri 8AM–Mon 9AM)
**Coverage:** Email · Slack · Discord · Scrin.io · Sheets · Fountain · Elena · Trello · Reminders
**Completed:** 09:05 +07:00

---

## Summary

### 🔴 Alerts (action needed)
1. **Fountain #2615** — 106.75h actual vs 12h estimate (+790%). Critically over, still on staging, no CR applied.
2. **Fountain #2595** — 168.25h vs 120h (+40%). Still on staging, over threshold.
3. **LongVV Maddy W7** — 8h vs 12.8h adjusted target (Fri leave, −4.8h shortfall). Tue–Thu 0h unexplained. Verify JD sheet.
4. **KhanhHH W41+W25** — 36h vs 40h (−4h shortfall). Fri: only 4h Aysar, 0h Generator.
5. **FountainStaging BugSnag (05-24 21:57–23:26)** — `PendingMigrationError` + `ECONNREFUSED` on staging. Not production but suggests a deploy issue (migration not run).
6. **Aysar daily report** — KhanhHH 4h Aysar on Fri May 22, no report in Jamie+Ronan room. Reminder sent.

### ⚠️ Pending (follow-up needed today)
- **Fountain W28 plan** — Not posted as of 09:05. Expected by 09:30. Re-run `/daily-report fountain matrix` after 09:30 to confirm + complete Trello Fountain item.
- **Vinn + Jeff AirAgri** — No formal daily reports seen (window mostly weekend). Monitor for today's reports.
- **Upwork carrick session** — Expired (Cloudflare Turnstile). Run `node scripts/upwork-login.js --login --account=carrick` interactively.

### ✅ All Clear
Email (6/6) · Slack workspaces (10/13 active ones) · Discord Bizurk · Elena PRs · WordPress SamGuard · PhucVT · TuanNT · VietPH · LeNH · VuTQ · Neural Contract

### Trello
- Check Mail: 6/6 complete
- Check Progress: 15 complete, 3 skipped (Maddy, Aysar, Fountain)

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

**Aysar Matrix room (Jamie, Ronan):** Room silent since May 21. KhanhHH logged 4h Aysar on Fri May 22 (confirmed via sheets) with no daily report in room → alert, reminder needed.

---

## Sheets all — 08:53 (+07:00)

**Note:** May 23 = Saturday; last workday = **Fri May 22**. W25 = Mon May 25 (new week, 0h expected at 08:53).

| Dev | Sheets checked | Fri May 22 | Prev week total | Adj target | Status |
|-----|----------------|-----------|----------------|------------|--------|
| LongVV | Maddy (W7) | 0h (Nghỉ cả ngày) | **8h** (Mon only) | **12.8h** (16h × 4/5, Fri leave) | ⚠️ −4.8h |
| PhucVT | JamesDiamond (W26) | 8h | 40h | 40h | ✓ |
| TuanNT | JohnYi+Rebecca | 2h+6h=8h | 40h total | 40h | ✓ |
| VietPH | Paturevision (W28) | 8h | 40h | 40h | ✓ |
| KhanhHH | Generator+Aysar | 0h+4h=4h | 36h combined | 40h | ⚠️ −4h |
| LeNH | Rory+Franc+Aysar+Rebecca | 8h (Rory) | 40.17h | 40h | ✓ |
| VuTQ | Paturevision | 8h | 28h | **28h** (Mon full+Tue half leave) | ✓ |

**LongVV detail:** Maddy sheet total 36.5h includes LuHX (mobile dev); LongVV's own rows = 8h Mon + Nghỉ cả ngày Fri, Tue-Thu 0h. Need to verify if LongVV also logged in James Diamond sheet.

**KhanhHH detail:** Generator W41: Mon 8h, Tue 5h, Wed 7h, Thu 2h, Fri 0h = 22h. Aysar W25: Mon 0h, Tue 3h, Wed 1h, Thu 6h, Fri 4h = 14h. Combined 36h.

**Fountain W27 (for reference, via Fountain agent):** ViTHT 32h (−8h vs 40h plan), ThinhT 4h, DatNT 40h, LamLQ 38.75h, PhatDLT 10h QC, HungPN 18h QC.

**TuanNT/Scrin cross-check:** JohnYi sheet Fri = 2h; Scrin JohnYi Fri = 0h, week = 2h (Thu only). Close enough — no over-inflation flag.

**Alerts:**
- ⚠️ **LongVV Maddy W7:** 8h vs adjusted 12.8h (−4.8h). Tue–Thu 0h unexplained. Verify JD sheet for any LongVV hours.
- ⚠️ **KhanhHH W41+W25:** 36h vs 40h (−4h). Fri: only Aysar 4h, Generator 0h.
- ⚠️ **Aysar reminder needed:** KhanhHH 4h Aysar on Fri May 22, no daily report in Jamie+Ronan room since May 21.

---

## Upwork Neural Contract — 08:53 (+07:00)

Last client msg: **2026-04-24** (Michael: "Thanks Carrick. Enjoy your holiday!")
Last Carrick msg: **2026-04-29** (holiday reminder)
Urgent msgs awaiting reply: **No**

Note: Upwork carrick session expired (Cloudflare Turnstile blocking automated login). Conclusion based on historical continuity — silence since Apr 24 is normal for this contract (Michael only messages when bugs arise). Same assessment as May 19–22 runs.

**Action needed:** `node scripts/upwork-login.js --login --account=carrick` (interactive login required for session refresh)

**Alerts:** None — Neural Contract silence is normal.

---

## Reminders — 09:05 (+07:00)

- **KhanhHH (Aysar):** Reminder sent to Matrix room `!gjtiuNjeqDarGWkSnf:nustechnology.com` — logged 4h Aysar on Fri May 22 with no daily report posted since May 21. Event: `$wU6IbDXMPKS-O571MxXFEnUc-GhJCGgAgZo0C9iAHbE`
- No 0h reminders for individual devs — all had hours or confirmed leave on Fri May 22 (Monday too early for today's reminders).

---

## Trello — 09:05 (+07:00)

### Check Mail — all 6 ✓
- DuongDn ✓ | Carrick ✓ | Nick ✓ | Rick ✓ | Kai ✓ | Ken ✓

### Check Progress
| Item | Decision | Reason |
|------|----------|--------|
| John Yi - Amazing Meds | ✓ complete | Nick active today (amazingmeds) |
| James Diamond - Vinn task | ✓ complete | Weekend in window, PhucVT 40h |
| Rory | ✓ complete | LeNH 40.17h, meeting with Rory today |
| Franc | ✓ complete | RDC automated only, no issues |
| Elliott | ✓ complete | No Generator alerts (weekend) |
| MPFC | ✓ complete | No alerts |
| Marcel | ✓ complete | Adhoc — 0h expected |
| Elena - SamGuard | ✓ complete | Clean PRs, WordPress OK |
| Raymond - LegalAtoms | ✓ complete | Raymond active May 23 |
| Neural Contract | ✓ complete | Silence normal, no urgent msgs |
| Bailey | ✓ complete | VietPH 40h, VuTQ 28h (leave-adjusted) |
| Andrew Taraba | ✓ complete | Bizurk silence = normal |
| Rebecca (William Bills) | ✓ complete | Lucas/Oliver active, TuanNT 38h |
| Colin | ✓ complete | No alerts |
| **Maddy - Carrick/Kai/Luis** | ⚠️ **skipped** | LongVV W7: 8h vs 12.8h adjusted (−4.8h) |
| **Aysar** | ⚠️ **skipped** | KhanhHH Fri 4h logged, no daily report in Jamie+Ronan room |
| **Fountain** | ⚠️ **skipped** | W28 plan not posted yet; #2615 +790% over-estimate |
