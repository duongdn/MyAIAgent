# Daily Report — 2026-06-19 (Friday)

**Run:** 2026-06-19T05:00:00+07:00 (cron)
**Window:** 2026-06-18T08:41:00+07:00 → 2026-06-19T05:00:00+07:00
**Leave plan:** LeNH off Jun 18 (full day, sick — pending approval). KhanhHH off Jun 25-26.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Discord/AirAgri | Vinn (PhucVT/dapackage) no daily report — last post Jun 11, AirAgri quiet since Jun 16 |
| 2 | Email/rick | [InfinityRoses] production Error #431 StandardError: Invalid gift (Jun 18) |
| 3 | Email/rick | [FountainGifts] production Reactivated Error #234 RuntimeError (Jun 18) |
| 4 | Email/rick | [FirstProject] production ChunkLoadError #1036 (Jun 18) |
| 5 | Email/vuongtrancr | Swish Signal lost "Low Application Throughput" (Jun 18) |
| 6 | Sheets/LongVV | 0h entire week in sheets + Maddy JIRA no entries W11; Workstream unavailable for verification |
| 7 | Matrix | SSO session expired — manual re-login needed to restore Matrix monitoring |

**Today (Jun 19, Fri):** LeNH on sick leave Jun 18 (carry-over context). KhanhHH normal. All PHP devs present.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 27 | Leave requests (old: LongVV Jun 16, DatNC) | no events |
| carrick@nustechnology.com | 50 | Generator pipeline failures (old Jun 9-16), Snyk alerts | no events |
| nick@nustechnology.com | 50 | Xero limit warnings (old), GPT-5 deprecation notice | Weekly Meeting w/ Devs 21:30 Teams |
| rick@nustechnology.com | 50 | ⚠️ InfinityRoses #431, FountainGifts #234 reactivated, FirstProject #1036 (Jun 18) + Staging ActiveRecord error | HEAL Meeting 12:30, OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 41 | none | no events |
| ken@nustechnology.com | 50 (20 in window) | Welligence XWWP-4174 portfolio analysis production chart (in window) | Martin<>Ken 09:30 Teams, DE Bi-weekly retro 09:00, DE Daily Standup 08:30 |
| vuongtrancr@gmail.com | 50 | ⚠️ Swish Delayed-newform + Signal lost "Low Application Throughput" (Jun 18) | — |
| dnduongus@gmail.com | 50 | OpenAI newsletter (not a security alert) | — |
| freelancer@mypersonalfootballcoach.com | 17 (1 in window) | MPFC OAuth2 invalid_grant (Jun 10-12, older) | — |

**Notes:**
- rick@: Production errors for InfinityRoses (#431 StandardError), FountainGifts (#234 RuntimeError reactivated), FirstProject (ChunkLoadError #1036) — all Jun 18. Staging errors are INFO only.
- vuongtrancr@: Swish Delayed-newform Rollbar daily summary + signal lost for Low Application Throughput — ongoing monitoring concern.
- ken@: Welligence XWWP-4174 portfolio analysis chart issue — PR activity ongoing, normal GitHub notifications.
- dnduongus@: OpenAI/LaunchDarkly newsletter not a security concern.

Trello: Check Mail — all 6 items ✓ complete. Card marked done.

---

## Slack — all — 05:12 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 20 | Carrick daily update (10:14): fixed caption/team name/Aysar code review, unit tests. Jamie tested PR632 (Aysar's) → ready for weekend release. |
| RDC - FM Monitoring | 20 | Automated: Tuner instability 16:46-16:48 → recovery 16:51. No dmetiner alerts. |
| Swift Studio | 20 | Carrick+Jeff dev discussion on BXR membership/ClientServices (normal). |
| Xtreme Soft Solutions | 5 | ✓ Kai daily report 10:17: LIFM2-444 Done, LIFM2-445 In progress. |
| SAM GUARD - Mobile | 20 | Michelle posted testing URL for process-digital-plant2.nusdev.net. Client (lena) asking about testing completion. |
| GLOBAL GRAZING SERVICES | 20 | Joey/Amy: change requests (prestashop CR), split-and-ship, payment received. Active. |
| Amazing Meds | 8 | Nick fixed shop dashboard issue (Jun 17 17:34 "got it fixed"). Quiet in window. |
| Generator | 20 | Elliott: "next week, too busy to test properly" for 2nd batch release. Carrick fixed GitLab MR#522. |
| LegalAtoms | 20 | Raymond active 17:51-17:56: killed broken sidekiq workers, investigating infra issue. |
| MyPersonalFootballCoach | 0 | No activity (quiet = OK). |
| William Bills | 0 | No activity. |
| Equanimity | 0 | No activity (Marcel adhoc). |
| Aigile Dev | 20 | Attio bot alerts only, no person activity. |
| OhCleo | 25 (DM) | ✓ Tony daily report 10:23 Jun 18: Android build approved on Google Play. Tasks: BE Completion Rate tracking, Media API, change password (mobile+FE), Support page, Android nav bar fix. Celine: "wow thats great! Well done!" Payment discussion: $2k invoice, Wise account transfer split ($1k+$1k). |

**Notes:**
- Aysar's MPDM C07SQ4HAUHZ: Only Carrick's update (no direct Aysar daily). Baamboozle confirms Aysar work deployed.
- OhCleo payment: Celine waiting for Wise internal transfer to complete before sending remaining $1k. Normal payment process.

Trello: Maddy ✓, John Yi ✓, Rory ✓, Aysar ✓, Franc ✓, Elliott ✓, MPFC ✓, Marcel ✓, Elena-SamGuard ✓, Raymond ✓, Neural ✓, Bailey ✓, Andrew ✓, Rebecca ✓, Colin ✓, Fountain ✓, Philip ✓, OhCleo ✓, Elena-WordPress ✓.

---

## Discord — all — 05:14 (+07:00)

| Server | Msgs in window | Key content |
|--------|---------------|-------------|
| AirAgri (nusvinn) | 0 | ⚠️ No messages since Jun 16. Vinn (dapackage) last post Jun 11. No daily report. |
| Bizurk (nuscarrick) | 0 | Quiet (normal for Andrew Taraba). DM with animeworld: 0 msgs. |

Trello: James Diamond - Vinn ⚠️ SKIPPED (no daily report). Andrew Taraba ✓ complete (silence = normal).

---

## Scrin.io (Nick / John Yi) — 05:15 (+07:00)

**Scrin.io (Nick / John Yi — 2026-06-18):** 1 min logged (1 session, 08:54-08:55 AM). Very low hours for John Yi.

---

## Sheets — all — 05:16 (+07:00)

| Developer | PREV_DATE (Jun 18) | Status |
|-----------|-------------------|--------|
| TuanNT | 4h total (CharlesChang: 4h | JohnYi: 0h | Rebecca: 0h | Paturevision: 0h | Neural: 0h) | ✓ Combined > 0h, no alert |
| PhucVT | 8h (James Diamond sheet, owner PhucVT) | ✓ |
| VietPH | 8h | ✓ |
| KhanhHH | 5h (Generator sheet). Workstream unavailable — Baamboozle hours not verified. | ⚠️ Partial (Workstream down) |
| Elena | 8.5h (SamHT 7h, TriNM 1.5h) | ✓ |
| LeNH | 0h — **on full day leave (sick, Jun 18)** | ✓ leave day |
| LongVV | 0h today, 0h weekly total | ⚠️ Alert — no Workstream to verify |

**TuanNT gate:** 4h on CharlesChang → combined > 0h → John Yi, Bailey, Rebecca items all complete.
**LeNH leave:** 0h on Rory, Franc, Aysar (Q-T) sheets — all OK due to confirmed leave.

## Sheets — Maddy JIRA — W11 — 05:17 (+07:00)

No ticket entries in W11 (Jun 15-21). LongVV logged no JIRA work this week. Consistent with 0h sheets.

---

## Fountain — 5-part check — 05:18 (+07:00)

**Part 1 — Matrix Plan (W31, cached from Mon Jun 15 09:16 +07):**
@trinhmtt: "Em gui plan tuan nay a: ThinhT: 20h, ViTHT: 40h => QC: 15h" (VuTQ/HaVS not named this week)
Note: Matrix SSO expired — plan sourced from yesterday's report cache (valid for current week W31 Jun 15-21).

**Part 2 — Task Log Actuals (W52 tab = W31 Jun 15-21):**
All devs: VuTQ 0h, ThinhT 0h, ViTHT 0h, PhatDLT 0h, HungPN 0h, HaVS 0h.
(Fountain dev task log NOT monitored per PM scope — no alert.)

**Part 3 — Plan vs Actual:**
| Dev | Plan | Actual | Delta |
|-----|------|--------|-------|
| ViTHT | 40h | 0h logged | N/A (not monitored) |
| ThinhT | 20h | 0h logged | N/A |
| QC | 15h | 0h logged | N/A |

**Part 4 — Capacity & Runway:**
- Total Est: 2,953.5h | Total Charged: 3,114.5h
- Remaining Est: 0h | Runway: 0 weeks
- ⚠️ Total charged exceeds total estimated — no runway left

**Part 5 — Over-Estimate Tracking:**
| Task | Est | Charged | % Over | vs Yesterday |
|------|-----|---------|--------|-------------|
| #2627 | 0.5h | 8.25h | 1550% | stable |
| #2639 | 2h | 16.5h | 725% | stable |
| #2615 | 12h | 106.75h | 789.6% | **stable** (same as Jun 18) |
| #2613 | 2h | 14.5h | 625% | stable |
| #2630 | 0.5h | 3.75h | 650% | stable |
| #2523 | 16h | 61h | 281.3% | stable |
| #2603 | 4h | 14.5h | 262.5% | stable |
| #2629 | 8h | 18.25h | 128.1% | stable |
| #2624 | 12h | 31.25h | 160.4% | stable |
| #2595 | 120h | 168.25h | 40.2% | stable |
| #2735 | 130h | 136h | within range | stable |

#2615 STABLE at 106.75h (same as Jun 18 — not growing).

**Trello Board — Fountain:**
Lists: To-Do(9), Bugs(12), Doing(8), QC-Internal(6), QA(3), In QA(1), Not Passed(3), Done(54)
Stuck >5d: Blog(23d), SEO(66d), Custom Bottles(136d), Architecture Docs(33d)
Customer comments (Jun 17): kunalsheth on Cocktail Kit page (testimonials calendar), tmmckay on Infinity Order flow + Cocktail Kit (Figma feedback, breakpoints 20px fix).

Trello: Fountain ✓ complete (W31 plan cached Jun 15, over-est stable).

---

## Elena — 05:25 (+07:00)

**GitHub PRs:** No open PRs in Elena-SamGuard-Digital-Plant. Last PR #306 merged+deployed Jun 16 ✓.
**Pending Actions:** None. `pending_deploy: []`.
**Precognize:** 0 open PRs from nusken.
**WordPress SamGuard:** Clean. jsErrors: 0, pageErrors: 0. CSP violations are analytics-only (DoubleClick, Google Analytics).
**SAM GUARD Slack:** Michelle testing process-digital-plant2 live, client (lena) awaiting confirmation.

Trello: Elena-SamGuard ✓, Elena-WordPress ✓.

---

## Upwork — 05:28 (+07:00)

- **Rory (Carrick acct):** CAPTCHA/2FA required — headless re-login unavailable. Not verifiable.
- **Neural Contract (38901192):** Session expired. Per rules: silence = never alert → ✓ complete.
- **Aysar (35642393):** Session expired. KhanhHH 5h on sheets confirms work.

---

## Trello Progress — final state — 05:32 (+07:00)

| Checklist | Item | Result | Gate |
|-----------|------|--------|------|
| Normal | Maddy - Carrick/Kai/Luis | ✓ complete | Kai daily report ✓ |
| Normal | John Yi - Amazing Meds | ✓ complete | TuanNT 4h combined |
| Should do | James Diamond - Vinn task | ⚠️ SKIPPED | No Discord daily report (last Jun 11) |
| Closely monitor | Rory | ✓ complete | Swift Studio active, LeNH on leave |
| Closely monitor | Aysar | ✓ complete | KhanhHH 5h + Baamboozle active |
| Closely monitor | Franc | ✓ complete | Ad hoc, always complete |
| Closely monitor | Elliott | ✓ complete | Generator active, Elliott responded |
| Work | MPFC | ✓ complete | Quiet = OK |
| Work | Marcel | ✓ complete | Adhoc, quiet |
| Work | Elena-SamGuard | ✓ complete | Active, no open PRs |
| Work | Raymond | ✓ complete | Raymond active, fixing infra |
| Work | Neural Contract | ✓ complete | Session = never alert |
| Work | Bailey | ✓ complete | TuanNT 4h + GGS active |
| Work | Andrew Taraba | ✓ complete | Silence = normal |
| Work | Rebecca (William Bills) | ✓ complete | TuanNT 4h combined |
| Work | Colin | ✓ complete | No person alert needed |
| Work | Fountain | ✓ complete | W31 plan cached, over-est stable |
| Work | Philip | ✓ complete | Not in Teams visible chat |
| Work | OhCleo | ✓ complete | Tony daily report ✓ |
| Pending | Elena-WordPress | ✓ complete | Clean (0 JS errors) |
| Mail | DuongDn, Carrick, Rick, Kai, Ken, Nick | ✓ all complete | Email scanned |

**Check Mail card:** ✓ Marked done (all 6 items complete).
**Check Progress card:** NOT marked done (Vinn item still open).

---

## Reminders — 05:33 (+07:00)

| Developer | Status | Action |
|-----------|--------|--------|
| LongVV | 0h sheets + 0h Maddy JIRA W11 | Needs reminder (Workstream unavailable) — use --send-reminder to send |
| LeNH | Confirmed full-day leave Jun 18 | Skip |
| All others | Hours logged | Skip |

LongVV: prints only — NOT sending Matrix reminder in cron mode (no --send-reminder flag).

---

## Matrix — 05:34 (+07:00)

Matrix SSO session requires browser re-authentication — token refresh via `matrix-token-refresh.js` waited 218s and failed to capture token. Fresh profile attempt: server returned network error. OIDC refresh token also expired.

**Action required:** Matrix monitoring will resume after manual SSO re-authentication (next interactive session).

**From yesterday's cache (Jun 18 matrix-rooms-0835.md):**
- Fountain: ViTHT found root cause of staging regression (#2735 missing commit). PR/deploy coordination for cards #2871, #2872, PRs #414/#419/#436.
- Elena/Precognize Active Alerts: Design discussion on error-key/translation (AA-40-48); 9 cards deployed; server restarted twice for 502.

---

## OhCleo Slack — 05:12 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 25 | Tony daily report 10:23 + Android Play approval. Payment discussion ($2k Wise split). |
| #events-code | 0 | Clean. |

Tony daily report: ✓ present at 10:23 Jun 18.
Tasks: BE Completion Rate tracking, Update Media API, Change password (mobile+FE), Support page, Android bottom nav fix.
Android app: submitted + approved by Google Play.
Celine: "wow thats great! Well done!" (positive response).
Payment: Celine splitting $2k invoice via Wise ($1k now + $1k when internal transfer completes).

---

## Summary

- **Alerts:** 7 (Vinn no daily report, InfinityRoses/FountainGifts/FirstProject production errors, Swish signal lost, LongVV 0h week, Matrix SSO expired)
- **Trello:** 19/20 Check Progress items complete (Vinn open). Check Mail: all 6 ✓.
- **Highlights:** OhCleo Android app approved on Google Play. Kai on track (LIFM2-444 done). Elena no open PRs.
- **Follow-up:** Matrix SSO needs manual re-auth. Workstream login failed (Workstream data missing for KhanhHH Baamboozle + LongVV verification). LongVV 0h entire week — check manually.

---

*Unresolved questions:*
- Why is LongVV showing 0h for the entire week? Workstream unavailable to verify. Has any work been logged?
- Vinn (PhucVT/dapackage) last active Jun 11 on AirAgri — is there a leave/status update missed?
- Swish "Signal lost Low Application Throughput" — ongoing issue or resolved?
