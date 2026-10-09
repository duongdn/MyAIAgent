# Update — 2026-03-20 10:17 (Fri)

Monitoring period: Mar 20 08:50 → Mar 20 10:17 (UTC+7)

## Slack (13 workspaces) — 34 new msgs

| Workspace | New | Highlights |
|-----------|-----|------------|
| Amazing Meds | 26 | **#web-dev-with-nick**: Nick + John Yi active — Cherry script added, payment plans page, lead form images (Google Drive folder shared). Nick confirmed changes done. |
| William Bills | 5 | **DM Oliver/Lucas**: Lucas confirmed 3 days off next week (Mon-Wed). Oliver checking new frontend work — if OK, push to live today. |
| Generator | 3 | **#triage**: Carrick approved 3 PRs (LGTM). |
| LegalAtoms | 9 | **#standup (3)**: File Upload Size Increase (in-progress), Clerk Accepts Submission (completed), Tyler TX Certification (in-progress). **#api-alerts-prod (6)**: Rollbar alerts. |
| Equanimity | 0 | Session token working. No new msgs. |
| All others | 0 | Baamboozle, RDC-FM, Swift Studio, Xtreme Soft, SAM GUARD, Global Grazing, MPFC, SoCal, Aigile Dev — all quiet. |

**Amazing Meds session note:** conversations.list returned 0 channels (token scope issue), but search.messages with cookie works fine.

## Email (6 accounts) — 31 new

| Account | Total | Highlights |
|---------|-------|------------|
| duongdn@ | 1 | **PhatDLT leave request** ("Xin nghi phep") |
| nick@ | 2 | 1 John Yi match: Google Drive folder "Method Lead Forms" shared by John Yi. 1 ClickUp: Order Search Workflow. |
| rick@ | 1 | OmniGPT Daily Sync calendar reminder |
| ken@ | 27 | 0 Precognize matches. Welligence/web PR notifications, newsletters. |
| carrick@, kai@ | 0 | — |

## Discord

### AirAgri (nusvinn) — 50 new msgs

**#airagri_webapp (49):**
- **Stop Alarm Architecture Discussion** — James Diamond + Vinn deep-diving data point logic
  - James concerned current 2-point comparison (Point A stored alert vs Point B latest) is insufficient
  - Stop alarm device_time (e.g., 5min) should use time-based window, not just 2 points
  - If device reports every 10s, need aggregate check over full window (30+ data points)
  - James: "This stop alarm is going to get more and more complex — need to manage processing, keep disconnected from main app"
  - Vinn explained: system creates alert record at first position detection, compares with latest
  - James showed screenshots of device moving within 5min window but stop alarm triggered incorrectly
  - Discussion of timezone handling (+11 AUS Sydney)
  - **ACTION NEEDED**: Rethink stop alarm data point aggregation approach

**#airagri-flutter (1):** James: "thank you" (re: Jeff's work)

### Bizurk (nuscarrick) — 0 msgs
### HOMIEAPP — 0 msgs

## Matrix/Element — Fountain

1 new message since 08:50:
- **trinhmtt (09:32):** "Remind mn dien tasklog cuoi ngay giup em a" (reminder to fill tasklog end of day)

## GitHub PRs

**Unable to check** — nuscarrick account lacks access to Elena-SamGuard-Digital-Plant and Precognize/development repos. gh configs for duongdn/nusken not found at expected paths.

Previous status (from 08:30 update): No open Elena PRs. Precognize PR #4750 (WIP DPP) still open.

## Web — samguard.co

HTTP 200, 152KB. No errors. OK.

## Redmine

#77734: Still "Deployed" (no change since Mar 19).

## Google Sheets — Key Changes Since Last Report

### Fountain Team Thu 19/03 — NOW FILLED

| Person | Role | Thu | Week Total | Plan | Status |
|--------|------|-----|------------|------|--------|
| ViTHT | Dev | **6h** | **30h** | 30h | **PLAN MET** |
| VuTQ | Dev | **8h** | **28h** | 36h | Need 8h Fri |
| ThinhT | Dev | **4h** | **16h** | 20h | Need 4h Fri — on track |
| HungPN | QC | **4h** | **8h** | — | **Was CRITICAL LOW (2h). Wed 2h retroactively added.** |
| PhatDLT | QC | **—** | **9h** | — | Thu not filled. Leave request email received. |

**ViTHT Thu tasks:** Smart Link (#2735) 4.5h, GiftDrop UI fixes (#2744, #2624) 0.5h, GiftDrop Redemption (#2595) sub-tasks
**VuTQ Thu tasks:** GiftDrop Redemption API (#2595) 6h, ShipStation fix (#2728) 0.5h, BETA accessibility (#2784) 1.5h
**HungPN Thu tasks:** Testing 4h (bug verification, redmine tickets)
**ThinhT Thu tasks:** Corporate gifting UI (#2668) 1.5h, GiftDrop preview (#2640) 1.75h, cart-item-id removal 0.75h

### QC Pool Update
- HungPN + PhatDLT: 8h + 9h = **17h** (plan 21.5h, need 4.5h Fri)
- **HungPN CRITICAL LOW alert RESOLVED** — was 2h, now 8h after retroactive Wed fill
- PhatDLT: leave request received. If off Fri → QC pool reaches max 21h (miss by 0.5h)

### Other Employees
- LongVV: Thu still — (not filled)
- PhucVT: Thu shows data in sheet (12 in column H) — likely filled
- VietPH, KhanhHH, LeNH: Thu already OK in previous report (8h, 8h, 9.8h)
- TuanNT: Unable to verify W9 sheet format — previous report showed Thu not filled

## Scrin.io

Login page changed — verification token extraction failed. Unable to cross-reference today.
Previous check (08:30): Mon-Wed all matched. Thu Scrin showed 7.5h, GSheets not filled.

## Trello

### Check Progress — 18/19 complete
Only **Fountain - DOCUMENT** remains incomplete.

### Check Mail — Card not found on board (completed/archived)

### Fountain Board Changes
| Metric | Previous | Now | Delta |
|--------|----------|-----|-------|
| Bugs | 15 | **9** | -6 |
| QC Internal | 0 | **5** | +5 |
| To-Do | 38 | 38 | — |
| Doing | 3 | 3 | — |
| Not Passed | 2 | 2 | — |

- **6 bugs moved to QC Internal** — significant QC pipeline progress
- 1 customer comment: **kunalsheth** on "Corporate order form": "@rick570 yes"
- Hard-to-release cards (#2695, #2640) still in Doing

### Fountain Capacity & Runway

| Metric | Value |
|--------|-------|
| Dev capacity | 86h/week |
| Week actual (Mon-Thu) | 74h (ViTHT 30 + VuTQ 28 + ThinhT 16) |
| Remaining Fri target | 20h (VuTQ 8 + ThinhT 4 + ViTHT done) |
| QC actual | 17h / 21.5h plan |

### Over-Estimate Watch
- #2595 GiftDrop Redemption: VuTQ logged 6h Thu on this task. Previous: 168.25h. **Still growing.** Est: 120h.

## Alerts

| Priority | Alert | Change |
|----------|-------|--------|
| **HIGH** | AirAgri: Stop alarm data point architecture needs rework. James Diamond concerned about 2-point comparison model; wants time-window aggregation. Active discussion. | NEW |
| ~~HIGH~~ | ~~HungPN CRITICAL LOW~~ | **RESOLVED** — Wed retroactively filled (2h), Thu 4h. Total 8h. |
| **HIGH** | PhatDLT leave request email received. If off Fri, QC pool misses target by 0.5h. | NEW |
| **MEDIUM** | Lucas (William Bills) 3 days off confirmed Mon-Wed next week. Nick (Amazing Meds) also off same days. | Confirmed |
| **MEDIUM** | LongVV Thu not filled yet | Ongoing |
| **MEDIUM** | TuanNT Thu not verified (sheet format issue) | Ongoing |
| **MEDIUM** | #2595 GiftDrop Redemption still growing — VuTQ +6h Thu | Ongoing |
| **INFO** | GitHub check unavailable (duongdn/nusken auth configs missing) | NEW |
| **INFO** | Scrin.io login changed — cross-reference unavailable | NEW |
| **INFO** | Fountain bugs 15→9 (moved to QC Internal) | NEW |
| **INFO** | Generator: Carrick reviewing/approving PRs | NEW |
| **INFO** | Oliver may push William Bills frontend to live today | NEW |

## Unresolved Questions

1. PhatDLT leave request — is it for today (Fri)? Need to check leave dates in email body.
2. GitHub auth: duongdn/nusken configs not at ~/.config/gh-{account}/hosts.yml — where are they stored?
3. Scrin.io login page changed — need to update token extraction logic.
4. TuanNT W9 sheet: date rows not matching expected format — need to investigate sheet structure.
