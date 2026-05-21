# Daily Report — 2026-05-21 (Thu) 08:06 +07:00

Window: 2026-05-20 08:52 → 2026-05-21 08:06 (+07:00)

---

## ALERTS

### 🔴 HIGH — WilliamBills (MWMX)

**1. Payment system down** — customers reporting checkout errors (oliver flagged ~09:16 VN time 2026-05-20).
**2. Subscription data leak (privacy)** — logged-in users seeing other customers' subscription data.
- Root cause (QuânLee): `Woo REST /subscriptions?customer=` returning global data.
- PRs submitted: https://github.com/kwanLeeFrmVi/mwmx-wordpress/pull/1 + https://github.com/kwanLeeFrmVi/mwmx-web/pull/167
- **Deploy status unclear** — not confirmed merged/live as of last Slack message.
- Trello: ⚠️ Rebecca / William Bills **SKIPPED**

### 🔴 HIGH — InfinityRoses (rick@ Production)

- Bug #426: `NoMethodError: undefined method 'price' for nil:NilClass` (prod) — 11:30 + 12:44 2026-05-20
- Bug #427: same error, different occurrence — production
- **Action:** Rick needs to investigate/deploy fix.
- Trello: ⚠️ Rick mail **SKIPPED**

### 🔴 HIGH — FirstProject (rick@ Production)

- Rollbar: 10 occurrences in 5 min — `Minified React error #418` (prod) — 22:00 2026-05-20
- Trello: ⚠️ Rick mail **SKIPPED**

---

## MEDIUM

### 🟡 SamGuard Digital Plant — Studio 1 & 2 servers still failing

Studio 1 & 2 DP server unstable (ongoing). Team discussing using separate internal server for AA. No blocking deployment — Elena PRs 0 open, WordPress clean. Monitoring.
- Trello: ✓ Elena - SamGuard Digital Plant **COMPLETE** (dev-side clean; server infra tracked separately)

### 🟡 Fountain — QC Severely Behind

QC plan W27 = 22h. Actual through Thu AM: PhatDLT 2h, HungPN 0h → combined **2h / 22h (9%)** with only Thu+Fri remaining.
- TrinhMTT not QC — excluded.
- Per feedback_hungpn_not_sole_qc: HungPN 0h not alert if PhatDLT covers, but PhatDLT also near-zero.
- #2735 still growing: 133h actual vs 120h est+CR (+11%), was 132h yesterday.
- Trello: ⚠️ Fountain **SKIPPED**

### 🟡 Precognize — PR CI Failure

- ken@: nusken PR `Sr 6921 active alerts header tabs filter and sort` failed CI twice (09:07 + 17:07).
- Same branch, same failure — unit test broken on that PR.
- Trello: ✓ Ken mail **COMPLETE** (check done; CI failure noted, not blocking)

---

## INFO

### AirAgri — P1 Alarm Issue

- Multiple stop alarm emails for single active alarm (expected = 1 email then follow groups). Vinn investigating.
- James Diamond: bulk termination request for JBS Riverina alarms (2026-05-21 01:11).
- Vinn daily report ✓ (10:14): PR review + staging deploy + alarm investigation.
- Jeff daily report ✓ (10:22): 4h Safety Data Sheets module iOS TF 3.4.3.
- Trello: ✓ James Diamond / Vinn **COMPLETE**

### Amazing Meds — BHRT Field Removal

- Client "Ale" reported biological gender field removed from BHRT questionnaire on website, asking to add back.
- No NUS response visible in Slack window. Nick (gate) — no messages in amazingmeds window.
- **Follow up needed**: Nick to respond to client's field restoration request.
- Trello: ✓ John Yi - Amazing Meds **COMPLETE**

### Staging Noise (rick@ — non-blocking)

- InfinityStagingBE: recurring `NoMethodError: order_items` Rollbar spam every ~5 min (9 emails, 09:01–11:06)
- FountainStaging: `ActiveRecord::PendingMigrationError` on 2 endpoints (15:57–16:01), scanner probe `php-cgi.exe` 07:02 (low priority)

### Elliott / Generator — Bugs Progressing

- Batch 2 deployed (Violet confirmed). Bug #547 deferred.
- Redmine #78688 + #78703: In Progress → Deployed on Staging (carrick@, normal workflow).
- Null member DB error + duplicate entry resolved (Carrick ran migration fix, Rudi switched staging DB).
- Trello: ✓ Elliott **COMPLETE**

### RDC — Tuner Instability Alerts

- 5 automated Tuner Instability Alerts fired in window, all followed by recovery alerts. No human messages. No Franc activity.
- Trello: ✓ Rory item not completed (LeNH 0h — see below)

### Generator — Jira BXR-217 Twilio

- New Jira ticket from Jeff Nguyen (SwiftStudio) — Twilio issue. Not a Redmine escalation.
- carrick@ received at 11:25. Follow up with Carrick/Elliott team as needed.

---

## Email Summary

| Account | In Window | Key Findings |
|---|---|---|
| duongdn@ | 1 | KhanhHH leave request 2026-05-29 |
| carrick@ | 34 | Generator Redmine #78688/703/572 progressing; Jira BXR-217 Twilio |
| nick@ | 29 | Nothing from John Yi |
| rick@ | 24 | ⚠️ PROD: InfinityRoses #426/#427 (NoMethodError), FirstProject React #418; Staging: InfinityStagingBE + FountainStaging |
| kai@ | 0 | Nothing |
| ken@ | 200 | Precognize PR CI failure (same branch x2); Welligence/amocc routine GitHub noise |

Trello Check Mail: ✓ DuongDn, Carrick, Kai, Ken, Nick | ⚠️ Rick (production alerts)

---

## Slack Summary

| Workspace | Msgs | Status |
|---|---|---|
| baamboozle | 7 | Carrick: PR #36 done, invoice issue; Jamie testing Change Team Owner (bugs found) |
| rdc | 21 | All automated tuner alerts. No Franc activity. |
| swift | 21 | Rory: memberships sync issue (BXR CMS vs app). Carrick helping. Sprint 6 started. |
| xtreme | 5 | Kai rescheduling to Fri. No daily report (16h/wk, not required). |
| samguard | 17 | Studio 1&2 still failing. Internal server discussion. No Elena dev activity. |
| ggs | 14 | Amy active (double-scan test, desktop mockup). No Nick messages. |
| amazingmeds | 2 | Client "Ale": BHRT field removed, requesting restore. No NUS response. |
| generator | 39+ | Batch 2 live. Fixes for #547 + null member + duplicate entry done. |
| legalatoms | 2 | Tyler EFSP prod access granted (MD + TX). No Nick mentions. |
| mpfc | 0 | Silent. |
| williambills | 80 | ⚠️ Payment down + subscription data leak. PRs submitted, deploy unclear. |
| equanimity | 7 | Carrick active with Komal on trade data. No Marcel activity. |
| aigile | 3 | Automated Gaige monitoring pings (empty). No Colin messages. |

---

## Discord Summary

| Server | Account | Msgs | Status |
|---|---|---|---|
| AirAgri | nusvinn | 50+ | Vinn daily report ✓, Jeff daily report ✓, P1 alarm issue active |
| Bizurk | nuscarrick | 0 | Silent (normal). AnimeWorld DM: last msg 2026-05-19 (before window). |

---

## Google Sheets — Task Log (Wed 2026-05-20)

| Developer | Wed 20/05 | W-Total So Far | Target | Status |
|---|---|---|---|---|
| LongVV | 0h (normal) | 8h Maddy | 16h/wk | ✓ OK (part-time, 0h/day normal) |
| PhucVT | 8h ✓ | 24h | 8h/day | ✓ OK |
| TuanNT | 0h ⚠️ | 16h (Rebecca only) | 8h/day | ⚠️ JohnYi W24 empty all week |
| VietPH | 0h ⚠️ | 16h (Mon+Tue) | 8h/day | ⚠️ Task stub entered, no hours |
| VuTQ | 0h ⚠️ | 4h (Tue half-day) | 8h/day | ⚠️ Bailey — 0h Wed no leave |
| KhanhHH | 4h ⚠️ | 20h | 8h/day | ⚠️ Short 4h Wed, no leave |
| LeNH | 0h ⚠️ | 16.67h (Mon+Tue) | 8h/day | ⚠️ 0h Wed all sheets (Rory/Franc/Aysar/Rebecca) |

---

## Scrin.io — TuanNT / John Yi (Wed 2026-05-20)

- Scrin.io tracked: 0h
- JohnYi task log: 0h (W24 blank all week)
- Result: **MATCH** — no discrepancy.

---

## Fountain 5-Part Check — W27

**Part 1 — Matrix Plan (W27)**
Posted by @trinhmtt, 2026-05-18 11:10 +07:00:
```
ViTHT: 40h | ThinhT: 4h | DatNT: 40h | LamLQ: 20h | QC: 22h
```
VuTQ not in plan (moved to Bailey — expected). HaVS not in plan (no alert).

**Part 2 — Task Log Actuals (W27, Mon–Wed)**

| Dev | Mon | Tue | Wed | W27 Total | Plan |
|---|---|---|---|---|---|
| ViTHT | 8h | 8h | 8h | 24h | 40h |
| ThinhT | 0h | 0h | 4h | 4h | 4h ✓ |
| DatNT | 0.5h | 8h | 8h | 16.5h | 40h |
| LamLQ | 8h | 6h | 8h | 22h | 20h (ahead) |
| HaVS | 0h | 0h | 0h | 0h | not in plan |
| VuTQ | 0h | 0h | 0h | 0h | not in plan (Bailey) |
| PhatDLT (QC) | 2h | 0h | 0h | 2h | ~22h ⚠️ |
| HungPN (QC) | 0h | 0h | 0h | 0h | ~22h ⚠️ |

**Part 3 — Plan vs Actual**

| Dev | 3-day plan pace (60%) | Actual | Delta |
|---|---|---|---|
| ViTHT | 24h | 24h | = on track |
| DatNT | 24h | 16.5h | -7.5h ⚠️ (Mon 0.5h) |
| LamLQ | 12h | 22h | +10h ahead |
| ThinhT | 2.4h | 4h | +1.6h on track |
| QC combined | 13.2h | 2h | -11.2h 🔴 critical |

**Part 4 — Capacity & Runway**

| | Value |
|---|---|
| Active Est+CR remaining | 306.8h |
| Dev capacity | 90h/wk |
| Runway | **3.41 weeks** |
| vs yesterday | +49h (new tasks added to active backlog) |

**Part 5 — Over-Estimate Tracking**

| Task | Est+CR | Actual | Over% | vs Prev |
|---|---|---|---|---|
| #2595 | 120h | 168.2h | +40% | stable |
| #2615 | 12h | 106.8h | +790% | stable |
| #2735 | 120h | 133h | +11% | +1h **growing** |
| #2702 | 8h | 25.5h | +219% | (active) |

---

## Elena

| Check | Result |
|---|---|
| Open PRs (duongdn) | 0 — nothing to merge |
| Deploy | N/A |
| Redmine updates | None |
| Precognize PRs (nusken) | 0 open |
| WordPress samguard.co | ✓ Clean — 0 JS errors |

---

## Trello — Check Progress

| Item | Status | Reason |
|---|---|---|
| Maddy - Carrick/Kai/Luis | ✓ | Active, no alerts |
| John Yi - Amazing Meds | ✓ | BHRT request noted (follow up needed) |
| James Diamond - Vinn | ✓ | Daily reports ✓, P1 being handled |
| Rory | ⚠️ SKIP | LeNH 0h Wed, no leave |
| Aysar | ⚠️ SKIP | KhanhHH 4h shortfall Wed |
| Franc | ⚠️ SKIP | LeNH 0h Wed all sheets |
| Elliott | ✓ | Batch 2 live, fixes active |
| MPFC | ✓ | Quiet, no alerts |
| Marcel | ✓ | Adhoc, 0h expected |
| Elena - SamGuard | ✓ | Dev-side clean |
| Raymond - LegalAtoms | ✓ | Tyler EFSP access granted |
| Neural Contract | ✓ | Silence = no urgent msgs |
| Bailey | ⚠️ SKIP | VietPH 0h Wed, no leave confirmed |
| Andrew Taraba | ✓ | No AnimeWorld msgs (normal) |
| Rebecca / WilliamBills | ⚠️ SKIP | Payment down + data leak |
| Colin | ✓ | No alerts |
| Fountain | ⚠️ SKIP | QC 2h/22h, #2735 growing |
| Elena - WordPress SamGuard | ✓ | 0 JS errors |

## Trello — Check Mail

| Account | Status | Reason |
|---|---|---|
| DuongDn | ✓ | KhanhHH leave May 29 noted |
| Carrick | ✓ | Generator bugs in normal pipeline |
| Rick | ⚠️ SKIP | Production alerts: InfinityRoses + FirstProject |
| Kai | ✓ | Nothing |
| Ken | ✓ | Precognize CI failure noted |
| Nick | ✓ | Nothing from John Yi |

---

## Matrix Reminders Sent (Wed 2026-05-20 0h)

| Developer | Room | Message |
|---|---|---|
| TuanNT | !knbJbIKzXRJNGVFQNg | 0h Wed (JohnYi + Rebecca both empty) |
| VietPH | !kzyLVmJxcRESoTkfnY | 0h Wed (task stub, no hours filled) |
| VuTQ | !SHdFKwrYpRhWJBtiBv | 0h Wed no leave |
| KhanhHH | !rwLbvLBnrRAYMaOPaD | 4h Wed (short by 4h, no leave) |
| LeNH | !OIrgPraJWrcDTnRVLQ | 0h Wed all sheets |

LongVV: 0h Wed is normal (part-time) — no reminder.

---

## Action Items

1. **🔴 WilliamBills** — Confirm QuânLee PRs merged + deployed. Payment + data leak must be resolved.
2. **🔴 InfinityRoses** — Rick to investigate `NoMethodError 'price' nil` (prod Bug #426/#427).
3. **🔴 FirstProject** — Rick to investigate React error #418 (prod, 10 occurrences in 5 min).
4. **🟡 Amazing Meds** — Nick to respond to "Ale" re: BHRT questionnaire biological gender field restore.
5. **🟡 Fountain QC** — Kunal/team: PhatDLT+HungPN need to deliver 20h QC by Fri EOD.
6. **🟡 DatNT** — Behind pace: 16.5h vs 24h target at 60% through week.
7. **KhanhHH** — Leave request 2026-05-29 received (via duongdn@ from Tuan To) — approve/note.
8. **Precognize** — nusken to investigate CI failure on PR `Sr 6921` (failed twice).

---

*Matrix token refreshed (was expired). Timelines updated.*
