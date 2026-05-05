# Daily Report — 2026-05-05 (Tue) 09:30 (+07:00)

**Window:** 2026-05-04T08:30:00+07:00 → 2026-05-05T09:11:40+07:00
**Reporting day:** Mon 2026-05-04

## Critical Alerts

| Sev | Source | Item | Notes |
|---|---|---|---|
| HIGH | rick@ Rollbar | InfinityRoses production hydration spike | 10-in-5min React #418/#423/#425 + #875 "credit" + #1000 ChunkLoadError @ 05-05 08:53. Deploy regression suspected. **Rick mail item left incomplete.** |
| MEDIUM | Slack swift | bxr_app Twilio/SMS verification spam | ~40 recharge SMS; possible Twilio compromise. Jeff acknowledged. **Rory + Rory(Swift Studio) Trello items skipped.** |
| MEDIUM | Fountain | Matrix token expired + multiple issues | W25 plan unverified, VuTQ 0h Mon, kunalsheth Build-a-Box NoMethodError ~33h unresolved, stuck cards +5. **Fountain Trello item skipped.** |
| LOW | carrick@ | Twilio account-suspension forward (Rory) + Snyk + Redmine #78232 | Acknowledged |

---

## 1. Email — see [_piece-email.md](./_piece-email.md)

| Account | Count | Summary |
|---|---|---|
| duongdn | 2 | No leave, no New Relic |
| carrick | 9 | Twilio suspension fwd, Snyk, Redmine #78232 |
| nick | 6 | No John Yi mail |
| rick | 19 | **HIGH** Rollbar production spike (InfinityRoses) |
| kai | 1 | Shopify-app July 1 deadline (INFO) |
| ken | 283 | Precognize PR activity (newsletter) |

**Trello "Check mail" card:** https://trello.com/c/GL3zuDCi
- ✓ completed: DuongDn, Carrick, Nick, Kai, Ken (5)
- ⚠️ skipped: Rick (production error spike)

## 2. Slack — see [_piece-slack.md](./_piece-slack.md)

14/14 workspaces OK. 179 msgs total. Token status: all valid (no refresh needed).

| Workspace | Msgs | Key |
|---|---|---|
| Baamboozle | 40 | Aysar activity OK; 4 open GH issues (web-app), 0 (bbzl-web-client) |
| RDC | 12 | Franc — dmetiner activity OK |
| Swift | 6 | **Twilio/SMS spam on bxr_app — MEDIUM** |
| Xtreme | 1 | Kai posted progress (LIFM2-434/437 done) |
| SamGuard | 16 | Elena/DP — clean |
| GGS | 26 | Nick posted in #maintenance |
| AmazingMeds | 10 | John Yi — clean |
| Generator | 9 | Violet posted update |
| LegalAtoms | 16 | Alpha-down (their team) — INFO |
| MPFC | 0 | Low activity normal |
| WilliamBills | 7 | Oliver/Lucas tasks OK |
| Equanimity | 34 | Carrick fixed xidtech Safari bug — RESOLVED |
| SoCal | 0 | Low activity normal |
| Aigile | 2 | Colin OK |

**WordPress samguard.co:** 0 errors / 0 CSP violations.

## 3. Discord — see [_piece-discord.md](./_piece-discord.md)

Both tokens (nusvinn, nuscarrick) verified.

| Server | Msgs | Key |
|---|---|---|
| AirAgri | 164 (webapp 121, flutter 43) | **Vinn daily report ✓** ("Just report my process today:" 05-04 17:15); **Jeff daily report ✓** (4h 05-04 17:22) |
| Bizurk | 15 (animeworld DM) | Andrew Taraba — Upwork contract negotiation, Carrick agreed |

## 4. Sheets — see [_piece-sheets.md](./_piece-sheets.md) — for Mon 04/05

| Dev | Mon 04/05 | Status |
|---|---|---|
| LongVV | Maddy 8.00h + JD 0.00h = 8.00h | OK |
| PhucVT | 8.00h JD | OK |
| TuanNT | JY 4.00h + Rebecca 4.00h = 8.00h | OK |
| VietPH | 8.00h Paturevision | OK |
| KhanhHH | 8.00h Generator | OK |
| LeNH | Franc 4.00h + Aysar 3.83h = 7.83h | OK |

No 0h-no-leave alerts. No Matrix reminders required.

## 5. Scrin.io — see [_piece-scrin.md](./_piece-scrin.md)

- Mon 04/05: TuanNT/John Yi Scrin = 4.03h | Task log JY = 4.00h | **Status OK** (matches).

## 6. Fountain (5-part) — see [_piece-fountain.md](./_piece-fountain.md)

| Part | Status |
|---|---|
| 1. Matrix Plan | ⚠️ BLOCKED — token expired, headless refresh fails (browser profile corrupted). Falling back to W24 plan; W25 unverified. |
| 2. Task Log Actuals (W25) | Day-1: VuTQ 0h, ViTHT 8h, DatNT 7.5h, ThinhT 4h, HaVS 0h, PhatDLT 2h, HungPN 0.5h. Sheet total D30 = 22h. |
| 3. Plan vs Actual | ViTHT/DatNT ahead. **VuTQ 0h Mon — watch.** QC pace OK (PhatDLT covers HungPN). |
| 4. Capacity & Runway | NS+IP remaining = **180.25h** (−1.0h vs yest). Broader = **260.0h** (+4.75h). Runway ~3.76 wk @ 48h/wk. Top backlog: #2775 43h, #1178 40h, #2854 34.5h. |
| 5. Over-estimate | All tracked tasks (#2595, #2615, #2735, #2816, #2837, #2815) **STABLE** vs yest. No "STILL GROWING" flags. #2735 cooled. |

**Fountain Trello board** (`5475eaf923a9a1309357eb51`): 70 active (+1). Customer comments 30 (no new). Stuck +5 (52). Hard-to-release: card clSdoRlL 31.8d, WGsYqu5h 20.0d. **kunalsheth Build-a-Box NoMethodError ~33h unresolved.**

## 7. Elena — see [_piece-elena.md](./_piece-elena.md)

- **Elena (duongdn):** 0 open PRs / 0 merged today.
- **Precognize (nusken):** 7 open PRs (monitor-only, no auto-merge):
  - [#4873](https://github.com/Precognize/development/pull/4873) SR-7065 Optimize influx query
  - [#4870](https://github.com/Precognize/development/pull/4870) SR-7277 Fix double header /report
  - [#4868](https://github.com/Precognize/development/pull/4868) SR-7231 migration tag alerts mongo
  - [#4867](https://github.com/Precognize/development/pull/4867) DP-177 cannot duplicate canvas
  - [#4859](https://github.com/Precognize/development/pull/4859) DEL-7109 edit agent host ip
  - [#4848](https://github.com/Precognize/development/pull/4848) SR-6921 active alerts FE
  - [#4831](https://github.com/Precognize/development/pull/4831) SR-6921 active alerts
- **WordPress samguard.co:** clean.

## 8. Upwork — see [_piece-upwork.md](./_piece-upwork.md)

| Workroom | Hours | Match | URL |
|---|---|---|---|
| Rory (LeNH) | 0:00 | OK ad-hoc | [link](https://www.upwork.com/nx/wm/workroom/41069448/timesheet) |
| Aysar (LeNH) | 4:10 | matches log Mon 3.83h | [link](https://www.upwork.com/nx/wm/workroom/35642393/timesheet) |
| Bailey-VietPH | 6:50 | matches task-ID-filtered log Mon 5.5h | [link](https://www.upwork.com/nx/wm/workroom/42545630/timesheet) |
| Bailey-DuongDN | 0:00 | inactive expected | [link](https://www.upwork.com/nx/wm/workroom/43093775/timesheet) |
| Neural Contract | 0:00 (msg) | last client msg Apr 24 ("Enjoy your holiday"); Apr 23 Compare-module bug fixed but client never confirmed | [link](https://www.upwork.com/nx/wm/workroom/38901192/messages) |

## 9. Trello — see [_piece-trello.md](./_piece-trello.md)

**Check progress card:** https://trello.com/c/nkHlSA2R/772-check-progress

- ✓ completed (17): Maddy, Blake, John Yi, James Diamond, Aysar, Franc, Elliott, MPFC, Marcel, Elena SamGuard, Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Elena WordPress.
- ⚠️ skipped (2): **Rory** (Swift bxr_app Twilio/SMS), **Fountain** (5-part issues).

## 10. Reminders

None — all devs OK on task log Mon 04/05.

---

## Unresolved Questions

1. **Matrix token refresh** — headless flow fails (refresh_token invalid_grant + browser profile corrupted). Needs interactive headed Chrome with DISPLAY to redo SSO. Blocks Fountain Part 1 verification.
2. **W25 Fountain plan** — has trinhmtt posted yet? Cannot verify until Matrix token works.
3. **VuTQ 0h Mon** — single data point; reason unknown (leave / sick / off-plan).
4. **InfinityRoses Rollbar spike** — needs Fountain dev investigation (likely deploy regression).
5. **Swift Studio Twilio** — possible account compromise; Carrick + Jeff aware.
6. **Neural Compare-module fix** — Michael never confirmed Apr 24 fix; recommend mid-week ping.

---

## Sheets — 09:29 (+07:00) — refresh (resume)

**Mon 04/05 (verify):**

| Dev | Hours | Δ vs 09:23 | Status |
|---|---|---|---|
| LongVV | Maddy 8.00h + JD 0.00h = 8.00h | 0.00 | OK (unchanged) |
| PhucVT | 8.00h | 0.00 | OK (unchanged) |
| TuanNT | JY 4.00h + Rebecca 4.00h + PV 0.00h = 8.00h | 0.00 | OK (unchanged) |
| VietPH | 8.00h | 0.00 | OK (unchanged) |
| KhanhHH | 8.00h | 0.00 | OK (unchanged) |
| LeNH | Rory 0.00h + Franc 4.00h + Aysar 3.83h + Rebecca 0.00h = 7.83h | 0.00 | OK (unchanged, slight short no leave) |

**Tue 05/05 (today, partial — 09:29):**

| Dev | Hours | Note |
|---|---|---|
| LongVV | 0.00h (Maddy 0 + JD 0) | Partial — normal at 09:29 |
| PhucVT | 0.00h | Partial — normal |
| TuanNT | 0.00h (JY 0 + Rebecca 0 + PV 0) | Partial — normal |
| VietPH | 0.00h | Partial — normal |
| KhanhHH | 0.00h | Partial — normal |
| LeNH | 0.00h (Rory 0 + Franc 0 + Aysar 0 + Rebecca 0) | Partial — normal |

**Alerts:** None. Mon 04/05 hours identical to 09:23 run (no late entries). Tue 05/05 zero hours expected at 09:29.

---

## Sheets — 09:49 (+07:00) — refresh tick 2

**Mon 04/05:** unchanged Y

| Dev | Hours | Δ vs 09:29 | Status |
|---|---|---|---|
| LongVV | Maddy 8.00h + JD 0.00h = 8.00h | 0.00 | OK (unchanged) |
| PhucVT | 8.00h | 0.00 | OK (unchanged) |
| TuanNT | JY 4.00h + Rebecca 4.00h + PV 0.00h = 8.00h | 0.00 | OK (unchanged) |
| VietPH | 8.00h | 0.00 | OK (unchanged) |
| KhanhHH | 8.00h | 0.00 | OK (unchanged) |
| LeNH | Rory 0.00h + Franc 4.00h + Aysar 3.83h + Rebecca 0.00h = 7.83h | 0.00 | OK (unchanged) |

**Tue 05/05 (partial):**

| Dev | Hours | Note |
|---|---|---|
| LongVV | 0.00h (Maddy 0 + JD 0) | Partial — normal at 09:49 |
| PhucVT | 0.00h | Partial — normal |
| TuanNT | 0.00h (JY 0 + Rebecca 0 + PV 0) | Partial — normal |
| VietPH | 0.00h | Partial — normal |
| KhanhHH | 0.00h | Partial — normal |
| LeNH | 0.00h (Rory 0 + Franc 0 + Aysar 0 + Rebecca 0) | Partial — normal |

**Alerts:** None. Mon 04/05 hours identical to 09:23/09:29 runs. Tue 05/05 0h across all devs expected at 09:49.
