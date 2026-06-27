# Daily Report — 2026-06-28 (Sunday)

**Run:** 2026-06-28T05:00+07:00 (cron)
**Window:** 2026-06-27T00:00+07:00 → 2026-06-28T05:00+07:00
**Leave plan:** Carrick on personal leave until next Mon (Jun 30) — announced Jun 25 in Baamboozle MPDM

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | GGS (Slack) | Nick maintenance report Jun 26: WARNING — nightly memory spikes 14+ days, Redis connection failures recurring |
| 2 | MPFC (Email ken@) | OAuth2 invalid_grant recurring (Rollbar — known issue, unresolved) |
| 3 | MPFC (Email ken@) | New Relic weekly perf reports (Jun 15, Jun 22) — informational |
| 4 | Fountain | Matrix token expired — Part 1 (weekly plan) unavailable; 5 consecutive weeks 0h task log |
| 5 | Fountain | #2615 (parent of 2695): 12h est → 106.75h actual (+790%), Deployed on Staging |
| 6 | AirAgri Discord | nusvinn token expired — Vinn/Jeff daily report unchecked |
| 7 | Equanimity (Slack) | Komal (SGBuildex) asking about go-live while Carrick is on leave — pending Carrick return |

**Today (Sun Jun 28):** Weekend — Vietnamese devs not working (all 0h sheets expected). Carrick on leave until Mon Jun 30.

---

## Email — all — 05:02 (+07:00)

| Account | Emails (window) | Alerts | Calendar today |
|---------|-----------------|--------|----------------|
| duongdn@nustechnology.com | 49 total (last since Jun 9) | Leave requests: LongVV (Jun 16), PhatDLT (Jun 3), DatNC, others — all old | no events |
| carrick@nustechnology.com | — (IMAP auth fail) | — | — |
| nick@nustechnology.com | — (IMAP auth fail) | — | — |
| rick@nustechnology.com | — (IMAP auth fail) | — | — |
| kai@nustechnology.com | — (IMAP auth fail) | — | — |
| ken@nustechnology.com | 50 total | MPFC Rollbar OAuth2 invalid_grant (Jun 12, known); New Relic weekly reports (Jun 15, Jun 22) | DE - Daily Standup 08:30–08:45; DE - Tech Talks 09:00–10:00; DE - Bi-weekly Retrospective 09:00–10:20 |
| vuongtrancr@gmail.com | 50 total | No new Swish/APM production alerts in window | — |
| dnduongus@gmail.com | 50 total | No security alerts | — |
| freelancer@mypersonalfootballcoach.com | 22 (Gmail API) | No client emails from Adam/MPFC team | — |

**Note:** carrick/nick/rick/kai Zoho IMAP returning `Invalid credentials` — app passwords may need rotation. duongdn and ken auth OK.

Trello: Check Mail — all 6 items already ✓ complete (pre-completed from previous run).

---

## Slack — all — 05:08 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 49 | Carrick announced leave until Mon Jun 30 (MPDM Jun 25); skjamie25 requesting PR reviews from Aysar (Jun 24); no Aysar "Today's update" (expected — Carrick on leave) |
| RDC - FM Monitoring | 49 | Automated Tuner Instability/Recovery alerts Jun 27 (15:00, 14:57, 14:56, 14:55 UTC); no dmetiner human updates |
| Swift Studio | 0 | No activity |
| Xtreme Soft Solutions | 7 | Kai daily report Jun 26: LIFM2-446 (Row-Locking in Quoting Tool → Done). madhuraka asking about image ordering Jun 23. ✓ |
| SAM GUARD - Mobile | 36 | Elena (lena) + michelle active Jun 25 on #process-digital-plant ("All done", "update statuses"); multiple MQL leads Jun 24-25 (HubSpot) |
| GLOBAL GRAZING SERVICES | 31 | Nick maintenance report Jun 26: **WARNING — nightly memory spikes 14+ days, Redis connection failures recurring**; Joey reporting bug Jun 25 (amy investigating) |
| Amazing Meds | 1 | Nick sent referral request to John Yi contact (routine outreach, not substantive activity) |
| Generator | 50 | Violet tested deeplink fix Jun 26 ✓; Elliott active Jun 24 in #release; Carrick/Ryan out this week (Violet handling) |
| LegalAtoms | 23 | raymond + armaghaniqbal active Jun 22 in #tyler-journal (hotfix deployment); no Nick-specific mentions in window |
| MyPersonalFootballCoach | 3 | Messages Jun 23 (freelancer, empty text) |
| William Bills | 15 | oliver + lucas active Jun 25-26 (WordPress credentials/cPanel access troubleshooting) |
| Equanimity | 7 | ⚠️ Komal (komal.bailur) asking about XID Technologies go-live while Carrick on leave; Carrick confirmed leave Jun 26 ("I leave until next Monday, sorry for inconvenience") |
| Aigile Dev | 21 | Colin + Hendrix planning ETZ deployment to prod on Mon Jun 29; no issues |
| Baamboozle MPDM C07SQ4HAUHZ | 4 | Last Carrick update was Jun 24 "Monday's update" (Aysar tasks); Jun 25: Carrick leave notice |

Trello Check Progress:
- Maddy - Carrick/Kai/Luis ✓ (Kai report Jun 26 present)
- Rory ✓ (Swift Studio quiet, no alert — completed)
- Aysar ✓ (Carrick on planned leave, no update expected)
- Franc ✓ (RDC automated alerts only, no dmetiner human alert)
- Elliott ✓ (pre-complete)
- MPFC ✓ (no new activity — completed)
- Marcel ✓ (no Marcel/Carrick alert — completed; Komal go-live pending Carrick return noted)
- Elena - SamGuard ✓ (active Jun 25, 0 open PRs — completed)
- Raymond - LegalAtoms ✓ (no Nick-specific alert — completed)
- Neural Contract ✓ (completed — silence never alerts)
- Bailey ✓ (Nick report present, TuanNT weekend 0h expected — completed)
- Andrew Taraba ✓ (nuscarrick valid, no DMs — completed)
- Rebecca - William Will ✓ (pre-complete)
- Colin - performance ✓ (pre-complete)
- Ohcleo ✓ (weekend, no activity expected — completed)
- Elena - WordPress SamGuard ✓ (samguard.co clean — completed)
- James Diamond - Vinn task ○ (nusvinn Discord token expired — cannot verify)
- Fountain - DOCUMENT ○ (Matrix plan blocked + 5 weeks no task log)
- Philip ○ (MS Teams Microsoft identity challenge — recurring blocker)

---

## Discord — 05:10 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | — | Token expired (401 on users/@me verified) — Vinn/Jeff daily report unchecked |
| Bizurk | nuscarrick | 0 | No messages; no Andrew Taraba DMs |

Trello: James Diamond ○ (nusvinn token expired — cannot verify); Andrew Taraba ✓ (no DMs = OK)

---

## Scrin.io — 05:11 (+07:00)

**Scrin.io (TuanNT / John Yi — 2026-06-27):** 0h — no sessions recorded.
*(Expected: Saturday is a weekend day — TuanNT does not work Saturdays.)*

---

## Sheets (Task Log) — 05:12 (+07:00)

| Developer | Today (Jun 27 Sat) | Status |
|-----------|-------------------|--------|
| LongVV | 0h | ✓ Weekend (0h/day normal, 16h/wk target) |
| PhucVT | 0h | ✓ Weekend |
| TuanNT | 0h (combined) | ✓ Weekend |
| VietPH | 0h | ✓ Weekend |
| KhanhHH | 0h (combined) | ✓ Weekend |
| LeNH | 0h (combined) | ✓ Weekend |

All 0h on Saturday — expected, no alerts. Workstream token expired (SSO failed); sheets-only results.

**Maddy JIRA — W12 (week containing Jun 27):**
| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-445 | Update Price Action button - Listed Cons | Testing - Anoma | 2h | 1h | 1h | ✅ |
| LIFM2-428 | [Shopify] Product Authenticity Certificate | Review | 44h | 39h 15m | 7h | ✅ |
| LIFM2-446 | Implement Row-Locking in Quoting Tool | Review | 12h | 8h | 8h | ✅ |

All 3 tickets OK ✅

Trello: John Yi ✓ (pre-complete); Bailey ✓ (weekend 0h expected); Rebecca ✓ (pre-complete)

---

## Fountain — 05:15 (+07:00)

**Part 1 — Matrix Plan:** Unavailable — Matrix token expired, SSO refresh failed (browser login timeout). Previous week plan not fetchable. Same issue as Jun 27 report.

**Part 2 — Task Log Actuals (W32, Jun 22–28):**
⚠️ **ALL DEVS SHOW 0h in W32** — 5 consecutive weeks (W28 May 25–31 was last active: 164h; W29–W32 all 0h). Fountain team has not logged in the Google Sheet task log since late May.

| Week | Period | Actual hours |
|------|--------|-------------|
| W28 | May 25–31 | 164.00h |
| W29 | Jun 1–7 | 0.00h |
| W30 | Jun 8–14 | 0.00h |
| W31 | Jun 15–21 | 0.00h |
| W32 | Jun 22–28 | 0.00h |

**Part 3 — Plan vs Actual:** Cannot compute (no task log data + Matrix plan unavailable).

**Part 4 — Capacity & Runway (Est vs Charged):**
- Total tasks tracked: 96 | Active (not Deployed on Live/Cancelled/Tested on Live): 73
- Total remaining (active): **529.00h**
- Key active tasks with remaining:
  - 2954: 80h remaining | 2913: 51.3h | 2912: 38h (In-progress <50%) | 2775: 38.8h (Not Started)
  - 2587_giftdrop_redemption: 36.5h (Pending) | 1178-fountain-infinity: 40h (Not Started)
  - 2885: 23h (In-progress <50%) | 2870: 16.8h (In-progress >50%) | 2869: 11.3h
  - 2633-fountain-pro-template: 4h remaining (In-progress >50%)
  - 2553-fountain-create-account: 20.5h (Dev Done — may need deploy)
- Runway: Matrix capacity unknown (token expired — cannot derive weekly dev hours from plan)
- Delta vs yesterday: Remaining hours similar (no new task log hours logged on weekend)

**Part 5 — Over-estimate Tracking:**
| Task | Est (I+J) | Actual | Δ% | Status |
|------|-----------|--------|-----|--------|
| 2615 | 12h | 106.75h | +790% | Deployed on Staging ⚠️ still high |
| 2595 | 120h | 168.25h | +40% | Deployed on Staging |
| 2702 | 8h | 25.5h | +219% | In-progress (>50%) — growing |
| 2639 | 2h | 16.5h | +725% | Deployed on Staging |
| 2523 | 16h | 61h | +281% | Deployed on Live |
| 2872 | 32h | 46.25h | +45% | In-progress (>50%) — growing |
| 2816 | 20h | 44.25h | +121% | Deployed on Staging |
| 2735 | 130h (90+40 CR) | 136h | +4.6% | In-progress (>50%) — within threshold |

Key tasks:
- **#2615**: est 12h, actual 106.75h (+790%) — Deployed on Staging. Charged 30.5h. Critical over-est.
- **#2735**: est 130h (90+40CR), actual 136h (+4.6%) — In-progress (>50%). Just over but with CR included it's marginal.

**Fountain Trello board (Rick's):** API returned 401 (Rick's board requires separate Trello credentials not in default config — cannot check this run).

Trello: Fountain ○ (Matrix plan blocked, 5 weeks no task log, incomplete)

---

## Elena — 05:18 (+07:00)

**Open PRs:** 0 (last run Jun 23, nothing pending)
**Pending actions:** All previous PRs deployed (last deploy: PR #307 Jun 19)
**WordPress SamGuard (samguard.co):** ✅ Clean — no JS errors, no page errors. CSP violations are Google Analytics false positives (expected).

Trello: Elena - SamGuard ✓; Elena - WordPress SamGuard ✓

---

## Upwork — 05:20 (+07:00)

All Upwork sessions expired (carrick/vinn/david2). Headless re-login failed (CAPTCHA/2FA required).
- **Neural Contract (38901192):** No session — silence never alerts. ✓
- **Rory workroom (41069448):** Cannot check (carrick session expired)
- **Aysar workroom (35642393):** Cannot check (vinn session expired)

*(Weekend — no new hours expected regardless)*

Trello: Neural Contract ✓ (completed — silence never alerts)

---

## OhCleo Slack — 05:21 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | No messages since Jun 27 |
| #events-code | — | Channel not found (ID may have changed) |

Tony daily report: absent (weekend — expected)
No customer messages from Celine. No alerts.

Trello: Ohcleo ✓ (weekend, no activity expected)

---

## Philip (MS Teams) — 05:22 (+07:00)

Microsoft identity challenge blocking headless login (Loop 24+ "Help us protect your account"). Same blocker as Jun 27 report. Cannot check Philip Briggs DMs.

Trello: Philip ○ (MS Teams login blocked — recurring)

---

## Matrix — 05:22 (+07:00)

Matrix token expired (M_UNKNOWN_TOKEN). SSO browser refresh failed (ETIMEDOUT after 5min wait). Cannot scan rooms or send reminders.

**Active rooms: 0 (token expired)**
**Known pending items from previous reports:**
- Fountain weekly plan: last fetchable was week of Jun 16 (TrinhMTT typically posts Mon 08:30-09:30)
- Any action items for DuongDN: cannot check

---

## Reminders — 05:23 (+07:00)

**Today is Sunday — no task log reminders sent.** All devs have 0h (weekend), which is expected. No Matrix sends.

---

## Trello Summary — 05:24 (+07:00)

### Check Progress Card (`6a3ee88df76d60931a7f9ba7`)

| Checklist | Item | Status | Gate |
|-----------|------|--------|------|
| Normal | Maddy - Carrick/Kai/Luis | ✓ | Kai report Jun 26 |
| Normal | John Yi - Amazing Meds | ✓ | pre-complete |
| Should do | James Diamond - Vinn task | ○ | nusvinn token expired |
| Closely Monitor | Rory | ✓ | Swift quiet = OK |
| Closely Monitor | Aysar | ✓ | Carrick on leave |
| Closely Monitor | Franc | ✓ | No dmetiner alert |
| Closely Monitor | Elliott | ✓ | pre-complete |
| Work | MPFC | ✓ | No new activity |
| Work | Marcel | ✓ | No Marcel/Carrick alert |
| Work | Elena - SamGuard | ✓ | Active Jun 25, 0 PRs |
| Work | Raymond - LegalAtoms | ✓ | No Nick alert |
| Work | Neural Contract | ✓ | Silence = OK |
| Work | Bailey | ✓ | Nick report + weekend 0h |
| Work | Andrew Taraba | ✓ | No DMs = OK |
| Work | Rebecca - William Will | ✓ | pre-complete |
| Work | Colin - performance | ✓ | pre-complete |
| Work | Fountain - DOCUMENT | ○ | Matrix + task log blocked |
| Work | Philip | ○ | MS Teams blocked |
| Work | Ohcleo | ✓ | Weekend, no msgs |
| Pending | Elena - WordPress SamGuard | ✓ | samguard.co clean |

**Check Progress: 17/20 complete** (3 incomplete: Vinn, Fountain, Philip)
**Check Mail: 6/6 complete** ✓ (pre-completed)

---

## Auth Issues Requiring Manual Action

| Service | Issue | Action needed |
|---------|-------|--------------|
| Matrix | access_token expired, SSO refresh ETIMEDOUT | Manual SSO login: `DISPLAY=:1 node scripts/matrix-token-refresh.js` |
| Discord nusvinn | Token 401 (AirAgri) | Open Chrome Profile 19, log in to Discord manually |
| Upwork carrick/vinn/david2 | All sessions expired | Manual login (CAPTCHA/2FA required) |
| MS Teams (will@) | Microsoft identity challenge (25+ loops) | Manual browser verification |
| Zoho IMAP carrick/nick/rick/kai | `Invalid credentials` | App password rotation or re-generation in Zoho Admin |
| Workstream | Token expired, SSO failed | `DISPLAY=:1 node scripts/workstream-login.js` |

*Report generated: 2026-06-28T05:24+07 (automated cron)*
