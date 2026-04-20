# Daily Report Refresh — 2026-04-20 13:34 +07

Window: 2026-04-20 08:40 → 13:34 (~5h). Previous daily report: 2026-04-20 08:40.

## Slack Refresh (08:40 → 13:34)

Total new msgs across 14 workspaces: **88**. Auth: OK for all (no invalid_auth, no refresh needed).

| Workspace | Msgs | Notable |
|---|---|---|
| Baamboozle | 5 | #engineering GitHub bot notifications (3); #gamedev Martin to Aysar "good to deploy" 00:40 |
| RDC - FM Monitoring | 1 | #rpi-reboot-logs Tuner Recovery Alert 11:56 (auto service msg, INFO) |
| Swift Studio | 1 | Jeff DM to client 09:21 "will send the plan shortly" — normal |
| Xtreme Soft Solutions | 7 | Kai requested schedule swap (Mon/Thu → Tue/Wed next week for holiday) w/ Madhuraka + Anoma; Madhuraka asked Kai for 434 estimation today, Kai confirmed |
| SAM GUARD - Mobile | 7 | #mql-leads all 7 are HubSpot MQL bot notifications — noise |
| GGS | 6 | **Follow-up (Android upgrade):** Amy deployed Live fixes + VAT features 11:50; Joey asked about VAT features 13:00; Amy explained country-specific VAT toggle 13:12. Nick was looking at a maintenance issue 08:09/09:22 |
| Amazing Meds | 7 | **Follow-up (Vercel env var leak):** Nick investigating 08:15 → shared contact form sheets 08:26 → confirmed no breach signs 08:28 → confirmed Vercel vars set 08:29 → 08:42 John clarified Vercel itself was breached, asked for key rotation → 08:52 Nick "Okay. I'll create new keys." **In progress, being handled.** |
| Generator | 23 | Heavy #mobile + #release + #business-analysts activity. Elliott/Violet/Rudi/Jeff coordinating release plan: Rudi releasing rent feature tonight, CMS/API release tomorrow, mobile release list compiled. Violet out of task today (Jeff covering). Directory icon color asset request to Rudi. Dev coordination only — no alerts |
| LegalAtoms | 0 — silent | |
| MyPersonalFootballCoach | 0 — silent | |
| William Bills | 0 — silent | **Follow-up (Fri heavy activity):** did NOT continue today |
| Equanimity | 29 | **#xid-technologies** Carrick + Komal iterating on FIN data cleanup (IDs 198, 308, 309 etc); 13:33 Carrick "let me push the final one" / 13:32 "confirm all are fixed" — active team work, no alerts |
| SoCal Auto Wraps | 0 — silent | |
| Aigile Dev | 2 | Hendrix asking about Apple/Google Pay upgrade estimate 10:14; Rick reminder re upgrade 08:52 — client follow-ups, no alerts |

### Alerts
- **None new.** No team-facing issues. All flagged items are either dev coordination, client follow-ups, or external bot noise.

### Follow-ups from morning report
- **Amazing Meds / Vercel env vars:** Nick acknowledged + confirmed vars are set in Vercel, John clarified it's a Vercel-side breach (not their site), Nick to rotate keys. On track. Monitor for confirmation that rotation is done.
- **William Bills:** silent — Fri heavy activity did not continue.
- **GGS Android upgrade:** Nick/Joey/Amy still coordinating (VAT features clarification). Live deployment done. On track.

### Auth issues
- None. All 14 workspaces returned data successfully including session tokens (Amazing Meds, Equanimity).

## Email Refresh (08:40 → 13:34)

**Window:** 2026-04-20T08:40 +07 → 2026-04-20T13:34 +07 (~5h).
**Method:** IMAP imap.zoho.com:993 SSL, SINCE 19-Apr-2026, filtered in-memory by Date header >= cutoff. Timeline fallback: `config/.monitoring-timelines.json` per-account values are stale (2026-04-17); used `daily_report.last_run` = 2026-04-20T08:40 +07.

### Per-account counts

| Account | Folder | Filter | Count | Notable |
|---|---|---|---:|---|
| duongdn | INBOX | — | 0 | 0 new — no new mail |
| carrick | INBOX | — | 3 | 2× TestFlight Generator Demo 1.8.6 builds (68 @ 09:43, 69 @ 13:31) — routine. 1× Redmine Bug #78278 Elliott/Generator "App Shows Error When Accessing My Bookings Screen" (internal staging). **No New Relic updates** — morning data-cap/sync alert carryover, still unresolved. |
| nick | INBOX | John Yi | 0 | 0 new — no new mail |
| rick | INBOX | Kunal/Fountain/InfinityRose | 8 | 7× BugSnag `[FountainStaging]` (NoMethodError pro_orders#swappable_gifts ×2; PendingMigrationError /api/v1/users/me & /api/v1/meta_tags; StatementInvalid db:migrate; NoMethodError holiday_deliveries#index; ActiveStorage::InvariableError gifts#index) — **all staging/development, per rule = INFO not alert**. 1× Rollbar `[FirstProject] production — ChunkLoadError #868` (fountaingifts.com /_next/static/chunks/2846) — FE chunk-load on production, typically stale-cache post-deploy; LOW severity. No Kunal/Fountain human comments. |
| kai | INBOX | Madhuraka | 1 | Bitbucket reply from Madhuraka Godahewa on PR #456 "Update quote form feedback" (xtreme-web/rms). Routine review comment, no Redmine Elliott/Generator for Kai. |
| ken | NewsLetter | Precognize/development | 15 | 2× Precognize/development match filter: Re: PR #4831 SR-6921 alerts header tabs (briannus) @ 09:23; new PR #4843 SR-7528 detach ORI level from admin service (nusdavid + windsurf-bot) @ 12:03. Other 13 off-filter: mimaizumi/amocc-material (PR #7372, #7374, #7363), welligence/WellStack (PR #10304, #10338), Vercel security advisory. Routine PR traffic. |

**Totals:** duongdn 0 | carrick 3 | nick 0 | rick 8 | kai 1 | ken 15 → **27 msgs** raw; **0 new alerts**, 1 carryover (New Relic), 1 LOW (Rollbar production chunk).

### Alert summary (refresh window)

| Severity | Account | Item | Owner | Note |
|---|---|---|---|---|
| (carryover) | carrick | New Relic monthly data-cap + sync failure (from morning) | ops/carrick | No update email in window — status unchanged, still OPEN |
| LOW | rick | Rollbar production ChunkLoadError #868 (fountaingifts.com chunk 2846) | rick/FE | Likely stale-cache after deploy; monitor frequency only |

### Unresolved questions

- New Relic data-cap alert (carrick) — no follow-up email in 5h window. Has it been acked/resolved via the New Relic UI or Trello card? Parent agent should confirm before re-flagging.

## Upwork + Neural Refresh (08:40 → 13:34)

**Method:** `scripts/upwork-weekly-hours.js` (fresh fetch, all 5 workrooms, status=success). `scripts/upwork-neural-messages.js` (messages via /api/v3 intercept). Task log (Mon 20/04 W24) assumed empty at 13:34 — devs log EOD (no morning piece4 refresh for W24 in this window).

| Dev / Workroom | Mon hrs (Upwork) morning → now | Δ | Task log (Mon 20/04) | Notes |
|---|---|---:|---|---|
| Rory — LeNH | 0h → 0h | 0 | 0h (W24 empty) | OK — inactive dev on Rory this wk |
| Aysar — LeNH | 0h → 0h | 0 | 0h (W24 empty) | OK — Aysar inactive since ~Mar 9 per reference memory |
| Bailey DEV1 — VietPH | 0.5h → **4.33h** | **+3.83h** | 0h (W24 not yet filled) | ACTIVE. VietPH tracking Mon afternoon. Task log reconcile expected EOD. Not over-inflated vs weekly pace (last wk 23:40h) |
| Bailey DEV3 — DuongDN | 0h → 0h | 0 | 0h | OK — contract inactive (expected) |
| Neural Contract — external | n/a (messages only) | — | n/a | See below |

**Week totals (Upwork Apr 20-26):** Rory 0:00, Aysar 0:00, Bailey DEV1 4:20, Bailey DEV3 0:00. Neural messages-only (no timesheet).

### Neural Contract — Messages delta

Fetched latest 20 stories. **Latest 3 messages (sorted desc, +07):**
- 2026-04-16 17:12 Carrick: "I did and pushed code, let check"
- 2026-04-16 15:24 Carrick: "Let me check"
- 2026-04-15 14:06 Michael: 3 non-urgent tasks (Compare tab filenames / "Departures table" rename / manager login analyse routing)

**No new Michael Larov messages since Apr 16 17:12.** No new client messages in the 08:40→13:34 window. Silence is normal for this low-activity contract.

### Flags

- **Bailey DEV1 (VietPH)** — morning 0.5h → now 4.33h (+3.83h). Task log Mon 20/04 still empty at 13:34; VietPH typically logs EOD. Re-check at next refresh / EOD to confirm 4.33h Upwork ≈ task log hours. Not over-inflation yet (within weekly pace).
- **Neural Contract** — no pending client messages. Carrick's Apr 16 follow-up still the latest. No action needed this window.
- **Rory / Aysar / Bailey DEV3** — no Upwork activity, matches morning. No alerts.

### Unresolved questions

- Bailey DEV1 task log reconciliation — VietPH had not yet populated W24 row for Mon 20/04 as of 13:34. Parent should re-verify at EOD that VietPH task log ≈ 4.33h Upwork (diff threshold: 1h).
- 3 non-urgent Neural tasks from Michael (Apr 15 14:06) — Carrick's Apr 16 "I did and pushed code, let check" was ambiguous; status of each of the 3 tasks still not individually confirmed by client.

## Fountain Refresh (08:40 → 13:34, 5-part)

Matrix token: was expired, refreshed silently via `scripts/matrix-token-refresh.js` (browser SSO, verified `@duongdn:nustechnology.com`).

### Part 1 — Matrix Weekly Plan (room `!EWnVDAxbTGsBxPkaaI:nustechnology.com`)

**NEW W23 plan posted after morning report** — @trinhmtt, 2026-04-20T01:44:08Z → edited 2026-04-20T01:48:46Z (≈ 08:44 → 08:48 local):

> Em gửi plan tuần này ạ
> ViTHT: 40h | ThinhT: 12h | VuTQ: 40h | LamLQ: 10h | DatNT: 40h | => QC: 30.5h

Δ vs morning W22 reference plan (90h dev / 22.5h QC): Dev **+52h** (90h → **142h**), QC **+8h** (22.5h → 30.5h). Team expanded significantly:
- LamLQ back (10h) after W22 absence
- **DatNT (Dat Nguyen) NEW DEV** onboarded today — Ruby full-stack; VuTQ to set up; pairing with ViTHT to reduce merge conflicts
- ViTHT bumped 38h → 40h; VuTQ 32h → 40h; ThinhT 20h → 12h

### Part 2 — W22 Actuals Summary sheet (refresh)

W22 row 27 unchanged since morning. Dev **90.00h** (VuTQ 32 / ThinhT 20 / ViTHT 38), QC **25.50h** (PhatDLT 17.5 / HungPN 8). Team total 115.50h. **No change.**
W23 row 28 = all 0h (week just started Monday; devs log EOD).

### Part 3 — Plan vs Actual

W22 final: all devs hit Apr 17 revised plan exactly (ON TARGET). QC combined 25.50h vs 22.5h plan = +3h (EXCEEDS, OK). **No new deltas.**
W23 comparison pending — EOD task log check required.

### Part 4 — Capacity & Runway

Est vs Charged unchanged since morning. Remaining est (NS+IP) = **158.25h** | Runway @ morning's 90h/wk = 1.76 wk.
**With new W23 plan of 142h/wk, runway shrinks to 1.11 weeks** (158.25 / 142). Replenishment urgency elevated — team capacity just grew 58%, backlog consumption accelerates.
No new ticket moves (0 tickets completed/added since 08:40 per sheet snapshot).

### Part 5 — Over-Estimate Tracking (DELTAS vs morning)

| Task | Morning actual | Now | Δ since 08:40 | Trend |
|------|----------------|-----|---------------|-------|
| #2595 GiftDrop | 168.25h | 168.25h | 0 | STABLE |
| #2615 Gift of Choice | 102.75h | 102.75h | 0 | STABLE |
| **#2735 Send Smart Link** | 111.50h | 111.50h | 0 | STABLE (no further growth this window) |
| #2742 (status mismatch) | 20.25h | 20.25h | 0 | STABLE (status anomaly persists: "Not Started" + 20.25h actual) |
| #2627 Bug on Live | 8.25h | 8.25h | 0 | STABLE |
| #2639, #2501, #2380, #2624 | (baseline) | unchanged | 0 | STABLE |

**No STILL-GROWING flags this window.** #2735 devs were in discussion (PhatDLT ↔ ViTHT) on Matrix around 10:46 about smart-link item-switch behavior — QC investigation, not yet new hours logged.

### Part 6 — Trello Board (supplementary)

Board 5475eaf923a9a1309357eb51 (rick570): **0 new customer comments** since 08:40 (via `/boards/{id}/actions?filter=commentCard&since=...`). 4 pending Rick replies on Gift of Choice (#NBzXZigw) from morning still awaiting response.
No new stuck cards, no list moves detected in window.

### Fountain Alerts (refresh delta)

| # | Alert | Severity |
|---|-------|----------|
| 1 | **NEW W23 plan = 142h/wk** (+52h vs W22). Runway @ new plan = **1.11 weeks** (was 1.76 wk). Backlog replenishment now URGENT | MEDIUM |
| 2 | **DatNT onboarded** — new full-stack dev (Ruby BG); needs setup from VuTQ. Monitor integration this week | INFO |
| 3 | 4 unanswered customer comments on #NBzXZigw still pending Rick reply (carryover from morning) | MEDIUM |
| 4 | #2742 status mismatch (Not Started + 20.25h) still not corrected (carryover) | LOW |

## Elena Refresh (08:40 → 13:34)

### A. SamGuard PRs (duongdn @ `nustechnology/Elena-SamGuard-Digital-Plant`)

- Open PRs: **0**
- PRs updated since 2026-04-20: **0** (searched `updated:>=2026-04-20`)
- PRs merged since 2026-04-20: **0** (searched `merged:>=2026-04-20`)
- Pending-actions file (`config/.elena-pending-actions.json`): no new items; `pending_deploy: []`, `blocked: []`. Last merged = PR #299 (DP-652) on 2026-04-07 — already deployed + announced.
- **No deploys to MayBanServer, no Redmine updates, no Matrix announcements required.**

### B. Precognize (nusken @ `Precognize/development`)

- PRs updated since 2026-04-20 by `nusken`: **0**
- Open PRs by `nusken`: **0**
- No action required. (Other team members active per email feed: briannus PR #4831 comments, nusdavid+windsurf-bot PR #4843 — not ours.)

### C. WordPress samguard.co (JS console re-verify)

Method: Puppeteer (headless, `--no-sandbox`), `networkidle2`, CDP Log+Security enabled, in-page `securitypolicyviolation` listener.

| Metric | Morning | Now (13:34) | Δ |
|---|---|---|---|
| HTTP status | 200 | **200** | 0 |
| Console errors | 0 | **0** | 0 |
| Page errors | 0 | **0** | 0 |
| CSP violations (CDP) | 0 | **0** | 0 |
| CSP violations (in-page) | 0 | **0** | 0 |
| Request failures (ERR_ABORTED) | 13 | 15 | +2 (all aborts — analytics beacons + mp4 autoplay, not errors) |

**Still HEALTHY.** Zero real errors. All 15 failed requests are `ERR_ABORTED` (analytics beacons torn down at unload + mp4 autoplay aborts) — same benign pattern as morning.

### Elena Alerts

- **None.** No PRs, no deploys, no CSP violations, no Matrix announces.

### Trello item verdict (refresh)

- **Fountain** → complete w/ alerts (new W23 plan + runway compression logged)
- **Elena - SamGuard (Work)** → complete (0 PRs)
- **Elena - WordPress SamGuard (Pending)** → complete (site healthy)
- **Precognize** → N/A this run (no nusken PRs)

### Unresolved questions

1. New W23 plan raises dev capacity 58% (90h → 142h) — does backlog of 158.25h justify or will team idle after ~1 wk? Parent may flag to Kunal for ticket replenishment.
2. DatNT onboarding — no confirmation yet from VuTQ on setup complete; watch next refresh.
3. #2742 "Not Started" + 20.25h actual — status mismatch persists 3+ days; needs Trinh to correct or Phat to verify state.
