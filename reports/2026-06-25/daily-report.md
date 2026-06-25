# Daily Report — 2026-06-25 (Thursday)

**Monitoring window:** 2026-06-24 09:00+07 → 2026-06-25 06:13+07  
**Generated:** 2026-06-25 06:13+07, recheck completed 09:15+07  
**Status:** Complete. Recheck fixed Workstream, Matrix, and confirmed OhCleo/Upwork were already valid (false alarms). Amazing Meds Slack genuinely has a wrong stored password — needs user input (see end of report).

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
| OhCleo | 13 (DM) + 0 (#events-code) | ✅ recheck found token was already valid — see OhCleo section below |

**Alerts:**
- **Aysar**: No Wednesday daily update in MPDM gate channel. Posting "@-mentions" seen, work visible. Missing daily update gate. (Resolved on recheck — see Re-check section.)
- **GGS/Nick**: No daily report in #maintenance. (Not a blocker per memory rule — GGS Nick report presence doesn't gate Bailey; resolved.)
- **Amazing Meds**: Credential fix needed — password in `.slack-accounts.json` is wrong for nick@nustechnology.com on this workspace. **Confirmed genuine wrong password on recheck — needs user input (see end of report).**

Trello (updated after recheck — see Re-check section for details):
- ✅ Maddy/Kai/Luis — Kai active in DMs
- ✅ James Diamond/Vinn — Discord daily report posted
- ✅ Rory — confirmed leave Thu-Fri
- ✅ Elena — no open PRs, no pending deploy
- ✅ Colin/AigileDev — active
- ○ John Yi (Amazing Meds) — still blocked, genuine wrong password (needs user input)
- ✅ Aysar — broad recheck confirmed ongoing work, KhanhHH aggregate hours clean
- ✅ Franc — no activity ≠ alert (ad hoc, Slack-only gate)
- ✅ Elliott — active in Generator #release, no person-status alert
- ✅ MPFC — no activity ≠ alert
- ✅ Marcel — no activity ≠ alert
- ✅ Raymond (LegalAtoms) — no activity ≠ alert
- ✅ Neural Contract — Upwork session was fine, messages checked, no unresolved item
- ✅ Bailey — GGS report absence ≠ alert, TuanNT tasklog clean (7.3h)
- ✅ Andrew Taraba — no activity ≠ alert
- ✅ Rebecca (William Bills) — TuanNT tasklog now confirmed clean
- ○ Fountain — still incomplete, real 0h logging gap + over-estimate
- ✅ Philip — MS Teams checked, last msg Jun 16, nothing new
- ✅ Ohcleo — token was valid, Tony's report present, no alert

---

## Discord — 06:13 (+07:00)

| Server | Msgs | Status |
|--------|------|--------|
| AirAgri (nusvinn) | 17 | ✅ Vinn daily report 17:35+07 Jun 24: reviewing PRs 524/535, file manager (share files/SDS) deployed to staging, fix task notifications (dev done), fix hazard icons on map (in progress). Dapackage active — pushed staging changes, asked about map filter system. |
| Bizurk (nuscarrick) | 0 | ℹ️ No messages. 0 Andrew Taraba DMs. |

Trello: ✅ James Diamond/Vinn complete (Vinn report received).

---

## Google Sheets (Task Log) — 2026-06-24 — recheck 09:15 (+07:00)

Workstream SSO restored (was a stale token, fixed via login script — re-verified live against all 10 accessible projects).

| Developer | Sheets | Workstream | Total | Target | Status |
|-----------|--------|------------|-------|--------|--------|
| LongVV | — | 8h (Portfolio - James Diamond) | 8h | 16h/week | ✅ part-time, on pace |
| PhucVT | 0h | 0h | 0h | 8h/day | ✅ full-day sick leave confirmed (Delivery - Resource Arrangement room: "Không khoẻ" → James Diamond covered by LongVV) |
| TuanNT | 7.3h (Paturevision) | 0h | 7.3h | 8h/day | ✅ gates JohnYi+Rebecca+Bailey — clean |
| VietPH | 8h (Paturevision) | 0h | 8h | 8h/day | ✅ |
| KhanhHH | — | 8h (Generator 6.5h + ETZ-Wathaga 1.5h) | 8h | 8h/day | ✅ |
| LeNH | 0h | 0h | 0h | 8h/day | ⚠️ half-day AM leave confirmed (đi khám bệnh, charged to Bailey), but PM hours unlogged despite confirmed afternoon client work (Blair Brown/Peptide Clyde, 11:18-11:34 Matrix) — apparent logging gap, not absence |

**Scrin:** Empty session report for Jun 24 — no TuanNT/JohnYi Scrin activity (consistent with TuanNT's hours being in Paturevision, not Scrin-tracked work, that day).

---

## Fountain (5-part check) — recheck 09:30 (+07:00)

### Part 1 — Matrix Plan
✅ Found (Matrix token refresh fixed). @trinhmtt posted Mon 2026-06-22 08:53+07 in `!EWnVDAxbTGsBxPkaaI:nustechnology.com`:
> Em gui plan tuan nay aj — ViTHT: 40h, ThinhT: 20h, => QC: 15h

(VuTQ not assigned this week's plan.)

### Part 2+3 — Task Log Actuals & Plan vs Actual
Fixed the W52-vs-W32 bug — Summary tab confirms **W32 = Jun 22-28, 2026** is the correct current week (was previously reading the wrong, far-future empty template tab).

With the correct tab read directly: **W32 task log shows 0h actual for every dev across Mon/Tue/Wed (and Thu in progress)** — no rows filled in at all (template placeholders only, no owner/hours entered).

| Developer | Plan (W32) | Actual (Mon-Wed) | Status |
|-----------|-----------|-------------------|--------|
| ViTHT | 40h | 0h | 🔴 unlogged |
| ThinhT | 20h | 0h | 🔴 unlogged |
| QC (PhatDLT+HungPN) | 15h | 0h | 🔴 unlogged |
| VuTQ | not on plan | 0h | normal (not assigned) |

This is NOT a no-work week — the Matrix Fountain room shows ViTHT/ThinhT/VuTQ/DatNT actively shipping PRs to live on Jun 24 (image-size bug fix, 2 PRs merged). The hours are real but not being logged in the W32 sheet. Worth a direct nudge to the team to backfill.

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

## Upwork — recheck 09:40 (+07:00)

Sessions were actually fine (carrick session authenticated cleanly on retry — earlier "expired" diagnosis was wrong). All 5 workrooms fetched successfully:

| Workroom | This week | Last week | Notes |
|----------|-----------|-----------|-------|
| Rory | 0:00 | 32:00 | Confirmed off Thu/Fri this week (Swift Studio Slack) |
| Neural Contract | 0:00 | 0:20 | Messages checked separately below |
| Aysar | 0:00 | 11:50 | — |
| Bailey-VietPH | 0:00 | 0:00 | — |
| Bailey-DuongDN | 0:00 | 0:00 | — |

**Neural Contract messages** (gate for its Trello item): latest message Jun 19 ("I've updated it. Please check!" — our side, resolved). Nothing new in this window. No unanswered urgent client message → clean.

---

## Reminders — recheck 09:45 (+07:00)

- PhucVT: full-day leave confirmed (Resource Arrangement room) — no reminder needed.
- LeNH: half-day AM leave confirmed; PM hours unlogged despite confirmed afternoon work — needs reminder. **Not sent** (no `--send-reminder` flag). To send: `/me:daily-report reminders lenh --send-reminder`.
- TuanNT, VietPH, KhanhHH, LongVV: all have logged hours — no reminder needed.

---

## Re-check — 09:50 (+07:00)

Today's report (generated 06:13) had 5 caveats. All investigated and resolved:

| Caveat | Resolution |
|--------|-----------|
| Workstream SSO expired | Fixed — re-ran login script, token verified live against `/api/me` and all 10 projects |
| Matrix token expired | Fixed — refreshed via browser SSO (NUS session auto-confirms); access tokens are short-lived (~minutes) so each fetch re-refreshes inline |
| OhCleo token expired | **False alarm** — token was already valid (`auth.test` passed immediately); original check likely had a cookie-encoding bug |
| Upwork sessions expired | **False alarm** — all 5 workrooms + Neural messages fetched successfully on first clean retry |
| Amazing Meds Slack invalid_auth | **Confirmed genuine wrong password** (not an expiry) — login attempt returned "Sorry, you entered an incorrect email address or password." Needs the current password from the user; not something a token refresh can fix. |

**Trello Check Progress — 12 items completed** after re-running their gate sources: Aysar, Franc, Elliott, MPFC, Marcel, Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca, Philip, Ohcleo. Several had been incorrectly left ○ for "no activity" — per established rule, silence/no-activity is not itself a blocking alert; only person-status issues (absence, 0h, unresolved complaint) block.

**Still incomplete (real reasons):**
- **John Yi - Amazing Meds**: blocked on the wrong-password issue above.
- **Fountain**: W32 task log shows 0h for all devs despite an active plan and real shipped work (see Fountain section) — logging gap needs a nudge; also the pre-existing #2615 over-estimate (12h→106.75h) is unresolved.
- **Elena - WordPress SamGuard**: real CSP violations (Google Analytics + DoubleClick blocked in `connect-src`) — same ones documented 2026-06-18, user previously chose to leave as-is rather than edit the live CSP policy. No new domains found.

**New pieces run this cycle (not done in the 06:13 run):**
- **Matrix** (Piece 10): 24/128 active rooms, 560 messages since Jun 24 08:00. Full summary in `reports/2026-06-25/matrix-rooms-0857.md`. Key finding: PhucVT/LeNH leave context (used above), no new unresolved action items for DuongDN.
- **OhCleo Slack** (Piece 12): Tony's daily report present (10:17 Jun 24); active engagement with Celine (premium account request, password reset, new Trello cards) — Tony committed to address "early tomorrow" (today). No alert.
- **Philip (MS Teams)**: confirmed contact (pbriggs@sixstarrentals.com.au, external-org banner present). Last message Jun 16 (Elevate365 demo spec) — nothing new in window.
- **Aysar broad recheck**: only one formatted update found since Monday (the "Monday's update" recap, posted Jun 24 08:48+07). No Tue/Wed-specific post since, but Carrick remains actively engaged in `#testing` with skjamie25 testing the Change Team Ownership feature he built — consistent with the established "missing formatted message ≠ no work" pattern. KhanhHH (the Aysar tasklog owner) has full 8h/day every day this week, just split across projects (only 2h to Baamboozle specifically, Monday only) — aggregate is what gates, so no alert.

---

## ⚠️ Needs your input

**Amazing Meds Slack password is wrong.** `config/.slack-accounts.json` has an outdated password for `nick@nustechnology.com` on the Amazing Meds workspace — login was rejected with "incorrect email address or password" (confirmed via direct test, not a token expiry). This blocks the **John Yi - Amazing Meds** Trello item until fixed. Please provide the current password so it can be updated in the (gitignored, encrypted) config.

