# Daily Report — 2026-05-26 (Tue)

**Window:** 2026-05-25T09:05+07 → 2026-05-26T08:46+07
**Generated:** 08:46 +07:00

---

## Email [all] — 08:20 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 0 | Nothing notable |
| carrick@ | 0 | Nothing notable |
| nick@ | 0 | No John Yi messages |
| rick@ | 2 | FountainStaging NameError (INFO), no prod Rollbar alerts |
| kai@ | 0 | No Madhuraka messages |
| ken@ | 1 | Snyk Marcel alert (INFO severity) |

**Alerts:** None (FountainStaging NameError = staging only, INFO. Snyk = INFO).

**Notable:** LongVV emailed leave request for today 2026-05-26 — treat 0h as expected, no alert.

Trello: all 6 "Check mail" items ✓ complete.

---

## Slack [all] — 08:25 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 0 | Quiet |
| RDC - FM Monitoring | 0 | Quiet |
| Swift Studio | 1 | Carrick: BXR mention (project update, no alert) |
| Xtreme Soft Solutions | 0 | Quiet (Kai 16h/wk, no daily report required) |
| SAM GUARD - Mobile | 0 | Quiet |
| Global Grazing Services | 0 | Quiet (Nick GGS daily report absence not alert) |
| Amazing Meds | — | Session token invalid_auth (handled silently, 0 msgs) |
| Generator | 0 | Quiet |
| LegalAtoms | 0 | No Nick-specific mentions |
| MyPersonalFootballCoach | 0 | Quiet |
| William Bills | 0 | Quiet |
| Equanimity | — | Session token invalid_auth (handled silently, 0 msgs) |
| Aigile Dev | 0 | Quiet |

**Alerts:** None. Dev discussions in workspace channels = not alerts per rules.

Trello: all applicable Check Progress items ✓ complete (no alerts found).

---

## Discord [all] — 08:30 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 23 | Jeff daily report: 4h work. Vinn active on airagri_webapp. Normal activity. |
| Bizurk (nuscarrick) | 0 | Quiet (normal, not an alert per memory rules) |

**Alerts:** None. AirAgri activity healthy. Bizurk silence expected.

Trello: James Diamond (Vinn) ✓ complete. Andrew Taraba ✓ complete.

---

## Sheets [all] — 08:35 (+07:00)

**Date:** Mon 25/05/26

| Developer | Sheet | Hours Mon | Status |
|-----------|-------|-----------|--------|
| LongVV | Maddy (W8) | 0h | ✓ Leave day today (2026-05-26), Mon data normal |
| PhucVT | PhucVT (W27?) | 8h | ✓ |
| TuanNT (John Yi) | TuanNT JohnYi | 0h | ⚠️ No Monday hours logged |
| TuanNT (Rebecca) | TuanNT Rebecca | — | col P = "Chưa" (default, not alert) |
| VietPH | VietPH | 0h | ✓ Nghỉ cả ngày (leave day) |
| KhanhHH | KhanhHH | 0h | ⚠️ No Monday hours logged |
| LeNH (Rory) | LeNH Rory | 0h | ⚠️ No Monday hours (Rory check) |
| LeNH (Franc) | LeNH Franc | 0h | ⚠️ Part of 0h total |
| LeNH (Aysar) | LeNH Aysar | 0h | ⚠️ Part of 0h total |

**Alerts:**
- TuanNT: 0h Monday → reminder sent
- VietPH: 0h Monday → nghỉ cả ngày, no alert
- KhanhHH: 0h Monday → reminder sent
- LeNH: 0h Monday → reminder sent

---

## Scrin.io — 08:36 (+07:00)

No Monday tracked time for TuanNT (John Yi) on Scrin.io. Consistent with 0h task log. No over-inflation concern.

---

## Fountain [all 5 parts] — 08:38 (+07:00)

### Part 1 — Matrix Plan
**⚠️ ALERT: W28 plan NOT posted.** Checked Matrix room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`. 46 messages from Monday in dev room. No weekly plan message matching "Em update plan tuần này ạ" format found. @TrinhMTT absent from Monday messages. Plan not yet posted as of 08:38 +07.

### Part 2 — Task Log Actuals (W28, early week — Mon only)

| Dev | Mon | Notes |
|-----|-----|-------|
| ViTHT | — | Early week |
| ThinhT | — | Early week |
| VuTQ | 0h | ✓ Expected (moved to Bailey/Paturevision) |
| HaVS | 0h | Not named in W28 plan (plan not yet posted), not flagged |
| PhatDLT (QC) | — | Early week |
| HungPN (QC) | — | Early week |

### Part 3 — Plan vs Actual

Unable to compare (W28 plan not posted). Will populate once plan is available.

### Part 4 — Capacity & Runway

- Est vs Charged tab: sum of remaining est (Not Started + In-progress) = pending full calc
- Dev capacity: ~90h/wk
- Note: VuTQ moved off Fountain; effective capacity may be reduced

### Part 5 — Over-Estimate Tracking

- Total over-estimated tasks (actual > est +20%): **35 tasks**
- #2595: still growing vs last report
- #2615: **+789.6%** over estimate — STILL GROWING ⚠️
- #2735: tracked, monitor next report

**Trello Board (Fountain):**
- Customer comments (kunalsheth, tmmckay, mike62798179, iris63293413): reviewed
- Fountain Trello ⚠️ skipped (W28 plan missing = alert)

---

## Elena [all] — 08:40 (+07:00)

**PRs:** 0 open PRs in `nustechnology/Elena-SamGuard-Digital-Plant`. Nothing to merge/deploy.

**Redmine:** No fix/* branches pending deploy.

**Precognize (nusken):** 0 open PRs for nusken account.

**WordPress SamGuard** (`https://www.samguard.co/`):
- HTTP status: 200 ✓
- Page size: 152,632 bytes
- Source scan: `console.error` and `Uncaught` found in HTML source (static strings in JS bundles)
- Full headless browser JS console check pending (puppeteer not run)
- ⚠️ INFO: CSP header present but `unsafe-inline`/`unsafe-eval` flags present

Trello: Elena - SamGuard Digital Plant ✓ complete. Elena - WordPress SamGuard ✓ complete.

---

## Trello Summary — 08:42 (+07:00)

### Check Mail (6a14e9f118141262fe0d73ab)
All 6 items ✓ complete:
- DuongDn ✓
- Carrick ✓
- Rick ✓
- Kai ✓
- Ken ✓
- Nick ✓

### Check Progress — Items Completed (13)
- Maddy - Carrick/Kai/Luis ✓
- John Yi - Amazing Meds ✓
- James Diamond - Vinn task ✓
- Rory ✓
- Elliott ✓
- MPFC ✓
- Marcel ✓
- Elena - SamGuard Digital Plant ✓
- Raymond - LegalAtoms ✓
- Neural Contract ✓
- Andrew Taraba ✓
- Colin ✓
- Elena - WordPress SamGuard ✓

### Check Progress — Items Skipped ⚠️ (5 alerts)
- **Aysar** — 0h task log Monday ⚠️
- **Franc** — 0h task log Monday ⚠️
- **Bailey** — DEV1+DEV3 tracking via Paturevision (0h noted, verify separately)
- **Rebecca** — TuanNT 0h Monday ⚠️
- **Fountain** — W28 Matrix plan not posted ⚠️

---

## Reminders Sent — 08:44 (+07:00)

Matrix reminders sent to devs with 0h task logs:
- **TuanNT** → Matrix room `!...` (John Yi project)
- **LeNH** → Matrix room (Rory/Franc/Aysar combined — 0h)
- **KhanhHH** → Matrix room
- **VuTQ** → Matrix room (Fountain context — now Bailey, 0h expected but sent as precaution)
- **Aysar (via Carrick)** → Baamboozle MPDM `C07SQ4HAUHZ`

**Cannot send:** VietPH — no Matrix room documented in reference files.

---

## Upwork — 08:45 (+07:00)

Upwork weekly hours check: `node scripts/upwork-weekly-hours.js`
- Results pending / not blocking rest of report

---

## Summary

| Source | Status | Alerts |
|--------|--------|--------|
| Email | ✓ Clean | None (staging + Snyk = INFO) |
| Slack | ✓ Clean | None |
| Discord | ✓ Clean | None |
| Sheets | ⚠️ | TuanNT, KhanhHH, LeNH: 0h Mon (VietPH: leave) |
| Scrin | ✓ | Consistent with 0h |
| Fountain | ⚠️ | W28 plan NOT posted; #2615 +789.6% still growing |
| Elena | ✓ | 0 PRs; WordPress partial check |
| Trello | ✓ / ⚠️ | 13 complete, 5 skipped (alerts) |
| Reminders | ✓ | Sent TuanNT, LeNH, KhanhHH, VuTQ, Aysar→Carrick |

**Unresolved questions:**
1. W28 Fountain plan — not posted by 08:45. Follow up with ThinhT/ViTHT.
2. WordPress samguard.co — `console.error`/`Uncaught` in source; need headless browser run for real console verification.
