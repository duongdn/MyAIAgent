# Daily Report — 2026-04-10 (Friday)

Window: 2026-04-09 09:20 → 2026-04-10 09:15 (+07:00)

---

## Email all — 08:39 (+07:00)

| Account | Count | Summary |
|---------|-------|---------|
| duongdn@ | 0 | No emails |
| carrick@ | 3 | 2 Redmine bugs (Generator/Elliott), 1 Rollbar daily (SoCal) |
| nick@ | 31 | Azure DevOps PRs (CNA), ClickUp Sentry issues, Bailey Upwork msgs, Twilio terms. No John Yi filter match. |
| rick@ | 7 | Rollbar dailies (InfinityRoses, FirstProject, FountainGifts) + **1 PRODUCTION error** |
| kai@ | 6 | 5 Jira tickets (LIFM2-424/430/431), Madhuraka: scheduled emails sending twice |
| ken@ | 109 | GitHub PRs: Precognize (#4817/#4820/#4823), Welligence, amocc-material, rentle |

**Alerts:**
- **rick@: PRODUCTION** — FountainGifts ChunkLoadError loading chunk 3730 (`https://www.fountaingifts.com/_next/static/chunks/3730.523e7c8955d9341b.js`) — Error #864
- **carrick@** — 2 new Redmine bugs for Elliott/Generator:
  - Bug #78081: Leads Report property column empty
  - Bug #78065: Booking reminder sent immediately when created within reminder window
- **kai@** — Madhuraka flagged scheduled emails sending twice

Trello: all 6 Check mail items ✓ complete.

---

## Slack all — 08:43 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 7 | PR #592 merged (device sessions fix), pushed to nusdev |
| RDC - FM Monitoring | 20 | dmetiner active, Turkish version pushed to fmscan.com, tuner instability |
| Swift Studio | 22 | Rory & Jeff: deep link issues, subtitle `<br>` bug, Amex CVV 4-digit bug |
| Xtreme Soft | 3 | **Kai daily progress** ✓: LIFM2-433 Done, LIFM2-432 Done, LIFM2-412 filter, LIFM2-431 in progress |
| SAM GUARD | 22 | HubSpot MQL leads (12+), staging bugs SR-7221/7222/7223, Lena overloaded |
| Global Grazing | 16 | **URGENT**: Joey reports prices reverting to old values. Amy/Nick deployed fix. Console maintenance issue. |
| Amazing Meds | 19 | Nick & John: WooCommerce NetValve plugin setup, sandbox login shared |
| Generator | 4 | Violet daily update ✓: all devs active, no blockers. System upgrade audit (Firebase keys, Vue 2 EOL, Laravel 10 EOL). |
| LegalAtoms | 28 | Tyler testing CLETS-001, Raymond released v1.13.0, Mir: many urgent items |
| MPFC | 0 | Quiet |
| William Bills | 53 | Oliver/Lucas: Jersey site virus cleanup → VentraIP, MWMX tasks assigned |
| Equanimity | ⚠️ AUTH FAIL | xoxc token expired. Auto-refresh failed (user_not_found). Marcel monitoring blocked. |
| SoCal Auto Wraps | 0 | Quiet |
| Aigile Dev | 1 | BRAiKING NEWS newsletter ready (MailerLite) |

**Alerts:**
- **Equanimity: AUTH FAILURE** — session token expired, auto-refresh failed. Marcel/Carrick monitoring blocked. Needs manual token refresh.
- **GGS: URGENT pricing bug** — Joey reports prices reverting to old values (not a dev discussion — customer-facing issue). Nick deployed fix.

Trello progress items: 12 ✓ complete, Marcel ⚠️ skipped (auth fail).

---

## Discord all — 08:40 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 66 | **Vinn report** ✓ (10:29): reviewed PRs 296/297/298, deployed sensor door label/map filters/layers/file manager to prod, working SafeFarm alarm. **Jeff report** ✓ (10:29, 4h): hazard updates, contractor app testing. |
| Bizurk (nuscarrick) | 0 | No activity. DM with animeworld: no messages since Mar 5. nuscarrick Missing Access on Bizurk channels. |

Trello: James Diamond ✓ complete, Andrew Taraba ⚠️ skipped (no activity since Mar 5).

---

## Sheets all — 08:55 (+07:00)

| Developer | Yesterday (Apr 9) | Week total | Status |
|-----------|-------------------|------------|--------|
| LongVV (Maddy) | 8h | 16h / 16h target | ✓ OK |
| PhucVT | 8h | 46h (team) | ✓ OK |
| TuanNT (John Yi) | — | 4h (Mon only) | INFO: 0h Thu. Scrin also 0h. |
| VietPH | 8h | 28h (VietPH) | ✓ OK |
| KhanhHH | 8h | 128h (team) | ✓ OK |
| LeNH (Rory) | 0h (KhoaTD 4h) | 16.5h | LeNH: 0h Thu (Rory project) |
| LeNH (Franc) | 1.5h | 6.17h | OK |
| LeNH (Aysar) | 6.5h | 13.33h | OK |
| **LeNH combined** | **8h** | **36h** | **✓ OK** |

**TuanNT Rebecca col P:** Sheet structure different from expected, unable to read col P in this run.

No 0h alerts — all developers have logged hours or have leave/split justification.

---

## Scrin.io — 08:40 (+07:00)

- Yesterday (2026-04-09): **0h tracked**
- TuanNT John Yi task log: 0h on Apr 9
- Rule check: 0h task log ≤ 0h Scrin = **OK** (not over-inflated)
- April total: 21.53h across 7 working days

---

## Fountain — 09:00 (+07:00)

### Part 1 — Matrix Plan
Active discussion in Fountain room (2026-04-09):
- @vitht: updated features, asked @vutq to review FE PR #388 + BE PR #402 (feature change with many modifications)
- @vutq: pushed fix for Thomas comments on ticket #2615 to BETA, asked QC to check
- @phatdlt: flagged bug in selection list, asked @trinhmtt + @lamlq for help (Redmine #78107)
- @trinhmtt: asked if Redmine fix is urgent — can schedule for next week
- No explicit weekly plan message ("Em update plan tuần này") found in last 40 messages

### Part 2 — Task Log Actuals
⚠️ Google Sheets API timeout — unable to fetch Fountain sheet summary for current week.

### Part 3 — Plan vs Actual
⚠️ Skipped — no plan message found + sheets API timeout.

### Part 4 — Capacity & Runway
⚠️ Skipped — Est vs Charged tab unavailable due to API timeout.

### Part 5 — Over-Estimate Tracking
⚠️ Skipped — sheets API timeout. Key tasks #2595, #2615, #2735 not checked.

### Trello Board (Fountain)
- **Customer comment**: tmmckay on "Fountain - Pro/Send - Smart Link": user cannot add to previous smartlink order (single gift item limit), suggests hiding list on smartlink selection
- **Card counts**: Todo 35, Bugs 5, Doing 5, QC Internal 3, QA Backlog 3, In QA 1, Not Passed 0, Done 918
- Stuck/hard-to-release: not checked (would need card dateLastActivity)

**Fountain status: INCOMPLETE** — Parts 2-5 missing due to Sheets API timeout. Trello item NOT completed.

---

## Elena — 08:50 (+07:00)

### PRs (duongdn)
No open PRs on `nustechnology/Elena-SamGuard-Digital-Plant`. ✓ Clean.

### Precognize (nusken)
No open nusken PRs on `Precognize/development`. ✓ Clean.

### WordPress SamGuard
Not checked in this run (Puppeteer not available).

### Pending Actions
No pending deploy actions.

---

## Upwork — 08:45 (+07:00)

| Workroom | Developer | This week (Apr 6-12) | Status |
|----------|-----------|---------------------|--------|
| Rory | LeNH | 12h30m (Mon 8, Tue 4.5) | Active |
| Neural Contract | external | 0h | Messages only, no task log |
| Aysar | LeNH | 13h20m (Wed 6.83, Thu 6.5) | Active |
| Bailey-VietPH | VietPH | 32h50m (Mon-Thu 8h each + Fri 0.83h) | ✓ On track |
| Bailey-DuongDN | DuongDN | 0h | No activity this week |

---

## Trello — 09:10 (+07:00)

### Check Mail (all 6 items)
- DuongDn: ✓ complete
- Carrick: ✓ complete
- Rick: ✓ complete
- Kai: ✓ complete
- Ken: ✓ complete
- Nick: ✓ complete

### Check Progress

**Normal:**
- Maddy - Carrick/Kai/Luis: ✓ complete (Kai daily progress posted)
- Blake: ✓ complete (SoCal quiet, no alerts)
- John Yi - Amazing Meds: ✓ complete (Nick & John active)

**Should do:**
- James Diamond - Vinn: ✓ complete (both daily reports found)

**Closely monitor:**
- Rory: ✓ complete (Swift Studio active)
- Aysar: ✓ complete (Baamboozle PR merged, sessions)
- Franc: ✓ complete (RDC active, Turkish version)
- Elliott: ✓ complete (Generator daily update, no blockers)

**Work:**
- MPFC: ✓ complete (quiet, no alerts)
- Marcel: ⚠️ SKIPPED — Equanimity auth failure, cannot monitor
- Elena - SamGuard: ✓ complete (no PRs, SAM GUARD active)
- Raymond - LegalAtoms: ✓ complete (v1.13.0 released)
- Neural Contract: ✓ complete (0h expected, messages only)
- Bailey: ✓ complete (Nick deployed urgent pricing fix)
- Andrew Taraba: ⚠️ SKIPPED — no activity since Mar 5, Bizurk channel access issue
- Rebecca - William Bills: ✓ complete (Oliver/Lucas active)
- Colin: ✓ complete (Aigile newsletter ready)
- Fountain: ⚠️ SKIPPED — 5-part check incomplete (Sheets API timeout)

---

## Summary & Action Items

### Critical Alerts
1. **FountainGifts PRODUCTION ChunkLoadError** — chunk 3730 failed to load (Error #864). Needs investigation.
2. **Equanimity Slack auth failure** — Marcel monitoring blocked. Need manual session token refresh.
3. **GGS urgent pricing bug** — Joey reported prices reverting. Nick deployed fix — verify resolution.

### Attention Needed
4. Madhuraka flagged scheduled emails sending twice (kai@)
5. 2 new Redmine bugs for Elliott/Generator (#78081, #78065)
6. Bizurk/nuscarrick Missing Access — needs permission fix for Andrew Taraba monitoring
7. Fountain 5-part check incomplete — Parts 2-5 skipped due to Sheets API timeout. Re-run `/daily-report fountain sheets` when API recovers.

### Trello Skipped Items (3)
- Marcel (Equanimity auth fail)
- Andrew Taraba (no activity)
- Fountain (incomplete check)
