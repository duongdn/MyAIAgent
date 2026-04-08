# Daily Report — 2026-04-08 (Tuesday)

**Period:** 2026-04-07 08:55 → 2026-04-08 09:30 (+07:00)

---

## Alerts Summary

| Severity | Source | Issue |
|----------|--------|-------|
| ~~HIGH~~ | ~~Slack/Equanimity~~ | ~~Session token~~ — **RESOLVED** at 14:11. Token refreshed via Puppeteer with new password. Carrick+Mani active on XID issues. Marcel ✓ complete. |
| **MEDIUM** | Email/rick@ | FirstProject prod Rollbar: #978 TypeError (null reading 'gift_main'), #979 Cannot read property. Needs investigation — server-side or client-side. |
| **INFO** | Email/carrick@ | Redmine Bug #78065 (Elliott/Generator) — booking reminder sent immediately. New bug. |
| **INFO** | Email/rick@ | FountainStaging BugSnag 3x errors, InfinityStagingBE CSRF — staging only. |
| **INFO** | Fountain | #2595 GiftDrop 168.25h/120h est (+40%), #2615 99.25h/12h (+727%) — stable, not growing. |
| **INFO** | Fountain | Runway decreased: 175.5h → 1.9 weeks (was 181.25h/2.0wk). Progress on in-progress tasks. |

---

## Email — 09:03 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 1 | NUS Finance part-time info Mar 2026 |
| carrick@ | 2 | Redmine Bug #78065 (Elliott/Generator: booking reminder sent immediately), Jira weekly digest |
| nick@ | 15 | CNA/John Yi: 8 Azure DevOps PRs (Emir — bulk selection, client due date, admin role, info operations, quote details), 3 ClickUp tasks, daily completions |
| rick@ | 13 | Rollbar: FirstProject prod #978/#979 (TypeError). BugSnag: FountainStaging 3x (staging). InfinityStagingBE CSRF (staging). Daily summaries. |
| kai@ | 4 | Jira: LIFM2-432 assigned, LIFM2-409 Import Shopify payouts. Normal workflow. |
| ken@ | 171 | Precognize: ~12 PRs (SR-6940, SR-7216, SR-7209, DP, SR-7121). Welligence ~80+ PRs. mimaizumi/amocc ~25. zeroco84/rentle 6. Sentry alerts. |

Trello: Check Mail — all 6 items ✓ complete.

---

## Slack — 09:05 (+07:00)

| # | Workspace | Msgs | Key content |
|---|-----------|------|-------------|
| 1 | Baamboozle | 6 | Carrick asking Aysar to review; SFX deployment activity |
| 2 | RDC - FM Monitoring | 11 | Tuner instability alerts + recoveries; normal ops |
| 3 | Swift Studio | 6 | Rory time estimates for tasks; Carrick active |
| 4 | Xtreme Soft | 645+ | **Kai daily report found** (Apr 7) — LIFM2-425/268 done, LIFM2-431 performance done, LIFM2-412 Shopify filters in progress |
| 5 | SAM GUARD | 51 | HubSpot MQL leads (12); Michelle/Lena testing |
| 6 | GGS | 10 | **Nick daily report found** — deployed Doofinder + Page builder on Live. Joey follow-up on doofinder issue. |
| 7 | Amazing Meds | 14 | John+Nick: LegitScript logo, Google SMTP/Sheets setup, payment processor discussion |
| 8 | Generator | 27 | Rudi asking Carrick+Violet to investigate errors; release coordination. Carrick fixed central DB columns. |
| 9 | LegalAtoms | 50 | Talha: Maryland done, Texas envelopes. Raymond syncing. |
| 10 | MPFC | 0 | No messages |
| 11 | William Bills | 44 | Lucas: subscription update API done, FE in progress. Winner boxes deployed. |
| 12 | Equanimity | 3989+ | Carrick+Mani active in #xid-technologies: sync/scanning issues, upload photo bug, staff gate problems. Carrick debugging with tech lead. Normal dev activity. |
| 13 | SoCal Auto Wraps | 0 | No messages |
| 14 | Aigile Dev | 3 | Blog draft auto-posted (Atlassian job cuts article) |

---

## Discord — 09:10 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 50+ | James Diamond directing spray module development — staging deliverable by EOD. Vinn implementing spray records. Jeff: PLDS API + Map + Login UI. Royden: stock unit map select + spray schedule. |
| Bizurk (animeworld DM) | 5+ | animeworld has a **new project** — clear input on coupon apply. nuscarrick notified about Apr 30-May 1 holidays. Recent activity (Apr 24-May 4). |

---

## Sheets — 09:15 (+07:00)

| Developer | Project | Mon (Apr 7) | Week Total | Status |
|-----------|---------|-------------|------------|--------|
| LongVV | Maddy (16h/wk) | 14.0h | 17.50h | ✓ On track |
| PhucVT | James Diamond | 12.0h | 24.00h | ✓ |
| TuanNT | John Yi | 4.0h | 4.00h | OK (splits across projects) |
| TuanNT | Rebecca | 4.0h | 4.00h | OK, col P normal |
| VietPH | Paturevision | 8.0h | 8.00h | ✓ |
| KhanhHH | Generator (team) | 32.0h | 64.00h | ✓ (team incl. HangNTT) |
| LeNH | Rory | Mon: 8.0h | 12.50h | ✓ |
| LeNH | Franc | Mon: 0h, Tue: 3.5h | 3.50h | OK |
| LeNH | Aysar | 0h | 0h | Expected (H���T TASK) |

### Scrin.io — TuanNT/John Yi
- Yesterday (Apr 7): 3h 51m (Issue check times 110m, handle feedback 121m)
- Today (Apr 8): 0h 8m (started 08:38 — handle homepage Elementor AM)
- Week total: 3h 59m
- TuanNT John Yi task log: 4h vs Scrin.io 3h51m → **OK** (task log not inflated)

---

## Fountain — 09:20 (+07:00)

### Part 1 — Matrix Plan
**W21 plan posted** by @trinhmtt on 2026-04-07 10:03:
- ViTHT: 22h
- VuTQ: 36h
- ThinhT: 20h
- QC: 19.5h

Additional Matrix activity: TrinhMTT reminded team about shared Rick account (check daily messages). ThinhT updated staging for Infinity+Fountain. PhatDLT flagged Redmine #78035 to VuTQ.

### Part 2 — Task Log Actuals (W21, Mon-Tue)
| Dev | W21 (so far) | W20 |
|-----|-------------|-----|
| VuTQ | 12h | 40h |
| ThinhT | 8h | 20h |
| ViTHT | 8h | 30h |
| Others | 6h | 22h |
| **Total** | **34h** | **112h** |

### Part 3 — Plan vs Actual (W20 complete)
| Dev | Plan | Actual | Delta |
|-----|------|--------|-------|
| ViTHT | 30h | 30h | 0h ✓ |
| ThinhT | 20h | 20h | 0h ✓ |
| VuTQ | 40h | 40h | 0h ✓ |
| QC | 22.5h | 22h | -0.5h |

W21 in progress — 2 of 5 days completed.

### Part 4 — Capacity & Runway
- Remaining: **175.5h** (Not Started 158.25h + In-progress 17.25h)
- Capacity: 90h/week
- **Runway: ~1.9 weeks** (was 2.0 weeks)
- Delta: -5.75h from last report (progress on in-progress tasks)
- Key items: #2775 Nav Refactor (60h), #1178 Reviews (40h), #2524 Dup Charge (24h), #2735 Smart Link (4.25h rem)

### Part 5 — Over-Estimate Tracking
| Task | Est | Actual | % Over | Growing? |
|------|-----|--------|--------|----------|
| #2595 GiftDrop | 120h | 168.25h | +40% | No (stable) |
| #2615 | 12h | 99.25h | +727% | No (stable) |
| #2735 Smart Link | 90h | 85.75h | -5% (OK) | N/A |

### Fountain Trello Board
- **Customer comments:** Kunal active — 5 comments: GiftDrop preview (wants card preview), catalog upload (approve live push), export gifts (wants sooner), product page update, gift attributes cleanup
- rick570 fixed ActiveRecord FK errors (#258/#259 from yesterday) ✓
- **Active counts:** Doing 19 (15 stuck >5d), QC Internal 7, QA Backlog 9, In QA 4
- **Hard-to-release:** 15 cards in Doing stuck >5 days

✅ All 5 parts validated

---

## Elena — 09:25 (+07:00)

### PRs
No open PRs on nustechnology/Elena-SamGuard-Digital-Plant. All clear.

### Precognize (nusken)
5 open PRs, none by nusken:
- #4820 SR-7166 unified query (majdhajjo)
- #4817 SR-7121 dashboard API (nusdavid)
- #4815 SR-7213 missing mappings (nustom)
- #4813 SR-7164 agent availability (majdhajjo)
- #4809 SR-6940 password validation (mahkris)

No action needed.

### WordPress SamGuard
HTTP 200 OK. Page loads (152KB). No errors detected.

### Deploy Status
No pending deploys.

---

## Upwork �� 09:10 (+07:00)

| Workroom | Developer | This Week | Mon | Tue | Status |
|----------|-----------|-----------|-----|-----|--------|
| Rory (41069448) | LeNH | 12:30 | 8h | 4.5h | Active |
| Neural (38901192) | external | 0:00 | — | — | Inactive |
| Aysar (35642393) | LeNH | 0:00 | — | — | Inactive (expected) |
| Bailey-VietPH (42545630) | VietPH | 17:20 | 8h | 8h | Active |
| Bailey-DuongDN (43093775) | DuongDN | 0:00 | — | — | Start of week |

---

## Trello — 09:30 (+07:00)

### Check Mail — 6/6 ✓
All items completed: DuongDn, Carrick, Nick, Rick, Kai, Ken

### Check Progress — 19/19 ✓
| Checklist | Items | Status |
|-----------|-------|--------|
| Normal | Maddy, Blake, John Yi | 3/3 ✓ |
| Should do | James Diamond - Vinn | 1/1 ✓ |
| Closely monitor | Rory, Aysar, Franc, Elliott | 4/4 ✓ |
| Work | MPFC, Marcel, Elena, Raymond, Neural, Bailey, Andrew, Rebecca, Colin, Fountain | 10/10 ✓ |
| Pending | Elena WordPress | 1/1 ✓ |

---

## Unresolved Questions

1. ~~Equanimity session token~~ — **RESOLVED**. Token refreshed with new password via Puppeteer. Config updated.
2. **FirstProject prod errors** — rick@ Rollbar #978/#979 (TypeError). Server-side or client-side? Need investigation to determine severity.
3. **animeworld/Andrew Taraba** — new project offer from animeworld. Nuscarrick should confirm scope.
