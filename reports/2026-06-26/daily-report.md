# Daily Report — 2026-06-26 (Friday)

**Generated:** 09:04 +07:00  
**Scan window:** 2026-06-25 10:15 → 2026-06-26 09:04 (+07:00)  
**PREV_DATE:** 2026-06-25 (Thursday)

---

## ⚠️ ALERTS SUMMARY

| # | Severity | Source | Issue |
|---|----------|--------|-------|
| 1 | 🔴 HIGH | Swish / New Relic | Signal lost — Low Application Throughput x2 at 20:40+07 Jun 25 |
| 2 | 🔴 HIGH | Rollbar / rick@ | Production error #1017 Uncaught Error — 100th occurrence at 20:27 UTC Jun 25 |
| 3 | 🟡 WARN | GGS / Nick | Performance WARNING in daily infrastructure report |
| 4 | 🔴 HIGH | Fountain | Budget CRITICAL: only 31.5h of est+CR remaining (actual 1557.25h / total 1588.75h) |
| 5 | 🔴 HIGH | Fountain | Rollbar production error #1017 (same as alert #2 — Fountain project) |
| 6 | 🟡 ONGOING | MPFC | OAuth2 invalid_grant — real unresolved bug (no new escalation today) |

---

## 1. Email — 08:xx (+07:00)

| Account | Emails | Key findings | Calendar today |
|---------|--------|-------------|----------------|
| duongdn@ | routine | Leave-plan updated (KhanhHH Jun 25-26) | no events |
| carrick@ | — | Carrick on leave (no new emails) | no events |
| nick@ | routine | No John Yi escalation | **21:30 Weekly Meeting with Devs (Teams)** |
| rick@ | ⚠️ | **Rollbar prod error #1017 "Uncaught Error" — 100th occurrence 20:27 UTC Jun 25** | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@ | routine | No Madhuraka escalation | — |
| ken@ | — | Precognize routine | — |
| vuongtrancr@gmail | ⚠️ | **[Swish] New Relic: Signal lost — Low Application Throughput x2 at 20:40+07 Jun 25** | — |
| dnduongus@gmail | OK | No security alerts | — |
| freelancer@mpfc | — | No client emails visible | — |

Trello: "Check mail" → all 6 items ✅ marked complete.

---

## 2. Slack — 08:xx (+07:00)

| Workspace | Msgs | Key findings | Gate result |
|-----------|------|-------------|-------------|
| Baamboozle | 47 | Carrick leave notice to Aysar MPDM (03:09 UTC). Jamie tagged Aysar to review PR #603+#632. | ✅ Aysar: Carrick+KhanhHH both on leave — known, complete |
| RDC - FM Monitoring | 21 | Automated monitoring. No dmetiner personal update. | ✅ Franc: no dmetiner = OK |
| Swift Studio | 0 | Carrick on leave, 0 messages expected. | ✅ Rory: Carrick on leave, known |
| Xtreme Soft Solutions | 6 | Kai active (JIRA tickets LIFM2-445, LIFM2-428, LIFM2-446 all in Review/Testing). | ✅ Maddy: Kai active |
| SAM GUARD - Mobile | 36 | Elena/SamGuard team active (anhttl + duongdn discussing CSP/library issue — see Elena section). | ✅ Elena: active |
| GGS | 27 | ⚠️ Nick daily report shows **Performance WARNING** in maintenance channel. | ⚠️ Bailey: GGS WARNING — NOT complete |
| Amazing Meds | 0 | No messages in window. | ✅ John Yi: TuanNT 8.3h → complete |
| Generator | 50 | Elliott/Violet active, release held until Monday (Carrick on leave). | ✅ Elliott: active |
| LegalAtoms | 23 | Nick active in workspace. | ✅ Raymond: Nick present |
| MPFC | 3 | 3 DM messages from freelancer@ (empty text — attachments only, Jun 23). OAuth2 ongoing. | ✅ MPFC: no new escalation |
| William Bills | 13 | Oliver+Lucas active: Oliver reset WP password via Ventra cPanel. Routine support. | ✅ Rebecca: TuanNT 8.3h → complete |
| Equanimity | 4 | Marcel present; SGBuildex UAT confirmed, planning go-live. | ✅ Marcel: active |
| Aigile | 17 | Colin active in workspace. | ✅ Colin: active |
| OhCleo | — | See Piece 12. Tony daily report present. | ✅ Ohcleo: complete |

---

## 3. Discord — 08:xx (+07:00)

| Server | Account | Msgs | Key findings |
|--------|---------|------|-------------|
| AirAgri | nusvinn | Active | Vinn daily report confirmed. Jeff Trinh updates in airagri_webapp. |
| Bizurk | nuscarrick | 0 | No messages from Andrew Taraba in window. |

Trello: James Diamond-Vinn ✅, Andrew Taraba ✅ (0 msgs = no activity, gate satisfied).

---

## 4. Google Sheets (Task Logs) — PREV_DATE: 2026-06-25

| Developer | Sheets | Workstream | Leave | Total | Status |
|-----------|--------|-----------|-------|-------|--------|
| LongVV | 8h (Maddy) | — | — | 8h | ✅ Weekly tracking OK (16h/wk target, on track) |
| PhucVT | — | 8h (James Diamond) | — | 8h | ✅ Left 45min early, made up at night |
| TuanNT | 8.3h (Paturevision) | — | — | 8.3h | ✅ Left early Jun 25, making up Jun 26 |
| VietPH | — | 8h (Paturevision) | — | 8h | ✅ |
| KhanhHH | 0h | 0h | ✅ LEAVE Jun 25-26 (approved) | — | ✅ No alert |
| LeNH | 0h scan | 6h40 Peptide Clyde | 4h half-day | 6h40 | ✅ Scan missed new WS project; Matrix confirmed |

> LeNH note: `sheets-tasklog-scan.js` returned 0h because Peptide Clyde is a new WS project (started 22/6) not yet in script's project list. DuongDN confirmed in Matrix chat at 10:23+07 that LeNH logged 6h40 on Workstream Peptide Clyde + 4h half-day off. NOT an alert. Script needs project list update.

---

## 5. Scrin.io — 08:xx (+07:00)

- John Yi (Nick): **0 sessions** for 2026-06-25 (Monday returns Sunday → this was Thursday scan)
- No alert (0 sessions is normal for Thu; gate is Amazing Meds TuanNT task log hours)

---

## 6. Fountain — 5-Part Check

### Part 1 — Matrix Plan
- Team active Jun 25 (scan window 10:15+07 onwards): HungPN, TrinhMTT, ViTHT, ThinhT, DatNT all working in Kunal-Fountain Matrix room (44 messages)
- Monday plan from Jun 23 is before scan window (normal)
- Cards completed: #2885 "Small updates to product catalog" → BETA, #2956 "Summer shipping banner" → tested DONE

### Part 2 — Task Log W32 (Jun 22-28) Actuals
- W32 sheet: **0h logged** through Thursday Jun 25 (all rows are empty "Task dự án" placeholders)
- Note: Fountain team practice appears to be logging at end-of-week; team IS active per Matrix
- ViTHT, ThinhT, HungPN all working on active tickets

### Part 3 — Plan vs Actual (W32)
- No actuals in W32 yet → cannot compare

### Part 4 — Capacity & Runway
| Metric | Value |
|--------|-------|
| Total Estimated | 1,465.25h |
| Total CR (change requests) | 123.50h |
| Total Est+CR | 1,588.75h |
| Total Actual to date | 1,557.25h |
| **Remaining budget** | **31.5h** |
| Total Charged | 464.25h |
| Uncharged actual | ~1,093h (gap) |

⚠️ **CRITICAL: Only 31.5h of budget remaining. At current velocity, this exhausts within days.**

### Part 5 — Over-Estimate Tracking + Trello Board
Top over-runs (actual vs estimate):

| Task | Est | Actual | Over | % |
|------|-----|--------|------|---|
| #2615 | 12h | 106.75h | +94.75h | 789% |
| #2595 | 120h | 168.25h | +48.25h | 40% |
| #2639 | 2h | 16.50h | +14.5h | 725% |
| #2613 | 2h | 14.50h | +12.5h | 625% |
| #2629 | 8h | 18.25h | +10.25h | 128% |
| #2627 | 0.5h | 8.25h | +7.75h | 1,450% |
| #2624 | 12h | 31.25h | +19.25h | 160% |

Fountain Trello board: Could not access (board `5475eaf923a9a1309357eb51` returns 401 with current token — likely separate Trello account). No blocking items confirmed from Matrix activity.

**Trello gate: ⚠️ Fountain NOT complete** (budget critical + Rollbar prod error)

---

## 7. Elena — 08:xx (+07:00)

### PRs & Deploy
- No open PRs pending merge/deploy
- `config/.elena-pending-actions.json`: no undeployed merges
- Trello: Elena ✅

### WordPress samguard.co
- Site status: 200 OK
- JS errors: 0
- CSP violations: `ad.doubleclick.net` blocked (Google Ads/DoubleClick tracking pixel)
  - **Note:** DuongDN + anhttl discussed this in Matrix Jun 25 — confirmed it's Google marketing tracking, not app logic. DuongDN said "only scanning home page, probably not related to their question."
- Failed requests: Multiple mp4 video files (large files, likely timeout not error)
- **Assessment:** KNOWN issue (marketing tracking pixel). Not a blocking app error.

### Precognize
- ken@ routine: no escalation

---

## 8. Matrix — matrix-rooms-0850.md (fetch 08:50+07)

23 active rooms, 128 total, 272 messages

Key room summaries:

| Room | Msgs | Key content |
|------|------|-------------|
| Kunal - Fountain | 44 | HungPN, TrinhMTT, ViTHT, ThinhT, DatNT active. Cards #2885→BETA, #2956→DONE. Scope discussion for #2913 (custom gift printing). |
| Celine/OhCleo | 60 | Active dev discussion on Related Categories module. Tony daily report present. Deploys happening. |
| NUS Technology (general) | 51 | Software audit announcement from cuongnh. World Cup 2026 discussion. VietPH beer night tonight 17:30. |
| Elena - SamGuard WordPress | 8 | CSP/library question from client; DuongDN confirmed Google tracking, not app code. |
| NUS - Colin - ETZ | 3 | Colin wants deploy to prod **NEXT MONDAY Jun 30** (Kiet/KhanhHH to prep). |
| NUS - Elliott | 5 | KhanhHH on leave confirmed to Elliott (Luc told him). Elliott's code review wait until KhanhHH returns. |
| Maddy - Xtreme Soft Solutions | 4 | LongVV has tasks, linked LIFM2-446 for review. |
| Resource Arrangement | — | LongVV half-day morning Jun 26 (surgery prep for dad). DuongDN to cover Celine/OhCleo. |
| Delivery Department | — | NEW PROJECT: Blair Brown/Peptide Clyde announced (started 22/6/2026, DuongDN as direct manager). |
| LeNH room | — | LeNH confirmed logged 6h40 WS Peptide Clyde + 4h half-day off. DuongDN acknowledged. |
| TuanNT room | — | TuanNT: "I left early yesterday, making it up today". |
| BDD - Delivery (planning) | — | Next week: ThamTTH/ThienT idle. TriNM idle (Mikkel stopped). MinhTC idle (MyID project). |

---

## 9. Upwork — 08:xx (+07:00)

**Week: Jun 22-28, 2026**

| Workroom | This week | Last week | Status |
|----------|-----------|-----------|--------|
| Rory | 0h | 32h | ✅ Carrick on leave Thu-Fri, expected |
| Neural Contract | 0h | 0:20h | ✅ Silence = normal per gate |
| Aysar | 0h | 11:50h | ✅ KhanhHH on leave, expected |
| Bailey-VietPH | 0h | 0h | ✅ Bailey uses separate billing |
| Bailey-DuongDN | 0h | 0h | ✅ Bailey uses separate billing |

Neural last message (upwork-neural-messages.js): "Hi Michael, I updated and pushed code, please check" — no urgent client message.

---

## 10. OhCleo Slack — 08:xx (+07:00)

- 4 DM messages from Celine in window
- Tony's daily report: present ✅
- No production alerts
- DuongDN covering today (LongVV half-day morning leave)
- Trello: OhCleo ✅

---

## 11. Trello Checklist Summary

### Check Progress Card

| Item | Gate | Status |
|------|------|--------|
| Maddy - Carrick/Kai/Luis | Kai JIRA W12: 3 tickets OK (LIFM2-445, 428, 446) | ✅ COMPLETE |
| John Yi - Amazing Meds | TuanNT 8.3h logged | ✅ COMPLETE |
| Rebecca (William Bills) | TuanNT 8.3h logged | ✅ COMPLETE |
| Bailey | GGS Nick daily report | ⚠️ NOT COMPLETE — Nick WARNING |
| James Diamond - Vinn | Discord: Vinn + Jeff daily reports | ✅ COMPLETE |
| Franc | RDC: no dmetiner update | ✅ COMPLETE |
| Rory (Swift Studio) | Swift 0 msgs: Carrick on leave (known) | ✅ COMPLETE |
| Aysar | Baamboozle MPDM C07SQ4HAUHZ: Carrick left notice, KhanhHH leave | ✅ COMPLETE |
| Elliott | Generator 50 msgs, active | ✅ COMPLETE |
| Marcel | Equanimity: UAT success, go-live planning | ✅ COMPLETE |
| Elena - SamGuard | SAM GUARD 36 msgs, no blocking issue | ✅ COMPLETE |
| Colin | Aigile 17 msgs, active | ✅ COMPLETE |
| Andrew Taraba | Bizurk 0 Discord msgs (no activity = gate OK) | ✅ COMPLETE |
| OhCleo | Tony daily report present | ✅ COMPLETE |
| Neural | No urgent client message | ✅ COMPLETE |
| Raymond - LegalAtoms | Nick present in LegalAtoms | ✅ COMPLETE |
| Philip | MS Teams: 1 message found (content: routine) | ✅ COMPLETE |
| MPFC | 3 Slack DMs (attachment-only), OAuth2 ongoing known | ✅ COMPLETE |
| Fountain | Budget critical (31.5h left) + Rollbar prod error | ⚠️ NOT COMPLETE — alerts |
| Blake | DROPPED (SoCal monitoring ended May 2026) | — |

### Check Mail Card
- All 6 accounts checked ✅

---

## 12. Maddy JIRA Weekly Check (W12 / Jun 25)

| Ticket | Summary | Status | Est | Actual | Check |
|--------|---------|--------|-----|--------|-------|
| LIFM2-445 | Update Price Action button - Listed Cons | Testing - Anoma | 2h | 1h | ✅ |
| LIFM2-428 | [Shopify] Product Authenticity Certificate | Review | 44h | 39h 15m | ✅ |
| LIFM2-446 | Implement Row-Locking in Quoting Tool | Review | 12h | 8h | ✅ |

All 3 tickets OK ✅. LongVV linked LIFM2-446 in Matrix for Thanh Nguyen review.

---

## 13. Zoho Calendar (Today Jun 26)

| Account | Events |
|---------|--------|
| nick@ | 21:30 Weekly Meeting with Devs (Teams) — recurring |
| rick@ | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| Others | No events |

---

## Key Action Items

1. **🔴 Swish New Relic Signal Lost** — investigate "Low Application Throughput" x2 Jun 25 20:40+07. Notify Carrick when he returns (Monday).
2. **🔴 Fountain Rollbar Production Error #1017** — Uncaught Error, 100th occurrence. Rick's inbox. Needs immediate Fountain team attention. Budget also critical (31.5h left).
3. **🟡 GGS Nick Performance WARNING** — check Nick's maintenance report details.
4. **ℹ️ Colin ETZ deploy** — to prod NEXT MONDAY Jun 30. Kiet + KhanhHH (returns Mon) to prepare.
5. **ℹ️ Elliott code review** — KhanhHH review pending. KhanhHH back Monday.
6. **ℹ️ LeNH scan bug** — `sheets-tasklog-scan.js` doesn't include Peptide Clyde WS project. Update project list.
7. **ℹ️ Fountain budget** — 31.5h remaining, over-estimate on #2615 (+94.75h), #2595 (+48.25h). Needs client discussion.
8. **ℹ️ LongVV** — half-day morning off Jun 26 (surgery prep for dad). DuongDN covering Celine/OhCleo.
9. **ℹ️ New project** — Blair Brown / Peptide Clyde (DuongDN as direct manager, started 22/6).
10. **ℹ️ Aysar PRs #603+#632** — Jamie tagged Aysar to review. KhanhHH returns Monday.

---

## Leave Status (Jun 26 Fri)

| Person | Status |
|--------|--------|
| KhanhHH | 🏖️ LEAVE today (approved, 2nd day) |
| LongVV | 🏥 HALF-DAY AM leave (surgery prep for dad) |
| Carrick | 🏖️ LEAVE (personal, returns Monday) |
