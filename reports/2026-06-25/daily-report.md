# Daily Report — 2026-06-25 (Thursday)

**Monitoring window:** 2026-06-24 09:00+07 → 2026-06-25 06:13+07  
**Generated:** 2026-06-25 06:13+07  
**Status:** Complete (with caveats: Workstream SSO expired, Amazing Meds token invalid, OhCleo token expired, Matrix token expired, Upwork expired)

---

## Email — 06:13 (+07:00)

| Account | Emails | Calendar | Key Alerts |
|---------|--------|----------|------------|
| duongdn@nustechnology.com | 17 | — | ChienTX: Xin nghỉ phép reply; VietPH resignation checklist shared; TamHVH resignation checklist; 6× CDF Form status changes; GitLab sign-in from new location |
| carrick@nustechnology.com | 50 | — | ⚠️ Generator-API failed pipeline (many); Redmine bugs #79164 #79370 #79283 #79404 #79413 #79414 #79417 #79427 (Elliott); SoCal Rollbar jQuery #35 |
| nick@nustechnology.com | 64 | — | ⚠️ AuShare Sentry OpenURI::HTTPError (Clickup notifications); Azure DevOps CNA.Operations.App PR fix |
| rick@nustechnology.com | 80 | — | ⚠️ Fountain Rollbar production #1038 IntegrationError; FountainGifts daily summaries |
| kai@nustechnology.com | 37 | — | ℹ️ Madhuraka JIRA LIFM2-444 (Async Queue Processing), LIFM2-445 (Kai mentioned) |
| ken@nustechnology.com | 80 | — | ℹ️ Welligence XWWP-4797 client timezone download (PR review) |
| vuongtrancr@gmail.com | 80 | — | ⚠️ Swish Rollbar Delayed-newform; New Relic "Signal lost" for Low Application Throughput |
| dnduongus@gmail.com | 80 | — | Security alert for vansuongcr@gmail.com (not DuongDN) — skip |
| freelancer@mypersonalfootballcoach.com | 5 | — | ℹ️ New Relic June 22 performance report |

**Key alerts:**
- **Generator-API**: Multiple failed pipelines on staging (Mon-Tue Jun 23-24). Fixed pipeline 2026-06-23T08:03 UTC (0697aa1d) — staging recovered. Multiple new Redmine bugs filed by Elliott in the window.
- **Fountain Rollbar**: Production IntegrationError #1038. FountainGifts daily summaries show errors.
- **Swish (vuongtrancr)**: Delayed-newform Rollbar + New Relic signal lost — watch for production impact.
- **SoCal (carrick)**: Rollbar jQuery #35 alert (Mon Jun 22). Low priority (dropped project).

**Calendar (Zoho):** No events fetched (script not run separately).

Trello: All 6 mail items ✓ complete. Card marked done.

---

## Slack — 06:13 (+07:00)

| Workspace | Msgs | Status |
|-----------|------|--------|
| Baamboozle | 16 | ⚠️ Aysar MPDM (C07SQ4HAUHZ) — NO Wed update in window. Last post: "Monday's update" 08:48+07 Jun 24. Aysar @-mentioned in #testing for PR reviews (#632, #603). |
| RDC - FM Monitoring | 7 | ℹ️ Auto-access logs only. No Franc activity found. |
| Swift Studio | 0 | ✅ Rory off Thu-Fri (confirmed: Violet in Generator Slack — "Carrick will be off on Thursday and Friday. He will have finished his 20 hours today.") |
| Xtreme Soft Solutions | 3 | ✅ Kai active in DM with Madhuraka — mannequin image sequence discussion (dev work). JIRA LIFM2-444/445 active. |
| SAM GUARD - Mobile | 7 | ℹ️ HubSpot MQL leads; #process-digital-plant "PR merged" (michelle). Elena DP active. |
| Global Grazing Services | 6 | ⚠️ Joey/Amy in #change-requests. NO Nick daily report in #maintenance. |
| Amazing Meds | — | ⚠️ Token invalid (invalid_auth). Credentials in config are wrong for this workspace. Manual fix needed. |
| Generator | 20 | ✅ Elliott + Violet very active in #release: deeplink/universal links feature discussion, mobile release cut last week. Jeff fixes on Monday need to be added. |
| LegalAtoms | 0 | ℹ️ No activity. |
| MyPersonalFootballCoach | 0 | ℹ️ No activity. |
| William Bills | 0 | ℹ️ No Oliver/Lucas activity. |
| Equanimity | 0 | ℹ️ Token valid. No msgs in window. |
| SoCal Auto Wraps | 0 | — (dropped, no Trello item) |
| Aigile Dev | 6 | ✅ Colin + Hendrix active. Hendrix: "it is now fixed." |
| OhCleo | — | ⚠️ Token invalid (invalid_auth). Needs refresh. |

**Alerts:**
- **Aysar**: No Wednesday daily update in MPDM gate channel. Posting "@-mentions" seen, work visible. Missing daily update gate.
- **GGS/Nick**: No daily report in #maintenance.
- **Amazing Meds**: Credential fix needed — password in `.slack-accounts.json` is wrong for nick@nustechnology.com on this workspace.
- **OhCleo**: Token expired, needs refresh (xoxc).

Trello:
- ✅ Maddy/Kai/Luis — Kai active in DMs
- ✅ James Diamond/Vinn — Discord daily report posted
- ✅ Rory — confirmed leave Thu-Fri
- ✅ Elena — no open PRs, no pending deploy
- ✅ Colin/AigileDev — active
- ○ John Yi (Amazing Meds) — token invalid
- ○ Aysar — missing MPDM update
- ○ Franc — no RDC-FM activity
- ○ Elliott — active but GreenFort Capital performance issue pending
- ○ MPFC — no activity
- ○ Marcel — no Equanimity activity
- ○ Raymond (LegalAtoms) — no activity
- ○ Neural Contract — Upwork expired
- ○ Bailey — no GGS Nick daily report
- ○ Andrew Taraba — no Bizurk activity
- ○ Rebecca (William Bills) — no WilliamBills msgs, TuanNT 0h
- ○ Fountain — see below
- ○ Philip — not checked
- ○ Ohcleo — token invalid

---

## Discord — 06:13 (+07:00)

| Server | Msgs | Status |
|--------|------|--------|
| AirAgri (nusvinn) | 17 | ✅ Vinn daily report 17:35+07 Jun 24: reviewing PRs 524/535, file manager (share files/SDS) deployed to staging, fix task notifications (dev done), fix hazard icons on map (in progress). Dapackage active — pushed staging changes, asked about map filter system. |
| Bizurk (nuscarrick) | 0 | ℹ️ No messages. 0 Andrew Taraba DMs. |

Trello: ✅ James Diamond/Vinn complete (Vinn report received).

---

## Google Sheets (Task Log) — 2026-06-24 — 06:13 (+07:00)

⚠️ **Workstream SSO expired** — hours from Workstream not available. Sheet-only results below.

| Developer | Sheets | Workstream | Total | Target | Status |
|-----------|--------|------------|-------|--------|--------|
| LongVV | 0h | unavail. | 0h | 16h/week | ℹ️ Part-time — 0h/day normal, check weekly |
| PhucVT | 0h | unavail. | 0h | 8h/day | ⚠️ 0h (WS down, may be WS-only logger) |
| TuanNT | 0h | unavail. | 0h | 8h/day | ⚠️ 0h (gates JohnYi+Rebecca+Bailey) |
| VietPH | 8h (Paturevision) | unavail. | 8h | 8h/day | ✅ |
| KhanhHH | 0h | unavail. | 0h | 8h/day | ⚠️ 0h (WS down) |
| LeNH | 0h | unavail. | 0h | 8h/day | ⚠️ 0h (WS down) |

Note: VietPH having 8h confirms the date scan is working. Other 0h results may reflect Workstream-only logging. No leave notes found in any sheet. Workstream SSO needs manual login to restore.

**Scrin:** Empty session report for Jun 24 — no TuanNT/JohnYi Scrin activity.

---

## Fountain (5-part check) — 06:13 (+07:00)

### Part 1 — Matrix Plan
❌ UNAVAILABLE — Matrix token expired (Keycloak SSO session expired). Cannot fetch weekly plan from Matrix.

### Part 2+3 — Task Log Actuals & Plan vs Actual
⚠️ BUG: Fountain script picks W52 (highest week number in sheet) instead of current week W32 (Jun 22-28, 2026). W52 is a future empty template → all actuals show 0h. Manual verification of W32 required.

| Developer | W52 (wrong) actual | W51 (wrong) prev |
|-----------|-------------------|------------------|
| VuTQ | 0h | 0h |
| ThinhT | 0h | 0h |
| ViTHT | 0h | 0h |
| PhatDLT | 0h | 0h |
| HungPN | 0h | 0h |
| HaVS | 0h | 0h |

### Part 4 — Capacity & Runway
| Metric | Value |
|--------|-------|
| Total Estimated | 2,953.5h |
| Total Charged | 3,114.5h |
| Remaining Est | 0h |
| Dev capacity/wk | 90h |
| Runway | **0 weeks** |

⚠️ Project is **over estimate** by 161h. Runway = 0.

### Part 5 — Over-estimate Tracking
| Task | Estimated | Charged | Delta |
|------|-----------|---------|-------|
| #2615 | 12h | 106.75h | +94.75h ⚠️ |
| #2735 | 130h | 136h | +6h |

Task 2615 is massively over estimate (12h → 106.75h, 8.9×).

### Fountain Trello Board
| List | Cards | Stuck |
|------|-------|-------|
| Doing | 6 | 5 stuck |
| In QA | 2 | 0 |
| Not Passed | 0 | — |

Stuck Doing cards:
- ⚠️ "Add Subtle Scroll Animations" — **64 days** (critical)
- ⚠️ "NoMethodError in orders#show" — 27 days (prod bug)
- ⚠️ "ActionController::UnknownFormat in active_admin/devise/sessions#new" — 26 days (prod bug)
- ⚠️ "Upgrade to Next.js version 16" — 8 days
- ⚠️ "Patch vulnerabilities and delete data" — 9 days
- ✅ "Small updates to product catalog" — 1 day (fresh)

⚠️ Fountain Trello incomplete — multiple stuck bugs pending.

---

## Elena — 06:13 (+07:00)

### GitHub PRs (Elena-SamGuard-Digital-Plant + Elena-WPSamGuard)
- Open PRs: **0** ✓
- Pending deploy: **None** (all entries in `.elena-pending-actions.json` are `deployed:true` or `NOTE`)
- Last deploy: PR #307 (Jun 19, fixbug_dp) — deployed same day ✓

### WordPress (samguard.co)
- Console errors: 4
  - Google Analytics `region1.google-analytics.com` CSP connect-src violation × 2
  - DoubleClick `ad.doubleclick.net` CSP connect-src violation × 2
- These are third-party analytics/ad trackers. Core app functional.

### Precognize (nusken)
- 2 PRs updated since last run (Jun 23):
  - #170 in welligence/WellJenkins: WDE-8577 Change liveness check from playwright to API (updated Jun 24 10:04 UTC)
  - #10627 in welligence/WellStack: WDE: chore - upgrade shakapacker gem 9.7.0 to 10.1.0 (updated Jun 24 04:37 UTC)
- Active development work, no blockers.

Trello: Elena item ✅ marked complete. Elena WordPress SamGuard item — CSP errors present (real but 3rd-party analytics only).

---

## Upwork — 06:13 (+07:00)

⚠️ All Upwork sessions expired:
- Rory: login_failed (CAPTCHA/2FA required)
- Neural Contract: session_expired
- Aysar: session_expired

Cannot verify weekly hours. Manual browser login required to refresh sessions.

---

## Reminders (0h devs — Workstream down)

⚠️ Workstream unavailable — cannot confirm which devs genuinely logged 0h vs Workstream-only. No reminders sent (insufficient data to confirm 0h).

---

## System Issues / Action Required

| Priority | Issue | Action |
|----------|-------|--------|
| HIGH | Amazing Meds Slack: wrong credentials | Update nick@nustechnology.com password in `.slack-accounts.json` for Amazing Meds workspace |
| HIGH | Workstream SSO expired | Manual login: `DISPLAY=:1 node scripts/workstream-login.js` (browser needed) |
| HIGH | Matrix token expired | Manual login: `DISPLAY=:1 node scripts/matrix-token-refresh.js` |
| HIGH | OhCleo token expired | Manual: `node scripts/slack-extract-ohcleo-token.js` |
| HIGH | Upwork sessions expired | Manual browser login for Rory/Neural/Aysar |
| MED | Fountain script bug | `daily-fountain-scan-260603.js` picks W52 not W32 — fix `Math.max(weekNums)` to use date-based matching |
| MED | Aysar missing Wed MPDM update | Follow up with Aysar |
| MED | GGS Bailey: No Nick daily report | Check #maintenance |
| INFO | Rory: Off Thu-Fri Jun 25-26 | No Swift Studio activity expected |
| INFO | Generator API: staging failures resolved (Jun 23) | Monitor for recurrence |
| INFO | Fountain: 0 runway, stuck bugs | Escalation needed |

