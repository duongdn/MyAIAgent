# Daily Report — 2026-09-25 (Friday)

**Run:** 2026-09-25T05:00:00+07:00 (cron), corrected 08:50 (+07:00)
**Window:** 2026-09-24T05:00:00+07:00 → 2026-09-25T05:00:00+07:00
**Leave plan:** ~~No new approved leaves on record for 09-24/09-25 (16 candidate emails scanned, 0 added).~~ **KhanhHH leave 09-25, 09-28, 09-29, 09-30** (email 09-22 15:46, namtv approved 09-24 22:47 in Delivery - Resource Arrangement: idle/internal, no makeup) — missed by parse-leave-emails, backfilled into `config/leave-plan.json`.

---

## ⚠️ ALERTS SUMMARY

| # | Source | Alert |
|---|--------|-------|
| 1 | Sheets/Workstream — LeNH | 0h logged 09-24 across all projects (incl. James Diamond), no leave note. Strict gate — blocks James Diamond item. **Re-verified 08:35:** still 0h, no leave/remote email (direct IMAP subject search), no Matrix activity 09-24. Also still owes 09-23 log (reminded twice 09-24). **09:01 reminder sent (Matrix, user-approved) → James Diamond completed.** |
| 2 | Sheets/Workstream — TuanNT | 0h logged 09-24 across all projects, no leave note. Blocks John Yi, Rebecca, Bailey items. **Re-verified 08:35:** still 0h in WS, but he WAS working 09-24 (Grazing tasks + est discussion w/ DuongDN 16:04 in Bailey Matrix room) → ~~missing log~~ **08:55 DuongDN confirmed: task log logged under wrong date; reminded by DuongDN** → resolved, John Yi/Rebecca/Bailey completed. |
| 3 | Sheets/Workstream — PhucVT | 0h logged 09-24, no leave note. **Re-verified 08:35:** still 0h, but active in Matrix 09-24 (10:57-16:54 task coordination) → missing log, not absence. |
| 4 | Workstream needsReview — Crystal lang (Arthur) | PhucVT — "Check and write script for delete data on staging / Check and report data on production" (09-21) + "Staging cleanup" (09-23, 0:30) still Pending. Reviewer: TienND (override). |
| 5 | Workstream needsReview — OhCleo | ~~PhuongPVT + LongVV 09-21~~ Now **9 Pending** rows: PhuongPVT 09-21 (0:00); LongVV 09-21 ×3 (compliance 2h, Cover Art 4h, explicitness tier 2h), 09-23 ×2 (compliance 2h, Cover Art 6h), 09-24 ×2 (cover style 1h, tagging logic 2h); LuHX 09-23 (cover art design app 1:30). Reviewers: DuongDN, MinhTV. |
| 6 | OhCleo Slack — Celine Fierro DM | 14:29-14:30 Celine flagged admin data "not correct/updated" and asked timeline — last message unanswered by Tony as of window end. **Still unanswered at 08:40 09-25 (~18h).** |
| 7 | Equanimity Slack | ~~komal.bailur asked carrick "what is the status?" (x2) — appears unanswered~~ ✅ Resolved: carrick replied 15:04 (waiting on Upwork hour increase); Marcel approved 08:33 09-25 ("send as bonus… So you can start"). Carrick can proceed. |
| 8 | Email — MPFC (Rollbar) | Chronic `WP_Error::get_method()` production error, 10 occurrences/5min fired twice (04:50, 21:16) — same unresolved bug tracked for months. |
| 9 | Email — Fountain (rick@) | Production errors: #341/#342 ActionView::Template::Error, #343 CSV::MalformedCSVError (all "production", not staging noise). |
| 10 | Upwork Memo | Rory=Cloudflare-blocked, Aysar=session_expired, Neural=login_failed — no memo data this run (session/CF failure, not a memo-validity finding). Recheck 08:40: Neural still stale-session after 4 fresh-cookie attempts → carrick's real Chrome (Profile 1) needs one manual upwork.com visit. |
| 11 | Maddy (Xtreme) | Kai daily report absent 09-24 while LongVV logged 1.5h Maddy (non-WordPress, Kai-role). JIRA: LIFM2-467 over 30m, LIFM2-428 over 3m, LIFM2-468 no est + no JIRA log. See ## Maddy. |
| 12 | Fountain Trello (Kunal) | Kunal 09-24 12:01 "We can push this live on the front end" (Product blurbs) + 12:25 Smart Hybrid Search PR review request (Codex branches) — no rick570 reply ~20h. CSV white-screen ask acknowledged 13:20 ("Let me check it"). |
| 13 | Matrix (info) | honght 14:03: PhucNH works until 30/09 — arrange Bailey/Speedventory task transfer (DuongDN ack'd "ok e"). |

**Today (Fri 09-25):** ~~No confirmed leave/WFH on record~~ **KhanhHH on approved leave (09-25 → 09-30, excl. weekend).** Others present. VuTQ in ~9h+ today.

---

## Email — all 10 accounts — 05:05 (+07:00)

| Account | Emails | Calendar today |
|---------|--------|----------------|
| duongdn@nustechnology.com | 0 | not checked this pass |
| carrick@nustechnology.com | 5 | not checked this pass |
| nick@nustechnology.com | 0 | not checked this pass |
| rick@nustechnology.com | 26 | not checked this pass |
| kai@nustechnology.com | 3 | not checked this pass |
| ken@nustechnology.com | 80 | not checked this pass |
| vuongtrancr@gmail.com | 10 | — |
| dnduongus@gmail.com | 35 | — |
| davidztv19@gmail.com | 1 | — |
| freelancer@mypersonalfootballcoach.com | 4 | — |

**carrick@:** Socalautowraps daily summary, "Error on montreall (Live) (Motto)", gitlab/Slack sign-in codes (routine), RE: "a few items awaiting your confirmation" (unread, worth a look next pass).
**rick@ (Fountain/InfinityRoses):** Mostly staging noise (FountainStaging/FountainStagingBE/InfinityStagingBE zeitwerk/CSV/routing errors — repeat "10 occurrences in 5 min" pattern, all staging). **Production**: #341/#342 ActionView::Template::Error, #343 CSV::MalformedCSVError (see alert #9). FirstProject production #1092 Uncaught Error also new today.
**kai@:** JIRA LIFM2-465 "Quote-email tab feedback" — Anoma Wasala mentioned Kai, thread active.
**ken@:** 80 emails, Precognize/NewsLetter volume — not read individually this pass (time-boxed).
**freelancer@mpfc:** Rollbar chronic WP_Error alert x2 + daily summary (86 existing errors) — see alert #8.
**davidztv19@ (Arthur):** Basecamp ResidentRadius activity digest — not a Meta-Stamp/Crystal-lang item.
**dnduongus@:** 35 emails, all newsletter/shopping/LinkedIn noise — no security alerts.

Trello: all 6 mail items ✓ complete (no alerting content found).

---

## Slack — all 14 workspaces — 05:10 (+07:00)

| Workspace | Msgs | Key content |
|-----------|------|-------------|
| Baamboozle | 11 | Carrick's MPDM "Today's update" present (13:53) — 3 items in progress/deployed. GitHub commit + a font-implementation ask in #testing. |
| RDC - FM Monitoring | 3 | Carrick heads-up: MPX Slack alert live on 12/full tuner fleet, 2 tuners missing from list, now updated — informational, not a blocker. |
| Swift Studio | 2 | Jeff asking Rory for a Clutch/GoodFirms review; roryh "sure". |
| Xtreme Soft Solutions | 4 | Kai/anomawasala dev chat; anomawasala asked "can u send me the password?" (internal, not client-facing). Kai UI/UX improvement note. |
| SAM GUARD - Mobile | 5 | 5x HubSpot MQL-lead auto-notifications, no dev activity. |
| Global Grazing Services | 3 | Nick's daily report present in #maintenance + #général (recurring PrestaShop PHP7.2 warning, known chronic issue — see [[feedback_prestashop2_php72_composer_chronic_error]]). Amy update on dashboard fields. |
| Amazing Meds | 0 | Token valid, genuinely 0 activity. |
| Generator | 0 | No activity. |
| LegalAtoms | 3 | "will merge today" / test confirmations — routine dev chatter, no direct Nick mention. |
| MyPersonalFootballCoach | 0 | No activity. |
| William Bills | 0 | No activity. |
| Equanimity | 4 (+2) | ~~See alert #7~~ carrick answered 15:04; Marcel approved extra hours 08:33 09-25 — resolved. |
| SoCal Auto Wraps | 0 | Dropped 2026-05-11, no Trello item. |
| Aigile Dev | 1 | "the-gaige-alerts" bot post, no content shown — benign. |

Trello: Rory ✓, Franc ✓, Maddy — hold pending JIRA/Bitbucket 4-part check (not run this pass), Aysar ✓ (MPDM present + KhanhHH hours), ~~Elliott — hold~~ Elliott ✓ 08:45 (Generator 0 activity + KhanhHH 8h combined), ~~Marcel — ⚠️ skipped (alert #7)~~ Marcel ✓ 08:45 (alert #7 resolved), MPFC ✓, LegalAtoms ✓ (no direct ask).

---

## Discord — AirAgri + Bizurk — 05:15 (+07:00)

| Server | Msgs | Key content |
|--------|------|-------------|
| AirAgri (nusvinn) | ~14 | jdiamond fuel-transfer feature discussion across the day; vinn shared a mockup doc for jdiamond review. Jeff's daily report present (#airagri-flutter, 4h: map/layer menu work done). |
| Bizurk (nuscarrick) | 0 | No activity, no Andrew DMs. |

Trello: ~~James Diamond — ⚠️ skipped (LeNH 0h gate)~~ James Diamond ✓ 09:01 (reminder sent), Andrew Taraba ✓ complete.

---

## Sheets/Workstream — 05:20 (+07:00)

Per-project actual dev hours (09-24) + reviewer/status:

| Project (client) | Dev hours 09-24 | Reviewer charged | Review status |
|---|---|---|---|
| Maddy (Xtreme) | ThanhNX 1h, LongVV 1.5h | need_review=false | — |
| James Diamond | ThangN 4h, **LeNH 0h** | PhucVT/LeNH need_review | NotRequired this period |
| Baamboozle (Aysar) | KhanhHH 4.67h | need_review=false | — |
| Radio Data Center (Franc) | KhanhHH 3.33h | LeNH need_review | NotRequired this period |
| Fountain (Kunal) | ViTHT 8h | VuTQ/DuongDN | none Pending |
| Speedventory (Bailey) | DatNC 4h, VyNL 7.75h, NamNN 3h, **TuanNT 0h** | need_review=false | — |
| Crystal lang (Arthur) | — (no 09-24 rows) | TienND (override) | **Pending** — PhucVT 09-21 + 09-23 tasks (see alert #4) |
| OhCleo | ~~— (no 09-24 rows)~~ LongVV 3h | DuongDN, MinhTV | **Pending** — 9 rows 09-21→09-24 (alert #5) |

**LeNH:** 0h 09-24, no leave note → alert #1.
**TuanNT:** 0h 09-24 across ALL projects (only Bailey shows activity, stopping at 09-23) → alert #2, blocks John Yi/Rebecca/Bailey.
**PhucVT:** 0h 09-24 (crystal_lang/speedventory both stop 09-23) → alert #3.
**KhanhHH:** 8h combined (Baamboozle 4.67 + RDC 3.33) → OK.

~~Maddy JIRA weekly cross-check: not run this pass~~ Run 08:40 — see ## Maddy.

Trello: ~~John Yi / Rebecca / Bailey ⚠️ skipped (TuanNT 0h)~~ John Yi ✓, Rebecca ✓, Bailey ✓ 08:55 (TuanNT wrong-date log, reminded by DuongDN), Maddy ⚠️ skipped (alert #11), ~~Elliott held pending~~ Elliott ✓, James Diamond ⚠️ skipped (LeNH 0h), Blair Brown → Ignore List (paused, auto-complete).

---

## Scrin.io — 05:22 (+07:00)

**Scrin.io (Nick @ John Yi company account — 2026-09-24):** 0h — no sessions recorded. Not TuanNT evidence.

---

## Fountain — 05:25 (+07:00)

**Part 1 — Matrix Plan** (room `!EWnVDAxbTGsBxPkaaI`): trinhmtt posted this week's plan Mon 09-21 11:29 — ViTHT 40h, DatNT 32h, ThinhT 20h, Vu Tat 8h => QC 25h.

**Part 2 — Task Log Actuals (week 09-21→09-27 so far):** ViTHT 16h, ThinhT 8h, HungPN 4.75h, PhatDLT 8h (QC), TrinhMTT 5.25h (QC), VuTQ 4h (QC).

**Part 3 — Plan vs Actual:** ViTHT 16/40h, ThinhT 8/20h — both on pace mid-week, no shortfall yet. VuTQ 4h vs 8h target — in progress. QC combined (PhatDLT+TrinhMTT+VuTQ) 17.25h vs 25h target.

**Trello board (08:42):** 21 comments since 09-24 05:00, 12 from kunalsheth (all @rick570). Handled: test-env/deploy-key thread (Kunal "Done"), CSV ask ("ignore it I got it working" + bulk-delete checkbox request; later white screen → rick "Let me check it" 13:20). **Unanswered:** Product blurbs "push this live" (12:01), Smart Hybrid Search PR review via Codex branches (12:25) — alert #12. Active lists: To-Do 24 (19 idle >5d), Bugs 21 (13), Doing 6 (3), QC Internal 6 (2), QA Backlog 8 (6), In QA 4 (2) — chronic backlog, not new.

Trello: Fountain ⚠️ skipped (alert #12, unanswered customer asks).

---

## Elena — 05:30 (+07:00)

- Internal repo (`nustechnology/Elena-SamGuard-Digital-Plant`): 1 open PR (#309, "Implement header and modal components with i18n support", author nusken) — CodeRabbit review not checked this pass (project on Ignore List/paused per 2026-09-09 directive — no merge/deploy action taken).
- Precognize (nusken): 0 open PRs from nusken account (7 open PRs total, all external authors).
- WordPress SamGuard CSP check: ~~not run this pass~~ 08:40 clean — 0 cspViolations, 0 pageErrors, 0 jsErrors (only GA/ads/mp4 ERR_ABORTED noise).

Trello: Elena - SamGuard → Ignore List (paused, auto-complete). Elena - WordPress SamGuard ~~→ held pending~~ ✓ 08:45 (clean).

---

## Matrix — 05:35 (+07:00)

~~Only Fountain room fetched; full sweep not run.~~ **Full sweep 08:33: Active rooms 29 / 146 | Messages 375** *(since 09-24 05:00)*
Full details: reports/2026-09-25/matrix-rooms-0833.md

### Action items for DuongDN — all already handled
| Room | Time | Message | Status |
|------|------|---------|--------|
| (Bailey HR) | 14:03 | honght: "Bạn PhucNH sẽ làm việc đến hết ngày 30/09/2026… sắp xếp transfer task" | ack'd "ok e" — transfer still to arrange (alert #13) |
| uyenvhp DM | 14:33 | 3 questions re Baamboozle payment write-up | answered 16:27-16:30 ✅ |
| namtv | 09:23 | AI training section 5 rework | agreed, namtv updating doc ✅ |
| vutq | 16:07 | "check giúp em 2 cái subdomain" | done 16:15 ✅ |
| anhttl | 14:29 | meeting in Nova room | same-day ✅ |
| Sandor Antal - Lyf | 15:32 | minhtv: client only trusts fixed-price | DuongDN replied (risk note) ✅ |

### Key updates
- **Resource Arrangement:** KhanhHH leave 09-25→09-30 approved as idle (no makeup); TuanNTG + PhongTH sick 09-24 (not monitored devs); ThuongNTN off 10/01-10/02.
- **Bailey/Paturevision:** tuannt + vutq posted "task hôm qua" updates; datnc Redmine bugs #81110/#81116 to NamNN.
- **Elena Active Alerts:** Precognize timeline/CR est (AA-121); Tuan Nguyen (Elena) off 09-24.
- **Reminders room:** LeNH + TuanNT reminded for 09-23 logs on 09-24; TuanNT still owes 1h makeup this week.

---

## OhCleo Slack — 05:40 (+07:00)

| Channel | Msgs | Key content |
|---------|------|-------------|
| DM:Celine Fierro | 5 | See alert #6 — Celine flagged admin data inaccuracy, asked update timeline, last msg 14:30 unanswered. |
| #events-code | 0 (channel_not_found) | Recurring — bot removed from channel, needs admin re-invite (known issue). |

Tony's daily report: not observed in this DM window.

Trello: Ohcleo ⚠️ skipped (alert #6, unanswered customer question — re-verified 08:40, still no reply).

---

## Performance — 05:45 (+07:00)

| Project | Apdex | Avg response | Error rate | Throughput |
|---------|-------|--------------|------------|------------|
| OhCleo (prod) | 0.96 | 141ms | 2.5% (535/21557) — 501 NotAuthenticated (benign), 20 InvalidToken, 9 duplicate-email, 3 password-mismatch, 1 user-not-exist | 14.9/min |
| MPFC (prod) | 0.46 | 1306ms | 2.0% (700/34365) — 598 `"continue" targeting switch` E_WARNING (new dominant class), 85 chronic `WP_Error::get_method()`, 3 Countable warning, 3 mkdir filename-too-long, 2 legacy-widget include error | 23.8/min |

MPFC apdex remains poor (0.46) — chronic, same root cause tracked for months (alert #8). Fountain/InfinityRoses New Relic not queried this pass (time-boxed).

---

## Upwork Memo — 2026-09-24 — 05:50 (+07:00)

| Workroom | Memos | Status |
|----------|-------|--------|
| Rory | — | Cloudflare challenge, not resolved |
| Aysar | — | Session expired |
| Neural Contract | — | Headless re-login failed; recheck 08:40 upwork-neural-check 4/4 stale-session → needs one manual upwork.com visit in carrick's Chrome Profile 1 |

Session/Cloudflare failures — not a memo-validity finding per existing rule. Manual re-auth needed: `node scripts/upwork-login.js --login --account=carrick` (visible browser, outside cron).

Trello: no dedicated Upwork Memo checklist item exists — informational only.

---

## Reminders — 05:52 (+07:00)

- LeNH: 0h 09-24 (re-verified 09:00) — **sent 09:01** (user-approved) to `!OIrgPraJWrcDTnRVLQ`.
- TuanNT: ~~needs reminder~~ wrong-date log, reminded by DuongDN directly 09-25.
- PhucVT: needs reminder (0h 09-24, no leave) — not sent.
- KhanhHH: skipped (8h logged).
- LongVV: skipped (ad-hoc, no fixed target).

---

## Ignore List — 05:53 (+07:00)

Not tracked (paused), auto-completed: Colin, Elena - SamGuard, Arthur - Meta-Stamp, Blair Brown - Peptide Clyde, Philip.

---

## Trello — Check Progress / Check Mail — 05:55 (+07:00)

**Completed this run:** Rory, **Elliott, Marcel, Neural Contract, Elena-WordPress-SamGuard (recheck 08:45)**, Franc, Aysar, MPFC, LegalAtoms, Andrew Taraba, Colin (ignore), Elena-SamGuard (ignore), Arthur (ignore), Blair Brown (ignore), Philip (ignore). All 6 Check Mail items.

**Left ○ (alert-gated):** Maddy (#11), ~~John Yi / Rebecca / Bailey (TuanNT 0h #2)~~ completed 08:55, ~~James Diamond (LeNH 0h #1)~~ completed 09:01, Ohcleo (#6), Fountain (#12). ~~Elliott, Marcel, Neural, Elena-WordPress~~ completed 08:45.

~~**Not completed — deferred pieces:** Maddy 4-part, Arthur, Matrix sweep, WordPress CSP, Fountain board~~ All run in 08:30-08:45 recheck, except Arthur (on Ignore List/paused — not run by design). Fountain/InfinityRoses New Relic still not queried (informational).

---

## Maddy (Xtreme Soft Solutions / Carrick-Kai-Luis) — 08:40 (+07:00)

### 1. Task-log hours (WS Maddy, week 09-21)
| Dev | 09-24 | Week | Note |
|-----|-------|------|------|
| LongVV | 1.5h | 5.5h | informational only, ad-hoc — no alert |
| ThanhNX | 1h | 4h | — |
| LuHX | — | 17h | — |

### 2. Slack / Kai daily report
- 09-24: Kai 10:44 note on UI/UX improvements ("personal time"), Kai↔anomawasala password exchange 18:51-19:39 (password pasted in Slack — internal, not reproduced here).
- **No Kai daily report 09-24** despite 1.5h non-WordPress Maddy hours (LIFM2-428 Shopify cert) → alert #11. No unanswered Madhuraka messages.

### 3. JIRA × Workstream (W 09-21)
| Ticket | Summary | Status | Est | JIRA | WS | Check |
|--------|---------|--------|-----|------|----|-------|
| LIFM2-467 | In-Home Quote Form | Testing - Anoma | 2h | 2h30m | 2.5h | 🔴 over 30m |
| LIFM2-468 | Quoting Tool Issue | Review | 0h | 0h | 1.5h | ⚠️ no est, no JIRA log |
| LIFM2-428 | Shopify Product Authenticity Certificate | To Do | 53h | 53h03m | 1.5h | 🔴 over 3m |

### 4. Bitbucket `xtreme-web/rms` — 9 open PRs
#549 LIFM2-467 (upd 09-24), #548 LIFM2-468 (09-22), #544 LIFM2-465 (09-21), #543 LIFM2-459 (Madhuraka, 09-09), #540 LIFM2-450 (09-03), #534 cron fix (08-26), #520 Quotes refresh (09-09), #509 LIFM2-428 (08-14), #481 LIFM2-409 (waiting on customer — not our blocker). No new unanswered human review comments.

Trello: Maddy ⚠️ skipped (alert #11).

---

## Unresolved Questions
1. ~~Sync lag?~~ Re-fetched 08:35: WS has 09-24 rows for others (ViTHT, KhanhHH, DatNC…) so no sync lag — LeNH/TuanNT/PhucVT genuinely haven't logged. TuanNT/PhucVT were demonstrably working. Send reminders? (needs your OK / `--send-reminder`)
2. ~~Equanimity~~ resolved. Celine's OhCleo ask still unanswered on Slack — was it handled on another channel?
3. carrick@'s "RE: Follow-up: a few items awaiting your confirmation" email not read in detail this pass — needs follow-up.
4. Neural/Upwork memo: open upwork.com once in carrick's Chrome Profile 1 to refresh session?
