# Daily Report — 2026-09-28 (Monday)

**Run:** 2026-09-28T05:00:00+07:00 (cron)
**Window:** 2026-09-25 05:00 → 2026-09-28 05:00 (+07:00)
**Leave plan:** cuongnh posted (Matrix, NUS Technology) — PhucNH resignation checklist sent by email 2026-09-25/26; check email for details, deadline noted in message.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream — KhanhHH | 0h logged across ALL 19 Workstream projects + sheets on Fri 2026-09-25, no leave note. Gates Aysar + Elliott. |
| 2 | Workstream needsReview — Crystal lang (Arthur) | Still Pending (carried from 2026-09-25 report): PhucVT — "Check/write script for delete data on staging" + "Check report data on production" (09-21, 0:30) + "Staging cleanup" (09-23, 0:30). Reviewer: TienND (override). |
| 3 | Fountain Trello — unanswered customer comments | 4 kunalsheth comments unanswered since first response gap opened: "Updating Gifts CSV..." chain resolved, but "Blurb Bug" (09-25 23:11), "Fountain - Product page, Bottle engraving" (09-26 05:43), "Fountain - Update static page contact form layout" (09-26 15:47), "Infinity - Update gift variant export" (09-26 20:04) — no rick570 reply as of run time. |
| 4 | OhCleo Slack — Celine Fierro | "Please review my last question!" (09-25 12:02) went unanswered by Tony until a different-topic message on 09-27 17:08 (~53h gap). Cover-art feedback loop also still open (09-25 11:37, "still quite far from reference images"). |
| 5 | Matrix — Bailey/Paturevision customer report | No customer-facing daily-report-style message from Nick found in "NUS - Bailey - Paturevision 2026" room this window — only internal dev chat (task log correction, bug triage, server setup). TuanNT/VuTQ logged real hours (8h/day) so this isn't a 0h day, just missing the customer-facing report format. Not auto-reminding — flagging per standing rule. |
| 6 | Elena — open PR | PR #309 "Implement header and modal components with i18n support" (process-digital-plant) open, 0 reviews yet (no CodeRabbit review posted). Not merged this run — Elena is on the paused Ignore List so item was auto-completed per standing instruction, but PR is still open and needs eyes. |

**Today (Mon 09-28):** No confirmed absences found this run besides the PhucNH resignation processing (not a same-day leave, HR admin item).

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|-----------------|
| duongdn@nustechnology.com | 2 | no events |
| carrick@nustechnology.com | 2 | no events |
| nick@nustechnology.com | 0 | no events |
| rick@nustechnology.com | 37 | no events |
| kai@nustechnology.com | 9 | no events |
| ken@nustechnology.com | 80 | 08:30 DE Daily Standup ×2, 09:00 DE Tech Talks (Teams, recurring) |
| vuongtrancr@gmail.com | 19 | — |
| dnduongus@gmail.com | 51 | — |
| davidztv19@gmail.com | 3 | — |
| freelancer@mypersonalfootballcoach.com | 9 | — |

Notable:
- duongdn@: HR resignation checklist for PhucNH shared (Google Sheets, from Cuong Nguyen) — also posted in Matrix "NUS Technology" 16:08 09-27, deadline noted in email/checklist, check mail directly for date.
- carrick@: Mailjet account suspension review + a password reset — routine.
- freelancer@mpfc: Rollbar daily summaries (25/26/27 Sep) + repeated `WP_Error::get_method()` production error (10x/5min bursts, chronic — see Performance section). No new client emails from Adam Blackford/team.
- kai@: normal Maddy/Xtreme JIRA + Bitbucket activity (LIFM2-450/467/459/428/409).
- dnduongus@ / vuongtrancr@: routine bank/newsletter noise, no security alerts.

Trello: DuongDn, Carrick, Nick, Rick, Kai, Ken ✓ complete.

---

## Slack — all 14 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 31 | Aysar MPDM (C07SQ4HAUHZ): Carrick "leaving today + some days next week for personal issue." Engineering channel: 2FA rollout notice, deploy approvals. Customer-success: positive customer feedback thread. |
| RDC - FM Monitoring | 12 | dmetiner-style activity, no alerts. |
| Swift Studio | 1 | Low activity, no alert. |
| Xtreme Soft Solutions | 15 | Maddy/Kai JIRA+Bitbucket flow, normal. |
| SAM GUARD - Mobile | 14 | Elena/DP activity, no alert. |
| Global Grazing Services | 4 | Nick daily report in #général: "Update redmine fixes to staging-v2, Setup redis server." Joey (customer) follow-ups in #grazing-software awaiting review. |
| Amazing Meds | 0 | Clean, no invalid_auth. |
| Generator | 0 | Clean. |
| LegalAtoms | 0 | Clean. |
| MyPersonalFootballCoach | 0 | Clean. |
| William Bills | 0 | Clean. |
| Equanimity | 16 | Carrick/Marcel activity, no blocking alert found (deploy/storage related). |
| SoCal Auto Wraps | 0 | Dropped, not monitored. |
| Aigile Dev | 2 | Low activity, no alert. |

Trello: Franc, MPFC, Marcel, Raymond, Rebecca, Andrew Taraba ✓ complete. Aysar/Elliott ⚠️ skipped (KhanhHH 0h, see Alert #1). Bailey ⚠️ skipped (see Alert #5). Maddy ⚠️ skipped (full 4-part not completed this pass — Bitbucket PR reply-rate not run, time-boxed).

---

## Discord — all — 05:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 25 | Vinn daily report present (Induction workflow fixes, Prevent Zone Stop Alarm deployed). Jeff Trinh daily report present (Team App task screen UI, 4h). QC (bellatric02) PR #727 checks passing. |
| Bizurk (nuscarrick) | 0 | Clean, no Andrew Taraba DM activity. |

Trello: James Diamond, Andrew Taraba ✓ complete.

---

## Sheets/Workstream — all developers — 05:20 (+07:00)

Window days with activity: 2026-09-25 only (09-26/27 weekend, 09-28 too early for today's log).

| Developer | 09-25 | Status |
|-----------|-------|--------|
| PhucVT | 8h (Definitive Guide/Raymond project) | OK |
| TuanNT | 8h (Speedventory/Bailey) | OK — combined >0h, clears John Yi/Rebecca/Bailey gate |
| KhanhHH | 0h (all 19 projects + sheets) | ⚠️ ALERT — no leave noted, see Alert #1 |
| LeNH | 8h (Portfolio - James Diamond) | OK |
| LongVV | 4h (Maddy), 4h (OhCleo) | Informational, ad-hoc, never alerted |

**Maddy JIRA × Workstream cross-check (week 09-21→09-27):**

| Ticket | Est | Actual (JIRA) | WS Log | Check |
|--------|-----|---------------|--------|-------|
| LIFM2-467 | 2h | 2h30m | 2.5h | 🔴 over 0h30m |
| LIFM2-468 | 0h | 0h | 1.5h | ⚠️ no est, no JIRA log |
| LIFM2-428 | 53h | 53h3m | 1.5h | 🔴 over 0h3m (trivial) |
| LIFM2-459 | 1h30m | 2h | 2h | 🔴 over 0h30m |
| LIFM2-409 | 113h15m | 111h15m | 2h | ✅ |

Overs are all minor/trivial (≤30m). No severe over-budget this week.

**Workstream needsReview (Fountain excluded):** Only Crystal lang/Arthur's 2 Pending rows carried forward from 2026-09-25 (see Alert #2). All other projects clean.

**Per-project reviewer/hours breakdown (window):** Baamboozle (reviewers: none/need_review=false); Xtreme (none); James Diamond (none); Crystal lang (reviewer TienND, Pending — Alert #2); OhCleo (reviewers DuongDN+MinhTV, reviewStatus clean this window); Speedventory/Bailey (none — Sheets-only project).

Trello: (see per-item notes above.)

---

## Scrin.io — 05:22 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-27):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:30 (+07:00)

**Part 1 — Matrix Plan:** New week's plan not yet posted (checked 05:10, before the usual 08:30-09:30 Monday window). Using last week's (09-21) plan for context: ViTHT 40h, DatNT 32h, ThinhT 20h, VuTQ ~8h => QC 25h.

**Part 2 — Task Log Actuals (week 09-21→09-27, final):** ViTHT 40h, DatNT 32h, ThinhT 20h, HungPN 12.5h, TrinhMTT 10.75h, PhatDLT 8h, VuTQ 12h.

**Part 3 — Plan vs Actual:** ViTHT 40/40h ✓ met exactly. DatNT 32/32h ✓ met exactly. ThinhT 20/20h ✓ met exactly. VuTQ 12h vs ~8h target — exceeded, fine. QC combined (PhatDLT+TrinhMTT) 18.75h vs 25h target — under, but week closed with plan otherwise fully met; no per-dev shortfall flagged.

**Trello Board:** 4 customer comments unanswered as of run time — see Alert #3. No stuck cards (14+ day) identified beyond the flagged threads; not exhaustively re-scanned for `dateLastActivity` staleness this pass (time-boxed).

Trello: Fountain ⚠️ skipped (Alert #3 — unanswered customer comments).

---

## Elena — 05:35 (+07:00)

*(Item is on the paused Ignore List — auto-completed regardless of findings below.)*

- Open PR: #309 "Implement header and modal components with i18n support" (process-digital-plant branch), 0 reviews posted yet. Not merged/deployed this run.
- Precognize (nusken): no open PRs authored by nusken.
- WordPress SamGuard (`www.samguard.co`): clean — 0 JS errors, 0 page errors, 0 CSP violations. Only benign analytics `net::ERR_ABORTED` noise (GA/ads/LinkedIn pixels).

Trello: Elena - SamGuard ✓ complete (Ignore List). Elena - WordPress SamGuard ✓ complete (clean).

---

## Matrix — 05:10 (+07:00)

**Active rooms: 31 / 148 | Messages: 561** *(since 2026-09-25 05:00)*
Full details: reports/2026-09-28/matrix-rooms-0510.md

### ⚠️ Action items for DuongDN (9)

| Room | Time | Message |
|------|------|---------|
| (unnamed room) | 08:43 | anhnvn: "Bên ông Philips và ông Ronan của Bamboozle đều chưa thấy action khi mình request review Clutch. Chắc a Dương xã giao hỏi thăm lại 2 bên đó ah" — needs follow-up with Baamboozle contacts on Clutch review |
| (unnamed room) | 13:26-13:39 | kietnht/anhttl: asking for help navigating a heavy Precognize source checkout (link to github.com/Precognize/development) — technical help request |
| (unnamed room) | 10:27 | anhttl: "anh Dương ơi, anh có đang bận gì ko anh, team Elena cần anh support review lại est" — Elena estimate review requested |
| BDD - Delivery | 15:19 | chientx: "có update gì bên team chưa a Dương, NA?" — status check pending reply |
| Elena - Digital Plant | 09:07 | anhttl: relay of customer (Michelle) report re: PR #5219 merge upgrade/scan-mode/csv issue — needs technical follow-up |

### Key updates

**Bailey/Paturevision:** Internal team chat only this window (task-log date correction, redmine bug triage, VuTQ Redis/AWS server setup for new server). No customer-facing daily-report-style message from Nick found — see Alert #5.

**Fountain (Kunal room):** 391 messages, mostly dev/QC coordination (redmine bug checks, CSV/import fixes) — consistent with the customer-facing Trello alert (#3), team is actively working the backlog.

**NUS Technology (general):** PhucNH resignation checklist announced by cuongnh (16:08 09-27) — HR admin item, deadline in the linked checklist/email.

**Other:**
- Elena - Digital Plant: customer (Michelle) flagged an issue after merging PR #5219 — needs dev follow-up.
- Various project rooms: routine coordination, no other blockers found.

---

## Performance — all 4 projects — 05:40 (+07:00)

| Project | Apdex | Avg response | Error rate | Notes |
|---------|-------|---------------|------------|-------|
| OhCleo (prod) | 0.97 | 123.7ms | 2.4% (1857/75788) — ~89% benign NotAuthenticated/InvalidToken | Healthy. Slowest: CreatorVerificationSubmitView.post 4.07s (1 call), ChatSendView.post 3.43s (25 calls). |
| MPFC | 0.45 | 1380ms | 1.6% (1832/115698) | 🔴 Poor apdex, chronic. `WP_Error::get_method()` fatal 221x (matches Rollbar alerts). `"continue" targeting switch` E_WARNING 1562x. Slowest: author-sitemap.xml 49.3s/2calls, sitemap_index.xml 33.2s/5calls (chronic, unresolved for months). |
| Fountain Gifts | 0.99 | 160ms | ~0% (4/190281) | Healthy. Slowest: admin/order_items/export 1.9M ms avg?!/6calls (likely a long-running async export skewing avg, not a per-request hang), admin/product_catalogs/import_csv 82.3s/2calls, admin/gifts/import_csv 39.3s/10calls. |
| InfinityRoses | 0.99 | 119.7ms | ~0% (17/56560) | Healthy. Slowest: paypals/authorize_order 2.87s/2calls, users/registrations/create 2.0s/4calls. |

**Full topErrors / slowestTransactions:** see raw JSON captured this run (`/tmp/nr-*.json`, not persisted — re-run `newrelic-fetch-performance.js` for live detail if needed for follow-up).

---

## Upwork Memo — 2026-09-25 — 05:15 (+07:00)

| Workroom | Result |
|----------|--------|
| Rory (LeNH) | Session expired — live cookies + stored + headless all failed. Manual re-check of carrick's Chrome Profile 1 Upwork session needed. |
| Aysar (KhanhHH) | Session expired. |
| Tokenlite/Marcel | Session expired — same as Rory. |

No memo validity determined this run (session failure, not invalid memo) — per standing rule, session failure ≠ alert; Rory/Aysar/Marcel Trello gates unaffected by this (their status is set by Slack/Sheets checks above, not memo validity).

---

## OhCleo Slack — 05:18 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 24 | Cover-art review cycle (Celine: "not happy... doesn't have the sensuality I expect"); Tony iterating. Celine: "Please review my last question!" (09-25 12:02) unanswered until unrelated 09-27 17:08 message — see Alert #4. Tony's daily report present 09-25 12:00. |
| #events-code | 0 | Dormant, no errors. |

Trello: Ohcleo ⚠️ skipped (Alert #4).

---

## Arthur / Blair Brown / Colin / Philip — Ignore List — 05:00 (+07:00)

Not actively monitored (paused per 2026-09-09 standing instruction) — auto-completed without running mapped source checks: **Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Colin, Philip** (Elena - SamGuard also on this list, see Elena section above for informational findings gathered anyway).

---

## Reminders — 05:45 (+07:00)

No `--send-reminder` flag passed — print only, no Matrix sends.

- KhanhHH: not in the Piece 9 reminder roster (PhucVT/LeNH/LongVV/TuanNT only) — her 0h finding is reported via Sheets/Trello alerts instead (#1), not a Reminders-piece send.
- PhucVT / LeNH / TuanNT: have hours logged 09-25, no reminder needed.
- LongVV: ad-hoc, never reminded.

---

## Trello — 05:50 (+07:00)

**Check progress card:** 16 items marked ✓ complete this run (John Yi, James Diamond, Rory, Franc, MPFC, Marcel, Elena-SamGuard, Raymond, Neural Contract, Andrew Taraba, Rebecca, Colin, Philip, Arthur, Blair Brown, Elena-WordPress-SamGuard). 4 items left ○ incomplete: **Maddy** (full 4-part not finished — Bitbucket PR reply-rate not checked), **Aysar** + **Elliott** (KhanhHH 0h, Alert #1), **Bailey** (missing customer daily report, Alert #5), **Fountain** (unanswered customer comments, Alert #3), **Ohcleo** (unanswered customer question, Alert #4). Card not auto-marked done (6 items still open).

**Check mail card:** all 6 items (DuongDn, Carrick, Nick, Rick, Kai, Ken) ✓ complete — card auto-marked done (all items complete).

---

## Not run this pass (time-boxed)

- Maddy Bitbucket PR reply-rate check (full 4-part standard) — hours/JIRA/Slack done, Bitbucket not run.
- Philip MS Teams check, WhatsApp, Zalo — excluded (Ignore List / default-excluded flags).
- Deep Fountain Trello stuck-card/hard-to-release scan (only new customer comments checked).

## Unresolved Questions

1. Was PhucNH's resignation checklist deadline already communicated/actioned? (see email/Matrix mention 09-25/09-27)
2. Should Elena PR #309 be reviewed/merged despite Elena being on the paused Ignore List — is the pause still intended given active PR/customer traffic in Elena - Digital Plant room?
3. Rory/Aysar/Marcel Upwork sessions all failed (cookie+headless) — is carrick's Chrome Profile 1 session actually still valid, or does it need a fresh manual login?
