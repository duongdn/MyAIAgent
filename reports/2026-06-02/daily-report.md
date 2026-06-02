# Daily Report — 2026-06-02 (Monday)

**Period:** 2026-05-29 08:00 +07 → 2026-06-02 08:14 +07 (Mon, covers Fri–Sun)
**Generated:** 2026-06-02 08:14 +07

---

## Email — 08:16 (+07:00)

| Account | Emails | Key content |
|---------|--------|-------------|
| duongdn@nustechnology.com | 11 | Leave requests: NamTV off afternoon 1/6 (approved ChienTX); HungPN early leave 16h (approved); LongVV leave request (approved). HR payslip 05/2026. NUS Training Growth Fund notice. Google Sheets "NUS - Cline - OhCleo" shared. |
| carrick@nustechnology.com | 4 | Slack confirmation codes (login activity). **Snyk vulnerability alert for the marcel organization** (Mon 1 Jun). ZohoMail new login activity. |
| nick@nustechnology.com | 45 | Azure DevOps PRs for CNA.Operations.App (#1579, #1580). Sentry OpenURI::HTTPError alerts (Fri). Daily Task Completions from candasurveyors.com.au (many). No John Yi mentions. |
| rick@nustechnology.com | 32 | Rollbar daily summaries: InfinityRoses, FirstProject, FountainGifts (Fri–Mon). **Production error #887 ChunkLoadError** (FirstProject, Sun 31 May). **Rollbar free limit reached** (rickfountain, Sun 31 May). FountainStaging: StandardError, ActionNotFound, NoMethodError, MissingTemplate. |
| kai@nustechnology.com | 18 | Jira activity from Madhuraka/Anoma (LIFM2-443/442/439/434/428). Bitbucket PRs #501, #494. FW: Shopify orders fulfilled. |
| ken@nustechnology.com | 50 | GitHub PR activity on welligence/web, country-manager, WellStack. No Precognize/development PRs in window. |

### Email Alerts

- **[CRITICAL] FirstProject production error** — `[FirstProject] production - New Error: #887 ChunkLoadError: Failed to load` (rick@, Sun 31 May 16:49 UTC). JS chunk load failure in production, needs investigation.
- **[WARNING] Rollbar free tier exhausted** — `rickfountain` account hit monitoring limit (Sun 31 May). Errors may not be tracked going forward — upgrade or switch plan.
- **[INFO] Snyk vulnerability alert** — marcel organization (carrick@, Mon 1 Jun). Review when possible.
- **[INFO] FountainStaging errors** — StandardError in cart_items#create, ActionNotFound, NoMethodError, MissingTemplate — staging only.
- **[INFO] Leave approvals** — NamTV (afternoon 1/6), HungPN (early leave 16h 1/6), LongVV — all approved by ChienTX.

---

## Calendar — 08:16 (+07:00)

| Account | Events today (2026-06-02) |
|---------|--------------------------|
| duongdn | No events |
| carrick | No events |
| nick | No events |
| rick | No events (CalDAV returned stale entries from past dates) |
| kai | No events |
| ken | No events (CalDAV returned stale recurring entries from past dates) |

No meetings scheduled today across all accounts.

---

## Scrin.io — 08:16 (+07:00)

- Data for: **Sunday 2026-06-01** (Monday `isYesterday` bug — returns Sunday, not Friday; Sunday = no workday check needed)
- Employee tracked: **Nick** only
- Hours: **7h 54m** (474 min — sessions 08:49–12:45 and 13:15–17:13, activity 95%/79%)
- Applications: chrome, gnome-terminal-server, windsurf, cursor, Slack
- TuanNT: not in Scrin data
- **Status: OK** — Sunday, no obligation. Nick logged a full day.

---

## Discord — 08:16 (+07:00)

| Server | Account | Msgs | Key content | Trello gate |
|--------|---------|------|-------------|-------------|
| AirAgri | nusvinn | ~50 | Vinn report: ✓ Fri (2026-05-29T17:05 +07) — "Just report my process today: Check issue about corrective actions, Exclude Closed/Resolved overdue reporting, Review Leon PRs, Create alert device detail API…". Mon report: not yet (08:16 +07, expected later). Jeff: ✓ Fri (2026-05-29) + ✓ Mon (2026-06-01) reports found. | ✓ (Fri report present, Mon pending timing) |
| Bizurk | nuscarrick | 0 | No messages, no Andrew DMs | ✓ (silence normal) |

No critical alerts.

---

## Slack — 08:17 (+07:00)

| Workspace | Msgs | Key content | Trello gate |
|-----------|------|-------------|-------------|
| Baamboozle (Aysar) | 1 (MPDM) | Carrick update 2026-06-01T17:33 +07: invoice memo/footer task deployed to nusdev; Admin tool for game cover images (issue #599) in progress | ✓ |
| RDC - FM Monitoring (Franc) | 0 | No dmetiner alerts | ✓ |
| Swift Studio (Rory) | 0 | No Carrick absence/issues | ✓ |
| Xtreme Soft Solutions (Maddy/Kai) | 2 | Kai progress 2026-06-01: LIFM2-442/439 done, LIFM2-443 in progress. Kai progress 2026-05-29: LIFM2-442/439/440 done. Active both days. | ✓ |
| SAM GUARD - Mobile (Elena) | 0 | No activity | pending Elena PRs |
| GLOBAL GRAZING SERVICES (Bailey) | 0 | No Nick alerts (absence not an alert per rules) | pending sheets |
| Amazing Meds (John Yi) | 0 | No activity | pending sheets |
| Generator (Elliott) | 0 | No Elliott/Violet alerts | ✓ |
| LegalAtoms (Raymond) | 0 | No Nick alerts | ✓ |
| MyPersonalFootballCoach (MPFC) | 0 | No critical issues | ✓ |
| William Bills (Rebecca) | 1 | Lucas → Oliver 2026-06-01T16:00 +07: shop-page task scope breakdown (66h original estimate), in #mx — routine dev discussion | pending sheets |
| Equanimity (Marcel) | 0 | Quiet — normal (Marcel adhoc) | ✓ |
| Aigile Dev (Colin) | 0 | No activity | ✓ |

No Slack alerts. All activity is routine.

**Notes:**
- William Bills: Lucas message is task scoping discussion — not a person-status alert, does not block Trello.
- Xtreme: Kai active on both Fri 29 May and Mon 1 Jun.
- Baamboozle MPDM C07SQ4HAUHZ: Carrick "Today's update" confirmed for Mon 2026-06-01.

---

## Elena — 08:18 (+07:00)

### PRs
| PR | Branch | Status | Action |
|----|--------|--------|--------|
| #304 | DP-666-create-and-manage-autoscan | Merged ✓ | Deployed to MayBanServer, build OK (23.7s) |
| #303 | redmine-78803 | Merged 2026-05-29 (was pending deploy) | Deployed (included in pull), Redmine #78803 → Deployed |

### Precognize (nusken)
- Open PRs: none (nusken has no open PRs on Precognize/development)

### WordPress (samguard.co)
- JS errors: none
- CSP violations: none
- Failed requests: Google Analytics, LinkedIn pixel, Facebook pixel, video preloads (3rd-party/expected — not real errors)

**Trello Elena - SamGuard gate:** ✓

---

## Fountain — 08:35 (+07:00)

### Part 1 — Matrix Plan (W29)

**Posted:** 2026-06-01 14:12 +07 by @trinhmtt (two messages — second at 09:08 +07 supersedes first)

**Latest W29 plan (09:08 message):**
```
Em gửi plan tuần này ạ
ViTHT: 16h
VuTQ 40h
DatNT: 40H
-> QC: 25h
```

- ViTHT: 16h
- VuTQ: 40h (returned to Fountain from W29, confirmed ✓)
- DatNT: 40h (new dev on Fountain this week)
- QC: 25h
- **Total capacity: ~121h/week** (note: ThinhT not in plan)

Note: First message at 02:08 UTC had QC=20h; updated to QC=25h in the 02:08+7 message. Latest (09:08 +07) is authoritative.

---

### Part 2+3 — Task Log vs Plan (W29 partial — Mon Jun 1 + partial Tue Jun 2)

Source: Summary tab, W29 row (Jun 1–7). Only ~1.5 days of data — all 0h expected (week just started, entries typically filled end-of-day).

| Dev | Plan (W29) | Actual (so far) | Status |
|-----|-----------|-----------------|--------|
| VuTQ | 40h | 0h | Expected (Mon–Tue data not yet entered) |
| ThinhT | (not in plan) | 0h | Not on W29 plan — normal |
| ViTHT | 16h | 0h | Expected (data entry lag) |
| PhatDLT | ~QC share | 0h | Expected |
| HungPN | ~QC share | 0h | Expected (early leave Mon approved) |
| HaVS | (not in plan) | 0h | Not in W29 plan |
| TrinhMTT | NOT QC | 0h | N/A |

**W28 actuals (reference):** ThinhT=16h, ViTHT=40h, PhatDLT=13h, HungPN=16h, VuTQ=0h (was on Bailey)

No alerts — W29 is Day 2, task log entries expected to populate through the week.

---

### Part 4 — Capacity & Runway

Source: Est vs Charged tab (113 rows total)

| Metric | Value |
|--------|-------|
| Total est (I+J) | 1,446.75h |
| Total actual charged | 463.75h |
| Remaining (active tasks incl. Pending/Staging) | **1,024.5h** |
| Weekly capacity (W29) | ~121h |
| **Runway** | **~8.5 weeks** |

**Delta vs 2026-06-01:** remaining 307.9h → 1,024.5h (+716.6h). Large jump because previous report used narrower "core active" filter; this run counts Deployed on Staging + Pending tasks as remaining. Methodology note: if using same narrow filter (not-started + in-progress + pending only), remaining ≈ 356.5h → ~2.9 weeks runway (vs 2.2 weeks previously — slight increase).

**W29 capacity confirmed:** ViTHT 16h + VuTQ 40h + DatNT 40h + QC 25h = **121h/week**

---

### Part 5 — Over-Estimate Tracking

Total tasks with actual > est×1.2: **37** (was 36 on 2026-06-01 — +1)

**Key tasks:**

| Task | Est (I+J) | Actual | Delta vs 2026-06-01 | Status |
|------|-----------|--------|---------------------|--------|
| #2595 (giftdrop redemption) | 120h | 168.25h (+40%) | **0h — no growth** ✓ | Deployed on Staging |
| #2615 | 12h | 106.75h (+790%) | **0h — no growth** ✓ | Deployed on Staging |
| #2735 (Pro Send Smart Link) | 120h | 136h (+13%) | **0h — no growth** ✓ | In-progress (>50%) |

All 3 key tasks: **not growing** ✓

**New in active tasks (still in progress, over-est):**
- #2640: est=12h, actual=16.75h (+39.6%) — In-progress (<50%)
- #2695: est=20h, actual=26h (+30%) — In-progress (<50%)
- #2702: est=8h, actual=25.5h (+219%) — In-progress (>50%)
- #2872: est=32h, actual=46.25h (+44.5%) — In-progress (>50%)

**Notable spike (historical):** #2627 — est=0.5h, actual=8.25h (+1550%) — "Has Bug on Live"

---

### Trello Board

**Card counts (active lists):**

| List | Count |
|------|-------|
| To-Do | 27 |
| Bugs | 15 |
| Doing | 12 |
| QC Internal Backlog (Staging/Beta) | 14 |
| QA Backlog (Staging) | 3 |
| In QA | 1 |
| Not passed | 1 |
| **Total active** | **73** |

**Customer comments (last 5 days — @kunalsheth, @tmmckay, @mike62798179, @iris63293413):**

| Date | From | Card | Summary |
|------|------|------|---------|
| 05-29 20:50 | kunalsheth | Infinity - Custom printed gift item | All designs same price ($224.95) regardless of design pick |
| 05-29 20:45 | kunalsheth | Fountain - States need to be updated | Asking for update; still sees old list on beta |
| 05-28 10:00 | kunalsheth | Infinity Shipstation store | Guest checkout passing wrong email to ShipStation |

**Action needed:** States update (#open, kunalsheth waiting) + ShipStation guest email issue unresolved.

**Stuck cards in Doing (>5 days):**

| Card | Days stuck |
|------|-----------|
| Fountain & Infinity - Add Subtle Scroll Animations | 41d |
| ActiveRecord::RecordNotFound in admin/users#show | 40d |
| Finding solution to customers receiving incorrect delivery date | 34d |
| Infinity - Order flow updates | 17d |

**Stuck in To-Do (selected, >30 days):** "Fountain - Product Details Page - Reviews spike" (117d), "Upgrade to Next.js 16" (83d), "Fountain Pro Template Zip Code Update" (83d), "Fountain - Performance of website" (60d)

---

**Trello Fountain item:** ✓ complete

---
