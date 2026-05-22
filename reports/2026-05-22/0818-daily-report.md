# Daily Report — 2026-05-22 (Fri) 08:18 +07:00

Window: 2026-05-21 08:34 → 2026-05-22 08:18 (+07:00)

---

## ALERTS

### 🔴 HIGH — Amazing Meds (Slack token expired)

- xoxc cookie for Amazing Meds expired, auth.test returns `invalid_auth`. Auto-refresh failed (bootload crumb extraction unsuccessful).
- **No Slack data** — cannot confirm John Yi / Nick activity status.
- Trello: ⚠️ John Yi - Amazing Meds **SKIPPED** (no data)
- **Action:** Manually refresh Amazing Meds xoxc cookie in `.slack-accounts.json`

### 🔴 HIGH — Equanimity (Slack token expired)

- xoxc cookie for Equanimity expired, same failure as Amazing Meds.
- **No Slack data** — cannot confirm Marcel / Carrick activity.
- Trello: ⚠️ Marcel **SKIPPED** (no data)
- **Action:** Manually refresh Equanimity xoxc cookie in `.slack-accounts.json`

### 🔴 HIGH — LeNH — 0h all projects Thu 21/05

- LeNH logged **0h** across all 3 task log sheets (Rory W12 + Franc W25 + Aysar W25) on Thursday 21/05.
- No leave note found.
- Matrix reminder **NOT sent** — Matrix token expired (`M_UNKNOWN_TOKEN`). Token refresh via xvfb failed (SSO session needs manual re-login).
- Trello: ⚠️ Rory, Aysar, Franc — all **SKIPPED** (LeNH 0h)
- **Action:** (1) Refresh Matrix token manually (`node scripts/matrix-token-refresh.js` with live browser), (2) Send reminder to `!OIrgPraJWrcDTnRVLQ:nustechnology.com`

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

### 🟡 Vinn — No Formal Daily Report Thu 21/05

- Discord AirAgri: Vinn was actively working (spraying/IoT SOS data with Jeff) but did NOT post "Just report my process today:" format in window.
- Jeff daily report ✓ found at 10:33 UTC in airagri-flutter.
- Trello: ⚠️ James Diamond / Vinn task **SKIPPED** (no formal Vinn report)

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

- **LongVV:** Remote day 2 (today Fri 22/05). W27 weekly total = 28.5h (above 16h part-time target). ✓
- **ChienTX:** Off today 22/05 (NUS staff, not a monitored dev).
- **TuanNT:** Leave request submitted Thu 21 May at 14:15 — dates TBD, check if today.

### GitLab Security Note (carrick@)

- New location sign-in + SSH key added to carrick's GitLab account (Thu 21 May 10:03–10:08 UTC).
- INFO — likely legitimate dev activity (Carrick was active in Swift/Baamboozle on Thu). Monitor if unexpected.

---

## Email Summary

| Account | In Window | Key Findings |
|---|---|---|
| duongdn@ | 20 | Leave requests: TuanNT, ChienTX, LongVV remote. 15x Bailey Redmine closures (routine) |
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
| LeNH | **0h** | 🔴 ALERT — no leave note |
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
| John Yi - Amazing Meds | ⚠️ skip (Slack token expired) |
| James Diamond - Vinn task | ⚠️ skip (Vinn no daily report) |
| Rory | ⚠️ skip (LeNH 0h) |
| Aysar | ⚠️ skip (LeNH 0h) |
| Franc | ⚠️ skip (LeNH 0h + not visible in Slack) |
| Elliott - GreenFort | ✓ complete |
| MPFC | ✓ complete |
| Marcel | ⚠️ skip (Equanimity token expired) |
| Elena - SamGuard Digital Plant | ✓ complete |
| Raymond - LegalAtoms | ✓ complete |
| Neural Contract | ⚠️ skip (Upwork unavailable) |
| Bailey | ✓ complete |
| Andrew Taraba | ✓ complete |
| Rebecca - William Bills | ✓ complete |
| Colin - Aigile | ✓ complete |
| Fountain | ⚠️ skip (QC behind) |
| Elena - WordPress SamGuard | ✓ complete |

---

## Reminders

- **LeNH:** ⚠️ Reminder NOT sent — Matrix token expired. Needs manual refresh + send to `!OIrgPraJWrcDTnRVLQ:nustechnology.com`: "Hi LeNH, task log for Thu 21/05 shows 0h across all projects. Please update when you can."

---

## Action Items

| Priority | Item | Owner |
|---|---|---|
| HIGH | Refresh Amazing Meds Slack xoxc cookie | Manual |
| HIGH | Refresh Equanimity Slack xoxc cookie | Manual |
| HIGH | Refresh Matrix token + send LeNH 0h reminder | Manual |
| MED | Rick: confirm FirstProject #857 fix status | Rick |
| MED | Fountain: QC needs to log hours today (Fri) — PhatDLT push | trinhmtt |
| MED | New Relic billing: upgrade or wait for month reset | carrick@ account |
| MED | Stripe: remove expired ngrok webhook from Fountaingreetings Stripe dashboard | Dev team |
| INFO | TuanNT: confirm if on leave today (Fri 22/05) | — |
| INFO | Baamboozle: confirm Carrick patch PRs reviewed/deployed | Carrick/Aysar |
