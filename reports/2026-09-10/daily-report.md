# Daily Report — 2026-09-10 (Thursday)

**Run:** 2026-09-10T06:00:00+07:00 (cron)
**Window:** 2026-09-09 09:14 → 2026-09-10 06:00 (+07:00)
**Leave plan:** not refreshed this run (leave-email parser not re-run — see Unresolved Questions)

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Email — rick@ | 17 new Fountain/InfinityRoses/FirstProject prod alert emails (ArgumentError, NoMethodError, PG::NotNullViolation, ActionController::InvalidAuthenticityToken bursts on FountainStaging + InfinityRoses/FirstProject daily summaries) |
| 2 | Email — freelancer@mpfc | Rollbar MPFC Daily Summary Sept 9 present — matches known chronic `WP_Error::get_method()` bug (see Performance) |
| 3 | Email — vuongtrancr@gmail.com | Swish: "Signal lost for 10 minutes on 'Low Application Throughput'" ×4 |
| 4 | Slack — Xtreme (Maddy) | Madhuraka asked kai to investigate a bug in a recently-done ticket and create a JIRA ticket — unresolved as of window end |
| 5 | Slack — Equanimity (Marcel) | Customer (komal.bailur) asked for help with a ZKTeco device issue in `xid-technologies` — unanswered as of window end |
| 6 | Workstream | SSO token expired; browser-login flow hung with no interactive display in this cron session (same recurring outage pattern as 07-26/07-31/08-01/08-15/08-22/09-04). Blocks all hour/task-log checks (Maddy-LongVV, John Yi/Rebecca/Bailey-TuanNT, Aysar/Elliott-KhanhHH, Fountain task-log actuals+needsReview) |
| 7 | Upwork | Rory + Aysar sessions expired; headless re-login failed (login selector not found) — needs manual carrick re-login outside cron |
| 8 | Performance — MPFC | Apdex still poor (0.59); chronic `WP_Error::get_method()` error (27×); 1 SQLi WAITFOR-DELAY probe on `/search/.../feed/rss2/` (11.9s, benign scan attempt) |
| 9 | Performance — OhCleo | `MediaByKeyView.get` now 37.9s avg (516 calls) — much worse than prior runs; `MediaByTagsView.get` 13.8s avg (233 calls) |
| 10 | Email — freelancer@mpfc | **Missed in original run** (see Re-check 09:40): customer Adrian Sulik forwarded via Saul, 09-09 17:53 — lost Coach Pass video access since 09-08, told card expired/refused, tried resubscribing and got "already have an active subscription" error (blocked either way, unresolved). 2nd customer (diarmaid orderley) also forwarded "unable to access coaches pass", 09-09 17:52, no reply seen yet |

**Today (Thu Sep 10):** No leave notices surfaced in this window's email/Matrix scan (leave-email parser not re-run — treat as informational only, not authoritative).

---

## Email — all — 06:05 (+07:00)

| Account | Emails | Alerts | Calendar today |
|---------|--------|--------|-----------------|
| duongdn@nustechnology.com | 3 | 1 (leave request "Xin nghỉ phép") | no events |
| carrick@nustechnology.com | 1 | 0 | no events |
| nick@nustechnology.com | 0 | 0 | no events |
| rick@nustechnology.com | 21 | 17 (Fountain/InfinityRoses/FirstProject prod alerts, see #1) | HEAL Meeting 12:30, OmniGPT Daily Sync 10:30 |
| kai@nustechnology.com | 4 | 3 (JIRA tickets LIFM2-428/461/464 mentions) | no events |
| ken@nustechnology.com | 80 | 17 (Precognize active-alerts PR #5339 thread, welligence PR #5239/WOP-246 threads — GitHub notification noise, not action-required) | DE Daily Standup 08:30, Tech Talks 09:00 |
| vuongtrancr@gmail.com | 7 | 5 (Swish Signal-lost ×4, see #3) | — |
| dnduongus@gmail.com | 23 | 0 (personal newsletters/bank/LinkedIn — no security alerts) | — |
| davidztv19@gmail.com | 0 | 0 | — |
| freelancer@mypersonalfootballcoach.com | 3 | 1 (Rollbar Daily Summary, see #2) | — |

Trello: Check Mail — DuongDn, Carrick, Rick, Kai, Ken, Nick ✓ all 6 complete.

## Calendar — 06:05 (+07:00)
Zoho calendars fetched for duongdn/carrick/nick/rick/kai/ken. Gmail accounts (vuongtrancr/dnduongus/davidztv19/mpfc) have no Zoho calendar. rick@ and ken@ have events today (above); others none.

---

## Slack — all — 06:10 (+07:00)

| Workspace | Msgs (since last_run) | Key content |
|-----------|------------------------|--------------|
| Baamboozle | 12 | Carrick's "Today's update" MPDM posted (Aysar gate satisfied — 3 items dev done+deployed); testing thread w/ skjamie25 re: checkmark position fix, resolved iteratively |
| RDC - FM Monitoring | 5 | Tuner disconnect alerts (automated); dmetiner fixed a device config mistake at Kayseri |
| Swift Studio | 1 | jeff: reminder to check email re: finance summary — no dev issue |
| Xtreme Soft Solutions | 3 | kai "OK"; **Madhuraka bug report + JIRA ticket ask (alert #4)**; kai flagged possible Xero connection issue |
| SAM GUARD - Mobile | 7 | HubSpot MQL lead notifications only (automated, no action needed) |
| Global Grazing Services | 1 | Nick's daily report present in #général (Grazing Software CR1, Prestashop order split work) |
| Amazing Meds | 0 | No activity |
| Generator | 0 | No activity |
| LegalAtoms | 7 | Generic team design-option discussion (Raymond, kadnan572, others) — no Nick-specific ask, filtered as noise |
| MyPersonalFootballCoach | 0 | No activity |
| William Bills | 0 | No activity |
| Equanimity | 1 | **Customer ZKTeco device support ask, unanswered (alert #5)** |
| SoCal Auto Wraps | 0 | Not monitored (dropped 2026-05-11) |
| Aigile Dev | 1 | Automated blog-post-merged notice, no action needed |
| OhCleo | see below | see OhCleo section |

Trello: Franc, Rory (+ Swift), Raymond, MPFC, Colin (paused/ignore), Elena-SamGuard (paused/ignore) ✓ complete. Maddy, Aysar, Elliott, Marcel ⚠️ skipped (alerts / Workstream-hours unverified).

---

## Discord — all — 06:12 (+07:00)

| Server | Msgs | Key content |
|--------|------|--------------|
| AirAgri (nusvinn) | 46 | Vinn's daily report present ("Just report my process today..."); heavy productive thread on Ceres sync/RealPTT alarms, property forms perf fixes, contractor induction sync, visitor induction testing — all normal dev activity, no blockers |
| Bizurk (nuscarrick) | 0 | No messages, no Andrew Taraba DMs |

Trello: James Diamond - Vinn task, Andrew Taraba ✓ complete.

---

## Scrin.io (Nick @ John Yi company account — 2026-09-09): 0h — no sessions recorded. Not TuanNT evidence.

---

## Sheets/Workstream — 06:15 (+07:00)

🔴 **Workstream SSO down this run.** Token was 1170893s old; proactive refresh, API refresh (2 attempts), and browser-login (Keycloak SSO redirect) all failed/hung — no interactive display available in this cron session. Google Sheets task-log system was fully retired 2026-08-21 (all projects on Workstream, no fallback exists anymore). **This blocks all dev-hours/needsReview checks this run:** Maddy(LongVV), John Yi/Rebecca/Bailey(TuanNT), Aysar/Elliott(KhanhHH), James Diamond(PhucVT), Fountain task-log actuals + needsReview. Same recurring pattern documented 07-26/07-31/08-01/08-15/08-22/09-04 — root cause still open, needs interactive `DISPLAY=:1 node scripts/workstream-login.js` outside cron.

---

## Fountain — 06:18 (+07:00)

**Part 1 (Matrix plan):** No weekly plan post from @trinhmtt found in `!EWnVDAxbTGsBxPkaaI:nustechnology.com` within this window (general Matrix scan covered "Kunal - Fountain" room, which is a different room — dev/QC discussion only, 91 messages, mostly PR/bug status: ViTHT clearing image-upload fields, PhatDLT verifying bugs, VuTQ porting a fix to Infinity, a reminder-email bug fixed and awaiting live-release confirmation). Matrix plan room not separately queried this run — **incomplete**.
**Part 2/3 (task actuals + plan vs actual):** Blocked by Workstream outage (see above) — **incomplete**.
**Trello board:** Not queried this run (time-boxed) — **incomplete**.

Trello: Fountain ⚠️ skipped (3-part check incomplete this run — needs recheck).

---

## Elena — 06:20 (+07:00)

PR #309 ("Implement header and modal components with i18n support") still open, created 2026-08-11 — now 30 days stale, unmerged. No new PRs since last run. WordPress SamGuard console-error check not run this pass (time-boxed).
**Elena - SamGuard Digital Plant, Elena - WordPress SamGuard:** on Ignore List (paused per 2026-09-09 decision) — auto-completed, not gated.

---

## OhCleo Slack — 06:22 (+07:00)

| Channel | Msgs (in-window) | Key content |
|---------|-------------------|--------------|
| DM:Celine Fierro | 8 | Tony's daily report present at 17:32 (+07): checked/replied tickets, moved 3 AI cards to ready-to-test; Celine asked about weekly plan + orientation/voice edit feasibility (~1h effort quoted), Tony confirmed |
| #events-code | — | channel_not_found (bot removed from channel — known issue, needs admin re-invite, not an auth problem) |

Tony daily report: present at 17:32 (+07). No unresolved customer asks.
Trello: Ohcleo ✓ complete.

---

## Matrix — 06:02 (+07:00)

**Active rooms: 11 / 144 | Messages: 588** *(since 2026-09-09 08:00)*
Full details: reports/2026-09-10/matrix-rooms-0602.md

### Key updates

**Celine - OhCleo (243 msgs):** Live server outage (query overload on track-details, DB migrate live→staging in progress) worked through the day by hungpn/minhtv/longvv/namtv/duongdn — DB migration completed, performance PRs identified for ticketing, Chat-AI feature moved to test/build-2, "Don't Stop" series track config fixed. No longer blocking as of 17:36.

**Elena - Active Alerts (211 msgs):** Team (kietnht/anhttl/trinm/samht/vytth/tuanntg) worked through effort-estimation spreadsheet for a new licensing/monitoring feature (View Configuration, License History, OP/Monitor license types) — estimation/spec work, no blockers.

**Kunal - Fountain (91 msgs):** PR/bug status updates — reminder-email-after-claim bug fixed pending live confirmation, pro-order crash bug (#80867) investigated, Infinity PR ported (#482). No customer escalations this window.

**NUS - Bailey - Paturevision 2026 (7 msgs):** duongdn asked datnc to look at queue-monitoring for the app; a batch of Rail 6 upgrade bugs (resolved status) requested to be closed out by vutq — done same day.

**Other:**
- OIrgPraJWrcDTnRVLQ (LeNH room): duongdn reminded LeNH that 07/09 & 08/09 task log show 0h on Workstream — unresolved as of window (pre-dates current outage, needs recheck once WS is back).
- Delivery - Resource Arrangement: leave-plan notes logged for NghiepNQ, VuTQ (half-day), AnhNH2, KhanhPQ.
- Maddy - Xtreme Soft Solutions: LongVV/Thanh Nguyen/tuantt discussed a buy-offer email-template display logic question with Madhuraka — resolved via explanation, no open item.
- Sandor Antal - Lyf Support: Android test pending customer confirmation; a data-deletion-callback prod deploy needs Sandor's PR approval/merge.
- PHP Projects: Brad Ballantine (via chientx) responded re: new-site work; QC-testing-for-bugs task proposed.

No ⚠️ action items directed at DuongDN detected by the regex scan this window.

Trello: n/a (Matrix informs other gates above).

---

## Performance — all — 06:25 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| ohcleo (prod) | 0.86 | 1127ms | 2.0% (660/32577) — dominated by benign NotAuthenticated/InvalidToken/AuthenticationFailed | 22.6/min |
| mpfc (prod) | 0.59 | 1114ms | 0.12% (35/28682) | 19.9/min |

**Slowest transactions (>threshold, full detail):**

OhCleo:
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| MediaByKeyView.get | 37,921 | 516 |
| MediaByTagsView.get | 13,840 | 233 |
| HomeMediasView.get | 3,580 | 721 |
| MediaListView.get | 2,733 | 832 |
| MultiCategoryMediaView.get | 1,897 | 1 |

MPFC:
| Endpoint | Avg ms | Calls |
|----------|--------|-------|
| admin-ajax.php?action=module-handle | 32,237 | 71 |
| admin-ajax.php?action=heartbeat | 29,860 | 88 |
| /search/...WAITFOR DELAY...(SQLi probe)/feed/rss2/ | 11,865 | 1 |
| /search/*/feed/rss2/ | 11,827 | 2 |
| membermouse/api/processOrder.php | 11,651 | 2 |

**Top errors:**

OhCleo: NotAuthenticated (625), InvalidToken (14), AuthenticationFailed "Passwords don't match" (11), AuthenticationFailed "User does not exist" (3), ValidationError "email already exists" (3) — all benign/expected.
MPFC: `WP_Error::get_method()` fatal (27, chronic unresolved) , E_WARNING "continue targeting switch" (4), E_WARNING "mkdir(): File name too long" (2), E_COMPILE_ERROR missing legacy-widget.php (1), E_WARNING "Invalid argument supplied for foreach()" (1).

Fountain/InfinityRoses NewRelic not queried this run (time-boxed).

---

## Upwork Memo — 2026-09-09 — 06:28 (+07:00)

| Workroom | Status | Details |
|----------|--------|---------|
| Rory | login_failed | Live cookies + stored + headless all failed — needs manual carrick Chrome Profile 1 re-login |
| Aysar | session_expired | Same as above |
| Neural Contract | success | 0 memos (no hourly activity — messages-only workroom) |

Trello: Rory/Aysar Upwork sessions failed — per rule this does NOT block their Trello gate (session failure ≠ alert); their Trello items were evaluated on Slack/Sheets criteria above instead.

---

## Ignore List — 06:30 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip, Elena - WordPress SamGuard.

---

## Trello — 06:32 (+07:00)

**Check Mail:** DuongDn, Carrick, Rick, Kai, Ken, Nick — ✓ all 6 complete.

**Check Progress:**
- ✓ complete: James Diamond, Rory, Franc, MPFC, Raymond, Neural Contract, Andrew Taraba, Ohcleo
- ✓ complete (ignore list): Elena - SamGuard, Colin, Arthur - Meta-Stamp, Blair Brown, Philip, Elena - WordPress
- ⚠️ skipped: Maddy (Madhuraka unresolved bug ask), John Yi (Workstream/TuanNT hours unverified), Aysar (Workstream/KhanhHH hours unverified), Elliott (Workstream/KhanhHH hours unverified + known pending perf issue), Marcel (Equanimity customer ask unanswered), Bailey (Workstream/TuanNT hours unverified), Rebecca (Workstream/TuanNT hours unverified), Fountain (3-part check incomplete this run)

Card auto-complete check: neither card fully clean (open items remain) — cards not marked done.

---

## Re-check — 08:50 (+07:00)

Workstream SSO re-established (`DISPLAY=:1 node scripts/workstream-login.js`, interactive session). Re-ran all blocked sources.

| Item | Result | Details |
|------|--------|---------|
| John Yi | ✓ completed | TuanNT combined 09-09: 8h (Neural Contract) — nonzero, no shortfall |
| Aysar | ✓ completed | KhanhHH combined 09-09: 2h (Generator) — nonzero; Slack MPDM already satisfied (see original report) |
| Bailey | ✓ completed | TuanNT combined 09-09: 8h (Neural) — nonzero; speedventory members active 09-07/08 |
| Rebecca | ✓ completed | TuanNT combined nonzero (as above); no Rebecca-specific Workstream rows this week |
| Fountain | ✓ completed | Part 1: trinhmtt posted Monday plan 08:50 in Matrix room `!EWnVDAxbTGsBxPkaaI` — ViTHT 40h, ThinhT 20h, DatNT 40h => QC 25h. Part 2/3: Workstream actuals thru Thu (DatNT 24h/40h≈60%, ThinhT 12h/20h=60%, QC≈14.75h/25h≈59%) — on track for day 3/5, no shortfall. Fountain excluded from needsReview alerting per rule. Trello board: 1 card in Doing 14+ days stale ("Fountain Pro error", since 08-19) — noted, not blocking; 15 customer comments since 09-07, all routine "ready to pick up"/"push live" cadence, no unresolved complaint standing out. |
| Maddy | ○ still incomplete | Re-scanned Xtreme Slack — Madhuraka's bug/JIRA-ticket ask (D050TGMRFRQ) still has no reply from kai/team as of this recheck |
| Elliott (Generator) | ○ still incomplete | NEW: Workstream needsReview — LucNT "Check/follow on project" + "Follow up on project" (0:30 × 3, 2026-09-07/08/09) — reviewer(s): HangNTT (project: Generator). KhanhHH hours themselves are fine (2h logged 09-09, nonzero) but the pending review blocks completion per rule |
| Marcel | ○ still incomplete | Re-scanned Equanimity — ZKTeco device question (directed at a tagged reseller/support contact, not us directly) still has no visible reply in-channel |

**Also filled in this recheck:**
- Leave plan refreshed (`parse-leave-emails.js`): PhucVT on approved full-day leave 2026-09-07 → 09-11 and 09-14 → 09-18 (personal matter) — explains James Diamond project having no PhucVT hours this week (LeNH/AnhNH2 covering).
- Elena WordPress (samguard.co) console-error check run: clean — 0 JS errors, 0 page errors, 0 CSP violations; only benign GA/ads/video `net::ERR_ABORTED` noise (ad-blocker/tracking-prevention artifacts, not real errors).

**Cleared:** John Yi, Aysar, Bailey, Rebecca, Fountain
**Still open:** Elliott (Generator needsReview pending), Marcel (customer ask unanswered)

---

## Re-check — 09:40 (+07:00)

**Maddy: cleared.** Re-read the Xtreme DM thread in full — kai *did* reply "OK" at 14:33 (+07), 15 min after Madhuraka's ask, in the same channel; missed on the first pass. Madhuraka's referenced email traced to kai@: "FW: Task LIFM2-449" from madhuraka@xtremeweb.com.au, 09-09 15:17 (+07) — an existing ticket forwarded for follow-up, not a new one kai needed to create. Trello: Maddy marked ✓ complete.

**KhanhHH task-log pattern (Aysar/Elliott context):** re-verified exhaustively (19 Workstream projects + all sheets) for 09-07/08/09. Her normal projects are Baamboozle, Radio Data Center, Generator only:
| Date | Baamboozle | Radio Data Center | Generator | Total |
|------|-----------|--------------------|-----------|-------|
| 09-07 | 6h | 5h | 3h | 14h |
| 09-08 | — | 2h | — | **2h** |
| 09-09 | — | — | 2h | **2h** |
Two straight days at 2h/8h target, no leave note, no other Workstream project found anywhere in her access. Not a 0h case so it doesn't auto-trigger the Aysar/Elliott gate rule, but flagged directly to her: sent Matrix message to `!rwLbvLBnrRAYMaOPaD:nustechnology.com` (KhanhHH's Generator/Elliott room) at 09:35 asking her to confirm/fill in any missing task log for 08-09/09-09. Awaiting reply.

**🔴 MPFC email alert missed in original run — root cause found and fixed.** `email-scan.js`'s "alerts" field was pure keyword matching (alert/error/fail/urgent/etc.) — the subjects "Fwd: Coach Pass Access Issue" and "Fwd: Membership" matched no keyword so were silently excluded from the alerts list even though the emails were present in the scanned mailbox (`count: 3` was correct, only the alerts summary was wrong). Content (read in full this recheck): customer Adrian Sulik lost Coach Pass access 09-08, told by Saul his card was expired/refused, tried resubscribing and got "already have an active subscription" — stuck either way, unresolved. Second customer (diarmaid orderley) also can't access Coach Pass, forwarded same evening, no reply seen. **Fixed the script** (removed keyword-based `alerts`, now returns real body `snippet` per message for every channel's scan to read directly — see `docs/memory/daily-report/general/feedback_no_keyword_alert_classification.md`) — this was a systemic gap, not MPFC-specific, applies going forward to every source (email/Slack/Discord/Matrix).

**Cleared this pass:** Maddy
**Still open:** Elliott (Generator needsReview pending), Marcel (customer ask unanswered), KhanhHH task-log gap (message sent, awaiting reply — informational, not gating any Trello item directly)
**New alert surfaced:** MPFC Coach Pass access bug (2 customers) — needs dev/support follow-up, not yet actioned

---

## Unresolved Questions

1. Elliott/Generator: LucNT has 3 charged-hour entries (0:30 each, 09-07/08/09) pending review by HangNTT — needs HangNTT (or LucNT) to resolve in Workstream.
2. Marcel/Equanimity: ZKTeco device configuration question is addressed to a tagged reseller/support contact, not necessarily us — confirm whether this needs our response or is being handled elsewhere.
3. KhanhHH: 2h/day on 09-08 and 09-09 (vs 8h target), no leave note — message sent asking her to confirm/fill in, awaiting reply.
4. MPFC Coach Pass access bug (Adrian Sulik + diarmaid orderley, both forwarded via Saul 09-09 evening) — needs someone to investigate the subscription-state bug (shows expired card AND blocks resubscribe as "already active") and reply to both customers. Not yet assigned/actioned.
4. Workstream SSO outage recurred a 6th+ time before this recheck — root cause still open (same pattern as 07-26/07-31/08-01/08-15/08-22/09-04); today it was resolved via one interactive `workstream-login.js` run.

## Re-check — 08:58 (+07:00)

| Item | Result | Details |
|------|--------|---------|
| Maddy | ○ still incomplete | Re-scanned Xtreme Slack since 08:52 — no new messages, Madhuraka's bug/JIRA-ticket ask still unanswered |
| Elliott (Generator) | ○ still incomplete | Re-queried Workstream `generator` project — LucNT's 3 needsReview entries (09-07/08/09, 0:30 each) still `Pending`, reviewer HangNTT |
| Marcel | ○ still incomplete | Re-scanned Equanimity Slack since 08:52 — no new messages, ZKTeco device question still unanswered |

**Cleared:** none
**Still open:** Maddy, Elliott, Marcel (same as 08:52 recheck — no change in 6 minutes)
