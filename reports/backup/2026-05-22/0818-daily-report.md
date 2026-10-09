# Daily Report — 2026-05-22 (Fri) 08:18 +07:00

Window: 2026-05-21 08:34 → 2026-05-22 08:18 (+07:00)

---

## ALERTS

### Amazing Meds — Token refreshed, data retrieved

- John (John Yi) in `#web-dev-with-nick` at 15:47 UTC: "Can you add a data layer? [loom] Need it for tracking" — task request to Nick, normal dev workflow.
- No production alerts. Nick is gate dev; request awaiting response (after hours VN time).
- Trello: ✓ John Yi - Amazing Meds **COMPLETE**

### Equanimity — Token refreshed, data retrieved

- komal.bailur in `#xid-technologies` tagged @NUS Carrick: "Thanks i have checked the file n sent to sgbuildex i hope this time it ll pass all their test" — client confirming file sent for testing. Routine.
- No alerts for Marcel or Carrick.
- Trello: ✓ Marcel **COMPLETE**

### 🟡 LeNH — Franc 0h all week / Rory+Aysar: corrected

- **Rory W12 Thu**: LeNH logged **7.83h** (BXR-220 UAE Multi-Region Backend Architecture). ✓ Working.
- **Aysar W25 Thu**: 6h total, all from **KhanhHH** (redirect fix 1.5h + Change Team Ownership 4.5h). LeNH 0h on Aysar but was on Rory — expected split.
- **Franc W25 Thu**: LeNH logged **0h** — no tasks logged Mon–Thu all week. No leave note. ⚠️ Alert.
- Matrix reminder was sent based on incorrect initial read (all 3 sheets showed 0h). Rory/Aysar were valid; Franc is the real concern.
- Trello: ✓ Rory **COMPLETE**, ✓ Aysar **COMPLETE**, ⚠️ Franc **SKIPPED** (LeNH 0h all week)

---

## MEDIUM

### 🟡 FirstProject — Production Rollbar (rick@)

- Rollbar alert: `[FirstProject] production — 10 occurrences in 5 minutes: #857 Minified React error #418` — sent Wed 20/05 15:00 UTC; daily summary for Thu also received.
- Ongoing from yesterday's HIGH alert. Rick to investigate/confirm fix status.
- Trello: ✓ Rick mail **COMPLETE** (email checked; alert noted here)

### 🟡 Fountain — QC Severely Behind (W27)

- W27 plan: QC = 22h. Actuals Mon–Thu: PhatDLT 8h + HungPN 0h = **8h / 22h (36%)** with only Friday remaining.
- ViTHT: 24h / 40h plan — absent Thursday, needs 16h today (unlikely).
- DatNT: 32h / 40h — needs full Friday.
- ThinhT: 4h / 4h ✓ complete. LamLQ: 30.75h / 20h ✓ exceeded.
- Trello: ⚠️ Fountain **SKIPPED**

### 🟡 Fountain — Over-estimates (stable)

- **#2595:** 168.25h actual vs 120h est+CR (+40%) — stable (same as yesterday)
- **#2615:** 106.75h actual vs 12h est+CR (+790%) — stable
- **#2735:** 133h actual vs 120h est+CR (+11%) — stable, no overnight growth
- tmmckay posted **15 comments** on 2026-05-20 (outside window), approving 6 new tasks — backlog growing.
- Runway: 635h remaining / 90h week = **7.1 weeks** (methodology note: today's calc includes Not Started tasks; yesterday's 3.4w used narrower filter)

### 🟡 New Relic Monthly Cap Exceeded (carrick@)

- Email from account-notifications@newrelic.com (Thu 21 May 12:00 UTC): free tier 100GB/month exceeded. Monitoring data no longer syncing.
- Billing action or wait for month reset needed.
- Trello: ✓ Carrick mail **COMPLETE** (checked; alert noted here)

### Vinn — Active, No Formal Report Format

- Discord AirAgri: Vinn responded to James Diamond's alarm issues all day (01:53–10:07 UTC), fixed login issue, deployed spray module to prod at 09:06 UTC.
- No formal "Just report my process today:" post, but work clearly visible and James Diamond was satisfied.
- Jeff posted formal daily report at 10:42 UTC in airagri-flutter (4h: Hazard/Incident Android fix + audio/video playback).
- Trello: ✓ James Diamond / Vinn task **COMPLETE** (active all day, Jeff formal report ✓)

---

## INFO

### InfinityRoses — Ongoing Production Errors

- Rollbar daily summaries for InfinityRoses (Thu 21/05) still arriving. Bugs #426/#427 from yesterday unconfirmed resolved.
- Monitor.

### William Bills — Payment Issue RESOLVED

- QuânLee confirmed fix deployed. Oliver thanked QuânLee (02:25 UTC). Production deploy **deferred to Monday** (Lucas: "shouldn't deploy production this Friday, recommend Monday").
- Lucas daily report submitted (09:46 UTC, 7.5h: Klaviyo Next JS, cart/checkout pages).
- No further mention of subscription data leak.
- Trello: ✓ Rebecca - William Bills **COMPLETE**

### Neural Contract (Upwork) — No Urgent Messages

- Last 20 messages fetched via CDP intercept (carrick account).
- Last CLIENT message: **Apr 24** — "Thanks Carrick. Enjoy your holiday on Monday! Michael" (holiday wishes, acknowledged).
- Last Carrick message: **Apr 29** — holiday reminder for Apr 30.
- No messages since Apr 29. No unresolved client requests.
- Trello: ✓ Neural Contract **COMPLETE**

### Stripe Webhook — Dev URL Expired (Fountaingreetings)

- rick@: Stripe email (Thu 21 May 12:37): webhook endpoint `https://a2d1-118-69-244-93.ngrok-free.app/stripe/webhook` failing for Fountaingreetings account.
- ngrok-free.app URL = temporary dev tunnel. Not a production webhook. Likely a developer's local session that expired.
- **Action:** Dev team to reconnect or remove expired ngrok webhook in Stripe dashboard.

### Baamboozle — Client Patch Requested

- iancox890 (client) requested patch deploy "later today" (Thu 17:35 UTC).
- Carrick raised PRs: `baamboozle-web-app` and `bbzl-web-client/pull/36` — session revoke redirect fix + Cypress tests.
- No deploy confirmation in window.
- GitHub: Issue #613 updated Thu 21/05.

### LegalAtoms — DynamoDB Payment Bug + Fix in Progress

- Backend: DynamoDB payment status failing because frontend not passing `content_id`/`instance_id` to `/api/stripe/pay`.
- Talha raised a PR fix. Raymond managing code reviews.
- Nick/Raymond both active. No blocking escalation.
- Trello: ✓ Raymond - LegalAtoms **COMPLETE**

### RDC — Tuner Instability (Self-Recovered)

- 3x Tuner Instability Alert ~07:42 UTC + 1x Recovery ~07:48 UTC. All automated. No human activity (dmetiner/Franc).
- Trello: ⚠️ Franc **SKIPPED** (Franc not active in Slack + LeNH 0h on sheets)

### Aigile — Staging Briefly Down

- Colin: "Staging is down" (05:44 UTC). Carrick: "I see no issue, what you see?" (06:25 UTC). Likely false alarm.
- Trello: ✓ Colin - Aigile **COMPLETE**

### GGS — Staging Issue + Double-Scan Bug

- Amy (NUS dev): Staging server issue last night (~04:23 UTC). Double-scan bypass bug on specific orders found.
- Update deployed to Live at 07:13 UTC (barcode auto-regenerate). Nick mentioned indirectly but not directly active.
- GGS Nick daily report: not required per rules (absence not alert). Amy handling.
- Trello: ✓ Bailey **COMPLETE** (VietPH 8h, VuTQ 8h in Bailey/Paturevision)

### KhanhHH — 6h Thu (Aysar), No Daily Report in Matrix Room

- KhanhHH logged 6h on Aysar W25 Thu (fixing session revoke redirect 1.5h + Change Team Ownership 4.5h).
- Generator W41 = 0h Thu (KhanhHH working Aysar full day).
- No daily report in Jamie+Ronan Matrix room (!gjtiuNjeqDarGWkSnf) — DuongDN sent reminder to KhanhHH on Thu 07:57 UTC.
- NOTE: 6h < 8h target but no leave note. Borderline.

### Fountain Matrix Plan (W27)

- Plan posted by @trinhmtt on Mon 2026-05-18 11:10 ICT: ViTHT 40h, ThinhT 4h, DatNT 40h, LamLQ 20h, QC 22h.
- VuTQ not in plan (moved to Bailey — expected).
- HaVS not in plan (normal, not always on plan).
- **Note:** Matrix token expired — plan data sourced from Fountain agent's read during the scan window.

### Scrin.io (TuanNT / John Yi)

- TuanNT last Scrin.io entry: May 11 (7h). No data May 12–21 (10 consecutive days).
- Context: TuanNT submitted leave request Thu 21 May → some days may be leave.
- TuanNT task log Thu 21: 7.5h (all on Rebecca). JohnYi sheet = 0h.
- Monitor — may require follow-up if Scrin.io tracking not resumed post-leave.

### Leave / Remote

- **LongVV:** Requested remote today (sick) → ChienTX rejected: "không cần làm remote nữa" → LongVV is OFF today 22/05. W27 weekly total = 28.5h (above 16h part-time target). ✓
- **ChienTX:** Off today 22/05 (NUS staff, not a monitored dev).
- **TuanNT:** Leave dates are **11/6 and 12/6** (June 11-12, family trip). NOT today. TuanNT working normally Fri 22/05.
- **VietPH:** NEW leave request (Fri 22/05 08:45 +07) — off **Mon 25/05/2026** for medical check-up. No response yet.

### GitLab Security Note (carrick@)

- New location sign-in + SSH key added to carrick's GitLab account (Thu 21 May 10:03–10:08 UTC).
- INFO — likely legitimate dev activity (Carrick was active in Swift/Baamboozle on Thu). Monitor if unexpected.

---

## Email Summary

| Account | In Window | Key Findings |
|---|---|---|
| duongdn@ | 20 | TuanNT leave 11-12/6 (not today). VietPH leave Mon 25/05. LongVV remote rejected → off today. ChienTX off. 15x Bailey Redmine closures (routine) |
| carrick@ | 19 | New Relic cap exceeded. GitLab sign-in+SSH. Elliott/Generator Redmine #78565/#78801. SoCal Rollbar ignored. |
| rick@ | 10 | FirstProject #857 Rollbar (prod). InfinityRoses daily summary. Stripe webhook dev URL. Twilio notice. |
| nick@ | 17 | No John Yi emails. Azure DevOps PR (CNA). AuShare ClickUp. Candasurveyors automated reports. |
| kai@ | 1 | Bitbucket PR #476 comment from Madhuraka (routine code review) |
| ken@ | 20 | All welligence repo notifications (Thom Morais, Arthur Jacobs, przekogo). No Precognize activity. |

---

## Sheets Summary — Thu 21/05

| Developer | Thu Hours | Alert |
|---|---|---|
| LongVV | 8h | NO (part-time, weekly 28.5h ✓) |
| PhucVT | 8h | NO ✓ |
| TuanNT | 7.5h (all Rebecca) | NOTE: 0h JohnYi; leave request context |
| VietPH | 8h | NO ✓ |
| KhanhHH | 6h (all Aysar) | NOTE: under 8h, no leave |
| LeNH | 7.83h (Rory) + 0h Franc + 0h Aysar | ✓ Rory OK; ⚠️ Franc 0h all week |
| VuTQ (Bailey) | 8h | NO ✓ (Fountain 0h expected) |

---

## Fountain W27 Summary (Mon–Thu)

| Dev | Plan | Mon–Thu Actual | Status |
|---|---|---|---|
| ViTHT | 40h | 24h | ⚠️ Needs 16h Fri |
| ThinhT | 4h | 4h | ✓ Complete |
| DatNT | 40h | 32h | Needs 8h Fri |
| LamLQ | 20h | 30.75h | ✓ Exceeded |
| VuTQ | — | 0h | OK (moved to Bailey) |
| PhatDLT (QC) | 22h | 8h | 🔴 Critical |
| HungPN (QC) | — | 0h | 🔴 All week 0h |

---

## Trello Summary

**Check Mail:** ✓ All 6 complete (DuongDn, Carrick, Rick, Kai, Ken, Nick)

**Check Progress:**

| Item | Status |
|---|---|
| Maddy - Carrick/Kai/Luis | ✓ complete |
| John Yi - Amazing Meds | ✓ complete |
| James Diamond - Vinn task | ✓ complete (Vinn active all day + Jeff formal report) |
| Rory | ✓ complete (LeNH 7.83h Thu) |
| Aysar | ✓ complete (KhanhHH 6h, no rework issues) |
| Franc | ⚠️ skip (LeNH 0h all week, no leave note) |
| Elliott - GreenFort | ✓ complete |
| MPFC | ✓ complete |
| Marcel | ✓ complete |
| Elena - SamGuard Digital Plant | ✓ complete |
| Raymond - LegalAtoms | ✓ complete |
| Neural Contract | ✓ complete |
| Bailey | ✓ complete |
| Andrew Taraba | ✓ complete |
| Rebecca - William Bills | ✓ complete |
| Colin - Aigile | ✓ complete |
| Fountain | ⚠️ skip (QC behind) |
| Elena - WordPress SamGuard | ✓ complete |

---

## Reminders

- **LeNH (Franc):** ✓ Reminder sent (based on initial read showing 0h all projects) — Matrix token refreshed via OIDC device auth (code PRVYIF). Note: Rory 7.83h and Aysar/KhanhHH 6h were confirmed after reminder sent. Franc remains 0h all week — reminder still valid for Franc.

---

## Action Items

| Priority | Item | Owner |
|---|---|---|
| ✓ | Amazing Meds + Equanimity tokens refreshed | Done |
| ✓ | Matrix token refreshed (OIDC device auth PRVYIF) + LeNH 0h reminder sent | Done |
| MED | Rick: confirm FirstProject #857 fix status | Rick |
| MED | Fountain: QC needs to log hours today (Fri) — PhatDLT push | trinhmtt |
| MED | New Relic billing: upgrade or wait for month reset | carrick@ account |
| MED | Stripe: remove expired ngrok webhook from Fountaingreetings Stripe dashboard | Dev team |
| INFO | TuanNT: leave is 11-12 Jun (not today) — working normally today | ✓ resolved |
| INFO | VietPH: leave request Mon 25/05 — needs approval from manager | Pending |
| INFO | Baamboozle: confirm Carrick patch PRs reviewed/deployed | Carrick/Aysar |
