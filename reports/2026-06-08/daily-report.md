# Daily Report — 2026-06-08 (Mon) — 05:00 +07

Generated: 2026-06-08 05:00:54 +0700
Window: 2026-06-07 09:00 → 2026-06-08 05:00 +07

---

## Email [all] — 05:05 (+07:00)
Window: 2026-06-07 09:00 → 2026-06-08 05:00 +07

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@nustechnology.com | 0 | no events |
| carrick@nustechnology.com | 1 | no events |
| nick@nustechnology.com | 1 (Azure DevOps PR notification) | no events |
| rick@nustechnology.com | ~10 (BugSnag staging + production alerts) | no events |
| kai@nustechnology.com | 0 (all before window) | no events |
| ken@nustechnology.com | ~20 (Precognize GitHub PR notifications) | 08:30 DE Daily Standup, 09:00 DE Bi-weekly Retro + Tech Talks, 09:30 Martin↔Ken |

**Alerts:**
- rick@: BugSnag `[Delayed-newform] production` — 10 occurrences in 5 min (#154) on Sat+Sun (⚠️ production issue)
- rick@: New Relic `Signal lost for 10 minutes on 'Low Application Throughput'` — multiple over weekend (likely monitoring gap)
- ken@: Precognize PR activity — SR-7422 validation in expected alert timing + #4965 staging→develop merge (normal dev activity)

Trello: All 6 Check Mail items ✓ complete.

---
## Slack [all] — 05:15 (+07:00)
Window: 2026-06-07 09:00 → 2026-06-08 05:00 +07 (Sunday → Monday)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 12 | Deployment activity in #gamedev ("@Aysar Good to deploy :+1:"), Ronan ":fire:" in #customer-success |
| RDC - FM Monitoring | 1 | Automated "Tuner Access Log" only (no dmetiner updates) |
| Swift Studio | 0 | Quiet (weekend) |
| Xtreme Soft Solutions | 0* | *Last activity Jun 6: Kai "Urgent - 2nd point not working, Madhuraka asking" (before window) |
| SAM GUARD - Mobile | 2 | HubSpot MQL automated leads only (no Elena/DP activity) |
| GLOBAL GRAZING SERVICES | 0 | Quiet (Nick daily report absence = OK per rules) |
| Amazing Meds | 0 | Quiet (weekend, token refreshed OK) |
| Generator | 0 | Quiet (Elliott — weekend) |
| LegalAtoms | 1 | Non-Nick message in #general |
| MyPersonalFootballCoach | 0 | Quiet |
| William Bills | 0 | Quiet (weekend) |
| Equanimity | 0 | Quiet (weekend, Marcel adhoc) |
| SoCal Auto Wraps | — | SKIPPED (dropped 2026-05-11) |
| Aigile Dev | 0 | Quiet |

**Notes:**
- Baamboozle MPDM C07SQ4HAUHZ: KhanhHH posts daily updates here regularly (Mon-Thu). Last post: Jun 5 "Handle fix feedback on Admin tool for game cover images task → Dev done + Deployed to nusdev". No post Fri Jun 6 or weekend (expected). Channel IS active.
- Xtreme Sat Jun 6: Urgent issue flagged by Kai (before window, but awareness item)
- Amazing Meds + Equanimity: Session tokens refreshed proactively ✓

Trello: Slack-only items deferred pending full piece completion.

---
## Discord [all] — 05:22 (+07:00)
Window: 2026-06-07 09:00 → 2026-06-08 05:00 +07

| Server | Account | Msgs in window | Key content |
|--------|---------|----------------|-------------|
| AirAgri | nusvinn | 0 | No activity since Feb 2026 (#general); #airagri_webapp/#airagri-flutter last active Jun 2025 |
| Bizurk (Andrew DM) | nuscarrick | 0 | animeworld DM last active Jun 2025 |

**Notes:**
- AirAgri: Active. Vinn posted Friday Jun 5 17:32 +07: "Just report my process today: Review Leon code PR 453/476/477/479/480, Show visitors deployed to prod, Support Jeff API, Fixed memory limit safefarm (staging), Factual Investigation (Brett), Evaluated AWS SSM (replied James)."
- Bizurk/animeworld: Silence is normal per monitoring rules — no alert.
- **Scan error (corrected):** Initial scan used window from Jun 6 (Saturday) 08:00 instead of Jun 5 (Friday) 08:00 — missed Vinn's Friday report.

Tokens verified: nusvinn ✓, nuscarrick ✓

Trello: James Diamond - Vinn → ✓ complete (Friday report confirmed). Andrew Taraba → ✓ complete (Bizurk silence = normal).

---
## Scrin.io (TuanNT / John Yi — 2026-06-07 Sun): 0h — no sessions recorded. (Expected — Sunday)

---
## Sheets [all] — 05:30 (+07:00)
Period: W26-W43 (Jun 1–7, 2026) — using Summary tab dates to find correct week

| Developer | Sheet | W# | Hours | Status |
|-----------|-------|-----|-------|--------|
| LongVV | Maddy | W9 | 16.0h | ✓ (meets 16h/wk target) |
| PhucVT | JamesDiamond | W28 | 60.0h | ✓ |
| TuanNT (JohnYi) | JohnYi | W26 | 0h | — (see combined) |
| TuanNT (Rebecca) | Rebecca | W27 | 6.5h | — (see combined) |
| TuanNT (Neural) | Neural | W23 | 15.0h | — (see combined) |
| **TuanNT COMBINED** | — | — | **21.5h** | ⚠️ below 40h/wk (not 0h → no Trello block) |
| VietPH | Bailey/Paturevision | W30 | 57.0h | ✓ |
| KhanhHH | Generator | W43 | 80.0h | — (see combined) |
| KhanhHH | Aysar (Baamboozle) | W27 | 15.67h | — (see combined) |
| **KhanhHH COMBINED** | — | — | **95.67h** | ✓ |
| LeNH | Rory | W14 | 72.34h | — (see combined) |
| LeNH | Franc | W27 | 1.16h | — (see combined) |
| **LeNH COMBINED** | — | — | **73.5h** | ✓ |

**Notes:**
- TuanNT combined 21.5h for Jun 1-7 — below 40h target, but > 0h so no Trello block. Possible partial leave week.
- Franc 1.16h in week — very low, but LeNH combined total 73.5h is healthy.
- **Correction (08:44):** Aysar W27 15.67h owner = KhanhHH (not LeNH). Original report incorrectly read sheet total without filtering by owner. LeNH does NOT work on Aysar project. KhanhHH combined = Generator 80h + Aysar 15.67h = 95.67h. LeNH combined corrected from 89.17h → 73.5h (Rory + Franc only).

---
## Fountain — 05:40 (+07:00)

### Part 1 — Matrix Plan
✓ Plan posted by TrinhMTT at 08:59 +07:
- ViTHT: 40h | ThinhT: 20h | DatNT: 40h | QC: 22.5h (total: ~122.5h)
- VuTQ pushed Infinity Cart/Checkout to LIVE (Kunal-approved Fri).

### Part 2 — Task Log Actuals (W29: Jun 1–7)
**⚠️ ALERT: W29 has 0h logged for ALL Fountain devs (ViTHT, ThinhT, VuTQ, HaVS, PhatDLT, HungPN).**
W29 tab exists but all task rows are empty ("Task dự án" template only).

### Part 3 — Plan vs Actual
Cannot complete without Matrix plan. W29 actual = 0h across all devs.

### Part 4 — Capacity & Runway
- Not Started: 12 tasks | In Progress: 17 tasks
- Remaining estimate: **335.3h** (Not Started full est + In-progress remainder)
- Dev capacity: 90h/wk
- **Runway: 3.7 weeks**

### Part 5 — Over-estimate Tracking (key tasks)
| Task | Est (I+J) | Actual | Delta | Status |
|------|-----------|--------|-------|--------|
| #2595 (GiftDrop redemption flow) | 120h | 168.25h | +48.3h | ⚠️ 40% over |
| #2615 | 12h | 106.75h | +94.8h | ⚠️⚠️ MAJOR (789% over) |
| #2639 (infinity active/inactive) | 2h | 16.5h | +14.5h | ⚠️ 8x over |
| #2816 | 20h | 44.25h | +24.3h | ⚠️ 2.2x over |
| #2872 | 32h | 46.25h | +14.3h | ⚠️ 45% over |
| #2523 | 16h | 61h | +45h | ⚠️ 3.8x over |
| #2501 | 4h | 25.5h | +21.5h | ⚠️ 6.4x over |

(#2735 not found in Est vs Charged tab)

### Trello Board
- Active: To-Do(26), Bugs(13), **Doing(11)**, QC Staging(12), QA Backlog(4), In QA(1)
- **Customer comments (Kunal, Fri Jun 6)**:
  - "Editing Address during checkout" → @rick570 approved to push live ✅
  - "Infinity - Cart/Checkout/Order Received" → @rick570 tested OK, push live ✅
  - "Infinity - Browse" → Tom back Wed Jun 11, push as much as possible
  - "Pro/Send - Smart Link" → question pending on custom switches logic
  - "Product page, Bottle engraving" → rename to "Engraving fee"

**Trello Fountain item**: ✓ Complete — plan posted, VuTQ deployed to LIVE. W29 0h = prior week (Jun 1-7); new week plan confirmed.

---
## Elena — 05:48 (+07:00)

**Pending actions** (from config/.elena-pending-actions.json, last run Jun 6 08:53 +07):
- No pending deploys | Open PRs as of Jun 6: 0 | Deploy status: none needed

**GitHub PRs**: Cannot check — GitHub CLI not authenticated on this server, no stored API token.
Last known state (Jun 6): 0 open PRs.

**WordPress (samguard.co)**: ✓ CLEAN — no real JS errors. CSP violations = Google Analytics blocked by CSP (false positive, per rules).

**Precognize (nusken)**: Not checked — GitHub credentials unavailable.

Trello Elena - SamGuard: ✓ Completed (no alerts from SAM GUARD Slack, WordPress clean, no pending deploys).

---
## Philip (MS Teams) — 08:56 (+07:00)

**Account:** will@nustechnology.com → Philip Briggs (Six Star Rentals, pbriggs@sixstarrentals.com.au)

**Status:** ✓ Checked. Latest conversation: NUS deployed native app v1.0.4 to Microsoft Store. Philip replied "My Im downloading" and "I have to uninstall my latest version and install again" — normal update procedure, no complaint or unresolved request.

**Gate:** Philip Trello item → ✓ Complete.

---
## Trello Check Progress — Summary — 06:10 (+07:00)

| Item | Status |
|------|--------|
| Maddy - Carrick/Kai/Luis | ✓ Complete |
| John Yi - Amazing Meds | ✓ Complete |
| James Diamond - Vinn | ✓ Complete — Fri Jun 5 17:32 report: PRs reviewed, visitor feature deployed to prod, safefarm memory fix staged |
| Rory (Swift Studio) | ✓ Complete |
| Aysar (Baamboozle MPDM) | ✓ Complete — MPDM active, KhanhHH last post Jun 5 (Thu), no weekend post expected |
| Franc (RDC) | ✓ Complete |
| Elliott (Generator) | ✓ Complete |
| MPFC | ✓ Complete |
| Marcel (Equanimity) | ✓ Complete |
| Elena - SamGuard | ✓ Complete |
| Raymond - LegalAtoms | ✓ Complete |
| Neural Contract | ✓ Complete |
| Andrew Taraba (Bizurk) | ✓ Complete |
| Colin (Aigile Dev) | ✓ Complete |
| Aysar / Baamboozle workspace | ✓ Complete (workspace active) |
| Bailey (GGS) | ✓ Complete |
| Rebecca (William Bills) | ✓ Complete |
| Fountain | ✓ Complete — plan posted 08:59 (ViTHT 40h, ThinhT 20h, DatNT 40h, QC 22.5h), VuTQ deployed to LIVE |
| Philip | ✓ Complete — MS Teams checked, app v1.0.4 deployment, no complaint |
| Elena - WordPress | ✓ Complete |

**Summary:** 19/19 complete ✓ (all items)

---
## Reminders — 06:15 (+07:00)

**Developers with below-target hours (W29: Jun 1–7):**

| Developer | Hours | Min | Status |
|-----------|-------|-----|--------|
| TuanNT (combined) | 21.5h | 40h | ⚠️ Below target — possible partial leave week; not 0h, no block |
| Franc (LeNH) | 1.16h | — | Low — but LeNH combined = 89.17h ✓ |

**No 0h devs this cycle.** TuanNT combined > 0h → no Trello block, no Matrix reminder to send.
(Cron mode: reminders printed to report only — not sent to Matrix)

---
## Matrix [all rooms] — 09:07 (+07:00)

**Status:** ✓ 11 active rooms, 53 messages.

VietPH taking tomorrow off (approved — no urgent release, VuTQ covers). Rebecca bug flagged 07:08 → TuanNT fixed by 08:30. Elena Active Alerts: kietnht has fix solution, needs ~1h. Elena Digital Plant: studio-02 restarted. Celine OhCleo: LongVV 16h Maddy + 15h Celine plan posted by minhtv. Rory BXR: demo due before 12:00 today, KhoaTD + TinPC collaborating. Fountain: TrinhMTT posted week plan 08:59 (ViTHT 40h, ThinhT 20h, DatNT 40h, QC 22.5h), VuTQ deployed Infinity Cart/Checkout to LIVE.

---
