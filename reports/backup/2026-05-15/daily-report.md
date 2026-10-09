# Daily Report — Friday, 2026-05-15

**Generated:** 08:45 +07:00  
**Window:** 2026-05-14 09:55 → 2026-05-15 08:30 (+07:00)  
**Prev report:** [2026-05-14](../2026-05-14/daily-report.md)

---

## Summary

| Source | Status | Alerts |
|--------|--------|--------|
| Email | ✓ | DatNC leave today (Fri), FountainStaging DB error (staging only) |
| Slack | ✓ | William Bills hours dispute (monitoring), Amazing Meds 0 msgs |
| Discord | ✓ | Vinn + Jeff daily reports present |
| Sheets | ✓ | VuTQ 0h Thu, KhanhHH 6.17h Thu, LeNH 0h Thu |
| Scrin | INFO | No data for Thu (TuanNT not tracked via Scrin) |
| Upwork | ✓ | LeNH Rory 26.5h/wk, Aysar 7.67h/wk, VietPH 14h/wk |
| Fountain | ⚠️ | HungPN 0h W26, production email bug, DatNT behind |
| Elena | ✓ | PR #301 merged + deployed |
| Trello Mail | ✓ | All 6 items complete |
| Trello Progress | ✓ | 17 items complete, 2 pending (Franc, Fountain) |
| Reminders | ✓ | Sent to LeNH, VuTQ, KhanhHH |

---

## Piece 1 — Email — 08:35 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn | 2 | DatNC leave request for Fri 15/05/2026 (approved by BinhNT) |
| carrick | 1 | Snyk vulnerability alert for `marcel` org (not Redmine, not monitored) |
| nick | 15 | candasurveyors.com.au daily task completions (x14), Stripe activation notice |
| rick | 7 | Rollbar daily summaries (InfinityRoses ×2, FirstProject ×2, FountainGifts ×2), BugSnag FountainStaging |
| kai | 3 | Upwork DM (Jacob R.), Jira LIFM2-439 + LIFM2-437 (Anoma Wasala/Madhuraka) |
| ken | 253 | NewsLetter: Precognize PRs #4914 #4916 #4918 #4919 #4922, Welligence, amocc-material |

**Alerts:**
- ⚠️ **DatNC on leave today (Fri 05/15)** — leave request submitted Thu 16:29, approved by BinhNT 19:33
- ℹ️ **[FountainStaging] PG::UndefinedColumn in orders#index** (BugSnag, 15:21 Thu) — **STAGING/development only**, not production. No production alert.
- ℹ️ Rollbar daily summaries (InfinityRoses, FirstProject, FountainGifts) — routine digests, no individual crashes
- ℹ️ Kai Jira: LIFM2-437 (date filtering) + LIFM2-439 (Listed-Cons tab) — routine Madhuraka task updates

**Trello:** All 6 Check Mail items ✓ complete

---

## Piece 2 — Slack — 08:37 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 | Carrick: fixed session redirect (PR #609, bbzl-web-client #36), Vite migration PR #606; Aysar reviewing #607 |
| RDC - FM Monitoring | 10 | Automated tuner instability/recovery alerts only; no dmetiner activity |
| Swift Studio | 58 | Carrick: Peak Week Challenge API (3 endpoints) + staging deploy; Rory BXR coordination |
| Xtreme Soft Solutions | 44 | Kai daily progress report ✓ (LIFM2-409/437/439/434/428); anoma template testing |
| SAM GUARD - Mobile | 20 | Automated HubSpot MQL leads (11); no Elena/DP human activity |
| Global Grazing Services | 2 | Nick: Mailgun reconfig + test email sent ✓ |
| Amazing Meds | 0 | No activity (TuanNT/John Yi not visible) |
| Generator | 52 | Elliott: coordinating deploys; Carrick: DNS/SSL staging for brookland.cms; Violet flagged Jeff mobile running out of tasks |
| LegalAtoms | 1 | #general: one mention, no Raymond/Nick-specific activity |
| MyPersonalFootballCoach | 4 | Task completion confirmations; routine |
| William Bills | 21 | Lucas 31h vs 10h estimate dispute (anhnvn + Oliver mediating); Lucas daily report in #mx ✓ |
| Equanimity | 5 | Carrick: file formatting for Komal (Xid Technologies); no Marcel activity |
| Aigile Dev | 4 | Carrick + Colin: DB cleanup plan agreed; newsletter alert |

**Notes:**
- ℹ️ **Amazing Meds 0 msgs** — TuanNT/John Yi not active on Slack; TuanNT sheets confirm 8h in Rebecca. Lead dev = Nick (active in GGS). No block.
- ℹ️ **William Bills hours dispute** — Lucas logged 31h vs 10h estimate on payment page without scope flag. Client/Oliver resolving. NOT a NUS dev issue.
- ℹ️ **Generator: Jeff mobile dev running out of tasks** — Violet alerted, Elliott/Carrick aware. Monitoring.
- ℹ️ **Twilio OTP spike** in Swift Studio (IP 118.69.244.93, Vietnamese number) — automated system alert, Rory's BXR app, not our server issue.

---

## Piece 3 — Discord — 08:35 (+07:00)

| Server | Channel | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | airagri_webapp | 51 | Vinn daily report ✓ (10:33 +07); NEYOS webhook investigation; PR #404 review |
| AirAgri | airagri-flutter | 6 | Jeff (jeff_trinh) daily report ✓ (10:39 +07, 4h): assign-user-to-file, iOS TF 3.4.3 |
| Bizurk | All channels | 0 | No messages (normal) |
| Bizurk | Andrew DM | 0 | No Andrew messages (normal, silence expected) |

**Alerts:** None

---

## Piece 4 — Google Sheets — 08:38 (+07:00)

**Target:** Thursday 2026-05-14 | Current week: W starting Mon 11/05

| Developer | Thu 05/14 | Weekly (Mon–Thu) | Status |
|-----------|-----------|-----------------|--------|
| LongVV | 8.00h (Maddy) | 16.00h | ✓ Part-time 16h/wk target met |
| PhucVT | 8.00h (JamesDiamond) | — | ✓ |
| TuanNT | 8.00h (Rebecca) + 0h (JohnYi) = 8h combined | 32h | ✓ |
| VietPH | 8.00h (Paturevision) | 14h (Upwork) | ✓ |
| **VuTQ** | **0.00h** | — | ⚠️ **ALERT — 0h Thu, no leave note (Bailey/Paturevision)** |
| **KhanhHH** | **6.17h** (Aysar only) | 17.84h (Aysar) | ⚠️ **ALERT — 1.83h short, no leave note** |
| **LeNH** | **0.00h** (all sheets) | Rory 35h+, Franc 6h | ⚠️ **ALERT — 0h Thu all sheets; Upwork Rory shows 7.5h tracked** |

**Upwork cross-check:**
| Tracker | Upwork this week | Upwork Thu | Task log match |
|---------|-----------------|------------|----------------|
| Rory (LeNH) | 26.5h | 7.5h | Sheets 0h — task log missing (work confirmed via Upwork) |
| Aysar (KhanhHH+LeNH) | 7.67h | 0h | KhanhHH 6.17h in sheets Thu (discrepancy) |
| Bailey-VietPH | 14.0h | 0h | Sheets 8h Thu (different task may be tracked) |
| Bailey-DuongDN | 0h | 0h | ✓ Inactive as expected |
| Neural Contract | 0h | 0h | ✓ Silence normal |

**Baamboozle GitHub (Aysar):**
- baamboozle-web-app: 6 open issues (#559 discount %, #606 Vite migration, #596 tech upgrade, #533 team ownership, #600 profanity filter, #599 admin tool). No HIGH-severity blocking issues.
- bbzl-web-client: 0 open issues ✓

---

## Piece 5 — Scrin.io — 08:30 (+07:00)

**Result:** Empty body — no TuanNT Scrin tracking data for Thu 2026-05-14. INFO only (TuanNT confirmed 8h in Rebecca sheet).

---

## Piece 6 — Upwork — 08:30 (+07:00)

| Workroom | Developer | This week | Last week | Thu |
|----------|-----------|-----------|-----------|-----|
| Rory (41069448) | LeNH | **26.5h** | 16.67h | 7.5h |
| Neural Contract (38901192) | external | 0h | 0h | 0h |
| Aysar (35642393) | LeNH+KhanhHH | 7.67h | 23.83h | 0h |
| Bailey-VietPH (42545630) | VietPH | 14.0h | 21.5h | 0h |
| Bailey-DuongDN (43093775) | DuongDN | 0h | 0h | 0h |

**Neural Contract Upwork messages:** Last message = holiday reminder (late Apr/early May). No urgent unanswered client messages. ✓ → Neural Trello item completed.

---

## Piece 7 — Elena — 08:42 (+07:00)

| Check | Result |
|-------|--------|
| Open PRs | 1 found: PR #301 (DP-666-create-and-manage-autoscan) |
| CodeRabbit review | Clean — CHILL mode, no high-risk flags |
| Merge | ✓ Squash merged to `process-digital-plant` |
| Deploy (MayBanServer) | ✓ `ea61340e2f` pulled, `ng build` succeeded (21.2s) |
| Matrix announcement | ✓ Sent to Elena - Digital Plant room |
| Redmine | N/A (DP- prefix, not Redmine ticket) |
| WordPress samguard.co | ✓ HTTP 200, CSP headers present, no JS errors |
| Precognize (nusken) | 0 open nusken PRs |

---

## Piece 8 — Fountain — 08:50 (+07:00)

### Part 1 — Matrix Plan
Plan posted by @trinhmtt, Mon 2026-05-11 09:03 +07:
```
ViTHT: 40h | ThinhT: 20h | DatNT: 40h | LamLQ: 20h → QC: 26h
```
VuTQ not in plan — correct (moved to Bailey 2026-05-13). Matrix token refreshed via `matrix-token-refresh.js`.

### Part 2 — Task Log Actuals (W26: May 11-17)

| Dev | Plan | W26 Actual (Mon–Thu) | % of Plan |
|-----|-----:|---------------------:|----------:|
| ViTHT | 40h | 32h | 80% (on track) |
| ThinhT | 20h | 16h | 80% (on track) |
| VuTQ | 0h | 0h | ✓ (moved to Bailey) |
| DatNT | 40h | 16h | 40% ⚠️ behind |
| LamLQ | 20h | 9.25h | 46% ⚠️ behind |
| PhatDLT (QC) | ~13h | 8h | on pace |
| **HungPN (QC)** | **~13h** | **0h** | ⚠️ **ALERT — 0h all 4 days W26** |

### Part 3 — Plan vs Actual

| Dev | Plan | Actual | Expected @ 4d | Delta |
|-----|-----:|-------:|--------------:|------:|
| ViTHT | 40h | 32h | 32h | 0 ✓ |
| ThinhT | 20h | 16h | 16h | 0 ✓ |
| DatNT | 40h | 16h | 32h | **-16h** |
| LamLQ | 20h | 9.25h | 16h | **-6.75h** |
| HungPN | ~13h | 0h | ~10.4h | **-10.4h** |

### Part 4 — Capacity & Runway

| Metric | Value |
|--------|-------|
| Remaining est+CR | **667h** (new tickets added this week: #2869 80h, #2854 60h+20CR) |
| Runway @ 90h/wk | 7.4 weeks |
| Runway @ 60h/wk (2 devs, VuTQ moved) | 11.1 weeks |

Note: Large jump from yesterday (338h → 667h) due to new large tickets added/activated this week, not regression.

### Part 5 — Over-Estimate Tracking

| Task | Est+CR | Actual | Ratio | Trend |
|------|-------:|-------:|------:|-------|
| #2595 GiftDrop New Flow | 120h | 168.25h | 140% | **Stable** |
| #2615 Gift of Choice | 12h | 106.75h | 890% | **Stable** |
| #2735 Pro Smart Link | 120h | 131.5h | 110% | **Stable** |

All 3 watch tasks: no new hours in W26 — stable.

### Trello Board (Web Development `5475eaf923a9a1309357eb51`)

| List | Cards |
|------|------:|
| Todo | 30 |
| Bugs | 23 |
| Doing | 10 |
| QC Internal | 6 |
| In QA | 2 |
| Not Passed | 3 |

**Customer comments (May 12–14, 19 total):**
- **mike62798179 (May 12):** Customers not receiving confirmation emails — specific order IDs provided. **⚠️ Production bug**
- **kunalsheth (May 13–14):** Grey out unavailable box band; Sanity CMS blog redesign request; Unlimited scroll bug on card page; Gift attributes cleanup
- **tmmckay (May 13):** Bottle engraving ready-to-pickup, Infinity product page fonts, Custom Roses Figma, Packaging modal "push live" approved

**Stuck cards in Doing (>5 days):**
- Business Homepage Updates — **30 days** (since Apr 15)
- Scroll Animations — **24 days** (since Apr 21)
- AdminRecordNotFound in users#show — **23 days** (since Apr 22)
- Incorrect delivery dates — **17 days** (since Apr 28)
- Infinity Cart/Checkout/Order Update — **16 days** (since Apr 29)

**Alerts:**
- ⚠️ **HungPN 0h for all 4 days W26** — W25 had 18h. Possible leave or logging issue.
- ⚠️ **Production email bug** — customers not receiving confirmation emails (mike62798179, May 12). Multiple orders affected. Not yet visible as resolved.
- ℹ️ DatNT -16h behind plan (40h plan → 16h actual at 4d mark)
- ℹ️ 5 stuck cards in Doing, oldest 30 days

**Fountain Trello item: ⚠️ SKIPPED** — HungPN 0h alert + unresolved production email bug

---

## Piece 9 — Trello — 08:43 (+07:00)

### Check Mail

All 6 items ✓ complete (DuongDn, Carrick, Nick, Rick, Kai, Ken)

### Check Progress

| Item | Checklist | Status | Reason |
|------|-----------|--------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ✓ | Kai daily report ✓, LongVV 16h/wk met |
| John Yi - Amazing Meds | Normal | ✓ | Nick active (GGS), TuanNT 8h sheets |
| James Diamond - Vinn task | Should do | ✓ | Vinn + Jeff daily reports ✓, PhucVT 8h |
| Rory | Closely monitor | ✓ | Carrick active, LeNH 7.5h Upwork (task log reminder sent) |
| Aysar | Closely monitor | ✓ | Carrick active; KhanhHH 6.17h flagged |
| **Franc** | Closely monitor | ⚠️ **SKIPPED** | LeNH 0h Thursday — alert, reminder sent |
| Elliott | Closely monitor | ✓ | Elliott coordinating deploys, KhanhHH flagged |
| MPFC | Work | ✓ | Routine task confirmations |
| Marcel | Work | ✓ | Adhoc, 0h expected |
| Elena - SamGuard | Work | ✓ | PR #301 deployed |
| Elena - WordPress | Pending | ✓ | samguard.co clean |
| Raymond - LegalAtoms | Work | ✓ | No blocking issues |
| Neural Contract | Work | ✓ | Silence normal, no urgent msgs |
| Bailey | Work | ✓ | Nick Mailgun fix ✓, VietPH 8h |
| Andrew Taraba | Work | ✓ | Silence normal |
| Rebecca (William Bills) | Work | ✓ | TuanNT 8h, client dispute not our issue |
| Colin | Work | ✓ | Carrick + Colin active |
| **Fountain** | Work | ⚠️ **SKIPPED** | HungPN 0h W26 + production email bug |

---

## Piece 10 — Reminders — 08:40 (+07:00)

| Developer | Room | Status | Reason |
|-----------|------|--------|--------|
| LeNH | `!OIrgPraJWrcDTnRVLQ` | ✓ Sent | 0h Thu across all sheets (Upwork 7.5h Rory — task log missing) |
| VuTQ | `!SHdFKwrYpRhWJBtiBv` | ✓ Sent | 0h Thu in Paturevision, no leave note |
| KhanhHH | `!rwLbvLBnrRAYMaOPaD` | ✓ Sent | 6.17h Thu (~1.83h short, no leave note) |
| LongVV | — | Skipped | Part-time, 16h/wk target already met |
| PhucVT | — | Skipped | 8h Thu ✓ |
| TuanNT | — | Skipped | 8h Thu combined ✓ |
| VietPH | — | Skipped | 8h Thu sheets ✓ |

---

## Unresolved Questions

- VietPH: Upwork Bailey shows 0h Thu but sheets show 8h Thu. Task ID filtering needed to confirm match. Upwork tracker may only count Prestashop maintenance task specifically.
- KhanhHH Aysar: 6.17h in sheets vs Upwork 0h Thursday on Aysar tracker — discrepancy. Possibly worked on task outside tracker scope, or didn't submit hours via tracker.
- Generator: Jeff mobile dev running out of tasks (Violet flagged). Elliott/Carrick aware — needs follow-up on task allocation.
- FountainStaging PG::UndefinedColumn in orders#index — staging only, but should be flagged to Fountain team.
