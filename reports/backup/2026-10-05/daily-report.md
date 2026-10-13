# Daily Report — 2026-10-05 (Monday)

**Run:** 2026-10-05T05:00:00+07:00 (cron), rechecked 08:45 (+07:00)
**Window:** 2026-10-02T08:55+07:00 → 2026-10-05T05:00+07:00
**Leave plan:** No upcoming approved leaves on record (chientx's leave request Oct 2 already past/ack'd by duongdn).

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Slack Xtreme (Maddy) | Madhuraka (client) 2026-10-04 ~21:56: "Can you give priority to [JIRA LIFM2-]409 and finish it this week? ... unable to bill the client until the ticket is fully complete" — unanswered as of this run. Recheck 08:45: still unanswered. LIFM2-409 back in To Do, 111.25h spent / 113.25h est (≈2h left). |
| 2 | Fountain Trello | kunalsheth posted detailed V2 release review notes on "Start here: review order for Claude's PRs" (2026-10-04 14:22) — rick570 has not replied yet. Recheck 08:45: still no reply (rick570's last comment was 10-04 11:20 on the firewall card). |
| 3 | OhCleo Slack | Celine (2026-10-03 17:01): "Is this something we are using? It was withdrawn from my card today" — billing question, no reply found in subsequent messages. Recheck 08:45: still unanswered. (Script times are UTC, so this was 10-04 00:01 +07.) |
| 4 | Discord Bizurk (Andrew Taraba) | animeworld DM 2026-10-04 08:43: "hi bro" / "is it OK?" — unanswered. Recheck 08:45: still unanswered. |
| 5 | MPFC New Relic | Multiple `.env`/config-probe URLs hit prod with 115-117s "response times" (attack/scan probes, not real slow transactions) — apdex still poor 0.41, chronic WP_Error pattern continues. |

**Today (Mon Oct 5):** all present, no leave on record.

---

## Email — all — 05:05 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@... | 2 | no events |
| carrick@... | 4 | no events |
| nick@... | 0 | no events |
| rick@... | 66 | HEAL Meeting 12:30-12:55, OmniGPT Daily Sync 10:30-11:00 |
| kai@... | 12 | no events |
| ken@... | auth_fail (IMAP) | — |
| vuongtrancr@gmail.com | 59 | — |
| dnduongus@gmail.com | 50 | — |
| davidztv19@gmail.com | 2 | — |
| freelancer@mypersonalfootballcoach.com | 5 | — |

- duongdn: Chien Tran's "Re: Xin nghỉ phép" (leave confirmation, Oct 2) — already closed.
- rick (Fountain): heavy BugSnag/Rollbar staging noise all week (PG::ConnectionBad, ArgumentError, Site picks HTTP 429/503) — staging-only, not alerting separately (see Fountain section).
- kai: JIRA/Bitbucket activity on LIFM2 — same thread as Slack alert #1 above (ticket 409/468/470 chain).
- vuongtrancr (Swish): repeated "Signal lost for 10 minutes on 'Low Application Throughput'" + `[Delayed-newform]` error bursts (#290, #186) all weekend — recurring/known pattern, no new escalation needed beyond what's already tracked.
- dnduongus: no security/breach alerts — routine newsletters only.
- ken@: IMAP auth_fail — flagging to retry this week, not blocking any Trello item (no mapped gate).
- freelancer@mpfc: Rollbar daily summaries (1 existing error each day, 0 new) — consistent with chronic known issue.

Trello: all 6 Zoho mail items ✓ complete (no new blocking issues found in any).

## Slack — all — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 1 (MPDM) | Carrick's "Today's update" present 2026-10-02 09:09 — MPDM gate satisfied |
| RDC - FM Monitoring | 0 | — |
| Swift Studio | 0 | — |
| Xtreme Soft Solutions | several | ⚠️ see Alert #1 — unanswered client billing-blocker ask |
| SAM GUARD - Mobile | 0 | — |
| Global Grazing Services | 0 | — |
| Amazing Meds | — | invalid_auth, refresh failed — item is Cancelled (Ignore List), not blocking |
| Generator | 0 | — |
| LegalAtoms | 0 | — |
| MyPersonalFootballCoach | 0 | — |
| William Bills | 0 | — |
| Equanimity | 0 | — (internal Marcel billing thread lives in Matrix, see below) |
| SoCal Auto Wraps | — | not monitored (dropped) |
| Aigile Dev | 0 | — |

Trello: Rory/Franc/MPFC/LegalAtoms/William Bills/Equanimity/Aigile/Baamboozle(Aysar) items ✓ complete. Xtreme (Maddy) ⚠️ left incomplete (Alert #1).

## OhCleo Slack — 05:12 (+07:00)
| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 12 | Tony's report present 2026-10-02 09:45. ~~10-04 19:35-19:36 Tony re: backup images~~ Those messages are from **Celine** (UTC, so 10-05 02:35 +07): she added most of the backup pictures to Drive and will finish tomorrow. Informational. ⚠️ Celine's card-withdrawal question (10-03 17:01) unanswered — Alert #3. |
| #events-code | 0 | — |

Trello: Ohcleo ⚠️ left incomplete (Alert #3).

## Discord — all — 05:14 (+07:00)
| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | 10 | Vinn/bellatric02 fuel-movement QA back-and-forth (Oct 2); Jeff daily report present Oct 2 (weekend quiet after). |
| Bizurk (nuscarrick) | 0 (channel) | ⚠️ Andrew Taraba DM unanswered — Alert #4 |

Trello: James Diamond ✓ complete. Andrew Taraba ⚠️ left incomplete (Alert #4).

## Sheets/Workstream — all — 05:20 (+07:00)
All-projects scan for 2026-10-02 (last workday in window), via `sheets-tasklog-scan.js`:

| Developer | Total (2026-10-02) | Status |
|-----------|---------------------|--------|
| LongVV | 8h (Definitive Guide 3, Xtreme 1, OhCleo 4) | OK |
| PhucVT | 8h (Crystal lang) | OK |
| TuanNT | 8h (Speedventory 4.67, Portfolio-James Diamond 3.33) | OK |
| KhanhHH | 8h (Baamboozle 5.33, Radio Data Center 2.67) | OK |
| LeNH | 8h (Portfolio-James Diamond 8) | OK |

No shortfalls, no reminders needed. Fountain excluded from this per-dev check (tracked separately below).

**Workstream needs-review check (all projects, Fountain excluded):** no `needsReview`/Pending rows found this run.

Trello: Maddy/John Yi/James Diamond/Aysar/Elliott/Rebecca/Bailey items — see their respective sections for gate outcome (hours themselves are all clean).

## Scrin.io — 05:21 (+07:00)
**Scrin.io (Nick @ John Yi company account — 2026-10-04):** 0h — no sessions recorded.

## Fountain — 05:25 (+07:00) — 3-part check
**Part 1 — Matrix plan** (`!EWnVDAxbTGsBxPkaaI`, posted 2026-09-28 09:02 by trinhmtt): ViTHT 40h, ThinhT 20h, DatNT 40h, QC 25h.

**Part 2 — Task log actuals** (Workstream, week 09-28→10-04):
| Dev | Plan | Actual | Status |
|-----|------|--------|--------|
| ViTHT | 40h | 40h | ✅ matches |
| ThinhT | 20h | 20h | ✅ matches |
| DatNT | 40h | 40h | ✅ matches |
| QC (HungPN+PhatDLT) | 25h | 31h (23+8) | ✅ over plan |
| VuTQ (dev support) | — | 19h | not on plan, PR reviews/fixes |
| TrinhMTT | — | 13.5h (0 charged, plan-poster) | excluded from QC per rule |

**Part 3 — Plan vs actual:** all devs met or exceeded plan; no shortfalls.

**Trello board (Web Development):** No stuck Doing cards >14d (2 cards in Doing, 5.4d/10.7d). ⚠️ Customer comment (kunalsheth, 2026-10-04 14:22) on "Start here: review order for Claude's PRs" — detailed V2 release review notes — unanswered. See Alert #2.

Trello: Fountain ⚠️ left incomplete (Alert #2 — unanswered customer review notes).

## Maddy — W40 — 08:45 (+07:00)

### 1. Task Log Hours (Fri 10-02)
| Developer | Fri | Weekly total | Status |
|-----------|-----|--------------|--------|
| LongVV | 1h (Xtreme) | 3.25h tagged on Maddy WS (468 + 3 untagged) | informational only, ad-hoc (no alert) |

### 2. Slack / Kai Daily Report Check
- Madhuraka 10-04 16:23 (+07): "Can you give priority to 409 and finish it this week? ... unable to bill the client" is still **unanswered** (Alert #1).
- No Kai-role report check was needed beyond this: Friday was 1h, and the Slack window has no other traffic.

### 3. JIRA
- Weekly cross-check: 3 WS entries are missing a JIRA key ("Investigate why items sold are draft on Shopify" 1h, "Investigate approach to improve quoting tool" 1h, "Fix urgent bug" 0.25h). LIFM2-468 has no estimate and no JIRA log.
- Active since 10-02: 450 To Do (6.2h spent / 6h est, slightly over), 470 + 469 new To Do (no est), 455 Ready to deploy, 467 Customer Feedback (2.5h / 2h), 468 + 464 Testing.
- Risk tickets: **409 reopened to To Do**, 111.25h / 113.25h est (matches the client ask). 260 + 439 Done.

### 4. Bitbucket PR Status (xtreme-web/rms)
7 open PRs by Kai: #481 (409, waiting on customer per memory), #549, #548, #544, #540, #534, #509 (last update 08-14). #540 (LIFM2-450) has been idle since 09-03.

Trello: Maddy ○ (Alert #1).

## Elena — 05:30 (+07:00)
Elena-SamGuard-Digital-Plant: on Ignore List (paused) — not run, auto-completed.
Elena-WordPress-SamGuard (separate item, not paused): ran `wordpress-samguard-check.js` — 0 JS errors, 0 CSP violations, 0 page errors. Clean.

Trello: Elena - SamGuard ✓ auto-complete (Ignore List). Elena - WordPress SamGuard ✓ complete (clean).

## Matrix — 05:13 (+07:00)
**Active rooms: 25 / 150 | Messages: 368** *(since 2026-10-02 01:55)*
Full details: reports/2026-10-05/matrix-rooms-0513.md

### Key updates
**Potential - Wildsoul Wellness:** chientx/anhnvn/namtv discussed document finalization for client; duongdn commented on cancel-contract clause (resolved 23:19 same night). Maya Dunne (Carrick contact) forwarded — duongdn deferred to next day (09:17), not yet followed up — low priority, not alerting.

**Maddy / James Diamond / Bailey:** internal task-log housekeeping (actual=0/charged backfill note for LongVV's pre-approved task; TuanNT WS access setup) — administrative, resolved same day.

**Marcel/Equanimity (internal thread, `!oofREYAXHsvPWEOJev`):** ThuyLTT and duongdn discussing Marcel's authorized-hours overage (1h40 over 1h authorized) and bonus request — internal billing coordination, pending ThuyLTT follow-up Monday/Tuesday. Not a client-facing alert.

**Arthur - Meta-Stamp:** phucvt reported a Slack message to Chris went missing (unclear cause, re-sent); progress update given mid-day. Project paused per Ignore List, no gate action needed.

**Other:** NUS Technology — office noise complaint (facilities, non-technical). Training AI — internal slide assignment.

## Performance — 05:35 (+07:00)
| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.98 | 113ms | 2.4% (1973/82373), mostly benign ValidationError/invalid-bcrypt noise | 20.1/min |
| mpfc | 0.41 | 1952ms | 0.5% (574/109586) | 26.8/min |

**OhCleo slowest transactions:** MessageBulkFollowView.post 6836ms/2 calls, UpdateMeView.put 4775ms/21 calls, ChatSendView.post 3561ms/19 calls, CreatorVerificationSubmitView.post 2207ms/5 calls, CreatorPayoutHistoryView.get 2069ms/2 calls.

**OhCleo top errors:** bcrypt hash format errors (10), duplicate email/username ValidationError (10), "no user found" (7), invalid-email+duplicate-username (2) — all client-input validation noise, not a bug.

**MPFC slowest "transactions":** `.env`/`system-config/.env`/`plugins.js`/`constant.js` probe URLs at 115-117s each, 1 call each — these are automated secret-scanning bot probes hitting prod, not real slow pages (flagged as Alert #5, chronic pattern). Apdex 0.41 remains poor — same chronic `WP_Error::get_method()` issue as prior reports, unresolved for months, no new regression this window.

## Upwork Memo — 2026-10-02 — 05:40 (+07:00)
| Workroom | Status |
|----------|--------|
| Rory | Cloudflare challenge — session unavailable, manual re-auth needed |
| Aysar | Login failed (live+stored+headless cookies all failed) — manual re-auth needed |
| Tokenlite (Marcel) | Cloudflare challenge — session unavailable |

~~Session/Cloudflare failures only~~ Recheck 08:40: sessions OK for all 3 workrooms, but the scraper returned `dom_fallback_day_label_not_found` with 0 memos each. KhanhHH logged 5.33h on Baamboozle that day, so 0 memos is a scraper miss, not real data. Memo validity is **unverified**. Manual check: open the 10-02 timesheet in Upwork. No memo-validity alert raised; existing project gates (Rory/Aysar via Slack+Sheets) unaffected and already ✓ above.

Trello: no dedicated Upwork Memo item on current board — not gating.

## Ignore List — 05:00 (+07:00)
Not tracked (paused/cancelled), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, John Yi - Amazing Meds

## Trello — progress/mail — 05:45 (+07:00)
- Maddy - Carrick/Kai/Luis: ⚠️ skipped (Alert #1, unanswered client billing-blocker ask)
- John Yi - Amazing Meds: ✓ complete (Ignore List)
- James Diamond - Vinn task: ✓ complete
- Rory: ✓ complete
- Aysar: ✓ complete
- Franc: ✓ complete
- Elliott: ✓ complete
- MPFC: ✓ complete
- Marcel: ✓ complete (internal billing coordination ongoing, not client-facing)
- Elena - SamGuard Digital Plant: ✓ complete (Ignore List)
- Raymond - LegalAtoms: ✓ complete
- Neural Contract: ✓ complete
- Bailey: ✓ complete (recheck: Matrix Bailey room has daily task reports from tuannt on 10-01 and 10-02)
- Andrew Taraba: ⚠️ skipped (Alert #4)
- Rebecca (William Bills): ✓ complete
- Colin: ✓ complete (Ignore List)
- Fountain: ⚠️ skipped (Alert #2)
- Philip: ✓ complete (Ignore List)
- Ohcleo: ⚠️ skipped (Alert #3)
- Arthur - Meta-Stamp: ✓ complete (Ignore List)
- Blair Brown - Peptide Clyde: ✓ complete (Ignore List)
- Elena - WordPress SamGuard: ✓ complete
- Check mail (all 6 Zoho accounts): ✓ complete

## Unresolved Questions
- Upwork memo scraper can't find the day label (`dom_fallback_day_label_not_found`). The script likely needs a fix.
- ken@nustechnology.com IMAP auth_fail — needs credential check this week.
- Maya Dunne (Carrick's recruiting contact) follow-up deferred by duongdn to "tomorrow" (09:17) — confirm it was actually followed up.
- MPFC `.env`/config-probe traffic (Alert #5) — recurring; worth a WAF/Cloudflare rule to block these scan patterns if not already in place.
