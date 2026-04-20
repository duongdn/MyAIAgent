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

