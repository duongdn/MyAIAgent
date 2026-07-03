# Daily Report — 2026-07-04 (Saturday)

**Run:** 2026-07-04T05:22:00+07:00 (cron)
**Window:** 2026-07-03T08:45:00+07:00 → 2026-07-04T05:22:00+07:00
**Leave plan:** No approved leaves on record.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets — KhanhHH | 0h sheets (Fri Jul 3); Workstream unavailable (SSO failed in cron) — recheck interactively needed |
| 2 | Sheets — PhucVT | 0h sheets (Fri Jul 3); Workstream unavailable — recheck interactively needed |
| 3 | Sheets — LeNH | 0h sheets (Fri Jul 3); Workstream unavailable — recheck interactively needed |
| 4 | Sheets — LongVV | 0h sheets (Fri Jul 3); WS unavail — part-time 16h/wk, verify weekly total interactively |
| 5 | Maddy — LIFM2-409 | Hotfix PR #513 (payout % calc) still In Progress; no Xtreme Slack activity; open issue from Jul 3 carry-over |
| 6 | Maddy JIRA — LIFM2-439 | Listed-Cons tab changes: 12h est, 21h30m actual — 🔴 over-budget by 9h30m |
| 7 | Maddy JIRA — LIFM2-259 | Bulk upload: 73h45m actual, NO estimate set ⚠️ |
| 8 | OhCleo | Celine asking about SendGrid email-to-creators issue (active, partially resolved) |
| 9 | Matrix | Token expired, device auth pending (code: OMFLP5 at matrix.nustechnology.com/auth/link) |
| 10 | Philip | MS Teams login blocked (Microsoft security challenge) — item incomplete |

**Today (Sat Jul 4):** No approved leaves. Saturday — devs may not work. Monitoring covers Friday Jul 3 workday.

---

## Email — all — 05:01 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 5 | none | no events |
| carrick@nustechnology.com | 12 | Generator-api pipeline fails (Jul 2, also fixed same day); Snyk vuln alert (marcel org) | no events |
| nick@nustechnology.com | 18 | Precognize PR activity (normal) | Weekly Meeting with Devs 04:30 UTC (Teams) |
| rick@nustechnology.com | — | Rollbar FirstProject production errors (FYI) | HEAL Meeting 05:30 UTC; OmniGPT Daily Sync 03:30 UTC |
| kai@nustechnology.com | 5 | Jira LIFM2-447, LIFM2-439, LIFM2-259 (Maddy client activity) | no events |
| ken@nustechnology.com | 80 | Precognize/Welligence normal GitHub PR activity | DE Bi-weekly retrospective 02:00 UTC; DE Daily Standup x2; DE Tech Talks 02:00 UTC |
| vuongtrancr@gmail.com | — | — | — |
| dnduongus@gmail.com | — | — | — |
| freelancer@mpfc | — | — | — |

**carrick@ notes:** generator-api had failing pipelines Jul 2 03:03–07:14 UTC but also had "Fixed" pipelines at 03:19 and 03:20. Redmine Bug #79565 (Elliott, tested on staging) — FYI. Snyk vuln alert for "marcel" org. All FYI per email-content-is-FYI-only policy.
**rick@ notes:** Rollbar `[FirstProject]` production errors — repeat pattern, FYI only.
**Leave emails:** None found; no upcoming approved leaves.

Trello: Check Mail card not yet created by Power-Up (recurring card expected later today).

---

## Slack — all — 05:03 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 0* | *MPDM C07SQ4HAUHZ: 1 msg "Yesterday's update" from Carrick (KhanhHH) — e2e testing, Change Team Ownership fix, Laravel 12 upgrade |
| RDC - FM Monitoring | 0 | Quiet — no dmetiner alerts |
| Swift Studio | 0 | Quiet — no Carrick alerts |
| Xtreme Soft Solutions | 0 | Quiet — no Kai daily report found ⚠️ |
| SAM GUARD - Mobile | 0 | Quiet — no Elena alerts |
| GLOBAL GRAZING SERVICES | 0 | Quiet — no Nick alerts |
| Amazing Meds | 0 | Quiet — no issues |
| Generator | 1 | Violet → Rudi: reminder task 361 (RSVP cut-off) may need mobile release coordination |
| LegalAtoms | 0 | Quiet |
| MyPersonalFootballCoach | 0 | Quiet |
| William Bills | 0 | Quiet |
| Equanimity | 0 | Quiet |
| SoCal Auto Wraps | SKIP | Dropped 2026-05-11 |
| Aigile Dev | 0 | Quiet |
| OhCleo | — | See OhCleo section below |

**Baamboozle MPDM (C07SQ4HAUHZ):** Carrick posted "Yesterday's update" (for Jul 3 work): e2e testing for upgrade plan (in-progress), Change Team Ownership #533 (dev done + deployed to nusdev), Laravel 12/PHP 8.5/nginx 1.28.3 fix (dev done + deployed to nusdev).
**Generator:** Violet reminder about RSVP cut-off task mobile coordination — informational.

Trello: Rory ✓, Franc ✓, MPFC ✓, Marcel ✓, Elena-SamGuard ✓, Raymond ✓, Neural ✓, Bailey ✓, Rebecca ✓, Colin ✓ completed. Maddy ○ (Xtreme 0 msgs), Aysar ○ (KhanhHH WS unavail), Elliott ○ (KhanhHH WS unavail) left incomplete.

---

## Discord — AirAgri + Bizurk — 05:05 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 14 | Vinn daily report ✅ + active JD sessions on webapp/flutter |
| Bizurk (nuscarrick) | 0 | Quiet — no Andrew Taraba DMs |

**AirAgri (nusvinn) — #airagri_webapp:**
- Vinn daily report (17:54 UTC Jul 3): reviewed Leon's PR 556+557, worked on Dynamic Property Check-In Forms & Contractor Sign-In Configuration, created employees/contractors for Select Harvests Carina West Processing Facility
- JD assigned Broadcast Alerts Planner ticket to Vinn (Figma prototype provided)
- JD requesting Admin portal 2FA via SMS, user-specific accounts, and push notification configuration (new tickets assigned)
- Carina West Processing account creation confirmed (bellatric02)

**AirAgri — #airagri-flutter:**
- Jeff report: focusing on Spray app per JD direction
- Jeff → JD: Canary Speech API 400 error (error code 65007) — asking JD to escalate with Canary Speech provider
- Jeff: Training Module not on mobile yet, asking if to implement

**Bizurk:** 0 messages, no Andrew DMs — normal.

Trello: James Diamond ✓, Andrew Taraba ✓ completed.

---

## Scrin.io — 05:06 (+07:00)

**Scrin.io (TuanNT / John Yi — 2026-07-03):** 9h31m logged (2 sessions: 07:11-12:09 4h58m, 12:37-17:10 4h33m, both 99% activity).

---

## Sheets — task logs — 05:08 (+07:00)

⚠️ **Workstream unavailable** — SSO login failed in cron mode (known recurring issue since Jul 2 cron). All figures are Google Sheets only. Recheck interactively after market hours to get WS data.

| Developer | Fri Jul 3 (Sheets) | WS | Status |
|-----------|--------------------|----|--------|
| TuanNT | 8h (CharlesChang 0.5h + Paturevision 7.5h) | WS unavail | ✅ OK |
| LongVV | 0h sheets | WS unavail | ⚠️ verify weekly total (part-time 16h/wk) |
| PhucVT | 0h sheets | WS unavail | ⚠️ likely false alarm (same issue Jul 2 — real 8h found in WS then) |
| KhanhHH | 0h sheets | WS unavail | ⚠️ likely false alarm (same issue Jul 2 — real 8h found in WS then) |
| LeNH | 0h sheets | WS unavail | ⚠️ likely false alarm (same issue Jul 2) |

**TuanNT:** 8h total ✅ — gates John Yi, Bailey, Rebecca all clear.
**Workstream note:** Jul 2 cron had identical failure. Recheck found PhucVT 8h + KhanhHH 3.5h in WS. Same root cause expected. Needs interactive `DISPLAY=:1 node scripts/workstream-login.js` and re-scan.

### Sheets — Maddy JIRA — W13 — 05:08 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-409 | Import Shopify payouts | In Progress | 113h15m | 108h15m | 11h | ✅ |
| LIFM2-259 | Bulk upload images to Amazon S3 | Testing - Anoma | 0h | 73h45m | 1h | ⚠️ no est |
| LIFM2-439 | Listed-Cons tab changes | Testing - Anoma | 12h | 21h30m | 0h | 🔴 over 9h30m |
| LIFM2-436 | Returns | Testing - Anoma | 15h | 13h45m | 1h | ✅ |
| LIFM2-446 | Implement Row-Locking in Quoting Tool | Review | 12h | 11h | 3h | ✅ |

**Over-budget (1):** LIFM2-439 est=12h actual=21h30m over=9h30m
**No estimate (1):** LIFM2-259 — dev must set estimate before logging more hours

---

## Fountain — 05:10 (+07:00)

**Part 1 — Matrix Plan:** N/A — Matrix token expired, device auth code OMFLP5 pending at https://matrix.nustechnology.com/auth/link. Using last known plan (W33, Jun 30): ViTHT 36h, ThinhT 20h, DatNT 24h, VuTQ 8h → **88h/wk**. QC: PhatDLT + HungPN.

**Part 2+3:** Dev task-log hours not monitored per policy (Summary W52 shows 0h current week — consistent with end-of-quarter numbering artifact, not real 0h).

**Part 4 — Capacity & Runway:** NS+IP remaining = **229h / 27 tasks** — **flat vs 2026-07-03** (no change). Runway = 229/88 = **2.60 wk**. Script column-idx bug (row[2] vs row[6] for Status) now fixed in `fountain-w33-capacity-scan.js`.
Top NS+IP tasks: #1178 40h, #2912 38h, #2775 38.8h, #2869 11.3h, #2885 23h.

**Part 5 — Over-Estimate Tracking:** All key tasks flat vs yesterday:
- #2615: 789.6% over (106.75h actual / 12h est) — Deployed on Staging, stable
- #2702: 218.8% over (25.5h / 8h) — In-progress, active but not growing today
- #2735: 4.6% over (136h / 130h incl CR 40h) — within threshold
- #2872: 44.5% over (46.25h / 32h) — In-progress, stable
- #2624: 160.4% over (31.25h / 12h) — Dev Done, done
- 37 tasks total sheet-wide >20% over (unchanged)

**Trello board (Web Development, 1048 cards total):** To-Do 27, Bugs 13, Doing 6, QC Internal 5, QA Backlog (Staging) 6, Done (In Live) 967, Shelf 11. No new customer comments from monitored users (kunalsheth/tmmckay/mike62798179/iris63293413) in window.

Trello (O83pAyqb): "Fountain - DOCUMENT" ✓ complete (Parts 2-5 clean, Matrix N/A noted).

---

## Elena — 05:12 (+07:00)

**PRs/Deploy:** 0 open PRs in Elena-SamGuard-Digital-Plant. `.elena-pending-actions.json` absent (clean).
**Precognize (nusken):** 0 nusken-authored open PRs.
**WordPress SamGuard:** CSP violations from doubleclick.net + Google Analytics only — same known false positives as before (user previously confirmed leave as-is). No real JS errors (`jsErrors: []`, `pageErrors: []`). Clean.

Trello: Elena-SamGuard Digital Plant ✓, Elena-WordPress SamGuard ✓ complete.

---

## OhCleo Slack — 05:04 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 15 | Active customer + dev communication |
| #events-code | 0 | channel_not_found (dormant) |

**Tony daily report (2026-07-03 14:57 +07):** Present ✅
- (BE) Email to web users ([Trello #184](https://trello.com/c/GTM2FFCa/184-e-mails-to-the-webb-users))
- (BE) Marketing e-mails ([Trello #183](https://trello.com/c/HtfPT5JI/183-marketing-e-mails))
- (BE) Security issue password reset code ([Trello #127](https://trello.com/c/4D7QyLU8/127-security-issue-password-reset-codes-never-expire))

**Celine (customer) messages:**
- 07:50: Forwarded customer email about stuck upload (Macxxknows — "4th upload stuck in AI transcription")
- 07:57: Asked if Tony got the audio file
- 10:17/10:24: Requested meeting now + sent Meet link (https://meet.google.com/hni-ditj-aqi)
- 14:37: "I really need to be able to send my e-mail to creators" (SendGrid issue)
- Tony 14:56: "Can you check again? I have check with other email and it's work."

**Active issues:**
- Upload stuck (Macxxknows) — Tony resolved: "The upload issue now works fine" (08:08). Creator to reupload.
- SendGrid email-to-creators — Tony investigating, partial fix applied (other emails work), Celine needs confirmation. ⚠️

Trello: Ohcleo ○ incomplete — Celine SendGrid issue active and unconfirmed resolved.

---

## Trello — Check Progress — 05:20 (+07:00)

**Check Progress card (6a4822d83dc7abb9a48cbf66): 15/20 complete**

✓ Complete: John Yi, James Diamond-Vinn, Rory, Franc, MPFC, Marcel, Elena-SamGuard, Raymond, Neural Contract, Bailey, Andrew Taraba, Rebecca, Colin, Fountain, Elena-WordPress SamGuard

○ Incomplete:
- **Maddy** — Xtreme Slack 0 messages; LIFM2-409 hotfix still In Progress (no merge confirmation since Jul 2 19:02)
- **Aysar** — MPDM update found ✓ but KhanhHH task log 0h (WS unavail)
- **Elliott** — KhanhHH 0h (WS unavail); Generator Slack had Violet activity (not Elliott directly)
- **Philip** — MS Teams login blocked (Microsoft security challenge)
- **Ohcleo** — Celine SendGrid issue active

**Check Mail card:** Not yet created by Trello Power-Up (recurring card expected later today).

---

## Upwork — 05:19 (+07:00)

Sessions expired for all workrooms (carrick, Neural, Aysar). Headless login blocked (CAPTCHA/2FA).
- **Rory** (carrick): session expired — manual re-auth needed: `node scripts/upwork-login.js --login --account=carrick`
- **Neural Contract**: session expired — silence = no alert → Trello Neural ✓ complete (per policy)
- **Aysar** (carrick): session expired — Upwork not the Aysar gate anyway

Needs interactive VNC re-login: `bash scripts/vnc-login-session.sh upwork`

---

## MS Teams — Philip — 05:20 (+07:00)

Microsoft account security challenge during login — Teams did not load. Philip item left ○ incomplete. Last known activity: Jun 16.

---

## Matrix — 05:21 (+07:00)

Matrix token expired. Device auth in progress: code **OMFLP5** at https://matrix.nustechnology.com/auth/link (expires 20 min from 05:21 +07). Recheck will fetch live Matrix data once approved.

**Using last known data from 2026-07-03 report:**

### Key updates (from Jul 3 — for context)

**Celine - OhCleo:** Active dev day; 5 tickets pushed, one "undefined" bug being tracked.
**Fountain / Kunal:** #2914/#2956 live, #2913 in QC, #2955 reopened.
**Maddy - Xtreme:** Template-mail bug fixed; lock/take-over reverted.
**James Diamond / Blair Brown:** LeNH transitioning Blair Brown → James Diamond.

---

## Reminders — 05:21 (+07:00)

WS unavailable — cannot confirm 0h for PhucVT/KhanhHH/LeNH. Based on sheets-only data and Jul 2 precedent (WS failure caused same false 0h), **NOT sending reminders** until WS is verified interactively. LongVV 0h/day is normal (part-time, weekly check needed).

- PhucVT: 0h sheets — WS needed to confirm before reminder
- KhanhHH: 0h sheets — WS needed to confirm before reminder  
- LeNH: 0h sheets — WS needed to confirm before reminder
- LongVV: 0h today (normal for part-time, check weekly total)
- TuanNT: 8h ✅ — no reminder needed

---

## Summary

**Completed Trello items:** 15/20 on Check Progress. Check Mail card not yet created.

**Requires interactive recheck:**
1. Workstream login + re-scan for PhucVT, KhanhHH, LeNH, LongVV (cron SSO fails)
2. Matrix token approval (code OMFLP5) → fetch live Matrix data
3. Philip MS Teams (Microsoft security challenge blocking headless login)
4. Maddy — verify LIFM2-409 hotfix status

**Unresolved questions:**
- KhanhHH/PhucVT/LeNH actual hours on Jul 3 (WS unavail in cron)
- LongVV weekly total for W{n}
- SendGrid email delivery for OhCleo confirmed fixed?
- Canary Speech API 400 error for AirAgri flutter — Jeff escalating via JD
