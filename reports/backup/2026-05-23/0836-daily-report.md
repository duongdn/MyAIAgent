# Daily Report — 2026-05-23 (Saturday)

**Window:** 2026-05-22 10:56 +07 → 2026-05-23 08:36 +07
**Run at:** 08:36 +07

---

## 🔴 Critical Alerts

| # | Severity | Project | Issue |
|---|----------|---------|-------|
| 1 | **HIGH** | William Bills / MWMX | **Apple Pay DOWN** — `.well-known/apple-developer-merchantid-domain-association` returns 404. Active since 2026-05-23 00:01 UTC, unresolved at 01:09 UTC after Cloudflare cache purge. Oliver suspects Lucas's changes caused it. |
| 2 | **HIGH** | InfinityRoses (rick@) | **PRODUCTION Stripe error** — `Stripe::InvalidRequestError: No such PaymentMethod 'pm_1TZoD54Ga8IDcLGEasjH8ZNR'`. Error #428 hit 2026-05-22 08:13 UTC (×2 duplicate delivery). |
| 3 | **MEDIUM** | Generator (carrick@) | Bug #78828 NEW + Urgent — `[734] Work Orders API include error` on Work Orders page. Escalated to Urgent same morning by Parker Nguyen. |
| 4 | **MEDIUM** | Fountain | Customer **iris63293413** flagged "Gift drop order — Cannot swap gift" at 13:44 UTC Fri. Tagged @rick570 @kunalsheth. Needs response. |
| 5 | **MEDIUM** | Matrix | Token expired — auto-refresh failed (SSO requires browser login). Fountain Part 1 sourced from cache. Aysar Matrix room unverifiable. |

---

## Email — 08:36 +07

| Account | Count | Key content |
|---------|-------|-------------|
| duongdn@ | 0 | — |
| carrick@ | 4 | Bug #78565 → "Tested on Staging" + Bug #78828 NEW URGENT (Work Orders API) |
| nick@ | 22 | 15× task digests (candasurveyors.com.au) + 5× Azure DevOps PRs (CNA.Operations); no John Yi |
| rick@ | 9 | **ALERT**: InfinityRoses prod Stripe error #428; FountainGifts/InfinityRoses daily summaries; FountainStaging RecordNotFound (staging=INFO) |
| kai@ | 2 | LIFM2-441 Jira — Anoma mentioned Kai; result name display issue (informational) |
| ken@ | 1 relevant | Precognize #4932 — nusdavid pushed unit tests (SR-6922-main-table) |

Trello Check Mail: No active card found on board today — email results noted in report only.

---

## Slack — 08:36 +07

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 4 | Carrick active: PRs #614/#36, test coverage + k6 tests done |
| RDC - FM Monitoring | 2 | Automated bots only (Tuner access + recovery) |
| Swift Studio | 20 | Carrick+Jeff debugging OAuth deep-link (BXR app). Rory: Monday 8am UK call scheduled. |
| Xtreme Soft | 6 | anomawasala in DM. No Kai daily report (Saturday — not required per 16h/wk rule) |
| SAM GUARD - Mobile | 1 | HubSpot MQL bot only |
| GLOBAL GRAZING | 0 (in window) | Nick maintenance report at 03:00 UTC (56 min before window): Storage 74% ⚠️, SSL expiry Jun 22 (31d), RDS upgrade pending 17.5.R2, Billing $94.57 OK |
| Amazing Meds | 5 | Nick: completed all 6 questionnaire datalayer tasks ✓. John forwarded Loom from pixel expert re: backend datalayer location. |
| Generator | 20 | Elliott/Violet/Rudi debugging datetime_start2 booking logic bug. Carrick tagged. Fix → Monday. |
| LegalAtoms | 3 | Raymond making okanogan e-service changes. Release pending Kafayat's OK (was OOO). No Nick-specific. |
| MPFC | 0 | No activity (Saturday) |
| William Bills | 20 | **ALERT: Apple Pay DOWN on MWMX** — 404 on `.well-known` file. Lucas daily report: 6h (staging, cart fix). Oliver flagged design issues vs Figma. |
| Equanimity | 0 | No activity (Saturday) |
| Aigile Dev | 3 | Automated Gaige/Amazon Q alerts. No Colin activity. |

Trello: No SoCal (dropped). Kai report not required (16h/wk rule).

---

## Discord — 08:36 +07

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 37 | **Vinn report ✓** 10:20 UTC: "Check stop alarm issue (done). Fixed send stop alarm after terminated (deployed to prod). Review Leon code PR 420." **Jeff report ✓** 10:17 UTC: "Implement Select Multiple mode for File Manager and SDS (4h)." |
| Bizurk (nuscarrick) | 0 | Silence (normal) |
| Andrew DM (animeworld) | 0 | Silence (normal) |

Trello: Andrew Taraba ✓ complete.

---

## Google Sheets — 08:36 +07

| Developer | Fri 22/05 | Status |
|-----------|-----------|--------|
| LongVV | 8h total (Mon only; Fri = Nghỉ cả ngày) | ⚠️ **ALERT** — W7 total 8h vs 16h Maddy target |
| PhucVT | 8h | ✓ OK |
| TuanNT (John Yi) | 8h (2h JY + 6h Rebecca) | ✓ OK |
| VietPH | 8h | ✓ OK |
| KhanhHH | 0h Generator, 4h Aysar | ⚠️ NOTE — 4h total < 8h (no leave note). Supporting dev note only. |
| LeNH | 8h combined (Rory 8h; Franc/Aysar/Rebecca 0h) | ✓ OK (0h in one sheet ≠ alert when another covered) |

### Scrin.io (Friday, isYesterday=true)
TuanNT (John Yi): Task log 2h vs Scrin 2h (Data tracking Form) — ✓ match, no inflation.

---

## Fountain — 08:36 +07

> ⚠️ Matrix token expired. W27 plan data sourced from 2026-05-22 report cache.

### Part 1 — Matrix Weekly Plan (W27, @trinhmtt 2026-05-18 11:10 ICT)
ViTHT: 40h | ThinhT: 4h | DatNT: 40h | LamLQ: 20h | QC: 22h
VuTQ: not in plan (on Bailey ✓). HaVS: not in plan (normal).

### Part 2 — Actuals W27

| Dev | W27 Actual | Note |
|-----|-----------|------|
| ViTHT | 32h | Thu leave (Nghỉ cả ngày) |
| ThinhT | 4h | |
| DatNT | 40h | |
| LamLQ | 38.75h | |
| VuTQ | 0h | Expected (Bailey) |
| HaVS | 0h | Not in plan |
| PhatDLT (QC) | 10h | |
| HungPN (QC) | 18h | |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Delta | Status |
|-----|------|--------|-------|--------|
| ViTHT | 40h | 32h | -8h | Thu leave |
| ThinhT | 4h | 4h | 0h | ✓ |
| DatNT | 40h | 40h | 0h | ✓ |
| LamLQ | 20h | 38.75h | +18.75h | Over plan |
| QC | 22h | 28h | +6h | Over plan |

### Part 4 — Capacity & Runway
- Active tasks: 62 | Remaining est (I+J): 1,102h | Actual: 1,144.2h → **Remaining: 327.5h**
- **Runway: 3.64 weeks** @ 90h/wk capacity
- vs 2026-05-21 report (306.8h, 3.41wk): **+20.7h** increase (new scope added)

### Part 5 — Over-Estimate Tracking

| Task | Est+CR | Actual | Over% | vs Last |
|------|--------|--------|-------|---------|
| #2595 (GiftDrop) | 120h | 168.25h | +40% | STABLE |
| #2615 (Gift of Choice) | 12h | 106.75h | +790% | STABLE |
| #2735 | 120h | 133h | +11% | STABLE |
| #2627 | — | — | +1550% | bug on live |
| #2639 | — | — | +725% | staging |

### Trello Board
- 1 customer comment: **iris63293413** "Gift drop order — Cannot swap gift" (2026-05-22 13:44 UTC)
- Cards: To-Do 30, Bugs 18, Doing 14, QC Internal Backlog 9, QA Backlog 2, In QA 2, Not passed 1
- Stuck cards: 59 (most ancient; recent notable: "Doing → Infinity Browse" 05-12, "QC Internal → Update to breakpoints" 04-24)

Trello: Fountain item ⚠️ **not completed** (customer alert + Matrix token expired).

---

## Elena — 08:36 +07

| Check | Result |
|-------|--------|
| Elena PRs (nustechnology/Elena-SamGuard-Digital-Plant) | 0 open PRs — nothing to deploy |
| WordPress samguard.co | ✓ Clean — no JS errors |
| Precognize nusken PRs | ⚠️ BLOCKED — `nusken` not in gh CLI (needs `gh auth login`) |

---

## Trello Check Progress Summary

| Item | Checklist | Result |
|------|-----------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ⚠️ **skipped** — LongVV W7 8h/16h shortfall |
| John Yi - Amazing Meds | Normal | ✓ complete |
| James Diamond - Vinn task | Should do | ✓ complete |
| Rory | Closely monitor | ✓ complete |
| Aysar | Closely monitor | ⚠️ **skipped** — Matrix down, Jamie/Ronan room unverifiable |
| Franc | Closely monitor | ✓ complete |
| Elliott | Closely monitor | ✓ complete |
| MPFC | Work | ✓ complete |
| Marcel | Work | ✓ complete |
| Elena - SamGuard | Work | ✓ complete |
| Raymond - LegalAtoms | Work | ✓ complete |
| Neural Contract | Work | ⚠️ **skipped** — Upwork session expired, messages unverifiable |
| Bailey | Work | ✓ complete |
| Andrew Taraba | Work | ✓ complete |
| Rebecca - William Bills | Work | ⚠️ **skipped** — Apple Pay DOWN on MWMX |
| Colin | Work | ✓ complete |
| Fountain | Work | ⚠️ **skipped** — customer alert + Matrix token expired |
| Elena - WordPress SamGuard | Pending | ✓ complete |

---

## Action Items

| Priority | Item | Owner |
|----------|------|-------|
| 🔴 URGENT | Fix Apple Pay on MWMX — restore `.well-known` file | Lucas / Oliver |
| 🔴 URGENT | Investigate InfinityRoses Stripe `pm_1TZoD54Ga8IDcLGEasjH8ZNR` error #428 | rick@ team |
| 🟡 HIGH | Respond to iris63293413 "Gift drop — Cannot swap gift" on Fountain Trello | rick / Kunal |
| 🟡 HIGH | Renew Prestashop SSL cert before Jun 22 (31 days) | GGS / Nick |
| 🟡 MEDIUM | Fix Generator Bug #78828 URGENT — Work Orders API error | Elliott |
| 🟡 MEDIUM | LongVV W7 shortfall: 8h/16h — follow up Mon | PM |
| 🟡 MEDIUM | Matrix token refresh — manual browser login to restore monitoring | PM |
| 🟡 LOW | Authenticate `nusken` in gh CLI — `gh auth login -h github.com -u nusken` | PM |
| 🟡 LOW | Refresh Upwork session for Neural messages — `node scripts/upwork-login.js --login --account=carrick` | PM |
| 🟡 LOW | GGS RDS pending upgrade to 17.5.R2 — schedule maintenance window | Nick |

---

## Unresolved Questions

1. **KhanhHH** logged 4h on Aysar vs 0h Generator on Fri — is there a formal split? No leave note for Generator 0h.
2. **Aysar Jamie/Ronan Matrix room** — did whoever worked Aysar hours post a daily report? Cannot verify (Matrix down).
3. **Neural Contract** — any urgent client messages in Upwork DM? Cannot verify (session expired).
4. **Precognize nusken** — any open PRs waiting for review? Cannot check.
5. **LamLQ** at 38.75h vs 20h plan (+18.75h) — intentional scope expansion or task reassignment?
