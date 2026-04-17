# Daily Report — 2026-04-17 (Friday)
**Window:** 2026-04-16 09:50 → 2026-04-17 08:40 (+07:00)

---

## Email (all) — 08:45 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 1 | Leave request reply from Nam Tran |
| carrick | 2 | Generator iOS 1.8.6 TestFlight build; Snyk vuln alert (Marcel org) |
| nick | 4 | 3 Azure DevOps PRs from Emir (CNA Operations App); daily task completions |
| rick | 8 | Rollbar daily summaries (INFO): InfinityRoses, FirstProject, FountainGifts; ClickUp Fountain feature flag task |
| kai | 10 | Jira LIFM2-409/431/432/433 activity; **SerpApi 90% usage warning** (Madhuraka fwd) |
| ken | 259 | Precognize staging-to-develop merges (#4835-4837); welligence + amocc-material PR volume |

No critical production alerts. Rick's Rollbar emails are daily summaries, not incident alerts.

---

## Slack (all) — 08:45 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 9 | Quizlet import errors, DNS allowlist discussion |
| RDC - FM Monitoring | 23 | Tuner access/recovery alerts; Carrick active on Livemap plugin API update (~1wk estimate) |
| Swift Studio | 0 | No activity |
| Xtreme | 3 | Kai active: LIFM2-429 hotfix done, LIFM2-432 checking, LIFM2-409 in progress |
| SAM GUARD | 21 | 11 MQL leads; Michelle active on autoscan/maintenance; Kfir branch instructions |
| GGS | 29 | Amy deployed subseller + sell-in-back-office to Live; Joey bug reports (product creation, labels, weight); Nick on GLS ShipIT API |
| Amazing Meds | 14 | Nick daily report ✓; **Nick taking leave (bereavement — family member passed away)**; blog AI stopped generating drafts (week 6) |
| Generator | 15 | Carrick fixed Array-to-string demo error; Rudi merging rent feature; DST handling deferred; Violet "Links in notifications" done |
| LegalAtoms | 30 | Raymond fixing recurring FAQ validation errors blocking Umair/Hamid/Sobia |
| MPFC | 5 | Dashboard API fix (getSkillsLibraryVideos) |
| William Bills | 8 | Lucas new Figma design page; Oliver coordinating |
| Equanimity | 0 | No activity |
| SoCal Auto Wraps | 0 | No activity |
| Aigile Dev | 1 | MailerLite newsletter draft ready |

Notes:
- Kai 16h/wk, daily report not required. Active on LIFM2 tickets.
- GGS Nick daily report not required (per feedback).
- Nick (Amazing Meds) on bereavement leave — communicated proactively.

---

## Discord — 08:45 (+07:00)

| Server | Account | Activity | Key content |
|--------|---------|----------|-------------|
| AirAgri | nusvinn | Active | Vinn daily report ✓ (spray module, areas API optimization). Jeff daily report ✓ (drag-and-drop, Spray Calculator, iOS 1.0.3 build 6). James Diamond staging property bug (resolved). |
| Bizurk | nuscarrick | 0 msgs | Silence. Andrew Taraba low-activity, normal. |

Alerts: None.

---

## Scrin.io — 08:45 (+07:00)

**TuanNT (John Yi):** 4h01m tracked on Apr 16.
- Main task: "handle homepage Elementor AM"
- Week total: 20h22m (Mon 4h, Tue 4h, Wed 8h, Thu 4h, Fri in-progress)
- Task log (John Yi) = 4h ≤ Scrin 4h01m → OK (not over-inflated)

---

## Sheets (all) — 08:45 (+07:00)

| Developer | Yesterday (Apr 16) | Status |
|-----------|-------------------|--------|
| LongVV (Maddy) | 8h | OK — W2 total 16h, meets 16h/wk target |
| PhucVT | 8h | OK |
| TuanNT (combined) | 4h | John Yi 4h (+ "Nghỉ cả ngày" half day) + Rebecca 0h. Weekly: 28h (JY 20.3h + RB 7.7h). Off Fri. OK |
| VietPH | 8h | OK |
| KhanhHH | 8h | OK |
| LeNH (combined) | 8h | Rebecca 8h (privateer fund). Weekly: 32h (Rory 0h + Franc 19.17 + Aysar 4.83 + RB 8). Off Fri ("Nghỉ cả ngày"). OK |

Alerts: None. Both TuanNT and LeNH off Fri, weekly totals OK.

---

## Fountain — 5-Part Check

### Part 1 — Matrix Plan
**⚠️ UNAVAILABLE** — Matrix token expired (M_UNKNOWN_TOKEN). Auto-refresh failed (SSO-only login). Manual browser login required.

Last known plan (from Apr 13, @trinhmtt):
> ViTHT: 30h | LamLQ: 10h | ThinhT: 20h | VuTQ: 40h | QC: 25h

### Part 2+3 — Task Log Actuals + Plan vs Actual (W22, Apr 13-17)

| Dev | Plan (wk) | Actual (W22) | Delta |
|-----|-----------|-------------|-------|
| VuTQ | 40h | 20.0h | -20.0h (50%) |
| ViTHT | 30h | 30.0h | On target |
| ThinhT | 20h | 8.0h | -12.0h (40%) |
| LamLQ | 10h | — | Not in Summary cols |
| QC (PhatDLT) | 25h combined | 13.5h | Behind |
| QC (HungPN) | — | 0.0h | Not sole QC, PhatDLT covers |

Team weekly total: 71.5h

Apr 16 breakdown: PhatDLT 4h (QC), ViTHT 6h (bugs 2815, accessibility 2702, homepage 2836).

### Part 4 — Capacity & Runway
- Remaining est (NS+IP): **167.5h** (was 213.75h → -46.25h consumed)
- Runway: **1.9 weeks** at 90h/wk (was 2.4wk → -0.5wk)
- Work consumed faster than added — runway shortening

### Part 5 — Over-Estimate Tracking

| Task | Est | Actual | % Over | Trend |
|------|-----|--------|--------|-------|
| #2595 | 120h | 168.25h | +40% | Stable |
| #2615 | 12h | 102.25h | +752% | Stable |
| #2735 | 90h | 106.25h | +18% | Stable |
| #2742 | 12h | 19.25h | +60% | **Status mismatch persists: "Not Started" with 19.25h** |

All 4 tracked items stable (no growth). Additional high over-estimates: #2639 (+725%), #2613 (+625%), #2501 (+538%).

**Alerts:**
- Matrix token expired — Parts 1+3 incomplete
- #2742 status mismatch persists
- ThinhT significantly behind (8h vs 20h plan, 40% at end of week)

---

## Elena / Precognize / WordPress — 08:45 (+07:00)

- **Elena PRs (duongdn):** No open PRs. No new merges since Apr 7.
- **Precognize PRs (nusken):** No open PRs by nusken.
- **Pending actions:** All 11 entries DONE. No pending deploys.
- **samguard.co:** HTTP 200, SSL valid, 1.58s response, security headers OK (HSTS, CSP, X-Content-Type-Options). No server-side errors detected.

---

## Upwork Weekly Hours (Apr 13-19) — 08:45 (+07:00)

| Workroom | Developer | This Week | Last Week |
|----------|-----------|-----------|-----------|
| Rory | LeNH | **0:00** | 12:30 |
| Neural Contract | external | 0:00 | 0:40 |
| Aysar | LeNH | 4:50 | 19:40 |
| Bailey-VietPH | VietPH | 16:40 | 34:20 |
| Bailey-DuongDN | DuongDN | 0:00 | 0:00 |

Notes:
- Rory 0h this week (was 12:30 last week — significant drop, 2nd consecutive low week)
- Aysar 4:50 (matches task log ~4:50 — mapped, OK)
- Bailey-DuongDN inactive (expected)

---

## Trello — 08:50 (+07:00)

**Check Mail** — all 6 items ✓ complete (DuongDn, Carrick, Nick, Rick, Kai, Ken).

**Check Progress** — 13/18 completed, 5 skipped:
- ✓ Maddy, Blake, James Diamond, Elliott, Raymond, Marcel, Colin, Andrew Taraba, Elena, MPFC, Bailey, Rebecca, Neural
- ✓ **John Yi** — completed (PM confirmed task log updated)
- ✓ **Franc** — completed (LeNH 8h in Rebecca)
- ✓ **Rory** — completed (LeNH 8h in Rebecca)
- ✓ **Aysar** — completed (LeNH 8h in Rebecca)
- ✓ **Fountain** — completed (token refreshed, #2742 is LOW)

---

## Reminders — 08:50 (+07:00)

- **LeNH**: Not needed — 8h logged in Rebecca (William Bills)
- LongVV: weekly target, not daily
- VietPH: 8h OK
- PhucVT: 8h OK
- TuanNT: 4h (below target but not 0h — no reminder)
- KhanhHH: 8h OK

---

## Summary of Alerts

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Sheets | LeNH 8h in Rebecca (William Bills) — not 0h, OK | RESOLVED |
| 2 | Sheets | TuanNT 4h Thu, weekly 26h, off Fri — OK | RESOLVED |
| 3 | Fountain | Matrix token expired — cannot fetch plan or send reminders | HIGH |
| 4 | Fountain | HungPN 0h W22 — not sole QC, PhatDLT 13.5h covers | INFO |
| 5 | Fountain | ThinhT 8h vs 20h plan (40% at end of week) | MEDIUM |
| 6 | Fountain | #2742 status mismatch persists (19.25h on "Not Started") | LOW |
| 7 | Upwork | Rory 0h this week (2nd week of decline from 12:30) | MEDIUM |
| 8 | Upwork | Aysar 4:50 — matches task log, OK | INFO |
| 9 | Email/kai | SerpApi 90% usage warning (Madhuraka/Xtreme) | INFO |
| 10 | Reminders | LeNH reminder sent ✓ (token refreshed) | RESOLVED |

## Unresolved Questions

1. **Matrix token refreshed** — new token active. Fountain Part 1/3 still need re-run to fetch plan data.
2. **LeNH 0h Apr 16**: No leave note found. Is this missed logging or unreported leave?
3. ~~HungPN QC~~: Not sole QC — PhatDLT 13.5h covers. Not an alert.
4. **Rory Upwork**: 0h two weeks running — between contracts or paused?
