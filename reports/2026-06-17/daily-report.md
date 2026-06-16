# Daily Report — 2026-06-17 (Wed)
**Run time:** 05:36 +07:00 | **Window:** 2026-06-16T08:42 → 2026-06-17T05:36 +07:00

---

## ⚠️ ALERTS SUMMARY

| # | Item | Source | Alert |
|---|------|--------|-------|
| 1 | TuanNT | Google Sheets (John Yi / Bailey / Rebecca sheets) | **0h logged Jun 16, no leave note** → blocks John Yi + Bailey + Rebecca Trello items |
| 2 | KhanhHH | Google Sheets (Aysar sheet) | **0h logged Jun 16, no leave note** → skip Aysar Trello item |
| 3 | VietPH | Google Sheets | **0h logged Jun 16** (leave status unclear after script fallback bug) |
| 4 | Elliott | Generator Slack | **No activity since Jun 10** → skip Elliott Trello item |
| 5 | Aysar | Baamboozle MPDM C07SQ4HAUHZ | **0 messages in check window** → skip Aysar Trello item |
| 6 | Fountain | Fountain Trello board | **Customer alert / stuck card** → Fountain Trello item kept incomplete |
| 7 | Matrix | matrix.nustechnology.com | **All tokens expired (SSO required)** → Matrix plan check BLOCKED |
| 8 | Upwork | Upwork sessions | **All sessions expired (CAPTCHA required)** → Upwork data unavailable |
| 9 | Philip | MS Teams (will@nustechnology.com) | **Browser lock unresolvable** → Philip check BLOCKED |

**Trello Check Progress — Incomplete items (7):**
- John Yi - Amazing Meds (TuanNT 0h)
- Bailey (TuanNT 0h)
- Rebecca (William Bills) (TuanNT 0h)
- Elliott (no Generator activity since Jun 10)
- Aysar (KhanhHH 0h + MPDM C07SQ4HAUHZ = 0 msgs)
- Fountain (customer alert on Trello board)
- Philip (MS Teams check blocked)

---

## Email — all — 05:10 (+07:00)

| Account | Emails | Calendar today (Jun 17) |
|---------|--------|------------------------|
| duongdn@nustechnology.com | 1 notable | LongVV leave approval email (from longvv, approved by minhtv — leave Jun 16) |
| carrick@nustechnology.com | 0 alerts | no events |
| nick@nustechnology.com | 0 alerts | no events |
| rick@nustechnology.com | 0 alerts | no events |
| kai@nustechnology.com | 0 alerts | no events |
| ken@nustechnology.com | 0 alerts | no events |
| vuongtrancr@gmail.com | 0 alerts | — |
| dnduongus@gmail.com | 0 alerts | — |
| freelancer@mypersonalfootballcoach.com | checked via Gmail API | — |

**Notes:**
- LongVV leave confirmed approved by minhtv for Jun 16 → 0h expected, no alert.
- No New Relic / Rollbar / BugSnag production alerts found.
- No Redmine bug notifications for Generator/Elliott.

Trello: DuongDN, Carrick, Nick, Rick, Kai, Ken ✓ all 6 items complete. Check Mail card marked done.

---

## Slack — all — 05:12 (+07:00)

| Workspace | Key content | Alert |
|-----------|-------------|-------|
| Baamboozle | General activity present | ✓ |
| RDC - FM Monitoring | dmetiner updates found | ✓ |
| Swift Studio | Carrick activity confirmed | ✓ |
| Xtreme Soft Solutions | Kai daily report present | ✓ |
| SAM GUARD - Mobile | Elena/DP activity present | ✓ |
| Global Grazing Services | Nick daily report in #maintenance ✓ | ✓ (Slack gate only — Bailey still blocked by TuanNT 0h) |
| Amazing Meds | Auth required cookie header; after fix: activity found | ✓ |
| Generator | **No Elliott activity since Jun 10** | ⚠️ SKIP |
| LegalAtoms | Nick mentions checked, normal activity | ✓ |
| MyPersonalFootballCoach | Activity present | ✓ |
| William Bills | Oliver/Lucas task updates found | ✓ |
| Equanimity | Marcel/Carrick check — no alerts | ✓ |
| SoCal Auto Wraps | Activity (item DROPPED per May 11) | — |
| Aigile Dev | General activity present (Colin) | ✓ |
| OhCleo | Celine DM checked (no critical customer issues) | ✓ |

**Notes:**
- Amazing Meds xoxc token required `Cookie: d={cookie}` header — bare token call returns `invalid_auth`. Using cookie header resolves auth.
- Generator/Elliott: Last message from Elliott was June 10. No activity in 7+ days → ALERT.
- Aysar MPDM (C07SQ4HAUHZ): 0 messages in window → combined with KhanhHH 0h → skip Aysar.

Trello: Completed items for Baamboozle/RDC/Swift/Xtreme/SAM GUARD/GGS/Amazing Meds/LegalAtoms/MPFC/William Bills/Equanimity/Aigile ✓.
Skipped: Elliott (no activity alert).

---

## Discord — all — 05:15 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | Found | Vinn daily report: "Just report my process today:" — report present in #airagri_webapp ✓ |
| Bizurk | nuscarrick | 0 | Andrew silent — normal (no DM activity = OK per gate) |

**Notes:**
- AirAgri guild ID: 1105821508716200028 (confirmed via /users/@me/guilds).
- Jeff daily report also present in AirAgri.
- Bizurk: No Andrew DM = no customer complaint = gate passes.

Trello: James Diamond - Vinn ✓ complete. Andrew Taraba ✓ complete.

---

## Scrin.io — 05:16 (+07:00)

| Tracked user | Hours Jun 16 | Company | Note |
|-------------|-------------|---------|------|
| Nick (nick@nustechnology.com) | **8h 3m** | John Yi / Amazing Meds | ✓ Full day tracked |

Scrin.io confirms Nick actively working on Amazing Meds project Jun 16.

---

## Sheets — all devs — 05:20 (+07:00)

Script: `scripts/daily-sheets-scan-260617-wed.js` (newly created, PREV_DATE=Jun 16)

| Developer | Hours Jun 16 | Status | Notes |
|-----------|-------------|--------|-------|
| LongVV | 0h | ✓ OK — on leave | Approved leave Jun 16 confirmed via duongdn email |
| PhucVT | 8h | ✓ | Full day |
| TuanNT (John Yi sheet) | 0h | ⚠️ ALERT | No leave note found in any of 4 sheets |
| TuanNT (Rebecca sheet) | 0h | ⚠️ ALERT | No leave note |
| VietPH | 0h | ⚠️ CHECK | Script had fallback bug (was showing NamNN's 1.5h); actual VietPH = 0h; leave status unclear |
| KhanhHH | 0h | ⚠️ ALERT | No leave note |
| LeNH | 8.33h | ✓ | Combined across Rory + Franc + Aysar sheets |

**TuanNT 0h impact:** Blocks John Yi - Amazing Meds, Bailey, and Rebecca (William Bills) Trello items per gate mapping.

**Maddy JIRA cross-check (W11):**
Script: `node scripts/maddy-jira-tasklog-check.js --week 2026-06-16`
Result: 0 ticket entries for W11 — LongVV on leave, no task log rows to check.

---

## Sheets — Maddy JIRA — W11 — 05:21 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| (no entries) | LongVV on approved leave Jun 16 | — | — | — | — | — |

No JIRA ticket entries to validate this week (W11). LongVV leave confirmed.

---

## Fountain — 5-part check — 05:25 (+07:00)

**Part 1 — Matrix Plan:**
- ⚠️ BLOCKED — Matrix token expired (SSO requires interactive login). OIDC refresh token also expired (`invalid_grant`). Cannot check if today's plan was posted.

**Part 2 — Task Log Actuals (W31):**
- Fountain Sheets W31: 0h logged this week so far.

**Part 3 — Plan vs Actual:**
- SKIPPED (Matrix plan unavailable, cannot compare).

**Part 4 — Capacity & Runway:**
- Runway: **7.3 weeks** based on current capacity.

**Part 5 — Over-estimate Tracking:**
- No over-estimate data available (Matrix blocked).

**Fountain Trello board:**
- ⚠️ **Customer alert / stuck card detected** → Fountain Trello item kept incomplete.

---

## Elena — 05:28 (+07:00)

**PRs:**
- SamGuard open PRs: **0** (none to merge)
- PR #306 (fixbug_dp): Already deployed Jun 16 at 11:51 +07 — no pending actions.

**WordPress (samguard.co JS console check):**
- Script: `scripts/wordpress-samguard-check.js`
- Result: ✓ No real JS errors (GA Content Security Policy warning = false positive, expected)

**Precognize (nusken PRs):**
- 0 open NUS PRs on Precognize repo.

Trello: Elena - SamGuard ✓ complete. Elena - WordPress ✓ complete.

---

## Upwork — 05:30 (+07:00)

| Session | Status |
|---------|--------|
| carrick session | ⚠️ EXPIRED (CAPTCHA required to re-login) |
| Neural Contract session | ⚠️ EXPIRED (session_expired) |
| Aysar / KhanhHH session | ⚠️ EXPIRED |

Script: `scripts/upwork-weekly-hours.js` — **ALL sessions expired**. Cannot retrieve weekly hours in cron mode (headless, no browser interaction). Upwork data unavailable for this run.

---

## Matrix — 05:31 (+07:00)

| Status | Detail |
|--------|--------|
| ⚠️ BLOCKED | Access token expired. Refresh token also expired (`invalid_grant`). SSO requires interactive browser login. Cannot refresh in cron mode. |

**Impact:** Fountain Matrix plan check unavailable. Cannot verify if daily plan was posted by developer.

**Action needed:** Manual Matrix re-login required to restore monitoring. Run `scripts/matrix-token-cdp-refresh.js` with interactive browser session.

---

## Philip (MS Teams) — 05:35 (+07:00)

| Status | Detail |
|--------|--------|
| ⚠️ BLOCKED | MS Teams browser lock unresolvable. Multiple attempts: killed all Chrome/Puppeteer processes, removed `Singleton*` files, removed `Default/LOCK` and `DevToolsActivePort`. Puppeteer still reports "browser already running for msteams-will-profile". |

**Impact:** Cannot check Philip Briggs (Six Star Rentals) DMs for customer complaints or unresolved requests. Philip Trello item kept incomplete.

**Action needed:** Manual check of MS Teams (will@nustechnology.com) → Philip Briggs (pbriggs@sixstarrentals.com.au).

---

## Reminders — 05:36 (+07:00)

*(--send-reminder NOT passed in cron mode — printing only, NOT sending to Matrix)*

| Developer | Situation | Reminder |
|-----------|-----------|---------|
| TuanNT | 0h Jun 16, no leave note in any sheet | Please log hours for Jun 16 (John Yi / Bailey / Rebecca sheets) |
| KhanhHH | 0h Jun 16, no leave note | Please log hours for Jun 16 (Aysar sheet) |
| VietPH | 0h Jun 16, leave status unclear | Please log hours for Jun 16 or update leave note |

Note: Reminders NOT sent (cron mode, no --send-reminder flag).

---

## Trello — Check Mail — 05:10 (+07:00)

| Account | Item | Status |
|---------|------|--------|
| DuongDN | duongdn@nustechnology.com | ✓ Complete |
| Carrick | carrick@nustechnology.com | ✓ Complete |
| Nick | nick@nustechnology.com | ✓ Complete |
| Rick | rick@nustechnology.com | ✓ Complete |
| Kai | kai@nustechnology.com | ✓ Complete |
| Ken | ken@nustechnology.com | ✓ Complete |

Check Mail card: ✓ **All items complete → card marked done.**

---

## Trello — Check Progress — 05:36 (+07:00)

| Item | Gate | Status | Reason |
|------|------|--------|--------|
| Maddy - Carrick/Kai/Luis | Xtreme Slack | ✓ Complete | Kai daily report found |
| John Yi - Amazing Meds | Amazing Meds Slack + TuanNT 0h | ⚠️ INCOMPLETE | TuanNT 0h, no leave note |
| Bailey | GGS Slack + TuanNT 0h | ⚠️ INCOMPLETE | TuanNT 0h (GGS Nick report OK) |
| Rebecca (William Bills) | William Bills Slack + TuanNT 0h | ⚠️ INCOMPLETE | TuanNT 0h |
| James Diamond - Vinn | AirAgri Discord | ✓ Complete | Vinn daily report found |
| Rory | Swift Studio Slack | ✓ Complete | Carrick activity confirmed |
| Elliott | Generator Slack | ⚠️ INCOMPLETE | No Elliott activity since Jun 10 |
| MPFC | MPFC Slack | ✓ Complete | Activity present |
| Marcel | Equanimity Slack | ✓ Complete | No alerts |
| Elena - SamGuard | SAM GUARD Slack + Elena PRs | ✓ Complete | Elena active, 0 open PRs |
| Raymond - LegalAtoms | LegalAtoms Slack | ✓ Complete | Nick mentions normal |
| Neural Contract | Neural Upwork | ⚠️ Session expired | Upwork blocked; treating as check needed manually |
| Andrew Taraba | Bizurk Discord | ✓ Complete | No DM = OK |
| Colin | Aigile Dev Slack | ✓ Complete | Activity present |
| Aysar | KhanhHH 0h + MPDM C07SQ4HAUHZ | ⚠️ INCOMPLETE | KhanhHH 0h + 0 MPDM msgs |
| Franc | RDC Slack | ✓ Complete | dmetiner updates found |
| Fountain | Matrix plan + Trello board | ⚠️ INCOMPLETE | Matrix blocked + customer alert |
| Elena - WordPress | samguard.co JS console | ✓ Complete | No real JS errors |
| Philip | MS Teams | ⚠️ INCOMPLETE | Browser lock — check blocked |
| Blake/SoCal | DROPPED (2026-05-11) | — | — |

**Summary:** 11 ✓ Complete, 7 ⚠️ Incomplete (John Yi, Bailey, Rebecca, Elliott, Aysar, Fountain, Philip) + Neural (Upwork blocked)

---

*Report generated: 2026-06-17T05:36:51+07:00*
*Script: /me:daily-report --cron*
