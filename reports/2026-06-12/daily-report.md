# Daily Report — 2026-06-12

*Generated: 2026-06-12 05:00 (+07:00)*
*Window: 2026-06-11T08:34:39+07:00 → now*

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 5 | — | no events |
| carrick@nustechnology.com | 35 | Generator pipelines failing (many), SoCal Rollbar, Snyk (Marcel org) | no events |
| nick@nustechnology.com | 36 | AuShare Sentry SMTPSyntaxError (2x), Xero limit warning (2x) | 21:30 Weekly Meeting with Devs (Teams) |
| rick@nustechnology.com | 50 | ⚠️ Rollbar FirstProject prod errors (React #425/#423/#418), Fountain staging (FK violation, null violation), InfinityRoses prod (ActiveRecord::StatementInvalid), Tom Figma Fountain mentions | 10:30 OmniGPT Daily Sync, 12:30 HEAL Meeting |
| kai@nustechnology.com | 10 | — | no events |
| ken@nustechnology.com | 50 | — (GitHub PR review notifications for Precognize) | 08:30 DE Daily Standup, 09:00 DE Bi-weekly retrospective, 09:30 Martin & Ken |

**Alerts:**
- carrick@: Generator API pipelines repeatedly failing on staging/stagingPhase2 (multiple branches incl. 361-rsvp-cut-off-date-time, release-be-jun-2026-batch-2). Snyk vulnerability in Marcel org.
- rick@: FirstProject (Fountain?) production Rollbar errors — Minified React errors #425, #423, #418; also FountainStaging FK violations + PG::NotNullViolation in admin/gifts#import_csv; InfinityRoses production ActiveRecord::StatementInvalid.
- nick@: AuShare ClickUp — Sentry Net::SMTPSyntaxError issue (no John Yi emails found)
- duongdn@: HaoNV leave request email (06-09); NUS World Cup 2026 event emails

Trello: All 6 Check mail items ✓ complete.

## Slack — all — 05:18 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 | Aysar ✓ daily report in MPDM 10:29 (fix Change Team Owner, Profanity Filter #600); Ronan archived "music" channel; Jamie+Carrick discussing team owner bug |
| RDC - FM Monitoring | 6 | Carrick pushed Turkiye tuner improvements (CSV parsing, API updates to Bursa+İzmir); tuner access logs; tuner recovery alert. No dmetiner activity |
| Swift Studio | 20 | Carrick active (DM with Jeff on region/site_id sync feature) |
| Xtreme Soft Solutions | 20 | Kai ✓ progress: LIFM2-436 Done, LIFM2-444 (Async Queue for Bulk Listing) In progress |
| SAM GUARD - Mobile | 20 | HubSpot MQL alerts (automated); no Elena-specific activity |
| Global Grazing Services | 20 | Amy + Joey active (picking guns scanner working) |
| Amazing Meds | 2 | Nick asking John Yi about NitroPack (2026-06-10); quiet otherwise |
| Generator | 20 | Rudi asking Carrick to review MR for batch 2 release; Ryan coordinating FE batch 2 |
| LegalAtoms | 20 | Raymond: doc list/workflow/EFSPS outage (~18:53 UTC Jun 11) → "should be ok now" (05:56 UTC); Maryland live! No Nick-specific alerts |
| MyPersonalFootballCoach | 0 | — quiet |
| William Bills | 0 | — quiet |
| Equanimity | 8 | Carrick + Komal discussing UAT dataset — no alerts |
| SoCal Auto Wraps | 0 | — quiet |
| Aigile Dev | 3 | Automated alerts + Make warning (blog draft not published) |

## OhCleo Slack — 05:19 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 11 | Active |
| #events-code | 0 | — |

Tony daily report: ✓ present at 10:25 (+07:00):
- [Mobile] Subscription Page Redesign
- fix: iOS subscription payment succeeds but validation error is still shown
- [Mobile - BE] fix: Android subscription payment fails
- fix: app login session (auto-refreshing expired access tokens)

Customer messages (Celine):
- "Regarding this card: https://trello.com/c/awYi27Ue/117 (Offer 1 month free premium to legacy web subscribers) — Did you already give all web users one month free?"
- Asked about ohcleo.com/app link branding (Cloudflare redirect to App Store/Play Store)
- Noted change password not working (SendGrid issue)

⚠️ **OhCleo alerts:**
- Link Branding broken: ohcleo.com/app not working → Tony disabled as quick fix, will investigate
- Password change (SendGrid): Tony: "change password is not working, that's a sendgrid issue"

## Discord — all — 05:24 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 40+ | nusvinn active (multiple msgs), Jeff ✓ daily report Jun 11 17:22 (deep link, training session QR); ⚠️ Vinn no daily report for Jun 11 |
| Bizurk (nuscarrick) | 0 | Quiet — normal |

**AirAgri details:**
- Jeff (jeff_trinh) ✓ daily report 17:22 +07:00: Check deep link, build Main app, implement API integration for training session registration (4h)
- nusvinn active in airagri_webapp + airagri-testing (technical discussion on SOS alarms, SafeFarm zoom issue moved to Analysis)
- dapackage (dev) merged to prod (SOS/alarm changes), waiting for bellatric02 (QA) check
- bellatric02 confirmed Corporate Group Sensor Linking + Door Contact Sensor Water Readings verified in Production ✓
- .jdiamond (client): noted SafeFarm map zoom not resetting; commented on SOS alarm phone+app notification

⚠️ **Alert: Vinn (nusvinn) no formal daily report "Just report my process today:" for Jun 11**

**Bizurk:** animeworld DM 0 new messages — OK (silence is normal).

Trello: James Diamond - Vinn ○ skip (no Vinn daily report); Andrew Taraba ✓ complete (silence = OK)

## Scrin.io — 05:26 (+07:00)

**Scrin.io (Nick / John Yi — 2026-06-11):** 0h — no sessions recorded.

## Sheets — all — 05:29 (+07:00)

| Developer | Jun 11 (Thu) | Status | Notes |
|-----------|-------------|--------|-------|
| LongVV | 0h today | ✓ OK | Weekly total 16h = target met (part-time 16h/wk) |
| PhucVT | 8h (own) | ✓ | 12h total incl. AnhNH2 4h |
| TuanNT | 8h total | ✓ | Paturevision: 8h \| JohnYi: 0h \| Rebecca: 0h \| Neural: 0h |
| VietPH | 8h | ✓ | |
| KhanhHH | 8h total | ✓ | Aysar: 0.5h + Generator: 7.5h |
| LeNH | 8.17h total | ✓ (concern) | Rory: 7.17h + Franc: 1h + Rebecca(Q-T): 0h |
| Elena | 11h | ✓ | TriNM: 3h + KietNHT: 8h |

**TuanNT gate: PASSED** (8h Paturevision) → John Yi + Rebecca + Bailey items OK to complete.

⚠️ **LeNH/Franc concern:** Franc logged only 1h (target 8h/day), no leave note. No dmetiner activity in RDC Slack either. Franc item to remain incomplete pending further check.

## Sheets — Maddy JIRA — W10 — 05:30 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-439 | Listed-Cons tab changes | To Do | 12h | 21h 30m | 4h | 🔴 over 9h 30m |
| LIFM2-443 | Order Fulfilment | Ready to deploy | 0h | 14h | 4h | ⚠️ no est |
| LIFM2-436 | Returns | Review | 15h | 12h 45m | 4h | ✅ |
| LIFM2-444 | Async Queue for Bulk Listing Price Updates | In Progress | 15h | 4h | 4h | ✅ |

**Over-budget (1):** LIFM2-439 est=12h actual=21h 30m **over 9h 30m** 🔴
**No estimate (1):** LIFM2-443 — dev must set est before logging more

## Elena — 05:40 (+07:00)

**Open PRs (duongdn):** 0 — no PRs to merge
**Precognize (nusken) PRs:** 0 — no nusken PRs open

**samguard.co WordPress:** 0 page errors, 0 JS errors ✓ (2 CSP violations from Google Analytics = false positives, filtered)

**SAM GUARD Slack:** HubSpot MQL alerts only (automated), no Elena-specific activity

Trello: Elena - SamGuard → depends on Slack (no Elena alert) → ✓ complete

## Fountain — 05:42 (+07:00)

**Part 1 — Matrix Plan:** ⚠️ Matrix SSO session expired — could not access. Plan not retrieved. Checked alternative profiles and OIDC refresh — all expired. Fountain item left incomplete.

**Part 2 — Task Log Actuals (W52):**
All devs (VuTQ, ThinhT, ViTHT, PhatDLT, HungPN, HaVS) show 0h for W52 in task log scan. This may be a script week-tab mismatch (script says W52, but actual Fountain tab may differ). Weekly total likely accumulated from prior days.

**Part 3 — Plan vs Actual:** Unable to compare (Matrix plan unavailable)

**Part 4 — Capacity & Runway:**
- Total est: 2953.5h, Total charged: 3114.5h
- Remaining est: 0h, Runway: 0 weeks
- Note: total_charged > total_est = entire backlog over-budget

**Part 5 — Over-Estimate Tracking:**
- #2615: est=12h, charged=106.75h — **789.6% over** 🔴 (still growing)
- #2595: est=120h, charged=168.25h — 40.2% over
- #2735: est=130h, charged=136h — within threshold ✓
- **Total 37 tasks over-estimate** (threshold >20%)
- Notable: #2627 1550% over (0.5h est, 8.25h actual), #2639 725% over, #2613 625% over

Fountain Trello: ○ skip — Matrix plan (Part 1) unavailable.

## Trello — progress — all — 05:47 (+07:00)

| Item | Checklist | Result | Reason |
|------|-----------|--------|--------|
| Maddy - Carrick/Kai/Luis | Normal | ✓ complete | Kai progress in Xtreme Slack |
| John Yi - Amazing Meds | Normal | ✓ complete | TuanNT 8h (Paturevision) + Amazing Meds active |
| James Diamond - Vinn | Should do | ○ skip | Vinn no daily report for Jun 11 |
| Rory | Closely monitor | ✓ complete | Swift Slack active + LeNH 7.17h |
| Aysar | Closely monitor | ✓ complete | Daily report in MPDM C07SQ4HAUHZ |
| Franc | Closely monitor | ○ skip | 1h only (target 8h), no dmetiner in RDC Slack |
| Elliott | Closely monitor | ✓ complete | Generator Slack active (Rudi, Violet), KhanhHH 7.5h |
| MPFC | Work | ✓ complete | Quiet = OK |
| Marcel | Work | ✓ complete | Equanimity active, no alert |
| Elena - SamGuard | Work | ✓ complete | No Elena alert, WordPress clean |
| Raymond - LegalAtoms | Work | ✓ complete | Issue fixed, no Nick-specific alert |
| Neural Contract | Work | ✓ complete | Silence = never alert |
| Bailey | Work | ✓ complete | TuanNT 8h gate passed + GGS active |
| Andrew Taraba | Work | ✓ complete | Bizurk silence = OK |
| Rebecca - William Bills | Work | ✓ complete | TuanNT 8h gate passed + W.Bills quiet |
| Colin | Work | ✓ complete | Aigile Dev no significant alert |
| Fountain | Work | ○ skip | Matrix plan unavailable (Part 1 not checked) |
| Philip | Work | ○ skip | MS Teams login blocked (security verification) |
| OhCleo | Work | ○ skip | Customer alerts: Link Branding broken + SendGrid |
| Elena - WordPress | Pending | ✓ complete | 0 JS errors |

## Reminders — 05:48 (+07:00)

Devs with 0h or shortfall on Jun 11 (no leave note):

| Developer | Status | Hours | Action |
|-----------|--------|-------|--------|
| LongVV | ✓ OK | 0h today (16h/wk weekly target already met) | No reminder needed |
| PhucVT | ✓ OK | 8h | — |
| TuanNT | ✓ OK | 8h (Paturevision) | — |
| VietPH | ✓ OK | 8h | — |
| KhanhHH | ✓ OK | 8h | — |
| LeNH | concern | 8.17h combined (Rory 7.17 + Franc 1h) | Franc: 1h only — reminder NOT sent (cron mode, --send-reminder not passed) |

Note: `--send-reminder` not passed → printing to report only, no Matrix messages sent.

## Matrix — 05:49 (+07:00)

Matrix SSO session requires manual re-authentication. Tried: browser-profile refresh, OIDC token refresh, fresh-profile login — all require interactive user sign-in via SSO. 

Matrix scan not completed this run. Fountain Part 1 (Matrix plan) also unavailable.

**Action required:** Manual Matrix re-login needed before next cron run.
Full details: N/A (no matrix-rooms file generated this run)

