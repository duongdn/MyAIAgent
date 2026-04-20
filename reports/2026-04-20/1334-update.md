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
