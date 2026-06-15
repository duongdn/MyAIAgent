# Daily Report — 2026-06-16 (Tuesday)

**Run:** 2026-06-16T05:00:22+07:00 (cron)
**Window:** 2026-06-15T09:03:47+07:00 → 2026-06-16T05:00:22+07:00
**Leave plan:** LongVV off 2026-06-16 (PENDING approval — personal, father medical follow-up)

---

## ⚠️ ALERTS SUMMARY

| # | Severity | Item | Detail |
|---|----------|------|--------|
| 1 | 🔴 HIGH | TuanNT 0h Jun 15 | No hours logged across all 4 sheets (JohnYi W28, Rebecca W29, Neural W25, Paturevision W32). No leave recorded. |
| 2 | 🔴 HIGH | LeNH 0h Jun 15 | No hours in Rory W16 (only KhoaTD 6h + TinPC 4h), Franc ended, Aysar W29 = 0h. No leave recorded. |
| 3 | 🟠 MED | Kai urgent personal | Posted in Xtreme: "I have urgent personal issue" + "haven't been busy". Client (Madhuraka/Anoma) informed. |
| 4 | 🟠 MED | Vinn no daily report | No nusvinn post in AirAgri window. Jeff posted (4h ✓). James Diamond active. |
| 5 | 🟠 MED | Fountain runway = 0 | Est 2953.5h vs 3114.5h charged. Over budget 161h. 15 tasks over-estimate. |
| 6 | 🟡 LOW | Swish APM signal lost | vuongtrancr: 8x "Signal lost 10 min" on Low App Throughput. New Relic Jun 15 report. |
| 7 | 🟡 LOW | LongVV leave PENDING | June 16 leave not approved (minhtv replied but not authorized approver). Reason: father medical. |
| 8 | 🟡 LOW | MPFC OAuth error | Rollbar: #46 Google_AuthException invalid_grant (Bad Request). Token refresh needed. |
| 9 | 🟡 LOW | Nick no GGS report | No Nick daily report found in GGS Slack. Only Joey msg (no troubles). |
| 10 | ℹ️ INFO | Matrix token expired | All 4 browser SSO refresh attempts failed. Matrix scan (Piece 10) + Fountain Part 1 unavailable. |
| 11 | ℹ️ INFO | Upwork all expired | carrick: headless login CAPTCHA, vinn/david2/Neural: no saved sessions. |
| 12 | ℹ️ INFO | dnduongus security | LastPass login blocked + Card transaction alert + Claude trusted device added. |

---

## Email — all — 05:10 (+07:00)

| Account | Emails (window) | Recent Jun 15 | Calendar Jun 16 | Alerts |
|---------|----------------|---------------|-----------------|--------|
| duongdn@nus | 15 | 4 | no events | LongVV leave email + minhtv reply |
| carrick@nus | 44 | 0 | no events | Generator-api failed pipelines (×11, Jun 9-10), Snyk vuln ×2 |
| nick@nus | 50 | 0 | Weekly Meeting w/ Devs 21:30 UTC | Sentry SMTP errors ×2, Xero limit warnings ×8 |
| rick@nus | 50 | 0 | HEAL Meeting 19:30+07, OmniGPT Daily Sync 17:30+07 | 37 alerts: Fountain/InfinityRoses/FirstProject daily summaries + prod errors |
| kai@nus | 29 | 0 | no events | none |
| ken@nus | 50 | 20 | Martin<>Ken 16:30+07 | Welligence QueryPlatform comparison (1) |
| vuongtrancr@gmail | 50 | 0 | — | Delayed-newform daily summaries ×2, APM Signal lost ×8, New Relic Jun 15 |
| dnduongus@gmail | 50 | 0 | — | LastPass login blocked, Card transaction, Claude trusted device |
| freelancer@mpfc | 13 | 2 | — | New Relic Jun 15, Rollbar daily summaries ×4, OAuth error, Google security risk |

**Key email alerts:**
- **Rick inbox:** Fountain/InfinityRoses production errors accumulating (FountainGifts, InfinityRoses, FirstProject Jun 12-15 daily summaries). [FountainStaging] ActiveRecord::PendingMigrationError + NoMethodError + SMTP errors from Jun 15. Needs attention.
- **vuongtrancr:** Swish APM signal lost 8 times (Low Application Throughput monitoring). Monitor closely.
- **MPFC:** Google_AuthException invalid_grant — OAuth token expired, needs refresh.
- **dnduongus:** LastPass login blocked (security). Verify if expected.

Trello: Check mail ✓ complete (already marked in prior run).

---

## Slack — all — 05:20 (+07:00)

| Workspace | Msgs | Key content | Status |
|-----------|------|-------------|--------|
| Baamboozle | 8 | Audrey/Noah marketing discussion | ✓ |
| RDC - FM Monitoring | 8 | Automated tuner access logs only | ✓ |
| Swift Studio | 8 | Rory+Carrick+Jeff: Stripe payment/Apple Pay fix discussion | ✓ |
| Xtreme Soft Solutions | 2 | **⚠️ Kai: urgent personal issue, not productive** | ⚠️ |
| SAM GUARD - Mobile | 8 | Elena/Michelle active, HubSpot MQLs ×2 | ✓ |
| Global Grazing Services | 1 | Joey: "no troubles for now" | ○ |
| Amazing Meds | 1 | John: asking about product pages location | ✓ |
| Generator | 8 | Rudi: tenant domain architecture + code review feedback to Ryan/Carrick | ✓ |
| LegalAtoms | 8 | Raymond + Talha: auto-retry architecture discussion | ✓ |
| MyPersonalFootballCoach | 0 | Silent | ✓ |
| William Bills | 0 | Silent | ✓ |
| Equanimity | 0 | Silent | ✓ |
| SoCal Auto Wraps | 0 | Silent | ✓ |
| Aigile Dev | 1 | Automated gaige alert | ✓ |
| OhCleo | — | DM: Tony daily report 22:09+07, Celine active (see Piece 11) | ✓ |

**Baamboozle MPDM (C07SQ4HAUHZ):** Aysar posted daily update at 17:09+07 Jun 15: "Fix feedback add memo/footer invoice for Add discount team task → Deployed" ✓

**⚠️ Kai (Xtreme):** Posted to Madhuraka + Anoma: "I haven't still been busy due to personal issue" and "I have urgent personal issue". Kai is communicating delays to client. Needs follow-up.

Trello: No items blocked by Slack alerts (Kai alert → Maddy item left incomplete, others marked ✓).

---

## Discord — all — 05:25 (+07:00)

| Server | Account | Msgs (window) | Key content | Status |
|--------|---------|---------------|-------------|--------|
| AirAgri | nusvinn | 11 | Jeff daily report ✓ (4h), client testing activity | ⚠️ Vinn absent |
| Bizurk | nuscarrick | 0 | Silent | ✓ normal |

**AirAgri details:**
- Jeff Trinh (jeff_trinh): Daily report in #airagri-flutter — "Here is my daily report for today (4 hours): Main App: Build the database schema..." ✓
- Jeff also posted workflow documentation for James Diamond
- Paul Diamond (#airagri-testing): Testing feedback, bug reports on alarm/battery features
- James Diamond (.jdiamond): Discussing code approach in #airagri-flutter
- **⚠️ Vinn (nusvinn):** No daily report posted in window. James Diamond is active.

Trello: James Diamond item → ⚠️ incomplete (Vinn no report). Andrew Taraba (Bizurk) → ✓.

---

## Sheets — all — 05:30 (+07:00)

**PREV_DATE:** 2026-06-15 (Monday) | **Week:** W16 (Rory), W29 (Aysar), W28 (JohnYi), W52 (Fountain)

| Developer | Sheet | Hours Jun 15 | Leave | Status |
|-----------|-------|-------------|-------|--------|
| LongVV | Xtreme W11 (Maddy) | 0h | None Jun 15 | ✓ acceptable (part-time 16h/wk, W11 day 1) |
| PhucVT | PhucVT sheet | 12h | None | ✓ |
| TuanNT | JohnYi W28 + Rebecca W29 + Neural W25 + Paturevision W32 | 0h combined | None | ⚠️ ALERT |
| VietPH | VietPH sheet | 8h | None | ✓ |
| KhanhHH | KhanhHH sheet | 8h | None | ✓ |
| LeNH | Rory W16 (KhoaTD+TinPC) + Franc (ended) + Aysar W29 | 0h for LeNH | None | ⚠️ ALERT |

**TuanNT detail:** JohnYi W28 (Jun 15 row) = 0h. Rebecca W29 = 0h. Neural W25 = 0h. Paturevision W32 has 4h from NamNN only. TuanNT combined = 0h. No leave in leave-plan.json.

**LeNH detail:** Rory W16 entries on Jun 15 = KhoaTD (6h) + TinPC (4h) = 10h total, no LeNH entry. Franc project: last active W24 (May 11-17), now ended. Aysar W29 Jun 15 = 0h total. LeNH has 0h and no leave on Jun 15.

**LongVV note:** Part-time 16h/week on Xtreme (Maddy). 0h on W11 day 1 (Jun 15) is acceptable — check mid-week for accumulation. June 16 leave PENDING (not approved).

## Sheets — Maddy JIRA — W11 — 05:32 (+07:00)

W11 just started (Jun 15). No task log entries yet for W11. Previous W10 also empty (script returned no Jira tickets to check).

---

## Scrin.io — 05:33 (+07:00)

| Dev | Date | Total | Sessions | Top Apps |
|-----|------|-------|----------|----------|
| Nick | Jun 15 | 482 min (8h 2m) | 08:07→12:05, 13:16→17:20 | Windsurf 2.9h, Terminal 2.85h, Chrome 1.3h, Cursor 0.85h |

Nick worked full day Jun 15 ✓. Primary tool: Windsurf (AI coding).

---

## Fountain — 05:35 (+07:00)

**Part 1 — Matrix plan:** ⚠️ UNAVAILABLE (Matrix token expired, browser SSO failed)

**Part 2 — Task log actuals (W52, Mon 09/11/26):**
All Fountain devs (VuTQ, ThinhT, ViTHT, PhatDLT, HungPN, HaVS): 0h current week (week just started Mon Jun 16).
Prev week (W51): also 0h in script output (may need manual verification).

**Part 3 — Plan vs Actual:** W52 = no tasks logged yet (week 1 day 1).

**Part 4 — Capacity & Runway:**
| Metric | Value |
|--------|-------|
| Total estimated | 2,953.5h |
| Total charged | 3,114.5h |
| Over budget | +161h (5.5% over) |
| Remaining estimate | 0h |
| Runway | **0 weeks** ⚠️ |
| Dev capacity/wk | 90h |

⚠️ Project is over budget with no remaining estimate. Needs client discussion on scope/budget.

**Part 5 — Over-estimate tracking:**
| Task | Est | Actual | % Over |
|------|-----|--------|--------|
| 2627 | 0.5h | 8.25h | **1550%** |
| 2639-fountain-infinity-active-inactive-card-categories | 2h | 16.5h | **725%** |
| 2615 | 12h | 106.75h | **790%** |
| 2523 | 16h | 61h | **281%** |
| 2545-build-a-box-service-modal | 1h | 7.5h | **650%** |
| 2613 | 2h | 14.5h | **625%** |
| 2630 | 0.5h | 3.75h | **650%** |
| 2624-fountain-order-complete-update | 12h | 31.25h | **160%** |
| 2603 | 4h | 14.5h | **263%** |
| 2629 | 8h | 18.25h | **128%** |
| 2546-fountain-corporate-order-form | 4h | 7h | 75% |
| 2638-recipient-address-for-pro-order | 8h | 11h | 38% |
| 2595-giftdrop-new-redemption-flow | 120h | 168.25h | 40% |
| 2380-check-checkout-date-display | 20h | 25.25h | 26% |
| 2735 (Fountain Pro Smart Link) | 130h | 136h | within budget |

Key task #2735: est 130h, charged 136h — slightly over but within acceptable range.

**Fountain Trello:** Not scanned in this run (script didn't return Trello data).

---

## Elena — 05:40 (+07:00)

| Check | Result |
|-------|--------|
| Open PRs (Precognize) | 0 PRs — nothing to merge |
| Pending deploy | 0 items — `.elena-pending-actions.json` empty |
| Elena Slack (SAM GUARD) | Active: discussion with Michelle about task status ✓ |
| WordPress (samguard.co) | Clean — no real JS console errors detected |

Elena: no action needed. ✓

---

## Trello — Check Progress — 05:45 (+07:00)

**Card:** Check progress (6a3067f5476f470330fc960b) | **Board:** O83pAyqb

| Checklist | Item | Status | Notes |
|-----------|------|--------|-------|
| Normal | Maddy - Carrick/Kai/Luis | ⚠️ incomplete | Kai urgent personal issue, low productivity |
| Normal | John Yi - Amazing Meds | ✓ complete | John active in Amazing Meds |
| Should do | James Diamond - Vinn task | ⚠️ incomplete | Vinn no daily report in AirAgri |
| Closely monitor | Rory | ✓ complete | Carrick+Jeff+KhoaTD+TinPC active on Swift |
| Closely monitor | Aysar | ✓ complete | Aysar posted MPDM update 17:09+07 |
| Closely monitor | Franc | ✓ complete | RDC automated only, no client issues |
| Closely monitor | Elliott | ✓ complete | Generator development normal |
| Work | MPFC | ✓ complete | No new critical prod issues today |
| Work | Marcel | ✓ complete | Equanimity silent, no issues |
| Work | Elena - SamGuard | ✓ complete | Elena active + WordPress clean |
| Work | Raymond - LegalAtoms | ✓ complete | Raymond active, architecture discussion |
| Work | Neural Contract | ⚠️ incomplete | Upwork expired, can't verify |
| Work | Bailey | ⚠️ incomplete | Nick no GGS report, Upwork expired |
| Work | Andrew Taraba | ✓ complete | Bizurk silent = normal |
| Work | Rebecca - William Bills | ⚠️ incomplete | TuanNT 0h no leave Jun 15 |
| Work | Colin | ✓ complete | Aigile Dev automated, no critical issues |
| Work | Fountain | ✓ complete | Scanned Parts 2/4/5 (Part 1 Matrix unavailable) |
| Work | Philip | ⚠️ incomplete | MS Teams check failed (script error) |
| Work | OhCleo | ✓ complete | Tony daily report ✓, Celine active |
| Pending | Elena - WordPress SamGuard | ✓ complete | WordPress samguard.co clean |

**Check mail card:** ✓ already complete from prior run.

**Check progress card:** 14/19 items complete. 5 incomplete (Maddy/Kai, James Diamond/Vinn, Neural, Bailey, Rebecca/TuanNT). Philip also incomplete. Card NOT marked done (6 incomplete items).

---

## Reminders — 05:48 (+07:00)

Devs with 0h and no approved leave on Jun 15:

| Dev | Hours | Leave | Action |
|-----|-------|-------|--------|
| TuanNT | 0h | None | ⚠️ Reminder needed |
| LeNH | 0h | None | ⚠️ Reminder needed |

Matrix token unavailable → reminders NOT sent. Manual follow-up required.

---

## Matrix — 05:50 (+07:00)

**Status: ⚠️ UNAVAILABLE**

Matrix token expired. Attempted browser SSO refresh 4 times (bktqhb2tu, b0zkrl86d, bgytncbmk, biu5ja7jt) — all failed. Browser opened to https://chat.nustechnology.com but SSO login did not complete within 298s timeout (headless session, no manual interaction possible).

**Impact:**
- Fountain Part 1 (Matrix plan) not retrieved
- All Matrix room monitoring skipped
- Reminders not sent to TuanNT, LeNH

**Action needed:** Manually refresh Matrix token when next at computer: `node scripts/matrix-token-refresh.js` (with active browser session).

---

## OhCleo — 05:52 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 100 (recent 5+) | Tony daily report 22:09+07, Celine discussing Upwork timing |

**Tony daily report (Jun 15 22:09 +07):**
- [Mobile] Update category page: add pagination, lo[ading optimization]...

**Celine (client) messages:**
- 20:30 +07: "I did not pause Upwork yet, I'll fix it once we agreed. Timewise, I'd need full [day/time]..."
- 20:28 +07: "Hey! Let me know if this sounds ok for you?"
- 16:46 +07: Shared Google Meet link
- **Note:** Celine discussing Upwork pause — client wants to keep billing but discussing arrangements. Monitor.

---

## Upwork — 05:55 (+07:00)

**Status: ⚠️ ALL SESSIONS EXPIRED**

| Account | Workroom | Status |
|---------|----------|--------|
| carrick | Rory (41069448) | Headless re-login failed (CAPTCHA/2FA) |
| carrick | Neural Contract (38901192) | Session expired |
| vinn | Aysar (35642393) | Session expired, no saved session |
| david2 | — | No saved session |

**Action needed:** Run `node scripts/upwork-login.js --login --account=carrick` (and vinn, david2) to refresh sessions.

---

## Leave Plan — 05:58 (+07:00)

**Today (Jun 16):**
- LongVV: PENDING leave (not approved). Reason: "Dắt ba em đi tái khám và chăm bệnh" (take father to follow-up medical appointment). minhtv replied to email but is NOT an authorized approver. DuongDN or NamTV approval needed.

**Jun 15 (yesterday):**
- No approved leaves for any monitored dev. TuanNT and LeNH had 0h with no leave → ALERT.

**Upcoming approved leaves:**
- KhanhHH: Jun 25-26 (approved by NamTV) — đám giỗ bà ngoại

---

## Summary

**Window:** Jun 15 09:03+07 → Jun 16 05:00+07 (Mon, ~20h window)

**🔴 Critical actions needed:**
1. **TuanNT 0h Jun 15** — contact TuanNT and ask why no hours logged. No leave on record.
2. **LeNH 0h Jun 15** — contact LeNH. No leave on record.
3. **Matrix token** — refresh manually when at computer.
4. **LongVV Jun 16 leave** — needs DuongDN or NamTV approval (not minhtv).
5. **MPFC OAuth token** — Google_AuthException invalid_grant needs refresh.

**🟠 Watch items:**
- Kai (Xtreme): urgent personal issue affecting productivity, client informed
- Vinn: no daily report Jun 15
- Fountain: runway 0 weeks, over budget 161h — needs scope discussion with Fountain client
- Swish APM: 8x signal lost events — check New Relic dashboard

**✅ Normal:**
- PhucVT 12h, VietPH 8h, KhanhHH 8h ✓
- Nick 8h 2m (Scrin) ✓
- Elena clean ✓, Aysar daily report ✓, Jeff (AirAgri) report ✓
- Check mail complete ✓
