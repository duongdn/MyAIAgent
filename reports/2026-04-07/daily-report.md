# Daily Report — 2026-04-07 (Monday)

**Period:** 2026-04-06 08:30 → 2026-04-07 08:50 (+07:00)

---

## Alerts Summary

| Severity | Source | Issue |
|----------|--------|-------|
| **HIGH** | Email/rick@ | FountainGifts prod `ActiveRecord::InvalidForeignKey` (Rollbar #258/#259) — `cart_items` FK violation on `cart_item_custom_boxes`, 10+ occurrences. Server-side DB constraint error needs code fix. |
| **MEDIUM** | Email/carrick@ | Marcel/Equanimity — Marcel emailed "Prod error xid". Needs investigation. |
| **INFO** | Fountain | W21 weekly plan not posted yet (Monday morning). Last plan W20 from @trinhmtt 2026-03-30. |
| **INFO** | Fountain | #2615 massive overrun: 12h est vs 99.25h actual (+727%). #2595 still over: 120h est vs 168.25h (+40%). |
| **INFO** | Sheets | LongVV Xtreme W53 sheet not created — but LongVV splits: 16h Maddy (new sheet) + 24h Xtreme. Maddy sheet OK (W1). |
| **INFO** | Email/carrick@ | Redmine Bug #77954 — Elliott/Generator stats incorrect. |
| **INFO** | RDC Slack | Carrick reported personal health issue, returning tomorrow. |
| **INFO** | Elena | PR #297 merged + **deployed** to MayBanServer. Redmine #78030 → Deployed. Matrix announced. |

---

## Email — 08:41 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 0 | No relevant emails |
| carrick@ | 7 | BXR meeting; Redmine Bug #77954 (Elliott/Generator); GitLab sign-in; Snyk vuln (Marcel org); Marcel "Prod error xid" |
| nick@ | 1 | John Yi forwarded LegitScript seal approval |
| rick@ | 13 | **FountainGifts prod FK errors** (Rollbar #258/#259, 10+ occurrences); FirstProject client-side errors (INFO); daily summaries |
| kai@ | 5 | JIRA: TP-15 Quick Quote; LIFM2-431/425 Madhuraka activity |
| ken@ | 24 | Precognize PRs active: #4814-4817, healthy review cycle |

---

## Slack — 08:42 (+07:00)

| # | Workspace | Msgs | Key content |
|---|-----------|------|-------------|
| 1 | Baamboozle | 3 | skjamie25 "Good to go!"; martin.biruk "good to deploy"; SFX staged |
| 2 | RDC - FM Monitoring | 15 | Tuner instability alerts + recoveries; Carrick health issue (returning tomorrow) |
| 3 | Swift Studio | 12 | Carrick active — estimation with Rory, API spec shared, Refer-a-Friend discussion |
| 4 | Xtreme Soft | 54 | **Kai daily report found** — LIFM2-425/268 done, LIFM2-431 done, LIFM2-412 in progress |
| 5 | SAM GUARD | 18 | MQL leads (12); Michelle updating Jira; Lena+Michelle fixes testing |
| 6 | GGS | 3 | **Nick daily report found** — Sync Schenker link, Doofinder investigation |
| 7 | Amazing Meds | 8 | Nick+Gil on Google SMTP/Sheets; John requested payment processor + LegitScript |
| 8 | Generator | 1 | **Violet team daily update** — Carrick defects, Ryan Redmine, Jeff payments, Parker testing |
| 9 | LegalAtoms | 5 | Raymond sync on Texas/Maryland; Talha PRs shared |
| 10 | MPFC | 0 | Weekend — no messages |
| 11 | William Bills | 12 | Lucas subscription update (API done, FE in progress); winner boxes deployed |
| 12 | Equanimity | 403 | Marcel+Carrick device scan debugging; normal dev activity |
| 13 | SoCal Auto Wraps | 0 | Weekend — no messages |
| 14 | Aigile Dev | 1 | Blog draft auto-posted |

---

## Discord — 08:42 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri | ~120 | Vinn deployed hazard+incident to prod; Mary testing escalation L2/L3 (working); SOS tested; Jeff 4h daily report (hazard API + map + login UI); James reviewing flutter |
| Bizurk (animeworld DM) | 0 | No messages since Mar 5 |

---

## Sheets — 08:43 (+07:00)

Monday morning — all 0h expected, devs fill throughout day.

| Developer | Project | Today | Status |
|-----------|---------|-------|--------|
| LongVV | Xtreme (24h/wk) | — | W53 sheet not created (client-side) |
| LongVV | Maddy (16h/wk) | 0h (W1) | Not yet filled |
| PhucVT | James Diamond | 0h | Not yet filled |
| TuanNT | John Yi | 0h | Not yet filled |
| TuanNT | Rebecca | 0h, col P: "Chưa" | Normal |
| VietPH | Paturevision | 0h | Not yet filled |
| KhanhHH | Generator | 0h | Not yet filled |
| LeNH | Rory+Franc+Aysar | 0h | Not yet filled |
| Maddy (LongVV) | Maddy | 0h | Not yet filled |

### Scrin.io — TuanNT/John Yi
- Today: 0h (workday just started)
- Week total: 4h 07m
- Status: OK

---

## Fountain — 08:43 (+07:00)

### Part 1 — Matrix Plan
Latest: @trinhmtt 2026-03-30 (W20): ViTHT 30h, ThinhT 20h, VuTQ 40h, QC 22.5h. **W21 plan not posted yet.**

### Part 2 — Task Log Actuals (W21)
| Dev | W21 | W20 |
|-----|-----|-----|
| VuTQ | 0h | 40h |
| ThinhT | 4h | 20h |
| ViTHT | 8h | 30h |
| PhatDLT (QC) | 3h | 12h |
| HungPN (QC) | 0h | 10h |
| **Total** | **15h** | **112h** |

### Part 3 — Plan vs Actual (W20)
| Dev | Plan | Actual | Delta |
|-----|------|--------|-------|
| ViTHT | 30h | 30h | 0h ✓ |
| ThinhT | 20h | 20h | 0h ✓ |
| VuTQ | 40h | 40h | 0h ✓ |
| QC | 22.5h | 22h | -0.5h |

### Part 4 — Capacity & Runway
- Remaining: 181.25h (Not Started 159h + In-progress 22.25h)
- Capacity: 90h/week
- **Runway: ~2.0 weeks**
- Key items: #2775 Nav Refactor (60h), #1178 Reviews (40h), #2524 Dup Charge (24h)

### Part 5 — Over-Estimate Tracking
| Task | Est | Actual | % Over |
|------|-----|--------|--------|
| #2595 GiftDrop | 120h | 168.25h | +40% |
| #2615 | 12h | 99.25h | +727% |
| #2735 Smart Link | 90h | 85.75h | -5% (OK) |

✅ All 5 parts validated

---

## Elena — 08:46 (+07:00)

### PRs
| # | Title | Author | Action |
|---|-------|--------|--------|
| 297 | fix/redmine/78030 | nusteam | **Merged** — pending deploy |

### Precognize (nusken)
- PR #4817 by nusdavid (Sr 7121 dashboard API) — monitoring only, no nusken PRs

### WordPress SamGuard
- HTTP 200, CSP configured, SRI active, no errors detected

### Deploy Status
- **PR #297 DEPLOYED** ✓ — git pull + ng build succeeded (16.9s). Redmine #78030 → Deployed. Matrix announced. URL: https://process-digital-plant2.nusdev.net/

---

## Upwork — 08:46 (+07:00)

| Workroom | Developer | This Week | Status |
|----------|-----------|-----------|--------|
| Rory (41069448) | LeNH | 8:00 | Mon tracked |
| Neural (38901192) | external | 0:00 | Inactive |
| Aysar (35642393) | LeNH | 0:00 | Inactive (expected) |
| Bailey-VietPH (42545630) | VietPH | 8:40 | Mon+Tue tracked |
| Bailey-DuongDN (43093775) | DuongDN | 0:00 | Start of week |

---

## Trello — 08:53 (+07:00)

### Check Mail — 6/6 ✓
All items completed: DuongDn, Carrick, Nick, Rick, Kai, Ken

### Check Progress — 18/19 (1 skipped)
| Checklist | Items | Status |
|-----------|-------|--------|
| Normal | Maddy, Blake, John Yi | 3/3 ✓ |
| Should do | James Diamond - Vinn | 1/1 ✓ |
| Closely monitor | Rory, Aysar, Franc, Elliott | 4/4 ✓ |
| Work | MPFC, Marcel, Elena, Raymond, Neural, Bailey, Andrew, Rebecca, Colin | 9/10 |
| Pending | Elena WordPress | 1/1 ✓ |

**Skipped:** Fountain — FountainGifts prod FK errors (HIGH alert)

---

## Elena (re-check) — 16:28 (+07:00)

### Open PRs
| # | Title | Branch | Author | Files | Action |
|---|-------|--------|--------|-------|--------|
| 298 | Refactor API calls | enhancements/refactor-api-calls | nusteam | 4 (+24/-44) | **Merged** |
| 299 | DP-652 measurement type | DP-652 | nusteam | 1 (+14/-2) | **Merged** |

CodeRabbit reviews: PR #298 had 2 actionable comments (inconsistent `checkHasChildren` filtering, optional `children` type) — code quality, not blocking. PR #299 had 1 actionable (measurement type string ID handling) + 1 nitpick (duplicate import) — minor. Both mergeable_state=clean.

### Precognize (nusken)
7 open PRs, none by nusken. Active: #4821 (Vladimir tooltip fix), #4820 (majdhajjo unified query), #4817 (nusdavid dashboard API), #4815 (nustom missing mappings), #4814 (mahkris view state), #4813 (majdhajjo agent availability), #4809 (mahkris password validation). No action needed.

### WordPress SamGuard
- HTTP 200, page renders correctly, SRI integrity attributes present, CSP configured, no server errors detected.

### Deploy Status
- **PR #298 + #299 DEPLOYED** — git pull fast-forward (4 files changed), `ng build` succeeded (16.2s). Matrix announced to Elena - Digital Plant room. URL: https://process-digital-plant2.nusdev.net/

### Alerts
None. All clear since morning report.

---

## Unresolved Questions

1. FountainGifts `cart_items` FK error — who is assigned to fix? Rick's Rollbar shows 10+ occurrences.
2. Marcel "Prod error xid" — what's the xid error? Needs carrick@ investigation.
3. LongVV Xtreme W53 sheet not created — client-side issue, LongVV logs 24h/wk there + 16h/wk on Maddy (new template).
4. Fountain W21 plan — expected Monday morning, check again later today.
