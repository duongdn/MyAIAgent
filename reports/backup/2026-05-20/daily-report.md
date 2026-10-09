# Daily Report — 2026-05-20 (Wed)

**Run:** 08:27–08:52 +07:00
**Window:** 2026-05-19T09:15 → 2026-05-20T08:27 (+07:00)

---

## Alerts Summary

| # | Severity | Area | Issue |
|---|----------|------|-------|
| 1 | 🔴 HIGH | Fountain | Custom Roses (Infinity) deadline TODAY — Kunal asked May 18 for Wed QC by Tom |
| 2 | 🔴 HIGH | Fountain | Task #2615 massively overrun: 106.75h actual vs 12h est (+789%) — still on Staging |
| 3 | 🟡 MED | Email/Prod | FirstProject 3× PROD errors (atob #884-886) 11:24–11:51 May 19 |
| 4 | 🟡 MED | SAM GUARD | Studios 1/2/3 slow (client michelle, 09:00 UTC), Jira DEL-7224 open, unresolved |
| 5 | 🟡 MED | Fountain | Task #2735 still growing: 132h vs 120h est+CR (+10%), up from 131.5h |
| 6 | 🟡 MED | Fountain | ThinhT 0h after 2 days (plan 4h/week) |
| 7 | 🟡 MED | Fountain | QC (PhatDLT 2h Mon, HungPN 0h) — only 2h of 22h QC plan delivered so far |
| 8 | 🟡 MED | Sheets | KhanhHH 0h Tue May 19, no leave → reminder sent |
| 9 | 🟡 MED | Sheets | LeNH 0h Tue May 19 all sheets, no leave → reminder sent |

---

## Email all — 08:29 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 4 | VuTQ leave request reply (namtv); shared spreadsheet notice; CDF evaluation announcement; HR laptop review |
| carrick | 2 | Redmine Bug #78703 Elliott/Generator (INFO); Jira weekly digest |
| nick | 31 | Azure DevOps PRs (CNA.Operations); Heroku Redis maintenance notice; Stripe sandbox webhook issue; candasurveyors daily completions ×14 |
| rick | 26 | **3 PROD errors** FirstProject atob #884-886 (11:24–11:51); FountainStaging BugSnag (staging only); InfinityStagingBE Rollbar ×16 (staging); daily summaries |
| kai | 1 | Jira weekly digest only |
| ken | 146 | GitHub PR activity: Precognize/development, welligence repos (WellStack, country-manager, ShinyWell, QueryPlatform, web) — normal volume |

**Alerts:** FirstProject PROD atob errors #884-886 (rick@) — note for InfinityRoses/FirstProject team

Trello Check Mail: DuongDn ✓ · Carrick ✓ · Rick ✓ · Kai ✓ · Ken ✓ · Nick ✓

---

## Slack all — 08:35 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 7 | Carrick active; new classes not showing — Carrick ack'd, handling today; roryh asked Twilio email response |
| RDC - FM Monitoring | 18 | Automated tuner alerts only (18:16-21 UTC cluster, auto-recovered); no dmetiner messages |
| Swift Studio | 7 | Client: new classes still not showing; Carrick: "will arrange today". Jeff: pull V5 UAE tasks |
| Xtreme Soft Solutions | 20 | Active dev (#change-requests, #maintenance); Nick + Amy coordinating layout going live tomorrow |
| SAM GUARD - Mobile | 9 | ⚠️ michelle: Studios 1/2/3 very slow (09:00 UTC); Jira DEL-7224 created; Lena asked about NUS server — unresolved |
| GGS | 19 | Nick: resolved corrupted files on Live, fixed Carousel+Slider on staging-sg. Normal activity |
| Amazing Meds | 5 | Nick↔John: Upwork manual time disabled/hours removed; payment task continue OK |
| Generator | 22 | Release postponed (Ryan personal matter → tomorrow); staging DB migration to Aurora; `reminder_at` SQL gap on staging |
| LegalAtoms | 1 | User validation error report (noise — not Nick-specific) |
| MPFC | 0 | No messages — quiet (normal) |
| William Bills | 13 | Lucas daily 8h (product API, checkout, cart); Oliver reviewing staging, feedback coming "this morning" |
| Equanimity | 1 | komal.bailur: sent to SGBULDEX for review — routine coordination |
| Aigile Dev | 2 | Automated alerts only (#braiking-news, #the-gaige-alerts) |

**Alerts:** SAM GUARD studio slowness DEL-7224 (open, unresolved)

**Neural Contract Upwork:** Script returned null (cookie likely expired). Silence is normal; no urgent client messages inferred.

---

## Discord all — 08:31 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri | 38+1 | Vinn daily report ✓ (10:14 +07, "Just report my process today:"); Jeff daily report ✓ (airagri-flutter, 10:27 +07, 4h) |
| Bizurk | DM only | Andrew DM (animeworld): routine exchange ("ok / already rated / Thank you") |

No alerts.

---

## Scrin — 08:27 (+07:00)

- Date checked: 2026-05-19 (Tuesday — correct for Wed run)
- Scrin tracked May 19: **0h** (no sessions recorded since May 11)
- TuanNT John Yi sheet W24 May 19: **0h**
- Status: ✓ No discrepancy (both 0h); TuanNT working Rebecca sheet only this week (8h/day logged there)
- Note: TuanNT has no Scrin tracking since May 12 (8 workdays). INFO — monitor.

---

## Sheets all — 08:38 (+07:00)

| Developer | Tue May 19 | Weekly (Mon+Tue) | Status |
|-----------|-----------|-----------------|--------|
| LongVV (Maddy) | 0h | 8h (Mon only) | 👀 Watch — need 16h by Fri; 0h/day normal for part-time |
| PhucVT | 8h | 16h | ✓ |
| TuanNT | 8h (Rebecca) | 16h (Rebecca) | ✓ JohnYi sheet empty W24 (all hours in Rebecca sheet) |
| VietPH | 8h | 16h | ✓ |
| VuTQ | 4h (nghỉ nửa ngày) | 4h (Mon full leave) | ✓ Half-day leave noted |
| KhanhHH | 0h | 8h (Mon) | ⚠️ 0h Tue, no leave — **reminder sent** |
| LeNH | 0h (all sheets) | 8.17h (Mon Rory) | ⚠️ 0h Tue all sheets, no leave — **reminder sent** |

**Upwork:** Script returned null for all contracts (cookie expired) — comparison skipped.

---

## Fountain — 08:42 (+07:00)

### Part 1 — Matrix Plan (W27)
Sender: @trinhmtt · Posted: 2026-05-18 11:10 +07:00
```
Em update plan tuần này ạ
ViTHT: 40h  |  ThinhT: 4h  |  DatNT: 40h  |  LamLQ: 20h  |  => QC: 22h
```
*(VuTQ not in plan — moved to Bailey, expected)*

### Part 2+3 — Task Log vs Plan (W27, Mon+Tue only)

| Dev | Plan | 2-day actual | Expected @40% | Delta |
|-----|------|-------------|---------------|-------|
| ViTHT | 40h | 16.00h | 16.00h | ✓ on track |
| DatNT | 40h | 16.00h | 16.00h | ✓ on track |
| LamLQ | 20h | 14.75h | 8.00h | +6.75h ahead |
| ThinhT | 4h | 0.00h | 1.60h | ⚠️ -1.60h, 0h 2 days |
| PhatDLT (QC) | ~22h combined | 2.00h | ~8.80h | ⚠️ -6.80h |
| HungPN (QC) | ~22h combined | 0.00h | ~8.80h | ⚠️ 0h |

*(VuTQ 0h expected — Bailey; HaVS 0h — not in plan)*

### Part 4 — Capacity & Runway
- Remaining est (Not Started + In-progress): **257.75h**
- Team capacity: 90h/week
- Runway: **2.86 weeks** (vs prev ~3.0 wks, -0.14 — normal burn)

### Part 5 — Over-Estimate Tracking

| Task | Status | Est+CR | Actual | Over% | Trend |
|------|--------|--------|--------|-------|-------|
| #2595 | Deployed on Staging | 120h | 168.25h | +40% | stable |
| #2615 | Deployed on Staging | 12h | 106.75h | **+789%** | stable (but massive) |
| #2735 | In-progress | 120h | 132.00h | +10% | ⚠️ +0.5h growing |
| #2702 | In-progress | 8h | 25.50h | +219% | — |
| #2816 | Deployed on Staging | 20h | 44.25h | +121% | — |

### Trello Board Snapshot
- Active: 75 cards total (To-Do 27, Bugs 21, Doing 11, QC Backlog 9, In QA 2)
- Stuck (>5 days): 62 cards
- Hard-to-release (Doing >14 days): 5 cards
- **Customer comments (May 18-20):**
  - @kunalsheth (May 18 20:40): "Can we have [Custom Roses] ready by Wednesday for Tom to QC" → **deadline today**
  - @mike62798179 (May 18 17:25): Out-of-stock item checkout bug (Order #6450569DU, Let's Toast Candle)

**Trello Fountain item:** ⚠️ skipped (customer deadline alert + active overruns)

---

## Elena — 08:38 (+07:00)

### PRs (Elena-SamGuard-Digital-Plant)
No open PRs today. Last merge was PR #302 (2026-05-18) — already deployed.

### Pending Actions
None (all historical entries marked DONE in `.elena-pending-actions.json`).

### Precognize PRs (nusken)
No open `nusken` PRs on `Precognize/development`.

### WordPress (samguard.co)
Console errors: **None** — page loaded clean.

---

## Trello — 08:50 (+07:00)

### Check Progress

| Checklist | Item | Status |
|-----------|------|--------|
| Normal | Maddy - Carrick/Kai/Luis | ✓ complete |
| Normal | John Yi - Amazing Meds | ✓ complete |
| Should do | James Diamond - Vinn | ✓ complete |
| Closely monitor | Rory | ✓ complete |
| Closely monitor | Aysar | ✓ complete |
| Closely monitor | Franc | ✓ complete |
| Closely monitor | Elliott | ✓ complete |
| Work | MPFC | ✓ complete |
| Work | Marcel | ✓ complete |
| Work | Elena - SamGuard Digital Plant | ⚠️ skipped (SAM GUARD studio slowness DEL-7224 open) |
| Work | Raymond - LegalAtoms | ✓ complete |
| Work | Neural Contract | ✓ complete |
| Work | Bailey | ✓ complete |
| Work | Andrew Taraba | ✓ complete |
| Work | Rebecca - William Will | ✓ complete |
| Work | Colin | ✓ complete |
| Work | Fountain | ⚠️ skipped (Kunal deadline TODAY + active overruns) |
| Pending | Elena - WordPress SamGuard | ✓ complete |

### Check Mail

All 6 items ✓ (DuongDn · Carrick · Rick · Kai · Ken · Nick)

---

## Reminders — 08:51 (+07:00)

| Developer | Room | Status |
|-----------|------|--------|
| KhanhHH | !rwLbvLBnrRAYMaOPaD:nustechnology.com | ✓ sent (0h Tue May 19) |
| LeNH | !OIrgPraJWrcDTnRVLQ:nustechnology.com | ✓ sent (0h Tue May 19, all sheets) |
| LongVV | — | skipped (0h/day normal for part-time; weekly track only) |

---

## Action Items

1. **🔴 Fountain — Custom Roses TODAY**: ViTHT working on #2837. Verify Deployed on Staging and hand off to Tom (or PhatDLT) for QC by EOD.
2. **🟡 FirstProject PROD errors** atob #884-886: Notify rick/InfinityRoses team to investigate.
3. **🟡 SAM GUARD DEL-7224**: Studios 1/2/3 slowness unresolved — follow up on NUS server / client infra. Lena's message needs a response.
4. **🟡 Fountain #2615** (789% overrun, on Staging): Schedule estimate correction discussion with Kunal team.
5. **🟡 Generator staging** `reminder_at` SQL gap: Follow up before tomorrow's release attempt.
6. **🟡 Upwork session** expired (cookie) — refresh `config/.upwork-config.json` for weekly hours comparison.

---

*Run complete: 08:52 +07:00*
