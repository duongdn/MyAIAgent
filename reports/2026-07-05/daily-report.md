# Daily Report — 2026-07-05 (Sunday)

**Run:** 2026-07-05T05:32:00+07:00 (cron)
**Window:** 2026-07-04T05:22 → 2026-07-05T05:32 (+07:00)
**Leave plan:** No approved leaves on record.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Maddy JIRA | LIFM2-439 🔴 over-budget 79.2% (12h est, 21h30m actual, Testing-Anoma) |
| 2 | Maddy JIRA | LIFM2-259 ⚠️ no estimate set (73h45m actual, 0h est) — unresolved |
| 3 | Fountain | #2702 ⚠️ In-progress 218.8% over (25.5h/8h) — flat vs Jul 4, not growing |
| 4 | Fountain | #2872 ⚠️ In-progress 44.5% over (46.25h/32h) — flat vs Jul 4 |

**Today (Jul 5):** Weekend — no work expected from PHP team. All 0h sheets entries are normal.

---

## Email — all — 05:10 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|----------------|
| duongdn@nustechnology.com | 0 | none | no events |
| carrick@nustechnology.com | 0 | none | no events |
| nick@nustechnology.com | 2 | Heroku radish-stage release failed (INFO); Xero limit warning from candasurveyors.com.au (FYI) | Weekly Meeting with Devs 21:30 (Teams) |
| rick@nustechnology.com | 8 | FountainStagingBE staging SitemapGenerator error (INFO); FirstProject prod Rollbar #1068/#1069 Minified React (FYI); FountainGifts/InfinityRoses daily summaries | HEAL Meeting 12:30; OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 0 | none | no events |
| ken@nustechnology.com | 80 | none (all GitHub notifications — Precognize amocc-material PR activity, normal) | DE Daily Standup 08:30+09:00, Bi-weekly Retro 09:00, Tech Talks 09:00 |
| vuongtrancr@gmail.com | 3 | Delayed-newform Daily Summary — Swish Rollbar (INFO, daily digest not Signal Lost) | — |
| dnduongus@gmail.com | 14 | none (Vietcombank transactions, LinkedIn, newsletters — all ignorable per policy) | — |
| freelancer@mypersonalfootballcoach.com | 0 | none | — |

**nick@:** [radish-stage] Heroku release phase failed (staging only, FYI). Xero limit warning from operations@candasurveyors.com.au (Xero API quota nearing limit — may affect client integration).
**rick@:** FirstProject prod Rollbar #1068/#1069 "Minified React" errors — likely CDN/minification artifact, Saturday low-traffic. FYI only.

Trello: Check mail card not created today (Sunday — no recurring card). ○ skipped (no card).

---

## Slack — all — 05:14 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 0 | No activity — Saturday weekend |
| RDC - FM Monitoring | 0 | No activity — weekend |
| Swift Studio | 0 | No activity — weekend |
| Xtreme Soft Solutions | 0 | No activity — weekend |
| SAM GUARD - Mobile | 0 | No activity — weekend |
| GLOBAL GRAZING SERVICES | 0 | No activity — weekend |
| Amazing Meds | 0 | No activity — weekend |
| Generator | 0 | No activity — weekend |
| LegalAtoms | 0 | No activity — weekend |
| MyPersonalFootballCoach | 0 | No activity — weekend |
| William Bills | 0 | No activity — weekend |
| Equanimity | 0 | No activity — weekend |
| SoCal Auto Wraps | SKIP | Dropped 2026-05-11 |
| Aigile Dev | 0 | No activity — weekend |

All 0 messages across 13 workspaces — Saturday, expected.

Trello: No "Check progress" card today (Sunday). ○ skipped.

---

## Discord — 05:15 (+07:00)

| Server | Account | Msgs | Key content |
|--------|---------|------|-------------|
| AirAgri | nusvinn | 0 | No activity — weekend |
| Bizurk | nuscarrick | 0 | No DMs from Andrew — weekend |

Trello: No card today (Sunday). ○ skipped.

---

## Scrin.io (Nick at John Yi) — 05:15 (+07:00)

**Scrin.io (Nick at John Yi — 2026-07-04):** 6h25m logged (2 sessions).
- Session 1: 10:26AM–02:56PM, 4h30m, 83% activity (windsurf, Chrome, Terminal)
- Session 2: 08:07PM–10:02PM, 1h55m, 100% activity

Nick worked on Saturday July 4. No project tag. FYI only.

---

## Sheets — all devs — 05:20 (+07:00)

PREV_DATE: 2026-07-04 (Saturday). Workstream SSO unavailable in cron (headless login fails — SSO requires interactive browser, consistent with Jul 2 cron behavior).

| Developer | Sheets total | WS | Leave | Status |
|-----------|-------------|-----|-------|--------|
| LongVV | 0h | — | none | ✅ Normal — weekend, part-time 16h/wk target |
| PhucVT | 0h | — | none | ✅ Normal — weekend |
| TuanNT | 0h | — | none | ✅ Normal — weekend |
| KhanhHH | 0h | — | none | ✅ Normal — weekend |
| LeNH | 0h | — | none | ✅ Normal — weekend |

All 0h Saturday = expected. No alerts. No reminders.

---

## Sheets — Maddy JIRA — W13 — 05:20 (+07:00)

| Ticket | Summary | Status | Est | Actual (JIRA) | Task Log | Check |
|--------|---------|--------|-----|---------------|----------|-------|
| LIFM2-409 | Import Shopify payouts | In Progress | 113h 15m | 108h 15m | 11h | ✅ |
| LIFM2-259 | Bulk upload images to S3 | Testing - Anoma | 0h | 73h 45m | 1h | ⚠️ no est |
| LIFM2-439 | Listed-Cons tab changes | Testing - Anoma | 12h | 21h 30m | 0h | 🔴 over 9h 30m |
| LIFM2-436 | Returns | Testing - Anoma | 15h | 13h 45m | 1h | ✅ |
| LIFM2-446 | Row-Locking in Quoting Tool | Review | 12h | 11h | 3h | ✅ |

**Over-budget (1):** LIFM2-439 est=12h actual=21h30m +79.2%
**No estimate (1):** LIFM2-259 — needs estimate set before more logging

Note: LIFM2-409 PR #513 (hotfix/product-custom-payout) had code review concerns from Jul 4 (custom % silently reverts). JIRA est check passes (108h < 113h) but code bug unresolved — verify merge status manually.

---

## Upwork — 05:22 (+07:00)

Sessions expired; headless re-login blocked (CAPTCHA/security challenge). Per policy: session failure ≠ alert. Manual re-auth needed: `DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick`.

Trello: Rory/Neural/Aysar items — ○ skipped (no Trello cards today, Sunday).

---

## Fountain — 05:25 (+07:00)

**Part 1 — Matrix Plan:** N/A — Matrix token expired (soft_logout), SSO browser refresh unavailable in cron. Using last known plan (W33/W52 internal, week of Jun 29–Jul 5): **ViTHT 36h, ThinhT 20h, DatNT 24h, VuTQ 8h → 88h/wk.** QC: PhatDLT + HungPN. TrinhMTT = plan poster (not QC).

**Part 2+3 — Task Log vs Plan:** W52 actuals all 0h in Summary tab scan (likely end-of-sheet numbering artifact + Saturday). Dev task log hours not monitored per policy. N/A.

**Part 4 — Capacity & Runway:** NS+IP = **229h / 27 tasks** — **FLAT vs 2026-07-04** (no change). Runway = 229/88 = **2.60 wk** at 88h/wk.
Top NS+IP tasks: #1178 40h rem, #2775 38.8h rem, #2885 23h rem, #2912 38h rem, #2869 11.3h rem, #2870 16.8h rem.

**Part 5 — Over-Estimate Tracking** (flat vs Jul 4, no change):
| Task | Est+CR | Actual | Over% | Status | Trend |
|------|--------|--------|-------|--------|-------|
| #2615 | 12h | 106.75h | 789.6% | Deployed on Staging | flat |
| #2702 | 8h | 25.5h | 218.8% | In-progress (>50%) | flat ⚠️ active |
| #2872 | 32h | 46.25h | 44.5% | In-progress (>50%) | flat ⚠️ active |
| #2735 | 130h (90+40 CR) | 136h | 4.6% | In-progress (>50%) | within threshold |
| #2595 | 120h | 168.25h | 40.2% | Deployed on Staging | stable |

37 tasks total >20% over-budget sheet-wide (unchanged).

**Fountain Trello board (Web Development):** Customer comments from monitored users (kunalsheth/tmmckay/mike62798179/iris63293413): none in window per Jul 4 data (no Trello card today to update — Sunday).

Trello: No card today (Sunday). ○ skipped.

---

## Elena — 05:28 (+07:00)

**PRs/Deploy:** 0 open PRs in Elena-SamGuard-Digital-Plant. `.elena-pending-actions.json` clean.
**Precognize (nusken):** 7 total open PRs; 0 authored by nusken. Clean.
**WordPress SamGuard:** Status 200. `jsErrors: []`, `pageErrors: []`. CSP violations: DoubleClick.net + Google Analytics (same recurring pattern — third-party tracking scripts blocked by CSP policy, not real JS errors).

Trello: No card today (Sunday). ○ skipped.

---

## Trello — 05:30 (+07:00)

No "Check progress" or "Check mail" recurring cards found on board O83pAyqb (113 open cards searched). Sunday — Trello Power-Up has not created today's recurring cards. All items ○ skipped (no card).

---

## Reminders — 05:32 (+07:00)

No reminders needed. All devs 0h on Saturday (weekend — expected, not an alert). No --send-reminder flag.

---

## Matrix — 05:32 (+07:00)

**Matrix token expired** (M_UNKNOWN_TOKEN). SSO browser refresh blocked in cron (browser singleton conflict, then SSO waiting for manual login). Device-auth script produced no output.

Using last-known data from Jul 4 report. No new Matrix scan available for this window. Action items from previous window: WordPress dev assignment for Kai (confirmed owner per Jul 4 data).

---

## OhCleo Slack — 05:32 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 0 | No messages — Saturday weekend |
| #events-code | — | channel_not_found (dormant) |

Tony (LongVV) daily report: absent — Saturday, no expectation.
No Celine customer messages. Clean.

Trello: No card today (Sunday). ○ skipped.

---

## Philip MS Teams — 05:32 (+07:00)

MS Teams automated login blocked by Microsoft identity security confirmation page (automated browser detected). Last confirmed Philip activity: 2026-06-16.

Trello: No card today (Sunday). ○ skipped.

---

## Aysar (Baamboozle) — 05:32 (+07:00)

Baamboozle Slack: 0 messages in window. MPDM C07SQ4HAUHZ: no messages (Saturday weekend — KhanhHH does not post on weekends).
GitHub issues: 56 open issues in baamboozle-web-app, 0 in bbzl-web-client. **0 issues updated since window start** (Jul 4T05:22). Existing issues are long-standing, no new high-severity items.

Trello: No card today (Sunday). ○ skipped.
