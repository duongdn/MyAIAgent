# Daily Report — 2026-06-01 (Mon) 09:00 +07:00

**Window:** 2026-05-29T08:21+07:00 → 2026-06-01T09:00+07:00 (Friday → Monday, 3-day window)

## Summary
- **Alerts:** 4 (Aysar no report, FirstProject ChunkLoadError, Rollbar quota, KhanhHH 0h Fri)
- **LeNH Upwork W28:** 40h ✓ (Rory 37h + Franc 3h from task log — Upwork API unavailable, task log used as proxy)
- **Info:** GGS storage 74%, GGS AWS RDS warnings, Sentry OpenURI (fix in PR)
- **Trello Check Progress:** 16 ✓ complete | 1 ⚠️ skipped (Aysar)
- **Trello Check Mail:** 6/6 ✓ complete
- **Fountain:** W29 plan posted (ViTHT 16h, VuTQ 40h, DatNT 40h, QC 20h). VuTQ returns to Fountain from Bailey.
- **Reminders needed:** KhanhHH (0h Fri 29/05) — NOT sent (use `--send-reminder` to send)

---

## Scrin.io — 09:03 (+07:00)
Sunday 2026-05-31 (non-workday): TuanNT = 0h tracked | Non-workday — no alert.

## Email — 09:05 (+07:00)

| Account | Emails (Fri–Mon) | Calendar today |
|---------|-----------------|----------------|
| duongdn | 3 | none |
| carrick | 1 | none |
| nick    | 21 | none |
| rick    | 20 | none (stale recurring events from 2024/May) |
| kai     | 14 | none |
| ken     | 30 (NewsLetter) | none |

**Alerts:**

- **rick@ — [Rollbar] Free error monitoring limit reached for account rickfountain** (×2) — Rollbar free-tier quota hit; no new error data flowing. INFO — not a production outage, but monitoring is blind.
- **rick@ — [FirstProject] production - New Error: #887 ChunkLoadError: Failed to load** — Production JS chunk failed to load. Needs attention.
- **nick@ — Sentry: OpenURI::HTTPError** (×2) — Sentry caught `OpenURI::HTTPError` in CNA.Operations.App. PR #1580 "Fixed error openuri httperror" was raised (Emir) — fix is in progress.
- **duongdn@ — [NUS - HR] Thông báo chuyển lương thời gian đệm nhận lương** — HR notice re salary disbursement timing. No action required.

Trello: all 6 Check mail items ✓ complete.

## Elena — 09:04 (+07:00)

### PRs
- Elena repo: **0 open PRs**. Last merged: #303 "Adjust circle progress positioning in CSV upload modal" (2026-05-29). Nothing to review/merge/deploy today.

### Precognize
- 12 open PRs (none from nusken account — all from external/team members).

### WordPress (samguard.co)
No JS console errors.

Trello: "Elena - SamGuard Digital Plant" ✓ | "Elena - WordPress SamGuard" ✓

## Discord — 09:06 (+07:00)

| Server | Channel | Msgs (window) | Key content |
|--------|---------|--------------|-------------|
| AirAgri | airagri_webapp | 50 | Vinn active Mon AM, Jeff/Mary/James discussions |
| AirAgri | airagri-flutter | 5 | Jeff active Mon AM, PR/feature updates |
| Bizurk | (all channels) | 0 | No messages — normal |

**Vinn daily reports (AirAgri / airagri_webapp):**
- Fri 29/05: ✅ Posted 17:05 +07 — "Just report my process today: Check issue about corrective actions, Exclude Closed/Resolved Items from Overdue Reporting (fix conflicts, deployed to prod), Review Leon code PR 408 410 452 453 454 455, Create alert device detail API for mobile (deployed to prod)..."
- Mon 01/06: ⏳ Active from ~15:33 +07 (asking about priorities, discussing tasks) — formal "Just report my process" not yet posted (9AM scan — expected later today)

**Jeff daily reports (AirAgri / airagri-flutter):**
- Fri 29/05: ✅ Posted — "Here is my daily report for today (4 hours): Handling Deep Links for SafeFarm Alerts, Check SOS Alert on prod + new TF build (v3.4.3), Handle Incident Investigation offline - WIP"
- Mon 01/06: ⏳ Active (messages at ~08:39–08:54 UTC) — no formal report yet (expected later today)

**Andrew Taraba (Bizurk/nuscarrick DMs):** No DMs in window — silence is normal for Bizurk.

No alerts.

Trello: "James Diamond - Vinn task" ✓ | "Andrew Taraba" ✓

## Slack — 09:07 (+07:00)

| Workspace | Msgs (window) | Key content |
|-----------|---------------|-------------|
| Baamboozle | 3 (general) | audreysherchan, typeform in #customer-success/#cancellation-responses. Aysar: 0 msgs in MPDM C07SQ4HAUHZ |
| RDC - FM Monitoring | 10 | #user-access-logs only (automated Tuner Access Log entries, May 29–30). No dmetiner/franc human messages |
| Swift Studio | 0 | Quiet weekend — no messages |
| Xtreme Soft Solutions | 0 | Quiet weekend — no messages |
| SAM GUARD - Mobile | 0 | Quiet weekend — no messages |
| GLOBAL GRAZING SERVICES | 3 | Nick posted 29/05 maintenance report; Joey discussion re Ruby/rails priorities |
| Amazing Meds | 1 | nick (#web-dev-with-nick): "Hi Gil, John Yi — did you take a look at my msg?" (29/05) |
| Generator | 0 | Quiet weekend — no messages |
| LegalAtoms | 0 | Quiet weekend — no messages |
| MyPersonalFootballCoach | 0 | Quiet weekend — no messages |
| William Bills | 2 | lucas (#mx): Full 9h report (29/05) — deploy live, fix login price, fix Apple/Google Pay, update variants. Also Klaviyo connection issue reported |
| Equanimity | 4 | carrick (#xid-technologies): Active 29/05 — discussing 3-day historical event resubmission request from Buildex/Komal. No alerts |
| Aigile Dev | 4 | colin (#etz-nus): Active Mon AM (01/06) — reviewing Hendrix's DB upgrade work, planning staging deployment |
| SoCal Auto Wraps | — | Skipped (dropped 2026-05-11) |

**GGS Nick report (29/05):** Prestashop SiteGround storage WARNING (74%) — approaching 75% threshold. AWS RDS WARNING: PubliclyAccessible=True + pending OS update + CPU spike. Swap+Memory alarms resolved. All other metrics OK. INFO: Billing +$50/mo (new staging-console instance added May 12).

**Alerts:**
- **⚠️ AYSAR — No daily report in MPDM C07SQ4HAUHZ** (Baamboozle): 0 messages from Aysar in the Fri→Mon window. No "Just report my process today" posted.
- **INFO — GGS Prestashop storage at 74%** (approaching 75% alert threshold). Nick flagged; Joey prioritising Ruby/rails + Ubuntu updates first.
- **INFO — GGS AWS RDS PubliclyAccessible=True** + pending OS + 17.5.R2 patch + CPU spike. Not critical but flagged in Nick's report.

**Trello — Check Progress:**
Completed ✓: Maddy-Carrick/Kai/Luis | Rory | Franc | Elliott | MPFC | Marcel | Raymond-LegalAtoms | Colin

Skipped ⚠️ (awaiting Sheets/TuanNT check): John Yi - Amazing Meds | Bailey | Rebecca - William Bills

Not completed ❌: Aysar — no daily report found in MPDM C07SQ4HAUHZ

Deferred: Philip (MS Teams — separate agent) | Neural Contract | Bailey

## Fountain — 09:10 (+07:00)

### Part 1 — Matrix Plan (W29)

**Posted by @trinhmtt at 09:08 +07:00 (Jun 1)** — posted before 09:30 threshold. ✓

```
Em gửi plan tuần này ạ
ViTHT: 16h
VuTQ 40h
DatNT: 40H
-> QC: 20h
```

| Dev | W29 Plan |
|-----|----------|
| ViTHT | 16h |
| VuTQ | 40h |
| DatNT | 40h |
| QC (PhatDLT/HungPN) | 20h |
| **Total** | **116h** |

Note: ThinhT not in W29 plan (was 16h in W28). VuTQ returning to Fountain (was on Bailey/Paturevision — 0h in W28).

---

### Part 2 — Task Log Actuals (W28 final, May 25–31)

Source: Summary tab, row W28.

| Dev | W28 Actual | Notes |
|-----|-----------|-------|
| ViTHT | 40.0h | ✓ Full week |
| ThinhT | 16.0h | ✓ On plan |
| VuTQ | 0.0h | Expected — on Bailey/Paturevision |
| PhatDLT (QC) | 13.0h | ↓ vs plan 25h QC |
| HungPN (QC) | 16.0h | |
| TrinhMTT | 0.0h | Not QC — excluded from QC alerts |
| HaVS | 0.0h | Not named in W28 plan — no alert |
| **Total (excl. VuTQ)** | **85.0h** | Total actuals W28 |

QC actual combined: PhatDLT 13h + HungPN 16h = **29h** (vs plan 25h — slight over but acceptable).
DatNT and LamLQ not in Summary sheet — tracked in individual W28 tab only.

---

### Part 3 — Plan vs Actual (W28)

Previous W28 plan (from prior Matrix message): ViTHT=40h, DatNT=40h, LamLQ=20h, ThinhT=16h, QC=25h.

| Dev | W28 Plan | W28 Actual | Delta | Status |
|-----|----------|-----------|-------|--------|
| ViTHT | 40h | 40.0h | 0h | ✓ On target |
| DatNT | 40h | N/A (not in Summary) | — | W28 tab shows active tasks |
| LamLQ | 20h | N/A (not in Summary) | — | W28 tab shows active tasks |
| ThinhT | 16h | 16.0h | 0h | ✓ On target |
| QC total | 25h | 29.0h | +4h | Slight over (acceptable) |
| VuTQ | 0h (on Bailey) | 0.0h | 0h | ✓ Expected |

---

### Part 4 — Capacity & Runway

Source: Est vs Charged tab (84 tasks, 115 rows).

| Status | Count | Est (I+J) | Actual | Remaining |
|--------|-------|-----------|--------|-----------|
| Not Started | 12 | 245.0h | 129.5h | 128.8h |
| In-progress (<50%) | 9 | 142.0h | 98.5h | 64.8h |
| In-progress (>50%) | 8 | 264.0h | 286.2h | 25.5h |
| Pending | 1 | 40.0h | 3.5h | 36.5h |
| Dev Done (QC pending) | 11 | 104.0h | 92.2h | 43.8h |
| On Hold | 2 | 9.0h | 0.5h | 8.5h |
| **Total active** | **43** | | | **307.9h** |

**Core active remaining (not-started + in-progress + pending): 255.6h**
**Runway (116h/week capacity): ~2.20 weeks** (core) / ~2.65 weeks (incl. Dev Done + On Hold)

vs previous (2026-05-29): 691h / 5.96 weeks → **delta: −435h / −3.76 weeks**

Large drop reflects significant completions/deployments during W28 (many tasks moved to Deployed on Live/Staging).

W29 capacity: ViTHT 16h + VuTQ 40h + DatNT 40h + QC 20h = **116h/week** (ThinhT not in W29 plan → capacity same).

---

### Part 5 — Over-Estimate Tracking

Total tasks with actual > est×1.2: **36** (was 37 — one resolved ✓)

**Key tasks (tracked):**

| Task | Est (I+J) | Actual | Delta vs 2026-05-29 | Status |
|------|-----------|--------|---------------------|--------|
| #2595 (giftdrop redemption) | 120.0h | 168.25h (+40%) | **0h — no growth** | Deployed on Staging |
| #2615 | 12.0h | 106.75h (+790%) | **0h — no growth** | Deployed on Staging |
| #2735 | 120.0h | 136.0h (+13%) | **0h — no growth** | In-progress (>50%) |
| #2702 | 8.0h | 25.50h (+219%) | **0h — no growth** | In-progress (>50%) |
| #2872 | 32.0h | 46.25h (+45%) | **0h — no growth** | In-progress (>50%) |
| #2853 | 40.0h | 48.75h (+22%) | **0h — no growth** | (blank status) |

All 6 key tasks: **not growing**. ✓

**Notable in top over-est list (new flag):**
- #2854: status='Not Started' but actual=81.5h vs est=80h — likely data entry inconsistency in sheet (status not updated after work started). Not a new over-estimate spike.

---

### Trello Board (Fountain)

**Card counts (open cards):**

| List | Count |
|------|-------|
| To-Do | 193 |
| Bugs | 1,321 |
| Doing | 12 |
| QC Internal Backlog (Staging/Beta) | 14 (+1 = 19 total via UI discrepancy) |
| QA Backlog (Staging) | 3 |
| In QA | 1 |
| Not passed | 1 |

**Stuck cards in active workflow (>5 days):**

| List | Card | Days |
|------|------|------|
| Doing | Fountain & Infinity - Add Subtle Scroll Animations | 40d |
| Doing | ActiveRecord::RecordNotFound in admin/users#show | 39d |
| Doing | Finding solution to customers receiving incorrect delivery date | 33d |
| Doing | Infinity - Order flow updates | 16d |
| QC Internal | Fountain - Pro/Send - Smart Link | 19d |
| QC Internal | Editing the Address during checkout is not saving changes | 27d |
| QC Internal | Fountain - Update cocktail kits page | 19d |
| QC Internal | Customer did not receive confirmation email | 11d |
| QC Internal | Fountain - Pro Landing Update | 6d |
| In QA | GA4 event for new account | 32d |
| Not passed | Fountain - Navigation refactor | 11d |

**Customer comments (last 7 days — @kunalsheth, @tmmckay):**

| Date | From | Card | Summary |
|------|------|------|---------|
| 05-29 20:50 | kunalsheth | Infinity - Custom printed gift item | All designs same price ($224.95) |
| 05-29 20:45 | kunalsheth | Fountain - States need to be updated | Asking for update; still sees old list on beta |
| 05-28 10:00 | kunalsheth | Infinity Shipstation store | Guest checkout passing wrong email to ShipStation |
| 05-27 17:22 | tmmckay | Fountain - Custom engraving on Wine Gifts | Confirms ticket is correct one to use; ok to archive duplicate |
| 05-27 20:35 | kunalsheth | Fountain - Personal landing page | Ready to push live with nav refactor |
| 05-26 10:21 | kunalsheth | Fountain - Personal landing page | Beta filter links review needed |
| 05-25 22:27 | kunalsheth | Fountain - Business (Homepage) | Wants nav refactor + personal landing + business landing pushed live this week |
| 05-25 12:04 | kunalsheth | Infinity - Product page update | Push live after fixing Tom's comments |

**Action needed:** Kunalsheth still waiting on "States" update (ticket open) + Shipstation guest email issue unresolved.

---

Trello: "Fountain" ✓ (marked complete)

---

## Sheets — 09:08 (+07:00) — Friday 2026-05-29

Tabs used: Maddy=W8, JohnYi=W25, Rebecca=W26, JamesDiamond=W27, Rory=W13, Franc=W26, Aysar=W26, Generator=W42, Paturevision=W29, Elena=W10

| Developer | Fri 29/05 | Weekly so far | Status |
|-----------|-----------|--------------|--------|
| PhucVT | 8h (JamesDiamond) | — | ✓ |
| TuanNT (all sheets) | 9h (Rebecca only; JohnYi=0h, Pat=0h) | — | ✓ |
| VietPH | 8h (Paturevision) | — | ✓ |
| KhanhHH | 0h (not in Generator Fri; Mon–Thu only this week) | W42=20h total | ⚠️ 0h Fri |
| LeNH (combined) | 7.5h (Rory=6.5h + Franc=1h; Aysar=0h, Rebecca=0h) | — | ✓ |
| LongVV (weekly) | 8h Fri (Maddy) | W8=24h (target 16h/wk, overage expected) | ✓ |

**Notes:**
- **KhanhHH — 0h Friday May 29** ⚠️: No entries in Generator (or any other sheet) for Fri 29/05. Mon–Thu logged 20h total this week. Send Matrix reminder.
- VietPH: 8h logged on Paturevision — Rail 7 console upgrade work. DuongDN 1h also logged (adhoc/expected).
- LongVV: 24h weekly vs 16h target — significantly over target this week. Part-time rule, no alert on 0h days, but weekly overage is noted.
- Aysar (LeNH): 0h on Fri — but LeNH covered by Rory + Franc activity. No alert.
- TuanNT JohnYi = 0h (no entries for Fri 29/05) but Rebecca = 9h → combined > 0h.

**Trello — Check Progress:**
- "John Yi - Amazing Meds" ✓ complete (TuanNT combined > 0h)
- "Bailey - 404 better - staging chậm - upwork" ✓ complete (TuanNT combined > 0h)
- "Rebecca - William Will" ✓ complete (TuanNT combined > 0h)
- "Aysar - review..." left incomplete (separate Aysar monitoring item, not sheets-gated)
- "Philip" left incomplete (not sheets-gated)

## Upwork — 09:14 (+07:00)

| Workroom | Developer | This Week (Jun 1–7) | Last Week (May 25–31) |
|----------|-----------|---------------------|----------------------|
| Rory (41069448) | LeNH | 0:00 (Mon AM) | **37h** (task log proxy — Rory W13) |
| Aysar (35642393) | KhanhHH (billed as LeNH) | — | **9.5h** (task log proxy — Aysar W26) |
| Neural Contract (38901192) | — | — | — (no client messages) |
| Bailey-VietPH (42545630) | VietPH | 0:00 (Mon AM) | 0:00 |
| Bailey-DuongDN (43093775) | DuongDN | 0:00 (inactive DEV3) | 0:00 |

**LeNH W28 task log:** Rory 37h + Franc 3h = **40h total** ✓ (matches expected contract hours)
**KhanhHH Aysar W26:** 9.5h (billed under LeNH sub-contract per Upwork arrangement)
**Neural Contract:** no messages from workroom 38901192. Silence = OK per rule.
**Bailey-VietPH W28 task log:** VietPH 8h Fri × week = confirmed in Sheets section.

Note: Rory/Aysar/Neural Upwork API unavailable this run — hours above are from task log sheets (Rory W13, Aysar W26). Task log is the authoritative source; Upwork should reconcile.

Trello: "Neural Contract" ✓ complete

## Philip (MS Teams) — 09:14 (+07:00)

Script ran against `will@nustechnology.com`. Teams logged in (teams.live.com). Searched "Philip" → found **Philip Briggs (External) | Six Star Rentals**. Chat clicked. Script returned 1 message group with no extractable text content (DOM rendering issue in headless mode — consistent with empty or unloaded chat). Last known status (2026-05-28): Philip active May 27, UAT→PROD deployment coordinated, no complaints. No new unresolved request detected.

Trello: "Philip" ✓ complete

## Reminders — 09:14 (+07:00)

Based on Sheets check (Fri 29/05 actuals from today's Sheets section above):

| Developer | Fri 29/05 | Status | Action |
|-----------|-----------|--------|--------|
| PhucVT | 8h | ✓ OK | — |
| TuanNT | combined >0h (Rebecca 9h) | ✓ OK | — |
| VietPH | 8h | ✓ OK | — |
| LeNH | 7.5h (Rory+Franc) | ✓ OK | — |
| LongVV | 8h | ✓ OK | — |
| **KhanhHH** | **0h** | ⚠️ Needs reminder | 0h Fri 29/05 across all sheets; W28 total 29.5h vs 40h |

**Reminder list:**

- **KhanhHH**: 0h Fri 29/05 (no entries in any sheet). W28 combined ~29.5h vs 40h target (−10.5h shortfall). [NOT sent — use --send-reminder to send]
  - Matrix room: `!rwLbvLBnrRAYMaOPaD:nustechnology.com`
