# Daily Report — 2026-04-16 (Thursday)
**Window:** 2026-04-15 15:25 → 2026-04-16 09:45 (+07:00)

---

## Email (all) — 09:42 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 1 | Bailey/Paturevision bug #74575 closed |
| carrick | 3 | Redmine: Elliott/Generator bug #78208 tested; Marcel weekly report; Generator iOS 1.8.6 build |
| nick | 2 | WP Engine plugin vulnerability notification; Amazing Meds payment gateway issue (fwd from John Yi) |
| rick | 12 | **2 PRODUCTION alerts** (below); staging errors (INFO) |
| kai | 2 | Bitbucket PR #478: using graphql product id (Madhuraka) |
| ken | 135 | GitHub PR activity: Precognize/development, welligence repos |

**PRODUCTION Alerts:**
- **FirstProject** — new Rollbar error #982: Minified React error #425
- **FountainGifts** — new Rollbar error #261: NoMethodError undefined method (hit 10th occurrence)

Staging (INFO): FountainStaging InvalidAuthenticityToken (x2), InfinityStagingBE #66, FountainStaging RuntimeError.

---

## Slack (all) — 09:43 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 6 | Instagram link share, cancellation typeform |
| RDC - FM Monitoring | 28 | Tuner access/reboot alerts; dmetiner FMDX dependency, asked Carrick for latest GitHub version |
| Swift Studio | 0 | No activity |
| Xtreme | 4 | Kai fixed PR #478; **Madhuraka flagged urgent discount/product sorting issue** |
| SAM GUARD | 9 | Michelle asked DP about DP-637; HubSpot leads; Tom deploying autoscan |
| GGS | 2 | Joey fixed card payment; Amy will discuss go-live Thursday with Nick |
| Amazing Meds | 11 | Nick daily report posted (#it-dept-all): homepage Elementor; John: WPEngine security vuln, email marketing |
| Generator | 0 | No activity |
| LegalAtoms | 8 | Raymond ran fix script; dev team merging PRs to alpha |
| MPFC | 0 | No activity |
| William Bills | 4 | Oliver/Lucas active; Lucas new Figma design page |
| Equanimity | 3 | Carrick + Komal on user list validation (XID Technologies) |
| SoCal Auto Wraps | 0 | No activity |
| Aigile Dev | 0 | No activity |

**Notes:**
- Xtreme: Kai active (fixed PR #478), 16h/wk so daily report not required. Madhuraka flagged urgent discount/product sorting issue.

---

## Discord — 09:43 (+07:00)

| Server | Account | Activity | Key content |
|--------|---------|----------|-------------|
| AirAgri | nusvinn | 40+ msgs | Vinn daily report ✓ (10:07 Apr 15). Jeff daily report ✓ (10:37 Apr 15, 4h). Active dev on incidents, Training module, File Manager. .jdiamond raised weather API refresh issue. |
| Bizurk | nuscarrick | 0 msgs | Silence. Andrew Taraba low-activity, normal. |

Alerts: None.

---

## Scrin.io — 09:43 (+07:00)

**TuanNT (John Yi):** 8.0h tracked on Apr 15.
- Main task: "handle homepage Elementor AM" (08:26–17:31)
- Task log (John Yi) = 6.0h ≤ Scrin 8.0h → OK (not over-inflated)

---

## Sheets (all) — 09:45 (+07:00)

| Developer | Yesterday (Apr 15) | Status |
|-----------|-------------------|--------|
| LongVV (Maddy) | 0h | OK — weekly target 16h/wk |
| PhucVT | 8.0h | OK |
| TuanNT (combined) | 6.0h | John Yi 6h + Rebecca 0h (col P: Chưa = not written yet) |
| VietPH | 0h | OK — day off (Nghỉ cả ngày) |
| KhanhHH | 8.0h | OK |
| LeNH (combined) | 8.0h | Rory 0h + Franc 8h + Aysar 0h |

Alerts: None.

---

## Fountain — 5-Part Check

### Part 1 — Matrix Plan
Latest plan by @trinhmtt (2026-04-13 10:23):
> ViTHT: 30h | LamLQ: 10h | ThinhT: 20h | VuTQ: 40h | QC: 25h

### Part 2+3 — Task Log Actuals + Plan vs Actual (W22, mid-week)

| Dev | Plan (wk) | Pro-rated 60% | Actual (3d) | Delta |
|-----|-----------|---------------|-------------|-------|
| VuTQ | 40h | 24h | 20.0h | -4.0h slightly behind |
| ViTHT | 30h | 18h | 24.0h | +6.0h ahead |
| ThinhT | 20h | 12h | 8.0h | -4.0h behind |
| LamLQ | 10h | 6h | **0.0h** | **-6.0h NO HOURS** |
| QC total | 25h | 15h | 9.5h | -5.5h behind |
| HaVS | — | — | 0.0h | not in plan |

Weekly total: 61.5h

### Part 4 — Capacity & Runway
- Remaining est (NS+IP+Pending+On Hold): **213.75h**
- Runway: **2.4 weeks** at 90h/wk capacity (~early May)

### Part 5 — Over-Estimate Tracking

| Task | Est | Actual | % Over | Trend |
|------|-----|--------|--------|-------|
| #2595 | 120h | 168.25h | +40% | Stable |
| #2615 | 12h | 102.25h | +752% | Stable |
| #2735 | 90h | 106.25h | +18% | Stable |
| #2742 | 12h | 19.25h | +60% | **Status mismatch: "Not Started" but has 19.25h** |

**Alerts:**
- LamLQ 0h through Wed — planned 10h, may catch up Thu-Fri. Monitor only.
- **HungPN (QC) 0h** — no QC hours this week. (TrinhMTT excluded — not QC, never has time.)
- **#2742 status mismatch** — 19.25h logged but still "Not Started".

---

## Elena / Precognize / WordPress — 09:44 (+07:00)

- **Elena PRs (duongdn):** No open PRs. Nothing to merge/deploy.
- **Precognize PRs (nusken):** No open PRs by nusken.
- **Pending actions:** All clear (last: PR #299 DP-652 deployed 2026-04-07).
- **samguard.co:** HTTP 200, SSL active, CSP clean, no JS errors. All 25 scripts + 5 videos OK.

---

## Upwork Weekly Hours (Apr 13-19) — 09:44 (+07:00)

| Workroom | Developer | This Week | Last Week |
|----------|-----------|-----------|-----------|
| Rory | LeNH | **0:00** | 12:30 |
| Neural Contract | external | 0:00 | 0:40 |
| Aysar | LeNH | 4:50 | 19:40 |
| Bailey-VietPH | VietPH | 9:50 | 34:20 |
| Bailey-DuongDN | DuongDN | 0:00 | 0:00 |

Notes: Rory 0h this week (was 12:30 last week — significant drop). Bailey-DuongDN inactive (expected). Neural low-activity (expected).

---

## Trello — 09:49 (+07:00)

**Check Mail** — all 6 items ✓ complete (DuongDn, Carrick, Nick, Rick, Kai, Ken).

**Check Progress** — 17/18 completed, 1 skipped:
- ✓ Aysar, Franc, Rory, Elena, John Yi, Elliott, Raymond, MPFC, Marcel, Blake, Colin, James Diamond, Andrew Taraba, Neural
- ✓ **Maddy** — completed (Kai 16h/wk, daily report not required)
- ✓ **Bailey** — completed (GGS OK)
- ⚠️ **Fountain** — skipped (LamLQ 0h, QC 0h, #2742 mismatch)
- ✓ **Rebecca** — completed (William Bills active, "Chưa" is normal)

---

## Reminders — 09:46 (+07:00)

No reminders needed:
- LongVV: weekly target, not daily
- VietPH: day off
- LeNH combined: 8h (Franc 8h covers)
- All others: ≥ 6h

---

## Summary of Alerts

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Email/rick | FirstProject production Rollbar #982 (React error) | HIGH |
| 2 | Email/rick | FountainGifts production Rollbar #261 (NoMethodError, 10th occurrence) | HIGH |
| 3 | Fountain | HungPN QC 0h this week | MEDIUM |
| 5 | Fountain | #2742 status mismatch (19.25h but "Not Started") | LOW |
| 6 | Upwork | Rory 0h this week (was 12:30 last week) | MEDIUM |

*Removed: GGS/Bailey Nick daily report (false alert), Xtreme/Kai daily report (16h/wk, not required).*
