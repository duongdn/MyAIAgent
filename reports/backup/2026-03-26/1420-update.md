# Update Report — 2026-03-26 14:20

**Window:** 2026-03-26 10:56 → 14:20 (Saigon)

---

## New Alerts

| # | Severity | Source | Summary |
|---|----------|--------|---------|
| 1 | MEDIUM | Slack/WilliamBills | **Malware back on Maxwell** — "leaked prettykatty9" linking to lacult.org. Oliver flagged 12:19, Lucas investigating |
| 2 | INFO | Email/rick | FountainStaging ArgumentError in EmailWorker (BugSnag 14:03) — staging only, new error type |
| 3 | INFO | Email/duongdn | DatNC leave request Fri 27/03 — already approved by BinhNT |

---

## Resolved Since Last Update

| Item | Status |
|------|--------|
| Generator serenitypines bug | ✅ **FIXED** — Carrick MR #309 merged 13:38, Rudi confirmed "looks good thanks" 14:16 |
| GGS print button | ✅ **DONE** — Amy confirmed print button + permission tree update complete 11:13 |

---

## Source Summary

| Source | Status | New Since 10:56 |
|--------|--------|-----------------|
| Slack (14 ws) | OK | 39 msgs across 6 ws — see below |
| Discord/AirAgri | ACTIVE | 33 msgs — weather knots→km/h fix in progress |
| Email (6) | OK | 4 emails — DatNC leave + FountainStaging BugSnag |
| Google Sheets | OK | VietPH 3.5h, KhanhHH 3.75h in-progress; others 0h (normal at 14:20) |
| Fountain Trello | OK | 0 new customer comments |
| Matrix/Fountain | OK | 0 new messages |
| GitHub | OK | No new PRs |

---

## Slack Highlights

**Swift Studio** (15 msgs, #bxr__app):
- Rory testing BXR app — found phone verification issue (number already registered shows error immediately)
- Jeff: adding escape/logout from verify popup + showing logged-in email + updating login page image
- Rory: "You can push straight to live" [13:46] — Jeff submitting new version 13:48

**Generator** (7 msgs, #triage):
- Carrick fixed post-release bug via MR #309 [13:38] — Rudi confirmed ✓ [14:16]
- Rudi [11:17] asking Violet to assign Jeff a Trello task (mobile)
- Rudi [12:05] asking Carrick to review another MR

**William Bills** (7 msgs):
- Oliver [12:19]: **"malware is back — 'leaked prettykatty9' linking to lacult.org"** — same malware as before
- Oliver [12:19]: Also asked Lucas to remove it + give timeframe for fresh site rebuild
- Lucas [13:22–14:19]: investigating, checking for unusual activity

**Xtreme Soft** (9 msgs):
- Kai + Anomawasala discussing SKU/template issues on rms4 (TEST/DONTUSE items to ignore)
- Normal dev coordination

**Global Grazing** (2 msgs):
- Amy [11:13]: Print button on product page ✅ + permission tree update ✅ both done. CSS selector already on Live.

**SAM GUARD** (1 msg):
- Kirk [11:11]: Asking Kfir to review Precognize PR #4798

---

## Discord — AirAgri (33 msgs, 10:56–14:21)

**#airagri-flutter:**
- Jeff [11:07–11:45]: iOS Check-in app submitted for App Store review ✅
- dapackage [11:40]: Incident submission working on production ✅
- James Diamond [13:34–13:51]: Requesting SafeFarm map pin icon updates

**#airagri_webapp:**
- **Weather knots→km/h double conversion bug** (major thread):
  - Vinn [14:02]: spotted double conversion in `airagri-backend/config/params.php`
  - dapackage [14:12]: confirmed + fixed, pushed to hotfix branches
  - Vinn [14:14]: reviewing, found issue where fix auto-merged into staging — confused
  - dapackage [14:17]: clarified what was pushed
  - bellatric02/Mary [14:03]: km/h fix needed on **both web AND mobile**
- Vinn has PR #272 review comments for dapackage to check

---

## Google Docs (14:20)

| Developer | Today (Thu 26/03) | Note |
|-----------|-------------------|------|
| VietPH | 3.5h (in progress) | Doofinder carousel + product quantity |
| KhanhHH | 3.75h (in progress) | Generator DOB + Activity Log bugs |
| LongVV | 0h (—) | Remote today, not yet logged |
| PhucVT | 0h (—) | Not yet logged |
| LeNH | 0h (—) | Not yet logged |
| TuanNT | 0h (—) | Returning from leave today? |
| Fountain team | 0h (—) | Not yet logged for today |

---

## Open Items Carried Forward

1. **William Bills malware** — Lucas investigating. Same recurrence pattern as before — site may need full rebuild per Oliver.
2. **Equanimity face scan** — Fix pushed (10:48 update), no client response yet.
3. **AirAgri weather conversion** — dapackage fixed double conversion, but Vinn noted unexpected staging auto-merge. Resolution pending.
4. **Fountain team 0h entire week** (ViTHT, HungPN, TrinhMTT) — still unresolved from morning.
5. **FountainGifts DB connection refused** (CRITICAL from morning) — no new Rollbar alerts since; likely recovered but not confirmed.
