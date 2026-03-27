# Daily Monitoring Report — 2026-03-27 (Friday)

**Window:** 2026-03-26 08:21 → 2026-03-27 08:07 (Asia/Saigon)

---

## DISCORD

### AirAgri (nusvinn) — Token OK

**#airagri_webapp** — Very active (100+ messages)

Key activity:
- **Lora sensor data issue**: Vinn investigated & fixed Lora sensor not showing on AirAgri. Leon (dapackage) had a related safety-net fix in staging. Confirmed both old and new Lora sensors now showing data.
- **Incident reporting broken on production**: Brett Millar reported users at processing facility getting server/domain errors. Leon identified root cause — yesterday's production push included notification logic from staging without try/catch. Fix pushed in PR276 (Throwable), merged & deployed to production. Confirmed working.
- **Weather unit conversion hotfix**: Brett requested wind speed change from knots to km/h. Leon did PR274 (master) + PR275 (staging) with math conversion fix (1.94 -> 3.6). Vinn reviewed, asked for DRY refactor. Leon updated. Email conversion confirmed correct. **Issue**: webapp still showing knots per James — staging fix live but production PR not yet merged.
- **EROAD sensor fix**: Leon added handling to skip EROAD sensors that crash cron job (same pattern as staging).
- **PHP upgrade**: Vinn working on PHP 7.2 upgrade for production (in progress).
- Vinn actively supporting Leon, reviewing code, coordinating with James (.jdiamond) and Mary (bellatric02).

**#airagri-flutter** — 26 messages

Key activity:
- **Android app not loading**: James reported customer complaint. Jeff checked — store version was v152 (2.7) from Oct 2025, pointing to production. Backend changes since then caused incompatibility.
- Leon built new Android release APK, Jeff submitted to Google Play — under review.
- **Map pin icon update**: James requested SafeFarm + main app pin updates. Jeff waiting for Leon to send the PLD/device icon file.
- Jeff working on Lessons Learned module (Save Draft, Distribute APIs) and Incident Approval.

**Daily Reports (Wed Mar 26):**

| Person | Posted? | Time (UTC) | Summary |
|--------|---------|------------|---------|
| **Jeff** | YES | 10:23 | 4h: Lessons Learned APIs (Save Draft, Distribute) deployed iOS TF 3.4.1(14), Android build submitted, Incident Approval in progress |
| **Vinn** | YES | 10:06 | Lora sensor fix (done), support Leon & Jon, code review, PHP upgrade for production (in progress) |

**Daily Reports (Thu Mar 27):** Not yet posted (report generated at 08:07).

### HOMIEAPP (nusvinn) — Token OK

- **#homieapp_webapp** — 0 messages
- **#homieapp_mobileapp** — Missing Access (permission issue)
- **#general** — 0 messages

No activity in accessible channels during window.

### Bizurk (nuscarrick) — Token OK

- **All dev channels** — Missing Access (50001). Bot can see guild but lacks channel-level read permissions.
- **#welcome** — 0 messages

**ALERT**: nuscarrick account has Missing Access on all Bizurk dev channels (fwf-frontend, wooha-frontend, tyqoon-frontend, otto-general, etc.). Channel permissions need to be granted.

---

## MATRIX / FOUNTAIN

**Token**: Refreshed successfully via Puppeteer.

**Fountain room** — Active

**Weekly plan update (2026-03-26 09:31 by @trinhmtt):**
> Em update plan tuan nay a
> - ViTHT: 22h
> - ThinhT: 4h
> - HaVS: 22.5h
> - VuQT: 40h
> - =>QC: 22h

**Other activity:**
- @duongdn borrowed HaVS for ~1.5h for urgent Bailey task (HaVS total 1h Bailey, ~23h remaining for Fountain)
- VuQT fixed product display issue (was showing 0 products)
- HungPN & VuQT investigating: email missing for Gift Drop orders, order prices mismatch, Personal order emails missing. VuQT fixed 2 of 3 issues, third deferred to separate ticket.
- ViTHT asking about Smart Link gift selection logic
- Team discussing Trello cards: #2789 (product catalog revert), #2639 (card categories), #2615 (gift cards), #2380 (delivery dates)

---

## GITHUB

### Elena-SamGuard-Digital-Plant (duongdn)

**Open PRs:** 0

**Recently merged (within window):**
- **PR #292** — fix/redmine/77793: Merged 2026-03-26T01:23 — Settings save button fix. Deployed. Redmine #77793 marked Deployed.
- **PR #291** — DP-648: Merged 2026-03-26T01:23 — Deployed.

**Pending actions from config:**
- PR #290 (DP-648, merged 2026-03-24) — deployed, no Redmine status update (DP ticket)
- PR #291 (DP-648, merged 2026-03-26) — deployed, no Redmine status update (DP ticket)
- PR #288 (DP-650, merged 2026-03-19) — deployed, no Redmine status update (DP ticket)

### Precognize (nusken)

**Open PRs: 6** (4 created/updated within window)

| PR | Title | Author | Created |
|----|-------|--------|---------|
| #4802 | SR-7204 fix user's table (edit delete) | Vladimir-precog | 2026-03-26 15:31 |
| #4800 | SR-7198 added external id to missed event | mahkris | 2026-03-26 12:27 |
| #4799 | SR-7102 Implement update and get evaluation method APIs | nusdavid | 2026-03-26 10:24 |
| #4798 | Process digital plant - 2026/03/26 | nusken | 2026-03-26 04:07 |
| #4793 | SR-7105 investigation close api optional fields | mahkris | 2026-03-23 |
| #4750 | WIP DPP upgrade | nusken | 2026-02-24 |

---

## REDMINE

**7 issues updated** since window start:

| # | Status | Subject | Assigned | Change |
|---|--------|---------|----------|--------|
| [#77793](https://redmine.nustechnology.com/issues/77793) | Deployed | Settings save button fix | Tung Dong-Viet | New -> Deployed (via PR #292) |
| [#77836](https://redmine.nustechnology.com/issues/77836) | Deployed on Live | Block selection not highlighting paddocks | Viet Pham-Hoang | New -> Deployed on Live |
| [#77839](https://redmine.nustechnology.com/issues/77839) | Deployed on Live | Product accessories toggle missing | Viet Pham-Hoang | New -> Deployed on Live |
| [#77818](https://redmine.nustechnology.com/issues/77818) | Deployed on Staging | Expand button on short descriptions | Viet Pham-Hoang | New -> Deployed on Staging |
| [#77819](https://redmine.nustechnology.com/issues/77819) | In Progress | Expired promotion codes accepted | Viet Pham-Hoang | New -> In Progress |
| [#77876](https://redmine.nustechnology.com/issues/77876) | New | Dis Comments character limit notification | Long Vo-Van | New ticket |
| [#77874](https://redmine.nustechnology.com/issues/77874) | New | Block multiple clicks on Bulk update price | Long Vo-Van | New ticket |

---

## ALERTS

1. **MEDIUM** — Bizurk Discord: nuscarrick has Missing Access (50001) on ALL dev channels. Cannot monitor any Bizurk project activity. Channel permissions need update.
2. **LOW** — HOMIEAPP #homieapp_mobileapp: Missing Access. May need permission grant.
3. **INFO** — AirAgri weather knots->km/h fix: staging live but production PR not yet merged. James noted webapp still showing knots.
