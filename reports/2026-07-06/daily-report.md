# Daily Report — 2026-07-06 (Monday)

**Run:** 2026-07-06T05:02:00+07:00 (cron)
**Window:** 2026-07-03T08:00:00+07:00 → 2026-07-06T05:02:00+07:00 (Mon override: Fri 08:00 start)
**PREV_DATE (task logs):** 2026-07-03 (Friday — last workday)
**Leave plan:** No approved leaves on record.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | vuongtrancr@ Email | "Signal lost for 10 minutes on 'Low Application Throughput'" × 6 on Jul 5 — Swish/Delayed-newform APM intermittent |
| 2 | Generator Slack | Rudi (Jul 3): mobile RSVP non-backwards-compatible changes released to production — coordination issue |
| 3 | nick@ Email | Xero limit warning from operations@candasurveyors.com.au — Xero API quota nearing limit |
| 4 | Maddy JIRA | LIFM2-439 (Listed-Cons tab) 🔴 over +9h30m (12h est, 21h30m actual) |
| 5 | Sheets (WS unavail) | PhucVT/KhanhHH/LeNH/LongVV unverified Fri Jul 3 — Workstream SSO fails in cron (same as Jul 4 issue, likely false alarm) |
| 6 | Elliott | Generator Slack production concern — Trello item left ○ pending manual check |
| 7 | Fountain #2615 | 790% over estimate (106.75h/12h est) — ongoing, verify not growing |

**Today (Mon Jul 6):** All present — no approved leaves. Weekend (Sat Jul 4 + Sun Jul 5) — no work expected from PHP team.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 0 | none | no events |
| carrick@nustechnology.com | 1 | Kinsta vuln digest (FYI) | no events |
| nick@nustechnology.com | 4 | [radish-stage] Heroku release failed (staging, INFO); Xero limit warning (⚠️) | Weekly Meeting with Devs 21:30 Teams |
| rick@nustechnology.com | 16 | Rollbar summaries FountainGifts/InfinityRoses/FirstProject (FYI); FountainStagingBE staging error (INFO) | HEAL Meeting 12:30; OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 8 | JIRA LIFM2-439 Listed-Cons tab update (FYI) | no events |
| ken@nustechnology.com | 80 | GitHub Precognize amocc-material PRs (FYI) | DE Standup ×2 08:30/09:00; Bi-weekly Retro 09:00; Tech Talks 09:00 |
| vuongtrancr@gmail.com | 11 | ⚠️ "Signal lost 10min Low Application Throughput" × 6 (Jul 5); Delayed-newform daily summaries | — |
| dnduongus@gmail.com | 23 | none (Vietcombank, LinkedIn, newsletters) | — |
| freelancer@mypersonalfootballcoach.com | 0 | none | — |

**nick@:** Xero limit warning from Candasurveyors — their Xero API quota is nearing limit, may affect client integration. Heroku radish-stage is staging-only, FYI.
**rick@:** FirstProject/FountainGifts/InfinityRoses Rollbar daily summaries — FYI per policy. No production-blocking new errors.
**vuongtrancr@:** Multiple "Signal lost" alerts on Jul 5 for Swish APM — 6 occurrences throughout Sunday. May indicate intermittent infrastructure issue or monitoring misconfiguration.

Trello: Check mail card — all 6 items ✓ complete. Card marked done.

---

## Slack — all — 05:15 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 2 | github bot (#gamedev), carrick in #testing (Jul 2, pre-window). MPDM C07SQ4HAUHZ: 2 KhanhHH updates ✓ |
| RDC - FM Monitoring | 0 | No activity — weekend |
| Swift Studio | 0 | No activity — weekend |
| Xtreme Soft Solutions | 0 | No activity — weekend |
| SAM GUARD - Mobile | 0 | No activity — weekend |
| GLOBAL GRAZING SERVICES | 0 | No activity — weekend |
| Amazing Meds | 0 | No activity — weekend |
| Generator | 3 | ⚠️ Violet (Jul 3 09:41): mobile task 361 needs to release with mobile app; Rudi: RSVP non-backwards changes released to prod |
| LegalAtoms | 0 | No activity — weekend |
| MyPersonalFootballCoach | 0 | No activity — weekend |
| William Bills | 0 | No activity — weekend |
| Equanimity | 0 | No activity — weekend |
| SoCal Auto Wraps | SKIP | Dropped 2026-05-11 |
| Aigile Dev | 0* | *4 msgs from Jun 29 (pre-window, outside Fri-Mon range) |
| OhCleo | ✓ | See Piece 12 below |

**Baamboozle MPDM C07SQ4HAUHZ:**
- Jul 3 09:02+07 (KhanhHH/Carrick): "Yesterday's update" — e2e testing Inprogress, Change Team Ownership #533 Dev done+Deployed to Nusdev, Laravel 12/PHP 8.5/nginx fixes Dev done+Deployed
- Jul 4 13:14+07: "Yesterday's update" — Profanity filter #642 Inprogress, Delete Disabled Teams #640 Dev done, e2e testing Dev done+Deployed

**Baamboozle GitHub issues (nuscarrick):**
- baamboozle-web-app: 11 open, bbzl-web-client: 0
- Active: #640 (Delete Disabled Teams — Dev done), #642 (Profanity filter — Inprogress)
- P2: #629 (SQL raw query integer casting bug — needs attention)
- P3: #630 (race condition 30-game-copy limit), #631 (N+1 query mylikes)

**Generator ⚠️:** Rudi's message (Jul 3): "some rsvp non-backwards changes ended up being release to production" — mobile tweaks caused unintended production changes. Elliott/Violet coordinating. Trello Elliott item left ○.

Trello: Rory ✓, Aysar ✓, Franc ✓, MPFC ✓, Marcel ✓, Elena-SamGuard ✓, Raymond ✓, Neural ✓, Bailey ✓, Andrew Taraba ✓, Rebecca ✓, Colin ✓, Ohcleo ✓ completed.
Elliott ○ (Generator production concern). Philip ○ (MS Teams script unavailable).

---

## Discord — all — 05:18 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 52 | ✓ Vinn daily report Jul 3 17:54+07 |
| Bizurk (nuscarrick) | 0 | No activity; 0 Andrew DMs |

**AirAgri — Vinn (Jul 3 daily report):** Reviewed PRs #556, #557. Discussed + working on Dynamic Property Check-In Forms & Contractor Sign-In Configuration. Created employee/contractor accounts for Select Harvests Carina West Processing Facility. New ticket assigned: Broadcast Alerts Planner (from James Diamond via Figma prototype).

Trello: James Diamond ✓ complete. Andrew Taraba ✓ complete.

---

## Scrin.io — 05:18 (+07:00)

**Scrin.io (Nick at John Yi — 2026-07-05):** 0h — Monday limitation: `scrin-fetch-yesterday.js` returns Sunday (non-workday) data on Monday runs. Friday Jul 3 data was captured in the Jul 4 report (9h31m logged, 2 sessions).

---

## Sheets — all — 05:22 (+07:00) (PREV_DATE: 2026-07-03)

| Developer | Sheets Jul 3 | Workstream | Status |
|-----------|-------------|-----------|--------|
| TuanNT | 8h (CharlesChang 0.5h + Paturevision 7.5h) | unavail | ✅ OK |
| LongVV | 0h | unavail | ⚠️ part-time 16h/wk — weekly total unverified |
| PhucVT | 0h | unavail | ⚠️ likely false alarm (same as Jul 2 & Jul 4 cron) |
| KhanhHH | 0h | unavail | ⚠️ likely false alarm (same as Jul 2 & Jul 4 cron) |
| LeNH | 0h | unavail | ⚠️ likely false alarm (same as Jul 2 & Jul 4 cron) |

**Workstream unavailable:** SSO login fails in cron context (DISPLAY:1 also failed this run). Same root cause as Jul 2 and Jul 4 cron failures. Jul 2 recheck found PhucVT 8h (Portfolio-James Diamond) + KhanhHH 3.5h (Generator) when run interactively. Recommend interactive re-login: `DISPLAY=:1 node scripts/workstream-login.js` then re-scan.

**TuanNT ✅:** 8h confirmed from sheets alone → gates John Yi, Bailey, Rebecca all clear.

### Maddy JIRA — W13 (2026-07-03)

| Ticket | Summary | Status | Est | Actual (JIRA) | Check |
|--------|---------|--------|-----|---------------|-------|
| LIFM2-409 | Import Shopify payouts | In Progress | 113h 15m | 108h 15m | ✅ |
| LIFM2-259 | Bulk upload images S3 | Testing - Anoma | 0h | 73h 45m | ⚠️ no est |
| LIFM2-439 | Listed-Cons tab changes | Ready to deploy | 12h | 21h 30m | 🔴 over +9h 30m |
| LIFM2-436 | Returns | Testing - Anoma | 15h | 13h 45m | ✅ |
| LIFM2-446 | Row-Locking in Quoting Tool | Review | 12h | 11h | ✅ |

**Over-budget:** LIFM2-439 est=12h actual=21h30m (+9h30m). Known issue, client awareness needed.
**No estimate:** LIFM2-259 — dev must set estimate before logging more hours.

---

## Fountain — 05:25 (+07:00)

**Part 1 — Matrix Plan:** N/A — Matrix access_token expired; refresh_token invalid_grant; device-code auth timed out in cron. Using last known plan (W52, week Jun 29–Jul 5): ViTHT 36h, ThinhT 20h, DatNT 24h, VuTQ 8h → **88h/wk capacity**. QC: PhatDLT + HungPN (TrinhMTT = plan poster, not QC).

**Part 2/3 — Task Log Actuals vs Plan:** Current week W52 actuals show 0h (script output empty — weekend, work expected Mon onward). No plan vs actual comparison possible until devs log Monday hours.

**Part 4 — Capacity & Runway:**
- NS+IP tasks: **27 tasks, 229h remaining** (flat vs Jul 5)
- Runway @ 88h/wk: **2.60 weeks** (flat vs Jul 5)
- No change from previous report — stable backlog.

**Part 5 — Over-Estimate Tracking:**
| Task | Est | Actual | % Over | Status |
|------|-----|--------|--------|--------|
| #2615 | 12h | 106.75h | 790% | In-progress (<50%) — ongoing, verify not growing vs Jul 5 |
| #2639 fountain infinity active inactive card | 2h | 16.5h | 725% | In-progress |
| #2545 build a box service modal | 1h | 7.5h | 650% | — |
| #2702 | 8h | 25.5h | 219% | In-progress — flat (Jul 5: 218.8%) |
| #2816 | 20h | 44.25h | 121% | — |
| #2640 | 12h | 16.75h | +4.75h | In-progress (<50%) |

Key watched tasks: #2615 (790%, longstanding), #2702 (219%, flat). #2595 not in over-estimate list (possibly deployed/closed).

**Fountain Trello Board (Web Dev board):**
- To-Do: 27 | Bugs: 13 | Doing: 6 | QC Internal Backlog: 5 | QA Backlog: 6
- Customer activity (tmmckay/kunalsheth): active feedback & approvals Jul 1-3 (Merch images, Summer banner, Infinity extras). No blocking customer escalations.
- rick570 deploying to Live and Beta as normal. Last Trello activity within window — clean.

Trello: Fountain ✓ complete (Parts 2-5 clean, Matrix N/A noted).

---

## Elena — 05:28 (+07:00)

**Elena SamGuard PRs:** 0 open PRs. No pending deployments (`.elena-pending-actions.json` empty).
**SAM GUARD Slack:** 0 messages (weekend).
**Precognize (nusken):** 4 open PRs — none by nusken. No action needed.
**Elena WordPress (samguard.co):** ✅ Clean — `jsErrors: 0`, `pageErrors: 0`. CSP violations are Google Analytics false positives (filtered per policy).

Trello: Elena-SamGuard ✓, Elena-WordPress ✓ complete.

---

## Trello — 05:30 (+07:00)

**Check mail:** All 6 items ✓, card marked dueComplete.
**Check progress:**

| Item | Checklist | Result | Gate |
|------|-----------|--------|------|
| Maddy - Carrick/Kai/Luis | Normal | ✓ complete | Weekend — no Kai report expected |
| John Yi - Amazing Meds | Normal | ✓ complete | AmazingMeds 0 msgs (weekend) + TuanNT 8h ✅ |
| James Diamond - Vinn | Should do | ✓ complete | Vinn daily report Jul 3 found |
| Rory | Closely monitor | ✓ complete | Swift 0 msgs (weekend) |
| Aysar | Closely monitor | ✓ complete | MPDM updates Jul 3+4 confirmed; WS unavail noted |
| Franc | Closely monitor | ✓ complete | RDC 0 msgs (weekend, adhoc) |
| Elliott | Closely monitor | ○ OPEN | Generator production RSVP issue flagged |
| MPFC | Work | ✓ complete | 0 msgs (weekend OK) |
| Marcel | Work | ✓ complete | 0 msgs (weekend, low activity normal) |
| Elena - SamGuard | Work | ✓ complete | 0 msgs + 0 PRs + WordPress clean |
| Raymond - LegalAtoms | Work | ✓ complete | 0 msgs (weekend) |
| Neural Contract | Work | ✓ complete | Upwork session expired — silence never alert per rule |
| Bailey | Work | ✓ complete | GGS 0 msgs (weekend) + TuanNT 8h ✅ |
| Andrew Taraba | Work | ✓ complete | 0 Bizurk DMs (low activity normal) |
| Rebecca | Work | ✓ complete | William Bills 0 msgs (weekend) + TuanNT 8h ✅ |
| Colin | Work | ✓ complete | Aigile 0 msgs in window |
| Fountain | Work | ✓ complete | Capacity flat, Parts 2-5 clean |
| Philip | Work | ○ OPEN | MS Teams script unavailable (browser lock issue) |
| Ohcleo | Work | ✓ complete | Tony report found Jul 3 |
| Elena - WordPress | Pending | ✓ complete | samguard.co clean |

**Check progress card:** NOT auto-completed (Elliott + Philip still ○).

---

## Reminders — 05:30 (+07:00)

Cron mode — reminders NOT sent (no `--send-reminder` flag).

| Developer | Jul 3 Hours | Action |
|-----------|-------------|--------|
| TuanNT | 8h ✅ | No reminder needed |
| LongVV | 0h (WS unavail) | Verify weekly total interactively before reminder |
| PhucVT | 0h (WS unavail) | Hold — likely false alarm (Jul 2 precedent) |
| KhanhHH | 0h (WS unavail) | Hold — likely false alarm (Jul 2 precedent) |
| LeNH | 0h (WS unavail) | Hold — likely false alarm (Jul 2 precedent) |

---

## Matrix — 05:30 (+07:00)

**Matrix unavailable.** Token expired + refresh_token invalid_grant. Device-code auth timed out in cron. No messages fetched. Manual action required: run `node scripts/matrix-token-refresh.js` interactively or approve device auth at URL shown by `node scripts/matrix-device-auth.js`.

---

## OhCleo Slack — 05:30 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM: Celine Fierro | 15 | Tony daily report Jul 3 ✅; active communication about SendGrid + upload issue |
| #events-code | 0 | channel_not_found (normal — dormant) |

**Tony daily report (Jul 3 15:00+07):** Working on: (BE) Email to web users, (BE) Marketing emails, (BE) Security issue — password reset codes never expire.
**Upload issue resolved:** Tony: "I have resolved the upload issue" → confirmed working with other email.
**Celine (Jul 3 14:37+07):** "Hey! How did it go with sendgrid? I really need to be able to send my e-mail to creators" — SendGrid email-to-creators feature in progress. Tony confirmed partial functionality.
**Celine (Jul 3 10:17/10:24+07):** Requested Google Meet — meeting held.
**Tony's daily report: present (Jul 3) ✅**

Trello: Ohcleo ✓ complete.

---

## Upwork — 05:30 (+07:00)

Upwork session expired — headless re-login returned CAPTCHA/2FA required. Manual re-auth needed: `DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick` (requires visible browser outside cron).

Per policy: session failure ≠ alert. Trello items (Neural Contract, Rory/Aysar portions) completed.

---

## Unresolved Questions

1. **Elliott Generator production issue** — RSVP non-backwards changes in prod. Needs Elliott/Rudi to confirm fix scope and whether hotfix is required.
2. **Workstream unavailable** — same cron SSO failure as Jul 2 and Jul 4. PhucVT/KhanhHH/LeNH/LongVV Fri Jul 3 hours unconfirmed. Run `DISPLAY=:1 node scripts/workstream-login.js` interactively.
3. **Matrix token expired** — needs manual device-code auth approval. Run `node scripts/matrix-device-auth.js` and approve at shown URL.
4. **Philip MS Teams** — browser lock issue. Trello item ○ left incomplete. Last confirmed activity: Jun 16.
5. **Swish APM Signal Lost** — 6 occurrences on Jul 5. Carrick should check Swish infrastructure.
6. **Baamboozle #629** — P2 SQL integer casting bug (raw SQL without casting). Should be prioritized.
7. **Upwork session** — needs manual VNC re-login for next monitoring cycle.
